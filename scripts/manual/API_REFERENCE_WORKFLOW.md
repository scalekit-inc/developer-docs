# Scalekit API reference pipeline

This guide explains **how the API reference is wired together** in the docs repo and the exact steps to update or extend it.

---

## 1. The moving parts

| File / Component                      | Responsibility                                                                                                                                                                                       |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/api/scalekit.scalar.json`     | OpenAPI definition used by the Scalar viewer and by `search-index-apis.js`.                                                                                                                          |
| `scripts/search-index-apis.js`        | Parses OpenAPI → **search records** with deep-link URLs. Run manually via `pnpm run generate-search-index` for validation; `extractApiRecords` is also used at build time by `ApiSearchIndex.astro`. |
| `src/components/ApiSearchIndex.astro` | Renders a **hidden** list of every operation in the DOM so **DocSearch** (Algolia) and other crawlers can index titles, descriptions, and `#tag/…` links.                                            |
| `src/components/ScalarReference.vue`  | Embeds the interactive `@scalar/api-reference` viewer.                                                                                                                                               |
| `src/pages/apis.astro`                | Hosts the Scalar viewer and the hidden `ApiSearchIndex` output.                                                                                                                                      |

Diagram:

```
OpenAPI → search-index-apis.js ──▶ records[] ──▶ ApiSearchIndex.astro (hidden HTML)
                │
                └──▶ ScalarReference.vue (OpenAPI URL prop)
```

---

## 2. How the pieces talk to each other

1. **Build / dev**
   1. `ApiSearchIndex.astro` imports `extractApiRecords` from the script and runs at build time.
   2. The script reads `scalekit.scalar.json` and generates records containing:
      - `title`, `description`
      - `url` with deep link `#tag/{tag}/{method}{path}` (Scalar anchor scheme)
      - `parameters` list (extra keywords in the hidden markup)
   3. Astro outputs a hidden `<div class="api-search-index">` with one block per endpoint.
2. **Site search**
   - Search uses **Algolia DocSearch** (`@astrojs/starlight-docsearch`), not Pagefind. Starlight is configured with `pagefind: false`.
   - The hidden markup gives crawlers and the search index **text and canonical `/apis#…` links** for each operation.
3. **Runtime (browser)**
   - `ScalarReference.vue` loads the same OpenAPI file and renders the interactive UI.
   - When someone opens a result that points at `/apis#tag/…`, the fragment scrolls Scalar to that operation.

---

## 3. Typical maintenance tasks

### A. Adding / changing endpoints

1. Update `public/api/scalekit.scalar.json` (or replace it from your OpenAPI generator).
2. (Optional) Run `pnpm run reorder-swagger` to keep sections ordered (see `scripts/reorder-swagger.js`).
3. Restart `pnpm dev` or run `pnpm build` so `ApiSearchIndex` picks up changes.

### B. Running `generate-search-index` manually

```bash
pnpm run generate-search-index
```

This runs the same `extractApiRecords` logic and prints URL checks in the terminal. It does **not** write files or update Algolia; use it after OpenAPI or `generateUrlFragment()` changes to confirm fragments still match Scalar.

### C. Styling / layout tweaks

| Want to change…           | Edit…                                                  |
| ------------------------- | ------------------------------------------------------ |
| Hidden search list markup | `ApiSearchIndex.astro`                                 |
| Scalar header / theme     | `ScalarReference.vue` + `src/styles/api-reference.css` |
| Overall page container    | `src/pages/apis.astro`                                 |

### D. Updating the deep-link format

If Scalar changes its anchor scheme:

1. Update `generateUrlFragment()` in `scripts/search-index-apis.js`.
2. Align `<AnchorHeading id>` logic in `ApiSearchIndex.astro` so heading `id` values match the fragment.
3. Run `pnpm run generate-search-index` and fix any mismatches, then `pnpm build` and verify `/apis` anchors (and DocSearch after crawl, if applicable).

---

## 4. Common pitfalls & fixes

| Symptom                                                       | Likely Cause                                         | Fix                                                               |
| ------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------- |
| Search result links to `#list-users` instead of full `#tag/…` | Heading IDs do not match the new fragment format.    | Ensure `id={record.url.split('#')[1]}` in `ApiSearchIndex.astro`. |
| New endpoints not searchable                                  | Crawler has not reindexed yet, or markup out of date | Deploy, wait for DocSearch crawl, or trigger re-crawl in Algolia. |
| Linter shows `$ref` unresolved in OpenAPI                     | The referenced definition is missing                 | Add the missing schema or remove the `$ref`.                      |

---

## 5. Handy scripts

| Command                          | What it does                                                                     |
| -------------------------------- | -------------------------------------------------------------------------------- |
| `pnpm run generate-search-index` | Runs `scripts/search-index-apis.js` — URL / fragment validation in the terminal. |
| `pnpm run reorder-swagger`       | Applies logical ordering to OpenAPI paths for readability.                       |
| `pnpm run build`                 | Full production build (`astro build` + post-build steps).                        |
| `pnpm run preview`               | Serve the built site locally.                                                    |

---

## 6. How search relates to this page

**DocSearch** indexes content from the live site; it does not read the OpenAPI file directly. The hidden block on `/apis` exists so each operation has **discoverable text and a stable URL** in the HTML Algolia indexes.

Headings and links in `ApiSearchIndex.astro` are aligned with Scalar’s `#tag/…` fragments so results scroll the viewer to the right operation after navigation.

---

Happy documenting!
