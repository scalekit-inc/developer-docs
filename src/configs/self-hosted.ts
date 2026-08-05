/**
 * Self-hosted deployment is shared by AgentKit and Auth for SaaS.
 * Product chrome is resolved client-side via sessionStorage when the URL
 * does not encode a product (see HeaderProductToggle + SecondaryNav).
 */
export const PRODUCT_STORAGE_KEY = 'sk-active-product'

/** Cold load default for /self-hosted/** when no query param or session memory exists. */
export const SELF_HOSTED_COLD_DEFAULT_PRODUCT = 'agentkit' as const

export type DocsProduct = 'agentkit' | 'saaskit'

export function isDocsProduct(value: string | null | undefined): value is DocsProduct {
  return value === 'agentkit' || value === 'saaskit'
}
