export const sidebar = [
  {
    label: 'Authenticate',
    id: 'authenticate',
    link: '/authenticate',
    icon: 'seti:lock',
    items: [
      {
        label: 'Getting started',
        items: ['index', 'authenticate/fsa/quickstart', 'mcp/quickstart', 'sso/quickstart'],
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
        ],
      },
      {
        label: 'API authentication',
        items: ['guides/m2m/overview', 'guides/m2m/scopes', 'guides/m2m/api-auth-m2m-clients'],
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
        ],
      },
      {
        label: 'User & organization management',
        collapsed: false,
        items: [
          'guides/user-management/scim-provisioning',
          'fsa/guides/signup-restrictions',
          'fsa/guides/user-invitations',
          'guides/user-management/manage-org-memberships',
          'fsa/guides/migration-guide',
          'fsa/guides/organization-identifiers',
          'fsa/guides/merge-identities',
          'fsa/reference/user-management-settings',
        ],
      },
      {
        label: 'Authorization',
        items: [
          'dev-kit/resources/authorization-best-practices',
          'directory/guides/group-based-role-assignment',
        ],
      },
      {
        label: 'Authentication workflows',
        items: ['authenticate/interceptors/interceptor-scenarios'],
      },
      {
        label: 'AI & agent authentication',
        items: ['mcp/intro-to-mcp-auth', 'mcp/guides/custom-auth'],
      },
      {
        label: 'Code Samples & Demos',
        items: [
          'browse/code-samples/github/api-collections',
          'browse/vids/fsa-walkthrough',
          'browse/vids/passwordless-walkthrough',
          'browse/code-samples/gists/client-credentials-auth',
          'browse/code-samples/gists/auth-code-exchange-scalekit-sdk',
          {
            label: 'Build with Next.js',
            link: '/browse/code-samples/github/nextjs-full-stack-auth',
          },
          {
            label: 'Next.js demo app',
            link: '/browse/code-samples/github/nextjs-demo-application',
          },
          {
            label: 'Build with Express.js',
            link: '/browse/code-samples/github/expressjs-example',
          },
          {
            label: 'Build with Spring Boot',
            link: '/browse/code-samples/github/spring-boot-example',
          },
          {
            label: 'Build with FastAPI',
            link: '/browse/code-samples/github/fastapi-example',
          },
          {
            label: 'Build with Go',
            link: '/browse/code-samples/github/go-example-application',
          },
          {
            label: 'Express.js login box',
            link: '/browse/code-samples/github/expressjs-login-box',
          },
          {
            label: 'Managed login demo',
            link: '/browse/code-samples/github/managed-login-box-demo',
          },
          {
            label: 'Code snippets',
            link: '/browse/code-samples/github/code-gists-collection',
          },
          'browse/vids/sso-walkthrough',
          'browse/vids/scim-walkthrough',
          'browse/vids/mcp-oauth-walkthrough',
          {
            label: 'Express.js SSO demo',
            link: '/browse/code-samples/github/expressjs-sso-demo',
          },
          {
            label: 'SSO migration guide',
            link: '/browse/code-samples/github/sso-migrations-example',
          },
          {
            label: 'OIDC & SAML examples',
            link: '/browse/code-samples/github/oidc-saml-scim-examples',
          },
          {
            label: 'Build with .NET Core',
            link: '/browse/code-samples/github/dotnet-core-examples',
          },
          {
            label: 'Embed admin portal',
            link: '/browse/code-samples/github/admin-portal-embedding',
          },
          {
            label: 'Handle webhook events',
            link: '/browse/code-samples/github/webhook-events',
          },
          {
            label: 'Firebase integration',
            link: '/browse/code-samples/github/firebase-integration',
          },
          {
            label: 'Firebase with Node.js',
            link: '/browse/code-samples/github/firebase-node-example',
          },
          {
            label: 'AWS Cognito integration',
            link: '/browse/code-samples/github/aws-cognito-integration',
          },
          {
            label: 'Cognito with Next.js',
            link: '/browse/code-samples/github/cognito-nextjs',
          },
          {
            label: 'LangChain integration',
            link: '/browse/code-samples/github/langchain-integration',
          },
          {
            label: 'Google ADK integration',
            link: '/browse/code-samples/github/google-adk-integration',
          },
          {
            label: 'Direct agent integration',
            link: '/browse/code-samples/github/direct-integration',
          },
          {
            label: 'MCP authentication',
            link: '/browse/code-samples/github/mcp-auth-demos',
          },
        ],
      },
      {
        label: 'Best practices',
        collapsed: false,
        items: [
          'guides/security/authentication-best-practices',
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
