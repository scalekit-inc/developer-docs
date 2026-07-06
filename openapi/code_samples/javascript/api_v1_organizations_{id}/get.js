import { ScalekitClient } from '@scalekit-sdk/node'
const scalekit = new ScalekitClient(
  process.env.SCALEKIT_ENV_URL,
  process.env.SCALEKIT_CLIENT_ID,
  process.env.SCALEKIT_CLIENT_SECRET,
)
const organization = await scalekit.organization.getOrganization(organization_id)
