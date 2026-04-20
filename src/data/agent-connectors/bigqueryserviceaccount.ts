import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'bigqueryserviceaccount_get_dataset',
    description: `Retrieve metadata for a specific BigQuery dataset, including location, description, labels, access controls, and creation/modification times.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `The ID of the dataset to retrieve`,
      },
    ],
  },
  {
    name: 'bigqueryserviceaccount_get_job',
    description: `Retrieve the status and configuration of a BigQuery job by its job ID. Use this to poll for completion of an async query job submitted via Insert Query Job.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The ID of the job to retrieve`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Geographic location where the job was created, e.g. US or EU`,
      },
    ],
  },
  {
    name: 'bigqueryserviceaccount_get_model',
    description: `Retrieve metadata for a specific BigQuery ML model, including model type, feature columns, label columns, and training run details.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `The ID of the dataset containing the model`,
      },
      {
        name: 'model_id',
        type: 'string',
        required: true,
        description: `The ID of the model to retrieve`,
      },
    ],
  },
  {
    name: 'bigqueryserviceaccount_get_query_results',
    description: `Retrieve the results of a completed BigQuery query job. Supports pagination via page tokens. Use after polling Get Job until status is DONE.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The ID of the completed query job`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Geographic location where the job was created, e.g. US or EU`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return per page`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token from a previous response to retrieve the next page of results`,
      },
      {
        name: 'timeout_ms',
        type: 'integer',
        required: false,
        description: `Maximum milliseconds to wait if the query has not yet completed`,
      },
    ],
  },
  {
    name: 'bigqueryserviceaccount_get_routine',
    description: `Retrieve the definition and metadata of a specific BigQuery routine (stored procedure or UDF), including its arguments, return type, and body.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `The ID of the dataset containing the routine`,
      },
      {
        name: 'routine_id',
        type: 'string',
        required: true,
        description: `The ID of the routine to retrieve`,
      },
    ],
  },
  {
    name: 'bigqueryserviceaccount_get_table',
    description: `Retrieve metadata and schema for a specific BigQuery table or view, including column names, types, descriptions, and table properties.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `The ID of the dataset containing the table`,
      },
      {
        name: 'table_id',
        type: 'string',
        required: true,
        description: `The ID of the table or view to retrieve`,
      },
    ],
  },
  {
    name: 'bigqueryserviceaccount_list_datasets',
    description: `List all BigQuery datasets in the project. Supports filtering by label and pagination.`,
    params: [
      {
        name: 'all',
        type: 'boolean',
        required: false,
        description: `If true, includes hidden datasets in the results`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Label filter expression to restrict results, e.g. labels.env:prod`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of datasets to return per page`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token from a previous response to retrieve the next page`,
      },
    ],
  },
  {
    name: 'bigqueryserviceaccount_list_jobs',
    description: `List BigQuery jobs in the project. Supports filtering by state and projection, and pagination.`,
    params: [
      {
        name: 'all_users',
        type: 'boolean',
        required: false,
        description: `If true, returns jobs for all users in the project; otherwise returns only the current user's jobs`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of jobs to return per page`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token from a previous response to retrieve the next page`,
      },
      {
        name: 'projection',
        type: 'string',
        required: false,
        description: `Controls the fields returned: minimal (default) or full`,
      },
      {
        name: 'state_filter',
        type: 'string',
        required: false,
        description: `Filter jobs by state: done, pending, or running`,
      },
    ],
  },
  {
    name: 'bigqueryserviceaccount_list_models',
    description: `List all BigQuery ML models in a dataset, including their model type, training status, and creation time.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `The ID of the dataset to list models from`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of models to return per page`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token from a previous response to retrieve the next page`,
      },
    ],
  },
  {
    name: 'bigqueryserviceaccount_list_routines',
    description: `List all stored procedures and user-defined functions (UDFs) in a BigQuery dataset.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `The ID of the dataset to list routines from`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression to restrict results, e.g. routineType:SCALAR_FUNCTION`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of routines to return per page`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token from a previous response to retrieve the next page`,
      },
    ],
  },
  {
    name: 'bigqueryserviceaccount_list_table_data',
    description: `Read rows directly from a BigQuery table without writing a SQL query. Supports pagination, row offset, and field selection.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `The ID of the dataset containing the table`,
      },
      {
        name: 'table_id',
        type: 'string',
        required: true,
        description: `The ID of the table to read rows from`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return per page`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token from a previous response to retrieve the next page`,
      },
      {
        name: 'selected_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return; if omitted all fields are returned`,
      },
      {
        name: 'start_index',
        type: 'integer',
        required: false,
        description: `Zero-based row index to start reading from`,
      },
    ],
  },
  {
    name: 'bigqueryserviceaccount_list_tables',
    description: `List all tables and views in a BigQuery dataset. Supports pagination.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `The ID of the dataset to list tables from`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of tables to return per page`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token from a previous response to retrieve the next page`,
      },
    ],
  },
  {
    name: 'bigqueryserviceaccount_run_query',
    description: `Execute a SQL query synchronously against BigQuery and return results immediately. Best for short-running queries. For long-running queries use Insert Query Job instead.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `SQL query to execute` },
      {
        name: 'create_session',
        type: 'boolean',
        required: false,
        description: `If true, creates a new session and returns a session ID in the response`,
      },
      {
        name: 'dry_run',
        type: 'boolean',
        required: false,
        description: `If true, validates the query and returns estimated bytes processed without executing`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Geographic location of the dataset, e.g. US or EU`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return in the response`,
      },
      {
        name: 'timeout_ms',
        type: 'integer',
        required: false,
        description: `Maximum milliseconds to wait for query completion before returning`,
      },
      {
        name: 'use_legacy_sql',
        type: 'boolean',
        required: false,
        description: `Use BigQuery legacy SQL syntax instead of standard SQL`,
      },
    ],
  },
]
