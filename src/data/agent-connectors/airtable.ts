import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'airtable_create_comment',
    description: `Add a comment to an Airtable record. Optionally specify a parentCommentId to reply in an existing thread. You can mention users with @[userId] syntax in the text. Requires the data.recordComments:write scope.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the table. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique ID of the record to comment on. Record IDs start with 'rec', e.g. recXXXXXXXXXXXXXX.`,
      },
      {
        name: 'table_id_or_name',
        type: 'string',
        required: true,
        description: `The ID or name of the table containing the record. Table IDs start with 'tbl'; names are the display name of the table.`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `The text content of the comment. Supports @[userId] syntax to mention users. Example: 'Please review this record @[usrXXXXXXXXXXXXXX]'.`,
      },
      {
        name: 'parentCommentId',
        type: 'string',
        required: false,
        description: `The ID of an existing comment to reply to, creating a threaded reply. Comment IDs start with 'com'. Omit to create a top-level comment.`,
      },
    ],
  },
  {
    name: 'airtable_create_field',
    description: `Create a new field (column) in an Airtable table. Specify the field name, type, and type-specific options. Common types include: singleLineText, multilineText, number, checkbox, singleSelect, multipleSelect, date, email, url, phoneNumber, currency, percent, duration, rating, formula, rollup, count, lookup, multipleRecordLinks, attachment. Requires schema.bases:write scope.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the target table. Found in the base URL: airtable.com/{base_id}/... — always starts with 'app'.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name for the new field. Must be unique within the table.`,
      },
      {
        name: 'table_id',
        type: 'string',
        required: true,
        description: `The ID of the table to add the field to. Table IDs start with 'tbl'.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The field type. Common values: singleLineText, multilineText, number, checkbox, singleSelect, multipleSelect, date, email, url, phoneNumber, currency, percent, duration, rating, formula, rollup, count, lookup, multipleRecordLinks, attachment.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the field, shown in the Airtable UI as field help text.`,
      },
      {
        name: 'options',
        type: 'object',
        required: false,
        description: `Type-specific field configuration object. For singleSelect/multipleSelect, provide {"choices": [{"name": "Option A"}, {"name": "Option B"}]}. For number, provide {"precision": 2}. For currency, provide {"precision": 2, "symbol": "$"}. For formula, provide {"formula": "UPPER({Name)"}. Refer to Airtable field options docs for each type.`,
      },
    ],
  },
  {
    name: 'airtable_create_records',
    description: `Create one or more records in an Airtable table. Provide an array of record objects, each with a 'fields' object mapping field names (or IDs) to values. Up to 10 records can be created in a single request. Returns the created records with their assigned IDs.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the table. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'records',
        type: 'array',
        required: true,
        description: `Array of record objects to create, each containing a 'fields' object mapping field names or IDs to values. Up to 10 records per request. Example: [{"fields": {"Name": "Alice", "Status": "Active"}}]`,
      },
      {
        name: 'table_id_or_name',
        type: 'string',
        required: true,
        description: `The ID or name of the table to create records in. Table IDs start with 'tbl'; names are the display name.`,
      },
      {
        name: 'returnFieldsByFieldId',
        type: 'boolean',
        required: false,
        description: `If true, field keys in the response will be field IDs (e.g. fldXXXXXXXXXXXXXX) instead of field names.`,
      },
      {
        name: 'typecast',
        type: 'boolean',
        required: false,
        description: `If true, Airtable will attempt to auto-convert string values to the appropriate field type (e.g. '2025-01-15' to a date field). Useful when passing data from external sources.`,
      },
    ],
  },
  {
    name: 'airtable_create_table',
    description: `Create a new table in an Airtable base. Specify the table name and initial field definitions. The first field in the fields array becomes the primary field. Requires schema.bases:write scope.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base where the new table will be created. Found in the base URL: airtable.com/{base_id}/... — always starts with 'app'.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: true,
        description: `Array of field definitions to create in the table. Each field must have at minimum a 'name' and 'type'. The first field becomes the primary field. Example: [{"name": "Name", "type": "singleLineText"}, {"name": "Status", "type": "singleSelect", "options": {"choices": [{"name": "Active"}, {"name": "Done"}]}}]`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name for the new table. Must be unique within the base.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the new table. Maximum 20000 characters.`,
      },
    ],
  },
  {
    name: 'airtable_create_webhook',
    description: `Create a new webhook for an Airtable base to receive real-time notifications when data changes. Provide an HTTPS notification URL and optionally specify event filters (dataTypes, changeTypes, table/field scope). Returns the webhook ID, expiration time, and MAC secret for payload verification. Requires the webhook:manage scope.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base to create the webhook for. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'notificationUrl',
        type: 'string',
        required: true,
        description: `The HTTPS URL that Airtable will send webhook POST requests to when changes occur. Must be a publicly accessible HTTPS endpoint.`,
      },
      {
        name: 'specification',
        type: 'object',
        required: false,
        description: `Optional webhook specification object to filter which events trigger notifications. Shape: {options: {filters?: {fromSources?, dataTypes?, changeTypes?, watchDataInFieldIds?, watchSchemasOfFieldIds?, watchDataInTableIds?, watchSchemasOfTableIds?, recordChangeScope?}}}. Omit to receive all events.`,
      },
    ],
  },
  {
    name: 'airtable_delete_comment',
    description: `Delete a comment from an Airtable record. API users can only delete comments they created. Enterprise Admins can delete any comment. Requires the data.recordComments:write scope.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the table. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The unique ID of the comment to delete. Comment IDs start with 'com', e.g. comXXXXXXXXXXXXXX.`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique ID of the record containing the comment to delete. Record IDs start with 'rec', e.g. recXXXXXXXXXXXXXX.`,
      },
      {
        name: 'table_id_or_name',
        type: 'string',
        required: true,
        description: `The ID or name of the table containing the record. Table IDs start with 'tbl'; names are the display name of the table.`,
      },
    ],
  },
  {
    name: 'airtable_delete_record',
    description: `Delete a single record from an Airtable table by its record ID. This action is permanent and cannot be undone — the record and all its field data will be removed from the table.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the table. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique ID of the record to delete. Record IDs start with 'rec', e.g. recXXXXXXXXXXXXXX. Deletion is permanent and cannot be undone.`,
      },
      {
        name: 'table_id_or_name',
        type: 'string',
        required: true,
        description: `The ID or name of the table containing the record to delete. Table IDs start with 'tbl'; names are the display name.`,
      },
    ],
  },
  {
    name: 'airtable_delete_records',
    description: `Delete multiple records from an Airtable table in a single request. Provide up to 10 record IDs to delete. Each record ID must start with 'rec' (e.g. recABCDEFGHIJKLMN). Returns a list of deleted record IDs with confirmed deletion status.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the table. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'records',
        type: 'array',
        required: true,
        description: `Array of record IDs to delete. Each ID must start with 'rec'. Maximum 10 records per request. Example: ["recABCDEFGHIJKLMN", "recXXXXXXXXXXXXXX"].`,
      },
      {
        name: 'table_id_or_name',
        type: 'string',
        required: true,
        description: `The ID or name of the table from which records will be deleted. Table IDs start with 'tbl'; names are the display name of the table.`,
      },
    ],
  },
  {
    name: 'airtable_delete_webhook',
    description: `Delete an Airtable webhook. This permanently stops all future notifications from this webhook. Requires the webhook:manage scope.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the webhook. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique ID of the webhook to delete. Webhook IDs can be retrieved from the List Webhooks tool.`,
      },
    ],
  },
  {
    name: 'airtable_get_base_schema',
    description: `Retrieve the full schema of an Airtable base, including all tables, fields, views, and field options. Useful for discovering the structure of a base before reading or writing records. Requires schema.bases:read scope.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base to retrieve the schema for. Found in the base URL: airtable.com/{base_id}/... — always starts with 'app'.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Optional array of additional data to include. Pass ["visibleFieldIds"] to include visible field IDs for each grid view in the schema response.`,
      },
    ],
  },
  {
    name: 'airtable_get_record',
    description: `Retrieve a single record from an Airtable table by its record ID. Returns the record's field values along with its ID and creation timestamp.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the table. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique ID of the record to retrieve. Record IDs start with 'rec', e.g. recXXXXXXXXXXXXXX.`,
      },
      {
        name: 'table_id_or_name',
        type: 'string',
        required: true,
        description: `The ID or name of the table containing the record. Table IDs start with 'tbl'; names are the display name.`,
      },
      {
        name: 'cellFormat',
        type: 'string',
        required: false,
        description: `Format for cell values. 'json' (default) returns structured objects; 'string' returns all values as strings. When using 'string', you must also provide timeZone and userLocale.`,
      },
      {
        name: 'includeDateDependencyMetadata',
        type: 'boolean',
        required: false,
        description: `If true, includes additional metadata about date dependency fields in the response.`,
      },
      {
        name: 'returnFieldsByFieldId',
        type: 'boolean',
        required: false,
        description: `If true, field keys in the response will be field IDs (e.g. fldXXXXXXXXXXXXXX) instead of field names.`,
      },
    ],
  },
  {
    name: 'airtable_list_bases',
    description: `List all Airtable bases accessible to the authenticated user. Returns base IDs, names, and permission levels. Supports pagination via offset token when there are more bases than returned in a single response.`,
    params: [
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Pagination token returned from a previous list bases response. Pass this value to retrieve the next page of bases.`,
      },
    ],
  },
  {
    name: 'airtable_list_comments',
    description: `List all comments on a specific Airtable record, ordered from newest to oldest. Supports pagination via pageSize and offset. Returns comment text, author details, timestamps, and threading information.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the table. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique ID of the record whose comments to list. Record IDs start with 'rec', e.g. recXXXXXXXXXXXXXX.`,
      },
      {
        name: 'table_id_or_name',
        type: 'string',
        required: true,
        description: `The ID or name of the table containing the record. Table IDs start with 'tbl'; names are the display name of the table.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Pagination offset token returned from a previous list comments response. Pass this value to retrieve the next page of comments.`,
      },
      {
        name: 'pageSize',
        type: 'number',
        required: false,
        description: `Number of comments to return per page. Maximum is 100. If not specified, Airtable defaults to returning all comments.`,
      },
    ],
  },
  {
    name: 'airtable_list_records',
    description: `List and query records from an Airtable table. Supports filtering by formula, sorting, pagination, field selection, and view scoping. Returns an array of records with their field values, and an offset token for fetching subsequent pages.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the table. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'table_id_or_name',
        type: 'string',
        required: true,
        description: `The ID or name of the table to list records from. Table IDs start with 'tbl'; names are the display name of the table.`,
      },
      {
        name: 'cellFormat',
        type: 'string',
        required: false,
        description: `Format for cell values. 'json' (default) returns structured objects; 'string' returns all values as strings. When using 'string', you must also provide timeZone and userLocale.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Array of field names or IDs to include in the response. If omitted, all fields are returned. Example: ["Name", "Status", "fldXXXXXXXXXXXXXX"]`,
      },
      {
        name: 'filterByFormula',
        type: 'string',
        required: false,
        description: `An Airtable formula to filter records. Only records where this formula evaluates to true will be returned. Example: {Status}='Active'`,
      },
      {
        name: 'maxRecords',
        type: 'number',
        required: false,
        description: `Maximum total number of records to return across all pages. Useful for capping large result sets.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Pagination offset token returned from a previous list request. Pass this value to retrieve the next page of records.`,
      },
      {
        name: 'pageSize',
        type: 'number',
        required: false,
        description: `Number of records to return per page. Maximum is 100. If not specified, Airtable defaults to 100.`,
      },
      {
        name: 'returnFieldsByFieldId',
        type: 'boolean',
        required: false,
        description: `If true, field keys in the response will be field IDs (e.g. fldXXXXXXXXXXXXXX) instead of field names. Useful for fields with special characters or to avoid name-collision issues.`,
      },
      {
        name: 'timeZone',
        type: 'string',
        required: false,
        description: `IANA time zone identifier to use when cellFormat is 'string'. Required when cellFormat='string'. Example: 'America/New_York'.`,
      },
      {
        name: 'userLocale',
        type: 'string',
        required: false,
        description: `User locale for date/time formatting when cellFormat is 'string'. Required when cellFormat='string'. Example: 'en-us'.`,
      },
      {
        name: 'view',
        type: 'string',
        required: false,
        description: `The name or ID of a view to scope results to. Records outside the view's filter and sort will be excluded.`,
      },
    ],
  },
  {
    name: 'airtable_list_webhook_payloads',
    description: `Retrieve past webhook payloads for an Airtable webhook. Useful for inspecting which changes triggered notifications and for cursor-based pagination through the payload history. Use the cursorForNextPayload value from the List Webhooks response as the cursor. Requires the webhook:manage scope.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the webhook. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique ID of the webhook whose payloads to retrieve. Webhook IDs can be retrieved from the List Webhooks tool.`,
      },
      {
        name: 'cursor',
        type: 'number',
        required: false,
        description: `Numeric cursor for pagination. Use the cursorForNextPayload value from the List Webhooks response to retrieve payloads starting from that position.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of payload records to return per page. Leave blank to use the Airtable API default.`,
      },
    ],
  },
  {
    name: 'airtable_list_webhooks',
    description: `List all webhooks configured for an Airtable base. Returns webhook IDs, notification URLs, enabled status, expiration times, and event specifications. Requires the webhook:manage scope.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base whose webhooks to list. Found in the base URL: airtable.com/{base_id}/...`,
      },
    ],
  },
  {
    name: 'airtable_refresh_webhook',
    description: `Refresh an Airtable webhook to extend its expiration time. Webhooks expire after 7 days by default; call this endpoint periodically to keep them active. Returns the new expiration time. Requires the webhook:manage scope.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the webhook. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique ID of the webhook to refresh. Webhook IDs can be retrieved from the List Webhooks tool.`,
      },
    ],
  },
  {
    name: 'airtable_update_comment',
    description: `Update the text of an existing comment on an Airtable record. Only the comment's original author can update it via the API. Requires the data.recordComments:write scope.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the table. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The unique ID of the comment to update. Comment IDs start with 'com', e.g. comXXXXXXXXXXXXXX.`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The unique ID of the record containing the comment. Record IDs start with 'rec', e.g. recXXXXXXXXXXXXXX.`,
      },
      {
        name: 'table_id_or_name',
        type: 'string',
        required: true,
        description: `The ID or name of the table containing the record. Table IDs start with 'tbl'; names are the display name of the table.`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `The new text content for the comment. Replaces the existing comment text entirely.`,
      },
    ],
  },
  {
    name: 'airtable_update_field',
    description: `Update a field's name, description, or options in an Airtable table. At least one of name, description, or options must be provided. Note: changing a field's type via update is not supported — create a new field instead. Requires schema.bases:write scope.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the target table. Found in the base URL: airtable.com/{base_id}/... — always starts with 'app'.`,
      },
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The ID of the field to update. Field IDs start with 'fld'. Use airtable_get_base_schema to discover field IDs.`,
      },
      {
        name: 'table_id',
        type: 'string',
        required: true,
        description: `The ID of the table containing the field to update. Table IDs start with 'tbl'.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the field, shown in the Airtable UI as field help text. At least one of name, description, or options must be provided.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New display name for the field. Must be unique within the table. At least one of name, description, or options must be provided.`,
      },
      {
        name: 'options',
        type: 'object',
        required: false,
        description: `Updated type-specific field configuration. For singleSelect/multipleSelect, provide {"choices": [{"name": "Option A"}, {"name": "Option B"}]}. For number, provide {"precision": 2}. At least one of name, description, or options must be provided.`,
      },
    ],
  },
  {
    name: 'airtable_update_records',
    description: `Update one or more existing records in an Airtable table using a merge (PATCH) strategy — only the fields you specify are changed; unspecified fields are left untouched. Provide an array of record objects each with an 'id' and 'fields'. Up to 10 records per request. Optionally enable upsert mode with 'performUpsert' to create records that don't match an existing ID.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the table. Found in the base URL: airtable.com/{base_id}/...`,
      },
      {
        name: 'records',
        type: 'array',
        required: true,
        description: `Array of record objects to update. Each must have an 'id' (the record ID starting with 'rec') and a 'fields' object with the fields to update. Up to 10 records per request. Example: [{"id": "recXXXXXXXXXXXXXX", "fields": {"Status": "Done"}}]`,
      },
      {
        name: 'table_id_or_name',
        type: 'string',
        required: true,
        description: `The ID or name of the table containing records to update. Table IDs start with 'tbl'; names are the display name.`,
      },
      {
        name: 'performUpsert',
        type: 'object',
        required: false,
        description: `When provided, enables upsert mode. Must be an object with a 'fieldsToMergeOn' array specifying which field names to match on for upsert. Records matching on those fields will be updated; non-matching records will be created. Example: {"fieldsToMergeOn": ["Email"]}`,
      },
      {
        name: 'returnFieldsByFieldId',
        type: 'boolean',
        required: false,
        description: `If true, field keys in the response will be field IDs (e.g. fldXXXXXXXXXXXXXX) instead of field names.`,
      },
      {
        name: 'typecast',
        type: 'boolean',
        required: false,
        description: `If true, Airtable will attempt to auto-convert string values to the appropriate field type. Useful when passing data from external sources.`,
      },
    ],
  },
  {
    name: 'airtable_update_table',
    description: `Update a table's name or description in an Airtable base. At least one of name or description must be provided. Requires schema.bases:write scope.`,
    params: [
      {
        name: 'base_id',
        type: 'string',
        required: true,
        description: `The ID of the Airtable base containing the table. Found in the base URL: airtable.com/{base_id}/... — always starts with 'app'.`,
      },
      {
        name: 'table_id_or_name',
        type: 'string',
        required: true,
        description: `The ID or name of the table to update. Table IDs start with 'tbl'; names are the display name of the table.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the table. Maximum 20000 characters. At least one of name or description must be provided.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the table. Must be unique within the base. At least one of name or description must be provided.`,
      },
    ],
  },
]
