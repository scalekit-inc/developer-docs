err := scalekitClient.User().DeleteMembership(
  ctx,
  "org_123",
  "usr_123",
  false, // cascade: also remove from nested groups when true
)
if err != nil {
  // handle error
  return
}
