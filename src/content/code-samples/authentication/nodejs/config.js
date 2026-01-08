import { Scalekit } from '@scalekit-sdk/node'

// Initialize Scalekit client with environment variables
export const scalekit = new Scalekit(
  process.env.SCALEKIT_ENV_URL,
  process.env.SCALEKIT_CLIENT_ID,
  process.env.SCALEKIT_CLIENT_SECRET,
)

export const config = {
  redirectUri: 'http://localhost:3000/auth/callback',
  port: 3000,
}
