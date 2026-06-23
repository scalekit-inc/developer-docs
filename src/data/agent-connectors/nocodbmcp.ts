import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'nocodbmcp_aggregate',
    description: `Perform aggregations (sum, count, avg, etc.) on table data with filtering and grouping`,
    params: [
      {
        name: 'aggregations',
        type: 'array',
        required: true,
        description: `List of aggregation operations to perform on the table fields.`,
      },
      {
        name: 'filterGroups',
        type: 'array',
        required: true,
        description: `List of filter groups; each group produces a separate set of aggregation results.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The unique ID of the NocoDB table to aggregate data from.`,
      },
      {
        name: 'viewId',
        type: 'string',
        required: false,
        description: `Optional view ID to scope the aggregation to a specific view's configuration.`,
      },
    ],
  },
  {
    name: 'nocodbmcp_countrecords',
    description: `Count Records in a Table`,
    params: [
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The unique ID of the NocoDB table to count records in.`,
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: `Filter expression to limit which records are counted. Uses NocoDB query syntax: (field,operator,value). Combine conditions with ~and / ~or.`,
      },
    ],
  },
  {
    name: 'nocodbmcp_createrecords',
    description: `Create records in a table`,
    params: [
      {
        name: 'records',
        type: 'array',
        required: true,
        description: `List of records to create. Each record is an object with a 'fields' key containing field name-value pairs.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The unique ID of the NocoDB table to insert records into.`,
      },
    ],
  },
  {
    name: 'nocodbmcp_deleterecords',
    description: `Delete records in a table`,
    params: [
      {
        name: 'records',
        type: 'array',
        required: true,
        description: `List of records to delete. Each entry must include the record ID.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The unique ID of the NocoDB table to delete records from.`,
      },
    ],
  },
  {
    name: 'nocodbmcp_getbaseinfo',
    description: `Fetch information about current base`,
    params: [],
  },
  {
    name: 'nocodbmcp_getrecord',
    description: `Fetch a record by ID`,
    params: [
      {
        name: 'recordId',
        type: 'string',
        required: true,
        description: `The ID or primary key value of the record to fetch.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The unique ID of the NocoDB table containing the record.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of field names to include in the response. Leave blank to return all fields.`,
      },
    ],
  },
  {
    name: 'nocodbmcp_gettableschema',
    description: `Get the table schema including fields and views information`,
    params: [
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The unique ID of the NocoDB table to retrieve the schema for.`,
      },
    ],
  },
  {
    name: 'nocodbmcp_gettableslist',
    description: `List tables accessible by user`,
    params: [],
  },
  {
    name: 'nocodbmcp_queryrecords',
    description: `Query Records from a Table`,
    params: [
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The unique ID of the NocoDB table to query records from.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `List of field names to include in the response. Returns all fields when omitted.`,
      },
      {
        name: 'page',
        type: 'number',
        required: false,
        description: `Page number for pagination. Starts at 1.`,
      },
      {
        name: 'pageSize',
        type: 'number',
        required: false,
        description: `Number of records to return per page. Default is 50.`,
      },
      {
        name: 'sort',
        type: 'array',
        required: false,
        description: `List of sort options. Each entry specifies a field name and sort direction.`,
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: `Filter expression using NocoDB query syntax: (field,operator,value). Combine with ~and / ~or.`,
      },
    ],
  },
  {
    name: 'nocodbmcp_readattachment',
    description: `Read attachments in a record`,
    params: [
      {
        name: 'files',
        type: 'array',
        required: true,
        description: `List of attachment objects from NocoDB. Each attachment must include title, mimeType, size, and either a URL or a path.`,
      },
    ],
  },
  {
    name: 'nocodbmcp_updaterecords',
    description: `Update records in a table`,
    params: [
      {
        name: 'records',
        type: 'array',
        required: true,
        description: `List of records to update. Each entry must include the record ID and a 'fields' object with the updated values.`,
      },
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `The unique ID of the NocoDB table to update records in.`,
      },
    ],
  },
]
