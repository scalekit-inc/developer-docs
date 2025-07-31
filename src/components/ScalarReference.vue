<script setup lang="ts">
import { ApiReference } from '@scalar/api-reference'
import '@scalar/api-reference/style.css'
import '@fontsource-variable/inter'
import '@/styles/api-reference.css'
import { onMounted, onUnmounted, ref, computed } from 'vue'

// Makes sure selected language is propagated elsewhere to all snippets
import { createDropdownSynchronizer } from '../utils/dropdownSync'
// Import theme synchronization
import { initializeThemeSync, type ThemeSynchronizer } from '../utils/themeSync'

// Create dropdown synchronizer instance
const dropdownSync = createDropdownSynchronizer()

// Reactive color mode tracking
const colorMode = ref<string>('light')

// Computed logo path based on color mode
const logoPath = computed(() => {
  return colorMode.value === 'dark'
    ? '/assets/logos/scalekit-api-black.svg'
    : '/assets/logos/scalekit-api-white.svg'
})

// Initialize theme synchronization
let themeSyncInstance: ThemeSynchronizer | null = null

onMounted(() => {
  // Initialize dropdown synchronization
  dropdownSync.initialize()

  // Initialize theme synchronization with callback
  themeSyncInstance = initializeThemeSync({
    onThemeChange: (theme: 'light' | 'dark') => {
      console.log('Theme changed to:', theme)
      colorMode.value = theme
    },
  })

  // Set initial color mode from synchronized theme
  const initialTheme = themeSyncInstance.getStarlightTheme()
  console.log('Initial theme detected:', initialTheme)
  colorMode.value = initialTheme

  // Also listen for manual data-theme attribute changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        const newTheme = document.documentElement.getAttribute('data-theme')
        console.log('Data-theme attribute changed to:', newTheme)
        if (newTheme === 'dark' || newTheme === 'light') {
          colorMode.value = newTheme
        }
      }
    })
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  // Store observer for cleanup
  ;(window as any).__scalarThemeObserver = observer
})

onUnmounted(() => {
  // Clean up dropdown synchronization
  dropdownSync.destroy()

  // Clean up theme synchronization
  if (themeSyncInstance) {
    themeSyncInstance.destroy()
  }

  // Clean up observer
  if ((window as any).__scalarThemeObserver) {
    ;(window as any).__scalarThemeObserver.disconnect()
    delete (window as any).__scalarThemeObserver
  }
})
</script>

<template>
  <div class="api-reference-wrapper" :class="colorMode + '-mode'">
    <div class="api-reference-container">
      <ApiReference
        :configuration="{
          url: '/api/scalekit.swagger.json',
          hideTestRequestButton: true,
          theme: 'default', // Changed from 'modern' to 'default' to match allowed values
          hideModels: true,
          searchHotKey: 'p',
          hideDarkModeToggle: true, // Hide Scalar's own toggle since we're using Starlight's
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
