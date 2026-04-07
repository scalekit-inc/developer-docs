import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'granola_note_get',
    description: `Retrieve a single Granola meeting note by its ID. Returns the full note including title, owner, calendar event details, attendees, folder memberships, and AI-generated summary. Optionally include the full transcript with speaker labels and timestamps.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Pass 'transcript' to include the full meeting transcript with speaker source and timestamps.`,
      },
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the note to retrieve. Format: not_XXXXXXXXXXXXXX.`,
      },
    ],
  },
  {
    name: 'granola_notes_list',
    description: `List all accessible meeting notes in the Granola workspace with pagination and date filtering. Returns note IDs, titles, owners, calendar event details, attendees, folder memberships, and AI-generated summaries. Only notes shared in workspace-wide folders are accessible.`,
    params: [
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Filter notes created on or after this date. ISO 8601 format (e.g., 2024-01-01 or 2024-01-01T00:00:00Z).`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Filter notes created before this date. ISO 8601 format (e.g., 2024-12-31 or 2024-12-31T23:59:59Z).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of notes to return per page (1–30). Defaults to 10.`,
      },
      {
        name: 'updated_after',
        type: 'string',
        required: false,
        description: `Filter notes updated after this date. ISO 8601 format (e.g., 2024-06-01 or 2024-06-01T00:00:00Z).`,
      },
    ],
  },
]
