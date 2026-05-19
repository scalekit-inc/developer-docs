resp, err := scalekitClient.Role().ListOrganizationRoles(ctx, "org_123")
if err != nil { /* handle err */ }
_ = resp