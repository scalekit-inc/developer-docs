CreateOrganization createOrganization = CreateOrganization.newBuilder()
  .setDisplayName("Test Org")
  .build();

Organization createdOrganization = scalekitClient.organizations().create(createOrganization);