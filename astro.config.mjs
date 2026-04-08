// @ts-check
import { defineConfig, sharpImageService } from 'astro/config'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'
import path from 'path'
import vue from '@astrojs/vue'
import starlightSidebarTopics from 'starlight-sidebar-topics'
import starlightImageZoom from 'starlight-image-zoom'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import starlightDocSearch from '@astrojs/starlight-docsearch'
import starlightPageActions from 'starlight-page-actions'
import starlightThemeNova from 'starlight-theme-nova'
import starlightVideos from 'starlight-videos'
import starlightCopyInlineCode from 'starlight-copy-inline-code'
import starlightLinksValidator from 'starlight-links-validator'
import starlightLlmsTxt from 'starlight-llms-txt'
import starlightBlog from 'starlight-blog'
import { sidebar as sidebarConfig, topics, exclude } from './src/configs/sidebar.config'
import { redirects } from './src/configs/redirects.config'
import { llmsConfig } from './src/configs/llms.config.ts'
import { AGENT_PLUGIN_META } from './src/configs/agent-instructions.ts'
import { pageActionsPrompt } from './src/configs/page-actions.config.ts'
import tailwindcss from '@tailwindcss/vite'
import d2 from 'astro-d2' // https://astro-d2.vercel.app/configuration/
import Icons from 'unplugin-icons/vite'

import netlify from '@astrojs/netlify'
import openapiToMarkdown from './src/integrations/openapi-markdown'
import { injectAgentHeader } from './src/integrations/inject-agent-header.ts'

// https://astro.build/config
export default defineConfig({
  // Switched from 'server' to default (static) to drastically reduce build memory.
  // Astro 6's Vite Environments API creates separate build contexts per output mode;
  // 'server' mode processes all 300+ pages through a heavy SSR pipeline.
  // The few SSR pages (auth, health, admin) already have `prerender = false`.
  output: 'server',
  site: 'https://docs.scalekit.com',
  server: {
    // Match Netlify dev's readiness probe, which connects to `localhost`.
    host: 'localhost',
    port: 4321,
  },
  redirects,
  integrations: [
    starlight({
      title: 'Scalekit Docs',
      pagefind: false,
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
        Icon: './src/components/overrides/Icon.astro',
        Header: './src/components/overrides/Header.astro',
        Footer: './src/components/overrides/Footer.astro',
        PageSidebar: './src/components/overrides/PageSidebar.astro',
        PageTitle: './src/components/overrides/PageTitle.astro',
        MarkdownContent: './src/components/overrides/MarkdownContent.astro',
        Banner: './src/components/overrides/Banner.astro',
      },
      logo: {
        dark: '/src/assets/images/scalekit-logo-white.svg',
        light: '/src/assets/images/logos-v4/sk-docs-light.svg',
        replacesTitle: true,
      },
      defaultLocale: 'en',
      editLink: {
        baseUrl: 'https://github.com/scalekit-inc/developer-docs/edit/main',
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
        '@fontsource-variable/outfit',
        './src/styles/theme-priority.css',
      ],
      plugins: [
        starlightThemeNova({ stylingSystem: 'tailwind' }),
        starlightImageZoom({
          showCaptions: true,
        }),
        starlightSidebarTopics(sidebarConfig, { topics, exclude }),
        starlightDocSearch({
          appId: '7554BDRAJD',
          apiKey: 'b2fecf525a556f05d46ef2389ad7e4b6',
          indexName: 'scalekit-starlight-crawler',
          askAi: '8jKZkVuXS0hG',
        }),
        starlightVideos(),
        // Links validator disabled in CI to reduce build memory usage.
        // Run locally with: pnpm astro build (without NETLIFY env var)
        ...(!process.env.NETLIFY
          ? [
              starlightLinksValidator({
                exclude: ['/apis/**'],
              }),
            ]
          : []),
        starlightLlmsTxt(llmsConfig),
        starlightPageActions({
          prompt: pageActionsPrompt,
          actions: {
            markdown: true,
            chatgpt: false,
            claude: true,
            custom: {
              cursor: {
                label: 'Open in Cursor',
                href: 'https://cursor.com/link/prompt?text=',
              },
            },
          },
          // No baseUrl — prevents llms.txt generation (already handled by starlight-llms-txt)
        }),
        // Provide copy-to-clipboard button for inline code snippets site-wide for better UX
        starlightCopyInlineCode({
          // Show copy button only on hover (default: true)
          showOnHover: false,

          // Tooltip text for copy button (default: 'Copy')
          copyLabel: 'Copy',

          // Tooltip text after successful copy (default: 'Copied!')
          copiedLabel: 'Copied!',

          // CSS selector for inline code elements (default: ':not(pre) > code')
          selector: ':not(pre) > code',
        }),
        starlightBlog({
          prefix: 'cookbooks',
          rss: false,
          metrics: {
            readingTime: true,
            words: 'total',
          },
        }),
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'ai-agent-instructions',
            content: AGENT_PLUGIN_META,
          },
        },
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
        // Pylon widget configuration (must run in head before widget loads)
        {
          tag: 'script',
          attrs: {
            src: '/js/pylon-widget.js',
          },
        },
        // Prevent HubSpot from auto-showing chat; we load it explicitly for anonymous users
        {
          tag: 'script',
          content: `window.hsConversationsSettings = { loadImmediately: false };`,
        },
        {
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

              if (inIframe()) return

              var script = document.createElement('script')
              script.type = 'text/javascript'
              script.id = 'hs-script-loader'
              script.async = true
              script.defer = true
              script.src = '//js-na2.hs-scripts.com/44204598.js'
              document.head.appendChild(script)
            })()
          `,
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
      skipGeneration: !!process.env['NETLIFY'],
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
    openapiToMarkdown(),
    injectAgentHeader(),
  ],

  image: {
    service: sharpImageService(),
  },

  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@starlight/rehype-tabs': path.resolve(
          './node_modules/@astrojs/starlight/user-components/rehype-tabs.ts',
        ),
        '@astrojs/starlight/components/Icon.astro': path.resolve(
          './node_modules/@astrojs/starlight/user-components/Icon.astro',
        ),
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
      // Disable source maps in CI to reduce peak memory during bundling
      sourcemap: false,
      // Disable gzip size reporting to save memory on large builds
      reportCompressedSize: false,
      rollupOptions: {
        // Limit parallel file I/O to reduce memory spikes during bundling
        maxParallelFileOps: 2,
        output: {
          manualChunks(id) {
            if (id.includes('@scalar')) return 'scalar'
          },
        },
      },
    },
  },
  adapter: netlify(),
})
