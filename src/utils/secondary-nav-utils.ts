import { sidebar, sidebarToSecondaryNav, type SecondaryNavMapping } from '../configs/sidebar.config'
import { buildPathToSidebarMap, getSidebarIdForPath } from '../configs/sidebar-utils'
import { isHashOnly, normalizePath } from './path-matching'
import type { NavItem } from '../configs/secondary-nav.config'
import { IconLucideLayoutGrid } from './icon-map'

// Props interface - entry is passed from Header.astro
export interface SecondaryNavProps {
  entry?: {
    data: {
      topic?: string
    }
  }
}

// Build the path-to-sidebar map once at render time
const pathToSidebarMap = buildPathToSidebarMap(sidebar)

/**
 * Resolves a SecondaryNavMapping to an actual nav item ID
 * Handles both simple string mappings and complex path-override mappings
 */
export function resolveNavMapping(mapping: SecondaryNavMapping, pathname: string): string | null {
  if (typeof mapping === 'string') {
    return mapping
  }

  // Check path overrides for more specific matches
  if (mapping.pathOverrides) {
    const normalizedPath = normalizePath(pathname)
    for (const [prefix, navId] of Object.entries(mapping.pathOverrides)) {
      const normalizedPrefix = normalizePath(prefix)
      if (
        normalizedPath.startsWith(normalizedPrefix + '/') ||
        normalizedPath === normalizedPrefix
      ) {
        return navId
      }
    }
  }

  return mapping.default || null
}

/**
 * Determines which secondary nav item should be active for the current pathname
 * Uses a sidebar-based approach:
 * 1. First, check explicit topic from page frontmatter
 * 2. Then, look up which sidebar the page belongs to from the sidebar config
 * 3. Map the sidebar ID to a SecondaryNav item using sidebarToSecondaryNav
 */
export function getActiveSecondaryNavId(
  pathname: string,
  entry?: SecondaryNavProps['entry'],
): string | null {
  // 1. First check explicit topic from page frontmatter
  if (entry?.data?.topic) {
    const mapping = sidebarToSecondaryNav[entry.data.topic]
    if (mapping) {
      return resolveNavMapping(mapping, pathname)
    }
  }

  // 2. Fall back to path-based sidebar lookup
  const sidebarId = getSidebarIdForPath(pathname, pathToSidebarMap)

  if (sidebarId && sidebarToSecondaryNav[sidebarId]) {
    return resolveNavMapping(sidebarToSecondaryNav[sidebarId], pathname)
  }

  // 3. Hard-coded fallbacks for pages without a sidebar (e.g. Scalar /apis)
  if (pathname.startsWith('/apis')) {
    return 'rest-apis'
  }

  // 4. Default fallback for root path or unmatched pages
  if (pathname === '/' || pathname === '') {
    return 'home' // Home page should select the Home nav item
  }

  return null
}

/**
 * Determines if a nav item should be marked as current based on the pathname
 */
export function isCurrentPage(pathname: string, item: NavItem): boolean {
  const activeId = getActiveSecondaryNavId(pathname)

  // For dropdown parent items, check if any child is current
  if (item.children && item.children.length > 0) {
    const childIsCurrent = item.children.some((child) => child.id === activeId)
    if (childIsCurrent) return true
  }

  // Hash-only links (dropdown triggers) are never current on their own
  if (isHashOnly(item.href)) {
    return false
  }

  // Check if this item's ID matches the active nav ID
  return activeId === item.id
}

export function getDisplayLabel(pathname: string, item: NavItem): string {
  // Special case: Show "Choose a solution" for authenticate nav item when on home page
  if (item.id === 'authenticate' && (pathname === '/' || pathname === '')) {
    return 'Choose a module'
  }

  if (item.children && item.children.length > 0) {
    const activeChild = item.children.find((child) => isCurrentPage(pathname, child))
    // For right column items (Full-stack Auth shortcuts), always use parent label
    if (activeChild && activeChild.columnGroup === 'right') {
      return item.label
    }
    // For left column items (Modular Auth), use child label
    if (activeChild) return activeChild.label
  }
  return item.label
}

export function getDisplayIcon(pathname: string, item: NavItem): any {
  // Special case: Show IconLucideLayoutGrid for authenticate nav item when on home page
  if (item.id === 'authenticate' && (pathname === '/' || pathname === '')) {
    return IconLucideLayoutGrid
  }

  if (item.children && item.children.length > 0) {
    const activeChild = item.children.find((child) => isCurrentPage(pathname, child))
    // For right column items (Full-stack Auth shortcuts), always use parent icon
    if (activeChild && activeChild.columnGroup === 'right') {
      return item.iconComponent
    }
    // For left column items (Modular Auth), use child icon
    if (activeChild && activeChild.iconComponent) return activeChild.iconComponent
  }
  return item.iconComponent
}
