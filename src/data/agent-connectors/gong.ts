import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'gong_call_get',
    description: `Retrieve basic data for a single Gong call by its ID: title, timing, direction, parties, and system/media info. For richer data (trackers, topics, CRM associations, interaction stats) with filtering across many calls at once, use Get Calls (Extensive) instead.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Gong's unique numeric identifier for the call (up to 20 digits).`,
      },
    ],
  },
  {
    name: 'gong_call_outcomes_list',
    description: `List all call outcome options configured in the Gong account. Returns outcome definitions such as name and ID that can be applied to calls to indicate the result of a conversation.`,
    params: [],
  },
  {
    name: 'gong_call_users_access_add',
    description: `Grant individual Gong users access to specific calls, beyond whatever access they already have via sharing, permission profiles, or team membership. Accepts a batch of call-to-users mappings in a single request.`,
    params: [
      {
        name: 'call_access_list',
        type: 'array',
        required: true,
        description: `Array of objects, each specifying a call ID and the list of user IDs to grant access to that call. Each item shape: {"call_id": "...", "user_ids": ["..."]}.`,
      },
    ],
  },
  {
    name: 'gong_call_users_access_get',
    description: `Retrieve the users who have been given individual access to specific calls through the Gong API (via Add Call Users Access). Does not report access granted through other means such as sharing, permission profiles, or team membership. Note: Gong implements this as a POST with a filter body even though it is a read-only lookup.`,
    params: [
      {
        name: 'call_ids',
        type: 'array',
        required: true,
        description: `Array of Gong's unique numeric call IDs to look up access for.`,
      },
    ],
  },
  {
    name: 'gong_calls_ai_content_get',
    description: `Retrieve Gong's AI-generated content for one or more calls, such as the call brief, key points, highlights, and outline. This is a separate, more focused endpoint than Get Calls (Extensive) for callers that only need the AI-generated summary content rather than full call metadata, parties, and interaction stats.`,
    params: [
      {
        name: 'call_ids',
        type: 'array',
        required: true,
        description: `Array of Gong call IDs to retrieve AI-generated content for.`,
      },
      {
        name: 'content_selector',
        type: 'array',
        required: false,
        description: `Which AI-generated content types to include. Valid values: brief, outline, highlights, keyPoints, callSummary. Leave empty to return all available types.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous API response for paginating to the next page of results.`,
      },
    ],
  },
  {
    name: 'gong_calls_create',
    description: `Create (register) a new call in Gong. This adds a call record with metadata such as title, scheduled start time, participants, and direction. After creation, Gong returns a media upload URL that can be used to upload the call recording separately.`,
    params: [
      {
        name: 'actual_start',
        type: 'string',
        required: true,
        description: `The actual date and time the call started (ISO 8601 format, e.g., 2024-06-15T14:00:00Z).`,
      },
      {
        name: 'call_provider_code',
        type: 'string',
        required: false,
        description: `The telephony or conferencing system used (e.g., 'zoom', 'webex', 'ringcentral').`,
      },
      {
        name: 'client_unique_id',
        type: 'string',
        required: false,
        description: `A unique identifier for this call in your system, used to prevent duplicate uploads.`,
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Direction of the call: 'Inbound' or 'Outbound'.`,
      },
      {
        name: 'disposition',
        type: 'string',
        required: false,
        description: `Outcome of the call (e.g., 'Connected', 'No Answer', 'Left Voicemail').`,
      },
      {
        name: 'duration',
        type: 'integer',
        required: false,
        description: `Duration of the call in seconds.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Primary language spoken on the call as a BCP-47 language tag (e.g., 'en-US', 'es-ES').`,
      },
      {
        name: 'parties',
        type: 'array',
        required: false,
        description: `Array of participant objects. Each participant should include emailAddress, name, speakerId, and userId fields.`,
      },
      {
        name: 'purpose',
        type: 'string',
        required: false,
        description: `Purpose or topic of the call (e.g., 'Discovery', 'Demo', 'QBR').`,
      },
      {
        name: 'scheduled_end',
        type: 'string',
        required: false,
        description: `Scheduled end time for the call (ISO 8601 format).`,
      },
      {
        name: 'scheduled_start',
        type: 'string',
        required: false,
        description: `Scheduled start time for the call (ISO 8601 format).`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title or subject of the call.`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Workspace ID to associate this call with a specific Gong workspace.`,
      },
    ],
  },
  {
    name: 'gong_calls_get',
    description: `Retrieve extensive details for one or more Gong calls by their IDs. Returns enriched call data including participants, interaction stats, topics discussed, and CRM associations.`,
    params: [
      {
        name: 'call_ids',
        type: 'array',
        required: true,
        description: `Array of Gong call IDs to retrieve extensive details for.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous API response for paginating to the next page of results.`,
      },
      {
        name: 'from_date_time',
        type: 'string',
        required: false,
        description: `Start of the date-time range to filter calls (ISO 8601 format).`,
      },
      {
        name: 'to_date_time',
        type: 'string',
        required: false,
        description: `End of the date-time range to filter calls (ISO 8601 format).`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Optional workspace ID to restrict the results to a specific Gong workspace.`,
      },
    ],
  },
  {
    name: 'gong_calls_list',
    description: `List Gong calls with optional filters for date range, workspace, and specific call IDs. Returns a page of calls with metadata such as title, duration, participants, and direction.`,
    params: [
      {
        name: 'call_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of specific call IDs to retrieve.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous API response for paginating to the next page of results.`,
      },
      {
        name: 'from_date_time',
        type: 'string',
        required: false,
        description: `Start of the date-time range for filtering calls (ISO 8601 format, e.g., 2024-01-01T00:00:00Z).`,
      },
      {
        name: 'to_date_time',
        type: 'string',
        required: false,
        description: `End of the date-time range for filtering calls (ISO 8601 format, e.g., 2024-12-31T23:59:59Z).`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Optional workspace ID to restrict results to a specific Gong workspace.`,
      },
    ],
  },
  {
    name: 'gong_calls_transcript_get',
    description: `Retrieve transcripts for one or more Gong calls by their IDs. Returns speaker-attributed, sentence-level transcript segments with timing offsets for each call.`,
    params: [
      {
        name: 'call_ids',
        type: 'array',
        required: true,
        description: `Array of Gong call IDs whose transcripts to retrieve.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous API response for paginating to the next page of results.`,
      },
      {
        name: 'from_date_time',
        type: 'string',
        required: false,
        description: `Start of the date-time range to filter calls (ISO 8601 format).`,
      },
      {
        name: 'to_date_time',
        type: 'string',
        required: false,
        description: `End of the date-time range to filter calls (ISO 8601 format).`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Optional workspace ID to restrict the results to a specific Gong workspace.`,
      },
    ],
  },
  {
    name: 'gong_coaching_get',
    description: `Get coaching data from Gong, including coaching sessions and feedback provided by managers to their team members. Supports cursor-based pagination for large result sets.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous response for paginating to the next page of results.`,
      },
    ],
  },
  {
    name: 'gong_crm_integrations_list',
    description: `Retrieve the Generic CRM integration currently registered with Gong (via Register CRM Integration). Gong supports only one active Generic CRM integration at a time; this returns its integrationId and details, or an empty result if none is registered.`,
    params: [],
  },
  {
    name: 'gong_crm_objects_list',
    description: `Fetch specific CRM objects (accounts, contacts, deals, or leads) that were uploaded to Gong's Generic CRM integration, by their CRM IDs. Intended for development-phase verification that objects were uploaded and processed correctly in Gong — returns a map keyed by CRM ID, with null for any ID not found. Limited to 100 object IDs per request. Note: this call sends the requested object IDs as a JSON array in the request body even though the HTTP method is GET, matching Gong's documented API contract for this endpoint.`,
    params: [
      {
        name: 'integration_id',
        type: 'integer',
        required: true,
        description: `The integrationId generated when the CRM integration was registered (see List CRM Integrations).`,
      },
      {
        name: 'object_ids',
        type: 'array',
        required: true,
        description: `Array of CRM object IDs to fetch, up to 100 per request.`,
      },
      {
        name: 'object_type',
        type: 'string',
        required: true,
        description: `The type of CRM object to retrieve.`,
      },
    ],
  },
  {
    name: 'gong_crm_schema_fields_list',
    description: `Retrieve the object schema fields (name, label, type, picklist values) configured for a CRM object type in Gong's Generic CRM integration. Use this to see what fields were registered via Upload Object Schema before uploading or reading CRM object data.`,
    params: [
      {
        name: 'integration_id',
        type: 'integer',
        required: true,
        description: `The integrationId generated when the CRM integration was registered (see List CRM Integrations).`,
      },
      {
        name: 'object_type',
        type: 'string',
        required: true,
        description: `The CRM object type to retrieve schema fields for (case-sensitive).`,
      },
    ],
  },
  {
    name: 'gong_data_privacy_email_erase',
    description: `Permanently delete from Gong any calls or email messages that reference the given email address, plus any leads or contacts with that email address. Deletion is asynchronous and may take several hours to complete. Gong protects against deleting an abnormal number of objects — if the deletion fails, contact help@gong.io. Delete the data from your CRM and email system first, or it may be re-imported into Gong. Use Look Up Data for Email Address first to preview what will be removed.`,
    params: [
      {
        name: 'email_address',
        type: 'string',
        required: true,
        description: `The email address whose referencing calls, email messages, leads, and contacts should be permanently deleted.`,
      },
    ],
  },
  {
    name: 'gong_data_privacy_email_lookup',
    description: `Show the elements in the Gong system that reference a given email address: calls and email messages that mention it, and any leads or contacts with that email address. Use this before Erase Data for Email Address to see what would be deleted.`,
    params: [
      {
        name: 'email_address',
        type: 'string',
        required: true,
        description: `The email address to search for across calls, email messages, leads, and contacts.`,
      },
    ],
  },
  {
    name: 'gong_engage_digital_interactions_create',
    description: `Add a digital interaction event (such as a web visit, content engagement, or other digital touchpoint) to a Gong Engage prospect's activity timeline.`,
    params: [
      {
        name: 'event_name',
        type: 'string',
        required: true,
        description: `Name of the digital interaction event (e.g., 'Visited Pricing Page', 'Downloaded Whitepaper').`,
      },
      {
        name: 'event_timestamp',
        type: 'string',
        required: true,
        description: `Timestamp when the digital interaction occurred (ISO 8601 format).`,
      },
      {
        name: 'crm_account_id',
        type: 'string',
        required: false,
        description: `The CRM account ID associated with this interaction.`,
      },
      {
        name: 'crm_contact_id',
        type: 'string',
        required: false,
        description: `The CRM contact ID associated with this interaction.`,
      },
      {
        name: 'prospect_email',
        type: 'string',
        required: false,
        description: `Email address of the prospect who performed this digital interaction.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `URL associated with the digital interaction (e.g., the page visited or content accessed).`,
      },
    ],
  },
  {
    name: 'gong_engage_email_activity_report',
    description: `Report email engagement events (opens, clicks, bounces, unsubscribes) to Gong Engage so they appear in the activity timeline for a prospect.`,
    params: [
      {
        name: 'email_id',
        type: 'string',
        required: true,
        description: `External identifier for the email message that was engaged with.`,
      },
      {
        name: 'event_timestamp',
        type: 'string',
        required: true,
        description: `Timestamp when the engagement event occurred (ISO 8601 format).`,
      },
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The type of email engagement event to report.`,
      },
      {
        name: 'prospect_email',
        type: 'string',
        required: true,
        description: `Email address of the prospect who triggered this engagement event.`,
      },
      {
        name: 'link_url',
        type: 'string',
        required: false,
        description: `For EMAIL_LINK_CLICKED events, the URL of the link that was clicked.`,
      },
    ],
  },
  {
    name: 'gong_engage_flow_content_override',
    description: `Override field placeholder values in a Gong Engage flow for specific prospects, allowing personalized content without modifying the base flow template.`,
    params: [
      {
        name: 'field_values',
        type: 'object',
        required: true,
        description: `Key-value pairs of field placeholder names and their override values to substitute into the flow content.`,
      },
      {
        name: 'flow_instance_id',
        type: 'string',
        required: true,
        description: `The unique ID of the flow instance to override content for. Retrieve from the Get Flows for Prospects endpoint.`,
      },
    ],
  },
  {
    name: 'gong_engage_flow_folders_list',
    description: `List all Gong Engage flow folders available to a user, including company folders, personal folders, and folders shared with the specified user.`,
    params: [
      {
        name: 'flow_owner_email',
        type: 'string',
        required: true,
        description: `Email address of the Gong user whose flow folders to retrieve. Returns company folders plus personal and shared folders for this user.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous API response for paginating to the next page of results.`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Optional workspace ID to filter flow folders by a specific workspace.`,
      },
    ],
  },
  {
    name: 'gong_engage_flows_list',
    description: `List all Gong Engage flows available to a user, including company flows, personal flows, and flows shared with the specified user.`,
    params: [
      {
        name: 'flow_owner_email',
        type: 'string',
        required: true,
        description: `Email address of the Gong user whose flows to retrieve. Returns company flows plus personal and shared flows for this user.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous API response for paginating to the next page of results.`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Optional workspace ID to filter flows by a specific workspace.`,
      },
    ],
  },
  {
    name: 'gong_engage_prospects_assign',
    description: `Assign up to 200 CRM prospects (contacts or leads) to a specific Gong Engage flow.`,
    params: [
      {
        name: 'crm_prospect_ids',
        type: 'array',
        required: true,
        description: `Array of CRM prospect IDs (contacts or leads) to assign to the flow. Maximum 200 per request.`,
      },
      {
        name: 'flow_id',
        type: 'string',
        required: true,
        description: `The unique ID of the Gong Engage flow to assign the prospects to.`,
      },
      {
        name: 'flow_instance_owner_email',
        type: 'string',
        required: true,
        description: `Email address of the Gong user who will own the flow to-dos and be responsible for this flow instance.`,
      },
      {
        name: 'overrides',
        type: 'object',
        required: false,
        description: `Optional overrides for specific steps and variables in the flow (Beta). Example: {"coolOffOverride": true, "steps": [{"number": 1, "subject": "Hi {{recipient.first_name}}", "body": "<div>Reaching out...</div>"}], "flowInstanceVariables": [{"name": "recipient.first_name", "value": "Mike"}]}`,
      },
    ],
  },
  {
    name: 'gong_engage_prospects_assign_cool_off_override',
    description: `Assign CRM prospects to a Gong Engage flow while overriding the cool-off period restriction that would normally prevent re-enrollment.`,
    params: [
      {
        name: 'crm_prospect_ids',
        type: 'array',
        required: true,
        description: `Array of CRM prospect IDs (contacts or leads) to assign to the flow, bypassing the cool-off period. Maximum 200 per request.`,
      },
      {
        name: 'flow_id',
        type: 'string',
        required: true,
        description: `The unique ID of the Gong Engage flow to assign the prospects to.`,
      },
      {
        name: 'flow_instance_owner_email',
        type: 'string',
        required: false,
        description: `Email address of the Gong user who will own the flow to-dos and be responsible for this flow instance.`,
      },
    ],
  },
  {
    name: 'gong_engage_prospects_bulk_assign',
    description: `Asynchronously bulk assign CRM prospects to a Gong Engage flow; returns an assignment ID that can be used to poll the operation status.`,
    params: [
      {
        name: 'crm_prospect_ids',
        type: 'array',
        required: true,
        description: `Array of CRM prospect IDs (contacts or leads) to bulk assign to the flow.`,
      },
      {
        name: 'flow_id',
        type: 'string',
        required: true,
        description: `The unique ID of the Gong Engage flow to assign the prospects to.`,
      },
      {
        name: 'flow_instance_owner_email',
        type: 'string',
        required: false,
        description: `Email address of the Gong user who will own the flow to-dos and be responsible for this flow instance.`,
      },
    ],
  },
  {
    name: 'gong_engage_prospects_bulk_assign_status',
    description: `Retrieve the status and result of a previously submitted bulk prospect-to-flow assignment operation using its assignment ID.`,
    params: [
      {
        name: 'assignment_id',
        type: 'string',
        required: true,
        description: `The unique ID of the bulk assignment operation to check, returned from the Bulk Assign Prospects to Flow request.`,
      },
    ],
  },
  {
    name: 'gong_engage_prospects_flows_list',
    description: `List all Gong Engage flows currently assigned to a given set of CRM prospects (contacts or leads).`,
    params: [
      {
        name: 'crm_prospect_ids',
        type: 'array',
        required: true,
        description: `Array of CRM prospect IDs (contacts or leads) to look up flow assignments for. Maximum 200 prospects per request.`,
      },
    ],
  },
  {
    name: 'gong_engage_prospects_unassign',
    description: `Unassign CRM prospects (contacts or leads) from a specific Gong Engage flow using their CRM IDs, removing them from the flow sequence.`,
    params: [
      {
        name: 'crm_prospect_ids',
        type: 'array',
        required: true,
        description: `Array of CRM prospect IDs (contacts or leads) to remove from the flow.`,
      },
      {
        name: 'flow_id',
        type: 'string',
        required: true,
        description: `The unique ID of the Gong Engage flow to unassign the prospects from.`,
      },
    ],
  },
  {
    name: 'gong_engage_prospects_unassign_by_instance',
    description: `Unassign prospects from a Gong Engage flow using flow instance IDs rather than CRM prospect IDs.`,
    params: [
      {
        name: 'flow_instance_ids',
        type: 'array',
        required: true,
        description: `Array of flow instance IDs identifying the specific prospect-flow enrollments to remove.`,
      },
    ],
  },
  {
    name: 'gong_engage_task_complete',
    description: `Mark a specific Gong Engage task as completed.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique ID of the Gong Engage task to mark as completed.`,
      },
      {
        name: 'completion_notes',
        type: 'string',
        required: false,
        description: `Optional notes about how the task was completed.`,
      },
    ],
  },
  {
    name: 'gong_engage_task_skip',
    description: `Skip a specific Gong Engage task, indicating it should not be performed for this prospect.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique ID of the Gong Engage task to skip.`,
      },
      {
        name: 'skip_reason',
        type: 'string',
        required: false,
        description: `Optional reason for skipping this task.`,
      },
    ],
  },
  {
    name: 'gong_engage_tasks_list',
    description: `List Gong Engage tasks for a specified user, such as call tasks, email tasks, LinkedIn tasks, and other follow-up actions.`,
    params: [
      {
        name: 'assignee_email',
        type: 'string',
        required: true,
        description: `Email address of the Gong user whose tasks to retrieve.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous response for paginating to the next page of results.`,
      },
      {
        name: 'from_date',
        type: 'string',
        required: false,
        description: `Start date for filtering tasks (ISO 8601 format, e.g., 2024-01-01T00:00:00Z).`,
      },
      {
        name: 'to_date',
        type: 'string',
        required: false,
        description: `End date for filtering tasks (ISO 8601 format, e.g., 2024-12-31T23:59:59Z).`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Optional workspace ID to filter tasks by a specific workspace.`,
      },
    ],
  },
  {
    name: 'gong_engage_users_list',
    description: `List all active Gong users in the organization, useful for finding user emails to use as flow owners or assignees in Gong Engage.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous API response for paginating to the next page of results.`,
      },
      {
        name: 'include_avatars',
        type: 'boolean',
        required: false,
        description: `Whether to include avatar URLs in the response.`,
      },
    ],
  },
  {
    name: 'gong_engage_workspaces_list',
    description: `List all company workspaces in Gong, which can be used to scope Gong Engage flows and tasks to specific business units or teams.`,
    params: [],
  },
  {
    name: 'gong_library_folder_content_get',
    description: `Get the content of a specific Gong library folder by its folder ID. Returns calls, clips, and other media items stored inside the folder.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the library folder whose content should be retrieved.`,
      },
    ],
  },
  {
    name: 'gong_library_folders_list',
    description: `List all library folders in the Gong account. Returns folder names, IDs, and hierarchy information. Optionally filter by workspace to retrieve folders scoped to a specific business unit.`,
    params: [
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Optional workspace ID to filter library folders belonging to a specific Gong workspace.`,
      },
    ],
  },
  {
    name: 'gong_logs_list',
    description: `Retrieve Gong audit/activity log entries within a time range, filtered by log type. AccessLog records every endpoint/URL call with the user and IP; UserActivityLog records sensitive operations such as sharing a call, editing user settings, impersonating a user, deleting a call, requesting an API key, or changing permissions; UserCallPlay, ExternallySharedCallAccess, and ExternallySharedCallPlay track call playback and external sharing activity.`,
    params: [
      {
        name: 'from_date_time',
        type: 'string',
        required: true,
        description: `Start of the time range to retrieve logs for, in ISO-8601 format.`,
      },
      {
        name: 'log_type',
        type: 'string',
        required: true,
        description: `The category of logs to retrieve.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous response, used to fetch the next page of log records.`,
      },
      {
        name: 'to_date_time',
        type: 'string',
        required: false,
        description: `End of the time range to retrieve logs for, in ISO-8601 format. If omitted, logs end with the latest recorded entry.`,
      },
    ],
  },
  {
    name: 'gong_meeting_create',
    description: `Schedule a new Gong meeting so Gong can join and record it. Requires a start time, end time, organizer email, and at least one invitee; the Gong consent page shown to invitees follows the organizer's settings.`,
    params: [
      {
        name: 'end_time',
        type: 'string',
        required: true,
        description: `The meeting end time in ISO-8601 format, e.g. 2024-06-15T15:30:00-07:00 or 2024-06-15T22:30:00Z.`,
      },
      {
        name: 'invitees',
        type: 'array',
        required: true,
        description: `List of invitees to the meeting (not including the organizer). Each item shape: {"email": "...", "display_name": "...", "first_name": "...", "last_name": "..."} — only email is commonly needed.`,
      },
      {
        name: 'organizer_email',
        type: 'string',
        required: true,
        description: `Email address of the Gong user creating the meeting. The Gong consent page link shown to invitees follows this user's settings.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: true,
        description: `The meeting start time in ISO-8601 format, e.g. 2024-06-15T14:00:00-07:00 or 2024-06-15T21:00:00Z.`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `The ID of this meeting as it is formed on the external system that created it.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title of the meeting event.`,
      },
    ],
  },
  {
    name: 'gong_meeting_delete',
    description: `Delete a scheduled Gong meeting by its meeting ID, so Gong no longer joins or records it. This is for meetings created through Gong's Meetings API (Create Meeting) — not for calls already recorded, which use the Calls API instead.`,
    params: [
      {
        name: 'meeting_id',
        type: 'string',
        required: true,
        description: `Gong's unique identifier for the meeting (up to 20 digits), as returned by Create Meeting.`,
      },
      {
        name: 'organizer_email',
        type: 'string',
        required: false,
        description: `Email address of the user who created the meeting.`,
      },
    ],
  },
  {
    name: 'gong_meetings_integration_status',
    description: `Check whether Gong's meeting recording integration is properly set up for a list of users, by email. Useful for diagnosing why Gong isn't joining or recording a given user's meetings.`,
    params: [
      {
        name: 'emails',
        type: 'array',
        required: true,
        description: `Array of user email addresses to check meeting-integration status for. Maximum 100 per request.`,
      },
    ],
  },
  {
    name: 'gong_scorecards_list',
    description: `List all scorecard settings configured in the Gong account. Returns scorecard definitions including name, questions, and associated criteria used for call review and coaching.`,
    params: [],
  },
  {
    name: 'gong_stats_activity_aggregate',
    description: `Retrieve aggregated activity statistics (calls, emails, meetings and similar counts) for one or more Gong users over a date range, with one summary record returned per user with any activity in the range.`,
    params: [
      {
        name: 'from_date',
        type: 'string',
        required: true,
        description: `Start date (inclusive) for the activity range, in the company's time zone. Format: YYYY-MM-DD.`,
      },
      {
        name: 'to_date',
        type: 'string',
        required: true,
        description: `End date (exclusive) for the activity range, in the company's time zone. Must not exceed the current day. Format: YYYY-MM-DD.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous response for paginating to the next page of results.`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: false,
        description: `Gong user IDs to restrict the results to. Leave empty to include all users with activity in the range.`,
      },
    ],
  },
  {
    name: 'gong_stats_activity_aggregate_by_period',
    description: `Retrieve aggregated activity statistics for one or more Gong users, grouped into calendar time periods (e.g. week by week) across a date range, instead of one single total per user. The first day of any week period is Monday.`,
    params: [
      {
        name: 'aggregation_period',
        type: 'string',
        required: true,
        description: `The calendar period each activity total is grouped by. Commonly used values are DAY, WEEK, MONTH, and QUARTER; the first day of any week period is Monday.`,
      },
      {
        name: 'from_date',
        type: 'string',
        required: true,
        description: `Start date (inclusive) for the activity range, in the company's time zone. Format: YYYY-MM-DD.`,
      },
      {
        name: 'to_date',
        type: 'string',
        required: true,
        description: `End date (exclusive) for the activity range, in the company's time zone. Must not exceed the current day. Format: YYYY-MM-DD.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous response for paginating to the next page of results.`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: false,
        description: `Gong user IDs to restrict the results to. Leave empty to include all users with activity in the range.`,
      },
    ],
  },
  {
    name: 'gong_stats_activity_day_by_day',
    description: `Retrieve day-by-day activity statistics for one or more Gong users across a date range, with one record per user per day that had activity. More granular than Get Aggregated User Activity, which returns a single total per user for the whole range.`,
    params: [
      {
        name: 'from_date',
        type: 'string',
        required: true,
        description: `Start date (inclusive) for the activity range, in the company's time zone. Format: YYYY-MM-DD.`,
      },
      {
        name: 'to_date',
        type: 'string',
        required: true,
        description: `End date (exclusive) for the activity range, in the company's time zone. Must not exceed the current day. Format: YYYY-MM-DD.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous response for paginating to the next page of results.`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: false,
        description: `Gong user IDs to restrict the results to. Leave empty to include all users with activity in the range.`,
      },
    ],
  },
  {
    name: 'gong_stats_interaction',
    description: `Get aggregated interaction statistics for Gong calls within a date range. Returns metrics such as talk ratio, longest monologue, patience, question rate, and interactivity for each participant. Optionally filter by specific call IDs.`,
    params: [
      {
        name: 'from_date_time',
        type: 'string',
        required: true,
        description: `Start of the date range for retrieving interaction statistics (ISO 8601 format, e.g., 2024-01-01T00:00:00Z).`,
      },
      {
        name: 'to_date_time',
        type: 'string',
        required: true,
        description: `End of the date range for retrieving interaction statistics (ISO 8601 format, e.g., 2024-12-31T23:59:59Z).`,
      },
      {
        name: 'call_ids',
        type: 'array',
        required: false,
        description: `Optional array of specific Gong call IDs to filter the statistics.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous response for paginating to the next page of results.`,
      },
    ],
  },
  {
    name: 'gong_stats_user_actions',
    description: `Get user activity and scorecard statistics for Gong calls within a date range. Returns aggregated scorecard metrics and activity data per user. Optionally filter by specific user IDs.`,
    params: [
      {
        name: 'from_date_time',
        type: 'string',
        required: true,
        description: `Start of the date range for retrieving scorecard statistics (ISO 8601 format, e.g., 2024-01-01T00:00:00Z).`,
      },
      {
        name: 'to_date_time',
        type: 'string',
        required: true,
        description: `End of the date range for retrieving scorecard statistics (ISO 8601 format, e.g., 2024-12-31T23:59:59Z).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous response for paginating to the next page of results.`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: false,
        description: `Optional array of Gong user IDs to filter scorecard statistics for specific users.`,
      },
    ],
  },
  {
    name: 'gong_trackers_list',
    description: `List all tracker (keyword tracker) settings configured in the Gong account. Returns tracker definitions including name, tracked phrases, and associated categories used for monitoring conversation topics.`,
    params: [],
  },
  {
    name: 'gong_user_get',
    description: `Retrieve a single Gong user by their user ID. For filtering many users at once by ID list or creation date range, use Get Users (Extensive) instead.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Gong's unique numeric identifier for the user (up to 20 digits).`,
      },
    ],
  },
  {
    name: 'gong_user_settings_history_get',
    description: `Retrieve the history of settings changes for a single Gong user, such as changes to their role, team, or permission profile over time. Useful for auditing account administration changes.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Gong's unique numeric identifier for the user (up to 20 digits).`,
      },
    ],
  },
  {
    name: 'gong_users_get',
    description: `Get detailed user information for specific Gong users using an extensive filter. Filter by user IDs or by a creation date range. Returns full user profiles including settings, roles, and manager details.`,
    params: [
      {
        name: 'created_from_date_time',
        type: 'string',
        required: false,
        description: `Return users created on or after this date-time (ISO 8601 format, e.g., 2024-01-01T00:00:00Z).`,
      },
      {
        name: 'created_to_date_time',
        type: 'string',
        required: false,
        description: `Return users created on or before this date-time (ISO 8601 format, e.g., 2024-12-31T23:59:59Z).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous response for paginating to the next page of results.`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: false,
        description: `Array of Gong user IDs to retrieve detailed information for.`,
      },
    ],
  },
  {
    name: 'gong_users_list',
    description: `List all users in the Gong account. Returns user profiles including name, email, title, and manager information. Supports cursor-based pagination and optionally includes avatar URLs.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous response for paginating to the next page of results.`,
      },
      {
        name: 'include_avatars',
        type: 'boolean',
        required: false,
        description: `Whether to include avatar image URLs in the response.`,
      },
    ],
  },
]
