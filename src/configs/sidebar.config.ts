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
          'passwordless/oidc',
          'fsa/guides/auth-methods',
          'fsa/guides/manage-session',
          'fsa/guides/logout',
          {
            label: 'View auth logs',
            link: 'guides/dashboard/auth-logs',
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
      },
      {
        label: 'MCP Auth',
        collapsed: true,
        items: [
          'mcp/oauth',
          'mcp/overview',
          {
            label: 'Co-exist with own auth systems',
            link: 'mcp/guides/custom-auth',
          },
        ],
      },
      {
        label: 'User management',
        collapsed: true,
        items: [
          'fsa/reference/user-profile',
          'fsa/guides/just-in-time-provisioning',
          'fsa/guides/user-invitations',
          'fsa/guides/allowed-email-domains',
          'fsa/guides/organization-switching',
          'fsa/guides/app-roles',
          'fsa/reference/user-management-settings',
        ],
      },
      {
        label: 'Quickstarts',
        items: [
          'sso/quickstart',
          'social-logins/quickstart',
          'passwordless/quickstart',
          'directory/scim/quickstart',
        ],
      },
      {
        label: 'Make it your own',
        collapsed: true,
        items: [
          'guides/custom-domain',
          'fsa/guides/login-page-branding',
          'guides/email-providers',
          {
            label: 'Personalize email templates',
            link: 'guides/dashboard/custom-email-templates',
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
      },
      {
        label: 'Single Sign-on',
        collapsed: true,
        items: [
          'sso/guides/sso-user-attributes',
          'sso/guides/user-profile-details',
          'sso/guides/idp-init-sso',
          'sso/guides/test-sso',
          {
            label: 'Bring own auth systems',
            autogenerate: { directory: 'guides/integrations/auth-systems' },
          },
          'guides/sso/admin-portal',
          {
            label: 'View SSO integrations',
            link: '/guides/integrations/sso-integrations/',
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
      },
      {
        label: 'Auth methods as modules',
        collapsed: true,
        items: [
          {
            label: 'Setup social connections',
            link: '/guides/integrations/social-connections/',
            attrs: { target: '_blank', rel: 'noopener' },
          },
          'authenticate/passkeys',
        ],
      },
      {
        label: 'SCIM provisioning',
        collapsed: true,
        items: [
          'guides/webhooks-best-practices',
          'directory/guides/group-based-role-assignment',
          {
            label: 'View SCIM integrations',
            link: '/guides/integrations/scim-integrations/',
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
      },
      'authenticate/launch-checklist',
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
    ],
  },
  {
    label: 'Developer Resources',
    id: 'dev-kit',
    link: '/dev-kit/',
    icon: 'seti:powershell',
    items: [
      {
        label: 'SDKs',
        items: ['dev-kit/sdks/overview'],
      },
      {
        label: 'Code Samples',
        link: '/dev-kit/code-samples',
      },
      {
        label: 'Webhooks',
        autogenerate: { directory: 'reference/webhooks' },
      },
      {
        label: 'Guides',
        items: [
          'guides/dashboard/custom-email-templates',
          'guides/setup-scalekit',
          'dev-kit/resources/ai-assisted-setup',
          'guides/external-ids-and-metadata',
          'guides/dashboard/redirects',
          'guides/dashboard/auth-logs',
        ],
      },
      {
        label: 'Reference',
        items: ['reference/admin-portal/ui-events', 'reference/glossary'],
      },
      {
        label: 'Development Tools',
        items: [
          'dev-kit/mcp',
          {
            label: 'Postman collections',
            link: 'https://github.com/scalekit-inc/api-collections',
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
      },
      {
        label: 'Support',
        items: [
          'support/contact-us',
          {
            label: 'Release Notes',
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
    label: 'Win with Scalekit',
    id: 'win-with-scalekit',
    link: '/win-with-scalekit',
    icon: 'rocket',
    items: [
      {
        label: 'User authentication',
        collapsed: true,
        items: [
          'fsa/guides/implement-signup',
          'fsa/guides/implement-login',
          'fsa/guides/manage-session',
          'fsa/guides/logout',
        ],
      },
      {
        label: 'How to…',
        items: [
          'fsa/guides/merge-identities',
          'guides/dashboard/redirects',
          'fsa/guides/migration-guide',
          'guides/client-credentials-practices',
          'win-with-scalekit/oauth-driven-sso',
          'win-with-scalekit/passwordless-auth-methods',
          'directory/guides/user-provisioning-basics',
          'directory/guides/scim-protocol',
        ],
      },
      {
        label: 'What is/are…',
        items: [
          'win-with-scalekit/passwordless-methods',
          'guides/idtoken-claims',
          'sso/guides/authorization-url',
          'win-with-scalekit/scalekit-connections',
        ],
      },
      {
        label: 'Set up SSO',
        items: [
          'sso/guides/sso-basics',
          'sso/guides/add-login-ux-sso',
          'sso/guides/okta-sso-test',
          'sso/reference/sso-integration-errors',
        ],
      },
      {
        label: 'Co-exist auth with…',
        autogenerate: { directory: 'guides/integrations/auth-systems' },
      },
      {
        label: 'Setup social logins with…',
        autogenerate: { directory: 'guides/integrations/social-connections' },
      },
      {
        label: 'Best practices',
        items: ['guides/client-credentials-practices', 'guides/webhooks-best-practices'],
      },
      {
        label: 'API Authentication (M2M)',
        items: [
          'guides/m2m/overview',
          'm2m/quickstart',
          'guides/m2m/m2m-basics',
          'guides/m2m/scopes',
          'guides/m2m/api-auth-m2m-clients',
          {
            label: 'Code examples',
            link: 'https://github.com/scalekit-inc/gists/tree/main/m2m',
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
        label: 'SSO integrations',
        autogenerate: { directory: 'guides/integrations/sso-integrations' },
      },
      {
        label: 'SCIM integrations',
        autogenerate: { directory: 'guides/integrations/scim-integrations' },
      },
      {
        label: 'Social connections',
        autogenerate: {
          directory: 'guides/integrations/social-connections',
        },
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
    '/guides/integrations/index',
    '/home/guides/**/*',
    '/home/guides/admin-portal',
    '/home/**/*',
  ],
  // Associate unlisted pages with their respective topic sidebars
  authenticate: [
    '/authenticate/**/*',
    '/fsa/**/*',
    '/sso/**/*',
    '/social-logins/**/*',
    '/passwordless/**/*',
    '/directory/**/*',
    '/mcp/**/*',
    '/guides/mcp/**/*',
    '/guides/sso/**/*',
    '/guides/passwordless/**/*',
    '/guides/directory/**/*',
    '/guides/dashboard/**/*',
  ], // All auth-related pages
  connect: ['/agent-actions/**/*'], // Agent Actions pages
  'win-with-scalekit': ['/win-with-scalekit/**/*', '/m2m/**/*', '/guides/m2m/**/*'], // Win with Scalekit pages including M2M
  'dev-kit': ['/dev-kit/**/*', '/guides/unlisted/passwordless-as-service'], // Developer resources
  integrations: ['/guides/integrations/**/*'], // Integration guide pages
}
