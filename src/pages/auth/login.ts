import type { APIRoute } from 'astro'
import { getAuthorizeUrl, getClientId, getRedirectUri, getScopes } from '@/utils/auth/auth-config'
import { setPkceCookies, setPostLoginRedirectCookie } from '@/utils/auth/auth-cookies'
import { getSafeRedirectPath } from '@/utils/auth/auth-redirects'
import { genCodeChallenge, genCodeVerifier, genRandomString } from '@/utils/auth/pkce'

export const prerender = false

export const GET: APIRoute = async (context) => {
  const authorizeUrl = getAuthorizeUrl()
  const clientId = getClientId()
  const redirectUri = getRedirectUri(context.url)
  const scope = getScopes()

  const codeVerifier = genCodeVerifier()
  const state = genRandomString()
  const codeChallenge = await genCodeChallenge(codeVerifier)

  setPkceCookies(context, codeVerifier, state)

  const redirectTarget = context.url.searchParams.get('redirect')
  const safeRedirect = getSafeRedirectPath(context.url, redirectTarget)
  if (safeRedirect) {
    setPostLoginRedirectCookie(context, safeRedirect)
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
