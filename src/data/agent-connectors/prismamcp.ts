import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'prismamcp_create_prisma_postgres_backup',
    description: `Create an automated backup for a Prisma Postgres database. Note: on-demand backup creation is not currently supported; backups are created automatically by the system.`,
    params: [
      { name: 'databaseId', type: 'string', required: true, description: `The unique identifier of the Prisma Postgres database. Get it from List Databases.` },
      { name: 'projectId', type: 'string', required: true, description: `The unique identifier of the Prisma project. Get it from List Databases.` },
    ],
  },
  {
    name: 'prismamcp_create_prisma_postgres_connection_string',
    description: `Create a new connection string for a Prisma Postgres database. Returns both Prisma and direct connection strings when available.`,
    params: [
      { name: 'databaseId', type: 'string', required: true, description: `The unique identifier of the Prisma Postgres database. Get it from List Databases.` },
      { name: 'name', type: 'string', required: true, description: `A unique display name for the resource.` },
    ],
  },
  {
    name: 'prismamcp_create_prisma_postgres_database',
    description: `Create a new managed Prisma Postgres database in the specified region.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `A unique display name for the resource.` },
      { name: 'region', type: 'string', required: true, description: `The AWS region to deploy the database in. Accepted values: us-east-1, us-west-1, eu-west-3, eu-central-1, ap-northeast-1, ap-southeast-1.` },
    ],
  },
  {
    name: 'prismamcp_create_prisma_postgres_recovery',
    description: `Restore a Prisma Postgres database from a backup into a new database.`,
    params: [
      { name: 'backupId', type: 'string', required: true, description: `The unique identifier of the backup to restore. Get it from List Backups.` },
      { name: 'databaseId', type: 'string', required: true, description: `The unique identifier of the Prisma Postgres database. Get it from List Databases.` },
      { name: 'targetDatabaseName', type: 'string', required: true, description: `A unique name for the recovered database.` },
    ],
  },
  {
    name: 'prismamcp_delete_prisma_postgres_connection_string',
    description: `Permanently delete a connection string by its ID. This action cannot be undone.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The unique identifier of the connection string. Get it from List Connection Strings.` },
    ],
  },
  {
    name: 'prismamcp_delete_prisma_postgres_database',
    description: `Permanently delete a Prisma Postgres database by its ID. This action cannot be undone.`,
    params: [
      { name: 'databaseId', type: 'string', required: true, description: `The unique identifier of the Prisma Postgres database. Get it from List Databases.` },
    ],
  },
  {
    name: 'prismamcp_execute_prisma_postgres_schema_update',
    description: `Execute a DDL schema update on a Prisma Postgres database. Use for schema changes only; use Execute SQL Query for data reads and writes.`,
    params: [
      { name: 'databaseId', type: 'string', required: true, description: `The unique identifier of the Prisma Postgres database. Get it from List Databases.` },
      { name: 'projectId', type: 'string', required: true, description: `The unique identifier of the Prisma project. Get it from List Databases.` },
      { name: 'query', type: 'string', required: true, description: `The SQL query to execute against the database.` },
    ],
  },
  {
    name: 'prismamcp_execute_sql_query',
    description: `Execute a SQL query on a Prisma Postgres database and return the results as JSON. Does not have permission to run schema updates.`,
    params: [
      { name: 'databaseId', type: 'string', required: true, description: `The unique identifier of the Prisma Postgres database. Get it from List Databases.` },
      { name: 'projectId', type: 'string', required: true, description: `The unique identifier of the Prisma project. Get it from List Databases.` },
      { name: 'query', type: 'string', required: true, description: `The SQL query to execute against the database.` },
    ],
  },
  {
    name: 'prismamcp_fetch_workspace_details',
    description: `Retrieve details of the current Prisma Postgres workspace, including plan limits and usage.`,
    params: [
    ],
  },
  {
    name: 'prismamcp_introspect_database_schema',
    description: `Introspect and return the schema of a Prisma Postgres database as JSON.`,
    params: [
      { name: 'databaseId', type: 'string', required: true, description: `The unique identifier of the Prisma Postgres database. Get it from List Databases.` },
      { name: 'projectId', type: 'string', required: true, description: `The unique identifier of the Prisma project. Get it from List Databases.` },
    ],
  },
  {
    name: 'prismamcp_list_prisma_postgres_backups',
    description: `List all available automated backups for a Prisma Postgres database.`,
    params: [
      { name: 'databaseId', type: 'string', required: true, description: `The unique identifier of the Prisma Postgres database. Get it from List Databases.` },
    ],
  },
  {
    name: 'prismamcp_list_prisma_postgres_connection_strings',
    description: `List all connection strings for a Prisma Postgres database.`,
    params: [
      { name: 'databaseId', type: 'string', required: true, description: `The unique identifier of the Prisma Postgres database. Get it from List Databases.` },
    ],
  },
  {
    name: 'prismamcp_list_prisma_postgres_databases',
    description: `List all Prisma Postgres databases in the workspace. Use the returned id as databaseId in other tools.`,
    params: [
    ],
  },
]
