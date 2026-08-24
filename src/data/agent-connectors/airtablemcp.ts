import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'airtablemcp_create_automation',
    description: `Creates and validates one automation in a base: a trigger plus ordered nodes —
action nodes, \`repeatingGroup\` (run inner nodes once per item), and \`conditionalGroup\`
(if/else-if/else branches). Many trigger and action types are supported;
get_create_automation_instructions has the full catalog. Saves the draft
configuration only — it is off until the user reviews and turns it on in the Airtable UI.
Prefer get_create_automation_instructions once per session for the full catalog.
Before building IDs, call list_tables_for_base(baseId). Call
get_table_schema(baseId, tables) before filtering on select /
multiSelect fields.
Every trigger and node input is an expression (literal, $ref, template, fn, or a plain
object/array) — not raw JSON. Field shapes, typed {obj}/{tuple} wrappers, write modes, and
an error index are in get_create_automation_instructions.

Flow:
1. create_automation(baseId, name, trigger, nodes). If isValid is false,
   nothing was saved: use errors to fix the inputs and call again. After a couple of failed
   attempts, report the errors to the user instead of looping.
2. On success only the draft configuration is saved; the automation is off. Tell the user
   to open the automationUrl in the Airtable UI to review and turn it on.
{"trigger":{"type":"recordCreated","inputs":{"tableId":"tbl..."}},"nodes":[{"key":"node1","type":"updateRecord","inputs":{"tableId":"tbl...","rowId":{"template":[{"$ref":"trigger","path":["id"]}]},"updateRecordMethod":"customFields","fields":{"fldStatus":{"template":["In Progress"]}}}}]}`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base to create the automation in.
Must start with "app" and is 17 characters long.
Example: "appZfrNIUEip5MazD".
Do not substitute user-facing names for baseId.
To get baseId, use the search_bases or list_bases tool.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name for the automation.` },
      {
        name: 'nodes',
        type: 'array',
        required: true,
        description: `Ordered array of nodes (actions, repeatingGroup, or conditionalGroup). Groups (conditionalGroup/repeatingGroup) may be nested at most 2 levels deep. See create_automation description for semantics and the expression language.`,
      },
      { name: 'trigger', type: 'object', required: true, description: `Trigger configuration.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the automation.`,
      },
    ],
  },
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
    name: 'airtablemcp_delete_automation',
    description: `Deletes an existing automation from a base. The automation must be off before it can be deleted.
The target automation must be off. If it is on, the user must turn it off in the
Airtable UI before it can be deleted.`,
    params: [
      {
        name: 'automationId',
        type: 'string',
        required: true,
        description: `The ID of the automation to delete.
Must start with "wfl" and is 17 characters long.
Example: "wflGlRtkBNWfYnPOV".
To get an automationId, use the create_automation tool.`,
      },
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the automation.
Must start with "app" and is 17 characters long.
Example: "appZfrNIUEip5MazD".
Do not substitute user-facing names for baseId.
To get baseId, use the search_bases or list_bases tool.`,
      },
    ],
  },
  {
    name: 'airtablemcp_delete_interface',
    description: `Deletes an interface from a base, including all of its pages. The published version, if
any, immediately stops being available to end users.
The agent MUST ask the user for explicit confirmation before calling this tool.
Interface deletion is destructive and should not be performed without the user's go-ahead.
Use list_pages_for_base to find the appropriate interfaceId.
To delete a single page within an interface instead, use delete_page.

On success of delete_interface, the response includes an actionId that can be
passed to revert_action to undo the deletion, restoring the interface with its
pages.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the interface to delete.
Must start with "app" and is 17 characters long.
Example: "appZfrNIUEip5MazD".
Do not substitute user-facing names for baseId.
To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'interfaceId',
        type: 'string',
        required: true,
        description: `The ID of the interface to delete.
Must start with "pbd" and is 17 characters long.`,
      },
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
    name: 'airtablemcp_delete_table',
    description: `Deletes an entire table from a base, including all of its records, fields, and views.
The agent MUST ask the user for explicit confirmation before calling this tool. Table
deletion is destructive and should not be performed without the user's go-ahead.
Use list_tables_for_base to find the appropriate tableId.
A base must always have at least one table, so the last remaining table in a base cannot be
deleted; attempting to do so returns an error.

On success, the response includes an actionId that can be passed to
revert_action to undo the deletion, restoring the table with its records,
fields, and views. Reverting is best-effort: it may fail if the base's schema changed after
the deletion (for example, another table took the deleted table's former position), so treat
the deletion as permanent unless a revert succeeds.
Example: delete the table tblABCDEFGHIJKLMN in base appZfrNIUEip5MazD:
{"baseId": "appZfrNIUEip5MazD", "tableId": "tblABCDEFGHIJKLMN"}`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the table to delete.
Must start with "app" and is 17 characters long.
Example: "appZfrNIUEip5MazD".
Do not substitute user-facing names for baseId.
To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The ID of the table to delete.
Must start with "tbl" and is 17 characters long.
Example: "tblGlReoTNWfYnXIG".
Do not substitute user-facing names for tableId.
To get tableId, use the list_tables_for_base tool.`,
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
    name: 'airtablemcp_fetch_automation_input_data',
    description: `Fetches dynamic input options for an automation action or trigger's input field (e.g. Slack
channels, Jira projects, calendars). Requires an \`externalAccountId\` from
list_external_accounts.
Use get_create_automation_instructions to discover which \`inputKey\`
values each action or trigger type expects.`,
    params: [
      {
        name: 'externalAccountId',
        type: 'string',
        required: true,
        description: `Must start with "eac" and is 17 characters long.
Example: "eacZfrNIUEip5MazD".
To get externalAccountId, use the list_external_accounts tool.`,
      },
      {
        name: 'inputKey',
        type: 'string',
        required: true,
        description: `The input field to fetch options for (e.g., "slackConversationId", "msTeamsTeamId").`,
      },
      {
        name: 'workflowNodeTypeId',
        type: 'string',
        required: true,
        description: `The action or trigger type ID. Use the camelCase type value (e.g., "sendToSlack", "atlassianJiraCreateIssue", "googleCalendarEventCreated").`,
      },
      {
        name: 'dependentInput',
        type: 'object',
        required: false,
        description: `Values of prerequisite inputs this field depends on. For example, to fetch MS Teams channels, pass {"msTeamsTeamId": "<team-id>"}.`,
      },
      {
        name: 'pagingCount',
        type: 'number',
        required: false,
        description: `Number of results to return. Default 10.`,
      },
      {
        name: 'pagingStartIndex',
        type: 'number',
        required: false,
        description: `Start index for pagination. Default 0.`,
      },
      {
        name: 'searchQuery',
        type: 'string',
        required: false,
        description: `Filter results by name.`,
      },
    ],
  },
  {
    name: 'airtablemcp_get_automation',
    description: `Gets the full configuration of a single automation in an Airtable base, including trigger
configuration, action nodes with their input expressions, and deployment status.
The returned configuration is the draft (the working copy the user edits). Set
includeDeployedVersion to true to also see the most recently published configuration
when it differs from the draft — useful for debugging deployed behavior. Edits always
apply to the draft.
Requires an automationId, which can be obtained from list_automations.
{"baseId": "appZfrNIUEip5MazD", "automationId": "wflGlRtkBNWfYnPOV"}`,
    params: [
      {
        name: 'automationId',
        type: 'string',
        required: true,
        description: `The ID of the automation to retrieve.
Must start with "wfl" and is 17 characters long.
Example: "wflGlRtkBNWfYnPOV".
To get an automationId, use the create_automation tool.`,
      },
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the automation.
Must start with "app" and is 17 characters long.
Example: "appZfrNIUEip5MazD".
Do not substitute user-facing names for baseId.
To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'includeDeployedVersion',
        type: 'boolean',
        required: false,
        description: `When true, each returned automation includes a \`deployedVersion\` field showing the most recently published configuration when it differs from the draft.`,
      },
    ],
  },
  {
    name: 'airtablemcp_get_create_automation_instructions',
    description: `Returns the full spec for create_automation — expression language, wrappers, function catalog, trigger and action input catalogs, pitfalls, and a complete example. Call once per session before building an automation payload.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: false,
        description: `The ID of the base you plan to create automations in. Providing this includes features that may be available for this base but not globally. If omitted, only globally available features are returned.`,
      },
    ],
  },
  {
    name: 'airtablemcp_get_form_schema',
    description: `Returns the schema of a form page — its structure, not the submitted-record data.

Returns the form's source table, submission action (create or update), and a hierarchical
breakdown of sections, rows, and field elements. Sections are the visual groups inside the
form (each with an optional title), rows are the columns-of-fields layout within a section,
and elements describe each individual field — its label, helper text, field type,
required/read-only status, any prefilled value, and any conditional visibility filter.
Single-select and multi-select field elements also list their valid choices.

Use this when the user asks how a form is organized, what fields it collects, or which
fields are required. visibilityFilters specifies the conditions under which a field or
section is shown, not a resolved shown/hidden state. Required fields are required only when
visible. Fields inside hidden sections are not visible. Do not call this on non-form pages.

Supports entry-level form pages (in an interface or standalone) and record-creation row
forms, forms embedded in other interface page types.
Do not assume baseId. Obtain it from search_bases or list_bases.
Use list_pages_for_base to find the pageId if needed.
Record-creation row forms appear in that tool's embeddedForms array; pass any one of the
form's interfaceIds as the interfaceId here.
{"baseId": "appZfrNIUEip5MazD", "pageId": "pagXxYyZzAaBbCcDd"}`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the form page.
Must start with "app" and is 17 characters long.
Example: "appZfrNIUEip5MazD".
Do not substitute user-facing names for baseId.
To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `The ID of the form page whose schema you want to read.
Must start with "pag" and is 17 characters long.
Example: "pagXxYyZzAaBbCcDd".`,
      },
      {
        name: 'interfaceId',
        type: 'string',
        required: false,
        description: `The ID of the interface containing the form page, if the form is in an interface.
Must start with "pbd" and is 17 characters long.`,
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
    name: 'airtablemcp_list_automations',
    description: `Lists automations in an Airtable base.
Returns metadata about each automation including its ID, name, deployment status, trigger info, and graph nodes.
Use this when the user asks about automations configured in a base.
Optionally filter by trigger type (e.g., 'agentTriggerReceived').
The returned configuration is the draft (the working copy the user edits). Set
includeDeployedVersion to true to also see each automation's most recently published
configuration when it differs from the draft — useful for debugging deployed behavior.
Edits always apply to the draft.
Do not assume baseId. Obtain it from search_bases or list_bases.
{"baseId": "appZfrNIUEip5MazD"}`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base to list automations from.
Must start with "app" and is 17 characters long.
Example: "appZfrNIUEip5MazD".
Do not substitute user-facing names for baseId.
To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'includeDeployedVersion',
        type: 'boolean',
        required: false,
        description: `When true, each returned automation includes a \`deployedVersion\` field showing the most recently published configuration when it differs from the draft.`,
      },
      {
        name: 'triggerType',
        type: 'string',
        required: false,
        description: `Optional trigger type to filter automations by (e.g., "agentTriggerReceived").`,
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
    name: 'airtablemcp_list_external_accounts',
    description: `Lists the external accounts (integrations) accessible to the current user, including accounts they own and accounts shared with them.
Each account includes its type (e.g. Google Sheets, Slack, Salesforce), a human-readable label, and an account configuration ID that can be used to reference the account in other tool calls.
Only user-managed integration accounts are returned.`,
    params: [],
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
    name: 'airtablemcp_list_views_for_table',
    description: `Lists the views in a table, returning each view's ID, name, and type.
Use this to discover viewId values needed by other tools, such as an automation
trigger that fires on records entering a view.
Do not assume baseId. Obtain it from search_bases or list_bases.
{"baseId": "appZfrNIUEip5MazD", "tableId": "Orders"}`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base that contains the table.
Must start with "app" and is 17 characters long.
Example: "appZfrNIUEip5MazD".
Do not substitute user-facing names for baseId.
To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The table to list views from.
Accepts either a table ID (e.g., "tblGlReoTNWfYnXIG") or a table name (e.g., "Orders").
Names are resolved case-insensitively within the base.
To discover tables, use the list_tables_for_base tool.`,
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
    name: 'airtablemcp_revert_action',
    description: `Reverts a previous eligible Airtable mutation by performing the inverse write, using the actionId it returned. Record updates are not revertible.
Use the actionId returned by an eligible mutating tool result. A tool result is eligible only if it explicitly returns an actionId. Examples include create_records_for_table or delete_records_for_table.
Reverts one actionId per call (a multi-action revert is not atomic). To revert several, call once per actionId in reverse completion order, stopping on the first error.
Example: revert an eligible mutation:
{"baseId": "appZfrNIUEip5MazD", "actionId": "actZOTa3BDHxlJNzf"}`,
    params: [
      {
        name: 'actionId',
        type: 'string',
        required: true,
        description: `The ID of the action to revert, from a prior eligible tool result in this session.
Must start with "act" and is 17 characters long.
Example: "actZOTa3BDHxlJNzf".`,
      },
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base the action ran in — the same baseId you used for the mutation that returned this actionId.
Must start with "app" and is 17 characters long.
Example: "appZfrNIUEip5MazD".
Do not substitute user-facing names for baseId.
To get baseId, use the search_bases or list_bases tool.`,
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
    name: 'airtablemcp_search_candidate_linked_records',
    description: `Searches for records that are valid candidates for a linked-record (foreign-key) field,
returning each candidate's record ID along with the fields the linked-record field is
configured to display (the same fields shown on the in-product card). Use this to find the
record ID to put in a linked-record field when calling submit_form or
update_records_for_table.
Use list_pages_for_base to find the pageId if needed.
Use get_form_schema (for forms) to discover the linked field's fieldId.
Pass the fieldId of the linked-record field you are filling (not the table it links to —
the foreign table is resolved automatically). The pageId must be a page that surfaces the
linked field: for submit_form this is the form's pageId; for
update_records_for_table pass the interface page that shows the record/field
being edited. Pass interfaceId when the page lives inside an interface; omit it for a
standalone form.

A linked-record field's candidates can be restricted by dynamic filters that reference the
record's OTHER field values, so you must supply those values for the filters to apply:
when filling a NEW record (e.g. for submit_form), always pass fields with
the other values you have so far or plan to submit; when editing an EXISTING record, pass
recordId, plus fields for any other values you are changing in the same update (a value in
fields takes precedence over the record's stored value; anything not in fields falls back
to the stored value). If you pass neither, the filters are evaluated against blank values
and the results may include records that are not actually selectable, or miss ones that
are.`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the page and the linked-record field.
Must start with "app" and is 17 characters long.
Example: "appZfrNIUEip5MazD".
Do not substitute user-facing names for baseId.
To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'fieldId',
        type: 'string',
        required: true,
        description: `The ID of the linked-record (foreign-key) field whose candidate records you want to
search.
Field IDs must start with "fld" and is 17 characters long.
Example: "fldGlRtkBNWfYnPOV".
Do not substitute user-facing names for IDs.
To get fieldId, use the list_tables_for_base tool.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `The ID of the page that surfaces the linked-record field.
Must start with "pag" and is 17 characters long.
Example: "pagXxYyZzAaBbCcDd".`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The text to search candidate records by. Matching is case-insensitive against each
record's display name. Pass an empty string to list candidates without filtering.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `The values entered so far (or planned) for the OTHER fields of the record being
filled. The linked field's cross-field dynamic record-selection filters are evaluated
against these values, and omitting them can return records that are not actually
selectable. When searching candidates for a new record (e.g. a
submit_form submission), always pass every other field value you know.
When editing an existing record (recordId provided), pass the values you are changing
in the same update — each value here overrides the record's stored value, and fields
not passed fall back to the stored values.
Field IDs must start with "fld" and is 17 characters long.
Example: "fldGlRtkBNWfYnPOV".
Do not substitute user-facing names for IDs.
To get fieldId, use the list_tables_for_base tool.`,
      },
      {
        name: 'interfaceId',
        type: 'string',
        required: false,
        description: `The ID of the interface containing the page, or null/omitted for a standalone form (one
that is not inside an interface).
Must start with "pbd" and is 17 characters long.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of records to return. The server may return fewer. Defaults to a
small page size when omitted.`,
      },
      {
        name: 'recordId',
        type: 'string',
        required: false,
        description: `The ID of the EXISTING record being updated, when searching linked records in the
context of an existing record (e.g. for update_records_for_table). The
record's stored values are used to apply the linked field's cross-field dynamic
record-selection filters, except for values you also pass in fields, which take
precedence — so pass both when the update changes a value those filters depend on.
Must start with "rec" and is 17 characters long.
Example: "recZOTa3BDHxlJNzf".
Do not substitute user-facing names for IDs
To get recordId, use the list_records_for_table tool or display_records_for_table tools.`,
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
    name: 'airtablemcp_submit_form',
    description: `Submits a form, creating a new record in the form's source table.
Call get_form_schema first on the form's pageId to discover which fields the
form collects, their fieldIds, types, required/read-only flags, select-field choices,
and any prefilled values and visibility filters — do not assume every column on the
source table is on the form. The schema response includes the interfaceId (null for
standalone forms) to pass back here.
For linked-record fields, use search_candidate_linked_records to find the
record IDs to submit. Always include that tool's fields param with the other values you
plan to submit here, so its results respect the linked field's dynamic record-selection
filters.
Use list_pages_for_base to find the pageId if needed.
Pass the baseId and pageId of the form, the interfaceId if the form lives inside
an interface (otherwise omit it), and a fields object mapping field IDs to cell
values (same shape as the create_records_for_table tool).

For singleSelect and multipleSelects fields, the value must be a choice name from
the field's options.choices in the get_form_schema response, exactly as
written there — do not invent or reword option names.

Supports entry-level form pages and record-creation row forms (forms embedded in other
interface page types).

Respect the visibility filters from get_form_schema: do not submit a value
for any field hidden by its own visibilityFilters or its section's visibilityFilters.

A field is visible only when the submitted values satisfy its filter and the filters of
any fields it depends on. Do not set a field that wasn't requested just to make another
visible. If a hidden field is requested to be filled but the values don't reveal it, confirm
how to proceed before submitting.
{"baseId": "appXxx...", "pageId": "pagXxx...", "interfaceId": "pbdXxx...", "fields": {"fldXxx...": "Hello world"}}`,
    params: [
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the form page.
Must start with "app" and is 17 characters long.
Example: "appZfrNIUEip5MazD".
Do not substitute user-facing names for baseId.
To get baseId, use the search_bases or list_bases tool.`,
      },
      {
        name: 'fields',
        type: 'object',
        required: true,
        description: `An object containing field IDs as keys and field values as values.
Field values should match the field type (e.g., strings for singleLineText fields,
numbers for numeric fields, arrays of strings for multipleSelects fields).
For singleSelect fields, use the option name as a plain string (e.g., "Done").
For multipleSelects fields, use an array of option name strings (e.g., ["Tag1", "Tag2"]).
For multipleRecordLinks (linked-record) fields, use an array of record IDs from the linked table.
Field IDs must start with "fld" and is 17 characters long.
Example: "fldGlRtkBNWfYnPOV".
Do not substitute user-facing names for IDs.
To get fieldId, use the list_tables_for_base tool.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `The ID of the form page to submit.
Must start with "pag" and is 17 characters long.
Example: "pagXxYyZzAaBbCcDd".`,
      },
      {
        name: 'interfaceId',
        type: 'string',
        required: false,
        description: `The ID of the interface containing the form page, or null/omitted for a
standalone form. When set, this is required so the agent's interface-level
access permissions are evaluated correctly.
Must start with "pbd" and is 17 characters long.`,
      },
    ],
  },
  {
    name: 'airtablemcp_test_automation_webhook_trigger',
    description: `Re-runs the trigger test for a genericWebhookReceived automation and waits briefly for a
newly captured payload schema. This is an automation trigger operation, not an Airtable
Webhooks API operation.
Call get_automation first. The external system must POST a representative
object payload to the returned webhookUrl before this tool can capture its schema.
For a deployed automation, posting the sample also runs the live automation and may cause
side effects. This tool does not send the sample or deploy or undeploy the automation.
{"baseId": "appZfrNIUEip5MazD", "automationId": "wflGlRtkBNWfYnPOV"}`,
    params: [
      {
        name: 'automationId',
        type: 'string',
        required: true,
        description: `The ID of the automation whose webhook trigger should be tested.
Must start with "wfl" and is 17 characters long.
Example: "wflGlRtkBNWfYnPOV".
To get an automationId, use the create_automation tool.`,
      },
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the automation.
Must start with "app" and is 17 characters long.
Example: "appZfrNIUEip5MazD".
Do not substitute user-facing names for baseId.
To get baseId, use the search_bases or list_bases tool.`,
      },
    ],
  },
  {
    name: 'airtablemcp_update_automation',
    description: `Replaces the entire draft configuration (trigger, graph, name, description) of an existing
automation. If the automation is on, live behavior is unchanged until unpublished changes
are applied with Update in the Airtable UI.
Use list_automations to find the automationId, then call
get_automation to retrieve the current trigger, nodes, and description
before updating — list_automations returns node summaries without their inputs. Call
get_create_automation_instructions once per session for the full catalog
of trigger types, action types, and expression shapes.
This is a full replacement — all fields (trigger, nodes, name, description) must be
provided, even if only one changed. The previous configuration is discarded entirely.

On success, the response includes an actionId that can be passed to
revert_action to undo the update and restore the previous configuration.`,
    params: [
      {
        name: 'automationId',
        type: 'string',
        required: true,
        description: `The ID of the automation to update.
Must start with "wfl" and is 17 characters long.
Example: "wflGlRtkBNWfYnPOV".
To get an automationId, use the create_automation tool.`,
      },
      {
        name: 'baseId',
        type: 'string',
        required: true,
        description: `The ID of the base containing the automation.
Must start with "app" and is 17 characters long.
Example: "appZfrNIUEip5MazD".
Do not substitute user-facing names for baseId.
To get baseId, use the search_bases or list_bases tool.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name for the automation.` },
      {
        name: 'nodes',
        type: 'array',
        required: true,
        description: `Ordered array of nodes (actions, repeatingGroup, or conditionalGroup). Groups (conditionalGroup/repeatingGroup) may be nested at most 2 levels deep. See create_automation description for semantics and the expression language.`,
      },
      { name: 'trigger', type: 'object', required: true, description: `Trigger configuration.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the automation.`,
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
