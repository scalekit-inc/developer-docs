// Client-side filtering logic for examples page

interface FilteringElements {
  toggleCheckboxes: NodeListOf<HTMLInputElement>
  resourceItems: NodeListOf<HTMLElement>
  categorySections: NodeListOf<HTMLElement>
  emptyState: HTMLElement | null
  resourcesContainer: HTMLElement | null
}

function initializeFiltering(): void {
  const elements: FilteringElements = {
    toggleCheckboxes: document.querySelectorAll('.toggle-checkbox'),
    resourceItems: document.querySelectorAll('.resource-item'),
    categorySections: document.querySelectorAll('[data-category-section]'),
    emptyState: document.querySelector('.empty-state'),
    resourcesContainer: document.querySelector('.resources-container'),
  }

  const activeFilters = new Set<string>()

  // Initialize all filters as active
  elements.toggleCheckboxes.forEach((checkbox) => {
    const filterType = checkbox.getAttribute('data-filter-type')
    if (filterType && checkbox.checked) {
      activeFilters.add(filterType)
    }
  })

  // Toggle filter on checkbox change
  elements.toggleCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const filterType = checkbox.getAttribute('data-filter-type')
      if (!filterType) return

      if (checkbox.checked) {
        activeFilters.add(filterType)
      } else {
        activeFilters.delete(filterType)
      }

      updateDisplay(elements, activeFilters)
    })
  })

  function updateDisplay(elements: FilteringElements, activeFilters: Set<string>): void {
    let visibleCount = 0

    // Show/hide resource items based on active filters
    elements.resourceItems.forEach((item) => {
      const filterTypesStr = item.getAttribute('data-filter-types')
      if (!filterTypesStr) return

      try {
        const itemFilterTypes: string[] = JSON.parse(filterTypesStr)
        const hasMatch = itemFilterTypes.some((type) => activeFilters.has(type))

        if (hasMatch || activeFilters.size === 0) {
          item.style.display = 'block'
          visibleCount++
        } else {
          item.style.display = 'none'
        }
      } catch (error) {
        console.warn('Failed to parse filter types:', filterTypesStr, error)
      }
    })

    // Keep all category sections visible, but handle empty categories gracefully
    // Don't hide category sections - users should see all categories even if empty after filtering
    elements.categorySections.forEach((section) => {
      section.style.display = 'block'
    })

    // Show/hide empty state
    if (visibleCount === 0 && elements.emptyState && elements.resourcesContainer) {
      elements.emptyState.style.display = 'block'
      elements.resourcesContainer.style.display = 'none'
    } else if (elements.emptyState && elements.resourcesContainer) {
      elements.emptyState.style.display = 'none'
      elements.resourcesContainer.style.display = 'block'
    }
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFiltering)
} else {
  initializeFiltering()
}
