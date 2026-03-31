# Docs Chatbot Flywheel — Design Spec

**Date:** 2026-03-30
**Status:** Approved
**Scope:** Embeddable docs chatbot + Pylon feedback loop + Slack bot

---

## Goal

Build an ever-evolving developer documentation system where every unanswered customer question improves the docs for the next customer. Three components work together as a flywheel: a docs chatbot, a Pylon issue → PR drafting loop, and a Slack bot.

---

## Decisions made

| Question             | Decision                                                        |
| -------------------- | --------------------------------------------------------------- |
| Chatbot engine       | Custom-built with Claude API (not SaaS)                         |
| Docs update workflow | Agent drafts PR, human reviews and merges                       |
| Slack integration    | @mention only (any channel)                                     |
| Pylon issue creation | User-initiated with confirmation                                |
| Pylon → docs trigger | On issue close AND on substantive team comment                  |
| Doc search approach  | Direct llms.txt custom sets (no mcp.scalekit.com, no vector DB) |
| Agent runtime        | agentboard (scalekit-inc/agentboard) for all agents             |

---

## Architecture overview

Three input surfaces, two agents, one shared flywheel.

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Docs widget   │  │  Webflow / app  │  │  Slack @mention │  │  Pylon webhook  │
│ docs.scalekit.com│  │   script tag   │  │   any channel   │  │ close / comment │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         └──────────────────────────┬───────────────┘                   │
                                    ↓                                   ↓
                         ┌──────────────────┐               ┌──────────────────────┐
                         │   Agent 1        │               │   Agent 2            │
                         │   Chatbot        │               │   Gap Analyzer       │
                         │   (AgentRunner)  │               │   + PR Drafter       │
                         │                  │               │   (AgentRunner)      │
                         │  tools:          │               │                      │
                         │  - search_docs   │               │  tools:              │
                         │  - create_pylon_ │               │  - read_pylon_thread │
                         │    issue*        │               │  - search_docs       │
                         └────────┬─────────┘               │  - create_github_pr  │
                                  │                          └──────────┬───────────┘
                     ┌────────────┼────────────┐                        │
                     ↓           ↓             ↓                        ↓
              llms.txt      Pylon MCP     Slack Block Kit         GitHub MCP
              custom sets   (issue)       (confirm button)        (PR → human review)

* requiresConfirmation: true
```

---

## Component 1: Chatbot widget

### What it does

A floating chat widget embedded on any web surface. Users ask questions in natural language. The agent answers grounded strictly in docs content. If it can't answer confidently, it offers to create a Pylon support issue.

### Widget delivery

A self-contained JS file served from a CDN. No framework dependency. Embeds the same way on any surface:

```html
<!-- Anonymous (docs site, Webflow) -->
<script src="https://cdn.scalekit.com/chatbot.js" data-api-key="pk_live_..."></script>

<!-- Identified (app, customer portal) -->
<script>
  ScalekitChat.identify({
    email: 'user@acme.com',
    name: 'Jane Doe',
    orgId: 'org_acme',
    orgName: 'Acme Corp',
  })
</script>
```

The Astro/Starlight layout override includes the script tag. The React components from agentboard (`AgentTerminal`, `use-agent`, `MessageStream`) are bundled into this CDN file.

### User identity

Two modes:

- **Anonymous**: No identity set. When the user initiates Pylon issue creation, the widget asks for an email inline (optional — user can skip; issue still created).
- **Identified**: App calls `ScalekitChat.identify()` after its own auth. User context flows into `AgentContext` and is automatically included in any Pylon issue created.

### Answer flow

1. Widget POSTs `{ question, conversation_history }` to `/api/chat` on the backend.
2. Backend builds `AgentContext` from the request (anonymous or identified).
3. `AgentRunner` calls `search_docs(query)`:
   - Classify query into product area (FSA / SSO / Agent Auth / MCP / SCIM / M2M / etc.)
   - Load matching custom set from generated `llms.txt` files (defined in `llms.config.ts`)
   - Return relevant content to Claude as context
4. Claude evaluates with system prompt (see below). Two outcomes:
   - **Confident answer**: Return answer with source page citations. Log question + answer.
   - **Not confident**: Return "I don't have a good answer for this. Want me to create a support issue?" User confirms → `create_pylon_issue` fires (with full conversation + user context).
5. Thumbs-down on a confident answer also triggers the Pylon issue offer.

### System prompt (chatbot)

```
You are the Scalekit docs assistant. Answer questions using only the content
returned by the search_docs tool. Always cite the source page path in your answer.

If the search_docs results don't contain a clear answer to the question,
say so explicitly — do not guess or invent information. Offer to create a
support issue so a human from the team can follow up.

Keep answers concise. Link directly to the relevant docs page.
```

### Agentboard configuration

```ts
const tools = new ToolRegistry()
tools.register(searchDocsTool) // llms.txt custom sets
tools.register(createPylonIssueTool) // requiresConfirmation: true

const chatbotRunner = new AgentRunner({
  anthropic,
  systemPrompt: CHATBOT_SYSTEM_PROMPT,
  tools,
  sessionStore: new InMemorySessionStore(),
  model: 'claude-haiku-4-5-20251001', // fast for synchronous chatbot
  maxTokens: 1024,
})
```

---

## Component 2: search_docs tool (llms.txt approach)

### What it does

Classifies the user's question into a product area, loads the matching custom set from the statically generated `llms.txt` files, and returns the content as context for Claude.

### Topic routing

Uses the routing logic already documented in `src/configs/llms.config.ts`:

| Topic                                       | Custom set               |
| ------------------------------------------- | ------------------------ |
| FSA, users, orgs, sessions, RBAC            | Full Stack Auth Complete |
| Agent Auth, OAuth vault, connectors         | Agent Authentication     |
| MCP, OAuth 2.1, Dynamic Client Registration | MCP Authentication       |
| SSO, SAML, OIDC, Intra                      | Enterprise SSO & SCIM    |
| SCIM, directory, user sync                  | Enterprise SSO & SCIM    |
| M2M, client credentials, API keys           | Machine-to-Machine Auth  |
| SDK methods, endpoints, webhooks            | API & SDK Reference      |
| Getting started, quickstarts                | Quickstart Collection    |

### No external dependencies

This tool reads from files generated at build time by `starlight-llms-txt`. No vector DB, no embedding pipeline, no external API call. Content updates automatically when a docs PR is merged and the site rebuilds.

---

## Component 3: Pylon feedback loop

### Triggers

A webhook listener on the backend fires the gap analyzer agent on two events:

- **Issue closed** — full thread available, resolution known
- **Substantive team comment** — team member comment longer than ~100 characters (filters out "+1", emoji reactions)

### Gap analyzer agent

Built on `AgentRunner` with three tools:

```ts
tools.register(readPylonThreadTool) // Pylon MCP — fetch issue + all comments
tools.register(searchDocsTool) // same llms.txt tool as chatbot
tools.register(createGithubPrTool) // GitHub MCP — open PR with MDX content
```

### Gap analysis system prompt

```
You are a documentation gap analyzer for Scalekit.

Given a support thread (issue + comments) and the current documentation for
the relevant product area, determine:

1. DOCS GAP — the feature exists but docs are missing or unclear
2. PRODUCT GAP — the feature doesn't exist yet (tag for PM, no PR)
3. ALREADY COVERED — docs answer this question (no action needed)

If DOCS GAP: use create_github_pr to open a PR. Write the new or updated
MDX content following Scalekit's CLAUDE.md conventions (sentence-case headings,
4-language SDK examples, correct frontmatter). The PR description must link
back to the Pylon issue and explain what was missing.

Be conservative — only draft a PR if you're confident content is genuinely
missing or misleading.
```

### Three outcomes

| Outcome         | Action                                                |
| --------------- | ----------------------------------------------------- |
| Docs gap        | Draft PR with new/updated MDX → team reviews → merges |
| Product gap     | Tag Pylon issue `product-gap` — no PR, PM sees it     |
| Already covered | Tag Pylon issue `docs-ok` — no action                 |

### PR format

- Branch: `docs/gap-pylon-{issueId}`
- Title: `docs: {brief description of what was clarified}`
- Body: why the PR exists, what was missing, link to Pylon issue
- Files: one or more MDX files in `src/content/docs/`
- Follows all CLAUDE.md conventions (frontmatter, sentence case, 90% language rule)

### Agentboard configuration

```ts
const gapRunner = new AgentRunner({
  anthropic,
  systemPrompt: GAP_ANALYSIS_SYSTEM_PROMPT,
  tools: gapTools,
  sessionStore: new InMemorySessionStore(),
  model: 'claude-sonnet-4-6', // quality matters here; lower volume than chatbot
  maxTokens: 4096,
})
```

---

## Component 4: Slack bot

### What it does

A Slack Bolt (Node.js) app that listens for `app_mention` events in any channel. Forwards to the same chatbot `AgentRunner`. Streams responses back to the thread. Maps agentboard's `confirm` SSE event to Slack Block Kit buttons.

### Identity resolution

```ts
// On app_mention event
const slackUser = await app.client.users.info({ user: event.user })
const ctx: AgentContext = {
  userId: slackUser.user.profile.email,
  orgId: slackUser.user.enterprise_id ?? slackUser.user.team_id,
  isAdmin: isInternalTeamMember(slackUser.user.profile.email),
}
```

### Response streaming

1. Post initial "thinking…" message to thread.
2. Update message as `token` SSE events arrive.
3. On `confirm` event: replace message with Block Kit button message (Yes / No).
4. On button click: Slack interaction payload → `runner.confirm()`.

### isAdmin gate

Community members: `isAdmin: false` — chatbot + issue creation only.
Team members: `isAdmin: true` — same tools today, but unlocks admin-only tools in future (org config lookup, etc.) without restructuring the agent.

---

## The flywheel

```
User asks unanswerable question
  → Pylon issue created (with conversation + user context)
  → Team member answers in thread
  → Gap analyzer detects docs gap
  → PR drafted with new MDX content
  → Human reviews and merges
  → Docs updated → llms.txt regenerated on deploy
  → Chatbot answers correctly next time
  → Fewer support issues over time
```

Every merged docs PR reduces future support load. The system improves continuously without manual curation.

---

## Technology stack

| Layer              | Technology                                      |
| ------------------ | ----------------------------------------------- |
| Agent runtime      | agentboard (scalekit-inc/agentboard)            |
| Backend framework  | Express (agentboard/express adapter)            |
| Chatbot model      | claude-haiku-4-5-20251001                       |
| Gap analysis model | claude-sonnet-4-6                               |
| Doc content source | llms.txt custom sets (starlight-llms-txt)       |
| Widget             | agentboard React components, CDN-bundled        |
| Slack              | Slack Bolt SDK (Node.js)                        |
| Support            | Pylon MCP                                       |
| Code               | GitHub MCP                                      |
| Session store      | InMemorySessionStore (MVP) → Redis (production) |

---

## What is NOT in scope

- Vector search / embeddings (future upgrade path if precision issues arise)
- Auto-merging PRs (human review always required)
- mcp.scalekit.com search_docs (not needed; llms.txt approach used instead)
- Analytics dashboard for chatbot usage (future)
- Multi-language response support (future)

---

## Deployment topology

All three backend components (chatbot API, Pylon webhook listener, Slack Bolt app) run as a **single Node.js service** for MVP — one Express server with three route groups. They share one `AgentRunner` instance for the chatbot and one for the gap analyzer. Splitting into separate services is a future option if scaling requires it.

---

## Open questions (non-blocking)

1. **CDN hosting**: Where does `chatbot.js` get hosted? (scalekit CDN, npm + jsDelivr, or self-hosted on Firebase?)
2. **Session persistence**: InMemorySessionStore works for MVP single-instance. If the backend scales horizontally, migrate to Redis.
3. **Webhook security**: Pylon webhook endpoint needs signature verification to prevent spoofing.
4. **Rate limiting**: Chatbot `/api/chat` endpoint needs rate limiting per IP for anonymous users.
