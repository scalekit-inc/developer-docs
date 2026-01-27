import crypto from 'node:crypto'

/**
 * Returns a header value from a case-insensitive headers object.
 *
 * @param {Record<string, string | undefined>} headers - Request headers.
 * @param {string} name - Header name to lookup.
 * @returns {string | undefined} The header value if present.
 */
export function getHeader(
  headers: Record<string, string | undefined>,
  name: string,
): string | undefined {
  const lowerName = name.toLowerCase()
  return headers[name] ?? headers[lowerName]
}

/**
 * Verifies Slack request signature and timestamp freshness.
 *
 * @param {object} params - Verification parameters.
 * @param {string} params.body - Raw request body.
 * @param {Record<string, string | undefined>} params.headers - Request headers.
 * @param {string} params.signingSecret - Slack signing secret.
 * @param {number} [params.nowSeconds] - Current time in seconds.
 * @returns {{ isValid: boolean; reason?: string }} Verification result.
 */
export function verifySlackSignature({
  body,
  headers,
  signingSecret,
  nowSeconds = Math.floor(Date.now() / 1000),
}: {
  body: string
  headers: Record<string, string | undefined>
  signingSecret: string
  nowSeconds?: number
}): { isValid: boolean; reason?: string } {
  const signature = getHeader(headers, 'x-slack-signature')
  const timestamp = getHeader(headers, 'x-slack-request-timestamp')

  if (!signature || !timestamp) {
    return { isValid: false, reason: 'Missing Slack signature headers.' }
  }

  const timestampNumber = Number(timestamp)
  if (!Number.isFinite(timestampNumber)) {
    return { isValid: false, reason: 'Invalid Slack timestamp.' }
  }

  const ageSeconds = Math.abs(nowSeconds - timestampNumber)
  if (ageSeconds > 60 * 5) {
    return { isValid: false, reason: 'Slack timestamp outside allowed window.' }
  }

  const signatureBase = `v0:${timestamp}:${body}`
  const hash = crypto.createHmac('sha256', signingSecret).update(signatureBase).digest('hex')
  const expected = `v0=${hash}`

  const signatureBuffer = Buffer.from(signature, 'utf8')
  const expectedBuffer = Buffer.from(expected, 'utf8')

  if (signatureBuffer.length !== expectedBuffer.length) {
    return { isValid: false, reason: 'Slack signature length mismatch.' }
  }

  const matches = crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  return matches ? { isValid: true } : { isValid: false, reason: 'Slack signature mismatch.' }
}

/**
 * Removes bot mention markup from Slack message text.
 *
 * @param {string} text - Raw Slack message text.
 * @returns {string} Cleaned question text.
 */
export function stripSlackMentions(text: string): string {
  return text
    .replace(/<@[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Posts a message to Slack.
 *
 * @param {string} token - Slack bot token.
 * @param {string} channel - Slack channel ID.
 * @param {string} text - Message text.
 * @param {string} threadTs - Thread timestamp to reply to.
 * @returns {Promise<void>} Resolves when Slack acknowledges.
 * @throws {Error} When the Slack API returns an error or the request fails.
 * @see https://api.slack.com/methods/chat.postMessage
 */
export async function postSlackMessage(
  token: string,
  channel: string,
  text: string,
  threadTs?: string,
): Promise<void> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        channel,
        text,
        thread_ts: threadTs,
      }),
      signal: controller.signal,
    })

    const payload = (await response.json()) as { ok: boolean; error?: string }

    if (!response.ok || !payload.ok) {
      throw new Error(payload.error ?? `Slack API error (${response.status})`)
    }
  } finally {
    clearTimeout(timeout)
  }
}
