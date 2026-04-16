import { cleanMarkdownFragment, collapseBlankLines } from './markdown'
import { getParsedDoc, getParsedDocs, parseMdxSource, readFrontmatterValue } from './page-parser'
import {
  getDataModule,
  getDataTools,
  getTemplateSource,
  resolveTemplateExport,
} from './source-loader'
import { getConnectorCatalogItems } from './renderers/connectors'
import {
  checkItemRenderer,
  foldCardRenderer,
  methodParamsRenderer,
  methodReturnsRenderer,
  subtitleRenderer,
} from './renderers/common'
import { providerCatalogRenderer, toolListRenderer } from './renderers/connectors'
import { templateComponentRenderer } from './renderers/templates'
import type {
  ComponentRenderer,
  ComponentUsage,
  ImportBinding,
  PageSupportResult,
  ParsedMdxFile,
  RenderContext,
  RenderScope,
} from './types'

const componentRenderers: ComponentRenderer[] = [
  templateComponentRenderer,
  providerCatalogRenderer,
  toolListRenderer,
  checkItemRenderer,
  foldCardRenderer,
  subtitleRenderer,
  methodParamsRenderer,
  methodReturnsRenderer,
]

const cleanupHandledSources = new Set(['/src/components/ui/Tabs.astro'])

function readFrontmatterList(frontmatter: string, key: string): string[] {
  const raw = readFrontmatterValue(frontmatter, key)
  if (!raw.startsWith('[') || !raw.endsWith(']')) return []

  return raw
    .slice(1, -1)
    .split(',')
    .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean)
}

function normalizeBinding(binding: ImportBinding): ImportBinding {
  const isTemplateNamespace = binding.resolvedSource.startsWith('/src/components/templates')
  if (!isTemplateNamespace || binding.resolvedSource.endsWith('.mdx')) return binding

  const templateSource = resolveTemplateExport(
    binding.isDefault ? binding.localName : binding.importedName,
  )
  if (!templateSource) return binding

  return {
    ...binding,
    resolvedSource: templateSource,
  }
}

function getCustomComponentBindings(file: ParsedMdxFile): ImportBinding[] {
  return file.imports.map(normalizeBinding).filter((binding) => {
    const source = binding.resolvedSource
    return source.startsWith('/src/components') || source.startsWith('/src/components/templates')
  })
}

function isSupportedBinding(binding: ImportBinding): boolean {
  if (cleanupHandledSources.has(binding.resolvedSource)) return true

  const selfClosingUsage: ComponentUsage = {
    componentName: binding.localName,
    importBinding: binding,
    attrs: '',
    selfClosing: true,
  }
  const blockUsage: ComponentUsage = {
    componentName: binding.localName,
    importBinding: binding,
    attrs: '',
    slot: '',
    selfClosing: false,
  }

  return componentRenderers.some(
    (renderer) => renderer.supports(selfClosingUsage) || renderer.supports(blockUsage),
  )
}

function getPageSupport(file: ParsedMdxFile): PageSupportResult {
  const unsupportedComponents = getCustomComponentBindings(file)
    .filter((binding) => file.componentNames.includes(binding.localName))
    .filter((binding) => !isSupportedBinding(binding))
    .map((binding) => `${binding.localName} -> ${binding.resolvedSource}`)

  return {
    supported: unsupportedComponents.length === 0,
    unsupportedComponents,
  }
}

function buildRenderScope(file: ParsedMdxFile): RenderScope {
  const values: Record<string, unknown> = {}

  for (const binding of file.imports.map(normalizeBinding)) {
    const source = binding.resolvedSource
    if (!source.startsWith('/src/data/')) continue

    const module = getDataModule(source)
    if (!module) continue

    values[binding.localName] = binding.isDefault
      ? (module.default ?? module)
      : module[binding.importedName]
  }

  return { values }
}

function findTagEnd(markdown: string, startIndex: number): number {
  let depth = 0
  let quote: string | null = null

  for (let index = startIndex; index < markdown.length; index++) {
    const char = markdown[index]

    if (quote) {
      if (char === '\\') {
        index++
        continue
      }
      if (char === quote) quote = null
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char
      continue
    }

    if (char === '{') {
      depth++
      continue
    }

    if (char === '}') {
      depth = Math.max(0, depth - 1)
      continue
    }

    if (char === '>' && depth === 0) {
      return index
    }
  }

  return -1
}

function replaceComponentInstances(
  markdown: string,
  componentName: string,
  replacer: (usage: ComponentUsage) => string,
): string {
  let result = ''
  let cursor = 0

  while (cursor < markdown.length) {
    const start = markdown.indexOf(`<${componentName}`, cursor)
    if (start === -1) {
      result += markdown.slice(cursor)
      break
    }

    const nextChar = markdown[start + componentName.length + 1] ?? ''
    if (/[A-Za-z0-9_]/.test(nextChar)) {
      result += markdown.slice(cursor, start + 1)
      cursor = start + 1
      continue
    }

    result += markdown.slice(cursor, start)
    const tagEnd = findTagEnd(markdown, start + componentName.length + 1)
    if (tagEnd === -1) {
      result += markdown.slice(start)
      break
    }

    const openTag = markdown.slice(start, tagEnd + 1)
    const attrs = openTag
      .replace(new RegExp(`^<${componentName}`), '')
      .replace(/\/?>$/, '')
      .trim()
    const selfClosing = /\/>$/.test(openTag)

    if (selfClosing) {
      result += replacer({
        componentName,
        attrs,
        selfClosing: true,
      })
      cursor = tagEnd + 1
      continue
    }

    const closeTag = `</${componentName}>`
    const closeIndex = markdown.indexOf(closeTag, tagEnd + 1)
    if (closeIndex === -1) {
      result += markdown.slice(start)
      break
    }

    const slot = markdown.slice(tagEnd + 1, closeIndex)
    result += replacer({
      componentName,
      attrs,
      slot,
      selfClosing: false,
    })
    cursor = closeIndex + closeTag.length
  }

  return result
}

function renderFragment(
  markdown: string,
  filePath: string,
  parentScope: RenderScope = { values: {} },
): string {
  const parsed = parseMdxSource(filePath, markdown)
  const fileScope = buildRenderScope(parsed)
  const scope: RenderScope = {
    values: {
      ...parentScope.values,
      ...fileScope.values,
    },
  }

  let rendered = parsed.body

  for (const binding of getCustomComponentBindings(parsed)) {
    if (!parsed.componentNames.includes(binding.localName)) continue
    if (cleanupHandledSources.has(binding.resolvedSource)) continue

    rendered = replaceComponentInstances(rendered, binding.localName, (usage) => {
      const effectiveUsage: ComponentUsage = {
        ...usage,
        importBinding: binding,
      }

      const renderer = componentRenderers.find((candidate) => candidate.supports(effectiveUsage))
      if (!renderer) return ''

      const context: RenderContext = {
        file: parsed,
        scope,
        renderFragment,
        getTemplateSource,
        getConnectorCatalogItems: () =>
          getConnectorCatalogItems(
            getParsedDocs().map((doc) => ({
              route: doc.route,
              title: doc.title,
              description: doc.description,
            })),
          ),
        getToolsForSlug: (slug) => getDataTools(`/src/data/agent-connectors/${slug}.ts`),
      }

      return renderer.render(effectiveUsage, context).markdown
    })
  }

  return cleanMarkdownFragment(rendered)
}

function renderPageHeader(file: ParsedMdxFile): string {
  const lines = [`# ${file.title || file.route}`, '']

  if (file.description) {
    lines.push(file.description, '')
  }

  const connectorAuthType = readFrontmatterValue(file.frontmatter, 'connectorAuthType')
  const connectorCategories = readFrontmatterList(file.frontmatter, 'connectorCategories')

  if (connectorAuthType) lines.push(`**Authentication:** ${connectorAuthType}`)
  if (connectorCategories.length > 0) {
    const labels = connectorCategories
      .map((category) => category.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()))
      .join(', ')
    lines.push(`**Categories:** ${labels}`)
  }
  if (connectorAuthType || connectorCategories.length > 0) lines.push('')

  return lines.join('\n')
}

export function getAgentMarkdownRoutes(): string[] {
  return getParsedDocs()
    .filter((file) => getPageSupport(file).supported)
    .map((file) => file.route)
}

export function getAgentMarkdownSupport(route: string): PageSupportResult | null {
  const file = getParsedDoc(route)
  return file ? getPageSupport(file) : null
}

export function renderAgentMarkdown(route: string): string | null {
  const file = getParsedDoc(route)
  if (!file) return null

  const support = getPageSupport(file)
  if (!support.supported) return null

  const body = renderFragment(file.body, file.filePath, buildRenderScope(file))
  return collapseBlankLines(`${renderPageHeader(file)}${body}`) + '\n'
}

export function getAgentMarkdownAuditRows(): Array<{
  route: string
  status: 'supported' | 'fallback' | 'lossy-risk'
  unsupportedComponents: string[]
}> {
  return getParsedDocs()
    .filter((file) =>
      getCustomComponentBindings(file).some((binding) =>
        file.componentNames.includes(binding.localName),
      ),
    )
    .map((file) => {
      const support = getPageSupport(file)
      return {
        route: file.route,
        status: support.supported ? 'supported' : 'lossy-risk',
        unsupportedComponents: support.unsupportedComponents,
      }
    })
}
