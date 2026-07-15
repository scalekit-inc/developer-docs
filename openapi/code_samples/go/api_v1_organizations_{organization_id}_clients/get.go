response, err := scalekitClient.M2M().ListOrganizationClients(
  ctx,
  "org_123",
  scalekit.ListOrganizationClientsOptions{
    PageSize: 30,
  },
)
if err != nil {
  // handle error
  return
}
_ = response
