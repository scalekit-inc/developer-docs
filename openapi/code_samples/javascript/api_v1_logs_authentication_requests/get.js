// List authentication request logs (most recent first)
const res = await fetch(
  `${process.env.SCALEKIT_ENVIRONMENT_URL}/api/v1/logs/authentication/requests?page_size=10&status=SUCCESS`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
)
const data = await res.json()
// data.authRequests, data.next_page_token, data.total_size
