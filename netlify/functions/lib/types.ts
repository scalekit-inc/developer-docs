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
