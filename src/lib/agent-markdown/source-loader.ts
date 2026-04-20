import type { Tool } from '@/types/agent-connectors'

const docsSourceModules = import.meta.glob('/src/content/docs/**/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const templateSourceModules = import.meta.glob('/src/components/templates/**/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const templateIndexModules = import.meta.glob('/src/components/templates/**/index.ts', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const dataModules = import.meta.glob('/src/data/**/*.ts', {
  eager: true,
}) as Record<string, Record<string, unknown>>

export function getDocSourceEntries(): Array<[string, string]> {
  return Object.entries(docsSourceModules)
}

export function getDocSource(path: string): string | undefined {
  return docsSourceModules[path]
}

export function getTemplateSourceEntries(): Array<[string, string]> {
  return Object.entries(templateSourceModules)
}

export function getTemplateSource(path: string): string | undefined {
  return templateSourceModules[path]
}

export function getDataModule(path: string): Record<string, unknown> | undefined {
  return dataModules[path]
}

export function getDataTools(path: string): Tool[] {
  const module = dataModules[path] as { tools?: Tool[] } | undefined
  return module?.tools ?? []
}

function normalizeRelativePath(basePath: string, relativePath: string): string {
  const baseSegments = basePath.split('/').slice(0, -1)
  const nextSegments = relativePath.split('/')

  for (const segment of nextSegments) {
    if (!segment || segment === '.') continue
    if (segment === '..') {
      baseSegments.pop()
      continue
    }
    baseSegments.push(segment)
  }

  return baseSegments.join('/')
}

function finalizeResolvedSource(candidate: string): string {
  if (candidate.endsWith('.mdx') || candidate.endsWith('.ts') || candidate.endsWith('.astro')) {
    return candidate
  }
  if (templateSourceModules[`${candidate}.mdx`]) return `${candidate}.mdx`
  if (dataModules[`${candidate}.ts`]) return `${candidate}.ts`
  if (templateIndexModules[`${candidate}/index.ts`]) return `${candidate}/index.ts`
  return candidate
}

export function resolveImportSource(source: string, importerPath: string): string {
  if (source.startsWith('@/')) return finalizeResolvedSource(`/src/${source.slice(2)}`)
  if (source.startsWith('@components/'))
    return finalizeResolvedSource(`/src/components/${source.slice('@components/'.length)}`)
  if (source.startsWith('./') || source.startsWith('../'))
    return finalizeResolvedSource(normalizeRelativePath(importerPath, source))
  return source
}

function resolveReExportPath(indexPath: string, exportedPath: string): string {
  const normalized = resolveImportSource(exportedPath, indexPath)
  if (normalized.endsWith('.mdx') || normalized.endsWith('.ts')) return normalized
  if (getTemplateSource(`${normalized}.mdx`)) return `${normalized}.mdx`
  if (templateIndexModules[`${normalized}/index.ts`]) return `${normalized}/index.ts`
  return normalized
}

function buildTemplateExportMap(): Map<string, string> {
  const exportMap = new Map<string, string>()

  for (const [indexPath, source] of Object.entries(templateIndexModules)) {
    const normalized = source.replace(/\r\n/g, '\n')
    const namedExports = normalized.matchAll(
      /export\s*\{\s*default\s+as\s+([A-Za-z0-9_]+)\s*\}\s*from\s*['"](.+?)['"]/g,
    )

    for (const match of namedExports) {
      exportMap.set(match[1], resolveReExportPath(indexPath, match[2]))
    }
  }

  return exportMap
}

const templateExportMap = buildTemplateExportMap()

export function resolveTemplateExport(symbolName: string): string | undefined {
  return templateExportMap.get(symbolName)
}
