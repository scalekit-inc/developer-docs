resp, err := scalekitClient.Role().ListDependentRoles(ctx, "admin")
if err != nil { /* handle err */ }
_ = resp