# Plan: Restructure agent connector page structure (HubSpot pilot)

## Context

The current agent connector pages are optimized for catalog completeness, not for the DIY developer funnel. The most valuable authored content (setup steps, code examples) is buried inside collapsed `<details>` blocks. Pages lack a quickstart path, skip the OAuth authorization step, and have no verification checkpoint. This plan creates a fully hand-authored HubSpot page as the pilot for a new structure optimized for first-time inbound developers landing cold — no sales call, no onboarding.

HubSpot is a good pilot: OAuth 2.0 auth, 50+ tools, existing setup/usage/capability content to build from, and high inbound traffic.

## Approach

Create a **separate** hand-authored file `src/content/docs/agentkit/connectors/handwritten-hubspot.mdx`. The existing generated `hubspot.mdx` stays untouched and the sync script continues to run normally. This lets us compare both versions side-by-side and iterate on the new structure without risk to the live page.

Once the new structure is validated, we swap the hand-authored file into the canonical `hubspot.mdx` path and update the sync script to generate all connectors in the new format.

## New page structure

```
Frontmatter (title, description, sidebar.label, tags, tableOfContents)
─────────────────────────────────────────────────────────
## Quickstart                          ← NEW (item 1)
   SDK prerequisites callout           ← NEW (item 2)
   3-step code: install → authorize → first call
─────────────────────────────────────────────────────────
## What you can do                     ← EXISTING (improved)
   Capability bullets, each anchored   ← item 14
   to its matching code example below
─────────────────────────────────────────────────────────
## Set up the connector                ← PROMOTED to H2 (item 4)
   Auth redirects, credentials, scopes
   (current _setup-hubspot content, unwrapped from <details>)
─────────────────────────────────────────────────────────
## Authorize a user                    ← NEW (item 5)
   CLI quick-test variant (blocking)
   + production web-redirect variant
─────────────────────────────────────────────────────────
## Verify your setup                   ← NEW (item 3)
   Smallest read-only call: GET /crm/v3/owners
   Explicit "if you see this, it works" confirmation
─────────────────────────────────────────────────────────
## Common workflows                    ← PROMOTED to H2 (item 12)
   ### Create a contact
   ### Search deals
   ### Log a call and associate with a contact
   ### Create and associate a ticket
   (Salesforce-style named sub-sections)
─────────────────────────────────────────────────────────
## Tool list                           ← EXISTING
   Guidance paragraph + <ToolList />
─────────────────────────────────────────────────────────
## Troubleshooting                     ← NEW (item 13)
   Common errors: 401, 403, 429, tool-not-found,
   connection-not-enabled, scope mismatch
─────────────────────────────────────────────────────────
Footer: last-tested-with version stamp ← NEW (item 15)
```

## Files to create / modify

| File                                                           | Action     | Purpose                                     |
| -------------------------------------------------------------- | ---------- | ------------------------------------------- |
| `src/content/docs/agentkit/connectors/handwritten-hubspot.mdx` | **Create** | Hand-authored pilot page with new structure |

No sync script changes. No changes to existing templates or generated files.

## Detailed implementation notes

### Quickstart block (item 1)

Place as the first H2. Contains a prerequisites callout (item 2) followed by a single continuous code block per language tab that does three things:

1. `npm install @scalekit-sdk/node` / `pip install scalekit`
2. Set env vars: `SCALEKIT_CLIENT_ID`, `SCALEKIT_CLIENT_SECRET`, `SCALEKIT_ENV_URL`
3. Authorize + make first read-only call (`GET /crm/v3/owners`)

Use `<Tabs syncKey="tech-stack">` with Node.js and Python. Link to `/agentkit/sdks/` for full SDK docs.

### SDK import standardization (item 11)

All Python examples on this page use:

```python
from scalekit.client import ScalekitClient
```

All Node.js examples use:

```typescript
import { ScalekitClient } from '@scalekit-sdk/node'
```

SDK variable names per AGENTS.md: `scalekit` (Node.js), `scalekit_client` (Python).

### Authorize a user (item 5)

Two sub-sections:

**CLI quick-test** — `get_authorization_link()` → print URL → `input("Press Enter...")` → proceed. This is for terminal testing.

**Production pattern** — generate auth link → show redirect URL handling → exchange callback → use connection. Brief, not a full OAuth tutorial — link to `/agentkit/authentication/` for details.

### Verify your setup (item 3)

After authorization, a labeled section that runs `GET /crm/v3/owners` and shows the expected output shape. Explicit: "If you see a list of owners, your connection is working."

### Capabilities → code anchors (item 14)

Each bullet in "What you can do" gets a markdown anchor link to the matching H3 under "Common workflows". Example:

```md
- **[Manage contacts](#create-a-contact)** — create, update, list, and search contacts
```

### Common workflows (item 12)

Reuse and restructure the existing `_usage-hubspot.mdx` content. Each workflow is an H3 with a descriptive name. Follows Salesforce's pattern: brief context sentence → code tabs → explanation of what happened.

### Troubleshooting (item 13)

Covers the 5 most common errors:

| Error                    | Cause                                        | Fix                                                      |
| ------------------------ | -------------------------------------------- | -------------------------------------------------------- |
| `401 Unauthorized`       | Invalid or expired Scalekit credentials      | Check `SCALEKIT_CLIENT_ID` and `SCALEKIT_CLIENT_SECRET`  |
| `403 Forbidden`          | Missing HubSpot scopes                       | Add required scopes in HubSpot app + Scalekit connection |
| `429 Too Many Requests`  | HubSpot rate limit (100 requests/10 seconds) | Add backoff/retry logic                                  |
| `tool_not_found`         | Wrong tool name                              | Check exact name in tool list                            |
| `connection_not_enabled` | User hasn't authorized HubSpot               | Call `get_authorization_link()` first                    |

### Last-tested-with stamp (item 15)

Small `<Aside>` at the bottom: "Last verified with HubSpot API v3 — {date}".

## Scaling to the sync script

Once the new page structure is validated on the HubSpot pilot, here's how each new section maps to the sync script's generation model:

### What the sync script can auto-generate in the new format

| New section              | Sync script change                                                                                                                                                                                                      | Authored or auto?                                                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontmatter**          | Add `description`, `sidebar.label` fields. Currently missing.                                                                                                                                                           | Auto (with description fallback from capabilities)                                                                                                              |
| **Quickstart**           | New template block. Auth-type-aware: OAuth path vs API-key path vs Bearer path. SDK install + env vars are constant across connectors. The "first call" needs a per-connector verification endpoint.                    | **Hybrid**: scaffold is auto, verification endpoint is authored per connector via a new field in `capabilities.json` or a new `_quickstart-<slug>.mdx` template |
| **What you can do**      | Already exists. Keep `capabilities.json` override system. Add anchor links to code example headings when `_usage-*` template exists.                                                                                    | Hybrid (same as today)                                                                                                                                          |
| **Set up the connector** | Change from `<details>` wrapper to bare H2. Just a template change in the script's `generateConnectorPage()` function.                                                                                                  | Authored (`_setup-*` templates, unchanged)                                                                                                                      |
| **Authorize a user**     | New auth-type-aware section. OAuth connectors get the `get_authorization_link()` pattern. API-key connectors get `upsert_connected_account()`. Can be fully templated by auth type — no per-connector authoring needed. | **Auto** (3 templates: OAuth, API-key, Bearer)                                                                                                                  |
| **Verify your setup**    | Needs a per-connector "smallest read-only call" endpoint. Can default to a generic pattern if not specified. New optional field: `verifyEndpoint` in `capabilities.json`.                                               | **Hybrid**: auto scaffold, authored endpoint                                                                                                                    |
| **Common workflows**     | Already handled by `_usage-<slug>.mdx` templates. Promote from `<details>` to bare H2.                                                                                                                                  | Authored (`_usage-*` templates, unchanged)                                                                                                                      |
| **Tool list**            | Unchanged.                                                                                                                                                                                                              | Auto                                                                                                                                                            |
| **Troubleshooting**      | Auth-type-aware common errors. OAuth connectors share the same 401/403/429/scope-mismatch table. API-key connectors have a different set. Can be fully templated.                                                       | **Auto** (2-3 templates by auth type) + optional per-connector `_troubleshooting-<slug>.mdx` override                                                           |
| **Version stamp**        | New optional field in connector metadata or `capabilities.json`.                                                                                                                                                        | Authored per connector                                                                                                                                          |

### Sync script changes needed (future PR)

1. **New template in `generateConnectorPage()`** — rewrite the page layout function to emit sections in the new order, with H2 headings instead of `<details>` wrappers for setup and usage.

2. **Auth-type-aware section templates** — the script already knows the auth type (`primaryAuth`). Add inline templates for "Authorize a user" and "Troubleshooting" keyed by auth type (OAuth, API-key, Bearer).

3. **New `capabilities.json` fields** — add optional `verifyEndpoint` (path for the "Verify your setup" call) and `lastTestedVersion` (API version string + date) per connector.

4. **New template family: `_quickstart-<slug>.mdx`** — for connectors that need a custom quickstart (e.g., Salesforce's Connected App setup differs from standard OAuth). Most connectors can use the auto-generated quickstart.

5. **MANUAL_PAGES skip-list** — once hand-authored pages are promoted to canonical paths, add a `MANUAL_PAGES` set in the sync script. Connectors in this set get their data file (`hubspot.ts`) updated but their MDX page is not overwritten.

### Migration path

1. Validate pilot on `handwritten-hubspot.mdx`
2. Apply the new structure to 2-3 more connectors manually (one per auth type: an API-key connector like HeyReach, a Bearer connector)
3. Update `sync-agent-connectors.js` to generate all connectors in the new format
4. Run full sync, diff against current generated pages, review
5. Swap hand-authored pages to canonical paths, add them to `MANUAL_PAGES`
6. Remove `handwritten-*.mdx` files

## What this plan does NOT cover (follow-up items)

These items require infrastructure or component changes beyond the pilot page:

- **Item 7** — Tool list grouping in right-rail TOC. Needs a new `<GroupedToolList>` component or TOC plugin.
- **Item 8** — Clickable category tags. Needs data-layer split (e.g., `"crmsales"` → `["crm", "sales"]`) and a filter component on the index page.
- **Item 9** — Left-nav catalog grouping. Needs `sidebar.config.ts` changes to replace `autogenerate` with category-grouped entries.
- **Item 10** — Provider requirements block. Needs a data source for plan tiers, rate limits, and required scopes per connector.
- **Item 16** — AI-coding-agent block promotion. Needs component override changes in `overrides/PageTitle.astro` or a new block component.

These are all viable follow-ups once the pilot page structure is validated.

## Verification

1. **Build passes**: `pnpm run build` completes with no errors or broken links
2. **Page renders correctly**: `pnpm dev` → navigate to `/agentkit/connectors/handwritten-hubspot/` → verify all sections render, tabs switch, tool list loads
3. **TOC structure**: Right-side TOC shows all H2s: Quickstart, What you can do, Set up the connector, Authorize a user, Verify your setup, Common workflows, Tool list, Troubleshooting
4. **Anchor links work**: Clicking capability bullets scrolls to matching code examples
5. **Existing page unaffected**: `/agentkit/connectors/hubspot/` still renders the generated version
6. **Sync script unaffected**: `pnpm run sync-agent-connectors` runs without errors, doesn't touch `handwritten-hubspot.mdx`
