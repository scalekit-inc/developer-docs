resp, err := scalekitClient.User().ListUserRoles(ctx, "org_123", "usr_123")
if err != nil {
    // handle error
}
roles := resp.Roles