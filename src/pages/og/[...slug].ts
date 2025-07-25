import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'

/**
 * @see https://github.com/delucis/astro-og-canvas/tree/latest/packages/astro-og-canvas#image-options
 */

// Fetch all entries from the `docs` content collection
const entries = await getCollection('docs')

// Map entries to an object keyed by id for quick lookup
const pages = Object.fromEntries(entries.map(({ id, data }) => [id, { data }]))

// Export the `GET` handler and static paths generator expected by Astro
export const { getStaticPaths, GET } = OGImageRoute({
  pages,
  // matches the `[...slug].ts` filename
  param: 'slug',
  // Customize the look of the generated card using front-matter
  getImageOptions: (_id, page: (typeof pages)[number]) => ({
    // Show title & description pulled from front-matter
    title: page.data.title,
    description: page.data.description,
    dir: 'ltr',
    logo: {
      path: './src/assets/images/scalekit-logo-white.png',
    },
    // A dark gradient background + border
    bgGradient: [[18, 18, 18]], // Matches --sl-color-gray-7 from custom.css
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
  }),
})
