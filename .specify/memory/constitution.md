<!--
Sync Impact Report:
- Version change: 1.1.2 → 1.2.0 (MINOR: Inlined writing-standards guidance into constitution; CLAUDE.md now points to constitution as single source of truth)
- Modified principles:
  - III. Content Structure and Standards - Expanded Writing Standards with style, content, and template rules previously stored in src/writing-standards/*
  - Development Workflow - Clarified environment, architecture, and content organization based on workflows.md
- Added sections:
  - Document types and templates (how-to, API reference, concept, release notes)
  - Frontmatter and content structure rules (opening paragraphs, headings, lists, markdown conventions)
  - Code example technical standards (multi-language tabs, Expressive Code usage, security documentation)
- Removed sections: None
- Templates requiring updates:
  ✅ plan-template.md - No changes needed (constitution check remains valid)
  ✅ spec-template.md - No changes needed (structure compatible)
  ✅ tasks-template.md - No changes needed (task organization compatible)
- Follow-up TODOs: None
-->

# Scalekit Documentation Constitution

## Core Principles

### I. Documentation-First Development

Every feature must include comprehensive, user-focused documentation. Documentation is not an afterthought but a first-class deliverable that guides implementation. All code changes require corresponding documentation updates. User scenarios drive both feature development and documentation structure.

**Rationale**: As a documentation site, content quality and user experience are paramount to the project's success.

### II. Multi-Language SDK Consistency

All code examples MUST include Node.js, Python, Go, and Java implementations with consistent variable naming conventions. Examples must show both success and error handling paths. Security implications must be explained for each implementation.

**90% Rule**: Approximately 90% of code examples MUST include all four languages (Node.js, Python, Go, Java). Exceptions are allowed for API reference documentation where cURL requests or SDK-less language-specific snippets may be used, but these MUST be accurate and clearly documented.

**Rationale**: Scalekit serves diverse developer communities, and inconsistent examples reduce adoption and increase support burden.

### III. Content Structure and Standards (NON-NEGOTIABLE)

Every document must follow the established template structure with proper frontmatter, semantic organization, and clear user journeys. Style guide adherence is mandatory - voice must be confident, direct, collaborative, and instructional using second person perspective.

**Journey-Focused Documentation**: Product-based documentation (MCP Auth, Agent Auth, Full Stack Auth, Modular SCIM, Modular SSO) MUST follow a journey-focused approach. Each product represents a developer's journey toward implementing authentication in their projects. Documentation must guide developers through this journey from initial setup to production deployment.

**Rationale**: Consistency in structure and voice builds user trust and reduces cognitive load when navigating the documentation. Journey-focused content ensures developers can follow a logical progression from concept to implementation.

### IV. Technical Accuracy and Security

All technical content must be validated through testing. Security implications must be clearly documented. API examples must be current and functional. Authentication and integration examples must follow security best practices.

**Rationale**: Incorrect documentation can compromise user security and erode platform trust.

### V. Performance and Build Quality

Build processes must succeed without errors or warnings. Formatting and linting standards are enforced through git hooks. All dependencies must be properly managed and regularly updated to maintain site performance.

**Rationale**: Documentation sites must load quickly and reliably, especially for developer audiences who expect high performance.

## Content Quality Standards

### Writing Standards

All content must follow the writing, content, and technical standards defined in this constitution. External helper files in `src/writing-standards/` are optional references, not additional sources of truth. Style checks must pass before publication.

The writing philosophy follows the principles in “What makes documentation good” (ted-docs philosophy) and the internal tw-guide. The following rules are NON-NEGOTIABLE for authored docs:

- **Make docs easy to skim**:
  - Split content into clear sections with descriptive, sentence-style titles that convey meaning without requiring the following paragraph.
  - Include a table of contents for documents with multiple sections to help readers locate information quickly.
  - Keep paragraphs short; isolate critical points in their own short paragraphs where helpful.
  - Begin sections and paragraphs with standalone topic sentences that preview the content and do not depend on prior text.
  - Put the topic words at the beginning of topic sentences to support fast skimming.
  - Put the key takeaways and results at the top of documents and sections rather than building up slowly.
  - Use bullets and tables generously to structure information.
  - Bold important text to highlight key concepts and decisions.

- **Write well**:
  - Keep sentences simple, right-branching, and unambiguous; avoid complex left-branching structures.
  - Avoid ambiguous noun stacks and demonstrative pronouns like “this” or “that” when the referent is not explicit in the same sentence.
  - Maintain strict consistency in terminology, formatting, and style so readers do not get distracted by anomalies.
  - Do not presume the reader’s state of mind or intentions; avoid phrases like “Now you probably want to…” and instead use direct, instructional language.

- **Be broadly helpful**:
  - Write more simply than you think you need to; optimize for readers who are new to the domain or not native English speakers.
  - Avoid abbreviations and jargon unless they are clearly defined on first use; prefer specific, accurate terminology.
  - Proactively address common setup and configuration problems (for example, installing SDKs, configuring environment variables) even if many readers already know how.
  - Keep code examples simple, self-contained, and exportable; minimize dependencies and cross-references to other documents.
  - Prioritize topics and explanations by value and frequency of use; avoid investing heavily in rare-edge-case topics while common questions remain under-documented.
  - Never teach bad habits or insecure patterns (for example, never hard-code secrets or API keys in examples).
  - Introduce narrow topics with a brief, broad opening that grounds the concept in familiar real-world scenarios when this improves comprehension.

- **Break rules intentionally**:
  - Authors MAY deviate from the above patterns only when doing so clearly improves reader comprehension or solves a specific user problem.
  - Any deviation should still respect clarity, security, and consistency with the overall documentation system.

- **Google tw-guide alignment**:
  - Use terms consistently across documents; do not introduce multiple names for the same concept.
  - Avoid ambiguous pronouns; prefer repeating the concrete noun when needed for clarity.
  - Prefer active voice to passive voice and pick specific, concrete verbs over vague ones.
  - Focus each sentence on a single idea and convert overloaded sentences into lists where appropriate.
  - Use numbered lists for ordered procedures and bulleted lists when order is not important; keep list items grammatically parallel and start numbered items with imperative verbs.
  - Introduce lists and tables with a clear lead-in sentence that ends with a colon.
  - Craft opening sentences for paragraphs that clearly establish the central point and keep each paragraph focused on a single topic.
  - Define the document’s scope and, when useful, non-scope so readers know what is and is not covered.
  - State the intended audience and prerequisites explicitly, and ensure content is tailored to that audience’s needs and goals.
  - Prefer task-based headings and disclose information progressively, especially in longer or more complex documents.

- **Document types and templates**:
  - Every documentation page MUST fit one primary type and follow its recommended structure (flexibly where noted):
    - **How-to guide**: Task-oriented; includes Overview, Prerequisites, Procedure (with `<Steps>`), Verify, Next Steps, and optional FAQs.
    - **API reference**: Endpoint-focused; includes Endpoint Summary, Authentication, Base URL, Parameters, Request, Response, and Errors (with tables).
    - **Concept page**: Explanatory; includes Overview, How it works, Key concepts, Use cases, Trade-offs (where relevant), Best practices, and Related guides.
    - **Release notes / change log**: Versioned changes; includes Summary, detailed change sections (Added/Changed/Deprecated/Removed/Fixed/Security), Breaking changes, Migration guide, and Upgrade instructions.
  - Use tables for parameters and error formats in API reference pages with consistent column sets and concise descriptions.
  - For concept pages, define key terms explicitly under a “Key concepts” section when terminology is central to understanding.

- **Frontmatter and content structure**:
  - Every page MUST include frontmatter with at least: `title`, `description`, and `sidebar.label`; `title` ≤ 60 characters and `description` ≤ 160 characters.
  - Use `sidebar.order` only when navigation ordering matters; keep labels shorter than titles.
  - Use `prev`/`next` for sequential guides to create explicit learning paths; use `seeAlso` for related guides without interrupting main flow.
  - Enable `tableOfContents` for longer pages with multiple major sections.
  - Opening paragraphs (1–3) MUST state what users will accomplish, when/why they need it, and preview the workflow using direct instructional language.
  - Page organization SHOULD follow: opening context, optional collapsible supplementary sections, main content sections, and a closing “next steps” or summary.
  - Use H2 for major sections, H3 for subsections, and H4 only inside `<Steps>`; never use H1 in body content and avoid nesting beyond H4.
  - Use numbered lists only inside `<Steps>` for ordered procedures; use bulleted lists for unordered information and keep list items grammatically parallel.
  - Introduce lists and tables with a clear lead-in sentence ending with a colon.

- **Markdown and formatting conventions**:
  - Use bold for first mention of important terms, UI elements, and dashboard paths (for example, **Dashboard > Authentication > Session Policy**), not for general emphasis.
  - Use inline code for technical identifiers: variables, functions, endpoints, scopes, environment variables, file paths, and placeholders.
  - Use meaningful link text; never use “click here” or “this” as link labels.
  - Always include headers in tables; keep cell content concise and readable.
  - Prefer fenced code blocks with language identifiers for all code; never use screenshots of code.
  - Ensure code examples are runnable (or clearly marked as placeholders) and include error handling where appropriate.

### Variable Naming Conventions

- Node.js: `scalekit`
- Python: `scalekit_client`
- Go: `scalekitClient`
- Java: `scalekitClient`

These naming conventions are NON-NEGOTIABLE across all documentation and examples.

### Code Examples

All code examples must use `<Tabs syncKey="tech-stack">` format for multi-language SDK samples and include security comments explaining potential threats. Both success and error paths must be demonstrated.

Code example standards:

- Authors MUST provide examples in Node.js, Python, Go, and Java for at least 90% of SDK-related snippets; remaining examples MUST still be accurate and justified (for example, cURL-only API reference samples).
- Use language tabs with clear framework titles (for example, `title="Express.js"`, `title="Flask"`, `title="Gin"`, `title="Spring Boot"`).
- Use Expressive Code features (line highlighting, `collapse`, `wrap`, `frame="terminal"`, and markers) to emphasize key lines while hiding boilerplate.
- Keep examples full and working: include imports (collapsible if noisy), realistic data, success and error paths, and environment-aware configuration.
- Security comments MUST state the threat, why the pattern is required, and what can go wrong if omitted.
- Token examples SHOULD use tabs to separate decoded ID token and access token payloads and clearly label claims such as organization ID, user ID, and permissions.

## Development Workflow

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

### Content Organization

Documentation must be organized into logical sections (FSA, SSO, Directory/SCIM, Connect, M2M, Guides, Reference) with proper sidebar configuration and navigation structure.

### Navigation Structure

**Left Sidebar**: Configured via `src/configs/sidebar.config.ts`. This file controls the left navigation menu structure and topic mappings.

**Secondary Navigation**: Managed through `src/components/overrides/Header.astro` and `src/components/SecondaryNav.astro`. Secondary navigation provides top-level topic switching and dropdown menus for product categories.

**Navigation Updates**: Changes to navigation structure MUST be coordinated across both sidebar and secondary nav configurations to maintain consistency.

### Journey-Focused Documentation Approach

Product documentation (MCP Auth, Agent Auth, Full Stack Auth, Modular SCIM, Modular SSO) MUST be structured as developer journeys. Each journey should:

- Start with clear value proposition and when to use the feature
- Guide developers through implementation steps
- Follow logical progression from setup to production
- Reference existing journey-focused documentation (particularly FSA) for style consistency
- Use phrasing aligned with Ted Philosophy (`src/writing-standards/.claude-core.md`) or tw-guide standards

### API Reference Workflow

API reference documentation follows a distinct workflow:

1. **Source of Truth**: API specifications are generated from the `scalekit-inc/scalekit` repository
2. **Spec Location**: Generated OpenAPI/Swagger specs MUST be placed in `public/api/` directory
3. **Temporary Changes**: Direct edits to spec files in `public/api/` are temporary and will be overwritten by future generated files
4. **Permanent Changes**: All API reference changes MUST be made in the `scalekit-inc/scalekit` repository, not directly in this documentation repository

**Rationale**: API reference documentation must remain synchronized with the actual API implementation. Direct edits create maintenance burden and synchronization issues.

### Adding New Concepts

Before creating new documentation articles:

1. **Check Existing Content**: Verify if an existing article can be updated or appended to include the new concept
2. **Journey Alignment**: Ensure the concept fits within the developer journey for the relevant product
3. **Avoid Duplication**: If the concept duplicates existing journey content, do not create a new article
4. **Cookbook Alternative**: If the concept does not fit the journey or duplicates content, recommend creating a cookbook entry instead (contact saif@scalekit.com for cookbook guidance)

**Rationale**: Maintaining a focused, non-duplicative documentation structure improves discoverability and reduces maintenance overhead.

### Integration Guides Maintenance

Integration guides located in `src/content/docs/guides/integrations/` MUST be kept synchronized with their index pages:

- `src/content/docs/guides/integrations/index.mdx` - Main integrations overview
- `src/content/docs/guides/integrations/sso-integrations/index.mdx` - SSO integrations index
- `src/content/docs/guides/integrations/social-connections/index.mdx` - Social connections index
- `src/content/docs/guides/integrations/scim-integrations/index.mdx` - SCIM integrations index

**Template Components**: Reusable content components in `src/components/templates/` (files starting with `_`) MUST be used and maintained for consistency across integration guides.

**Rationale**: Integration guides serve as entry points for developers. Keeping index pages synchronized ensures discoverability and accurate navigation.

## Governance

### Amendment Process

Constitution changes require:

1. Documentation of the proposed change and rationale
2. Impact analysis on existing content and templates
3. Version increment following semantic versioning
4. Update of all dependent artifacts and templates

### Compliance Review

All feature specifications and implementation plans must verify constitutional compliance. Violations require explicit justification in the "Complexity Tracking" section with simpler alternatives documented.

**Version**: 1.2.0 | **Ratified**: 2026-02-06 | **Last Amended**: 2026-02-09
