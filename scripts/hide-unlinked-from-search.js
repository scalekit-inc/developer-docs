#!/usr/bin/env node

/**
 * Hide unlinked .mdx files from pagefind search
 *
 * This script finds all .mdx files that are not linked from the sidebar
 * and adds `pagefind: false` to their frontmatter to prevent them from
 * appearing in search results.
 *
 * Usage: node scripts/hide-unlinked-from-search.js
 */

const fs = require('fs')
const path = require('path')

// Configuration
const CONTENT_DIR = path.join(__dirname, '../src/content/docs')
const SIDEBAR_CONFIG = path.join(__dirname, '../src/configs/sidebar.config.ts')

// Read sidebar configuration
function getSidebarLinkedPaths() {
  const sidebarContent = fs.readFileSync(SIDEBAR_CONFIG, 'utf-8')

  // Extract all paths from sidebar config
  const paths = new Set()

  // Extract direct string paths (single quotes)
  const stringPaths = sidebarContent.match(/'([^']+)'/g) || []
  stringPaths.forEach((p) => {
    const cleanPath = p.replace(/'/g, '')
    if (cleanPath && !cleanPath.startsWith('http')) {
      paths.add(cleanPath)
    }
  })

  // Extract link properties
  const linkMatches = sidebarContent.match(/link:\s*['"`]([^'"`]+)['"`]/g) || []
  linkMatches.forEach((m) => {
    const path = m.match(/link:\s*['"`]([^'"`]+)['"`]/)[1]
    if (path && !path.startsWith('http')) {
      paths.add(path.replace(/^\//, ''))
    }
  })

  // Extract autogenerate directories
  const autogenMatches = sidebarContent.match(/directory:\s*['"`]([^'"`]+)['"`]/g) || []
  autogenMatches.forEach((m) => {
    const dir = m.match(/directory:\s*['"`]([^'"`]+)['"`]/)[1]
    if (dir) {
      // Add all files in this directory
      const dirPath = path.join(CONTENT_DIR, dir)
      if (fs.existsSync(dirPath)) {
        const files = getAllMdxFiles(dirPath)
        files.forEach((f) => {
          const relativePath = path.relative(CONTENT_DIR, f)
          paths.add(relativePath.replace('.mdx', ''))
        })
      }
    }
  })

  // Map autogenerate directories that exist
  const autogenDirs = [
    'reference/agent-connectors',
    'guides/integrations/social-connections',
    'guides/integrations/auth-systems',
    'guides/integrations/sso-integrations',
    'guides/integrations/scim-integrations',
  ]

  autogenDirs.forEach((dir) => {
    const dirPath = path.join(CONTENT_DIR, dir)
    if (fs.existsSync(dirPath)) {
      const files = getAllMdxFiles(dirPath)
      files.forEach((f) => {
        const relativePath = path.relative(CONTENT_DIR, f)
        paths.add(relativePath.replace('.mdx', ''))
      })
    }
  })

  return paths
}

// Get all MDX files recursively
function getAllMdxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      getAllMdxFiles(filePath, fileList)
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath)
    }
  })

  return fileList
}

// Extract frontmatter from file content
function extractFrontmatter(content) {
  const match = content.match(/^---\n(.*?)\n---/s)
  if (match) {
    return match[1]
  }
  return null
}

// Add pagefind: false to frontmatter
function addPagefindToFrontmatter(content) {
  // Check if pagefind already exists
  if (/pagefind:/i.test(content)) {
    return content // Already has pagefind setting
  }

  // Find frontmatter
  const frontmatterMatch = content.match(/^---\n(.*?)\n---/s)

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1]
    const restOfContent = content.slice(frontmatterMatch.index + frontmatterMatch[0].length)

    // Add pagefind: false at the end of frontmatter
    const newFrontmatter = frontmatter + '\npagefind: false'

    return `---\n${newFrontmatter}\n---${restOfContent}`
  } else {
    // No frontmatter, create one
    return `---\npagefind: false\n---\n\n${content}`
  }
}

// Main function
function main() {
  console.log('🔍 Finding unlinked .mdx files...\n')

  // Get all MDX files
  const allMdxFiles = getAllMdxFiles(CONTENT_DIR)
  console.log(`Found ${allMdxFiles.length} total .mdx files`)

  // Get paths linked from sidebar
  const linkedPaths = getSidebarLinkedPaths()
  console.log(`Found ${linkedPaths.size} paths linked from sidebar`)

  // Filter unlinked files (exclude index files)
  const unlinkedFiles = []
  allMdxFiles.forEach((filePath) => {
    const relativePath = path.relative(CONTENT_DIR, filePath)
    const pathWithoutExt = relativePath.replace('.mdx', '')

    // Skip index files
    if (pathWithoutExt.endsWith('/index')) {
      return
    }

    // Skip excluded patterns
    if (pathWithoutExt.startsWith('apis/')) {
      return
    }

    // Check if file is linked
    let isLinked = false

    // Direct match
    if (linkedPaths.has(pathWithoutExt)) {
      isLinked = true
    }

    // Check if file is in an autogenerate directory
    const autogenDirs = [
      'reference/agent-connectors',
      'guides/integrations/social-connections',
      'guides/integrations/auth-systems',
      'guides/integrations/sso-integrations',
      'guides/integrations/scim-integrations',
    ]

    for (const dir of autogenDirs) {
      if (pathWithoutExt.startsWith(dir)) {
        isLinked = true
        break
      }
    }

    if (!isLinked) {
      unlinkedFiles.push(filePath)
    }
  })

  console.log(`\n📋 Found ${unlinkedFiles.length} unlinked files\n`)

  // Update unlinked files
  let updatedCount = 0

  unlinkedFiles.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8')

    if (!/pagefind:/i.test(content)) {
      const newContent = addPagefindToFrontmatter(content)
      fs.writeFileSync(filePath, newContent, 'utf-8')

      const relativePath = path.relative(CONTENT_DIR, filePath)
      console.log(`✅ Added pagefind: false to ${relativePath}`)
      updatedCount++
    } else {
      const relativePath = path.relative(CONTENT_DIR, filePath)
      console.log(`⚪ Already has pagefind setting: ${relativePath}`)
    }
  })

  console.log(`\n✨ Done! Updated ${updatedCount} files with pagefind: false`)
}

// Run the script
if (require.main === module) {
  main()
}

module.exports = { main }
