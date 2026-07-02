import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'scarpflymcp_browser_unblock',
    description: `Unblock a URL using a headless browser with anti-scraping protection. Returns the page content after bypassing bot detection.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `Target URL to fetch or interact with.` },
      { name: 'country', type: 'string', required: false, description: `Two-letter ISO 3166-1 alpha-2 country code for the proxy exit node (e.g. US, DE, FR).` },
      { name: 'timeout', type: 'integer', required: false, description: `Server-side timeout in milliseconds. Use alongside rendering_wait for JS-heavy pages.` },
    ],
  },
  {
    name: 'scarpflymcp_call_webmcp_tool',
    description: `Call a specific tool from a connected remote WebMCP server by name with provided input.`,
    params: [
      { name: 'tool_name', type: 'string', required: true, description: `Name of the WebMCP tool to call (from list_webmcp_tools)` },
      { name: 'input', type: 'string', required: false, description: `JSON-stringified parameters to pass to the tool. Omit for tools with no parameters.` },
    ],
  },
  {
    name: 'scarpflymcp_check_if_blocked',
    description: `Check whether a URL returns blocked or captcha content by scraping it and analyzing the response.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `Page content (HTML/text) from a scrape result. Use raw or clean_html format for best detection accuracy.` },
      { name: 'url', type: 'string', required: true, description: `Target URL to fetch or interact with.` },
      { name: 'country', type: 'string', required: false, description: `Two-letter ISO 3166-1 alpha-2 country code for the proxy exit node (e.g. US, DE, FR).` },
      { name: 'extraction_model', type: 'string', required: false, description: `Pre-built AI extraction model to apply. Accepted values: article, event, food_recipe, hotel, product, job_posting, organization, and more.` },
      { name: 'format', type: 'string', required: false, description: `Output format for the scraped content. Accepted values: markdown, text, clean_html, json, raw.` },
      { name: 'format_options', type: 'array', required: false, description: `Additional options (only available for markdown and text formats)` },
      { name: 'proxy_pool', type: 'string', required: false, description: `Proxy pool to route the request through. Accepted values: public_datacenter_pool, public_residential_pool.` },
      { name: 'rendering_wait', type: 'integer', required: false, description: `Milliseconds to wait after JS rendering before returning the response.` },
      { name: 'response_headers', type: 'object', required: false, description: `Response headers from the scrape result. Enables header-based antibot detection.` },
      { name: 'status_code', type: 'integer', required: false, description: `HTTP status code from the scrape result (e.g. 403, 429, 503). Defaults to 200. Improves detection accuracy.` },
    ],
  },
  {
    name: 'scarpflymcp_click',
    description: `Click an element in the active cloud browser session. Requires a uid obtained from take_snapshot.`,
    params: [
      { name: 'uid', type: 'string', required: true, description: `Element UID from take_snapshot. Used to target a specific element for interaction.` },
    ],
  },
  {
    name: 'scarpflymcp_cloud_browser_close',
    description: `Close an active cloud browser session by session ID to free up resources.`,
    params: [
      { name: 'session_id', type: 'string', required: true, description: `Active cloud browser session ID. Obtain from cloud_browser_open.` },
      { name: 'user_close_request', type: 'string', required: true, description: `Verbatim quote of the user's close instruction (e.g. "close the session", "stop the browser"). Must contain at least one of: close, end, stop, terminate, dispose, shut down, kill, quit, exit, fermer, arrêter, terminer. Rejected if empty or meta-phrase.` },
    ],
  },
  {
    name: 'scarpflymcp_cloud_browser_downloads',
    description: `Retrieve files downloaded during an active cloud browser session.`,
    params: [
      { name: 'filename', type: 'string', required: false, description: `No description.` },
      { name: 'session_id', type: 'string', required: false, description: `Active cloud browser session ID. Obtain from cloud_browser_open.` },
    ],
  },
  {
    name: 'scarpflymcp_cloud_browser_eval',
    description: `Fetch a URL in a cloud browser session and optionally execute JavaScript, with full scraping options available.`,
    params: [
      { name: 'expression', type: 'string', required: true, description: `JavaScript expression to evaluate in the browser page.` },
      { name: 'country', type: 'string', required: false, description: `Two-letter ISO 3166-1 alpha-2 country code for the proxy exit node (e.g. US, DE, FR).` },
      { name: 'extraction_model', type: 'string', required: false, description: `Pre-built AI extraction model to apply. Accepted values: article, event, food_recipe, hotel, product, job_posting, organization, and more.` },
      { name: 'format', type: 'string', required: false, description: `Output format for the scraped content. Accepted values: markdown, text, clean_html, json, raw.` },
      { name: 'format_options', type: 'array', required: false, description: `Additional options (only available for markdown and text formats)` },
      { name: 'proxy_pool', type: 'string', required: false, description: `Proxy pool to route the request through. Accepted values: public_datacenter_pool, public_residential_pool.` },
      { name: 'rendering_wait', type: 'integer', required: false, description: `Milliseconds to wait after JS rendering before returning the response.` },
      { name: 'session_id', type: 'string', required: false, description: `Active cloud browser session ID. Obtain from cloud_browser_open.` },
      { name: 'url', type: 'string', required: false, description: `Target URL to fetch or interact with.` },
    ],
  },
  {
    name: 'scarpflymcp_cloud_browser_navigate',
    description: `Navigate an active cloud browser session to a new URL.`,
    params: [
      { name: 'session_id', type: 'string', required: true, description: `Active cloud browser session ID. Obtain from cloud_browser_open.` },
      { name: 'url', type: 'string', required: true, description: `Target URL to fetch or interact with.` },
      { name: 'url_source', type: 'string', required: true, description: `Where this URL came from. user_prompt = user named it; page_snapshot = found in last take_snapshot; webmcp_tool = returned by a WebMCP tool. Any other provenance means the URL was invented and the call will be rejected.` },
    ],
  },
  {
    name: 'scarpflymcp_cloud_browser_open',
    description: `Open a cloud browser session on a URL for multi-step interaction such as clicking, filling forms, and navigating pages.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `Target URL to fetch or interact with.` },
      { name: 'blacklist', type: 'boolean', required: false, description: `No description.` },
      { name: 'block_fonts', type: 'boolean', required: false, description: `No description.` },
      { name: 'block_images', type: 'boolean', required: false, description: `No description.` },
      { name: 'block_media', type: 'boolean', required: false, description: `No description.` },
      { name: 'block_styles', type: 'boolean', required: false, description: `No description.` },
      { name: 'cache', type: 'boolean', required: false, description: `No description.` },
      { name: 'country', type: 'string', required: false, description: `Two-letter ISO 3166-1 alpha-2 country code for the proxy exit node (e.g. US, DE, FR).` },
      { name: 'debug', type: 'boolean', required: false, description: `No description.` },
      { name: 'optimize_bandwidth', type: 'boolean', required: false, description: `No description.` },
      { name: 'proxy_pool', type: 'string', required: false, description: `Proxy pool to route the request through. Accepted values: public_datacenter_pool, public_residential_pool.` },
      { name: 'timeout', type: 'integer', required: false, description: `Server-side timeout in milliseconds. Use alongside rendering_wait for JS-heavy pages.` },
    ],
  },
  {
    name: 'scarpflymcp_cloud_browser_performance',
    description: `Get Core Web Vitals and performance metrics for the current page in a cloud browser session.`,
    params: [
      { name: 'preset', type: 'string', required: false, description: `No description.` },
      { name: 'session_id', type: 'string', required: false, description: `Active cloud browser session ID. Obtain from cloud_browser_open.` },
      { name: 'timeout_ms', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'scarpflymcp_cloud_browser_screenshot',
    description: `Take a screenshot of the current page in an active cloud browser session.`,
    params: [
      { name: 'country', type: 'string', required: false, description: `Two-letter ISO 3166-1 alpha-2 country code for the proxy exit node (e.g. US, DE, FR).` },
      { name: 'extraction_model', type: 'string', required: false, description: `Pre-built AI extraction model to apply. Accepted values: article, event, food_recipe, hotel, product, job_posting, organization, and more.` },
      { name: 'format', type: 'string', required: false, description: `Output format for the scraped content. Accepted values: markdown, text, clean_html, json, raw.` },
      { name: 'format_options', type: 'array', required: false, description: `Additional options (only available for markdown and text formats)` },
      { name: 'full_page', type: 'boolean', required: false, description: `Capture the full scrollable page, not just the viewport. Default: false.` },
      { name: 'proxy_pool', type: 'string', required: false, description: `Proxy pool to route the request through. Accepted values: public_datacenter_pool, public_residential_pool.` },
      { name: 'rendering_wait', type: 'integer', required: false, description: `Milliseconds to wait after JS rendering before returning the response.` },
      { name: 'selector', type: 'string', required: false, description: `CSS selector of an element to screenshot. If provided, only that element is captured.` },
      { name: 'session_id', type: 'string', required: false, description: `Active cloud browser session ID. Obtain from cloud_browser_open.` },
      { name: 'url', type: 'string', required: false, description: `Target URL to fetch or interact with.` },
    ],
  },
  {
    name: 'scarpflymcp_cloud_browser_sessions',
    description: `List all active cloud browser sessions for the current account.`,
    params: [
    ],
  },
  {
    name: 'scarpflymcp_drag',
    description: `Drag an element to another element in the active cloud browser session. Requires uids obtained from take_snapshot.`,
    params: [
      { name: 'from_uid', type: 'string', required: true, description: `Element UID to drag from. Obtain via take_snapshot.` },
      { name: 'to_uid', type: 'string', required: true, description: `Element UID to drag to. Obtain via take_snapshot.` },
    ],
  },
  {
    name: 'scarpflymcp_evaluate_script',
    description: `Evaluate a JavaScript expression in the active cloud browser session and return the result.`,
    params: [
      { name: 'expression', type: 'string', required: true, description: `JavaScript expression to evaluate` },
    ],
  },
  {
    name: 'scarpflymcp_fill',
    description: `Fill a form field in the active cloud browser session. Requires a uid obtained from take_snapshot.`,
    params: [
      { name: 'uid', type: 'string', required: true, description: `Element UID from take_snapshot. Used to target a specific element for interaction.` },
      { name: 'value', type: 'string', required: true, description: `Text to fill in` },
    ],
  },
  {
    name: 'scarpflymcp_get_page_url',
    description: `Get the current URL of the active cloud browser session.`,
    params: [
      { name: 'dummy', type: 'string', required: false, description: `Unused placeholder field required by the MCP protocol. Pass any string value.` },
    ],
  },
  {
    name: 'scarpflymcp_hover',
    description: `Hover over an element in the active cloud browser session. Requires a uid obtained from take_snapshot.`,
    params: [
      { name: 'uid', type: 'string', required: true, description: `Element UID from take_snapshot. Used to target a specific element for interaction.` },
    ],
  },
  {
    name: 'scarpflymcp_info_account',
    description: `Retrieve Scrapfly account details including plan, remaining credits, and usage limits.`,
    params: [
      { name: 'dummy', type: 'string', required: false, description: `Unused placeholder field required by the MCP protocol. Pass any string value.` },
    ],
  },
  {
    name: 'scarpflymcp_info_api_key',
    description: `Retrieve information about the current Scrapfly API key including permissions and rate limits.`,
    params: [
      { name: 'dummy', type: 'string', required: false, description: `Unused placeholder field required by the MCP protocol. Pass any string value.` },
    ],
  },
  {
    name: 'scarpflymcp_inspect_page',
    description: `Inspect the current page in a cloud browser session and optionally answer a question about its content.`,
    params: [
      { name: 'full_page', type: 'boolean', required: false, description: `No description.` },
      { name: 'question', type: 'string', required: false, description: `No description.` },
      { name: 'session_id', type: 'string', required: false, description: `Active cloud browser session ID. Obtain from cloud_browser_open.` },
    ],
  },
  {
    name: 'scarpflymcp_list_webmcp_tools',
    description: `List all tools available on the connected remote WebMCP server.`,
    params: [
      { name: 'dummy', type: 'string', required: false, description: `Unused placeholder field required by the MCP protocol. Pass any string value.` },
    ],
  },
  {
    name: 'scarpflymcp_press_key',
    description: `Press a keyboard key in the active cloud browser session (e.g. Enter, Tab, Escape).`,
    params: [
      { name: 'key', type: 'string', required: true, description: `Key to press: Enter, Tab, Escape, ArrowDown, etc.` },
    ],
  },
  {
    name: 'scarpflymcp_scraping_instruction_enhanced',
    description: `Get enhanced instructions on how to configure Scrapfly options for a specific scraping task or target site.`,
    params: [
      { name: 'dummy', type: 'string', required: false, description: `Unused placeholder field required by the MCP protocol. Pass any string value.` },
    ],
  },
  {
    name: 'scarpflymcp_screenshot',
    description: `Take a screenshot of a URL using Scrapfly's headless browser. Supports full-page capture, custom resolution, and visual deficiency simulation.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `Target URL to fetch or interact with.` },
      { name: 'auto_scroll', type: 'boolean', required: false, description: `If true, automatically scroll the page to load lazy content.` },
      { name: 'cache', type: 'boolean', required: false, description: `If true, enable response caching.` },
      { name: 'cache_clear', type: 'boolean', required: false, description: `If true, bypass & clear cache for this request.` },
      { name: 'cache_ttl', type: 'integer', required: false, description: `The cache time-to-live in seconds.` },
      { name: 'capture', type: 'string', required: false, description: `The capture to use for the screenshot. Either fullpage or a CSS selector	` },
      { name: 'country', type: 'string', required: false, description: `Two-letter ISO 3166-1 alpha-2 country code for the proxy exit node (e.g. US, DE, FR).` },
      { name: 'format', type: 'string', required: false, description: `Image format for the screenshot. Accepted values: jpg, png, webp, gif.` },
      { name: 'js', type: 'string', required: false, description: `JavaScript code to execute on the page after load.` },
      { name: 'options', type: 'array', required: false, description: `Screenshot options to use for the screenshot.` },
      { name: 'rendering_wait', type: 'integer', required: false, description: `Milliseconds to wait after JS rendering before returning the response.` },
      { name: 'resolution', type: 'string', required: false, description: `The resolution to use for the screenshot. e.g. 1920x1080` },
      { name: 'vision_deficiency_type', type: 'string', required: false, description: `The vision deficiency to use for the screenshot.` },
      { name: 'wait_for_selector', type: 'string', required: false, description: `CSS selector to wait for before returning the response. Use when the target content loads asynchronously.` },
      { name: 'webhook', type: 'string', required: false, description: `The webhook to call after the request completes.` },
    ],
  },
  {
    name: 'scarpflymcp_scroll',
    description: `Scroll the page or a specific element in the active cloud browser session by pixel delta.`,
    params: [
      { name: 'deltaX', type: 'number', required: false, description: `Horizontal scroll pixels (optional)` },
      { name: 'deltaY', type: 'number', required: false, description: `Vertical scroll pixels (optional, e.g. 500 to scroll down)` },
      { name: 'uid', type: 'string', required: false, description: `Element UID from take_snapshot. Used to target a specific element for interaction.` },
    ],
  },
  {
    name: 'scarpflymcp_select_option',
    description: `Select an option in a dropdown element in the active cloud browser session. Requires a uid obtained from take_snapshot.`,
    params: [
      { name: 'uid', type: 'string', required: true, description: `Element UID from take_snapshot. Used to target a specific element for interaction.` },
      { name: 'value', type: 'string', required: true, description: `Option value or text to select` },
    ],
  },
  {
    name: 'scarpflymcp_take_screenshot',
    description: `Take a screenshot of the current page in the active cloud browser session.`,
    params: [
      { name: 'dummy', type: 'string', required: false, description: `Unused placeholder field required by the MCP protocol. Pass any string value.` },
    ],
  },
  {
    name: 'scarpflymcp_take_snapshot',
    description: `Take a DOM snapshot of the current page in the cloud browser session. Returns element uids needed for click, fill, hover, drag, and scroll operations.`,
    params: [
      { name: 'dummy', type: 'string', required: false, description: `Unused placeholder field required by the MCP protocol. Pass any string value.` },
    ],
  },
  {
    name: 'scarpflymcp_type_text',
    description: `Type text at the current cursor position in the active cloud browser session.`,
    params: [
      { name: 'text', type: 'string', required: true, description: `Text to type` },
    ],
  },
  {
    name: 'scarpflymcp_web_get_page',
    description: `Quickly fetch a URL with sensible defaults and return the page content. Best for simple one-shot page retrieval.`,
    params: [
      { name: 'pow', type: 'string', required: true, description: `Proof-of-work token for anti-bot bypass. Use scraping_instruction_enhanced to get guidance on the correct value.` },
      { name: 'url', type: 'string', required: true, description: `Target URL to fetch or interact with.` },
      { name: 'capture_flags', type: 'array', required: false, description: `Screenshot flags to use for the screenshot.` },
      { name: 'capture_page', type: 'boolean', required: false, description: `If true, also capture the page as a screenshot.` },
      { name: 'country', type: 'string', required: false, description: `Two-letter ISO 3166-1 alpha-2 country code for the proxy exit node (e.g. US, DE, FR).` },
      { name: 'extraction_model', type: 'string', required: false, description: `Pre-built AI extraction model to apply. Accepted values: article, event, food_recipe, hotel, product, job_posting, organization, and more.` },
      { name: 'format', type: 'string', required: false, description: `Output format for the scraped content. Accepted values: markdown, text, clean_html, json, raw.` },
      { name: 'format_options', type: 'array', required: false, description: `Additional options (only available for markdown and text formats)` },
      { name: 'proxy_pool', type: 'string', required: false, description: `Proxy pool to route the request through. Accepted values: public_datacenter_pool, public_residential_pool.` },
      { name: 'rendering_wait', type: 'integer', required: false, description: `Milliseconds to wait after JS rendering before returning the response.` },
    ],
  },
  {
    name: 'scarpflymcp_web_scrape',
    description: `Fetch a URL with full control over headers, JS rendering, proxy country, anti-scraping protection, and output format.`,
    params: [
      { name: 'pow', type: 'string', required: true, description: `Proof-of-work token for anti-bot bypass. Use scraping_instruction_enhanced to get guidance on the correct value.` },
      { name: 'url', type: 'string', required: true, description: `Target URL to fetch or interact with.` },
      { name: 'asp', type: 'boolean', required: false, description: `Enable Anti Scraping Protection.` },
      { name: 'body', type: 'string', required: false, description: `Request body for POST/PUT/PATCH requests.` },
      { name: 'cache', type: 'boolean', required: false, description: `Enable caching of the response.` },
      { name: 'cache_clear', type: 'boolean', required: false, description: `If true, bypass & clear cache for this URL.` },
      { name: 'cache_ttl', type: 'integer', required: false, description: `Cache TTL in seconds when cache is true.` },
      { name: 'cookies', type: 'string', required: false, description: `Cookies to send with the request.` },
      { name: 'country', type: 'string', required: false, description: `Two-letter ISO 3166-1 alpha-2 country code for the proxy exit node (e.g. US, DE, FR).` },
      { name: 'extraction_model', type: 'string', required: false, description: `Pre-built AI extraction model to apply. Accepted values: article, event, food_recipe, hotel, product, job_posting, organization, and more.` },
      { name: 'extraction_prompt', type: 'string', required: false, description: `Custom AI prompt for extracting specific data from the page. Avoid if the model can process the data directly.` },
      { name: 'format', type: 'string', required: false, description: `Output format for the scraped content. Accepted values: markdown, text, clean_html, json, raw.` },
      { name: 'format_options', type: 'array', required: false, description: `Additional options (only available for markdown and text formats)` },
      { name: 'headers', type: 'object', required: false, description: `HTTP headers to send.` },
      { name: 'js', type: 'string', required: false, description: `JavaScript code to execute on the page after load.` },
      { name: 'js_scenario', type: 'array', required: false, description: `A schema for validating a sequence of browser actions (JS Scenario) for the Scrapfly API.` },
      { name: 'lang', type: 'array', required: false, description: `Languages to use for the request (Accept-Language header). Empty for auto-detection/Proxy Location alignment` },
      { name: 'method', type: 'string', required: false, description: `HTTP method for the request. Accepted values: GET, POST, PUT, PATCH, OPTIONS, HEAD.` },
      { name: 'proxy_pool', type: 'string', required: false, description: `Proxy pool to route the request through. Accepted values: public_datacenter_pool, public_residential_pool.` },
      { name: 'render_js', type: 'boolean', required: false, description: `Enable JavaScript rendering with a headless browser.` },
      { name: 'rendering_wait', type: 'integer', required: false, description: `Milliseconds to wait after JS rendering before returning the response.` },
      { name: 'retry', type: 'boolean', required: false, description: `If false, disable automatic retry on transient errors.` },
      { name: 'screenshot_flags', type: 'array', required: false, description: `Screenshot flags to use for the screenshot.` },
      { name: 'screenshots', type: 'string', required: false, description: `Screenshots with target (fullpage, selector). Example: [{ 'name': 'my_screenshot', 'target': 'fullpage' }, { 'name': 'my_screenshot2', 'target': 'selector', 'css_selector': '#price' }]` },
      { name: 'timeout', type: 'integer', required: false, description: `Server-side timeout in milliseconds. Use alongside rendering_wait for JS-heavy pages.` },
      { name: 'wait_for_selector', type: 'string', required: false, description: `CSS selector to wait for before returning the response. Use when the target content loads asynchronously.` },
    ],
  },
]
