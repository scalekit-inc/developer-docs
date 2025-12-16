import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params }) => {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  const target = `/agent-auth/${slug ?? ''}/`
  return Response.redirect(target, 301)
}

export const prerender = false
