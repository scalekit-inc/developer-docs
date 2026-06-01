import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'zenrowsmcp_browser_batch',
    description: `Execute a sequence of browser actions in a single call against an existing session. Actions run sequentially and stop at the first failure unless stop_on_error is false.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Ordered list of actions to perform. Each action has a 'type' field plus type-specific parameters.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'stop_on_error',
        type: 'boolean',
        required: false,
        description: `If true (default), stop executing actions when one fails. Set false to continue on errors.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_check',
    description: `Check a checkbox or radio button by CSS selector.`,
    params: [
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_clear_cookies',
    description: `Clear all cookies for the current browser session.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_click',
    description: `Click an element identified by a CSS selector.`,
    params: [
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_close',
    description: `Close a browser session and free its resources. Always call this when done to avoid session leaks.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_drag',
    description: `Drag an element from a source to a target CSS selector.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'source_selector',
        type: 'string',
        required: true,
        description: `CSS selector for the element to drag from.`,
      },
      {
        name: 'target_selector',
        type: 'string',
        required: true,
        description: `CSS selector for the element to drop onto.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_evaluate',
    description: `Execute a JavaScript expression in the page context and return its result.`,
    params: [
      {
        name: 'script',
        type: 'string',
        required: true,
        description: `JavaScript expression to evaluate in the page context. Return value is serialized to JSON.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_fill',
    description: `Fill an input, textarea, or contenteditable element with text.`,
    params: [
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `Text value to set (fill) or option value to select.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_focus',
    description: `Move keyboard focus to an element identified by a CSS selector.`,
    params: [
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_generate_pdf',
    description: `Render the current page as a PDF document.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'landscape',
        type: 'boolean',
        required: false,
        description: `Render PDF in landscape orientation (default false).`,
      },
      {
        name: 'print_background',
        type: 'boolean',
        required: false,
        description: `Include CSS background graphics in the PDF (default false).`,
      },
      {
        name: 'scale',
        type: 'number',
        required: false,
        description: `Page scale factor for PDF rendering, 0.1–2 (default 1).`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_get_accessibility_tree',
    description: `Return the accessibility tree of the current page for element discovery and screen-reader testing.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_get_attribute',
    description: `Get the value of a specific HTML attribute from an element matching a CSS selector.`,
    params: [
      {
        name: 'attribute',
        type: 'string',
        required: true,
        description: `HTML attribute name to read, e.g. href, src, data-id.`,
      },
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_get_cookies',
    description: `Return all cookies set in the current browser session.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_get_html',
    description: `Return the outer HTML of an element or the full page if no selector is given.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'selector',
        type: 'string',
        required: false,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_get_text',
    description: `Return the visible text content of an element or the full page if no selector is given.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'selector',
        type: 'string',
        required: false,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_get_title',
    description: `Return the current page title.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_get_url',
    description: `Return the current page URL.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_go_back',
    description: `Navigate to the previous page in the browser history.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_go_forward',
    description: `Navigate to the next page in the browser history.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_hover',
    description: `Move the mouse pointer over an element identified by a CSS selector.`,
    params: [
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_local_storage',
    description: `Read, write, or clear localStorage in the current page context.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Operation: get a value, set a value, or clear all`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'key',
        type: 'string',
        required: false,
        description: `localStorage key to read or write.`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `Text value to set (fill) or option value to select.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_navigate',
    description: `Open a ZenRows browser session and navigate to a URL. Returns a session_id required by all subsequent browser_* tools; always call browser_close when done.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Full URL to navigate to or scrape (must include scheme, e.g. https://).`,
      },
      {
        name: 'proxy_country',
        type: 'string',
        required: false,
        description: `ISO 3166-1 alpha-2 country code for geo-targeted proxy, e.g. US, GB, DE.`,
      },
      {
        name: 'proxy_region',
        type: 'string',
        required: false,
        description: `World region for geo-targeted proxy: eu, na, ap, sa, af, or me.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_new_tab',
    description: `Open a new browser tab and navigate to a URL in the current session.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `Full URL to navigate to or scrape (must include scheme, e.g. https://).`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_press_key',
    description: `Simulate pressing a keyboard key, optionally combined with modifier keys.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `localStorage key to read or write.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_query_selector_all',
    description: `Return all elements matching a CSS selector as an array of handles.`,
    params: [
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_reload',
    description: `Reload the current page.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_screenshot',
    description: `Capture a screenshot of the current page or a specific element.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'full_page',
        type: 'boolean',
        required: false,
        description: `Capture the full scrollable page, not just the visible viewport.`,
      },
      {
        name: 'selector',
        type: 'string',
        required: false,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_scroll',
    description: `Scroll the page in a given direction by a specified pixel distance.`,
    params: [
      { name: 'direction', type: 'string', required: true, description: `Scroll direction` },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'distance',
        type: 'integer',
        required: false,
        description: `Pixels to scroll (default 500).`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_select_option',
    description: `Select an option in a <select> element by value or label.`,
    params: [
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `Text value to set (fill) or option value to select.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_set_cookies',
    description: `Set one or more cookies in the current browser session.`,
    params: [
      {
        name: 'cookies',
        type: 'array',
        required: true,
        description: `Array of cookie objects to set. Each object requires name and value; domain, path, expires, secure, and http_only are optional.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_switch_tab',
    description: `Switch focus to a different tab in the current session by tab ID.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'tab_id',
        type: 'string',
        required: true,
        description: `Numeric tab ID returned by browser_new_tab.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_type',
    description: `Type text into the focused element character by character, simulating real keyboard input.`,
    params: [
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `Text to type character by character into the focused element.`,
      },
      {
        name: 'clear_first',
        type: 'boolean',
        required: false,
        description: `If true, clear the existing field value before typing.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_uncheck',
    description: `Uncheck a checkbox identified by a CSS selector.`,
    params: [
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_wait',
    description: `Pause execution for a specified number of milliseconds.`,
    params: [
      {
        name: 'ms',
        type: 'integer',
        required: true,
        description: `Milliseconds to pause execution.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_wait_for_navigation',
    description: `Wait for a page navigation to complete after triggering a link or form submission.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'timeout_ms',
        type: 'integer',
        required: false,
        description: `Maximum milliseconds to wait before timing out.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_browser_wait_for_selector',
    description: `Wait until an element matching a CSS selector appears in the DOM.`,
    params: [
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `CSS selector identifying the target element, e.g. #submit-button or .product-card.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session ID returned by browser_navigate. Required by all browser_* tools.`,
      },
      {
        name: 'visible',
        type: 'boolean',
        required: false,
        description: `If true, wait until the element is visible in the viewport; if false, wait until present in DOM.`,
      },
    ],
  },
  {
    name: 'zenrowsmcp_scrape',
    description: `Scrape any webpage and return its content using ZenRows. Returns clean markdown by default; supports JavaScript rendering, premium proxies, CSS extraction, and structured output.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Full URL to navigate to or scrape (must include scheme, e.g. https://).`,
      },
      {
        name: 'autoparse',
        type: 'boolean',
        required: false,
        description: `Automatically extract structured data from the page into JSON. Best for product pages, articles, and listings.`,
      },
      {
        name: 'css_extractor',
        type: 'string',
        required: false,
        description: `CSS selector map for targeted extraction, e.g. {"title":"h1","price":".price-tag"}. Returns JSON instead of full page content.`,
      },
      {
        name: 'js_instructions',
        type: 'string',
        required: false,
        description: `JSON array of browser interactions before scraping, e.g. [{"click":"#load-more"},{"wait":1000}]. Requires js_render=true.`,
      },
      {
        name: 'js_render',
        type: 'boolean',
        required: false,
        description: `Enable headless JavaScript rendering. Required for SPAs (React, Vue, Angular) and dynamically loaded content.`,
      },
      {
        name: 'outputs',
        type: 'string',
        required: false,
        description: `Comma-separated data types to extract as structured JSON: emails, headings, links, menus, images, videos, audios. Use * for all.`,
      },
      {
        name: 'premium_proxy',
        type: 'boolean',
        required: false,
        description: `Use premium residential proxies to bypass heavy anti-bot protection. Higher credit cost.`,
      },
      {
        name: 'proxy_country',
        type: 'string',
        required: false,
        description: `ISO 3166-1 alpha-2 country code for geo-targeted proxy, e.g. US, GB, DE.`,
      },
      {
        name: 'response_type',
        type: 'string',
        required: false,
        description: `Output format. 'markdown' (default) preserves structure and is ideal for LLMs. 'plaintext' strips all formatting for pure text extraction. 'pdf' returns a PDF of the page. 'html' returns the raw HTML source (omits the response_type param; ZenRows default). Ignored when autoparse, css_extractor, outputs, or screenshot params are set.`,
      },
      {
        name: 'screenshot',
        type: 'boolean',
        required: false,
        description: `Capture an above-the-fold screenshot instead of text content.`,
      },
      {
        name: 'screenshot_fullpage',
        type: 'boolean',
        required: false,
        description: `Capture a full-page screenshot including content below the fold.`,
      },
      {
        name: 'screenshot_selector',
        type: 'string',
        required: false,
        description: `Capture a screenshot of a specific element by CSS selector instead of the full page.`,
      },
      {
        name: 'wait',
        type: 'integer',
        required: false,
        description: `Milliseconds to wait after page load before capturing. Max 30000. Requires js_render=true.`,
      },
      {
        name: 'wait_for',
        type: 'string',
        required: false,
        description: `CSS selector to wait for before capturing. Requires js_render=true.`,
      },
    ],
  },
]
