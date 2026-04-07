import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'pagerduty_escalation_policies_list',
    description: `List escalation policies in PagerDuty. Supports filtering by query, user, team, and includes.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: services, teams, targets.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results per page. Maximum 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset to start pagination search results.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filters the results by name.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Used to specify a field to sort the response on. Options: name, name:asc, name:desc.`,
      },
      {
        name: 'team_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of team IDs to filter escalation policies by.`,
      },
      {
        name: 'user_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of user IDs to filter escalation policies for.`,
      },
    ],
  },
  {
    name: 'pagerduty_escalation_policy_create',
    description: `Create a new escalation policy in PagerDuty. Escalation policies define who gets notified and in what order when an incident is triggered.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the escalation policy.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the escalation policy.`,
      },
      {
        name: 'num_loops',
        type: 'integer',
        required: false,
        description: `The number of times the escalation policy will repeat after reaching the end of its escalation rules.`,
      },
      {
        name: 'on_call_handoff_notifications',
        type: 'string',
        required: false,
        description: `Determines how on call handoff notifications will be sent for users on the escalation policy. Options: if_has_services, always.`,
      },
      {
        name: 'rule_escalation_delay_in_minutes',
        type: 'integer',
        required: false,
        description: `The number of minutes before an unacknowledged incident escalates to the next rule.`,
      },
      {
        name: 'target_id',
        type: 'string',
        required: true,
        description: `The ID of the user or schedule to notify in the first escalation rule.`,
      },
      {
        name: 'target_type',
        type: 'string',
        required: false,
        description: `The type of the first escalation rule target. Options: user_reference, schedule_reference.`,
      },
    ],
  },
  {
    name: 'pagerduty_escalation_policy_delete',
    description: `Delete a PagerDuty escalation policy. The policy must not be in use by any services or schedules.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the escalation policy to delete.`,
      },
    ],
  },
  {
    name: 'pagerduty_escalation_policy_get',
    description: `Get details of a specific PagerDuty escalation policy by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the escalation policy to retrieve.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: services, teams, targets.`,
      },
    ],
  },
  {
    name: 'pagerduty_escalation_policy_update',
    description: `Update an existing PagerDuty escalation policy's name, description, or loop settings.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the escalation policy.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the escalation policy to update.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The updated name of the escalation policy.`,
      },
      {
        name: 'num_loops',
        type: 'integer',
        required: false,
        description: `The number of times the escalation policy will repeat after reaching the end.`,
      },
      {
        name: 'on_call_handoff_notifications',
        type: 'string',
        required: false,
        description: `Determines how on-call handoff notifications are sent. Options: if_has_services, always.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_create',
    description: `Create a new incident in PagerDuty. Requires a title, service ID, and the email of the user creating the incident.`,
    params: [
      {
        name: 'body_details',
        type: 'string',
        required: false,
        description: `Additional details about the incident body (plain text).`,
      },
      {
        name: 'escalation_policy_id',
        type: 'string',
        required: false,
        description: `The ID of the escalation policy to assign to the incident.`,
      },
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `The email address of the user creating the incident. Required by PagerDuty.`,
      },
      {
        name: 'incident_key',
        type: 'string',
        required: false,
        description: `A string that identifies the incident. Used for deduplication.`,
      },
      {
        name: 'priority_id',
        type: 'string',
        required: false,
        description: `The ID of the priority to assign to the incident.`,
      },
      {
        name: 'service_id',
        type: 'string',
        required: true,
        description: `The ID of the service the incident belongs to.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `A brief description of the incident.`,
      },
      {
        name: 'urgency',
        type: 'string',
        required: false,
        description: `The urgency of the incident. Options: high, low.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_get',
    description: `Get details of a specific PagerDuty incident by its ID, including status, assignments, services, and timeline.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the incident to retrieve.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_manage',
    description: `Manage multiple PagerDuty incidents in bulk. Acknowledge, resolve, merge, or reassign multiple incidents at once.`,
    params: [
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `The email address of the user performing the bulk action. Required by PagerDuty.`,
      },
      {
        name: 'incident_ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of incident IDs to manage.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `The status to apply to all specified incidents. Options: acknowledged, resolved.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_note_create',
    description: `Add a note to a PagerDuty incident. Notes are visible to all responders on the incident.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The content of the note to add to the incident.`,
      },
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `The email address of the user creating the note. Required by PagerDuty.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the incident to add a note to.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_update',
    description: `Update an existing PagerDuty incident. Can change status, urgency, title, priority, escalation policy, or reassign it.`,
    params: [
      {
        name: 'assignee_id',
        type: 'string',
        required: false,
        description: `The ID of the user to assign the incident to.`,
      },
      {
        name: 'escalation_policy_id',
        type: 'string',
        required: false,
        description: `The ID of the escalation policy to assign to the incident.`,
      },
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `The email address of the user making the update. Required by PagerDuty.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the incident to update.`,
      },
      {
        name: 'priority_id',
        type: 'string',
        required: false,
        description: `The ID of the priority to assign to the incident.`,
      },
      {
        name: 'resolution',
        type: 'string',
        required: false,
        description: `The resolution note for the incident (used when resolving).`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `The new status of the incident. Options: acknowledged, resolved.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `A brief description of the incident.`,
      },
      {
        name: 'urgency',
        type: 'string',
        required: false,
        description: `The urgency of the incident. Options: high, low.`,
      },
    ],
  },
  {
    name: 'pagerduty_incidents_list',
    description: `List existing incidents in PagerDuty. Supports filtering by status, urgency, service, team, assigned user, and date range.`,
    params: [
      {
        name: 'date_range',
        type: 'string',
        required: false,
        description: `When set to 'all', the since and until parameters and defaults are ignored.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Array of additional resources to include. Options: acknowledgers, agents, assignees, conference_bridge, escalation_policies, first_trigger_log_entries, responders, services, teams, users.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results to return per page. Maximum 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset to start pagination search results.`,
      },
      {
        name: 'service_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of service IDs to filter incidents by.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `The start of the date range to search (ISO 8601 format).`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Used to specify a field you would like to sort the response on. Options: incident_number, created_at, resolved_at, urgency.`,
      },
      {
        name: 'statuses',
        type: 'string',
        required: false,
        description: `Comma-separated list of statuses to filter by. Options: triggered, acknowledged, resolved.`,
      },
      {
        name: 'team_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of team IDs to filter incidents by.`,
      },
      {
        name: 'until',
        type: 'string',
        required: false,
        description: `The end of the date range to search (ISO 8601 format).`,
      },
      {
        name: 'urgencies',
        type: 'string',
        required: false,
        description: `Comma-separated list of urgencies to filter by. Options: high, low.`,
      },
      {
        name: 'user_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of user IDs to filter incidents assigned to.`,
      },
    ],
  },
  {
    name: 'pagerduty_log_entries_list',
    description: `List log entries across all incidents in PagerDuty. Log entries record actions taken on incidents including notifications, acknowledgements, and assignments.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: incidents, services, channels, teams.`,
      },
      {
        name: 'is_overview',
        type: 'boolean',
        required: false,
        description: `If true, only show log entries of type 'notify_log_entry'.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results per page. Maximum 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset to start pagination search results.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `The start of the date range (ISO 8601).`,
      },
      {
        name: 'team_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of team IDs to filter log entries by.`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `Time zone for the log entries (IANA format).`,
      },
      {
        name: 'until',
        type: 'string',
        required: false,
        description: `The end of the date range (ISO 8601).`,
      },
    ],
  },
  {
    name: 'pagerduty_log_entry_get',
    description: `Get details of a specific PagerDuty log entry by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the log entry to retrieve.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: incidents, services, channels, teams.`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `Time zone for the log entry (IANA format).`,
      },
    ],
  },
  {
    name: 'pagerduty_maintenance_window_create',
    description: `Create a new maintenance window in PagerDuty. During a maintenance window, no incidents will be created for the associated services.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the maintenance window.`,
      },
      {
        name: 'end_time',
        type: 'string',
        required: true,
        description: `The end time of the maintenance window (ISO 8601 format).`,
      },
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `The email address of the user creating the maintenance window. Required by PagerDuty.`,
      },
      {
        name: 'service_ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of service IDs to include in the maintenance window.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: true,
        description: `The start time of the maintenance window (ISO 8601 format).`,
      },
    ],
  },
  {
    name: 'pagerduty_maintenance_window_delete',
    description: `Delete a PagerDuty maintenance window. Only future and ongoing maintenance windows may be deleted.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the maintenance window to delete.`,
      },
    ],
  },
  {
    name: 'pagerduty_maintenance_window_get',
    description: `Get details of a specific PagerDuty maintenance window by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the maintenance window to retrieve.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: services, teams.`,
      },
    ],
  },
  {
    name: 'pagerduty_maintenance_window_update',
    description: `Update an existing PagerDuty maintenance window's description, start time, or end time.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the maintenance window.`,
      },
      {
        name: 'end_time',
        type: 'string',
        required: false,
        description: `Updated end time of the maintenance window (ISO 8601 format).`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the maintenance window to update.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Updated start time of the maintenance window (ISO 8601 format).`,
      },
    ],
  },
  {
    name: 'pagerduty_maintenance_windows_list',
    description: `List maintenance windows in PagerDuty. Maintenance windows disable incident notifications for services during scheduled maintenance periods.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter maintenance windows by time. Options: past, future, ongoing.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: services, teams.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results per page. Maximum 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset to start pagination search results.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filters the results by description.`,
      },
      {
        name: 'service_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of service IDs to filter maintenance windows by.`,
      },
      {
        name: 'team_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of team IDs to filter maintenance windows by.`,
      },
    ],
  },
  {
    name: 'pagerduty_notifications_list',
    description: `List notifications sent for incidents in a given time range. Notifications are messages sent to users when incidents are triggered, acknowledged, or resolved.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filters the results by notification type. Options: sms_notification, email_notification, phone_notification, push_notification.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: users.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results per page. Maximum 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset to start pagination search results.`,
      },
      {
        name: 'since',
        type: 'string',
        required: true,
        description: `The start of the date range (ISO 8601). Required.`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `Time zone for the notification data (IANA format).`,
      },
      {
        name: 'until',
        type: 'string',
        required: true,
        description: `The end of the date range (ISO 8601). Required.`,
      },
    ],
  },
  {
    name: 'pagerduty_oncalls_list',
    description: `List who is on call right now or within a date range. Supports filtering by schedule, escalation policy, and user.`,
    params: [
      {
        name: 'earliest',
        type: 'boolean',
        required: false,
        description: `When set to true, returns only the earliest on-call for each combination of escalation policy, escalation level, and user.`,
      },
      {
        name: 'escalation_policy_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of escalation policy IDs to filter by.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: users, schedules, escalation_policies.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results per page. Maximum 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset to start pagination search results.`,
      },
      {
        name: 'schedule_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of schedule IDs to filter by.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `The start of the time range to retrieve on-call information (ISO 8601).`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `Time zone for the on-call data (IANA format).`,
      },
      {
        name: 'until',
        type: 'string',
        required: false,
        description: `The end of the time range to retrieve on-call information (ISO 8601).`,
      },
      {
        name: 'user_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of user IDs to filter on-calls by.`,
      },
    ],
  },
  {
    name: 'pagerduty_priorities_list',
    description: `List the priority options available for incidents in PagerDuty. Returns all configured priority levels.`,
    params: [],
  },
  {
    name: 'pagerduty_schedule_create',
    description: `Create a new on-call schedule in PagerDuty with a single layer. Schedules determine who is on call at any given time.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the schedule.`,
      },
      {
        name: 'layer_name',
        type: 'string',
        required: false,
        description: `The name of the first schedule layer.`,
      },
      {
        name: 'layer_start',
        type: 'string',
        required: true,
        description: `The start time of the schedule layer (ISO 8601 format).`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the schedule.` },
      {
        name: 'rotation_turn_length_seconds',
        type: 'integer',
        required: false,
        description: `The duration of each on-call rotation turn in seconds (e.g., 86400 = 1 day, 604800 = 1 week).`,
      },
      {
        name: 'rotation_virtual_start',
        type: 'string',
        required: true,
        description: `The effective start time of the rotation to align turn order (ISO 8601 format).`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: true,
        description: `The time zone of the schedule (IANA format, e.g., America/New_York).`,
      },
      {
        name: 'user_ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of user IDs to include in the rotation.`,
      },
    ],
  },
  {
    name: 'pagerduty_schedule_delete',
    description: `Delete a PagerDuty on-call schedule. The schedule must not be associated with any escalation policies.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the schedule to delete.`,
      },
    ],
  },
  {
    name: 'pagerduty_schedule_get',
    description: `Get details of a specific PagerDuty on-call schedule by its ID, including layers and users.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the schedule to retrieve.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `The start of the date range to show schedule entries for (ISO 8601).`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `Time zone of the displayed schedule (IANA format).`,
      },
      {
        name: 'until',
        type: 'string',
        required: false,
        description: `The end of the date range to show schedule entries for (ISO 8601).`,
      },
    ],
  },
  {
    name: 'pagerduty_schedule_update',
    description: `Update an existing PagerDuty on-call schedule's name, description, or time zone.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the schedule.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the schedule to update.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name of the schedule.`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `Updated time zone (IANA format, e.g., America/New_York).`,
      },
    ],
  },
  {
    name: 'pagerduty_schedules_list',
    description: `List on-call schedules in PagerDuty. Supports filtering by query string and pagination.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: schedule_layers, teams, users.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results per page. Maximum 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset to start pagination search results.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filters the results by name.`,
      },
    ],
  },
  {
    name: 'pagerduty_service_create',
    description: `Create a new service in PagerDuty. A service represents something you monitor and manage incidents for.`,
    params: [
      {
        name: 'acknowledgement_timeout',
        type: 'integer',
        required: false,
        description: `Time in seconds that an incident is automatically re-triggered after being acknowledged. Set to 0 to disable.`,
      },
      {
        name: 'alert_creation',
        type: 'string',
        required: false,
        description: `Whether a service creates only incidents or creates both incidents and alerts. Options: create_incidents, create_alerts_and_incidents.`,
      },
      {
        name: 'auto_resolve_timeout',
        type: 'integer',
        required: false,
        description: `Time in seconds that an incident is automatically resolved if left open. Set to 0 to disable.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The user-provided description of the service.`,
      },
      {
        name: 'escalation_policy_id',
        type: 'string',
        required: true,
        description: `The ID of the escalation policy to assign to this service.`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the service.` },
    ],
  },
  {
    name: 'pagerduty_service_delete',
    description: `Delete an existing PagerDuty service. This action is irreversible. Only services without open incidents may be deleted.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the service to delete.`,
      },
    ],
  },
  {
    name: 'pagerduty_service_get',
    description: `Get details of a specific PagerDuty service by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the service to retrieve.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: escalation_policies, teams, integrations.`,
      },
    ],
  },
  {
    name: 'pagerduty_service_update',
    description: `Update an existing PagerDuty service. Can change name, description, escalation policy, timeouts, and alert creation settings.`,
    params: [
      {
        name: 'acknowledgement_timeout',
        type: 'integer',
        required: false,
        description: `Time in seconds that an incident is automatically re-triggered after being acknowledged.`,
      },
      {
        name: 'alert_creation',
        type: 'string',
        required: false,
        description: `Whether a service creates only incidents or also alerts. Options: create_incidents, create_alerts_and_incidents.`,
      },
      {
        name: 'auto_resolve_timeout',
        type: 'integer',
        required: false,
        description: `Time in seconds that an incident is automatically resolved if left open.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The user-provided description of the service.`,
      },
      {
        name: 'escalation_policy_id',
        type: 'string',
        required: false,
        description: `The ID of the escalation policy to assign to this service.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the service to update.`,
      },
      { name: 'name', type: 'string', required: false, description: `The name of the service.` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `The current state of the service. Options: active, warning, critical, maintenance, disabled.`,
      },
    ],
  },
  {
    name: 'pagerduty_services_list',
    description: `List existing services in PagerDuty. Supports filtering by team, query string, and pagination.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: escalation_policies, teams, integrations, auto_pause_notifications_parameters.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results per page. Maximum 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset to start pagination search results.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filters the results by name.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort results by this field. Options: name, name:asc, name:desc.`,
      },
      {
        name: 'team_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of team IDs to filter services by.`,
      },
    ],
  },
  {
    name: 'pagerduty_team_create',
    description: `Create a new team in PagerDuty. Teams allow grouping of users and services.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the team.`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the team.` },
    ],
  },
  {
    name: 'pagerduty_team_delete',
    description: `Delete a PagerDuty team. The team must have no associated users, services, or escalation policies before it can be deleted.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the team to delete.` },
    ],
  },
  {
    name: 'pagerduty_team_get',
    description: `Get details of a specific PagerDuty team by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the team to retrieve.`,
      },
    ],
  },
  {
    name: 'pagerduty_team_update',
    description: `Update an existing PagerDuty team's name or description.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the team.`,
      },
      { name: 'id', type: 'string', required: true, description: `The ID of the team to update.` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The updated name of the team.`,
      },
    ],
  },
  {
    name: 'pagerduty_teams_list',
    description: `List teams in PagerDuty. Supports filtering by query string and pagination.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results per page. Maximum 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset to start pagination search results.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filters the results by name.`,
      },
    ],
  },
  {
    name: 'pagerduty_user_create',
    description: `Create a new user in PagerDuty. Requires name, email, and the creating user's email in the From header.`,
    params: [
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `The schedule color for the user.`,
      },
      { name: 'email', type: 'string', required: true, description: `The user's email address.` },
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `The email address of the admin creating this user. Required by PagerDuty.`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the user.` },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `The user's role. Options: admin, limited_user, observer, owner, read_only_user, restricted_access, read_only_limited_user, user.`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `The time zone of the user (IANA format, e.g., America/New_York).`,
      },
    ],
  },
  {
    name: 'pagerduty_user_delete',
    description: `Delete a PagerDuty user. Users cannot be deleted if they are the only remaining account owner.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the user to delete.` },
    ],
  },
  {
    name: 'pagerduty_user_get',
    description: `Get details of a specific PagerDuty user by their ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the user to retrieve.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: contact_methods, notification_rules, teams.`,
      },
    ],
  },
  {
    name: 'pagerduty_user_update',
    description: `Update an existing PagerDuty user's profile including name, email, role, time zone, and color.`,
    params: [
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `The schedule color for the user.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `The user's updated email address.`,
      },
      { name: 'id', type: 'string', required: true, description: `The ID of the user to update.` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The updated name of the user.`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `The user's role. Options: admin, limited_user, observer, owner, read_only_user, restricted_access, read_only_limited_user, user.`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `The time zone of the user (IANA format, e.g., America/New_York).`,
      },
    ],
  },
  {
    name: 'pagerduty_users_list',
    description: `List users in PagerDuty. Supports filtering by query, team, and includes.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: contact_methods, notification_rules, teams.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results per page. Maximum 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset to start pagination search results.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filters the results by name.`,
      },
      {
        name: 'team_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of team IDs to filter users by.`,
      },
    ],
  },
  {
    name: 'pagerduty_vendors_list',
    description: `List available PagerDuty vendors (integration types). Vendors represent the services or monitoring tools that can be integrated with PagerDuty.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results per page. Maximum 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset to start pagination search results.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filters the results by vendor name.`,
      },
    ],
  },
]
