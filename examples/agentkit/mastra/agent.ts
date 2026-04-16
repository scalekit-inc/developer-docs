/**
 * Mastra agent with Scalekit-authenticated Gmail tools via MCP.
 * Mirrors: /agentkit/examples/mastra/
 * Run: tsx mastra/agent.ts (from examples/agentkit/)
 *
 * Prerequisite: set SCALEKIT_MCP_URL in .env
 * Generate it via Python: actions.mcp.ensure_instance(config_name="...", user_identifier="docs-example")
 */
import { Agent } from '@mastra/core/agent'
import { MCPClient } from '@mastra/mcp'
import { createOpenAI } from '@ai-sdk/openai'
import 'dotenv/config'

const mcpUrl = process.env.SCALEKIT_MCP_URL
if (!mcpUrl) {
  console.error(
    'SCALEKIT_MCP_URL not set. Generate it with actions.mcp.ensure_instance() and add to .env',
  )
  process.exit(1)
}

const mcp = new MCPClient({
  servers: {
    scalekit: { url: new URL(mcpUrl) },
  },
})

const toolsets = await mcp.listToolsets()
const tools = Object.values(toolsets).reduce((acc, ts) => ({ ...acc, ...ts }), {})

const openaiProvider = createOpenAI({
  baseURL: process.env.OPENAI_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
})

const agent = new Agent({
  name: 'gmail_assistant',
  instructions: 'You are a helpful Gmail assistant.',
  model: openaiProvider.chat('claude-sonnet-4-6'),
  tools,
})

const result = await agent.generate('Fetch my last 5 unread emails and summarize them')
console.log(result.text)

await mcp.disconnect()
