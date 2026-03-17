# Cookbook authoring guide

Cookbooks live at `src/content/docs/cookbooks/` and are published at `/cookbooks/`. They are powered by the `starlight-blog` plugin (configured with `prefix: 'cookbooks'` in `astro.config.mjs`).

This document covers how to author, review, and validate a cookbook entry.

---

## What a cookbook is

A cookbook is a practical, developer-focused guide that solves one specific real-world problem. It is not a feature announcement, a product tour, or a reference page.

The best cookbooks share knowledge, not features. They are useful even for developers who have not yet adopted Scalekit. Each cookbook should be independently useful — a developer should be able to land on one recipe, solve their problem, and continue without reading anything else.

**Cookbooks are not:**

- "How Scalekit works" explanations (those belong in concept pages)
- Step-by-step quickstarts for first-time setup (those belong in guides)
- API reference documentation

**Cookbooks are:**

- Recipes for solving a specific implementation problem
- Pattern guides developers can adapt to their own projects
- Deep dives into real tradeoffs, gotchas, and working code

### Two layers of content

Every cookbook belongs to one of two layers:

**Layer 1 — Orientation**: Mental models, architecture maps, prerequisites, recommended learning paths. Explains _why_ a pattern matters before showing how to implement it. Use this layer when the reader needs context before they can act.

**Layer 2 — Recipes**: Concrete implementation tasks with working code, expected outcomes, failure modes, and production notes. Use this layer when the reader knows what they want to build and just needs the how.

Most cookbooks are Layer 2. A cookbook may contain both layers — a brief orientation section followed by one or more recipes.

---

## The P.A.T. framework

Every cookbook must be structured around three layers:

1. **Problem** — Start from the real developer pain, workflow, or use case. What is hard or broken without this recipe?
2. **Angle** — Give a clear point of view on the solution. Why this approach? What makes it better than the alternatives?
3. **Teach** — Teach step by step with code, explanations, expected outcomes, common mistakes, and extensions.

Apply P.A.T. to the cookbook as a whole and to each major section.

---

## File structure

Create a new `.mdx` file in `src/content/docs/cookbooks/`:

```
src/content/docs/cookbooks/<slug>.mdx
```

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

---

## Required frontmatter

The frontmatter schema is enforced by `starlight-blog`. Use this exact structure — field names and types must match.

```yaml
---
title: 'Verb-first title describing what the developer builds (≤60 chars)'
description: 'One sentence: the problem solved and the outcome (≤160 chars)'
date: YYYY-MM-DD
tags: ['tag-one', 'tag-two']
excerpt: >
  2–3 sentence teaser that states the core problem, the approach, and why it matters.
  This appears on the cookbooks index page.
featured: false
# Optional: include a cover image for featured cookbooks
cover:
  alt: 'Descriptive alt text for the cover image'
  image: ../../../../assets/blog/covers/<filename>.jpg
authors:
  - name: 'Author Name'
    title: 'Role'
    url: 'https://linkedin.com/in/...'
    picture: '/images/blog/authors/<filename>.jpg'
---
```

**Field rules:**

| Field               | Required | Notes                                                                           |
| ------------------- | -------- | ------------------------------------------------------------------------------- |
| `title`             | Yes      | ≤60 chars, verb-first, sentence case                                            |
| `description`       | Yes      | ≤160 chars, states problem and outcome                                          |
| `date`              | Yes      | `YYYY-MM-DD` format                                                             |
| `tags`              | Yes      | Array of strings; use vocabulary below                                          |
| `excerpt`           | Yes      | 2–3 sentences; appears on `/cookbooks/` index                                   |
| `featured`          | Yes      | `true` or `false`; featured cookbooks appear prominently                        |
| `cover`             | No       | Include only when `featured: true`; image path is relative to the cookbook file |
| `authors`           | Yes      | Array; at least one author required                                             |
| `authors[].name`    | Yes      | Full name                                                                       |
| `authors[].title`   | Yes      | Role or job title                                                               |
| `authors[].url`     | Yes      | LinkedIn or personal URL                                                        |
| `authors[].picture` | Yes      | Path under `/images/blog/authors/`; file must exist in `public/`                |

**Cover image path:** relative to the `.mdx` file. For `src/content/docs/cookbooks/<name>.mdx`, the path to `src/assets/blog/covers/<name>.jpg` is `../../../../assets/blog/covers/<name>.jpg`.

**Real examples from existing cookbooks:**

```yaml
# implement-nextjs-auth.mdx
title: 'Implementing Passwordless Auth in Next.js 15'
description: "Add magic link and OTP authentication to your Next.js application using Scalekit's headless API."
date: 2025-02-19
tags: ['Full stack auth', 'Next.js']
featured: false
```

```yaml
# building-custom-org-switcher.mdx (featured, with cover)
title: 'Building a Custom Organization Switcher'
description: 'Learn how to build your own organization switcher UI for complete control over multi-tenant user experiences.'
date: 2025-01-21
tags: ['Full stack auth']
featured: true
cover:
  alt: 'Modern desk setup with laptop and workspace accessories'
  image: ../../../../assets/blog/covers/custom-org-switcher.jpg
```

**Tag vocabulary** (use existing tags for consistency):

- Product area: `Full stack auth`, `SSO`, `SCIM`, `Agent auth`, `M2M`
- Framework/language: `Next.js`, `Node.js`, `Python`, `Go`, `Java`, `Spring Boot`
- Pattern: `JWT`, `OAuth`, `Webhooks`, `API keys`

---

## Content structure

Follow this order. Every section is required unless marked optional.

### Opening (no heading)

2–4 sentences immediately after the frontmatter. State:

- The concrete developer context (framework, pattern, use case)
- Why this is hard without the recipe
- What the cookbook teaches

Do not start with "In this guide" or "Welcome to". Start with the problem or the context.

### The problem

Use heading `## The problem`. Describe the specific pain points the developer faces. Use a bulleted list with **bolded pain point** — explanation format. Be concrete. Name the exact failure modes, error types, or architectural mismatches.

**Combined opening**: When the audience and pain points are tightly coupled, you can merge the opening paragraph, problem bullets, and audience callout into a single unnumbered intro block — no separate `## The problem` or `## Who needs this` headings needed. Use this when the cookbook is focused enough that every reader faces the same problem. The combined block should still cover: context, concrete pain points, and a one- or two-line scope statement ("this is for X; if you're doing Y, see Z").

### Who needs this (optional but recommended)

Use heading `## Who needs this`. Two short lists:

- Checkmark bullets for the intended audience
- X bullets for who should look elsewhere

This reduces support noise and increases relevance for the right reader. Omit this section when audience and scope are already clear from the combined opening.

### The solution

Use heading `## The solution`. Before any code: explain the approach in 2–4 sentences. Name the specific APIs, methods, or patterns you will use and why they fit the problem.

### Implementation

Use heading `## Implementation`. Break into numbered H3 subsections (`### 1. Step name`). Each step should:

- Have a clear, task-oriented title
- Include working code (see code standards below)
- Explain what the code does and why — not just paste it
- Note security implications where relevant

### Testing and verification (optional but recommended)

Use heading `## Testing`. Show the developer how to verify the implementation works. Include expected output, curl commands, test assertions, or screenshots where appropriate.

### Common mistakes

Use heading `## Common mistakes`. Bulleted list of the 3–5 most frequent errors, each with:

- The symptom or error message
- The cause
- The fix

### Production notes (optional but recommended)

Use heading `## Production notes`. Capture what changes between a working prototype and a production deployment. Include:

- Failure modes specific to production scale or load
- Security hardening steps not covered in the main implementation
- Monitoring and observability hooks
- When not to use this pattern

### Next steps

Use heading `## Next steps`. 3–5 links or actions the developer can take to go deeper or extend the recipe.

---

## Code standards

All code in cookbooks must follow the project-wide standards from `CLAUDE.md`. Key rules for cookbooks:

- **Multi-language**: Use `<Tabs syncKey="tech-stack">` with all four SDK languages (Node.js, Python, Go, Java) for at least 90% of SDK-related code blocks.
- **SDK variable names**: `scalekit` (Node.js), `scalekit_client` (Python), `scalekitClient` (Go/Java) — non-negotiable.
- **Working code**: Examples must be runnable or clearly marked as illustrative pseudocode.
- **No hardcoded secrets**: Always use environment variables. Add a comment explaining why.
- **Error handling**: Show the failure path alongside the happy path.

---

## Authoring checklist

Use this before submitting a cookbook for review.

### Content

- [ ] Title is verb-first, task-focused, ≤60 characters
- [ ] Description states the problem and outcome, ≤160 characters
- [ ] Excerpt is 2–3 sentences, no hype or filler
- [ ] Opening paragraph states context, difficulty, and what reader will learn
- [ ] P.A.T. structure is present: problem → angle → teach
- [ ] "The problem" section uses concrete pain points, not vague descriptions
- [ ] Solution is explained before code, not just introduced by it
- [ ] Each implementation step has a task-oriented heading
- [ ] Common mistakes section exists

### Code

- [ ] All code uses correct SDK variable names (`scalekit`, `scalekit_client`, `scalekitClient`)
- [ ] SDK examples cover all four languages (90% rule)
- [ ] No hardcoded secrets
- [ ] Error paths are shown
- [ ] Code compiles or is clearly marked pseudocode

### Writing

- [ ] Sentence case for all headings
- [ ] No "just", "simply", "obviously", "we're excited"
- [ ] Active voice throughout
- [ ] Second person ("you") for instructions
- [ ] Present tense ("this method returns" not "will return")
- [ ] Technical terms defined on first use
- [ ] Links use descriptive text (not "click here")

### Frontmatter

- [ ] `title`, `description`, `date`, `tags`, `excerpt`, `authors` all present
- [ ] Tags match existing vocabulary
- [ ] Author photo exists at the specified path

---

## Review checklist

Use this when reviewing a cookbook authored by someone else.

### P.A.T. pass

- [ ] Can you identify the exact problem in the first two paragraphs?
- [ ] Is the angle (why this approach) stated, not implied?
- [ ] Does the teach section teach — or just show code?

### Accuracy pass

- [ ] Code examples have been tested against the current SDK
- [ ] API method names match current SDK docs
- [ ] Environment variable names are consistent with other cookbooks
- [ ] No steps assume undocumented behavior

### Audience pass

- [ ] Would a developer new to Scalekit understand this?
- [ ] Are prerequisites explicitly stated?
- [ ] Does it avoid assuming reader knows internal Scalekit architecture?

### Quality pass

- [ ] Does every section earn its place? Remove anything that doesn't add value.
- [ ] Are the "Common mistakes" real mistakes, or invented edge cases?
- [ ] Does the cookbook feel like it was written by someone who solved this problem, or like it was written to explain a feature?

---

## Prompt for AI-assisted authoring

When using an AI assistant to draft or rewrite a cookbook, use the following prompt. Provide your rough draft after the prompt.

```text
You are a senior technical content strategist and developer education writer.

PRIMARY DIRECTIVE

Transform my rough draft into a task-oriented developer cookbook for src/content/docs/cookbooks/.

This cookbook must:
- help developers accomplish a specific, concrete implementation task,
- teach through example-backed, implementation-oriented content,
- separate any orientation context from hands-on recipes,
- use task-first naming throughout,
- and be independently useful — a developer should land on this, solve the problem, and move on.

Apply the P.A.T. framework to the whole cookbook and to each major section:
1. Problem — Start from the real developer pain point
2. Angle — Give a clear point of view on why this approach
3. Teach — Teach step by step with code, explanations, outcomes, and failure modes

STRUCTURE DIRECTIVE

Build the cookbook in up to three layers (use only the layers the content actually needs):

1. Orientation (if needed)
   - What problem this cookbook solves
   - Who it is for and who should look elsewhere
   - Mental model or architecture overview
   - Recommended reading path

2. Core concept (if the implementation pattern needs explaining first)
   - Why this pattern exists
   - Tradeoffs vs alternatives
   - Security boundaries

3. Recipes (required)
   For each recipe, include:
   - Title (task-oriented, sounds like a search query)
   - The problem this solves
   - When to use it
   - Inputs / prerequisites
   - Step-by-step implementation
   - Code walkthrough (not just code dump)
   - Expected outcome
   - What could go wrong
   - Production notes
   - Related recipes

NAMING RULES

Name recipes and titles like concrete developer tasks:
- "Set up agent auth locally"
- "Pass user context through an auth layer"
- "Validate identity before tool execution"
- "Handle token refresh for long-running agent sessions"
- "Debug failed OAuth flows in Python"

Avoid abstract theme titles like "Authentication concepts" or "Token handling."

REPOSITORY REFERENCE

For agent auth cookbooks, use as source of truth:
https://github.com/scalekit-developers/agent-auth-examples
(README.md, AGENTS.md, javascript/*, python/*)

Extract reusable patterns from the repo — don't just summarize files.
Call out where JavaScript and Python implementations meaningfully differ.

WRITING RULES

- Share knowledge, not features
- Prefer one language as the primary walkthrough when clarity matters; show the other language only where the implementation differs
- No hype, no vague claims, no marketing copy
- Useful even for someone who has not yet adopted Scalekit
- Optimize for bookmarking: each recipe should stand alone

SCALEKIT CODE CONVENTIONS

- SDK variable names (non-negotiable): scalekit (Node.js), scalekit_client (Python), scalekitClient (Go/Java)
- Use <Tabs syncKey="tech-stack"> for multi-language blocks
- No hardcoded secrets; use environment variables with a comment explaining why
- Show error paths alongside the happy path

OUTPUT FORMAT

Return in this order:

1. Positioning
   - 3 title options (verb-first, task-focused, ≤60 chars each)
   - Recommended title + one-sentence promise
   - Target audience

2. Proposed structure
   - Table of contents
   - One-line purpose for each section

3. Rewritten draft
   - Full MDX with correct frontmatter (title, description, date, tags, excerpt, featured, authors — cover only if featured: true)
   - P.A.T. structure throughout
   - Multi-language code tabs where applicable
   - Production notes and failure modes for each recipe

4. Editorial notes
   - What you changed and why
   - Weak spots in the original draft
   - Missing material to add
   - Where real test output or additional examples would strengthen it

Quality bar: the final result should feel like a practitioner wrote it from experience — something a developer would bookmark and return to.

---

Audience context (fill in before pasting):
- Who is this for:
- Desired outcome:
- Constraints or scope limits:

---

Here is my first draft:

[PASTE DRAFT HERE]
```

---

## Publishing

Cookbooks are automatically listed at `/cookbooks/` once the `.mdx` file is committed and built. No sidebar configuration is needed — `starlight-blog` handles discovery and pagination.

To feature a cookbook on the index page, set `featured: true` in frontmatter.

Authors appear on the cookbook detail page. Author photos should be placed in `public/images/blog/authors/` before the cookbook is published.
