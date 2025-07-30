import { z, defineCollection } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'
import { topicSchema } from 'starlight-sidebar-topics/schema'
import { tocOverviewCustomizer } from 'starlight-toc-overview-customizer/schema'

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: topicSchema.merge(tocOverviewCustomizer),
    }),
  }),
}
