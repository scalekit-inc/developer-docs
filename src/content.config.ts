import { z, defineCollection } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'
import { topicSchema } from 'starlight-sidebar-topics/schema'
import { videosSchema } from 'starlight-videos/schemas'
import { changelogsLoader } from 'starlight-changelogs/loader'

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: topicSchema
        .merge(videosSchema)
        .merge(z.object({ overviewTitle: z.string().optional() }))
        .merge(
          z.object({
            seeAlso: z
              .object({
                items: z.array(
                  z.object({
                    title: z.string(),
                    url: z.string(),
                    icon: z.string().optional(),
                  }),
                ),
                expanded: z.boolean().optional().default(true),
                label: z.string().optional().default('See also'),
              })
              .optional(),
            browseCentral: z
              .object({
                label: z.string().optional(),
                filterType: z.array(z.enum(['code-sample', 'tutorial', 'video'])),
                category: z.array(z.string()),
                icon: z.string().optional(),
              })
              .optional(),
          }),
        ),
    }),
  }),
  // SDK Changelogs - Automatically fetched from GitHub releases
  // Configuration options:
  // - pageSize: Number of versions per page (default: 10)
  // - enabled: Whether to load this changelog (default: true)
  // - pagefind: Whether to index in site search (default: true)
  // - token: GitHub token for higher rate limits (set in .env file)
  // Example: Add 'pageSize: 20' to any SDK config to show 20 versions per page
  changelogs: defineCollection({
    loader: changelogsLoader([
      {
        provider: 'github',
        base: 'dev-kit/changelogs/node',
        owner: 'scalekit-inc',
        repo: 'scalekit-sdk-node',
        title: 'Node.js SDK Changelog',
        token: import.meta.env.STARLIGHT_CHANGELOG_90DAY_ACCESS,
        // pageSize: 10, // Uncomment to customize versions per page
      },
      {
        provider: 'github',
        base: 'dev-kit/changelogs/python',
        owner: 'scalekit-inc',
        repo: 'scalekit-sdk-python',
        title: 'Python SDK Changelog',
        token: import.meta.env.STARLIGHT_CHANGELOG_90DAY_ACCESS,
        // pageSize: 10, // Uncomment to customize versions per page
      },
      {
        provider: 'github',
        base: 'dev-kit/changelogs/go',
        owner: 'scalekit-inc',
        repo: 'scalekit-sdk-go',
        title: 'Go SDK Changelog',
        token: import.meta.env.STARLIGHT_CHANGELOG_90DAY_ACCESS,
        // pageSize: 10, // Uncomment to customize versions per page
      },
      {
        provider: 'github',
        base: 'dev-kit/changelogs/java',
        owner: 'scalekit-inc',
        repo: 'scalekit-sdk-java',
        title: 'Java SDK Changelog',
        token: import.meta.env.STARLIGHT_CHANGELOG_90DAY_ACCESS,
        // pageSize: 10, // Uncomment to customize versions per page
      },
    ]),
  }),
}
