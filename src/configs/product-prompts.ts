import { AUTHSTACK_SKILLS, ENVIRONMENT_URL_VAR, setupForAgent } from './agent-instructions.ts'

const [agentkitSkill, saaskitSkill, mcpSkill, ssoSkill, scimSkill] = AUTHSTACK_SKILLS

function skillInstall(skill: string) {
  return `npx --yes skills add scalekit-inc/authstack --yes --skill ${skill} --agent cursor --agent claude-code --agent codex`
}

/**
 * One playbook per product. Same shape as the reviewed AgentKit prompt:
 * load docs, name the skill, install, credentials, implement, proof.
 */
export const agentkitPrompt = `Build with AgentKit.

Load https://docs.scalekit.com/llms.txt, then the AgentKit set at https://docs.scalekit.com/_llms-txt/agentkit.txt, before writing any Scalekit code. The installed ${agentkitSkill} skill is the source of truth for APIs, SDK calls, and connection names. Credentials live in the environment.

This run is AgentKit. Default connector is Gmail. Connection Name is gmail unless I name another.

Follow these in order. A step is done only when its check passes.

0. Connector — Gmail unless I name another.
   Use the Connection Name from setup-agentkit. If none is recorded and I did not name a connector, use gmail.
   Gmail can use Connection Name gmail when the dashboard has no Gmail row. Every other connector must already exist under Dashboard → AgentKit → Connections. Use that name exactly.
   Done: I have named a connector. The Connection Name is written down.

1. Install —
   ${setupForAgent}
   Done: the command exits 0.

2. Skill — install ${agentkitSkill}, non-interactive:
   ${skillInstall(agentkitSkill)}
   Done: that skill is installed for cursor, claude-code, and codex.

3. Credentials — set these in a local .env for development, from https://app.scalekit.com → Developers → Settings → API Credentials:
   ${ENVIRONMENT_URL_VAR}
   SCALEKIT_CLIENT_ID
   SCALEKIT_CLIENT_SECRET
   CONNECTION_NAME
   CONNECTION_NAME is the exact dashboard Connection Name (gmail when I did not name another).
   Keep .env out of git. If I paste values into this chat, use them only for that development .env and remind me to rotate them in the dashboard afterward.
   Done: all four names are set in .env. Code reads them from the environment.

4. Implement — load ${agentkitSkill} and run its steps. Use the dashboard Connection Name exactly as written. Pass it as connection_name / connectionName.
   Done: the skill's own checklist is complete.

5. Handoff — return proof plus https://app.scalekit.com → AgentKit → Connections.
   Done: both are in your reply.

   Proof:
   - authorization link if the connected account is not ACTIVE
   - after OAuth, status ACTIVE
   - one successful downstream API call with the fetched token (default: five unread Gmail messages; if I named another connector, one call to that provider)`

export const saaskitPrompt = `Build with SaaSKit.

Load https://docs.scalekit.com/llms.txt, then the SaaSKit Complete set at https://docs.scalekit.com/_llms-txt/saaskit-complete.txt, before writing any Scalekit code. The installed ${saaskitSkill} skill is the source of truth for APIs, SDK calls, and session names. Credentials live in the environment.

This run is SaaSKit. Humans log into my app. Scalekit hosts login. My app stores the session.

Follow these in order. A step is done only when its check passes.

0. Product — SaaSKit. Do not add AgentKit tool calls, MCP well-known metadata, or a Modular Auth switch.
   Done: I have named SaaSKit.

1. Install —
   ${setupForAgent}
   Done: the command exits 0.

2. Skill — install ${saaskitSkill}, non-interactive:
   ${skillInstall(saaskitSkill)}
   Done: that skill is installed for cursor, claude-code, and codex.

3. Credentials — set these in a local .env for development, from https://app.scalekit.com → Developers → Settings → API Credentials:
   ${ENVIRONMENT_URL_VAR}
   SCALEKIT_CLIENT_ID
   SCALEKIT_CLIENT_SECRET
   SCALEKIT_REDIRECT_URI
   SCALEKIT_REDIRECT_URI is the app callback (often http://localhost:3000/callback or /auth/callback). Register that exact URI under Authentication → Redirect URLs → Allowed Callback URLs before you test login.
   Keep .env out of git. If I paste values into this chat, use them only for that development .env and remind me to rotate them in the dashboard afterward.
   Done: all four names are set in .env. Code reads them from the environment.

4. Implement — load ${saaskitSkill} and run its steps. Send the user to Scalekit authorize. Exchange the code on the callback. Store the session. Add logout.
   Register the app callback and an initiate-login URL under Authentication → Redirect URLs. Required scopes are openid profile email. Add offline_access when the app needs a refresh token.
   Done: the skill's own checklist is complete.

5. Handoff — return proof plus https://app.scalekit.com → Authentication → Redirect URLs.
   Done: both are in your reply.

   Proof:
   - the app login / authorize URL
   - after hosted login, a session on a protected route
   - dryrun after you register http://localhost:12456/auth/callback under Authentication → Redirect URLs:
     npx @scalekit-sdk/dryrun --env_url=$${ENVIRONMENT_URL_VAR} --client_id=$SCALEKIT_CLIENT_ID --mode=fsa
   Dryrun is a config check. It is not the app callback.`

export const mcpAuthPrompt = `Build with MCP Authentication.

Load https://docs.scalekit.com/llms.txt, then the MCP Authentication set at https://docs.scalekit.com/_llms-txt/mcp-authentication.txt, before writing any Scalekit code. The installed ${mcpSkill} skill is the source of truth for APIs, SDK calls, and metadata. Credentials live in the environment.

This run protects MY remote MCP server with OAuth 2.1. Scalekit is the authorization server. My server is the resource server. This is not AgentKit Virtual MCP. This is not https://mcp.scalekit.com.

Follow these in order. A step is done only when its check passes.

0. Product — MCP Authentication for a server I host. Transport is Streamable HTTP. Do not use stdio.
   Done: I have named MCP Authentication.

1. Install —
   ${setupForAgent}
   Done: the command exits 0.

2. Skill — install ${mcpSkill}, non-interactive:
   ${skillInstall(mcpSkill)}
   Done: that skill is installed for cursor, claude-code, and codex.

3. Credentials — set these in a local .env for development, from https://app.scalekit.com → Developers → Settings → API Credentials:
   ${ENVIRONMENT_URL_VAR}
   SCALEKIT_CLIENT_ID
   SCALEKIT_CLIENT_SECRET
   Create the MCP server under https://app.scalekit.com → MCP servers → Add MCP server. Enable dynamic client registration and Client ID Metadata Document. Copy SCALEKIT_RESOURCE_ID (res_…) from that server. FastMCP also needs MCP_URL as the base URL with a trailing slash.
   Keep .env out of git. If I paste values into this chat, use them only for that development .env and remind me to rotate them in the dashboard afterward.
   Done: the three API names plus SCALEKIT_RESOURCE_ID are set. Code reads them from the environment.

4. Implement — load ${mcpSkill} and run its steps. Serve Protected Resource Metadata at /.well-known/oauth-protected-resource with no auth middleware. Copy Metadata JSON from Dashboard → MCP servers → your server. On a missing or bad token, return 401 with WWW-Authenticate that points at that well-known URL.
   Done: the skill's own checklist is complete.

5. Handoff — return proof plus https://app.scalekit.com → MCP servers.
   Done: both are in your reply.

   Proof:
   - the MCP server URL
   - curl -i <MCP URL> returns 401 and WWW-Authenticate with resource_metadata
   - curl https://<your-domain>/.well-known/oauth-protected-resource returns JSON with resource, authorization_servers, and scopes_supported`

export const modularSsoPrompt = `Build with Modular SSO.

Load https://docs.scalekit.com/llms.txt, then the Enterprise SSO and SCIM set at https://docs.scalekit.com/_llms-txt/enterprise-sso--scim.txt, before writing any Scalekit code. The installed ${ssoSkill} skill is the source of truth for APIs, SDK calls, and connection selectors. Credentials live in the environment.

This run is Modular SSO. My app already owns users and sessions. Scalekit handles SAML and OIDC with the customer IdP. This is not SaaSKit hosted login.

Follow these in order. A step is done only when its check passes.

0. Product — Modular SSO. Set Dashboard → Settings → Authentication Mode to Modular Auth. Do not disable a Full-Stack Auth toggle on Authentication → General. Do not add offline_access.
   Done: I have named Modular SSO. The environment is Modular Auth.

1. Install —
   ${setupForAgent}
   Done: the command exits 0.

2. Skill — install ${ssoSkill}, non-interactive:
   ${skillInstall(ssoSkill)}
   Done: that skill is installed for cursor, claude-code, and codex.

3. Credentials — set these in a local .env for development, from https://app.scalekit.com → Developers → Settings → API Credentials:
   ${ENVIRONMENT_URL_VAR}
   SCALEKIT_CLIENT_ID
   SCALEKIT_CLIENT_SECRET
   Copy organization_id from Organizations → Test Organization. Do not invent an org id. Register the callback and an initiate-login URL under Authentication → Redirect URLs.
   Keep .env out of git. If I paste values into this chat, use them only for that development .env and remind me to rotate them in the dashboard afterward.
   Done: all three names are set in .env. I have a real Test Organization id.

4. Implement — load ${ssoSkill} and run its steps. The authorize URL must pass one selector: organization_id, connection_id, or login_hint. Implement IdP-initiated login on the initiate-login URL. Create the app session in the callback. Modular SSO does not create Scalekit users or hosted sessions.
   Done: the skill's own checklist is complete.

5. Handoff — return proof plus https://app.scalekit.com → Organizations → Test Organization.
   Done: both are in your reply.

   Proof — an authorization URL that opens the SSO simulator, using any one of:
   - organization_id from Organizations → Test Organization
   - connection_id for that Test Organization SSO connection
   - login_hint on an @example.com or @example.org address
   After the simulator, the callback has a code. Exchange it and show the user profile.`

export const modularScimPrompt = `Build with Modular SCIM.

Load https://docs.scalekit.com/llms.txt, then the Enterprise SSO and SCIM set at https://docs.scalekit.com/_llms-txt/enterprise-sso--scim.txt, before writing any Scalekit code. The installed ${scimSkill} skill is the source of truth for APIs, SDK calls, and webhook events. Credentials live in the environment.

This run is Modular SCIM. The customer IdP provisions users into my app. Scalekit is the SCIM service provider. My app does not implement /Users or /Groups. There is no user authorization link.

Follow these in order. A step is done only when its check passes.

0. Product — Modular SCIM. Do not generate getAuthorizationUrl, a connected-account link, or the admin portal. The portal is implement-sso.
   Done: I have named Modular SCIM.

1. Install —
   ${setupForAgent}
   Done: the command exits 0.

2. Skill — install ${scimSkill}, non-interactive:
   ${skillInstall(scimSkill)}
   Done: that skill is installed for cursor, claude-code, and codex.

3. Credentials — set these in a local .env for development, from https://app.scalekit.com → Developers → Settings → API Credentials:
   ${ENVIRONMENT_URL_VAR}
   SCALEKIT_CLIENT_ID
   SCALEKIT_CLIENT_SECRET
   SCALEKIT_WEBHOOK_SECRET
   SCALEKIT_WEBHOOK_SECRET comes from Dashboard → Webhooks after you add the public endpoint. It is not the API client secret. Do not put the IdP SCIM bearer token in .env. That token is one-time in the admin portal.
   Keep .env out of git. If I paste values into this chat, use them only for that development .env and remind me to rotate them in the dashboard afterward.
   Done: all four names are set in .env. Code reads them from the environment.

4. Implement — load ${scimSkill} and run its steps. Expose a public HTTPS webhook. Verify the signature. Upsert or deactivate local users. Subscribe at least to organization.directory.user_created, organization.directory.user_updated, and organization.directory.user_deleted. Local dev needs a tunnel.
   Done: the skill's own checklist is complete.

5. Handoff — return proof plus https://app.scalekit.com → Webhooks.
   Done: both are in your reply.

   Proof:
   - no auth link and no admin portal from this skill
   - POST /webhooks/scalekit verifies the signature and returns 201
   - the public webhook URL is registered at Dashboard → Webhooks
   - a Send Test Event created or updated a local user
   Name implement-sso if IT still needs the admin portal to turn on the directory.`

export const PRODUCT_PROMPTS = {
  [agentkitSkill]: agentkitPrompt,
  [saaskitSkill]: saaskitPrompt,
  [mcpSkill]: mcpAuthPrompt,
  [ssoSkill]: modularSsoPrompt,
  [scimSkill]: modularScimPrompt,
} as const

export type ProductSkill = keyof typeof PRODUCT_PROMPTS
