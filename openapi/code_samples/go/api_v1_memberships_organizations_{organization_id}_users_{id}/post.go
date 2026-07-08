func main() {
    scalekitClient := scalekit.NewScalekitClient(
        os.Getenv("SCALEKIT_ENV_URL"),
        os.Getenv("SCALEKIT_CLIENT_ID"),
        os.Getenv("SCALEKIT_CLIENT_SECRET"),
    )
    membership := &usersv1.CreateMembership{
        Roles: []*usersv1.Role{{Name: "admin"}},
        Metadata: map[string]string{
            "department": "engineering",
            "location":   "nyc-office",
        },
    }
    resp, 
      err := scalekitClient.User().CreateMembership(
        context.Background(), "org_123", 
          "usr_123", membership, false)
    if err != nil {
        panic(err)
    }
}