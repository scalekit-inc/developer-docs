import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'memmcp_add_note_to_collection',
    description: `Add an existing note to an existing collection. This operation only creates the membership link and does not modify note or collection content. Use create endpoints to create notes or collections.

When to use:
- You need to link an existing note to an existing collection.

When NOT to use:
- You need to create notes or collections first (\`create_note\` or \`create_collection\`).
- You need to transfer a note out of one collection into another (\`move_note\`).`,
    params: [
      {
        name: 'collection_id',
        type: 'string',
        required: true,
        description: `UUID of the collection that will receive the note. Use an ID returned by create/list/search. The caller must be able to contribute to this collection.`,
      },
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `UUID of the note to add. Use an ID returned by create/list/search. The caller must be able to access this note.`,
      },
    ],
  },
  {
    name: 'memmcp_answer_question_about_attachment',
    description: `Ask one focused question about a single attachment by kind and ID. Use \`attachment_kind\` and \`attachment_id\` returned in note attachment metadata.

When to use:
- You have \`attachment_kind\` and \`attachment_id\` from \`get_note\` attachment metadata or \`extended_search_notes\` attachment matches and need one grounded answer from that attachment.
- You want the model to inspect a single attachment without returning all extracted pages or content chunks.

When NOT to use:
- You need structured extracted content or pagination controls (\`read_attachment\`).
- You need the raw protected file bytes or a signed download URL (\`get_note_attachment_download_url\`).`,
    params: [
      {
        name: 'attachment_id',
        type: 'string',
        required: true,
        description: `UUID of the attachment to inspect. For note attachment metadata returned by \`get_note\`, pass the \`attachment_id\` value directly.`,
      },
      {
        name: 'attachment_kind',
        type: 'string',
        required: true,
        description: `Kind of attachment to inspect. For note attachment metadata returned by \`get_note\`, pass the \`attachment_kind\` value directly.`,
      },
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `Focused question to answer using only this attachment.
Maximum: 10,000 characters (and no more than 10,000 UTF-8 bytes).`,
      },
    ],
  },
  {
    name: 'memmcp_create_collection',
    description: `Create a collection with optional caller-provided ID and timestamps. If \`id\` already exists, this request returns a conflict. Use collection membership endpoints to add, remove, or move notes between collections.

When to use:
- You are creating a new collection.
- You need to create a new collection with an optional caller-provided ID or timestamps.

When NOT to use:
- You need to update an existing collection by ID (\`update_collection\`).
- You only need membership changes between existing notes and collections (\`add_note_to_collection\`, \`remove_note_from_collection\`, or \`move_note\`).`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title for the collection.
Use a short, stable label suitable for navigation and search.
Maximum: 1,000 characters (and no more than 1,000 UTF-8 bytes).`,
      },
      {
        name: 'created_at',
        type: 'string',
        required: false,
        description: `Optional creation timestamp (ISO 8601).
If provided, it must include a timezone offset and cannot be in the future.
If omitted, Mem uses \`updated_at\` when provided; otherwise current server time.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional longer description of collection scope or intent.
Maximum: 10,000 characters (and no more than 10,000 UTF-8 bytes).`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Optional caller-provided UUID for the collection.
If omitted, Mem generates a new UUID.
If the provided ID already exists, this request returns a conflict.`,
      },
      {
        name: 'updated_at',
        type: 'string',
        required: false,
        description: `Optional "last updated" timestamp for this write (ISO 8601).
If provided, it must include a timezone offset and cannot be in the future.
If omitted, Mem uses \`created_at\` for the initial collection write.`,
      },
    ],
  },
  {
    name: 'memmcp_create_note',
    description: `Create a note with an optional note ID and collection links. If omitted, Mem generates the note ID. The first line of \`content\` becomes the note title.

When to use:
- You are creating a new note.
- You need to create a new note with a specific ID.

When NOT to use:
- You need to overwrite a known existing note by ID (\`update_note\`).
- You only need to change note/collection membership (\`add_note_to_collection\`, \`remove_note_from_collection\`, or \`move_note\`).`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Full markdown body for the note.
Send the full desired note body (partial patch semantics are not supported here).
IMPORTANT: The first line is interpreted as the note title.
Maximum: 200,000 characters (and no more than 200,000 UTF-8 bytes on create).`,
      },
      {
        name: 'collection_ids',
        type: 'string',
        required: false,
        description: `Optional collection IDs to associate with the note.
IDs that do not map to accessible collections are ignored.`,
      },
      {
        name: 'collection_titles',
        type: 'string',
        required: false,
        description: `Optional collection titles to associate with the note.
Matching is case-insensitive exact match; titles with no match are ignored.
Maximum per title: 1,000 characters (and no more than 1,000 UTF-8 bytes).`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Optional UUID for the note.
If omitted, Mem generates a new UUID.`,
      },
    ],
  },
  {
    name: 'memmcp_delete_collection',
    description: `Permanently delete a collection. Hard-deleting removes the collection resource itself. For membership-only changes, use note add, remove, or move collection endpoints.

When to use:
- You need irreversible hard-delete behavior for a collection resource.

When NOT to use:
- You only need note membership changes in a collection (\`add_note_to_collection\`, \`remove_note_from_collection\`, or \`move_note\`).`,
    params: [
      {
        name: 'collection_id',
        type: 'string',
        required: true,
        description: `UUID of the collection to permanently delete. Use an ID returned by create/list/search. The caller must be able to access this collection.`,
      },
    ],
  },
  {
    name: 'memmcp_extended_search_notes',
    description: `Search notes and note-linked attachments together. Returns note hits with attachment match context for PDFs, images, audio recordings, calendar events, and emails. Use returned attachment IDs with the attachment tools for deeper inspection.

When to use:
- You need to search notes and note-linked attachments together from a natural-language or keyword query.
- You need attachment match context such as PDF pages, OCR text, visual descriptions, highlighted snippets, or attachment IDs for follow-up inspection.

When NOT to use:
- You only need lightweight note discovery without attachment match details (\`search_notes\`).
- You already have a specific attachment ID and need its extracted content (\`read_attachment\`) or one grounded answer (\`answer_question_about_attachment\`).`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Required text query for searching notes and note-linked attachments.
The query must contain at least one non-whitespace character.`,
      },
      {
        name: 'exclude_note_ids',
        type: 'string',
        required: false,
        description: `Note UUIDs to exclude from this result set.
Use this to avoid returning notes already inspected by the caller.`,
      },
      {
        name: 'filter_by_collection_ids',
        type: 'string',
        required: false,
        description: `Optional collection UUID filters.
When provided, results are limited to notes in any listed collection.`,
      },
      {
        name: 'filter_by_updated_after',
        type: 'string',
        required: false,
        description: `Optional inclusive lower bound for note update time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'filter_by_updated_before',
        type: 'string',
        required: false,
        description: `Optional inclusive upper bound for note update time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of note hits to return.
Default is 10; valid range is 1 to 100.`,
      },
      {
        name: 'next_page_cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor from a previous extended search response.
Omit for the first page.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort order for results. Use \`RELEVANCE\` for best matches or \`DATE\` for latest edited notes.`,
      },
    ],
  },
  {
    name: 'memmcp_find_related_notes',
    description: `Find notes semantically related to the current persisted content of a note. The source note is embedded at request time, so newly created or recently updated notes can be used before asynchronous indexing catches up. Candidate related notes still come from the note search index.

When to use:
- You already have a note ID and need semantically related existing notes.
- You need collection context for notes related to a newly created or recently updated note.

When NOT to use:
- You need keyword or natural-language query discovery (\`search_notes\`).
- You need the full current content for one note (\`get_note\`).`,
    params: [
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `UUID of the source note. The caller must be able to access this note.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of related notes to return.
Default is 10; valid range is 1 to 20.`,
      },
    ],
  },
  {
    name: 'memmcp_get_audio_recording',
    description: `Fetch the current public transcript and metadata for a single audio recording by ID.

When to use:
- You already have an audio recording ID and need its transcript + metadata.
- Transcript speaker labels are best-effort context; participant names are optional, and generic or channel labels are normal.

When NOT to use:
- You need note-level discovery or linked recording IDs (\`get_note\`).`,
    params: [
      {
        name: 'audio_recording_id',
        type: 'string',
        required: true,
        description: `UUID of the audio recording to read. The caller must be able to access this recording.`,
      },
    ],
  },
  {
    name: 'memmcp_get_collection',
    description: `Fetch metadata for a single collection by ID. This tool returns collection metadata only, not a note list for that collection. For discovery flows, use \`list_collections\` or \`search_collections\`.

When to use:
- You already have a collection ID and need canonical metadata.

When NOT to use:
- You need collection discovery without known IDs (\`list_collections\` or \`search_collections\`).`,
    params: [
      {
        name: 'collection_id',
        type: 'string',
        required: true,
        description: `UUID of the collection to read. Use an ID returned by create/list/search. The caller must be able to access this collection.`,
      },
    ],
  },
  {
    name: 'memmcp_get_note',
    description: `Fetch the full current state of a single note by ID. If the note is in trash, the response still returns the note and includes \`trashed_at\`. For discovery flows, use \`list_notes\` or \`search_notes\`.

When to use:
- You already have a note ID and need canonical content, linked recording IDs, or attachment IDs.

When NOT to use:
- You need note discovery without known IDs (\`list_notes\` or \`search_notes\`).`,
    params: [
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `UUID of the note to read. Use an ID returned by create/list/search. The caller must be able to access this note.`,
      },
    ],
  },
  {
    name: 'memmcp_get_note_attachment_download_url',
    description: `Generate a temporary signed download URL for a note attachment. Use this when note content references an attachment, but the underlying file URL is not directly downloadable. The caller must be able to access the requested attachment.

When to use:
- You have an attachment ID from \`get_note\` \`attachment_metadata\` or note content and need a temporary signed URL to fetch the protected file behind that attachment reference.
- Use this when note content references an attachment, but the underlying file URL is not directly downloadable.

When NOT to use:
- You need note-level discovery or attachment IDs (\`get_note\`).
- You do not have an attachment ID from \`get_note\` or note content.`,
    params: [
      {
        name: 'attachment_id',
        type: 'string',
        required: true,
        description: `UUID of the note attachment to download. The caller must be able to access this attachment.`,
      },
    ],
  },
  {
    name: 'memmcp_list_collections',
    description: `List collections visible to the authenticated caller with cursor pagination. Results are ordered by \`order_by\` and return \`next_page\` when additional rows are available. For relevance-ranked retrieval by query, use \`search_collections\`.

When to use:
- You need deterministic cursor pagination for collections.
- You are iterating through all accessible collections page by page.

When NOT to use:
- You need relevance-ranked retrieval from open-ended text (\`search_collections\`).`,
    params: [
      {
        name: 'filter_by_created_after',
        type: 'string',
        required: false,
        description: `Optional inclusive lower bound for collection creation time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'filter_by_created_before',
        type: 'string',
        required: false,
        description: `Optional inclusive upper bound for collection creation time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'filter_by_updated_after',
        type: 'string',
        required: false,
        description: `Optional inclusive lower bound for collection update time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'filter_by_updated_before',
        type: 'string',
        required: false,
        description: `Optional inclusive upper bound for collection update time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of collections in this page.
Use smaller values for lower latency.
Default is 50; valid range is 1 to 100.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort key for pagination boundaries.
Use \`updated_at\` (default) for recency feeds.
Use \`created_at\` for creation-order views.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Opaque cursor from a previous list response.
Omit for the first page.
IMPORTANT: Reuse with the same filters and \`order_by\` settings.`,
      },
    ],
  },
  {
    name: 'memmcp_list_notes',
    description: `List notes visible to the authenticated caller with cursor pagination. When multiple \`contains_*\` fields are true, a note may match any of them. Results are ordered by \`order_by\` and return \`next_page\` when additional rows are available. For relevance-ranked retrieval by query, use \`search_notes\`.

When to use:
- You need deterministic cursor pagination ordered by \`updated_at\` or \`created_at\`.
- You are iterating through all accessible notes page by page.

When NOT to use:
- You need relevance-ranked retrieval from open-ended text (\`search_notes\`).`,
    params: [
      {
        name: 'collection_id',
        type: 'string',
        required: false,
        description: `Optional collection filter by UUID.
When set, only notes linked to this collection are returned.`,
      },
      {
        name: 'contains_files',
        type: 'boolean',
        required: false,
        description: `When true, include notes that contain file-like attachments (including file and PDF kinds).
When multiple \`contains_*\` fields are true, notes matching any selected filter may be returned.`,
      },
      {
        name: 'contains_images',
        type: 'boolean',
        required: false,
        description: `When true, include notes that contain image media (including image and GIF kinds).
When multiple \`contains_*\` fields are true, notes matching any selected filter may be returned.`,
      },
      {
        name: 'contains_open_tasks',
        type: 'boolean',
        required: false,
        description: `When true, include notes that contain at least one open task item.
When multiple \`contains_*\` fields are true, notes matching any selected filter may be returned.`,
      },
      {
        name: 'contains_tasks',
        type: 'boolean',
        required: false,
        description: `When true, include notes that contain at least one task item (open or closed).
When multiple \`contains_*\` fields are true, notes matching any selected filter may be returned.`,
      },
      {
        name: 'filter_by_created_after',
        type: 'string',
        required: false,
        description: `Optional inclusive lower bound for note creation time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'filter_by_created_before',
        type: 'string',
        required: false,
        description: `Optional inclusive upper bound for note creation time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'filter_by_updated_after',
        type: 'string',
        required: false,
        description: `Optional inclusive lower bound for note update time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'filter_by_updated_before',
        type: 'string',
        required: false,
        description: `Optional inclusive upper bound for note update time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'include_note_content',
        type: 'boolean',
        required: false,
        description: `When true, include full markdown content for each returned note.
IMPORTANT: This increases payload size and can increase latency.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of notes in this page.
Use smaller values for lower latency.
Default is 50; valid range is 1 to 100.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort key for pagination boundaries.
Use \`updated_at\` (default) for recency feeds.
Use \`created_at\` for creation-order views.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Opaque cursor from a previous list response.
Omit for the first page.
IMPORTANT: Reuse with the same filters and \`order_by\` settings.`,
      },
    ],
  },
  {
    name: 'memmcp_move_note',
    description: `Move a note from one collection to another collection. This operation adds the note to the target collection, then removes it from the source collection. It does not modify note or collection content.

When to use:
- You need to transfer an existing note from one collection to another.

When NOT to use:
- The note should remain in the source collection; use \`add_note_to_collection\`.
- You only need to unlink a note from a collection; use \`remove_note_from_collection\`.`,
    params: [
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `UUID of the note to move. Use an ID returned by create/list/search.`,
      },
      {
        name: 'source_collection_id',
        type: 'string',
        required: true,
        description: `UUID of the collection that currently contains the note. Caller must be able to remove the note from this collection.`,
      },
      {
        name: 'target_collection_id',
        type: 'string',
        required: true,
        description: `UUID of the collection that should receive the note.
The caller must be able to add the note to this collection.`,
      },
    ],
  },
  {
    name: 'memmcp_read_attachment',
    description: `Read structured content for a single attachment by kind and ID. Use \`attachment_kind\` and \`attachment_id\` returned in note attachment metadata.

When to use:
- You have \`attachment_kind\` and \`attachment_id\` from \`get_note\` attachment metadata or \`extended_search_notes\` attachment matches and need structured extracted content.
- You need PDF pages, image OCR/visual metadata, audio transcripts, calendar event text, or email text without downloading the raw file.
- For audio transcripts, speaker labels are best-effort context; participant names are optional, and generic or channel labels are normal.

When NOT to use:
- You need the raw protected file bytes or a signed download URL (\`get_note_attachment_download_url\`).
- You only need one focused answer from the attachment (\`answer_question_about_attachment\`).`,
    params: [
      {
        name: 'attachment_id',
        type: 'string',
        required: true,
        description: `UUID of the attachment to read. For note attachment metadata returned by \`get_note\`, pass the \`attachment_id\` value directly.`,
      },
      {
        name: 'attachment_kind',
        type: 'string',
        required: true,
        description: `Kind of attachment to read. For note attachment metadata returned by \`get_note\`, pass the \`attachment_kind\` value directly.`,
      },
      {
        name: 'content_limit',
        type: 'string',
        required: false,
        description: `Maximum content characters to return. Defaults to 10,000 and is capped at 20,000.`,
      },
      {
        name: 'content_offset',
        type: 'integer',
        required: false,
        description: `Zero-based character offset for audio, calendar, and email content.`,
      },
      {
        name: 'page_limit',
        type: 'string',
        required: false,
        description: `Maximum number of PDF pages to return. Defaults to 5 and is capped at 20.`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Zero-based page offset for PDF attachments.`,
      },
    ],
  },
  {
    name: 'memmcp_remove_note_from_collection',
    description: `Remove a note from a collection while keeping both resources. This operation only removes the membership link between IDs. Use \`trash_note\` to remove a note from active notes, or \`delete_collection\` to remove a collection resource.

When to use:
- You need to unlink a note from a collection while keeping both resources.

When NOT to use:
- You need to remove the note from active notes (\`trash_note\`) or delete the collection resource (\`delete_collection\`).
- You need to transfer a note directly to another collection (\`move_note\`).`,
    params: [
      {
        name: 'collection_id',
        type: 'string',
        required: true,
        description: `UUID of the collection to unlink. Use an ID returned by create/list/search. Caller must be able to edit the note or contribute to the collection.`,
      },
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `UUID of the note to unlink. Use an ID returned by create/list/search. Caller must be able to edit the note or contribute to the collection.`,
      },
    ],
  },
  {
    name: 'memmcp_restore_note',
    description: `Restore a previously trashed note to the active note set. This only reverses soft-delete lifecycle state.

When to use:
- You need to undo a prior trash operation.

When NOT to use:
- The note is already active and does not need restoration.`,
    params: [
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `UUID of the note to restore from trash. Use an ID returned by create/list/search. The caller must be able to edit this note.`,
      },
    ],
  },
  {
    name: 'memmcp_search_collections',
    description: `Search collections using free-text relevance matching. Returns a bounded relevance-ranked result set and does not return \`next_page\`. For deterministic chronological pagination, use \`list_collections\`.

When to use:
- You need relevance-ranked retrieval for collection lookup.

When NOT to use:
- You need deterministic chronological pagination (\`list_collections\`).`,
    params: [
      {
        name: 'filter_by_created_after',
        type: 'string',
        required: false,
        description: `Optional inclusive lower bound for collection creation time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'filter_by_created_before',
        type: 'string',
        required: false,
        description: `Optional inclusive upper bound for collection creation time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'filter_by_updated_after',
        type: 'string',
        required: false,
        description: `Optional inclusive lower bound for collection update time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'filter_by_updated_before',
        type: 'string',
        required: false,
        description: `Optional inclusive upper bound for collection update time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Optional text query for relevance matching across collections.
If omitted, search can still return a bounded general set.`,
      },
    ],
  },
  {
    name: 'memmcp_search_notes',
    description: `Search notes using a required free-text query and structured filters. When multiple \`filter_by_contains_*\` fields are true, a note may match any of them. Returns note results from a bounded search snapshot with deterministic offset pagination. Query-based searches are relevance-ranked within the bounded search snapshot window. Reuse the returned \`snapshot_id\` when requesting later pages. The returned \`total\` reflects the bounded search snapshot, capped by the 100-result search window. For deterministic chronological pagination across all accessible notes, use \`list_notes\`.

When to use:
- You need relevance-ranked retrieval from a natural-language or keyword query.
- You need query + filter retrieval instead of full feed traversal.

When NOT to use:
- You need deterministic chronological pagination (\`list_notes\`).
- You need note-linked attachment matches for PDFs, images, audio, calendar events, or emails (\`extended_search_notes\`).`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Required text query for relevance matching.
The query must contain at least one non-whitespace character.
This tool does not provide exhaustive chronological pagination; for that, use \`list_notes\`.`,
      },
      {
        name: 'filter_by_collection_ids',
        type: 'string',
        required: false,
        description: `Optional collection UUID filters.
When provided, results are limited to notes in any listed collection.`,
      },
      {
        name: 'filter_by_contains_files',
        type: 'boolean',
        required: false,
        description: `When true, include notes that contain file-like attachments (including file and PDF kinds).`,
      },
      {
        name: 'filter_by_contains_images',
        type: 'boolean',
        required: false,
        description: `When true, include notes that contain image media (including image and GIF kinds).`,
      },
      {
        name: 'filter_by_contains_open_tasks',
        type: 'boolean',
        required: false,
        description: `When true, include notes that contain at least one open task item.`,
      },
      {
        name: 'filter_by_contains_tasks',
        type: 'boolean',
        required: false,
        description: `When true, include notes that contain at least one task item (open or closed).`,
      },
      {
        name: 'filter_by_created_after',
        type: 'string',
        required: false,
        description: `Optional inclusive lower bound for note creation time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'filter_by_created_before',
        type: 'string',
        required: false,
        description: `Optional inclusive upper bound for note creation time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'filter_by_updated_after',
        type: 'string',
        required: false,
        description: `Optional inclusive lower bound for note update time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'filter_by_updated_before',
        type: 'string',
        required: false,
        description: `Optional inclusive upper bound for note update time (ISO 8601).
The timestamp must include a timezone offset such as \`Z\` or \`+01:00\`.`,
      },
      {
        name: 'include_note_content',
        type: 'boolean',
        required: false,
        description: `When true, include full markdown content for each returned note.
Keep false for lightweight metadata/snippet responses.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of notes in this search page.
Use smaller values for lower latency.
Default is 20; valid range is 1 to 50.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of matching notes to skip before returning results.
This value is zero-based.`,
      },
      {
        name: 'snapshot_id',
        type: 'string',
        required: false,
        description: `Opaque search snapshot identifier returned by a previous search page.
Required when requesting later pages with \`offset > 0\`.`,
      },
    ],
  },
  {
    name: 'memmcp_set_note_created_at',
    description: `Set a note's visible creation timestamp without changing its content. The supplied \`created_at\` must include a timezone offset and cannot be in the future. It can only backdate the note: the timestamp cannot be later than when the note was originally created. This operation changes note metadata only. Trashed notes must be restored before their creation date can be changed.

When to use:
- The user explicitly asks to change or correct a known note's visible creation date.

When NOT to use:
- The requested date is later than when the note was originally created.
- You need to change the note body (\`update_note\`).
- You need to create a new note (\`create_note\`).
- The note is trashed and must be restored first (\`restore_note\`).`,
    params: [
      {
        name: 'created_at',
        type: 'string',
        required: true,
        description: `New visible creation timestamp for the note (ISO 8601).
It must include a timezone offset and cannot be in the future.
It can only backdate the note: the timestamp cannot be later than when the note was originally created.
This changes note metadata only; it does not update note content.`,
      },
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `UUID of the note whose visible creation timestamp should change. The caller must own this note.`,
      },
    ],
  },
  {
    name: 'memmcp_trash_note',
    description: `Soft-delete a note by moving it to trash. Trashed notes can be restored via \`restore_note\`.

When to use:
- You need reversible removal from active notes.`,
    params: [
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `UUID of the note to move to trash. Use an ID returned by create/list/search. The caller must be able to edit this note.`,
      },
    ],
  },
  {
    name: 'memmcp_update_collection',
    description: `Update metadata for a collection by ID. Use this tool to rename a collection by setting \`title\`. This tool updates only provided fields (\`title\`, \`description\`) and leaves omitted fields unchanged. For read-only retrieval, use \`get_collection\`.

When to use:
- You need to rename a collection by updating its title.
- You need to update title and/or description for an existing collection ID.
- You need to preserve a collection while correcting metadata.

When NOT to use:
- You need to create a new collection (\`create_collection\`).
- You only need note membership changes (\`add_note_to_collection\`, \`remove_note_from_collection\`, or \`move_note\`).`,
    params: [
      {
        name: 'collection_id',
        type: 'string',
        required: true,
        description: `UUID of the collection to update. Use an ID returned by create/list/search. The caller must be able to edit this collection.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional replacement description for the collection.
Omit to keep the current description unchanged.
Set to an empty string to clear the description.
Maximum: 10,000 characters (and no more than 10,000 UTF-8 bytes).`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Optional replacement title for the collection.
Use this field to rename a collection.
Omit to keep the current title unchanged.
Maximum: 1,000 characters (and no more than 1,000 UTF-8 bytes).`,
      },
      {
        name: 'updated_at',
        type: 'string',
        required: false,
        description: `Optional "last updated" timestamp for this write (ISO 8601).
If provided, it must include a timezone offset and cannot be in the future.
If omitted, the current server time is used.`,
      },
    ],
  },
  {
    name: 'memmcp_update_note',
    description: `Submit a complete markdown body for a note and the exact \`version\` being updated. Send the full desired body in \`content\` (not a partial markdown patch). The first line of \`content\` becomes the updated title. Trashed notes must be restored before they can be updated.

When to use:
- You need full-body replacement for an existing note ID.

When NOT to use:
- You need partial patch semantics (not supported).
- You need to create a new note (\`create_note\`).
- You only need to change a note's visible creation date (\`set_note_created_at\`).
- The note is trashed and must be restored first (\`restore_note\`).`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Complete markdown body to submit for this write.
Send the full desired note body (partial patch semantics are not supported in this request payload).
The first line is interpreted as the title.`,
      },
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `UUID of the note to update. Use an ID returned by create/list/search. The caller must be able to edit this note.`,
      },
      {
        name: 'version',
        type: 'integer',
        required: true,
        description: `Exact note content document version this update is based on.
Use the \`version\` returned by \`get_note\` or by the most recent note write response.`,
      },
    ],
  },
]
