import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createPylonIssueTool } from '../../src/tools/create-pylon-issue.js'
import type { AgentContext } from '@scalekit/agentkit'

const MOCK_ISSUE_RESPONSE = {
  id: 'issue_abc123',
  title: 'Docs gap: passkeys + SAML SSO',
  status: 'open',
}

describe('createPylonIssueTool', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => MOCK_ISSUE_RESPONSE,
      }),
    )
    process.env.PYLON_API_TOKEN = 'test-pylon-token'
    process.env.PYLON_API_URL = 'https://api.usepylon.com'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    delete process.env.PYLON_API_TOKEN
    delete process.env.PYLON_API_URL
  })

  it('has correct tool definition', () => {
    expect(createPylonIssueTool.definition.name).toBe('create_pylon_issue')
    expect(createPylonIssueTool.definition.input_schema.properties).toHaveProperty('question')
    expect(createPylonIssueTool.definition.input_schema.properties).toHaveProperty(
      'conversation_summary',
    )
  })

  it('requires confirmation before executing', () => {
    expect(createPylonIssueTool.requiresConfirmation).toBe(true)
  })

  it('creates an issue with user context when user is identified', async () => {
    const ctx: AgentContext = {
      userId: 'jane@acme.com',
      orgId: 'org_acme',
      isAdmin: false,
    }

    const result = (await createPylonIssueTool.execute(
      {
        question: 'Can passkeys and SAML SSO coexist for the same org?',
        conversation_summary:
          'User asked about passkeys + SAML, no confident answer found in docs.',
      },
      ctx,
    )) as { issueId: string; message: string }

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('usepylon.com'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-pylon-token',
        }),
      }),
    )
    expect(result.issueId).toBe('issue_abc123')
    expect(result.message).toContain('issue_abc123')
  })

  it('creates an issue for anonymous users without user context', async () => {
    const ctx: AgentContext = {
      userId: '',
      orgId: '',
      isAdmin: false,
    }

    await createPylonIssueTool.execute(
      { question: 'How does M2M auth work?', conversation_summary: 'No answer found.' },
      ctx,
    )

    expect(fetch).toHaveBeenCalled()
  })

  it('throws with a clear message when PYLON_API_TOKEN is missing', async () => {
    delete process.env.PYLON_API_TOKEN
    const ctx: AgentContext = { userId: '', orgId: '', isAdmin: false }

    await expect(
      createPylonIssueTool.execute({ question: 'test', conversation_summary: 'test' }, ctx),
    ).rejects.toThrow('PYLON_API_TOKEN')
  })

  it('throws when Pylon API returns an error', async () => {
    ;(fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    })
    const ctx: AgentContext = { userId: '', orgId: '', isAdmin: false }

    await expect(
      createPylonIssueTool.execute({ question: 'test', conversation_summary: 'test' }, ctx),
    ).rejects.toThrow('Pylon API error 401')
  })
})
