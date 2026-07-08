import os
from scalekit import ScalekitClient
from scalekit.v1.users.users_pb2 import UpdateUser
from scalekit.v1.commons.commons_pb2 import UserProfile
scalekit_client = ScalekitClient(
    env_url=os.getenv("SCALEKIT_ENV_URL"),
    client_id=os.getenv("SCALEKIT_CLIENT_ID"),
    client_secret=os.getenv("SCALEKIT_CLIENT_SECRET"),
)
update_user = UpdateUser(
    user_profile=UserProfile(
        first_name="John",
        last_name="Smith"
    ),
    metadata={"department": "sales"}
)
scalekit_client.users.update_user(organization_id="org_123", 
  user=update_user)