err := scalekitClient.M2M().DeleteOrganizationClientSecret(
  ctx,
  "org_123",
  "skc_xxxxx",
  "sks_xxxxx",
)
if err != nil {
  // handle error
  return
}
