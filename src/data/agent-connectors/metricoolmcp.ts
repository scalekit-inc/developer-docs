import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'metricoolmcp_createscheduledpost',
    description: `Schedule a post to Metricool at a specific date and time across one or more social networks.`,
    params: [
      {
        name: 'blogId',
        type: 'string',
        required: true,
        description: `Blog id of the Metricool brand account`,
      },
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `Publication date/time. Format: ISO 8601 (YYYY-MM-DDTHH:MM:SS±HH:MM)`,
      },
      {
        name: 'info',
        type: 'string',
        required: true,
        description: `JSON-encoded post data including providers, text, publicationDate, media, networkData, etc.`,
      },
      {
        name: 'mediaFiles',
        type: 'array',
        required: false,
        description: `Files from ChatGPT file picker. Each item has download_url (required), file_id (required), mime_type, file_name.`,
      },
    ],
  },
  {
    name: 'metricoolmcp_getanalyticsavailablemetrics',
    description: `Get the available analytics metrics for a specific social network and connector in Metricool.`,
    params: [
      {
        name: 'connector',
        type: 'string',
        required: false,
        description: `Connector type (e.g. evolution, posts, reels, stories, competitors, hashtags, campaigns, videos)`,
      },
      {
        name: 'network',
        type: 'string',
        required: false,
        description: `Social network (e.g. instagram, facebook, twitter, youtube, tiktok, linkedin, pinterest, twitch, bluesky, threads, googleBusinessProfile, metaAds, facebookAds, tiktokAds, brandInfo, website, brandSummary)`,
      },
    ],
  },
  {
    name: 'metricoolmcp_getanalyticsdatabymetrics',
    description: `Retrieve analytical data for a Metricool account over a date range based on selected metrics.`,
    params: [
      {
        name: 'brandId',
        type: 'string',
        required: true,
        description: `Brand id of the Metricool account`,
      },
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `Start date. Format: ISO 8601 (YYYY-MM-DDTHH:MM:SS±HH:MM)`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `End date. Format: ISO 8601 (YYYY-MM-DDTHH:MM:SS±HH:MM)`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: false,
        description: `List of Data Studio field IDs (e.g. IGPO01)`,
      },
    ],
  },
  {
    name: 'metricoolmcp_getbesttimetopostbynetwork',
    description: `Get the best time to post for a specific social network on a Metricool account.`,
    params: [
      {
        name: 'brandId',
        type: 'string',
        required: true,
        description: `Blog id of the Metricool brand account`,
      },
      {
        name: 'fromDate',
        type: 'string',
        required: true,
        description: `Start date. Format: ISO 8601 (YYYY-MM-DDTHH:MM:SS±HH:MM)`,
      },
      {
        name: 'socialNetwork',
        type: 'string',
        required: true,
        description: `Social network: twitter, facebook, instagram, linkedin, youtube, or tiktok`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: true,
        description: `Timezone. Format: IANA identifier`,
      },
      {
        name: 'toDate',
        type: 'string',
        required: true,
        description: `End date. Format: ISO 8601 (YYYY-MM-DDTHH:MM:SS±HH:MM)`,
      },
    ],
  },
  {
    name: 'metricoolmcp_getbrandsettings',
    description: `Get the list of brands from your Metricool account. Only Instagram, Facebook, Twitch, YouTube, Twitter, and Bluesky support competitors.`,
    params: [],
  },
  {
    name: 'metricoolmcp_getscheduledposts',
    description: `Get the list of scheduled posts for a specific Metricool brand.`,
    params: [
      {
        name: 'brandId',
        type: 'string',
        required: true,
        description: `Blog id of the Metricool brand account`,
      },
      {
        name: 'fromDate',
        type: 'string',
        required: true,
        description: `Start date. Format: ISO 8601 (YYYY-MM-DDTHH:MM:SS±HH:MM)`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: true,
        description: `Timezone of the post. Format: IANA identifier`,
      },
      {
        name: 'toDate',
        type: 'string',
        required: true,
        description: `End date. Format: ISO 8601 (YYYY-MM-DDTHH:MM:SS±HH:MM)`,
      },
      {
        name: 'extendedRange',
        type: 'boolean',
        required: false,
        description: `When true, search date range is expanded one day before and after. Default: false`,
      },
    ],
  },
  {
    name: 'metricoolmcp_updatescheduledpost',
    description: `Update a scheduled post in Metricool. Requires the post id and uuid from getScheduledPosts.`,
    params: [
      {
        name: 'blogId',
        type: 'string',
        required: true,
        description: `Blog id of the Metricool brand account`,
      },
      { name: 'id', type: 'string', required: true, description: `Id of the post to update` },
      {
        name: 'info',
        type: 'string',
        required: true,
        description: `JSON-encoded post data with full original content plus modifications`,
      },
      { name: 'uuid', type: 'string', required: true, description: `Uuid of the post to update` },
      {
        name: 'mediaFiles',
        type: 'array',
        required: false,
        description: `Files from ChatGPT file picker. Each item has download_url (required), file_id (required), mime_type, file_name.`,
      },
    ],
  },
]
