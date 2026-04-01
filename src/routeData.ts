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

  // JSON-LD TechArticle schema for AEO (Google AI Overviews, Perplexity, Bing Copilot)
  const { title, description, tags } = starlightRoute.entry.data
  if (title && description) {
    const canonicalURL = new URL(context.url.pathname, context.site)
    head.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      content: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: title,
        description,
        ...(tags?.length ? { keywords: tags.join(', ') } : {}),
        url: canonicalURL.href,
        publisher: {
          '@type': 'Organization',
          name: 'Scalekit',
          url: 'https://scalekit.com',
        },
      }),
    })
  }

  // Keywords meta tag from frontmatter tags
  if (tags?.length) {
    head.push({
      tag: 'meta',
      attrs: { name: 'keywords', content: tags.join(', ') },
    })
  }

  const overviewItem = starlightRoute.toc?.items[0]
  if (overviewItem) overviewItem.text = individualOverviewTitle ?? 'Overview'
})
