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
import IconLucideWrench from '~icons/lucide/wrench'
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
}

export const secondaryNavItems: NavItem[] = [
  {
    id: 'authenticate',
    href: '#authenticate',
    label: 'Choose product',
    children: [
      {
        id: 'agentkit-quickstart',
        href: '/agent-auth/quickstart/',
        label: 'AgentKit',
        dropdownLabel: 'Quickstart',
        iconComponent: IconLucideRocket,
        description: 'Build your first agent action and authorize a user in minutes',
        sectionLabel: 'AGENTKIT',
        sectionDescription:
          'Docs for building agents that connect to SaaS tools on behalf of users',
        columnGroup: 'left',
      },
      {
        id: 'agentkit-agent-tools',
        href: '/agent-auth/tools/agent-tools-quickstart/',
        label: 'AgentKit',
        dropdownLabel: 'Agent Tools',
        iconComponent: IconLucideWrench,
        description: 'Call optimized tools and simplify how agents work across connectors',
        columnGroup: 'left',
      },
      {
        id: 'agentkit-ai-frameworks',
        href: '/agent-auth/openclaw/',
        label: 'AgentKit',
        dropdownLabel: 'AI Frameworks',
        iconComponent: IconRiAiGenerate2,
        description: 'Plug Agent Auth into framework-specific agent runtimes and scaffolds',
        columnGroup: 'left',
      },
      {
        id: 'agentkit-providers',
        href: '/guides/integrations/agent-connectors/',
        label: 'AgentKit',
        dropdownLabel: 'Providers',
        iconComponent: IconLucideBot,
        description: 'Browse supported SaaS apps, APIs, and MCP-backed connectors',
        columnGroup: 'left',
      },
      {
        id: 'saaskit-user-management',
        href: '/authenticate/fsa/quickstart/',
        label: 'SaaSKit',
        dropdownLabel: 'User management',
        iconComponent: IconLucideUsers,
        description: 'Run your SaaS auth stack with users, orgs, sessions, roles, and APIs',
        sectionLabel: 'SAASKIT',
        sectionDescription: 'Docs for securing B2B SaaS apps with modular and full-stack auth',
        sectionHref: '/auth-for-saas/',
        sectionCtaLabel: 'See overview →',
        columnGroup: 'right',
      },
      {
        id: 'saaskit-sso',
        href: '/authenticate/sso/add-modular-sso/',
        label: 'SaaSKit',
        dropdownLabel: 'SSO',
        iconComponent: IconMingcuteUserSecurityLine,
        description: 'Add enterprise SAML and OIDC sign-in without rewriting your auth system',
        columnGroup: 'right',
      },
      {
        id: 'saaskit-scim',
        href: '/directory/scim/quickstart/',
        label: 'SaaSKit',
        dropdownLabel: 'SCIM',
        iconComponent: IconAntDesignUserSwitchOutlined,
        description: 'Provision users, groups, and roles automatically from enterprise directories',
        columnGroup: 'right',
      },
      {
        id: 'saaskit-mcp-auth',
        href: '/authenticate/mcp/quickstart/',
        label: 'SaaSKit',
        dropdownLabel: 'MCP Auth',
        iconComponent: IconMcp,
        description: 'Secure MCP servers with OAuth, dynamic registration, and short-lived tokens',
        columnGroup: 'right',
      },
    ],
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
]

export { IconLucideCheck }
