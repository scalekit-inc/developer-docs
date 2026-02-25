# CLAUDE.md - Scalekit Documentation Guide

## Overview

This file is a quick reference for how the AI assistant should work in this repo. The **single source of truth** for documentation rules is the project constitution at `.specify/memory/constitution.md`. The older modular guides under `src/writing-standards/` are now optional references only; all enforceable standards have been inlined into the constitution.

When in doubt, follow the constitution exactly. Do not introduce new rules that conflict with it.

---

## Core Principles

### Documentation-First Development

### Git Commits

- Do NOT include `Co-Authored-By` lines in commit messages

### SDK Variable Names (CRITICAL)
Every feature must include comprehensive, user-focused documentation. Documentation is not an afterthought but a first-class deliverable that guides implementation. All code changes require corresponding documentation updates.

### Multi-Language SDK Consistency

All code examples MUST include Node.js, Python, Go, and Java implementations with consistent variable naming conventions. Examples must show both success and error handling paths. Security implications must be explained for each implementation.

**90% Rule**: Approximately 90% of code examples MUST include all four languages (Node.js, Python, Go, Java).

### Journey-Focused Documentation

Product-based documentation (MCP Auth, Agent Auth, Full Stack Auth, Modular SCIM, Modular SSO) MUST follow a journey-focused approach. Each product represents a developer's journey toward implementing authentication in their projects.

### Technical Accuracy and Security

All technical content must be validated through testing. Security implications must be clearly documented. API examples must be current and functional. Authentication and integration examples must follow security best practices.

---

## Writing Standards

All content must follow the writing, content, and technical standards defined in the constitution. The following rules are NON-NEGOTIABLE for authored docs:

### Make docs easy to skim

- Split content into clear sections with descriptive, sentence-style titles that convey meaning without requiring the following paragraph
- Include a table of contents for documents with multiple sections
- Keep paragraphs short; isolate critical points in their own short paragraphs
- Begin sections and paragraphs with standalone topic sentences that preview the content
- Put the topic words at the beginning of topic sentences to support fast skimming
- Put the key takeaways and results at the top of documents and sections
- Use bullets and tables generously to structure information
- Bold important text to highlight key concepts and decisions

### Write well

- Keep sentences simple, right-branching, and unambiguous
- Avoid ambiguous noun stacks and demonstrative pronouns like "this" or "that" when the referent is not explicit
- Maintain strict consistency in terminology, formatting, and style
- Do not presume the reader's state of mind or intentions; use direct, instructional language

### Be broadly helpful

- Write more simply than you think you need to; optimize for readers who are new to the domain
- Avoid abbreviations and jargon unless they are clearly defined on first use
- Proactively address common setup and configuration problems
- Keep code examples simple, self-contained, and exportable
- Prioritize topics and explanations by value and frequency of use
- Never teach bad habits or insecure patterns (never hard-code secrets or API keys)

### Google tw-guide alignment

- Use terms consistently across documents
- Avoid ambiguous pronouns; prefer repeating the concrete noun when needed for clarity
- Prefer active voice to passive voice
- Focus each sentence on a single idea
- Use numbered lists for ordered procedures and bulleted lists when order is not important
- Introduce lists and tables with a clear lead-in sentence that ends with a colon
- Craft opening sentences for paragraphs that clearly establish the central point

### Voice and Tone

- Voice: Confident, direct, collaborative, instructional
- Person: Second person ("you", "your application")
- Tense: Present for descriptions, imperative for instructions
- Explain security implications and threats

---

## Document Types and Templates

Every documentation page MUST fit one primary type and follow its recommended structure:

### How-to Guide

Task-oriented; includes Overview, Prerequisites, Procedure (with `<Steps>`), Verify, Next Steps, and optional FAQs.

### API Reference

Endpoint-focused; includes Endpoint Summary, Authentication, Base URL, Parameters, Request, Response, and Errors (with tables).

### Concept Page

Explanatory; includes Overview, How it works, Key concepts, Use cases, Trade-offs (where relevant), Best practices, and Related guides.

### Release Notes / Change Log

Versioned changes; includes Summary, detailed change sections (Added/Changed/Deprecated/Removed/Fixed/Security), Breaking changes, Migration guide, and Upgrade instructions.

---

## Frontmatter and Content Structure

### Frontmatter Essentials

Every page MUST include frontmatter with at least: `title`, `description`, and `sidebar.label`.

```yaml
---
title: 'Clear title (≤60 chars)'
description: 'Concise description (≤160 chars)'
sidebar:
  label: 'Short label'
  order: 42
  prev:
    label: 'Previous page'
    link: '/path/to/previous'
  next:
    label: 'Next page'
    link: '/path/to/next'
  seeAlso:
    label: 'See also'
    links:
      - label: 'Related guide'
        link: '/path/to/related'
tags: [auth, sso, api]
tableOfContents: true
---
```

**Requirements**:

- `title` ≤ 60 characters and `description` ≤ 160 characters
- Use `sidebar.order` only when navigation ordering matters
- Keep labels shorter than titles (1-3 words)
- Use `prev`/`next` for sequential guides; use `seeAlso` for related guides
- Enable `tableOfContents` for longer pages with multiple major sections

### Content Organization

- Opening paragraphs (1–3) MUST state what users will accomplish, when/why they need it, and preview the workflow using direct instructional language
- Page organization SHOULD follow: opening context, optional collapsible supplementary sections, main content sections, and a closing "next steps" or summary
- Use H2 for major sections, H3 for subsections, and H4 only inside `<Steps>`; never use H1 in body content and avoid nesting beyond H4
- Use numbered lists only inside `<Steps>` for ordered procedures; use bulleted lists for unordered information

### Markdown and Formatting Conventions

- Use bold for first mention of important terms, UI elements, and dashboard paths (e.g., **Dashboard > Authentication > Session Policy**)
- Use inline code for technical identifiers: variables, functions, endpoints, scopes, environment variables, file paths, and placeholders
- Use meaningful link text; never use "click here" or "this" as link labels
- Always include headers in tables; keep cell content concise and readable
- Prefer fenced code blocks with language identifiers for all code; never use screenshots of code
- Ensure code examples are runnable (or clearly marked as placeholders) and include error handling where appropriate

---

## Technical Requirements

### SDK Variable Names (NON-NEGOTIABLE)

- Node.js: `scalekit`
- Python: `scalekit_client`
- Go: `scalekitClient`
- Java: `scalekitClient`

These naming conventions must be followed across all documentation and examples.

### Code Examples

All code examples must use `<Tabs syncKey="tech-stack">` format for multi-language SDK samples.

**Requirements**:

- Must include all 4 languages (Node.js, Python, Go, Java) for at least 90% of SDK-related snippets
- Use language tabs with clear framework titles
- Use Expressive Code features (line highlighting, `collapse`, `wrap`, `frame="terminal"`, markers)
- Keep examples full and working: include imports (collapsible if noisy), realistic data, success and error paths
- Security comments MUST state the threat, why the pattern is required, and what can go wrong if omitted
- Token examples SHOULD use tabs to separate decoded ID token and access token payloads

### Build and Quality Gates

All changes must pass:

- Format checking with Prettier
- Build process without errors
- Git hook validations
- Content structure validation

### Environment Standards

- Use `pnpm` for package management
- Follow Astro + Starlight framework conventions
- Maintain compatibility with Tailwind CSS styling
- Ensure Vue 3 and React component compatibility

---

## Development Workflow

### Content Organization

Documentation must be organized into logical sections (FSA, SSO, Directory/SCIM, Connect, M2M, Guides, Reference) with proper sidebar configuration and navigation structure.

### Navigation Structure

- **Left Sidebar**: Configured via `src/configs/sidebar.config.ts`
- **Secondary Navigation**: Managed through `src/components/overrides/Header.astro` and `src/components/SecondaryNav.astro`
- Changes to navigation structure MUST be coordinated across both configurations

### API Reference Workflow

1. **Source of Truth**: API specifications are generated from the `scalekit-inc/scalekit` repository
2. **Spec Location**: Generated OpenAPI/Swagger specs MUST be placed in `public/api/` directory
3. **Temporary Changes**: Direct edits to spec files in `public/api/` are temporary and will be overwritten
4. **Permanent Changes**: All API reference changes MUST be made in the `scalekit-inc/scalekit` repository

### Adding New Concepts

Before creating new documentation articles:

1. **Check Existing Content**: Verify if an existing article can be updated or appended
2. **Journey Alignment**: Ensure the concept fits within the developer journey for the relevant product
3. **Avoid Duplication**: If the concept duplicates existing journey content, do not create a new article
4. **Cookbook Alternative**: If the concept does not fit the journey or duplicates content, recommend creating a cookbook entry

### Integration Guides Maintenance

Integration guides located in `src/content/docs/guides/integrations/` MUST be kept synchronized with their index pages:

- `src/content/docs/guides/integrations/index.mdx` - Main integrations overview
- `src/content/docs/guides/integrations/sso-integrations/index.mdx` - SSO integrations index
- `src/content/docs/guides/integrations/social-connections/index.mdx` - Social connections index
- `src/content/docs/guides/integrations/scim-integrations/index.mdx` - SCIM integrations index

---

## Active Technologies

- MDX (Markdown + JSX), TypeScript 5.x + Astro + Starlight framework, Tailwind CSS
- pnpm for package management

---

**This optimized file serves as a quick reference. For detailed guidelines, see the constitution at `.specify/memory/constitution.md`.**
