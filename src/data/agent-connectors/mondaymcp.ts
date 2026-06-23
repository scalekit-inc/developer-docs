import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mondaymcp_agentcatalog',
    description: `Browse the account-wide catalog of available trigger types and skills for monday platform agents. READ-ONLY â no agent_id required.

Use this tool to discover what's available BEFORE wiring anything to a specific agent.

ACTIONS:
- list_triggers: { block_reference_ids? } â returns available trigger types.
  Each entry has block_reference_id (required for manage_agent_triggers action:"add"), name, description,
  field_schemas (describes field_values shape), and required_fields (fields to collect from the user).
  Note: only triggers that can be added programmatically appear here. OAuth/3rd-party triggers (Slack, Gmail, Salesforce, etc.)
  require user setup in the monday.com UI and will not appear here.

- list_skills: {} â returns available skills with id, name, description.
  Never guess or invent a skill id â always look it up here before calling manage_agent_skills action:"add".

USAGE EXAMPLES:
- List all trigger types:    { "action": "list_triggers" }
- Fetch specific trigger:    { "action": "list_triggers", "block_reference_ids": ["some-block-ref-id"] }
- List all skills:           { "action": "list_skills" }

RELATED TOOLS:
- manage_agent_triggers â use block_reference_id from list_triggers to attach a trigger to a specific agent
- manage_agent_skills â use skill id from list_skills, or action:"create" to author a new skill, then attach to an agent
- manage_agent â manage the agent entity itself (create, update, delete, activate, etc.)`,
    params: [
      { name: 'action', type: 'string', required: true, description: `"list_triggers" â fetch available trigger types with block_reference_id, field_schemas, and required_fields. Call before using manage_agent_triggers action:"add". "list_skills" â fetch available skills with id, name, description. Call before using manage_agent_skills action:"add".` },
      { name: 'block_reference_ids', type: 'array', required: false, description: `Used with action:"list_triggers". Fetch specific trigger types by block_reference_id. Omit to return all trigger types.` },
    ],
  },
  {
    name: 'mondaymcp_allmondayapi',
    description: `Execute any monday.com API operation by generating GraphQL queries and mutations dynamically. Make sure you ask only for the fields you need and nothing more. When providing the query/mutation - use get_graphql_schema and get_type_details tools first to understand the schema before crafting your query.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Custom GraphQL query/mutation. you need to provide the full query / mutation` },
      { name: 'variables', type: 'string', required: true, description: `JSON string containing the variables for the GraphQL operation` },
    ],
  },
  {
    name: 'mondaymcp_allwidgetsschema',
    description: `Fetch complete JSON Schema 7 definitions for all available widget types in monday.com.
    
    This tool is essential before creating widgets as it provides:
    - Complete schema definitions for all supported widgets
    - Required and optional fields for each widget type
    - Data type specifications and validation rules
    - Detailed descriptions of widget capabilities
    
    Use this tool when you need to:
    - Understand widget configuration requirements before creating widgets
    - Validate widget settings against official schemas
    - Plan widget implementations with proper data structures
    
    The response includes JSON Schema 7 definitions that describe exactly what settings each widget type accepts.`,
    params: [
    ],
  },
  {
    name: 'mondaymcp_boardinsights',
    description: `This tool allows you to calculate insights about board's data by filtering, grouping and aggregating columns. For example, you can get the total number of items in a board, the number of items in each status, the number of items in each column, etc. Use this tool when you need to get a summary of the board's data, for example, you want to know the total number of items in a board, the number of items in each status, the number of items in each column, etc.[REQUIRED PRECONDITION]: Before using this tool, if new columns were added to the board or if you are not familiar with the board's structure (column IDs, column types, status labels, etc.), first use get_board_info to understand the board metadata. This is essential for constructing proper filters and knowing which columns are available.[IMPORTANT]: For some columns, human-friendly label is returned inside 'LABEL_<column_id' field. E.g. for column with id 'status_123' the label is returned inside 'LABEL_status_123' field.`,
    params: [
      { name: 'boardId', type: 'number', required: true, description: `The id of the board to get insights for` },
      { name: 'aggregations', type: 'array', required: false, description: `The aggregations to get. Before sending the aggregations, read guidelines.aggregation from get_column_type_info with fetchMode "guidelines" for a relevant column type on this board. Transformative functions and plain columns (no function) must be in group by.` },
      { name: 'filters', type: 'array', required: false, description: `The configuration of filters to apply on the items. Use get_board_info for column ids and types on the board. Before sending the filters, use get_column_type_info with fetchMode "guidelines" and use data.guidelines.filter (null if that type has no documented rules).` },
      { name: 'filtersOperator', type: 'string', required: false, description: `The operator to use for the filters` },
      { name: 'groupBy', type: 'array', required: false, description: `The columns to group by. All columns in the group by must be in the aggregations as well without a function.` },
      { name: 'limit', type: 'number', required: false, description: `The limit of the results` },
      { name: 'orderBy', type: 'array', required: false, description: `The columns to order by, will control the order of the items in the response` },
    ],
  },
  {
    name: 'mondaymcp_changeitemcolumnvalues',
    description: `Change the column values of an item in a monday.com board. [REQUIRED PRECONDITION]: For board-relation linking tasks, call link_board_items_workflow before using this tool.`,
    params: [
      { name: 'boardId', type: 'number', required: true, description: `The ID of the board that contains the item to be updated` },
      { name: 'columnValues', type: 'string', required: true, description: `A string containing the new column values for the item following this structure: {\\"column_id\\": \\"value\\",... you can change multiple columns at once, note that for status column you must use nested value with 'label' as a key and for date column use 'date' as key} - example: "{\\"text_column_id\\":\\"New text\\", \\"status_column_id\\":{\\"label\\":\\"Done\\"}, \\"date_column_id\\":{\\"date\\":\\"2023-05-25\\"}, \\"phone_id\\":\\"123-456-7890\\", \\"email_id\\":\\"test@example.com\\"}"` },
      { name: 'itemId', type: 'number', required: true, description: `The ID of the item to be updated` },
      { name: 'createLabelsIfMissing', type: 'boolean', required: false, description: `If true, create missing Status/Dropdown labels when setting those columns. Requires permission to change board structure. Omit or false to only use existing labels.` },
    ],
  },
  {
    name: 'mondaymcp_createautomation',
    description: `
    Creates an automation on a monday board from a structured natural-language description.

Use this tool only when you know:
- boardId
- the user's intended trigger
- at least one intended action
- any details the user provided that are relevant to the trigger, conditions, or actions

The caller does not need to know the exact available automation blocks or their required fields. Describe the user's intent clearly â the tool will translate that intent into supported blocks and values.

If a required detail is missing from the user's request, ask for clarification before calling the tool.

If the tool returns status: "needs_clarification", present the unresolved fields to the user, gather answers, then call the tool again.

Describe the automation in this format:

Trigger:
  When <the event that should start the automation>
  Details:
    <relevant detail>: <value>

Conditions:
  - Only if <condition that should be true>
    Details:
      <relevant detail>: <value>

Actions:
  - <action the automation should perform>:
      <relevant detail>: <value>

Rules:
- Use one trigger.
- Conditions are optional.
- Multiple conditions mean AND.
- Use one or more actions.
- Do not use branching.
- Use natural language, not block IDs or internal field names.
- Actions may reference values from the trigger context, such as "{{item name}}", "{{creator}}", "{{status}}", "{{group}}", or "{{board}}".

Terminology:
- Trigger: the event that starts the automation, such as "when a new item is created".
- Conditions: optional requirements that must be true before actions run.
- Actions: what the automation does when it runs.

Example:

Trigger:
  When a new item is created

Actions:
  - Send a notification:
      Recipient: John Snow
      Title: Important Update
      Message: The item "{{item name}}" was created.

  - Move the item to a group:
      Group: Top group
`,
    params: [
      { name: 'boardId', type: 'string', required: true, description: `The numeric board ID as a string.` },
      { name: 'userPrompt', type: 'string', required: true, description: `Structured description of the automation to create.` },
    ],
  },
  {
    name: 'mondaymcp_createboard',
    description: `Create a monday.com board`,
    params: [
      { name: 'boardName', type: 'string', required: true, description: `The name of the board to create` },
      { name: 'boardDescription', type: 'string', required: false, description: `The description of the board to create` },
      { name: 'boardKind', type: 'string', required: false, description: `The kind of board to create` },
      { name: 'boardOwnerIds', type: 'array', required: false, description: `Optional list of user IDs to set as board owners` },
      { name: 'workspaceId', type: 'string', required: false, description: `The ID of the workspace to create the board in` },
    ],
  },
  {
    name: 'mondaymcp_createcolumn',
    description: `Create a new column in a monday.com board`,
    params: [
      { name: 'boardId', type: 'number', required: true, description: `The id of the board to which the new column will be added` },
      { name: 'columnTitle', type: 'string', required: true, description: `The title of the column to be created` },
      { name: 'columnType', type: 'string', required: true, description: `The type of the column to be created` },
      { name: 'columnDescription', type: 'string', required: false, description: `The description of the column to be created` },
      { name: 'columnSettings', type: 'string', required: false, description: `Column-specific configuration settings as a JSON string. Use get_column_type_info with fetchMode "schema" for the JSON schema for the given column type.` },
    ],
  },
  {
    name: 'mondaymcp_createdashboard',
    description: `Use this tool to create a new monday.com dashboard that aggregates data from one or more boards. 
    Dashboards provide visual representations of board data through widgets and charts.
    
    Use this tool when users want to:
    - Create a dashboard to visualize board data
    - Aggregate information from multiple boards
    - Set up a data visualization container for widgets`,
    params: [
      { name: 'board_ids', type: 'array', required: true, description: `List of board IDs as strings (min 1 element)` },
      { name: 'name', type: 'string', required: true, description: `Human-readable dashboard title (UTF-8 chars)` },
      { name: 'workspace_id', type: 'string', required: true, description: `ID of the workspace that will own the dashboard` },
      { name: 'board_folder_id', type: 'string', required: false, description: `Optional folder ID within workspace to place this dashboard (if not provided, dashboard will be placed in workspace root)` },
      { name: 'kind', type: 'string', required: false, description: `Visibility level: PUBLIC or PRIVATE` },
    ],
  },
  {
    name: 'mondaymcp_createdoc',
    description: `Create a new monday.com doc either inside a workspace or attached to an item (via a doc column). After creation, the provided markdown will be appended to the document.

LOCATION TYPES:
- workspace: Creates a document in a workspace (requires workspace_id, optional doc_kind, optional folder_id, optional docOwnerIds)
- item: Creates a document attached to an item (requires item_id, optional column_id, optional docOwnerIds)

USAGE EXAMPLES:
- Workspace doc: { location: "workspace", workspace_id: 123, doc_name: "My Doc", doc_kind: "private" , markdown: "..." }
- Workspace doc in folder: { location: "workspace", workspace_id: 123, doc_name: "My Doc", folder_id: 17264196 , markdown: "..." }
- Item doc: { location: "item", item_id: 456, doc_name: "My Doc", column_id: "doc_col_1" , markdown: "..." }
- Workspace doc with agent owner: { location: "workspace", workspace_id: 123, doc_name: "My Doc", markdown: "...", docOwnerIds: ["<agent_owner_user_id>"] }`,
    params: [
      { name: 'doc_name', type: 'string', required: true, description: `Name for the new document.` },
      { name: 'location', type: 'string', required: true, description: `Location where the document should be created - either in a workspace or attached to an item` },
      { name: 'markdown', type: 'string', required: true, description: `Markdown content that will be imported into the newly created document as blocks.` },
      { name: 'column_id', type: 'string', required: false, description: `[OPTIONAL - use only when location="item"] ID of an existing "doc" column on the board which contains the item. If not provided, the tool will create a new doc column automatically when creating a doc on an item.` },
      { name: 'doc_kind', type: 'string', required: false, description: `[OPTIONAL - use only when location="workspace"] Document kind (public/private/share). Defaults to public.` },
      { name: 'docOwnerIds', type: 'array', required: false, description: `Optional list of user IDs to set as document owners at creation time. Use this to add the agent owner so they retain access to the document. Ownership is set inside the creation mutation itself, bypassing the permission checks that would block a subsequent add_subscribers_to_object call.` },
      { name: 'folder_id', type: 'number', required: false, description: `[OPTIONAL - use only when location="workspace"] Optional folder ID to place the document inside a specific folder` },
      { name: 'item_id', type: 'number', required: false, description: `[REQUIRED - use only when location="item"] Item ID to attach the new document to` },
      { name: 'workspace_id', type: 'number', required: false, description: `[REQUIRED - use only when location="workspace"] Workspace ID under which to create the new document` },
    ],
  },
  {
    name: 'mondaymcp_createfolder',
    description: `Create a new folder in a monday.com workspace`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the folder to be created` },
      { name: 'workspaceId', type: 'string', required: true, description: `The ID of the workspace where the folder will be created` },
      { name: 'color', type: 'string', required: false, description: `The color of the folder` },
      { name: 'customIcon', type: 'string', required: false, description: `The custom icon of the folder` },
      { name: 'fontWeight', type: 'string', required: false, description: `The font weight of the folder` },
      { name: 'parentFolderId', type: 'string', required: false, description: `The ID of the parent folder` },
    ],
  },
  {
    name: 'mondaymcp_createform',
    description: `Create a monday.com form. Also creates a backing board to store responses. Returns the formToken for future mutations.`,
    params: [
      { name: 'destination_workspace_id', type: 'string', required: true, description: `No description.` },
      { name: 'board_kind', type: 'string', required: false, description: `No description.` },
      { name: 'board_owner_ids', type: 'array', required: false, description: `No description.` },
      { name: 'board_owner_team_ids', type: 'array', required: false, description: `No description.` },
      { name: 'board_subscriber_ids', type: 'array', required: false, description: `User IDs to notify on board activity.` },
      { name: 'board_subscriber_teams_ids', type: 'array', required: false, description: `Team IDs to notify on board activity.` },
      { name: 'destination_folder_id', type: 'string', required: false, description: `No description.` },
      { name: 'destination_folder_name', type: 'string', required: false, description: `No description.` },
      { name: 'destination_name', type: 'string', required: false, description: `Board name (stores form responses).` },
    ],
  },
  {
    name: 'mondaymcp_createformsubmission',
    description: `Submit a response to a monday.com WorkForm. Use get_form first to retrieve the WorkForm, then:
- Inspect each question's showIfRules to determine which questions are conditionally shown based on previous answers.
- Inspect each question's settings for any answer constraints (e.g. rating limits, select options, label limits).
- Take note of any titles, descriptions, and content blocks to present the form naturally as you walk the user through it.
- Take note of pages and question order to present questions in the correct sequence.
Gather all answers upfront before calling this tool â do not submit one question at a time. Accepts a bare form token, a full WorkForm URL (e.g. https://forms.monday.com/forms/{form_token}?r=use1), or a shortened wkf.ms URL (e.g. https://wkf.ms/4tqP28t) â shortened URLs are automatically resolved by following the redirect. Returns the submission ID.`,
    params: [
      { name: 'answers', type: 'array', required: true, description: `Array of answers to submit. Each answer specifies a question_id and the value for that question type.` },
      { name: 'form_timezone_offset', type: 'integer', required: true, description: `The timezone offset of the submitter in minutes (e.g. -120 for UTC-2, 0 for UTC).` },
      { name: 'form_token', type: 'string', required: true, description: `The unique token identifying the WorkForm. Can be a bare token, a full WorkForm URL (e.g. https://forms.monday.com/forms/abc123?r=use1), or a shortened wkf.ms URL (e.g. https://wkf.ms/4tqP28t). Shortened URLs are automatically resolved by following the redirect.` },
      { name: 'password', type: 'string', required: false, description: `The password for the WorkForm. Only required if the WorkForm has password protection enabled (check features.password.enabled from get_form). If required, ask the user for the password before submitting.` },
      { name: 'tags', type: 'array', required: false, description: `Tags to attach to the submission â each tag maps a value to a specific board column.` },
    ],
  },
  {
    name: 'mondaymcp_creategroup',
    description: `Create a new group in a monday.com board. Groups are sections that organize related items. Use when users want to add structure, categorize items, or create workflow phases. Groups can be positioned relative to existing groups and assigned predefined colors. Items will always be created in the top group and so the top group should be the most relevant one for new item creation`,
    params: [
      { name: 'boardId', type: 'string', required: true, description: `The ID of the board to create the group in` },
      { name: 'groupName', type: 'string', required: true, description: `The name of the new group (maximum 255 characters)` },
      { name: 'groupColor', type: 'string', required: false, description: `The color for the group. Must be one of the predefined Monday.com group colors: #037f4c, #00c875, #9cd326, #cab641, #ffcb00, #784bd1, #9d50dd, #007eb5, #579bfc, #66ccff, #bb3354, #df2f4a, #ff007f, #ff5ac4, #ff642e, #fdab3d, #7f5347, #c4c4c4, #757575` },
      { name: 'positionRelativeMethod', type: 'string', required: false, description: `Whether to position the new group before or after the relativeTo group` },
      { name: 'relativeTo', type: 'string', required: false, description: `The ID of the group to position this new group relative to` },
    ],
  },
  {
    name: 'mondaymcp_createitem',
    description: `Create a new item with provided values, create a subitem under a parent item, or duplicate an existing item and update it with new values. Use parentItemId when creating a subitem under an existing item. Use duplicateFromItemId when copying an existing item with modifications.[REQUIRED PRECONDITION]: Before using this tool, if new columns were added to the board or if you are not familiar with the board's structure (column IDs, column types, status labels, etc.), first use get_board_info to understand the board metadata. This is essential for constructing proper column values and knowing which columns are available.`,
    params: [
      { name: 'boardId', type: 'number', required: true, description: `The id of the board to which the new item will be added` },
      { name: 'columnValues', type: 'string', required: true, description: `A string containing the new column values for the item following this structure: {\\"column_id\\": \\"value\\",... you can change multiple columns at once, note that for status column you must use nested value with 'label' as a key and for date column use 'date' as key} - example: "{\\"text_column_id\\":\\"New text\\", \\"status_column_id\\":{\\"label\\":\\"Done\\"}, \\"date_column_id\\":{\\"date\\":\\"2023-05-25\\"},\\"dropdown_id\\":\\"value\\", \\"phone_id\\":\\"123-456-7890\\", \\"email_id\\":\\"test@example.com\\"}"` },
      { name: 'name', type: 'string', required: true, description: `The name of the new item to be created, must be relevant to the user's request` },
      { name: 'duplicateFromItemId', type: 'number', required: false, description: `The id of existing item to duplicate and update with new values (only provide when duplicating)` },
      { name: 'groupId', type: 'string', required: false, description: `The id of the group id to which the new item will be added, if its not clearly specified, leave empty` },
      { name: 'parentItemId', type: 'number', required: false, description: `The id of the parent item under which the new subitem will be created` },
    ],
  },
  {
    name: 'mondaymcp_createnotification',
    description: `Send a notification to a user via the bell icon and optionally by email. Use target_type "Post" for updates/replies or "Project" for items/boards.`,
    params: [
      { name: 'target_id', type: 'string', required: true, description: `The target ID (update/reply ID for Post type, item/board ID for Project type)` },
      { name: 'target_type', type: 'string', required: true, description: `The target type (Post for update/reply, Project for item/board)` },
      { name: 'text', type: 'string', required: true, description: `The notification text` },
      { name: 'user_id', type: 'string', required: true, description: `The user ID to send the notification to` },
    ],
  },
  {
    name: 'mondaymcp_createupdate',
    description: `Create a new update (comment/post) on a monday.com item. Updates can be used to add comments, notes, or discussions to items. You can optionally mention users, teams, or boards in the update. You can also reply to an existing update by using the parentId parameter.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `The update text to be created. Do not use @ to mention users, use the mentionsList field instead. use html tags to format the text, dont use markdown.` },
      { name: 'itemId', type: 'number', required: true, description: `The id of the item to which the update will be added` },
      { name: 'mentionsList', type: 'string', required: false, description: `Optional JSON array of mentions in the format: [{"id": "123", "type": "User"}, {"id": "456", "type": "Team"}]. Valid types are: User, Team, Board, Project` },
      { name: 'parentId', type: 'number', required: false, description: `The ID of the update to reply to. Use this parameter when you want to reply on an existing update leave it empty if you want to create a new update` },
    ],
  },
  {
    name: 'mondaymcp_createview',
    description: `Create a new board view (tab) with optional filters and sorting. This creates a saved view on a monday.com board that users can switch to.

Filter operators: any_of, not_any_of, is_empty, is_not_empty, greater_than, lower_than, between, contains_text, not_contains_text

Example filter for people column: { "rules": [{ "column_id": "people", "compare_value": ["person-12345"], "operator": "any_of" }] }
Example filter for status column: { "rules": [{ "column_id": "status", "compare_value": [1], "operator": "any_of" }] }`,
    params: [
      { name: 'boardId', type: 'string', required: true, description: `The board ID to create the view on` },
      { name: 'filter', type: 'object', required: false, description: `Filter configuration for the view` },
      { name: 'name', type: 'string', required: false, description: `The name of the view (e.g. "High Priority Items", "My Tasks")` },
      { name: 'settings', type: 'string', required: false, description: `Type-specific view settings as a JSON object (e.g. column visibility, group_by for TABLE). The shape varies by view type â call get_view_schema_by_type with the same ViewKind to discover the supported structure. For TABLE views, prefer the dedicated create_view_table tool which exposes a strongly-typed settings field.` },
      { name: 'sort', type: 'array', required: false, description: `Sort configuration for the view` },
      { name: 'type', type: 'string', required: false, description: `The type of board view to create. Use TABLE for standard board views.` },
    ],
  },
  {
    name: 'mondaymcp_createviewtable',
    description: `Create a new table-type board view with optional filters, sort, tags, and table-specific settings (column visibility/order and group-by). Use this instead of create_view when you need to configure table-specific settings. For a simple table view, create_view also works.

Filter operators: any_of, not_any_of, is_empty, is_not_empty, greater_than, lower_than, between, contains_text, not_contains_text

Example settings.columns: { "column_properties": [{ "column_id": "status", "visible": true }], "column_order": ["name", "status", "date"] }
Example settings.group_by: { "conditions": [{ "columnId": "status" }], "hideEmptyGroups": true }`,
    params: [
      { name: 'boardId', type: 'string', required: true, description: `The board ID to create the table view on` },
      { name: 'filter', type: 'object', required: false, description: `Filter configuration for the view` },
      { name: 'name', type: 'string', required: false, description: `The name of the view (e.g. "High Priority Items", "My Tasks")` },
      { name: 'settings', type: 'object', required: false, description: `Table-specific view settings (column visibility/order, group-by)` },
      { name: 'sort', type: 'array', required: false, description: `Sort configuration for the view` },
      { name: 'tags', type: 'array', required: false, description: `Tags to apply to the view` },
    ],
  },
  {
    name: 'mondaymcp_createwidget',
    description: `Create a new widget in a dashboard or board view with specific configuration settings.
    
    This tool creates data visualization widgets that display information from monday.com boards:
    **Parent Containers:**
    - **DASHBOARD**: Place widget in a dashboard (most common use case)
    - **BOARD_VIEW**: Place widget in a specific board view
    
    **Critical Requirements:**
    1. **Schema Compliance**: Widget settings MUST conform to the JSON schema for the specific widget type
    2. **Use all_widgets_schema first**: Always fetch widget schemas before creating widgets
    3. **Validate settings**: Ensure all required fields are provided and data types match
    
    **Workflow:**
    1. Use 'all_widgets_schema' to get schema definitions
    2. Prepare widget settings according to the schema
    3. Use this tool to create the widget`,
    params: [
      { name: 'parent_container_id', type: 'string', required: true, description: `ID of the parent container (dashboard ID or board view ID)` },
      { name: 'parent_container_type', type: 'string', required: true, description: `Type of parent container: DASHBOARD or BOARD_VIEW` },
      { name: 'widget_kind', type: 'string', required: true, description: `Type of widget to create: i.e CHART, NUMBER, BATTERY` },
      { name: 'widget_name', type: 'string', required: true, description: `Widget display name (1-255 UTF-8 chars)` },
      { name: 'settings', type: 'object', required: false, description: `Widget-specific settings as JSON object conforming to widget schema. Use all_widgets_schema tool to get the required schema for each widget type.` },
    ],
  },
  {
    name: 'mondaymcp_createworkflow',
    description: `Creates a new empty workflow in a monday.com workspace.

Use this when the user wants to build a new standalone workflow from scratch. Workflows are cross-board, workspace-level â distinct from automations (use create_automation for those). You only need a workspaceId to get started â all other fields are optional.

Returns:
- workflowObjectId: the workflow object ID
- workflowDraftId: the current draft version ID â workflows start as drafts and must be published before they run

Terminology:
- Workflows vs. automations: workflows are standalone objects scoped to a workspace. Automations (create_automation) are per-board trigger/action rules. They are different products.
- Draft: the editable, inactive version of a workflow. Changes are made on the draft version until it is published as the live version.
- Privacy: PUBLIC â visible to all workspace members (default). PRIVATE â restricted access. SHAREABLE â accessible to guests outside the account.

Note: if directing the user to the workflow in the UI, the correct URL path is custom_objects/, not workflows/ â e.g. {account}.monday.com/custom_objects/{workflowObjectId}.
`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `The ID of the workspace to create the workflow in.` },
      { name: 'description', type: 'string', required: false, description: `Optional workflow description.` },
      { name: 'folderId', type: 'string', required: false, description: `Optional folder ID to place the workflow in.` },
      { name: 'ownerIds', type: 'array', required: false, description: `Optional list of user IDs to set as workflow owners.` },
      { name: 'privacyKind', type: 'string', required: false, description: `Workflow visibility: PUBLIC (default), PRIVATE, or SHAREABLE (accessible to guests outside the account).` },
      { name: 'title', type: 'string', required: false, description: `Workflow title. Defaults to "New Workflow" if not provided.` },
    ],
  },
  {
    name: 'mondaymcp_createworkspace',
    description: `Create a new workspace in monday.com`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the new workspace to be created` },
      { name: 'workspaceKind', type: 'string', required: true, description: `The kind of workspace to create` },
      { name: 'accountProductId', type: 'string', required: false, description: `The account product ID associated with the workspace` },
      { name: 'description', type: 'string', required: false, description: `The description of the new workspace` },
    ],
  },
  {
    name: 'mondaymcp_finalizeassetupload',
    description: `Finalize a file upload and create the asset on monday.com. Call this after uploading the file to the presigned URL from get_asset_upload_url. Requires the etag value from the PUT response headers. Automatically attaches the uploaded asset to the specified file column on the item. Returns the created asset_id.`,
    params: [
      { name: 'boardId', type: 'string', required: true, description: `The board's unique identifier` },
      { name: 'columnId', type: 'string', required: true, description: `The file or doc column's unique identifier to attach the uploaded asset to` },
      { name: 'etag', type: 'string', required: true, description: `The ETag header value from the PUT response when uploading to the presigned URL` },
      { name: 'itemId', type: 'string', required: true, description: `The item's unique identifier` },
      { name: 'uploadId', type: 'string', required: true, description: `The upload_id returned by get_asset_upload_url` },
    ],
  },
  {
    name: 'mondaymcp_formquestionseditor',
    description: `Create, update, or delete a question in a monday.com form`,
    params: [
      { name: 'action', type: 'string', required: true, description: `Action to perform on the question of a form. create requires question. update requires questionId and question with type always included. delete requires questionId.` },
      { name: 'formToken', type: 'string', required: true, description: `No description.` },
      { name: 'question', type: 'object', required: false, description: `The question to create or update. Always include type, then only the fields you want to set or change.` },
      { name: 'questionId', type: 'string', required: false, description: `Question ID. Required for update/delete.` },
    ],
  },
  {
    name: 'mondaymcp_getassets',
    description: `Get assets (files) by their IDs. Returns file metadata including name, extension, size, public URL (valid for 1 hour), thumbnail URL, upload date, and who uploaded it.`,
    params: [
      { name: 'ids', type: 'array', required: true, description: `Array of asset IDs to fetch` },
    ],
  },
  {
    name: 'mondaymcp_getassetuploadurl',
    description: `Get a presigned URL to upload a file to monday.com. Returns an upload_id and upload_url.

After calling this tool, upload the file to the returned URL using an HTTP PUT request and capture the ETag header from the response:

curl -i -X PUT "<upload_url>" \\
  -H "Content-Type: <the contentType you provided>" \\
  --data-binary @<local_file_path>

The response includes an ETag header (e.g. ETag: "abc123...") â save this value.

Then call finalize_asset_upload with the upload_id, etag, board_id, item_id, and column_id to complete the upload and attach the file to an item's file column.

Max file size: 500MB.`,
    params: [
      { name: 'contentType', type: 'string', required: true, description: `The MIME type of the file (e.g. "application/pdf", "image/png", "text/plain")` },
      { name: 'fileName', type: 'string', required: true, description: `The name of the file to upload, including extension (e.g. "report.pdf")` },
      { name: 'fileSize', type: 'integer', required: true, description: `The file size in bytes. Maximum 500MB (524288000 bytes)` },
    ],
  },
  {
    name: 'mondaymcp_getautomationruns',
    description: `Read automation/workflow run history. Read-only.

Modes:
- "history": paginated run feed (state, duration, error reason). Use "filters" to narrow results and "nextPageOffset" to page (offset-only â next page = previous offset + returned count).
- "detail": single run by "triggerUuid" (required) â returns block steps and MCP tool calls. Set "includeToolEvents": false to skip tool calls.

Scope: provide "boardId" for a specific board or "accountWide": true. One is required.

Known event states: "success", "failure", "exhausted".`,
    params: [
      { name: 'mode', type: 'string', required: true, description: `history = paginated run feed, detail = single run by triggerUuid` },
      { name: 'accountWide', type: 'boolean', required: false, description: `Set true to query account-wide (required if no boardId)` },
      { name: 'blockEventsOffset', type: 'integer', required: false, description: `detail: block-events page offset` },
      { name: 'boardId', type: 'string', required: false, description: `Target a specific board by numeric ID` },
      { name: 'filters', type: 'object', required: false, description: `history: run filters` },
      { name: 'includeToolEvents', type: 'boolean', required: false, description: `detail: include MCP tool calls (default true)` },
      { name: 'nextPageOffset', type: 'integer', required: false, description: `history: page offset (offset-only pagination)` },
      { name: 'toolEventsOffset', type: 'integer', required: false, description: `detail: tool-events page offset` },
      { name: 'triggerUuid', type: 'string', required: false, description: `detail: required â the run UUID to inspect` },
    ],
  },
  {
    name: 'mondaymcp_getautomationstatistics',
    description: `Aggregate automation run statistics. Read-only.

Breakdowns:
- "totals": success/failure/total counts at the account or board level.
- "by_entity": per-automation and per-workflow counts for a given "runStatus" (required: "success" | "failure" | "exhausted"). Use "excludeAutomationIds" to omit specific automations.

Scope: provide "boardId" for a specific board or "accountWide": true. One is required.

Optional "userIds" narrows results to specific creators.`,
    params: [
      { name: 'breakdown', type: 'string', required: true, description: `totals = success/failure/total counts, by_entity = per automation/workflow` },
      { name: 'accountWide', type: 'boolean', required: false, description: `Set true to query account-wide (required if no boardId)` },
      { name: 'boardId', type: 'string', required: false, description: `Target a specific board by numeric ID` },
      { name: 'excludeAutomationIds', type: 'array', required: false, description: `by_entity: automation IDs to exclude from breakdown` },
      { name: 'runStatus', type: 'string', required: false, description: `by_entity: required run status to break down` },
      { name: 'userIds', type: 'array', required: false, description: `Narrow to specific creator user IDs` },
    ],
  },
  {
    name: 'mondaymcp_getboardactivity',
    description: `Get board activity logs for a specified time range (defaults to last 30 days). Optionally filter by item ids or user ids to avoid fetching activity for the entire board.`,
    params: [
      { name: 'boardId', type: 'number', required: true, description: `The id of the board to get activity for` },
      { name: 'fromDate', type: 'string', required: false, description: `Start date for activity range (ISO8601DateTime format). Defaults to 30 days ago` },
      { name: 'includeData', type: 'boolean', required: false, description: `Whether to include the raw data payload for each activity entry. The data field contains the full before/after state of changes and can be very large. Only set to true when you need the detailed change data.` },
      { name: 'itemIds', type: 'array', required: false, description: `Filter activity to specific item ids. Omit to get activity for the whole board.` },
      { name: 'toDate', type: 'string', required: false, description: `End date for activity range (ISO8601DateTime format). Defaults to now` },
      { name: 'userIds', type: 'array', required: false, description: `Filter activity to actions performed by specific user ids.` },
    ],
  },
  {
    name: 'mondaymcp_getboardinfo',
    description: `Get comprehensive board information including metadata, structure, owners, and configuration. Also returns the board's views (e.g. table views, filter views) â each view includes its id, name, type, and a structured filter object. `,
    params: [
      { name: 'boardId', type: 'number', required: true, description: `The id of the board to get information for` },
    ],
  },
  {
    name: 'mondaymcp_getboarditemspage',
    description: `Get all items from a monday.com board with pagination support and optional column values and item descriptions. Returns structured JSON with item details, creation/update timestamps, and pagination info. Use the nextCursor parameter from the response to get the next page of results when has_more is true. To retrieve an item description (the rich-text body/details of a monday.com item), set includeItemDescription to true â the response will include the item description document blocks with their content, type, and id. Use this whenever the user asks about an item description, body, details, or notes. [REQUIRED PRECONDITION]: Before using this tool, if new columns were added to the board or if you are not familiar with the board structure (column IDs, column types, status labels, etc.), first use get_board_info to understand the board metadata. This is essential for constructing proper filters and knowing which columns are available. [REQUIRED PRECONDITION]: For board-relation / cross-board linking tasks, call link_board_items_workflow before using this tool. VIEW-BASED FILTERING: If the user refers to a board view by name (e.g. "show me items in the Overdue view"), first call get_board_info to get the board views, find the matching view by name, then extract its filter field and pass it as the filters argument here.`,
    params: [
      { name: 'boardId', type: 'number', required: true, description: `The id of the board to get items from` },
      { name: 'columnIds', type: 'array', required: false, description: `The ids of the item columns and subitem columns to get, can be used to reduce the response size when user asks for specific columns. Works only when includeColumns is true. If not provided, all columns will be returned` },
      { name: 'cursor', type: 'string', required: false, description: `The cursor to get the next page of items, use the nextCursor from the previous response. If the nextCursor was null, it means there are no more items to get` },
      { name: 'filters', type: 'array', required: false, description: `The configuration of filters to apply on the items. Use get_board_info for column ids and types on the board. Before sending the filters, use get_column_type_info with fetchMode "guidelines" and use data.guidelines.filter (null if that type has no documented rules).` },
      { name: 'filtersOperator', type: 'string', required: false, description: `The operator to use for the filters` },
      { name: 'includeColumns', type: 'boolean', required: false, description: `Whether to include column values in the response.
PERFORMANCE OPTIMIZATION: Only set this to true when you actually need the column data. Excluding columns significantly reduces token usage and improves response latency. If you only need to count items, get item IDs/names, or check if items exist, keep this false.` },
      { name: 'includeItemDescription', type: 'boolean', required: false, description: `Whether to include the item's description in the response. The item description is the rich-text body content that appears inside a monday.com item (similar to a task description or issue body). Set this to true when the user asks about an item's description, details, body, or notes. PERFORMANCE OPTIMIZATION: Only set this to true when you actually need the item description content.` },
      { name: 'includeSubItems', type: 'boolean', required: false, description: `Whether to include sub items in the response. PERFORMANCE OPTIMIZATION: Only set this to true when you actually need the sub items data.` },
      { name: 'itemIds', type: 'array', required: false, description: `The ids of the items to get. The count of items should be less than 100.` },
      { name: 'limit', type: 'number', required: false, description: `The number of items to get` },
      { name: 'orderBy', type: 'array', required: false, description: `The columns to order by, will control the order of the items in the response` },
      { name: 'searchTerm', type: 'string', required: false, description: `
    The search term to use for the search.
    - Use this when: the user provides a vague, incomplete, or approximate search term (e.g., âmarketing campaignâ, âJohnâs taskâ, âbudget-relatedâ), and there isnât a clear exact compare value for a specific field.
    - Do not use this when: the user specifies an exact value that maps directly to a column comparison (e.g., name contains "marketing campaign", status = "Done", priority = "High", owner = "Daniel"). In these cases, prefer structured compare filters.
  ` },
      { name: 'subItemLimit', type: 'number', required: false, description: `The number of sub items to get per item. This is only used when includeSubItems is true.` },
    ],
  },
  {
    name: 'mondaymcp_getcolumntypeinfo',
    description: `Retrieves comprehensive information about a specific column type. Use fetchMode "schema" (default) to get the JSON schema definition from the API â use this before creating or updating columns (e.g. create_column) to understand structure, validation rules, and available properties for column settings. Use fetchMode "guidelines" to get only guidelines.filter and guidelines.aggregation for building items_page filters and board insights counts (no schema, no GraphQL round-trip). `,
    params: [
      { name: 'columnType', type: 'string', required: true, description: `The column type to retrieve information for (e.g., "text", "status", "date", "numbers")` },
      { name: 'fetchMode', type: 'string', required: false, description: `fetchMode "schema": JSON settings schema only (GraphQL). fetchMode "guidelines": guidelines.filter and guidelines.aggregation only â no GraphQL round-trip.` },
    ],
  },
  {
    name: 'mondaymcp_getform',
    description: `Get a monday.com form by its form token. Form tokens can be extracted from the form's url. Given a form url, such as https://forms.monday.com/forms/abc123def456ghi789?r=use1, the formToken is the alphanumeric string that appears right after /forms/ and before the ?. In the example, the formToken is abc123def456ghi789.`,
    params: [
      { name: 'formToken', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'mondaymcp_getfullboarddata',
    description: `INTERNAL USE ONLY - DO NOT CALL THIS TOOL DIRECTLY. This tool is exclusively triggered by UI components and should never be invoked directly by the agent.`,
    params: [
      { name: 'boardId', type: 'string', required: true, description: `The ID of the board to fetch complete data for` },
      { name: 'filters', type: 'array', required: false, description: `The configuration of filters to apply on the items. Use get_board_info for column ids and types on the board. Before sending the filters, use get_column_type_info with fetchMode "guidelines" and use data.guidelines.filter (null if that type has no documented rules).` },
      { name: 'filtersOperator', type: 'string', required: false, description: `The operator to use for the filters` },
    ],
  },
  {
    name: 'mondaymcp_getgraphqlschema',
    description: `Fetch the monday.com GraphQL schema structure including query and mutation definitions. This tool returns available query fields, mutation fields, and a list of GraphQL types in the schema. You can filter results by operation type (read/write) to focus on either queries or mutations.`,
    params: [
      { name: 'operationType', type: 'string', required: false, description: `Type of operation: "read" for queries, "write" for mutations` },
      { name: 'random_string', type: 'string', required: false, description: `Dummy parameter for no-parameter tools` },
    ],
  },
  {
    name: 'mondaymcp_getmondaydevsprintsboards',
    description: `Discover monday-dev sprints boards and their associated tasks boards in your account.

## Purpose:
Identifies and returns monday-dev sprints board IDs and tasks board IDs that you need to use with other monday-dev tools. 
This tool scans your recently used boards (up to 100) to find valid monday-dev sprint management boards.

## What it Returns:
- Pairs of sprints boards and their corresponding tasks boards
- Board IDs, names, and workspace information for each pair
- The bidirectional relationship between each sprints board and its tasks board

## Note:
Searches recently used boards (up to 100). If none found, ask user to provide board IDs manually.`,
    params: [
    ],
  },
  {
    name: 'mondaymcp_getnotetakermeetings',
    description: `Retrieve notetaker meetings with optional detailed fields. Use include_summary, include_topics, include_action_items, and include_transcript flags to control which details are returned. Use access to filter by meeting access level (OWN, SHARED_WITH_ME, SHARED_WITH_ACCOUNT, ALL). Defaults to OWN. Supports filtering by ids, search term, and cursor-based pagination.`,
    params: [
      { name: 'access', type: 'string', required: false, description: `Filter meetings by access level. OWN: meetings the user participated in or invited the bot to. SHARED_WITH_ME: meetings shared with the user or their team. SHARED_WITH_ACCOUNT: meetings shared with the entire account. ALL: all meetings the user has access to.` },
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination. Use cursor from the previous page_info to fetch the next page.` },
      { name: 'ids', type: 'array', required: false, description: `Filter by specific meeting IDs. Use this to fetch one or more specific meetings in a single call.` },
      { name: 'include_action_items', type: 'boolean', required: false, description: `Whether to include action items for each meeting.` },
      { name: 'include_summary', type: 'boolean', required: false, description: `Whether to include the AI-generated summary for each meeting.` },
      { name: 'include_topics', type: 'boolean', required: false, description: `Whether to include discussion topics and talking points for each meeting.` },
      { name: 'include_transcript', type: 'boolean', required: false, description: `Whether to include the full transcript for each meeting. Transcripts can be very large.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of notetaker meetings to return per page (1-100).` },
      { name: 'search', type: 'string', required: false, description: `Search notetaker meetings by title, participant name, or email.` },
    ],
  },
  {
    name: 'mondaymcp_getsprintsmetadata',
    description: `Get comprehensive sprint metadata from a monday-dev sprints board including:

## Data Retrieved:
A table of sprints with the following information:
- Sprint ID
- Sprint Name
- Sprint timeline (planned from/to dates)
- Sprint completion status (completed/in-progress/planned)
- Sprint start date (actual)
- Sprint end date (actual)
- Sprint activation status
- Sprint summary document object ID

## Parameters:
- **limit**: Number of sprints to retrieve (default: 25, max: 100)

Requires the Main Sprints board ID of the monday-dev containing your sprints.`,
    params: [
      { name: 'sprintsBoardId', type: 'number', required: true, description: `The ID of the monday-dev board containing the sprints` },
      { name: 'limit', type: 'number', required: false, description: `The number of sprints to retrieve (default: 25, max: 100)` },
    ],
  },
  {
    name: 'mondaymcp_getsprintsummary',
    description: `Get the complete summary and analysis of a sprint.

## Purpose:
Unlock deep insights into completed sprint performance. 

The sprint summary content including:
- **Scope Management**: Analysis of planned vs. unplanned tasks, scope creep
- **Velocity & Performance**: Individual velocity, task completion rates, workload distribution per team member
- **Task Distribution**: Breakdown of completed tasks by type (Feature, Bug, Tech Debt, Infrastructure, etc.)
- **AI Recommendations**: Action items, process improvements, retrospective focus areas

## Requirements:
- Sprint must be completed and must be created after 1/1/2025 

## Important Note:
When viewing the section "Completed by Assignee", you'll see user IDs in the format "@user-12345678". the 8 digits after the @is the user ID. To retrieve the actual owner names, use the list_users_and_teams tool with the user ID and set includeTeams=false for optimal performance.

`,
    params: [
      { name: 'sprintId', type: 'number', required: true, description: `The ID of the sprint to get the summary for (e.g., "9123456789")` },
    ],
  },
  {
    name: 'mondaymcp_gettypedetails',
    description: `Get detailed information about a specific GraphQL type from the monday.com API schema`,
    params: [
      { name: 'typeName', type: 'string', required: true, description: `The name of the GraphQL type to get details for` },
    ],
  },
  {
    name: 'mondaymcp_getupdates',
    description: `Get updates (comments/posts) from a monday.com item or board. Specify objectId and objectType (Item or Board) to retrieve updates. For Board queries, you can filter by date range using fromDate and toDate (both required together, ISO8601 format). By default, Board queries return only board discussion. Set includeItemUpdates to true to also include updates on individual items. Returns update text, creator info, timestamps, and optionally replies and assets.`,
    params: [
      { name: 'objectId', type: 'string', required: true, description: `The ID of the item or board to get updates from` },
      { name: 'objectType', type: 'string', required: true, description: `Type of object for which objectId was provided` },
      { name: 'fromDate', type: 'string', required: false, description: `Start of date range filter (e.g. "2025-01-01" or "2025-01-01T00:00:00Z"). Must be used together with toDate. Only supported for Board objectType.` },
      { name: 'includeAssets', type: 'boolean', required: false, description: `Include file attachments in the response` },
      { name: 'includeItemUpdates', type: 'boolean', required: false, description: `When objectType is Board, also include updates on individual items. Defaults to false, returning only board discussion. Set to true to retrieve all updates on a board, including updates on individual items.` },
      { name: 'includeReplies', type: 'boolean', required: false, description: `Include update replies in the response` },
      { name: 'limit', type: 'number', required: false, description: `Number of updates per page (default: 25, max: 100)` },
      { name: 'page', type: 'number', required: false, description: `Page number for pagination (default: 1)` },
      { name: 'toDate', type: 'string', required: false, description: `End of date range filter (e.g. "2025-06-01" or "2025-06-01T23:59:59Z"). Must be used together with fromDate. Only supported for Board objectType.` },
    ],
  },
  {
    name: 'mondaymcp_getusercontext',
    description: `Fetch current user information, account information, and their relevant items (boards, folders, workspaces, dashboards).

    Use this tool to:
    - Get context about who the current user is (id, name, title)
    - Get account info: plan tier, active member count, trial status, and active products
    - Get the number of active members in the account (returns active_members_count)
    - Discover user's favorite boards, folders, workspaces, and dashboards
    - Get user's most relevant boards based on visit frequency and recency
    - Get user's most relevant people based on interaction frequency and recency
    - Reduce the need for search requests by knowing user's commonly accessed items
    `,
    params: [
    ],
  },
  {
    name: 'mondaymcp_listautomations',
    description: `List all automations on a specific monday.com board, including their ids, titles, active state, and configuration.
When NOT to use: Do not call this tool to get general board information unrelated to automations.
Note: Some legacy automations may not appear â mention this if users ask about missing automations.
`,
    params: [
      { name: 'boardId', type: 'string', required: true, description: `The numeric board ID as a string.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from a previous response. Pass to retrieve the next page of automations.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of automations to return. Default: 100.` },
    ],
  },
  {
    name: 'mondaymcp_listusersandteams',
    description: `Tool to fetch users and/or teams data. 

      MANDATORY BEST PRACTICES:
      1. ALWAYS use specific IDs or names when available
      2. If no ids available, use name search if possible (USERS ONLY)
      3. Use 'getMe: true' to get current user information
      4. AVOID broad queries (no parameters) - use only as last resort

      REQUIRED PARAMETER PRIORITY (use in this order):
      1. getMe - STANDALONE
      2. userIds
      3. name - STANDALONE (USERS ONLY, NOT for teams)
      4. teamIds + teamsOnly
      5. No parameters - LAST RESORT

      CRITICAL USAGE RULES:
      â¢ userIds + teamIds requires explicit includeTeams: true flag
      â¢ includeTeams: true fetches both users and teams, do not use this to fetch a specific user's teams rather fetch that user by id and you will get their team memberships.
      â¢ name parameter is for USER search ONLY - it cannot be used to search for teams. Use teamIds to fetch specific teams.`,
    params: [
      { name: 'getMe', type: 'boolean', required: false, description: `[TOP PRIORITY] Use ALWAYS when requesting current user information. Examples of when it should be used: ["get my user" or "get my teams"].
      This parameter CONFLICTS with all others. ` },
      { name: 'includeTeamMembers', type: 'boolean', required: false, description: `Set to true only when you need additional member details for teams other than names and ids.` },
      { name: 'includeTeams', type: 'boolean', required: false, description: `[AVOID] This fetches all teams in the account. To fetch a specific user's teams just fetch that user by id and you will get their team memberships.` },
      { name: 'name', type: 'string', required: false, description: `Name-based USER search ONLY. STANDALONE parameter - cannot be combined with others. PREFERRED method for finding users when you know names. Performs fuzzy matching.
      CRITICAL: This parameter searches for USERS ONLY, NOT teams. To search for teams, use teamIds parameter instead.` },
      { name: 'teamIds', type: 'array', required: false, description: `Specific team IDs to fetch.[IMPORTANT] ALWAYS use when you have team IDs in context, NEVER fetch all teams if specific IDs are available.
      RETURNS: Team details with owners and optional member data.` },
      { name: 'teamsOnly', type: 'boolean', required: false, description: `Fetch only teams, no users returned. Combine with includeTeamMembers for member details.` },
      { name: 'userIds', type: 'array', required: false, description: `Specific user IDs to fetch.[IMPORTANT] ALWAYS use when you have user IDs in context. PREFER over general search. RETURNS: user profiles including team memberships` },
    ],
  },
  {
    name: 'mondaymcp_listworkspaces',
    description: `List all workspaces available to the user, ordered by membership (user's workspaces first). Returns workspaces with their ID, name, and description.
[IMPORTANT] To search for workspaces by name, use the "search" tool with searchType WORKSPACES instead â it provides faster and more accurate results.`,
    params: [
      { name: 'limit', type: 'number', required: false, description: `Number of workspaces to return. Default is (100), lower for a smaller response size` },
      { name: 'page', type: 'number', required: false, description: `Page number to return. Default is 1.` },
    ],
  },
  {
    name: 'mondaymcp_manageagent',
    description: `Full lifecycle management for monday platform agents â create, read, update, delete, change state, and run.

monday platform agents are user-built work orchestrators on monday.com â each has a profile (name, role, avatar), a goal, and a markdown execution plan. Agents in state ACTIVE can be triggered automatically. They are NOT local LangChain or MCP agents.

ACTIONS (only pass fields that apply to the chosen action):
- create:        { action:"create", prompt, agent_model? } â AI-generated agent. Platform creates profile, goal, and plan from the prompt.
- create_blank:  { action:"create_blank", name?, role?, role_description?, avatar_url?, gender?, background_color?, user_prompt? } â manually defined agent.
- get one:       { action:"get", agent_id }
- list owned:    { action:"get" }
- update:        { action:"update", agent_id, name?, role?, role_description?, plan?, agent_model? }
- delete:        { action:"delete", agent_id }
- activate:      { action:"activate", agent_id }
- deactivate:    { action:"deactivate", agent_id }
- run:           { action:"run", agent_id }

RULES:
- "create_blank" with no fields creates a nameless blank agent â only do this intentionally.
- "update" requires at least one of name/role/role_description/plan/agent_model.
- "update", "delete", "activate", "deactivate", "run" all require "agent_id".
- Created agents start INACTIVE. Follow with action:"activate" using the returned agent_id before they can be triggered.
- â ï¸ DESTRUCTIVE â "delete" is permanent and irreversible. When the user refers to an agent by name, ALWAYS call action:"get" first to confirm the correct agent_id before deleting.
- "run" is fire-and-forget. Returns trigger_uuid â no run-status query exists, treat successful enqueue as the only signal.
- Agent state is one of ACTIVE, INACTIVE, ARCHIVED, or FAILED. DELETED only appears as the return value of action:"delete".

USAGE EXAMPLES:
- AI create:    { "action": "create", "prompt": "Run my daily standup every weekday at 9am." }
- Manual create:{ "action": "create_blank", "name": "Standup Bot", "role": "Project Manager", "gender": "female" }
- Fetch one:    { "action": "get", "agent_id": "42" }
- List mine:    { "action": "get" }
- Rename:       { "action": "update", "agent_id": "7", "name": "New Name" }
- Activate:     { "action": "activate", "agent_id": "7" }
- Deactivate:   { "action": "deactivate", "agent_id": "7" }
- Run:          { "action": "run", "agent_id": "7" }
- Delete:       { "action": "delete", "agent_id": "7" }

RELATED TOOLS:
- agent_catalog â browse available trigger types and skills before wiring them to an agent
- manage_agent_triggers â manage which triggers fire this agent automatically
- manage_agent_skills â manage which skills this agent can perform
- manage_agent_knowledge â manage which boards/docs this agent has access to`,
    params: [
      { name: 'action', type: 'string', required: true, description: `"create" â create a new agent via AI (pass prompt). "create_blank" â create a new agent manually (pass name/role/etc). "get" â fetch one agent by agent_id or list owned agents. "update" â modify mutable fields on an existing agent. "delete" â permanently delete an agent (irreversible). "activate" â transition agent to ACTIVE. "deactivate" â transition agent to INACTIVE. "run" â manually enqueue an agent run (fire-and-forget).` },
      { name: 'agent_id', type: 'string', required: false, description: `Used with action:"get" to fetch a specific agent. Required for action:"update", "delete", "activate", "deactivate", "run". Omit for action:"create", "create_blank", or action:"get" (to list owned agents).` },
      { name: 'agent_model', type: 'string', required: false, description: `Used with action:"create" or action:"update". Omit unless the user explicitly names a valid monday-supported model.` },
      { name: 'avatar_url', type: 'string', required: false, description: `Used with action:"create_blank". HTTPS URL of the avatar. Prefer dapulse-res.cloudinary.com or cdn.monday.com.` },
      { name: 'background_color', type: 'string', required: false, description: `Used with action:"create_blank". Lowercase hex, e.g. "#9450fd".` },
      { name: 'gender', type: 'string', required: false, description: `Used with action:"create_blank". Hint for generated avatar/name when profile fields are omitted.` },
      { name: 'name', type: 'string', required: false, description: `Used with action:"create_blank" or action:"update". Display name of the agent.` },
      { name: 'plan', type: 'string', required: false, description: `Used with action:"update". New step-by-step execution plan in markdown.` },
      { name: 'prompt', type: 'string', required: false, description: `Required for action:"create". Plain-language description of what the agent should do. Platform generates profile, goal, and plan via AI.` },
      { name: 'role', type: 'string', required: false, description: `Used with action:"create_blank" or action:"update". Short role title (e.g. "Customer Success Bot").` },
      { name: 'role_description', type: 'string', required: false, description: `Used with action:"create_blank" or action:"update". Detailed description of the agent role.` },
      { name: 'user_prompt', type: 'string', required: false, description: `Used with action:"create_blank". Stored as metadata. Not used for AI generation.` },
    ],
  },
  {
    name: 'mondaymcp_manageagentknowledge',
    description: `List, grant, update, or revoke a monday platform agent's access to boards and docs.

An agent's "knowledge" is the set of monday.com boards and docs it can read from or write to during a run.

- list: Returns all resources the agent currently has access to, including permission level and resource type.
- add: Grants the agent access to a board or doc with the specified permission level.
- update: Changes the permission level on a resource the agent already has access to. Call action:"list" first to confirm the resource_id exists.
- remove: Revokes the agent's access to a board or doc entirely. Call action:"list" first to confirm the resource_id exists.

Permission types:
- READ: Agent can read data from the resource.
- READ_WRITE: Agent can read and write data to the resource.

USAGE EXAMPLES:
- List: { "action": "list", "agent_id": "7" }
- Add board access: { "action": "add", "agent_id": "7", "resource_id": "42", "scope_type": "BOARD", "permission_type": "READ" }
- Update to read-write: { "action": "update", "agent_id": "7", "resource_id": "42", "scope_type": "BOARD", "permission_type": "READ_WRITE" }
- Remove access: { "action": "remove", "agent_id": "7", "resource_id": "42", "scope_type": "BOARD" }

RELATED TOOLS:
- manage_agent â manage the agent entity itself (create, activate, deactivate, etc.)
- manage_agent_triggers â manage which triggers fire this agent automatically
- manage_agent_skills â manage which skills this agent can perform`,
    params: [
      { name: 'action', type: 'string', required: true, description: `"list" â returns all resources the agent currently has access to. "add" â grants access to a board or doc. "update" â changes the permission level on an existing resource. "remove" â revokes the agent's access to a board or doc.` },
      { name: 'agent_id', type: 'string', required: true, description: `Unique identifier of the agent.` },
      { name: 'permission_type', type: 'string', required: false, description: `Required for action:add and action:update. The permission level: "READ" (agent can read the resource) or "READ_WRITE" (agent can read and write the resource).` },
      { name: 'resource_id', type: 'string', required: false, description: `Required for action:add, action:update, action:remove. The ID of the board or doc to grant/update/revoke access to.` },
      { name: 'scope_type', type: 'string', required: false, description: `Required for action:add, action:update, action:remove. The type of resource: "BOARD" or "DOC".` },
    ],
  },
  {
    name: 'mondaymcp_manageagentskills',
    description: `Manage the full skill lifecycle for monday platform agents â create new skills in the catalog, attach skills to an agent, or detach them.

Skills extend what an agent can do (e.g. sending emails, querying databases, posting to Slack).

ACTIONS:
- create: { name, content, description? } â creates a new custom skill in the account-wide catalog.
  The skill becomes available to all agents in the account.
- add:    { agent_id, skill_id } â attaches a skill to this agent.
- remove: { agent_id, skill_id } â detaches a skill from this agent.

WORKFLOW â attach an existing skill:
1. Call agent_catalog action:"list_skills" â find the skill_id of the skill to attach.
2. Call this tool action:"add" with agent_id and that skill_id.

WORKFLOW â create a new skill and attach it:
1. Call this tool action:"create" with name and content â note the returned id.
2. Call this tool action:"add" with agent_id and that id directly (no catalog lookup needed).

NOTE: There is no action to list which skills are currently attached to a specific agent â the platform does not yet expose that query.
To browse all skills available in the account catalog, use agent_catalog action:"list_skills".

USAGE EXAMPLES:
- Create a skill:  { "action": "create", "name": "Send Slack Message", "content": "## Instructions\\nPost a message to a Slack channel.", "description": "Sends a message to Slack" }
- Add a skill:     { "action": "add", "agent_id": "7", "skill_id": "skill-abc-123" }
- Remove a skill:  { "action": "remove", "agent_id": "7", "skill_id": "skill-abc-123" }

RELATED TOOLS:
- agent_catalog action:"list_skills" â browse existing skills to find a skill_id before calling action:"add"
- manage_agent_triggers â manage which triggers fire this agent automatically
- manage_agent â manage the agent entity itself (create, activate, deactivate, etc.)`,
    params: [
      { name: 'action', type: 'string', required: true, description: `"create" â author a new custom skill in the account-wide catalog (no agent_id needed). "add" â attach an existing skill to this agent by skill_id. "remove" â detach a skill from this agent.` },
      { name: 'agent_id', type: 'string', required: false, description: `Required for action:"add" and action:"remove". Not used for action:"create" (account-level operation).` },
      { name: 'content', type: 'string', required: false, description: `Required for action:"create". Markdown instructions defining what the skill does and how to execute it. Be specific and thorough â this is the skill's runtime behavior.` },
      { name: 'description', type: 'string', required: false, description: `Used with action:"create". Short description shown in the catalog.` },
      { name: 'name', type: 'string', required: false, description: `Required for action:"create". Display name of the new skill.` },
      { name: 'skill_id', type: 'string', required: false, description: `Required for action:"add" and action:"remove". The skill id from agent_catalog action:"list_skills", or the id returned by action:"create" in this tool. Never guess or invent a skill id.` },
    ],
  },
  {
    name: 'mondaymcp_manageagenttriggers',
    description: `Manage the triggers attached to a monday platform agent â triggers define WHEN the agent runs automatically.

ACTIONS:
- list:   { agent_id } â returns active triggers with node_id, block_reference_id, name, field_summary.
- add:    { agent_id, block_reference_id, field_values? } â attaches a trigger type to the agent.
- remove: { agent_id, node_id } â detaches a trigger instance by node_id (NOT block_reference_id).

WORKFLOW â add a trigger:
1. Call agent_catalog action:"list_triggers" â note block_reference_id, field_schemas, and required_fields.
2. Collect required field values from the user (e.g. board_id, column_id).
3. Call this tool action:"add" with block_reference_id and field_values.
Note: add returns only { success } â no node_id for the new instance. Call action:"list" afterward if you need the node_id.

WORKFLOW â remove a trigger:
1. Call action:"list" to see active triggers and note the node_id of the instance to remove.
2. Call action:"remove" with that node_id.

NOTE: Only triggers that can be added programmatically appear in the catalog. OAuth/3rd-party triggers (Slack, Gmail, Salesforce, etc.)
require user setup in the monday.com UI â they will not appear in agent_catalog and cannot be managed here.

USAGE EXAMPLES:
- List triggers:  { "action": "list", "agent_id": "7" }
- Add trigger:    { "action": "add", "agent_id": "7", "block_reference_id": "status-change-ref", "field_values": { "board_id": "42" } }
- Remove trigger: { "action": "remove", "agent_id": "7", "node_id": "node-abc" }

RELATED TOOLS:
- agent_catalog action:"list_triggers" â discover available trigger types and their required field_values before calling action:"add" here
- manage_agent_skills â manage which skills this agent can perform
- manage_agent â manage the agent entity itself (create, activate, deactivate, etc.)`,
    params: [
      { name: 'action', type: 'string', required: true, description: `"list" â returns all triggers currently attached to this agent (includes node_id needed for remove). "add" â attaches a new trigger by block_reference_id. "remove" â detaches a trigger instance by node_id.` },
      { name: 'agent_id', type: 'string', required: true, description: `Unique identifier of the agent.` },
      { name: 'block_reference_id', type: 'string', required: false, description: `Required for action:"add". The block_reference_id from agent_catalog action:"list_triggers" identifying the trigger type to attach. Never guess this value â look it up in the catalog first.` },
      { name: 'field_values', type: 'object', required: false, description: `Used with action:"add" when the trigger type has required_fields. Key/value object whose shape is described by field_schemas in the agent_catalog response. Scalar fields use string/number/boolean values. Selection fields use { "value": "<id>", "label": "<name>" }.` },
      { name: 'node_id', type: 'string', required: false, description: `Required for action:"remove". The node_id of the trigger instance â get it from action:"list". Each instance has a unique node_id even if the same trigger type is attached multiple times. Do NOT pass block_reference_id here.` },
    ],
  },
  {
    name: 'mondaymcp_manageautomations',
    description: `Activate, deactivate, or delete an existing monday.com automation.

Requires an automation id. When the user refers to an automation by name, always call list_automations first to resolve the id â never guess or infer ids.

Actions:
- activate: enables a paused automation so it starts responding to its trigger.
- deactivate: pauses an automation while preserving its definition.
- delete: permanently removes an automation â irreversible.

When intent is ambiguous ("stop", "turn off", "pause"), prefer deactivate over delete.`,
    params: [
      { name: 'action', type: 'string', required: true, description: `The operation to perform. activate: enables a paused automation so it responds to its trigger. deactivate: pauses an automation without deleting it. delete: permanently removes an automation (irreversible).` },
      { name: 'workflowId', type: 'string', required: true, description: `The automation ID to operate on. Obtain from list_automations.` },
    ],
  },
  {
    name: 'mondaymcp_moveobject',
    description: `Move a folder, board, or overview in monday.com. Use position for relative placement based on another object, parentFolderId for folder changes, workspaceId for workspace moves, and accountProductId for account product changes.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the object to move` },
      { name: 'objectType', type: 'string', required: true, description: `The type of object to move` },
      { name: 'accountProductId', type: 'string', required: false, description: `The ID of the account product containing the object. Required if moving to a different account product.` },
      { name: 'parentFolderId', type: 'string', required: false, description: `The ID of the new parent folder. Required if moving to a different folder.` },
      { name: 'position_is_after', type: 'boolean', required: false, description: `Whether to position the object after the object` },
      { name: 'position_object_id', type: 'string', required: false, description: `The ID of the object to position the object relative to. If this parameter is provided, position_object_type must be also provided.` },
      { name: 'position_object_type', type: 'string', required: false, description: `The type of object to position the object relative to. If this parameter is provided, position_object_id must be also provided.` },
      { name: 'workspaceId', type: 'string', required: false, description: `The ID of the workspace containing the object. Required if moving to a different workspace.` },
    ],
  },
  {
    name: 'mondaymcp_planworkflow',
    description: `Plans one or more monday.com workflows for a described process using an AI agent.

The agent analyzes the prompt, decides how many workflows are needed, identifies the required boards and columns, selects the correct trigger and action blocks (with their IDs), and returns a structured implementation plan with Mermaid diagrams and build notes for each workflow.

Use this before create_workflow to understand how to break a complex process into individual workflows and which resources to create first.

Parameters:
- prompt: describe the full end-to-end process in plain English. Maximum 2000 characters.

Returns:
- result: structured markdown plan with workflow breakdowns, block IDs, resource definitions, and a list of assumptions and gaps
`,
    params: [
      { name: 'prompt', type: 'string', required: true, description: `Natural-language description of the process to plan. Describe the full end-to-end process in plain English (e.g. "When a deal is marked Won, create a task in the onboarding board and notify the account manager"). The agent will decompose this into one or more monday.com workflows, identify all required boards and columns, and return a structured implementation plan. Maximum 2000 characters.` },
    ],
  },
  {
    name: 'mondaymcp_publishworkflow',
    description: `Publishes a workflow draft, promoting it to the live version.

Use this after create_workflow (and optionally update_workflow) to make the workflow active. Before publishing, the workflow is validated â if it has missing or misconfigured steps, publish will fail with a WORKFLOW_VALIDATION_FAILED error that includes structured issue details: which step failed, the issue type, and which inputs are missing. Use those details to guide the user on what to fix before retrying.

Parameters:
- workflowObjectId and workflowDraftId: returned by create_workflow â they identify which draft to publish.
- shouldActivate: whether to activate the workflow immediately after publish. Defaults to true â pass false to publish without activating.

Returns:
- workflowObjectId: the workflow object ID (unchanged)
- workflowLiveId: the new live version ID â this changes on every publish, so do not cache it

Note: if directing the user to the workflow in the UI, the correct URL path is custom_objects/, not workflows/ â e.g. {account}.monday.com/custom_objects/{workflowObjectId}.

`,
    params: [
      { name: 'workflowDraftId', type: 'string', required: true, description: `The draft version ID returned by create_workflow. Both workflowObjectId and workflowDraftId are required â together they identify the exact draft to publish.` },
      { name: 'workflowObjectId', type: 'string', required: true, description: `The workflow object ID returned by create_workflow. Identifies the workflow across all its drafts and live versions.` },
      { name: 'shouldActivate', type: 'boolean', required: false, description: `Whether to activate the workflow immediately after publishing so it starts running. Defaults to true â the workflow is activated immediately after publish.` },
    ],
  },
  {
    name: 'mondaymcp_readdocs',
    description: `Get information about monday.com documents. Supports two modes:

MODE: "content" (default) â Fetch documents with their full markdown content.
- Requires: type ("ids" | "object_ids" | "workspace_ids") and ids array
- Supports pagination via page/limit. Check has_more_pages in response.
- If type "ids" returns no results, automatically retries with object_ids.
- Set include_blocks: true to include block IDs, types, and positions in the response â required before calling update_doc.
- Blocks default to 25 per page. Use blocks_limit and blocks_page to paginate through long documents.
- Set include_comments: true to fetch all comments and replies on the document. Each comment is enriched with anchor info (block_id, selection_from, selection_length) indicating which block and text range it's attached to. Use comments_limit to control how many comments per item (default 50).

MODE: "version_history" â Fetch the edit history of a single document.
- Requires: ids with the document's object_id (use the object_id field from content mode results, NOT the id field).
- The object_id is the numeric ID visible in the document URL.
- Returns restoring points sorted newest-first. Use version_history_limit to cap results (e.g., "last 3 changes" â version_history_limit: 3).
- Use since/until to filter by time range. If omitted, returns full history.
- Set include_diff: true to see what content changed between versions (fetches up to 10 diffs, may be slower).
- Examples:
  - { mode: "version_history", ids: ["5001466606"], version_history_limit: 3 }
  - { mode: "version_history", ids: ["5001466606"], since: "2026-03-11T00:00:00Z", include_diff: true }`,
    params: [
      { name: 'blocks_limit', type: 'number', required: false, description: `Maximum number of blocks to return per document (default: 25). Only used in content mode when include_blocks is true.` },
      { name: 'blocks_page', type: 'number', required: false, description: `Page number for block pagination, starting at 1. Omit to use the API default. Use with blocks_limit to page through documents with more than 25 blocks. Only used in content mode when include_blocks is true.` },
      { name: 'comments_limit', type: 'number', required: false, description: `Maximum number of comments (updates) to fetch per item when include_comments is true. Defaults to 50. Only used in content mode.` },
      { name: 'ids', type: 'array', required: false, description: `Array of ID values. In content mode: matches the query type (ids/object_ids/workspace_ids). In version_history mode: provide the single document object_id here (e.g., ids: ["5001466606"]).` },
      { name: 'include_blocks', type: 'boolean', required: false, description: `If true, includes the blocks array (block IDs, types, positions, content) in the response. Required when you plan to call update_doc. Defaults to false to reduce response size. Only used in content mode.` },
      { name: 'include_comments', type: 'boolean', required: false, description: `If true, fetches all comments and replies on the document. Comments are stored at the item level within the doc backing board. Defaults to false. Only used in content mode.` },
      { name: 'include_diff', type: 'boolean', required: false, description: `If true, fetches content diffs between consecutive restoring points. May be slower due to additional API calls. Only used in version_history mode.` },
      { name: 'limit', type: 'number', required: false, description: `Number of docs per page (default: 25). Only used in content mode.` },
      { name: 'mode', type: 'string', required: false, description: `The operation mode. "content" (default) fetches documents with their markdown content. "version_history" fetches the edit history of a single document.` },
      { name: 'order_by', type: 'string', required: false, description: `Order in which to retrieve docs. Only used in content mode.` },
      { name: 'page', type: 'number', required: false, description: `Page number to return (starts at 1). Only used in content mode.` },
      { name: 'since', type: 'string', required: false, description: `ISO 8601 date string to filter version history from (e.g., "2026-03-15T00:00:00Z"). If omitted, returns the full history. Only used in version_history mode.` },
      { name: 'type', type: 'string', required: false, description: `Query type for content mode: "ids", "object_ids", or "workspace_ids". Required when mode is "content".` },
      { name: 'until', type: 'string', required: false, description: `ISO 8601 date string to filter version history until (e.g., "2026-03-16T23:59:59Z"). Defaults to now. Only used in version_history mode.` },
      { name: 'version_history_limit', type: 'number', required: false, description: `Maximum number of restoring points to return. Use this when the user asks for "last N changes". Only used in version_history mode.` },
    ],
  },
  {
    name: 'mondaymcp_search',
    description: `Search within monday.com platform. Can search for boards, documents, folders, workspaces, updates, and items.
For searching/listing specific users and teams, use list_users_and_teams tool.
For account-level info (plan, member count, products), use get_user_context tool.
For groups, use get_board_info tool.
ITEMS search requires a searchTerm and only returns id, title, and url.
WORKSPACES search requires a searchTerm and only returns id, title, and description.
UPDATES search requires a searchTerm and returns id, title (the update body), itemId, boardId, and creatorId. Optionally scope it with boardIds and/or creatorIds.
IMPORTANT: ids returned by this tool are prefixed with the type of the object (e.g doc-123, board-456, folder-789, workspace-101, update-303, item-321). When passing the ids to other tools, you need to remove the prefix and just pass the number.
    `,
    params: [
      { name: 'searchType', type: 'string', required: true, description: `The type of search to perform.` },
      { name: 'boardIds', type: 'array', required: false, description: `The ids of the boards to scope the search to. [IMPORTANT] Only applies to UPDATES search, and only pass it if the user explicitly asked to search within specific boards.` },
      { name: 'creatorIds', type: 'array', required: false, description: `The ids of the users whose updates to search. [IMPORTANT] Only applies to UPDATES search, and only pass it if the user explicitly asked to search updates by specific authors.` },
      { name: 'limit', type: 'number', required: false, description: `The number of items to get. The max and default value is 20.` },
      { name: 'page', type: 'number', required: false, description: `The page number to get. The default value is 1.` },
      { name: 'searchTerm', type: 'string', required: false, description: `The search term to use for the search.` },
      { name: 'workspaceIds', type: 'array', required: false, description: `The ids of the workspaces to search in. [IMPORTANT] Only pass this param if user explicitly asked to search within specific workspaces.` },
    ],
  },
  {
    name: 'mondaymcp_updatedoc',
    description: `Update an existing monday.com document. Provide doc_id (preferred) or object_id, plus an ordered operations array (executed sequentially, stops on first failure).

OPERATIONS:
- set_name: Rename the document.
- add_markdown_content: Append markdown as blocks (or insert after a block). Best for text, headings, lists, simple tables â no block IDs needed.
- update_block: Update content of an existing text, code, or list_item block in-place.
- create_block: Create a new block at a precise position. Use parent_block_id to nest inside notice_box, table cell, or layout cell.
- delete_block: Remove any block. The ONLY option for BOARD, WIDGET, DOC embed, and GIPHY blocks.
- replace_block: Delete a block and create a new one in its place (use when update_block is not supported).
- add_comment: Create a new comment or reply on the document (doc-level, block-level, or text-selection).

WHEN TO USE EACH OPERATION:
- text / code / list_item â update_block. Use replace_block to change subtype (e.g. NORMAL_TEXTâLARGE_TITLE)
- divider / table / image / video / notice_box / layout â replace_block (properties immutable after creation)
- BOARD / WIDGET / DOC / GIPHY â delete_block only

GETTING BLOCK IDs: Call read_docs with include_blocks: true â returns id, type, position, and content per block.

BLOCK CONTENT (delta_format): Array of insert ops. Last op MUST be {insert: {text: "\\n"}}.
- Plain: [{insert: {text: "Hello"}}, {insert: {text: "\\n"}}]
- Bold: [{insert: {text: "Hi"}, attributes: {bold: true}}, {insert: {text: "\\n"}}]
- Mention user/doc/board: [{insert: {text: "Hey "}}, {insert: {mention: {id: 12345, type: "USER"}}}, {insert: {text: "\\n"}}] â type is USER, DOC, or BOARD. id is numeric (user IDs from list_users_and_teams)
- Inline column value: [{insert: {column_value: {item_id: 111, column_id: "status"}}}, {insert: {text: "\\n"}}]
- Supported attributes: bold, italic, underline, strike, code, link, color, background (not applicable to mention/column_value ops)

IMAGE WITH ASSET: For asset-based images, use create_block with block_type "image" and asset_id (instead of public_url). add_markdown_content does NOT support asset images â for mixed content, alternate add_markdown_content (text) and create_block (image) operations in sequence.

COMMENTS:
- add_comment: Create a new comment or reply on the document. Three scopes:
  - Doc-level (no block_id): comment appears on the doc as a whole.
  - Block-level (block_id only): comment is anchored to a specific block. The block shows a comment indicator in the UI.
  - Text-selection (block_id + selection_from + selection_length): comment is anchored to a specific character range inside a text/code/list_item block. That text is highlighted with a comment marker.
  Block-level and text-selection comments only work on blocks with text content (text, code, list_item, title, quote). They do NOT work on: divider, page_break, table, layout, notice_box, image, video, or giphy blocks.
  Get block IDs from read_docs with include_blocks: true. Format body with HTML, not markdown. Use mentions_list for @mentions.`,
    params: [
      { name: 'operations', type: 'array', required: true, description: `Ordered list of operations to perform. Executed sequentially. Stops at first failure.

Operation types:
- set_name: Rename the document.
- add_markdown_content: Append markdown as blocks (simplest for text/lists/tables).
- update_block: Change content of an existing text/code/list/divider block.
- create_block: Create a new block at a specific position (supports text, list_item, code, divider, page_break, image, video, notice_box, table, layout).
- delete_block: Permanently remove a block. Works for ALL block types including BOARD, WIDGET, DOC embed, GIPHY.
- replace_block: Delete a block and create a new one in its place. Use for: changing image/video source, table restructure, notice_box theme change.
- add_comment: Create a new comment or reply on the document. Use parent_update_id to reply to an existing comment. Format text with HTML. Uses the doc's backing board item.

WHEN TO USE WHICH:
- Adding new text sections â add_markdown_content
- Adding asset-based images â create_block with block_type "image" and asset_id (add_markdown_content does NOT support asset images)
- Mixed content with asset images â alternate add_markdown_content (for text) and create_block (for each image) in sequence
- Editing existing text block â update_block
- Changing an image URL â replace_block (image URL is immutable after creation)
- Changing video URL â replace_block
- Restructuring a table â replace_block
- BOARD/WIDGET/DOC/GIPHY blocks â delete_block only (no public API to create these)

NESTING CONTENT IN CONTAINERS:
- notice_box: Fully supported. Create the notice_box first, then in a separate call create child blocks with parent_block_id set to the notice_box ID. You cannot reference a block ID created in the same call.
- table: Cell-level API nesting is NOT supported. To create a table with content, use add_markdown_content with a markdown table (e.g. "| H1 | H2 |\\n| --- | --- |\\n| A | B |"). This creates a pre-populated table in one shot. Empty tables created via create_block cannot have their cells populated through the API.
- layout: Cell-level API nesting is NOT supported and there is no markdown equivalent. Layouts can only be created empty via create_block. No workaround exists to populate layout columns through the API.
Deleting a container does NOT delete its children â delete children first for clean removal.

Block IDs are available in the blocks array returned by read_docs.` },
      { name: 'doc_id', type: 'string', required: false, description: `The document ID (the id field from read_docs). Takes priority over object_id if both are provided.` },
      { name: 'object_id', type: 'string', required: false, description: `The document object ID (the object_id field from read_docs, visible in the document URL). Resolved to doc_id.` },
    ],
  },
  {
    name: 'mondaymcp_updatefolder',
    description: `Update an existing folder in monday.com`,
    params: [
      { name: 'folderId', type: 'string', required: true, description: `The ID of the folder to update` },
      { name: 'accountProductId', type: 'string', required: false, description: `The account product ID associated with the folder` },
      { name: 'color', type: 'string', required: false, description: `The new color of the folder` },
      { name: 'customIcon', type: 'string', required: false, description: `The new custom icon of the folder` },
      { name: 'fontWeight', type: 'string', required: false, description: `The new font weight of the folder` },
      { name: 'name', type: 'string', required: false, description: `The new name of the folder` },
      { name: 'parentFolderId', type: 'string', required: false, description: `The ID of the new parent folder` },
      { name: 'position_is_after', type: 'boolean', required: false, description: `Whether to position the folder after the object` },
      { name: 'position_object_id', type: 'string', required: false, description: `The ID of the object to position the folder relative to. If this parameter is provided, position_object_type must be also provided.` },
      { name: 'position_object_type', type: 'string', required: false, description: `The type of object to position the folder relative to. If this parameter is provided, position_object_id must be also provided.` },
      { name: 'workspaceId', type: 'string', required: false, description: `The ID of the workspace containing the folder` },
    ],
  },
  {
    name: 'mondaymcp_updateform',
    description: `Update a monday.com form. Use the action field to specify the operation.`,
    params: [
      { name: 'action', type: 'string', required: true, description: `Action to execute on the form. Each action requires different fields â check field descriptions to know what to include.` },
      { name: 'formToken', type: 'string', required: true, description: `No description.` },
      { name: 'form', type: 'object', required: false, description: `Form data to update (patch semantics).` },
      { name: 'formPassword', type: 'string', required: false, description: `Required for setFormPassword action.` },
      { name: 'tag', type: 'object', required: false, description: `Tag to create/update/delete. Delete: id only. Create: name+value (id/columnId auto-generated). Update: id+new value.` },
    ],
  },
  {
    name: 'mondaymcp_updateview',
    description: `Update an existing board view (tab) â change its name, filter rules, or sort order. Provide only the fields you want to change. Omitted fields are left unchanged.

Filter operators: any_of, not_any_of, is_empty, is_not_empty, greater_than, lower_than, between, contains_text, not_contains_text

Example filter for people column: { "rules": [{ "column_id": "people", "compare_value": ["person-12345"], "operator": "any_of" }] }
Example filter for status column: { "rules": [{ "column_id": "status", "compare_value": [1], "operator": "any_of" }] }`,
    params: [
      { name: 'boardId', type: 'string', required: true, description: `The board ID the view belongs to` },
      { name: 'viewId', type: 'string', required: true, description: `The ID of the view to update` },
      { name: 'filter', type: 'object', required: false, description: `Filter configuration to apply to the view` },
      { name: 'name', type: 'string', required: false, description: `New name for the view (omit to leave unchanged)` },
      { name: 'settings', type: 'string', required: false, description: `Type-specific view settings as a JSON object (e.g. column visibility, group_by for TABLE). The shape varies by view type â call get_view_schema_by_type with the same ViewKind to discover the supported structure. For TABLE views, prefer the dedicated update_view_table tool which exposes a strongly-typed settings field.` },
      { name: 'sort', type: 'array', required: false, description: `Sort configuration for the view` },
      { name: 'type', type: 'string', required: false, description: `The type of the board view being updated. Use TABLE for standard board views.` },
    ],
  },
  {
    name: 'mondaymcp_updateviewtable',
    description: `Update an existing table-type board view â change its name, filters, sort, tags, or table-specific settings (column visibility/order and group-by). Provide only the fields you want to change. Omitted fields are left unchanged.

Filter operators: any_of, not_any_of, is_empty, is_not_empty, greater_than, lower_than, between, contains_text, not_contains_text

Example settings.columns: { "column_properties": [{ "column_id": "status", "visible": true }], "column_order": ["name", "status", "date"] }
Example settings.group_by: { "conditions": [{ "columnId": "status" }], "hideEmptyGroups": true }`,
    params: [
      { name: 'boardId', type: 'string', required: true, description: `The board ID the view belongs to` },
      { name: 'viewId', type: 'string', required: true, description: `The ID of the table view to update` },
      { name: 'filter', type: 'object', required: false, description: `Filter configuration to apply to the view` },
      { name: 'name', type: 'string', required: false, description: `New name for the view (omit to leave unchanged)` },
      { name: 'settings', type: 'object', required: false, description: `Table-specific view settings (column visibility/order, group-by)` },
      { name: 'sort', type: 'array', required: false, description: `Sort configuration for the view` },
      { name: 'tags', type: 'array', required: false, description: `Tags to apply to the view` },
    ],
  },
  {
    name: 'mondaymcp_updateworkflow',
    description: `Updates an existing workflow draft using an AI agent.

The agent interprets the prompt and applies structural changes to the workflow â creating, updating, or deleting steps. Pass clear, descriptive instructions and the agent will decide which operations to perform, then return a summary of what it did.

Use this after create_workflow to build out the workflow step by step. You can call it multiple times on the same draft to iteratively refine the workflow.

Parameters:
- workflowObjectId and workflowDraftId: both returned by create_workflow â they identify which draft to update.
- prompt: describe what you want to change in plain English (e.g. "Add a trigger that fires when an item is created on the Marketing board"). Maximum 2000 characters.

Returns:
- workflowObjectId: the workflow object ID (unchanged)
- workflowDraftId: the draft version ID (unchanged)
- result: agent response describing the changes made

Note: if directing the user to the workflow in the UI, the correct URL path is custom_objects/, not workflows/ â e.g. {account}.monday.com/custom_objects/{workflowObjectId}.

Note: the workflow runs only after it is published to live version.
`,
    params: [
      { name: 'prompt', type: 'string', required: true, description: `Natural-language description of the changes to make. Describe what steps to add, remove, or modify in plain English (e.g. "Add a trigger that fires when an item is created on the Marketing board"). The agent interprets this and applies the right structural changes. Maximum 2000 characters.` },
      { name: 'workflowDraftId', type: 'number', required: true, description: `The draft version ID to update. Use the workflowDraftId from the previous create_workflow or update_workflow response â the agent may return a new draft ID, so always read it from the latest response rather than reusing an earlier value.` },
      { name: 'workflowObjectId', type: 'number', required: true, description: `The workflow object ID returned by create_workflow. Identifies the workflow across all its drafts and published versions. Does not change across publishes.` },
    ],
  },
  {
    name: 'mondaymcp_updateworkspace',
    description: `Update an existing workspace in monday.com`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the workspace to update` },
      { name: 'attributeAccountProductId', type: 'number', required: false, description: `The target account product's ID to move the workspace to` },
      { name: 'attributeDescription', type: 'string', required: false, description: `The description of the workspace to update` },
      { name: 'attributeKind', type: 'string', required: false, description: `The kind of the workspace to update (open / closed / template)` },
      { name: 'attributeName', type: 'string', required: false, description: `The name of the workspace to update` },
    ],
  },
  {
    name: 'mondaymcp_workspaceinfo',
    description: `This tool returns the boards, docs and folders in a workspace and which folder they are in. It returns up to 100 of each object type, if you receive 100 assume there are additional objects of that type in the workspace.`,
    params: [
      { name: 'workspace_id', type: 'number', required: true, description: `The ID of the workspace to get information for` },
    ],
  },
]
