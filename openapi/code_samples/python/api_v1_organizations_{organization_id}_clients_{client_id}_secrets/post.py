import os

org_id = "org_123"
client_id = os.environ["M2M_CLIENT_ID"]

response = scalekit_client.m2m_client.add_organization_client_secret(
    organization_id=org_id,
    client_id=client_id,
)

# with_call returns (response, call)
secret_id = response[0].secret.id
