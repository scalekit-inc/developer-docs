UpdateDefaultRolesResponse res = scalekitClient.roles().updateDefaultRoles(
    UpdateDefaultRolesRequest.newBuilder()
        .setDefaultMemberRole("member")
        .build()
);