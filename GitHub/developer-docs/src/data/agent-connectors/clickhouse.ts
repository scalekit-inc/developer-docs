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
