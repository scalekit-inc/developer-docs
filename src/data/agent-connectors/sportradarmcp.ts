import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'sportradarmcp_fetch',
    description: `Get detailed information about a Sportradar guide page by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the guide to retrieve. Must use \`search\` tool to get the ID.` },
    ],
  },
  {
    name: 'sportradarmcp_get-coverage',
    description: `Find the coverage level for a Sportradar Basketball API.`,
    params: [
    ],
  },
  {
    name: 'sportradarmcp_get-endpoint',
    description: `Get detailed information about a specific API endpoint, including security schemes and parameters.`,
    params: [
      { name: 'method', type: 'string', required: true, description: `The HTTP method (e.g. GET, POST, PUT, DELETE).` },
      { name: 'path', type: 'string', required: true, description: `The API endpoint path (e.g. /api/v1/users).` },
      { name: 'title', type: 'string', required: true, description: `Title of the OpenAPI spec. Use tool 'list-specs' or 'search-endpoints' to see available specs.` },
    ],
  },
  {
    name: 'sportradarmcp_list-endpoints',
    description: `List all API paths and HTTP methods for a spec, organized by path.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `Title of the OpenAPI spec. Use tool 'list-specs' or 'search-endpoints' to see available specs.` },
    ],
  },
  {
    name: 'sportradarmcp_list-specs',
    description: `List all available Sportradar OpenAPI specs.`,
    params: [
    ],
  },
  {
    name: 'sportradarmcp_search',
    description: `Search Sportradar guide pages by query and return matching results with titles and excerpts.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `search query` },
    ],
  },
  {
    name: 'sportradarmcp_search-endpoints',
    description: `Search through API paths, operations, and parameters to discover relevant endpoints.`,
    params: [
      { name: 'pattern', type: 'string', required: true, description: `Search pattern (case-insensitive)` },
    ],
  },
]
