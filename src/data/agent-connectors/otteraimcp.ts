import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'otteraimcp_otter_fetch',
    description: `Retrieve the full transcript and metadata for a single OtterAI meeting by its ID, returned by otter_search.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Meeting ID returned by otter_search. Used to retrieve the full transcript from the Otter.ai platform.`,
      },
    ],
  },
  {
    name: 'otteraimcp_otter_get_user_info',
    description: `Return the name and email of the currently authenticated OtterAI user.`,
    params: [],
  },
  {
    name: 'otteraimcp_otter_search',
    description: `Search meetings across platforms by date, attendee, topic, keyword, or title. Returns meeting metadata, AI summaries, outlines, and action items ranked by relevance; supports pagination via cursor.`,
    params: [
      {
        name: 'attended_by',
        type: 'string',
        required: false,
        description: `Optional. Name(s) of the participant(s) who were in the meeting. Case insensitive. Comma-separate multiple names.`,
      },
      {
        name: 'channel_name',
        type: 'string',
        required: false,
        description: `Optional. Name of any channel mentioned. Only include the name without the word channel.`,
      },
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Optional. 'YYYY/MM/DD' format. Start of the date range: only meetings created on or after this date are returned.`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Optional. 'YYYY/MM/DD' format. End of the date range: only meetings created on or before this date are returned.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Optional. The next_cursor value from a previous otter_search response, used to fetch the next page of the same search.`,
      },
      {
        name: 'folder_name',
        type: 'string',
        required: false,
        description: `Optional. Name of any folder mentioned. Only include the name without the word folder.`,
      },
      {
        name: 'include_shared_meetings',
        type: 'string',
        required: false,
        description: `Optional. Whether to include meetings shared with the user. Set to false only when the user explicitly asks for their own meetings.`,
      },
      {
        name: 'keywords_in_transcript',
        type: 'string',
        required: false,
        description: `Optional. Comma separated keywords that could be in the transcript. Case insensitive.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Optional. At most how many meetings to return in this response, between 1 and 25.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Optional. Semantic search query for finding relevant meetings by topic or content.`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: false,
        description: `Optional. Briefly explain why you are calling this tool and how you plan to use the results. Do not include PII or other sensitive information. Maximum 250 characters.`,
      },
      {
        name: 'title_contains',
        type: 'string',
        required: false,
        description: `Optional. Space-delimited list of words, all of which must appear (in any order) in the recording title. Case insensitive.`,
      },
      {
        name: 'username',
        type: 'string',
        required: false,
        description: `Optional. The current user's name from otter_get_user_info, used to mark results as personally attended vs. only shared with the user.`,
      },
    ],
  },
]
