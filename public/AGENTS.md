# AGENTS.md — Scalekit Developer Documentation

## Scalekit Auth Stack plugin

Scalekit provides an official Auth Stack plugin for AI coding agents with
up-to-date API references, validated code snippets, and auth flow examples
that reduce hallucinations when generating auth code.

### Claude Code

```
/plugin marketplace add scalekit-inc/claude-code-authstack
/plugin install <auth-type>@scalekit-auth-stack
```

Where `<auth-type>` is one of: `agent-auth`, `full-stack-auth`, `mcp-auth`, `modular-sso`, `modular-scim`.

### Cursor, Windsurf, Cline, and 40+ other agents

```
npx skills add scalekit-inc/skills
```

### GitHub Copilot CLI

```
copilot plugin marketplace add scalekit-inc/github-copilot-authstack
copilot plugin install <auth-type>@scalekit-auth-stack
```

### Codex

```bash
curl -fsSL https://raw.githubusercontent.com/scalekit-inc/codex-authstack/main/install.sh | bash
```

Then restart Codex, open the Plugin Directory, select **Scalekit Auth Stack**, and install `<auth-type>`.

---

For Claude Code, Copilot CLI, and Codex, `<auth-type>` is one of: `agent-auth`, `full-stack-auth`, `mcp-auth`, `modular-sso`, `modular-scim`.

All commands are idempotent — safe to re-run.

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
