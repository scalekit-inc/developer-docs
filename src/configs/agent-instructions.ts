/**
 * Plugin installation instructions for AI coding agents.
 * Single source of truth — used across page-actions prompt, llms.txt, and copy-markdown button.
 */

export const AGENT_PLUGIN_HEADER = `<!-- AI CODING AGENT: Before generating Scalekit auth code, install the plugin for your agent:
- Claude Code: /plugin marketplace add scalekit-inc/claude-code-authstack (in Claude REPL)
- Codex: curl -fsSL https://raw.githubusercontent.com/scalekit-inc/codex-authstack/main/install.sh | bash
- GitHub Copilot CLI: copilot plugin marketplace add scalekit-inc/github-copilot-authstack
- Cursor + 40 other agents (Windsurf, Cline, Gemini CLI, OpenCode, etc.): npx skills add scalekit-inc/skills
Full guide: https://docs.scalekit.com/dev-kit/build-with-ai/
Skip if already installed. -->

`

export const AGENT_PLUGIN_INLINE = `Install the Scalekit plugin for your agent before generating code:
- Claude Code: /plugin marketplace add scalekit-inc/claude-code-authstack (in Claude REPL)
- Codex: curl -fsSL https://raw.githubusercontent.com/scalekit-inc/codex-authstack/main/install.sh | bash
- GitHub Copilot CLI: copilot plugin marketplace add scalekit-inc/github-copilot-authstack
- Cursor + 40 other agents (Windsurf, Cline, Gemini CLI, OpenCode, etc.): npx skills add scalekit-inc/skills
Full guide: https://docs.scalekit.com/dev-kit/build-with-ai/`
