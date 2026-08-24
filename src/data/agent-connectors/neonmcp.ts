import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'neonmcp_compare_database_schema',
    description: `Compare the database schema between two branches to identify differences in tables, columns, and constraints.`,
    params: [
      {
        name: 'branchId',
        type: 'string',
        required: true,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'databaseName',
        type: 'string',
        required: true,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
    ],
  },
  {
    name: 'neonmcp_complete_database_migration',
    description: `Apply a database migration to the main branch and clean up the temporary migration branch.`,
    params: [
      {
        name: 'databaseName',
        type: 'string',
        required: true,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
      {
        name: 'migrationId',
        type: 'string',
        required: true,
        description: `The migration ID returned by \`prepare_database_migration\`.`,
      },
      {
        name: 'migrationSql',
        type: 'string',
        required: true,
        description: `The SQL DDL statement(s) to apply as a migration.`,
      },
      {
        name: 'parentBranchId',
        type: 'string',
        required: true,
        description: `The ID of the parent branch to apply the migration to.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'temporaryBranchId',
        type: 'string',
        required: true,
        description: `The ID of the temporary branch created during the prepare step.`,
      },
      {
        name: 'applyChanges',
        type: 'boolean',
        required: false,
        description: `Set to \`true\` to apply changes, \`false\` to discard and only clean up.`,
      },
    ],
  },
  {
    name: 'neonmcp_complete_query_tuning',
    description: `Finish a query tuning session by applying or discarding changes from the temporary tuning branch.`,
    params: [
      {
        name: 'databaseName',
        type: 'string',
        required: true,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'suggestedSqlStatements',
        type: 'array',
        required: true,
        description: `The DDL statements suggested by \`prepare_query_tuning\` (e.g. CREATE INDEX).`,
      },
      {
        name: 'temporaryBranchId',
        type: 'string',
        required: true,
        description: `The ID of the temporary branch created during the prepare step.`,
      },
      {
        name: 'tuningId',
        type: 'string',
        required: true,
        description: `The tuning ID returned by \`prepare_query_tuning\`. Not the branch ID.`,
      },
      {
        name: 'applyChanges',
        type: 'boolean',
        required: false,
        description: `Set to \`true\` to apply changes, \`false\` to discard and only clean up.`,
      },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'roleName',
        type: 'string',
        required: false,
        description: `The name of the role to connect with. If you have used a specific role in prepare_query_tuning you MUST pass the same role again to this tool. If not provided, the default role (usually "neondb_owner") will be used.`,
      },
      {
        name: 'shouldDeleteTemporaryBranch',
        type: 'boolean',
        required: false,
        description: `Set to \`true\` to delete the temporary branch after tuning. Default is \`true\`.`,
      },
    ],
  },
  {
    name: 'neonmcp_configure_neon_auth',
    description: `Configure Neon Auth settings for a branch by specifying the desired operation.`,
    params: [
      {
        name: 'branchId',
        type: 'string',
        required: true,
        description: `The ID of the branch to configure Neon Auth for.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: true,
        description: `The configuration operation to perform on Neon Auth.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'allowLocalhost',
        type: 'boolean',
        required: false,
        description: `Whether to allow localhost as a trusted origin. Used with set_allow_localhost operation.`,
      },
      {
        name: 'trusted_origin',
        type: 'string',
        required: false,
        description: `The origin URL to add or remove from trusted origins. Required for add_trusted_origin and remove_trusted_origin operations.`,
      },
    ],
  },
  {
    name: 'neonmcp_create_branch',
    description: `Create a new branch in a Neon project for isolated development or testing.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'branchName',
        type: 'string',
        required: false,
        description: `An optional name for the new branch.`,
      },
      {
        name: 'parentId',
        type: 'string',
        required: false,
        description: `An optional branch ID (e.g. 'br-...') to branch from. If omitted, the branch is created from the project's default branch. Use this to fork an existing non-default branch — for example, to make an isolated copy of a dev/staging branch for experimentation.`,
      },
    ],
  },
  {
    name: 'neonmcp_create_project',
    description: `Create a new Neon project with a default database and branch, returning the connection string.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `An optional name for the new project.`,
      },
      {
        name: 'org_id',
        type: 'string',
        required: false,
        description: `The organization ID to associate the project with.`,
      },
    ],
  },
  {
    name: 'neonmcp_delete_branch',
    description: `Permanently delete a branch and all its data from a Neon project.`,
    params: [
      {
        name: 'branchId',
        type: 'string',
        required: true,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
    ],
  },
  {
    name: 'neonmcp_delete_project',
    description: `Permanently delete a Neon project and all its branches and data.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
    ],
  },
  {
    name: 'neonmcp_describe_branch',
    description: `Get a tree view of all objects in a branch including databases, schemas, tables, views, and functions.`,
    params: [
      {
        name: 'branchId',
        type: 'string',
        required: true,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'databaseName',
        type: 'string',
        required: false,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
    ],
  },
  {
    name: 'neonmcp_describe_project',
    description: `Get details and configuration of a specific Neon project by its ID.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
    ],
  },
  {
    name: 'neonmcp_describe_table_schema',
    description: `Get column definitions, data types, and constraints for a specific table in a Neon database.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      { name: 'tableName', type: 'string', required: true, description: `The name of the table` },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'databaseName',
        type: 'string',
        required: false,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
    ],
  },
  {
    name: 'neonmcp_explain_sql_statement',
    description: `Analyze the query execution plan for a SQL statement using EXPLAIN ANALYZE.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      { name: 'sql', type: 'string', required: true, description: `The SQL statement to execute.` },
      {
        name: 'analyze',
        type: 'boolean',
        required: false,
        description: `Set to \`true\` to include ANALYZE in EXPLAIN. Default is \`true\`.`,
      },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'databaseName',
        type: 'string',
        required: false,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
    ],
  },
  {
    name: 'neonmcp_fetch',
    description: `Fetch detailed information about a specific organization, project, or branch using its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The entity ID returned by the \`search\` tool.`,
      },
    ],
  },
  {
    name: 'neonmcp_get_connection_string',
    description: `Get a PostgreSQL connection string for a Neon database, resolving project, branch, and database automatically.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'computeId',
        type: 'string',
        required: false,
        description: `The ID of the compute endpoint. Defaults to the branch's read-write compute if not provided.`,
      },
      {
        name: 'databaseName',
        type: 'string',
        required: false,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
      {
        name: 'roleName',
        type: 'string',
        required: false,
        description: `The database role to connect with. Defaults to \`neondb_owner\` if not provided.`,
      },
    ],
  },
  {
    name: 'neonmcp_get_database_tables',
    description: `List all tables in a Neon database on a specific branch.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'databaseName',
        type: 'string',
        required: false,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
    ],
  },
  {
    name: 'neonmcp_get_doc_resource',
    description: `Fetch a specific Neon documentation page as markdown content by its URL.`,
    params: [
      {
        name: 'slug',
        type: 'string',
        required: true,
        description: `The docs page slug (path) to fetch, e.g. 'docs/guides/prisma.md'. Slugs use .md file endings matching the URLs in the documentation index. Use the list_docs_resources tool first to discover available slugs.`,
      },
    ],
  },
  {
    name: 'neonmcp_get_neon_auth_config',
    description: `Read the full Neon Auth configuration for a specific branch.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
    ],
  },
  {
    name: 'neonmcp_inspect_database',
    description: `Run a predefined, read-only Postgres diagnostic check (table sizes, unused indexes, locks, bloat, etc.) against a Neon branch.`,
    params: [
      {
        name: 'check',
        type: 'string',
        required: true,
        description: `Which diagnostic to run: table-sizes, index-sizes, unused-indexes, seq-scans, long-running-queries, locks, outliers, calls, lfc-hit-rate, working-set, vacuum-stats, bloat, replication-slots, or subscriptions.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the project to inspect.`,
      },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `An optional ID of the branch. If not provided the default branch is used.`,
      },
      {
        name: 'computeId',
        type: 'string',
        required: false,
        description: `The ID of the compute/endpoint. If not provided, the read-write compute associated with the branch will be used.`,
      },
      {
        name: 'databaseName',
        type: 'string',
        required: false,
        description: `Database to inspect. Omit to cover every database on the branch.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return from the combined result (1-1000). Default is 50.`,
      },
    ],
  },
  {
    name: 'neonmcp_list_branch_computes',
    description: `List all compute endpoints for a project or branch.`,
    params: [
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `The ID of the Neon project.`,
      },
    ],
  },
  {
    name: 'neonmcp_list_docs_resources',
    description: `List all available Neon documentation pages from the Neon docs index.`,
    params: [],
  },
  {
    name: 'neonmcp_list_log_field_values',
    description: `List the distinct values of a log field (e.g. service_name or severity_text) within a branch and time window.`,
    params: [
      {
        name: 'field',
        type: 'string',
        required: true,
        description: `The log field (label) whose distinct values to list, e.g. "service_name" or "severity_text". Use list_log_fields to discover valid field names.`,
      },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Defaults to the project's default branch.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `The ID of the project. Defaults to your only project if unambiguous.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Relative lookback window as a duration (e.g. "6h", "24h"). If omitted, the server default lookback (6 hours) applies; the maximum supported window is "7d".`,
      },
    ],
  },
  {
    name: 'neonmcp_list_log_fields',
    description: `List the log fields whose values list_log_field_values can enumerate for a branch (e.g. service_name, severity_text, scope_name, entity_type).`,
    params: [
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Defaults to the project's default branch.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `The ID of the project. Defaults to your only project if unambiguous.`,
      },
    ],
  },
  {
    name: 'neonmcp_list_organizations',
    description: `List all organizations the current user belongs to, with optional name or ID filter.`,
    params: [
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter results by partial name or ID.`,
      },
    ],
  },
  {
    name: 'neonmcp_list_projects',
    description: `List Neon projects in your account with optional search and pagination.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor value from the previous response for pagination.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return (1–400). Default is 10.`,
      },
      {
        name: 'org_id',
        type: 'string',
        required: false,
        description: `The organization ID to associate the project with.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter results by partial name or ID.`,
      },
    ],
  },
  {
    name: 'neonmcp_list_shared_projects',
    description: `List projects shared with the current user for collaboration.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor value from the previous response for pagination.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return (1–400). Default is 10.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter results by partial name or ID.`,
      },
    ],
  },
  {
    name: 'neonmcp_list_slow_queries',
    description: `List slow queries from a Neon database to identify performance bottlenecks.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'computeId',
        type: 'string',
        required: false,
        description: `The ID of the compute endpoint. Defaults to the branch's read-write compute if not provided.`,
      },
      {
        name: 'databaseName',
        type: 'string',
        required: false,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return (1–400). Default is 10.`,
      },
      {
        name: 'minExecutionTime',
        type: 'number',
        required: false,
        description: `Minimum query execution time in milliseconds to flag as slow. Default is 1000 ms.`,
      },
    ],
  },
  {
    name: 'neonmcp_prepare_database_migration',
    description: `Prepare a database schema migration by generating and executing DDL statements on a temporary branch.`,
    params: [
      {
        name: 'migrationSql',
        type: 'string',
        required: true,
        description: `The SQL DDL statement(s) to apply as a migration.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'databaseName',
        type: 'string',
        required: false,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
    ],
  },
  {
    name: 'neonmcp_prepare_query_tuning',
    description: `Start a query tuning session by analyzing execution plans and suggesting optimizations on a temporary branch.`,
    params: [
      {
        name: 'databaseName',
        type: 'string',
        required: true,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      { name: 'sql', type: 'string', required: true, description: `The SQL statement to execute.` },
      {
        name: 'roleName',
        type: 'string',
        required: false,
        description: `The database role to connect with. Defaults to \`neondb_owner\` if not provided.`,
      },
    ],
  },
  {
    name: 'neonmcp_provision_neon_auth',
    description: `Provision Neon Auth for a branch, enabling managed authentication backed by Better Auth.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'databaseName',
        type: 'string',
        required: false,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
    ],
  },
  {
    name: 'neonmcp_provision_neon_data_api',
    description: `Provision the Neon Data API for HTTP-based access to a Postgres database with JWT authentication.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'databaseName',
        type: 'string',
        required: false,
        description: `The name of the database. Defaults to neondb if not provided.`,
      },
    ],
  },
  {
    name: 'neonmcp_query_logs',
    description: `Query logs emitted by Neon serverless functions and other services (structured filters or raw LogQL), correlated by trace ID and time window.`,
    params: [
      {
        name: 'bodyContains',
        type: 'string',
        required: false,
        description: `Return only logs whose rendered message contains this case-sensitive substring.`,
      },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch whose logs to query. Defaults to the project's default branch.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `Absolute end of the window, RFC3339. Ends either a relative since window or an absolute startTime window; defaults to now.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of log lines to return (1-1000, default 100). Large results are truncated server-side.`,
      },
      {
        name: 'logql',
        type: 'string',
        required: false,
        description: `Advanced: a raw LogQL expression to run instead of the structured filters above. Only stream selectors and line filters are supported. Do not combine it with structured filters.`,
      },
      {
        name: 'minSeverity',
        type: 'string',
        required: false,
        description: `Return only logs at this OTel severity level or above (trace < debug < info < warn < error < fatal). E.g. "error" returns ERROR and FATAL.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `The ID of the project whose logs to query. If omitted and you have exactly one project, that project is used.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Legacy compatibility alias for logql. Preserves the previous behavior of overriding any structured filters. Do not supply both raw fields.`,
      },
      {
        name: 'serviceName',
        type: 'string',
        required: false,
        description: `Filter to a specific OTel service name (service.name).`,
      },
      {
        name: 'severityText',
        type: 'string',
        required: false,
        description: `Filter to an exact severity text (e.g. "ERROR"). Takes precedence over minSeverity.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Relative lookback window ending at endTime, or now when omitted, as a duration (e.g. "30m", "1h", "24h"). Defaults to the last hour; the maximum supported window is "7d". Ignored when startTime is set.`,
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: `Which service produced the logs. "function" (serverless functions) is the default; "storage" and "pg_endpoint" are also available.`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `Absolute start of the window, RFC3339 (e.g. "2026-07-16T09:00:00Z"). Overrides since; the startTime/endTime window must not span more than seven days.`,
      },
      {
        name: 'traceId',
        type: 'string',
        required: false,
        description: `Correlate to a distributed trace: return only logs with this trace_id.`,
      },
    ],
  },
  {
    name: 'neonmcp_reset_from_parent',
    description: `Reset a branch to its parent branch state, discarding all changes made on the branch.`,
    params: [
      {
        name: 'branchIdOrName',
        type: 'string',
        required: true,
        description: `The ID or name of the branch to reset.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'preserveUnderName',
        type: 'string',
        required: false,
        description: `Optional name to preserve the current branch state before resetting.`,
      },
    ],
  },
  {
    name: 'neonmcp_run_sql',
    description: `Execute a single SQL statement against a Neon database and return the results.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      { name: 'sql', type: 'string', required: true, description: `The SQL statement to execute.` },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'databaseName',
        type: 'string',
        required: false,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
    ],
  },
  {
    name: 'neonmcp_run_sql_transaction',
    description: `Execute multiple SQL statements as a single transaction against a Neon database.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the Neon project.`,
      },
      {
        name: 'sqlStatements',
        type: 'array',
        required: true,
        description: `The SQL statements to execute as a single transaction.`,
      },
      {
        name: 'branchId',
        type: 'string',
        required: false,
        description: `The ID of the branch. Leave blank to use the default branch.`,
      },
      {
        name: 'databaseName',
        type: 'string',
        required: false,
        description: `The name of the database. Defaults to \`neondb\` if not provided.`,
      },
    ],
  },
  {
    name: 'neonmcp_search',
    description: `Search across all organizations, projects, and branches by keyword, returning matching items with IDs and URLs.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search keyword. Must be at least 3 characters.`,
      },
    ],
  },
]
