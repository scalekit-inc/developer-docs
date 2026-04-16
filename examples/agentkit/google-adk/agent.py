"""
Google ADK agent with Scalekit-authenticated Gmail tools.
Mirrors: /agentkit/examples/google-adk/
Run: python agent.py
"""
import os
import asyncio
import scalekit.client
from dotenv import load_dotenv
from google.adk.agents import Agent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

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

# Fetch tools
tools = actions.google.get_tools(
    identifier="docs-example",
    connection_names=["gmail"],
)

agent = Agent(
    name="gmail_assistant",
    model="gemini-2.0-flash",
    instruction="You are a helpful Gmail assistant.",
    tools=tools,
)

async def main():
    session_service = InMemorySessionService()
    runner = Runner(agent=agent, app_name="gmail_app", session_service=session_service)
    session = await session_service.create_session(app_name="gmail_app", user_id="docs-example")

    message = types.Content(
        role="user",
        parts=[types.Part(text="Fetch my last 5 unread emails and summarize them")],
    )
    async for event in runner.run_async(
        user_id="docs-example",
        session_id=session.id,
        new_message=message,
    ):
        if event.is_final_response():
            print(event.response.text)

asyncio.run(main())
