<script setup lang="ts">
import { ApiReference } from '@scalar/api-reference';
import '@scalar/api-reference/style.css';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
</script>

<template>
  <div class="api-reference-wrapper">
    <header class="custom-header scalar-app">
      <h1>Scalekit API Reference</h1>
      <nav>
        <a href="https://github.com/scalekit-developers/api-collections"
          >API Collections</a
        >
        <a href="https://docs.scalekit.com">Back to Docs</a>
      </nav>
    </header>
    <div class="api-reference-container">
      <ApiReference
        :configuration="{
          url: '/api/scalekit.swagger.json',
          theme: 'saturn',
          customCss: `
            :root {
              --scalar-font-body: 'Inter Variable', sans-serif;
              --scalar-font-heading: 'Geist Variable', sans-serif;
              --scalar-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
              --scalar-custom-header-height: 3rem;
            }
            .property-name, .scalar-code-block {
              font-family: var(--scalar-font-mono) !important;
              white-space: pre-wrap;
            }
            * {
              font-family: var(--scalar-font-body);
            }
            p, .sidebar-heading-link-title {
              font-family: var(--scalar-font-body);
            }
            h1, h2, h3, h4, h5, h6 {
              font-family: var(--scalar-font-heading);
            }
          `,
          hideTestRequestButton: true,
          hideModels: true,
          hideDarkModeToggle: false,
          defaultOpenAllTags: true,
          hiddenClients: [
            // 'libcurl',
            // 'clj_http',
            'httpclient',
            'restsharp',
            'native',
            'http1.1',
            'asynchttp',
            // 'nethttp',
            'okhttp',
            'unirest',
            'jquery',
            // 'okhttp',
            'native',
            'request',
            'unirest',
            'nsurlsession',
            'cohttp',
            'guzzle',
            'http',
            'ofetch',
            'http1',
            'http2',
            // 'webrequest',
            'restmethod',
            'httr',
            'native',
            'httpie',
            'wget',
            // 'nsurlsession',
            'undici',
            'requests',
            'python3',
            'axios',
            'xhr',
            'fetch',
          ],
          favicon:
            'https://cdn.prod.website-files.com/65b87d98fa638289e10b8f61/67ab35acf2f180e0fe0a94a8_S%20Icon%20-%20Black%20-%2032x32.png',
          hideClientButton: true,
        }"
      />
    </div>
  </div>
</template>

<style>
.api-reference-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.api-reference-container {
  width: 100%;
  height: calc(100vh - var(--scalar-custom-header-height));
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

:deep(.scalar-api-reference) {
  height: 100%;
  overflow-y: auto;
}

.custom-header {
  height: var(--scalar-custom-header-height);
  background-color: var(--scalar-background-1);
  box-shadow: inset 0 -1px 0 var(--scalar-border-color);
  color: var(--scalar-color-1);
  font-size: var(--scalar-font-size-2);
  padding: 0 18px;
  position: sticky;
  justify-content: space-between;
  top: 0;
  z-index: 100;
}

.custom-header,
.custom-header nav {
  display: flex;
  align-items: center;
  gap: 18px;
}

.custom-header a:hover {
  color: var(--scalar-color-2);
}
</style>
