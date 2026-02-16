# Architecture Research

**Domain:** Technical Documentation Sites (Astro + Starlight)
**Researched:** 2025-02-16
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   Content Creation Layer                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  MDX Pages  │  │   Assets    │  │  Components │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
├────────┴────────────────┴────────────────┴─────────────────┤
│                   Build & Config Layer                      │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Astro + Starlight (SSG + Routing + Theme)          │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Sidebar    │  │  Plugins    │  │  Overrides  │         │
│  │  Config     │  │  (Search,   │  │  (Components)│       │
│  │             │  │   Zoom,     │  │             │         │
│  │             │  │   Topics)   │  │             │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
├─────────┴────────────────┴────────────────┴────────────────┤
│                   Runtime Layer                             │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │  Sidebar  │  │  Header  │  │  Footer  │                   │
│  │  Nav      │  │  (Logo,  │  │  (Links) │                   │
│  │  (Hierar- │  │   Theme) │  │          │                   │
│  │   chical) │  │          │  │          │                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │  Page Layout │  │  Navigation  │                         │
│  │  (Content +  │  │  (Prev/Next) │                         │
│  │   TOC +      │  │   Breadcrumbs)│                        │
│  │   See Also)  │  │              │                         │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component               | Responsibility                                      | Typical Implementation                           |
| ----------------------- | --------------------------------------------------- | ------------------------------------------------ |
| **MDX Content Files**   | Authorable documentation pages with frontmatter     | Markdown + JSX components in `src/content/docs/` |
| **Sidebar Config**      | Hierarchical navigation structure and grouping      | TypeScript array with nested items               |
| **Frontmatter**         | Page metadata (title, description, navigation, SEO) | YAML at top of MDX files                         |
| **Page Overrides**      | Customized UI components for specific branding      | Astro components in `src/components/overrides/`  |
| **Starlight Plugins**   | Extended functionality (search, zoom, topics)       | Configured in `astro.config.mjs`                 |
| **Route Middleware**    | Dynamic data injection (OG images, TOC)             | `src/routeData.ts` or similar                    |
| **See Also Components** | Cross-references between related pages              | Custom components reading frontmatter            |

## Recommended Project Structure

```
src/
├── content/docs/           # Documentation pages (MDX)
│   ├── [section]/          # Logical groupings (e.g., authenticate, fsa)
│   │   ├── guide.mdx       # Tutorial/how-to content
│   │   ├── concept.mdx     # Explanatory content
│   │   └── reference.mdx   # API or technical reference
│   ├── browse/             # Non-sequential content
│   │   └── code-samples/   # Examples and demos
│   └── reference/          # Glossary, webhooks, connectors
├── components/             # Custom Astro components
│   ├── overrides/          # Starlight component overrides
│   │   ├── PageSidebar.astro     # TOC + See Also
│   │   ├── Header.astro          # Logo, navigation
│   │   ├── Footer.astro          # Links, copyright
│   │   └── MarkdownContent.astro # Content rendering
│   └── ui/                 # Reusable UI components
│       └── SeeAlso.astro   # Related links section
├── configs/                # Site-wide configuration
│   ├── sidebar.config.ts   # Navigation structure
│   ├── sidebar-utils.ts    # Helper functions
│   └── redirects.config.ts # URL redirects
├── writing-standards/      # Content guidelines
│   ├── style-guide.md      # Voice, tone, formatting
│   ├── document-templates.md  # Page type patterns
│   ├── technical-guidelines.md # Code example standards
│   └── content-standards.md    # Structure requirements
├── routeData.ts            # Middleware for data injection
└── styles/                 # Custom CSS
```

### Structure Rationale

- **`content/docs/`:** Hierarchical organization mirrors user journey (quickstart → implementation → advanced)
- **`components/overrides/`:** Separates customizations from Starlight defaults for easy updates
- **`configs/`:** Centralizes navigation and redirects for maintainability
- **`writing-standards/`:** Modular guides for performance and team onboarding
- **`routeData.ts`:** Injection point for dynamic metadata without modifying content files

## Architectural Patterns

### Pattern 1: Hierarchical Navigation

**What:** Sidebar config defines nested groups that guide users through logical learning paths
**When to use:** When documentation has sequential learning stages (quickstart → implementation → reference)
**Trade-offs:**

- Pros: Clear mental model, easy to discover related content
- Cons: Can become unwieldy if too deep; requires careful grouping

**Example:**

```typescript
export const sidebar = [
  {
    label: 'Full stack auth',
    id: 'authenticate',
    link: '/authenticate/fsa/quickstart/',
    items: [
      {
        label: 'Getting started',
        items: [
          'authenticate/set-up-scalekit',
          { label: 'Quickstart', link: 'authenticate/fsa/quickstart' },
        ],
      },
      {
        label: 'User authentication',
        collapsed: false,
        items: ['authenticate/fsa/implement-login', 'authenticate/fsa/manage-session'],
      },
    ],
  },
]
```

### Pattern 2: Component Override System

**What:** Replace Starlight's default components with custom versions for branding or functionality
**When to use:** When you need custom behavior in Sidebar, Header, Footer, or content rendering
**Trade-offs:**

- Pros: Full control over UI without forking the theme
- Cons: Must maintain compatibility with Starlight updates

**Example:**

```typescript
// astro.config.mjs
components: {
  Head: './src/components/overrides/Head.astro',
  Header: './src/components/overrides/Header.astro',
  Footer: './src/components/overrides/Footer.astro',
  PageSidebar: './src/components/overrides/PageSidebar.astro',
}
```

### Pattern 3: Frontmatter-Driven Navigation

**What:** Use frontmatter fields (`prev`, `next`, `seeAlso`) to create contextual navigation
**When to use:** When pages should have linear progression or related content suggestions
**Trade-offs:**

- Pros: No code changes needed to adjust navigation; content-authorable
- Cons: Requires frontmatter consistency across pages

**Example:**

```yaml
---
title: Implement login
description: Add authentication to your application
sidebar:
  label: Implement login
  prev: /authenticate/fsa/quickstart/
  next: /authenticate/fsa/manage-session/
seeAlso:
  label: Related guides
  items:
    - title: Manage auth methods
      url: /authenticate/auth-methods/
---
```

### Pattern 4: Route Middleware for Dynamic Data

**What:** Inject runtime data (OG images, TOC modifications) via middleware
**When to use:** When you need page-specific data calculated at build time
**Trade-offs:**

- Pros: Keeps content files clean; reusable logic
- Cons: Requires understanding of Starlight's data flow

**Example:**

```typescript
// src/routeData.ts
import { defineRouteMiddleware } from '@astrojs/starlight/route-data'

export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals
  const slug = context.locals.starlightRoute.id || 'index'
  const ogImageUrl = new URL(`/og/${slug}.png`, context.site)

  // Inject OG image tags
  const { head } = context.locals.starlightRoute
  head.push({
    tag: 'meta',
    attrs: { property: 'og:image', content: ogImageUrl.href },
  })
})
```

## Data Flow

### Navigation Flow

```
User clicks sidebar link
    ↓
Astro route matches URL pattern (/authenticate/fsa/quickstart/)
    ↓
Starlight loads MDX file (src/content/docs/authenticate/fsa/quickstart.mdx)
    ↓
Frontmatter parsed → Starlight generates page metadata
    ↓
Route middleware (routeData.ts) → Injects OG images, modifies TOC
    ↓
Page overrides render → Custom Header, Footer, PageSidebar
    ↓
PageSidebar reads seeAlso from frontmatter → Renders related links
    ↓
Content rendered → MDX converted to HTML with component substitutions
    ↓
Page delivered to browser
```

### See Also Data Flow

```
MDX frontmatter
    ↓ (defined in page)
{
  seeAlso: {
    label: "Related guides",
    items: [{ title: "...", url: "..." }]
  }
}
    ↓ (accessed by routeData.ts)
Astro.locals.starlightRoute.data.seeAlso
    ↓ (passed to PageSidebar component)
PageSidebar.astro → SeeAlso component
    ↓ (renders links in sidebar)
[Related Guides section in right sidebar]
```

### Prev/Next Navigation Data Flow

```
Sidebar config
    ↓ (defines hierarchical structure)
{
  items: [
    { label: "Quickstart", link: "/authenticate/fsa/quickstart/" },
    { label: "Implement login", link: "/authenticate/fsa/implement-login/" },
  ]
}
    ↓ (Starlight auto-calculates prev/next based on sidebar order)
OR
    ↓ (explicit override via frontmatter)
{
  sidebar: {
    prev: "/authenticate/fsa/quickstart/",
    next: "/authenticate/fsa/manage-session/"
  }
}
    ↓ (rendered by Starlight's default components)
[Previous] [Next] buttons in page footer
```

## Scaling Considerations

| Scale         | Architecture Adjustments                                                    |
| ------------- | --------------------------------------------------------------------------- |
| 0-50 pages    | Monolithic sidebar config, flat structure                                   |
| 50-200 pages  | Grouped sections, collapsed groups, search essential                        |
| 200-500 pages | Topic-based navigation, redirects for old URLs, link validation             |
| 500+ pages    | Automated content organization, A/B testing, analytics-driven restructuring |

### Scaling Priorities

1. **First bottleneck:** Navigation depth
   - Problem: Sidebar becomes unwieldy with >50 pages per section
   - Fix: Use `collapsed: true` for subgroups, implement topic-based plugins

2. **Second bottleneck:** Content discovery
   - Problem: Users can't find relevant content as docs grow
   - Fix: Implement DocSearch, add `seeAlso` to more pages, improve tagging

3. **Third bottleneck:** Maintenance overhead
   - Problem: Frontmatter inconsistencies across many pages
   - Fix: Automated linting for frontmatter, ESLint rules for structure

## Anti-Patterns

### Anti-Pattern 1: Deeply Nested Navigation

**What people do:** Creating 4-5 levels of nested sidebar items
**Why it's wrong:** Users get lost, can't see where they are, mobile experience suffers
**Do this instead:**

- Max 3 levels of depth (Section > Group > Page)
- Use `collapsed: true` to reduce visual complexity
- Consider reorganizing into separate top-level sections

### Anti-Pattern 2: Inconsistent Frontmatter

**What people do:** Some pages have `prev`/`next`, others don't; `seeAlso` formats vary
**Why it's wrong:** Breaks user journey, inconsistent navigation leads to dead ends
**Do this instead:**

- Define frontmatter templates for each page type
- Use ESLint rules or pre-commit hooks to enforce consistency
- Document frontmatter requirements in writing standards

### Anti-Pattern 3: Hard-Coding Links in Content

**What people do:** Writing `See also: [other page](/path/to/page)` inline
**Why it's wrong:** Links break when pages move; no central management of related content
**Do this instead:**

- Use `seeAlso` frontmatter for related content
- Use Starlight's `[LinkCard](/path/)` component for cross-references
- Run link validation plugins (`starlight-links-validator`)

### Anti-Pattern 4: Missing Context in Opening Paragraphs

**What people do:** Jumping straight into code without explaining what users will accomplish
**Why it's wrong:** Users don't know if they're in the right place, higher bounce rate
**Do this instead:**

- Start with 1-3 opening paragraphs
- Explain what users will accomplish
- Provide context about when/why they need this
- Preview key concepts

## Integration Points

### External Services

| Service                 | Integration Pattern            | Notes                                        |
| ----------------------- | ------------------------------ | -------------------------------------------- |
| DocSearch (Algolia)     | Starlight plugin configuration | Requires `appId`, `apiKey`, `indexName`      |
| Analytics (PostHog, GA) | Custom `<script>` tags in head | Use route middleware for user identification |
| Custom domain           | Netlify/Cloudflare DNS mapping | Update base URLs in config                   |

### Internal Boundaries

| Boundary                             | Communication                         | Notes                                        |
| ------------------------------------ | ------------------------------------- | -------------------------------------------- |
| Sidebar Config ↔ MDX Frontmatter     | Auto-calculation vs explicit override | Explicit frontmatter overrides sidebar order |
| Route Middleware ↔ Page Components   | Astro.locals context                  | Middleware injects data, components read it  |
| Writing Standards ↔ Content Creation | Human process (reviews/linting)       | Automated enforcement via ESLint/Stylelint   |

## Component Boundaries for Scalekit

### Content Layer

**Boundary:** MDX files are authorable content, not code
**Connection:** Frontmatter connects to navigation and overrides
**Interaction:**

- MDX imports components: `import { Tabs, TabItem } from '@astrojs/starlight/components'`
- MDX exports frontmatter: Read by Starlight and route middleware

### Navigation Layer

**Boundary:** Sidebar config defines structure, frontmatter defines context
**Connection:**

- Sidebar config: `sidebar.config.ts` → Hierarchical grouping
- Frontmatter: `prev`, `next`, `seeAlso` → Page-specific navigation
  **Interaction:** Starlight merges sidebar structure with frontmatter overrides to generate final navigation

### UI Component Layer

**Boundary:** Overrides extend Starlight defaults, don't replace core logic
**Connection:**

- `PageSidebar.astro` wraps default, adds `SeeAlso` component
- Route middleware injects data into `Astro.locals.starlightRoute`
  **Interaction:** Components read data from props and context, render custom UI

### Data Flow Direction

```
Sidebar Config (static)
    ↓ (defines hierarchy)
Frontmatter (page-level)
    ↓ (overrides context)
Route Middleware (build-time)
    ↓ (injects metadata)
Starlight Core (build)
    ↓ (generates pages)
Overrides (render-time)
    ↓ (customizes UI)
Browser (user)
    ↓ (navigates pages)
Analytics (feedback loop)
    ↓ (informs improvements)
Writing Standards (process)
```

## Build Order for Improvements

### Phase 1: Foundation (Do First)

1. **Establish writing standards** → Enables consistency
   - Create/refine style guide
   - Define frontmatter templates
   - Document component patterns

2. **Fix navigation structure** → Enables discoverability
   - Audit sidebar config for logical grouping
   - Add `prev`/`next` to key pages
   - Fix broken links

### Phase 2: Content Quality (Depends on Phase 1)

3. **Standardize opening paragraphs** → Requires writing standards
   - Add context paragraphs to all pages
   - Ensure "what users will accomplish" is clear
   - Add problem/solution framing

4. **Add code examples** → Requires structure consistency
   - Implement 4-language Tabs where appropriate
   - Add security context in code comments
   - Include success/error paths

### Phase 3: Cross-References (Depends on Phase 2)

5. **Add seeAlso sections** → Requires content inventory
   - Audit related content across sections
   - Add `seeAlso` frontmatter to pages
   - Use `SeeAlso` component consistently

6. **Improve transitions** → Requires page-to-page understanding
   - Add transition phrases between sections
   - Ensure logical flow from prev → next
   - Link to related concepts inline

### Phase 4: Polish (Depends on Phase 3)

7. **Validate consistency** → Requires baseline to compare against
   - Run link validation plugin
   - Lint frontmatter for compliance
   - Audit voice/tone across pages

8. **Optimize for scale** → Requires stable content base
   - Implement topic-based navigation
   - Add redirects for old URLs
   - Set up analytics tracking

## Sources

- [Astro Documentation](https://docs.astro.build/)
- [Starlight Documentation](https://starlight.astro.build/)
- [MDX Specification](https://mdxjs.com/)
- [Diátaxis Framework](https://diataxis.fr/) - Documentation types (tutorials, how-to, explanation, reference)
- [Google Technical Writing One](https://developers.google.com/tech-writing/one)

---

_Architecture research for: Technical Documentation Sites_
_Researched: 2025-02-16_
