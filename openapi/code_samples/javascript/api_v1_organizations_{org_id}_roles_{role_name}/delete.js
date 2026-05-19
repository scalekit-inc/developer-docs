// Basic delete
await scalekit.role.deleteOrganizationRole("org_123", "org_role_admin");

// With reassignment
await scalekit.role.deleteOrganizationRole("org_123", "org_role_admin", "org_role_member");