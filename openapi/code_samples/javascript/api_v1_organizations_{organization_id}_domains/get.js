// List all domains in an organization
const response = await scalekit.domain.listDomains(organizationId, {
  domainType: 'ORGANIZATION_DOMAIN',
})

// Domain object contains:
// - id: Domain identifier
// - domain: Domain name
// - organizationId: Owning organization
// - domainType: Configuration type
