import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'eodhdmcp_capture_realtime_ws',
    description: `Capture real-time streaming market data via WebSocket for a fixed time window. Use when
the user needs live tick-by-tick prices, real-time trades, bid/ask quotes, or streaming
forex/crypto rates.

Connects to EODHD WebSocket feeds (us_trades, us_quotes, forex, crypto), subscribes to
specified symbols, collects messages for the given duration, then returns all captured
data at once. Unlike get_live_price_data (REST snapshot), this streams continuous updates.

For a single REST-based price snapshot, use get_live_price_data instead.
For historical tick-level trade data (not real-time), use get_us_tick_data.`,
    params: [
      {
        name: 'feed',
        type: 'string',
        required: true,
        description: `One of {'us_trades','us_quotes','forex','crypto'}.`,
      },
      {
        name: 'symbols',
        type: 'string',
        required: true,
        description: `Single or comma-separated symbols, or a list.
Returns:`,
      },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'connect_timeout', type: 'number', required: false, description: `No description.` },
      {
        name: 'duration_seconds',
        type: 'integer',
        required: false,
        description: `No description.`,
      },
      { name: 'max_data_bytes', type: 'integer', required: false, description: `No description.` },
      { name: 'max_messages', type: 'string', required: false, description: `No description.` },
      { name: 'ping_interval', type: 'number', required: false, description: `No description.` },
      { name: 'ping_timeout', type: 'number', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_asx_corporate_actions',
    description: `Get structured corporate action data for ASX (Australian Securities Exchange) listed
securities: dividends, splits, bonus issues, rights issues, buybacks, capital returns,
and share purchase plans. Data is sourced from the official ASX ReferencePoint (E34)
feed and refreshed daily. Coverage is limited to ASX-listed tickers (all use the .AU
suffix). Costs 1 API call per request.

Use when the user asks about Australian dividends and franking credits, ASX splits,
bonus/rights issues, buybacks, capital returns, or share purchase plans. For corporate
actions on other exchanges use get_historical_dividends / get_historical_splits.`,
    params: [
      {
        name: 'action_type',
        type: 'string',
        required: false,
        description: `Corporate action category. One of: 'dividends',
'splits', 'bonus-issues', 'rights-issues', 'buybacks', 'capital-returns',
'spp', 'other'. Omit to return all types.`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `'date_to' in YYYY-MM-DD (inclusive, on event date).`,
      },
      { name: 'fmt', type: 'string', required: false, description: `'json' only.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Page size, 1..1000. Default 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Zero-based pagination offset. Default 0.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `'date_from' in YYYY-MM-DD (inclusive, on event date).`,
      },
      {
        name: 'symbol',
        type: 'string',
        required: false,
        description: `Ticker with .AU suffix (e.g. 'PMV.AU'). Filters to a
single security.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_bulk_fundamentals',
    description: `Fetch fundamental data for all stocks on an exchange in bulk. Use when the user needs
financials, valuation, or earnings data for many companies at once -- screening,
comparing sectors, or building dashboards across an entire exchange.

Returns General, Highlights, Valuation, Technicals, SplitsDividends, Earnings (last 4
quarters + 4 years), and Financials for up to 500 stocks per call. Stocks only (no ETFs
or mutual funds). Costs 100 API calls per request. Requires Extended Fundamentals plan.

For a single ticker's full fundamentals, use get_fundamentals_data instead.
For macro country-level economic data, use get_macro_indicator.`,
    params: [
      {
        name: 'exchange',
        type: 'string',
        required: true,
        description: `Exchange code (e.g., 'NASDAQ', 'NYSE', 'US', 'LSE').`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
      { name: 'fmt', type: 'string', required: false, description: `'json' (default) or 'csv'.` },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Max symbols to return (default 500, max 500).`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Pagination start (default 0).`,
      },
      {
        name: 'symbols',
        type: 'string',
        required: false,
        description: `Comma-separated list of specific symbols to filter.`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `'1.2' for single-symbol-like output format.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_cboe_index_data',
    description: `Fetch detailed data for a specific CBOE index on a given date, including all constituent
components. Use when the user needs index close value, divisor, and full component
breakdown (symbols, weights, market caps, sectors) for a CBOE index.

Requires index_code, feed_type, and date. Returns index-level attributes plus an array
of components with ISIN, closing price, currency, shares, market cap, weighting, and
sector. Costs 10 API calls per request.

For listing all available CBOE indices, use get_cboe_indices_list first.`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `Trading date in YYYY-MM-DD format.`,
      },
      {
        name: 'feed_type',
        type: 'string',
        required: true,
        description: `Feed type (e.g., 'snapshot_official_closing').`,
      },
      {
        name: 'index_code',
        type: 'string',
        required: true,
        description: `CBOE index code (e.g., 'BDE30P', 'BAT20N').`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
      { name: 'fmt', type: 'string', required: false, description: `'json' only (default).` },
    ],
  },
  {
    name: 'eodhdmcp_get_cboe_indices_list',
    description: `List all available CBOE indices with their latest values. Use when the user wants to
browse CBOE European and regional index families, check which CBOE indices are available,
or find a CBOE index code.

Returns index codes, regions, latest close values, index divisors, and feed metadata
for ~38 CBOE indices. Paginated via 'links.next'. Costs 10 API calls per request.

For detailed component-level data on a specific CBOE index, use get_cboe_index_data.

Returns:
    Object with:
    - meta (object): total (int) â total number of indices
    - data (array): index objects, each with:
      - id (str): CBOE index identifier
      - type (str): always "cboe-index"
      - attributes (object):
        - region (str): geographic region (e.g. "Eurozone", "Germany")
        - index_code (str): CBOE index code
        - feed_type (str): feed type (e.g. "snapshot_official_closing")
        - date (str): latest date (YYYY-MM-DD)
        - index_close (float): latest closing value
        - index_divisor (float): index divisor
    - links (object): next (str|null) â URL for next page, null if last

Notes:
    - Pagination:
      If 'links.next' is not null, call that URL to get the next page.
    - Rate limits:
        * 10 API calls per request (CBOE dataset rule of thumb).

Examples:
    "List all CBOE indices" â get_cboe_indices_list()
    "What CBOE European indices are available?" â get_cboe_indices_list()`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_company_news',
    description: `Fetch financial news articles for a stock ticker or topic tag within a date range.
Returns full article objects with title, content, URL, date, and related tickers.
Use when the user asks for news headlines, recent articles, or press coverage about a company or sector.
For aggregated sentiment scores derived from news, use get_sentiment_data instead.
For keyword frequency analysis in news, use get_news_word_weights instead.`,
    params: [
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override; env token used if omitted.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `YYYY-MM-DD. Mapped to 'to'.`,
      },
      {
        name: 'fmt',
        type: 'string',
        required: false,
        description: `'json' or 'xml' (default 'json').`,
      },
      { name: 'limit', type: 'integer', required: false, description: `1..1000 (default 50).` },
      { name: 'offset', type: 'integer', required: false, description: `>= 0 (default 0).` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `YYYY-MM-DD. Mapped to 'from'.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: false,
        description: `Topic tag (e.g., 'technology'). Mapped to 't'.`,
      },
      {
        name: 'ticker',
        type: 'string',
        required: false,
        description: `SYMBOL.EXCHANGE_ID (e.g., 'AAPL.US'). Mapped to 's'.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_earnings_trends',
    description: `Get earnings trend data including EPS/revenue estimates, analyst revisions, and growth projections for specific stocks.
Returns quarterly and annual consensus estimates, number of analysts, and revision history.
Requires explicit symbol(s). Each request consumes ~10 API calls.
Use when the user asks about earnings expectations, analyst estimate changes, or EPS growth trends.
For earnings report dates and calendar, use get_upcoming_earnings instead.

Returns:
    Array of trend records, each with:
    - code (str): ticker symbol
    - date (str): report date
    - period (str): fiscal period (e.g. '+1y', '0q')
    - growth (float|null): expected growth rate
    - earningsEstimate (object): avg, low, high, yearAgoEps, numberOfAnalysts, growth
    - revenueEstimate (object): avg, low, high, yearAgoRevenue, numberOfAnalysts, growth
    - epsTrend (object): current, 7daysAgo, 30daysAgo, 60daysAgo, 90daysAgo
    - epsRevisions (object): upLast7days, upLast30days, downLast7days, downLast30days

Examples:
    "Apple earnings trend" â symbols="AAPL.US"
    "Compare Tesla and Nvidia earnings trends" â symbols="TSLA.US,NVDA.US"


Demo:
    To manual data structure, use the manual API key "demo" (documentation: https://eodhd.com/financial-apis/).
    The "demo" key works for AAPL.US, MSFT.US, TSLA.US (stocks), VTI.US (ETF), SWPPX.US (mutual funds),
    EURUSD.FOREX, and BTC-USD.CC in all relevant APIs.`,
    params: [
      { name: 'symbols', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_economic_events',
    description: `Fetch macroeconomic calendar events such as GDP, CPI, employment, and interest rate releases.
Returns scheduled and past economic indicators with actual, estimate, and previous values.
Covers global economies; filter by country (ISO-2), date range, comparison period (mom/qoq/yoy), and event type.
Use when the user asks about economic calendar, macro releases, or upcoming government data publications.
This tool covers macro events only -- for company-level earnings dates, use get_upcoming_earnings.

Returns:
    Array of events, each with:
    - type (str): event category
    - country (str): ISO-3166 alpha-2 country code
    - date (str): event datetime
    - actual (float|null): actual value
    - previous (float|null): previous period value
    - estimate (float|null): consensus estimate
    - change (float|null): absolute change
    - changePercentage (float|null): percentage change
    - event (str): event name/description

Examples:
    "US economic events this week" â country="US", start_date="2026-03-02", end_date="2026-03-06"
    "German GDP year-over-year" â country="DE", comparison="yoy", type="GDP"
    "All events in March 2026, first 200" â start_date="2026-03-01", end_date="2026-03-31", limit=200


Demo:
    To manual data structure, use the manual API key "demo" (documentation: https://eodhd.com/financial-apis/).
    The "demo" key works for AAPL.US, MSFT.US, TSLA.US (stocks), VTI.US (ETF), SWPPX.US (mutual funds),
    EURUSD.FOREX, and BTC-USD.CC in all relevant APIs.`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'comparison', type: 'string', required: false, description: `No description.` },
      { name: 'country', type: 'string', required: false, description: `No description.` },
      { name: 'end_date', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
      { name: 'offset', type: 'integer', required: false, description: `No description.` },
      { name: 'start_date', type: 'string', required: false, description: `No description.` },
      { name: 'type', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_exchange_details',
    description: `Retrieve detailed metadata for a single exchange: trading hours, timezone, open/closed
status, holidays, and ticker counts. Use when the user asks about exchange schedules,
market holidays, or whether an exchange is currently open.

Returns timezone, isOpen flag, trading hours (open/close with UTC equivalents, working
days, lunch breaks), exchange holidays (bank and official, ~6 months window), and
ticker statistics (active, updated today, previous day).

For the list of all exchanges, use get_exchanges_list.
For tickers on an exchange, use get_exchange_tickers.`,
    params: [
      {
        name: 'exchange_code',
        type: 'string',
        required: true,
        description: `Exchange code (e.g., 'US', 'LSE', 'XETRA').`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override (env token otherwise).`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `YYYY-MM-DD; filter holidays up to this date.`,
      },
      { name: 'fmt', type: 'string', required: false, description: `'json' only (default).` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `YYYY-MM-DD; filter holidays from this date.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_exchange_tickers',
    description: `List all tickers (symbols) available on a given exchange. Use when the user needs to
enumerate stocks, ETFs, or funds on an exchange, or check if a specific instrument
is listed there.

Covers common stocks, preferred stocks, ETFs, and funds. By default returns tickers
active in the last month. Supports delisted tickers via the delisted flag. For US
markets, use 'US' (unified) or specific venues like NYSE, NASDAQ.

For the list of all exchanges, use get_exchanges_list.
For exchange metadata and trading hours, use get_exchange_details.

Returns:
    Array of ticker objects, each with:
    - Code (str): ticker symbol
    - Name (str): instrument name
    - Country (str): country of listing
    - Exchange (str): exchange code
    - Currency (str): trading currency
    - Type (str): instrument type (e.g. "Common Stock", "ETF")
    - Isin (str|null): ISIN code, if available

Examples:
    "All tickers on London Stock Exchange" â get_exchange_tickers(exchange_code="LSE")
    "Show me delisted US stocks" â get_exchange_tickers(exchange_code="US", delisted=True)
    "ETFs trading on XETRA" â get_exchange_tickers(exchange_code="XETRA", type="etf")`,
    params: [
      { name: 'exchange_code', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'delisted', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'type', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_exchanges_list',
    description: `List all available stock exchanges worldwide. Use when the user asks which exchanges
are supported, needs exchange codes, or wants to browse markets by country.

Covers 60+ global exchanges. Returns Name, Code, OperatingMIC, Country, Currency,
and ISO country codes for each exchange.

For tickers listed on a specific exchange, use get_exchange_tickers.
For trading hours, holidays, and metadata of one exchange, use get_exchange_details.

Returns:
    Array of exchange objects, each with:
    - Name (str): exchange full name
    - Code (str): exchange code (e.g. "US", "LSE")
    - OperatingMIC (str): ISO 10383 operating MIC
    - Country (str): country name
    - Currency (str): primary currency code
    - CountryISO2 (str): ISO 3166-1 alpha-2 country code
    - CountryISO3 (str): ISO 3166-1 alpha-3 country code

Examples:
    "List all available exchanges" â get_exchanges_list()
    "What stock exchanges does EODHD support?" â get_exchanges_list()`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_fundamentals_data',
    description: `Retrieve fundamental data for a single stock, ETF, mutual fund, index, or crypto.
Auto-detects asset type. For stocks: returns financials (income statement, balance sheet, cash flow),
earnings, valuation, analyst ratings, holders, insider transactions, and outstanding shares.
For ETFs: returns holdings, asset allocation, sector/country weights. For mutual funds: fund-specific data.
Supports date-range pruning to limit financials and earnings to a specific window.
For bulk fundamentals across many tickers at once, use get_bulk_fundamentals instead.
For price data, use get_historical_stock_prices or get_live_price_data instead.

Returns:
    Nested object; structure depends on asset Type:

    Common Stock â top-level keys:
    - General: name, exchange, currency, sector, industry, description, etc.
    - Highlights: marketCap, EBITDA, PE, EPS, dividendYield, etc.
    - Valuation: trailing/forward PE, PEG, price-to-sales/book, EV ratios
    - SharesStats: shares outstanding, float, percent insiders/institutions
    - Technicals: beta, 52wHigh/Low, moving averages, short ratio
    - SplitsDividends: forward/trailing dividend rate & yield, payout ratio, split history
    - AnalystRatings: target price, strong buy/buy/hold/sell/strong sell counts
    - Holders: top institutional & fund holders with shares/weight
    - InsiderTransactions: array of insider trades (date, name, shares, value)
    - outstandingShares: quarterly & annual share counts by date
    - Earnings: History (actual/estimate EPS), Trend, Annual
    - Financials: Balance_Sheet, Cash_Flow, Income_Statement (quarterly & yearly)

    ETF â top-level keys:
    - General, Technicals
    - ETF_Data: Holdings (top N positions), Sector_Weights, World_Regions,
      Top_10_Holdings, Asset_Allocation, performance, fees

    Mutual Fund â top-level keys:
    - General
    - MutualFund_Data: fund family, category, NAV, yield, holdings, sector weights

    Index â General only (pass extra_params={'historical': 1} for components).

Examples:
    "Apple fundamentals" â ticker="AAPL.US"
    "Tesla earnings and valuation for 2025" â ticker="TSLA.US", sections=["Earnings", "Valuation"], from_date="2025-01-01", to_date="2025-12-31"
    "Vanguard Total Stock Market ETF info" â ticker="VTI.US", sections=["General", "ETF_Data"]


Demo:
    To manual data structure, use the manual API key "demo" (documentation: https://eodhd.com/financial-apis/).
    The "demo" key works for AAPL.US, MSFT.US, TSLA.US (stocks), VTI.US (ETF), SWPPX.US (mutual funds),
    EURUSD.FOREX, and BTC-USD.CC in all relevant APIs.`,
    params: [
      { name: 'ticker', type: 'string', required: true, description: `No description.` },
      { name: 'api_key', type: 'string', required: false, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'extra_params', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'from_date', type: 'string', required: false, description: `No description.` },
      {
        name: 'include_financials',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
      { name: 'sections', type: 'string', required: false, description: `No description.` },
      { name: 'to_date', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_historical_commodity_prices',
    description: `Get historical price data for a commodity series (energy, metals, agriculturals, and
commodity indices) sourced from FRED (Federal Reserve Economic Data). Series go back
decades for major energy commodities. Costs 5 API calls per request.

Use when the user asks for the price history of oil, gas, metals, or agricultural
commodities, or a broad commodity index â e.g. WTI/Brent crude, natural gas, gasoline,
diesel, copper, aluminum, wheat, corn, sugar, coffee, uranium, coal, or ALL_COMMODITIES.`,
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        description: `Commodity code (e.g. 'WTI', 'BRENT', 'URANIUM') or 'ALL_COMMODITIES'.
Case-insensitive; normalized to upper case.`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
      {
        name: 'interval',
        type: 'string',
        required: false,
        description: `Data frequency â 'daily', 'weekly', 'monthly' (default),
'quarterly', or 'annual'. Daily data is only available for energy commodities.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_historical_dividends',
    description: `Get historical dividend records for a stock, ETF, or fund ticker.
Returns ex-dividend dates, dividend amounts, and for many major tickers also declaration,
record, and payment dates. Free access may be limited to roughly 1 year of history,
while paid plans can return deeper history.
Use when the user asks about dividend history, ex-dividend dates, payout trends,
or dividend event details for a specific ticker.
For upcoming dividend calendar events across symbols or dates, use get_upcoming_dividends.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `Symbol in SYMBOL.EXCHANGE format, e.g. 'AAPL.US'.`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `'to' date in YYYY-MM-DD.`,
      },
      { name: 'fmt', type: 'string', required: false, description: `'json' only.` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `'from' date in YYYY-MM-DD.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_historical_market_cap',
    description: `Get historical market capitalization data for a US stock over time.
Returns weekly market cap data points (from 2020 onward) for NYSE/NASDAQ tickers.
Filter by date range. Each request consumes 10 API calls.
Use when the user asks about market cap history, company valuation over time, or market cap trends.
This is the only tool for historical market cap -- do not confuse with fundamental data or price history.

Returns:
    Array of weekly data points, each with:
    - date (str): observation date YYYY-MM-DD
    - value (float): market capitalization in USD

Examples:
    "Apple market cap history in 2025" â ticker="AAPL.US", start_date="2025-01-01", end_date="2025-12-31"
    "Microsoft market cap last 6 months" â ticker="MSFT.US", start_date="2025-09-06", end_date="2026-03-06"
    "Google market cap since 2023" â ticker="GOOG.US", start_date="2023-01-01"

Demo:
    To manual data structure, use the manual API key "demo" (documentation: https://eodhd.com/financial-apis/).
    The "demo" key works for AAPL.US, MSFT.US, TSLA.US (stocks), VTI.US (ETF), SWPPX.US (mutual funds),
    EURUSD.FOREX, and BTC-USD.CC in all relevant APIs.`,
    params: [
      { name: 'ticker', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'end_date', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'start_date', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_historical_splits',
    description: `Get historical stock split events for a specific ticker.
Returns split dates and split ratios such as 2-for-1, 4-for-1, or reverse split ratios.
Use when the user asks about historical splits, reverse splits, or corporate action history
for a specific stock.
For upcoming split calendar events across symbols or dates, use get_upcoming_splits.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `Symbol in SYMBOL.EXCHANGE format, e.g. 'AAPL.US'.`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `'to' date in YYYY-MM-DD.`,
      },
      { name: 'fmt', type: 'string', required: false, description: `'json' only.` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `'from' date in YYYY-MM-DD.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_historical_stock_prices',
    description: `Get historical daily, weekly, or monthly OHLCV price data for any stock, ETF, index, or crypto.
Covers open, high, low, close, adjusted close, and volume for a date range.
Use for price history, charting, backtesting, and performance analysis.
For intraday candles (1min-1h), use get_intraday_historical_data instead.
For current/live prices, use get_live_price_data instead.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `Symbol in SYMBOL.EXCHANGE format, e.g. 'AAPL.US'.`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Override API token for this call. If not provided, env token is used.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `'to' date in YYYY-MM-DD. If omitted, API returns up to most recent.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `e.g., 'last_close', 'last_volume' (works with fmt=json; returns a single value).`,
      },
      {
        name: 'fmt',
        type: 'string',
        required: false,
        description: `'json' or 'csv'. Default 'json'. (API default is csv.)`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `'a' (ascending) or 'd' (descending). Default 'a'.`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `'d' (daily), 'w' (weekly), 'm' (monthly). Default 'd'.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `'from' date in YYYY-MM-DD. If omitted, API returns full history (plan limits apply).`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_insider_transactions',
    description: `Fetch SEC Form 4 insider trading transactions -- purchases and sales by company officers, directors, and major shareholders.
Returns transaction date, insider name, title, transaction type (P=Purchase, S=Sale), shares, and value.
Filter by ticker symbol and/or date range. Each request consumes 10 API calls.
Use when the user asks about insider buying/selling activity, executive stock transactions, or Form 4 filings.`,
    params: [
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token; env token used if omitted.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `'to'   in YYYY-MM-DD. Defaults to today by API if omitted.`,
      },
      {
        name: 'fmt',
        type: 'string',
        required: false,
        description: `Only 'json' is supported by this tool.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of entries to return, 1..1000. Default 100.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `'from' in YYYY-MM-DD. Defaults to ~1 year ago by API if omitted.`,
      },
      {
        name: 'symbol',
        type: 'string',
        required: false,
        description: `Filter by ticker (API param 'code'), e.g. 'AAPL' or 'AAPL.US'.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_insider_transactions_form4',
    description: `Get SEC Form 4 insider-trading filings for a US-listed issuer, sourced directly from
SEC EDGAR. This is the richer V2 ("SEC Form 4") endpoint: each filing exposes
non-derivative transactions (common stock), derivative transactions (options, RSUs,
warrants), and the footnotes referenced from each row, with the full SEC transaction
code set and reporting-owner relationship flags. Costs 10 API calls per request.

Use when the user asks about insider buying/selling, executive stock transactions, or
Form 4 filings for a US company and wants full per-filing detail. For a flat, simpler
list across symbols/dates use the legacy get_insider_transactions tool instead.`,
    params: [
      {
        name: 'symbol',
        type: 'string',
        required: true,
        description: `US ticker, e.g. 'AAPL' or 'AAPL.US'. Case-insensitive; the .US suffix
is optional. Form 4 is filed by US-listed issuers only â non-US symbols 404.`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Page size, 1..100. Default 20.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Zero-based pagination offset. Default 0.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_intraday_historical_data',
    description: `Get historical intraday OHLCV candles at 1-minute, 5-minute, or 1-hour intervals.
Use for intraday price analysis, short-term patterns, and high-resolution charting.
Accepts date strings or Unix timestamps for the time range.
Max range depends on interval: 1m=120 days, 5m=600 days, 1h=7200 days.
For daily/weekly/monthly end-of-day bars, use get_historical_stock_prices instead.
For current live price, use get_live_price_data instead.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `SYMBOL.EXCHANGE_ID, e.g. 'AAPL.US'.`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override; env token used if omitted.`,
      },
      {
        name: 'fmt',
        type: 'string',
        required: false,
        description: `'json' or 'csv'. Default 'json'.`,
      },
      {
        name: 'from_timestamp',
        type: 'string',
        required: false,
        description: `Start as Unix seconds OR a date string
(auto-detected). Examples: 1704067200, '2024-01-01', '01-01-24', '01/01/2024',
'2024-01-01T15:30:00Z', 'Jan 1, 2024'.`,
      },
      {
        name: 'interval',
        type: 'string',
        required: false,
        description: `One of {'1m','5m','1h'}. Default '5m'.`,
      },
      {
        name: 'split_dt',
        type: 'string',
        required: false,
        description: `If True, adds 'split-dt=1' to split date/time fields.`,
      },
      {
        name: 'to_timestamp',
        type: 'string',
        required: false,
        description: `End as Unix seconds OR a date string (auto-detected).`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_live_price_data',
    description: `Get the current (delayed ~15-20 min) price snapshot for one or more tickers.
Returns last trade price, change, change percent, volume, high, low, open, previous close, and timestamp.
Supports stocks, ETFs, indices, forex, and crypto. Batch up to 20 symbols in one call.
For US stocks with bid/ask, 52w range, and market cap, use get_us_live_extended_quotes instead.
For historical daily/weekly/monthly OHLCV, use get_historical_stock_prices instead.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `Primary symbol in SYMBOL.EXCHANGE format (e.g., 'AAPL.US').
          Required and placed in the path, per API spec.`,
      },
      {
        name: 'additional_symbols',
        type: 'string',
        required: false,
        description: `Extra symbols for 's=' query param,
          comma-separated by the tool (e.g., ['VTI', 'EUR.FOREX']).
          Docs recommend <= 15â20 total.`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override. If omitted, env token is used.`,
      },
      {
        name: 'fmt',
        type: 'string',
        required: false,
        description: `'json' or 'csv'. Defaults to 'json' for easier client handling.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_macro_indicator',
    description: `Fetch macroeconomic indicators for a country over time. Use when the user asks about
country-level economic data: GDP, inflation, CPI, unemployment, population, trade
balance, debt-to-GDP, life expectancy, and 30+ other World Bank-style indicators.

Returns a historical time series for one indicator in one country. Country is specified
by ISO-3 alpha code (e.g., USA, DEU, FRA). Defaults to GDP if no indicator specified.

This is for country-level macro data only. For company fundamentals, use
get_fundamentals_data (single ticker) or get_bulk_fundamentals (entire exchange).`,
    params: [
      {
        name: 'country',
        type: 'string',
        required: true,
        description: `Alpha-3 ISO country code (e.g., 'USA', 'FRA', 'DEU').`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
      {
        name: 'fmt',
        type: 'string',
        required: false,
        description: `'json' or 'csv'. Default 'json'.`,
      },
      {
        name: 'indicator',
        type: 'string',
        required: false,
        description: `One of documented indicators. Defaults to 'gdp_current_usd'.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_illio_market_insights_best_worst',
    description: `[Illio] Get the largest single-day gains and losses for index constituents.
Covers S&P 500, Dow Jones, and Nasdaq-100. Returns best and worst 1-day moves
with dates, magnitudes, and affected instruments. Consumes 10 API calls per request.
For overall constituent performance, use get_mp_illio_market_insights_performance.
For volatility trends, use get_mp_illio_market_insights_volatility.


Returns:
  JSON object with largest single-day moves chapter data:
    - chapter (str): chapter identifier, e.g. "best-and-worst"
    - id (str): index identifier, e.g. "NDX"
    - data (object): contains best/worst day arrays, each entry with:
        - ticker (str): instrument symbol
        - name (str): instrument name
        - date (str): date of the move
        - change (float): percentage change on that day
    - metadata (object|null): date range, benchmark info

Limits (Marketplace rules):
  - 1 request = 10 API calls
  - 100k calls / 24h, 1k requests / minute
  - Output is JSON

Examples:
    "S&P 500 best and worst days" â id="SnP500"
    "Nasdaq-100 largest single-day moves" â id="NDX"`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_illio_market_insights_beta_bands',
    description: `[Illio] Analyze beta sensitivity distribution of index constituents relative to the market.
Covers S&P 500, Dow Jones, and Nasdaq-100. Returns beta bracket distribution, instruments with
highest/lowest beta, and how constituents react to overall market moves. Consumes 10 API calls per request.
For risk-return tradeoff analysis, use get_mp_illio_market_insights_risk_return.
For volatility trends, use get_mp_illio_market_insights_volatility.

Returns:
  JSON object with beta bands chapter data:
    - chapter (str): chapter identifier, e.g. "beta-bands"
    - id (str): index identifier, e.g. "NDX"
    - data (object): beta distribution analysis, including:
        - bands (array): beta bracket ranges with instrument counts/percentages
        - highest (array): instruments with highest beta (most market-sensitive)
        - lowest (array): instruments with lowest beta (least market-sensitive)
        Each instrument entry includes: ticker, name, beta (float)
    - metadata (object|null): date range, calculation parameters

Limits (Marketplace rules):
  - 1 request = 10 API calls
  - 100k calls / 24h, 1k requests / minute
  - Output is JSON`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_illio_market_insights_largest_volatility',
    description: `[Illio] Identify constituents with the largest year-over-year volatility changes.
Covers S&P 500, Dow Jones, and Nasdaq-100. Returns top instruments by 100-day volatility
increase and decrease, plus the overall share of instruments with rising vs falling volatility.
Consumes 10 API calls per request.
For current volatility bands and daily moves, use get_mp_illio_market_insights_volatility.
For beta-based market sensitivity, use get_mp_illio_market_insights_beta_bands.

Returns:
  JSON object with largest volatility change chapter data:
    - chapter (str): chapter identifier, e.g. "volume"
    - id (str): index identifier, e.g. "NDX"
    - data (object): volatility change analysis, including:
        - summary (object): share of instruments with higher vs lower volatility
        - increasers (array): top instruments by volatility increase, each with
            ticker, name, volatilityChange (float), currentVolatility (float)
        - decreasers (array): top instruments by volatility decrease, same fields
    - metadata (object|null): date range, lookback period

Limits (Marketplace rules):
  - 1 request = 10 API calls
  - 100k calls / 24h, 1k requests / minute
  - Output is JSON`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_illio_market_insights_performance',
    description: `[Illio] Analyze market-level performance of index constituents versus the overall market.
Covers S&P 500, Dow Jones, and Nasdaq-100. Returns constituent performance comparison,
sector attribution, and relative performance data. Consumes 10 API calls per request.
For portfolio-level performance attributes, use mp_illio_performance_insights.
For best/worst single-day moves, use get_mp_illio_market_insights_best_worst.


Returns:
  JSON object with performance-vs-market chapter data:
    - chapter (str): chapter identifier, e.g. "performance"
    - id (str): index identifier, e.g. "NDX"
    - data (array): time-series or tabular entries with instrument-level
      performance metrics vs the overall market (returns, relative strength)
    - metadata (object|null): chart config, date range, benchmark info

Limits (Marketplace rules):
  - 1 request = 10 API calls
  - 100k calls / 24h, 1k requests / minute
  - Output is JSON

Examples:
    "S&P 500 performance vs market" â id="SnP500"
    "Nasdaq-100 market performance chapter" â id="NDX"`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_illio_market_insights_risk_return',
    description: `[Illio] Analyze market-level risk-return tradeoff for index constituents.
Covers S&P 500, Dow Jones, and Nasdaq-100. Returns risk-adjusted return metrics,
Sharpe-style analysis, and constituent risk-return scatter data. Consumes 10 API calls per request.
For portfolio-level risk attributes, use mp_illio_risk_insights.
For beta sensitivity analysis, use get_mp_illio_market_insights_beta_bands.


Returns:
  JSON object with risk-return insight chapter data:
    - chapter (str): chapter identifier, e.g. "risk"
    - id (str): index identifier, e.g. "NDX"
    - data (object): risk-return analysis, including:
        - scatter (array): instruments plotted by risk vs return
        - quadrants (object): classification into high/low risk-return quadrants
        - summary (object|null): aggregate risk-return statistics
    - metadata (object|null): date range, benchmark info

Limits (Marketplace rules):
  - 1 request = 10 API calls
  - 100k calls / 24h, 1k requests / minute
  - Output is JSON

Examples:
    "S&P 500 risk-return insight" â id="SnP500"
    "Nasdaq-100 risk vs return" â id="NDX"`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_illio_market_insights_volatility',
    description: `[Illio] Get volatility bands and daily move distribution for index constituents.
Covers S&P 500, Dow Jones, and Nasdaq-100. Returns volatility levels, daily move
ranges, and constituent volatility distribution versus market. Consumes 10 API calls per request.
For largest year-over-year volatility changes, use get_mp_illio_market_insights_largest_volatility.
For best/worst single-day moves, use get_mp_illio_market_insights_best_worst.


Returns:
  JSON object with volatility bands chapter data:
    - chapter (str): chapter identifier, e.g. "volatility"
    - id (str): index identifier, e.g. "NDX"
    - data (object): volatility and day-move distributions, including:
        - bands (array): volatility band buckets with instrument counts
        - instruments (array): per-instrument volatility metrics
        - dailyMoves (object|null): distribution of daily price changes
    - metadata (object|null): date range, calculation parameters

Limits (Marketplace rules):
  - 1 request = 10 API calls
  - 100k calls / 24h, 1k requests / minute
  - Output is JSON

Examples:
    "Dow Jones volatility bands" â id="DJI"
    "Nasdaq-100 volatility and day moves" â id="NDX"`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_investverte_esg_list_companies',
    description: `[InvestVerte] List all companies available in the ESG dataset.
Returns an array of symbol/name pairs for every company with ESG coverage.
Use as a reference lookup before calling get_mp_investverte_esg_view_company for detailed ESG scores.
Consumes 10 API calls per request.
For country or sector reference lists, use get_mp_investverte_esg_list_countries or list_sectors.


Returns:
    A JSON-formatted string containing an array of objects:
    [
      {"symbol": "000001.SZ", "name": "Ping An Bank Co., Ltd."},
      {"symbol": "000002.SZ", "name": "China Vanke Co., Ltd."},
      ...
    ]

Notes:
    - This endpoint lists all companies covered by the Investverte ESG dataset.
    - Rate limits (Marketplace product):
        * 100,000 API calls per 24 hours
        * 1,000 API requests per minute
        * 1 API request = 10 API calls

Examples:
    "List all ESG companies" â (no params needed)
    "Which companies have ESG data?" â (no params needed)`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_investverte_esg_list_countries',
    description: `[InvestVerte] List all countries available in the ESG dataset.
Returns an array of country_code/country_descr pairs for every country with ESG coverage.
Use as a reference lookup before calling get_mp_investverte_esg_view_country for detailed ESG scores.
Consumes 10 API calls per request.
For company or sector reference lists, use get_mp_investverte_esg_list_companies or list_sectors.


Returns:
    A JSON-formatted string containing an array of objects:
    [
      {"country_code": "AD", "country_descr": "Andorra"},
      {"country_code": "AE", "country_descr": "United Arab Emirates"},
      ...
    ]

Notes:
    - This endpoint lists all countries covered by the Investverte ESG dataset.
    - Rate limits (Marketplace product):
        * 100,000 API calls per 24 hours
        * 1,000 API requests per minute
        * 1 API request = 10 API calls

Examples:
    "List all ESG countries" â (no params needed)
    "Which countries have ESG ratings?" â (no params needed)`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_investverte_esg_list_sectors',
    description: `[InvestVerte] List all sectors available in the ESG dataset.
Returns an array of sector names with ESG coverage (e.g., "Airlines", "Aerospace & Defense").
Use as a reference lookup before calling get_mp_investverte_esg_view_sector for detailed ESG data.
Consumes 10 API calls per request.
For company or country reference lists, use get_mp_investverte_esg_list_companies or list_countries.


Returns:
    A JSON-formatted string containing an array of objects:
    [
      {"sector": "Aerospace & Defense"},
      {"sector": "Airlines"},
      ...
    ]

Notes:
    - This endpoint lists all sectors covered by the Investverte ESG dataset.
    - Rate limits (Marketplace product):
        * 100,000 API calls per 24 hours
        * 1,000 API requests per minute
        * 1 API request = 10 API calls

Examples:
    "List all ESG sectors" â (no params needed)
    "What sectors have ESG coverage?" â (no params needed)`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_investverte_esg_view_company',
    description: `[InvestVerte] Get detailed ESG scores (E, S, G, and composite) for a specific company by symbol.
Returns Environmental, Social, Governance, and combined ESG scores broken down by year and
frequency (FY, Q1-Q4). Optionally filter by year and frequency. Consumes 10 API calls per request.
Use get_mp_investverte_esg_list_companies first to discover available symbols.
For country-level ESG, use get_mp_investverte_esg_view_country.
For sector-level ESG, use get_mp_investverte_esg_view_sector.


Returns:
    A JSON-formatted string with an array of objects, e.g.:

    [
      {
        "e": 58.97,
        "s": 68.66,
        "g": 65.21,
        "esg": 64.09,
        "year": 2021,
        "frequency": "FY"
      },
      ...
    ]

Notes:
    - Year and frequency are optional; when omitted, all available
      years/frequencies for the symbol are returned.
    - Rate limits (Marketplace product):
        * 100,000 API calls per 24 hours
        * 1,000 API requests per minute
        * 1 API request = 10 API calls

Examples:
    - /api/mp/investverte/esg/AAPL?year=2021&frequency=FY
    - /api/mp/investverte/esg/000039.SZ`,
    params: [
      { name: 'symbol', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'frequency', type: 'string', required: false, description: `No description.` },
      { name: 'year', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_investverte_esg_view_country',
    description: `[InvestVerte] Get detailed ESG ratings for a specific country by country code.
Returns mean and median ESG scores broken down by year and frequency (FY, Q1-Q4).
Optionally filter by year and frequency. Consumes 10 API calls per request.
Use get_mp_investverte_esg_list_countries first to discover available country codes.
For company-level ESG, use get_mp_investverte_esg_view_company.
For sector-level ESG, use get_mp_investverte_esg_view_sector.


Returns:
    A JSON-formatted string with an array of objects, e.g.:

    [
      {
        "symbol": "US",
        "name": "United States of America",
        "mean": 63.2928294103373,
        "median": 63.32,
        "year": 2021,
        "frequency": "FY"
      },
      ...
    ]

Notes:
    - Year and frequency are optional; when omitted, all available
      years/frequencies for the country are returned.
    - Rate limits (Marketplace product):
        * 100,000 API calls per 24 hours
        * 1,000 API requests per minute
        * 1 API request = 10 API calls

Examples:
    - /api/mp/investverte/country/US?year=2021&frequency=FY
    - /api/mp/investverte/country/US`,
    params: [
      { name: 'symbol', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'frequency', type: 'string', required: false, description: `No description.` },
      { name: 'year', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_investverte_esg_view_sector',
    description: `[InvestVerte] Get detailed ESG time-series data for a specific sector by name.
Returns ESG values mapped by industry/sub-sector across all available year-frequency
combinations (e.g., "2015-FY", "2021-Q3"). Consumes 10 API calls per request.
Use get_mp_investverte_esg_list_sectors first to discover available sector names.
For company-level ESG, use get_mp_investverte_esg_view_company.
For country-level ESG, use get_mp_investverte_esg_view_country.


Returns:
    A JSON-formatted string with a sector ESG object:
    {
      "find": true,
      "industry": {
        "Airlines": [<ESG values per year>],
        "Transportation": [<ESG values per year>]
      },
      "years": ["2015-FY", "2015-Q1", ...]
    }
    Fields:
      - find (bool): whether the sector was found
      - industry (object): map of industry/sector names to arrays of ESG
        values aligned with the "years" axis
      - years (array of str): time axis labels in "YYYY-frequency" format

Notes:
    - The 'industry' section contains sector/industry names mapped
      to ESG values over the 'years' axis.
    - Rate limits (Marketplace product):
        * 100,000 API calls per 24 hours
        * 1,000 API requests per minute
        * 1 API request = 10 API calls

Examples:
    "Airlines sector ESG data" â symbol="Airlines"
    "Aerospace & Defense ESG ratings" â symbol="Aerospace & Defense"`,
    params: [
      { name: 'symbol', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_praams_bank_balance_sheet_by_isin',
    description: `[PRAAMS] Retrieve bank-specific balance sheet time series by ISIN code.
Returns annual and quarterly data: loans, cash, deposits, securities REPO, investment portfolio,
debt, total assets/equity, interest-earning assets, and interest-bearing liabilities.
Tailored for banking sector analysis. Consumes 10 API calls per request.
For lookup by ticker, use get_mp_praams_bank_balance_sheet_by_ticker.
For bank income statement data, use get_mp_praams_bank_income_statement_by_isin.

Returns:
  JSON object with Praams envelope:
    - success (bool): whether the request succeeded
    - items (array): time-series of balance sheet entries, each containing:
        - period (str): reporting period (e.g. "2023-Q4", "2023-FY")
        - loansGross (float|null): gross loans
        - loansProvisions (float|null): loan loss provisions
        - loansNet (float|null): net loans
        - cashEquivalents (float|null): cash & equivalents
        - depositsWithBanks (float|null): deposits with other banks
        - securitiesRepoAssets (float|null): securities REPO assets
        - securitiesRepoLiabilities (float|null): securities REPO liabilities
        - investmentPortfolio (float|null): investment portfolio
        - totalAssets (float|null): total assets
        - totalEquity (float|null): total equity
        - shortTermDebt (float|null): short-term debt
        - longTermDebt (float|null): long-term debt
        - interestEarningAssets (float|null): interest-earning assets
        - interestBearingLiabilities (float|null): interest-bearing liabilities
        - Additional bank-specific balance sheet line items
    - message (str): status message
    - errors (array): list of error messages, empty on success

Limits (Marketplace rules):
  - 1 request = 10 API calls
  - 100k calls / 24h, 1k requests / minute
  - Output is JSON only`,
    params: [
      { name: 'isin', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_praams_bank_balance_sheet_by_ticker',
    description: `[PRAAMS] Retrieve bank-specific balance sheet time series by ticker symbol.
Returns annual and quarterly data: loans, cash, deposits, securities REPO, investment portfolio,
debt, total assets/equity, interest-earning assets, and interest-bearing liabilities.
Tailored for banking sector analysis. Consumes 10 API calls per request.
For lookup by ISIN, use get_mp_praams_bank_balance_sheet_by_isin.
For bank income statement data, use get_mp_praams_bank_income_statement_by_ticker.

Returns:
  JSON object with Praams envelope:
    - success (bool): whether the request succeeded
    - items (array): time-series of balance sheet entries, each containing:
        - period (str): reporting period (e.g. "2023-Q4", "2023-FY")
        - loansGross (float|null): gross loans
        - loansProvisions (float|null): loan loss provisions
        - loansNet (float|null): net loans
        - cashEquivalents (float|null): cash & equivalents
        - depositsWithBanks (float|null): deposits with other banks
        - securitiesRepoAssets (float|null): securities REPO assets
        - securitiesRepoLiabilities (float|null): securities REPO liabilities
        - investmentPortfolio (float|null): investment portfolio
        - totalAssets (float|null): total assets
        - totalEquity (float|null): total equity
        - shortTermDebt (float|null): short-term debt
        - longTermDebt (float|null): long-term debt
        - interestEarningAssets (float|null): interest-earning assets
        - interestBearingLiabilities (float|null): interest-bearing liabilities
        - Additional bank-specific balance sheet line items
    - message (str): status message
    - errors (array): list of error messages, empty on success

Limits (Marketplace rules):
  - 1 request = 10 API calls
  - 100k calls / 24h, 1k requests / minute
  - Output is JSON only`,
    params: [
      { name: 'ticker', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_praams_bank_income_statement_by_isin',
    description: `[PRAAMS] Retrieve bank-specific income statement time series by ISIN code.
Returns annual and quarterly data: core revenue, net interest income, fee & commission income,
RIBPT, non-recurring income, IBPT, and provisioning. Tailored for banking sector analysis.
Consumes 10 API calls per request.
For lookup by ticker, use get_mp_praams_bank_income_statement_by_ticker.
For bank balance sheet data, use get_mp_praams_bank_balance_sheet_by_isin.

Returns:
  JSON object with Praams envelope:
    - success (bool): whether the request succeeded
    - items (array): time-series of income statement entries, each containing:
        - period (str): reporting period (e.g. "2023-Q4", "2023-FY")
        - coreRevenue (float|null): total core revenue
        - netInterestIncome (float|null): net interest income
        - netFeeCommissionIncome (float|null): net fee & commission income
        - ribpt (float|null): recurring income before provisioning and taxes
        - nonRecurringIncome (float|null): non-recurring income items
        - ibpt (float|null): income before provisioning and taxes
        - provisioning (float|null): loan loss provisions
        - Additional bank-specific income line items
    - message (str): status message
    - errors (array): list of error messages, empty on success

Limits (Marketplace rules):
  - 1 request = 10 API calls
  - 100k calls / 24h, 1k requests / minute
  - Output is JSON only`,
    params: [
      { name: 'isin', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_praams_bank_income_statement_by_ticker',
    description: `[PRAAMS] Retrieve bank-specific income statement time series by ticker symbol.
Returns annual and quarterly data: core revenue, net interest income, fee & commission income,
RIBPT, non-recurring income, IBPT, and provisioning. Tailored for banking sector analysis.
Consumes 10 API calls per request.
For lookup by ISIN, use get_mp_praams_bank_income_statement_by_isin.
For bank balance sheet data, use get_mp_praams_bank_balance_sheet_by_ticker.

Returns:
  JSON object with Praams envelope:
    - success (bool): whether the request succeeded
    - items (array): time-series of income statement entries, each containing:
        - period (str): reporting period (e.g. "2023-Q4", "2023-FY")
        - coreRevenue (float|null): total core revenue
        - netInterestIncome (float|null): net interest income
        - netFeeCommissionIncome (float|null): net fee & commission income
        - ribpt (float|null): recurring income before provisioning and taxes
        - nonRecurringIncome (float|null): non-recurring income items
        - ibpt (float|null): income before provisioning and taxes
        - provisioning (float|null): loan loss provisions
        - Additional bank-specific income line items
    - message (str): status message
    - errors (array): list of error messages, empty on success

Limits (Marketplace rules):
  - 1 request = 10 API calls
  - 100k calls / 24h, 1k requests / minute
  - Output is JSON only`,
    params: [
      { name: 'ticker', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_praams_bond_analyze_by_isin',
    description: `[PRAAMS] Get deep risk-return analysis for a bond identified by ISIN code.
Returns PRAAMS ratio, coupon profile, credit/solvency assessment, stress-manual results,
volatility, liquidity, country risk narratives, and issuer-level fundamentals.
Use for detailed bond-specific due diligence. Consumes 10 API calls per request.
For bond screening across multiple instruments, use get_mp_praams_smart_screener_bond.
For a full PDF bond report, use get_mp_praams_report_bond_by_isin.

Returns:
  JSON object with Praams envelope:
    - success (bool): whether the request succeeded
    - item (object): bond analysis payload containing:
        - praamsRatio (float): overall PRAAMS score
        - totalReturnScore (int): aggregate return score (1-7 scale)
        - totalRiskScore (int): aggregate risk score (1-7 scale)
        - coupon (object): coupon profile (type, rate, frequency, structure notes)
        - valuation (object): yield-to-maturity, spread, price metrics
        - performance (object): price and total return performance
        - profitability (object): issuer-level profitability metrics
        - growthMomentum (object): issuer growth & momentum
        - marketView (object): spread history, yield curve positioning
        - volatility (object): price volatility, duration-adjusted risk
        - stressTest (object): stress-manual scenarios and score
        - liquidity (object): trading volume, bid-ask spread, score
        - countryRisk (object): country-level risk assessment and score
        - solvency (object): issuer creditworthiness, leverage, coverage ratios
        - descriptions (object|null): narrative risk/return explanations
    - errors (array): list of error messages, empty on success
    - message (str): status message

Limits (Marketplace rules):
  - 1 request = 10 API calls
  - 100k calls / 24h, 1k requests / minute
  - Output is JSON only`,
    params: [
      { name: 'isin', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_praams_report_bond_by_isin',
    description: `[PRAAMS] Generate a comprehensive multi-factor PDF report for a bond by ISIN code.
Covers 120,000+ global bonds (corporate and sovereign). Report includes valuation,
performance, coupon analysis, profitability, growth, plus risk factors (volatility,
stress-manual, liquidity, country, solvency). Requires an email for delivery notification.
Consumes 10 API calls per request.
For JSON bond analysis without PDF, use get_mp_praams_bond_analyze_by_isin.
For equity PDF reports, use get_mp_praams_report_equity_by_ticker or by_isin.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address for report notifications.`,
      },
      {
        name: 'isin',
        type: 'string',
        required: true,
        description: `ISIN code of the bond (e.g. 'US7593518852', 'US91282CJN20').`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override; env token used otherwise.`,
      },
      {
        name: 'is_full',
        type: 'string',
        required: false,
        description: `True for full report, False for partial.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_praams_report_equity_by_isin',
    description: `[PRAAMS] Generate a comprehensive multi-factor PDF report for an equity by ISIN code.
Covers 120,000+ global equities. Report includes valuation, performance, profitability,
growth, dividends, analyst view, plus risk factors (volatility, stress-manual, liquidity,
country, solvency). Requires an email for delivery notification. Consumes 10 API calls per request.
For report by ticker, use get_mp_praams_report_equity_by_ticker.
For JSON risk scoring without PDF, use get_mp_praams_risk_scoring_by_isin.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address for report notifications.`,
      },
      {
        name: 'isin',
        type: 'string',
        required: true,
        description: `ISIN code (e.g. 'US0378331005' for Apple, 'US88160R1014' for Tesla).`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override; env token used otherwise.`,
      },
      {
        name: 'is_full',
        type: 'string',
        required: false,
        description: `True for full report, False for partial.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_praams_report_equity_by_ticker',
    description: `[PRAAMS] Generate a comprehensive multi-factor PDF report for an equity by ticker symbol.
Covers 120,000+ global equities. Report includes valuation, performance, profitability,
growth, dividends, analyst view, plus risk factors (volatility, stress-manual, liquidity,
country, solvency). Requires an email for delivery notification. Consumes 10 API calls per request.
For report by ISIN, use get_mp_praams_report_equity_by_isin.
For JSON risk scoring without PDF, use get_mp_praams_risk_scoring_by_ticker.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address for report notifications.`,
      },
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `Ticker symbol (e.g. 'AAPL', 'TSLA', 'AMZN').`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override; env token used otherwise.`,
      },
      {
        name: 'is_full',
        type: 'string',
        required: false,
        description: `True for full report, False for partial.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_praams_risk_scoring_by_isin',
    description: `[PRAAMS] Get risk scores and risk-return decomposition for an equity identified by ISIN code.
Returns overall PRAAMS ratio (1-7), sub-scores for valuation, performance, profitability,
growth, dividends, volatility, liquidity, stress-manual, country risk, and solvency.
Use when assessing investment risk and you have the ISIN. Consumes 10 API calls per request.
For lookup by ticker instead of ISIN, use get_mp_praams_risk_scoring_by_ticker.
For a full PDF report, use get_mp_praams_report_equity_by_isin.

Returns:
  JSON object with Praams envelope:
    - success (bool): whether the request succeeded
    - item (object): equity analysis payload containing:
        - praamsRatio (float): overall PRAAMS score
        - totalReturnScore (int): aggregate return score (1-7 scale)
        - totalRiskScore (int): aggregate risk score (1-7 scale)
        - valuation (object): valuation metrics and score
        - performance (object): performance metrics and score
        - profitability (object): profitability metrics and score
        - growthMomentum (object): growth & momentum metrics and score
        - dividends (object): dividend yield, payout ratio, score
        - analystView (object): consensus target price, recommendations, score
        - volatility (object): historical volatility, VaR, score
        - stressTest (object): stress-manual scenarios and score
        - liquidity (object): trading volume, bid-ask spread, score
        - countryRisk (object): country-level risk assessment and score
        - solvency (object): debt ratios, interest coverage, score
        - descriptions (object|null): narrative risk/return explanations
    - errors (array): list of error messages, empty on success
    - message (str): status message

Limits (Marketplace rules):
  - 1 request = 10 API calls
  - 100k calls / 24h, 1k requests / minute
  - Output is JSON only`,
    params: [
      { name: 'isin', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_praams_risk_scoring_by_ticker',
    description: `[PRAAMS] Get risk scores and risk-return decomposition for an equity identified by ticker symbol.
Returns overall PRAAMS ratio (1-7), sub-scores for valuation, performance, profitability,
growth, dividends, volatility, liquidity, stress-manual, country risk, and solvency.
Use when assessing investment risk for a specific stock or ETF. Consumes 10 API calls per request.
For lookup by ISIN instead of ticker, use get_mp_praams_risk_scoring_by_isin.
For a full PDF report, use get_mp_praams_report_equity_by_ticker.

Returns:
  JSON object with Praams envelope:
    - success (bool): whether the request succeeded
    - item (object): equity analysis payload containing:
        - praamsRatio (float): overall PRAAMS score
        - totalReturnScore (int): aggregate return score (1-7 scale)
        - totalRiskScore (int): aggregate risk score (1-7 scale)
        - valuation (object): valuation metrics and score
        - performance (object): performance metrics and score
        - profitability (object): profitability metrics and score
        - growthMomentum (object): growth & momentum metrics and score
        - dividends (object): dividend yield, payout ratio, score
        - analystView (object): consensus target price, recommendations, score
        - volatility (object): historical volatility, VaR, score
        - stressTest (object): stress-manual scenarios and score
        - liquidity (object): trading volume, bid-ask spread, score
        - countryRisk (object): country-level risk assessment and score
        - solvency (object): debt ratios, interest coverage, score
        - descriptions (object|null): narrative risk/return explanations
    - errors (array): list of error messages, empty on success
    - message (str): status message

Limits (Marketplace rules):
  - 1 request = 10 API calls
  - 100k calls / 24h, 1k requests / minute
  - Output is JSON only`,
    params: [
      { name: 'ticker', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_praams_smart_screener_bond',
    description: `[PRAAMS] Screen and filter bonds using multi-factor risk-return criteria.
Filter by region, country, sector, currency, yield range, duration range, PRAAMS score ranges (1-7),
and exclude subordinated or perpetual bonds. Returns paginated matching bonds with scores.
Consumes 10 API calls per request.
For equity screening, use get_mp_praams_smart_screener_equity.
For deep analysis of a single bond, use get_mp_praams_bond_analyze_by_isin.


Returns:
  JSON object with Praams envelope:
    - item (object):
        - peers (array): matching bond instruments, each containing:
            - isin (str): bond ISIN
            - name (str): bond/issuer name
            - praamsRatio (float): overall PRAAMS score
            - totalReturnScore (int): return score (1-7)
            - totalRiskScore (int): risk score (1-7)
            - yield (float|null): current yield
            - duration (float|null): effective duration
            - couponRate (float|null): coupon rate
            - maturityDate (str|null): maturity date
            - currency (str): bond currency
            - country (str): issuer country
            - sector (str): issuer sector
        - totalCount (int): total matching instruments (for pagination)
    - success (bool): whether the request succeeded
    - message (str): status message
    - errors (array): list of error messages, empty on success

Notes:
  - All *Min/*Max fields are 1..7 scale integers (nullable).
  - Bond-specific: yieldMin/Max, durationMin/Max, excludeSubordinated, excludePerpetuals.
  - Provide at least one filter value in the JSON body.

Examples:
    "High-yield EUR bonds low risk" â currency=["EUR"], yieldMin=5, countryRiskMax=3
    "US investment-grade bonds short duration" â regions=[1], durationMax=3, solvencyMin=5`,
    params: [
      { name: 'analystViewMax', type: 'string', required: false, description: `No description.` },
      { name: 'analystViewMin', type: 'string', required: false, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'capitalisation', type: 'string', required: false, description: `No description.` },
      { name: 'countries', type: 'string', required: false, description: `No description.` },
      { name: 'countryRiskMax', type: 'string', required: false, description: `No description.` },
      { name: 'countryRiskMin', type: 'string', required: false, description: `No description.` },
      { name: 'couponsMax', type: 'string', required: false, description: `No description.` },
      { name: 'couponsMin', type: 'string', required: false, description: `No description.` },
      { name: 'currency', type: 'string', required: false, description: `No description.` },
      { name: 'dividendsMax', type: 'string', required: false, description: `No description.` },
      { name: 'dividendsMin', type: 'string', required: false, description: `No description.` },
      { name: 'durationMax', type: 'string', required: false, description: `No description.` },
      { name: 'durationMin', type: 'string', required: false, description: `No description.` },
      {
        name: 'excludePerpetuals',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      {
        name: 'excludeSubordinated',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'growthMomMax', type: 'string', required: false, description: `No description.` },
      { name: 'growthMomMin', type: 'string', required: false, description: `No description.` },
      { name: 'industries', type: 'string', required: false, description: `No description.` },
      { name: 'liquidityMax', type: 'string', required: false, description: `No description.` },
      { name: 'liquidityMin', type: 'string', required: false, description: `No description.` },
      { name: 'mainRatioMax', type: 'string', required: false, description: `No description.` },
      { name: 'mainRatioMin', type: 'string', required: false, description: `No description.` },
      { name: 'marketViewMax', type: 'string', required: false, description: `No description.` },
      { name: 'marketViewMin', type: 'string', required: false, description: `No description.` },
      { name: 'orderBy', type: 'string', required: false, description: `No description.` },
      { name: 'otherMax', type: 'string', required: false, description: `No description.` },
      { name: 'otherMin', type: 'string', required: false, description: `No description.` },
      { name: 'performanceMax', type: 'string', required: false, description: `No description.` },
      { name: 'performanceMin', type: 'string', required: false, description: `No description.` },
      { name: 'profitabilityMax', type: 'string', required: false, description: `No description.` },
      { name: 'profitabilityMin', type: 'string', required: false, description: `No description.` },
      { name: 'regions', type: 'string', required: false, description: `No description.` },
      { name: 'sectors', type: 'string', required: false, description: `No description.` },
      { name: 'skip', type: 'string', required: false, description: `No description.` },
      { name: 'solvencyMax', type: 'string', required: false, description: `No description.` },
      { name: 'solvencyMin', type: 'string', required: false, description: `No description.` },
      { name: 'stressTestMax', type: 'string', required: false, description: `No description.` },
      { name: 'stressTestMin', type: 'string', required: false, description: `No description.` },
      { name: 'take', type: 'string', required: false, description: `No description.` },
      { name: 'valuationMax', type: 'string', required: false, description: `No description.` },
      { name: 'valuationMin', type: 'string', required: false, description: `No description.` },
      { name: 'volatilityMax', type: 'string', required: false, description: `No description.` },
      { name: 'volatilityMin', type: 'string', required: false, description: `No description.` },
      { name: 'yieldMax', type: 'string', required: false, description: `No description.` },
      { name: 'yieldMin', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_praams_smart_screener_equity',
    description: `[PRAAMS] Screen and filter equities using multi-factor risk-return criteria.
Filter by region, country, sector, industry, market cap, currency, and PRAAMS score ranges (1-7)
for valuation, performance, profitability, growth, dividends, analyst view, and risk factors.
Returns paginated matching equities with scores. Consumes 10 API calls per request.
For bond screening, use get_mp_praams_smart_screener_bond.
For deep analysis of a single equity, use get_mp_praams_risk_scoring_by_ticker.


Returns:
  JSON object with Praams envelope:
    - item (object):
        - peers (array): matching equity instruments, each containing:
            - ticker (str): equity ticker symbol
            - isin (str): ISIN code
            - name (str): company name
            - praamsRatio (float): overall PRAAMS score
            - totalReturnScore (int): return score (1-7)
            - totalRiskScore (int): risk score (1-7)
            - valuation (int): valuation score (1-7)
            - performance (int): performance score (1-7)
            - profitability (int): profitability score (1-7)
            - dividends (int): dividends score (1-7)
            - country (str): company country
            - sector (str): company sector
            - capitalisation (int): market cap category (1=small, 2=mid, 3=large)
            - currency (str): trading currency
        - totalCount (int): total matching instruments (for pagination)
    - success (bool): whether the request succeeded
    - message (str): status message
    - errors (array): list of error messages, empty on success

Notes:
  - All *Min/*Max fields are 1..7 scale integers (nullable).
  - Provide at least one filter value in the JSON body.

Examples:
    "Large-cap US tech stocks with high dividends" â capitalisation=[3], regions=[1], dividendsMin=5
    "European equities low volatility risk" â regions=[2], currency=["EUR"], volatilityMax=2`,
    params: [
      { name: 'analystViewMax', type: 'string', required: false, description: `No description.` },
      { name: 'analystViewMin', type: 'string', required: false, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'capitalisation', type: 'string', required: false, description: `No description.` },
      { name: 'countries', type: 'string', required: false, description: `No description.` },
      { name: 'countryRiskMax', type: 'string', required: false, description: `No description.` },
      { name: 'countryRiskMin', type: 'string', required: false, description: `No description.` },
      { name: 'currency', type: 'string', required: false, description: `No description.` },
      { name: 'dividendsMax', type: 'string', required: false, description: `No description.` },
      { name: 'dividendsMin', type: 'string', required: false, description: `No description.` },
      { name: 'growthMomMax', type: 'string', required: false, description: `No description.` },
      { name: 'growthMomMin', type: 'string', required: false, description: `No description.` },
      { name: 'industries', type: 'string', required: false, description: `No description.` },
      { name: 'liquidityMax', type: 'string', required: false, description: `No description.` },
      { name: 'liquidityMin', type: 'string', required: false, description: `No description.` },
      { name: 'mainRatioMax', type: 'string', required: false, description: `No description.` },
      { name: 'mainRatioMin', type: 'string', required: false, description: `No description.` },
      { name: 'orderBy', type: 'string', required: false, description: `No description.` },
      { name: 'otherMax', type: 'string', required: false, description: `No description.` },
      { name: 'otherMin', type: 'string', required: false, description: `No description.` },
      { name: 'performanceMax', type: 'string', required: false, description: `No description.` },
      { name: 'performanceMin', type: 'string', required: false, description: `No description.` },
      { name: 'profitabilityMax', type: 'string', required: false, description: `No description.` },
      { name: 'profitabilityMin', type: 'string', required: false, description: `No description.` },
      { name: 'regions', type: 'string', required: false, description: `No description.` },
      { name: 'sectors', type: 'string', required: false, description: `No description.` },
      { name: 'skip', type: 'string', required: false, description: `No description.` },
      { name: 'solvencyMax', type: 'string', required: false, description: `No description.` },
      { name: 'solvencyMin', type: 'string', required: false, description: `No description.` },
      { name: 'stressTestMax', type: 'string', required: false, description: `No description.` },
      { name: 'stressTestMin', type: 'string', required: false, description: `No description.` },
      { name: 'take', type: 'string', required: false, description: `No description.` },
      { name: 'valuationMax', type: 'string', required: false, description: `No description.` },
      { name: 'valuationMin', type: 'string', required: false, description: `No description.` },
      { name: 'volatilityMax', type: 'string', required: false, description: `No description.` },
      { name: 'volatilityMin', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_tick_data',
    description: `[Marketplace] Fetch individual trade ticks (tick-by-tick data) for US stocks. Use when
asked about granular trade-level data, tick history, or microstructure analysis.
Returns timestamp (ms), price, shares, market center, and sequence for each trade.
Covers US equities only. Time range defaults to yesterday if not specified.
This is the paid Marketplace tick data provider. For free-tier tick data, use get_us_tick_data.
Consumes 10 API calls per request.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `Ticker symbol, max 30 chars (e.g. 'AAPL', 'MSFT').`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override; env token used otherwise.`,
      },
      {
        name: 'from_timestamp',
        type: 'string',
        required: false,
        description: `Start UNIX time in seconds. Default: yesterday start.`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Max ticks to return (1-10000). Default: all in range.`,
      },
      {
        name: 'to_timestamp',
        type: 'string',
        required: false,
        description: `End UNIX time in seconds. Default: yesterday end.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_tradinghours_list_markets',
    description: `[TradingHours] List all tracked global markets and exchanges. Use as the starting point
to browse available markets before looking up details or checking status.
Returns FinID, exchange name, MIC code, asset type, and group for each market.
Filter by group: 'core' (24 G20+ markets), 'extended', 'all', or 'allowed' (your tier).
To search markets by name/country, use get_mp_tradinghours_lookup_markets.
For detailed info on one market, use get_mp_tradinghours_market_details.
Consumes 10 API calls per request.`,
    params: [
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override; env token used otherwise.`,
      },
      {
        name: 'group',
        type: 'string',
        required: false,
        description: `Filter markets â 'core' (G20+), 'extended' (global equities),
'all' (equities + derivatives), 'allowed' (your tier). Default: 'all'.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_tradinghours_lookup_markets',
    description: `[TradingHours] Search for markets by name, MIC code, country, or free-form query.
Use when the user asks to find a specific exchange or market by keyword (e.g. "Tokyo",
"XNYS", "Germany"). Covers 900+ global trading schedules.
To list all markets without searching, use get_mp_tradinghours_list_markets.
For full details on a found market, pass its fin_id to get_mp_tradinghours_market_details.
Consumes 10 API calls per request.`,
    params: [
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override; env token used otherwise.`,
      },
      {
        name: 'group',
        type: 'string',
        required: false,
        description: `Filter results â 'core', 'extended', 'all', 'allowed'.
Default: 'all'.`,
      },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Free-form search query (exchange name, market name, MIC,
country). Omit to return all markets.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_tradinghours_market_details',
    description: `[TradingHours] Get detailed metadata for a specific market by its FinID. Use when asked
about an exchange's timezone, MIC codes, asset types, weekend schedule, or holiday date range.
Returns country, timezone (IANA), products traded, MIC/MIC extended, acronym, and more.
Find the FinID first via get_mp_tradinghours_list_markets or get_mp_tradinghours_lookup_markets.
For real-time open/closed status, use get_mp_tradinghours_market_status instead.
Consumes 10 API calls per request.`,
    params: [
      {
        name: 'fin_id',
        type: 'string',
        required: true,
        description: `Market FinID, case-insensitive (e.g. 'us.nyse', 'gb.lse').`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override; env token used otherwise.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_mp_tradinghours_market_status',
    description: `[TradingHours] Check whether a market is currently open or closed. Use when asked
"is the NYSE open?", "when does Tokyo close?", or any real-time market status question.
Returns status (Open/Closed), reason, time until next status change, and next bell time.
Does not cover circuit breakers or individual stock trading halts.
Find the FinID first via get_mp_tradinghours_list_markets or get_mp_tradinghours_lookup_markets.
For static market metadata (timezone, MIC, holidays), use get_mp_tradinghours_market_details.
Consumes 10 API calls per request.`,
    params: [
      {
        name: 'fin_id',
        type: 'string',
        required: true,
        description: `Market FinID, case-insensitive (e.g. 'us.nyse').`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override; env token used otherwise.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_news_word_weights',
    description: `Get top weighted keywords from news articles for a given stock ticker over a date range.
Returns word frequency and importance scores, useful for identifying dominant themes and narratives in coverage.
Use when analyzing what topics or terms dominate news about a company.
For raw news articles, use get_company_news instead.
For aggregated sentiment scores, use get_sentiment_data instead.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `Symbol to analyze (e.g., 'AAPL.US'); mapped to 's'.`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `YYYY-MM-DD; mapped to filter[date_to].`,
      },
      {
        name: 'fmt',
        type: 'string',
        required: false,
        description: `'json' (default). (CSV/XML not documented for this endpoint.)`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Number of top words; mapped to page[limit].`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `YYYY-MM-DD; mapped to filter[date_from].`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_sentiment_data',
    description: `Get aggregated sentiment scores for stocks based on news and social media analysis.
Returns daily sentiment polarity, news buzz, and weighted scores for one or more tickers over a date range.
Use when analyzing market mood, news impact, or sentiment-driven trading signals.
For raw news articles, use get_company_news instead.
For word frequency in news, use get_news_word_weights instead.`,
    params: [
      {
        name: 'symbols',
        type: 'string',
        required: true,
        description: `One or more comma-separated tickers (e.g., 'AAPL.US,BTC-USD.CC').`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call override; env token used if omitted.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `YYYY-MM-DD, maps to 'to'.`,
      },
      {
        name: 'fmt',
        type: 'string',
        required: false,
        description: `'json' (default). (XML not documented for this endpoint.)`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `YYYY-MM-DD, maps to 'from'.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_stock_market_logos',
    description: `Get a company logo in PNG format (200x200 with transparency). Use when the user needs
a raster logo image for a stock or company for display, reports, or UI.

Covers 40,000+ logos across 60+ exchanges. Costs 10 API calls per request.
Symbol must be in TICKER.EXCHANGE format (e.g., 'AAPL.US', 'BMW.XETRA').

For vector/SVG logos (US and Toronto only), use get_stock_market_logos_svg instead.`,
    params: [
      {
        name: 'symbol',
        type: 'string',
        required: true,
        description: `Ticker in TICKER.EXCHANGE format (e.g. 'AAPL.US', 'BMW.XETRA').`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_stock_market_logos_svg',
    description: `Get a company logo in SVG vector format. Use when the user needs a scalable vector logo
for high-quality rendering, web embedding, or print.

Limited to US and TO (Toronto) exchanges only. Costs 10 API calls per request.
Symbol must be in TICKER.EXCHANGE format (e.g., 'AAPL.US', 'RY.TO').

For PNG logos with broader exchange coverage (60+ exchanges), use get_stock_market_logos.`,
    params: [
      {
        name: 'symbol',
        type: 'string',
        required: true,
        description: `Ticker in TICKER.EXCHANGE format (e.g. 'AAPL.US', 'RY.TO').`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_stocks_from_search',
    description: `Search for financial instruments by name, ticker, or ISIN. Use when the user wants to
find a ticker symbol, look up a company by name, resolve an ISIN, or discover instruments
matching a keyword.

Searches across stocks, ETFs, mutual funds, bonds, indices, and crypto. Returns matching
instruments with their ticker codes, exchange, type, and ISIN. Filterable by exchange
and instrument type.

This is the discovery/lookup tool. Once you have a ticker, use other tools (e.g.,
get_eod_historical_data, get_fundamentals_data) to fetch actual data.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Ticker, company name, or ISIN to search (e.g., 'AAPL', 'Apple Inc', 'US0378331005').`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call API token override (demo token does NOT work for Search).`,
      },
      {
        name: 'bonds_only',
        type: 'string',
        required: false,
        description: `If True, return only bonds.`,
      },
      {
        name: 'exchange',
        type: 'string',
        required: false,
        description: `Exchange code filter (e.g., 'US', 'PA', 'FOREX', 'NYSE').`,
      },
      { name: 'fmt', type: 'string', required: false, description: `Must be 'json'.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results (default 15, max 500).`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `One of {'all','stock','etf','fund','bond','index','crypto'}.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_support_resistance_levels',
    description: `Calculate pivot-point-based support and resistance levels for any stock, ETF, index, or crypto.
Fetches historical OHLCV data and computes support/resistance levels using one of five
standard pivot point methods: Classic (Floor), Fibonacci, Woodie, Camarilla, or DeMark.
Each record in the result corresponds to one bar from the price history, with the calculated
levels that traders use to identify potential reversal zones, entry/exit points, and stop-loss placement.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `Symbol in SYMBOL.EXCHANGE format (e.g. 'AAPL.US').
    If you only have a company name or ISIN, call resolve_ticker first.`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Override API token for this call (optional).`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format (optional).`,
      },
      {
        name: 'method',
        type: 'string',
        required: false,
        description: `Pivot point method â 'classic', 'fibonacci', 'woodie', 'camarilla', or 'demark'. Default 'classic'.`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `Price bar period â 'd' (daily), 'w' (weekly), 'm' (monthly). Default 'd'.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date in YYYY-MM-DD format (optional).`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_symbol_change_history',
    description: `Get ticker symbol change history -- tracks when US stocks changed their ticker symbol or company name.
Returns old symbol, new symbol, company name, exchange, and effective date. Data available from 2022-07-22, US exchanges only.
Use when the user asks about ticker renames, symbol changes, rebranding events, or needs to map old tickers to new ones.
This is the only tool for symbol/ticker change tracking.`,
    params: [
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override; env token used if omitted.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `'to' in YYYY-MM-DD   (e.g., '2022-11-01').`,
      },
      { name: 'fmt', type: 'string', required: false, description: `'json' (default).` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `'from' in YYYY-MM-DD (e.g., '2022-10-01').`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_technical_indicators',
    description: `Compute technical indicators for any ticker over a date range.
Supported indicators: SMA, EMA, WMA, MACD, RSI, Stochastic, StochRSI, DMI/ADX, ATR,
CCI, Parabolic SAR, Beta, Bollinger Bands, Volatility, Average Volume, and split-adjusted prices.
Each indicator has configurable periods, and results include a time series of computed values.
Consumes 5 API calls per request.
For raw OHLCV price data, use get_historical_stock_prices instead.
For fundamental analysis, use get_fundamentals_data instead.

Returns:
    Array of objects, each with 'date' (str, YYYY-MM-DD) plus indicator-specific fields:
    - sma/ema/wma: {sma|ema|wma} (float)
    - rsi: {rsi} (float, 0-100)
    - macd: {macd, macd_signal, macd_hist} (float)
    - stochastic: {slow_k, slow_d} (float)
    - stochrsi: {stochrsi} (float)
    - bbands: {uband, mband, lband} (float â upper/middle/lower)
    - atr: {atr} (float)
    - adx: {adx} (float)
    - dmi: {dmi} (float)
    - cci: {cci} (float)
    - sar: {sar} (float)
    - beta: {beta} (float)
    - volatility: {volatility} (float)
    - avgvol: {avgvol} (int)
    - avgvolccy: {avgvolccy} (float â volume * close)
    - splitadjusted: {open, high, low, close, volume} (split-adjusted OHLCV)
    - stddev: {stddev} (float)
    - slope: {slope} (float)

    If filter is set (e.g. 'last_sma'), returns a single scalar value.

Examples:
    "50-day SMA for Apple in 2025" â ticker="AAPL.US", function="sma", period=50, start_date="2025-01-01", end_date="2025-12-31"
    "RSI(14) for Bitcoin last 3 months" â ticker="BTC-USD.CC", function="rsi", period=14, start_date="2025-12-06"
    "MACD for Siemens with custom periods" â ticker="SIE.XETRA", function="macd", fast_period=12, slow_period=26, signal_period=9

Demo:
    To manual data structure, use the manual API key "demo" (documentation: https://eodhd.com/financial-apis/).
    The "demo" key works for AAPL.US, MSFT.US, TSLA.US (stocks), VTI.US (ETF), SWPPX.US (mutual funds),
    EURUSD.FOREX, and BTC-USD.CC in all relevant APIs.`,
    params: [
      { name: 'function', type: 'string', required: true, description: `No description.` },
      { name: 'ticker', type: 'string', required: true, description: `No description.` },
      { name: 'acceleration', type: 'string', required: false, description: `No description.` },
      { name: 'agg_period', type: 'string', required: false, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'code2', type: 'string', required: false, description: `No description.` },
      { name: 'end_date', type: 'string', required: false, description: `No description.` },
      { name: 'fast_dperiod', type: 'string', required: false, description: `No description.` },
      { name: 'fast_kperiod', type: 'string', required: false, description: `No description.` },
      { name: 'fast_period', type: 'string', required: false, description: `No description.` },
      { name: 'filter', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'maximum', type: 'string', required: false, description: `No description.` },
      { name: 'order', type: 'string', required: false, description: `No description.` },
      { name: 'period', type: 'string', required: false, description: `No description.` },
      { name: 'signal_period', type: 'string', required: false, description: `No description.` },
      { name: 'slow_dperiod', type: 'string', required: false, description: `No description.` },
      { name: 'slow_kperiod', type: 'string', required: false, description: `No description.` },
      { name: 'slow_period', type: 'string', required: false, description: `No description.` },
      {
        name: 'splitadjusted_only',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'start_date', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_upcoming_dividends',
    description: `Get historical and upcoming dividend payments for stocks.
Returns ex-dividend dates, payment dates, dividend amounts, and currency for a given symbol or date.
Requires at least one of 'symbol' or 'date_eq'. Supports date range filtering and pagination.
Use when the user asks about dividend dates, payout history, yield data, or ex-dividend calendars.
For IPO calendar, use get_upcoming_ipos. For stock splits calendar, use get_upcoming_splits.


Returns:
    Array of dividend records, each with:
    - code (str): ticker symbol
    - exchange (str): exchange code
    - date (str): ex-dividend date
    - declarationDate (str): declaration date
    - recordDate (str): record date
    - paymentDate (str): payment date
    - period (str): frequency (e.g. 'Quarterly', 'Annual')
    - value (float): adjusted dividend per share
    - unadjustedValue (float): unadjusted dividend per share
    - currency (str): dividend currency

Examples:
    "Apple dividends in 2025" â symbol="AAPL.US", date_from="2025-01-01", date_to="2025-12-31"
    "All dividends on March 15" â date_eq="2026-03-15"
    "Microsoft dividends this quarter" â symbol="MSFT.US", date_from="2026-01-01", date_to="2026-03-31"


Demo:
    To manual data structure, use the manual API key "demo" (documentation: https://eodhd.com/financial-apis/).
    The "demo" key works for AAPL.US, MSFT.US, TSLA.US (stocks), VTI.US (ETF), SWPPX.US (mutual funds),
    EURUSD.FOREX, and BTC-USD.CC in all relevant APIs.`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'date_eq', type: 'string', required: false, description: `No description.` },
      { name: 'date_from', type: 'string', required: false, description: `No description.` },
      { name: 'date_to', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'page_limit', type: 'string', required: false, description: `No description.` },
      { name: 'page_offset', type: 'string', required: false, description: `No description.` },
      { name: 'symbol', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_upcoming_earnings',
    description: `Get upcoming and recent earnings report dates for stocks.
Returns scheduled earnings dates, EPS estimates, and actual results when available.
Filter by specific symbols or a date range (defaults to next 7 days).
Use when the user asks "when does X report earnings?" or wants an earnings calendar.
For EPS/revenue trend analysis and analyst revisions, use get_earnings_trends instead.
For macroeconomic events (GDP, CPI), use get_economic_events instead.


Returns:
    Object with:
    - earnings (list): array of earning records, each with:
      - code (str): ticker symbol
      - report_date (str): report filing date
      - date (str): earnings date
      - before_after_market (str|null): 'BeforeMarket' or 'AfterMarket'
      - currency (str): reporting currency
      - actual (float|null): actual EPS
      - estimate (float|null): consensus EPS estimate
      - difference (float|null): actual minus estimate
      - surprise_prc (float|null): surprise percentage

Examples:
    "Apple earnings schedule" â symbols="AAPL.US"
    "Earnings this week" â start_date="2026-03-02", end_date="2026-03-06"
    "Microsoft and Google earnings" â symbols="MSFT.US,GOOG.US"


Demo:
    To manual data structure, use the manual API key "demo" (documentation: https://eodhd.com/financial-apis/).
    The "demo" key works for AAPL.US, MSFT.US, TSLA.US (stocks), VTI.US (ETF), SWPPX.US (mutual funds),
    EURUSD.FOREX, and BTC-USD.CC in all relevant APIs.`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'end_date', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'start_date', type: 'string', required: false, description: `No description.` },
      { name: 'symbols', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_upcoming_ipos',
    description: `Get upcoming and recent IPO (Initial Public Offering) listings.
Returns IPO dates, company names, exchanges, share prices, and deal details within a date range (defaults to next 7 days).
Use when the user asks about new stock listings, companies going public, or IPO calendar.
For stock splits calendar, use get_upcoming_splits. For dividend calendar, use get_upcoming_dividends.


Returns:
    Object with:
    - ipos (list): array of IPO records, each with:
      - code (str): ticker symbol
      - name (str): company name
      - exchange (str): exchange code
      - currency (str): pricing currency
      - start_date (str): expected IPO date
      - filing_date (str): SEC filing date
      - amended_date (str): last amendment date
      - price_from (float|null): low end of price range
      - price_to (float|null): high end of price range
      - offer_price (float|null): final offer price
      - shares (int|null): shares offered
      - deal_type (str): type of offering (e.g. 'Priced')

Examples:
    "IPOs this week" â from_date="2026-03-02", to_date="2026-03-06"
    "IPOs in March 2026" â from_date="2026-03-01", to_date="2026-03-31"
    "Upcoming IPOs next 30 days" â from_date="2026-03-06", to_date="2026-04-05"


Demo:
    To manual data structure, use the manual API key "demo" (documentation: https://eodhd.com/financial-apis/).
    The "demo" key works for AAPL.US, MSFT.US, TSLA.US (stocks), VTI.US (ETF), SWPPX.US (mutual funds),
    EURUSD.FOREX, and BTC-USD.CC in all relevant APIs.`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'from_date', type: 'string', required: false, description: `No description.` },
      { name: 'to_date', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_upcoming_splits',
    description: `Get upcoming and recent stock split events.
Returns split dates, tickers, and split ratios (e.g., 4:1) within a date range (defaults to next 7 days).
Use when the user asks about stock splits, share splits, or reverse splits.
For IPO calendar, use get_upcoming_ipos. For dividend calendar, use get_upcoming_dividends.


Returns:
    Array of split records, each with:
    - code (str): ticker symbol
    - exchange (str): exchange code
    - optionable (str): whether options exist ('0' or '1')
    - date (str): split effective date
    - split (str): split ratio (e.g. '4/1')
    - oldShares (int): pre-split share count
    - newShares (int): post-split share count

Examples:
    "Stock splits this week" â from_date="2026-03-02", to_date="2026-03-06"
    "Splits in Q1 2026" â from_date="2026-01-01", to_date="2026-03-31"
    "Any splits next month" â from_date="2026-04-01", to_date="2026-04-30"


Demo:
    To manual data structure, use the manual API key "demo" (documentation: https://eodhd.com/financial-apis/).
    The "demo" key works for AAPL.US, MSFT.US, TSLA.US (stocks), VTI.US (ETF), SWPPX.US (mutual funds),
    EURUSD.FOREX, and BTC-USD.CC in all relevant APIs.`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'from_date', type: 'string', required: false, description: `No description.` },
      { name: 'to_date', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_us_live_extended_quotes',
    description: `Get extended delayed quotes for US stocks with rich detail beyond basic live prices.
Returns last trade, bid/ask with sizes and event timestamps, rolling averages (50d/200d),
52-week high/low, market cap, EPS, PE ratio, dividend yield, and more per symbol.
Supports batching multiple US tickers in one call. 1 API call per ticker.
For non-US tickers or basic global live prices, use get_live_price_data instead.
For historical end-of-day data, use get_historical_stock_prices instead.`,
    params: [
      {
        name: 'symbols',
        type: 'string',
        required: true,
        description: `A single comma-separated string or a sequence of tickers (e.g., ["AAPL.US","TSLA.US"]).`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Optional token; if omitted, env is used via make_request().`,
      },
      { name: 'fmt', type: 'string', required: false, description: `'json' (default) or 'csv'.` },
      {
        name: 'page_limit',
        type: 'string',
        required: false,
        description: `Optional page size; max 100.`,
      },
      {
        name: 'page_offset',
        type: 'string',
        required: false,
        description: `Optional offset for pagination; must be >= 0.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_us_options_contracts',
    description: `[Marketplace] Get available US options contracts (calls and puts) for a stock or ETF.
Returns strike prices, expiration dates, and contract symbols for the specified underlying ticker.
Supports filtering by expiration date range, strike range, trade time, and option type (put/call).
Use to discover which options exist before fetching pricing with get_us_options_eod.
For the list of all tickers that have options, use get_us_options_underlyings.
Consumes 10 API calls per request.


Returns:
    JSON object with:
    - meta: Pagination metadata.
    - data (array): Options contracts, each with:
      - contractName (str): Full OCC contract name.
      - contractSize (int): Contract size (typically 100).
      - currency (str): Currency code (e.g. 'USD').
      - type (str): 'call' or 'put'.
      - lastTradeDateTime (str): Last trade timestamp.
      - strike (float): Strike price.
      - lastPrice (float): Last traded price.
      - bid (float): Current bid price.
      - ask (float): Current ask price.
      - volume (int): Trading volume.
      - openInterest (int): Open interest.
      - impliedVolatility (float): Implied volatility.
      - delta (float): Option delta.
      - gamma (float): Option gamma.
      - theta (float): Option theta.
      - vega (float): Option vega.
      - expirationDate (str): Expiration date YYYY-MM-DD.
      - daysBeforeExpiration (int): Days until expiration.
      - intrinsicValue (float): Intrinsic value.
    - links.next (str|null): URL for next page, null if last page.

Examples:
    "AAPL options expiring this month" â underlying_symbol="AAPL", exp_date_from="2026-03-01", exp_date_to="2026-03-31"
    "SPY puts with strike between 400 and 450" â underlying_symbol="SPY", type="put", strike_from=400, strike_to=450
    "TSLA call contracts expiring in June 2026, sorted by strike" â underlying_symbol="TSLA", type="call", exp_date_from="2026-06-01", exp_date_to="2026-06-30", sort="strike"`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'contract', type: 'string', required: false, description: `No description.` },
      { name: 'exp_date_eq', type: 'string', required: false, description: `No description.` },
      { name: 'exp_date_from', type: 'string', required: false, description: `No description.` },
      { name: 'exp_date_to', type: 'string', required: false, description: `No description.` },
      { name: 'fields', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'page_limit', type: 'integer', required: false, description: `No description.` },
      { name: 'page_offset', type: 'integer', required: false, description: `No description.` },
      { name: 'sort', type: 'string', required: false, description: `No description.` },
      { name: 'strike_eq', type: 'string', required: false, description: `No description.` },
      { name: 'strike_from', type: 'string', required: false, description: `No description.` },
      { name: 'strike_to', type: 'string', required: false, description: `No description.` },
      { name: 'tradetime_eq', type: 'string', required: false, description: `No description.` },
      { name: 'tradetime_from', type: 'string', required: false, description: `No description.` },
      { name: 'tradetime_to', type: 'string', required: false, description: `No description.` },
      { name: 'type', type: 'string', required: false, description: `No description.` },
      {
        name: 'underlying_symbol',
        type: 'string',
        required: false,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_us_options_eod',
    description: `[Marketplace] Fetch end-of-day pricing data for US options contracts. Use when asked about
options prices, Greeks, open interest, volume, or implied volatility for stock/ETF options.
Returns OHLC, volume, open interest, and Greeks per contract per trading day.
Supports filtering by underlying symbol, expiration, strike, type (put/call), and trade date range.
First find available contracts with get_us_options_contracts, then fetch pricing here.
For the list of optionable tickers, use get_us_options_underlyings.
Consumes 10 API calls per request.


Returns:
    JSON object with:
    - meta: Pagination metadata.
    - data (array): EOD options records per date, each containing:
      - options.CALLS (array): Call contracts with:
        - contractName (str): Full OCC contract name.
        - expirationDate (str): Expiration date YYYY-MM-DD.
        - strike (float): Strike price.
        - lastPrice (float): Last traded price.
        - bid (float): Bid price.
        - ask (float): Ask price.
        - change (float): Price change.
        - changePercent (float): Price change percentage.
        - volume (int): Trading volume.
        - openInterest (int): Open interest.
        - impliedVolatility (float): Implied volatility.
      - options.PUTS (array): Put contracts (same fields as CALLS).
    - links.next (str|null): URL for next page, null if last page.

Examples:
    "AAPL end-of-day options for March 2026" â underlying_symbol="AAPL", tradetime_from="2026-03-01", tradetime_to="2026-03-31"
    "MSFT puts EOD data, strike 300-400" â underlying_symbol="MSFT", type="put", strike_from=300, strike_to=400
    "NVDA calls expiring 2026-06-20, compact" â underlying_symbol="NVDA", type="call", exp_date_eq="2026-06-20", compact=True`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'compact', type: 'string', required: false, description: `No description.` },
      { name: 'contract', type: 'string', required: false, description: `No description.` },
      { name: 'exp_date_eq', type: 'string', required: false, description: `No description.` },
      { name: 'exp_date_from', type: 'string', required: false, description: `No description.` },
      { name: 'exp_date_to', type: 'string', required: false, description: `No description.` },
      { name: 'fields', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'page_limit', type: 'integer', required: false, description: `No description.` },
      { name: 'page_offset', type: 'integer', required: false, description: `No description.` },
      { name: 'sort', type: 'string', required: false, description: `No description.` },
      { name: 'strike_eq', type: 'string', required: false, description: `No description.` },
      { name: 'strike_from', type: 'string', required: false, description: `No description.` },
      { name: 'strike_to', type: 'string', required: false, description: `No description.` },
      { name: 'tradetime_eq', type: 'string', required: false, description: `No description.` },
      { name: 'tradetime_from', type: 'string', required: false, description: `No description.` },
      { name: 'tradetime_to', type: 'string', required: false, description: `No description.` },
      { name: 'type', type: 'string', required: false, description: `No description.` },
      {
        name: 'underlying_symbol',
        type: 'string',
        required: false,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_us_options_underlyings',
    description: `[Marketplace] List all US stock and ETF ticker symbols that have listed options.
Use to check whether a specific ticker has options data or to browse the full universe
of optionable underlyings before querying contracts or EOD pricing.
For available contracts on a specific ticker, use get_us_options_contracts.
For options pricing data, use get_us_options_eod.
Consumes 10 API calls per request.


Returns:
    JSON object with:
    - meta (object): Contains total count, fields list, compact flag.
    - data (array of str): Ticker symbols that have options available (e.g. ['AAPL','MSFT',...]).
    - links.next (str|null): URL for next page, null if last page.

Examples:
    "list all tickers that have options" â (no params)
    "which stocks have options available" â (no params)`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'page_limit', type: 'string', required: false, description: `No description.` },
      { name: 'page_offset', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_get_us_tick_data',
    description: `Fetch historical tick-level trade data for US equities. Use when the user needs
individual trade records with exact timestamps, prices, volumes, and market venue
identifiers at the finest granularity available.

Returns individual trades (ticks) across all US venues for a given time range.
Fields include timestamp (ms), price, shares, market, sub-market, sequence number.
US stocks only. Costs 10 API calls per request.

For real-time streaming ticks, use capture_realtime_ws instead.
For daily/intraday OHLCV bars, use get_intraday_historical_data.`,
    params: [
      {
        name: 'from_timestamp',
        type: 'string',
        required: true,
        description: `Start UNIX time in seconds (UTC).`,
      },
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `US ticker, e.g., 'AAPL' or 'AAPL.US'.`,
      },
      {
        name: 'to_timestamp',
        type: 'string',
        required: true,
        description: `End UNIX time in seconds (UTC).`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
      { name: 'fmt', type: 'string', required: false, description: `'json' (default) or 'csv'.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max ticks to return (default 1000).`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_user_details',
    description: `Retrieve EODHD account details for the current API token. Use when the user asks about
their subscription plan, API usage, rate limits, or account information.

Returns account holder name, email, subscription type, payment method, API requests
consumed today, daily rate limit, and invite token. This is account metadata only --
does not return any financial market data.`,
    params: [
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override. If omitted, the
                       env var EODHD_API_KEY is used.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_ust_bill_rates',
    description: `Fetch daily US Treasury Bill rates (discount and coupon-equivalent yields). Use when the
user asks about T-bill rates, short-term government borrowing costs, or discount rates
for Treasury bills.

Returns daily rates for tenors: 4WK, 8WK, 13WK, 17WK, 26WK, 52WK. Fields include
date, tenor, discount rate, coupon-equivalent yield, averages, maturity date, and CUSIP.
Filterable by year. Costs 1 API call per request.

For Treasury par yield curve rates (longer maturities up to 30Y), use get_ust_yield_rates.`,
    params: [
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
      { name: 'limit', type: 'string', required: false, description: `Records per page.` },
      { name: 'offset', type: 'string', required: false, description: `Pagination offset.` },
      {
        name: 'year',
        type: 'string',
        required: false,
        description: `Filter by year (1900+). Defaults to current year.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_ust_long_term_rates',
    description: `Fetch US Treasury long-term rate composites and averages. Use when asked about 20-year bond
constant maturity rates, long-term real rate averages, or extrapolation factors.
Covers rate types: BC_20year, Over_10_Years, Real_Rate â combining daily long-term
nominal rates with real long-term rate averages.
For individual tenor yield curves use get_ust_yield_rates. For inflation-adjusted
real yields use get_ust_real_yield_rates. For T-bill rates use get_ust_bill_rates.
Consumes 1 API call per request.`,
    params: [
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override; env token used otherwise.`,
      },
      { name: 'limit', type: 'string', required: false, description: `Records per page.` },
      { name: 'offset', type: 'string', required: false, description: `Pagination offset.` },
      {
        name: 'year',
        type: 'string',
        required: false,
        description: `Filter by year (1900 to current+1). Defaults to current year.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_ust_real_yield_rates',
    description: `Fetch US Treasury inflation-adjusted (real) yield curve rates. Use when asked about TIPS yields,
real interest rates, or inflation-adjusted Treasury returns.
Covers 5Y, 7Y, 10Y, 20Y, 30Y tenors from the Daily Par Real Yield Curve.
For nominal Treasury yields use get_ust_yield_rates. For T-bill discount rates use get_ust_bill_rates.
For long-term rate averages (20Y+ composites) use get_ust_long_term_rates.
Consumes 1 API call per request.`,
    params: [
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override; env token used otherwise.`,
      },
      { name: 'limit', type: 'string', required: false, description: `Records per page.` },
      { name: 'offset', type: 'string', required: false, description: `Pagination offset.` },
      {
        name: 'year',
        type: 'string',
        required: false,
        description: `Filter by year (1900 to current+1). Defaults to current year.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_get_ust_yield_rates',
    description: `Fetch daily US Treasury par yield curve rates. Use when the user asks about Treasury
yields, the yield curve, government bond rates, or interest rates across maturities.

Returns nominal par yield curve rates for tenors: 1M, 1.5M, 2M, 3M, 4M, 6M, 1Y, 2Y,
3Y, 5Y, 7Y, 10Y, 20Y, 30Y. Fields include date, tenor, and rate. Filterable by year.
Costs 1 API call per request.

For short-term T-bill discount/coupon rates (4WK-52WK), use get_ust_bill_rates instead.`,
    params: [
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call token override.`,
      },
      { name: 'limit', type: 'string', required: false, description: `Records per page.` },
      { name: 'offset', type: 'string', required: false, description: `Pagination offset.` },
      {
        name: 'year',
        type: 'string',
        required: false,
        description: `Filter by year (1900+). Defaults to current year.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_mp_illio_performance_insights',
    description: `[Illio] Retrieve portfolio-level performance attributes for a major US index.
Covers S&P 500, Dow Jones, and Nasdaq-100. Returns return metrics, attribution,
and performance breakdown at the index-portfolio level. Consumes 10 API calls per request.
For market-level performance comparison across constituents, use get_mp_illio_market_insights_performance.
For risk attributes of the same indices, use mp_illio_risk_insights.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `'SnP500' | 'DJI' | 'NDX'  (common aliases like 'SP500', 'SPX', 'NASDAQ100' accepted)`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `override token; otherwise picked from environment by make_request()`,
      },
      {
        name: 'fmt',
        type: 'string',
        required: false,
        description: `'json' only (kept for symmetry with other tools)`,
      },
    ],
  },
  {
    name: 'eodhdmcp_mp_illio_risk_insights',
    description: `[Illio] Retrieve portfolio-level risk attributes for a major US index.
Covers S&P 500, Dow Jones, and Nasdaq-100. Returns risk metrics, drawdown analysis,
and risk decomposition at the index-portfolio level. Consumes 10 API calls per request.
For performance attributes of the same indices, use mp_illio_performance_insights.
For market-level risk-return analysis, use get_mp_illio_market_insights_risk_return.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `'SnP500' | 'DJI' | 'NDX'  (common aliases like 'SP500', 'SPX', 'NASDAQ100' accepted)`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `override token; otherwise picked from environment by make_request()`,
      },
      {
        name: 'fmt',
        type: 'string',
        required: false,
        description: `'json' only (kept for symmetry with other tools)`,
      },
    ],
  },
  {
    name: 'eodhdmcp_mp_index_components',
    description: `[Marketplace] Get constituent stocks of a specific S&P or Dow Jones index, including
historical component changes for major indices. Use when asked which stocks are in an
index, or to track index rebalancing history.
Requires the index symbol from mp_indices_list (e.g. GSPC.INDX for S&P 500).
To browse available indices first, use mp_indices_list.
Consumes 10 API calls per request.`,
    params: [
      { name: 'symbol', type: 'string', required: true, description: `No description.` },
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_mp_indices_list',
    description: `[Marketplace] List all available S&P and Dow Jones indices with end-of-day details.
Use when asked to browse or enumerate major stock market indices, or to find an index
symbol before fetching its components with mp_index_components.
Covers 100+ indices including S&P 500, Dow Jones, and sector indices.
For components/constituents of a specific index, use mp_index_components.
Consumes 10 API calls per request.`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'eodhdmcp_resolve_ticker',
    description: `Resolve a company name, partial ticker, or ISIN to SYMBOL.EXCHANGE format (and ISIN).

USE THIS FIRST when a user mentions a company by name instead of a ticker symbol,
or when you need to obtain the ISIN for a company/ticker.
Calls the EODHD Search API and returns the best match as SYMBOL.EXCHANGE plus ISIN.
If ambiguous (multiple exchanges), returns top 10 matches for user selection.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Company name, partial ticker, or ISIN to resolve.`,
      },
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Per-call API token override.`,
      },
      {
        name: 'asset_type',
        type: 'string',
        required: false,
        description: `Filter by type: "stock", "etf", "fund", "bond", "index", "crypto".`,
      },
      {
        name: 'preferred_exchange',
        type: 'string',
        required: false,
        description: `Exchange code to prefer (e.g. "US", "XETRA", "LSE").`,
      },
    ],
  },
  {
    name: 'eodhdmcp_retrieve_description_by_id',
    description: `Retrieve built-in EODHD API documentation by numeric type and id. Use when
the user asks about API usage, endpoint specs, subscription plans, or reference guides.
Returns structured Markdown content for subscriptions (type=1), endpoint docs (type=2),
or general reference (type=3). Call with type=0 or no args for the global README index.
This is a local lookup â not an API data call. No API calls consumed.`,
    params: [
      {
        name: 'api_token',
        type: 'string',
        required: false,
        description: `Ignored (accepted for interface uniformity).`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Numeric page ID within the type. Optional; defaults to 0
(README for the given type).`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Page category (0 = global README, 1 = subscriptions,
  2 = endpoints, 3 = general). Default 0.`,
      },
    ],
  },
  {
    name: 'eodhdmcp_stock_screener',
    description: `Screen and filter stocks by fundamental and technical criteria.
Build custom queries using filters (e.g., market_cap > 1B, sector = Technology, P/E < 20)
and signals (e.g., 200d_new_hi, 50d_new_lo, bookvalue_neg, wallstreetbull).
Returns matching tickers with key metrics. Supports sorting, pagination (limit up to 100).
Consumes 5 API calls per request.
Use this tool for stock discovery, screening by fundamentals/technicals, and building watchlists.
For detailed data on a specific ticker, use get_fundamentals_data instead.`,
    params: [
      { name: 'api_token', type: 'string', required: false, description: `No description.` },
      { name: 'filters', type: 'string', required: false, description: `No description.` },
      { name: 'fmt', type: 'string', required: false, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
      { name: 'offset', type: 'integer', required: false, description: `No description.` },
      { name: 'signals', type: 'string', required: false, description: `No description.` },
      { name: 'sort', type: 'string', required: false, description: `No description.` },
    ],
  },
]
