const response = await scalekit.user.listOrganizationUsers('org_123', {
  pageSize: 50,
})
console.log(response.users)
