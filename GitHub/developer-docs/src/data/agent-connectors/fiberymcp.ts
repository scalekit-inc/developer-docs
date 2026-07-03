import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
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
    name: 'fiberymcp_append_document_content',
    description: `Appends Markdown content to the end of a document field on a Fibery entity.`,
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
    name: 'fiberymcp_get_documents_content',
    description: `Returns the Markdown content of one or more Fibery document fields identified by their secrets.`,
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
    name: 'fiberymcp_get_tool_reference',
    description: `Returns extended reference documentation for a specific Fibery MCP tool.`,
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
    name: 'fiberymcp_set_document_content',
    description: `Sets (replaces) the content of a document field on a Fibery entity.`,
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
    name: 'fiberymcp_update_single_select_fields',
    description: `Updates the options of one or more existing single-select fields.`,
    params: [{ name: 'fields', type: 'array', required: true, description: `No description.` }],
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
