# AgentKit examples

Runnable scripts that mirror the code in the AgentKit documentation. Each script is a verbatim copy of the doc code with only the minimum wrapper needed to execute it (env loading, `__main__` guard).

## Setup

1. Copy `.env.example` to `.env` and fill in your credentials:

   ```sh
   cp .env.example .env
   ```

2. Install dependencies:

   **Python** (all Python examples share one virtualenv):

   ```sh
   python -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   ```

   **Node.js** (all TypeScript examples share one `node_modules`):

   ```sh
   npm install
   ```

## Run

Each script connects to Gmail as `user_123`. If the account is not yet authorized, it prints an authorization link — open it in a browser, complete OAuth, then press Enter (Python) or re-run (Node.js).

| Framework  | Command                                          |
| ---------- | ------------------------------------------------ |
| Quickstart | `python quickstart/main.py`                      |
| Quickstart | `tsx quickstart/main.ts`                         |
| LangChain  | `python langchain/agent.py`                      |
| Google ADK | `python google-adk/agent.py`                     |
| Anthropic  | `python anthropic/agent.py`                      |
| Anthropic  | `tsx anthropic/agent.ts`                         |
| OpenAI     | `python openai/agent.py`                         |
| OpenAI     | `tsx openai/agent.ts`                            |
| Vercel AI  | `tsx vercel-ai/agent.ts`                         |
| Mastra     | `tsx mastra/agent.ts` (needs `SCALEKIT_MCP_URL`) |
| CrewAI     | `python crewai/agent.py`                         |

## Mastra prerequisite

Mastra uses MCP. Generate a per-user MCP URL first (Python SDK):

```python
inst_response = actions.mcp.ensure_instance(
    config_name="your-mcp-config",
    user_identifier="user_123",
)
print(inst_response.instance.url)
```

Add the URL to `.env` as `SCALEKIT_MCP_URL`.
