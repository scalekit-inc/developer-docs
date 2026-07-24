import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'zoomrevenueaccelerator_add_conversation',
    description: `Add a Revenue Accelerator conversation by IQ file ID or third-party download URL, including participants and speech timeline.`,
    params: [
      {
        name: 'conversation_type',
        type: 'string',
        required: true,
        description: `The conversation type: meeting or phone.`,
      },
      {
        name: 'meeting_start_time',
        type: 'string',
        required: true,
        description: `The meeting start time.`,
      },
      {
        name: 'conversation_topic',
        type: 'string',
        required: false,
        description: `The meeting/phone topic.`,
      },
      { name: 'deal_id', type: 'string', required: false, description: `The Zoom deal ID.` },
      {
        name: 'download_url',
        type: 'string',
        required: false,
        description: `The third party download URL.`,
      },
      { name: 'file_id', type: 'string', required: false, description: `The IQ file's unique ID.` },
      {
        name: 'host_id',
        type: 'string',
        required: false,
        description: `The host user ID or email address.`,
      },
      {
        name: 'meeting_end_time',
        type: 'string',
        required: false,
        description: `The meeting end time.`,
      },
      {
        name: 'participants',
        type: 'array',
        required: false,
        description: `A list of the participants, up to a maximum of 200. For external users, only need to pass display name.`,
      },
      {
        name: 'primary_language',
        type: 'string',
        required: false,
        description: `The primary language.`,
      },
      {
        name: 'timeline',
        type: 'array',
        required: false,
        description: `The speech timeline, who spoke when.`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `Time zone to format time.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_add_conversation_comment',
    description: `Add a new comment to a specific Revenue Accelerator conversation, optionally mentioning users or teams and anchoring it to a point in the recording.`,
    params: [
      { name: 'comment', type: 'string', required: true, description: `The actual comment.` },
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `The conversation's ID. If it begins with a / character or contains // characters, it must be double encoded.`,
      },
      {
        name: 'is_private',
        type: 'boolean',
        required: false,
        description: `Determine whether comment is public or private.`,
      },
      {
        name: 'mention_team_ids',
        type: 'array',
        required: false,
        description: `The list of teams mentioned in the comment (up to 50).`,
      },
      {
        name: 'mention_user_ids',
        type: 'array',
        required: false,
        description: `The list of the users mentioned in the comment (up to 50).`,
      },
      {
        name: 'parent_comment_id',
        type: 'string',
        required: false,
        description: `The parent comment's ID in this conversation.`,
      },
      {
        name: 'time_in_recording',
        type: 'string',
        required: false,
        description: `The time in recording which the player should advance.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_add_user_conversation',
    description: `Add a new Revenue Accelerator conversation for a user by meeting recording URL or meeting UUID.`,
    params: [
      {
        name: 'userId',
        type: 'string',
        required: true,
        description: `The user ID or email address of the user, or the text 'me' for the current user.`,
      },
      {
        name: 'meeting_uuid',
        type: 'string',
        required: false,
        description: `The Meeting ID. Each meeting instance generates its own meeting UUID.`,
      },
      {
        name: 'recording_link',
        type: 'string',
        required: false,
        description: `The meeting record url. It could be share_url or play_url.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_assign_team_managers',
    description: `Assign one or more Zoom users as managers of a Revenue Accelerator team. Requires that your account supports hierarchical structure teams.`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The Zoom specific team ID to assign managers to. Retrieve by calling List Account Teams.`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: true,
        description: `List of Zoom user IDs to assign as team managers.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_assign_team_members',
    description: `Add one or more users to a Revenue Accelerator team. Identify each user by user_id or email (up to 200 users per call).`,
    params: [
      {
        name: 'members',
        type: 'array',
        required: true,
        description: `List of members to add to the team, up to a maximum of 200. Each member is identified by user_id or email - if user_id is provided, email is ignored.`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The Zoom specific team ID to add members to. Retrieve by calling List Account Teams.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_create_team',
    description: `Create a new Revenue Accelerator team. Optionally specify a parent team ID to create a child team in a hierarchical structure. Create teams one at a time if your account has hierarchical teams enabled - concurrent hierarchical team creation is not supported.`,
    params: [
      {
        name: 'team_name',
        type: 'string',
        required: true,
        description: `The name of the new team.`,
      },
      {
        name: 'parent_team_id',
        type: 'string',
        required: false,
        description: `Zoom team ID. Fill this field to create a child team; leave empty to create a new flat or root team.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_delete_conversation',
    description: `Delete a Revenue Accelerator conversation by conversation ID.`,
    params: [
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `The conversation's ID. If it begins with a / character or contains // characters, it must be double encoded.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_delete_conversation_comment',
    description: `Delete a comment from a specific Revenue Accelerator conversation.`,
    params: [
      { name: 'commentId', type: 'string', required: true, description: `The comment's ID.` },
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `The conversation's ID. If it begins with a / character or contains // characters, it must be double encoded.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_delete_deal_activity',
    description: `Delete a specific activity from a Revenue Accelerator deal, identified by either conversation ID or message ID.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The conversation ID. Use either conversation_id or message_id to identify the activity to delete.`,
      },
      { name: 'dealId', type: 'string', required: true, description: `The deal's ID.` },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The message ID. Use either conversation_id or message_id to identify the activity to delete.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_delete_team',
    description: `Delete a Revenue Accelerator team. If the team is a flat team, ensure its team members list is empty first. Delete teams one at a time if your account has hierarchical teams enabled - concurrent hierarchical team deletion is not supported.`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The Zoom specific team ID to delete. Retrieve by calling List Account Teams.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_get_conversation',
    description: `Get information for a specific Revenue Accelerator conversation by its conversation ID.`,
    params: [
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `The conversation's ID. If the ID begins with a \`/\` character or contains \`//\` characters, you must double encode the ID value.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_get_conversation_analysis',
    description: `Get the content analysis for a specific conversation, such as topics, next steps, engaging questions, indicators, smart chapters, or deal memo analysis.`,
    params: [
      {
        name: 'analysis_type',
        type: 'string',
        required: true,
        description: `The content analysis type of conversations to query: topics, nextSteps, engagingQuestions, indicators, smartChapters, dealMemo, or all.`,
      },
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `The conversation's ID. If the ID begins with a \`/\` character or contains \`//\` characters, you must double encode the ID value.`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of records returned within a single API call.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_get_conversation_interactions',
    description: `Get interactions (participant speaking activity and engagement metrics) for a specific conversation.`,
    params: [
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `The conversation's ID. If the ID begins with a \`/\` character or contains \`//\` characters, you must double encode the ID value.`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of records returned within a single API call.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_get_conversation_scorecards',
    description: `Get coaching scorecards for a specific conversation.`,
    params: [
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `The conversation's ID. If the ID begins with a \`/\` character or contains \`//\` characters, you must double encode the ID value.`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of records returned within a single API call.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_get_crm_registration',
    description: `Retrieve the current custom CRM API registration information for this Zoom account, including CRM type, currency, deal stages, and URL patterns.`,
    params: [],
  },
  {
    name: 'zoomrevenueaccelerator_get_crm_task',
    description: `Poll the execution result of an asynchronous CRM task, such as a bulk import of accounts, contacts, deals, or leads. Use the task ID returned by the corresponding import call.`,
    params: [
      {
        name: 'taskId',
        type: 'string',
        required: true,
        description: `The asynchronous task ID returned by bulk import APIs.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_get_deal',
    description: `Get information for a specific Revenue Accelerator deal by its deal ID.`,
    params: [{ name: 'dealId', type: 'string', required: true, description: `The deal's ID.` }],
  },
  {
    name: 'zoomrevenueaccelerator_get_deal_activities',
    description: `Get activities for a specific Revenue Accelerator deal, with optional filters for conversation topic, callout type, and indicator/topic mentions.`,
    params: [
      { name: 'dealId', type: 'string', required: true, description: `The deal's ID.` },
      {
        name: 'callout_type',
        type: 'string',
        required: false,
        description: `The callout type of conversations to query: engagingQuestions or nextSteps.`,
      },
      {
        name: 'conversation_topic',
        type: 'string',
        required: false,
        description: `The conversation topic.`,
      },
      {
        name: 'indicator_id',
        type: 'string',
        required: false,
        description: `The indicator id to query.`,
      },
      {
        name: 'mentioned_topic_id',
        type: 'string',
        required: false,
        description: `The mentioned topic id to query.`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of records returned within a single API call.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_get_indicators_settings',
    description: `Get the account's Revenue Accelerator indicators settings, with optional filters for category and indicator type. Requires a paid account.`,
    params: [
      {
        name: 'category_id',
        type: 'string',
        required: false,
        description: `The category id of indicators.`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of records returned within a single API call.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `The type of indicators: basic, advanced, or guiding_sentences.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_get_team',
    description: `Get team detail for a specific Revenue Accelerator team, including team name, description, and team member size.`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The Zoom specific team ID to query. Retrieve by calling List Account Teams.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_get_user_playlists',
    description: `Get all conversation playlists for a user, optionally filtered by playlist type, following status, or self-created status.`,
    params: [
      {
        name: 'userId',
        type: 'string',
        required: true,
        description: `The user ID or email address of the user.`,
      },
      {
        name: 'create_by_self',
        type: 'boolean',
        required: false,
        description: `Whether to see playlists created by self.`,
      },
      {
        name: 'following',
        type: 'boolean',
        required: false,
        description: `Whether to see Following only.`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of records returned within a single API call.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `The type of the playlist to query: All, Normal, Smart, or Favorite.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_import_crm_accounts',
    description: `Bulk import CRM account objects into Zoom Revenue Accelerator asynchronously. We recommend importing in this order: account, then contact, then deal, since CRM account references are validated in advance when importing contacts and deals. Returns a task ID you can poll with Get CRM Task.`,
    params: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `List of the CRM account objects to import, up to 2000 per request. Each item requires account_name, crm_account_id, and modify_time.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_import_crm_contacts',
    description: `Bulk import CRM contact objects into Zoom Revenue Accelerator asynchronously. We recommend importing in this order: account, then contact, then deal. CRM account references are validated in advance when importing contacts and deals. Returns a task ID you can poll with Get CRM Task.`,
    params: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `List of the CRM contact objects to import, up to 2000 per request. Each item requires contact_name, crm_contact_id, and modify_time.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_import_crm_deals',
    description: `Bulk import CRM deal objects into Zoom Revenue Accelerator asynchronously. We recommend importing in this order: account, then contact, then deal. CRM account references are validated in advance when importing contacts and deals. Returns a task ID you can poll with Get CRM Task.`,
    params: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `List of the CRM deal objects to import, up to 2000 per request. Each item requires crm_account_id, crm_deal_id, deal_name, modify_time, owner_email, and stage.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_import_crm_leads',
    description: `Bulk import CRM lead objects into Zoom Revenue Accelerator asynchronously. Returns a task ID you can poll with Get CRM Task.`,
    params: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `List of the CRM lead objects to import, up to 2000 per request. Each item requires crm_lead_id, lead_name, and modify_time.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_list_conversation_comments',
    description: `Get comments for a specific conversation.`,
    params: [
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `The conversation's ID. If the ID begins with a \`/\` character or contains \`//\` characters, you must double encode the ID value.`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of records returned within a single API call.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_list_conversations',
    description: `List Revenue Accelerator conversations, with optional filters for host, participant, team, deal, date range, and conversation type.`,
    params: [
      {
        name: 'callout_type',
        type: 'string',
        required: false,
        description: `The callout type of conversations to query: engagingQuestions or nextSteps.`,
      },
      {
        name: 'conversation_type',
        type: 'string',
        required: false,
        description: `The type of conversations to query: all, meeting, or phone.`,
      },
      {
        name: 'deal_id',
        type: 'string',
        required: false,
        description: `The Zoom specific deal ID to query.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `The start date in yyyy-MM-dd'T'HH:mm:ss'Z' format.`,
      },
      {
        name: 'host_id',
        type: 'string',
        required: false,
        description: `The host user ID to query.`,
      },
      {
        name: 'indicator_id',
        type: 'string',
        required: false,
        description: `The indicator id to query.`,
      },
      {
        name: 'mentioned_topic_id',
        type: 'string',
        required: false,
        description: `The mentioned topic id to query.`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of records returned within a single API call.`,
      },
      {
        name: 'participant_id',
        type: 'string',
        required: false,
        description: `The internal participant ID to query.`,
      },
      {
        name: 'period_type',
        type: 'string',
        required: false,
        description: `The type of period to query: meetingStartTime or iqProcessedTime.`,
      },
      {
        name: 'scored',
        type: 'boolean',
        required: false,
        description: `Set to true to return scored conversations from the conversation list.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `The Zoom specific team ID to query.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `The end date in yyyy-MM-dd'T'HH:mm:ss'Z' format.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_list_crm_accounts',
    description: `Retrieve previously-imported CRM account objects by their CRM IDs. Use this after import_crm_accounts to verify or fetch the imported account records.`,
    params: [
      {
        name: 'crm_account_ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of CRM account IDs, up to a maximum of 100 IDs.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_list_crm_contacts',
    description: `Retrieve previously-imported CRM contact objects by their CRM IDs. Use this after import_crm_contacts to verify or fetch the imported contact records.`,
    params: [
      {
        name: 'crm_contact_ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of CRM contact IDs, up to a maximum of 100 IDs.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_list_crm_deals',
    description: `Retrieve previously-imported CRM deal objects by their CRM IDs. Use this after import_crm_deals to verify or fetch the imported deal records.`,
    params: [
      {
        name: 'crm_deal_ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of CRM deal IDs, up to a maximum of 100 IDs.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_list_crm_leads',
    description: `Retrieve previously-imported CRM lead objects by their CRM IDs. Use this after import_crm_leads to verify or fetch the imported lead records.`,
    params: [
      {
        name: 'crm_lead_ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of CRM lead IDs, up to a maximum of 100 IDs.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_list_deals',
    description: `List Revenue Accelerator deals, with optional filters for deal name, stage, owner, team, date range, and deal amount.`,
    params: [
      { name: 'deal_name', type: 'string', required: false, description: `The deal name.` },
      {
        name: 'deal_stage',
        type: 'string',
        required: false,
        description: `The stage of the deal.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `The start date in yyyy-MM-dd'T'HH:mm:ss'Z' format.`,
      },
      {
        name: 'max_deal_amount',
        type: 'integer',
        required: false,
        description: `The maximum deal amount to query.`,
      },
      {
        name: 'min_deal_amount',
        type: 'string',
        required: false,
        description: `The minimum deal amount to query.`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'only_show_with_analytics',
        type: 'boolean',
        required: false,
        description: `Set to true to return deals with analytics.`,
      },
      {
        name: 'owner_id',
        type: 'string',
        required: false,
        description: `The Zoom specific user ID to query.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of records returned within a single API call.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `The Zoom specific team ID to query.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `The end date in yyyy-MM-dd'T'HH:mm:ss'Z' format.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_list_scheduled_meetings',
    description: `List all Revenue Accelerator scheduled meetings for a user, with optional filters for meeting platform and date range.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `The start date in yyyy-MM-dd'T'HH:mm:ss'Z' format.`,
      },
      {
        name: 'meeting_platform',
        type: 'string',
        required: false,
        description: `The scheduled meeting platform: zoom, microsoft_teams, or google_meet.`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of records returned within a single API call.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `The end date in yyyy-MM-dd'T'HH:mm:ss'Z' format.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `This user's scheduled meetings.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_list_team_managers',
    description: `List the managers assigned to a specific Revenue Accelerator team, paginated.`,
    params: [
      { name: 'teamId', type: 'string', required: true, description: `Team UUID.` },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `The number of records returned in a single API call. Default is 30, max is 100.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_list_team_members',
    description: `List the members of a specific Revenue Accelerator team, paginated.`,
    params: [
      { name: 'teamId', type: 'string', required: true, description: `Team UUID.` },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of records returned in a single API call. Default is 30, minimum is 15.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_list_teams',
    description: `List account teams in Revenue Accelerator, with optional filters for parent team ID and team name.`,
    params: [
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of records returned in a single API call.`,
      },
      {
        name: 'parent_team_id',
        type: 'string',
        required: false,
        description: `Parent team ID to filter by.`,
      },
      {
        name: 'team_name',
        type: 'string',
        required: false,
        description: `The name of team to filter by.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_list_unassigned_team_users',
    description: `List Revenue Accelerator ZRA users who are not yet assigned to any team, paginated.`,
    params: [
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `The next page token used to paginate through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of records returned in a single API call. Default is 30, minimum is 15.`,
      },
      {
        name: 'team_type',
        type: 'integer',
        required: false,
        description: `Team type: 0 = hierarchical team, 1 = flat team.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_register_crm',
    description: `Register a new custom CRM API integration for this Zoom account, defining the CRM type, currency, deal stage pipeline, and optional deep-link URL patterns used before bulk importing CRM accounts, contacts, deals, and leads.`,
    params: [
      {
        name: 'crm_type',
        type: 'string',
        required: true,
        description: `CRM type identifier, up to 16 alphanumeric characters, must start with a letter.`,
      },
      {
        name: 'deal_stages',
        type: 'array',
        required: true,
        description: `Deal stage definitions, up to 50. Each stage type (OPEN, CLOSED_WON, CLOSED_LOST) must have at least one stage defined.`,
      },
      {
        name: 'crm_name',
        type: 'string',
        required: false,
        description: `Display name of the CRM type. Defaults to the CRM type identifier if omitted.`,
      },
      {
        name: 'currency_type',
        type: 'string',
        required: false,
        description: `Currency type unit name, such as USD, JPY, EUR. Defaults to USD.`,
      },
      {
        name: 'url_pattern_account',
        type: 'string',
        required: false,
        description: `URL pattern to open a CRM account object in a browser. The placeholder {id} is replaced with the actual CRM account object ID.`,
      },
      {
        name: 'url_pattern_contact',
        type: 'string',
        required: false,
        description: `URL pattern to open a CRM contact object in a browser. The placeholder {id} is replaced with the actual CRM contact object ID.`,
      },
      {
        name: 'url_pattern_deal',
        type: 'string',
        required: false,
        description: `URL pattern to open a CRM deal object in a browser. The placeholder {id} is replaced with the actual CRM deal object ID.`,
      },
      {
        name: 'url_pattern_lead',
        type: 'string',
        required: false,
        description: `URL pattern to open a CRM lead object in a browser. The placeholder {id} is replaced with the actual CRM lead object ID.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_unassign_team_managers',
    description: `Remove one or more managers from a Revenue Accelerator team. Requires that your account supports hierarchical structure teams.`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The Zoom specific team ID to remove managers from. Retrieve by calling List Account Teams.`,
      },
      {
        name: 'user_ids',
        type: 'string',
        required: true,
        description: `Comma-separated Zoom user IDs to remove as managers. Max size is 3 in ZRA.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_unassign_team_members',
    description: `Remove one or more members from a Revenue Accelerator team. Delete fewer than 30 users at a time.`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The Zoom specific team ID to remove members from. Retrieve by calling List Account Teams.`,
      },
      {
        name: 'user_ids',
        type: 'string',
        required: true,
        description: `Comma-separated Zoom user IDs to remove from the team. Max size is 30.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_unregister_crm',
    description: `Unregister the current custom CRM API integration for this Zoom account. Optionally remove all previously imported CRM data in the background.`,
    params: [
      {
        name: 'remove_all',
        type: 'boolean',
        required: false,
        description: `Removes all CRM data of the current account in the background when it disconnects. Use with caution.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_update_conversation_comment',
    description: `Edit an existing comment on a specific Revenue Accelerator conversation.`,
    params: [
      { name: 'commentId', type: 'string', required: true, description: `The comment's ID.` },
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `The conversation's ID. If it begins with a / character or contains // characters, it must be double encoded.`,
      },
      { name: 'comment', type: 'string', required: false, description: `The actual comment.` },
      {
        name: 'mention_team_ids',
        type: 'array',
        required: false,
        description: `The list of teams mentioned in the comment (up to 50).`,
      },
      {
        name: 'mention_user_ids',
        type: 'array',
        required: false,
        description: `The list of the users mentioned in the comment (up to 50).`,
      },
      {
        name: 'time_in_recording',
        type: 'string',
        required: false,
        description: `The time in recording which the player should advance.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_update_conversation_host',
    description: `Update a Revenue Accelerator conversation's host to a new host user ID or email address.`,
    params: [
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `The conversation's ID. If it begins with a / character or contains // characters, it must be double encoded.`,
      },
      {
        name: 'new_host_id',
        type: 'string',
        required: false,
        description: `The user ID or email address of the host.`,
      },
    ],
  },
  {
    name: 'zoomrevenueaccelerator_update_team',
    description: `Update the name of a specific Revenue Accelerator team.`,
    params: [
      {
        name: 'team_name',
        type: 'string',
        required: true,
        description: `The new name of the team.`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The Zoom specific team ID to query. Retrieve by calling List Account Teams.`,
      },
    ],
  },
]
