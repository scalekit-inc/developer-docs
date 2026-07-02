import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mem0mcp_add_memory',
    description: `Store a new preference, fact, or conversation snippet. Requires at least one: user_id, agent_id, or run_id. Returns an event_id for async polling via get_event_status.`,
    params: [
      { name: 'text', type: 'string', required: true, description: `Plain sentence summarizing what to store.` },
      { name: 'agent_id', type: 'string', required: false, description: `Optional agent identifier.` },
      { name: 'app_id', type: 'string', required: false, description: `Optional app identifier.` },
      { name: 'messages', type: 'string', required: false, description: `Structured conversation history with \`role\`/\`content\`. Use when you have multiple turns.` },
      { name: 'metadata', type: 'string', required: false, description: `Attach arbitrary metadata JSON to the memory.` },
      { name: 'run_id', type: 'string', required: false, description: `Optional run identifier.` },
      { name: 'source', type: 'string', required: false, description: `Event source tag (defaults to MCP if omitted).` },
      { name: 'user_id', type: 'string', required: false, description: `Override the default user scope for this write.` },
    ],
  },
  {
    name: 'mem0mcp_delete_all_memories',
    description: `Delete every memory in the given user/agent/app/run but keep the entity.`,
    params: [
      { name: 'agent_id', type: 'string', required: false, description: `Optional agent scope to delete.` },
      { name: 'app_id', type: 'string', required: false, description: `Optional app scope to delete.` },
      { name: 'run_id', type: 'string', required: false, description: `Optional run scope to delete.` },
      { name: 'source', type: 'string', required: false, description: `Event source tag (defaults to MCP if omitted).` },
      { name: 'user_id', type: 'string', required: false, description: `User scope to delete; defaults to server user.` },
    ],
  },
  {
    name: 'mem0mcp_delete_entities',
    description: `Remove an entity and cascade-delete its memories.`,
    params: [
      { name: 'agent_id', type: 'string', required: false, description: `Delete this agent and its memories.` },
      { name: 'app_id', type: 'string', required: false, description: `Delete this app and its memories.` },
      { name: 'run_id', type: 'string', required: false, description: `Delete this run and its memories.` },
      { name: 'user_id', type: 'string', required: false, description: `Delete this user and its memories.` },
    ],
  },
  {
    name: 'mem0mcp_delete_memory',
    description: `Delete one memory after the user confirms its memory_id.`,
    params: [
      { name: 'memory_id', type: 'string', required: true, description: `Exact memory_id to delete.` },
    ],
  },
  {
    name: 'mem0mcp_get_event_status',
    description: `Check the status of a specific memory operation event by its ID.`,
    params: [
      { name: 'event_id', type: 'string', required: true, description: `UUID of the event to check.` },
    ],
  },
  {
    name: 'mem0mcp_get_memories',
    description: `Page through memories using filters instead of search. Use filters to list specific memories. Common filter patterns: single user: {"AND": [{"user_id": "john"}]}, agent memories: {"AND": [{"agent_id": "agent_name"}]}. user_id is automatically added to filters if not provided.`,
    params: [
      { name: 'filters', type: 'string', required: false, description: `Structured filters; user_id injected automatically.` },
      { name: 'page', type: 'string', required: false, description: `1-indexed page number when paginating.` },
      { name: 'page_size', type: 'string', required: false, description: `Number of memories per page (default 10).` },
      { name: 'source', type: 'string', required: false, description: `Event source tag (defaults to MCP if omitted).` },
    ],
  },
  {
    name: 'mem0mcp_get_memory',
    description: `Fetch a single memory by ID.`,
    params: [
      { name: 'memory_id', type: 'string', required: true, description: `Exact memory_id to fetch.` },
    ],
  },
  {
    name: 'mem0mcp_list_entities',
    description: `List which users/agents/apps/runs currently hold memories.`,
    params: [
    ],
  },
  {
    name: 'mem0mcp_list_events',
    description: `List memory operation events with optional filters and pagination.`,
    params: [
      { name: 'event_type', type: 'string', required: false, description: `Filter by type: ADD, SEARCH, UPDATE, DELETE, GET_ALL, DELETE_ALL.` },
      { name: 'page', type: 'string', required: false, description: `1-indexed page number.` },
      { name: 'page_size', type: 'string', required: false, description: `Events per page (default 50, max 100).` },
    ],
  },
  {
    name: 'mem0mcp_search_memories',
    description: `Run a semantic search over existing memories. Use filters to narrow results. Common filter patterns: single user: {"AND": [{"user_id": "john"}]}, agent memories: {"AND": [{"agent_id": "agent_name"}]}. user_id is automatically added to filters if not provided.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Natural language description of what to find.` },
      { name: 'filters', type: 'string', required: false, description: `Additional filter clauses (user_id injected automatically).` },
      { name: 'source', type: 'string', required: false, description: `Event source tag (defaults to MCP if omitted).` },
      { name: 'top_k', type: 'string', required: false, description: `Number of results to return (1-1000, default 10).` },
    ],
  },
  {
    name: 'mem0mcp_update_memory',
    description: `Overwrite an existing memory's text.`,
    params: [
      { name: 'memory_id', type: 'string', required: true, description: `Exact memory_id to overwrite.` },
      { name: 'text', type: 'string', required: true, description: `Replacement text for the memory.` },
      { name: 'source', type: 'string', required: false, description: `Event source tag (defaults to MCP if omitted).` },
    ],
  },
]
