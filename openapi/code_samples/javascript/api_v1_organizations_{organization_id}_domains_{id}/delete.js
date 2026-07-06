// Remove a domain from an organization
// Caution: Deletion is permanent and may affect user access
const response = await scalekit.domain.deleteDomain(organizationId, domainId)
