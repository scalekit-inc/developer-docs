import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'grain_hook_create',
    description: `Register a webhook (hook) that Grain calls with an HTTP POST whenever the given event type occurs — new/updated/deleted recordings, highlights, or stories, or upload processing status changes.`,
    params: [
      {
        name: 'hook_type',
        type: 'string',
        required: true,
        description: `The event type this webhook subscribes to.`,
      },
      {
        name: 'hook_url',
        type: 'string',
        required: true,
        description: `HTTPS URL that Grain will POST event payloads to.`,
      },
    ],
  },
  {
    name: 'grain_hook_delete',
    description: `Delete a registered Grain webhook so it stops receiving event calls.`,
    params: [
      {
        name: 'hook_id',
        type: 'string',
        required: true,
        description: `UUID of the webhook to delete. Use grain_hooks_list to discover hook ids.`,
      },
    ],
  },
  {
    name: 'grain_hooks_list',
    description: `List the webhooks (hooks) registered on the Grain workspace, optionally filtered by event type or enabled/disabled state.`,
    params: [
      {
        name: 'hook_type',
        type: 'string',
        required: false,
        description: `Only return webhooks subscribed to this event type.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Only return webhooks in this state.`,
      },
    ],
  },
  {
    name: 'grain_meeting_types_list',
    description: `List the meeting types configured in the Grain workspace, with their id, name, and scope (internal or external). Use this to resolve meeting type ids needed by grain_recordings_list.`,
    params: [],
  },
  {
    name: 'grain_recording_download',
    description: `Download the underlying media file for a Grain recording (video/mp4 or audio/mp3, depending on the recording's media_type).`,
    params: [
      {
        name: 'recording_id',
        type: 'string',
        required: true,
        description: `UUID of the recording to download.`,
      },
    ],
  },
  {
    name: 'grain_recording_get',
    description: `Get a single Grain recording by id, with optional inclusion of highlights, participants, AI summary/action items, private notes, calendar event, HubSpot links, and screenshares.`,
    params: [
      {
        name: 'recording_id',
        type: 'string',
        required: true,
        description: `UUID of the recording to fetch. Use grain_recordings_list to discover recording ids.`,
      },
      {
        name: 'include_ai_action_items',
        type: 'boolean',
        required: false,
        description: `Include AI-detected action items in the response.`,
      },
      {
        name: 'include_ai_summary',
        type: 'boolean',
        required: false,
        description: `Include the AI-generated meeting summary in the response.`,
      },
      {
        name: 'include_calendar_event',
        type: 'boolean',
        required: false,
        description: `Include the linked calendar event details in the response.`,
      },
      {
        name: 'include_highlights',
        type: 'boolean',
        required: false,
        description: `Include the recording's highlights in the response.`,
      },
      {
        name: 'include_hubspot',
        type: 'boolean',
        required: false,
        description: `Include linked HubSpot company and deal ids in the response.`,
      },
      {
        name: 'include_participants',
        type: 'boolean',
        required: false,
        description: `Include the recording's participant list in the response.`,
      },
      {
        name: 'include_private_notes',
        type: 'boolean',
        required: false,
        description: `Personal Access Token only. Include the caller's private notes on the recording.`,
      },
      {
        name: 'include_screenshares',
        type: 'boolean',
        required: false,
        description: `Include screenshare timing segments in the response.`,
      },
    ],
  },
  {
    name: 'grain_recording_share_team',
    description: `Share a Grain recording with a specific team, granting all of the team's members access to view it.`,
    params: [
      {
        name: 'recording_id',
        type: 'string',
        required: true,
        description: `UUID of the recording to share.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `UUID of the team to share the recording with. Use grain_teams_list to discover team ids.`,
      },
    ],
  },
  {
    name: 'grain_recording_share_user',
    description: `Share a Grain recording with a specific workspace user, granting them access to view it.`,
    params: [
      {
        name: 'recording_id',
        type: 'string',
        required: true,
        description: `UUID of the recording to share.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `UUID of the workspace user to share the recording with. Use grain_users_list to discover user ids.`,
      },
    ],
  },
  {
    name: 'grain_recording_tag_add',
    description: `Add a tag to a Grain recording, for later filtering and organization.`,
    params: [
      {
        name: 'recording_id',
        type: 'string',
        required: true,
        description: `UUID of the recording to tag.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `Tag to add. Must start with a letter or digit and contain only letters, digits, and hyphens.`,
      },
    ],
  },
  {
    name: 'grain_recording_tag_remove',
    description: `Remove a tag from a Grain recording.`,
    params: [
      {
        name: 'recording_id',
        type: 'string',
        required: true,
        description: `UUID of the recording to remove the tag from.`,
      },
      { name: 'tag', type: 'string', required: true, description: `Exact tag name to remove.` },
    ],
  },
  {
    name: 'grain_recording_transcript_get',
    description: `Get the structured JSON transcript of a Grain recording: an array of segments, each with a start/end timestamp (ms), the spoken text, and the speaker's name and participant id.`,
    params: [
      {
        name: 'recording_id',
        type: 'string',
        required: true,
        description: `UUID of the recording whose transcript should be fetched.`,
      },
    ],
  },
  {
    name: 'grain_recording_transcript_text_get',
    description: `Get a Grain recording's transcript as plain text, WebVTT, or SRT — ready to display or feed into subtitle/captioning tools, instead of the structured JSON segments returned by grain_recording_transcript_get.`,
    params: [
      {
        name: 'format',
        type: 'string',
        required: true,
        description: `Text format to return: 'txt' (speaker name + text per line), 'vtt' (WebVTT), or 'srt' (SubRip subtitles).`,
      },
      {
        name: 'recording_id',
        type: 'string',
        required: true,
        description: `UUID of the recording whose transcript should be fetched.`,
      },
    ],
  },
  {
    name: 'grain_recording_unshare_team',
    description: `Revoke a team's shared access to a Grain recording.`,
    params: [
      {
        name: 'recording_id',
        type: 'string',
        required: true,
        description: `UUID of the recording to unshare.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `UUID of the team whose access should be revoked.`,
      },
    ],
  },
  {
    name: 'grain_recording_unshare_user',
    description: `Revoke a workspace user's shared access to a Grain recording.`,
    params: [
      {
        name: 'recording_id',
        type: 'string',
        required: true,
        description: `UUID of the recording to unshare.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `UUID of the workspace user whose access should be revoked.`,
      },
    ],
  },
  {
    name: 'grain_recording_update',
    description: `Update a Grain recording's title.`,
    params: [
      {
        name: 'recording_id',
        type: 'string',
        required: true,
        description: `UUID of the recording to update.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `New title for the recording.`,
      },
    ],
  },
  {
    name: 'grain_recording_upload_url_create',
    description: `Generate a one-time upload URL for adding a new recording to Grain. After calling this, PUT the raw file bytes (.mov, .mp4, .mp3, or .m4a) to the returned url; Grain processes the file asynchronously and reports progress via 'upload_status' webhooks.`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `Name of the file to upload, including its extension. Supported extensions: .mov, .mp4, .mp3, .m4a.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `UUID of the workspace user who should own the uploaded recording. Required when authenticating with a Workspace Access Token; not used with a Personal Access Token. Use grain_users_list to discover user ids.`,
      },
    ],
  },
  {
    name: 'grain_recordings_list',
    description: `List meeting recordings in the Grain workspace (or, with a Personal Access Token, the caller's own recordings). Supports filtering by date range, title search, team, meeting type, attendance, and participant scope, plus optional inclusion of highlights, participants, AI summary/action items, and more. Returns a page of recordings and a cursor for the next page.`,
    params: [
      {
        name: 'after_datetime',
        type: 'string',
        required: false,
        description: `Only return recordings whose start_datetime is after this ISO8601 timestamp (inclusive).`,
      },
      {
        name: 'attendance',
        type: 'string',
        required: false,
        description: `Personal Access Token only. 'hosted' returns only recordings the caller hosted; 'attended' returns only recordings the caller attended.`,
      },
      {
        name: 'before_datetime',
        type: 'string',
        required: false,
        description: `Only return recordings whose start_datetime is before this ISO8601 timestamp (exclusive).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's cursor field, used to fetch the next page.`,
      },
      {
        name: 'include_ai_action_items',
        type: 'boolean',
        required: false,
        description: `Include AI-detected action items in the response.`,
      },
      {
        name: 'include_ai_summary',
        type: 'boolean',
        required: false,
        description: `Include the AI-generated meeting summary in the response.`,
      },
      {
        name: 'include_calendar_event',
        type: 'boolean',
        required: false,
        description: `Include the linked calendar event details in the response.`,
      },
      {
        name: 'include_highlights',
        type: 'boolean',
        required: false,
        description: `Include each recording's highlights in the response.`,
      },
      {
        name: 'include_hubspot',
        type: 'boolean',
        required: false,
        description: `Include linked HubSpot company and deal ids in the response.`,
      },
      {
        name: 'include_participants',
        type: 'boolean',
        required: false,
        description: `Include each recording's participant list in the response.`,
      },
      {
        name: 'include_private_notes',
        type: 'boolean',
        required: false,
        description: `Personal Access Token only. Include the caller's private notes on each recording.`,
      },
      {
        name: 'include_screenshares',
        type: 'boolean',
        required: false,
        description: `Include screenshare timing segments in the response.`,
      },
      {
        name: 'meeting_type_id',
        type: 'string',
        required: false,
        description: `Only return recordings matching this meeting type id (UUID). Use grain_meeting_types_list to discover meeting type ids.`,
      },
      {
        name: 'participant_scope',
        type: 'string',
        required: false,
        description: `'internal' returns only internal/team meetings; 'external' returns only external/customer meetings.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Only return recordings belonging to this team id (UUID). Use grain_teams_list to discover team ids.`,
      },
      {
        name: 'title_search',
        type: 'string',
        required: false,
        description: `Return recordings whose title matches this search string.`,
      },
    ],
  },
  {
    name: 'grain_teams_list',
    description: `List the teams configured in the Grain workspace, with their id and name. Use this to resolve team ids needed by other tools such as grain_recording_share_team or grain_recordings_list.`,
    params: [],
  },
  {
    name: 'grain_users_list',
    description: `List the users in the Grain workspace, with their id, name, and email. Use this to resolve user ids needed by other tools such as grain_recording_share_user or grain_recording_upload_url_create.`,
    params: [],
  },
]
