/**
 * SSR binder for chrome selection.
 * Algorithms live in chrome-selection.js. This file attaches the live
 * sidebar table so getActiveSecondaryNavId / isCurrentPage keep today's
 * SSR behavior. Do not call these from the client rematch path.
 */
import { sidebar, sidebarToSecondaryNav } from '../configs/sidebar.config'
import type { NavItem } from '../configs/secondary-nav.config'
import {
  buildPathToSidebarMap,
  getActiveSecondaryNavId as resolveActiveSecondaryNavId,
  isCurrentPage as resolveIsCurrentPage,
  getDisplayLabel as resolveDisplayLabel,
} from './chrome-selection.js'

export {
  getActiveProduct,
  isSelfHostedPath,
  resolveNavMapping,
  matchCurrentByHrefPrefix,
  type SecondaryNavProps,
} from './chrome-selection.js'

// Bind the live sidebar table once for SSR. Client rematch does not use this map.
const pathToSidebarMap = buildPathToSidebarMap(sidebar)

export function getActiveSecondaryNavId(
  pathname: string,
  entry?: { data?: { topic?: string } },
  searchParams?: URLSearchParams,
): string | null {
  return resolveActiveSecondaryNavId(
    pathname,
    entry,
    searchParams,
    pathToSidebarMap,
    sidebarToSecondaryNav,
  )
}

export function isCurrentPage(
  pathname: string,
  item: NavItem,
  entry?: { data?: { topic?: string } },
  searchParams?: URLSearchParams,
): boolean {
  return resolveIsCurrentPage(
    pathname,
    item,
    entry,
    searchParams,
    pathToSidebarMap,
    sidebarToSecondaryNav,
  )
}

export function getDisplayLabel(
  pathname: string,
  item: NavItem,
  entry?: { data?: { topic?: string } },
  searchParams?: URLSearchParams,
): string {
  return resolveDisplayLabel(
    pathname,
    item,
    entry,
    searchParams,
    pathToSidebarMap,
    sidebarToSecondaryNav,
  )
}
