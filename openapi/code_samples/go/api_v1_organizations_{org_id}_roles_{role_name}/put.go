resp, err := scalekitClient.Role().UpdateOrganizationRole(ctx, "org_123", "org_admin", &rolesv1.UpdateRole{
    DisplayName: "Org Admin (Updated)",
    Description: "Updated org role description",
})
if err != nil { /* handle err */ }
_ = resp