from scalekit.v1.users.users_pb2 import UpdateUser
from scalekit.v1.commons.commons_pb2 import UserProfile

update_user = UpdateUser(
    user_profile=UserProfile(
        first_name="John",
        last_name="Smith",
    ),
    metadata={"department": "sales"},
)
response = scalekit_client.users.update_user("usr_123", update_user)
