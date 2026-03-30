import 'dotenv/config'
import express from 'express'

const app = express()
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const port = process.env.PORT ?? 3001
app.listen(port, () => {
  console.log(`chatbot-api listening on http://localhost:${port}`)
})

export { app }
