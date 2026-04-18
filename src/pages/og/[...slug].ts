import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'
import type { APIContext } from 'astro'

/**
 * OG image generation is server-rendered on demand (not prerendered at build time)
 * to avoid loading canvaskit-wasm and generating 300+ images during the build,
 * which causes OOM on Netlify's ~8GB memory limit.
 *
 * @see https://github.com/delucis/astro-og-canvas/tree/latest/packages/astro-og-canvas#image-options
 */
export const prerender = false

// Fetch all entries from the `docs` content collection
const entries = await getCollection('docs')

// Map entries to an object keyed by id for quick lookup
const pages = Object.fromEntries(entries.map(({ id, data }) => [id, { data }]))

// Export only GET because this route is server-rendered (prerender = false)
const { GET: _GET } = await OGImageRoute({
  pages,
  // matches the `[...slug].ts` filename
  param: 'slug',
  // Customize the look of the generated card using front-matter
  getImageOptions: (_id: string, page: any) => ({
    // Show title & description pulled from front-matter
    title: page.data.title,
    description: page.data.description,
    dir: 'ltr' as const,
    logo: {
      // Resolve from this module to survive server bundle path changes.
      path: new URL('../../assets/images/scalekit-logo-white.png', import.meta.url).pathname,
    },
    bgGradient: [[255, 255, 255]],
    border: { color: [0, 255, 127], width: 16 }, // Scalekit brand green (#00FF7F)
    padding: 80,
    font: {
      title: {
        families: ['Inter Variable'],
        weights: [700],
      },
      description: {
        families: ['Inter Variable'],
        weights: [400],
      },
    },
    // Load fonts locally to avoid remote fetch timeouts during build
    fonts: [
      // Resolve from this module instead of process CWD.
      new URL(
        '../../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
        import.meta.url,
      ).pathname,
      new URL(
        '../../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-italic.woff2',
        import.meta.url,
      ).pathname,
    ],
  }),
})
export const GET = async (ctx: APIContext) => {
  try {
    return await _GET(ctx)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[og] render failed:', msg)
    if (process.env.OG_DEBUG === 'true') {
      return new Response(JSON.stringify({ error: msg }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    return new Response(null, { status: 500 })
  }
}
