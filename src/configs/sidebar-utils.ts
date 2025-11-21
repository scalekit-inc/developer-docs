/**
 * Sidebar Utilities
 * Helper functions for creating custom sidebar elements
 */

/**
 * Creates a horizontal divider in the sidebar
 * @returns A sidebar item configured as a visual separator
 * @example
 * ```ts
 * {
 *   label: 'User authentication',
 *   items: [...]
 * },
 * createDivider(),
 * {
 *   label: 'Authorization',
 *   items: [...]
 * }
 * ```
 */
export function createDivider() {
  return {
    label: '',
    link: '#',
    attrs: {
      'data-separator': 'divider',
      class: 'sidebar-divider',
      'aria-hidden': 'true',
      tabindex: '-1',
    },
  }
}

/**
 * Creates an uppercase section header in the sidebar
 * @param label - The text to display (will be automatically uppercased in CSS)
 * @returns A sidebar item configured as a section header
 * @example
 * ```ts
 * createSectionHeader('ESSENTIALS'),
 * {
 *   label: 'User authentication',
 *   items: [...]
 * }
 * ```
 */
export function createSectionHeader(label: string) {
  return {
    label,
    link: '#',
    attrs: {
      'data-separator': 'section-header',
      class: 'sidebar-section-header',
      'aria-hidden': 'true',
      tabindex: '-1',
    },
  }
}
