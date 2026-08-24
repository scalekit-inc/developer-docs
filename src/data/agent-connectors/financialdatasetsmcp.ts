import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'financialdatasetsmcp_get_balance_sheet',
    description: `Retrieves a company's balance sheet, providing a snapshot of its assets, liabilities, and shareholders' equity at a specific point in time.`,
    params: [
      { name: 'ticker', type: 'string', required: true, description: `The stock ticker symbol.` },
      {
        name: 'as_reported',
        type: 'boolean',
        required: false,
        description: `If true, returns the balance sheet as originally reported without standardization.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of balance sheet records to return.`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `The reporting period type (e.g. annual or quarterly).`,
      },
      {
        name: 'report_period_gte',
        type: 'string',
        required: false,
        description: `Filter records with report period greater than or equal to this date (YYYY-MM-DD).`,
      },
      {
        name: 'report_period_lte',
        type: 'string',
        required: false,
        description: `Filter records with report period less than or equal to this date (YYYY-MM-DD).`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_beneficial_owners',
    description: `Lists beneficial owners (holders of more than 5% of a company's shares, from SEC Schedules 13D/13G) with their filer CIK and reporting-person name. Optionally filter by case-insensitive name prefix. The response's \`total\` is the full match count; when it exceeds the returned page, narrow the search with \`name\`. Use this to discover the filer_cik to pass to get_beneficial_ownership.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of owners to return (default: 100, max: 1000). The response's \`total\` is the full match count; when it exceeds the page, narrow with \`name\`.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional case-insensitive name prefix to filter the beneficial-owner list (e.g. 'Saba'). Use this tool to discover the filer_cik to pass to get_beneficial_ownership.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_beneficial_ownership',
    description: `Retrieves beneficial-ownership stakes (holders of more than 5% of a class of shares) from SEC Schedules 13D and 13G. Schedule 13D stakes are ACTIVIST (intent to influence control: proxy fights, board seats, pushing for a sale); Schedule 13G stakes are passive (large asset managers). Query by ticker (who owns this company) OR by filer_cik (what stakes does this owner hold) — exactly one is required. Use type=activist to isolate activist stakes. By default each stake's CURRENT state is returned; set history=true for the full amendment chain. Each row is one reporting person with voting/dispositive powers, percent_of_class, and (for 13D) the stated purpose_of_transaction. Coverage begins January 2025.`,
    params: [
      {
        name: 'filer_cik',
        type: 'string',
        required: false,
        description: `SEC CIK of the beneficial owner (e.g. '0001510281' for Saba Capital). Returns their stakes across companies. Will be zero-padded to 10 digits. Provide exactly one of ticker or filer_cik. Use get_beneficial_owners to look up CIKs by owner name.`,
      },
      {
        name: 'filing_date',
        type: 'string',
        required: false,
        description: `Exact filing date filter in YYYY-MM-DD format`,
      },
      {
        name: 'filing_date_gte',
        type: 'string',
        required: false,
        description: `Filing date greater than or equal to (YYYY-MM-DD)`,
      },
      {
        name: 'filing_date_lte',
        type: 'string',
        required: false,
        description: `Filing date less than or equal to (YYYY-MM-DD)`,
      },
      {
        name: 'history',
        type: 'boolean',
        required: false,
        description: `When true, returns the full amendment history of each stake instead of only its current state (the default).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of rows to return (default: 10, max: 1000).`,
      },
      {
        name: 'ticker',
        type: 'string',
        required: false,
        description: `The subject company's ticker (e.g. 'BB'). Returns its 5%+ beneficial owners. Provide exactly one of ticker or filer_cik.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter by stake type: 'activist' (Schedule 13D, intent to influence control) or 'passive' (Schedule 13G). Omit for both.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_cash_flow_statement',
    description: `Retrieves a company's cash flow statement, showing cash inflows and outflows from operating, investing, and financing activities.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `The stock ticker symbol to fetch the cash flow statement for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `The reporting period for the cash flow statement.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_company_facts',
    description: `Get comprehensive company facts data for a stock ticker or CIK from Financial Datasets. Returns real-time information including market cap, number of employees, sector/industry classification, exchange listing, company location, website URL, SIC codes, weighted average shares, and historical events like ticker changes.`,
    params: [
      {
        name: 'cik',
        type: 'string',
        required: false,
        description: `The SEC Central Index Key (CIK) for the company. Provide either ticker or cik (at least one is required).`,
      },
      {
        name: 'ticker',
        type: 'string',
        required: false,
        description: `The stock ticker symbol. Provide either ticker or cik (at least one is required).`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_earnings',
    description: `Retrieves earnings data from SEC filings. Pass a ticker for company earnings or omit for a real-time feed of the most recently filed earnings across all covered companies.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: false,
        description: `The stock ticker symbol. Omit to receive a real-time feed of the most recently filed earnings across all covered companies.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_filing_items',
    description: `Retrieves specific sections (items) from a company's SEC filings (10-K, 10-Q, or 8-K). Useful for extracting detailed information such as Business, Risk Factors, or Financial Statements.`,
    params: [
      {
        name: 'filing_type',
        type: 'string',
        required: true,
        description: `The SEC filing type to retrieve items from.`,
      },
      { name: 'ticker', type: 'string', required: true, description: `The stock ticker symbol.` },
      {
        name: 'accession_number',
        type: 'string',
        required: false,
        description: `The SEC accession number for the specific filing.`,
      },
      {
        name: 'item',
        type: 'string',
        required: false,
        description: `The specific item/section to retrieve from the filing (e.g. item1 for Business).`,
      },
      {
        name: 'quarter',
        type: 'string',
        required: false,
        description: `The fiscal quarter of the filing (applicable to 10-Q filings).`,
      },
      {
        name: 'year',
        type: 'string',
        required: false,
        description: `The fiscal year of the filing.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_filings',
    description: `Get SEC filings data for a stock ticker or CIK. Returns a list of filings including accession number, filing type, report date, and URLs to the filing documents.`,
    params: [
      {
        name: 'cik',
        type: 'string',
        required: false,
        description: `The SEC Central Index Key. Provide either ticker or cik.`,
      },
      {
        name: 'filing_type',
        type: 'string',
        required: false,
        description: `Filter results to a specific SEC filing type.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of filings to return.`,
      },
      {
        name: 'ticker',
        type: 'string',
        required: false,
        description: `The stock ticker symbol. Provide either ticker or cik.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_financial_metrics',
    description: `Retrieves historical financial metrics for a company such as P/E ratio, revenue per share, and enterprise value over a specified period.`,
    params: [
      { name: 'ticker', type: 'string', required: true, description: `The stock ticker symbol.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `The reporting period type.`,
      },
      {
        name: 'report_period',
        type: 'string',
        required: false,
        description: `Filter metrics for an exact report period date (YYYY-MM-DD).`,
      },
      {
        name: 'report_period_gte',
        type: 'string',
        required: false,
        description: `Filter metrics with report period greater than or equal to this date (YYYY-MM-DD).`,
      },
      {
        name: 'report_period_lte',
        type: 'string',
        required: false,
        description: `Filter metrics with report period less than or equal to this date (YYYY-MM-DD).`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_financial_metrics_snapshot',
    description: `Fetches a snapshot of the most current financial metrics for a company, including key indicators like market capitalization, P/E ratio, and dividend yield.`,
    params: [
      { name: 'ticker', type: 'string', required: true, description: `The stock ticker symbol.` },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_income_statement',
    description: `Fetches a company's income statement, detailing its revenues, expenses, and net income over a reporting period.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `The stock ticker symbol to fetch the income statement for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `The reporting period for the income statement.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_index_fund',
    description: `Get ETF and index fund holdings data.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `The ETF or index fund ticker symbol (e.g. SPY, QQQ, VTI).`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_insider_ownership',
    description: `Retrieves insider ownership statements for a company: what officers, directors, and 10% owners actually HOLD (common shares, options, RSUs), sourced from SEC Form 3 (an insider's initial statement of ownership) and Form 5 (the annual statement). Complements get_insider_trades, which covers the buys and sells in between: trades are the events, ownership statements are the state. Positions are returned as reported per filing, newest first. To find available insider names for a ticker, use: https://api.financialdatasets.ai/insider-ownership/names/?ticker={ticker}`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `The stock ticker symbol (e.g., 'AAPL', 'MSFT', 'TSLA')`,
      },
      {
        name: 'filing_date',
        type: 'string',
        required: false,
        description: `Exact filing date filter in YYYY-MM-DD format`,
      },
      {
        name: 'filing_date_gt',
        type: 'string',
        required: false,
        description: `Filing date strictly greater than (YYYY-MM-DD)`,
      },
      {
        name: 'filing_date_gte',
        type: 'string',
        required: false,
        description: `Filing date greater than or equal to (YYYY-MM-DD)`,
      },
      {
        name: 'filing_date_lt',
        type: 'string',
        required: false,
        description: `Filing date strictly less than (YYYY-MM-DD)`,
      },
      {
        name: 'filing_date_lte',
        type: 'string',
        required: false,
        description: `Filing date less than or equal to (YYYY-MM-DD)`,
      },
      {
        name: 'form_type',
        type: 'string',
        required: false,
        description: `Filter by SEC form type: 3 for initial ownership statements (what a new insider owned on day one), 5 for annual statements, or their amendments.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of ownership rows to retrieve (default: 10, max: 1000)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter by insider name (case-insensitive contains, e.g. 'cook'). Use the /insider-ownership/names/?ticker={ticker} endpoint to discover available names for a ticker.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_insider_trades',
    description: `Retrieves insider trading data for a company, showing transactions by executives and directors.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: false,
        description: `The stock ticker symbol to fetch insider trades for.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_institutional_holdings',
    description: `Retrieves institutional holdings data showing the size and value of institutional positions in a company.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: false,
        description: `The stock ticker symbol to fetch institutional holdings data for.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_institutional_investors',
    description: `Retrieves institutional investor data showing which institutions hold positions in a company.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: false,
        description: `The stock ticker symbol to fetch institutional investor data for.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_interest_rates',
    description: `Retrieves current and historical interest rate data from central banks and financial markets.`,
    params: [],
  },
  {
    name: 'financialdatasetsmcp_get_kpi_guidance',
    description: `Retrieves KPI guidance data for a company, showing forward-looking estimates provided by management.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: false,
        description: `The stock ticker symbol to fetch KPI guidance data for.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_kpi_metrics',
    description: `Retrieves KPI metrics for a company, including key performance indicators reported in financial statements.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: false,
        description: `The stock ticker symbol of the company.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_kpi_non_gaap',
    description: `Retrieves non-GAAP KPI data for a company, including adjusted metrics like non-GAAP EPS and operating income.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: false,
        description: `The stock ticker symbol of the company.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_news',
    description: `Retrieves financial news articles related to a company or the broader market.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: false,
        description: `The stock ticker symbol of the company. Omit for general market news.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_segmented_financials',
    description: `Retrieves segmented financial data for a company, showing revenue and profit broken down by business segment or geography.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: false,
        description: `The stock ticker symbol of the company.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_stock_price',
    description: `Retrieves current or historical stock price data for a single ticker.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `The stock ticker symbol to retrieve price data for.`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_get_stock_prices',
    description: `Retrieves stock price data for multiple tickers simultaneously.`,
    params: [
      {
        name: 'ticker',
        type: 'string',
        required: true,
        description: `The stock ticker symbol (e.g. AAPL, MSFT, TSLA).`,
      },
    ],
  },
  {
    name: 'financialdatasetsmcp_list_filing_item_types',
    description: `Provides a list of all available item names that can be extracted from 10-K, 10-Q, and 8-K SEC reports, grouped by filing type.`,
    params: [],
  },
  {
    name: 'financialdatasetsmcp_list_stock_screener_filters',
    description: `Lists all available filters that can be used with the stock screener tool.`,
    params: [],
  },
  {
    name: 'financialdatasetsmcp_screen_stocks',
    description: `Screen stocks based on financial criteria and filters to find companies matching specific metrics.`,
    params: [
      {
        name: 'filters',
        type: 'array',
        required: true,
        description: `List of filter criteria to screen stocks. Each filter has field, operator, and value.`,
      },
    ],
  },
]
