import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'catchrmcp_describe_run_api_request_schema',
    description: `Return the detailed input schema and filter guide for run_api_request_json.`,
    params: [],
  },
  {
    name: 'catchrmcp_list_all_fields',
    description: `List all published fields across all platforms from Catchr field catalog.`,
    params: [
      {
        name: 'groupByPlatform',
        type: 'boolean',
        required: false,
        description: `When true, fields are grouped per platform in the response.`,
      },
    ],
  },
  {
    name: 'catchrmcp_list_available_accounts',
    description: `List available accounts for a platform and company, optionally scoped to one authorization.`,
    params: [
      {
        name: 'platform',
        type: 'string',
        required: true,
        description: `Catchr platform identifier.`,
      },
      {
        name: 'authorizationId',
        type: 'string',
        required: false,
        description: `Filter accounts to those belonging to a specific authorization source.`,
      },
      {
        name: 'includeParentAccounts',
        type: 'boolean',
        required: false,
        description: `When true, include parent-level accounts in the response.`,
      },
      {
        name: 'parentAccountId',
        type: 'string',
        required: false,
        description: `Filter to children of a specific parent account ID.`,
      },
    ],
  },
  {
    name: 'catchrmcp_list_fields_by_platform',
    description: `List all fields for one platform. Includes calculated/runtime fields when available.`,
    params: [
      {
        name: 'platform',
        type: 'string',
        required: true,
        description: `Catchr platform identifier (for example: "facebook-ads").`,
      },
      {
        name: 'report',
        type: 'string',
        required: false,
        description: `Optional provider report key used by restricted field providers.`,
      },
    ],
  },
  {
    name: 'catchrmcp_list_fields_for_account',
    description: `List all fields for a specific account and authorization pair on a platform.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The account ID scoped to the platform.`,
      },
      {
        name: 'authorizationId',
        type: 'integer',
        required: true,
        description: `The authorization (source) ID linked to this account.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: true,
        description: `Catchr platform identifier.`,
      },
      {
        name: 'report',
        type: 'string',
        required: false,
        description: `Optional provider report key used by restricted field providers.`,
      },
    ],
  },
  {
    name: 'catchrmcp_list_platforms',
    description: `List Catchr platforms. You can list only connected platforms for the authenticated company.`,
    params: [
      {
        name: 'connectedOnly',
        type: 'boolean',
        required: false,
        description: `When true, return only platforms that are connected for the authenticated company.`,
      },
    ],
  },
  {
    name: 'catchrmcp_list_sources',
    description: `List network authorizations (sources) for the authenticated company, with optional available accounts.`,
    params: [
      {
        name: 'includeAvailableAccounts',
        type: 'boolean',
        required: false,
        description: `When true, include the list of available accounts for each source.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Filter sources to a specific platform identifier.`,
      },
    ],
  },
  {
    name: 'catchrmcp_run_api_request_json',
    description: `Execute the Catchr API request in JSON mode for one or multiple accounts.`,
    params: [
      {
        name: 'accounts',
        type: 'array',
        required: true,
        description: `One or more accounts to include in the request. Each entry requires id and authorization_id.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: true,
        description: `Catchr platform identifier.`,
      },
      {
        name: 'date',
        type: 'string',
        required: false,
        description: `Preset date range or CUSTOM to use start_date/end_date.`,
      },
      {
        name: 'dimensions',
        type: 'array',
        required: false,
        description: `List of dimension field keys to break down the data by.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format. Required when date is CUSTOM.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `List of filter conditions to apply to the query.`,
      },
      {
        name: 'include_current_date',
        type: 'boolean',
        required: false,
        description: `Whether to include the current (partial) date in the results.`,
      },
      {
        name: 'max_rows',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return. Minimum 1.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: false,
        description: `List of metric field keys to include in the response.`,
      },
      {
        name: 'offset_time',
        type: 'string',
        required: false,
        description: `Timezone offset in hours applied to date boundaries.`,
      },
      {
        name: 'options',
        type: 'object',
        required: false,
        description: `Additional platform-specific options as a JSON object.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp used when date is SINCE.`,
      },
      {
        name: 'sorts',
        type: 'array',
        required: false,
        description: `List of sort instructions applied to the result set.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date in YYYY-MM-DD format. Required when date is CUSTOM.`,
      },
    ],
  },
]
