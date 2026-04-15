import { createSectionHeader, createSpacing } from './sidebar-utils'

export const sidebar = [
  {
    label: 'SaaSKit',
    id: 'authenticate',
    link: '/authenticate/fsa/quickstart/',
    icon: 'seti:lock',
    items: [
      {
        label: 'Getting started',
        items: [
          'authenticate/set-up-scalekit',
          { label: 'Quickstart: SaaSKit', link: 'authenticate/fsa/quickstart' },
          'authenticate/fsa/code-samples',
        ],
      },
      {
        label: 'User authentication',
        collapsed: false,
        items: [
          'authenticate/fsa/implement-login',
          'authenticate/fsa/complete-login',
          'authenticate/fsa/manage-session',
          'authenticate/fsa/logout',
          'guides/dashboard/redirects',
        ],
      },
      {
        label: 'Manage auth methods',
        items: [
          'authenticate/auth-methods/passwordless',
          'authenticate/auth-methods/social-logins',
          'authenticate/auth-methods/passkeys',
          'authenticate/auth-methods/enterprise-sso',
          'authenticate/auth-methods/authentication-flow',
        ],
      },
      {
        label: 'Manage users & orgs',
        collapsed: false,
        items: [
          'fsa/data-modelling',
          'authenticate/manage-users-orgs/create-organization',
          'authenticate/manage-organizations/add-users-to-organization',
          'authenticate/manage-users-orgs/email-domain-rules',
          'authenticate/manage-users-orgs/jit-provisioning',
          'authenticate/manage-users-orgs/scim-provisioning',
          'authenticate/manage-users-orgs/merge-identities',
          'authenticate/manage-users-orgs/organization-switching',
          'authenticate/manage-organizations/remove-users-from-organization',
          'authenticate/manage-users-orgs/delete-users-and-organizations',
          'authenticate/fsa/user-management-settings',
          'authenticate/manage-users-orgs/hosted-widgets',
        ],
      },
      {
        label: 'Authorization',
        collapsed: false,
        items: [
          'authenticate/authz/overview',
          'authenticate/authz/create-roles-permissions',
          'authenticate/authz/assign-roles',
          'authenticate/authz/implement-access-control',
        ],
      },
      {
        label: 'Auth across multiple apps',
        collapsed: false,
        items: [
          'authenticate/fsa/multiapp/overview',
          'authenticate/fsa/multiapp/manage-apps',
          'authenticate/fsa/multiapp/web-app',
          'authenticate/fsa/multiapp/single-page-app',
          'authenticate/fsa/multiapp/native-app',
        ],
      },
      {
        label: 'Add auth to your APIs',
        items: [
          // 'guides/m2m/overview', TODO: It uses M2M context, and older context. Hiding it until we are sure to open it up
          'authenticate/m2m/api-auth-quickstart',
          'authenticate/m2m/api-keys',
          // 'guides/m2m/api-auth-m2m-clients', TODO: Translate this as guides for future
        ],
      },
      {
        label: 'Customize',
        items: [
          'guides/custom-domain',
          'fsa/guides/login-page-branding',
          'guides/email-providers',
          'guides/dashboard/custom-email-templates',
          'authenticate/manage-users-orgs/custom-user-attributes',
          {
            label: 'Intercept auth flows',
            link: 'https://docs.scalekit.com/authenticate/interceptors/auth-flow-interceptors/',
            attrs: {
              target: '_blank',
              rel: 'noopener noreferrer',
              class: 'external-link',
            },
          },
          {
            label: 'Implement webhooks',
            link: 'https://docs.scalekit.com/authenticate/implement-workflows/implement-webhooks',
            attrs: { target: '_blank', rel: 'noopener noreferrer', class: 'external-link' },
          },
        ],
      },
      {
        label: 'View auth integrations',
        link: 'guides/integrations',
      },
      {
        label: 'Go Live',
        items: [
          'authenticate/launch-checklist',
          'guides/dashboard/auth-logs',
          'fsa/guides/migration-guide',
        ],
      },
    ],
  },
  {
    label: 'AgentKit',
    link: '/agentkit/quickstart',
    id: 'connect',
    icon: 'seti:bicep',
    items: [
      {
        label: 'Getting started',
        items: [
          'agentkit/overview',
          { label: 'Quickstart: AgentKit', link: 'agentkit/quickstart' },
          { label: 'Build with AI', link: 'agentkit/build-with-ai' },
          'agentkit/user-verification',
          'agentkit/code-samples',
        ],
      },
      {
        label: 'Concepts',
        collapsed: false,
        items: [
          'agentkit/connectors',
          'agentkit/connections',
          'agentkit/connected-accounts',
          // 'agentkit/authentication/auth-flows-comparison',
          'agentkit/tools/authorize',
          // 'agentkit/authentication/token-management',
          // 'agentkit/advanced/bring-your-own-oauth',
          'agentkit/advanced/custom-domain',
          // 'agentkit/authentication/scopes-permissions',
          // 'agentkit/authentication/multi-provider',
          // 'agentkit/authentication/troubleshooting',
          // 'agentkit/authentication/testing-auth-flows',
          // 'agentkit/advanced/overview',
        ],
      },
      {
        label: 'Bring your own connector',
        items: [
          'agentkit/bring-your-own-connector/overview',
          'agentkit/bring-your-own-connector/auth-types-and-patterns',
          'agentkit/bring-your-own-connector/managing-providers',
          'agentkit/bring-your-own-connector/using-tool-proxy',
        ],
      },
      {
        label: 'Tool calling',
        collapsed: false,
        items: [
          'agentkit/tools/agent-tools-quickstart',
          { label: 'Tool access via MCP', link: 'agentkit/mcp/tool-access-via-mcp' },
          //'agentkit/advanced/proxy-api-calls',
          // 'agentkit/tools/custom-processors',
          // 'agentkit/mcp/manage-configs',
          // 'agentkit/mcp/custom-tools',
        ],
      },
      {
        label: 'AI Frameworks',
        collapsed: false,
        items: [
          {
            label: 'OpenClaw',
            link: 'agentkit/openclaw',
            badge: { text: 'New', variant: 'tip' },
          },
          'agentkit/frameworks/langchain',
          'agentkit/frameworks/google-adk',
          // 'agentkit/frameworks/agno', // TODO: Add when Agno framework docs are complete
          // 'agentkit/frameworks/openai', // TODO: Add when OpenAI framework docs are complete
          // 'agentkit/frameworks/anthropic', // TODO: Add when Anthropic framework docs are complete
        ],
      },
      {
        label: 'SDKs',
        collapsed: false,
        items: [
          { label: 'Overview', link: '/agentkit/sdks/' },
          { label: 'Node.js SDK', link: '/agentkit/sdks/node/' },
          { label: 'Python SDK', link: '/agentkit/sdks/python/' },
        ],
      },
      // {
      //   label: 'Concepts',
      //   items: ['connect/providers', 'connect/connections', 'connect/connected-accounts'],
      // },
    ],
  },
  {
    label: 'Agent connectors',
    id: 'agent-providers',
    link: '/guides/integrations/agent-connectors/',
    icon: 'seti:bicep',
    items: [
      {
        label: 'Connectors',
        autogenerate: {
          directory: 'reference/agent-connectors',
        },
      },
    ],
  },
  {
    label: 'Developer Kit',
    id: 'dev-kit',
    link: '/dev-kit/build-with-ai/',
    icon: 'seti:powershell',
    items: [
      {
        label: 'Build with coding agents',
        items: [
          'dev-kit/build-with-ai',
          'dev-kit/build-with-ai/full-stack-auth',
          'dev-kit/build-with-ai/mcp-auth',
          'dev-kit/build-with-ai/sso',
          'dev-kit/build-with-ai/scim',
        ],
      },
      {
        label: 'AI tools',
        collapsed: false,
        items: [
          'dev-kit/ai-assisted-development/scalekit-mcp-server',
          'dev-kit/resources/ai-assisted-setup',
          'dev-kit/ai-assisted-development/context7',
        ],
      },
      {
        label: 'Testing utilities',
        items: [
          'dev-kit/tools/scalekit-dryrun',
          'dev-kit/tools/sso-simulator',
          'dev-kit/tools/use-scalekit-credentials',
        ],
      },
      {
        label: 'SDKs & APIs',
        items: [
          'dev-kit/sdks',
          {
            label: 'APIs',
            link: '/apis/#description/overview',
            attrs: { target: '_blank', rel: 'noopener noreferrer', class: 'external-link' },
          },
          'dev-kit/api-collections/openapi-spec',
          {
            label: 'Postman collections',
            link: 'https://github.com/scalekit-inc/api-collections/tree/main',
            attrs: { target: '_blank', rel: 'noopener noreferrer', class: 'external-link' },
          },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    id: 'resources',
    link: '/guides/integrations',
    icon: 'open-book',
    items: [
      {
        label: 'Code samples',
        collapsed: true,
        items: [
          { label: 'Overview', link: 'resources/code-samples' },
          'resources/code-samples/full-stack-auth',
          'resources/code-samples/mcp-auth',
          'resources/code-samples/modular-sso',
          'resources/code-samples/modular-scim',
        ],
      },
      createSectionHeader('Integrations'),
      {
        label: 'Social connections',
        collapsed: true,
        autogenerate: { directory: 'guides/integrations/social-connections' },
      },
      {
        label: 'SSO integrations',
        collapsed: true,
        autogenerate: { directory: 'guides/integrations/sso-integrations' },
      },
      {
        label: 'SCIM integrations',
        collapsed: true,
        autogenerate: { directory: 'guides/integrations/scim-integrations' },
      },
      createSpacing(),
      createSectionHeader('Workflows'),
      {
        label: 'Webhooks',
        collapsed: true,
        items: [
          'authenticate/implement-workflows/implement-webhooks',
          'guides/webhooks-best-practices',
        ],
      },
      {
        label: 'Interceptors',
        collapsed: true,
        items: [
          'authenticate/interceptors/auth-flow-interceptors',
          'reference/interceptors/triggers',
        ],
      },
      { label: 'Admin portal events', link: 'reference/admin-portal/ui-events' },
    ],
  },
  {
    label: 'MCP Auth',
    id: 'mcp',
    link: '/authenticate/mcp/quickstart',
    icon: 'puzzle',
    items: [
      {
        label: 'Getting started',
        items: [
          'authenticate/mcp/overview',
          { label: 'Quickstart: MCP Auth', link: 'authenticate/mcp/quickstart' },
          'authenticate/mcp/managing-mcp-clients',
          'authenticate/mcp/code-samples',
        ],
      },
      {
        label: 'Auth methods',
        items: [
          'mcp/auth-methods/enterprise',
          'mcp/auth-methods/social',
          'mcp/auth-methods/custom-auth',
        ],
      },
      {
        label: 'Authentication patterns',
        items: [
          'authenticate/mcp/topologies/human-mcp',
          'authenticate/mcp/topologies/agent-mcp',
          'authenticate/mcp/topologies/mcp-api',
        ],
      },
      {
        label: 'Integration guides',
        items: [
          'authenticate/mcp/fastmcp-quickstart',
          'authenticate/mcp/fastapi-fastmcp-quickstart',
          'authenticate/mcp/expressjs-quickstart',
        ],
      },
      {
        label: 'Resources',
        items: [
          'authenticate/mcp/intro-to-mcp-auth',
          'authenticate/mcp/code-samples',
          'authenticate/mcp/troubleshooting',
        ],
      },
    ],
  },
  {
    label: 'Modular SSO',
    id: 'modular-sso',
    link: '/authenticate/sso/add-modular-sso',
    icon: 'puzzle',
    items: [
      {
        label: 'Getting started',
        items: [
          { label: 'Quickstart: Add modular SSO', link: 'authenticate/sso/add-modular-sso' },
          'authenticate/sso/code-samples',
        ],
      },
      {
        label: 'Integrate SSO with own auth',
        autogenerate: { directory: 'guides/integrations/auth-systems' },
      },
      {
        label: 'How to...',
        items: [
          'sso/guides/authorization-url',
          'sso/guides/idp-init-sso',
          'guides/user-auth/check-sso-domain',
          'sso/guides/sso-user-attributes',
          'sso/guides/test-sso',
          'sso/guides/onboard-enterprise-customers',
          'guides/sso/sso-migration-strategy',
        ],
      },
      {
        label: 'Guides',
        items: [
          'sso/guides/sso-basics',
          'sso/guides/add-login-ux-sso',
          {
            label: 'Self-service admin portal',
            link: 'authenticate/sso/admin-portal',
          },
          'sso/reference/sso-integration-errors',
        ],
      },
      {
        label: 'Go live',
        items: ['sso/guides/launch-checklist'],
      },
      {
        label: 'View all SSO integrations',
        link: 'https://docs.scalekit.com/guides/integrations/sso-integrations/',
        attrs: { target: '_blank', rel: 'noopener noreferrer', class: 'external-link' },
      },
    ],
  },
  {
    label: 'Modular SCIM',
    id: 'modular-scim',
    link: '/directory/scim/quickstart/',
    icon: 'puzzle',
    items: [
      {
        label: 'Getting started',
        items: [
          { label: 'Quickstart: Add modular SCIM', link: 'directory/scim/quickstart' },
          'directory/code-samples',
        ],
      },
      {
        label: 'How to...',
        items: [
          'directory/guides/group-based-role-assignment',
          'guides/user-management/scim-provisioning',
          'directory/guides/onboard-enterprise-customers',
        ],
      },
      {
        label: 'Guides',
        items: [
          'directory/guides/user-provisioning-basics',
          'directory/guides/scim-protocol',
          {
            label: 'Self-service admin portal',
            link: 'directory/admin-portal',
          },
          {
            label: 'Directory webhooks reference',
            link: 'directory/reference/directory-events',
          },
        ],
      },
      {
        label: 'Go live',
        items: ['directory/guides/launch-checklist'],
      },
      {
        label: 'View all SCIM integrations',
        link: 'https://docs.scalekit.com/guides/integrations/scim-integrations/',
        attrs: { target: '_blank', rel: 'noopener noreferrer', class: 'external-link' },
      },
    ],
  },
  {
    label: 'SDKs & APIs',
    id: 'sdks',
    link: '/sdks/',
    icon: 'seti:webpack',
    items: [
      {
        label: 'Node.js SDK',
        items: [
          { label: 'Overview', link: '/sdks/node/' },
          { label: 'SDK reference', link: '/sdks/node/reference/' },
        ],
      },
      {
        label: 'Python SDK',
        items: [
          { label: 'Overview', link: '/sdks/python/' },
          { label: 'SDK reference', link: '/sdks/python/reference/' },
        ],
      },
      {
        label: 'Go SDK',
        items: [
          { label: 'Overview', link: '/sdks/go/' },
          { label: 'SDK reference', link: '/sdks/go/reference/' },
        ],
      },
      {
        label: 'Java SDK',
        items: [
          { label: 'Overview', link: '/sdks/java/' },
          { label: 'SDK reference', link: '/sdks/java/reference/' },
        ],
      },
      {
        label: 'Expo SDK',
        link: '/sdks/expo/',
        // Note: No SDK reference yet - only Overview page
      },
      {
        label: 'APIs',
        link: '/apis/#description/overview',
        attrs: { target: '_blank', rel: 'noopener noreferrer', class: 'external-link' },
      },
    ],
  },
]

/**
 * Topics configuration for starlight-sidebar-topics plugin
 *
 * How it works:
 * 1. Pages explicitly listed in sidebar `items` ? Automatically get that sidebar
 * 2. `topics[id]` patterns ? For pages NOT in any sidebar, associates them with a topic
 * 3. `exclude` ? Pages that should use custom navigation (no topic sidebar)
 *
 * Pattern matching priority: More specific patterns should be listed first.
 * The plugin matches from top to bottom, first match wins.
 */

/**
 * Pages that should be excluded from any topic.
 * These pages will use the built-in Starlight sidebar and not render a list of topics.
 */
export const exclude = [
  '/', // Gateway page — no topic sidebar
  '/blog',
  '/404', // Error page
  '/apis/**/*', // REST API reference has Scalar-powered navigation
]

/**
 * Maps topic IDs to arrays of glob patterns for pages that should be associated with each topic.
 * This is useful for pages generated by other plugins or pages not explicitly listed in sidebar items.
 */
export const topics = {
  // === Specific topic mappings (order matters - most specific first) ===

  // MCP authentication (subset of /authenticate and /mcp)
  mcp: ['/authenticate/mcp/**/*', '/mcp/**/*'],

  // Modular SSO (includes /sso and /authenticate/sso)
  'modular-sso': ['/authenticate/sso/**/*', '/sso/**/*'],

  // Modular SCIM (directory provisioning)
  'modular-scim': ['/directory/**/*'],

  // Agent connectors (dedicated providers sidebar — must come before connect)
  'agent-providers': [
    '/reference/agent-connectors/**/*',
    '/guides/integrations/agent-connectors',
    '/guides/integrations/agent-connectors/**/*',
  ],

  // AgentKit / Connect
  connect: ['/agentkit/**/*'],

  // === Resources (integrations, workflows, references) ===
  resources: [
    '/resources/code-samples/**/*',
    '/guides/integrations/**/*',
    '/authenticate/implement-workflows/**/*',
    '/authenticate/interceptors/**/*',
    '/reference/admin-portal/**/*',
    '/guides/webhooks-best-practices',
    '/reference/interceptors/**/*',
    '/guides/**/*',
    '/browse/**/*',
    '/reference/**/*',
    '/cookbooks',
    '/cookbooks/**/*',
    '/**/*', // Catch-all: anything not matched above defaults here
  ],

  // === Developer Kit (tools, code, SDKs, AI helpers) ===
  'dev-kit': [
    '/dev-kit/tools/**/*',
    '/dev-kit/sdks/**/*',
    '/dev-kit/ai-assisted-development/**/*',
    '/dev-kit/resources/**/*',
    '/dev-kit/build-with-ai/**/*',
    '/dev-kit/api-collections/**/*',
    '/dev-kit/**/*',
  ],

  // Main authentication topic (after more specific mcp/sso patterns)
}

/**
 * Secondary nav routing
 *
 * This section answers: ?Given the current *sidebar*, which **secondary nav**
 * item should be highlighted in the top nav??
 *
 * Flow:
 *   1. A page is mapped to a sidebar (via `sidebar` + `topics`)
 *   2. We look up that sidebar ID in `sidebarToSecondaryNav` below
 *   3. The result tells the secondary nav which top-level tab to highlight
 *
 * Two mapping shapes are supported:
 *   - `string` ? always highlight a single secondary nav item
 *   - `{ default, pathOverrides }` ? choose item by URL prefix
 */
export type SecondaryNavMapping =
  | string
  | {
      default: string
      pathOverrides?: Record<string, string>
    }

/**
 * Maps **sidebar IDs** (from `sidebar`) to **secondary nav item IDs**
 * (from `secondary-nav.config.ts`).
 *
 * Keys here must match `sidebar[*].id`.
 * Values must match `secondaryNavItems[*].id`.
 */
export const sidebarToSecondaryNav: Record<string, SecondaryNavMapping> = {
  // Main authentication sidebar → SaaSKit tabs (with path-based routing)
  authenticate: {
    default: 'saaskit-user-management',
    pathOverrides: {
      '/authenticate/mcp': 'saaskit-mcp-auth',
      '/authenticate/sso': 'saaskit-sso',
      '/directory/scim': 'saaskit-scim',
      '/authenticate/fsa': 'saaskit-user-management',
      '/authenticate/manage-users-orgs': 'saaskit-user-management',
      '/authenticate/manage-organizations': 'saaskit-user-management',
      '/authenticate/auth-methods': 'saaskit-user-management',
      '/authenticate/authz': 'saaskit-user-management',
      '/fsa': 'saaskit-user-management',
      '/guides/custom-domain': 'saaskit-user-management',
      '/guides/email-providers': 'saaskit-user-management',
      '/guides/dashboard/custom-email-templates': 'saaskit-user-management',
    },
  },

  // MCP sidebar → SaaSKit MCP Auth tab
  mcp: 'saaskit-mcp-auth',

  // Modular SSO sidebar → SaaSKit SSO tab
  'modular-sso': 'saaskit-sso',

  // Modular SCIM sidebar → SaaSKit SCIM tab
  'modular-scim': 'saaskit-scim',

  // Agent connectors sidebar → AgentKit Connectors tab
  'agent-providers': 'agentkit-connectors',

  // AgentKit sidebar → AgentKit tabs
  connect: {
    default: 'agentkit-quickstart',
    pathOverrides: {
      '/agentkit/connectors': 'agentkit-connectors',
      '/agentkit/providers': 'agentkit-connectors',
      '/agentkit/connections': 'agentkit-connectors',
      '/agentkit/connected-accounts': 'agentkit-connectors',
      '/agentkit/sdks': 'agentkit-sdks',
      '/agentkit/tools/agent-tools-quickstart': 'agentkit-quickstart',
      '/agentkit/openclaw': 'agentkit-quickstart',
      '/agentkit/frameworks': 'agentkit-quickstart',
    },
  },

  // Developer Kit sidebar → Developer Resources dropdown (left column)
  'dev-kit': {
    default: 'build-with-ai',
    pathOverrides: {
      '/dev-kit/tools': 'testing-utilities',
      '/dev-kit/build-with-ai': 'build-with-ai',
      '/dev-kit/sdks': 'dev-tools',
      '/dev-kit/ai-assisted-development': 'build-with-ai',
      '/dev-kit/resources/ai-assisted-setup': 'build-with-ai',
    },
  },

  // Resources sidebar → Developer Resources dropdown (right column)
  resources: {
    default: 'integrations',
    pathOverrides: {
      '/resources/code-samples': 'code-samples',
      '/guides/integrations': 'integrations',
      '/authenticate/implement-workflows': 'workflows',
      '/authenticate/interceptors': 'workflows',
      '/reference/interceptors': 'workflows',
      '/reference/admin-portal': 'workflows',
      '/cookbooks': 'cookbooks',
    },
  },

  // SDKs sidebar → 'SDKs' tab
  sdks: 'sdks',

  // Events reference sidebar → 'Webhooks' tab under API Reference
  'events-reference': 'webhooks-events',
}
