scalekitClient := scalekit.NewScalekitClient(
  <SCALEKIT_ENVIRONMENT_URL>,
  <SCALEKIT_CLIENT_ID>,
  <SCALEKIT_CLIENT_SECRET>
)

organization, err := scalekitClient.Organization.GetOrganization(
  ctx,
  organizationId
)