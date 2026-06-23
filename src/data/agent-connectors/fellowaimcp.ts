import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'fellowaimcp_get_action_items',
    description: `Fetch action items assigned to the user, filtered by date range or status (overdue, completed, or ongoing).`,
    params: [
      {
        name: 'check_for_team_action_items',
        type: 'string',
        required: false,
        description: `Set this value to true if user wants to check for action items assigned to the user's team. Only works if user is a manager. Optional`,
      },
      {
        name: 'from_date',
        type: 'string',
        required: false,
        description: `The start date of the range to get the action items from. Must be a valid ISO 8601 date string. Optional Field, if not provided, it will be ignored.`,
      },
      {
        name: 'is_overdue',
        type: 'string',
        required: false,
        description: `Set this value to true if user wants only overdue action items. Optional`,
      },
      {
        name: 'meeting_ids',
        type: 'string',
        required: false,
        description: `List of meeting IDs to filter action items by. Must be provided as an array/list, for example: ['meeting_id_1', 'meeting_id_2']. Optional.`,
      },
      {
        name: 'note_id',
        type: 'string',
        required: false,
        description: `The ID of the note to filter action items by. Optional`,
      },
      {
        name: 'notestream_id',
        type: 'string',
        required: false,
        description: `The ID of the notestream to filter action items by. Optional`,
      },
      {
        name: 'only_completed_action_items',
        type: 'string',
        required: false,
        description: `Set this value to true if user wants only completed/done action items. Optional`,
      },
      {
        name: 'only_ongoing_action_items',
        type: 'string',
        required: false,
        description: `Set this value to true, if user only wants to get ongoing action items. Optional`,
      },
      {
        name: 'to_date',
        type: 'string',
        required: false,
        description: `The end date of the range to get the action items from. Must be a valid ISO 8601 date string. Optional Field, if not provided, it will be ignored.`,
      },
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `The topic of the action items to get. Optional`,
      },
    ],
  },
  {
    name: 'fellowaimcp_get_channel_details',
    description: `Retrieve detailed information about a specific channel by its ID.`,
    params: [
      {
        name: 'channel_id',
        type: 'integer',
        required: true,
        description: `The ID of the channel to get details for. Use list_channels to find channel IDs.`,
      },
    ],
  },
  {
    name: 'fellowaimcp_get_meeting_participants',
    description: `Retrieve all participants of a meeting, including calendar attendees and note users.`,
    params: [
      {
        name: 'meeting_id',
        type: 'string',
        required: false,
        description: `The ID of the meeting to get the participants for. Optional`,
      },
      {
        name: 'note_id',
        type: 'string',
        required: false,
        description: `The ID of the note to get the participants for. Optional`,
      },
    ],
  },
  {
    name: 'fellowaimcp_get_meeting_summary',
    description: `Fetch summaries for one or more meetings, including key points, decisions, and action items.`,
    params: [
      {
        name: 'meeting_ids',
        type: 'string',
        required: false,
        description: `List of meeting IDs to get summaries for. Must be provided as an array/list, for example: ['meeting_id_1', 'meeting_id_2']. Optional.`,
      },
      {
        name: 'note_id',
        type: 'string',
        required: false,
        description: `The ID of the note to get the summary for. Optional`,
      },
    ],
  },
  {
    name: 'fellowaimcp_get_meeting_transcript',
    description: `Retrieve the transcript of a meeting. For meetings 15+ minutes, use start_time and end_time to fetch a specific segment.`,
    params: [
      {
        name: 'end_time',
        type: 'string',
        required: false,
        description: `End time from beginning of recording (seconds, MM:SS, or HH:MM:SS format). If specified, minimum time range of 300s (5 minutes) is required.`,
      },
      {
        name: 'meeting_id',
        type: 'string',
        required: false,
        description: `The ID of the meeting to get the transcript for. Optional`,
      },
      {
        name: 'note_id',
        type: 'string',
        required: false,
        description: `The ID of the note to get the transcript for. Optional`,
      },
      {
        name: 'recording_id',
        type: 'string',
        required: false,
        description: `The ID of a specific recording/part to get. Optional. Use this for multi-part meetings when you need a specific part's transcript.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Start time from beginning of recording (seconds, MM:SS, or HH:MM:SS format). If specified, minimum time range of 300s (5 minutes) is required.`,
      },
    ],
  },
  {
    name: 'fellowaimcp_list_channels',
    description: `List all available channels in the workspace, optionally filtered by name or type.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional filter: channel name (case-insensitive partial match)`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Optional filter: channel type (public or private)`,
      },
    ],
  },
  {
    name: 'fellowaimcp_search_meetings',
    description: `Search for meetings across calendar events and notes, with filters for participants, date range, content, and summary.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `The ID of the channel to filter the meetings by. This is used to limit the search to a subset of all possible meetings the user has access to. Optional.`,
      },
      {
        name: 'from_date',
        type: 'string',
        required: false,
        description: `The start date of the range to get meetings from (inclusive). ISO 8601 date string format. Used to filter meetings by start date. Optional but its use it's highly recommended.`,
      },
      {
        name: 'has_external_participants',
        type: 'string',
        required: false,
        description: `Whether to filter meetings that have external participants. Optional.`,
      },
      {
        name: 'has_summary',
        type: 'string',
        required: false,
        description: `Whether to filter meetings that have a summary or not. If you are trying to answer a question that depends on meeting content, most of the time you will want to use this since most meetings without summary are not useful. If you don't get the results you expect, you can try again without this parameter but using 'note'. Optional.`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `A search query to match against meeting notes content. Used to search in meeting notes content. Optional but recommended.`,
      },
      {
        name: 'note_id',
        type: 'string',
        required: false,
        description: `The ID of the note to filter the meetings by. Optional.`,
      },
      {
        name: 'note_summary',
        type: 'string',
        required: false,
        description: `A semantic search query to search within meeting note summaries. This should be used specifically for searching past meetings with generated summaries. For best results, include the core of the user's question or prompt here rather than just keywords, as the semantic search works better with full context. If the question include things covered by other parameter like attendees, meeting title, etc, rephrase the question to NOT include those. Ideally this should be used in conjunction with the keyword based search of 'note' since some notes may have the relevant information but have no summaries. If no results are found with 'note_summary' or 'has_external_participants', use 'note'. Optional but recommended.`,
      },
      {
        name: 'notestream_id',
        type: 'string',
        required: false,
        description: `The ID of the note stream to filter the meetings by. Optional.`,
      },
      {
        name: 'participant_email_domains',
        type: 'string',
        required: false,
        description: `List of email domains to filter meetings by participant domains (AND match). Must be provided as an array/list, for example: ['company.com', 'partner.com']. Optional.`,
      },
      {
        name: 'participant_emails',
        type: 'string',
        required: false,
        description: `List of email addresses to filter meetings by participants (AND match). Must be provided as an array/list, for example: ['user1@company.com', 'user2@company.com']. Optional.`,
      },
      {
        name: 'participant_full_names',
        type: 'string',
        required: false,
        description: `List of full names to filter meetings by participants (AND match). Must be provided as an array/list, for example: ['John Smith', 'Jane Doe']. Optional.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `A simple keyword based search query to match against meeting titles. Used to search in meeting titles across all sources. Optional.`,
      },
      {
        name: 'to_date',
        type: 'string',
        required: false,
        description: `The end date of the range to get meetings from (inclusive). ISO 8601 date string format. Used to filter meetings by end date. If it's obvious that the thing we are looking for is in the past, do set this field to the current date. Optional but its use it's highly recommended.`,
      },
      {
        name: 'transcript',
        type: 'string',
        required: false,
        description: `A search query to match against meeting transcripts. Used to perform semantic search in meeting transcripts quotes. This does not include the speaker. Optional.`,
      },
      {
        name: 'transcript_speaker',
        type: 'string',
        required: false,
        description: `The speaker to filter the transcripts by. It could be someone who is mentioning somebody or something. Use this parameter to filter transcripts by a specific speaker's name. This is particularly useful when searching for statements or mentions made by a particular person. Optional.`,
      },
      {
        name: 'user_has_calendar_event',
        type: 'string',
        required: false,
        description: `IMPORTANT: Set this to True when the user asks about their OWN meetings. This includes phrases like: 'my meetings', 'meetings I had', 'meetings I attended', 'meetings on my calendar', 'my calls', 'meetings I was in', or any query that implies the user wants meetings they personally participated in (not just meetings they have access to). When True, results are filtered to only include meetings where the user was an invited attendee.`,
      },
    ],
  },
]
