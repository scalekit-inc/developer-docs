export const sidebar = [
  {
    label: 'Authenticate',
    id: 'authenticate',
    link: '/authenticate',
    icon: 'seti:lock',
    items: [
      {
        label: 'Getting started',
        items: ['index', 'authenticate/installation', 'fsa/quickstart'],
      },
      {
        label: 'User authentication',
        collapsed: false,
        items: [
          'fsa/guides/implement-login',
          'fsa/choose-login-methods',
          'fsa/guides/handle-redirections',
          'fsa/guides/manage-session',
          'fsa/guides/logout',
        ],
      },
      {
        label: 'Manage organizations',
        collapsed: false,
        items: [
          'fsa/data-modelling',
          'fsa/guides/create-organization',
          'fsa/guides/organization-settings',
          'fsa/guides/organization-identifiers',
        ],
      },
      {
        label: 'Manage users',
        collapsed: false,
        items: [
          'fsa/guides/manage-users',
          'fsa/guides/custom-user-attributes',
          'authenticate/manage-organizations/add-users-to-organization',
          'fsa/guides/organization-switching',
        ],
      },
      {
        label: 'Authorization',
        collapsed: false,
        items: [
          'authenticate/authz/overview',
          'authenticate/authz/create-permissions',
          'fsa/guides/app-roles',
          'authenticate/authz/implement-access-control',
        ],
      },
      {
        label: 'Customize workflows',
        items: [
          'guides/auth-flow-interceptors',
          'authenticate/implement-workflows/listen-to-webhooks',
        ],
      },
      {
        label: 'MCP Auth',
        collapsed: false,
        items: ['mcp/intro-to-mcp-auth', 'mcp/oauth', 'mcp/guides/custom-auth'],
      },
      {
        label: 'Customize',
        collapsed: false,
        items: [
          'guides/custom-domain',
          'fsa/guides/login-page-branding',
          'guides/email-providers',
          'guides/dashboard/custom-email-templates',
        ],
      },
      {
        label: 'Deploy',
        items: ['authenticate/launch-checklist'],
      },
      {
        label: 'Observability',
        items: ['guides/dashboard/auth-logs'],
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
        label: 'Enterprise Auth',
        items: [
          'sso/quickstart',
          'sso/guides/sso-user-attributes',
          'directory/scim/quickstart',
          'directory/guides/group-based-role-assignment',
          'guides/sso/admin-portal',
          {
            label: 'View all integrations',
            link: 'guides/integrations',
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
      },
      {
        label: 'User management',
        collapsed: false,
        items: [
          'fsa/guides/signup-restrictions',
          'fsa/guides/user-invitations',
          'fsa/guides/allowed-email-domains',
          'fsa/guides/just-in-time-provisioning',
        ],
      },
      {
        label: 'Rapid development tools',
        items: [
          'dev-kit/mcp',
          'dev-kit/resources/ai-assisted-setup',
          'dev-kit/sdks/overview',
          {
            label: 'Code samples',
            link: '/dev-kit/code-samples',
          },
          {
            label: 'Postman collections',
            link: 'https://github.com/scalekit-inc/api-collections',
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
      },
      {
        label: 'Authentication implementation',
        collapsed: false,
        items: [
          'fsa/guides/auth-methods',
          'fsa/guides/implement-signup',
          'fsa/guides/implement-login',
          'passwordless/oidc',
          'passwordless/quickstart',
          'social-logins/quickstart',
          'guides/interceptor-scenarios',
          'guides/dashboard/redirects',
          {
            label: 'MCP Auth',
            collapsed: false,
            items: ['mcp/overview', 'mcp/oauth', 'mcp/guides/custom-auth'],
          },
          'fsa/guides/migration-guide',
        ],
      },
      {
        label: 'User & organization management',
        collapsed: false,
        items: [
          'fsa/data-modelling',
          'fsa/guides/merge-identities',
          'fsa/guides/allowed-email-domains',
          'fsa/guides/just-in-time-provisioning',
          'fsa/reference/user-management-settings',
        ],
      },
      {
        label: 'Enterprise features',
        collapsed: false,
        items: [
          {
            label: 'Set up SSO',
            items: [
              'sso/guides/sso-basics',
              'fsa/guides/enterprise-sso',
              'sso/guides/add-login-ux-sso',
              'sso/guides/test-sso',
              'sso/guides/idp-init-sso',
            ],
          },
          {
            label: 'Enable user provisioning',
            items: [
              'directory/guides/user-provisioning-basics',
              'directory/guides/scim-protocol',
              {
                label: 'View SCIM integrations',
                link: '/guides/integrations/scim-integrations/',
                attrs: { target: '_blank', rel: 'noopener' },
              },
            ],
          },
        ],
      },
      {
        label: 'Best practices',
        collapsed: false,
        items: [
          'guides/security/authentication-security',
          'dev-kit/resources/authorization-best-practices',
          'guides/client-credentials-practices',
          'guides/webhooks-best-practices',
          'authenticate/launch-checklist',
          'guides/idtoken-claims',
          'sso/guides/authorization-url',
        ],
      },
      {
        label: 'Reference',
        items: [
          {
            label: 'Webhooks',
            autogenerate: { directory: 'reference/webhooks' },
          },
          'reference/admin-portal/ui-events',
          'reference/glossary',
        ],
      },
      {
        label: 'Support & resources',
        items: [
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
    '/guides/auth-flow-interceptors',
  ], // Pages that appear in Authenticate sidebar
  connect: ['/agent-actions/**/*'], // Agent Actions pages
  mcp: [], // MCP pages are in authenticate sidebar, so they use authenticate topic
  m2m: ['/m2m/**/*', '/guides/m2m/**/*'], // M2M API auth pages
  'dev-kit': [
    '/dev-kit/**/*',
    '/win-with-scalekit',
    '/win-with-scalekit/**/*',
    '/passwordless/**/*',
    '/social-logins/**/*',
    '/guides/passwordless/**/*',
    '/guides/interceptor-scenarios',
    '/guides/dashboard/redirects',
    '/guides/external-ids-and-metadata',
    '/guides/client-credentials-practices',
    '/guides/webhooks-best-practices',
    '/guides/idtoken-claims',
    '/guides/unlisted/passwordless-as-service',
  ], // Developer resources and implementation guides
  integrations: ['/guides/integrations/**/*'], // Integration guide pages
}
