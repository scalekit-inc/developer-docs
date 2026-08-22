import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'otteraimcp_fetch',
    description: `[STALE: upstream renamed this tool to \`otter_fetch\` as of 2026-08-19 refresh; left in repo per policy, not deleted — see otteraimcp_otter_fetch] Retrieve the full transcript and metadata for a single OtterAI meeting by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique OtterAI meeting ID to fetch. Get it from the search tool.`,
      },
    ],
  },
  {
    name: 'otteraimcp_get_user_info',
    description: `[STALE: upstream renamed this tool to \`otter_get_user_info\` as of 2026-08-19 refresh; left in repo per policy, not deleted — see otteraimcp_otter_get_user_info] Return the name and email of the currently authenticated OtterAI user.`,
    params: [],
  },
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
  {
    name: 'otteraimcp_search',
    description: `[STALE: upstream renamed this tool to \`otter_search\` as of 2026-08-19 refresh; left in repo per policy, not deleted — see otteraimcp_otter_search] Search OtterAI meetings by keyword, title, attendee, folder, date range, or transcript content.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Full-text search query to find meetings by title or transcript content.`,
      },
      {
        name: 'attended_by',
        type: 'string',
        required: false,
        description: `Filter meetings attended by this email address.`,
      },
      {
        name: 'channel_name',
        type: 'string',
        required: false,
        description: `Filter meetings belonging to this channel or workspace.`,
      },
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Return only meetings created after this date (YYYY-MM-DD format, e.g. 2025-01-01).`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Return only meetings created before this date (YYYY-MM-DD format, e.g. 2025-12-31).`,
      },
      {
        name: 'folder_name',
        type: 'string',
        required: false,
        description: `Filter meetings stored in this folder name.`,
      },
      {
        name: 'include_shared_meetings',
        type: 'string',
        required: false,
        description: `Set to true to include meetings shared with you by others.`,
      },
      {
        name: 'keywords_in_transcript',
        type: 'string',
        required: false,
        description: `Space-separated keywords that must appear in the transcript.`,
      },
      {
        name: 'title_contains',
        type: 'string',
        required: false,
        description: `Filter meetings whose title contains this substring.`,
      },
      {
        name: 'username',
        type: 'string',
        required: false,
        description: `Filter meetings by the Otter.ai username (email) of the meeting owner.`,
      },
    ],
  },
]
