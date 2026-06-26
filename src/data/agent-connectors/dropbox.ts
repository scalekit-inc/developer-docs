import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'dropbox_file_requests_create',
    description: `Create a Dropbox file request that allows others to upload files to a designated Dropbox folder.`,
    params: [
      {
        name: 'destination',
        type: 'string',
        required: true,
        description: `The Dropbox folder path where uploaded files will be saved.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the file request, shown to contributors.`,
      },
      {
        name: 'deadline_allow_late_uploads',
        type: 'string',
        required: false,
        description: `Whether to allow uploads after the deadline has passed.`,
      },
      {
        name: 'deadline_deadline',
        type: 'string',
        required: false,
        description: `Deadline date for submissions in ISO 8601 format (e.g., '2024-12-31T23:59:59Z').`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the file request, shown to contributors.`,
      },
      {
        name: 'open',
        type: 'boolean',
        required: false,
        description: `Whether the file request is open for submissions. Defaults to true.`,
      },
    ],
  },
  {
    name: 'dropbox_file_requests_list',
    description: `List all file requests created by the current Dropbox user.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of file requests to return.`,
      },
    ],
  },
  {
    name: 'dropbox_files_copy',
    description: `Copy a file or folder from one path to another in Dropbox. The original file is preserved. Optionally auto-rename if a conflict exists at the destination.`,
    params: [
      {
        name: 'from_path',
        type: 'string',
        required: true,
        description: `The path of the file or folder to copy.`,
      },
      {
        name: 'to_path',
        type: 'string',
        required: true,
        description: `The destination path for the copy.`,
      },
      {
        name: 'allow_ownership_transfer',
        type: 'boolean',
        required: false,
        description: `Allow copies that change the file ownership.`,
      },
      {
        name: 'allow_shared_folder',
        type: 'boolean',
        required: false,
        description: `If true, copy is allowed even if the destination is inside a shared folder.`,
      },
      {
        name: 'autorename',
        type: 'boolean',
        required: false,
        description: `If true, the destination will be automatically renamed if a file/folder already exists there.`,
      },
    ],
  },
  {
    name: 'dropbox_files_create_folder',
    description: `Create a new folder at the specified path in Dropbox. Optionally auto-rename if a folder with the same name already exists.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The path of the folder to create.`,
      },
      {
        name: 'autorename',
        type: 'boolean',
        required: false,
        description: `If true, the folder will be renamed automatically if a folder with the same name already exists.`,
      },
    ],
  },
  {
    name: 'dropbox_files_delete',
    description: `Delete a file or folder at the specified path in Dropbox. Deleted items are moved to the Dropbox trash and can be recovered within 30 days (or 180 days for Business accounts).`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The path of the file or folder to delete.`,
      },
      {
        name: 'parent_rev',
        type: 'string',
        required: false,
        description: `Perform delete only if the file's revision matches this value. Only applies to files, not folders.`,
      },
    ],
  },
  {
    name: 'dropbox_files_get_metadata',
    description: `Get metadata for a file or folder at the specified Dropbox path. Returns name, path, size, modification date, and other properties.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The path to the file or folder to get metadata for.`,
      },
      {
        name: 'include_deleted',
        type: 'boolean',
        required: false,
        description: `If true, deleted files and folders will be included in the results.`,
      },
      {
        name: 'include_has_explicit_shared_members',
        type: 'boolean',
        required: false,
        description: `If true, the result will include a flag indicating whether the file has explicit shared members.`,
      },
      {
        name: 'include_media_info',
        type: 'boolean',
        required: false,
        description: `If true, the result will include media info (e.g., dimensions, duration) for photo and video files.`,
      },
    ],
  },
  {
    name: 'dropbox_files_get_temporary_link',
    description: `Get a temporary link to download a file from Dropbox. The link expires after 4 hours. Use this to share a file download URL without granting permanent access.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The path of the file to get a temporary download link for.`,
      },
    ],
  },
  {
    name: 'dropbox_files_list_folder',
    description: `List the contents of a folder in Dropbox. Returns files and subfolders at the given path. Supports recursive listing, filtering for deleted items, and pagination via cursor.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The path to the folder to list. Use an empty string or '' to list the root of the Dropbox.`,
      },
      {
        name: 'include_deleted',
        type: 'boolean',
        required: false,
        description: `If true, deleted files and folders will be included in the results.`,
      },
      {
        name: 'include_has_explicit_shared_members',
        type: 'boolean',
        required: false,
        description: `If true, the results will include a flag for each file indicating whether it has explicit shared members.`,
      },
      {
        name: 'include_media_info',
        type: 'boolean',
        required: false,
        description: `If true, the results will include media info (e.g., dimensions, duration) for photo and video files.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of results to return per page. Default is determined by the server (typically 2000).`,
      },
      {
        name: 'recursive',
        type: 'boolean',
        required: false,
        description: `If true, the listing will recurse into subfolders.`,
      },
    ],
  },
  {
    name: 'dropbox_files_list_folder_continue',
    description: `Continue listing folder contents using a cursor returned from a previous list_folder call. Use this to paginate through large folder listings.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: true,
        description: `The cursor returned by a previous list_folder or list_folder/continue call.`,
      },
    ],
  },
  {
    name: 'dropbox_files_list_revisions',
    description: `List all revisions of a file at the given path in Dropbox. Returns revision history including IDs, sizes, and modification dates. Useful for viewing version history and recovering older versions.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The path of the file to list revisions for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of revisions to return (1–100). Defaults to 10.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Determines how the path is interpreted. 'path' uses the file's current path; 'id' uses the file's unique ID.`,
      },
    ],
  },
  {
    name: 'dropbox_files_move',
    description: `Move a file or folder from one path to another in Dropbox. Optionally allow moving into shared folders or auto-rename if a conflict exists at the destination.`,
    params: [
      {
        name: 'from_path',
        type: 'string',
        required: true,
        description: `The current path of the file or folder to move.`,
      },
      {
        name: 'to_path',
        type: 'string',
        required: true,
        description: `The destination path for the file or folder.`,
      },
      {
        name: 'allow_ownership_transfer',
        type: 'boolean',
        required: false,
        description: `Allow moves that change the file ownership. Only relevant for moves from one user's Dropbox to another.`,
      },
      {
        name: 'allow_shared_folder',
        type: 'boolean',
        required: false,
        description: `If true, move is allowed even if the destination is inside a shared folder.`,
      },
      {
        name: 'autorename',
        type: 'boolean',
        required: false,
        description: `If true, the destination will be automatically renamed if a file/folder already exists there.`,
      },
    ],
  },
  {
    name: 'dropbox_files_restore',
    description: `Restore a file in Dropbox to a specific revision. Requires the file path and revision identifier.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The path to the file to restore, e.g. '/Documents/notes.txt'.`,
      },
      {
        name: 'rev',
        type: 'string',
        required: true,
        description: `The revision identifier to restore the file to. Obtained from file revision history.`,
      },
    ],
  },
  {
    name: 'dropbox_files_save_url',
    description: `Save a file from a URL directly to a Dropbox path. The file is downloaded from the URL and saved to the specified Dropbox location.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The Dropbox path where the file should be saved, e.g. '/Downloads/report.pdf'.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL of the file to download and save to Dropbox.`,
      },
    ],
  },
  {
    name: 'dropbox_files_search',
    description: `Search for files and folders in Dropbox by name or content. Supports filtering by path, file status, and limiting results. Returns matching file and folder entries.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query string. Matches file names, extensions, and content.`,
      },
      {
        name: 'options_file_status',
        type: 'string',
        required: false,
        description: `Restricts search to files with this status. 'active' returns non-deleted files; 'deleted' returns only deleted files.`,
      },
      {
        name: 'options_filename_only',
        type: 'boolean',
        required: false,
        description: `If true, the search only matches filenames and not file content.`,
      },
      {
        name: 'options_max_results',
        type: 'integer',
        required: false,
        description: `The maximum number of search results to return (1–1000).`,
      },
      {
        name: 'options_path',
        type: 'string',
        required: false,
        description: `Restricts the search to this folder path and its subfolders.`,
      },
    ],
  },
  {
    name: 'dropbox_sharing_add_folder_member',
    description: `Add one or more members to a Dropbox shared folder. Each member is specified with an email address and access level.`,
    params: [
      {
        name: 'members',
        type: 'array',
        required: true,
        description: `Array of members to add. Each member has an email and access level.`,
      },
      {
        name: 'shared_folder_id',
        type: 'string',
        required: true,
        description: `The ID of the shared folder to add members to.`,
      },
      {
        name: 'custom_message',
        type: 'string',
        required: false,
        description: `Optional custom message to include in the invitation email.`,
      },
      {
        name: 'quiet',
        type: 'boolean',
        required: false,
        description: `If true, do not send a notification email to added members.`,
      },
    ],
  },
  {
    name: 'dropbox_sharing_create_shared_link_with_settings',
    description: `Create a shared link for a file or folder in Dropbox with optional visibility and access settings.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The Dropbox path for which to create a shared link, e.g. '/Documents/report.pdf'.`,
      },
      {
        name: 'settings_access',
        type: 'string',
        required: false,
        description: `The access level for the shared link (e.g., 'viewer', 'editor').`,
      },
      {
        name: 'settings_audience',
        type: 'string',
        required: false,
        description: `The audience for the shared link. Controls who can access.`,
      },
      {
        name: 'settings_requested_visibility',
        type: 'string',
        required: false,
        description: `The visibility of the shared link. One of: 'public', 'team_only', 'password'.`,
      },
    ],
  },
  {
    name: 'dropbox_sharing_get_shared_link_metadata',
    description: `Retrieve metadata about a Dropbox shared link, including file details, permissions, and expiry.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The shared link URL to get metadata for.`,
      },
      {
        name: 'link_password',
        type: 'string',
        required: false,
        description: `The password for a password-protected shared link.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `If the shared link is for a folder, filter to a specific sub-path within it.`,
      },
    ],
  },
  {
    name: 'dropbox_sharing_list_folder_members',
    description: `List all members (users and groups) of a Dropbox shared folder.`,
    params: [
      {
        name: 'shared_folder_id',
        type: 'string',
        required: true,
        description: `The ID of the shared folder whose members to list.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of members to return per page.`,
      },
    ],
  },
  {
    name: 'dropbox_sharing_list_shared_links',
    description: `List shared links for a file or folder in Dropbox. Optionally filter by path or use a cursor for pagination.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned from a previous call to continue listing.`,
      },
      {
        name: 'direct_only',
        type: 'boolean',
        required: false,
        description: `If true, only return links directly for the path, not inherited from parent folders.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `Filter shared links by file or folder path, e.g. '/Documents'.`,
      },
    ],
  },
  {
    name: 'dropbox_sharing_revoke_shared_link',
    description: `Revoke a shared link in Dropbox, making it inaccessible. Requires the shared link URL.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The shared link URL to revoke.`,
      },
    ],
  },
  {
    name: 'dropbox_sharing_share_folder',
    description: `Share a Dropbox folder with other users. Converts a personal folder into a shared folder with configurable member and link policies.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The path of the folder to share, e.g. '/Projects/Team'.`,
      },
      {
        name: 'acl_update_policy',
        type: 'string',
        required: false,
        description: `Who can manage the access control list (add/remove members). E.g., 'owner' or 'editors'.`,
      },
      {
        name: 'force_async',
        type: 'boolean',
        required: false,
        description: `If true, force the share operation to be asynchronous.`,
      },
      {
        name: 'member_policy',
        type: 'string',
        required: false,
        description: `Who can add members to this shared folder. One of: 'team', 'anyone'.`,
      },
      {
        name: 'shared_link_policy',
        type: 'string',
        required: false,
        description: `The policy for shared links created for this folder. E.g., 'anyone', 'members', 'team'.`,
      },
    ],
  },
  {
    name: 'dropbox_users_get_current_account',
    description: `Get information about the current Dropbox user's account, including name, email, and account type.`,
    params: [],
  },
  {
    name: 'dropbox_users_get_space_usage',
    description: `Get the current storage space usage for the authenticated Dropbox user, including used and allocated space.`,
    params: [],
  },
]
