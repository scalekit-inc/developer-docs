response, err := scalekitClient.M2M().CreateOrganizationClientSecret(
  ctx,
  "org_123",
  "skc_xxxxx",
)
if err != nil {
  // handle error
  return
}
_ = response
