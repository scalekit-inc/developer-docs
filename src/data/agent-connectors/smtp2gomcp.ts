import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'smtp2gomcp_execute_request',
    description: `Executes an SMTP2GO API request using a given HAR (HTTP Archive) request object — the method, url, headers, query string, and body describing the call to make. Use 'list-endpoints', 'get-endpoint', and 'search-endpoints' first to discover the correct path, method, and parameters.`,
    params: [
      {
        name: 'harRequest',
        type: 'object',
        required: true,
        description: `HAR request object describing the API call to execute.`,
      },
    ],
  },
  {
    name: 'smtp2gomcp_get_endpoint',
    description: `Gets detailed information about a specific SMTP2GO API endpoint, including security schemes and servers.`,
    params: [
      {
        name: 'method',
        type: 'string',
        required: true,
        description: `The HTTP method (e.g. GET, POST, PUT, DELETE).`,
      },
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The API endpoint path (e.g. /api/v1/users).`,
      },
    ],
  },
  {
    name: 'smtp2gomcp_get_server_variables',
    description: `Gets the server variables for each server within the SMTP2GO OpenAPI spec.`,
    params: [],
  },
  {
    name: 'smtp2gomcp_list_endpoints',
    description: `Lists all API paths and their HTTP methods with summaries, organized by path. Results can be passed directly into 'get-endpoint'.`,
    params: [],
  },
  {
    name: 'smtp2gomcp_search_endpoints',
    description: `Performs a deep search through paths, operations, and parameters to discover relevant SMTP2GO API endpoints. Use this tool to find specific API capabilities, required parameters, or data models based on search keywords. Results can be passed directly into 'get-endpoint'.`,
    params: [
      {
        name: 'pattern',
        type: 'string',
        required: true,
        description: `Search pattern (case-insensitive).`,
      },
    ],
  },
]
