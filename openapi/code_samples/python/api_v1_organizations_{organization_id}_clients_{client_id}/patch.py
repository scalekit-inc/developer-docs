import os
from scalekit.v1.clients.clients_pb2 import OrganizationClient

org_id = "org_123"
client_id = os.environ["M2M_CLIENT_ID"]

update_m2m_client = OrganizationClient(
    description="Service account for GitHub Actions to deploy applications to production_eu",
    custom_claims=[
        {"key": "github_repository", "value": "acmecorp/inventory"},
        {"key": "environment", "value": "production_eu"},
    ],
)

response = scalekit_client.m2m_client.update_organization_client(
    organization_id=org_id,
    client_id=client_id,
    m2m_client=update_m2m_client,
)
