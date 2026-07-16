import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'activepiecesmcp_ap_add_branch',
    description: `Add a conditional branch to a router step. Inserted before the fallback branch.`,
    params: [
      {
        name: 'branchName',
        type: 'string',
        required: true,
        description: `Display name for the new branch (e.g. "Branch 1")`,
      },
      { name: 'flowId', type: 'string', required: true, description: `The id of the flow` },
      {
        name: 'routerStepName',
        type: 'string',
        required: true,
        description: `The name of the ROUTER step to add a branch to. Use ap_flow_structure to get valid values.`,
      },
      {
        name: 'conditions',
        type: 'array',
        required: false,
        description: `Conditions array (outer array = OR groups, inner array = AND conditions). Required for condition-type branches; omit to use an empty condition group.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_add_step',
    description: `Add a new step to a flow. Optionally configure it in the same call by providing input/auth/sourceCode. Prefer PIECE actions and inline formula expressions over CODE.`,
    params: [
      {
        name: 'displayName',
        type: 'string',
        required: true,
        description: `Display name for the step`,
      },
      { name: 'flowId', type: 'string', required: true, description: `The id of the flow` },
      {
        name: 'parentStepName',
        type: 'string',
        required: true,
        description: `The step name to insert after/into (e.g. "trigger", "step_1"). Use ap_flow_structure to get valid values.`,
      },
      {
        name: 'stepLocationRelativeToParent',
        type: 'string',
        required: true,
        description: `Where to place the step: AFTER = after the parent, INSIDE_LOOP = first action inside a loop, INSIDE_BRANCH = first action inside a router branch, INSIDE_ON_SUCCESS_BRANCH / INSIDE_ON_FAILURE_BRANCH = first action inside the On success / On failure branch of a continue-on-failure step (set continueOnFailure on the parent first).`,
      },
      {
        name: 'stepType',
        type: 'string',
        required: true,
        description: `The type of step to add. Prefer PIECE over CODE - only use CODE when no piece fits and the logic can't be done with an inline formula expression (in a free-text/value input) or a router condition.`,
      },
      {
        name: 'actionName',
        type: 'string',
        required: false,
        description: `For PIECE steps: the action name within the piece. Use ap_research_pieces with includeActions=true to get valid values.`,
      },
      {
        name: 'auth',
        type: 'string',
        required: false,
        description: `Connection externalId from ap_list_connections. Auto-wrapped as {{connections['externalId']}}.`,
      },
      {
        name: 'branchIndex',
        type: 'number',
        required: false,
        description: `Branch index (required when stepLocationRelativeToParent is INSIDE_BRANCH)`,
      },
      {
        name: 'continueOnFailure',
        type: 'boolean',
        required: false,
        description: `For CODE/PIECE steps: set true on the step that can fail (the one whose failure you want to react to), NOT on the recovery step. Defaults to false. When true the flow keeps running on failure and the step gains On success / On failure branches - add handler steps into them with stepLocationRelativeToParent INSIDE_ON_SUCCESS_BRANCH / INSIDE_ON_FAILURE_BRANCH and parentStepName = this step.`,
      },
      {
        name: 'input',
        type: 'object',
        required: false,
        description: `For PIECE/CODE steps: input config (key-value pairs). Reference a prior step's output with {{stepName['output'].field}} (output is nested under ['output'], e.g. {{trigger['output'].body.email}}, {{send_email['output'].id}}). For a continue-on-failure step's error, use {{stepName['error'].message}}.`,
      },
      {
        name: 'loopItems',
        type: 'string',
        required: false,
        description: `For LOOP steps: expression for items to iterate (e.g. "{{step_1['output'].items}}").`,
      },
      {
        name: 'packageJson',
        type: 'string',
        required: false,
        description: `For CODE steps: package.json as JSON string. Defaults to "{}".`,
      },
      {
        name: 'pieceName',
        type: 'string',
        required: false,
        description: `For PIECE steps: the piece name (e.g. "@activepieces/piece-gmail"). Use ap_research_pieces to get valid values.`,
      },
      {
        name: 'retryOnFailure',
        type: 'boolean',
        required: false,
        description: `For CODE/PIECE steps: whether to retry this step on failure. Defaults to false.`,
      },
      {
        name: 'sourceCode',
        type: 'string',
        required: false,
        description: `For CODE steps: JavaScript/TypeScript source. Must export a code function.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_build_flow',
    description: `Create a NEW flow from scratch in one call: trigger + steps. Steps are added sequentially by default (trigger → step_1 → step_2 → ...). To nest steps inside a loop, set parentStepName to the loop step name and stepLocationRelativeToParent to INSIDE_LOOP. ROUTER steps are NOT supported here (branches and conditions cannot be configured in one call) — build the rest of the flow first, then add the router with ap_add_step and configure branches with ap_add_branch / ap_update_branch. For EDITING an existing flow, do NOT rebuild it — use the granular ap_add_step / ap_update_step / ap_update_trigger instead. Prefer PIECE actions and inline formula expressions (in a free-text/value input — never a dropdown/option field — wrapped \`ap-formula-v1::{...}::ap-formula-v1\`) over CODE steps — only emit a CODE step when no piece fits AND the logic exceeds the inline formula functions (see the build_flow guide expression ladder).`,
    params: [
      { name: 'flowName', type: 'string', required: true, description: `Name for the new flow` },
      {
        name: 'steps',
        type: 'array',
        required: true,
        description: `Array of steps. By default added sequentially after trigger. Use parentStepName + stepLocationRelativeToParent to nest steps inside loops. Each step supports: PIECE (pieceName+actionName+input), CODE (sourceCode+input), LOOP_ON_ITEMS (loopItems). Prefer PIECE and inline formula expressions (in free-text/value inputs, not dropdowns) over CODE — reach for a CODE step only when no piece fits and the transform exceeds the inline formula functions. ROUTER is not supported here — add it afterwards with ap_add_step + ap_add_branch.`,
      },
      {
        name: 'trigger',
        type: 'object',
        required: true,
        description: `Trigger configuration: which piece and trigger to start the flow with, plus its input and auth.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_change_flow_status',
    description: `Enable or disable a published flow.`,
    params: [
      { name: 'flowId', type: 'string', required: true, description: `The id of the flow` },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `The new status: ENABLED to activate the flow, DISABLED to pause it`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_create_flow',
    description: `Create a new flow in Activepieces.`,
    params: [
      { name: 'flowName', type: 'string', required: true, description: `The name of the flow` },
    ],
  },
  {
    name: 'activepiecesmcp_ap_create_table',
    description: `Create a new table with an initial set of fields. Types: TEXT, NUMBER, DATE, STATIC_DROPDOWN.`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: true,
        description: `Fields to create. Max 100 fields per table.`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the table` },
    ],
  },
  {
    name: 'activepiecesmcp_ap_delete_branch',
    description: `Delete a branch from a router step. Cannot delete the fallback branch.`,
    params: [
      {
        name: 'branchIndex',
        type: 'number',
        required: true,
        description: `The index of the branch to delete (0-based). Cannot delete the fallback/last branch.`,
      },
      { name: 'flowId', type: 'string', required: true, description: `The id of the flow` },
      {
        name: 'routerStepName',
        type: 'string',
        required: true,
        description: `The name of the ROUTER step. Use ap_flow_structure to get valid values.`,
      },
      {
        name: 'displayName',
        type: 'string',
        required: false,
        description: `Short approval prompt shown to the user (e.g. "Delete branch 2 from router"). Must include what the action does and the target name.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_delete_flow',
    description: `Permanently delete a flow and all its versions. This cannot be undone.`,
    params: [
      {
        name: 'flowId',
        type: 'string',
        required: true,
        description: `The ID of the flow to delete`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_delete_records',
    description: `Permanently delete one or more records by their IDs.`,
    params: [
      {
        name: 'recordIds',
        type: 'array',
        required: true,
        description: `Array of record IDs to delete. Use ap_find_records to find them.`,
      },
      {
        name: 'displayName',
        type: 'string',
        required: false,
        description: `Short approval prompt shown to the user (e.g. "Delete 3 records from Emails table"). Must include what the action does and the target name.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_delete_step',
    description: `Delete a step from a flow. Prefer ap_update_step to modify - delete destroys sample data.`,
    params: [
      { name: 'flowId', type: 'string', required: true, description: `The id of the flow` },
      {
        name: 'stepName',
        type: 'string',
        required: true,
        description: `The name of the step to delete. Use ap_flow_structure to get valid values.`,
      },
      {
        name: 'displayName',
        type: 'string',
        required: false,
        description: `Short approval prompt shown to the user (e.g. "Delete Send Email step"). Must include what the action does and the target name.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_delete_table',
    description: `Permanently delete a table and all its data.`,
    params: [
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The ID of the table to delete. Use ap_list_tables to find it.`,
      },
      {
        name: 'displayName',
        type: 'string',
        required: false,
        description: `Short approval prompt shown to the user (e.g. "Delete Customer Emails table"). Must include what the action does and the target name.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_duplicate_flow',
    description: `Duplicate an existing flow. Creates a new copy with all steps and configuration. Connections and sample data are not copied.`,
    params: [
      {
        name: 'flowId',
        type: 'string',
        required: true,
        description: `The id of the flow to duplicate. Use ap_list_flows to find it.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name for the duplicated flow. Defaults to "Copy of {original name}".`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_find_records',
    description: `Query records from a table with optional filtering. Operators: eq, neq, gt, gte, lt, lte, co, exists, not_exists.`,
    params: [
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The table ID. Use ap_list_tables to find it.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Optional filters. All filters are combined with AND logic.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Max records to return (default 50, max 500)`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_flow_structure',
    description: `Get the structure of a flow: step tree (parent/child), each step type, configuration status (configured/unconfigured/invalid), and valid insert locations for ap_add_step.`,
    params: [{ name: 'flowId', type: 'string', required: true, description: `The id of the flow` }],
  },
  {
    name: 'activepiecesmcp_ap_get_piece_props',
    description: `Get the input schema for a piece action or trigger, plus AI guidance for using it: an AI-written description of what it does, an idempotency hint, and — when available — the output field paths it produces (for triggers, also derived from sample data). Use the AI description to pick the right action; when output fields are listed, reference them directly downstream as {{step['output'].path}}. Pass auth to resolve dynamic dropdowns and dynamic property sub-fields (e.g. Custom API Call url/body fields).`,
    params: [
      {
        name: 'actionOrTriggerName',
        type: 'string',
        required: true,
        description: `The action or trigger name (e.g. "send_channel_message"). Use ap_research_pieces with pieceNames to get valid values.`,
      },
      {
        name: 'pieceName',
        type: 'string',
        required: true,
        description: `The piece name (e.g. "@activepieces/piece-slack"). Use ap_research_pieces to get valid values.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Whether to look up an action or a trigger.`,
      },
      {
        name: 'auth',
        type: 'string',
        required: false,
        description: `Connection externalId from ap_list_connections. When provided, dynamic dropdowns and dynamic property sub-fields are resolved via your account.`,
      },
      {
        name: 'flowId',
        type: 'string',
        required: false,
        description: `Flow ID for resolving dependent dropdowns that need step context. Optional — most dropdowns work without it.`,
      },
      {
        name: 'input',
        type: 'object',
        required: false,
        description: `Known input values to resolve dependent dynamic properties.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_get_run',
    description: `Get detailed results of a flow run including step-by-step outputs, errors, and durations.`,
    params: [
      {
        name: 'flowRunId',
        type: 'string',
        required: true,
        description: `The ID of the flow run. Use ap_list_runs to find it.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_insert_records',
    description: `Insert one or more records into a table. Max 50 records per call.`,
    params: [
      {
        name: 'records',
        type: 'array',
        required: true,
        description: `Array of records (1-50). Each record maps field names to values. Example: [{"Name": "Alice", "Age": "30"}]`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The table ID (the "id" from ap_list_tables; the externalId is also accepted).`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_list_ai_models',
    description: `List configured AI providers and their available models. Use this to discover valid provider and model values for configuring Run Agent steps. The output shows provider names and model IDs needed for the aiProviderModel input.`,
    params: [
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Filter by provider name. Omit to list all configured providers and their models.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_list_connections',
    description: `List OAuth/app connections in the project. Returns externalId needed for the auth parameter on steps.`,
    params: [
      {
        name: 'displayName',
        type: 'string',
        required: false,
        description: `Filter by connection display name (partial, case-insensitive match). Use to find a connection by its label, e.g. "My Gmail" or "Slack workspace".`,
      },
      {
        name: 'pieceName',
        type: 'string',
        required: false,
        description: `Filter by piece name. Short names like "slack" or "google-drive" are auto-expanded to full format (e.g. "@activepieces/piece-slack"). You can also pass the full name directly.`,
      },
      {
        name: 'status',
        type: 'array',
        required: false,
        description: `Filter by status: ACTIVE (working), MISSING (deleted or inaccessible), ERROR (auth/refresh failed). Omit to return all statuses.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_list_flows',
    description: `List flows in the current project with status, trigger type, and published state.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max flows to return (default 100, max 500).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter by flow name (partial match).`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by status: ENABLED or DISABLED.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_list_runs',
    description: `List recent flow runs with optional filters. Returns run ID, status, timestamps, and failed step info.`,
    params: [
      {
        name: 'environment',
        type: 'string',
        required: false,
        description: `Filter by environment: PRODUCTION (live runs) or TESTING (manual test runs). Defaults to PRODUCTION when no flowId is given, since cross-environment scans on the runs table are slow.`,
      },
      {
        name: 'flowId',
        type: 'string',
        required: false,
        description: `Filter by flow ID. Use ap_list_flows to find it.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Max runs to return (default 10, max 50)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by status: SUCCEEDED, FAILED, RUNNING, QUEUED, PAUSED, TIMEOUT, etc.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_list_tables',
    description: `List all tables in the current project with their fields (name, type, id) and row counts. Use this to discover available tables before querying or modifying data. Each table has two ids: use "id" with the record/field MCP tools (ap_insert_records, ap_find_records, ap_manage_fields, etc.), and use "externalId" as the table_id value when configuring a Tables piece step inside a flow.`,
    params: [],
  },
  {
    name: 'activepiecesmcp_ap_lock_and_publish',
    description: `Publish and enable the current draft version of a flow. This locks the draft, sets it as the published version, and enables the flow. Returns validation errors if the flow is not ready.`,
    params: [
      {
        name: 'flowId',
        type: 'string',
        required: true,
        description: `The id of the flow to publish`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_manage_fields',
    description: `Add, rename, or delete fields on a table. Max 100 fields per table.`,
    params: [
      {
        name: 'operation',
        type: 'string',
        required: true,
        description: `ADD a new field, UPDATE (rename) an existing field, or DELETE a field`,
      },
      { name: 'tableId', type: 'string', required: true, description: `The table ID` },
      {
        name: 'fieldId',
        type: 'string',
        required: false,
        description: `The field ID (required for UPDATE and DELETE). Use ap_list_tables to find it.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Field name (required for ADD and UPDATE)`,
      },
      {
        name: 'options',
        type: 'array',
        required: false,
        description: `Dropdown options (required for ADD with STATIC_DROPDOWN type)`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Field type (required for ADD only)`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_manage_notes',
    description: `Add, update, or delete canvas notes on a flow. Notes are visual annotations on the flow canvas.`,
    params: [
      { name: 'flowId', type: 'string', required: true, description: `The id of the flow` },
      {
        name: 'operation',
        type: 'string',
        required: true,
        description: `Operation to perform: ADD a new note, UPDATE an existing note, or DELETE a note`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Note color variant (orange, red, green, blue, purple, yellow). Default: yellow`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The text content of the note (required for ADD, optional for UPDATE)`,
      },
      {
        name: 'noteId',
        type: 'string',
        required: false,
        description: `The note ID (required for UPDATE and DELETE)`,
      },
      {
        name: 'position',
        type: 'object',
        required: false,
        description: `Position on the canvas (required for ADD, optional for UPDATE)`,
      },
      {
        name: 'size',
        type: 'object',
        required: false,
        description: `Size of the note (optional, defaults to 200x200)`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_read_step_code',
    description: `Read the full source code, package.json, and input of a CODE step. Returns untruncated content (unlike ap_flow_structure which truncates).`,
    params: [
      { name: 'flowId', type: 'string', required: true, description: `The id of the flow` },
      {
        name: 'stepName',
        type: 'string',
        required: true,
        description: `The name of the CODE step (e.g. "step_1"). Use ap_flow_structure to get valid values.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_rename_flow',
    description: `Rename a flow.`,
    params: [
      {
        name: 'displayName',
        type: 'string',
        required: true,
        description: `The new display name for the flow`,
      },
      {
        name: 'flowId',
        type: 'string',
        required: true,
        description: `The id of the flow to rename`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_research_pieces',
    description: `Research available pieces. Use pieceNames for bulk exact lookup (always returns actions and triggers, each with an AI guidance hint). Use searchQuery for fuzzy discovery. Pass forIntent with what you are trying to do to get recommendedActions ranked by AI guidance, so you pick the right action in one shot.`,
    params: [
      { name: 'categories', type: 'array', required: false, description: `No description.` },
      {
        name: 'forIntent',
        type: 'string',
        required: false,
        description: `What you are trying to do (e.g. "list all my open deals"). When set, each piece also returns recommendedActions — the actions whose AI guidance best matches your intent — so you can pick the right action in one shot. Advisory only; the full action list is always returned.`,
      },
      {
        name: 'includeActions',
        type: 'boolean',
        required: false,
        description: `When true, include action names and descriptions for each piece (only applies to searchQuery mode)`,
      },
      {
        name: 'includeTriggers',
        type: 'boolean',
        required: false,
        description: `When true, include trigger names and descriptions for each piece (only applies to searchQuery mode)`,
      },
      { name: 'locale', type: 'string', required: false, description: `No description.` },
      {
        name: 'pieceNames',
        type: 'array',
        required: false,
        description: `Exact piece names to look up (e.g. ["gmail", "slack", "@activepieces/piece-google-sheets"]). Always returns actions and triggers for each piece.`,
      },
      { name: 'searchQuery', type: 'string', required: false, description: `No description.` },
      { name: 'suggestionType', type: 'string', required: false, description: `No description.` },
      { name: 'tags', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'activepiecesmcp_ap_resolve_property_chain',
    description: `Resolve a chain of dependent dropdown properties in one call. For actions with cascading fields (e.g. Spreadsheet -> Sheet -> Columns), this resolves each property sequentially, feeding each selected value into the next resolution. Pass selectedValue for properties whose value you already know; the tool stops and returns options when it hits a property without a selectedValue. Always use the value from returned options, not the label.`,
    params: [
      {
        name: 'actionOrTriggerName',
        type: 'string',
        required: true,
        description: `The action or trigger name (e.g. "insert_row").`,
      },
      {
        name: 'auth',
        type: 'string',
        required: true,
        description: `Connection externalId - required to resolve options from the user's account.`,
      },
      {
        name: 'pieceName',
        type: 'string',
        required: true,
        description: `The piece name (e.g. "@activepieces/piece-google-sheets").`,
      },
      {
        name: 'propertyChain',
        type: 'array',
        required: true,
        description: `Ordered list of properties to resolve (max 10). Each property is resolved using the values of all prior properties as context.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Whether this is an action or trigger.`,
      },
      {
        name: 'currentInput',
        type: 'object',
        required: false,
        description: `Additional input values already known (e.g. from prior configuration).`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_resolve_property_options',
    description: `Resolve dropdown options for a single piece property. Returns the available options with labels and values (IDs). Use this to discover valid values for DROPDOWN fields (e.g. Slack channels, Google Sheets, email labels). Always use the \`value\` from the returned options, not the \`label\`.`,
    params: [
      {
        name: 'actionOrTriggerName',
        type: 'string',
        required: true,
        description: `The action or trigger name (e.g. "send_channel_message").`,
      },
      {
        name: 'pieceName',
        type: 'string',
        required: true,
        description: `The piece name (e.g. "@activepieces/piece-slack").`,
      },
      {
        name: 'propertyName',
        type: 'string',
        required: true,
        description: `The exact property name to resolve options for (e.g. "channel").`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Whether this is an action or trigger.`,
      },
      {
        name: 'auth',
        type: 'string',
        required: false,
        description: `Connection externalId. Required for pieces that resolve options from a connected account (e.g. Slack channels, Gmail labels). Omit for pieces that have no auth (e.g. Tables table_id) — passing a value there is unnecessary.`,
      },
      {
        name: 'input',
        type: 'object',
        required: false,
        description: `Values for parent properties that this field depends on (refreshers).`,
      },
      {
        name: 'searchValue',
        type: 'string',
        required: false,
        description: `Search/filter term to narrow results for large dropdown lists (e.g., "sales" to find sales-related channels).`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_retry_run',
    description: `Retry a failed flow run. FROM_FAILED_STEP resumes at failure point, ON_LATEST_VERSION re-runs entirely.`,
    params: [
      {
        name: 'flowRunId',
        type: 'string',
        required: true,
        description: `The ID of the failed flow run to retry. Use ap_list_runs to find it.`,
      },
      {
        name: 'strategy',
        type: 'string',
        required: true,
        description: `FROM_FAILED_STEP to resume where it failed, ON_LATEST_VERSION to re-run with the current published flow.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_run_action',
    description: `Execute a single piece action once, without building or saving a flow. Use this for one-shot tasks like "check my inbox" or "send one Slack message". For recurring/triggered work, build a flow with ap_build_flow instead.`,
    params: [
      {
        name: 'actionName',
        type: 'string',
        required: true,
        description: `Action to run, e.g. "send_channel_message". Use ap_get_piece_props for the input shape.`,
      },
      {
        name: 'pieceName',
        type: 'string',
        required: true,
        description: `Piece name, e.g. "slack" or "@activepieces/piece-slack". Use ap_research_pieces to discover.`,
      },
      {
        name: 'connectionExternalId',
        type: 'string',
        required: false,
        description: `externalId from ap_list_connections. Required if the piece needs auth. Auto-wrapped as {{connections['externalId']}}.`,
      },
      {
        name: 'input',
        type: 'object',
        required: false,
        description: `Fully-resolved input for the action. Keys must match the piece action's props. Pass raw values - do NOT wrap in {{...}}. Omit if the action has no props.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_setup_guide',
    description: `Get setup instructions for connections or AI providers. Returns steps for the user to follow in the UI.`,
    params: [
      {
        name: 'topic',
        type: 'string',
        required: true,
        description: `What to get setup instructions for`,
      },
      {
        name: 'pieceName',
        type: 'string',
        required: false,
        description: `For connections: the piece that needs auth (e.g., "@activepieces/piece-gmail"). Omit for general instructions.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_test_flow',
    description: `Test a flow end-to-end in the test environment. Requires a configured trigger. Waits up to 120s. Pass triggerTestData to provide mock trigger output when no sample data exists.`,
    params: [
      {
        name: 'flowId',
        type: 'string',
        required: true,
        description: `The ID of the flow to test. Use ap_list_flows to find it.`,
      },
      {
        name: 'displayName',
        type: 'string',
        required: false,
        description: `Short approval prompt shown to the user (e.g. "Test Send Welcome Email"). Must include what the action does and the target name.`,
      },
      {
        name: 'triggerTestData',
        type: 'object',
        required: false,
        description: `Mock trigger output data. Saved as sample data before running the test. Useful when the trigger has no prior test data.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_test_step',
    description: `Test a single step within a flow. Runs all steps up to and including the specified step. The flow must have a configured trigger. Pass triggerTestData when no sample data exists.`,
    params: [
      {
        name: 'flowId',
        type: 'string',
        required: true,
        description: `The ID of the flow containing the step. Use ap_list_flows to find it.`,
      },
      {
        name: 'stepName',
        type: 'string',
        required: true,
        description: `The name of the step to test (e.g., "step_1"). Use ap_flow_structure to find it.`,
      },
      {
        name: 'displayName',
        type: 'string',
        required: false,
        description: `Short approval prompt shown to the user (e.g. "Test Send Email step in Welcome Flow"). Must include what the action does and the target name.`,
      },
      {
        name: 'triggerTestData',
        type: 'object',
        required: false,
        description: `Mock trigger output data. Saved as sample data before running the test. Useful when the trigger has no prior test data.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_update_branch',
    description: `Update the conditions and/or name of an existing router branch. Does not affect the steps inside the branch.`,
    params: [
      {
        name: 'branchIndex',
        type: 'number',
        required: true,
        description: `The index of the branch to update (0-based). Cannot update the fallback branch conditions.`,
      },
      { name: 'flowId', type: 'string', required: true, description: `The id of the flow` },
      {
        name: 'routerStepName',
        type: 'string',
        required: true,
        description: `The name of the ROUTER step. Use ap_flow_structure to get valid values.`,
      },
      {
        name: 'branchName',
        type: 'string',
        required: false,
        description: `New display name for the branch`,
      },
      {
        name: 'conditions',
        type: 'array',
        required: false,
        description: `New conditions array (outer array = OR groups, inner array = AND conditions). Replaces the existing conditions entirely.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_update_record',
    description: `Update specific cells in a record. Only specified fields are changed.`,
    params: [
      {
        name: 'fields',
        type: 'object',
        required: true,
        description: `Object mapping field names to new values. Only specified fields are updated. Example: {"Name": "Bob", "Age": "25"}`,
      },
      {
        name: 'recordId',
        type: 'string',
        required: true,
        description: `The record ID to update. Use ap_find_records to find it.`,
      },
      { name: 'tableId', type: 'string', required: true, description: `The table ID.` },
    ],
  },
  {
    name: 'activepiecesmcp_ap_update_step',
    description: `Update an existing step's settings. Provide only the fields you want to change.`,
    params: [
      { name: 'flowId', type: 'string', required: true, description: `The id of the flow` },
      {
        name: 'stepName',
        type: 'string',
        required: true,
        description: `The name of the step to update (e.g. "step_1"). Use ap_flow_structure to get valid values.`,
      },
      {
        name: 'actionName',
        type: 'string',
        required: false,
        description: `For PIECE steps: the action to perform. Use ap_research_pieces to get valid values.`,
      },
      {
        name: 'auth',
        type: 'string',
        required: false,
        description: `Connection externalId from ap_list_connections. The tool wraps it automatically as {{connections['externalId']}}.`,
      },
      {
        name: 'continueOnFailure',
        type: 'boolean',
        required: false,
        description: `For CODE/PIECE steps: set true on the step that can fail (the one whose failure you want to react to), NOT on the recovery step. The flow keeps running on failure and the step gains On success / On failure branches - add handler steps into them with ap_add_step using stepLocationRelativeToParent INSIDE_ON_SUCCESS_BRANCH / INSIDE_ON_FAILURE_BRANCH and parentStepName = this step.`,
      },
      {
        name: 'displayName',
        type: 'string',
        required: false,
        description: `New display name for the step`,
      },
      {
        name: 'input',
        type: 'object',
        required: false,
        description: `Input settings for the step (key-value pairs matching the action schema). Reference a prior step's output with {{stepName['output'].field}} (output is nested under ['output'], e.g. {{trigger['output'].body.email}}, {{send_email['output'].id}}). For a continue-on-failure step's error, use {{stepName['error'].message}}.`,
      },
      {
        name: 'loopItems',
        type: 'string',
        required: false,
        description: `For LOOP steps: expression for the items to iterate over`,
      },
      {
        name: 'packageJson',
        type: 'string',
        required: false,
        description: `For CODE steps only: package.json content as a JSON string for npm dependencies. Defaults to "{}".`,
      },
      {
        name: 'retryOnFailure',
        type: 'boolean',
        required: false,
        description: `For CODE/PIECE steps: whether to retry this step on failure.`,
      },
      {
        name: 'skip',
        type: 'boolean',
        required: false,
        description: `Whether to skip this step during execution`,
      },
      {
        name: 'sourceCode',
        type: 'string',
        required: false,
        description: `For CODE steps only: the JavaScript/TypeScript source code. Must export a code function: export const code = async (inputs) => { ... }.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_update_trigger',
    description: `Set or update the trigger for a flow.`,
    params: [
      { name: 'flowId', type: 'string', required: true, description: `The id of the flow` },
      {
        name: 'pieceName',
        type: 'string',
        required: true,
        description: `The piece name for the trigger (e.g. "@activepieces/piece-gmail"). Use ap_research_pieces to get valid values.`,
      },
      {
        name: 'triggerName',
        type: 'string',
        required: true,
        description: `The trigger name within the piece (e.g. "new_email"). Use ap_research_pieces with includeTriggers=true to get valid values.`,
      },
      {
        name: 'auth',
        type: 'string',
        required: false,
        description: `Connection externalId from ap_list_connections. The tool wraps it automatically as {{connections['externalId']}}.`,
      },
      {
        name: 'displayName',
        type: 'string',
        required: false,
        description: `Display name for the trigger step`,
      },
      {
        name: 'input',
        type: 'object',
        required: false,
        description: `Input settings for the trigger (key-value pairs). Reference a prior step's output with {{stepName['output'].field}} (output is nested under ['output'], e.g. {{trigger['output'].body.email}}, {{send_email['output'].id}}). For a continue-on-failure step's error, use {{stepName['error'].message}}.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_validate_flow',
    description: `Validate a flow for structural issues without publishing. Checks step validity, template references, and empty branches. Returns a detailed report with all issues found. Use this before ap_lock_and_publish to catch problems early.`,
    params: [
      {
        name: 'flowId',
        type: 'string',
        required: true,
        description: `The id of the flow to validate. Use ap_list_flows to find it.`,
      },
    ],
  },
  {
    name: 'activepiecesmcp_ap_validate_step_config',
    description: `Validate a step configuration before applying it. Returns field-level errors without modifying any flow. Use this to check your config is correct before calling ap_update_step or ap_update_trigger.`,
    params: [
      {
        name: 'stepType',
        type: 'string',
        required: true,
        description: `The type of step to validate.`,
      },
      {
        name: 'actionName',
        type: 'string',
        required: false,
        description: `For PIECE_ACTION: action name (e.g. "send_channel_message").`,
      },
      {
        name: 'auth',
        type: 'string',
        required: false,
        description: `For PIECE steps requiring auth: any non-empty string indicates auth is provided.`,
      },
      {
        name: 'input',
        type: 'object',
        required: false,
        description: `For PIECE_ACTION/PIECE_TRIGGER: the input config to validate (key-value pairs).`,
      },
      {
        name: 'loopItems',
        type: 'string',
        required: false,
        description: `For LOOP_ON_ITEMS: expression for items to iterate over.`,
      },
      {
        name: 'packageJson',
        type: 'string',
        required: false,
        description: `For CODE: package.json content as JSON string.`,
      },
      {
        name: 'pieceName',
        type: 'string',
        required: false,
        description: `For PIECE_ACTION/PIECE_TRIGGER: piece name (e.g. "slack" or "@activepieces/piece-slack").`,
      },
      {
        name: 'settings',
        type: 'object',
        required: false,
        description: `For ROUTER: raw router settings including branches and executionType.`,
      },
      {
        name: 'sourceCode',
        type: 'string',
        required: false,
        description: `For CODE: the JavaScript/TypeScript source code.`,
      },
      {
        name: 'triggerName',
        type: 'string',
        required: false,
        description: `For PIECE_TRIGGER: trigger name (e.g. "new_mention").`,
      },
    ],
  },
]
