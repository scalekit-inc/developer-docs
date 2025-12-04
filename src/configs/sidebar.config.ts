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
    link: '/dev-kit/overview',
    icon: 'seti:powershell',
    items: [
      'dev-kit/overview',
      {
        label: 'AI Assisted Setup',
        link: 'dev-kit/resources/ai-assisted-setup',
      },
      createDivider(),
      {
        label: 'User authentication',
        items: [
          'fsa/guides/implement-signup',
          'guides/user-auth/login-scenarios',
          'guides/user-auth/preserve-intended-destination',
          'guides/security/csrf-protection',
          'guides/dashboard/redirects',
          'guides/idtoken-claims',
          'guides/accesstoken-claims',
          // 'guides/security/authentication-best-practices',
        ],
      },
      {
        label: 'Manage users & orgs',
        collapsed: false,
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
        items: [
          'directory/guides/group-based-role-assignment',
          'dev-kit/resources/authorization-best-practices',
        ],
      },
      {
        label: 'Customize',
        items: [
          'fsa/guides/organization-identifiers',
          'guides/webhooks-best-practices',
          'authenticate/interceptors/interceptor-scenarios',
        ],
      },
      {
        label: 'API authentication',
        items: ['guides/m2m/overview', 'guides/m2m/scopes', 'guides/m2m/api-auth-m2m-clients'],
      },
      {
        label: 'Headless API',
        items: [
          'passwordless/quickstart',
          'guides/user-auth/modular-social-logins',
          'authenticate/m2m/api-auth-quickstart',
        ],
      },
      {
        label: 'Migrations',
        items: ['guides/sso/sso-migration-strategy', 'fsa/guides/migration-guide'],
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
    label: 'Integrations',
    id: 'integrations',
    link: '/guides/integrations',
    icon: 'puzzle',
    items: [
      {
        label: 'Social connections',
        autogenerate: {
          directory: 'guides/integrations/social-connections',
        },
      },
      {
        label: 'SSO with existing auth',
        autogenerate: { directory: 'guides/integrations/auth-systems' },
      },
      {
        label: 'SSO connections',
        autogenerate: { directory: 'guides/integrations/sso-integrations' },
      },
      {
        label: 'SCIM connections',
        autogenerate: { directory: 'guides/integrations/scim-integrations' },
      },
    ],
  },
  {
    label: 'Auth for MCP',
    id: 'mcp',
    link: '/mcp/quickstart',
    icon: 'puzzle',
    items: [
      {
        label: 'Getting started',
        items: ['mcp/quickstart', 'authenticate/mcp/auth-patterns', 'mcp/auth-methods/custom-auth'],
      },
      {
        label: 'Guides',
        items: [
          'mcp/intro-to-mcp-auth',
          'authenticate/mcp/fastapi-fastmcp-quickstart',
          'authenticate/mcp/expressjs-quickstart',
          'authenticate/mcp/fastmcp-quickstart',
          'mcp/troubleshooting',
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
          'sso/guides/idp-init-sso',
          'sso/guides/test-sso',
        ],
      },
      {
        label: 'Guides',
        items: [
          'sso/guides/sso-basics',
          'sso/guides/authorization-url',
          'guides/user-auth/check-sso-domain',
          'sso/guides/add-login-ux-sso',
          'sso/guides/sso-user-attributes',
        ],
      },
      {
        label: 'Onboard an enterprise',
        items: [
          'fsa/guides/onboard-enterprise-customers',
          'guides/admin-portal',
          {
            label: 'View all integrations',
            link: 'guides/integrations',
            badge: {
              text: '25+',
              variant: 'tip',
            },
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
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
        items: ['directory/scim/quickstart', 'guides/admin-portal'],
      },
      {
        label: 'Guides',
        items: [
          'directory/guides/user-provisioning-basics',
          'directory/guides/scim-protocol',
          'guides/user-management/scim-provisioning',
        ],
      },
      {
        label: 'Onboard an enterprise',
        items: [
          'fsa/guides/onboard-enterprise-customers',
          {
            label: 'View all integrations',
            link: 'guides/integrations',
            badge: {
              text: '25+',
              variant: 'tip',
            },
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
      },
    ],
  },
]

export const topics = {
  exclude: [
    '/', // Exclude root path
    '/index.astro', // Exclude index by name
    '/404', // Exclude 404 page
    '/reference/**/*', // Keep reference docs excluded
    '/guides/integrations', // Exclude integrations overview from sidebar
    '/dev-kit/', // Exclude dev-kit landing page (redirects to /dev-kit/overview)
  ],
  // Associate unlisted pages with their respective topic sidebars
  authenticate: [
    '/authenticate/**/*',
    '/fsa/**/*',
    '/sso/**/*',
    '/directory/**/*',
    '/guides/sso/**/*',
    '/guides/custom-domain',
    '/guides/email-providers',
    '/authenticate/interceptors/**/*',
    '/guides/user-auth/modular-social-logins', // Modular social logins appears in Authenticate sidebar
    '/passwordless/**/*', // Magic Link & OTP authentication belongs in Authenticate
  ], // Pages that appear in Authenticate sidebar
  connect: ['/agent-actions/**/*'], // Agent Actions pages
  mcp: ['/mcp/**/*', '/authenticate/mcp/**/*'],
  'modular-sso': [
    '/authenticate/sso/**/*',
    '/sso/**/*',
    '/guides/sso/**/*',
    '/passwordless/**/*',
    '/authenticate/m2m/**/*',
  ],
  'modular-scim': [
    '/directory/scim/**/*',
    '/directory/guides/**/*',
    '/guides/user-management/scim-provisioning',
  ],
  'dev-kit': [
    '/dev-kit/**/*',
    '/scenarios',
    '/cookbooks',
    '/social-logins/**/*',
    // '/passwordless/**/*', // Moved to authenticate topic
    // '/guides/passwordless/**/*', // Moved to authenticate topic
    '/authenticate/interceptors/interceptor-scenarios',
    '/guides/dashboard/**/*', // Dashboard guides belong in Developer Resources
    '/guides/external-ids-and-metadata',
    '/guides/idtoken-claims',
    '/guides/accesstoken-claims',
    '/guides/unlisted/passwordless-as-service',
    '/browse/**/*', // Code samples and videos
    '/guides/user-auth/**/*', // User auth guides and examples
    '/guides/security/**/*', // Security best practices
    '/m2m/**/*', // M2M API auth pages
    '/guides/m2m/**/*', // M2M authentication guides
    // Specific FSA implementation guides that appear in dev-kit sidebar
    '/fsa/guides/implement-signup',
    // '/fsa/guides/login-page-branding', // Moved to authenticate topic
    '/fsa/guides/signup-restrictions',
    '/fsa/guides/user-invitations',
    // '/authenticate/manage-users-orgs/custom-user-attributes', // Moved to authenticate topic
    '/fsa/guides/app-roles',
    // '/authenticate/manage-users-orgs/create-organization', // Moved to authenticate topic
    '/fsa/guides/migration-guide',
    '/fsa/guides/merge-identities',
    '/fsa/guides/onboard-enterprise-customers',
    '/fsa/guides/organization-identifiers',
    '/fsa/reference/user-management-settings',
    // User management guides
    '/guides/user-management/**/*',
    // Authorization and best practices guides
    '/dev-kit/resources/**',
    '/guides/client-credentials-practices',
    '/guides/webhooks-best-practices',
    // SDK changelogs
    '/dev-kit/changelogs/**/*',
  ], // Developer resources and implementation guides
  integrations: ['/guides/integrations/**/*'], // Integration guide pages
  'events-reference': [
    '/reference/webhooks/**/*',
    '/reference/admin-portal/ui-events',
    '/reference/interceptors/triggers',
  ], // Events reference pages
  'rest-apis': ['/apis/**/*'], // REST API reference pages
}

/**
 * @deprecated This export is no longer used - replaced by sidebarToSecondaryNav
 * Kept for backward compatibility during transition
 */
export const secondaryNavMapping = {
  scenarios: {
    id: 'scenarios',
    priority: 60,
    patterns: [
      '/scenarios',
      '/browse',
      '/dev-kit',
      '/m2m',
      '/guides/m2m',
      '/authenticate/interceptors/interceptor-scenarios',
      '/guides/dashboard',
      '/guides/external-ids-and-metadata',
      '/guides/client-credentials-practices',
      '/guides/webhooks-best-practices',
      '/guides/idtoken-claims',
      '/guides/accesstoken-claims',
      '/guides/integrations',
    ],
  },
  authenticate: {
    id: 'authenticate',
    priority: 40,
    patterns: [
      '/', // Root path
      '/authenticate',
      '/fsa',
      '/social-logins',
      '/guides/custom-domain',
      '/guides/email-providers',
      '/authenticate/interceptors/**/*',
      '/guides/user-auth',
      '/guides/security',
      '/guides/user-management',
      // Additional patterns for missing Authenticate paths
      '/authenticate/manage-users-orgs/**/*',
      '/authenticate/manage-organizations/**/*',
      '/authenticate/authz/**/*',
      '/authenticate/implement-workflows/**/*',
    ],
  },
  'agent-actions': {
    id: 'agent-actions',
    priority: 100,
    patterns: ['/agent-actions'],
  },
  'api-reference': {
    id: 'api-reference',
    priority: 80,
    patterns: [
      '/apis',
      '/reference/webhooks',
      '/reference/admin-portal/ui-events',
      '/reference/interceptors',
      '/reference/agent-connectors',
    ],
  },
}

/**
 * Maps sidebar IDs to SecondaryNav item IDs
 *
 * This is the single source of truth for determining which SecondaryNav item
 * should be highlighted based on the current sidebar context.
 *
 * Simple string value: Maps directly to a SecondaryNav child item ID
 * Object with pathOverrides: Uses path matching for granular child selection
 *   - default: The default child item ID when no path override matches
 *   - pathOverrides: Record<pathPrefix, childItemId> for specific paths
 *
 * @example
 * // Simple mapping: authenticate sidebar always shows 'fsa' (Full-stack Auth)
 * 'authenticate': 'fsa'
 *
 * // Path-based mapping: modular-auth sidebar shows different children based on path
 * 'modular-auth': {
 *   default: 'modular-sso',
 *   pathOverrides: {
 *     '/mcp': 'mcp',           // MCP pages show "Auth for MCP"
 *     '/directory/scim': 'modular-scim', // SCIM pages show "Modular SCIM"
 *   }
 * }
 */
export type SecondaryNavMapping =
  | string
  | {
      default: string
      pathOverrides?: Record<string, string>
    }

export const sidebarToSecondaryNav: Record<string, SecondaryNavMapping> = {
  // Main authentication sidebar → Full-stack Auth child item
  authenticate: 'fsa',

  // MCP sidebar → Auth for MCP child item
  mcp: 'mcp',

  // Modular SSO sidebar → Modular SSO child item
  'modular-sso': 'modular-sso',

  // Modular SCIM sidebar → Modular SCIM child item
  'modular-scim': 'modular-scim',

  // Agent Actions sidebar → agent-actions item (currently hidden in nav)
  connect: 'agent-actions',

  // Developer Resources sidebar → scenarios item
  'dev-kit': 'scenarios',

  // Integrations sidebar → scenarios item
  integrations: 'scenarios',

  // Events reference sidebar → api-reference parent (webhooks-events child)
  'events-reference': 'webhooks-events',
}
