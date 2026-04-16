/**
 * OpenAI GPT agent with Scalekit-authenticated Gmail tools.
 * Mirrors: /agentkit/examples/openai/
 * Run: tsx openai/agent.ts (from examples/agentkit/)
 */
import { ScalekitClient } from '@scalekit-sdk/node'
import { ConnectorStatus } from '@scalekit-sdk/node/lib/pkg/grpc/scalekit/v1/connected_accounts/connected_accounts_pb'
import OpenAI from 'openai'
import 'dotenv/config'

const scalekit = new ScalekitClient(
  process.env.SCALEKIT_ENV_URL!,
  process.env.SCALEKIT_CLIENT_ID!,
  process.env.SCALEKIT_CLIENT_SECRET!,
)
const openai = new OpenAI()

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

// Fetch and convert tools to OpenAI format
const { tools } = await scalekit.tools.listScopedTools('docs-example', {
  filter: { connectionNames: ['gmail'] },
})
const llmTools: OpenAI.ChatCompletionTool[] = tools.map((t) => ({
  type: 'function',
  function: {
    name: t.tool.definition.name,
    description: t.tool.definition.description,
    parameters: t.tool.definition.input_schema,
  },
}))

// Run the agent loop
const messages: OpenAI.ChatCompletionMessageParam[] = [
  { role: 'user', content: 'Fetch my last 5 unread emails and summarize them' },
]

while (true) {
  const response = await openai.chat.completions.create({
    model: 'claude-sonnet-4-6',
    tools: llmTools,
    messages,
  })
  const message = response.choices[0].message
  if (!message.tool_calls?.length) {
    console.log(message.content)
    break
  }
  messages.push(message)
  for (const tc of message.tool_calls) {
    const result = await scalekit.actions.executeTool({
      toolName: tc.function.name,
      identifier: 'docs-example',
      toolInput: JSON.parse(tc.function.arguments),
    })
    messages.push({ role: 'tool', tool_call_id: tc.id, content: JSON.stringify(result.data) })
  }
}
