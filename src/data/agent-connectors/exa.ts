import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'exa_answer',
    description: `Get a natural language answer to a question by searching the web with Exa and synthesizing results. Returns a direct answer with citations to the source pages. Ideal for factual questions, current events, and research queries. Rate limit: 60 requests/minute.`,
    params: [
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
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The question or query to answer from web sources.`,
      },
    ],
  },
  {
    name: 'exa_crawl',
    description: `Crawl one or more web pages by URL and extract their content including full text, highlights, and AI-generated summaries. Useful for reading specific pages discovered via search. Rate limit: 60 requests/minute. Credit consumption depends on number of URLs.`,
    params: [
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
      {
        name: 'urls',
        type: 'array',
        required: true,
        description: `JSON array of URLs to crawl and extract content from.`,
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
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL to find similar pages for.`,
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
    name: 'exa_list_webset_items',
    description: `List the collected URLs and items from a completed Exa Webset. Use this after polling Get Webset until its status is 'completed' to retrieve the discovered results.`,
    params: [
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
      {
        name: 'webset_id',
        type: 'string',
        required: true,
        description: `The ID of the webset to retrieve items from.`,
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
        name: 'query',
        type: 'string',
        required: true,
        description: `The research topic or question to investigate across the web.`,
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
        name: 'category',
        type: 'string',
        required: false,
        description: `Restrict results to a specific content category.`,
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
        name: 'include_text',
        type: 'boolean',
        required: false,
        description: `When true, returns the full text content of each result page (up to max_characters).`,
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
        description: `Number of results to return (1–100). Defaults to 10.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query. For neural/auto type, natural language works best. For keyword type, use specific terms.`,
      },
      {
        name: 'start_published_date',
        type: 'string',
        required: false,
        description: `Only return pages published after this date. ISO 8601 format: YYYY-MM-DDTHH:MM:SS.000Z`,
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
    ],
  },
  {
    name: 'exa_websets',
    description: `Execute a complex web query designed to discover and return large sets of URLs (up to thousands) matching specific criteria. Websets are ideal for lead generation, market research, competitor analysis, and large-scale data collection. Returns a webset ID — poll status with GET /websets/v0/websets/{id}. High credit consumption.`,
    params: [
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
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query describing what kinds of pages or entities to find. Be specific and descriptive for best results.`,
      },
    ],
  },
]
