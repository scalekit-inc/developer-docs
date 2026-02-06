import type { APIRoute } from 'astro'
import { genCodeChallenge, genCodeVerifier, genRandomString } from '@/utils/auth/pkce'

export const prerender = false

export const GET: APIRoute = async (context) => {
  const authorizeUrl =
    import.meta.env.SCALEKIT_AUTHORIZE_URL ?? 'https://auth.scalekit.com/oauth/authorize'
  const clientId = import.meta.env.SCALEKIT_CLIENT_ID ?? ''
  const redirectUri =
    import.meta.env.SCALEKIT_REDIRECT_URI ?? new URL('/auth/callback', context.url).toString()
  const scope = import.meta.env.SCALEKIT_SCOPES ?? 'openid email profile offline_access'

  const codeVerifier = genCodeVerifier()
  const state = genRandomString()
  const codeChallenge = await genCodeChallenge(codeVerifier)

  const secureCookie = !import.meta.env.DEV
  const pkceCookieOptions = {
    httpOnly: true,
    secure: secureCookie,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 10, // 10 minutes
  }

  context.cookies.set('sk_pkce_verifier', codeVerifier, pkceCookieOptions)
  context.cookies.set('sk_pkce_state', state, pkceCookieOptions)

  const redirectTarget = context.url.searchParams.get('redirect')
  if (redirectTarget) {
    // Validate redirect URL to prevent open redirect attacks
    // Only allow relative paths (starting with /) or same-origin URLs
    try {
      const redirectUrl = new URL(redirectTarget, context.url.origin)
      // Only allow same-origin redirects
      if (redirectUrl.origin === context.url.origin && redirectUrl.pathname.startsWith('/')) {
        context.cookies.set('sk_post_login_redirect', redirectUrl.pathname, pkceCookieOptions)
      }
    } catch {
      // Invalid URL, ignore redirect parameter
    }
  }

  const authUrl = new URL(authorizeUrl)
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('scope', scope)
  authUrl.searchParams.set('state', state)
  authUrl.searchParams.set('code_challenge', codeChallenge)
  authUrl.searchParams.set('code_challenge_method', 'S256')
  authUrl.searchParams.set('prompt', 'none')

  return context.redirect(authUrl.toString())
}
