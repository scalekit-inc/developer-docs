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
import starlightThemeNova from 'starlight-theme-nova'
import starlightVideos from 'starlight-videos'
import { sidebar as sidebarConfig, topics } from './src/configs/sidebar.config'
import { redirects } from './src/configs/redirects.config'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.scalekit.com',
  redirects,
  integrations: [
    starlight({
      title: 'Scalekit Docs',
      titleDelimiter: '',
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
        PageSidebar: './src/components/overrides/PageSidebar.astro',
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
            "'Geist Mono Variable','Inter Mono Variable', ui-monospace, 'Courier New', monospace",
          borderRadius: '0.375rem',
        },
      },
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/geist-mono',
        './src/styles/theme-priority.css',
        './src/styles/custom.css',
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
          content: `
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_85pLP8gwYvRCQdxgLQP24iqXHPRGaLgEw4S4dgZHJZ', {
                api_host: 'https://us.i.posthog.com',
                person_profiles: 'identified_only',
            })
          `,
        },
        // Add the iframe detection script inline
        {
          tag: 'script',
          content: `
            function inIframe() {
              try {
                return window.self !== window.top;
              } catch (e) {
                return true;
              }
            }

            // Add iframe detection on page load
            document.addEventListener('DOMContentLoaded', function() {
              // Only apply iframe styling if in an iframe
              if (inIframe()) {
                document.documentElement.setAttribute('data-theme', 'light');
                document.documentElement.classList.add('in-iframe');

                // Remove zoom functionality from images in iframe
                document.querySelectorAll('starlight-image-zoom-zoomable').forEach(el => {
                  const img = el.querySelector('img');
                  const btn = el.querySelector('button');
                  if (btn) btn.remove();
                  if (img) {
                    const newImg = img.cloneNode(true);
                    el.parentNode.replaceChild(newImg, el);
                  }
                });

                // Add MutationObserver to handle dynamically loaded images - ONLY IN IFRAME
                const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                      if (node.nodeType === 1) { // Element node
                        const zoomables = node.querySelectorAll('starlight-image-zoom-zoomable');
                        zoomables.forEach(el => {
                          const img = el.querySelector('img');
                          const btn = el.querySelector('button');
                          if (btn) btn.remove();
                          if (img) {
                            const newImg = img.cloneNode(true);
                            el.parentNode.replaceChild(newImg, el);
                          }
                        });
                      }
                    });
                  });
                });

                observer.observe(document.body, {
                  childList: true,
                  subtree: true
                });
              }
            });
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
