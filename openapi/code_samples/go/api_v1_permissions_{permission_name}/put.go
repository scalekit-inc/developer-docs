resp, err := scalekitClient.Permission().UpdatePermission(ctx, "read:users", &rolesv1.CreatePermission{
    Name:        "read:users",
    Description: "Allows reading user resources",
})
if err != nil { /* handle err */ }
_ = resp