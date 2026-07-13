import type { APIRoute } from 'astro'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Serves the self-contained hackathon hub at /hackathon.
 *
 * Source of truth for content/design: public/hackathon/index.html
 * Editors and coding agents should replace that HTML file wholesale —
 * do not put page content in this route.
 */
export const prerender = true

export const GET: APIRoute = async () => {
  const filePath = path.join(process.cwd(), 'public/hackathon/index.html')
  const html = fs.readFileSync(filePath, 'utf-8')

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
