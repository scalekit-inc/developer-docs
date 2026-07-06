import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mtnewswiresmcp_create_rule',
    description: `Create an alert rule for one or more datasets that sends an email when the conditions are met. Supports single-dataset and cross-dataset rules, multiple conditions combined with AND/OR logic, and field-to-field comparisons (for example moving-average crossovers).`,
    params: [
      {
        name: 'conditions',
        type: 'array',
        required: true,
        description: `List of structured condition objects evaluated by the rule.`,
      },
      {
        name: 'condition_type',
        type: 'string',
        required: false,
        description: `Whether all or any of the conditions must be met for the rule to trigger.`,
      },
    ],
  },
  {
    name: 'mtnewswiresmcp_current_date',
    description: `Provides the current date. Use this to ground relative date references (for example "today" or "this week") before searching datasets or fetching data.`,
    params: [],
  },
  {
    name: 'mtnewswiresmcp_delete_rule',
    description: `Delete an alert rule by its id. Use the Get Rules tool to find the id of the rule to delete.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Identifier of the rule to delete, as returned by the Get Rules tool.`,
      },
    ],
  },
  {
    name: 'mtnewswiresmcp_fetch',
    description: `Retrieve rows of data from a viaNexus / MT Newswires dataset. Use the Search tool first to discover the dataset name and its supported parameters, then pass them here. Returns the dataset fields and their values.`,
    params: [
      {
        name: 'dataset_name',
        type: 'string',
        required: true,
        description: `The dataset name to retrieve data from, as returned by the Search tool.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Country code for country-keyed datasets that include a {country} path parameter (e.g. "US", "CA", "GB").`,
      },
      {
        name: 'endpoint',
        type: 'string',
        required: false,
        description: `The dataset endpoint. Only "data" is supported.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Optional filter expression applied to the dataset query.`,
      },
      {
        name: 'from_date',
        type: 'string',
        required: false,
        description: `Start date of a date range (YYYY-MM-DD).`,
      },
      {
        name: 'last',
        type: 'integer',
        required: false,
        description: `Lookback limit passed to the viaNexus API as the \`last\` query parameter. Interpretation is dataset-specific (days, bars, records, etc.).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Hard cap on the number of rows returned, applied client-side after the upstream fetch. Use for a deterministic row count (for example last=1, limit=3 on an intraday dataset returns 3 bars).`,
      },
      {
        name: 'on_date',
        type: 'string',
        required: false,
        description: `Retrieve data as of a single date (YYYY-MM-DD).`,
      },
      {
        name: 'product',
        type: 'string',
        required: false,
        description: `The product (workspace) the dataset belongs to.`,
      },
      {
        name: 'region',
        type: 'string',
        required: false,
        description: `Region code for region-keyed datasets that include a {region} path parameter.`,
      },
      {
        name: 'subkey',
        type: 'string',
        required: false,
        description: `Optional sub-key path parameter for datasets that require one.`,
      },
      {
        name: 'symbols',
        type: 'string',
        required: false,
        description: `Comma-delimited financial instrument identifiers. Supports symbol, FIGI, ISIN, and LEI (e.g. "MSFT", "AAPL,NVDA", "BBG000BPHFS9", "US5949181045").`,
      },
      {
        name: 'to_date',
        type: 'string',
        required: false,
        description: `End date of a date range (YYYY-MM-DD).`,
      },
    ],
  },
  {
    name: 'mtnewswiresmcp_get_rules',
    description: `Get all alert rules associated with the user. Each rule includes its id, name, dateCreated, isActive, passed, failed, and conditions.`,
    params: [],
  },
  {
    name: 'mtnewswiresmcp_search',
    description: `Search the available viaNexus / MT Newswires datasets. Pass an empty query to list every dataset, or a dataset name to find a specific one. Returns each dataset's name, description, path parameters, query parameters, and fields — use these to build a Fetch call.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Dataset name to search for. Use an empty string or omit to return all datasets.`,
      },
    ],
  },
]
