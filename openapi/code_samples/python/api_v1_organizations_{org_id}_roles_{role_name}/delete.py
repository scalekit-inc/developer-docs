# Basic delete
scalekit_client.roles.delete_organization_role(
    org_id="org_123",
    role_name="org_role_admin"
)

# With reassignment
scalekit_client.roles.delete_organization_role(
    org_id="org_123",
    role_name="org_role_admin",
    reassign_role_name="org_role_member"
)