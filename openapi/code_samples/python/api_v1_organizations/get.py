options = ListOrganizationOptions()
options.page_size = 10

organizations = scalekit_client.organization.list_organizations(
  options=options
)