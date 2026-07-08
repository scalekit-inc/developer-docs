settings := OrganizationSettings{

		Features: []Feature{

			{

				Name:    "sso",

				Enabled: true,

			},

			{

				Name:    "dir_sync",

				Enabled: true,

			},

		},

	}


organization,err := scalekitClient.Organization().UpdateOrganizationSettings(ctx, organizationId, settings)