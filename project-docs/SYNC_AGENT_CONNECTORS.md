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
- `_quickstart-<slug>.mdx` or `_quickstart-<slug>.astro` adds a connector-specific **Authorize and make your first call** step inside the quickstart `<Steps>` block
- `_section-<hook>-<slug>-<topic>.mdx` adds an optional custom section at a supported generated-page hook

Examples:

- `src/components/templates/agent-connectors/_setup-github.mdx`
- `src/components/templates/agent-connectors/_quickstart-hubspot.mdx`
- `src/components/templates/agent-connectors/_section-after-setup-github-common-workflows.mdx`
- `src/components/templates/agent-connectors/_section-after-tool-list-salesforce-metadata-api-soap.mdx`

The sync script does not infer setup instructions from API metadata. If a matching `_setup-<slug>.mdx` file does not exist, the generated connector page will still include the latest tool information, but it will not include setup instructions.

The `_usage-<slug>.mdx` template family is no longer supported. Common workflow content now uses the `_section-after-setup-<slug>-common-workflows.mdx` naming pattern instead.

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

## Add a connector-specific quickstart

By default, the sync script generates a generic quickstart step ("Authorize and make your first call") for each auth type using the `_quickstart-generic-oauth.astro` and `_quickstart-generic-apikey.astro` components. These accept the connector slug, a tool name, and the provider display name as props.

To add a connector-specific quickstart with a handcrafted code example, create a file using the `_quickstart-<slug>.mdx` naming pattern:

1. Create `src/components/templates/agent-connectors/_quickstart-hubspot.mdx`.
2. Add your quickstart code as a standard `<Tabs syncKey="tech-stack">` block. Do not include client init boilerplate — the quickstart is a single code example users can run after setting credentials.
3. Run the sync script.

The script will use the connector-specific quickstart instead of the generic component. The `_quickstart-<slug>.mdx` file takes precedence over the generic fallback.

You can also use an `.astro` file (`_quickstart-<slug>.astro`) when the component needs to accept props or render dynamic content.

## Add a common workflows section

Common workflow content goes in a `_section-after-setup-<slug>-common-workflows.mdx` file. The `after-setup` hook places it immediately after the **Set up the connector** section and before the **Tool list**.

1. Create `src/components/templates/agent-connectors/_section-after-setup-github-common-workflows.mdx`.
2. Add `export const sectionTitle = 'Common workflows'` as the first line.
3. Add workflow content below. Each workflow should use a `<details><summary>Name</summary>…</details>` block with `<Tabs syncKey="tech-stack">` tabs inside.
4. Run the sync script.

Each workflow code block should show both the proxy API call and the equivalent `executeTool` call in the same block:

````mdx
<details>
<summary>List contacts</summary>

<Tabs syncKey="tech-stack">
  <TabItem label="Node.js">
    ```typescript
    // --- Proxy API (direct HTTP) ---
    const proxyResult = await actions.request({
      connectionName: 'hubspot',
      identifier: 'user_123',
      path: '/crm/v3/contacts',
      method: 'GET',
    });

    // --- executeTool (typed, validated) ---
    const result = await actions.executeTool({
      connector: 'hubspot',
      identifier: 'user_123',
      toolName: 'hubspot_contacts_list',
      toolInput: { limit: 10 },
    });
    ```

  </TabItem>
  <TabItem label="Python">
    ```python
    # --- Proxy API (direct HTTP) ---
    proxy_result = actions.request(
        connection_name='hubspot',
        identifier='user_123',
        path='/crm/v3/contacts',
        method='GET',
    )

    # --- execute_tool (typed, validated) ---
    result = actions.execute_tool(
        connection_name='hubspot',
        identifier='user_123',
        tool_name='hubspot_contacts_list',
        tool_input={'limit': 10},
    )
    ```

  </TabItem>
</Tabs>

</details>
````

Note: `actions.request()` uses `connectionName:` (Node.js) / `connection_name=` (Python). `actions.executeTool()` uses `connector:` / `connection_name=`.

## Add a troubleshooting section

To add a troubleshooting section to a connector page, create a `_section-after-tool-list-<slug>-troubleshooting.mdx` file:

1. Create `src/components/templates/agent-connectors/_section-after-tool-list-hubspot-troubleshooting.mdx`.
2. Add `export const sectionTitle = 'Troubleshooting'` as the first line.
3. Add `<details>` blocks for each common error below. Do not include the `## Troubleshooting` heading — the script emits it from the exported title.
4. Run the sync script.

## Add a custom connector section

Create a custom section template when a generated connector page needs authored content that does not fit the patterns above.

Use this filename pattern:

```text
_section-<hook>-<slug>-<topic>.mdx
```

The `<slug>` must match the generated connector page filename stem. For example, use `salesforce` for `salesforce.mdx` and `google_ads` for `google_ads.mdx`.

Supported hooks:

| Hook                   | Placement                                                               |
| ---------------------- | ----------------------------------------------------------------------- |
| `after-authentication` | After the generated authentication note (before setup)                  |
| `after-setup`          | After the **Set up the connector** section — common workflows go here   |
| `after-usage`          | Backward-compatible hook; `after-setup` is preferred                    |
| `before-tool-list`     | Immediately before the **Tool list** section                            |
| `after-tool-list`      | Immediately after the **Tool list** section — troubleshooting goes here |

Example:

1. Create `src/components/templates/agent-connectors/_section-after-tool-list-salesforce-metadata-api-soap.mdx`.
2. Add `export const sectionTitle = 'Call the Metadata API through SOAP proxy'` at the top of the template.
3. Add the section body below the exported title. Do not include the same `##` heading in the template body.
4. Run the sync script.

The script will:

- discover the custom section template
- regenerate `src/components/templates/agent-connectors/index.ts`
- emit the exported section title as a real `##` heading in the generated connector page so Starlight can include it in the table of contents
- inject `<SectionAfterToolListSalesforceMetadataApiSoap />` into the generated Salesforce connector page after the tool list

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
- updates caused by a new `_setup-*`, `_quickstart-*`, or `_section-*` template you added

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
- the quickstart step uses the connector-specific `_quickstart-<slug>.mdx` when present, or the generic fallback otherwise
- the **Common workflows** section appears for connectors with a matching `_section-after-setup-*-common-workflows.mdx`
- custom sections appear at the hook declared in matching `_section-*` templates
- the generated page reflects the latest tool information from production

## Slug to component name mapping

The script derives component names from the template filename.

| Template file                                               | Component name                                  |
| ----------------------------------------------------------- | ----------------------------------------------- |
| `_setup-google-ads.mdx`                                     | `SetupGoogleAdsSection`                         |
| `_setup-googlecalendar.mdx`                                 | `SetupGooglecalendarSection`                    |
| `_quickstart-hubspot.mdx`                                   | `QuickstartHubspotSection`                      |
| `_quickstart-generic-oauth.astro`                           | `QuickstartGenericOauthSection`                 |
| `_section-after-setup-github-common-workflows.mdx`          | `SectionAfterSetupGithubCommonWorkflows`        |
| `_section-after-tool-list-salesforce-metadata-api-soap.mdx` | `SectionAfterToolListSalesforceMetadataApiSoap` |

Provider API slugs often use underscores. Setup and usage template lookup currently tries these forms:

1. Exact slug match
2. Underscore to hyphen fallback, such as `google_ads` -> `google-ads`
3. Underscore removal fallback, such as `google_calendar` -> `googlecalendar`

Custom section templates use the exact generated page filename stem for `<slug>`.

## Troubleshooting missing setup content

If the generated connector page is missing setup instructions:

- confirm the connector exists in the configured production environment
- confirm the generated provider slug matches your template filename
- confirm the template file uses the `_setup-<slug>.mdx` naming pattern
- rerun `pnpm run sync-agent-connectors` and review the warnings for missing setup templates

If the connector page is generated but the setup section is missing, the most common cause is a slug mismatch between the provider identifier and the `_setup-*` filename.

## Troubleshooting missing quickstart or common workflows content

If the connector page is missing the quickstart step or common workflows:

- confirm the `_quickstart-<slug>.mdx` or `_section-after-setup-<slug>-common-workflows.mdx` file exists in `src/components/templates/agent-connectors/`
- confirm the slug in the filename matches the generated page slug (check the warnings output from the sync script)
- confirm the `_section-after-setup-*-common-workflows.mdx` file exports `sectionTitle` as the first line: `export const sectionTitle = 'Common workflows'`
- rerun `pnpm run sync-agent-connectors` after adding or renaming template files — the script must regenerate `index.ts` to pick up the new exports
