# Create user with membership 
user = CreateUser(
    email="john.doe@example.com",
    external_id="ext_john_123",  # Optional
    user_profile={
        "first_name": "John",
        "last_name": "Doe",
        "name": "John Doe",
        "locale": "en-US",
        "phone_number": "+14155552671"
    },
    membership={
        "roles": [{"name": "member"}]  
    }
)

# Create user and membership in organization
response = scalekit_client.users.create_user_and_membership(
    organization_id="your_org_id",
    user=user,
    send_invitation_email=True  # Set to False if you don't want to send
email )

    user_id = response[0].user.id