from scalekit.v1.roles.roles_pb2 import CreateRole

role = CreateRole(
    name="admin",
    display_name="Admin",
    description="Environment-level role",
    extends="base_role",                  # optional
    permissions=["read:users"]           # optional
)

scalekit_client.roles.create_role(role=role)