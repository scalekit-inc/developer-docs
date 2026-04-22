import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googledrive_get_file_metadata',
    description: `Retrieve metadata for a specific file in Google Drive by its file ID. Returns name, MIME type, size, creation time, and more.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the file to retrieve metadata for`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Fields to include in the response`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'supports_all_drives',
        type: 'boolean',
        required: false,
        description: `Support shared drives`,
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
    name: 'googledrive_search_content',
    description: `Search inside the content of files stored in Google Drive using full-text search. Finds files where the body text matches the search term.`,
    params: [
      {
        name: 'search_term',
        type: 'string',
        required: true,
        description: `Text to search for inside file contents`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Fields to include in the response`,
      },
      {
        name: 'mime_type',
        type: 'string',
        required: false,
        description: `Filter results by MIME type`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of files to return per page`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for the next page of results`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'supports_all_drives',
        type: 'boolean',
        required: false,
        description: `Include shared drives in results`,
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
    name: 'googledrive_search_files',
    description: `Search for files and folders in Google Drive using query filters like name, type, owner, and parent folder.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Fields to include in the response`,
      },
      { name: 'order_by', type: 'string', required: false, description: `Sort order for results` },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of files to return per page`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for the next page of results`,
      },
      { name: 'query', type: 'string', required: false, description: `Drive search query string` },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'supports_all_drives',
        type: 'boolean',
        required: false,
        description: `Include shared drives in results`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
]
