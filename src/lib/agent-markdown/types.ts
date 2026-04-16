import type { Tool } from '@/types/agent-connectors'

export interface ImportBinding {
  localName: string
  importedName: string
  source: string
  resolvedSource: string
  isDefault: boolean
}

export interface ComponentUsage {
  componentName: string
  importBinding?: ImportBinding
  attrs: string
  slot?: string
  selfClosing: boolean
}

export interface ParsedMdxFile {
  filePath: string
  route: string
  frontmatter: string
  body: string
  title: string
  description: string
  imports: ImportBinding[]
  componentNames: string[]
}

export interface RenderScope {
  values: Record<string, unknown>
}

export interface RenderContext {
  file: ParsedMdxFile
  scope: RenderScope
  renderFragment: (markdown: string, filePath: string, parentScope?: RenderScope) => string
  getTemplateSource: (resolvedSource: string) => string | undefined
  getConnectorCatalogItems: () => ConnectorCatalogItem[]
  getToolsForSlug: (slug: string) => Tool[]
}

export interface RenderResult {
  markdown: string
}

export interface ComponentRenderer {
  supports: (usage: ComponentUsage) => boolean
  render: (usage: ComponentUsage, context: RenderContext) => RenderResult
}

export interface ConnectorCatalogItem {
  slug: string
  title: string
  description: string
  href: string
  categories: string[]
  authType: string
}

export interface PageSupportResult {
  supported: boolean
  unsupportedComponents: string[]
}
