/**
 * Path matching utilities for SecondaryNav selection state
 * Handles path normalization, validation, and pattern matching
 */

export interface PatternConfig {
  patterns: string[]
  priority: number // Higher priority wins when patterns overlap
  isExact?: boolean // Only match exact paths
}

export interface SecondaryNavItem {
  id: string
  patterns: string[]
  priority: number
  isExact?: boolean
}

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
 * @param url - The URL to check
 * @returns True if external URL
 */
export function isExternalUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false
  }

  try {
    // Try to parse as URL - if it has a protocol, it's external
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    // If URL parsing fails, it's a relative path
    return false
  }
}

/**
 * Checks if a link is hash-only (used for dropdown triggers)
 * @param href - The href to check
 * @returns True if hash-only link
 */
export function isHashOnly(href: string): boolean {
  return href === '#'
}

/**
 * Checks if a pathname matches a pattern
 * @param pathname - The current page pathname (normalized)
 * @param pattern - The pattern to match against (normalized)
 * @param isExact - Whether to require exact match
 * @returns True if matches
 */
export function matchesPattern(
  pathname: string,
  pattern: string,
  isExact: boolean = false,
): boolean {
  const normalizedPath = normalizePath(pathname)
  const normalizedPattern = normalizePath(pattern)

  // Hash-only patterns never match
  if (normalizedPattern === '#') {
    return false
  }

  // Root path special handling - only exact match
  if (normalizedPattern === '/' && normalizedPath !== '/') {
    return false
  }

  // Exact match required
  if (isExact) {
    return normalizedPath === normalizedPattern
  }

  // Prefix match
  return normalizedPath === normalizedPattern || normalizedPath.startsWith(normalizedPattern + '/')
}

/**
 * Finds the best matching nav item for a given pathname
 * Uses priority and pattern specificity to determine best match
 * @param pathname - The current page pathname
 * @param navItems - Array of nav items with patterns and priorities
 * @returns The ID of the best matching nav item, or null
 */
export function findBestMatch(pathname: string, navItems: SecondaryNavItem[]): string | null {
  const normalizedPath = normalizePath(pathname)

  // Find all matching items
  const matches = navItems
    .filter((item) => {
      return item.patterns.some((pattern) => matchesPattern(normalizedPath, pattern, item.isExact))
    })
    .map((item) => {
      // Calculate specificity score for each matching pattern
      const matchingPatterns = item.patterns.filter((pattern) =>
        matchesPattern(normalizedPath, pattern, item.isExact),
      )

      // Use the longest matching pattern as specificity score
      const specificity = Math.max(...matchingPatterns.map((p) => normalizePath(p).length))

      return {
        id: item.id,
        priority: item.priority,
        specificity,
      }
    })

  if (matches.length === 0) {
    return null
  }

  // Sort by priority (desc), then specificity (desc)
  matches.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority
    }
    return b.specificity - a.specificity
  })

  return matches[0].id
}

/**
 * Validates a pattern configuration at build time
 * @param patterns - Array of patterns to validate
 * @returns Array of validation warnings
 */
export function validatePatterns(patterns: string[]): string[] {
  const warnings: string[] = []

  patterns.forEach((pattern) => {
    // Check for external URLs in patterns
    if (isExternalUrl(pattern)) {
      warnings.push(`Pattern "${pattern}" is an external URL and will never match`)
    }

    // Check for patterns without leading slash
    if (pattern !== '#' && !pattern.startsWith('/') && !isExternalUrl(pattern)) {
      warnings.push(`Pattern "${pattern}" should start with "/" for consistency`)
    }

    // Check for glob patterns that need conversion
    if (pattern.includes('*')) {
      warnings.push(`Pattern "${pattern}" contains glob syntax - use prefix patterns instead`)
    }
  })

  return warnings
}

/**
 * Converts glob patterns to prefix patterns for matching
 * @param pattern - Glob pattern (e.g., "/authenticate/\*\*\/\*")
 * @returns Prefix pattern (e.g., "/authenticate")
 */
export function globToPrefix(pattern: string): string {
  // Remove trailing /** or /**/* for prefix matching
  return pattern.replace(/\/\*\*\/?\*?$/, '')
}

/**
 * Determines which topic a pathname belongs to based on glob pattern matching
 * Uses specificity-based matching: more specific patterns win over general ones
 * @param pathname - The current page pathname
 * @param topics - The topics configuration object from sidebar.config.ts
 * @returns The topic key, or null if no match
 */
export function getTopicForPath(pathname: string, topics: Record<string, string[]>): string | null {
  const normalizedPath = normalizePath(pathname)

  // Find all matching topics with their most specific pattern
  const matches: Array<{ topic: string; specificity: number }> = []

  for (const [topicKey, patterns] of Object.entries(topics)) {
    // Skip special keys like 'exclude'
    if (topicKey === 'exclude') continue

    // Find the most specific matching pattern for this topic
    let maxSpecificity = -1

    for (const pattern of patterns) {
      // Convert glob pattern to prefix for matching
      const prefixPattern = globToPrefix(pattern)

      if (matchesPattern(normalizedPath, prefixPattern, false)) {
        // Specificity = length of the pattern (longer = more specific)
        const specificity = prefixPattern.length
        if (specificity > maxSpecificity) {
          maxSpecificity = specificity
        }
      }
    }

    if (maxSpecificity > -1) {
      matches.push({ topic: topicKey, specificity: maxSpecificity })
    }
  }

  if (matches.length === 0) {
    return null
  }

  // Sort by specificity (descending) and return the most specific match
  matches.sort((a, b) => b.specificity - a.specificity)
  return matches[0].topic
}
