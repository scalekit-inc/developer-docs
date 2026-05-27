# Add a new domain to an organization
response = scalekit_client.domain.create_domain(organization_id="org-123",

			domain_name="example.com",
 			domain_type="ORGANIZATION_DOMAIN")