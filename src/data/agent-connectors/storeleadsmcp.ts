import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'storeleadsmcp_bulk_get_domains',
    description: `Fetch multiple domains by name in a single request.`,
    params: [
      {
        name: 'domains',
        type: 'array',
        required: true,
        description: `Array of domain names to look up (max 100)`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_company_to_domain',
    description: `Map a company name to its e-commerce domain.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Company name to look up` },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_detect_domain',
    description: `Detect what e-commerce platform a domain is using.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Domain name to detect (e.g. 'example.com')`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_get_app',
    description: `Look up a single app by its token/slug. Returns installs, reviews, rating, vendor info, and more.`,
    params: [
      { name: 'token', type: 'string', required: true, description: `App token/slug identifier` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_get_app_reviews',
    description: `Get reviews for a specific app.`,
    params: [
      { name: 'token', type: 'string', required: true, description: `App token/slug identifier` },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_get_domain',
    description: `Look up a single e-commerce store domain by name. Returns platform, plan, estimated sales, apps, technologies, contact info, social stats, and more.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Domain name (e.g. 'example.com')`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_get_domain_by_id',
    description: `Look up a domain by its internal numeric ID.`,
    params: [
      { name: 'id', type: 'number', required: true, description: `Internal domain ID` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_get_historical_domains',
    description: `Get domains from a specific historical snapshot.`,
    params: [
      {
        name: 'label',
        type: 'string',
        required: true,
        description: `Historical snapshot label (from list_historical_datasets)`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number` },
      { name: 'page_size', type: 'number', required: false, description: `Results per page` },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_get_platforms',
    description: `List all available e-commerce platforms/providers.`,
    params: [
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_get_product',
    description: `Get a specific product by its ID.`,
    params: [
      { name: 'id', type: 'number', required: true, description: `Product ID` },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_get_products_for_domain',
    description: `Get products listed on an e-commerce store domain.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Domain name (e.g. 'example.com')`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_get_technology',
    description: `Look up a single technology by name. Returns install count, description, categories, and vendor info.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Technology name (e.g. 'Klaviyo')`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_list_historical_datasets',
    description: `List available historical domain snapshots.`,
    params: [
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_search_apps',
    description: `Search e-commerce apps across app stores (Shopify, BigCommerce, etc.). Filter by category, vendor, install count, review count, and more.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Filter object using f: prefix keys. Common filters:
- "f:p": platform (e.g. "shopify")
- "f:categories": app category
- "f:vendor": vendor name
- "f:vcc": vendor country code
- "f:as": app state ("Active"/"Inactive")
- "f:icmin"/"f:icmax": install count range
- "f:rcmin"/"f:rcmax": review count range`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number` },
      { name: 'page_size', type: 'number', required: false, description: `Results per page` },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
      { name: 'q', type: 'string', required: false, description: `Keyword search query` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort fields (e.g. '-installs')`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_search_domains',
    description: `Search and filter e-commerce store domains. Supports filtering by country, category, technology, app, theme, estimated sales, product count, rank, employee count, social followers, and more. Providers include shopify, bigcommerce, woocommerce, squarespace, webflow, etc. Use provider "all" to search across all platforms.

IMPORTANT:
- Technology filters ("f:tech") require exact names. Use search_technologies first to get the exact name.
- App filters ("f:an") require the app ID in "platform.token" format (e.g. "shopify.klaviyo-email-marketing"). ALWAYS use search_apps first, then use the "id" field from the result as the "f:an" value. Do NOT use the app name or token alone.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return (e.g. 'name,platform,estimated_sales,country_code')`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Filter object using f: prefix keys.

Location & language:
- "f:cc": country code (e.g. "US", "AU", "GB")
- "f:reg": region (e.g. "Europe", "Americas")
- "f:sreg": subregion (e.g. "Northern Europe")
- "f:lang": language code (e.g. "en", "de")
- "f:curr": currency code (e.g. "USD", "AUD", "EUR")

Platform & plan:
- "f:p": ecommerce platform (e.g. "shopify", "woocommerce")
- "f:plan": pricing plan (e.g. "Shopify Plus", "Professional")
- "f:ds": domain state ("Active", "Inactive", "Password Protected")

Apps & technologies:
- "f:an": app ID in "platform.token" format (e.g. "shopify.klaviyo-email-marketing"). IMPORTANT: use the "id" field from search_apps, NOT the app name.
- "f:tech": technology name (use search_technologies first to get the exact name)
- "f:app_installed_at": app ID to filter by install date (use with f:app_installed_at:min/max)
- "f:app_installed_at:min"/"f:app_installed_at:max": date range for app install (ISO format)
- "f:tech_installed_at": technology name to filter by install date (use with f:tech_installed_at:min/max)
- "f:tech_installed_at:min"/"f:tech_installed_at:max": date range for tech install (ISO format)

Store attributes:
- "f:cat": category (e.g. "/Apparel", "/Beauty & Fitness")
- "f:tn": theme name
- "f:features": store features (e.g. "Contact Page", "Returns Page", "Store Locator Page", "Has iOS App")
- "f:tags": tags (e.g. "Dropshipper", "Print on Demand", "Trending on TikTok")

Numeric ranges (use min/max suffixes):
- "f:ermin"/"f:ermax": estimated monthly sales in cents of USD (e.g. 4000000 = $40k/month)
- "f:pcmin"/"f:pcmax": product count range
- "f:rankmin"/"f:rankmax": rank range
- "f:empcmin"/"f:empcmax": employee count range
- "f:masmin"/"f:masmax": monthly app spend in cents of USD

Dates:
- "f:cratmin"/"f:cratmax": created at date range (ISO format)

Boolean operations — use ":op" suffix for multi-value filters:
- "or": match any value (e.g. "f:cc": "US,GB", "f:cc:op": "or")
- "and": match all values (default)
- "not": exclude matching values`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number (0-indexed)` },
      {
        name: 'page_size',
        type: 'number',
        required: false,
        description: `Results per page (default: 50, max: 5000)`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (e.g. "shopify", "woocommerce", "bigcommerce", "all"). Defaults to STORELIST_PROVIDER env var or "all".`,
      },
      { name: 'q', type: 'string', required: false, description: `Keyword search query` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort fields, comma-separated. Prefix with - for descending. Always include rank as secondary sort.
Examples: "-er,rank" (sales desc), "-pc,rank" (products desc), "-empc,rank" (employees desc),
"rank" (rank asc), "-fc_10,rank" (TikTok followers desc), "-fc_6,rank" (Pinterest desc),
"-cratyyyymmddnco,rank" (newest first), "-mas,rank" (monthly app spend desc)`,
      },
    ],
  },
  {
    name: 'storeleadsmcp_search_technologies',
    description: `Search technologies used by e-commerce stores. Filter by install count.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Filter object. Common filters:
- "f:icmin"/"f:icmax": install count range`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number` },
      { name: 'page_size', type: 'number', required: false, description: `Results per page` },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Platform provider (default: "all")`,
      },
      { name: 'q', type: 'string', required: false, description: `Keyword search query` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort fields (e.g. '-installs')`,
      },
    ],
  },
]
