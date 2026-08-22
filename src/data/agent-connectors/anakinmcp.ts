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
    name: 'anakinmcp_ai_visibility_search',
    description: `Ask multiple AI answer engines (ChatGPT, Gemini, Google AI Overview) the same question and compare their answers. Returns one result per engine — status, an answer summary, latency, credits used, and a consensus/outlier verdict — plus an AI-generated synthesis of where the engines agree and diverge. Async; typically completes within 1–2 minutes and this tool polls to completion. Use for brand/AI-SEO visibility checks ("what do AI engines say about X"), answer comparison, and geo-specific AI answers (set country). Billed per source at that Wire action's rate; failed sources are free. Set include_full_content=true only when you need each engine's raw full answer — it is large.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The question to ask every engine (max 2000 characters).`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Two-letter ISO country for the search geography (proxy exit). Defaults to "us".`,
      },
      {
        name: 'include_full_content',
        type: 'boolean',
        required: false,
        description: `Include each engine's raw full answer in the results (large). Defaults to false — summaries and the synthesis are returned regardless.`,
      },
      {
        name: 'sources',
        type: 'array',
        required: false,
        description: `Engine slugs to query (see ai_visibility_sources). Omit to query all enabled engines.`,
      },
    ],
  },
  {
    name: 'anakinmcp_ai_visibility_sources',
    description: `List the AI answer engines available to ai_visibility_search — each with its slug (what you pass as \`sources\`) and display label. Call this when you need to query a subset of engines or check what is currently enabled.`,
    params: [],
  },
  {
    name: 'anakinmcp_browser_task',
    description: `Run a natural-language task in a real cloud browser driven by an AI agent: it navigates, clicks, types, scrolls, and extracts on your behalf ("find the cheapest 65-inch TV on this site and list its specs", "fill the contact form with …"). Use when scrape cannot do the job (multi-step flows, interactions, complex navigation) and no Wire action covers the site (check wire_discover first — Wire actions are faster and cheaper). Async; runs up to ~5 minutes and this tool polls to completion. For login-protected tasks pass session_id from session_list — never put passwords in the prompt. Supply output_schema to get structured JSON back. It does not execute payments or transfer funds; such tasks are refused. Returns the task result plus run metadata (steps taken, duration, run_id).`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `The task in natural language. Be specific about the goal and what to return. Never include passwords or secrets — use session_id for authenticated sites.`,
      },
      {
        name: 'max_steps',
        type: 'integer',
        required: false,
        description: `Cap on agent steps (navigation/click/type actions).`,
      },
      {
        name: 'output_schema',
        type: 'object',
        required: false,
        description: `JSON Schema for the result — the agent returns structured data conforming to it.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `Saved browser-session ID (from session_list) so the task runs logged in.`,
      },
      {
        name: 'timeout_ms',
        type: 'integer',
        required: false,
        description: `Task timeout in milliseconds (server caps runs at ~330s regardless).`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `Navigate here before starting. Omit to let the agent follow URLs named in the prompt.`,
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
    name: 'anakinmcp_monitor_changes',
    description: `Get the detected changes for a monitor — each entry records when the watched content differed from the previous check, with a diff/summary (and the AI change summary when aiMode is on). Use monitor_list first to find the monitor id.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The monitor ID (from monitor_list or monitor_create).`,
      },
    ],
  },
  {
    name: 'anakinmcp_monitor_control',
    description: `Control an existing website monitor: "pause" stops scheduled checks, "resume" restarts them (may hit the plan's active-monitor cap), "run_now" triggers an immediate out-of-schedule check (billed like a normal check), and "delete" permanently removes the monitor and its history. Use monitor_list to find the id.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `What to do with the monitor.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The monitor ID (from monitor_list or monitor_create).`,
      },
    ],
  },
  {
    name: 'anakinmcp_monitor_create',
    description: `Create a scheduled website monitor that checks a URL every intervalMinutes (min 15) and records a change when the content differs — optionally alerting a webhook or email. scope "page" (default) watches one URL; "site" crawls the site each run and tracks pages added/removed/changed; "wire" runs a Wire action each check and diffs its JSON. watchMode "full_page" (2 credits/check) compares the whole page; "specific_data" (3 credits/check) extracts only the fields in outputSchema with AI — ideal for price/stock/status tracking. aiMode (+1 credit/check) filters out trivial noise and summarizes real changes. Active-monitor caps per plan: Free 5, Pro 20, Scale 100.`,
    params: [
      {
        name: 'intervalMinutes',
        type: 'integer',
        required: true,
        description: `Check frequency in minutes. Minimum 15.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL to watch (root URL for site scope; the Wire site's URL for wire scope).`,
      },
      {
        name: 'aiGoal',
        type: 'string',
        required: false,
        description: `Natural-language description of which changes count as meaningful (used with aiMode), e.g. "only when the price drops or it goes out of stock".`,
      },
      {
        name: 'aiMode',
        type: 'boolean',
        required: false,
        description: `AI meaningful-change filtering: ignores trivial noise (ads, timestamps) and summarizes real changes. +1 credit per check.`,
      },
      {
        name: 'alertEmails',
        type: 'string',
        required: false,
        description: `Comma-separated email recipients for change alerts.`,
      },
      {
        name: 'alertWebhookUrl',
        type: 'string',
        required: false,
        description: `Webhook URL that receives signed change alerts.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Two-letter proxy country code. Defaults to "us".`,
      },
      {
        name: 'excludePatterns',
        type: 'array',
        required: false,
        description: `Site scope: glob patterns to skip.`,
      },
      {
        name: 'expiresAt',
        type: 'string',
        required: false,
        description: `Optional end date (ISO 8601 timestamp or YYYY-MM-DD); the monitor auto-pauses when it passes.`,
      },
      {
        name: 'includePatterns',
        type: 'array',
        required: false,
        description: `Site scope: glob patterns or hand-picked same-site URLs to track.`,
      },
      {
        name: 'isActive',
        type: 'boolean',
        required: false,
        description: `Start running immediately. Defaults to true.`,
      },
      {
        name: 'maxDepth',
        type: 'integer',
        required: false,
        description: `Site scope: crawl depth (1–5). Defaults to 2.`,
      },
      {
        name: 'maxPages',
        type: 'integer',
        required: false,
        description: `Site scope: max pages crawled per run.`,
      },
      {
        name: 'outputSchema',
        type: 'object',
        required: false,
        description: `JSON Schema of the fields to track. Required when watchMode is "specific_data".`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `What to monitor: one page (default), a whole site, or a Wire action.`,
      },
      {
        name: 'sessionId',
        type: 'string',
        required: false,
        description: `Saved browser-session ID for monitoring login-protected pages (see session_list).`,
      },
      {
        name: 'useBrowser',
        type: 'boolean',
        required: false,
        description: `Render checks with a stealth headless browser (needed for JS-heavy pages). Forced true when sessionId is set.`,
      },
      {
        name: 'watchFormat',
        type: 'string',
        required: false,
        description: `Format compared in full_page mode. Defaults to markdown.`,
      },
      {
        name: 'watchMode',
        type: 'string',
        required: false,
        description: `Compare the whole page (default) or only the fields in outputSchema, extracted with AI.`,
      },
      {
        name: 'wireActionId',
        type: 'string',
        required: false,
        description: `Wire scope (required there): the Wire action run each check, e.g. "amazon.search_products" (see wire_discover).`,
      },
      {
        name: 'wireCatalogSlug',
        type: 'string',
        required: false,
        description: `Wire scope: catalogue slug of the Wire site.`,
      },
      {
        name: 'wireCredentialId',
        type: 'string',
        required: false,
        description: `Wire scope: credential ID when the action needs auth (see wire_identities).`,
      },
      {
        name: 'wireParams',
        type: 'object',
        required: false,
        description: `Wire scope: parameters passed to the action each check.`,
      },
      {
        name: 'wireWatchPaths',
        type: 'array',
        required: false,
        description: `Wire scope: JSON paths to diff instead of the whole response.`,
      },
    ],
  },
  {
    name: 'anakinmcp_monitor_list',
    description: `List your website monitors, or pass \`id\` to fetch one monitor's full configuration and status (next/last check time, active state, per-check credit cost, alert settings). Use this to find a monitor's id before monitor_changes or monitor_control.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Monitor ID — fetch just this monitor instead of the full list.`,
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
    name: 'anakinmcp_session_delete',
    description: `Permanently delete a saved browser session and its encrypted login data. Irreversible — the user must log in again through the dashboard to recreate it, and any monitors or requests referencing this sessionId will lose authenticated access. Find ids with session_list.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The session ID to delete (from session_list).`,
      },
    ],
  },
  {
    name: 'anakinmcp_session_list',
    description: `List your saved browser sessions — encrypted login states captured via the Anakin dashboard or Browser API. Each session's id is what you pass as sessionId to scrape/crawl, monitor_create, or browser_task to work with login-protected pages. Optionally filter by the website domain the session belongs to. If no session exists for a site, the user must create one interactively in the dashboard (log in once; 2FA/captchas included) — that flow cannot run from here.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Filter to sessions for one website domain, e.g. "amazon.com".`,
      },
    ],
  },
  {
    name: 'anakinmcp_wire_build',
    description: `Request a brand-new Wire action for a website that isn't in the catalog yet. Describe the site (\`website_url\`) and what the action should do or extract (\`goal\`); Wire generates and auto-tests a scraper, then publishes it. Asynchronous (returns status "pending") and charges credits, refunded automatically if the build fails. Only use this after wire_discover / wire_catalog confirm no existing action covers the site.`,
    params: [
      {
        name: 'goal',
        type: 'string',
        required: true,
        description: `Natural-language description of what the action should do or extract. Be specific — the builder synthesizes the scraper from this.`,
      },
      {
        name: 'website_url',
        type: 'string',
        required: true,
        description: `The site to build an action for. The domain is extracted automatically.`,
      },
      {
        name: 'catalog_id',
        type: 'string',
        required: false,
        description: `Optional — attach to an existing catalog instead of creating one.`,
      },
      {
        name: 'force',
        type: 'boolean',
        required: false,
        description: `Build even if similar actions already exist for the domain (otherwise the request is rejected with ACTION_EXISTS).`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Action visibility. Defaults to private.`,
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
    name: 'anakinmcp_wire_login',
    description: `Sign in to a credentials-mode site and get a credential_id usable immediately with wire_read_action / wire_write_action. Provide the catalog \`slug\` and login \`params\` (the fields that catalog's login schema defines, e.g. email/password — see wire_catalog's login_input_schema). The password is never stored, only the encrypted session. Only needed for actions whose auth_mode is "required", and only for catalogs that support password sign-in; cookie-based sites use the dashboard connect flow instead.`,
    params: [
      {
        name: 'catalog_slug',
        type: 'string',
        required: true,
        description: `The catalog to sign in to (e.g. "neb").`,
      },
      {
        name: 'identity_name',
        type: 'string',
        required: false,
        description: `Optional name for the identity. Derived from params in password mode; required when using a 1Password locator.`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Login fields defined by the catalog (e.g. { email, password }). Use wire_catalog's login_input_schema to learn the field names.`,
      },
      {
        name: 'source_id',
        type: 'string',
        required: false,
        description: `Optional 1Password identity-source ID (alternative to params).`,
      },
      {
        name: 'source_ref',
        type: 'object',
        required: false,
        description: `Optional 1Password item locator { vault_id, item_id, fields } (use with source_id instead of params).`,
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
  {
    name: 'anakinmcp_wire_write_action',
    description: `Run a Wire WRITE action — one whose type is "write" (it performs a state-changing interaction on the target site): submit a form, add an item to a cart, post or send content, update account settings. Discover action_ids first with wire_discover or wire_catalog and confirm the action's type is "write"; \`params\` must match that action's parameter schema. Most write actions need auth — pass a \`credential_id\` from wire_identities or wire_login. This tool transparently polls the async job to completion and returns its result. It does not execute payments or transfer funds; such actions are refused. For data extraction that does not change state (type "read") use wire_read_action instead.`,
    params: [
      {
        name: 'action_id',
        type: 'string',
        required: true,
        description: `The action to run (from wire_discover / wire_catalog). Must be an action whose type is "write".`,
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
