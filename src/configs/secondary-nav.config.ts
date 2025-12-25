import {
  IconMcp,
  IconLucideUsers,
  IconLucideBot,
  IconApi,
  IconSdk,
  IconMdiCubeOutline,
  IconCodiconDebugStart,
  IconLucideOutlineWebhook,
  IconMingcuteUserSecurityLine,
  IconGardenShapes26,
  IconLucideLayoutGrid,
  IconAntDesignUserSwitchOutlined,
  IconLucideChevronDown as IconChevronDown,
  IconHugeiconsResourcesAdd,
  IconLucideBlocks,
} from '../utils/icon-map'
import IconLucideRocket from '~icons/lucide/rocket'
import IconLucideLogIn from '~icons/lucide/log-in'
import IconLucideBuilding2 from '~icons/lucide/building-2'
import IconLucideShieldCheck from '~icons/lucide/shield-check'
import IconLucidePalette from '~icons/lucide/palette'
import IconLucideCheck from '~icons/lucide/check'
import IconLucideHome from '~icons/lucide/home'
import IconLucideBookOpenText from '~icons/lucide/book-open-text'

export interface NavItem {
  id: string // Unique identifier for the nav item
  href: string
  label: string
  dropdownLabel?: string // Optional label to show in dropdown (defaults to label if not provided)
  iconComponent?: any
  children?: NavItem[]
  keepParentLabel?: boolean // Keep parent label even when child is active
  description?: string // Optional description for dropdown items
  showDivider?: boolean // Show divider after this item
  sectionLabel?: string // Optional section label for grouping items
  sectionDescription?: string // Optional description text below section label
  columnGroup?: 'left' | 'right' // Optional column grouping for side-by-side layout
}

// Nav items - IDs must match those in sidebarToSecondaryNav mapping
export const secondaryNavItems: NavItem[] = [
  // Home link
  // {
  //   id: 'home',
  //   href: '/',
  //   label: 'Get started',
  //   iconComponent: IconLucideRocket,
  // },
  // Authenticate dropdown with children for different auth products
  {
    id: 'authenticate',
    href: '#authenticate',
    label: 'Full stack auth',
    iconComponent: IconLucideUsers,
    children: [
      {
        id: 'mcp', // Maps to sidebarToSecondaryNav['modular-auth'].pathOverrides['/mcp']
        href: '/authenticate/mcp/quickstart/',
        label: 'MCP Auth',
        iconComponent: IconMcp,
        description: 'Secure MCP servers with OAuth 2.1, CIMD, and dynamic registration',
        sectionLabel: 'MODULAR AUTH',
        sectionDescription: 'Add auth capabilities without replacing your system',
        columnGroup: 'left',
      },
      {
        id: 'agent-auth',
        href: '/agent-auth/quickstart/',
        label: 'Agent Auth',
        iconComponent: IconLucideBot,
        description: 'Connect AI agents to external tools with a token vault and OAuth',
        columnGroup: 'left',
      },
      {
        id: 'modular-sso', // Maps to sidebarToSecondaryNav['modular-auth'].default
        href: '/authenticate/sso/add-modular-sso/',
        label: 'Modular SSO',
        iconComponent: IconMingcuteUserSecurityLine,
        description: 'Add SAML or OIDC SSO with enterprise identity providers',
        columnGroup: 'left',
      },
      {
        id: 'modular-scim', // Maps to sidebarToSecondaryNav['modular-auth'].pathOverrides['/directory/scim']
        href: '/directory/scim/quickstart/',
        label: 'Modular SCIM',
        iconComponent: IconAntDesignUserSwitchOutlined,
        description: 'Automate user provisioning, sync roles and groups from directories',
        columnGroup: 'left',
      },
      {
        id: 'fsa-quickstart',
        href: '/authenticate/fsa/quickstart/',
        label: 'Full stack auth', // Use parent label for nav button
        dropdownLabel: 'Quickstart', // Show in dropdown
        iconComponent: IconLucideRocket, // Distinct icon for Quickstart
        description: 'Add production-ready auth flows',
        sectionLabel: 'FULL-STACK AUTH',
        sectionDescription: 'Use Scalekit as your full identity layer',
        columnGroup: 'right',
      },
      {
        id: 'fsa-user-auth',
        href: '/authenticate/auth-methods/passwordless/',
        label: 'Full stack auth', // Use parent label for nav button
        dropdownLabel: 'Authentication methods', // Show in dropdown
        iconComponent: IconLucideLogIn, // Distinct icon for User Auth
        description: 'Support modern login flows with passkeys, magic links, and more',
        columnGroup: 'right',
      },
      {
        id: 'fsa-users-orgs',
        href: '/fsa/data-modelling/',
        label: 'Full stack auth', // Use parent label for nav button
        dropdownLabel: 'Users & organizations', // Show in dropdown
        iconComponent: IconLucideBuilding2, // Distinct icon for Users & Orgs
        description: 'Manage users, organizations, and memberships with multi-tenancy',
        columnGroup: 'right',
      },
      {
        id: 'fsa-authorization',
        href: '/authenticate/authz/overview/',
        label: 'Full stack auth', // Use parent label for nav button
        dropdownLabel: 'Authorization', // Show in dropdown
        iconComponent: IconLucideShieldCheck, // Distinct icon for Authorization
        description: 'Define roles and permissions for human users and AI agents',
        columnGroup: 'right',
      },
      {
        id: 'fsa-customize',
        href: '/guides/custom-domain/',
        label: 'Full stack auth', // Use parent label for nav button
        dropdownLabel: 'Extensibility & controls', // Show in dropdown
        iconComponent: IconLucidePalette, // Distinct icon for Customize
        description: 'Customize identity workflows and apply your business logic',
        columnGroup: 'right',
      },
    ],
  },
  {
    id: 'scenarios', // Maps to sidebarToSecondaryNav['dev-kit']
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
        href: '/sdks/',
        label: 'SDKs',
        iconComponent: IconSdk,
        description: 'Ready-to-use libraries to implement auth in your app',
      },
      {
        id: 'rest-apis',
        href: '/apis/#description/overview',
        label: 'REST APIs',
        iconComponent: IconApi,
        description: 'Programmatic control to manage users, orgs, sessions etc.',
      },
    ],
  },
  // Temporarily hidden - Agent Auth
  // {
  //   id: 'agent-actions',
  //   href: '/agent-actions/quickstart',
  //   label: 'Agent Auth',
  //   iconComponent: IconLucideBot,
  // },
]

export { IconLucideCheck }
