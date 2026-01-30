import type { APIRoute } from 'astro'
import { verifyJwt } from '@/utils/auth/jwt'

export const prerender = false

export const POST: APIRoute = async (context) => {
  const tokenUrl =
    import.meta.env.SCALEKIT_TOKEN_URL ?? 'https://placeholder.scalekit.com/oauth/token'
  const clientId = import.meta.env.SCALEKIT_CLIENT_ID ?? ''

  const refreshToken = context.cookies.get('sk_refresh_token')?.value

  if (!refreshToken) {
    return new Response(JSON.stringify({ error: 'No refresh token available' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Exchange refresh token for new access token
  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
    }).toString(),
  })

  if (!tokenResponse.ok) {
    // Refresh token expired or invalid - clear all auth cookies
    context.cookies.delete('sk_access_token', { path: '/' })
    context.cookies.delete('sk_id_token', { path: '/' })
    context.cookies.delete('sk_refresh_token', { path: '/' })

    return new Response(JSON.stringify({ error: 'Refresh token failed' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const tokenData = (await tokenResponse.json()) as {
    access_token?: string
    id_token?: string
    refresh_token?: string
    expires_in?: number
    refresh_token_expires_in?: number
  }

  // Verify we received new tokens
  if (!tokenData.access_token && !tokenData.id_token) {
    return new Response(JSON.stringify({ error: 'Token exchange failed' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const maxAge = tokenData.expires_in ? Number(tokenData.expires_in) : 60 * 60
  const refreshMaxAge = tokenData.refresh_token_expires_in
    ? Number(tokenData.refresh_token_expires_in)
    : 30 * 24 * 60 * 60
  const secureCookie = !import.meta.env.DEV

  // Update access token
  if (tokenData.access_token) {
    context.cookies.set('sk_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: 'lax',
      path: '/',
      maxAge,
    })
  }

  // Update ID token
  if (tokenData.id_token) {
    context.cookies.set('sk_id_token', tokenData.id_token, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: 'lax',
      path: '/',
      maxAge,
    })
  }

  // Update refresh token (rotation - provider may return new one)
  if (tokenData.refresh_token) {
    context.cookies.set('sk_refresh_token', tokenData.refresh_token, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: 'strict',
      path: '/',
      maxAge: refreshMaxAge,
    })
  }

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
