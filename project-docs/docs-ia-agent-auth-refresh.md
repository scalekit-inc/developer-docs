# Docs IA Refresh Notes

Date: 2026-04-02

## Locked decisions

- `src/content/docs/index.mdx` becomes the Agent Auth landing page.
- Current docs homepage content moves to `/auth-for-saas/`.
- `/` and `/auth-for-saas/` remain homepage-style pages with no left sidebar.
- The product chooser keeps existing mechanics and uses `AgentKit` and `SaaSKit` as dropdown section labels.
- Page and sidebar terminology stays conservative for now:
  - `Agent Auth` remains the visible docs term.
  - `SaaS User Management` replaces `Full stack auth` in sidebar terminology.
- `Auth for SaaS` should not appear as a left-sidebar group.
- `Agent Auth`-specific resources move into the Agent Auth sidebar:
  - `/agent-auth/code-samples/`
  - `/guides/integrations/agent-connectors/`
- `/resources/code-samples/agent-auth/` stays live but is hidden from UI.

## Choose product mapping

### AgentKit

- `Quickstart` -> `/agent-auth/quickstart/`
- `Code samples` -> `/agent-auth/code-samples/`
- `Bring your own provider` -> `/agent-auth/bring-your-own-provider/overview/`
- `Agent Tools` -> `/agent-auth/tools/agent-tools-quickstart/`
- `AI Frameworks` -> `/agent-auth/openclaw/`
- `Providers` -> `/guides/integrations/agent-connectors/`

### SaaSKit

- `User management` -> `/authenticate/fsa/quickstart/`
- `SSO` -> `/authenticate/sso/add-modular-sso/`
- `SCIM` -> `/directory/scim/quickstart/`
- `MCP Auth` -> `/authenticate/mcp/quickstart/`

## Open naming TODOs

- `AgentKit` is only a product-chooser label for now. It is not yet the docs page terminology.
- `SaaSKit` is only a product-chooser label for now.
- `Agent Actions` vs `Agent Auth` remains unresolved. Current docs implementation stays on `Agent Auth`.
