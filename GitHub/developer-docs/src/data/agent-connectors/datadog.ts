import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'datadog_api_key_validate',
    description: `Validate the current Datadog API key.`,
    params: [],
  },
  {
    name: 'datadog_audit_logs_search',
    description: `Search audit log events in Datadog for a given time window.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `Start of the time window in ISO 8601 format, e.g. 'now-1h' or '2023-01-01T00:00:00Z'.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `End of the time window in ISO 8601 format, e.g. 'now' or '2023-01-02T00:00:00Z'.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of audit events to return (max 1000).`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filter query for the audit log search.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order: 'timestamp' for ascending, '-timestamp' for descending.`,
      },
    ],
  },
  {
    name: 'datadog_containers_list',
    description: `List all containers running on your infrastructure.`,
    params: [
      {
        name: 'filter_tags',
        type: 'string',
        required: false,
        description: `Filter containers by tag.`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination to get the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of containers to return per page.`,
      },
    ],
  },
  {
    name: 'datadog_current_user_get',
    description: `Get the current authenticated Datadog user.`,
    params: [],
  },
  {
    name: 'datadog_dashboard_create',
    description: `Create a new Datadog dashboard.`,
    params: [
      {
        name: 'layout_type',
        type: 'string',
        required: true,
        description: `Layout type for the dashboard (ordered or free).`,
      },
      { name: 'title', type: 'string', required: true, description: `Title of the dashboard.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the dashboard.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `JSON array of tags for the dashboard.`,
      },
      {
        name: 'template_variables',
        type: 'string',
        required: false,
        description: `JSON array of template variable objects.`,
      },
      {
        name: 'widgets',
        type: 'string',
        required: false,
        description: `JSON array of widget objects for the dashboard.`,
      },
    ],
  },
  {
    name: 'datadog_dashboard_delete',
    description: `Delete a Datadog dashboard by ID.`,
    params: [
      {
        name: 'dashboard_id',
        type: 'string',
        required: true,
        description: `ID of the dashboard to delete.`,
      },
    ],
  },
  {
    name: 'datadog_dashboard_get',
    description: `Get a specific Datadog dashboard by ID.`,
    params: [
      {
        name: 'dashboard_id',
        type: 'string',
        required: true,
        description: `ID of the dashboard to retrieve.`,
      },
    ],
  },
  {
    name: 'datadog_dashboard_update',
    description: `Update an existing Datadog dashboard.`,
    params: [
      {
        name: 'dashboard_id',
        type: 'string',
        required: true,
        description: `ID of the dashboard to update.`,
      },
      {
        name: 'layout_type',
        type: 'string',
        required: true,
        description: `Layout type for the dashboard (ordered or free).`,
      },
      { name: 'title', type: 'string', required: true, description: `Title of the dashboard.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the dashboard.`,
      },
      {
        name: 'widgets',
        type: 'string',
        required: false,
        description: `JSON array of widget objects for the dashboard.`,
      },
    ],
  },
  {
    name: 'datadog_dashboards_list',
    description: `List all Datadog dashboards.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Maximum number of dashboards to return.`,
      },
      {
        name: 'filter_deleted',
        type: 'string',
        required: false,
        description: `Filter deleted dashboards (true/false).`,
      },
      {
        name: 'filter_shared',
        type: 'string',
        required: false,
        description: `Filter shared dashboards (true/false).`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `Start index for pagination.`,
      },
    ],
  },
  {
    name: 'datadog_downtime_cancel',
    description: `Cancel a Datadog downtime by ID.`,
    params: [
      {
        name: 'downtime_id',
        type: 'string',
        required: true,
        description: `ID of the downtime to cancel.`,
      },
    ],
  },
  {
    name: 'datadog_downtime_create',
    description: `Create a new Datadog downtime to suppress alerts.`,
    params: [
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `Scope of the downtime, e.g. * or env:prod.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `ISO-8601 UTC datetime when the downtime ends, e.g. 2026-04-28T12:00:00+00:00.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Message to include with the downtime.`,
      },
      {
        name: 'monitor_id',
        type: 'integer',
        required: false,
        description: `Monitor ID to apply the downtime to. Omit to apply to all monitors.`,
      },
      {
        name: 'monitor_tags',
        type: 'string',
        required: false,
        description: `JSON array of monitor tags to match for the downtime, e.g. ["*"] for all monitors.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `ISO-8601 UTC datetime when the downtime starts, e.g. 2026-04-28T10:00:00+00:00.`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `Timezone for the downtime schedule (IANA format).`,
      },
    ],
  },
  {
    name: 'datadog_downtime_get',
    description: `Get a specific Datadog downtime by ID.`,
    params: [
      {
        name: 'downtime_id',
        type: 'string',
        required: true,
        description: `ID of the downtime to retrieve.`,
      },
    ],
  },
  {
    name: 'datadog_downtime_update',
    description: `Update an existing Datadog downtime.`,
    params: [
      {
        name: 'downtime_id',
        type: 'string',
        required: true,
        description: `ID of the downtime to update.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Updated message for the downtime.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Updated scope of the downtime.`,
      },
    ],
  },
  {
    name: 'datadog_downtimes_list',
    description: `List all Datadog downtimes.`,
    params: [
      {
        name: 'filter_monitor_id',
        type: 'integer',
        required: false,
        description: `Filter downtimes by monitor ID.`,
      },
      {
        name: 'page_limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page.`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination.`,
      },
    ],
  },
  {
    name: 'datadog_event_create',
    description: `Create a new event in Datadog.`,
    params: [
      { name: 'text', type: 'string', required: true, description: `Body text of the event.` },
      { name: 'title', type: 'string', required: true, description: `Title of the event.` },
      {
        name: 'aggregation_key',
        type: 'string',
        required: false,
        description: `Key to aggregate related events.`,
      },
      {
        name: 'alert_type',
        type: 'string',
        required: false,
        description: `Alert type: info, error, warning, success, user_update, recommendation, snapshot.`,
      },
      {
        name: 'date_happened',
        type: 'integer',
        required: false,
        description: `Unix timestamp when the event occurred.`,
      },
      {
        name: 'host',
        type: 'string',
        required: false,
        description: `Host name to associate with the event.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Priority of the event: normal or low.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `JSON array of tags for the event.`,
      },
    ],
  },
  {
    name: 'datadog_event_get',
    description: `Get a specific Datadog event by ID.`,
    params: [
      {
        name: 'event_id',
        type: 'string',
        required: true,
        description: `ID of the event to retrieve. Use the id_str value from event_create or events_list_v2 to avoid float precision loss.`,
      },
    ],
  },
  {
    name: 'datadog_events_list_v2',
    description: `List Datadog events using the v2 API with filtering and pagination.`,
    params: [
      {
        name: 'filter_from',
        type: 'string',
        required: false,
        description: `ISO 8601 datetime for start of the filter range.`,
      },
      {
        name: 'filter_query',
        type: 'string',
        required: false,
        description: `Search query to filter events.`,
      },
      {
        name: 'filter_to',
        type: 'string',
        required: false,
        description: `ISO 8601 datetime for end of the filter range.`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination.`,
      },
      {
        name: 'page_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of events to return.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order for events (timestamp or asc).`,
      },
    ],
  },
  {
    name: 'datadog_events_query',
    description: `Query Datadog events within a time range.`,
    params: [
      {
        name: 'end',
        type: 'integer',
        required: true,
        description: `Unix timestamp for end of query window.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: true,
        description: `Unix timestamp for start of query window.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Maximum number of events to return.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Priority filter: normal or low.`,
      },
      {
        name: 'sources',
        type: 'string',
        required: false,
        description: `Comma-separated event sources to filter by.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `Comma-separated tags to filter events by.`,
      },
      {
        name: 'unaggregated',
        type: 'string',
        required: false,
        description: `Whether to return unaggregated events (true/false).`,
      },
    ],
  },
  {
    name: 'datadog_graph_snapshot',
    description: `Take a snapshot of a metric graph in Datadog.`,
    params: [
      {
        name: 'end',
        type: 'integer',
        required: true,
        description: `End of the time window as a Unix timestamp (seconds).`,
      },
      {
        name: 'metric_query',
        type: 'string',
        required: true,
        description: `The Datadog metric query for the graph snapshot.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: true,
        description: `Start of the time window as a Unix timestamp (seconds).`,
      },
      {
        name: 'event_query',
        type: 'string',
        required: false,
        description: `Query string to add event bands to the snapshot graph.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title for the snapshot graph.`,
      },
    ],
  },
  {
    name: 'datadog_host_mute',
    description: `Mute a Datadog host to suppress alerts.`,
    params: [
      {
        name: 'host_name',
        type: 'string',
        required: true,
        description: `Name of the host to mute.`,
      },
      {
        name: 'end',
        type: 'integer',
        required: false,
        description: `Unix timestamp when the mute ends.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Message describing why the host is being muted.`,
      },
      {
        name: 'override',
        type: 'string',
        required: false,
        description: `Whether to override an existing mute (true/false).`,
      },
    ],
  },
  {
    name: 'datadog_host_tags_create',
    description: `Add tags to a specific host in Datadog.`,
    params: [
      {
        name: 'host_name',
        type: 'string',
        required: true,
        description: `The hostname to add tags to.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: true,
        description: `JSON array of tag strings to add to the host. E.g. ["env:prod","role:db"].`,
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: `The source of the tags (optional). Used to filter tags by source.`,
      },
    ],
  },
  {
    name: 'datadog_host_tags_delete',
    description: `Remove all tags from a specific host in Datadog.`,
    params: [
      {
        name: 'host_name',
        type: 'string',
        required: true,
        description: `The hostname to remove all tags from.`,
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: `The source of the tags to remove (optional).`,
      },
    ],
  },
  {
    name: 'datadog_host_tags_get',
    description: `Get all tags for a specific host.`,
    params: [
      {
        name: 'host_name',
        type: 'string',
        required: true,
        description: `The hostname to retrieve tags for.`,
      },
    ],
  },
  {
    name: 'datadog_host_tags_update',
    description: `Replace all tags for a specific host in Datadog.`,
    params: [
      {
        name: 'host_name',
        type: 'string',
        required: true,
        description: `The hostname whose tags will be replaced.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: true,
        description: `JSON array of tag strings to set on the host. Replaces all existing tags. E.g. ["env:prod","role:db"].`,
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: `The source of the tags (optional).`,
      },
    ],
  },
  {
    name: 'datadog_host_unmute',
    description: `Unmute a Datadog host.`,
    params: [
      {
        name: 'host_name',
        type: 'string',
        required: true,
        description: `Name of the host to unmute.`,
      },
    ],
  },
  {
    name: 'datadog_hosts_list',
    description: `List Datadog hosts with optional filtering and sorting.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Maximum number of hosts to return.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter string to search hosts.`,
      },
      {
        name: 'include_muted_hosts_data',
        type: 'string',
        required: false,
        description: `Whether to include muted hosts data (true/false).`,
      },
      {
        name: 'sort_dir',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc.`,
      },
      {
        name: 'sort_field',
        type: 'string',
        required: false,
        description: `Field to sort hosts by.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `Starting offset for pagination.`,
      },
    ],
  },
  {
    name: 'datadog_hosts_totals',
    description: `Get the total number of active and up Datadog hosts.`,
    params: [],
  },
  {
    name: 'datadog_incident_create',
    description: `Create a new Datadog incident.`,
    params: [
      {
        name: 'customer_impacted',
        type: 'string',
        required: true,
        description: `Whether customers are impacted (true/false).`,
      },
      { name: 'title', type: 'string', required: true, description: `Title of the incident.` },
      {
        name: 'severity',
        type: 'string',
        required: false,
        description: `Severity level: SEV-1, SEV-2, SEV-3, SEV-4, SEV-5, or UNKNOWN.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Initial state: active, stable, or resolved.`,
      },
    ],
  },
  {
    name: 'datadog_incident_get',
    description: `Get a specific Datadog incident by ID.`,
    params: [
      {
        name: 'incident_id',
        type: 'string',
        required: true,
        description: `ID of the incident to retrieve.`,
      },
    ],
  },
  {
    name: 'datadog_incidents_list',
    description: `List Datadog incidents with optional filtering.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Search query to filter incidents.`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of incidents per page.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field: created or modified.`,
      },
    ],
  },
  {
    name: 'datadog_ip_ranges_list',
    description: `Get all IP ranges used by Datadog agents and services.`,
    params: [],
  },
  {
    name: 'datadog_log_indexes_list',
    description: `List all Datadog log indexes.`,
    params: [],
  },
  {
    name: 'datadog_log_pipeline_get',
    description: `Get a specific Datadog log processing pipeline by ID.`,
    params: [
      {
        name: 'pipeline_id',
        type: 'string',
        required: true,
        description: `ID of the log pipeline to retrieve.`,
      },
    ],
  },
  {
    name: 'datadog_log_pipelines_list',
    description: `List all Datadog log processing pipelines.`,
    params: [],
  },
  {
    name: 'datadog_logs_aggregate',
    description: `Aggregate Datadog log events with grouping and compute operations.`,
    params: [
      {
        name: 'compute',
        type: 'string',
        required: true,
        description: `JSON array of compute objects defining aggregations.`,
      },
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `ISO 8601 start time for log aggregation.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `ISO 8601 end time for log aggregation.`,
      },
      {
        name: 'group_by',
        type: 'string',
        required: false,
        description: `JSON array of group_by objects.`,
      },
      { name: 'query', type: 'string', required: false, description: `Log filter query string.` },
    ],
  },
  {
    name: 'datadog_logs_search',
    description: `Search and filter Datadog log events.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `ISO 8601 start time for the log search.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `ISO 8601 end time for the log search.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching next page.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of log events to return (max 1000).`,
      },
      { name: 'query', type: 'string', required: false, description: `Log search query string.` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order: timestamp (newest first) or asc (oldest first).`,
      },
    ],
  },
  {
    name: 'datadog_metric_metadata_get',
    description: `Get metadata for a specific Datadog metric.`,
    params: [
      {
        name: 'metric_name',
        type: 'string',
        required: true,
        description: `Name of the metric to retrieve metadata for.`,
      },
    ],
  },
  {
    name: 'datadog_metric_metadata_update',
    description: `Update metadata for a specific Datadog metric.`,
    params: [
      {
        name: 'metric_name',
        type: 'string',
        required: true,
        description: `Name of the metric to update metadata for.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the metric.`,
      },
      {
        name: 'short_name',
        type: 'string',
        required: false,
        description: `Short name for the metric.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Metric type: gauge, rate, or count.`,
      },
      { name: 'unit', type: 'string', required: false, description: `Unit of the metric.` },
    ],
  },
  {
    name: 'datadog_metric_tags_list',
    description: `List all tags for a specific Datadog metric.`,
    params: [
      {
        name: 'metric_name',
        type: 'string',
        required: true,
        description: `Name of the metric to list tags for.`,
      },
    ],
  },
  {
    name: 'datadog_metrics_list',
    description: `List active metrics reported from a given Unix timestamp.`,
    params: [
      {
        name: 'from',
        type: 'integer',
        required: true,
        description: `Unix timestamp from which to start the search.`,
      },
      {
        name: 'host',
        type: 'string',
        required: false,
        description: `Hostname to filter the list of metrics to those active on this host.`,
      },
      {
        name: 'tag_filter',
        type: 'string',
        required: false,
        description: `Filter metrics by tag.`,
      },
    ],
  },
  {
    name: 'datadog_metrics_query',
    description: `Query timeseries metric data from Datadog.`,
    params: [
      {
        name: 'from',
        type: 'integer',
        required: true,
        description: `Unix timestamp for start of query window.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Datadog metric query string.`,
      },
      {
        name: 'to',
        type: 'integer',
        required: true,
        description: `Unix timestamp for end of query window.`,
      },
    ],
  },
  {
    name: 'datadog_metrics_submit',
    description: `Submit metric data points to Datadog.`,
    params: [
      {
        name: 'metric_name',
        type: 'string',
        required: true,
        description: `Name of the metric to submit.`,
      },
      {
        name: 'metric_type',
        type: 'integer',
        required: true,
        description: `Metric type: 0=unspecified, 1=count, 2=rate, 3=gauge.`,
      },
      {
        name: 'points_timestamps',
        type: 'string',
        required: true,
        description: `JSON array of Unix timestamps for the data points.`,
      },
      {
        name: 'points_values',
        type: 'string',
        required: true,
        description: `JSON array of float values corresponding to each timestamp.`,
      },
      {
        name: 'host',
        type: 'string',
        required: false,
        description: `Host name to associate with the metric.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `JSON array of tag strings to associate with the metric.`,
      },
    ],
  },
  {
    name: 'datadog_monitor_create',
    description: `Create a new Datadog monitor.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the monitor.` },
      { name: 'query', type: 'string', required: true, description: `The monitor query string.` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Type of the monitor (e.g. metric alert, service check, event alert, query alert).`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Notification message for the monitor.`,
      },
      {
        name: 'no_data_timeframe',
        type: 'integer',
        required: false,
        description: `Number of minutes before notifying on missing data.`,
      },
      {
        name: 'notify_no_data',
        type: 'string',
        required: false,
        description: `Whether to notify when no data is received (true/false).`,
      },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Monitor priority from 1 (highest) to 5 (lowest).`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `JSON array of tags to associate with the monitor.`,
      },
    ],
  },
  {
    name: 'datadog_monitor_delete',
    description: `Delete a Datadog monitor by ID.`,
    params: [
      {
        name: 'monitor_id',
        type: 'integer',
        required: true,
        description: `ID of the monitor to delete.`,
      },
    ],
  },
  {
    name: 'datadog_monitor_get',
    description: `Get a specific Datadog monitor by ID.`,
    params: [
      {
        name: 'monitor_id',
        type: 'integer',
        required: true,
        description: `ID of the monitor to retrieve.`,
      },
    ],
  },
  {
    name: 'datadog_monitor_mute',
    description: `Mute a Datadog monitor, optionally with a scope and end time.`,
    params: [
      {
        name: 'monitor_id',
        type: 'integer',
        required: true,
        description: `ID of the monitor to mute.`,
      },
      {
        name: 'end',
        type: 'integer',
        required: false,
        description: `Unix timestamp when the mute should end.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Scope to apply the mute to, e.g. role:db.`,
      },
    ],
  },
  {
    name: 'datadog_monitor_search',
    description: `Search Datadog monitors using a query string.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
      { name: 'query', type: 'string', required: false, description: `Search query string.` },
      { name: 'sort', type: 'string', required: false, description: `Sort field and direction.` },
    ],
  },
  {
    name: 'datadog_monitor_unmute',
    description: `Unmute a Datadog monitor.`,
    params: [
      {
        name: 'monitor_id',
        type: 'integer',
        required: true,
        description: `ID of the monitor to unmute.`,
      },
    ],
  },
  {
    name: 'datadog_monitor_update',
    description: `Update an existing Datadog monitor.`,
    params: [
      {
        name: 'monitor_id',
        type: 'integer',
        required: true,
        description: `ID of the monitor to update.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Updated notification message for the monitor.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the monitor.` },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Monitor priority from 1 (highest) to 5 (lowest).`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Updated query string for the monitor.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `JSON array of tags to associate with the monitor.`,
      },
    ],
  },
  {
    name: 'datadog_monitors_list',
    description: `List all Datadog monitors with optional filtering.`,
    params: [
      {
        name: 'group_states',
        type: 'string',
        required: false,
        description: `Comma-separated list of group states to filter by (e.g. alert,warn).`,
      },
      {
        name: 'monitor_tags',
        type: 'string',
        required: false,
        description: `Comma-separated list of monitor tags.`,
      },
      { name: 'name', type: 'string', required: false, description: `Filter monitors by name.` },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of monitors to return per page.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `Comma-separated list of tags to filter monitors.`,
      },
      {
        name: 'with_downtimes',
        type: 'string',
        required: false,
        description: `Whether to include downtime information (true/false).`,
      },
    ],
  },
  {
    name: 'datadog_notebook_create',
    description: `Create a new notebook in Datadog.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the notebook.` },
      {
        name: 'cells',
        type: 'string',
        required: false,
        description: `JSON array of notebook cell objects to include in the notebook.`,
      },
    ],
  },
  {
    name: 'datadog_notebook_delete',
    description: `Delete a specific notebook by its ID.`,
    params: [
      {
        name: 'notebook_id',
        type: 'integer',
        required: true,
        description: `The ID of the notebook to delete.`,
      },
    ],
  },
  {
    name: 'datadog_notebook_get',
    description: `Get a specific Datadog notebook by its ID.`,
    params: [
      {
        name: 'notebook_id',
        type: 'integer',
        required: true,
        description: `The ID of the notebook to retrieve.`,
      },
    ],
  },
  {
    name: 'datadog_notebooks_list',
    description: `List all notebooks available in your Datadog account.`,
    params: [
      {
        name: 'author_handle',
        type: 'string',
        required: false,
        description: `Filter notebooks by the author's handle.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `The number of notebooks to return per page.`,
      },
      {
        name: 'include_cells',
        type: 'string',
        required: false,
        description: `Whether to include notebook cells in the response. Use 'true' or 'false'.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filter notebooks by a text query string.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The offset for pagination (number of notebooks to skip).`,
      },
    ],
  },
  {
    name: 'datadog_permissions_list',
    description: `List all available Datadog permissions.`,
    params: [],
  },
  {
    name: 'datadog_processes_list',
    description: `List live processes running on your infrastructure.`,
    params: [
      {
        name: 'from',
        type: 'integer',
        required: false,
        description: `Start of the time window as a Unix timestamp (seconds).`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination to get the next page of results.`,
      },
      {
        name: 'page_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of processes to return (max 1000).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter processes by name or command.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `Comma-separated list of tags to filter processes.`,
      },
      {
        name: 'to',
        type: 'integer',
        required: false,
        description: `End of the time window as a Unix timestamp (seconds).`,
      },
    ],
  },
  {
    name: 'datadog_role_create',
    description: `Create a new Datadog role.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name for the new role.` },
      {
        name: 'permissions',
        type: 'string',
        required: false,
        description: `JSON array of permission objects to assign to the role.`,
      },
    ],
  },
  {
    name: 'datadog_role_get',
    description: `Get a specific Datadog role by ID.`,
    params: [
      {
        name: 'role_id',
        type: 'string',
        required: true,
        description: `UUID of the role to retrieve.`,
      },
    ],
  },
  {
    name: 'datadog_roles_list',
    description: `List all Datadog roles.`,
    params: [
      { name: 'filter', type: 'string', required: false, description: `Filter roles by name.` },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of roles per page.`,
      },
      { name: 'sort', type: 'string', required: false, description: `Field to sort roles by.` },
    ],
  },
  {
    name: 'datadog_rum_application_create',
    description: `Create a new Datadog RUM application.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the RUM application.` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Type of the RUM application: browser, ios, android, react-native, flutter, or roku.`,
      },
    ],
  },
  {
    name: 'datadog_rum_application_get',
    description: `Get a specific RUM application by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the RUM application to retrieve.`,
      },
    ],
  },
  {
    name: 'datadog_rum_applications_list',
    description: `List all Datadog RUM applications.`,
    params: [],
  },
  {
    name: 'datadog_service_check_submit',
    description: `Submit a service check result to Datadog.`,
    params: [
      {
        name: 'check',
        type: 'string',
        required: true,
        description: `The name of the service check, e.g. 'app.is_ok'.`,
      },
      {
        name: 'host_name',
        type: 'string',
        required: true,
        description: `The hostname associated with this service check.`,
      },
      {
        name: 'status',
        type: 'integer',
        required: true,
        description: `The status of the service check. 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `A message describing the current state of the service check.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `JSON array of tag strings to associate with the service check. E.g. ["env:prod","role:db"].`,
      },
    ],
  },
  {
    name: 'datadog_slo_create',
    description: `Create a new Service Level Objective (SLO) in Datadog.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the SLO.` },
      {
        name: 'thresholds',
        type: 'string',
        required: true,
        description: `JSON array of threshold objects, e.g. [{"timeframe":"7d","target":99.9}].`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Type of SLO: metric or monitor.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the SLO.`,
      },
      {
        name: 'monitor_ids',
        type: 'string',
        required: false,
        description: `JSON array of monitor IDs for a monitor-based SLO.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `JSON object with numerator and denominator for metric-based SLOs.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `JSON array of tags for the SLO.`,
      },
    ],
  },
  {
    name: 'datadog_slo_delete',
    description: `Delete a Datadog Service Level Objective by ID.`,
    params: [
      { name: 'slo_id', type: 'string', required: true, description: `ID of the SLO to delete.` },
    ],
  },
  {
    name: 'datadog_slo_get',
    description: `Get a specific Datadog Service Level Objective by ID.`,
    params: [
      { name: 'slo_id', type: 'string', required: true, description: `ID of the SLO to retrieve.` },
    ],
  },
  {
    name: 'datadog_slo_history',
    description: `Get historical data for a specific Datadog SLO.`,
    params: [
      {
        name: 'from_ts',
        type: 'integer',
        required: true,
        description: `Unix timestamp for start of the history range.`,
      },
      { name: 'slo_id', type: 'string', required: true, description: `ID of the SLO.` },
      {
        name: 'to_ts',
        type: 'integer',
        required: true,
        description: `Unix timestamp for end of the history range.`,
      },
      {
        name: 'target',
        type: 'string',
        required: false,
        description: `Custom target value for the history calculation.`,
      },
    ],
  },
  {
    name: 'datadog_slo_update',
    description: `Update an existing Datadog Service Level Objective.`,
    params: [
      { name: 'slo_id', type: 'string', required: true, description: `ID of the SLO to update.` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Type of SLO: metric or monitor. Required by the Datadog API on update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description for the SLO.`,
      },
      { name: 'name', type: 'string', required: false, description: `Updated name for the SLO.` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `JSON object with numerator and denominator for metric-type SLOs.`,
      },
      { name: 'tags', type: 'string', required: false, description: `JSON array of updated tags.` },
      {
        name: 'thresholds',
        type: 'string',
        required: false,
        description: `JSON array of updated threshold objects.`,
      },
    ],
  },
  {
    name: 'datadog_slos_list',
    description: `List Service Level Objectives (SLOs) in Datadog.`,
    params: [
      {
        name: 'ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of SLO IDs to retrieve.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of SLOs to return.`,
      },
      { name: 'offset', type: 'integer', required: false, description: `Offset for pagination.` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter SLOs by name.`,
      },
      { name: 'tags_query', type: 'string', required: false, description: `Filter SLOs by tags.` },
    ],
  },
  {
    name: 'datadog_synthetics_api_test_get',
    description: `Get a specific Datadog Synthetics API test by public ID.`,
    params: [
      {
        name: 'public_id',
        type: 'string',
        required: true,
        description: `Public ID of the Synthetics API test.`,
      },
    ],
  },
  {
    name: 'datadog_synthetics_browser_test_get',
    description: `Get a specific Datadog Synthetics browser test by public ID.`,
    params: [
      {
        name: 'public_id',
        type: 'string',
        required: true,
        description: `Public ID of the Synthetics browser test.`,
      },
    ],
  },
  {
    name: 'datadog_synthetics_global_variables_list',
    description: `List all Datadog Synthetics global variables.`,
    params: [],
  },
  {
    name: 'datadog_synthetics_locations_list',
    description: `List all Datadog Synthetics locations (public and private).`,
    params: [],
  },
  {
    name: 'datadog_synthetics_test_delete',
    description: `Delete one or more Datadog Synthetics tests by public ID.`,
    params: [
      {
        name: 'public_ids',
        type: 'string',
        required: true,
        description: `JSON array of public IDs of Synthetics tests to delete.`,
      },
    ],
  },
  {
    name: 'datadog_synthetics_test_pause_resume',
    description: `Pause or resume a Datadog Synthetics test.`,
    params: [
      {
        name: 'new_status',
        type: 'string',
        required: true,
        description: `New status for the test: live or paused.`,
      },
      {
        name: 'public_id',
        type: 'string',
        required: true,
        description: `Public ID of the Synthetics test.`,
      },
    ],
  },
  {
    name: 'datadog_synthetics_test_results_get',
    description: `Get the latest results for a specific Datadog Synthetics test.`,
    params: [
      {
        name: 'public_id',
        type: 'string',
        required: true,
        description: `Public ID of the Synthetics test.`,
      },
      {
        name: 'from_ts',
        type: 'integer',
        required: false,
        description: `Unix timestamp for start of results range.`,
      },
      {
        name: 'to_ts',
        type: 'integer',
        required: false,
        description: `Unix timestamp for end of results range.`,
      },
    ],
  },
  {
    name: 'datadog_synthetics_test_trigger',
    description: `Trigger one or more Datadog Synthetics tests to run immediately.`,
    params: [
      {
        name: 'tests',
        type: 'string',
        required: true,
        description: `JSON array of test objects with public_id.`,
      },
    ],
  },
  {
    name: 'datadog_synthetics_tests_list',
    description: `List all Datadog Synthetics tests.`,
    params: [
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of tests to return per page.`,
      },
    ],
  },
  {
    name: 'datadog_user_create',
    description: `Create a new Datadog user.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address of the new user.`,
      },
      { name: 'name', type: 'string', required: false, description: `Display name of the user.` },
      {
        name: 'roles',
        type: 'string',
        required: false,
        description: `JSON array of role IDs to assign to the user.`,
      },
      { name: 'title', type: 'string', required: false, description: `Job title of the user.` },
    ],
  },
  {
    name: 'datadog_user_disable',
    description: `Disable a Datadog user account by UUID.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `UUID of the user to disable.`,
      },
    ],
  },
  {
    name: 'datadog_user_get',
    description: `Get a specific Datadog user by UUID.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `UUID of the user to retrieve.`,
      },
    ],
  },
  {
    name: 'datadog_user_roles_list',
    description: `Get all roles assigned to a specific Datadog user.`,
    params: [{ name: 'user_id', type: 'string', required: true, description: `UUID of the user.` }],
  },
  {
    name: 'datadog_user_update',
    description: `Update an existing Datadog user.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `UUID of the user to update.`,
      },
      {
        name: 'disabled',
        type: 'string',
        required: false,
        description: `Whether to disable the user (true/false).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated display name for the user.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Updated job title for the user.`,
      },
    ],
  },
  {
    name: 'datadog_users_list',
    description: `List Datadog users with optional filtering.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter string to search users by name or email.`,
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of users per page.`,
      },
      { name: 'sort', type: 'string', required: false, description: `Field to sort users by.` },
      {
        name: 'sort_dir',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc.`,
      },
    ],
  },
]
