CreateMembershipRequest membershipReq = CreateMembershipRequest.newBuilder()
    .setMembership(
        CreateMembership.newBuilder()
            .addRoles(Role.newBuilder().setName("admin").build())
            .putMetadata("department", "engineering")
            .putMetadata("location", "nyc-office")
            .build())
    .build();
CreateMembershipResponse res = scalekitClient.users().createMembership(
    "org_123",
    "usr_123",
    membershipReq
);
