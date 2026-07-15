const response = await scalekit.connectedAccounts.listConnectedAccounts({
  organizationId: 'org_123',
  pageSize: 20,
})
const connectedAccounts = response.connectedAccounts
