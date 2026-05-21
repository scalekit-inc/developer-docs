import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'customeriomcp_cio_auth_status',
    description: `Show the active authentication state — authenticated user, account, and accessible workspaces. Call this to verify which Customer.io account is connected.`,
    params: [
    ],
  },
  {
    name: 'customeriomcp_cio_delete_api',
    description: `Delete a resource via the Customer.io API (DELETE only). Always run with dry_run=true first to preview before executing.`,
    params: [
      { name: 'path', type: 'string', required: true, description: `API path including placeholders, e.g. '/v1/environments/{environment_id}/campaigns/{campaign_id}'. Placeholders are substituted from params.` },
      { name: 'dry_run', type: 'boolean', required: false, description: `Validate and return the request without executing it.` },
      { name: 'jq', type: 'string', required: false, description: `gojq expression to filter the response before returning.` },
      { name: 'params', type: 'object', required: false, description: `Parameters object. Keys matching path placeholders are substituted; remaining keys become the query string.` },
    ],
  },
  {
    name: 'customeriomcp_cio_prime',
    description: `Print LLM-ready instructions for using the Customer.io API. Call this first in a new task to load context about available endpoints and best practices.`,
    params: [
    ],
  },
  {
    name: 'customeriomcp_cio_read_api',
    description: `Read from the Customer.io API (GET only). Use cio_schema first to find the correct path. Supports pagination, jq filtering, and dry_run preview.`,
    params: [
      { name: 'path', type: 'string', required: true, description: `API path including placeholders, e.g. '/v1/environments/{environment_id}/campaigns'. Placeholders are substituted from params.` },
      { name: 'dry_run', type: 'boolean', required: false, description: `Validate and return the request without executing it.` },
      { name: 'jq', type: 'string', required: false, description: `gojq expression to filter the response before returning. Use to trim large responses.` },
      { name: 'limit', type: 'number', required: false, description: `Page size.` },
      { name: 'page', type: 'number', required: false, description: `Page number (1-indexed).` },
      { name: 'page_all', type: 'boolean', required: false, description: `Auto-paginate and return NDJSON for the full dataset.` },
      { name: 'params', type: 'object', required: false, description: `Parameters object. Keys matching path placeholders are substituted; remaining keys become the query string.` },
    ],
  },
  {
    name: 'customeriomcp_cio_schema',
    description: `Introspect the Customer.io API schema to discover endpoints, parameters, and response shapes. Use this before calling cio_read_api or cio_write_api to find the correct path and placeholders.`,
    params: [
      { name: 'query', type: 'string', required: false, description: `One of: '' (list resources), 'campaigns' (resource), 'campaigns.list' (resource.method), 'GET /v1/...' (method + path), or '/v1/...' (all methods for a path).` },
      { name: 'refresh', type: 'boolean', required: false, description: `Force re-download of API specs.` },
    ],
  },
  {
    name: 'customeriomcp_cio_skills_list',
    description: `List available Customer.io agent skills — task-specific instruction manuals covering campaigns, segments, deliveries, analytics, and more.`,
    params: [
      { name: 'refresh', type: 'boolean', required: false, description: `Force re-download of skills.` },
    ],
  },
  {
    name: 'customeriomcp_cio_skills_read',
    description: `Read the full content of a specific Customer.io agent skill by path. Use cio_skills_list to find available paths (e.g. 'campaigns', 'fly-api/campaigns.md').`,
    params: [
      { name: 'path', type: 'string', required: true, description: `Skill path, e.g. 'campaigns' or 'campaigns/examples'. See cio_skills_list for available paths.` },
    ],
  },
  {
    name: 'customeriomcp_cio_write_api',
    description: `Write to the Customer.io API (POST, PUT, or PATCH). Always run with dry_run=true first to preview the request before executing.`,
    params: [
      { name: 'path', type: 'string', required: true, description: `API path including placeholders, e.g. '/v1/environments/{environment_id}/campaigns'. Placeholders are substituted from params.` },
      { name: 'body', type: 'object', required: false, description: `JSON request body.` },
      { name: 'dry_run', type: 'boolean', required: false, description: `Validate and return the request without executing it.` },
      { name: 'jq', type: 'string', required: false, description: `gojq expression to filter the response before returning.` },
      { name: 'method', type: 'string', required: false, description: `HTTP method: POST, PUT, or PATCH. Defaults to POST.` },
      { name: 'params', type: 'object', required: false, description: `Parameters object. Keys matching path placeholders are substituted; remaining keys become the query string.` },
    ],
  },
]
