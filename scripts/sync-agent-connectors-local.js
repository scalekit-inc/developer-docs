#!/usr/bin/env node
/**
 * sync-agent-connectors-local.js
 *
 * Generates agent connector docs from local provider + tool JSON files
 * (e.g., a checkout of the scalekit-inc/tool-agent repo) instead of hitting
 * the Scalekit API. Designed to be invoked by the connector-docs-generator
 * subagent for a single connector at a time.
 *
 * Usage:
 *   node scripts/sync-agent-connectors-local.js \
 *     --providers-dir <abs-path-to-providers-dir> \
 *     --slug <connector-slug> \
 *     --template <existing-connector-slug>
 *
 *   --providers-dir : Directory containing one folder per provider. Each
 *                     folder must contain `<slug>.json` (provider metadata)
 *                     plus zero or more `<slug>_<tool>.json` files.
 *   --slug          : Connector slug to generate docs for. Must match the
 *                     folder name and the `<slug>.json` filename inside it.
 *   --template      : Existing connector slug whose hand-curated companion
 *                     files (_setup-*.mdx, _section-after-setup-*-common-
 *                     workflows.mdx) will be cloned as stubs for the new
 *                     connector. Required only when the new connector has
 *                     no companion files yet.
 *
 * Reuses the generators in scripts/sync-agent-connectors.js so the output
 * matches the format produced by the API-driven sync run by CI.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TEMPLATES_DIR = path.join(__dirname, '../src/components/templates/agent-connectors')
const CONNECTORS_OUTPUT_DIR = path.join(__dirname, '../src/content/docs/agentkit/connectors')
const DATA_OUTPUT_DIR = path.join(__dirname, '../src/data/agent-connectors')
const CATALOG_PATH = path.join(DATA_OUTPUT_DIR, 'catalog.ts')

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = { providersDir: null, slug: null, template: null }
  const argv = process.argv.slice(2)
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--providers-dir' || arg === '--providers') args.providersDir = argv[++i]
    else if (arg === '--slug') args.slug = argv[++i]
    else if (arg === '--template') args.template = argv[++i]
    else if (arg === '--help' || arg === '-h') {
      printUsage()
      process.exit(0)
    } else {
      console.error(`Unknown argument: ${arg}`)
      printUsage()
      process.exit(2)
    }
  }
  return args
}

function printUsage() {
  console.log(
    'Usage: node scripts/sync-agent-connectors-local.js \\\n' +
      '  --providers-dir <abs-path-to-providers-dir> \\\n' +
      '  --slug <connector-slug> \\\n' +
      '  --template <existing-connector-slug>',
  )
}

// ---------------------------------------------------------------------------
// Local provider + tools loader
// ---------------------------------------------------------------------------

function loadLocalConnector(providersDir, slug) {
  const folder = path.join(providersDir, slug)
  if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) {
    throw new Error(`Connector folder not found: ${folder}`)
  }
  const providerFile = path.join(folder, `${slug}.json`)
  if (!fs.existsSync(providerFile)) {
    throw new Error(`Provider metadata file missing: ${providerFile}`)
  }
  const provider = JSON.parse(fs.readFileSync(providerFile, 'utf8'))

  const tools = []
  for (const entry of fs.readdirSync(folder)) {
    if (!entry.endsWith('.json')) continue
    if (entry === `${slug}.json`) continue // skip provider metadata file
    const definition = JSON.parse(fs.readFileSync(path.join(folder, entry), 'utf8'))
    tools.push(definition)
  }
  return { provider, tools }
}

// ---------------------------------------------------------------------------
// Template cloning — produces stub _setup and _section-after-setup files for
// the new connector by copying from a similar existing connector and applying
// case-aware name swaps.
// ---------------------------------------------------------------------------

function applyNameSwaps(content, sourceSlug, targetSlug, sourceDisplayName, targetDisplayName) {
  // Order matters: do longer/more specific swaps before shorter ones so we
  // don't accidentally mutate a substring of a longer match.
  const swaps = [
    [sourceDisplayName, targetDisplayName],
    [sourceDisplayName.toUpperCase(), targetDisplayName.toUpperCase()],
    [sourceSlug.toUpperCase(), targetSlug.toUpperCase()],
    [sourceSlug, targetSlug],
  ]
  let out = content
  for (const [from, to] of swaps) {
    if (!from) continue
    out = out.split(from).join(to)
  }
  return out
}

// Replace standalone markdown image references with MDX TODO comments. The
// cloned source connector's screenshots live under a different assets folder
// and would otherwise fail the Astro build with ImageNotFound. The human
// follow-up step is to add real screenshots and replace the TODO comments.
function stripImageReferences(content) {
  return content.replace(
    /^(\s*)!\[([^\]]*)\]\(([^)]+)\)\s*$/gm,
    (_match, indent, alt, src) =>
      `${indent}{/* TODO: add screenshot — alt: "${alt}", original src: ${src} */}`,
  )
}

function cloneTemplate({
  sourceFile,
  targetFile,
  sourceSlug,
  targetSlug,
  sourceDisplayName,
  targetDisplayName,
}) {
  if (fs.existsSync(targetFile)) {
    console.log(`  ⊘ Skipped (already exists): ${path.basename(targetFile)}`)
    return false
  }
  if (!fs.existsSync(sourceFile)) {
    console.warn(`  ⚠ Source template not found, skipping: ${path.basename(sourceFile)}`)
    return false
  }
  const content = fs.readFileSync(sourceFile, 'utf8')
  const withSwaps = applyNameSwaps(
    content,
    sourceSlug,
    targetSlug,
    sourceDisplayName,
    targetDisplayName,
  )
  const stub =
    `{/* TODO: stub cloned from ${path.basename(sourceFile)} for ${targetDisplayName}. ` +
    `Review and update connector-specific references (URLs, scopes, app-registration steps) before merging. */}\n` +
    stripImageReferences(withSwaps)
  fs.writeFileSync(targetFile, stub, 'utf8')
  console.log(`  ✓ Cloned ${path.basename(sourceFile)} → ${path.basename(targetFile)}`)
  return true
}

function cloneCompanionFiles(templateSlug, targetSlug, templateDisplayName, targetDisplayName) {
  const candidates = [
    {
      sourceFile: path.join(TEMPLATES_DIR, `_setup-${templateSlug}.mdx`),
      targetFile: path.join(TEMPLATES_DIR, `_setup-${targetSlug}.mdx`),
    },
    {
      sourceFile: path.join(
        TEMPLATES_DIR,
        `_section-after-setup-${templateSlug}-common-workflows.mdx`,
      ),
      targetFile: path.join(
        TEMPLATES_DIR,
        `_section-after-setup-${targetSlug}-common-workflows.mdx`,
      ),
    },
  ]

  let cloned = 0
  for (const c of candidates) {
    if (
      cloneTemplate({
        ...c,
        sourceSlug: templateSlug,
        targetSlug,
        sourceDisplayName: templateDisplayName,
        targetDisplayName,
      })
    ) {
      cloned++
    }
  }
  return cloned
}

// ---------------------------------------------------------------------------
// Catalog merge — preserves all existing entries (and their insertion order),
// upserts the new one. The on-disk catalog uses Prettier-formatted object
// literal syntax (unquoted identifier keys, single-quoted strings), so we
// parse via eval rather than regex and re-emit in the same style.
// ---------------------------------------------------------------------------

const CATALOG_HEADER = [
  '// Auto-generated by sync-agent-connectors.js — do not edit manually',
  '',
  'export interface ProviderMeta {',
  '  iconUrl: string',
  '  authType: string',
  '  categories: string[]',
  '}',
  '',
  'export const catalog: Record<string, ProviderMeta> = {',
]

const IDENTIFIER_REGEX = /^[A-Za-z_$][A-Za-z0-9_$]*$/
const CATALOG_START_MARKER = 'export const catalog: Record<string, ProviderMeta> = '

// Find the matching closing brace of an object literal starting at `objStart`.
// Skips braces inside string literals so quoted `{`/`}` characters don't
// confuse the depth counter. Returns the index of the closing brace.
function findMatchingBrace(content, objStart) {
  let depth = 0
  let inSingle = false
  let inDouble = false
  let inBacktick = false
  let escape = false
  for (let i = objStart; i < content.length; i++) {
    const ch = content[i]
    if (escape) {
      escape = false
      continue
    }
    if (ch === '\\') {
      escape = true
      continue
    }
    if (inSingle) {
      if (ch === "'") inSingle = false
      continue
    }
    if (inDouble) {
      if (ch === '"') inDouble = false
      continue
    }
    if (inBacktick) {
      if (ch === '`') inBacktick = false
      continue
    }
    if (ch === "'") {
      inSingle = true
      continue
    }
    if (ch === '"') {
      inDouble = true
      continue
    }
    if (ch === '`') {
      inBacktick = true
      continue
    }
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return i
    }
  }
  return -1
}

function parseExistingCatalog(catalogContent) {
  const startIdx = catalogContent.indexOf(CATALOG_START_MARKER)
  if (startIdx === -1) return new Map()
  const objStart = catalogContent.indexOf('{', startIdx)
  if (objStart === -1) return new Map()
  const objEnd = findMatchingBrace(catalogContent, objStart)
  if (objEnd === -1) return new Map()
  const objLiteral = catalogContent.slice(objStart, objEnd + 1)
  // The catalog file is auto-generated and lives in our repo; using Function
  // to evaluate the object literal is safe and handles any JS-valid syntax
  // (unquoted identifier keys, single or double quotes, etc.) without us
  // having to maintain a brittle regex.
  let parsed
  try {
    parsed = new Function(`return ${objLiteral}`)()
  } catch (err) {
    throw new Error(`Failed to parse existing catalog.ts: ${err.message}`)
  }
  return new Map(Object.entries(parsed))
}

function buildCatalogEntryForProvider(provider, resolveAuthType, normalizeConnectorCategories) {
  return {
    iconUrl: provider.icon_src || '',
    authType: resolveAuthType(provider.auth_patterns),
    categories: normalizeConnectorCategories(provider.categories || []),
  }
}

// Emit a single-quoted JS string literal matching the on-disk Prettier style.
// Backslashes and single quotes inside the value are escaped.
function quoteSingle(value) {
  return "'" + String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"
}

function formatCatalogKey(slug) {
  return IDENTIFIER_REGEX.test(slug) ? slug : quoteSingle(slug)
}

function formatCategoriesArray(categories) {
  if (!categories || categories.length === 0) return '[]'
  return '[' + categories.map((c) => quoteSingle(c)).join(', ') + ']'
}

function serializeCatalog(entriesMap) {
  const lines = [...CATALOG_HEADER]
  // Preserve insertion order — matches existing on-disk ordering and avoids
  // gratuitous reordering churn when a new entry is appended.
  for (const [slug, entry] of entriesMap) {
    lines.push(`  ${formatCatalogKey(slug)}: {`)
    lines.push(`    iconUrl: ${quoteSingle(entry.iconUrl)},`)
    lines.push(`    authType: ${quoteSingle(entry.authType)},`)
    lines.push(`    categories: ${formatCategoriesArray(entry.categories)},`)
    lines.push(`  },`)
  }
  lines.push('}')
  lines.push('')
  return lines.join('\n')
}

function mergeCatalogEntry(slug, newEntry) {
  let existing = new Map()
  if (fs.existsSync(CATALOG_PATH)) {
    existing = parseExistingCatalog(fs.readFileSync(CATALOG_PATH, 'utf8'))
  }
  const wasPresent = existing.has(slug)
  existing.set(slug, newEntry)
  fs.writeFileSync(CATALOG_PATH, serializeCatalog(existing), 'utf8')
  return { totalEntries: existing.size, updated: wasPresent }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { providersDir, slug, template } = parseArgs()

  if (!providersDir || !slug) {
    console.error('❌ --providers-dir and --slug are required')
    printUsage()
    process.exit(2)
  }

  const absProvidersDir = path.resolve(providersDir)
  if (!fs.existsSync(absProvidersDir)) {
    console.error(`❌ providers-dir does not exist: ${absProvidersDir}`)
    process.exit(2)
  }

  // -- 1) Load provider metadata from local files (needed for template
  //       display-name swaps and for the MDX/catalog generators).
  console.log(`📂 Loading connector "${slug}" from ${absProvidersDir}/${slug}/...`)
  const { provider, tools } = loadLocalConnector(absProvidersDir, slug)
  const displayName = provider.display_name || slug
  console.log(`✓ Loaded provider "${displayName}" with ${tools.length} tool(s)`)

  // -- 2) Clone hand-curated companion files BEFORE importing the API-mode
  //       script. The original script scans the templates directory at
  //       module-load time to build SETUP_STEM_MAP / SECTION_ENTRIES — if we
  //       imported it first, the maps would not contain the new slug's files.
  let templateDisplayName = null
  if (template) {
    const templateProviderFile = path.join(absProvidersDir, template, `${template}.json`)
    if (fs.existsSync(templateProviderFile)) {
      try {
        const templateProvider = JSON.parse(fs.readFileSync(templateProviderFile, 'utf8'))
        templateDisplayName = templateProvider.display_name || template
      } catch {
        templateDisplayName = template
      }
    } else {
      // Fallback when the template provider is not present in the local
      // providers dir — use the slug as the display name placeholder.
      templateDisplayName = template
    }

    console.log(`📝 Cloning companion templates from "${template}" → "${slug}"...`)
    cloneCompanionFiles(template, slug, templateDisplayName, displayName)
  } else {
    console.log('ℹ️ No --template specified; skipping template cloning')
  }

  // -- 3) Dynamic import after cloning — registry scans now pick up the new
  //       template files. The original script's main() is gated behind an
  //       invokedDirectly check, so importing it has no side effects beyond
  //       the registry scans we want.
  const apiModuleUrl = pathToFileURL(path.join(__dirname, 'sync-agent-connectors.js')).href
  const apiModule = await import(apiModuleUrl)
  const {
    generateMdxContent,
    generateTsDataFile,
    resolveAuthType,
    normalizeConnectorCategories,
    syncTemplateIndex,
    SETUP_STEM_MAP,
    USAGE_STEM_MAP,
    QUICKSTART_STEM_MAP,
    SECTION_ENTRIES,
    CONNECTED_ACCOUNT_STEM_MAP,
  } = apiModule

  // -- 4) Generate MDX page + .ts data file for the connector.
  fs.mkdirSync(CONNECTORS_OUTPUT_DIR, { recursive: true })
  fs.mkdirSync(DATA_OUTPUT_DIR, { recursive: true })

  const mdxPath = path.join(CONNECTORS_OUTPUT_DIR, `${slug}.mdx`)
  const mdxContent = generateMdxContent(provider, tools)
  fs.writeFileSync(mdxPath, mdxContent, 'utf8')
  console.log(`✓ Wrote ${path.relative(path.join(__dirname, '..'), mdxPath)}`)

  const tsPath = path.join(DATA_OUTPUT_DIR, `${slug}.ts`)
  if (tools.length > 0) {
    const tsContent = generateTsDataFile(provider, tools)
    fs.writeFileSync(tsPath, tsContent, 'utf8')
    console.log(
      `✓ Wrote ${path.relative(path.join(__dirname, '..'), tsPath)} (${tools.length} tools)`,
    )
  } else {
    console.log('ℹ️ Connector has no tools; skipping .ts data file')
  }

  // -- 5) Merge the new connector into catalog.ts without disturbing existing
  //       entries. We rebuild only this entry; everything else is preserved
  //       verbatim from the existing file.
  const catalogEntry = buildCatalogEntryForProvider(
    provider,
    resolveAuthType,
    normalizeConnectorCategories,
  )
  const { totalEntries, updated } = mergeCatalogEntry(slug, catalogEntry)
  console.log(
    `✓ ${updated ? 'Updated' : 'Inserted'} catalog entry for "${slug}" (${totalEntries} total)`,
  )

  // -- 6) Re-sync the templates index so the new _setup-<slug> and
  //       _section-after-setup-<slug>-* exports are picked up.
  syncTemplateIndex(
    SETUP_STEM_MAP,
    USAGE_STEM_MAP,
    SECTION_ENTRIES,
    CONNECTED_ACCOUNT_STEM_MAP,
    QUICKSTART_STEM_MAP,
  )
  console.log('✓ Rewrote src/components/templates/agent-connectors/index.ts')

  console.log('\n📊 Summary:')
  console.log(`   Connector slug : ${slug}`)
  console.log(`   Provider name  : ${displayName}`)
  console.log(`   Tools          : ${tools.length}`)
  console.log(`   Template stub  : ${template || '(none)'}`)
  console.log(`   MDX            : src/content/docs/agentkit/connectors/${slug}.mdx`)
  if (tools.length > 0) {
    console.log(`   Data           : src/data/agent-connectors/${slug}.ts`)
  }
  console.log(`   Catalog        : src/data/agent-connectors/catalog.ts (merged)`)
  console.log('🎉 Done!')
}

main().catch((err) => {
  console.error('❌ Error:', err.stack || err.message)
  process.exit(1)
})
