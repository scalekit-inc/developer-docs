import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'vibeprospectingmcp_autocomplete',
    description: `Autocomplete values for business filters based on a query. Supports fields: naics_category, linkedin_category, company_tech_stack_tech, job_title, business_intent_topics, city_region. Never use for fields not in this list. Prefer linkedin_category over naics_category unless the LinkedIn result is too broad. Do not call autocomplete for country or region codes — use ISO codes directly.`,
    params: [
      {
        name: 'field',
        type: 'string',
        required: true,
        description: `The field to autocomplete. Only use fields listed here. Never use autocomplete for a field not in this list.`,
      },
      { name: 'query', type: 'string', required: true, description: `The query to autocomplete` },
      {
        name: 'tool_reasoning',
        type: 'string',
        required: true,
        description: `The original user query that prompted this workflow, in EXACT WORDS. Reuse the same wording across chained tool calls when the task is unchanged. Maximum 2000 characters.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `Session ID for tracking tool calls within the same user request context. Reuse when continuing the same request; omit to create a new session.`,
      },
    ],
  },
  {
    name: 'vibeprospectingmcp_enrich_business',
    description: `Add detailed information to companies from previous fetch-entities results. Supports enrichments including firmographics, technographics, funding, workforce trends, financial metrics, LinkedIn posts, website changes, and more. Returns a masked preview and a new table_name (no charge); use export-to-csv to retrieve all enriched rows. Use the new table_name for all downstream steps — the original fetch-entities table does not receive the enrichment columns.`,
    params: [
      {
        name: 'enrichments',
        type: 'array',
        required: true,
        description: `List of enrichment types to run in parallel`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID containing the data to process`,
      },
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `Table name containing business data to enrich`,
      },
      { name: 'estimate_cost', type: 'boolean', required: false, description: `No description.` },
      { name: 'parameters', type: 'object', required: false, description: `No description.` },
      {
        name: 'sample_size',
        type: 'number',
        required: false,
        description: `Number of sample results to return in context`,
      },
    ],
  },
  {
    name: 'vibeprospectingmcp_enrich_prospects',
    description: `Add contact details and profiles to people from previous fetch-entities results. Supports enrichments for professional/personal emails and phone numbers (enrich-prospects-contacts) and full profile details including work history and education (enrich-prospects-profiles). Returns a masked preview and a new table_name (no charge). Use the new table_name for all downstream steps — the original fetch-entities table does not receive enrichment columns.`,
    params: [
      {
        name: 'enrichments',
        type: 'array',
        required: true,
        description: `List of enrichment types to run in parallel`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID containing the data to process`,
      },
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `Table name containing prospect data to enrich`,
      },
      { name: 'estimate_cost', type: 'boolean', required: false, description: `No description.` },
      { name: 'parameters', type: 'object', required: false, description: `No description.` },
      {
        name: 'sample_size',
        type: 'number',
        required: false,
        description: `Number of sample results to return in context`,
      },
    ],
  },
  {
    name: 'vibeprospectingmcp_estimate_cost',
    description: `Estimate the export cost in Explorium credits for a given table before exporting. Returns estimated cost, currency, a human-readable description, the table name, and a breakdown by row count and enrichment operations. Always show the cost estimate to the user and wait for explicit confirmation before calling export-to-csv. Note: show-sample already returns cost estimation fields, so this tool is only needed when a separate cost check is required.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID containing the data to process`,
      },
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `Name of the table to estimate cost for`,
      },
      {
        name: 'tool_reasoning',
        type: 'string',
        required: true,
        description: `The original user query that prompted this workflow, in EXACT WORDS. Reuse the same wording across chained tool calls when the task is unchanged. Do not replace it with a per-step rationale or unrelated PII. Maximum 2000 characters.`,
      },
    ],
  },
  {
    name: 'vibeprospectingmcp_export_to_csv',
    description: `Export your data to CSV and get a download link. Consumes credits. Only call this tool when the user has explicitly asked to export and has seen a cost estimate. Always wait for explicit user confirmation before exporting, regardless of credit balance. Exported entities are automatically added to the user's exclude list to prevent them from appearing in future searches.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID containing the data to process`,
      },
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `Name of the specific table to export`,
      },
      {
        name: 'dataset_name',
        type: 'string',
        required: false,
        description: `Descriptive name for the dataset (10-80 chars, lowercase alphanumeric with underscores). If not provided, a random name will be generated. The final dataset name will be: {dataset_name}_{unique_id}.`,
      },
      {
        name: 'exclude_key',
        type: 'string',
        required: false,
        description: `Optional. Pass the prior export dataset_id (ds- plus UUID) on the SAME table_name to skip rows already in that dataset. Use after a credit-limited partial export or when the user asks for additional rows.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum rows to materialize for this export (overrides workflow number_of_results). Without exclude_key: cap at limit rows from the original query. With exclude_key (prior export dataset_id): caps how many rows are fetched after excluding that dataset.`,
      },
      {
        name: 'tool_reasoning',
        type: 'string',
        required: false,
        description: `The ORIGINAL user query that started this workflow, in EXACT WORDS. Use the first message that led to this tool being called, NOT follow-up commands like 'export', 'yes', 'continue'. Maximum 2000 characters.`,
      },
    ],
  },
  {
    name: 'vibeprospectingmcp_fetch_businesses_events',
    description: `Retrieves business-related events (funding rounds, new offices, partnerships, hiring signals, etc.) from the Explorium API in bulk. Requires a table_name and session_id from a prior fetch-entities call. Returns a masked preview and table_name at no charge; export-to-csv delivers the full dataset. Sample preview shows only up to 3 events per company — the full export contains significantly more data. For events related to role changes, use the prospects events tool instead.`,
    params: [
      {
        name: 'event_types',
        type: 'array',
        required: true,
        description: `List of event types to fetch, max 10`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID containing the data to process`,
      },
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `Table name containing business data to get events for`,
      },
      { name: 'estimate_cost', type: 'boolean', required: false, description: `No description.` },
      {
        name: 'sample_size',
        type: 'number',
        required: false,
        description: `Number of sample results to return in context`,
      },
      {
        name: 'timestamp_from',
        type: 'string',
        required: false,
        description: `ISO format datetime string or date in format YYYY-MM-DD (defaults to 3 months ago)`,
      },
    ],
  },
  {
    name: 'vibeprospectingmcp_fetch_entities',
    description: `Find companies and/or prospects using any combination of filters (returns ~10 sample rows for exploration, no charge). Use entity_type 'prospects' when the request involves people in any way; use 'businesses' only when the request is purely about companies. Filters requiring autocomplete first: linkedin_category, naics_category, job_title, business_intent_topics, company_tech_stack_tech, city_region (USA cities). Make ONE comprehensive fetch call — multiple calls combining filters that could be merged are forbidden.`,
    params: [
      {
        name: 'entity_type',
        type: 'string',
        required: true,
        description: `REQUIRED: The type of entity you want as final output. Use "businesses" for company data, "prospects" for people/contact data. This helps disambiguate when filters alone don't clearly indicate intent.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: true,
        description: `Combination of filters to narrow down results. All filter fields are optional. Filters requiring autocomplete first: linkedin_category, naics_category, job_title, business_intent_topics, company_tech_stack_tech, city_region (USA).`,
      },
      {
        name: 'tool_reasoning',
        type: 'string',
        required: true,
        description: `The original user query that prompted this workflow, in EXACT WORDS. Reuse the same wording across chained tool calls when the task is unchanged. Do not replace it with a per-step rationale or unrelated PII. Maximum 2000 characters.`,
      },
      {
        name: 'businesses_reference_table',
        type: 'string',
        required: false,
        description: `OPTIONAL: Only use to REFINE prospects from a previous fetch-businesses result. For fresh searches, use company filters directly with entity_type: "prospects" instead. MUST be provided with a session_id.`,
      },
      { name: 'estimate_cost', type: 'boolean', required: false, description: `No description.` },
      {
        name: 'exclude_key',
        type: 'string',
        required: false,
        description: `Exclude key to avoid returning previously seen entities. Use 'prospects' or 'business' for the tenant-global exclude list, or pass a specific dataset_id from get-dataset or export-to-csv.`,
      },
      {
        name: 'max_per_company',
        type: 'number',
        required: false,
        description: `Maximum number of prospects to return per company. Only applicable for prospect queries. CRITICAL: DO NOT use unless explicitly requested by the user.`,
      },
      {
        name: 'number_of_results',
        type: 'number',
        required: false,
        description: `Number of results to return. Defaults to 50 if not specified. Use the exact number requested by the user.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `Session ID for tracking tool calls within the same user request context. Reuse when refining or continuing the same user request; omit to create a new session for a distinct new request.`,
      },
    ],
  },
  {
    name: 'vibeprospectingmcp_fetch_entities_statistics',
    description: `Fetch aggregated insights into businesses or prospects by industry, revenue, employee count, job department, and geographic distribution. Use entity_type 'prospects' when the request involves prospects; use 'businesses' only for company-only stats. Filters requiring autocomplete first: linkedin_category, naics_category, job_title, business_intent_topics, company_tech_stack_tech. Country and region codes can be used directly without autocomplete.`,
    params: [
      {
        name: 'entity_type',
        type: 'string',
        required: true,
        description: `REQUIRED: The type of entity you want statistics for. Use "businesses" for company stats, "prospects" for people/contact stats.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: true,
        description: `Combination of filters to scope the statistics query. All filter fields are optional.`,
      },
      {
        name: 'tool_reasoning',
        type: 'string',
        required: true,
        description: `The original user query that prompted this workflow, in EXACT WORDS. Reuse the same wording across chained tool calls when the task is unchanged. Maximum 2000 characters.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `Session ID for tracking tool calls within the same user request context. Reuse when refining or continuing the same request; omit to create a new session.`,
      },
    ],
  },
  {
    name: 'vibeprospectingmcp_fetch_prospects_events',
    description: `Retrieves prospect-related events (role changes, company changes, job anniversaries) from the Explorium API in bulk. Requires a table_name and session_id from a prior fetch-entities call. Returns a masked preview and table_name at no charge; sample preview shows only up to 3 events per prospect. Must ask the user to confirm before calling when the prior fetch used event-related filters (unless the user already asked for event details in the same message).`,
    params: [
      {
        name: 'event_types',
        type: 'array',
        required: true,
        description: `List of event types to fetch, max 10`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID containing the data to process`,
      },
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `Table name containing prospect data to get events for`,
      },
      { name: 'estimate_cost', type: 'boolean', required: false, description: `No description.` },
      {
        name: 'sample_size',
        type: 'number',
        required: false,
        description: `Number of sample results to return in context`,
      },
      {
        name: 'timestamp_from',
        type: 'string',
        required: false,
        description: `ISO format datetime string or date in format YYYY-MM-DD (defaults to 3 months ago)`,
      },
    ],
  },
  {
    name: 'vibeprospectingmcp_get_dataset',
    description: `Load a previously exported dataset or list into a session for further analysis, prospecting, or exclusion — or list the user's most recent datasets. Call with no dataset_id and no dataset_name to list up to 20 recent datasets. Provide at least one of dataset_id or dataset_name to load a specific dataset. If session_id is omitted, a new session is automatically created.`,
    params: [
      {
        name: 'tool_reasoning',
        type: 'string',
        required: true,
        description: `The original user query that prompted this workflow, in EXACT WORDS. Reuse the same wording across chained tool calls when the task is unchanged. Do not replace it with a per-step rationale or unrelated PII. Maximum 2000 characters.`,
      },
      {
        name: 'dataset_id',
        type: 'string',
        required: false,
        description: `Optional. Dataset or list ID (starts with "ds-") to load directly. Takes priority over dataset_name. If neither dataset_name nor dataset_id is provided, returns a list of the user's most recent datasets.`,
      },
      {
        name: 'dataset_name',
        type: 'string',
        required: false,
        description: `Optional. Dataset or list name to load by name search. If the value starts with "ds-", use dataset_id instead. If neither dataset_name nor dataset_id is provided, returns a list of the user's most recent datasets.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `Session ID for tracking tool calls within the same user request context. If not provided, a new session is automatically created for the dataset.`,
      },
    ],
  },
  {
    name: 'vibeprospectingmcp_match_business',
    description: `Get the Explorium business IDs from business name and/or domain in bulk. You can provide either name OR domain for each business, or both (recommended for better accuracy). If session_id is provided, results are stored for future reference; otherwise a new session_id is created and returned. Do NOT use when you already called fetch-entities for businesses (response contains business IDs) or when looking for general industry trends without specific companies.`,
    params: [
      {
        name: 'businesses_to_match',
        type: 'array',
        required: true,
        description: `List of businesses to match. Each entry requires name and/or domain. Up to 50 businesses per call.`,
      },
      {
        name: 'tool_reasoning',
        type: 'string',
        required: true,
        description: `The original user query that prompted this workflow, in EXACT WORDS. Reuse the same wording across chained tool calls when the task is unchanged. Maximum 2000 characters.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `Session ID for tracking tool calls within the same user request context. Reuse when refining or continuing the same request; omit to create a new session.`,
      },
    ],
  },
  {
    name: 'vibeprospectingmcp_match_prospects',
    description: `Match specific individuals to get their Explorium prospect IDs. Requires email OR (full name + company name) for each prospect. Always prefer this over web search for questions about specific people. Results are stored in the session for future enrichment or export. Returns session_id in the response for future data retrieval.`,
    params: [
      {
        name: 'prospects_to_match',
        type: 'array',
        required: true,
        description: `List of prospects to match. Each entry requires email OR (full_name + company_name). Up to 40 prospects per call.`,
      },
      {
        name: 'tool_reasoning',
        type: 'string',
        required: true,
        description: `The original user query that prompted this workflow, in EXACT WORDS. Reuse the same wording across chained tool calls when the task is unchanged. Maximum 2000 characters.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `Session ID for tracking tool calls within the same user request context. Reuse when continuing the same request; omit to create a new session.`,
      },
    ],
  },
  {
    name: 'vibeprospectingmcp_show_pricing_plans',
    description: `Show Vibe Prospecting credit package pricing in an interactive widget. Use when the user asks about pricing, cost, buying credits, packages, upgrading, or plans — or when a prior tool execution failed due to insufficient credits. All plans are one-time purchases (not subscriptions), and credits are valid for 365 days. If a prior export-to-csv response included a promotion, pass its promo_code_id and promotion_type.`,
    params: [
      {
        name: 'tool_reasoning',
        type: 'string',
        required: true,
        description: `The original user query that prompted this workflow, in EXACT WORDS. Reuse the same wording across chained tool calls when the task is unchanged. Do not replace it with a per-step rationale or unrelated PII. Maximum 2000 characters.`,
      },
      {
        name: 'promotion_code_id',
        type: 'string',
        required: false,
        description: `Optional Stripe promotion code id (e.g. promo_code_id from export-to-csv tool execution).`,
      },
      {
        name: 'promotion_type',
        type: 'string',
        required: false,
        description: `Optional promotion type. Currently can only be 'first_export'. Use it only when given a specific promotion code id from a previous export-to-csv tool execution with that type in the response.`,
      },
    ],
  },
  {
    name: 'vibeprospectingmcp_show_sample',
    description: `Present the final sample rows to the user from a fetch, enrich, or events exploration table. Call this after each user turn's fetch/enrich/events work is finished. Charges 5 credits per exploration table (idempotent per table — duplicate calls for the same table_name do not charge again). Always call show-sample before presenting results to the user; do not ask for confirmation before calling it. This tool also returns export cost fields, so estimate-cost is not needed after show-sample for the same table.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID containing the data to process`,
      },
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `table_name from a prior fetch/enrich/events exploration response. Do not invent this value.`,
      },
      {
        name: 'tool_reasoning',
        type: 'string',
        required: true,
        description: `The original user query that prompted this workflow, in EXACT WORDS. Reuse the same wording across chained tool calls when the task is unchanged. Do not replace it with a per-step rationale or unrelated PII. Maximum 2000 characters.`,
      },
    ],
  },
]
