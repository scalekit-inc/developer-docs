import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mobbinmcp_search_flows',
    description: `Search Mobbin for multi-step user flows (e.g. onboarding, checkout) using natural language. Returns flow screens with inline images.`,
    params: [
      {
        name: 'platform',
        type: 'string',
        required: true,
        description: `Platform to filter results by.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language query to search for user flows.`,
      },
      {
        name: 'image_format',
        type: 'string',
        required: false,
        description: `Format for the returned flow screen images.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
    ],
  },
  {
    name: 'mobbinmcp_search_screens',
    description: `Search Mobbin for UI screens using natural language. Returns matching screens with inline images and metadata.`,
    params: [
      {
        name: 'platform',
        type: 'string',
        required: true,
        description: `Platform to filter results by.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language query to search for UI screens.`,
      },
      {
        name: 'exclude_screen_ids',
        type: 'array',
        required: false,
        description: `List of screen IDs to exclude from results.`,
      },
      {
        name: 'image_format',
        type: 'string',
        required: false,
        description: `Format for the returned screen images.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Search mode to control result matching strategy.`,
      },
    ],
  },
  {
    name: 'mobbinmcp_search_sections',
    description: `Search Mobbin for website sections (e.g. About, Pricing, Footer) using natural language. Returns section images from real websites.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language query to search for website sections.`,
      },
      {
        name: 'image_format',
        type: 'string',
        required: false,
        description: `Format for the returned section images.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
    ],
  },
]
