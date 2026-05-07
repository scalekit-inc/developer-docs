# Scheduled Netlify Deploy

This project uses a GitHub Actions workflow to automatically deploy the Netlify site when `main` has undeployed commits. The workflow avoids unnecessary builds by comparing SHAs before triggering.

---

## How it works

**File:** `.github/workflows/scheduled-deploy.yml`

The workflow runs daily at 4:00 PM IST (cron `30 10 * * *` UTC) and can also be triggered manually via `workflow_dispatch`.

1. **Fetch last deployed commit** — Queries the Netlify API for the most recent `ready` deploy on the `main` branch and extracts its `commit_ref`.
2. **Fetch current HEAD** — Queries the GitHub API for the current SHA of `refs/heads/main`.
3. **Compare** — If the SHAs differ, POSTs to the Netlify build hook to trigger a deploy. If they match, the job logs "up to date" and exits.

```
Netlify API (last ready deploy SHA)  ─┐
                                      ├─ differ? → POST build hook → deploy
GitHub API  (current main HEAD SHA)  ─┘
                                      └─ match?  → skip
```

## Required secrets

These must be configured in the repository's **Settings → Secrets and variables → Actions**:

| Secret | Purpose |
|--------|---------|
| `NETLIFY_BUILD_HOOK` | Netlify build hook URL (Settings → Build hooks) |
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token (User settings → Applications) |
| `NETLIFY_SITE_ID` | Netlify site ID (Site settings → General → Site ID) |

`GITHUB_TOKEN` is provided automatically by GitHub Actions.

## Error handling

The workflow uses `curl -fsS` and `set -euo pipefail` so that:

- HTTP errors from Netlify or GitHub APIs fail the step immediately instead of silently returning garbage.
- If `jq` extracts an empty or `"null"` SHA (e.g., no ready deploys exist yet), the step errors with a clear `::error::` annotation and exits non-zero.

This prevents false deploy/skip decisions from silent API failures.

## Debugging

**Workflow never runs?** Check that the cron schedule is correct. GitHub Actions cron uses UTC — `30 10 * * *` is 10:30 UTC (4:00 PM IST). Note that GitHub may delay scheduled workflows by minutes during high-load periods.

**Step fails with "Unable to resolve last deployed commit"?** The Netlify API returned no `ready` deploys for the `main` branch. This can happen on a brand-new site or if all recent deploys failed. Verify in the Netlify dashboard that at least one successful deploy exists for `main`.

**Step fails with "Unable to resolve GitHub main HEAD SHA"?** The `GITHUB_TOKEN` may lack read permissions, or the repository reference is wrong. Check the Actions permissions in repo settings.

**Deploys trigger but the site doesn't update?** The build hook URL may be stale. Regenerate it in Netlify (Site settings → Build hooks) and update the `NETLIFY_BUILD_HOOK` secret.

**Manual trigger:** Use `workflow_dispatch` from the Actions tab to test without waiting for the cron schedule.