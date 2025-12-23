/**
 * Helper to get the absolute latest release for a repo
 * @param releases - Array of release objects from the github-releases collection
 * @param repoName - Repository name in format "owner/repo"
 * @returns The latest release object or undefined if no releases found
 */
export function getLatestRelease(releases: any[], repoName: string): any | undefined {
  const repoReleases = releases
    .filter((release) => {
      const data = release.data as any
      return data.repoNameWithOwner === repoName
    })
    .map((release) => release.data as any)
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return dateB - dateA
    })

  return repoReleases.length > 0 ? repoReleases[0] : undefined
}

/**
 * Helper to format a date string as "X days/weeks/months/years ago"
 * @param dateString - ISO date string
 * @returns Formatted time ago string or empty string if no date provided
 */
export function formatTimeAgo(dateString: string): string {
  if (!dateString) return ''

  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`

  const weeks = Math.floor(diffDays / 7)
  if (diffDays < 30) return `${weeks} week${weeks === 1 ? '' : 's'} ago`

  const months = Math.floor(diffDays / 30)
  if (diffDays < 365) return `${months} month${months === 1 ? '' : 's'} ago`

  const years = Math.floor(diffDays / 365)
  return `${years} year${years === 1 ? '' : 's'} ago`
}

/**
 * SDK configuration type
 */
export interface SDKConfig {
  title: string
  showTitle?: boolean
  icon: string
  href: string
  repo: string
  description: string
  features: string[]
  release?: any
}

/**
 * Get all SDK configurations with their latest releases
 * @param releases - Array of release objects from the github-releases collection
 * @returns Object containing SDK configurations keyed by SDK name
 */
export function getSDKConfigs(releases: any[]): Record<string, SDKConfig> {
  const nodeRelease = getLatestRelease(releases, 'scalekit-inc/scalekit-sdk-node')
  const pythonRelease = getLatestRelease(releases, 'scalekit-inc/scalekit-sdk-python')
  const goRelease = getLatestRelease(releases, 'scalekit-inc/scalekit-sdk-go')
  const javaRelease = getLatestRelease(releases, 'scalekit-inc/scalekit-sdk-java')

  return {
    node: {
      title: 'Node.js',
      showTitle: false,
      icon: 'nodejs',
      href: '/sdks/node/',
      repo: 'scalekit-inc/scalekit-sdk-node',
      description: 'Full-featured, TypeScript-friendly SDK for modern Node.js based applications',
      features: ['TypeScript & ESM ready', 'Express, NestJS, Next.js compatible'],
      release: nodeRelease,
    },
    python: {
      title: 'Python',
      icon: 'python',
      href: '/sdks/python/',
      repo: 'scalekit-inc/scalekit-sdk-python',
      description: 'Async-first design with complete type hints and Pydantic validation',
      features: ['Pydantic v2 validated', 'FastAPI, Django, Flask compatible'],
      release: pythonRelease,
    },
    go: {
      title: 'Go',
      icon: 'go',
      href: '/sdks/go/',
      repo: 'scalekit-inc/scalekit-sdk-go',
      description: 'Zero-dependency, idiomatic Go SDK for high-performance services',
      features: ['Thread-safe & lightweight', 'Gin, Echo, Chi compatible'],
      release: goRelease,
    },
    java: {
      title: 'Java',
      icon: 'java',
      href: '/sdks/java/',
      repo: 'scalekit-inc/scalekit-sdk-java',
      description: 'Enterprise-ready SDK with seamless Spring Boot integration',
      features: ['Spring Boot integrated', 'Maven Central published'],
      release: javaRelease,
    },
  }
}
