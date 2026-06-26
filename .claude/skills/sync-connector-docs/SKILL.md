# /sync-connector-docs

Generates and publishes documentation for a new Scalekit agent connector using `scripts/sync-agent-connectors-local.js`.

Invoke as:

```
/sync-connector-docs <slug> [--template <template-slug>] [--providers-dir <path>]
```

| Arg                      | Effect                                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `slug` (required)        | Connector slug (e.g. `claymcp`, `linear`, `hubspot`) — must match folder name in `providers/<slug>/` |
| `--template <slug>`      | Existing connector slug to clone `_setup-*.mdx` stubs from. Auto-selected if omitted.                |
| `--providers-dir <path>` | Absolute path to the `providers/` directory. Auto-detected if omitted.                               |

---

## What this skill does

Runs `scripts/sync-agent-connectors-local.js` in this repo to generate:

- `src/content/docs/agentkit/connectors/<slug>.mdx` — connector page
- `src/data/agent-connectors/<slug>.ts` — tool data file
- `src/data/agent-connectors/catalog.ts` — catalog entry (merged)
- `src/components/templates/agent-connectors/_setup-<slug>.mdx` — setup stub (cloned from template)
- `src/components/templates/agent-connectors/_section-after-setup-<slug>-common-workflows.mdx` — workflows stub
- `src/components/templates/agent-connectors/index.ts` — re-synced exports

Then verifies structure, runs a description consistency pass, commits, pushes, and opens a draft PR.

**Fully automated — no user input needed** except for credentials/connection setup, which never applies to docs generation.

---

## Step 1 — Auto-detect providers directory

Find the `providers/` directory containing `<slug>/<slug>.json`:

1. If `--providers-dir` was passed → use it directly (verify `<slug>/<slug>.json` exists)
2. Check sibling of this repo: if this repo is at `/home/user/developer-docs`, try `/home/user/tool-agent/providers`
3. Check `../tool-agent/providers` relative to this repo root
4. Check `~/tool-agent/providers` (expand `~`)
5. If none found → stop and report `PROVIDERS_DIR_NOT_FOUND` with the paths tried

Never ask the user for the path — auto-detect it.

## Step 2 — Auto-select template (if not supplied)

Read existing `_setup-*.mdx` files in `src/components/templates/agent-connectors/` to discover available templates. Select by this priority:

| Connector type                                                         | Template priority                                                      |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| MCP connector (slug ends in `mcp`, or `is_mcp: true` in provider JSON) | `atlassianmcp` → `profoundmcp` → `claymcp` → newest MCP `_setup-*.mdx` |
| OAUTH + Google proxy URL                                               | `gmail`                                                                |
| OAUTH generic                                                          | `hubspot` → `notion` → `calendlymcp`                                   |
| API_KEY or BASIC                                                       | `zendesk`                                                              |
| Anything else                                                          | Most recently modified `_setup-*.mdx` (by mtime)                       |

If the selected template's `_setup-<template>.mdx` doesn't exist in this repo, try the next one.

## Step 3 — Branch off main

```bash
git fetch origin
git checkout main
git pull --ff-only
git checkout -b connector-docs/<slug>
```

If the branch already exists (e.g., resuming), check it out and `git pull --ff-only`.

## Step 4 — Run the sync script

```bash
node scripts/sync-agent-connectors-local.js \
  --providers-dir <abs-providers-dir> \
  --slug <slug> \
  --template <template>
```

Read the full stdout. If the script reports `❌` or throws → stop and report the failure verbatim. Do NOT edit or work around the script — report the bug.

## Step 5 — Verify structure

Check all six generated files exist:

- `src/content/docs/agentkit/connectors/<slug>.mdx` — has `title`, `tableOfContents`, `description`, `sidebar.label`, `connectorIcon`, `connectorAuthType`, `connectorCategories`
- `src/data/agent-connectors/<slug>.ts` — exports `tools: Tool[]`; first tool name starts with `<slug>_`
- `src/data/agent-connectors/catalog.ts` — `git diff --stat` shows small addition (≤10 lines); if hundreds of lines removed → stop, script broke the catalog
- `_setup-<slug>.mdx` and `_section-after-setup-<slug>-common-workflows.mdx` — both present with `{/* TODO: stub cloned from ... */}` header
- `src/components/templates/agent-connectors/index.ts` — exports include `Setup<PascalSlug>Section` and `SectionAfterSetup<PascalSlug>CommonWorkflows`

## Step 6 — Description consistency pass

For each tool in `src/data/agent-connectors/<slug>.ts`:

- Find its source JSON at `<providers-dir>/<slug>/<slug>_*.json`
- Verify `name`, `description`, `display_name` match verbatim (no truncation, paraphrase, HTML-entity drift)
- Fix any mismatch in the `.ts` file — source JSON is ground truth
- Flag poor source descriptions as `TOOL_DESCRIPTION_QUALITY_ISSUE` in the report (do NOT change the `.ts` to differ from source)

Also verify the generated MDX:

- `title` ≤ 60 chars, sentence case; `description` ≤ 160 chars, active voice, no filler words
- `sidebar.label` 1–3 words, sentence case
- Naming consistent: `display_name` in prose, slug in code, UPPERCASE identifier in API contexts only

## Step 7 — Verify build

Run: `pnpm build`

**Acceptable:** build emits `/agentkit/connectors/<slug>/index.html` even if the known pre-existing `starlight-links-validator` failure appears.

**Stop and report if:**

- Build fails before page render with `ImageNotFound` referencing `<slug>`
- Build fails with an MDX/Astro error referencing `<slug>` or any file you wrote
- Build emits `git status` showing `M public/d2/**.svg` → discard with `git checkout -- public/d2/` then re-check

## Step 8 — Stage, commit, push

Stage ONLY these files (explicit paths — never `-A`, `-u`, or `.`):

```bash
git add src/content/docs/agentkit/connectors/<slug>.mdx
git add src/data/agent-connectors/<slug>.ts        # skip if no tools
git add src/data/agent-connectors/catalog.ts
git add src/components/templates/agent-connectors/_setup-<slug>.mdx
git add src/components/templates/agent-connectors/_section-after-setup-<slug>-common-workflows.mdx
git add src/components/templates/agent-connectors/index.ts
```

Do NOT stage anything else. Do NOT add `Co-Authored-By` lines (developer-docs convention).

```bash
git commit -m "docs(<slug>): add <Display Name> connector documentation"
git push -u origin connector-docs/<slug>
```

Never force push. If push fails → stop and explain why.

## Step 9 — Open draft PR

```bash
gh pr create \
  --draft \
  --title "docs(<slug>): add <Display Name> connector documentation" \
  --body "$(cat <<'EOF'
## Summary

Adds documentation for the **<Display Name>** connector (`<slug>`) — <one-line description of what the connector does>.

**Tool count:** <N> tools
**Auth:** <auth type>
**Categories:** <categories>

## Stub files

`_setup-<slug>.mdx` and `_section-after-setup-<slug>-common-workflows.mdx` are cloned from `<template>` and need:
- Screenshots replacing `{/* TODO: add screenshot ... */}` markers
- Review of connector-specific setup steps (URLs, scopes, app registration)

## Preview

https://deploy-preview-{PR_NUMBER}--scalekit-starlight.netlify.app/agentkit/connectors/<slug>/

## Test plan

- [ ] Open the preview link — page renders
- [ ] Tool list shows <N> tools
- [ ] Replace screenshot TODO markers in `_setup-<slug>.mdx`
- [ ] Review setup steps for connector-specific accuracy
EOF
)"
```

After creating the PR, patch the body to fill in the real `{PR_NUMBER}`:

```bash
PR_NUM=$(gh pr view --json number -q .number)
gh pr edit $PR_NUM --body "$(gh pr view $PR_NUM --json body -q .body | sed "s/{PR_NUMBER}/$PR_NUM/g")"
```

## Step 10 — Report back

Return:

- PR URL
- Branch name
- Providers dir resolved (and how — sibling path, explicit arg, etc.)
- Template selected (and why — auth type, MCP flag, mtime fallback)
- Description consistency report: matches / fixes applied / `TOOL_DESCRIPTION_QUALITY_ISSUE` flags
- Workspace state: clean / auto-stashed (stash name) / fresh-cloned (tmp path)
- Any anomalies in script output, structure verification, or build

---

## Do not

- Edit `scripts/sync-agent-connectors-local.js` or `scripts/sync-agent-connectors.js` — if they need changes, report the bug
- Touch `capabilities.json` or `description-html.json` (curation work, not generation)
- Modify `_setup-*.mdx` or `_section-after-setup-*.mdx` stubs after cloning — human reviewer fills in screenshots
- Stage anything outside the step 8 allowlist
- Use `git add -A`, `-u`, or `.`
- Force push or skip hooks
- Add `Co-Authored-By` to commits
- Modify source tool JSON files in `providers/` — they are read-only input; flag quality issues upstream
- Ask the user for the providers path, workspace mode, or template connector — auto-detect all three
