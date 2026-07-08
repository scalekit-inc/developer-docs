await scalekit.role.createRole({
  name: 'admin',
  displayName: 'Admin',
  description: 'Environment-level role',
  extends: 'base_role', // optional
  permissions: ['read:users'], // optional
})
