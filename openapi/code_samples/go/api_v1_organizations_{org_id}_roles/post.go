resp, err := scalekitClient.Role().CreateOrganizationRole(ctx, "org_123", &rolesv1.CreateOrganizationRole{

	Name:        "org_admin",

	DisplayName: "Org Admin",

	Description: proto.String("Organization-scoped role"), // optional

	Extends:     proto.String("base_role_name"),        // optional

	Permissions: []string{"perm.read", "perm.write"},   // optional

})