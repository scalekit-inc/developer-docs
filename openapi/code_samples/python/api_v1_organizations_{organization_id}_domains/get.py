# List all domains in an organization
response = scalekit_client.domain.list_domains(
            organization_id="org_123",
            domain_type="ORGANIZATION_DOMAIN"
        )
# - organization_id: Owning organization
# - domain_type: domain type