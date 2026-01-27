/**
 * Copyright (c) 2026 Scalekit Inc.
 * SPDX-License-Identifier: MIT
 *
 * Author: Scalekit documentation team
 *
 * Slack bot handler that receives Slack Events API payloads, validates them,
 * and processes AskAI requests using context.waitUntil for background processing.
 *
 * Uses Netlify Functions 2.0 format with native Request/Response and Context.
 * See: https://docs.netlify.com/build/functions/get-started/
 */
import { getAlgoliaConfig, streamAskAiAnswer } from './lib/algolia'
import { postSlackMessage, stripSlackMentions, verifySlackSignature } from './lib/slack'
import type {
  SlackAppMentionEvent,
  SlackEventCallbackPayload,
  SlackEventPayload,
  SlackUrlVerificationPayload,
} from './lib/types'

/**
 * Netlify Functions 2.0 Context type.
 * Provides waitUntil for background task processing.
 */
interface NetlifyContext {
  waitUntil: (promise: Promise<unknown>) => void
}

/**
 * Slack event handler using Netlify Functions 2.0 format.
 * Uses context.waitUntil for background AskAI processing.
 *
 * This ensures Slack receives a 200 response immediately (< 3 seconds)
 * while the AI processing continues in the background.
 */
export default async function handler(request: Request, context: NetlifyContext) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const body = await request.text()
  console.info('[slack] Received request.', {
    url: request.url,
    bodyLength: body.length,
  })

  const signingSecret = process.env.SLACK_SIGNING_SECRET ?? ''
  if (!signingSecret) {
    console.error('[slack] Missing Slack signing secret.')
    return new Response('Missing Slack signing secret.', { status: 500 })
  }

  // Convert Request headers to plain object for verification
  const headers: Record<string, string | undefined> = {}
  request.headers.forEach((value, key) => {
    headers[key] = value
  })

  const signatureCheck = verifySlackSignature({
    body,
    headers,
    signingSecret,
  })

  if (!signatureCheck.isValid) {
    console.warn('[slack] Signature verification failed:', signatureCheck.reason)
    return new Response(signatureCheck.reason ?? 'Invalid signature.', { status: 401 })
  }

  // Preflight configuration check
  const missingEnvVars = [
    'SLACK_BOT_TOKEN',
    'ALGOLIA_APP_ID',
    'ALGOLIA_API_KEY',
    'ALGOLIA_ASKAI_ASSISTANT_ID',
    'ALGOLIA_INDEX_NAME',
  ].filter((name) => !process.env[name])

  if (missingEnvVars.length > 0) {
    console.error('[slack] Missing required environment variables:', missingEnvVars)
    return new Response(`Missing required environment variables: ${missingEnvVars.join(', ')}`, {
      status: 500,
    })
  }

  const payload = parseSlackPayload(body)
  if (!payload) {
    console.warn('[slack] Failed to parse JSON payload.')
    return new Response('Invalid JSON payload.', { status: 400 })
  }

  if (isUrlVerification(payload)) {
    console.info('[slack] URL verification challenge received.')
    return new Response(payload.challenge, { status: 200 })
  }

  console.info('[slack] Payload type received:', payload.type)

  // Handle app_mention events
  if (isEventCallback(payload) && payload.event?.type === 'app_mention') {
    const slackEvent = payload.event as SlackAppMentionEvent

    // Skip bot messages
    if (slackEvent.subtype === 'bot_message' || slackEvent.bot_id) {
      console.info('[slack] Ignoring bot message.')
      return new Response('OK', { status: 200 })
    }

    const question = stripSlackMentions(slackEvent.text)
    if (!question) {
      console.info('[slack] No question provided after mention.')
      return new Response('OK', { status: 200 })
    }

    const channel = slackEvent.channel
    const threadTs = slackEvent.thread_ts ?? slackEvent.ts

    console.info('[slack] Processing AskAI request.', {
      channel,
      threadTs,
      questionLength: question.length,
    })

    // Use waitUntil for background processing
    // This returns 200 to Slack immediately while processing continues
    // See: https://docs.netlify.com/build/functions/get-started/#synchronous-function
    context.waitUntil(processAskAiRequest(channel, threadTs, question))
  }

  return new Response('OK', { status: 200 })
}

/**
 * Processes the AskAI request and posts the response to Slack.
 * This runs in the background via context.waitUntil.
 *
 * @param channel - Slack channel ID
 * @param threadTs - Thread timestamp to reply to
 * @param question - User's question
 */
async function processAskAiRequest(
  channel: string,
  threadTs: string,
  question: string,
): Promise<void> {
  const startTime = Date.now()

  try {
    const algoliaConfig = getAlgoliaConfig()
    const answer = await streamAskAiAnswer(algoliaConfig, question)
    const elapsedMs = Date.now() - startTime

    const message = formatSlackAnswer(answer.answer, answer.sources)
    await postSlackMessage(getSlackToken(), channel, message, threadTs)

    console.info('[slack] Posted AskAI response to Slack.', { elapsedMs })
  } catch (error) {
    console.error('[slack] Error during AskAI processing:', error)

    const errorMessage =
      error instanceof Error
        ? `Sorry, I ran into an error: ${error.message}`
        : 'Sorry, I ran into an unexpected error while fetching that answer.'

    try {
      await postSlackMessage(getSlackToken(), channel, errorMessage, threadTs)
    } catch (postError) {
      console.error('[slack] Failed to post error message to Slack:', postError)
    }
  }
}

/**
 * Formats the AskAI answer with sources for Slack.
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
 */
function getSlackToken(): string {
  const token = process.env.SLACK_BOT_TOKEN
  if (!token) {
    throw new Error('Missing Slack bot token.')
  }
  return token
}

/**
 * Parses the Slack payload, safely handling JSON errors.
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
 */
function isUrlVerification(payload: SlackEventPayload): payload is SlackUrlVerificationPayload {
  return payload.type === 'url_verification'
}

/**
 * Determines whether the payload is an event callback.
 */
function isEventCallback(payload: SlackEventPayload): payload is SlackEventCallbackPayload {
  return payload.type === 'event_callback' && 'event' in payload
}

/**
 * Netlify Functions 2.0 configuration.
 * Explicitly sets the endpoint path.
 */
export const config = {
  path: '/.netlify/functions/slack-bot',
}
