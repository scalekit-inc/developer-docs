import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'posthogmcp_action_create',
    description: `Create a new action in the project. Actions define reusable event triggers based on page views, clicks, form submissions, or custom events. Each action can have multiple steps (OR conditions). Use actions to create composite events for insights and funnels. Example: Create a 'Sign Up Click' action with steps matching button clicks on the signup page.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Human-readable description of what this action represents.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name of the action (must be unique within the project)`,
      },
      {
        name: 'pinned_at',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp when the action was pinned, or null if not pinned. Set any value to pin, null to unpin.`,
      },
      {
        name: 'post_to_slack',
        type: 'boolean',
        required: false,
        description: `Whether to post a notification to Slack when this action is triggered.`,
      },
      {
        name: 'slack_message_format',
        type: 'string',
        required: false,
        description: `Custom Slack message format. Supports templates with event properties.`,
      },
      {
        name: 'steps',
        type: 'array',
        required: false,
        description: `Action steps defining trigger conditions. Each step matches events by name, properties, URL, or element attributes. Multiple steps are OR-ed together.`,
      },
      { name: 'tags', type: 'array', required: false, description: `Tags.` },
    ],
  },
  {
    name: 'posthogmcp_action_delete',
    description: `Delete an action by ID (soft delete - marks as deleted). The action will no longer appear in lists but historical data is preserved.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this action.`,
      },
    ],
  },
  {
    name: 'posthogmcp_action_get',
    description: `Get a specific action by ID. Returns the action configuration including all steps and their trigger conditions.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this action.`,
      },
    ],
  },
  {
    name: 'posthogmcp_action_update',
    description: `Update an existing action by ID. Can update name, description, steps, tags, and Slack notification settings.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Human-readable description of what this action represents.`,
      },
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this action.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name of the action (must be unique within the project).`,
      },
      {
        name: 'pinned_at',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp when the action was pinned, or null if not pinned. Set any value to pin, null to unpin.`,
      },
      {
        name: 'post_to_slack',
        type: 'boolean',
        required: false,
        description: `Whether to post a notification to Slack when this action is triggered.`,
      },
      {
        name: 'slack_message_format',
        type: 'string',
        required: false,
        description: `Custom Slack message format. Supports templates with event properties.`,
      },
      {
        name: 'steps',
        type: 'array',
        required: false,
        description: `Action steps defining trigger conditions. Each step matches events by name, properties, URL, or element attributes. Multiple steps are OR-ed together.`,
      },
      { name: 'tags', type: 'array', required: false, description: `Tags.` },
    ],
  },
  {
    name: 'posthogmcp_actions_get_all',
    description: `Get all actions in the project. Actions are reusable event definitions that can combine multiple trigger conditions (page views, clicks, form submissions) into a single trackable event for use in insights and funnels. Supports pagination with limit and offset parameters. Note: Search/filtering by name is not supported on this endpoint.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_activity_log_list',
    description: `List recent activity log entries for the project. Shows who did what and when — feature flag changes, dashboard edits, experiment launches, etc. Supports filtering by scope, user, and date range.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: false,
        description: `Filter by the ID of the affected resource.`,
      },
      {
        name: 'page',
        type: 'number',
        required: false,
        description: `Page number for pagination. When provided, uses page-based pagination ordered by most recent first.`,
      },
      {
        name: 'page_size',
        type: 'number',
        required: false,
        description: `Number of results per page (default: 100, max: 1000). Only used with page-based pagination.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Filter by a single activity scope, e.g. "FeatureFlag", "Insight", "Dashboard", "Experiment".  * 'Cohort' - Cohort * 'FeatureFlag' - FeatureFlag * 'Person' - Person * 'Group' - Group * 'Insight' - Insight * 'Plugin' - Plugin * 'PluginConfig' - PluginConfig * 'HogFunction' - HogFunction * 'HogFlow' - HogFlow * 'DataManagement' - DataManagement * 'EventDefinition' - EventDefinition * 'PropertyDefinition' - PropertyDefinition * 'Notebook' - Notebook * 'Endpoint' - Endpoint * 'EndpointVersion' - EndpointVersion * 'Dashboard' - Dashboard * 'Replay' - Replay * 'Experiment' - Experiment * 'ExperimentHoldout' - ExperimentHoldout * 'ExperimentSavedMetric' - ExperimentSavedMetric * 'Survey' - Survey * 'EarlyAccessFeature' - EarlyAccessFeature * 'SessionRecordingPlaylist' - SessionRecordingPlaylist * 'Comment' - Comment * 'Team' - Team * 'Project' - Project * 'ErrorTrackingIssue' - ErrorTrackingIssue * 'DataWarehouseSavedQuery' - DataWarehouseSavedQuery * 'Organization' - Organization * 'OrganizationDomain' - OrganizationDomain * 'OrganizationMembership' - OrganizationMembership * 'Role' - Role * 'UserGroup' - UserGroup * 'BatchExport' - BatchExport * 'BatchImport' - BatchImport * 'Integration' - Integration * 'Annotation' - Annotation * 'Tag' - Tag * 'TaggedItem' - TaggedItem * 'Subscription' - Subscription * 'PersonalAPIKey' - PersonalAPIKey * 'ProjectSecretAPIKey' - ProjectSecretAPIKey * 'User' - User * 'Action' - Action * 'AlertConfiguration' - AlertConfiguration * 'Threshold' - Threshold * 'AlertSubscription' - AlertSubscription * 'ExternalDataSource' - ExternalDataSource * 'ExternalDataSchema' - ExternalDataSchema * 'LLMTrace' - LLMTrace * 'WebAnalyticsFilterPreset' - WebAnalyticsFilterPreset * 'CustomerProfileConfig' - CustomerProfileConfig * 'Log' - Log * 'LogsAlertConfiguration' - LogsAlertConfiguration * 'ProductTour' - ProductTour * 'Ticket' - Ticket`,
      },
      {
        name: 'scopes',
        type: 'array',
        required: false,
        description: `Filter by multiple activity scopes, comma-separated. Values must be valid ActivityScope enum values. E.g. "FeatureFlag,Insight".`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `Filter by user UUID who performed the action.`,
      },
    ],
  },
  {
    name: 'posthogmcp_advanced_activity_logs_filters',
    description: `Get the available filter options for activity logs — scopes, activity types, and users that have logged activity. Useful for building filter UIs or understanding what kinds of activity are tracked.`,
    params: [],
  },
  {
    name: 'posthogmcp_advanced_activity_logs_list',
    description: `List activity log entries with advanced filtering, sorting, and field-level diffs. Supports filtering by scope, activity type, user, date range, and search text.`,
    params: [
      { name: 'activities', type: 'array', required: false, description: `Activities.` },
      { name: 'clients', type: 'array', required: false, description: `Clients.` },
      { name: 'detail_filters', type: 'string', required: false, description: `Detail filters.` },
      { name: 'end_date', type: 'string', required: false, description: `End date.` },
      { name: 'hogql_filter', type: 'string', required: false, description: `Hogql filter.` },
      { name: 'is_system', type: 'boolean', required: false, description: `Is system.` },
      { name: 'item_ids', type: 'array', required: false, description: `Item ids.` },
      {
        name: 'page',
        type: 'number',
        required: false,
        description: `Page number for pagination. When provided, uses page-based pagination ordered by most recent first.`,
      },
      {
        name: 'page_size',
        type: 'number',
        required: false,
        description: `Number of results per page (default: 100, max: 1000). Only used with page-based pagination.`,
      },
      { name: 'scopes', type: 'array', required: false, description: `Scopes.` },
      { name: 'search_text', type: 'string', required: false, description: `Search text.` },
      { name: 'start_date', type: 'string', required: false, description: `Start date.` },
      { name: 'users', type: 'array', required: false, description: `Users.` },
      {
        name: 'was_impersonated',
        type: 'boolean',
        required: false,
        description: `Was impersonated.`,
      },
    ],
  },
  {
    name: 'posthogmcp_alert_create',
    description: `Create a new alert on an insight. Alerts can use either threshold-based conditions or anomaly detection. For threshold alerts: set condition (absolute_value, relative_increase, relative_decrease) and threshold configuration with bounds. For anomaly detection: set detector_config with a detector type (zscore, mad, iqr, threshold, copod, ecod, hbos, isolation_forest, knn, lof, ocsvm, pca) and parameters like threshold (sensitivity 0-1, default 0.9) and window size. Ensemble detectors combine 2+ sub-detectors with AND/OR logic. Requires an insight ID and at least one subscribed user.`,
    params: [
      {
        name: 'calculation_interval',
        type: 'string',
        required: false,
        description: `How often the alert is checked: hourly, daily, weekly, or monthly.  * 'hourly' - hourly * 'daily' - daily * 'weekly' - weekly * 'monthly' - monthly`,
      },
      {
        name: 'condition',
        type: 'object',
        required: false,
        description: `Alert condition type. Determines how the value is evaluated: absolute_value, relative_increase, or relative_decrease.`,
      },
      {
        name: 'config',
        type: 'object',
        required: false,
        description: `Trends-specific alert configuration. Includes series_index (which series to monitor) and check_ongoing_interval (whether to check the current incomplete interval).`,
      },
      { name: 'detector_config', type: 'object', required: false, description: `Detector config.` },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the alert is actively being evaluated.`,
      },
      {
        name: 'insight',
        type: 'number',
        required: true,
        description: `Insight ID monitored by this alert. Note: Response returns full InsightBasicSerializer object.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Human-readable name for the alert.`,
      },
      {
        name: 'schedule_restriction',
        type: 'object',
        required: false,
        description: `Blocked local time windows (HH:MM in the project timezone). Interval is half-open [start, end): start inclusive, end exclusive. Use blocked_windows array of {start, end}. Null disables.`,
      },
      {
        name: 'skip_weekend',
        type: 'boolean',
        required: false,
        description: `Skip alert evaluation on weekends (Saturday and Sunday, local to project timezone).`,
      },
      {
        name: 'snoozed_until',
        type: 'string',
        required: false,
        description: `Snooze the alert until this time. Pass a relative date string (e.g. '2h', '1d') or null to unsnooze.`,
      },
      {
        name: 'subscribed_users',
        type: 'array',
        required: true,
        description: `User IDs to subscribe to this alert. Note: Response returns full UserBasicSerializer object.`,
      },
      {
        name: 'threshold',
        type: 'object',
        required: true,
        description: `Threshold configuration with bounds and type for evaluating the alert.`,
      },
    ],
  },
  {
    name: 'posthogmcp_alert_delete',
    description: `Delete an alert by ID. This permanently removes the alert and all its check history. Subscribed users will no longer receive notifications.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this alert configuration.`,
      },
    ],
  },
  {
    name: 'posthogmcp_alert_get',
    description: `Get a specific alert by ID. Returns the full alert configuration including check results, threshold settings, detector_config (for anomaly detection alerts), and subscribed users. Check results include anomaly_scores, triggered_points, and triggered_dates for detector-based alerts. By default returns the last 5 checks. Use checks_date_from and checks_date_to (e.g. '-24h', '-7d') to get checks within a time window, and checks_limit to control the maximum returned (default 5, max 500). When date filters are provided without checks_limit, up to 500 checks are returned. Check history is retained for 14 days.`,
    params: [
      {
        name: 'checks_date_from',
        type: 'string',
        required: false,
        description: `Relative date string for the start of the check history window (e.g. '-24h', '-7d', '-14d'). Returns checks created after this time. Max retention is 14 days.`,
      },
      {
        name: 'checks_date_to',
        type: 'string',
        required: false,
        description: `Relative date string for the end of the check history window (e.g. '-1h', '-1d'). Defaults to now if not specified.`,
      },
      {
        name: 'checks_limit',
        type: 'number',
        required: false,
        description: `Maximum number of check results to return (default 5, max 500). Applied after date filtering.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this alert configuration.`,
      },
    ],
  },
  {
    name: 'posthogmcp_alert_simulate',
    description: `Run an anomaly detector on an insight's historical data without creating any alert or check records. Use this to preview how a detector configuration would perform before saving it as an alert. Requires an insight ID and a detector_config object with a type (zscore, mad, iqr, copod, ecod, hbos, isolation_forest, knn, lof, ocsvm, pca, or ensemble). Optionally specify date_from (e.g. '-48h', '-30d') to control how far back to simulate, and series_index to pick which series to analyze. Returns data values, anomaly scores per point, triggered indices and dates, and for ensemble detectors, per-sub-detector score breakdowns.`,
    params: [
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Relative date string for how far back to simulate (e.g. '-24h', '-30d', '-4w'). If not provided, uses the detector's minimum required samples.`,
      },
      {
        name: 'detector_config',
        type: 'object',
        required: true,
        description: `Detector configuration to simulate.`,
      },
      {
        name: 'insight',
        type: 'number',
        required: true,
        description: `Insight ID to simulate the detector on.`,
      },
      {
        name: 'series_index',
        type: 'number',
        required: false,
        description: `Zero-based index of the series to analyze.`,
      },
    ],
  },
  {
    name: 'posthogmcp_alert_update',
    description: `Update an existing alert by ID. Can update name, threshold, condition, config, detector_config, subscribed users, enabled state, calculation interval, and weekend skipping. Set detector_config to switch to anomaly detection, or set it to null to switch back to threshold mode. To snooze an alert, set snoozed_until to a relative date string (e.g. '2h', '1d'). To unsnooze, set snoozed_until to null.`,
    params: [
      {
        name: 'calculation_interval',
        type: 'string',
        required: false,
        description: `How often the alert is checked: hourly, daily, weekly, or monthly.  * 'hourly' - hourly * 'daily' - daily * 'weekly' - weekly * 'monthly' - monthly`,
      },
      {
        name: 'condition',
        type: 'object',
        required: false,
        description: `Alert condition type. Determines how the value is evaluated: absolute_value, relative_increase, or relative_decrease.`,
      },
      {
        name: 'config',
        type: 'object',
        required: false,
        description: `Trends-specific alert configuration. Includes series_index (which series to monitor) and check_ongoing_interval (whether to check the current incomplete interval).`,
      },
      { name: 'detector_config', type: 'object', required: false, description: `Detector config.` },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the alert is actively being evaluated.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this alert configuration.`,
      },
      {
        name: 'insight',
        type: 'number',
        required: false,
        description: `Insight ID monitored by this alert. Note: Response returns full InsightBasicSerializer object.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Human-readable name for the alert.`,
      },
      {
        name: 'schedule_restriction',
        type: 'object',
        required: false,
        description: `Blocked local time windows (HH:MM in the project timezone). Interval is half-open [start, end): start inclusive, end exclusive. Use blocked_windows array of {start, end}. Null disables.`,
      },
      {
        name: 'skip_weekend',
        type: 'boolean',
        required: false,
        description: `Skip alert evaluation on weekends (Saturday and Sunday, local to project timezone).`,
      },
      {
        name: 'snoozed_until',
        type: 'string',
        required: false,
        description: `Snooze the alert until this time. Pass a relative date string (e.g. '2h', '1d') or null to unsnooze.`,
      },
      {
        name: 'subscribed_users',
        type: 'array',
        required: false,
        description: `User IDs to subscribe to this alert. Note: Response returns full UserBasicSerializer object.`,
      },
      {
        name: 'threshold',
        type: 'object',
        required: false,
        description: `Threshold configuration with bounds and type for evaluating the alert.`,
      },
    ],
  },
  {
    name: 'posthogmcp_alerts_list',
    description: `List all insight alerts in the project. Returns alerts with their current state, threshold or detector configuration, timing information, and firing check history. Supports filtering by insight ID via query parameter. Alerts can use either threshold-based conditions (absolute_value, relative_increase, relative_decrease) or anomaly detection via detector_config (zscore, mad, iqr, isolation_forest, knn, etc.).`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_annotation_create',
    description: `Create an annotation to mark an important change (for example, a deployment) on charts and trends. Provide a note in \`content\`, when it happened in \`date_marker\` (ISO 8601), and whether it is scoped to the current \`project\` or the whole \`organization\`.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Annotation text shown on charts to describe the change, release, or incident.`,
      },
      {
        name: 'date_marker',
        type: 'string',
        required: false,
        description: `When this annotation happened (ISO 8601 timestamp). Used to position it on charts.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Annotation visibility scope: 'project', 'organization', 'dashboard', or 'dashboard_item'. 'recording' is deprecated and rejected.  * 'dashboard_item' - insight * 'dashboard' - dashboard * 'project' - project * 'organization' - organization * 'recording' - recording`,
      },
    ],
  },
  {
    name: 'posthogmcp_annotation_delete',
    description: `Soft-delete an annotation by ID. This hides the annotation from normal lists while preserving historical records.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this annotation.`,
      },
    ],
  },
  {
    name: 'posthogmcp_annotation_retrieve',
    description: `Retrieve a single annotation by ID from the current project. Use this when you already know the annotation ID and want complete details.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this annotation.`,
      },
    ],
  },
  {
    name: 'posthogmcp_annotations_list',
    description: `List annotations in the current project, newest first. Use this to review existing deployment markers and analysis notes before adding new annotations.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      { name: 'search', type: 'string', required: false, description: `A search term.` },
    ],
  },
  {
    name: 'posthogmcp_annotations_partial_update',
    description: `Update an existing annotation by ID. You can change its text (\`content\`), when it happened (\`date_marker\`, ISO 8601), or its visibility scope (\`project\` or \`organization\`). Only the fields you provide are updated.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Annotation text shown on charts to describe the change, release, or incident.`,
      },
      {
        name: 'date_marker',
        type: 'string',
        required: false,
        description: `When this annotation happened (ISO 8601 timestamp). Used to position it on charts.`,
      },
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this annotation.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Annotation visibility scope: 'project', 'organization', 'dashboard', or 'dashboard_item'. 'recording' is deprecated and rejected.  * 'dashboard_item' - insight * 'dashboard' - dashboard * 'project' - project * 'organization' - organization * 'recording' - recording`,
      },
    ],
  },
  {
    name: 'posthogmcp_approval_policies_list',
    description: `List all approval policies configured for this project. Shows which actions require approval, who can approve, and bypass rules.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_approval_policy_get',
    description: `Get details of an approval policy including conditions, approver configuration, quorum requirements, and bypass rules.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this approval policy.`,
      },
    ],
  },
  {
    name: 'posthogmcp_cdp_function_templates_list',
    description: `List available function templates. Templates are pre-built function configurations for common integrations (Slack, webhooks, email, etc.) and transformations (GeoIP, etc.). Filter by type (destination, site_destination, site_app, transformation, etc.) via the 'type' query parameter. Results are sorted by popularity (number of active functions using each template).`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      {
        name: 'template_id',
        type: 'string',
        required: false,
        description: `Filter to a specific template by its template_id. Deprecated templates are excluded from list results; use the retrieve endpoint to look up a template by ID regardless of status.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter by template type (e.g. destination, email, sms_provider, broadcast). Defaults to destination if neither type nor types is provided.`,
      },
      {
        name: 'types',
        type: 'string',
        required: false,
        description: `Comma-separated list of template types to include (e.g. destination,email,sms_provider).`,
      },
    ],
  },
  {
    name: 'posthogmcp_cdp_function_templates_retrieve',
    description: `Get a specific function template by its template ID (e.g. 'template-slack', 'template-geoip'). Returns the full template including source code, inputs schema, default filters, and mapping templates. Use this to understand what inputs a template requires before creating a function from it.`,
    params: [{ name: 'template_id', type: 'string', required: true, description: `Template id.` }],
  },
  {
    name: 'posthogmcp_cdp_functions_create',
    description: `Create a new function. Requires 'type' (destination, site_destination, internal_destination, source_webhook, warehouse_source_webhook, site_app, or transformation) and either 'hog' source code or a 'template_id' to derive code from a template. Provide 'inputs_schema' to define configurable parameters and 'inputs' with their values. Use 'filters' to control which events trigger the function. Transformations run during ingestion and have an 'execution_order' field.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Human-readable description of what this function does.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the function is active and processing events.`,
      },
      {
        name: 'execution_order',
        type: 'number',
        required: false,
        description: `Execution priority for transformation functions (lower runs first). Only applies to type=transformation. If omitted, the function is appended at the end.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Event filters that control which events trigger this function.`,
      },
      {
        name: 'hog',
        type: 'string',
        required: false,
        description: `Source code for the function. For most types this is Hog code; for site_destination and site_app types this is TypeScript. Required if no template_id is provided.`,
      },
      {
        name: 'icon_url',
        type: 'string',
        required: false,
        description: `URL for the function's icon displayed in the UI.`,
      },
      {
        name: 'inputs',
        type: 'object',
        required: false,
        description: `Values for each input defined in inputs_schema.`,
      },
      {
        name: 'inputs_schema',
        type: 'array',
        required: false,
        description: `Schema defining the configurable input parameters for this function.`,
      },
      {
        name: 'mappings',
        type: 'array',
        required: false,
        description: `Event-to-destination field mappings. Only for destination and site_destination types.`,
      },
      {
        name: 'masking',
        type: 'object',
        required: false,
        description: `PII masking configuration with TTL, threshold, and hash expression.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Display name for the function.`,
      },
      {
        name: 'template_id',
        type: 'string',
        required: false,
        description: `ID of a HogFunctionTemplate to derive defaults from (code, inputs_schema, icon, name, description). Use the cdp-function-templates-list tool to find available templates.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Function type. One of: destination, site_destination, internal_destination, source_webhook, warehouse_source_webhook, site_app, transformation.`,
      },
    ],
  },
  {
    name: 'posthogmcp_cdp_functions_delete',
    description: `Delete a function by ID (soft delete). The function will no longer appear in lists or process events, but historical data is preserved.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this hog function.`,
      },
    ],
  },
  {
    name: 'posthogmcp_cdp_functions_invocations_create',
    description: `Test-invoke a function with a mock event payload. Sends the function configuration and test data to the plugin server for execution and returns logs and status. Use 'mock_async_functions: true' (default) to simulate external calls like fetch() without making real HTTP requests.`,
    params: [
      {
        name: 'clickhouse_event',
        type: 'object',
        required: false,
        description: `Mock ClickHouse event data to test the function with.`,
      },
      {
        name: 'configuration',
        type: 'object',
        required: true,
        description: `Full function configuration to test.`,
      },
      {
        name: 'globals',
        type: 'object',
        required: false,
        description: `Mock global variables available during test invocation.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this hog function.`,
      },
      {
        name: 'invocation_id',
        type: 'string',
        required: false,
        description: `Optional invocation ID for correlation.`,
      },
      {
        name: 'mock_async_functions',
        type: 'boolean',
        required: false,
        description: `When true (default), async functions like fetch() are simulated.`,
      },
    ],
  },
  {
    name: 'posthogmcp_cdp_functions_list',
    description: `List all functions (destinations, transformations, site apps, and source webhooks) in the project. Returns each function's name, type, enabled status, execution order, and template info. Filter by type (destination, site_destination, internal_destination, source_webhook, warehouse_source_webhook, site_app, transformation) and enabled status via query parameters.`,
    params: [
      { name: 'created_at', type: 'string', required: false, description: `Created at.` },
      { name: 'created_by', type: 'number', required: false, description: `Created by.` },
      { name: 'enabled', type: 'boolean', required: false, description: `Enabled.` },
      { name: 'id', type: 'string', required: false, description: `Id.` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      { name: 'search', type: 'string', required: false, description: `A search term.` },
      {
        name: 'type',
        type: 'array',
        required: false,
        description: `Multiple values may be separated by commas.`,
      },
      { name: 'updated_at', type: 'string', required: false, description: `Updated at.` },
    ],
  },
  {
    name: 'posthogmcp_cdp_functions_partial_update',
    description: `Partially update a function. Can enable/disable the function, change its name, description, source code, inputs, filters, mappings, or masking config. The 'type' field cannot be changed after creation. To delete a function, use the cdp-functions-delete tool instead.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Human-readable description of what this function does.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Set to true to activate or false to deactivate the function.`,
      },
      {
        name: 'execution_order',
        type: 'number',
        required: false,
        description: `Execution priority for transformations. Lower values run first.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Event filters that control which events trigger this function.`,
      },
      {
        name: 'hog',
        type: 'string',
        required: false,
        description: `Source code. Hog language for most types; TypeScript for site_destination and site_app.`,
      },
      {
        name: 'icon_url',
        type: 'string',
        required: false,
        description: `URL for the function's icon displayed in the UI.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this hog function.`,
      },
      {
        name: 'inputs',
        type: 'object',
        required: false,
        description: `Values for each input defined in inputs_schema.`,
      },
      {
        name: 'inputs_schema',
        type: 'array',
        required: false,
        description: `Schema defining the configurable input parameters for this function.`,
      },
      {
        name: 'mappings',
        type: 'array',
        required: false,
        description: `Event-to-destination field mappings. Only for destination and site_destination types.`,
      },
      {
        name: 'masking',
        type: 'object',
        required: false,
        description: `PII masking configuration with TTL, threshold, and hash expression.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Display name for the function.`,
      },
      {
        name: 'template_id',
        type: 'string',
        required: false,
        description: `ID of the template to create this function from.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Function type: destination, site_destination, internal_destination, source_webhook, warehouse_source_webhook, site_app, or transformation.  * 'destination' - Destination * 'site_destination' - Site Destination * 'internal_destination' - Internal Destination * 'source_webhook' - Source Webhook * 'warehouse_source_webhook' - Warehouse Source Webhook * 'site_app' - Site App * 'transformation' - Transformation`,
      },
    ],
  },
  {
    name: 'posthogmcp_cdp_functions_rearrange_partial_update',
    description: `Update the execution order of transformation functions. Send an 'orders' object mapping function UUIDs to their new execution_order integer values. Only applies to functions with type=transformation. Returns the updated list of transformations.`,
    params: [
      {
        name: 'orders',
        type: 'object',
        required: false,
        description: `Map of hog function UUIDs to their new execution_order values.`,
      },
    ],
  },
  {
    name: 'posthogmcp_cdp_functions_retrieve',
    description: `Get a specific function by ID. Returns the full configuration including source code, inputs schema, input values (secrets are masked), filters, mappings, masking config, and runtime status.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this hog function.`,
      },
    ],
  },
  {
    name: 'posthogmcp_change_request_get',
    description: `Get a specific change request by ID, including the full intent, policy snapshot, approval votes, and current state.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this change request.`,
      },
    ],
  },
  {
    name: 'posthogmcp_change_requests_list',
    description: `List approval requests (change requests) for the current project. Returns pending, approved, rejected, and expired requests with vote status and staleness info. Useful for understanding what governance actions are waiting for review.`,
    params: [
      { name: 'action_key', type: 'string', required: false, description: `Action key.` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      { name: 'requester', type: 'number', required: false, description: `Requester.` },
      { name: 'resource_id', type: 'string', required: false, description: `Resource id.` },
      { name: 'resource_type', type: 'string', required: false, description: `Resource type.` },
      {
        name: 'state',
        type: 'array',
        required: false,
        description: `Multiple values may be separated by commas.`,
      },
    ],
  },
  {
    name: 'posthogmcp_cohorts_add_persons_to_static_cohort_partial_update',
    description: `Add persons to a static cohort by their UUIDs. Only works for static cohorts (is_static: true).`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this cohort.`,
      },
      {
        name: 'person_ids',
        type: 'array',
        required: false,
        description: `List of person UUIDs to add to the cohort`,
      },
    ],
  },
  {
    name: 'posthogmcp_cohorts_create',
    description: `Create a new cohort. For dynamic cohorts, provide 'filters' with AND/OR groups of property conditions (person properties, behavioral filters, or cohort references). For static cohorts, set 'is_static: true' then use the 'cohorts-add-persons-to-static-cohort-partial-update' tool to add person UUIDs.`,
    params: [
      {
        name: 'cohort_type',
        type: 'string',
        required: false,
        description: `Type of cohort based on filter complexity  * 'static' - static * 'person_property' - person_property * 'behavioral' - behavioral * 'realtime' - realtime * 'analytical' - analytical`,
      },
      { name: 'description', type: 'string', required: false, description: `Description.` },
      { name: 'filters', type: 'object', required: false, description: `Filters.` },
      { name: 'is_static', type: 'boolean', required: false, description: `Is static.` },
      { name: 'name', type: 'string', required: false, description: `Name.` },
      { name: 'query', type: 'object', required: false, description: `Query.` },
    ],
  },
  {
    name: 'posthogmcp_cohorts_list',
    description: `List all cohorts in the project. Returns a summary of each cohort including  id, name, description, count (person count), is_static (cohort type), and created_at timestamp. Use 'cohorts-retrieve' with the cohort ID to get full details including filters, calculation status,
and query definition.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_cohorts_partial_update',
    description: `Update an existing cohort's name, description, or filters. Changing filters on a dynamic cohort triggers recalculation. To soft-delete a cohort, set 'deleted: true'.`,
    params: [
      {
        name: 'cohort_type',
        type: 'string',
        required: false,
        description: `Type of cohort based on filter complexity  * 'static' - static * 'person_property' - person_property * 'behavioral' - behavioral * 'realtime' - realtime * 'analytical' - analytical`,
      },
      { name: 'deleted', type: 'boolean', required: false, description: `Deleted.` },
      { name: 'description', type: 'string', required: false, description: `Description.` },
      { name: 'filters', type: 'object', required: false, description: `Filters.` },
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this cohort.`,
      },
      { name: 'is_static', type: 'boolean', required: false, description: `Is static.` },
      { name: 'name', type: 'string', required: false, description: `Name.` },
      { name: 'query', type: 'object', required: false, description: `Query.` },
    ],
  },
  {
    name: 'posthogmcp_cohorts_retrieve',
    description: `Get a specific cohort by ID. Returns the cohort name, description, filters (for dynamic cohorts), count of matching users, and calculation status.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this cohort.`,
      },
    ],
  },
  {
    name: 'posthogmcp_cohorts_rm_person_from_static_cohort_partial_update',
    description: `Remove a person from a static cohort by their UUID. Only works for static cohorts (is_static: true). The person must exist in the project. Idempotent: removing a person who exists but is not a member of the cohort succeeds silently.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this cohort.`,
      },
      {
        name: 'person_id',
        type: 'string',
        required: false,
        description: `Person UUID to remove from the cohort`,
      },
    ],
  },
  {
    name: 'posthogmcp_comment_count',
    description: `Get the count of comments, optionally filtered by scope and item_id.`,
    params: [],
  },
  {
    name: 'posthogmcp_comment_get',
    description: `Get a specific comment by ID including its content, rich content with mentions, and metadata.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this comment.`,
      },
    ],
  },
  {
    name: 'posthogmcp_comment_thread',
    description: `Get the full thread of replies for a parent comment. Useful for reading complete discussions on a resource.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this comment.`,
      },
    ],
  },
  {
    name: 'posthogmcp_comments_list',
    description: `List comments across the project. Filter by scope (Dashboard, FeatureFlag, Insight, etc.) and item_id to find discussions on specific resources. Returns comment content, author, and threading info.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The pagination cursor value.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: false,
        description: `Filter by the ID of the resource being commented on.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Filter by resource type (e.g. Dashboard, FeatureFlag, Insight, Replay).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Full-text search within comment content.`,
      },
      {
        name: 'source_comment',
        type: 'string',
        required: false,
        description: `Filter replies to a specific parent comment.`,
      },
    ],
  },
  {
    name: 'posthogmcp_conversations_tickets_list',
    description: `List support tickets in the project. Supports filtering by status (new, open, pending, on_hold, resolved), priority (low, medium, high), channel_source (widget, email, slack), assignee, date range, and search. Results are paginated and ordered by updated_at descending by default. Returns ticket metadata including status, priority, message counts, and timestamps.`,
    params: [
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `Filter by assignee. Use 'unassigned' for tickets with no assignee, 'user:<user_id>' for a specific user, or 'role:<role_uuid>' for a role.`,
      },
      {
        name: 'channel_detail',
        type: 'string',
        required: false,
        description: `Filter by the channel sub-type (e.g. 'widget_embedded', 'slack_bot_mention').`,
      },
      {
        name: 'channel_source',
        type: 'string',
        required: false,
        description: `Filter by the channel the ticket originated from.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Only include tickets updated on or after this date. Accepts absolute dates ('2026-01-01') or relative ones ('-7d', '-1mStart'). Pass 'all' to disable the filter.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Only include tickets updated on or before this date. Same format as 'date_from'.`,
      },
      {
        name: 'distinct_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of person 'distinct_id's to filter by (max 100).`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort order. Prefix with '-' for descending. Defaults to '-updated_at'.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Filter by priority. Accepts a single value or a comma-separated list (e.g. 'medium,high'). Valid values: 'low', 'medium', 'high'.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Free-text search. A numeric value matches a ticket number exactly; otherwise matches against the customer's name or email (case-insensitive, partial match).`,
      },
      {
        name: 'sla',
        type: 'string',
        required: false,
        description: `Filter by SLA state. 'breached' = past 'sla_due_at', 'at-risk' = due within the next hour, 'on-track' = more than an hour remaining.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by status. Accepts a single value or a comma-separated list (e.g. 'new,open,pending'). Valid values: 'new', 'open', 'pending', 'on_hold', 'resolved'.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `JSON-encoded array of tag names to filter by, e.g. '["billing","urgent"]'.`,
      },
    ],
  },
  {
    name: 'posthogmcp_conversations_tickets_retrieve',
    description: `Get a specific support ticket by ID or ticket number. Returns full ticket details including status, priority, assignee, message count, channel info, person data, and session context.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this ticket.`,
      },
    ],
  },
  {
    name: 'posthogmcp_conversations_tickets_update',
    description: `Update a support ticket. Can change status (new, open, pending, on_hold, resolved), priority (low, medium, high), assignee, SLA deadline, escalation reason, and tags. Assignee should be an object with type ('user' or 'role') and id, or null to unassign.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this ticket.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Ticket priority: low, medium, or high. Null if unset.  * 'low' - Low * 'medium' - Medium * 'high' - High`,
      },
      {
        name: 'sla_due_at',
        type: 'string',
        required: false,
        description: `SLA deadline set via workflows. Null means no SLA.`,
      },
      { name: 'snoozed_until', type: 'string', required: false, description: `Snoozed until.` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Ticket status: new, open, pending, on_hold, or resolved  * 'new' - New * 'open' - Open * 'pending' - Pending * 'on_hold' - On hold * 'resolved' - Resolved`,
      },
      { name: 'tags', type: 'array', required: false, description: `Tags.` },
    ],
  },
  {
    name: 'posthogmcp_create_feature_flag',
    description: `Create a feature flag in the current project.`,
    params: [
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the feature flag is active.`,
      },
      {
        name: 'evaluation_contexts',
        type: 'array',
        required: false,
        description: `Evaluation contexts that control where this flag evaluates at runtime.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Feature flag targeting configuration.`,
      },
      { name: 'key', type: 'string', required: false, description: `Feature flag key.` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Feature flag description (stored in the 'name' field for backwards compatibility).`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Organizational tags for this feature flag.`,
      },
    ],
  },
  {
    name: 'posthogmcp_dashboard_create',
    description: `Create a new dashboard. Provide a name and optional description, tags, and pinned status. Can also create from a template or duplicate an existing dashboard. The returned tiles omit insight results to save context — use dashboard-insights-run to fetch the actual data for each insight.`,
    params: [
      {
        name: 'breakdown_colors',
        type: 'object',
        required: false,
        description: `Custom color mapping for breakdown values.`,
      },
      {
        name: 'data_color_theme_id',
        type: 'number',
        required: false,
        description: `ID of the color theme used for chart visualizations.`,
      },
      {
        name: 'delete_insights',
        type: 'boolean',
        required: false,
        description: `When deleting, also delete insights that are only on this dashboard.`,
      },
      { name: 'description', type: 'string', required: false, description: `Description.` },
      { name: 'name', type: 'string', required: false, description: `Name.` },
      { name: 'pinned', type: 'boolean', required: false, description: `Pinned.` },
      {
        name: 'quick_filter_ids',
        type: 'array',
        required: false,
        description: `List of quick filter IDs associated with this dashboard`,
      },
      {
        name: 'restriction_level',
        type: 'number',
        required: false,
        description: `* '21' - Everyone in the project can edit * '37' - Only those invited to this dashboard can edit`,
      },
      { name: 'tags', type: 'array', required: false, description: `Tags.` },
      {
        name: 'use_dashboard',
        type: 'number',
        required: false,
        description: `ID of an existing dashboard to duplicate.`,
      },
      {
        name: 'use_template',
        type: 'string',
        required: false,
        description: `Template key to create the dashboard from a predefined template.`,
      },
    ],
  },
  {
    name: 'posthogmcp_dashboard_delete',
    description: `Delete a dashboard by ID. The dashboard will be soft-deleted and no longer appear in lists.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this dashboard.`,
      },
    ],
  },
  {
    name: 'posthogmcp_dashboard_get',
    description: `Get a specific dashboard by ID. Returns the full dashboard including all tiles with their insights and layout information. Insight results, filters, and query metadata are omitted to save context — use dashboard-insights-run to fetch the actual data for every insight on the dashboard in one call, or insight-query for a single insight.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this dashboard.`,
      },
    ],
  },
  {
    name: 'posthogmcp_dashboard_insights_run',
    description: `Run all insights on a dashboard and return their results. Uses cached results by default (may be stale); set refresh to 'blocking' for fresh results. Set format to 'optimized' (default) for LLM-friendly text tables or 'json' for raw query results. Use this after dashboard-get to see the actual data behind each insight tile.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this dashboard.`,
      },
      {
        name: 'output_format',
        type: 'string',
        required: false,
        description: `'optimized' (default) returns LLM-friendly formatted text per insight. 'json' returns the raw query result objects.`,
      },
      {
        name: 'refresh',
        type: 'string',
        required: false,
        description: `Cache behavior. 'force_cache' (default) serves from cache even if stale. 'blocking' uses cache if fresh, otherwise recalculates. 'force_blocking' always recalculates.`,
      },
    ],
  },
  {
    name: 'posthogmcp_dashboard_reorder_tiles',
    description: `Reorder tiles on a dashboard by providing an array of tile IDs in the desired display order. Computes a 2-column grid layout (6 columns wide, 5 rows tall per tile). First, use dashboard-get to see current tile IDs.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this dashboard.`,
      },
      {
        name: 'tile_order',
        type: 'array',
        required: true,
        description: `Array of tile IDs in the desired display order (top to bottom, left to right).`,
      },
    ],
  },
  {
    name: 'posthogmcp_dashboard_update',
    description: `Update an existing dashboard by ID. Can update name, description, pinned status, tags, filters, and restriction level. The returned tiles omit insight results to save context — use dashboard-insights-run to fetch the actual data for each insight.`,
    params: [
      {
        name: 'breakdown_colors',
        type: 'object',
        required: false,
        description: `Custom color mapping for breakdown values.`,
      },
      {
        name: 'data_color_theme_id',
        type: 'number',
        required: false,
        description: `ID of the color theme used for chart visualizations.`,
      },
      {
        name: 'delete_insights',
        type: 'boolean',
        required: false,
        description: `When deleting, also delete insights that are only on this dashboard.`,
      },
      { name: 'description', type: 'string', required: false, description: `Description.` },
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this dashboard.`,
      },
      { name: 'name', type: 'string', required: false, description: `Name.` },
      { name: 'pinned', type: 'boolean', required: false, description: `Pinned.` },
      {
        name: 'quick_filter_ids',
        type: 'array',
        required: false,
        description: `List of quick filter IDs associated with this dashboard`,
      },
      {
        name: 'restriction_level',
        type: 'number',
        required: false,
        description: `* '21' - Everyone in the project can edit * '37' - Only those invited to this dashboard can edit`,
      },
      { name: 'tags', type: 'array', required: false, description: `Tags.` },
      {
        name: 'use_dashboard',
        type: 'number',
        required: false,
        description: `ID of an existing dashboard to duplicate.`,
      },
      {
        name: 'use_template',
        type: 'string',
        required: false,
        description: `Template key to create the dashboard from a predefined template.`,
      },
    ],
  },
  {
    name: 'posthogmcp_dashboards_get_all',
    description: `Get all dashboards in the project with optional filtering by pinned status or search term. Returns name, description, pinned status, tags, and creation metadata. Tiles and insights are not included — use dashboard-get to fetch a dashboard's tiles, then dashboard-insights-run to fetch the actual data for each insight.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_debug_mcp_ui_apps',
    description: `Debug tool for testing MCP Apps SDK integration. Returns sample data displayed in an interactive UI app with component showcase. Use this to verify that MCP Apps are working correctly.`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Optional message to include in the debug data`,
      },
    ],
  },
  {
    name: 'posthogmcp_delete_feature_flag',
    description: `Soft-delete a feature flag by ID in the current project.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this feature flag.`,
      },
    ],
  },
  {
    name: 'posthogmcp_docs_search',
    description: `Use this tool to search the PostHog documentation for information that can help the user with their request. Use it as a fallback when you cannot answer the user's request using other tools in this MCP. Only use this tool for PostHog related questions.`,
    params: [{ name: 'query', type: 'string', required: true, description: `Query.` }],
  },
  {
    name: 'posthogmcp_early_access_feature_create',
    description: `Create a new early access feature. A feature flag is automatically created unless feature_flag_id is provided. Stage determines whether opted-in users get the feature enabled.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A longer description of what this early access feature does, shown to users in the opt-in UI.`,
      },
      {
        name: 'documentation_url',
        type: 'string',
        required: false,
        description: `URL to external documentation for this feature. Shown to users in the opt-in UI.`,
      },
      {
        name: 'feature_flag_id',
        type: 'number',
        required: false,
        description: `Optional ID of an existing feature flag to link. If omitted, a new flag is auto-created from the feature name. The flag must not already be linked to another feature, must not be group-based, and must not be multivariate.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the early access feature.`,
      },
      {
        name: 'payload',
        type: 'object',
        required: false,
        description: `Arbitrary JSON metadata associated with this feature.`,
      },
      {
        name: 'stage',
        type: 'string',
        required: true,
        description: `Lifecycle stage. Valid values: draft, concept, alpha, beta, general-availability, archived. Moving to an active stage (alpha/beta/general-availability) enables the feature flag for opted-in users.  * 'draft' - draft * 'concept' - concept * 'alpha' - alpha * 'beta' - beta * 'general-availability' - general availability * 'archived' - archived`,
      },
    ],
  },
  {
    name: 'posthogmcp_early_access_feature_destroy',
    description: `Delete an early access feature by ID. Clears enrollment conditions from the linked feature flag but does not delete the flag itself.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this early access feature.`,
      },
    ],
  },
  {
    name: 'posthogmcp_early_access_feature_list',
    description: `List early access features in the current project. Returns name, stage, description, linked feature flag, and creation date for each feature.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_early_access_feature_partial_update',
    description: `Update an early access feature by ID. Changing the stage automatically updates the linked feature flag's enrollment conditions.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A longer description of what this early access feature does, shown to users in the opt-in UI.`,
      },
      {
        name: 'documentation_url',
        type: 'string',
        required: false,
        description: `URL to external documentation for this feature. Shown to users in the opt-in UI.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this early access feature.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The name of the early access feature.`,
      },
      {
        name: 'stage',
        type: 'string',
        required: false,
        description: `Lifecycle stage. Valid values: draft, concept, alpha, beta, general-availability, archived. Moving to an active stage (alpha/beta/general-availability) enables the feature flag for opted-in users.  * 'draft' - draft * 'concept' - concept * 'alpha' - alpha * 'beta' - beta * 'general-availability' - general availability * 'archived' - archived`,
      },
    ],
  },
  {
    name: 'posthogmcp_early_access_feature_retrieve',
    description: `Get a single early access feature by ID. Returns full details including the linked feature flag configuration.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this early access feature.`,
      },
    ],
  },
  {
    name: 'posthogmcp_endpoint_create',
    description: `Create a new API endpoint from a HogQL or insight query. The name must be URL-safe (letters, numbers, hyphens, underscores, starts with a letter, max 128 chars). Materialization is auto-enabled if the query is eligible.`,
    params: [
      {
        name: 'cache_age_seconds',
        type: 'number',
        required: false,
        description: `Cache TTL in seconds (60–86400).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Human-readable description of what this endpoint returns.`,
      },
      {
        name: 'is_materialized',
        type: 'boolean',
        required: false,
        description: `Whether query results are materialized to S3.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Unique URL-safe name. Must start with a letter, only letters/numbers/hyphens/underscores, max 128 chars.`,
      },
      {
        name: 'query',
        type: 'object',
        required: false,
        description: `HogQL or insight query this endpoint executes. Changing this auto-creates a new version.`,
      },
    ],
  },
  {
    name: 'posthogmcp_endpoint_delete',
    description: `Delete an endpoint by name. The endpoint is soft-deleted and its materialized views are cleaned up.`,
    params: [{ name: 'name', type: 'string', required: true, description: `Name.` }],
  },
  {
    name: 'posthogmcp_endpoint_get',
    description: `Get a specific endpoint by name. Returns the full endpoint configuration including query definition, version info, materialization status, and column types. Supports ?version=N to retrieve a specific version.`,
    params: [{ name: 'name', type: 'string', required: true, description: `Name.` }],
  },
  {
    name: 'posthogmcp_endpoint_materialization_status',
    description: `Get lightweight materialization status for an endpoint without fetching full endpoint data. Returns whether materialization is possible, current status, last run time, and any errors. Supports ?version=N.`,
    params: [{ name: 'name', type: 'string', required: true, description: `Name.` }],
  },
  {
    name: 'posthogmcp_endpoint_openapi_spec',
    description: `Get the OpenAPI 3.0 specification for an endpoint. Returns a JSON spec that can be used with SDK generators like openapi-generator or @hey-api/openapi-ts to create typed API clients. Supports ?version=N to generate a spec for a specific version.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name.` },
      {
        name: 'version',
        type: 'number',
        required: false,
        description: `Specific endpoint version to generate the spec for. Defaults to latest.`,
      },
    ],
  },
  {
    name: 'posthogmcp_endpoint_run',
    description: `Execute an endpoint's query and return results. Uses materialized results when available, otherwise runs inline. For HogQL endpoints, variable keys must match code_name values. For insight endpoints with breakdowns, use the breakdown property name as the key.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return. If not provided, returns all results.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name.` },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of results to skip. Must be used together with limit. Only supported for HogQL endpoints.`,
      },
      { name: 'refresh', type: 'string', required: false, description: `Refresh.` },
      {
        name: 'variables',
        type: 'object',
        required: false,
        description: `Key-value pairs to parameterize the query. For HogQL endpoints, keys match variable code_name (e.g. {"event_name": "$pageview"}). For insight endpoints with breakdowns, use the breakdown property name as key.`,
      },
    ],
  },
  {
    name: 'posthogmcp_endpoint_update',
    description: `Update an existing endpoint by name. Can update the query (auto-creates a new version), description, cache age, active status, and materialization. Pass version in body to target a specific version for non-query updates.`,
    params: [
      {
        name: 'cache_age_seconds',
        type: 'number',
        required: false,
        description: `Cache TTL in seconds (60–86400).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Human-readable description of what this endpoint returns.`,
      },
      {
        name: 'is_active',
        type: 'boolean',
        required: false,
        description: `Whether this endpoint is available for execution via the API.`,
      },
      {
        name: 'is_materialized',
        type: 'boolean',
        required: false,
        description: `Whether query results are materialized to S3.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name.` },
      {
        name: 'query',
        type: 'object',
        required: false,
        description: `HogQL or insight query this endpoint executes. Changing this auto-creates a new version.`,
      },
      {
        name: 'version',
        type: 'number',
        required: false,
        description: `Target a specific version for updates (defaults to current version).`,
      },
    ],
  },
  {
    name: 'posthogmcp_endpoint_versions',
    description: `List all versions for an endpoint, in descending order (latest first). Each version contains the query snapshot, description, cache settings, and materialization status at that point in time.`,
    params: [
      { name: 'created_by', type: 'number', required: false, description: `Created by.` },
      { name: 'is_active', type: 'boolean', required: false, description: `Is active.` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name.` },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_endpoints_get_all',
    description: `Get all API endpoints in the current project. Endpoints expose saved HogQL or insight queries as callable API routes. Returns name, description, query, active status, current version, and materialization info for each endpoint.`,
    params: [
      { name: 'created_by', type: 'number', required: false, description: `Created by.` },
      { name: 'is_active', type: 'boolean', required: false, description: `Is active.` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_entity_search',
    description: `Search for PostHog entities by name or description. Can search across multiple entity types including insights, dashboards, experiments, feature flags, notebooks, actions, cohorts, event definitions, and surveys. Use this to find entities when you know part of their name. Returns matching entities with their IDs and URLs.`,
    params: [
      {
        name: 'entities',
        type: 'array',
        required: false,
        description: `Entity types to search. If not specified, searches all types. Available: insight, dashboard, experiment, feature_flag, notebook, action, cohort, event_definition, survey`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query to find entities by name or description`,
      },
    ],
  },
  {
    name: 'posthogmcp_error_tracking_assignment_rules_create',
    description: `Create an error tracking assignment rule for the current project. Provide \`filters\` to match incoming errors and an \`assignee\` with \`type\` (\`user\` or \`role\`) plus the matching user ID or role UUID.`,
    params: [
      {
        name: 'assignee',
        type: 'object',
        required: true,
        description: `User or role to assign matching issues to.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: true,
        description: `Property-group filters that define when this rule matches incoming error events.`,
      },
    ],
  },
  {
    name: 'posthogmcp_error_tracking_assignment_rules_list',
    description: `List error tracking assignment rules for the current project. Returns rules in evaluation order with their filters, assignee, and disabled state. Supports pagination with \`limit\` and \`offset\`.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_error_tracking_grouping_rules_create',
    description: `Create an error tracking grouping rule for the current project. Provide required \`filters\`, and optionally set \`assignee\` and \`description\` for the issues this rule creates.`,
    params: [
      {
        name: 'assignee',
        type: 'object',
        required: false,
        description: `Optional user or role to assign to issues created by this grouping rule.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional human-readable description of what this grouping rule is for.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: true,
        description: `Property-group filters that define which exceptions should be grouped into the same issue.`,
      },
    ],
  },
  {
    name: 'posthogmcp_error_tracking_grouping_rules_list',
    description: `List error tracking grouping rules for the current project. Returns rules in evaluation order with their filters, optional assignee, description, and linked issue when available.`,
    params: [],
  },
  {
    name: 'posthogmcp_error_tracking_issues_list',
    description: `List all error tracking issues in the project. Returns issues with id, status, name, first seen timestamp, and assignee info.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_error_tracking_issues_merge_create',
    description: `Merge one or more error tracking issues into an existing target issue. Provide the target issue as \`id\` and the issues to merge into it as \`ids\`.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this error tracking issue.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `IDs of the issues to merge into the current issue.`,
      },
    ],
  },
  {
    name: 'posthogmcp_error_tracking_issues_partial_update',
    description: `Update an error tracking issue. Can change status (active, resolved, suppressed), assign to a user, or update description.`,
    params: [
      { name: 'assignee', type: 'object', required: false, description: `Assignee.` },
      { name: 'description', type: 'string', required: false, description: `Description.` },
      { name: 'external_issues', type: 'array', required: false, description: `External issues.` },
      { name: 'first_seen', type: 'string', required: false, description: `First seen.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this error tracking issue.`,
      },
      { name: 'name', type: 'string', required: false, description: `Name.` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `* 'archived' - Archived * 'active' - Active * 'resolved' - Resolved * 'pending_release' - Pending release * 'suppressed' - Suppressed`,
      },
    ],
  },
  {
    name: 'posthogmcp_error_tracking_issues_retrieve',
    description: `Get a specific error tracking issue by ID. Returns full issue details including status, description, volume, and metadata.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this error tracking issue.`,
      },
    ],
  },
  {
    name: 'posthogmcp_error_tracking_issues_split_create',
    description: `Split one or more fingerprints out of an existing error tracking issue into new issues. Provide the source issue as \`id\` and the fingerprints to split as \`fingerprints\`, where each entry includes a required \`fingerprint\` and optional \`name\` or \`description\`.`,
    params: [
      {
        name: 'fingerprints',
        type: 'array',
        required: false,
        description: `Fingerprints to split into new issues. Each fingerprint becomes its own new issue.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this error tracking issue.`,
      },
    ],
  },
  {
    name: 'posthogmcp_error_tracking_suppression_rules_list',
    description: `List error tracking suppression rules for the current project. Returns rules in evaluation order with their filters, sampling rate, and disabled state. Supports pagination with \`limit\` and \`offset\`.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_evaluation_create',
    description: `Create a new LLM analytics evaluation. Two types are supported: 'llm_judge' uses an LLM to score generations against a prompt you define (for subjective checks like tone, helpfulness, hallucination detection), and 'hog' runs deterministic code against each generation (for rule-based checks like format validation, keyword detection, length limits). For llm_judge evaluations, provide a prompt in evaluation_config and a model_configuration. For hog evaluations, provide source code in evaluation_config.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of what this evaluation checks.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the evaluation runs automatically on new generations. Defaults to false.`,
      },
      {
        name: 'evaluation_config',
        type: 'object',
        required: true,
        description: `Configuration for the evaluation. Provide "prompt" for llm_judge or "source" for hog type.`,
      },
      {
        name: 'evaluation_type',
        type: 'string',
        required: true,
        description: `Type of evaluation. "llm_judge" uses an LLM to score generations against a prompt. "hog" runs deterministic Hog code.`,
      },
      {
        name: 'model_configuration',
        type: 'object',
        required: false,
        description: `LLM model configuration (required for llm_judge evaluations).`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the evaluation.` },
      { name: 'output_config', type: 'object', required: false, description: `Output config.` },
      {
        name: 'output_type',
        type: 'string',
        required: false,
        description: `Output type. Currently only "boolean" is supported.`,
      },
    ],
  },
  {
    name: 'posthogmcp_evaluation_delete',
    description: `Delete an LLM analytics evaluation (soft delete). The evaluation will be marked as deleted and will no longer run.`,
    params: [
      {
        name: 'evaluationId',
        type: 'string',
        required: true,
        description: `The UUID of the evaluation to delete.`,
      },
    ],
  },
  {
    name: 'posthogmcp_evaluation_get',
    description: `Get a specific LLM analytics evaluation by its UUID. Returns full details including name, type (llm_judge or hog), configuration, conditions, and enabled status.`,
    params: [
      {
        name: 'evaluationId',
        type: 'string',
        required: true,
        description: `The UUID of the evaluation to retrieve.`,
      },
    ],
  },
  {
    name: 'posthogmcp_evaluation_run',
    description: `Trigger an evaluation run on a specific $ai_generation event. This executes the evaluation (either LLM judge or Hog code) against the target event asynchronously via a background workflow. The run is async — it returns a workflow_id and status 'started'. Results are written as '$ai_evaluation' events once complete. To check results after triggering a run, query events with: SELECT properties.$ai_evaluation_result as result, properties.$ai_evaluation_reasoning as reasoning FROM events WHERE event = '$ai_evaluation' AND properties.$ai_evaluation_id = '<evaluation_uuid>' AND properties.$ai_target_event_id = '<generation_event_uuid>' ORDER BY timestamp DESC LIMIT 1.`,
    params: [
      {
        name: 'distinct_id',
        type: 'string',
        required: false,
        description: `Distinct ID of the event (optional, improves lookup performance).`,
      },
      {
        name: 'evaluationId',
        type: 'string',
        required: true,
        description: `The UUID of the evaluation to run.`,
      },
      {
        name: 'event',
        type: 'string',
        required: false,
        description: `Event name. Defaults to "$ai_generation".`,
      },
      {
        name: 'target_event_id',
        type: 'string',
        required: true,
        description: `The UUID of the $ai_generation event to evaluate.`,
      },
      {
        name: 'timestamp',
        type: 'string',
        required: true,
        description: `ISO 8601 timestamp of the target event (needed for efficient lookup).`,
      },
    ],
  },
  {
    name: 'posthogmcp_evaluation_test_hog',
    description: `Test Hog evaluation code against recent $ai_generation events without persisting results. Compiles the provided Hog source code and runs it against a sample of recent events (up to 10 from the last 7 days). Returns per-event results with input/output previews, pass/fail verdicts, and any errors. Use this to validate Hog evaluation logic before enabling it.`,
    params: [
      {
        name: 'allows_na',
        type: 'boolean',
        required: false,
        description: `Whether the evaluation can return N/A for non-applicable generations.`,
      },
      {
        name: 'conditions',
        type: 'array',
        required: false,
        description: `Optional trigger conditions to filter which events are sampled.`,
      },
      {
        name: 'sample_count',
        type: 'integer',
        required: false,
        description: `Number of recent $ai_generation events to test against (1-10, default 5).`,
      },
      {
        name: 'source',
        type: 'string',
        required: true,
        description: `Hog source code to test. Must return a boolean (true = pass, false = fail).`,
      },
    ],
  },
  {
    name: 'posthogmcp_evaluation_update',
    description: `Update an existing LLM analytics evaluation. You can change the name, description, enabled status, evaluation config (prompt or source code), and output config. Use this to enable/disable evaluations or modify their scoring logic.`,
    params: [
      { name: 'description', type: 'string', required: false, description: `Updated description.` },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Enable or disable the evaluation.`,
      },
      {
        name: 'evaluationId',
        type: 'string',
        required: true,
        description: `The UUID of the evaluation to update.`,
      },
      {
        name: 'evaluation_config',
        type: 'object',
        required: false,
        description: `Updated evaluation configuration.`,
      },
      { name: 'name', type: 'string', required: false, description: `Updated name.` },
      {
        name: 'output_config',
        type: 'object',
        required: false,
        description: `Updated output configuration.`,
      },
    ],
  },
  {
    name: 'posthogmcp_evaluations_get',
    description: `List LLM analytics evaluations for the project. Evaluations automatically score AI generations for quality, relevance, safety, and other criteria. Supports optional search by name/description and filtering by enabled status. Evaluation results are stored as '$ai_evaluation' events — to query results, use the execute-sql or query-run tool with a HogQL query filtering on event = '$ai_evaluation'. Key properties: $ai_evaluation_id (evaluation UUID), $ai_evaluation_name, $ai_target_event_id (generation event UUID), $ai_trace_id, $ai_evaluation_result (boolean pass/fail), $ai_evaluation_reasoning (text), $ai_evaluation_applicable (boolean, false = N/A).`,
    params: [
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Filter by enabled status.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search evaluations by name or description.`,
      },
    ],
  },
  {
    name: 'posthogmcp_event_definition_update',
    description: `Update event definition metadata. Can update description, tags, mark status as verified or hidden. Use exact event name like '$pageview' or 'user_signed_up'.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `The event definition data to update`,
      },
      {
        name: 'eventName',
        type: 'string',
        required: true,
        description: `The name of the event to update (e.g. "$pageview", "user_signed_up")`,
      },
    ],
  },
  {
    name: 'posthogmcp_event_definitions_list',
    description: `List all event definitions in the project with optional filtering. Can filter by search term.`,
    params: [
      { name: 'limit', type: 'integer', required: false, description: `Limit.` },
      { name: 'offset', type: 'integer', required: false, description: `Offset.` },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Search query to filter event names. Only use if there are lots of events.`,
      },
    ],
  },
  {
    name: 'posthogmcp_experiment_archive',
    description: `Archive an ended experiment to hide it from the default list view. Returns 400 if the experiment is already archived or has not ended.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this experiment.`,
      },
    ],
  },
  {
    name: 'posthogmcp_experiment_create',
    description: `Create a comprehensive A/B test experiment. PROCESS: 1) Understand experiment goal and hypothesis 2) Search existing feature flags with 'feature-flags-get-all' tool first and suggest reuse or new key 3) Help user define success metrics by asking what they want to optimize 4) MOST IMPORTANT: Use 'event-definitions-list' tool to find available events in their project 5) For funnel metrics, provide the series array with EventsNode entries for each step 6) Configure variants (default 50/50 control/test unless they specify otherwise) 7) Set targeting criteria if needed.`,
    params: [
      {
        name: 'allow_unknown_events',
        type: 'boolean',
        required: false,
        description: `Allow unknown events.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the experiment hypothesis and expected outcomes.`,
      },
      {
        name: 'exposure_criteria',
        type: 'object',
        required: false,
        description: `Exposure configuration including filter test accounts and custom exposure events.`,
      },
      {
        name: 'feature_flag_key',
        type: 'string',
        required: true,
        description: `Unique key for the experiment's feature flag. Letters, numbers, hyphens, and underscores only. Search existing flags with the feature-flags-get-all tool first — reuse an existing flag when possible.`,
      },
      {
        name: 'holdout_id',
        type: 'number',
        required: false,
        description: `ID of a holdout group to exclude from the experiment.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: false,
        description: `Primary experiment metrics. Each metric must have kind='ExperimentMetric' and a metric_type: 'mean' (set source to an EventsNode with an event name), 'funnel' (set series to an array of EventsNode steps), 'ratio' (set numerator and denominator EventsNode entries), or 'retention' (set start_event and completion_event). Use the event-definitions-list tool to find available events in the project.`,
      },
      {
        name: 'metrics_secondary',
        type: 'array',
        required: false,
        description: `Secondary metrics for additional measurements. Same format as primary metrics.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the experiment.` },
      {
        name: 'parameters',
        type: 'object',
        required: false,
        description: `Variant definitions and statistical configuration. Set feature_flag_variants to customize the split (default: 50/50 control/test). Each variant needs a key and rollout_percentage; percentages must sum to 100. Set minimum_detectable_effect (percentage, suggest 20-30) to control statistical power.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Experiment type: web for frontend UI changes, product for backend/API changes.  * 'web' - web * 'product' - product`,
      },
    ],
  },
  {
    name: 'posthogmcp_experiment_delete',
    description: `Delete an experiment by ID.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this experiment.`,
      },
    ],
  },
  {
    name: 'posthogmcp_experiment_end',
    description: `End a running experiment. Sets end_date to now but does NOT modify the feature flag. Optionally provide a conclusion and comment. Returns 400 if the experiment is not running.`,
    params: [
      {
        name: 'conclusion',
        type: 'string',
        required: false,
        description: `The conclusion of the experiment.  * 'won' - won * 'lost' - lost * 'inconclusive' - inconclusive * 'stopped_early' - stopped_early * 'invalid' - invalid`,
      },
      {
        name: 'conclusion_comment',
        type: 'string',
        required: false,
        description: `Optional comment about the experiment conclusion.`,
      },
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this experiment.`,
      },
    ],
  },
  {
    name: 'posthogmcp_experiment_get',
    description: `Get details of a specific experiment by ID.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this experiment.`,
      },
    ],
  },
  {
    name: 'posthogmcp_experiment_get_all',
    description: `Get all experiments in the project.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_experiment_launch',
    description: `Launch a draft experiment. Activates the linked feature flag, sets start_date to now, and transitions the experiment to running. Returns 400 if the experiment has already been launched.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this experiment.`,
      },
    ],
  },
  {
    name: 'posthogmcp_experiment_pause',
    description: `Pause a running experiment by deactivating its feature flag. Users fall back to the default experience and no new exposures are recorded. Returns 400 if the experiment is not running or is already paused.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this experiment.`,
      },
    ],
  },
  {
    name: 'posthogmcp_experiment_reset',
    description: `Reset an experiment back to draft state. Clears start/end dates, conclusion, and archived flag. The feature flag is left unchanged. Returns 400 if the experiment is already in draft state.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this experiment.`,
      },
    ],
  },
  {
    name: 'posthogmcp_experiment_results_get',
    description: `Get comprehensive experiment results including all metrics data (primary and secondary) and exposure data. This tool fetches the experiment details and executes the necessary queries to get complete experiment results. Only works with new experiments (not legacy experiments).`,
    params: [
      {
        name: 'experimentId',
        type: 'number',
        required: true,
        description: `The ID of the experiment to get comprehensive results for`,
      },
      {
        name: 'refresh',
        type: 'boolean',
        required: true,
        description: `Force refresh of results instead of using cached values`,
      },
    ],
  },
  {
    name: 'posthogmcp_experiment_resume',
    description: `Resume a paused experiment by reactivating its feature flag. Returns 400 if the experiment is not paused.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this experiment.`,
      },
    ],
  },
  {
    name: 'posthogmcp_experiment_ship_variant',
    description: `Ship a variant to 100% of users and optionally end the experiment. Requires variant_key. Can include conclusion and conclusion_comment. Returns 400 if the experiment is in draft state.`,
    params: [
      {
        name: 'conclusion',
        type: 'string',
        required: false,
        description: `The conclusion of the experiment.  * 'won' - won * 'lost' - lost * 'inconclusive' - inconclusive * 'stopped_early' - stopped_early * 'invalid' - invalid`,
      },
      {
        name: 'conclusion_comment',
        type: 'string',
        required: false,
        description: `Optional comment about the experiment conclusion.`,
      },
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this experiment.`,
      },
      {
        name: 'variant_key',
        type: 'string',
        required: true,
        description: `The key of the variant to ship to 100% of users.`,
      },
    ],
  },
  {
    name: 'posthogmcp_experiment_update',
    description: `Update an existing experiment by ID. Can update name, description, variants, metrics, and other properties. Use lifecycle tools for state transitions: experiment-launch to start, experiment-end to stop, experiment-reset to return to draft, experiment-pause/experiment-resume to temporarily halt. NOTE: feature_flag_key cannot be changed after creation.`,
    params: [
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Whether the experiment is archived.`,
      },
      {
        name: 'conclusion',
        type: 'string',
        required: false,
        description: `Experiment conclusion: won, lost, inconclusive, stopped_early, or invalid.  * 'won' - won * 'lost' - lost * 'inconclusive' - inconclusive * 'stopped_early' - stopped_early * 'invalid' - invalid`,
      },
      {
        name: 'conclusion_comment',
        type: 'string',
        required: false,
        description: `Comment about the experiment conclusion.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the experiment hypothesis and expected outcomes.`,
      },
      {
        name: 'exposure_criteria',
        type: 'object',
        required: false,
        description: `Exposure configuration including filter test accounts and custom exposure events.`,
      },
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this experiment.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: false,
        description: `Primary experiment metrics. Each metric must have kind='ExperimentMetric' and a metric_type: 'mean' (set source to an EventsNode with an event name), 'funnel' (set series to an array of EventsNode steps), 'ratio' (set numerator and denominator EventsNode entries), or 'retention' (set start_event and completion_event). Use the event-definitions-list tool to find available events in the project.`,
      },
      {
        name: 'metrics_secondary',
        type: 'array',
        required: false,
        description: `Secondary metrics for additional measurements. Same format as primary metrics.`,
      },
      { name: 'name', type: 'string', required: false, description: `Name of the experiment.` },
      {
        name: 'parameters',
        type: 'object',
        required: false,
        description: `Variant definitions and statistical configuration. Set feature_flag_variants to customize the split (default: 50/50 control/test). Each variant needs a key and rollout_percentage; percentages must sum to 100. Set minimum_detectable_effect (percentage, suggest 20-30) to control statistical power.`,
      },
    ],
  },
  {
    name: 'posthogmcp_feature_flag_get_all',
    description: `Get feature flags in the current project. Supports list filters including search by feature flag key or name (case-insensitive), then use the returned ID for get/update/delete tools.`,
    params: [
      { name: 'active', type: 'string', required: false, description: `Active.` },
      {
        name: 'created_by_id',
        type: 'string',
        required: false,
        description: `The User ID which initially created the feature flag.`,
      },
      {
        name: 'evaluation_runtime',
        type: 'string',
        required: false,
        description: `Filter feature flags by their evaluation runtime.`,
      },
      {
        name: 'excluded_properties',
        type: 'string',
        required: false,
        description: `JSON-encoded list of feature flag keys to exclude from the results.`,
      },
      {
        name: 'has_evaluation_contexts',
        type: 'string',
        required: false,
        description: `Filter feature flags by presence of evaluation contexts. 'true' returns only flags with at least one evaluation context, 'false' returns only flags without.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search by feature flag key or name (case-insensitive). Use this to find the flag ID for get/update/delete tools.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `JSON-encoded list of tag names to filter feature flags by.`,
      },
      { name: 'type', type: 'string', required: false, description: `Type.` },
    ],
  },
  {
    name: 'posthogmcp_feature_flag_get_definition',
    description: `Get a feature flag by ID.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this feature flag.`,
      },
    ],
  },
  {
    name: 'posthogmcp_feature_flags_activity_retrieve',
    description: `Get the audit trail for a specific feature flag by ID. Returns a paginated list of changes including who made changes, what was changed, and when. Use limit and page query params for pagination.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this feature flag.`,
      },
      { name: 'limit', type: 'number', required: false, description: `Number of items per page` },
      { name: 'page', type: 'number', required: false, description: `Page number` },
    ],
  },
  {
    name: 'posthogmcp_feature_flags_copy_flags_create',
    description: `Copy a feature flag from one project to other projects within the same organization. Provide the flag key, source project ID, and a list of target project IDs. Optionally copy scheduled changes with copy_schedule. Returns lists of successful and failed copies.`,
    params: [
      {
        name: 'copy_schedule',
        type: 'boolean',
        required: false,
        description: `Whether to also copy scheduled changes for this flag`,
      },
      {
        name: 'feature_flag_key',
        type: 'string',
        required: true,
        description: `Key of the feature flag to copy`,
      },
      {
        name: 'from_project',
        type: 'number',
        required: true,
        description: `Source project ID to copy the flag from`,
      },
      {
        name: 'target_project_ids',
        type: 'array',
        required: true,
        description: `List of target project IDs to copy the flag to`,
      },
    ],
  },
  {
    name: 'posthogmcp_feature_flags_dependent_flags_retrieve',
    description: `Get other active feature flags that depend on this flag. Use this to understand flag dependency chains before making changes to a flag's rollout conditions or disabling it.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this feature flag.`,
      },
    ],
  },
  {
    name: 'posthogmcp_feature_flags_evaluation_reasons_retrieve',
    description: `Debug why feature flags evaluate a certain way for a given user. Provide a distinct_id and optionally groups to see each flag's evaluated value and the reason for that evaluation (e.g. condition_match, no_condition_match, disabled).`,
    params: [
      { name: 'distinct_id', type: 'string', required: true, description: `User distinct ID` },
      {
        name: 'groups',
        type: 'string',
        required: false,
        description: `Groups for feature flag evaluation (JSON object string)`,
      },
    ],
  },
  {
    name: 'posthogmcp_feature_flags_status_retrieve',
    description: `Check the health and evaluation status of a feature flag by ID. Returns a status (active, stale, deleted, or unknown) and a human-readable reason explaining the status.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this feature flag.`,
      },
    ],
  },
  {
    name: 'posthogmcp_feature_flags_user_blast_radius_create',
    description: `Assess the impact of a feature flag release condition before applying it. Provide a condition object and optionally a group_type_index to see how many users would be affected relative to the total user count.`,
    params: [
      {
        name: 'condition',
        type: 'object',
        required: true,
        description: `The release condition to evaluate`,
      },
      {
        name: 'group_type_index',
        type: 'number',
        required: false,
        description: `Group type index for group-based flags (null for person-based flags)`,
      },
    ],
  },
  {
    name: 'posthogmcp_get_llm_total_costs_for_project',
    description: `Fetches the total LLM daily costs for each model for a project over a given number of days. If no number of days is provided, it defaults to 7. The results are sorted by model name. The total cost is rounded to 4 decimal places. The query is executed against the project's data warehouse. Show the results as a Markdown formatted table with the following information for each model: Model name, Total cost in USD, Each day's date, Each day's cost in USD. Write in bold the model name with the highest total cost. Properly render the markdown table in the response.`,
    params: [
      { name: 'days', type: 'number', required: false, description: `Days.` },
      { name: 'projectId', type: 'integer', required: true, description: `Projectid.` },
    ],
  },
  {
    name: 'posthogmcp_insight_create',
    description: `Create a new saved insight from a name and query definition. Test queries with query-trends / query-funnel / query-retention / query-paths / query-stickiness / query-lifecycle first to confirm the shape, then save. Returns insight metadata only — after creating, call the insight-query tool with the returned \`short_id\` if you want to see the computed results.`,
    params: [
      {
        name: 'dashboards',
        type: 'array',
        required: false,
        description: `Dashboard IDs this insight should belong to. This is a full replacement — always include all existing dashboard IDs when adding a new one.`,
      },
      { name: 'description', type: 'string', required: false, description: `Description.` },
      { name: 'favorited', type: 'boolean', required: false, description: `Favorited.` },
      { name: 'name', type: 'string', required: false, description: `Name.` },
      { name: 'query', type: 'object', required: true, description: `Query.` },
      { name: 'tags', type: 'array', required: false, description: `Tags.` },
    ],
  },
  {
    name: 'posthogmcp_insight_delete',
    description: `Soft-delete an insight by ID. The insight will be marked as deleted and no longer appear in lists.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `Numeric primary key or 8-character 'short_id' (for example 'AaVQ8Ijw') identifying the insight.`,
      },
    ],
  },
  {
    name: 'posthogmcp_insight_get',
    description: `Fetch a saved insight by its numeric \`id\` or 8-character \`short_id\`. Returns the insight metadata and query definition, but NOT the query results. To retrieve the actual data, call the insight-query tool with the same identifier.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `Numeric primary key or 8-character 'short_id' (for example 'AaVQ8Ijw') identifying the insight.`,
      },
    ],
  },
  {
    name: 'posthogmcp_insight_query',
    description: `Execute a saved insight's query and return results. THIS IS THE ONLY WAY TO RETRIEVE INSIGHT RESULTS — the insights-list, insight-get, insight-create, and insight-update tools all return metadata and query definitions but never the actual data. Call insight-query whenever the user asks to see, analyze, summarize, or compare data from a saved insight, and immediately after creating or updating an insight if they want to verify the output. Supports two output formats: 'optimized' (default) returns a human-readable summary from server-side formatters ideal for analysis, while 'json' returns the raw query results.`,
    params: [
      {
        name: 'insightId',
        type: 'string',
        required: true,
        description: `The insight ID or short_id to run.`,
      },
      {
        name: 'output_format',
        type: 'string',
        required: false,
        description: `Output format. "optimized" returns a human-readable summary from server-side formatters (recommended for analysis). "json" returns the raw query results as JSON.`,
      },
    ],
  },
  {
    name: 'posthogmcp_insight_update',
    description: `Update a saved insight by numeric \`id\` or \`short_id\`. Can update name, description, query, tags, favorited status, and dashboards. Returns insight metadata only — after updating the query, call the insight-query tool with the same identifier if you want to see the recomputed results.`,
    params: [
      {
        name: 'dashboards',
        type: 'array',
        required: false,
        description: `Dashboard IDs this insight should belong to. This is a full replacement — always include all existing dashboard IDs when adding a new one.`,
      },
      { name: 'description', type: 'string', required: false, description: `Description.` },
      { name: 'favorited', type: 'boolean', required: false, description: `Favorited.` },
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `Numeric primary key or 8-character 'short_id' (for example 'AaVQ8Ijw') identifying the insight.`,
      },
      { name: 'name', type: 'string', required: false, description: `Name.` },
      { name: 'query', type: 'object', required: false, description: `Query.` },
      { name: 'tags', type: 'array', required: false, description: `Tags.` },
    ],
  },
  {
    name: 'posthogmcp_insights_list',
    description: `List saved insights in the project with optional filtering by favorited status or search term. Returns metadata only (name, description, tags, dashboards, ownership) — NOT the query results. To retrieve the actual data for any insight in the list, call the insight-query tool with its \`short_id\` or numeric \`id\`.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      { name: 'short_id', type: 'string', required: false, description: `Short id.` },
    ],
  },
  {
    name: 'posthogmcp_integration_delete',
    description: `Permanently delete an integration by ID. This removes the connection to the third-party service. Any features relying on this integration (alerts, workflow destinations, etc.) will stop working.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this integration.`,
      },
    ],
  },
  {
    name: 'posthogmcp_integration_get',
    description: `Get a specific integration by ID. Returns the full integration details including kind, display name, non-sensitive configuration, error status, and creation metadata. Does not expose sensitive credentials.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this integration.`,
      },
    ],
  },
  {
    name: 'posthogmcp_integrations_list',
    description: `List all third-party integrations configured in the current project. Returns each integration's type (kind), display name, non-sensitive configuration, error status, and creation metadata. Common kinds include slack, github, hubspot, salesforce, and various ad platforms. When authenticated via personal API key, only GitHub integrations are returned.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_llm_analytics_clustering_jobs_list',
    description: `List all clustering job configurations for the current team (max 5 per team). Each job defines an analysis level (trace or generation) and event filters that scope which traces are included in clustering runs. Cluster results are stored as $ai_trace_clusters and $ai_generation_clusters events — use docs-search or execute-sql to query them.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_llm_analytics_clustering_jobs_retrieve',
    description: `Retrieve a specific clustering job configuration by ID. Returns the job name, analysis level (trace or generation), event filters, enabled status, and timestamps.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this clustering job.`,
      },
    ],
  },
  {
    name: 'posthogmcp_llm_analytics_evaluation_summary_create',
    description: `Generate an AI-powered summary of LLM evaluation results for a given evaluation config. Pass an evaluation_id and an optional filter ("all", "pass", "fail", or "na") to scope which runs are analyzed. Returns an overall assessment, pattern groups for passing, failing, and N/A runs (each with title, description, frequency, and example generation IDs), actionable recommendations, and run statistics. Optionally pass generation_ids to restrict the analysis to specific runs. Results are cached for one hour — use force_refresh to recompute. Rate-limited; requires AI data processing approval for the organization.`,
    params: [
      {
        name: 'evaluation_id',
        type: 'string',
        required: true,
        description: `UUID of the evaluation config to summarize`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter type to apply ('all', 'pass', 'fail', or 'na')  * 'all' - all * 'pass' - pass * 'fail' - fail * 'na' - na`,
      },
      {
        name: 'force_refresh',
        type: 'boolean',
        required: false,
        description: `If true, bypass cache and generate a fresh summary`,
      },
      {
        name: 'generation_ids',
        type: 'array',
        required: false,
        description: `Optional: specific generation IDs to include in summary (max 250)`,
      },
    ],
  },
  {
    name: 'posthogmcp_llm_analytics_sentiment_create',
    description: `Classify sentiment of LLM trace or generation user messages as positive, neutral, or negative. Pass a list of trace or generation IDs and an analysis_level ("trace" or "generation"). Returns per-ID sentiment labels with confidence scores and per-message breakdowns. Results are cached — use force_refresh to recompute. Rate-limited.`,
    params: [
      {
        name: 'analysis_level',
        type: 'string',
        required: false,
        description: `* 'trace' - trace * 'generation' - generation`,
      },
      { name: 'date_from', type: 'string', required: false, description: `Date from.` },
      { name: 'date_to', type: 'string', required: false, description: `Date to.` },
      { name: 'force_refresh', type: 'boolean', required: false, description: `Force refresh.` },
      { name: 'ids', type: 'array', required: true, description: `Ids.` },
    ],
  },
  {
    name: 'posthogmcp_llm_analytics_summarization_create',
    description: `Generate an AI-powered summary of an LLM trace or generation. Pass a trace_id or generation_id with a date_from — the backend fetches the data and returns a structured summary with title, flow diagram, summary bullets, and interesting notes. Results are cached. Use mode "minimal" (default) for 3-5 points or "detailed" for 5-10 points. Rate-limited.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: false,
        description: `Data to summarize. For traces: {trace, hierarchy}. For events: {event}. Not required when using trace_id or generation_id.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Start of date range for ID-based lookup (e.g. '-7d' or '2026-01-01'). Defaults to -30d.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `End of date range for ID-based lookup. Defaults to now.`,
      },
      {
        name: 'force_refresh',
        type: 'boolean',
        required: false,
        description: `Force regenerate summary, bypassing cache`,
      },
      {
        name: 'generation_id',
        type: 'string',
        required: false,
        description: `Generation event UUID to summarize. The backend fetches the event data automatically. Requires date_from for efficient lookup.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Summary detail level: 'minimal' for 3-5 points, 'detailed' for 5-10 points  * 'minimal' - minimal * 'detailed' - detailed`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `LLM model to use (defaults based on provider)`,
      },
      {
        name: 'summarize_type',
        type: 'string',
        required: false,
        description: `Type of entity to summarize. Inferred automatically when using trace_id or generation_id.  * 'trace' - trace * 'event' - event`,
      },
      {
        name: 'trace_id',
        type: 'string',
        required: false,
        description: `Trace ID to summarize. The backend fetches the trace data automatically. Requires date_from for efficient lookup.`,
      },
    ],
  },
  {
    name: 'posthogmcp_logs_attribute_values_list',
    description: `List values for a specific log attribute key. Use to discover what values exist before building filters. Defaults to attribute_type "log" (log-level attributes). To get values for resource-level attributes (e.g. service.name, k8s.pod.name), you MUST explicitly pass attribute_type: "resource". Accepts optional serviceNames, dateRange, and filterGroup to narrow which logs are scanned.`,
    params: [
      {
        name: 'attribute_type',
        type: 'string',
        required: false,
        description: `Type of attribute: "log" or "resource". Defaults to "log".  * 'log' - log * 'resource' - resource`,
      },
      {
        name: 'dateRange',
        type: 'object',
        required: false,
        description: `Date range to search within. Defaults to last hour.`,
      },
      {
        name: 'filterGroup',
        type: 'array',
        required: false,
        description: `Property filters to narrow which logs are scanned for values.`,
      },
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The attribute key to get values for`,
      },
      {
        name: 'serviceNames',
        type: 'array',
        required: false,
        description: `Filter values to those appearing in logs from these services.`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `Search filter for attribute values`,
      },
    ],
  },
  {
    name: 'posthogmcp_logs_attributes_list',
    description: `List available log attribute names for filtering. Defaults to attribute_type "log" (log-level attributes). To search resource-level attributes (e.g. k8s.pod.name, k8s.namespace.name), you MUST explicitly pass attribute_type: "resource" — it will NOT return resource attributes unless you do. Accepts optional serviceNames, dateRange, and filterGroup to narrow which logs are scanned.`,
    params: [
      {
        name: 'attribute_type',
        type: 'string',
        required: false,
        description: `Type of attributes: "log" for log attributes, "resource" for resource attributes. Defaults to "log".  * 'log' - log * 'resource' - resource`,
      },
      {
        name: 'dateRange',
        type: 'object',
        required: false,
        description: `Date range to search within. Defaults to last hour.`,
      },
      {
        name: 'filterGroup',
        type: 'array',
        required: false,
        description: `Property filters to narrow which logs are scanned for attributes.`,
      },
      { name: 'limit', type: 'number', required: false, description: `Max results (default: 100)` },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Pagination offset (default: 0)`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search filter for attribute names`,
      },
      {
        name: 'serviceNames',
        type: 'array',
        required: false,
        description: `Filter attributes to those appearing in logs from these services.`,
      },
    ],
  },
  {
    name: 'posthogmcp_logs_sparkline_query',
    description: `Get a time-bucketed sparkline of log volume, broken down by severity or service. Use this to understand log volume patterns before querying individual log entries — it is much cheaper than a full log query.

All parameters must be nested inside a \`query\` object.

# Parameters

## query.dateRange

Date range for the sparkline. Defaults to the last hour (\`-1h\`).

- \`date_from\`: Start of the range. Accepts ISO 8601 timestamps or relative formats: \`-1h\`, \`-6h\`, \`-1d\`, \`-7d\`.
- \`date_to\`: End of the range. Same format. Omit or null for "now".

## query.serviceNames

Filter by service names.

## query.severityLevels

Filter by log severity: \`trace\`, \`debug\`, \`info\`, \`warn\`, \`error\`, \`fatal\`. Omit to include all levels.

## query.searchTerm

Full-text search across log bodies.

## query.filterGroup

Property filters to narrow results. Same format as \`query-logs\` filters.

## query.sparklineBreakdownBy

Break down the sparkline by \`"severity"\` (default) or \`"service"\`. Use \`"service"\` to see which services are producing the most logs.

# Examples

## Error volume over the last day

\`\`\`json
{
  "query": {
    "serviceNames": ["api-gateway"],
    "severityLevels": ["error", "fatal"],
    "dateRange": { "date_from": "-1d" }
  }
}
\`\`\`

## Log volume by service

\`\`\`json
{
  "query": {
    "serviceNames": ["api-gateway"],
    "sparklineBreakdownBy": "service",
    "dateRange": { "date_from": "-6h" }
  }
}
\`\`\`

## Log volume by severity

\`\`\`json
{
  "query": {
    "serviceNames": ["api-gateway"],
    "sparklineBreakdownBy": "severity",
    "dateRange": { "date_from": "-1d" }
  }
}
\`\`\``,
    params: [
      {
        name: 'query',
        type: 'object',
        required: true,
        description: `The sparkline query to execute.`,
      },
    ],
  },
  {
    name: 'posthogmcp_notebooks_create',
    description: `Create a new notebook. Provide a title and content. Content is a JSON object representing the notebook's rich text document structure (ProseMirror-based). Returns the created notebook with its short_id.`,
    params: [
      {
        name: 'content',
        type: 'object',
        required: false,
        description: `Notebook content as a ProseMirror JSON document structure.`,
      },
      {
        name: 'deleted',
        type: 'boolean',
        required: false,
        description: `Whether the notebook has been soft-deleted.`,
      },
      {
        name: 'text_content',
        type: 'string',
        required: false,
        description: `Plain text representation of the notebook content for search.`,
      },
      { name: 'title', type: 'string', required: false, description: `Title of the notebook.` },
      {
        name: 'version',
        type: 'number',
        required: false,
        description: `Version number for optimistic concurrency control. Must match the current version when updating content.`,
      },
    ],
  },
  {
    name: 'posthogmcp_notebooks_destroy',
    description: `Delete a notebook by short_id. The notebook will be soft-deleted and no longer appear in lists.`,
    params: [{ name: 'short_id', type: 'string', required: true, description: `Short id.` }],
  },
  {
    name: 'posthogmcp_notebooks_list',
    description: `List all notebooks in the project. Supports filtering by search term, created_by, last_modified_by, date_from, date_to, and contains. Returns title, short_id, and creation/modification metadata.`,
    params: [
      {
        name: 'contains',
        type: 'string',
        required: false,
        description: `Filter for notebooks that match a provided filter.                 Each match pair is separated by a colon,                 multiple match pairs can be sent separated by a space or a comma`,
      },
      {
        name: 'created_by',
        type: 'string',
        required: false,
        description: `The UUID of the Notebook's creator`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Filter for notebooks created after this date & time`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Filter for notebooks created before this date & time`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `If any value is provided for this parameter, return notebooks created by the logged in user.`,
      },
    ],
  },
  {
    name: 'posthogmcp_notebooks_partial_update',
    description: `Update an existing notebook by short_id. Can update title, content, and deleted status. IMPORTANT: when updating the content field, you must provide the current version number for optimistic concurrency control. Retrieve the notebook first to get the latest version.`,
    params: [
      {
        name: 'content',
        type: 'object',
        required: false,
        description: `Notebook content as a ProseMirror JSON document structure.`,
      },
      {
        name: 'deleted',
        type: 'boolean',
        required: false,
        description: `Whether the notebook has been soft-deleted.`,
      },
      { name: 'short_id', type: 'string', required: true, description: `Short id.` },
      {
        name: 'text_content',
        type: 'string',
        required: false,
        description: `Plain text representation of the notebook content for search.`,
      },
      { name: 'title', type: 'string', required: false, description: `Title of the notebook.` },
      {
        name: 'version',
        type: 'number',
        required: false,
        description: `Version number for optimistic concurrency control. Must match the current version when updating content.`,
      },
    ],
  },
  {
    name: 'posthogmcp_notebooks_retrieve',
    description: `Get a specific notebook by its short_id. Returns the full notebook including title, content, version, and creation/modification metadata.`,
    params: [{ name: 'short_id', type: 'string', required: true, description: `Short id.` }],
  },
  {
    name: 'posthogmcp_org_members_list',
    description: `List all members of the current organization with their names, emails, membership levels (member, admin, owner), and last login times.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `Sort order. Defaults to '-joined_at'.`,
      },
    ],
  },
  {
    name: 'posthogmcp_organization_get',
    description: `Get details of an organization by ID including name, membership level, member count, teams, and projects. If no ID is provided, returns the active organization.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Organization ID. If omitted, uses the active organization.`,
      },
    ],
  },
  {
    name: 'posthogmcp_organizations_list',
    description: `List all organizations the user has access to. Returns org ID, name, slug, and membership level. Use the ID with organization-get for details or switch-organization to change context.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_persons_bulk_delete',
    description: `Delete up to 1000 persons by PostHog person UUIDs or distinct IDs. Optionally delete associated events and recordings. Pass either \`ids\` (person UUIDs) or \`distinct_ids\`. Returns 202 Accepted. This operation is irreversible.`,
    params: [
      {
        name: 'delete_events',
        type: 'boolean',
        required: false,
        description: `If true, queue deletion of all events associated with these persons.`,
      },
      {
        name: 'delete_recordings',
        type: 'boolean',
        required: false,
        description: `If true, queue deletion of all recordings associated with these persons.`,
      },
      {
        name: 'distinct_ids',
        type: 'array',
        required: false,
        description: `A list of distinct IDs whose associated persons will be deleted (max 1000).`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `A list of PostHog person UUIDs to delete (max 1000).`,
      },
      {
        name: 'keep_person',
        type: 'boolean',
        required: false,
        description: `If true, keep the person records but delete their events and recordings.`,
      },
    ],
  },
  {
    name: 'posthogmcp_persons_cohorts_retrieve',
    description: `Get all cohorts that a specific person belongs to. Requires the person_id query parameter.`,
    params: [
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: `The person ID or UUID to get cohorts for.`,
      },
    ],
  },
  {
    name: 'posthogmcp_persons_list',
    description: `List persons in the current project. Supports search by email (full text) or distinct ID (exact match), and filtering by email or distinct_id query parameters. Returns paginated results with person properties and distinct IDs.`,
    params: [
      {
        name: 'distinct_id',
        type: 'string',
        required: false,
        description: `Filter list by distinct id.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Filter persons by email (exact match)`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search persons, either by email (full text search) or distinct_id (exact match).`,
      },
    ],
  },
  {
    name: 'posthogmcp_persons_property_delete',
    description: `Remove a single property from a person by key. The property is deleted asynchronously via the event pipeline ($unset).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A unique value identifying this person. Accepts both numeric ID and UUID.`,
      },
      {
        name: 'unset',
        type: 'string',
        required: true,
        description: `The property key to remove from this person.`,
      },
    ],
  },
  {
    name: 'posthogmcp_persons_property_set',
    description: `Set a single property on a person. The property is updated asynchronously via the event pipeline ($set). Returns 202 Accepted.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A unique value identifying this person. Accepts both numeric ID and UUID.`,
      },
      { name: 'key', type: 'string', required: true, description: `The property key to set.` },
      {
        name: 'value',
        type: 'object',
        required: true,
        description: `The property value. Can be a string, number, boolean, or object.`,
      },
    ],
  },
  {
    name: 'posthogmcp_persons_retrieve',
    description: `Retrieve a single person by numeric ID or UUID. Returns the person's properties, distinct IDs, and metadata.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A unique value identifying this person. Accepts both numeric ID and UUID.`,
      },
    ],
  },
  {
    name: 'posthogmcp_persons_values_retrieve',
    description: `Get distinct values for a person property key. Useful for discovering what values exist for properties like 'plan', 'role', or 'company'. Provide the property key and optionally a search value to filter results.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The person property key to get values for (e.g., 'email', 'plan', 'role').`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `Optional search string to filter values (case-insensitive substring match).`,
      },
    ],
  },
  {
    name: 'posthogmcp_projects_get',
    description: `Fetches projects that the user has access to in the current organization.`,
    params: [],
  },
  {
    name: 'posthogmcp_prompt_create',
    description: `Create a new LLM prompt for the current team. Requires a unique name and prompt content (string or JSON object).`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Unique prompt name using letters, numbers, hyphens, and underscores only.`,
      },
      {
        name: 'prompt',
        type: 'object',
        required: true,
        description: `Prompt payload as JSON or string data.`,
      },
    ],
  },
  {
    name: 'posthogmcp_prompt_duplicate',
    description: `Duplicate an existing LLM prompt under a new name. Copies the latest version's content to create a new prompt at version 1. Useful for forking a prompt or as a way to rename since names are immutable after creation.`,
    params: [
      {
        name: 'new_name',
        type: 'string',
        required: true,
        description: `Name for the duplicated prompt. Must be unique and use only letters, numbers, hyphens, and underscores.`,
      },
      { name: 'prompt_name', type: 'string', required: true, description: `Prompt name.` },
    ],
  },
  {
    name: 'posthogmcp_prompt_get',
    description: `Get a specific LLM prompt by name. Uses the cached endpoint for fast retrieval.
The response always includes \`outline\`, a flat list of markdown headings parsed from the prompt — useful
as a lightweight table of contents. Pass \`content=none\` to get the outline without the prompt payload,
or \`content=preview\` for a short \`prompt_preview\` snippet instead of the full prompt.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Controls how much prompt content is included in the response. 'full' includes the full prompt, 'preview' includes a short prompt_preview, and 'none' omits prompt content entirely. The outline field is always included.  * 'full' - full * 'preview' - preview * 'none' - none`,
      },
      { name: 'prompt_name', type: 'string', required: true, description: `Prompt name.` },
      {
        name: 'version',
        type: 'number',
        required: false,
        description: `Specific prompt version to fetch. If omitted, the latest version is returned.`,
      },
    ],
  },
  {
    name: 'posthogmcp_prompt_list',
    description: `List all LLM prompts stored for the current team. Optionally filter by name. Returns paginated prompt summaries. By default, only prompt metadata is returned, not full prompt content. Every result also includes \`outline\`, a flat list of markdown headings parsed from the prompt — use it as a lightweight table of contents, and pair with \`content=none\` to keep responses small.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Controls how much prompt content is included in list results. 'full' includes the full prompt, 'preview' includes a short prompt_preview, and 'none' omits prompt content entirely.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Optional substring filter applied to prompt names and prompt content.`,
      },
    ],
  },
  {
    name: 'posthogmcp_prompt_update',
    description: `Publish a new version of an existing LLM prompt by name. Name is immutable after creation.
You can either provide the full prompt content via 'prompt', or use 'edits' for incremental
find/replace updates. Each edit must have 'old' (text to find, must match exactly once) and
'new' (replacement text). Edits are applied sequentially. Only one of 'prompt' or 'edits'
may be provided.`,
    params: [
      {
        name: 'base_version',
        type: 'number',
        required: false,
        description: `Latest version you are editing from. Used for optimistic concurrency checks.`,
      },
      {
        name: 'edits',
        type: 'array',
        required: false,
        description: `List of find/replace operations to apply to the current prompt version. Each edit's 'old' text must match exactly once. Edits are applied sequentially. Mutually exclusive with prompt.`,
      },
      {
        name: 'prompt',
        type: 'object',
        required: false,
        description: `Full prompt payload to publish as a new version. Mutually exclusive with edits.`,
      },
      { name: 'prompt_name', type: 'string', required: true, description: `Prompt name.` },
    ],
  },
  {
    name: 'posthogmcp_properties_list',
    description: `List properties for events or persons. If fetching event properties, you must provide an event name.`,
    params: [
      {
        name: 'eventName',
        type: 'string',
        required: false,
        description: `Event name to filter properties by, required for event type`,
      },
      {
        name: 'includePredefinedProperties',
        type: 'boolean',
        required: false,
        description: `Whether to include predefined properties`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Limit.` },
      { name: 'offset', type: 'integer', required: false, description: `Offset.` },
      { name: 'type', type: 'string', required: true, description: `Type of properties to get` },
    ],
  },
  {
    name: 'posthogmcp_proxy_create',
    description: `Create a new managed reverse proxy for a custom domain. Provide the domain (e.g. 'e.example.com') that will proxy requests to PostHog. The response includes the CNAME target — the user must add a CNAME DNS record pointing their domain to this target. Once DNS propagates, the proxy is automatically verified and an SSL certificate is issued. The proxy starts in 'waiting' status until DNS is verified.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The custom domain to proxy through, e.g. 'e.example.com'. Must be a valid subdomain you control.`,
      },
    ],
  },
  {
    name: 'posthogmcp_proxy_delete',
    description: `Delete a managed reverse proxy. For proxies still being set up (waiting, erroring, timed_out), the record is removed immediately. For active proxies, a cleanup workflow is started to remove the provisioned infrastructure.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this proxy record.`,
      },
    ],
  },
  {
    name: 'posthogmcp_proxy_get',
    description: `Get full details of a specific reverse proxy by ID. Returns the domain, CNAME target (the DNS record value the user needs to configure), current provisioning status, and any error or warning messages. Use this to debug why a proxy isn't working or to check DNS verification status.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this proxy record.`,
      },
    ],
  },
  {
    name: 'posthogmcp_proxy_list',
    description: `List all managed reverse proxies configured for the current organization. Returns each proxy's domain, CNAME target, provisioning status, and the maximum number of proxies allowed by the current plan. Use this to check whether a reverse proxy is set up before recommending one.`,
    params: [],
  },
  {
    name: 'posthogmcp_proxy_retry',
    description: `Retry provisioning a reverse proxy that has failed. Only works for proxies in 'erroring' or 'timed_out' status. Resets the proxy to 'waiting' and restarts the DNS verification and certificate provisioning workflow.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this proxy record.`,
      },
    ],
  },
  {
    name: 'posthogmcp_query_error_tracking_issues',
    description: `Query error tracking issues to find, filter, and inspect errors in the project. Returns aggregated metrics per issue including occurrence count, affected users, sessions, and volume data.

Use 'read-data-schema' to discover available events, actions, and properties for filters.

This is a unified query tool — use it both to list issues and to get details on a specific issue:

- **List issues**: omit \`issueId\` to get a filtered, sorted list of error tracking issues.
- **Get issue details**: provide \`issueId\` to get aggregated metrics for a single issue.

Use \`error-tracking-issues-retrieve\` to get the full issue model (description, assignee, external references) and \`error-tracking-issues-partial-update\` to change status or assignee.

CRITICAL: Be minimalist. Only include filters and settings that are essential to answer the user's specific question. Default settings are usually sufficient unless the user explicitly requests customization.

# Data narrowing

## Property filters

Use property filters via the \`filterGroup\` field to narrow results. Only include property filters when they are essential to directly answer the user's question. Avoid adding them if the question can be addressed without additional filtering and always use the minimum set of property filters needed.

IMPORTANT: Do not check if a property is set unless the user explicitly asks for it.

When using a property filter, you should:

- **Prioritize properties directly related to the context or objective of the user's query.** Avoid using properties for identification like IDs. Instead, prioritize filtering based on general properties like \`$browser\`, \`$os\`, or \`$geoip_country_code\`.
- **Ensure that you find both the property group and name.** Property groups should be one of the following: event, person, session, group.
- After selecting a property, **validate that the property value accurately reflects the intended criteria**.
- **Find the suitable operator for type** (e.g., \`contains\`, \`is set\`).
- If the operator requires a value, use the \`read-data-schema\` tool to find the property values.

Infer the property groups from the user's request. If your first guess doesn't yield any results, try to adjust the property group.

Supported operators for the String type are:

- equals (exact)
- doesn't equal (is_not)
- contains (icontains)
- doesn't contain (not_icontains)
- matches regex (regex)
- doesn't match regex (not_regex)
- is set
- is not set

Supported operators for the Numeric type are:

- equals (exact)
- doesn't equal (is_not)
- greater than (gt)
- less than (lt)
- is set
- is not set

Supported operators for the DateTime type are:

- equals (is_date_exact)
- doesn't equal (is_not for existence check)
- before (is_date_before)
- after (is_date_after)
- is set
- is not set

Supported operators for the Boolean type are:

- equals
- doesn't equal
- is set
- is not set

All operators take a single value except for \`equals\` and \`doesn't equal\` which can take one or more values (as an array).

## Time period

You should not filter events by time using property filters. Instead, use the \`dateRange\` field. If the question doesn't mention time, the default is the last 7 days.

# Parameters

## issueId (optional)

When provided, returns aggregated metrics for a single error tracking issue. When omitted, returns a paginated list of issues matching the filters.

## status

Filter by issue status. Available values: \`active\`, \`resolved\`, \`suppressed\`, \`pending_release\`, \`archived\`, \`all\`. Defaults to \`active\`.

## orderBy

Field to sort results by: \`occurrences\`, \`last_seen\`, \`first_seen\`, \`users\`, \`sessions\`. Defaults to \`occurrences\`.

## searchQuery

Free-text search across exception type, message, and stack frames. Use this when the user is looking for a specific error by name or message content.

## assignee

Filter issues by assignee. The value is a user ID. Use this when the user asks to see errors assigned to a specific person.

## filterGroup

A flat list of property filters to narrow results. Each filter specifies a property key, operator, type (event/person/session/group), and value. See the "Property filters" section above for usage guidelines and supported operators.

## volumeResolution

Controls the granularity of the volume chart data returned with each issue. Use \`1\` (default) for list views where you want a volume sparkline. Use \`0\` when you only need aggregate counts without volume data.

## dateRange

Date range to filter results. Defaults to the last 7 days (\`-7d\`).

- \`date_from\`: Start of the range. Accepts ISO 8601 timestamps (e.g., \`2024-01-15T00:00:00Z\`) or relative formats: \`-7d\`, \`-2w\`, \`-1m\`, \`-1h\`, \`-1mStart\`, \`-1yStart\`.
- \`date_to\`: End of the range. Same format. Omit or null for "now".

## limit / offset

Pagination controls. \`limit\` defaults to 50.

# Examples

## List all active errors sorted by occurrence count

\`\`\`json
{}
\`\`\`

All defaults apply: \`status: "active"\`, \`orderBy: "occurrences"\`, \`dateRange: { "date_from": "-7d" }\`.

## Search for a specific error

\`\`\`json
{
  "searchQuery": "TypeError: Cannot read property",
  "limit": 10
}
\`\`\`

## Get details for a specific issue

\`\`\`json
{
  "issueId": "01234567-89ab-cdef-0123-456789abcdef",
  "volumeResolution": 0
}
\`\`\`

## List resolved errors from the last 30 days

\`\`\`json
{
  "status": "resolved",
  "dateRange": { "date_from": "-30d" },
  "orderBy": "last_seen"
}
\`\`\`

## Find most recent errors

\`\`\`json
{
  "orderBy": "first_seen",
  "orderDirection": "DESC",
  "dateRange": { "date_from": "-24h" }
}
\`\`\`

## Errors from Chrome users only

\`\`\`json
{
  "filterGroup": [{ "key": "$browser", "operator": "exact", "type": "event", "value": ["Chrome"] }]
}
\`\`\`

## Errors from US users in the last 30 days

\`\`\`json
{
  "filterGroup": [{ "key": "$geoip_country_code", "operator": "exact", "type": "event", "value": ["US"] }],
  "dateRange": { "date_from": "-30d" }
}
\`\`\`

# Reminders

- Ensure that any properties included are directly relevant to the context and objectives of the user's question. Avoid unnecessary or unrelated details.
- Avoid overcomplicating the response with excessive property filters. Focus on the simplest solution.`,
    params: [
      { name: 'assignee', type: 'object', required: false, description: `Filter by assignee.` },
      {
        name: 'dateRange',
        type: 'object',
        required: false,
        description: `Date range to filter results.`,
      },
      {
        name: 'filterGroup',
        type: 'array',
        required: false,
        description: `Property filters for the query`,
      },
      {
        name: 'filterTestAccounts',
        type: 'boolean',
        required: false,
        description: `Whether to filter out test accounts.`,
      },
      {
        name: 'issueId',
        type: 'string',
        required: false,
        description: `Filter to a specific error tracking issue by ID.`,
      },
      { name: 'kind', type: 'string', required: false, description: `Kind.` },
      { name: 'limit', type: 'integer', required: false, description: `Limit.` },
      { name: 'offset', type: 'integer', required: false, description: `Offset.` },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Field to sort results by.`,
      },
      { name: 'orderDirection', type: 'string', required: false, description: `Sort direction.` },
      {
        name: 'searchQuery',
        type: 'string',
        required: false,
        description: `Free-text search across exception type, message, and stack frames.`,
      },
      { name: 'status', type: 'string', required: false, description: `Filter by issue status.` },
      {
        name: 'volumeResolution',
        type: 'integer',
        required: false,
        description: `Controls volume chart granularity. Use 1 for sparklines, 0 for counts only.`,
      },
    ],
  },
  {
    name: 'posthogmcp_query_generate_hogql_from_question',
    description: `This is a slow tool, and you should only use it once you have tried to create a query using the 'query-run' tool, or the query is too complicated to create a trend / funnel. Queries project's PostHog data based on a provided natural language question - don't provide SQL query as input but describe the output you want. When giving the results back to the user, first show the SQL query that was used, then provide results in easily readable format. You should also offer to save the query as an insight if the user wants to.`,
    params: [
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `Your natural language query describing the SQL insight (max 1000 characters).`,
      },
    ],
  },
  {
    name: 'posthogmcp_query_logs',
    description: `Query log entries with filtering by severity, service name, date range, search term, and structured attribute filters. Supports cursor-based pagination. Returns log entries with timestamp, body, level, service_name, trace_id, and attributes.

Use \`logs-attributes-list\` and \`logs-attribute-values-list\` to discover available attributes before building filters.

# Workflow — follow this order every time

1. **Discover services first.** Call \`logs-attribute-values-list\` with \`key: "service.name"\` and \`attribute_type: "resource"\` to see available services.
2. **Explore resource attributes.** Call \`logs-attributes-list\` with \`attribute_type: "resource"\` to discover resource-level attributes (e.g. \`k8s.pod.name\`, \`k8s.namespace.name\`). Then call \`logs-attribute-values-list\` with \`attribute_type: "resource"\` for relevant attributes to validate what data exists.
3. **Explore log attributes if needed.** Call \`logs-attributes-list\` (defaults to log attributes) and \`logs-attribute-values-list\` to discover log-level attributes.
4. **Check volume with a sparkline.** Call \`logs-sparkline-query\` with the discovered \`serviceNames\` and filters to see log volume over time. This confirms there is data and shows patterns before you pull individual entries.
5. **Only then query logs.** Once you have confirmed the service name, volume looks right, and relevant filters are set, call \`query-logs\` with \`serviceNames\` and any additional filters.

10 attribute/value queries and 1 sparkline query are cheaper than 1 log query. Prefer thorough exploration over speculative log searches.

CRITICAL: Be minimalist. Only include filters and settings that are essential to answer the user's specific question. Default settings are usually sufficient unless the user explicitly requests customization.

MANDATORY: Never call query-logs without setting \`serviceNames\` or at least one \`log_resource_attribute\` filter. Unfiltered log queries are too broad, expensive, and noisy. If the user hasn't specified a service, use the workflow above to discover services first, then ask or infer.

All parameters must be nested inside a \`query\` object.

# Data narrowing

## Property filters

Use property filters via the \`query.filterGroup\` field to narrow results. Only include property filters when they are essential to directly answer the user's question.

When using a property filter, you should:

- **Choose the right type.** Log property types are:
  - \`log\` — filters the log body/message. Use key "message" for this type.
  - \`log_attribute\` — filters log-level attributes (e.g. "k8s.container.name", "http.method").
  - \`log_resource_attribute\` — filters resource-level attributes (e.g. k8s labels, deployment info).
- **Use \`logs-attributes-list\` to discover available attribute keys** before building filters.
- **Use \`logs-attribute-values-list\` to discover valid values** for a specific attribute key.
- **Find the suitable operator for the value type** (see supported operators below).

**Important:** The \`logs-attributes-list\` and \`logs-attribute-values-list\` tools default to \`attribute_type: "log"\` (log-level attributes). To search resource-level attributes (e.g. \`k8s.pod.name\`, \`k8s.namespace.name\`), you must explicitly pass \`attribute_type: "resource"\`. Forgetting this will return log-level attributes when you intended resource-level ones.

Supported operators:

- String: \`exact\`, \`is_not\`, \`icontains\`, \`not_icontains\`, \`regex\`, \`not_regex\`
- Numeric: \`exact\`, \`gt\`, \`lt\`
- Date: \`is_date_exact\`, \`is_date_before\`, \`is_date_after\`
- Existence (no value needed): \`is_set\`, \`is_not_set\`

The \`value\` field accepts a string, number, or array of strings depending on the operator. Omit \`value\` for \`is_set\`/\`is_not_set\`.

## Time period

Use the \`query.dateRange\` field to control the time window. If the question doesn't mention time, the default is the last hour (\`-1h\`). Examples of relative dates: \`-1h\`, \`-6h\`, \`-1d\`, \`-7d\`, \`-30d\`.

# Parameters

All parameters go inside \`query\`.

## query.severityLevels

Filter by log severity: \`trace\`, \`debug\`, \`info\`, \`warn\`, \`error\`, \`fatal\`. Omit to include all levels.

## query.serviceNames

Filter by service names. Use \`logs-attribute-values-list\` with \`key: "service.name"\` and \`attribute_type: "resource"\` to discover available services.

## query.searchTerm

Full-text search across log bodies. Use this when the user is looking for specific text in log messages.

## query.orderBy

Sort by timestamp: \`latest\` (default) or \`earliest\`.

## query.filterGroup

A list of property filters to narrow results. Each filter specifies \`key\`, \`operator\`, \`type\` (log/log_attribute/log_resource_attribute), and optionally \`value\`. See the "Property filters" section above.

## query.dateRange

Date range to filter results. Defaults to the last hour (\`-1h\`).

- \`date_from\`: Start of the range. Accepts ISO 8601 timestamps or relative formats: \`-1h\`, \`-6h\`, \`-1d\`, \`-7d\`, \`-30d\`.
- \`date_to\`: End of the range. Same format. Omit or null for "now".

## query.limit

Maximum number of results (1-1000). Defaults to 100.

## query.after

Cursor for pagination. Use the \`nextCursor\` value from the previous response.

# Examples

## List recent error logs

\`\`\`json
{
  "query": {
    "severityLevels": ["error", "fatal"],
    "serviceNames": ["<service>"]
  }
}
\`\`\`

## Search for a specific log message

\`\`\`json
{
  "query": {
    "searchTerm": "connection refused",
    "serviceNames": ["<service>"],
    "dateRange": { "date_from": "-6h" }
  }
}
\`\`\`

## Filter logs from a specific service

\`\`\`json
{
  "query": {
    "serviceNames": ["api-gateway"],
    "dateRange": { "date_from": "-1d" }
  }
}
\`\`\`

## Filter by a log attribute

\`\`\`json
{
  "query": {
    "serviceNames": ["<service>"],
    "filterGroup": [{ "key": "http.status_code", "operator": "exact", "type": "log_attribute", "value": "500" }],
    "dateRange": { "date_from": "-1d" }
  }
}
\`\`\`

## Combine severity and attribute filters

\`\`\`json
{
  "query": {
    "severityLevels": ["error"],
    "filterGroup": [
      { "key": "k8s.container.name", "operator": "exact", "type": "log_resource_attribute", "value": "web" }
    ],
    "dateRange": { "date_from": "-12h" }
  }
}
\`\`\`

## Filter by log body content using property filter

\`\`\`json
{
  "query": {
    "serviceNames": ["<service>"],
    "filterGroup": [{ "key": "message", "operator": "icontains", "type": "log", "value": "timeout" }]
  }
}
\`\`\`

## Check if an attribute exists

\`\`\`json
{
  "query": {
    "serviceNames": ["<service>"],
    "filterGroup": [{ "key": "trace_id", "operator": "is_set", "type": "log_attribute" }]
  }
}
\`\`\`

# Reminders

- Always set \`serviceNames\` or a resource attribute filter. Never run a broad unfiltered log query.
- Limit \`dateRange\` to at most \`-1d\` (24 hours) unless the user explicitly requests a longer range.
- When using \`logs-attributes-list\` or \`logs-attribute-values-list\`, remember they default to \`attribute_type: "log"\`. Pass \`attribute_type: "resource"\` to search resource-level attributes.
- Ensure that any property filters are directly relevant to the user's question. Avoid unnecessary filtering.
- Use \`logs-attributes-list\` and \`logs-attribute-values-list\` to discover attributes before guessing filter keys/values.
- Prefer \`searchTerm\` for simple text matching; use \`filterGroup\` with type \`log\` and key \`message\` for regex or exact matching.`,
    params: [
      { name: 'query', type: 'object', required: true, description: `The logs query to execute.` },
    ],
  },
  {
    name: 'posthogmcp_query_run',
    description: `You should use this to answer questions that a user has about their data and for when you want to create a new insight. You can use 'event-definitions-list' to get events to use in the query, and 'event-properties-list' to get properties for those events. It can run a trend, funnel, paths or HogQL query. Where possible, use a trend, funnel or paths query rather than a HogQL query, unless you know the HogQL is correct (e.g. it came from a previous insight.). Use PathsQuery to visualize user flows and navigation patterns — set includeEventTypes to ['hogql'] with a pathsHogQLExpression for custom path steps.`,
    params: [
      {
        name: 'query',
        type: 'object',
        required: true,
        description: `Query object. For analytics charts use InsightVizNode: {kind: 'InsightVizNode', source: TrendsQuery|FunnelsQuery|PathsQuery}. For SQL use DataVisualizationNode: {kind: 'DataVisualizationNode', source: {kind: 'HogQLQuery', query: 'SELECT ...'}}. TrendsQuery and FunnelsQuery require series: [{kind: 'EventsNode', event: 'event_name', custom_name: 'Label'}]. PathsQuery supports pathsFilter for controlling steps and edge limits.`,
      },
    ],
  },
  {
    name: 'posthogmcp_role_get',
    description: `Get details of a specific role including its name, creation date, and creator.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this role.`,
      },
    ],
  },
  {
    name: 'posthogmcp_role_members_list',
    description: `List all members assigned to a specific role. Shows who has which role in the organization.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      { name: 'role_id', type: 'string', required: true, description: `Role id.` },
    ],
  },
  {
    name: 'posthogmcp_roles_list',
    description: `List all roles defined in the organization. Roles group members and can be used in approval policies and access control rules.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
    ],
  },
  {
    name: 'posthogmcp_scheduled_changes_create',
    description: `Schedule a future change to a feature flag. Supported operations: 'update_status' (enable/disable), 'add_release_condition', and 'update_variants'. Provide the flag ID as record_id, model_name as "FeatureFlag", a payload with the operation and value, and a scheduled_at datetime.`,
    params: [
      { name: 'cron_expression', type: 'string', required: false, description: `Cron expression.` },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Optional ISO 8601 datetime after which a recurring schedule stops executing.`,
      },
      {
        name: 'is_recurring',
        type: 'boolean',
        required: false,
        description: `Whether this schedule repeats. Only the 'update_status' operation supports recurring schedules.`,
      },
      {
        name: 'model_name',
        type: 'string',
        required: true,
        description: `The type of record to modify. Currently only "FeatureFlag" is supported.  * 'FeatureFlag' - feature flag`,
      },
      {
        name: 'payload',
        type: 'object',
        required: true,
        description: `The change to apply. Must include an 'operation' key and a 'value' key. Supported operations: 'update_status' (value: true/false to enable/disable the flag), 'add_release_condition' (value: object with 'groups', 'payloads', and 'multivariate' keys), 'update_variants' (value: object with 'variants' and 'payloads' keys).`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The ID of the record to modify (e.g. the feature flag ID).`,
      },
      {
        name: 'recurrence_interval',
        type: 'string',
        required: false,
        description: `How often the schedule repeats. Required when is_recurring is true. One of: daily, weekly, monthly, yearly.  * 'daily' - daily * 'weekly' - weekly * 'monthly' - monthly * 'yearly' - yearly`,
      },
      {
        name: 'scheduled_at',
        type: 'string',
        required: true,
        description: `ISO 8601 datetime when the change should be applied (e.g. '2025-06-01T14:00:00Z').`,
      },
    ],
  },
  {
    name: 'posthogmcp_scheduled_changes_delete',
    description: `Delete a scheduled change by ID. This permanently removes the scheduled change and it will not be executed.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this scheduled change.`,
      },
    ],
  },
  {
    name: 'posthogmcp_scheduled_changes_get',
    description: `Get a single scheduled change by ID. Returns the full details including the payload, schedule timing, execution status, and any failure reason.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this scheduled change.`,
      },
    ],
  },
  {
    name: 'posthogmcp_scheduled_changes_list',
    description: `List scheduled changes in the current project. Filter by model_name=FeatureFlag and record_id to see schedules for a specific flag. Returns pending, executed, and failed schedules with their payloads and timing. Use this to check what changes are queued for a feature flag before modifying it.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'model_name',
        type: 'string',
        required: false,
        description: `Filter by model type. Use "FeatureFlag" to see feature flag schedules.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: false,
        description: `Filter by the ID of a specific feature flag.`,
      },
    ],
  },
  {
    name: 'posthogmcp_scheduled_changes_update',
    description: `Update a pending scheduled change by ID. You can modify the payload, scheduled_at time, or recurrence settings. Cannot change the target record (record_id) or model type (model_name).`,
    params: [
      { name: 'cron_expression', type: 'string', required: false, description: `Cron expression.` },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Optional ISO 8601 datetime after which a recurring schedule stops executing.`,
      },
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this scheduled change.`,
      },
      {
        name: 'is_recurring',
        type: 'boolean',
        required: false,
        description: `Whether this schedule repeats. Only the 'update_status' operation supports recurring schedules.`,
      },
      {
        name: 'model_name',
        type: 'string',
        required: false,
        description: `The type of record to modify. Currently only "FeatureFlag" is supported.  * 'FeatureFlag' - feature flag`,
      },
      {
        name: 'payload',
        type: 'object',
        required: false,
        description: `The change to apply. Must include an 'operation' key and a 'value' key. Supported operations: 'update_status' (value: true/false to enable/disable the flag), 'add_release_condition' (value: object with 'groups', 'payloads', and 'multivariate' keys), 'update_variants' (value: object with 'variants' and 'payloads' keys).`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: false,
        description: `The ID of the record to modify (e.g. the feature flag ID).`,
      },
      {
        name: 'recurrence_interval',
        type: 'string',
        required: false,
        description: `How often the schedule repeats. Required when is_recurring is true. One of: daily, weekly, monthly, yearly.  * 'daily' - daily * 'weekly' - weekly * 'monthly' - monthly * 'yearly' - yearly`,
      },
      {
        name: 'scheduled_at',
        type: 'string',
        required: false,
        description: `ISO 8601 datetime when the change should be applied (e.g. '2025-06-01T14:00:00Z').`,
      },
    ],
  },
  {
    name: 'posthogmcp_session_recording_delete',
    description: `Delete a session recording by ID. This permanently removes the recording data. Use for privacy or compliance workflows.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this session recording.`,
      },
    ],
  },
  {
    name: 'posthogmcp_session_recording_get',
    description: `Get a specific session recording by ID. Returns full recording metadata including duration, interaction counts, console log counts, person info, and viewing status.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this session recording.`,
      },
    ],
  },
  {
    name: 'posthogmcp_session_recording_playlist_create',
    description: `Create a new session recording playlist. Set type to 'collection' for a manually curated list or 'filters' for a saved filter view. Collections cannot have filters, and filter playlists must include at least one filter criterion.`,
    params: [
      {
        name: 'deleted',
        type: 'boolean',
        required: false,
        description: `Set to true to soft-delete the playlist.`,
      },
      { name: 'derived_name', type: 'string', required: false, description: `Derived name.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description of the playlist's purpose or contents.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `JSON object with recording filter criteria. Only used when type is 'filters'. Defines which recordings match this saved filter view. When updating a filters-type playlist, you must include the existing filters alongside any other changes — omitting filters will be treated as removing them.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Human-readable name for the playlist.`,
      },
      {
        name: 'pinned',
        type: 'boolean',
        required: false,
        description: `Whether this playlist is pinned to the top of the list.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Playlist type: 'collection' for manually curated recordings, 'filters' for saved filter views. Required on create, cannot be changed after.  * 'collection' - Collection * 'filters' - Filters`,
      },
    ],
  },
  {
    name: 'posthogmcp_session_recording_playlist_get',
    description: `Get a specific session recording playlist by short_id. Returns full playlist metadata including name, description, filters, type, and recording counts.`,
    params: [{ name: 'short_id', type: 'string', required: true, description: `Short id.` }],
  },
  {
    name: 'posthogmcp_session_recording_playlist_update',
    description: `Update an existing session recording playlist by short_id. Can update name, description, pinned status, and filters. Set deleted to true to soft-delete. The type field cannot be changed after creation. When updating a filters-type playlist, you must include the existing filters alongside other field changes, otherwise the update will fail.`,
    params: [
      {
        name: 'deleted',
        type: 'boolean',
        required: false,
        description: `Set to true to soft-delete the playlist.`,
      },
      { name: 'derived_name', type: 'string', required: false, description: `Derived name.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description of the playlist's purpose or contents.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `JSON object with recording filter criteria. Only used when type is 'filters'. Defines which recordings match this saved filter view. When updating a filters-type playlist, you must include the existing filters alongside any other changes — omitting filters will be treated as removing them.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Human-readable name for the playlist.`,
      },
      {
        name: 'pinned',
        type: 'boolean',
        required: false,
        description: `Whether this playlist is pinned to the top of the list.`,
      },
      { name: 'short_id', type: 'string', required: true, description: `Short id.` },
    ],
  },
  {
    name: 'posthogmcp_session_recording_playlists_list',
    description: `List session recording playlists in the project. Returns both user-created and synthetic (system-generated) playlists with their metadata and recording counts.`,
    params: [
      { name: 'created_by', type: 'number', required: false, description: `Created by.` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      { name: 'short_id', type: 'string', required: false, description: `Short id.` },
    ],
  },
  {
    name: 'posthogmcp_subscriptions_create',
    description: `Create a new subscription to receive scheduled deliveries of an insight or dashboard. Requires either an insight ID or dashboard ID. Set target_type to email, slack, or webhook and target_value to the recipient(s). For email: comma-separated addresses. For slack: requires an integration_id for a connected Slack workspace plus a channel name in target_value. For webhook: a URL. Set frequency (daily, weekly, monthly, yearly) and optionally interval, byweekday, start_date, and until_date. Dashboard subscriptions also require dashboard_export_insights (list of insight IDs from that dashboard, max 6).`,
    params: [
      {
        name: 'bysetpos',
        type: 'number',
        required: false,
        description: `Position within byweekday set for monthly frequency (e.g. 1 for first, -1 for last).`,
      },
      {
        name: 'byweekday',
        type: 'array',
        required: false,
        description: `Days of week for weekly subscriptions: monday, tuesday, wednesday, thursday, friday, saturday, sunday.`,
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: `Total number of deliveries before the subscription stops. Null for unlimited.`,
      },
      {
        name: 'dashboard',
        type: 'number',
        required: false,
        description: `Dashboard ID to subscribe to (mutually exclusive with insight on create).`,
      },
      {
        name: 'dashboard_export_insights',
        type: 'array',
        required: false,
        description: `List of insight IDs from the dashboard to include. Required for dashboard subscriptions, max 6.`,
      },
      {
        name: 'deleted',
        type: 'boolean',
        required: false,
        description: `Set to true to soft-delete. Subscriptions cannot be hard-deleted.`,
      },
      {
        name: 'frequency',
        type: 'string',
        required: true,
        description: `How often to deliver: daily, weekly, monthly, or yearly.  * 'daily' - Daily * 'weekly' - Weekly * 'monthly' - Monthly * 'yearly' - Yearly`,
      },
      {
        name: 'insight',
        type: 'number',
        required: false,
        description: `Insight ID to subscribe to (mutually exclusive with dashboard on create).`,
      },
      {
        name: 'integration_id',
        type: 'number',
        required: false,
        description: `ID of a connected Slack integration. Required when target_type is slack.`,
      },
      {
        name: 'interval',
        type: 'number',
        required: false,
        description: `Interval multiplier (e.g. 2 with weekly frequency means every 2 weeks). Default 1.`,
      },
      {
        name: 'invite_message',
        type: 'string',
        required: false,
        description: `Optional message included in the invitation email when adding new recipients.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `When to start delivering (ISO 8601 datetime).`,
      },
      {
        name: 'summary_enabled',
        type: 'boolean',
        required: false,
        description: `Summary enabled.`,
      },
      {
        name: 'summary_prompt_guide',
        type: 'string',
        required: false,
        description: `Summary prompt guide.`,
      },
      {
        name: 'target_type',
        type: 'string',
        required: true,
        description: `Delivery channel: email, slack, or webhook.  * 'email' - Email * 'slack' - Slack * 'webhook' - Webhook`,
      },
      {
        name: 'target_value',
        type: 'string',
        required: true,
        description: `Recipient(s): comma-separated email addresses for email, Slack channel name/ID for slack, or full URL for webhook.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Human-readable name for this subscription.`,
      },
      {
        name: 'until_date',
        type: 'string',
        required: false,
        description: `When to stop delivering (ISO 8601 datetime). Null for indefinite.`,
      },
    ],
  },
  {
    name: 'posthogmcp_subscriptions_list',
    description: `List subscriptions for the project. Returns scheduled email, Slack, or webhook deliveries of insight or dashboard snapshots. Each subscription includes its schedule (frequency, interval, byweekday), next_delivery_date, and a human-readable summary.`,
    params: [
      {
        name: 'created_by',
        type: 'string',
        required: false,
        description: `Filter by creator user UUID.`,
      },
      {
        name: 'dashboard',
        type: 'number',
        required: false,
        description: `Filter by dashboard ID.`,
      },
      { name: 'insight', type: 'number', required: false, description: `Filter by insight ID.` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      {
        name: 'ordering',
        type: 'string',
        required: false,
        description: `Which field to use when ordering the results.`,
      },
      {
        name: 'resource_type',
        type: 'string',
        required: false,
        description: `Filter by subscription resource: insight vs dashboard export.`,
      },
      { name: 'search', type: 'string', required: false, description: `A search term.` },
      {
        name: 'target_type',
        type: 'string',
        required: false,
        description: `Filter by delivery channel (email, Slack, or webhook).`,
      },
    ],
  },
  {
    name: 'posthogmcp_subscriptions_partial_update',
    description: `Update an existing subscription by ID. Can change target_type, target_value, frequency, interval, byweekday, start_date, until_date, title, or deleted status. Set deleted to true to deactivate a subscription (subscriptions are soft-deleted). Changing target_value triggers notifications to new recipients.`,
    params: [
      {
        name: 'bysetpos',
        type: 'number',
        required: false,
        description: `Position within byweekday set for monthly frequency (e.g. 1 for first, -1 for last).`,
      },
      {
        name: 'byweekday',
        type: 'array',
        required: false,
        description: `Days of week for weekly subscriptions: monday, tuesday, wednesday, thursday, friday, saturday, sunday.`,
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: `Total number of deliveries before the subscription stops. Null for unlimited.`,
      },
      {
        name: 'dashboard',
        type: 'number',
        required: false,
        description: `Dashboard ID to subscribe to (mutually exclusive with insight on create).`,
      },
      {
        name: 'dashboard_export_insights',
        type: 'array',
        required: false,
        description: `List of insight IDs from the dashboard to include. Required for dashboard subscriptions, max 6.`,
      },
      {
        name: 'deleted',
        type: 'boolean',
        required: false,
        description: `Set to true to soft-delete. Subscriptions cannot be hard-deleted.`,
      },
      {
        name: 'frequency',
        type: 'string',
        required: false,
        description: `How often to deliver: daily, weekly, monthly, or yearly.  * 'daily' - Daily * 'weekly' - Weekly * 'monthly' - Monthly * 'yearly' - Yearly`,
      },
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this subscription.`,
      },
      {
        name: 'insight',
        type: 'number',
        required: false,
        description: `Insight ID to subscribe to (mutually exclusive with dashboard on create).`,
      },
      {
        name: 'integration_id',
        type: 'number',
        required: false,
        description: `ID of a connected Slack integration. Required when target_type is slack.`,
      },
      {
        name: 'interval',
        type: 'number',
        required: false,
        description: `Interval multiplier (e.g. 2 with weekly frequency means every 2 weeks). Default 1.`,
      },
      {
        name: 'invite_message',
        type: 'string',
        required: false,
        description: `Optional message included in the invitation email when adding new recipients.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `When to start delivering (ISO 8601 datetime).`,
      },
      {
        name: 'summary_enabled',
        type: 'boolean',
        required: false,
        description: `Summary enabled.`,
      },
      {
        name: 'summary_prompt_guide',
        type: 'string',
        required: false,
        description: `Summary prompt guide.`,
      },
      {
        name: 'target_type',
        type: 'string',
        required: false,
        description: `Delivery channel: email, slack, or webhook.  * 'email' - Email * 'slack' - Slack * 'webhook' - Webhook`,
      },
      {
        name: 'target_value',
        type: 'string',
        required: false,
        description: `Recipient(s): comma-separated email addresses for email, Slack channel name/ID for slack, or full URL for webhook.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Human-readable name for this subscription.`,
      },
      {
        name: 'until_date',
        type: 'string',
        required: false,
        description: `When to stop delivering (ISO 8601 datetime). Null for indefinite.`,
      },
    ],
  },
  {
    name: 'posthogmcp_subscriptions_retrieve',
    description: `Get a specific subscription by ID. Returns the full subscription configuration including target type and value, schedule details, next delivery date, and associated insight or dashboard.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this subscription.`,
      },
    ],
  },
  {
    name: 'posthogmcp_survey_create',
    description: `Creates a new survey in the project. Surveys can be popover or API-based and support various question types including open-ended, multiple choice, rating, and link questions. Once created, you should ask the user if they want to add the survey to their application code.`,
    params: [
      {
        name: 'appearance',
        type: 'object',
        required: false,
        description: `Survey appearance customization.`,
      },
      { name: 'description', type: 'string', required: false, description: `Survey description.` },
      {
        name: 'enable_partial_responses',
        type: 'boolean',
        required: false,
        description: `When at least one question is answered, the response is stored (true). The response is stored when all questions are answered (false).`,
      },
      {
        name: 'iteration_count',
        type: 'number',
        required: false,
        description: `For a recurring schedule, this field specifies the number of times the survey should be shown to the user. Use 1 for 'once every X days', higher numbers for multiple repetitions. Works together with iteration_frequency_days to determine the overall survey schedule.`,
      },
      {
        name: 'iteration_frequency_days',
        type: 'number',
        required: false,
        description: `For a recurring schedule, this field specifies the interval in days between each survey instance shown to the user, used alongside iteration_count for precise scheduling.`,
      },
      {
        name: 'linked_flag_id',
        type: 'number',
        required: false,
        description: `The feature flag linked to this survey.`,
      },
      { name: 'name', type: 'string', required: true, description: `Survey name.` },
      {
        name: 'questions',
        type: 'array',
        required: false,
        description: `The 'array' of questions included in the survey. Each question must conform to one of the defined question types: Basic, Link, Rating, or Multiple Choice.          Basic (open-ended question)         - 'id': The question ID         - 'type': 'open'         - 'question': The text of the question.         - 'description': Optional description of the question.         - 'descriptionContentType': Content type of the description ('html' or 'text').         - 'optional': Whether the question is optional ('boolean').         - 'buttonText': Text displayed on the submit button.         - 'branching': Branching logic for the question. See branching types below for details.          Link (a question with a link)         - 'id': The question ID         - 'type': 'link'         - 'question': The text of the question.         - 'description': Optional description of the question.         - 'descriptionContentType': Content type of the description ('html' or 'text').         - 'optional': Whether the question is optional ('boolean').         - 'buttonText': Text displayed on the submit button.         - 'link': The URL associated with the question.         - 'branching': Branching logic for the question. See branching types below for details.          Rating (a question with a rating scale)         - 'id': The question ID         - 'type': 'rating'         - 'question': The text of the question.         - 'description': Optional description of the question.         - 'descriptionContentType': Content type of the description ('html' or 'text').         - 'optional': Whether the question is optional ('boolean').         - 'buttonText': Text displayed on the submit button.         - 'display': Display style of the rating ('number' or 'emoji').         - 'scale': The scale of the rating ('number').         - 'lowerBoundLabel': Label for the lower bound of the scale.         - 'upperBoundLabel': Label for the upper bound of the scale.         - 'isNpsQuestion': Whether the question is an NPS rating.         - 'branching': Branching logic for the question. See branching types below for details.          Multiple choice         - 'id': The question ID         - 'type': 'single_choice' or 'multiple_choice'         - 'question': The text of the question.         - 'description': Optional description of the question.         - 'descriptionContentType': Content type of the description ('html' or 'text').         - 'optional': Whether the question is optional ('boolean').         - 'buttonText': Text displayed on the submit button.         - 'choices': An array of choices for the question.         - 'shuffleOptions': Whether to shuffle the order of the choices ('boolean').         - 'hasOpenChoice': Whether the question allows an open-ended response ('boolean').         - 'branching': Branching logic for the question. See branching types below for details.          Branching logic can be one of the following types:          Next question: Proceeds to the next question         '''json         {             "type": "next_question"         }         '''          End: Ends the survey, optionally displaying a confirmation message.         '''json         {             "type": "end"         }         '''          Response-based: Branches based on the response values. Available for the 'rating' and 'single_choice' question types.         '''json         {             "type": "response_based",             "responseValues": {                 "responseKey": "value"             }         }         '''          Specific question: Proceeds to a specific question by index.         '''json         {             "type": "specific_question",             "index": 2         }         '''          Translations: Each question can include inline translations.         - 'translations': Object mapping language codes to translated fields.         - Language codes: Any string - allows customers to use their own language keys (e.g., "es", "es-MX", "english", "french")         - Translatable fields: 'question', 'description', 'buttonText', 'choices', 'lowerBoundLabel', 'upperBoundLabel', 'link'          Example with translations:         '''json         {             "id": "uuid",             "type": "rating",             "question": "How satisfied are you?",             "lowerBoundLabel": "Not satisfied",             "upperBoundLabel": "Very satisfied",             "translations": {                 "es": {                     "question": "¿Qué tan satisfecho estás?",                     "lowerBoundLabel": "No satisfecho",                     "upperBoundLabel": "Muy satisfecho"                 },                 "fr": {                     "question": "Dans quelle mesure êtes-vous satisfait?"                 }             }         }         '''`,
      },
      {
        name: 'responses_limit',
        type: 'number',
        required: false,
        description: `The maximum number of responses before automatically stopping the survey.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Setting this will launch the survey immediately. Don't add a start_date unless explicitly requested to do so.`,
      },
      {
        name: 'targeting_flag_filters',
        type: 'object',
        required: false,
        description: `Target specific users based on their properties. Example: {groups: [{properties: [{key: 'email', value: ['@company.com'], operator: 'icontains'}], rollout_percentage: 100}]}`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Survey type.  * 'popover' - popover * 'widget' - widget * 'external_survey' - external survey * 'api' - api`,
      },
    ],
  },
  {
    name: 'posthogmcp_survey_delete',
    description: `Delete a survey by ID (soft delete - marks as archived).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this survey.`,
      },
    ],
  },
  {
    name: 'posthogmcp_survey_get',
    description: `Get a specific survey by ID. Returns the survey configuration including questions, targeting, and scheduling details.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this survey.`,
      },
    ],
  },
  {
    name: 'posthogmcp_survey_stats',
    description: `Get response statistics for a specific survey. Includes detailed event counts (shown, dismissed, sent), unique respondents, conversion rates, and timing data. Supports optional date filtering.`,
    params: [
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Optional ISO timestamp for start date (e.g. 2024-01-01T00:00:00Z)`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Optional ISO timestamp for end date (e.g. 2024-01-31T23:59:59Z)`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this survey.`,
      },
    ],
  },
  {
    name: 'posthogmcp_survey_update',
    description: `Update an existing survey by ID. Can update name, description, questions, scheduling, and other survey properties.`,
    params: [
      {
        name: 'appearance',
        type: 'object',
        required: false,
        description: `Survey appearance customization.`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Archive state for the survey.`,
      },
      {
        name: 'conditions',
        type: 'object',
        required: false,
        description: `Display and targeting conditions for the survey.`,
      },
      { name: 'description', type: 'string', required: false, description: `Survey description.` },
      {
        name: 'enable_partial_responses',
        type: 'boolean',
        required: false,
        description: `When at least one question is answered, the response is stored (true). The response is stored when all questions are answered (false).`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `When the survey stopped being shown to users. Setting this will complete the survey.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this survey.`,
      },
      {
        name: 'iteration_count',
        type: 'number',
        required: false,
        description: `For a recurring schedule, this field specifies the number of times the survey should be shown to the user. Use 1 for 'once every X days', higher numbers for multiple repetitions. Works together with iteration_frequency_days to determine the overall survey schedule.`,
      },
      {
        name: 'iteration_frequency_days',
        type: 'number',
        required: false,
        description: `For a recurring schedule, this field specifies the interval in days between each survey instance shown to the user, used alongside iteration_count for precise scheduling.`,
      },
      {
        name: 'linked_flag_id',
        type: 'number',
        required: false,
        description: `The feature flag linked to this survey.`,
      },
      { name: 'name', type: 'string', required: false, description: `Survey name.` },
      {
        name: 'questions',
        type: 'array',
        required: false,
        description: `The 'array' of questions included in the survey. Each question must conform to one of the defined question types: Basic, Link, Rating, or Multiple Choice.          Basic (open-ended question)         - 'id': The question ID         - 'type': 'open'         - 'question': The text of the question.         - 'description': Optional description of the question.         - 'descriptionContentType': Content type of the description ('html' or 'text').         - 'optional': Whether the question is optional ('boolean').         - 'buttonText': Text displayed on the submit button.         - 'branching': Branching logic for the question. See branching types below for details.          Link (a question with a link)         - 'id': The question ID         - 'type': 'link'         - 'question': The text of the question.         - 'description': Optional description of the question.         - 'descriptionContentType': Content type of the description ('html' or 'text').         - 'optional': Whether the question is optional ('boolean').         - 'buttonText': Text displayed on the submit button.         - 'link': The URL associated with the question.         - 'branching': Branching logic for the question. See branching types below for details.          Rating (a question with a rating scale)         - 'id': The question ID         - 'type': 'rating'         - 'question': The text of the question.         - 'description': Optional description of the question.         - 'descriptionContentType': Content type of the description ('html' or 'text').         - 'optional': Whether the question is optional ('boolean').         - 'buttonText': Text displayed on the submit button.         - 'display': Display style of the rating ('number' or 'emoji').         - 'scale': The scale of the rating ('number').         - 'lowerBoundLabel': Label for the lower bound of the scale.         - 'upperBoundLabel': Label for the upper bound of the scale.         - 'isNpsQuestion': Whether the question is an NPS rating.         - 'branching': Branching logic for the question. See branching types below for details.          Multiple choice         - 'id': The question ID         - 'type': 'single_choice' or 'multiple_choice'         - 'question': The text of the question.         - 'description': Optional description of the question.         - 'descriptionContentType': Content type of the description ('html' or 'text').         - 'optional': Whether the question is optional ('boolean').         - 'buttonText': Text displayed on the submit button.         - 'choices': An array of choices for the question.         - 'shuffleOptions': Whether to shuffle the order of the choices ('boolean').         - 'hasOpenChoice': Whether the question allows an open-ended response ('boolean').         - 'branching': Branching logic for the question. See branching types below for details.          Branching logic can be one of the following types:          Next question: Proceeds to the next question         '''json         {             "type": "next_question"         }         '''          End: Ends the survey, optionally displaying a confirmation message.         '''json         {             "type": "end"         }         '''          Response-based: Branches based on the response values. Available for the 'rating' and 'single_choice' question types.         '''json         {             "type": "response_based",             "responseValues": {                 "responseKey": "value"             }         }         '''          Specific question: Proceeds to a specific question by index.         '''json         {             "type": "specific_question",             "index": 2         }         '''          Translations: Each question can include inline translations.         - 'translations': Object mapping language codes to translated fields.         - Language codes: Any string - allows customers to use their own language keys (e.g., "es", "es-MX", "english", "french")         - Translatable fields: 'question', 'description', 'buttonText', 'choices', 'lowerBoundLabel', 'upperBoundLabel', 'link'          Example with translations:         '''json         {             "id": "uuid",             "type": "rating",             "question": "How satisfied are you?",             "lowerBoundLabel": "Not satisfied",             "upperBoundLabel": "Very satisfied",             "translations": {                 "es": {                     "question": "¿Qué tan satisfecho estás?",                     "lowerBoundLabel": "No satisfecho",                     "upperBoundLabel": "Muy satisfecho"                 },                 "fr": {                     "question": "Dans quelle mesure êtes-vous satisfait?"                 }             }         }         '''`,
      },
      {
        name: 'remove_targeting_flag',
        type: 'boolean',
        required: false,
        description: `Set to true to completely remove all targeting filters from the survey, making it visible to all users (subject to other display conditions like URL matching).`,
      },
      {
        name: 'responses_limit',
        type: 'number',
        required: false,
        description: `The maximum number of responses before automatically stopping the survey.`,
      },
      {
        name: 'schedule',
        type: 'string',
        required: false,
        description: `Survey scheduling behavior: 'once' = show once per user (default), 'recurring' = repeat based on iteration_count and iteration_frequency_days settings, 'always' = show every time conditions are met (mainly for widget surveys)  * 'once' - once * 'recurring' - recurring * 'always' - always`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Setting this will launch the survey immediately. Don't add a start_date unless explicitly requested to do so.`,
      },
      {
        name: 'targeting_flag_filters',
        type: 'object',
        required: false,
        description: `Target specific users based on their properties. Example: {groups: [{properties: [{key: 'email', value: ['@company.com'], operator: 'icontains'}], rollout_percentage: 100}]}`,
      },
      {
        name: 'targeting_flag_id',
        type: 'number',
        required: false,
        description: `An existing targeting flag to use for this survey.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Survey type.  * 'popover' - popover * 'widget' - widget * 'external_survey' - external survey * 'api' - api`,
      },
    ],
  },
  {
    name: 'posthogmcp_surveys_get_all',
    description: `Get all surveys in the project with optional filtering. Can filter by search term or use pagination.`,
    params: [
      { name: 'archived', type: 'boolean', required: false, description: `Archived.` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      { name: 'search', type: 'string', required: false, description: `A search term.` },
    ],
  },
  {
    name: 'posthogmcp_surveys_global_stats',
    description: `Get aggregated response statistics across all surveys in the project. Includes event counts (shown, dismissed, sent), unique respondents, conversion rates, and timing data. Supports optional date filtering.`,
    params: [
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Optional ISO timestamp for start date (e.g. 2024-01-01T00:00:00Z)`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Optional ISO timestamp for end date (e.g. 2024-01-31T23:59:59Z)`,
      },
    ],
  },
  {
    name: 'posthogmcp_switch_organization',
    description: `Change the active organization from the default organization. You should only use this tool if the user asks you to change the organization - otherwise, the default organization will be used.`,
    params: [{ name: 'orgId', type: 'string', required: true, description: `Orgid.` }],
  },
  {
    name: 'posthogmcp_switch_project',
    description: `Change the active project from the default project. You should only use this tool if the user asks you to change the project - otherwise, the default project will be used.`,
    params: [{ name: 'projectId', type: 'integer', required: true, description: `Projectid.` }],
  },
  {
    name: 'posthogmcp_update_feature_flag',
    description: `Update a feature flag by ID in the current project.`,
    params: [
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the feature flag is active.`,
      },
      {
        name: 'evaluation_contexts',
        type: 'array',
        required: false,
        description: `Evaluation contexts that control where this flag evaluates at runtime.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Feature flag targeting configuration.`,
      },
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `A unique integer value identifying this feature flag.`,
      },
      { name: 'key', type: 'string', required: false, description: `Feature flag key.` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Feature flag description (stored in the 'name' field for backwards compatibility).`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Organizational tags for this feature flag.`,
      },
    ],
  },
  {
    name: 'posthogmcp_view_create',
    description: `Create a new data warehouse saved query (view). If a view with the same name already exists, it will be updated instead (upsert behavior). The query must be valid HogQL. After creation, the view can be referenced by name in other HogQL queries.`,
    params: [
      {
        name: 'dag_id',
        type: 'string',
        required: false,
        description: `Optional DAG to place this view into`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Optional folder ID used to organize this view in the SQL editor sidebar.`,
      },
      {
        name: 'is_test',
        type: 'boolean',
        required: false,
        description: `Whether this view is for testing only and will auto-expire.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Unique name for the view. Used as the table name in HogQL queries. Must not conflict with existing table names.`,
      },
      {
        name: 'query',
        type: 'object',
        required: false,
        description: `HogQL query definition as a JSON object. Must contain a "query" key with the SQL string. Example: {"query": "SELECT * FROM events LIMIT 100"}`,
      },
    ],
  },
  {
    name: 'posthogmcp_view_delete',
    description: `Delete a data warehouse saved query (view) by ID. This is a soft delete — the view is marked as deleted and will no longer appear in lists or be queryable in HogQL. Any materialization schedule is also removed. Cannot delete views that have downstream dependencies or views from managed viewsets.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this data warehouse saved query.`,
      },
    ],
  },
  {
    name: 'posthogmcp_view_get',
    description: `Get a specific data warehouse saved query (view) by ID. Returns the full view definition including the HogQL query, column schema, materialization status, sync frequency, and run history metadata.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this data warehouse saved query.`,
      },
    ],
  },
  {
    name: 'posthogmcp_view_list',
    description: `List all data warehouse saved queries (views) in the project. Returns each view's name, materialization status, sync frequency, column schema, latest error, and last run timestamp. Use this to discover available views before querying them in HogQL.`,
    params: [
      {
        name: 'page',
        type: 'number',
        required: false,
        description: `A page number within the paginated result set.`,
      },
      { name: 'search', type: 'string', required: false, description: `A search term.` },
    ],
  },
  {
    name: 'posthogmcp_view_materialize',
    description: `Enable materialization for a saved query. This creates a physical table from the view's query and sets up a 24-hour sync schedule to keep it refreshed. Materialized views are faster to query but use storage. Use 'view-unmaterialize' to undo. Rate limited.`,
    params: [
      {
        name: 'dag_id',
        type: 'string',
        required: false,
        description: `Optional DAG to place this view into`,
      },
      { name: 'deleted', type: 'boolean', required: false, description: `Deleted.` },
      {
        name: 'edited_history_id',
        type: 'string',
        required: false,
        description: `Activity log ID from the last known edit. Used for conflict detection.`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Optional folder ID used to organize this view in the SQL editor sidebar.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this data warehouse saved query.`,
      },
      {
        name: 'is_test',
        type: 'boolean',
        required: false,
        description: `Whether this view is for testing only and will auto-expire.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Unique name for the view. Used as the table name in HogQL queries and the node name in the data modeling Node.`,
      },
      {
        name: 'query',
        type: 'object',
        required: false,
        description: `HogQL query definition as a JSON object with a "query" key containing the SQL string and a "kind" key containing the query type. Example: {"query": "SELECT * FROM events LIMIT 100", "kind": "HogQLQuery"}`,
      },
      {
        name: 'soft_update',
        type: 'boolean',
        required: false,
        description: `If true, skip column inference and validation. For saving drafts.`,
      },
    ],
  },
  {
    name: 'posthogmcp_view_run',
    description: `Trigger a manual materialization run for a saved query. This immediately refreshes the materialized table with the latest data. The view must already be materialized. Use 'view-run-history' to check run status.`,
    params: [
      {
        name: 'dag_id',
        type: 'string',
        required: false,
        description: `Optional DAG to place this view into`,
      },
      { name: 'deleted', type: 'boolean', required: false, description: `Deleted.` },
      {
        name: 'edited_history_id',
        type: 'string',
        required: false,
        description: `Activity log ID from the last known edit. Used for conflict detection.`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Optional folder ID used to organize this view in the SQL editor sidebar.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this data warehouse saved query.`,
      },
      {
        name: 'is_test',
        type: 'boolean',
        required: false,
        description: `Whether this view is for testing only and will auto-expire.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Unique name for the view. Used as the table name in HogQL queries and the node name in the data modeling Node.`,
      },
      {
        name: 'query',
        type: 'object',
        required: false,
        description: `HogQL query definition as a JSON object with a "query" key containing the SQL string and a "kind" key containing the query type. Example: {"query": "SELECT * FROM events LIMIT 100", "kind": "HogQLQuery"}`,
      },
      {
        name: 'soft_update',
        type: 'boolean',
        required: false,
        description: `If true, skip column inference and validation. For saving drafts.`,
      },
    ],
  },
  {
    name: 'posthogmcp_view_run_history',
    description: `Get the 5 most recent materialization run statuses for a saved query. Each entry includes the run status and timestamp. Use this to monitor whether materialization is running successfully.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this data warehouse saved query.`,
      },
    ],
  },
  {
    name: 'posthogmcp_view_unmaterialize',
    description: `Undo materialization for a saved query. Deletes the materialized table and removes the sync schedule, reverting the view back to a virtual query that runs on each access. The view definition itself is preserved. Rate limited.`,
    params: [
      {
        name: 'dag_id',
        type: 'string',
        required: false,
        description: `Optional DAG to place this view into`,
      },
      { name: 'deleted', type: 'boolean', required: false, description: `Deleted.` },
      {
        name: 'edited_history_id',
        type: 'string',
        required: false,
        description: `Activity log ID from the last known edit. Used for conflict detection.`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Optional folder ID used to organize this view in the SQL editor sidebar.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this data warehouse saved query.`,
      },
      {
        name: 'is_test',
        type: 'boolean',
        required: false,
        description: `Whether this view is for testing only and will auto-expire.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Unique name for the view. Used as the table name in HogQL queries and the node name in the data modeling Node.`,
      },
      {
        name: 'query',
        type: 'object',
        required: false,
        description: `HogQL query definition as a JSON object with a "query" key containing the SQL string and a "kind" key containing the query type. Example: {"query": "SELECT * FROM events LIMIT 100", "kind": "HogQLQuery"}`,
      },
      {
        name: 'soft_update',
        type: 'boolean',
        required: false,
        description: `If true, skip column inference and validation. For saving drafts.`,
      },
    ],
  },
  {
    name: 'posthogmcp_view_update',
    description: `Update an existing data warehouse saved query (view). Can change the name, HogQL query, or sync frequency. Changing the query triggers column re-inference and sets the status to 'modified'. Use sync_frequency to control materialization schedule: '24hour', '12hour', '6hour', '1hour', '30min', or 'never'. IMPORTANT: when updating the query field, you must first retrieve the view to get its latest_history_id, then pass that value as edited_history_id for conflict detection.`,
    params: [
      {
        name: 'dag_id',
        type: 'string',
        required: false,
        description: `Optional DAG to place this view into`,
      },
      {
        name: 'edited_history_id',
        type: 'string',
        required: false,
        description: `Required when updating the query field. Get this from latest_history_id on the retrieve response. Used for optimistic concurrency control.`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Optional folder ID used to organize this view in the SQL editor sidebar.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this data warehouse saved query.`,
      },
      {
        name: 'is_test',
        type: 'boolean',
        required: false,
        description: `Whether this view is for testing only and will auto-expire.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Unique name for the view. Used as the table name in HogQL queries. Must not conflict with existing table names.`,
      },
      {
        name: 'query',
        type: 'object',
        required: false,
        description: `HogQL query definition as a JSON object. Must contain a "query" key with the SQL string. Example: {"query": "SELECT * FROM events LIMIT 100"}`,
      },
    ],
  },
  {
    name: 'posthogmcp_workflows_get',
    description: `Get a specific workflow by ID. Returns the full workflow definition including trigger, edges, actions, exit condition, and variables.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `A UUID string identifying this hog flow.`,
      },
    ],
  },
  {
    name: 'posthogmcp_workflows_list',
    description: `List all workflows in the project. Returns workflows with their name, description, status (draft/active/archived), version, trigger configuration, and timestamps.`,
    params: [
      { name: 'created_at', type: 'string', required: false, description: `Created at.` },
      { name: 'created_by', type: 'number', required: false, description: `Created by.` },
      { name: 'id', type: 'string', required: false, description: `Id.` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `The initial index from which to return the results.`,
      },
      { name: 'updated_at', type: 'string', required: false, description: `Updated at.` },
    ],
  },
]
