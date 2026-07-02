import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'airtablemcp_create_base',
    description: `Creates a new Airtable base with specified tables and fields in a workspace. Use list_workspaces to get the workspaceId first. The first field in each table's fields array becomes the primary field.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name for the new base.` },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The ID of the workspace to create the base in. Must start with "wsp" and is 17 characters long. Do not substitute user-facing names for workspaceId. To get workspaceId, use the list_workspaces tool.`,
      },
      {
        name: 'tables',
        type: 'array',
        required: false,
        description: `Optional. The tables to create in the new base. If omitted, a default table ("Table 1") with a "Name" singleLineText field is created.`,
      },
    ],
  },
  {
    name: 'airtablemcp_create_field',
    description: `Creates a new field in an existing Airtable table. Use search_bases and list_tables_for_base to get baseId and tableId first. Supports all field types including singleSelect, number, formula, date, and more.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the table. Must start with "app" and is 17 characters long. Do not substitute user-facing names for baseId. To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'field',
        type: 'object',
        required: true,
        description: `The field definition to create. Must include at minimum 'name' and 'type'. Some field types require an 'options' object (e.g., singleSelect, number, currency, formula). Types without options: singleLineText, email, url, multilineText, phoneNumber, richText, barcode, multipleAttachments, singleCollaborator, multipleCollaborators.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The ID of the table to create the field in. Must start with "tbl" and is 17 characters long. Do not substitute user-facing names for tableId. To get tableId, use the list_tables_for_base tool.`,
      },
    ],
  },
  {
    name: 'airtablemcp_create_interface',
    description: `Creates a new interface within an Airtable base. After creation, use create_page to add pages and publish_interface to make the interface live for end users.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base in which to create the interface. Must start with "app" and is 17 characters long.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name for the new interface.`,
      },
    ],
  },
  {
    name: 'airtablemcp_create_page',
    description: `Creates a new page within an existing Airtable interface. Supported page types are visualization, dashboard, and customElement. Use describe_page_type and describe_page_element to discover the correct pageConfiguration shape.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base in which to create the page. Must start with "app" and is 17 characters long.`,
      },
      {
        name: 'interfaceId',
        type: 'string',
        required: true,
        description: `The ID of the interface in which to create the page. Must start with "pbd" and is 17 characters long.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name for the new page.`,
      },
      {
        name: 'pageConfiguration',
        type: 'object',
        required: true,
        description: `Page type-specific configuration. Schema is provided by describe_page_type and describe_page_element.`,
      },
      {
        name: 'pageType',
        type: 'string',
        required: true,
        description: `The type of page to create.`,
      },
    ],
  },
  {
    name: 'airtablemcp_create_record_comment',
    description: `Creates a comment on a specific Airtable record. Supports user and group mentions using @[userId] or @[userGroupId] tokens in the comment text, and supports threaded replies via the optional parentCommentId parameter.`,
    params: [
      { name: 'baseId', type: 'string', required: true, description: `The ID of the base.` },
      {
        name: 'recordId',
        type: 'string',
        required: true,
        description: `The ID of the record to comment on.`,
      },
      { name: 'tableId', type: 'string', required: true, description: `The ID of the table.` },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `The text of the comment to create.`,
      },
      {
        name: 'parentCommentId',
        type: 'string',
        required: false,
        description: `The ID of the parent comment to reply to, for creating a threaded reply.`,
      },
    ],
  },
  {
    name: 'airtablemcp_create_records_for_table',
    description: `Creates new records in an Airtable table. Use search_bases and list_tables_for_base to get baseId and tableId before calling this tool. You can create up to 50 records per request.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the table. Must start with "app" and is 17 characters long. Do not substitute user-facing names for baseId. To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'records',
        type: 'array',
        required: true,
        description: `An array of record objects to create. Each record must have a "fields" property containing the field values.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The ID of the table to create records in. Must start with "tbl" and is 17 characters long. Do not substitute user-facing names for tableId. To get tableId, use the list_tables_for_base tool.`,
      },
      {
        name: 'fieldIds',
        type: 'array',
        required: false,
        description: `The IDs of the fields to include in each returned record. If omitted, only the fields you wrote are returned. Pass explicit IDs to include fields you did not write (e.g. the primary field or formula/rollup results).`,
      },
      {
        name: 'typecast',
        type: 'boolean',
        required: false,
        description: `Whether or not to perform best-effort automatic data conversion from string values. Defaults to false to preserve data integrity.`,
      },
    ],
  },
  {
    name: 'airtablemcp_create_table',
    description: `Creates a new table in an existing Airtable base. Use search_bases or list_bases to get the baseId first. The first field in the fields array becomes the primary field of the table.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base to create the table in. Must start with "app" and is 17 characters long. Do not substitute user-facing names for baseId. To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: true,
        description: `The first field becomes the primary field and must be one of these types: singleLineText, email, url, multilineText, number, percent, currency, duration, date, dateTime, phoneNumber, barcode. Remaining fields can be any type.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Must be unique within the base (case-insensitive).`,
      },
      { name: 'description', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'airtablemcp_delete_page',
    description: `Deletes an existing page from an interface. This action is destructive and requires explicit user confirmation before calling. Use publish_interface after deletion to propagate the change to the live interface.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the page to delete. Must start with "app" and is 17 characters long.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `The ID of the page to delete. Must start with "pag" and is 17 characters long.`,
      },
    ],
  },
  {
    name: 'airtablemcp_delete_records_for_table',
    description: `Permanently deletes records from an Airtable table by record IDs. Use list_records_for_table to get record IDs first. You can delete up to 50 records per request. This action is irreversible.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the table. Must start with "app" and is 17 characters long. Do not substitute user-facing names for baseId. To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'recordIds',
        type: 'array',
        required: true,
        description: `An array of record IDs to delete. Must start with "rec" and is 17 characters long. To get record IDs, use the list_records_for_table or search_records tools.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The ID of the table to delete records from. Must start with "tbl" and is 17 characters long. Do not substitute user-facing names for tableId. To get tableId, use the list_tables_for_base tool.`,
      },
    ],
  },
  {
    name: 'airtablemcp_describe_page_element',
    description: `Returns the JSON schema for a page element of the specified type. Use this before create_page to discover the element config shape required within pageConfiguration.`,
    params: [
      {
        name: 'elementType',
        type: 'string',
        required: true,
        description: `The page element type to get the config schema for.`,
      },
    ],
  },
  {
    name: 'airtablemcp_describe_page_type',
    description: `Returns the JSON schema for a page type's configuration. Use this before create_page to discover the required pageConfiguration shape for the chosen page type.`,
    params: [
      {
        name: 'pageType',
        type: 'string',
        required: true,
        description: `The page type to get the config schema for.`,
      },
    ],
  },
  {
    name: 'airtablemcp_get_record_for_page',
    description: `Gets a single record's details from an interface page element using a navigation path. Supports traversing linked record relationships by appending edges to the path.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the page. Must start with "app" and is 17 characters long.`,
      },
      {
        name: 'interfaceId',
        type: 'string',
        required: true,
        description: `The ID of the interface that contains the page. Must start with "pbd" and is 17 characters long.`,
      },
      {
        name: 'path',
        type: 'object',
        required: true,
        description: `The navigation path from the page where the record was listed.`,
      },
      {
        name: 'fieldIds',
        type: 'array',
        required: false,
        description: `Only data for fields whose IDs are in this list will be included in the result.`,
      },
    ],
  },
  {
    name: 'airtablemcp_get_table_schema',
    description: `Gets detailed schema information for specified tables and fields in an Airtable base, returning the field ID, type, and configuration for each specified field. Use this before filtering on singleSelect or multipleSelects fields to retrieve choice IDs.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the tables.`,
      },
      {
        name: 'tables',
        type: 'array',
        required: true,
        description: `An array of table IDs and corresponding field IDs to get schema information for.`,
      },
    ],
  },
  {
    name: 'airtablemcp_list_bases',
    description: `Lists all Airtable bases that you have access to in your account, including favorited and recently viewed bases. If the response includes an offset, pass it in a subsequent call to retrieve the next page of results.`,
    params: [
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous list_bases response.`,
      },
    ],
  },
  {
    name: 'airtablemcp_list_pages_for_base',
    description: `Lists all interfaces and their pages for a base, returning page IDs, names, and page-type-specific metadata. Use this to discover interfaces, dashboards, overview pages, and forms available in a base.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base to list pages from. Must start with "app" and is 17 characters long.`,
      },
    ],
  },
  {
    name: 'airtablemcp_list_record_comments',
    description: `Lists comments on a specific Airtable record, ordered from newest to oldest, with support for pagination. Comments may contain user mentions in @[userId] or @[userGroupId] format, and the mentioned field maps these IDs to display names and emails.`,
    params: [
      { name: 'baseId', type: 'string', required: true, description: `The ID of the base.` },
      { name: 'recordId', type: 'string', required: true, description: `The ID of the record.` },
      { name: 'tableId', type: 'string', required: true, description: `The ID of the table.` },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Pass the offset from a previous response to fetch the next page.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `The number of comments to return per page.`,
      },
    ],
  },
  {
    name: 'airtablemcp_list_records_for_page',
    description: `Lists records from an Airtable interface page. Use this for bases with interface-only access (permissionLevel "none") or when querying interface/page data. Obtain pageId and interfaceId from list_pages_for_base.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the page. Must start with "app" and is 17 characters long. Do not substitute user-facing names for baseId. To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'interfaceId',
        type: 'string',
        required: true,
        description: `The ID of the interface that contains the page. Must start with "pbd" and is 17 characters long.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `The ID of the interface page to read records from. Must start with "pag" and is 17 characters long.`,
      },
      {
        name: 'elementId',
        type: 'string',
        required: false,
        description: `The ID of a specific element to query records for. Required for dashboard pages. Obtain element IDs from the dashboardElements array in the list_pages_for_base response. Must start with "pel" and is 17 characters long.`,
      },
      {
        name: 'fieldIds',
        type: 'array',
        required: false,
        description: `Only data for fields whose IDs are in this list will be included in the result. If not provided, fields visible in the page element's visualization will be returned.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Additional filters to apply on top of the page element's built-in filters. These are combined with the element's static filters using AND.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `The maximum number of records to return in the response.`,
      },
    ],
  },
  {
    name: 'airtablemcp_list_records_for_table',
    description: `Lists records queried from an Airtable table, with support for field selection, pagination, sorting, record ID filtering, and structured filters. Obtain baseId and tableId from search_bases and list_tables_for_base before calling this tool.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the table.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The table to list records from (table ID or table name).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to start from for paginated requests.`,
      },
      {
        name: 'fieldIds',
        type: 'array',
        required: false,
        description: `Only data for fields whose IDs or names are in this list will be included in the result.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Structured filters to apply to the records.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `The maximum number of records to return in the response.`,
      },
      {
        name: 'recordIds',
        type: 'array',
        required: false,
        description: `An array of record IDs to filter by.`,
      },
      {
        name: 'sort',
        type: 'array',
        required: false,
        description: `A list of sort objects specifying how records will be ordered.`,
      },
    ],
  },
  {
    name: 'airtablemcp_list_tables_for_base',
    description: `Gets the summary of a specific Airtable base, including the schemas of all its tables with field names and types. If the base is not found or returns a permission error, the user may have interface-only access.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base to get the summary of.`,
      },
    ],
  },
  {
    name: 'airtablemcp_list_workspaces',
    description: `Lists all Airtable workspaces the current user has access to, along with their permission level in each. This is typically the first tool to call when you need a workspaceId.`,
    params: [
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Pagination offset from the previous response.`,
      },
    ],
  },
  {
    name: 'airtablemcp_ping',
    description: `Pings the Airtable MCP server to check if it is running and reachable. Use this to verify connectivity before performing other operations.`,
    params: [],
  },
  {
    name: 'airtablemcp_publish_interface',
    description: `Publishes an interface, promoting each page's working draft to the live version that end users see. Publishing is idempotent — re-publishing with no new changes is a no-op. Pages with publishing state "disabled" are skipped.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the interface. Must start with "app" and is 17 characters long.`,
      },
      {
        name: 'interfaceId',
        type: 'string',
        required: true,
        description: `The ID of the interface to publish. Must start with "pbd" and is 17 characters long.`,
      },
    ],
  },
  {
    name: 'airtablemcp_search_bases',
    description: `Searches for Airtable bases by name using a partial, case-insensitive match. Returns bases sorted by relevance score, along with a recommended base ID and a hint on whether the user needs to explicitly select a base.`,
    params: [
      {
        name: 'searchQuery',
        type: 'string',
        required: true,
        description: `The query string to search for bases by name (case-insensitive, partial matches supported).`,
      },
    ],
  },
  {
    name: 'airtablemcp_search_records',
    description: `Searches for records in a table using a free-text query with fuzzy matching and token-based search. Prefer this over list_records_for_table for free-text search on large tables.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the table. Must start with "app" and is 17 characters long.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: true,
        description: `The fields to search over. Either pass an array of field IDs/names, or the literal string "ALL_SEARCHABLE_FIELDS" to search across all searchable fields.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query. Matches are case-insensitive and term-order independent.`,
      },
      {
        name: 'table',
        type: 'string',
        required: true,
        description: `The table to search. Accepts either a table ID (e.g., "tblGlReoTNWfYnXIG") or a table name (e.g., "Orders"). Names are resolved case-insensitively within the base.`,
      },
    ],
  },
  {
    name: 'airtablemcp_update_field',
    description: `Updates the name, description, and/or options of a field in an existing Airtable table. At least one of name, description, or options must be specified. Use list_tables_for_base to get fieldId.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the table. Must start with "app" and is 17 characters long. Do not substitute user-facing names for baseId. To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'fieldId',
        type: 'string',
        required: true,
        description: `The ID of the field to update. Field IDs must start with "fld" and is 17 characters long. Do not substitute user-facing names for IDs. To get fieldId, use the list_tables_for_base tool.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The ID of the table containing the field. Must start with "tbl" and is 17 characters long. Do not substitute user-facing names for tableId. To get tableId, use the list_tables_for_base tool.`,
      },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name for the field. Must be unique within the table (case-insensitive).`,
      },
      {
        name: 'options',
        type: 'object',
        required: false,
        description: `Type-specific field options. Currently supports updating formula expressions for formula fields.`,
      },
    ],
  },
  {
    name: 'airtablemcp_update_records_for_table',
    description: `Updates records in an Airtable table, leaving all unspecified fields unchanged. Use search_bases and list_tables_for_base to get baseId and tableId first. You can update up to 50 records per request.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the table. Must start with "app" and is 17 characters long. Do not substitute user-facing names for baseId. To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'records',
        type: 'array',
        required: true,
        description: `An array of record objects to update. Each record must have a "fields" property. Include "id" to update by record ID, or use performUpsert to match by field values.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The ID of the table to update records in. Must start with "tbl" and is 17 characters long. Do not substitute user-facing names for tableId. To get tableId, use the list_tables_for_base tool.`,
      },
      {
        name: 'fieldIds',
        type: 'array',
        required: false,
        description: `The IDs of the fields to include in each returned record. If omitted, only the fields you wrote are returned.`,
      },
      {
        name: 'performUpsert',
        type: 'object',
        required: false,
        description: `Enables upsert behavior. When set, records without a recordId use the fields in fieldIdsToMergeOn to match existing records. If no match, a new record is created. If a match is found, it is updated. If multiple matches, the request fails.`,
      },
      {
        name: 'typecast',
        type: 'boolean',
        required: false,
        description: `Whether or not to perform best-effort automatic data conversion from string values. Defaults to false to preserve data integrity.`,
      },
    ],
  },
  {
    name: 'airtablemcp_update_table',
    description: `Updates an existing table's name and/or description in an Airtable base. At least one of name or description must be provided. Use search_bases and list_tables_for_base to get baseId and tableId first.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the table. Must start with "app" and is 17 characters long. Do not substitute user-facing names for baseId. To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The ID of the table to update. Must start with "tbl" and is 17 characters long. Do not substitute user-facing names for tableId. To get tableId, use the list_tables_for_base tool.`,
      },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name for the table. Must be unique within the base (case-insensitive).`,
      },
    ],
  },
]
