membership := &usersv1.CreateMembership{
  Roles: []*usersv1.Role{{Name: "admin"}},
  Metadata: map[string]string{
    "department": "engineering",
    "location":   "nyc-office",
  },
}
resp, err := scalekitClient.User().CreateMembership(
  ctx,
  "org_123",
  "usr_123",
  membership,
  false,
)
if err != nil {
  // handle error
  return
}
_ = resp
