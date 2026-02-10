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

  // Validate SCALEKIT_AUTHORIZE_URL is provided and properly formatted
  if (!authorizeUrl) {
    console.error('[support-hash] SCALEKIT_AUTHORIZE_URL is not configured')
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Validate URL format and ensure it ends with /oauth/authorize
  let baseUrl: string
  try {
    const url = new URL(authorizeUrl)
    if (!url.pathname.endsWith('/oauth/authorize')) {
      console.error('[support-hash] SCALEKIT_AUTHORIZE_URL must end with /oauth/authorize')
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    // Remove /oauth/authorize from pathname and reconstruct base URL
    url.pathname = url.pathname.slice(0, -'/oauth/authorize'.length)
    baseUrl = url.toString().replace(/\/$/, '') // Remove trailing slash if present
  } catch {
    // Fallback: if URL parsing fails, use string manipulation
    if (!authorizeUrl.endsWith('/oauth/authorize')) {
      console.error('[support-hash] SCALEKIT_AUTHORIZE_URL must end with /oauth/authorize')
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    baseUrl = authorizeUrl.slice(0, -'/oauth/authorize'.length)
  }

  const supportHashUrl = `${baseUrl}/api/v1/users/support-hash`

  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }

    const response = await fetch(supportHashUrl, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to get support hash' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await response.json()
    const supportHash = data?.support_hash || data?.email_hash || null
    return new Response(JSON.stringify({ support_hash: supportHash, email_hash: supportHash }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to fetch support hash' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
