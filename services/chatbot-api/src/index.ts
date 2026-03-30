import 'dotenv/config'
import express from 'express'
import { createAgentRouter } from '@scalekit/agentkit/express'
import { searchDocsTool } from './tools/search-docs.js'
import { createPylonIssueTool } from './tools/create-pylon-issue.js'
import { SYSTEM_PROMPT } from './agent.js'

const app = express()
app.use(express.json())

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-user-id, x-org-id, x-is-admin')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  next()
})

app.options('*', (_req, res) => res.sendStatus(200))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use(
  '/api/chat',
  createAgentRouter({
    systemPrompt: SYSTEM_PROMPT,
    tools: [searchDocsTool, createPylonIssueTool],
    model: 'claude-haiku-4-5-20251001',
    maxTokens: 1024,
    context: (req) => ({
      userId: (req.headers['x-user-id'] as string) ?? '',
      orgId: (req.headers['x-org-id'] as string) ?? '',
      isAdmin: req.headers['x-is-admin'] === 'true',
    }),
  }),
)

const port = process.env.PORT ?? 3001
app.listen(port, () => {
  console.log(`chatbot-api listening on http://localhost:${port}`)
})

export { app }
