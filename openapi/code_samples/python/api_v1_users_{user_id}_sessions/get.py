# Basic usage
res = scalekit_client.sessions.get_user_sessions(user_id="user_123")

# With pagination and filtering
from google.protobuf.timestamp_pb2 import Timestamp
from datetime import datetime

start_time = Timestamp()
start_time.FromDatetime(datetime(2024, 1, 1))
end_time = Timestamp()
end_time.FromDatetime(datetime(2024, 12, 31))

filter_obj = scalekit_client.sessions.create_session_filter(
    status=["ACTIVE"], start_time=start_time, end_time=end_time
)
res = scalekit_client.sessions.get_user_sessions(
    user_id="user_123", page_size=10, page_token="next_page_token", filter=filter_obj
)