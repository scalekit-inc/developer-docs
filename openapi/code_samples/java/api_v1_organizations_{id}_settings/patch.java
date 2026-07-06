OrganizationSettingsFeature featureSSO = OrganizationSettingsFeature.newBuilder()
                .setName("sso")
                .setEnabled(true)
                .build();

OrganizationSettingsFeature featureDirectorySync = OrganizationSettingsFeature.newBuilder()
                .setName("dir_sync")
                .setEnabled(true)
                .build();

updatedOrganization = scalekitClient.organizations()
                .updateOrganizationSettings(organization.getId(), List.of(featureSSO,
featureDirectorySync));