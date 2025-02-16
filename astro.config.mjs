// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import path from 'path';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import starlightLinksValidator from 'starlight-links-validator';
import starlightSidebarTopicsDropdown from 'starlight-sidebar-topics-dropdown';

// https://astro.build/config
export default defineConfig({
  site: 'https://scalekit.com',
  integrations: [
    starlight({
      title: 'My Docs',
      components: {
        SocialIcons: './src/components/overrides/Primary.astro',
      },
      logo: {
        light: '/src/assets/images/scalekit-logo-black.svg',
        dark: '/src/assets/images/scalekit-logo-white.svg',
        replacesTitle: true,
      },
      defaultLocale: 'en',
      // allows for open contributions to the docs
      editLink: {
        baseUrl:
          'https://github.com/scalekit-inc/scalekit-docs/edit/main/src/content/docs/',
      },
      expressiveCode: {
        themes: ['material-theme', 'github-light'],
        useStarlightDarkModeSwitch: true,
      },
      customCss: [
        '@fontsource-variable/plus-jakarta-sans',
        '@fontsource-variable/space-grotesk',
        './src/styles/tailwind.css',
        './src/styles/custom.css',
      ],
      plugins: [
        starlightSidebarTopicsDropdown([
          {
            label: 'Documentation',
            link: '/docs/getting-started/',
            icon: 'open-book',
            items: [
              {
                label: 'Start Here',
                items: ['docs/getting-started', 'docs/configuration'],
              },
              { label: 'Guides', autogenerate: { directory: 'docs/guides' } },
              {
                label: 'Resources',
                items: [
                  {
                    label: 'Showcase',
                    link: '/resources/sites/',
                  },
                  {
                    label: 'Plugins',
                    link: '/resources/plugins/',
                  },
                  {
                    label: 'Content from HiDeoo',
                    link: '/resources/hideoo/',
                  },
                ],
              },
            ],
          },
          {
            id: 'demo',
            label: {
              en: 'Demo',
              fr: 'Démo',
            },
            link: '/demo/',
            icon: 'puzzle',
            items: [
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
                en: 'Stub',
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
            items: [
              { label: '', autogenerate: { directory: 'unnested-sidebar' } },
            ],
          },
          {
            label: 'REST APIs (embedded)',
            link: '/apis-scalar',
            icon: 'starlight',
          },
          {
            label: 'REST APIs (scalar hosted)',
            link: 'https://muscular-ratio.apidocumentation.com/',
            icon: 'starlight',
          },
        ]),
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    vue(),
  ],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
