import 'dotenv/config'
import express from 'express'
import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { searchDocsTool } from './tools/search-docs.js'
import { createPylonIssueTool } from './tools/create-pylon-issue.js'
import { SYSTEM_PROMPT } from './agent.js'

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
    return
  }
  next()
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/chat', async (req, res) => {
  const { messages, userId = '', orgId = '' } = req.body

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'),
    system: SYSTEM_PROMPT,
    messages,
    maxTokens: 1024,
    maxSteps: 5,
    tools: {
      search_docs: searchDocsTool,
      create_pylon_issue: createPylonIssueTool({ userId, orgId }),
    },
  })

  result.pipeDataStreamToResponse(res)
})

const port = process.env.PORT ?? 3001
app.listen(port, () => {
  console.log(`chatbot-api listening on http://localhost:${port}`)
})

export { app }
