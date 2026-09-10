import type { Config, Context } from '@netlify/edge-functions'

// Access Deno env without relying on the Deno global type (not in this tsconfig)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const denoEnv = (globalThis as any).Deno?.env as { get(k: string): string | undefined } | undefined

const POSTHOG_HOST = 'https://ph.scalekit.com'

type TrafficClass = 'coding_agent' | 'crawler' | 'automation' | 'unknown'

type Rule = { class: TrafficClass; name: string; pattern: RegExp }

// First match wins. claude-code/ sits above Claude-User so WebFetch stays a coding agent.
const RULES: Rule[] = [
  { class: 'coding_agent', name: 'claude-code', pattern: /claude-code\/|claude-cli\//i },
  { class: 'coding_agent', name: 'cursor', pattern: /Cursor\//i },
  { class: 'coding_agent', name: 'aider', pattern: /\bAider\//i },
  { class: 'coding_agent', name: 'codex', pattern: /\bcodex(?:-cli|-mcp-client)?\//i },
  { class: 'coding_agent', name: 'opencode', pattern: /\bopencode\b/i },
  { class: 'coding_agent', name: 'windsurf', pattern: /windsurf\/|codeium/i },
  { class: 'coding_agent', name: 'gemini-cli', pattern: /gemini-cli/i },
  { class: 'coding_agent', name: 'copilot', pattern: /\bcopilot\b/i },
  { class: 'coding_agent', name: 'cline', pattern: /\bcline\//i },
  { class: 'coding_agent', name: 'continue', pattern: /\bContinue\//i },
  { class: 'coding_agent', name: 'devin', pattern: /\bdevin\b/i },
  { class: 'coding_agent', name: 'junie', pattern: /\bjunie\b/i },
  { class: 'crawler', name: 'gptbot', pattern: /GPTBot/i },
  { class: 'crawler', name: 'oai-searchbot', pattern: /OAI-SearchBot/i },
  { class: 'crawler', name: 'chatgpt-user', pattern: /ChatGPT-User/i },
  { class: 'crawler', name: 'claude-user', pattern: /Claude-User/i },
  { class: 'crawler', name: 'claude-searchbot', pattern: /Claude-SearchBot/i },
  { class: 'crawler', name: 'claudebot', pattern: /ClaudeBot/i },
  { class: 'automation', name: 'lighthouse', pattern: /Chrome-Lighthouse/i },
  {
    class: 'automation',
    name: 'headless-browser',
    pattern: /HeadlessChrome|Playwright|Puppeteer/i,
  },
  { class: 'automation', name: 'curl', pattern: /^curl\//i },
  { class: 'automation', name: 'wget', pattern: /^wget\//i },
  { class: 'automation', name: 'axios', pattern: /^axios\//i },
  { class: 'automation', name: 'got', pattern: /^got\s*\(/i },
  { class: 'automation', name: 'go-http', pattern: /^Go-http-client/i },
  { class: 'automation', name: 'python-http', pattern: /python-requests|httpx|aiohttp/i },
  { class: 'automation', name: 'node-http', pattern: /^node-fetch|^undici/i },
]

function classifyTraffic(ua: string): { trafficClass: TrafficClass; agentName: string } {
  for (const rule of RULES) {
    if (rule.pattern.test(ua)) {
      return { trafficClass: rule.class, agentName: rule.name }
    }
  }
  return { trafficClass: 'unknown', agentName: 'unknown' }
}

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

  if (token) {
    const url = new URL(request.url)
    const ip =
      context.ip ||
      request.headers.get('x-nf-client-connection-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      ''
    const userAgent = request.headers.get('user-agent') ?? ''
    const host = request.headers.get('host') ?? url.hostname
    const label = classifyTraffic(userAgent)

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
              accept: request.headers.get('accept') || undefined,
              method: request.method,
              status_code: response.status,
              sk_traffic_class: label.trafficClass,
              sk_agent_name: label.agentName,
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
