import type { Config, Context } from '@netlify/edge-functions'

// Access Deno env without relying on the Deno global type (not in this tsconfig)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const denoEnv = (globalThis as any).Deno?.env as { get(k: string): string | undefined } | undefined

const DEFAULT_POSTHOG_HOST = 'https://ph.scalekit.com'

async function hashDistinctId(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  return (
    'http_log_' +
    [...new Uint8Array(digest)]
      .slice(0, 16)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
  )
}

function clientIp(request: Request, context: Context): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return context.ip || request.headers.get('x-nf-client-connection-ip') || forwarded || ''
}

async function sendHttpLog(
  request: Request,
  response: Response,
  context: Context,
  token: string,
  apiHost: string,
) {
  const url = new URL(request.url)
  const ip = clientIp(request, context)
  const userAgent = request.headers.get('user-agent') ?? ''
  const host = request.headers.get('host') ?? url.hostname

  await fetch(`${apiHost.replace(/\/$/, '')}/i/v0/e/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: token,
      event: '$http_log',
      distinct_id: await hashDistinctId(`${ip}:${url.hostname}:${userAgent}`),
      properties: {
        $process_person_profile: false,
        $current_url: request.url,
        $host: host,
        $pathname: url.pathname,
        $referrer: request.headers.get('referer') || undefined,
        $ip: ip,
        $raw_user_agent: userAgent,
        method: request.method,
        status_code: response.status,
      },
    }),
  })
}

export default async function handler(request: Request, context: Context) {
  const token = denoEnv?.get('POSTHOG_PROJECT_TOKEN')
  const response = await context.next()

  if (token) {
    const apiHost = denoEnv?.get('POSTHOG_HOST') || DEFAULT_POSTHOG_HOST
    const pending = sendHttpLog(request, response, context, token, apiHost).catch(() => {})
    if (typeof context.waitUntil === 'function') {
      context.waitUntil(pending)
    }
  }

  return response
}

export const config: Config = {
  path: '/*',
  excludedPath: [
    '/_astro/*',
    '/assets/*',
    '/images/*',
    '/fonts/*',
    '/favicon*',
    '/og/*',
    // Auth routes only: the local Netlify edge proxy mishandles empty-body POSTs
    // (e.g. /auth/refresh) and surfaces TypeError: fetch failed as unhandled rejections.
    // `/api/*` stays tracked — agents fetch the OpenAPI specs under it, which is
    // exactly the traffic this function exists to measure.
    '/auth/*',
    '/*.js',
    '/*.css',
    '/*.png',
    '/*.jpg',
    '/*.svg',
    '/*.ico',
  ],
}
