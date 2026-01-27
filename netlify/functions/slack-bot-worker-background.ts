/**
 * Copyright (c) 2026 Scalekit Inc.
 * SPDX-License-Identifier: MIT
 *
 * Background worker for Slack bot. This function is invoked asynchronously
 * by the main slack-bot handler and runs for up to 15 minutes.
 *
 * The `-background` suffix in the filename makes this a Netlify Background Function.
 * See: https://docs.netlify.com/functions/background-functions/
 */
import { getAlgoliaConfig, streamAskAiAnswer } from './lib/algolia'
import { postSlackMessage } from './lib/slack'
import type { NetlifyFunctionContext, NetlifyFunctionEvent } from './lib/types'

interface WorkerPayload {
  channel: string
  threadTs: string
  question: string
}

/**
 * Background worker handler for AskAI processing.
 *
 * @param {NetlifyFunctionEvent} event - Netlify function event.
 * @param {NetlifyFunctionContext} _context - Netlify function context.
 * @returns {Promise<{ statusCode: number }>} Response object.
 */
export async function handler(event: NetlifyFunctionEvent, _context: NetlifyFunctionContext) {
  console.info('[worker] Background worker invoked.', {
    method: event.httpMethod,
    path: event.path,
  })

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405 }
  }

  const body = event.body ?? ''
  let payload: WorkerPayload

  try {
    payload = JSON.parse(body) as WorkerPayload
  } catch {
    console.error('[worker] Invalid JSON payload.')
    return { statusCode: 400 }
  }

  const { channel, threadTs, question } = payload

  if (!channel || !threadTs || !question) {
    console.error('[worker] Missing required fields in payload.')
    return { statusCode: 400 }
  }

  console.info('[worker] Processing AskAI request.', {
    channel,
    threadTs,
    questionLength: question.length,
  })

  const startTime = Date.now()

  try {
    const config = getAlgoliaConfig()
    const answer = await streamAskAiAnswer(config, question)
    const elapsedMs = Date.now() - startTime

    const message = formatSlackAnswer(answer.answer, answer.sources)
    await postSlackMessage(getSlackToken(), channel, message, threadTs)

    console.info('[worker] Posted AskAI response to Slack.', { elapsedMs })
  } catch (error) {
    console.error('[worker] Error during AskAI processing:', error)

    const errorMessage =
      error instanceof Error
        ? `Sorry, I ran into an error: ${error.message}`
        : 'Sorry, I ran into an unexpected error while fetching that answer.'

    await postSlackMessage(getSlackToken(), channel, errorMessage, threadTs)
  }

  return { statusCode: 200 }
}

/**
 * Builds the Slack answer text with optional sources.
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
