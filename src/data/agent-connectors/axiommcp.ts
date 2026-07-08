import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'axiommcp_check_monitors',
    description: `List all monitors and their current status, showing which are firing or healthy.`,
    params: [],
  },
  {
    name: 'axiommcp_create_dashboard',
    description: `Create a new dashboard in the Axiom workspace.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Dashboard name.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Dashboard description.`,
      },
    ],
  },
  {
    name: 'axiommcp_create_monitor',
    description: `Create a new monitor (alert) that watches an APL query and fires when a threshold is crossed.`,
    params: [
      { name: 'apl', type: 'string', required: true, description: `APL query to evaluate.` },
      { name: 'name', type: 'string', required: true, description: `Monitor name.` },
      { name: 'description', type: 'string', required: false, description: `Monitor description.` },
      {
        name: 'threshold',
        type: 'number',
        required: false,
        description: `Threshold value that triggers the alert.`,
      },
    ],
  },
  {
    name: 'axiommcp_create_notifier',
    description: `Create a new notifier (notification channel) such as email, Slack webhook, or PagerDuty integration.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Notifier name.` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Notifier type (e.g. slack, email, pagerduty).`,
      },
    ],
  },
  {
    name: 'axiommcp_delete_dashboard',
    description: `Delete a dashboard by ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The dashboard ID to delete.` },
    ],
  },
  {
    name: 'axiommcp_delete_monitor',
    description: `Delete a monitor by ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The monitor ID to delete.` },
    ],
  },
  {
    name: 'axiommcp_delete_notifier',
    description: `Delete a notifier by ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The notifier ID to delete.` },
    ],
  },
  {
    name: 'axiommcp_export_dashboard',
    description: `Export a dashboard configuration as JSON for backup or sharing.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The dashboard ID to export.` },
    ],
  },
  {
    name: 'axiommcp_get_dashboard',
    description: `Get details and configuration of a specific dashboard by ID.`,
    params: [{ name: 'id', type: 'string', required: true, description: `The dashboard ID.` }],
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
    description: `Get all values for a specific tag key on a given metric.`,
    params: [
      {
        name: 'datasetName',
        type: 'string',
        required: true,
        description: `The name of the otel-metrics-v1 dataset.`,
      },
      { name: 'metricName', type: 'string', required: true, description: `The metric name.` },
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `The tag key to get values for.`,
      },
    ],
  },
  {
    name: 'axiommcp_get_monitor_history',
    description: `Get the alert history for a specific monitor, including when it fired and resolved.`,
    params: [{ name: 'id', type: 'string', required: true, description: `The monitor ID.` }],
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
    description: `List all tag keys available for a specific metric.`,
    params: [
      {
        name: 'datasetName',
        type: 'string',
        required: true,
        description: `The name of the otel-metrics-v1 dataset.`,
      },
      { name: 'metricName', type: 'string', required: true, description: `The metric name.` },
    ],
  },
  {
    name: 'axiommcp_list_metrics',
    description: `List all metrics available in the otel-metrics-v1 dataset, including their names and types.`,
    params: [
      {
        name: 'datasetName',
        type: 'string',
        required: true,
        description: `The name of the otel-metrics-v1 dataset to list metrics from.`,
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
    description: `Query OTel metrics from Axiom using MPL (Metrics Processing Language). Use for otel-metrics-v1 datasets.`,
    params: [
      {
        name: 'datasetName',
        type: 'string',
        required: true,
        description: `The name of the otel-metrics-v1 dataset to query.`,
      },
      {
        name: 'mpl',
        type: 'string',
        required: true,
        description: `MPL (Metrics Processing Language) query expression to execute against the dataset.`,
      },
    ],
  },
  {
    name: 'axiommcp_search_metrics',
    description: `Search for metrics by name or partial name pattern.`,
    params: [
      {
        name: 'datasetName',
        type: 'string',
        required: true,
        description: `The name of the otel-metrics-v1 dataset to search within.`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `Search string to match metric names (partial match supported).`,
      },
    ],
  },
  {
    name: 'axiommcp_update_dashboard',
    description: `Update an existing dashboard's metadata or configuration.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The dashboard ID.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New dashboard description.`,
      },
      { name: 'name', type: 'string', required: false, description: `New dashboard name.` },
    ],
  },
  {
    name: 'axiommcp_update_dashboard_chart',
    description: `Update a specific chart within a dashboard.`,
    params: [
      { name: 'chartId', type: 'string', required: true, description: `The chart ID to update.` },
      { name: 'dashboardId', type: 'string', required: true, description: `The dashboard ID.` },
      { name: 'query', type: 'string', required: false, description: `APL query for the chart.` },
    ],
  },
  {
    name: 'axiommcp_update_monitor',
    description: `Update an existing monitor's configuration, query, or threshold.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The monitor ID.` },
      { name: 'apl', type: 'string', required: false, description: `New APL query.` },
      { name: 'name', type: 'string', required: false, description: `New monitor name.` },
      { name: 'threshold', type: 'number', required: false, description: `New threshold value.` },
    ],
  },
  {
    name: 'axiommcp_update_notifier',
    description: `Update an existing notifier's configuration.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The notifier ID.` },
      { name: 'name', type: 'string', required: false, description: `New notifier name.` },
    ],
  },
]
