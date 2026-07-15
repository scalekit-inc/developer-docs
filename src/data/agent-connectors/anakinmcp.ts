import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'anakinmcp_agentic_search',
    description: `Run multi-source deep research. The pipeline searches the web, scrapes the most relevant citations, and uses an LLM to structure the combined data into a unified answer. Async — typically 1–5 minutes. Use this when one URL or a flat search result will not answer the question (comparative analysis, multi-jurisdictional research, market intelligence). Returns a summary plus structured_data conforming to the inferred or supplied schema.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `The research question or task in natural language.`,
      },
      {
        name: 'schema',
        type: 'object',
        required: false,
        description: `Optional JSON Schema describing the desired output shape. If omitted, the engine infers a schema from the prompt.`,
      },
      {
        name: 'useBrowser',
        type: 'boolean',
        required: false,
        description: `Use the headless browser when scraping cited pages (more reliable for JS-heavy sources). Defaults to true.`,
      },
    ],
  },
  {
    name: 'anakinmcp_crawl',
    description: `Bulk-fetch markdown across a site. Use this when an agent needs the contents of many pages at once (catalog ingestion, site-wide RAG corpus). Pair with includePatterns / excludePatterns to scope which URLs are fetched. Returns an array of pages each with markdown and per-page status.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `Starting URL.` },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Two-letter proxy egress country code.`,
      },
      {
        name: 'depth',
        type: 'integer',
        required: false,
        description: `Link-hops from the starting URL to follow.`,
      },
      {
        name: 'excludePatterns',
        type: 'array',
        required: false,
        description: `Glob/regex patterns. URLs matching any pattern are skipped.`,
      },
      {
        name: 'includePatterns',
        type: 'array',
        required: false,
        description: `Glob/regex patterns. Only URLs matching at least one pattern are fetched.`,
      },
      {
        name: 'maxPages',
        type: 'integer',
        required: false,
        description: `Hard cap on pages fetched. Defaults to 10.`,
      },
      {
        name: 'sessionId',
        type: 'string',
        required: false,
        description: `Optional saved-browser-session ID for login-protected sites.`,
      },
      {
        name: 'sessionName',
        type: 'string',
        required: false,
        description: `Optional saved-browser-session name.`,
      },
      {
        name: 'useBrowser',
        type: 'boolean',
        required: false,
        description: `Render each page in a headless browser (for SPAs).`,
      },
    ],
  },
  {
    name: 'anakinmcp_map',
    description: `Discover all reachable URLs under a given site. Useful for understanding a domain's structure before crawling, or finding the sub-pages an agent should scrape. Returns lists of internal links, external links, and counts. Honors depth and limit parameters.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The starting URL for discovery (typically a homepage or section root).`,
      },
      {
        name: 'depth',
        type: 'integer',
        required: false,
        description: `How many link-hops from the starting URL to follow.`,
      },
      {
        name: 'includeExternalLinks',
        type: 'boolean',
        required: false,
        description: `Also collect (but do not follow) external links.`,
      },
      {
        name: 'includeSubdomains',
        type: 'boolean',
        required: false,
        description: `Include URLs on subdomains of the starting host.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of URLs to return overall.`,
      },
      {
        name: 'limitPerLevel',
        type: 'integer',
        required: false,
        description: `Maximum URLs collected per depth level (controls breadth).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Optional keyword filter — only return URLs whose path/title matches.`,
      },
      {
        name: 'useBrowser',
        type: 'boolean',
        required: false,
        description: `Render with a headless browser (for SPAs).`,
      },
    ],
  },
  {
    name: 'anakinmcp_scrape',
    description: `Fetch a single URL and return clean markdown by default. Set generateJson=true to also extract structured data with AI. Set useBrowser=true for SPAs and JS-heavy sites (slower and more expensive — only when needed). Returns markdown unless generateJson is true, in which case it returns the structured JSON.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `The URL to scrape.` },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Two-letter country code for the proxy egress location (e.g. "us", "de", "in"). Defaults to "us".`,
      },
      {
        name: 'forceFresh',
        type: 'boolean',
        required: false,
        description: `Skip the cache and refetch. Defaults to false; cached results are typically good for 24h.`,
      },
      {
        name: 'generateJson',
        type: 'boolean',
        required: false,
        description: `Have AI extract structured JSON from the page in addition to / instead of markdown. Use for product pages, listings, articles, anywhere the caller wants typed fields.`,
      },
      {
        name: 'sessionId',
        type: 'string',
        required: false,
        description: `Optional saved-browser-session ID for login-protected pages. Pair with useBrowser=true.`,
      },
      {
        name: 'sessionName',
        type: 'string',
        required: false,
        description: `Optional saved-browser-session name (alternative to sessionId).`,
      },
      {
        name: 'useBrowser',
        type: 'boolean',
        required: false,
        description: `Render the page with a stealth headless browser. Required for SPAs and dynamic content; otherwise prefer the default (fetch-based) for speed and lower cost.`,
      },
    ],
  },
  {
    name: 'anakinmcp_search',
    description: `Run an AI web search and return result URLs, titles, and snippets. Synchronous — returns immediately, no polling. Use this when the agent needs to discover pages relevant to a query before scraping. Returns a results array with url/title/snippet/date for each hit.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `The search query in natural language.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
    ],
  },
  {
    name: 'anakinmcp_wire_catalog',
    description: `Browse the Wire catalog. With no arguments, lists every supported website and its action count. Pass a catalog slug (e.g. "walmart", "amazon", "linkedin") to get that site's full action list with exact parameter schemas, each action's type (read/write), auth mode (none/optional/required), and credit cost — plus the login fields for credentials-mode sites.`,
    params: [
      {
        name: 'slug',
        type: 'string',
        required: false,
        description: `Catalog slug to inspect (e.g. "walmart"). Omit to list all catalogs.`,
      },
    ],
  },
  {
    name: 'anakinmcp_wire_discover',
    description: `Find Wire actions for a task from a natural-language intent. Wire is a catalog of pre-built automation actions across hundreds of websites (Amazon, Walmart, LinkedIn, Airbnb, Zillow, and others). Actions are of two kinds: READ actions that extract data and WRITE actions that perform interactions. Returns ranked candidate actions, each with its action_id, type ("read" or "write"), required/optional params, credit cost, and whether auth is needed.`,
    params: [
      {
        name: 'q',
        type: 'string',
        required: true,
        description: `The intent in natural language, e.g. "top phones on walmart", "search airbnb listings in Lisbon", "a linkedin profile's work history".`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of candidate actions to return.`,
      },
    ],
  },
  {
    name: 'anakinmcp_wire_identities',
    description: `List your saved Wire identities and their credentials. An identity is a named account on a site; each credential's id is the credential_id you pass to wire_read_action / wire_write_action to run actions whose auth_mode is "required". Optionally filter by catalog_id. Use this to find an existing credential before running an auth-required action (and check its status is "active", not "expired").`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: false,
        description: `Optional — restrict to identities for a single catalog.`,
      },
    ],
  },
  {
    name: 'anakinmcp_wire_read_action',
    description: `Run a Wire READ action — one whose type is "read" (it EXTRACTS data and does not change state on the target site): search listings, fetch a category's products, get a product's price/specs/reviews, read a profile, pull dashboard metrics. Discover action_ids first with wire_discover or wire_catalog. This tool transparently polls the async job to completion and returns the extracted data.`,
    params: [
      {
        name: 'action_id',
        type: 'string',
        required: true,
        description: `The action to run (from wire_discover / wire_catalog).`,
      },
      {
        name: 'credential_id',
        type: 'string',
        required: false,
        description: `Required when the action's auth_mode is "required"; honored when "optional"; ignored when "none". Get one from wire_identities or wire_login.`,
      },
      {
        name: 'identity_id',
        type: 'string',
        required: false,
        description: `Optional identity selector — the server resolves a credential from it (alternative to credential_id).`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `The action's input parameters. Shape depends on the action — use its parameter schema from discovery. Omit for actions that take none.`,
      },
    ],
  },
]
