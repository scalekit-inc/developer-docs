# List clients for a specific organization
org_id = 'SCALEKIT_ORGANIZATION_ID'

# Retrieve all clients with default pagination
response = scalekit_client.m2m_client.list_organization_clients(
    organization_id=org_id,
    page_size=30
)

# Access the clients list
clients = response.clients
for client in clients:
    print(f"Client ID: {scalekit_client.id}, Name: {scalekit_client.name}")