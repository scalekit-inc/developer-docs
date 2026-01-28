import { defineMiddleware } from 'astro:middleware'
import { verifyJwt } from '@/utils/auth/jwt'

// #region agent log
fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    location: 'src/middleware.ts:4',
    message: 'middleware module init',
    data: {},
    timestamp: Date.now(),
    sessionId: 'debug-session',
    runId: 'pre-fix',
    hypothesisId: 'H1',
  }),
}).catch(() => {})
// #endregion agent log

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

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'src/middleware.ts:27',
      message: 'onRequest entry',
      data: { pathname },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'pre-fix',
      hypothesisId: 'H4',
    }),
  }).catch(() => {})
  // #endregion agent log

  if (isPublicPath(pathname) || !isProtectedPath(pathname)) {
    return next()
  }

  const accessToken = context.cookies.get('sk_access_token')?.value
  if (!accessToken) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'src/middleware.ts:36',
        message: 'missing access token',
        data: { pathname },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'pre-fix',
        hypothesisId: 'H4',
      }),
    }).catch(() => {})
    // #endregion agent log
    return context.redirect(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
  }

  try {
    await verifyJwt(accessToken)
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'src/middleware.ts:44',
        message: 'verifyJwt completed',
        data: { pathname },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'pre-fix',
        hypothesisId: 'H3',
      }),
    }).catch(() => {})
    // #endregion agent log
  } catch {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'src/middleware.ts:48',
        message: 'verifyJwt failed',
        data: { pathname },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'pre-fix',
        hypothesisId: 'H3',
      }),
    }).catch(() => {})
    // #endregion agent log
    context.cookies.delete('sk_access_token', { path: '/' })
    context.cookies.delete('sk_id_token', { path: '/' })
    return context.redirect(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
  }

  return next()
})
