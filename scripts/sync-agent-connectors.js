#!/usr/bin/env node
/**
 * sync-agent-connectors.js
 *
 * Fetches all providers + tools from the Scalekit API and regenerates
 * MDX documentation files under src/content/docs/agentkit/connectors/.
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
// Capability overrides — hand-curated "What you can do" bullets
// ---------------------------------------------------------------------------

function loadCapabilityOverrides() {
  const overridesPath = path.join(__dirname, '../src/data/agent-connectors/capabilities.json')
  try {
    const raw = fs.readFileSync(overridesPath, 'utf8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

const CAPABILITY_OVERRIDES = loadCapabilityOverrides()

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
// TypeScript data file generation — src/data/agent-connectors/<slug>.ts
// ---------------------------------------------------------------------------

function mapParamType(rawType) {
  if (Array.isArray(rawType)) rawType = rawType[0] || 'string'
  const allowed = ['string', 'boolean', 'integer', 'number', 'object', 'array']
  return allowed.includes(rawType) ? rawType : 'string'
}

function escapeTemplateLiteral(str) {
  return (str || '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

function resolveAuthType(authPatterns) {
  const first = (authPatterns || [])[0]
  if (!first) return 'OAuth 2.0'
  const type = first.type || ''
  if (type === 'OAUTH') return 'OAuth 2.0'
  if (type === 'API_KEY') return 'API Key'
  if (type === 'BEARER') return 'Bearer Token'
  return first.display_name || 'OAuth 2.0'
}

function generateCatalogFile(providers) {
  const lines = []
  lines.push('// Auto-generated by sync-agent-connectors.js — do not edit manually')
  lines.push('')
  lines.push('export interface ProviderMeta {')
  lines.push('  iconUrl: string')
  lines.push('  authType: string')
  lines.push('  categories: string[]')
  lines.push('}')
  lines.push('')
  lines.push('export const catalog: Record<string, ProviderMeta> = {')

  for (const provider of providers) {
    const slug = toSafeIdentifier(provider.identifier || '')
    const iconUrl = provider.icon_src || ''
    const authType = resolveAuthType(provider.auth_patterns)
    const categories = (provider.categories || []).map((c) => String(c))
    lines.push(`  '${slug}': {`)
    lines.push(`    iconUrl: ${JSON.stringify(iconUrl)},`)
    lines.push(`    authType: ${JSON.stringify(authType)},`)
    lines.push(`    categories: ${JSON.stringify(categories)},`)
    lines.push(`  },`)
  }

  lines.push('}')
  lines.push('')
  return lines.join('\n')
}

function generateTsDataFile(provider, tools) {
  const sortedTools = [...tools].sort((a, b) => (a.name || '').localeCompare(b.name || ''))
  const lines = []
  lines.push("import type { Tool } from '../../types/agent-connectors'")
  lines.push('')
  lines.push('export const tools: Tool[] = [')

  for (const tool of sortedTools) {
    const name = tool.name || 'unnamed_tool'
    const description = escapeTemplateLiteral(tool.description || 'No description available.')
    const inputSchema = tool.input_schema || {}
    const required = inputSchema.required || []
    const properties = Object.entries(inputSchema.properties || {}).sort(([a], [b]) => {
      const aReq = required.includes(a)
      const bReq = required.includes(b)
      if (aReq !== bReq) return aReq ? -1 : 1
      return a.localeCompare(b)
    })

    lines.push('  {')
    lines.push(`    name: '${name}',`)
    lines.push(`    description: \`${description}\`,`)
    lines.push('    params: [')

    for (const [propName, propInfo] of properties) {
      const type = mapParamType(propInfo.type || 'string')
      const isRequired = required.includes(propName)
      const desc = escapeTemplateLiteral(propInfo.description || 'No description.')
      lines.push(
        `      { name: '${propName}', type: '${type}', required: ${isRequired}, description: \`${desc}\` },`,
      )
    }

    lines.push('    ],')
    lines.push('  },')
  }

  lines.push(']')
  lines.push('')
  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// Content helpers — capability bullets and authentication prose
// ---------------------------------------------------------------------------

/**
 * Auto-generate "What you can do" bullets from the tool list.
 * Groups tools by action verb and produces one bullet per group (max 6).
 */
function generateCapabilityBullets(tools, providerName) {
  const ACTION_WORDS = [
    'create',
    'read',
    'update',
    'delete',
    'search',
    'list',
    'get',
    'send',
    'fetch',
    'run',
    'execute',
    'query',
  ]

  const actionGroups = new Map()
  for (const tool of tools) {
    const nameParts = (tool.name || '').split('_')
    const action =
      nameParts.find((p) => ACTION_WORDS.includes(p.toLowerCase())) ||
      nameParts[nameParts.length - 1] ||
      'use'
    if (!actionGroups.has(action)) actionGroups.set(action, [])
    actionGroups.get(action).push(tool)
  }

  const bullets = []
  for (const [action, groupTools] of actionGroups) {
    const objects = [
      ...new Set(
        groupTools.slice(0, 3).map((t) => {
          const parts = t.name.split('_')
          const actionIdx = parts.indexOf(action)
          const objectParts = actionIdx > 1 ? parts.slice(1, actionIdx) : parts.slice(1, 2)
          return objectParts.join(' ')
        }),
      ),
    ]
      .filter(Boolean)
      .join(', ')

    const desc = groupTools[0].description || ''
    const firstSentence = desc.split(/\.\s/)[0].replace(/\.$/, '').trim()
    const label = objects
      ? `**${action.charAt(0).toUpperCase() + action.slice(1)} ${objects}**`
      : `**${action.charAt(0).toUpperCase() + action.slice(1)} records**`

    bullets.push(`- ${label} — ${firstSentence}`)
  }

  return bullets.slice(0, 6)
}

/**
 * Generate a short "Authentication" paragraph based on the primary auth pattern.
 */
function generateAuthSection(authPattern, providerName) {
  const type = authPattern.type || 'UNKNOWN'
  if (type === 'OAUTH') {
    return (
      `This connector uses **OAuth 2.0**. Scalekit acts as the OAuth client: it redirects your user to ${providerName}, ` +
      `obtains an access token, and automatically refreshes it before it expires. Your agent code never handles tokens directly — ` +
      `you only pass a \`connectionName\` and a user \`identifier\`.\n\n` +
      `You supply your ${providerName} **Connected App** credentials (Client ID + Secret) once per environment in the Scalekit dashboard.`
    )
  }
  if (type === 'API_KEY') {
    return (
      `This connector uses **API Key** authentication. Your users provide their ${providerName} API key once, ` +
      `and Scalekit stores and manages it securely. Your agent code never handles keys directly — ` +
      `you only pass a \`connectionName\` and a user \`identifier\`.`
    )
  }
  if (type === 'BEARER') {
    return (
      `This connector uses **Bearer Token** authentication. Scalekit securely stores the token and injects it into ` +
      `API requests on behalf of your users. Your agent code never handles tokens directly — ` +
      `you only pass a \`connectionName\` and a user \`identifier\`.`
    )
  }
  return `This connector uses **${authPattern.display_name || type}** authentication.`
}

// ---------------------------------------------------------------------------
// MDX generation
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
  const iconSrc = provider.icon_src || ''
  const providerSlug = toSafeIdentifier(provider.identifier)

  // Primary auth pattern for header chip and auth section
  const primaryAuth = authPatterns[0] || null
  const authTypeLabel = primaryAuth ? resolveAuthType(authPatterns) : null

  // Provider categories (API may or may not return this field)
  const categories = Array.isArray(provider.categories) ? provider.categories : []

  // --- Frontmatter ---
  lines.push('---')
  lines.push(`title: ${providerName}`)
  lines.push('tableOfContents: true')
  if (iconSrc) lines.push(`connectorIcon: ${iconSrc}`)
  if (authTypeLabel) lines.push(`connectorAuthType: ${authTypeLabel}`)
  if (categories.length) lines.push(`connectorCategories: [${categories.join(', ')}]`)

  // Static head CSS
  lines.push('head:')
  lines.push('  - tag: style')
  lines.push('    content: |')
  lines.push('      .sl-markdown-content h2 {')
  lines.push('        font-size: var(--sl-text-xl);')
  lines.push('      }')
  lines.push('---')
  lines.push('')

  // Imports
  lines.push("import ToolList from '@/components/ToolList.astro'")
  lines.push(`import { tools } from '@/data/agent-connectors/${providerSlug}'`)
  const setupComponentName = getSetupComponent(SETUP_STEM_MAP, providerSlug)
  const usageComponentName = getUsageComponent(USAGE_STEM_MAP, providerSlug)
  if (setupComponentName) {
    lines.push(`import { ${setupComponentName} } from '@components/templates'`)
  }
  if (usageComponentName) {
    lines.push(`import { ${usageComponentName} } from '@components/templates'`)
  }
  lines.push('')

  // What you can do — use hand-curated overrides when available, auto-gen as fallback
  if (tools.length > 0) {
    const overrideBullets = CAPABILITY_OVERRIDES[providerSlug]
    const bullets =
      Array.isArray(overrideBullets) && overrideBullets.length > 0
        ? overrideBullets.map((b) => `- ${b}`)
        : generateCapabilityBullets(tools, providerName)

    lines.push('## What you can do')
    lines.push('')
    lines.push(`Connect this agent connector to let your agent:`)
    lines.push('')
    for (const bullet of bullets) {
      lines.push(bullet)
    }
    lines.push('')
  }

  // Authentication
  if (primaryAuth) {
    lines.push('## Authentication')
    lines.push('')
    lines.push(generateAuthSection(primaryAuth, providerName))
    lines.push('')
  }

  // Setup section (collapsible)
  if (setupComponentName) {
    lines.push('<details>')
    lines.push('<summary>Set up the connector</summary>')
    lines.push('')
    lines.push(`<${setupComponentName} />`)
    lines.push('')
    lines.push('</details>')
    lines.push('')
  }

  // Usage section (collapsible)
  if (usageComponentName) {
    lines.push('<details>')
    lines.push('<summary>Code examples</summary>')
    lines.push('')
    lines.push(`<${usageComponentName} />`)
    lines.push('')
    lines.push('</details>')
    lines.push('')
  }

  // Tool list
  if (tools.length > 0) {
    lines.push('## Tool list')
    lines.push('')
    lines.push('<ToolList tools={tools} />')
    lines.push('')
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

  const outputDir = path.join(__dirname, '../src/content/docs/agentkit/connectors')
  fs.mkdirSync(outputDir, { recursive: true })

  const dataOutputDir = path.join(__dirname, '../src/data/agent-connectors')
  fs.mkdirSync(dataOutputDir, { recursive: true })

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

    const tsContent = generateTsDataFile(provider, providerTools)
    const tsFileName = safeIdentifier + '.ts'
    const tsFilePath = path.join(dataOutputDir, tsFileName)
    if (!tsFilePath.startsWith(dataOutputDir + path.sep)) {
      console.warn(`  ⚠ Skipping unsafe data path for identifier "${identifier}"`)
      continue
    }
    fs.writeFileSync(tsFilePath, tsContent, 'utf8')

    console.log(`  ✓ ${fileName} (${providerTools.length} tools)`)
    written++
  }

  const catalogContent = generateCatalogFile(providers)
  const catalogPath = path.join(dataOutputDir, 'catalog.ts')
  fs.writeFileSync(catalogPath, catalogContent, 'utf8')
  console.log('✓ Written catalog.ts')

  console.log(`\n📊 Summary:`)
  console.log(`   Providers: ${providers.length}`)
  console.log(`   Tools: ${tools.length}`)
  console.log(`   Files written: ${written} MDX + ${written} TS data + catalog.ts`)
  console.log(`   Orphans removed: ${removed}`)
  console.log(`   MDX output: src/content/docs/agentkit/connectors/`)
  console.log(`   Data output: src/data/agent-connectors/`)
  console.log('🎉 Done!')
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
