/**
 * Copyright (c) 2026 Scalekit Inc.
 * SPDX-License-Identifier: MIT
 *
 * Author: Scalekit documentation team
 *
 * Shared TypeScript types for Netlify functions used by the Slack bot and
 * Algolia AskAI integration, including Netlify event/context and Slack payloads.
 *
 * Dependency notes:
 * - Pure type definitions, no runtime dependencies.
 * - Referenced by Netlify function handlers and helper libraries in this folder.
 */
export interface NetlifyFunctionEvent {
  body: string | null
  headers: Record<string, string | undefined>
  httpMethod: string
  isBase64Encoded?: boolean
  path: string
  queryStringParameters?: Record<string, string | undefined> | null
}

export interface NetlifyFunctionContext {
  waitUntil?: (promise: Promise<unknown>) => void
}

export interface SlackUrlVerificationPayload {
  type: 'url_verification'
  challenge: string
}

export interface SlackAppMentionEvent {
  type: 'app_mention'
  text: string
  user: string
  channel: string
  ts: string
  thread_ts?: string
  subtype?: string
  bot_id?: string
}

export interface SlackEventCallbackPayload {
  type: 'event_callback'
  event: SlackAppMentionEvent
  api_app_id?: string
  team_id?: string
  event_id?: string
  event_time?: number
}

export type SlackEventPayload =
  | SlackUrlVerificationPayload
  | SlackEventCallbackPayload
  | { type: string }

export interface AlgoliaConversationTokenResponse {
  token?: string
  expiresAt?: number
  [key: string]: unknown
}

export interface AlgoliaSource {
  url?: string
  title?: string
  text?: string
}
