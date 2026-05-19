resp = scalekit_client.users.list_user_permissions(
    organization_id="org_123",
    user_id="usr_123",
)
permissions = resp.permissions