AddPermissionsToRoleResponse res = scalekitClient.permissions().addPermissionsToRole(
    "role_admin",
    AddPermissionsToRoleRequest.newBuilder()
        .addPermissionNames("perm.read")
        .addPermissionNames("perm.write")
        .build()
);