# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the Scalekit developer documentation site built with Astro and Starlight. It provides comprehensive documentation for Scalekit's authentication and user management platform, including Full Stack Auth (FSA), SSO, SCIM, and API references. Don't generate code samples in different languages unless explicitly asked for.

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
