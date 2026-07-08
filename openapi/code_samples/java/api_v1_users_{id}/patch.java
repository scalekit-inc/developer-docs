UpdateUser upd = UpdateUser.newBuilder()
        .setUserProfile(
          UpdateUserProfile.newBuilder()
                .setFirstName("John")
                .setLastName("Smith")
                .build())
        .putMetadata("department", "sales")
        .build();
UpdateUserRequest updReq = UpdateUserRequest.
  newBuilder().setUser(upd).build();
users.updateUser("usr_123", updReq);