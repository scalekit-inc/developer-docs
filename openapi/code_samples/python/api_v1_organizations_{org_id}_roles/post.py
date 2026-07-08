from scalekit.v1.roles.roles_pb2 import CreateOrganizationRole

role = CreateOrganizationRole(
    name="org_admin",
    display_name="Org Admin",
    description="Organization-scoped role",
    extends="base_role_name",              # optional
    permissions=["perm.read", "perm.write"]  # optional
)

scalekit_client.roles.create_organization_role(
    org_id="org_123",
    role=role
)