import type { APIRoute } from 'astro'
import { getClientId, getTokenUrl } from '@/utils/auth/auth-config'
import {
  clearSessionCookies,
  getSecureCookieFlag,
  getTokenMaxAges,
  setAuthCookies,
} from '@/utils/auth/auth-cookies'
import { requestToken, parseTokenResponse } from '@/utils/auth/auth-tokens'
import { verifyJwt } from '@/utils/auth/jwt'

export const prerender = false

export const POST: APIRoute = async (context) => {
  const tokenUrl = getTokenUrl()
  const clientId = getClientId()

  const refreshToken = context.cookies.get('sk_refresh_token')?.value

  if (!refreshToken) {
    return new Response(JSON.stringify({ error: 'No refresh token available' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Exchange refresh token for new access token
  const tokenResponse = await requestToken(
    tokenUrl,
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  )

  if (!tokenResponse.ok) {
    // Refresh token expired or invalid - clear all auth cookies
    clearSessionCookies(context)

    return new Response(JSON.stringify({ error: 'Refresh token failed' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const tokenData = await parseTokenResponse(tokenResponse)

  // Verify we received new tokens
  if (!tokenData.access_token && !tokenData.id_token) {
    return new Response(JSON.stringify({ error: 'Token exchange failed' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { maxAge, refreshMaxAge } = getTokenMaxAges(tokenData)
  const secureCookie = getSecureCookieFlag()

  setAuthCookies(context, tokenData, secureCookie, maxAge, refreshMaxAge)

  // Return new session data
  let idTokenClaims: Record<string, unknown> | null = null
  let expiresAt: number | null = null

  if (tokenData.id_token) {
    try {
      const verified = await verifyJwt(tokenData.id_token)
      idTokenClaims = (verified.payload as Record<string, unknown>) ?? null
      const exp = (idTokenClaims?.exp as number | undefined) ?? undefined
      if (typeof exp === 'number') {
        expiresAt = exp * 1000
      }
    } catch {
      // Continue even if ID token verification fails
    }
  }

  return new Response(
    JSON.stringify({
      authenticated: true,
      idTokenClaims,
      expiresAt,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  )
}
