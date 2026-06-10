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
