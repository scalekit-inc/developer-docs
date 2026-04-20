import { getDocSourceEntries, resolveImportSource } from './source-loader'
import type { ComponentUsage, ImportBinding, ParsedMdxFile } from './types'

function normalizeLines(value: string): string {
  return value.replace(/\r\n/g, '\n')
}

export function splitFrontmatter(raw: string): { frontmatter: string; body: string } {
  const match = normalizeLines(raw).match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    return { frontmatter: '', body: normalizeLines(raw) }
  }

  return {
    frontmatter: match[1],
    body: match[2],
  }
}

export function readFrontmatterValue(frontmatter: string, key: string): string {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  return match?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? ''
}

function deriveRoute(filePath: string, frontmatter: string): string {
  const explicitSlug = readFrontmatterValue(frontmatter, 'slug')
  if (explicitSlug) return explicitSlug.replace(/^\/|\/$/g, '')

  const relativePath = filePath.replace(/^\/src\/content\/docs\//, '').replace(/\.mdx$/u, '')
  return relativePath.replace(/\/index$/u, '')
}

export function parseImports(body: string, filePath: string): ImportBinding[] {
  const imports: ImportBinding[] = []
  const importStatements = normalizeLines(body).matchAll(
    /^import\s+([\s\S]+?)\s+from\s+['"](.+?)['"];?$/gm,
  )

  for (const match of importStatements) {
    const bindings = match[1].trim()
    const source = match[2]
    const resolvedSource = resolveImportSource(source, filePath)

    const defaultAndNamed = bindings.match(/^([A-Za-z0-9_]+)\s*,\s*\{([\s\S]+)\}$/)
    if (defaultAndNamed) {
      imports.push({
        localName: defaultAndNamed[1],
        importedName: 'default',
        source,
        resolvedSource,
        isDefault: true,
      })

      for (const entry of defaultAndNamed[2].split(',')) {
        const trimmed = entry.trim()
        if (!trimmed) continue
        const [importedName, alias] = trimmed.split(/\s+as\s+/)
        imports.push({
          localName: (alias ?? importedName).trim(),
          importedName: importedName.trim(),
          source,
          resolvedSource,
          isDefault: false,
        })
      }
      continue
    }

    if (bindings.startsWith('{') && bindings.endsWith('}')) {
      for (const entry of bindings.slice(1, -1).split(',')) {
        const trimmed = entry.trim()
        if (!trimmed) continue
        const [importedName, alias] = trimmed.split(/\s+as\s+/)
        imports.push({
          localName: (alias ?? importedName).trim(),
          importedName: importedName.trim(),
          source,
          resolvedSource,
          isDefault: false,
        })
      }
      continue
    }

    imports.push({
      localName: bindings,
      importedName: 'default',
      source,
      resolvedSource,
      isDefault: true,
    })
  }

  return imports
}

export function getComponentNames(body: string): string[] {
  return Array.from(
    new Set(
      [...normalizeLines(body).matchAll(/<([A-Z][A-Za-z0-9_]*)\b/g)].map((match) => match[1]),
    ),
  )
}

function parseAttributes(
  attrs: string,
): Record<string, { kind: 'string' | 'expression' | 'boolean'; value: string | boolean }> {
  const result: Record<
    string,
    { kind: 'string' | 'expression' | 'boolean'; value: string | boolean }
  > = {}
  let index = 0

  while (index < attrs.length) {
    while (index < attrs.length && /\s/.test(attrs[index])) index++
    if (index >= attrs.length) break

    const nameStart = index
    while (index < attrs.length && /[A-Za-z0-9_:-]/.test(attrs[index])) index++
    const name = attrs.slice(nameStart, index)
    if (!name) break

    while (index < attrs.length && /\s/.test(attrs[index])) index++

    if (attrs[index] !== '=') {
      result[name] = { kind: 'boolean', value: true }
      continue
    }

    index++
    while (index < attrs.length && /\s/.test(attrs[index])) index++

    if (attrs[index] === '"' || attrs[index] === "'") {
      const quote = attrs[index]
      index++
      const valueStart = index
      while (index < attrs.length && attrs[index] !== quote) index++
      result[name] = { kind: 'string', value: attrs.slice(valueStart, index) }
      index++
      continue
    }

    if (attrs[index] === '{') {
      let depth = 0
      const exprStart = index + 1
      let inString: string | null = null
      index++
      while (index < attrs.length) {
        const char = attrs[index]
        if (inString) {
          if (char === '\\') {
            index += 2
            continue
          }
          if (char === inString) inString = null
          index++
          continue
        }
        if (char === '"' || char === "'" || char === '`') {
          inString = char
          index++
          continue
        }
        if (char === '{') depth++
        if (char === '}') {
          if (depth === 0) break
          depth--
        }
        index++
      }
      result[name] = { kind: 'expression', value: attrs.slice(exprStart, index) }
      index++
      continue
    }

    const valueStart = index
    while (index < attrs.length && !/\s/.test(attrs[index])) index++
    result[name] = { kind: 'string', value: attrs.slice(valueStart, index) }
  }

  return result
}

export function evaluateExpression(expression: string, scope: Record<string, unknown>): unknown {
  const keys = Object.keys(scope)
  const values = Object.values(scope)
  return Function(...keys, `return (${expression})`)(...values)
}

export function resolveProps(
  attrs: string,
  scope: Record<string, unknown>,
): Record<string, unknown> {
  const parsed = parseAttributes(attrs)
  const result: Record<string, unknown> = {}

  for (const [key, descriptor] of Object.entries(parsed)) {
    if (descriptor.kind === 'boolean') {
      result[key] = descriptor.value
      continue
    }

    if (descriptor.kind === 'string') {
      result[key] = descriptor.value
      continue
    }

    result[key] = evaluateExpression(String(descriptor.value), scope)
  }

  return result
}

export function buildComponentUsage(
  componentName: string,
  attrs: string,
  slot?: string,
): ComponentUsage {
  return {
    componentName,
    attrs,
    slot,
    selfClosing: slot === undefined,
  }
}

export function parseMdxSource(filePath: string, source: string): ParsedMdxFile {
  const { frontmatter, body } = splitFrontmatter(source)
  const title = readFrontmatterValue(frontmatter, 'title')
  const description = readFrontmatterValue(frontmatter, 'description')

  return {
    filePath,
    route: deriveRoute(filePath, frontmatter),
    frontmatter,
    body,
    title,
    description,
    imports: parseImports(body, filePath),
    componentNames: getComponentNames(body),
  }
}

const parsedDocs = new Map<string, ParsedMdxFile>(
  getDocSourceEntries().map(([filePath, source]) => {
    const parsed = parseMdxSource(filePath, source)
    return [parsed.route, parsed]
  }),
)

export function getParsedDoc(route: string): ParsedMdxFile | undefined {
  return parsedDocs.get(route)
}

export function getParsedDocs(): ParsedMdxFile[] {
  return Array.from(parsedDocs.values())
}
