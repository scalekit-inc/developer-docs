import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'firecrawlmcp_firecrawl_agent',
    description: `Start an autonomous AI research agent that browses the web to answer a prompt. Returns a job ID; poll with firecrawlmcp_firecrawl_agent_status for results.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Natural-language instruction to guide extraction or crawling.`,
      },
      {
        name: 'schema',
        type: 'object',
        required: false,
        description: `JSON Schema defining the structure of data to extract.`,
      },
      {
        name: 'urls',
        type: 'array',
        required: false,
        description: `List of URLs to extract structured data from.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_agent_status',
    description: `Retrieve the status and results of a running AI research agent job by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the resource.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_browser_create',
    description: `Create a persistent browser session for interactive scraping.`,
    params: [
      {
        name: 'activityTtl',
        type: 'number',
        required: false,
        description: `Seconds of inactivity after which the session is automatically destroyed.`,
      },
      {
        name: 'profile',
        type: 'object',
        required: false,
        description: `Named browser profile to use for authenticated scraping.`,
      },
      {
        name: 'streamWebView',
        type: 'boolean',
        required: false,
        description: `Set to true to stream the browser viewport during the session.`,
      },
      {
        name: 'ttl',
        type: 'number',
        required: false,
        description: `Session lifetime in seconds after creation.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_browser_delete',
    description: `Destroy a browser session and release its resources.`,
    params: [
      {
        name: 'sessionId',
        type: 'string',
        required: true,
        description: `The ID of the browser session. Get it from firecrawlmcp_firecrawl_browser_create.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_browser_list',
    description: `List active or destroyed browser sessions for the account.`,
    params: [
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter browser sessions by status. Accepted values: active, destroyed.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_check_crawl_status',
    description: `Check the progress and results of an in-progress crawl job by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the resource.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_crawl',
    description: `Start a crawl job that extracts content from all pages of a website. Returns a job ID; use firecrawlmcp_firecrawl_check_crawl_status to poll for results.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL of the page or website to scrape, crawl, or map.`,
      },
      {
        name: 'allowExternalLinks',
        type: 'boolean',
        required: false,
        description: `Set to true to follow links to external domains.`,
      },
      {
        name: 'allowSubdomains',
        type: 'boolean',
        required: false,
        description: `Set to true to crawl subdomains of the target domain.`,
      },
      {
        name: 'crawlEntireDomain',
        type: 'boolean',
        required: false,
        description: `Set to true to crawl all paths on the domain, not just the starting URL subtree.`,
      },
      {
        name: 'deduplicateSimilarURLs',
        type: 'boolean',
        required: false,
        description: `Set to true to skip URLs that are similar to already-crawled URLs.`,
      },
      {
        name: 'delay',
        type: 'number',
        required: false,
        description: `Milliseconds to wait between requests to avoid rate limiting.`,
      },
      {
        name: 'excludePaths',
        type: 'array',
        required: false,
        description: `URL path patterns to exclude from the crawl (e.g. ["/admin", "/login"]).`,
      },
      {
        name: 'ignoreQueryParameters',
        type: 'boolean',
        required: false,
        description: `Set to true to treat URLs differing only by query string as duplicates.`,
      },
      {
        name: 'includePaths',
        type: 'array',
        required: false,
        description: `URL path patterns to restrict the crawl to (e.g. ["/blog/*"]).`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'maxConcurrency',
        type: 'number',
        required: false,
        description: `Maximum number of concurrent requests during a crawl.`,
      },
      {
        name: 'maxDiscoveryDepth',
        type: 'number',
        required: false,
        description: `Maximum link depth to follow from the starting URL.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: `Natural-language instruction to guide extraction or crawling.`,
      },
      {
        name: 'scrapeOptions',
        type: 'object',
        required: false,
        description: `Scraping options applied to each page during crawl or search (formats, tags, etc.).`,
      },
      {
        name: 'sitemap',
        type: 'string',
        required: false,
        description: `How to use the sitemap: include to discover URLs from it, only to crawl only sitemap URLs, skip to ignore it.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_extract',
    description: `Extract structured data from one or more URLs using a natural-language prompt and optional JSON Schema.`,
    params: [
      {
        name: 'urls',
        type: 'array',
        required: true,
        description: `List of URLs to extract structured data from.`,
      },
      {
        name: 'allowExternalLinks',
        type: 'boolean',
        required: false,
        description: `Set to true to follow links to external domains.`,
      },
      {
        name: 'enableWebSearch',
        type: 'boolean',
        required: false,
        description: `Set to true to supplement extraction with live web search results.`,
      },
      {
        name: 'includeSubdomains',
        type: 'boolean',
        required: false,
        description: `Set to true to include subdomains of the target domain.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: `Natural-language instruction to guide extraction or crawling.`,
      },
      {
        name: 'schema',
        type: 'object',
        required: false,
        description: `JSON Schema defining the structure of data to extract.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_interact',
    description: `Run code or a natural-language prompt in a live browser session for a previously scraped page.`,
    params: [
      {
        name: 'scrapeId',
        type: 'string',
        required: true,
        description: `The ID of the active scrape session. Get it from firecrawlmcp_firecrawl_scrape when using interact.`,
      },
      {
        name: 'code',
        type: 'string',
        required: false,
        description: `Code snippet to execute in the browser session.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Programming language for the code snippet to execute in the browser session.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: `Natural-language instruction to guide extraction or crawling.`,
      },
      {
        name: 'timeout',
        type: 'number',
        required: false,
        description: `Milliseconds to wait for the browser interaction to complete.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_interact_stop',
    description: `End an active browser interaction session and release its resources.`,
    params: [
      {
        name: 'scrapeId',
        type: 'string',
        required: true,
        description: `The ID of the active scrape session. Get it from firecrawlmcp_firecrawl_scrape when using interact.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_map',
    description: `Discover all indexed URLs on a website or within a URL subtree, with optional search filtering.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL of the page or website to scrape, crawl, or map.`,
      },
      {
        name: 'ignoreQueryParameters',
        type: 'boolean',
        required: false,
        description: `Set to true to treat URLs differing only by query string as duplicates.`,
      },
      {
        name: 'includeSubdomains',
        type: 'boolean',
        required: false,
        description: `Set to true to include subdomains of the target domain.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter URLs returned by the map.`,
      },
      {
        name: 'sitemap',
        type: 'string',
        required: false,
        description: `How to use the sitemap: include to discover URLs from it, only to crawl only sitemap URLs, skip to ignore it.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_check',
    description: `Retrieve the page-level diff results for a single monitor check run.`,
    params: [
      {
        name: 'checkId',
        type: 'string',
        required: true,
        description: `The ID of a specific monitor check. Get it from firecrawlmcp_firecrawl_monitor_checks.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the resource.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'pageStatus',
        type: 'string',
        required: false,
        description: `Filter check results to pages with this change status.`,
      },
      {
        name: 'skip',
        type: 'integer',
        required: false,
        description: `Number of items to skip for pagination.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_checks',
    description: `List the historical check runs for a monitor, with pagination.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the resource.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of items to skip for pagination.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_create',
    description: `Create a recurring Firecrawl monitor that scrapes a URL on a schedule and diffs results against the previous run.`,
    params: [
      {
        name: 'body',
        type: 'object',
        required: true,
        description: `Monitor configuration object. Include name, url, schedule (cron), and scrapeOptions.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_delete',
    description: `Permanently delete a monitor and stop its scheduled checks.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the resource.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_get',
    description: `Retrieve the configuration and status of a single monitor by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the resource.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_list',
    description: `List all monitors configured for the authenticated account, with pagination.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of items to skip for pagination.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_run',
    description: `Trigger an immediate check for a monitor outside its normal schedule.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the resource.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_update',
    description: `Update monitor settings such as name, status, schedule, or scrape options.`,
    params: [
      {
        name: 'body',
        type: 'object',
        required: true,
        description: `Monitor configuration object. Include name, url, schedule (cron), and scrapeOptions.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the resource.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_scrape',
    description: `Scrape a single URL and return its content in one or more formats (markdown, JSON, screenshot, etc.).`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL of the page or website to scrape, crawl, or map.`,
      },
      {
        name: 'excludeTags',
        type: 'array',
        required: false,
        description: `HTML tags or CSS selectors to remove from extracted content.`,
      },
      {
        name: 'formats',
        type: 'array',
        required: false,
        description: `Output formats to return. Accepted values: markdown, html, rawHtml, screenshot, links, summary, branding, json, query, audio.`,
      },
      {
        name: 'includeTags',
        type: 'array',
        required: false,
        description: `HTML tags or CSS selectors to restrict extraction to.`,
      },
      {
        name: 'jsonOptions',
        type: 'object',
        required: false,
        description: `Options for JSON extraction: prompt and optional JSON Schema.`,
      },
      {
        name: 'location',
        type: 'object',
        required: false,
        description: `Geographic location for localized content. Pass an object with country (ISO 3166-1 alpha-2 code) and optional languages array.`,
      },
      {
        name: 'lockdown',
        type: 'boolean',
        required: false,
        description: `Set to true to serve from cache only, without any outbound network requests.`,
      },
      {
        name: 'maxAge',
        type: 'number',
        required: false,
        description: `Maximum cache age in seconds; serve cached data up to this age for faster responses.`,
      },
      {
        name: 'mobile',
        type: 'boolean',
        required: false,
        description: `Set to true to emulate a mobile browser viewport.`,
      },
      {
        name: 'onlyMainContent',
        type: 'boolean',
        required: false,
        description: `Set to true to strip navigation, headers, footers, and other boilerplate.`,
      },
      {
        name: 'parsers',
        type: 'array',
        required: false,
        description: `Additional parsers to apply. Accepted values: pdf.`,
      },
      {
        name: 'pdfOptions',
        type: 'object',
        required: false,
        description: `Options for PDF parsing, such as the maximum number of pages.`,
      },
      {
        name: 'profile',
        type: 'object',
        required: false,
        description: `Named browser profile to use for authenticated scraping.`,
      },
      {
        name: 'proxy',
        type: 'string',
        required: false,
        description: `Proxy tier to use: basic for standard, stealth or enhanced for bot-resistant sites.`,
      },
      {
        name: 'queryOptions',
        type: 'object',
        required: false,
        description: `Options for query-mode extraction: the prompt and response mode.`,
      },
      {
        name: 'removeBase64Images',
        type: 'boolean',
        required: false,
        description: `Set to true to strip inline base64-encoded images from the output.`,
      },
      {
        name: 'screenshotOptions',
        type: 'object',
        required: false,
        description: `Options for screenshot capture, such as full-page and quality settings.`,
      },
      {
        name: 'skipTlsVerification',
        type: 'boolean',
        required: false,
        description: `Set to true to skip TLS certificate validation (use for self-signed certs).`,
      },
      {
        name: 'storeInCache',
        type: 'boolean',
        required: false,
        description: `Set to true to cache this response for future maxAge-based lookups.`,
      },
      {
        name: 'waitFor',
        type: 'number',
        required: false,
        description: `Milliseconds to wait for JavaScript to render before extracting content.`,
      },
      {
        name: 'zeroDataRetention',
        type: 'boolean',
        required: false,
        description: `Set to true to prevent Firecrawl from storing any data for this request.`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_search',
    description: `Search the web and optionally scrape content from the top results.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query to send to Firecrawl web search.`,
      },
      {
        name: 'enterprise',
        type: 'array',
        required: false,
        description: `Search mode tier. Accepted values: default, anon, zdr.`,
      },
      {
        name: 'excludeDomains',
        type: 'array',
        required: false,
        description: `Domains to exclude from search results.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Advanced search filter string in Google tbs format.`,
      },
      {
        name: 'includeDomains',
        type: 'array',
        required: false,
        description: `Restrict search results to these domains only.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Geographic location for localized scraping or search results.`,
      },
      {
        name: 'scrapeOptions',
        type: 'object',
        required: false,
        description: `Scraping options applied to each page during crawl or search (formats, tags, etc.).`,
      },
      {
        name: 'sources',
        type: 'array',
        required: false,
        description: `Sources to include. Each item must have a type field. Accepted values for type: web, images, news.`,
      },
      {
        name: 'tbs',
        type: 'string',
        required: false,
        description: `Time-based search filter (e.g. qdr:d for past day, qdr:w for past week).`,
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_search_feedback',
    description: `Send structured feedback on a previous search result to help improve future results.`,
    params: [
      {
        name: 'rating',
        type: 'string',
        required: true,
        description: `Your overall quality rating for the search result.`,
      },
      {
        name: 'searchId',
        type: 'string',
        required: true,
        description: `The ID of a previous search result. Returned by firecrawlmcp_firecrawl_search.`,
      },
      {
        name: 'missingContent',
        type: 'array',
        required: false,
        description: `Content types or topics that were missing from the search results.`,
      },
      {
        name: 'querySuggestions',
        type: 'string',
        required: false,
        description: `Alternative search queries that might yield better results.`,
      },
      {
        name: 'valuableSources',
        type: 'array',
        required: false,
        description: `URLs you found particularly useful in the search results.`,
      },
    ],
  },
]
