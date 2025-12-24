# Merge Strategy Document

## Context

This document tracks the content reorganization between `main` and `preview/home-v4` branches. The `preview/home-v4` branch restructured documentation paths, moving files from `/fsa/guides/` and `/guides/` to new locations under `/authenticate/`.

## Content Backport (main → preview/home-v4)

**Date:** 2025-11-21
**Commits backported:** 5ce4242, 4ca1e4e, acf6b0e, c57013c, 5d1a5f0

### Files Moved in preview/home-v4:

| Original Path (main)               | New Path (preview/home-v4)                            | Redirect Configured                |
| ---------------------------------- | ----------------------------------------------------- | ---------------------------------- |
| `fsa/guides/manage-session.mdx`    | `authenticate/fsa/manage-session.mdx`                 | ✅ Line 15 in redirects.config.ts  |
| `guides/interceptor-scenarios.mdx` | `authenticate/interceptors/interceptor-scenarios.mdx` | ✅ Line 119 in redirects.config.ts |
| `mcp/integrations/fastmcp.mdx`     | `authenticate/mcp/fastmcp-quickstart.mdx`             | ✅ Line 148 in redirects.config.ts |

### Content with Semantic Changes:

| Content                      | Source (main)                        | Destination (preview/home-v4)                | Reason                                          |
| ---------------------------- | ------------------------------------ | -------------------------------------------- | ----------------------------------------------- |
| User limits per organization | `fsa/guides/manage-organization.mdx` | `fsa/reference/user-management-settings.mdx` | Configuration setting belongs in reference docs |

**Note:** `manage-organization.mdx` was NOT moved - it remains at `fsa/guides/manage-organization.mdx` on both branches.

### Changes Applied:

1. **User Limits Section** (commit acf6b0e)
   - Content: "Limit user sign-ups in an organization" section
   - Added to: `fsa/reference/user-management-settings.mdx` (after line 42)
   - Images copied:
     - `src/assets/docs/manage-organization/limit-org-users.png`
     - `src/assets/docs/user-management-settings/snippet_user_limitspng.png`

2. **Remote Session Management** (commit c57013c)
   - Content: +124 lines of session management APIs
   - Added to: `authenticate/fsa/manage-session.mdx` (end of file)

3. **Interceptor ID Token Clarifications** (commit 5ce4242)
   - Changed: "access tokens and ID tokens" → "ID tokens"
   - Changed: "both the access token and ID token" → "the ID token"
   - Changed: All step headers from `###` to `####` within Steps components
   - File: `authenticate/interceptors/interceptor-scenarios.mdx`

4. **FastMCP Inspector Note** (commit 5d1a5f0)
   - Added: Aside note about leaving Inspector authentication fields empty
   - File: `authenticate/mcp/fastmcp-quickstart.mdx` (after screenshot)

5. **SDK Version Update** (commit acf6b0e)
   - Changed: Java SDK version from 2.0.5 → 2.0.6
   - File: `src/components/templates/_installsdk.mdx`

6. **Swagger JSON** (commit 4ca1e4e)
   - Note: Not included in this backport (would create merge conflicts with API changes)
   - Recommendation: Regenerate from source when branches fully merge

---

## Future Merge (preview/home-v4 → main)

### 🚨 IMPORTANT: File Cleanup Required

When merging `preview/home-v4` into `main`, you MUST delete old file paths to avoid duplicate content:

```bash
# After merging preview/home-v4 into main:
git checkout main
git merge preview/home-v4

# Delete old file locations:
git rm src/content/docs/fsa/guides/manage-session.mdx
git rm src/content/docs/guides/interceptor-scenarios.mdx
git rm src/content/docs/mcp/integrations/fastmcp.mdx

# Commit the cleanup:
git commit -m "chore: remove old file paths after restructure"
```

### Redirects Verification

After merging, verify these redirects are active in `redirects.config.ts`:

```typescript
'/fsa/guides/manage-session': '/authenticate/fsa/manage-session/',
'/guides/interceptor-scenarios': '/authenticate/interceptors/interceptor-scenarios/',
'/mcp/integrations/fastmcp': '/authenticate/mcp/fastmcp-quickstart/',
```

### Post-Merge Checklist:

- [ ] Old file paths deleted
- [ ] Redirects are active
- [ ] Run `pnpm build` to check for broken links
- [ ] Verify all images are accessible
- [ ] Check that no content is duplicated
- [ ] Test redirects work in production

---

## Merge Conflict Resolution Strategy

If you encounter conflicts when merging `preview/home-v4` → `main`:

### Scenario 1: Content exists in both old and new locations

**Solution:** Keep the new location, delete the old location

### Scenario 2: Main has updates to moved files

**Solution:**

1. Accept changes from preview/home-v4 (new location)
2. Manually review main's changes at old location
3. Apply any missing updates to new location
4. Delete old location

### Scenario 3: Redirects conflict

**Solution:** Keep preview/home-v4's redirect configuration (it's newer)

---

## Additional Notes

### Why Semantic Merge?

This backport used semantic placement rather than mechanical `git merge` because:

- Content was reorganized by purpose (guides vs reference)
- File paths changed significantly
- Some content moved to conceptually different locations
- Maintains the new information architecture

### Files NOT Moved

These files remain at their original paths:

- `fsa/guides/manage-organization.mdx` - Still at `fsa/guides/`
- `fsa/reference/user-management-settings.mdx` - Already in reference/

### Two Different "Limit" Features

Don't confuse these two separate features:

1. **Organization creation limit per user** - How many orgs ONE USER can create (already on preview/home-v4)
2. **User limits per organization** - How many USERS per ORG / seat caps (added from main)

Both features should coexist in `user-management-settings.mdx`.

---

## Questions?

If you encounter issues during the reverse merge:

1. Check this document for guidance
2. Look at the redirect configuration
3. Verify content doesn't exist in both locations
4. Use `git log` to see the semantic merge commit message
