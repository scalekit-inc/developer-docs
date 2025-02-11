// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  site: 'https://scalekit.com', // creates a sitemap for robots.txt
  integrations: [
    starlight({
      title: 'My Docs',
      logo: {
        src: '@/assets/logo-test.png',
        replacesTitle: true,
      },
      social: {
        github: 'https://github.com/scalekit-inc',
        linkedin: 'https://www.linkedin.com/company/scalekit-inc/',
      },
      // allows for open contributions to the docs
      editLink: {
        baseUrl:
          'https://github.com/scalekit-inc/scalekit-docs/edit/main/src/content/docs/',
      },
      expressiveCode: {
        themes: ['github-light', 'material-theme'],
      },
      customCss: [
        '@fontsource-variable/plus-jakarta-sans',
        '@fontsource-variable/space-grotesk',
        './src/styles/custom.css',
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            {
              label: 'Components',
              slug: 'guides/components',
              collapsed: false,
            },
            { label: 'Example Guide 2', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
