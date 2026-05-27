resp, err := scalekitClient.User().GetUser(ctx, "usr_123456")
if err != nil {
    // handle error
}
user := resp.User