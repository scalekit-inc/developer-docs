export const sidebar = [
  {
    label: 'Start',
    link: '/home/quickstart',
    id: 'start',
    icon: 'rocket',
    items: [
      {
        label: 'Getting Started',
        items: [
          {
            label: 'Quickstart',
            link: '/home/quickstart',
          },
          {
            label: 'Model your data',
            link: '/home/model-your-data',
          },
          {
            label: 'Sign up',
            link: '/home/sign-up',
          },
          {
            label: 'Sign out',
            link: '/home/sign-out',
          },
        ],
      },
    ],
  },
  /* Remove this sidebar for migration release
  {
    label: 'Manual',
    id: 'manual',
    link: '/manual/getting-started/',
    icon: 'open-book',
    items: [
      {
        label: 'Getting Started',
        items: [
          {
            label: 'Installation',
            link: 'manual/getting-started/installation',
          },
          {
            label: 'Sign in users',
            link: '/manual/getting-started/authenticate-users',
          },
          {
            label: 'Manage sessions',
            link: '/manual/getting-started/manage-user-sessions',
          },
          {
            label: 'Manage users',
            link: '/manual/getting-started/manage-users',
          },
          {
            label: 'Sign out users',
            link: '/manual/getting-started/sign-out',
          },
          {
            label: 'Code examples',
            link: '/manual/support/code-examples-catalog',
          },
        ],
      },
      {
        label: 'Quickstarts',
        collapsed: false,
        items: [
          'manual/social-logins-quickstart',
          'manual/sso-quickstart',
          'manual/scim-quickstart',
          'manual/quickstarts/m2m',
          {
            label: 'Launch',
            link: '/manual/fundamentals/launch-checklist',
          },
        ],
      },
      {
        label: 'Fundamentals',
        items: [
          {
            label: 'Admin Portal',
            link: '/manual/fundamentals/admin-portal',
          },
          {
            label: 'IdP Simulator',
            link: '/manual/fundamentals/test-sso-integration',
          },
          {
            label: 'Automatically assign roles',
            link: '/manual/fundamentals/group-based-role-assignment',
          },
          {
            label: 'More product guides ↗',
            link: '/guides/',
          },
        ],
      },
      {
        label: 'Resources',
        items: [
          {
            label: 'API collections',
            link: 'https://github.com/scalekit-developers/api-collections',
          },
          {
            label: 'Release notes',
            link: 'https://www.scalekit.com/product-updates',
          },
          {
            label: 'Chat with us!',
            link: '/manual/support/contact-us',
          },
          {
            label: 'Glossary',
            link: '/manual/support/glossary',
          },
          {
            label: 'Status Page',
            link: 'https://scalekit.statuspage.io/',
          },
        ],
      },
    ],
  },
  */
  {
    label: 'Reference',
    id: 'reference',
    link: '/reference/',
    icon: 'document',
    items: [
      {
        label: 'API',
        items: [
          {
            label: 'REST APIs ↗',
            link: '/apis',
          },
          {
            label: 'API Authentication',
            link: '/reference/api-catalog/authenticate-scalekit-api',
          },
          {
            label: 'User authentication',
            link: '/reference/concepts/auth-endpoints',
          },
          {
            label: 'UI events',
            link: '/reference/api-catalog/ui-events',
          },
        ],
      },
      {
        label: 'Concepts',
        items: [
          {
            label: 'Custom identifiers & data',
            link: '/reference/concepts/external-ids-and-metadata',
          },
          {
            label: 'JSON Web Key Sets',
            link: '/reference/concepts/jwks',
          },
          {
            label: 'Normalized user profile',
            link: '/reference/concepts/normalized-user-profile',
          },
          {
            label: 'Pagination',
            link: '/reference/concepts/pagination',
          },
        ],
      },
      { label: 'SDKs', autogenerate: { directory: 'reference/sdks' } },
      {
        label: 'Webhooks',
        autogenerate: { directory: 'reference/webhooks' },
      },
      {
        label: 'Errors',
        collapsed: false,
        autogenerate: { directory: 'reference/errors' },
      },
    ],
  },
  {
    label: 'Guides',
    link: '/guides/',
    id: 'guides',
    icon: 'sun',
    items: [
      {
        label: 'Product',
        autogenerate: { directory: 'guides/product' },
      },
      {
        label: 'Extended guides',
        autogenerate: { directory: 'guides/extended' },
      },
    ],
  },
  {
    label: 'Integrations',
    link: '/integrations/',
    id: 'integrations',
    icon: 'puzzle',
    items: [
      {
        label: 'Social Connections',
        collapsed: true,
        autogenerate: { directory: 'integrations/social-connections' },
      },
      {
        label: 'SSO Integrations',
        collapsed: true,
        autogenerate: { directory: 'integrations/sso-integrations' },
      },
      {
        label: 'SCIM Integrations',
        collapsed: true,
        autogenerate: { directory: 'integrations/scim-integrations' },
      },
      {
        label: 'Auth Systems',
        collapsed: true,
        autogenerate: { directory: 'integrations/auth-systems' },
      },
    ],
  },
];
