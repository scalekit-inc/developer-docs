import type { TopicSlug } from './classify-query.js'

const SLUG_TO_PATH: Record<TopicSlug, string> = {
  fsa: 'full-stack-auth-complete',
  sso: 'enterprise-sso--scim',
  scim: 'enterprise-sso--scim',
  'agent-auth': 'agent-authentication',
  mcp: 'mcp-authentication',
  m2m: 'machine-to-machine-auth',
  sdk: 'api--sdk-reference',
  quickstart: 'quickstart-collection',
}

export async function fetchCustomSet(topic: TopicSlug): Promise<string> {
  const baseUrl = process.env.DOCS_BASE_URL ?? 'https://docs.scalekit.com'
  const path = SLUG_TO_PATH[topic]
  const customSetUrl = `${baseUrl}/_llms-txt/${path}.txt`

  const customRes = await fetch(customSetUrl, {
    headers: { 'User-Agent': 'scalekit-chatbot/1.0' },
  })

  if (customRes.ok) {
    return customRes.text()
  }

  const fallbackUrl = `${baseUrl}/llms-small.txt`
  const fallbackRes = await fetch(fallbackUrl, {
    headers: { 'User-Agent': 'scalekit-chatbot/1.0' },
  })

  if (fallbackRes.ok) {
    return fallbackRes.text()
  }

  throw new Error(
    `Failed to fetch docs content: custom set ${customSetUrl} returned ${customRes.status}, ` +
      `fallback ${fallbackUrl} returned ${fallbackRes.status}`,
  )
}
