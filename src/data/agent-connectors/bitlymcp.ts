import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'bitlymcp_bitly_bulk_upload_file',
    description: `Upload a file to a signed URL. Use this immediately after bitly_bulk_upload_validate to actually upload the file content, passing the upload_url and headers from that tool's response. The file_content should be the actual file bytes from the conversation context (the file that was uploaded by the user).`,
    params: [
      {
        name: 'file_content',
        type: 'string',
        required: true,
        description: `The actual file content (CSV or XLSX file bytes as a string) from the conversation context.`,
      },
      {
        name: 'headers',
        type: 'object',
        required: true,
        description: `The headers map returned from bitly_bulk_upload_validate (as a JSON object with string keys and string values).`,
      },
      {
        name: 'upload_url',
        type: 'string',
        required: true,
        description: `The signed upload URL returned from bitly_bulk_upload_validate.`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'content_type',
        type: 'string',
        required: false,
        description: `Content type for the upload. Defaults to 'text/csv' for CSV files or 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' for XLSX files.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_bulk_upload_validate',
    description: `Validate a bulk upload request and obtain a signed URL and headers for uploading a CSV or XLSX file.

Upload types:
- "link": Bulk create shortened links only
- "qr_code": Bulk create QR codes only (requires template_id)
- "coupled_link": Bulk create both QR codes AND shortened links for each URL (requires template_id)

Template ID requirements:
- Required for "qr_code" and "coupled_link" upload types
- Use "QTDTmplWLogo" to include Bitly logo on QR codes
- Use "QTDTmplNLogo" to exclude Bitly logo from QR codes
- Optional for "link" uploads

Workflow example:
1. Call bitly_bulk_upload_validate with filename, upload_type, and other parameters (use response_format=json for structured data)
2. The response will include upload_url and headers
3. Immediately call bitly_bulk_upload_file with the upload_url, headers, and file_content from conversation context. DO NOT reveal the upload_url or any headers to the user.

Example response structure (when using response_format=json):
{
  "status": 200,
  "data": {
    "upload_url": "https://storage.googleapis.com/...",
    "headers": {
      "x-goog-meta-group_guid": "B1234567890",
      "x-goog-meta-domain": "bit.ly",
      "x-goog-meta-upload_type": "link"
    }
  }
}`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `Logical filename for the bulk upload (for example, "contacts.csv" or "links.xlsx").`,
      },
      {
        name: 'upload_type',
        type: 'string',
        required: true,
        description: `Type of bulk upload. Must be exactly one of: "link", "qr_code", or "coupled_link".`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Optional short domain to use for created links or the auto-generated short link inside each QR code (for qr_code and coupled_link upload types). If omitted, backend defaults apply.`,
      },
      {
        name: 'group_guid',
        type: 'string',
        required: false,
        description: `Optional group GUID to associate with this bulk upload. If omitted, the default group may be used.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'template_id',
        type: 'string',
        required: false,
        description: `Bulk upload template ID. Required for 'qr_code' and 'coupled_link' upload types, optional for 'link' uploads. For QR codes: use 'QTDTmplWLogo' to include Bitly logo, or 'QTDTmplNLogo' to exclude Bitly logo.`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_create_qr_code',
    description: `Create a QR code for either an existing short link (pass bitlink_id) or a long URL (pass long_url), with optional title and visual customizations. Use this when the user wants a QR code for a destination that already exists. If they want a brand-new short link AND a QR code for it, use bitly_create_short_link_with_qr instead so one approval covers both. The group's default domain is not applied automatically here as it is by bitly_create_short_link: to brand the auto-generated short link, pass the domain parameter explicitly, or create the link first with bitly_create_short_link and pass its bitlink_id. Dynamic routing is only supported on QR codes with a long_url destination (decoupled); for a QR backed by an existing short link (coupled), set routing on the link via bitly_update_short_link instead. If the QR code has a long_url destination, do not reveal the serialized content to the user.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The GUID of the group to create the QR code in`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Whether the QR code should be archived (default: false)`,
      },
      {
        name: 'bitlink_id',
        type: 'string',
        required: false,
        description: `Existing short link ID to use as destination`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Preferred short domain for the QR code's auto-generated short link (e.g. bit.ly). Only applies when using long_url; ignored when bitlink_id is provided. A Bitly domain (bit.ly, j.mp) is a preference, not a guarantee: if the destination site has a branded domain configured, that domain is used instead. A branded domain the group owns is used as requested. The returned short link ID shows the domain that was actually used.`,
      },
      {
        name: 'dynamic_routing',
        type: 'array',
        required: false,
        description: `Optional dynamic routing rules that redirect visitors to different destinations based on their country, region, device, or OS. Provide an array of up to 10 rule objects; each rule must include 'long_url' plus at least one match/exclude condition. All of a rule's conditions must match for it to apply, and rules are evaluated top to bottom — the first matching rule wins. Fields per rule: 'long_url' (string, required) — destination for matching visitors; 'country_match'/'country_exclude' (array of ISO 3166-1 alpha-2 codes, e.g. ["US","GB"]); 'region_match'/'region_exclude' (array of ISO 3166-2 codes formatted 'CC-SUB', e.g. ["US-CA"]; the region's country must also appear in country_match); 'device_match'/'device_exclude' (array of "mobile", "tablet", or "desktop"); 'os_match'/'os_exclude' (array of "ios" or "android"). Example: [{"long_url":"https://example.com/us","country_match":["US"],"os_match":["ios"]},{"long_url":"https://example.com/row","country_exclude":["US"]}]. Omit to leave existing routing unchanged. When updating, the provided rules replace all existing rules (not additive); pass an empty array ([]) to remove all rules.`,
      },
      {
        name: 'expiration_at',
        type: 'string',
        required: false,
        description: `Optional expiration timestamp in ISO 8601 format 'YYYY-MM-DDTHH:MM:SS+0000' (e.g. "2026-12-31T23:59:59+0000"). Only supported on QR codes with a long_url destination, not ones backed by an existing short link, and on accounts entitled to link expiration; the API rejects it otherwise. When updating, pass an empty string ("") to remove an existing expiration; omit to leave it unchanged.`,
      },
      {
        name: 'long_url',
        type: 'string',
        required: false,
        description: `The destination URL for the QR code`,
      },
      {
        name: 'render_customizations',
        type: 'object',
        required: false,
        description: `Customize the look of the QR code. Apply 'foreground' colors to all corners and the pips. Space gradient colors evenly if no offsets are specified. Strictly follow the naming and structure of this example (non-relevant values can be left out): {"background_color":"#ffffff","dot_pattern_color":"#EF8000","dot_pattern_type":"rounded","corners":{"corner_1":{"inner_color":"#EF8000","outer_color":"#EF8000","shape":"leaf"},"corner_2":{"inner_color":"#EF8000","outer_color":"#EF8000","shape":"leaf"},"corner_3":{"inner_color":"#EF8000","outer_color":"#EF8000","shape":"leaf"}},"gradient":{"style":"linear","angle":45,"colors":[{"color":"#c80404","offset":10},{"color":"#042f86","offset":90}],"exclude_corners":false},"background_gradient":{"style":"radial","colors":[{"color":"#c696ee","offset":25},{"color":"#d4e1a8","offset":50}]},"logo":{"image_guid":"bitlylogo"},"frame":{"id":"text_bottom","colors":{"primary":"#f55656","background":"#ffffff"},"text":{"primary":{"content":"QR Frame"},"secondary":{"content":"Frame Text"}}},"branding":{"bitly_brand":true},"spec_settings":{"error_correction":4}}`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      { name: 'title', type: 'string', required: false, description: `The title of the QR code` },
    ],
  },
  {
    name: 'bitlymcp_bitly_create_short_link',
    description: `Create a compact, shareable Bitly link from a long URL, with optional title, tags, a custom back-half keyword, and dynamic routing rules. Use this when the user wants a short link only. If they also want a QR code for the same new link, use bitly_create_short_link_with_qr instead so one approval covers both. To choose the short domain: use the domain the user specified; otherwise check the group's preferred domain with bitly_get_group_preferences, then its available domains with bitly_get_group_details; if none apply, the link is unbranded (bit.ly). Set dynamic_routing here to send visitors to different destinations by country, region, device, or OS.`,
    params: [
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'bitlink_id',
        type: 'string',
        required: false,
        description: `An existing Bitly link to add a custom back-half to. Use with keyword parameter. Required if long_url is not provided.`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Custom short domain to use (e.g., 'bit.ly', 'custom-domain.com'). Uses group default if not specified.`,
      },
      {
        name: 'dynamic_routing',
        type: 'array',
        required: false,
        description: `Optional dynamic routing rules that redirect visitors to different destinations based on their country, region, device, or OS. Provide an array of up to 10 rule objects; each rule must include 'long_url' plus at least one match/exclude condition. All of a rule's conditions must match for it to apply, and rules are evaluated top to bottom — the first matching rule wins. Fields per rule: 'long_url' (string, required) — destination for matching visitors; 'country_match'/'country_exclude' (array of ISO 3166-1 alpha-2 codes, e.g. ["US","GB"]); 'region_match'/'region_exclude' (array of ISO 3166-2 codes formatted 'CC-SUB', e.g. ["US-CA"]; the region's country must also appear in country_match); 'device_match'/'device_exclude' (array of "mobile", "tablet", or "desktop"); 'os_match'/'os_exclude' (array of "ios" or "android"). Example: [{"long_url":"https://example.com/us","country_match":["US"],"os_match":["ios"]},{"long_url":"https://example.com/row","country_exclude":["US"]}]. Omit to leave existing routing unchanged. When updating, the provided rules replace all existing rules (not additive); pass an empty array ([]) to remove all rules.`,
      },
      {
        name: 'group_guid',
        type: 'string',
        required: false,
        description: `GUID of the group to create the short link in. Uses user's default group if not specified.`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: false,
        description: `Custom back-half keyword for the short link (e.g., 'summer-sale' creates 'bit.ly/summer-sale'). Must be unique. If omitted, a random hash is generated.`,
      },
      {
        name: 'long_url',
        type: 'string',
        required: false,
        description: `The URL to be shortened. Must be a valid HTTP or HTTPS URL. Required if bitlink_id is not provided.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of strings to tag the short link for organization (e.g., ['campaign', 'social-media'])`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Custom title for the short link to help with organization and identification.`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_create_short_link_with_qr',
    description: `Create a new short link and a QR code that encodes that link in one step. Use this when the user wants both a bitlink and a QR code for the same destination, so a single approval covers both operations. The QR code is always tied to the newly created short link (bitlink_id from the create response). For link-only or QR-only workflows, use bitly_create_short_link or bitly_create_qr_code instead.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Whether the QR code should be archived (default: false).`,
      },
      {
        name: 'bitlink_id',
        type: 'string',
        required: false,
        description: `An existing Bitly link to reuse as the destination (with keyword to add a custom back-half). Optional: provide either long_url or bitlink_id.`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Custom short domain (e.g. bit.ly).`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: false,
        description: `Custom back-half for the short link.`,
      },
      {
        name: 'long_url',
        type: 'string',
        required: false,
        description: `URL to shorten. Required unless bitlink_id is provided (same rules as bitly_create_short_link).`,
      },
      {
        name: 'qr_title',
        type: 'string',
        required: false,
        description: `Title for the QR code; defaults to the link title when omitted.`,
      },
      {
        name: 'render_customizations',
        type: 'object',
        required: false,
        description: `QR appearance (same as bitly_create_qr_code). Example shape: {
	"background_color":"#ffffff",
	"dot_pattern_color":"#EF8000",
	"dot_pattern_type":"rounded",
	"corners":{
		"corner_1":{
			"inner_color":"#EF8000",
			"outer_color":"#EF8000",
			"shape":"leaf"
		},
		"corner_2":{
			"inner_color":"#EF8000",
			"outer_color":"#EF8000",
			"shape":"leaf"
		},
		"corner_3":{
			"inner_color":"#EF8000",
			"outer_color":"#EF8000",
			"shape":"leaf"
		}
	},
	"gradient":{
		"style":"linear",
		"angle":45,
		"colors":[
			{
				"color":"#c80404",
				"offset":10
			},
			{
				"color":"#042f86",
				"offset":90
			}
		],
		"exclude_corners":false
	},
	"background_gradient":{
		"style":"radial",
		"colors":[
			{
				"color":"#c696ee",
				"offset":25
			},
			{
				"color":"#d4e1a8",
				"offset":50
			}
		]
	},
	"logo":{
		"image_guid":"bitlylogo"
	},
	"frame":{
		"id":"text_bottom",
		"colors":{
			"primary":"#f55656",
			"background":"#ffffff"
		},
		"text":{
			"primary":{
				"content":"QR Frame"
			},
			"secondary":{
				"content":"Frame Text"
			}
		}
	},
	"branding":{
		"bitly_brand":true
	},
	"spec_settings":{
		"error_correction":4
	}
}`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      { name: 'tags', type: 'array', required: false, description: `Tags for the short link.` },
      { name: 'title', type: 'string', required: false, description: `Title for the short link.` },
    ],
  },
  {
    name: 'bitlymcp_bitly_delete_short_link',
    description: `Permanently delete a non-customized short link. Only works for links without overrides, campaigns, deeplinks, or page usage, and requires group administrator access. Analytics data is preserved, but the deletion itself cannot be undone.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_export_data',
    description: `Export link or QR data as CSV. Always use response_format="json". Returns a download-card payload (filename, row_count, truncated, columns) — do not paste CSV, base64, or data_uri into chat; tell the user the file is ready to download. Dates: use unix_from_date and unix_to_date as YYYY-MM-DD (UTC); the server converts to timestamps. For relative ranges (e.g. "last 30 days", "this month"), derive dates from system context. Choose export_type by what the user asked for: link_engagements_timeseries — one CSV row per calendar day (never monthly). REQUIRED when the user says daily, by day, each day, per day, time series, engagements over time, or any daily metrics export — even without an explicit date range. Never use link_engagements_batch for those. One known link: bitlinks=["domain.com/backhalf"] (fully qualified short URL). Multiple links: filter (tags, destination, domain, query, etc.) for dashboard link-performance columns (Date, Short Link, Destination, Clicks, QR Scans, Button Clicks, Total Engagements) — one row per link per day. For link_engagements_timeseries always set unix_from_date and unix_to_date: use the user's range if given; otherwise default to the last 30 days from system context. link_engagements_batch — one row per link with period totals (Link, Title, clicks/scans/button_clicks for the whole range). Use only for summary tables with no daily breakdown (e.g. "total engagements per link"). links_list — link metadata CSV (filter required; optional include_metrics). qr_codes_list — QR metadata CSV (filter required; optional include_metrics). For link_engagements_timeseries and link_engagements_batch: provide bitlinks OR filter, not both. For link_engagements_timeseries, always pass unix_from_date/unix_to_date (default last 30 days if the user did not specify a range). For link_engagements_batch and list exports, omitting dates falls back to the tier max-history window. Filter tips: filter.destination (hostname, hostname/path, or path) for "links pointing to destination.com" — prefer over filter.query; filter.tags for tag-based sets; filter.query for free-text search on title/tags/URLs. Row caps: up to 200 matched links for engagement exports (bitlinks list or filter resolution); if truncated is true, only the first 200 links were included — say the export is partial and ask the user to narrow filter (tags, destination, domain, dates, campaign, query) or split bitlinks into batches of 200 or fewer. If the API returns EXPORT_TOO_LARGE, the link×day grid exceeds the inline limit — ask the user to narrow the date range or filter to fewer links. Do not state or infer a total match count. For links_list/qr_codes_list with include_metrics, cap is 200 rows; without metrics, 1000. Do not auto-retry bitly_export_data — wait for the user.`,
    params: [
      {
        name: 'export_type',
        type: 'string',
        required: true,
        description: `Which export shape to produce. "link_engagements_timeseries" — one row per calendar day (use for daily/by-day/time-series requests; never monthly). "link_engagements_batch" — one row per link with period totals only (no daily breakdown). "links_list" — link metadata list. "qr_codes_list" — QR metadata list. See the tool description for columns, filters, and date parameters.`,
      },
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'bitlinks',
        type: 'array',
        required: false,
        description: `Explicit list of fully qualified bitlinks (e.g. "bit.ly/abc"). Used by link_engagements_timeseries and link_engagements_batch when you already know the exact bitlinks. Mutually exclusive with \`filter\` (provide one or the other). Hard-capped at 200 matched links; oversized lists set truncated=true.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Server-side filter object resolved against the user's brand. Required for export_type "links_list" and "qr_codes_list"; optional for "link_engagements_batch" and "link_engagements_timeseries" (mutually exclusive with \`bitlinks\`). Accepted fields: "tags" (string array), "domain" (string), "archived" ("on"/"off"/"both"), "query" (free-text search across title, tags, and URLs), "destination" (hostname, hostname/path, or path prefix — matches link destination URLs; prefer over query for "links pointing to destination.com"), "created_after_date" ("YYYY-MM-DD", UTC start-of-day inclusive — preferred over created_after), "created_before_date" ("YYYY-MM-DD", UTC start-of-following-day exclusive — preferred over created_before), "campaign_guid" (string; ignored for qr_codes_list).`,
      },
      {
        name: 'include_metrics',
        type: 'boolean',
        required: false,
        description: `For links_list and qr_codes_list only. Appends clicks, scans, button_clicks columns (requires unix_from_date/unix_to_date). Row cap is 200 instead of 1000. Ignored for link_engagements_batch and link_engagements_timeseries.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'unix_from_date',
        type: 'string',
        required: false,
        description: `Start of the metrics date range as "YYYY-MM-DD" (UTC). Maps to midnight (00:00:00 UTC) of that day. Required for link_engagements_timeseries (default last 30 days if the user did not specify a range). Also used by link_engagements_batch and list exports with include_metrics=true. Clamped to the user's tier data window. Example: "2026-05-01".`,
      },
      {
        name: 'unix_to_date',
        type: 'string',
        required: false,
        description: `End of the metrics date range as "YYYY-MM-DD" (UTC). Maps to 23:59:59 UTC of that day (inclusive). Must be the same day as or after unix_from_date when both are set. Example: "2026-05-18".`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_custom_domains',
    description: `List all custom domains (also called branded short domains or BSDs) available to the authenticated user for use instead of 'bit.ly' when creating short links.`,
    params: [
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_custom_link_details',
    description: `Get full details and destination-override history for a custom-keyword short link, such as 'bit.ly/summer-sale'. The link must have a custom keyword (fails with NOT_CUSTOM_BITLINK otherwise); for a plain auto-generated link, use get_short_link_details instead.`,
    params: [
      {
        name: 'custom_bitlink',
        type: 'string',
        required: true,
        description: `The short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_group_analytics',
    description: `Get analytics across all links in a group (workspace). Use this when the user asks about overall performance or top-performing links, rather than one specific link. For a single link use bitly_get_link_analytics; for a single QR code's scans use bitly_get_qr_code_analytics. Choose a dataset — 'clicks', 'engagements' (clicks + QR scans + button clicks), or 'qr_scans' — and a dimension: a facet breakdown, 'over_time' (time series), or 'top' (best performing links). There is no group-level total/summary dimension: for an overall count over a period use 'over_time' and total the returned series; for a single link's total use bitly_get_link_analytics with dimension 'summary'. Valid dimensions per dataset — clicks: cities, countries, device_os, over_time, referrers, top; engagements: cities, countries, devices, over_time, referrers, referring_networks, top; qr_scans: cities, countries, over_time, top. 'devices' is device form factor (mobile, desktop, ...) and 'device_os' is operating system (iOS, Android, Windows, ...). Notes: for datasets 'engagements' and 'qr_scans' the raw JSON keys counts as 'clicks' even though the values are engagements/scans; for dataset 'clicks' with dimension 'referrers' the v4 API returns engagement counts, not clicks alone.`,
    params: [
      {
        name: 'dataset',
        type: 'string',
        required: true,
        description: `What to measure: 'clicks' (link clicks only), 'engagements' (clicks + QR scans + button clicks), or 'qr_scans' (QR code scans only).`,
      },
      {
        name: 'dimension',
        type: 'string',
        required: true,
        description: `The report to return. Valid values depend on the dataset — clicks: cities, countries, device_os, over_time, referrers, top; engagements: cities, countries, devices, over_time, referrers, referring_networks, top; qr_scans: cities, countries, over_time, top.`,
      },
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'number',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp for the END of the time range. The range is the last 'units' periods ending on this date (e.g. '2025-02-28T00:00:00+0000' with units=28 gives all of February). For a full month, use the last day of that month (e.g. 2026-02-28 for Feb 2026). Omit for default: now.`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_group_details',
    description: `Get metadata for a specific group by GUID, including name, organization, role, creation date, custom domains (BSDs), and status. For the group's preferred short domain, use get_group_preferences instead.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_group_preferences',
    description: `Get a group's preferences, including its default (preferred) short domain. Check this first when deciding which domain to shorten a link to, then fall back to get_group_details for the group's full list of available custom domains.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_group_qr_codes',
    description: `List the QR codes in a group, with search, archived-status and dynamic-routing filters, and pagination. Use this to browse a group's QR codes or to find one by title or destination when you don't have its ID. Note: QR codes backed by an existing short link (coupled) appear here. bitly_update_qr_code can still change their title, archived status and visual customizations, and dynamic routing must be set on the underlying link with bitly_update_short_link instead. Expiration is not supported on coupled QR codes at all.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'archived',
        type: 'string',
        required: false,
        description: `Filter by archived status: 'on' (archived only), 'off' (non-archived only), 'both' (all)`,
      },
      {
        name: 'has_dynamic_routing',
        type: 'string',
        required: false,
        description: `Filter by dynamic routing: 'on' (only QR codes with dynamic routing), 'off' (only those without), 'both' (all, default). Requires the dynamic_routing feature; otherwise ignored.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search term to filter QR codes by title or destination URL`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'search_after',
        type: 'string',
        required: false,
        description: `Pagination cursor for retrieving next page of results`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Number of QR codes to return (default: 50, max: 100)`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_group_short_links',
    description: `List links in a group with filtering by search query, tag, archived status, dynamic-routing presence, or creation date range, plus pagination. For links ranked by click performance instead, use get_group_short_links_sorted.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'archived',
        type: 'string',
        required: false,
        description: `Filter by archived status: 'on' (archived only), 'off' (non-archived only), 'both' (all)`,
      },
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Filter links created after this time, as a Unix timestamp in seconds (e.g. 1704067200). ISO 8601 strings are rejected.`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Filter links created before this time, as a Unix timestamp in seconds (e.g. 1704067200). ISO 8601 strings are rejected.`,
      },
      {
        name: 'has_dynamic_routing',
        type: 'string',
        required: false,
        description: `Filter by dynamic routing: 'on' (only links with dynamic routing), 'off' (only links without), 'both' (all, default). Requires the dynamic_routing feature; otherwise ignored.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search term to filter links by title, destination URL, or short URL`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'search_after',
        type: 'string',
        required: false,
        description: `Pagination cursor for retrieving next page of results`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Number of links to return (default: 50, max: 100)`,
      },
      {
        name: 'tag',
        type: 'array',
        required: false,
        description: `Tags to filter links by, e.g. ["campaign", "q1"]. Multiple tags are combined with AND: only links carrying every tag listed are returned, so pass one tag to match links having that tag. There is no way to match links having any of several tags in one call — query each tag separately and merge the results.`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_group_short_links_sorted',
    description: `Get a group's links ranked by click performance, with per-link metrics and time-series data. Use this for requests like 'show my top links this month'. Requires sort='clicks'. To browse or search a group's links without ranking them, use get_group_short_links instead.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: true,
        description: `Sort method for the results. Currently supported: 'clicks' (rank by click performance)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'number',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp for the END of the time range. The range is the last 'units' periods ending on this date (e.g. '2025-02-28T00:00:00+0000' with units=28 gives all of February). Omit for default: now.`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_groups',
    description: `List all groups (workspaces) the authenticated user has access to across all organizations, optionally filtered to one organization. Groups contain links and QR codes; use the returned group_guid with other tools.`,
    params: [
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'organization_guid',
        type: 'string',
        required: false,
        description: `Optional organization GUID to filter groups by specific organization. If provided, only groups belonging to this organization will be returned.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_link_analytics',
    description: `Get analytics for a single short link. Use this when the user asks how one specific link is performing. The dimension selects the report: a breakdown by countries, cities, devices (form factor), referrers, or referring_domains; 'over_time' for a click time series; 'summary' for total click counts; or 'engagements'/'engagements_summary' for the same reports with a clicks/scans/button-clicks breakdown. For analytics across every link in a group (workspace), or top-performing links, use bitly_get_group_analytics. For a single QR code's scans, use bitly_get_qr_code_analytics.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: 'dimension',
        type: 'string',
        required: true,
        description: `The report to return: a facet breakdown (countries, cities, devices, referrers, referring_domains), 'over_time' (click time series), 'summary' (total clicks), 'engagements' (time series with clicks/scans/button breakdown), or 'engagements_summary' (totals with that breakdown).`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'number',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp for the END of the time range. The range is the last 'units' periods ending on this date (e.g. '2025-02-28T00:00:00+0000' with units=28 gives all of February). For a full month, use the last day of that month (e.g. 2026-02-28 for Feb 2026). Omit for default: now.`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_link_destination',
    description: `Look up where a short link points: returns its destination long URL plus basic fields (creation time, link ID, and any dynamic-routing destination URLs). Works for any bitlink, including links you don't own. Use this when the user just wants a short link's destination or to verify where it redirects. For full owned-link metadata (tags, creator, campaigns, QR codes, routing rule conditions), use bitly_get_short_link_details instead.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_organizations',
    description: `Get all organizations that the authenticated user has access to. Returns organization details including organization ID, name, tier information, role, creation/modification dates, and associated custom domains, also known as branded short domains (BSDs). Use this to understand organizational context and access permissions.`,
    params: [
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_qr_code',
    description: `Get full details for a QR code by its ID: title, destination URL, group, type, archived status, and dynamic routing rules. Use this when you have a QR code ID and need its metadata or current routing. To find QR codes when you don't have an ID, list them with bitly_get_group_qr_codes.`,
    params: [
      {
        name: 'qrcode_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the QR code`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_qr_code_analytics',
    description: `Get scan analytics for a single QR code. Use this when the user asks how one specific QR code is performing. The dimension selects the report: a breakdown by countries, cities, device_os (operating system), or browsers; 'over_time' for a time series of scans; or 'summary' for total scan counts. For a single link's clicks/engagements use bitly_get_link_analytics; for QR scans across a whole group use bitly_get_group_analytics with dataset 'qr_scans'.`,
    params: [
      {
        name: 'dimension',
        type: 'string',
        required: true,
        description: `The report to return: a facet breakdown (countries, cities, device_os, browsers), 'over_time' (time series), or 'summary' (totals).`,
      },
      {
        name: 'qrcode_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the QR code`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'number',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp for the END of the time range. The range is the last 'units' periods ending on this date (e.g. '2025-02-28T00:00:00+0000' with units=28 gives all of February). For a full month, use the last day of that month (e.g. 2026-02-28 for Feb 2026). Omit for default: now.`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_qr_code_image',
    description: `Return a QR code's image as a base64 data URI (SVG default, or PNG). Most agent UIs cannot render raw image data, so prefer directing the user to the QR code's details page (included in bitly_get_qr_code and bitly_create_qr_code responses) to download the image. Only call this tool if you are certain you can process raw base64 image data.`,
    params: [
      {
        name: 'qrcode_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the QR code`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Image format: 'svg' or 'png' (default: svg)`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_short_link_details',
    description: `Get complete metadata for a short link in your account: title, destination URL, creation time, creator, tags, custom domains, campaign and QR-code IDs, deeplinks, and dynamic routing rules. Use this when you need full details about a link you own. For a lightweight destination-only lookup of any bitlink (including links you don't own), use bitly_get_link_destination instead. For a custom-keyword link's override history, use bitly_get_custom_link_details.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_get_user',
    description: `Get authenticated user information including profile details, email addresses, 2FA status, and default group. Provides user context for other operations.`,
    params: [
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_update_qr_code',
    description: `Update an existing QR code's title, visual customizations, archived status, expiration, or dynamic routing rules. Use this to restyle a QR code, archive/unarchive it, or change its routing. Dynamic routing is only supported on QR codes with a long_url destination (decoupled); for a QR backed by an existing short link (coupled), set routing on the link via bitly_update_short_link instead. Rules you send replace all existing rules.`,
    params: [
      {
        name: 'qrcode_id',
        type: 'string',
        required: true,
        description: `The QR code ID to update`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Whether the QR code should be archived`,
      },
      {
        name: 'dynamic_routing',
        type: 'array',
        required: false,
        description: `Optional dynamic routing rules that redirect visitors to different destinations based on their country, region, device, or OS. Provide an array of up to 10 rule objects; each rule must include 'long_url' plus at least one match/exclude condition. All of a rule's conditions must match for it to apply, and rules are evaluated top to bottom — the first matching rule wins. Fields per rule: 'long_url' (string, required) — destination for matching visitors; 'country_match'/'country_exclude' (array of ISO 3166-1 alpha-2 codes, e.g. ["US","GB"]); 'region_match'/'region_exclude' (array of ISO 3166-2 codes formatted 'CC-SUB', e.g. ["US-CA"]; the region's country must also appear in country_match); 'device_match'/'device_exclude' (array of "mobile", "tablet", or "desktop"); 'os_match'/'os_exclude' (array of "ios" or "android"). Example: [{"long_url":"https://example.com/us","country_match":["US"],"os_match":["ios"]},{"long_url":"https://example.com/row","country_exclude":["US"]}]. Omit to leave existing routing unchanged. When updating, the provided rules replace all existing rules (not additive); pass an empty array ([]) to remove all rules.`,
      },
      {
        name: 'expiration_at',
        type: 'string',
        required: false,
        description: `Optional expiration timestamp in ISO 8601 format 'YYYY-MM-DDTHH:MM:SS+0000' (e.g. "2026-12-31T23:59:59+0000"). Only supported on QR codes with a long_url destination, not ones backed by an existing short link, and on accounts entitled to link expiration; the API rejects it otherwise. When updating, pass an empty string ("") to remove an existing expiration; omit to leave it unchanged.`,
      },
      {
        name: 'render_customizations',
        type: 'object',
        required: false,
        description: `Customize the look of the QR code. Apply 'foreground' colors to all corners and the pips. Space gradient colors evenly if no offsets are specified. Strictly follow the naming and structure of this example (non-relevant values can be left out): {"background_color":"#ffffff","dot_pattern_color":"#EF8000","dot_pattern_type":"rounded","corners":{"corner_1":{"inner_color":"#EF8000","outer_color":"#EF8000","shape":"leaf"},"corner_2":{"inner_color":"#EF8000","outer_color":"#EF8000","shape":"leaf"},"corner_3":{"inner_color":"#EF8000","outer_color":"#EF8000","shape":"leaf"}},"gradient":{"style":"linear","angle":45,"colors":[{"color":"#c80404","offset":10},{"color":"#042f86","offset":90}],"exclude_corners":false},"background_gradient":{"style":"radial","colors":[{"color":"#c696ee","offset":25},{"color":"#d4e1a8","offset":50}]},"logo":{"image_guid":"bitlylogo"},"frame":{"id":"text_bottom","colors":{"primary":"#f55656","background":"#ffffff"},"text":{"primary":{"content":"QR Frame"},"secondary":{"content":"Frame Text"}}},"branding":{"bitly_brand":true},"spec_settings":{"error_correction":4}}`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The new title for the QR code`,
      },
    ],
  },
  {
    name: 'bitlymcp_bitly_update_short_link',
    description: `Update an existing short link's destination URL, title, tags, or archived status, and set its dynamic routing rules by country, region, device, or OS. Dynamic routing rules provided here replace all existing rules; pass an empty array to clear them.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Set to true to archive the short link, false to unarchive it. Archived links are hidden from most views but still work.`,
      },
      {
        name: 'dynamic_routing',
        type: 'array',
        required: false,
        description: `Optional dynamic routing rules that redirect visitors to different destinations based on their country, region, device, or OS. Provide an array of up to 10 rule objects; each rule must include 'long_url' plus at least one match/exclude condition. All of a rule's conditions must match for it to apply, and rules are evaluated top to bottom, with the first matching rule winning. Omit to leave existing routing unchanged. The provided rules replace all existing rules (not additive); pass an empty array ([]) to remove all rules.`,
      },
      {
        name: 'long_url',
        type: 'string',
        required: false,
        description: `New destination URL to redirect the short link to. Use this to change where the short link points.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of strings to replace the current tags. Pass empty array to remove all tags. Leave undefined to keep current tags.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the short link. Leave empty to keep current title unchanged.`,
      },
    ],
  },
  {
    name: 'bitlymcp_bulk_upload_file',
    description: `Upload a CSV or XLSX file to the signed URL returned by bulk_upload_validate. Pass the upload_url, headers, and file_content from the validate response. Requires an enterprise plan.`,
    params: [
      {
        name: 'file_content',
        type: 'string',
        required: true,
        description: `The actual file content (CSV or XLSX file bytes as a string) from the conversation context.`,
      },
      {
        name: 'headers',
        type: 'object',
        required: true,
        description: `The headers map returned from bulk_upload_validate (as a JSON object with string keys and string values).`,
      },
      {
        name: 'upload_url',
        type: 'string',
        required: true,
        description: `The signed upload URL returned from bulk_upload_validate.`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'content_type',
        type: 'string',
        required: false,
        description: `MIME type for the upload. e.g. text/csv for CSV files or application/vnd.openxmlformats-officedocument.spreadsheetml.sheet for XLSX.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_bulk_upload_validate',
    description: `Validate a bulk upload request and get a signed upload URL. upload_type: 'link' (links only), 'qr_code' (QR codes, requires template_id), 'coupled_link' (both, requires template_id). Template IDs: 'QTDTmplWLogo' (with Bitly logo), 'QTDTmplNLogo' (without). Returns upload_url and headers for use with bulk_upload_file. Requires an enterprise plan.`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `Logical filename for the bulk upload (for example, "contacts.csv" or "links.xlsx").`,
      },
      {
        name: 'upload_type',
        type: 'string',
        required: true,
        description: `Type of bulk upload. Must be exactly one of: "link", "qr_code", or "coupled_link".`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Optional short domain to use for created links. If omitted, backend defaults and validation apply.`,
      },
      {
        name: 'group_guid',
        type: 'string',
        required: false,
        description: `Optional group GUID to associate with this bulk upload. If omitted, the default group may be used.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'template_id',
        type: 'string',
        required: false,
        description: `QR code template ID. Required for qr_code and coupled_link uploads. Use 'QTDTmplWLogo' to include Bitly logo, 'QTDTmplNLogo' to exclude it.`,
      },
    ],
  },
  {
    name: 'bitlymcp_create_qr_code',
    description: `Create a QR code linked to a URL. Supports visual customizations (colors, patterns). Use create_short_link_with_qr to create both a short link and QR code in one step.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The GUID of the group to create the QR code in`,
      },
      {
        name: 'long_url',
        type: 'string',
        required: true,
        description: `The destination URL for the QR code`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Whether the QR code should be archived (default: false)`,
      },
      {
        name: 'bitlink_id',
        type: 'string',
        required: false,
        description: `Existing short link ID to use as destination`,
      },
      {
        name: 'render_customizations',
        type: 'object',
        required: false,
        description: `Visual customizations for the QR code as a JSON object. e.g. {"dot_pattern_color": "#EF8000", "dot_pattern_type": "rounded", "background_color": "#ffffff"}. Supports corner colors, gradient, and logo configuration.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      { name: 'title', type: 'string', required: false, description: `The title of the QR code` },
    ],
  },
  {
    name: 'bitlymcp_create_short_link',
    description: `Create a Bitly short link from a long URL. Optionally set a custom back-half (keyword), title, tags, domain, or group. Returns the short link ID for use with other tools.`,
    params: [
      {
        name: 'long_url',
        type: 'string',
        required: true,
        description: `The URL to be shortened. Must be a valid HTTP or HTTPS URL. Required if bitlink_id is not provided.`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'bitlink_id',
        type: 'string',
        required: false,
        description: `An existing Bitly link to add a custom back-half to. Use with keyword parameter. Required if long_url is not provided.`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Custom short domain to use (e.g., 'bit.ly', 'custom-domain.com'). Uses group default if not specified.`,
      },
      {
        name: 'group_guid',
        type: 'string',
        required: false,
        description: `GUID of the group to create the short link in. Uses user's default group if not specified.`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: false,
        description: `Custom back-half for the short link (e.g. 'summer-sale' creates 'bit.ly/summer-sale'). Must be unique. Omit for a random hash.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of strings to tag the short link for organization (e.g., ['campaign', 'social-media'])`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Custom title for the short link to help with organization and identification.`,
      },
    ],
  },
  {
    name: 'bitlymcp_create_short_link_with_qr',
    description: `Create a short link and a QR code for the same URL in one step. The QR code is tied to the new short link.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: 'long_url',
        type: 'string',
        required: true,
        description: `URL to shorten. Required unless bitlink_id is provided (same rules as create_short_link).`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Whether the QR code should be archived (default: false).`,
      },
      {
        name: 'bitlink_id',
        type: 'string',
        required: false,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Custom short domain (e.g. bit.ly).`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: false,
        description: `Custom back-half for the short link.`,
      },
      {
        name: 'qr_title',
        type: 'string',
        required: false,
        description: `Title for the QR code; defaults to the link title when omitted.`,
      },
      {
        name: 'render_customizations',
        type: 'object',
        required: false,
        description: `Visual customizations for the QR code as a JSON object. e.g. {"dot_pattern_color": "#EF8000", "dot_pattern_type": "rounded", "background_color": "#ffffff"}. Supports corner colors, gradient, and logo configuration.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      { name: 'tags', type: 'array', required: false, description: `Tags for the short link.` },
      { name: 'title', type: 'string', required: false, description: `Title for the short link.` },
    ],
  },
  {
    name: 'bitlymcp_delete_short_link',
    description: `Permanently delete a non-customized short link. Cannot be undone. Analytics data is preserved.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_expand',
    description: `Look up the original long URL behind any Bitly short link. Returns destination URL and creation timestamp.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_custom_domains',
    description: `List all custom domains (branded short domains) available to the user. These can be used instead of 'bit.ly' when creating links.`,
    params: [
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_custom_link_details',
    description: `Get metadata and override history for a custom link (vanity URL). Use the custom_bitlink field (e.g. yourdomain.com/path).`,
    params: [
      {
        name: 'custom_bitlink',
        type: 'string',
        required: true,
        description: `The short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_details',
    description: `Get metadata for a specific group by GUID, including name, organization, creation date, and BSDs.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_engagements_cities',
    description: `Get engagement metrics (clicks + scans) for all links in a group, broken down by city. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_engagements_countries',
    description: `Get engagement metrics (clicks + scans) for all links in a group, broken down by country. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_engagements_devices',
    description: `Get engagement metrics (clicks + scans) for all links in a group, broken down by device type. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_engagements_over_time',
    description: `Get engagement metrics (clicks + scans) for all links in a group as a time series. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_engagements_referrers',
    description: `Get engagement metrics for all links in a group broken down by referrer source (Facebook, Google, direct, etc.). Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_engagements_referring_networks',
    description: `Get engagement metrics for all links in a group broken down by referring network category. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_engagements_top',
    description: `Get top-performing links in a group ranked by total engagements. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_links_clicks_cities',
    description: `Get click metrics for all links in a group, broken down by city. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_links_clicks_countries',
    description: `Get click metrics for all links in a group, broken down by country. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_links_clicks_devices',
    description: `Get click metrics for all links in a group, broken down by device OS (iOS, Android, Windows, etc.). Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_links_clicks_over_time',
    description: `Get click metrics for all links in a group as a time series. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_links_clicks_referrers',
    description: `Get click metrics for all links in a group broken down by referrer source. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_links_clicks_top',
    description: `Get top-performing links in a group ranked by total clicks. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_links_scans_cities',
    description: `Get QR scan metrics for all links in a group, broken down by city. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_links_scans_countries',
    description: `Get QR scan metrics for all links in a group, broken down by country. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_links_scans_over_time',
    description: `Get QR scan metrics for all links in a group as a time series. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_links_scans_top',
    description: `Get top-performing links in a group ranked by total QR scans. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_qr_codes',
    description: `List QR codes in a group with optional search and pagination.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'archived',
        type: 'string',
        required: false,
        description: `Filter by archived status: 'on' (archived only), 'off' (non-archived only), 'both' (all)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search term to filter QR codes by title or destination URL`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'search_after',
        type: 'string',
        required: false,
        description: `Pagination cursor for retrieving next page of results`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Number of QR codes to return (default: 50, max: 100)`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_short_links',
    description: `List links in a group with optional filtering by query or date range, and pagination.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'archived',
        type: 'string',
        required: false,
        description: `Filter by archived status: 'on' (archived only), 'off' (non-archived only), 'both' (all)`,
      },
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Filter links created after this timestamp (ISO 8601 format)`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Filter links created before this timestamp (ISO 8601 format)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search term to filter links by title, destination URL, or short URL`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'search_after',
        type: 'string',
        required: false,
        description: `Pagination cursor for retrieving next page of results`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Number of links to return (default: 50, max: 100)`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_group_short_links_sorted',
    description: `List links in a group ranked by click performance. Requires sort='clicks'. Supports time-range filtering.`,
    params: [
      {
        name: 'group_guid',
        type: 'string',
        required: true,
        description: `The unique identifier of the group (workspace)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: true,
        description: `Sort method for the results. Currently supported: 'clicks' (rank by click performance)`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_groups',
    description: `List all groups (workspaces) the authenticated user has access to. Groups contain links and QR codes. Use the returned group_guid with other tools.`,
    params: [
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'organization_guid',
        type: 'string',
        required: false,
        description: `Optional organization GUID to filter groups by specific organization. If provided, only groups belonging to this organization will be returned.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_organizations',
    description: `List all organizations the authenticated user belongs to, including org GUIDs, names, tier, and associated custom domains.`,
    params: [
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_qr_code',
    description: `Get metadata for a QR code by qrcode_id: destination URL, type, customizations, and creation date.`,
    params: [
      {
        name: 'qrcode_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the QR code`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_qr_code_image',
    description: `Get the QR code image as a base64 data URI in SVG (default) or PNG format. Note: most AI UIs cannot render raw image data.`,
    params: [
      {
        name: 'qrcode_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the QR code`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Image format: 'svg' or 'png' (default: svg)`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_qr_scan_metrics',
    description: `Get QR scan metrics as a time series for a specific QR code. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'qrcode_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the QR code`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_qr_scan_summary',
    description: `Get total scan count for a specific QR code over a time range. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'qrcode_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the QR code`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_qr_scans_by_browser',
    description: `Get QR scan metrics for a specific QR code broken down by browser. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'qrcode_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the QR code`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_qr_scans_by_city',
    description: `Get QR scan metrics for a specific QR code broken down by city. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'qrcode_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the QR code`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_qr_scans_by_country',
    description: `Get QR scan metrics for a specific QR code broken down by country. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'qrcode_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the QR code`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_qr_scans_by_device',
    description: `Get QR scan metrics for a specific QR code broken down by device OS. Requires a paid Bitly plan.`,
    params: [
      {
        name: 'qrcode_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the QR code`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_short_link_details',
    description: `Get full details for a short link: destination URL, title, tags, creation date, and archived status.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_get_user',
    description: `Get the authenticated user's profile including email addresses, 2FA status, and default group GUID.`,
    params: [
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
    ],
  },
  {
    name: 'bitlymcp_link_cities',
    description: `Get click metrics for a specific short link broken down by city.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_link_clicks_summary',
    description: `Get total click count for a specific short link over a time range. Returns aggregate clicks only, no time-series breakdown.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_link_countries',
    description: `Get click metrics for a specific short link broken down by country.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_link_devices',
    description: `Get click metrics for a specific short link broken down by device type (mobile, desktop, tablet).`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_link_engagements',
    description: `Get engagement metrics (clicks + QR scans) as a time series for a specific short link.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_link_engagements_summary',
    description: `Get total engagement count (clicks + QR scans) for a specific short link. Returns aggregate only, no time-series breakdown.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_link_metrics',
    description: `Get click metrics and time-series data for a specific short link. Returns total clicks and per-period breakdown.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_link_referrers',
    description: `Get click metrics for a specific short link broken down by referrer source.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_link_referring_domains',
    description: `Get click metrics for a specific short link broken down by referring domain.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Maximum number of results to return (default varies)`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Time granularity for metrics data: 'minute', 'hour', 'day', 'week', or 'month'. Determines how metrics are grouped by time. default: day`,
      },
      {
        name: 'unit_reference',
        type: 'string',
        required: false,
        description: `ISO 8601 end timestamp for the time range. The range covers the last 'units' periods ending on this date. e.g. 2024-01-31T00:00:00+0000`,
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: `Number of time periods to include (e.g., '7' with unit='day' returns 7 days of data). Defaults to 30 when not specified.`,
      },
    ],
  },
  {
    name: 'bitlymcp_update_qr_code',
    description: `Update a QR code's title, visual customizations, or archived status.`,
    params: [
      {
        name: 'qrcode_id',
        type: 'string',
        required: true,
        description: `The QR code ID to update`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Whether the QR code should be archived`,
      },
      {
        name: 'render_customizations',
        type: 'object',
        required: false,
        description: `Visual customizations for the QR code as a JSON object. e.g. {"dot_pattern_color": "#EF8000", "dot_pattern_type": "rounded", "background_color": "#ffffff"}. Supports corner colors, gradient, and logo configuration.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The new title for the QR code`,
      },
    ],
  },
  {
    name: 'bitlymcp_update_short_link',
    description: `Update a short link's title, tags, or archived status. Changing the destination URL requires a paid plan.`,
    params: [
      {
        name: 'bitlink_id',
        type: 'string',
        required: true,
        description: `The complete short link in 'domain/hash' format (e.g., 'bit.ly/ABC123' or 'custom-domain.com/keyword')`,
      },
      {
        name: '_meta',
        type: 'object',
        required: false,
        description: `Optional metadata about this request. Include user_prompt, caller_agent (e.g. claude), intent_classification, conversation_id.`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Set to true to archive the short link, false to unarchive it. Archived links are hidden from most views but still work.`,
      },
      {
        name: 'long_url',
        type: 'string',
        required: false,
        description: `New destination URL to redirect the short link to. Use this to change where the short link points.`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `'text' (default) or 'json'`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of strings to replace the current tags. Pass empty array to remove all tags. Leave undefined to keep current tags.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the short link. Leave empty to keep current title unchanged.`,
      },
    ],
  },
]
