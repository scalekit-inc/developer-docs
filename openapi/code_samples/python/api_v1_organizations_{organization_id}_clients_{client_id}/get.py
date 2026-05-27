# Get client ID from environment variables
org_id = 'SCALEKIT_ORGANIZATION_ID'
client_id = os.environ['M2M_CLIENT_ID']

# Fetch client details for the specified organization
response = scalekit_client.m2m_client.get_organization_client(
    organization_id=org_id,
    client_id=client_id
)