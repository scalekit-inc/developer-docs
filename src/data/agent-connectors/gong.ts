import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'gong_call_outcomes_list',
    description: `List all call outcome options configured in the Gong account. Returns outcome definitions such as name and ID that can be applied to calls to indicate the result of a conversation.`,
    params: [],
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
    name: 'gong_engage_digital_interactions_create',
    description: `Add a digital interaction event (such as a web visit, content engagement, or other digital touchpoint) to a Gong Engage prospect's activity timeline.`,
    params: [
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
        name: 'link_url',
        type: 'string',
        required: false,
        description: `For EMAIL_LINK_CLICKED events, the URL of the link that was clicked.`,
      },
      {
        name: 'prospect_email',
        type: 'string',
        required: true,
        description: `Email address of the prospect who triggered this engagement event.`,
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
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous API response for paginating to the next page of results.`,
      },
      {
        name: 'flow_owner_email',
        type: 'string',
        required: true,
        description: `Email address of the Gong user whose flow folders to retrieve. Returns company folders plus personal and shared folders for this user.`,
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
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous API response for paginating to the next page of results.`,
      },
      {
        name: 'flow_owner_email',
        type: 'string',
        required: true,
        description: `Email address of the Gong user whose flows to retrieve. Returns company flows plus personal and shared flows for this user.`,
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
        name: 'completion_notes',
        type: 'string',
        required: false,
        description: `Optional notes about how the task was completed.`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique ID of the Gong Engage task to mark as completed.`,
      },
    ],
  },
  {
    name: 'gong_engage_task_skip',
    description: `Skip a specific Gong Engage task, indicating it should not be performed for this prospect.`,
    params: [
      {
        name: 'skip_reason',
        type: 'string',
        required: false,
        description: `Optional reason for skipping this task.`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique ID of the Gong Engage task to skip.`,
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
    name: 'gong_scorecards_list',
    description: `List all scorecard settings configured in the Gong account. Returns scorecard definitions including name, questions, and associated criteria used for call review and coaching.`,
    params: [],
  },
  {
    name: 'gong_stats_interaction',
    description: `Get aggregated interaction statistics for Gong calls within a date range. Returns metrics such as talk ratio, longest monologue, patience, question rate, and interactivity for each participant. Optionally filter by specific call IDs.`,
    params: [
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
    ],
  },
  {
    name: 'gong_stats_user_actions',
    description: `Get user activity and scorecard statistics for Gong calls within a date range. Returns aggregated scorecard metrics and activity data per user. Optionally filter by specific user IDs.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value from a previous response for paginating to the next page of results.`,
      },
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
