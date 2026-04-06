# Gateway Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `/` with a neutral split-panel gateway that routes first-time visitors to either `/home/agent-actions/` (agent docs) or `/home/auth-for-saas/` (SaaS docs), remembering the choice in localStorage.

**Architecture:** Three content pages — gateway at `/`, agent homepage at `/home/agent-actions/`, SaaS stub at `/home/auth-for-saas/`. The gateway page uses an inline `<script>` in `<head>` to redirect returning visitors before Astro hydration, and CSS-only flex expansion for the hover interaction. No new components — everything lives in MDX frontmatter and inline HTML.

**Tech Stack:** Astro + Starlight (MDX), `template: splash`, Tailwind, `src/configs/sidebar.config.ts` for topic exclusion, `pnpm` for running dev/build.

---

## File Map

| Action  | File                                            | What it does                                                       |
| ------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| Create  | `src/content/docs/home/agent-actions/index.mdx` | Agent homepage (current `/` content moved here)                    |
| Create  | `src/content/docs/home/auth-for-saas/index.mdx` | SaaS landing stub                                                  |
| Replace | `src/content/docs/index.mdx`                    | Gateway page (split panel + localStorage redirect)                 |
| Modify  | `src/configs/sidebar.config.ts`                 | Add `/home/agent-actions/` and `/home/auth-for-saas/` to `exclude` |

---

## Task 1: Move agent homepage to `/home/agent-actions/`

**Files:**

- Create: `src/content/docs/home/agent-actions/index.mdx`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p src/content/docs/home/agent-actions
```

Copy the full content of `src/content/docs/index.mdx` to `src/content/docs/home/agent-actions/index.mdx`. The content is identical — Starlight derives the URL from the file path automatically, so no slug changes are needed. The only frontmatter field to update is `topic`, which must remain `connect` so the agent sidebar and secondary nav still activate correctly on this page.

The file should start with:

```mdx
---

title: Add auth to your AI agents
template: splash
description: Connect your AI agents with SaaS apps and APIs on behalf of users
tableOfContents: false
topic: connect
tags: [agent-auth, quickstart, ai-agents, oauth, token-vault, tool-integration]
hero:
tagline: Auth, provider connections, and tool execution for agents acting on behalf of users
head:

- tag: style
  content: |
  right-sidebar-panel {
  display: none !important;
  }
  .hero {
  display: none !important;
  }
```

(Keep the full CSS block and all remaining content from the original `src/content/docs/index.mdx` — do not truncate.)

- [ ] **Step 2: Verify the file exists and builds**

```bash
pnpm dev
```

Open `http://localhost:4321/home/agent-actions/` and confirm the agent homepage renders correctly — same layout as the current `/`.

- [ ] **Step 3: Commit**

```bash
git add src/content/docs/home/agent-actions/index.mdx
git commit -m "feat: move agent homepage to /home/agent-actions/"
```

---

## Task 2: Create SaaS landing stub at `/home/auth-for-saas/`

**Files:**

- Create: `src/content/docs/home/auth-for-saas/index.mdx`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p src/content/docs/home/auth-for-saas
```

Create `src/content/docs/home/auth-for-saas/index.mdx` with this content:

```mdx
---
title: Auth for SaaS apps
template: splash
description: SSO, SCIM directory sync, and user management for your B2B application
tableOfContents: false
prev: false
next: false
head:
  - tag: style
    content: |
      right-sidebar-panel { display: none !important; }
      .hero { display: none !important; }
      .meta.sl-flex { display: none !important; }
      footer.sl-flex { display: none !important; }
      .secondary-nav { display: none !important; }
      .content-panel { padding-top: 0 !important; }
---

import { LinkButton } from '@astrojs/starlight/components'

<div style="padding: 4rem 2rem; text-align: center; max-width: 600px; margin: 0 auto;">
  <h1>Auth for your SaaS app</h1>
  <p>
    SSO, SCIM directory sync, and full user management for B2B applications. Full design coming
    soon.
  </p>
  <LinkButton href="/authenticate/fsa/quickstart/">Get started with SaaS auth</LinkButton>
</div>
```

- [ ] **Step 2: Verify the stub renders**

```bash
pnpm dev
```

Open `http://localhost:4321/home/auth-for-saas/` and confirm the page renders without errors.

- [ ] **Step 3: Commit**

```bash
git add src/content/docs/home/auth-for-saas/index.mdx
git commit -m "feat: add SaaS landing stub at /home/auth-for-saas/"
```

---

## Task 3: Exclude new home pages from sidebar topics

**Files:**

- Modify: `src/configs/sidebar.config.ts`

The new pages at `/home/agent-actions/` and `/home/auth-for-saas/` would otherwise fall through to the `resources` catch-all topic pattern and show the wrong sidebar. They must be added to the `exclude` array.

- [ ] **Step 1: Update the `exclude` array**

In `src/configs/sidebar.config.ts`, find the `exclude` array (around line 529):

```ts
export const exclude = [
  '/', // Home page
  '/auth-for-saas',
  '/blog',
  '/404', // Error page
  '/apis/**/*', // REST API reference has Scalar-powered navigation
]
```

Update it to:

```ts
export const exclude = [
  '/', // Gateway page — no topic sidebar
  '/home/agent-actions', // Agent homepage — full-page layout, no sidebar
  '/home/auth-for-saas', // SaaS homepage — full-page layout, no sidebar
  '/auth-for-saas',
  '/blog',
  '/404', // Error page
  '/apis/**/*', // REST API reference has Scalar-powered navigation
]
```

- [ ] **Step 2: Verify build still passes**

```bash
pnpm build
```

Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/configs/sidebar.config.ts
git commit -m "feat: exclude /home/* pages from sidebar topic routing"
```

---

## Task 4: Create the gateway page at `/`

**Files:**

- Replace: `src/content/docs/index.mdx`

This replaces the entire content of `src/content/docs/index.mdx` with the split-panel gateway. The localStorage redirect fires via an inline `<script>` in `<head>` — before Astro hydrates — so returning visitors never see the gateway flash.

- [ ] **Step 1: Replace `src/content/docs/index.mdx`**

Write the following as the complete file content:

```mdx
---
title: Scalekit Docs
template: splash
description: Auth, provider connections, and tool execution for AI agents and SaaS apps
tableOfContents: false
prev: false
next: false
head:
  - tag: script
    content: |
      (function () {
        try {
          var path = localStorage.getItem('sk_docs_path');
          if (path === 'agent-actions') { window.location.replace('/home/agent-actions/'); return; }
          if (path === 'auth-for-saas') { window.location.replace('/home/auth-for-saas/'); return; }
        } catch (e) {}
      })();
  - tag: style
    content: |
      /* Hide Starlight chrome — gateway is a routing surface, not a docs page */
      right-sidebar-panel { display: none !important; }
      .hero { display: none !important; }
      .meta.sl-flex { display: none !important; }
      footer.sl-flex { display: none !important; }
      .secondary-nav { display: none !important; }
      .content-panel { padding: 0 !important; }
      main { padding: 0 !important; max-width: 100% !important; }
      .sl-container { max-width: 100% !important; padding: 0 !important; }

      /* Gateway layout */
      .gateway {
        display: flex;
        flex-direction: row;
        height: calc(100vh - var(--sl-nav-height));
        min-height: 400px;
        overflow: hidden;
      }

      .panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 3rem 2.5rem;
        text-align: center;
        text-decoration: none;
        color: inherit;
        transition: flex 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, background 0.2s ease;
        position: relative;
        overflow: hidden;
      }

      .panel-agents {
        background: linear-gradient(160deg, #0d1529 0%, #111827 60%);
        border-right: 1px solid #1f2937;
      }

      .panel-saas {
        background: linear-gradient(160deg, #0a1a10 0%, #111827 60%);
      }

      /* Hover expansion — desktop with pointer device only */
      @media (hover: hover) and (min-width: 1024px) {
        .gateway:hover .panel:not(:hover) {
          flex: 0.6;
          opacity: 0.6;
        }
        .gateway:hover .panel:hover {
          flex: 1.4;
        }
        .panel-agents:hover {
          background: linear-gradient(160deg, #131d3a 0%, #161d2e 100%);
        }
        .panel-saas:hover {
          background: linear-gradient(160deg, #0d2015 0%, #141d15 100%);
        }
      }

      .panel-divider {
        width: 1px;
        background: #1f2937;
        flex-shrink: 0;
        align-self: stretch;
      }

      .panel-badge {
        font-size: 0.6875rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 600;
        color: #4b5563;
        margin-bottom: 0.25rem;
      }

      .panel-icon {
        font-size: 2.25rem;
        line-height: 1;
      }

      .panel-label {
        font-size: 1.125rem;
        font-weight: 700;
        color: #f3f4f6;
        line-height: 1.35;
        max-width: 17rem;
        margin: 0;
      }

      .panel-desc {
        font-size: 0.8125rem;
        color: #6b7280;
        line-height: 1.6;
        max-width: 16rem;
        margin: 0;
      }

      .panel-cta {
        font-size: 0.8125rem;
        font-weight: 600;
        margin-top: 0.5rem;
      }

      .panel-agents .panel-cta { color: #818cf8; }
      .panel-saas  .panel-cta { color: #34d399; }

      /* Tablet: keep side-by-side, no hover expansion, shorter labels */
      @media (max-width: 1023px) and (min-width: 768px) {
        .panel-label { font-size: 1rem; max-width: 13rem; }
        .panel-desc { font-size: 0.75rem; }
      }

      /* Mobile: stack vertically */
      @media (max-width: 767px) {
        .gateway {
          flex-direction: column;
        }
        .panel-divider {
          width: 100%;
          height: 1px;
          align-self: auto;
        }
        .panel {
          flex: 1;
          padding: 2rem 1.5rem;
        }
      }
---

<div class="gateway">
  <a
    href="/home/agent-actions/"
    class="panel panel-agents"
    onclick="try{localStorage.setItem('sk_docs_path','agent-actions')}catch(e){}"
  >
    <span class="panel-badge">For AI developers</span>
    <span class="panel-icon">🤖</span>
    <p class="panel-label">I'm building agents that act on behalf of users</p>
    <p class="panel-desc">Connect to Slack, HubSpot, databases, and 40+ tools via OAuth, MCP, and token vault</p>
    <span class="panel-cta">Start with Agent Auth →</span>
  </a>

<div class="panel-divider" role="separator"></div>

  <a
    href="/home/auth-for-saas/"
    class="panel panel-saas"
    onclick="try{localStorage.setItem('sk_docs_path','auth-for-saas')}catch(e){}"
  >
    <span class="panel-badge">For SaaS developers</span>
    <span class="panel-icon">🏗️</span>
    <p class="panel-label">I'm building a SaaS product that needs auth</p>
    <p class="panel-desc">SSO, SCIM directory sync, and full user management for B2B apps</p>
    <span class="panel-cta">Start with SaaS Auth →</span>
  </a>
</div>
```

- [ ] **Step 2: Verify the gateway renders**

```bash
pnpm dev
```

Open `http://localhost:4321/` and verify:

- Split panel fills the viewport below the header
- Both panels are visible with correct copy
- No sidebar, no secondary nav, no table of contents
- Hovering over a panel expands it (desktop)

- [ ] **Step 3: Verify the localStorage redirect**

In browser DevTools console:

```js
localStorage.setItem('sk_docs_path', 'agent-actions')
```

Reload `http://localhost:4321/` — should immediately redirect to `/home/agent-actions/` without showing the gateway.

```js
localStorage.setItem('sk_docs_path', 'auth-for-saas')
```

Reload — should redirect to `/home/auth-for-saas/`.

```js
localStorage.removeItem('sk_docs_path')
```

Reload — should show the gateway again.

- [ ] **Step 4: Verify mobile layout**

In DevTools, toggle device emulation to a mobile size (375px width). Confirm panels stack vertically — agent panel on top, SaaS panel below, each filling half the viewport height.

- [ ] **Step 5: Commit**

```bash
git add src/content/docs/index.mdx
git commit -m "feat: add gateway split-panel page at /"
```

---

## Task 5: Audit and update internal links to `/`

Any link in the codebase that pointed to `/` intending "agent home" now needs to point to `/home/agent-actions/`. The gateway at `/` is a routing surface, not a content destination.

- [ ] **Step 1: Find all internal references to `/` that mean "agent home"**

```bash
grep -rn 'href="/"' src/
grep -rn "href: '/'" src/
grep -rn "link: '/'" src/
grep -rn "'/'," src/configs/
```

- [ ] **Step 2: Inspect results**

The `sidebar.config.ts` line `'/guides': '/'` in `redirects.config.ts` redirects `/guides` → `/` which is now the gateway — that is intentional (gateway is the new root). No change needed there.

The `redirects.config.ts` entry `'/index-old': '/'` — also intentional, old index redirects to the new gateway root. No change needed.

Check any results in `src/components/` or `src/configs/` that link to `/` as a navigation destination meaning "go to the agent docs". The `HeaderProductToggle.astro` links to `/agent-auth/quickstart/` and `/authenticate/fsa/quickstart/` — no change needed.

Update any link that means "back to the agent homepage" to `/home/agent-actions/` instead of `/`.

- [ ] **Step 3: Run build to catch broken links**

```bash
pnpm build
```

The `starlightLinksValidator` plugin runs during build and will flag any broken internal links. Fix any reported errors.

- [ ] **Step 4: Commit any link updates found**

```bash
git add -p
git commit -m "fix: update internal links from / to /home/agent-actions/"
```

(Skip this commit if no changes were needed.)

---

## Task 6: Final verification

- [ ] **Step 1: Full build**

```bash
pnpm build
```

Expected: zero errors, zero broken link warnings.

- [ ] **Step 2: Smoke test the three pages**

Start the preview server:

```bash
pnpm preview
```

Verify:

- `http://localhost:4321/` — gateway renders, hover works, clicking "Agent Auth" stores `sk_docs_path=agent-actions` and navigates to `/home/agent-actions/`
- `http://localhost:4321/home/agent-actions/` — renders the current agent homepage content (steps, connectors grid)
- `http://localhost:4321/home/auth-for-saas/` — renders the stub with "Get started with SaaS auth" button

- [ ] **Step 3: Verify localStorage redirect round-trip**

1. Clear localStorage (`localStorage.clear()` in console)
2. Visit `/` — see gateway
3. Click "Start with Agent Auth →" — stored, redirected to `/home/agent-actions/`
4. Navigate back to `/` — immediately redirected back to `/home/agent-actions/` without seeing gateway
5. Repeat for SaaS path

- [ ] **Step 4: Final commit if any cleanup needed**

```bash
git add -p
git commit -m "chore: final cleanup for gateway landing implementation"
```
