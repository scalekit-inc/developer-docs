import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'digitsmcp_create_transactions',
    description: `Create one or more manual journal-entry transactions (double-entry bookkeeping records) for a business in a single atomic batch.

Each transaction has two or more lines whose debits and credits balance. Each line debits or credits a category (account); resolve category_id via list_categories, and optionally party_id, department_id, and location_id via the corresponding list tools, before calling this tool. Amounts are positive decimal strings and the entry_type (DEBIT or CREDIT) determines the side.

All transactions are created together: if any transaction is invalid, unbalanced, or falls in a closed accounting period, the entire batch fails and nothing is created.`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business. Use list_businesses to see available IDs.`,
      },
      {
        name: 'transactions',
        type: 'array',
        required: true,
        description: `The journal-entry transactions to create. All are created together in one atomic batch.`,
      },
    ],
  },
  {
    name: 'digitsmcp_delete_transactions',
    description: `Delete one or more transactions for a business by their transaction fact IDs.

Resolve transaction_fact_ids via query_transactions before calling this tool. Deleting a fact also removes its sibling facts in the same ledger transaction, so a two-sided journal entry is deleted as a unit.

The delete is soft: transactions are marked deleted rather than erased. Scheduled and QuickBooks-sourced transactions cannot be deleted this way, and a transaction that falls in a closed accounting period must be removed via a closed-period request instead — in either case nothing is deleted.`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business. Use list_businesses to see available IDs.`,
      },
      {
        name: 'transaction_fact_ids',
        type: 'array',
        required: true,
        description: `The transaction fact IDs to delete. Use query_transactions to resolve. Sibling facts in the same ledger transaction are deleted together.`,
      },
    ],
  },
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
- For bill or invoice questions, answer only from explicit fields returned by tools. Do not use expense or income transaction data to approximate bill or invoice amounts.`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business. Use list_businesses to see available IDs.`,
      },
      {
        name: 'origin',
        type: 'object',
        required: true,
        description: `Required reporting period. interval, year, index, and interval_count must all be supplied; max_time is optional.`,
      },
      {
        name: 'aggregate_facet_kind',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      {
        name: 'along',
        type: 'object',
        required: false,
        description: `Optional dimensions used to group the transaction totals. When supplied, dimensions is required.`,
      },
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
      {
        name: 'interval_partition',
        type: 'object',
        required: false,
        description: `No description.`,
      },
      { name: 'match_by', type: 'string', required: false, description: `No description.` },
      { name: 'natural_flow', type: 'string', required: false, description: `No description.` },
      { name: 'pagination', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'digitsmcp_financial_statement',
    description: `Generate complete financial statements: Profit & Loss, Balance Sheet, Cash Flow, AR/AP Aging.

## Statement Types (kind)

1. **ProfitAndLoss** - Income Statement showing revenue, expenses, and net income
2. **BalanceSheet** - Financial position with assets, liabilities, and equity
3. **CashFlow** - Cash movements categorized by operating, investing, and financing activities
4. **APAging** - Accounts Payable aging report. ONLY use for questions about total amount currently outstanding or due to vendors. Do NOT use for general bill questions (counts, averages, individual bill details, historical bill amounts).
5. **ARAging** - Accounts Receivable aging report. ONLY use for questions about total amount currently outstanding or due from customers. Do NOT use for general invoice questions (counts, averages, individual invoice details, historical invoice amounts).

## Parameters

**Required:**
- kind: Statement type ("ProfitAndLoss", "BalanceSheet", "CashFlow", "APAging", "ARAging")
- origin: Time period for the statement. Origin's "index" is 1 based for interval Day, Week, Month, and Quarter; it's the year for interval Year. All fields in "origin" must be set.
  - interval: Time unit (Day, Week, Month, Quarter, Year)
  - year: Calendar year
  - index: Position within year (1-12 for Month, 1-4 for Quarter, etc.)
  - interval_count: Number of periods to include

**Optional:**
- look_back_count: Number of periods to include in lookback (overrides defaults)
  - For Month statements: defaults to 12 periods
  - For Quarter statements: defaults to 4 periods
  - For Year statements: defaults to 3 periods
  - show_account_numbers: Include account numbers (bool)
  - fiscal_year_start_month: Fiscal year start month (1-12 for Jan-Dec)
  - tax_form: Tax form for display
- category_id: Filter to specific category (optional)
- department_ids: Filter to specific departments (array of strings)
- location_ids: Filter to specific locations (array of strings)

## Example Requests

### Profit & Loss for Q3 2024
{
  "kind": "ProfitAndLoss",
  "origin": {
    "interval": "Quarter",
    "year": 2024,
    "index": 3,
    "interval_count": 1
  }
}

### Balance Sheet for December 2024
{
  "kind": "BalanceSheet",
  "origin": {
    "interval": "Month",
    "year": 2024,
    "index": 12,
    "interval_count": 1
  }
}

### Cash Flow Statement for Last 6 Months
{
  "kind": "CashFlow",
  "origin": {
    "interval": "Month",
    "year": 2024,
    "index": 12,
    "interval_count": 6
  }
}

### AP Aging Report with Account Numbers
{
  "kind": "APAging",
  "origin": {
    "interval": "Month",
    "year": 2024,
    "index": 12,
    "interval_count": 1
  },
  "preferences": {
    "show_account_numbers": true
  }
}

### Department-Specific P&L
{
  "kind": "ProfitAndLoss",
  "origin": {
    "interval": "Quarter",
    "year": 2024,
    "index": 4,
    "interval_count": 1
  },
  "department_ids": ["dept-123", "dept-456"]
}

## Common Patterns

**"Show me the P&L for last quarter"** -> kind="ProfitAndLoss", origin with Quarter interval
**"What's my current cash position?"** -> kind="BalanceSheet", origin with current month
**"Show cash flow for the year"** -> kind="CashFlow", origin with Year interval or interval_count=12
**"What is our total outstanding A/R?"** -> kind="ARAging" for total receivable amount
**"How much do we currently owe vendors?"** -> kind="APAging" for total payable amount
**"Department P&L comparison"** -> Use department_ids to filter`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business. Use list_businesses to see available IDs.`,
      },
      { name: 'kind', type: 'string', required: true, description: `No description.` },
      {
        name: 'origin',
        type: 'object',
        required: true,
        description: `Required reporting period. interval, year, index, and interval_count must all be supplied; max_time is optional.`,
      },
      {
        name: 'budget_identifier',
        type: 'object',
        required: false,
        description: `No description.`,
      },
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

This tool provides access to transaction-level data with flexible filtering capabilities.

## Required Parameters

**origin**: Time period specification with:
- interval: Time unit (Day, Week, Month, Quarter, Year, etc.)
- year: Calendar year
- index: Position within year (1-based for Day/Week/Month/Quarter; the year itself for Year)
- interval_count: Number of periods to include

## Optional Parameters

- direction: Past or Future relative to the origin
- filter: Transaction filters (category, party, department, location, amount range, etc.)
- order: Sort order for the returned transactions
- pagination: limit/offset controls
- include_speed: Whether to include speed-layer (not-yet-compiled) transactions`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The ID of the business. Use list_businesses to see available IDs.`,
      },
      {
        name: 'origin',
        type: 'object',
        required: true,
        description: `Required query period. interval, year, index, and interval_count must all be supplied; max_time is optional.`,
      },
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

Before using an ID in transaction filters, run a final search on the full phrase and verify the selected canonical name matches the intended phrase. Use the kinds filter to restrict results to the entity types you need (e.g. Party, Category, Department, Location, Product, Discount).`,
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
