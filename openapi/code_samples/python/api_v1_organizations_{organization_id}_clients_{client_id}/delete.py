import os

org_id = "org_123"
client_id = os.environ["M2M_CLIENT_ID"]

scalekit_client.m2m_client.delete_organization_client(
    organization_id=org_id,
    client_id=client_id,
)
