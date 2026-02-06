import type { APIRoute } from 'astro'
import { getScalekitBaseUrl } from '@/utils/auth/auth-config'
import { clearAllAuthCookies } from '@/utils/auth/auth-cookies'

export const prerender = false

export const GET: APIRoute = async (context) => {
  // Prefer ID token from query parameter (localStorage) over cookie
  // Cookie may be cleared by middleware before we get here
  const idToken =
    context.url.searchParams.get('id_token') || context.cookies.get('sk_id_token')?.value || ''

  // Scalekit base URL from authorize URL
  const scalekitUrl = getScalekitBaseUrl()

  // Step 2: Build logout URL with id_token_hint and post_logout_redirect_uri
  const logoutUrl = new URL(`${scalekitUrl}/oidc/logout`)
  logoutUrl.searchParams.set('id_token_hint', idToken || '')
  logoutUrl.searchParams.set('post_logout_redirect_uri', context.url.origin + '/')

  // Step 3: Clear all session cookies
  clearAllAuthCookies(context)

  // Step 4: Return intermediate page that clears localStorage and redirects to Scalekit
  return new Response(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Signing out...</title>
        <script>
          // Clear localStorage after server-side cookie clearing
          localStorage.removeItem('sk_auth_session')
          localStorage.removeItem('sk_support_hash')

          // Redirect to Scalekit logout
          window.location.href = '${logoutUrl.toString()}'
        </script>
      </head>
      <body>Completing logout...</body>
    </html>
  `,
    {
      headers: { 'Content-Type': 'text/html' },
    },
  )
}
