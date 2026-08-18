import type { Tool } from '@/types/agent-connectors'

export interface SourceProvider {
  docs: Record<string, string>
  templates: Record<string, string>
  dataModules: Record<string, Record<string, unknown>>
  templateIndexModules: Record<string, string>
  templateExports: ReadonlyMap<string, string>
}

export interface SourceProviderInput {
  docs?: Record<string, string>
  templates?: Record<string, string>
  dataModules?: Record<string, Record<string, unknown>>
  templateIndexModules?: Record<string, string>
  templateExports?: ReadonlyMap<string, string>
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

function finalizeResolvedSource(
  candidate: string,
  templates: Record<string, string>,
  dataModules: Record<string, Record<string, unknown>>,
  templateIndexModules: Record<string, string>,
): string {
  if (candidate.endsWith('.mdx') || candidate.endsWith('.ts') || candidate.endsWith('.astro')) {
    return candidate
  }
  if (templates[`${candidate}.mdx`]) return `${candidate}.mdx`
  if (dataModules[`${candidate}.ts`]) return `${candidate}.ts`
  if (templateIndexModules[`${candidate}/index.ts`]) return `${candidate}/index.ts`
  return candidate
}

function resolveSourcePath(
  source: string,
  importerPath: string,
  templates: Record<string, string>,
  dataModules: Record<string, Record<string, unknown>>,
  templateIndexModules: Record<string, string>,
): string {
  const finalize = (candidate: string) =>
    finalizeResolvedSource(candidate, templates, dataModules, templateIndexModules)

  if (source.startsWith('@/')) return finalize(`/src/${source.slice(2)}`)
  if (source.startsWith('@components/'))
    return finalize(`/src/components/${source.slice('@components/'.length)}`)
  if (source.startsWith('./') || source.startsWith('../'))
    return finalize(normalizeRelativePath(importerPath, source))
  return source
}

function resolveReExportPath(
  indexPath: string,
  exportedPath: string,
  templates: Record<string, string>,
  dataModules: Record<string, Record<string, unknown>>,
  templateIndexModules: Record<string, string>,
): string {
  const normalized = resolveSourcePath(
    exportedPath,
    indexPath,
    templates,
    dataModules,
    templateIndexModules,
  )
  if (normalized.endsWith('.mdx') || normalized.endsWith('.ts')) return normalized
  if (templates[`${normalized}.mdx`]) return `${normalized}.mdx`
  if (templateIndexModules[`${normalized}/index.ts`]) return `${normalized}/index.ts`
  return normalized
}

export function buildTemplateExportMap(
  templateIndexModules: Record<string, string>,
  templates: Record<string, string> = {},
  dataModules: Record<string, Record<string, unknown>> = {},
): Map<string, string> {
  const exportMap = new Map<string, string>()

  for (const [indexPath, source] of Object.entries(templateIndexModules)) {
    const normalized = source.replace(/\r\n/g, '\n')
    const namedExports = normalized.matchAll(
      /export\s*\{\s*default\s+as\s+([A-Za-z0-9_]+)\s*\}\s*from\s*['"](.+?)['"]/g,
    )

    for (const match of namedExports) {
      exportMap.set(
        match[1],
        resolveReExportPath(indexPath, match[2], templates, dataModules, templateIndexModules),
      )
    }
  }

  return exportMap
}

export function createSourceProvider(input: SourceProviderInput = {}): SourceProvider {
  const docs = input.docs ?? {}
  const templates = input.templates ?? {}
  const dataModules = input.dataModules ?? {}
  const templateIndexModules = input.templateIndexModules ?? {}
  const templateExports =
    input.templateExports ?? buildTemplateExportMap(templateIndexModules, templates, dataModules)

  return {
    docs,
    templates,
    dataModules,
    templateIndexModules,
    templateExports,
  }
}

// Vite rewrites these glob calls at build time. Node tests skip the glob
// branch because import.meta.env is undefined there.
const hasViteEnv = Boolean((import.meta as ImportMeta & { env?: unknown }).env)

const docsSourceModules = (
  hasViteEnv
    ? import.meta.glob('/src/content/docs/**/*.mdx', {
        query: '?raw',
        import: 'default',
        eager: true,
      })
    : {}
) as Record<string, string>

const templateSourceModules = (
  hasViteEnv
    ? import.meta.glob('/src/components/templates/**/*.mdx', {
        query: '?raw',
        import: 'default',
        eager: true,
      })
    : {}
) as Record<string, string>

const templateIndexModules = (
  hasViteEnv
    ? import.meta.glob('/src/components/templates/**/index.ts', {
        query: '?raw',
        import: 'default',
        eager: true,
      })
    : {}
) as Record<string, string>

const dataModules = (
  hasViteEnv
    ? import.meta.glob('/src/data/**/*.ts', {
        eager: true,
      })
    : {}
) as Record<string, Record<string, unknown>>

export function createViteSourceProvider(): SourceProvider {
  return createSourceProvider({
    docs: docsSourceModules,
    templates: templateSourceModules,
    templateIndexModules,
    dataModules,
  })
}

let provider: SourceProvider = hasViteEnv ? createViteSourceProvider() : createSourceProvider()

export function getSourceProvider(): SourceProvider {
  return provider
}

export function setSourceProvider(next: SourceProvider): void {
  provider = next
}

export function getDocSourceEntries(): Array<[string, string]> {
  return Object.entries(provider.docs)
}

export function getDocSource(path: string): string | undefined {
  return provider.docs[path]
}

export function getTemplateSourceEntries(): Array<[string, string]> {
  return Object.entries(provider.templates)
}

export function getTemplateSource(path: string): string | undefined {
  return provider.templates[path]
}

export function getDataModule(path: string): Record<string, unknown> | undefined {
  return provider.dataModules[path]
}

export function getDataTools(path: string): Tool[] {
  const module = provider.dataModules[path] as { tools?: Tool[] } | undefined
  return module?.tools ?? []
}

export function resolveImportSource(source: string, importerPath: string): string {
  return resolveSourcePath(
    source,
    importerPath,
    provider.templates,
    provider.dataModules,
    provider.templateIndexModules,
  )
}

export function resolveTemplateExport(symbolName: string): string | undefined {
  return provider.templateExports.get(symbolName)
}
