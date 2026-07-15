CreateDomainRequest request = CreateDomainRequest.newBuilder()
	.setOrganizationId(organization.getId())
	.setDomain(CreateDomain.newBuilder()
		.setDomain("example.com")
		.setDomainType("ORGANIZATION_DOMAIN")
		.build())
	.build();
	
Domain domain = scalekitClient.domains().createDomain(request);