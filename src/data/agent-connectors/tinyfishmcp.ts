import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'tinyfishmcp_batch_cancel',
    description: `Cancel up to 8 running or pending automation runs by their IDs. Already-terminal runs are returned with their current status.`,
    params: [
      {
        name: 'run_ids',
        type: 'array',
        required: true,
        description: `List of run IDs to cancel or check status for (up to 8).`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_batch_create',
    description: `Start up to 8 web automations simultaneously and return all run IDs immediately. Poll progress with batch_status.`,
    params: [
      {
        name: 'runs',
        type: 'array',
        required: true,
        description: `Array of 1–8 run configurations to start simultaneously.`,
      },
      {
        name: 'profile_id',
        type: 'string',
        required: false,
        description: `Browser profile ID to use when use_profile is true.`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_batch_status',
    description: `Check the status, result, and error for up to 8 automation runs by their IDs.`,
    params: [
      {
        name: 'run_ids',
        type: 'array',
        required: true,
        description: `List of run IDs to cancel or check status for (up to 8).`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_cancel_run',
    description: `Cancel a running or pending automation run by its ID. Returns current status without error if the run has already reached a terminal state.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique run ID to retrieve or cancel.`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_create_browser_session',
    description: `Create a remote stealth Chrome browser session in the cloud and return CDP connection details (session_id, cdp_url) for use with Playwright, Puppeteer, or Selenium. Sessions auto-terminate after the configured inactivity timeout.`,
    params: [
      {
        name: 'timeout_seconds',
        type: 'integer',
        required: false,
        description: `Browser session timeout in seconds.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `Target website URL to automate.`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_discover_run',
    description: `Return the run ID of the currently active automation for the given session, or null if no run is in progress.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `The browser session ID to look up the running automation for.`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_fetch_content',
    description: `Render up to 10 URLs in a real browser and return clean structured content (markdown, HTML, or JSON) plus metadata like title, author, and publish date. Fetches run in parallel; per-URL errors are reported without blocking the rest.`,
    params: [
      {
        name: 'format',
        type: 'string',
        required: true,
        description: `Output format for extracted content. Accepted values: markdown, html, json.`,
      },
      {
        name: 'image_links',
        type: 'boolean',
        required: true,
        description: `Set to true to extract all image URLs from each page.`,
      },
      {
        name: 'include_html_head',
        type: 'boolean',
        required: true,
        description: `Set to true to return a full HTML document with <head> when format is html.`,
      },
      {
        name: 'links',
        type: 'boolean',
        required: true,
        description: `Set to true to extract all hyperlinks from each page.`,
      },
      {
        name: 'urls',
        type: 'array',
        required: true,
        description: `List of URLs to fetch content from.`,
      },
      {
        name: 'ttl',
        type: 'integer',
        required: false,
        description: `Cache TTL in seconds for fetched content. Omit to disable caching.`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_get_run',
    description: `Retrieve status, result, error, and metadata for a specific automation run by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique run ID to retrieve or cancel.`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_get_search_usage',
    description: `List past search usage records with optional filtering by date range and status, for auditing query history and credit consumption.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: true,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: true,
        description: `Page number for paginated results.`,
      },
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Return records ending before this ISO 8601 timestamp.`,
      },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Return records starting after this ISO 8601 timestamp.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by run or session status (e.g. completed, failed, running).`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_get_steps',
    description: `Retrieve the step-by-step execution trace for an automation run, including screenshots captured at each step.`,
    params: [
      {
        name: 'runId',
        type: 'string',
        required: true,
        description: `The unique run ID to retrieve steps or poll status for.`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_list_browser_sessions',
    description: `List browser sessions with optional filtering by session ID, time range, and status, returning duration, data usage, and connection metadata.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: true,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: true,
        description: `Page number for paginated results.`,
      },
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Return records ending before this ISO 8601 timestamp.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `The browser session ID for an active cloud session.`,
      },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Return records starting after this ISO 8601 timestamp.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by run or session status (e.g. completed, failed, running).`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_list_fetch_usage',
    description: `List past fetch content requests with optional filtering by date range and status. Does not include the fetched text content.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: true,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: true,
        description: `Page number for paginated results.`,
      },
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Return records ending before this ISO 8601 timestamp.`,
      },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Return records starting after this ISO 8601 timestamp.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by run or session status (e.g. completed, failed, running).`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_list_runs',
    description: `List automation runs with optional filtering by status, goal text, and date range, with cursor-based pagination.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: true,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'sort_direction',
        type: 'string',
        required: true,
        description: `Sort direction. Accepted values: asc, desc.`,
      },
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Return runs created after this ISO 8601 timestamp.`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Return runs created before this ISO 8601 timestamp.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page.`,
      },
      {
        name: 'goal',
        type: 'string',
        required: false,
        description: `Natural language description of what to accomplish on the website.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by run or session status (e.g. completed, failed, running).`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_poll_status',
    description: `Return the current status, step count, and progress for an automation run.`,
    params: [
      {
        name: 'runId',
        type: 'string',
        required: true,
        description: `The unique run ID to retrieve steps or poll status for.`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_run_web_automation',
    description: `Execute multi-step web automation on a URL using a natural language goal — clicks, form fills, and navigation. If the tool times out, the run is still executing on the server; use get_run or list_runs to check status.`,
    params: [
      {
        name: 'goal',
        type: 'string',
        required: true,
        description: `Natural language description of what to accomplish on the website.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `The browser session ID for an active cloud session.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Target website URL to automate.`,
      },
      {
        name: 'agent_config',
        type: 'object',
        required: false,
        description: `Agent behavior configuration (max_steps, mode, cursor_style, max_duration_seconds).`,
      },
      {
        name: 'api_integration',
        type: 'string',
        required: false,
        description: `Name of the integration making this call (e.g. zapier, n8n). Used for analytics.`,
      },
      {
        name: 'browser_profile',
        type: 'string',
        required: false,
        description: `Browser execution profile. Accepted values: lite, stealth.`,
      },
      {
        name: 'capture_config',
        type: 'object',
        required: false,
        description: `Configure which data to capture during the run (screenshots, recording, html, etc.).`,
      },
      {
        name: 'credential_item_ids',
        type: 'array',
        required: false,
        description: `Scope vault credentials to specific credential URIs. Requires use_vault to be true.`,
      },
      {
        name: 'feature_flags',
        type: 'object',
        required: false,
        description: `Feature flags to enable for this run.`,
      },
      {
        name: 'profile_id',
        type: 'string',
        required: false,
        description: `Browser profile ID to use when use_profile is true.`,
      },
      {
        name: 'proxy_config',
        type: 'object',
        required: false,
        description: `Proxy configuration for this run (enabled, type, url, country_code).`,
      },
      {
        name: 'use_profile',
        type: 'boolean',
        required: false,
        description: `Set to true to use the default browser profile if profiles are enabled.`,
      },
      {
        name: 'use_vault',
        type: 'boolean',
        required: false,
        description: `Set to true to include enabled vault credentials for this run.`,
      },
      {
        name: 'webhook_url',
        type: 'string',
        required: false,
        description: `HTTPS URL to receive webhook notifications for run lifecycle events.`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_run_web_automation_async',
    description: `Start a single web automation in the background and return the run ID immediately without waiting for completion. Poll with get_run every 30–60 seconds.`,
    params: [
      {
        name: 'goal',
        type: 'string',
        required: true,
        description: `Natural language description of what to accomplish on the website.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `The browser session ID for an active cloud session.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Target website URL to automate.`,
      },
      {
        name: 'agent_config',
        type: 'object',
        required: false,
        description: `Agent behavior configuration (max_steps, mode, cursor_style, max_duration_seconds).`,
      },
      {
        name: 'api_integration',
        type: 'string',
        required: false,
        description: `Name of the integration making this call (e.g. zapier, n8n). Used for analytics.`,
      },
      {
        name: 'browser_profile',
        type: 'string',
        required: false,
        description: `Browser execution profile. Accepted values: lite, stealth.`,
      },
      {
        name: 'capture_config',
        type: 'object',
        required: false,
        description: `Configure which data to capture during the run (screenshots, recording, html, etc.).`,
      },
      {
        name: 'credential_item_ids',
        type: 'array',
        required: false,
        description: `Scope vault credentials to specific credential URIs. Requires use_vault to be true.`,
      },
      {
        name: 'feature_flags',
        type: 'object',
        required: false,
        description: `Feature flags to enable for this run.`,
      },
      {
        name: 'profile_id',
        type: 'string',
        required: false,
        description: `Browser profile ID to use when use_profile is true.`,
      },
      {
        name: 'proxy_config',
        type: 'object',
        required: false,
        description: `Proxy configuration for this run (enabled, type, url, country_code).`,
      },
      {
        name: 'use_profile',
        type: 'boolean',
        required: false,
        description: `Set to true to use the default browser profile if profiles are enabled.`,
      },
      {
        name: 'use_vault',
        type: 'boolean',
        required: false,
        description: `Set to true to include enabled vault credentials for this run.`,
      },
      {
        name: 'webhook_url',
        type: 'string',
        required: false,
        description: `HTTPS URL to receive webhook notifications for run lifecycle events.`,
      },
    ],
  },
  {
    name: 'tinyfishmcp_search',
    description: `Search the web and return structured results with titles, snippets, and URLs. Supports geo-targeting and language filtering.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query to run.` },
      {
        name: 'fetch',
        type: 'string',
        required: false,
        description: `Fetch mode for search results. Accepted values: none, snippet, full.`,
      },
      {
        name: 'include_thumbnail',
        type: 'string',
        required: false,
        description: `Set to true to include thumbnail images in search results.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Language code to filter search results (e.g. en).`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Location to filter search results (e.g. United States).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results.`,
      },
    ],
  },
]
