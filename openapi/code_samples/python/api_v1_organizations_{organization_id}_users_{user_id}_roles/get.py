resp = scalekit_client.users.list_user_roles(
    organization_id="org_123",
    user_id="usr_123",
)
roles = resp.roles