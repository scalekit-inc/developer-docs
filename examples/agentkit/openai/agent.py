"""
OpenAI GPT agent with Scalekit-authenticated Gmail tools.
Mirrors: /agentkit/examples/openai/
Run: python agent.py
"""
import os
import json
import scalekit.client
from openai import OpenAI
from dotenv import load_dotenv
from google.protobuf.json_format import MessageToDict

load_dotenv()

scalekit_client = scalekit.client.ScalekitClient(
    client_id=os.getenv("SCALEKIT_CLIENT_ID"),
    client_secret=os.getenv("SCALEKIT_CLIENT_SECRET"),
    env_url=os.getenv("SCALEKIT_ENV_URL"),
)
actions = scalekit_client.actions
client = OpenAI()

# Connect user to Gmail
response = actions.get_or_create_connected_account(
    connection_name="gmail",
    identifier="docs-example",
)
if response.connected_account.status != "ACTIVE":
    link = actions.get_authorization_link(connection_name="gmail", identifier="docs-example")
    print("Authorize Gmail:", link.link)
    input("Press Enter after authorizing...")

# Fetch and convert tools to OpenAI format
scoped_response, _ = actions.tools.list_scoped_tools(
    identifier="docs-example",
    filter={"connection_names": ["gmail"]},
)
llm_tools = [
    {
        "type": "function",
        "function": {
            "name": MessageToDict(t.tool).get("definition", {}).get("name"),
            "description": MessageToDict(t.tool).get("definition", {}).get("description", ""),
            "parameters": MessageToDict(t.tool).get("definition", {}).get("input_schema", {}),
        },
    }
    for t in scoped_response.tools
]

# Run the agent loop
messages = [{"role": "user", "content": "Fetch my last 5 unread emails and summarize them"}]

while True:
    response = client.chat.completions.create(
        model="claude-sonnet-4-6",
        tools=llm_tools,
        messages=messages,
    )
    message = response.choices[0].message
    if not message.tool_calls:
        print(message.content)
        break

    messages.append(message)
    for tc in message.tool_calls:
        result = actions.execute_tool(
            tool_name=tc.function.name,
            identifier="docs-example",
            tool_input=json.loads(tc.function.arguments),
        )
        messages.append({
            "role": "tool",
            "tool_call_id": tc.id,
            "content": str(result.data),
        })
