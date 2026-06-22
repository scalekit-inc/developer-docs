import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'hexmcp_continue_thread',
    description: `Continue an existing Hex Thread by adding a new message and triggering the agent to process it.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the thread to continue` },
      { name: 'prompt', type: 'string', required: true, description: `The message to add to continue the thread` },
    ],
  },
  {
    name: 'hexmcp_create_thread',
    description: `Create a new Hex Thread to ask a question about your data using natural language.`,
    params: [
      { name: 'prompt', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'hexmcp_get_me',
    description: `Return information about the currently authenticated user.`,
    params: [
    ],
  },
  {
    name: 'hexmcp_get_thread',
    description: `Fetch a Hex Thread by its ID, including the latest response and status.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'hexmcp_search_projects',
    description: `Search for Hex projects by keyword.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `The search query to find relevant projects. This should be a non-empty string without wildcards.` },
    ],
  },
]
