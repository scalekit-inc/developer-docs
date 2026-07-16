organizations, err := scalekitClient.Organization().ListOrganization(
  ctx,
  &scalekit.ListOrganizationOptions{
    PageSize: 10,
  },
)
