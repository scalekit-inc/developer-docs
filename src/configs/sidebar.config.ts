import { makeChangelogsSidebarLinks } from 'starlight-changelogs'
import { createDivider, createSectionHeader } from './sidebar-utils'

export const sidebar = [
  {
    label: 'Authenticate',
    id: 'authenticate',
    link: '/authenticate',
    icon: 'seti:lock',
    items: [
      {
        label: 'Getting started',
        items: [
          'index',
          'dev-kit/set-up-scalekit',
          { label: 'Quickstart: Full-stack Auth', link: 'authenticate/fsa/quickstart' },
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
          'authenticate/manage-organizations/remove-users-from-organization',
          'authenticate/manage-users-orgs/delete-users-and-organizations',
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
        label: 'Customize',
        items: [
          'guides/custom-domain',
          'fsa/guides/login-page-branding',
          'guides/email-providers',
          'guides/dashboard/custom-email-templates',
          'authenticate/manage-users-orgs/custom-user-attributes',
          'authenticate/interceptors/auth-flow-interceptors',
          'authenticate/implement-workflows/implement-webhooks',
        ],
      },
      {
        label: 'Go Live',
        items: ['authenticate/launch-checklist', 'guides/dashboard/auth-logs'],
      },
    ],
  },
  {
    label: 'Agent Actions',
    link: '/agent-actions/quickstart',
    id: 'connect',
    badge: {
      text: 'New', // The text to display in the badge
      variant: 'tip', // Optional: 'note', 'tip', 'caution', 'danger', 'success'
    },
    icon: 'rocket',
    items: [
      {
        label: 'Getting started',
        items: [
          'agent-actions/overview',
          'agent-actions/quickstart',
          'agent-actions/agentic-quickstart',
        ],
      },
      {
        label: 'Tools',
        items: [
          'agent-actions/tools/overview',
          'agent-actions/tools/modifiers',
          'agent-actions/tools/execute',
          'agent-actions/tools/authorize',
          // 'agent-actions/tools/custom-processors',
          // 'connect/tools/custom-tools',
          // 'connect/tools/proxy-tools',
        ],
      },
      {
        label: 'AI Frameworks',
        items: [
          'agent-actions/frameworks/langchain',
          'agent-actions/frameworks/google-adk',
          // 'agent-actions/frameworks/agno',
          // 'agent-actions/frameworks/openai',
          // 'agent-actions/frameworks/anthropic',
        ],
      },
      {
        label: 'MCP',
        items: ['agent-actions/mcp/quickstart'],
      },
      {
        label: 'Advanced Guides',
        items: [
          'agent-actions/advanced/overview',
          'agent-actions/advanced/bring-your-own-oauth',
          'agent-actions/advanced/custom-domain',
          'agent-actions/advanced/proxy-api-calls',
        ],
      },
      {
        label: 'Concepts',
        items: [
          'agent-actions/providers',
          'agent-actions/connections',
          'agent-actions/connected-accounts',
        ],
      },
      {
        label: 'Connectors',
        autogenerate: {
          directory: 'reference/agent-connectors',
        },
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
    link: 'fsa/guides/implement-signup',
    icon: 'seti:powershell',
    items: [
      {
        label: 'User authentication',
        collapsed: true,
        items: [
          'guides/security/csrf-protection',
          // 'guides/security/authentication-best-practices',
        ],
      },
      {
        label: 'Integrations',
        items: [
          'guides/integrations',
          {
            label: 'Social logins',
            autogenerate: {
              directory: 'guides/integrations/social-connections',
            },
          },
        ],
      },

      {
        label: 'Manage users & orgs',
        collapsed: true,
        items: [
          'fsa/guides/signup-restrictions',
          'fsa/guides/user-invitations',
          'fsa/guides/allowed-email-domains',
          'fsa/guides/merge-identities',
          'fsa/reference/user-management-settings',
        ],
      },
      {
        label: 'Authorization',
        collapsed: true,
        items: [
          'directory/guides/group-based-role-assignment',
          'dev-kit/resources/authorization-best-practices',
        ],
      },
      {
        label: 'Customize',
        collapsed: true,
        items: [
          'fsa/guides/organization-identifiers',
          'guides/webhooks-best-practices',
          'authenticate/interceptors/interceptor-scenarios',
        ],
      },
      {
        label: 'API authentication',
        collapsed: true,
        items: ['guides/m2m/overview', 'guides/m2m/scopes', 'guides/m2m/api-auth-m2m-clients'],
      },
      // Hiding them because business decision to limit modular offerings
      // {
      //   label: 'Headless API',
      //   items: [
      //     'passwordless/quickstart',
      //     'guides/user-auth/modular-social-logins',
      //     'authenticate/m2m/api-auth-quickstart',
      //   ],
      // },
      {
        label: 'Migrations',
        collapsed: true,
        items: ['guides/sso/sso-migration-strategy', 'fsa/guides/migration-guide'],
      },
      {
        label: 'MCP authentication',
        collapsed: true,
        items: ['authenticate/mcp/auth-patterns'],
      },
      // TODO: Come back later as you put together one guide for auth best practices move this up into User authentication category
      // {
      //   label: 'Best practices',
      //   collapsed: false,
      //   items: ['guides/client-credentials-practices'],
      // },
      // {
      //   label: 'Changelog',
      //   items: [
      //     { label: 'Overview', link: '/dev-kit/changelogs/' },
      //     // makeChangelogsSidebarLinks() type options:
      //     // - type: 'all' - Single link to full version list page (current)
      //     // - type: 'latest' - Link to most recent version only
      //     // - type: 'recent' - Multiple links to N recent versions (add count: 5 to customize, default: 5)
      //     // Example: { type: 'recent', count: 3, base: '...', label: '...' }
      //     ...makeChangelogsSidebarLinks([
      //       { type: 'all', base: 'dev-kit/changelogs/node', label: 'Node.js SDK' },
      //       { type: 'all', base: 'dev-kit/changelogs/python', label: 'Python SDK' },
      //       { type: 'all', base: 'dev-kit/changelogs/go', label: 'Go SDK' },
      //       { type: 'all', base: 'dev-kit/changelogs/java', label: 'Java SDK' },
      //     ]),
      //   ],
      // },
    ],
  },
  {
    label: 'Events reference',
    id: 'events-reference',
    link: '/reference/webhooks/overview/',
    icon: 'rss',
    items: [
      {
        label: 'Webhooks',
        autogenerate: { directory: 'reference/webhooks' },
      },
      {
        label: 'Events',
        items: ['reference/admin-portal/ui-events', 'reference/interceptors/triggers'],
      },
    ],
  },
  {
    label: 'Auth for MCP',
    id: 'mcp',
    link: '/authenticate/mcp/quickstart',
    icon: 'puzzle',
    items: [
      {
        label: 'Getting started',
        items: [
          'authenticate/mcp/overview',
          'authenticate/mcp/quickstart',
          'authenticate/mcp/custom-auth',
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
          'authenticate/mcp/troubleshooting',
          'authenticate/mcp/additional-reading',
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
          'authenticate/sso/add-modular-sso',
          'sso/guides/test-sso',
          'sso/guides/onboard-enterprise-customers',
        ],
      },
      {
        label: 'SSO with existing auth',
        autogenerate: { directory: 'guides/integrations/auth-systems' },
      },
      {
        label: 'How-to guides',
        items: [
          'sso/guides/sso-basics',
          'sso/guides/authorization-url',
          'sso/guides/idp-init-sso',
          'guides/user-auth/check-sso-domain',
          'sso/guides/add-login-ux-sso',
          'sso/guides/sso-user-attributes',
        ],
      },
      {
        label: 'SSO integrations',
        autogenerate: { directory: 'guides/integrations/sso-integrations' },
      },
    ],
  },
  {
    label: 'Modular SCIM',
    id: 'modular-scim',
    link: '/authenticate/sso/add-modular-sso',
    icon: 'puzzle',
    items: [
      {
        label: 'Getting started',
        items: [
          'directory/scim/quickstart',
          'directory/guides/onboard-enterprise-customers',
          {
            label: 'Directory webhooks reference',
            link: 'directory/reference/directory-events',
          },
        ],
      },
      {
        label: 'How-to guides',
        items: [
          'directory/guides/user-provisioning-basics',
          'directory/guides/scim-protocol',
          'guides/user-management/scim-provisioning',
        ],
      },
      {
        label: 'SCIM integrations',
        autogenerate: { directory: 'guides/integrations/scim-integrations' },
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
export const topics = {
  // Pages that use custom navigation or no sidebar at all
  exclude: [
    '/', // Home page
    '/404', // Error page
    '/apis/**/*', // REST API reference has Scalar-powered navigation
  ],

  // === Specific topic mappings (order matters - most specific first) ===

  // MCP authentication (subset of /authenticate)
  mcp: ['/authenticate/mcp/**/*'],

  // Modular SSO (includes /sso and /authenticate/sso)
  'modular-sso': ['/authenticate/sso/**/*', '/sso/**/*'],

  // Modular SCIM (directory provisioning)
  'modular-scim': ['/directory/**/*'],

  // Agent Actions / Connect
  connect: ['/agent-actions/**/*', '/reference/agent-connectors/**/*'],

  // Events & webhooks reference
  'events-reference': [
    '/reference/webhooks/**/*',
    '/reference/admin-portal/**/*',
    '/reference/interceptors/**/*',
  ],

  // Main authentication topic (after more specific mcp/sso patterns)
  authenticate: ['/authenticate/**/*', '/fsa/**/*'],

  // === dev-kit is the DEFAULT catch-all for everything else ===
  'dev-kit': [
    '/dev-kit/**/*',
    '/guides/**/*',
    '/browse/**/*',
    '/m2m/**/*',
    '/social-logins/**/*',
    '/passwordless/**/*',
    '/reference/**/*', // Any remaining reference pages
    '/**/*', // Catch-all: anything not matched above defaults here
  ],
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
  // Main authentication sidebar ? ?Full-stack Auth? tab
  authenticate: 'fsa',

  // MCP sidebar ? ?Auth for MCP? tab
  mcp: 'mcp',

  // Modular SSO sidebar ? ?Modular SSO? tab
  'modular-sso': 'modular-sso',

  // Modular SCIM sidebar ? ?Modular SCIM? tab
  'modular-scim': 'modular-scim',

  // Agent Actions sidebar ? ?Agent Actions? tab
  connect: 'agent-actions',

  // Developer Resources sidebar ? ?Developer Resources? tab
  'dev-kit': 'scenarios',

  // Events reference sidebar ? ?Webhooks? tab under API Reference
  'events-reference': 'webhooks-events',
}
