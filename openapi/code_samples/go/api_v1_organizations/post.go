organization, err := ScalekitClient.Organization.CreateOrganization(
  ctx,
  name,
  scalekit.CreateOrganizationOptions{
    ExternalID: "externalId",
  },
)