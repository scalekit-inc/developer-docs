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
        items: ['sso/social-logins-quickstart'],
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
    label: 'APIs & SDKs',
    id: 'reference',
    link: '/reference/',
    icon: 'seti:crystal_embedded',
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
        label: 'Sign-in configurations',
        items: [
          {
            label: 'Social Connections',
            autogenerate: { directory: 'integrations/social-connections' },
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
    ],
  },
];

export const topics = {
  exclude: [
    'guides/redirects',
    'guides/integrations',
    'home/guides/*',
    'home/guides/admin-portal',
    'home/*',
  ],
};
