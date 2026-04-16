import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const DOCS_ROOT = new URL('../src/content/docs', import.meta.url)
const STRICT = process.argv.includes('--strict')

const supportedSources = new Set([
  '/src/components/MethodParams.astro',
  '/src/components/MethodReturns.astro',
  '/src/components/ProviderCatalog.astro',
  '/src/components/ToolList.astro',
  '/src/components/ui/CheckItem.astro',
  '/src/components/ui/FoldCard.astro',
  '/src/components/ui/Subtitle.astro',
  '/src/components/ui/Tabs.astro',
])

function normalizeLines(value) {
  return value.replace(/\r\n/g, '\n')
}

function splitFrontmatter(raw) {
  const match = normalizeLines(raw).match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { frontmatter: '', body: normalizeLines(raw) }
  return { frontmatter: match[1], body: match[2] }
}

function readFrontmatterValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  return match?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? ''
}

function deriveRoute(filePath, frontmatter) {
  const slug = readFrontmatterValue(frontmatter, 'slug')
  if (slug) return slug.replace(/^\/|\/$/g, '')

  return filePath
    .replace(/\\/g, '/')
    .replace(/^.*\/src\/content\/docs\//, '')
    .replace(/\.mdx$/u, '')
    .replace(/\/index$/u, '')
}

function resolveImportSource(source, importerPath) {
  if (source.startsWith('@/')) return `/src/${source.slice(2)}`
  if (source.startsWith('@components/'))
    return `/src/components/${source.slice('@components/'.length)}`
  if (source.startsWith('./') || source.startsWith('../')) {
    const importerSegments = importerPath.replace(/\\/g, '/').split('/').slice(0, -1)
    for (const segment of source.split('/')) {
      if (!segment || segment === '.') continue
      if (segment === '..') importerSegments.pop()
      else importerSegments.push(segment)
    }
    return importerSegments.join('/')
  }
  return source
}

function parseImports(body, filePath) {
  const imports = []
  const matches = normalizeLines(body).matchAll(/^import\s+([\s\S]+?)\s+from\s+['"](.+?)['"];?$/gm)

  for (const match of matches) {
    const bindings = match[1].trim()
    const source = match[2]
    const resolvedSource = resolveImportSource(source, filePath)

    if (bindings.startsWith('{') && bindings.endsWith('}')) {
      for (const entry of bindings.slice(1, -1).split(',')) {
        const trimmed = entry.trim()
        if (!trimmed) continue
        const [importedName, alias] = trimmed.split(/\s+as\s+/)
        imports.push({
          localName: (alias ?? importedName).trim(),
          source,
          resolvedSource,
        })
      }
      continue
    }

    const defaultAndNamed = bindings.match(/^([A-Za-z0-9_]+)\s*,\s*\{([\s\S]+)\}$/)
    if (defaultAndNamed) {
      imports.push({
        localName: defaultAndNamed[1],
        source,
        resolvedSource,
      })

      for (const entry of defaultAndNamed[2].split(',')) {
        const trimmed = entry.trim()
        if (!trimmed) continue
        const [importedName, alias] = trimmed.split(/\s+as\s+/)
        imports.push({
          localName: (alias ?? importedName).trim(),
          source,
          resolvedSource,
        })
      }
      continue
    }

    imports.push({
      localName: bindings,
      source,
      resolvedSource,
    })
  }

  return imports
}

function getComponentNames(body) {
  return new Set(
    [...normalizeLines(body).matchAll(/<([A-Z][A-Za-z0-9_]*)\b/g)].map((match) => match[1]),
  )
}

function isTrackedComponentImport(binding) {
  return (
    binding.resolvedSource.startsWith('/src/components') ||
    binding.resolvedSource.startsWith('/src/components/templates')
  )
}

function isSupported(binding) {
  return (
    supportedSources.has(binding.resolvedSource) ||
    binding.resolvedSource.startsWith('/src/components/templates')
  )
}

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(full)
    } else if (entry.name.endsWith('.mdx')) {
      yield full
    }
  }
}

const rows = []

for await (const filePath of walk(DOCS_ROOT.pathname)) {
  const source = await readFile(filePath, 'utf8')
  const { frontmatter, body } = splitFrontmatter(source)
  const route = deriveRoute(filePath, frontmatter)
  const componentNames = getComponentNames(body)
  const componentImports = parseImports(body, filePath)
    .filter(isTrackedComponentImport)
    .filter((binding) => componentNames.has(binding.localName))

  if (componentImports.length === 0) continue

  const unsupportedComponents = componentImports
    .filter((binding) => !isSupported(binding))
    .map((binding) => `${binding.localName} -> ${binding.resolvedSource}`)

  rows.push({
    route,
    status: unsupportedComponents.length === 0 ? 'supported' : 'lossy-risk',
    unsupportedComponents,
  })
}

rows.sort((left, right) => left.route.localeCompare(right.route))

for (const row of rows) {
  console.log(`${row.status}\t${row.route}`)
  for (const component of row.unsupportedComponents) {
    console.log(`  - ${component}`)
  }
}

const lossyCount = rows.filter((row) => row.status === 'lossy-risk').length
console.log(`\nScanned ${rows.length} component-heavy docs pages.`)
console.log(`Lossy-risk pages: ${lossyCount}`)

if (lossyCount > 0) {
  console.warn('\n[agent-markdown] Warning: some docs pages still fall back to raw .md output.')
  console.warn(
    '[agent-markdown] Add a renderer for the unsupported component family to make those pages agent-safe.',
  )
}

if (STRICT && lossyCount > 0) {
  process.exit(1)
}
