# Stack Research

**Domain:** Technical Documentation Quality Maintenance
**Researched:** 2025-02-16
**Confidence:** MEDIUM

---

> **Note:** This research focuses on documentation quality tooling and maintenance practices. The Scalekit project already uses Astro 5.16.15 with Starlight 0.37.4 as its SSG.

## Recommended Stack

### Core Quality Tools

| Technology       | Version                  | Purpose                                    | Why Recommended                                                                                                 |
| ---------------- | ------------------------ | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **remark**       | 15.x (unified ecosystem) | Markdown linting with AST-based processing | Most popular markdown parser, plugin ecosystem with 150+ plugins, AST inspection allows sophisticated linting   |
| **markdownlint** | 0.40.0 (Nov 2025)        | Markdown style checking                    | Comprehensive rule set (60+ rules), CommonMark compliant, widely adopted, integrates with most editors and CI   |
| **Prettier**     | 3.x                      | Code and Markdown formatting               | Industry standard, handles MDX and Markdown GFM, ensures consistent formatting across team                      |
| **cspell**       | 8.x (2025)               | Spell checking for documentation           | Multi-language support, customizable dictionaries, ESLint plugin available, fast for large codebases            |
| **linkinator**   | 7.5.3 (Dec 2025)         | Link validation for sites and docs         | Recursively scans sites, checks fragments, CSS URL extraction, bot-protection handling, GitHub Action available |

### Supporting Libraries

| Library                            | Version | Purpose                           | When to Use                                                       |
| ---------------------------------- | ------- | --------------------------------- | ----------------------------------------------------------------- |
| **remark-preset-lint-consistent**  | 12.x    | Enforce consistent markdown style | Starting point for remark linting, prevents style drift           |
| **remark-preset-lint-recommended** | 12.x    | Best practices for markdown       | Catches common mistakes, vendor-agnostic issues                   |
| **remark-cli**                     | 12.x    | Run remark from command line      | CI integration, pre-commit hooks, automation                      |
| **remark-gfm**                     | 4.x     | GitHub Flavored Markdown support  | Add tables, strikethrough, autolinks for Astro/Starlight          |
| **textlint**                       | 14.x    | Natural language linting          | Check prose quality, grammar, clarity in technical writing        |
| **markdown-link-check**            | 3.14.2  | Markdown file link validation     | Quick checks of individual markdown files, pre-commit integration |

### Development Tools

| Tool           | Purpose                  | Notes                                                                                        |
| -------------- | ------------------------ | -------------------------------------------------------------------------------------------- |
| **pre-commit** | Git hooks automation     | Runs quality checks before commit, 6.4k stars, language-agnostic hooks for all linting tools |
| **husky**      | Modern Git hooks manager | Works with Node.js projects, easier configuration than raw Git hooks                         |

---

## Installation

```bash
# Core linting and formatting
npm install --save-dev \
  remark \
  remark-cli \
  remark-preset-lint-consistent \
  remark-preset-lint-recommended \
  remark-gfm \
  markdownlint-cli2 \
  prettier \
  cspell

# Pre-commit integration (optional but recommended)
npm install --save-dev husky

# For TypeScript projects (Scalekit uses Astro which is TypeScript)
npm install --save-dev typescript @types/node
```

---

## Alternatives Considered

| Category             | Recommended           | Alternative               | Why Not                                                                                                                   |
| -------------------- | --------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Markdown Linting** | remark + markdownlint | textlint-only             | markdownlint + remark covers more markdown structure, textlint focuses on prose but lacks deep markdown syntax validation |
| **Link Checking**    | linkinator            | markdown-link-check-only  | linkinator handles full site crawling, fragments, CSS URLs; markdown-link-check only validates individual files           |
| **Spell Checking**   | cspell                | dictionaries.txt / aspell | cspell integrates with ESLint, has multi-language support, faster for large projects                                      |
| **Code Formatting**  | Prettier              | dprint / Biome            | Prettier is industry standard, has better MDX support, widely adopted, better editor integration                          |

---

## What NOT to Use

| Avoid                                          | Why                                | Use Instead                                                                      |
| ---------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------- |
| **Old remark plugins** (pre-unified ecosystem) | Don't work with unified/remark 9+  | Ensure all remark plugins use unified ecosystem, check for unified compatibility |
| **ESLint for Markdown**                        | ESLint 9+ removed markdown support | Use remark or markdownlint instead for Markdown; ESLint v10 only handles JS/TS   |
| **write-good**                                 | Deprecated, minimal rule set       | Use textlint or remark plugins for prose quality checks                          |
| **Custom regex link checkers**                 | Fragile, miss edge cases           | Use linkinator or markdown-link-check with robust parsing                        |
| **Manual spell checking**                      | Time-consuming, inconsistent       | Use cspell in CI/CD and editors                                                  |
| **Stylelint**                                  | CSS-focused, not for documentation | For CSS in components, not MDX content                                           |

---

## Stack Patterns by Variant

**If content is pure Markdown:**

- Use **markdownlint-cli2** as primary linter
- Add **markdown-link-check** for link validation
- Use **Prettier** for formatting
- Reason: markdownlint has comprehensive markdown rules, CLI2 is faster than CLI1

**If content uses MDX with components:**

- Use **remark** ecosystem with **remark-preset-lint-consistent** + **remark-preset-lint-recommended**
- Add **remark-gfm** if using GFM features
- Use **Prettier** for formatting
- Reason: remark handles MDX AST better, can lint component usage patterns

**If needing link validation across entire site:**

- Use **linkinator** with `--recurse` flag
- Add `--check-fragments` for anchor validation
- Add `--check-css` for style-based URL references
- Reason: Full-site crawling, fragment validation, CSS extraction not available in markdown-link-check

**If checking prose quality:**

- Use **textlint** with natural language rules
- Combine with **remark** for syntax
- Reason: Complements markdown linting with readability and style checks

---

## Version Compatibility

| Package A               | Compatible With     | Notes                                                 |
| ----------------------- | ------------------- | ----------------------------------------------------- |
| remark@15.x             | unified@11+         | All remark plugins must use unified ecosystem version |
| markdownlint-cli2@0.12+ | markdownlint@0.40.0 | Uses markdownlint library under the hood              |
| Prettier 3.x            | MDX 3.x             | Prettier 3.x dropped support for MDX 2.x              |
| cspell@8.x              | Node.js 18+         | Requires modern Node.js for performance               |
| linkinator@7.5.3        | Node.js 20+         | Uses modern async/await patterns                      |
| Astro 5.x               | MDX 3.x             | Starlight uses MDX 3.x for components                 |

---

## Sources

- **remark ecosystem** — https://github.com/remarkjs/remark (8.7k stars, 150+ plugins)
- **markdownlint** — https://github.com/DavidAnson/markdownlint (5.8k stars, 60+ rules)
- **Prettier** — https://prettier.io (Official docs, verified Feb 2025)
- **cspell** — https://cspell.org (Verified Feb 2025)
- **linkinator** — https://github.com/JustinBeckwith/linkinator (1.2k stars, latest v7.5.3 Dec 2025)
- **textlint** — https://textlint.github.io (Pluggable natural language linter)
- **pre-commit** — https://github.com/pre-commit/pre-commit-hooks (6.4k stars, language-agnostic)
- **MDX** — https://mdxjs.com (Verified Feb 2025)
- **ESLint** — https://eslint.org/docs/latest/ (v10.0.0 current, removed markdown support)
- **remark-lint** — https://github.com/remarkjs/remark-lint (1k stars, 70+ lint rules)

---

_Stack research for: Technical Documentation Quality Maintenance_
_Researched: 2025-02-16_
