resp, err := scalekitClient.Role().UpdateDefaultRoles(ctx, "member")
if err != nil { /* handle err */ }
_ = resp