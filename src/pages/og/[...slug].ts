import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'

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
    // A dark gradient background + border
    bgGradient: [[24, 24, 27]],
    border: { color: [63, 63, 70], width: 20 },
    padding: 120,
  }),
})
