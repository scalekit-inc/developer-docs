const { user } = await scalekit.user.createUserAndMembership('org_123', {
  email: 'user@example.com',
  externalId: 'ext_12345a67b89c',
  metadata: { department: 'engineering', location: 'nyc-office' },
  userProfile: {
    firstName: 'John',
    lastName: 'Doe',
  },
})
