import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'aktapro_search_news',
    description: `Search company news signals with filters for company, industry, sentiment, entities, and date range. Returns article title, URL, publisher, sentiment, AI summary, and classification metadata.`,
    params: [
      {
        name: 'blacklisted',
        type: 'string',
        required: false,
        description: `Comma-separated publisher domains to exclude.`,
      },
      {
        name: 'company',
        type: 'string',
        required: false,
        description: `Company website URL or company UUID to filter news for. Mutually exclusive with primary_company.`,
      },
      {
        name: 'countries',
        type: 'string',
        required: false,
        description: `Comma-separated 3-letter ISO country codes to filter by.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date filter, format YYYY-MM-DD. Defaults to today.`,
      },
      {
        name: 'entity_event_list',
        type: 'string',
        required: false,
        description: `Comma-separated events to filter by.`,
      },
      {
        name: 'entity_location_list',
        type: 'string',
        required: false,
        description: `Comma-separated locations to filter by.`,
      },
      {
        name: 'entity_person_list',
        type: 'string',
        required: false,
        description: `Comma-separated person names to filter by.`,
      },
      {
        name: 'entity_product_list',
        type: 'string',
        required: false,
        description: `Comma-separated products to filter by.`,
      },
      {
        name: 'iab_code_list',
        type: 'string',
        required: false,
        description: `Comma-separated IAB codes to filter by.`,
      },
      {
        name: 'industry',
        type: 'string',
        required: false,
        description: `Comma-separated industry codes to filter by.`,
      },
      {
        name: 'iptc_code_list',
        type: 'string',
        required: false,
        description: `Comma-separated IPTC codes to filter by.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return. Default 10, max 1000.`,
      },
      {
        name: 'naics_code_list',
        type: 'string',
        required: false,
        description: `Comma-separated NAICS codes to filter by.`,
      },
      {
        name: 'news_score_list',
        type: 'string',
        required: false,
        description: `Filter by newsworthiness score: High, Medium, Low, or all (default).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination. Default 0.`,
      },
      {
        name: 'primary_company',
        type: 'string',
        required: false,
        description: `Company website URL or UUID where the company is the primary subject of the article. Mutually exclusive with company.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Topic or keyword search. Mutually exclusive with title.`,
      },
      {
        name: 'sentiment_list',
        type: 'string',
        required: false,
        description: `Comma-separated sentiment filters: positive, negative, neutral, or all.`,
      },
      {
        name: 'sic_code_list',
        type: 'string',
        required: false,
        description: `Comma-separated SIC codes to filter by.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date filter, format YYYY-MM-DD.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Search by article title. Mutually exclusive with query.`,
      },
      {
        name: 'type_list',
        type: 'string',
        required: false,
        description: `Comma-separated news category filters.`,
      },
      {
        name: 'unique_article',
        type: 'boolean',
        required: false,
        description: `Group similar articles together.`,
      },
    ],
  },
]
