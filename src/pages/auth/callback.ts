import type { APIRoute } from 'astro'
import {
  getAuthorizeUrl,
  getClientId,
  getRedirectUri,
  getScopes,
  getTokenUrl,
} from '@/utils/auth/auth-config'
import {
  buildAuthCookieHeaders,
  buildPkceClearCookieHeaders,
  getSecureCookieFlag,
  getTokenMaxAges,
  setPkceCookies,
} from '@/utils/auth/auth-cookies'
import { normalizePostLoginRedirect, toAbsoluteRedirectUrl } from '@/utils/auth/auth-redirects'
import { parseTokenResponse, requestToken } from '@/utils/auth/auth-tokens'
import { genCodeChallenge, genCodeVerifier, genRandomString } from '@/utils/auth/pkce'

/**
 * Escapes HTML special characters to prevent XSS attacks.
 * Converts &, <, >, ", ', and / into safe HTML entities.
 */
function htmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Escapes JavaScript string special characters to prevent XSS attacks.
 * Escapes quotes, backslashes, and control characters for use in JavaScript string literals.
 */
function jsEscape(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\u2028/g, '\\u2028') // Line separator
    .replace(/\u2029/g, '\\u2029') // Paragraph separator
}

export const prerender = false

export const GET: APIRoute = async (context) => {
  const tokenUrl = getTokenUrl()
  const clientId = getClientId()
  const redirectUri = getRedirectUri(context.url)

  const code = context.url.searchParams.get('code')
  const returnedState = context.url.searchParams.get('state')
  const error = context.url.searchParams.get('error')

  // Handle OAuth error responses (like prompt=none failures)
  if (error === 'login_required') {
    // User is not logged in, construct login URL without prompt=none and redirect
    const authorizeUrl = getAuthorizeUrl()
    const scope = getScopes()

    const codeVerifier = genCodeVerifier()
    const state = genRandomString()
    const codeChallenge = await genCodeChallenge(codeVerifier)

    setPkceCookies(context, codeVerifier, state)

    const authUrl = new URL(authorizeUrl)
    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('scope', scope)
    authUrl.searchParams.set('state', state)
    authUrl.searchParams.set('code_challenge', codeChallenge)
    authUrl.searchParams.set('code_challenge_method', 'S256')

    return context.redirect(authUrl.toString())
  }

  const storedState = context.cookies.get('sk_pkce_state')?.value
  const codeVerifier = context.cookies.get('sk_pkce_verifier')?.value
  const postLoginRedirect = context.cookies.get('sk_post_login_redirect')?.value ?? '/'

  if (!code || !returnedState || !storedState || returnedState !== storedState || !codeVerifier) {
    return context.redirect('/auth/login?error=invalid_state')
  }

  const tokenResponse = await requestToken(
    tokenUrl,
    new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    }),
  )

  if (!tokenResponse.ok) {
    return context.redirect('/auth/login?error=token_exchange_failed')
  }

  const tokenData = await parseTokenResponse(tokenResponse)

  // Verify that at least one token was received
  // An incomplete OAuth response without tokens should not be treated as successful
  if (!tokenData.access_token && !tokenData.id_token) {
    return context.redirect('/auth/login?error=token_exchange_failed')
  }

  const { maxAge, refreshMaxAge } = getTokenMaxAges(tokenData)
  const secureCookie = getSecureCookieFlag()

  const cleanRedirect = normalizePostLoginRedirect(postLoginRedirect)
  const finalRedirectUrl = toAbsoluteRedirectUrl(context.url.origin, cleanRedirect)

  // Create cookies as Set-Cookie headers
  // Using manual headers because we return a custom Response (not context.redirect)
  // to work around Netlify middleware mode merging query params into Location header
  const cookieHeaders = [
    ...buildAuthCookieHeaders(tokenData, secureCookie, maxAge, refreshMaxAge),
    ...buildPkceClearCookieHeaders(),
  ]

  const headers = new Headers()
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  cookieHeaders.forEach((cookie) => headers.append('Set-Cookie', cookie))

  // Return HTML page with client-side redirect
  // This bypasses Netlify middleware mode's behavior of merging the original
  // request's query params (?code=...&state=...) into 302 redirect Location headers
  // Security: Escape finalRedirectUrl to prevent XSS attacks
  const htmlEscapedUrl = htmlEscape(finalRedirectUrl)
  const jsEscapedUrl = jsEscape(finalRedirectUrl)
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=${htmlEscapedUrl}">
  <title>Redirecting...</title>
  <script>window.location.replace("${jsEscapedUrl}");</script>
</head>
<body>
  <p>Redirecting to <a href="${htmlEscapedUrl}">${htmlEscapedUrl}</a>...</p>
</body>
</html>`

  return new Response(html, { status: 200, headers })
}
