options = CreateOrganizationOptions()
options.external_id = "externalId"
organization = scalekit_client.organization.create_organization(
  name,
  options=options
)