/**
 * Custom Astro content loader for fetching files from GitHub repositories
 * Similar to githubReleasesLoader but for fetching specific files like reference.md
 */

import type { Loader } from 'astro/loaders'

export interface GitHubFileConfig {
  /** Repository in format "owner/repo" */
  repo: string
  /** Path to file in repository (e.g., "reference.md") */
  path: string
  /** Unique identifier for this entry */
  id: string
  /** Git reference (branch/tag). Defaults to "main" */
  ref?: string
}

export interface GitHubFilesLoaderConfig {
  /** Array of files to fetch from GitHub */
  files: GitHubFileConfig[]
  /** GitHub token for authentication. Defaults to GITHUB_TOKEN env var */
  githubToken?: string
}

interface GitHubFileResponse {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
  content: string
  encoding: string
  _links: {
    self: string
    git: string
    html: string
  }
}

/**
 * Fetch file content from GitHub repository
 */
async function fetchFileFromGitHub(
  owner: string,
  repo: string,
  path: string,
  ref: string = 'main',
  token?: string,
): Promise<{ content: string; sha: string; htmlUrl: string } | null> {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}`

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'scalekit-docs-astro-github-files-loader',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(apiUrl, { headers })

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[github-files-loader] File not found: ${owner}/${repo}/${path} (ref: ${ref})`)
        return null
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = (await response.json()) as GitHubFileResponse

    // Decode base64 content
    const content = Buffer.from(data.content, 'base64').toString('utf-8')

    return {
      content,
      sha: data.sha,
      htmlUrl: data.html_url,
    }
  } catch (error) {
    console.error(
      `[github-files-loader] Failed to fetch ${owner}/${repo}/${path}:`,
      error instanceof Error ? error.message : error,
    )
    return null
  }
}

/**
 * GitHub files loader for Astro content collections
 */
export function githubFilesLoader(config: GitHubFilesLoaderConfig): Loader {
  return {
    name: 'github-files-loader',
    load: async ({ store, logger, generateDigest, renderMarkdown }) => {
      const token =
        config.githubToken || process.env.GITHUB_TOKEN || (import.meta as any).env?.GITHUB_TOKEN

      if (!token) {
        logger.warn(
          'No GitHub token provided. API rate limits may be restrictive. Set GITHUB_TOKEN environment variable.',
        )
      }

      logger.info(`Fetching ${config.files.length} files from GitHub repositories...`)

      // Clear existing entries
      store.clear()

      // Fetch all files in parallel
      const results = await Promise.all(
        config.files.map(async (fileConfig) => {
          const [owner, repo] = fileConfig.repo.split('/')
          const ref = fileConfig.ref || 'main'

          logger.info(`Fetching ${fileConfig.repo}/${fileConfig.path}...`)

          const result = await fetchFileFromGitHub(owner, repo, fileConfig.path, ref, token)

          if (!result) {
            logger.warn(
              `Skipping ${fileConfig.id}: file not found at ${fileConfig.repo}/${fileConfig.path}`,
            )
            return null
          }

          // Render markdown to HTML using Astro's built-in renderer
          const rendered = await renderMarkdown(result.content)

          return {
            id: fileConfig.id,
            data: {
              repo: fileConfig.repo,
              path: fileConfig.path,
              ref,
              sha: result.sha,
              htmlUrl: result.htmlUrl,
              lastFetched: new Date(),
            },
            rendered, // Store pre-rendered HTML so render() can use it
          }
        }),
      )

      // Store successfully fetched files
      const successfulResults = results.filter((r) => r !== null)

      for (const result of successfulResults) {
        if (result) {
          const digest = generateDigest(JSON.stringify(result.data) + result.rendered.html)
          store.set({
            id: result.id,
            data: result.data,
            rendered: result.rendered,
            digest,
          })
        }
      }

      logger.info(
        `Successfully loaded ${successfulResults.length} of ${config.files.length} files from GitHub`,
      )
    },
  }
}
