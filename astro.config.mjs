// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'
import path from 'path'
import vue from '@astrojs/vue'
import starlightSidebarTopics from 'starlight-sidebar-topics'
import starlightImageZoom from 'starlight-image-zoom'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import starlightTocOverviewCustomizer from 'starlight-toc-overview-customizer'
import starlightContextualMenu from 'starlight-contextual-menu'
import starlightThemeNova from 'starlight-theme-nova'
import starlightVideos from 'starlight-videos'
import starlightChangelogs from 'starlight-changelogs'
import starlightLinksValidator from 'starlight-links-validator'
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
        MarkdownContent: './src/components/overrides/MarkdownContent.astro',
        Banner: './src/components/overrides/Banner.astro',
      },
      logo: {
        dark: '/src/assets/images/scalekit-logo-white.svg',
        light: '/src/assets/images/logo-v5/sk-docs.svg',
        replacesTitle: true,
      },
      defaultLocale: 'en',
      editLink: {
        baseUrl: 'https://github.com/scalekit-inc/developer-docs/edit/main',
      },
      pagefind: {
        rootSelector: 'body',
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
        starlightThemeNova(),
        starlightImageZoom({
          showCaptions: true,
        }),
        starlightSidebarTopics(sidebarConfig, { topics }),
        starlightTocOverviewCustomizer({
          overviewTitle: 'Overview',
        }),
        starlightVideos(),
        starlightChangelogs(),
        starlightLinksValidator({
          exclude: ['/dev-kit/changelogs/**'],
        }),
        starlightContextualMenu({
          actions: ['copy', 'chatgpt', 'claude'],
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
          // NOTE: Inlined from /public/js/iframe-detection.js for early execution
          // If you need to modify this script, edit /public/js/iframe-detection.js and copy the content here
          tag: 'script',
          content: `
            ;(function () {
              function inIframe() {
                try {
                  return window.self !== window.top
                } catch (e) {
                  return true
                }
              }

              if (inIframe()) {
                // Force light mode immediately (before DOM loads)
                document.documentElement.setAttribute('data-theme', 'light')
                document.documentElement.classList.add('in-iframe')
                document.documentElement.style.colorScheme = 'light'

                // Override localStorage to prevent theme changes
                localStorage.setItem('theme-toggle', 'light')
                localStorage.setItem('colorMode', 'light')

                // Remove zoom functionality after DOM loads
                document.addEventListener('DOMContentLoaded', function () {
                  document.querySelectorAll('starlight-image-zoom-zoomable').forEach(function (el) {
                    var img = el.querySelector('img')
                    var btn = el.querySelector('button')
                    if (btn) btn.remove()
                    if (img) {
                      var newImg = img.cloneNode(true)
                      el.parentNode.replaceChild(newImg, el)
                    }
                  })

                  // Observer for dynamically loaded images
                  var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                      mutation.addedNodes.forEach(function (node) {
                        if (node.nodeType === 1) {
                          var zoomables = node.querySelectorAll('starlight-image-zoom-zoomable')
                          zoomables.forEach(function (el) {
                            var img = el.querySelector('img')
                            var btn = el.querySelector('button')
                            if (btn) btn.remove()
                            if (img) {
                              var newImg = img.cloneNode(true)
                              el.parentNode.replaceChild(newImg, el)
                            }
                          })
                        }
                      })
                    })
                  })

                  observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                  })
                })
              }
            })()
          `,
        },
        {
          tag: 'script',
          attrs: {
            src: '/js/force-light-theme.js',
          },
        },
        {
          tag: 'script',
          attrs: {
            src: '/js/sidebar-scroll.js',
          },
        },
        {
          tag: 'script',
          attrs: {
            type: 'text/javascript',
            id: 'hs-script-loader',
            async: true,
            defer: true,
            src: '//js-na2.hs-scripts.com/44204598.js',
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
        default: '1', // Light theme (Neutral default)
        dark: '1',
      },
      sketch: true, // Clean, professional diagrams instead of hand-drawn
      appendix: true, // Enable interactive elements (tooltips/links)
      inline: true, // Embed SVG inline to make links clickable
      layout: 'elk', // ELK layout engine for better positioning
      pad: 5,
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
