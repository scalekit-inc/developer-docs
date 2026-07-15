UpdateOrganization updateOrganization = UpdateOrganization.newBuilder()
  .setDisplayName("Updated Organization Name")
  .build();

Organization updatedOrganizationById = scalekitClient.organizations().updateById(organizationId, updateOrganization);