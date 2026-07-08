from scalekit.v1.clients.clients_pb2 import OrganizationClient

m2m_client = OrganizationClient(
    name="GitHub Actions Deployment Service",
    description="Service account for GitHub Actions to deploy applications
to production",
    custom_claims=[
        {"key": "github_repository", "value": "acmecorp/inventory-service"},
        {"key": "environment", "value": "production_us"}
    ],
    scopes=["deploy:applications", "read:deployments"],
    audience=["deployment-api.acmecorp.com"],
    expiry=3600
)

response = scalekit_client.m2m_client.create_organization_client(
    organization_id="SCALEKIT_ORGANIZATION_ID",
    m2m_client=m2m_client
)