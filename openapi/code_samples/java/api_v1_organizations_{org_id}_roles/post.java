CreateOrganizationRoleResponse res = scalekitClient.roles().createOrganizationRole(
    "org_123",
    CreateOrganizationRoleRequest.newBuilder()
        .setOrgId("org_123")
        .setRole(
            CreateOrganizationRole.newBuilder()
                .setName("org_admin")
                .setDisplayName("Org Admin")
                .setDescription("Organization-scoped role")
                .setExtends("base_role_name")          // optional
                .addPermissions("perm.read")           // optional
                .addPermissions("perm.write")          // optional
                .build()
        )
        .build()
);