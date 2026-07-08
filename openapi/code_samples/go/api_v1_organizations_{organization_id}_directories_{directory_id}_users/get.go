options := &ListDirectoryUsersOptions{

		PageSize: 10,

		PageToken: "",

	}

directoryUsers,err := scalekitClient.Directory().ListDirectoryUsers(ctx, organizationId, directoryId, options)