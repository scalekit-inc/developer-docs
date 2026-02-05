import type { APIRoute } from 'astro'
import { verifyJwt } from '@/utils/auth/jwt'

export const prerender = false

export const GET: APIRoute = async (context) => {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'callback.ts:entry',
      message: 'Callback handler entry',
      data: {
        fullUrl: context.url.toString(),
        origin: context.url.origin,
        pathname: context.url.pathname,
        search: context.url.search,
      },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      hypothesisId: 'A',
    }),
  }).catch(() => {})
  // #endregion
  const tokenUrl =
    import.meta.env.SCALEKIT_TOKEN_URL ?? 'https://placeholder.scalekit.com/oauth/token'
  const clientId = import.meta.env.SCALEKIT_CLIENT_ID ?? ''
  const redirectUri =
    import.meta.env.SCALEKIT_REDIRECT_URI ?? new URL('/auth/callback', context.url).toString()

  const code = context.url.searchParams.get('code')
  const returnedState = context.url.searchParams.get('state')

  const storedState = context.cookies.get('sk_pkce_state')?.value
  const codeVerifier = context.cookies.get('sk_pkce_verifier')?.value
  let postLoginRedirect = context.cookies.get('sk_post_login_redirect')?.value ?? '/'
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'callback.ts:cookies',
      message: 'Cookie values read',
      data: {
        postLoginRedirect,
        storedState: !!storedState,
        codeVerifier: !!codeVerifier,
        hasCode: !!code,
      },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      hypothesisId: 'B',
    }),
  }).catch(() => {})
  // #endregion

  if (!code || !returnedState || !storedState || returnedState !== storedState || !codeVerifier) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'callback.ts:error-invalid-state',
        message: 'Early return: invalid state',
        data: {
          hasCode: !!code,
          hasReturnedState: !!returnedState,
          hasStoredState: !!storedState,
          stateMatch: returnedState === storedState,
          hasVerifier: !!codeVerifier,
        },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        hypothesisId: 'E',
      }),
    }).catch(() => {})
    // #endregion
    return context.redirect('/auth/login?error=invalid_state')
  }

  // Validate redirect URL to prevent open redirect attacks
  // Only allow relative paths (starting with /)
  if (postLoginRedirect && !postLoginRedirect.startsWith('/')) {
    postLoginRedirect = '/'
  }

  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    }).toString(),
  })

  if (!tokenResponse.ok) {
    return context.redirect('/auth/login?error=token_exchange_failed')
  }

  const tokenData = (await tokenResponse.json()) as {
    access_token?: string
    id_token?: string
    refresh_token?: string
    expires_in?: number
    refresh_token_expires_in?: number
  }

  // Verify that at least one token was received
  // An incomplete OAuth response without tokens should not be treated as successful
  if (!tokenData.access_token && !tokenData.id_token) {
    return context.redirect('/auth/login?error=token_exchange_failed')
  }

  const maxAge = tokenData.expires_in ? Number(tokenData.expires_in) : 60 * 60
  // Refresh tokens typically live longer (30 days default, or use provider's value)
  const refreshMaxAge = tokenData.refresh_token_expires_in
    ? Number(tokenData.refresh_token_expires_in)
    : 30 * 24 * 60 * 60
  const secureCookie = !import.meta.env.DEV

  if (tokenData.access_token) {
    context.cookies.set('sk_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: 'lax',
      path: '/',
      maxAge,
    })
  }

  if (tokenData.id_token) {
    context.cookies.set('sk_id_token', tokenData.id_token, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: 'lax',
      path: '/',
      maxAge,
    })
  }

  // Store refresh token with stricter security (longer-lived, more sensitive)
  if (tokenData.refresh_token) {
    context.cookies.set('sk_refresh_token', tokenData.refresh_token, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: 'strict', // Stricter for refresh token
      path: '/auth/refresh', // Scope to refresh endpoint only
      maxAge: refreshMaxAge,
    })
  }

  context.cookies.delete('sk_pkce_verifier', { path: '/' })
  context.cookies.delete('sk_pkce_state', { path: '/' })
  context.cookies.delete('sk_post_login_redirect', { path: '/' })

  // Ensure redirect URL is clean and absolute (required for Netlify middleware mode)
  // Netlify middleware mode may preserve query params on relative redirects
  let cleanRedirect = postLoginRedirect
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'callback.ts:pre-clean',
      message: 'Before cleaning redirect',
      data: { postLoginRedirect, cleanRedirect },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      hypothesisId: 'B',
    }),
  }).catch(() => {})
  // #endregion

  // Remove any query parameters or fragments from the redirect path
  const pathnameOnly = cleanRedirect.split('?')[0].split('#')[0]
  cleanRedirect = pathnameOnly || '/'

  // Ensure it starts with /
  if (!cleanRedirect.startsWith('/')) {
    cleanRedirect = '/'
  }

  // Use absolute URL to prevent Netlify from preserving query parameters
  const redirectUrl = new URL(cleanRedirect, context.url.origin)
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'callback.ts:final-redirect',
      message: 'Final redirect URL constructed',
      data: {
        cleanRedirect,
        pathnameOnly,
        origin: context.url.origin,
        redirectUrlFull: redirectUrl.toString(),
        redirectUrlHref: redirectUrl.href,
        redirectUrlSearch: redirectUrl.search,
      },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      hypothesisId: 'A,C',
    }),
  }).catch(() => {})
  // #endregion

  // #region agent log - Return manual Response to bypass potential context.redirect() issues
  const finalRedirectUrl = redirectUrl.toString()
  // Create cookies as Set-Cookie headers
  const cookieHeaders = []
  if (tokenData.access_token) {
    cookieHeaders.push(
      `sk_access_token=${tokenData.access_token}; HttpOnly; ${secureCookie ? 'Secure;' : ''} SameSite=Lax; Path=/; Max-Age=${maxAge}`,
    )
  }
  if (tokenData.id_token) {
    cookieHeaders.push(
      `sk_id_token=${tokenData.id_token}; HttpOnly; ${secureCookie ? 'Secure;' : ''} SameSite=Lax; Path=/; Max-Age=${maxAge}`,
    )
  }
  if (tokenData.refresh_token) {
    cookieHeaders.push(
      `sk_refresh_token=${tokenData.refresh_token}; HttpOnly; ${secureCookie ? 'Secure;' : ''} SameSite=Strict; Path=/auth/refresh; Max-Age=${refreshMaxAge}`,
    )
  }
  // Delete cookies
  cookieHeaders.push('sk_pkce_verifier=; Path=/; Max-Age=0')
  cookieHeaders.push('sk_pkce_state=; Path=/; Max-Age=0')
  cookieHeaders.push('sk_post_login_redirect=; Path=/; Max-Age=0')

  const headers = new Headers()
  headers.set('Location', finalRedirectUrl)
  headers.set('X-Debug-CleanRedirect', cleanRedirect)
  headers.set('X-Debug-PostLoginRedirect', postLoginRedirect)
  headers.set('X-Debug-FinalUrl', finalRedirectUrl)
  cookieHeaders.forEach((cookie) => headers.append('Set-Cookie', cookie))

  return new Response(null, { status: 302, headers })
  // #endregion
}
