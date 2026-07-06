#!/usr/bin/env node
/**
 * Re-inject developer-docs-owned code samples into the manually-copied combined spec.
 *
 * public/api/scalekit.scalar.{json,yaml} is manually copied from the scalekit backend
 * repo (see scripts/manual/API_REFERENCE_WORKFLOW.md). Once backend removes its own
 * x-codeSamples injection (the .snippets.md pipeline), that copy will have no samples.
 * This script fills that gap using the same openapi/code_samples/ files that already
 * back the agentkit/saaskit split bundles, so the combined /apis/ page keeps its
 * Node.js/Python/Go/Java examples without depending on backend at all.
 *
 * For each operation, a developer-docs sample (when present) takes priority over
 * whatever the copied spec already has for that language; languages with no
 * developer-docs file fall back to whatever the copied spec already provided.
 *
 * Run manually after copying a fresh spec from backend:
 *   node scripts/inject-code-samples.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import YAML from 'yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CODE_SAMPLES_DIR = path.join(__dirname, '../openapi/code_samples')
const JSON_SPEC_PATH = path.join(__dirname, '../public/api/scalekit.scalar.json')
const YAML_SPEC_PATH = path.join(__dirname, '../public/api/scalekit.scalar.yaml')

const LANGS = [
  { lang: 'javascript', dir: 'javascript', ext: 'js', label: 'Node.js SDK' },
  { lang: 'python', dir: 'python', ext: 'py', label: 'Python SDK' },
  { lang: 'go', dir: 'go', ext: 'go', label: 'Go SDK' },
  { lang: 'java', dir: 'java', ext: 'java', label: 'Java SDK' },
]

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete']

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

function injectIntoSpec(spec) {
  let operationsUpdated = 0
  let samplesInjected = 0

  for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method]
      if (!operation) continue

      const docsSamples = collectDocsSamples(pathKey, method)
      if (docsSamples.length === 0) continue

      const merged = mergeSamples(operation['x-codeSamples'], docsSamples)
      if (merged.length === 0) continue

      operation['x-codeSamples'] = merged
      operationsUpdated += 1
      samplesInjected += docsSamples.length
    }
  }

  return { operationsUpdated, samplesInjected }
}

function main() {
  if (!fs.existsSync(JSON_SPEC_PATH)) {
    console.error(`Spec not found: ${JSON_SPEC_PATH}`)
    process.exit(1)
  }

  const jsonSpec = JSON.parse(fs.readFileSync(JSON_SPEC_PATH, 'utf8'))
  const { operationsUpdated, samplesInjected } = injectIntoSpec(jsonSpec)
  fs.writeFileSync(JSON_SPEC_PATH, JSON.stringify(jsonSpec, null, 2) + '\n')

  if (fs.existsSync(YAML_SPEC_PATH)) {
    const yamlSpec = YAML.parse(fs.readFileSync(YAML_SPEC_PATH, 'utf8'))
    injectIntoSpec(yamlSpec)
    fs.writeFileSync(YAML_SPEC_PATH, YAML.stringify(yamlSpec, { lineWidth: 0 }))
  }

  console.log(
    `✓ Injected developer-docs code samples into ${operationsUpdated} operations (${samplesInjected} sample files) in scalekit.scalar.{json,yaml}`,
  )
}

main()
