import { withAgentTracking } from '@usesapient/agent-tracker/netlify'
import { track, shouldTrack } from '@infrasity/agent-tracker'

// Access Deno env without relying on the Deno global type (not in this tsconfig)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const denoEnv = (globalThis as any).Deno?.env as { get(k: string): string | undefined } | undefined

async function handler(
  request: Request,
  context: { next: () => Promise<Response>; geo?: { country?: { code?: string } } },
) {
  const accept = request.headers.get('accept') ?? ''
  const apiKey = denoEnv?.get('INFRASITY_API_KEY')
  if (apiKey && shouldTrack(accept)) {
    const url = new URL(request.url)
    track(
      { apiKey },
      {
        host: request.headers.get('host') ?? url.hostname,
        path: url.pathname,
        userAgent: request.headers.get('user-agent') ?? '',
        accept,
        country: context.geo?.country?.code,
      },
    )
  }
  return context.next()
}

export default withAgentTracking({}, handler)

export const config = {
  path: '/*',
  excludedPath: [
    '/_astro/*',
    '/assets/*',
    '/images/*',
    '/fonts/*',
    '/favicon*',
    '/og/*',
    '/*.js',
    '/*.css',
    '/*.png',
    '/*.jpg',
    '/*.svg',
    '/*.ico',
  ],
}
