import { AGENT_PLUGIN_INLINE } from './agent-instructions'

/**
 * Short line shown on the homepage "Try it in 3 steps" card.
 * The full `homepagePrompt` is what click-to-copy puts on the clipboard.
 */
export const homepagePromptShort =
  'Set up Scalekit in this project. If I have not said what to build, start with GitHub agent auth.'

/**
 * Full prompt copied from the homepage step 3 "Copy the prompt" control.
 * Modeled on the guided mcp-use onboarding prompt (SK-1570 / SK-1635).
 */
export const homepagePrompt = `Build with Scalekit. Read https://docs.scalekit.com/llms.txt first to find the right product area.

Set up Scalekit in this project and implement what I need.

Follow these in order:

0. Ask me what I want to build: agent auth to a third-party app, full-stack auth, MCP auth, SSO, or SCIM. If I am not sure, propose connecting my agent to GitHub with delegated auth so I can see one working path, and go with that unless I say otherwise.

1. Install the authstack plugin if it is not already installed:

   npx @scalekit-inc/cli setup

2. Use the authstack plugin skills. Do not invent Scalekit APIs. Never hard-code secrets or skip token and session validation.

3. When you are done, tell me what you set up, which environment variables I still need to fill in, and how to verify the flow.`

/**
 * Prompt used when opening a documentation page in a coding agent
 * (Open in Claude, Open in Cursor).
 * The {url} placeholder is replaced with the current page URL by starlight-page-actions.
 * The plugin replaces only the first {url} occurrence, so we use it once.
 */
export const pageActionsPrompt = `You are implementing Scalekit from the documentation at {url}.

${AGENT_PLUGIN_INLINE}

Follow these in order:

0. Infer what to build from that page. If the page covers more than one path, ask me which one. If I am not sure, propose the page's primary quickstart and go with that unless I say otherwise.

1. Install the authstack plugin if it is not already installed.

2. Implement the agreed path using the plugin skills. Do not invent Scalekit APIs. Never hard-code secrets or skip token and session validation.

3. When you are done, tell me what you set up, which environment variables I still need to fill in, and how to verify the flow.`
