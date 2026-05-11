# WIP: Connector sync guide refresh

**Branch:** `preview/connector-sync-guide-refresh`
**Plan doc:** `project-docs/CONNECTOR_PAGE_RESTRUCTURE.md`
**Last updated:** 2026-05-08

---

## What this branch is doing

Restructuring agent connector pages to optimize for first-time inbound developers. HubSpot is the pilot. Once validated, the new structure rolls out to all connectors via sync script updates.

The pilot creates a **separate** hand-authored file `src/content/docs/agentkit/connectors/handwritten-hubspot.mdx`. The existing generated `hubspot.mdx` stays untouched.

---

## Current state: pilot page

**File:** `src/content/docs/agentkit/connectors/handwritten-hubspot.mdx`

### Sections — done

| Section                                                               | Plan item | Status  |
| --------------------------------------------------------------------- | --------- | ------- |
| Frontmatter (`overviewTitle: 'Quickstart'`, tags, `tableOfContents`)  | 1         | ✅ Done |
| `<Steps>` block with Quickstart sub-steps                             | 1, 2      | ✅ Done |
| Step 1: Install SDK (Node.js + Python tabs)                           | 1         | ✅ Done |
| Step 2: Set credentials (env vars)                                    | 1         | ✅ Done |
| Step 3: Set up the connector (unwrapped from `<details>`)             | 4         | ✅ Done |
| Step 4: Authorize and make first call                                 | 5         | ✅ Done |
| Step 5: Verify your setup (`GET /crm/v3/owners`)                      | 3         | ✅ Done |
| `## What you can do` with anchor links to code examples               | 14        | ✅ Done |
| `## Common workflows` (H3 named subsections)                          | 12        | ✅ Done |
| `## Tool list` with `<ToolList />`                                    | —         | ✅ Done |
| `## Troubleshooting` (5 errors in `<details>` blocks)                 | 13        | ✅ Done |
| `ToolList.astro` clickable anchor links                               | —         | ✅ Done |
| SDK field names corrected (`connector:`, `toolInput:`, `tool_input=`) | —         | ✅ Done |

### Sections — missing

| Section                        | Plan item | Notes                                                                   |
| ------------------------------ | --------- | ----------------------------------------------------------------------- |
| Last-tested-with version stamp | 15        | Small `<Aside>` at bottom: "Last verified with HubSpot API v3 — {date}" |

## Current state: sync script rollout

**All 77 generated connector pages** now use the new structure:

| Feature                                                                                               | Status  |
| ----------------------------------------------------------------------------------------------------- | ------- |
| `<Steps>` quickstart block (install → credentials → authorize → first call)                           | ✅ Done |
| Frontmatter: `description`, `sidebar.label`, `overviewTitle: 'Quickstart'`                            | ✅ Done |
| `## Set up the connector` as bare H2 (no `<details>` wrapper)                                         | ✅ Done |
| `## Common workflows` section via `_section-after-setup-*` hook                                       | ✅ Done |
| Generic quickstart components (`_quickstart-generic-oauth.astro`, `_quickstart-generic-apikey.astro`) | ✅ Done |
| HubSpot connector-specific quickstart (`_quickstart-hubspot.mdx`)                                     | ✅ Done |
| 72 `_usage-*.mdx` renamed → `_section-after-setup-*-common-workflows.mdx`                             | ✅ Done |
| `sectionTitle` export added to all renamed files                                                      | ✅ Done |
| Build passes                                                                                          | ✅ Done |

---

## Other files changed on this branch

| File                                                                                               | Why                                                                                |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `scripts/sync-agent-connectors.js`                                                                 | New page structure: quickstart steps, bare H2 setup, frontmatter fields            |
| `src/content/docs/agentkit/connectors/handwritten-hubspot.mdx`                                     | Pilot: fixed SDK field names                                                       |
| `src/content/docs/agentkit/connectors/*.mdx` (80 files)                                            | All regenerated with new structure                                                 |
| `src/data/agent-connectors/*.ts` (80 files)                                                        | All refreshed from production                                                      |
| `src/components/templates/agent-connectors/_quickstart-hubspot.mdx`                                | HubSpot-specific quickstart                                                        |
| `src/components/templates/agent-connectors/_quickstart-generic-oauth.astro`                        | Generic OAuth quickstart (props-based)                                             |
| `src/components/templates/agent-connectors/_quickstart-generic-apikey.astro`                       | Generic API Key quickstart (props-based)                                           |
| `src/components/templates/agent-connectors/_section-after-setup-*-common-workflows.mdx` (72 files) | Renamed from `_usage-*`; `sectionTitle` export added                               |
| `src/components/templates/agent-connectors/index.ts`                                               | Auto-regenerated: removed usage entries, added section + quickstart entries        |
| `src/components/templates/index.ts`                                                                | Removed stale `UsageBitbucketSection` direct export                                |
| `src/content/docs/reference/agent-connectors/bigqueryserviceaccount.mdx`                           | Updated to use new `SectionAfterSetup*` component name                             |
| `src/content/docs/reference/agent-connectors/box.mdx`                                              | Updated to use new `SectionAfterSetup*` component name                             |
| `project-docs/SYNC_AGENT_CONNECTORS.md`                                                            | Documented new `_quickstart-*`, `_section-after-setup-*-common-workflows` patterns |
| `src/components/ToolList.astro`                                                                    | Added clickable anchor links (earlier commit)                                      |
| `src/content/docs/directory/guides/group-based-role-assignment.mdx`                                | Unrelated fix included on branch                                                   |

---

## What to do next

### Template content cleanup (follow-up work)

The 72 common-workflow templates still have old-format content (client init boilerplate, separate proxy and executeTool sections). These need to be rewritten to:

- Remove client init / `getAuthorizationLink` boilerplate
- Wrap each workflow in `<details><summary>Name</summary>…</details>`
- Show proxy (`actions.request()`) AND executeTool in the same code block with comment labels
- Use correct field names: `connector:` in executeTool (Node.js), `connection_name=` in Python

See `project-docs/SYNC_AGENT_CONNECTORS.md` for the target pattern.

### PR

Run build and verify: `pnpm run build`

Open PR against `main` — preview link format: `https://deploy-preview-{PR#}--scalekit-starlight.netlify.app/agentkit/connectors/hubspot/`

### Future infrastructure (separate PRs, not this branch)

- Item 7: Tool list grouping in right-rail TOC — needs `<GroupedToolList>` component
- Item 8: Clickable category tags — needs data-layer split + filter component on index
- Item 9: Left-nav catalog grouping — needs `sidebar.config.ts` changes
- Item 10: Provider requirements block — needs plan/rate-limit data source
- Item 16: AI-coding-agent block promotion — needs component override in `overrides/PageTitle.astro`

---

## Quick verification commands

```bash
# Check pilot page renders
pnpm dev
# Navigate to: http://localhost:4321/agentkit/connectors/handwritten-hubspot/

# Check existing generated page unaffected
# Navigate to: http://localhost:4321/agentkit/connectors/hubspot/

# Check sync script still works
pnpm run sync-agent-connectors
```
