ListUsersRequest lur = ListUsersRequest.newBuilder()
    .setPageSize(100)
    .build();
ListUsersResponse allUsers = scalekitClient.users().listUsers(lur);
