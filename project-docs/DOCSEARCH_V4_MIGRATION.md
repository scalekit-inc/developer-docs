# DocSearch v4 Migration Guide

This document explains the temporary setup for using DocSearch v4 before the official release.

## Current Setup

We are using DocSearch v4 from a fork of the Starlight project:

- **Source**: `https://github.com/dylantientcheu/starlight` (PR #3346)
- **Local clone**: `~/starlight-docsearch-v4/packages/docsearch`
- **Override location**: `package.json` → `pnpm.overrides`

## How to Update to Official Release

When `@astrojs/starlight-docsearch` officially releases DocSearch v4 support:

### Step 1: Remove the file: override

In `package.json`, remove the `pnpm.overrides` section:

```diff
{
  "dependencies": {
-   "@astrojs/starlight-docsearch": "file:~/starlight-docsearch-v4/packages/docsearch",
+   "@astrojs/starlight-docsearch": "^0.7.0",  // or whatever version is released
  },
- "pnpm": {
-   "overrides": {
-     "@astrojs/starlight-docsearch": "file:~/starlight-docsearch-v4/packages/docsearch"
-   }
- }
}
```

### Step 2: Install the official version

```bash
pnpm install
```

### Step 3: Clean up (optional)

Remove the local clone:

```bash
rm -rf ~/starlight-docsearch-v4
```

## How to Update the Fork

To pull latest changes from the fork:

```bash
cd ~/starlight-docsearch-v4
git pull origin main
```

Then reinstall:

```bash
cd /Users/saif/Projects/astro
pnpm install
```

## Tracking

- **Upstream PR**: https://github.com/withastro/starlight/pull/3346
- **Fork**: https://github.com/dylantientcheu/starlight
- **DocSearch v4 Docs**: https://docsearch.algolia.com/
- **Ask AI Docs**: https://docsearch.algolia.com/docs/v4/askai

## Ask AI Configuration

To enable Ask AI (optional), add the `askAi` option to your Starlight DocSearch plugin in `astro.config.mjs`:

```ts
starlightDocSearch({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'YOUR_INDEX_NAME',
  askAi: 'YOUR_ASSISTANT_ID',  // or as an object with overrides
}),
```

See [Ask AI documentation](https://docsearch.algolia.com/docs/v4/askai) for details on getting an assistant ID.
