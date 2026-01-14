# Overrides Management Guide

## What Are pnpm Overrides?

`pnpm.overrides` in `package.json` forces specific versions of transitive dependencies (dependencies of your dependencies). This is commonly used to:

- **Patch security vulnerabilities** in transitive dependencies before upstream fixes are available
- **Resolve version conflicts** between packages that require incompatible versions
- **Test pre-release versions** of dependencies before official updates

## Why This Script Exists

When you add an override to fix a security vulnerability, it's easy to forget about it. Over time, the packages that depend on the overridden package may update their own dependencies, making the override unnecessary.

**Consequences of stale overrides:**

- Conflicting dependency requirements can cause build failures
- Dependabot alerts may persist even after the underlying issue is resolved
- Dependency resolution becomes harder to debug

## The `check-overrides.sh` Script

### Location

`./scripts/check-overrides.sh`

### Usage

```bash
./scripts/check-overrides.sh
```

Make it executable first if needed:

```bash
chmod +x scripts/check-overrides.sh
```

### What It Checks

For each override in `package.json` (excluding the vendor override for `@astrojs/starlight-docsearch`):

1. **Is the package installed?** - Warns if the package isn't found in the dependency tree
2. **Is the override working?** - Verifies the actual installed version matches the override
3. **Can parents be upgraded?** - Runs `pnpm outdated` to see if updating direct dependencies would resolve the need for the override

### Example Output

```
🔍 Checking if overrides are still needed...

📦 Checking: semver@7.5.4
   ✅ Override is active: installed version is 7.5.4
   🔎 Checking if parent packages need updates...
   Package  Wanted  Latest  PackageType
   semver  7.5.3   7.5.4   dependencies

💡 Tip: After upgrading major dependencies (Astro, Starlight, etc.),
   re-run this script to see if overrides are still needed.
```

## When to Run

Run this script proactively to manage security-related overrides:

- **Before major upgrades** (Astro, Starlight, Node.js version) - Establish a baseline
- **After major upgrades** - Check if overrides are still needed
- **When Dependabot alerts appear** - Verify existing overrides are working
- **Periodically** (e.g., monthly) - Prevent stale overrides from accumulating

## Removing an Override

When the script indicates an override is no longer needed:

1. Remove the entry from `package.json` → `pnpm.overrides`
2. Run `pnpm install` to resolve dependencies naturally
3. Verify the build still works: `pnpm build`
4. Commit the change

## Tracking

| Override | Package | Version Added | Reason | Can Remove? |
| -------- | ------- | ------------- | ------ | ----------- |
| -        | -       | -             | -      | -           |

_(Maintain this table for any active overrides)_
