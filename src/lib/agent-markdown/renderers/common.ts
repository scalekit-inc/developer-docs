import { cleanMarkdownFragment, collapseBlankLines } from '../markdown'
import { resolveProps } from '../page-parser'
import type { ComponentRenderer } from '../types'

function renderCheckItemMarkdown(props: Record<string, unknown>, slot: string): string {
  const text = cleanMarkdownFragment(slot)
  const href = typeof props.href === 'string' ? props.href : ''
  return href ? `- [${text}](${href})` : `- ${text}`
}

function renderFoldCardMarkdown(props: Record<string, unknown>, slot: string): string {
  const title = typeof props.title === 'string' ? props.title : 'Card'
  const href = typeof props.href === 'string' ? props.href : ''
  const badgeText =
    props.badge && typeof props.badge === 'object' && props.badge && 'text' in props.badge
      ? String((props.badge as { text?: string }).text ?? '')
      : ''
  const body = cleanMarkdownFragment(slot)
  const heading = href ? `### [${title}](${href})` : `### ${title}`
  const lines = [heading]

  if (badgeText) lines.push('', `Badge: ${badgeText}`)
  if (body) lines.push('', body)

  return collapseBlankLines(lines.join('\n'))
}

export const checkItemRenderer: ComponentRenderer = {
  supports: (usage) =>
    usage.importBinding?.resolvedSource === '/src/components/ui/CheckItem.astro' &&
    !usage.selfClosing,
  render: (usage, context) => {
    const props = resolveProps(usage.attrs, context.scope.values)
    return { markdown: renderCheckItemMarkdown(props, usage.slot ?? '') }
  },
}

export const foldCardRenderer: ComponentRenderer = {
  supports: (usage) =>
    usage.importBinding?.resolvedSource === '/src/components/ui/FoldCard.astro' &&
    !usage.selfClosing,
  render: (usage, context) => {
    const props = resolveProps(usage.attrs, context.scope.values)
    const slot = context.renderFragment(usage.slot ?? '', context.file.filePath, context.scope)
    return { markdown: renderFoldCardMarkdown(props, slot) }
  },
}

export const subtitleRenderer: ComponentRenderer = {
  supports: (usage) =>
    usage.importBinding?.resolvedSource === '/src/components/ui/Subtitle.astro' &&
    !usage.selfClosing,
  render: (usage, context) => ({
    markdown: cleanMarkdownFragment(
      context.renderFragment(usage.slot ?? '', context.file.filePath, context.scope),
    ),
  }),
}
