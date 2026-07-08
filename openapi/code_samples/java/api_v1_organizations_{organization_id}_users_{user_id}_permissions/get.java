ListUserPermissionsResponse resp = scalekitClient.users().listUserPermissions("org_123", "usr_123");
List<Permission> permissions = resp.getPermissionsList();