export const sidebar = [
  {
    label: 'Single sign-on',
    link: '/sso/quickstart',
    id: 'sso',
    icon: 'seti:lock',
    items: [
      {
        label: 'Getting started',
        items: [
          'guides/sso/sso-basics',
          'sso/quickstart',
          'guides/admin-portal',
          'guides/test-sso',
          'guides/launch-checklist',
        ],
      },
      {
        label: 'Social authentication',
        items: [
          'sso/social-logins-quickstart',
          {
            label: 'connections',
            collapsed: true,
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
          'guides/sso/idp-init-sso',
          'guides/sso/okta-sso-test',
          'guides/sso/sso-user-attributes',
          'reference/sso-integration-errors',
          'reference/redirects',
          {
            label: 'Coexist with',
            autogenerate: { directory: 'guides/integrations/auth-systems' },
          },
          {
            label: 'Concepts',
            items: [
              'guides/sso/authorization-url',
              'reference/redirects',
              'guides/idtoken-claims',
              'guides/sso/user-profile-details',
              'guides/client-credentials-practices',
            ],
          },
        ],
      },
      {
        label: 'Administrator guides',
        autogenerate: { directory: 'guides/integrations/sso-integrations' },
      },
    ],
  },
  {
    label: 'SCIM provisioning',
    link: '/directory/scim/quickstart',
    icon: 'seti:folder',
    id: 'directory',
    items: [
      {
        label: 'Getting started',
        items: [
          'directory/scim/quickstart',
          'directory/code-examples',
          'guides/admin-portal',
          'guides/launch-checklist',
        ],
      },
      {
        label: 'Guides',
        items: [
          'guides/directory/group-based-role-assignment',
          'guides/custom-domain',
          'guides/webhooks-best-practices',
          {
            label: 'Concepts',
            items: [
              'guides/directory/user-provisioning-basics',
              'guides/directory/scim-protocol',
            ],
          },
        ],
      },
      {
        label: 'Administrator guides',
        autogenerate: { directory: 'guides/integrations/scim-integrations' },
      },
    ],
  },
  {
    label: 'Machine-2-Machine',
    link: '/m2m/quickstart',
    id: 'm2m',
    icon: 'seti:powershell',
    items: [
      {
        label: 'Getting started',
        items: [
          'guides/m2m/overview',
          'm2m/quickstart',
          {
            label: 'Code examples',
            link: 'https://github.com/scalekit-developers/gists/tree/main/m2m',
          },
        ],
      },
      {
        label: 'Guides',
        items: [
          'guides/m2m/m2m-basics',
          'guides/m2m/scopes',
          {
            label: 'How to',
            items: [
              'guides/m2m/api-auth-m2m-clients',
              'guides/authenticate-scalekit-api',
            ],
          },
          'guides/external-ids-and-metadata',
        ],
      },
    ],
  },
  {
    label: 'APIs & SDKs',
    id: 'reference',
    link: '/reference/',
    icon: 'seti:crystal_embedded',
    items: [
      {
        label: 'Developer kit',
        items: [
          {
            label: 'Authenticate Scalekit API',
            link: '/guides/authenticate-scalekit-api',
          },
          {
            label: 'API reference',
            link: '/apis',
            badge: { text: 'REST ↗', variant: 'note' },
          },
          {
            label: 'API collections',
            link: 'https://github.com/scalekit-developers/api-collections',
          },
        ],
      },
      {
        label: 'Reference',
        items: [
          {
            label: 'SDKs',
            items: [
              {
                label: 'Nodejs',
                link: 'https://github.com/scalekit-inc/scalekit-sdk-node',
              },
              {
                label: 'Python',
                link: 'https://github.com/scalekit-inc/scalekit-sdk-python',
              },
              {
                label: 'Go',
                link: 'https://github.com/scalekit-inc/scalekit-sdk-go',
              },
              {
                label: 'Java',
                link: 'https://github.com/scalekit-inc/scalekit-sdk-java',
              },
            ],
          },
          {
            label: 'Webhooks',
            autogenerate: { directory: 'reference/webhooks' },
          },
          'reference/glossary',
          {
            label: 'Release notes',
            link: 'https://www.scalekit.com/product-updates',
          },
          {
            label: 'Chat with us!',
            link: '/manual/support/contact-us',
          },
        ],
      },
    ],
  },
];

export const topics = {
  exclude: [
    '', // Exclude empty path
    '/', // Exclude root path
    'index', // Exclude index by name
    'guides/redirects',
    'guides/integrations',
    'home/guides/*',
    'home/guides/admin-portal',
    'home/*',
  ],
};
