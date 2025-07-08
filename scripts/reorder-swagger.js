#!/usr/bin/env node

// Enhanced reordering script that handles logical operation flow within the same HTTP method
// Reorders the paths in a Swagger (OpenAPI v2) JSON file so that:
// 1. Resources follow a predefined logical order (e.g. organizations → users → memberships …).
// 2. Within each resource, paths with fewer segments come first.
// 3. HTTP operations inside every path object are ordered GET → POST → PUT → PATCH → DELETE → (others alphabetical).
// 4. Within the same HTTP method, operations follow logical flow (e.g. Send → Resend → Verify for passwordless).
//
// Usage:
//   node scripts/reorder-swagger-enhanced.js <inputPath> [outputPath]
//
// If outputPath is omitted, the tool overwrites the original file **after** creating a timestamped backup next
// to it (e.g. scalekit.swagger.json.bak.2025-07-08T12-34-56.json).

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ES-module friendly __dirname / __filename
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/*************************************************************************************************
 * Configuration                                                                                 *
 *************************************************************************************************/

// Priority list that decides the order of top-level resources. Anything not listed falls back to
// alphabetical order **after** the listed resources.
const RESOURCE_PRIORITY = [
  'organizations',
  'users',
  'memberships',
  'connections',
  'directories',
  'clients',
  'passwordless',
]

// Desired order of HTTP verbs inside each path object
const METHOD_PRIORITY = ['get', 'post', 'put', 'patch', 'delete']

// Logical operation ordering within the same HTTP method and resource
// Key: resource name, Value: array of operation keywords in desired order
const OPERATION_PRIORITY = {
  passwordless: ['send', 'resend', 'verify'],
  users: ['list', 'create', 'get', 'update', 'delete'],
  // 'organizations': ['create', 'list', 'get', 'update', 'delete'],
}

// UPDATE 1: add slugify helper just below CONFIG section
const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')

/*************************************************************************************************
 * Helper functions                                                                               *
 *************************************************************************************************/

// Extract the first path segment after the version prefix (e.g. /api/v1/<segment>/...)
// UPDATE 3: modify extractResourceKey to accept methodsObj and prefer tags; keep old signature but allow second arg optional
function extractResourceKey(apiPath, methodsObject = {}) {
  // Prefer first tag found in any operation within the path
  for (const method of Object.keys(methodsObject)) {
    const op = methodsObject[method]
    if (op && Array.isArray(op.tags) && op.tags.length) {
      return slugify(op.tags[0])
    }
  }
  // Fallback to path segment
  const parts = apiPath.split('/').filter(Boolean)
  return parts[2] ? slugify(parts[2]) : ''
}

// Extract operation keyword from path (e.g., "send", "resend", "verify" from passwordless paths)
function extractOperationKey(apiPath) {
  const parts = apiPath.split('/').filter(Boolean)
  // Look for operation keywords in the path segments
  const operationKeywords = Object.values(OPERATION_PRIORITY).flat()

  for (const part of parts) {
    const lowerPart = part.toLowerCase()
    if (operationKeywords.includes(lowerPart)) {
      return lowerPart
    }
  }

  // If no specific operation found, return the last meaningful segment
  return parts[parts.length - 1] || ''
}

// Compare two resources according to RESOURCE_PRIORITY, then alphabetical
function compareResources(a, b) {
  const idxA = RESOURCE_PRIORITY.indexOf(a)
  const idxB = RESOURCE_PRIORITY.indexOf(b)

  if (idxA === -1 && idxB === -1) {
    return a.localeCompare(b)
  }
  if (idxA === -1) return 1
  if (idxB === -1) return -1
  return idxA - idxB
}

// Compare operations within the same resource and HTTP method
function compareOperations(pathA, pathB, resource) {
  const operationPriority = OPERATION_PRIORITY[resource]
  if (!operationPriority) {
    // No specific ordering defined, fall back to lexical
    return pathA.localeCompare(pathB)
  }

  const opA = extractOperationKey(pathA)
  const opB = extractOperationKey(pathB)

  const idxA = operationPriority.indexOf(opA)
  const idxB = operationPriority.indexOf(opB)

  if (idxA === -1 && idxB === -1) {
    return pathA.localeCompare(pathB)
  }
  if (idxA === -1) return 1
  if (idxB === -1) return -1
  return idxA - idxB
}

// Compare two paths according to resource, then depth, then operation, then lexical
function comparePaths(pathA, pathB) {
  const resA = extractResourceKey(pathA)
  const resB = extractResourceKey(pathB)

  const resCmp = compareResources(resA, resB)
  if (resCmp !== 0) return resCmp

  // path depth (fewer segments first)
  const depthA = pathA.split('/').length
  const depthB = pathB.split('/').length
  if (depthA !== depthB) return depthA - depthB

  // If same resource and depth, check operation ordering
  if (resA === resB) {
    const opCmp = compareOperations(pathA, pathB, resA)
    if (opCmp !== 0) return opCmp
  }

  // lexical fallback
  return pathA.localeCompare(pathB)
}

// Re-order the HTTP method objects inside every path
function reorderMethods(methodsObject) {
  const ordered = {}

  METHOD_PRIORITY.forEach((m) => {
    if (methodsObject[m]) ordered[m] = methodsObject[m]
  })

  // Append remaining verbs alphabetically
  Object.keys(methodsObject)
    .filter((m) => !METHOD_PRIORITY.includes(m))
    .sort()
    .forEach((m) => {
      ordered[m] = methodsObject[m]
    })

  return ordered
}

/*************************************************************************************************
 * Main logic                                                                                     *
 *************************************************************************************************/

function reorderSwagger(swaggerJson) {
  const newSwagger = { ...swaggerJson }
  const paths = swaggerJson.paths || {}

  // Build resource map (path => resourceKey)
  const resourceMap = {}
  Object.entries(paths).forEach(([p, methods]) => {
    resourceMap[p] = extractResourceKey(p, methods)
  })

  // Custom compare using the map
  const comparePathsWithMap = (pathA, pathB) => {
    const resA = resourceMap[pathA] || ''
    const resB = resourceMap[pathB] || ''

    const resCmp = compareResources(resA, resB)
    if (resCmp !== 0) return resCmp

    const depthA = pathA.split('/').length
    const depthB = pathB.split('/').length
    if (depthA !== depthB) return depthA - depthB

    if (resA === resB) {
      const opCmp = compareOperations(pathA, pathB, resA)
      if (opCmp !== 0) return opCmp
    }

    return pathA.localeCompare(pathB)
  }

  // Sort using injected comparator
  const sortedPathKeys = Object.keys(paths).sort(comparePathsWithMap)

  const newPaths = {}
  sortedPathKeys.forEach((p) => {
    newPaths[p] = reorderMethods(paths[p])
  })

  newSwagger.paths = newPaths
  return newSwagger
}

function backupOriginal(filePath) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-')
  const backupPath = `${filePath}.bak.${ts}`
  fs.copyFileSync(filePath, backupPath)
  return backupPath
}

function main() {
  const [, , inputArg, outputArg] = process.argv

  if (!inputArg) {
    console.error('Usage: reorder-swagger-enhanced <inputPath> [outputPath]')
    process.exit(1)
  }

  const inputPath = path.resolve(inputArg)
  const outputPath = outputArg ? path.resolve(outputArg) : inputPath

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`)
    process.exit(1)
  }

  const raw = fs.readFileSync(inputPath, 'utf8')
  let spec
  try {
    spec = JSON.parse(raw)
  } catch (err) {
    console.error(`Failed to parse JSON from ${inputPath}:`, err.message)
    process.exit(1)
  }

  const reordered = reorderSwagger(spec)
  const outputJson = JSON.stringify(reordered, null, 2) + '\n'

  if (!outputArg) {
    const backup = backupOriginal(inputPath)
    console.log(`📦  Backup created at ${backup}`)
  }

  fs.writeFileSync(outputPath, outputJson, 'utf8')
  console.log(`✅ Swagger reordered and saved to ${outputPath}`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
