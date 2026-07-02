import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'redshift_cancel_query',
    description: `Cancel a running Amazon Redshift SQL statement using its statement ID.`,
    params: [
      { name: 'statement_id', type: 'string', required: true, description: `The ID of the statement to cancel. Must be non-empty.` },
    ],
  },
  {
    name: 'redshift_describe_table',
    description: `Describe the schema of a table in Amazon Redshift using the Redshift Data API, including column names, types, and metadata.`,
    params: [
      { name: 'table', type: 'string', required: true, description: `Name of the table to describe. Must be non-empty.` },
      { name: 'connected_database', type: 'string', required: false, description: `Override the connected account's default database for this request.` },
      { name: 'max_results', type: 'integer', required: false, description: `Maximum number of columns to return per page.` },
      { name: 'next_token', type: 'string', required: false, description: `Pagination cursor from a previous redshift_describe_table response.` },
      { name: 'schema', type: 'string', required: false, description: `Schema name that contains the table.` },
    ],
  },
  {
    name: 'redshift_execute_sql',
    description: `Execute a SQL statement against Amazon Redshift using the Redshift Data API. Returns a statement ID that can be used with redshift_get_query_result to fetch results.`,
    params: [
      { name: 'sql', type: 'string', required: true, description: `SQL statement to execute. Must be non-empty.` },
      { name: 'statement_name', type: 'string', required: false, description: `Optional label for the statement, echoed back by DescribeStatement for tracking purposes.` },
      { name: 'with_event', type: 'boolean', required: false, description: `If true, AWS publishes an EventBridge event when the statement completes.` },
    ],
  },
  {
    name: 'redshift_get_query_result',
    description: `Retrieve the results of a previously executed Redshift SQL statement using the statement ID returned by redshift_execute_sql. Supports pagination via next_token.`,
    params: [
      { name: 'statement_id', type: 'string', required: true, description: `The statement ID returned by redshift_execute_sql. Must be non-empty.` },
      { name: 'next_token', type: 'string', required: false, description: `Pagination token from a prior redshift_get_query_result response when results spanned multiple pages.` },
    ],
  },
  {
    name: 'redshift_list_schemas',
    description: `List schemas in an Amazon Redshift database using the Redshift Data API. Supports filtering by schema name pattern with pagination.`,
    params: [
      { name: 'connected_database', type: 'string', required: false, description: `Override the connected account's default database for this request.` },
      { name: 'max_results', type: 'integer', required: false, description: `Maximum number of schemas to return.` },
      { name: 'next_token', type: 'string', required: false, description: `Pagination cursor from a previous redshift_list_schemas response.` },
      { name: 'schema_pattern', type: 'string', required: false, description: `LIKE pattern to filter schemas (e.g., public, my_schema%).` },
    ],
  },
  {
    name: 'redshift_list_statements',
    description: `List previously executed SQL statements in Amazon Redshift using the Redshift Data API. Supports filtering by name, status, and role level with pagination.`,
    params: [
      { name: 'max_results', type: 'integer', required: false, description: `Maximum number of statements to return.` },
      { name: 'next_token', type: 'string', required: false, description: `Pagination cursor from a previous redshift_list_statements response.` },
      { name: 'role_level', type: 'boolean', required: false, description: `When true, lists all statements run by the IAM role rather than just the current session.` },
      { name: 'statement_name', type: 'string', required: false, description: `Filter statements by name label.` },
      { name: 'status', type: 'string', required: false, description: `Filter by execution status (e.g., FINISHED, FAILED, ABORTED, PICKED, STARTED, SUBMITTED).` },
    ],
  },
  {
    name: 'redshift_list_tables',
    description: `List tables in an Amazon Redshift database using the Redshift Data API. Supports filtering by schema and table name patterns with pagination.`,
    params: [
      { name: 'connected_database', type: 'string', required: false, description: `Override the connected account's default database for this request.` },
      { name: 'max_results', type: 'integer', required: false, description: `Maximum number of tables to return.` },
      { name: 'next_token', type: 'string', required: false, description: `Pagination cursor from a previous redshift_list_tables response.` },
      { name: 'schema_pattern', type: 'string', required: false, description: `LIKE pattern to filter schemas (e.g., public, my_schema%).` },
      { name: 'table_pattern', type: 'string', required: false, description: `LIKE pattern to filter tables (e.g., orders, user%).` },
    ],
  },
]
