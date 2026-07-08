# List connections by organization id
connections = scalekit_client.connection.list_connections(
  organization_id
)

# List connections by domain
response = scalekit_client.connection.list_connections_by_domain(domain="example.com")