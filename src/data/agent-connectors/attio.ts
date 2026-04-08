import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'attio_add_to_list',
    description: `Add a record (contact, company, deal, or custom object) to a specific Attio list. Returns the newly created list entry with its entry ID, which can be used to remove it later. If the record is already in the list, a new entry is created.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The UUID of the Attio list to add the record to. Use the List Lists tool (attio_list_lists) to retrieve available lists and their UUIDs.`,
      },
      {
        name: 'parent_object',
        type: 'string',
        required: true,
        description: `The object type slug the record belongs to. Must match the object type the list is configured for — run attio_list_lists to check the list's parent object before adding.`,
      },
      {
        name: 'parent_record_id',
        type: 'string',
        required: true,
        description: `The UUID of the record to add to the list. Must be a valid UUID — obtain this from search or list records results.`,
      },
      {
        name: 'entry_values',
        type: 'object',
        required: false,
        description: `Optional attribute values to set on the list entry itself (not the underlying record). Keys are attribute slugs, values are the data to set. Example: {"stage": "qualified"}`,
      },
    ],
  },
  {
    name: 'attio_create_attribute',
    description: `Creates a new attribute on an Attio object or list. Requires api_slug, title, type, description, is_required, is_unique, is_mct, and config. The config object varies by type — for most types pass an empty object {}. For select/multiselect, config can include options. For record-reference, config includes the target object.`,
    params: [
      {
        name: 'api_slug',
        type: 'string',
        required: true,
        description: `Snake_case identifier for the new attribute. Must be unique within the object.`,
      },
      {
        name: 'config',
        type: 'object',
        required: true,
        description: `Type-specific configuration object. For most types (text, number, date, checkbox, etc.) pass an empty object {}. For record-reference, pass {"relationship": {"object": "companies"}}.`,
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Human-readable description of what this attribute is used for.`,
      },
      {
        name: 'is_multiselect',
        type: 'boolean',
        required: true,
        description: `Whether this attribute allows multiple values per record.`,
      },
      {
        name: 'is_required',
        type: 'boolean',
        required: true,
        description: `Whether this attribute is required when creating records of this object type.`,
      },
      {
        name: 'is_unique',
        type: 'boolean',
        required: true,
        description: `Whether values for this attribute must be unique across all records of this object type.`,
      },
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `Slug or UUID of the object to create the attribute on. Common slugs: people, companies, deals.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Human-readable display title for the attribute.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Data type of the attribute. Supported values: text, number, select, multiselect, status, date, timestamp, checkbox, currency, record-reference, actor-reference, location, domain, email-address, phone-number, interaction.`,
      },
    ],
  },
  {
    name: 'attio_create_comment',
    description: `Creates a new comment on a record in Attio. Requires author_id (workspace member UUID), content, record_object (e.g. people, companies, deals), and record_id. Optionally provide thread_id to reply to an existing thread. Format is always plaintext.`,
    params: [
      {
        name: 'author_id',
        type: 'string',
        required: true,
        description: `UUID of the workspace member who is authoring the comment. Use the List Workspace Members tool to find member UUIDs.`,
      },
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Plaintext content of the comment.`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `UUID of the record to attach the comment to.`,
      },
      {
        name: 'record_object',
        type: 'string',
        required: true,
        description: `Object slug or UUID of the record to comment on. Common slugs: people, companies, deals.`,
      },
      {
        name: 'thread_id',
        type: 'string',
        required: false,
        description: `UUID of an existing comment thread to reply to. Leave empty to start a new top-level comment.`,
      },
    ],
  },
  {
    name: 'attio_create_company',
    description: `Creates a new company record in Attio. Throws an error on conflicts of unique attributes like domains. Use Assert Company if you prefer to update on conflicts. Note: The logo_url attribute cannot currently be set via the API.`,
    params: [
      {
        name: 'values',
        type: 'object',
        required: true,
        description: `Attribute values for the new company record.`,
      },
    ],
  },
  {
    name: 'attio_create_deal',
    description: `Creates a new deal record in Attio. Throws an error on conflicts of unique attributes. Provide at least one attribute value in the values field.`,
    params: [
      {
        name: 'values',
        type: 'object',
        required: true,
        description: `Attribute values for the new deal record.`,
      },
    ],
  },
  {
    name: 'attio_create_list',
    description: `Creates a new list in Attio. Requires workspace_access (one of: full-access, read-and-write, read-only) and workspace_member_access array. After creation, add attributes using Create Attribute and records using Create Entry.`,
    params: [
      {
        name: 'api_slug',
        type: 'string',
        required: true,
        description: `Snake_case identifier for the new list used in API access.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Human-readable display name for the new list.`,
      },
      {
        name: 'parent_object',
        type: 'string',
        required: true,
        description: `Object slug the list tracks. Must be a valid object slug such as people, companies, or deals.`,
      },
      {
        name: 'workspace_access',
        type: 'string',
        required: true,
        description: `Access level for all workspace members. Must be one of: full-access, read-and-write, read-only. Use full-access to give all members full control.`,
      },
      {
        name: 'workspace_member_access',
        type: 'array',
        required: false,
        description: `Optional array of per-member access overrides. Leave empty for uniform access via workspace_access. Each item: {"workspace_member_id": "uuid", "level": "full-access"}.`,
      },
    ],
  },
  {
    name: 'attio_create_note',
    description: `Create a note on an Attio record (person, company, deal, or custom object). Notes support plaintext or Markdown formatting. You can optionally backdate the note by specifying a created_at timestamp, or associate it with an existing meeting via meeting_id.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Body of the note. Use plain text or Markdown depending on the format field. Line breaks are supported via \\n in plaintext mode.`,
      },
      {
        name: 'format',
        type: 'string',
        required: true,
        description: `Format of the note content. Must be either "plaintext" or "markdown".`,
      },
      {
        name: 'parent_object',
        type: 'string',
        required: true,
        description: `The slug or UUID of the parent object the note will be attached to. Common slugs: "people", "companies", "deals".`,
      },
      {
        name: 'parent_record_id',
        type: 'string',
        required: true,
        description: `UUID of the parent record the note will be attached to.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Plaintext title for the note. No formatting is allowed in the title.`,
      },
      {
        name: 'created_at',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp for backdating the note. Defaults to the current time if not provided. Example: "2024-01-15T10:30:00Z"`,
      },
      {
        name: 'meeting_id',
        type: 'string',
        required: false,
        description: `UUID of an existing meeting to associate with this note. Optional.`,
      },
    ],
  },
  {
    name: 'attio_create_object',
    description: `Creates a new custom object in the Attio workspace. Use when you need an object type beyond the standard types (people, companies, deals, users, workspaces).`,
    params: [
      {
        name: 'api_slug',
        type: 'string',
        required: true,
        description: `Snake_case identifier for the new object.`,
      },
      {
        name: 'plural_noun',
        type: 'string',
        required: true,
        description: `Plural noun for the new object type.`,
      },
      {
        name: 'singular_noun',
        type: 'string',
        required: true,
        description: `Singular noun for the new object type.`,
      },
    ],
  },
  {
    name: 'attio_create_person',
    description: `Creates a new person record in Attio. Throws an error on conflicts of unique attributes like email_addresses. Use Assert Person if you prefer to update on conflicts. Note: The avatar_url attribute cannot currently be set via the API.`,
    params: [
      {
        name: 'values',
        type: 'object',
        required: true,
        description: `Attribute values for the new person record.`,
      },
    ],
  },
  {
    name: 'attio_create_record',
    description: `Create a new record in Attio for a given object type (e.g. people, companies, deals). Provide attribute values as a JSON object mapping attribute API slugs or IDs to their values. Throws an error if a unique attribute conflict is detected — use the Assert Record endpoint instead to upsert on conflict.`,
    params: [
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `The slug or UUID of the object type to create the record in. Common slugs: "people", "companies", "deals".`,
      },
      {
        name: 'values',
        type: 'object',
        required: true,
        description: `Attribute values for the new record. Keys are attribute API slugs or UUIDs; values are the data to set. For multi-value attributes, supply an array. Example for a person: {"name": [{"first_name": "Alice", "last_name": "Smith"}], "email_addresses": [{"email_address": "alice@example.com"}]}`,
      },
    ],
  },
  {
    name: 'attio_create_task',
    description: `Create a new task in Attio. Tasks can be linked to one or more records (people, companies, deals, etc.) and assigned to workspace members. Supports setting a deadline and initial completion status. Only plaintext format is supported for task content.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The text content of the task. Maximum 2000 characters. Only plaintext is supported.`,
      },
      {
        name: 'deadline_at',
        type: 'string',
        required: true,
        description: `ISO 8601 datetime for the task deadline. Must include milliseconds and timezone, e.g. 2024-03-31T17:00:00.000Z.`,
      },
      {
        name: 'assignees',
        type: 'array',
        required: false,
        description: `Array of assignees for this task. Each item must have either referenced_actor_id (UUID) with referenced_actor_type set to workspace-member, or workspace_member_email_address. Example: [{"referenced_actor_type": "workspace-member", "referenced_actor_id": "d4a8e6f2-3b1c-4d5e-9f0a-1b2c3d4e5f6a"}]`,
      },
      {
        name: 'is_completed',
        type: 'boolean',
        required: false,
        description: `Whether the task is already completed. Defaults to false.`,
      },
      {
        name: 'linked_records',
        type: 'array',
        required: false,
        description: `Array of records to link this task to. Each item must have a target_object (slug or UUID) and either target_record_id (UUID) or an attribute-based match. Example: [{"target_object": "people", "target_record_id": "bf071e1f-6035-429d-b874-d83ea64ea13b"}]`,
      },
    ],
  },
  {
    name: 'attio_delete_comment',
    description: `Permanently deletes a comment by its comment_id. If the comment is at the head of a thread, all messages in the thread are also deleted.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the comment to delete.`,
      },
    ],
  },
  {
    name: 'attio_delete_company',
    description: `Permanently deletes a company record from Attio by its record_id. This operation is irreversible.`,
    params: [
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the company record to delete.`,
      },
    ],
  },
  {
    name: 'attio_delete_deal',
    description: `Permanently deletes a deal record from Attio by its record_id. This operation is irreversible.`,
    params: [
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the deal record to delete.`,
      },
    ],
  },
  {
    name: 'attio_delete_note',
    description: `Permanently deletes a note from Attio by its note_id. This operation is irreversible.`,
    params: [
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the note to delete.`,
      },
    ],
  },
  {
    name: 'attio_delete_person',
    description: `Permanently deletes a person record from Attio by its record_id. This operation is irreversible.`,
    params: [
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the person record to delete.`,
      },
    ],
  },
  {
    name: 'attio_delete_record',
    description: `Permanently delete a record from Attio by its object type and record ID. This action is irreversible. Returns an empty response on success. Returns 404 if the record does not exist.`,
    params: [
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `The slug or UUID of the object type the record belongs to. Common slugs: "people", "companies", "deals".`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The UUID of the record to delete.`,
      },
    ],
  },
  {
    name: 'attio_delete_task',
    description: `Permanently deletes a task from Attio by its task_id. This operation is irreversible.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task to delete.`,
      },
    ],
  },
  {
    name: 'attio_delete_user_record',
    description: `Permanently deletes a user record from Attio by its record_id. This operation is irreversible.`,
    params: [
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the user record to delete.`,
      },
    ],
  },
  {
    name: 'attio_delete_webhook',
    description: `Permanently deletes a webhook by its webhook_id from Attio. This operation is irreversible.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the webhook to delete.`,
      },
    ],
  },
  {
    name: 'attio_delete_workspace_record',
    description: `Permanently deletes a workspace record from Attio by its record_id. This operation is irreversible.`,
    params: [
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the workspace record to delete.`,
      },
    ],
  },
  {
    name: 'attio_get_attribute',
    description: `Retrieves details of a single attribute on an Attio object or list, including its type, slug, configuration, and metadata.`,
    params: [
      { name: 'attribute', type: 'string', required: true, description: `Attribute slug or UUID.` },
      { name: 'object', type: 'string', required: true, description: `Object slug or UUID.` },
    ],
  },
  {
    name: 'attio_get_comment',
    description: `Retrieves a single comment by its comment_id in Attio. Returns the comment's content, author, thread, and resolution status.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the comment.`,
      },
    ],
  },
  {
    name: 'attio_get_company',
    description: `Retrieves a single company record by its record_id from Attio. Returns all attribute values with temporal and audit metadata.`,
    params: [
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the company record.`,
      },
    ],
  },
  {
    name: 'attio_get_current_token_info',
    description: `Identifies the current access token, the workspace it is linked to, and its permissions. Use to verify token validity or retrieve workspace information.`,
    params: [],
  },
  {
    name: 'attio_get_deal',
    description: `Retrieves a single deal record by its record_id from Attio. Returns all attribute values with temporal and audit metadata.`,
    params: [
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the deal record.`,
      },
    ],
  },
  {
    name: 'attio_get_list',
    description: `Retrieves details of a single list in the Attio workspace by its UUID or slug.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier or slug of the list.`,
      },
    ],
  },
  {
    name: 'attio_get_list_entry',
    description: `Retrieves a single list entry by its entry_id. Returns detailed information about a specific entry in an Attio list.`,
    params: [
      {
        name: 'entry_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the list entry.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier or slug of the list.`,
      },
    ],
  },
  {
    name: 'attio_get_note',
    description: `Retrieves a single note by its note_id in Attio. Returns the note's title, content (plaintext and markdown), tags, and creator information.`,
    params: [
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the note.`,
      },
    ],
  },
  {
    name: 'attio_get_object',
    description: `Retrieves details of a single object by its slug or UUID in Attio.`,
    params: [
      { name: 'object', type: 'string', required: true, description: `Object slug or UUID.` },
    ],
  },
  {
    name: 'attio_get_person',
    description: `Retrieves a single person record by its record_id from Attio. Returns all attribute values with temporal and audit metadata.`,
    params: [
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the person record.`,
      },
    ],
  },
  {
    name: 'attio_get_record',
    description: `Retrieve a specific record from Attio by its object type and record ID. Returns the full record including all attribute values with their complete audit trail (created_by_actor, active_from, active_until). Supports people, companies, deals, and custom objects.`,
    params: [
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `The slug or UUID of the object type the record belongs to. Common slugs: "people", "companies", "deals".`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The UUID of the record to retrieve.`,
      },
    ],
  },
  {
    name: 'attio_get_record_attribute_values',
    description: `Retrieves all values for a given attribute on a record in Attio. Can include historic values using show_historic parameter. Not available for COMINT or enriched attributes.`,
    params: [
      { name: 'attribute', type: 'string', required: true, description: `Attribute slug or UUID.` },
      { name: 'object', type: 'string', required: true, description: `Object slug or UUID.` },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the record.`,
      },
      {
        name: 'show_historic',
        type: 'boolean',
        required: false,
        description: `Whether to include historic values.`,
      },
    ],
  },
  {
    name: 'attio_get_task',
    description: `Retrieves a single task by its task_id in Attio. Returns the task's content, deadline, assignees, and linked records.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task.`,
      },
    ],
  },
  {
    name: 'attio_get_webhook',
    description: `Retrieves a single webhook by its webhook_id in Attio. Returns the webhook's target URL, event subscriptions, status, and metadata.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the webhook.`,
      },
    ],
  },
  {
    name: 'attio_get_workspace_member',
    description: `Retrieves a single workspace member by their workspace_member_id. Returns name, email, access level, and avatar information.`,
    params: [
      {
        name: 'workspace_member_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the workspace member.`,
      },
    ],
  },
  {
    name: 'attio_get_workspace_record',
    description: `Retrieves a single workspace record by its record_id from Attio. Returns all attribute values with temporal and audit metadata.`,
    params: [
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the workspace record.`,
      },
    ],
  },
  {
    name: 'attio_list_attribute_options',
    description: `Lists all select options for a select or multiselect attribute on an Attio object or list.`,
    params: [
      {
        name: 'attribute',
        type: 'string',
        required: true,
        description: `Attribute slug or UUID of the select/multiselect attribute.`,
      },
      { name: 'object', type: 'string', required: true, description: `Object slug or UUID.` },
    ],
  },
  {
    name: 'attio_list_attribute_statuses',
    description: `Lists all statuses for a status attribute on an Attio object or list. Returns status IDs, titles, and configuration.`,
    params: [
      {
        name: 'attribute',
        type: 'string',
        required: true,
        description: `Attribute slug or UUID of the status attribute.`,
      },
      { name: 'object', type: 'string', required: true, description: `Object slug or UUID.` },
    ],
  },
  {
    name: 'attio_list_attributes',
    description: `Lists the attribute schema for an Attio object or list, including slugs, types, and select/status configuration. Use to discover what attributes exist and their types before filtering or writing.`,
    params: [
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `Object slug or UUID to list attributes for.`,
      },
    ],
  },
  {
    name: 'attio_list_companies',
    description: `Lists company records in Attio with optional filtering and sorting. Use filter and sorts fields to narrow results. Returns paginated results.`,
    params: [
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter criteria for querying companies.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of records to return.`,
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
        description: `Sorting criteria for the results.`,
      },
    ],
  },
  {
    name: 'attio_list_deals',
    description: `Lists deal records in Attio with optional filtering and sorting. Returns paginated results.`,
    params: [
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter criteria for querying deals.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of records to return.`,
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
        description: `Sorting criteria for the results.`,
      },
    ],
  },
  {
    name: 'attio_list_entries',
    description: `Lists entries in a given Attio list with optional filtering and sorting. Returns records that belong to the specified list.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier or slug of the list.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter criteria for querying entries.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of entries to return.`,
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
        description: `Sorting criteria for the results.`,
      },
    ],
  },
  {
    name: 'attio_list_lists',
    description: `Retrieve all CRM lists available in the Attio workspace, along with their entries for a specific record. Lists are used to track pipeline stages, outreach targets, or custom groupings of records. Optionally filter entries by a parent record ID and object type.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of list entries to return per list. Defaults to 20.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of list entries to skip for pagination. Defaults to 0.`,
      },
    ],
  },
  {
    name: 'attio_list_meetings',
    description: `Lists all meetings in the Attio workspace. Optionally filter by participants or linked records. This endpoint is in beta.`,
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
    ],
  },
  {
    name: 'attio_list_notes',
    description: `List notes in Attio. Optionally filter by a parent object and record to retrieve notes attached to a specific person, company, deal, or other object. Supports pagination via limit (max 50) and offset.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of notes to return. Default is 10, maximum is 50.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of notes to skip before returning results. Default is 0. Use with limit for pagination.`,
      },
      {
        name: 'parent_object',
        type: 'string',
        required: false,
        description: `Filter notes by parent object slug or UUID. Examples: "people", "companies", "deals". Must be provided together with parent_record_id to filter by a specific record.`,
      },
      {
        name: 'parent_record_id',
        type: 'string',
        required: false,
        description: `Filter notes by parent record UUID. Must be provided together with parent_object.`,
      },
    ],
  },
  {
    name: 'attio_list_objects',
    description: `Retrieves all available objects (both system-defined and user-defined) in the Attio workspace. Fundamental for understanding workspace structure.`,
    params: [],
  },
  {
    name: 'attio_list_people',
    description: `Lists person records in Attio with optional filtering and sorting. Use filter and sorts fields to narrow results. Returns paginated results.`,
    params: [
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter criteria for querying people.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of records to return.`,
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
        description: `Sorting criteria for the results.`,
      },
    ],
  },
  {
    name: 'attio_list_record_entries',
    description: `Lists all entries across all lists for which a specific record is the parent in Attio. Returns list IDs, slugs, entry IDs, and creation timestamps.`,
    params: [
      { name: 'object', type: 'string', required: true, description: `Object slug or UUID.` },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the parent record.`,
      },
    ],
  },
  {
    name: 'attio_list_records',
    description: `List and query records for a specific Attio object type (e.g. people, companies, deals). Supports filtering by attribute values, sorting, and pagination with limit and offset. Returns guaranteed up-to-date data unlike the Search Records endpoint.`,
    params: [
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `The slug or UUID of the object type to list records for. Common slugs: "people", "companies", "deals".`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter object to narrow results to a subset of records. Structure depends on the attributes of the target object. Example: {"email_addresses": {"email_address": {"$eq": "alice@example.com"}}}`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of records to return. Defaults to 500.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of records to skip before returning results. Defaults to 0. Use with limit for pagination.`,
      },
      {
        name: 'sorts',
        type: 'array',
        required: false,
        description: `Array of sort objects to order results. Each sort object specifies a direction ("asc" or "desc"), an attribute slug or ID, and an optional field. Example: [{"direction": "asc", "attribute": "name"}]`,
      },
    ],
  },
  {
    name: 'attio_list_tasks',
    description: `List tasks in Attio, optionally filtered by linked record. Returns tasks with their content, deadline, completion status, assignees, and linked records. Use record filters to retrieve tasks associated with a specific contact, company, or deal.`,
    params: [
      {
        name: 'is_completed',
        type: 'boolean',
        required: false,
        description: `Filter tasks by completion status. Set to true to return only completed tasks, false for only incomplete tasks, or omit to return all tasks.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of tasks to return. Defaults to 20.`,
      },
      {
        name: 'linked_object',
        type: 'string',
        required: false,
        description: `Filter tasks linked to records of this object type. Use with linked_record_id. Common slugs: "people", "companies", "deals".`,
      },
      {
        name: 'linked_record_id',
        type: 'string',
        required: false,
        description: `Filter tasks linked to this specific record UUID. Use with linked_object to specify the object type.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of tasks to skip for pagination. Defaults to 0.`,
      },
    ],
  },
  {
    name: 'attio_list_threads',
    description: `Lists threads of comments on a record or list entry in Attio. Returns all comment threads associated with a specific record or list entry.`,
    params: [
      {
        name: 'parent_object',
        type: 'string',
        required: true,
        description: `Object slug of the parent record.`,
      },
      {
        name: 'parent_record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the parent record.`,
      },
    ],
  },
  {
    name: 'attio_list_user_records',
    description: `Lists user records in Attio with optional filtering and sorting. Returns paginated results.`,
    params: [
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter criteria for querying user records.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of records to return.`,
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
        description: `Sorting criteria for the results.`,
      },
    ],
  },
  {
    name: 'attio_list_webhooks',
    description: `Retrieves all webhooks in the Attio workspace. Returns webhook configurations, subscriptions, and statuses. Supports optional limit and offset pagination parameters.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of webhooks to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of webhooks to skip for pagination.`,
      },
    ],
  },
  {
    name: 'attio_list_workspace_members',
    description: `Lists all workspace members in the Attio workspace. Use to retrieve workspace member IDs needed for assigning owners or actor-reference attributes.`,
    params: [],
  },
  {
    name: 'attio_list_workspace_records',
    description: `Lists workspace records in Attio with optional filtering and sorting. Returns paginated results.`,
    params: [
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter criteria for querying workspace records.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of records to return.`,
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
        description: `Sorting criteria for the results.`,
      },
    ],
  },
  {
    name: 'attio_remove_from_list',
    description: `Remove a specific entry from an Attio list by its entry ID. This deletes the list entry but does not delete the underlying record. Obtain the entry ID from the Add to List response or by querying list entries. Returns 404 if the entry does not exist.`,
    params: [
      {
        name: 'entry_id',
        type: 'string',
        required: true,
        description: `The UUID of the list entry to remove. This is the entry ID returned when the record was added to the list, not the record ID itself.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The slug or UUID of the Attio list to remove the entry from.`,
      },
    ],
  },
  {
    name: 'attio_search_records',
    description: `Search for records in Attio for a given object type (people, companies, deals, or custom objects) using a fuzzy text query. Returns matching records with their IDs, labels, and key attributes.`,
    params: [
      {
        name: 'object',
        type: 'string',
        required: true,
        description: `The slug or UUID of the object type to search within. Common slugs: "people", "companies", "deals".`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Fuzzy text search string matched against names, emails, domains, phone numbers, and social handles. Pass an empty string to return all records.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page. Defaults to 20.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip for pagination. Defaults to 0.`,
      },
    ],
  },
]
