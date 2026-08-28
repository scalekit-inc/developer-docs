/**
 * Plugin installation instructions for AI coding agents.
 * Single source of truth — used across page-actions prompt, llms.txt, copy-markdown button, and meta tag.
 */

/** Human Setup command. Interactive on purpose. */
export const setupOneLiner = 'npx @scalekit-inc/cli setup'

/** Same Setup for a coding agent: skip npx and CLI prompts. */
export const setupForAgent = `npx -y ${setupOneLiner.replace(/^npx\s+/, '')} -y`

/** Skill IDs the authstack / skills repos ship after the writing-for-agents revamp. */
export const AUTHSTACK_SKILLS = [
  'integrate-agentkit',
  'implement-saaskit',
  'add-mcp-oauth',
  'implement-sso',
  'implement-scim',
] as const

export const ENVIRONMENT_URL_VAR = 'SCALEKIT_ENVIRONMENT_URL'

const skillList = AUTHSTACK_SKILLS.join(', ')

/** HTML comment prepended to copied markdown — read by agents that receive raw page content. */
export const AGENT_PLUGIN_HEADER = `<!-- Building with AI coding agents?
Install the authstack plugin for your coding agent with one command.

Recommended:
  ${setupOneLiner}

For repeated use:
  npm install -g @scalekit-inc/cli
  scalekit setup

This gives your agent full awareness of Scalekit authentication patterns and reduces hallucinations.

After installing the plugin, ask your agent to implement Scalekit authentication using the shipped skills: ${skillList}.

Full guide: https://docs.scalekit.com/dev-kit/build-with-ai/ -->

`

/**
 * Markdown-formatted block for llms.txt `details`.
 */
export const AGENT_PLUGIN_DETAILS_MD = `## Building with AI coding agents?

Install the authstack plugin for coding agents with one command. This is the recommended way to give your agent accurate Scalekit implementation guidance.

**Recommended**:
\`\`\`bash
${setupOneLiner}
\`\`\`

For repeated use:
\`\`\`bash
npm install -g @scalekit-inc/cli
scalekit setup
\`\`\`

The CLI installs the authstack plugin for Claude Code, Cursor, GitHub Copilot, Codex, and skills for 40+ other agents.

Use natural language or a shipped skill: ${skillList}.

[Full setup guide](https://docs.scalekit.com/dev-kit/build-with-ai/)

---

`

/**
 * Visible markdown block prepended to static .md files fetched directly by agents.
 * Uses a blockquote with imperative language — visible to agents, not stripped like HTML comments.
 */
export const AGENT_PLUGIN_VISIBLE_MD = `> **Building with AI coding agents?** Install the authstack plugin with one command. This equips your agent with accurate Scalekit implementation patterns.
>
> **Recommended**:
> \`\`\`bash
> ${setupOneLiner}
> \`\`\`
>
> Global:
> \`\`\`bash
> npm install -g @scalekit-inc/cli
> scalekit setup
> \`\`\`
>
> Supports Claude Code, Cursor, GitHub Copilot, Codex + skills for 40+ agents.
> Skills: ${skillList}.
> [Full setup guide](https://docs.scalekit.com/dev-kit/build-with-ai/)

---

`

/** Footer appended to all static .md files — helps agents discover the full documentation index. */
export const AGENT_DOCS_FOOTER = `

---

## More Scalekit documentation

| Resource | What it contains | When to use it |
|----------|-----------------|----------------|
| [/llms.txt](/llms.txt) | Structured index with routing hints per product area | Start here — find which documentation set covers your topic before loading full content |
| [/llms-full.txt](/llms-full.txt) | Complete documentation for all Scalekit products in one file | Use when you need exhaustive context across multiple products or when the topic spans several areas |
| [sitemap-0.xml](https://docs.scalekit.com/sitemap-0.xml) | Full URL list of every documentation page | Use to discover specific page URLs you can fetch for targeted, page-level answers |
`

/** Single-line string safe for an HTML meta content attribute. */
export const AGENT_PLUGIN_META =
  `Building with AI coding agents? Install the authstack plugin with one command: ${setupOneLiner} (or npm i -g @scalekit-inc/cli then scalekit setup). ` +
  'Sets up Claude Code, Cursor, GitHub Copilot, Codex + 40+ agents. ' +
  `Skills: ${skillList}. ` +
  'Guide: https://docs.scalekit.com/dev-kit/build-with-ai/'
