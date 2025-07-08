# Swagger API Endpoint Reordering

This project uses automated scripts to maintain logical ordering of API endpoints in the Swagger documentation for better developer experience.

## What the script does:

- **reorder-swagger.js**: Advanced reordering with logical operation flow within resources, tag-based resource detection, and automatic backups

## Resource Priority Order

Endpoints are grouped by resource in this order:

1. **Organizations** - Organization management endpoints
2. **Users** - User lifecycle and management
3. **Memberships** - User-organization relationships
4. **Connections** - SSO and authentication connections
5. **Directories** - Directory synchronization
6. **Clients** - API client management
7. **Passwordless** - Passwordless authentication

## Logical Operation Ordering

Within each resource, operations follow logical flow:

### Passwordless Authentication

- `send` → `resend` → `verify`

### Users

- `list` → `create` → `get` → `update` → `delete`

## Tag-Based Resource Detection

The enhanced script now uses **tags** as the primary method for identifying resource groups, with path segments as fallback. This allows for future categorization like:

- **Admin Portal** - Administrative operations
- **API Auth** - Authentication and authorization
- **Passwordless Auth** - Passwordless authentication flows

## Usage

### Automatic Reordering (Recommended)

The script runs automatically when you start the development server:

```bash
pnpm run dev
```

This will reorder the swagger endpoints and then start the Astro dev server.

### Manual Reordering

```bash
# Reorder using the script directly
node scripts/reorder-swagger.js public/api/scalekit.swagger.json

# Or use the npm script
pnpm run reorder-swagger
```

### Output Options

```bash
# Overwrite original file (creates backup automatically)
node scripts/reorder-swagger.js public/api/scalekit.swagger.json

# Output to different file
node scripts/reorder-swagger.js public/api/scalekit.swagger.json public/api/scalekit.swagger.sorted.json
```

## Automatic Backup

When overwriting the original file, the script automatically creates a timestamped backup:

```
scalekit.swagger.json.bak.2025-01-15T10-30-45.json
```

## Adding New Resource Ordering

To add logical ordering for a new resource:

1. **Add to RESOURCE_PRIORITY** (if not already included)
2. **Add to OPERATION_PRIORITY** with desired keyword order:

```javascript
const OPERATION_PRIORITY = {
  passwordless: ['send', 'resend', 'verify'],
  users: ['list', 'create', 'get', 'update', 'delete'],
  new_resource: ['create', 'list', 'get', 'update', 'delete'],
}
```

## Troubleshooting

### "Wrong order still appears"

1. **Verify script execution**: Check console output for "✅ Swagger reordered and saved to..."
2. **Check file path**: Ensure you're editing the correct file
3. **Clear cache**: Restart your development server if using hot reload
4. **Check dev script**: Ensure you're running `pnpm run dev` which automatically reorders endpoints

### "Resource not recognized"

1. **Check tags**: Ensure endpoints have appropriate tags
2. **Verify path structure**: Paths should follow `/api/v1/{resource}/...` pattern
3. **Check slugification**: Tags are converted to lowercase with underscores

### "Operation keywords not found"

1. **Verify keywords**: Ensure operation keywords appear in the path
2. **Check case sensitivity**: Keywords are matched case-insensitively
3. **Update OPERATION_PRIORITY**: Add missing keywords to the configuration

## Integration with Scalar

Scalar renders API endpoints in the exact order they appear in the Swagger JSON file. The reordering scripts ensure:

- Logical resource grouping
- Consistent operation flow
- Better developer experience
- Maintainable documentation structure

## Migration Notes

This system was implemented to replace manual endpoint ordering and provides:

- 🔄 **Automated consistency** across all API documentation
- 🎯 **Logical flow** that matches developer expectations
- 🏷️ **Tag-based grouping** for flexible categorization
- 📦 **Automatic backups** to prevent data loss
- ⚡ **Fast execution** with minimal dependencies
