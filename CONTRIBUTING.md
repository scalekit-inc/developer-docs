# Contributing to Scalekit Developer Docs

Thank you for taking the time to improve the Scalekit docs. Whether you're fixing a typo, clarifying a concept, adding a guide, or improving a component — every contribution makes the experience better for every developer who lands here.

This guide covers everything you need to go from zero to a merged pull request.

---

## Table of contents

- [Before you start](#before-you-start)
- [Set up locally](#set-up-locally)
- [Configure environment variables](#configure-environment-variables)
- [Run git hooks](#run-git-hooks)
- [Describe project architecture](#describe-project-architecture)
  - [Describe Starlight plugins](#describe-starlight-plugins)
  - [Describe overridden components](#describe-overridden-components)
  - [Describe custom components](#describe-custom-components)
- [Write and edit docs](#write-and-edit-docs)
- [Raise a pull request](#raise-a-pull-request)
- [Report an issue](#report-an-issue)
- [Get help](#get-help)

---

## Before you start

A few things worth knowing before you dive in:

- All documentation lives as **MDX files** inside `src/content/`. That's the main place contributors work.
- The site is built with **[Astro](https://astro.build) v5** and the **[Starlight](https://starlight.astro.build)** docs framework, deployed on Netlify in SSR mode.
- We use **pnpm** as the package manager — not npm or yarn.
- Follow the documentation standards in `CLAUDE.md` at the root as the single source of truth for all documentation rules. Read this before writing.

---

## Set up locally

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** ≥ 10
- **D2 CLI** — Diagramming tool for `.d2` files. Install with `pnpm install:d2` (supports macOS and Linux, both Intel and ARM)

```bash
npm install -g pnpm
```

### Clone and run

```bash
# 1. Clone the repo
git clone https://github.com/scalekit-inc/developer-docs.git
cd developer-docs

# 2. Copy the environment file
cp .env.example .env

# 3. Install dependencies (this also sets up git hooks automatically)
pnpm install

# 4. Install D2 CLI (for diagram rendering)
pnpm install:d2

# 5. Start the dev server
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321). Edits to MDX files in `src/content/` reflect immediately.

### Useful commands

| Command                      | Description                                          |
| ---------------------------- | ---------------------------------------------------- |
| `pnpm dev`                   | Start the local dev server                           |
| `pnpm build`                 | Build the production site to `./dist`                |
| `pnpm preview`               | Preview the production build locally                 |
| `pnpm install:d2`            | Install D2 CLI tool for diagram rendering            |
| `pnpm format`                | Auto-format all `.md`, `.mdx`, `.astro`, `.ts` files |
| `pnpm format:check`          | Check formatting without writing changes             |
| `pnpm generate-search-index` | Regenerate the Algolia API search index              |

---

## Configure environment variables

Copy `.env.example` to `.env` before running the project. Here's what each group controls:

### GitHub integration

| Variable       | Required | Description                                                                                                                                                                                                                                                                                           |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN` | Optional | Personal access token for fetching SDK reference docs and repo file trees. Without it, you're limited to 60 GitHub API requests/hour. With it, 5,000/hour. Create one at [github.com/settings/tokens](https://github.com/settings/tokens?type=beta) with **Repository → Contents → Read-only** scope. |

### Scalekit Auth (OAuth / OIDC)

| Variable                 | Required | Description                                                     |
| ------------------------ | -------- | --------------------------------------------------------------- |
| `SCALEKIT_AUTHORIZE_URL` | Yes      | OAuth 2.0 authorization endpoint                                |
| `SCALEKIT_TOKEN_URL`     | Yes      | OAuth 2.0 token exchange endpoint                               |
| `SCALEKIT_CLIENT_ID`     | Yes      | Identifies the docs app to Scalekit                             |
| `SCALEKIT_REDIRECT_URI`  | Yes      | Defaults to `http://localhost:4321/auth/callback` for local dev |

### Algolia Search

| Variable             | Required | Description                                                          |
| -------------------- | -------- | -------------------------------------------------------------------- |
| `ALGOLIA_APP_ID`     | Optional | Powers the AI search Slack bot — not needed for running docs locally |
| `ALGOLIA_API_KEY`    | Optional | Algolia API auth for the Slack bot                                   |
| `ALGOLIA_INDEX_NAME` | Optional | Defaults to `scalekit-starlight-crawler`                             |

### Slack Bot (Netlify Function)

| Variable               | Required | Description                                                                 |
| ---------------------- | -------- | --------------------------------------------------------------------------- |
| `SLACK_BOT_TOKEN`      | Optional | OAuth token (`xoxb-*`) for the AI docs bot that responds to Slack @mentions |
| `SLACK_SIGNING_SECRET` | Optional | Verifies incoming Slack webhook payloads                                    |

> **For most doc contributions**, only `GITHUB_TOKEN` is worth setting. The rest are only needed if you're working on the Netlify functions or the auth flow.

---

## Git Hooks

Running `pnpm install` automatically registers two git hooks via [simple-git-hooks](https://github.com/toplevel-io/simple-git-hooks):

### `pre-commit` — Auto-format staged files

```bash
pnpm pretty-quick --staged
```

Runs [Prettier](https://prettier.io) on every staged file before the commit lands. This means you never need to remember to run `pnpm format` manually — it happens for you. If Prettier rewrites a file, the commit will pause and let you stage the formatted version.

### `pre-push` — Validate before push

```text
1. Checks for uncommitted changes (blocks push if any exist)
2. Runs pnpm generate-search-index
3. Runs pnpm build (full production build, requires D2 CLI)
4. Logs a preview URL
```

This hook ensures you never push something that breaks the build. It takes a few minutes — that's intentional. If the build fails, fix it before pushing. If you need to push despite a failure (e.g., a work-in-progress branch), you can bypass with `git push --no-verify`, but this is not recommended on `main`.

> **Note:** The build step requires the D2 CLI to be installed. If you haven't installed it yet, run `pnpm install:d2`.

---

## Project Architecture

### Starlight Plugins

The site uses a rich set of Starlight plugins, each responsible for a discrete feature:

| Plugin                                                                                           | What It Does                                                            |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| [starlight-theme-nova](https://github.com/trueberryless/starlight-theme-nova)                    | Custom visual theme layered on top of Starlight defaults                |
| [starlight-sidebar-topics](https://github.com/HiDeoo/starlight-sidebar-topics)                   | Groups sidebar nav into distinct topic sections                         |
| [starlight-sidebar-topics-dropdown](https://github.com/HiDeoo/starlight-sidebar-topics-dropdown) | Renders topic switcher as a dropdown for mobile/compact views           |
| [starlight-image-zoom](https://github.com/HiDeoo/starlight-image-zoom)                           | Adds click-to-zoom on all images, with captions                         |
| [starlight-links-validator](https://github.com/HiDeoo/starlight-links-validator)                 | Validates internal links at build time (excludes `/apis/**`)            |
| [starlight-llms-txt](https://github.com/HiDeoo/starlight-llms-txt)                               | Generates a machine-readable `llms.txt` index for AI assistants         |
| [starlight-videos](https://github.com/HiDeoo/starlight-videos)                                   | Embeds and styles video content within docs pages                       |
| [starlight-contextual-menu](https://github.com/HiDeoo/starlight-contextual-menu)                 | Adds per-page contextual actions: copy, open in ChatGPT, open in Claude |
| [@astrojs/starlight-docsearch](https://www.npmjs.com/package/@astrojs/starlight-docsearch)       | Algolia DocSearch integration with AI Ask mode                          |
| [astro-d2](https://astro-d2.vercel.app)                                                          | Renders `.d2` diagram files as SVGs at build time                       |

If you're adding or editing a plugin, the configuration lives entirely in `astro.config.mjs`.

### Overridden Components

Starlight allows swapping out its default UI components with custom implementations. These overrides live in `src/components/overrides/` and are wired up in `astro.config.mjs` under `starlight.components`.

| Component         | File                              | What It Does                                                                                                   |
| ----------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Head`            | `overrides/Head.astro`            | Injects analytics (Google Tag Manager, PostHog), Pylon chat widget, iframe detection script, and theme scripts |
| `Header`          | `overrides/Header.astro`          | Custom top navigation bar with Scalekit branding and nav links                                                 |
| `Footer`          | `overrides/Footer.astro`          | Full site footer with links, social icons, and legal copy                                                      |
| `PageSidebar`     | `overrides/PageSidebar.astro`     | Right-hand table of contents sidebar, customized layout                                                        |
| `PageTitle`       | `overrides/PageTitle.astro`       | Per-page title rendering with custom metadata display                                                          |
| `MarkdownContent` | `overrides/MarkdownContent.astro` | Wraps all MDX content — used to inject contextual layout around page body                                      |
| `Banner`          | `overrides/Banner.astro`          | Top-of-page announcement banner, conditionally rendered                                                        |

> **Note:** `Sidebar.astro` and `SocialIcons.astro` exist in the overrides folder but are currently commented out in `astro.config.mjs`. Do not delete them — they're reference implementations kept for future use.

If you're modifying the visual shell of the site (header, footer, sidebar), this is where to look.

### Custom Components

Beyond overrides, the codebase includes reusable MDX components you can use inside documentation pages:

| Component        | Path                                  | Usage                                                                                         |
| ---------------- | ------------------------------------- | --------------------------------------------------------------------------------------------- |
| `RemoteCode`     | `src/components/RemoteCode.astro`     | Fetches and renders a code file directly from a GitHub URL — used for live SDK examples       |
| `RemoteFileTree` | `src/components/RemoteFileTree.astro` | Renders a GitHub repo's directory structure as an interactive file tree (uses `GITHUB_TOKEN`) |
| `SDKCards`       | `src/components/SDKCards.astro`       | Renders a grid of SDK language cards linking to SDK-specific pages                            |
| `SecondaryNav`   | `src/components/SecondaryNav.astro`   | Topic-level secondary navigation bar rendered within certain guide sections                   |
| `ApiSearchIndex` | `src/components/ApiSearchIndex.astro` | Injects API endpoint metadata into the Algolia search index at build time                     |

Additional component groups:

- `src/components/auth/` — Auth flow UI components (login, callback, session state)
- `src/components/ui/` — Low-level shared UI primitives
- `src/components/examples/` — Interactive embedded code examples
- `src/components/templates/` — Page-level layout templates

---

## Writing & Editing Docs

All documentation pages live in `src/content/`. They are `.mdx` files (Markdown + JSX).

### Frontmatter

Every page must have the following frontmatter:

```yaml
---
title: 'Clear, descriptive title (≤ 60 characters)'
description: 'Concise summary shown in search results (≤ 160 characters)'
sidebar:
  label: 'Short label for the sidebar'
  order: 42
tags: [auth, sso, api]
---
```

### Voice & Style

- Write in **second person** — "you", "your application"
- Use **present tense** for descriptions, **imperative** for step-by-step instructions
- Be direct. Avoid filler phrases like "simply", "just", "easily"
- Explain security implications when relevant

### Code Examples

Every code block that demonstrates an SDK operation must include all four languages using synced tabs:

```mdx
<Tabs syncKey="tech-stack">
  <TabItem label="Node.js">...</TabItem>
  <TabItem label="Python">...</TabItem>
  <TabItem label="Go">...</TabItem>
  <TabItem label="Java">...</TabItem>
</Tabs>
```

SDK variable names are fixed — do not rename them:

| Language | Variable          |
| -------- | ----------------- |
| Node.js  | `scalekit`        |
| Python   | `scalekit_client` |
| Go       | `scalekitClient`  |
| Java     | `scalekitClient`  |

For the full style guide, read `CLAUDE.md` at the root of the repo.

---

## Raising a Pull Request

1. **Fork** this repository
2. **Create a branch** off `main` — use a descriptive name like `fix/sso-quickstart-typo` or `feat/add-scim-guide`
3. **Make your changes** — edit MDX files in `src/content/`, or component/config files if needed
4. **Format** — `pnpm format` (the pre-commit hook will do this too, but running it manually is good practice)
5. **Push** your branch — the pre-push hook will run a full build and catch any broken links or build errors
6. **Open a PR** against `main` — fill in the description with what changed and why
7. Every live page also has an **"Edit this page"** link that drops you directly into the right file on GitHub

PRs are reviewed by the Scalekit docs team. We aim to respond within a couple of days.

---

## Reporting an Issue

Found a bug, a broken link, outdated content, or a missing guide? Please [open a GitHub Issue](https://github.com/scalekit-inc/developer-docs/issues) with:

- The URL of the page (if applicable)
- What you expected to see
- What you actually saw
- Any browser or environment details if it's a rendering issue

---

## Getting Help

If you're stuck, have a question, or want to discuss an idea before building it:

- 💬 **Slack** — [Join the Scalekit Community](https://join.slack.com/t/scalekit-community/shared_invite/zt-3gsxwr4hc-0tvhwT2b_qgVSIZQBQCWRw) and drop your question in `#ask-anything`
- 📧 **Email** — [saif@scalekit.com](mailto:saif@scalekit.com) for anything that doesn't fit an issue or a Slack message

---

<div align="right">
  <sub>Built with ❤️ by the <a href="https://scalekit.com">Scalekit</a> team and open-source contributors.</sub>
</div>
