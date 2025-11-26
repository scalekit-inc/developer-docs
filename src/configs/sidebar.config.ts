import { makeChangelogsSidebarLinks } from 'starlight-changelogs'
import { createDivider, createSectionHeader } from './sidebar-utils'

export const sidebar = [
  {
    label: 'Authenticate',
    id: 'authenticate',
    link: '/authenticate',
    icon: 'seti:lock',
    items: [
      'index',
      {
        label: 'Getting started',
        items: [
          { label: 'Quickstart: Complete Auth', link: 'authenticate/fsa/quickstart' },
          { label: 'Quickstart: Modular SSO', link: 'sso/quickstart' },
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
        label: 'MCP authentication',
        items: [
          'mcp/quickstart',
          'authenticate/mcp/fastmcp-quickstart',
          'mcp/auth-methods/custom-auth',
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
        label: 'Add auth modules',
        items: [
          { label: 'Add Modular SSO', link: 'authenticate/sso/add-modular-sso' },
          'passwordless/quickstart',
          'guides/user-auth/modular-social-logins',
          'directory/scim/quickstart',
          'authenticate/m2m/api-auth-quickstart',
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
      {
        label: 'View all integrations',
        link: 'guides/integrations',
        badge: {
          text: '25+',
          variant: 'tip',
        },
        attrs: { target: '_blank', rel: 'noopener' },
      },
      createDivider(),
      {
        label: 'User authentication',
        items: [
          'fsa/guides/implement-signup',
          'guides/dashboard/redirects',
          'guides/user-auth/login-scenarios',
          'guides/user-auth/preserve-intended-destination',
          'guides/security/csrf-protection',
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
        label: 'MCP authentication',
        items: [
          'mcp/intro-to-mcp-auth',
          'authenticate/mcp/auth-patterns',
          'authenticate/mcp/fastapi-fastmcp-quickstart',
          'authenticate/mcp/expressjs-quickstart',
          'mcp/troubleshooting',
        ],
      },
      {
        label: 'API authentication',
        items: ['guides/m2m/overview', 'guides/m2m/scopes', 'guides/m2m/api-auth-m2m-clients'],
      },
      {
        label: 'Enterprise SSO',
        items: [
          'sso/guides/sso-basics',
          'guides/user-auth/check-sso-domain',
          'sso/guides/authorization-url',
          'sso/guides/add-login-ux-sso',
          'sso/guides/idp-init-sso',
          'sso/guides/sso-user-attributes',
          'sso/guides/test-sso',
        ],
      },
      {
        label: 'SCIM Provisioning',
        items: [
          'directory/guides/user-provisioning-basics',
          'directory/guides/scim-protocol',
          'guides/user-management/scim-provisioning',
        ],
      },
      {
        label: 'Onboard an enterprise',
        items: ['fsa/guides/onboard-enterprise-customers', 'guides/admin-portal'],
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
  mcp: [], // MCP pages are in dev-kit sidebar (via the dev-kit topic)
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
    // SSO guides that appear in dev-kit sidebar
    '/sso/guides/authorization-url',
    '/sso/guides/sso-user-attributes',
    '/sso/guides/add-login-ux-sso',
    '/sso/guides/idp-init-sso',
    '/sso/guides/test-sso',
    '/sso/guides/sso-basics',
    '/sso/guides/sso-migration-strategy',
    // Directory/SCIM guides
    '/directory/guides/user-provisioning-basics',
    '/directory/guides/scim-protocol',
    '/directory/guides/group-based-role-assignment',
    // MCP guides that appear in dev-kit
    '/mcp/**/*',
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
 * Secondary navigation mapping for top navigation bar
 * Maps sidebar topics to their corresponding secondary nav items
 *
 * This mapping determines which secondary nav item should be highlighted
 * based on which sidebar topic is active for the current page.
 */
export const topicToSecondaryNav: Record<string, string> = {
  authenticate: 'authenticate',
  connect: 'agent-actions',
  'dev-kit': 'scenarios', // Dev-kit pages show "Scenarios" in secondary nav
  integrations: 'scenarios', // Integration pages also show "Scenarios"
  'events-reference': 'webhooks-events', // Events pages map to Events child
  'rest-apis': 'rest-apis', // REST API pages map to REST APIs child
  // Note: Some topics may not have a secondary nav item (they won't highlight anything)
}

/**
 * Secondary navigation mapping with explicit patterns for direct URL matching
 * This is used as a fallback when a page doesn't match any topic
 *
 * Priority levels (higher number = higher priority):
 * - 100: Most specific paths (Agent Actions)
 * - 80: API Reference and Events
 * - 60: Examples and Dev Resources
 * - 40: Authenticate (catch-all, lowest priority)
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
      '/mcp',
      '/fsa',
      '/sso',
      '/guides/sso',
      '/social-logins',
      '/passwordless',
      '/guides/passwordless',
      '/directory',
      '/guides/directory',
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
