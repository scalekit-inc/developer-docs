import express from 'express'
import session from 'express-session'
import { authRouter } from './auth.js'

const app = express()

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
)

app.use(express.json())

// Mount authentication routes
app.use('/auth', authRouter)

// Protected dashboard route
app.get('/dashboard', (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.redirect('/login')
  }
  res.send(`Welcome, ${req.session.email}!`)
})

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
