import { defineRouteMiddleware } from '@astrojs/starlight/route-data'

export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals
  const slug = context.locals.starlightRoute.id || 'index'
  const ogImageUrl = new URL(`/og/${slug}.png`, context.site)
  const individualOverviewTitle = starlightRoute.entry.data.overviewTitle

  const canonicalURL = new URL(context.url.pathname, context.site)

  // Inject the meta tags into the head array
  const { head } = context.locals.starlightRoute
  const { title, description, tags } = starlightRoute.entry.data

  head.push({ tag: 'meta', attrs: { property: 'og:type', content: 'website' } })
  head.push({ tag: 'meta', attrs: { property: 'og:site_name', content: 'Scalekit Docs' } })
  head.push({ tag: 'meta', attrs: { property: 'og:url', content: canonicalURL.href } })
  head.push({ tag: 'meta', attrs: { property: 'og:title', content: title } })
  if (description) {
    head.push({ tag: 'meta', attrs: { property: 'og:description', content: description } })
  }
  head.push({ tag: 'meta', attrs: { property: 'og:image', content: ogImageUrl.href } })

  head.push({ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } })
  head.push({ tag: 'meta', attrs: { name: 'twitter:title', content: title } })
  if (description) {
    head.push({ tag: 'meta', attrs: { name: 'twitter:description', content: description } })
  }
  head.push({ tag: 'meta', attrs: { name: 'twitter:image', content: ogImageUrl.href } })

  // JSON-LD TechArticle schema for AEO (Google AI Overviews, Perplexity, Bing Copilot)
  if (title && description) {
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
