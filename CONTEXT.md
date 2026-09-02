# Developer docs

Glossary for Scalekit developer-docs. Implementation details do not belong here.

## Language

**Session middleware**:
Official SaaSKit helpers that own hosted login, the encrypted session cookie, token refresh, and logout for a web framework.
_Avoid_: Adapter, integration, framework support

**Frameworks**:
Official AgentKit helpers that map Scalekit tools into an agent framework such as LangChain.
_Avoid_: Session middleware, web adapter

**SDK**:
The language client plus any first-party framework helper that ships in that client.
_Avoid_: Adapter (for web-framework helpers)

### Keep building

**First success**:
The reader has finished the product hello-world: one AgentKit tool call, or one SaaSKit sign-in.
_Avoid_: Go-live, production, first-run

**Keep building**:
The stage after first success. It holds how-tos and recipes only. The tab opens a hub, not a how-to or a recipe.
_Avoid_: Guides, leftover, Developer Resources, second product journey

**Keep building hub**:
A short page that names the next how-to, then lists recipes as a pick-list. It is a recommended next plus a shelf, not a 50/50 fork.
_Avoid_: Journey, index, leftover

**How-to**:
A short page for one Scalekit dashboard or workspace task after first success. How-tos are read in order. The order follows the dashboard after first success, not a docs brainstorm. Account deletion is not a how-to.
_Avoid_: Recipe, product-journey page, leftover

**Recipe**:
A page for one job in the reader's own app or agent. The reader can land on it, finish the job, and leave. Recipes have no required order.
_Avoid_: Cookbook, how-to, feature tour, quickstart

**Product journey**:
The main AgentKit or SaaSKit left rail from hello-world through implementation.
_Avoid_: Keep building, how-to sequence
