import crypto from 'node:crypto'
import type { AlgoliaConversationTokenResponse, AlgoliaSource } from './types'

interface AlgoliaConfig {
  appId: string
  apiKey: string
  assistantId: string
  indexName: string
  origin: string
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

  if (!appId || !apiKey || !assistantId || !indexName) {
    throw new Error('Missing Algolia AskAI environment variables.')
  }

  const baseUrl = process.env.ALGOLIA_ASKAI_BASE_URL ?? 'https://askai.algolia.com'

  return { appId, apiKey, assistantId, indexName, origin, baseUrl }
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
    headers: buildAlgoliaHeaders(config),
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

  const response = await fetch(`${config.baseUrl}/chat`, {
    method: 'POST',
    headers: buildAlgoliaChatHeaders(config, conversationToken),
    body: JSON.stringify({
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
      searchParameters: {
        facetFilters: ['language:en', 'version:latest'],
      },
      stream: true,
    }),
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

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data:')) continue

      const data = trimmed.slice(5).trim()
      if (!data || data === '[DONE]') continue

      try {
        const chunk = JSON.parse(data) as Record<string, unknown>
        answer += extractChunkText(chunk)

        const chunkSources = extractChunkSources(chunk)
        if (chunkSources.length) {
          sources = chunkSources
        }
      } catch {
        // Ignore malformed SSE chunks and continue streaming.
      }
    }
  }

  return {
    answer: answer.trim(),
    sources,
  }
}

/**
 * Extracts user-visible text from an AskAI stream chunk.
 *
 * @param {Record<string, unknown>} chunk - Parsed chunk payload.
 * @returns {string} Text content for this chunk.
 */
function extractChunkText(chunk: Record<string, unknown>): string {
  if (typeof chunk.content === 'string') return chunk.content
  if (typeof chunk.answer === 'string') return chunk.answer

  const message = chunk.message as { content?: unknown } | undefined
  if (typeof message?.content === 'string') return message.content

  const delta = chunk.delta as { content?: unknown } | undefined
  if (typeof delta?.content === 'string') return delta.content

  const choices = chunk.choices as Array<{ delta?: { content?: string } }> | undefined
  if (choices?.[0]?.delta?.content) return choices[0].delta.content

  return ''
}

/**
 * Extracts related sources from an AskAI stream chunk.
 *
 * @param {Record<string, unknown>} chunk - Parsed chunk payload.
 * @returns {AlgoliaSource[]} Sources if present, otherwise an empty array.
 */
function extractChunkSources(chunk: Record<string, unknown>): AlgoliaSource[] {
  const sources =
    (chunk.sources as AlgoliaSource[] | undefined) ??
    (chunk.relatedSources as AlgoliaSource[] | undefined) ??
    (chunk.result as { sources?: AlgoliaSource[] } | undefined)?.sources ??
    undefined

  return Array.isArray(sources) ? sources : []
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
