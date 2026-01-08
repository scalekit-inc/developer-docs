import express from 'express'
import { scalekit, config } from './config.js'

export const authRouter = express.Router()

// Generate authorization URL and redirect
authRouter.get('/login', async (req, res) => {
  const organizationId = req.query.organization_id

  const authorizationURL = scalekit.getAuthorizationUrl(config.redirectUri, {
    organizationId,
    state: 'random-state-string',
  })

  res.redirect(authorizationURL)
})

// Handle OAuth callback
authRouter.get('/callback', async (req, res) => {
  const { code, state } = req.query

  try {
    // Exchange code for tokens
    const result = await scalekit.authenticateWithCode(code, config.redirectUri)

    const { idTokenClaims, user } = result

    // Store user in session
    req.session.userId = user.id
    req.session.email = user.email
    req.session.organizationId = idTokenClaims.org_id

    res.redirect('/dashboard')
  } catch (error) {
    console.error('Authentication failed:', error)
    res.redirect('/login?error=auth_failed')
  }
})

// Logout endpoint
authRouter.post('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})
