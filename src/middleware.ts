import { defineMiddleware } from 'astro:middleware'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { verifyJwt } from '@/utils/auth/jwt'

const PUBLIC_PATH_PREFIXES = [
  '/auth/',
  '/_astro/',
  '/assets/',
  '/images/',
  '/fonts/',
  '/favicon',
  '/robots.txt',
  '/sitemap',
]

const PROTECTED_PATH_PREFIXES = ['/admin', '/unreleased']

function isPublicPath(pathname: string): boolean {
  if (pathname === '/') return true
  return PUBLIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url

  // Serve raw MDX source for agents that send Accept: text/markdown
  const accept = context.request.headers.get('accept') ?? ''
  if (accept.includes('text/markdown')) {
    const slug = pathname.replace(/\/$/, '') || '/index'
    const candidates = [
      join(process.cwd(), 'src/content/docs', `${slug}.mdx`),
      join(process.cwd(), 'src/content/docs', `${slug}/index.mdx`),
      join(process.cwd(), 'src/content/docs', `${slug}.md`),
    ]
    for (const filePath of candidates) {
      try {
        const content = await readFile(filePath, 'utf-8')
        return new Response(content, {
          headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
        })
      } catch {
        // try next candidate
      }
    }
    // No source file found — fall through to normal response
  }

  // Only allow access to public paths without authentication
  if (isPublicPath(pathname)) {
    const response = await next()
    response.headers.set('Link', '</llms.txt>; rel="llms-txt"')
    return response
  }

  // Require authentication for protected paths
  if (isProtectedPath(pathname)) {
    const accessToken = context.cookies.get('sk_access_token')?.value
    if (!accessToken) {
      return context.redirect(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
    }

    try {
      const verified = await verifyJwt(accessToken)
      // If verification is not configured (returns null), deny access
      // This prevents bypassing authentication when JWT verification is disabled
      if (!verified) {
        context.cookies.delete('sk_access_token', { path: '/' })
        context.cookies.delete('sk_id_token', { path: '/' })
        return context.redirect(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
      }
    } catch {
      context.cookies.delete('sk_access_token', { path: '/' })
      context.cookies.delete('sk_id_token', { path: '/' })
      return context.redirect(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
    }
  }

  const response = await next()
  response.headers.set('Link', '</llms.txt>; rel="llms-txt"')
  return response
})
