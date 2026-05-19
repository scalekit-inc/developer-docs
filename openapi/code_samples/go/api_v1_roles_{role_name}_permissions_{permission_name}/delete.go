err := scalekitClient.Permission().RemovePermissionFromRole(ctx, "admin", "read:users")
if err != nil { /* handle err */ }