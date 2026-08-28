import {
  AUTHSTACK_SKILLS,
  ENVIRONMENT_URL_VAR,
  setupForAgent,
  setupOneLiner,
} from './agent-instructions.ts'

const [agentkitSkill, saaskitSkill, mcpSkill, ssoSkill, scimSkill] = AUTHSTACK_SKILLS
const skillChoice = `${AUTHSTACK_SKILLS.slice(0, -1).join(', ')}, or ${AUTHSTACK_SKILLS.at(-1)}`

export { setupOneLiner, setupForAgent }

/**
 * Playbook copied from the Quickstart with your agent on-ramp.
 * Manufact-shaped, tightened with writing-for-agents:
 * one process, a checkable Done on every instruction, skill as source of truth.
 */
export const homepagePrompt = `Build with Scalekit.

Load https://docs.scalekit.com/llms.txt before writing any Scalekit code. The installed authstack skill is the source of truth for APIs, SDK calls, and connection names. Credentials live in the environment, never in source.

Follow these in order. A step is done only when its check passes.

0. Ask — offer AgentKit, SaaSKit, MCP auth, SSO, or SCIM. If I am not sure, propose AgentKit with Gmail and proceed unless I pick another.
   Done: I have named a product.

1. Install —
   ${setupForAgent}
   Done: the command exits 0.

2. Skill — install the matching authstack skill, non-interactive. Default (AgentKit with Gmail):
   npx --yes skills add scalekit-inc/authstack --yes --skill ${agentkitSkill} -a cursor -a claude-code -a codex

   Other products:
   - SaaSKit → ${saaskitSkill}
   - MCP auth → ${mcpSkill}
   - SSO → ${ssoSkill}
   - SCIM → ${scimSkill}

   Done: that skill is installed for cursor, claude-code, and codex.

3. Credentials — set these in a local .env for development, from https://app.scalekit.com → Developers → Settings → API Credentials:
   ${ENVIRONMENT_URL_VAR}
   SCALEKIT_CLIENT_ID
   SCALEKIT_CLIENT_SECRET
   Keep .env out of git. If I paste values into this chat, use them only for that development .env and remind me to rotate them in the dashboard afterward.
   Done: all three names are set in .env. Code reads them from the environment.

4. Implement — load the installed skill and run its steps. AgentKit only: use the dashboard Connection Name exactly as written. Gmail needs no extra connection; every other connector is created first under Dashboard → AgentKit → Connections.
   Done: the skill's own checklist is complete.

5. Handoff — return that product's proof plus https://app.scalekit.com with the path below.
   Done: both are in your reply.

   - AgentKit: authorization link if the connected account is not ACTIVE; after OAuth, status ACTIVE and one successful tool/API call. Path: AgentKit → Connections
   - SaaSKit: the app login/authorize URL, plus
     npx @scalekit-sdk/dryrun --env_url=$${ENVIRONMENT_URL_VAR} --client_id=$SCALEKIT_CLIENT_ID --mode=fsa
     Register http://localhost:12456/auth/callback under Authentication → Redirect URIs first. Path: Authentication → Redirect URLs
   - MCP auth: MCP server URL and https://<your-domain>/.well-known/oauth-protected-resource. Curl the MCP URL for 401 + WWW-Authenticate, and curl the well-known JSON. Path: MCP servers
   - SSO: authorization URL that opens the SSO simulator — Test Organization organization_id from Organizations → Test Organization, or login_hint on @example.com / @example.org. Path: Organizations → Test Organization
   - SCIM: no auth link and no admin portal. Public webhook URL, signature-verified POST, and a Send Test Event that created or updated a local user. Name implement-sso if IT still needs the admin portal. Path: Webhooks`

/**
 * Prompt stuffed into Open-in-agent deep links (Claude Code `q=`,
 * VS Code Claude Code `prompt=`, Cursor `text=`).
 * starlight-page-actions replaces only the first `{url}` — use it once.
 * Keep this short: Claude Code warns on prompts over 1,000 characters and caps `q` at 5,000.
 */
export const pageActionsPrompt = `Implement this Scalekit documentation in the current repository: {url}

1. Fetch the page (try the same path with .md if the HTML is noisy). Done when you can state the page's outcome and the steps it requires.
2. Load Scalekit skills. If none are available, run \`${setupForAgent}\`. Done when a Scalekit skill matches the page (${skillChoice}).
3. Apply those steps to this repo. Use the page as the source of truth and match its code style and SDK names. Done when the page's verify step succeeds, or you name the first blocker only the developer can resolve (credentials, a dashboard click, or a missing app).`
