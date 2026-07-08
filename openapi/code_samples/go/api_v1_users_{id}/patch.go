upd := &usersv1.UpdateUser{
    UserProfile: &usersv1.UpdateUserProfile{
        FirstName: "John",
        LastName:  "Smith",
    },
    Metadata: map[string]string{
        "department": "sales",
    },
}
scalekitClient.User().UpdateUser(ctx, "usr_123", upd)