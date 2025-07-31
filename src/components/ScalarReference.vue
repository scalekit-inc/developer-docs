<script setup lang="ts">
import { ApiReference } from '@scalar/api-reference'
import '@scalar/api-reference/style.css'
import '@fontsource-variable/inter'
import '@/styles/api-reference.css'
import { onMounted, onUnmounted, ref, computed } from 'vue'

// Makes sure selected lanugage is propagated else where to all snippets
import { createDropdownSynchronizer } from '@/utils/dropdownSync'

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

// Function to update color mode from localStorage and system preference
const updateColorMode = () => {
  const savedColorMode = localStorage.getItem('colorMode')

  if (savedColorMode) {
    colorMode.value = savedColorMode
  } else {
    // Check system preference or document theme
    const isDarkMode =
      window.matchMedia('(prefers-color-scheme: dark)').matches ||
      document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-color-mode') === 'dark'

    colorMode.value = isDarkMode ? 'dark' : 'light'
  }
}

// Listen for storage changes (when color mode is changed)
const handleStorageChange = (e: StorageEvent) => {
  if (e.key === 'colorMode') {
    colorMode.value = e.newValue || 'light'
  }
}

onMounted(() => {
  // Initialize dropdown synchronization
  dropdownSync.initialize()

  // Set initial color mode
  updateColorMode()

  // Listen for localStorage changes
  window.addEventListener('storage', handleStorageChange)

  // Also listen for direct localStorage updates within the same tab
  // Create a MutationObserver to watch for DOM changes that might indicate color mode changes
  const observer = new MutationObserver(() => {
    const currentMode = localStorage.getItem('colorMode')
    if (currentMode && currentMode !== colorMode.value) {
      colorMode.value = currentMode
    }
  })

  // Observe changes to the document body or html element classes/attributes
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-color-mode'],
  })

  // Store observer for cleanup
  ;(window as any).__colorModeObserver = observer

  // Periodically check localStorage as a fallback
  const interval = setInterval(updateColorMode, 1000)
  ;(window as any).__colorModeInterval = interval
})

onUnmounted(() => {
  // Clean up dropdown synchronization
  dropdownSync.destroy()

  // Clean up event listeners
  window.removeEventListener('storage', handleStorageChange)

  // Clean up observer
  if ((window as any).__colorModeObserver) {
    ;(window as any).__colorModeObserver.disconnect()
    delete (window as any).__colorModeObserver
  }

  // Clean up interval
  if ((window as any).__colorModeInterval) {
    clearInterval((window as any).__colorModeInterval)
    delete (window as any).__colorModeInterval
  }
})
</script>

<template>
  <div class="api-reference-wrapper">
    <div class="api-reference-container">
      <ApiReference
        :configuration="{
          url: '/api/scalekit.swagger.json',
          hideTestRequestButton: true,
          theme: 'modern',
          hideModels: true,
          searchHotKey: 'p',
          hideDarkModeToggle: false,
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
