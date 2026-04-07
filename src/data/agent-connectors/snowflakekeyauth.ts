// src/data/agent-connectors/snowflakekeyauth.ts
import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'snowflakekeyauth_cancel_query',
    description: 'Cancel a running Snowflake SQL API statement by statement handle.',
    params: [
      {
        name: 'statement_handle',
        type: 'string',
        required: true,
        description: 'Snowflake statement handle to cancel',
      },
      {
        name: 'request_id',
        type: 'string',
        required: false,
        description: 'Optional request ID used when the statement was submitted',
      },
    ],
  },
  {
    name: 'snowflakekeyauth_execute_query',
    description:
      'Execute one or more SQL statements against Snowflake using the SQL API. Use semicolons to submit multiple statements.',
    params: [
      {
        name: 'statement',
        type: 'string',
        required: true,
        description:
          'SQL statement to execute. Use semicolons to send multiple statements in one request.',
      },
      {
        name: 'async',
        type: 'boolean',
        required: false,
        description: 'Execute statement asynchronously and return a statement handle',
      },
      {
        name: 'bindings',
        type: 'object',
        required: false,
        description: "Bind variables object for '?' placeholders in the SQL statement",
      },
      {
        name: 'database',
        type: 'string',
        required: false,
        description: 'Database to use when executing the statement',
      },
      {
        name: 'nullable',
        type: 'boolean',
        required: false,
        description: 'When false, SQL NULL values are returned as the string "null"',
      },
      {
        name: 'parameters',
        type: 'object',
        required: false,
        description: 'Statement-level Snowflake parameters as a JSON object',
      },
      {
        name: 'request_id',
        type: 'string',
        required: false,
        description: 'Unique request identifier (UUID) used for idempotent retries',
      },
      {
        name: 'retry',
        type: 'boolean',
        required: false,
        description:
          'Set true when resubmitting a previously sent request with the same request_id',
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: 'Role to use when executing the statement',
      },
      {
        name: 'schema',
        type: 'string',
        required: false,
        description: 'Schema to use when executing the statement',
      },
      {
        name: 'timeout',
        type: 'integer',
        required: false,
        description: 'Maximum number of seconds to wait for statement execution',
      },
      {
        name: 'warehouse',
        type: 'string',
        required: false,
        description: 'Warehouse to use when executing the statement',
      },
    ],
  },
  {
    name: 'snowflakekeyauth_get_columns',
    description: 'Query INFORMATION_SCHEMA.COLUMNS for column metadata.',
    params: [
      { name: 'database', type: 'string', required: true, description: 'Database name' },
      {
        name: 'column_name_like',
        type: 'string',
        required: false,
        description: 'Optional column name pattern',
      },
      { name: 'limit', type: 'integer', required: false, description: 'Maximum rows' },
      { name: 'role', type: 'string', required: false, description: 'Optional role' },
      { name: 'schema', type: 'string', required: false, description: 'Optional schema filter' },
      { name: 'table', type: 'string', required: false, description: 'Optional table filter' },
      { name: 'warehouse', type: 'string', required: false, description: 'Optional warehouse' },
    ],
  },
  {
    name: 'snowflakekeyauth_get_query_partition',
    description: 'Get a specific result partition for a Snowflake SQL API statement.',
    params: [
      {
        name: 'partition',
        type: 'integer',
        required: true,
        description: 'Partition index to fetch (0-based)',
      },
      {
        name: 'statement_handle',
        type: 'string',
        required: true,
        description: 'Snowflake statement handle returned by execute_query',
      },
      {
        name: 'request_id',
        type: 'string',
        required: false,
        description: 'Optional request ID used when the statement was submitted',
      },
    ],
  },
  {
    name: 'snowflakekeyauth_get_query_status',
    description:
      'Get Snowflake SQL API statement status and first partition result metadata by statement handle.',
    params: [
      {
        name: 'statement_handle',
        type: 'string',
        required: true,
        description: 'Snowflake statement handle returned by execute_query',
      },
      {
        name: 'request_id',
        type: 'string',
        required: false,
        description: 'Optional request ID used when the statement was submitted',
      },
    ],
  },
  {
    name: 'snowflakekeyauth_get_referential_constraints',
    description: 'Query INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS.',
    params: [
      { name: 'database', type: 'string', required: true, description: 'Database name' },
      { name: 'limit', type: 'integer', required: false, description: 'Maximum rows' },
      { name: 'role', type: 'string', required: false, description: 'Optional role' },
      { name: 'schema', type: 'string', required: false, description: 'Optional schema filter' },
      { name: 'table', type: 'string', required: false, description: 'Optional table filter' },
      { name: 'warehouse', type: 'string', required: false, description: 'Optional warehouse' },
    ],
  },
  {
    name: 'snowflakekeyauth_get_schemata',
    description: 'Query INFORMATION_SCHEMA.SCHEMATA for schema metadata.',
    params: [
      { name: 'database', type: 'string', required: true, description: 'Database name' },
      { name: 'limit', type: 'integer', required: false, description: 'Maximum rows' },
      { name: 'role', type: 'string', required: false, description: 'Optional role' },
      {
        name: 'schema_like',
        type: 'string',
        required: false,
        description: 'Optional schema pattern',
      },
      { name: 'warehouse', type: 'string', required: false, description: 'Optional warehouse' },
    ],
  },
  {
    name: 'snowflakekeyauth_get_table_constraints',
    description: 'Query INFORMATION_SCHEMA.TABLE_CONSTRAINTS.',
    params: [
      { name: 'database', type: 'string', required: true, description: 'Database name' },
      {
        name: 'constraint_type',
        type: 'string',
        required: false,
        description: 'Optional constraint type filter',
      },
      { name: 'limit', type: 'integer', required: false, description: 'Maximum rows' },
      { name: 'role', type: 'string', required: false, description: 'Optional role' },
      { name: 'schema', type: 'string', required: false, description: 'Optional schema filter' },
      { name: 'table', type: 'string', required: false, description: 'Optional table filter' },
      { name: 'warehouse', type: 'string', required: false, description: 'Optional warehouse' },
    ],
  },
  {
    name: 'snowflakekeyauth_get_tables',
    description: 'Query INFORMATION_SCHEMA.TABLES for table metadata in a Snowflake database.',
    params: [
      { name: 'database', type: 'string', required: true, description: 'Database name' },
      { name: 'limit', type: 'integer', required: false, description: 'Maximum number of rows' },
      { name: 'role', type: 'string', required: false, description: 'Optional role' },
      { name: 'schema', type: 'string', required: false, description: 'Optional schema filter' },
      {
        name: 'table_name_like',
        type: 'string',
        required: false,
        description: 'Optional table name pattern',
      },
      { name: 'warehouse', type: 'string', required: false, description: 'Optional warehouse' },
    ],
  },
  {
    name: 'snowflakekeyauth_show_databases_schemas',
    description: 'Run SHOW DATABASES or SHOW SCHEMAS.',
    params: [
      { name: 'object_type', type: 'string', required: true, description: 'Object type to show' },
      {
        name: 'database_name',
        type: 'string',
        required: false,
        description: 'Optional database scope for SHOW SCHEMAS',
      },
      {
        name: 'like_pattern',
        type: 'string',
        required: false,
        description: 'Optional LIKE pattern',
      },
      { name: 'role', type: 'string', required: false, description: 'Optional role' },
      { name: 'warehouse', type: 'string', required: false, description: 'Optional warehouse' },
    ],
  },
  {
    name: 'snowflakekeyauth_show_grants',
    description: 'Run SHOW GRANTS in common modes (to role, to user, of role, on object).',
    params: [
      { name: 'grant_view', type: 'string', required: true, description: 'SHOW GRANTS variant' },
      {
        name: 'object_name',
        type: 'string',
        required: false,
        description: 'Object name for on_object',
      },
      {
        name: 'object_type',
        type: 'string',
        required: false,
        description: 'Object type for on_object',
      },
      { name: 'role', type: 'string', required: false, description: 'Optional execution role' },
      {
        name: 'role_name',
        type: 'string',
        required: false,
        description: 'Role name (for to_role/of_role)',
      },
      {
        name: 'user_name',
        type: 'string',
        required: false,
        description: 'User name (for to_user)',
      },
      { name: 'warehouse', type: 'string', required: false, description: 'Optional warehouse' },
    ],
  },
  {
    name: 'snowflakekeyauth_show_imported_exported_keys',
    description:
      'Run SHOW IMPORTED KEYS or SHOW EXPORTED KEYS for a table. Use fully-qualified scope (database_name + schema_name + table_name) for reliable execution.',
    params: [
      {
        name: 'key_direction',
        type: 'string',
        required: true,
        description: 'Which command to run',
      },
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description:
          'Table name (use with schema_name and database_name for fully-qualified scope)',
      },
      {
        name: 'database_name',
        type: 'string',
        required: false,
        description: 'Optional database name (recommended with schema_name)',
      },
      { name: 'role', type: 'string', required: false, description: 'Optional role' },
      {
        name: 'schema_name',
        type: 'string',
        required: false,
        description: 'Optional schema name (recommended with database_name)',
      },
      { name: 'warehouse', type: 'string', required: false, description: 'Optional warehouse' },
    ],
  },
  {
    name: 'snowflakekeyauth_show_primary_keys',
    description:
      'Run SHOW PRIMARY KEYS with optional scope. When using schema_name (or schema_name + table_name), database_name is required.',
    params: [
      {
        name: 'database_name',
        type: 'string',
        required: false,
        description: 'Optional database name for scope (required when schema_name is set)',
      },
      { name: 'role', type: 'string', required: false, description: 'Optional role' },
      {
        name: 'schema_name',
        type: 'string',
        required: false,
        description: 'Optional schema name for scope',
      },
      {
        name: 'table_name',
        type: 'string',
        required: false,
        description: 'Optional table name for scope',
      },
      { name: 'warehouse', type: 'string', required: false, description: 'Optional warehouse' },
    ],
  },
  {
    name: 'snowflakekeyauth_show_warehouses',
    description: 'Run SHOW WAREHOUSES.',
    params: [
      {
        name: 'like_pattern',
        type: 'string',
        required: false,
        description: 'Optional LIKE pattern',
      },
      { name: 'role', type: 'string', required: false, description: 'Optional role' },
      { name: 'warehouse', type: 'string', required: false, description: 'Optional warehouse' },
    ],
  },
]
