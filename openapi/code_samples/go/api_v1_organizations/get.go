organizations, err := scalekitClient.Organization.ListOrganizations(
  ctx,
  &scalekit.ListOrganizationOptions{
    PageSize: 10,
  }
)