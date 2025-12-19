import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params, request }) => {
  // Handle both array and string slug formats
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug || ''

  // Construct target URL - ensure trailing slash for consistency
  let target = `/agent-auth/`
  if (slug) {
    target = `/agent-auth/${slug}/`
  }

  // Use absolute URL for redirect to ensure proper handling
  const url = new URL(request.url)
  const redirectUrl = new URL(target, url.origin)

  return Response.redirect(redirectUrl.toString(), 301)
}

export const prerender = false
