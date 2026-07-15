# List clients for a specific organization
org_id = "org_123"

response = scalekit_client.m2m_client.list_organization_clients(
    organization_id=org_id,
    page_size=30,
)

clients = response.clients
for client in clients:
    print(f"Client ID: {client.id}, Name: {client.name}")
