organization, err := scalekitClient.Organization().UpdateOrganization(
  ctx,
  organizationId,
  &scalekit.UpdateOrganization{
    DisplayName: "displayName",
    ExternalId:  "externalId",
  },
)
