/**
 * Vercel AI SDK agent with Scalekit-authenticated Gmail tools.
 * Mirrors: /agentkit/examples/vercel-ai/
 * Run: tsx vercel-ai/agent.ts (from examples/agentkit/)
 */
import { ScalekitClient } from '@scalekit-sdk/node'
import { ConnectorStatus } from '@scalekit-sdk/node/lib/pkg/grpc/scalekit/v1/connected_accounts/connected_accounts_pb'
import { generateText, jsonSchema, stepCountIs, tool } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import 'dotenv/config'

const scalekit = new ScalekitClient(
  process.env.SCALEKIT_ENV_URL!,
  process.env.SCALEKIT_CLIENT_ID!,
  process.env.SCALEKIT_CLIENT_SECRET!,
)

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

const { tools: scopedTools } = await scalekit.tools.listScopedTools('docs-example', {
  filter: { connectionNames: ['gmail'] },
})

const tools = Object.fromEntries(
  scopedTools.map((t) => [
    t.tool.definition.name,
    tool({
      description: t.tool.definition.description,
      parameters: jsonSchema(t.tool.definition.input_schema ?? { type: 'object', properties: {} }),
      execute: async (args) => {
        const result = await scalekit.actions.executeTool({
          toolName: t.tool.definition.name,
          identifier: 'docs-example',
          toolInput: args,
        })
        return result.data
      },
    }),
  ]),
)

const openaiProvider = createOpenAI({
  baseURL: process.env.OPENAI_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
})

const { text } = await generateText({
  model: openaiProvider('claude-sonnet-4-6'),
  tools,
  stopWhen: stepCountIs(5),
  prompt: 'Fetch my last 5 unread emails and summarize them',
})
console.log(text)
