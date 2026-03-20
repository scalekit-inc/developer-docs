import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const key = process.env.SAPIENT_API_KEY

  return new Response(
    JSON.stringify({
      sapient_key_exists: !!key,
      sapient_key_prefix: key ? key.substring(0, 8) + '...' : 'NOT SET',
      env_keys: Object.keys(process.env).filter((k) => k.includes('SAPIENT') || k.includes('API')),
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
