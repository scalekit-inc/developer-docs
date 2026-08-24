import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'builtwithmcp_ask_api',
    description: `Ask API lookup for natural language website list queries. OpenAI requests are served as preview results and do not commit full reports.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The natural language query (e.g. 'Magento websites in Spain')`,
      },
      {
        name: 'commit',
        type: 'boolean',
        required: false,
        description: `Ignored for OpenAI/ChatGPT requests; preview mode is always used there`,
      },
      {
        name: 'meta',
        type: 'boolean',
        required: false,
        description: `Set to true to include metadata in the results`,
      },
      {
        name: 'nextOffset',
        type: 'string',
        required: false,
        description: `Pagination offset from the previous response's NextOffset`,
      },
    ],
  },
  {
    name: 'builtwithmcp_ask_api_json',
    description: `Raw Ask API JSON lookup for app/internal use. OpenAI requests never send COMMIT=true.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The natural language query (e.g. 'Magento websites in Spain')`,
      },
      {
        name: 'commit',
        type: 'boolean',
        required: false,
        description: `Set to true to run a full report returning up to 1000 results`,
      },
      {
        name: 'meta',
        type: 'boolean',
        required: false,
        description: `Set to true to include metadata in the results`,
      },
      {
        name: 'nextOffset',
        type: 'string',
        required: false,
        description: `Pagination offset from the previous response's NextOffset`,
      },
    ],
  },
  {
    name: 'builtwithmcp_change_api',
    description: `Change API JSON lookup for technology additions and removals by domain. Supports one or more comma-separated domains and optional natural language SINCE values such as 'last month'.`,
    params: [
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `Domain name, or comma-separated domain names, to check for technology changes`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Optional natural language date range such as 'last month'; defaults to 3 months`,
      },
    ],
  },
  {
    name: 'builtwithmcp_company_to_url',
    description: `Company to URL API JSON lookup for domains from a company name.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: true,
        description: `The company name to resolve to a website domain.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_domain_api',
    description: `Domain API JSON lookup for technology and metadata by domain.`,
    params: [
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_domain_api_json',
    description: `Raw Domain API JSON lookup for technology and metadata by domain.`,
    params: [
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_domain_lookup',
    description: `Returns the live web technologies used on the root domain name.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The root domain name to look up (without http/https or www).`,
      },
      {
        name: 'liveOnly',
        type: 'boolean',
        required: false,
        description: `When true, only technologies currently detected as live on the site are returned (excludes historical/removed technologies).`,
      },
    ],
  },
  {
    name: 'builtwithmcp_free_api',
    description: `Free API JSON lookup for category/group counts by domain.`,
    params: [
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_keywords_api',
    description: `Keywords API JSON lookup for keyword data by domain.`,
    params: [
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_keywords_search_api',
    description: `Keyword Search API — find websites containing a specific keyword. Returns a list of matching domains and a NextOffset value for pagination. Costs API credits per query.`,
    params: [
      {
        name: 'keyword',
        type: 'string',
        required: true,
        description: `The keyword to search for (e.g. 'perfume')`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Results per request (16–1000, default 100)`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Domain name from the previous response's NextOffset for pagination`,
      },
    ],
  },
  {
    name: 'builtwithmcp_list_api',
    description: `List API JSON lookup for websites using a primary technology. Requires an active BuiltWith plan. OTHERTECHS are subordinate filters and do not consume additional primary technology report slots.`,
    params: [
      {
        name: 'tech',
        type: 'string',
        required: true,
        description: `Primary technology name, such as Shopify`,
      },
      {
        name: 'aiMaturity',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith's AI maturity score range for the site.`,
      },
      {
        name: 'aiOpenness',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith's AI openness score range for the site.`,
      },
      {
        name: 'aiReadiness',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith's AI readiness score range for the site.`,
      },
      {
        name: 'aiVisibility',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith's AI visibility score range for the site.`,
      },
      {
        name: 'all',
        type: 'boolean',
        required: false,
        description: `When true, includes all matching results rather than a summarized subset.`,
      },
      {
        name: 'bwRank',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith traffic rank range.`,
      },
      {
        name: 'bws',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith technology-adoption score range.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Two-letter country code to filter results by.`,
      },
      {
        name: 'ecommerceCategory',
        type: 'string',
        required: false,
        description: `Filter results by ecommerce product category.`,
      },
      {
        name: 'employees',
        type: 'string',
        required: false,
        description: `Filter results by estimated employee count range.`,
      },
      {
        name: 'followers',
        type: 'string',
        required: false,
        description: `Filter results by estimated social media follower count range.`,
      },
      {
        name: 'majestic',
        type: 'string',
        required: false,
        description: `Filter results by Majestic referring-domains rank range.`,
      },
      {
        name: 'meta',
        type: 'boolean',
        required: false,
        description: `When true, includes extra metadata fields in the response.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Pagination offset — pass the value returned from the previous response to fetch the next page.`,
      },
      {
        name: 'otherTechs',
        type: 'string',
        required: false,
        description: `Optional comma-separated subordinate technology filters; these do not consume additional report slots`,
      },
      {
        name: 'pageRank',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith page rank range.`,
      },
      {
        name: 'revenue',
        type: 'string',
        required: false,
        description: `Filter results by estimated company revenue range.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Natural-language date range to filter by, e.g. 'last month' or 'last 6 months'. Defaults to 3 months if omitted.`,
      },
      {
        name: 'sitemap',
        type: 'string',
        required: false,
        description: `Filter results by estimated sitemap page count range.`,
      },
      {
        name: 'sku',
        type: 'string',
        required: false,
        description: `Filter results by estimated product/SKU count range (ecommerce sites).`,
      },
      {
        name: 'spend',
        type: 'string',
        required: false,
        description: `Filter results by estimated technology/ad spend range.`,
      },
      {
        name: 'tranco',
        type: 'string',
        required: false,
        description: `Filter results by Tranco traffic rank range.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_mcp_list_api',
    description: `Search and browse remote MCP servers in the BuiltWith MCP registry (v2). Requires a BuiltWith API key supplied as a bearer token. Provide search, category, or both. Returns up to 100 results per page as a JSON array of {Domain, Category, Description, Endpoints: [{Endpoint, AuthRequired, Tools: [{Name, Description}]}], first_detected, last_detected}, and preserves the complete API response including any fields added in the future. Uses no API credits.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `MCP registry category slug; required when search is omitted`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Zero-based pagination offset (default 0; page size is 100)`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Keyword matched against MCP server domains and descriptions; required when category is omitted`,
      },
    ],
  },
  {
    name: 'builtwithmcp_mcp_list_categories',
    description: `List valid BuiltWith MCP registry category slugs, labels, and entry counts (v2). This public endpoint requires no API key and uses no API credits.`,
    params: [],
  },
  {
    name: 'builtwithmcp_payment_balance',
    description: `Check an existing account's API-credit balance through the saved-Stripe-method top-up service. This is not x402.`,
    params: [
      {
        name: 'billingKey',
        type: 'string',
        required: false,
        description: `Separately scoped Agent Billing Key; optional when the MCP request uses a compatible credential`,
      },
    ],
  },
  {
    name: 'builtwithmcp_payment_config',
    description: `Retrieve saved-Stripe-method account top-up limits, UTC monthly period, purchase increment, and idempotency rules. This is not x402.`,
    params: [
      {
        name: 'billingKey',
        type: 'string',
        required: false,
        description: `Separately scoped Agent Billing Key; optional when the MCP request uses a compatible credential`,
      },
    ],
  },
  {
    name: 'builtwithmcp_payment_purchase',
    description: `Charge an existing account's saved Stripe payment method and add account API credits. This is not x402. Requires the separately scoped Agent Billing Key, fixed 2,000-credit increments, and an idempotency key.`,
    params: [
      {
        name: 'billingKey',
        type: 'string',
        required: true,
        description: `Separately scoped Agent Billing Key from payments.builtwith.com/agent-payment-api-config`,
      },
      {
        name: 'credits',
        type: 'integer',
        required: true,
        description: `Number of account API credits to purchase in fixed increments of 2,000`,
      },
      {
        name: 'idempotencyKey',
        type: 'string',
        required: true,
        description: `Unique operation identifier; reuse only when retrying the identical purchase`,
      },
    ],
  },
  {
    name: 'builtwithmcp_product_api',
    description: `Product API JSON lookup for ecommerce product searches.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The ecommerce product search text.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_recommendations_api',
    description: `Recommendations API JSON lookup for technology recommendations by domain.`,
    params: [
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_redirects_api',
    description: `Redirects API JSON lookup for live and historical redirects by domain.`,
    params: [
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_relationships_api',
    description: `Relationships API JSON lookup for related websites by domain.`,
    params: [
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_tags_api',
    description: `Tags API JSON lookup for related domains from IP or attributes.`,
    params: [
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `An IP address or account attribute to find related domains for.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_trends_api',
    description: `Trends API JSON lookup for technology trend data.`,
    params: [
      {
        name: 'tech',
        type: 'string',
        required: true,
        description: `The primary technology name to filter by, using BuiltWith's technology naming, such as Shopify.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_trust_api',
    description: `Trust API JSON lookup for trust scoring by domain.`,
    params: [
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_usage_api',
    description: `Usage API JSON lookup for current credit balance (used, purchased, remaining). Uses no API credits.`,
    params: [],
  },
  {
    name: 'builtwithmcp_vat_api',
    description: `VAT API JSON lookup for VAT, GST, CNPJ, ABN, and other publicly displayed company registration numbers associated with websites. Accepts 1–16 comma-separated domains. Uses 1 API credit only for each domain that returns registration data; domains with no results use no credits. Returned identifiers are found on public websites and are not verified or validated by BuiltWith.`,
    params: [
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One to 16 domain names, separated by commas`,
      },
    ],
  },
  {
    name: 'builtwithmcp_vat_types_api',
    description: `List every company registration type that the VAT API may return, including its code, friendly name, and description. This public endpoint requires no API key and uses no API credits.`,
    params: [],
  },
  {
    name: 'builtwithmcp_vector_api',
    description: `Search BuiltWith technologies and categories by text query using vector similarity. Returns ranked results with similarity scores (0–1), descriptions, and category info. Useful for discovering what technologies match a concept or description (e.g. 'react framework', 'payment gateway', 'live chat'). Costs 1 API credit per query.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Text to search for (e.g. 'javascript framework', 'email marketing')`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results to return (default 10, max 100)`,
      },
    ],
  },
  {
    name: 'builtwithmcp_whoami_api',
    description: `WhoAmI API JSON lookup for account limits, credit costs, privacy flags, max batch sizes, and endpoint inventory. Uses no API credits. Call this first to make account-aware decisions.`,
    params: [],
  },
  {
    name: 'builtwithmcp_x402_ask_api',
    description: `Natural-language website query using one prepaid credit. Committed reports and pagination also require a Basic or Pro List pass.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
      {
        name: 'payer',
        type: 'string',
        required: true,
        description: `Base wallet address that will sign the x402 payment`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search text or natural-language query.`,
      },
      {
        name: 'commit',
        type: 'boolean',
        required: false,
        description: `When true, runs a full committed report (consumes a report slot) instead of a preview.`,
      },
      {
        name: 'meta',
        type: 'boolean',
        required: false,
        description: `When true, includes extra metadata fields in the response.`,
      },
      {
        name: 'nextOffset',
        type: 'string',
        required: false,
        description: `Pagination token copied from the previous response's NextOffset field.`,
      },
      {
        name: 'passToken',
        type: 'string',
        required: false,
        description: `Opaque token returned by x402-list-pass-purchase`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_change_api',
    description: `Technology additions and removals for one or more comma-separated domains. Deducts prepaid credits from a reusable key.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Natural-language date range to filter by, e.g. 'last month' or 'last 6 months'. Defaults to 3 months if omitted.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_company_to_url',
    description: `Domains associated with a company name. Deducts prepaid credits from a reusable key.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: true,
        description: `The company name to resolve to a website domain.`,
      },
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_credit_balance',
    description: `Check purchased, used, pending, and available credits for a reusable prepaid key. Uses no payment and consumes no credits.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_credit_purchase',
    description: `Purchase a batch of at least 2,000 non-expiring BuiltWith API credits with one x402 payment. Returns a reusable secret credit key; provide an existing key to top it up.`,
    params: [
      {
        name: 'credits',
        type: 'integer',
        required: true,
        description: `Number of API credits, in the increments this endpoint requires.`,
      },
      {
        name: 'payer',
        type: 'string',
        required: true,
        description: `Base wallet address that will sign the x402 payment`,
      },
      {
        name: 'creditKey',
        type: 'string',
        required: false,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_domain_api',
    description: `Domain API technology and metadata lookup for one domain using one prepaid credit.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_domain_api_json',
    description: `Raw Domain API JSON lookup for one or more comma-separated domains. Deducts prepaid credits from a reusable key.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_domain_lookup',
    description: `Returns live web technologies for one domain using one prepaid credit.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The root domain name to look up (without http/https or www).`,
      },
      {
        name: 'liveOnly',
        type: 'boolean',
        required: false,
        description: `When true, only technologies currently detected as live on the site are returned (excludes historical/removed technologies).`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_keywords_api',
    description: `Keyword data for a domain. Deducts prepaid credits from a reusable key.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_keywords_search_api',
    description: `Search websites containing a keyword with a valid x402 List pass.`,
    params: [
      {
        name: 'keyword',
        type: 'string',
        required: true,
        description: `The keyword to search for across indexed websites.`,
      },
      {
        name: 'passToken',
        type: 'string',
        required: true,
        description: `Opaque token returned by x402-list-pass-purchase`,
      },
      {
        name: 'payer',
        type: 'string',
        required: true,
        description: `Base wallet address that will sign the x402 payment`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return for this request.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Pagination offset — pass the value returned from the previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_list_api',
    description: `List websites using a primary technology with a valid x402 List pass. OTHERTECHS are subordinate filters and never consume additional technology report slots.`,
    params: [
      {
        name: 'passToken',
        type: 'string',
        required: true,
        description: `Opaque token returned by x402-list-pass-purchase`,
      },
      {
        name: 'payer',
        type: 'string',
        required: true,
        description: `Base wallet address that will sign the x402 payment`,
      },
      {
        name: 'tech',
        type: 'string',
        required: true,
        description: `Primary technology name, such as Shopify`,
      },
      {
        name: 'aiMaturity',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith's AI maturity score range for the site.`,
      },
      {
        name: 'aiOpenness',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith's AI openness score range for the site.`,
      },
      {
        name: 'aiReadiness',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith's AI readiness score range for the site.`,
      },
      {
        name: 'aiVisibility',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith's AI visibility score range for the site.`,
      },
      {
        name: 'all',
        type: 'boolean',
        required: false,
        description: `When true, includes all matching results rather than a summarized subset.`,
      },
      {
        name: 'bwRank',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith traffic rank range.`,
      },
      {
        name: 'bws',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith technology-adoption score range.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Two-letter country code to filter results by.`,
      },
      {
        name: 'ecommerceCategory',
        type: 'string',
        required: false,
        description: `Filter results by ecommerce product category.`,
      },
      {
        name: 'employees',
        type: 'string',
        required: false,
        description: `Filter results by estimated employee count range.`,
      },
      {
        name: 'followers',
        type: 'string',
        required: false,
        description: `Filter results by estimated social media follower count range.`,
      },
      {
        name: 'majestic',
        type: 'string',
        required: false,
        description: `Filter results by Majestic referring-domains rank range.`,
      },
      {
        name: 'meta',
        type: 'boolean',
        required: false,
        description: `When true, includes extra metadata fields in the response.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Pagination offset — pass the value returned from the previous response to fetch the next page.`,
      },
      {
        name: 'otherTechs',
        type: 'string',
        required: false,
        description: `Optional comma-separated subordinate technology filters; these do not consume additional report slots`,
      },
      {
        name: 'pageRank',
        type: 'string',
        required: false,
        description: `Filter results by BuiltWith page rank range.`,
      },
      {
        name: 'revenue',
        type: 'string',
        required: false,
        description: `Filter results by estimated company revenue range.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Natural-language date range to filter by, e.g. 'last month' or 'last 6 months'. Defaults to 3 months if omitted.`,
      },
      {
        name: 'sitemap',
        type: 'string',
        required: false,
        description: `Filter results by estimated sitemap page count range.`,
      },
      {
        name: 'sku',
        type: 'string',
        required: false,
        description: `Filter results by estimated product/SKU count range (ecommerce sites).`,
      },
      {
        name: 'spend',
        type: 'string',
        required: false,
        description: `Filter results by estimated technology/ad spend range.`,
      },
      {
        name: 'tranco',
        type: 'string',
        required: false,
        description: `Filter results by Tranco traffic rank range.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_list_pass_purchase',
    description: `Purchase a 30-day Basic ($295, 2 technology and 2 keyword reports) or Pro ($495, 50 and 50) List API pass with Base USDC.`,
    params: [
      {
        name: 'payer',
        type: 'string',
        required: true,
        description: `Base wallet address that will sign the x402 payment`,
      },
      {
        name: 'tier',
        type: 'string',
        required: true,
        description: `Which List pass tier to purchase.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_pricing',
    description: `Show prepaid batch-credit pricing, x402 configuration, and List pass tiers. Optionally quote a credit quantity. Uses no payment.`,
    params: [
      {
        name: 'credits',
        type: 'integer',
        required: false,
        description: `Number of API credits, in the increments this endpoint requires.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_recommendations_api',
    description: `Technology recommendations for a domain. Deducts prepaid credits from a reusable key.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_redirects_api',
    description: `Live and historical redirects for a domain. Deducts prepaid credits from a reusable key.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_relationships_api',
    description: `Related websites for a domain. Deducts prepaid credits from a reusable key.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_tags_api',
    description: `Related domains from an IP address or attributes. Deducts prepaid credits from a reusable key.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `An IP address or account attribute to find related domains for.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_trust_api',
    description: `Trust score for a domain. Deducts prepaid credits from a reusable key.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_vat_api',
    description: `Public company registration identifiers for one to sixteen domains. Deducts prepaid credits from a reusable key.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
      {
        name: 'lookup',
        type: 'string',
        required: true,
        description: `One or more root domain names to look up. Some endpoints accept a comma-separated list of up to 16 — see the tool description for the exact limit.`,
      },
    ],
  },
  {
    name: 'builtwithmcp_x402_vector_api',
    description: `Vector similarity search across BuiltWith technologies and categories. Deducts prepaid credits from a reusable key.`,
    params: [
      {
        name: 'creditKey',
        type: 'string',
        required: true,
        description: `Reusable prepaid key returned by x402-credit-purchase`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search text or natural-language query.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return for this request.`,
      },
    ],
  },
]
