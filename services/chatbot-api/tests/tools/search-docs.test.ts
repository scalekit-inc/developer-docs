import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { searchDocsTool } from '../../src/tools/search-docs.js'

const MOCK_FSA_CONTENT = '# Full Stack Auth\n\nScalekit FSA documentation content here.'

describe('searchDocsTool', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        text: async () => MOCK_FSA_CONTENT,
      }),
    )
    process.env.DOCS_BASE_URL = 'https://docs.scalekit.com'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('has correct tool definition for Claude', () => {
    expect(searchDocsTool.definition.name).toBe('search_docs')
    expect(searchDocsTool.definition.description).toContain('search')
    expect(searchDocsTool.definition.input_schema.properties).toHaveProperty('query')
  })

  it('returns docs content for a query', async () => {
    const result = await searchDocsTool.execute(
      { query: 'How do I set up RBAC?' },
      { userId: 'anon', orgId: '', isAdmin: false },
    )
    expect(result).toContain('Full Stack Auth')
  })

  it('accepts optional topic override', async () => {
    const result = await searchDocsTool.execute(
      { query: 'How do I set up RBAC?', topic: 'sso' },
      { userId: 'anon', orgId: '', isAdmin: false },
    )
    expect(result).toBeDefined()
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('enterprise-sso'),
      expect.any(Object),
    )
  })

  it('does not require confirmation', () => {
    expect(searchDocsTool.requiresConfirmation).toBeFalsy()
  })
})
