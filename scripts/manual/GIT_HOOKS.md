# Git hooks

This project uses **pretty-quick** + **simple-git-hooks**.

- **Pre-commit**: formats staged files with Prettier
- **Pre-push**: blocks the push when the working tree is dirty

`pnpm install` registers the hooks through `scripts/setup-git-hooks.js`.

To install the hooks by hand:

```bash
npx simple-git-hooks
```

If hooks do not run, check `git config --get core.hooksPath`. If a path is set, run `git config --unset core.hooksPath` and then `npx simple-git-hooks`.
