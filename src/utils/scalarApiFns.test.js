import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  AGENTKIT_TAG_ORDER,
  SAASKIT_TAG_ORDER,
  SCALEKIT_TAG_ORDER,
  createMethodPathSorter,
  createTagsSorter,
  generateWebhookSlug,
  serializeFunctionsToJs,
} from './scalarApiFns.js'

const here = dirname(fileURLToPath(import.meta.url))

test('createTagsSorter follows the given tag order', () => {
  const sort = createTagsSorter(['Users', 'Roles'])
  assert.equal(sort('Roles', 'Users') > 0, true)
  assert.equal(sort({ name: 'Users' }, { name: 'Roles' }) < 0, true)
})

test('createMethodPathSorter orders by method then path', () => {
  const sort = createMethodPathSorter()
  assert.ok(sort({ method: 'post', path: '/b' }, { method: 'get', path: '/a' }) > 0)
  assert.ok(sort({ method: 'get', path: '/a' }, { method: 'get', path: '/b' }) < 0)
})

test('generateWebhookSlug slugs a summary', () => {
  assert.equal(generateWebhookSlug({ summary: 'Organization Created' }), 'organization-created')
  assert.equal(generateWebhookSlug({}), 'list-of-events')
})

test('serializeFunctionsToJs keeps function source', () => {
  const src = serializeFunctionsToJs({
    tagsSorter: createTagsSorter(['Users']),
    generateWebhookSlug,
  })
  assert.match(src, /"tagsSorter":\s*function/)
  assert.match(src, /"generateWebhookSlug":\s*function/)
  const revived = new Function(`return (${src})`)()
  assert.equal(typeof revived.tagsSorter, 'function')
  assert.equal(revived.generateWebhookSlug({ name: 'User Signup' }), 'user-signup')
})

test('tag orders stay in sync with the three API pages', () => {
  assert.ok(SCALEKIT_TAG_ORDER.includes('Organizations'))
  assert.deepEqual(AGENTKIT_TAG_ORDER, [
    'Connected Accounts',
    'Connectors',
    'Tool Calling',
    'MCP Configurations',
  ])
  assert.ok(SAASKIT_TAG_ORDER.includes('Passkeys'))
})

test('API pages install the function bridge before ScalarComponent', () => {
  const pages = [
    join(here, '../pages/apis.astro'),
    join(here, '../pages/agentkit/apis.astro'),
    join(here, '../pages/saaskit/apis.astro'),
  ]
  for (const page of pages) {
    const source = readFileSync(page, 'utf8')
    const bridge = source.indexOf('<ScalarFunctionBridge')
    const scalar = source.indexOf('<ScalarComponent')
    assert.ok(bridge !== -1, page)
    assert.ok(scalar !== -1, page)
    assert.ok(bridge < scalar, page)
  }
})
