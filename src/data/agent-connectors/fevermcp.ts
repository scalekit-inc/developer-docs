import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'fevermcp_search_cities',
    description: `Find cities where Fever operates and offers events/activities. Perfect for location discovery and travel planning.`,
    params: [
      {
        name: 'locale',
        type: 'string',
        required: true,
        description: `Language code (en, es, fr, de, pt, it, ar, bg, ca, cs, da, el, et, fi, he, hr, hu, id, ja, ko, lt, lv, nl, pl, ro, sk, sl, sv, th, tr, zh) - affects localization`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `City name or search term (use '' for all cities)`,
      },
      {
        name: 'city_code',
        type: 'string',
        required: false,
        description: `Optional 3-letter city code (e.g., MAD, NYC, LON, BCN)`,
      },
      {
        name: 'only_suggested',
        type: 'boolean',
        required: false,
        description: `True returns only top/popular cities`,
      },
    ],
  },
  {
    name: 'fevermcp_search_events',
    description: `Find events, activities, and experiences available in a specific city through Fever. Perfect for event discovery and travel planning. When the user mentions a time frame (e.g. 'this weekend', 'next Friday', 'in April'), set start_datetime and end_datetime to filter results.`,
    params: [
      {
        name: 'city_code',
        type: 'string',
        required: false,
        description: `3-letter city code (e.g., MAD, NYC, LON, BCN). Required if coordinates not provided.`,
      },
      {
        name: 'end_datetime',
        type: 'string',
        required: false,
        description: `End datetime in ISO 8601 format (UTC)`,
      },
      {
        name: 'include_description',
        type: 'boolean',
        required: false,
        description: `If True, includes full plan descriptions in the response`,
      },
      {
        name: 'latitude',
        type: 'number',
        required: false,
        description: `Latitude for coordinate search (-90 to 90)`,
      },
      {
        name: 'locale',
        type: 'string',
        required: false,
        description: `Language code - affects content language`,
      },
      {
        name: 'longitude',
        type: 'number',
        required: false,
        description: `Longitude for coordinate search (-180 to 180)`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number starting from 0 for pagination`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Results per page (default 12, max 100)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search term for specific events (optional, '' for all)`,
      },
      {
        name: 'radius',
        type: 'integer',
        required: false,
        description: `Search radius in meters when using coordinates`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort order: popularity, price, rating, closest_session, distance, random`,
      },
      {
        name: 'start_datetime',
        type: 'string',
        required: false,
        description: `Start datetime in ISO 8601 format (UTC)`,
      },
    ],
  },
]
