response, err := scalekitClient.M2M().CreateOrganizationClient(
  ctx,
  "org_123",
  scalekit.CreateOrganizationClientOptions{
    Name:        "GitHub Actions Deployment Service",
    Description: "Service account for GitHub Actions to deploy applications to production",
    Scopes:      []string{"deploy:applications", "read:deployments"},
    Audience:    []string{"deployment-api.acmecorp.com"},
  },
)
if err != nil {
  // handle error
  return
}
_ = response
