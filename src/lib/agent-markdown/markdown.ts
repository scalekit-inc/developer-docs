export function normalizeLines(value: string): string {
  return value.replace(/\r\n/g, '\n')
}

export function collapseBlankLines(value: string): string {
  return normalizeLines(value)
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function dedent(value: string): string {
  const lines = normalizeLines(value).split('\n')
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^ */)?.[0].length ?? 0)

  if (indents.length === 0) return value.trim()

  const minIndent = Math.min(...indents)
  return lines
    .map((line) => line.slice(minIndent))
    .join('\n')
    .trim()
}

function renderParagraphs(markdown: string): string {
  return markdown.replace(/<p>([\s\S]*?)<\/p>/g, (_match, body) => `${dedent(body)}\n`)
}

function renderHtmlLinks(markdown: string): string {
  return markdown.replace(
    /<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
    (_match, href, label) => {
      const text = dedent(label).replace(/\s+/g, ' ').trim()
      return `[${text}](${href})`
    },
  )
}

function renderImagesAsNotes(markdown: string): string {
  return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt) => {
    const label = alt?.trim() || 'Screenshot'
    return `> Image: ${label}`
  })
}

function renderAsides(markdown: string): string {
  return markdown.replace(/<Aside\b([^>]*)>([\s\S]*?)<\/Aside>/g, (_match, attrs, body) => {
    const title = attrs.match(/title="([^"]+)"/)?.[1]
    const type = attrs.match(/type="([^"]+)"/)?.[1]
    const heading = [type, title].filter(Boolean).join(': ')
    const content = dedent(body)
      .split('\n')
      .map((line) => (line.trim().length > 0 ? `> ${line}` : '>'))
      .join('\n')

    return heading ? `> ${heading}\n>\n${content}` : content
  })
}

function renderDetails(markdown: string): string {
  return markdown.replace(
    /<details>\s*<summary>([\s\S]*?)<\/summary>\s*([\s\S]*?)<\/details>/g,
    (_match, summary, body) =>
      `## ${dedent(summary).replace(/\s+/g, ' ').trim()}\n\n${dedent(body)}\n`,
  )
}

function renderTabs(markdown: string): string {
  const withTabItems = markdown.replace(
    /<TabItem\b([^>]*)label="([^"]+)"[^>]*>([\s\S]*?)<\/TabItem>/g,
    (_match, _attrs, label, body) => `### ${label}\n\n${dedent(body)}\n`,
  )

  return withTabItems.replace(/<\/?Tabs[^>]*>/g, '')
}

function stripWrapperTags(markdown: string): string {
  return markdown
    .replace(/<\/?(Steps|CardGrid|Card)\b[^>]*>/g, '')
    .replace(/<\/?[A-Z][A-Za-z0-9_]*\b[^>]*\/>/g, '')
    .replace(/<\/?[A-Z][A-Za-z0-9_]*\b[^>]*>/g, '')
}

export function cleanMarkdownFragment(markdown: string): string {
  const cleaned = stripWrapperTags(
    renderImagesAsNotes(
      renderAsides(
        renderTabs(
          renderDetails(renderHtmlLinks(renderParagraphs(markdown.replace(/^import\s.+$/gm, '')))),
        ),
      ),
    ),
  )

  return collapseBlankLines(cleaned)
}
