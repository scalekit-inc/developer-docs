import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'linklymcp_batchdeletelinks',
    description: `Batch delete multiple Linkly links by their IDs. This action is permanent and cannot be undone.`,
    params: [
      { name: 'ids', type: 'array', required: true, description: `Array of link IDs to delete` },
    ],
  },
  {
    name: 'linklymcp_create_domain',
    description: `Add a custom domain to the Linkly workspace. The domain must already be configured to point to Linkly's servers via DNS.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The fully-qualified domain name to add to the Linkly workspace. The domain must already have DNS configured to point to Linkly's servers before calling this.`,
      },
    ],
  },
  {
    name: 'linklymcp_create_link',
    description: `Create a short link or URL shortener. Use when the user asks to shorten a URL, create a short link, or make a link shorter. Supports UTM tracking, custom domains, pixel tracking, and link expiry.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Destination URL for the short link`,
      },
      {
        name: 'block_bots',
        type: 'boolean',
        required: false,
        description: `Block known bots and spiders`,
      },
      {
        name: 'cloaking',
        type: 'boolean',
        required: false,
        description: `Hide destination URL by opening in an iframe`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Custom domain for the short link (without trailing /)`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the link is active (default: true)`,
      },
      {
        name: 'expiry_datetime',
        type: 'string',
        required: false,
        description: `ISO 8601 datetime when the link expires`,
      },
      {
        name: 'expiry_destination',
        type: 'string',
        required: false,
        description: `Fallback URL after expiry (404 if blank)`,
      },
      {
        name: 'fb_pixel_id',
        type: 'string',
        required: false,
        description: `Meta/Facebook Pixel ID for tracking`,
      },
      {
        name: 'forward_params',
        type: 'boolean',
        required: false,
        description: `Forward URL parameters to destination`,
      },
      {
        name: 'ga4_tag_id',
        type: 'string',
        required: false,
        description: `Google Analytics 4 tag ID`,
      },
      {
        name: 'gtm_id',
        type: 'string',
        required: false,
        description: `Google Tag Manager container ID`,
      },
      {
        name: 'hide_referrer',
        type: 'boolean',
        required: false,
        description: `Hide referrer information when users click`,
      },
      { name: 'name', type: 'string', required: false, description: `Nickname for the link` },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Private note about this link`,
      },
      {
        name: 'og_description',
        type: 'string',
        required: false,
        description: `Open Graph description for social media previews`,
      },
      {
        name: 'og_image',
        type: 'string',
        required: false,
        description: `Open Graph image URL for social media previews`,
      },
      {
        name: 'og_title',
        type: 'string',
        required: false,
        description: `Open Graph title for social media previews`,
      },
      {
        name: 'slug',
        type: 'string',
        required: false,
        description: `Custom slug/suffix (must start with /)`,
      },
      {
        name: 'utm_campaign',
        type: 'string',
        required: false,
        description: `UTM campaign parameter`,
      },
      {
        name: 'utm_content',
        type: 'string',
        required: false,
        description: `UTM content parameter`,
      },
      { name: 'utm_medium', type: 'string', required: false, description: `UTM medium parameter` },
      { name: 'utm_source', type: 'string', required: false, description: `UTM source parameter` },
      { name: 'utm_term', type: 'string', required: false, description: `UTM term parameter` },
    ],
  },
  {
    name: 'linklymcp_delete_domain',
    description: `Remove a custom domain from the Linkly workspace. This action is permanent.`,
    params: [
      {
        name: 'domain_id',
        type: 'integer',
        required: true,
        description: `The integer ID of the domain to permanently remove from the Linkly workspace. Use list_domains to find the domain's ID before calling this.`,
      },
    ],
  },
  {
    name: 'linklymcp_delete_link',
    description: `Delete a Linkly link by its ID. This action is permanent and cannot be undone.`,
    params: [
      {
        name: 'link_id',
        type: 'integer',
        required: true,
        description: `The ID of the link to delete`,
      },
    ],
  },
  {
    name: 'linklymcp_export_clicks',
    description: `Export detailed click records with full information including timestamp, browser, country, URL, platform, referrer, bot status, ISP, and URL parameters.`,
    params: [
      {
        name: 'bots',
        type: 'string',
        required: false,
        description: `Bot filtering mode for the export. Use 'include' to export all clicks, 'exclude' to remove bot traffic, or 'only' to export bot clicks only.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Filter exported clicks by ISO country code (e.g., US, GB). Only clicks from that country will be included.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `End date for the export range in YYYY-MM-DD format. Defaults to yesterday if omitted.`,
      },
      {
        name: 'link_id',
        type: 'integer',
        required: false,
        description: `Filter exported records to a specific link by its integer ID. If omitted, exports clicks from all links in the workspace.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Filter exported clicks by platform type (e.g., desktop, mobile, tablet). Only clicks from that platform will be included.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Start date for the export range in YYYY-MM-DD format. Defaults to 30 days ago if omitted.`,
      },
    ],
  },
  {
    name: 'linklymcp_get_analytics',
    description: `Get time-series click analytics data for charting. Returns click counts over time with optional date range, link, and demographic filters.`,
    params: [
      {
        name: 'bots',
        type: 'string',
        required: false,
        description: `Bot filtering mode. Use 'include' to count all clicks, 'exclude' to remove bot traffic, or 'only' to see bot-only data.`,
      },
      {
        name: 'browser',
        type: 'string',
        required: false,
        description: `Filter results by browser name (e.g., Chrome, Firefox, Safari). Only clicks from that browser will be included.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Filter results by ISO country code (e.g., US, GB, DE). Only clicks from that country will be included.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `End date of the analytics range in YYYY-MM-DD format. Defaults to today if omitted.`,
      },
      {
        name: 'frequency',
        type: 'string',
        required: false,
        description: `Time granularity for the time-series data. Use 'day' for daily aggregation or 'hour' for hourly. Defaults to 'day'.`,
      },
      {
        name: 'link_id',
        type: 'integer',
        required: false,
        description: `Filter analytics to a specific link by its integer ID. If omitted, returns data for all links in the workspace.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Filter results by platform type (e.g., desktop, mobile, tablet). Only clicks from that platform will be included.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Start date of the analytics range in YYYY-MM-DD format. Defaults to 30 days ago if omitted.`,
      },
      {
        name: 'unique',
        type: 'boolean',
        required: false,
        description: `When true, count only unique clicks (deduplicated by IP address). When false or omitted, counts all clicks including repeats.`,
      },
    ],
  },
  {
    name: 'linklymcp_get_analytics_by',
    description: `Get click counts grouped by a dimension such as country, platform, or browser. Useful for breakdowns and top-N reports.`,
    params: [
      {
        name: 'counter',
        type: 'string',
        required: true,
        description: `The dimension to group click counts by. Supported values: country, platform, browser_name, referer, isp, link_id, destination, bot_name.`,
      },
      {
        name: 'bots',
        type: 'string',
        required: false,
        description: `Bot filtering mode. Use 'include' to count all clicks, 'exclude' to remove bot traffic, or 'only' to see bot-only data.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Filter results by ISO country code (e.g., US, GB). Only clicks from that country will be included in the grouped breakdown.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `End date of the analytics range in YYYY-MM-DD format. Defaults to today if omitted.`,
      },
      {
        name: 'link_id',
        type: 'integer',
        required: false,
        description: `Filter the grouped analytics to a specific link by its integer ID. If omitted, includes data from all links.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Filter results by platform type (e.g., desktop, mobile). Only clicks from that platform will be included in the grouped breakdown.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Start date of the analytics range in YYYY-MM-DD format. Defaults to 30 days ago if omitted.`,
      },
      {
        name: 'unique',
        type: 'boolean',
        required: false,
        description: `When true, count only unique clicks (deduplicated by IP address). When false or omitted, counts all clicks.`,
      },
    ],
  },
  {
    name: 'linklymcp_get_clicks',
    description: `Get recent click data for the workspace, optionally filtered by a specific link ID.`,
    params: [
      {
        name: 'link_id',
        type: 'integer',
        required: false,
        description: `Filter clicks by link ID. Provide the integer ID of the link to scope results to that link only. If omitted, returns clicks across all links in the workspace.`,
      },
    ],
  },
  {
    name: 'linklymcp_get_link',
    description: `Get details of a specific Linkly link by its ID, including destination URL, slug, UTM parameters, and settings.`,
    params: [
      {
        name: 'link_id',
        type: 'integer',
        required: true,
        description: `The ID of the link to retrieve`,
      },
    ],
  },
  {
    name: 'linklymcp_list_domains',
    description: `List all custom domains configured in the Linkly workspace.`,
    params: [],
  },
  {
    name: 'linklymcp_list_link_webhooks',
    description: `List all webhook URLs subscribed to a specific Linkly link's click events.`,
    params: [
      { name: 'link_id', type: 'integer', required: true, description: `The ID of the link` },
    ],
  },
  {
    name: 'linklymcp_list_links',
    description: `List links in the workspace with optional sorting and search filtering.`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of links per page`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search query to filter links`,
      },
      { name: 'sort_by', type: 'string', required: false, description: `Field to sort results by` },
      {
        name: 'sort_dir',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc`,
      },
    ],
  },
  {
    name: 'linklymcp_list_webhooks',
    description: `List all webhook URLs subscribed to the Linkly workspace. These webhooks receive click events for all links.`,
    params: [],
  },
  {
    name: 'linklymcp_list_workspaces',
    description: `Return details of the authenticated Linkly workspace, including ID and name.`,
    params: [],
  },
  {
    name: 'linklymcp_ping',
    description: `Health check for the Linkly MCP server.`,
    params: [{ name: 'message', type: 'string', required: true, description: `A message to ping` }],
  },
  {
    name: 'linklymcp_search_links',
    description: `Search for links by name, destination URL, or note. Returns matching links with click statistics.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query to match against link names, destination URLs, and notes. The search is performed across all three fields to find relevant links.`,
      },
    ],
  },
  {
    name: 'linklymcp_subscribe_link_webhook',
    description: `Subscribe a webhook URL to receive click events for a specific Linkly link.`,
    params: [
      { name: 'link_id', type: 'integer', required: true, description: `The ID of the link` },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The webhook URL to receive click event notifications`,
      },
    ],
  },
  {
    name: 'linklymcp_subscribe_webhook',
    description: `Subscribe a webhook URL to receive click events for all links in the Linkly workspace.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The webhook URL to receive click event notifications`,
      },
    ],
  },
  {
    name: 'linklymcp_test_authentication',
    description: `Test API authentication with Linkly. Use this to verify your credentials are valid.`,
    params: [],
  },
  {
    name: 'linklymcp_unsubscribe_link_webhook',
    description: `Unsubscribe a webhook URL from a specific Linkly link's click events.`,
    params: [
      { name: 'link_id', type: 'integer', required: true, description: `The ID of the link` },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The webhook URL to unsubscribe`,
      },
    ],
  },
  {
    name: 'linklymcp_unsubscribe_webhook',
    description: `Unsubscribe a webhook URL from workspace-level click events.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The webhook URL to unsubscribe`,
      },
    ],
  },
  {
    name: 'linklymcp_update_domain_favicon',
    description: `Update the favicon URL for a custom domain in the Linkly workspace.`,
    params: [
      {
        name: 'domain_id',
        type: 'integer',
        required: true,
        description: `The integer ID of the domain whose favicon should be updated. Use list_domains to find the domain's ID.`,
      },
      {
        name: 'favicon_url',
        type: 'string',
        required: true,
        description: `The fully-qualified URL pointing to the favicon image to use for this custom domain (e.g., https://example.com/favicon.ico).`,
      },
    ],
  },
  {
    name: 'linklymcp_update_link',
    description: `Update an existing Linkly link by its ID. Modify the destination URL, name, UTM parameters, tracking pixels, or expiry settings.`,
    params: [
      {
        name: 'link_id',
        type: 'integer',
        required: true,
        description: `The ID of the link to update`,
      },
      { name: 'block_bots', type: 'boolean', required: false, description: `Block bots` },
      { name: 'cloaking', type: 'boolean', required: false, description: `Enable URL cloaking` },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the link is active`,
      },
      {
        name: 'expiry_datetime',
        type: 'string',
        required: false,
        description: `Expiry datetime ISO 8601`,
      },
      {
        name: 'expiry_destination',
        type: 'string',
        required: false,
        description: `Fallback URL after expiry`,
      },
      { name: 'fb_pixel_id', type: 'string', required: false, description: `Meta Pixel ID` },
      {
        name: 'forward_params',
        type: 'boolean',
        required: false,
        description: `Forward URL parameters`,
      },
      {
        name: 'ga4_tag_id',
        type: 'string',
        required: false,
        description: `Google Analytics 4 tag ID`,
      },
      { name: 'gtm_id', type: 'string', required: false, description: `Google Tag Manager ID` },
      { name: 'hide_referrer', type: 'boolean', required: false, description: `Hide referrer` },
      { name: 'name', type: 'string', required: false, description: `New nickname for the link` },
      { name: 'note', type: 'string', required: false, description: `New private note` },
      {
        name: 'og_description',
        type: 'string',
        required: false,
        description: `Open Graph description`,
      },
      { name: 'og_image', type: 'string', required: false, description: `Open Graph image URL` },
      { name: 'og_title', type: 'string', required: false, description: `Open Graph title` },
      { name: 'url', type: 'string', required: false, description: `New destination URL` },
      {
        name: 'utm_campaign',
        type: 'string',
        required: false,
        description: `UTM campaign parameter`,
      },
      {
        name: 'utm_content',
        type: 'string',
        required: false,
        description: `UTM content parameter`,
      },
      { name: 'utm_medium', type: 'string', required: false, description: `UTM medium parameter` },
      { name: 'utm_source', type: 'string', required: false, description: `UTM source parameter` },
      { name: 'utm_term', type: 'string', required: false, description: `UTM term parameter` },
    ],
  },
  {
    name: 'linklymcp_update_workspace',
    description: `Update workspace settings including the workspace name and webhook notification URL.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Workspace name` },
      {
        name: 'webhooks',
        type: 'string',
        required: true,
        description: `Webhook URL for workspace click notifications`,
      },
    ],
  },
]
