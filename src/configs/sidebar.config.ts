import { createDivider, createSectionHeader, createSpacing } from './sidebar-utils'

export const sidebar = [
  {
    label: 'Full stack auth',
    id: 'authenticate',
    link: '/authenticate/fsa/quickstart/',
    icon: 'seti:lock',
    items: [
      {
        label: 'Getting started',
        items: [
          'authenticate/set-up-scalekit',
          { label: 'Quickstart: Full stack auth', link: 'authenticate/fsa/quickstart' },
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
          'authenticate/manage-users-orgs/merge-identities',
          'authenticate/manage-users-orgs/organization-switching',
          'authenticate/manage-organizations/remove-users-from-organization',
          'authenticate/manage-users-orgs/delete-users-and-organizations',
          'authenticate/fsa/user-management-settings',
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
        label: 'Add auth to your APIs',
        items: [
          // 'guides/m2m/overview', TODO: It uses M2M context, and older context. Hiding it until we are sure to open it up
          'authenticate/m2m/api-auth-quickstart',
          'guides/m2m/scopes',
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
    label: 'Agent Auth',
    link: '/agent-auth/quickstart',
    id: 'connect',
    icon: 'seti:bicep',
    items: [
      {
        label: 'Getting started',
        items: ['agent-auth/overview', 'agent-auth/quickstart', 'agent-auth/code-samples'],
      },
      {
        label: 'Authentication',
        collapsed: false,
        items: [
          'agent-auth/providers',
          'agent-auth/connections',
          'agent-auth/connected-accounts',
          // 'agent-auth/authentication/auth-flows-comparison',
          'agent-auth/tools/authorize',
          'agent-auth/authentication/token-management',
          'agent-auth/advanced/bring-your-own-oauth',
          'agent-auth/advanced/custom-domain',
          // 'agent-auth/authentication/scopes-permissions',
          // 'agent-auth/authentication/multi-provider',
          // 'agent-auth/authentication/troubleshooting',
          // 'agent-auth/authentication/testing-auth-flows',
          // 'agent-auth/advanced/overview',
        ],
      },
      {
        label: 'Connectors',
        autogenerate: {
          directory: 'reference/agent-connectors',
        },
      },
      {
        label: 'Agentic tool calling',
        collapsed: false,
        items: [
          'agent-auth/agentic-quickstart',
          {
            label: 'AI Frameworks',
            items: [
              'agent-auth/frameworks/langchain',
              'agent-auth/frameworks/google-adk',
              // 'agent-auth/frameworks/agno',
              // 'agent-auth/frameworks/openai',
              // 'agent-auth/frameworks/anthropic',
            ],
          },
          {
            label: 'MCP',
            items: ['agent-auth/mcp/quickstart'],
          },
        ],
      },
      {
        label: 'Tool calling reference',
        collapsed: false,
        items: [
          'agent-auth/tools/overview',
          'agent-auth/tools/execute',
          'agent-auth/tools/modifiers',
          //'agent-auth/advanced/proxy-api-calls',
          // 'agent-auth/tools/custom-processors',
          // 'connect/tools/custom-tools',
          // 'connect/tools/proxy-tools',
        ],
      },
      // {
      //   label: 'MCP',
      //   items: ['connect/mcp/quickstart', 'connect/mcp/custom-mcp', 'connect/mcp/manage'],
      // },

      // {
      //   label: 'Concepts',
      //   items: ['connect/providers', 'connect/connections', 'connect/connected-accounts'],
      // },
    ],
  },
  {
    label: 'Developer Resources',
    id: 'dev-kit',
    link: '/dev-kit/code-samples/',
    icon: 'seti:powershell',
    // TODO: A lot of items are intentionally hidden until contents in them are authored.
    items: [
      // 'dev-kit',
      // {
      //   label: 'Work with Scalekit',
      //   collapsed: true,
      //   items: [
      //     'dev-kit/guides/dashboard/environments',
      //     'dev-kit/guides/dashboard/manage-team-members',
      //     'dev-kit/guides/dashboard/billing',
      //   ],
      // },
      {
        label: 'Code samples',
        items: [
          { label: 'Overview', link: 'dev-kit/code-samples' },
          'dev-kit/code-samples/mcp-auth',
          'dev-kit/code-samples/agent-auth',
          'dev-kit/code-samples/modular-sso',
          'dev-kit/code-samples/modular-scim',
          'dev-kit/code-samples/full-stack-auth',
        ],
      },
      createSpacing(),
      createSectionHeader('Testing Utilities'),
      'dev-kit/tools/scalekit-dryrun',
      'sso/guides/test-sso',
      createSpacing(),
      createSectionHeader('DEV TOOLS'),
      {
        label: 'SDKs',
        link: 'dev-kit/sdks',
      },
      {
        label: 'APIs',
        // link: 'dev-kit/apis',
        link: '/apis/#description/overview',
        attrs: { target: '_blank', rel: 'noopener noreferrer', class: 'external-link' },
      },
      {
        label: 'API collections',
        collapsed: true,
        items: [
          // 'dev-kit/api-collections/postman-collections', TODO: Expand the guide for postman collections
          {
            label: 'Postman collections',
            link: 'https://github.com/scalekit-inc/api-collections/tree/main/postman',
            attrs: { target: '_blank', rel: 'noopener noreferrer', class: 'external-link' },
          },
          'dev-kit/api-collections/openapi-spec',
        ],
      },
      {
        label: 'AI tools',
        collapsed: true,
        items: [
          'dev-kit/ai-assisted-development/scalekit-mcp-server',
          'dev-kit/resources/ai-assisted-setup',
          // 'dev-kit/ai-assisted-development/cursor',
          // 'dev-kit/ai-assisted-development/claude',
          // 'dev-kit/ai-assisted-development/codex',
          // 'dev-kit/ai-assisted-development/vscode',
        ],
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
      createSectionHeader('Auth Integrations'),
      {
        label: 'Social connections',
        collapsed: true,
        autogenerate: {
          directory: 'guides/integrations/social-connections',
        },
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
      // {
      //   label: 'Test enterprise integrations',
      //   collapsed: true,
      //   items: ['dev-kit/guides/testing/sso-simulator', 'dev-kit/guides/testing/scim-simulator'],
      // },
      // {
      //   label: 'How-to guides',
      //   collapsed: false,
      //   items: [
      //     // 'reference/webhooks/overview',
      //     // 'reference/webhooks/directory-events',
      //     // 'reference/webhooks/user-events',
      //     // 'reference/webhooks/organization-events',
      //     // 'reference/webhooks/permission-events',
      //     // 'reference/webhooks/role-events',
      //     // 'reference/webhooks/sso-events'
      //   ],
      // },
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
          'authenticate/mcp/quickstart',
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
        items: ['authenticate/sso/add-modular-sso', 'authenticate/sso/code-samples'],
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
        items: ['directory/scim/quickstart', 'directory/code-samples'],
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
  '/', // Home page
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

  // Agent Auth / Connect
  connect: ['/agent-auth/**/*', '/reference/agent-connectors/**/*'],

  // === dev-kit patterns (must come before authenticate pattern) ===
  'dev-kit': [
    '/authenticate/implement-workflows/implement-webhooks',
    '/authenticate/interceptors/auth-flow-interceptors',
    '/dev-kit/**/*',
    '/guides/**/*',
    '/browse/**/*',
    '/m2m/**/*',
    '/social-logins/**/*',
    '/passwordless/**/*',
    '/reference/**/*', // Any remaining reference pages
    '/**/*', // Catch-all: anything not matched above defaults here
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
  // Main authentication sidebar → Full-stack Auth tabs (with path-based routing)
  authenticate: {
    default: 'fsa-quickstart',
    pathOverrides: {
      '/authenticate/fsa/implement-login': 'fsa-user-auth',
      '/authenticate/fsa/complete-login': 'fsa-user-auth',
      '/authenticate/fsa/manage-session': 'fsa-user-auth',
      '/authenticate/fsa/logout': 'fsa-user-auth',
      '/fsa/data-modelling': 'fsa-users-orgs',
      '/authenticate/manage-users-orgs': 'fsa-users-orgs',
      '/authenticate/manage-organizations': 'fsa-users-orgs',
      '/authenticate/authz': 'fsa-authorization',
      '/guides/custom-domain': 'fsa-customize',
      '/fsa/guides/login-page-branding': 'fsa-customize',
      '/guides/email-providers': 'fsa-customize',
      '/guides/dashboard/custom-email-templates': 'fsa-customize',
      // Removed: interceptors and workflows now use topics-based routing (maps to dev-kit)
    },
  },

  // MCP sidebar → 'Auth for MCP' tab
  mcp: 'mcp',

  // Modular SSO sidebar → 'Modular SSO' tab
  'modular-sso': 'modular-sso',

  // Modular SCIM sidebar → 'Modular SCIM' tab
  'modular-scim': 'modular-scim',

  // Agent Auth sidebar → 'Agent Auth' tab
  connect: 'agent-auth',

  // Developer Resources sidebar → 'Developer Resources' tab
  'dev-kit': 'scenarios',

  // SDKs sidebar → 'SDKs' tab
  sdks: 'sdks',

  // Events reference sidebar → 'Webhooks' tab under API Reference
  'events-reference': 'webhooks-events',
}
