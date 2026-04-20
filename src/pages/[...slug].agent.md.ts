import type { APIRoute } from 'astro'
import { getAgentMarkdownRoutes, renderAgentMarkdown } from '@/lib/agent-markdown/registry'

export const prerender = true

export function getStaticPaths() {
  return getAgentMarkdownRoutes().map((route) => ({
    params: { slug: route },
  }))
}

export const GET: APIRoute = async ({ params }) => {
  const route = params.slug
  if (!route) {
    return new Response('Not found', { status: 404 })
  }

  const markdown = renderAgentMarkdown(route)
  if (!markdown) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(markdown, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
    },
  })
}
