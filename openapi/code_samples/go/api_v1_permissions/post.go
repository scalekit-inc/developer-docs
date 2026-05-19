resp, err := scalekitClient.Permission().CreatePermission(ctx, &rolesv1.CreatePermission{

	Name:        "read:users",

	Description: "Allows reading users",

})
if err != nil { /* handle err */ }
_ = resp