import { defineRouteMiddleware } from '@astrojs/starlight/route-data'

export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals
  const slug = context.locals.starlightRoute.id || 'index'
  const ogImageUrl = new URL(`/og/${slug}.png`, context.site)
  const individualOverviewTitle = starlightRoute.entry.data.overviewTitle

  // Inject the meta tags into the head array
  const { head } = context.locals.starlightRoute
  head.push({
    tag: 'meta',
    attrs: { property: 'og:image', content: ogImageUrl.href },
  })
  head.push({
    tag: 'meta',
    attrs: { name: 'twitter:image', content: ogImageUrl.href },
  })

  const overviewItem = starlightRoute.toc?.items[0]
  if (overviewItem) overviewItem.text = individualOverviewTitle ?? 'Overview'
})
