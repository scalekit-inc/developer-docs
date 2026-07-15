await scalekit.user.createMembership('org_123', 'usr_123', {
  roles: ['admin'],
  metadata: {
    department: 'engineering',
    location: 'nyc-office',
  },
})
