import type { Config, Context } from '@netlify/edge-functions'
import { classifyAccept, classifyPath, classifyTraffic } from './lib/classify-traffic.ts'

// Access Deno env without relying on the Deno global type (not in this tsconfig)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const denoEnv = (globalThis as any).Deno?.env as { get(k: string): string | undefined } | undefined

const POSTHOG_HOST = 'https://ph.scalekit.com'
const PROD_HOST = 'docs.scalekit.com'

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

export default async function handler(request: Request, context: Context) {
  const token = denoEnv?.get('POSTHOG_PROJECT_TOKEN')
  const response = await context.next()
  const host = request.headers.get('host') ?? new URL(request.url).hostname

  // Preview / branch / localhost stay quiet. Same rule as public/js/posthog.js:
  // only production docs.scalekit.com writes to the production project.
  if (token && host === PROD_HOST) {
    const url = new URL(request.url)
    const ip =
      context.ip ||
      request.headers.get('x-nf-client-connection-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      ''
    const userAgent = request.headers.get('user-agent') ?? ''
    const accept = request.headers.get('accept') ?? ''
    const label = classifyTraffic(userAgent)
    const pathKind = classifyPath(url.pathname)
    const acceptKind = classifyAccept(accept)

    context.waitUntil(
      (async () => {
        await fetch(`${POSTHOG_HOST}/i/v0/e/`, {
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
              accept: accept || undefined,
              method: request.method,
              status_code: response.status,
              sk_traffic_class: label.trafficClass,
              sk_agent_name: label.agentName,
              sk_path_kind: pathKind,
              sk_accept_kind: acceptKind,
            },
          }),
        })
      })().catch(() => {}),
    )
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
