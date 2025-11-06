export const sidebar = [
  {
    label: 'Authenticate',
    id: 'authenticate',
    link: '/authenticate',
    icon: 'seti:lock',
    items: [
      'index',
      {
        label: 'Quickstarts',
        items: ['authenticate/fsa/quickstart', 'mcp/quickstart', 'sso/quickstart'],
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
        label: 'Standalone auth modules',
        items: [
          'passwordless/quickstart',
          'guides/user-auth/standalone-social-logins',
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
          'browse/code-samples/agent-framework-examples',
        ],
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
    label: 'MCP Auth',
    link: '/guides/mcp/overview',
    id: 'mcp',
    icon: 'seti:puppet',
    items: [
      {
        label: 'Getting started',
        items: [
          'mcp/overview',
          'mcp/oauth',
          { label: 'Troubleshooting Guide', link: 'mcp/troubleshooting' },
          { label: 'Bring your own Auth', link: 'mcp/guides/custom-auth' },
        ],
      },
      {
        label: 'Integrations',
        items: [{ label: 'FastMCP', link: 'mcp/integrations/fastmcp' }],
      },
    ],
  },
  {
    label: 'API Auth',
    link: '/m2m/quickstart',
    id: 'm2m',
    icon: 'seti:crystal_embedded',
    items: [
      {
        label: 'Getting started',
        items: [
          'guides/m2m/overview',
          'm2m/quickstart',
          {
            label: 'Code examples',
            link: 'https://github.com/scalekit-inc/gists/tree/main/m2m',
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
      },
      {
        label: 'Guides',
        items: [
          'guides/m2m/m2m-basics',
          'guides/m2m/scopes',
          'guides/m2m/api-auth-m2m-clients',
          {
            label: 'Interceptors',
            link: '/guides/auth-flow-interceptors',
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
      },
    ],
  },
  {
    label: 'Developer Resources',
    id: 'dev-kit',
    link: '/dev-kit/',
    icon: 'seti:powershell',
    items: [
      {
        label: 'Setup dev environment',
        items: [
          'authenticate/installation',
          'dev-kit/mcp',
          'dev-kit/resources/ai-assisted-setup',
          'browse/code-samples/github/api-collections',
        ],
      },
      {
        label: 'Basics',
        items: [
          'sso/guides/authorization-url',
          'guides/dashboard/allowed-callback-url',
          {
            label: 'Claims',
            items: ['guides/idtoken-claims', 'guides/accesstoken-claims'],
          },
        ],
      },
      {
        label: 'User authentication',
        items: [
          'fsa/guides/implement-signup',
          'guides/dashboard/intitate-login-endpoint',
          'guides/user-auth/login-scenarios',
          'guides/dashboard/redirects',
          {
            label: 'Code samples',
            items: [
              'browse/code-samples/cognito-examples',
              'browse/code-samples/full-stack-auth-examples',
              'browse/code-samples/hosted-login-examples',
              'browse/code-samples/gists/auth-code-exchange-scalekit-sdk',
              'browse/vids/fsa-walkthrough',
              'browse/vids/passwordless-walkthrough',
            ],
          },
        ],
      },
      {
        label: 'API authentication',
        items: [
          'guides/m2m/overview',
          'guides/m2m/scopes',
          'guides/m2m/api-auth-m2m-clients',
          {
            label: 'Code samples',
            items: ['browse/code-samples/gists/client-credentials-auth'],
          },
        ],
      },
      {
        label: 'MCP authentication',
        items: ['mcp/intro-to-mcp-auth', 'mcp/guides/custom-auth'],
      },
      {
        label: 'Code samples',
        items: ['browse/vids/mcp-oauth-walkthrough', 'browse/code-samples/github/mcp-auth-demos'],
      },
      {
        label: 'Enterprise authentication',
        items: [
          {
            label: 'SSO',
            items: [
              'sso/guides/sso-basics',
              'sso/guides/add-login-ux-sso',
              'guides/user-auth/check-sso-domain',
              'sso/guides/sso-user-attributes',
              'sso/guides/idp-init-sso',
              'sso/guides/test-sso',
            ],
          },
          {
            label: 'SCIM',
            items: ['directory/guides/user-provisioning-basics', 'directory/guides/scim-protocol'],
          },
          'guides/admin-portal',
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
          {
            label: 'Code samples',
            items: [
              'browse/code-samples/github/admin-portal-embedding',
              'browse/code-samples/sso-examples',
              'browse/code-samples/github/sso-migrations-example',
              'browse/code-samples/firebase-examples',
              'browse/vids/sso-walkthrough',
              'browse/vids/scim-walkthrough',
            ],
          },
        ],
      },
      {
        label: 'Organizations and users',
        collapsed: false,
        items: [
          'fsa/guides/signup-restrictions',
          'fsa/guides/user-invitations',
          'guides/user-management/scim-provisioning',
          'fsa/guides/merge-identities',
          'fsa/reference/user-management-settings',
        ],
      },
      {
        label: 'Authorization',
        items: ['directory/guides/group-based-role-assignment'],
      },
      {
        label: 'Migrations',
        items: ['fsa/guides/migration-guide'],
      },
      {
        label: 'Customize',
        items: [
          'fsa/guides/organization-identifiers',
          'authenticate/interceptors/interceptor-scenarios',
          {
            label: 'Code samples',
            items: ['browse/code-samples/github/webhook-events'],
          },
        ],
      },
      {
        label: 'Best practices',
        collapsed: false,
        items: [
          'guides/security/authentication-best-practices',
          'dev-kit/resources/authorization-best-practices',
          'guides/security/csrf-protection',
          'guides/client-credentials-practices',
          'guides/webhooks-best-practices',
          'guides/user-auth/preserve-intended-destination',
          'guides/user-auth/external-id-system-integration',
        ],
      },
      {
        label: 'Support & resources',
        items: [
          'reference/glossary',
          'support/contact-us',
          {
            label: 'Release notes',
            link: 'https://www.scalekit.com/product-updates',
            attrs: { target: '_blank', rel: 'noopener' },
          },
          {
            label: 'Status',
            link: 'https://scalekit.statuspage.io/',
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
      },
    ],
  },
  {
    label: 'Events Reference',
    id: 'events-reference',
    link: '/reference/webhooks/overview/',
    icon: 'seti:event',
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
    '/reference/**/*', // Keep reference docs excluded
    '/guides/integrations', // Exclude integrations overview from sidebar
  ],
  // Associate unlisted pages with their respective topic sidebars
  authenticate: [
    '/authenticate/**/*',
    '/fsa/**/*',
    '/mcp/**/*',
    '/sso/**/*',
    '/directory/**/*',
    '/guides/mcp/**/*',
    '/guides/sso/**/*',
    '/guides/dashboard/**/*',
    '/guides/custom-domain',
    '/guides/email-providers',
    '/authenticate/interceptors/**/*',
    '/guides/user-auth/standalone-social-logins', // Standalone social logins appears in Authenticate sidebar
  ], // Pages that appear in Authenticate sidebar
  connect: ['/agent-actions/**/*'], // Agent Actions pages
  mcp: [], // MCP pages are in authenticate sidebar, so they use authenticate topic
  m2m: ['/m2m/**/*', '/guides/m2m/**/*'], // M2M API auth pages
  'dev-kit': [
    '/dev-kit/**/*',
    '/examples',
    '/passwordless/**/*',
    '/social-logins/**/*',
    '/guides/passwordless/**/*',
    '/authenticate/interceptors/interceptor-scenarios',
    '/guides/dashboard/redirects',
    '/guides/external-ids-and-metadata',
    '/guides/idtoken-claims',
    '/guides/accesstoken-claims',
    '/guides/unlisted/passwordless-as-service',
    '/browse/**/*', // Code samples and videos
    '/guides/user-auth/**/*', // User auth guides and examples
    '/guides/security/**/*', // Security best practices
    '/guides/m2m/**/*', // M2M authentication guides
    // Specific FSA implementation guides that appear in dev-kit sidebar
    '/fsa/guides/implement-signup',
    '/fsa/guides/login-page-branding',
    '/fsa/guides/signup-restrictions',
    '/fsa/guides/user-invitations',
    '/authenticate/manage-users-orgs/custom-user-attributes',
    '/fsa/guides/app-roles',
    '/authenticate/manage-users-orgs/create-organization',
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
  'dev-kit': 'examples', // Dev-kit pages show "Examples" in secondary nav
  integrations: 'examples', // Integration pages also show "Examples"
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
      '/guides/dashboard',
      '/guides/user-auth',
      '/guides/security',
      '/guides/user-management',
      '/m2m',
      '/guides/m2m',
    ],
  },
  'agent-actions': {
    id: 'agent-actions',
    priority: 100,
    patterns: ['/agent-actions'],
  },
  examples: {
    id: 'examples',
    priority: 60,
    patterns: [
      '/examples',
      '/browse',
      '/dev-kit',
      '/authenticate/interceptors/interceptor-scenarios',
      '/guides/dashboard/redirects',
      '/guides/external-ids-and-metadata',
      '/guides/client-credentials-practices',
      '/guides/webhooks-best-practices',
      '/guides/idtoken-claims',
      '/guides/accesstoken-claims',
      '/guides/integrations',
    ],
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
