// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import path from 'path';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import starlightLinksValidator from 'starlight-links-validator';

// https://astro.build/config
export default defineConfig({
  site: 'https://scalekit.com',
  integrations: [
    starlight({
      title: 'My Docs',
      components: {
        SocialIcons: './src/components/overrides/MySocialLinks.astro',
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
            { label: 'Plugins', slug: 'guides/plugins' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
        {
          label: 'Scalekit',
          link: 'https://www.scalekit.com',
          attrs: { target: '_blank', style: 'font-style: italic' },
        },
      ],
      plugins: [starlightLinksValidator()],
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
