import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'youmcp_you-contents',
    description: `Extract content from one or more web pages in markdown, HTML, or structured metadata format. Supports up to 100 URLs per call.`,
    params: [
      {
        name: 'urls',
        type: 'array',
        required: true,
        description: `One or more public HTTP/HTTPS URLs to extract content from (up to 100).`,
      },
      {
        name: 'crawl_timeout',
        type: 'number',
        required: false,
        description: `Timeout in seconds for live-crawling pages (1–60).`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `(Deprecated) Output format - use formats array instead`,
      },
      {
        name: 'formats',
        type: 'array',
        required: false,
        description: `Output formats to return: markdown (plain text), html (layout preserved), or metadata (structured data).`,
      },
    ],
  },
  {
    name: 'youmcp_you-research',
    description: `Research a topic in depth using You.com's AI. Returns comprehensive answers with cited sources at configurable effort levels (lite, standard, deep, exhaustive).`,
    params: [
      {
        name: 'input',
        type: 'string',
        required: true,
        description: `The research question or complex query for in-depth multi-step investigation (max 40,000 characters).`,
      },
      {
        name: 'research_effort',
        type: 'string',
        required: false,
        description: `How much effort to spend: lite (fast), standard (balanced), deep (thorough), exhaustive (most comprehensive).`,
      },
    ],
  },
  {
    name: 'youmcp_you-search',
    description: `Search the web and news using You.com. Supports domain filtering, language and country targeting, freshness filters, and live-crawl for full page content.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query string. Supports operators: site:domain.com, filetype:pdf, +term, -term, AND/OR/NOT, lang:en.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per section (1–100).`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Country code to localize search results (ISO 3166-1 alpha-2).`,
      },
      {
        name: 'crawl_timeout',
        type: 'integer',
        required: false,
        description: `Timeout in seconds for live-crawling pages (1–60).`,
      },
      {
        name: 'exclude_domains',
        type: 'array',
        required: false,
        description: `List of domains to exclude from search results (up to 500).`,
      },
      {
        name: 'freshness',
        type: 'string',
        required: false,
        description: `Limit results by recency: day, week, month, year, or a date range YYYY-MM-DDtoYYYY-MM-DD.`,
      },
      {
        name: 'include_domains',
        type: 'array',
        required: false,
        description: `List of domains to restrict search results to (up to 500).`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Language code (BCP 47) to filter search results.`,
      },
      {
        name: 'livecrawl',
        type: 'string',
        required: false,
        description: `Enable live-crawling of full page content for the specified section: web, news, or all.`,
      },
      {
        name: 'livecrawl_formats',
        type: 'array',
        required: false,
        description: `Output formats for live-crawled content: html and/or markdown.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Pagination offset for results (0–9).`,
      },
      {
        name: 'safesearch',
        type: 'string',
        required: false,
        description: `Safe-search filter level applied to results.`,
      },
    ],
  },
]
