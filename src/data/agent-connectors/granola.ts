import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'granola_audit_events_list',
    description: `List paginated audit events for the Granola workspace, optionally filtered by action (exact match or prefix) and a date range.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Filter by an exact action name or prefix, e.g. 'note.' to match all note-related actions.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page of results.`,
      },
      {
        name: 'occurred_after',
        type: 'string',
        required: false,
        description: `Only return events that occurred on or after this date. ISO 8601 format (e.g., 2024-01-01 or 2024-01-01T00:00:00Z).`,
      },
      {
        name: 'occurred_before',
        type: 'string',
        required: false,
        description: `Only return events that occurred before this date. ISO 8601 format (e.g., 2024-12-31 or 2024-12-31T23:59:59Z).`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of audit events to return per page (1-30). Defaults to 10.`,
      },
    ],
  },
  {
    name: 'granola_folders_list',
    description: `List all folders accessible in the Granola workspace, with pagination. Use folder IDs from this tool to filter notes or scope webhook endpoints.`,
    params: [
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
        description: `Number of folders to return per page (1-30). Defaults to 10.`,
      },
    ],
  },
  {
    name: 'granola_note_get',
    description: `Retrieve a single Granola meeting note by its ID. Returns the full note including title, owner, calendar event details, attendees, folder memberships, and AI-generated summary. Optionally include the full transcript with speaker labels and timestamps.`,
    params: [
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the note to retrieve. Format: not_XXXXXXXXXXXXXX.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Pass 'transcript' to include the full meeting transcript with speaker source and timestamps.`,
      },
    ],
  },
  {
    name: 'granola_note_transcript_get',
    description: `Retrieve the full meeting transcript for a Granola note, paginated with a cursor. Use this instead of granola_note_get's include=transcript option when a transcript is too large to inline, or when you need to page through a long transcript explicitly.`,
    params: [
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the note whose transcript should be retrieved. Format: not_XXXXXXXXXXXXXX.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response to fetch the next page of transcript entries.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of transcript entries to return per page (1-100). Defaults to 50.`,
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
  {
    name: 'granola_webhook_endpoint_create',
    description: `Register a new HTTPS webhook endpoint to receive Granola event deliveries (e.g. note generated or edited). Returns a signing_secret used to verify delivered payloads.`,
    params: [
      {
        name: 'scopes',
        type: 'array',
        required: true,
        description: `Which note visibility scopes this endpoint should receive events for. At least one of: personal, public, workspace.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The publicly reachable HTTPS URL that Granola should deliver events to.`,
      },
      {
        name: 'events',
        type: 'array',
        required: false,
        description: `Which event types to subscribe to. If omitted, defaults to all event types. At least one of: note.access_granted, note.edited, note.generated.`,
      },
      {
        name: 'folder_ids',
        type: 'array',
        required: false,
        description: `Restrict delivered events to notes in these folders only (up to 100 folder IDs). If omitted, events are not filtered by folder.`,
      },
    ],
  },
  {
    name: 'granola_webhook_endpoint_delete',
    description: `Permanently remove a Granola webhook endpoint. Event deliveries to it stop immediately.`,
    params: [
      {
        name: 'webhook_endpoint_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the webhook endpoint to delete. Format: whe_XXXXXXXXXXXXXX.`,
      },
    ],
  },
  {
    name: 'granola_webhook_endpoint_update',
    description: `Update an existing Granola webhook endpoint's URL, scopes, subscribed events, folder filter, or enabled state. Only the fields provided are changed.`,
    params: [
      {
        name: 'webhook_endpoint_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the webhook endpoint to update. Format: whe_XXXXXXXXXXXXXX.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Enable or disable this webhook endpoint without deleting it.`,
      },
      {
        name: 'events',
        type: 'array',
        required: false,
        description: `New set of event types to subscribe to. At least one of: note.access_granted, note.edited, note.generated.`,
      },
      {
        name: 'folder_ids',
        type: 'array',
        required: false,
        description: `New list of folder IDs to restrict delivered events to (up to 100). Pass an empty array to remove the folder filter entirely.`,
      },
      {
        name: 'scopes',
        type: 'array',
        required: false,
        description: `New set of note visibility scopes this endpoint should receive events for. At least one of: personal, public, workspace.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `New publicly reachable HTTPS URL for Granola to deliver events to.`,
      },
    ],
  },
  {
    name: 'granola_webhook_endpoints_list',
    description: `List all webhook endpoints configured for the Granola workspace, including their URL, scopes, subscribed event types, and enabled state.`,
    params: [],
  },
]
