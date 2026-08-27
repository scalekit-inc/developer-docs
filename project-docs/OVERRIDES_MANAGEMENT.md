# Overrides management

`pnpm.overrides` in `package.json` pins transitive dependency versions.

Review overrides after a major upgrade:

1. Run `pnpm outdated`.
2. Remove an override when the parent package already ships a safe version.
3. Run `pnpm install` and `pnpm build`.
4. Commit the change.

Keep the vendor override for `@astrojs/starlight-docsearch` (`file:./vendor/docsearch`). That fork is required for DocSearch v4 Ask AI.
