import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pathnameIsApiReference, SCALAR_API_REFERENCE_CDN } from './scalar-cdn.js'

const here = dirname(fileURLToPath(import.meta.url))
const pages = [
  join(here, '../pages/apis.astro'),
  join(here, '../pages/agentkit/apis.astro'),
  join(here, '../pages/saaskit/apis.astro'),
]

test('API reference CDN is pinned to Scalar 1.67.0', () => {
  assert.match(SCALAR_API_REFERENCE_CDN, /@scalar\/api-reference@1\.67\.0(?:$|\/)/)
  assert.doesNotMatch(SCALAR_API_REFERENCE_CDN, /api-reference@latest/)
})

test('all three API reference pages use the pinned CDN', () => {
  for (const page of pages) {
    const source = readFileSync(page, 'utf8')
    assert.match(source, /cdn:\s*SCALAR_API_REFERENCE_CDN\b/, page)
  }
})

test('Head prefetches the pinned CDN only via the shared constant', () => {
  const source = readFileSync(join(here, '../components/overrides/Head.astro'), 'utf8')
  assert.match(source, /SCALAR_API_REFERENCE_CDN/)
  assert.match(source, /API_REFERENCE_PATH_PREFIXES/)
  assert.doesNotMatch(source, /cdn\.jsdelivr\.net\/npm\/@scalar\/api-reference(?!@)/)
})

test('pathnameIsApiReference matches only API reference routes', () => {
  assert.equal(pathnameIsApiReference('/apis'), true)
  assert.equal(pathnameIsApiReference('/apis/'), true)
  assert.equal(pathnameIsApiReference('/agentkit/apis/#description/quickstart'), true)
  assert.equal(pathnameIsApiReference('/saaskit/apis/#foo'), true)
  assert.equal(pathnameIsApiReference('/apis.md'), false)
  assert.equal(pathnameIsApiReference('/agentkit/quickstart/'), false)
  assert.equal(pathnameIsApiReference('/sdks/'), false)
})
