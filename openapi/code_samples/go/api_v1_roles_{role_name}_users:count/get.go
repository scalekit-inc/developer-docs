resp, err := scalekitClient.Role().GetRoleUsersCount(ctx, "admin")
if err != nil { /* handle err */ }
_ = resp