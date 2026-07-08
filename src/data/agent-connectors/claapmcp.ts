import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'claapmcp_get_email',
    description: `Fetch the full email content including the body for a given message ID from the workspace.`,
    params: [
      {
        name: 'messageId',
        type: 'string',
        required: true,
        description: `The email message ID to fetch.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID the email belongs to.`,
      },
    ],
  },
  {
    name: 'claapmcp_get_recording_transcript',
    description: `Fetch the full transcript for a given recording.`,
    params: [
      {
        name: 'recordingId',
        type: 'string',
        required: true,
        description: `The ID of the recording to get the transcript for.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID the recording belongs to.`,
      },
    ],
  },
  {
    name: 'claapmcp_get_recording_view',
    description: `Fetch the rows of a Claap recording view: each row is a recording matching the view filters, with AI-generated insight values for each of the view columns. Workspaces define their own views (common examples: MEDDIC/SPICED qualification, hiring rubrics, objection trackers). Discover available views via list_recording_views.`,
    params: [
      {
        name: 'viewId',
        type: 'string',
        required: true,
        description: `The ID of the recording view to fetch rows for.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID the view belongs to.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as nextCursor by a previous call. Pass verbatim to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
    ],
  },
  {
    name: 'claapmcp_get_recordings',
    description: `Query the recording metadata database with a set of filters. Returns a collection of recording metadata ordered by relevance and creation date descending.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to query recordings from.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as nextCursor by a previous call. Pass verbatim to fetch the next page.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Filters to apply to the recording query.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
      {
        name: 'sort',
        type: 'array',
        required: false,
        description: `Sort dimensions. When omitted, results are ordered by relevance and creation date descending.`,
      },
    ],
  },
  {
    name: 'claapmcp_list_emails',
    description: `List emails across the workspace with metadata (sender, recipients, subject, sent date). Supports filtering by contact, company, deal, or thread. Results are sorted by sent date.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to list emails from.`,
      },
      { name: 'companyId', type: 'string', required: false, description: `Filter by company ID.` },
      {
        name: 'contactId',
        type: 'string',
        required: false,
        description: `Filter by contact ID (sender or recipient).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as nextCursor by a previous call. Pass verbatim to fetch the next page.`,
      },
      { name: 'dealId', type: 'string', required: false, description: `Filter by deal ID.` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `Sort field. Defaults to sentAt.`,
      },
      {
        name: 'sortOrder',
        type: 'string',
        required: false,
        description: `Sort order. Defaults to desc (most recent first).`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: false,
        description: `Filter by email thread ID.`,
      },
    ],
  },
  {
    name: 'claapmcp_list_recording_views',
    description: `List the recording views configured in a Claap workspace. A view is a curated set of recordings enriched with AI-generated insight columns. Common examples include sales qualification frameworks (MEDDIC, SPICED, BANT), hiring rubrics, and objection trackers. Prefer views over get_recordings when a view matches the user question. Use get_recording_view to read a specific view's rows.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to list recording views from.`,
      },
    ],
  },
  {
    name: 'claapmcp_list_workspaces',
    description: `List all Claap workspaces the user has access to.`,
    params: [],
  },
  {
    name: 'claapmcp_search_companies',
    description: `Search the Claap company database.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to search within.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as nextCursor by a previous call. Pass verbatim to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Complete or partial name or domain of the company to search for.`,
      },
      {
        name: 'sort',
        type: 'array',
        required: false,
        description: `Sort dimensions to apply to the search results.`,
      },
    ],
  },
  {
    name: 'claapmcp_search_contacts',
    description: `Search the Claap contact database. Returns both workspace users and external contacts.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to search within.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as nextCursor by a previous call. Pass verbatim to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Complete or partial name, email or domain of the contact to search for.`,
      },
      {
        name: 'sort',
        type: 'array',
        required: false,
        description: `Sort dimensions to apply to the search results. When omitted, results are ordered by relevance.`,
      },
    ],
  },
  {
    name: 'claapmcp_search_deals',
    description: `Search the Claap deal database with filters and sorting options.`,
    params: [
      {
        name: 'filters',
        type: 'object',
        required: true,
        description: `Filters to apply to the search.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to search within.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as nextCursor by a previous call. Pass verbatim to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
      {
        name: 'sort',
        type: 'array',
        required: false,
        description: `Sort dimensions to apply to the search results.`,
      },
    ],
  },
  {
    name: 'claapmcp_search_emails',
    description: `Search email content using semantic or keyword search across the workspace. Returns results as chunks with text snippets and metadata. Multiple results can be related to the same email (different chunks from the same message). Supports filtering by contact, company, or deal.`,
    params: [
      {
        name: 'search',
        type: 'object',
        required: true,
        description: `Search query and technique.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to search within.`,
      },
      { name: 'companyId', type: 'string', required: false, description: `Filter by company ID.` },
      {
        name: 'contactId',
        type: 'string',
        required: false,
        description: `Filter by contact ID (sender or recipient).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor for keyword search pagination. Not supported for semantic search.`,
      },
      { name: 'dealId', type: 'string', required: false, description: `Filter by deal ID.` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
    ],
  },
  {
    name: 'claapmcp_search_recording_transcripts',
    description: `Perform keyword or semantic search on the recording transcript database, with optional filters on the recording metadata. Returns a collection of transcript chunks grouped by recording.`,
    params: [
      {
        name: 'search',
        type: 'object',
        required: true,
        description: `Search query and technique.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to search within.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor for keyword search pagination. Not supported for semantic search.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Filters to apply to the search.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
    ],
  },
]
