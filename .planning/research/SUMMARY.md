# Project Research Summary

**Project:** Content Quality Improvement Initiative
**Domain:** Technical Documentation Quality (Astro + Starlight)
**Researched:** 2025-02-16
**Confidence:** HIGH

## Executive Summary

This is a documentation quality improvement project for Scalekit's technical documentation site, built on Astro 5.16.15 with Starlight 0.37.4. Research across technical writing best practices, competitor analysis, and Scalekit's existing standards shows that improving documentation quality requires a **pattern-first approach**: analyze existing patterns before writing any content. Experts build high-quality documentation by establishing consistent structure, voice, and cross-references first, then writing content within those constraints.

The recommended approach is a four-phase improvement strategy: (1) Pattern Discovery & Analysis — inventory existing patterns across similar pages before writing; (2) Content Development — improve pages using discovered patterns, focusing on opening context, multi-language code examples, and security documentation; (3) Cross-Reference Integration — add seeAlso sections, prev/next navigation, and ensure smooth transitions; (4) Validation & Polish — run link validation, linting, and quality checks. This approach prevents the most critical pitfalls identified: style drift, opening context disconnect, code incompleteness, security omission, and navigation disruption.

Key risks are highly preventable with proper process: style drift (mitigated by analyzing 3-5 similar pages before writing), missing security context (mitigated by requiring security comments for all auth-related code), and code example gaps (mitigated by using placeholder structures with `[AUTHOR TODO]` when full examples aren't ready). The research shows that Scalekit's existing documentation in the full stack auth section already demonstrates excellent quality patterns — the goal is to extend these patterns to two underperforming pages.

## Key Findings

### Recommended Stack

Scalekit's documentation site uses Astro 5.16.15 with Starlight 0.37.4 as its SSG. For quality maintenance and improvement, the research recommends a combination of AST-based linting, style checking, and link validation tools integrated via pre-commit hooks.

**Core technologies:**

- **remark** (15.x): Markdown linting with AST-based processing — largest plugin ecosystem (150+ plugins), enables sophisticated syntax and structure validation
- **markdownlint** (0.40.0): Markdown style checking — comprehensive 60+ rule set, CommonMark compliant, integrates with most editors and CI
- **Prettier** (3.x): Code and Markdown formatting — industry standard, handles MDX and Markdown GFM, ensures consistent formatting across team
- **cspell** (8.x): Spell checking for documentation — multi-language support, customizable dictionaries, ESLint plugin available, fast for large codebases
- **linkinator** (7.5.3): Link validation for sites and docs — recursively scans sites, checks fragments, CSS URL extraction, handles bot-protection

**Supporting libraries for MDX-heavy content:**

- **remark-preset-lint-consistent** + **remark-preset-lint-recommended**: Best practices for markdown structure
- **remark-gfm**: GitHub Flavored Markdown support for tables, strikethrough, autolinks
- **textlint**: Natural language linting for prose quality, grammar, clarity
- **pre-commit**: Git hooks automation for running quality checks before commit

### Expected Features

Documentation quality has clear table stakes that users expect, and specific differentiators that set excellent docs apart. Scalekit's writing standards establish most of these as requirements.

**Must have (table stakes):**

- **Clear opening paragraphs** (1-3 explaining what users will accomplish) — developers immediately scan to determine if they're in the right place
- **Proper frontmatter** (title ≤60 chars, description ≤160 chars, sidebar label) — essential for SEO, navigation, and discoverability
- **Multi-language code examples** (Node.js, Python, Go, Java) — developers use different tech stacks; forcing them to translate code causes friction
- **Active voice and direct language** (imperative for instructions) — passive voice is harder to follow and creates ambiguity
- **Security documentation** (explain threats and implications) — authentication/authorization docs without security context leave developers vulnerable
- **Dashboard path references** (format: **Dashboard > Section > Subsection**) — developers need to know exactly where to find configuration settings
- **Meaningful link text** (not "click here" or "this") — screen reader users and developers scanning for content miss context
- **Consistent heading hierarchy** (H2, H3, H4 only within Steps) — proper structure aids navigation and understanding content relationships

**Should have (competitive):**

- **Synchronized language tabs** (`syncKey` across multiple code blocks) — developers working across multiple languages stay in sync automatically
- **Badge system for content** (Required, Recommended, Optional, API, New) — quickly signals content importance and nature to scanning developers
- **Collapsible supplementary sections** (sequence diagrams, videos, data models) — keeps main content focused while providing depth when needed
- **Error handling in code examples** — production code must handle errors; examples showing only success path are misleading
- **Code comments explaining real-world use cases** — moves beyond "how" to "when and why" — crucial for production scenarios

**Defer (v2+):**

- **Interactive quickstart tools** — high complexity; requires significant engineering investment
- **AI-optimized prompts** — depends on AI tooling landscape; evaluate as tools mature
- **Advanced code highlighting** (line ranges, term highlighting, collapsible sections) — nice-to-have; requires code analysis infrastructure
- **Video demonstrations** — production and maintenance overhead; prioritize written docs first
- **Diátaxis-aware content organization** — requires architectural restructuring of doc set
- **Deep quality optimization** (anticipating user needs, having flow, feeling good to use) — subjective and requires significant editorial judgment

### Architecture Approach

Astro + Starlight documentation sites follow a layered architecture: Content Layer (MDX files, frontmatter), Build & Config Layer (Astro, Starlight, plugins, overrides), and Runtime Layer (navigation, page layout, components). The most critical pattern for Scalekit is **Frontmatter-Driven Navigation** combined with **Hierarchical Navigation** — sidebar config defines structure, frontmatter defines context, and they merge to generate the final navigation experience.

**Major components:**

1. **MDX Content Files** — Authorable documentation pages with frontmatter in `src/content/docs/`
2. **Sidebar Config** — Hierarchical navigation structure and grouping (TypeScript array with nested items)
3. **Frontmatter** — Page metadata (title, description, navigation, SEO) as YAML at top of MDX files
4. **Page Overrides** — Customized UI components for specific branding in `src/components/overrides/`
5. **Route Middleware** — Dynamic data injection (OG images, TOC modifications) via `src/routeData.ts`
6. **See Also Components** — Cross-references between related pages reading frontmatter

**Key architectural patterns:**

- **Hierarchical Navigation**: Sidebar config defines nested groups (Section > Group > Page) that guide users through logical learning paths
- **Component Override System**: Replace Starlight's default components (Header, Footer, PageSidebar) for custom behavior without forking the theme
- **Frontmatter-Driven Navigation**: Use `prev`, `next`, `seeAlso` fields for page-specific navigation context
- **Route Middleware for Dynamic Data**: Inject runtime data at build time without modifying content files

### Critical Pitfalls

Documentation improvement projects commonly fail when writers improve pages in isolation without analyzing existing patterns. The research identifies seven critical pitfalls, most preventable with proper upfront analysis.

1. **Style drift without cross-reference** — improved pages use different heading structure, terminology, or formatting than established documentation set. **Prevention:** Before improving any page, read 3-5 similar pages in the same section and document the patterns observed (heading hierarchy, frontmatter fields, component usage, terminology).

2. **Opening context disconnect** — improved pages lack opening context paragraphs or use different structure than similar pages. **Prevention:** Every page must have 1-3 opening paragraphs that explain: (1) what users will accomplish, (2) when/why they need this, (3) key concepts preview. Match the style and depth of similar pages exactly.

3. **Code example incompleteness** — improved pages lack code examples, provide examples in only 1-2 languages, or provide incomplete snippets. **Prevention:** Review Scalekit's technical-guidelines.md for code standards. If similar pages have code examples, the improved page must also have them in all 4 languages (Node.js, Python, Go, Java). Use placeholder structure with `[AUTHOR TODO]` if code isn't ready.

4. **Security context omission** — improved pages describe what to do without explaining security implications or threats. **Prevention:** Every authentication-related code example or configuration step must explain: (1) what threat is being mitigated, (2) why this pattern is necessary, (3) what could happen without it. Use `<Aside>` callouts for additional security context.

5. **Navigation hierarchy disruption** — improved pages disrupt learning paths by missing `prev`/`next` frontmatter or failing to link to related concepts. **Prevention:** Analyze the parent directory structure to understand the learning path. Check 5-10 similar pages to see how they link. Add `prev`/`next` frontmatter for sequential guides, `seeAlso` for related concepts.

6. **Component inconsistency** — improved pages use different Starlight components than similar pages, or use components incorrectly. **Prevention:** Document component usage in 3-5 similar pages before writing. Create a component inventory (which components used, how, in what contexts). Apply patterns consistently.

7. **Terminology drift** — improved pages introduce or use different terminology than the established documentation set. **Prevention:** Before writing, create a terminology glossary by reading 10+ similar pages. Document Scalekit's exact terms for core concepts. Use inline code (`` `term` ``) for all technical terms on first mention.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Pattern Discovery & Analysis

**Rationale:** Critical pitfalls (style drift, opening context disconnect, navigation hierarchy disruption, component inconsistency, terminology drift) are all preventable with upfront analysis. Writing without patterns causes rework. This phase establishes the foundation for consistent improvements.

**Delivers:**

- Pattern inventory from 3-5 similar pages (heading hierarchy, frontmatter, components, terminology)
- Opening paragraph structure analysis
- Component usage documentation
- Information architecture mapping for target sections
- Terminology glossary from existing pages

**Addresses:** Table stakes from FEATURES.md (consistent heading hierarchy, proper frontmatter, meaningful link text, dashboard path references)

**Avoids:** Style drift, opening context disconnect, navigation hierarchy disruption, component inconsistency, terminology drift

### Phase 2: Content Development

**Rationale:** Once patterns are established, improve the two target pages using those patterns. This phase focuses on content quality improvements: opening context, multi-language code examples, security documentation, and direct language.

**Delivers:**

- Improved `hosted-login-examples.mdx` with proper opening paragraphs, 4-language code examples, security context
- Improved `hosted-widgets.mdx` with proper opening paragraphs, 4-language code examples, security context
- Active voice and second person voice applied consistently
- Code comments explaining real-world use cases
- Error handling in code examples

**Uses:** Stack elements from STACK.md (remark, markdownlint, Prettier for formatting consistency)

**Implements:** Architecture component from ARCHITECTURE.md (Frontmatter-driven navigation, proper MDX content structure)

**Addresses:** Table stakes (clear opening paragraphs, multi-language code examples, active voice, security documentation, code block attributes)

**Avoids:** Code example incompleteness, security context omission

### Phase 3: Cross-Reference Integration

**Rationale:** After content quality is improved, add navigation and cross-references that connect pages into learning paths. This phase depends on content being stable because it references specific sections.

**Delivers:**

- `prev`/`next` frontmatter for sequential navigation
- `seeAlso` sections with related documentation links
- Smooth transitions between sections
- Consistent terminology enforced across both pages
- Table of Contents for long pages

**Uses:** Architecture component from ARCHITECTURE.md (Frontmatter-Driven Navigation, See Also Components)

**Addresses:** Should-have features (synchronized language tabs, badge system, collapsible supplementary sections, related documentation linking)

**Avoids:** Navigation hierarchy disruption

### Phase 4: Validation & Polish

**Rationale:** Final phase validates quality against standards and catches any remaining issues. This phase depends on all content being complete.

**Delivers:**

- Link validation (using linkinator from STACK.md)
- Markdown linting (using remark + markdownlint)
- Spell checking (using cspell)
- Prettier formatting verification
- "Looks Done But Isn't" checklist completion

**Uses:** Stack elements from STACK.md (linkinator, remark, markdownlint, cspell, Prettier)

**Addresses:** Consistent terminology enforcement, verification criteria in procedures

### Phase Ordering Rationale

- **Phase 1 must come first**: All 7 critical pitfalls are preventable with pattern discovery. Writing without patterns guarantees rework. ARCHITECTURE.md's "Foundation" phase explicitly recommends establishing writing standards before fixing navigation or standardizing content.
- **Phase 2 follows Phase 1**: Content development requires established patterns (opening paragraph structure, component usage, terminology). FEATURES.md shows code examples depend on code block attributes, which depend on pattern consistency.
- **Phase 3 follows Phase 2**: Cross-references (prev/next, seeAlso) depend on stable content. ARCHITECTURE.md's data flow shows frontmatter connections only work when content is complete.
- **Phase 4 is final**: Validation requires complete, linked content. PITFALLS.md's recovery strategies show that catching issues late costs more (HIGH cost for missing code examples discovered late).

This ordering aligns with ARCHITECTURE.md's recommended build order for improvements: Foundation → Content Quality → Cross-References → Polish.

### Research Flags

**Phases likely needing deeper research during planning:**

- **Phase 2 (Content Development):** Authentication and security context for hosted widgets and hosted login examples may require consultation with engineering to verify accuracy. Use `TODO: [VERIFY]` markers for uncertain information.
- **Phase 3 (Cross-Reference Integration):** May need to analyze broader information architecture beyond the two target pages to ensure `seeAlso` links are comprehensive.

**Phases with standard patterns (skip research-phase):**

- **Phase 1 (Pattern Discovery):** Well-established patterns exist in Scalekit's full stack auth section (`implement-login.mdx`, `create-organization.mdx`). Follow ARCHITECTURE.md's "Hierarchical Navigation" and "Frontmatter-Driven Navigation" patterns.
- **Phase 4 (Validation & Polish):** STACK.md tools (linkinator, remark, markdownlint, cspell, Prettier) have clear usage patterns. Follow pre-commit hook patterns.

## Confidence Assessment

| Area         | Confidence | Notes                                                                                                                                                                                                                                                                                                      |
| ------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack        | HIGH       | Verified against official documentation for each tool (remark, markdownlint, Prettier, cspell, linkinator). Version compatibility matrix confirmed.                                                                                                                                                        |
| Features     | HIGH       | All features verified against multiple authoritative sources (Diátaxis Framework, Google Tech Writing, Write the Docs) and Scalekit's own writing standards. Competitor analysis (Auth0, Stripe, Vercel) confirms findings.                                                                                |
| Architecture | HIGH       | Verified against official Astro and Starlight documentation. Patterns (Hierarchical Navigation, Component Override, Frontmatter-Driven) are well-documented. Scalekit's existing architecture follows these patterns.                                                                                      |
| Pitfalls     | MEDIUM     | Research limitation noted in PITFALLS.md: web fetching failed for external sources. Findings based on analysis of Scalekit's existing documentation patterns and training data on technical writing best practices. Would be HIGH confidence with verification from industry post-mortems or case studies. |

**Overall confidence:** HIGH (4/5 areas HIGH, 1 area MEDIUM)

### Gaps to Address

- **Industry research gap:** PITFALLS.md notes that findings would be strengthened by verification from external sources (post-mortems, case studies, industry research on documentation improvement failures). **Handle during Phase 1:** Document patterns from Scalekit's existing high-quality pages as primary source; external validation is optional.

- **Security context verification gap:** Authentication/security patterns for hosted widgets and hosted login examples may need engineering verification. **Handle during Phase 2:** Use `TODO: [VERIFY]` markers in security comments and consult engineering team before finalizing.

- **Information architecture scope gap:** Phase 3 may require analyzing pages beyond the two target pages to ensure comprehensive cross-references. **Handle during Phase 3:** Expand scope if needed based on content discovery; document decisions for future reference.

## Sources

### Primary (HIGH confidence)

- **Diátaxis Framework** (diataxis.fr) — Documentation types (tutorials, how-to guides, reference, explanation), quality framework
- **Google Tech Writing** (developers.google.com/tech-writing) — Industry-standard technical writing curriculum
- **Write the Docs** (writethedocs.org) — Community-driven documentation best practices
- **Scalekit Writing Standards** (src/writing-standards/) — Established internal standards for style, content, and technical guidelines
- **Astro Documentation** (docs.astro.build) — SSG architecture and patterns
- **Starlight Documentation** (starlight.astro.build) — Theme components and configuration
- **MDX Specification** (mdxjs.com) — Verified Feb 2025

### Secondary (MEDIUM confidence)

- **remark ecosystem** (github.com/remarkjs/remark) — 8.7k stars, 150+ plugins, unified ecosystem
- **markdownlint** (github.com/DavidAnson/markdownlint) — 5.8k stars, 60+ rules
- **Prettier** (prettier.io) — Official docs, verified Feb 2025
- **cspell** (cspell.org) — Verified Feb 2025
- **linkinator** (github.com/JustinBeckwith/linkinator) — 1.2k stars, latest v7.5.3 Dec 2025
- **textlint** (textlint.github.io) — Pluggable natural language linter
- **pre-commit** (github.com/pre-commit/pre-commit-hooks) — 6.4k stars, language-agnostic hooks
- **Auth0 Docs** (auth0.com/docs) — High-quality developer documentation with interactive quickstart
- **Stripe Docs** (stripe.com/docs) — Gold standard for API documentation and DX
- **Vercel Docs** (vercel.com/docs) — Clear, well-structured conceptual documentation
- **GitHub Docs** (github.com/github/docs) — Open-source documentation with high community standards

### Tertiary (LOW confidence)

- **Training data on technical writing best practices** — Used for PITFALLS.md inference; would be higher confidence with explicit source citations
- **Pattern analysis of similar documentation improvement projects** — Inferred from common industry practices; would be higher confidence with case study citations

---

_Research completed: 2025-02-16_
_Ready for roadmap: yes_
