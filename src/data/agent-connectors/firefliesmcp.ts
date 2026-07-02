import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'firefliesmcp_fireflies_create_soundbite',
    description: `Create a short audio or transcript clip from a meeting recording by specifying start and end times.`,
    params: [
      { name: 'endTime', type: 'number', required: true, description: `End time of the soundbite clip in seconds from the beginning of the recording.` },
      { name: 'startTime', type: 'number', required: true, description: `Start time of the soundbite clip in seconds from the beginning of the recording.` },
      { name: 'transcriptId', type: 'string', required: true, description: `The Fireflies transcript ID of the meeting to clip. Get it from the search or fetch tool.` },
      { name: 'mediaType', type: 'string', required: false, description: `The media type for the soundbite clip (e.g. audio or video).` },
      { name: 'name', type: 'string', required: false, description: `A short label for the soundbite clip.` },
      { name: 'privacies', type: 'array', required: false, description: `Access levels for the soundbite. Pass as a JSON array via the SDK.` },
      { name: 'summary', type: 'string', required: false, description: `A brief description of what this soundbite captures.` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_fetch',
    description: `Retrieve the full transcript, metadata, and insights for a single Fireflies meeting by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The Fireflies transcript ID of the meeting to fetch. Get it from the search tool.` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_get_analytics',
    description: `Retrieve team and per-user meeting analytics for a given date range.`,
    params: [
      { name: 'endTime', type: 'string', required: false, description: `End of the analytics date range (ISO 8601 datetime).` },
      { name: 'startTime', type: 'string', required: false, description: `Start of the analytics date range (ISO 8601 datetime).` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_get_channel',
    description: `Retrieve details of a specific Fireflies channel (folder) by its ID.`,
    params: [
      { name: 'channelId', type: 'string', required: true, description: `The ID of the channel/folder. Get it from the list_channels tool.` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_get_rule_executions',
    description: `Retrieve automation rule execution logs grouped by meeting, with optional filters.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'dateFrom', type: 'string', required: false, description: `Filter rule executions on or after this date (YYYY-MM-DD).` },
      { name: 'dateTo', type: 'string', required: false, description: `Filter rule executions on or before this date (YYYY-MM-DD).` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of items to return.` },
      { name: 'meetingId', type: 'string', required: false, description: `The Fireflies transcript ID of the meeting. Get it from the search tool.` },
      { name: 'ruleId', type: 'string', required: false, description: `The ID of the automation rule to filter by.` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_get_soundbites',
    description: `Fetch a list of soundbite clips, optionally filtered by meeting or ownership.`,
    params: [
      { name: 'format', type: 'string', required: false, description: `Response format. Accepted values: json, text, toon.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of items to return.` },
      { name: 'mine', type: 'boolean', required: false, description: `Set to true to return only your own items.` },
      { name: 'my_team', type: 'boolean', required: false, description: `Set to true to include items from your team members.` },
      { name: 'skip', type: 'number', required: false, description: `Number of items to skip for pagination.` },
      { name: 'transcript_id', type: 'string', required: false, description: `Filter soundbites to a specific meeting transcript ID. Get it from the search tool.` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_get_user',
    description: `Fetch account details for a Fireflies user; defaults to the currently authenticated user.`,
    params: [
      { name: 'userId', type: 'string', required: false, description: `The Fireflies user ID. Leave empty to fetch the currently authenticated user.` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_get_user_contacts',
    description: `Fetch the contact list for the authenticated Fireflies user.`,
    params: [
      { name: 'format', type: 'string', required: false, description: `Response format. Accepted values: json, text, toon.` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_get_usergroups',
    description: `Fetch user groups for the authenticated user or their team.`,
    params: [
      { name: 'mine', type: 'boolean', required: false, description: `Set to true to return only your own items.` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_list_channels',
    description: `List all channels (folders) available to the authenticated user.`,
    params: [
    ],
  },
  {
    name: 'firefliesmcp_fireflies_move_meeting',
    description: `Move one or more meeting transcripts to a specified channel or folder.`,
    params: [
      { name: 'channelId', type: 'string', required: true, description: `The ID of the channel/folder. Get it from the list_channels tool.` },
      { name: 'meetingIds', type: 'array', required: true, description: `Array of meeting IDs / transcript IDs to move (max 5)` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_revoke_meeting_access',
    description: `Revoke a previously shared meeting access for a specific email address.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `The email address of the user whose access to revoke.` },
      { name: 'meetingId', type: 'string', required: true, description: `The Fireflies transcript ID of the meeting. Get it from the search tool.` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_search',
    description: `Search meeting transcripts using keywords or Fireflies mini-grammar syntax.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query using the mini grammar syntax. Can be simple keywords or complex filters using the grammar.` },
      { name: 'format', type: 'string', required: false, description: `Response format. Accepted values: json, text, toon.` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_share_meeting',
    description: `Share a meeting transcript with one or more email addresses.`,
    params: [
      { name: 'emails', type: 'array', required: true, description: `Array of email addresses to share the meeting with (max 100)` },
      { name: 'meetingId', type: 'string', required: true, description: `The Fireflies transcript ID of the meeting. Get it from the search tool.` },
      { name: 'expiryDays', type: 'number', required: false, description: `Number of days before the shared link expires. Leave empty for no expiry.` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_update_meeting_privacy',
    description: `Update the privacy level of a meeting transcript.`,
    params: [
      { name: 'meetingId', type: 'string', required: true, description: `The Fireflies transcript ID of the meeting. Get it from the search tool.` },
      { name: 'privacy', type: 'string', required: true, description: `Who can view this meeting. Accepted values: link, owner, participants, participatingteammates, teammatesandparticipants, teammates.` },
    ],
  },
  {
    name: 'firefliesmcp_fireflies_update_meeting_title',
    description: `Rename a meeting transcript by its ID.`,
    params: [
      { name: 'meetingId', type: 'string', required: true, description: `The Fireflies transcript ID of the meeting. Get it from the search tool.` },
      { name: 'title', type: 'string', required: true, description: `The new title for the meeting transcript.` },
    ],
  },
]
