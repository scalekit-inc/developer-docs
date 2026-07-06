from scalekit.v1.roles.roles_pb2 import UpdateRole

scalekit_client.roles.update_role(
    role_name="admin",
    role=UpdateRole(
        display_name="Admin (Updated)",
        description="Updated description"
    )
)