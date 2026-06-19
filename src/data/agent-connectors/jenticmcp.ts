import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'jenticmcp_execute',
    description: `Execute a specific API action using provided parameters, including any required inputs for the operation.`,
    params: [
      { name: 'params', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'jenticmcp_list_credentials',
    description: `List all API credentials the authenticated agent has access to, showing which APIs are available to use.`,
    params: [
    ],
  },
  {
    name: 'jenticmcp_load_execution_info',
    description: `Retrieve detailed information about a specific action before running it, including required inputs and parameters.`,
    params: [
      { name: 'request', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'jenticmcp_search_apis',
    description: `Search for available API actions based on a natural language description of what the user wants to do.`,
    params: [
      { name: 'request', type: 'object', required: true, description: `No description.` },
    ],
  },
]
