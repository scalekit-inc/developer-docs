export const sidebar = [
  {
    label: 'Full Stack Auth',
    id: 'full-stack-auth',
    link: '/fsa/quickstart',
    icon: 'codePen',
    items: [
      {
        label: 'Getting started',
        items: ['fsa/quickstart', 'fsa/data-modelling'],
      },
      {
        label: 'Authentication',
        items: [
          'fsa/guides/implement-signup',
          'fsa/guides/implement-login',
          {
            label: 'Auth methods',
            items: [
              'fsa/guides/auth-methods',
              'fsa/guides/passwordless',
              'fsa/guides/social-logins',
              'fsa/guides/enterprise-sso',
            ],
          },
          'fsa/guides/manage-session',
          'fsa/guides/logout',
          {
            label: 'Auth logs',
            link: 'guides/dashboard/auth-logs',
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
      },
      {
        label: 'User management',
        items: [
          'fsa/guides/manage-organization',
          'fsa/guides/organization-switching',
          'fsa/reference/user-management-settings',
          'fsa/guides/user-invitations',
          // 'fsa/guides/manage-users', // TODO: is it needed? assess later
          'fsa/guides/merge-identities',
          'fsa/reference/user-profile',
          'fsa/guides/app-roles',
          {
            label: 'Redirects',
            link: 'guides/dashboard/redirects',
            attrs: { target: '_blank', rel: 'noopener' },
          },
          'fsa/guides/just-in-time-provisioning',
          'fsa/guides/allowed-email-domains',
          'fsa/guides/migration-guide',
        ],
      },
      {
        label: 'Customization',
        items: ['fsa/guides/login-page-branding', 'guides/email-providers'],
      },
      {
        label: 'Integrations',
        link: '/guides/integrations/',
        attrs: { target: '_blank', rel: 'noopener' },
      },
    ],
  },
  {
    label: 'Single Sign-On',
    link: '/sso/quickstart',
    id: 'sso',
    icon: 'seti:lock',
    items: [
      {
        label: 'Getting started',
        items: [
          'sso/guides/sso-basics',
          'sso/quickstart',
          'sso/guides/test-sso',
          'guides/sso/admin-portal',
          'sso/guides/launch-checklist',
        ],
      },
      {
        label: 'Social authentication',
        items: ['social-logins/quickstart'],
      },
      {
        label: 'Guides',
        items: [
          'guides/custom-domain',
          'sso/guides/add-login-ux-sso',
          'sso/guides/idp-init-sso',
          'sso/guides/okta-sso-test',
          'sso/guides/sso-user-attributes',
          'sso/reference/sso-integration-errors',
          {
            label: 'Redirects',
            link: 'guides/dashboard/redirects',
            attrs: { target: '_blank', rel: 'noopener' },
          },
          {
            label: 'Auth logs',
            link: 'guides/dashboard/auth-logs',
            attrs: { target: '_blank', rel: 'noopener' },
          },
          'guides/sso/sso-migration-strategy',
          {
            label: 'Coexist with',
            autogenerate: { directory: 'guides/integrations/auth-systems' },
          },
          {
            label: 'Concepts',
            items: [
              'sso/guides/authorization-url',
              'guides/idtoken-claims',
              'sso/guides/user-profile-details',
              'guides/client-credentials-practices',
            ],
          },
        ],
      },
      {
        label: 'Integrations',
        link: '/guides/integrations/sso-integrations/',
        attrs: { target: '_blank', rel: 'noopener' },
      },
    ],
  },
  {
    label: 'SCIM Provisioning',
    link: '/directory/scim/quickstart',
    icon: 'seti:folder',
    id: 'directory',
    items: [
      {
        label: 'Getting started',
        items: [
          'directory/scim/quickstart',
          'directory/code-examples',
          'directory/guides/admin-portal',
          'directory/guides/launch-checklist',
        ],
      },
      {
        label: 'Guides',
        items: [
          'directory/guides/group-based-role-assignment',
          'guides/webhooks-best-practices',
          {
            label: 'Concepts',
            items: ['directory/guides/user-provisioning-basics', 'directory/guides/scim-protocol'],
          },
        ],
      },
      {
        label: 'Integrations',
        link: '/guides/integrations',
        attrs: { target: '_blank', rel: 'noopener' },
      },
    ],
  },
  {
    label: 'Passwordless Auth',
    link: '/passwordless/quickstart',
    icon: 'email',
    id: 'passwordless',
    items: [
      {
        label: 'Getting started',
        items: ['passwordless/overview', 'passwordless/quickstart', 'passwordless/oidc'],
      },
      {
        label: 'Email customization',
        items: [
          'guides/passwordless/custom-email-provider',
          'guides/passwordless/custom-email-templates',
        ],
      },
      {
        label: 'Guides',
        items: [
          {
            label: 'View auth logs',
            link: 'guides/dashboard/auth-logs',
            attrs: { target: '_blank', rel: 'noopener' },
          },
        ],
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
        items: ['agent-actions/quickstart'],
      },
      {
        label: 'Tools',
        items: [
          'agent-actions/tools/overview',
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
          // 'agent-actions/frameworks/google-adk',
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
          { label: 'Bring your own Auth', link: 'mcp/guides/custom-auth' },
        ],
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
        items: ['guides/m2m/m2m-basics', 'guides/m2m/scopes', 'guides/m2m/api-auth-m2m-clients'],
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
  'full-stack-auth': ['/fsa/**/*'], // FSA pages not explicitly listed in sidebar
  sso: ['/sso/**/*', '/social-logins/**/*'], // SSO and social login unlisted pages
  directory: ['/directory/**/*'], // SCIM directory unlisted pages
  passwordless: ['/passwordless/**/*'], // Passwordless auth unlisted pages
  connect: ['/agent-actions/**/*'], // Agent Actions unlisted pages
  mcp: ['/guides/mcp/**/*'], // MCP Auth pages under guides
  m2m: ['/m2m/**/*', '/guides/m2m/**/*'], // M2M API auth pages
  'dev-kit': ['/dev-kit/**/*', '/guides/unlisted/passwordless-as-service'], // Developer resources
  integrations: ['/guides/integrations/**/*'], // Integration guide pages
}
