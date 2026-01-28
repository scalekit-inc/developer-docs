import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async (context) => {
  context.cookies.delete('sk_access_token', { path: '/' })
  context.cookies.delete('sk_id_token', { path: '/' })
  context.cookies.delete('sk_pkce_verifier', { path: '/' })
  context.cookies.delete('sk_pkce_state', { path: '/' })
  context.cookies.delete('sk_post_login_redirect', { path: '/' })

  return context.redirect('/')
}
