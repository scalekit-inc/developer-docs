# Feature Landscape

**Domain:** Technical documentation quality (developer-focused)
**Researched:** 2025-02-16
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users expect. Missing = product feels incomplete.

| Feature                                                                                | Why Expected                                                                           | Complexity | Notes                                                                                                                                |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Clear opening paragraphs** (1-3 paragraphs explaining what users will accomplish)    | Developers immediately scan to determine if they're in the right place                 | LOW        | From Scalekit standards: explain what users will accomplish, provide context about when/why needed, preview key concepts or workflow |
| **Proper frontmatter** (title ≤60 chars, description ≤160 chars, sidebar label)        | Essential for SEO, navigation, and discoverability                                     | LOW        | From Scalekit standards; critical for search and breadcrumb navigation                                                               |
| **Multi-language code examples** (Node.js, Python, Go, Java)                           | Developers use different tech stacks; forcing them to translate code causes friction   | MEDIUM     | From Scalekit standards; use `<Tabs syncKey="tech-stack">` to keep synchronized                                                      |
| **Active voice and direct language** (imperative for instructions)                     | Passive voice is harder to follow and creates ambiguity                                | LOW        | From Google Tech Writing and Scalekit standards: "Configure X to enable Y" not "X can be configured"                                 |
| **Security documentation** (explain threats and implications)                          | Authentication/authorization docs without security context leave developers vulnerable | MEDIUM     | From Scalekit technical guidelines; code comments must explain CSRF, XSS, MITM attack mitigation                                     |
| **Dashboard path references** (format: **Dashboard > Section > Subsection**)           | Developers need to know exactly where to find configuration settings                   | LOW        | From Scalekit standards; prevents confusion in UI navigation                                                                         |
| **Consistent terminology** (Scalekit-specific terms defined once, reused consistently) | Inconsistent terminology creates cognitive load and confusion                          | LOW        | From Scalekit standards: "Organizations" not "tenants", "authorization code" not "auth code"                                         |
| **Error handling in code examples**                                                    | Production code must handle errors; examples showing only success path are misleading  | MEDIUM     | From Scalekit technical guidelines; show both success and error paths                                                                |
| **Code block attributes** (title, collapse, highlighting, line numbers)                | Helps developers quickly identify what code does and copy efficiently                  | LOW        | From Scalekit technical guidelines; use framework titles like "Express.js", "Flask", "Gin", "Spring Boot"                            |
| **Meaningful link text** (not "click here" or "this")                                  | Screen reader users and developers scanning for content miss context                   | LOW        | From Google Tech Writing; use descriptive text like "authentication flow" instead of "this"                                          |
| **Consistent heading hierarchy** (H2, H3, H4 only within Steps)                        | Proper structure aids navigation and understanding content relationships               | LOW        | From Scalekit content standards; never use H1 in body (from frontmatter title)                                                       |
| **Second person voice** ("you", "your application")                                    | Personal, direct address is clearer than passive or third person                       | LOW        | From Scalekit style guide; "Your application receives an access token" not "The application receives"                                |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valued.

| Feature                                                                                            | Value Proposition                                                                    | Complexity | Notes                                                                                                                             |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **AI-optimized prompts** (CopyPrompt component for AI-assisted integration)                        | Accelerates development by working with AI tools (Claude, Copilot, Cursor)           | HIGH       | Observed in Auth0 docs; provides actionable prompts developers can paste into AI assistants                                       |
| **Interactive quickstart tools** (web-based app creation with pre-filled env vars)                 | Reduces configuration friction; developers can test immediately without manual setup | HIGH       | From Auth0 quickstart: interactive component that creates apps and generates `.env.local` files                                   |
| **Synchronized language tabs** (`syncKey` across multiple code blocks)                             | Developers working across multiple languages stay in sync automatically              | LOW        | From Scalekit technical guidelines; `syncKey="tech-stack"` maintains language selection across page                               |
| **Advanced code highlighting** (line ranges, term highlighting, collapsible sections, JSON labels) | Reduces cognitive load by drawing attention to critical code sections                | MEDIUM     | From Scalekit technical guidelines; use `collapse={1-4}` for imports, `{5-8}` for key lines, `"methodName"` for term highlighting |
| **Collapsible supplementary sections** (sequence diagrams, videos, data models)                    | Keeps main content focused while providing depth when needed                         | LOW        | From Scalekit content standards; use `<details>` with icons like `<IconTdesignSequence>` for diagrams                             |
| **Component-based structure** (Steps, Tabs, Aside, Badge, CardGrid)                                | Creates consistent visual patterns and improves maintainability                      | MEDIUM     | From Scalekit technical guidelines; Starlight components provide reusable UI patterns                                             |
| **Video demonstrations** (embedded VideoPlayer component)                                          | Visual learners benefit; complex flows are easier to understand with visual aid      | MEDIUM     | From Scalekit technical guidelines; `<VideoPlayer>` for embedded demos                                                            |
| **Diátaxis-aware content organization** (tutorials, how-to guides, reference, explanation)         | Matches user mental models for different learning needs; proven by major docs        | HIGH       | From diataxis.fr; four-quadrant framework adopted by Gatsby, Cloudflare, Vonage                                                   |
| **Deep quality** (anticipating user needs, having flow, feeling good to use)                       | Creates emotional connection; developers remember and recommend docs with great UX   | HIGH       | From Diátaxis quality framework; deep quality = subjective characteristics like flow and anticipation                             |
| **Code comments explaining real-world use cases**                                                  | Moves beyond "how" to "when and why" - crucial for production scenarios              | MEDIUM     | From Scalekit style guide; comments like "Use case: Sync organization profile to downstream systems"                              |
| **Badge system for content** (Required, Recommended, Optional, API, New)                           | Quickly signals content importance and nature to scanning developers                 | LOW        | From Scalekit technical guidelines; `<Badge text="recommended" />`, `<Badge text="API" variant="tip" />`                          |
| **Verification criteria in procedures**                                                            | Developers know when they've successfully completed a step                           | LOW        | From Scalekit document templates; include success indicators in Steps component                                                   |
| **Related documentation linking** (seeAlso, prev/next navigation)                                  | Reduces search friction; guides learning path through related content                | MEDIUM     | From Scalekit content standards; `seeAlso` component and `prev`/`next` for sequential guides                                      |
| **Table of Contents for long pages**                                                               | Easier navigation of complex documentation                                           | LOW        | From Scalekit content standards; `tableOfContents: true` in frontmatter                                                           |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature                                                                    | Why Requested                        | Why Problematic                                                                        | Alternative                                                                                    |
| -------------------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Screenshots of code**                                                    | Seems visual and beginner-friendly   | Hard to update, can't copy-paste, bad for accessibility                                | Always use code blocks with syntax highlighting                                                |
| **"Click here" link text**                                                 | Seems clear and directive            | Ambiguous for screen readers, violates accessibility standards                         | Use descriptive link text: "Configure authentication settings"                                 |
| **"Let's" phrases** (e.g., "Let's see how to...")                          | Seems conversational and friendly    | Presumes reader's state of mind, breaks direct instructional tone                      | Use direct language: "This guide shows you how to..."                                          |
| **Excessive filler words** ("clearly", "simply", "basically", "obviously") | Seems clarifying and reassuring      | Actually reduces credibility; if something were obvious, you wouldn't need to state it | Use direct, factual statements without intensifiers                                            |
| **Multiple H1 headings in page content**                                   | Seems logical for major sections     | Creates accessibility issues and breaks document structure                             | Use H2 for major sections; H1 only comes from frontmatter title                                |
| **Pseudo-code examples**                                                   | Seems clearer by removing complexity | Developers paste it, it doesn't work, creates frustration                              | Show full, working examples; use `collapse` to hide boilerplate                                |
| **Assuming features exist without verification**                           | Seems efficient                      | Creates inaccurate docs; developers hit dead ends                                      | Always verify against product behavior; use `TODO: [VERIFY]` markers for uncertain information |
| **Emojis in technical content**                                            | Seems friendly and modern            | Can be misinterpreted, unprofessional, inconsistent across platforms                   | Use standard badges or icons from approved icon sets (Lucide, Material Symbols)                |
| **Long paragraphs (>5 sentences)**                                         | Seems comprehensive                  | Developers scan; long blocks are hard to digest                                        | Break into shorter paragraphs; use lists and tables for readability                            |
| **Inconsistent voice (switching between second and third person)**         | Seems to provide variety             | Creates confusion about who is doing what                                              | Maintain consistent second person: "you", "your application"                                   |
| **Marketing language in technical docs**                                   | Seems promotional and exciting       | Developers want technical accuracy, not sales copy                                     | Use confident, direct, instructional tone; explain the "why" but avoid superlatives            |

## Feature Dependencies

```
[Clear opening paragraphs]
    └──requires──> [Proper frontmatter]
                        └──enhances──> [Table of Contents for long pages]

[Multi-language code examples]
    └──requires──> [Code block attributes]
                        └──enhances──> [Advanced code highlighting]

[Security documentation]
    └──enhances──> [Code comments explaining real-world use cases]

[Active voice and direct language]
    └──required-for──> [Second person voice]
                        └──required-for──> [Deep quality]

[Diátaxis-aware content organization]
    └──requires──> [Clear opening paragraphs]
                        └──enhances──> [Related documentation linking]

[Interactive quickstart tools]
    └──requires──> [Proper frontmatter]
                        └──enhances──> [Multi-language code examples]

[Synchronized language tabs]
    └──requires──> [Multi-language code examples]
```

### Dependency Notes

- **[Clear opening paragraphs] requires [Proper frontmatter]:** Frontmatter provides context for search and navigation, which supports the opening paragraphs in signaling to developers they're in the right place.
- **[Multi-language code examples] requires [Code block attributes]:** Without proper code block titles and language identifiers, multi-language tabs don't provide clear context for each code example.
- **[Security documentation] enhances [Code comments explaining real-world use cases]:** Security context makes use cases more meaningful by explaining why certain patterns are necessary.
- **[Active voice and direct language] required for [Second person voice]:** Imperative instructions naturally pair with second-person address to create direct, actionable guidance.
- **[Active voice and direct language] required for [Deep quality]:** Deep quality characteristics like "having flow" and "anticipating the user" require clear, direct language.
- **[Diátaxis-aware content organization] requires [Clear opening paragraphs]:** Different doc types (tutorials vs how-to guides) require different opening approaches, but all need clear context setting.
- **[Diátaxis-aware content organization] enhances [Related documentation linking]:** Understanding the doc type helps structure related links appropriately (e.g., tutorials link to how-to guides, references link to concepts).
- **[Interactive quickstart tools] requires [Proper frontmatter]:** Interactive components need proper metadata for tracking and SEO.
- **[Interactive quickstart tools] enhances [Multi-language code examples]:** Pre-filled env vars and generated code make multi-language examples more immediately useful.
- **[Synchronized language tabs] requires [Multi-language code examples]:** Tabs without synchronized language selection create cognitive load when multiple code blocks exist on a page.

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [ ] **Clear opening paragraphs** — Critical for helping developers determine if they're in the right place; first thing users read
- [ ] **Proper frontmatter** — Essential for navigation, SEO, and page metadata
- [ ] **Active voice and direct language** — Foundational quality standard for all technical writing
- [ ] **Second person voice** — Creates direct, personal connection with developers
- [ ] **Multi-language code examples** — Scalekit's core differentiator; developers expect code in their stack
- [ ] **Security documentation** — Non-negotiable for authentication/authorization docs; critical for trust
- [ ] **Code block attributes** — Basic attributes (title, language) required for code clarity
- [ ] **Dashboard path references** — Essential for configuration guidance
- [ ] **Meaningful link text** — Accessibility requirement and clarity standard
- [ ] **Consistent heading hierarchy** — Structural foundation for all pages

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] **Synchronized language tabs** — Enhances multi-language examples with consistent language selection
- [ ] **Badge system for content** — Low effort, high impact for signaling content importance
- [ ] **Collapsible supplementary sections** — Adds depth without disrupting main flow
- [ ] **Related documentation linking** — Reduces search friction for related topics
- [ ] **Consistent terminology enforcement** — Requires more editorial overhead but significantly improves clarity
- [ ] **Verification criteria in procedures** — Improves step-by-step guide effectiveness

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] **Interactive quickstart tools** — High complexity; requires significant engineering investment
- [ ] **AI-optimized prompts** — Depends on AI tooling landscape; evaluate as tools mature
- [ ] **Advanced code highlighting** — Nice-to-have; requires code analysis infrastructure
- [ ] **Video demonstrations** — Production and maintenance overhead; prioritize written docs first
- [ ] **Diátaxis-aware content organization** — Requires architectural restructuring of doc set
- [ ] **Deep quality optimization** — Subjective and requires significant editorial judgment and user feedback

## Feature Prioritization Matrix

| Feature                             | User Value | Implementation Cost | Priority |
| ----------------------------------- | ---------- | ------------------- | -------- |
| Clear opening paragraphs            | HIGH       | LOW                 | P1       |
| Proper frontmatter                  | HIGH       | LOW                 | P1       |
| Active voice and direct language    | HIGH       | LOW                 | P1       |
| Multi-language code examples        | HIGH       | MEDIUM              | P1       |
| Security documentation              | HIGH       | MEDIUM              | P1       |
| Meaningful link text                | MEDIUM     | LOW                 | P1       |
| Consistent heading hierarchy        | MEDIUM     | LOW                 | P1       |
| Code block attributes (basic)       | MEDIUM     | LOW                 | P1       |
| Dashboard path references           | MEDIUM     | LOW                 | P1       |
| Second person voice                 | MEDIUM     | LOW                 | P1       |
| Synchronized language tabs          | HIGH       | LOW                 | P2       |
| Badge system for content            | MEDIUM     | LOW                 | P2       |
| Collapsible supplementary sections  | MEDIUM     | LOW                 | P2       |
| Related documentation linking       | MEDIUM     | MEDIUM              | P2       |
| Consistent terminology enforcement  | MEDIUM     | HIGH                | P2       |
| Verification criteria in procedures | MEDIUM     | LOW                 | P2       |
| Error handling in code examples     | HIGH       | MEDIUM              | P2       |
| Table of Contents for long pages    | MEDIUM     | LOW                 | P3       |
| Advanced code highlighting          | MEDIUM     | MEDIUM              | P3       |
| Code comments with use cases        | MEDIUM     | MEDIUM              | P3       |
| Diátaxis-aware content organization | HIGH       | HIGH                | P3       |
| Video demonstrations                | MEDIUM     | HIGH                | P3       |
| AI-optimized prompts                | HIGH       | HIGH                | P3       |
| Interactive quickstart tools        | HIGH       | HIGH                | P3       |
| Deep quality optimization           | HIGH       | HIGH                | P3       |

**Priority key:**

- P1: Must have for launch (table stakes + critical differentiators)
- P2: Should have, add when possible (secondary differentiators)
- P3: Nice to have, future consideration (advanced differentiators)

## Competitor Feature Analysis

| Feature                      | Auth0                          | Stripe                                     | Vercel                      | Our Approach (Scalekit)                            |
| ---------------------------- | ------------------------------ | ------------------------------------------ | --------------------------- | -------------------------------------------------- |
| Clear opening paragraphs     | ✅ Multi-paragraph context     | ✅ Concise overview                        | ✅ Problem-focused          | ✅ 1-3 paragraphs with context and preview         |
| Multi-language code examples | ✅ JavaScript, Python, etc.    | ✅ Ruby, PHP, Go, Node, Java, Python, .NET | ✅ Node, TypeScript         | ✅ Node.js, Python, Go, Java (4 languages)         |
| Security documentation       | ✅ Security notes and warnings | ⚠️ Basic security mentions                 | ⚠️ Minimal security context | ✅ Explicit threat explanations in code comments   |
| Interactive quickstart tools | ✅ Create app via docs UI      | ❌ None                                    | ❌ None                     | ❌ Future consideration (v2+)                      |
| Synchronized language tabs   | ✅ Synced code blocks          | ⚠️ Separate code blocks                    | ⚠️ Limited examples         | ✅ `syncKey="tech-stack"` for all code tabs        |
| Dashboard path references    | ⚠️ Inconsistent                | ✅ Clear references                        | ✅ Clear references         | ✅ **Dashboard > Section > Subsection** format     |
| Component-based structure    | ✅ Custom components           | ⚠️ Limited components                      | ✅ Components               | ✅ Starlight components (Steps, Tabs, Aside, etc.) |
| Deep quality indicators      | ✅ High DX                     | ✅ Excellent DX                            | ✅ Good DX                  | ✅ Active voice, second person, flow, anticipation |
| Error handling examples      | ⚠️ Inconsistent                | ✅ Comprehensive                           | ⚠️ Limited                  | ✅ Both success and error paths in all examples    |
| Video demonstrations         | ✅ Embedded videos             | ❌ None                                    | ❌ None                     | ⚠️ `<VideoPlayer>` component available             |
| AI optimization              | ✅ AI prompts for integration  | ❌ None                                    | ❌ None                     | ❌ Future consideration (v2+)                      |

## Sources

### Authoritative Sources (HIGH Confidence)

- **Diátaxis Framework** (diataxis.fr) - Proven documentation quality framework adopted by Gatsby, Cloudflare, Vonage, MongoDB
- **Google Tech Writing** (developers.google.com/tech-writing) - Industry-standard technical writing curriculum
- **Write the Docs** (writethedocs.org) - Community-driven documentation best practices
- **Scalekit Writing Standards** (src/writing-standards/) - Established internal standards for style, content, and technical guidelines

### Example Documentation Sites (HIGH Confidence)

- **Auth0 Docs** (auth0.com/docs) - High-quality developer documentation with interactive quickstart
- **Stripe Docs** (stripe.com/docs) - Gold standard for API documentation and DX
- **Vercel Docs** (vercel.com/docs) - Clear, well-structured conceptual documentation
- **GitHub Docs** (github.com/github/docs) - Open-source documentation with high community standards

### Research Confidence Assessment

| Area                  | Confidence | Notes                                                                                        |
| --------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| Table stakes features | HIGH       | All features verified against multiple authoritative sources and Scalekit's own standards    |
| Differentiators       | HIGH       | Differentiators identified through cross-analysis of competitor docs and research frameworks |
| Anti-features         | HIGH       | Verified through Google Tech Writing guidelines and common documentation pitfalls research   |
| Feature dependencies  | MEDIUM     | Dependencies inferred from logical relationships; validated against Scalekit standards       |
| Competitor analysis   | HIGH       | Direct analysis of Auth0, Stripe, Vercel docs pages captured 2025-02-16                      |

---

_Feature research for: Technical documentation quality (developer-focused)_
_Researched: 2025-02-16_
_Confidence: HIGH_
