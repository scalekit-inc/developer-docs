import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'axiommcp_check_monitors',
    description: `List all monitors and their current status, showing which are firing or healthy.`,
    params: [],
  },
  {
    name: 'axiommcp_create_dashboard',
    description: `Create a new dashboard in the Axiom workspace from a full dashboard JSON document. The document must include name, owner, charts, layout, refreshTime, schemaVersion, and the dashboard time window; sections are optional.`,
    params: [
      {
        name: 'dashboardJson',
        type: 'string',
        required: true,
        description: `The full dashboard document as a JSON string. Include name, owner, charts (array), layout (array), refreshTime (15, 60, or 300), schemaVersion (2), timeWindowStart, and timeWindowEnd. Optional: Add sections as an ordered array of {id, title, defaultCollapsed?}. Use a unique UUID for each section id. Assign charts with chart.sectionId. Omit sectionId for ungrouped charts and all SmartFilter charts.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Optional audit/change note for this operation.`,
      },
      {
        name: 'uid',
        type: 'string',
        required: false,
        description: `Optional custom UID for the dashboard. If omitted, the server generates one.`,
      },
    ],
  },
  {
    name: 'axiommcp_create_monitor',
    description: `Create a new Axiom monitor using a JSON payload for Threshold, MatchEvent, or AnomalyDetection. Provide name, type, intervalMinutes, rangeMinutes, notifierIds, and at least one of aplQuery or mplQuery.`,
    params: [
      {
        name: 'monitorJson',
        type: 'string',
        required: true,
        description: `The full monitor configuration as a JSON string. Must include name, type, intervalMinutes, rangeMinutes, and at least one of aplQuery or mplQuery. Include notifierIds to set notifiers; omit notifierIds during update to keep existing notifiers.`,
      },
    ],
  },
  {
    name: 'axiommcp_create_notifier',
    description: `Create a new Axiom notifier using a JSON payload. The payload must include name and properties; configure one notification channel such as email, slack, webhook, customWebhook, pagerduty, opsgenie, discord, discordWebhook, or microsoftTeams. For custom webhooks, use properties.customWebhook with required url and body, plus optional headers and secretHeaders; body supports Go-template variables such as .Action, .MonitorID, .Body, .Title, and .Value.`,
    params: [
      {
        name: 'notifierJson',
        type: 'string',
        required: true,
        description: `The full notifier configuration as a JSON string. Must include name and properties. Configure one channel inside properties, such as email, slack, webhook, customWebhook, pagerduty, opsgenie, discord, discordWebhook, or microsoftTeams. For customWebhook, include required url and body, plus optional headers and secretHeaders; body supports Go-template variables such as .Action, .MonitorID, .Body, .Title, and .Value.`,
      },
    ],
  },
  {
    name: 'axiommcp_delete_dashboard',
    description: `Delete a dashboard by ID.`,
    params: [
      {
        name: 'dashboardUid',
        type: 'string',
        required: true,
        description: `The dashboard UID (stable external identifier). You can find UIDs using the \`listDashboards()\` tool.`,
      },
    ],
  },
  {
    name: 'axiommcp_delete_monitor',
    description: `Delete a monitor by ID.`,
    params: [
      {
        name: 'monitorId',
        type: 'string',
        required: true,
        description: `The monitor ID. You can find an list of monitors using the \`checkMonitors()\` tool.`,
      },
    ],
  },
  {
    name: 'axiommcp_delete_notifier',
    description: `Delete a notifier by ID.`,
    params: [
      {
        name: 'notifierId',
        type: 'string',
        required: true,
        description: `The notifier ID. You can find notifier IDs using the \`listNotifiers()\` tool.`,
      },
    ],
  },
  {
    name: 'axiommcp_export_dashboard',
    description: `Export a dashboard configuration as JSON for backup or sharing.`,
    params: [
      {
        name: 'dashboardUid',
        type: 'string',
        required: true,
        description: `The dashboard UID (stable external identifier). You can find UIDs using the \`listDashboards()\` tool.`,
      },
    ],
  },
  {
    name: 'axiommcp_get_dashboard',
    description: `Get details and configuration of a specific dashboard by ID.`,
    params: [
      {
        name: 'dashboardId',
        type: 'string',
        required: true,
        description: `The dashboard UID. You can find a list of dashboards using the \`listDashboards()\` tool.`,
      },
    ],
  },
  {
    name: 'axiommcp_get_dataset_fields',
    description: `List all fields in an events or traces dataset. Use this to understand the schema before writing APL queries. Do not use for otel-metrics-v1 datasets — use listMetrics() instead.`,
    params: [
      { name: 'datasetName', type: 'string', required: true, description: `The dataset name.` },
    ],
  },
  {
    name: 'axiommcp_get_metric_tag_values',
    description: `Get all values for a specific tag within a metrics dataset (kind otel-metrics-v1) over a given time range. Useful for discovering filter values before querying with queryMetrics.`,
    params: [
      {
        name: 'datasetName',
        type: 'string',
        required: true,
        description: `The dataset name. You can find an list of datasets using the \`listDatasets()\` tool.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `The tag name to list values for.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `End time for the query range. A fixed (RFC3339) or relative (now, now-5m) time value. Defaults to "now".`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `Start time for the query range. A fixed (RFC3339) or relative (now, now-5m) time value. Defaults to "now-30m".`,
      },
    ],
  },
  {
    name: 'axiommcp_get_monitor_history',
    description: `Get the alert history for a specific monitor, including when it fired and resolved.`,
    params: [
      {
        name: 'monitorId',
        type: 'string',
        required: true,
        description: `The monitor ID. You can find an list of monitors using the \`checkMonitors()\` tool.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `End time for the query range. A fixed (RFC3339) or relative (now, now-5m) time value. Defaults to "now".`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `Start time for the query range. A fixed (RFC3339) or relative (now, now-5m) time value. Defaults to "now-30m".`,
      },
    ],
  },
  {
    name: 'axiommcp_get_saved_queries',
    description: `List all saved APL queries in the Axiom workspace.`,
    params: [],
  },
  {
    name: 'axiommcp_list_dashboards',
    description: `List all dashboards in the Axiom workspace.`,
    params: [],
  },
  {
    name: 'axiommcp_list_datasets',
    description: `List all available datasets. The "kind" column determines which tools to use next:
- events / otel.traces / other: use queryDataset() (APL) and getDatasetFields()
- otel-metrics-v1: start with listMetrics() to inspect metric definitions and choose query strategy, then use queryMetrics(), searchMetrics(), listMetricTags(), and getMetricTagValues() — do NOT use queryDataset() or getDatasetFields() for these`,
    params: [],
  },
  {
    name: 'axiommcp_list_metric_tags',
    description: `List all tag keys (dimensions) available in a metrics dataset (kind otel-metrics-v1) over a given time range. Tags can be used to filter and group metrics queries.`,
    params: [
      {
        name: 'datasetName',
        type: 'string',
        required: true,
        description: `The dataset name. You can find an list of datasets using the \`listDatasets()\` tool.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `End time for the query range. A fixed (RFC3339) or relative (now, now-5m) time value. Defaults to "now".`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `Start time for the query range. A fixed (RFC3339) or relative (now, now-5m) time value. Defaults to "now-30m".`,
      },
    ],
  },
  {
    name: 'axiommcp_list_metrics',
    description: `List all available metric names with metadata (type, temporality, and unit) in a metrics dataset (kind otel-metrics-v1) over a given time range, defaulting to the last 30 minutes. Start here when query semantics matter.`,
    params: [
      {
        name: 'datasetName',
        type: 'string',
        required: true,
        description: `The dataset name. You can find an list of datasets using the \`listDatasets()\` tool.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `End time for the query range. A fixed (RFC3339) or relative (now, now-5m) time value. Defaults to "now".`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `Start time for the query range. A fixed (RFC3339) or relative (now, now-5m) time value. Defaults to "now-30m".`,
      },
    ],
  },
  {
    name: 'axiommcp_list_notifiers',
    description: `List all notifiers (notification channels such as email, Slack, PagerDuty) configured in the workspace.`,
    params: [],
  },
  {
    name: 'axiommcp_query_dataset',
    description: `Query Axiom datasets using Axiom Processing Language (APL). Use for events, otel.traces, and other non-metrics datasets. Returns query results including matching events.`,
    params: [
      { name: 'apl', type: 'string', required: true, description: `The APL query to execute.` },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `End time for the query (ISO 8601 or 'now').`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `Start time for the query (ISO 8601 or relative like '-1h').`,
      },
    ],
  },
  {
    name: 'axiommcp_query_metrics',
    description: `Query OTel metrics from Axiom using MPL (Metrics Processing Language), not APL, over a given time range (defaults to the last 30 minutes). Use for otel-metrics-v1 datasets.`,
    params: [
      {
        name: 'datasetName',
        type: 'string',
        required: true,
        description: `The dataset name. You can find an list of datasets using the \`listDatasets()\` tool.`,
      },
      {
        name: 'mpl',
        type: 'string',
        required: true,
        description: `The metrics query string. Format: <dataset>:<metric> | <operations>`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `End time for the query range. A fixed (RFC3339) or relative (now, now-5m) time value. Defaults to "now".`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `Start time for the query range. A fixed (RFC3339) or relative (now, now-5m) time value. Defaults to "now-30m".`,
      },
    ],
  },
  {
    name: 'axiommcp_search_metrics',
    description: `Search tag values across all metrics in a dataset (kind otel-metrics-v1) for a specific entity name (a service, host, or region) and return the metric names associated with it, along with type, temporality, and unit metadata. Use a time window of at least 3 hours, since recently-ingested data can take up to 2 hours to become searchable.`,
    params: [
      {
        name: 'datasetName',
        type: 'string',
        required: true,
        description: `The dataset name. You can find an list of datasets using the \`listDatasets()\` tool.`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The entity name to search for across all tag values (e.g. a service name "checkout-service", a host "prod-worker-1", a region "us-east-1"). The search matches this exact string against tag values -- use the canonical name as it appears in your infrastructure.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `End time for the query range. A fixed (RFC3339) or relative (now, now-5m) time value. Defaults to "now".`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `Start time for the query range. A fixed (RFC3339) or relative (now, now-5m) time value. Defaults to "now-30m".`,
      },
    ],
  },
  {
    name: 'axiommcp_send_feedback',
    description: `Share feedback about the Axiom MCP server experience, such as a misleading tool description, a confusing result or error message, a missing capability, or praise for something that worked well. Never include sensitive information (log or query contents, dataset values, credentials, tokens, or personal data).`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: true,
        description: `The kind of feedback: tool-description (misleading/unclear description), tool-result (confusing or unhelpful output), error-message (error did not help recovery), missing-capability (something you needed does not exist), performance (slow or resource-heavy), praise (something worked well), or other.`,
      },
      {
        name: 'feedback',
        type: 'string',
        required: true,
        description: `The feedback itself. Keep it generic and actionable. NEVER include sensitive information: no log or query contents, dataset values, credentials, tokens, personal data, or anything from the user's environment.`,
      },
      {
        name: 'toolName',
        type: 'string',
        required: false,
        description: `Optional: the name of the MCP tool the feedback is about, e.g. queryDataset.`,
      },
    ],
  },
  {
    name: 'axiommcp_update_dashboard',
    description: `Update an existing dashboard by UID with a full replacement dashboard JSON document (not just its name or description). Supports optimistic concurrency via the version and overwrite parameters.`,
    params: [
      {
        name: 'dashboardJson',
        type: 'string',
        required: true,
        description: `The full dashboard document as a JSON string. Include name, owner, charts (array), layout (array), refreshTime (15, 60, or 300), schemaVersion (2), timeWindowStart, and timeWindowEnd. Optional: Add sections as an ordered array of {id, title, defaultCollapsed?}. Use a unique UUID for each section id. Assign charts with chart.sectionId. Omit sectionId for ungrouped charts and all SmartFilter charts.`,
      },
      {
        name: 'dashboardUid',
        type: 'string',
        required: true,
        description: `The dashboard UID (stable external identifier). You can find UIDs using the \`listDashboards()\` tool.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Optional audit/change note for this operation.`,
      },
      {
        name: 'overwrite',
        type: 'boolean',
        required: false,
        description: `When true (default), bypasses version checks and applies last-write-wins. When false, the version parameter is required.`,
      },
      {
        name: 'version',
        type: 'number',
        required: false,
        description: `The current dashboard version number. Required when overwrite is false. Get this from exportDashboard().`,
      },
    ],
  },
  {
    name: 'axiommcp_update_dashboard_chart',
    description: `Patch a single chart in an existing dashboard by chart ID using a JSON merge-patch document, rather than individual chart fields. Supports optimistic concurrency via the version and overwrite parameters.`,
    params: [
      {
        name: 'chartId',
        type: 'string',
        required: true,
        description: `The chart ID inside the dashboard charts array.`,
      },
      {
        name: 'chartPatchJson',
        type: 'string',
        required: true,
        description: `A JSON merge-patch object for a single dashboard chart. Include only fields to change. Set sectionId to an existing section UUID to move the chart into that section, or set sectionId to null to make it ungrouped. Keep SmartFilter charts ungrouped. If id is present, it matches chartId.`,
      },
      {
        name: 'dashboardUid',
        type: 'string',
        required: true,
        description: `The dashboard UID (stable external identifier). You can find UIDs using the \`listDashboards()\` tool.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Optional audit/change note for this operation.`,
      },
      {
        name: 'overwrite',
        type: 'boolean',
        required: false,
        description: `When true (default), bypasses version checks and applies last-write-wins. When false, the version parameter is required.`,
      },
      {
        name: 'version',
        type: 'number',
        required: false,
        description: `The current dashboard version number. Required when overwrite is false. Get this from exportDashboard().`,
      },
    ],
  },
  {
    name: 'axiommcp_update_monitor',
    description: `Update an existing Axiom monitor by ID using a full monitor JSON payload. Omit notifierIds to keep the monitor's existing notifiers, or set notifierIds to [] to remove them. Use checkMonitors() to find monitor IDs before updating.`,
    params: [
      {
        name: 'monitorId',
        type: 'string',
        required: true,
        description: `The monitor ID. You can find an list of monitors using the \`checkMonitors()\` tool.`,
      },
      {
        name: 'monitorJson',
        type: 'string',
        required: true,
        description: `The full monitor configuration as a JSON string. Must include name, type, intervalMinutes, rangeMinutes, and at least one of aplQuery or mplQuery. Include notifierIds to set notifiers; omit notifierIds during update to keep existing notifiers.`,
      },
    ],
  },
  {
    name: 'axiommcp_update_notifier',
    description: `Update an existing notifier by ID using a full notifier JSON payload. The payload must include name and properties; configure one channel inside properties.`,
    params: [
      {
        name: 'notifierId',
        type: 'string',
        required: true,
        description: `The notifier ID. You can find notifier IDs using the \`listNotifiers()\` tool.`,
      },
      {
        name: 'notifierJson',
        type: 'string',
        required: true,
        description: `The full notifier configuration as a JSON string. Must include name and properties. Configure one channel inside properties, such as email, slack, webhook, customWebhook, pagerduty, opsgenie, discord, discordWebhook, or microsoftTeams. For customWebhook, include required url and body, plus optional headers and secretHeaders; body supports Go-template variables such as .Action, .MonitorID, .Body, .Title, and .Value.`,
      },
    ],
  },
]
