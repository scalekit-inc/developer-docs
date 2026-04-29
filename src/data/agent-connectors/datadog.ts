import type { ToolDefinition } from '@/types/tools'

export const tools: ToolDefinition[] = [
  // Account
  {
    name: "datadog_api_key_validate",
    description: "Validate the current Datadog API key.",
    parameters: [],
  },
  {
    name: "datadog_current_user_get",
    description: "Get the current authenticated Datadog user.",
    parameters: [],
  },
  {
    name: "datadog_permissions_list",
    description: "List all available Datadog permissions.",
    parameters: [],
  },
  {
    name: "datadog_ip_ranges_list",
    description: "Get all IP ranges used by Datadog agents and services.",
    parameters: [],
  },
  // Dashboards
  {
    name: "datadog_dashboards_list",
    description: "List all Datadog dashboards.",
    parameters: [
      {
        name: "count",
        type: "integer",
        required: false,
        description: "50",
      },
      {
        name: "filter_deleted",
        type: "string",
        required: false,
        description: "false",
      },
      {
        name: "filter_shared",
        type: "string",
        required: false,
        description: "true",
      },
      {
        name: "start",
        type: "integer",
        required: false,
        description: "0",
      },
    ],
  },
  {
    name: "datadog_dashboard_get",
    description: "Get a specific Datadog dashboard by ID.",
    parameters: [
      {
        name: "dashboard_id",
        type: "string",
        required: true,
        description: "abc-def-ghi",
      },
    ],
  },
  {
    name: "datadog_dashboard_create",
    description: "Create a new Datadog dashboard.",
    parameters: [
      {
        name: "description",
        type: "string",
        required: false,
        description: "Overview of my service metrics",
      },
      {
        name: "layout_type",
        type: "string",
        required: true,
        description: "ordered",
      },
      {
        name: "tags",
        type: "string",
        required: false,
        description: "[\"team:ops\"]",
      },
      {
        name: "template_variables",
        type: "string",
        required: false,
        description: "[]",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "My Service Dashboard",
      },
      {
        name: "widgets",
        type: "string",
        required: false,
        description: "[]",
      },
    ],
  },
  {
    name: "datadog_dashboard_update",
    description: "Update an existing Datadog dashboard.",
    parameters: [
      {
        name: "dashboard_id",
        type: "string",
        required: true,
        description: "abc-def-ghi",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Overview of my service metrics",
      },
      {
        name: "layout_type",
        type: "string",
        required: true,
        description: "ordered",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "My Service Dashboard",
      },
      {
        name: "widgets",
        type: "string",
        required: false,
        description: "[]",
      },
    ],
  },
  {
    name: "datadog_dashboard_delete",
    description: "Delete a Datadog dashboard by ID.",
    parameters: [
      {
        name: "dashboard_id",
        type: "string",
        required: true,
        description: "abc-def-ghi",
      },
    ],
  },
  {
    name: "datadog_graph_snapshot",
    description: "Take a snapshot of a metric graph in Datadog.",
    parameters: [
      {
        name: "end",
        type: "integer",
        required: true,
        description: "1672617600",
      },
      {
        name: "event_query",
        type: "string",
        required: false,
        description: "tags:deploy",
      },
      {
        name: "metric_query",
        type: "string",
        required: true,
        description: "avg:system.cpu.user{*}",
      },
      {
        name: "start",
        type: "integer",
        required: true,
        description: "1672531200",
      },
      {
        name: "title",
        type: "string",
        required: false,
        description: "CPU Usage Over Time",
      },
    ],
  },
  // Monitors & downtimes
  {
    name: "datadog_monitors_list",
    description: "List all Datadog monitors with optional filtering.",
    parameters: [
      {
        name: "group_states",
        type: "string",
        required: false,
        description: "alert,warn",
      },
      {
        name: "monitor_tags",
        type: "string",
        required: false,
        description: "team:backend",
      },
      {
        name: "name",
        type: "string",
        required: false,
        description: "CPU monitor",
      },
      {
        name: "page",
        type: "integer",
        required: false,
        description: "0",
      },
      {
        name: "page_size",
        type: "integer",
        required: false,
        description: "100",
      },
      {
        name: "tags",
        type: "string",
        required: false,
        description: "env:prod",
      },
      {
        name: "with_downtimes",
        type: "string",
        required: false,
        description: "true",
      },
    ],
  },
  {
    name: "datadog_monitor_get",
    description: "Get a specific Datadog monitor by ID.",
    parameters: [
      {
        name: "monitor_id",
        type: "integer",
        required: true,
        description: "123456",
      },
    ],
  },
  {
    name: "datadog_monitor_create",
    description: "Create a new Datadog monitor.",
    parameters: [
      {
        name: "message",
        type: "string",
        required: false,
        description: "CPU usage is high on {{host.name}}",
      },
      {
        name: "name",
        type: "string",
        required: true,
        description: "High CPU Usage",
      },
      {
        name: "no_data_timeframe",
        type: "integer",
        required: false,
        description: "10",
      },
      {
        name: "notify_no_data",
        type: "string",
        required: false,
        description: "true",
      },
      {
        name: "priority",
        type: "integer",
        required: false,
        description: "3",
      },
      {
        name: "query",
        type: "string",
        required: true,
        description: "avg(last_5m):avg:system.cpu.user{*} > 90",
      },
      {
        name: "tags",
        type: "string",
        required: false,
        description: "[\"env:prod\"]",
      },
      {
        name: "type",
        type: "string",
        required: true,
        description: "metric alert",
      },
    ],
  },
  {
    name: "datadog_monitor_update",
    description: "Update an existing Datadog monitor.",
    parameters: [
      {
        name: "message",
        type: "string",
        required: false,
        description: "CPU usage is high on {{host.name}}",
      },
      {
        name: "monitor_id",
        type: "integer",
        required: true,
        description: "123456",
      },
      {
        name: "name",
        type: "string",
        required: false,
        description: "High CPU Usage",
      },
      {
        name: "priority",
        type: "integer",
        required: false,
        description: "3",
      },
      {
        name: "query",
        type: "string",
        required: false,
        description: "avg(last_5m):avg:system.cpu.user{*} > 90",
      },
      {
        name: "tags",
        type: "string",
        required: false,
        description: "[\"env:prod\"]",
      },
    ],
  },
  {
    name: "datadog_monitor_delete",
    description: "Delete a Datadog monitor by ID.",
    parameters: [
      {
        name: "monitor_id",
        type: "integer",
        required: true,
        description: "123456",
      },
    ],
  },
  {
    name: "datadog_monitor_search",
    description: "Search Datadog monitors using a query string.",
    parameters: [
      {
        name: "page",
        type: "integer",
        required: false,
        description: "0",
      },
      {
        name: "per_page",
        type: "integer",
        required: false,
        description: "30",
      },
      {
        name: "query",
        type: "string",
        required: false,
        description: "cpu",
      },
      {
        name: "sort",
        type: "string",
        required: false,
        description: "name,asc",
      },
    ],
  },
  {
    name: "datadog_monitor_mute",
    description: "Mute a Datadog monitor, optionally with a scope and end time.",
    parameters: [
      {
        name: "end",
        type: "integer",
        required: false,
        description: "1609545600",
      },
      {
        name: "monitor_id",
        type: "integer",
        required: true,
        description: "123456",
      },
      {
        name: "scope",
        type: "string",
        required: false,
        description: "role:db",
      },
    ],
  },
  {
    name: "datadog_monitor_unmute",
    description: "Unmute a Datadog monitor.",
    parameters: [
      {
        name: "monitor_id",
        type: "integer",
        required: true,
        description: "123456",
      },
    ],
  },
  {
    name: "datadog_downtimes_list",
    description: "List all Datadog downtimes.",
    parameters: [
      {
        name: "filter_monitor_id",
        type: "integer",
        required: false,
        description: "123456",
      },
      {
        name: "page_limit",
        type: "integer",
        required: false,
        description: "25",
      },
      {
        name: "page_offset",
        type: "integer",
        required: false,
        description: "0",
      },
    ],
  },
  {
    name: "datadog_downtime_get",
    description: "Get a specific Datadog downtime by ID.",
    parameters: [
      {
        name: "downtime_id",
        type: "string",
        required: true,
        description: "00000000-0000-0000-0000-000000000000",
      },
    ],
  },
  {
    name: "datadog_downtime_create",
    description: "Create a new Datadog downtime to suppress alerts.",
    parameters: [
      {
        name: "end",
        type: "string",
        required: false,
        description: "2026-04-28T12:00:00+00:00",
      },
      {
        name: "message",
        type: "string",
        required: false,
        description: "Scheduled maintenance",
      },
      {
        name: "monitor_id",
        type: "integer",
        required: false,
        description: "123456",
      },
      {
        name: "monitor_tags",
        type: "string",
        required: false,
        description: "[\"*\"]",
      },
      {
        name: "scope",
        type: "string",
        required: true,
        description: "env:prod",
      },
      {
        name: "start",
        type: "string",
        required: false,
        description: "2026-04-28T10:00:00+00:00",
      },
      {
        name: "timezone",
        type: "string",
        required: false,
        description: "UTC",
      },
    ],
  },
  {
    name: "datadog_downtime_update",
    description: "Update an existing Datadog downtime.",
    parameters: [
      {
        name: "downtime_id",
        type: "string",
        required: true,
        description: "00000000-0000-0000-0000-000000000000",
      },
      {
        name: "message",
        type: "string",
        required: false,
        description: "Extended maintenance window",
      },
      {
        name: "scope",
        type: "string",
        required: false,
        description: "env:prod",
      },
    ],
  },
  {
    name: "datadog_downtime_cancel",
    description: "Cancel a Datadog downtime by ID.",
    parameters: [
      {
        name: "downtime_id",
        type: "string",
        required: true,
        description: "00000000-0000-0000-0000-000000000000",
      },
    ],
  },
  // Incidents
  {
    name: "datadog_incidents_list",
    description: "List Datadog incidents with optional filtering.",
    parameters: [
      {
        name: "filter",
        type: "string",
        required: false,
        description: "service:payment",
      },
      {
        name: "page_offset",
        type: "integer",
        required: false,
        description: "0",
      },
      {
        name: "page_size",
        type: "integer",
        required: false,
        description: "10",
      },
      {
        name: "sort",
        type: "string",
        required: false,
        description: "created",
      },
    ],
  },
  {
    name: "datadog_incident_get",
    description: "Get a specific Datadog incident by ID.",
    parameters: [
      {
        name: "incident_id",
        type: "string",
        required: true,
        description: "00000000-0000-0000-0000-000000000000",
      },
    ],
  },
  {
    name: "datadog_incident_create",
    description: "Create a new Datadog incident.",
    parameters: [
      {
        name: "customer_impacted",
        type: "string",
        required: true,
        description: "true",
      },
      {
        name: "severity",
        type: "string",
        required: false,
        description: "SEV-2",
      },
      {
        name: "state",
        type: "string",
        required: false,
        description: "active",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "Database connection failures",
      },
    ],
  },
  // SLOs
  {
    name: "datadog_slos_list",
    description: "List Service Level Objectives (SLOs) in Datadog.",
    parameters: [
      {
        name: "ids",
        type: "string",
        required: false,
        description: "id1,id2,id3",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "25",
      },
      {
        name: "offset",
        type: "integer",
        required: false,
        description: "0",
      },
      {
        name: "query",
        type: "string",
        required: false,
        description: "my service",
      },
      {
        name: "tags_query",
        type: "string",
        required: false,
        description: "env:prod",
      },
    ],
  },
  {
    name: "datadog_slo_get",
    description: "Get a specific Datadog Service Level Objective by ID.",
    parameters: [
      {
        name: "slo_id",
        type: "string",
        required: true,
        description: "abc123def456",
      },
    ],
  },
  {
    name: "datadog_slo_create",
    description: "Create a new Service Level Objective (SLO) in Datadog.",
    parameters: [
      {
        name: "description",
        type: "string",
        required: false,
        description: "Tracks API availability over 7 days",
      },
      {
        name: "monitor_ids",
        type: "string",
        required: false,
        description: "[123456, 789012]",
      },
      {
        name: "name",
        type: "string",
        required: true,
        description: "API Uptime SLO",
      },
      {
        name: "tags",
        type: "string",
        required: false,
        description: "[\"env:prod\"]",
      },
      {
        name: "thresholds",
        type: "string",
        required: true,
        description: "[{\"timeframe\":\"7d\",\"target\":99.9}]",
      },
      {
        name: "query",
        type: "string",
        required: false,
        description: "{\"numerator\":\"sum:requests.success{*}.as_count()\",\"denominator\":\"sum:requests.total{*}.as_count()\"}",
      },
      {
        name: "type",
        type: "string",
        required: true,
        description: "metric",
      },
    ],
  },
  {
    name: "datadog_slo_update",
    description: "Update an existing Datadog Service Level Objective.",
    parameters: [
      {
        name: "description",
        type: "string",
        required: false,
        description: "Updated description",
      },
      {
        name: "name",
        type: "string",
        required: false,
        description: "API Uptime SLO",
      },
      {
        name: "slo_id",
        type: "string",
        required: true,
        description: "abc123def456",
      },
      {
        name: "tags",
        type: "string",
        required: false,
        description: "[\"env:prod\"]",
      },
      {
        name: "thresholds",
        type: "string",
        required: false,
        description: "[{\"timeframe\":\"30d\",\"target\":99.5}]",
      },
      {
        name: "type",
        type: "string",
        required: true,
        description: "monitor",
      },
    ],
  },
  {
    name: "datadog_slo_delete",
    description: "Delete a Datadog Service Level Objective by ID.",
    parameters: [
      {
        name: "slo_id",
        type: "string",
        required: true,
        description: "abc123def456",
      },
    ],
  },
  {
    name: "datadog_slo_history",
    description: "Get historical data for a specific Datadog SLO.",
    parameters: [
      {
        name: "from_ts",
        type: "integer",
        required: true,
        description: "1609459200",
      },
      {
        name: "slo_id",
        type: "string",
        required: true,
        description: "abc123def456",
      },
      {
        name: "target",
        type: "string",
        required: false,
        description: "99.9",
      },
      {
        name: "to_ts",
        type: "integer",
        required: true,
        description: "1609545600",
      },
    ],
  },
  // Metrics
  {
    name: "datadog_metrics_list",
    description: "List active metrics reported from a given Unix timestamp.",
    parameters: [
      {
        name: "from",
        type: "integer",
        required: true,
        description: "1609459200",
      },
      {
        name: "host",
        type: "string",
        required: false,
        description: "my-host.example.com",
      },
      {
        name: "tag_filter",
        type: "string",
        required: false,
        description: "env:prod",
      },
    ],
  },
  {
    name: "datadog_metrics_query",
    description: "Query timeseries metric data from Datadog.",
    parameters: [
      {
        name: "from",
        type: "integer",
        required: true,
        description: "1609459200",
      },
      {
        name: "query",
        type: "string",
        required: true,
        description: "avg:system.cpu.user{*}",
      },
      {
        name: "to",
        type: "integer",
        required: true,
        description: "1609545600",
      },
    ],
  },
  {
    name: "datadog_metrics_submit",
    description: "Submit metric data points to Datadog.",
    parameters: [
      {
        name: "host",
        type: "string",
        required: false,
        description: "my-host.example.com",
      },
      {
        name: "metric_name",
        type: "string",
        required: true,
        description: "my.custom.metric",
      },
      {
        name: "metric_type",
        type: "integer",
        required: true,
        description: "3",
      },
      {
        name: "points_timestamps",
        type: "string",
        required: true,
        description: "[1609459200]",
      },
      {
        name: "points_values",
        type: "string",
        required: true,
        description: "[42.5]",
      },
      {
        name: "tags",
        type: "string",
        required: false,
        description: "[\"env:prod\"]",
      },
    ],
  },
  {
    name: "datadog_metric_metadata_get",
    description: "Get metadata for a specific Datadog metric.",
    parameters: [
      {
        name: "metric_name",
        type: "string",
        required: true,
        description: "system.cpu.user",
      },
    ],
  },
  {
    name: "datadog_metric_metadata_update",
    description: "Update metadata for a specific Datadog metric.",
    parameters: [
      {
        name: "description",
        type: "string",
        required: false,
        description: "CPU usage percentage",
      },
      {
        name: "metric_name",
        type: "string",
        required: true,
        description: "system.cpu.user",
      },
      {
        name: "short_name",
        type: "string",
        required: false,
        description: "cpu user",
      },
      {
        name: "type",
        type: "string",
        required: false,
        description: "gauge",
      },
      {
        name: "unit",
        type: "string",
        required: false,
        description: "percent",
      },
    ],
  },
  {
    name: "datadog_metric_tags_list",
    description: "List all tags for a specific Datadog metric.",
    parameters: [
      {
        name: "metric_name",
        type: "string",
        required: true,
        description: "system.cpu.user",
      },
    ],
  },
  // Logs
  {
    name: "datadog_logs_search",
    description: "Search and filter Datadog log events.",
    parameters: [
      {
        name: "cursor",
        type: "string",
        required: false,
        description: "eyJzdGFydEF0IjoiMjAyMS0wMS0wMVQwMDowMDowMFoifQ==",
      },
      {
        name: "from",
        type: "string",
        required: true,
        description: "2021-01-01T00:00:00Z",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "100",
      },
      {
        name: "query",
        type: "string",
        required: false,
        description: "service:web status:error",
      },
      {
        name: "sort",
        type: "string",
        required: false,
        description: "timestamp",
      },
      {
        name: "to",
        type: "string",
        required: true,
        description: "2021-01-02T00:00:00Z",
      },
    ],
  },
  {
    name: "datadog_logs_aggregate",
    description: "Aggregate Datadog log events with grouping and compute operations.",
    parameters: [
      {
        name: "compute",
        type: "string",
        required: true,
        description: "[{\"aggregation\":\"count\",\"type\":\"total\"}]",
      },
      {
        name: "from",
        type: "string",
        required: true,
        description: "2021-01-01T00:00:00Z",
      },
      {
        name: "group_by",
        type: "string",
        required: false,
        description: "[{\"facet\":\"service\"}]",
      },
      {
        name: "query",
        type: "string",
        required: false,
        description: "service:web",
      },
      {
        name: "to",
        type: "string",
        required: true,
        description: "2021-01-02T00:00:00Z",
      },
    ],
  },
  {
    name: "datadog_log_indexes_list",
    description: "List all Datadog log indexes.",
    parameters: [],
  },
  {
    name: "datadog_log_pipeline_get",
    description: "Get a specific Datadog log processing pipeline by ID.",
    parameters: [
      {
        name: "pipeline_id",
        type: "string",
        required: true,
        description: "my-pipeline-id",
      },
    ],
  },
  {
    name: "datadog_log_pipelines_list",
    description: "List all Datadog log processing pipelines.",
    parameters: [],
  },
  {
    name: "datadog_audit_logs_search",
    description: "Search audit log events in Datadog for a given time window.",
    parameters: [
      {
        name: "cursor",
        type: "string",
        required: false,
        description: "eyJzdGFydEF0IjoiMjAy...",
      },
      {
        name: "from",
        type: "string",
        required: true,
        description: "now-1h",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "25",
      },
      {
        name: "query",
        type: "string",
        required: false,
        description: "@action:login",
      },
      {
        name: "sort",
        type: "string",
        required: false,
        description: "-timestamp",
      },
      {
        name: "to",
        type: "string",
        required: true,
        description: "now",
      },
    ],
  },
  // Events
  {
    name: "datadog_events_query",
    description: "Query Datadog events within a time range.",
    parameters: [
      {
        name: "count",
        type: "integer",
        required: false,
        description: "100",
      },
      {
        name: "end",
        type: "integer",
        required: true,
        description: "1609545600",
      },
      {
        name: "page",
        type: "integer",
        required: false,
        description: "0",
      },
      {
        name: "priority",
        type: "string",
        required: false,
        description: "normal",
      },
      {
        name: "sources",
        type: "string",
        required: false,
        description: "my-app",
      },
      {
        name: "start",
        type: "integer",
        required: true,
        description: "1609459200",
      },
      {
        name: "tags",
        type: "string",
        required: false,
        description: "env:prod",
      },
      {
        name: "unaggregated",
        type: "string",
        required: false,
        description: "false",
      },
    ],
  },
  {
    name: "datadog_events_list_v2",
    description: "List Datadog events using the v2 API with filtering and pagination.",
    parameters: [
      {
        name: "filter_from",
        type: "string",
        required: false,
        description: "2021-01-01T00:00:00Z",
      },
      {
        name: "filter_query",
        type: "string",
        required: false,
        description: "source:my-app",
      },
      {
        name: "filter_to",
        type: "string",
        required: false,
        description: "2021-01-02T00:00:00Z",
      },
      {
        name: "page_cursor",
        type: "string",
        required: false,
        description: "eyJzdGFydEF0IjoiMjAyMS0wMS0wMVQwMDowMDowMFoifQ==",
      },
      {
        name: "page_limit",
        type: "integer",
        required: false,
        description: "25",
      },
      {
        name: "sort",
        type: "string",
        required: false,
        description: "timestamp",
      },
    ],
  },
  {
    name: "datadog_event_get",
    description: "Get a specific Datadog event by ID.",
    parameters: [
      {
        name: "event_id",
        type: "integer",
        required: true,
        description: "1234567890",
      },
    ],
  },
  {
    name: "datadog_event_create",
    description: "Create a new event in Datadog.",
    parameters: [
      {
        name: "aggregation_key",
        type: "string",
        required: false,
        description: "my-deployment",
      },
      {
        name: "alert_type",
        type: "string",
        required: false,
        description: "info",
      },
      {
        name: "date_happened",
        type: "integer",
        required: false,
        description: "1609459200",
      },
      {
        name: "host",
        type: "string",
        required: false,
        description: "web-01.example.com",
      },
      {
        name: "priority",
        type: "string",
        required: false,
        description: "normal",
      },
      {
        name: "tags",
        type: "string",
        required: false,
        description: "[\"env:prod\"]",
      },
      {
        name: "text",
        type: "string",
        required: true,
        description: "Service v2.1.0 deployed successfully.",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "Deployment completed",
      },
    ],
  },
  // Infrastructure
  {
    name: "datadog_hosts_list",
    description: "List Datadog hosts with optional filtering and sorting.",
    parameters: [
      {
        name: "count",
        type: "integer",
        required: false,
        description: "100",
      },
      {
        name: "filter",
        type: "string",
        required: false,
        description: "env:prod",
      },
      {
        name: "include_muted_hosts_data",
        type: "string",
        required: false,
        description: "true",
      },
      {
        name: "sort_dir",
        type: "string",
        required: false,
        description: "desc",
      },
      {
        name: "sort_field",
        type: "string",
        required: false,
        description: "cpu",
      },
      {
        name: "start",
        type: "integer",
        required: false,
        description: "0",
      },
    ],
  },
  {
    name: "datadog_hosts_totals",
    description: "Get the total number of active and up Datadog hosts.",
    parameters: [],
  },
  {
    name: "datadog_host_mute",
    description: "Mute a Datadog host to suppress alerts.",
    parameters: [
      {
        name: "end",
        type: "integer",
        required: false,
        description: "1609545600",
      },
      {
        name: "host_name",
        type: "string",
        required: true,
        description: "web-01.example.com",
      },
      {
        name: "message",
        type: "string",
        required: false,
        description: "Scheduled maintenance",
      },
      {
        name: "override",
        type: "string",
        required: false,
        description: "false",
      },
    ],
  },
  {
    name: "datadog_host_unmute",
    description: "Unmute a Datadog host.",
    parameters: [
      {
        name: "host_name",
        type: "string",
        required: true,
        description: "web-01.example.com",
      },
    ],
  },
  {
    name: "datadog_host_tags_get",
    description: "Get all tags for a specific host.",
    parameters: [
      {
        name: "host_name",
        type: "string",
        required: true,
        description: "my-host.example.com",
      },
    ],
  },
  {
    name: "datadog_host_tags_create",
    description: "Add tags to a specific host in Datadog.",
    parameters: [
      {
        name: "host_name",
        type: "string",
        required: true,
        description: "my-host.example.com",
      },
      {
        name: "source",
        type: "string",
        required: false,
        description: "users",
      },
      {
        name: "tags",
        type: "string",
        required: true,
        description: "[\"env:prod\",\"role:db\"]",
      },
    ],
  },
  {
    name: "datadog_host_tags_update",
    description: "Replace all tags for a specific host in Datadog.",
    parameters: [
      {
        name: "host_name",
        type: "string",
        required: true,
        description: "my-host.example.com",
      },
      {
        name: "source",
        type: "string",
        required: false,
        description: "users",
      },
      {
        name: "tags",
        type: "string",
        required: true,
        description: "[\"env:prod\",\"role:db\"]",
      },
    ],
  },
  {
    name: "datadog_host_tags_delete",
    description: "Remove all tags from a specific host in Datadog.",
    parameters: [
      {
        name: "host_name",
        type: "string",
        required: true,
        description: "my-host.example.com",
      },
      {
        name: "source",
        type: "string",
        required: false,
        description: "users",
      },
    ],
  },
  {
    name: "datadog_containers_list",
    description: "List all containers running on your infrastructure.",
    parameters: [
      {
        name: "filter_tags",
        type: "string",
        required: false,
        description: "env:prod",
      },
      {
        name: "page_cursor",
        type: "string",
        required: false,
        description: "eyJzdGFydEF0IjoiMjAy...",
      },
      {
        name: "page_size",
        type: "integer",
        required: false,
        description: "1000",
      },
    ],
  },
  {
    name: "datadog_processes_list",
    description: "List live processes running on your infrastructure.",
    parameters: [
      {
        name: "from",
        type: "integer",
        required: false,
        description: "1672531200",
      },
      {
        name: "page_cursor",
        type: "string",
        required: false,
        description: "eyJzdGFydEF0IjoiMjAy...",
      },
      {
        name: "page_limit",
        type: "integer",
        required: false,
        description: "25",
      },
      {
        name: "search",
        type: "string",
        required: false,
        description: "nginx",
      },
      {
        name: "tags",
        type: "string",
        required: false,
        description: "env:prod,host:web-01",
      },
      {
        name: "to",
        type: "integer",
        required: false,
        description: "1672617600",
      },
    ],
  },
  // Synthetics
  {
    name: "datadog_synthetics_tests_list",
    description: "List all Datadog Synthetics tests.",
    parameters: [
      {
        name: "page_number",
        type: "integer",
        required: false,
        description: "0",
      },
      {
        name: "page_size",
        type: "integer",
        required: false,
        description: "25",
      },
    ],
  },
  {
    name: "datadog_synthetics_api_test_get",
    description: "Get a specific Datadog Synthetics API test by public ID.",
    parameters: [
      {
        name: "public_id",
        type: "string",
        required: true,
        description: "abc-def-ghi",
      },
    ],
  },
  {
    name: "datadog_synthetics_browser_test_get",
    description: "Get a specific Datadog Synthetics browser test by public ID.",
    parameters: [
      {
        name: "public_id",
        type: "string",
        required: true,
        description: "abc-def-ghi",
      },
    ],
  },
  {
    name: "datadog_synthetics_test_results_get",
    description: "Get the latest results for a specific Datadog Synthetics test.",
    parameters: [
      {
        name: "from_ts",
        type: "integer",
        required: false,
        description: "1609459200",
      },
      {
        name: "public_id",
        type: "string",
        required: true,
        description: "abc-def-ghi",
      },
      {
        name: "to_ts",
        type: "integer",
        required: false,
        description: "1609545600",
      },
    ],
  },
  {
    name: "datadog_synthetics_test_trigger",
    description: "Trigger one or more Datadog Synthetics tests to run immediately.",
    parameters: [
      {
        name: "tests",
        type: "string",
        required: true,
        description: "[{\"public_id\":\"abc-def-ghi\"}]",
      },
    ],
  },
  {
    name: "datadog_synthetics_test_pause_resume",
    description: "Pause or resume a Datadog Synthetics test.",
    parameters: [
      {
        name: "new_status",
        type: "string",
        required: true,
        description: "paused",
      },
      {
        name: "public_id",
        type: "string",
        required: true,
        description: "abc-def-ghi",
      },
    ],
  },
  {
    name: "datadog_synthetics_test_delete",
    description: "Delete one or more Datadog Synthetics tests by public ID.",
    parameters: [
      {
        name: "public_ids",
        type: "string",
        required: true,
        description: "[\"abc-def-ghi\"]",
      },
    ],
  },
  {
    name: "datadog_synthetics_locations_list",
    description: "List all Datadog Synthetics locations (public and private).",
    parameters: [],
  },
  {
    name: "datadog_synthetics_global_variables_list",
    description: "List all Datadog Synthetics global variables.",
    parameters: [],
  },
  // RUM
  {
    name: "datadog_rum_applications_list",
    description: "List all Datadog RUM applications.",
    parameters: [],
  },
  {
    name: "datadog_rum_application_get",
    description: "Get a specific RUM application by its ID.",
    parameters: [
      {
        name: "id",
        type: "string",
        required: true,
        description: "abc123",
      },
    ],
  },
  {
    name: "datadog_rum_application_create",
    description: "Create a new Datadog RUM application.",
    parameters: [
      {
        name: "name",
        type: "string",
        required: true,
        description: "My Web App",
      },
      {
        name: "type",
        type: "string",
        required: true,
        description: "browser",
      },
    ],
  },
  // Notebooks
  {
    name: "datadog_notebooks_list",
    description: "List all notebooks available in your Datadog account.",
    parameters: [
      {
        name: "author_handle",
        type: "string",
        required: false,
        description: "user@example.com",
      },
      {
        name: "count",
        type: "integer",
        required: false,
        description: "100",
      },
      {
        name: "include_cells",
        type: "string",
        required: false,
        description: "false",
      },
      {
        name: "query",
        type: "string",
        required: false,
        description: "my notebook",
      },
      {
        name: "start",
        type: "integer",
        required: false,
        description: "0",
      },
    ],
  },
  {
    name: "datadog_notebook_get",
    description: "Get a specific Datadog notebook by its ID.",
    parameters: [
      {
        name: "notebook_id",
        type: "integer",
        required: true,
        description: "12345",
      },
    ],
  },
  {
    name: "datadog_notebook_create",
    description: "Create a new notebook in Datadog.",
    parameters: [
      {
        name: "cells",
        type: "string",
        required: false,
        description: "[{\"type\": \"notebook_cells\", \"attributes\": {\"definition\": {\"type\": \"markdown\", \"text\": \"# Hello\"}}}]",
      },
      {
        name: "name",
        type: "string",
        required: true,
        description: "My Notebook",
      },
    ],
  },
  {
    name: "datadog_notebook_delete",
    description: "Delete a specific notebook by its ID.",
    parameters: [
      {
        name: "notebook_id",
        type: "integer",
        required: true,
        description: "12345",
      },
    ],
  },
  // Users & roles
  {
    name: "datadog_users_list",
    description: "List Datadog users with optional filtering.",
    parameters: [
      {
        name: "filter",
        type: "string",
        required: false,
        description: "john@example.com",
      },
      {
        name: "page_number",
        type: "integer",
        required: false,
        description: "0",
      },
      {
        name: "page_size",
        type: "integer",
        required: false,
        description: "10",
      },
      {
        name: "sort",
        type: "string",
        required: false,
        description: "name",
      },
      {
        name: "sort_dir",
        type: "string",
        required: false,
        description: "asc",
      },
    ],
  },
  {
    name: "datadog_user_get",
    description: "Get a specific Datadog user by UUID.",
    parameters: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "00000000-0000-0000-0000-000000000000",
      },
    ],
  },
  {
    name: "datadog_user_create",
    description: "Create a new Datadog user.",
    parameters: [
      {
        name: "email",
        type: "string",
        required: true,
        description: "user@example.com",
      },
      {
        name: "name",
        type: "string",
        required: false,
        description: "John Doe",
      },
      {
        name: "roles",
        type: "string",
        required: false,
        description: "[\"00000000-0000-0000-0000-000000000000\"]",
      },
      {
        name: "title",
        type: "string",
        required: false,
        description: "Software Engineer",
      },
    ],
  },
  {
    name: "datadog_user_update",
    description: "Update an existing Datadog user.",
    parameters: [
      {
        name: "disabled",
        type: "string",
        required: false,
        description: "false",
      },
      {
        name: "name",
        type: "string",
        required: false,
        description: "John Doe",
      },
      {
        name: "title",
        type: "string",
        required: false,
        description: "Senior Engineer",
      },
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "00000000-0000-0000-0000-000000000000",
      },
    ],
  },
  {
    name: "datadog_user_disable",
    description: "Disable a Datadog user account by UUID.",
    parameters: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "00000000-0000-0000-0000-000000000000",
      },
    ],
  },
  {
    name: "datadog_user_roles_list",
    description: "Get all roles assigned to a specific Datadog user.",
    parameters: [
      {
        name: "user_id",
        type: "string",
        required: true,
        description: "00000000-0000-0000-0000-000000000000",
      },
    ],
  },
  {
    name: "datadog_roles_list",
    description: "List all Datadog roles.",
    parameters: [
      {
        name: "filter",
        type: "string",
        required: false,
        description: "admin",
      },
      {
        name: "page_number",
        type: "integer",
        required: false,
        description: "0",
      },
      {
        name: "page_size",
        type: "integer",
        required: false,
        description: "10",
      },
      {
        name: "sort",
        type: "string",
        required: false,
        description: "name",
      },
    ],
  },
  {
    name: "datadog_role_get",
    description: "Get a specific Datadog role by ID.",
    parameters: [
      {
        name: "role_id",
        type: "string",
        required: true,
        description: "00000000-0000-0000-0000-000000000000",
      },
    ],
  },
  {
    name: "datadog_role_create",
    description: "Create a new Datadog role.",
    parameters: [
      {
        name: "name",
        type: "string",
        required: true,
        description: "Custom Admin Role",
      },
      {
        name: "permissions",
        type: "string",
        required: false,
        description: "[{\"type\":\"permissions\",\"id\":\"00000000-0000-0000-0000-000000000000\"}]",
      },
    ],
  },
  // Service checks
  {
    name: "datadog_service_check_submit",
    description: "Submit a service check result to Datadog.",
    parameters: [
      {
        name: "check",
        type: "string",
        required: true,
        description: "app.is_ok",
      },
      {
        name: "host_name",
        type: "string",
        required: true,
        description: "my-host.example.com",
      },
      {
        name: "message",
        type: "string",
        required: false,
        description: "Service is running normally.",
      },
      {
        name: "status",
        type: "integer",
        required: true,
        description: "0",
      },
      {
        name: "tags",
        type: "string",
        required: false,
        description: "[\"env:prod\",\"role:db\"]",
      },
    ],
  },
]
