import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async (context) => {
  const tokenUrl =
    import.meta.env.SCALEKIT_TOKEN_URL ?? 'https://placeholder.scalekit.com/oauth/token'
  const clientId = import.meta.env.SCALEKIT_CLIENT_ID ?? ''
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
      code_verifier: codeVerifier,
    }).toString(),
  })

  if (!tokenResponse.ok) {
    return context.redirect('/auth/login?error=token_exchange_failed')
  }

  const tokenData = (await tokenResponse.json()) as {
    access_token?: string
    id_token?: string
    refresh_token?: string
    expires_in?: number
    refresh_token_expires_in?: number
  }

  // Verify that at least one token was received
  // An incomplete OAuth response without tokens should not be treated as successful
  if (!tokenData.access_token && !tokenData.id_token) {
    return context.redirect('/auth/login?error=token_exchange_failed')
  }

  const maxAge = tokenData.expires_in ? Number(tokenData.expires_in) : 60 * 60
  // Refresh tokens typically live longer (30 days default, or use provider's value)
  const refreshMaxAge = tokenData.refresh_token_expires_in
    ? Number(tokenData.refresh_token_expires_in)
    : 30 * 24 * 60 * 60
  const secureCookie = !import.meta.env.DEV

  // Build clean redirect URL
  // Remove any query parameters or fragments from the redirect path
  const pathnameOnly = postLoginRedirect.split('?')[0].split('#')[0]
  let cleanRedirect = pathnameOnly || '/'

  // Ensure it starts with /
  if (!cleanRedirect.startsWith('/')) {
    cleanRedirect = '/'
  }

  // Use absolute URL for the redirect
  const redirectUrl = new URL(cleanRedirect, context.url.origin)
  const finalRedirectUrl = redirectUrl.toString()

  // Create cookies as Set-Cookie headers
  // Using manual headers because we return a custom Response (not context.redirect)
  // to work around Netlify middleware mode merging query params into Location header
  const cookieHeaders: string[] = []
  if (tokenData.access_token) {
    cookieHeaders.push(
      `sk_access_token=${tokenData.access_token}; HttpOnly; ${secureCookie ? 'Secure;' : ''} SameSite=Lax; Path=/; Max-Age=${maxAge}`,
    )
  }
  if (tokenData.id_token) {
    cookieHeaders.push(
      `sk_id_token=${tokenData.id_token}; HttpOnly; ${secureCookie ? 'Secure;' : ''} SameSite=Lax; Path=/; Max-Age=${maxAge}`,
    )
  }
  if (tokenData.refresh_token) {
    cookieHeaders.push(
      `sk_refresh_token=${tokenData.refresh_token}; HttpOnly; ${secureCookie ? 'Secure;' : ''} SameSite=Strict; Path=/auth/refresh; Max-Age=${refreshMaxAge}`,
    )
  }
  // Delete PKCE cookies
  cookieHeaders.push('sk_pkce_verifier=; Path=/; Max-Age=0')
  cookieHeaders.push('sk_pkce_state=; Path=/; Max-Age=0')
  cookieHeaders.push('sk_post_login_redirect=; Path=/; Max-Age=0')

  const headers = new Headers()
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  cookieHeaders.forEach((cookie) => headers.append('Set-Cookie', cookie))

  // Return HTML page with client-side redirect
  // This bypasses Netlify middleware mode's behavior of merging the original
  // request's query params (?code=...&state=...) into 302 redirect Location headers
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=${finalRedirectUrl}">
  <title>Redirecting...</title>
  <script>window.location.replace("${finalRedirectUrl}");</script>
</head>
<body>
  <p>Redirecting to <a href="${finalRedirectUrl}">${finalRedirectUrl}</a>...</p>
</body>
</html>`

  return new Response(html, { status: 200, headers })
}
