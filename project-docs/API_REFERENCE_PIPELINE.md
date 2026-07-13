# API reference pipeline

Canonical maintainer guide:

**[scripts/manual/API_REFERENCE_WORKFLOW.md](../scripts/manual/API_REFERENCE_WORKFLOW.md)**

## Live layout (summary)

- **Root:** `openapi/scalekit.yaml` (all three Redocly APIs use this root)
- **Overlays:** `openapi/extensions/{all,agentkit,saaskit}.yaml` via decorator `scalekit/product` in `openapi/plugins/scalekit.js`
- **Samples:** `openapi/code_samples/` (injected at `pnpm run bundle:apis`)
- **Outputs:** `public/api/{scalekit,agentkit,saaskit}.scalar.{yaml,json}` — generated; do not sole-edit
- **Gate:** `pnpm run validate-api-split`

There is no `openapi/paths/` tree, no separate `openapi/agentkit.yaml` / `openapi/saaskit.yaml` roots, and no `inject-code-samples` package script.
