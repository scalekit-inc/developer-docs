# AGENTS.md — Scalekit Developer Documentation

## Building with AI coding agents?

If you're using an AI coding agent, install the official Scalekit plugin.
It gives your agent full awareness of the Scalekit API — reducing
hallucinations and enabling faster, more accurate code generation.

### Claude Code

```
/plugin marketplace add scalekit-inc/claude-code-authstack
/plugin install <auth-type>@scalekit-auth-stack
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

### Skills CLI (Windsurf, Cline, and 40+ agents)

```bash
npx skills add scalekit-inc/skills --list
npx skills add scalekit-inc/skills --skill <skill-name>
```

---

`<auth-type>` / `<skill-name>`: `agent-auth`, `full-stack-auth`, `mcp-auth`, `modular-sso`, `modular-scim`

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
