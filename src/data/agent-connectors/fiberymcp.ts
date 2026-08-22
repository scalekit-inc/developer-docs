import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'fiberymcp_add_chart_tab',
    description: `Appends a new chart tab to an existing Fibery report.

**Prerequisite:** You need a \`reportId\` from \`create_report\` or \`get_reports_list\`. Call \`display_report_schema\` first to discover valid field expressions for the report's sources.

Reports are a specialized domain — call \`get_fibery_skill\` with \`skill: "reports"\` for the full report model, expression syntax, palettes, conditions, and workflow.`,
    params: [
      {
        name: 'reportId',
        type: 'string',
        required: true,
        description: `UUID of the report to add the chart tab to (from create_report or get_reports_list).`,
      },
      {
        name: 'x',
        type: 'array',
        required: true,
        description: `X-axis dimensions. Put categorical/date dimensions before numeric.`,
      },
      {
        name: 'y',
        type: 'array',
        required: true,
        description: `Y-axis dimensions. Put categorical/date dimensions before numeric.`,
      },
      {
        name: 'color',
        type: 'object',
        required: false,
        description: `Color-coding (legend) dimension. Only one allowed.`,
      },
      { name: 'description', type: 'string', required: false, description: `Tab description.` },
      {
        name: 'dimensionConditions',
        type: 'array',
        required: false,
        description: `Dimension-level filters (must reference expressions already used in the tab).`,
      },
      {
        name: 'fieldConditions',
        type: 'array',
        required: false,
        description: `Field-level filters applied to this tab's data.`,
      },
      {
        name: 'label',
        type: 'array',
        required: false,
        description: `Label dimensions shown on chart points/bars.`,
      },
      {
        name: 'palette',
        type: 'string',
        required: false,
        description: `Color palette. See get_fibery_skill(skill:'reports') for palette selection guidance.`,
      },
      {
        name: 'size',
        type: 'object',
        required: false,
        description: `Size-coding dimension. Only one allowed.`,
      },
      { name: 'title', type: 'string', required: false, description: `Tab title.` },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Chart type. Defaults to 'scatterplot' if omitted. See get_fibery_skill(skill:'reports') for chart-type guidance.`,
      },
    ],
  },
  {
    name: 'fiberymcp_add_collection_items',
    description: `Adds related entities to a Collection field on a Fibery entity.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
      { name: 'entityId', type: 'string', required: true, description: `fibery/id of an entity` },
      {
        name: 'field',
        type: 'string',
        required: true,
        description: `The name of the collection field`,
      },
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `An array of related entity ids to add to the collection. Each entry must be fibery/id of the entity to add`,
      },
    ],
  },
  {
    name: 'fiberymcp_add_comment',
    description: `Adds a top-level comment or reply to an existing comment on a Fibery entity.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Comment content in Markdown format`,
      },
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task'). Must be a database that supports comments (has the comments/comments collection).`,
      },
      {
        name: 'entityId',
        type: 'string',
        required: true,
        description: `fibery/id of the entity to comment on`,
      },
      {
        name: 'parentCommentId',
        type: 'string',
        required: false,
        description: `fibery/id of the parent comment when replying. Omit for a top-level comment. The parent comment must belong to the same entity (entityId) — otherwise the request is rejected.`,
      },
    ],
  },
  {
    name: 'fiberymcp_add_file_from_url',
    description: `Attaches a file to a Fibery entity by downloading it from a publicly accessible URL.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
      { name: 'entityId', type: 'string', required: true, description: `fibery/id of an entity` },
      {
        name: 'field',
        type: 'string',
        required: true,
        description: `Exact name of a file field on this database (e.g., 'Files/Files' or 'Space/Files'). Confirm via \`schema_detailed\` tool call. Document fields cannot be used.`,
      },
      {
        name: 'fileName',
        type: 'string',
        required: true,
        description: `Name of the file to be added (e.g., 'Report.pdf')`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `HTTP(s) URL to download the file from`,
      },
    ],
  },
  {
    name: 'fiberymcp_add_inline_comments',
    description: `Adds inline comments to text inside ONE block. The matched text becomes the highlighted range; block content is NOT changed. The author is the current user.

Call \`read_document\` first to get block ids.
Call \`get_fibery_skill({skill: "documents"})\` for more details. For entity-level comments (the Comments field of an entity), use \`add_comment\` instead.

## Example
\`\`\`
{
    secret: "123",
    comments: [{blockId: "456", exact: "comprehensive test suite", content: "Which suites exactly? Consider linking them."}]
}
\`\`\``,
    params: [
      { name: 'comments', type: 'array', required: true, description: `Comments to attach` },
      {
        name: 'secret',
        type: 'string',
        required: true,
        description: `Document secret (UUID). For entity document fields, select the field's secret via query (e.g. {Secret: ['Space/Field', 'Collaboration~Documents/secret']}). For standalone documents, use search with viewType 'document'`,
      },
    ],
  },
  {
    name: 'fiberymcp_add_metric_tab',
    description: `Appends a new metric tab to an existing Fibery report.

**Prerequisite:** You need a \`reportId\` from \`create_report\` or \`get_reports_list\`. Call \`display_report_schema\` first to discover valid field expressions for the report's sources.

**Scalar expressions only:** Every metric expression must be a scalar aggregate (e.g. \`COUNT([ID])\`). Raw field references are not valid here.

Reports are a specialized domain — call \`get_fibery_skill\` with \`skill: "reports"\` for the full report model, expression syntax, palettes, conditions, and workflow.`,
    params: [
      {
        name: 'metrics',
        type: 'array',
        required: true,
        description: `Scalar metrics to display. Each expression must be scalar (e.g. COUNT([ID])). Never duplicate.`,
      },
      {
        name: 'reportId',
        type: 'string',
        required: true,
        description: `UUID of the report to add the metric tab to (from create_report or get_reports_list).`,
      },
      { name: 'description', type: 'string', required: false, description: `Tab description.` },
      {
        name: 'dimensionConditions',
        type: 'array',
        required: false,
        description: `Dimension-level filters (must reference expressions already used in the tab).`,
      },
      {
        name: 'fieldConditions',
        type: 'array',
        required: false,
        description: `Field-level filters applied to this tab's data.`,
      },
      { name: 'title', type: 'string', required: false, description: `Tab title.` },
    ],
  },
  {
    name: 'fiberymcp_add_table_tab',
    description: `Appends a new table tab to an existing Fibery report.

**Prerequisite:** You need a \`reportId\` from \`create_report\` or \`get_reports_list\`. Call \`display_report_schema\` first to discover valid field expressions for the report's sources.

Reports are a specialized domain — call \`get_fibery_skill\` with \`skill: "reports"\` for the full report model, expression syntax, palettes, conditions, and workflow.`,
    params: [
      {
        name: 'columns',
        type: 'array',
        required: true,
        description: `Table columns. Never duplicate expressions across columns.`,
      },
      {
        name: 'reportId',
        type: 'string',
        required: true,
        description: `UUID of the report to add the table tab to (from create_report or get_reports_list).`,
      },
      { name: 'description', type: 'string', required: false, description: `Tab description.` },
      {
        name: 'dimensionConditions',
        type: 'array',
        required: false,
        description: `Dimension-level filters (must reference expressions already used in the tab).`,
      },
      {
        name: 'fieldConditions',
        type: 'array',
        required: false,
        description: `Field-level filters applied to this tab's data.`,
      },
      {
        name: 'groupBy',
        type: 'array',
        required: false,
        description: `Additional group-by dimensions. Do not reuse an expression already used as a column.`,
      },
      { name: 'title', type: 'string', required: false, description: `Tab title.` },
    ],
  },
  {
    name: 'fiberymcp_append_document_content',
    description: `[STALE: removed upstream, replaced by block-based document tools (insert_document_blocks/set_block_text/read_document)] Appends Markdown content to the end of a document field on a Fibery entity.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Document's content in MD format. Any content you write here will be APPENDED to already existing content in the document`,
      },
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
      { name: 'entityId', type: 'string', required: true, description: `fibery/id of an entity` },
      {
        name: 'field',
        type: 'string',
        required: true,
        description: `The name of the document field`,
      },
    ],
  },
  {
    name: 'fiberymcp_create_avatars_fields',
    description: `Enables avatar/profile-picture attachments on entities in one or more databases.`,
    params: [
      {
        name: 'databases',
        type: 'array',
        required: true,
        description: `Array of full database names (e.g., ["SoftDev/Task"])`,
      },
    ],
  },
  {
    name: 'fiberymcp_create_comments_fields',
    description: `Enables comments on entities in one or more databases.`,
    params: [
      {
        name: 'databases',
        type: 'array',
        required: true,
        description: `Array of full database names (e.g., ["SoftDev/Task"])`,
      },
    ],
  },
  {
    name: 'fiberymcp_create_custom_app',
    description: `Create a new Fibery custom app, placed in the user's private space unless \`spaceName\` is provided.

This tool does NOT generate any app code — it only creates an empty app scaffolded from the starter template.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the new custom app.` },
      {
        name: 'spaceName',
        type: 'string',
        required: false,
        description: `Space to place the app view in. Defaults to the user's private space.`,
      },
    ],
  },
  {
    name: 'fiberymcp_create_custom_app_dev_token',
    description: `Issue a short-lived (~1 hour) access token for developing a custom app locally. The token authenticates only the app's \`get-source-files\` / \`update-source-files\` endpoints, passed as the \`custom-app-dev-token\` query parameter — see \`get_fibery_skill({skill: "custom-apps-dev"})\` for the full development loop.`,
    params: [
      {
        name: 'appId',
        type: 'string',
        required: true,
        description: `Id of the custom app (from get_custom_apps_list or create_custom_app).`,
      },
    ],
  },
  {
    name: 'fiberymcp_create_databases',
    description: `Creates one or more new databases within an existing space.`,
    params: [{ name: 'databases', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'fiberymcp_create_entities',
    description: `Creates one or more entities in a Fibery database.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
      { name: 'entities', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'fiberymcp_create_files_fields',
    description: `Creates file attachment fields in one or more databases.`,
    params: [{ name: 'fields', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'fiberymcp_create_formula_field',
    description: `Creates a formula field in a database; the formula expression is generated from a plain-language description.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Description of what the formula should calculate. The formula expression will be generated from this`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the formula field in {Space}/{Field} format (e.g., 'SoftDev/Days Since Created'). Space prefix must match the database space`,
      },
    ],
  },
  {
    name: 'fiberymcp_create_icon_fields',
    description: `Enables emoji icon fields on entities in one or more databases.`,
    params: [
      {
        name: 'databases',
        type: 'array',
        required: true,
        description: `Array of full database names (e.g., ["SoftDev/Task"])`,
      },
    ],
  },
  {
    name: 'fiberymcp_create_multi_select_fields',
    description: `Creates multi-select fields with predefined options in one or more databases.`,
    params: [{ name: 'fields', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'fiberymcp_create_primitive_fields',
    description: `Creates primitive fields (text, number, date, boolean, etc.) in one or more databases.`,
    params: [{ name: 'fields', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'fiberymcp_create_relation_fields',
    description: `Creates relation fields between databases, establishing links in both the source and target database.`,
    params: [{ name: 'fields', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'fiberymcp_create_report',
    description: `Creates a Fibery report with sources and a title.

The report is placed in the user's private space unless \`spaceName\` is provided.

Prerequisites: call \`schema\` to discover valid database names; call \`display_report_schema\` to discover field expressions before configuring dimensions.

Reports are a specialized domain — call \`get_fibery_skill\` with \`skill: "reports"\` for the full report model, expression syntax, palettes, conditions, and workflow.`,
    params: [
      {
        name: 'sources',
        type: 'array',
        required: true,
        description: `One or more source databases for the report.`,
      },
      { name: 'title', type: 'string', required: true, description: `Title of the new report.` },
      {
        name: 'sourceMode',
        type: 'string',
        required: false,
        description: `Source mode: 'current' (default) queries live entity state; 'historical' resolves a history-timeline source for time-in-state / change-frequency analysis.`,
      },
      {
        name: 'spaceName',
        type: 'string',
        required: false,
        description: `Space to place the report in. Defaults to the user's private space.`,
      },
    ],
  },
  {
    name: 'fiberymcp_create_single_select_fields',
    description: `Creates single-select fields with predefined options in one or more databases.`,
    params: [{ name: 'fields', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'fiberymcp_create_space',
    description: `Creates a new space in the Fibery workspace.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Space name (e.g., "SoftDev")` },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Color for the space (hex color code, e.g., '#FF5722')`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description for the space`,
      },
    ],
  },
  {
    name: 'fiberymcp_create_view',
    description: `Creates a saved view (grid, board, timeline, calendar, etc.) or standalone document in the Fibery workspace.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the view` },
      {
        name: 'viewType',
        type: 'string',
        required: true,
        description: `grid: spreadsheet table (supports hierarchical groupBy). list: simple list (prefer grid). board: kanban grouped by relation/enum on x and optionally y. timeline: time bars with optional milestones and dependencies. calendar: date events. map: geographic plot of a location field. feed: rich-text feed of a document field. gallery: card gallery with cover images. gantt: hierarchical timeline with dependencies. form: data input form. document: standalone markdown (use the \`content\` param). report: not yet supported here.`,
      },
      {
        name: 'config',
        type: 'object',
        required: false,
        description: `View configuration object. Shape depends on viewType — for anything beyond a basic grid/list with no filters or ordering, call get_tool_reference({toolName: 'create_view'}) first.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Markdown content (for document views)`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Short description of the view in MD format`,
      },
      {
        name: 'space',
        type: 'string',
        required: false,
        description: `Space name to create the view in. Pass "Private" to save in Private space. By default, inferred from databases.`,
      },
    ],
  },
  {
    name: 'fiberymcp_create_workflow_field',
    description: `Creates a workflow (state) field for tracking entity status through defined stages.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
      {
        name: 'defaultOption',
        type: 'string',
        required: true,
        description: `Default state name for new entities`,
      },
      {
        name: 'options',
        type: 'array',
        required: true,
        description: `Array of workflow state options`,
      },
    ],
  },
  {
    name: 'fiberymcp_delete_avatars_fields',
    description: `Removes avatar fields from one or more databases; restorable via the Activity Log.`,
    params: [
      {
        name: 'databases',
        type: 'array',
        required: true,
        description: `Array of full database names (e.g., ["SoftDev/Task"])`,
      },
    ],
  },
  {
    name: 'fiberymcp_delete_comments_fields',
    description: `Removes comment fields from one or more databases; restorable via the Activity Log.`,
    params: [
      {
        name: 'databases',
        type: 'array',
        required: true,
        description: `Array of full database names (e.g., ["SoftDev/Task"])`,
      },
    ],
  },
  {
    name: 'fiberymcp_delete_databases',
    description: `Deletes one or more databases from a space; restorable via the Activity Log.`,
    params: [
      {
        name: 'databases',
        type: 'array',
        required: true,
        description: `Array of full database names to delete (e.g., ["SoftDev/Tasks"])`,
      },
    ],
  },
  {
    name: 'fiberymcp_delete_document_blocks',
    description: `Deletes blocks from a document, each with all its children.

Call \`read_document\` first to get block ids.
Call \`get_fibery_skill({skill: "documents"})\` for the block model and the editing workflow.

Delete a \`table\` only by the whole \`table\` block's id — \`table_row\`, \`table_cell\` and \`table_header\` CANNOT be deleted, adding/removing rows or columns is not supported.

## Example
\`\`\`
{
    secret: "123",
    blockIds: ["456", "789"]
}
\`\`\``,
    params: [
      {
        name: 'blockIds',
        type: 'array',
        required: true,
        description: `Ids of blocks to delete. Each block is deleted with all its children`,
      },
      {
        name: 'secret',
        type: 'string',
        required: true,
        description: `Document secret (UUID). For entity document fields, select the field's secret via query (e.g. {Secret: ['Space/Field', 'Collaboration~Documents/secret']}). For standalone documents, use search with viewType 'document'`,
      },
    ],
  },
  {
    name: 'fiberymcp_delete_entities',
    description: `Permanently deletes entities from a database by their IDs.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `Array of entity IDs (fibery/id) to delete`,
      },
    ],
  },
  {
    name: 'fiberymcp_delete_fields',
    description: `Deletes one or more fields from their databases; restorable via the Activity Log.`,
    params: [{ name: 'fields', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'fiberymcp_delete_icon_fields',
    description: `Removes icon fields from one or more databases; restorable via the Activity Log.`,
    params: [
      {
        name: 'databases',
        type: 'array',
        required: true,
        description: `Array of full database names (e.g., ["SoftDev/Task"])`,
      },
    ],
  },
  {
    name: 'fiberymcp_delete_space',
    description: `Deletes a space and all its databases from the workspace; restorable via the Activity Log.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Space name to delete (e.g., "SoftDev")`,
      },
    ],
  },
  {
    name: 'fiberymcp_delete_views',
    description: `Deletes one or more Fibery views by ID; the underlying data is not removed.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `An array of fibery/id strings (of views) to be deleted`,
      },
    ],
  },
  {
    name: 'fiberymcp_delete_workflow_field',
    description: `Deletes the workflow (state) field from a database; restorable via the Activity Log.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
    ],
  },
  {
    name: 'fiberymcp_display_entity_capabilities_via_sharing',
    description: `Returns per-entity capabilities derived from sharing for the requested Fibery databases.

Use this when the user wants to know what access they have at the entity level (not just space- or database-level). For each database, the response includes the entities they can reach and how they reach them.

Three access paths are covered:
1. **Direct sharing** — the entity was explicitly shared with the user, returned in \`entityLevelGrants\`.
2. **Propagated sharing** — access was inherited from a related entity, returned in \`indirectEntityLevelGrants\`.
3. **Assignment rules** — the user appears in a People-field rule on the entity type, returned in \`assigneeGrants\`.

Capabilities from every source (space-level, database-level, per-entity grants, propagation from other databases) ACCUMULATE — they NEVER override. To compute effective capabilities on a specific entity, take the UNION of all sources.

Limitations for assignee grants: sample only (up to 10 entities per rule)

Per-database result fields:
- \`spaceLevelCapabilities\` — capabilities granted at the space level.
- \`databaseLevelCapabilities\` — capabilities granted at the database level.
- \`entityLevelGrants\` — per-entity grants from direct sharing.
- \`indirectEntityLevelGrants\` — grants propagated from related entities.
- \`assigneeGrants\` — grants derived from assignment rules on People-type fields.

If a database can't be resolved in the schema, its entry is \`{database, error}\` instead.`,
    params: [
      {
        name: 'databases',
        type: 'array',
        required: true,
        description: `Full database names in "Space/Database" format (e.g. ["Project Management/Feature"]).`,
      },
    ],
  },
  {
    name: 'fiberymcp_display_report_schema',
    description: `Get the vizydrop report source schema for one or more Fibery databases. This is distinct from the Fibery type/relation schema returned by \`schema\` or \`schema_detailed\`.

Returns the flat set of fields and enum values usable in report dimension/metric expressions and filter conditions. Call this before configuring chart, table, or metric dimensions so you know the valid field names and types.

**\`sourceMode\`**: \`current\` (default) for live entity state; \`historical\` for modification events (time-in-state data).

When multiple databases are specified, a synthetic \`Entity Database\` field is added to allow splitting results by source.

Reports are a specialized domain — call \`get_fibery_skill\` with \`skill: "reports"\` for the full report model, expression syntax, palettes, conditions, and workflow.`,
    params: [
      {
        name: 'databases',
        type: 'array',
        required: true,
        description: `List of database names in 'Space/Database' format to get the report source schema for.`,
      },
      {
        name: 'sourceMode',
        type: 'string',
        required: false,
        description: `Source mode: 'current' (default) queries live entity state; 'historical' resolves a history-timeline source for time-in-state / change-frequency analysis.`,
      },
    ],
  },
  {
    name: 'fiberymcp_display_schema_capabilities',
    description: `Returns the current user's access info per space and per database in the Fibery workspace.

Use this when explaining what the user can/cannot do, or before suggesting an action that requires specific access.

URL conventions:
- For spaces: user will see anything if they have ANY access to the space.
- For databases: user will see anything only if they have architect-level access; otherwise it will render as "No Access".

Capabilities from every source (space-level, database-level, per-entity grants, propagation from other databases) ACCUMULATE — they NEVER override. To compute the user's effective capabilities on a specific entity, take the UNION of all sources.

The response shape:
- \`accessInfo.spaces\` — map keyed by space namespace.
- \`accessInfo.databases\` — map keyed by \`Space/Database\` name.

Each entry value is one of:
- \`'no-access'\` — the user has no access.
- \`'entity-level'\` — no space/database-level grant, but the user has access to at least one entity via an entity-level access template.
- \`{level, templateId, isDefault, url}\` — standard template-based access. \`level\` is the template name with the \`app.access/\` / \`type.access/\` prefix stripped. \`isDefault: false\` indicates a custom template.
- \`'derived-per-field'\` — applies only to \`fibery/file\` and \`comments/comment\`; access is granted via per-field grants on the owning database, not at the type level.

- \`levelInfo.space\` and \`levelInfo.database\` — keyed by \`level\` (the same string as above); each value carries the template's full title, description, and capability set so the caller can explain what a level grants.`,
    params: [
      {
        name: 'spaces',
        type: 'array',
        required: false,
        description: `Optional list of space names to scope the response (e.g. ['Product', 'Sales']). Omit to receive capabilities for every space and database in the workspace.`,
      },
    ],
  },
  {
    name: 'fiberymcp_download_file',
    description: `Fetches a Fibery file attachment by secret and returns a signed download URL valid for ~60 minutes.`,
    params: [
      {
        name: 'secret',
        type: 'string',
        required: true,
        description: `File secret obtained from get_files_meta — opaque identifier returned in each file entry.`,
      },
    ],
  },
  {
    name: 'fiberymcp_fetch_by_url',
    description: `Fetches entity or view data from a Fibery URL and returns it as Markdown.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `Fibery URL to fetch data from` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of items to return for views (default: 20)`,
      },
    ],
  },
  {
    name: 'fiberymcp_fetch_view_data',
    description: `Fetches entity data from a Fibery view by executing its saved query.`,
    params: [
      {
        name: 'publicId',
        type: 'string',
        required: true,
        description: `Public ID of the view to fetch data from`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Max entities to return (default: 100)`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of entities to skip (default: 0)`,
      },
    ],
  },
  {
    name: 'fiberymcp_get_connectors_list',
    description: `Returns a list of available built-in connectors (integrations) in Fibery.`,
    params: [],
  },
  {
    name: 'fiberymcp_get_custom_apps_list',
    description: `List the workspace's custom apps the user can see.

Custom apps are small React apps embedded in Fibery views. Use the \`id\` to work on an app's source code with the custom-app development flow — call \`get_fibery_skill({skill: "custom-apps-dev"})\` for the full guide.`,
    params: [],
  },
  {
    name: 'fiberymcp_get_documents_content',
    description: `[STALE: removed upstream, replaced by read_document] Returns the Markdown content of one or more Fibery document fields identified by their secrets.`,
    params: [
      { name: 'secrets', type: 'array', required: true, description: `Secrets of documents` },
      {
        name: 'reducePrompt',
        type: 'string',
        required: false,
        description: `Controls how large documents are summarized when too long. By default: 'Summarize this document in 2-3 paragraphs max.'`,
      },
    ],
  },
  {
    name: 'fiberymcp_get_entity_links',
    description: `Generates Fibery web links for entities by their public IDs.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
      {
        name: 'entityPublicIds',
        type: 'array',
        required: true,
        description: `Array of entity public IDs (e.g., ['42', '43'])`,
      },
    ],
  },
  {
    name: 'fiberymcp_get_entity_mention',
    description: `Builds an inline entity reference for document markdown. When the document is shown, it renders as a "live" entity which has current name, with a link.

Embed the returned string into content passed to the document editing tools (\`insert_document_blocks\`, \`set_block_text\`, comment bodies). Call \`get_fibery_skill({skill: "documents"})\` for the markdown reference.

## Example
\`\`\`
{
    database: "SoftDev/Task",
    entityId: "123",
    label: "Fix login bug"
}
\`\`\``,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name in "Space/Type" format (e.g., 'Projects/Task')`,
      },
      { name: 'entityId', type: 'string', required: true, description: `Entity UUID (fibery/id)` },
      { name: 'label', type: 'string', required: true, description: `Fallback display text` },
    ],
  },
  {
    name: 'fiberymcp_get_fibery_skill',
    description: `Load the full guide for a Fibery skill domain.

Call this tool when you need the complete reference for a domain that spans multiple tools. Each skill covers the full model, expression syntax, configuration shapes, conditions, and workflow for its related tools.`,
    params: [
      {
        name: 'skill',
        type: 'string',
        required: true,
        description: `The skill domain to load. Use one of the listed enum values.`,
      },
    ],
  },
  {
    name: 'fiberymcp_get_files_meta',
    description: `Lists file attachments on one or more Fibery entities and returns their metadata.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name in 'Space/Type' format, e.g. 'SoftDev/Task'. Use \`schema\` to discover available databases.`,
      },
      {
        name: 'entityIds',
        type: 'array',
        required: true,
        description: `One or more fibery/id UUIDs of the entities whose file attachments to list.`,
      },
      {
        name: 'field',
        type: 'string',
        required: false,
        description: `Name of a specific file field to query. Omit to scan all file fields on the database. Use \`schema_detailed\` to discover available file fields.`,
      },
    ],
  },
  {
    name: 'fiberymcp_get_manual_import_link',
    description: `Generates a link to the manual import page for a Fibery connector.`,
    params: [
      {
        name: 'connectorId',
        type: 'string',
        required: true,
        description: `ID of the connector to be used (obtained from get_connectors_list)`,
      },
      {
        name: 'isSync',
        type: 'boolean',
        required: true,
        description: `Whether the data from the source will be synced continuously (true) or imported once (false)`,
      },
      {
        name: 'spaceName',
        type: 'string',
        required: true,
        description: `The name of the space to import into`,
      },
      {
        name: 'dbName',
        type: 'string',
        required: false,
        description: `The name of the existing database to import into. Leave empty to import into a new database in the space.`,
      },
    ],
  },
  {
    name: 'fiberymcp_get_me',
    description: `Returns information about the currently authenticated Fibery user.`,
    params: [],
  },
  {
    name: 'fiberymcp_get_report',
    description: `Fetch a Fibery report (vizydrop view) by its UUID, including its tabs, sources, schema, and dimension configuration.

Use \`get_reports_list\` first to discover available report IDs. The response includes \`tabId\`, \`tabType\`, and per-dimension \`id\` values needed by \`update_tab\`, \`update_dimension\`, and \`remove_dimension\`.

Reports are a specialized domain — call \`get_fibery_skill\` with \`skill: "reports"\` for the full report model, expression syntax, palettes, conditions, and workflow.`,
    params: [
      {
        name: 'reportId',
        type: 'string',
        required: true,
        description: `The UUID of the report view to fetch.`,
      },
    ],
  },
  {
    name: 'fiberymcp_get_reports_list',
    description: `List all vizydrop report views in the Fibery workspace.

Returns an array of report summaries with \`id\` and \`title\`. Use the \`id\` field with \`get_report\` to fetch full details including tab structure and dimension IDs.

Reports are a specialized domain — call \`get_fibery_skill\` with \`skill: "reports"\` for the full report model, expression syntax, palettes, conditions, and workflow.`,
    params: [],
  },
  {
    name: 'fiberymcp_get_tool_reference',
    description: `[STALE: removed upstream, replaced by get_fibery_skill] Returns extended reference documentation for a specific Fibery MCP tool.`,
    params: [
      {
        name: 'toolName',
        type: 'string',
        required: true,
        description: `The snake_case MCP tool name to look up (e.g. 'query', 'create_entities')`,
      },
    ],
  },
  {
    name: 'fiberymcp_get_user_mention',
    description: `Builds an inline user mention for document markdown, works the same as \`get_entity_mention\`, but for the \`fibery/user\` database. When the document is shown, it renders as a "live" user mention.

Embed the returned string into content passed to the document editing tools (\`insert_document_blocks\`, \`set_block_text\`, comment bodies). Get user ids via \`query\` from the \`fibery/user\` database, or your own id via \`get_me\`. Call \`get_fibery_skill({skill: "documents"})\` for the markdown reference.

## Example
\`\`\`
{
    userId: "123",
    label: "Alice"
}
\`\`\``,
    params: [
      { name: 'label', type: 'string', required: true, description: `Fallback display text` },
      {
        name: 'userId',
        type: 'string',
        required: true,
        description: `User UUID (fibery/id from the 'fibery/user' database)`,
      },
    ],
  },
  {
    name: 'fiberymcp_insert_document_blocks',
    description: `Inserts new blocks into a document from markdown.

Call \`get_fibery_skill({skill: "documents"})\` first. It covers the full markdown reference (headings, lists, tables, code, math, images/videos, callouts, highlights, entity references), content adaptation rules, and the editing workflow.
Call \`read_document\` for block ids to anchor to (not needed when inserting at the document root with \`parent: {blockId: null, ...}\`).

## Example
Append a section to the end of a document:
\`\`\`
{
    secret: "123",
    inserts: [{parent: {blockId: null, position: "end"}, content: "## Next steps\\n\\n- [ ] review\\n- [ ] deploy"}]
}
\`\`\``,
    params: [
      {
        name: 'inserts',
        type: 'array',
        required: true,
        description: `Insertions to perform. Each item must have exactly ONE anchor: after, before or parent`,
      },
      {
        name: 'secret',
        type: 'string',
        required: true,
        description: `Document secret (UUID). For entity document fields, select the field's secret via query (e.g. {Secret: ['Space/Field', 'Collaboration~Documents/secret']}). For standalone documents, use search with viewType 'document'`,
      },
    ],
  },
  {
    name: 'fiberymcp_move_document_blocks',
    description: `Moves blocks (each with all its children) to a new position in the document. 

Call \`read_document\` first to get block ids.
Call \`get_fibery_skill({skill: "documents"})\` for the block model and the editing workflow.

## Example
Move a block to the end of the document:
\`\`\`
{
    secret: "123",
    moves: [{blockId: "456", parent: {blockId: null, position: "end"}}]
}
\`\`\``,
    params: [
      {
        name: 'moves',
        type: 'array',
        required: true,
        description: `Moves to perform. Each item must have exactly ONE anchor: after, before or parent`,
      },
      {
        name: 'secret',
        type: 'string',
        required: true,
        description: `Document secret (UUID). For entity document fields, select the field's secret via query (e.g. {Secret: ['Space/Field', 'Collaboration~Documents/secret']}). For standalone documents, use search with viewType 'document'`,
      },
    ],
  },
  {
    name: 'fiberymcp_query',
    description: `Runs a structured Fibery query to select, filter, order, paginate, and aggregate data.`,
    params: [
      { name: 'query', type: 'object', required: true, description: `No description.` },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Not used anymore, left for backwards compatibility`,
      },
    ],
  },
  {
    name: 'fiberymcp_query_views',
    description: `Queries saved views in the Fibery workspace, optionally filtering by ID, public ID, name, or type.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Filter by fibery/id of the view`,
      },
      {
        name: 'publicId',
        type: 'string',
        required: false,
        description: `Filter by public ID of the view`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Text search in view name or description`,
      },
      { name: 'viewType', type: 'string', required: false, description: `Filter by view type` },
      {
        name: 'withConfig',
        type: 'boolean',
        required: false,
        description: `Specify whether to include view config (like, what database are present on this view, what fields are shown). true by default. Set to false if not filtering by id filters since there can be many views returned`,
      },
    ],
  },
  {
    name: 'fiberymcp_read_document',
    description: `Reads a single document as a flat list of addressable blocks with stable ids. Call this before any document editing tool — the returned block ids are required by all of them.

**Call \`get_fibery_skill({skill: "documents"})\` FIRST** — it covers how to find document secrets (via \`query\` or \`search\`), the snapshot anatomy, the block model, inline comments, and the whole editing workflow.

Returns a TOON-encoded snapshot: \`version\`, \`rootBlockIds\` (ordered top-level ids), \`blocks\` in document order (each with \`id\`, \`type\`, \`parentId\` — \`null\` = top level, \`attrs\`, \`content\`, \`index\`), plus a \`comments\` section when the document has inline comment threads.`,
    params: [
      {
        name: 'secret',
        type: 'string',
        required: true,
        description: `Document secret (UUID). For entity document fields, select the field's secret via query (e.g. {Secret: ['Space/Field', 'Collaboration~Documents/secret']}). For standalone documents, use search with viewType 'document'`,
      },
    ],
  },
  {
    name: 'fiberymcp_remove_collection_items',
    description: `Removes related entities from a Collection field on a Fibery entity.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
      { name: 'entityId', type: 'string', required: true, description: `fibery/id of an entity` },
      {
        name: 'field',
        type: 'string',
        required: true,
        description: `The name of the collection field`,
      },
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `An array of related entity ids to remove from the collection. Each entry must be fibery/id of the entity to add`,
      },
    ],
  },
  {
    name: 'fiberymcp_remove_dimension',
    description: `Removes a single dimension from a tab in a Fibery report.

Use \`get_report\` to find the \`tabId\`, \`tabType\`, and the dimension \`id\` (from \`result.tabs[].x[].id\`, \`.y[].id\`, \`.columns[].id\`, \`.metrics[].id\`, etc.).

**This action is irreversible** — the dimension is permanently removed from the tab's specification.

Reports are a specialized domain — call \`get_fibery_skill\` with \`skill: "reports"\` for the full report model, expression syntax, palettes, conditions, and workflow.`,
    params: [
      {
        name: 'dimensionId',
        type: 'string',
        required: true,
        description: `ID of the dimension to remove (from get_report result.tabs[].x[].id, .y[].id, .columns[].id, etc.).`,
      },
      {
        name: 'reportId',
        type: 'string',
        required: true,
        description: `UUID of the report containing the tab.`,
      },
      {
        name: 'tabId',
        type: 'string',
        required: true,
        description: `ID of the tab containing the dimension (from get_report result.tabs[].id).`,
      },
      {
        name: 'tabType',
        type: 'string',
        required: true,
        description: `Type of the tab — required so the server picks the right update command.`,
      },
    ],
  },
  {
    name: 'fiberymcp_remove_tab',
    description: `Removes a tab from an existing Fibery report.

Use \`get_report\` to find the \`tabId\` of the tab you want to remove (each tab object in \`result.tabs\` has an \`id\` field).

**This action is irreversible** — the tab and all its dimensions/conditions will be permanently deleted.

Reports are a specialized domain — call \`get_fibery_skill\` with \`skill: "reports"\` for the full report model, expression syntax, palettes, conditions, and workflow.`,
    params: [
      {
        name: 'reportId',
        type: 'string',
        required: true,
        description: `UUID of the report containing the tab.`,
      },
      {
        name: 'tabId',
        type: 'string',
        required: true,
        description: `ID of the tab to remove (from get_report result.tabs[].id).`,
      },
    ],
  },
  {
    name: 'fiberymcp_rename_databases',
    description: `Renames one or more databases, optionally moving them to a different space.`,
    params: [{ name: 'databases', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'fiberymcp_rename_fields',
    description: `Renames one or more fields within their databases.`,
    params: [{ name: 'fields', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'fiberymcp_replace_block_text',
    description: `Replaces one occurrence of exact text inside a block, leaving the rest untouched. The preferred tool for small fixes — surrounding formatting and inline comments survive.

Call \`read_document\` first to get block ids.
Call \`get_fibery_skill({skill: "documents"})\` for selector semantics, the block model, and the editing workflow.

\`exact\` is the block's plain text with marks stripped, as shown in \`read_document\` — never markdown (e.g., match by \`text\`, not by \`**text**\`). \`replacement\` is inserted literal: markdown/HTML is NOT parsed and no marks are applied, so this tool cannot add or change formatting (bold, underline, links, colors).
To change formatting on a span, rewrite the whole block with \`set_block_text\`.

## Example
\`\`\`
{
    secret: "123",
    replacements: [{blockId: "456", exact: "teh", replacement: "the"}]
}
\`\`\``,
    params: [
      {
        name: 'replacements',
        type: 'array',
        required: true,
        description: `Replacements to perform`,
      },
      {
        name: 'secret',
        type: 'string',
        required: true,
        description: `Document secret (UUID). For entity document fields, select the field's secret via query (e.g. {Secret: ['Space/Field', 'Collaboration~Documents/secret']}). For standalone documents, use search with viewType 'document'`,
      },
    ],
  },
  {
    name: 'fiberymcp_reply_document_comment',
    description: `Adds replies to existing inline comment threads in a document. The reply author is the current user.

Call \`get_fibery_skill({skill: "documents"})\` for the comment thread model.

## Example
\`\`\`
{
    secret: "123",
    replies: [{commentId: "456", content: "Done — rewrote the section above."}]
}
\`\`\``,
    params: [
      { name: 'replies', type: 'array', required: true, description: `Replies to add` },
      {
        name: 'secret',
        type: 'string',
        required: true,
        description: `Document secret (UUID). For entity document fields, select the field's secret via query (e.g. {Secret: ['Space/Field', 'Collaboration~Documents/secret']}). For standalone documents, use search with viewType 'document'`,
      },
    ],
  },
  {
    name: 'fiberymcp_schema',
    description: `Returns the high-level workspace structure showing all spaces and databases.`,
    params: [],
  },
  {
    name: 'fiberymcp_schema_detailed',
    description: `Returns detailed schema for specified databases, including fields and related databases.`,
    params: [
      {
        name: 'databases',
        type: 'array',
        required: true,
        description: `An array of database names (in "Space/Database" format).`,
      },
      {
        name: 'includeRelatedDatabases',
        type: 'boolean',
        required: false,
        description: `Whether to include related databases with their descriptions & fields. Defaults to false. Set to true if the schema is small and you want to navigate faster.`,
      },
    ],
  },
  {
    name: 'fiberymcp_search',
    description: `Searches workspace content using BM-25 keyword matching.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query string` },
      {
        name: 'database',
        type: 'string',
        required: false,
        description: `Filter results to a specific database (e.g., 'Projects/Task')`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of items to return (default: 20, max: 100)`,
      },
      {
        name: 'viewType',
        type: 'string',
        required: false,
        description: `Filter results to a specific view type`,
      },
    ],
  },
  {
    name: 'fiberymcp_search_guide',
    description: `Fetches relevant information from the Fibery User Guide based on a query.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `The query for searching` },
    ],
  },
  {
    name: 'fiberymcp_search_history',
    description: `Searches the workspace activity history and returns matching history events.`,
    params: [
      { name: 'actions', type: 'array', required: false, description: `Filter by action types` },
      {
        name: 'authorUserId',
        type: 'string',
        required: false,
        description: `Filter by author's fibery/id`,
      },
      {
        name: 'database',
        type: 'string',
        required: false,
        description: `Filter by database name (e.g., 'Projects/Task')`,
      },
      {
        name: 'entityId',
        type: 'string',
        required: false,
        description: `Filter by entity fibery/id`,
      },
      {
        name: 'entityName',
        type: 'string',
        required: false,
        description: `Filter by entity name (substring match)`,
      },
      {
        name: 'entityPublicId',
        type: 'string',
        required: false,
        description: `Filter by entity public ID (requires database to be set)`,
      },
      {
        name: 'entityState',
        type: 'array',
        required: false,
        description: `Filter by entity states`,
      },
      {
        name: 'excludeAutomaticChanges',
        type: 'string',
        required: false,
        description: `Exclude automatic changes (all excluded by default)`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of items to return (default: 50, max: 100)`,
      },
      {
        name: 'schemaChange',
        type: 'array',
        required: false,
        description: `Filter by schema change types`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Start of time range (ISO 8601). Defaults to 24 hours ago`,
      },
      {
        name: 'sinceItem',
        type: 'string',
        required: false,
        description: `Cursor for pagination — last item ID from previous result`,
      },
      {
        name: 'until',
        type: 'string',
        required: false,
        description: `End of time range (ISO 8601). Defaults to now. Difference between dates in until and since cannot be more than 12 months`,
      },
    ],
  },
  {
    name: 'fiberymcp_set_block_attrs',
    description: `Merges attributes into blocks' attrs (e.g. heading level, task state, code block language, callout icon).

Call \`read_document\` first to get block ids.
Call \`get_fibery_skill({skill: "documents"})\` for the per-block-type attrs catalog.

## Example
Turn a heading into level 3 and mark a task done:
\`\`\`
{
    secret: "123",
    blocks: [
        {blockId: "456", attrs: {level: 3}},
        {blockId: "789", attrs: {state: "DONE"}}
    ]
}
\`\`\``,
    params: [
      {
        name: 'blocks',
        type: 'array',
        required: true,
        description: `Attribute updates to perform`,
      },
      {
        name: 'secret',
        type: 'string',
        required: true,
        description: `Document secret (UUID). For entity document fields, select the field's secret via query (e.g. {Secret: ['Space/Field', 'Collaboration~Documents/secret']}). For standalone documents, use search with viewType 'document'`,
      },
    ],
  },
  {
    name: 'fiberymcp_set_block_text',
    description: `Rewrites the inline content of text blocks from markdown. Keeps each block's type, attrs and id.

Call \`read_document\` first to get block ids.
Call \`get_fibery_skill({skill: "documents"})\` for the block model, the inline markdown reference, and the editing workflow.

**Prefer \`replace_block_text\` for small fixes** — it touches only the matched text and preserves surrounding formatting and comments. Use this tool to rewrite a whole block.

Each \`content\` must resolve to a **single top-level block** — it replaces one block's inline content, it does NOT add blocks. Multi-block markdown (heading + paragraph, several paragraphs, a list, \`---\`) is rejected. To add blocks use \`insert_document_blocks\`; to change a block's type use \`set_block_attrs\`.

## Example
\`\`\`
{
    secret: "123",
    blocks: [{blockId: "456", content: "Updated **summary** of findings"}]
}
\`\`\``,
    params: [
      { name: 'blocks', type: 'array', required: true, description: `Blocks to rewrite` },
      {
        name: 'secret',
        type: 'string',
        required: true,
        description: `Document secret (UUID). For entity document fields, select the field's secret via query (e.g. {Secret: ['Space/Field', 'Collaboration~Documents/secret']}). For standalone documents, use search with viewType 'document'`,
      },
    ],
  },
  {
    name: 'fiberymcp_set_document_content',
    description: `[STALE: removed upstream, replaced by block-based document tools (set_block_text/replace_block_text/insert_document_blocks)] Sets (replaces) the content of a document field on a Fibery entity.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Document's content in MD format. It has to be full document content`,
      },
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
      { name: 'entityId', type: 'string', required: true, description: `fibery/id of an entity` },
      {
        name: 'field',
        type: 'string',
        required: true,
        description: `The name of the document field`,
      },
    ],
  },
  {
    name: 'fiberymcp_set_state',
    description: `Sets the workflow state of a Fibery entity.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
      { name: 'entityId', type: 'string', required: true, description: `fibery/id of an entity` },
      { name: 'state', type: 'string', required: true, description: `State title (enum/name)` },
    ],
  },
  {
    name: 'fiberymcp_update_dimension',
    description: `Updates an existing dimension in a report tab.

Use \`get_report\` to find the \`tabId\`, \`tabType\`, and per-dimension \`id\` values. Each dimension object in the tab's axis arrays (\`x\`, \`y\`, \`columns\`, \`metrics\`, etc.) has an \`id\` field — pass that as \`dimensionId\`.

**\`changes\`** is a partial object: only the keys you provide will be merged into the existing dimension. Omit keys you do not want to change.

To add or remove dimensions entirely, use \`remove_dimension\` or recreate the tab with the add-tab tools.

Reports are a specialized domain — call \`get_fibery_skill\` with \`skill: "reports"\` for the full report model, expression syntax, palettes, conditions, and workflow.`,
    params: [
      {
        name: 'changes',
        type: 'object',
        required: true,
        description: `Partial dimension update. Only provided keys are merged into the existing dimension.`,
      },
      {
        name: 'dimensionId',
        type: 'string',
        required: true,
        description: `ID of the dimension to update (from get_report result.tabs[].x[].id, .y[].id, .columns[].id, etc.).`,
      },
      {
        name: 'reportId',
        type: 'string',
        required: true,
        description: `UUID of the report containing the tab.`,
      },
      {
        name: 'tabId',
        type: 'string',
        required: true,
        description: `ID of the tab containing the dimension (from get_report result.tabs[].id).`,
      },
      {
        name: 'tabType',
        type: 'string',
        required: true,
        description: `Type of the tab — required so the server picks the right update command.`,
      },
    ],
  },
  {
    name: 'fiberymcp_update_entities',
    description: `Updates fields on one or more existing Fibery entities.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
      { name: 'entities', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'fiberymcp_update_formula_field',
    description: `Updates an existing formula field by regenerating its expression from a new description.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Full database name (e.g., 'SoftDev/Task')`,
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `New description of what the formula should calculate. A new formula expression will be generated from this`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the existing formula field in {Space}/{Field} format (e.g., 'SoftDev/Days Since Created')`,
      },
    ],
  },
  {
    name: 'fiberymcp_update_multi_select_fields',
    description: `Updates the options of one or more existing multi-select fields.`,
    params: [{ name: 'fields', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'fiberymcp_update_report',
    description: `Updates an existing Fibery report's title and/or sources.

**At least one of \`title\` or \`sources\` must be provided.**

Use \`get_report\` to retrieve the current report state and \`reportId\` before calling this tool.

Reports are a specialized domain — call \`get_fibery_skill\` with \`skill: "reports"\` for the full report model, expression syntax, palettes, conditions, and workflow.`,
    params: [
      {
        name: 'reportId',
        type: 'string',
        required: true,
        description: `UUID of the report to update (from get_report or get_reports_list).`,
      },
      {
        name: 'sources',
        type: 'array',
        required: false,
        description: `Replace the report's source databases; source mode is fixed at creation and cannot change here.`,
      },
      { name: 'title', type: 'string', required: false, description: `New title for the report.` },
    ],
  },
  {
    name: 'fiberymcp_update_single_select_fields',
    description: `Updates the options of one or more existing single-select fields.`,
    params: [{ name: 'fields', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'fiberymcp_update_tab',
    description: `Updates scalar properties of an existing tab in a Fibery report.

Use \`get_report\` to find the \`tabId\` and \`tabType\` of the tab to update.

**What this tool can change:** \`title\`, \`type\` / \`palette\` (chart tabs only), \`fieldConditions\` / \`dimensionConditions\` (replaces the tab's filter set entirely).

**What this tool cannot do:** Add or remove dimensions (use \`update_dimension\` / \`remove_dimension\` or recreate the tab). Change \`tabType\` (recreate the tab instead).

Reports are a specialized domain — call \`get_fibery_skill\` with \`skill: "reports"\` for the full report model, expression syntax, palettes, conditions, and workflow.`,
    params: [
      {
        name: 'reportId',
        type: 'string',
        required: true,
        description: `UUID of the report containing the tab.`,
      },
      {
        name: 'tabId',
        type: 'string',
        required: true,
        description: `ID of the tab to update (from get_report result.tabs[].id).`,
      },
      {
        name: 'tabType',
        type: 'string',
        required: true,
        description: `Type of the tab — required so the server picks the right update command.`,
      },
      {
        name: 'dimensionConditions',
        type: 'array',
        required: false,
        description: `Replace the tab's dimension-level filters entirely.`,
      },
      {
        name: 'fieldConditions',
        type: 'array',
        required: false,
        description: `Replace the tab's field-level filters entirely.`,
      },
      {
        name: 'palette',
        type: 'string',
        required: false,
        description: `Color palette. Applies to chart tabs only; ignored for table/metric.`,
      },
      { name: 'title', type: 'string', required: false, description: `New tab title.` },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Chart type. Applies to chart tabs only; ignored for table/metric.`,
      },
    ],
  },
  {
    name: 'fiberymcp_update_view',
    description: `Updates an existing Fibery view's name, description, space, content, or configuration.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `fibery/id of the view to update`,
      },
      {
        name: 'viewType',
        type: 'string',
        required: true,
        description: `grid: spreadsheet table (supports hierarchical groupBy). list: simple list (prefer grid). board: kanban grouped by relation/enum on x and optionally y. timeline: time bars with optional milestones and dependencies. calendar: date events. map: geographic plot of a location field. feed: rich-text feed of a document field. gallery: card gallery with cover images. gantt: hierarchical timeline with dependencies. form: data input form. document: standalone markdown (use the \`content\` param). report: not yet supported here.`,
      },
      {
        name: 'append',
        type: 'boolean',
        required: false,
        description: `If true, append content instead of replacing (document views only)`,
      },
      {
        name: 'config',
        type: 'object',
        required: false,
        description: `View configuration object. Shape depends on viewType — for anything beyond a basic grid/list with no filters or ordering, call get_tool_reference({toolName: 'create_view'}) first.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Markdown content (for document views)`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the view`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the view` },
      {
        name: 'space',
        type: 'string',
        required: false,
        description: `Move the view to a different space`,
      },
    ],
  },
  {
    name: 'fiberymcp_update_workflow_field',
    description: `Updates the options of an existing workflow (state) field.`,
    params: [
      { name: 'database', type: 'string', required: true, description: `Full database name` },
      {
        name: 'update',
        type: 'string',
        required: true,
        description: `Full replacement or incremental update`,
      },
      {
        name: 'defaultOption',
        type: 'string',
        required: false,
        description: `New default state name. If not provided, the default is left unchanged`,
      },
    ],
  },
]
