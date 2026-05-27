from scalekit.v1.roles.roles_pb2 import UpdateDefaultRolesRequest

res = scalekit_client.roles.update_default_roles(
    default_roles=UpdateDefaultRolesRequest(
        default_member_role="member"
    )
)