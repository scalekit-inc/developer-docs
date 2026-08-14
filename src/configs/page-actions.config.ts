import { AGENT_PLUGIN_INLINE } from './agent-instructions'

/**
 * Prompt shown (and copied) on homepage step 3.
 * What you see is what you paste into the coding agent.
 * Manufact-shaped playbook, tightened with writing-for-agents:
 * one process, a checkable Done on every step, skill as source of truth,
 * positive wording (no "don't invent"), exact documented commands only.
 */
export const homepagePrompt = `Build with Scalekit.

Load https://docs.scalekit.com/llms.txt before writing any Scalekit code. The installed authstack skill is the source of truth for APIs, SDK calls, and connection names. Credentials come only from values I paste.

Follow these in order. A step is done only when its check passes.

0. Ask — offer agent auth, full-stack auth, MCP auth, SSO, or SCIM. If I am not sure, propose Gmail agent auth and proceed unless I pick another.
   Done: I have named a product.

1. Install —
   npx -y @scalekit-inc/cli setup -y
   Done: the command exits 0.

2. Skill — install the matching authstack skill, non-interactive. Default (Gmail agent auth):
   npx --yes skills add scalekit-inc/authstack --yes --skill integrating-agentkit -a cursor -a claude-code -a codex

   Other products:
   - full-stack auth → implementing-saaskit
   - MCP auth → adding-mcp-oauth
   - SSO → implementing-modular-sso
   - SCIM → implementing-scim-provisioning

   Done: that skill is installed for cursor, claude-code, and codex.

3. Credentials — ask me to paste these from https://app.scalekit.com → Developers → Settings → API Credentials:
   SCALEKIT_ENVIRONMENT_URL
   SCALEKIT_CLIENT_ID
   SCALEKIT_CLIENT_SECRET
   Done: I have pasted all three.

4. Implement — load the installed skill and run its steps. Agent auth only: use the dashboard Connection Name exactly as written. Gmail needs no extra connection; every other connector is created first under Dashboard → AgentKit → Connections.
   Done: the skill's own checklist is complete.

5. Handoff — return that product's proof plus https://app.scalekit.com with the path below.
   Done: both are in your reply.

   - agent auth: authorization link if the connected account is not ACTIVE; after OAuth, status ACTIVE and one successful tool/API call. Path: AgentKit → Connections
   - full-stack auth: the app login/authorize URL, plus
     npx @scalekit-sdk/dryrun --env_url=$SCALEKIT_ENVIRONMENT_URL --client_id=$SCALEKIT_CLIENT_ID --mode=fsa
     Register http://localhost:12456/auth/callback under Authentication → Redirect URIs first. Path: Authentication → Redirect URLs
   - MCP auth: MCP server URL and https://<your-domain>/.well-known/oauth-protected-resource. Curl the MCP URL for 401 + WWW-Authenticate, and curl the well-known JSON. Path: MCP servers
   - SSO: authorization URL that opens the SSO simulator — Test Organization organization_id from Organizations → Test Organization, or login_hint on @example.com / @example.org. Path: Organizations → Test Organization
   - SCIM: no auth link. Public webhook URL, plus the admin portal link (generatePortalLink or Organizations → Generate link) so IT can copy the SCIM Endpoint URL and Bearer token. Path: Webhooks and Organizations`

/**
 * Prompt used when opening documentation pages in coding agents (ChatGPT, Claude, Cursor).
 * The {url} placeholder is replaced with the current page URL by starlight-page-actions.
 * Note: The plugin replaces only the first {url} occurrence, so we use it once.
 */
export const pageActionsPrompt = `You are an expert technical assistant implementing Scalekit authentication.

${AGENT_PLUGIN_INLINE}

Your task with the documentation at {url}:
1. Read and deeply analyze the content at that URL.
2. Build a mental model of: the main concepts, key terminology, structure, and any code examples present.
3. Enter Q&A mode — wait for my questions and answer them based ONLY on the content at that URL.

Rules:
- If I ask something not covered in the doc, say so explicitly instead of guessing.
- Cite the specific section or heading your answer comes from.
- Keep answers concise unless I ask you to elaborate.
- If a question requires code, mirror the style and language shown in the doc.

Ready?`
