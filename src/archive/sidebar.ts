const sidebar = [
  {
    label: 'Manual',
    link: '/manual/getting-started/',
    icon: 'open-book',
    items: [
      {
        label: 'Getting Started',
        collapsed: false,
        items: [
          { label: 'Installation', link: 'manual/getting-started' },
          { label: 'First Project', link: 'manual/getting-started' },
          {
            label: 'Setup your environment',
            link: 'manual/getting-started',
          },
        ],
      },
      {
        label: 'Quickstarts',
        collapsed: false,
        items: [
          'manual/sso-quickstart',
          'manual/scim-quickstart',
          'manual/social-logins-quickstart',
        ],
      },
      {
        label: 'Fundamentals',
        items: [
          {
            label: 'Admin portal',
            link: '/resources/sites/',
          },
          {
            label: 'Test organization',
            link: 'https://scalekit.statuspage.io/',
          },
          {
            label: 'Organizations',
            link: '/manual/fundamentals/organizations',
          },
          {
            label: 'IdP Simulator',
            link: '/manual/fundamentals/idp-simulator',
          },
        ],
      },
      {
        label: 'Provisioning',
        items: [
          {
            label: 'SCIM',
            link: '/resources/sites/',
          },
          {
            label: 'Webhooks',
            link: 'https://scalekit.statuspage.io/',
          },
        ],
      },
      {
        label: 'Config and Admin',
        autogenerate: { directory: 'docs/config-and-admin' },
      },
      {
        label: 'Support',
        items: [
          {
            label: 'Chat with us!',
            link: '/resources/sites/',
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
      { label: 'REST APIs', link: '/apis-scalar' },
      { label: 'SDKs', autogenerate: { directory: 'reference/sdks' } },
      {
        label: 'Webhooks',
        autogenerate: { directory: 'reference/webhooks' },
      },
    ],
  },
  {
    label: 'Guides',
    link: '/guides/',
    icon: 'puzzle',
    items: [
      {
        label: '',
        autogenerate: { directory: 'guides' },
      },
    ],
  },
  {
    id: 'demo',
    label: 'Demo',
    link: '/demo/',
    icon: 'puzzle',
    items: [
      { slug: 'unnested-sidebar/lorem-ipsum' },
      { label: 'API', autogenerate: { directory: 'demo/api' } },
      {
        label: 'Components',
        autogenerate: { directory: 'demo/components' },
      },
      {
        label: 'Commands',
        autogenerate: { directory: 'demo/commands' },
        collapsed: true,
      },
    ],
    badge: {
      text: {
        en: 'New',
        fr: 'Ébauche',
      },
      variant: 'caution',
    },
  },
  {
    id: 'unnested-sidebar',
    label: 'Unnested Sidebar',
    link: '/unnested-sidebar/',
    icon: 'right-caret',
    items: [{ label: '', autogenerate: { directory: 'unnested-sidebar' } }],
  },
];
