var options = ListDirectoryResourceOptions.builder()
  .pageSize(10)
  .pageToken("")
  .includeDetail(true)
  .build();

ListDirectoryUsersResponse usersResponse = scalekitClient
  .directories()
  .listDirectoryUsers(directory.getId(), organizationId, options);