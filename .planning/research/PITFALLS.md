# Pitfalls Research

**Domain:** Technical documentation quality improvement
**Researched:** 2025-02-16
**Confidence:** MEDIUM

**Research limitation:** Web fetching failed for external sources. Findings based on analysis of Scalekit's existing documentation patterns and training data on technical writing best practices.

## Critical Pitfalls

### Pitfall 1: Style Drift Without Cross-Reference

**What goes wrong:**
Improved pages use different heading structure, terminology, or formatting conventions than the established documentation set, creating visual and cognitive dissonance for users navigating between pages.

**Why it happens:**
Writers focus only on the page being improved without referencing 3-5 similar existing pages to understand established patterns. They rely on general writing standards instead of project-specific conventions.

**How to avoid:**
Before improving any page, read 3-5 similar pages in the same section. Document the patterns you observe (heading hierarchy, frontmatter fields, component usage, terminology). Apply these patterns explicitly.

**Warning signs:**

- Headings use different hierarchy (e.g., H2→H3 vs H2→H3→H4) than similar pages
- Different frontmatter fields (e.g., missing `prev`/`next` when similar pages have them)
- Terminology inconsistencies (e.g., "client ID" vs "CLIENT_ID" vs "client id")
- Code block formatting differs (title format, wrap usage, collapse patterns)

**Phase to address:**
**Phase 1: Analysis & Pattern Discovery** — Must complete before any writing begins.

---

### Pitfall 2: Opening Context Disconnect

**What goes wrong:**
Improved pages either lack opening context paragraphs entirely, or use different structure/purpose than similar pages, breaking the "continuity promise" users expect when navigating documentation sequentially.

**Why it happens:**
Writers skip the "what users will accomplish" framing in favor of jumping directly into technical details, or use generic opening templates instead of analyzing what similar pages do.

**How to avoid:**
Every page must have 1-3 opening paragraphs that explain: (1) what users will accomplish, (2) when/why they need this, (3) key concepts preview. Match the style and depth of similar pages exactly.

**Warning signs:**

- Page starts immediately with H2 heading without opening paragraphs
- Opening paragraphs are 5+ sentences when similar pages use 1-3 sentences
- Opening doesn't mention "what you'll accomplish" or "when to use this"
- Different voice than surrounding pages (e.g., first-person "we'll" vs second-person "you")

**Phase to address:**
**Phase 1: Analysis & Pattern Discovery** — Analyze opening paragraphs in similar pages first.

---

### Pitfall 3: Code Example Incompleteness

**What goes wrong:**
Improved pages either lack code examples entirely, provide examples in only 1-2 languages instead of all 4, or provide incomplete snippets that don't run, creating a quality gap compared to pages with full, runnable examples.

**Why it happens:**
Writers add code as an afterthought instead of treating it as a first-class documentation element. They may think "this is a concept page, not a how-to" and skip examples entirely.

**How to avoid:**
Review Scalekit's technical-guidelines.md for code standards. If similar pages have code examples, the improved page must also have them in all 4 languages (Node.js, Python, Go, Java). Use placeholder structure with `[AUTHOR TODO]` if code isn't ready.

**Warning signs:**

- Code example present in Node.js only (missing Python, Go, Java)
- Code block lacks title attribute or uses inconsistent format
- Code shown without context (no explanation before/after)
- No security comments in code when similar pages include them
- SDK variable names don't match standard (should be `scalekit`, `scalekit_client`, `scalekitClient`, `scalekitClient`)

**Phase to address:**
**Phase 2: Content Development** — Add code examples early, not as final polish.

---

### Pitfall 4: Security Context Omission

**What goes wrong:**
Improved pages describe what to do without explaining security implications or threats, creating a dangerous gap when similar pages consistently explain "why" certain security measures are necessary.

**Why it happens:**
Writers focus on implementation mechanics and forget the instructional principle of explaining security context. They may assume "this is obvious" when users don't have the threat modeling background.

**How to avoid:**
Every authentication-related code example or configuration step must explain: (1) what threat is being mitigated, (2) why this pattern is necessary, (3) what could happen without it. Use `<Aside>` callouts for additional security context.

**Warning signs:**

- Code shows token storage without explaining HttpOnly, Secure, SameSite protections
- Redirect URLs mentioned without discussing validation or CSRF prevention
- SSO configuration shown without explaining domain validation or email domain matching
- User provisioning described without security implications of JIT vs manual invites

**Phase to address:**
**Phase 2: Content Development** — Add security context alongside code examples, not as separate phase.

---

### Pitfall 5: Navigation Hierarchy Disruption

**What goes wrong:**
Improved pages disrupt learning paths by missing `prev`/`next` frontmatter, using incorrect `sidebar.order`, or failing to link to related concepts, leaving users stranded without clear next steps.

**Why it happens:**
Writers don't analyze the information architecture before improving content. They treat pages as isolated documents rather than nodes in a learning graph.

**How to avoid:**
Analyze the parent directory structure to understand the learning path. Check 5-10 similar pages to see how they link. Add `prev`/`next` frontmatter for sequential guides, `seeAlso` for related concepts. Verify `sidebar.order` fits the logical sequence.

**Warning signs:**

- Frontmatter lacks `prev` and `next` when similar pages have them
- `sidebar.order` places page out of logical sequence (e.g., advanced topic before basics)
- Concepts mentioned but not linked (e.g., "requires permissions" but no link to permissions guide)
- No `seeAlso` section when concept is part of broader topic

**Phase to address:**
**Phase 1: Analysis & Pattern Discovery** — Map information architecture before writing.

---

### Pitfall 6: Component Inconsistency

**What goes wrong:**
Improved pages use different Starlight components than similar pages, or use components incorrectly (e.g., `<Aside>` type mismatch, missing `<Steps>` for procedures, wrong `<Tabs>` syncKey), breaking visual and functional consistency.

**Why it happens:**
Writers choose components based on what "feels right" instead of analyzing what similar pages use. They may not know component best practices or standard patterns.

**How to avoid:**
Document component usage in 3-5 similar pages before writing. Create a component inventory (which components used, how, in what contexts). Apply patterns consistently. Follow Scalekit's technical-guidelines.md component section.

**Warning signs:**

- Procedure described as numbered list instead of `<Steps>` component
- `<Aside type="danger">` used for tip instead of `<Aside type="tip">`
- `<Tabs>` without `syncKey` when similar pages use `syncKey="tech-stack"`
- Missing `<details>` for supplementary content when similar pages have collapsible sections

**Phase to address:**
**Phase 1: Analysis & Pattern Discovery** — Inventory components in similar pages first.

---

### Pitfall 7: Terminology Drift

**What goes wrong:**
Improved pages introduce or use different terminology than the established documentation set (e.g., "tenant" vs "organization", "callback URL" vs "redirect URI", "auth code" vs "authorization code"), confusing users who encounter multiple terms for the same concept.

**Why it happens:**
Writers don't reference Scalekit's terminology standards in technical-guidelines.md. They may carry over terminology from other products or use colloquial terms.

**How to avoid:**
Before writing, create a terminology glossary by reading 10+ similar pages. Document Scalekit's exact terms for core concepts. Use inline code (`` `term` ``) for all technical terms on first mention.

**Warning signs:**

- "Tenant" used instead of "organization"
- "Callback URL" used instead of "redirect URI" (or vice versa)
- "Auth code" or "code token" instead of "authorization code"
- "Workspaces" used outside Connect context
- Inconsistent capitalization (ID token vs idToken vs id token)

**Phase to address:**
**Phase 1: Analysis & Pattern Discovery** — Build terminology glossary from existing pages.

---

## Technical Debt Patterns

Shortcuts that seem reasonable when improving documentation but create long-term maintenance problems.

| Shortcut                                           | Immediate Benefit       | Long-term Cost                                     | When Acceptable                                                          |
| -------------------------------------------------- | ----------------------- | -------------------------------------------------- | ------------------------------------------------------------------------ |
| Copy-pasting examples from other pages             | Fast to create content  | When source changes, all copies diverge            | Only with explicit `[REF: source]` comment and periodic sync plan        |
| Using placeholder code instead of real examples    | Page ships faster       | Users can't run examples, trust erodes             | NEVER for production docs. OK for design drafts only                     |
| Skipping code examples for "concept pages"         | Less writing effort     | Creates inconsistency when similar pages have code | NEVER if similar pages have code. Only if 3+ similar pages are code-free |
| Writing inline comments instead of security Asides | Faster documentation    | Security implications buried in code comments      | NEVER. Security context must be prominent                                |
| Using generic "how-to" opening template            | Consistent across pages | Doesn't match section-specific patterns            | NEVER. Each section has its own opening style                            |

## Integration Gotchas

Common mistakes when improving pages that connect to other parts of the documentation.

| Integration           | Common Mistake                                                                           | Correct Approach                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Cross-references      | Linking to pages that don't exist or have moved                                          | Verify all links exist before writing. Use link format `[title](/path/)`.          |
| Dashboard paths       | Inconsistent format (e.g., "Settings > Auth" vs "Dashboard > Authentication > Settings") | Always use format: **Dashboard > Section > Subsection > Field**                    |
| Code sample structure | Different file structure, variable names, or framework versions than other examples      | Match patterns in 3+ similar examples. Use standard SDK variable names.            |
| API references        | Using deprecated endpoints or incorrect parameter names                                  | Verify against current Scalekit API docs. Insert `TODO: [VERIFY]` for uncertainty. |
| Security patterns     | Inconsistent security context (some pages explain threats, others don't)                 | Security context is mandatory for all auth-related content.                        |

## Performance Traps

Patterns that work for small improvements but fail as scope expands.

| Trap                                         | Symptoms                                                                     | Prevention                                                                                                        | When It Breaks                                        |
| -------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Improving pages in isolation                 | Each page looks good, but navigation between pages feels disjointed          | Always improve pages in logical groups (e.g., entire section, learning path). Map information architecture first. | After 3+ pages improved without considering the whole |
| Focusing on "better" instead of "consistent" | Improved pages are higher quality than surrounding pages, creating confusion | Match quality of similar pages exactly. "Better" is only acceptable if you're improving the entire section.       | After 5+ pages improved without updating neighbors    |
| Adding new content during improvements       | Scope creep. Page was 50 lines, now 300 lines with new features              | Strictly limit improvements to existing content. New features = separate initiative.                              | After 2+ pages where new content crept in             |
| Frontmatter optimization drift               | Different frontmatter fields across pages                                    | Document standard frontmatter for each page type. Apply checklist.                                                | After 3+ pages with inconsistent frontmatter          |

## Security Mistakes

Domain-specific security issues in technical documentation beyond general web security.

| Mistake                                                | Risk                                                       | Prevention                                                                                         |
| ------------------------------------------------------ | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Code examples without error handling                   | Users copy code that crashes in production                 | Always show both success and error paths in code examples                                          |
| Missing security comments in code                      | Users don't understand why security measures are necessary | Every security-critical pattern must have explanatory comment (threat + mitigation + consequences) |
| Token storage examples without HttpOnly/Secure cookies | Users store tokens in localStorage, vulnerable to XSS      | Always show HttpOnly, Secure, SameSite cookie attributes for token storage                         |
| Redirect URLs without validation instructions          | Users implement open redirects (vulnerability)             | Always explain redirect URL validation and whitelist patterns                                      |
| Missing CORS/SameSite context                          | Users configure endpoints that are vulnerable to CSRF      | Explain CORS and SameSite requirements for all API integrations                                    |

## UX Pitfalls

Common user experience mistakes when improving documentation pages.

| Pitfall                                   | User Impact                                            | Better Approach                                                                 |
| ----------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Pages without "what you'll learn" framing | Users can't quickly determine if page is relevant      | Opening paragraphs must explain what users will accomplish and when to use this |
| Missing "next step" guidance              | Users complete the page but don't know what to do next | Add closing paragraph or `next` frontmatter linking to logical next step        |
| Inconsistent heading depth                | Scanning difficulty, visual noise                      | Match heading hierarchy (H2→H3→H4) exactly to similar pages                     |
| Code examples without context             | Users can't understand where code fits                 | Always add context paragraphs before and after code blocks                      |
| Missing collapsible supplementary content | Main content cluttered, hard to scan                   | Use `<details>` for diagrams, JSON examples, extended explanations              |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces based on Scalekit's quality standards.

- [ ] **Opening context:** Check 3 similar pages. Does improved page have 1-3 opening paragraphs matching their style?
- [ ] **Frontmatter consistency:** Compare frontmatter fields to 5 similar pages. Are `prev`/`next`/`seeAlso`/`tableOfContents` consistent?
- [ ] **Code completeness:** Does page have code examples in all 4 languages (Node.js, Python, Go, Java)? Or document why exceptions are valid.
- [ ] **Security context:** Scan for all security-critical operations (token handling, redirects, storage). Does each have explanation in code comments or `<Aside>` callouts?
- [ ] **Component inventory:** List all Starlight components used on page. Do they match patterns from 3+ similar pages?
- [ ] **Terminology consistency:** Extract all technical terms. Do they match Scalekit's terminology standards from technical-guidelines.md?
- [ ] **Link verification:** Click every internal link. Do all destinations exist?
- [ ] **Navigation flow:** Read page, then follow `prev`/`next` links. Does learning path make sense?
- [ ] **Cross-reference scan:** Mentions concepts without links (e.g., "requires permissions", "uses JIT provisioning"). Are all concepts linked?
- [ ] **Dashboard path format:** Check all dashboard references. Do they use format **Dashboard > Section > Subsection > Field**?

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall                               | Recovery Cost | Recovery Steps                                                                                                                                                                                     |
| ------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Style drift detected after review     | MEDIUM        | (1) Read 3-5 similar pages to identify correct patterns, (2) Create pattern checklist, (3) Apply checklist systematically, (4) Get peer review focusing on consistency                             |
| Missing code examples discovered late | HIGH          | (1) Document what code is needed in all 4 languages, (2) Use `[AUTHOR TODO]` placeholder structure, (3) Add task to backlog, (4) Ship with placeholders if timeline critical, but document clearly |
| Navigation hierarchy broken           | LOW-MEDIUM    | (1) Map correct learning path by reading entire section, (2) Update `prev`/`next` and `sidebar.order` for affected pages, (3) Test navigation flow end-to-end                                      |
| Terminology inconsistency found       | LOW           | (1) Create terminology glossary from technical-guidelines.md and 10+ pages, (2) Find-and-replace across improved pages, (3) Add term to style guide for future reference                           |
| Security context omitted              | HIGH          | (1) Identify all security-critical operations, (2) Add security comments explaining threats and mitigations, (3) Use `<Aside type="caution">` or `<Aside type="danger">` for emphasis              |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall                             | Prevention Phase                 | Verification                                                                                     |
| ----------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Style drift without cross-reference | **Phase 1: Analysis**            | Before writing: Checklist of heading hierarchy, frontmatter, components from 3-5 similar pages   |
| Opening context disconnect          | **Phase 1: Analysis**            | Before writing: Extract opening paragraphs from 3 similar pages, analyze structure               |
| Code example incompleteness         | **Phase 2: Content Development** | During writing: Ensure all 4 languages present, use `[AUTHOR TODO]` placeholders if needed       |
| Security context omission           | **Phase 2: Content Development** | During writing: For each security-critical operation, add comment explaining threat + mitigation |
| Navigation hierarchy disruption     | **Phase 1: Analysis**            | Before writing: Map information architecture, identify prev/next links                           |
| Component inconsistency             | **Phase 1: Analysis**            | Before writing: Inventory components in 3-5 similar pages, document usage patterns               |
| Terminology drift                   | **Phase 1: Analysis**            | Before writing: Build terminology glossary from technical-guidelines.md and 10+ pages            |

## Sources

**Research limitation:** Web fetching for external sources failed (404, TLS errors, rate limits). Findings based on:

- Analysis of Scalekit's existing documentation patterns (`src/content/docs/` directory structure and 20+ pages)
- Scalekit's writing standards (`src/writing-standards/` directory: style-guide.md, content-standards.md, technical-guidelines.md)
- Training data on technical writing best practices and common documentation improvement issues
- Pattern analysis of similar documentation improvement projects in developer tools ecosystem

**Confidence assessment:**

- MEDIUM confidence: Pitfalls are grounded in specific analysis of Scalekit's existing documentation and well-established technical writing principles
- Would be HIGH confidence with verification from external sources (post-mortems, case studies, industry research)

**Validation needed:**

- Industry research on documentation improvement failures (would strengthen confidence)
- Case studies of similar documentation quality projects in developer tools companies
- Post-mortems from technical documentation teams on improvement initiatives

---

_Pitfalls research for: Technical documentation quality improvement_
_Researched: 2025-02-16_
