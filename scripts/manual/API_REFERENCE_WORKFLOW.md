# Scalekit API reference pipeline

This guide explains **how the API reference is wired** in developer-docs and the exact steps to update or extend it. It matches the live Redocly + plugin layout (verified against `redocly.yaml` and `openapi/plugins/scalekit.js`).

---

## 1. Mental model

```
openapi/scalekit.yaml                 ← single OpenAPI root (paths + components + webhooks)
openapi/extensions/{all,agentkit,saaskit}.yaml  ← product overlays (filter + presentation)
openapi/code_samples/{lang}/…         ← SDK samples (injected at bundle time)
openapi/plugins/scalekit.js           ← Redocly decorator: scalekit/product
        ↓  pnpm run bundle:apis
public/api/{scalekit,agentkit,saaskit}.scalar.{yaml,json}   ← generated; do not sole-edit
        ↓
/apis  ·  /agentkit/apis  ·  /saaskit/apis
```

| Piece                           | Role                                                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `openapi/scalekit.yaml`         | **Docs working root** for all three Scalar pages. Paths, schemas, and `webhooks:` live here.                                          |
| `openapi/extensions/*.yaml`     | Product overlays: `include.tags` / `include.webhooks`, curated `info`/`tags`, and deep-merged `operations` / `schemas` / `root` x-\*. |
| `openapi/code_samples/`         | Multi-language samples. Plugin injects them as `x-codeSamples` (docs samples win per language).                                       |
| `redocly.yaml`                  | Defines three APIs (`agentkit`, `saaskit`, `all`), each with `root: openapi/scalekit.yaml` + overlay.                                 |
| `public/api/*.scalar.*`         | **Bundle outputs**. Overwritten by `pnpm run bundle:apis`.                                                                            |
| `scripts/validate-api-split.js` | Fails the build if an operation is missing from both splits or present in both.                                                       |
| `scripts/search-index-apis.js`  | Builds deep-link records for DocSearch; also used by `ApiSearchIndex.astro` at build.                                                 |

There is **no** `openapi/paths/`, **no** `openapi/agentkit.yaml` / `openapi/saaskit.yaml` product roots, and **no** `pnpm run inject-code-samples` script. Code samples are injected only by the Redocly plugin during `bundle:apis`.

---

## 2. Backend vs docs ownership

| Change                                                                                       | Where                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| New REST endpoint / param / behavior (contract)                                              | Backend (`scalekit-inc/scalekit` protos + services). Generate OpenAPI, then merge into docs `openapi/scalekit.yaml` (or replace the working root from the generator output and re-apply docs-owned webhooks/samples/overlays). |
| Scalar presentation that should ship with the generator (some `x-badges`, rank, global info) | Backend `proto/scalekit/v1/snippets/` (see backend `SCALAR_INJECTION_README.md`).                                                                                                                                              |
| Product curation, tags, hide/badge overlays, product `info`                                  | Docs `openapi/extensions/{agentkit,saaskit,all}.yaml`                                                                                                                                                                          |
| Code samples                                                                                 | Docs `openapi/code_samples/` only                                                                                                                                                                                              |
| Webhook **event payloads** shown in Scalar                                                   | Docs `openapi/scalekit.yaml` → `webhooks:` (+ `bundle:apis`)                                                                                                                                                                   |
| Handler how-tos                                                                              | MDX (see related content below)                                                                                                                                                                                                |

**Never** treat `public/api/*.scalar.*` as the durable source of truth.

---

## 3. Typical maintenance tasks

### A. Adding or changing a REST endpoint

1. Prefer implementing the contract in the backend and regenerating OpenAPI.
2. Land the operation under `paths:` in `openapi/scalekit.yaml` (with the correct `tags`).
3. Ensure the tag is listed in the product overlay’s `include.tags` (`agentkit.yaml` or `saaskit.yaml`) so the op appears on the right product page. Combined (`all.yaml`) keeps everything when `include.tags` is absent.
4. Add code samples under `openapi/code_samples/{lang}/{path-slug}/{method}.{ext}`
   - Slug = path with leading `/` stripped and `/` → `_` (params and colons kept literal).
   - Example: `/api/v1/organizations/{id}` → `api_v1_organizations_{id}`
   - Languages: `javascript` (`.js`), `python` (`.py`), `go` (`.go`), `java` (`.java`)
5. Run:

```bash
pnpm run bundle:apis
pnpm run validate-api-split
```

6. Preview with `pnpm start` and open `/apis`, `/agentkit/apis`, or `/saaskit/apis`.

### B. Custom Scalar extensions (`x-badges`, `x-internal`, tags, `x-tagGroups`, …)

**Docs-owned (survives re-bundle of the working root):** edit overlays in `openapi/extensions/`.

```yaml
# openapi/extensions/saaskit.yaml (example)
operations:
  'get /api/v1/organizations':
    x-badges:
      - name: Beta
        color: '#f59e0b'

schemas:
  SomeSchema:
    x-enum-descriptions:
      FOO: Description of FOO

root:
  x-tagGroups:
    - name: Core
      tags: [Organizations, Users]
```

| Scope            | File                               |
| ---------------- | ---------------------------------- |
| Combined `/apis` | `openapi/extensions/all.yaml`      |
| AgentKit         | `openapi/extensions/agentkit.yaml` |
| SaaSKit          | `openapi/extensions/saaskit.yaml`  |

The plugin deep-merges `info`, `operations`, `schemas`, and top-level keys under `root`. It also replaces top-level `tags` when the overlay provides a curated list.

**Backend-owned presentation** for generator-emitted ops still uses backend snippets when you need the extension in the upstream generate path. Day-to-day product presentation belongs in the docs overlays.

### C. Adding a webhook event

Event payloads live in **OpenAPI / Scalar**, not MDX catalogs under `reference/webhooks/` (retired).

```
openapi/scalekit.yaml  →  webhooks.<event.name>     ← REQUIRED
openapi/extensions/{agentkit|saaskit}.yaml         ← only if prefix is NEW
pnpm run bundle:apis                               ← REQUIRED
public/api/*.scalar.*                              ← generated
```

1. Add the operation under top-level `webhooks:` in `openapi/scalekit.yaml` (match neighboring events). Add or reuse a schema under `components.schemas` when the event needs a typed payload (prefer event-specific schemas over the shared `ScalekitEvent` when enums/fields differ).
2. Check prefix filters:

   | Prefix                                           | Overlay                                                 | Product page      |
   | ------------------------------------------------ | ------------------------------------------------------- | ----------------- |
   | `connected_account.`                             | `openapi/extensions/agentkit.yaml` → `include.webhooks` | `/agentkit/apis/` |
   | `organization.`, `user.`, `role.`, `permission.` | `openapi/extensions/saaskit.yaml` → `include.webhooks`  | `/saaskit/apis/`  |

   New prefix (e.g. `session.`) → add it to the correct overlay or the event is **stripped** from that product bundle. Combined (`all`) keeps all webhooks when no filter is set.

3. Bundle and confirm:

```bash
pnpm run bundle:apis
rg "your.event.name" public/api/agentkit.scalar.yaml public/api/saaskit.scalar.yaml public/api/scalekit.scalar.yaml
```

4. Commit source **and** regenerated `public/api/*` together.

### D. Search / deep links

- Scalar operation fragments: `#tag/{tag-slug}/{METHOD}{path}`
- Webhook fragments use summary-based slugs (see `generateWebhookSlug` in `src/pages/apis.astro`)
- Validate fragments:

```bash
node scripts/search-index-apis.js
```

(`extractApiRecords` also runs at build via `ApiSearchIndex.astro` for DocSearch crawlability.)

### E. Styling / layout

| Want to change…           | Edit…                                          |
| ------------------------- | ---------------------------------------------- |
| Hidden search list markup | `src/components/ApiSearchIndex.astro`          |
| Scalar header / theme     | Scalar reference component + API reference CSS |
| Page shell                | `src/pages/apis.astro` (and product API pages) |

---

## 4. Commands

```bash
pnpm run bundle:apis          # Redocly: agentkit + saaskit + all → public/api/*
pnpm run validate-api-split   # every op in exactly one product split
node scripts/search-index-apis.js   # deep-link fragment checks
pnpm start                    # local preview (prefer for D2 + full site)
pnpm run build                # includes bundle:apis + validate-api-split
```

Optional: `pnpm run reorder-swagger` reorders `public/api/scalekit.scalar.json` for readability after a manual inspect — prefer fixing order in sources/overlays when possible.

---

## 5. Related content (not the OpenAPI source of truth)

| Content                                | Path                                                                       |
| -------------------------------------- | -------------------------------------------------------------------------- |
| Implement handlers / verify signatures | `src/content/docs/authenticate/implement-workflows/implement-webhooks.mdx` |
| Webhooks best practices                | `src/content/docs/guides/webhooks-best-practices.mdx`                      |
| Directory/SCIM journey event notes     | `src/content/docs/directory/reference/directory-events.mdx`                |

Deep-link guides to Scalar (`/apis/#webhook/…` or product API pages), not removed `reference/webhooks/*` paths.

---

## 6. Never

- Sole-edit `public/api/*.scalar.*` without updating `openapi/scalekit.yaml` (and re-running `bundle:apis`).
- Create new MDX event catalogs under `src/content/docs/reference/webhooks/`.
- Assume `openapi/paths/`, `openapi/webhooks/`, or separate `openapi/agentkit.yaml` / `openapi/saaskit.yaml` roots exist — they do not. Webhook ops live only under `webhooks:` in `openapi/scalekit.yaml`.
- Skip `validate-api-split` when changing product surfaces.
- Add code samples in the backend repo.

---

## 7. Common pitfalls

| Symptom                                   | Likely cause                            | Fix                                                            |
| ----------------------------------------- | --------------------------------------- | -------------------------------------------------------------- |
| New webhook missing from AgentKit/SaaSKit | Prefix not in `include.webhooks`        | Update the product overlay                                     |
| New op missing from a product page        | Tag not in `include.tags`               | Add tag to the overlay or retag the operation                  |
| Op in neither or both splits              | Overlay tag filters wrong               | Fix tags / `include.tags`; re-run `validate-api-split`         |
| Samples missing after refresh             | Files not under `openapi/code_samples/` | Add samples; re-run `bundle:apis`                              |
| Search link wrong                         | Fragment scheme drift                   | Update `scripts/search-index-apis.js` + `ApiSearchIndex.astro` |

---

Happy documenting.
