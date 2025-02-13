<script setup lang="ts">
import { ApiReference } from '@scalar/api-reference';
import '@scalar/api-reference/style.css';
</script>

<template>
  <div class="api-reference-container">
    <ApiReference
      :configuration="{
        spec: {
          url: '/api/scalekit.swagger.json',
        },
        theme: 'bluePlanet',
        hideTestRequestButton: true,
        hideModels: true,
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
        defaultHttpClient: {
          targetKey: 'node',
          clientKey: 'axios',
        },
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
}
</style>
