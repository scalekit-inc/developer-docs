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
        description: 'Add OAuth for MCP servers with CIMD & dynamic client registration support',
        sectionLabel: 'MODULAR AUTH',
        sectionDescription: 'Add authentication modules to your existing auth system',
        columnGroup: 'left',
      },
      {
        id: 'agent-auth',
        href: '/agent-actions/quickstart',
        label: 'Agent Auth',
        iconComponent: IconLucideBot,
        description:
          'Authenticate agents with external tools via a token vault managing consent, scopes, and OAuth tokens',
        columnGroup: 'left',
      },
      {
        id: 'modular-sso', // Maps to sidebarToSecondaryNav['modular-auth'].default
        href: '/authenticate/sso/add-modular-sso/',
        label: 'Modular SSO',
        iconComponent: IconMingcuteUserSecurityLine,
        description: 'Enable SAML or OIDC single sign-on for any enterprise identity provider',
        columnGroup: 'left',
      },
      {
        id: 'modular-scim', // Maps to sidebarToSecondaryNav['modular-auth'].pathOverrides['/directory/scim']
        href: '/directory/scim/quickstart/',
        label: 'Modular SCIM',
        iconComponent: IconAntDesignUserSwitchOutlined,
        description: 'Automate user and group provisioning and de-provisioning',
        columnGroup: 'left',
      },
      {
        id: 'fsa-quickstart',
        href: '/authenticate/fsa/quickstart/',
        label: 'Full stack auth', // Use parent label for nav button
        dropdownLabel: 'Quickstart', // Show in dropdown
        iconComponent: IconLucideRocket, // Distinct icon for Quickstart
        description: 'Set up Full-stack Auth and start building',
        sectionLabel: 'FULL-STACK AUTH',
        sectionDescription: 'Complete authentication and user management',
        columnGroup: 'right',
      },
      {
        id: 'fsa-user-auth',
        href: '/authenticate/fsa/implement-login/',
        label: 'Full stack auth', // Use parent label for nav button
        dropdownLabel: 'User authentication', // Show in dropdown
        iconComponent: IconLucideLogIn, // Distinct icon for User Auth
        description: 'Implement login, sign-up flows and session management',
        columnGroup: 'right',
      },
      {
        id: 'fsa-users-orgs',
        href: '/fsa/data-modelling/',
        label: 'Full stack auth', // Use parent label for nav button
        dropdownLabel: 'Manage users & orgs', // Show in dropdown
        iconComponent: IconLucideBuilding2, // Distinct icon for Users & Orgs
        description: 'Manage users and organizations with built-in multi-tenancy support',
        columnGroup: 'right',
      },
      {
        id: 'fsa-authorization',
        href: '/authenticate/authz/overview/',
        label: 'Full stack auth', // Use parent label for nav button
        dropdownLabel: 'Authorization', // Show in dropdown
        iconComponent: IconLucideShieldCheck, // Distinct icon for Authorization
        description: 'Define roles, permissions, and access policies',
        columnGroup: 'right',
      },
      {
        id: 'fsa-customize',
        href: '/guides/custom-domain/',
        label: 'Full stack auth', // Use parent label for nav button
        dropdownLabel: 'Customize', // Show in dropdown
        iconComponent: IconLucidePalette, // Distinct icon for Customize
        description: 'Configure branding, domains, and authentication workflows',
        columnGroup: 'right',
      },
    ],
  },
  {
    id: 'scenarios', // Maps to sidebarToSecondaryNav['dev-kit']
    href: '/dev-kit/code-samples/',
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
        description: 'Ready-to-use building blocks',
      },
      {
        id: 'rest-apis',
        href: '/apis/',
        label: 'REST APIs',
        iconComponent: IconApi,
        description: 'Programmatic control via APIs',
      },
      {
        id: 'webhooks-events', // Maps to sidebarToSecondaryNav['events-reference']
        href: '/reference/webhooks/overview/',
        label: 'Webhooks',
        iconComponent: IconLucideOutlineWebhook,
        description: 'Real-time auth events',
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
