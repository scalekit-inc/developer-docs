#!/usr/bin/env node
/**
 * sync-agent-connectors.js
 *
 * Fetches all providers + tools from the Scalekit API and regenerates
 * MDX documentation files under src/content/docs/reference/agent-connectors/.
 *
 * Env vars (reads from .env or process.env):
 *   PROD_SCALEKIT_CLIENT_ID       – OAuth client ID (production)
 *   PROD_SCALEKIT_CLIENT_SECRET   – OAuth client secret (production)
 *   PROD_SCALEKIT_ENVIRONMENT_URL – API host URL (production)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ---------------------------------------------------------------------------
// Env loader (using dotenv)
// ---------------------------------------------------------------------------

function loadEnv() {
  dotenv.config({ path: path.join(__dirname, '../.env'), override: true, quiet: true })
}

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------

const FETCH_TIMEOUT_MS = 30_000

async function getAccessToken(host, clientId, clientSecret) {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  })

  let response
  try {
    response = await fetch(`${host}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: body.toString(),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })
  } catch (err) {
    if (err.name === 'AbortError' || err.name === 'TimeoutError') {
      throw new Error(`Token request timed out after ${FETCH_TIMEOUT_MS}ms`)
    }
    throw err
  }

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Token request failed (${response.status}): ${text}`)
  }

  const data = await response.json()
  if (!data.access_token) throw new Error('No access_token in response')
  return data.access_token
}

async function fetchAllProviders(host, token) {
  const providers = []
  let pageToken = null

  do {
    const url = new URL(`${host}/api/v1/providers`)
    url.searchParams.set('page_size', '50')
    if (pageToken) url.searchParams.set('page_token', pageToken)

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Providers request failed (${response.status}): ${text}`)
    }

    const data = await response.json()
    providers.push(...(data.providers || []))
    pageToken = data.next_page_token || null
  } while (pageToken)

  return providers
}

async function fetchAllTools(host, token) {
  const tools = []
  let pageToken = null

  do {
    const url = new URL(`${host}/api/v1/tools`)
    url.searchParams.set('page_size', '100')
    if (pageToken) url.searchParams.set('page_token', pageToken)

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Tools request failed (${response.status}): ${text}`)
    }

    const data = await response.json()
    tools.push(...(data.tools || []))
    pageToken = data.next_page_token || null
  } while (pageToken)

  return tools
}

// Sanitize a raw provider identifier into a safe filename stem
function toSafeIdentifier(identifier) {
  return (
    (identifier || '')
      .toLowerCase()
      .replace(/[/\\]/g, '') // strip path separators
      .replace(/[^a-z0-9_-]/g, '_') // replace remaining unsafe chars
      .replace(/^_+|_+$/g, '') || // trim leading/trailing underscores
    'unknown-provider'
  )
}

// Group tool definitions by provider identifier (e.g. "SLACK")
function groupToolsByProvider(tools) {
  const map = new Map()
  for (const tool of tools) {
    const provider = tool.provider || 'UNKNOWN'
    if (!map.has(provider)) map.set(provider, [])
    map.get(provider).push(tool.definition || {})
  }
  return map
}

// ---------------------------------------------------------------------------
// MDX escaping — port of Python MDXGenerator.escape_mdx_content()
// ---------------------------------------------------------------------------

function escapeMdx(text) {
  if (!text) return text

  // Fix malformed bold+backtick patterns like **foo` → foo
  text = text.replace(/\*\*([^*`]+)`/g, '$1')

  // Multi-line JSON after "Example:" / "Shape:" → fenced code block
  const lines = text.split('\n')
  const resultLines = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if ((line.includes('Example:') || line.includes('Shape:')) && i + 1 < lines.length) {
      let jsonStart = -1
      let jsonEnd = -1
      for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
        if (lines[j].trim().startsWith('{')) {
          jsonStart = j
          break
        }
      }
      if (jsonStart !== -1) {
        let braceCount = 0
        outer: for (let j = jsonStart; j < Math.min(jsonStart + 20, lines.length); j++) {
          for (const ch of lines[j]) {
            if (ch === '{') braceCount++
            else if (ch === '}') {
              braceCount--
              if (braceCount === 0) {
                jsonEnd = j
                break outer
              }
            }
          }
        }
      }
      if (jsonStart !== -1 && jsonEnd !== -1) {
        resultLines.push(line)
        resultLines.push('')
        resultLines.push('```json')
        for (let j = jsonStart; j <= jsonEnd; j++) resultLines.push(lines[j])
        resultLines.push('```')
        i = jsonEnd + 1
        continue
      }
    }
    resultLines.push(line)
    i++
  }
  text = resultLines.join('\n')

  // Inline JSON on lines containing "example" keyword → wrap in backticks
  const processedLines = text.split('\n')
  for (let lineIdx = 0; lineIdx < processedLines.length; lineIdx++) {
    const line = processedLines[lineIdx]
    if (/example.*\{/i.test(line)) {
      const jsonMatches = []
      let idx = 0
      while (idx < line.length) {
        if (line[idx] === '{') {
          let braceCount = 0
          const start = idx
          let end = idx
          for (let j = idx; j < line.length; j++) {
            if (line[j] === '{') braceCount++
            else if (line[j] === '}') {
              braceCount--
              if (braceCount === 0) {
                end = j + 1
                break
              }
            }
          }
          if (braceCount === 0 && end > start) {
            jsonMatches.push([start, end])
            idx = end
          } else {
            idx++
          }
        } else {
          idx++
        }
      }
      let newLine = line
      for (const [start, end] of [...jsonMatches].reverse()) {
        const json = newLine.slice(start, end)
        if (!json.includes('`')) {
          newLine = newLine.slice(0, start) + '`' + json + '`' + newLine.slice(end)
        }
      }
      processedLines[lineIdx] = newLine
    }
  }
  text = processedLines.join('\n')

  // Simple {"key":"val"} patterns → wrap in backticks
  function isNotInBackticks(t, pos) {
    const before = t.slice(0, pos)
    const backtickCount = (before.match(/`/g) || []).length
    if (before.includes('```')) {
      const codeBlocks = (before.match(/```/g) || []).length
      if (codeBlocks % 2 === 1) return false
    }
    return backtickCount % 2 === 0
  }

  const simplePatterns = [
    /\{"page_id"\s*:\s*"[^"]*"\}/g,
    /\{"database_id"\s*:\s*"[^"]*"\}/g,
    /\{"[^"]{1,20}"\s*:\s*"[^"]{1,20}"\}/g,
  ]
  for (const pattern of simplePatterns) {
    const matches = [...text.matchAll(pattern)]
    for (const match of [...matches].reverse()) {
      if (isNotInBackticks(text, match.index)) {
        const json = match[0]
        if (!json.includes('[') && (json.match(/\{/g) || []).length === 1) {
          text =
            text.slice(0, match.index) + '`' + json + '`' + text.slice(match.index + json.length)
        }
      }
    }
  }

  return text
}

// ---------------------------------------------------------------------------
// Setup section map — auto-discovered from src/components/templates/agent-connectors/
// ---------------------------------------------------------------------------

function buildSetupStemMap() {
  const templatesDir = path.join(__dirname, '../src/components/templates/agent-connectors')
  let files
  try {
    files = fs.readdirSync(templatesDir)
  } catch {
    return {}
  }
  const map = {}
  for (const file of files) {
    if (!file.startsWith('_setup-') || !file.endsWith('.mdx')) continue
    const stem = file.replace('_setup-', '').replace('.mdx', '')
    map[stem] =
      'Setup' +
      stem
        .split('-')
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join('') +
      'Section'
  }
  return map
}

function getSetupComponent(stemMap, providerSlug) {
  if (!providerSlug) return null
  return stemMap[providerSlug.replace(/_/g, '-')] || stemMap[providerSlug.replace(/_/g, '')] || null
}

const SETUP_STEM_MAP = buildSetupStemMap()

function syncTemplateIndex(stemMap) {
  const templatesDir = path.join(__dirname, '../src/components/templates/agent-connectors')
  const indexPath = path.join(templatesDir, 'index.ts')
  const lines = Object.entries(stemMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([stem, name]) => `export { default as ${name} } from './_setup-${stem}.mdx'`)
  fs.writeFileSync(indexPath, lines.join('\n') + '\n', 'utf8')
}

// ---------------------------------------------------------------------------
// MDX generation — port of Python MDXGenerator.generate_mdx_content()
// ---------------------------------------------------------------------------

function generateMdxContent(provider, tools) {
  const lines = []

  const providerName = provider.display_name || 'Unknown Provider'
  const providerDescription = provider.description || 'No description available.'
  const authPatterns = provider.auth_patterns || []
  const comingSoon = provider.coming_soon || false

  const authBadges = authPatterns.map((auth) => {
    const type = auth.type || 'UNKNOWN'
    if (type === 'OAUTH') return '<Badge text="OAuth 2.0" />'
    if (type === 'API_KEY') return '<Badge text="API Key" />'
    if (type === 'BEARER') return '<Badge text="Bearer Token" />'
    return `<Badge text="${auth.display_name || type}" />`
  })

  // --- Frontmatter ---
  lines.push('---')
  lines.push(`title: ${providerName}`)
  lines.push(`description: ${providerDescription}`)
  lines.push('tableOfContents: true')

  if (comingSoon) {
    lines.push('sidebar:')
    lines.push('  badge:')
    lines.push('    text: Soon')
    lines.push('    variant: tip')
  }

  // Static head boilerplate (CSS + JS) — matches existing MDX files exactly
  lines.push('head:')
  lines.push('  - tag: style')
  lines.push('    content: |')
  lines.push('      .sl-markdown-content h2 {')
  lines.push('        font-size: var(--sl-text-xl);')
  lines.push('      }')
  lines.push('      table td:first-child, table th:first-child {')
  lines.push('        white-space: nowrap;')
  lines.push('      }')
  lines.push('      /* Heading copy functionality */')
  lines.push('      .sl-markdown-content h2,')
  lines.push('      .sl-markdown-content h3,')
  lines.push('      .sl-markdown-content h4 {')
  lines.push('        position: relative;')
  lines.push('        cursor: pointer;')
  lines.push('      }')
  lines.push('      .sl-markdown-content h2:hover::after,')
  lines.push('      .sl-markdown-content h3:hover::after,')
  lines.push('      .sl-markdown-content h4:hover::after {')
  lines.push('        content: " 📋 ";')
  lines.push('        font-size: 0.8em;')
  lines.push('        opacity: 0.7;')
  lines.push('      }')
  lines.push('  - tag: script')
  lines.push('    content: |')
  lines.push('      // Using a self-executing function to avoid global namespace pollution')
  lines.push('      (function() {')
  lines.push('        // Function to initialize the copy functionality')
  lines.push('        function initHeadingCopy() {')
  lines.push(
    "          const headings = document.querySelectorAll('.sl-markdown-content h2, .sl-markdown-content h3, .sl-markdown-content h4');",
  )
  lines.push('')
  lines.push('          headings.forEach(heading => {')
  lines.push('            // Skip if already initialized')
  lines.push("            if (heading.hasAttribute('data-copy-initialized')) return;")
  lines.push("            heading.setAttribute('data-copy-initialized', 'true');")
  lines.push('')
  lines.push("            heading.addEventListener('click', async () => {")
  lines.push("              const headingText = heading.textContent.replace(/\\s📋$/, '').trim();")
  lines.push('')
  lines.push('              try {')
  lines.push('                await navigator.clipboard.writeText(headingText);')
  lines.push('')
  lines.push('                // Visual feedback')
  lines.push('                const originalText = heading.textContent;')
  lines.push(
    "                heading.textContent = heading.textContent.replace(/\\s📋$/, '') + ' ✓';",
  )
  lines.push('')
  lines.push('                setTimeout(() => {')
  lines.push('                  heading.textContent = originalText;')
  lines.push('                }, 2000);')
  lines.push('              } catch (err) {')
  lines.push("                console.error('Failed to copy heading:', err);")
  lines.push('              }')
  lines.push('            });')
  lines.push('          });')
  lines.push('        }')
  lines.push('')
  lines.push('        // Initialize on DOMContentLoaded')
  lines.push("        document.addEventListener('DOMContentLoaded', initHeadingCopy);")
  lines.push('')
  lines.push('        // Also initialize now in case the DOM is already loaded')
  lines.push(
    "        if (document.readyState === 'complete' || document.readyState === 'interactive') {",
  )
  lines.push('          setTimeout(initHeadingCopy, 1);')
  lines.push('        }')
  lines.push('')
  lines.push("        // For Astro's client-side navigation")
  lines.push("        document.addEventListener('astro:page-load', initHeadingCopy);")
  lines.push('      })();')
  lines.push('---')
  lines.push('')

  // Imports
  lines.push(
    "import { Card, CardGrid, Tabs, TabItem, Badge, Steps, Aside, Code } from '@astrojs/starlight/components'",
  )
  lines.push("import { Accordion, AccordionItem } from 'accessible-astro-components'")
  const setupComponentName = getSetupComponent(
    SETUP_STEM_MAP,
    toSafeIdentifier(provider.identifier),
  )
  if (setupComponentName) {
    lines.push(`import { ${setupComponentName} } from '@components/templates'`)
  }
  lines.push('')

  // Provider description + icon grid
  const iconSrc = provider.icon_src || ''
  if (iconSrc) {
    lines.push('<div class="grid grid-cols-5 gap-4 items-center">')
    lines.push(' <div class="col-span-4">')
    lines.push(`  ${providerDescription}`)
    lines.push(' </div>')
    lines.push(' <div class="flex justify-center">')
    lines.push(`  <img src="${iconSrc}" width="64" height="64" alt="${providerName} logo" />`)
    lines.push(' </div>')
    lines.push('</div>')
  } else {
    lines.push(providerDescription)
  }
  lines.push('')

  // Auth badges
  if (authBadges.length > 0) {
    lines.push(`Supports authentication: ${authBadges.join(' , ')}`)
    lines.push('')
    lines.push('')
  }

  // Setup section
  if (setupComponentName) {
    lines.push('## Set up the agent connector')
    lines.push('')
    lines.push(`<${setupComponentName} />`)
    lines.push('')
  }

  // Tool list heading
  if (tools.length > 0) {
    lines.push('## Tool list')
    lines.push('')
  }

  // Per-tool sections (sorted by name, matching Python's sorted(tool_files))
  const sortedTools = [...tools].sort((a, b) => (a.name || '').localeCompare(b.name || ''))

  for (const tool of sortedTools) {
    const toolName = tool.name || 'unnamed_tool'
    const toolDescription = tool.description || 'No description available.'
    const inputSchema = tool.input_schema || {}
    const properties = inputSchema.properties || {}
    const requiredFields = inputSchema.required || []

    lines.push(`## \`${toolName}\``)
    lines.push('')
    lines.push(escapeMdx(toolDescription))
    lines.push('')

    const propEntries = Object.entries(properties)
    if (propEntries.length > 0) {
      lines.push('| Name | Type | Required | Description |')
      lines.push('| --- | --- | --- | --- |')

      for (const [propName, propInfo] of propEntries) {
        let propType = propInfo.type || 'string'
        const propDescription = escapeMdx(propInfo.description || 'No description')
          .replace(/```[\s\S]*?```/g, '[…]') // collapse fenced code blocks
          .replace(/`([^`]*)`/g, '$1') // strip inline backticks
          .replace(/\n+/g, ' ') // collapse newlines to a space
          .replace(/\|/g, '\\|') // escape pipe characters
          .trim()

        // Handle type arrays like ["string", "null"]
        if (Array.isArray(propType)) {
          propType = propType[0] || 'string'
        }

        // Handle array and object types
        if (propType === 'array') {
          const items = propInfo.items || {}
          let itemType = items.type || 'unknown'
          if (Array.isArray(itemType)) itemType = itemType[0] || 'unknown'
          propType = `\`array<${itemType}>\``
        } else if (propType === 'object') {
          propType = '`object`'
        }

        const isRequired = requiredFields.includes(propName) ? 'Yes' : 'No'
        lines.push(`| \`${propName}\` | ${propType} | ${isRequired} | ${propDescription} |`)
      }

      lines.push('')
    }
  }

  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  loadEnv()

  const clientId = process.env.PROD_SCALEKIT_CLIENT_ID
  const clientSecret = process.env.PROD_SCALEKIT_CLIENT_SECRET
  const host = process.env.PROD_SCALEKIT_ENVIRONMENT_URL

  if (!clientId || !clientSecret || !host) {
    console.error(
      '❌ Missing required env vars: PROD_SCALEKIT_CLIENT_ID, PROD_SCALEKIT_CLIENT_SECRET, PROD_SCALEKIT_ENVIRONMENT_URL',
    )
    process.exit(1)
  }

  syncTemplateIndex(SETUP_STEM_MAP)
  console.log(`✓ Synced index.ts (${Object.keys(SETUP_STEM_MAP).length} templates)`)

  const outputDir = path.join(__dirname, '../src/content/docs/reference/agent-connectors')
  fs.mkdirSync(outputDir, { recursive: true })

  console.log(`🔑 Authenticating with ${host}...`)
  const token = await getAccessToken(host, clientId, clientSecret)
  console.log('✓ Access token obtained')

  console.log('📋 Fetching providers...')
  const providers = await fetchAllProviders(host, token)
  console.log(`✓ Fetched ${providers.length} providers`)

  console.log('🔧 Fetching tools...')
  const tools = await fetchAllTools(host, token)
  console.log(`✓ Fetched ${tools.length} tools`)

  const toolsByProvider = groupToolsByProvider(tools)

  // Build the set of file names this run will produce
  const expectedFiles = new Set(providers.map((p) => toSafeIdentifier(p.identifier || '') + '.mdx'))

  // Remove orphaned .mdx files not in the expected set
  let removed = 0
  for (const existing of fs.readdirSync(outputDir)) {
    if (!existing.endsWith('.mdx')) continue
    if (expectedFiles.has(existing)) continue
    const orphanPath = path.join(outputDir, existing)
    if (!orphanPath.startsWith(outputDir + path.sep)) continue // safety check
    fs.unlinkSync(orphanPath)
    console.log(`  🗑 Removed orphan: ${existing}`)
    removed++
  }

  let written = 0
  for (const provider of providers) {
    const identifier = provider.identifier || ''
    const providerTools = toolsByProvider.get(identifier) || []

    const safeIdentifier = toSafeIdentifier(identifier)

    const mdxContent = generateMdxContent(provider, providerTools)
    const fileName = safeIdentifier + '.mdx'
    const filePath = path.join(outputDir, fileName)

    // Guard against directory traversal (belt-and-suspenders)
    if (!filePath.startsWith(outputDir + path.sep)) {
      console.warn(`  ⚠ Skipping unsafe path for identifier "${identifier}"`)
      continue
    }

    fs.writeFileSync(filePath, mdxContent, 'utf8')
    console.log(`  ✓ ${fileName} (${providerTools.length} tools)`)
    written++
  }

  console.log(`\n📊 Summary:`)
  console.log(`   Providers: ${providers.length}`)
  console.log(`   Tools: ${tools.length}`)
  console.log(`   Files written: ${written}`)
  console.log(`   Orphans removed: ${removed}`)
  console.log(`   Output: src/content/docs/reference/agent-connectors/`)
  console.log('🎉 Done!')
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
