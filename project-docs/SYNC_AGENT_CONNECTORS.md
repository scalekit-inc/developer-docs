# Agent connector sync guide

## What this workflow does

Use this workflow when you need to refresh generated Agent connector docs from the latest provider data in Scalekit.

`pnpm run sync-agent-connectors` reads production sync credentials from your local `.env`, fetches the latest provider and tool metadata from the environment in `PROD_SCALEKIT_ENVIRONMENT_URL`, and regenerates the generated connector assets in this repo.

The sync script updates these generated outputs:

- `src/content/docs/agentkit/connectors/<provider>.mdx`
- `src/data/agent-connectors/<provider>.ts`
- `src/data/agent-connectors/catalog.ts`
- `src/components/templates/agent-connectors/index.ts`

The script also removes orphaned generated connector `.mdx` files when a provider is no longer returned by the API.

## Before you start

Make sure these prerequisites are true before you run the sync:

- The connector is already available in the configured production Scalekit environment. If it is not published there yet, the sync will not generate a page for it.
- Your local `.env` contains the production sync credentials. Copy the keys from `.env.example` if you have not set them up yet.

Required env vars:

| Variable                        | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| `PROD_SCALEKIT_CLIENT_ID`       | OAuth client ID for the production sync environment          |
| `PROD_SCALEKIT_CLIENT_SECRET`   | OAuth client secret for the production sync environment      |
| `PROD_SCALEKIT_ENVIRONMENT_URL` | API host URL for the environment the script should read from |

## What you edit by hand

You should only hand-edit the template files that add authored content on top of generated connector metadata.

Supported template families in the current sync flow:

- `_setup-<slug>.mdx` adds the optional **Set up the connector** section
- `_usage-<slug>.mdx` adds the optional **Code examples** section

Examples:

- `src/components/templates/agent-connectors/_setup-github.mdx`
- `src/components/templates/agent-connectors/_usage-github.mdx`

The sync script does not infer setup instructions from API metadata. If a matching `_setup-<slug>.mdx` file does not exist, the generated connector page will still include the latest tool information, but it will not include setup instructions.

Do not hand-maintain these generated files:

- `src/content/docs/agentkit/connectors/<provider>.mdx`
- `src/data/agent-connectors/<provider>.ts`
- `src/data/agent-connectors/catalog.ts`
- `src/components/templates/agent-connectors/index.ts`

## Add or update a setup template

Create or update a setup template in `src/components/templates/agent-connectors/` using the `_setup-<slug>.mdx` naming pattern.

Example:

1. Create `src/components/templates/agent-connectors/_setup-fathom.mdx`.
2. Add the setup steps you want maintainers and users to see on the generated Fathom connector page.
3. Run the sync script.

The script will:

- discover `_setup-fathom.mdx`
- regenerate `src/components/templates/agent-connectors/index.ts`
- inject `<SetupFathomSection />` into the generated `src/content/docs/agentkit/connectors/fathom.mdx` page

## Run the sync

Run:

```bash
pnpm run sync-agent-connectors
```

The script will:

- authenticate with the configured environment using the `PROD_*` credentials from your local `.env`
- fetch the latest provider metadata
- fetch the latest tool metadata
- regenerate connector MDX pages
- regenerate connector tool data files
- rewrite the generated template export index
- remove orphaned generated connector pages that are no longer returned by the API

## Review the git diff

Review `git diff` before you commit anything.

These diffs are usually expected:

- new connectors published to production
- new tools added to existing connectors
- metadata refreshes on existing connectors
- updates caused by a new `_setup-*` or `_usage-*` template you added

These diffs should make you stop and look carefully:

- a connector page disappears
- a connector loses tools
- many generated pages change in ways you did not expect
- large removals or other drastic generated diffs

If something is going away, or the diff looks much broader than expected, pause and confirm with the internal team before you commit. Production changes may be valid, but removals should not be merged blindly.

## Verify the generated output

After the sync finishes, verify these points:

- the expected generated connector page exists under `src/content/docs/agentkit/connectors/`
- the expected generated tool data file exists under `src/data/agent-connectors/`
- the setup section appears only for connectors with a matching `_setup-*` template
- the usage section appears only for connectors with a matching `_usage-*` template
- the generated page reflects the latest tool information from production

## Slug to component name mapping

The script derives component names from the template filename.

| Template file                | Component name               |
| ---------------------------- | ---------------------------- |
| `_setup-google-ads.mdx`      | `SetupGoogleAdsSection`      |
| `_setup-googlecalendar.mdx`  | `SetupGooglecalendarSection` |
| `_setup-microsoft-excel.mdx` | `SetupMicrosoftExcelSection` |
| `_usage-google_ads.mdx`      | `UsageGoogleAdsSection`      |

Provider API slugs often use underscores. The lookup currently tries these forms:

1. Exact slug match
2. Underscore to hyphen fallback, such as `google_ads` -> `google-ads`
3. Underscore removal fallback, such as `google_calendar` -> `googlecalendar`

## Troubleshooting missing setup content

If the generated connector page is missing setup instructions:

- confirm the connector exists in the configured production environment
- confirm the generated provider slug matches your template filename
- confirm the template file uses the `_setup-<slug>.mdx` naming pattern
- rerun `pnpm run sync-agent-connectors` and review the warnings for missing setup templates

If the connector page is generated but the setup section is missing, the most common cause is a slug mismatch between the provider identifier and the `_setup-*` filename.
