<script setup lang="ts">
import { ApiReference } from '@scalar/api-reference'
import '@fontsource-variable/inter'
import '@/styles/api-reference.css'
import { onMounted, onUnmounted, ref } from 'vue'
import { initializeThemeSync, type ThemeSynchronizer } from '../utils/themeSync'

// Reactive color mode tracking
const colorMode = ref<string>('light')

// Initialize theme synchronization
let themeSyncInstance: ThemeSynchronizer | null = null

onMounted(async () => {
  console.log('ScalarReference component mounted, initializing theme sync...')

  // Initialize theme synchronization
  themeSyncInstance = initializeThemeSync({
    onThemeChange: (theme: 'light' | 'dark') => {
      colorMode.value = theme
    },
  })

  // Set initial color mode from synchronized theme
  const initialTheme = themeSyncInstance.getStarlightTheme()
  colorMode.value = initialTheme
})

onUnmounted(() => {
  // Clean up theme synchronization
  if (themeSyncInstance) {
    themeSyncInstance.stop()
    themeSyncInstance = null
  }
})
</script>

<template>
  <div class="api-reference-wrapper" :class="colorMode + '-mode'">
    <div class="api-reference-container">
      <ApiReference
        :configuration="{
          url: '/api/scalekit.swagger.json',
          isLoading: true,
          hideTestRequestButton: true,
          withDefaultFonts: false,
          theme: 'default', // Changed from 'modern' to 'default' to match allowed values
          hideModels: true,
          searchHotKey: 'p',
          hideDarkModeToggle: true, // Hide Scalar's own toggle since we're using Starlight's
          defaultOpenAllTags: false,
          hiddenClients: [
            'httpclient',
            'restsharp',
            'http1.1',
            'asynchttp',
            'okhttp',
            'jquery',
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
            'httpie',
            'wget',
            'undici',
            'requests',
            'python3',
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
.api-reference-container {
  position: sticky;
  top: calc(var(--sl-header-height-base) + var(--secondary-nav-height));
  left: 0;
  right: 0;
  max-height: calc(100vh - var(--sl-nav-height));
  overflow: auto;
}
</style>
