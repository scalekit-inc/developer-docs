// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import path from 'path';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import starlightLinksValidator from 'starlight-links-validator';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightViewModes from 'starlight-view-modes';
import starlightImageZoom from 'starlight-image-zoom';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import starlightThemeRapide from 'starlight-theme-rapide';
import starlightLlmsTxt from 'starlight-llms-txt';
import { sidebar as sidebarConfig } from './src/configs/sidebar.config';
import { redirects } from './src/configs/redirects.config';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.scalekit.dev',
  redirects,
  integrations: [
    starlight({
      title: 'Scalekit Docs',
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      favicon: 'src/assets/favicons/logo.png',
      components: {
        SocialIcons: './src/components/overrides/SocialIcons.astro',
        Sidebar: './src/components/overrides/Sidebar.astro',
      },
      logo: {
        light: '/src/assets/images/scalekit-logo-black.svg',
        dark: '/src/assets/images/scalekit-logo-white.svg',
        replacesTitle: true,
      },
      defaultLocale: 'en',
      editLink: {
        baseUrl:
          'https://github.com/saif-at-scalekit/astro/edit/main/src/content/docs/',
      },
      expressiveCode: {
        useStarlightDarkModeSwitch: true,
        themes: ['vitesse-dark', 'vitesse-light'],
      },
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/plus-jakarta-sans',
        '@fontsource-variable/space-grotesk',
        './src/styles/theme-priority.css',
        // './src/styles/tailwind.css',
        './src/styles/custom.css',
      ],
      plugins: [
        starlightLinksValidator(),
        starlightLlmsTxt(),
        starlightThemeRapide(),
        starlightImageZoom({
          showCaptions: true,
        }),
        starlightSidebarTopics(sidebarConfig),
        // starlightViewModes(),
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
  image: {
    service: passthroughImageService(),
  },
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
    plugins: [pluginCollapsibleSections()],
    build: {
      chunkSizeWarningLimit: 2000,
    },
  },
});
