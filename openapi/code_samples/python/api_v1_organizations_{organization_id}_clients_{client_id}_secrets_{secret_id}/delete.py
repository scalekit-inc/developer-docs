# Get client and secret IDs from environment variables
org_id = '<SCALEKIT_ORGANIZATION_ID>'
client_id = os.environ['M2M_CLIENT_ID']
secret_id = os.environ['M2M_SECRET_ID']

# Remove the specified secret from the client
response = scalekit_client.m2m_client.remove_organization_client_secret(
    organization_id=org_id,
    client_id=client_id,
    secret_id=secret_id
)