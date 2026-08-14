import type { StarlightPlugin } from '@astrojs/starlight/types'

/**
 * Runs before starlight-sidebar-topics so /how-to/** pages get the Cookbooks
 * sidebar for the visitor's product (?product= or sk-active-product cookie).
 */
export default function assignHowToTopicPlugin(): StarlightPlugin {
  return {
    name: 'assign-how-to-topic',
    hooks: {
      'config:setup'({ addRouteMiddleware }) {
        addRouteMiddleware({
          entrypoint: './src/middleware/assign-how-to-topic.ts',
          order: 'pre',
        })
      },
    },
  }
}
