import { cleanMarkdownFragment } from '../markdown'
import type { ComponentRenderer } from '../types'

export const templateComponentRenderer: ComponentRenderer = {
  supports: (usage) => {
    const source = usage.importBinding?.resolvedSource ?? ''
    return source.startsWith('/src/components/templates/') && source.endsWith('.mdx')
  },
  render: (usage, context) => {
    const source = usage.importBinding?.resolvedSource
    const template = source ? context.getTemplateSource(source) : undefined
    if (!template) {
      return { markdown: '' }
    }

    const rendered = context.renderFragment(template, source, { values: context.scope.values })
    return { markdown: cleanMarkdownFragment(rendered) }
  },
}
