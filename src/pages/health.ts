import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request }) => {
  const messages = [
    'Still alive and kicking!',
    'Running like a charm!',
    'All systems green!',
    'Houston, we have no problems!',
    'Serving bytes with a smile!',
    'No bugs detected today!',
    'Purring like a kitten!',
    'Smooth sailing ahead!',
    "Everything's awesome!",
    'Just keep swimming!',
  ]

  const randomMessage = messages[Math.floor(Math.random() * messages.length)]

  return new Response(
    JSON.stringify({
      status: 'ok',
      message: randomMessage,
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}

export const prerender = false
