import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'calendly_activity_log_list',
    description: `Returns a list of activity log entries for a Calendly organization. Requires Enterprise plan.`,
    params: [
      {
        name: 'organization',
        type: 'string',
        required: true,
        description: `Organization URI, e.g. https://api.calendly.com/organizations/{uuid}.`,
      },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Filter by action type (e.g. user.created, event_type.updated).`,
      },
      { name: 'actor', type: 'string', required: false, description: `Filter by actor user URI.` },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'max_occurred_at',
        type: 'string',
        required: false,
        description: `Filter entries occurring before this time (ISO 8601).`,
      },
      {
        name: 'min_occurred_at',
        type: 'string',
        required: false,
        description: `Filter entries occurring at or after this time (ISO 8601).`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for fetching the next page of results.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field and direction, e.g. occurred_at:asc or occurred_at:desc.`,
      },
    ],
  },
  {
    name: 'calendly_current_user_get',
    description: `Returns the profile of the currently authenticated Calendly user.`,
    params: [],
  },
  {
    name: 'calendly_data_compliance_events_delete',
    description: `Deletes all Calendly event data within the specified time range for compliance purposes. This is a destructive operation.`,
    params: [
      {
        name: 'end_time',
        type: 'string',
        required: true,
        description: `End of the time range for event data deletion in ISO 8601 format.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: true,
        description: `Start of the time range for event data deletion in ISO 8601 format.`,
      },
    ],
  },
  {
    name: 'calendly_data_compliance_invitees_delete',
    description: `Deletes all Calendly invitee data for the specified email addresses for compliance purposes. This is a destructive operation.`,
    params: [
      {
        name: 'emails',
        type: 'array',
        required: true,
        description: `Array of invitee email addresses whose data should be deleted.`,
      },
    ],
  },
  {
    name: 'calendly_event_invitee_get',
    description: `Returns the details of a specific invitee for a scheduled Calendly event.`,
    params: [
      {
        name: 'event_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the scheduled event.`,
      },
      {
        name: 'invitee_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the invitee.`,
      },
    ],
  },
  {
    name: 'calendly_event_invitees_list',
    description: `Returns a list of invitees for a specific scheduled Calendly event.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the scheduled event.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Filter invitees by email address.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for fetching the next page of results.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter invitees by status: active or canceled.`,
      },
    ],
  },
  {
    name: 'calendly_event_type_availability_schedules_list',
    description: `Returns a list of availability schedules for the specified Calendly event type.`,
    params: [
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The URI of the event type, e.g. https://api.calendly.com/event_types/xxx.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `The URI of the user to filter schedules by, e.g. https://api.calendly.com/users/xxx.`,
      },
    ],
  },
  {
    name: 'calendly_event_type_availability_schedules_update',
    description: `Updates the availability schedules (rules) for the specified Calendly event type.`,
    params: [
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The URI of the event type whose availability schedules to update, e.g. https://api.calendly.com/event_types/xxx.`,
      },
      {
        name: 'rules',
        type: 'array',
        required: true,
        description: `Array of availability rule objects. Each rule has type, intervals, and wday fields.`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `Timezone for the availability rules (e.g. America/New_York).`,
      },
    ],
  },
  {
    name: 'calendly_event_type_available_times_list',
    description: `Returns available scheduling times for a specific event type within a given date range.`,
    params: [
      {
        name: 'end_time',
        type: 'string',
        required: true,
        description: `End of the availability window in ISO 8601 format.`,
      },
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `Full URI of the event type, e.g. https://api.calendly.com/event_types/{uuid}.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: true,
        description: `Start of the availability window in ISO 8601 format.`,
      },
    ],
  },
  {
    name: 'calendly_event_type_create',
    description: `Creates a new event type in a Calendly organization for a specified host.`,
    params: [
      {
        name: 'duration',
        type: 'integer',
        required: true,
        description: `Duration of the event in minutes.`,
      },
      {
        name: 'host',
        type: 'string',
        required: true,
        description: `The URI of the user who will host this event type, e.g. https://api.calendly.com/users/xxx.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the event type.` },
      {
        name: 'organization',
        type: 'string',
        required: true,
        description: `The URI of the organization this event type belongs to, e.g. https://api.calendly.com/organizations/xxx.`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Hex color code for the event type, e.g. '#FF5733'.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description of the event type.`,
      },
    ],
  },
  {
    name: 'calendly_event_type_get',
    description: `Returns the details of a specific Calendly event type by its UUID.`,
    params: [
      { name: 'uuid', type: 'string', required: true, description: `The UUID of the event type.` },
    ],
  },
  {
    name: 'calendly_event_type_memberships_list',
    description: `Returns a list of memberships (hosts) associated with the specified Calendly event type.`,
    params: [
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The URI of the event type, e.g. https://api.calendly.com/event_types/xxx.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for paginating to the next set of results.`,
      },
    ],
  },
  {
    name: 'calendly_event_type_update',
    description: `Updates an existing Calendly event type. Only the fields provided will be updated.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the event type to update.`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Hex color code for the event type, e.g. '#FF5733'.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description for the event type.`,
      },
      {
        name: 'duration',
        type: 'integer',
        required: false,
        description: `Updated duration of the event in minutes.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name of the event type.`,
      },
    ],
  },
  {
    name: 'calendly_event_types_list',
    description: `Returns a list of event types for a user or organization. Provide either user or organization URI.`,
    params: [
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `If true, only return active event types.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return per page (max 100).`,
      },
      {
        name: 'organization',
        type: 'string',
        required: false,
        description: `Filter by organization URI, e.g. https://api.calendly.com/organizations/{uuid}.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for fetching the next page of results.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `Filter by user URI, e.g. https://api.calendly.com/users/{uuid}.`,
      },
    ],
  },
  {
    name: 'calendly_group_get',
    description: `Returns a single Calendly group record by UUID.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the group to retrieve.`,
      },
    ],
  },
  {
    name: 'calendly_group_relationship_get',
    description: `Returns a single Calendly group relationship record by UUID.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the group relationship to retrieve.`,
      },
    ],
  },
  {
    name: 'calendly_group_relationships_list',
    description: `Returns a list of group relationships in the specified Calendly organization.`,
    params: [
      {
        name: 'organization',
        type: 'string',
        required: true,
        description: `The URI of the organization whose group relationships to list, e.g. https://api.calendly.com/organizations/xxx.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for paginating to the next set of results.`,
      },
    ],
  },
  {
    name: 'calendly_groups_list',
    description: `Returns a list of groups in the specified Calendly organization.`,
    params: [
      {
        name: 'organization',
        type: 'string',
        required: true,
        description: `The URI of the organization whose groups to list, e.g. https://api.calendly.com/organizations/xxx.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return per page. Default is 20.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for paginating to the next set of results.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order for the results, e.g. 'created_at:asc' or 'created_at:desc'.`,
      },
    ],
  },
  {
    name: 'calendly_invitee_create',
    description: `Creates a new invitee for a scheduled Calendly event.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address of the invitee.`,
      },
      {
        name: 'event',
        type: 'string',
        required: true,
        description: `The URI of the scheduled event to add this invitee to, e.g. https://api.calendly.com/scheduled_events/xxx.`,
      },
      { name: 'name', type: 'string', required: true, description: `Full name of the invitee.` },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `IANA timezone string for the invitee, e.g. 'America/New_York'.`,
      },
    ],
  },
  {
    name: 'calendly_invitee_no_show_create',
    description: `Marks a specific invitee as a no-show for a scheduled Calendly event.`,
    params: [
      {
        name: 'invitee',
        type: 'string',
        required: true,
        description: `The full URI of the invitee, e.g. https://api.calendly.com/scheduled_events/{event_uuid}/invitees/{invitee_uuid}.`,
      },
    ],
  },
  {
    name: 'calendly_invitee_no_show_delete',
    description: `Removes the no-show mark from an invitee on a scheduled Calendly event.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the invitee no-show record.`,
      },
    ],
  },
  {
    name: 'calendly_invitee_no_show_get',
    description: `Returns a specific invitee no-show record by UUID.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the invitee no-show record.`,
      },
    ],
  },
  {
    name: 'calendly_locations_list',
    description: `Returns a list of meeting locations available in the specified Calendly organization or for a specific user.`,
    params: [
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `The URI of the user to filter locations by, e.g. https://api.calendly.com/users/xxx.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'organization',
        type: 'string',
        required: false,
        description: `The URI of the organization to filter locations by, e.g. https://api.calendly.com/organizations/xxx.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for paginating to the next set of results.`,
      },
    ],
  },
  {
    name: 'calendly_one_off_event_type_create',
    description: `Creates a one-off event type in Calendly with a specific date, host, and optional co-hosts.`,
    params: [
      {
        name: 'date_setting',
        type: 'object',
        required: true,
        description: `Object defining the date setting for the one-off event. Must include 'type' (e.g. 'date_range') and 'start_date'/'end_date' or 'date'.`,
      },
      {
        name: 'duration',
        type: 'integer',
        required: true,
        description: `Duration of the event in minutes.`,
      },
      {
        name: 'host',
        type: 'string',
        required: true,
        description: `The URI of the user who will host this event type, e.g. https://api.calendly.com/users/xxx.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the one-off event type.`,
      },
      {
        name: 'co_hosts',
        type: 'array',
        required: false,
        description: `Array of user URIs for co-hosts, e.g. ['https://api.calendly.com/users/xxx'].`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the one-off event type.`,
      },
      {
        name: 'location',
        type: 'object',
        required: false,
        description: `Optional location object, e.g. {"kind": "physical", "location": "123 Main St"}.`,
      },
    ],
  },
  {
    name: 'calendly_organization_get',
    description: `Returns the details of a specific Calendly organization by its UUID.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the organization.`,
      },
    ],
  },
  {
    name: 'calendly_organization_invitation_create',
    description: `Sends an invitation for a user to join a Calendly organization.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address of the user to invite.`,
      },
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the organization.`,
      },
    ],
  },
  {
    name: 'calendly_organization_invitation_get',
    description: `Returns the details of a specific invitation sent to join a Calendly organization.`,
    params: [
      {
        name: 'org_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the organization that sent the invitation.`,
      },
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the invitation to retrieve.`,
      },
    ],
  },
  {
    name: 'calendly_organization_invitation_revoke',
    description: `Revokes a pending invitation to a Calendly organization.`,
    params: [
      {
        name: 'invitation_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the invitation to revoke.`,
      },
      {
        name: 'org_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the organization.`,
      },
    ],
  },
  {
    name: 'calendly_organization_invitations_list',
    description: `Returns a list of pending invitations for a Calendly organization.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the organization.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Filter by invitee email address.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for fetching the next page of results.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by invitation status: pending, accepted, or declined.`,
      },
    ],
  },
  {
    name: 'calendly_organization_membership_delete',
    description: `Removes a user from a Calendly organization by deleting their membership.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the organization membership to remove.`,
      },
    ],
  },
  {
    name: 'calendly_organization_membership_get',
    description: `Returns details of a specific organization membership by UUID.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the organization membership.`,
      },
    ],
  },
  {
    name: 'calendly_organization_memberships_list',
    description: `Returns a list of organization memberships. Filter by organization URI or user URI.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Filter by member email address.`,
      },
      {
        name: 'organization',
        type: 'string',
        required: false,
        description: `Filter by organization URI, e.g. https://api.calendly.com/organizations/{uuid}.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for fetching the next page of results.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `Filter by user URI, e.g. https://api.calendly.com/users/{uuid}.`,
      },
    ],
  },
  {
    name: 'calendly_outgoing_communications_list',
    description: `Returns a list of outgoing communications (emails and notifications) for the specified Calendly organization.`,
    params: [
      {
        name: 'organization',
        type: 'string',
        required: true,
        description: `The URI of the organization whose outgoing communications to list, e.g. https://api.calendly.com/organizations/xxx.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for paginating to the next set of results.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order for the results, e.g. 'created_at:asc' or 'created_at:desc'.`,
      },
    ],
  },
  {
    name: 'calendly_routing_form_get',
    description: `Returns the details of a specific Calendly routing form by its UUID.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the routing form.`,
      },
    ],
  },
  {
    name: 'calendly_routing_form_submission_get',
    description: `Returns the details of a specific routing form submission by its UUID.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the routing form submission.`,
      },
    ],
  },
  {
    name: 'calendly_routing_form_submission_get_by_uuid',
    description: `Returns a single routing form submission by UUID.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the routing form submission to retrieve.`,
      },
    ],
  },
  {
    name: 'calendly_routing_form_submissions_list',
    description: `Returns a list of all routing form submissions across the specified Calendly organization.`,
    params: [
      {
        name: 'form',
        type: 'string',
        required: true,
        description: `The URI of the routing form to list submissions for.`,
      },
      { name: 'count', type: 'integer', required: false, description: `Number of results.` },
      { name: 'page_token', type: 'string', required: false, description: `Token for next page.` },
    ],
  },
  {
    name: 'calendly_routing_forms_list',
    description: `Returns a list of routing forms for a Calendly organization.`,
    params: [
      {
        name: 'organization',
        type: 'string',
        required: true,
        description: `Organization URI, e.g. https://api.calendly.com/organizations/{uuid}.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for fetching the next page of results.`,
      },
    ],
  },
  {
    name: 'calendly_sample_webhook_data_get',
    description: `Returns a sample webhook payload for the specified event type, useful for testing webhook integrations.`,
    params: [
      {
        name: 'event',
        type: 'string',
        required: true,
        description: `The webhook event type to get sample data for, e.g. 'invitee.created'.`,
      },
      {
        name: 'organization',
        type: 'string',
        required: true,
        description: `The URI of the organization, e.g. https://api.calendly.com/organizations/xxx.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope of the webhook, either 'organization' or 'user'.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `The URI of the user, required when scope is 'user', e.g. https://api.calendly.com/users/xxx.`,
      },
    ],
  },
  {
    name: 'calendly_scheduled_event_cancel',
    description: `Cancels a scheduled Calendly event. Optionally includes a reason for cancellation.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the scheduled event to cancel.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Optional reason for the cancellation.`,
      },
    ],
  },
  {
    name: 'calendly_scheduled_event_get',
    description: `Returns the details of a specific scheduled event by its UUID.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the scheduled event.`,
      },
    ],
  },
  {
    name: 'calendly_scheduled_events_list',
    description: `Returns a list of scheduled events for a user or organization, with optional time range and status filters.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'max_start_time',
        type: 'string',
        required: false,
        description: `Filter events starting before this time (ISO 8601).`,
      },
      {
        name: 'min_start_time',
        type: 'string',
        required: false,
        description: `Filter events starting at or after this time (ISO 8601).`,
      },
      {
        name: 'organization',
        type: 'string',
        required: false,
        description: `Filter by organization URI, e.g. https://api.calendly.com/organizations/{uuid}.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for fetching the next page of results.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field and direction, e.g. start_time:asc or start_time:desc.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by event status: active or canceled.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `Filter by user URI, e.g. https://api.calendly.com/users/{uuid}.`,
      },
    ],
  },
  {
    name: 'calendly_scheduling_link_create',
    description: `Creates a single-use or limited-use scheduling link for a specified Calendly event type.`,
    params: [
      {
        name: 'max_event_count',
        type: 'integer',
        required: true,
        description: `Maximum number of events that can be booked using this scheduling link.`,
      },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: `The URI of the event type that owns this scheduling link, e.g. https://api.calendly.com/event_types/xxx.`,
      },
      {
        name: 'owner_type',
        type: 'string',
        required: true,
        description: `The type of owner for the scheduling link. Use 'EventType'.`,
      },
    ],
  },
  {
    name: 'calendly_share_create',
    description: `Creates a shareable scheduling page for a Calendly event type with optional customizations like duration, date range, and availability rules.`,
    params: [
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The URI of the event type to create a share for, e.g. https://api.calendly.com/event_types/xxx.`,
      },
      {
        name: 'availability_rule',
        type: 'object',
        required: false,
        description: `Optional availability rule object to override default scheduling availability.`,
      },
      {
        name: 'duration',
        type: 'integer',
        required: false,
        description: `Override event duration in minutes for this share.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `The end date (YYYY-MM-DD) after which the share will no longer accept bookings.`,
      },
      {
        name: 'hide_location',
        type: 'boolean',
        required: false,
        description: `Whether to hide the event location from the scheduling page.`,
      },
      {
        name: 'max_booking_time',
        type: 'integer',
        required: false,
        description: `Maximum number of days in the future that can be booked via this share.`,
      },
      { name: 'name', type: 'string', required: false, description: `Custom name for this share.` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `The start date (YYYY-MM-DD) from which the share will accept bookings.`,
      },
    ],
  },
  {
    name: 'calendly_user_availability_schedule_get',
    description: `Returns a single availability schedule for a Calendly user by UUID.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the availability schedule to retrieve.`,
      },
    ],
  },
  {
    name: 'calendly_user_availability_schedules_list',
    description: `Returns a list of availability schedules for the specified Calendly user.`,
    params: [
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `The URI of the user whose availability schedules to list, e.g. https://api.calendly.com/users/xxx.`,
      },
    ],
  },
  {
    name: 'calendly_user_busy_times_list',
    description: `Returns a list of busy time blocks for a Calendly user within the specified time range.`,
    params: [
      {
        name: 'end_time',
        type: 'string',
        required: true,
        description: `End of the time range in ISO 8601 format.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: true,
        description: `Start of the time range in ISO 8601 format.`,
      },
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `The URI of the user whose busy times to list, e.g. https://api.calendly.com/users/xxx.`,
      },
    ],
  },
  {
    name: 'calendly_user_get',
    description: `Returns the profile of a specific Calendly user by their UUID.`,
    params: [
      { name: 'uuid', type: 'string', required: true, description: `The UUID of the user.` },
    ],
  },
  {
    name: 'calendly_webhook_subscription_create',
    description: `Creates a new webhook subscription to receive Calendly event notifications at a callback URL.`,
    params: [
      {
        name: 'events',
        type: 'string',
        required: true,
        description: `JSON array of event names to subscribe to, e.g. ["invitee.created","invitee.canceled"].`,
      },
      {
        name: 'organization',
        type: 'string',
        required: true,
        description: `Organization URI to scope the subscription.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `Scope of the webhook: user or organization.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The HTTPS callback URL that will receive webhook payloads.`,
      },
      {
        name: 'signing_key',
        type: 'string',
        required: false,
        description: `Optional signing key used to sign webhook payloads for verification.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `User URI if scope is user-level.`,
      },
    ],
  },
  {
    name: 'calendly_webhook_subscription_delete',
    description: `Deletes a Calendly webhook subscription, stopping future event notifications.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the webhook subscription to delete.`,
      },
    ],
  },
  {
    name: 'calendly_webhook_subscription_get',
    description: `Returns the details of a specific Calendly webhook subscription.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The UUID of the webhook subscription.`,
      },
    ],
  },
  {
    name: 'calendly_webhook_subscriptions_list',
    description: `Returns a list of webhook subscriptions for a user or organization.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'organization',
        type: 'string',
        required: false,
        description: `Filter by organization URI, e.g. https://api.calendly.com/organizations/{uuid}.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for fetching the next page of results.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Filter by webhook scope: user or organization.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `Filter by user URI, e.g. https://api.calendly.com/users/{uuid}.`,
      },
    ],
  },
]
