const response = await scalekit.m2m.listOrganizationClients('org_123', {
  pageSize: 30,
})
const clients = response.clients
