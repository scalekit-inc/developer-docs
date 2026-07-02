import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'otteraimcp_fetch',
    description: `Retrieve the full transcript and metadata for a single OtterAI meeting by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The unique OtterAI meeting ID to fetch. Get it from the search tool.` },
    ],
  },
  {
    name: 'otteraimcp_get_user_info',
    description: `Return the name and email of the currently authenticated OtterAI user.`,
    params: [
    ],
  },
  {
    name: 'otteraimcp_search',
    description: `Search OtterAI meetings by keyword, title, attendee, folder, date range, or transcript content.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Full-text search query to find meetings by title or transcript content.` },
      { name: 'attended_by', type: 'string', required: false, description: `Filter meetings attended by this email address.` },
      { name: 'channel_name', type: 'string', required: false, description: `Filter meetings belonging to this channel or workspace.` },
      { name: 'created_after', type: 'string', required: false, description: `Return only meetings created after this date (YYYY-MM-DD format, e.g. 2025-01-01).` },
      { name: 'created_before', type: 'string', required: false, description: `Return only meetings created before this date (YYYY-MM-DD format, e.g. 2025-12-31).` },
      { name: 'folder_name', type: 'string', required: false, description: `Filter meetings stored in this folder name.` },
      { name: 'include_shared_meetings', type: 'string', required: false, description: `Set to true to include meetings shared with you by others.` },
      { name: 'keywords_in_transcript', type: 'string', required: false, description: `Space-separated keywords that must appear in the transcript.` },
      { name: 'title_contains', type: 'string', required: false, description: `Filter meetings whose title contains this substring.` },
      { name: 'username', type: 'string', required: false, description: `Filter meetings by the Otter.ai username (email) of the meeting owner.` },
    ],
  },
]
