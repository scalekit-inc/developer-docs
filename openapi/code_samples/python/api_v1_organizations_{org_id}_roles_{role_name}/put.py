from scalekit.v1.roles.roles_pb2 import UpdateRole

scalekit_client.roles.update_organization_role(
    org_id="org_123",
    role_name="org_admin",
    role=UpdateRole(
        display_name="Org Admin (Updated)",
        description="Updated org role description"
    )
)