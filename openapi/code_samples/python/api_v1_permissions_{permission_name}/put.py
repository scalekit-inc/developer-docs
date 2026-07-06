from scalekit.v1.roles.roles_pb2 import CreatePermission

scalekit_client.permissions.update_permission(
    permission_name="read:users",
    permission=CreatePermission(
        name="read:users",
        description="Allows reading user resources"
    )
)