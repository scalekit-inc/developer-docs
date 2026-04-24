# Build audit: issues, fixes, and prioritization

**Scope:** `package.json` scripts, `astro.config.mjs` (Vite/build config), `netlify.toml`, `.simple-git-hooks.json`, shift-left opportunities
**Date:** 2026-04-24

---

## Summary

### Part 1 — Existing build issues

| #   | Issue                                            | File               | Priority | Risk   | Impact            |
| --- | ------------------------------------------------ | ------------------ | -------- | ------ | ----------------- |
| 1   | Audit script runs on every build, writes nothing | `package.json`     | High     | Low    | Build duration ↓  |
| 2   | Post-build scripts run sequentially              | `package.json`     | High     | Low    | Build duration ↓  |
| 3   | `generate-llms-index.js` uses sync FS APIs       | `scripts/`         | Medium   | Low    | Build duration ↓  |
| 4   | Stale comment contradicts `output: 'server'`     | `astro.config.mjs` | Medium   | None   | Build quality ↑   |
| 5   | `maxParallelFileOps: 2` too conservative         | `astro.config.mjs` | Medium   | Medium | Build duration ↓  |
| 6   | `chunkSizeWarningLimit: 2000` suppresses signal  | `astro.config.mjs` | Low      | Low    | Build quality ↑   |
| 7   | `node_bundler` comment is factually wrong        | `netlify.toml`     | High     | None   | Build quality ↑   |
| 8   | `included_files` is redundant/misleading         | `netlify.toml`     | High     | Low    | Build quality ↑   |
| 9   | No cache headers for hashed static assets        | `netlify.toml`     | High     | Low    | Runtime perf ↑    |
| 10  | Links validator disabled in all Netlify builds   | `astro.config.mjs` | Medium   | Low    | Build quality ↑   |
| 11  | LLM cache rules are four identical blocks        | `netlify.toml`     | Low      | None   | Maintainability ↑ |

### Part 2 — Shift-left and structural opportunities

| #   | Opportunity                                                                              | Priority     | Risk   | Impact            |
| --- | ---------------------------------------------------------------------------------------- | ------------ | ------ | ----------------- |
| 12  | Pre-push hook runs full build — duplicates Netlify                                       | **Critical** | Medium | Build duration ↓↓ |
| 13  | No GitHub Actions CI — pre-push is only check                                            | High         | Low    | Build quality ↑↑  |
| 14  | D2 generation: already skipped on Netlify, but no enforcement when `.d2` files are added | Medium       | Low    | Build quality ↑   |
| 15  | `reorder-swagger` not in any automated pipeline                                          | Medium       | Low    | Build quality ↑   |
| 16  | `astro check` (TypeScript) not in any pipeline                                           | High         | Low    | Build quality ↑   |
| 17  | OG image pre-generation to avoid WASM at build time                                      | Low          | Medium | Build duration ↓  |

---

## Detailed findings

### 1. Audit script runs on every production build

**File:** `package.json`, line 9

```json
"build": "astro build && node scripts/generate-llms-index.js && node scripts/agent-markdown-audit.js"
```

`agent-markdown-audit.js` scans all MDX files and logs component coverage to stdout. It **writes no build artifacts**. It only fails the build when run with `--strict`, which the build script never passes. Running it on every CI/Netlify build burns time scanning 300+ docs pages for zero effect on the output.

**Fix:**

```json
"build": "astro build && node scripts/generate-llms-index.js",
"build:audit": "node scripts/agent-markdown-audit.js",
"build:audit:strict": "node scripts/agent-markdown-audit.js --strict"
```

**Priority:** High
**Risk:** Low — removes a no-op step; output unchanged
**Impact:** Build duration reduction proportional to docs page count (grows over time)

---

### 2. Post-build scripts run sequentially

**File:** `package.json`, line 9

`generate-llms-index.js` and `agent-markdown-audit.js` are fully independent — neither reads output from the other. Chaining with `&&` serializes them unnecessarily.

**Fix (cross-platform via `concurrently`, already a transitive dep via Netlify CLI):**

```json
"build": "astro build && concurrently \"node scripts/generate-llms-index.js\" \"node scripts/agent-markdown-audit.js\""
```

Or, since `agent-markdown-audit.js` is removed from the default build in fix #1, this applies only if both are intentionally kept:

```bash
# Unix only
"build": "astro build && node scripts/generate-llms-index.js & node scripts/agent-markdown-audit.js & wait"
```

**Priority:** High (but dependent on fix #1; if #1 is applied, this becomes moot for the default build)
**Risk:** Low — scripts are side-effect-free relative to each other
**Impact:** Build duration — saves the full wall-clock time of the shorter script

---

### 3. `generate-llms-index.js` uses synchronous FS in a loop

**File:** `scripts/generate-llms-index.js`, lines 83–96

```js
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const stat = statSync(full) // blocks per file
    const content = readFileSync(file) // blocks per file
  }
}
```

`agent-markdown-audit.js` already does this correctly with async generators and `readdir` from `fs/promises`. The sync approach serializes every stat and read, blocking the event loop for the full doc tree.

**Fix:** Rewrite `walk()` and the main loop using `fs/promises`:

```js
import { readFile, readdir, stat } from 'node:fs/promises'

async function* walk(dir) {
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry)
    if ((await stat(full)).isDirectory()) yield* walk(full)
    else if (full.endsWith('.md') || full.endsWith('.mdx')) yield full
  }
}

const reads = []
for await (const file of walk(DOCS_DIR)) {
  reads.push(readFile(file, 'utf8').then((content) => ({ file, content })))
}
const files = await Promise.all(reads)
```

**Priority:** Medium
**Risk:** Low — pure I/O refactor, same logical output
**Impact:** Build duration — meaningful on large doc trees; parallelizes all file reads

---

### 4. Stale comment contradicts `output: 'server'`

**File:** `astro.config.mjs`, lines 34–38

```js
// Switched from 'server' to default (static) to drastically reduce build memory.
// Astro 6's Vite Environments API creates separate build contexts per output mode;
// 'server' mode processes all 300+ pages through a heavy SSR pipeline.
// The few SSR pages (auth, health, admin) already have `prerender = false`.
output: 'server',
```

The comment describes switching _away_ from `server` mode, but the code is `output: 'server'`. Either the switch was reverted and the comment not updated, or the comment was written anticipating a change that never happened. This actively misleads anyone reading the config.

**Fix:** Update the comment to reflect actual state:

```js
// SSR mode: the Netlify adapter handles static prerendering per-page.
// Pages with `prerender = false` (auth, health, admin) are served as SSR.
// Memory-intensive builds: see vite.build settings below.
output: 'server',
```

**Priority:** Medium
**Risk:** None — comment-only change
**Impact:** Build quality (maintainability, onboarding)

---

### 5. `maxParallelFileOps: 2` is excessively conservative

**File:** `astro.config.mjs`, line 415

```js
maxParallelFileOps: 2,
```

Rollup's default is no limit. This was tuned down for CI memory, but `2` serializes almost all file I/O during bundling. On a build with 300+ pages and thousands of assets, this directly extends the Rollup emit phase. The memory benefit is real but the value should be calibrated — `8` still caps concurrency well below default while meaningfully reducing serialization.

**Fix:**

```js
// Caps Rollup file I/O concurrency to reduce memory spikes; 8 is a reasonable
// middle ground between unlimited (default) and fully serial (2).
maxParallelFileOps: 8,
```

**Priority:** Medium
**Risk:** Medium — increasing this raises peak memory usage. Should be tested against CI memory limits before merging. Rollback is trivial.
**Impact:** Build duration — Rollup emit phase is a significant share of total build time

---

### 6. `chunkSizeWarningLimit: 2000` suppresses a useful signal

**File:** `astro.config.mjs`, line 409

```js
chunkSizeWarningLimit: 2000,
```

Default is 500KB. Raising to 2000KB (2MB) silences Vite's chunk size warnings. This means large chunks that could be split for better page load performance go unnoticed. The `@scalar` manual chunk (line 418) already handles the known large dependency — the limit raise should not be needed if chunks are managed properly.

**Fix:** Audit current chunk sizes first:

```bash
pnpm astro build 2>&1 | grep "kB"
```

If no chunks exceed 500KB after the `@scalar` split, revert to default:

```js
// chunkSizeWarningLimit: 2000,  // remove or reduce back to default 500
```

If large chunks remain, split them explicitly rather than hiding the warning.

**Priority:** Low
**Risk:** Low — restoring the default only adds console warnings, not failures. Actual chunk behavior unchanged.
**Impact:** Build quality — surface hidden bundle size issues

---

### 7. `node_bundler` comment is factually wrong

**File:** `netlify.toml`, lines 10–11

```toml
node_bundler = "esbuild"
# Ensure Functions 2.0 format is used
```

`node_bundler = "esbuild"` is the **Functions 1.x** bundler setting. Functions 2.0 uses native ESM with `eszip` format and is declared via `export default` syntax in the function file — not controlled by `node_bundler`. The comment is the opposite of what the setting does and will mislead any debugging of function packaging issues.

**Fix:**

```toml
node_bundler = "esbuild"
# Bundles legacy Functions 1.x with esbuild. Functions 2.0 (used by the SSR adapter)
# are bundled separately via the Netlify adapter and are not affected by this setting.
```

**Priority:** High
**Risk:** None — comment-only change
**Impact:** Build quality (correctness of ops knowledge, reduces debugging time)

---

### 8. `included_files` is redundant and misleading

**File:** `netlify.toml`, lines 9–12

```toml
[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"
  included_files = ["netlify/functions/**"]
```

`included_files` tells esbuild which additional files to bundle into the function — for example, templates, JSON data, or WASM binaries that aren't imported but needed at runtime. Pointing it at the functions source directory itself achieves nothing useful because those files are already the entry points being bundled. This creates a false impression that some important bundling is happening.

**Fix:** Remove the line entirely, or replace with a real runtime dependency if one exists:

```toml
[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"
```

**Priority:** High
**Risk:** Low — removing a no-op line. If by accident this was bundling something legitimate, the function would break and the real dependency would become visible. Verify by running `netlify functions:build` locally first.
**Impact:** Build quality (removes false signal in config)

---

### 9. No cache headers for hashed static assets

**File:** `netlify.toml`

Astro generates content-hashed filenames for all JS/CSS bundles (e.g., `/_astro/index.BxK3f8aP.js`). These can be cached permanently because the hash changes on every content update. No `Cache-Control` rule exists for `/_astro/*`, so Netlify serves these with its default short-lived cache, forcing browsers and CDN nodes to re-fetch unchanged assets on every deploy.

**Fix:** Add to `netlify.toml`:

```toml
# Astro emits content-hashed filenames — safe to cache permanently
[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Priority:** High
**Risk:** Low — immutable cache is safe precisely because the URL changes with content. If assets somehow stopped being hashed (e.g., Astro config change), this would need revisiting.
**Impact:** Runtime performance — eliminates redundant asset fetches across deploys; reduces CDN egress cost

---

### 10. Links validator disabled in all Netlify builds, including previews

**File:** `astro.config.mjs`, lines 111–117

```js
...(!process.env.NETLIFY
  ? [starlightLinksValidator({ exclude: ['/apis/**'] })]
  : []),
```

`NETLIFY=1` is set in all Netlify environments — production, deploy previews, and branch deploys. This means broken internal links are **never caught in CI**. They can only be caught locally, which requires developer discipline.

**Fix option A:** Check `CONTEXT` env var (set by Netlify) to distinguish production from previews:

```js
const isProduction = process.env.CONTEXT === 'production'
const isNetlify = !!process.env.NETLIFY

...(!isNetlify || !isProduction
  ? [starlightLinksValidator({ exclude: ['/apis/**'] })]
  : []),
```

This enables link validation on deploy previews while skipping it on production (where memory is tightest).

**Fix option B:** Keep it disabled on all Netlify builds (current behavior) but add a CI step via `netlify.toml`:

```toml
[context.deploy-preview]
  command = "pnpm run build && pnpm astro check"
```

**Priority:** Medium
**Risk:** Low for option A — previews have the same memory budget as production on Netlify. Monitor first build to confirm no OOM.
**Impact:** Build quality — broken links caught before merge rather than after deploy

---

### 11. Four identical LLM cache rules with no grouping comment

**File:** `netlify.toml`, lines 24–43

The four rules for `/llms.txt`, `/llms-full.txt`, `/llms-small.txt`, and `/_llms-txt/*` are identical in their `Cache-Control` values. Netlify TOML does not support multi-path headers in a single block, so the repetition is unavoidable structurally. However, there is no comment indicating this is intentional, making it look like copy-paste noise.

**Fix:** Add a single comment block above all four:

```toml
# LLM index files — 1h fresh, 24h stale. All four rules are intentionally identical;
# Netlify TOML requires a separate [[headers]] block per path pattern.
```

**Priority:** Low
**Risk:** None — comment-only
**Impact:** Maintainability

---

---

## Part 2 — Shift-left and structural opportunities

### Background: the double-build problem

`.simple-git-hooks.json` reveals the `pre-push` hook:

```json
{
  "pre-commit": "pnpm pretty-quick --staged",
  "pre-push": "if [ -n \"$(git status --porcelain)\" ]; then ... exit 1; fi && pnpm run generate-search-index && pnpm run build && node scripts/log-preview-url.js"
}
```

The `pre-push` hook runs a **complete `astro build`** before every push. Netlify then runs another complete `astro build` when the push arrives. Every push triggers two full builds — one on the developer's machine (2–5 minutes per the log message in `log-preview-url.js`), then one on Netlify (another 2–5 minutes). The developer is paying the full build cost twice, gaining only local validation that could be done faster with targeted checks.

---

### 12. Pre-push hook runs a full build — duplicates Netlify entirely

**File:** `.simple-git-hooks.json`

**Current flow:**

```
git push
  → pre-push: astro build (~3 min local)
  → push succeeds
  → Netlify: astro build (~3 min CI)
Total developer-visible cost: ~6 min per push
```

The local build adds ~3 minutes of mandatory waiting to every push with essentially no benefit beyond what Netlify already provides. The `generate-search-index` script only logs test output to stdout — it produces no committed artifacts. The `log-preview-url.js` script only prints a URL; it doesn't need a build to complete first.

**What the local build actually validates:**

- TypeScript compilation (Astro surfaces TS errors during build)
- Broken internal links (via `starlightLinksValidator`)
- MDX rendering errors

All three can be checked faster with targeted commands that don't build the entire site.

**Fix:** Replace the full build with targeted validation:

```json
{
  "pre-commit": "pnpm pretty-quick --staged",
  "pre-push": "pnpm astro check && node scripts/agent-markdown-audit.js --strict && node scripts/log-preview-url.js"
}
```

- `pnpm astro check` — TypeScript + Astro validation, no full build, runs in seconds
- `node scripts/agent-markdown-audit.js --strict` — scans docs for component coverage issues, exits 1 on problems
- `node scripts/log-preview-url.js` — unchanged

Links validation (`starlightLinksValidator`) is removed from the local pre-push check here, but addressed separately in issue #13.

**Priority:** Critical
**Risk:** Medium — removing the full local build means some build errors surface in Netlify instead of locally. Mitigation: add `astro check` (which catches most real errors) and a GitHub Actions workflow for the rest (see issue #13).
**Impact:** Build duration — saves 2–5 minutes per push on the developer's machine; no change to Netlify build time

---

### 13. No GitHub Actions CI — the pre-push hook is the only automated check

**Files:** `.github/` (contains only `CODEOWNERS`, no workflows)

There are zero GitHub Actions workflows. All automated quality checks rely on the pre-push hook, which:

- Can be skipped with `git push --no-verify`
- Does not run in web-based workflows (GitHub UI edits, Dependabot, etc.)
- Produces no visible CI status on pull requests

This means Netlify deploy previews are the only feedback mechanism visible in GitHub PRs. A broken build shows up as a failed Netlify deploy, not a failed CI check — and only after the full 3-minute Netlify build.

**Fix:** Add `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: ['**']
  pull_request:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm astro check
      - run: pnpm run format:check
      - run: node scripts/agent-markdown-audit.js --strict
```

This replaces the pre-push hook's role with a proper CI check that:

- Runs on every push and PR
- Cannot be bypassed
- Shows a visible status check on the PR
- Keeps the pre-push hook lightweight (just formatting)

**Priority:** High
**Risk:** Low — additive change; no existing behavior removed
**Impact:** Build quality — errors surface as PR checks rather than Netlify deploy failures; `--no-verify` bypasses no longer silently succeed

---

### 14. D2 generation: already skipped on Netlify, no enforcement when `.d2` files are added

**File:** `astro.config.mjs`, line 298

```js
d2({
  skipGeneration: !!process.env['NETLIFY'],
  ...
})
```

**Premise correction:** The assumption that D2 images are generated during Netlify builds is incorrect. `skipGeneration: true` in all Netlify environments means D2 SVGs must be pre-generated locally and committed. There are also currently zero `.d2` files in the repository.

**The real risk:** When `.d2` files are eventually added, there is no enforcement that SVGs are regenerated before commit. A developer could modify a `.d2` file, forget to regenerate, and commit stale SVGs. Netlify would silently serve the old images.

**Fix:** Add a pre-commit hook step that regenerates D2 SVGs when `.d2` files are staged:

```json
{
  "pre-commit": "pnpm pretty-quick --staged && node scripts/check-d2-fresh.js"
}
```

Where `check-d2-fresh.js` checks whether any staged `.d2` files have SVG counterparts that are older than the source. Alternatively, add a GitHub Actions step:

```yaml
- name: Check D2 diagrams are up to date
  run: |
    if git diff --name-only HEAD | grep -q '\.d2$'; then
      pnpm astro build --d2-only && git diff --exit-code
    fi
```

**Priority:** Medium (low urgency while no `.d2` files exist; should be set up before the first `.d2` file is committed)
**Risk:** Low — purely additive
**Impact:** Build quality — prevents stale diagrams from silently shipping

---

### 15. `reorder-swagger` not in any automated pipeline

**File:** `package.json` script `reorder-swagger`

```json
"reorder-swagger": "node scripts/reorder-swagger.js public/api/scalekit.scalar.json"
```

The OpenAPI spec in `public/api/` is the source for the API reference page. `reorder-swagger.js` normalizes the spec's ordering. Per `CLAUDE.md`, the canonical spec comes from the `scalekit-inc/scalekit` repo, so spec updates arrive via manual file copy. There is no automated step to run `reorder-swagger` after a spec update.

If someone updates `public/api/scalekit.scalar.json` without running the reorder script:

- The API reference may render with incorrect section ordering
- `search-index-apis.js` (which runs in pre-push) may produce different URL fragments

**Fix:** Add `reorder-swagger` to a pre-commit hook that fires when `public/api/*.json` is staged:

```json
{
  "pre-commit": "pnpm pretty-quick --staged && node scripts/check-api-spec.js"
}
```

Where `check-api-spec.js` runs reorder and checks if the file changed (`git diff --exit-code public/api/`), failing the commit if the spec was not pre-ordered.

Alternatively, make the script idempotent and auto-stage the result:

```json
{
  "pre-commit": "pnpm pretty-quick --staged && node scripts/reorder-swagger.js public/api/scalekit.scalar.json && git add public/api/scalekit.scalar.json"
}
```

**Priority:** Medium
**Risk:** Low — additive to commit flow; auto-staging is the safest approach since it never blocks a commit
**Impact:** Build quality — prevents spec ordering drift between local state and what Netlify builds

---

### 16. `astro check` not in any pipeline

**File:** none — this step is entirely absent

`astro check` validates TypeScript types and Astro component props across the entire project. It is faster than a full build and catches a class of errors (wrong prop types, missing imports, broken frontmatter types) that `astro build` may or may not surface depending on severity.

Currently, TypeScript errors are caught only if they happen to break the full build. Silent type errors that don't prevent compilation go undetected until a developer happens to run `astro check` manually.

**Fix:** Add to the GitHub Actions workflow (from issue #13) and to the pre-push hook replacement (from issue #12). No separate action needed — this is already included in both of those fixes.

**Priority:** High — but resolved as a side effect of implementing fixes #12 and #13
**Risk:** Low — read-only check; cannot change build output
**Impact:** Build quality — catches type errors before they reach Netlify

---

### 17. OG image generation runs WASM at build time; could be pre-generated

**File:** `astro.config.mjs` (canvaskit-wasm integration), `package.json` (canvaskit-wasm dependency)

`astro-og-canvas` uses `canvaskit-wasm` to generate Open Graph images at build time. The `copy-canvaskit-wasm` integration in `astro.config.mjs` exists specifically to work around a packaging issue with the WASM binary in the Netlify SSR bundle. The WASM execution is memory-intensive, which is part of why `NODE_OPTIONS=--max_old_space_size=6144` is set in `netlify.toml`.

**Possible shift-left:** Pre-generate OG images for pages whose frontmatter (`title`, `description`) has not changed, commit them as static assets, and skip WASM execution for those pages. Only regenerate images for pages with changed frontmatter.

**Why this is complex:**

- `astro-og-canvas` does not currently support partial regeneration
- Committed OG images would be binary assets tracked in git (~50–200KB each × number of pages)
- Any design change to the OG template would require regenerating all images
- The canvaskit-wasm packaging fix would still be needed for the SSR function at runtime

**Verdict:** The ROI is low given the complexity. The packaging workaround already handles the main correctness risk. Only revisit if the WASM execution becomes a dominant build-time cost or if build memory OOM issues increase.

**Priority:** Low
**Risk:** Medium — binary files in git, template change invalidates all cached images
**Impact:** Build duration — moderate reduction if OG image count is high; memory pressure reduction during Rollup phase

---

## Prioritization matrix

### Do first — safe, immediate, no testing required

| #   | Action                                                | Effort  |
| --- | ----------------------------------------------------- | ------- |
| 1   | Remove `agent-markdown-audit.js` from default `build` | 1 line  |
| 7   | Fix wrong `node_bundler` comment                      | 2 lines |
| 8   | Remove redundant `included_files`                     | 1 line  |
| 9   | Add `/_astro/*` immutable cache header                | 4 lines |
| 4   | Fix stale `output: 'server'` comment                  | 2 lines |

### Do next — high value, verify before merging

| #   | Action                                         | Effort                | Verification needed                                                  |
| --- | ---------------------------------------------- | --------------------- | -------------------------------------------------------------------- |
| 12  | Replace pre-push full build with `astro check` | 10 min                | Confirm `astro check` catches the errors the full build was catching |
| 13  | Add GitHub Actions CI workflow                 | 30 min                | Monitor first CI run; confirm checks pass on clean branch            |
| 2   | Parallelize post-build scripts                 | 5 min                 | None — scripts are independent                                       |
| 3   | Async FS in `generate-llms-index.js`           | 30 min                | Diff `dist/llms.txt` before/after to confirm identical output        |
| 5   | Raise `maxParallelFileOps` to 8                | 1 line                | Watch one Netlify build for OOM; revert if needed                    |
| 10  | Re-enable links validator on deploy previews   | 5 lines               | Monitor first preview build for OOM                                  |
| 16  | Add `astro check` to pipeline                  | Resolved by #12 + #13 | —                                                                    |

### Do before next `.d2` or spec update

| #   | Action                                          | Effort |
| --- | ----------------------------------------------- | ------ |
| 14  | D2 staleness check in pre-commit                | 1 hour |
| 15  | Auto-run `reorder-swagger` on spec file changes | 30 min |

### Do later

| #   | Action                                   | Effort      | Blocker                               |
| --- | ---------------------------------------- | ----------- | ------------------------------------- |
| 6   | Audit and reduce `chunkSizeWarningLimit` | Audit first | Needs chunk size data from a build    |
| 11  | Add grouping comment for LLM cache rules | 1 line      | —                                     |
| 17  | OG image pre-generation                  | 1–2 days    | Only if build memory becomes critical |

---

## Risk register

| #   | Change                      | Risk level | Risk description                                                 | Mitigation                                                            |
| --- | --------------------------- | ---------- | ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| 1   | Remove audit from build     | Low        | Audit no longer runs automatically                               | Move to CI workflow (#13)                                             |
| 2   | Parallelize scripts         | Low        | Race condition if scripts share output in future                 | Scripts are read-only relative to each other                          |
| 3   | Async FS rewrite            | Low        | Logic regression in frontmatter parsing                          | Diff `dist/llms.txt` before/after; output must be identical           |
| 4   | Comment fix                 | None       | —                                                                | —                                                                     |
| 5   | Raise `maxParallelFileOps`  | Medium     | Higher peak memory could OOM on Netlify                          | Test on one branch deploy; rollback is 1 line                         |
| 6   | Reduce chunk size limit     | Low        | Adds build warnings (not errors)                                 | Fix warnings by splitting chunks explicitly before removing the limit |
| 7   | Comment fix                 | None       | —                                                                | —                                                                     |
| 8   | Remove `included_files`     | Low        | May expose a missing runtime file dependency                     | Run `netlify functions:build` locally to verify nothing breaks        |
| 9   | Add immutable cache         | Low        | Stale assets if filenames stop being content-hashed              | Astro content-hashes by default; verify if Astro config changes       |
| 10  | Links validator in previews | Low        | Preview builds may run longer or OOM                             | Monitor one deploy-preview; revert if OOM                             |
| 11  | Add comment                 | None       | —                                                                | —                                                                     |
| 12  | Replace pre-push full build | Medium     | Build errors now surface in Netlify instead of locally           | Mitigated by `astro check` (fast) + GitHub Actions CI (#13)           |
| 13  | Add GitHub Actions CI       | Low        | CI may fail on clean branches if check is too strict             | Start permissive; tighten checks after baseline passes                |
| 14  | D2 staleness check          | Low        | Hook could block commits if D2 tool not installed                | Make hook conditional on D2 tool presence                             |
| 15  | Auto-run reorder-swagger    | Low        | Auto-staging a file in pre-commit can confuse `git add -p` users | Document the behavior; make it opt-out                                |
| 16  | `astro check` in pipeline   | Low        | Read-only; no output impact                                      | None                                                                  |
| 17  | OG image pre-generation     | Medium     | Binary files in git; template changes invalidate all             | Only implement if memory/build cost justifies it                      |

---

## Build impact summary

| Change                              | Developer push time           | Netlify build duration           | Build quality                    | Runtime perf                       |
| ----------------------------------- | ----------------------------- | -------------------------------- | -------------------------------- | ---------------------------------- |
| #1 Remove audit from build          | —                             | ↓ saves ~5–15s                   | —                                | —                                  |
| #2 Parallelize post-build scripts   | —                             | ↓ saves shorter script's time    | —                                | —                                  |
| #3 Async FS                         | —                             | ↓ saves ~2–8s on large doc trees | —                                | —                                  |
| #4 Comment fix                      | —                             | —                                | ↑ reduces config confusion       | —                                  |
| #5 maxParallelFileOps 8             | —                             | ↓ saves Rollup emit time         | —                                | —                                  |
| #6 Chunk size audit                 | —                             | —                                | ↑ surfaces hidden bundle issues  | ↑ may prompt chunk splits          |
| #7 Comment fix                      | —                             | —                                | ↑ correct ops knowledge          | —                                  |
| #8 Remove included_files            | —                             | —                                | ↑ removes false config signal    | —                                  |
| #9 Immutable cache headers          | —                             | —                                | —                                | ↑ eliminates redundant CDN fetches |
| #10 Links validator in previews     | —                             | ↑ slight increase on previews    | ↑ catches broken links pre-merge | —                                  |
| #11 Comment                         | —                             | —                                | ↑ maintainability                | —                                  |
| **#12 Replace pre-push full build** | **↓↓ saves 2–5 min per push** | —                                | ↑ errors surface via CI          | —                                  |
| **#13 Add GitHub Actions CI**       | —                             | —                                | **↑↑ real CI coverage**          | —                                  |
| #14 D2 staleness check              | ↑ small increase              | —                                | ↑ prevents stale diagrams        | —                                  |
| #15 Auto-run reorder-swagger        | ↑ small increase              | —                                | ↑ spec always consistent         | —                                  |
| #16 `astro check` in pipeline       | —                             | —                                | ↑ (resolved by #12 + #13)        | —                                  |
| #17 OG image pre-generation         | ↑ increases                   | ↓ reduces WASM execution         | —                                | —                                  |
