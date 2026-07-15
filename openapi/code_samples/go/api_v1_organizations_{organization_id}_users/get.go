list, 
  err := scalekitClient.User().ListOrganizationUsers(ctx, "org_123", &scalekit.ListUsersOptions{PageSize:
50}) if err != nil { /* handle error */ }
fmt.Println(list.Users)