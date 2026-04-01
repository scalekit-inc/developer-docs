# Scalekit API Reference Pipeline

This guide explains **how the API reference is wired together** in the docs repo and the exact steps to update or extend it.

---

## 1. The Moving Parts

| File / Component                      | Responsibility                                                                                                                                  |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/api/scalekit.swagger.json`    | Source-of-truth Swagger (OpenAPI 2) definition. Every endpoint lives here.                                                                      |
| `scripts/search-index-apis.js`        | Parses the Swagger file → creates **search records** → returns an array used by Pagefind. Run manually or via `pnpm run generate-search-index`. |
| `src/components/ApiSearchIndex.astro` | Hidden Astro component that renders the records from the script in HTML so Pagefind can crawl them.                                             |
| `src/components/ScalarReference.vue`  | Embeds the interactive <kbd>@scalar/api-reference</kbd> viewer so humans can read the docs.                                                     |
| `src/pages/apis.astro`                | Top-level page that hosts both the Scalar viewer **and** the hidden search index.                                                               |

Diagram:

```
Swagger → search-index-apis.js ──▶ records[] ──▶ ApiSearchIndex.astro (hidden HTML)
                │
                └──▶ ScalarReference.vue (Swagger URL prop)
```

---

## 2. How the Pieces Talk to Each Other

1. **Build / dev-server start**
   1. `ApiSearchIndex.astro` imports `extractApiRecords` from the script → executes it at build time.
   2. The script reads `scalekit.swagger.json` and generates records containing:
      - `title`, `description`
      - `url` with deep link `#tag/{tag}/{method}{path}`
      - `parameters` list (for extra search keywords)
   3. Astro outputs a hidden `<div data-pagefind-body>` containing one `<li>` per endpoint.
2. **Pagefind crawl**
   - Because the hidden div carries `data-pagefind-body`, Pagefind indexes its content + links.
   - Search results therefore point to the deep-link in `record.url`.
3. **Runtime (browser)**
   - `ScalarReference.vue` fetches the same Swagger file and renders the interactive UI.
   - When someone clicks a Pagefind result, the `#tag/…` fragment scrolls Scalar to that endpoint.

---

## 3. Typical Maintenance Tasks

### A. Adding / Changing Endpoints

1. Edit **only** `public/api/scalekit.swagger.json` (or replace it from the backend generator).
2. (Optional) Run `pnpm run reorder-swagger` to keep sections ordered (see `scripts/reorder-swagger.js`).
3. _Development:_ Just restart `pnpm dev` – Astro + Pagefind re-run automatically.
4. _CI / Production build:_ Nothing extra to do – `astro build` triggers everything.

### B. Regenerating the Search Index Manually

```bash
pnpm run generate-search-index
```

The script:

- Validates URL fragment generation (see console output).
- Does **not** write files – it’s executed by Astro at build time. Manual run is only for quick checks.

### C. Styling / Layout Tweaks

| Want to change…           | Edit…                                                  |
| ------------------------- | ------------------------------------------------------ |
| Hidden search list markup | `ApiSearchIndex.astro`                                 |
| Scalar header / theme     | `ScalarReference.vue` + `src/styles/api-reference.css` |
| Overall page container    | `src/pages/apis.astro`                                 |

### D. Updating the Deep-Link Format

If Scalar changes its anchor scheme:

1. Update `generateUrlFragment()` in `scripts/search-index-apis.js`.
2. (Maybe) update the `<AnchorHeading id>` logic in `ApiSearchIndex.astro` so the heading id matches.
3. Re-run a build and verify test cases printed by the script.

---

## 4. Common Pitfalls & Fixes

| Symptom                                                         | Likely Cause                                          | Fix                                                               |
| --------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------- |
| Pagefind result links to `#list-users` instead of full `#tag/…` | Your heading IDs don’t match the new fragment format. | Ensure `id={record.url.split('#')[1]}` in `ApiSearchIndex.astro`. |
| New endpoints not searchable                                    | Forgot to restart dev server / rebuild                | Stop & start `pnpm dev` **or** run `pnpm run build`.              |
| Linter shows `$ref` unresolved in Swagger                       | The referenced definition is missing                  | Add the missing schema or remove the `$ref`.                      |

---

## 5. Handy Scripts

| Command                          | What it does                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------- |
| `pnpm run generate-search-index` | Runs `scripts/search-index-apis.js` standalone – helpful for URL validation. |
| `pnpm run reorder-swagger`       | Applies logical ordering to Swagger paths for readability.                   |
| `pnpm run build`                 | Full static build (Astro, Pagefind, everything).                             |
| `pnpm run preview`               | Serve the built site locally.                                                |

---

Happy documenting! 🎉

## 6. How Search Works under the Hood

Pagefind is a **static-site search engine**. It doesn’t read the Swagger directly – it crawls the HTML that Astro outputs.

Step-by-step:

1. **Build time**
   1. `ApiSearchIndex.astro` renders a `<div data-pagefind-body>` that contains **every API endpoint** as list items.
   2. Each list item includes:
      - `h3` heading whose **`id` attribute** matches the deep-link fragment (e.g. `tag/users/get/api/v1/users`).
      - A child `<a href="…#tag/…">` – the canonical link.
      - Parameter bullets so names & descriptions are part of the visible DOM.
2. **Pagefind CLI** (run automatically by the Starlight build)
   - Walks every generated HTML file.
   - Finds `data-pagefind-body` blocks → extracts their text & links.
   - Stores them as static JSON & WASM bundles under `/pagefind/`.
3. **Browser runtime**
   - The Starlight theme loads **Pagefind UI**.
   - When a user types a query, the UI loads the pre-built index and returns matching pages.
   - Each result comes with a `url` (taken from the `<a>` it found in the body) and an `excerpt`.
   - Clicking a result navigates to `/apis/#tag/…` which automatically scrolls the Scalar viewer to the correct endpoint because the heading `id` is already present in the DOM.

### Why titles show up first

Pagefind weighs words in headings more heavily than body text. By injecting the parameter list and full description into the list item, we give Pagefind more tokens to match – but the title will often still rank highest (good for relevance).

### Sub-results & highlights

If `showSubResults: true` is enabled (the default in Starlight), Pagefind will also generate _sub_ results for each heading under the `/apis` page. These sub-results inherit the same URL plus the `#tag/…` fragment, so they remain accurate.

Pagefind can optionally append `?highlight=` query params; if we later import `pagefind-highlight.js`, the endpoint page will highlight the matched words inside the Scalar UI.

---
