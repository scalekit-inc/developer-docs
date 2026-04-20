# Agent connectors sync script

## What it does

`scripts/sync-agent-connectors.js` fetches all providers and tools from the Scalekit production API and regenerates every MDX file under `src/content/docs/agentkit/connectors/`. It also keeps `src/components/templates/agent-connectors/index.ts` in sync with whatever setup templates exist on disk.

Run it whenever connector data changes on the API side (new providers, updated tool schemas, etc.).

```bash
pnpm run sync-agent-connectors
```

## Required env vars

Set these in `.env` at the project root (see `.env.template`):

| Variable                        | Description                                         |
| ------------------------------- | --------------------------------------------------- |
| `PROD_SCALEKIT_CLIENT_ID`       | OAuth client ID (production environment)            |
| `PROD_SCALEKIT_CLIENT_SECRET`   | OAuth client secret (production environment)        |
| `PROD_SCALEKIT_ENVIRONMENT_URL` | API host URL (e.g. `https://your-env.scalekit.com`) |

## What gets generated

- **`src/content/docs/agentkit/connectors/<provider>.mdx`** — one file per provider, containing frontmatter, auth badges, setup section (if a template exists), and a full tool reference table.
- **`src/components/templates/agent-connectors/index.ts`** — re-exports every `SetupXSection` component from the templates in that directory. Regenerated on every run from the actual files on disk.

Orphaned `.mdx` docs (providers no longer returned by the API) are automatically deleted.

## Adding a new connector setup guide

1. Create `src/components/templates/agent-connectors/_setup-<slug>.mdx` following the naming convention (e.g. `_setup-fathom.mdx`).
2. Run `pnpm run sync-agent-connectors`.

The script will:

- Discover the new template file automatically
- Add its export to `index.ts`
- Inject `<SetupFathomSection />` into the generated provider doc

No manual edits to `index.ts` or the script are needed.

## Slug → component name mapping

The script derives the component name deterministically from the template filename:

| Template file                | Component name               |
| ---------------------------- | ---------------------------- |
| `_setup-google-ads.mdx`      | `SetupGoogleAdsSection`      |
| `_setup-googlecalendar.mdx`  | `SetupGooglecalendarSection` |
| `_setup-microsoft-excel.mdx` | `SetupMicrosoftExcelSection` |

Provider API slugs use underscores (e.g. `google_ads`). The lookup tries two forms:

1. `google_ads` → `google-ads` (primary, covers most cases)
2. `google_calendar` → `googlecalendar` (fallback, for the one exception)
