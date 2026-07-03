import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'calendlymcp_availability_get_user_availability_schedule',
    description: `Use: Fetch details for one named availability schedule.
When: User asks about specific schedule rules or needs rules for a named schedule.
Needs: Schedule URI from \`availability-list_user_availability_schedules\`.
Do: Read \`rules\` array and \`timezone\` for display or to inform event-type updates.
Avoid: Writing to this schedule—use event-type-level update for changes.
Then: Report schedule details to user or use rules for availability queries.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Availability schedule URI. not a browsable link — never show to users.`,
      },
    ],
  },
  {
    name: 'calendlymcp_availability_list_user_availability_schedules',
    description: `Use: List all named availability schedules for the connected user.
When: User asks about availability schedules or you need to identify one by name.
Needs: User URI from \`users-get_current_user\`.
Do: Use returned \`uri\` to fetch schedule details or associate with an event type.
Avoid: Confusing user availability schedules with event-type-level schedules.
Then: Use schedule URI in \`availability-get_user_availability_schedule\` for details.`,
    params: [
      { name: 'user', type: 'string', required: true, description: `A URI reference to a user` },
    ],
  },
  {
    name: 'calendlymcp_availability_list_user_busy_times',
    description: `Use: List a user's busy time blocks within a date range.
When: User asks when they are busy or you need to avoid conflicts before suggesting slots.
Needs: User URI from \`users-get_current_user\` and ISO 8601 start/end range.
Do: Pass user URI and date range; use returned intervals to report conflicts.
Avoid: Substituting for \`event_types-list_event_type_available_times\`—they differ.
Then: Use busy intervals to inform scheduling recommendations.`,
    params: [
      {
        name: 'end_time',
        type: 'string',
        required: true,
        description: `End time of the requested availability range. Date must be in the future of start_time.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: true,
        description: `Start time of the requested availability range. Date cannot be in the past.`,
      },
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `The uri associated with the user`,
      },
    ],
  },
  {
    name: 'calendlymcp_event_types_create_event_type',
    description: `Use: Create a new event type on the connected account.
When: User explicitly asks to create a new event type.
Needs: Host user URI from \`users-get_current_user\`.
Do: Set name, duration, and host URI; omit optional fields unless user specified them.
Avoid: Creating duplicates—call \`event_types-list_event_types\` first to check for existing types.
Then: Confirm the new event type URI and share the scheduling URL.`,
    params: [
      {
        name: 'create_event_type_request',
        type: 'object',
        required: true,
        description: `CreateEventTypeRequest`,
      },
    ],
  },
  {
    name: 'calendlymcp_event_types_get_event_type',
    description: `Use: Fetch full details for one event type by URI.
When: Before updating an event type or confirming its current configuration.
Needs: Event type URI.
Do: Use the returned fields as the baseline for any patch payload.
Avoid: Constructing update payloads without reading current state first.
Then: Proceed with \`event_types-update_event_type\` using the returned data as base.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Event type URI. not a browsable link — never show to users.`,
      },
    ],
  },
  {
    name: 'calendlymcp_event_types_list_event_type_availability_schedule',
    description: `Use: Read the current availability schedule (rules) for an event type.
When: Before calling \`event_types-update_event_type_availability_schedule\`.
Needs: Event type URI.
Do: Retain the full \`rules\` array verbatim—it is the required base for updates.
Avoid: Calling the update endpoint without first reading the current rules.
Then: Pass the rules to \`event_types-update_event_type_availability_schedule\` with only the needed edits.`,
    params: [
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The URI associated with the event type`,
      },
    ],
  },
  {
    name: 'calendlymcp_event_types_list_event_type_available_times',
    description: `Use: List bookable time slots for an event type within a date range.
When: User wants slots, or to confirm availability before booking.
Needs: Event type URI and start/end date range (ISO 8601).
Do: Pass \`start_time\` verbatim to subsequent tool calls; do not rewrite UTC values.
Avoid: Stale data, or trusting a prior local label—re-check UTC \`start_time\` if questioned.
Then: Pass UTC \`start_time\` to \`meetings-create_invitee\`.`,
    params: [
      {
        name: 'end_time',
        type: 'string',
        required: true,
        description: `End time of the requested availability range. Date must be in the future of start_time.`,
      },
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The uri associated with the event type`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: true,
        description: `Start time of the requested availability range. Date cannot be in the past.`,
      },
    ],
  },
  {
    name: 'calendlymcp_event_types_list_event_types',
    description: `Use: List all event types for the connected user or org.
When: Start of any event-type task, or when selecting an event type by name.
Needs: User URI from \`users-get_current_user\`.
Do: Filter by current user URI unless user explicitly asks about a different host or org.
Avoid: Assuming a cached list is current—call fresh each session.
Then: Carry the selected \`uri\` into get, update, or availability tools.`,
    params: [
      {
        name: 'active',
        type: 'string',
        required: false,
        description: `Return only active event types if true, only inactive if false, or all event types if this parameter is omitted.`,
      },
      {
        name: 'admin_managed',
        type: 'string',
        required: false,
        description: `Return only admin managed event types if true, exclude admin managed event types if false, or include all event types if this parameter is omitted.`,
      },
      {
        name: 'count',
        type: 'string',
        required: false,
        description: `The number of rows to return`,
      },
      {
        name: 'organization',
        type: 'string',
        required: false,
        description: `View available personal, team, and organization event types associated with the organization's URI.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The token to pass to get the next or previous portion of the collection`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values.Supported fields are: name, position, created_at, updated_at. Sort direction is specified as: asc, desc.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `View available personal, team, and organization event types associated with the user's URI.`,
      },
      {
        name: 'user_availability_schedule',
        type: 'string',
        required: false,
        description: `Used in conjunction with \`user\` parameter, returns a filtered list of Event Types that use the given primary availability schedule.`,
      },
    ],
  },
  {
    name: 'calendlymcp_event_types_update_event_type',
    description: `Use: Update fields on an existing event type.
When: User asks to change name, duration, description, or other settings.
Needs: Event type URI from \`event_types-list_event_types\` or \`event_types-get_event_type\`.
Do: Read current state first with \`event_types-get_event_type\`; patch only requested fields.
Avoid: Sending fields not read from current state—partial writes may reset unset fields.
Then: Confirm changes with \`event_types-get_event_type\`.`,
    params: [
      {
        name: 'update_event_type_request',
        type: 'object',
        required: true,
        description: `UpdateEventTypeRequest`,
      },
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Event type URI. not a browsable link — never show to users.`,
      },
    ],
  },
  {
    name: 'calendlymcp_event_types_update_event_type_availability_schedule',
    description: `Use: Overwrite the availability schedule for an event type.
When: User requests schedule changes (hours, days, one-off date overrides) for an event type.
Needs: Event type URI and current rules from \`event_types-list_event_type_availability_schedule\`.
Do: Must copy existing rules verbatim, modify only requested entries, send full rules array with IANA timezone. wday rules need \`wday\` field; date rules need \`date\` field (YYYY-MM-DD); \`intervals\` is list of \`{from, to}\` in HH:MM 24h.
Avoid: Constructing rules from scratch or sending a partial array—this endpoint overwrites all rules.
Then: Re-read schedule with \`event_types-list_event_type_availability_schedule\` to confirm.`,
    params: [
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `Event Type uri in which to update the availability schedule`,
      },
      {
        name: 'update_event_type_availability_request',
        type: 'object',
        required: true,
        description: `UpdateEventTypeAvailabilityRequest`,
      },
    ],
  },
  {
    name: 'calendlymcp_locations_list_user_meeting_locations',
    description: `Use: List allowed meeting location kinds for a user.
When: Before creating bookings that need a \`location\` payload.
Needs: User URI from \`users-get_current_user\`.
Do: Read supported location \`kind\` values; choose one compatible with the event type.
Avoid: Submitting a location kind not configured for the host or event type.
Then: Use chosen kind in \`meetings-create_invitee\` location payload.`,
    params: [
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `The URI associated with the user`,
      },
    ],
  },
  {
    name: 'calendlymcp_meetings_cancel_event',
    description: `Use: Cancel a scheduled meeting on behalf of the connected host
When: User confirms they want to cancel a specific meeting.
Needs: Meeting URI from \`meetings-list_events\` or \`meetings-get_event\`.
Do: Pass meeting URI and optional cancellation reason.
Avoid: Canceling without confirmation; this notifies all invitees. For reschedule, surface \`reschedule_url\` instead.
Then: Inform user the meeting is canceled and optionally list remaining meetings.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Scheduled meeting URI. NOT the same as the invitee \`cancel_url\` (which is the public link you send to a human). not a browsable link — never show to users.`,
      },
      {
        name: 'create_scheduled_event_cancellation_request',
        type: 'string',
        required: false,
        description: `Optional cancellation reason.`,
      },
    ],
  },
  {
    name: 'calendlymcp_meetings_create_invitee',
    description: `Use: Book a meeting slot for an invitee on a Calendly event type.
When: User provides invitee name, email, and a confirmed available time slot.
Needs: Event type URI, \`start_time\` from \`event_types-list_event_type_available_times\`, invitee name and email. Include \`location\` if the event type has configured locations.
Do: Set invitee name/email as the person being booked; host is the connected user from \`users-get_current_user\`. Never swap host and invitee fields.
Avoid: Booking without confirming slot availability first, or omitting \`location\` when event type requires it.
Then: Confirm booking with invitee details and meeting URI.`,
    params: [
      {
        name: 'post_invitee_request',
        type: 'object',
        required: true,
        description: `PostInviteeRequest`,
      },
    ],
  },
  {
    name: 'calendlymcp_meetings_create_invitee_no_show',
    description: `Use: Mark an invitee as a no-show for a past meeting.
When: User reports an invitee did not attend.
Needs: Invitee URI from \`meetings-list_event_invitees\`.
Do: Pass invitee URI; operation is idempotent.
Avoid: Marking no-show before the meeting end time.
Then: Confirm no-show is recorded and carry forward the no-show URI.`,
    params: [
      {
        name: 'create_invitee_no_show_request',
        type: 'object',
        required: true,
        description: `CreateInviteeNoShowRequest`,
      },
    ],
  },
  {
    name: 'calendlymcp_meetings_delete_invitee_no_show',
    description: `Use: Remove a no-show mark from an invitee.
When: User asks to undo a no-show marking.
Needs: No-show URI from \`meetings-create_invitee_no_show\`.
Do: Pass no-show URI; operation is idempotent.
Avoid: Calling without confirming a no-show record exists.
Then: Confirm no-show has been removed.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Invitee no-show URI. not a browsable link — never show to users.`,
      },
    ],
  },
  {
    name: 'calendlymcp_meetings_get_event',
    description: `Use: Fetch details for a single scheduled meeting.
When: User asks about a specific meeting or before canceling/examining invitees.
Needs: Meeting URI from \`meetings-list_events\`.
Do: Use returned \`event_type\`, \`start_time\`, \`end_time\`, and \`location\` for display or next actions.
Avoid: Calling this without a known meeting URI. list meetings first.
Then: Use meeting URI in \`meetings-list_event_invitees\` or \`meetings-cancel_event\`.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Scheduled meeting URI. not a browsable link — never show to users.`,
      },
    ],
  },
  {
    name: 'calendlymcp_meetings_get_event_invitee',
    description: `Use: Fetch details for a single meeting invitee.
When: User asks about a specific attendee's booking details.
Needs: Meeting URI from \`meetings-list_events\` and Invitee URI from \`meetings-list_event_invitees\`.
Do: Use returned fields for display or no-show status. Reschedule: surface \`reschedule_url\`.
Avoid: Calling without known meeting and invitee URIs.
Then: Use invitee URI in no-show tools if needed.`,
    params: [
      {
        name: 'event_uri',
        type: 'string',
        required: true,
        description: `Scheduled meeting URI. not a browsable link — never show to users.`,
      },
      {
        name: 'invitee_uri',
        type: 'string',
        required: true,
        description: `Meeting invitee URI. not a browsable link — never show to users.`,
      },
    ],
  },
  {
    name: 'calendlymcp_meetings_get_invitee_no_show',
    description: `Use: Fetch the no-show record for a meeting invitee.
When: User asks whether a no-show was recorded for an invitee.
Needs: No-show URI from \`meetings-create_invitee_no_show\`.
Do: Check returned record for no-show status and timestamp.
Avoid: Calling if no no-show has been recorded—returns 404.
Then: Report no-show status to user.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Invitee no-show URI. not a browsable link — never show to users.`,
      },
    ],
  },
  {
    name: 'calendlymcp_meetings_list_event_invitees',
    description: `Use: List all invitees for a scheduled meeting.
When: User asks who is attending a meeting or you need invitee URIs.
Needs: Meeting URI from \`meetings-list_events\`.
Do: Use returned invitee \`uri\` for no-show marking or detail lookups.
Avoid: Calling without a meeting URI. list meetings first.
Then: Use invitee URI in \`meetings-get_event_invitee\` or \`meetings-create_invitee_no_show\`. For reschedule, surface each invitee's \`reschedule_url\`.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Scheduled meeting URI. not a browsable link — never show to users.`,
      },
      {
        name: 'count',
        type: 'string',
        required: false,
        description: `The number of rows to return`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Indicates if the results should be filtered by email address`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The token to pass to get the next or previous portion of the collection`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Order results by the **created_at** field and direction specified: ascending ("asc") or descending ("desc")`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Indicates if the invitee "canceled" or still "active"`,
      },
    ],
  },
  {
    name: 'calendlymcp_meetings_list_events',
    description: `Use: List scheduled meetings for user/org.
When: Upcoming/past meetings or to find meetings by date.
Needs: User/org URI via \`users-get_current_user\`.
Do: Filter status (active/canceled), date range; carry \`uri\`. Default enrich via \`meetings-list_event_invitees\`; skip for times/count-only.
Avoid: Fetching unfiltered when the user has a specific date in mind.
Then: Use meeting \`uri\` in \`meetings-get_event\` or \`meetings-cancel_event\` as needed.`,
    params: [
      {
        name: 'count',
        type: 'string',
        required: false,
        description: `The number of rows to return`,
      },
      {
        name: 'group',
        type: 'string',
        required: false,
        description: `Return events that are scheduled with the group associated with this URI`,
      },
      {
        name: 'invitee_email',
        type: 'string',
        required: false,
        description: `Return events that are scheduled with the invitee associated with this email address`,
      },
      {
        name: 'max_start_time',
        type: 'string',
        required: false,
        description: `Include events with start times prior to this time (sample time format: "2020-01-02T03:04:05.678123Z"). This time should use the UTC timezone.`,
      },
      {
        name: 'min_start_time',
        type: 'string',
        required: false,
        description: `Include events with start times after this time (sample time format: "2020-01-02T03:04:05.678123Z"). This time should use the UTC timezone.`,
      },
      {
        name: 'organization',
        type: 'string',
        required: false,
        description: `Return events that are scheduled with the organization associated with this URI`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The token to pass to get the next or previous portion of the collection`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values. Supported fields are: start_time. Sort direction is specified as: asc, desc.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Whether the scheduled event is \`active\` or \`canceled\``,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `Return events that are scheduled with the user associated with this URI`,
      },
    ],
  },
  {
    name: 'calendlymcp_organizations_create_organization_invitation',
    description: `Use: Invite a user to the organization by email.
When: User asks to add a new member.
Needs: Org URI and invitee email address.
Do: Check \`organizations-list_organization_invitations\` first to avoid duplicate invites.
Avoid: Calling without confirming no pending invite exists for this email.
Then: Confirm invitation sent and optionally show pending invitations.`,
    params: [
      {
        name: 'create_organization_invitation_request',
        type: 'object',
        required: true,
        description: `CreateOrganizationInvitationRequest`,
      },
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Organization URI. not a browsable link — never show to users.`,
      },
    ],
  },
  {
    name: 'calendlymcp_organizations_get_organization',
    description: `Use: Fetch details for the connected user's organization.
When: User asks about the org or you need the org URI for org-scoped list tools.
Needs: Org URI from \`users-get_current_user\` (\`resource.current_organization\`).
Do: Use returned \`uri\` for org-scoped event type or membership queries.
Avoid: Calling without an org URI.
Then: Use org URI in \`organizations-list_organization_memberships\`.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Organization URI. not a browsable link — never show to users.`,
      },
    ],
  },
  {
    name: 'calendlymcp_organizations_get_organization_membership',
    description: `Use: Fetch details for a single org membership.
When: You need role or status for a specific member.
Needs: Membership URI from \`organizations-list_organization_memberships\`.
Do: Check \`role\` and \`status\` fields for permissions context.
Avoid: Calling without a known membership URI.
Then: Use membership data to confirm before invite or removal actions.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Organization membership URI. not a browsable link — never show to users.`,
      },
    ],
  },
  {
    name: 'calendlymcp_organizations_list_organization_invitations',
    description: `Use: List pending invitations for the organization.
When: User asks to see pending invites or check if someone was already invited.
Needs: Org URI from \`users-get_current_user\`.
Do: Check returned list before sending a new invite to avoid duplicates.
Avoid: Sending a new invitation without checking for existing pending ones.
Then: Use invitation URI in \`organizations-revoke_organization_invitation\` if needed.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Organization URI. not a browsable link — never show to users.`,
      },
      {
        name: 'count',
        type: 'string',
        required: false,
        description: `The number of rows to return`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Indicates if the results should be filtered by email address`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The token to pass to get the next or previous portion of the collection`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Order results by the field name and direction specified (ascending or descending). Returns multiple sets of results in a comma-separated list.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Indicates if the results should be filtered by status  ("pending", "accepted", or "declined")`,
      },
    ],
  },
  {
    name: 'calendlymcp_organizations_list_organization_memberships',
    description: `Use: List all members of an organization.
When: User asks who is in the org or you need to find a member's user URI.
Needs: Org URI from \`users-get_current_user\`.
Do: Use returned \`user.uri\` for per-user event-type or availability queries.
Avoid: Fetching the full list when you only need the connected user—use \`users-get_current_user\` instead.
Then: Use member URI in user-scoped tools or \`organizations-get_organization_membership\`.`,
    params: [
      {
        name: 'count',
        type: 'string',
        required: false,
        description: `The number of rows to return`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Indicates if the results should be filtered by email address`,
      },
      {
        name: 'organization',
        type: 'string',
        required: false,
        description: `Indicates if the results should be filtered by organization`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The token to pass to get the next or previous portion of the collection`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Indicates if the results should be filtered by role`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `Indicates if the results should be filtered by user`,
      },
    ],
  },
  {
    name: 'calendlymcp_organizations_revoke_organization_invitation',
    description: `Use: Revoke a pending organization invitation.
When: User asks to cancel a pending invite.
Needs: Organization URI from \`users-get_current_user\` and Invitation URI from \`organizations-list_organization_invitations\`.
Do: Confirm with user before revoking; this cannot be undone.
Avoid: Revoking without confirming the invite is still pending.
Then: Confirm revocation and optionally refresh invitations list.`,
    params: [
      {
        name: 'org_uri',
        type: 'string',
        required: true,
        description: `Organization URI. not a browsable link — never show to users.`,
      },
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Pending invitation URI. not a browsable link — never show to users.`,
      },
    ],
  },
  {
    name: 'calendlymcp_routing_forms_get_routing_form',
    description: `Use: Fetch details for a single routing form.
When: User asks about a specific form or its questions.
Needs: Routing form URI from \`routing_forms-list_routing_forms\`.
Do: Use returned question IDs for submission filtering.
Avoid: Calling without a known form URI.
Then: Use form details to answer user questions or list submissions.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Routing form URI. not a browsable link — never show to users.`,
      },
    ],
  },
  {
    name: 'calendlymcp_routing_forms_get_routing_form_submission',
    description: `Use: Fetch details for a single routing form submission.
When: User asks about a specific submission or response.
Needs: Submission URI from \`routing_forms-list_routing_form_submissions\`.
Do: Read \`questions_and_answers\` for the submitted values.
Avoid: Calling without a known submission URI.
Then: Report submission details to user.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Routing form submission URI. not a browsable link — never show to users.`,
      },
    ],
  },
  {
    name: 'calendlymcp_routing_forms_list_routing_form_submissions',
    description: `Use: List submissions for a routing form.
When: User asks to see form responses or analyze routing data.
Needs: Routing form URI from \`routing_forms-list_routing_forms\`.
Do: Use pagination params for large result sets.
Avoid: Fetching all submissions without date/count filters on high-volume forms.
Then: Use submission URI in \`routing_forms-get_routing_form_submission\`.`,
    params: [
      {
        name: 'form',
        type: 'string',
        required: true,
        description: `View routing form submissions associated with the routing form's URI.`,
      },
      {
        name: 'count',
        type: 'string',
        required: false,
        description: `The number of rows to return`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The token to pass to get the next or previous portion of the collection`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values. Supported fields are: created_at. Sort direction is specified as: asc, desc.`,
      },
    ],
  },
  {
    name: 'calendlymcp_routing_forms_list_routing_forms',
    description: `Use: List routing forms for the org.
When: User asks about routing forms or you need to find a form by name.
Needs: Org URI from \`users-get_current_user\`.
Do: Use returned \`uri\` to fetch form details.
Avoid: Assuming form names without listing first.
Then: Use form URI in \`routing_forms-get_routing_form\`.`,
    params: [
      {
        name: 'organization',
        type: 'string',
        required: true,
        description: `View organization routing forms associated with the organization's URI.`,
      },
      {
        name: 'count',
        type: 'string',
        required: false,
        description: `The number of rows to return`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The token to pass to get the next or previous portion of the collection`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values. Supported fields are: created_at. Sort direction is specified as: asc, desc.`,
      },
    ],
  },
  {
    name: 'calendlymcp_scheduling_links_create_single_use_scheduling_link',
    description: `Use: Create a single-use scheduling link using the event type's settings unchanged.
When: User wants a one-time link with no overrides. For per-link customization (duration, scheduling window, location, availability), use \`shares-create_share\` instead.
Needs: Event type URI from \`event_types-list_event_types\`.
Do: Each call creates a new link; store the returned \`booking_url\`.
Avoid: Using when any override is requested — this endpoint cannot customize the link. Don't create more links than needed; each call creates a distinct non-reusable link.
Then: Share \`booking_url\` with the intended invitee.`,
    params: [
      {
        name: 'create_scheduling_link_request',
        type: 'object',
        required: true,
        description: `CreateSchedulingLinkRequest`,
      },
    ],
  },
  {
    name: 'calendlymcp_shares_create_share',
    description: `Use: Create a single-use share link for a one-on-one event type with per-link overrides
When: User wants a single-use link with any customization (duration, scheduling window, location, or availability).
Needs: Event type URI from \`event_types-list_event_types\`.
Do: Set only fields to override; omitted fields inherit from event type.
Avoid: Group event types (one-on-one only). This overrides event-type fields, not invitee prefill values.
Then: Share the returned \`booking_url\` with the recipient.`,
    params: [
      {
        name: 'create_share_request',
        type: 'object',
        required: true,
        description: `CreateShareRequest`,
      },
    ],
  },
  {
    name: 'calendlymcp_users_get_current_user',
    description: `Use: Resolve the connected host account and canonical user URI.
When: Start any scheduling, booking, event-type, or availability workflow.
Needs: No inputs.
Do: Call once and keep \`resource.uri\`, \`timezone\`, and \`scheduling_url\` for downstream calls.
Avoid: Skipping this and guessing host identity.
Then: Use \`resource.uri\` in list/get tools unless the user explicitly names another host.`,
    params: [],
  },
  {
    name: 'calendlymcp_users_get_user',
    description: `Use: Fetch profile for a specific user by URI.
When: User asks about another person's account or you hold a user URI from org/membership data.
Needs: User URI.
Do: Pass the user URI from org/membership data; do not use this to look up the connected user.
Avoid: Calling this without a known URI - use \`users-get_current_user\` for the connected user.
Then: Use returned \`uri\` and \`timezone\` for event-type or availability lookups scoped to that user.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `User URI. not a browsable link — never show to users.`,
      },
    ],
  },
]
