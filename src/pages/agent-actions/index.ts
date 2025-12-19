import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  return Response.redirect('/agent-auth/quickstart/', 301)
}

export const prerender = false
