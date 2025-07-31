// Theme synchronization utility for Starlight and Scalar API Reference

export interface ThemeSyncOptions {
  starlightKey?: string
  scalarKey?: string
  onThemeChange?: (theme: 'light' | 'dark') => void
}

export class ThemeSynchronizer {
  private starlightKey: string
  private scalarKey: string
  private onThemeChange?: (theme: 'light' | 'dark') => void
  private observer: MutationObserver | null = null
  private interval: number | null = null

  constructor(options: ThemeSyncOptions = {}) {
    // Use 'data-theme' as the localStorage key to match common patterns
    this.starlightKey = options.starlightKey || 'data-theme'
    this.scalarKey = options.scalarKey || 'colorMode'
    this.onThemeChange = options.onThemeChange
    console.log('ThemeSynchronizer initialized with keys:', {
      starlightKey: this.starlightKey,
      scalarKey: this.scalarKey,
    })
  }

  // Get current theme from Starlight
  getStarlightTheme(): 'light' | 'dark' {
    // Log current state for debugging
    const htmlElement = document.documentElement
    const dataTheme = htmlElement.getAttribute('data-theme')
    const classList = Array.from(htmlElement.classList)
    const localStorageTheme = localStorage.getItem(this.starlightKey)
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

    console.log('Current theme state:', {
      dataTheme,
      classList,
      localStorageTheme,
      systemPreference,
      htmlClasses: htmlElement.className,
    })

    // Check Starlight's theme classes first
    if (htmlElement.classList.contains('theme-dark')) {
      console.log('Theme detected from class: dark')
      return 'dark'
    }
    if (htmlElement.classList.contains('theme-light')) {
      console.log('Theme detected from class: light')
      return 'light'
    }

    // Check data-theme attribute
    if (dataTheme === 'dark' || dataTheme === 'light') {
      console.log('Theme detected from data-theme:', dataTheme)
      return dataTheme
    }

    // Check localStorage
    if (localStorageTheme === 'dark' || localStorageTheme === 'light') {
      console.log('Theme detected from localStorage:', localStorageTheme)
      return localStorageTheme
    }

    // Fall back to system preference
    console.log('Theme detected from system preference:', systemPreference)
    return systemPreference
  }

  // Sync theme from Starlight to Scalar
  private syncToScalar(theme: 'light' | 'dark') {
    console.log('Syncing theme to Scalar:', theme)
    localStorage.setItem(this.scalarKey, theme)
    if (this.onThemeChange) {
      this.onThemeChange(theme)
    }
  }

  // Start watching for theme changes
  start() {
    console.log('Starting theme synchronization')

    // Set initial theme
    const initialTheme = this.getStarlightTheme()
    console.log('Initial theme:', initialTheme)
    this.syncToScalar(initialTheme)

    // Watch for DOM changes on html element
    this.observer = new MutationObserver((mutations) => {
      console.log('MutationObserver triggered with mutations:', mutations.length)

      mutations.forEach((mutation) => {
        console.log('Mutation details:', {
          type: mutation.type,
          attributeName: mutation.attributeName,
          target: mutation.target,
          oldValue: mutation.oldValue,
        })

        if (mutation.type === 'attributes') {
          if (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class') {
            const newTheme = this.getStarlightTheme()
            console.log('Theme change detected via MutationObserver:', newTheme)
            this.syncToScalar(newTheme)
          }
        }
      })
    })

    // Observe the HTML element for attribute and class changes
    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
      attributeOldValue: true,
    })

    // Also listen for storage events (for cross-tab sync)
    window.addEventListener('storage', (e) => {
      console.log('Storage event:', e)
      if (e.key === this.starlightKey && (e.newValue === 'light' || e.newValue === 'dark')) {
        console.log('Theme change detected via storage event:', e.newValue)
        this.syncToScalar(e.newValue)
      }
    })

    // Polling fallback to catch any missed changes
    this.interval = window.setInterval(() => {
      const currentTheme = this.getStarlightTheme()
      const scalarTheme = localStorage.getItem(this.scalarKey)

      if (currentTheme !== scalarTheme) {
        console.log('Theme drift detected via polling:', {
          starlight: currentTheme,
          scalar: scalarTheme,
        })
        this.syncToScalar(currentTheme)
      }
    }, 500) // Check every 500ms

    console.log('Theme synchronization started')
  }

  // Stop watching for theme changes
  stop() {
    console.log('Stopping theme synchronization')

    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }

    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }

    console.log('Theme synchronization stopped')
  }
}

// Convenience function to initialize theme sync
export function initializeThemeSync(options: ThemeSyncOptions = {}): ThemeSynchronizer {
  const synchronizer = new ThemeSynchronizer(options)
  synchronizer.start()
  return synchronizer
}
