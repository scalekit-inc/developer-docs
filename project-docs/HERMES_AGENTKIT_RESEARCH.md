# Research: Hermes + AgentKit

Date: 2026-09-02
Ticket: [SK-1876](https://linear.app/scalekit/issue/SK-1876/hermes-guide-for-agentkit) (In Progress, Saif). Related: [SK-1831](https://linear.app/scalekit/issue/SK-1831/always-on-hermes-agentkit-agents-ask-saif-prs-agoma-ooo-calendar) (Backlog).
Question: How should Scalekit work with Hermes Agent?

**This file is research, not a product guide.** Do not ship these recommendations as docs until a working path is rebuilt. Sid's Hermes agent is missing (SK-1876). No Scalekit Hermes skill repo exists today.

---

## Scope

Map the OpenClaw split onto Hermes.

- OpenClaw / Hermes: living agent host (loop, memory, cron, messaging).
- Scalekit AgentKit: identity + token vault so the agent can act as a named user in Gmail, Slack, Salesforce, and other connectors.

In scope:

- Hermes architecture that an operator actually touches.
- What Hermes already covers without Scalekit.
- What AgentKit uniquely adds.
- Integration shapes that work **today** with shipped Scalekit APIs. No new Scalekit product.

Out of scope:

- Writing `src/content/docs/agentkit/hermes.mdx`.
- Inventing a `scalekit-inc/hermes-skill` repo.
- Submitting a Nous `optional-mcps` PR.

Hermes is a standalone runtime (CLI, gateway, cron, skills, native MCP). It is not a framework you `pip install` into your app. A Python `AIAgent` library path exists, but it is a clone + `uv sync` checkout, not a published wheel (source: https://hermes-agent.nousresearch.com/docs/guides/python-library). The first Scalekit guide should treat Hermes as a host, not as an SDK.

---

## What each product owns

### Hermes (Nous Research)

Hermes owns the agent process.

| Fact                        | What it is                                                                                                                                                                                                                                           | Source                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Gateway                     | Long-lived process. Talks on 20+ chat platforms. Entry: `gateway/run.py`. Start with `hermes gateway`.                                                                                                                                               | https://hermes-agent.nousresearch.com/docs/ · architecture · Slack page                         |
| Skills                      | Preferred extension. `SKILL.md` + optional `scripts/`. Instructions + shell + existing tools. No core change.                                                                                                                                        | https://hermes-agent.nousresearch.com/docs/developer-guide/creating-skills                      |
| Tools                       | Built-in Python handlers in `tools/` + `toolsets.py`. Only for core Hermes.                                                                                                                                                                          | https://hermes-agent.nousresearch.com/docs/developer-guide/adding-tools                         |
| Plugins                     | `plugin.yaml` + `register(ctx)`. Custom tools/hooks/slash commands. Opt-in. Vendor plugins stay in their own repo.                                                                                                                                   | https://hermes-agent.nousresearch.com/docs/guides/build-a-hermes-plugin                         |
| Native MCP                  | Client for stdio **and** HTTP. Auto-discover tools at startup. Filter with `tools.include` / `tools.exclude`.                                                                                                                                        | https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp                              |
| Hosted MCP OAuth            | `auth: oauth` on HTTP servers. PKCE, DCR or pre-registered client, refresh. Tokens at `~/.hermes/mcp-tokens/<name>.json` (0o600).                                                                                                                    | same MCP page                                                                                   |
| Cron                        | Built-in scheduler. Fresh session per fire. Can attach skills. Delivery to Slack/Telegram/origin/local.                                                                                                                                              | https://hermes-agent.nousresearch.com/docs/user-guide/features/cron                             |
| Messaging vs acting-as-user | Slack gateway uses **bot** tokens (`xoxb-` + `xapp-`). The bot is a channel, not the human. Acting as a Slack **user** needs Slack MCP / user token / Scalekit.                                                                                      | https://hermes-agent.nousresearch.com/docs/user-guide/messaging/slack · issue #6533             |
| Where tokens live           | `~/.hermes/config.yaml` = non-secrets. `~/.hermes/.env` = API keys, bot tokens. `~/.hermes/auth.json` = model-provider OAuth (Nous Portal, etc.). MCP OAuth cache = `~/.hermes/mcp-tokens/`. Google Workspace skill = `~/.hermes/google_token.json`. | https://hermes-agent.nousresearch.com/docs/user-guide/configuration · google-workspace SKILL.md |

Hermes is explicit about the skill vs tool vs plugin split:

- Skill: wrap a CLI or API with markdown + scripts.
- Tool: only if you are changing Hermes core.
- Plugin: personal/project Python tools, or a standalone vendor repo.
- MCP: the tool already exists as a server. Do not rebuild it.

(source: creating-skills, adding-tools, plugin guide, MCP page)

### Scalekit AgentKit

Scalekit owns user identity and provider tokens.

| Object             | Role                                                                                                           | Source                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Connection         | One app-level OAuth/API-key config. Serves all users.                                                          | `src/content/docs/agentkit/overview.mdx`                        |
| Connected account  | Per-user token record. States: `ACTIVE`, `EXPIRED`, `PENDING_AUTH`, `PENDING_VERIFICATION`, `DISCONNECTED`.    | `src/content/docs/agentkit/connected-accounts.mdx`              |
| Identifier         | Your string for the user. Same value on every call.                                                            | `src/content/docs/agentkit/mcp/configure-mcp-server.mdx`        |
| Magic / auth link  | Hosted page. User completes OAuth. Scalekit stores tokens.                                                     | `src/content/docs/agentkit/tools/authorize.mdx`                 |
| Vault + refresh    | Scalekit refreshes access tokens ~5 minutes before expiry. Operator does not hold Gmail/Slack tokens.          | `src/content/docs/agentkit/authentication/token-management.mdx` |
| Revoke / expire    | Provider revoke or refresh-token death → account leaves `ACTIVE`. Webhook: `connected_account.status_updated`. | `src/content/docs/agentkit/connected-accounts.mdx`              |
| Audit              | Dashboard token-event logs. OpenClaw page also claims “full audit logging”.                                    | token-management.mdx · openclaw.mdx                             |
| Tools + HTTP proxy | `execute_tool` for named tools. `actions.request` / proxy when no tool exists.                                 | openclaw.mdx · bring-your-own-connector                         |
| Virtual MCP        | Static `mcp_server_url` per agent role. Short-lived **session token** per user per run. Bearer auth.           | `src/content/docs/agentkit/mcp/overview.mdx`                    |
| Connector surface  | OpenClaw page claims 200+ connectors. This research did not count the catalog.                                 | openclaw.mdx                                                    |

Scalekit client credentials (`SCALEKIT_CLIENT_ID` / `SECRET` / `ENV_URL`) authenticate the **app**. They are not the user's Gmail token.

### The OpenClaw analog (already shipped)

OpenClaw skill `scalekit-agent-auth`:

- Install: `clawhub install scalekit-agent-auth`.
- Repo: https://github.com/scalekit-inc/openclaw-skill
- Layout: `skills/scalekit-agent-auth/SKILL.md` + Python (`agent_wrapper.py`, `pyproject.toml`).
- Env: `TOOL_CLIENT_ID`, `TOOL_CLIENT_SECRET`, `TOOL_ENV_URL`, `TOOL_IDENTIFIER` (source: openclaw.mdx + `.env.example`).
- Flow: look up connector → check connected account → magic link if needed → fetch tool schema → `execute_tool` → HTTP proxy fallback.
- User tokens never live in OpenClaw.

That is the split to copy. Hermes has the same skill shape (`SKILL.md` + `scripts/`). **No Hermes twin of this skill is shipped.**

GitHub search `org:scalekit-inc hermes` returned `total_count: 0` on 2026-09-02.

---

## How it should work (recommended model)

Same sentence as OpenClaw:

> Hermes is the host. Scalekit is the vault. The agent acts as identifier `X`. Hermes never stores Gmail / Slack-user / Salesforce tokens.

Operator once:

1. Create Scalekit connections (Gmail, Slack, Google Calendar, …).
2. Create one Virtual MCP config **or** install a Scalekit skill.
3. Put Scalekit **client** credentials in `~/.hermes/.env`. Not provider tokens.
4. Pick a default `identifier` (email or user id).

User once per connection:

5. Hermes surfaces a Scalekit auth link.
6. User completes OAuth on the hosted page.
7. Connected account becomes `ACTIVE`. Scalekit refreshes from then on.

Per task (chat, cron, gateway turn):

8. Hermes calls Scalekit tools as that identifier.
9. Scalekit injects the user's token and calls the provider.

Do **not**:

- Put `GMAIL_TOKEN` / Google refresh tokens in `~/.hermes/.env`.
- Teach `hermes mcp login` against Scalekit Virtual MCP. VMCP is **static bearer**, not MCP OAuth 2.1 (source: configure-mcp-server.mdx vs Hermes MCP `auth: oauth`).
- Use Slack **bot** tokens (`SLACK_BOT_TOKEN`) as a stand-in for “send as Agoma / as Saif”. That is a channel, not a user.

### Recommended first docs guide

**Default: Hermes skill (OpenClaw twin).** Shape 2 below.

Why:

- Hermes docs say: make it a skill when you wrap an external API via scripts (creating-skills).
- OpenClaw already ships this exact shape. The guide can reuse the same env names and flow.
- SK-1831 is always-on (gateway + daily loop). Skill + `execute_tool` uses client credentials. It does **not** need a short-lived VMCP session token on every cron fire.
- Magic-link + identifier switch live in the skill. VMCP assumes you minted a token for one identifier already.

**Also document, as a second path: Hermes MCP client → Virtual MCP.** Shape 1.

Why document it:

- Zero new Scalekit code. Hermes already speaks HTTP MCP + `headers.Authorization`.
- Closest existing Scalekit pages: `/agentkit/mcp/overview`, `/agentkit/mcp/configure-mcp-server`, Vercel AI / CrewAI / Claude Managed Agents.
- Good for a one-shot `hermes chat` demo.

Why it is not the default for the first guide:

- Scalekit says: mint a session token **before each agent run**. Never reuse (mcp/overview.mdx, configure-mcp-server.mdx).
- Hermes gateway and cron are long-lived. A bearer sitting in `config.yaml` / `.env` expires (docs default / example: 1 hour).
- No shipped remint hook for a Hermes process. That is an open gap (see Gaps).

Do **not** lead with a plugin (shape 3) or a Nous catalog PR (shape 4).

---

## How it can work today (shapes)

All four shapes use shipped Scalekit APIs. None of them is a producted Hermes integration.

### Shape 1 — Hermes as MCP client → Virtual MCP

Hermes already accepts:

```yaml
# ~/.hermes/config.yaml
mcp_servers:
  scalekit:
    url: 'https://<static-mcp-server-url>'
    headers:
      Authorization: 'Bearer ${SCALEKIT_MCP_SESSION_TOKEN}'
    tools:
      include: [gmail_fetch_mails, googlecalendar_create_event]
```

`${VAR}` in `url` / `headers` resolves from `~/.hermes/.env` at connect time (source: MCP page, “Runtime ${ENV_VAR} substitution”).

|                       |                                                                                                                                                                                                                            |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| When it works         | Operator can mint a session token, write it to `.env`, start or `/reload-mcp`. Interactive CLI. Short jobs.                                                                                                                |
| When it fails         | Token expires mid-gateway or mid-cron. Hermes does not call `create_session_token`. `auth: oauth` is the wrong mode (VMCP is not an OAuth MCP resource). Headless OAuth helpers (`mcp-oauth-remote-gateway`) do not apply. |
| Once vs per run       | Once: VMCP config + `mcp_server_url`. Per run: check connected accounts, mint session token, reload MCP or rewrite the env var. User auth: once per connection.                                                            |
| Where tokens live     | Scalekit client creds: wherever you run the mint script. Session token: `~/.hermes/.env` (or a process env). User Gmail tokens: Scalekit vault.                                                                            |
| Multi-user            | One VMCP URL, many identifiers. Each session token is bound to one identifier. A single Hermes process with one bearer is **one user**. Switching users means mint + reload.                                               |
| Closest Scalekit page | `/agentkit/mcp/configure-mcp-server` · `/agentkit/examples/vercel-ai` (bearer header) · `/agentkit/examples/claude-managed-agents` (same mint, vault instead of header)                                                    |

Mastra docs still show `ensure_instance` → per-user URL. Current VMCP model is static URL + session token. A Hermes guide should follow configure-mcp-server, not the Mastra instance URL.

### Shape 2 — Hermes skill (SKILL.md + scripts) — OpenClaw twin

Same contract as `scalekit-inc/openclaw-skill`:

- `SKILL.md` tells the agent when to authorize vs execute.
- `scripts/` call Scalekit REST/SDK: `get_or_create_connected_account`, `get_authorization_link`, `execute_tool`, proxy fallback.
- Env: reuse `TOOL_*` or map to `SCALEKIT_*`. Declare them in `required_environment_variables` so Hermes prompts and sandboxes passthrough (creating-skills).

Install today would be a URL or a local copy:

```bash
hermes skills install https://…/SKILL.md
# or copy into ~/.hermes/skills/…
```

No `clawhub` equivalent is required. Hermes Skills Hub / `hermes skills install` is enough (creating-skills, work-with-skills).

|                       |                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| When it works         | Always-on gateway. Cron (`--skill scalekit-agent-auth`). Magic-link in Slack/Telegram. Identifier override per conversation. HTTP proxy when no named tool exists.                   |
| When it fails         | The skill does not exist yet. Operator must vendor OpenClaw scripts or rewrite them. Sandbox backends (Docker/Modal) need `required_environment_variables` so `TOOL_*` pass through. |
| Once vs per run       | Once: Scalekit connections + skill install + client creds in `.env`. Per run: nothing to mint. Per new connector: user clicks magic link.                                            |
| Where tokens live     | Client creds in `~/.hermes/.env`. User tokens in Scalekit. Skill never writes provider tokens to disk.                                                                               |
| Multi-user            | `TOOL_IDENTIFIER` default. Override per prompt / config. Same as OpenClaw. One Hermes host can switch identifiers. Isolation is Scalekit's, not Hermes's.                            |
| Closest Scalekit page | `/agentkit/openclaw` · `/agentkit/tools/authorize` · `/agentkit/tools/agent-tools-quickstart`                                                                                        |

This is the shape SK-1876 should rebuild.

### Shape 3 — Hermes plugin (`plugin.yaml` + `register`)

Python package under `~/.hermes/plugins/scalekit/` that `ctx.register_tool(...)` for each Scalekit tool, or a meta-tool that lists/executes.

Hermes policy: third-party product plugins ship **standalone**, not in `NousResearch/hermes-agent` (plugin guide). Users `hermes plugins enable`.

|                       |                                                                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| When it works         | You want first-class tool schemas in the model tool list (not progressive-disclosure skills). You will maintain Python against Hermes `register(ctx)`.     |
| When it fails         | Heavier than a skill. Tool schemas for 200+ connectors will bloat context (this is the problem Virtual MCP exists to solve). Fights “prefer skills / MCP”. |
| Once vs per run       | Once: install + enable + client creds. Per run: same as skill (SDK calls).                                                                                 |
| Where tokens live     | Same as skill if you call Scalekit APIs. Bad if the plugin caches provider tokens.                                                                         |
| Multi-user            | Possible if the plugin takes `identifier`. Easy to get wrong.                                                                                              |
| Closest Scalekit page | None. OpenClaw did **not** use a plugin.                                                                                                                   |

Recommend against for v1.

### Shape 4 — Nous catalog MCP entry (`optional-mcps/`)

A `optional-mcps/scalekit/manifest.yaml` that Nous merges. Then `hermes mcp install scalekit`.

Catalog rules (MCP page + PR #94513 + issue #83799):

- Presence in `optional-mcps/` = Nous approval. PR only. No community tier.
- Preferred auth: native MCP OAuth + DCR, **or** no-auth.
- Static bearer / “bring your own OAuth app” entries are often rejected (GitHub, Google Workspace).
- Scalekit VMCP is static URL + **app-minted** bearer. It is not vendor OAuth DCR.

|                       |                                                                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| When it works         | After a Nous PR. Distribution only. The runtime is still shape 1.                                                                              |
| When it fails         | Today: no `optional-mcps/scalekit`. A bearer-token catalog entry may not meet the current catalog bar. Session-token remint is still unsolved. |
| Once vs per run       | Same as shape 1, plus `hermes mcp install`.                                                                                                    |
| Where tokens live     | Same as shape 1.                                                                                                                               |
| Multi-user            | Same as shape 1.                                                                                                                               |
| Closest Scalekit page | None. Hermes: MCP catalog section.                                                                                                             |

Not required for a docs guide. Do not block SK-1876 on a Nous review.

---

## Where the combo is real / not real

### Real without Scalekit (do not replace these)

| Job                                         | Hermes already has                                                             | Tokens live                                                 | Notes                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| GitHub as the operator                      | Bundled `github` skill + `gh` CLI                                              | `gh auth` (not Hermes `.env`)                               | Official GitHub MCP is **not** in the catalog. Nous prefers `gh`. (github SKILL.md · MCP page · issue #83799) |
| Linear / Notion / Stripe as **that** vendor | Catalog MCP: `hermes mcp install linear\|notion\|stripe`. OAuth to the vendor. | `~/.hermes/mcp-tokens/<name>.json`                          | Verified manifests on `main`: Linear, Notion, Stripe. Slack catalog path 404.                                 |
| Browser                                     | Native browser toolset (local / Browser Use / Browserbase / Firecrawl)         | Provider API keys in `.env`, or Nous Portal                 | https://hermes-agent.nousresearch.com/docs/user-guide/features/browser                                        |
| Shell                                       | Terminal backends: local, Docker, SSH, Modal, Daytona, …                       | Host credentials                                            | architecture + configuration                                                                                  |
| Slack as a **channel**                      | Gateway Slack adapter. Bot speaks in channels/DMs.                             | `SLACK_BOT_TOKEN` + `SLACK_APP_TOKEN` in `.env`             | Bot identity, allowlist `SLACK_ALLOWED_USERS`. Not “as Saif”.                                                 |
| Gmail / Calendar as the laptop user         | Bundled `google-workspace` skill (`gws` or scripts)                            | `~/.hermes/google_token.json` + `google_client_secret.json` | Hermes-managed OAuth. This is the anti-pattern if AgentKit is in play.                                        |
| Notion via CLI                              | Bundled `notion` skill, `NOTION_API_KEY`                                       | `.env`                                                      | Skill itself mentions vendor Notion MCP as an alternative.                                                    |

Google Gmail/Drive/Calendar **hosted MCP** was evaluated and **rejected** from the Hermes catalog. Reason: user must bring a GCP OAuth client. No DCR. `gws` skill is the official Hermes path (issue #83799).

### Real only with Scalekit

| Job                                                                                    | Why Hermes alone is weak                                                                                     | AgentKit add                                                                   |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Act as a **named user** (not the bot, not the laptop Google login)                     | Hermes tokens are host-global (`google_token.json`, one MCP OAuth cache per server name).                    | Connected accounts keyed by `identifier`.                                      |
| 200+ connectors including Salesforce, HubSpot, Snowflake, Gmail-as-user, Slack-as-user | Catalog covers vendor MCP where DCR works. GitHub/Google/Slack-user/Salesforce are holes or CLI-token paths. | Connector catalog + tools + proxy.                                             |
| Refresh / revoke / audit                                                               | Hermes refreshes **MCP OAuth** and `google_token.json` locally. No org audit. No revoke from a dashboard.    | Vault refresh, status webhook, dashboard logs.                                 |
| Magic-link authorize from chat                                                         | Hermes MCP OAuth needs a browser callback (loopback or paste-back). Painful on a headless gateway.           | Hosted auth link. User clicks. No loopback on the VPS.                         |
| Switch user (`identifier`)                                                             | One Google token file. One Slack bot.                                                                        | Same VMCP / skill, different identifier.                                       |
| Least-privilege tool set per agent role                                                | Hermes can `tools.include` on any MCP server.                                                                | VMCP defines the allow-list server-side. Session token cannot see other tools. |
| Always-on “as Agoma” / “as Saif” (SK-1831)                                             | Slack bot can read a channel. It cannot add **Agoma's** Google Calendar events without a user Google token.  | Slack connector + Google Calendar connector on identifier `agoma`.             |

### Honest non-fits

| Use case                                          | Why Scalekit is the wrong layer                                                                                                                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Solo `gh` on the operator's machine               | Bundled github skill. No vault needed.                                                                                                                                               |
| Official Linear MCP for the operator's own Linear | `hermes mcp install linear`. Vendor OAuth is enough.                                                                                                                                 |
| Coding in an IDE (Claude Code, Cursor, Codex)     | That is `scalekit-inc/skills` / claude-code-authstack. Those skills teach **apps** to call AgentKit. They are not a Hermes runtime skill.                                            |
| Multi-tenant SaaS product host                    | Hermes is one operator's agent. Virtual MCP + session tokens belong in **your** app (Claude Managed Agents, Mastra, CrewAI). Do not turn one Hermes gateway into a multi-tenant IdP. |
| Slack chat transport                              | Keep Hermes Slack gateway. Add Scalekit only when the agent must **act as a Slack user** (read private history as Agoma, post as Agoma).                                             |

### SK-1831 mapping

| Use case                          | Hermes                                                              | Scalekit                                                                                                         | Do not                                                                   |
| --------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| ask-saif PR reviews               | Cron + github skill **or** Scalekit GitHub tools. Gateway optional. | Scalekit GitHub if the reviewer identity is a connected account, not `gh` on Saif's laptop.                      | Store a PAT in `.env` if AgentKit is the story.                          |
| Agoma OOO Slack → Google Calendar | Slack **gateway** to hear the channel (bot). Cron to run daily.     | Slack **user** connector if you need more than the bot can see. Google Calendar connector on identifier `agoma`. | Use `google_token.json` or put Calendar refresh tokens in Hermes `.env`. |

---

## Gaps and open questions

1. **Sid's agent is missing.** SK-1876: “We had Sid working to build a Hermes agent. It's now missing.” Linear has no comments and no attachments that point at a repo. Not found under `scalekit-inc`.

2. **No Scalekit Hermes skill.** `org:scalekit-inc hermes` → 0 repos. OpenClaw skill is the only shipped host skill.

3. **Session-token mint for a long-lived Hermes process.** Scalekit contract: mint before each run; example expiry 1 hour; “never reuse” (configure-mcp-server.mdx, mcp/overview.mdx). Hermes gateway stays up for days. Cron fires without a wrapper. **Unverified:** max `expiry` the API accepts. **Missing:** a remint sidecar, a skill that mints then `/reload-mcp`, or a Scalekit token that lasts as long as a connected-account refresh token.

4. **VMCP is bearer, not MCP OAuth.** Do not send operators through `hermes mcp login` / DCR. That path will look like it “lists tools” and then fail, the same class of bug Hermes documents for Google Drive MCP.

5. **Headless gateway auth.** Hermes MCP OAuth on a VPS needs Desktop relay, paste-back, or `mcp-oauth-remote-gateway`. Scalekit magic links avoid that. A skill can print the link in Slack. Shape 1 cannot authorize a new Gmail account by itself.

6. **Catalog PR is optional and may be the wrong auth type.** Nous rejected GitHub and Google Workspace hosted MCP for DCR / duplication reasons (issue #83799). A Scalekit bearer entry is closer to those rejects than to Linear.

7. **Connector count.** Docs say “200+” on the OpenClaw page. This note did not inventory AgentKit connectors.

8. **Library vs host.** A Python library guide exists. SK-1876 should not become “import AIAgent + Scalekit SDK”. That is a different product surface (closer to LangChain / Mastra examples).

9. **Who owns Agoma's Slack + Google identity?** Still open on SK-1831. Scalekit cannot answer it. The identifier string is whatever you pick; the human who clicks the magic link is the identity.

---

## Sources

### Tickets

- https://linear.app/scalekit/issue/SK-1876/hermes-guide-for-agentkit — In Progress, Saif. Sid's agent missing. No comments as of 2026-09-02.
- https://linear.app/scalekit/issue/SK-1831/always-on-hermes-agentkit-agents-ask-saif-prs-agoma-ooo-calendar — Backlog. Always-on Hermes + AgentKit. ask-saif PRs. Agoma Slack → Google Calendar.

### Hermes (first party)

- https://hermes-agent.nousresearch.com/docs/
- https://hermes-agent.nousresearch.com/docs/user-guide/configuration — `~/.hermes/{config.yaml,.env,auth.json}`
- https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp — stdio, HTTP, OAuth, catalog, `${ENV}` in headers
- https://hermes-agent.nousresearch.com/docs/user-guide/features/cron
- https://hermes-agent.nousresearch.com/docs/user-guide/features/skills
- https://hermes-agent.nousresearch.com/docs/user-guide/features/browser
- https://hermes-agent.nousresearch.com/docs/user-guide/messaging/slack — bot tokens, not user tokens
- https://hermes-agent.nousresearch.com/docs/developer-guide/creating-skills
- https://hermes-agent.nousresearch.com/docs/developer-guide/adding-tools
- https://hermes-agent.nousresearch.com/docs/developer-guide/architecture
- https://hermes-agent.nousresearch.com/docs/guides/build-a-hermes-plugin
- https://hermes-agent.nousresearch.com/docs/guides/python-library
- https://hermes-agent.nousresearch.com/docs/user-guide/skills/optional/mcp/mcp-mcp-oauth-remote-gateway
- https://github.com/NousResearch/hermes-agent
- https://github.com/NousResearch/hermes-agent/tree/main/optional-mcps
- https://raw.githubusercontent.com/NousResearch/hermes-agent/main/optional-mcps/linear/manifest.yaml
- https://raw.githubusercontent.com/NousResearch/hermes-agent/main/optional-mcps/notion/manifest.yaml
- https://raw.githubusercontent.com/NousResearch/hermes-agent/main/optional-mcps/stripe/manifest.yaml
- https://raw.githubusercontent.com/NousResearch/hermes-agent/main/skills/software-development/github/SKILL.md
- https://github.com/NousResearch/hermes-agent/blob/main/skills/productivity/google-workspace/SKILL.md
- https://github.com/NousResearch/hermes-agent/blob/main/skills/productivity/notion/SKILL.md
- https://github.com/NousResearch/hermes-agent/issues/83799 — GitHub / Google Workspace MCP rejected from catalog
- https://github.com/NousResearch/hermes-agent/issues/6533 — Slack gateway vs Slack MCP
- https://github.com/NousResearch/hermes-agent/pull/94513 — catalog wave + exclusion policy
- https://github.com/NousResearch/hermes-agent/pull/5420 — MCP OAuth + `mcp-tokens/`

### Scalekit (this repo + first-party GitHub)

- `src/content/docs/agentkit/openclaw.mdx`
- `src/content/docs/agentkit/overview.mdx`
- `src/content/docs/agentkit/mcp/overview.mdx`
- `src/content/docs/agentkit/mcp/configure-mcp-server.mdx`
- `src/content/docs/agentkit/tools/authorize.mdx`
- `src/content/docs/agentkit/connected-accounts.mdx`
- `src/content/docs/agentkit/authentication/token-management.mdx`
- `src/content/docs/agentkit/examples/claude-managed-agents.mdx`
- `src/content/docs/agentkit/examples/mastra.mdx`
- `src/content/docs/agentkit/examples/vercel-ai.mdx`
- `src/content/docs/agentkit/sdks/python/mcp.mdx`
- `src/content/docs/agentkit/tools/agent-tools-quickstart.mdx`
- https://github.com/scalekit-inc/openclaw-skill
- https://raw.githubusercontent.com/scalekit-inc/openclaw-skill/main/.env.example
- https://api.github.com/search/repositories?q=org:scalekit-inc+hermes — 0 results (2026-09-02)

### Not used as authority

- Third-party blogs rewriting Hermes or Scalekit.
- `scalekit-inc/skills` and claude-code-authstack — those teach coding agents to **build** AgentKit apps. They are not a Hermes host integration.
