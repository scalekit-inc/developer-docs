import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'fathommcp_find_person',
    description: `Find a person by name across meeting speakers, then return contact info and compact summaries for matched meetings. Searches the speaker index directly. Use recorded_by = user email for own recordings, "anyone" for org-wide lookups.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The person's name to search for.` },
      { name: 'recorded_by', type: 'string', required: true, description: `Filter by recorder. Use the authenticated user's email for own recordings or 'anyone' for org-wide search.` },
      { name: 'created_after', type: 'string', required: false, description: `ISO 8601 date string. Only search meetings created after this date.` },
    ],
  },
  {
    name: 'fathommcp_get_identity',
    description: `Returns the authenticated user's name and email address. Call this once per session to determine who the authenticated user is. The email is needed only for queries explicitly scoped to the user's own recordings (recorded_by filter), not for every tool call.`,
    params: [
    ],
  },
  {
    name: 'fathommcp_get_meeting_summary',
    description: `Returns the AI summary of a specific Fathom meeting. Required: recording_id (from list_meetings). When presenting, cite with a working link using the meeting url field.`,
    params: [
      { name: 'recording_id', type: 'integer', required: true, description: `The recording ID from list_meetings.` },
    ],
  },
  {
    name: 'fathommcp_get_meeting_transcript',
    description: `Returns the full transcript of a specific Fathom meeting. Required: recording_id (from list_meetings). Pass url to get timestamped deep links. Fetch at most 3 transcripts per query — they are large.`,
    params: [
      { name: 'recording_id', type: 'integer', required: true, description: `The recording ID from list_meetings.` },
      { name: 'url', type: 'string', required: false, description: `The meeting URL from list_meetings for timestamped deep links.` },
    ],
  },
  {
    name: 'fathommcp_get_recording_by_call_id',
    description: `Resolve a Fathom call ID to a recording_id plus title, date, and url. Use when the user pastes or types a numeric call ID. Pass the returned recording_id to get_meeting_summary, get_meeting_transcript, etc.`,
    params: [
      { name: 'call_id', type: 'integer', required: true, description: `The numeric Fathom call ID.` },
    ],
  },
  {
    name: 'fathommcp_get_recording_by_url',
    description: `Resolve a Fathom URL to a recording_id plus title, date, and url. Accepts direct call URLs (/calls/:id) and share links. Use when the user pastes any Fathom link.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `A Fathom call URL or share link.` },
    ],
  },
  {
    name: 'fathommcp_list_meetings',
    description: `List Fathom meetings with filters. Returns recording_id, title, url, recorded_by, calendar_invitees. For team queries call list_teams first. Does NOT scan meeting content — for finding meetings with a specific person use find_person, for topic searches use search_meetings.`,
    params: [
      { name: 'created_after', type: 'string', required: false, description: `ISO 8601 date string. Only return meetings created after this date.` },
      { name: 'created_before', type: 'string', required: false, description: `ISO 8601 date string. Only return meetings created before this date.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from a previous response.` },
      { name: 'include_action_items', type: 'boolean', required: false, description: `Include action items in results.` },
      { name: 'include_summary', type: 'boolean', required: false, description: `Include AI summary in results.` },
      { name: 'max_pages', type: 'integer', required: false, description: `Maximum number of pages to fetch.` },
      { name: 'recorded_by', type: 'array', required: false, description: `Filter by recorder email addresses.` },
      { name: 'teams', type: 'array', required: false, description: `Filter by team names (use list_teams to get valid names).` },
    ],
  },
  {
    name: 'fathommcp_list_teams',
    description: `List all Fathom teams the current user belongs to. Returns team names. Use the returned names for the teams filter in list_meetings. Call list_teams first if you need team names — do not guess them.`,
    params: [
    ],
  },
  {
    name: 'fathommcp_search_meetings',
    description: `Search meeting summaries and titles by topic or keyword (AND logic). Use for finding specific topics, discussions, ideas, or decisions. Use recorded_by = user email for own recordings, "anyone" for org-wide searches.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query. Multiple words use AND logic.` },
      { name: 'recorded_by', type: 'string', required: true, description: `Filter by recorder. Use the authenticated user's email for own recordings or 'anyone' for org-wide search.` },
      { name: 'created_after', type: 'string', required: false, description: `ISO 8601 date string. Only search meetings created after this date.` },
      { name: 'max_pages', type: 'integer', required: false, description: `Maximum number of pages to fetch.` },
    ],
  },
]
