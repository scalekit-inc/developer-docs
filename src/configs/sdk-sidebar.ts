/**
 * Build SDK language sidebar groups from per-language _nav.json registries.
 * Adding a client/section = edit _nav.json (+ page or hash target). Do not hand-list in sidebar.config.ts.
 */

export type SdkProduct = 'agentkit' | 'saaskit'
/** Server SDKs use ClassBrowser clients; mobile uses guide sections on one page. */
export type SdkLang = 'node' | 'python' | 'go' | 'java' | 'expo' | 'ios'

export interface SdkClientNavEntry {
  id: string
  label: string
  /** SDK accessor segment, e.g. organization → scalekit.organization */
  accessor?: string
  order: number
  summary?: string
  /**
   * Optional full link (hash or path).
   * - Server clients default to `{base}/{id}/`
   * - Mobile guide sections often use `/sdks/expo/#provider`
   */
  href?: string
}

export interface SdkLangNav {
  label: string
  installation: {
    label: string
    href: string
  }
  /** Primary clients (server) or guide sections (mobile) */
  clients: SdkClientNavEntry[]
}

export interface SidebarLinkItem {
  label: string
  link: string
}

export interface SidebarGroupItem {
  label: string
  collapsed?: boolean
  items: SidebarLinkItem[]
}

function productBase(product: SdkProduct, lang: SdkLang): string {
  // Mobile SDKs stay on public /sdks/{lang}/ URLs for now
  if (lang === 'expo' || lang === 'ios') {
    return `/sdks/${lang}`
  }
  return product === 'agentkit' ? `/agentkit/sdks/${lang}` : `/saaskit/sdks/${lang}`
}

/**
 * Build a collapsed language group: Installation + primary clients / guide sections from _nav.json.
 */
export function buildLanguageGroup(
  product: SdkProduct,
  lang: SdkLang,
  nav: SdkLangNav,
): SidebarGroupItem {
  const base = productBase(product, lang)
  const clients = [...nav.clients].sort((a, b) => a.order - b.order)

  return {
    label: nav.label,
    collapsed: true,
    items: [
      {
        label: nav.installation.label,
        link: nav.installation.href || `${base}/`,
      },
      ...clients.map((client) => ({
        label: client.label,
        link: client.href || `${base}/${client.id}/`,
      })),
    ],
  }
}
