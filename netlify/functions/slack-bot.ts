/**
 * Copyright (c) 2026 Scalekit Inc.
 * SPDX-License-Identifier: MIT
 *
 * Author: Scalekit documentation team
 *
 * Slack bot handler that receives Slack Events API payloads, validates them,
 * and triggers a background worker for AskAI processing.
 *
 * Key dependencies:
 * - ./lib/slack: stripSlackMentions, verifySlackSignature
 */
import { stripSlackMentions, verifySlackSignature } from './lib/slack'
import type {
  NetlifyFunctionContext,
  NetlifyFunctionEvent,
  SlackAppMentionEvent,
  SlackEventCallbackPayload,
  SlackEventPayload,
  SlackUrlVerificationPayload,
} from './lib/types'

/**
 * Slack event handler that validates requests and triggers background processing.
 *
 * Handles Slack Events API payloads, including the special-case
 * `url_verification` flow where Slack expects the `challenge` token
 * to be returned as plain text.
 *
 * See Slack Events API documentation:
 * https://api.slack.com/apis/events-api#url_verification
 *
 * @param {NetlifyFunctionEvent} event - Netlify function event.
 * @param {NetlifyFunctionContext} _context - Netlify function context.
 * @returns {Promise<{ statusCode: number; body?: string }>} Response object.
 */
export async function handler(event: NetlifyFunctionEvent, _context: NetlifyFunctionContext) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const body = getRawBody(event)
  console.info('[slack] Received request.', {
    path: event.path,
    isBase64Encoded: Boolean(event.isBase64Encoded),
    bodyLength: body.length,
  })

  const signingSecret = process.env.SLACK_SIGNING_SECRET ?? ''
  if (!signingSecret) {
    console.error('[slack] Missing Slack signing secret.')
    return { statusCode: 500, body: 'Missing Slack signing secret.' }
  }

  const signatureCheck = verifySlackSignature({
    body,
    headers: event.headers,
    signingSecret,
  })

  if (!signatureCheck.isValid) {
    console.warn('[slack] Signature verification failed:', signatureCheck.reason)
    return { statusCode: 401, body: signatureCheck.reason ?? 'Invalid signature.' }
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
    return {
      statusCode: 500,
      body: `Missing required environment variables: ${missingEnvVars.join(', ')}`,
    }
  }

  const payload = parseSlackPayload(body)
  if (!payload) {
    console.warn('[slack] Failed to parse JSON payload.')
    return { statusCode: 400, body: 'Invalid JSON payload.' }
  }

  if (isUrlVerification(payload)) {
    console.info('[slack] URL verification challenge received.')
    return { statusCode: 200, body: payload.challenge }
  }

  console.info('[slack] Payload type received:', payload.type)

  // Handle app_mention events by triggering background worker
  if (isEventCallback(payload) && payload.event?.type === 'app_mention') {
    const slackEvent = payload.event as SlackAppMentionEvent

    // Skip bot messages
    if (slackEvent.subtype === 'bot_message' || slackEvent.bot_id) {
      console.info('[slack] Ignoring bot message.')
      return { statusCode: 200, body: 'OK' }
    }

    const question = stripSlackMentions(slackEvent.text)
    if (!question) {
      console.info('[slack] No question provided after mention.')
      return { statusCode: 200, body: 'OK' }
    }

    // Trigger background worker
    const workerPayload = {
      channel: slackEvent.channel,
      threadTs: slackEvent.thread_ts ?? slackEvent.ts,
      question,
    }

    const siteUrl = getSiteUrl(event)
    const workerUrl = `${siteUrl}/.netlify/functions/slack-bot-worker-background`

    console.info('[slack] Triggering background worker.', {
      workerUrl,
      channel: workerPayload.channel,
      threadTs: workerPayload.threadTs,
      questionLength: question.length,
    })

    // Invoke background function and log response
    // Background functions return 202 immediately and process asynchronously
    try {
      const response = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workerPayload),
      })
      console.info('[slack] Background worker response:', {
        status: response.status,
        statusText: response.statusText,
      })
    } catch (error) {
      console.error('[slack] Failed to invoke background worker:', error)
    }
  }

  return { statusCode: 200, body: 'OK' }
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
 * Gets the site URL from environment or request headers.
 */
function getSiteUrl(event: NetlifyFunctionEvent): string {
  // Netlify provides URL env var in production
  if (process.env.URL) {
    return process.env.URL
  }

  // Fallback: construct from host header
  const host = event.headers['host'] ?? event.headers['Host']
  if (host) {
    const protocol = host.includes('localhost') ? 'http' : 'https'
    return `${protocol}://${host}`
  }

  throw new Error('Cannot determine site URL for background worker invocation.')
}

/**
 * Returns the raw request body, decoding base64 if needed.
 */
function getRawBody(event: NetlifyFunctionEvent): string {
  if (!event.body) return ''
  if (event.isBase64Encoded) {
    return Buffer.from(event.body, 'base64').toString('utf8')
  }
  return event.body
}
