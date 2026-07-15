response, err := scalekitClient.M2M().GetOrganizationClient(
  ctx,
  "org_123",
  "skc_xxxxx",
)
if err != nil {
  // handle error
  return
}
_ = response
