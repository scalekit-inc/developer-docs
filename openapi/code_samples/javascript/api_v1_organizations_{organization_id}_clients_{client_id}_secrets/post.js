const response = await scalekit.m2m.addOrganizationClientSecret('org_123', 'skc_xxxxx')
const secretId = response.secret?.id
