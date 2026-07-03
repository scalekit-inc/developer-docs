import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'nimblemcp_nimble_agent_run_async',
    description: `Start an asynchronous agent run. Returns immediately with a task ID.

Use this for long-running extractions using a pre-built or custom agent. Poll results with \`nimblemcp_nimble_task_results\`.

When to use:
- You want to run a specific Nimble agent asynchronously without blocking.
- You have a long-running agent job where you will poll for results.

When NOT to use:
- You want a synchronous agent result — use \`nimblemcp_nimble_agents_run\` instead.`,
    params: [
      {
        name: 'agent',
        type: 'string',
        required: true,
        description: `Name of the agent to run (from \`nimblemcp_nimble_agents_list\`).`,
      },
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Runtime input parameters for the agent.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `Optional webhook URL to receive results when the job completes.`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'nimblemcp_nimble_agents_generate',
    description: `Kick off generation of a new custom agent.

Returns a \`generation_id\`; poll it with \`nimblemcp_nimble_agents_status\` to get the generated agent name.

When to use:
- You need a custom extraction agent for a site that isn't covered by the pre-built catalog.
- You want to generate an agent from a natural-language prompt and an example URL.

When NOT to use:
- A pre-built agent already covers the site — use \`nimblemcp_nimble_agents_run\` instead.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Natural-language instruction describing what the agent should collect (e.g. 'Collect product name, price, and rating from Amazon product pages').`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Example target URL that helps the generator understand page structure.`,
      },
      {
        name: 'agent_name',
        type: 'string',
        required: false,
        description: `Optional desired name for the generated agent.`,
      },
      {
        name: 'input_schema',
        type: 'string',
        required: false,
        description: `Optional JSON Schema object describing runtime input parameters.`,
      },
      {
        name: 'output_schema',
        type: 'string',
        required: false,
        description: `Optional JSON Schema object describing desired output fields.`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'nimblemcp_nimble_agents_get',
    description: `Get full details of a specific agent including its input/output schema.

Use after \`nimblemcp_nimble_agents_list\` to inspect an agent before running it.

When to use:
- You have an agent name and need to see its full schema before running it.

When NOT to use:
- You don't know the agent name — use \`nimblemcp_nimble_agents_list\` first.`,
    params: [
      {
        name: 'agent_id',
        type: 'string',
        required: true,
        description: `Exact agent name as returned by \`nimblemcp_nimble_agents_list\`.`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'nimblemcp_nimble_agents_list',
    description: `Browse the catalog of pre-built Nimble agents.

Use this as the first step when you want to run a structured extraction on a known site or data source.

When to use:
- You want to discover available agents for a specific domain or data source.
- You want to paginate through all agents in the catalog.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of agents to return in one page (1-100).`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Short keyword to filter agents by name or domain (e.g. 'amazon', 'linkedin'). Use 1-2 words for best results.`,
      },
      {
        name: 'skip',
        type: 'integer',
        required: false,
        description: `Offset for pagination. Use 0 for the first page.`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'nimblemcp_nimble_agents_run',
    description: `Execute an agent against a target URL or set of parameters.

Returns structured data synchronously. Use \`nimblemcp_nimble_agents_list\` to discover available agents.

When to use:
- You know the agent name and want its structured output inline.

When NOT to use:
- You want an async run — use \`nimblemcp_nimble_agent_run_async\` instead.`,
    params: [
      {
        name: 'agent_name',
        type: 'string',
        required: true,
        description: `Agent name from \`nimblemcp_nimble_agents_list\`, \`nimblemcp_nimble_agents_get\`, or a completed generation.`,
      },
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Runtime input parameters built from the agent's input_schema. Include all required keys.`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'nimblemcp_nimble_agents_status',
    description: `Check the current status of an agent generation.

Status flow: in-progress → succeeded or failed.

When to use:
- You started a generation with \`nimblemcp_nimble_agents_generate\` or \`nimblemcp_nimble_agents_update_from_agent\` and want to check if it completed.

When NOT to use:
- You want crawl job status — use \`nimblemcp_nimble_crawl_status\`.
- You want async task results — use \`nimblemcp_nimble_task_results\`.`,
    params: [
      {
        name: 'generation_id',
        type: 'string',
        required: true,
        description: `Server-assigned generation ID returned by \`nimblemcp_nimble_agents_generate\` or \`nimblemcp_nimble_agents_update_from_agent\`.`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'nimblemcp_nimble_agents_update_from_agent',
    description: `Create a refinement generation that starts from an existing agent.

Returns a \`generation_id\`; poll with \`nimblemcp_nimble_agents_status\` to get the updated agent.

When to use:
- You want to modify an existing agent's behavior using natural-language instructions.
- You want to extend an agent's output schema without rebuilding from scratch.

When NOT to use:
- You want to build a brand-new agent — use \`nimblemcp_nimble_agents_generate\`.`,
    params: [
      {
        name: 'from_agent',
        type: 'string',
        required: true,
        description: `Agent name to refine. A new generation is created from this agent.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Natural-language refinement instruction (e.g. 'add a ratings field to the output').`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'nimblemcp_nimble_crawl_list',
    description: `List crawl jobs, optionally filtered by status.

When to use:
- You want to see all active or past crawl jobs in the account.
- You want to filter crawls by their current status.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of crawl jobs to return. Default is 20.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Optional status filter (e.g. "queued", "running", "succeeded", "failed", "canceled").`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'nimblemcp_nimble_crawl_run',
    description: `Start a web crawl to extract content from multiple pages on a website.

The crawl discovers and visits pages starting from a given URL, following links up to the specified limit. Results are retrieved via \`nimblemcp_nimble_crawl_status\`.

When to use:
- You need to extract content from multiple pages on a site automatically.
- You want link-following or sitemap-based URL discovery.

When NOT to use:
- You need content from a single known URL — use \`nimblemcp_nimble_extract\` instead.
- You need results immediately — this is async; first pages complete ~1-2 min after dispatch.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Starting URL for the crawl. The crawler discovers and visits linked pages from this entry point.`,
      },
      {
        name: 'allow_external_links',
        type: 'boolean',
        required: false,
        description: `Whether to follow links to external domains. Default is false.`,
      },
      {
        name: 'allow_subdomains',
        type: 'boolean',
        required: false,
        description: `Whether to follow links to subdomains of the starting URL. Default is false.`,
      },
      {
        name: 'exclude_paths',
        type: 'string',
        required: false,
        description: `Optional regex patterns. URLs matching any pattern will be skipped.`,
      },
      {
        name: 'include_paths',
        type: 'string',
        required: false,
        description: `Optional regex patterns. Only URLs matching at least one pattern will be crawled.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of pages to crawl (default: 100). Higher limits take longer but provide more coverage.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional human-readable name for this crawl job.`,
      },
      {
        name: 'sitemap',
        type: 'string',
        required: false,
        description: `How to use the site's sitemap: "include" (default), "skip", or "only".`,
      },
      {
        name: 'tool_description',
        type: 'string',
        required: false,
        description: `Optional description of the tool's purpose.`,
      },
      {
        name: 'tool_reasoning',
        type: 'string',
        required: false,
        description: `Optional reasoning about why this tool was selected.`,
      },
    ],
  },
  {
    name: 'nimblemcp_nimble_crawl_status',
    description: `Check the status and progress of a running or completed crawl job.

When to use:
- You started a crawl with \`nimblemcp_nimble_crawl_run\` and want to check its progress or retrieve results.

When NOT to use:
- You want async task results from \`nimble_extract_async\` or \`nimble_agent_run_async\` — use \`nimblemcp_nimble_task_results\` for those.`,
    params: [
      {
        name: 'crawl_id',
        type: 'string',
        required: true,
        description: `The unique crawl identifier returned by \`nimblemcp_nimble_crawl_run\`.`,
      },
      {
        name: 'tool_description',
        type: 'string',
        required: false,
        description: `Optional description of the tool's purpose.`,
      },
      {
        name: 'tool_reasoning',
        type: 'string',
        required: false,
        description: `Optional reasoning about why this tool was selected.`,
      },
    ],
  },
  {
    name: 'nimblemcp_nimble_crawl_terminate',
    description: `Cancel a running or queued crawl job.

When to use:
- You want to stop a crawl that is no longer needed before it completes.

When NOT to use:
- The crawl has already succeeded or failed — it cannot be cancelled in a terminal state.`,
    params: [
      {
        name: 'crawl_id',
        type: 'string',
        required: true,
        description: `The unique crawl identifier to cancel.`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'nimblemcp_nimble_extract',
    description: `Extract and parse content from a specific URL using Nimble's Extract API.

This is a synchronous call — it waits for extraction to complete before returning.

When to use:
- You have a specific URL and need its content immediately.
- You want structured content (markdown, text) from a single page.

When NOT to use:
- You need to extract many pages — use \`nimblemcp_nimble_crawl_run\` instead.
- The page loads slowly — use \`nimblemcp_nimble_extract_async\` for async extraction.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL to extract content from.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Country code for geo-targeted rendering (e.g. "us").`,
      },
      {
        name: 'driver',
        type: 'string',
        required: false,
        description: `Browser driver to use: "chrome" or "firefox". Omit for default.`,
      },
      {
        name: 'locale',
        type: 'string',
        required: false,
        description: `Locale code for localized rendering (e.g. "en-US").`,
      },
      {
        name: 'output_format',
        type: 'string',
        required: false,
        description: `Output format: "markdown" (default) or "text".`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
      {
        name: 'wait',
        type: 'string',
        required: false,
        description: `Extra milliseconds to wait for dynamic content to load before extraction.`,
      },
    ],
  },
  {
    name: 'nimblemcp_nimble_extract_async',
    description: `Start an asynchronous URL extraction. Returns immediately with a task ID.

Poll \`nimblemcp_nimble_task_results\` to retrieve the extracted content when ready.

When to use:
- You want to extract a URL without blocking while it renders.
- The page is complex or slow to load.

When NOT to use:
- You need the result inline — use \`nimblemcp_nimble_extract\` for synchronous extraction.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL to extract content from.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `Optional webhook URL to receive results when extraction completes.`,
      },
      { name: 'country', type: 'string', required: false, description: `No description.` },
      {
        name: 'driver',
        type: 'string',
        required: false,
        description: `Browser driver to use: "chrome" or "firefox". Omit for default.`,
      },
      { name: 'locale', type: 'string', required: false, description: `No description.` },
      {
        name: 'output_format',
        type: 'string',
        required: false,
        description: `Output format: "markdown" (default) or "text".`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
      {
        name: 'wait',
        type: 'string',
        required: false,
        description: `Extra milliseconds to wait for dynamic content.`,
      },
    ],
  },
  {
    name: 'nimblemcp_nimble_map',
    description: `Discover all URLs on a website by crawling its pages and sitemap.

Returns a flat list of URLs found on the site. Useful for understanding site structure before targeted extraction.

When to use:
- You need to enumerate the URL space of a site before deciding what to extract.
- You want a quick snapshot of all discoverable links on a domain.

When NOT to use:
- You need the page content itself — use \`nimblemcp_nimble_crawl_run\` or \`nimblemcp_nimble_extract\`.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Starting URL. The mapper will discover all linked URLs from this entry point.`,
      },
      {
        name: 'domain_filter',
        type: 'string',
        required: false,
        description: `Optional domain filter to restrict URL discovery.`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Maximum number of URLs to return. Omit for no limit.`,
      },
      {
        name: 'sitemap',
        type: 'string',
        required: false,
        description: `Sitemap strategy: "include", "skip", or "only".`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'nimblemcp_nimble_search',
    description: `Search the web using Nimble's Search API with configurable content richness.

When to use:
- You need web search results with optional AI-generated answers.
- You want relevance-ranked results with snippet or full-page content.

When NOT to use:
- You need to extract the full content of a known URL — use \`nimblemcp_nimble_extract\`.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query text.` },
      {
        name: 'content_type',
        type: 'string',
        required: false,
        description: `Filter by content type (e.g. ["article", "blog"]).`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Country code for geotargeted results (e.g. "us").`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Filter results published on or before this date (ISO 8601).`,
      },
      {
        name: 'exclude_domains',
        type: 'string',
        required: false,
        description: `Exclude results from these domains.`,
      },
      {
        name: 'focus',
        type: 'string',
        required: false,
        description: `Focus mode(s) for search: "general", "news", "academic", etc.`,
      },
      {
        name: 'include_answer',
        type: 'boolean',
        required: false,
        description: `Whether to include an AI-generated answer synthesized from results. Default is false.`,
      },
      {
        name: 'include_domains',
        type: 'string',
        required: false,
        description: `Restrict results to these domains only.`,
      },
      {
        name: 'locale',
        type: 'string',
        required: false,
        description: `Locale code for localized search results (e.g. "en-US").`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return. Default is 3.`,
      },
      {
        name: 'max_subagents',
        type: 'integer',
        required: false,
        description: `Maximum subagents for deep search mode. Default is 3.`,
      },
      {
        name: 'output_format',
        type: 'string',
        required: false,
        description: `Output format for content: "markdown" (default) or "text".`,
      },
      {
        name: 'search_depth',
        type: 'string',
        required: false,
        description: `Depth of search: "lite" (default, faster) or "deep".`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Filter results published on or after this date (ISO 8601).`,
      },
      {
        name: 'time_range',
        type: 'string',
        required: false,
        description: `Relative time range filter (e.g. "1d", "7d", "1m").`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'nimblemcp_nimble_task_results',
    description: `Get the status and results of an async task.

Use this to retrieve results from \`nimblemcp_nimble_extract_async\` or \`nimblemcp_nimble_agent_run_async\` after initiating them.

When to use:
- You started an async extraction or agent run and want to poll for its results.

When NOT to use:
- You want crawl status — use \`nimblemcp_nimble_crawl_status\` for crawl jobs.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The task ID returned by \`nimblemcp_nimble_extract_async\` or \`nimblemcp_nimble_agent_run_async\`.`,
      },
      { name: 'tool_description', type: 'string', required: false, description: `No description.` },
      { name: 'tool_reasoning', type: 'string', required: false, description: `No description.` },
    ],
  },
]
