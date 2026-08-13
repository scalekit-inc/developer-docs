# Cookbook authoring guide

Cookbooks are plain Starlight docs pages under product shelves:

| Product       | Path                                   | URL                    |
| ------------- | -------------------------------------- | ---------------------- |
| AgentKit      | `src/content/docs/agentkit/cookbooks/` | `/agentkit/cookbooks/` |
| Auth for SaaS | `src/content/docs/saaskit/cookbooks/`  | `/saaskit/cookbooks/`  |

How-to guides (short dashboard answers) live beside them:

| Product       | Path                                | URL                 |
| ------------- | ----------------------------------- | ------------------- |
| AgentKit      | `src/content/docs/agentkit/how-to/` | `/agentkit/how-to/` |
| Auth for SaaS | `src/content/docs/saaskit/how-to/`  | `/saaskit/how-to/`  |

## How readers find them

Each product has a **dedicated guides sidebar** (not the journey rail):

- **AgentKit** secondary nav → **Guides** → left rail shows **Cookbooks** and **How-to** collapsibles
- **Auth for SaaS** secondary nav → Developer Resources → **Cookbooks** / **How-to** → same pattern

New topic IDs in `src/configs/sidebar.config.ts`:

- `agentkit-guides`
- `saaskit-guides`

Each uses `autogenerate` on the product directory. Drop a new `.mdx` file in the folder and it appears in the collapsible.

A cross-product hub remains at `/cookbooks/` (`src/content/docs/cookbooks.mdx`).

## What a cookbook is

A cookbook is a practical, developer-focused guide that solves one specific real-world problem. It is not a feature announcement, a product tour, or a reference page.

**Cookbooks are:**

- Recipes for solving a specific implementation problem
- Pattern guides developers can adapt to their own projects
- Deep dives into real tradeoffs, gotchas, and working code

**Cookbooks are not:**

- "How Scalekit works" explanations (concept pages)
- First-time setup quickstarts (journey guides)
- API reference documentation
- Short dashboard answers (those belong in **How-to**)

## Frontmatter

Use normal Starlight docs frontmatter. Blog-only fields (`date`, `excerpt`, `featured`, `authors`, `tags`, `cover`) are not used.

```yaml
---
title: 'Build a Mastra agent with Scalekit AgentKit tools'
description: 'Give a Mastra agent access to Gmail and 200+ connectors through Scalekit AgentKit.'
sidebar:
  label: 'Mastra AgentKit'
tableOfContents: true
---
```

**Field rules:**

| Field             | Required | Notes                                |
| ----------------- | -------- | ------------------------------------ |
| `title`           | Yes      | ≤60 chars, verb-first, sentence case |
| `description`     | Yes      | ≤160 chars, problem and outcome      |
| `sidebar.label`   | Yes      | Short left-rail label (1–5 words)    |
| `tableOfContents` | Optional | Default true for long recipes        |

## Create a cookbook

1. Choose the product shelf (`agentkit/cookbooks` or `saaskit/cookbooks`).
2. Create `src/content/docs/<product>/cookbooks/<slug>.mdx`.
3. Write the recipe body (problem, steps, working code, failure modes).
4. If the page replaces an old `/cookbooks/<slug>` URL, add a redirect in `src/configs/redirects.config.ts`.
5. Run a local build or `pnpm start` and confirm the page appears under the product **Guides** / **Cookbooks** sidebar.

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
