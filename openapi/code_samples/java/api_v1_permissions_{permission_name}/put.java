UpdatePermissionResponse res = scalekitClient.permissions().updatePermission(
    "read:users",
    UpdatePermissionRequest.newBuilder()
        .setPermission(
            CreatePermission.newBuilder()
                .setName("read:users")
                .setDescription("Allows reading user resources")
                .build()
        )
        .build()
);