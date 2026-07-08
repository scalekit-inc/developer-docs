resp, err := scalekitClient.Role().GetOrganizationRole(ctx, "org_123", "org_admin")
if err != nil { /* handle err */ }
_ = resp