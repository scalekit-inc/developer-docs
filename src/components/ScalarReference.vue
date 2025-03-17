<script setup lang="ts">
import { ApiReference } from '@scalar/api-reference';
import '@scalar/api-reference/style.css';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
</script>

<template>
  <div class="api-reference-container">
    <ApiReference
      :configuration="{
        url: '/api/scalekit.swagger.json',
        theme: 'saturn',
        customCss: `
          .property-name, .scalar-code-block {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace !important;
          }
          * {
            font-family: 'Inter Variable', sans-serif;
          }
          p, .sidebar-heading-link-title {
            font-family: 'Inter Variable', sans-serif;
          }
          h1, h2, h3, h4, h5, h6,  {
            font-family: 'Space Grotesk Variable', sans-serif;
          }
        `,
        hideTestRequestButton: true,
        hideModels: true,
        hideDarkModeToggle: false,
        hiddenClients: [
          'libcurl',
          'clj_http',
          'httpclient',
          'restsharp',
          'native',
          'http1.1',
          'asynchttp',
          'nethttp',
          'okhttp',
          'unirest',
          'jquery',
          'okhttp',
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
          'webrequest',
          'restmethod',
          'httr',
          'native',
          'httpie',
          'wget',
          'nsurlsession',
          'undici',
        ],
        favicon:
          'https://cdn.prod.website-files.com/65b87d98fa638289e10b8f61/67ab35acf2f180e0fe0a94a8_S%20Icon%20-%20Black%20-%2032x32.png',
        defaultHttpClient: {
          targetKey: 'node',
          clientKey: 'axios',
        },
        hideClientButton: true,
      }"
    />
  </div>
</template>

<style>
.api-reference-container {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

:deep(.scalar-api-reference) {
  height: 100%;
  overflow-y: auto;
}
</style>
