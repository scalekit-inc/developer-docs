import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googledocs_create_document',
    description: `Create a new blank Google Doc with an optional title. Returns the new document's ID and metadata.`,
    params: [
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      { name: 'title', type: 'string', required: false, description: `Title of the new document` },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googledocs_list_documents',
    description: `List all Google Docs documents in the user's Drive. Optionally search by document name. Returns document IDs, names, and metadata with pagination support.`,
    params: [
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort order for results. Examples: modifiedTime desc, name asc, createdTime desc`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of documents to return per page (max 1000, default 100)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for retrieving the next page of results. Use the nextPageToken from a previous response.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Drive search query to filter documents. Defaults to all Google Docs. To search by name, use: mimeType = 'application/vnd.google-apps.document' and trashed = false and name contains 'report'`,
      },
    ],
  },
  {
    name: 'googledocs_read_document',
    description: `Read the complete content and structure of a Google Doc including text, formatting, tables, and metadata.`,
    params: [
      {
        name: 'document_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Doc to read`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'suggestions_view_mode',
        type: 'string',
        required: false,
        description: `How suggestions are rendered in the response`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googledocs_update_document',
    description: `Update the content of an existing Google Doc using batch update requests. Supports inserting and deleting text, formatting, tables, and other document elements.`,
    params: [
      {
        name: 'document_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Doc to update`,
      },
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `Array of update requests to apply to the document`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
      {
        name: 'write_control',
        type: 'object',
        required: false,
        description: `Optional write control for revision management`,
      },
    ],
  },
]
