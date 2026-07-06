domains, err := scalekitClient.Domain().ListDomains(ctx, "org_id", &scalekit.ListDomainOptions{
DomainType: "ORGANIZATION_DOMAIN",
})