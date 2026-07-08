# Remove a domain from an organization
# Caution: Deletion is permanent and may affect user access
response = scalekit_client.domain.delete_domain(
    organization_id="org_123",
    domain_id="dom_123"
)