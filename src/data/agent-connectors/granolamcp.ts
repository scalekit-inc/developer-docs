import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'granolamcp_get_account_info',
    description: `Get the email, active workspace, and effective note-access scopes for the Granola account currently connected to this MCP session.

When to use:
- User asks 'who am I signed in as?', 'which Granola account is this?', or 'what's my email?'
- User suspects they connected the wrong Granola account
- Meeting results may be incomplete or empty because of the user's Granola plan or workspace MCP access controls
- Before performing actions, to confirm identity if the user references a specific account

When scope-based access controls are active, mcp_note_access.scopes contains the note categories this connection can search:
- personal: notes the connected user owns, notes shared directly with them, and notes accessible through private folders
- public: notes accessible through workspace-visible Team Space folders
- Both scopes means both categories can be searched. These scopes describe access, not who captured or participated in a meeting.`,
    params: [],
  },
  {
    name: 'granolamcp_get_meeting_transcript',
    description: `Get the full transcript for a specific Granola meeting by ID. Returns only the verbatim transcript content, not summaries or notes.
Use this when the user needs exact quotes, specific wording, or wants to review what was literally said in a meeting. For summarized content or action items, use query_granola_meetings or list_meetings/get_meetings instead.`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `Meeting UUID` },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for tool execution`,
      },
    ],
  },
  {
    name: 'granolamcp_get_meetings',
    description: `Get detailed meeting information for one or more Granola meetings by ID. Returns private notes, AI-generated summary, attendees, and metadata.
Use this when you already have specific meeting IDs (e.g. from list_meetings results). For open-ended questions about meeting content, use query_granola_meetings instead.`,
    params: [
      {
        name: 'meeting_ids',
        type: 'array',
        required: true,
        description: `Array of meeting UUIDs (max 10)`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for tool execution`,
      },
    ],
  },
  {
    name: 'granolamcp_list_meeting_folders',
    description: `List the user's Granola meeting folders. Returns folder ID, title, description, and note count including nested folders.

When to use:
- User asks about their folders or wants to browse meetings by folder
- User wants to narrow down meeting searches to a specific folder

Use the returned folder IDs with list_meetings (folder_id parameter) to list meetings within a specific folder.`,
    params: [],
  },
  {
    name: 'granolamcp_list_meetings',
    description: `List the user's Granola meeting notes within a time range. Returns meeting titles and metadata.

IMPORTANT: For short-term questions about recent meeting details, prefer using query_granola_meetings instead.

When to use:
- User asks to list their meetings
- User asks about action items, decisions, or summaries from meetings over a longer or specific date range
- User asks about content from their meeting transcripts
- User references 'Granola notes' or 'meeting notes' or 'transcripts'

When NOT to use:
- User is asking about upcoming calendar events or scheduling
- User wants to create/modify calendar invites

Filtering:
- Omit workspace_only and involvement to return every meeting the user is allowed to access
- For 'my meetings' or meetings the user was involved in, set both involvement conditions to true; true conditions combine using OR
- Set captured_by_me to true for meetings whose Granola notes the user captured, or false to exclude them
- Set listed_as_participant to true for meetings where the user is a known participant, or false to exclude them
- False involvement conditions are exclusions and combine with the positive conditions using AND; omit a condition to ignore it
- For Team Space or public workspace meetings, set workspace_only to true
- workspace_only and involvement combine using AND

Use get_meetings to retrieve detailed meeting content after identifying relevant meetings.
Use list_meeting_folders to discover folder IDs, then pass a folder_id to list meetings within a specific folder.`,
    params: [
      {
        name: 'involvement',
        type: 'object',
        required: false,
        description: `Optional involvement filter. Conditions set to true form an OR inclusion group. Conditions set to false are exclusions applied using AND. Omitted conditions are ignored.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'time_range',
        type: 'string',
        required: false,
        description: `Time range to query meetings from`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for tool execution`,
      },
      {
        name: 'workspace_only',
        type: 'boolean',
        required: false,
        description: `Set to true only when the user explicitly asks for Team Space, public workspace, or workspace-visible meetings. Omit to search every meeting the user is allowed to access.`,
      },
    ],
  },
  {
    name: 'granolamcp_query_granola_meetings',
    description: `Query Granola about the user's meetings using natural language. Returns a tailored response with inline citation links in mark  (e.g. [[0]](url)) that reference source meeting notes.

IMPORTANT: The response includes numbered citation links to specific Granola meeting notes. These citations MUST be preserved in your response to the user — they provide transparency and allow the user to verify information by clicking through to the original notes.

When to use:
- User asks about what was discussed, decided, or action-items from meetings
- User asks about follow-ups, todos, or commitments from recent meetings
- User references 'Granola notes' or 'meeting notes'

When NOT to use:
- User is asking about calendar scheduling or upcoming events
- User explicitly asks for a specific meeting by ID (use get_meetings instead)

Prioritize using query_granola_meetings over list_meetings/get_meetings for open-ended or natural language queries about meeting content.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The query to run on Granola meeting notes`,
      },
      {
        name: 'document_ids',
        type: 'array',
        required: false,
        description: `Optional list of specific meeting IDs to limit context to`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for tool execution`,
      },
    ],
  },
]
