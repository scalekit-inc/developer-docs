import com.scalekit.grpc.scalekit.v1.clients.OrganizationClient;

OrganizationClient orgClient = OrganizationClient.newBuilder()
    .setName("GitHub Actions Deployment Service")
    .setDescription("Service account for GitHub Actions to deploy applications to production")
    .addScopes("deploy:applications")
    .addScopes("read:deployments")
    .addAudience("deployment-api.acmecorp.com")
    .build();

CreateOrganizationClientResponse response = scalekitClient.m2m()
    .createOrganizationClient("org_123", orgClient);
