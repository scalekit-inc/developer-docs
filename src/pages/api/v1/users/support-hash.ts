import type { APIRoute } from 'astro'
import { verifyJwt } from '@/utils/auth/jwt'

export const prerender = false

export const GET: APIRoute = async (context) => {
  const accessToken = context.cookies.get('sk_access_token')?.value

  if (!accessToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Verify the access token
  try {
    const verified = await verifyJwt(accessToken)
    if (!verified) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Token verification failed' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Build API URL from SCALEKIT_AUTHORIZE_URL (remove /oauth/authorize suffix)
  const authorizeUrl = import.meta.env.SCALEKIT_AUTHORIZE_URL ?? ''
  const baseUrl = authorizeUrl.replace('/oauth/authorize', '')
  const supportHashUrl = `${baseUrl}/api/v1/users/support-hash`

  try {
    const response = await fetch(supportHashUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to get support hash' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await response.json()
    return new Response(JSON.stringify({ email_hash: data.email_hash }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to fetch support hash' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
