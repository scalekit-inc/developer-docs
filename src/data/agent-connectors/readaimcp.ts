import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'readaimcp_create_meeting_agent',
    description: `Send a Read AI meeting agent (bot) to a video conferencing meeting to record and transcribe it. Supports Zoom, Google Meet, and Microsoft Teams. The agent joins the meeting automatically and produces a recording, transcript, and AI-generated summary upon completion.

When to use: Use this tool to dispatch a Read AI bot to an upcoming or in-progress meeting so it can record and transcribe the session. Provide either a meeting_url (simplest) or a meeting_platform + meeting_id combination. Use start_time to schedule the bot for a future meeting.

When NOT to use: Do not use this tool to retrieve meeting content — use get_meeting_by_id or list_meetings instead. Do not use this tool for meetings on unsupported platforms.`,
    params: [
      {
        name: 'meeting_id',
        type: 'string',
        required: false,
        description: `The platform-specific meeting identifier. Required unless meeting_url is provided.`,
      },
      {
        name: 'meeting_password',
        type: 'string',
        required: false,
        description: `Optional meeting passcode/password if required to join.`,
      },
      {
        name: 'meeting_platform',
        type: 'string',
        required: false,
        description: `The video meeting platform (e.g. 'zoom', 'meet', 'teams'). Required unless meeting_url is provided.`,
      },
      {
        name: 'meeting_url',
        type: 'string',
        required: false,
        description: `Optional full meeting URL. When provided, meeting_platform and meeting_id are derived from the URL automatically.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Optional start time in ISO 8601 format. If omitted, the agent joins the meeting immediately.`,
      },
    ],
  },
  {
    name: 'readaimcp_get_meeting_by_id',
    description: `Retrieve a single Read AI meeting by its ULID identifier, with optional expansion of rich meeting content such as summary, transcript, action items, topics, metrics, and recording download link.

When to use: Use this tool when you need full details about a specific meeting you already know the ID for — for example, to fetch the transcript, action items, or chapter summaries after a meeting completes.

When NOT to use: Do not use this tool to search or browse meetings by date or keyword — use list_meetings instead.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Meeting ULID — the unique 26-character identifier for the meeting.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `List of expandable fields to include in the response. When omitted, only base meeting metadata is returned.`,
      },
    ],
  },
  {
    name: 'readaimcp_list_meetings',
    description: `List Read AI meetings for the authenticated user with optional start-time filters and cursor-based pagination. Returns up to 10 meetings per page.

When to use: Use this tool to browse, search, or paginate through meetings — for example, to find all meetings within a date range, retrieve recent meetings, or iterate through all meetings using cursor-based pagination.

When NOT to use: Do not use this tool when you already know the meeting ULID and need full content — use get_meeting_by_id instead.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Pass the ULID of the last meeting from the previous page to retrieve the next page.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `List of expandable fields to include in the response for each meeting. When omitted, only base metadata is returned.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results to return per page. Maximum is 10.`,
      },
      {
        name: 'start_datetime_gt',
        type: 'string',
        required: false,
        description: `Only return meetings with start times strictly after this datetime (exclusive lower bound). ISO 8601 format.`,
      },
      {
        name: 'start_datetime_gte',
        type: 'string',
        required: false,
        description: `Only return meetings with start times on or after this datetime (inclusive lower bound). ISO 8601 format.`,
      },
      {
        name: 'start_datetime_lt',
        type: 'string',
        required: false,
        description: `Only return meetings with start times strictly before this datetime (exclusive upper bound). ISO 8601 format.`,
      },
      {
        name: 'start_datetime_lte',
        type: 'string',
        required: false,
        description: `Only return meetings with start times on or before this datetime (inclusive upper bound). ISO 8601 format.`,
      },
    ],
  },
]
