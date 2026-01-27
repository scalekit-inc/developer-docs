import crypto from 'node:crypto'
import type { AlgoliaConversationTokenResponse, AlgoliaSource } from './types'

interface AlgoliaConfig {
  appId: string
  apiKey: string
  assistantId: string
  indexName: string
  origin: string
  referer?: string
  baseUrl: string
}

interface AlgoliaAnswer {
  answer: string
  sources: AlgoliaSource[]
}

/**
 * Resolves Algolia AskAI configuration from environment variables.
 *
 * @returns {AlgoliaConfig} Algolia AskAI configuration.
 */
export function getAlgoliaConfig(): AlgoliaConfig {
  const appId = process.env.ALGOLIA_APP_ID ?? ''
  const apiKey = process.env.ALGOLIA_API_KEY ?? ''
  const assistantId = process.env.ALGOLIA_ASKAI_ASSISTANT_ID ?? ''
  const indexName = process.env.ALGOLIA_INDEX_NAME ?? ''
  const origin = process.env.ALGOLIA_ASKAI_ORIGIN ?? 'docs.scalekit.com'
  const referer = process.env.ALGOLIA_ASKAI_REFERER

  if (!appId || !apiKey || !assistantId || !indexName) {
    throw new Error('Missing Algolia AskAI environment variables.')
  }

  const baseUrl = process.env.ALGOLIA_ASKAI_BASE_URL ?? 'https://askai.algolia.com'

  return { appId, apiKey, assistantId, indexName, origin, referer, baseUrl }
}

/**
 * Fetches a conversation token required by the AskAI chat endpoint.
 *
 * @param {AlgoliaConfig} config - Algolia AskAI configuration.
 * @returns {Promise<string>} Conversation token.
 */
export async function fetchConversationToken(config: AlgoliaConfig): Promise<string> {
  const response = await fetch(`${config.baseUrl}/chat/token`, {
    method: 'POST',
    headers: buildAlgoliaTokenHeaders(config),
    body: JSON.stringify({}),
  })

  const payload = (await response.json()) as AlgoliaConversationTokenResponse

  if (!response.ok) {
    throw new Error(
      `Algolia token error (${response.status}): ${payload?.message ?? 'Unknown error'}`,
    )
  }

  const token = payload.token
  if (!token) {
    throw new Error('Algolia token response missing token.')
  }

  return token
}

/**
 * Streams an AskAI response and returns the final answer and sources.
 *
 * @param {AlgoliaConfig} config - Algolia AskAI configuration.
 * @param {string} question - User question text.
 * @returns {Promise<AlgoliaAnswer>} Answer text and sources.
 */
export async function streamAskAiAnswer(
  config: AlgoliaConfig,
  question: string,
): Promise<AlgoliaAnswer> {
  const conversationToken = await fetchConversationToken(config)

  const requestBody = {
    id: crypto.randomUUID(),
    messages: [
      {
        role: 'user',
        content: question,
        id: `msg-${crypto.randomUUID()}`,
        createdAt: new Date().toISOString(),
        parts: [{ type: 'text', text: question }],
      },
    ],
  }

  const response = await fetch(`${config.baseUrl}/chat`, {
    method: 'POST',
    headers: buildAlgoliaChatHeaders(config, conversationToken),
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Algolia chat error (${response.status}): ${errorText}`)
  }

  if (!response.body) {
    throw new Error('Algolia chat response missing stream body.')
  }

  return consumeSseStream(response.body)
}

/**
 * Consumes a Server-Sent Events stream and aggregates response chunks.
 *
 * @param {ReadableStream<Uint8Array>} stream - Response stream.
 * @returns {Promise<AlgoliaAnswer>} Aggregated answer and sources.
 */
async function consumeSseStream(stream: ReadableStream<Uint8Array>): Promise<AlgoliaAnswer> {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let answer = ''
  let sources: AlgoliaSource[] = []

  // Vercel AI SDK Data Stream Protocol prefixes:
  // 0: text delta, 2: data, 9: tool call start, a: tool call result, d: finish, e: error, f: metadata

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue

      // Parse Vercel AI SDK format: "PREFIX:JSON_DATA"
      const colonIndex = trimmed.indexOf(':')
      if (colonIndex === -1) continue

      const prefix = trimmed.slice(0, colonIndex)
      const jsonData = trimmed.slice(colonIndex + 1)

      try {
        if (prefix === '0') {
          // Text content chunk - parse the JSON string
          const text = JSON.parse(jsonData) as string
          answer += text
        } else if (prefix === 'a') {
          // Tool call result - may contain search hits (sources)
          const toolResult = JSON.parse(jsonData) as {
            toolCallId?: string
            result?: {
              hits?: Array<{ url?: string; hierarchy?: { lvl0?: string; lvl1?: string } }>
            }
          }
          if (toolResult.result?.hits) {
            sources = toolResult.result.hits.map((hit) => ({
              url: hit.url,
              title: hit.hierarchy?.lvl1 ?? hit.hierarchy?.lvl0 ?? hit.url,
            }))
          }
        }
        // Ignore other prefixes (f: metadata, 9: tool call start, d: finish, e: error)
      } catch {
        // Ignore malformed chunks
      }
    }
  }

  return {
    answer: answer.trim(),
    sources,
  }
}

/**
 * Builds headers for Algolia API requests.
 *
 * @param {AlgoliaConfig} config - Algolia AskAI configuration.
 * @returns {Record<string, string>} Request headers.
 */
function buildAlgoliaHeaders(config: AlgoliaConfig): Record<string, string> {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Algolia-Application-Id': config.appId,
    'X-Algolia-API-Key': config.apiKey,
    'X-Algolia-Index-Name': config.indexName,
    'X-Algolia-Assistant-Id': config.assistantId,
    origin: config.origin,
  }
}

function buildAlgoliaChatHeaders(config: AlgoliaConfig, token: string): Record<string, string> {
  return {
    ...buildAlgoliaHeaders(config),
    Authorization: `TOKEN ${token}`,
  }
}

function buildAlgoliaTokenHeaders(config: AlgoliaConfig): Record<string, string> {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Algolia-Assistant-Id': config.assistantId,
    origin: config.origin,
    ...(config.referer ? { referer: config.referer } : {}),
  }
}
