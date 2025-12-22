# Development Environment and Architecture

## Development Environment

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

## Architecture Overview

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
