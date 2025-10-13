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
import starlightContextualMenu from 'starlight-contextual-menu'
import starlightThemeNova from 'starlight-theme-nova'
import starlightVideos from 'starlight-videos'
import { sidebar as sidebarConfig, topics } from './src/configs/sidebar.config'
import { redirects } from './src/configs/redirects.config'
import tailwindcss from '@tailwindcss/vite'
import d2 from 'astro-d2' // https://astro-d2.vercel.app/configuration/
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.scalekit.com',
  redirects,
  integrations: [
    starlight({
      title: 'Scalekit Docs',
      titleDelimiter: '',
      routeMiddleware: './src/routeData.ts',
      lastUpdated: true,
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
        Footer: './src/components/overrides/Footer.astro',
        PageSidebar: './src/components/overrides/PageSidebar.astro',
        PageTitle: './src/components/overrides/PageTitle.astro',
      },
      logo: {
        dark: '/src/assets/images/logos-v4/sk-docs-dark.svg',
        light: '/src/assets/images/logos-v4/sk-docs-light.svg',
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
        // themes: ['vitesse-dark', 'vitesse-light'],
        themes: ['tokyo-night', 'light-plus'],
        styleOverrides: {
          codeFontFamily:
            "'JetBrains Mono', 'Inter Variable', ui-monospace, 'Courier New', monospace",
          borderRadius: '0.375rem',
        },
      },
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/atkinson-hyperlegible-next',
        '@fontsource/jetbrains-mono',
        './src/styles/theme-priority.css',
      ],
      plugins: [
        starlightLinksValidator(),
        starlightThemeNova(),
        starlightImageZoom({
          showCaptions: true,
        }),
        starlightSidebarTopics(sidebarConfig, { topics }),
        starlightTocOverviewCustomizer({
          overviewTitle: 'Overview',
        }),
        starlightVideos(),
        starlightContextualMenu({
          actions: ['copy', 'chatgpt', 'claude', 'lechat', 'grok'],
          hideMainActionLabel: true,
        }),
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
      layout: 'elk',
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
    plugins: [pluginCollapsibleSections(), tailwindcss(), Icons({ compiler: 'astro' })],
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('@scalar')) return 'scalar'
          },
        },
      },
    },
  },
})
