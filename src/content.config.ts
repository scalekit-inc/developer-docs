import { z, defineCollection } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'
import { topicSchema } from 'starlight-sidebar-topics/schema'
import { videosSchema } from 'starlight-videos/schemas'
import { githubReleasesLoader } from 'astro-loader-github-releases'
import { blogSchema } from 'starlight-blog/schema'
import { githubFilesLoader } from './loaders/github-files-loader'

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: (context) =>
        blogSchema(context)
          .merge(topicSchema)
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
  // GitHub Releases - Automatically fetched from GitHub releases
  // Uses repoList mode to fetch releases from SDK repositories
  // Each entry is a release, keyed by owner/repo
  // Note: Requires GITHUB_TOKEN environment variable to be set
  'github-releases': defineCollection({
    loader: githubReleasesLoader({
      mode: 'repoList',
      repos: [
        'scalekit-inc/scalekit-sdk-node',
        'scalekit-inc/scalekit-sdk-python',
        'scalekit-inc/scalekit-sdk-go',
        'scalekit-inc/scalekit-sdk-java',
        'scalekit-inc/scalekit-expo-sdk',
      ],
      entryReturnType: 'byRelease',
      // githubToken defaults to GITHUB_TOKEN environment variable if not provided
    }),
  }),
  // SDK Reference Documentation - Fetches reference.md from SDK repositories
  // Each entry contains the markdown content from the SDK's reference documentation
  // Note: Expo SDK doesn't have reference.md yet - only Overview page
  'sdk-references': defineCollection({
    loader: githubFilesLoader({
      files: [
        { repo: 'scalekit-inc/scalekit-sdk-node', path: 'reference.md', id: 'node' },
        { repo: 'scalekit-inc/scalekit-sdk-python', path: 'reference.md', id: 'python' },
        { repo: 'scalekit-inc/scalekit-sdk-go', path: 'reference.md', id: 'go' },
        { repo: 'scalekit-inc/scalekit-sdk-java', path: 'reference.md', id: 'java' },
      ],
    }),
    schema: z.object({
      repo: z.string(),
      path: z.string(),
      ref: z.string(),
      sha: z.string(),
      htmlUrl: z.string(),
      lastFetched: z.date(),
    }),
  }),
}
