import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'databoxmcp_ask_genie',
    description: `Ask Genie, the Databox AI data analyst, to explore and analyze a dataset using natural language. Genie can answer business questions, run SQL queries, surface trends, and provide summaries.`,
    params: [
      { name: 'dataset_id', type: 'string', required: true, description: `No description.` },
      { name: 'question', type: 'string', required: true, description: `No description.` },
      { name: 'thread_id', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'databoxmcp_create_data_source',
    description: `Create a new data source container in Databox for organizing datasets. Optionally scopes the data source to a specific account; defaults to the account of the authenticated API key.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'account_id', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'databoxmcp_create_dataset',
    description: `Create a structured dataset within a Databox data source, optionally defining a column schema and primary keys for tabular data storage.`,
    params: [
      { name: 'data_source_id', type: 'string', required: true, description: `No description.` },
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'columns', type: 'string', required: false, description: `No description.` },
      { name: 'primary_keys', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'databoxmcp_delete_data_source',
    description: `Permanently delete a data source and all its associated datasets from Databox. This operation cannot be undone.`,
    params: [
      { name: 'data_source_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'databoxmcp_delete_dataset',
    description: `Permanently delete a dataset and all its data from Databox. This operation cannot be undone.`,
    params: [
      { name: 'dataset_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'databoxmcp_get_current_datetime',
    description: `Get the current date and time in ISO 8601 format for a given timezone. Useful for resolving relative date expressions such as "last month" or "yesterday" before passing absolute dates to other tools.`,
    params: [{ name: 'timezone', type: 'string', required: false, description: `No description.` }],
  },
  {
    name: 'databoxmcp_get_dataset_ingestions',
    description: `Retrieve the full ingestion history for a dataset, including job IDs, statuses, record counts, timestamps, and any error messages.`,
    params: [
      { name: 'dataset_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'databoxmcp_get_ingestion',
    description: `Get detailed information for a specific ingestion event, including status, timestamps, dataset metrics, and per-record ingestion outcomes.`,
    params: [
      { name: 'dataset_id', type: 'string', required: true, description: `No description.` },
      { name: 'ingestion_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'databoxmcp_ingest_data',
    description: `Push data records into an existing Databox dataset. Each record must match the dataset schema; data is validated against column types and constraints before ingestion.`,
    params: [
      { name: 'data', type: 'string', required: true, description: `No description.` },
      { name: 'dataset_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'databoxmcp_list_accounts',
    description: `List all Databox accounts accessible to the authenticated user. Use this to discover account IDs needed for other operations.`,
    params: [],
  },
  {
    name: 'databoxmcp_list_data_source_datasets',
    description: `List all datasets belonging to a specific Databox data source, including schema details, row counts, and metadata.`,
    params: [
      { name: 'data_source_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'databoxmcp_list_data_sources',
    description: `List all API-ingestible data sources for a specific Databox account, returning IDs, names, types, and creation timestamps.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'databoxmcp_list_merged_datasets',
    description: `List all merged datasets for a specific Databox account. Merged datasets combine data from multiple sources into a single unified dataset.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'databoxmcp_list_metrics',
    description: `List all metrics available for a Databox data source, including metric keys, names, descriptions, and available dimensions. Pass the full metric_key value unchanged to load_metric_data.`,
    params: [
      { name: 'data_source_id', type: 'integer', required: true, description: `No description.` },
    ],
  },
  {
    name: 'databoxmcp_load_metric_data',
    description: `Retrieve data points for a Databox metric over a date range with optional time-series granulation and dimension breakdown. The metric_key must be the exact value returned by list_metrics.`,
    params: [
      { name: 'data_source_id', type: 'integer', required: true, description: `No description.` },
      { name: 'end_date', type: 'string', required: true, description: `No description.` },
      { name: 'metric_key', type: 'string', required: true, description: `No description.` },
      { name: 'start_date', type: 'string', required: true, description: `No description.` },
      { name: 'dimension', type: 'string', required: false, description: `No description.` },
      {
        name: 'granulation_time_unit',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'is_whole_range', type: 'boolean', required: false, description: `No description.` },
      { name: 'record_limit', type: 'string', required: false, description: `No description.` },
    ],
  },
]
