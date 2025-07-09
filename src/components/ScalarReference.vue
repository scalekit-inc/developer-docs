<script setup lang="ts">
import { ApiReference } from '@scalar/api-reference'
import '@scalar/api-reference/style.css'
import '@fontsource-variable/inter'
import '@/styles/api-reference.css'
</script>

<template>
  <div class="api-reference-wrapper">
    <header class="custom-header scalar-app">
      <a
        href="https://docs.scalekit.com"
        style="text-decoration: none"
        target="_blank"
        rel="noopener noreferrer"
        >Scalekit API Reference</a
      >
      <!-- <a href="https://docs.scalekit.com">
        <img
          src="/assets/logos/scalekit-logo-green-dark.svg"
          alt="Scalekit API Reference"
          height="45"
        />
      </a> -->
      <nav>
        <a
          href="https://github.com/scalekit-developers/api-collections"
          style="text-decoration: none"
          target="_blank"
          rel="noopener noreferrer"
          >Postman Collections</a
        >
        <a
          href="https://docs.scalekit.com"
          style="text-decoration: none"
          target="_blank"
          rel="noopener noreferrer"
          >Back to Docs</a
        >
      </nav>
    </header>
    <div class="api-reference-container">
      <ApiReference
        :configuration="{
          url: '/api/scalekit.swagger.json',
          theme: 'saturn',
          hideTestRequestButton: true,
          hideModels: true,
          hideDarkModeToggle: true,
          defaultOpenAllTags: true,
          hiddenClients: [
            'httpclient',
            'restsharp',
            'native',
            'http1.1',
            'asynchttp',
            'okhttp',
            'unirest',
            'jquery',
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
            'restmethod',
            'httr',
            'native',
            'httpie',
            'wget',
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
