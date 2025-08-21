<script setup lang="ts">
import { ApiReference } from '@scalar/api-reference'
import '@scalar/api-reference/style.css'
import '@fontsource-variable/inter'
import '@/styles/api-reference.css'
import { onMounted, onUnmounted, ref, computed } from 'vue'

// Makes sure selected lanugage is propagated else where to all snippets
import { createDropdownSynchronizer } from '../utils/dropdownSync'

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

// Handle initial URL navigation once Scalar is ready
const handleInitialUrl = () => {
  // Check if there's a hash in the URL that needs navigation
  const currentHash = window.location.hash
  if (currentHash) {
    // Decode the hash if it contains encoded characters
    try {
      const decodedHash = decodeURIComponent(currentHash)
      if (decodedHash !== currentHash) {
        // Update the URL with decoded version
        const newUrl = window.location.pathname + window.location.search + decodedHash
        window.history.replaceState(null, '', newUrl)

        // Trigger Scalar's internal navigation to the decoded hash
        // This ensures both sidebar and main content are properly synchronized
        setTimeout(() => {
          // Fire a hashchange event to trigger Scalar's navigation
          window.dispatchEvent(
            new HashChangeEvent('hashchange', {
              oldURL: window.location.href,
              newURL: newUrl,
            }),
          )
        }, 100) // Small delay to ensure URL update is processed
      }
    } catch (error) {
      console.warn('Failed to decode URL hash:', error)
    }
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

  // Watch for Scalar to be fully ready and then handle initial URL navigation
  let scalarReady = false
  const scalarObserver = new MutationObserver(() => {
    // Check if Scalar has rendered its main content
    const scalarContent = document.querySelector('.scalar-api-reference')
    if (scalarContent && !scalarReady) {
      scalarReady = true
      // Give Scalar a moment to fully initialize its navigation system
      setTimeout(() => {
        // Now we can safely handle URL navigation
        handleInitialUrl()
      }, 300)
    }
  })

  // Observe the entire document for changes
  scalarObserver.observe(document.body, {
    childList: true,
    subtree: true,
  })

  // Store observer for cleanup
  ;(window as any).__scalarObserver = scalarObserver
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

  // Clean up Scalar observer
  if ((window as any).__scalarObserver) {
    ;(window as any).__scalarObserver.disconnect()
    delete (window as any).__scalarObserver
  }
})
</script>

<template>
  <div class="api-reference-wrapper">
    <header class="custom-header scalar-app">
      <!-- <a
        href="https://docs.scalekit.com"
        style="text-decoration: none"
        target="_blank"
        rel="noopener noreferrer"
        >Scalekit API Reference</a> -->
      <a href="https://docs.scalekit.com" aria-label="Scalekit API Reference">
        <img :src="logoPath" alt="Scalekit API Reference" height="32" />
        <span class="sr-only">Scalekit API Reference</span>
      </a>
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
          hideDarkModeToggle: false,
          defaultOpenAllTags: true,
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
