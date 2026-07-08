// List connections by organization id
connections, err := scalekitClient.Connection().ListConnections(
  ctx,
  organizationId
)

// List connections by domain
connections, err := scalekitClient.Connection().ListConnectionsByDomain(ctx, 
  domain)