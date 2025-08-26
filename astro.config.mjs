// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'
import path from 'path'
import vue from '@astrojs/vue'
import starlightLinksValidator from 'starlight-links-validator'
import starlightSidebarTopics from 'starlight-sidebar-topics'
import starlightImageZoom from 'starlight-image-zoom'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import starlightTocOverviewCustomizer from 'starlight-toc-overview-customizer'
import starlightThemeRapide from 'starlight-theme-rapide'
import starlightLlmsTxt from 'starlight-llms-txt'
import starlightVideos from 'starlight-videos'
import { sidebar as sidebarConfig, topics } from './src/configs/sidebar.config'
import { redirects } from './src/configs/redirects.config'
import tailwindcss from '@tailwindcss/vite'
import d2 from 'astro-d2'

console.log('Current NODE_ENV:', process.env.NODE_ENV)
console.log(
  'All env vars:',
  Object.keys(process.env).filter((key) => key.includes('NODE')),
)

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.scalekit.com',
  redirects,
  integrations: [
    starlight({
      title: 'Scalekit Docs',
      routeMiddleware: './src/routeData.ts',
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      favicon: '/images/favicon.png',
      components: {
        // SocialIcons: './src/components/overrides/SocialIcons.astro',
        // Sidebar: './src/components/overrides/Sidebar.astro',
        Head: './src/components/overrides/Head.astro',
        Header: './src/components/overrides/Header.astro',
        Pagination: './src/components/overrides/Pagination.astro',
        PageSidebar: './src/components/overrides/PageSidebar.astro',
      },
      logo: {
        dark: '/src/assets/images/logos-v2/scalekit-docs-black.png',
        light: '/src/assets/images/logos-v2/scalekit-docs-white.png',
        replacesTitle: true,
      },
      defaultLocale: 'en',
      editLink: {
        baseUrl: 'https://github.com/scalekit-inc/developer-docs/edit/main',
      },
      pagefind: {
        mergeIndex: [
          // {
          //   bundlePath: '/apis',
          //   indexWeight: 1.5, // Give API reference slightly higher weight in search results
          //   mergeFilter: {
          //     resource: 'API Reference',
          //   },
          // },
        ],
      },
      expressiveCode: {
        useStarlightDarkModeSwitch: true,
        themes: ['vitesse-dark', 'vitesse-light'],
      },
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/geist',

        /** Backup fonts. They can be removed if deemed unnecessary. */
        // '@fontsource-variable/plus-jakarta-sans',
        // '@fontsource-variable/space-grotesk',
        './src/styles/theme-priority.css',

        /** The following order is covered in theme-priority.css. Consider removing if deemed unnecessary. */
        // './src/styles/custom.css',
        // './src/styles/tailwind.css',
        // './src/styles/global.css',
      ],
      plugins: [
        starlightLinksValidator(),
        starlightLlmsTxt(),
        starlightThemeRapide(),
        starlightImageZoom({
          showCaptions: true,
        }),
        starlightSidebarTopics(sidebarConfig, { topics }),
        starlightTocOverviewCustomizer({
          overviewTitle: 'Overview',
        }),
        starlightVideos(),
      ],
      head: [
        {
          tag: 'script',
          attrs: {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=G-F4K36V5HPL',
          },
        },
        {
          tag: 'script',
          content: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F4K36V5HPL');
        `,
        },
        {
          tag: 'script',
          attrs: {
            src: '/js/posthog.js',
          },
        },
        {
          tag: 'script',
          attrs: {
            src: '/js/iframe-detection.js',
          },
        },
      ],
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
    d2({
      theme: {
        default: '0',
        dark: '1', // choose at https://d2lang.com/tour/themes/
      },
      sketch: true,
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
    // Provide a safe fallback for libraries that reference the CommonJS
    // global `__dirname` (e.g. canvaskit-wasm used by astro-og-canvas).
    // When bundling for ESM, Node doesn’t define this variable which causes
    // a runtime ReferenceError during `astro build`. Re-defining it at build
    // time prevents the error without affecting runtime logic.
    define: {
      __dirname: '"/"',
    },
    plugins: [pluginCollapsibleSections(), tailwindcss()],
    build: {
      chunkSizeWarningLimit: 2000,
    },
  },
})
