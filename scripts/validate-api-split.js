#!/usr/bin/env node
/**
 * Verify that the AgentKit/SaaSKit API split is still a clean partition of the
 * combined spec: every operation lands in exactly one product bundle, nothing
 * lost, nothing duplicated. This is the mechanical answer to "is the split
 * still working" — run on every build so drift fails the build instead of
 * being noticed later by a reader.
 *
 * Fails the build on:
 *   - an operation present in the combined spec but missing from both splits
 *   - an operation present in a split but not in the combined spec
 *   - an operation present in BOTH agentkit and saaskit (double-counted)
 *
 * Warns (non-fatal) on:
 *   - operations with no x-codeSamples at all (known backlog for some new
 *     MCP surfaces — see SK-399 commit history)
 *
 * Run manually:
 *   node scripts/validate-api-split.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COMBINED_PATH = path.join(__dirname, '../public/api/scalekit.scalar.json')
const AGENTKIT_PATH = path.join(__dirname, '../public/api/agentkit.scalar.json')
const SAASKIT_PATH = path.join(__dirname, '../public/api/saaskit.scalar.json')

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete']

function loadSpec(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`✗ Spec not found: ${filePath}`)
    process.exit(1)
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function operationsOf(spec) {
  const ops = new Map()
  for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method]
      if (!operation) continue
      ops.set(`${method.toUpperCase()} ${pathKey}`, operation)
    }
  }
  return ops
}

function main() {
  const combined = operationsOf(loadSpec(COMBINED_PATH))
  const agentkit = operationsOf(loadSpec(AGENTKIT_PATH))
  const saaskit = operationsOf(loadSpec(SAASKIT_PATH))

  const errors = []

  const overlap = [...agentkit.keys()].filter((k) => saaskit.has(k))
  if (overlap.length > 0) {
    errors.push(
      `${overlap.length} operation(s) in BOTH agentkit and saaskit:\n  ${overlap.join('\n  ')}`,
    )
  }

  const union = new Set([...agentkit.keys(), ...saaskit.keys()])
  const missingFromSplit = [...combined.keys()].filter((k) => !union.has(k))
  if (missingFromSplit.length > 0) {
    errors.push(
      `${missingFromSplit.length} operation(s) in the combined spec but in NEITHER split (dropped):\n  ${missingFromSplit.join('\n  ')}`,
    )
  }

  const extraInSplit = [...union].filter((k) => !combined.has(k))
  if (extraInSplit.length > 0) {
    errors.push(
      `${extraInSplit.length} operation(s) in a split but NOT in the combined spec (invented):\n  ${extraInSplit.join('\n  ')}`,
    )
  }

  if (errors.length > 0) {
    console.error(
      '✗ API split validation FAILED — the split is no longer a clean partition of the combined spec:\n',
    )
    console.error(errors.join('\n\n'))
    process.exit(1)
  }

  console.log(
    `✓ API split is a clean partition: combined=${combined.size}, agentkit=${agentkit.size}, saaskit=${saaskit.size}, overlap=0`,
  )

  const withoutSamples = [...union].filter((k) => {
    const operation = agentkit.get(k) || saaskit.get(k)
    return !operation['x-codeSamples'] || operation['x-codeSamples'].length === 0
  })
  if (withoutSamples.length > 0) {
    console.warn(
      `⚠ ${withoutSamples.length} operation(s) have no code samples yet:\n  ${withoutSamples.join('\n  ')}`,
    )
  }
}

main()
