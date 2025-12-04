import {
  IconLucideShield,
  IconMcp,
  IconLucideUsers,
  IconLucideBookOpen,
  IconApi,
  IconSdk,
  IconMdiCubeOutline,
  IconLucideCode,
  IconLucideOutlineWebhook,
  IconHugeiconsResourcesAdd,
  IconMingcuteUserSecurityLine,
  IconAntDesignUserSwitchOutlined,
  IconLucideChevronDown as IconChevronDown,
} from '../utils/icon-map'
import IconLucideCheck from '~icons/lucide/check'

export interface NavItem {
  id: string // Unique identifier for the nav item
  href: string
  label: string
  iconComponent?: any
  children?: NavItem[]
  keepParentLabel?: boolean // Keep parent label even when child is active
  description?: string // Optional description for dropdown items
  showDivider?: boolean // Show divider after this item
  sectionLabel?: string // Optional section label for grouping items
}

// Nav items - IDs must match those in sidebarToSecondaryNav mapping
export const secondaryNavItems: NavItem[] = [
  // Authenticate dropdown with children for different auth products
  {
    id: 'authenticate',
    href: '#authenticate',
    label: 'Full-stack Auth',
    iconComponent: IconLucideUsers,
    children: [
      {
        id: 'fsa', // Maps to sidebarToSecondaryNav['authenticate']
        href: '/authenticate/fsa/quickstart/',
        label: 'Full-stack Auth',
        iconComponent: IconLucideUsers,
        description: 'Add secure login, user accounts, and session management',
        sectionLabel: 'AUTHENTICATE',
        showDivider: true,
      },
      {
        id: 'mcp', // Maps to sidebarToSecondaryNav['modular-auth'].pathOverrides['/mcp']
        href: '/mcp/quickstart/',
        label: 'Auth for MCP',
        iconComponent: IconMcp,
        description: 'Production-ready OAuth for MCP servers with dynamic client registration',
        sectionLabel: 'AUTHENTICATE → MODULAR AUTH',
      },
      {
        id: 'modular-sso', // Maps to sidebarToSecondaryNav['modular-auth'].default
        href: '/authenticate/sso/add-modular-sso/',
        label: 'Modular SSO',
        iconComponent: IconMingcuteUserSecurityLine,
        description:
          'Easily onboard enterprise customers with any login system. Supports SAML, OIDC',
      },
      {
        id: 'modular-scim', // Maps to sidebarToSecondaryNav['modular-auth'].pathOverrides['/directory/scim']
        href: '/directory/scim/quickstart/',
        label: 'Modular SCIM',
        iconComponent: IconAntDesignUserSwitchOutlined,
        description:
          "Automate organization and user changes automatically, so you don't have to babysit user lists",
      },
    ],
  },
  {
    id: 'scenarios', // Maps to sidebarToSecondaryNav['dev-kit'] and ['interations']
    href: '/dev-kit/',
    label: 'Developer Resources',
    iconComponent: IconHugeiconsResourcesAdd,
  },
  {
    id: 'api-reference',
    href: '#sdks-apis',
    label: 'SDKs & APIs',
    iconComponent: IconMdiCubeOutline,
    children: [
      {
        id: 'sdks',
        href: '/apis/#description/sdks',
        label: 'SDKs',
        iconComponent: IconSdk,
        description: 'Auth to your app using SDKs',
      },
      {
        id: 'rest-apis',
        href: '/apis/',
        label: 'REST APIs',
        iconComponent: IconApi,
        description: 'Manage your Scalekit using APIs',
      },
      {
        id: 'webhooks-events', // Maps to sidebarToSecondaryNav['events-reference']
        href: '/reference/webhooks/overview/',
        label: 'Webhooks',
        iconComponent: IconLucideOutlineWebhook,
        description: 'Receive real-time auth events',
      },
    ],
  },
  // Temporarily hidden - Agent Actions
  // {
  //   id: 'agent-actions',
  //   href: '/agent-actions/quickstart',
  //   label: 'Agent Actions',
  //   iconComponent: IconLucideBot,
  // },
]

export { IconLucideCheck }
