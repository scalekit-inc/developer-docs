export const sidebar = [
  {
    label: 'Start',
    link: '/',
    id: 'start',
    icon: 'rocket',
    items: [
      {
        label: 'Getting Started',
        items: [
          {
            label: '👋 Welcome to Scalekit',
            link: '/',
          },
          {
            label: '🛠️ Installation',
            link: '/home/setup-scalekit',
          },
          {
            label: 'Authentication',
            items: [
              'home/getting-started/authentication/social-logins-quickstart',
              'home/getting-started/authentication/sso-quickstart',
              'home/getting-started/authentication/m2m-quickstart',
            ],
          },
          {
            label: 'User Management',
            items: ['home/getting-started/user-management/scim-quickstart'],
          },
          {
            label: '⚙️ Admin Portal',
            link: '/home/getting-started/admin-portal',
          },
          {
            label: '📋 Launch checklist',
            link: '/home/getting-started/launch-checklist',
          },
        ],
      },
      {
        label: 'Foundations',
        items: [
          'home/guides/custom-domain',
          'home/guides/redirects',
          'home/guides/automatically-assign-roles',
          'home/guides/test-sso',
          'home/guides/sso-user-attributes',
        ],
      },
      {
        label: 'Resources',
        items: [
          {
            label: 'API reference',
            link: '/apis',
          },
          {
            label: 'API collections',
            link: 'https://github.com/scalekit-developers/api-collections',
          },
          {
            label: 'Chat with us',
            link: 'home/contact-us',
          },
          {
            label: 'Glossary',
            link: '/reference/glossary',
          },
          {
            label: 'Status',
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
      'home/guides/idtoken-claims',
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
    link: '/integrations/',
    id: 'integrations',
    icon: 'open-book',
    items: [
      {
        label: 'Concepts',
        items: [
          {
            label: 'How to',
            items: [
              'home/guides/custom-domain',
              'home/guides/idp-init-sso',
              'home/guides/okta-sso-test',
            ],
          },
          {
            label: 'Basics',
            items: ['home/guides/sso-basics'],
          },
        ],
      },
      {
        label: 'Administrator guides',
        items: [
          {
            label: 'SSO Integrations',
            autogenerate: { directory: 'integrations/sso-integrations' },
          },
          {
            label: 'SCIM Integrations',
            autogenerate: { directory: 'integrations/scim-integrations' },
          },
        ],
      },
      {
        label: 'Social Connections',
        autogenerate: { directory: 'integrations/social-connections' },
      },
      {
        label: 'Auth Systems',
        autogenerate: { directory: 'integrations/auth-systems' },
      },
    ],
  },
];
