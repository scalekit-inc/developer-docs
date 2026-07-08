from scalekit.v1.roles.roles_pb2 import UpdateDefaultOrganizationRolesRequest

res = scalekit_client.roles.update_default_organization_roles(
    org_id="org_123",
    default_roles=UpdateDefaultOrganizationRolesRequest(
        default_member_role="org_member"
    )
)