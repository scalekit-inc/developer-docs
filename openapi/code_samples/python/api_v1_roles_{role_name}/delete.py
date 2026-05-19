# Basic delete
scalekit_client.roles.delete_role(role_name="admin")

# With reassignment
scalekit_client.roles.delete_role(
    role_name="admin",
    reassign_role_name="member"
)