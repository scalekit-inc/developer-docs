import type { Config, Context } from '@netlify/edge-functions'

export default async function handler(request: Request, context: Context) {
  const accept = request.headers.get('accept') ?? ''

  // Serve the richer agent export when available, then fall back to .md.
  if (accept.includes('text/markdown')) {
    const url = new URL(request.url)
    const basePath = url.pathname.replace(/\/$/, '')
    const markdownPaths = [`${basePath}.agent.md`, `${basePath}.md`]

    for (const path of markdownPaths) {
      const response = await fetch(new URL(path, url.origin).toString())
      if (response.ok) {
        const headers = new Headers(response.headers)
        headers.set('content-type', 'text/markdown; charset=utf-8')
        headers.set('link', '</llms.txt>; rel="llms-txt"')
        return new Response(response.body, { status: 200, headers })
      }
    }
  }

  // Add llms.txt discovery header to all HTML responses
  const response = await context.next()
  response.headers.set('link', '</llms.txt>; rel="llms-txt"')
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
