import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'cloudflare_access_application_list',
    description: `List all Zero Trust Access applications configured in a Cloudflare account, with optional filtering by name or domain.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Cloudflare account`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Filter applications by domain`,
      },
      { name: 'name', type: 'string', required: false, description: `Filter applications by name` },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page`,
      },
    ],
  },
  {
    name: 'cloudflare_account_list',
    description: `List all Cloudflare accounts the current authenticated user has access to, with optional filtering by account name.`,
    params: [
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction for results`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter accounts by name (partial match supported)`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page`,
      },
    ],
  },
  {
    name: 'cloudflare_dns_record_list',
    description: `List, search, sort, and filter DNS records for a Cloudflare zone. Supports filtering by record type, name, and content.`,
    params: [
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone to list DNS records from`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Filter DNS records by content/value`,
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction (asc or desc)`,
      },
      {
        name: 'match',
        type: 'string',
        required: false,
        description: `Whether to match all or any filter conditions`,
      },
      { name: 'name', type: 'string', required: false, description: `Filter DNS records by name` },
      { name: 'order', type: 'string', required: false, description: `Field to order results by` },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default 20, max 100)`,
      },
      { name: 'type', type: 'string', required: false, description: `Filter DNS records by type` },
    ],
  },
  {
    name: 'cloudflare_user_get',
    description: `Retrieve the profile details of the currently authenticated Cloudflare user, including name, email, and account memberships.`,
    params: [],
  },
  {
    name: 'cloudflare_worker_script_list',
    description: `Fetch a list of all uploaded Worker scripts in a Cloudflare account. Returns script names, creation dates, and modification timestamps.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Cloudflare account identifier`,
      },
    ],
  },
  {
    name: 'cloudflare_zone_list',
    description: `List, search, sort, and filter all zones in the Cloudflare account. Returns zone details including status, name servers, and plan information.`,
    params: [
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction (asc or desc)`,
      },
      {
        name: 'match',
        type: 'string',
        required: false,
        description: `Whether to match all or any filter conditions`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter zones by domain name (exact match)`,
      },
      { name: 'order', type: 'string', required: false, description: `Field to order results by` },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default 20, max 50)`,
      },
      { name: 'status', type: 'string', required: false, description: `Filter zones by status` },
    ],
  },
]
