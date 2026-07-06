err := scalekitClient.Permission().DeletePermission(ctx, "read:users")
if err != nil { /* handle err */ }