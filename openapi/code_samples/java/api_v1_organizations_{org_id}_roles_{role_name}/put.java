UpdateOrganizationRoleResponse res = scalekitClient.roles().updateOrganizationRole(
    "org_123",
    "org_admin",
    UpdateOrganizationRoleRequest.newBuilder()
        .setRole(
            UpdateRole.newBuilder()
                .setDisplayName("Org Admin (Updated)")
                .setDescription("Updated org role description")
                .build()
        )
        .build()
);