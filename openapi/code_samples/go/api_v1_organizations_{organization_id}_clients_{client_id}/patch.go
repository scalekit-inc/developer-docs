response, err := scalekitClient.M2M().UpdateOrganizationClient(
  ctx,
  "org_123",
  "skc_xxxxx",
  scalekit.UpdateOrganizationClientOptions{
    Description: "Service account for GitHub Actions to deploy applications to production_eu",
  },
)
if err != nil {
  // handle error
  return
}
_ = response
