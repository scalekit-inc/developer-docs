import type { RegistryTool, AgentContext } from '@scalekit/agentkit'

interface PylonIssueArgs {
  question: string
  conversation_summary: string
  user_email?: string
}

export const createPylonIssueTool: RegistryTool = {
  definition: {
    name: 'create_pylon_issue',
    description:
      'Create a support issue in Pylon when the documentation does not contain a confident answer. ' +
      'Only call this tool after the user has explicitly confirmed they want to create an issue. ' +
      'Include the original question and a summary of what was searched.',
    input_schema: {
      type: 'object',
      properties: {
        question: {
          type: 'string',
          description: "The user's original question that could not be answered from docs.",
        },
        conversation_summary: {
          type: 'string',
          description: 'Brief summary of the conversation and what docs were searched.',
        },
        user_email: {
          type: 'string',
          description: 'Optional email address provided by the user for follow-up.',
        },
      },
      required: ['question', 'conversation_summary'],
    },
  },
  execute: async (args, ctx: AgentContext) => {
    const { question, conversation_summary, user_email } = args as unknown as PylonIssueArgs

    const token = process.env.PYLON_API_TOKEN
    if (!token) throw new Error('PYLON_API_TOKEN environment variable is not set')

    const apiUrl = process.env.PYLON_API_URL ?? 'https://api.usepylon.com'

    const title = `Docs gap: ${question.slice(0, 80)}${question.length > 80 ? '…' : ''}`

    const body: Record<string, unknown> = {
      title,
      body: [
        `**Question:** ${question}`,
        '',
        `**Context:** ${conversation_summary}`,
        '',
        `**Source:** docs chatbot`,
        ctx.userId ? `**User:** ${ctx.userId}` : '',
        ctx.orgId ? `**Org:** ${ctx.orgId}` : '',
        user_email ? `**Contact:** ${user_email}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      tags: ['docs-gap'],
    }

    if (ctx.userId) body.requester_email = ctx.userId

    const res = await fetch(`${apiUrl}/issues`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`Pylon API error ${res.status}: ${text}`)
    }

    const issue = (await res.json()) as { id: string }
    return {
      issueId: issue.id,
      message: `Support issue created (${issue.id}). Our team will follow up${ctx.userId ? ` with ${ctx.userId}` : ''}.`,
    }
  },
  requiresConfirmation: true,
}
