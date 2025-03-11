// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import path from 'path';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import starlightLinksValidator from 'starlight-links-validator';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightSidebarTopicsDropdown from 'starlight-sidebar-topics-dropdown';

// https://astro.build/config
export default defineConfig({
  // site: 'https://docs.scalekit.com',
  integrations: [
    starlight({
      title: 'My Docs',
      favicon: 'src/assets/favicons/logo.png',
      components: {
        SocialIcons: './src/components/overrides/Primary.astro',
      },
      logo: {
        light: '/src/assets/images/scalekit-logo-black.svg',
        dark: '/src/assets/images/scalekit-logo-white.svg',
        replacesTitle: true,
      },
      defaultLocale: 'en',
      editLink: {
        baseUrl:
          'https://github.com/scalekit-inc/scalekit-docs/edit/main/src/content/docs/',
      },
      expressiveCode: {
        themes: ['material-theme', 'github-light'],
        useStarlightDarkModeSwitch: true,
      },
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/plus-jakarta-sans',
        '@fontsource-variable/space-grotesk',
        './src/styles/tailwind.css',
        './src/styles/custom.css',
      ],
      plugins: [
        starlightSidebarTopics([
          {
            label: 'Manual',
            id: 'manual',
            link: '/manual/getting-started/',
            icon: 'open-book',
            items: [
              {
                label: 'Getting Started',
                collapsed: false,
                items: [
                  {
                    label: 'Installation',
                    link: 'manual/getting-started/installation',
                  },
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
                    label: 'Admin Portal',
                    link: '/resources/sites/',
                  },
                  {
                    label: 'Test Organization',
                    link: 'https://scalekit.statuspage.io/',
                  },
                  {
                    label: 'IdP Simulator',
                    link: '/manual/fundamentals/idp-simulator',
                  },
                ],
              },
              {
                label: 'Integrations',
                items: [
                  {
                    label: 'Auth0',
                    link: '/manual/integrations/auth0',
                  },
                  {
                    label: 'Cognito',
                    link: '/manual/integrations/cognito',
                  },
                  {
                    label: 'Firebase',
                    link: '/manual/integrations/firebase',
                  },
                  {
                    label: 'Continue to more integrations',
                    link: '/guides/',
                  },
                ],
              },
              {
                label: 'Support',
                items: [
                  {
                    label: 'Glossary',
                    link: '/resources/sites/',
                  },
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
                label: 'SSO Integrations',
                autogenerate: { directory: 'guides/sso-integrations' },
              },
              {
                label: 'SCIM Integrations',
                autogenerate: { directory: 'guides/scim-integrations' },
              },
              {
                label: 'Product',
                autogenerate: { directory: 'guides/product' },
              },
            ],
          },
        ]),
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    vue({
      jsx: true,
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-'),
        },
      },
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
      },
    },
    optimizeDeps: {
      include: ['vue'],
      exclude: [],
    },
    plugins: [],
  },
});
