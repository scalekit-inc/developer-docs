/**
 * Prompt stuffed into Open-in-agent deep links (Claude Code `q=`,
 * VS Code Claude Code `prompt=`, Cursor `text=`).
 * starlight-page-actions replaces only the first `{url}` — use it once.
 * Keep this short: Claude Code warns on prompts over 1,000 characters and caps `q` at 5,000.
 */
export const pageActionsPrompt = `Implement this Scalekit documentation in the current repository: {url}

1. Fetch the page (try the same path with .md if the HTML is noisy). Done when you can state the page's outcome and the steps it requires.
2. Load Scalekit skills. If none are available, run \`npx @scalekit-inc/cli setup\`. Done when a Scalekit skill matches the page's product (agent-auth, full-stack-auth, mcp-auth, modular-sso, or modular-scim).
3. Apply those steps to this repo. Use the page as the source of truth and match its code style and SDK names. Done when the page's verify step succeeds, or you name the first blocker only the developer can resolve (credentials, a dashboard click, or a missing app).`
