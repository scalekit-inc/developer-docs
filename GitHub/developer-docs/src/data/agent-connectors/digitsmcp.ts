import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'digitsmcp_dimensional_summarize_transactions',
    description: `Summarizes transactions and aggregates them into multi-dimensional summaries.

You can use it to receive timeseries data for that is aggregated and bucketed into dimensions (e.g. Category, Party, Time).

# Important Notes
- If you are only requesting a Time summary, you must provide a filter (such as category ID/type, party ID/role, etc)
- Origin is required. Origin's "index" is 1 based for interval Day, Week, Month, and Quarter; it's the year for interval Year. "IntervalCount" is the number of lookback intervals. All fields in "origin" must be set.
- You must include "Time" in the Along dimensions when using intervalCount > 1.
- When filtering by balance sheet categories (Assets, Liabilities, Equity), you must set asPermanentAccount to true.
- Always resolve the party / category / department / location using search_term first, then use the IDs returned in the filter.
- The response may include a "summary" field where the current period amount is zero while prior period is non-zero; do not treat prior amounts as current-period values.
- Cannot answer questions specific to bills or invoices. Do not use expense or income transaction data to approximate bill or invoice amounts.`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business. Use list_businesses to see available IDs.`,
      },
      {
        name: 'aggregate_facet_kind',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'along', type: 'object', required: false, description: `No description.` },
      {
        name: 'as_permanent_account',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
      {
        name: 'default_category_type',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'direction', type: 'string', required: false, description: `No description.` },
      { name: 'filter', type: 'object', required: false, description: `No description.` },
      { name: 'match_by', type: 'string', required: false, description: `No description.` },
      { name: 'natural_flow', type: 'string', required: false, description: `No description.` },
      { name: 'origin', type: 'object', required: false, description: `No description.` },
      { name: 'pagination', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'digitsmcp_financial_statement',
    description: `Generate complete financial statements: Profit & Loss, Balance Sheet, Cash Flow, AR/AP Aging.`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business. Use list_businesses to see available IDs.`,
      },
      { name: 'kind', type: 'string', required: true, description: `No description.` },
      { name: 'origin', type: 'object', required: true, description: `No description.` },
      { name: 'category_id', type: 'string', required: false, description: `No description.` },
      { name: 'department_ids', type: 'array', required: false, description: `No description.` },
      { name: 'location_ids', type: 'array', required: false, description: `No description.` },
      { name: 'look_back_count', type: 'integer', required: false, description: `No description.` },
      { name: 'preferences', type: 'object', required: false, description: `No description.` },
      { name: 'show_other', type: 'boolean', required: false, description: `No description.` },
      { name: 'show_unassigned', type: 'boolean', required: false, description: `No description.` },
    ],
  },
  {
    name: 'digitsmcp_list_business_users',
    description: `List all users with access to a business. Requires a business_id from select_business.`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business to list users for. Use list_businesses to see available IDs.`,
      },
    ],
  },
  {
    name: 'digitsmcp_list_businesses',
    description: `List all businesses (legal entities) the authenticated user has access to, including both direct employments and affiliations.`,
    params: [],
  },
  {
    name: 'digitsmcp_list_categories',
    description: `This tool is used to list categories.
Use this when you need to review category names, types, or identifiers.`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business. Use list_businesses to see available IDs.`,
      },
      { name: 'category_types', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'digitsmcp_list_departments',
    description: `This tool is used to list departments.
Use this when you need to review department names, status, or identifiers.`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business. Use list_businesses to see available IDs.`,
      },
      { name: 'status', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'digitsmcp_list_locations',
    description: `This tool is used to list locations.
Use this when you need location names, active status, or ids.`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business. Use list_businesses to see available IDs.`,
      },
      { name: 'status', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'digitsmcp_query_transactions',
    description: `Query and filter individual transactions.

This tool provides access to transaction-level data with flexible filtering capabilities.`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business. Use list_businesses to see available IDs.`,
      },
      { name: 'origin', type: 'object', required: true, description: `No description.` },
      { name: 'direction', type: 'string', required: false, description: `No description.` },
      { name: 'filter', type: 'object', required: false, description: `No description.` },
      { name: 'include_speed', type: 'boolean', required: false, description: `No description.` },
      { name: 'order', type: 'object', required: false, description: `No description.` },
      { name: 'pagination', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'digitsmcp_search_term',
    description: `Resolve a customer, vendor, category, department, location name or transaction description to its canonical form using fuzzy text matching.

Before using an ID in transaction filters, run a final search on the full phrase and verify the selected canonical name matches the intended phrase.`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business. Use list_businesses to see available IDs.`,
      },
      { name: 'text', type: 'string', required: true, description: `No description.` },
      { name: 'kinds', type: 'array', required: false, description: `No description.` },
      { name: 'sort', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'digitsmcp_select_business',
    description: `Select a business to work with. After calling this tool, use the returned business ID as business_id in subsequent tool calls.`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business to select. Use list_businesses to see available IDs.`,
      },
    ],
  },
]
