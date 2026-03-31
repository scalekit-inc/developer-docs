import { describe, it, expect, vi, afterEach } from 'vitest'

vi.mock('@anthropic-ai/sdk', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      messages: {
        create: vi.fn().mockResolvedValue({
          id: 'msg_test',
          content: [{ type: 'text', text: 'Based on the docs, here is how FSA sessions work...' }],
          stop_reason: 'end_turn',
          usage: { input_tokens: 100, output_tokens: 50 },
        }),
      },
    })),
  }
})

vi.stubGlobal(
  'fetch',
  vi.fn().mockResolvedValue({
    ok: true,
    text: async () => '# FSA Docs\n\nSession management works by...',
  }),
)

describe('createAgent', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('creates an agent with search_docs and create_pylon_issue tools', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key'
    const { createAgent } = await import('../src/agent.js')
    const { runner, tools } = createAgent()

    expect(runner).toBeDefined()
    expect(tools.size).toBe(2)
  })

  it('registers search_docs without confirmation and create_pylon_issue with confirmation', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key'
    const { createAgent } = await import('../src/agent.js')
    const { tools } = createAgent()

    expect(tools.requiresConfirmation('search_docs')).toBe(false)
    expect(tools.requiresConfirmation('create_pylon_issue')).toBe(true)
  })
})
