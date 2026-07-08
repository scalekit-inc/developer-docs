/**
 * Redocly plugin: produce product API references from the single backend spec.
 *
 * One decorator — `scalekit/product` — driven entirely by a hand-written
 * overlay file (openapi/extensions/{all,agentkit,saaskit}.yaml). Per bundle it:
 *
 *   1. Filters operations by tag (overlay `include.tags`; absent = keep all)
 *   2. Filters webhooks by name prefix (overlay `include.webhooks`; absent = keep all)
 *   3. Injects x-codeSamples from openapi/code_samples/{lang}/{path-slug}/{method}.{ext}
 *      (developer-docs samples win per language; spec-provided samples for other
 *      languages are kept as fallback)
 *   4. Replaces top-level `tags` with the overlay's curated list (when given)
 *   5. Deep-merges overlay `info`, per-operation extensions (`operations`),
 *      and schema extensions (`schemas`) — x-badges, x-scalar-ignore,
 *      x-enum-descriptions, x-tagGroups, and any other x-* Scalar supports
 *
 * Everything hand-maintained lives in the overlay files and survives every
 * spec refresh. See project-docs/API_REFERENCE_PIPELINE.md.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import YAML from 'yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CODE_SAMPLES_DIR = path.join(__dirname, '../code_samples')
const EXTENSIONS_DIR = path.join(__dirname, '../extensions')

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete']

const LANGS = [
  { lang: 'javascript', dir: 'javascript', ext: 'js', label: 'Node.js SDK' },
  { lang: 'python', dir: 'python', ext: 'py', label: 'Python SDK' },
  { lang: 'go', dir: 'go', ext: 'go', label: 'Go SDK' },
  { lang: 'java', dir: 'java', ext: 'java', label: 'Java SDK' },
]

function slugify(pathKey) {
  return pathKey.replace(/^\//, '').replace(/\//g, '_')
}

function collectDocsSamples(pathKey, method) {
  const slug = slugify(pathKey)
  const samples = []
  for (const { lang, dir, ext, label } of LANGS) {
    const filePath = path.join(CODE_SAMPLES_DIR, dir, slug, `${method}.${ext}`)
    if (fs.existsSync(filePath)) {
      samples.push({ label, lang, source: fs.readFileSync(filePath, 'utf8').trimEnd() })
    }
  }
  return samples
}

function mergeSamples(existing, docsSamples) {
  const merged = []
  for (const { lang } of LANGS) {
    const fromDocs = docsSamples.find((s) => s.lang === lang)
    if (fromDocs) {
      merged.push(fromDocs)
      continue
    }
    const fromSpec = (existing || []).find((s) => s.lang === lang)
    if (fromSpec) merged.push(fromSpec)
  }
  const knownLangs = new Set(LANGS.map((l) => l.lang))
  for (const s of existing || []) {
    if (!knownLangs.has(s.lang)) merged.push(s)
  }
  return merged
}

function deepMerge(dest, src) {
  for (const [key, value] of Object.entries(src)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      dest[key] &&
      typeof dest[key] === 'object' &&
      !Array.isArray(dest[key])
    ) {
      deepMerge(dest[key], value)
    } else {
      dest[key] = value
    }
  }
  return dest
}

function loadOverlay(file) {
  const overlayPath = path.isAbsolute(file) ? file : path.join(EXTENSIONS_DIR, file)
  if (!fs.existsSync(overlayPath)) {
    throw new Error(`scalekit/product: overlay file not found: ${overlayPath}`)
  }
  return YAML.parse(fs.readFileSync(overlayPath, 'utf8')) || {}
}

function applyProduct(root, overlay) {
  const includeTags = overlay.include?.tags ? new Set(overlay.include.tags) : null
  const includeWebhooks = overlay.include?.webhooks || null

  // 1. Filter operations by tag; drop path items left with no operations
  for (const [pathKey, pathItem] of Object.entries(root.paths || {})) {
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method]
      if (!operation) continue
      if (includeTags && !(operation.tags || []).some((t) => includeTags.has(t))) {
        delete pathItem[method]
      }
    }
    if (!HTTP_METHODS.some((m) => pathItem[m])) {
      delete root.paths[pathKey]
    }
  }

  // 2. Filter webhooks by name prefix
  if (includeWebhooks && root.webhooks) {
    for (const name of Object.keys(root.webhooks)) {
      if (!includeWebhooks.some((prefix) => name.startsWith(prefix))) {
        delete root.webhooks[name]
      }
    }
  }

  // 3. Inject code samples on the surviving operations
  for (const [pathKey, pathItem] of Object.entries(root.paths || {})) {
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method]
      if (!operation) continue
      const docsSamples = collectDocsSamples(pathKey, method)
      if (docsSamples.length === 0) continue
      operation['x-codeSamples'] = mergeSamples(operation['x-codeSamples'], docsSamples)
    }
  }

  // 4. Replace top-level tags with the curated list, or prune empty ones
  if (overlay.tags) {
    root.tags = overlay.tags
  } else if (root.tags) {
    // Remove tags that have no surviving operations (e.g. PREVIEW-only RPCs)
    const usedTags = new Set()
    for (const pathItem of Object.values(root.paths || {})) {
      for (const method of HTTP_METHODS) {
        const operation = pathItem[method]
        if (!operation) continue
        for (const tag of operation.tags || []) usedTags.add(tag)
      }
    }
    root.tags = root.tags.filter((t) => usedTags.has(t.name))
  }

  // 5. Merge info, per-operation extensions, and schema extensions
  if (overlay.info) {
    root.info = root.info || {}
    deepMerge(root.info, overlay.info)
  }

  for (const [key, value] of Object.entries(overlay.root || {})) {
    // Arbitrary top-level keys (x-tagGroups, x-scalar-environments, ...)
    root[key] = value
  }

  for (const [target, extensions] of Object.entries(overlay.operations || {})) {
    const [method, ...pathParts] = target.split(' ')
    const pathKey = pathParts.join(' ')
    const operation = root.paths?.[pathKey]?.[method.toLowerCase()]
    if (!operation) {
      console.warn(`scalekit/product: overlay targets missing operation: ${target}`)
      continue
    }
    deepMerge(operation, extensions)
  }

  for (const [schemaName, extensions] of Object.entries(overlay.schemas || {})) {
    const schema = root.components?.schemas?.[schemaName]
    if (!schema) {
      console.warn(`scalekit/product: overlay targets missing schema: ${schemaName}`)
      continue
    }
    deepMerge(schema, extensions)
  }
}

export default function scalekitPlugin() {
  return {
    id: 'scalekit',
    decorators: {
      oas3: {
        product: ({ overlay }) => {
          const overlayData = loadOverlay(overlay)
          return {
            Root: {
              leave(root) {
                applyProduct(root, overlayData)
              },
            },
          }
        },
      },
    },
  }
}
