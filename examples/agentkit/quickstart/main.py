"""
Quickstart: fetch last 5 unread Gmail messages via Scalekit.
Mirrors: /agentkit/quickstart/
Run: python main.py
"""
import os
import scalekit.client
from dotenv import load_dotenv

load_dotenv()

scalekit_client = scalekit.client.ScalekitClient(
    client_id=os.getenv("SCALEKIT_CLIENT_ID"),
    client_secret=os.getenv("SCALEKIT_CLIENT_SECRET"),
    env_url=os.getenv("SCALEKIT_ENV_URL"),
)
actions = scalekit_client.actions

# Create or retrieve the user's connected Gmail account
response = actions.get_or_create_connected_account(
    connection_name="gmail",
    identifier="docs-example"
)
connected_account = response.connected_account
print(f"Connected account: {connected_account.id} | status: {connected_account.status}")

# Generate authorization link if user hasn't authorized or token is expired
if connected_account.status != "ACTIVE":
    link_response = actions.get_authorization_link(
        connection_name="gmail",
        identifier="docs-example"
    )
    print(f"🔗 Authorize Gmail: {link_response.link}")
    input("⎆ Press Enter after authorizing Gmail...")

# Fetch last 5 unread emails
response = actions.execute_tool(
    tool_name="gmail_fetch_mails",
    identifier="docs-example",
    tool_input={
        "query": "is:unread",
        "max_results": 5,
    },
)
print(response)
