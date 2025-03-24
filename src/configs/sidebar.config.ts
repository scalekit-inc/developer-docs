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
            label: 'Authenticate Users',
            link: '/coming-soon',
          },
          {
            label: 'Launch Checklist',
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
            label: 'Test SSO Integration',
            link: '/manual/fundamentals/test-sso-integration',
          },
          {
            label: 'More product guides ↗',
            link: '/guides/',
          },
          {
            label: 'Concepts',
            items: [
              {
                label: 'Users and Organizations',
                link: '/coming-soon',
              },
              {
                label: 'Sessions and Tokens',
                link: '/coming-soon',
              },
              {
                label: 'JIT Provisioning',
                link: '/coming-soon',
              },
              {
                label: 'Metadata and External IDs',
                link: '/coming-soon',
              },
              {
                label: 'Automated Role Assignment',
                link: '/coming-soon',
              },
            ],
          },
        ],
      },

      {
        label: 'Integrations',
        items: [
          {
            label: 'Auth0',
            link: '/guides/auth-systems/auth0',
          },
          {
            label: 'Cognito',
            link: '/guides/auth-systems/aws-cognito',
          },
          {
            label: 'Firebase',
            link: '/guides/auth-systems/firebase',
          },
          {
            label: 'IdP Connectors',
            link: '/guides/sso-integrations',
          },
          {
            label: 'Directory Connectors',
            link: '/guides/scim-integrations',
          },
        ],
      },
      {
        label: 'Support',
        items: [
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
            label: 'UI Events',
            link: '/reference/ui-events',
          },
          {
            label: 'Concepts',
            items: [
              {
                label: 'Pagination',
                link: '/coming-soon',
              },
            ],
          },
        ],
      },
      { label: 'SDKs', autogenerate: { directory: 'reference/sdks' } },
      {
        label: 'Webhooks',
        collapsed: true,
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
    icon: 'sun',
    items: [
      {
        label: 'Product',
        autogenerate: { directory: 'guides/product' },
      },
      {
        label: 'Social Connections',
        collapsed: true,
        autogenerate: { directory: 'guides/social-connections' },
      },
      {
        label: 'SSO Integrations',
        collapsed: true,
        autogenerate: { directory: 'guides/sso-integrations' },
      },
      {
        label: 'SCIM Integrations',
        collapsed: true,
        autogenerate: { directory: 'guides/scim-integrations' },
      },
      {
        label: 'Auth Systems',
        collapsed: true,
        autogenerate: { directory: 'guides/auth-systems' },
      },
      {
        label: 'Extended guides',
        autogenerate: { directory: 'guides/extended' },
      },
    ],
  },
];
