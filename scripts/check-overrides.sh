#!/bin/bash
# Script to check if pnpm overrides are still needed. This is introduced to be proactive with dependabot security vulnerabilities.
# Usage: ./scripts/check-overrides.sh

set -e

echo "🔍 Checking if overrides are still needed..."
echo ""

# Read overrides from package.json
OVERRIDES=$(node -e "
  const pkg = require('./package.json');
  const overrides = pkg.pnpm?.overrides || {};
  Object.keys(overrides).forEach(key => {
    if (key !== '@astrojs/starlight-docsearch') {
      console.log(key + '|' + overrides[key]);
    }
  });
")

if [ -z "$OVERRIDES" ]; then
  echo "✅ No security-related overrides found (excluding vendor overrides)"
  exit 0
fi

echo "$OVERRIDES" | while IFS='|' read -r package version; do
  if [ -z "$package" ]; then
    continue
  fi

  echo "📦 Checking: $package@$version"

  # Check what version is actually installed
  INSTALLED=$(pnpm list "$package" --depth=999 --json 2>/dev/null | \
    node -e "
      const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
      const find = (obj, name) => {
        if (obj.dependencies) {
          for (const [key, val] of Object.entries(obj.dependencies)) {
            if (key === name) return val.version;
            const found = find(val, name);
            if (found) return found;
          }
        }
        return null;
      };
      const ver = find(data, process.argv[1]);
      console.log(ver || 'NOT_FOUND');
    " "$package" || echo "NOT_FOUND")

  if [ "$INSTALLED" = "NOT_FOUND" ]; then
    echo "   ⚠️  Package not found in dependency tree - override may be unnecessary"
  elif [ "$INSTALLED" = "$version" ] || [ "$INSTALLED" = "${version#^}" ]; then
    echo "   ✅ Override is active: installed version is $INSTALLED"

    # Check if any direct dependency could be upgraded to get this version naturally
    echo "   🔎 Checking if parent packages need updates..."
    pnpm outdated "$package" 2>/dev/null || echo "   (Could not check for updates)"
  else
    echo "   ⚠️  Override may not be working: installed is $INSTALLED, override wants $version"
  fi

  echo ""
done

echo "💡 Tip: After upgrading major dependencies (Astro, Starlight, etc.),"
echo "   re-run this script to see if overrides are still needed."
