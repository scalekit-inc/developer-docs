import type { APIRoute } from 'astro'
/**
 * Route that generates an introductory summary of this site for LLMs.
 */
export const GET: APIRoute = async (context) => {
  const segments = [`# Scalekit Developer Documentation`]
  segments.push(`## Documentation Sets`)
  segments.push(
    [
      `- [Complete documentation](https://docs.scalekit.com/llms-full.txt): the full documentation for Scalekit`,
    ].join('\n'),
  )

  // Additional notes.
  segments.push(`## Notes`)
  segments.push(`- The complete documentation includes all content from the official documentation
- The content is automatically generated from the same source as the official documentation`)

  return new Response(segments.join('\n\n') + '\n')
}
