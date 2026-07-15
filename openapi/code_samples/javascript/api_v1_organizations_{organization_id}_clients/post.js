const response = await scalekit.m2m.createOrganizationClient('org_123', {
  name: 'GitHub Actions Deployment Service',
  description: 'Service account for GitHub Actions to deploy applications to production',
  scopes: ['deploy:applications', 'read:deployments'],
  audience: ['deployment-api.acmecorp.com'],
})
