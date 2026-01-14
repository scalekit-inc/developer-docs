import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'

/**
 * @see https://github.com/delucis/astro-og-canvas/tree/latest/packages/astro-og-canvas#image-options
 */

// Fetch all entries from the `docs` content collection
const entries = await getCollection('docs')

// Filter out entries that don't have valid data (like the 404 page which is handled by Starlight)
const validEntries = entries.filter((entry) => {
  // Skip entries without required frontmatter
  if (!entry.data?.title || !entry.data?.description) {
    return false
  }
  // Skip the 404 page as it's handled by Starlight's built-in 404 route
  if (entry.id === '404') {
    return false
  }
  return true
})

// Map entries to an object keyed by id for quick lookup
const pages = Object.fromEntries(validEntries.map(({ id, data }) => [id, { data }]))

// Export the `GET` handler and static paths generator expected by Astro
export const { getStaticPaths, GET } = OGImageRoute({
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
      path: './src/assets/images/scalekit-logo-white.png',
    },
    // A dark gradient background + border
    bgGradient: [[18, 18, 18]], // Matches --sl-color-gray-7 from custom.css
    border: { color: [0, 255, 127], width: 16 }, // Scalekit brand green (#00FF7F)
    padding: 80,
    bgImage: {
      path: './src/assets/images/og/backdrop.png',
    },
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
      './node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
      './node_modules/@fontsource-variable/inter/files/inter-latin-wght-italic.woff2',
    ],
  }),
})
