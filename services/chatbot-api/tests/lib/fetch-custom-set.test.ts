import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchCustomSet } from '../../src/lib/fetch-custom-set.js'
import type { TopicSlug } from '../../src/lib/classify-query.js'

const MOCK_DOCS_CONTENT = '# FSA Docs\n\nThis is the full stack auth documentation.'

describe('fetchCustomSet', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    process.env.DOCS_BASE_URL = 'https://docs.scalekit.com'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('fetches the correct URL for fsa topic', async () => {
    ;(fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: async () => MOCK_DOCS_CONTENT,
    })

    const result = await fetchCustomSet('fsa')

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/_llms-txt/'), expect.any(Object))
    expect(result).toBe(MOCK_DOCS_CONTENT)
  })

  it('falls back to llms-small.txt when custom set fetch fails', async () => {
    ;(fetch as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({ ok: false, status: 404 })
      .mockResolvedValueOnce({ ok: true, text: async () => '# Full Docs\n\nAll content.' })

    const result = await fetchCustomSet('fsa')
    expect(result).toBe('# Full Docs\n\nAll content.')
  })

  it('throws when both custom set and fallback fail', async () => {
    ;(fetch as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({ ok: false, status: 404 })
      .mockResolvedValueOnce({ ok: false, status: 500 })

    await expect(fetchCustomSet('fsa')).rejects.toThrow('Failed to fetch docs content')
  })

  it('fetches all topic slugs without throwing', async () => {
    const slugs: TopicSlug[] = [
      'fsa',
      'sso',
      'scim',
      'agent-auth',
      'mcp',
      'm2m',
      'sdk',
      'quickstart',
    ]
    for (const slug of slugs) {
      ;(fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        text: async () => `# ${slug} docs`,
      })
      const result = await fetchCustomSet(slug)
      expect(result).toContain(slug)
    }
  })
})
