err := scalekitClient.M2M().DeleteOrganizationClient(
  ctx,
  "org_123",
  "skc_xxxxx",
)
if err != nil {
  // handle error
  return
}
