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
  // site: 'https://scalekit.com',
  redirects: {
    '/': '/docs/overview',
  },
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
            label: 'Getting Started',
            link: '/docs/getting-started/',
            icon: 'open-book',
            items: [
              {
                label: 'Overview',
                link: '/docs/overview/',
              },
              {
                label: 'Quickstarts',
                collapsed: false,
                items: [
                  'docs/sso-quickstart',
                  'docs/scim-quickstart',
                  'docs/social-logins-quickstart',
                ],
              },
              {
                label: 'Enterprise Auth',
                items: [
                  {
                    label: 'Social Logins',
                    link: '/resources/sites/',
                  },
                  {
                    label: 'Single Sign-On',
                    link: 'https://scalekit.statuspage.io/',
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
            id: 'demo',
            label: 'Guides',
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
