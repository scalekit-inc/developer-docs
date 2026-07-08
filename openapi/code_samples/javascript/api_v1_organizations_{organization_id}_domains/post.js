// Add a new domain to an organization
const response = await scalekit.createDomain('org-123', 'example.com', {
  // Domain type: controls user authentication and email validation

  domainType: 'ORGANIZATION_DOMAIN',
})
