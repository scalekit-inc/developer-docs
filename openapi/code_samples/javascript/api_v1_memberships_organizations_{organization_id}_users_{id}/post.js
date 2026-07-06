import { ScalekitClient } from '@scalekit-sdk/node'
const scalekit = new ScalekitClient(
  process.env.SCALEKIT_ENV_URL,
  process.env.SCALEKIT_CLIENT_ID,
  process.env.SCALEKIT_CLIENT_SECRET,
)
await scalekit.user.createMembership('org_123', 'usr_123', {
  roles: ['admin'],
  metadata: {
    department: 'engineering',
    location: 'nyc-office',
  },
})
