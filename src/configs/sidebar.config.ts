export const sidebar = [
  {
    label: 'Manual',
    id: 'manual',
    link: '/manual/getting-started/',
    icon: 'open-book',
    items: [
      {
        label: 'Quickstarts',
        collapsed: false,
        items: [
          {
            label: 'Installation',
            link: 'manual/getting-started/installation',
          },
          'manual/sso-quickstart',
          'manual/scim-quickstart',
          'manual/social-logins-quickstart',
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
            label: 'Launch Checklist',
            link: '/manual/fundamentals/launch-checklist',
          },
          {
            label: 'More product guides',
            link: '/guides/',
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
    icon: 'starlight',
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
        ],
      },
      { label: 'SDKs', autogenerate: { directory: 'reference/sdks' } },
      {
        label: 'Webhooks',
        autogenerate: { directory: 'reference/webhooks' },
      },
      {
        label: 'Errors',
        autogenerate: { directory: 'reference/errors' },
      },
    ],
  },
  {
    label: 'Guides',
    link: '/guides/',
    icon: 'puzzle',
    items: [
      {
        label: 'Social Connections',
        autogenerate: { directory: 'guides/social-connections' },
      },
      {
        label: 'SSO Integrations',
        autogenerate: { directory: 'guides/sso-integrations' },
      },
      {
        label: 'SCIM Integrations',
        autogenerate: { directory: 'guides/scim-integrations' },
      },
      {
        label: 'Auth Systems',
        autogenerate: { directory: 'guides/auth-systems' },
      },
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
];
