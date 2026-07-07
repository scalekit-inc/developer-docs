import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'whopmcp_get_api_endpoint_schema',
    description: `Get the schema for an endpoint in the Whop TypeScript API. You can use the schema returned by this tool to invoke an endpoint with the \`invoke_api_endpoint\` tool.`,
    params: [
      {
        name: 'endpoint',
        type: 'string',
        required: true,
        description: `The name of the endpoint to get the schema for.`,
      },
    ],
  },
  {
    name: 'whopmcp_invoke_api_endpoint',
    description: `Invoke an endpoint in the Whop TypeScript API. Note: use the \`list_api_endpoints\` tool to get the list of endpoints and \`get_api_endpoint_schema\` tool to get the schema for an endpoint.`,
    params: [
      {
        name: 'args',
        type: 'object',
        required: true,
        description: `The arguments to pass to the endpoint, as a JSON object matching the endpoint's schema.`,
      },
      {
        name: 'endpoint_name',
        type: 'string',
        required: true,
        description: `The name of the endpoint to invoke.`,
      },
    ],
  },
  {
    name: 'whopmcp_list_api_endpoints',
    description: `List or search for all endpoints in the Whop TypeScript API`,
    params: [
      {
        name: 'search_query',
        type: 'string',
        required: false,
        description: `An optional search query to filter the endpoints by.`,
      },
    ],
  },
  {
    name: 'whopmcp_search_docs',
    description: `Search for documentation for how to use the client to interact with the API.`,
    params: [
      {
        name: 'language',
        type: 'string',
        required: true,
        description: `The programming language or protocol to get documentation for.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query to find relevant documentation.`,
      },
    ],
  },
]
