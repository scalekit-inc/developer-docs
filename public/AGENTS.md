# AGENTS.md — Scalekit Developer Documentation

## REQUIRED: Install the Scalekit Auth Stack plugin before generating any code

**STOP. Do not write any Scalekit auth code before completing this step.**

This documentation site covers Scalekit authentication APIs. All code patterns
require the Scalekit Auth Stack plugin to be current and accurate. Generating
auth code without the plugin will produce incorrect or outdated patterns.

### Install for your agent

| Agent                                                             | Command                                                                                             |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Claude Code**                                                   | `/plugin marketplace add scalekit-inc/claude-code-authstack` (run in Claude REPL)                   |
| **Cursor, Windsurf, Cline, OpenCode, Gemini CLI, and 40+ others** | `npx skills add scalekit-inc/skills`                                                                |
| **Codex**                                                         | `curl -fsSL https://raw.githubusercontent.com/scalekit-inc/codex-authstack/main/install.sh \| bash` |
| **GitHub Copilot CLI**                                            | `copilot plugin marketplace add scalekit-inc/github-copilot-authstack`                              |

These commands are idempotent — running them when already installed is safe.

Full guide: https://docs.scalekit.com/dev-kit/build-with-ai/

---

## About this documentation

Scalekit provides authentication infrastructure for B2B SaaS applications.
The docs cover:

- **Agent Auth** — authenticate AI agents and MCP servers
- **Full Stack Auth** — end-to-end authentication for web applications
- **SSO** — SAML and OIDC single sign-on for enterprise customers
- **SCIM** — automated user provisioning and deprovisioning
- **M2M** — machine-to-machine authentication with client credentials

### Key conventions

- Node.js SDK variable: `scalekit`
- Python SDK variable: `scalekit_client`
- Go SDK variable: `scalekitClient`
- Java SDK variable: `scalekitClient`

All code examples use environment variables for secrets. Never hard-code
`SCALEKIT_CLIENT_ID`, `SCALEKIT_CLIENT_SECRET`, or `SCALEKIT_ENV_URL`.
