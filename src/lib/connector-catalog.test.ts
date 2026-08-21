import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { coverageLabel, displayTitle, normalizeAuth, operatorOf } from './connector-catalog.ts'

describe('displayTitle', () => {
  it('drops a trailing connector suffix', () => {
    assert.equal(displayTitle('Asana connector'), 'Asana')
    assert.equal(displayTitle('Asana MCP connector'), 'Asana MCP')
  })

  it('leaves titles without that suffix unchanged', () => {
    assert.equal(displayTitle('Monday.com'), 'Monday.com')
  })
})

describe('operatorOf', () => {
  it('labels a Vendor MCP connector when the slug ends in mcp', () => {
    assert.deepEqual(operatorOf('asanamcp'), { kind: 'vendor-mcp', label: 'Vendor MCP' })
  })

  it('labels a Scalekit connector otherwise', () => {
    assert.deepEqual(operatorOf('asana'), { kind: 'scalekit', label: 'scalekit' })
  })
})

describe('normalizeAuth', () => {
  it('inserts the missing space in OAuth 2.1 spellings', () => {
    assert.equal(normalizeAuth('OAuth2.1/DCR'), 'OAuth 2.1/DCR')
    assert.equal(normalizeAuth('OAuth2.1'), 'OAuth 2.1')
  })

  it('does not collapse distinct auth types', () => {
    assert.equal(normalizeAuth('OAuth 2.0'), 'OAuth 2.0')
    assert.equal(normalizeAuth('OAuth 2.1'), 'OAuth 2.1')
    assert.equal(normalizeAuth('API Key'), 'API Key')
  })
})

describe('coverageLabel', () => {
  it('shows Coming soon when there are no tools', () => {
    assert.equal(coverageLabel(0), 'Coming soon')
  })

  it('shows a counted tool label otherwise', () => {
    assert.equal(coverageLabel(1), '1 tool')
    assert.equal(coverageLabel(199), '199 tools')
  })
})
