/**
 * Unified CLI setup instructions for AI coding agents.
 * Single source of truth — used across page-actions prompt, llms.txt, copy-markdown button, and meta tag.
 */

/** HTML comment prepended to copied markdown — read by agents that receive raw page content. */
export const AGENT_PLUGIN_HEADER = `<!-- Building with AI coding agents?
Install the Scalekit Auth Stack with a single command:

  npx @scalekit-inc/cli setup

The CLI detects your installed coding agents and configures them with Scalekit's auth plugins.
Supports Claude Code, Cursor, GitHub Copilot, Codex, and 40+ more.
Full guide: https://docs.scalekit.com/dev-kit/build-with-ai/ -->

`

/** Plain-text block for the page-actions prompt (injected into "Open in Claude/Cursor" messages). */
export const AGENT_PLUGIN_INLINE = `Building with AI coding agents?
Install the Scalekit Auth Stack with a single command:

  npx @scalekit-inc/cli setup

The CLI detects your installed coding agents and configures them with Scalekit's auth plugins.
Supports Claude Code, Cursor, GitHub Copilot, Codex, and 40+ more.
Full guide: https://docs.scalekit.com/dev-kit/build-with-ai/`

/**
 * Markdown-formatted block for llms.txt `details`.
 * Uses bold and backtick code for better rendering in LLM contexts —
 * intentionally different formatting from AGENT_PLUGIN_INLINE.
 */
export const AGENT_PLUGIN_DETAILS_MD = `## Building with AI coding agents?

Install the Scalekit Auth Stack with a single command:

\`\`\`bash
npx @scalekit-inc/cli setup
\`\`\`

The CLI detects your installed coding agents (Claude Code, Cursor, GitHub Copilot, Codex, and 40+ more) and configures them with Scalekit's auth plugins automatically.

[Full setup guide](https://docs.scalekit.com/dev-kit/build-with-ai/)

---

`

/**
 * Visible markdown block prepended to static .md files fetched directly by agents.
 * Uses a blockquote with imperative language — visible to agents, not stripped like HTML comments.
 */
export const AGENT_PLUGIN_VISIBLE_MD = `> **Building with AI coding agents?** Install the Scalekit Auth Stack with a single command: \`npx @scalekit-inc/cli setup\`. The CLI detects your installed coding agents (Claude Code, Cursor, GitHub Copilot, Codex, and 40+ more) and configures them automatically. [Full setup guide](https://docs.scalekit.com/dev-kit/build-with-ai/)

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
  'Building with AI coding agents? Run: npx @scalekit-inc/cli setup — ' +
  'works with Claude Code, Cursor, GitHub Copilot, Codex, and 40+ agents. ' +
  'Guide: https://docs.scalekit.com/dev-kit/build-with-ai/'
