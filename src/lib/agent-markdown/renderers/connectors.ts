import { catalog } from '@/data/agent-connectors/catalog'
import type { Tool } from '@/types/agent-connectors'
import { collapseBlankLines } from '../markdown'
import { resolveProps } from '../page-parser'
import type { ComponentRenderer, ConnectorCatalogItem } from '../types'

const CATEGORY_LABELS: Record<string, string> = {
  ai: 'AI',
  analytics: 'Analytics',
  automation: 'Automation',
  calendar: 'Calendar',
  communication: 'Communication',
  crm: 'CRM',
  ci_cd: 'CI/CD',
  customer_support: 'Customer Support',
  data: 'Data',
  developer_tools: 'Developer Tools',
  documents: 'Documents',
  files: 'Files',
  productivity: 'Productivity',
  project_management: 'Project Management',
  sales: 'Sales',
  scheduling: 'Scheduling',
}

function categoryLabel(slug: string): string {
  const normalized = slug.replace(/-/g, '_')
  return (
    CATEGORY_LABELS[normalized] ??
    normalized.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  )
}

function renderProviderCatalogMarkdown(items: ConnectorCatalogItem[]): string {
  const categoryOrder = Array.from(new Set(items.flatMap((item) => item.categories))).sort(
    (left, right) => {
      if (left === 'other') return 1
      if (right === 'other') return -1
      return categoryLabel(left).localeCompare(categoryLabel(right))
    },
  )

  const lines = ['## Connector catalog', '']

  for (const category of categoryOrder) {
    lines.push(`### ${categoryLabel(category)}`, '')
    for (const item of items.filter((entry) => entry.categories.includes(category))) {
      const summary = item.description
        ? ` - ${item.authType}. ${item.description}`
        : ` - ${item.authType}`
      lines.push(`- [${item.title}](${item.href})${summary}`)
    }
    lines.push('')
  }

  return collapseBlankLines(lines.join('\n'))
}

function renderToolListMarkdown(
  props: Record<string, unknown>,
  getToolsForSlug: (slug: string) => Tool[],
): string {
  const directTools = Array.isArray(props.tools) ? props.tools : null
  const slug = typeof props.connectorSlug === 'string' ? props.connectorSlug : ''
  const tools = directTools ?? (slug ? getToolsForSlug(slug) : [])

  if (!Array.isArray(tools) || tools.length === 0) {
    return '## Tool list\n\nNo tools are documented yet.'
  }

  const lines = ['## Tool list', '']

  for (const tool of tools) {
    if (!tool || typeof tool !== 'object') continue
    const name = String((tool as { name?: string }).name ?? '')
    const description = String((tool as { description?: string }).description ?? '')
    const params = Array.isArray((tool as { params?: unknown[] }).params)
      ? (tool as { params: unknown[] }).params
      : []

    lines.push(`### \`${name}\``, '', description, '')

    if (params.length > 0) {
      lines.push('Parameters:', '')
      for (const param of params) {
        if (!param || typeof param !== 'object') continue
        const paramName = String((param as { name?: string }).name ?? '')
        const type = String((param as { type?: string }).type ?? '')
        const required = (param as { required?: boolean }).required ? 'required' : 'optional'
        const paramDescription = String((param as { description?: string }).description ?? '')
        lines.push(`- \`${paramName}\` (\`${type}\`, ${required}): ${paramDescription}`)
      }
      lines.push('')
    }
  }

  return collapseBlankLines(lines.join('\n'))
}

export function getConnectorCatalogItems(
  docs: Array<{ route: string; title: string; description: string }>,
): ConnectorCatalogItem[] {
  return docs
    .filter(
      (doc) => doc.route.startsWith('agentkit/connectors') && doc.route !== 'agentkit/connectors',
    )
    .map((doc) => {
      const slug = doc.route.replace(/^agentkit\/connectors\//, '')
      const meta = catalog[slug]

      return {
        slug,
        title: doc.title || slug,
        description: doc.description,
        href: `/${doc.route}/`,
        categories: meta?.categories?.length
          ? meta.categories.map((category) => category.replace(/-/g, '_'))
          : ['other'],
        authType: meta?.authType ?? 'OAuth 2.0',
      }
    })
    .sort((left, right) => left.title.localeCompare(right.title))
}

export const providerCatalogRenderer: ComponentRenderer = {
  supports: (usage) =>
    usage.importBinding?.resolvedSource === '/src/components/ProviderCatalog.astro' &&
    usage.selfClosing,
  render: (_usage, context) => ({
    markdown: renderProviderCatalogMarkdown(context.getConnectorCatalogItems()),
  }),
}

export const toolListRenderer: ComponentRenderer = {
  supports: (usage) =>
    usage.importBinding?.resolvedSource === '/src/components/ToolList.astro' && usage.selfClosing,
  render: (usage, context) => {
    const props = {
      ...resolveProps(usage.attrs, context.scope.values),
      connectorSlug: context.file.route.replace(/^agentkit\/connectors\//, ''),
    }
    return { markdown: renderToolListMarkdown(props, context.getToolsForSlug) }
  },
}
