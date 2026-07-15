// Basic delete
scalekitClient.roles().deleteOrganizationRole("org_123", "org_role_admin");

// With reassignment
scalekitClient.roles().deleteOrganizationRole("org_123", "org_role_admin", "org_role_member");