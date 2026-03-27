# CLAUDE.md - Scalekit Documentation Guide

## Overview

This file is the **single source of truth** for all documentation standards and AI assistant guidelines in this repository. All documentation must adhere to the rules defined below.

---

## Core Principles

### Documentation-first development

Every feature must include comprehensive, user-focused documentation. Documentation is not an afterthought but a first-class deliverable that guides implementation. All code changes require corresponding documentation updates.

### Git Commits

- Do NOT include `Co-Authored-By` lines in commit messages

### SDK variable names (critical)

> **CRITICAL**: Use the exact variable names below in all documentation and code examples.

- Node.js: `scalekit`
- Python: `scalekit_client`
- Go: `scalekitClient`
- Java: `scalekitClient`

### Multi-Language SDK Consistency

All code examples MUST include Node.js, Python, Go, and Java implementations with consistent variable naming conventions. Examples must show both success and error handling paths. Security implications must be explained for each implementation.

**90% Rule**: Approximately 90% of code examples MUST include all four languages (Node.js, Python, Go, Java). Exceptions are allowed for API reference documentation where cURL requests or SDK-less language-specific snippets may be used.

### Journey-Focused Documentation

Product-based documentation (MCP Auth, Agent Auth, Full Stack Auth, Modular SCIM, Modular SSO) MUST follow a journey-focused approach. Each product represents a developer's journey toward implementing authentication in their projects.

### Technical Accuracy and Security

All technical content must be validated through testing. Security implications must be clearly documented. API examples must be current and functional. Authentication and integration examples must follow security best practices.

---

## Writing Standards

All content must follow the standards below. These rules are NON-NEGOTIABLE for authored docs.

### Make docs easy to skim

- Split content into clear sections with descriptive, sentence-style titles that convey meaning without requiring the following paragraph
- Include a table of contents for documents with multiple sections
- Keep paragraphs short; isolate critical points in their own short paragraphs
- Begin sections and paragraphs with standalone topic sentences that preview content
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

### Language and tone

- **Audience-first**: Explain what matters to a developer trying to get work done
- **Direct and concise**: Short sentences. Prefer clarity over flourish
- **Active voice**: "Run the command" not "The command should be run"
- **Second person**: Address the reader as "you" when giving instructions
- **Present tense**: "This command installs…" not "This command will install…"
- **Neutral, professional**: Avoid hype, slang, and filler words like "simply", "just", "obviously"
- **Consistent terminology**: Use the same terms throughout a page. Prefer standard names over synonyms
- **Explain security implications**: Always state threats when relevant

### Phrasing patterns

- **Imperative for procedures**: "Install", "Create", "Run", "Configure", "Test"
- **Front-load the action**: Start sentences with the verb or key concept
- **Explain why when useful**: Briefly justify non-obvious steps
- **Prefer examples over theory**: Show the common path first; link to details
- **One idea per sentence/paragraph**: Improves skimmability

### Titles, subtitles, and headings

- **Sentence case** for all titles and headings
- **Short, descriptive page titles**: 3–7 words when possible
- **Headings describe outcomes**, not categories
  - Good: "Run a script"
  - Bad: "Scripts"
- **Subheadings** clarify purpose or scope, not marketing
- **Avoid gerunds in headings** when an imperative works: prefer "Configure proxies" over "Configuring proxies"

### Sidebar labels (navigation)

- **Concise and scannable**: 1–3 words
- **Sentence case**; no punctuation
- **Outcome- or object-focused**: "Install", "CLI", "HTTP server", "Permissions"
- **Match page title semantics**, but shorter when useful

### Do and don't

- **Do**: "Install Deno with Homebrew."
- **Don't**: "We'll just quickly install Deno with Homebrew!"
- **Do**: "Run a script with permissions."
- **Don't**: "Running your scripts and stuff."
- **Do**: "Configure proxies"
- **Don't**: "Proxy configuration settings explained"

---

## Document Types and Templates

Every documentation page MUST fit one primary type and follow its recommended structure:

### How-to Guide

Task-oriented; includes Overview, Prerequisites, Procedure (with `<Steps>`), Verify, optional Next Steps, and optional FAQs. The "Next Steps" section may be omitted when the frontmatter `prev`/`next` links already provide contextual navigation to related pages.

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
- Page organization SHOULD follow: opening context, optional collapsible supplementary sections, main content sections, and an optional closing "next steps" or summary. A closing "next steps" section may be omitted when frontmatter `prev`/`next` links already provide contextual navigation
- Use H2 for major sections, H3 for subsections, and H4 only inside `<Steps>`; never use H1 in body content and avoid nesting beyond H4
- Use numbered lists only inside `<Steps>` for ordered procedures; use bulleted lists for unordered information

### Markdown and Formatting Conventions

- Use bold for first mention of important terms, UI elements, and dashboard paths (e.g., **Dashboard > Authentication > Session Policy**)
- Use inline code for technical identifiers: variables, functions, endpoints, scopes, environment variables, file paths, and placeholders
- Use meaningful link text; never use "click here" or "this" as link labels
- Always include headers in tables; keep cell content concise and readable
- Prefer fenced code blocks with language identifiers for all code; never use screenshots of code
- Ensure code examples are runnable (or clearly marked as placeholders) and include error handling where appropriate

### Starlight <Steps> Indentation Rules

The `<Steps>` component requires a single continuous `<ol>`. Any broken indentation splits it into multiple blocks and causes a build error.

**Rules**:

1. Numbered steps must start at column 0 — no leading spaces
   - ❌ WRONG — creates a sub-list, breaks the `<ol>`
   - ✅ CORRECT — steps at column 0

2. Continuation content (images, text) must be indented with exactly 3 spaces
   - ❌ WRONG — image at 4 spaces becomes a new block
   - ✅ CORRECT — 3 spaces keeps it inside the list item

3. Sub-bullet lists under a step use 3 spaces
   - ❌ WRONG — 4 spaces, or blank line before the bullets
   - ✅ CORRECT — 3 spaces, no blank line before bullets

4. A blank line after `<Steps>` is allowed
   - Starlight documents `<Steps>` as wrapping a normal Markdown ordered list
   - The important rule is that the content must still parse as one ordered list

5. Prefer plain Markdown inside `<Steps>`
   - Standard Markdown content inside steps is the most reliable pattern
   - If a procedure contains mostly `<Tabs>` or other JSX-heavy blocks, prefer normal H2 sections instead of `<Steps>`

6. When `<Tabs>` appears inside a step, keep the entire tabs block inside that list item
   - Indent `<Tabs>`, `<TabItem>`, paragraphs, and fenced code blocks consistently under that step
   - If the structure becomes fragile or hard to format, move the tabs block outside `</Steps>` or replace the whole procedure with standard section headings

**Quick mental model**: Treat the entire `<Steps>` block as a single continuous list. All content (steps, continuation text, images, sub-bullets) must be indented to stay within that list structure.

**Safe baseline pattern for `<Steps>`**:

````mdx
<Steps>
1. ## Install dependencies

```bash
pnpm install
```

2. ## Continue with the next step

   Add more content here.

</Steps>
````

Use normal section headings instead of `<Steps>` when the content is mostly `<Tabs>`, long JSX blocks, or multiple embedded components.

### Linking and references

- **Descriptive link text**: "See permission flags" not "click here"
- **Prefer relative links** for internal pages; include anchors for sections
- **Reference APIs consistently**: Backticks for code (`Deno.run`, `--allow-net`)

### Component Usage Patterns

#### Frontmatter enrichment

Beyond the essentials, enrich frontmatter with these patterns for better navigation and SEO:

```yaml
---
title: 'Clear title'
description: 'Concise description'
tags: [authentication, quickstart, sessions]
sidebar:
  label: 'Short label'
  order: 1
  prev:
    label: 'Previous topic'
    link: '/path/to/prev'
  next:
    label: 'Next topic'
    link: '/path/to/next'
  seeAlso:
    expanded: true
    items:
      - title: 'Related resource'
        icon: 'book'
        url: 'https://example.com'
head:
  - tag: style
    content: |
      .sl-markdown-content h2 { font-size: var(--sl-text-xl); }
      .sl-markdown-content h3 { font-size: var(--sl-text-lg); }
tableOfContents: true
---
```

- **`tags`**: Array of relevant keywords for categorization and search
- **`prev`/`next`**: Sequential navigation for journey-based docs
- **`seeAlso`**: Related resources with optional `icon` and `expanded` state
- **`head`**: Custom styles for consistent heading sizing across pages

#### Steps with H2 headings

Inside `<Steps>`, each step should use an H2 heading for clear section breaks:

````mdx
<Steps>
1. ## Install the SDK

Description of what this step accomplishes.

```bash
npm install @scalekit/sdk
```
````

2. ## Configure credentials

   Description of configuration.

   ```bash
   SCALEKIT_CLIENT_ID=your-id
   ```

   </Steps>

````

#### Badge component for required/recommended items

Use `<Badge>` to indicate parameter requirements in tables and inline text:

```mdx
| Parameter | Description |
|-----------|-------------|
| `client_id` | Your application identifier <Badge text="Required" /> |
| `state` | Random string for CSRF protection <Badge text="Recommended" /> |
````

#### Aside component with titles

Always include a `title` attribute for accessibility and clarity:

```mdx
<Aside type="caution" title="Never hard-code secrets">
  Store credentials in environment variables.
</Aside>

<Aside type="tip" title="Match redirect URLs exactly">
  Ensure the URL in code matches dashboard configuration.
</Aside>

<Aside type="note" title="Important claims to validate">
  Always verify `iss`, `aud`, and `exp` claims.
</Aside>
```

#### Details sections for FAQs and demos

Use `<details>` blocks at the end of pages for common scenarios and troubleshooting:

```mdx
## Common scenarios

<details>
<summary>How do I route users to a specific organization?</summary>

Explanation and code example here.

</details>

<details>
<summary>Why am I seeing an invalid_grant error?</summary>

Troubleshooting explanation here.

</details>
```

#### Collapsible supplementary content

Place optional content (demos, sequence diagrams, extended references) in collapsible sections at the top of the page:

```mdx
<details>
<summary>See the authentication sequence</summary>

![Sequence diagram](path/to/image.png)

1. User initiates sign-in
2. Identity verification occurs
3. Session is created

</details>
```

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

**Example**:

````mdx
<Tabs syncKey="tech-stack">
  <TabItem label="Node.js">
```ts
import { Scalekit } from '@scalekit/sdk'

const scalekit = new Scalekit({
clientId: 'your-client-id',
clientSecret: 'your-client-secret',
environment: 'production'
})

// Security: Never hard-code secrets. Use environment variables.
const session = await scalekit.getSession()
console.log(session.user)
````

  </TabItem>
  <TabItem label="Python">
```py
from scalekit import Scalekit

# Security: Store secrets in environment variables

scalekit_client = Scalekit(
client_id="your-client-id",
client_secret="your-client-secret",
environment="production"
)

session = scalekit_client.get_session()
print(session.user)

````
  </TabItem>
  <TabItem label="Go">
```go
package main

import "github.com/scalekit-inc/scalekit-go"

// Security: Use environment variables for credentials
scalekitClient := scalekit.New(scalekit.Config{
    ClientID:     os.Getenv("SCALEKIT_CLIENT_ID"),
    ClientSecret: os.Getenv("SCALEKIT_CLIENT_SECRET"),
    Environment:   "production",
})

session, _ := scalekitClient.GetSession()
fmt.Println(session.User)
````

  </TabItem>
  <TabItem label="Java">
```java
import com.scalekit.Scalekit;

// Security: Use environment variables for credentials
Scalekit scalekitClient = new Scalekit.Builder()
.clientId(System.getenv("SCALEKIT_CLIENT_ID"))
.clientSecret(System.getenv("SCALEKIT_CLIENT_SECRET"))
.environment("production")
.build();

Session session = scalekitClient.getSession();
System.out.println(session.getUser());

```
  </TabItem>
</Tabs>
```

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

**Template Components**: Reusable content components in `src/components/templates/` (files starting with `_`) MUST be used and maintained for consistency across integration guides.

---

## Code Commenting Standards (for inline code comments)

When adding comments to code examples:

### Core Principles

- **Comments should not duplicate the code**: Avoid comments that simply restate what the code does. Comments should add value beyond what's obvious.
- **Good comments do not excuse unclear code**: Don't use comments to explain poorly written code. Instead, use better variable names and structure.
- **Comments should dispel confusion, not cause it**: Ensure comments clarify rather than obscure purpose.
- **Explain unidiomatic code in comments**: Comment on code that might seem unnecessary or redundant; explain why you chose a specific pattern.

### Best Practices

- Use JSDoc/JavaDoc/docstring standards for function, class, and complex logic comments
- Include parameter descriptions, return values, types, and descriptions
- Document exceptions and edge cases
- Include links to external references where helpful (standards, RFCs, official documentation)
- Add comments when fixing bugs; reference issue trackers
- Use standard formats for TODO, FIXME, and NOTE comments

---

## Quality Checklist

Before publishing documentation, verify:

- [ ] Headings and titles use sentence case
- [ ] Page opens with a clear, one-paragraph summary
- [ ] Steps use imperative verbs and are task-focused
- [ ] Examples are runnable and minimal, with contextual titles
- [ ] Sidebar label is concise (1-3 words) and matches the page
- [ ] Links are descriptive; APIs/flags use code formatting
- [ ] Terminology is consistent across the page
- [ ] No filler words ("just", "simply", "basically"), no passive voice where avoidable
- [ ] Code examples include all 4 languages (90% rule)
- [ ] SDK variable names follow the NON-NEGOTIABLE naming convention
- [ ] Security implications are explained where relevant
- [ ] Frontmatter includes title, description, and sidebar.label

---

## Patched Dependencies

This project uses pnpm patches to fix upstream bugs. Before modifying patches or upgrading patched dependencies, read `project-docs/PATCHES.md` for context, removal criteria, and upgrade instructions.

---

## Active Technologies

- MDX (Markdown + JSX), TypeScript 5.x + Astro + Starlight framework, Tailwind CSS
- pnpm for package management
