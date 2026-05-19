UpdateDefaultOrganizationRolesResponse res = scalekitClient.roles().updateDefaultOrganizationRoles(
    "org_123",
    UpdateDefaultOrganizationRolesRequest.newBuilder()
        .setDefaultMemberRole("org_member")
        .build()
);