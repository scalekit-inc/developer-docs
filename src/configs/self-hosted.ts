/**
 * Self-hosted deployment is shared by AgentKit and Auth for SaaS.
 * Product chrome is resolved client-side via sessionStorage when the URL
 * does not encode a product (see HeaderProductToggle + SecondaryNav).
 *
 * Selection helpers (getActiveProduct, tab current) live in
 * src/utils/chrome-selection.js. Do not change this storage key or
 * the cold default to "unify" chrome.
 */
export const PRODUCT_STORAGE_KEY = 'sk-active-product'

/** Cold load default for /self-hosted/** when no query param or session memory exists. */
export const SELF_HOSTED_COLD_DEFAULT_PRODUCT = 'agentkit' as const

export type DocsProduct = 'agentkit' | 'saaskit'

export function isDocsProduct(value: string | null | undefined): value is DocsProduct {
  return value === 'agentkit' || value === 'saaskit'
}
