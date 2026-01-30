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
import starlightContextualMenu from 'starlight-contextual-menu'
import starlightThemeNova from 'starlight-theme-nova'
import starlightVideos from 'starlight-videos'
import starlightLinksValidator from 'starlight-links-validator'
import starlightLlmsTxt from 'starlight-llms-txt'
import { sidebar as sidebarConfig, topics, exclude } from './src/configs/sidebar.config'
import { redirects } from './src/configs/redirects.config'
import { llmsConfig } from './src/configs/llms.config.ts'
import tailwindcss from '@tailwindcss/vite'
import d2 from 'astro-d2' // https://astro-d2.vercel.app/configuration/
import Icons from 'unplugin-icons/vite'

import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
  output: 'static',
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
        './src/styles/theme-priority.css',
      ],
      plugins: [
        starlightThemeNova(),
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
        starlightLinksValidator({
          exclude: ['/apis/**'],
        }),
        starlightLlmsTxt(llmsConfig),
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
          content: `
            ;(async function () {
              try {
                var raw = localStorage.getItem('sk_auth_session')

                // If no cached session, try fetching from server
                if (!raw) {
                  try {
                    var response = await fetch('/auth/session', { credentials: 'include' })
                    if (response.ok) {
                      var sessionData = await response.json()
                      if (sessionData?.authenticated) {
                        localStorage.setItem('sk_auth_session', JSON.stringify(sessionData))
                        raw = localStorage.getItem('sk_auth_session')
                      }
                    }
                  } catch (fetchError) {
                    console.warn('[pylon] Could not fetch session:', fetchError)
                  }
                }

                console.log('[pylon] raw sk_auth_session present:', !!raw)

                if (raw) {
                  var session = JSON.parse(raw)
                  var claims = session.idTokenClaims || {}
                  var user = session.user || {}

                  var email =
                    user.email ||
                    claims.email ||
                    null

                  var name =
                    user.name ||
                    [claims.given_name, claims.family_name].filter(Boolean).join(' ') ||
                    claims.name ||
                    null

                  console.log('[pylon] derived user for widget', {
                    hasEmail: !!email,
                    hasName: !!name,
                  })

                  window.pylon = {
                    chat_settings: {
                      app_id: '32a58676-d739-4f5c-9d97-2f28f9deb8a6',
                      email: email || undefined,
                      name: name || undefined,
                    },
                  }
                }

                // Load Pylon widget after config is set
                (function(){var e=window;var t=document;var n=function(){n.e(arguments)};n.q=[];n.e=function(e){n.q.push(e)};e.Pylon=n;var r=function(){var e=t.createElement("script");e.setAttribute("type","text/javascript");e.setAttribute("async","true");e.setAttribute("src","https://widget.usepylon.com/widget/32a58676-d739-4f5c-9d97-2f28f9deb8a6");var n=t.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};if(t.readyState==="complete"){r()}else if(e.addEventListener){e.addEventListener("load",r,false)}})()

              } catch (e) {
                console.error('[pylon] error in pylon widget initialization', e)
              }
            })()
          `,
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
    service: sharpImageService(),
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

  // @ts-expect-error Netlify adapter supports middleware mode.
  adapter: netlify({ mode: 'middleware' }),
})
