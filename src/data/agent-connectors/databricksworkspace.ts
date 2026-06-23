import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'databricksworkspace_cluster_get',
    description: `Get details of a specific Databricks cluster by cluster ID.`,
    params: [
      {
        name: 'cluster_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cluster.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_cluster_start',
    description: `Start a terminated Databricks cluster by cluster ID.`,
    params: [
      {
        name: 'cluster_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cluster to start.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_cluster_terminate',
    description: `Terminate a Databricks cluster by cluster ID. The cluster will be deleted and all its associated resources released.`,
    params: [
      {
        name: 'cluster_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cluster to terminate.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_clusters_list',
    description: `List all clusters in the Databricks workspace.`,
    params: [],
  },
  {
    name: 'databricksworkspace_information_schema_columns',
    description: `List columns for a table using INFORMATION_SCHEMA.COLUMNS. Returns column name, data type, nullability, numeric precision/scale, max char length, and comment.`,
    params: [
      {
        name: 'catalog',
        type: 'string',
        required: true,
        description: `The catalog containing the table.`,
      },
      {
        name: 'schema',
        type: 'string',
        required: true,
        description: `The schema containing the table.`,
      },
      {
        name: 'table',
        type: 'string',
        required: true,
        description: `The table to list columns for.`,
      },
      {
        name: 'warehouse_id',
        type: 'string',
        required: true,
        description: `The ID of the SQL warehouse to run the query on.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_information_schema_schemata',
    description: `List all schemas within a catalog using INFORMATION_SCHEMA.SCHEMATA. Used for schema discovery during setup.`,
    params: [
      {
        name: 'catalog',
        type: 'string',
        required: true,
        description: `The catalog to list schemas from.`,
      },
      {
        name: 'warehouse_id',
        type: 'string',
        required: true,
        description: `The ID of the SQL warehouse to run the query on.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_information_schema_table_constraints',
    description: `List PRIMARY KEY and FOREIGN KEY constraints for tables in a schema using INFORMATION_SCHEMA.TABLE_CONSTRAINTS. Used to auto-detect join keys.`,
    params: [
      {
        name: 'catalog',
        type: 'string',
        required: true,
        description: `The catalog containing the schema.`,
      },
      {
        name: 'schema',
        type: 'string',
        required: true,
        description: `The schema to list constraints from.`,
      },
      {
        name: 'warehouse_id',
        type: 'string',
        required: true,
        description: `The ID of the SQL warehouse to run the query on.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_information_schema_tables',
    description: `List tables and views in a schema using INFORMATION_SCHEMA.TABLES. Returns table name, type (MANAGED, EXTERNAL, VIEW, etc.), and comment for schema discovery.`,
    params: [
      {
        name: 'catalog',
        type: 'string',
        required: true,
        description: `The catalog to query INFORMATION_SCHEMA from.`,
      },
      {
        name: 'schema',
        type: 'string',
        required: true,
        description: `The schema to list tables from.`,
      },
      {
        name: 'warehouse_id',
        type: 'string',
        required: true,
        description: `The ID of the SQL warehouse to run the query on.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_job_get',
    description: `Get details of a specific Databricks job by job ID.`,
    params: [
      {
        name: 'job_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the job.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_job_run_now',
    description: `Trigger an immediate run of a Databricks job by job ID.`,
    params: [
      {
        name: 'job_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the job to run.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_job_runs_list',
    description: `List all job runs in the Databricks workspace, optionally filtered by job ID.`,
    params: [
      {
        name: 'job_id',
        type: 'integer',
        required: false,
        description: `Filter runs by a specific job ID. If omitted, returns runs for all jobs.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of runs to return. Defaults to 20. Maximum is 1000.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `The offset of the first run to return.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_jobs_list',
    description: `List all jobs in the Databricks workspace.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of jobs to return. Defaults to 20. Maximum is 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `The offset of the first job to return.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_scim_me_get',
    description: `Retrieve information about the currently authenticated service principal in the Databricks workspace.`,
    params: [],
  },
  {
    name: 'databricksworkspace_scim_users_list',
    description: `List all users in the Databricks workspace using the SCIM v2 API.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `SCIM filter expression to narrow results (e.g. userName eq "user@example.com").`,
      },
      {
        name: 'startIndex',
        type: 'integer',
        required: false,
        description: `1-based index of the first result to return. Used for pagination.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_secrets_scopes_list',
    description: `List all secret scopes available in the Databricks workspace.`,
    params: [],
  },
  {
    name: 'databricksworkspace_sql_statement_cancel',
    description: `Cancel a running SQL statement by its statement ID.`,
    params: [
      {
        name: 'statement_id',
        type: 'string',
        required: true,
        description: `The ID of the SQL statement to cancel.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_sql_statement_execute',
    description: `Execute a SQL statement on a Databricks SQL warehouse and return the results.`,
    params: [
      {
        name: 'statement',
        type: 'string',
        required: true,
        description: `The SQL statement to execute.`,
      },
      {
        name: 'warehouse_id',
        type: 'string',
        required: true,
        description: `The ID of the SQL warehouse to execute the statement on.`,
      },
      {
        name: 'catalog',
        type: 'string',
        required: false,
        description: `The catalog to use for the statement execution.`,
      },
      {
        name: 'schema',
        type: 'string',
        required: false,
        description: `The schema to use for the statement execution.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_sql_statement_get',
    description: `Get the status and results of a previously executed SQL statement by its statement ID.`,
    params: [
      {
        name: 'statement_id',
        type: 'string',
        required: true,
        description: `The ID of the SQL statement to retrieve.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_sql_statement_result_chunk_get',
    description: `Fetch a specific result chunk for a paginated SQL statement result. Use when a statement result has multiple chunks (large result sets).`,
    params: [
      {
        name: 'chunk_index',
        type: 'integer',
        required: true,
        description: `The index of the result chunk to fetch (0-based).`,
      },
      {
        name: 'statement_id',
        type: 'string',
        required: true,
        description: `The ID of the SQL statement.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_sql_warehouse_get',
    description: `Get details of a specific Databricks SQL warehouse by its ID.`,
    params: [
      {
        name: 'warehouse_id',
        type: 'string',
        required: true,
        description: `The ID of the SQL warehouse to retrieve.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_sql_warehouse_start',
    description: `Start a stopped Databricks SQL warehouse by its ID.`,
    params: [
      {
        name: 'warehouse_id',
        type: 'string',
        required: true,
        description: `The ID of the SQL warehouse to start.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_sql_warehouse_stop',
    description: `Stop a running Databricks SQL warehouse by its ID.`,
    params: [
      {
        name: 'warehouse_id',
        type: 'string',
        required: true,
        description: `The ID of the SQL warehouse to stop.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_sql_warehouses_list',
    description: `List all SQL warehouses available in the Databricks workspace.`,
    params: [],
  },
  {
    name: 'databricksworkspace_unity_catalog_catalogs_list',
    description: `List all Unity Catalogs accessible to the service principal in the Databricks workspace.`,
    params: [],
  },
  {
    name: 'databricksworkspace_unity_catalog_schemas_list',
    description: `List all schemas within a Unity Catalog in the Databricks workspace.`,
    params: [
      {
        name: 'catalog_name',
        type: 'string',
        required: true,
        description: `The name of the catalog to list schemas from.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_unity_catalog_tables_list',
    description: `List all tables and views within a schema in a Unity Catalog in the Databricks workspace.`,
    params: [
      {
        name: 'catalog_name',
        type: 'string',
        required: true,
        description: `The name of the catalog containing the schema.`,
      },
      {
        name: 'schema_name',
        type: 'string',
        required: true,
        description: `The name of the schema to list tables from.`,
      },
    ],
  },
]
