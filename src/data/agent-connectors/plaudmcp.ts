import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'plaudmcp_get_current_user',
    description: `Get details of the currently authenticated Plaud account.`,
    params: [],
  },
  {
    name: 'plaudmcp_get_file',
    description: `Get details of a specific Plaud recording by ID, including name, timestamps, duration, transcript segments, AI notes, and a temporary audio download URL.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The file ID of the recording to retrieve. Use list_files to look up IDs.`,
      },
    ],
  },
  {
    name: 'plaudmcp_get_note',
    description: `Fetch AI-generated notes for a Plaud recording - compact summary, action items, and key topics, returned as Markdown blocks.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The file ID of the recording to retrieve notes for. Use list_files to look up IDs.`,
      },
    ],
  },
  {
    name: 'plaudmcp_get_transcript',
    description: `Fetch the timestamped transcript with speaker attribution for a Plaud recording. Defaults to the \`transaction\` block (raw transcript with speaker names and timestamps), returned one page of utterances at a time - call again with the returned \`next_cursor\` to fetch the next page. Set \`block\` to \`outline\` or \`transaction_polish\` to fetch those blocks instead.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The file ID of the recording to retrieve the transcript for. Use list_files to look up IDs.`,
      },
      {
        name: 'block',
        type: 'string',
        required: false,
        description: `Which source block to fetch: \`transaction\` (default; raw transcript with speaker and timestamps), \`transaction_polish\` (AI-cleaned transcript; same per-utterance shape, keeps speaker and timestamps), or \`outline\`.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a previous call's \`next_cursor\`. Omit to start from the first utterance.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of utterances to return in this page (default 50, max 500). Only applies to blocks returned as an utterance list.`,
      },
    ],
  },
  {
    name: 'plaudmcp_list_files',
    description: `List Plaud recordings. Supports optional filtering: \`query\` (case-insensitive name substring), \`date_from\`/\`date_to\` (YYYY-MM-DD, inclusive). When any filter is set, paginates up to 5 pages x 100 recordings and returns all matches.`,
    params: [
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Start date, inclusive, in YYYY-MM-DD format. Interpreted in the server's timezone.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `End date, inclusive, in YYYY-MM-DD format. Interpreted in the server's timezone.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number (ignored when filters are set). Defaults to 1.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of recordings to return per page (ignored when filters are set). Defaults to 20.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Case-insensitive substring match on the recording name.`,
      },
    ],
  },
]
