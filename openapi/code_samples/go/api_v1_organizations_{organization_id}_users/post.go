newUser := &usersv1.CreateUser{
    Email:      "user@example.com",
    ExternalId: "ext_12345a67b89c",
    Metadata: map[string]string{
        "department": "engineering",
        "location":   "nyc-office",
    },
    UserProfile: &usersv1.CreateUserProfile{
        FirstName: "John",
        LastName:  "Doe",
    },
}
cuResp, 
  err := scalekitClient.User().CreateUserAndMembership(ctx, "org_123",
newUser, false) if err != nil { /* handle error */ }