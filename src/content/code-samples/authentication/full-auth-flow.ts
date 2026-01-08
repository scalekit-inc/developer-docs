import { Scalekit } from '@scalekit-sdk/node'
import express from 'express'

// Initialize Scalekit client
const scalekit = new Scalekit(
  process.env.SCALEKIT_ENV_URL!,
  process.env.SCALEKIT_CLIENT_ID!,
  process.env.SCALEKIT_CLIENT_SECRET!,
)

const app = express()

// Step 1: Generate authorization URL
app.get('/auth/login', async (req, res) => {
  const organizationId = req.query.organization_id as string

  const authorizationURL = scalekit.getAuthorizationUrl('http://localhost:3000/auth/callback', {
    organizationId,
    state: 'random-state-string', // Use a secure random string
  })

  res.redirect(authorizationURL)
})

// Step 2: Handle OAuth callback
app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query

  try {
    // Exchange authorization code for tokens
    const result = await scalekit.authenticateWithCode(
      code as string,
      'http://localhost:3000/auth/callback',
    )

    // Access user information
    const { idTokenClaims, user } = result

    // Step 3: Create session and store user info
    req.session = {
      userId: user.id,
      email: user.email,
      organizationId: idTokenClaims.org_id,
    }

    res.redirect('/dashboard')
  } catch (error) {
    console.error('Authentication failed:', error)
    res.redirect('/login?error=auth_failed')
  }
})

// Step 4: Protect routes with authentication middleware
function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.redirect('/login')
  }
  next()
}

app.get('/dashboard', requireAuth, (req, res) => {
  res.send(`Welcome, ${req.session.email}!`)
})

// Step 5: Handle logout
app.post('/auth/logout', (req, res) => {
  req.session = null
  res.redirect('/login')
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
