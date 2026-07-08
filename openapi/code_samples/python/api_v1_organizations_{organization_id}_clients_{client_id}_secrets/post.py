# Get client ID from environment variables
org_id = 'SCALEKIT_ORGANIZATION_ID'
client_id = os.environ['M2M_CLIENT_ID']

# Add a new secret to the specified client
response = scalekit_client.m2m_client.add_organization_client_secret(
    organization_id=org_id,
    client_id=client_id
)

# Extract the secret ID from the response
secret_id = response[0].secret.id