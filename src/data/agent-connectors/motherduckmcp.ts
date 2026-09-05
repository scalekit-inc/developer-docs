import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'motherduckmcp_ask_docs_question',
    description: `Query official DuckDB and MotherDuck documentation to answer questions about SQL syntax, features, and best practices.`,
    params: [
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `Question about DuckDB or MotherDuck.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_cancel_flight_run',
    description: `Cancel an in-progress Flight run. Returns an error if the run is already in a terminal state.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Flight identifier (UUID).` },
      {
        name: 'run_number',
        type: 'integer',
        required: true,
        description: `Sequential run number to cancel, as returned by list_flight_runs.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_create_flight',
    description: `Create a new Flight — a Python entrypoint with optional dependencies that executes on MotherDuck compute. Supports optional cron scheduling.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Identifier for the Flight.` },
      {
        name: 'source_code',
        type: 'string',
        required: true,
        description: `Python program code for the Flight entrypoint. Should end with: if __name__ == "__main__": main()`,
      },
      {
        name: 'config',
        type: 'object',
        required: false,
        description: `Non-secret environment variable key-value pairs to pass to the Flight at runtime.`,
      },
      {
        name: 'md_secret_names',
        type: 'array',
        required: false,
        description: `Secret names to surface as environment variables inside the Flight execution context.`,
      },
      {
        name: 'md_token_name',
        type: 'string',
        required: false,
        description: `MotherDuck access token label; uses the default token if omitted.`,
      },
      {
        name: 'requirements_txt',
        type: 'string',
        required: false,
        description: `Pinned package dependencies in requirements.txt format, one package per line.`,
      },
      {
        name: 'schedule_cron',
        type: 'string',
        required: false,
        description: `UTC 5-field cron expression for automatic scheduling (e.g. '0 9 * * 1' for Mondays at 9am UTC).`,
      },
    ],
  },
  {
    name: 'motherduckmcp_create_guide',
    description: `Create a new guide — a markdown document that agents read to answer this org's data questions correctly (metric definitions, join/filter conventions, pitfalls). Group related guides with a lowercase kebab-case topic (e.g. 'revenue-billing' or 'core/metrics'); omit it for a guide without a topic. Visibility is controlled by access: 'user' (private, default) or 'organization' (org-wide, permission-gated). Attach references to the 1-5 objects the guide is authoritative about.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `The full markdown body.` },
      { name: 'title', type: 'string', required: true, description: `Human-readable title.` },
      {
        name: 'access',
        type: 'string',
        required: false,
        description: `'user' (private, default) or 'organization' (org-wide, permission-gated).`,
      },
      {
        name: 'change_comment',
        type: 'string',
        required: false,
        description: `Optional note describing this initial version.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Short one-line summary shown in the index.`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `Optional caller-provided id for this version (e.g. a git SHA).`,
      },
      {
        name: 'references',
        type: 'array',
        required: false,
        description: `Structured references to the objects this guide explains.`,
      },
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `Slash-separated grouping label, e.g. 'revenue-billing' or 'core/metrics' (no leading/trailing slash). Omit for no topic.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_delete_dive',
    description: `Permanently remove a Dive from the MotherDuck workspace. This action cannot be undone.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Dive to delete.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_delete_flight',
    description: `Permanently delete a Flight, its versions, schedule, and run history. This action cannot be undone.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Flight identifier (UUID) of the Flight to permanently delete.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_delete_guide',
    description: `Soft-delete a guide while preserving its version history. Identify it by uuid.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The guide's UUID, as returned by list_guides or a previous mutation.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_dive_query',
    description: `Execute a read-only DuckDB SQL query on behalf of a Dive, attributed to the specified Dive UUID. Used by the Dive viewer for query execution.`,
    params: [
      {
        name: 'sql',
        type: 'string',
        required: true,
        description: `Read-only DuckDB SQL query to execute.`,
      },
      { name: 'database', type: 'string', required: false, description: `Database name to query.` },
      {
        name: 'dive_id',
        type: 'string',
        required: false,
        description: `Dive UUID for query attribution.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_edit_dive_content',
    description: `Edit a Dive's content by applying one or more text replacements and saving to MotherDuck. Reads current content, applies edits in sequence, validates, and persists. No prior read_dive call is needed.`,
    params: [
      {
        name: 'edits',
        type: 'array',
        required: true,
        description: `List of edits to apply in sequence. Each edit specifies old_string, new_string, and optional replace_all flag.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) of the Dive to edit.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_edit_flight_source',
    description: `Edit a Flight's source code through one or more find-and-replace operations, producing a new FlightVersion. Applies edits sequentially and validates the result.`,
    params: [
      {
        name: 'edits',
        type: 'array',
        required: true,
        description: `List of find-and-replace edit operations to apply sequentially to the Flight source code.`,
      },
      { name: 'id', type: 'string', required: true, description: `Flight identifier (UUID).` },
    ],
  },
  {
    name: 'motherduckmcp_edit_guide_content',
    description: `Edit a guide's markdown body by applying one or more text replacements, then save as a new version. Identify the guide by uuid. Reads the stored guide, applies edits in sequence, and persists. old_string must be unique unless replace_all is true. No prior get_guide call is needed.`,
    params: [
      {
        name: 'edits',
        type: 'array',
        required: true,
        description: `List of edits to apply in sequence. Each edit has old_string, new_string, and optional replace_all.`,
      },
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The guide's UUID, as returned by list_guides or a previous mutation.`,
      },
      {
        name: 'change_comment',
        type: 'string',
        required: false,
        description: `Optional note describing this version's change.`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `Optional caller-provided id for this version (e.g. a git SHA).`,
      },
    ],
  },
  {
    name: 'motherduckmcp_get_dive_guide',
    description: `Retrieve comprehensive instructions for creating MotherDuck Dives (interactive React data apps), tailored to the calling AI client.`,
    params: [
      {
        name: 'client',
        type: 'string',
        required: true,
        description: `AI platform making the request.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_get_flight',
    description: `Fetch a Flight's metadata and version snapshot by UUID, including source code, requirements, config, secret names, and token name.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Flight identifier.` },
      {
        name: 'version',
        type: 'integer',
        required: false,
        description: `1-indexed version number; omit for current version.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_get_flight_guide',
    description: `Retrieve the authoritative guide for working with MotherDuck Flights (anatomy, config vs. secrets, scheduling, run lifecycle, common failures). Call this first before using other Flight tools.`,
    params: [],
  },
  {
    name: 'motherduckmcp_get_flight_logs',
    description: `Fetch the plain-text logs (stdout + stderr) of a Flight run plus the matching Run record (status, exit_code, timing). Logs may be large; pass max_bytes to cap the response size — the response will be the tail when truncated.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Flight identifier (UUID).` },
      {
        name: 'run_number',
        type: 'integer',
        required: true,
        description: `Sequential run number, as returned by list_flight_runs.`,
      },
      {
        name: 'max_bytes',
        type: 'integer',
        required: false,
        description: `Optional max bytes of logs to return; the response is truncated to fit and the truncation is reported via truncated: true.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_get_guide',
    description: `Load a guide by uuid. Guides are curated markdown documents about this organization's data (metric definitions, conventions, pitfalls). Find a guide's uuid with list_guides or via get_query_guide, get_dive_guide, or get_flight_guide.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The guide's UUID, as returned by list_guides or a previous mutation.`,
      },
      {
        name: 'version',
        type: 'integer',
        required: false,
        description: `Version number to read; defaults to the current version.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_get_query_guide',
    description: `Call this before writing SQL to answer a data question. Returns this organization's query guidance: what guides exist (curated markdown documents about the data), how to navigate them, and an overview of the available guide topics.`,
    params: [],
  },
  {
    name: 'motherduckmcp_get_short_lived_token',
    description: `Returns a short-lived token and connection details for the MotherDuck database endpoint. Use this to obtain temporary credentials for direct database access.`,
    params: [],
  },
  {
    name: 'motherduckmcp_list_columns',
    description: `List all columns of a table or view with data types, nullability, and comments.`,
    params: [
      {
        name: 'table',
        type: 'string',
        required: true,
        description: `Table or view name. Accepts simple or fully qualified names (e.g. analytics.main.customers).`,
      },
      {
        name: 'database',
        type: 'string',
        required: false,
        description: `Database name; defaults to current database.`,
      },
      {
        name: 'schema',
        type: 'string',
        required: false,
        description: `Schema name; defaults to current schema (main).`,
      },
    ],
  },
  {
    name: 'motherduckmcp_list_databases',
    description: `Retrieve all databases accessible to the MotherDuck account, including owned databases and attached shared databases.`,
    params: [],
  },
  {
    name: 'motherduckmcp_list_dives',
    description: `Return all Dives owned in the MotherDuck workspace, including metadata like version history and timestamps. Optionally filter by keywords.`,
    params: [
      {
        name: 'keywords',
        type: 'string',
        required: false,
        description: `Keywords to filter by title/description (case-insensitive, all words must match).`,
      },
    ],
  },
  {
    name: 'motherduckmcp_list_flight_runs',
    description: `Retrieve the execution history of a Flight (newest first), including run number, status, timing, and effective config.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Flight identifier (UUID).` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (default 100, max 500).`,
      },
    ],
  },
  {
    name: 'motherduckmcp_list_flight_versions',
    description: `Retrieve the complete version history of a Flight (newest first), enabling change tracking between versions.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Flight identifier (UUID).` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (default 100, max 500).`,
      },
    ],
  },
  {
    name: 'motherduckmcp_list_flights',
    description: `List all Flights owned by the caller with summary metadata (UUID, name, schedule, status, current version). Optionally filter by keyword.`,
    params: [
      {
        name: 'keywords',
        type: 'string',
        required: false,
        description: `Filter Flights by name (case-insensitive, all words must match).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (default 100, max 500).`,
      },
    ],
  },
  {
    name: 'motherduckmcp_list_guides',
    description: `Browse this organization's curated guides — markdown documents that capture organization and personal context about the data in MotherDuck. Called with no arguments, lists the root level: guides without topics plus every topic (folder) with its guide count. Pass topic to open a folder. Read a guide in full with get_guide(uuid).`,
    params: [
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `Open this folder, e.g. 'revenue-billing' or 'core/metrics' (no leading/trailing slash). Omit for the root level.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_list_macros',
    description: `List all macros (table and scalar macros) in a MotherDuck database, with their schema and parameters. Optionally filter by schema or keywords.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Database name to list macros from.`,
      },
      {
        name: 'keywords',
        type: 'string',
        required: false,
        description: `Optional keywords to filter macros by name (case-insensitive, any word can match).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results to return (default: 100).`,
      },
      {
        name: 'schema',
        type: 'string',
        required: false,
        description: `Schema name (optional, defaults to all schemas).`,
      },
    ],
  },
  {
    name: 'motherduckmcp_list_shares',
    description: `Retrieve all database shares that have been shared with the user by other MotherDuck users. Each share includes a name and URL for attaching via the ATTACH command.`,
    params: [],
  },
  {
    name: 'motherduckmcp_list_tables',
    description: `List all tables and views in a MotherDuck database, including schema, type (table or view), and any comments.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Database name to list tables from.`,
      },
      {
        name: 'schema',
        type: 'string',
        required: false,
        description: `Schema filter; omitting returns tables from all schemas.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_list_views',
    description: `List all views in a MotherDuck database, with their schema, comment, and column count. Optionally filter by schema or keywords.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Database name to list views from.`,
      },
      {
        name: 'keywords',
        type: 'string',
        required: false,
        description: `Optional keywords to filter views by name or comment (case-insensitive, any word can match).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results to return (default: 100).`,
      },
      {
        name: 'schema',
        type: 'string',
        required: false,
        description: `Schema name (optional, defaults to all schemas).`,
      },
    ],
  },
  {
    name: 'motherduckmcp_log_dive_viewer_event',
    description: `Log a Dive viewer analytics event (e.g. render, query, mode change) to MotherDuck. Used by the Dive viewer for telemetry.`,
    params: [
      {
        name: 'event_name',
        type: 'string',
        required: true,
        description: `Name of the analytics event to log.`,
      },
      {
        name: 'app_name',
        type: 'string',
        required: false,
        description: `Name of the MCP app logging the event.`,
      },
      {
        name: 'app_version',
        type: 'string',
        required: false,
        description: `Version of the MCP app.`,
      },
      {
        name: 'dive_id',
        type: 'string',
        required: false,
        description: `UUID of the Dive associated with this event.`,
      },
      {
        name: 'duration_ms',
        type: 'number',
        required: false,
        description: `Duration of the operation in milliseconds.`,
      },
      {
        name: 'error_message',
        type: 'string',
        required: false,
        description: `Error message if the operation failed.`,
      },
      {
        name: 'from_mode',
        type: 'string',
        required: false,
        description: `Previous display mode before the transition.`,
      },
      {
        name: 'row_count',
        type: 'number',
        required: false,
        description: `Number of rows returned by a query.`,
      },
      {
        name: 'sql_preview',
        type: 'string',
        required: false,
        description: `Truncated SQL query text (first 200 chars) for logging.`,
      },
      {
        name: 'stage',
        type: 'string',
        required: false,
        description: `Processing stage for the event (e.g. compile, execute, database_validation).`,
      },
      {
        name: 'success',
        type: 'boolean',
        required: false,
        description: `Whether the operation succeeded.`,
      },
      {
        name: 'to_mode',
        type: 'string',
        required: false,
        description: `New display mode after the transition.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_mint_dive_state_reference',
    description: `Store a Dive UI state bag server-side and return its reference ID. Used when the inline-encoded state would exceed URL length limits. The returned ID is encoded into the Dive URL hash for retrieval on open.`,
    params: [
      {
        name: 'dive_id',
        type: 'string',
        required: true,
        description: `UUID of the Dive the state bag belongs to.`,
      },
      {
        name: 'state',
        type: 'object',
        required: true,
        description: `Full useDiveState snapshot to store. Each key matches a useDiveState(key) call inside the Dive. Must JSON-serialize to <= 64 KB.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_query',
    description: `Execute read-only SQL queries against MotherDuck databases using DuckDB SQL syntax. Cross-database queries are supported via fully qualified names. Results are capped at 2,048 rows and 50,000 characters. Timeout is 55 seconds.`,
    params: [
      { name: 'database', type: 'string', required: true, description: `Database name to query.` },
      {
        name: 'sql',
        type: 'string',
        required: true,
        description: `DuckDB SQL statement (read-only; mutation statements are rejected).`,
      },
    ],
  },
  {
    name: 'motherduckmcp_query_rw',
    description: `Execute SQL statements that can read or modify data and schema in MotherDuck databases using DuckDB SQL syntax. Supports DDL and DML operations. Results are capped at 2,048 rows and 50,000 characters. Timeout is 55 seconds.`,
    params: [
      {
        name: 'sql',
        type: 'string',
        required: true,
        description: `DuckDB SQL statement (read or write).`,
      },
      {
        name: 'database',
        type: 'string',
        required: false,
        description: `Database name to target. Required when targeting database objects; optional for account-level operations.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_read_dive',
    description: `Retrieve a Dive's complete details including title, description, timestamps, and full React component source code.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Unique identifier of the Dive.` },
      {
        name: 'version',
        type: 'number',
        required: false,
        description: `Version number to retrieve (1-indexed); defaults to latest.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_run_flight',
    description: `Trigger an asynchronous execution of a Flight using its current version. Returns a Run record immediately in PENDING or RUNNING state.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Flight identifier (UUID) to trigger an execution for.`,
      },
      {
        name: 'config',
        type: 'object',
        required: false,
        description: `Key-value pairs to override stored config for this execution only. Does not persist to the Flight definition.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_save_dive',
    description: `Create a new Dive in the MotherDuck workspace. Validates JSX/React component code and analyzes database dependencies.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `JSX/React component code.` },
      { name: 'title', type: 'string', required: true, description: `Name of the Dive.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Brief explanation of the Dive.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_search_catalog',
    description: `Fuzzy search across the MotherDuck catalog (databases, schemas, tables, columns, shares) using Jaro-Winkler similarity scoring. Results are ranked by relevance.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search term; supports partial matching, underscores, dots.`,
      },
      {
        name: 'object_types',
        type: 'array',
        required: false,
        description: `Filter to specific object types. If omitted, searches all types.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_set_guide_access',
    description: `Set a guide's visibility to 'user' (private to the owner) or 'organization' (visible to the whole org). Identify it by uuid. Org-wide scoping is permission-gated.`,
    params: [
      {
        name: 'access',
        type: 'string',
        required: true,
        description: `'user' (private) or 'organization' (org-wide, permission-gated).`,
      },
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The guide's UUID, as returned by list_guides or a previous mutation.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_share_dive_data',
    description: `Make a Dive's underlying data accessible to your organization by creating org-scoped shares for owned databases referenced by the Dive's SQL queries.`,
    params: [
      {
        name: 'diveId',
        type: 'string',
        required: true,
        description: `Unique identifier of the Dive.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_update_dive',
    description: `Update an existing Dive's title, description, or content. At least one optional field must be provided.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Dive to update.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `New JSX/React component code.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the Dive.`,
      },
      { name: 'title', type: 'string', required: false, description: `New title for the Dive.` },
    ],
  },
  {
    name: 'motherduckmcp_update_flight',
    description: `Update a Flight's source code, dependencies, config, authentication tokens, secrets, name, or schedule. Omitted fields remain unchanged. Code/dependency/config/secret changes create a new FlightVersion.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Flight identifier (UUID).` },
      {
        name: 'config',
        type: 'object',
        required: false,
        description: `Full replacement config map of non-secret environment variable key-value pairs. Providing this field creates a new FlightVersion.`,
      },
      {
        name: 'md_secret_names',
        type: 'array',
        required: false,
        description: `Replacement list of secret names to surface as environment variables. Providing this field creates a new FlightVersion.`,
      },
      {
        name: 'md_token_name',
        type: 'string',
        required: false,
        description: `MotherDuck token label for authentication. Providing this field creates a new FlightVersion.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name for the Flight (metadata-only change, does not create a new FlightVersion).`,
      },
      {
        name: 'requirements_txt',
        type: 'string',
        required: false,
        description: `Package dependencies in requirements.txt format. Providing this field creates a new FlightVersion.`,
      },
      {
        name: 'schedule_cron',
        type: 'string',
        required: false,
        description: `5-field cron expression in UTC. Pass an empty string to clear the existing schedule.`,
      },
      {
        name: 'source_code',
        type: 'string',
        required: false,
        description: `Python entrypoint code. Providing this field creates a new FlightVersion.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_update_guide',
    description: `Append a new version to an existing guide, identified by uuid. Omit content to keep the current text and just change metadata such as references. A supplied references list replaces the existing one (pass [] to clear them, omit to carry them forward). For small in-place edits use edit_guide_content. Use create_guide to make a new guide, update_guide_metadata to retitle or re-topic.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The guide's UUID, as returned by list_guides or a previous mutation.`,
      },
      {
        name: 'change_comment',
        type: 'string',
        required: false,
        description: `Optional note describing this version's change.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `New full markdown body. Omit to carry the current version's content forward.`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `Optional caller-provided id for this version (e.g. a git SHA).`,
      },
      {
        name: 'references',
        type: 'array',
        required: false,
        description: `Replaces the guide's references. Pass [] to clear; omit to carry them forward.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_update_guide_metadata',
    description: `Change a guide's title, description, or topic without appending a content version. Identify it by uuid. Pass an empty description to clear it; pass an empty topic to remove the topic.`,
    params: [
      {
        name: 'uuid',
        type: 'string',
        required: true,
        description: `The guide's UUID, as returned by list_guides or a previous mutation.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New one-line summary. Pass an empty string to clear it.`,
      },
      { name: 'title', type: 'string', required: false, description: `New title.` },
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `New grouping label, e.g. 'revenue-billing' or 'core/metrics' (no leading/trailing slash). Pass an empty string to remove the topic.`,
      },
    ],
  },
  {
    name: 'motherduckmcp_view_dive',
    description: `Render a MotherDuck Dive as a live, interactive MCP app inside the host client.`,
    params: [
      {
        name: 'dive_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Dive to render.`,
      },
      {
        name: 'initial_state',
        type: 'object',
        required: false,
        description: `Seeds the Dive's UI state; keys match useDiveState hook calls; values must be JSON-serializable.`,
      },
      {
        name: 'required_resources',
        type: 'array',
        required: false,
        description: `Override declared databases for this render. Each entry must have a url and an optional alias.`,
      },
    ],
  },
]
