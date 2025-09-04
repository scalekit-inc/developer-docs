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
          'guides/dashboard/auth-logs',
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
          'guides/dashboard/redirects',
          'fsa/guides/signup-restrictions',
          'fsa/guides/just-in-time-provisioning',
          'fsa/guides/allowed-email-domains',
          'fsa/guides/migration-guide',
        ],
      },
      {
        label: 'Customization',
        items: ['fsa/guides/login-page-branding', 'guides/email-providers'],
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
        items: [
          'social-logins/quickstart',
          {
            label: 'connections',
            collapsed: false,
            autogenerate: {
              directory: 'guides/integrations/social-connections',
            },
          },
        ],
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
          'guides/dashboard/redirects',
          'guides/dashboard/auth-logs',
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
        items: ['guides/dashboard/auth-logs'],
      },
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
          'guides/mcp/overview',
          'guides/mcp/oauth',
          { label: 'Bring your own Auth', link: 'guides/mcp/custom-auth' },
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
    label: 'SDKs & APIs',
    id: 'dev-kit',
    link: '/dev-kit/',
    icon: 'seti:powershell',
    items: [
      {
        label: 'SDKs',
        items: [
          {
            label: 'Node.js SDK',
            link: 'https://github.com/scalekit-inc/scalekit-sdk-node',
            attrs: { target: '_blank', rel: 'noopener' },
          },
          {
            label: 'Python SDK',
            link: 'https://github.com/scalekit-inc/scalekit-sdk-python',
            attrs: { target: '_blank', rel: 'noopener' },
          },
          {
            label: 'Go SDK',
            link: 'https://github.com/scalekit-inc/scalekit-sdk-go',
            attrs: { target: '_blank', rel: 'noopener' },
          },
          {
            label: 'Java SDK',
            link: 'https://github.com/scalekit-inc/scalekit-sdk-java',
            attrs: { target: '_blank', rel: 'noopener' },
          },
          {
            label: 'Community',
            items: [
              {
                label: 'PHP SDK',
                link: 'https://github.com/pawan1793/scalekit-php-sdk',
                attrs: { target: '_blank', rel: 'noopener' },
              },
            ],
          },
        ],
      },
      {
        label: 'Webhooks',
        autogenerate: { directory: 'reference/webhooks' },
      },
      {
        label: 'Guides',
        items: ['guides/dashboard/redirects', 'guides/dashboard/auth-logs'],
      },
      {
        label: 'Reference',
        items: [
          {
            label: 'REST API reference',
            link: '/apis',
            attrs: { target: '_blank', rel: 'noopener' },
          },
          'reference/admin-portal/ui-events',
          'reference/glossary',
        ],
      },
      {
        label: 'Development Tools',
        items: [
          'dev-kit/mcp',
          'dev-kit/resources/ai-assisted-setup',
          {
            label: 'Postman collections',
            link: 'https://github.com/scalekit-inc/api-collections',
            attrs: { target: '_blank', rel: 'noopener' },
          },
          {
            label: 'Code examples',
            link: 'https://github.com/scalekit-inc/gists',
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
    ],
  },
]

export const topics = {
  exclude: [
    '/', // Exclude root path
    '/index', // Exclude index by name
    '/guides/integrations',
    '/guides/integrations/index', // Exclude the integrations overview page from sidebar
    '/home/guides/**/*',
    '/home/guides/admin-portal',
    '/home/**/*',
    '/guides/setup-scalekit',
    '/guides/external-ids-and-metadata',
    '/guides/mcp/additional-reading',
  ],
  'dev-kit': ['/dev-kit/**/*', '/guides/unlisted/passwordless-as-service'], // Include all dev-kit pages
  integrations: ['/guides/integrations/**/*'], // Associate all integration pages with the integrations topic
  'full-stack-auth': ['/fsa/**/*'], // Associate all fsa pages with the full-stack-auth topic
}
