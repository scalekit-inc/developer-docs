<script setup lang="ts">
import { ApiReference } from '@scalar/api-reference'
import '@fontsource-variable/inter'
import '@/styles/api-reference.css'
import { onMounted, onUnmounted, ref } from 'vue'
import { initializeThemeSync, type ThemeSynchronizer } from '../utils/themeSync'

// Reactive color mode tracking
const colorMode = ref<string>('light')

// Hash tracking
const hash = ref('')

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

  // Set initial hash
  hash.value = window.location.hash.substring(1)

  // Listen for hash changes to handle deep links
  window.addEventListener('hashchange', () => {
    hash.value = window.location.hash.substring(1)
    console.log('hash changed to:', hash.value)

    // If Scalar is already loaded, scroll immediately
    // If not loaded yet, the onLoaded callback will handle it
    if (document.querySelector('.api-reference-container')) {
      handleDeepLink()
    }
  })
})

onUnmounted(() => {
  // Clean up theme synchronization
  if (themeSyncInstance) {
    themeSyncInstance.stop()
    themeSyncInstance = null
  }
})

// Function to get clean, decoded hash
const getCleanHash = () => {
  const rawHash = window.location.hash.substring(1)
  // Decode any URL encoding
  const decodedHash = decodeURIComponent(rawHash)
  console.log('Raw hash:', rawHash)
  console.log('Decoded hash:', decodedHash)
  return decodedHash
}

// Function to handle scrolling to hash element
const handleScrollToHash = (href?: string) => {
  // Use provided href or fall back to current hash
  const targetId = href || hash.value

  if (targetId) {
    console.log('scrolling to element with id:', targetId)
    const element = document.getElementById(targetId)
    console.log('scrolling to element', element)
    element?.scrollIntoView({ behavior: 'smooth' })
  }
}

// Function to handle initial hash navigation when Scalar loads
const handleInitialLoad = () => {
  console.log('Scalar loaded, checking for hash:', hash.value)

  if (hash.value) {
    // Wait a bit for Scalar to fully render the DOM
    setTimeout(() => {
      console.log('waited for 5000ms')
      const cleanHash = getCleanHash()
      handleScrollToHash(cleanHash)
    }, 2500)
  }
}

// Function to handle deep link navigation
const handleDeepLink = () => {
  if (hash.value) {
    const cleanHash = getCleanHash()
    console.log('handling deep link:', cleanHash)
    handleScrollToHash(cleanHash)
  }
}
</script>

<template>
  <div class="api-reference-wrapper" :class="colorMode + '-mode'">
    <div class="api-reference-container">
      <ApiReference
        :configuration="{
          url: '/api/scalekit.swagger.json',
          onLoaded: handleInitialLoad,
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
