resp, err := scalekitClient.Role().UpdateDefaultOrganizationRoles(ctx, "org_123", "org_member")
if err != nil { /* handle err */ }
_ = resp