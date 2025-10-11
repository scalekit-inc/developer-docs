import { z, defineCollection } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'
import { topicSchema } from 'starlight-sidebar-topics/schema'
import { tocOverviewCustomizer } from 'starlight-toc-overview-customizer/schema'
import { videosSchema } from 'starlight-videos/schemas'

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: topicSchema
        .merge(tocOverviewCustomizer)
        .merge(videosSchema)
        .merge(
          z.object({
            codeSamples: z
              .object({
                items: z.array(
                  z.object({
                    title: z.string(),
                    url: z.string(),
                    icon: z.string().optional(),
                  }),
                ),
                expanded: z.boolean().optional().default(true),
                label: z.string().optional().default('Code samples'),
              })
              .optional(),
          }),
        ),
    }),
  }),
}
