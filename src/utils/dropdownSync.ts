/**
 * Utility for synchronizing language dropdowns in Scalar API Reference
 * Provides efficient dropdown synchronization without performance issues
 */

export class DropdownSynchronizer {
  private isUpdating = false
  private observer: MutationObserver | null = null
  private handleDropdownChange: (event: Event) => void

  constructor() {
    this.handleDropdownChange = this.createChangeHandler()
  }

  /**
   * Creates the change event handler for dropdown synchronization
   */
  private createChangeHandler() {
    return (event: Event) => {
      const target = event.target as HTMLSelectElement

      // Only handle our language dropdowns
      if (
        target.tagName === 'SELECT' &&
        target.getAttribute('aria-controls')?.includes('-example')
      ) {
        this.syncDropdowns(target.value, target)
      }
    }
  }

  /**
   * Efficiently syncs all language dropdowns without triggering cascading events
   */
  private syncDropdowns(sourceValue: string, sourceElement: HTMLSelectElement) {
    if (this.isUpdating) return

    this.isUpdating = true

    // Find all language dropdowns and update them silently
    const dropdowns = document.querySelectorAll(
      'select[aria-controls*="-example"]',
    ) as NodeListOf<HTMLSelectElement>

    dropdowns.forEach((dropdown) => {
      if (dropdown !== sourceElement && dropdown.value !== sourceValue) {
        // Check if the option exists in this dropdown
        const optionExists = Array.from(dropdown.options).some(
          (option) => option.value === sourceValue,
        )
        if (optionExists) {
          dropdown.value = sourceValue
          // Manually trigger the Scalar component's internal update without firing change event
          dropdown.dispatchEvent(new Event('input', { bubbles: true }))
        }
      }
    })

    // Use requestAnimationFrame to ensure DOM updates are complete
    requestAnimationFrame(() => {
      this.isUpdating = false
    })
  }

  /**
   * Sets up lightweight observer that only watches for new dropdowns
   */
  private setupObserver() {
    this.observer = new MutationObserver((mutations) => {
      let hasNewDropdowns = false

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              const element = node as Element
              if (
                element.matches?.('select[aria-controls*="-example"]') ||
                element.querySelector?.('select[aria-controls*="-example"]')
              ) {
                hasNewDropdowns = true
              }
            }
          })
        }
      })

      // Only log when new dropdowns are detected (for debugging)
      if (hasNewDropdowns) {
        console.log('New language dropdowns detected')
      }
    })

    // Only observe the API reference container, not the entire document
    const container = document.querySelector('.api-reference-container')
    if (container) {
      this.observer.observe(container, {
        childList: true,
        subtree: true,
      })
    }
  }

  /**
   * Initializes the dropdown synchronization
   */
  public initialize() {
    // Use event delegation - single listener on document
    document.addEventListener('change', this.handleDropdownChange)

    // Set up lightweight observer after Scalar loads
    setTimeout(() => {
      this.setupObserver()
    }, 1000)
  }

  /**
   * Cleans up all event listeners and observers
   */
  public destroy() {
    // Clean up event listener
    document.removeEventListener('change', this.handleDropdownChange)

    // Clean up observer
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }

    // Reset state
    this.isUpdating = false
  }
}

/**
 * Factory function for creating a dropdown synchronizer instance
 */
export const createDropdownSynchronizer = () => new DropdownSynchronizer()
