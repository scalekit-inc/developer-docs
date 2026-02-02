import type { APIRoute } from 'astro'
import { verifyJwt } from '@/utils/auth/jwt'

export const prerender = false

export const GET: APIRoute = async (context) => {
  const accessToken = context.cookies.get('sk_access_token')?.value
  const idToken = context.cookies.get('sk_id_token')?.value

  if (!accessToken) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Verify the accessToken cryptographically before proceeding
  let verifiedAccessToken: { payload: Record<string, unknown> } | null = null
  try {
    verifiedAccessToken = await verifyJwt(accessToken)
    if (!verifiedAccessToken) {
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } catch {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const userinfoUrl = import.meta.env.SCALEKIT_USERINFO_URL ?? ''
  let userInfo: Record<string, unknown> | null = null

  if (userinfoUrl) {
    try {
      const response = await fetch(userinfoUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (response.ok) {
        userInfo = (await response.json()) as Record<string, unknown>
      }
    } catch {
      userInfo = null
    }
  }

  let idTokenClaims: Record<string, unknown> | null = null
  let accessExpMs: number | null = null
  let idExpMs: number | null = null

  // Access token expiry (prefer for session freshness)
  if (verifiedAccessToken) {
    const atExp = (verifiedAccessToken.payload?.exp as number | undefined) ?? undefined
    if (typeof atExp === 'number') {
      accessExpMs = atExp * 1000
    }
  }

  if (idToken) {
    try {
      const verified = await verifyJwt(idToken)
      if (!verified) {
        return new Response(JSON.stringify({ authenticated: false }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      idTokenClaims = (verified.payload as Record<string, unknown>) ?? null
      const exp = (idTokenClaims?.exp as number | undefined) ?? undefined
      if (typeof exp === 'number') {
        idExpMs = exp * 1000
      }
    } catch {
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  // Extract uid (sub) and xoid from ID token or access token
  let uid: string | null = null
  let xoid: string | null = null

  // First try ID token claims
  if (idTokenClaims) {
    uid = (idTokenClaims.sub as string | undefined) ?? null
    xoid = (idTokenClaims.xoid as string | undefined) ?? null
  }

  // Fallback to access token claims if not found
  if ((!uid || !xoid) && verifiedAccessToken) {
    const accessTokenPayload = verifiedAccessToken.payload as Record<string, unknown>
    if (!uid) uid = (accessTokenPayload.sub as string | undefined) ?? null
    if (!xoid) xoid = (accessTokenPayload.xoid as string | undefined) ?? null
  }

  // Use earliest expiry to drive UI/session cache
  const expiresAt =
    accessExpMs && idExpMs ? Math.min(accessExpMs, idExpMs) : (accessExpMs ?? idExpMs ?? null)

  return new Response(
    JSON.stringify({
      authenticated: true,
      user: userInfo,
      idTokenClaims,
      idToken, // Include raw JWT for logout
      uid, // User ID (from sub claim)
      xoid, // Workspace ID
      expiresAt,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  )
}
