<!--
Sync Impact Report:
- Version change: Template → 1.0.0 (NEW: Initial constitution for Scalekit Documentation)
- Modified principles: All principles defined from template
- Added sections: Complete constitution structure from template
- Removed sections: None (first version)
- Templates requiring updates:
  ✅ plan-template.md - Constitution Check section aligned with new principles
  ✅ spec-template.md - Requirements structure compatible with constitution
  ✅ tasks-template.md - Task organization reflects principle-driven development
  ✅ checklist-template.md - No constitutional references found
  ✅ agent-file-template.md - No constitutional references found
- Follow-up TODOs: None - all placeholders filled
-->

# Scalekit Documentation Constitution

## Core Principles

### I. Documentation-First Development

Every feature must include comprehensive, user-focused documentation. Documentation is not an afterthought but a first-class deliverable that guides implementation. All code changes require corresponding documentation updates. User scenarios drive both feature development and documentation structure.

**Rationale**: As a documentation site, content quality and user experience are paramount to the project's success.

### II. Multi-Language SDK Consistency

All code examples MUST include Node.js, Python, Go, and Java implementations with consistent variable naming conventions. Examples must show both success and error handling paths. Security implications must be explained for each implementation.

**Rationale**: Scalekit serves diverse developer communities, and inconsistent examples reduce adoption and increase support burden.

### III. Content Structure and Standards (NON-NEGOTIABLE)

Every document must follow the established template structure with proper frontmatter, semantic organization, and clear user journeys. Style guide adherence is mandatory - voice must be confident, direct, collaborative, and instructional using second person perspective.

**Rationale**: Consistency in structure and voice builds user trust and reduces cognitive load when navigating the documentation.

### IV. Technical Accuracy and Security

All technical content must be validated through testing. Security implications must be clearly documented. API examples must be current and functional. Authentication and integration examples must follow security best practices.

**Rationale**: Incorrect documentation can compromise user security and erode platform trust.

### V. Performance and Build Quality

Build processes must succeed without errors or warnings. Formatting and linting standards are enforced through git hooks. All dependencies must be properly managed and regularly updated to maintain site performance.

**Rationale**: Documentation sites must load quickly and reliably, especially for developer audiences who expect high performance.

## Content Quality Standards

### Writing Standards

All content must adhere to the modular writing standards located in `src/writing-standards/`. These standards cover style guide, technical guidelines, content structure, and document templates. Style checks must pass before publication.

### Variable Naming Conventions

- Node.js: `scalekit`
- Python: `scalekit_client`
- Go: `scalekitClient`
- Java: `scalekitClient`

These naming conventions are NON-NEGOTIABLE across all documentation and examples.

### Code Examples

All code examples must use `<Tabs syncKey="tech-stack">` format and include security comments explaining potential threats. Both success and error paths must be demonstrated.

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

## Governance

### Amendment Process

Constitution changes require:

1. Documentation of the proposed change and rationale
2. Impact analysis on existing content and templates
3. Version increment following semantic versioning
4. Update of all dependent artifacts and templates

### Compliance Review

All feature specifications and implementation plans must verify constitutional compliance. Violations require explicit justification in the "Complexity Tracking" section with simpler alternatives documented.

**Version**: 1.0.0 | **Ratified**: 2026-02-06 | **Last Amended**: 2026-02-06
