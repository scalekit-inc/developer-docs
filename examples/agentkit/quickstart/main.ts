/**
 * Quickstart: fetch last 5 unread Gmail messages via Scalekit.
 * Mirrors: /agentkit/quickstart/
 * Run: tsx main.ts (from examples/agentkit/)
 */
import { ScalekitClient } from '@scalekit-sdk/node'
import { ConnectorStatus } from '@scalekit-sdk/node/lib/pkg/grpc/scalekit/v1/connected_accounts/connected_accounts_pb'
import 'dotenv/config'

const scalekit = new ScalekitClient(
  process.env.SCALEKIT_ENV_URL!,
  process.env.SCALEKIT_CLIENT_ID!,
  process.env.SCALEKIT_CLIENT_SECRET!,
)

const actions = scalekit.actions

// Create or retrieve the user's connected Gmail account
const response = await actions.getOrCreateConnectedAccount({
  connectionName: 'gmail',
  identifier: 'docs-example',
})

const connectedAccount = response.connectedAccount
console.log('Connected account:', connectedAccount?.id, '| status:', connectedAccount?.status)

// Generate authorization link if user hasn't authorized or token is expired
if (connectedAccount?.status !== ConnectorStatus.ACTIVE) {
  const linkResponse = await actions.getAuthorizationLink({
    connectionName: 'gmail',
    identifier: 'docs-example',
  })
  console.log('🔗 Authorize Gmail:', linkResponse.link)
  // In production, redirect user to this URL to complete OAuth flow
  process.exit(0)
}

// Fetch last 5 unread emails
const toolResponse = await actions.executeTool({
  toolName: 'gmail_fetch_mails',
  connectedAccountId: connectedAccount?.id,
  toolInput: {
    query: 'is:unread',
    max_results: 5,
  },
})
console.log('Recent emails:', toolResponse.data)
