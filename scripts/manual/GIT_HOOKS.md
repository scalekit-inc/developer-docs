# Git Hooks Setup

This project uses **pretty-quick** + **simple-git-hooks** for automated code formatting and build verification.

## What the hooks do:

- **Pre-commit**: Automatically formats staged files with Prettier
- **Pre-push**: Runs the full build process (search index generation + Astro build) before allowing pushes

## Automatic Setup

The hooks are automatically installed when you run:

```bash
pnpm install
```

## Manual Setup

If you need to manually set up or troubleshoot the git hooks:

```bash
pnpm run setup:hooks
```

## Troubleshooting

### "Hooks not running" Issue

If you previously used husky or have git hooks configured differently, you might have a `core.hooksPath` configuration that prevents the hooks from running.

**Check your git configuration:**

```bash
git config --get core.hooksPath
```

**If it returns anything (especially `.husky/_`), fix it:**

```bash
git config --unset core.hooksPath
pnpm run setup:hooks
```

### Verification

To verify hooks are working:

1. **Test pre-commit**: Make a change to a file and commit it
   - You should see pretty-quick output if files need formatting

2. **Test pre-push**: Try to push with uncommitted changes
   - It should prevent the push and show an error
   - With clean working directory, it should run the full build

## Migration from Husky

This project was migrated from husky to pretty-quick + simple-git-hooks for:

- ⚡ Better performance and smaller dependencies
- 🔧 Simpler configuration (single JSON file)
- 🎯 Purpose-built for Prettier integration
- 🛠️ Easier maintenance and debugging
