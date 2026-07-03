import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'onedrive_checkin_file',
    description: `Check in a checked-out OneDrive file to make the version available to others. Optionally provide a comment describing the changes and specify the check-in type. Requires the file to be checked out first.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file to check in. The file must currently be checked out. Obtain item IDs from list or get drive item operations.`,
      },
      {
        name: 'check_in_as',
        type: 'string',
        required: false,
        description: `The type of check-in to perform. 'published' makes the version visible to all users. 'unspecified' (default) lets the server decide based on document library configuration.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `An optional comment to associate with the checked-in version, describing the changes made. Maximum length varies by library configuration.`,
      },
    ],
  },
  {
    name: 'onedrive_checkout_file',
    description: `Check out a OneDrive file to prevent others from editing it while you make changes. Once checked out, only you can modify the file until it is checked back in or the checkout is discarded.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file to check out. The file must be in a document library that supports check out. Obtain item IDs from list or get drive item operations.`,
      },
    ],
  },
  {
    name: 'onedrive_copy_drive_item',
    description: `Copy a file or folder in the signed-in user's personal OneDrive to a new location asynchronously. Returns HTTP 202 with a monitor URL; copy completes in the background. To copy an item in a specific drive by drive ID (e.g. a SharePoint document library), use onedrive_copy_item_in_drive instead.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder to copy. Obtain item IDs from list or get drive item operations.`,
      },
      {
        name: 'new_parent_id',
        type: 'string',
        required: true,
        description: `The item ID of the destination folder for the copy. Use "root" to copy the item to the top level of OneDrive.`,
      },
      {
        name: 'new_name',
        type: 'string',
        required: false,
        description: `Optional name for the copied item in the destination. If omitted, the copy retains the original name.`,
      },
    ],
  },
  {
    name: 'onedrive_copy_item_in_drive',
    description: `Copy a file or folder in a specific drive to a new location asynchronously. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. Returns HTTP 202 with a monitor URL; the copy completes in the background. To copy an item in the signed-in user's personal OneDrive, use onedrive_copy_drive_item instead.`,
    params: [
      {
        name: 'drive_id',
        type: 'string',
        required: true,
        description: `The unique ID of the drive containing the item to copy. Obtain drive IDs from onedrive_list_drives or sharepoint_list_drives.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the file or folder to copy. Obtain item IDs from list or get item operations.`,
      },
      {
        name: 'new_parent_id',
        type: 'string',
        required: true,
        description: `The item ID of the destination folder for the copy. Use "root" to copy to the top level of the drive.`,
      },
      {
        name: 'new_name',
        type: 'string',
        required: false,
        description: `Optional name for the copied item in the destination. If omitted, the copy retains the original name.`,
      },
    ],
  },
  {
    name: 'onedrive_create_folder',
    description: `Create a new folder in OneDrive under the specified parent folder. Use "root" as the parent_id to create a top-level folder. Supports conflict behavior control when a folder with the same name already exists.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the folder to create. Must be a valid folder name without path separators.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `The ID of the parent folder under which to create the new folder. Use "root" to create a folder at the top level of OneDrive. Obtain folder IDs from list or get drive item operations.`,
      },
      {
        name: 'conflict_behavior',
        type: 'string',
        required: false,
        description: `Behavior when a folder with the same name already exists. "fail" returns an error, "replace" overwrites the existing item, "rename" saves the new folder with a different name. Default: rename.`,
      },
    ],
  },
  {
    name: 'onedrive_create_sharing_link',
    description: `Create a sharing link for a file or folder in the signed-in user's personal OneDrive. Supports view-only, edit, and embed link types with optional org scope, password, and expiration. To create a sharing link for an item in a specific drive by drive ID (e.g. a SharePoint document library), use onedrive_create_sharing_link_in_drive instead.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder for which to create a sharing link. Obtain item IDs from list or get drive item operations.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Type of sharing link to create. "view" is read-only, "edit" allows modifications, "embed" provides an HTML embed code for web pages.`,
      },
      {
        name: 'expiration_date_time',
        type: 'string',
        required: false,
        description: `Optional expiration date and time for the sharing link in ISO 8601 format. After this date/time the link will no longer work. Example: "2026-12-31T23:59:00Z".`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `Optional password to protect the sharing link. Recipients will need to enter this password to access the shared item.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Scope of the sharing link. "anonymous" allows anyone with the link to access the item. "organization" restricts access to users within the same Microsoft 365 organization. Default: anonymous.`,
      },
    ],
  },
  {
    name: 'onedrive_create_sharing_link_in_drive',
    description: `Create a sharing link for a file or folder in a specific drive by drive ID. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. Supports view-only, edit, and embed link types with optional org scope, password, and expiration. To create a sharing link for an item in the signed-in user's personal OneDrive, use onedrive_create_sharing_link instead.`,
    params: [
      {
        name: 'drive_id',
        type: 'string',
        required: true,
        description: `The unique ID of the drive containing the item to share. Obtain drive IDs from onedrive_list_drives or sharepoint_list_drives.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the file or folder for which to create a sharing link. Obtain item IDs from list or get item operations.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Type of sharing link to create. "view" is read-only, "edit" allows modifications, "embed" provides an HTML embed code for web pages.`,
      },
      {
        name: 'expiration_date_time',
        type: 'string',
        required: false,
        description: `Optional expiration date and time for the sharing link in ISO 8601 format. After this date/time the link will no longer work. Example: "2026-12-31T23:59:00Z".`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `Optional password to protect the sharing link. Recipients will need to enter this password to access the shared item.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Scope of the sharing link. "anonymous" allows anyone with the link to access the item. "organization" restricts access to users within the same Microsoft 365 organization. Default: anonymous.`,
      },
    ],
  },
  {
    name: 'onedrive_delete_drive_item',
    description: `Delete a file or folder from the signed-in user's personal OneDrive by item ID. The item is moved to the recycle bin. To delete an item in a specific drive by drive ID (e.g. a SharePoint document library), use onedrive_delete_item_in_drive instead.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder to delete. Obtain item IDs from list or get drive item operations. Deleting a folder also removes all its contents.`,
      },
    ],
  },
  {
    name: 'onedrive_delete_item_in_drive',
    description: `Delete a file or folder from a specific drive by drive ID and item ID. The item is moved to the recycle bin. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. Deleting a folder also removes all its contents. To delete an item from the signed-in user's personal OneDrive, use onedrive_delete_drive_item instead.`,
    params: [
      {
        name: 'drive_id',
        type: 'string',
        required: true,
        description: `The unique ID of the drive containing the item to delete. Obtain drive IDs from onedrive_list_drives or sharepoint_list_drives.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the file or folder to delete. Obtain item IDs from list or get item operations. Deleting a folder also removes all its contents.`,
      },
    ],
  },
  {
    name: 'onedrive_delete_permission',
    description: `Remove a specific permission (sharing link or user grant) from a OneDrive file or folder. Once deleted, users who had access only through this permission will lose access. This action cannot be undone.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder from which to remove the permission. Obtain item IDs from list or get drive item operations.`,
      },
      {
        name: 'permission_id',
        type: 'string',
        required: true,
        description: `The unique ID of the permission to delete. Obtain permission IDs from list permissions operations.`,
      },
    ],
  },
  {
    name: 'onedrive_discard_checkout',
    description: `Discard a pending checkout for a OneDrive file, releasing the lock without saving any changes. The file reverts to the state it was in before the checkout. Use this when you want to cancel edits and allow others to edit the file again.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file whose checkout to discard. The file must currently be checked out by you. Obtain item IDs from list or get drive item operations.`,
      },
    ],
  },
  {
    name: 'onedrive_download_file',
    description: `Download the binary content of a OneDrive file by its item ID. The response is the raw file bytes (not JSON). For text files this will be readable text; for binary files (images, Office documents) it will be binary data. Use the item ID from get or list operations.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file to download. Obtain item IDs from list drive items or search drive items operations.`,
      },
    ],
  },
  {
    name: 'onedrive_follow_drive_item',
    description: `Follow a OneDrive file or folder so it appears in your list of followed items. Following an item allows you to track changes and receive notifications. Returns the updated drive item.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder to follow. Obtain item IDs from list or get drive item operations.`,
      },
    ],
  },
  {
    name: 'onedrive_get_drive',
    description: `Retrieve the properties of the signed-in user's default OneDrive drive, including storage quota, owner information, and drive type (personal, business, or SharePoint document library).`,
    params: [],
  },
  {
    name: 'onedrive_get_drive_item',
    description: `Retrieve metadata for a file or folder in the signed-in user's personal OneDrive by item ID. Returns name, size, creation date, last modified date, MIME type, and download URL. To get an item from a specific drive by drive ID (e.g. a SharePoint document library), use onedrive_get_item_in_drive instead.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder to retrieve. Obtain item IDs from list or search operations.`,
      },
    ],
  },
  {
    name: 'onedrive_get_item_in_drive',
    description: `Retrieve metadata for a specific file or folder in a drive by drive ID and item ID. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. Returns name, size, creation date, last modified date, MIME type, and download URL. To get an item from the signed-in user's personal OneDrive, use onedrive_get_drive_item instead.`,
    params: [
      {
        name: 'drive_id',
        type: 'string',
        required: true,
        description: `The unique ID of the drive containing the item. Obtain drive IDs from onedrive_list_drives or sharepoint_list_drives.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the file or folder to retrieve. Obtain item IDs from list or search operations.`,
      },
    ],
  },
  {
    name: 'onedrive_get_thumbnails',
    description: `Retrieve thumbnail images for a specific OneDrive file or folder. Returns a collection of thumbnail sets including small, medium, and large thumbnail URLs. Useful for displaying file previews.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder whose thumbnails to retrieve. Obtain item IDs from list or get drive item operations.`,
      },
    ],
  },
  {
    name: 'onedrive_get_version_content',
    description: `Download the binary content of a specific version of a OneDrive file. Returns the raw file bytes for the requested version. The response is a redirect (302) or direct download (200) depending on the client.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file whose version content to download. Obtain item IDs from list or get drive item operations.`,
      },
      {
        name: 'version_id',
        type: 'string',
        required: true,
        description: `The unique ID of the version to download. Obtain version IDs from the list versions operation. Example: '1.0' or a GUID string.`,
      },
    ],
  },
  {
    name: 'onedrive_invite_users',
    description: `Send sharing invitations for a OneDrive file or folder to one or more recipients by email address. Assigns the specified roles (read or write) and optionally sends an email notification with a message.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder to share. Obtain item IDs from list or get drive item operations.`,
      },
      {
        name: 'recipient_emails',
        type: 'array',
        required: true,
        description: `Array of email addresses of users to invite. Each email will receive an invitation to access the shared item. Example: ["alice@example.com", "bob@example.com"].`,
      },
      {
        name: 'roles',
        type: 'array',
        required: true,
        description: `Array of permission roles to grant to the invited users. Use "read" for view-only access and "write" for edit access. Example: ["read"].`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Optional message to include in the invitation email sent to the recipients.`,
      },
      {
        name: 'require_sign_in',
        type: 'boolean',
        required: false,
        description: `Whether the recipient must sign in to access the shared item. Set to false to allow access without signing in. Default: true.`,
      },
      {
        name: 'send_invitation',
        type: 'boolean',
        required: false,
        description: `Whether to send an email invitation to the recipients. Set to false to grant access silently without sending an email. Default: true.`,
      },
    ],
  },
  {
    name: 'onedrive_list_activities',
    description: `Retrieve the activity feed for a specific OneDrive file or folder. Returns a list of recent actions performed on the item, including who made changes, when, and what type of action was taken (create, edit, delete, share, etc.).`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder whose activity feed to retrieve. Obtain item IDs from list or get drive item operations.`,
      },
      {
        name: '$filter',
        type: 'string',
        required: false,
        description: `OData filter expression to narrow activity results. Example: "times/recordedTime ge 2024-01-01T00:00:00Z" to filter by date.`,
      },
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of activity records to return per page. Accepts an integer between 1 and 1000. Default: 25.`,
      },
    ],
  },
  {
    name: 'onedrive_list_drive_items',
    description: `List the children (files and folders) of a folder in the signed-in user's personal OneDrive. Use "root" as the item_id to list top-level contents. To list children in a specific drive by drive ID (e.g. a SharePoint document library), use onedrive_list_items_in_drive instead.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The ID of the folder whose children to list. Use "root" to list top-level OneDrive contents. Obtain item IDs from other list or search operations.`,
      },
      {
        name: '$filter',
        type: 'string',
        required: false,
        description: `OData filter expression to narrow results. Example: "file ne null" returns only files; "folder ne null" returns only folders.`,
      },
      {
        name: '$orderby',
        type: 'string',
        required: false,
        description: `Property to sort results by. Example: "name asc" or "lastModifiedDateTime desc".`,
      },
      {
        name: '$select',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to return. Example: "id,name,size,lastModifiedDateTime" reduces response payload.`,
      },
      {
        name: '$skip',
        type: 'integer',
        required: false,
        description: `Number of items to skip for pagination. Use with $top to page through results.`,
      },
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page (default: 25). Accepts values 1–999.`,
      },
    ],
  },
  {
    name: 'onedrive_list_drives',
    description: `List all drives accessible to the signed-in user, including personal OneDrive, SharePoint document libraries, and shared drives. Supports OData $top for pagination and $select for field selection.`,
    params: [
      {
        name: '$select',
        type: 'string',
        required: false,
        description: `Comma-separated list of drive properties to return. Example: "id,name,driveType,quota" reduces response payload to only those fields.`,
      },
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of drives to return per page. Accepts values 1–999. Defaults to server-side limit if omitted.`,
      },
    ],
  },
  {
    name: 'onedrive_list_item_versions_in_drive',
    description: `Retrieve the version history for a file in a specific drive by drive ID and item ID. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. Returns version ID, last modified time, size, and the identity of the user who made each change. To list versions in the signed-in user's personal OneDrive, use onedrive_list_versions instead.`,
    params: [
      {
        name: 'drive_id',
        type: 'string',
        required: true,
        description: `The unique ID of the drive containing the file. Obtain drive IDs from onedrive_list_drives or sharepoint_list_drives.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the file whose version history to list. Obtain item IDs from list or get item operations.`,
      },
      {
        name: 'top',
        type: 'integer',
        required: false,
        description: `Maximum number of version entries to return per page. Accepts values 1–1000. Default: 25.`,
      },
    ],
  },
  {
    name: 'onedrive_list_items_in_drive',
    description: `List the children (files and folders) of a folder in a specific drive by drive ID. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. Use "root" as item_id to list top-level contents of the drive. To list items in the signed-in user's personal OneDrive, use onedrive_list_drive_items instead.`,
    params: [
      {
        name: 'drive_id',
        type: 'string',
        required: true,
        description: `The unique ID of the drive containing the folder. Obtain drive IDs from onedrive_list_drives or sharepoint_list_drives.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The ID of the folder whose children to list. Use "root" to list top-level contents of the drive.`,
      },
      {
        name: '$filter',
        type: 'string',
        required: false,
        description: `OData filter expression to narrow results. Example: "file ne null" returns only files; "folder ne null" returns only folders.`,
      },
      {
        name: '$orderby',
        type: 'string',
        required: false,
        description: `Property to sort results by. Example: "name asc" or "lastModifiedDateTime desc".`,
      },
      {
        name: '$select',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to return. Example: "id,name,size,lastModifiedDateTime" reduces response payload.`,
      },
      {
        name: '$skip',
        type: 'integer',
        required: false,
        description: `Number of items to skip for pagination. Use with $top to page through results.`,
      },
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page (default: 25). Accepts values 1–999.`,
      },
    ],
  },
  {
    name: 'onedrive_list_permissions',
    description: `Retrieve the list of permissions (sharing and access grants) for a specific OneDrive file or folder. Returns all permission objects including sharing links, individual user grants, and inherited permissions.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder whose permissions to list. Obtain item IDs from list or get drive item operations.`,
      },
      {
        name: 'top',
        type: 'integer',
        required: false,
        description: `Maximum number of permission entries to return per page. Accepts an integer between 1 and 100. Default: 25.`,
      },
    ],
  },
  {
    name: 'onedrive_list_recent_items',
    description: `List files recently viewed or modified by the signed-in user in OneDrive. Returns the most recently accessed items across all drives the user has access to.`,
    params: [
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of recent items to return. Accepts values 1–999.`,
      },
    ],
  },
  {
    name: 'onedrive_list_shared_items',
    description: `List files and folders that have been shared with the signed-in user from other people's OneDrive accounts or SharePoint sites.`,
    params: [
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of shared items to return. Accepts values 1–999.`,
      },
    ],
  },
  {
    name: 'onedrive_list_versions',
    description: `Retrieve the version history for a file in the signed-in user's personal OneDrive by item ID. Returns version ID, last modified time, size, and the identity of the user who made each change. To list versions in a specific drive by drive ID (e.g. a SharePoint document library), use onedrive_list_item_versions_in_drive instead.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file whose version history to list. Obtain item IDs from list or get drive item operations.`,
      },
      {
        name: 'top',
        type: 'integer',
        required: false,
        description: `Maximum number of version entries to return per page. Accepts an integer between 1 and 1000. Default: 25.`,
      },
    ],
  },
  {
    name: 'onedrive_move_drive_item',
    description: `Move a OneDrive file or folder to a different parent folder by updating its parentReference. Optionally rename the item during the move. Provide the destination folder's item ID as new_parent_id.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder to move. Obtain item IDs from list or get drive item operations.`,
      },
      {
        name: 'new_parent_id',
        type: 'string',
        required: true,
        description: `The item ID of the destination folder. Use "root" to move the item to the top level of OneDrive. Obtain folder IDs from list or get drive item operations.`,
      },
      {
        name: 'new_name',
        type: 'string',
        required: false,
        description: `Optional new name to assign to the item during the move. If omitted, the item keeps its current name.`,
      },
    ],
  },
  {
    name: 'onedrive_resolve_shared_link',
    description: `Resolve a OneDrive or SharePoint sharing URL (e.g. a link pasted from the browser) into a drive item, returning its full metadata including drive ID, item ID, name, and download URL. The sharing URL must be base64url-encoded before passing it as encoded_sharing_url. Encoding: base64url(url) with no padding, prefixed with "u!" — e.g. u!aHR0cHM6Ly4uLg.`,
    params: [
      {
        name: 'encoded_sharing_url',
        type: 'string',
        required: true,
        description: `The base64url-encoded sharing URL prefixed with "u!". To encode: take the full sharing URL, base64url-encode it (no padding), then prepend "u!". Example: "u!aHR0cHM6Ly9jb250b3NvLnNoYXJlcG9pbnQuY29tLy4uLg".`,
      },
    ],
  },
  {
    name: 'onedrive_restore_drive_item',
    description: `Restore a deleted OneDrive file or folder from the recycle bin back to its original location or an optionally specified destination. Provide new_parent_id and new_name to restore to a different location or with a different name.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the deleted OneDrive item to restore. Obtain deleted item IDs from recycle bin list operations.`,
      },
      {
        name: 'new_name',
        type: 'string',
        required: false,
        description: `Optional new name to assign to the item when restoring. If omitted, the item is restored with its original name.`,
      },
      {
        name: 'new_parent_id',
        type: 'string',
        required: false,
        description: `Optional item ID of the folder to restore the item into. If omitted, the item is restored to its original parent location.`,
      },
    ],
  },
  {
    name: 'onedrive_search_drive_items',
    description: `Search the signed-in user's personal OneDrive (root) for files and folders matching a query string. Searches across file names, content, and metadata. To search within a specific drive by drive ID (e.g. a SharePoint document library), use onedrive_search_items_in_drive instead.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query string to find files or folders by name or content. Example: "budget 2024" searches for items containing that text.`,
      },
      {
        name: '$select',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to return. Example: "id,name,size,webUrl" reduces response payload.`,
      },
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return. Accepts values 1–999.`,
      },
    ],
  },
  {
    name: 'onedrive_search_items_in_drive',
    description: `Search for files and folders within a specific drive by drive ID. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. To search the signed-in user's personal OneDrive, use onedrive_search_drive_items instead.`,
    params: [
      {
        name: 'drive_id',
        type: 'string',
        required: true,
        description: `The unique ID of the drive to search within. Obtain drive IDs from onedrive_list_drives or sharepoint_list_drives.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query string to find files or folders by name or content. Example: "budget 2024" searches for items containing that text.`,
      },
      {
        name: '$select',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to return. Example: "id,name,size,webUrl" reduces response payload.`,
      },
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return. Accepts values 1–999.`,
      },
    ],
  },
  {
    name: 'onedrive_unfollow_drive_item',
    description: `Stop following a OneDrive file or folder. The item will no longer appear in your list of followed items and you will stop receiving change notifications for it.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder to unfollow. The item must currently be in your followed items list. Obtain item IDs from list or get drive item operations.`,
      },
    ],
  },
  {
    name: 'onedrive_update_drive_item',
    description: `Update the metadata of a OneDrive file or folder by its item ID. Supports renaming (via name) and updating the description. At least one of name or description should be provided.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder to update. Obtain item IDs from list or get drive item operations.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the file or folder. Provide a short text description to attach to the item. Optional — can be updated independently from name.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the file or folder. Renaming a file preserves its extension unless explicitly changed. Optional — provide only when renaming.`,
      },
    ],
  },
  {
    name: 'onedrive_update_permission',
    description: `Update the roles assigned to an existing permission on a OneDrive file or folder. Use this to change a user's access level from read to write or vice versa. Requires the item ID and the specific permission ID to update.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneDrive file or folder whose permission to update. Obtain item IDs from list or get drive item operations.`,
      },
      {
        name: 'permission_id',
        type: 'string',
        required: true,
        description: `The unique ID of the permission to update. Obtain permission IDs from the list permissions operation on the same item.`,
      },
      {
        name: 'roles',
        type: 'array',
        required: true,
        description: `New array of permission roles to assign. Use "read" for view-only access and "write" for edit access. Example: ["write"].`,
      },
    ],
  },
  {
    name: 'onedrive_upload_large_file',
    description: `Create a resumable upload session for uploading large files (greater than 4 MB) to OneDrive. Returns an upload URL that the caller uses to upload file bytes in separate PATCH requests. The file is placed under the specified parent folder with the given filename.`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `The name of the file to create or replace in OneDrive, including extension. Example: "report.xlsx".`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `The ID of the parent folder where the file will be uploaded. Use "root" to upload to the top-level OneDrive folder. Obtain folder IDs from list or get drive item operations.`,
      },
      {
        name: 'conflict_behavior',
        type: 'string',
        required: false,
        description: `Behavior when a file with the same name already exists. "fail" aborts the upload, "replace" overwrites the existing file, "rename" saves with a new name. Default: replace.`,
      },
    ],
  },
]
