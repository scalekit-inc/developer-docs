"""
Anthropic Claude agent with Scalekit-authenticated Gmail tools.
Mirrors: /agentkit/examples/anthropic/
Run: python agent.py
"""
import os
import scalekit.client
import anthropic
from dotenv import load_dotenv
from google.protobuf.json_format import MessageToDict

load_dotenv()

scalekit_client = scalekit.client.ScalekitClient(
    client_id=os.getenv("SCALEKIT_CLIENT_ID"),
    client_secret=os.getenv("SCALEKIT_CLIENT_SECRET"),
    env_url=os.getenv("SCALEKIT_ENV_URL"),
)
actions = scalekit_client.actions
client = anthropic.Anthropic(
    base_url=os.getenv("ANTHROPIC_BASE_URL"),  # omit for direct Anthropic API
)

# Connect user to Gmail
response = actions.get_or_create_connected_account(
    connection_name="gmail",
    identifier="docs-example",
)
if response.connected_account.status != "ACTIVE":
    link = actions.get_authorization_link(connection_name="gmail", identifier="docs-example")
    print("Authorize Gmail:", link.link)
    input("Press Enter after authorizing...")

# Fetch tools scoped to this user
scoped_response, _ = actions.tools.list_scoped_tools(
    identifier="docs-example",
    filter={"connection_names": ["gmail"]},
)
llm_tools = [
    {
        "name": MessageToDict(t.tool).get("definition", {}).get("name"),
        "description": MessageToDict(t.tool).get("definition", {}).get("description", ""),
        "input_schema": MessageToDict(t.tool).get("definition", {}).get("input_schema", {}),
    }
    for t in scoped_response.tools
]

# Run the agent loop
messages = [{"role": "user", "content": "Fetch my last 5 unread emails and summarize them"}]

while True:
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        tools=llm_tools,
        messages=messages,
    )
    if response.stop_reason == "end_turn":
        print(response.content[0].text)
        break

    tool_results = []
    for block in response.content:
        if block.type == "tool_use":
            result = actions.execute_tool(
                tool_name=block.name,
                identifier="docs-example",
                tool_input=block.input,
            )
            tool_results.append({
                "type": "tool_result",
                "tool_use_id": block.id,
                "content": str(result.data),
            })

    messages.append({"role": "assistant", "content": response.content})
    messages.append({"role": "user", "content": tool_results})
