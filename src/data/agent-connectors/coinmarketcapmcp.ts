import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'coinmarketcapmcp_execute_skill',
    description: `Run a specific platform skill by its unique name and return structured results. Use only when the skill's unique name is already known, typically from Find Skill results.`,
    params: [
      {
        name: 'unique_name',
        type: 'string',
        required: true,
        description: `Unique identifier of the skill to run, copied verbatim from Find Skill results (or a skill name already known).`,
      },
      {
        name: 'parameters',
        type: 'object',
        required: false,
        description: `Execution parameters matching the selected skill's input schema. Omit if the skill defines no parameters.`,
      },
    ],
  },
  {
    name: 'coinmarketcapmcp_find_skill',
    description: `Search the platform's skill library for hosted data and analysis services covering crypto markets and prediction/event markets. Returns ranked candidates with a description and input schema for each.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Describe the data or analysis needed, as a full sentence rather than keywords.`,
      },
      {
        name: 'top_k',
        type: 'integer',
        required: false,
        description: `Maximum number of candidates to return. Default is 5, range is 1-20.`,
      },
    ],
  },
  {
    name: 'coinmarketcapmcp_get_crypto_info',
    description: `Get static metadata for one or more cryptocurrencies, including logo, description, website, social links, and technical documentation URLs.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `One or more comma-separated CoinMarketCap cryptocurrency IDs.`,
      },
    ],
  },
  {
    name: 'coinmarketcapmcp_get_crypto_latest_news',
    description: `Get the latest news articles for a cryptocurrency. Returns up to 20 items with title, description, content, URL, and publication date.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `CoinMarketCap cryptocurrency ID (e.g. Bitcoin is 1).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of news articles to return. Default is 10, max is 20.`,
      },
    ],
  },
  {
    name: 'coinmarketcapmcp_get_crypto_marketcap_technical_analysis',
    description: `Get technical analysis indicators (SMA, EMA, MACD, RSI, Fibonacci levels, pivot points) for the total cryptocurrency market cap.`,
    params: [],
  },
  {
    name: 'coinmarketcapmcp_get_crypto_metrics',
    description: `Get on-chain metrics for a cryptocurrency, including address distribution by holding value and time, circulating supply distribution, and 30-day average transaction fee.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `CoinMarketCap cryptocurrency ID (e.g. Bitcoin is 1).`,
      },
    ],
  },
  {
    name: 'coinmarketcapmcp_get_crypto_quotes_latest',
    description: `Get the latest market quote for one or more cryptocurrencies, including price, percent changes across multiple timeframes, market cap, and 24h volume.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `One or more comma-separated CoinMarketCap cryptocurrency IDs.`,
      },
    ],
  },
  {
    name: 'coinmarketcapmcp_get_crypto_technical_analysis',
    description: `Get comprehensive technical analysis for a cryptocurrency, including moving averages (SMA, EMA), MACD, RSI, Fibonacci levels, and pivot points.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `CoinMarketCap cryptocurrency ID (e.g. Bitcoin is 1).`,
      },
      {
        name: 'includeFields',
        type: 'array',
        required: false,
        description: `List of field names to include in the response. If omitted, all fields are returned.`,
      },
    ],
  },
  {
    name: 'coinmarketcapmcp_get_global_crypto_derivatives_metrics',
    description: `Get global crypto derivatives data including open interest, funding rates, and BTC liquidation figures to assess leverage and squeeze risk.`,
    params: [],
  },
  {
    name: 'coinmarketcapmcp_get_global_metrics_latest',
    description: `Get the latest global cryptocurrency market snapshot, including total market cap, 24h volume, fear-and-greed score, altcoin season gauge, BTC/ETH dominance, leverage stats, and ETF flows.`,
    params: [],
  },
  {
    name: 'coinmarketcapmcp_get_upcoming_macro_events',
    description: `Get a list of upcoming macroeconomic events that could impact the crypto market, useful for anticipating price catalysts.`,
    params: [],
  },
  {
    name: 'coinmarketcapmcp_search_crypto_info',
    description: `Semantic search for cryptocurrency concepts including descriptions, definitions, FAQs, GitHub links, whitepapers, and websites. The prompt must be in English.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `CoinMarketCap cryptocurrency ID to scope the search to a specific coin.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Search query about the cryptocurrency in English.`,
      },
    ],
  },
  {
    name: 'coinmarketcapmcp_search_cryptos',
    description: `Search cryptocurrencies by name, symbol, or slug using fuzzy matching. Returns a ranked list with ID, name, symbol, slug, and rank.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Cryptocurrency name, symbol, or slug to search for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return. Default is 3, max is 5.`,
      },
    ],
  },
  {
    name: 'coinmarketcapmcp_trending_crypto_narratives',
    description: `Get a ranked list of the top trending cryptocurrency narratives, including market cap, trading volume, performance across timeframes, and the top associated tokens.`,
    params: [],
  },
]
