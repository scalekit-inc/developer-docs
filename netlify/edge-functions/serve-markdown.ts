import type { Config, Context } from '@netlify/edge-functions'

export default async function handler(request: Request, context: Context) {
  const accept = request.headers.get('accept') ?? ''

  // Serve pre-generated .md file for agents that send Accept: text/markdown
  if (accept.includes('text/markdown')) {
    const url = new URL(request.url)
    const mdPath = url.pathname.replace(/\/$/, '') + '.md'
    const mdUrl = new URL(mdPath, url.origin).toString()

    const response = await fetch(mdUrl)
    if (response.ok) {
      const headers = new Headers(response.headers)
      headers.set('content-type', 'text/markdown; charset=utf-8')
      headers.set('link', '</llms.txt>; rel="llms-txt"')
      return new Response(response.body, { status: 200, headers })
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
