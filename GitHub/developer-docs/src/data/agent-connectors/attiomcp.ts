import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'attiomcp_add_record_to_list',
    description: `Adds a record to a list as a new list entry. By default, duplicate entries are prevented; set allow_duplicates to true to create multiple entries for the same record.`,
    params: [
      {
        name: 'list',
        type: 'string',
        required: true,
        description: `The ID or slug of the list to add the entry to.`,
      },
      {
        name: 'parent_object',
        type: 'string',
        required: true,
        description: `The object type of the parent record being added to the list.`,
      },
      {
        name: 'parent_record_id',
        type: 'string',
        required: true,
        description: `The ID of the record to add to the list.`,
      },
      {
        name: 'allow_duplicates',
        type: 'boolean',
        required: false,
        description: `Whether to allow adding a record that already exists in the list.`,
      },
      {
        name: 'entry_values',
        type: 'object',
        required: false,
        description: `Optional attribute values for the list entry keyed by api_slug or attribute_id.`,
      },
    ],
  },
  {
    name: 'attiomcp_create_comment',
    description: `Creates a new comment on a record, list entry, or as a reply to an existing comment thread. Provide exactly one of: parent_object + parent_record_id for records, parent_list + parent_entry_id for list entries, or parent_comment_id for replies.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The comment text; email addresses are auto-converted to @mentions if they match workspace members.`,
      },
      {
        name: 'parent_comment_id',
        type: 'string',
        required: false,
        description: `The ID of the parent comment to reply to; must be a top-level comment, not a reply.`,
      },
      {
        name: 'parent_entry_id',
        type: 'string',
        required: false,
        description: `The entry ID to comment on; must be provided with parent_list.`,
      },
      {
        name: 'parent_list',
        type: 'string',
        required: false,
        description: `The list the entry belongs to; must be provided with parent_entry_id.`,
      },
      {
        name: 'parent_object',
        type: 'string',
        required: false,
        description: `The object the record belongs to; must be provided with parent_record_id.`,
      },
      {
        name: 'parent_record_id',
        type: 'string',
        required: false,
        description: `The record ID to comment on; must be provided with parent_object.`,
      },
    ],
  },
  {
    name: 'attiomcp_create_note',
    description: `Creates a new note attached to a record and returns the created note's ID. The note body supports Markdown formatting including headings, lists, bold, italic, and links.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The body of the note in Markdown format.`,
      },
      {
        name: 'parent_object',
        type: 'string',
        required: true,
        description: `The object type for the parent record.`,
      },
      {
        name: 'parent_record_id',
        type: 'string',
        required: true,
        description: `The record ID to attach the note to.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the note.` },
      {
        name: 'meeting_id',
        type: 'string',
        required: false,
        description: `Optional ID to link this note to a specific meeting.`,
      },
    ],
  },
  {
    name: 'attiomcp_create_record',
    description: `Creates a new record in a specified object such as people, companies, or deals. Before calling this tool, use list-attribute-definitions for the target object to understand available attributes and their required value formats.`,
    params: [
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `The ID or slug of the object to create the record in.`,
      },
      {
        name: 'values',
        type: 'object',
        required: true,
        description: `An object mapping attribute slugs or IDs to their values for the new record.`,
      },
    ],
  },
  {
    name: 'attiomcp_create_task',
    description: `Creates a new task in Attio with optional deadline, assignee, and linked record. Returns the created task's ID.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The text content of the task.`,
      },
      {
        name: 'assignee_workspace_member_id',
        type: 'string',
        required: false,
        description: `The workspace member ID to assign the task to.`,
      },
      {
        name: 'deadline_at',
        type: 'string',
        required: false,
        description: `The deadline date for the task as an ISO 8601 UTC timestamp.`,
      },
      {
        name: 'is_completed',
        type: 'boolean',
        required: false,
        description: `Whether the task is completed; defaults to false.`,
      },
      {
        name: 'linked_record_id',
        type: 'string',
        required: false,
        description: `The record ID to link the task to; must be provided with linked_record_object.`,
      },
      {
        name: 'linked_record_object',
        type: 'string',
        required: false,
        description: `The object type for the linked record; must be provided with linked_record_id.`,
      },
    ],
  },
  {
    name: 'attiomcp_delete_comment',
    description: `Deletes a comment you created. Deleting a parent comment will also delete all of its replies.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The ID of the comment to delete.`,
      },
    ],
  },
  {
    name: 'attiomcp_get_call_recording',
    description: `Retrieves the full details of a call recording by ID, including its status, timestamps, and complete transcript.`,
    params: [
      {
        name: 'call_recording_id',
        type: 'string',
        required: true,
        description: `The ID of the call recording to retrieve.`,
      },
      {
        name: 'meeting_id',
        type: 'string',
        required: true,
        description: `The ID of the meeting that the call recording is associated with.`,
      },
    ],
  },
  {
    name: 'attiomcp_get_email_content',
    description: `Retrieves the full content and body of an email. Requires the mailbox_id and email_id, which can be obtained from email search results.`,
    params: [
      {
        name: 'email_id',
        type: 'string',
        required: true,
        description: `The ID of the email to retrieve content for.`,
      },
      {
        name: 'mailbox_id',
        type: 'string',
        required: true,
        description: `The ID of the mailbox containing the email.`,
      },
    ],
  },
  {
    name: 'attiomcp_get_note_body',
    description: `Retrieves the full body content of a note by its ID.`,
    params: [
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `The ID of the note to retrieve the body of.`,
      },
    ],
  },
  {
    name: 'attiomcp_get_records_by_ids',
    description: `Retrieve a set of records by their IDs for a given object type. Returns an array of records with their attribute values; records not found are silently omitted from the response.`,
    params: [
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `The ID or slug of the object for which to retrieve records.`,
      },
      {
        name: 'record_ids',
        type: 'array',
        required: true,
        description: `The IDs of the records to retrieve. Records that are not found will not be included in the response.`,
      },
    ],
  },
  {
    name: 'attiomcp_list_attribute_definitions',
    description: `List attribute definitions for a given object, including their types, slugs, and configuration. Supports optional fuzzy search and pagination.`,
    params: [
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `The ID or slug of the object for which to retrieve attribute definitions.`,
      },
      {
        name: 'include_archived',
        type: 'boolean',
        required: false,
        description: `If true, the response will include archived attributes.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Plain text search term for fuzzy matching attribute titles and descriptions. If not specified or null, returns all attributes.`,
      },
    ],
  },
  {
    name: 'attiomcp_list_comment_replies',
    description: `List replies to a top-level comment thread by its comment ID. Only works with top-level comments; reply comments cannot be used as the parent.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The ID of the parent comment thread to list replies for. Must be a top-level comment, not a reply.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of replies to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
    ],
  },
  {
    name: 'attiomcp_list_comments',
    description: `List paginated top-level comments on a record or list entry, with up to 5 replies each. Provide either (parent_object + parent_record_id) for records, or (parent_list + parent_entry_id) for list entries.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of top-level comments to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
      {
        name: 'parent_entry_id',
        type: 'string',
        required: false,
        description: `Filter to comments on a specific list entry. The entry ID. Must be provided with parent_list.`,
      },
      {
        name: 'parent_list',
        type: 'string',
        required: false,
        description: `Filter to comments on a specific list entry. The list the entry belongs to. Must be provided with parent_entry_id.`,
      },
      {
        name: 'parent_object',
        type: 'string',
        required: false,
        description: `Filter to comments on a specific record. The object the record belongs to. Must be provided with parent_record_id.`,
      },
      {
        name: 'parent_record_id',
        type: 'string',
        required: false,
        description: `Filter to comments on a specific record. The record ID. Must be provided with parent_object.`,
      },
    ],
  },
  {
    name: 'attiomcp_list_list_attribute_definitions',
    description: `List attribute definitions for a given list, including entry-level attribute types and slugs. Supports optional fuzzy search and pagination.`,
    params: [
      {
        name: 'list',
        type: 'string',
        required: true,
        description: `The ID or slug of the list for which to retrieve attribute definitions.`,
      },
      {
        name: 'include_archived',
        type: 'boolean',
        required: false,
        description: `If true, the response will include archived attributes.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Plain text search term for fuzzy matching attribute titles and descriptions. If not specified or null, returns all attributes.`,
      },
    ],
  },
  {
    name: 'attiomcp_list_lists',
    description: `List all lists in the Attio workspace, returning metadata such as ID, name, API slug, and parent object types. Optionally filter by name or slug using the query parameter.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filter returned lists using fuzzy search against list name or API slug. If null or not provided, returns all lists.`,
      },
    ],
  },
  {
    name: 'attiomcp_list_records',
    description: `Retrieve a paginated list of records from a specified object type such as people, companies, or deals. Supports optional filtering with comparison operators and sorting by attribute values.`,
    params: [
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `The object type to list records from, as a slug or UUID.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Optional filter criteria to narrow results. Supports single conditions, AND groups, and OR groups.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of records to return (1–50).`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
      {
        name: 'sorts',
        type: 'array',
        required: false,
        description: `Sorting to apply (max 2 sorts). If empty, results are returned in a deterministic random order.`,
      },
    ],
  },
  {
    name: 'attiomcp_list_records_in_list',
    description: `List entries in a given list with optional filtering and sorting, returning paginated results. Each entry includes the parent record and all entry-level attributes.`,
    params: [
      {
        name: 'list',
        type: 'string',
        required: true,
        description: `The list to query entries from.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter criteria to apply. Supports single conditions, AND groups, and OR groups.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of entries to return (max 50).`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of entries to skip for pagination.`,
      },
      {
        name: 'sorts',
        type: 'array',
        required: false,
        description: `Sorting to apply (max 2). If empty, results are returned in a deterministic random order.`,
      },
    ],
  },
  {
    name: 'attiomcp_list_tasks',
    description: `List tasks in the workspace with optional filters for assignee, completion status, linked record, and date ranges. Returns paginated results including task content, deadlines, and linked record details.`,
    params: [
      {
        name: 'assignee_workspace_member_id',
        type: 'string',
        required: false,
        description: `Filter by assignee. Pass a workspace member ID to find tasks assigned to that member. Pass null to find unassigned tasks.`,
      },
      {
        name: 'created_at_gte',
        type: 'string',
        required: false,
        description: `Filter to tasks created at or after this timestamp (inclusive).`,
      },
      {
        name: 'created_at_lte',
        type: 'string',
        required: false,
        description: `Filter to tasks created at or before this timestamp (inclusive).`,
      },
      {
        name: 'deadline_at_gte',
        type: 'string',
        required: false,
        description: `Filter to tasks with deadline at or after this timestamp (inclusive).`,
      },
      {
        name: 'deadline_at_lte',
        type: 'string',
        required: false,
        description: `Filter to tasks with deadline at or before this timestamp (inclusive).`,
      },
      {
        name: 'is_completed',
        type: 'boolean',
        required: false,
        description: `Filter by completion status. true returns only completed tasks, false returns only incomplete tasks. Omit to return all tasks.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'linked_record_id',
        type: 'string',
        required: false,
        description: `Filter to tasks linked to a specific record. The record ID. Must be provided with linked_record_object.`,
      },
      {
        name: 'linked_record_object',
        type: 'string',
        required: false,
        description: `Filter to tasks linked to a specific record. The object the linked record belongs to. Must be provided with linked_record_id.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Attribute to sort results by. Defaults to deadline_at.`,
      },
      {
        name: 'sort_direction',
        type: 'string',
        required: false,
        description: `The sort direction.`,
      },
    ],
  },
  {
    name: 'attiomcp_list_workspace_members',
    description: `List members in the Attio workspace, returning their ID, email address, name, access level, and team memberships. Optionally filter by name, email, or team using the query parameter.`,
    params: [
      {
        name: 'include_suspended',
        type: 'boolean',
        required: false,
        description: `If true, response will include suspended members.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filter returned members using fuzzy search against member name, email address, and teams they are a member of. If null or not provided, returns all members.`,
      },
    ],
  },
  {
    name: 'attiomcp_list_workspace_teams',
    description: `List teams in the Attio workspace, returning each team's ID, name, description, archived status, creation timestamp, and members. Teams are groups of workspace members used primarily for permission management.`,
    params: [
      {
        name: 'include_archived',
        type: 'boolean',
        required: false,
        description: `If true, the response will include archived teams.`,
      },
    ],
  },
  {
    name: 'attiomcp_run_basic_report',
    description: `Run an aggregate report on records in an object or entries in a list, computing totals, averages, minimums, maximums, or grouped breakdowns. Supports optional filtering and up to two group-by dimensions.`,
    params: [
      {
        name: 'metric',
        type: 'object',
        required: true,
        description: `The metric to compute — either a count of records/entries or an aggregation (sum, mean, min, max, count) of a numeric attribute.`,
      },
      {
        name: 'source',
        type: 'string',
        required: true,
        description: `The source dataset for the report — a list or object slug or UUID.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Optional filter criteria to narrow rows before aggregation.`,
      },
      {
        name: 'group_by',
        type: 'array',
        required: false,
        description: `One or two grouping dimensions — the first is the primary (outer) key, the second is secondary (inner) key.`,
      },
    ],
  },
  {
    name: 'attiomcp_search_call_recordings_by_metadata',
    description: `Search all call recordings in the workspace by metadata such as speaker workspace members, speaker person records, related records, meeting title, and time range. Returns paginated call recording metadata ordered by start time (most recent first); use get-call-recording to fetch full transcripts.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'meeting_title_query',
        type: 'string',
        required: false,
        description: `Full-text search query to filter call recordings by meeting title.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
      {
        name: 'related_record_ids',
        type: 'array',
        required: false,
        description: `Filter to call recordings associated with specific records — must be provided with related_record_object.`,
      },
      {
        name: 'related_record_object',
        type: 'string',
        required: false,
        description: `The object type of the related records to filter by — must be provided with related_record_ids.`,
      },
      {
        name: 'speaker_person_record_ids',
        type: 'array',
        required: false,
        description: `Filter to call recordings where all specified person records were speakers.`,
      },
      {
        name: 'speaker_workspace_member_ids',
        type: 'array',
        required: false,
        description: `Filter to call recordings where all specified workspace members were speakers.`,
      },
      {
        name: 'starts_after',
        type: 'string',
        required: false,
        description: `Filter to call recordings that started on or after this timestamp (inclusive).`,
      },
      {
        name: 'starts_before',
        type: 'string',
        required: false,
        description: `Filter to call recordings that started on or before this timestamp (inclusive).`,
      },
    ],
  },
  {
    name: 'attiomcp_search_emails_by_metadata',
    description: `Search emails visible to the user by metadata including participant email addresses, domain, and sent time range. Returns paginated email metadata ordered by sent time (most recent first); use get-email-content to retrieve full email bodies.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Filter by domain the email was sent from or to — ORed with participant_email_addresses if both are provided.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
      {
        name: 'participant_email_addresses',
        type: 'array',
        required: false,
        description: `Filter by email participants across all roles (from, to, cc, bcc) — ORed with the domain filter if both are provided.`,
      },
      {
        name: 'sent_at_gt',
        type: 'string',
        required: false,
        description: `Filter to emails sent after this timestamp.`,
      },
      {
        name: 'sent_at_lt',
        type: 'string',
        required: false,
        description: `Filter to emails sent before this timestamp.`,
      },
    ],
  },
  {
    name: 'attiomcp_search_meetings',
    description: `Search past and future meetings in the workspace by participants, related records, and time range. Returns paginated results split into past meetings (most recent first) and future meetings (soonest first), with call recording IDs for past meetings.`,
    params: [
      {
        name: 'starts_after',
        type: 'string',
        required: true,
        description: `Filter to meetings starting after this timestamp (exclusive).`,
      },
      {
        name: 'starts_before',
        type: 'string',
        required: true,
        description: `Filter to meetings starting before this timestamp (exclusive).`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: true,
        description: `IANA timezone string used for all-day meeting calculations.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
      {
        name: 'participant_email_addresses',
        type: 'array',
        required: false,
        description: `Filter to meetings where participants with matching email addresses are present.`,
      },
      {
        name: 'participant_email_addresses_operator',
        type: 'string',
        required: false,
        description: `AND requires all specified emails to be participants; OR requires any one of them.`,
      },
      {
        name: 'related_record_ids',
        type: 'array',
        required: false,
        description: `Filter to meetings linked to specific records — must be provided with related_record_object.`,
      },
      {
        name: 'related_record_object',
        type: 'string',
        required: false,
        description: `The object type for related record filtering — must be provided with related_record_ids.`,
      },
      {
        name: 'related_records_operator',
        type: 'string',
        required: false,
        description: `AND requires the meeting to be linked to all specified records; OR requires linkage to any one of them.`,
      },
    ],
  },
  {
    name: 'attiomcp_search_notes_by_metadata',
    description: `Search notes by metadata including parent record, associated meeting, author workspace member, and creation time range. Returns paginated results ordered by creation date (most recent first).`,
    params: [
      {
        name: 'created_at_gt',
        type: 'string',
        required: false,
        description: `Filter to notes created after this timestamp.`,
      },
      {
        name: 'created_at_lt',
        type: 'string',
        required: false,
        description: `Filter to notes created before this timestamp.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'meeting_id',
        type: 'string',
        required: false,
        description: `Filter to notes associated with a specific meeting.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
      {
        name: 'parent_record_id',
        type: 'string',
        required: false,
        description: `The record ID to filter notes by — must be provided with parent_record_object.`,
      },
      {
        name: 'parent_record_object',
        type: 'string',
        required: false,
        description: `The object type for the parent record — must be provided with parent_record_id.`,
      },
      {
        name: 'workspace_membership_id',
        type: 'string',
        required: false,
        description: `Filter to notes associated with a specific workspace member.`,
      },
    ],
  },
  {
    name: 'attiomcp_search_records',
    description: `Perform a full-text search for records in a given object across indexed attributes such as domains, email addresses, phone numbers, name/title, description, social handles, and location. Returns paginated results.`,
    params: [
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `The object type to search records in, as a slug or UUID.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Case-insensitive full-text search query across indexed attributes.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
    ],
  },
  {
    name: 'attiomcp_semantic_search_call_recordings',
    description: `Search all call recordings using semantic similarity to find calls where specific topics were discussed, even if exact keywords are not present in the transcript. Searches both transcript content and call recording overviews (title and summary) using vector embeddings.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query to find semantically similar call recordings.`,
      },
    ],
  },
  {
    name: 'attiomcp_semantic_search_emails',
    description: `Search emails visible to the user using semantic similarity to find emails where specific topics were discussed, even if the exact keywords are not present. Returns up to 20 email metadata results; use get-email-content to retrieve full email bodies.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query for semantic content-based search across emails.`,
      },
      {
        name: 'include_emails_of_others',
        type: 'boolean',
        required: false,
        description: `If true, search through emails of all workspace members; if false, search only the user's own mailbox.`,
      },
    ],
  },
  {
    name: 'attiomcp_semantic_search_notes',
    description: `Search all notes in the workspace using semantic similarity to find notes where specific topics were discussed, even if exact keywords are not present. Returns up to 20 note metadata results; use get-note-body to retrieve the full content of a note.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query to find semantically similar notes.`,
      },
    ],
  },
  {
    name: 'attiomcp_update_list',
    description: `Update the name or API slug of a list. At least one of name or api_slug must be provided.`,
    params: [
      {
        name: 'list',
        type: 'string',
        required: true,
        description: `The ID or slug of the list to update.`,
      },
      {
        name: 'api_slug',
        type: 'string',
        required: false,
        description: `The new API slug for the list, formatted in snake_case.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new human-readable name for the list.`,
      },
    ],
  },
  {
    name: 'attiomcp_update_list_entry_by_id',
    description: `Update attribute values on an existing list entry by its entry ID. Call list-records-in-list first to find the entry you want to update.`,
    params: [
      {
        name: 'entry_id',
        type: 'string',
        required: true,
        description: `The ID of the list entry to update.`,
      },
      {
        name: 'entry_values',
        type: 'object',
        required: true,
        description: `An object mapping attribute slugs or IDs to their new values for the list entry.`,
      },
      {
        name: 'list',
        type: 'string',
        required: true,
        description: `The ID or slug of the list containing the entry.`,
      },
      {
        name: 'patch_multiselect_values',
        type: 'boolean',
        required: false,
        description: `If true, multiselect attribute values are prepended to existing values. If false, values are replaced to match the supplied list.`,
      },
    ],
  },
  {
    name: 'attiomcp_update_list_entry_by_record_id',
    description: `Update attribute values on a list entry by finding it via its parent record ID. Errors if the record has zero or multiple entries in the specified list.`,
    params: [
      {
        name: 'entry_values',
        type: 'object',
        required: true,
        description: `An object mapping attribute slugs or IDs to their new values for the list entry.`,
      },
      {
        name: 'list',
        type: 'string',
        required: true,
        description: `The ID or slug of the list containing the entry.`,
      },
      {
        name: 'parent_object',
        type: 'string',
        required: true,
        description: `The slug or ID of the object that the parent record belongs to.`,
      },
      {
        name: 'parent_record_id',
        type: 'string',
        required: true,
        description: `The ID of the parent record whose list entry will be updated.`,
      },
      {
        name: 'patch_multiselect_values',
        type: 'boolean',
        required: false,
        description: `If true, multiselect attribute values are prepended to existing values. If false, values are replaced to match the supplied list.`,
      },
    ],
  },
  {
    name: 'attiomcp_update_note',
    description: `Append or prepend plain-text content to an existing note and optionally update its title. At least one of operation or updated_title must be provided.`,
    params: [
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `The ID of the note to update.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `Optional content update operation — append adds paragraphs to the end, prepend adds paragraphs to the start.`,
      },
      {
        name: 'updated_title',
        type: 'string',
        required: false,
        description: `Optional new title for the note.`,
      },
    ],
  },
  {
    name: 'attiomcp_update_record',
    description: `Update attribute values on a people, companies, or other record by its record ID. Call list-attribute-definitions first to discover available attribute slugs and valid value formats.`,
    params: [
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `The object type for the target record.`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The UUID of the record to update.`,
      },
      {
        name: 'values',
        type: 'object',
        required: true,
        description: `An object mapping attribute slugs or IDs to their new values.`,
      },
      {
        name: 'patch_multiselect_values',
        type: 'boolean',
        required: false,
        description: `If true, multiselect attribute values are prepended to existing values. If false, values are replaced to match the supplied list.`,
      },
    ],
  },
  {
    name: 'attiomcp_update_task',
    description: `Update an existing task's deadline, completion status, assignee, or linked record. Set deadline_at to null to clear the deadline.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The ID of the task to update.`,
      },
      {
        name: 'assignee_workspace_member_id',
        type: 'string',
        required: false,
        description: `The workspace member ID to assign the task to.`,
      },
      {
        name: 'deadline_at',
        type: 'string',
        required: false,
        description: `The new deadline date for the task as an ISO 8601 timestamp. Set to null to clear the deadline.`,
      },
      {
        name: 'is_completed',
        type: 'boolean',
        required: false,
        description: `Whether the task is completed.`,
      },
      {
        name: 'linked_record_id',
        type: 'string',
        required: false,
        description: `The record ID to link the task to. Must be provided with linked_record_object.`,
      },
      {
        name: 'linked_record_object',
        type: 'string',
        required: false,
        description: `The object type for the linked record. Must be provided with linked_record_id.`,
      },
    ],
  },
  {
    name: 'attiomcp_upsert_record',
    description: `Create or update a people, companies, or other record using a matching attribute to find an existing record. If a record with the same matching attribute value exists it is updated; otherwise a new record is created.`,
    params: [
      {
        name: 'matching_attribute',
        type: 'string',
        required: true,
        description: `The slug or ID of the unique attribute used to search for an existing record.`,
      },
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `The object type for the target record.`,
      },
      {
        name: 'values',
        type: 'object',
        required: true,
        description: `An object mapping attribute slugs or IDs to values. Must include a value for the matching_attribute.`,
      },
      {
        name: 'patch_multiselect_values',
        type: 'boolean',
        required: false,
        description: `If true, multiselect attribute values are prepended to existing values. If false, values are replaced to match the supplied list.`,
      },
    ],
  },
  {
    name: 'attiomcp_whoami',
    description: `Returns information about the current user's identity and workspace membership, including their email, name, workspace member ID, access level, and workspace name.`,
    params: [],
  },
]
