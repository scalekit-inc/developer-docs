import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'apifymcp_call_actor',
    description: `Call any Actor from the Apify Store. By default waits for completion and returns results with a dataset preview. Use async mode to start a run in the background and get a runId immediately.

Workflow:
1. Use apifymcp_fetch_actor_details with output: {"inputSchema": true} to get the Actor's exact input schema
2. Call this tool with the actor name and input matching that schema exactly
3. Use apifymcp_get_actor_output with the returned datasetId to fetch full results if needed

For MCP server Actors, use format 'actorName:toolName' (e.g. 'apify/actors-mcp-server:fetch-apify-docs').
Use dedicated Actor tools (e.g. apifymcp_rag_web_browser) when available instead of this tool.

When NOT to use:
- You don't know the Actor's input schema — use apifymcp_fetch_actor_details first`,
    params: [
      {
        name: 'actor',
        type: 'string',
        required: true,
        description: `Actor ID or full name in 'username/name' format (e.g. 'apify/rag-web-browser'). For MCP server Actors use 'actorName:toolName' format.`,
      },
      {
        name: 'async',
        type: 'boolean',
        required: false,
        description: `If true, starts the run and returns immediately with a runId. Use only when the user explicitly asks to run in the background or does not need immediate results.`,
      },
      {
        name: 'callOptions',
        type: 'object',
        required: false,
        description: `Optional run configuration options`,
      },
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Input JSON to pass to the Actor. Must match the Actor's input schema exactly — use apifymcp_fetch_actor_details with output: {"inputSchema": true} first to get the required fields and types.`,
      },
      {
        name: 'previewOutput',
        type: 'boolean',
        required: false,
        description: `When true (default), includes preview items in the response. Set to false when you plan to fetch full results separately via apifymcp_get_actor_output — avoids duplicate data and saves tokens.`,
      },
    ],
  },
  {
    name: 'apifymcp_fetch_actor_details',
    description: `Get detailed information about an Actor by its ID or full name (format: 'username/name', e.g. 'apify/rag-web-browser').

WARNING: Omitting the 'output' parameter returns ALL fields including the full README, which can be extremely token-heavy. Always pass 'output' with only the fields you need. To get the input schema before calling an Actor, use: {"inputSchema": true}.

When to use:
- You need an Actor's input schema before calling it — use output: {"inputSchema": true}
- User wants details about a specific Actor (pricing, description, README)
- You need to list MCP tools provided by an MCP server Actor — use output: {"mcpTools": true}

When NOT to use:
- You already have the input schema and are ready to run — use apifymcp_call_actor directly`,
    params: [
      {
        name: 'actor',
        type: 'string',
        required: true,
        description: `Actor ID or full name in 'username/name' format (e.g. 'apify/rag-web-browser')`,
      },
      {
        name: 'output',
        type: 'object',
        required: false,
        description: `JSON object with boolean flags to control which fields are returned. Always specify this to avoid a large token-heavy response. Set only the fields you need to true. Available fields: description, inputSchema, mcpTools, metadata, outputSchema, pricing, rating, readme, stats. All default to true if omitted (very large response) except mcpTools. Example: {"inputSchema": true}`,
      },
    ],
  },
  {
    name: 'apifymcp_fetch_apify_docs',
    description: `Fetch the full content of an Apify or Crawlee documentation page by its URL. Use this after finding a relevant page with apifymcp_search_apify_docs.

When to use:
- You have a documentation URL and need the complete page content
- User asks for detailed documentation on a specific Apify or Crawlee page

When NOT to use:
- You don't have a URL yet — use apifymcp_search_apify_docs first`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Full URL of the Apify or Crawlee documentation page (e.g. 'https://docs.apify.com/platform/actors')`,
      },
    ],
  },
  {
    name: 'apifymcp_get_actor_output',
    description: `Retrieve output dataset items from a specific Actor run using its datasetId. Supports field selection (including dot notation) and pagination.

When to use:
- You have a datasetId from an Actor run and need the full results
- The preview from apifymcp_call_actor didn't include all needed fields
- You need to paginate through large datasets

When NOT to use:
- You don't have a datasetId yet — run an Actor with apifymcp_call_actor first`,
    params: [
      {
        name: 'datasetId',
        type: 'string',
        required: true,
        description: `Actor output dataset ID to retrieve from`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to include. Supports dot notation for nested fields (e.g. 'crawl.httpStatusCode,metadata.url'). Note: dot-notation fields are returned as flat keys in the output — e.g. requesting 'crawl.httpStatusCode' returns {"crawl.httpStatusCode": 200}, not a nested object.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of items to return (default: 100)`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of items to skip for pagination (default: 0)`,
      },
    ],
  },
  {
    name: 'apifymcp_get_actor_run',
    description: `Get detailed information about a specific Actor run by runId. Returns run metadata (status, timestamps), performance stats, and resource IDs (datasetId, keyValueStoreId, requestQueueId).

When to use:
- You have a runId from apifymcp_call_actor (async mode) and want to check its status
- User asks about details of a specific run started outside the current conversation

When NOT to use:
- The run was just started via apifymcp_call_actor in sync mode — results are already in the response
- You want the output data — use apifymcp_get_actor_output with the datasetId`,
    params: [
      { name: 'runId', type: 'string', required: true, description: `The ID of the Actor run` },
    ],
  },
  {
    name: 'apifymcp_rag_web_browser',
    description: `Web browser for AI agents and RAG pipelines. Queries Google Search, scrapes the top N pages, and returns content as Markdown. Can also scrape a specific URL directly.

When to use:
- User wants current/immediate data (e.g. 'Get flight prices for tomorrow', 'What's the weather today?')
- User needs to fetch specific content now (e.g. 'Fetch news from CNN', 'Get product info from Amazon')
- User has time indicators like 'today', 'current', 'latest', 'recent', 'now'

When NOT to use:
- User needs repeated/scheduled scraping of a specific platform — search for a dedicated Actor using apifymcp_search_actors instead`,
    params: [
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of top Google Search results to scrape and return. Ignored when query is a direct URL. Higher values increase response time and compute cost significantly — keep low (1-3) for latency-sensitive use cases. Default: 3.`,
      },
      {
        name: 'outputFormats',
        type: 'array',
        required: false,
        description: `Output formats for the scraped page content. Options: 'markdown', 'text', 'html' (default: ['markdown'])`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Google Search keywords or a specific URL to scrape. Supports advanced search operators.`,
      },
    ],
  },
  {
    name: 'apifymcp_search_actors',
    description: `Search the Apify Store to FIND and DISCOVER what scraping tools/Actors exist for specific platforms or use cases. This tool provides INFORMATION about available Actors — it does NOT retrieve actual data or run any scraping tasks.

When to use:
- Find what scraping tools exist for a platform (e.g. 'What tools can scrape Instagram?')
- Discover available Actors for a use case (e.g. 'Find an Actor for Amazon products')
- Browse existing solutions before calling an Actor

When NOT to use:
- User wants immediate data retrieval — use apifymcp_rag_web_browser instead
- You already know the Actor ID — use apifymcp_fetch_actor_details or apifymcp_call_actor directly

Always do at least two searches: first with broad keywords, then with more specific terms if needed.`,
    params: [
      {
        name: 'keywords',
        type: 'string',
        required: false,
        description: `Space-separated keywords to search Actors in the Apify Store. Use 1-3 simple terms (e.g. 'Instagram posts', 'Amazon products'). Avoid generic terms like 'scraper' or 'crawler'. Omitting keywords or passing an empty string returns popular/general Actors — always provide keywords for relevant results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of Actors to return (1-100, default: 5)`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip for pagination (default: 0)`,
      },
    ],
  },
  {
    name: 'apifymcp_search_apify_docs',
    description: `Search Apify and Crawlee documentation using full-text search. Use keywords only, not full sentences. Select the documentation source explicitly via docSource.

Sources:
- 'apify': Platform docs, SDKs (JS, Python), CLI, REST API, Academy, Actor development
- 'crawlee-js': Crawlee JavaScript web scraping library
- 'crawlee-py': Crawlee Python web scraping library

When to use:
- User asks how to use Apify APIs, SDK, or platform features
- You need to look up Apify or Crawlee documentation

When NOT to use:
- You already have a documentation URL — use apifymcp_fetch_apify_docs directly`,
    params: [
      {
        name: 'docSource',
        type: 'string',
        required: false,
        description: `Documentation source to search. Options: 'apify' (default), 'crawlee-js', 'crawlee-py'`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return (1-20, default: 5)`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Offset for pagination (default: 0)`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Algolia full-text search query using keywords only (e.g. 'standby actor', 'proxy configuration'). Do not use full sentences.`,
      },
    ],
  },
]
