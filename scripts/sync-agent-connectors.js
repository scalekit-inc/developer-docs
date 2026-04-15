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
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'

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
// Markdown AST helpers (replaces ad-hoc MDX regex escaping)
// ---------------------------------------------------------------------------

const markdownProcessor = unified().use(remarkParse).use(remarkStringify, {
  fences: true,
  bullet: '-',
  listItemIndent: 'one',
})

function escapeCurlyBraces(text) {
  return text.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')
}

function pushTextNode(nodes, value) {
  if (!value) return
  const last = nodes[nodes.length - 1]
  if (last && last.type === 'text') {
    last.value += value
    return
  }
  nodes.push({ type: 'text', value })
}

function extractBalancedBraces(text, start) {
  let depth = 0
  let inString = false
  let escaped = false

  for (let i = start; i < text.length; i++) {
    const ch = text[i]

    if (escaped) {
      escaped = false
      continue
    }
    if (ch === '\\') {
      escaped = true
      continue
    }
    if (ch === '"') {
      inString = !inString
      continue
    }
    if (inString) continue

    if (ch === '{') depth++
    if (ch === '}') {
      depth--
      if (depth === 0) {
        return { value: text.slice(start, i + 1), end: i + 1 }
      }
    }
  }

  return null
}

function isLikelyInlineJson(candidate) {
  if (!candidate || candidate.includes('\n')) return false
  if (!candidate.startsWith('{') || !candidate.endsWith('}')) return false
  if (candidate === '{}') return true
  return candidate.includes(':') && candidate.includes('"')
}

function formatInlineJsonAndEscapeBraces(text) {
  let output = ''
  let i = 0

  while (i < text.length) {
    if (text[i] === '`') {
      const end = text.indexOf('`', i + 1)
      if (end === -1) {
        output += text.slice(i)
        break
      }
      output += text.slice(i, end + 1)
      i = end + 1
      continue
    }

    const nextBacktick = text.indexOf('`', i)
    const segmentEnd = nextBacktick === -1 ? text.length : nextBacktick
    const segment = text.slice(i, segmentEnd)

    let cursor = 0
    while (cursor < segment.length) {
      const braceStart = segment.indexOf('{', cursor)
      if (braceStart === -1) {
        output += escapeCurlyBraces(segment.slice(cursor))
        break
      }

      if (braceStart > cursor) {
        output += escapeCurlyBraces(segment.slice(cursor, braceStart))
      }

      const block = extractBalancedBraces(segment, braceStart)
      if (!block) {
        output += '&#123;'
        cursor = braceStart + 1
        continue
      }

      if (isLikelyInlineJson(block.value.replace(/\s+/g, ' '))) {
        output += '`' + block.value.replace(/\s+/g, ' ').trim() + '`'
      } else {
        output += escapeCurlyBraces(block.value)
      }
      cursor = block.end
    }

    i = segmentEnd
  }

  return output
}

function convertTextNodeToMdast(value) {
  const nodes = []
  let cursor = 0

  while (cursor < value.length) {
    const braceStart = value.indexOf('{', cursor)
    if (braceStart === -1) {
      pushTextNode(nodes, escapeCurlyBraces(value.slice(cursor)))
      break
    }

    if (braceStart > cursor) {
      pushTextNode(nodes, escapeCurlyBraces(value.slice(cursor, braceStart)))
    }

    const block = extractBalancedBraces(value, braceStart)
    if (!block) {
      pushTextNode(nodes, '&#123;')
      cursor = braceStart + 1
      continue
    }

    if (isLikelyInlineJson(block.value)) {
      nodes.push({ type: 'inlineCode', value: block.value })
    } else {
      pushTextNode(nodes, escapeCurlyBraces(block.value))
    }
    cursor = block.end
  }

  return nodes
}

function transformTextNodesToMdast(node) {
  if (!node || !node.children || !Array.isArray(node.children)) return

  const transformedChildren = []
  for (const child of node.children) {
    if (child.type === 'text') {
      transformedChildren.push(...convertTextNodeToMdast(child.value || ''))
      continue
    }

    transformTextNodesToMdast(child)
    transformedChildren.push(child)
  }

  node.children = transformedChildren
}

function promoteEscapedJsonExampleBlocks(markdown) {
  const lines = markdown.split('\n')
  const output = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    output.push(line)

    if (!/(Example:|Shape:)/.test(line)) continue

    let j = i + 1
    while (j < lines.length && lines[j].trim() === '') j++
    if (j >= lines.length) continue

    const looksLikeEscapedJsonStart = /^\s*\\?&#123;/.test(lines[j])
    if (!looksLikeEscapedJsonStart) continue

    let depth = 0
    let end = -1
    for (let k = j; k < lines.length; k++) {
      const openCount = (lines[k].match(/\\?&#123;/g) || []).length
      const closeCount = (lines[k].match(/\\?&#125;/g) || []).length
      depth += openCount - closeCount
      if (depth === 0) {
        end = k
        break
      }
    }
    if (end === -1) continue

    const jsonLines = lines
      .slice(j, end + 1)
      .map((entry) => entry.replace(/\\?&#123;/g, '{').replace(/\\?&#125;/g, '}'))

    output.push('')
    output.push('```json')
    output.push(...jsonLines)
    output.push('```')

    i = end
  }

  return output.join('\n')
}

function renderMarkdownWithAst(text, { tableCell = false } = {}) {
  if (!text) return text

  const normalized = text.replace(/\*\*([^*`]+)`/g, '$1')

  if (tableCell) {
    return formatInlineJsonAndEscapeBraces(
      normalized.replace(/```[\s\S]*?```/g, '[…]').replace(/\n+/g, ' '),
    )
      .replace(/\|/g, '\\|')
      .trim()
  }

  try {
    const tree = markdownProcessor.parse(normalized)
    transformTextNodesToMdast(tree)
    const output = promoteEscapedJsonExampleBlocks(
      String(markdownProcessor.stringify(tree)).replace(/\\_/g, '_'),
    ).trim()

    return output
  } catch {
    // Safe fallback for malformed markdown from upstream connector metadata.
    let output = escapeCurlyBraces(normalized)
    return output
  }
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
        .filter((w) => w.length > 0)
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join('') +
      'Section'
  }
  return map
}

function getSetupComponent(stemMap, providerSlug) {
  if (!providerSlug) return null
  return (
    stemMap[providerSlug] ||
    stemMap[providerSlug.replace(/_/g, '-')] ||
    stemMap[providerSlug.replace(/_/g, '')] ||
    Object.entries(stemMap).find(([stem]) => {
      const normalized = stem.replace(/-/g, '')
      return normalized === providerSlug || normalized.replace(/s$/, '') === providerSlug
    })?.[1] ||
    null
  )
}

// Warns when a provider that has tools is missing a setup or usage template.
// Catches slug-matching failures silently dropped by getSetupComponent/getUsageComponent.
function warnMissingTemplates(providers, toolsByProvider, setupMap, usageMap) {
  for (const provider of providers) {
    const slug = toSafeIdentifier(provider.identifier || '')
    const providerTools = toolsByProvider.get(provider.identifier || '') || []
    if (providerTools.length === 0) continue // skip stubs with no tools yet
    if (!getSetupComponent(setupMap, slug)) {
      console.warn(
        `  ⚠ No setup template for "${provider.identifier}" (slug: ${slug}) — _setup-${slug}.mdx missing`,
      )
    }
    if (!getUsageComponent(usageMap, slug)) {
      console.warn(
        `  ⚠ No usage template for "${provider.identifier}" (slug: ${slug}) — _usage-${slug}.mdx missing`,
      )
    }
  }
}

const SETUP_STEM_MAP = buildSetupStemMap()

// ---------------------------------------------------------------------------
// Usage section map — auto-discovered from src/components/templates/agent-connectors/
// ---------------------------------------------------------------------------

function buildUsageStemMap() {
  const templatesDir = path.join(__dirname, '../src/components/templates/agent-connectors')
  let files
  try {
    files = fs.readdirSync(templatesDir)
  } catch {
    return {}
  }
  const map = {}
  for (const file of files) {
    if (!file.startsWith('_usage-') || !file.endsWith('.mdx')) continue
    const stem = file.replace('_usage-', '').replace('.mdx', '')
    map[stem] =
      'Usage' +
      stem
        .split(/[-_]/)
        .filter((w) => w.length > 0)
        .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
        .join('') +
      'Section'
  }
  return map
}

function getUsageComponent(stemMap, providerSlug) {
  if (!providerSlug) return null
  return (
    stemMap[providerSlug] ||
    stemMap[providerSlug.replace(/_/g, '-')] ||
    stemMap[providerSlug.replace(/_/g, '')] ||
    Object.entries(stemMap).find(([stem]) => {
      const normalized = stem.replace(/-/g, '')
      return normalized === providerSlug || normalized.replace(/s$/, '') === providerSlug
    })?.[1] ||
    null
  )
}

const USAGE_STEM_MAP = buildUsageStemMap()

function syncTemplateIndex(setupMap, usageMap) {
  const templatesDir = path.join(__dirname, '../src/components/templates/agent-connectors')
  const indexPath = path.join(templatesDir, 'index.ts')
  const setupLines = Object.entries(setupMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([stem, name]) => `export { default as ${name} } from './_setup-${stem}.mdx'`)
  const usageLines = Object.entries(usageMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([stem, name]) => `export { default as ${name} } from './_usage-${stem}.mdx'`)
  const lines = [...setupLines, ...usageLines]
  fs.writeFileSync(indexPath, lines.join('\n') + '\n', 'utf8')
}

// ---------------------------------------------------------------------------
// MDX generation — port of Python MDXGenerator.generate_mdx_content()
// ---------------------------------------------------------------------------

function generateMdxContent(provider, tools) {
  const lines = []

  const rawName = provider.display_name || 'Unknown Provider'
  // Normalize "something.ai" → "Something AI"
  const providerName = rawName.replace(
    /^([a-z])(.*)\.ai$/i,
    (_, first, rest) => `${first.toUpperCase()}${rest} AI`,
  )
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
  lines.push('tableOfContents: true')

  if (comingSoon) {
    lines.push('sidebar:')
    lines.push('  badge:')
    lines.push('    text: Soon')
    lines.push('    variant: tip')
  }

  // Static head boilerplate (CSS only)
  lines.push('head:')
  lines.push('  - tag: style')
  lines.push('    content: |')
  lines.push('      .sl-markdown-content h2 {')
  lines.push('        font-size: var(--sl-text-xl);')
  lines.push('      }')
  lines.push('      table td:first-child, table th:first-child {')
  lines.push('        white-space: nowrap;')
  lines.push('      }')
  lines.push('---')
  lines.push('')

  // Imports
  lines.push(
    "import { Card, CardGrid, Tabs, TabItem, Badge, Steps, Aside, Code } from '@astrojs/starlight/components'",
  )
  lines.push("import { Accordion, AccordionItem } from 'accessible-astro-components'")
  const providerSlug = toSafeIdentifier(provider.identifier)
  const setupComponentName = getSetupComponent(SETUP_STEM_MAP, providerSlug)
  const usageComponentName = getUsageComponent(USAGE_STEM_MAP, providerSlug)
  if (setupComponentName) {
    lines.push(`import { ${setupComponentName} } from '@components/templates'`)
  }
  if (usageComponentName) {
    lines.push(`import { ${usageComponentName} } from '@components/templates'`)
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

  // Usage section
  if (usageComponentName) {
    lines.push('## Usage')
    lines.push('')
    lines.push(`<${usageComponentName} />`)
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
    lines.push(renderMarkdownWithAst(toolDescription))
    lines.push('')

    const propEntries = Object.entries(properties)
    if (propEntries.length > 0) {
      lines.push('| Name | Type | Required | Description |')
      lines.push('| --- | --- | --- | --- |')

      for (const [propName, propInfo] of propEntries) {
        let propType = propInfo.type || 'string'
        const propDescription = renderMarkdownWithAst(propInfo.description || 'No description', {
          tableCell: true,
        })

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

  syncTemplateIndex(SETUP_STEM_MAP, USAGE_STEM_MAP)
  console.log(
    `✓ Synced index.ts (${Object.keys(SETUP_STEM_MAP).length} setup + ${Object.keys(USAGE_STEM_MAP).length} usage templates)`,
  )

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

  // Warn about providers with tools but no matching setup/usage template
  warnMissingTemplates(providers, toolsByProvider, SETUP_STEM_MAP, USAGE_STEM_MAP)

  // Build the set of file names this run will produce
  const expectedFiles = new Set(providers.map((p) => toSafeIdentifier(p.identifier || '') + '.mdx'))

  // Remove orphaned .mdx files not in the expected set
  let removed = 0
  for (const existing of fs.readdirSync(outputDir)) {
    if (!existing.endsWith('.mdx')) continue
    if (existing === 'index.mdx') continue // Preserve index if it ever exists in this dir
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
