resp, err := scalekitClient.Role().UpdateRole(ctx, "admin", &rolesv1.UpdateRole{
    DisplayName: "Admin (Updated)",
    Description: "Updated description",
})
if err != nil { /* handle err */ }
_ = resp