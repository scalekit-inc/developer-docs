import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'planetscalemcp_planetscale_execute_read_query',
    description: `Execute a read-only SQL query (SELECT, SHOW, DESCRIBE, EXPLAIN) against a PlanetScale database branch.`,
    params: [
      { name: 'branch', type: 'string', required: true, description: `Branch name (e.g., 'main')` },
      { name: 'database', type: 'string', required: true, description: `Database name` },
      { name: 'organization', type: 'string', required: true, description: `PlanetScale organization name` },
      { name: 'query', type: 'string', required: true, description: `SQL SELECT query to execute` },
      { name: 'postgres_database_name', type: 'string', required: false, description: `Postgres only: target database name to connect to. Use when the user has created additional databases in the same PlanetScale Postgres cluster (e.g. via CREATE DATABASE). Omit to use the default database for the branch.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_execute_write_query',
    description: `Execute a write SQL query (INSERT, UPDATE, DELETE, or DDL) against a PlanetScale database branch.`,
    params: [
      { name: 'branch', type: 'string', required: true, description: `Branch name (e.g., 'main')` },
      { name: 'database', type: 'string', required: true, description: `Database name` },
      { name: 'organization', type: 'string', required: true, description: `PlanetScale organization name` },
      { name: 'query', type: 'string', required: true, description: `SQL INSERT/UPDATE/DELETE/DDL query to execute` },
      { name: 'confirm_destructive', type: 'boolean', required: false, description: `HUMAN CONFIRMATION REQUIRED: Only set to true after explicitly asking the user and receiving their approval. Show them the exact DELETE or DDL query first.` },
      { name: 'postgres_database_name', type: 'string', required: false, description: `Postgres only: target database name to connect to. Use when the user has created additional databases in the same PlanetScale Postgres cluster (e.g. via CREATE DATABASE). Omit to use the default database for the branch.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_get_branch',
    description: `Get details about a specific database branch.`,
    params: [
      { name: 'pathParameters', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_get_branch_schema',
    description: `Get the schema (tables and columns) for a specific database branch.`,
    params: [
      { name: 'pathParameters', type: 'object', required: true, description: `No description.` },
      { name: 'queryParameters', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_get_database',
    description: `Get details about a specific PlanetScale database.`,
    params: [
      { name: 'pathParameters', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_get_insights',
    description: `Get query performance insights for a PlanetScale database branch, including top queries aggregated over a time period.`,
    params: [
      { name: 'branch', type: 'string', required: true, description: `Branch name (e.g., 'main')` },
      { name: 'database', type: 'string', required: true, description: `Database name` },
      { name: 'organization', type: 'string', required: true, description: `PlanetScale organization name` },
      { name: 'fields', type: 'array', required: false, description: `Request specific metric fields from the API (e.g. ['query', 'count', 'rowsRead', 'rowsAffected', 'rowsReadPerReturned', 'egressBytes', 'indexes', 'maxShardQueries']). Ignored when fingerprint is provided.` },
      { name: 'fingerprint', type: 'string', required: false, description: `Query fingerprint hash to drill down into a specific query pattern. Use the \`fingerprint\` value from an initial insights call. Always include \`keyspace\` (also from the initial results) to get summary data.` },
      { name: 'from', type: 'string', required: false, description: `Start of time range (ISO 8601 format, e.g. '2026-03-09T00:00:00.000Z'). Defaults to 24 hours ago. Supported in both discovery and fingerprint modes.` },
      { name: 'keyspace', type: 'string', required: false, description: `Keyspace for fingerprint drill-down. Required to get summary data. Use the \`keyspace\` value returned in insights results (e.g. 'my_keyspace' for MySQL/Vitess or 'postgres.public' for Postgres databases).` },
      { name: 'limit', type: 'number', required: false, description: `Number of results per metric (default: 5, max: 20)` },
      { name: 'period', type: 'string', required: false, description: `Shorthand for a recent time window ending at now. Valid values: '15m', '1h', '3h', '6h', '12h', '24h'. Cannot be combined with from/to — use one or the other. Only supported in discovery mode (ignored in fingerprint mode — use from/to instead).` },
      { name: 'query', type: 'string', required: false, description: `Filter insights by search query. Supports plain text matching and structured filters: exact match with quotes ("select count"), statement_type:select|delete|update|insert, table:table_name, keyspace:keyspace_name, table_keyspace:keyspace_name, index:index_name or index:table.index_name, indexed:true|false, multishard:true|false, query_count:>N or query_count:<N, p99:>N or p50:<N (ms), max_latency:>N (ms). Ignored when fingerprint is provided.` },
      { name: 'sort_by', type: 'string', required: false, description: `Sort order: 'all' (default) aggregates 5 API calls for comprehensive view, or specify a single metric: 'totalTime', 'rowsRead', 'p99Latency', 'rowsReadPerReturned', 'rowsAffected', 'egressBytes'. Ignored when fingerprint is provided.` },
      { name: 'tablet_type', type: 'string', required: false, description: `Filter by tablet type: 'primary' or 'replica'` },
      { name: 'to', type: 'string', required: false, description: `End of time range (ISO 8601 format). Defaults to now. Supported in both discovery and fingerprint modes.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_get_invoice_line_items',
    description: `Get all line items for a specific invoice, broken down by database branch costs.`,
    params: [
      { name: 'pathParameters', type: 'object', required: true, description: `No description.` },
      { name: 'queryParameters', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_get_organization',
    description: `Get details about a specific PlanetScale organization.`,
    params: [
      { name: 'pathParameters', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_list_branches',
    description: `List all branches within a PlanetScale database.`,
    params: [
      { name: 'pathParameters', type: 'object', required: true, description: `No description.` },
      { name: 'queryParameters', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_list_cluster_sizes',
    description: `List available PlanetScale cluster sizes (SKUs) for an organization.`,
    params: [
      { name: 'organization', type: 'string', required: true, description: `PlanetScale organization name` },
      { name: 'engine', type: 'string', required: false, description: `Database engine to list SKUs for (default: mysql)` },
      { name: 'type', type: 'string', required: false, description: `Filter to only autoscaling (PS-*, network-backed) or metal (M-*, local storage) sizes` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_list_databases',
    description: `List all databases within a PlanetScale organization.`,
    params: [
      { name: 'pathParameters', type: 'object', required: true, description: `No description.` },
      { name: 'queryParameters', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_list_invoices',
    description: `List all invoices for a PlanetScale organization.`,
    params: [
      { name: 'pathParameters', type: 'object', required: true, description: `No description.` },
      { name: 'queryParameters', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_list_organizations',
    description: `List all PlanetScale organizations you have access to.`,
    params: [
      { name: 'queryParameters', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_list_regions_for_organization',
    description: `List the regions available for a PlanetScale organization.`,
    params: [
      { name: 'pathParameters', type: 'object', required: true, description: `No description.` },
      { name: 'queryParameters', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_list_schema_recommendations',
    description: `List all schema recommendations for a PlanetScale database based on production query patterns.`,
    params: [
      { name: 'pathParameters', type: 'object', required: true, description: `No description.` },
      { name: 'queryParameters', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'planetscalemcp_planetscale_search_documentation',
    description: `Search the PlanetScale knowledge base for documentation, API references, code examples, and guides.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query for PlanetScale docs` },
      { name: 'api_reference_only', type: 'boolean', required: false, description: `Only return API reference docs` },
      { name: 'code_only', type: 'boolean', required: false, description: `Only return code snippets` },
      { name: 'language', type: 'string', required: false, description: `Optional language filter (e.g., 'en', 'es')` },
      { name: 'version', type: 'string', required: false, description: `Optional version filter (e.g., 'v0.7')` },
    ],
  },
]
