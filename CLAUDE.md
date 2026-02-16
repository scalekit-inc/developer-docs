# CLAUDE.md - Scalekit Documentation Guide (Optimized)

## Overview

This file has been optimized and split into modular guides. The content has been reorganized into focused files for better performance and maintainability.

## New Modular Structure

The documentation guidelines have been split into:

1. **`src/writing-standards/.claude-core.md`** - Essential Claude Code instructions (personal)
2. **`src/writing-standards/style-guide.md`** - Writing style and voice guidelines
3. **`src/writing-standards/workflows.md`** - Development environment and architecture
4. **`src/writing-standards/document-templates.md`** - Document type categories and templates
5. **`src/writing-standards/content-standards.md`** - Content structure and formatting
6. **`src/writing-standards/technical-guidelines.md`** - Code examples and technical standards

## Quick Access

### For Claude Code Users

- Load the essential guide: `src/writing-standards/.claude-core.md`

### Detailed Guidelines

When you need specific guidance, read these files directly:

- **Writing Style**: `src/writing-standards/style-guide.md`
- **Document Templates**: `src/writing-standards/document-templates.md`
- **Technical Standards**: `src/writing-standards/technical-guidelines.md`
- **Content Structure**: `src/writing-standards/content-standards.md`
- **Development Workflows**: `src/writing-standards/workflows.md`

## Key Reminders

### Git Commits

- Do NOT include `Co-Authored-By` lines in commit messages

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
