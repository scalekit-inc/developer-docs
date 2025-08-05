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
  }

  // Get current theme from Starlight
  getStarlightTheme(): 'light' | 'dark' {
    const htmlElement = document.documentElement
    const dataTheme = htmlElement.getAttribute('data-theme')
    const localStorageTheme = localStorage.getItem(this.starlightKey)
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

    // Check Starlight's theme classes first
    if (htmlElement.classList.contains('theme-dark')) {
      return 'dark'
    }
    if (htmlElement.classList.contains('theme-light')) {
      return 'light'
    }

    // Check data-theme attribute
    if (dataTheme === 'dark' || dataTheme === 'light') {
      return dataTheme
    }

    // Check localStorage
    if (localStorageTheme === 'dark' || localStorageTheme === 'light') {
      return localStorageTheme
    }

    // Fall back to system preference
    return systemPreference
  }

  // Sync theme from Starlight to Scalar
  private syncToScalar(theme: 'light' | 'dark') {
    localStorage.setItem(this.scalarKey, theme)
    if (this.onThemeChange) {
      this.onThemeChange(theme)
    }
  }

  // Start watching for theme changes
  start() {
    // Set initial theme
    const initialTheme = this.getStarlightTheme()
    this.syncToScalar(initialTheme)

    // Watch for DOM changes on html element
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          if (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class') {
            const newTheme = this.getStarlightTheme()
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
      if (e.key === this.starlightKey && (e.newValue === 'light' || e.newValue === 'dark')) {
        this.syncToScalar(e.newValue)
      }
    })

    // Polling fallback to catch any missed changes
    this.interval = window.setInterval(() => {
      const currentTheme = this.getStarlightTheme()
      const scalarTheme = localStorage.getItem(this.scalarKey)

      if (currentTheme !== scalarTheme) {
        this.syncToScalar(currentTheme)
      }
    }, 500) // Check every 500ms
  }

  // Stop watching for theme changes
  stop() {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }

    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }
}

// Convenience function to initialize theme sync
export function initializeThemeSync(options: ThemeSyncOptions = {}): ThemeSynchronizer {
  const synchronizer = new ThemeSynchronizer(options)
  synchronizer.start()
  return synchronizer
}
