# Content Structure and Formatting Standards

## Frontmatter Standards

Every documentation page should include appropriate frontmatter. Focus on clarity rather than completeness.

### Essential Fields

```yaml
---
title: 'Clear, descriptive title' # Essential - max 60 characters
description: 'Concise description explaining what this page covers' # Essential - max 160 characters
sidebar:
  label: 'Short sidebar label' # Essential - shorter than title
  order: 42 # Include if ordering matters in navigation
tags: [auth, sso, api, oauth2.1, tokens] # Helpful for search and categorization
---
```

**Guidance:**

- Always include title and description
- Include sidebar label (can be same as title if not too long)
- Add order only when you need specific positioning
- Tags are helpful but not mandatory for all pages

### Conditional Fields

**For Sequential Guides (How-to Guides):**

```yaml
prev:
  label: 'Previous guide name'
  link: '/path/to/previous/'
next:
  label: 'Next guide name'
  link: '/path/to/next/'
```

**For Related Documentation:**

```yaml
seeAlso:
  label: 'Related guides' # or "See also"
  expanded: false # or true for default open
  items:
    - title: 'Related guide title'
      icon: 'book' # icon options: book, rocket, star, puzzle, document
      url: '/path/to/guide/'
```

**For Long Pages:**

```yaml
tableOfContents: true # Shows automatic TOC
```

**For Custom Heading Sizes:**

```yaml
head:
  - tag: style
    content: |
      .sl-markdown-content h2 {
        font-size: var(--sl-text-xl);
      }
      .sl-markdown-content h3 {
        font-size: var(--sl-text-lg);
      }
```

### Frontmatter Rules

1. `title` must be ≤60 characters and describe the page's purpose
2. `description` must be ≤160 characters and explain what users will learn
3. `sidebar.label` should be shorter than `title` for navigation clarity
4. `sidebar.order` determines position in navigation (lower numbers first)
5. `tags` should include 3-6 relevant terms for search and categorization
6. Use `prev`/`next` for sequential guides to create learning paths
7. Use `seeAlso` to link related documentation without disrupting main flow

## Content Structure

### Opening Paragraphs

Most pages should begin with 1-3 paragraphs that:

1. Explain what users will accomplish
2. Provide context about when/why they need this
3. Preview key concepts or workflow
4. Use direct, instructional language

**Flexible Approach:**

- Some content (like API references) can start more directly
- Adjust length based on complexity
- Focus on helping users understand quickly if they're in the right place

**Example:**

```markdown
Login initiation begins your authentication flow. You redirect users to Scalekit's hosted login page by creating an authorization URL with appropriate parameters.

This guide shows you how to construct the authorization URL, handle the redirect, and validate the response. After completing this guide, you'll have a working login flow that redirects users to authenticate through Scalekit.
```

### Page Organization

1. **Opening context paragraph** (1-3 paragraphs)
2. **Collapsible supplementary sections** (optional) - Use `<details>` for:
   - Sequence diagrams
   - Video demonstrations
   - Data models
   - Extended JSON examples
3. **Main content sections** - Using appropriate heading hierarchy
4. **Closing paragraph** - Preview next steps or summarize key points

### Collapsible Sections

Use `<details>` for supplementary content that shouldn't interrupt the main flow:

```mdx
<details>
<summary><IconTdesignSequence style="display: inline; width: 1rem; height: 1rem; vertical-align: middle; margin-right: 0.5rem;" /> Review the authentication sequence</summary>

[Diagram or detailed content here]

</details>
```

**Common Collapsible Section Icons:**

- `<IconTdesignSequence>` - Sequence diagrams
- `<IconLucidePlay>` - Video demonstrations
- `<IconMaterialSymbolsArticlePersonRounded>` - Data models
- `<IconLucideFileJson>` - JSON examples

## Markdown Conventions

### Heading Hierarchy

- ✅ Use H2 (`##`) for major sections
- ✅ Use H3 (`###`) for subsections
- ✅ Use H4 (`####`) for sub-steps within `<Steps>` component only
- ❌ Never use H1 in body content (comes from frontmatter `title`)
- ❌ Do not exceed H4 nesting

### Lists

- Use **bulleted lists** for unordered features, capabilities, options
- Use **numbered lists** ONLY within `<Steps>` component for procedures
- Keep list items parallel in grammatical structure
- Limit to 6-8 items per list; break into subsections if longer
- End each item with consistent punctuation (or none)

### Links

- Use meaningful link text (not "click here" or "this")
- For file references: `[filename.ts](src/filename.ts)`
- For specific lines: `[filename.ts:42](src/filename.ts#L42)`
- For line ranges: `[filename.ts:42-51](src/filename.ts#L42-L51)`
- For folders: `[src/utils/](src/utils/)`

### Tables

- Always include header row
- Use markdown format (no inline HTML)
- Align columns with pipes
- Keep cell content concise (≤100 characters)

### Code Blocks

- Always use fenced code blocks with language identifier
- Never use screenshots of code
- Show complete, runnable examples (or clear placeholders)
- Include error handling examples

## Text Formatting Standards

### Bold (`**text**`)

- Important terms on **first mention**
- UI elements: Click the **Save** button
- Dashboard paths: **Dashboard > Authentication > Session Policy**
- ❌ Do not use for emphasis in regular sentences

### Inline Code (`` `text` ``)

- Technical terms: `accessToken`, `refreshToken`, `idToken`
- Variable names: `req`, `res`, `user`
- Function/method names: `authenticateWithCode()`, `validateAccessToken()`
- Endpoints: `/auth/callback`, `/oauth/authorize`
- Scopes: `openid`, `profile`, `email`, `offline_access`
- Environment variables: `SCALEKIT_CLIENT_ID`, `NODE_ENV`
- File paths: `src/config/auth.ts`
- Placeholders: `<SCALEKIT_ENVIRONMENT_URL>`, `<CALLBACK_URL>`

### Technical Term Definitions

- Define unfamiliar terms briefly when first used
- Example: "Use the access token (a JWT that proves user authentication) to make API requests"

### Italics (`_text_`)

- Rarely used; prefer bold or code formatting

## Dashboard References

When referencing the Scalekit dashboard, use this exact format:

**Dashboard > Section > Subsection > Field**

**Examples:**

- Navigate to **Dashboard > Developers > Settings > API Credentials**
- Find your callback URLs in **Dashboard > Authentication > Redirect URLs**
- Configure session duration in **Dashboard > Authentication > Session Policy**
- Create roles in **Dashboard > Roles & Permissions > Roles**
