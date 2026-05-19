# Get client ID from environment variables
org_id = '<SCALEKIT_ORGANIZATION_ID>'
client_id = os.environ['M2M_CLIENT_ID']

# Delete the specified client from the organization
response = scalekit_client.m2m_client.delete_organization_client(
    organization_id=org_id,
    client_id=client_id
)