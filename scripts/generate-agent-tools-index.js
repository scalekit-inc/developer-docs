#!/usr/bin/env node
/**
 * Generate compact tools search index from the committed agent connector data files.
 *
 * Produces:
 *   src/data/agent-connectors/tools-index.json
 *   public/data/agent-tools-index.json   (served statically for client-side fetch)
 *
 * The index contains minimal records: { slug, name, description }
 * Used by ProviderCatalog.astro to power cross-connector tool search.
 *
 * This script uses regex extraction on the generated .ts sources (deterministic format)
 * so it runs in plain Node without needing to execute TypeScript.
 *
 * It also runs Prettier on the output so generated files stay formatted.
 *
 * Run manually: node scripts/generate-agent-tools-index.js
 * Automatically kept fresh when running `pnpm sync-agent-connectors`.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.join(__dirname, '../src/data/agent-connectors')
const PUBLIC_DATA_DIR = path.join(__dirname, '../public/data')

function extractToolsFromSource(source) {
  const results = []
  // Only match top-level tool entries (name + description + params array).
  // This deliberately skips `name:` entries that live inside the params array.
  const toolRe = /name:\s*'([^']+)',\s*\n?\s*description:\s*`([\s\S]*?)`,\s*\n?\s*params:\s*\[/g
  let match
  while ((match = toolRe.exec(source)) !== null) {
    const name = match[1]
    let description = match[2] || ''
    // Truncate long descriptions for the search index payload (full text lives on the connector page)
    if (description.length > 280) {
      description = description.slice(0, 279) + '…'
    }
    results.push({ name, description })
  }
  return results
}

function main() {
  if (!fs.existsSync(DATA_DIR)) {
    console.error('❌ Data directory not found:', DATA_DIR)
    process.exit(1)
  }

  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('.ts') && f !== 'catalog.ts' && f !== 'tools-index.json')

  const index = []

  for (const file of files) {
    const slug = file.replace(/\.ts$/, '')
    const fullPath = path.join(DATA_DIR, file)
    const source = fs.readFileSync(fullPath, 'utf8')
    const tools = extractToolsFromSource(source)

    for (const tool of tools) {
      if (tool.name) {
        index.push({
          slug,
          name: tool.name,
          description: tool.description || '',
        })
      }
    }
  }

  // Ensure output locations
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true })

  const srcIndexPath = path.join(DATA_DIR, 'tools-index.json')
  const publicIndexPath = path.join(PUBLIC_DATA_DIR, 'agent-tools-index.json')

  const json = JSON.stringify(index)

  fs.writeFileSync(srcIndexPath, json, 'utf8')
  fs.writeFileSync(publicIndexPath, json, 'utf8')

  // Auto-format the source index so it doesn't cause formatting-only diffs in PRs.
  try {
    execSync(`npx prettier --write "${srcIndexPath}"`, { stdio: 'inherit' })
  } catch {
    // non-fatal
  }

  console.log(`✓ Generated tools search index`)
  console.log(`  Total tools: ${index.length}`)
  console.log(`  Written:`)
  console.log(`    ${srcIndexPath}`)
  console.log(`    ${publicIndexPath}`)
}

main()
