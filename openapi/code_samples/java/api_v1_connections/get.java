// List connections by organization id
ListConnectionsResponse response = scalekitClient.connections(
  ).listConnections(organizationId);

// List connections by domain
ListConnectionsResponse response = scalekitClient.connections(
  ).listConnectionsByDomain("your-domain.com");