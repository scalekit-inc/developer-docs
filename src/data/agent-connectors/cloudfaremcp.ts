import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'cloudfaremcp_execute',
    description: `Execute JavaScript code against the Cloudflare API using the \`cloudflare.request()\` helper. Use the search tool first to discover the right endpoint path and schema.`,
    params: [
      { name: 'code', type: 'string', required: true, description: `JavaScript async arrow function that calls \`cloudflare.request()\` to interact with the Cloudflare API.` },
      { name: 'account_id', type: 'string', required: false, description: `Your Cloudflare account ID. Auto-selected if you only have one account.` },
    ],
  },
  {
    name: 'cloudfaremcp_search',
    description: `Search the Cloudflare OpenAPI spec to discover API endpoints, request parameters, and response schemas. Run this before execute to find the right path and method for your operation.`,
    params: [
      { name: 'code', type: 'string', required: true, description: `JavaScript async arrow function that queries \`spec.paths\` to find matching Cloudflare API endpoints.` },
    ],
  },
]
