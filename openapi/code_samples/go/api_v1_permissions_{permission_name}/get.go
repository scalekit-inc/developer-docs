resp, err := scalekitClient.Permission().GetPermission(ctx, "read:users")
if err != nil { /* handle err */ }
_ = resp