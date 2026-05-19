const settings = {
  features: [
    {
      name: 'sso',
      enabled: true,
    },
    {
      name: 'dir_sync',
      enabled: true,
    },
  ],
};

await scalekit.organization.updateOrganizationSettings('<organization_id>', settings);