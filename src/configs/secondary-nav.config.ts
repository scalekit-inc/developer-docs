import {
  IconMcp,
  IconLucideUsers,
  IconLucideBot,
  IconApi,
  IconSdk,
  IconMdiCubeOutline,
  IconCodiconDebugStart,
  IconMingcuteUserSecurityLine,
  IconAntDesignUserSwitchOutlined,
  IconHugeiconsResourcesAdd,
  IconLucideBlocks,
  IconLucideCode,
  IconLucideWorkflow,
  IconRiAiGenerate2,
} from '../utils/icon-map'
import IconLucideRocket from '~icons/lucide/rocket'
import IconLucideBookOpenText from '~icons/lucide/book-open-text'
import IconLucideCheck from '~icons/lucide/check'

export interface NavItem {
  id: string
  href: string
  label: string
  dropdownLabel?: string
  iconComponent?: any
  children?: NavItem[]
  keepParentLabel?: boolean
  description?: string
  showDivider?: boolean
  sectionLabel?: string
  sectionDescription?: string
  sectionHref?: string
  sectionCtaLabel?: string
  columnGroup?: 'left' | 'right'
  /** Temporary shared item — will be split into product-specific entries once the SDK docs are ready */
  shared?: boolean
}

// SDKs & APIs is shared across both products until the SDK docs are split per product.
// TODO: replace this with product-specific SDK entries when Agent Kit and SaaS Kit SDK docs are ready
const sharedSdksItem: NavItem = {
  id: 'api-reference',
  href: '#sdks-apis',
  label: 'SDKs & APIs',
  iconComponent: IconMdiCubeOutline,
  shared: true,
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
}

const agentKitItems: NavItem[] = [
  {
    id: 'agentkit-quickstart',
    href: '/agentkit/quickstart/',
    label: 'Quickstart',
    iconComponent: IconLucideRocket,
  },
  {
    id: 'agentkit-connectors',
    href: '/agentkit/connectors/',
    label: 'Connectors',
    iconComponent: IconLucideBlocks,
  },
  {
    id: 'agentkit-sdks',
    href: '/agentkit/sdks/',
    label: 'SDKs',
    iconComponent: IconSdk,
  },
  {
    id: 'agentkit-api-reference',
    href: '/apis/',
    label: 'API reference',
    iconComponent: IconApi,
  },
]

const saasKitItems: NavItem[] = [
  {
    id: 'saaskit-user-management',
    href: '/authenticate/fsa/quickstart/',
    label: 'User Management',
    iconComponent: IconLucideUsers,
  },
  {
    id: 'saaskit-sso',
    href: '/authenticate/sso/add-modular-sso/',
    label: 'SSO',
    iconComponent: IconMingcuteUserSecurityLine,
  },
  {
    id: 'saaskit-scim',
    href: '/directory/scim/quickstart/',
    label: 'SCIM',
    iconComponent: IconAntDesignUserSwitchOutlined,
  },
  {
    id: 'saaskit-mcp-auth',
    href: '/authenticate/mcp/quickstart/',
    label: 'MCP Auth',
    iconComponent: IconMcp,
  },
  {
    id: 'developer-resources',
    href: '#developer-resources',
    label: 'Developer Resources',
    iconComponent: IconHugeiconsResourcesAdd,
    children: [
      {
        id: 'build-with-ai',
        href: '/dev-kit/build-with-ai/',
        label: 'Developer Resources',
        dropdownLabel: 'Build with AI',
        iconComponent: IconRiAiGenerate2,
        description: 'Integrate auth with AI coding agents',
        sectionLabel: 'DEVELOPER KIT',
        sectionDescription: 'Tools and examples to accelerate your integration',
        columnGroup: 'left',
      },
      {
        id: 'dev-tools',
        href: '/dev-kit/sdks',
        label: 'Reference & tooling',
        iconComponent: IconSdk,
        description: 'Implement auth with SDKs, REST APIs, OpenAPI specs, and Postman collections',
        columnGroup: 'left',
      },
      {
        id: 'testing-utilities',
        href: '/dev-kit/tools/scalekit-dryrun/',
        label: 'Testing Utilities',
        iconComponent: IconCodiconDebugStart,
        description: 'Test and debug auth integrations locally',
        columnGroup: 'left',
      },
      {
        id: 'integrations',
        href: '/guides/integrations/social-connections/',
        label: 'Developer Resources',
        dropdownLabel: 'Integrations',
        iconComponent: IconLucideBlocks,
        description: 'Connect external identity providers and platforms',
        sectionLabel: 'RESOURCES',
        sectionDescription: 'Guides, references, and community resources',
        columnGroup: 'right',
      },
      {
        id: 'workflows',
        href: '/authenticate/implement-workflows/implement-webhooks/',
        label: 'Developer Resources',
        dropdownLabel: 'Workflows',
        iconComponent: IconLucideWorkflow,
        description: 'Automate user lifecycle and auth events with webhooks',
        columnGroup: 'right',
      },
      {
        id: 'cookbooks',
        href: '/cookbooks/',
        label: 'Developer Resources',
        dropdownLabel: 'Cookbooks',
        iconComponent: IconLucideBookOpenText,
        description: 'Implement common patterns with step-by-step recipes',
        columnGroup: 'right',
      },
      {
        id: 'code-samples',
        href: '/resources/code-samples/',
        label: 'Code Samples',
        iconComponent: IconLucideCode,
        description: 'Copy and adapt code examples by language',
        columnGroup: 'right',
      },
    ],
  },
  sharedSdksItem,
]

export const secondaryNavConfig: Record<'agentkit' | 'saaskit', NavItem[]> = {
  agentkit: agentKitItems,
  saaskit: saasKitItems,
}

export { IconLucideCheck }
