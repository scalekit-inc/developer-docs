import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'dropboxmcp_check_job_status',
    description: `Check the status of an async Dropbox operation by its job ID.`,
    params: [
      {
        name: 'operation_id',
        type: 'string',
        required: false,
        description: `The async job ID returned from a previous Dropbox operation.`,
      },
      {
        name: 'wait_ms',
        type: 'integer',
        required: false,
        description: `Milliseconds to wait for the job to complete before returning.`,
      },
    ],
  },
  {
    name: 'dropboxmcp_copy',
    description: `Copy one or more files or folders to a new location in Dropbox.`,
    params: [
      {
        name: 'autorename',
        type: 'boolean',
        required: false,
        description: `If true, renames the destination if a conflict exists.`,
      },
      {
        name: 'entries',
        type: 'array',
        required: false,
        description: `List of file or folder paths to operate on.`,
      },
    ],
  },
  {
    name: 'dropboxmcp_create_file',
    description: `Create a new file at the specified path with the given content.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The text content to write to the new file.`,
      },
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The Dropbox path to the file or folder (e.g. /Documents/report.pdf).`,
      },
    ],
  },
  {
    name: 'dropboxmcp_create_file_request',
    description: `Create a file request so others can upload files to your Dropbox.`,
    params: [
      {
        name: 'closed',
        type: 'boolean',
        required: false,
        description: `If true, the file request is closed and no longer accepts uploads.`,
      },
      {
        name: 'deadline',
        type: 'string',
        required: false,
        description: `The deadline for the file request in ISO 8601 format.`,
      },
      {
        name: 'deadline_allow_late_uploads',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional description shown to uploaders.`,
      },
      {
        name: 'destination',
        type: 'string',
        required: false,
        description: `The Dropbox folder path where uploaded files will be saved.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The title of the file request shown to uploaders.`,
      },
      { name: 'video_project_id', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'dropboxmcp_create_folder',
    description: `Create a new folder at the specified path in Dropbox.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The Dropbox path to the file or folder (e.g. /Documents/report.pdf).`,
      },
    ],
  },
  {
    name: 'dropboxmcp_create_shared_link',
    description: `Create a shared link for a file or folder with optional access controls.`,
    params: [
      {
        name: 'path_or_file_id',
        type: 'string',
        required: true,
        description: `The Dropbox path or file ID of the file or folder.`,
      },
      {
        name: 'access_level',
        type: 'string',
        required: false,
        description: `The access level for the shared link (viewer, editor).`,
      },
      { name: 'allow_download', type: 'string', required: false, description: `No description.` },
      {
        name: 'audience',
        type: 'string',
        required: false,
        description: `The audience for the shared link (public, team, no_one).`,
      },
      { name: 'emails', type: 'array', required: false, description: `No description.` },
      {
        name: 'expires',
        type: 'string',
        required: false,
        description: `The expiration date of the shared link in ISO 8601 format.`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `An optional password to protect the shared link.`,
      },
    ],
  },
  {
    name: 'dropboxmcp_delete',
    description: `Permanently delete one or more files or folders from Dropbox.`,
    params: [
      {
        name: 'entries',
        type: 'array',
        required: false,
        description: `List of file or folder paths to operate on.`,
      },
    ],
  },
  {
    name: 'dropboxmcp_download_link',
    description: `Get temporary download URLs for one or more files.`,
    params: [
      {
        name: 'entries',
        type: 'array',
        required: true,
        description: `List of file or folder paths to operate on.`,
      },
      {
        name: 'expiration_in_sec',
        type: 'integer',
        required: false,
        description: `Seconds until the temporary download URL expires. Must be 0 (no expiry) or between 60 and 900.`,
      },
    ],
  },
  {
    name: 'dropboxmcp_get_file_content',
    description: `Retrieve the raw content of a file by path or file ID.`,
    params: [
      {
        name: 'path_or_file_id',
        type: 'string',
        required: true,
        description: `The Dropbox path or file ID of the file or folder.`,
      },
    ],
  },
  {
    name: 'dropboxmcp_get_file_metadata',
    description: `Retrieve metadata for a file or folder by path or file ID.`,
    params: [
      {
        name: 'path_or_file_id',
        type: 'string',
        required: true,
        description: `The Dropbox path or file ID of the file or folder.`,
      },
    ],
  },
  {
    name: 'dropboxmcp_get_file_request',
    description: `Retrieve details of a specific file request by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `The unique ID of the file request.`,
      },
    ],
  },
  {
    name: 'dropboxmcp_get_shared_link_metadata',
    description: `Retrieve metadata for a file or folder from its shared link URL.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `The shared link URL to retrieve metadata for.`,
      },
    ],
  },
  {
    name: 'dropboxmcp_get_usage_and_quota',
    description: `Retrieve the current storage usage and quota for the Dropbox account.`,
    params: [],
  },
  {
    name: 'dropboxmcp_list_file_requests',
    description: `List all file requests for the Dropbox account with optional pagination.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
    ],
  },
  {
    name: 'dropboxmcp_list_folder',
    description: `List the contents of a Dropbox folder with optional pagination and filters.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page.`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'object_types',
        type: 'array',
        required: false,
        description: `Optional object type filters for the first list_folder call. Valid values: "file" and "folder".`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `The Dropbox path to the file or folder (e.g. /Documents/report.pdf).`,
      },
      {
        name: 'recursive',
        type: 'boolean',
        required: false,
        description: `If true, include the contents of all subdirectories.`,
      },
    ],
  },
  {
    name: 'dropboxmcp_list_shared_links',
    description: `List shared links for the account or a specific path with pagination.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `The Dropbox path to the file or folder (e.g. /Documents/report.pdf).`,
      },
    ],
  },
  {
    name: 'dropboxmcp_move',
    description: `Move one or more files or folders to a new location in Dropbox.`,
    params: [
      {
        name: 'autorename',
        type: 'boolean',
        required: false,
        description: `If true, renames the destination if a conflict exists.`,
      },
      {
        name: 'entries',
        type: 'array',
        required: false,
        description: `List of file or folder paths to operate on.`,
      },
    ],
  },
  {
    name: 'dropboxmcp_search',
    description: `Search for files and folders in Dropbox by query with optional filters.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page.`,
      },
      { name: 'file_categories', type: 'array', required: false, description: `No description.` },
      { name: 'file_extensions', type: 'array', required: false, description: `No description.` },
      {
        name: 'file_status',
        type: 'string',
        required: false,
        description: `Filter search results by file status (active or deleted).`,
      },
      {
        name: 'filename_only',
        type: 'boolean',
        required: false,
        description: `If true, restricts the search to file and folder names only.`,
      },
      {
        name: 'last_modified_after',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      {
        name: 'last_modified_before',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to sort search results by.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `The Dropbox path to the file or folder (e.g. /Documents/report.pdf).`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `The search query string to match against file and folder names.`,
      },
      {
        name: 'reverse_order',
        type: 'boolean',
        required: false,
        description: `If true, returns results in reverse order.`,
      },
    ],
  },
  {
    name: 'dropboxmcp_who_am_i',
    description: `Retrieve the current Dropbox account profile information.`,
    params: [],
  },
]
