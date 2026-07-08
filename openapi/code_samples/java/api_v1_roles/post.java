CreateRoleResponse res = scalekitClient.roles().createRole(
    CreateRoleRequest.newBuilder()
        .setRole(
            CreateRole.newBuilder()
                .setName("admin")
                .setDisplayName("Admin")
                .setDescription("Environment-level role")
                // .setExtends("base_role")         // optional
                // .addPermissions("read:users")    // optional
                .build()
        )
        .build()
);