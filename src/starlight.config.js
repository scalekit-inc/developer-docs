export const starlightConfig = {
  title: 'My Docs',
  customCss: [
    '@fontsource-variable/plus-jakarta-sans',
    './src/styles/custom.css',
  ],
  sidebar: [
    {
      label: 'Guides',
      items: [
        { label: 'Example Guide', slug: 'guides/example', collapsed: false },
        { label: 'Example Guide 2', slug: 'guides/example-2' },
      ],
    },
    {
      label: 'Reference',
      autogenerate: { directory: 'reference' },
    },
  ],
};
