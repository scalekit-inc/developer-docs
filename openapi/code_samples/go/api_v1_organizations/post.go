organization, err := scalekitClient.Organization().CreateOrganization(
  ctx,
  name,
  scalekit.CreateOrganizationOptions{
    ExternalId: "externalId",
  },
)
