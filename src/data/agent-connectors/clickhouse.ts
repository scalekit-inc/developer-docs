import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'clickhouse_get_clickpipe',
    description: `Get configuration and status for a specific ClickPipe by ID.`,
    params: [
      {
        name: 'clickPipeId',
        type: 'string',
        required: true,
        description: `ID of the requested ClickPipe`,
      },
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `ID of the organization that owns the service`,
      },
      {
        name: 'serviceId',
        type: 'string',
        required: true,
        description: `ID of the service that owns the ClickPipe`,
      },
    ],
  },
  {
    name: 'clickhouse_get_organization_cost',
    description: `Get billing and usage cost data for an organization over a date range (max 31 days). Returns a grand total and daily per-entity cost breakdown.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `The unique identifier of the organization`,
      },
      {
        name: 'from_date',
        type: 'string',
        required: false,
        description: `Start date for the report, e.g. 2024-12-19 (YYYY-MM-DD)`,
      },
      {
        name: 'to_date',
        type: 'string',
        required: false,
        description: `End date (inclusive) for the report, e.g. 2024-12-20 (YYYY-MM-DD). Cannot be more than 30 days after from_date.`,
      },
    ],
  },
  {
    name: 'clickhouse_get_organization_details',
    description: `Get details for a specific ClickHouse Cloud organization: name, tier, status, and settings. Use get_organizations to find the organizationId.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `ID of the organization to retrieve`,
      },
    ],
  },
  {
    name: 'clickhouse_get_organizations',
    description: `List all ClickHouse Cloud organizations accessible with the current API key. Returns organization IDs and names. Use the returned organizationId with all other tools.`,
    params: [],
  },
  {
    name: 'clickhouse_get_postgres_metrics',
    description: `Returns bucketed time-series metrics for a Postgres service over a time window (CPU, memory, disk, network, connections, cache hit ratio, throughput, transactions, and more). Each metric has a key, name, unit, description, and one series per label dimension, where each series is a list of (timestamp, value) data points. Timestamps are Unix seconds at the bucket start. Provide fromDate and toDate to bound the window; omit bucketSizeSeconds to let the server pick a bucket granularity for the window. Use this to chart or analyze how a service behaved over time.`,
    params: [
      {
        name: 'fromDate',
        type: 'string',
        required: true,
        description: `Inclusive start of the time window, as a UTC date-time with milliseconds, e.g. 2026-06-08T00:00:00.000Z`,
      },
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `The organization that owns the Postgres service`,
      },
      {
        name: 'serviceId',
        type: 'string',
        required: true,
        description: `The unique identifier of the Postgres service`,
      },
      {
        name: 'toDate',
        type: 'string',
        required: true,
        description: `Exclusive end of the time window, as a UTC date-time with milliseconds, e.g. 2026-06-09T00:00:00.000Z`,
      },
      {
        name: 'bucketSizeSeconds',
        type: 'integer',
        required: false,
        description: `Bucket granularity in seconds; omit to let the server choose a bucket size for the window`,
      },
    ],
  },
  {
    name: 'clickhouse_get_postgres_slow_query_pattern_details',
    description: `Returns up to the 10 most recent individual executions for a single Postgres slow query pattern from the last 24 hours, plus aggregate metrics for the pattern when available. For exact drill-down from list_postgres_slow_query_patterns, pass queryId, dbName, dbUser, dbOperation, and app exactly as returned; pass app as an empty string when the selected pattern has no application_name. Omit app only when intentionally querying across all applications. Each execution includes duration, rows, buffer/temp/WAL/JIT/CPU counters, and the error message and SQLSTATE if it failed. Durations are in microseconds. The execution sample is capped at 10 rows, so when aggregate is present rely on its fields for totals.`,
    params: [
      {
        name: 'dbName',
        type: 'string',
        required: true,
        description: `Database the pattern ran in, as returned by list_postgres_slow_query_patterns`,
      },
      {
        name: 'dbOperation',
        type: 'string',
        required: true,
        description: `Top-level SQL operation type of the pattern, as returned by list_postgres_slow_query_patterns`,
      },
      {
        name: 'dbUser',
        type: 'string',
        required: true,
        description: `Database user that executed the pattern, as returned by list_postgres_slow_query_patterns`,
      },
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `The organization that owns the Postgres service`,
      },
      {
        name: 'queryId',
        type: 'string',
        required: true,
        description: `Stable identifier for the query pattern, as returned by list_postgres_slow_query_patterns`,
      },
      {
        name: 'serviceId',
        type: 'string',
        required: true,
        description: `The unique identifier of the Postgres service`,
      },
      {
        name: 'app',
        type: 'string',
        required: false,
        description: `Postgres application_name of the pattern, exactly as returned by list_postgres_slow_query_patterns. Pass an empty string for a pattern with no application_name; omit only to match all applications.`,
      },
    ],
  },
  {
    name: 'clickhouse_get_service_backup_configuration',
    description: `Get the backup schedule and retention configuration for a service.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `ID of the organization that owns the service`,
      },
      { name: 'serviceId', type: 'string', required: true, description: `ID of the service` },
    ],
  },
  {
    name: 'clickhouse_get_service_backup_details',
    description: `Get details for a specific backup: status, size, duration, and creation time.`,
    params: [
      { name: 'backupId', type: 'string', required: true, description: `ID of the backup` },
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `ID of the organization that owns the service`,
      },
      { name: 'serviceId', type: 'string', required: true, description: `ID of the service` },
    ],
  },
  {
    name: 'clickhouse_get_service_details',
    description: `Get full details for a specific service: status, region, tier, endpoints, and scaling configuration.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `ID of the organization`,
      },
      {
        name: 'serviceId',
        type: 'string',
        required: true,
        description: `ID of the service to retrieve`,
      },
    ],
  },
  {
    name: 'clickhouse_get_services_list',
    description: `List all services (clusters) in a ClickHouse Cloud organization. Returns service IDs, names, status, region, and tier. Use the returned serviceId with other tools.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `ID of the organization whose services are to be listed`,
      },
    ],
  },
  {
    name: 'clickhouse_list_clickpipes',
    description: `List all ClickPipes (managed data ingestion pipelines) configured for a service.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `ID of the organization`,
      },
      {
        name: 'serviceId',
        type: 'string',
        required: true,
        description: `ID of the service to list ClickPipes for`,
      },
    ],
  },
  {
    name: 'clickhouse_list_databases',
    description: `List all databases in a ClickHouse service. Use the returned database names with list_tables and run_select_query.`,
    params: [{ name: 'serviceId', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'clickhouse_list_postgres_slow_query_patterns',
    description: `Lists the slowest query patterns observed on a Postgres service in a time window, with aggregate metrics per pattern (call count, total/avg/p50/p95/p99/max duration, rows, shared buffer cache hits and reads, CPU time, WAL bytes, error count). Durations are in microseconds. Use this first to find which queries dominate execution time, CPU, I/O, or WAL, then pass a selected pattern queryId, dbName, dbUser, dbOperation, and app exactly as returned to get_postgres_slow_query_pattern_details for its recent executions. Pass app as an empty string when the selected pattern has no application_name; omit the app filter only when intentionally querying across all applications. The queryText is normalized with $1-style placeholders.`,
    params: [
      {
        name: 'fromDate',
        type: 'string',
        required: true,
        description: `Inclusive start of the time window, as a UTC date-time with milliseconds, e.g. 2026-06-08T00:00:00.000Z`,
      },
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `The organization that owns the Postgres service`,
      },
      {
        name: 'serviceId',
        type: 'string',
        required: true,
        description: `The unique identifier of the Postgres service`,
      },
      {
        name: 'toDate',
        type: 'string',
        required: true,
        description: `Inclusive end of the time window (minute granularity), as a UTC date-time with milliseconds, e.g. 2026-06-09T00:00:00.000Z`,
      },
      {
        name: 'app',
        type: 'string',
        required: false,
        description: `Filter to a Postgres application_name. Pass an empty string to filter to queries with no application_name; omit to include all applications.`,
      },
      {
        name: 'dbName',
        type: 'string',
        required: false,
        description: `Filter to a single database`,
      },
      {
        name: 'dbOperation',
        type: 'string',
        required: false,
        description: `Filter to a top-level SQL operation type (e.g. SELECT, INSERT, UPDATE, DELETE, UTILITY)`,
      },
      {
        name: 'dbUser',
        type: 'string',
        required: false,
        description: `Filter to a single database user`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of patterns to return (default 20)`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of patterns to skip for pagination (default 0)`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `Aggregate metric to sort patterns by (default total_duration)`,
      },
      {
        name: 'sortOrder',
        type: 'string',
        required: false,
        description: `Sort direction (default desc)`,
      },
    ],
  },
  {
    name: 'clickhouse_list_service_backups',
    description: `List all backups for a service, most recent first. Returns backup IDs, status, size, and timestamps.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `ID of the organization`,
      },
      {
        name: 'serviceId',
        type: 'string',
        required: true,
        description: `ID of the service to list backups for`,
      },
    ],
  },
  {
    name: 'clickhouse_list_tables',
    description: `List all tables in a database, including column names and types. Supports LIKE pattern filtering.`,
    params: [
      {
        name: 'database',
        type: 'string',
        required: true,
        description: `Name of the database to list tables from`,
      },
      {
        name: 'serviceId',
        type: 'string',
        required: true,
        description: `The unique identifier of the ClickHouse service`,
      },
      {
        name: 'like',
        type: 'string',
        required: false,
        description: `Optional SQL LIKE pattern to filter tables by name (e.g., "events_%")`,
      },
      {
        name: 'notLike',
        type: 'string',
        required: false,
        description: `Optional SQL LIKE pattern to exclude tables by name`,
      },
    ],
  },
  {
    name: 'clickhouse_run_postgres_select_query',
    description: `Executes a read-only SELECT query against a Postgres service. The query is routed through the Postgres query endpoint with the read-only role and only read-style statements are permitted.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `The organization that owns the Postgres service`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `A valid PostgreSQL SQL SELECT query string`,
      },
      {
        name: 'serviceId',
        type: 'string',
        required: true,
        description: `The unique identifier of the Postgres service`,
      },
      {
        name: 'database',
        type: 'string',
        required: false,
        description: `The Postgres database to query. Defaults to the postgres database.`,
      },
      {
        name: 'timeoutSeconds',
        type: 'integer',
        required: false,
        description: `Maximum time in seconds to wait for the query to complete. Defaults to 300 (5 minutes), maximum is 3600 (1 hour).`,
      },
    ],
  },
  {
    name: 'clickhouse_run_select_query',
    description: `Execute a read-only SELECT query against a ClickHouse service. Only SELECT statements are permitted.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `A valid ClickHouse SELECT query. Only read-only SELECT statements are permitted. e.g. SELECT * FROM my_table LIMIT 10`,
      },
      {
        name: 'serviceId',
        type: 'string',
        required: true,
        description: `The unique identifier of the ClickHouse service`,
      },
      {
        name: 'timeoutSeconds',
        type: 'integer',
        required: false,
        description: `Query timeout in seconds. Default: 300 (5 min), max: 3600 (1 hour). Use lower values for simple queries.`,
      },
    ],
  },
]
