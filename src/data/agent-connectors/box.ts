import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'box_collaboration_create',
    description: `Grants a user or group access to a file or folder.`,
    params: [
      {
        name: 'accessible_by_id',
        type: 'string',
        required: true,
        description: `ID of the user or group to collaborate with.`,
      },
      {
        name: 'accessible_by_type',
        type: 'string',
        required: true,
        description: `Type: user or group.`,
      },
      { name: 'item_id', type: 'string', required: true, description: `ID of the file or folder.` },
      {
        name: 'item_type',
        type: 'string',
        required: true,
        description: `Type of item: file or folder.`,
      },
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `Collaboration role: viewer, previewer, uploader, previewer_uploader, viewer_uploader, co-owner, or editor.`,
      },
      {
        name: 'can_view_path',
        type: 'string',
        required: false,
        description: `Allow user to see path to item (true/false).`,
      },
      {
        name: 'expires_at',
        type: 'string',
        required: false,
        description: `Expiry date in ISO 8601 format.`,
      },
      {
        name: 'notify',
        type: 'string',
        required: false,
        description: `Notify collaborator via email (true/false).`,
      },
    ],
  },
  {
    name: 'box_collaboration_delete',
    description: `Removes a collaboration, revoking user or group access.`,
    params: [
      {
        name: 'collaboration_id',
        type: 'string',
        required: true,
        description: `ID of the collaboration to delete.`,
      },
    ],
  },
  {
    name: 'box_collaboration_get',
    description: `Retrieves details of a specific collaboration.`,
    params: [
      {
        name: 'collaboration_id',
        type: 'string',
        required: true,
        description: `ID of the collaboration.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: `Xero tenant (organisation) ID.`,
      },
    ],
  },
  {
    name: 'box_collaboration_update',
    description: `Updates the role or status of a collaboration.`,
    params: [
      {
        name: 'collaboration_id',
        type: 'string',
        required: true,
        description: `ID of the collaboration.`,
      },
      {
        name: 'can_view_path',
        type: 'boolean',
        required: false,
        description: `Allow user to see path to item.`,
      },
      {
        name: 'expires_at',
        type: 'string',
        required: false,
        description: `New expiry date in ISO 8601 format.`,
      },
      { name: 'role', type: 'string', required: false, description: `New collaboration role.` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Collaboration status: accepted or rejected.`,
      },
    ],
  },
  {
    name: 'box_collection_items_list',
    description: `Retrieves the items in a collection (e.g. Favorites).`,
    params: [
      {
        name: 'collection_id',
        type: 'string',
        required: true,
        description: `ID of the collection.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max results.` },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
    ],
  },
  {
    name: 'box_collections_list',
    description: `Retrieves all collections (e.g. Favorites) for the user.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max results.` },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
    ],
  },
  {
    name: 'box_comment_create',
    description: `Adds a comment to a file.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `ID of the file to comment on.`,
      },
      {
        name: 'item_type',
        type: 'string',
        required: true,
        description: `Type of item: file or comment.`,
      },
      { name: 'message', type: 'string', required: true, description: `Text of the comment.` },
      {
        name: 'tagged_message',
        type: 'string',
        required: false,
        description: `Comment text with @mentions using @[user_id:user_name] syntax.`,
      },
    ],
  },
  {
    name: 'box_comment_delete',
    description: `Removes a comment.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `ID of the comment to delete.`,
      },
    ],
  },
  {
    name: 'box_comment_get',
    description: `Retrieves a comment.`,
    params: [
      { name: 'comment_id', type: 'string', required: true, description: `ID of the comment.` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'box_comment_update',
    description: `Updates the text of a comment.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `ID of the comment to update.`,
      },
      { name: 'message', type: 'string', required: true, description: `New text for the comment.` },
    ],
  },
  {
    name: 'box_events_list',
    description: `Retrieves events from the event stream.`,
    params: [
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Return events after this date (ISO 8601).`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Return events before this date (ISO 8601).`,
      },
      {
        name: 'event_type',
        type: 'string',
        required: false,
        description: `Comma-separated list of event types to filter.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max events to return.` },
      {
        name: 'stream_position',
        type: 'string',
        required: false,
        description: `Pagination position from a previous response.`,
      },
      {
        name: 'stream_type',
        type: 'string',
        required: false,
        description: `Event stream type: all, changes, sync, or admin_logs.`,
      },
    ],
  },
  {
    name: 'box_file_collaborations_list',
    description: `Retrieves all collaborations on a file.`,
    params: [
      { name: 'file_id', type: 'string', required: true, description: `ID of the file.` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'box_file_comments_list',
    description: `Retrieves all comments on a file.`,
    params: [
      { name: 'file_id', type: 'string', required: true, description: `ID of the file.` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'box_file_copy',
    description: `Creates a copy of a file in a specified folder.`,
    params: [
      { name: 'file_id', type: 'string', required: true, description: `ID of the file to copy.` },
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `ID of the destination folder.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the copied file (optional).`,
      },
    ],
  },
  {
    name: 'box_file_delete',
    description: `Moves a file to the trash.`,
    params: [
      { name: 'file_id', type: 'string', required: true, description: `ID of the file to delete.` },
    ],
  },
  {
    name: 'box_file_get',
    description: `Retrieves detailed information about a file.`,
    params: [
      { name: 'file_id', type: 'string', required: true, description: `ID of the file.` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'box_file_metadata_create',
    description: `Applies metadata to a file.`,
    params: [
      {
        name: 'data_json',
        type: 'string',
        required: true,
        description: `JSON object of metadata fields and values.`,
      },
      { name: 'file_id', type: 'string', required: true, description: `ID of the file.` },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `Scope: global or enterprise.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `Metadata template key.`,
      },
    ],
  },
  {
    name: 'box_file_metadata_delete',
    description: `Removes a metadata instance from a file.`,
    params: [
      { name: 'file_id', type: 'string', required: true, description: `ID of the file.` },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `Scope: global or enterprise.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `Metadata template key.`,
      },
    ],
  },
  {
    name: 'box_file_metadata_get',
    description: `Retrieves a specific metadata instance on a file.`,
    params: [
      { name: 'file_id', type: 'string', required: true, description: `ID of the file.` },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `Scope: global or enterprise.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `Metadata template key.`,
      },
    ],
  },
  {
    name: 'box_file_metadata_list',
    description: `Retrieves all metadata instances attached to a file.`,
    params: [{ name: 'file_id', type: 'string', required: true, description: `ID of the file.` }],
  },
  {
    name: 'box_file_tasks_list',
    description: `Retrieves all tasks associated with a file.`,
    params: [{ name: 'file_id', type: 'string', required: true, description: `ID of the file.` }],
  },
  {
    name: 'box_file_thumbnail_get',
    description: `Retrieves a thumbnail image for a file.`,
    params: [
      {
        name: 'extension',
        type: 'string',
        required: true,
        description: `Thumbnail format: jpg or png.`,
      },
      { name: 'file_id', type: 'string', required: true, description: `ID of the file.` },
      {
        name: 'min_height',
        type: 'integer',
        required: false,
        description: `Minimum height of the thumbnail in pixels.`,
      },
      {
        name: 'min_width',
        type: 'integer',
        required: false,
        description: `Minimum width of the thumbnail in pixels.`,
      },
    ],
  },
  {
    name: 'box_file_update',
    description: `Updates a file's name, description, tags, or moves it to another folder.`,
    params: [
      { name: 'file_id', type: 'string', required: true, description: `ID of the file to update.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the file.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the file.` },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of the folder to move the file into.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `Comma-separated list of tags. Pass as JSON string.`,
      },
    ],
  },
  {
    name: 'box_file_versions_list',
    description: `Retrieves all previous versions of a file.`,
    params: [{ name: 'file_id', type: 'string', required: true, description: `ID of the file.` }],
  },
  {
    name: 'box_folder_collaborations_list',
    description: `Retrieves all collaborations on a folder.`,
    params: [
      { name: 'folder_id', type: 'string', required: true, description: `ID of the folder.` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'box_folder_copy',
    description: `Creates a copy of a folder and its contents.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `ID of the folder to copy.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `ID of the destination folder.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the copied folder (optional).`,
      },
    ],
  },
  {
    name: 'box_folder_create',
    description: `Creates a new folder inside a parent folder.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the new folder.` },
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `ID of the parent folder. Use '0' for root.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'box_folder_delete',
    description: `Moves a folder to the trash.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `ID of the folder to delete.`,
      },
      {
        name: 'recursive',
        type: 'string',
        required: false,
        description: `Delete non-empty folders recursively (true/false).`,
      },
    ],
  },
  {
    name: 'box_folder_get',
    description: `Retrieves a folder's details and its items.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `ID of the folder. Use '0' for root.`,
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction: ASC or DESC.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max items to return (max 1000).`,
      },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order: id, name, date, or size.`,
      },
    ],
  },
  {
    name: 'box_folder_items_list',
    description: `Retrieves a paginated list of items in a folder.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `ID of the folder. Use '0' for root.`,
      },
      { name: 'direction', type: 'string', required: false, description: `ASC or DESC.` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max items to return (max 1000).`,
      },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field: id, name, date, or size.`,
      },
    ],
  },
  {
    name: 'box_folder_metadata_list',
    description: `Retrieves all metadata instances on a folder.`,
    params: [
      { name: 'folder_id', type: 'string', required: true, description: `ID of the folder.` },
    ],
  },
  {
    name: 'box_folder_update',
    description: `Updates a folder's name, description, or moves it.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `ID of the folder to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the folder.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the folder.` },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of the new parent folder to move into.`,
      },
    ],
  },
  {
    name: 'box_group_create',
    description: `Creates a new group in the enterprise.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the group.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the group.`,
      },
      {
        name: 'invitability_level',
        type: 'string',
        required: false,
        description: `Who can invite to group: admins_only, admins_and_members, all_managed_users.`,
      },
      {
        name: 'member_viewability_level',
        type: 'string',
        required: false,
        description: `Who can view group members: admins_only, admins_and_members, all_managed_users.`,
      },
      {
        name: 'provenance',
        type: 'string',
        required: false,
        description: `Identifier to distinguish manually vs synced groups.`,
      },
    ],
  },
  {
    name: 'box_group_delete',
    description: `Permanently deletes a group.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `ID of the group to delete.`,
      },
    ],
  },
  {
    name: 'box_group_get',
    description: `Retrieves information about a group.`,
    params: [
      { name: 'group_id', type: 'string', required: true, description: `ID of the group.` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'box_group_members_list',
    description: `Retrieves all members of a group.`,
    params: [
      { name: 'group_id', type: 'string', required: true, description: `ID of the group.` },
      { name: 'limit', type: 'integer', required: false, description: `Max results.` },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
    ],
  },
  {
    name: 'box_group_membership_add',
    description: `Adds a user to a group.`,
    params: [
      { name: 'group_id', type: 'string', required: true, description: `ID of the group.` },
      { name: 'user_id', type: 'string', required: true, description: `ID of the user to add.` },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Role in the group: member or admin.`,
      },
    ],
  },
  {
    name: 'box_group_membership_get',
    description: `Retrieves a specific group membership.`,
    params: [
      {
        name: 'group_membership_id',
        type: 'string',
        required: true,
        description: `ID of the group membership.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'box_group_membership_remove',
    description: `Removes a user from a group.`,
    params: [
      {
        name: 'group_membership_id',
        type: 'string',
        required: true,
        description: `ID of the group membership to remove.`,
      },
    ],
  },
  {
    name: 'box_group_membership_update',
    description: `Updates a user's role in a group.`,
    params: [
      {
        name: 'group_membership_id',
        type: 'string',
        required: true,
        description: `ID of the membership to update.`,
      },
      { name: 'role', type: 'string', required: false, description: `New role: member or admin.` },
    ],
  },
  {
    name: 'box_group_update',
    description: `Updates a group's properties.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `ID of the group to update.`,
      },
      { name: 'description', type: 'string', required: false, description: `New description.` },
      {
        name: 'invitability_level',
        type: 'string',
        required: false,
        description: `Who can invite: admins_only, admins_and_members, all_managed_users.`,
      },
      {
        name: 'member_viewability_level',
        type: 'string',
        required: false,
        description: `Who can view members.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the group.` },
    ],
  },
  {
    name: 'box_groups_list',
    description: `Retrieves all groups in the enterprise.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: 'filter_term',
        type: 'string',
        required: false,
        description: `Filter groups by name.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max results.` },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
    ],
  },
  {
    name: 'box_metadata_template_get',
    description: `Retrieves a metadata template schema.`,
    params: [
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `Scope of the template: global or enterprise.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `Key of the metadata template.`,
      },
    ],
  },
  {
    name: 'box_metadata_templates_list',
    description: `Retrieves all metadata templates for the enterprise.`,
    params: [
      { name: 'limit', type: 'integer', required: false, description: `Max results.` },
      { name: 'marker', type: 'string', required: false, description: `Pagination marker.` },
    ],
  },
  {
    name: 'box_recent_items_list',
    description: `Retrieves files and folders accessed recently.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max results.` },
      { name: 'marker', type: 'string', required: false, description: `Pagination marker.` },
    ],
  },
  {
    name: 'box_search',
    description: `Searches files, folders, and web links in Box.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query string.` },
      {
        name: 'ancestor_folder_ids',
        type: 'string',
        required: false,
        description: `Comma-separated folder IDs to search within.`,
      },
      {
        name: 'content_types',
        type: 'string',
        required: false,
        description: `Comma-separated content types: name, description, tag, comments, file_content.`,
      },
      {
        name: 'created_at_range',
        type: 'string',
        required: false,
        description: `Date range in ISO 8601: 2024-01-01T00:00:00Z,2024-12-31T23:59:59Z`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: 'file_extensions',
        type: 'string',
        required: false,
        description: `Comma-separated file extensions to filter.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max results (max 200).` },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
      {
        name: 'owner_user_ids',
        type: 'string',
        required: false,
        description: `Comma-separated user IDs.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Search scope: user_content or enterprise_content.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter by type: file, folder, or web_link.`,
      },
      {
        name: 'updated_at_range',
        type: 'string',
        required: false,
        description: `Date range for last updated.`,
      },
    ],
  },
  {
    name: 'box_shared_link_file_create',
    description: `Creates or updates a shared link for a file.`,
    params: [
      { name: 'file_id', type: 'string', required: true, description: `ID of the file.` },
      {
        name: 'access',
        type: 'string',
        required: false,
        description: `Shared link access: open, company, or collaborators.`,
      },
      {
        name: 'can_download',
        type: 'boolean',
        required: false,
        description: `Allow download (true/false).`,
      },
      {
        name: 'can_preview',
        type: 'boolean',
        required: false,
        description: `Allow preview (true/false).`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `Password to protect the shared link.`,
      },
      {
        name: 'unshared_at',
        type: 'string',
        required: false,
        description: `Expiry date in ISO 8601 format.`,
      },
    ],
  },
  {
    name: 'box_shared_link_folder_create',
    description: `Creates or updates a shared link for a folder.`,
    params: [
      { name: 'folder_id', type: 'string', required: true, description: `ID of the folder.` },
      {
        name: 'access',
        type: 'string',
        required: false,
        description: `Shared link access: open, company, or collaborators.`,
      },
      {
        name: 'can_download',
        type: 'boolean',
        required: false,
        description: `Allow download (true/false).`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `Password to protect the shared link.`,
      },
      {
        name: 'unshared_at',
        type: 'string',
        required: false,
        description: `Expiry date in ISO 8601 format.`,
      },
    ],
  },
  {
    name: 'box_task_assignment_create',
    description: `Assigns a task to a user.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `ID of the task to assign.` },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `ID of the user to assign the task to.`,
      },
      {
        name: 'user_login',
        type: 'string',
        required: false,
        description: `Email login of the user (alternative to user_id).`,
      },
    ],
  },
  {
    name: 'box_task_assignment_delete',
    description: `Removes a task assignment from a user.`,
    params: [
      {
        name: 'task_assignment_id',
        type: 'string',
        required: true,
        description: `ID of the task assignment to remove.`,
      },
    ],
  },
  {
    name: 'box_task_assignment_get',
    description: `Retrieves a specific task assignment.`,
    params: [
      {
        name: 'task_assignment_id',
        type: 'string',
        required: true,
        description: `ID of the task assignment.`,
      },
    ],
  },
  {
    name: 'box_task_assignment_update',
    description: `Updates a task assignment (complete, approve, or reject).`,
    params: [
      {
        name: 'task_assignment_id',
        type: 'string',
        required: true,
        description: `ID of the task assignment.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Optional message/comment for the resolution.`,
      },
      {
        name: 'resolution_state',
        type: 'string',
        required: false,
        description: `Resolution state: completed, incomplete, approved, or rejected.`,
      },
    ],
  },
  {
    name: 'box_task_assignments_list',
    description: `Retrieves all assignments for a task.`,
    params: [{ name: 'task_id', type: 'string', required: true, description: `ID of the task.` }],
  },
  {
    name: 'box_task_create',
    description: `Creates a task on a file.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `ID of the file to attach the task to.`,
      },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Action: review or complete.`,
      },
      {
        name: 'completion_rule',
        type: 'string',
        required: false,
        description: `Completion rule: all_assignees or any_assignee.`,
      },
      {
        name: 'due_at',
        type: 'string',
        required: false,
        description: `Due date in ISO 8601 format.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Task message/description.`,
      },
    ],
  },
  {
    name: 'box_task_delete',
    description: `Removes a task from a file.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `ID of the task to delete.` },
    ],
  },
  {
    name: 'box_task_get',
    description: `Retrieves a task's details.`,
    params: [{ name: 'task_id', type: 'string', required: true, description: `ID of the task.` }],
  },
  {
    name: 'box_task_update',
    description: `Updates a task's message, due date, or completion rule.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `ID of the task to update.` },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `New action: review or complete.`,
      },
      {
        name: 'completion_rule',
        type: 'string',
        required: false,
        description: `New completion rule: all_assignees or any_assignee.`,
      },
      {
        name: 'due_at',
        type: 'string',
        required: false,
        description: `New due date in ISO 8601 format.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `New message for the task.`,
      },
    ],
  },
  {
    name: 'box_trash_file_permanently_delete',
    description: `Permanently deletes a trashed file.`,
    params: [
      { name: 'file_id', type: 'string', required: true, description: `ID of the trashed file.` },
    ],
  },
  {
    name: 'box_trash_file_restore',
    description: `Restores a file from the trash.`,
    params: [
      { name: 'file_id', type: 'string', required: true, description: `ID of the trashed file.` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name if original name is taken.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `Parent folder ID if original is unavailable.`,
      },
    ],
  },
  {
    name: 'box_trash_folder_permanently_delete',
    description: `Permanently deletes a trashed folder.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `ID of the trashed folder.`,
      },
    ],
  },
  {
    name: 'box_trash_folder_restore',
    description: `Restores a folder from the trash.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `ID of the trashed folder.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name if original is taken.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `New parent folder ID if original is unavailable.`,
      },
    ],
  },
  {
    name: 'box_trash_list',
    description: `Retrieves items in the user's trash.`,
    params: [
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction: ASC or DESC.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max results.` },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field: name, date, or size.`,
      },
    ],
  },
  {
    name: 'box_user_create',
    description: `Creates a new user in the enterprise.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Full name of the user.` },
      {
        name: 'is_platform_access_only',
        type: 'boolean',
        required: false,
        description: `Set true for app users (no login).`,
      },
      {
        name: 'login',
        type: 'string',
        required: false,
        description: `Email address (login) for managed users.`,
      },
      { name: 'role', type: 'string', required: false, description: `User role: user or coadmin.` },
      {
        name: 'space_amount',
        type: 'integer',
        required: false,
        description: `Storage quota in bytes (-1 for unlimited).`,
      },
    ],
  },
  {
    name: 'box_user_delete',
    description: `Removes a user from the enterprise.`,
    params: [
      { name: 'user_id', type: 'string', required: true, description: `ID of the user to delete.` },
      {
        name: 'force',
        type: 'string',
        required: false,
        description: `Force deletion even if user owns content (true/false).`,
      },
      {
        name: 'notify',
        type: 'string',
        required: false,
        description: `Notify user via email (true/false).`,
      },
    ],
  },
  {
    name: 'box_user_get',
    description: `Retrieves information about a specific user.`,
    params: [
      { name: 'user_id', type: 'string', required: true, description: `ID of the user.` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'box_user_me_get',
    description: `Retrieves information about the currently authenticated user.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'box_user_memberships_list',
    description: `Retrieves all group memberships for a user.`,
    params: [
      { name: 'user_id', type: 'string', required: true, description: `ID of the user.` },
      { name: 'limit', type: 'integer', required: false, description: `Max results.` },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
    ],
  },
  {
    name: 'box_user_update',
    description: `Updates a user's properties in the enterprise.`,
    params: [
      { name: 'user_id', type: 'string', required: true, description: `ID of the user to update.` },
      { name: 'name', type: 'string', required: false, description: `New full name.` },
      { name: 'role', type: 'string', required: false, description: `New role: user or coadmin.` },
      {
        name: 'space_amount',
        type: 'integer',
        required: false,
        description: `Storage quota in bytes.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status: active, inactive, or cannot_delete_edit.`,
      },
      {
        name: 'tracking_codes',
        type: 'string',
        required: false,
        description: `Tracking codes as JSON array string.`,
      },
    ],
  },
  {
    name: 'box_users_list',
    description: `Retrieves all users in the enterprise.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: 'filter_term',
        type: 'string',
        required: false,
        description: `Filter users by name or login.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max users to return.` },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
      {
        name: 'user_type',
        type: 'string',
        required: false,
        description: `Filter by type: all, managed, or external.`,
      },
    ],
  },
  {
    name: 'box_web_link_create',
    description: `Creates a web link (bookmark) inside a folder.`,
    params: [
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `ID of the parent folder.`,
      },
      { name: 'url', type: 'string', required: true, description: `URL of the web link.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the web link.`,
      },
      { name: 'name', type: 'string', required: false, description: `Name for the web link.` },
    ],
  },
  {
    name: 'box_web_link_delete',
    description: `Removes a web link.`,
    params: [
      {
        name: 'web_link_id',
        type: 'string',
        required: true,
        description: `ID of the web link to delete.`,
      },
    ],
  },
  {
    name: 'box_web_link_get',
    description: `Retrieves a web link's details.`,
    params: [
      { name: 'web_link_id', type: 'string', required: true, description: `ID of the web link.` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'box_web_link_update',
    description: `Updates a web link's URL, name, or description.`,
    params: [
      {
        name: 'web_link_id',
        type: 'string',
        required: true,
        description: `ID of the web link to update.`,
      },
      { name: 'description', type: 'string', required: false, description: `New description.` },
      { name: 'name', type: 'string', required: false, description: `New name.` },
      { name: 'parent_id', type: 'string', required: false, description: `New parent folder ID.` },
      { name: 'url', type: 'string', required: false, description: `New URL.` },
    ],
  },
  {
    name: 'box_webhook_create',
    description: `Creates a webhook to receive event notifications.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `HTTPS URL to receive webhook notifications.`,
      },
      {
        name: 'target_id',
        type: 'string',
        required: true,
        description: `ID of the file or folder to watch.`,
      },
      {
        name: 'target_type',
        type: 'string',
        required: true,
        description: `Type of target: file or folder.`,
      },
      {
        name: 'triggers',
        type: 'array',
        required: true,
        description: `Array of trigger events, e.g. ["FILE.UPLOADED","FILE.DELETED"].`,
      },
    ],
  },
  {
    name: 'box_webhook_delete',
    description: `Removes a webhook.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `ID of the webhook to delete.`,
      },
    ],
  },
  {
    name: 'box_webhook_get',
    description: `Retrieves a webhook's details.`,
    params: [
      { name: 'webhook_id', type: 'string', required: true, description: `ID of the webhook.` },
    ],
  },
  {
    name: 'box_webhook_update',
    description: `Updates a webhook's address or triggers.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `ID of the webhook to update.`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `New HTTPS URL for notifications.`,
      },
      { name: 'target_id', type: 'string', required: false, description: `New target ID.` },
      {
        name: 'target_type',
        type: 'string',
        required: false,
        description: `New target type: file or folder.`,
      },
      {
        name: 'triggers',
        type: 'array',
        required: false,
        description: `New array of trigger events, e.g. ["FILE.UPLOADED","FILE.DELETED"].`,
      },
    ],
  },
  {
    name: 'box_webhooks_list',
    description: `Retrieves all webhooks for the application.`,
    params: [
      { name: 'limit', type: 'integer', required: false, description: `Max results.` },
      { name: 'marker', type: 'string', required: false, description: `Pagination marker.` },
    ],
  },
]
