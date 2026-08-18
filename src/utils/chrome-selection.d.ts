import type { NavItem } from '../configs/secondary-nav.config'
import type { SecondaryNavMapping } from '../configs/sidebar.config'

export const PRODUCT_STORAGE_KEY: 'sk-active-product'
export const SELF_HOSTED_COLD_DEFAULT_PRODUCT: 'agentkit'
export type DocsProduct = 'agentkit' | 'saaskit'

export function isDocsProduct(value: string | null | undefined): value is DocsProduct

export function isSelfHostedPath(pathname: string): boolean

export function getActiveProduct(
  pathname: string,
  topic?: string,
  searchParams?: URLSearchParams,
): DocsProduct

export interface SecondaryNavProps {
  entry?: {
    data: {
      topic?: string
    }
  }
}

export function buildPathToSidebarMap(sidebarConfig: unknown[]): Map<string, string>

export function getSidebarIdForPath(
  pathname: string,
  pathToSidebarMap: Map<string, string>,
): string | null

export function resolveNavMapping(mapping: SecondaryNavMapping, pathname: string): string | null

export function getActiveSecondaryNavId(
  pathname: string,
  entry?: SecondaryNavProps['entry'],
  searchParams?: URLSearchParams,
  pathToSidebarMap?: Map<string, string>,
  sidebarToSecondaryNav?: Record<string, SecondaryNavMapping>,
): string | null

export function isCurrentPage(
  pathname: string,
  item: NavItem,
  entry?: SecondaryNavProps['entry'],
  searchParams?: URLSearchParams,
  pathToSidebarMap?: Map<string, string>,
  sidebarToSecondaryNav?: Record<string, SecondaryNavMapping>,
): boolean

export function getDisplayLabel(
  pathname: string,
  item: NavItem,
  entry?: SecondaryNavProps['entry'],
  searchParams?: URLSearchParams,
  pathToSidebarMap?: Map<string, string>,
  sidebarToSecondaryNav?: Record<string, SecondaryNavMapping>,
): string

export function matchCurrentByHrefPrefix<T extends { href?: string | null }>(
  pathname: string,
  items: readonly T[],
): T | null
