from scalekit.v1.roles.roles_pb2 import CreatePermission

permission = CreatePermission(
    name="read:users",
    description="Allows reading users"
)

scalekit_client.permissions.create_permission(permission=permission)