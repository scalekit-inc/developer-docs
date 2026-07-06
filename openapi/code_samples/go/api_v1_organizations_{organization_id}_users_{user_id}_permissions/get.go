resp, err := scalekitClient.User().ListUserPermissions(ctx, "org_123", "usr_123")
if err != nil {
    // handle error
}
permissions := resp.Permissions