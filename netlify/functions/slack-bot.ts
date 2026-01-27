import { getAlgoliaConfig, streamAskAiAnswer } from './lib/algolia'
import { postSlackMessage, stripSlackMentions, verifySlackSignature } from './lib/slack'
import type {
  NetlifyFunctionContext,
  NetlifyFunctionEvent,
  SlackAppMentionEvent,
  SlackEventPayload,
  SlackUrlVerificationPayload,
} from './lib/types'

/**
 * Slack event handler for Algolia AskAI answers.
 *
 * @param {NetlifyFunctionEvent} event - Netlify function event.
 * @param {NetlifyFunctionContext} context - Netlify function context.
 * @returns {Promise<{ statusCode: number; body?: string }>} Response object.
 */
export async function handler(event: NetlifyFunctionEvent, context: NetlifyFunctionContext) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const body = getRawBody(event)
  const signingSecret = process.env.SLACK_SIGNING_SECRET ?? ''

  if (!signingSecret) {
    return { statusCode: 500, body: 'Missing Slack signing secret.' }
  }

  const signatureCheck = verifySlackSignature({
    body,
    headers: event.headers,
    signingSecret,
  })

  if (!signatureCheck.isValid) {
    return { statusCode: 401, body: signatureCheck.reason ?? 'Invalid signature.' }
  }

  const payload = parseSlackPayload(body)
  if (!payload) {
    return { statusCode: 400, body: 'Invalid JSON payload.' }
  }

  if (isUrlVerification(payload)) {
    return { statusCode: 200, body: payload.challenge }
  }

  const processingPromise = handleSlackEvent(payload).catch(async (error) => {
    await postFailureMessage(payload, error)
  })

  if (typeof context.waitUntil === 'function') {
    context.waitUntil(processingPromise)
  }

  return { statusCode: 200, body: 'OK' }
}

/**
 * Parses the Slack payload, safely handling JSON errors.
 *
 * @param {string} body - Raw request body.
 * @returns {SlackEventPayload | null} Parsed payload or null.
 */
function parseSlackPayload(body: string): SlackEventPayload | null {
  try {
    return JSON.parse(body) as SlackEventPayload
  } catch {
    return null
  }
}

/**
 * Determines whether the payload is a URL verification challenge.
 *
 * @param {SlackEventPayload} payload - Slack payload.
 * @returns {payload is SlackUrlVerificationPayload} True if URL verification.
 */
function isUrlVerification(payload: SlackEventPayload): payload is SlackUrlVerificationPayload {
  return payload.type === 'url_verification'
}

/**
 * Executes the AskAI flow for app mention events.
 *
 * @param {SlackEventPayload} payload - Slack payload.
 * @returns {Promise<void>} Resolves after posting a response.
 */
async function handleSlackEvent(payload: SlackEventPayload): Promise<void> {
  if (payload.type !== 'event_callback') return
  if (!payload.event || payload.event.type !== 'app_mention') return

  const event = payload.event as SlackAppMentionEvent
  if (event.subtype === 'bot_message' || event.bot_id) return

  const question = stripSlackMentions(event.text)
  if (!question) return

  const config = getAlgoliaConfig()
  const answer = await streamAskAiAnswer(config, question)

  const message = formatSlackAnswer(answer.answer, answer.sources)
  await postSlackMessage(getSlackToken(), event.channel, message, event.thread_ts ?? event.ts)
}

/**
 * Sends a failure response back to Slack when AskAI fails.
 *
 * @param {SlackEventPayload} payload - Slack payload.
 * @param {unknown} error - Error encountered while processing.
 * @returns {Promise<void>} Resolves when message is posted.
 */
async function postFailureMessage(payload: SlackEventPayload, error: unknown): Promise<void> {
  if (payload.type !== 'event_callback' || payload.event?.type !== 'app_mention') return

  const event = payload.event as SlackAppMentionEvent
  if (!event.channel) return

  const message =
    error instanceof Error
      ? `Sorry, I ran into an error: ${error.message}`
      : 'Sorry, I ran into an unexpected error while fetching that answer.'

  await postSlackMessage(getSlackToken(), event.channel, message, event.thread_ts ?? event.ts)
}

/**
 * Builds the Slack answer text with optional sources.
 *
 * @param {string} answer - Answer text from AskAI.
 * @param {Array<{ url?: string; title?: string }>} sources - Related sources.
 * @returns {string} Slack formatted message.
 */
function formatSlackAnswer(
  answer: string,
  sources: Array<{ url?: string; title?: string }>,
): string {
  if (!sources.length) {
    return answer || 'I could not find an answer for that question.'
  }

  const sourceLines = sources
    .filter((source) => source.url)
    .slice(0, 4)
    .map((source) => `• <${source.url}|${source.title ?? source.url}>`)
    .join('\n')

  const sourcesSection = sourceLines ? `\n\nSources:\n${sourceLines}` : ''
  return `${answer}\n${sourcesSection}`.trim()
}

/**
 * Resolves the Slack bot token from environment variables.
 *
 * @returns {string} Slack bot token.
 */
function getSlackToken(): string {
  const token = process.env.SLACK_BOT_TOKEN
  if (!token) {
    throw new Error('Missing Slack bot token.')
  }
  return token
}

/**
 * Returns the raw request body, decoding base64 if needed.
 *
 * @param {NetlifyFunctionEvent} event - Netlify function event.
 * @returns {string} Raw body string.
 */
function getRawBody(event: NetlifyFunctionEvent): string {
  if (!event.body) return ''
  if (event.isBase64Encoded) {
    return Buffer.from(event.body, 'base64').toString('utf8')
  }
  return event.body
}
