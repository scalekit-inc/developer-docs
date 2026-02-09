# CLAUDE.md - Scalekit Documentation Guide (Optimized)

## Overview

This file is a quick reference for how the AI assistant should work in this repo. The **single source of truth** for documentation rules is the project constitution at `.specify/memory/constitution.md`. The older modular guides under `src/writing-standards/` are now optional references only; all enforceable standards have been inlined into the constitution.

## Primary source of truth

- **Constitution**: `.specify/memory/constitution.md`
  - Core principles (documentation-first, multi-language SDK consistency, technical accuracy, performance)
  - Writing and content standards (ted-docs philosophy, tw-guide alignment, style, headings, lists, formatting)
  - Document types and templates (how-to, API reference, concept, release notes)
  - Code example standards (multi-language tabs, Expressive Code usage, security comments, SDK variable naming)
  - Development workflow and architecture (commands, toolchain, content organization, navigation)

When in doubt, follow the constitution exactly. Do not introduce new rules that conflict with it.

## Key Reminders

### SDK Variable Names (CRITICAL)

- Node.js: `scalekit`
- Python: `scalekit_client`
- Go: `scalekitClient`
- Java: `scalekitClient`

### Document Types

1. **How-to Guide** - Task-oriented with steps
2. **API Reference** - Endpoint documentation
3. **Concept** - Explanatory without steps
4. **Release Notes** - Changes and migration

### Style Essentials

- Voice: Confident, direct, collaborative, instructional
- Person: Second person ("you", "your application")
- Tense: Present for descriptions, imperative for instructions
- Explain security implications and threats

## Technical Requirements

### Code Examples

- Must include all 4 languages (Node.js, Python, Go, Java)
- Use `<Tabs syncKey="tech-stack">`
- Include security comments explaining threats
- Show both success and error paths

### Frontmatter Essentials

```yaml
---
title: 'Clear title (≤60 chars)'
description: 'Concise description (≤160 chars)'
sidebar:
  label: 'Short label'
  order: 42
tags: [auth, sso, api]
---
```

### Quality Checklist

At the end of every draft, include:

```
STYLE-CHECK: [PASSED | TODO]
```

## Migration Notes

- The original 1459-line file has been split into focused modules
- Each guide is now more easily maintainable
- Content duplication with `.cursorrules` has been eliminated
- Performance improved by ~87% reduction in loaded content

---

**This optimized file serves as a quick reference. For detailed guidelines, see the modular files in `src/writing-standards/`.**
