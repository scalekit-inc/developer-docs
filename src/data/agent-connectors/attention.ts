import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'attention_ask_attention',
    description: `Ask a natural-language question over one or more conversations within a deal and get back an AI-generated answer. Optionally include timestamped transcript excerpts that support the answer, or synthesize a single cross-conversation summary.`,
    params: [
      {
        name: 'conversations_ids',
        type: 'array',
        required: true,
        description: `List of conversation IDs to analyze. Pass an empty array to consider all conversations under the given deal.`,
      },
      {
        name: 'deal_id',
        type: 'string',
        required: true,
        description: `Identifier of the CRM deal that provides context for this question.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Natural-language question or instruction to run against the selected conversations.`,
      },
      {
        name: 'include_timestamps',
        type: 'boolean',
        required: false,
        description: `If true, includes timestamped transcript excerpts that support the answer.`,
      },
      {
        name: 'summarize',
        type: 'boolean',
        required: false,
        description: `If true, synthesizes all per-conversation outputs into a single combined response.`,
      },
    ],
  },
  {
    name: 'attention_calendar_events_list',
    description: `List a specific user's calendar events/meetings with date-range filtering and pagination.`,
    params: [
      { name: 'page', type: 'integer', required: true, description: `Page number for pagination.` },
      { name: 'size', type: 'integer', required: true, description: `Number of items per page.` },
      {
        name: 'user_uuid',
        type: 'string',
        required: true,
        description: `UUID of the user whose calendar events to list.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Filter events starting from this date-time (inclusive, ISO 8601).`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Filter events until this date-time (inclusive, ISO 8601).`,
      },
    ],
  },
  {
    name: 'attention_connection_report_get',
    description: `Get an org-wide report of which users have connected their calendar and email to Attention, including a summary count and a per-user connection status breakdown.`,
    params: [],
  },
  {
    name: 'attention_conversation_archive',
    description: `Archive an Attention conversation so it's excluded from active listings, while preserving its underlying data and history.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the conversation to archive.`,
      },
    ],
  },
  {
    name: 'attention_conversation_get',
    description: `Retrieve a single Attention conversation by ID, including metadata, participants, and (optionally) the detailed transcript.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the conversation.`,
      },
      {
        name: 'detailed_transcript',
        type: 'boolean',
        required: false,
        description: `If true, includes detailed transcript data for the conversation.`,
      },
      {
        name: 'include_internal_participants',
        type: 'boolean',
        required: false,
        description: `If true, includes internal participants in the response.`,
      },
    ],
  },
  {
    name: 'attention_conversation_import',
    description: `Import an externally recorded conversation into Attention by supplying a media URL and the owning user. Attention will transcribe and analyze the recording asynchronously.`,
    params: [
      {
        name: 'media_url',
        type: 'string',
        required: true,
        description: `URL of the call recording media file to import.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the user who owns this conversation.`,
      },
      {
        name: 'application_external_id',
        type: 'string',
        required: false,
        description: `External identifier for this recording in the source application.`,
      },
      {
        name: 'application_name',
        type: 'string',
        required: false,
        description: `Name of the source application providing the recording.`,
      },
      {
        name: 'conversation_started_at',
        type: 'string',
        required: false,
        description: `Start date-time of the conversation (ISO 8601).`,
      },
      {
        name: 'conversation_title',
        type: 'string',
        required: false,
        description: `Title for the imported conversation.`,
      },
      {
        name: 'opportunity_id',
        type: 'string',
        required: false,
        description: `Identifier of the CRM opportunity linked to this conversation.`,
      },
      {
        name: 'skip_crm_fields_calculation',
        type: 'boolean',
        required: false,
        description: `If true, skips CRM field calculation for the imported conversation.`,
      },
      {
        name: 'skip_opportunities_export',
        type: 'boolean',
        required: false,
        description: `If true, skips exporting data to CRM opportunities.`,
      },
      {
        name: 'skip_scorecard_calculation',
        type: 'boolean',
        required: false,
        description: `If true, skips scorecard calculation for the imported conversation.`,
      },
    ],
  },
  {
    name: 'attention_conversation_media_download_url_get',
    description: `Generate a presigned download URL for a conversation's underlying recording/media file.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the conversation whose media should be downloaded.`,
      },
    ],
  },
  {
    name: 'attention_conversation_privacy_update',
    description: `Toggle an Attention conversation between private and public visibility.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the conversation.`,
      },
      {
        name: 'privacy',
        type: 'string',
        required: true,
        description: `New privacy setting for the conversation.`,
      },
    ],
  },
  {
    name: 'attention_conversation_update',
    description: `Update the title and/or labels of an existing Attention conversation.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the conversation.`,
      },
      {
        name: 'labels',
        type: 'array',
        required: false,
        description: `Array of label strings to set on the conversation.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the conversation.`,
      },
    ],
  },
  {
    name: 'attention_conversation_upload_url_get',
    description: `Get a signed URL (plus an identifier key) for uploading a local conversation media file, for use before calling attention_conversation_import.`,
    params: [],
  },
  {
    name: 'attention_conversations_list',
    description: `List conversations (calls, meetings) recorded in Attention, with optional date-range and filter parameters. Returns a paginated list of conversation summaries.`,
    params: [
      {
        name: 'detailed_transcript',
        type: 'boolean',
        required: false,
        description: `If true, includes detailed transcript data for each conversation.`,
      },
      {
        name: 'from_date_time',
        type: 'string',
        required: false,
        description: `Start of the date-time range for filtering conversations (ISO 8601).`,
      },
      {
        name: 'hide_internal',
        type: 'boolean',
        required: false,
        description: `If true, excludes conversations with no external participants.`,
      },
      {
        name: 'owner_email',
        type: 'string',
        required: false,
        description: `Filter conversations by the owning user's email address.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'size',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Filter conversations by team UUID.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Filter conversations by title.`,
      },
      {
        name: 'to_date_time',
        type: 'string',
        required: false,
        description: `End of the date-time range for filtering conversations (ISO 8601).`,
      },
    ],
  },
  {
    name: 'attention_deck_create',
    description: `Generate an AI slide deck/presentation from a conversation, deal, or other content source and share the resulting link with a list of recipient emails.`,
    params: [
      {
        name: 'context_id',
        type: 'string',
        required: true,
        description: `Identifier of the content source the deck should be generated from (e.g. a deal or conversation ID).`,
      },
      {
        name: 'users_to_share',
        type: 'array',
        required: true,
        description: `Email addresses to share the generated deck with.`,
      },
      {
        name: 'additional_instructions',
        type: 'string',
        required: false,
        description: `Supplementary free-text guidance for deck generation.`,
      },
      {
        name: 'deck_type',
        type: 'string',
        required: false,
        description: `Presentation category, e.g. sales_presentation.`,
      },
      {
        name: 'slides',
        type: 'integer',
        required: false,
        description: `Target number of slides for the generated deck.`,
      },
      {
        name: 'structure',
        type: 'array',
        required: false,
        description: `Custom layout and content specification per slide.`,
      },
    ],
  },
  {
    name: 'attention_emails_list',
    description: `List/search tracked emails with filters by subject, CRM account, deal, and date range — the email counterpart to the existing attention_conversations_list tool.`,
    params: [
      {
        name: 'crm_account_id',
        type: 'array',
        required: false,
        description: `Filter emails by CRM account ID(s).`,
      },
      {
        name: 'deal_uuid',
        type: 'array',
        required: false,
        description: `Filter emails by deal UUID(s).`,
      },
      {
        name: 'from_date_time',
        type: 'string',
        required: false,
        description: `Start of the date-time range for filtering emails (ISO 8601).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts from 1).`,
      },
      {
        name: 'size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 50).`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Filter emails by subject using case-insensitive partial matching.`,
      },
      {
        name: 'to_date_time',
        type: 'string',
        required: false,
        description: `End of the date-time range for filtering emails (ISO 8601).`,
      },
    ],
  },
  {
    name: 'attention_roles_list',
    description: `List available user roles in the Attention organization and their UUIDs — needed as a lookup before calling attention_user_create or attention_user_update, which require a roleUUID.`,
    params: [],
  },
  {
    name: 'attention_scorecard_result_create',
    description: `Submit a scorecard result (coaching/QA review) for a conversation or chat in Attention, with a summary and a list of scored items.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `Array of scored scorecard items.`,
      },
      {
        name: 'scorecard_uuid',
        type: 'string',
        required: true,
        description: `Unique identifier of the scorecard template.`,
      },
      {
        name: 'summary',
        type: 'string',
        required: true,
        description: `Overall summary of the scorecard result.`,
      },
      {
        name: 'chat_uuid',
        type: 'string',
        required: false,
        description: `Unique identifier of the chat this result is attached to.`,
      },
      {
        name: 'conversation_uuid',
        type: 'string',
        required: false,
        description: `Unique identifier of the conversation this result is attached to.`,
      },
    ],
  },
  {
    name: 'attention_scorecards_list',
    description: `List scorecard templates configured in the Attention workspace, used for call review and coaching.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (1-indexed).`,
      },
      {
        name: 'size',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
    ],
  },
  {
    name: 'attention_scorecards_summary_get',
    description: `Get aggregate scorecard results for a scorecard across a date range, filtered by teams, users, and scorecard items. Complements attention_scorecards_list and attention_scorecard_result_create with rollup analytics such as score totals, min/max, and per-item averages.`,
    params: [
      {
        name: 'from_date_time',
        type: 'string',
        required: true,
        description: `Start date-time of the range to summarize (ISO 8601).`,
      },
      {
        name: 'scorecard_items_uuids',
        type: 'array',
        required: true,
        description: `Scorecard item IDs to include in the summary. Pass an empty array to include all items.`,
      },
      {
        name: 'scorecard_uuid',
        type: 'string',
        required: true,
        description: `Identifier of the scorecard template to summarize.`,
      },
      {
        name: 'team_uuids',
        type: 'array',
        required: true,
        description: `Team IDs to include in the summary. Pass an empty array to include all teams.`,
      },
      {
        name: 'to_date_time',
        type: 'string',
        required: true,
        description: `End date-time of the range to summarize (ISO 8601).`,
      },
      {
        name: 'user_uuids',
        type: 'array',
        required: true,
        description: `User IDs to include in the summary. Pass an empty array to include all users.`,
      },
    ],
  },
  {
    name: 'attention_snippet_create',
    description: `Create a shareable video snippet/clip from a specific time range of an Attention conversation.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the conversation to clip from.`,
      },
      {
        name: 'internal',
        type: 'boolean',
        required: true,
        description: `If true, the snippet is only visible internally.`,
      },
      {
        name: 'notify_views',
        type: 'boolean',
        required: true,
        description: `If true, notifies the snippet owner when it's viewed.`,
      },
      {
        name: 'user_uuid',
        type: 'string',
        required: true,
        description: `Unique identifier of the user creating this snippet.`,
      },
      {
        name: 'video_end_time',
        type: 'number',
        required: true,
        description: `End time of the clip within the conversation video, in seconds.`,
      },
      {
        name: 'video_start_time',
        type: 'number',
        required: true,
        description: `Start time of the clip within the conversation video, in seconds.`,
      },
      {
        name: 'in_library',
        type: 'boolean',
        required: false,
        description: `If true, adds the snippet to the shared snippet library.`,
      },
      {
        name: 'library_item_info',
        type: 'object',
        required: false,
        description: `Library folder/location details, required when in_library is true.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Additional notes about the snippet.`,
      },
      { name: 'title', type: 'string', required: false, description: `Title for the snippet.` },
    ],
  },
  {
    name: 'attention_team_create',
    description: `Create a new team in the Attention organization, optionally nested under a parent team.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the new team.` },
      {
        name: 'parent_team_uuid',
        type: 'string',
        required: false,
        description: `UUID of the parent team, if this team is part of a hierarchy.`,
      },
    ],
  },
  {
    name: 'attention_team_get',
    description: `Retrieve a single Attention team by ID.`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the team.`,
      },
    ],
  },
  {
    name: 'attention_team_members_list',
    description: `List the members belonging to a specific Attention team.`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the team.`,
      },
    ],
  },
  {
    name: 'attention_team_update',
    description: `Rename an Attention team or move it under a different parent team.`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `UUID of the team to update.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the team.` },
      {
        name: 'parent_team_uuid',
        type: 'string',
        required: false,
        description: `UUID of the new parent team.`,
      },
    ],
  },
  {
    name: 'attention_teams_list',
    description: `List all teams configured in the Attention workspace.`,
    params: [],
  },
  {
    name: 'attention_usage_report_get',
    description: `Get API/feature usage statistics (coaching sessions, calls viewed, comments left, snippets created, AI queries, etc.) for specified users or teams over a date range.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End date for the usage report period (inclusive).`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start date for the usage report period (inclusive).`,
      },
      {
        name: 'team_uuids',
        type: 'array',
        required: false,
        description: `List of team UUIDs to include in the report. Omit to include all teams.`,
      },
      {
        name: 'user_uuids',
        type: 'array',
        required: false,
        description: `List of user UUIDs to include in the report. Omit to include all users.`,
      },
    ],
  },
  {
    name: 'attention_user_create',
    description: `Create a new user in the Attention organization with an email, role, seat type, and one or more team assignments. Look up role UUIDs with attention_roles_list and team UUIDs with attention_teams_list first.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address of the new user.`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: true,
        description: `First name of the new user.`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: true,
        description: `Last name of the new user.`,
      },
      {
        name: 'role_uuid',
        type: 'string',
        required: true,
        description: `UUID of the role to assign to the new user.`,
      },
      {
        name: 'team_uuids',
        type: 'array',
        required: true,
        description: `Team UUIDs the new user should belong to (at least one required).`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `Password for the new user's account.`,
      },
      {
        name: 'primary_team_uuid',
        type: 'string',
        required: false,
        description: `Which of the provided team_uuids should be marked as the user's primary team.`,
      },
      {
        name: 'seat_type',
        type: 'string',
        required: false,
        description: `Seat type for the new user: listener or recording.`,
      },
    ],
  },
  {
    name: 'attention_user_delete',
    description: `Permanently remove a user from the Attention organization, revoking their access.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `UUID of the user to delete.`,
      },
    ],
  },
  {
    name: 'attention_user_update',
    description: `Update an existing Attention user's name, password, role, seat type, or team assignments. Only the fields provided are changed.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `UUID of the user to update.`,
      },
      {
        name: 'deals_enabled',
        type: 'boolean',
        required: false,
        description: `Enable or disable the deals feature for this user.`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `New first name for the user.`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `New last name for the user.`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `New password for the user's account.`,
      },
      {
        name: 'role_uuid',
        type: 'string',
        required: false,
        description: `UUID of the new role to assign to the user.`,
      },
      {
        name: 'seat_type',
        type: 'string',
        required: false,
        description: `Seat type for the user: listener or recording.`,
      },
      {
        name: 'team_uuids_to_add',
        type: 'array',
        required: false,
        description: `Team UUIDs to add this user to.`,
      },
      {
        name: 'team_uuids_to_remove',
        type: 'array',
        required: false,
        description: `Team UUIDs to remove this user from.`,
      },
    ],
  },
  {
    name: 'attention_users_list',
    description: `List users in the Attention organization, with optional filters by ID, email, or team.`,
    params: [
      {
        name: 'filter_email',
        type: 'string',
        required: false,
        description: `Filter results to this user's email address.`,
      },
      {
        name: 'filter_id',
        type: 'string',
        required: false,
        description: `Filter results to this user ID.`,
      },
      {
        name: 'include_deleted',
        type: 'boolean',
        required: false,
        description: `If true, includes deleted users in the response.`,
      },
      {
        name: 'team_uuid',
        type: 'string',
        required: false,
        description: `Filter results to users in this team.`,
      },
    ],
  },
]
