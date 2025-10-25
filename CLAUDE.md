# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the Scalekit developer documentation site built with Astro and Starlight. It provides comprehensive documentation for Scalekit's authentication and user management platform, including Full Stack Auth (FSA), SSO, SCIM, and API references.

## Development Commands

### Core Commands

- `pnpm dev` - Start development server (no HMR)
- `pnpm start` - Start development server with HMR
- `pnpm build` - Build the documentation site
- `pnpm preview` - Preview the built site locally

### Utility Commands

- `pnpm generate-search-index` - Generate search index for API documentation
- `pnpm reorder-swagger` - Reorder the Swagger/OpenAPI specification
- `pnpm format:check` - Check formatting with Prettier

### Git Hooks

- Git hooks are automatically installed via `postinstall` script
- Pre-commit and pre-push hooks are configured using `simple-git-hooks`
- Hooks run formatting checks before commits

## Architecture

### Framework Stack

- **Astro** - Static site generator with component islands
- **Starlight** - Documentation framework built on Astro
- **Vue 3** - For interactive components (API reference)
- **React** - For some UI components
- **Tailwind CSS** - Styling framework

### Key Directories

- `src/content/docs/` - All documentation content in MDX format
- `src/components/` - Reusable components and Starlight overrides
- `src/configs/` - Configuration files for sidebar and redirects
- `public/api/` - OpenAPI/Swagger specifications
- `scripts/` - Build and utility scripts

### Content Organization

Documentation is organized into main sections:

- **FSA (Full Stack Auth)** - Complete authentication solution
- **SSO** - Single Sign-On integration guides
- **Directory/SCIM** - User provisioning and directory sync
- **Connect** - Agent Connect which sets up auth for users with external applications
- **M2M** - Machine-to-machine authentication
- **Guides** - Integration and setup guides
- **Reference** - API references and technical details

### Configuration Files

- `astro.config.mjs` - Main Astro configuration with Starlight setup
- `src/configs/sidebar.config.ts` - Sidebar navigation structure
- `src/configs/redirects.config.ts` - URL redirects configuration
- `tailwind.config.mjs` - Tailwind CSS configuration

### Component Overrides

Custom Starlight components in `src/components/overrides/`:

- `Head.astro` - Custom head with analytics and iframe detection
- `Header.astro` - Custom header component
- `PageSidebar.astro` - Custom page sidebar
- `Pagination.astro` - Custom pagination component

### Content Structure

- All documentation is written in MDX format
- Content is organized by product area (fsa/, sso/, guides/, etc.)
- API references are generated from OpenAPI specifications
- Images and assets are stored in `src/assets/docs/`

### Build Process

- Astro builds static pages from MDX content
- Starlight provides the documentation framework
- API reference pages are generated using Scalar
- Search index is built for API documentation
- Git hooks ensure code quality before commits

### Styling

- Uses Tailwind CSS for utility-first styling
- Custom theme configuration in `starlight-theme-rapide`
- Responsive design with iframe-specific styling
- Custom fonts (Inter variable) and color schemes

## Key Features

- Multi-language code examples
- API reference with interactive examples
- Image zoom functionality (disabled in iframes)
- Link validation and broken link detection
- Search functionality with API reference integration
- Custom branding and theme

## Documentation Writing Style Guide

### Content Structure

**Frontmatter Standards:**

- Always include `title` and `description`
- Use `sidebar.label` for custom sidebar text
- Set `tableOfContents: true` for longer guides
- Include `seeAlso` section with related resources
- Use `head` section for page-specific styling when needed
- Add `prev` and `next` for navigation flow

**Page Organization:**

- Start with a clear introduction explaining what the guide covers
- Use `<Steps>` component for sequential procedures
- Include collapsible `<details>` sections for:
  - Sequence diagrams (`<IconTdesignSequence>`)
  - Data models (`<IconMaterialSymbolsArticlePersonRounded>`)
  - JSON object examples (`<IconLucideFileJson>`)
  - Video demonstrations (`<IconLucidePlay>`)

### Code Examples

**Multi-Language Support:**

- **ALWAYS** provide code examples in all 4 languages: Node.js, Python, Go, Java
- Use `<Tabs syncKey="tech-stack">` to keep language selection consistent across the page
- Label tabs consistently: `"node"/"Node.js"`, `"python"/"Python"`, `"go"/"Go"`, `"java"/"Java"`

**Code Block Formatting:**

````markdown
```javascript title="Express.js" wrap collapse={1-4} {5-6} "highlightTerm"
// Comments explain what's happening
// Use case: Explain the real-world scenario
const example = 'code'
```
````

````

**Code Block Attributes:**
- `title` - Describe the framework/context (e.g., "Express.js", "Flask", "Gin")
- `wrap` - For long lines that should wrap
- `collapse={lines}` - Hide boilerplate code (imports, setup)
- `{lines}` - Highlight specific lines
- `"term"` - Highlight specific terms
- `showLineNumbers=false` - For simple examples or terminal output
- `frame="terminal"` - For CLI commands

**Code Comments:**
- Explain the purpose of each section
- Include use cases: `// Use case: HR system integration, bulk user imports...`
- Provide context: `// This allows issuing new access tokens without requiring re-authentication`
- Explain security implications: `// Prevents JavaScript access to mitigate XSS attacks`

### Writing Tone and Voice

**Core Principles:**
- Use direct, instructional language ("This guide shows you how to...")
- Write in second person ("your application", "you receive")
- Keep sentences clear and concise
- Explain the **why**, not just the **how**
- Focus on developer experience and practical implementation

**Language Patterns:**
- Start sections with action verbs: "Create", "Configure", "Implement", "Manage"
- Use present tense for descriptions: "Scalekit provides...", "The SDK returns..."
- Use future tense for results: "This will redirect users...", "You'll receive..."
- Avoid passive voice when possible

### Technical Content Standards

**Security Emphasis:**
- Always explain security implications (XSS, CSRF, token storage)
- Show proper encryption and secure storage patterns
- Emphasize HTTPS requirements in production
- Include security configuration comments in code

**Complete Examples:**
- Provide full, working code samples (not pseudo-code)
- Include error handling in examples
- Show both success and error paths
- Include necessary imports and setup code (use `collapse` to minimize)

**Real-World Context:**
- Use actual Scalekit terminology: organizations, workspaces, memberships
- Include practical use cases in comments
- Reference dashboard settings and configuration
- Link to API references and related guides

### Components and UI Elements

**Starlight Components:**
- `<Steps>` - Sequential procedures (numbered)
- `<Tabs>` / `<TabItem>` - Multi-language examples
- `<Aside type="tip|note|caution">` - Callouts and warnings
- `<Card>` / `<CardGrid>` - Feature highlights
- `<LinkCard>` - Related documentation
- `<Badge text="Optional|API">` - Content metadata

**Custom Components:**
- `<CheckItem>` - Checklist items
- `<CopyPrompt>` - AI prompt copy buttons
- `<VideoPlayer>` - Embedded demos
- Icons from `~icons/` for visual context

### Formatting Conventions

**Text Formatting:**
- **Bold** - Important terms on first mention, UI elements
- `Code formatting` - Variables, functions, endpoints, file paths, code values
- _Italics_ - Rarely used, prefer bold or code formatting

**Lists and Bullets:**
- Use bullets for features, capabilities, or unordered items
- Use numbered lists only within `<Steps>` component
- Keep list items parallel in structure

**Code and Technical Terms:**
- Format as code: `accessToken`, `offline_access`, `/auth/callback`
- API endpoints: `https://<SCALEKIT_ENVIRONMENT_URL>/oauth/authorize`
- Environment variables: `SCALEKIT_CLIENT_ID`
- Dashboard paths: **Dashboard > Authentication > Session Policy**

### Data Models and Examples

**Visual Representations:**
- Use D2 diagrams for data models and relationships
- Include tooltip explanations in diagrams
- Show cardinality (1:1, 1:N) for relationships

**JSON Examples:**
- Provide complete object examples in collapsible sections
- Use realistic example data
- Include all relevant fields with type examples
- Add comments or descriptions for complex fields

### SDK Variable Naming Standards

**Consistent Variable Names:**
Always use these exact variable names for Scalekit SDK clients across all documentation:

- **Node.js**: `scalekit`
- **Python**: `scalekit_client`
- **Go**: `scalekitClient`
- **Java**: `scalekitClient`

**Rationale:**
- Node.js: Simple and follows JavaScript conventions
- Python: Follows snake_case convention for variables
- Go & Java: Uses camelCase, descriptive and clear

**Implementation:**
- All code examples must use these exact variable names
- Reference the installation guide rather than re-instantiating clients
- Maintain consistency within each language across all guides

### Content Quality Checklist

Before publishing documentation:
- [ ] All code examples include Node.js, Python, Go, and Java versions
- [ ] Code blocks have appropriate attributes (title, wrap, collapse)
- [ ] Security implications are explained
- [ ] Error handling is included in examples
- [ ] Use cases are documented in code comments
- [ ] Links to related docs and API references are included
- [ ] Frontmatter is complete (title, description, sidebar, seeAlso)
- [ ] Visual aids (diagrams, screenshots) are included where helpful
- [ ] Asides highlight important tips, notes, or warnings
- [ ] "Next steps" or related resources are provided at the end
- [ ] SDK variable names follow the established standards

## Cursor Rules

For consistent development and documentation:

```typescript
// Scalekit SDK variable naming standards
const scalekit = new ScalekitClient(); // Node.js
const scalekit_client = ScalekitClient(); // Python
const scalekitClient = new ScalekitClient(); // Go & Java

// Always reference installation guide for client setup
// Avoid re-instantiating clients in code examples
// Use established variable names consistently
````
