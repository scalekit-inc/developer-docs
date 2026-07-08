CreatePermissionResponse res = scalekitClient.permissions().createPermission(
    CreatePermissionRequest.newBuilder()
        .setPermission(
            CreatePermission.newBuilder()
                .setName("read:users")
                .setDescription("Allows reading users")
                .build()
        )
        .build()
);