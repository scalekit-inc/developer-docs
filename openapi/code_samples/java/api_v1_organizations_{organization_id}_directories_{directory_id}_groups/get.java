var options = ListDirectoryResourceOptions.builder()
  .pageSize(10)
  .pageToken("")
  .includeDetail(true)
  .build();

ListDirectoryGroupsResponse groupsResponse = scalekitClient
  .directories()
  .listDirectoryGroups(directory.getId(), organizationId, options);