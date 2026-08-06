import os
import requests

# List authentication request logs (most recent first)
res = requests.get(
    f"{os.environ['SCALEKIT_ENVIRONMENT_URL']}/api/v1/logs/authentication/requests",
    headers={"Authorization": f"Bearer {access_token}"},
    params={
        "page_size": 10,
        "status": ["SUCCESS", "FAILED"],
    },
)
data = res.json()
# data["authRequests"], data["next_page_token"], data["total_size"]
