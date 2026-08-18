/**
 * Path helpers used by live sidebar and secondary-nav lookup.
 * Keep normalizePath and isHashOnly. Do not add selection rules here.
 */

/**
 * Normalizes a path by removing trailing slashes and ensuring leading slash
 * @param path - The path to normalize
 * @returns Normalized path
 */
export function normalizePath(path: string): string {
  if (!path || typeof path !== 'string') {
    return '/'
  }

  // Handle hash-only links
  if (path === '#') {
    return '#'
  }

  // Don't normalize external URLs
  if (isExternalUrl(path)) {
    return path
  }

  // Ensure leading slash
  let normalized = path.startsWith('/') ? path : `/${path}`

  // Remove trailing slash (except for root path)
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }

  return normalized
}

/**
 * Checks if a URL is external (absolute URL)
 */
function isExternalUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false
  }

  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Checks if a link is hash-only (used for dropdown triggers)
 */
export function isHashOnly(href: string): boolean {
  return href === '#'
}
