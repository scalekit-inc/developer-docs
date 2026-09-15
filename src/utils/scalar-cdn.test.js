import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SCALAR_API_REFERENCE_CDN } from './scalar-cdn.js'

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
    assert.match(source, /SCALAR_API_REFERENCE_CDN/, page)
  }
})
