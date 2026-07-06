UpdateRoleResponse res = scalekitClient.roles().updateRole(
    "admin",
    UpdateRoleRequest.newBuilder()
        .setRole(
            UpdateRole.newBuilder()
                .setDisplayName("Admin (Updated)")
                .setDescription("Updated description")
                .build()
        )
        .build()
);