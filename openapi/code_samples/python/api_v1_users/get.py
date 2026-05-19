# pass empty org to fetch all users in environment
resp,_ = scalekit_client.users.list_users(organization_id="", page_size=100)