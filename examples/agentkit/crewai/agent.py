"""
CrewAI agent with Scalekit-authenticated Gmail tools via MCP.
Mirrors: /agentkit/examples/crewai/
Run: python agent.py (from examples/agentkit/, using crewai-venv)
"""
import os
from typing import Any, Optional
import scalekit.client
from dotenv import load_dotenv

load_dotenv()

# Patch CrewAI's schema converter to handle nullable types (['string', 'null'] etc.)
# before importing MCPServerAdapter, which triggers tool schema parsing on import.
import crewai.utilities.pydantic_schema_utils as _schema_mod
_orig = _schema_mod._json_schema_to_pydantic_type

def _patched(json_schema: dict[str, Any], root_schema: dict[str, Any], **kwargs: Any) -> Any:
    type_ = json_schema.get("type")
    if isinstance(type_, list):
        non_null = [t for t in type_ if t != "null"]
        has_null = "null" in type_
        inner = _orig({**json_schema, "type": non_null[0] if non_null else "string"}, root_schema, **kwargs)
        return Optional[inner] if has_null else inner  # type: ignore[return-value]
    return _orig(json_schema, root_schema, **kwargs)

_schema_mod._json_schema_to_pydantic_type = _patched

from crewai import Agent, Task, Crew, LLM
from crewai_tools import MCPServerAdapter

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

# Get a per-user MCP URL
inst_response = actions.mcp.ensure_instance(
    config_name="gmail-docs-example",
    user_identifier="docs-example",
)
mcp_url = inst_response.instance.url

with MCPServerAdapter({"url": mcp_url, "transport": "streamable-http"}) as mcp_tools:
    agent = Agent(
        role="Email Assistant",
        goal="Fetch and summarize the user's unread emails",
        backstory="You are a helpful assistant with access to the user's Gmail inbox.",
        tools=mcp_tools,
        llm=LLM(model="claude-sonnet-4-6", base_url=os.getenv("OPENAI_BASE_URL"), api_key=os.getenv("OPENAI_API_KEY")),
        verbose=True,
    )

    task = Task(
        description="Fetch the last 5 unread emails and provide a brief summary of each.",
        expected_output="A list of 5 unread emails with subject, sender, and a one-sentence summary.",
        agent=agent,
    )

    result = Crew(agents=[agent], tasks=[task]).kickoff()
    print(result)
