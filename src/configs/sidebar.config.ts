export const sidebar = [
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
            label: 'Authenticate users',
            link: '/manual/getting-started/authenticate-users',
          },
          {
            label: 'Manage user sessions',
            link: '/manual/getting-started/manage-user-sessions',
          },
          {
            label: 'Customize',
            link: '/coming-soon',
          },
          {
            label: 'Launch',
            link: '/manual/fundamentals/launch-checklist',
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
            label: 'Users and Organizations',
            link: '/coming-soon',
          },
          {
            label: 'JIT Provisioning',
            link: '/coming-soon',
          },
          {
            label: 'Organization Memberships',
            link: '/coming-soon',
          },
          {
            label: 'Organization Policies',
            link: '/coming-soon',
          },
          {
            label: 'Emails',
            link: '/coming-soon',
          },
          {
            label: 'SSO',
            collapsed: true,
            items: [
              {
                label: 'Test SSO Integration',
                link: '/manual/fundamentals/test-sso-integration',
              },
              {
                label: 'Sessions and Tokens',
                link: '/coming-soon',
              },
            ],
          },
          {
            label: 'Directory',
            collapsed: true,
            items: [
              {
                label: 'Setup up Provisioning',
                link: '/coming-soon',
              },
              {
                label: 'Test SCIM Integration',
                link: '/coming-soon',
              },
              {
                label: 'Groups and Roles',
                link: '/coming-soon',
              },
            ],
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
            label: 'API Collections',
            link: 'https://github.com/scalekit-developers/api-collections',
          },
          {
            label: 'Glossary',
            link: '/manual/support/glossary',
          },
          {
            label: 'Chat with us!',
            link: '/manual/support/contact-us',
          },
          {
            label: 'Status Page',
            link: 'https://scalekit.statuspage.io/',
          },
        ],
      },
    ],
  },
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
            link: '/apis-scalar',
          },
          {
            label: 'Authenticate Scalekit API',
            link: '/reference/concepts/authenticate-scalekit-api',
          },
          {
            label: 'User auth endpoints',
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
        collapsed: true,
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
