import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async (context) => {
  const tokenUrl =
    import.meta.env.SCALEKIT_TOKEN_URL ?? 'https://placeholder.scalekit.com/oauth/token'
  const clientId = import.meta.env.SCALEKIT_CLIENT_ID ?? ''
  const clientSecret = import.meta.env.SCALEKIT_CLIENT_SECRET ?? ''
  const redirectUri =
    import.meta.env.SCALEKIT_REDIRECT_URI ?? new URL('/auth/callback', context.url).toString()

  const code = context.url.searchParams.get('code')
  const returnedState = context.url.searchParams.get('state')

  const storedState = context.cookies.get('sk_pkce_state')?.value
  const codeVerifier = context.cookies.get('sk_pkce_verifier')?.value
  let postLoginRedirect = context.cookies.get('sk_post_login_redirect')?.value ?? '/'

  if (!code || !returnedState || !storedState || returnedState !== storedState || !codeVerifier) {
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
      client_secret: clientSecret,
      code_verifier: codeVerifier,
    }).toString(),
  })

  if (!tokenResponse.ok) {
    return context.redirect('/auth/login?error=token_exchange_failed')
  }

  const tokenData = (await tokenResponse.json()) as {
    access_token?: string
    id_token?: string
    expires_in?: number
  }

  const maxAge = tokenData.expires_in ? Number(tokenData.expires_in) : 60 * 60
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

  context.cookies.delete('sk_pkce_verifier', { path: '/' })
  context.cookies.delete('sk_pkce_state', { path: '/' })
  context.cookies.delete('sk_post_login_redirect', { path: '/' })

  return context.redirect(postLoginRedirect)
}
