resp, err := scalekitClient.Permission().ListPermissions(ctx)
if err != nil { /* handle err */ }
_ = resp