"""
LangChain agent with Scalekit-authenticated Gmail tools.
Mirrors: /agentkit/examples/langchain/
Run: python agent.py
"""
import os
import scalekit.client
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, ToolMessage

load_dotenv()

scalekit_client = scalekit.client.ScalekitClient(
    client_id=os.getenv("SCALEKIT_CLIENT_ID"),
    client_secret=os.getenv("SCALEKIT_CLIENT_SECRET"),
    env_url=os.getenv("SCALEKIT_ENV_URL"),
)
actions = scalekit_client.actions

# Connect user to Gmail
response = actions.get_or_create_connected_account(
    connection_name="gmail",
    identifier="docs-example",
)
if response.connected_account.status != "ACTIVE":
    link = actions.get_authorization_link(connection_name="gmail", identifier="docs-example")
    print("Authorize Gmail:", link.link)
    input("Press Enter after authorizing...")

# Fetch tools and bind to LLM
tools = actions.langchain.get_tools(
    identifier="docs-example",
    connection_names=["gmail"],
)
tool_map = {t.name: t for t in tools}

llm = ChatOpenAI(model="claude-sonnet-4-6").bind_tools(tools)
messages = [HumanMessage("Fetch my last 5 unread emails and summarize them")]

while True:
    response = llm.invoke(messages)
    messages.append(response)
    if not response.tool_calls:
        print(response.content)
        break
    for tc in response.tool_calls:
        result = tool_map[tc["name"]].invoke(tc["args"])
        messages.append(ToolMessage(content=str(result), tool_call_id=tc["id"]))
