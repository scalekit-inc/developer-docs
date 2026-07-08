resp, err := scalekitClient.Permission().ListRolePermissions(ctx, "admin")
if err != nil { /* handle err */ }
_ = resp