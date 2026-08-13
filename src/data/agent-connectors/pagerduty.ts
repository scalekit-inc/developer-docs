import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'pagerduty_abilities_list',
    description: `List the account's enabled feature abilities (plan and entitlement flags). Useful for an agent to check whether a feature is available before calling a gated endpoint.`,
    params: [],
  },
  {
    name: 'pagerduty_audit_records_list',
    description: `List audit trail records — who did what, when — filterable by actor, action, root resource type, and time range. Defaults to the past 24 hours if no date range is given; the range cannot span more than 31 days.`,
    params: [
      {
        name: 'actions',
        type: 'string',
        required: false,
        description: `Comma-separated list of actions to filter by. Options: create, update, delete.`,
      },
      {
        name: 'actor_id',
        type: 'string',
        required: false,
        description: `Only return records whose actor has this ID. Must be qualified by also providing actor_type.`,
      },
      {
        name: 'actor_type',
        type: 'string',
        required: false,
        description: `Only return records whose actor is of this type.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor. Provide the next_cursor value from a previous response to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of records to return.`,
      },
      {
        name: 'method_truncated_token',
        type: 'string',
        required: false,
        description: `Only return records whose method has this truncated token. Must be qualified by also providing method_type.`,
      },
      {
        name: 'method_type',
        type: 'string',
        required: false,
        description: `Only return records performed via this method.`,
      },
      {
        name: 'root_resource_types',
        type: 'string',
        required: false,
        description: `Comma-separated list of resource types to filter by. Options: users, teams, schedules, escalation_policies, services, ip_allow_lists.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `The start of the date range to search. Defaults to now() - 24 hours if omitted.`,
      },
      {
        name: 'until',
        type: 'string',
        required: false,
        description: `The end of the date range to search. Defaults to now() if omitted. May not be more than 31 days after since.`,
      },
    ],
  },
  {
    name: 'pagerduty_business_service_create',
    description: `Create a new business service — a capability or product that spans multiple technical services, optionally owned by a team.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the business service.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The description of the business service.`,
      },
      {
        name: 'point_of_contact',
        type: 'string',
        required: false,
        description: `The owner of the business service.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `The ID of the team that owns this business service.`,
      },
    ],
  },
  {
    name: 'pagerduty_business_services_list',
    description: `List business services — capabilities or products that span multiple technical services and are owned by teams — with standard offset pagination.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset to start pagination search results.`,
      },
      {
        name: 'total',
        type: 'boolean',
        required: false,
        description: `Set to true to populate the total field in the pagination response, at the cost of slower response times.`,
      },
    ],
  },
  {
    name: 'pagerduty_change_events_list',
    description: `List change events (deploys, config changes, and other events sent via the Change Events API) so they can be correlated in time with incidents. Filterable by team, integration, and date range.`,
    params: [
      {
        name: 'integration_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of integration IDs. Only change events from these integrations are returned.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results to return per page.`,
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
        description: `The start of the date range to search, as a UTC ISO 8601 datetime string.`,
      },
      {
        name: 'team_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of team IDs. Only change events related to these teams are returned. Account must have the teams ability.`,
      },
      {
        name: 'total',
        type: 'boolean',
        required: false,
        description: `Set to true to populate the total field in the pagination response, at the cost of slower response times.`,
      },
      {
        name: 'until',
        type: 'string',
        required: false,
        description: `The end of the date range to search, as a UTC ISO 8601 datetime string.`,
      },
    ],
  },
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
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the escalation policy.`,
      },
      {
        name: 'target_id',
        type: 'string',
        required: true,
        description: `The ID of the user or schedule to notify in the first escalation rule.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the escalation policy.`,
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
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the escalation policy to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the escalation policy.`,
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
    name: 'pagerduty_incident_alert_get',
    description: `Get detailed information about a single alert on a PagerDuty incident.`,
    params: [
      {
        name: 'alert_id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty alert ID.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty incident ID.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_alert_update',
    description: `Update the status of a single alert on a PagerDuty incident, or reassign it to a different incident.`,
    params: [
      {
        name: 'alert_id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty alert ID to update.`,
      },
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `Must be a valid PagerDuty user email address.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty incident ID the alert belongs to.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `The status to apply to the alert.`,
      },
      {
        name: 'target_incident_id',
        type: 'string',
        required: false,
        description: `If set, reassigns the alert to this incident instead of updating status.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_alerts_list',
    description: `List alerts for a specific PagerDuty incident. Supports filtering by status and alert key.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty incident ID.`,
      },
      {
        name: 'alert_key',
        type: 'string',
        required: false,
        description: `Filter alerts by their deduplication key.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated list of resources to sideload. Options: services, first_trigger_log_entries, incidents.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort results by, e.g. created_at:desc.`,
      },
      {
        name: 'statuses',
        type: 'string',
        required: false,
        description: `Comma-separated list of statuses to filter by. Options: triggered, resolved.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_alerts_manage',
    description: `Bulk-update the status of multiple alerts on a PagerDuty incident, or reassign them to a different incident. A maximum of 250 alerts may be updated at a time.`,
    params: [
      {
        name: 'alert_ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of alert IDs to update.`,
      },
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `Must be a valid PagerDuty user email address.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty incident ID the alerts belong to.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `The status to apply to all specified alerts.`,
      },
      {
        name: 'target_incident_id',
        type: 'string',
        required: false,
        description: `If set, reassigns the alerts to this incident instead of updating status.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_create',
    description: `Create a new incident in PagerDuty. Requires a title, service ID, and the email of the user creating the incident.`,
    params: [
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `The email address of the user creating the incident. Required by PagerDuty.`,
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
        name: 'urgency',
        type: 'string',
        required: false,
        description: `The urgency of the incident. Options: high, low.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_custom_fields_list',
    description: `List the custom fields defined for enriching incidents. Existing tools can create and update incidents but nothing else inspects what custom fields are configured for them.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional details to include in the response alongside each field. Only supported value is 'field_options'.`,
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
    name: 'pagerduty_incident_log_entries_list',
    description: `List log entries for a specific PagerDuty incident, scoped to that incident only.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty incident ID.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated list of resources to sideload. Options: incidents, services, channels, teams.`,
      },
      {
        name: 'is_overview',
        type: 'boolean',
        required: false,
        description: `Return only the most relevant log entries for an overview.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Start datetime in ISO 8601 format, e.g. 2024-01-01T00:00:00Z.`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `IANA time zone for the response.`,
      },
      {
        name: 'until',
        type: 'string',
        required: false,
        description: `End datetime in ISO 8601 format, e.g. 2024-12-31T23:59:59Z.`,
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
    name: 'pagerduty_incident_merge',
    description: `Merge one or more source incidents into a target incident. After the merge, the target incident contains the source incidents' alerts and the source incidents are resolved.`,
    params: [
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `Must be a valid PagerDuty user email address.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the incident that source incidents will be merged into.`,
      },
      {
        name: 'source_incident_ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of incident IDs to merge into the target incident.`,
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
    name: 'pagerduty_incident_notes_list',
    description: `List existing notes for a PagerDuty incident.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty incident ID.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_responder_request_create',
    description: `Ask additional users or escalation policies to respond to a PagerDuty incident. At least one of user_ids or escalation_policy_ids must be provided.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty incident ID.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The message sent with the responder request.`,
      },
      {
        name: 'requester_id',
        type: 'string',
        required: true,
        description: `The PagerDuty user ID of the person making the request.`,
      },
      {
        name: 'escalation_policy_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of escalation policy IDs to request as responders.`,
      },
      {
        name: 'user_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of user IDs to request as responders.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_snooze',
    description: `Snooze a PagerDuty incident for a specified number of seconds. After the duration elapses, the incident returns to the triggered state.`,
    params: [
      {
        name: 'duration',
        type: 'integer',
        required: true,
        description: `The number of seconds to snooze the incident for (1 to 604800).`,
      },
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `Must be a valid PagerDuty user email address.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty incident ID.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_status_update_create',
    description: `Post a status update on a PagerDuty incident, visible to subscribers.`,
    params: [
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `Must be a valid PagerDuty user email address.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty incident ID.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The message to post as a status update.`,
      },
    ],
  },
  {
    name: 'pagerduty_incident_update',
    description: `Update an existing PagerDuty incident. Can change status, urgency, title, priority, escalation policy, or reassign it.`,
    params: [
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
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the maintenance window.`,
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
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the maintenance window to update.`,
      },
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
        name: 'since',
        type: 'string',
        required: true,
        description: `The start of the date range (ISO 8601). Required.`,
      },
      {
        name: 'until',
        type: 'string',
        required: true,
        description: `The end of the date range (ISO 8601). Required.`,
      },
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
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `Time zone for the notification data (IANA format).`,
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
        name: 'layer_start',
        type: 'string',
        required: true,
        description: `The start time of the schedule layer (ISO 8601 format).`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the schedule.` },
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
        name: 'rotation_turn_length_seconds',
        type: 'integer',
        required: false,
        description: `The duration of each on-call rotation turn in seconds (e.g., 86400 = 1 day, 604800 = 1 week).`,
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
    name: 'pagerduty_schedule_override_create',
    description: `Create a temporary on-call override for a PagerDuty schedule, assigning a specific user to be on call for a time window.`,
    params: [
      {
        name: 'end',
        type: 'string',
        required: true,
        description: `The end date and time of the override, in ISO 8601 format.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty schedule ID.`,
      },
      {
        name: 'start',
        type: 'string',
        required: true,
        description: `The start date and time of the override, in ISO 8601 format.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user who should be on call during the override.`,
      },
    ],
  },
  {
    name: 'pagerduty_schedule_override_delete',
    description: `Delete an on-call override from a PagerDuty schedule.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty schedule ID.`,
      },
      {
        name: 'override_id',
        type: 'string',
        required: true,
        description: `The unique ID of the override to delete.`,
      },
    ],
  },
  {
    name: 'pagerduty_schedule_overrides_list',
    description: `List the on-call overrides for a PagerDuty schedule within a date range.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty schedule ID.`,
      },
      {
        name: 'since',
        type: 'string',
        required: true,
        description: `Start of the date range to list overrides for, in ISO 8601 format.`,
      },
      {
        name: 'until',
        type: 'string',
        required: true,
        description: `End of the date range to list overrides for, in ISO 8601 format.`,
      },
      {
        name: 'editable',
        type: 'boolean',
        required: false,
        description: `If true, only returns overrides that can still be edited.`,
      },
      {
        name: 'overflow',
        type: 'boolean',
        required: false,
        description: `If true, includes overrides that overflow outside the since/until range.`,
      },
    ],
  },
  {
    name: 'pagerduty_schedule_update',
    description: `Update an existing PagerDuty on-call schedule's name, description, or time zone.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the schedule to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the schedule.`,
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
    name: 'pagerduty_schedule_users_list',
    description: `List the users on call for a PagerDuty schedule within an optional date range.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty schedule ID.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Start of the date range in ISO 8601 format.`,
      },
      {
        name: 'until',
        type: 'string',
        required: false,
        description: `End of the date range in ISO 8601 format.`,
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
        name: 'escalation_policy_id',
        type: 'string',
        required: true,
        description: `The ID of the escalation policy to assign to this service.`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the service.` },
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
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the service to update.`,
      },
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
    name: 'pagerduty_tag_create',
    description: `Create a new tag, which can then be assigned to escalation policies, teams, or users to filter and group them.`,
    params: [
      {
        name: 'label',
        type: 'string',
        required: true,
        description: `The label of the tag. Maximum 191 characters.`,
      },
    ],
  },
  {
    name: 'pagerduty_tags_list',
    description: `List tags, which can be applied to escalation policies, teams, and users to filter and group them. Supports filtering by label text and standard offset pagination.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results to return per page.`,
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
        description: `Filters the result, showing only the tags whose label matches the query.`,
      },
      {
        name: 'total',
        type: 'boolean',
        required: false,
        description: `Set to true to populate the total field in the pagination response, at the cost of slower response times.`,
      },
    ],
  },
  {
    name: 'pagerduty_team_create',
    description: `Create a new team in PagerDuty. Teams allow grouping of users and services.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the team.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the team.`,
      },
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
    name: 'pagerduty_team_escalation_policy_add',
    description: `Associate an escalation policy with a PagerDuty team.`,
    params: [
      {
        name: 'escalation_policy_id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty escalation policy ID to add to the team.`,
      },
      { name: 'id', type: 'string', required: true, description: `The unique PagerDuty team ID.` },
    ],
  },
  {
    name: 'pagerduty_team_escalation_policy_remove',
    description: `Remove an escalation policy from a PagerDuty team.`,
    params: [
      {
        name: 'escalation_policy_id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty escalation policy ID to remove from the team.`,
      },
      { name: 'id', type: 'string', required: true, description: `The unique PagerDuty team ID.` },
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
    name: 'pagerduty_team_members_list',
    description: `List the members of a PagerDuty team.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The unique PagerDuty team ID.` },
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
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
    ],
  },
  {
    name: 'pagerduty_team_update',
    description: `Update an existing PagerDuty team's name or description.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the team to update.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the team.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The updated name of the team.`,
      },
    ],
  },
  {
    name: 'pagerduty_team_user_add',
    description: `Add a user to a PagerDuty team with a given role.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The unique PagerDuty team ID.` },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty user ID to add to the team.`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `The role of the user on the team.`,
      },
    ],
  },
  {
    name: 'pagerduty_team_user_remove',
    description: `Remove a user from a PagerDuty team.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The unique PagerDuty team ID.` },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty user ID to remove from the team.`,
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
      { name: 'email', type: 'string', required: true, description: `The user's email address.` },
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `The email address of the admin creating this user. Required by PagerDuty.`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the user.` },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `The schedule color for the user.`,
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
    name: 'pagerduty_user_me_get',
    description: `Get details of the PagerDuty user associated with the current authentication credentials.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional resources to include. Options: contact_methods, notification_rules, teams, subdomains, calendar_urls.`,
      },
    ],
  },
  {
    name: 'pagerduty_user_update',
    description: `Update an existing PagerDuty user's profile including name, email, role, time zone, and color.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the user to update.` },
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
    name: 'pagerduty_vendor_get',
    description: `Get details of a specific PagerDuty vendor (integration type) by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique PagerDuty vendor ID.`,
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
