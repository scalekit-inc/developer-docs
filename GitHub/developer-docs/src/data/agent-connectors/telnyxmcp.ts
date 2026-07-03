import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'telnyxmcp_get_api_endpoint_schema',
    description: `Get the JSON schema for a named Telnyx API endpoint. Call this after finding an endpoint with list_api_endpoints; the returned schema tells you which arguments invoke_api_endpoint expects.`,
    params: [
      {
        name: 'endpoint',
        type: 'string',
        required: true,
        description: `The name of the endpoint to get the schema for, as returned by list_api_endpoints.`,
      },
    ],
  },
  {
    name: 'telnyxmcp_invoke_api_endpoint',
    description: `Invoke any Telnyx API endpoint by name. This is a generic executor that dispatches to the underlying Telnyx REST API: first find the endpoint with list_api_endpoints, fetch its argument schema with get_api_endpoint_schema, then call this tool with the endpoint name and matching args. Can perform writes (create, update, delete), so use with care.`,
    params: [
      {
        name: 'args',
        type: 'object',
        required: true,
        description: `Arguments for the endpoint, matching the schema returned by get_api_endpoint_schema. Pass as a JSON object of parameter names to values.`,
      },
      {
        name: 'endpoint_name',
        type: 'string',
        required: true,
        description: `The name of the Telnyx API endpoint to invoke, as returned by list_api_endpoints.`,
      },
    ],
  },
  {
    name: 'telnyxmcp_list_api_endpoints',
    description: `List or search all endpoints in the Telnyx API. Use this to discover available endpoints by name, resource, operation, or tag before fetching an endpoint's schema with get_api_endpoint_schema and invoking it with invoke_api_endpoint.`,
    params: [
      {
        name: 'search_query',
        type: 'string',
        required: false,
        description: `Optional search query to filter endpoints. Provide a partial name, resource, operation, or tag (e.g. 'messages', 'phone numbers', 'create call').`,
      },
    ],
  },
]
