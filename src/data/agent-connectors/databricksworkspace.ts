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
    name: 'databricksworkspace_sql_warehouses_list',
    description: `List all SQL warehouses available in the Databricks workspace.`,
    params: [],
  },
]
