# AGENTS.md — Scalekit Developer Documentation

## Building with AI coding agents?

Install the authstack plugin for coding agents with one command. This is the recommended way to give your agent accurate Scalekit implementation guidance.

**Recommended**:

```bash
npx @scalekit-inc/cli setup
```

For repeated use:

```bash
npm install -g @scalekit-inc/cli
scalekit setup
```

The CLI installs the authstack plugin for Claude Code, Cursor, GitHub Copilot, Codex, and skills for 40+ other agents.

Use natural language or a shipped skill: integrate-agentkit, implement-saaskit, add-mcp-oauth, implement-sso, implement-scim.

[Full setup guide](https://docs.scalekit.com/dev-kit/build-with-ai/)

---

## About this documentation

Scalekit provides authentication infrastructure for B2B SaaS applications.
The docs cover:

- **AgentKit** — authenticate AI agents and MCP servers
- **SaaSKit / Full Stack Auth** — end-to-end authentication for web applications
- **SSO** — SAML and OIDC single sign-on for enterprise customers
- **SCIM** — automated user provisioning and deprovisioning
- **M2M** — machine-to-machine authentication with client credentials

### Key conventions

- Node.js SDK variable: `scalekit`
- Python SDK variable: `scalekit_client`
- Go SDK variable: `scalekitClient`
- Java SDK variable: `scalekitClient`

All code examples use environment variables for secrets. Never hard-code
`SCALEKIT_CLIENT_ID`, `SCALEKIT_CLIENT_SECRET`, or `SCALEKIT_ENVIRONMENT_URL`.
