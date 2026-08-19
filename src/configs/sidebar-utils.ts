/**
 * Sidebar visual helpers. Path-to-sidebar lookup lives in chrome-selection
 * (SSR tab selection). Do not add chrome selection rules here.
 */

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

/**
 * Creates blank spacing in the sidebar
 * @returns A sidebar item configured as visual spacing
 * @example
 * ```ts
 * {
 *   label: 'User authentication',
 *   items: [...]
 * },
 * createSpacing(),
 * {
 *   label: 'Authorization',
 *   items: [...]
 * }
 * ```
 */
export function createSpacing() {
  return {
    label: '',
    link: '#',
    attrs: {
      'data-separator': 'spacing',
      class: 'sidebar-spacing',
      'aria-hidden': 'true',
      tabindex: '-1',
    },
  }
}
