import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'databricksworkspace_cluster_create',
    description: `Create and start a new Databricks compute cluster. Specify either a fixed number of workers or an autoscaling range.`,
    params: [
      {
        name: 'cluster_name',
        type: 'string',
        required: true,
        description: `Display name for the new cluster`,
      },
      {
        name: 'node_type_id',
        type: 'string',
        required: true,
        description: `The instance type for driver and worker nodes`,
      },
      {
        name: 'spark_version',
        type: 'string',
        required: true,
        description: `The Databricks Runtime version to use for the cluster`,
      },
      {
        name: 'autotermination_minutes',
        type: 'integer',
        required: false,
        description: `Automatically terminate the cluster after this many minutes of inactivity. Set to 0 to disable.`,
      },
      {
        name: 'max_workers',
        type: 'integer',
        required: false,
        description: `Maximum number of workers when autoscaling. Provide with min_workers instead of num_workers.`,
      },
      {
        name: 'min_workers',
        type: 'integer',
        required: false,
        description: `Minimum number of workers when autoscaling. Provide with max_workers instead of num_workers.`,
      },
      {
        name: 'num_workers',
        type: 'integer',
        required: false,
        description: `Fixed number of worker nodes. Omit and use min_workers/max_workers instead to enable autoscaling.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_cluster_edit',
    description: `Edit the configuration of an existing Databricks cluster. The cluster must be running or terminated; this replaces its full configuration, so include every field you want to keep, not just the ones you're changing.`,
    params: [
      {
        name: 'cluster_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cluster to edit.`,
      },
      {
        name: 'cluster_name',
        type: 'string',
        required: true,
        description: `Display name for the cluster`,
      },
      {
        name: 'node_type_id',
        type: 'string',
        required: true,
        description: `The instance type for driver and worker nodes`,
      },
      {
        name: 'spark_version',
        type: 'string',
        required: true,
        description: `The Databricks Runtime version to use for the cluster`,
      },
      {
        name: 'autotermination_minutes',
        type: 'integer',
        required: false,
        description: `Automatically terminate the cluster after this many minutes of inactivity. Set to 0 to disable.`,
      },
      {
        name: 'max_workers',
        type: 'integer',
        required: false,
        description: `Maximum number of workers when autoscaling. Provide with min_workers instead of num_workers.`,
      },
      {
        name: 'min_workers',
        type: 'integer',
        required: false,
        description: `Minimum number of workers when autoscaling. Provide with max_workers instead of num_workers.`,
      },
      {
        name: 'num_workers',
        type: 'integer',
        required: false,
        description: `Fixed number of worker nodes. Omit and use min_workers/max_workers instead to enable autoscaling.`,
      },
    ],
  },
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
    name: 'databricksworkspace_cluster_permanent_delete',
    description: `Permanently delete a Databricks cluster by cluster ID. Unlike terminating a cluster, this removes it entirely and it can no longer be started or listed. This action is irreversible.`,
    params: [
      {
        name: 'cluster_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cluster to permanently delete.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_cluster_resize',
    description: `Resize a running Databricks cluster by setting a fixed worker count or an autoscaling range.`,
    params: [
      {
        name: 'cluster_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cluster to resize.`,
      },
      {
        name: 'max_workers',
        type: 'integer',
        required: false,
        description: `Maximum number of workers when autoscaling. Provide with min_workers instead of num_workers.`,
      },
      {
        name: 'min_workers',
        type: 'integer',
        required: false,
        description: `Minimum number of workers when autoscaling. Provide with max_workers instead of num_workers.`,
      },
      {
        name: 'num_workers',
        type: 'integer',
        required: false,
        description: `Fixed number of worker nodes. Omit and use min_workers/max_workers instead to enable autoscaling.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_cluster_restart',
    description: `Restart a running Databricks cluster by cluster ID. Useful for clearing cached state or applying updated init scripts.`,
    params: [
      {
        name: 'cluster_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cluster to restart.`,
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
    name: 'databricksworkspace_dbfs_delete',
    description: `Permanently delete a file or directory from the Databricks File System (DBFS). This action is irreversible.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The DBFS path of the file or directory to delete.`,
      },
      {
        name: 'recursive',
        type: 'boolean',
        required: false,
        description: `Whether to recursively delete a directory and its contents`,
      },
    ],
  },
  {
    name: 'databricksworkspace_dbfs_list',
    description: `List the contents of a directory on the Databricks File System (DBFS).`,
    params: [
      { name: 'path', type: 'string', required: true, description: `The DBFS path to list.` },
    ],
  },
  {
    name: 'databricksworkspace_dbfs_put',
    description: `Write a small file (up to 2 MB) to the Databricks File System (DBFS) in a single call, creating any needed parent directories. For larger files, use the streaming create/add-block/close APIs instead.`,
    params: [
      {
        name: 'contents_base64',
        type: 'string',
        required: true,
        description: `Base64-encoded file contents to write. Maximum 2 MB after encoding.`,
      },
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The DBFS path to write the file to.`,
      },
      {
        name: 'overwrite',
        type: 'boolean',
        required: false,
        description: `Whether to overwrite an existing file at the destination path`,
      },
    ],
  },
  {
    name: 'databricksworkspace_dbfs_read',
    description: `Read up to 1 MB of a file's contents from the Databricks File System (DBFS). The response returns the content base64-encoded. Use offset and length to page through larger files.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The DBFS path of the file to read.`,
      },
      {
        name: 'length',
        type: 'integer',
        required: false,
        description: `Number of bytes to read, starting at offset. Maximum is 1,048,576 (1 MB).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Byte offset to start reading from.`,
      },
    ],
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
    name: 'databricksworkspace_job_create',
    description: `Create a new Databricks job definition made up of one or more tasks.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Display name for the new job` },
      {
        name: 'tasks',
        type: 'array',
        required: true,
        description: `Array of task definitions that make up the job. Each task needs a unique task_key plus one task type (notebook_task, spark_jar_task, python_wheel_task, sql_task, etc.) and either existing_cluster_id or new_cluster.`,
      },
      {
        name: 'job_clusters',
        type: 'array',
        required: false,
        description: `Shared cluster definitions that tasks can reference by job_cluster_key instead of using existing_cluster_id or new_cluster per task`,
      },
      {
        name: 'max_concurrent_runs',
        type: 'integer',
        required: false,
        description: `Maximum number of concurrent runs allowed for this job`,
      },
      {
        name: 'tags',
        type: 'object',
        required: false,
        description: `Key-value tags attached to the job`,
      },
      {
        name: 'timeout_seconds',
        type: 'integer',
        required: false,
        description: `Timeout applied to each run of this job`,
      },
    ],
  },
  {
    name: 'databricksworkspace_job_delete',
    description: `Delete a Databricks job by job ID. Active runs are not stopped; the job is removed once its runs finish.`,
    params: [
      {
        name: 'job_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the job to delete.`,
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
    name: 'databricksworkspace_job_run_get',
    description: `Retrieve the metadata and status of a single Databricks job run, including its state, start/end times, and task results. Complements databricksworkspace_job_runs_list, which only lists summaries.`,
    params: [
      {
        name: 'run_id',
        type: 'string',
        required: true,
        description: `The ID of the job run to retrieve.`,
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
    name: 'databricksworkspace_permissions_get',
    description: `Retrieve the access control list (permissions) for a Databricks object such as a cluster, job, notebook, or SQL warehouse.`,
    params: [
      {
        name: 'request_object_id',
        type: 'string',
        required: true,
        description: `The ID of the object to retrieve permissions for.`,
      },
      {
        name: 'request_object_type',
        type: 'string',
        required: true,
        description: `The type of object to retrieve permissions for`,
      },
    ],
  },
  {
    name: 'databricksworkspace_permissions_update',
    description: `Update the access control list (permissions) for a Databricks object such as a cluster, job, notebook, or SQL warehouse. Existing grants not included in the access control list are preserved unless explicitly overridden.`,
    params: [
      {
        name: 'access_control_list',
        type: 'array',
        required: true,
        description: `JSON array of access control entries to apply. Each entry has one grantee key (user_name, group_name, or service_principal_name) and a permission_level.`,
      },
      {
        name: 'request_object_id',
        type: 'string',
        required: true,
        description: `The ID of the object to update permissions for.`,
      },
      {
        name: 'request_object_type',
        type: 'string',
        required: true,
        description: `The type of object to update permissions for`,
      },
    ],
  },
  {
    name: 'databricksworkspace_repo_create',
    description: `Clone a Git repository into the Databricks workspace.`,
    params: [
      {
        name: 'provider',
        type: 'string',
        required: true,
        description: `The Git provider hosting the repository`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The HTTPS clone URL of the Git repository`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `Desired workspace path for the cloned repo. If omitted, Databricks places it under /Repos/{user}/{repo name}.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_repo_delete',
    description: `Permanently remove a Git repo from the Databricks workspace. This unlinks the repo and deletes its workspace files; it does not affect the remote Git repository. This action is irreversible.`,
    params: [
      {
        name: 'repo_id',
        type: 'string',
        required: true,
        description: `The ID of the repo to delete.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_repo_update',
    description: `Check out a different branch or tag in a Databricks repo, or pull the latest changes for the currently checked-out branch.`,
    params: [
      {
        name: 'repo_id',
        type: 'string',
        required: true,
        description: `The ID of the repo to update.`,
      },
      {
        name: 'branch',
        type: 'string',
        required: false,
        description: `Name of the branch to check out. Provide either branch or tag, not both.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: false,
        description: `Name of the tag to check out. Provide either branch or tag, not both.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_repos_list',
    description: `List Git repositories linked into the Databricks workspace, optionally filtered by path prefix.`,
    params: [
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for the next page of results`,
      },
      {
        name: 'path_prefix',
        type: 'string',
        required: false,
        description: `Filter repos to only those whose workspace path starts with this prefix`,
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
    name: 'databricksworkspace_secret_delete',
    description: `Delete a secret key from a Databricks secret scope. This action is irreversible.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The key name of the secret to delete.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The name of the secret scope containing the key.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_secret_put',
    description: `Create or overwrite a secret in a Databricks secret scope. Provide exactly one of string_value or bytes_value (base64-encoded).`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The key name under which to store the secret.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The name of the secret scope to write the secret into.`,
      },
      {
        name: 'bytes_value',
        type: 'string',
        required: false,
        description: `Base64-encoded bytes value to store. Use instead of string_value.`,
      },
      {
        name: 'string_value',
        type: 'string',
        required: false,
        description: `The UTF-8 string value to store. Use instead of bytes_value.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_secret_scope_create',
    description: `Create a new secret scope in the Databricks workspace, backed by Databricks or an Azure Key Vault.`,
    params: [
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `Name of the new secret scope.`,
      },
      {
        name: 'backend_azure_keyvault',
        type: 'object',
        required: false,
        description: `Azure Key Vault connection details. Required when scope_backend_type is AZURE_KEYVAULT.`,
      },
      {
        name: 'initial_manage_principal',
        type: 'string',
        required: false,
        description: `The initial principal granted MANAGE permission on this scope. Only 'users' is supported for Databricks-backed scopes.`,
      },
      {
        name: 'scope_backend_type',
        type: 'string',
        required: false,
        description: `The backend used to store the scope's secrets`,
      },
    ],
  },
  {
    name: 'databricksworkspace_secrets_list',
    description: `List the secret keys stored within a Databricks secret scope. Only key names and metadata are returned, never secret values.`,
    params: [
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The name of the secret scope to list keys from.`,
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
  {
    name: 'databricksworkspace_workspace_delete',
    description: `Permanently delete a notebook or directory from the Databricks workspace. This action is irreversible.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The absolute workspace path of the object to delete.`,
      },
      {
        name: 'recursive',
        type: 'boolean',
        required: false,
        description: `Whether to recursively delete a directory and its contents`,
      },
    ],
  },
  {
    name: 'databricksworkspace_workspace_export',
    description: `Export a Databricks notebook or directory. Directories can only be exported as DBC archives. The response contains the content base64-encoded.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The absolute workspace path of the notebook or directory to export.`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Export format for the object`,
      },
    ],
  },
  {
    name: 'databricksworkspace_workspace_get_status',
    description: `Get metadata about a Databricks workspace object (notebook, folder, or file), including its object type, language, and object ID.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The absolute workspace path of the object.`,
      },
    ],
  },
  {
    name: 'databricksworkspace_workspace_import',
    description: `Import a notebook into the Databricks workspace from base64-encoded content. Can also be used to create a notebook from source text.`,
    params: [
      {
        name: 'content_base64',
        type: 'string',
        required: true,
        description: `Base64-encoded content of the notebook to import.`,
      },
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The absolute workspace path to import the notebook to.`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Format of the content being imported`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Programming language of the notebook, required when format is SOURCE`,
      },
      {
        name: 'overwrite',
        type: 'boolean',
        required: false,
        description: `Whether to overwrite an existing object at the destination path`,
      },
    ],
  },
  {
    name: 'databricksworkspace_workspace_list',
    description: `List the contents (notebooks, folders, libraries) of a Databricks workspace directory.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The absolute workspace path to list.`,
      },
    ],
  },
]
