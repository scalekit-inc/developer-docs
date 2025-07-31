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

  // Get current theme from Starlight - make this public so it can be accessed
  public getStarlightTheme(): 'light' | 'dark' {
    // Check data-theme attribute first
    const dataTheme = document.documentElement.getAttribute('data-theme')
    console.log('Current data-theme attribute:', dataTheme)

    if (dataTheme === 'dark' || dataTheme === 'light') {
      return dataTheme
    }

    // Check localStorage
    const storedTheme = localStorage.getItem(this.starlightKey)
    console.log('Stored theme in localStorage:', storedTheme)

    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme
    }

    // Check system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    console.log('System prefers dark mode:', systemPrefersDark)

    return systemPrefersDark ? 'dark' : 'light'
  }

  // Get current theme from Scalar
  private getScalarTheme(): 'light' | 'dark' {
    const storedTheme = localStorage.getItem(this.scalarKey)
    console.log('Scalar theme in localStorage:', storedTheme)

    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme
    }
    return 'light'
  }

  // Set theme for both systems
  setTheme(theme: 'light' | 'dark'): void {
    console.log('Setting theme to:', theme)

    // Set Starlight theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(this.starlightKey, theme)

    // Set Scalar theme
    localStorage.setItem(this.scalarKey, theme)

    // Trigger callback
    this.onThemeChange?.(theme)
  }

  // Sync themes between systems
  syncThemes(): void {
    const starlightTheme = this.getStarlightTheme()
    const scalarTheme = this.getScalarTheme()

    console.log('Syncing themes - Starlight:', starlightTheme, 'Scalar:', scalarTheme)

    // If they're different, use Starlight's theme as the source of truth
    if (starlightTheme !== scalarTheme) {
      console.log('Themes are different, syncing to Starlight theme:', starlightTheme)
      this.setTheme(starlightTheme)
    }
  }

  // Initialize synchronization
  initialize(): void {
    console.log('Initializing theme synchronization...')

    // Initial sync
    this.syncThemes()

    // Watch for Starlight theme changes via data-theme attribute
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark'
          console.log('MutationObserver detected data-theme change:', newTheme)

          if (newTheme && (newTheme === 'light' || newTheme === 'dark')) {
            // Update Scalar theme to match
            localStorage.setItem(this.scalarKey, newTheme)
            this.onThemeChange?.(newTheme)
          }
        }
      })
    })

    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    // Watch for localStorage changes (cross-tab synchronization)
    window.addEventListener('storage', this.handleStorageChange)

    // Periodic sync as fallback
    this.interval = window.setInterval(() => {
      this.syncThemes()
    }, 2000)

    console.log('Theme synchronization initialized successfully')
  }

  // Handle storage changes
  private handleStorageChange = (e: StorageEvent) => {
    console.log('Storage change detected:', e.key, '=', e.newValue)

    if (e.key === this.starlightKey && e.newValue) {
      const theme = e.newValue as 'light' | 'dark'
      if (theme === 'light' || theme === 'dark') {
        console.log('Updating from Starlight storage change:', theme)
        this.setTheme(theme)
      }
    } else if (e.key === this.scalarKey && e.newValue) {
      const theme = e.newValue as 'light' | 'dark'
      if (theme === 'light' || theme === 'dark') {
        console.log('Updating from Scalar storage change:', theme)
        // Update Starlight to match Scalar
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem(this.starlightKey, theme)
        this.onThemeChange?.(theme)
      }
    }
  }

  // Clean up resources
  destroy(): void {
    console.log('Destroying theme synchronization...')

    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }

    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }

    window.removeEventListener('storage', this.handleStorageChange)

    console.log('Theme synchronization destroyed')
  }
}

// Create and export a singleton instance
export const themeSync = new ThemeSynchronizer()

// Export a simple function for easy use
export function initializeThemeSync(options?: ThemeSyncOptions): ThemeSynchronizer {
  const synchronizer = new ThemeSynchronizer(options)
  synchronizer.initialize()
  return synchronizer
}
