// Basic delete
err := scalekitClient.Role().DeleteOrganizationRole(ctx, "org_123", "org_role_admin")
if err != nil { /* handle err */ }

// With reassignment
err = scalekitClient.Role().DeleteOrganizationRole(ctx, "org_123", "org_role_admin", "org_role_member")