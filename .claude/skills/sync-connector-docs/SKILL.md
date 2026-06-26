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

Then verifies structure, rewrites the setup stub with auth-type-specific deterministic content, runs a description consistency pass, commits, pushes, and opens a draft PR.

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

## Step 5.5 — Auth setup content pass

Read `<providers-dir>/<slug>/<slug>.json`. Extract:

- `display_name` — substituted throughout step text
- `auth_patterns[0].type` → `OAUTH`, `API_KEY`, `BEARER`, `BASIC`, `OAUTH_M2M`
- `auth_patterns[0].is_mcp` → `true` = MCP/DCR path (OAUTH with automatic client registration)
- `auth_patterns[0].available_scopes[*].name` → scope list for OAUTH BYO template

**Overwrite** `src/components/templates/agent-connectors/_setup-<slug>.mdx` with the matching template below. Substitute `<Display Name>`, `<slug>`, and scope values throughout. Replace the entire cloned stub — do not preserve template content.

Do NOT touch `_section-after-setup-<slug>-common-workflows.mdx` — that stub is left entirely for human review.

### Template: MCP / OAUTH with DCR (`is_mcp: true`)

```mdx
import { Steps, Aside } from '@astrojs/starlight/components'

<Display Name> uses OAuth 2.1 with Dynamic Client Registration (DCR) and PKCE. Scalekit registers an OAuth client with <Display Name> automatically — no client ID or secret is needed.

<Steps>
1. ### Create a connection in Scalekit

In the [Scalekit dashboard](https://app.scalekit.com), go to **AgentKit** > **Connections**. Find **<Display Name>** and click **Create**. Note the **Connection name** — use this as `connection_name` in your code (for example, `<slug>`).

{/* TODO: add screenshot of <Display Name> connection creation in Scalekit dashboard */}

2. ### Authorize the connection

   Generate an authorization link for a user and open it in a browser. <Display Name> prompts the user to grant access. After the user approves, the connected account becomes active and Scalekit manages token refresh automatically.

   {/* TODO: add screenshot of <Display Name> OAuth consent/authorization screen */}

3. ### Verify the connection is active

   In the Scalekit dashboard, open **AgentKit** > **Connections** > **<Display Name>** and confirm the connected account shows status **Active**. If it shows **Pending**, the user has not yet completed the authorization flow.

   {/* TODO: add screenshot of active connected account in Scalekit dashboard */}

   </Steps>
```

### Template: OAUTH with BYO credentials (`type: "OAUTH"`, `is_mcp: false`)

```mdx
import { Steps } from '@astrojs/starlight/components'

Register your <Display Name> OAuth app credentials with Scalekit so it can authenticate requests on your behalf.

<Steps>
1. ### Copy the redirect URI from Scalekit

In the [Scalekit dashboard](https://app.scalekit.com), go to **AgentKit** > **Connections** > **Create Connection**. Find **<Display Name>** and click **Create**. Copy the redirect URI — it looks like `https://<SCALEKIT_ENVIRONMENT_URL>/sso/v1/oauth/<CONNECTION_ID>/callback`.

{/* TODO: add screenshot of Scalekit connection creation and redirect URI for <Display Name> */}

2. ### Create an OAuth app in <Display Name>

   {/* TODO: add provider-specific steps — navigate to <Display Name> developer settings, create an OAuth app, and add the Scalekit redirect URI from step 1 */}

   {/* TODO: add screenshot of OAuth app creation in <Display Name> developer dashboard */}

3. ### Get client credentials

   In your <Display Name> app settings, copy your **Client ID** and **Client Secret**.

   {/* TODO: add screenshot showing where to find client ID and secret in <Display Name> */}

4. ### Add credentials in Scalekit

   In the [Scalekit dashboard](https://app.scalekit.com), open the **<Display Name>** connection and enter:
   - **Client ID** — from your <Display Name> app
   - **Client Secret** — from your <Display Name> app
   - **Scopes** — `<scope names from available_scopes, space-separated>`

   {/* TODO: add screenshot of credential entry form in Scalekit dashboard */}

   Click **Save**.

   </Steps>
```

### Template: API_KEY

```mdx
import { Steps } from '@astrojs/starlight/components'

Register your <Display Name> API key with Scalekit so it can authenticate requests on your behalf.

<Steps>
1. ### Generate an API key

{/* TODO: add provider-specific steps for generating an API key in <Display Name> */}

{/* TODO: add screenshot of API key generation in <Display Name> */}

Copy the API key — it is typically shown only once.

2. ### Create a connection in Scalekit

   In the [Scalekit dashboard](https://app.scalekit.com), go to **AgentKit** > **Connections** > **Create Connection**. Find **<Display Name>** and click **Create**.

   {/* TODO: add screenshot of connection creation in Scalekit dashboard */}

3. ### Create a connected account

   In the Scalekit dashboard, open your **<Display Name>** connection and click **Add account**. Enter:
   - **Your User's ID** — a unique identifier for the user in your system
   - **API Key** — the key you copied in step 1

   {/* TODO: add screenshot of connected account form in Scalekit dashboard */}

   Click **Save**.

   </Steps>
```

### Template: BEARER

```mdx
import { Steps } from '@astrojs/starlight/components'

Register your <Display Name> bearer token with Scalekit so it can authenticate requests on your behalf.

<Steps>
1. ### Get a bearer token

{/* TODO: add provider-specific steps for obtaining a bearer token from <Display Name> */}

{/* TODO: add screenshot of token generation or copy location in <Display Name> */}

2. ### Create a connection in Scalekit

   In the [Scalekit dashboard](https://app.scalekit.com), go to **AgentKit** > **Connections** > **Create Connection**. Find **<Display Name>** and click **Create**.

   {/* TODO: add screenshot of connection creation in Scalekit dashboard */}

3. ### Create a connected account

   In the Scalekit dashboard, open your **<Display Name>** connection and click **Add account**. Enter:
   - **Your User's ID** — a unique identifier for the user in your system
   - **Bearer Token** — the token from step 1

   {/* TODO: add screenshot of connected account form in Scalekit dashboard */}

   Click **Save**.

   </Steps>
```

### Template: BASIC

```mdx
import { Steps } from '@astrojs/starlight/components'

Register your <Display Name> credentials with Scalekit so it can authenticate requests on your behalf.

<Steps>
1. ### Locate your credentials

{/* TODO: add provider-specific steps for finding username and password or API token in <Display Name> */}

{/* TODO: add screenshot */}

2. ### Create a connection in Scalekit

   In the [Scalekit dashboard](https://app.scalekit.com), go to **AgentKit** > **Connections** > **Create Connection**. Find **<Display Name>** and click **Create**.

   {/* TODO: add screenshot of connection creation in Scalekit dashboard */}

3. ### Create a connected account

   In the Scalekit dashboard, open your **<Display Name>** connection and click **Add account**. Enter:
   - **Your User's ID** — a unique identifier for the user in your system
   - **Username** — your <Display Name> username or email
   - **Password** — your <Display Name> password or API token

   {/* TODO: add screenshot of connected account form in Scalekit dashboard */}

   Click **Save**.

   </Steps>
```

### What stays as TODO (always manual)

- **Screenshots** — require a live, authenticated session with the provider's UI
- **Provider-specific navigation** — the path inside the provider's dashboard to find API keys, OAuth apps, or token issuance pages
- **Exact scope names** for OAUTH BYO — while scope names are inserted from `available_scopes`, the human reviewer should verify they match the provider's current published list

### What is auto-filled (deterministic)

- Auth flow description (DCR, BYO OAuth, API key, bearer, basic)
- Scalekit dashboard navigation (always identical across connectors)
- Redirect URI format string
- Connected account field names (API Key, Bearer Token, Username/Password)
- Step sequence and structure

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

`_setup-<slug>.mdx` has auth-type-specific setup steps auto-generated. Still needs:
- Screenshots replacing `{/* TODO: add screenshot ... */}` markers
- Provider-specific navigation paths replacing `{/* TODO: add provider-specific steps ... */}` markers

`_section-after-setup-<slug>-common-workflows.mdx` needs workflow examples added (cloned stub only).

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
- Modify `_setup-*.mdx` beyond what Step 5.5 generates — screenshots and provider-specific navigation paths are human-only additions
- Modify `_section-after-setup-*.mdx` — common workflows stubs are left entirely for human review
- Stage anything outside the step 8 allowlist
- Use `git add -A`, `-u`, or `.`
- Force push or skip hooks
- Add `Co-Authored-By` to commits
- Modify source tool JSON files in `providers/` — they are read-only input; flag quality issues upstream
- Ask the user for the providers path, workspace mode, or template connector — auto-detect all three
