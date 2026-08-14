/**
 * Product chrome for routes that both AgentKit and Auth for SaaS share.
 * The URL does not encode a product. Header + secondary nav resolve it from
 * ?product=, then sessionStorage / the sk-active-product cookie, then a cold default.
 * See HeaderProductToggle + SecondaryNav.
 */
export const PRODUCT_STORAGE_KEY = 'sk-active-product'

/** Cold load default for /self-hosted/** when no query param or session memory exists. */
export const SELF_HOSTED_COLD_DEFAULT_PRODUCT = 'agentkit' as const

/**
 * Workspace how-tos (/how-to/**) are shared. Cold default is Auth for SaaS because
 * these pages are workspace/dashboard tasks that historically lived under SaaS.
 */
export const SHARED_HOW_TO_COLD_DEFAULT_PRODUCT = 'saaskit' as const

export type DocsProduct = 'agentkit' | 'saaskit'

export function isDocsProduct(value: string | null | undefined): value is DocsProduct {
  return value === 'agentkit' || value === 'saaskit'
}

export function isSelfHostedPath(pathname: string): boolean {
  return pathname.startsWith('/self-hosted/')
}

export function isSharedHowToPath(pathname: string): boolean {
  return pathname === '/how-to' || pathname === '/how-to/' || pathname.startsWith('/how-to/')
}

/** Routes that keep product chrome from session/cookie rather than from the path. */
export function isSharedProductPath(pathname: string): boolean {
  return isSelfHostedPath(pathname) || isSharedHowToPath(pathname)
}

export function guidesTopicForProduct(product: DocsProduct): 'agentkit-guides' | 'saaskit-guides' {
  return product === 'agentkit' ? 'agentkit-guides' : 'saaskit-guides'
}
