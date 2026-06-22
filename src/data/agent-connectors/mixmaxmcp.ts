import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mixmaxmcp_meetings',
    description: `Query Mixmax meetings and calendar data. Supports actions: get_event, search_events, find_event_by_meet_id, get_calendar, get_meeting_prep, list_meeting_preps, get_meeting_summary, search_meeting_summaries, get_meeting_transcript, get_meeting_assistant_settings, list_meeting_types, get_admin_copilot_settings.`,
    params: [
      { name: 'action', type: 'string', required: true, description: `The action to perform. See the tool description for accepted values.` },
      { name: 'after', type: 'string', required: false, description: `ISO 8601 timestamp. Return events that start after this date and time.` },
      { name: 'attendee', type: 'string', required: false, description: `Email address of the attendee to filter meeting summaries by.` },
      { name: 'before', type: 'string', required: false, description: `ISO 8601 timestamp. Return events that start before this date and time.` },
      { name: 'domain', type: 'string', required: false, description: `Attendee email domain to filter events by (for search_events).` },
      { name: 'emails', type: 'array', required: false, description: `List of email addresses to filter events by.` },
      { name: 'eventId', type: 'string', required: false, description: `The unique calendar event ID (required for get_event).` },
      { name: 'eventType', type: 'string', required: false, description: `Type of calendar event to filter by. Accepted values: default, focusTime, outOfOffice.` },
      { name: 'expand', type: 'string', required: false, description: `Expand events to include additional data. Accepted values: mixmax:summary.` },
      { name: 'from', type: 'string', required: false, description: `ISO 8601 timestamp. Start of the date range for meeting summaries search.` },
      { name: 'includeContext', type: 'boolean', required: false, description: `Whether to include full LLM context in the meeting prep response. Defaults to true.` },
      { name: 'isExternal', type: 'boolean', required: false, description: `When true, filters to external meetings only.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of results to return.` },
      { name: 'meetingId', type: 'string', required: false, description: `The Google Meet ID of the event (required for find_event_by_meet_id).` },
      { name: 'meetingKey', type: 'string', required: false, description: `The unique meeting key returned by search_meeting_summaries. Required for get_meeting_summary and get_meeting_transcript.` },
      { name: 'owner', type: 'string', required: false, description: `Filter meeting summaries by ownership. Accepted values: me, shared, workspace.` },
      { name: 'skip', type: 'number', required: false, description: `Number of results to skip for pagination.` },
      { name: 'title', type: 'string', required: false, description: `Filter meeting summaries by meeting title.` },
      { name: 'to', type: 'string', required: false, description: `ISO 8601 timestamp. End of the date range for meeting summaries search.` },
      { name: 'uniqueKey', type: 'string', required: false, description: `The unique meeting prep key (required for get_meeting_prep).` },
    ],
  },
  {
    name: 'mixmaxmcp_mixmax_info',
    description: `Retrieve general information about the Mixmax account and configuration.`,
    params: [
    ],
  },
  {
    name: 'mixmaxmcp_sequences',
    description: `Query and inspect Mixmax email sequences. Supports actions: list_sequences, get_sequence, get_sequence_insights, find_contact_in_sequences, get_daily_send_count, validate_sequence.`,
    params: [
      { name: 'action', type: 'string', required: true, description: `The action to perform. See the tool description for accepted values.` },
      { name: 'contactEmail', type: 'string', required: false, description: `Email address of the contact to look up in sequences.` },
      { name: 'folder', type: 'string', required: false, description: `Filter sequences by folder name.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of results to return.` },
      { name: 'name', type: 'string', required: false, description: `Filter sequences by name using a substring match.` },
      { name: 'next', type: 'string', required: false, description: `Pagination cursor from the previous response. Use the 'next' field in the response to get the next page.` },
      { name: 'sequenceId', type: 'string', required: false, description: `The unique ID of the sequence (required for get_sequence, get_sequence_insights, and validate_sequence).` },
    ],
  },
]
