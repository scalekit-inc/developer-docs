options := &ListDirectoryGroupsOptions{

		PageSize: 10,

		PageToken:"",

	}


directoryGroups, err := scalekitClient.Directory().ListDirectoryGroups(ctx, organizationId, directoryId, options)