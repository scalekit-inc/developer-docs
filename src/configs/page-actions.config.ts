import { AGENT_PLUGIN_INLINE } from './agent-instructions'

/**
 * Prompt shown (and copied) on homepage step 3.
 * What you see is what you paste into the coding agent.
 * Modeled on the mcp-use / Manufact onboarding prompt (SK-1570 / SK-1635).
 * Commands here are the documented CLI and skills-add surface — do not invent extras.
 */
export const homepagePrompt = `Build with Scalekit. Read the docs index first: https://docs.scalekit.com/llms.txt

Follow these in order.

0. Ask me what I want to build: agent auth, full-stack auth, MCP auth, SSO, or SCIM. If I am not sure, propose Gmail agent auth so I can see a working connection, and go with that unless I say otherwise. Always use skills from scalekit-inc/authstack. Do not invent Scalekit APIs.

1. Install the CLI and authstack plugin:
   npx -y @scalekit-inc/cli setup -y

2. Install the skill (non-interactive), which will guide you through the rest. For the default (Gmail agent auth):
   npx --yes skills add scalekit-inc/authstack --yes --skill integrating-agentkit -a cursor -a claude-code -a codex

   If I picked a different product, install that skill instead:
   - full-stack auth → implementing-saaskit
   - MCP auth → adding-mcp-oauth
   - SSO → implementing-modular-sso
   - SCIM → implementing-scim-provisioning

3. Ask me for API credentials from https://app.scalekit.com → Developers → Settings → API Credentials:
   SCALEKIT_ENVIRONMENT_URL
   SCALEKIT_CLIENT_ID
   SCALEKIT_CLIENT_SECRET
   Do not invent values or hard-code secrets.

4. Implement following the installed skill. Read the skill first. For agent auth, Gmail works without extra dashboard setup; every other connector must exist under Dashboard → AgentKit → Connections, and you must use the exact Connection Name.

5. When it works, give me both:
   - the authorization link (if I still need to consent) and how to verify the integration
   - the Scalekit dashboard: https://app.scalekit.com — connections, connected accounts, credentials, and logs`

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
