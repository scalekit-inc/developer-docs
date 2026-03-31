# chatbot-api

Node.js Express service powering the Scalekit docs chatbot. Answers questions grounded in the docs llms.txt custom sets, and creates Pylon support issues for questions it can't answer.

## Setup

```bash
npm install
cp .env.example .env
# Fill in ANTHROPIC_API_KEY and PYLON_API_TOKEN in .env
```

## Run

```bash
npm run dev    # development with hot reload
npm start      # production
```

## Test

```bash
npm test
```

## Environment variables

| Variable            | Required | Description                                                           |
| ------------------- | -------- | --------------------------------------------------------------------- |
| `ANTHROPIC_API_KEY` | Yes      | Anthropic API key                                                     |
| `PYLON_API_TOKEN`   | Yes      | Pylon API Bearer token                                                |
| `DOCS_BASE_URL`     | No       | Docs URL for llms.txt fetching (default: `https://docs.scalekit.com`) |
| `PYLON_API_URL`     | No       | Pylon API base URL (default: `https://api.usepylon.com`)              |
| `PORT`              | No       | Port to listen on (default: `3001`)                                   |

## Endpoints

- `GET /health` — health check
- `POST /api/chat` — send a message, returns SSE stream
- `POST /api/chat/confirm` — confirm or cancel a pending tool action (e.g. create Pylon issue)

## How it works

1. User sends a question to `POST /api/chat`
2. The agent calls `search_docs`, which classifies the query topic and fetches the matching llms.txt custom set from docs.scalekit.com
3. Claude answers using only the fetched docs content
4. If the question can't be answered, the agent offers to create a Pylon issue
5. If the user confirms, `create_pylon_issue` fires (requires explicit confirmation via `POST /api/chat/confirm`)
