response = scalekit_client.connected_accounts.list_connected_accounts(
    organization_id="org_123",
    page_size=20,
)
# with_call returns (response, call)
connected_accounts = response[0].connected_accounts
