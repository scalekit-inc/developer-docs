# Cookbook authoring guide

Cookbooks are plain Starlight docs pages under product shelves:

| Product       | Path                                   | URL                           |
| ------------- | -------------------------------------- | ----------------------------- |
| AgentKit      | `src/content/docs/agentkit/cookbooks/` | `/agentkit/cookbooks/<slug>/` |
| Auth for SaaS | `src/content/docs/saaskit/cookbooks/`  | `/saaskit/cookbooks/<slug>/`  |

How-to guides (short dashboard answers) live beside them:

| Scope                       | Path                                | URL                        |
| --------------------------- | ----------------------------------- | -------------------------- |
| Shared (both product rails) | `src/content/docs/how-to/`          | `/how-to/<slug>/`          |
| AgentKit only               | `src/content/docs/agentkit/how-to/` | `/agentkit/how-to/<slug>/` |

Shared how-tos appear in both Keep building rails from one file. Product chrome on `/how-to/**` uses the same session/cookie as Enterprise Deployment.

Each product shelf has a Keep building hub at `index.mdx`. The secondary nav lands on that hub. Hide the hub from the Recipes autogenerate list (`sidebar.hidden: true`).

## How readers find them

Each product has a **dedicated Keep building sidebar** (not the journey rail):

- **AgentKit** secondary nav → **Keep building** → left rail shows **How-to** then **Recipes**
- **Auth for SaaS** secondary nav → **Keep building** → same pattern (not under Developer Resources)

New topic IDs in `src/configs/sidebar.config.ts`:

- `agentkit-guides`
- `saaskit-guides`

Each uses `autogenerate` on the product directory. Drop a new `.mdx` file in the folder and it appears in the collapsible.

A cross-product page remains at `/cookbooks/` (`src/content/docs/cookbooks.mdx`). It belongs to no
single product, so it is listed in `exclude` in `src/configs/sidebar.config.ts` — that keeps it from
inheriting a product journey rail or lighting up a product nav pill. Each product Keep building
tab opens `/<product>/cookbooks/`, not the first recipe.

## What a cookbook is

A cookbook is a practical, developer-focused guide that solves one specific real-world problem. It is not a feature announcement, a product tour, or a reference page.

The best cookbooks share knowledge, not features. They are useful even for developers who have not yet adopted Scalekit. Each cookbook should be independently useful — a developer should be able to land on one recipe, solve their problem, and continue without reading anything else.

**Cookbooks are:**

- Recipes for solving a specific implementation problem
- Pattern guides developers can adapt to their own projects
- Deep dives into real tradeoffs, gotchas, and working code

**Cookbooks are not:**

- "How Scalekit works" explanations (concept pages)
- First-time setup quickstarts (journey guides)
- API reference documentation
- Short dashboard answers (those belong in **How-to**)

### Two layers of content

Every cookbook belongs to one of two layers:

**Layer 1 — Orientation**: Mental models, architecture maps, prerequisites, recommended learning paths. Explains _why_ a pattern matters before showing how to implement it. Use this layer when the reader needs context before they can act.

**Layer 2 — Recipes**: Concrete implementation tasks with working code, expected outcomes, failure modes, and production notes. Use this layer when the reader knows what they want to build and just needs the how.

Most cookbooks are Layer 2. A cookbook may contain both layers — a brief orientation section followed by one or more recipes.

## The P.A.T. framework

Every cookbook must be structured around three layers:

1. **Problem** — Start from the real developer pain, workflow, or use case. What is hard or broken without this recipe?
2. **Angle** — Give a clear point of view on the solution. Why this approach? What makes it better than the alternatives?
3. **Teach** — Teach step by step with code, explanations, expected outcomes, common mistakes, and extensions.

Apply P.A.T. to the cookbook as a whole and to each major section.

## Naming

Filename rules:

- Lowercase, hyphen-separated: `implement-nextjs-auth.mdx`
- Descriptive of the task, not the product: prefer `building-custom-org-switcher` over `scalekit-org-switcher`
- Name files like search queries a developer would type: `handle-token-refresh-long-running-agents.mdx`, `pass-user-context-to-tools.mdx`, `debug-failed-oauth-flows.mdx`

**Title naming rules:**

Name the cookbook like a concrete developer task. Prefer titles that expose the action, mechanism, or target outcome.

| Bad                                  | Better                                                |
| ------------------------------------ | ----------------------------------------------------- |
| "Authentication concepts for agents" | "Set up agent auth in JavaScript"                     |
| "Scalekit org switcher"              | "Build a custom organization switcher"                |
| "Token handling"                     | "Handle token refresh in long-running agent sessions" |
| "User identity in agents"            | "Pass user identity from your app to an agent safely" |

Prefer title patterns: "How to…", "Build…", "Handle…", "Debug…", "Pass…", "Validate…", "Set up…"

## Frontmatter

Use normal Starlight docs frontmatter. Blog-only fields (`date`, `excerpt`, `featured`, `authors`, `tags`, `cover`) are not used.

```yaml
---
title: 'Build a Mastra agent with Scalekit AgentKit tools'
description: 'Give a Mastra agent access to Gmail and 200+ connectors through Scalekit AgentKit.'
sidebar:
  label: 'Build a Mastra agent'
  order: 3
tableOfContents: true
---
```

**Field rules:**

| Field             | Required | Notes                                |
| ----------------- | -------- | ------------------------------------ |
| `title`           | Yes      | ≤60 chars, verb-first, sentence case |
| `description`     | Yes      | ≤160 chars, problem and outcome      |
| `sidebar.label`   | Yes      | Short left-rail label (1–3 words)    |
| `sidebar.order`   | Yes      | Explicit order in the product shelf  |
| `tableOfContents` | Optional | Default true for long recipes        |

## Create a cookbook

1. Choose the product shelf (`agentkit/cookbooks` or `saaskit/cookbooks`).
2. Create `src/content/docs/<product>/cookbooks/<slug>.mdx`.
3. Write the recipe body (problem, steps, working code, failure modes).
4. Put images under `src/assets/docs/<product>/cookbooks/<slug>/` and reference them as
   `@/assets/docs/<product>/cookbooks/<slug>/<file>.png`.
5. Run a local build or `pnpm start` and confirm the page appears under the product **Recipes** group.

**Redirects:** a brand-new cookbook needs none. Only a page whose published URL changes needs an
entry in `src/configs/redirects.config.ts`, and it must be listed one slug at a time — a
`/cookbooks/*` splat cannot work, because the old flat namespace now splits across two products.

**Images:** moving a cookbook means moving its assets in the same commit. A stale `@/assets/…` path
is a hard build failure (`[ImageNotFound]`), and `pnpm start` will not surface it because dev
compiles pages only when you visit them. Run a full `pnpm build` before pushing a move.

## Content structure

### Opening (no heading)

2–4 sentences: concrete context, why it is hard without the recipe, what the reader will build.

### The problem

Heading `## The problem`. Bulleted pain points with **bold** lead-ins.

### Who needs this (optional)

Two short lists: for you if / not for you if.

### Procedure

Use `<Steps>` for ordered work. Multi-language SDK samples use `<Tabs syncKey="tech-stack">` with Node.js, Python, Go, and Java when the 90% rule applies.

### Verify / next steps

How the reader knows it worked; links to related journey docs or how-tos.

## Diagrams (d2)

If you add a `d2` code fence, generate and commit the SVG under `public/d2/docs/<product>/cookbooks/` after a local build (Netlify does not run `d2`).

## How-to guides

How-tos are short, single-task dashboard pages in `*/how-to/`. Prefer imperative titles ("Manage environments"). Keep them out of the product journey sidebars — they belong only in the guides topic.
