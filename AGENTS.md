# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Scalekit developer documentation site built with Astro v5 + Starlight, deployed on Netlify in SSR mode. Content is authored in MDX. See `README.md` and `CONTRIBUTING.md` for full details.

### Prerequisites

- **Node.js** >= 18 (v22 recommended)
- **pnpm** >= 10
- **D2** diagramming tool — required for both dev server and build. Install via `bash scripts/install-d2.sh` then ensure `$HOME/.local/bin` is on `PATH`.

### Running the dev server

```bash
export PATH="$HOME/.local/bin:$PATH"
pnpm dev
```

Serves at `http://localhost:4321`. The dev command runs `astro dev --no-hmr`.

### Gotchas

- **D2 is required**: The Astro dev server will fail immediately if `d2` is not on `PATH`. The `astro-d2` integration errors out during `astro:config:setup` if D2 is missing.
- **pnpm build scripts**: pnpm v10 blocks native build scripts by default (esbuild, sharp, etc.). After `pnpm install`, run the esbuild install scripts manually if Astro fails to start: `node node_modules/.pnpm/esbuild@*/node_modules/esbuild/install.js` for each esbuild version present.
- **GITHUB_TOKEN is optional**: Without it, GitHub API calls are rate-limited to 60 req/hr. Some SDK reference content may fail to load but the site still runs.
- **`.env` file**: `pnpm install` auto-creates `.env` from `.env.example` via the postinstall script if it doesn't exist. Most env vars are optional for local dev.
- **Vendor dependency**: `@astrojs/starlight-docsearch` is linked locally from `vendor/docsearch/`. `pnpm install` handles this automatically.
- **Format check**: `pnpm format:check` reports issues in `vendor/docsearch/` files — these are pre-existing in vendored code and can be ignored.

### Key commands

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `pnpm dev`          | Start dev server (port 4321)   |
| `pnpm build`        | Production build to `./dist`   |
| `pnpm format:check` | Check formatting with Prettier |
| `pnpm format`       | Auto-format files              |

### Git hooks

`pnpm install` sets up `simple-git-hooks` with a `pre-commit` (Prettier on staged files) and `pre-push` (full build). Use `--no-verify` to bypass if needed for WIP branches.
