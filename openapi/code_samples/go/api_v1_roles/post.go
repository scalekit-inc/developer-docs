resp, err := scalekitClient.Role().CreateRole(ctx, &rolesv1.CreateRole{

	Name:        "admin",

	DisplayName: "Admin",

	Description: "Environment-level role",

	Extends:     proto.String("base_role"),      // optional

	Permissions: []string{"read:users"},        // optional

})