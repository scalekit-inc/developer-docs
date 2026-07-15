from scalekit.v1.users.users_pb2 import CreateMembership
from scalekit.v1.commons.commons_pb2 import Role

membership = CreateMembership(
    roles=[Role(name="admin")],
    metadata={"department": "engineering", "location": "nyc-office"},
)
resp = scalekit_client.users.create_membership(
    organization_id="org_123",
    user_id="usr_123",
    membership=membership,
)