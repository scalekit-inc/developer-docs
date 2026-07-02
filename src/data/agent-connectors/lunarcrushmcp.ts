import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'lunarcrushmcp_auth',
    description: `Check subscription and rate limit information for the current API key, or test an alternate API key.`,
    params: [
      { name: 'apiKey', type: 'string', required: false, description: `Optional alternate API key to use for this request.` },
    ],
  },
  {
    name: 'lunarcrushmcp_creator',
    description: `Get a summary snapshot of social metrics and insights for a specific social media account.`,
    params: [
      { name: 'network', type: 'string', required: true, description: `Social network to filter by.` },
      { name: 'screenName', type: 'string', required: true, description: `Screen name or unique ID of the social media account.` },
    ],
  },
  {
    name: 'lunarcrushmcp_creator_posts',
    description: `Get top social posts for a specific social media account by screen name or unique ID.`,
    params: [
      { name: 'network', type: 'string', required: true, description: `Social network to filter by.` },
      { name: 'screenName', type: 'string', required: true, description: `Screen name or unique ID of the social media account.` },
      { name: 'from_date', type: 'string', required: false, description: `Start date for the date range (YYYY-MM-DD). Use with to_date instead of interval.` },
      { name: 'interval', type: 'string', required: false, description: `Time window for the data. Defaults to 1w (hourly). Use 1m or longer for daily data.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of results to return.` },
      { name: 'to_date', type: 'string', required: false, description: `End date for the date range (YYYY-MM-DD). Leave blank to get posts up to now.` },
    ],
  },
  {
    name: 'lunarcrushmcp_creator_time_series',
    description: `Get historical time-series social metrics for a specific social media account.`,
    params: [
      { name: 'network', type: 'string', required: true, description: `Social network to filter by.` },
      { name: 'screenName', type: 'string', required: true, description: `Screen name or unique ID of the social media account.` },
      { name: 'interval', type: 'string', required: false, description: `Time window for the data. Defaults to 1w (hourly). Use 1m or longer for daily data.` },
      { name: 'metrics', type: 'array', required: false, description: `One or more metrics to include. Leave blank to return all metrics.` },
    ],
  },
  {
    name: 'lunarcrushmcp_cryptocurrencies',
    description: `Get a list of cryptocurrencies sorted by social metrics and optionally filtered by sector.`,
    params: [
      { name: 'limit', type: 'number', required: false, description: `Maximum number of results to return.` },
      { name: 'sector', type: 'string', required: false, description: `Filter results to a specific sector.` },
      { name: 'sort', type: 'string', required: false, description: `Sort results by this metric.` },
    ],
  },
  {
    name: 'lunarcrushmcp_fetch',
    description: `Fetch a LunarCrush context using a URL-friendly path such as /topic/bitcoin.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `URL-friendly path to the LunarCrush context (e.g. /topic/bitcoin or /creator/x/elonmusk).` },
    ],
  },
  {
    name: 'lunarcrushmcp_keyword_posts',
    description: `Get top social posts for a keyword or phrase over a given time period.`,
    params: [
      { name: 'keyword', type: 'string', required: true, description: `Keyword or phrase to search. Use lowercase a-z, 0-9, #, $, _ and spaces only.` },
      { name: 'from_date', type: 'string', required: false, description: `Start date for the date range (YYYY-MM-DD). Use with to_date instead of interval.` },
      { name: 'interval', type: 'string', required: false, description: `Time window for the data. Defaults to 1w (hourly). Use 1m or longer for daily data.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of results to return.` },
      { name: 'network', type: 'string', required: false, description: `Social network to filter by.` },
      { name: 'to_date', type: 'string', required: false, description: `End date for the date range (YYYY-MM-DD). Leave blank to get posts up to now.` },
    ],
  },
  {
    name: 'lunarcrushmcp_keyword_time_series',
    description: `Get historical time-series social metrics for a keyword or phrase.`,
    params: [
      { name: 'keyword', type: 'string', required: true, description: `Keyword or phrase to search. Use lowercase a-z, 0-9, #, $, _ and spaces only.` },
      { name: 'interval', type: 'string', required: false, description: `Time window for the data. Defaults to 1w (hourly). Use 1m or longer for daily data.` },
      { name: 'metrics', type: 'array', required: false, description: `One or more metrics to include. Leave blank to return all metrics.` },
      { name: 'network', type: 'string', required: false, description: `Social network to filter by.` },
    ],
  },
  {
    name: 'lunarcrushmcp_list',
    description: `Get a list of social topics in a category sorted and filtered by available metrics.`,
    params: [
      { name: 'category', type: 'string', required: false, description: `Filter topics by category. Leave blank for all categories.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of results to return.` },
      { name: 'sort', type: 'string', required: false, description: `Sort results by this metric.` },
    ],
  },
  {
    name: 'lunarcrushmcp_post',
    description: `Get details for a specific social post by network and post ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `URL-friendly path to the LunarCrush context (e.g. /topic/bitcoin or /creator/x/elonmusk).` },
      { name: 'network', type: 'string', required: true, description: `Social network to filter by.` },
    ],
  },
  {
    name: 'lunarcrushmcp_search',
    description: `Search for any keyword or account and return matching topics, creators, and assets.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query or phrase to find matching topics, creators, or assets.` },
    ],
  },
  {
    name: 'lunarcrushmcp_stocks',
    description: `Get a list of stocks sorted by social metrics and optionally filtered by sector.`,
    params: [
      { name: 'limit', type: 'number', required: false, description: `Maximum number of results to return.` },
      { name: 'sector', type: 'string', required: false, description: `Filter results to a specific sector.` },
      { name: 'sort', type: 'string', required: false, description: `Sort results by this metric.` },
    ],
  },
  {
    name: 'lunarcrushmcp_topic',
    description: `Get a summary snapshot of all social metrics and insights for any social topic, keyword, or asset.`,
    params: [
      { name: 'topic', type: 'string', required: true, description: `Topic slug (lowercase a-z, 0-9, #, $, _ and spaces). Example: bitcoin.` },
    ],
  },
  {
    name: 'lunarcrushmcp_topic_posts',
    description: `Get top social posts by interactions for a topic over a given time period.`,
    params: [
      { name: 'topic', type: 'string', required: true, description: `Topic slug (lowercase a-z, 0-9, #, $, _ and spaces). Example: bitcoin.` },
      { name: 'from_date', type: 'string', required: false, description: `Start date for the date range (YYYY-MM-DD). Use with to_date instead of interval.` },
      { name: 'interval', type: 'string', required: false, description: `Time window for the data. Defaults to 1w (hourly). Use 1m or longer for daily data.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of results to return.` },
      { name: 'network', type: 'string', required: false, description: `Social network to filter by.` },
      { name: 'to_date', type: 'string', required: false, description: `End date for the date range (YYYY-MM-DD). Leave blank to get posts up to now.` },
    ],
  },
  {
    name: 'lunarcrushmcp_topic_time_series',
    description: `Get historical time-series social metrics for a social topic, keyword, cryptocurrency, or stock.`,
    params: [
      { name: 'topic', type: 'string', required: true, description: `Topic slug (lowercase a-z, 0-9, #, $, _ and spaces). Example: bitcoin.` },
      { name: 'interval', type: 'string', required: false, description: `Time window for the data. Defaults to 1w (hourly). Use 1m or longer for daily data.` },
      { name: 'metrics', type: 'array', required: false, description: `One or more metrics to include. Leave blank to return all metrics.` },
    ],
  },
]
