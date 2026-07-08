CreateUser createUser = CreateUser.newBuilder()
        .setEmail("user@example.com")
        .setExternalId("ext_12345a67b89c")
        .putMetadata("department", "engineering")
        .putMetadata("location", "nyc-office")
        .setUserProfile(
          CreateUserProfile.newBuilder()
                .setFirstName("John")
                .setLastName("Doe")
                .build())
        .build();
CreateUserAndMembershipRequest cuReq = CreateUserA
  ndMembershipRequest.newBuilder()
        .setUser(createUser)
        .build();
CreateUserAndMembershipResponse cuResp = users.
  createUserAndMembership("org_123", cuReq);
System.out.println(cuResp.getUser().getId());