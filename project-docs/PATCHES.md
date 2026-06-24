# Patched dependencies

This project uses [pnpm patches](https://pnpm.io/cli/patch) to fix upstream bugs in dependencies. Patches are stored in `patches/` and referenced in `package.json` under `pnpm.patchedDependencies`.

There are currently **no active patches**. The `vite-plugin-static-copy` patch was removed in the Astro 7 / Starlight 0.41 upgrade after `starlight-page-actions@0.6.1` pulled in `vite-plugin-static-copy@4.1.1` with the upstream fix ([sapphi-red/vite-plugin-static-copy#240](https://github.com/sapphi-red/vite-plugin-static-copy/pull/240)).

---

## Removed: vite-plugin-static-copy@4.1.0 (2026-06)

**Former file:** `patches/vite-plugin-static-copy@4.1.0.patch`

**Why it existed:** In Vite 6's Environment API, `vite-plugin-static-copy@4.1.0` wrote `starlight-page-actions` `.md` exports to the SSR `outDir` instead of `dist/`.

**Why it was removed:** `starlight-page-actions@0.6.1` depends on `vite-plugin-static-copy@4.1.1`, which includes the environment guard and per-environment `outDir` fix.

**Verify after upgrades:** Run `pnpm build` and confirm `.md` files exist in `dist/` (e.g. `dist/authenticate/mcp/quickstart.md`).
