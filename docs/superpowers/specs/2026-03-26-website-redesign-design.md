# Website redesign — design spec

**Date:** 2026-03-26
**Status:** Draft — pending leadership alignment

---

## The core idea

Scalekit solves two fundamentally different authentication problems. Most auth tools treat them as one. The redesign makes this distinction the organizing principle of the entire web presence.

> "Auth used to be one problem. AI made it two."

**Inbound auth** — users, agents, and M2M clients authenticate _into_ your app, MCP server, or API.
**Outbound auth** — your AI agents authenticate _out_ to external services like Gmail, Slack, and Salesforce.

These require different products, different pricing models, and different documentation. The site reflects that.

---

## Domain strategy

| Domain              | Audience         | Purpose                                                                                                                        |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `scalekit.com`      | Human developers | Replaces current docs.scalekit.com. Developer-first homepage + full documentation. No marketing fluff.                         |
| `docs.scalekit.com` | AI coding agents | Machine-readable layer over the same content. Designed for Cursor, Claude Code, Copilot, and any agent building with Scalekit. |

`scalekit.com` is the primary destination. `docs.scalekit.com` is a programmatic API over the docs — not a parallel site.

---

## Two product lines

### Auth for Agents (primary)

**Positioning:** Outbound authentication for AI workflows.

Your AI agents connect to external services — Gmail, Slack, Salesforce, Notion, and 100+ more — without managing OAuth flows, storing tokens, or handling refresh logic.

**Products:** Agent Auth
**Pricing metric:** Connected accounts + tool calls
**Primary color:** Purple (`#6366f1`)
**Target developer:** Building AI agents, autonomous workflows, or agentic B2B SaaS

### Auth for Apps (secondary)

**Positioning:** Inbound authentication for B2B applications.

Everything users and agents need to authenticate into your app — login, organizations, SSO, SCIM, MCP server security, and API auth.

**Products:** Full Stack Auth, Modular SSO, Modular SCIM, MCP Auth, API/M2M Auth
**Pricing metric:** MAUs, MAOs, SSO connections
**Primary color:** Green (`#10b981`)
**Target developer:** Building B2B SaaS apps, MCP servers, or APIs

**Why agents-primary?** The agent auth market is the growth vector. Most competing auth tools don't solve outbound agent auth at all. Making it primary is a clear positioning statement.

---

## Information hierarchy

### scalekit.com

```
/                        Homepage (two-door entry, agents-primary)
/for-agents/             Auth for Agents documentation root
  quickstart             10-minute Gmail agent walkthrough
  overview               What Agent Auth is and how it works
  connected-accounts     Let users connect their accounts
  token-vault            How token storage and refresh works
  tool-calling           Using tokens in agent tool calls
  frameworks/            LangChain, OpenAI, Anthropic, Vercel AI, Google ADK, Mastra
  providers/             100+ OAuth provider integration guides
/for-apps/               Auth for Apps documentation root
  quickstart             Full stack auth in minutes
  overview               Products and when to use each
  full-stack-auth/       Login, session, orgs, RBAC
  modular-sso/           SAML/OIDC with enterprise IdPs
  modular-scim/          User provisioning from Okta, Azure AD
  mcp-auth/              Securing your MCP server
  api-auth/              M2M tokens and API keys
/sdks/                   Shared across both product lines
  node / python / go / java / expo
/apis/                   REST API reference (Scalar-powered)
/pricing/                Tabbed pricing — Agent Auth | App Auth
/changelog/              Engineering blog-style release notes
```

### docs.scalekit.com

```
/llms.txt                Product overview optimized for LLM consumption
/llms-full.txt           Full context dump — all docs in one file
/sitemap.xml             Machine-readable URL index
/openapi/spec.json       OpenAPI spec for programmatic access
/mcp                     MCP server (SSE endpoint)
  Tools:
    search(query)             Semantic search across all docs
    get_page(path)            Fetch any doc page as clean markdown
    list_products()           List all products with descriptions
    get_code_example(p, lang) Get a code example by product + language
/context/                Structured context files per topic
  for-agents.md          Full agent auth context for LLM consumption
  for-apps.md            Full app auth context for LLM consumption
  sdks.md                SDK reference and naming conventions
  errors.md              Error codes and troubleshooting
/search                  REST search API — GET /search?q=<query>
/pages/                  Clean markdown mirror of scalekit.com
  for-agents/**          No sidebars, no JS, no images — pure content
  for-apps/**
  sdks/**
```

The `llms.txt` encodes SDK variable naming conventions (critical for correct code generation):

- Node.js: `scalekit`
- Python: `scalekit_client`
- Go: `scalekitClient`
- Java: `scalekitClient`

---

## Homepage design

### Navigation

```
⬡ Scalekit  |  For Agents ↓  |  For Apps ↓  |  SDKs & APIs  |  Pricing  |  Changelog  |  Sign in  |  [Start free →]
```

- "For Agents" appears first — primary product line
- "For Apps" is secondary but always present
- No "Enterprise" in nav — enterprise is a pricing tier, not a product
- Maximum 6 nav items excluding auth CTAs

### Hero section

**Eyebrow:** `Authentication infrastructure for AI-era applications`

**Headline:**

```
Auth used to be one problem.
AI made it two.
```

**Body copy:**

> Your app needs to authenticate the people and agents connecting to it. Your AI agents need to authenticate to the external services they connect to. These are fundamentally different problems. Scalekit solves both.

**Diagram:** The Inbound/Outbound architecture diagram sits directly below the copy — it explains the entire product in 10 seconds without words.

### Two doors (below diagram)

**Door 1 — Agent Auth (full-width primary card, purple border)**

- Label: `Outbound · Primary product`
- Headline: "Connect your agents to anything"
- Body: Token vault, delegated OAuth, auto-refresh. 100+ providers. Works with every major AI framework.
- Framework tags: LangChain · OpenAI · Anthropic · Vercel AI · Google ADK · Mastra
- Code snippet (Node.js): `scalekit.getToken({ provider: 'google', userId, scopes: ['gmail.send'] })`
- Primary CTA: "Quickstart: Agent Auth →"
- Secondary CTA: "View 100+ providers"

**Door 2 — App Auth (slim secondary card, green border)**

- Label: `Inbound · For your app`
- Headline: "Authenticate your app"
- Body: Full-stack login, organizations, RBAC, SSO, SCIM, MCP server security.
- CTA: "Quickstart: For Apps →" (right-aligned)

### Below-fold sections (in scroll order)

1. **Pricing** — tabbed (Agent Auth | App Auth), transparent numbers
2. **Security & Compliance** — four cards: certifications, data residency, reliability, token security
3. **Enterprise** — feature checklist (SSO, SCIM, admin portal, custom domain, audit logs, SLA, dedicated support)
4. **Developer Resources** — SDKs, REST API, AI coding assistant MCP callout with copy-paste config snippet
5. **Footer** — product / developer / company columns + compliance badge strip

---

## Docs experience

### Shared doc shell

Both `/for-agents/` and `/for-apps/` use the same layout:

- **Left sidebar:** Product switcher at top (toggles between For Agents ↔ For Apps), then product-specific nav tree
- **Main content:** Breadcrumb, H1, intro paragraph, content
- **Right column:** Table of contents + persistent "For AI assistants → docs.scalekit.com" widget with MCP config snippet

### For Agents sidebar structure

```
Get started
  Overview · Quickstart · How it works
Core concepts
  Connected accounts · Token vault · Delegated OAuth · Token refresh
Frameworks
  LangChain · OpenAI Agents SDK · Anthropic · Vercel AI · Google ADK · Mastra
Providers
  Google (Gmail, Drive, Calendar) · Slack · Salesforce · HubSpot · Notion · +95 more
─────────────────────────────
Also using Scalekit for: → Authenticate your app
```

### For Apps sidebar structure

```
Get started
  Overview · Quickstart
Full Stack Auth
  Login & session · Organizations · RBAC & permissions · Social login · Magic links
Modular add-ons
  SSO (SAML / OIDC) · SCIM provisioning · MCP Auth · API & M2M Auth
─────────────────────────────
Also building agents? → Connect your agents
```

### Cross-sell bridge

Every sidebar has a persistent cross-sell prompt at the bottom pointing developers to the other product line. Developers building AI-powered B2B SaaS need both — this is the bridge.

### Code examples

All SDK code examples use the 4-language tab pattern:

- Node.js (default) · Python · Go · Java
- Variable names follow CLAUDE.md NON-NEGOTIABLE conventions

---

## Pricing design

Single pricing section on the homepage with a tab toggle:

**Tab 1 — Agent Auth** (purple)
| Tier | Price | Includes |
|------|-------|---------|
| Starter | $0 | 10 connected accounts · 5k tool calls/mo · 5 providers |
| Growth | Custom | 500 connected accounts · 100k tool calls/mo · 100+ providers · then per-unit |
| Enterprise | Custom | Unlimited · dedicated vault · custom residency · SLA |

Overages: per connected account + per tool call

**Tab 2 — App Auth** (green)
| Tier | Price | Includes |
|------|-------|---------|
| Starter | $0 | 1k MAUs · 3 MAOs · 0 SSO connections |
| Growth | Custom | 10k MAUs · 50 MAOs · 3 SSO connections · then per-unit |
| Enterprise | Custom | Unlimited MAUs/MAOs/SSO · custom domain · audit logs · SLA |

Overages: per MAU + per MAO + per SSO connection

**Metric definitions** appear below each table — these terms are not industry-standard and must be explained clearly.

---

## docs.scalekit.com — agent-readable surface

This is not a website. It is a programmatic API layer over the same content that powers `scalekit.com`.

**Who uses it:** Cursor, Claude Code, GitHub Copilot, and any AI coding agent a developer uses to build with Scalekit. Humans never need to visit it directly.

**Key surfaces:**

`llms.txt` — the entry point. Product overview, SDK naming conventions, MCP server URL, and a page index. This is what LLMs read when they need context on Scalekit.

`/mcp` — MCP server with four tools: `search`, `get_page`, `list_products`, `get_code_example`. Developers add this to their coding agent config with a single JSON snippet:

```json
{
  "mcpServers": {
    "scalekit-docs": {
      "url": "https://docs.scalekit.com/mcp",
      "type": "sse"
    }
  }
}
```

`/context/for-agents.md` and `/context/for-apps.md` — full product context in clean markdown. Designed to be dropped into an LLM context window directly.

`/pages/**` — clean markdown mirror of all doc pages. No sidebars, no JavaScript, no images. Pure content for agent consumption.

---

## Visual language

| Element           | Value                                     |
| ----------------- | ----------------------------------------- |
| Background        | `#0a0a0f` (near black)                    |
| Surface           | `#0d0d14` / `#080810`                     |
| Border            | `#1e293b`                                 |
| Text primary      | `#f1f5f9`                                 |
| Text secondary    | `#64748b`                                 |
| Agent Auth accent | `#6366f1` (purple)                        |
| App Auth accent   | `#10b981` (green)                         |
| Font              | System UI / monospace for code and labels |
| Theme             | Dark by default — signals developer-first |

---

## What this is not

- Not a marketing site with a blog, case studies, or testimonials
- Not a "request a demo" funnel — self-serve is primary
- Not a unified pricing model — each product line has its own unit economics
- Not a rebrand — this is a restructure of what already exists

---

## Open questions for leadership alignment

1. **Pricing numbers** — direction approved, specific tier pricing TBD
2. **Domain migration** — timeline for deprecating scalekit.com as marketing site
3. **docs.scalekit.com build** — MCP server and llms.txt are new infrastructure; who owns this?
4. **"For Agents" vs "For Apps" naming** — these are working titles; does leadership want to finalize these as the canonical product line names?
5. **Self-serve vs sales-led** — design assumes self-serve is primary CTA; confirm this holds for enterprise tier
