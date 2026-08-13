import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'exa_answer',
    description: `Get a natural language answer to a question by searching the web with Exa and synthesizing results. Returns a direct answer with citations to the source pages. Ideal for factual questions, current events, and research queries. Rate limit: 60 requests/minute.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The question or query to answer from web sources.`,
      },
      {
        name: 'exclude_domains',
        type: 'array',
        required: false,
        description: `JSON array of domains to exclude from answer sources.`,
      },
      {
        name: 'include_domains',
        type: 'array',
        required: false,
        description: `JSON array of domains to restrict source search to. Example: ["reuters.com","bbc.com"]`,
      },
      {
        name: 'include_text',
        type: 'boolean',
        required: false,
        description: `When true, also returns the source page text alongside the synthesized answer.`,
      },
      {
        name: 'num_results',
        type: 'integer',
        required: false,
        description: `Number of web sources to use when generating the answer (1–20). More sources improves accuracy but costs more credits.`,
      },
    ],
  },
  {
    name: 'exa_cancel_webset',
    description: `Cancel a running Exa Webset so it stops discovering new items. Already-collected items are preserved and remain accessible via List Webset Items.`,
    params: [
      {
        name: 'webset_id',
        type: 'string',
        required: true,
        description: `The ID of the webset to cancel.`,
      },
    ],
  },
  {
    name: 'exa_cancel_webset_enrichment',
    description: `Cancel a running enrichment on a webset, stopping further per-item research. Already-populated values are kept; a cancelled enrichment cannot be resumed. Existing tools can only create an enrichment, never cancel one.`,
    params: [
      {
        name: 'enrichment_id',
        type: 'string',
        required: true,
        description: `The ID of the enrichment to cancel.`,
      },
      {
        name: 'webset_id',
        type: 'string',
        required: true,
        description: `The ID of the webset the enrichment belongs to.`,
      },
    ],
  },
  {
    name: 'exa_crawl',
    description: `Crawl one or more web pages by URL and extract their content including full text, highlights, and AI-generated summaries. Useful for reading specific pages discovered via search. Rate limit: 60 requests/minute. Credit consumption depends on number of URLs.`,
    params: [
      {
        name: 'urls',
        type: 'array',
        required: true,
        description: `JSON array of URLs to crawl and extract content from.`,
      },
      {
        name: 'highlights_per_url',
        type: 'integer',
        required: false,
        description: `Number of highlight sentences to return per URL when include_highlights is true. Defaults to 3.`,
      },
      {
        name: 'include_highlights',
        type: 'boolean',
        required: false,
        description: `When true, returns the most relevant sentence-level highlights from each page.`,
      },
      {
        name: 'include_html_tags',
        type: 'boolean',
        required: false,
        description: `When true, retains HTML tags in the extracted text. Defaults to false (plain text only).`,
      },
      {
        name: 'include_summary',
        type: 'boolean',
        required: false,
        description: `When true, returns an AI-generated summary for each crawled page.`,
      },
      {
        name: 'max_characters',
        type: 'integer',
        required: false,
        description: `Maximum characters of text to extract per page. Defaults to 5000.`,
      },
      {
        name: 'summary_query',
        type: 'string',
        required: false,
        description: `Optional query to focus the AI summary on a specific aspect of the page.`,
      },
    ],
  },
  {
    name: 'exa_create_research_task',
    description: `Start an asynchronous deep-research task: Exa autonomously searches, reads, and synthesizes many web sources into a single well-cited answer, optionally shaped by a JSON output schema. Returns a task ID — poll Get Research Task with it until the task completes. Slower and more thorough than Research Topic. High credit consumption.`,
    params: [
      {
        name: 'instructions',
        type: 'string',
        required: true,
        description: `The research goal or question for Exa to investigate autonomously across the web.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `Which Exa research model to use.`,
      },
      {
        name: 'output_schema',
        type: 'object',
        required: false,
        description: `JSON schema describing the exact shape of the structured output you want back, instead of free-form text.`,
      },
    ],
  },
  {
    name: 'exa_create_webset_enrichment',
    description: `Add an AI enrichment to an Exa Webset that derives an extra structured field for every item (e.g. company employee count, contact email). Exa researches each existing and future item to fill in the field. Additional credit consumption per item.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Natural-language description of the data point to derive for every item.`,
      },
      {
        name: 'webset_id',
        type: 'string',
        required: true,
        description: `The ID of the webset to enrich.`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Expected data type of the enrichment result.`,
      },
      {
        name: 'options',
        type: 'array',
        required: false,
        description: `JSON array of allowed option labels, required when format is 'options'.`,
      },
    ],
  },
  {
    name: 'exa_create_webset_monitor',
    description: `Create a Monitor with a cron cadence and a search-or-refresh behavior for an existing Webset, so it keeps discovering new matching items (or re-verifying existing ones) on a schedule without manual reruns.`,
    params: [
      {
        name: 'behavior_type',
        type: 'string',
        required: true,
        description: `What the monitor does each run: 'search' to discover new items with a fresh search, or 'refresh' to re-verify/update existing items.`,
      },
      {
        name: 'cron',
        type: 'string',
        required: true,
        description: `Cron expression controlling how often the monitor runs, e.g. '0 9 * * 1' for every Monday at 9am.`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: true,
        description: `IANA timezone the cron expression is evaluated in.`,
      },
      {
        name: 'webset_id',
        type: 'string',
        required: true,
        description: `The ID of the webset this monitor keeps refreshed.`,
      },
      {
        name: 'search_behavior',
        type: 'string',
        required: false,
        description: `When behavior_type is 'search', whether new results are 'append'ed to the webset or 'override' its items.`,
      },
      {
        name: 'search_count',
        type: 'integer',
        required: false,
        description: `When behavior_type is 'search', the target number of new items to collect per run.`,
      },
      {
        name: 'search_query',
        type: 'string',
        required: false,
        description: `Required when behavior_type is 'search'. The query describing what new items to find on each run.`,
      },
    ],
  },
  {
    name: 'exa_create_webset_search',
    description: `Run an additional search against an existing Exa Webset to discover more matching items without creating a brand-new webset. Useful for broadening or refining an in-progress or completed webset. High credit consumption.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query describing what kinds of pages or entities to find. Be specific and descriptive for best results.`,
      },
      {
        name: 'webset_id',
        type: 'string',
        required: true,
        description: `The ID of the webset to add this search to.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Target number of additional URLs to collect with this search.`,
      },
      {
        name: 'entity_type',
        type: 'string',
        required: false,
        description: `The type of entity to search for. Helps Exa understand what constitutes a valid result match.`,
      },
      {
        name: 'exclude_domains',
        type: 'array',
        required: false,
        description: `JSON array of domains to exclude from this search's results.`,
      },
      {
        name: 'include_domains',
        type: 'array',
        required: false,
        description: `JSON array of domains to restrict this search's sources to.`,
      },
    ],
  },
  {
    name: 'exa_delete_webset',
    description: `Delete an Exa Webset by its ID. This permanently removes the webset and all its collected items. This action cannot be undone.`,
    params: [
      {
        name: 'webset_id',
        type: 'string',
        required: true,
        description: `The ID of the webset to delete.`,
      },
    ],
  },
  {
    name: 'exa_find_similar',
    description: `Find web pages similar to a given URL using Exa's neural similarity search. Useful for competitor research, finding related articles, or discovering similar companies. Optionally returns page text, highlights, or summaries. Rate limit: 60 requests/minute.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL to find similar pages for.`,
      },
      {
        name: 'end_published_date',
        type: 'string',
        required: false,
        description: `Only return pages published before this date. ISO 8601 format: YYYY-MM-DDTHH:MM:SS.000Z`,
      },
      {
        name: 'exclude_domains',
        type: 'array',
        required: false,
        description: `Array of domains to exclude from results.`,
      },
      {
        name: 'include_domains',
        type: 'array',
        required: false,
        description: `Array of domains to restrict results to.`,
      },
      {
        name: 'include_text',
        type: 'boolean',
        required: false,
        description: `When true, returns the full text content of each result page.`,
      },
      {
        name: 'max_characters',
        type: 'integer',
        required: false,
        description: `Maximum characters of page text to return per result when include_text is true. Defaults to 3000.`,
      },
      {
        name: 'num_results',
        type: 'integer',
        required: false,
        description: `Number of similar results to return (1–100). Defaults to 10.`,
      },
      {
        name: 'start_published_date',
        type: 'string',
        required: false,
        description: `Only return pages published after this date. ISO 8601 format: YYYY-MM-DDTHH:MM:SS.000Z`,
      },
    ],
  },
  {
    name: 'exa_get_research_task',
    description: `Check the status of a Research Task and retrieve its output once complete. Use the task ID returned by Create Research Task.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The ID of the research task to retrieve.`,
      },
    ],
  },
  {
    name: 'exa_get_webset',
    description: `Get the status and details of an existing Exa Webset by its ID. Use this to poll the status of an async webset created with Create Webset. Returns metadata including status (created, running, completed, cancelled), progress, and configuration.`,
    params: [
      {
        name: 'webset_id',
        type: 'string',
        required: true,
        description: `The ID of the webset to retrieve.`,
      },
    ],
  },
  {
    name: 'exa_get_webset_item',
    description: `Retrieve a single item from an Exa Webset by its item ID, including its full enrichment data and verification evidence. Use List Webset Items to find item IDs.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The ID of the item to retrieve.`,
      },
      {
        name: 'webset_id',
        type: 'string',
        required: true,
        description: `The ID of the webset that contains the item.`,
      },
    ],
  },
  {
    name: 'exa_get_webset_monitor',
    description: `Get a single Monitor's configuration, enabled/disabled status, cadence, and last/next run details.`,
    params: [
      {
        name: 'monitor_id',
        type: 'string',
        required: true,
        description: `The ID of the monitor to retrieve.`,
      },
    ],
  },
  {
    name: 'exa_list_webset_items',
    description: `List the collected URLs and items from a completed Exa Webset. Use this after polling Get Webset until its status is 'completed' to retrieve the discovered results.`,
    params: [
      {
        name: 'webset_id',
        type: 'string',
        required: true,
        description: `The ID of the webset to retrieve items from.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of items to return per page. Defaults to 10.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response to fetch the next page of items.`,
      },
    ],
  },
  {
    name: 'exa_list_webset_monitors',
    description: `List Monitors, which keep a Webset continuously refreshed on a schedule via a cron cadence. The entire Monitors resource is uncovered.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of monitors to return per page. Defaults to 25.`,
      },
      {
        name: 'webset_id',
        type: 'string',
        required: false,
        description: `Filter to monitors belonging to this webset only.`,
      },
    ],
  },
  {
    name: 'exa_list_websets',
    description: `List all Exa Websets in your account with optional pagination. Returns a list of websets with their IDs, statuses, and configurations.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of websets to return per page. Defaults to 10.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'exa_research',
    description: `Run in-depth research on a topic using Exa's neural search. Performs a semantic search and returns results with full page text and AI-generated summaries, providing structured multi-source research output. Best for comprehensive topic analysis. Rate limit: 60 requests/minute.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The research topic or question to investigate across the web.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Restrict research to a specific content category for more targeted results.`,
      },
      {
        name: 'exclude_domains',
        type: 'array',
        required: false,
        description: `JSON array of domains to exclude from research results.`,
      },
      {
        name: 'include_domains',
        type: 'array',
        required: false,
        description: `JSON array of domains to restrict research sources to. Useful to focus on authoritative sources.`,
      },
      {
        name: 'max_characters',
        type: 'integer',
        required: false,
        description: `Maximum characters of text to extract per source page. Defaults to 5000.`,
      },
      {
        name: 'num_results',
        type: 'integer',
        required: false,
        description: `Number of sources to gather for the research (1–20). More sources provide broader coverage.`,
      },
      {
        name: 'start_published_date',
        type: 'string',
        required: false,
        description: `Only include sources published after this date. ISO 8601 format.`,
      },
      {
        name: 'summary_query',
        type: 'string',
        required: false,
        description: `Optional focused question to guide the AI page summaries. Defaults to the main research query.`,
      },
    ],
  },
  {
    name: 'exa_search',
    description: `Search the web using Exa's AI-powered semantic or keyword search engine. Supports filtering by domain, date range, content category, and result type. Optionally returns page text, highlights, or summaries alongside search results. Rate limit: 60 requests/minute.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query. For neural/auto type, natural language works best. For keyword type, use specific terms.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Restrict results to a specific content category.`,
      },
      {
        name: 'end_crawl_date',
        type: 'string',
        required: false,
        description: `Only return pages crawled (discovered) before this date. ISO 8601 format.`,
      },
      {
        name: 'end_published_date',
        type: 'string',
        required: false,
        description: `Only return pages published before this date. ISO 8601 format: YYYY-MM-DDTHH:MM:SS.000Z`,
      },
      {
        name: 'exclude_domains',
        type: 'array',
        required: false,
        description: `JSON array of domains to exclude from results. Example: ["reddit.com","quora.com"]`,
      },
      {
        name: 'include_domains',
        type: 'array',
        required: false,
        description: `JSON array of domains to restrict results to. Example: ["techcrunch.com","wired.com"]`,
      },
      {
        name: 'include_highlights',
        type: 'boolean',
        required: false,
        description: `When true, returns relevant text snippets from each result page.`,
      },
      {
        name: 'include_summary',
        type: 'boolean',
        required: false,
        description: `When true, returns an LLM-generated summary for each result page.`,
      },
      {
        name: 'include_text',
        type: 'boolean',
        required: false,
        description: `When true, returns the full text content of each result page (up to max_characters).`,
      },
      {
        name: 'max_age_hours',
        type: 'integer',
        required: false,
        description: `Maximum age of cached content in hours. 0 fetches fresh content; -1 always uses cache; omit for fallback. Max 720.`,
      },
      {
        name: 'max_characters',
        type: 'integer',
        required: false,
        description: `Maximum characters of page text to return per result when include_text is true. Defaults to 3000.`,
      },
      {
        name: 'moderation',
        type: 'boolean',
        required: false,
        description: `When true, enables content moderation to filter unsafe content from results.`,
      },
      {
        name: 'num_results',
        type: 'integer',
        required: false,
        description: `Number of results to return (1–100). Defaults to 10.`,
      },
      {
        name: 'start_crawl_date',
        type: 'string',
        required: false,
        description: `Only return pages crawled (discovered) after this date. ISO 8601 format.`,
      },
      {
        name: 'start_published_date',
        type: 'string',
        required: false,
        description: `Only return pages published after this date. ISO 8601 format: YYYY-MM-DDTHH:MM:SS.000Z`,
      },
      {
        name: 'system_prompt',
        type: 'string',
        required: false,
        description: `Additional instructions that guide generated output, source preferences, or agent behavior.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Search type: 'neural' for semantic AI search (best for natural language), 'keyword' for exact-match keyword search, 'auto' to let Exa decide.`,
      },
      {
        name: 'use_autoprompt',
        type: 'boolean',
        required: false,
        description: `When true, Exa automatically rewrites the query to be more semantically effective.`,
      },
      {
        name: 'user_location',
        type: 'string',
        required: false,
        description: `Two-letter ISO country code of the user, used to localize results. e.g. US, GB, DE.`,
      },
    ],
  },
  {
    name: 'exa_update_webset',
    description: `Update an existing Exa Webset's metadata or external reference ID. Use this to tag a webset for your own bookkeeping without recreating it.`,
    params: [
      {
        name: 'webset_id',
        type: 'string',
        required: true,
        description: `The ID of the webset to update.`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `New external identifier to tag this webset for reference in your system.`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: false,
        description: `Free-form key-value metadata to attach to the webset. Replaces any existing metadata.`,
      },
    ],
  },
  {
    name: 'exa_websets',
    description: `Execute a complex web query designed to discover and return large sets of URLs (up to thousands) matching specific criteria. Websets are ideal for lead generation, market research, competitor analysis, and large-scale data collection. Returns a webset ID — poll status with GET /websets/v0/websets/{id}. High credit consumption.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query describing what kinds of pages or entities to find. Be specific and descriptive for best results.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Target number of URLs to collect. Can range from hundreds to thousands. Higher counts take longer and consume more credits.`,
      },
      {
        name: 'entity_type',
        type: 'string',
        required: false,
        description: `The type of entity to search for. Helps Exa understand what constitutes a valid result match.`,
      },
      {
        name: 'exclude_domains',
        type: 'array',
        required: false,
        description: `JSON array of domains to exclude from webset results.`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `Optional external identifier to tag this webset for reference in your system.`,
      },
      {
        name: 'include_domains',
        type: 'array',
        required: false,
        description: `JSON array of domains to restrict webset sources to.`,
      },
    ],
  },
]
