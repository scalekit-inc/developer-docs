if err := scalekitClient.User().DeleteUser(ctx, 
  "usr_123"); err != nil {
    panic(err)
}