/**
 * Anthropic Claude agent with Scalekit-authenticated Gmail tools.
 * Mirrors: /agentkit/examples/anthropic/
 * Run: tsx anthropic/agent.ts (from examples/agentkit/)
 */
import { ScalekitClient } from '@scalekit-sdk/node'
import { ConnectorStatus } from '@scalekit-sdk/node/lib/pkg/grpc/scalekit/v1/connected_accounts/connected_accounts_pb'
import Anthropic from '@anthropic-ai/sdk'
import 'dotenv/config'

const scalekit = new ScalekitClient(
  process.env.SCALEKIT_ENV_URL!,
  process.env.SCALEKIT_CLIENT_ID!,
  process.env.SCALEKIT_CLIENT_SECRET!,
)
const anthropic = new Anthropic()

// Connect user to Gmail
const { connectedAccount } = await scalekit.actions.getOrCreateConnectedAccount({
  connectionName: 'gmail',
  identifier: 'docs-example',
})
if (connectedAccount?.status !== ConnectorStatus.ACTIVE) {
  const { link } = await scalekit.actions.getAuthorizationLink({
    connectionName: 'gmail',
    identifier: 'docs-example',
  })
  console.log('Authorize Gmail:', link)
  process.exit(0)
}

// Fetch tools scoped to this user
const { tools } = await scalekit.tools.listScopedTools('docs-example', {
  filter: { connectionNames: ['gmail'] },
})
const llmTools = tools.map((t) => ({
  name: t.tool.definition.name,
  description: t.tool.definition.description,
  input_schema: t.tool.definition.input_schema,
}))

// Run the agent loop
const messages: Anthropic.MessageParam[] = [
  { role: 'user', content: 'Fetch my last 5 unread emails and summarize them' },
]

while (true) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    tools: llmTools,
    messages,
  })

  if (response.stop_reason === 'end_turn') {
    const text = response.content.find((b) => b.type === 'text')
    if (text?.type === 'text') console.log(text.text)
    break
  }

  const toolResults: Anthropic.ToolResultBlockParam[] = []
  for (const block of response.content) {
    if (block.type === 'tool_use') {
      const result = await scalekit.actions.executeTool({
        toolName: block.name,
        identifier: 'docs-example',
        toolInput: block.input as Record<string, unknown>,
      })
      toolResults.push({
        type: 'tool_result',
        tool_use_id: block.id,
        content: JSON.stringify(result.data),
      })
    }
  }
  messages.push({ role: 'assistant', content: response.content })
  messages.push({ role: 'user', content: toolResults })
}
