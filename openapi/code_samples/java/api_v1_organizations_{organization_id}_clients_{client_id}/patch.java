import com.scalekit.grpc.scalekit.v1.clients.OrganizationClient;

OrganizationClient updates = OrganizationClient.newBuilder()
    .setDescription("Service account for GitHub Actions to deploy applications to production_eu")
    .build();

UpdateOrganizationClientResponse response = scalekitClient.m2m()
    .updateOrganizationClient("org_123", "skc_xxxxx", updates);
