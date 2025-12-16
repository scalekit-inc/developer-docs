import type { APIRoute } from 'astro'
import { sidebar } from '../configs/sidebar.config'

/**
 * Main llms.txt file following the llmstxt.org specification.
 * This provides a curated overview of Scalekit documentation for LLMs.
 * Uses sidebar configuration for dynamic content generation.
 */
const BASE_URL = 'https://docs.scalekit.com'
export const prerender = false

function abs(link: string): string {
  if (link.startsWith('http://') || link.startsWith('https://')) return link
  // ensure leading slash
  return link.startsWith('/') ? `${BASE_URL}${link}` : `${BASE_URL}/${link}`
}

import { getCollection, type CollectionEntry } from 'astro:content'

export const GET: APIRoute = async (context) => {
  const segments: string[] = []

  // H1: Project name (required)
  segments.push(`# Scalekit`)

  // Blockquote: Short summary (recommended)
  segments.push(
    `> Scalekit is a developer platform for enterprise authentication, providing Full Stack Auth (FSA), Single Sign-On (SSO), SCIM provisioning, and API authentication solutions for B2B applications.`,
  )

  // Dynamic Key Features list derived from sidebar and doc front-matter
  const docs = await getCollection('docs')
  const docMap = new Map(docs.map((d) => [d.id, d]))

  function firstDocPath(section: any): string | null {
    if (section.link) return section.link.replace(/^\//, '')
    if (!section.items) return null
    for (const itm of section.items) {
      if (typeof itm === 'string') return itm.replace(/^\//, '')
      if (itm.link) return itm.link.replace(/^\//, '')
    }
    return null
  }

  const features: string[] = []
  for (const section of sidebar) {
    const path = firstDocPath(section)
    if (!path) continue
    const entry = docMap.get(path)
    const desc = (entry?.data.hero?.tagline || entry?.data.description) as string | undefined
    if (desc) {
      features.push(`- **${section.label}**: ${desc}`)
    }
  }
  if (features.length) {
    segments.push(`Key features:\n\n${features.join('\n')}`)
  }

  // Dynamically build sections based on sidebar configuration

  function getDocInfo(path: string): { title: string; desc?: string } | null {
    const clean = path.replace(/^\/*|\.(mdx?|md)$/g, '')
    const entry = docMap.get(clean)
    if (!entry) return null
    return {
      title: (entry.data.hero?.title || entry.data.title) as string,
      desc: (entry.data.hero?.tagline || entry.data.description) as string | undefined,
    }
  }

  function linkForPath(path: string): string {
    const info = getDocInfo(path)
    const url = abs('/' + path.replace(/^\//, ''))
    if (info) {
      return `- [${info.title}](${url}): ${info.desc ?? ''}`.trimEnd()
    }
    return `- [${path}](${url})`
  }

  for (const section of sidebar) {
    const links: string[] = []
    if (section.link) links.push(linkForPath(section.link))

    function processItems(items: any[]) {
      for (const item of items) {
        if (typeof item === 'string') {
          links.push(linkForPath(item))
        } else if (item.items) {
          processItems(item.items)
        } else if ('autogenerate' in item && item.autogenerate) {
          // Link the folder index if exists
          links.push(`- [${item.label}](${abs('/' + item.autogenerate.directory)}): ${item.label}`)
        }
      }
    }
    if (section.items) processItems(section.items)

    if (links.length > 0) {
      segments.push(`## ${section.label}`)
      segments.push(links.join('\n'))
    }
  }
  segments.push(`## Core Documentation`)
  const coreLinks = [
    `- [Complete documentation](/llms-full.txt): Full Scalekit developer documentation in LLM-friendly format`,
  ]

  // Add main section links from sidebar
  const coreSections = ['full-stack-auth', 'sso', 'directory']
  for (const sectionId of coreSections) {
    const section = sidebar.find((s) => s.id === sectionId)
    if (section?.link) {
      const info = getDocInfo(section.link)
      coreLinks.push(`- [${section.label}](${abs(section.link)}): ${info?.desc ?? ''}`.trimEnd())
    }
  }
  segments.push(coreLinks.join('\n'))

  // Integration Guides - from integrations section
  const integrationsSection = sidebar.find((s) => s.id === 'integrations')
  if (integrationsSection?.items) {
    segments.push(`## Integration Guides`)
    const integrationLinks: string[] = []

    for (const item of integrationsSection.items) {
      if (typeof item === 'object' && item.label && 'autogenerate' in item && item.autogenerate) {
        integrationLinks.push(
          `- [${item.label}](${abs(`/${item.autogenerate.directory}`)}): ${item.label.toLowerCase()} setup and configuration`,
        )
      }
    }

    if (integrationLinks.length > 0) {
      segments.push(integrationLinks.join('\n'))
    }
  }

  // Developer Resources - from dev-kit section
  const devKitSection = sidebar.find((s) => s.id === 'dev-kit')
  if (devKitSection?.link) {
    segments.push(`## Developer Resources`)
    segments.push(
      [
        `- [Developer Kit](${abs(devKitSection.link)}): SDKs, webhooks, development tools, and API references`,
        `- [Webhook Events](${abs('/reference/webhooks/')}): Real-time event notifications and webhook handling`,
        `- [SDKs and Libraries](${abs('/dev-kit/')}): Official SDKs for Node.js, Python, Go, Java, and community libraries`,
      ].join('\n'),
    )
  }

  // Optional - secondary features
  const optionalSections = ['mcp', 'passwordless']
  const optionalLinks: string[] = []

  for (const sectionId of optionalSections) {
    const section = sidebar.find((s) => s.id === sectionId)
    if (section?.link) {
      const info = getDocInfo(section.link)
      optionalLinks.push(
        `- [${section.label}](${abs(section.link)}): ${info?.desc ?? ''}`.trimEnd(),
      )
    }
  }

  // Add some specific useful guides that are commonly referenced
  optionalLinks.push(
    `- [Custom Domains](${abs('/guides/custom-domain')}): White-label domain configuration`,
    `- [Email Providers](${abs('/guides/email-providers')}): Custom email delivery setup`,
  )

  if (optionalLinks.length > 0) {
    segments.push(`## Optional`)
    segments.push(optionalLinks.join('\n'))
  }

  return new Response(segments.join('\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
