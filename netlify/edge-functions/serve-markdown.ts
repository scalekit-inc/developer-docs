import type { Config, Context } from '@netlify/edge-functions'

function stripInline(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim()
}

function htmlToMarkdown(html: string): string {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const pageTitle = titleMatch ? titleMatch[1].replace(/\s*[\|–\-]\s*[^|–\-]*$/, '').trim() : ''

  // Extract article or main content
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
  let body = articleMatch ? articleMatch[1] : mainMatch ? mainMatch[1] : html

  // Strip noise
  body = body
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, '')
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, '')
    .replace(/<aside\b[\s\S]*?<\/aside>/gi, '')
    .replace(/<header\b[\s\S]*?<\/header>/gi, '')
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, '')

  // Fenced code blocks
  body = body.replace(
    /<pre[^>]*>[\s\S]*?<code[^>]*>([\s\S]*?)<\/code>[\s\S]*?<\/pre>/gi,
    (_, code) => {
      const decoded = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
      return '\n```\n' + decoded.trim() + '\n```\n\n'
    },
  )

  // Inline code
  body = body.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, c) => {
    const decoded = c.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    return '`' + decoded.trim() + '`'
  })

  // Headings
  body = body
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => '# ' + stripInline(t) + '\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => '## ' + stripInline(t) + '\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => '### ' + stripInline(t) + '\n\n')
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => '#### ' + stripInline(t) + '\n\n')

  // Links
  body = body.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
    const clean = stripInline(text)
    return clean ? `[${clean}](${href})` : href
  })

  // Bold / italic
  body = body
    .replace(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, (_, t) => `**${stripInline(t)}**`)
    .replace(/<(?:em|i)[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, (_, t) => `*${stripInline(t)}*`)

  // Lists
  body = body
    .replace(
      /<li[^>]*>([\s\S]*?)<\/li>/gi,
      (_, t) => '- ' + stripInline(t).replace(/\n+/g, ' ').trim() + '\n',
    )
    .replace(/<\/[uo]l>/gi, '\n')
    .replace(/<[uo]l[^>]*>/gi, '\n')

  // Blocks
  body = body
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => stripInline(t) + '\n\n')
    .replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, (_, t) => t + '\n')

  // Strip remaining tags + decode entities
  body = body
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{4,}/g, '\n\n\n')
    .trim()

  return pageTitle ? `# ${pageTitle}\n\n${body}` : body
}

const LINK_HEADER = [
  '</llms.txt>; rel="llms-txt"',
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</apis/>; rel="service-doc"',
  '</apis.md>; rel="service-doc"; type="text/markdown"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"',
].join(', ')

export default async function handler(request: Request, context: Context) {
  const accept = request.headers.get('accept') ?? ''

  if (accept.includes('text/markdown')) {
    const url = new URL(request.url)
    const basePath = url.pathname.replace(/\/$/, '')

    // Try pre-built agent markdown exports first
    for (const mdPath of [`${basePath}.agent.md`, `${basePath}.md`]) {
      const mdResponse = await fetch(new URL(mdPath, url.origin).toString())
      if (mdResponse.ok) {
        const text = await mdResponse.text()
        const tokens = Math.ceil(text.split(/\s+/).length * 1.3)
        const headers = new Headers(mdResponse.headers)
        headers.set('content-type', 'text/markdown; charset=utf-8')
        headers.set('x-markdown-tokens', String(tokens))
        headers.set('link', LINK_HEADER)
        headers.set('vary', 'Accept')
        return new Response(text, { status: 200, headers })
      }
    }

    // Fall back to on-the-fly HTML → markdown conversion
    const htmlResponse = await context.next()
    const contentType = htmlResponse.headers.get('content-type') ?? ''

    if (contentType.includes('text/html')) {
      const html = await htmlResponse.text()
      const markdown = htmlToMarkdown(html)
      const tokens = Math.ceil(markdown.split(/\s+/).length * 1.3)

      const headers = new Headers()
      headers.set('content-type', 'text/markdown; charset=utf-8')
      headers.set('x-markdown-tokens', String(tokens))
      headers.set('link', LINK_HEADER)
      headers.set('vary', 'Accept')
      const cc = htmlResponse.headers.get('cache-control')
      if (cc) headers.set('cache-control', cc)

      return new Response(markdown, { status: 200, headers })
    }

    return htmlResponse
  }

  // Default: pass through with llms.txt discovery link
  const response = await context.next()
  response.headers.set('link', LINK_HEADER)
  return response
}

export const config: Config = {
  path: '/*',
  excludedPath: [
    '/_astro/*',
    '/assets/*',
    '/images/*',
    '/fonts/*',
    '/favicon*',
    '/*.js',
    '/*.css',
    '/*.json',
    '/*.xml',
    '/*.txt',
    '/*.md',
  ],
}
