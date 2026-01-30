import { defineMiddleware } from 'astro:middleware'
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

  // Only allow access to public paths without authentication
  if (isPublicPath(pathname)) {
    return next()
  }

  // Require authentication for protected paths
  if (isProtectedPath(pathname)) {
    const accessToken = context.cookies.get('sk_access_token')?.value
    if (!accessToken) {
      return context.redirect(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
    }

    try {
      await verifyJwt(accessToken)
    } catch {
      context.cookies.delete('sk_access_token', { path: '/' })
      context.cookies.delete('sk_id_token', { path: '/' })
      return context.redirect(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
    }
  }

  return next()
})
