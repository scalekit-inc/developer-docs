import { getCollection } from 'astro:content'
import { generateOpenGraphImage, type OGImageOptions } from 'astro-og-canvas'
import type { APIContext } from 'astro'

/**
 * OG image generation is server-rendered on demand (not prerendered at build time)
 * to avoid loading canvaskit-wasm and generating 300+ images during the build,
 * which causes OOM on Netlify's ~8GB memory limit.
 *
 * astro-og-canvas's OGImageRoute GET only reads props.imageOptions from
 * getStaticPaths. That helper is unused when prerender is false, so this
 * route looks up the docs entry from the request slug and calls
 * generateOpenGraphImage directly.
 *
 * @see https://github.com/delucis/astro-og-canvas/tree/latest/packages/astro-og-canvas#image-options
 */
export const prerender = false

const entries = await getCollection('docs')
const pages = Object.fromEntries(entries.map(({ id, data }) => [id, { data }]))

function pageIdFromSlug(slug: string): string | undefined {
  const withoutExt = slug.replace(/\.(png|jpe?g|webp)$/i, '')
  if (withoutExt in pages) return withoutExt
  const asIndex = `${withoutExt}/index`
  if (asIndex in pages) return asIndex
  return undefined
}

function getImageOptions(page: { data: { title?: string; description?: string } }): OGImageOptions {
  return {
    title: page.data.title ?? '',
    description: page.data.description ?? '',
    dir: 'ltr',
    logo: {
      // Resolve from this module to survive server bundle path changes.
      path: new URL('../../assets/images/scalekit-logo-white.png', import.meta.url).pathname,
    },
    bgGradient: [[18, 18, 18]],
    bgImage: {
      path: new URL('../../assets/images/og/backdrop.png', import.meta.url).pathname,
    },
    border: { color: [0, 255, 127], width: 16 },
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
    fonts: [
      new URL(
        '../../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
        import.meta.url,
      ).pathname,
      new URL(
        '../../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-italic.woff2',
        import.meta.url,
      ).pathname,
    ],
  }
}

export const GET = async (ctx: APIContext) => {
  const slug = ctx.params.slug
  if (!slug) return new Response(null, { status: 404 })

  const pageId = pageIdFromSlug(slug)
  const page = pageId ? pages[pageId] : undefined
  if (!page) return new Response(null, { status: 404 })

  try {
    const image = await generateOpenGraphImage(getImageOptions(page))
    return new Response(new Uint8Array(image), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[og] render failed:', msg)
    if (process.env.OG_DEBUG === 'true') {
      return new Response(JSON.stringify({ error: msg, slug, pageId }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    return new Response(null, { status: 500 })
  }
}
