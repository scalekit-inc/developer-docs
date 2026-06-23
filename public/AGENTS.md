# AGENTS.md — Scalekit Developer Documentation

## Building with AI coding agents?

Install the authstack plugin for your coding agent with one command.

**Recommended**:

```bash
npx @scalekit-inc/cli setup
```

For repeated use:

```bash
npm install -g @scalekit-inc/cli
scalekit setup
```

This gives your agent full awareness of Scalekit authentication patterns (full-stack-auth, agent-auth, mcp-auth, modular-sso, modular-scim) and reduces hallucinations.

The CLI sets up plugins for Claude Code, Cursor, GitHub Copilot, Codex, and skills for 40+ other agents.

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
