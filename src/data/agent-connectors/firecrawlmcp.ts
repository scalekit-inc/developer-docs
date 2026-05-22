import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'firecrawlmcp_firecrawl_scrape',
    description: `Scrape a single URL and return its content in markdown, HTML, or other formats.`,
    params: [
      { name: 'url', type: 'string', required: true, description: 'The URL to scrape.' },
      {
        name: 'formats',
        type: 'string',
        required: false,
        description:
          'Output formats to return. Pass as a JSON array via the SDK. Accepted values: markdown, html, rawHtml, screenshot, links, summary, json, query, audio.',
      },
      {
        name: 'onlyMainContent',
        type: 'boolean',
        required: false,
        description: 'Set to true to strip navigation, headers, footers, and other boilerplate.',
      },
      {
        name: 'includeTags',
        type: 'string',
        required: false,
        description:
          'HTML tags or CSS selectors to restrict extraction to. Pass as a JSON array via the SDK.',
      },
      {
        name: 'excludeTags',
        type: 'string',
        required: false,
        description:
          'HTML tags or CSS selectors to remove from extracted content. Pass as a JSON array via the SDK.',
      },
      {
        name: 'waitFor',
        type: 'number',
        required: false,
        description: 'Milliseconds to wait for JavaScript to render before extracting content.',
      },
      {
        name: 'mobile',
        type: 'boolean',
        required: false,
        description: 'Set to true to emulate a mobile browser viewport.',
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description:
          'Country and optional languages for geo-localized scraping. Pass as a JSON object via the SDK, e.g. {"country": "US", "languages": ["en"]}.',
      },
      {
        name: 'proxy',
        type: 'string',
        required: false,
        description: 'Proxy tier to use. Accepted values: basic, stealth, enhanced, auto.',
      },
      {
        name: 'jsonOptions',
        type: 'string',
        required: false,
        description:
          'Prompt and optional JSON Schema for structured data extraction. Pass as a JSON object via the SDK.',
      },
      {
        name: 'screenshotOptions',
        type: 'string',
        required: false,
        description:
          'Screenshot settings such as full-page and quality. Pass as a JSON object via the SDK.',
      },
      {
        name: 'pdfOptions',
        type: 'string',
        required: false,
        description:
          'PDF parsing options such as maximum pages. Pass as a JSON object via the SDK.',
      },
      {
        name: 'skipTlsVerification',
        type: 'boolean',
        required: false,
        description: 'Set to true to skip TLS certificate validation.',
      },
      {
        name: 'maxAge',
        type: 'number',
        required: false,
        description: 'Maximum cache age in seconds.',
      },
      {
        name: 'storeInCache',
        type: 'boolean',
        required: false,
        description: 'Set to true to cache this response for future maxAge-based lookups.',
      },
      {
        name: 'removeBase64Images',
        type: 'boolean',
        required: false,
        description: 'Set to true to strip inline base64-encoded images from the output.',
      },
      {
        name: 'zeroDataRetention',
        type: 'boolean',
        required: false,
        description: 'Set to true to prevent Firecrawl from storing any data for this request.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_search',
    description: `Search the web and return scraped content from the top results.`,
    params: [
      { name: 'query', type: 'string', required: true, description: 'The search query.' },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Maximum number of results to return.',
      },
      {
        name: 'sources',
        type: 'string',
        required: false,
        description:
          'Search sources to include. Pass as a JSON array via the SDK, e.g. [{"type": "web"}]. Accepted types: web, images, news.',
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: 'Geographic location for localized search results.',
      },
      {
        name: 'includeDomains',
        type: 'string',
        required: false,
        description: 'Domains to restrict search results to. Pass as a JSON array via the SDK.',
      },
      {
        name: 'excludeDomains',
        type: 'string',
        required: false,
        description: 'Domains to exclude from search results. Pass as a JSON array via the SDK.',
      },
      {
        name: 'scrapeOptions',
        type: 'string',
        required: false,
        description:
          'Scraping options applied to each result page. Pass as a JSON object via the SDK.',
      },
      {
        name: 'tbs',
        type: 'string',
        required: false,
        description: 'Time-based search filter (e.g. qdr:d for past day, qdr:w for past week).',
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: 'Advanced search filter string in Google tbs format.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_crawl',
    description: `Crawl a website starting from a URL and extract content from all discovered pages.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: 'The root URL to begin crawling.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Maximum number of pages to crawl.',
      },
      {
        name: 'maxDiscoveryDepth',
        type: 'number',
        required: false,
        description: 'Maximum link depth to follow from the starting URL.',
      },
      {
        name: 'maxConcurrency',
        type: 'number',
        required: false,
        description: 'Maximum number of concurrent requests.',
      },
      {
        name: 'includePaths',
        type: 'string',
        required: false,
        description:
          'URL path patterns to restrict the crawl to. Pass as a JSON array via the SDK.',
      },
      {
        name: 'excludePaths',
        type: 'string',
        required: false,
        description:
          'URL path patterns to exclude from the crawl. Pass as a JSON array via the SDK.',
      },
      {
        name: 'allowExternalLinks',
        type: 'boolean',
        required: false,
        description: 'Set to true to follow links to external domains.',
      },
      {
        name: 'allowSubdomains',
        type: 'boolean',
        required: false,
        description: 'Set to true to crawl subdomains of the target domain.',
      },
      {
        name: 'scrapeOptions',
        type: 'string',
        required: false,
        description: 'Scraping options applied to each page. Pass as a JSON object via the SDK.',
      },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: 'Natural-language instruction to filter which pages to include.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_check_crawl_status',
    description: `Check the status of a crawl job by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'The crawl job ID returned by firecrawlmcp_firecrawl_crawl.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_extract',
    description: `Extract structured data from one or more URLs using a natural-language prompt and optional JSON Schema.`,
    params: [
      {
        name: 'urls',
        type: 'string',
        required: true,
        description: 'URLs to extract content from. Pass as a JSON array via the SDK.',
      },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: 'Natural-language instruction describing what data to extract.',
      },
      {
        name: 'schema',
        type: 'string',
        required: false,
        description:
          'JSON Schema defining the shape of data to extract. Pass as a JSON object via the SDK.',
      },
      {
        name: 'allowExternalLinks',
        type: 'boolean',
        required: false,
        description: 'Set to true to follow links to external domains.',
      },
      {
        name: 'enableWebSearch',
        type: 'boolean',
        required: false,
        description: 'Set to true to supplement extraction with live web search results.',
      },
      {
        name: 'includeSubdomains',
        type: 'boolean',
        required: false,
        description: 'Set to true to include subdomains of the target domain.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_map',
    description: `Map a website's URL structure starting from a base URL.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: 'The root URL to begin mapping.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Maximum number of URLs to return.',
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: 'Search term to filter the URLs returned.',
      },
      {
        name: 'includeSubdomains',
        type: 'boolean',
        required: false,
        description: 'Set to true to include subdomains.',
      },
      {
        name: 'ignoreQueryParameters',
        type: 'boolean',
        required: false,
        description: 'Set to true to treat URLs differing only by query string as duplicates.',
      },
      {
        name: 'sitemap',
        type: 'string',
        required: false,
        description: 'How to use the sitemap. Accepted values: include, skip, only.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_agent',
    description: `Run an AI web research agent that autonomously browses and extracts data based on a prompt.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: 'Natural-language instruction to guide the agent.',
      },
      {
        name: 'urls',
        type: 'string',
        required: false,
        description: 'Seed URLs for the agent to start from. Pass as a JSON array via the SDK.',
      },
      {
        name: 'schema',
        type: 'string',
        required: false,
        description:
          'JSON Schema defining the shape of data to extract. Pass as a JSON object via the SDK.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_agent_status',
    description: `Get the status and results of a running or completed AI agent job.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'The agent job ID returned by firecrawlmcp_firecrawl_agent.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_browser_create',
    description: `Create a persistent browser session for interactive scraping.`,
    params: [
      {
        name: 'ttl',
        type: 'number',
        required: false,
        description: 'Session lifetime in seconds after creation.',
      },
      {
        name: 'activityTtl',
        type: 'number',
        required: false,
        description: 'Seconds of inactivity after which the session is automatically destroyed.',
      },
      {
        name: 'streamWebView',
        type: 'boolean',
        required: false,
        description: 'Set to true to stream the browser viewport during the session.',
      },
      {
        name: 'profile',
        type: 'string',
        required: false,
        description:
          'Named browser profile to use. Pass as a JSON object via the SDK, e.g. {"name": "my-profile", "saveChanges": false}.',
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
        description: 'Filter by session status. Accepted values: active, destroyed.',
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
        description: 'The session ID. Get it from firecrawlmcp_firecrawl_browser_create.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_interact',
    description: `Execute code or a natural-language instruction in an active browser session.`,
    params: [
      {
        name: 'scrapeId',
        type: 'string',
        required: true,
        description:
          'The active scrape session ID. Get it from firecrawlmcp_firecrawl_scrape when using interact mode.',
      },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: 'Natural-language instruction for the browser to execute.',
      },
      {
        name: 'code',
        type: 'string',
        required: false,
        description: 'Code snippet to execute in the browser session.',
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: 'Programming language for the code. Accepted values: bash, python, node.',
      },
      {
        name: 'timeout',
        type: 'number',
        required: false,
        description: 'Milliseconds to wait for the interaction to complete.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_interact_stop',
    description: `Stop an active browser interaction session.`,
    params: [
      {
        name: 'scrapeId',
        type: 'string',
        required: true,
        description: 'The active scrape session ID to stop.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_create',
    description: `Create a website monitor that detects page changes on a schedule.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description:
          'Monitor configuration including name, url, and cron schedule. Pass as a JSON object via the SDK, e.g. {"name": "My Monitor", "url": "https://example.com", "schedule": "0 9 * * 1"}.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_list',
    description: `List all website monitors for the account.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Maximum number of monitors to return.',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Number of monitors to skip for pagination.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_get',
    description: `Get details of a specific website monitor.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'The monitor ID. Get it from firecrawlmcp_firecrawl_monitor_list.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_update',
    description: `Update the configuration of an existing website monitor.`,
    params: [
      { name: 'id', type: 'string', required: true, description: 'The monitor ID to update.' },
      {
        name: 'body',
        type: 'string',
        required: true,
        description: 'Updated monitor configuration. Pass as a JSON object via the SDK.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_delete',
    description: `Delete a website monitor.`,
    params: [
      { name: 'id', type: 'string', required: true, description: 'The monitor ID to delete.' },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_run',
    description: `Trigger an immediate check for a monitor outside its normal schedule.`,
    params: [
      { name: 'id', type: 'string', required: true, description: 'The monitor ID to run now.' },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_checks',
    description: `List the check history for a monitor.`,
    params: [
      { name: 'id', type: 'string', required: true, description: 'The monitor ID.' },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Maximum number of checks to return.',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Number of checks to skip for pagination.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_monitor_check',
    description: `Get the detailed results of a specific monitor check.`,
    params: [
      { name: 'id', type: 'string', required: true, description: 'The monitor ID.' },
      {
        name: 'checkId',
        type: 'string',
        required: true,
        description: 'The check ID. Get it from firecrawlmcp_firecrawl_monitor_checks.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Maximum number of results to return.',
      },
      {
        name: 'pageStatus',
        type: 'string',
        required: false,
        description:
          'Filter by page change status. Accepted values: same, new, changed, removed, error.',
      },
      {
        name: 'skip',
        type: 'number',
        required: false,
        description: 'Number of items to skip for pagination.',
      },
    ],
  },
  {
    name: 'firecrawlmcp_firecrawl_search_feedback',
    description: `Submit feedback on a previous search result to improve future results.`,
    params: [
      {
        name: 'searchId',
        type: 'string',
        required: true,
        description: 'The search ID returned by firecrawlmcp_firecrawl_search.',
      },
      {
        name: 'rating',
        type: 'string',
        required: true,
        description: 'Your quality rating. Accepted values: good, bad, partial.',
      },
      {
        name: 'valuableSources',
        type: 'string',
        required: false,
        description:
          'Useful sources from the results. Pass as a JSON array via the SDK, e.g. [{"url": "https://docs.example.com", "reason": "Comprehensive docs"}].',
      },
      {
        name: 'missingContent',
        type: 'string',
        required: false,
        description:
          'Topics missing from results. Pass as a JSON array via the SDK, e.g. [{"topic": "pricing", "description": "No pricing info found"}].',
      },
      {
        name: 'querySuggestions',
        type: 'string',
        required: false,
        description: 'Alternative search queries that might yield better results.',
      },
    ],
  },
]
