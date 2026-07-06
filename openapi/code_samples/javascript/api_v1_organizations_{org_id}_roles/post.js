await scalekit.role.createOrganizationRole('org_123', {
  name: 'org_admin',
  displayName: 'Org Admin',
  description: 'Organization-scoped role',
  extends: 'base_role_name', // optional
  permissions: ['perm.read', 'perm.write'], // optional
})
