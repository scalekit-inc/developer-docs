import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'agencyanalyticsmcp_browse_client_custom_metrics',
    description: `List the custom metrics available for a single client — both campaign-level and account-level — so you can discover which formula-driven KPIs exist (e.g. 'Cost per Lead', 'ROAS'). Returns one row per custom metric with its id, name, data_type, change_format, scope, formula, and description. Use the returned ids with read_client_custom_metrics to fetch computed values.`,
    params: [
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_browse_client_dashboards',
    description: `List all dashboards for a client/campaign. Returns paginated dashboards (10 per page). If the user does not see what they are looking for, increment page and call again. Requires client_id on every call.`,
    params: [
      {
        name: 'client_id',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID. Required on every call.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default 1).`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_browse_client_data_sources',
    description: `Discover connected providers and available metric data sources for a campaign. Pass message (the user's question) to filter returned data sources to only those relevant to the question. Returns providers (connected slugs) and data_sources (AAQL data source definitions with available fields and pre-hydrated filters).`,
    params: [
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `The user's original question — used to filter relevant data sources.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_browse_client_reports',
    description: `List all reports for a client/campaign. Use this when no specific report was named and you need to present options or pick the most relevant one. Requires client_id on every call.`,
    params: [
      {
        name: 'client_id',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID. Required on every call.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_browse_clients',
    description: `Browse or enumerate clients. Two modes: Folder mode (omit groupId) returns all folders with their client counts plus ungrouped clients. Drill-down mode (groupId provided) returns all clients inside the specified folder. Results are paginated via limit and offset.`,
    params: [
      {
        name: 'groupId',
        type: 'integer',
        required: false,
        description: `Folder ID to drill into. Omit to list all folders and ungrouped clients.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return (default 50, max 200).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Zero-based pagination offset (default 0).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Optional text filter applied to client name or URL.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Optional status filter — e.g. "active" or "inactive". Omit to return all statuses.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_create_mcp_feedback',
    description: `Record user feedback explicitly directed at the AgencyAnalytics MCP server experience — its tools, ergonomics, or quality of results. Only call this when the user clearly intends to leave feedback about the MCP.`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The user's feedback in their own words. 1-2000 characters.`,
      },
      {
        name: 'sentiment',
        type: 'string',
        required: true,
        description: `Overall sentiment of the feedback.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_fetch_web',
    description: `Fetch a single public web page or document by URL and return its readable text. HTML is reduced to plain text; JSON, plain-text, and XML responses are returned as-is. Output is truncated to maxLength characters (default 30000).`,
    params: [
      {
        name: 'maxLength',
        type: 'integer',
        required: false,
        description: `Maximum characters of extracted text to return. Defaults to 30000; clamped to [1000, 100000].`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `Absolute http(s) URL to fetch, e.g. 'https://example.com/article'.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_ads',
    description: `Fetch ad data broken down by campaign, ad group, or ad for a specific platform. Returns one row per entity — NOT a time series. Use ONLY when the user asks for a per-entity breakdown. Supported platforms (21): googleadwords, facebook-ads, linked-in-ads, snapchat-ads, tiktok-ads, adroll, amazon-ads, bing-ads, twitter-ads, spotify-ads, stack-adapt, google-display-video360, pinterest-ads, reddit-ads-v1, simpli-fi, centro, centro-basis, choozle, adform, yelp-ads, ground-truth-v1.`,
    params: [
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format.`,
      },
      {
        name: 'entityType',
        type: 'string',
        required: false,
        description: `The entity type to break down by.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum rows to return (default 50).`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `The ad platform provider slug.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date in YYYY-MM-DD format.`,
      },
      {
        name: 'testMode',
        type: 'boolean',
        required: false,
        description: `Set to true to return sample data without a live API call.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_calls',
    description: `Fetch call analytics grouped by an entity type for a connected call-tracking integration. Returns one row per entity type. Supported providers (10): marchex, twilio, what-converts, callrail, call-tracking-metrics, call-source, googleadwords, avanser, delacon, wild-jar.`,
    params: [
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format.`,
      },
      {
        name: 'entityType',
        type: 'string',
        required: false,
        description: `The dimension to group calls by.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum rows to return (default 50).`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `The call tracking provider slug.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date in YYYY-MM-DD format.`,
      },
      {
        name: 'testMode',
        type: 'boolean',
        required: false,
        description: `Set to true to return sample data.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_content',
    description: `Fetch content analytics broken down by individual post, reel, pin, or video item for a specific social platform. Returns one row per content item — NOT a time series. Supported platforms (7): facebook, instagram, pinterest, youtube, linked-in, tiktok-v1, vimeo.`,
    params: [
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format.`,
      },
      {
        name: 'entityType',
        type: 'string',
        required: false,
        description: `The type of content: 'posts', 'reels', 'pins', or 'videos'.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum rows to return (default 50).`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `The social platform provider slug.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date in YYYY-MM-DD format.`,
      },
      {
        name: 'testMode',
        type: 'boolean',
        required: false,
        description: `Set to true to return sample data.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_custom_metrics',
    description: `Fetch the computed output of a single client's custom metrics (formula-driven KPIs such as 'Cost per Lead' or 'ROAS') over a date range. Provide customMetricIds to read specific metrics; omit it to read every custom metric available for the client. Use browse_client_custom_metrics first to discover the available metric ids.`,
    params: [
      {
        name: 'byDate',
        type: 'boolean',
        required: false,
        description: `Set to true to return values broken down by date.`,
      },
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID.`,
      },
      {
        name: 'customMetricIds',
        type: 'array',
        required: false,
        description: `List of custom metric IDs to fetch. Omit to fetch all.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_dashboard',
    description: `Fetch data for a specific dashboard. Step 1 (no section_name): resolves a dashboard container by dashboard_id or dashboard_name and returns the list of available dashboards. Step 2 (with section_name): fetches provider data for the named dashboard. Requires client_id on every call.`,
    params: [
      {
        name: 'client_id',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID. Required on every call.`,
      },
      {
        name: 'dashboard_id',
        type: 'integer',
        required: false,
        description: `ID of the dashboard to fetch.`,
      },
      {
        name: 'dashboard_name',
        type: 'string',
        required: false,
        description: `Name of the dashboard to fetch.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format.`,
      },
      {
        name: 'section_name',
        type: 'string',
        required: false,
        description: `Name of the section to fetch data for. Omit for Step 1 (list sections).`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_data_source',
    description: `Run a raw AAQL read query for one client and return the raw connector rows as CSV. Use this ONLY when the user explicitly asks to export raw data. For normal analytics use the entity and metric tools — they are far more token-efficient.`,
    params: [
      { name: 'asset', type: 'string', required: false, description: `The AAQL asset/table name.` },
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID.`,
      },
      {
        name: 'confirmed',
        type: 'boolean',
        required: false,
        description: `Set to true to confirm the export.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Fields to include in the output.`,
      },
      { name: 'filters', type: 'object', required: false, description: `Key-value filter map.` },
      { name: 'groupBy', type: 'array', required: false, description: `Fields to group by.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum rows (default 50).`,
      },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `The integration provider slug.`,
      },
      { name: 'sort', type: 'object', required: false, description: `Sort configuration.` },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_insights',
    description: `Return a single client's biggest-moving metrics (trend signals), ranked by the magnitude of their percent change — biggest movers first, whether up or down. Use this to answer 'what changed the most for this client?'. These are pre-computed trend signals refreshed once daily — NOT real-time.`,
    params: [
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID.`,
      },
      {
        name: 'comparisonType',
        type: 'string',
        required: false,
        description: `The comparison type.`,
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Filter to only gains ('up'), only declines ('down'), or flat metrics ('flat').`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results (default 50).`,
      },
      {
        name: 'minPercentageChangeMagnitude',
        type: 'number',
        required: false,
        description: `Minimum absolute percent change to include.`,
      },
      {
        name: 'period',
        type: 'integer',
        required: false,
        description: `Comparison window in days. Allowed values: 30 or 90.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_keywords',
    description: `Fetch keyword data for a specific platform connected to a client. Returns one row per keyword. Supported platforms (9): googleadwords, bing-ads, amazon-ads, pinterest-ads, simpli-fi, bing-webmaster-tools, google-search-console, rank-tracker, se-ranking-v1.`,
    params: [
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum rows to return (default 50).`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `The keyword platform provider slug.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date in YYYY-MM-DD format.`,
      },
      {
        name: 'testMode',
        type: 'boolean',
        required: false,
        description: `Set to true to return sample data.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_knowledge',
    description: `Answer questions grounded in a client's uploaded documents — contracts, invoices, statements of work, proposals, briefs, meeting notes, reports — or the account's shared docs (brand guidelines, templates, policies). Pass clientId to scope to one client; omit it to search all accessible clients plus shared docs. Returns a grounded, source-cited answer.`,
    params: [
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `Optional. The client (campaign) whose documents to search. Omit to search across all accessible clients plus shared account-level documents.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: `The natural-language question about the uploaded documents.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_metrics',
    description: `Fetch aggregated time-series metrics for a single client over a date range, scoped to one connected integration provider. Returns one row per day or month — NOT one row per campaign or keyword. Use this for trend questions. Responses are limited to a maximum of 200 rows. Supported providers: adroll, bing-ads, facebook, facebook-ads, google-analytics4, google-local-services-ads, google-my-business, google-search-console, googleadwords, ground-truth-v1, high-level, instagram, linked-in, linked-in-ads, pinterest-ads, reddit-ads-v1, simpli-fi, spotify-ads, stack-adapt, tiktok-ads, twitter-ads.`,
    params: [
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format.`,
      },
      {
        name: 'increment',
        type: 'string',
        required: false,
        description: `Time grouping: 'day' or 'month'.`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `The integration provider slug.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_pages',
    description: `Fetch page data for a specific platform connected to a client. Returns one row per page. Supported platforms (5): google-analytics4, google-search-console, hub-spot, unbounce, agency-analytics-auditor-4.`,
    params: [
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format.`,
      },
      {
        name: 'entityType',
        type: 'string',
        required: false,
        description: `The entity type: 'pages' or 'blog_posts'.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum rows to return (default 50).`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `The page analytics provider slug.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date in YYYY-MM-DD format.`,
      },
      {
        name: 'testMode',
        type: 'boolean',
        required: false,
        description: `Set to true to return sample data.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_report',
    description: `Read a specific scheduled report for a client/campaign. Requires report_id or report_name. Step 1 (no section_name): resolves the report and returns its list of sections. Step 2 (with section_name): fetches provider data for one specific section. Requires client_id on every call.`,
    params: [
      {
        name: 'client_id',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID. Required on every call.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format.`,
      },
      {
        name: 'report_id',
        type: 'integer',
        required: false,
        description: `ID of the report to read.`,
      },
      {
        name: 'report_name',
        type: 'string',
        required: false,
        description: `Name of the report to read.`,
      },
      {
        name: 'section_name',
        type: 'string',
        required: false,
        description: `Name of the section to fetch. Omit for Step 1 (list sections).`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_reviews',
    description: `Fetch individual customer reviews for a specific review platform connected to a client. Returns one row per review. Supported platforms (7): google-my-business, vendasta, bird-eye, gather-up, grade-us, trust-pilot, yelp.`,
    params: [
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum rows to return (default 50).`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `The review platform provider slug.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date in YYYY-MM-DD format.`,
      },
      {
        name: 'testMode',
        type: 'boolean',
        required: false,
        description: `Set to true to return sample data.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_client_traffic',
    description: `Fetch traffic analytics grouped by an entity type for a specific traffic platform. Returns one row per entity value (e.g. per device type, per country). Supported providers (6): google-analytics4, youtube, google-my-business, matomo-v1, clarity-v1, hub-spot.`,
    params: [
      {
        name: 'clientId',
        type: 'integer',
        required: false,
        description: `The client (campaign) ID.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format.`,
      },
      {
        name: 'entityType',
        type: 'string',
        required: false,
        description: `The dimension to group traffic by.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum rows to return (default 50).`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `The traffic analytics provider slug.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date in YYYY-MM-DD format.`,
      },
      {
        name: 'testMode',
        type: 'boolean',
        required: false,
        description: `Set to true to return sample data.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_read_knowledge_base',
    description: `Search the AgencyAnalytics knowledge base for how-to articles and platform documentation. Use this to answer questions about how to use the AgencyAnalytics platform itself.`,
    params: [
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to look up in the knowledge base.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_search_clients',
    description: `Look up ONE specific client by name fragment, brand token, or domain. Returns the single best-matching client (highest cosine similarity over \`company\`+\`url\`) with a \`providers\` field — use that to confirm a provider is connected before calling any entity tool. If the user wants to list, browse, or enumerate clients — use \`browse_clients\` instead.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `A substantive client identifier the user actually provided — a name fragment, brand token, or domain (e.g. "acme", "shopify", ".io"). NOT a search engine query. Empty, whitespace-only, single-character, or generic-word queries will be rejected.`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_search_users',
    description: `Search the teammates and contacts in your own AgencyAnalytics account by name or email. Returns users you are allowed to contact with id, name, email, and role.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Required. A name or email fragment to search for, e.g. "john", "smith", "john@acme.com".`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Optional. Maximum number of users to return (default 10, max 50).`,
      },
    ],
  },
  {
    name: 'agencyanalyticsmcp_search_web',
    description: `Search the live web and return a compact keyword-research result set: organic results (position, title, link, domain, snippet), related searches, People Also Ask questions, and the answer box when present. Use for keyword research, SERP inspection, and competitor discovery. Not client-scoped — no clientId required.`,
    params: [
      {
        name: 'countryCode',
        type: 'string',
        required: false,
        description: `Optional two-letter Google country code (gl), e.g. 'ca'.`,
      },
      {
        name: 'engine',
        type: 'string',
        required: false,
        description: `Search engine to use: 'google' (desktop, default), 'google_mobile', or 'bing'.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Optional language code (hl for Google, bing_language for Bing), e.g. 'en'.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum organic results to return (1-100). Defaults to 10.`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Optional free-form location to localize results, e.g. 'Toronto, Ontario, Canada'.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `The search query — a keyword phrase to research.`,
      },
    ],
  },
]
