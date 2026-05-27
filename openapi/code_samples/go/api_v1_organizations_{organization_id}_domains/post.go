domain, err := scalekitClient.Domain().CreateDomain(ctx, "org_id", "example.com", &scalekit.CreateDomainOptions{

		DomainType: "ORGANIZATION_DOMAIN",

	})