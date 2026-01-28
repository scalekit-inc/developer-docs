import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async (context) => {
  context.cookies.delete('sk_access_token', { path: '/' })
  context.cookies.delete('sk_id_token', { path: '/' })
  context.cookies.delete('sk_pkce_verifier', { path: '/' })
  context.cookies.delete('sk_pkce_state', { path: '/' })
  context.cookies.delete('sk_post_login_redirect', { path: '/' })

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=/" />
    <title>Signing out…</title>
  </head>
  <body>
    <script>
      try {
        localStorage.removeItem('sk_auth_session');
      } catch {}
      window.location.replace('/');
    </script>
  </body>
</html>`

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
  })
}
