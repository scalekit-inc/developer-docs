import type { APIRoute } from 'astro'
import { verifyJwt } from '@/utils/auth/jwt'

export const GET: APIRoute = async (context) => {
  const accessToken = context.cookies.get('sk_access_token')?.value
  const idToken = context.cookies.get('sk_id_token')?.value

  if (!accessToken) {
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

  if (idToken) {
    try {
      const verified = await verifyJwt(idToken)
      idTokenClaims = (verified?.payload as Record<string, unknown>) ?? null
    } catch {
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  return new Response(
    JSON.stringify({
      authenticated: true,
      user: userInfo,
      idTokenClaims,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  )
}
