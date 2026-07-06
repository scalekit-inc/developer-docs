ListUserRolesResponse resp = scalekitClient.users().listUserRoles("org_123", "usr_123");
List<Role> roles = resp.getRolesList();