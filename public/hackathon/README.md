# Hackathon hub (`/hackathon`)

Self-contained landing page for hackathon participants.

**Live path:** `https://docs.scalekit.com/hackathon/`

## How to update this page

This page is **one full HTML file**. Anyone (including Claude, Cursor, or another coding agent) can regenerate it and replace the file wholesale.

1. Generate or edit a **complete self-contained HTML document** (all CSS, markup, and JS in one file).
2. **Replace** `public/hackathon/index.html` entirely — paste the whole file over the old one.
3. Open a PR against `main`.

No MDX, no Astro components, no build config, and no companion CSS/JS files.

`src/pages/hackathon.ts` only serves this HTML at `/hackathon`. Do not put page content there — replace `index.html` only.

### Self-contained rules

Keep these so a full-file paste still works:

- Inline `<style>` and `<script>` in the same file
- No sibling assets required (logo must be inline SVG or an absolute URL)
- Fonts via CDN `<link>` only (optional)
- Prefer absolute links for docs, app, Slack, and pricing

### Product constraints

Do not remove free-plan / no-coupon messaging without product sign-off.

## Preview

```bash
pnpm start
# open http://localhost:4321/hackathon/
```

You can also open `index.html` directly in a browser (file open / drag-and-drop) to verify the page works without the docs app.

Deploy preview after a PR:

`https://deploy-preview-{PR_NUMBER}--scalekit-starlight.netlify.app/hackathon/`

## Sections in the page

| Anchor       | Content                             |
| ------------ | ----------------------------------- |
| `#hero`      | Quick start CLI + AgentKit overview |
| `#faq`       | Common questions                    |
| `#steps`     | Get started in 3 steps              |
| `#stuck`     | Common first-call failures          |
| `#resources` | Docs, examples, advanced links      |
| `#build`     | What you can build                  |
| `#start`     | Manual SDK setup (tabs)             |
| `#support`   | Learn & get help                    |
| `#after`     | After the hackathon                 |
| `#more`      | Related Scalekit products           |
