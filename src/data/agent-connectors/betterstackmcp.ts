import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'betterstackmcp_acknowledge_incident',
    description: `Acknowledge an ongoing incident`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the incident to acknowledge`,
      },
      {
        name: 'acknowledged_by',
        type: 'string',
        required: false,
        description: `User email or identifier of who acknowledged the incident. Optional - when omitted, the action is attributed to the authenticated OAuth user (or "API" for team/organisation API tokens). Only pass this if the user has explicitly told you who acknowledged the incident on their behalf.`,
      },
    ],
  },
  {
    name: 'betterstackmcp_add_chart_to_dashboard',
    description: `Add a new chart to a dashboard. Use the \`section\` parameter to organize charts into named sections — sections are auto-created if they don't exist, and charts are auto-positioned within them.

**REQUIRED**: the \`query\` MUST contain \`{{source}}\` in the FROM clause — queries without a source variable are rejected.

Dashboard chart queries run against the metrics collection: use \`sum(logs_count)\` (or the matching \`sum(<row_type>_count)\` for the source), \`avgMerge(value_avg)\`, \`label('tag')\`. Do NOT use \`JSONExtract(raw, …)\` — that is for live-tail charts and \`query\` only; dashboards have no \`raw\` column. Call \`metrics_query_help\` with the source ID **and \`context: 'chart_query'\`** for available metrics/labels and chart-query-style examples.`,
    params: [
      {
        name: 'chart_type',
        type: 'string',
        required: true,
        description: `Type of chart to create`,
      },
      {
        name: 'dashboard_id',
        type: 'integer',
        required: true,
        description: `The ID of the dashboard to add the chart to`,
      },
      { name: 'name', type: 'string', required: true, description: `Name/title for the chart` },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `SQL query. MUST contain {{source}} in FROM (hardcoded collection names are rejected). Use {{start_time}}/{{end_time}} in the time filter and {{time}} for bucketing.`,
      },
      {
        name: 'explanation',
        type: 'string',
        required: false,
        description: `Short description of the chart.`,
      },
      {
        name: 'height',
        type: 'integer',
        required: false,
        description: `Chart height in grid units (default: 8)`,
      },
      {
        name: 'section',
        type: 'string',
        required: false,
        description: `Section name — chart is auto-placed within it. Section auto-created if it doesn't exist.`,
      },
      { name: 'settings', type: 'object', required: false, description: `Chart display settings` },
      {
        name: 'source_variable',
        type: 'string',
        required: false,
        description: `Variable name for the source in query templates. Most queries use 'source' (default). Change only if query uses a different variable name like 'my_source'`,
      },
      {
        name: 'width',
        type: 'integer',
        required: false,
        description: `Chart width in grid units (1-12, default: 6)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_add_dashboard_section',
    description: `Add a section divider to a dashboard. Sections span the full width and help organize charts into groups. Charts and sections at or below the insertion point are shifted down to make room`,
    params: [
      {
        name: 'dashboard_id',
        type: 'integer',
        required: true,
        description: `The ID of the dashboard`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Section title (e.g., 'Memory Metrics', 'Network')`,
      },
      {
        name: 'y',
        type: 'integer',
        required: true,
        description: `Y position (row) where section should appear`,
      },
    ],
  },
  {
    name: 'betterstackmcp_application',
    description: `Get comprehensive details of a specific application including its configuration, retention settings, ingestion details, custom bucket settings (if configured)`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the application` },
    ],
  },
  {
    name: 'betterstackmcp_applications',
    description: `List all available applications in a paginated table format. Returns application ID, name, platform type, team, status (active/paused), data region, and creation date`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter applications by name (case-insensitive partial match)`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Filter applications by team ID (use teams to get team IDs)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_available_incident_escalation_policies',
    description: `Get available escalation policies for an incident`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the incident` },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter options by text (searches in names, emails, and other text fields)`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter by escalation type. Possible values: user, team, policy, schedule, organisation`,
      },
    ],
  },
  {
    name: 'betterstackmcp_chart',
    description: `Get detailed information about a specific chart including its SQL queries, configuration, and settings. Use dashboard first to find the chart ID`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the chart to retrieve`,
      },
    ],
  },
  {
    name: 'betterstackmcp_chart_alert',
    description: `Get detailed information about a specific chart alert including its configuration, SQL queries, status, and current incident info. Use chart_alerts first to find the alert ID`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the chart alert to retrieve`,
      },
    ],
  },
  {
    name: 'betterstackmcp_chart_alert_help',
    description: `Get instructions for creating and configuring chart alerts, including alert types, operators, configuration fields, supported chart types, and common mistakes. Call this before creating or editing chart alerts`,
    params: [],
  },
  {
    name: 'betterstackmcp_chart_alerts',
    description: `List chart alerts with optional filtering by team, chart, or dashboard. Returns alert ID, name, type, chart, dashboard, and status`,
    params: [
      {
        name: 'chart_id',
        type: 'integer',
        required: false,
        description: `Filter to alerts on a specific chart`,
      },
      {
        name: 'dashboard_id',
        type: 'integer',
        required: false,
        description: `Filter to alerts on charts in a specific dashboard`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default: 1, 25 per page)`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Filter alerts by team ID (use teams to get team IDs)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_chart_building_help',
    description: `Get comprehensive instructions for building charts and dashboards, including chart types, units, axis settings, column mapping, legend placement, layout tips, and common mistakes. Call this before creating or editing charts`,
    params: [],
  },
  {
    name: 'betterstackmcp_clusters',
    description: `List all available storage clusters for a specific team. Returns a table with cluster IDs, names, and regions. Used primarily for creating cloud connections to query logs and metrics data directly via ClickHouse`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The ID of the team (use teams to get team IDs)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_create_application',
    description: `Create a new application in Better Stack. Returns the created application details including ID, ingestion token, ingesting host URL, retention settings, and platform-specific integration documentation links with next steps for configuration`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the application` },
      {
        name: 'platform',
        type: 'string',
        required: true,
        description: `The platform of the application`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The ID of the team to create the application in (use teams to get team IDs)`,
      },
      {
        name: 'data_region',
        type: 'string',
        required: false,
        description: `The data region for the application. Use 'data_regions' tool to see available options for your organization. Common values for most plans: us_east, germany, singapore. Ask the user if unsure.`,
      },
      {
        name: 'ingesting_paused',
        type: 'boolean',
        required: false,
        description: `Whether to start with ingesting paused (default: false)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_create_chart_alert',
    description: `Create a new chart alert on an existing chart. The chart must support alerts (line_chart, bar_chart, number_chart, or tail_chart with time variables). Call chart_alert_help for configuration reference. Use chart or dashboard first to find the chart ID`,
    params: [
      {
        name: 'alert_type',
        type: 'string',
        required: true,
        description: `Alert type: 'threshold' (fixed value), 'relative' (percentage change), 'anomaly_rrcf' (ML-based anomaly detection)`,
      },
      {
        name: 'chart_id',
        type: 'integer',
        required: true,
        description: `The ID of the chart to add the alert to`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the alert` },
      {
        name: 'operator',
        type: 'string',
        required: true,
        description: `Comparison operator. For relative type also: increases_by, decreases_by, changes_by`,
      },
      {
        name: 'aggregation_interval',
        type: 'integer',
        required: false,
        description: `Data range for threshold alerts on line/bar/number charts ('on data from' in UI, default: 60s)`,
      },
      {
        name: 'anomaly_sensitivity',
        type: 'integer',
        required: false,
        description: `Anomaly significance threshold (1-10, default 5), shown as 'Significance' in the UI. Higher = larger deviation required to fire, so FEWER alerts; lower = more sensitive, more alerts. Only for anomaly_rrcf alerts`,
      },
      {
        name: 'anomaly_trigger',
        type: 'string',
        required: false,
        description: `Anomaly trigger direction: 'any' (default), 'higher', 'lower'. Only for anomaly_rrcf alerts`,
      },
      {
        name: 'call',
        type: 'boolean',
        required: false,
        description: `Phone notifications (default: false)`,
      },
      {
        name: 'check_period',
        type: 'integer',
        required: false,
        description: `How often to run the alert check (seconds). Max 3600 for query-period-based alerts`,
      },
      {
        name: 'confirmation_period',
        type: 'integer',
        required: false,
        description: `How long the condition must persist before creating an incident (seconds, default: 60)`,
      },
      {
        name: 'email',
        type: 'boolean',
        required: false,
        description: `Email notifications (default: true)`,
      },
      {
        name: 'escalation_target',
        type: 'string',
        required: false,
        description: `'current_team' (default) or a GID like gid://uptime/Policy/123 or gid://uptime/Team/456`,
      },
      {
        name: 'push',
        type: 'boolean',
        required: false,
        description: `Push notifications (default: false)`,
      },
      {
        name: 'query_period',
        type: 'integer',
        required: false,
        description: `Seconds to look back for relative alerts and tail/table charts`,
      },
      {
        name: 'recovery_period',
        type: 'integer',
        required: false,
        description: `How long the condition must be resolved before auto-resolving (seconds, default: 60)`,
      },
      {
        name: 'series_names',
        type: 'array',
        required: false,
        description: `Specific series to monitor. Empty = all series. Mutually exclusive with series_names_except`,
      },
      {
        name: 'series_names_except',
        type: 'array',
        required: false,
        description: `Series to exclude; alert fires on every other series. Mutually exclusive with series_names`,
      },
      {
        name: 'shown_interval',
        type: 'integer',
        required: false,
        description: `Anomaly chart aggregation interval (seconds). Only for anomaly_rrcf alerts`,
      },
      {
        name: 'sms',
        type: 'boolean',
        required: false,
        description: `SMS notifications (default: false)`,
      },
      {
        name: 'value',
        type: 'number',
        required: false,
        description: `Threshold value (required for threshold/relative types). For relative type, this is a percentage (e.g., 50 means 50%)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_create_cloud_connection',
    description: `Create a secure cloud connection for direct ClickHouse query access to logs, spans, and metrics data. Returns connection credentials (host, port, username, password), sample queries for each data type, and cURL command examples. Connections expire after 1 hour by default`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The ID of the team (use teams to get team IDs)`,
      },
      {
        name: 'cluster_id',
        type: 'integer',
        required: false,
        description: `The ID of the cluster to use (required, when source_id is empty)`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Optional note for the connection`,
      },
      {
        name: 'source_id',
        type: 'integer',
        required: false,
        description: `The ID of the source (required, when cluster_id is empty)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_create_dashboard',
    description: `Create a new dashboard. Optionally use a template to start with pre-configured charts. Call chart_building_help for guidance on dashboard structure and layout. Optionally specify a source_id to preconfigure the dashboard with that source. Returns the new dashboard ID which can be used with add_chart_to_dashboard to add charts`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name for the new dashboard` },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The ID of the team to create the dashboard in (use teams to get team IDs)`,
      },
      {
        name: 'resource_group_name',
        type: 'string',
        required: false,
        description: `Optional resource group name to place the dashboard in. If a group with this name already exists for the team it will be reused; otherwise a new group is created.`,
      },
      {
        name: 'source_id',
        type: 'integer',
        required: false,
        description: `Optional source ID to preconfigure dashboard with that source's metrics`,
      },
      {
        name: 'template_id',
        type: 'integer',
        required: false,
        description: `Optional template ID to create dashboard from (use dashboard_templates to see available templates)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_create_incident',
    description: `Create a new incident providing a summary of the issue, requester email, and other optional details`,
    params: [
      { name: 'summary', type: 'string', required: true, description: `Brief incident summary` },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The ID of the team (use teams to get team IDs)`,
      },
      { name: 'call', type: 'boolean', required: false, description: `Call on-call person` },
      {
        name: 'critical_alert',
        type: 'boolean',
        required: false,
        description: `Send critical push notification`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Full incident description`,
      },
      {
        name: 'email',
        type: 'boolean',
        required: false,
        description: `Send email to on-call person`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: false,
        description: `Additional incident key-value metadata`,
      },
      { name: 'name', type: 'string', required: false, description: `Short incident name` },
      { name: 'policy_id', type: 'string', required: false, description: `Escalation policy ID` },
      {
        name: 'requester_email',
        type: 'string',
        required: false,
        description: `Email of the incident requester. Optional when authenticated via OAuth - defaults to the OAuth user. Required when using a team or organisation API token.`,
      },
      { name: 'sms', type: 'boolean', required: false, description: `Send SMS to on-call person` },
      {
        name: 'team_wait',
        type: 'integer',
        required: false,
        description: `Seconds to wait before escalating to team`,
      },
    ],
  },
  {
    name: 'betterstackmcp_create_incident_comment',
    description: `Create a comment on an incident`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The content of the comment (Markdown is supported for formatting)`,
      },
      {
        name: 'incident_id',
        type: 'integer',
        required: true,
        description: `The ID of the incident to comment on`,
      },
    ],
  },
  {
    name: 'betterstackmcp_create_metric_expression',
    description: `Create a new metric expression (extract-metrics-from-logs rule) on a source. \`sql_expression\` runs against each log row; log fields live inside the \`raw\` JSON column — use \`JSONExtract(raw, 'path', 'Nullable(Type)')\`. The \`Nullable(...)\` wrapper is required. Nested paths use positional args: \`JSONExtract(raw, 'request', 'headers', 'user-agent', 'Nullable(String)')\`. Call \`source_fields\` to see what fields exist. Pass \`aggregations\` (e.g. \`["avg", "count"]\`) for an aggregated metric, or omit / pass \`[]\` for a label (group-by column). Prefer \`build_type: new_data\` (default). \`historical_logs\` re-runs the rule over every stored log — expensive; only when the user explicitly asks.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Metric name. Letters, numbers, and underscores only`,
      },
      {
        name: 'source_id',
        type: 'integer',
        required: true,
        description: `The ID of the source (use sources to get source IDs)`,
      },
      {
        name: 'sql_expression',
        type: 'string',
        required: true,
        description: `ClickHouse SQL expression evaluated against each log row (e.g. "JSONExtractInt(raw, 'status')")`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `ClickHouse storage type for the extracted value`,
      },
      {
        name: 'aggregations',
        type: 'array',
        required: false,
        description: `Aggregations to compute for this metric (e.g. ['avg', 'count']). Omit or pass [] to store the value as a label (group-by column) instead of an aggregated metric`,
      },
      {
        name: 'build_type',
        type: 'string',
        required: false,
        description: `How to process existing data: 'new_data' (default, cheap) only applies to new logs; 'historical_logs' rebuilds metrics from existing logs`,
      },
    ],
  },
  {
    name: 'betterstackmcp_create_monitor',
    description: `Create a new monitor that tracks the availability of a website, host, or service.

Provide the \`url\` to monitor. For ping, TCP, UDP, SMTP, POP, IMAP, and DNS monitors this is the host (e.g. \`example.com\`) rather than a full URL. The monitor starts checking immediately unless \`paused\` is set to true.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `URL to monitor (e.g. https://example.com). For ping, TCP, UDP, SMTP, POP, IMAP, and DNS monitors, provide the host instead (e.g. example.com).`,
      },
      {
        name: 'call',
        type: 'boolean',
        required: false,
        description: `Call the on-call person when the monitor goes down.`,
      },
      {
        name: 'check_frequency',
        type: 'integer',
        required: false,
        description: `How often to check the monitor, in seconds (e.g. 30, 180).`,
      },
      {
        name: 'confirmation_period',
        type: 'integer',
        required: false,
        description: `Seconds to wait and re-check before confirming the monitor is down.`,
      },
      {
        name: 'critical_alert',
        type: 'boolean',
        required: false,
        description: `Send critical push notifications that ignore the device mute switch and Do Not Disturb.`,
      },
      {
        name: 'email',
        type: 'boolean',
        required: false,
        description: `Send e-mail alerts when the monitor goes down.`,
      },
      {
        name: 'expected_status_codes',
        type: 'array',
        required: false,
        description: `HTTP status codes considered healthy. Used with the expected_status_code monitor type.`,
      },
      {
        name: 'follow_redirects',
        type: 'boolean',
        required: false,
        description: `Follow HTTP redirects when checking the monitor.`,
      },
      {
        name: 'http_method',
        type: 'string',
        required: false,
        description: `HTTP method to use for the check (e.g. get, post, head).`,
      },
      {
        name: 'monitor_group_id',
        type: 'integer',
        required: false,
        description: `ID of the monitor group to add this monitor to.`,
      },
      {
        name: 'monitor_type',
        type: 'string',
        required: false,
        description: `What kind of check to run. Defaults to 'status' (HTTP up/down).`,
      },
      {
        name: 'paused',
        type: 'boolean',
        required: false,
        description: `Create the monitor in a paused state, so it performs no checks until resumed.`,
      },
      {
        name: 'policy_id',
        type: 'integer',
        required: false,
        description: `ID of the escalation policy to use for alerting.`,
      },
      {
        name: 'port',
        type: 'integer',
        required: false,
        description: `Port to check. Used for tcp, udp, smtp, pop, and imap monitors.`,
      },
      {
        name: 'pronounceable_name',
        type: 'string',
        required: false,
        description: `Human-friendly name for the monitor. Defaults to the URL host.`,
      },
      {
        name: 'push',
        type: 'boolean',
        required: false,
        description: `Send push notification alerts when the monitor goes down.`,
      },
      {
        name: 'recovery_period',
        type: 'integer',
        required: false,
        description: `Seconds the monitor must stay healthy before a related incident is resolved.`,
      },
      {
        name: 'regions',
        type: 'array',
        required: false,
        description: `Regions to check from (e.g. ["us", "eu", "as", "au"]).`,
      },
      {
        name: 'request_body',
        type: 'string',
        required: false,
        description: `Request body to send with the check.`,
      },
      {
        name: 'request_headers',
        type: 'array',
        required: false,
        description: `Custom request headers to send with the check.`,
      },
      {
        name: 'request_timeout',
        type: 'integer',
        required: false,
        description: `How long to wait for a response before the check times out, in seconds.`,
      },
      {
        name: 'required_keyword',
        type: 'string',
        required: false,
        description: `Keyword to search for in the response body. Required for the keyword and keyword_absence monitor types.`,
      },
      {
        name: 'sms',
        type: 'boolean',
        required: false,
        description: `Send SMS alerts when the monitor goes down.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `The ID of the team to create the monitor in. Required only when the API token has access to multiple teams.`,
      },
      {
        name: 'team_wait',
        type: 'integer',
        required: false,
        description: `Seconds to wait before escalating to the whole team.`,
      },
      {
        name: 'verify_ssl',
        type: 'boolean',
        required: false,
        description: `Verify the SSL certificate when checking HTTPS URLs.`,
      },
    ],
  },
  {
    name: 'betterstackmcp_create_source',
    description: `Create a new log source in Better Stack. Returns the created source details including ID, ingestion token, ingesting host URL, retention settings, and platform-specific integration documentation links with next steps for configuration`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the source` },
      {
        name: 'platform',
        type: 'string',
        required: true,
        description: `The platform for the source (e.g., nginx, docker, kubernetes, http, vector)`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The ID of the team to create the source in (use teams to get team IDs)`,
      },
      {
        name: 'data_region',
        type: 'string',
        required: false,
        description: `The data region for the source. Use 'data_regions' tool to see available options for your organization. Common values for most plans: us_east, germany, singapore. Ask the user if unsure.`,
      },
      {
        name: 'ingesting_paused',
        type: 'boolean',
        required: false,
        description: `Whether to start with ingesting paused (default: false)`,
      },
      {
        name: 'logs_retention',
        type: 'integer',
        required: false,
        description: `Log retention in days (default: 30)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_create_status_page_report',
    description: `Create a new status page report`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The initial status update message`,
      },
      {
        name: 'status_page_id',
        type: 'integer',
        required: true,
        description: `The ID of the status page`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The ID of the team (use teams to get team IDs)`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the status report`,
      },
      {
        name: 'affected_resources',
        type: 'array',
        required: false,
        description: `Array of affected resources with status_page_resource_id and status`,
      },
      {
        name: 'ends_at',
        type: 'string',
        required: false,
        description: `End time for the report (ISO 8601 format, required for maintenance reports)`,
      },
      {
        name: 'notify_subscribers',
        type: 'boolean',
        required: false,
        description: `Whether to notify subscribers via email (default: false)`,
      },
      {
        name: 'published_at',
        type: 'string',
        required: false,
        description: `When the report should be published (ISO 8601 format, default: now)`,
      },
      {
        name: 'report_type',
        type: 'string',
        required: false,
        description: `Type of report - manual (incident) or maintenance (default: manual)`,
      },
      {
        name: 'starts_at',
        type: 'string',
        required: false,
        description: `Start time for the report (ISO 8601 format)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_create_status_page_report_update',
    description: `Create a new status update for an existing status page report`,
    params: [
      {
        name: 'affected_resources',
        type: 'array',
        required: true,
        description: `Array of affected resources with status_page_resource_id and status`,
      },
      {
        name: 'report_id',
        type: 'integer',
        required: true,
        description: `The ID of the status report`,
      },
      {
        name: 'status_page_id',
        type: 'integer',
        required: true,
        description: `The ID of the status page`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `The status update message`,
      },
      {
        name: 'notify_subscribers',
        type: 'boolean',
        required: false,
        description: `Whether to notify subscribers via email (default: false)`,
      },
      {
        name: 'published_at',
        type: 'string',
        required: false,
        description: `When the update should be published (ISO 8601 format, default: now)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_dashboard',
    description: `Get detailed information about a specific dashboard including its charts, sections, layout, and configuration. Use this to understand a dashboard structure before modifying it`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the dashboard to retrieve`,
      },
    ],
  },
  {
    name: 'betterstackmcp_dashboard_query_help',
    description: `Get instructions for writing a ClickHouse query to use inside a Better Stack Dashboard chart (or chart alert). The query uses template variables (\`{{source}}\`, \`{{time}}\`, \`{{start_time}}\`, \`{{end_time}}\`) and runs against the source's metrics collection — it is meant to be saved as a dashboard chart via \`add_chart_to_dashboard\` / \`edit_chart\`, NOT run directly. To instead write an ad-hoc query you will run directly via \`query\` or \`render_chart\`, use \`metrics_query_help\`.`,
    params: [{ name: 'id', type: 'integer', required: true, description: `The source ID` }],
  },
  {
    name: 'betterstackmcp_dashboard_templates',
    description: `List all available dashboard templates in a paginated table format. Returns template ID, name, description, and other metadata`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_dashboards',
    description: `List all available dashboards in a paginated table format. Returns dashboard ID, name, creation date, and last updated date`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Filter dashboards by team ID (use teams to get team IDs)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_data_regions',
    description: `List all available data regions and clusters for application and source creation. Returns a table with region IDs (to use when creating applications or sources), display names, types (Region or Cluster), and geographical locations. Includes usage instructions for both standard regions and custom clusters`,
    params: [],
  },
  {
    name: 'betterstackmcp_delete_chart_alert',
    description: `Delete a chart alert permanently. This will also clean up any associated incidents and anomaly models. This action cannot be undone. Use chart_alerts or chart_alert first to find the alert ID`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the chart alert to delete`,
      },
    ],
  },
  {
    name: 'betterstackmcp_delete_metric_expression',
    description: `Delete a metric expression from a source. This action cannot be undone. Call \`metric_expressions\` first to get the ID. \`build_type: new_data\` (default) stops the rule from applying to future logs but leaves already-extracted data. \`build_type: historical_logs\` also rebuilds the source's metrics without this rule — expensive.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The metric expression ID returned by metric_expressions, e.g. "m-123" or "g-456"`,
      },
      {
        name: 'source_id',
        type: 'integer',
        required: true,
        description: `The ID of the source (use sources to get source IDs)`,
      },
      {
        name: 'build_type',
        type: 'string',
        required: false,
        description: `How to process existing data: 'new_data' (default) only stops new data; 'historical_logs' also rebuilds historical metrics without this rule`,
      },
    ],
  },
  {
    name: 'betterstackmcp_documentation',
    description: `Search for relevant documentation articles and return their contents`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `The search query to find relevant documentation articles`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `Direct URL to a specific documentation article`,
      },
    ],
  },
  {
    name: 'betterstackmcp_edit_chart',
    description: `Edit an existing chart name, query, type, or settings. Only provide the fields you want to change. If changing the query: the new query MUST contain \`{{source}}\` in the FROM clause (queries without a source variable are rejected). Dashboard chart queries run against the metrics collection: use \`sum(logs_count)\` (or the matching \`sum(<row_type>_count)\` for the source), \`avgMerge(value_avg)\`, \`label('tag')\`. \`JSONExtract(raw, …)\` only works in live-tail charts — dashboards have no \`raw\` column. Verify the new query with \`render_chart\` or \`query\` before saving. Call \`chart_building_help\` for chart/settings reference.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the chart to edit` },
      { name: 'chart_type', type: 'string', required: false, description: `New chart type` },
      {
        name: 'explanation',
        type: 'string',
        required: false,
        description: `Short description of the chart. Set to empty string to clear.`,
      },
      {
        name: 'height',
        type: 'integer',
        required: false,
        description: `New height in grid units (1-50).`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the chart` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `New SQL query. MUST contain {{source}} in FROM (hardcoded collection names are rejected). Use {{start_time}}/{{end_time}} in the time filter and {{time}} for bucketing.`,
      },
      { name: 'settings', type: 'object', required: false, description: `Chart display settings` },
      {
        name: 'source_variable',
        type: 'string',
        required: false,
        description: `Source variable name used in the query`,
      },
      {
        name: 'width',
        type: 'integer',
        required: false,
        description: `New width in grid units (1-12). Grid is 12 columns wide.`,
      },
    ],
  },
  {
    name: 'betterstackmcp_edit_chart_alert',
    description: `Edit an existing chart alert configuration. Only provide the fields you want to change. Call chart_alert_help for configuration reference. Use chart_alerts or chart_alert first to find the alert ID`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the chart alert to edit`,
      },
      {
        name: 'aggregation_interval',
        type: 'integer',
        required: false,
        description: `Data range for threshold alerts ('on data from' in UI)`,
      },
      { name: 'alert_type', type: 'string', required: false, description: `New alert type` },
      {
        name: 'anomaly_sensitivity',
        type: 'integer',
        required: false,
        description: `Anomaly significance threshold (1-10, default 5), shown as 'Significance' in the UI. Higher = larger deviation required to fire, so FEWER alerts; lower = more sensitive, more alerts`,
      },
      {
        name: 'anomaly_trigger',
        type: 'string',
        required: false,
        description: `Anomaly trigger: 'any', 'higher', 'lower'`,
      },
      { name: 'call', type: 'boolean', required: false, description: `Phone notifications` },
      {
        name: 'check_period',
        type: 'integer',
        required: false,
        description: `How often to run the alert check (seconds)`,
      },
      {
        name: 'confirmation_period',
        type: 'integer',
        required: false,
        description: `How long the condition must persist before creating an incident (seconds)`,
      },
      { name: 'email', type: 'boolean', required: false, description: `Email notifications` },
      {
        name: 'escalation_target',
        type: 'string',
        required: false,
        description: `'current_team' or a GID like gid://uptime/Policy/123 or gid://uptime/Team/456`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the alert` },
      { name: 'operator', type: 'string', required: false, description: `New comparison operator` },
      { name: 'push', type: 'boolean', required: false, description: `Push notifications` },
      {
        name: 'query_period',
        type: 'integer',
        required: false,
        description: `Seconds to look back for relative alerts`,
      },
      {
        name: 'recovery_period',
        type: 'integer',
        required: false,
        description: `How long the condition must be resolved before auto-resolving (seconds)`,
      },
      {
        name: 'series_names',
        type: 'array',
        required: false,
        description: `Specific series to monitor. Mutually exclusive with series_names_except`,
      },
      {
        name: 'series_names_except',
        type: 'array',
        required: false,
        description: `Series to exclude; alert fires on every other series. Mutually exclusive with series_names`,
      },
      {
        name: 'shown_interval',
        type: 'integer',
        required: false,
        description: `Anomaly chart aggregation interval (seconds)`,
      },
      { name: 'sms', type: 'boolean', required: false, description: `SMS notifications` },
      { name: 'value', type: 'number', required: false, description: `New threshold value` },
    ],
  },
  {
    name: 'betterstackmcp_edit_dashboard',
    description: `Edit an existing dashboard's name or source eligibility. Only provide the fields you want to change. Use dashboard first to find the dashboard ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the dashboard to edit`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the dashboard` },
      {
        name: 'source_eligibility_sql',
        type: 'string',
        required: false,
        description: `Source eligibility SQL — the ClickHouse query that decides which sources (and services) the dashboard applies to.`,
      },
    ],
  },
  {
    name: 'betterstackmcp_edit_dashboard_section',
    description: `Edit an existing dashboard section. Only provide the fields you want to change. Use dashboard first to find the section ID`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the section to edit` },
      {
        name: 'collapsed',
        type: 'boolean',
        required: false,
        description: `Whether the section is collapsed (true = folded, false = expanded)`,
      },
      { name: 'name', type: 'string', required: false, description: `New section title` },
    ],
  },
  {
    name: 'betterstackmcp_error',
    description: `Get comprehensive details of a specific error including its type, message, call site information, first occurrence, current state (unhandled, unresolved, ignored, resolved, or reoccurred), and linked Linear/Jira issues`,
    params: [
      {
        name: 'application_id',
        type: 'integer',
        required: true,
        description: `The ID of the application`,
      },
      {
        name: 'pattern',
        type: 'string',
        required: true,
        description: `The error pattern identifier`,
      },
    ],
  },
  {
    name: 'betterstackmcp_errors',
    description: `List error patterns for an application with occurrence counts, affected users, current state, and links. Defaults to unresolved errors and supports filtering by state. For specialized error analytics or custom SQL, use errors_query_help instead.`,
    params: [
      {
        name: 'application_id',
        type: 'integer',
        required: true,
        description: `The ID of the application`,
      },
      {
        name: 'end_time',
        type: 'string',
        required: false,
        description: `End of time range (e.g. 'now'). Default: 'now'`,
      },
      {
        name: 'environment',
        type: 'string',
        required: false,
        description: `Filter by environment (for example, 'production' or 'staging')`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort order. Default: 'last_seen'`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search by error type or message`,
      },
      {
        name: 'release',
        type: 'string',
        required: false,
        description: `Filter by release version`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Start of time range (e.g. 'now-3d', '2024-01-01T00:00:00Z'). Default: 'now-3d'`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filter by error state. Defaults to 'unresolved'. 'unresolved' includes reoccurred errors and errors not yet triaged.`,
      },
    ],
  },
  {
    name: 'betterstackmcp_errors_query_help',
    description: `Get comprehensive instructions for building SQL ClickHouse queries for error tracking, including both error patterns (metrics) and individual exceptions. Explains when to use each source and provides examples for common use cases`,
    params: [
      {
        name: 'application_id',
        type: 'integer',
        required: true,
        description: `The application (source) ID`,
      },
    ],
  },
  {
    name: 'betterstackmcp_escalate_incident',
    description: `Escalate an ongoing incident to a user, team, schedule, or policy`,
    params: [
      {
        name: 'escalation_type',
        type: 'string',
        required: true,
        description: `Type of escalation: User, Team, Schedule, Policy, or Organization`,
      },
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the incident to escalate`,
      },
      {
        name: 'call',
        type: 'boolean',
        required: false,
        description: `Send phone call notification`,
      },
      {
        name: 'critical_alert',
        type: 'boolean',
        required: false,
        description: `Send as critical alert`,
      },
      { name: 'email', type: 'boolean', required: false, description: `Send email notification` },
      {
        name: 'policy_id',
        type: 'integer',
        required: false,
        description: `Define which escalation policy to escalate to. Required when escalating to Policy.`,
      },
      { name: 'push', type: 'boolean', required: false, description: `Send push notification` },
      {
        name: 'schedule_id',
        type: 'integer',
        required: false,
        description: `Define which on-call calendar to escalate to. Required when escalating to Schedule.`,
      },
      { name: 'sms', type: 'boolean', required: false, description: `Send SMS notification` },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Define which team to escalate to. Either team_name or team_id required when escalating to Team.`,
      },
      {
        name: 'team_name',
        type: 'string',
        required: false,
        description: `Define which team to escalate to. Either team_name or team_id required when escalating to Team.`,
      },
      {
        name: 'user_email',
        type: 'string',
        required: false,
        description: `Define which team member to escalate to. Either user_email or user_id required when escalating to User.`,
      },
      {
        name: 'user_id',
        type: 'integer',
        required: false,
        description: `Define which team member to escalate to. Either user_email or user_id required when escalating to User.`,
      },
    ],
  },
  {
    name: 'betterstackmcp_escalation_policies',
    description: `List all escalation policies with their steps and configuration`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Filter by team ID (use teams to get team IDs)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_escalation_policy',
    description: `Get detailed information about a specific escalation policy`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the escalation policy`,
      },
    ],
  },
  {
    name: 'betterstackmcp_explore_logs_query_help',
    description: `Get instructions for writing a ClickHouse query to use inside the Better Stack Explore logs page (and live-tail charts) for log and span data. The query uses template variables and reads fields from the raw JSON column — it is meant to be used in the Explore UI, NOT run directly. To instead write an ad-hoc logs/spans query you will run directly via query, use query_help.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The source ID` },
      {
        name: 'source_type',
        type: 'string',
        required: false,
        description: `Type of source data to query (default: logs)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_export_dashboard',
    description: `Export a dashboard configuration as JSON. Returns the complete dashboard data structure including charts, sections, presets, and settings`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the dashboard or dashboard template to export`,
      },
    ],
  },
  {
    name: 'betterstackmcp_heartbeat',
    description: `Get details of a specific heartbeat`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the heartbeat` },
    ],
  },
  {
    name: 'betterstackmcp_heartbeat_availability',
    description: `Get availability summary for a specific heartbeat`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the heartbeat` },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start date (YYYY-MM-DD format)`,
      },
      { name: 'to', type: 'string', required: false, description: `End date (YYYY-MM-DD format)` },
    ],
  },
  {
    name: 'betterstackmcp_heartbeats',
    description: `List all heartbeats with filtering and pagination options`,
    params: [
      { name: 'name', type: 'string', required: false, description: `Filter by heartbeat name` },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by status (paused, pending, up, down)`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Filter by team ID (use teams to get team IDs)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_import_dashboard',
    description: `Import a dashboard from JSON configuration. Creates a new dashboard with the provided data structure`,
    params: [
      {
        name: 'data',
        type: 'string',
        required: true,
        description: `The dashboard data as a JSON string (can be obtained from export_dashboard)`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name for the new dashboard`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The ID of the team to import the dashboard into (use teams to get team IDs)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_incident',
    description: `Get detailed information about a specific incident`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the incident to retrieve`,
      },
    ],
  },
  {
    name: 'betterstackmcp_incident_comments',
    description: `Get comments for an incident`,
    params: [
      {
        name: 'incident_id',
        type: 'integer',
        required: true,
        description: `The ID of the incident`,
      },
    ],
  },
  {
    name: 'betterstackmcp_incident_timeline',
    description: `Get the timeline of events for an incident`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the incident` },
    ],
  },
  {
    name: 'betterstackmcp_incidents',
    description: `List incidents with filtering and pagination options`,
    params: [
      {
        name: 'acknowledged',
        type: 'boolean',
        required: false,
        description: `List only acknowledged incidents (true) or unacknowledged incidents (false).`,
      },
      {
        name: 'cause',
        type: 'string',
        required: false,
        description: `Filter by a substring of the incident cause (case-insensitive).`,
      },
      {
        name: 'escalation_policy_ids',
        type: 'array',
        required: false,
        description: `Filter to incidents associated with any of these escalation policies.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Return incidents from a specific date (ISO 8601 format)`,
      },
      {
        name: 'has_comments',
        type: 'boolean',
        required: false,
        description: `true: only incidents with comments; false: only incidents without comments.`,
      },
      {
        name: 'has_jira_task',
        type: 'boolean',
        required: false,
        description: `true: only incidents linked to a Jira issue; false: only those without.`,
      },
      {
        name: 'has_linear_task',
        type: 'boolean',
        required: false,
        description: `true: only incidents linked to a Linear issue; false: only those without.`,
      },
      {
        name: 'has_postmortem',
        type: 'boolean',
        required: false,
        description: `true: only incidents with a post-mortem comment; false: only those without.`,
      },
      {
        name: 'heartbeat_id',
        type: 'integer',
        required: false,
        description: `Filter incidents for a specific heartbeat`,
      },
      {
        name: 'incident_group_id',
        type: 'integer',
        required: false,
        description: `Filter to incidents within a specific incident group.`,
      },
      {
        name: 'max_duration_minutes',
        type: 'integer',
        required: false,
        description: `Only incidents that lasted shorter than this many minutes.`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: false,
        description: `Filter by metadata key/value.`,
      },
      {
        name: 'min_duration_minutes',
        type: 'integer',
        required: false,
        description: `Only incidents that lasted longer than this many minutes.`,
      },
      {
        name: 'monitor_id',
        type: 'integer',
        required: false,
        description: `Filter incidents for a specific monitor`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 10, max: 50)`,
      },
      {
        name: 'resolved',
        type: 'boolean',
        required: false,
        description: `List only resolved incidents (true) or unresolved incidents (false).`,
      },
      {
        name: 'status',
        type: 'array',
        required: false,
        description: `Filter by current lifecycle status. Pass an array to match any of them.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Filter by team ID (use teams to get team IDs)`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `Return incidents until a specific date (ISO 8601 format)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_metric',
    description: `Get comprehensive details about a specific metric. Returns metric overview (data points, active series, available aggregations), definition (SQL expression or JSON path), example queries for different aggregation functions, and Prometheus tags (for pure metrics). Essential for understanding how to query and use a metric`,
    params: [
      {
        name: 'metric_name',
        type: 'string',
        required: true,
        description: `The name of the metric`,
      },
      { name: 'source_id', type: 'integer', required: true, description: `The ID of the source` },
    ],
  },
  {
    name: 'betterstackmcp_metric_expressions',
    description: `List the metric expressions (extract-metrics-from-logs rules) on a source. Returns the rule ID, name, kind (metric vs label), ClickHouse type, SQL expression, and aggregations. IDs use a short prefixed form that feeds straight into update_metric_expression / delete_metric_expression`,
    params: [
      {
        name: 'source_id',
        type: 'integer',
        required: true,
        description: `The ID of the source (use sources to get source IDs)`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_metrics_query_help',
    description: `Get instructions for building SQL ClickHouse queries for metrics (available metrics, aggregations, examples) to run directly via the query tools (query / render_chart), using concrete remote(...) / s3Cluster(...) collection names and explicit time filters. To instead write a query for use inside a Dashboard chart, use dashboard_query_help. Pass context: 'chart_query' when the query will be saved as a dashboard chart or chart alert.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The source ID` },
      {
        name: 'context',
        type: 'string',
        required: false,
        description: `Where the query will run. 'direct_query' (default) — running directly via query or render_chart; prompt uses concrete remote()/s3Cluster() collection names and explicit time filters. 'chart_query' — query will be saved as a dashboard chart or chart alert; prompt uses {{source}}/{{time}}/{{start_time}}/{{end_time}} template variables throughout.`,
      },
    ],
  },
  {
    name: 'betterstackmcp_metrics_schema',
    description: `Get metrics and cardinality for a source. Returns a paginated table of available metrics (user-defined and ingested) ordered by active series (highest cardinality first), with their names, types, storage layout, data points count, and active series count. Sources with many metrics are paginated — use the page argument to read the rest`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the source` },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_monitor',
    description: `Get details of a specific monitor`,
    params: [{ name: 'id', type: 'integer', required: true, description: `The ID of the monitor` }],
  },
  {
    name: 'betterstackmcp_monitor_availability',
    description: `Get availability (SLA) summary for a specific monitor`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the monitor` },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start date (YYYY-MM-DD format)`,
      },
      { name: 'to', type: 'string', required: false, description: `End date (YYYY-MM-DD format)` },
    ],
  },
  {
    name: 'betterstackmcp_monitor_response_times',
    description: `Get response time metrics for a specific monitor`,
    params: [{ name: 'id', type: 'integer', required: true, description: `The ID of the monitor` }],
  },
  {
    name: 'betterstackmcp_monitors',
    description: `List monitors with optional filtering and pagination`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
      {
        name: 'pronounceable_name',
        type: 'string',
        required: false,
        description: `Filter monitors by name`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Filter by team ID (use teams to get team IDs)`,
      },
      { name: 'url', type: 'string', required: false, description: `Filter monitors by URL` },
    ],
  },
  {
    name: 'betterstackmcp_move_charts',
    description: `Move one or more charts to new positions on a dashboard. Validates the final layout for overlaps, allowing swaps and complex rearrangements. All moves are applied atomically - if any move is invalid, none are applied. Grid is 12 columns wide`,
    params: [
      {
        name: 'dashboard_id',
        type: 'integer',
        required: true,
        description: `The ID of the dashboard`,
      },
      { name: 'moves', type: 'array', required: true, description: `Array of chart moves` },
    ],
  },
  {
    name: 'betterstackmcp_on_call',
    description: `Get detailed information about a specific on-call calendar or the default calendar`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: false,
        description: `ISO-8601 formatted date/time to look up who is on-call at that time`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `The ID of the on-call calendar (use "default" for team's default calendar)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_on_call_event',
    description: `Get detailed information about a specific on-call event`,
    params: [
      {
        name: 'calendar_id',
        type: 'string',
        required: true,
        description: `The ID of the on-call calendar (use "default" for team's default calendar)`,
      },
      {
        name: 'event_id',
        type: 'integer',
        required: true,
        description: `The ID of the event to retrieve`,
      },
    ],
  },
  {
    name: 'betterstackmcp_on_call_events',
    description: `List all on-call schedule events for a specific calendar`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the on-call calendar (use "default" for team's default calendar)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_on_call_rotation',
    description: `Get on-call rotation configuration for a specific calendar`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the on-call calendar (use "default" for team's default calendar)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_on_calls',
    description: `List all on-call calendars for the team`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Filter by team ID (use teams to get team IDs)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_query',
    description: `Execute a ClickHouse SQL query to retrieve logs, traces/spans, errors, and metrics from telemetry data.

- **IMPORANT**: Use \`query_help\` to get instructions on how to create the correct query for logs and spans
- **IMPORANT**: Use \`errors_query_help\` to get instructions on how to create the correct query for errors
- **IMPORANT**: Use \`metrics_query_help\` to get instructions on how to create the correct query for metrics`,
    params: [
      { name: 'query', type: 'string', required: true, description: `The SQL query to execute` },
      { name: 'source_id', type: 'number', required: true, description: `Source ID` },
      {
        name: 'table',
        type: 'string',
        required: true,
        description: `Table name, ie. \`t123.my_source\``,
      },
      { name: 'host', type: 'string', required: false, description: `ClickHouse host URL.` },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `Password for ClickHouse authentication.`,
      },
      {
        name: 'username',
        type: 'string',
        required: false,
        description: `Username for ClickHouse authentication.`,
      },
    ],
  },
  {
    name: 'betterstackmcp_query_help',
    description: `Get instructions for building SQL ClickHouse queries for logs and spans (fields, aggregations, examples) to run directly via the query tools (query / render_chart) against the ClickHouse proxy. To instead write a query for use inside the Explore logs UI, use explore_logs_query_help.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The source ID` },
      {
        name: 'source_type',
        type: 'string',
        required: true,
        description: `The type of source (logs or spans)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_releases',
    description: `List all releases for a specific application in a paginated table format. Returns release reference, environments, first seen, and last seen timestamps`,
    params: [
      {
        name: 'application_id',
        type: 'integer',
        required: true,
        description: `The ID of the application to list releases for`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `Sort order: 'asc' or 'desc' (default: 'desc')`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_remove_chart',
    description: `Remove a chart from its dashboard permanently. This action cannot be undone and will also remove any alerts associated with the chart. Use dashboard first to find the chart ID`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the chart to remove` },
    ],
  },
  {
    name: 'betterstackmcp_remove_dashboard',
    description: `Remove a dashboard permanently. This action cannot be undone`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the dashboard to remove`,
      },
    ],
  },
  {
    name: 'betterstackmcp_remove_dashboard_section',
    description: `Remove a section divider from a dashboard permanently. This action cannot be undone. Charts are not affected - only the section header is removed. Use dashboard first to find the section ID`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the section to remove`,
      },
    ],
  },
  {
    name: 'betterstackmcp_render_chart',
    description: `Execute a ClickHouse SQL query and visualize the result as a chart.

Use \`chart_type\` to choose the visualization:
- \`line\` (default) — trends over time. Alias columns as \`time\`, \`value\`, and optional \`series\`.
- \`bar\` — magnitude over time or across buckets. Uses the same columns as \`line\`; set \`stacked: true\` to stack the series.
- \`pie\` — share of a total across categories. Alias a categorical column \`AS series\` (the slice label) and a numeric column \`AS value\` (the slice size).`,
    params: [
      { name: 'query', type: 'string', required: true, description: `The SQL query to execute` },
      { name: 'source_id', type: 'number', required: true, description: `Source ID` },
      {
        name: 'table',
        type: 'string',
        required: true,
        description: `Table name, ie. \`t123.my_source\``,
      },
      {
        name: 'chart_type',
        type: 'string',
        required: false,
        description: `How to visualize the result: \`line\` (trends over time, default), \`bar\` (magnitude over time or across buckets), or \`pie\` (share of a total across categories).`,
      },
      { name: 'host', type: 'string', required: false, description: `ClickHouse host URL.` },
      { name: 'name', type: 'string', required: false, description: `Chart name or title.` },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `Password for ClickHouse authentication.`,
      },
      {
        name: 'stacked',
        type: 'boolean',
        required: false,
        description: `Stack the series on top of each other. Applies to \`line\` and \`bar\` charts.`,
      },
      {
        name: 'username',
        type: 'string',
        required: false,
        description: `Username for ClickHouse authentication.`,
      },
    ],
  },
  {
    name: 'betterstackmcp_reopen_incident',
    description: `Reopen a resolved incident (must be within 24 hours of resolution)`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the incident to reopen`,
      },
      {
        name: 'reopened_by',
        type: 'string',
        required: false,
        description: `User email or identifier of who reopened the incident.`,
      },
    ],
  },
  {
    name: 'betterstackmcp_replays_query_help',
    description: `Get comprehensive instructions for building SQL ClickHouse queries for session replays. Explains data structure, provides examples for listing replays, finding replays linked to errors, and filtering by user/environment`,
    params: [
      {
        name: 'application_id',
        type: 'integer',
        required: true,
        description: `The application (source) ID`,
      },
    ],
  },
  {
    name: 'betterstackmcp_resolve_incident',
    description: `Resolve an ongoing incident`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the incident to resolve`,
      },
      {
        name: 'resolved_by',
        type: 'string',
        required: false,
        description: `User email or identifier of who resolved the incident.`,
      },
    ],
  },
  {
    name: 'betterstackmcp_severities',
    description: `List all severities (urgency levels) with their notification settings`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Filter by team ID (use teams to get team IDs)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_severity',
    description: `Get detailed information about a specific severity (urgency level)`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the severity` },
    ],
  },
  {
    name: 'betterstackmcp_source',
    description: `Get comprehensive details of a specific source including its configuration, retention settings, ingestion details, custom bucket settings (if configured)`,
    params: [{ name: 'id', type: 'integer', required: true, description: `The ID of the source` }],
  },
  {
    name: 'betterstackmcp_source_fields',
    description: `Get complete field catalog for a logs or spans source. Returns a table of all queryable fields with their paths and data types. Essential for understanding what fields can be queried for building custom queries`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the source` },
      {
        name: 'source_type',
        type: 'string',
        required: false,
        description: `Type of source data to query (default: logs)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_sources',
    description: `List all available sources in a paginated table format. Returns source ID, name, platform type, team, status (active/paused), data region, and creation date`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter sources by name (case-insensitive partial match)`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Filter sources by team ID (use teams to get team IDs)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_status_page',
    description: `Get details of a specific status page`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the status page` },
    ],
  },
  {
    name: 'betterstackmcp_status_page_report_update',
    description: `Get details of a specific status page report update`,
    params: [
      {
        name: 'report_id',
        type: 'integer',
        required: true,
        description: `The ID of the status report`,
      },
      {
        name: 'status_page_id',
        type: 'integer',
        required: true,
        description: `The ID of the status page`,
      },
      {
        name: 'update_id',
        type: 'integer',
        required: true,
        description: `The ID of the status update`,
      },
    ],
  },
  {
    name: 'betterstackmcp_status_page_report_updates',
    description: `List status updates for a specific status report`,
    params: [
      {
        name: 'report_id',
        type: 'integer',
        required: true,
        description: `The ID of the status report`,
      },
      {
        name: 'status_page_id',
        type: 'integer',
        required: true,
        description: `The ID of the status page`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_status_page_reports',
    description: `List status reports (incidents/maintenance) for a specific status page`,
    params: [
      {
        name: 'status_page_id',
        type: 'integer',
        required: true,
        description: `The ID of the status page`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Filter by team ID (use teams to get team IDs)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_status_page_resources',
    description: `Get resources (monitors/heartbeats) for a specific status page`,
    params: [
      {
        name: 'status_page_id',
        type: 'integer',
        required: true,
        description: `The ID of the status page`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_status_pages',
    description: `List all status pages with filtering and pagination options`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default: 50, max: 250)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_teams',
    description: `List all available teams in Better Stack Logs. Returns a table with team IDs and names, grouped by organization`,
    params: [
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter teams by name (case-insensitive partial match)`,
      },
    ],
  },
  {
    name: 'betterstackmcp_toggle_chart_alert_pause',
    description: `Pause or unpause a chart alert. When paused, the alert will not trigger any incidents`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the chart alert` },
      {
        name: 'paused',
        type: 'boolean',
        required: true,
        description: `Set to true to pause, false to unpause`,
      },
    ],
  },
  {
    name: 'betterstackmcp_update_error_state',
    description: `Update the state of a specific error (mark as resolved, ignored, or unresolved)`,
    params: [
      {
        name: 'application_id',
        type: 'integer',
        required: true,
        description: `The ID of the application`,
      },
      {
        name: 'pattern',
        type: 'string',
        required: true,
        description: `The error pattern identifier`,
      },
      { name: 'state', type: 'string', required: true, description: `The target state` },
      {
        name: 'ignore_next_count',
        type: 'integer',
        required: false,
        description: `Number of next occurrences to ignore (only valid when state is 'ignored'). Must be 1, 10, 100, or 1000`,
      },
      {
        name: 'notify_every_exception',
        type: 'boolean',
        required: false,
        description: `Whether to notify for every occurrence of this error`,
      },
      {
        name: 'resolve_in_release',
        type: 'string',
        required: false,
        description: `Pin the resolution to the application's latest release. The error will only re-open if it appears in a strictly newer release. Only valid when state is 'resolved'.`,
      },
    ],
  },
  {
    name: 'betterstackmcp_update_metric_expression',
    description: `Update an existing metric expression. Call \`metric_expressions\` first to get the ID.

At least one of \`name\`, \`sql_expression\`, \`type\`, \`aggregations\` must be provided — \`build_type\` alone is not a change and will be rejected.

Prefer \`build_type: new_data\` (default). \`historical_logs\` re-runs the rule over every stored log — expensive; only when the user explicitly asks.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The metric expression ID returned by metric_expressions, e.g. "m-123" or "g-456"`,
      },
      {
        name: 'source_id',
        type: 'integer',
        required: true,
        description: `The ID of the source (use sources to get source IDs)`,
      },
      {
        name: 'aggregations',
        type: 'array',
        required: false,
        description: `New set of aggregations. Pass [] to convert to a label (group-by column)`,
      },
      {
        name: 'build_type',
        type: 'string',
        required: false,
        description: `How to process existing data: 'new_data' (default) only applies to new logs; 'historical_logs' rebuilds metrics from existing logs`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New metric name. Letters, numbers, and underscores only`,
      },
      {
        name: 'sql_expression',
        type: 'string',
        required: false,
        description: `New ClickHouse SQL expression`,
      },
      { name: 'type', type: 'string', required: false, description: `New ClickHouse storage type` },
    ],
  },
]
