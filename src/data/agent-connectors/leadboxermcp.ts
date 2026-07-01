import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'leadboxermcp_list_specs',
    description: `Lists all available OpenAPI specs. Use the title to select a spec.`,
    params: [],
  },
  {
    name: 'leadboxermcp_list_endpoints',
    description: `Lists all API paths and their HTTP methods with summaries, organized by path. Results can be passed directly into 'get-endpoint'.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the OpenAPI spec. Use tool 'list-specs' or 'search-endpoints' to see available specs.`,
      },
    ],
  },
  {
    name: 'leadboxermcp_get_endpoint',
    description: `Gets detailed information about a specific API endpoint, including security schemes and servers.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The API endpoint path (e.g. /api/v1/users).`,
      },
      {
        name: 'method',
        type: 'string',
        required: true,
        description: `The HTTP method (e.g. GET, POST, PUT, DELETE).`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the OpenAPI spec.`,
      },
    ],
  },
  {
    name: 'leadboxermcp_search_endpoints',
    description: `Performs a deep search through paths, operations, and parameters to discover relevant API endpoints.`,
    params: [
      {
        name: 'pattern',
        type: 'string',
        required: true,
        description: `Search pattern (case-insensitive).`,
      },
    ],
  },
  {
    name: 'leadboxermcp_execute_request',
    description: `Executes an API request with a given HAR request object.`,
    params: [
      {
        name: 'harRequest',
        type: 'object',
        required: true,
        description: `HAR request object describing the API call to execute.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the OpenAPI spec.`,
      },
    ],
  },
]
