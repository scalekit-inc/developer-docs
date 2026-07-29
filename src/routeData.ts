import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data'
import { normalizePath } from './utils/path-matching'

type SidebarEntry = StarlightRouteData['sidebar'][number]

/**
 * Starlight marks only the *first* matching link as `isCurrent` across the full
 * multi-topic intermediate sidebar. Cross-topic deep links (e.g. SaaSKit/AgentKit
 * "Go live" → `/self-hosted/overview/`) therefore steal the highlight from the
 * real page entry in its own topic. After starlight-sidebar-topics swaps in the
 * active topic sidebar, re-match `isCurrent` against the request pathname so the
 * visible left-nav item is correct.
 */
function rematchSidebarCurrent(sidebar: SidebarEntry[], pathname: string): void {
  const target = normalizePath(pathname)

  const walk = (entries: SidebarEntry[]): void => {
    for (const entry of entries) {
      if (entry.type === 'link') {
        if (/^https?:\/\//.test(entry.href) || entry.href.startsWith('#')) {
          entry.isCurrent = false
          continue
        }
        entry.isCurrent = normalizePath(entry.href) === target
      } else if (entry.type === 'group') {
        walk(entry.entries)
      }
    }
  }

  walk(sidebar)
}

export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals
  const slug = context.locals.starlightRoute.id || 'index'
  const ogImageUrl = new URL(`/og/${slug}.png`, context.site)
  const individualOverviewTitle = starlightRoute.entry.data.overviewTitle

  const canonicalURL = new URL(context.url.pathname, context.site)

  if (starlightRoute.hasSidebar && starlightRoute.sidebar?.length) {
    rematchSidebarCurrent(starlightRoute.sidebar, context.url.pathname)
  }

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
