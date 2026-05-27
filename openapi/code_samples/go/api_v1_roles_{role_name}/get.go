resp, err := scalekitClient.Role().GetRole(ctx, "admin")
if err != nil { /* handle err */ }
_ = resp