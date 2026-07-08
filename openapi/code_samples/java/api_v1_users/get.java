ListUsersRequest lur = ListUsersRequest.
  newBuilder().setPageSize(100).build();
ListUsersResponse allUsers = users.listUsers(lur);