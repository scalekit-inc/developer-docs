import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'sharepoint_add_group_member',
    description: `Add an Azure AD user to a Microsoft 365 group (including SharePoint site groups) by providing the group ID and the user's object ID. This uses the Graph API directoryObjects reference endpoint to create the membership link.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The Azure AD object ID of the group to add the member to. Example: '7d8a5b3c-1234-5678-abcd-ef0123456789'.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The Azure AD object ID of the user to add to the group. Use the find_user_by_email tool to resolve an email to an object ID. Example: 'aaaabbbb-1234-5678-abcd-ef0123456789'.`,
      },
    ],
  },
  {
    name: 'sharepoint_add_role_assignment',
    description: `Grant a user or group a role (read, write, or owner) on a SharePoint site by adding a permission entry. Provide either user_id or group_id (not both). The roles array should contain one or more of: 'read', 'write', 'owner'.`,
    params: [
      {
        name: 'roles',
        type: 'array',
        required: true,
        description: `Array of roles to grant. Valid values are 'read', 'write', and 'owner'. Example: ["write"] grants write (contribute) permission.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site on which to add the permission. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: 'group_id',
        type: 'string',
        required: false,
        description: `Azure AD group object ID to grant the role to. Provide either user_id or group_id — not both. Example: '7d8a5b3c-1234-5678-abcd-ef0123456789'.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Azure AD user object ID to grant the role to. Provide either user_id or group_id — not both. Example: 'aaaabbbb-1234-5678-abcd-ef0123456789'.`,
      },
    ],
  },
  {
    name: 'sharepoint_checkin_file',
    description: `Check in a checked-out file in a SharePoint document library to make the version available to others. Optionally provide a comment describing the changes and specify the check-in type. Requires the file to be checked out first.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique drive item ID of the file to check in. The file must currently be checked out. Obtain item IDs from list drive items or get drive item operations.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the file. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
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
        description: `An optional comment to associate with the checked-in version, describing the changes made.`,
      },
    ],
  },
  {
    name: 'sharepoint_checkout_file',
    description: `Check out a file in a SharePoint document library to prevent others from editing it while you make changes. The file must be checked back in using the check-in operation when editing is complete.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique drive item ID of the file to check out. Obtain item IDs from list drive items or get drive item operations.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the file. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
    ],
  },
  {
    name: 'sharepoint_create_list',
    description: `Create a new list in a SharePoint site. Specify a display name and optionally a template type (e.g., genericList, documentLibrary, events) and description. Returns the newly created list.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `Display name for the new list. Example: 'Project Tasks'.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site in which to create the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the new list. Example: 'Tracks project tasks and assignments.'`,
      },
      {
        name: 'template',
        type: 'string',
        required: false,
        description: `SharePoint list template to use. Valid values: genericList (default), documentLibrary, survey, links, announcements, contacts, events, tasks.`,
      },
    ],
  },
  {
    name: 'sharepoint_create_list_field',
    description: `Add a new column (field) to a SharePoint list. Specify the internal column name, column type (text, number, boolean, dateTime, choice, hyperlinkOrPicture, personOrGroup), and optionally a display name and description. The tool emits the appropriate Microsoft Graph column definition block for the chosen type.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint list to which the column will be added. Use the list GUID or display name.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Internal name for the new column. Used as the key in item fields objects. Must be unique within the list and contain no spaces (use camelCase or underscores). Example: 'taskStatus'.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: 'column_type',
        type: 'string',
        required: false,
        description: `Type of column to create. Determines which Microsoft Graph column configuration block is used. Valid values: text (single or multi-line text), number (numeric values), boolean (yes/no checkbox), dateTime (date and/or time), choice (dropdown or radio from a fixed list), hyperlinkOrPicture (URL or image), personOrGroup (people picker). Default: text.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the new column. Appears as a tooltip or hint in the SharePoint list UI.`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `Human-readable display name for the column as shown in the SharePoint list UI. If omitted, the internal name is used.`,
      },
    ],
  },
  {
    name: 'sharepoint_create_list_item',
    description: `Create a new item in a SharePoint list. Provide a 'fields' object whose keys are the internal column names and whose values are the field data. The required 'Title' field sets the item's primary display name.`,
    params: [
      {
        name: 'fields',
        type: 'object',
        required: true,
        description: `Object containing the field values for the new item. Keys are internal column names (e.g., 'Title', 'Status', 'DueDate'). Example: {"Title": "New Task", "Status": "In Progress"}.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint list in which to create the item. Use the list GUID or display name.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
    ],
  },
  {
    name: 'sharepoint_create_subsite',
    description: `Create a new subsite under an existing SharePoint site using the Microsoft Graph beta API. Requires the parent site ID and display name. Optionally specify a description and web template (e.g., 'STS#0' for a team site).`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `Display name of the new subsite. Example: 'Marketing Q3 Campaign'.`,
      },
      {
        name: 'parent_site_id',
        type: 'string',
        required: true,
        description: `ID of the parent SharePoint site under which the subsite will be created. Use a site GUID or 'root' for the tenant root site.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the new subsite. Example: 'Site for the Q3 marketing campaign team.'`,
      },
      {
        name: 'web_template',
        type: 'string',
        required: false,
        description: `SharePoint web template to use when creating the subsite. Common values: 'STS#0' (Team Site), 'BLOG#0' (Blog Site), 'BDR#0' (Document Center). Defaults to the API default if not specified.`,
      },
    ],
  },
  {
    name: 'sharepoint_delete_list',
    description: `Permanently delete a SharePoint list from a site. This action is irreversible and removes the list along with all its items and metadata.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint list to delete. Use the list GUID or the list's display name.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
    ],
  },
  {
    name: 'sharepoint_delete_list_field',
    description: `Permanently delete a column (field) from a SharePoint list. This action is irreversible and removes the column definition and all data stored in that column for every list item.`,
    params: [
      {
        name: 'column_id',
        type: 'string',
        required: true,
        description: `ID of the column to delete. Use the column GUID returned by the list fields endpoint.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint list that contains the column. Use the list GUID or display name.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
    ],
  },
  {
    name: 'sharepoint_delete_list_item',
    description: `Permanently delete an item from a SharePoint list. This action is irreversible and removes the item and all its field data.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `ID of the list item to delete. This is the numeric or string identifier of the item within the list.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint list that contains the item. Use the list GUID or display name.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
    ],
  },
  {
    name: 'sharepoint_delete_role_assignment',
    description: `Remove a specific permission entry from a SharePoint site by deleting its permission ID. This permanently removes the granted access for the user or group associated with that permission.`,
    params: [
      {
        name: 'permission_id',
        type: 'string',
        required: true,
        description: `The ID of the permission entry to delete. Obtain this from the list permissions endpoint. Example: 'aGVyZUlzVGhlV2F5VGhlUG93ZXJJcw'.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site from which to remove the permission. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
    ],
  },
  {
    name: 'sharepoint_delete_webhook',
    description: `Delete a Microsoft Graph change notification subscription (webhook) by its subscription ID. After deletion, no further notifications will be sent to the registered notification URL for this subscription.`,
    params: [
      {
        name: 'subscription_id',
        type: 'string',
        required: true,
        description: `The ID of the subscription to delete. Obtain this from the create subscription response or by listing subscriptions. Example: 'abc123de-4567-89ab-cdef-0123456789ab'.`,
      },
    ],
  },
  {
    name: 'sharepoint_download_file',
    description: `Download the binary content of a file from a SharePoint document library by its item ID. The response is the raw file bytes (not JSON). For text files this will be readable text; for binary files (images, Office documents) it will be binary data. Use the item ID from list or get drive item operations.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique drive item ID of the file to download from the SharePoint site's document library. Obtain item IDs from list drive items or search drive items operations.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the file. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
    ],
  },
  {
    name: 'sharepoint_find_user_by_email',
    description: `Look up an Azure Active Directory user by their email address (UPN). Returns the user's object ID, display name, and other profile properties. This is useful for resolving a user email to an object ID before adding them to a SharePoint site or group.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `The email address (user principal name) of the Azure AD user to look up. Example: 'john.doe@contoso.com'.`,
      },
    ],
  },
  {
    name: 'sharepoint_follow_document',
    description: `Follow a SharePoint document or OneDrive file so it appears in the signed-in user's followed documents list. Provide the drive item ID of the document to follow.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The ID of the drive item (document) to follow. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.`,
      },
    ],
  },
  {
    name: 'sharepoint_get_list',
    description: `Retrieve a specific SharePoint list by its ID within a site. Optionally expand related resources such as columns and items to retrieve list metadata in a single call.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID or name of the SharePoint list to retrieve. Can be the list GUID or the list's display name (URL-encoded).`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site containing the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: '$expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of related resources to expand. Example: 'columns,items' to include column definitions and list items in the response.`,
      },
    ],
  },
  {
    name: 'sharepoint_get_list_item',
    description: `Retrieve a single item from a SharePoint list by its item ID. Use '$expand=fields' to include the column values in the response.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `ID of the list item to retrieve. This is the numeric or GUID identifier of the item within the list.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint list that contains the item. Use the list GUID or display name.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: '$expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of related resources to expand. Default is 'fields' to include column values. Example: 'fields'.`,
      },
      {
        name: '$select',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to return. Example: 'id,createdDateTime,fields'.`,
      },
    ],
  },
  {
    name: 'sharepoint_get_search_suggestions',
    description: `Get search query suggestions for SharePoint content using the Microsoft Search beta API. Returns autocomplete suggestions based on the provided search text to help users refine their queries.`,
    params: [
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `The partial search term for which to retrieve suggestions. Example: 'proj' returns suggestions like 'project plan', 'project budget'.`,
      },
    ],
  },
  {
    name: 'sharepoint_get_site',
    description: `Retrieve properties of a SharePoint site by its ID. Use 'root' for the tenant root site, a GUID for a specific site, or the format '<hostname>:/sites/<path>' (e.g., 'contoso.sharepoint.com:/sites/Marketing').`,
    params: [
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site to retrieve. Use 'root' for the tenant root site, a site GUID, or the format '<hostname>:/sites/<path>' (e.g., 'contoso.sharepoint.com:/sites/Marketing').`,
      },
    ],
  },
  {
    name: 'sharepoint_list_content_types',
    description: `List all content types defined in a SharePoint site. Supports OData filtering, field selection, and pagination via $top. Content types define the metadata schema for lists and libraries.`,
    params: [
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site whose content types to retrieve. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: '$filter',
        type: 'string',
        required: false,
        description: `OData filter expression to narrow results. Example: "isBuiltIn eq false" to return only custom content types.`,
      },
      {
        name: '$select',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to return for each content type. Example: 'id,name,description,isBuiltIn'.`,
      },
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of content types to return per page. Default is determined by the API.`,
      },
    ],
  },
  {
    name: 'sharepoint_list_drives',
    description: `List all drives (document libraries) within a specific SharePoint site. Returns drive IDs, names, and types. Use the returned drive IDs with other drive item tools to access files within that library. To list all drives accessible to the signed-in user across all sites, use onedrive_list_drives instead.`,
    params: [
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `The unique ID of the SharePoint site whose drives to list. Obtain site IDs from sharepoint_get_site or sharepoint_list_sites.`,
      },
      {
        name: '$select',
        type: 'string',
        required: false,
        description: `Comma-separated list of drive properties to return. Example: "id,name,driveType" reduces response payload.`,
      },
    ],
  },
  {
    name: 'sharepoint_list_file_versions',
    description: `List all versions of a file in a SharePoint document library. Returns version metadata including version number, last modified time, size, and the user who made each change.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique drive item ID of the file whose version history to retrieve. Obtain item IDs from list drive items or get drive item operations.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the file. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of versions to return per page. Default is determined by the API.`,
      },
    ],
  },
  {
    name: 'sharepoint_list_followed_sites',
    description: `List all SharePoint sites that the signed-in user is following. Returns site IDs, names, URLs, and descriptions. Use the returned site IDs with sharepoint_get_site or sharepoint_list_drives to explore the site's content.`,
    params: [],
  },
  {
    name: 'sharepoint_list_list_fields',
    description: `List all column definitions (fields) for a SharePoint list. Returns metadata for each column including its name, type, and configuration. Supports OData filtering, field selection, and pagination.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint list whose column definitions to retrieve. Use the list GUID or display name.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: '$filter',
        type: 'string',
        required: false,
        description: `OData filter expression to narrow results. Example: "hidden eq false" to return only visible columns.`,
      },
      {
        name: '$select',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to return for each column. Example: 'id,name,displayName,columnGroup,hidden'.`,
      },
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of columns to return per page. Default is determined by the API.`,
      },
    ],
  },
  {
    name: 'sharepoint_list_list_items',
    description: `Retrieve items from a SharePoint list. Supports OData filtering, field selection, ordering, pagination, and expanding related resources such as fields (column values).`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint list whose items to retrieve. Use the list GUID or display name.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: '$expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of related resources to expand. Use 'fields' to include the column values for each item. Example: 'fields'.`,
      },
      {
        name: '$filter',
        type: 'string',
        required: false,
        description: `OData filter expression to narrow results. Example: "fields/Status eq 'Active'" to return only active items.`,
      },
      {
        name: '$orderby',
        type: 'string',
        required: false,
        description: `OData orderby expression to sort results. Example: 'fields/Title asc' or 'createdDateTime desc'.`,
      },
      {
        name: '$select',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to return for each item. Example: 'id,createdDateTime,fields'.`,
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
        description: `Maximum number of items to return per page. Default is determined by the API.`,
      },
    ],
  },
  {
    name: 'sharepoint_list_lists',
    description: `List all lists in a SharePoint site. Supports OData filtering, field selection, pagination, and expansion of related resources such as columns and items.`,
    params: [
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site whose lists to retrieve. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: '$expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of related resources to expand. Example: 'columns,items' to include column definitions and list items.`,
      },
      {
        name: '$filter',
        type: 'string',
        required: false,
        description: `OData filter expression to narrow results. Example: "list/template eq 'documentLibrary'" to return only document libraries.`,
      },
      {
        name: '$select',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to return for each list. Example: 'id,displayName,description,webUrl'.`,
      },
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of lists to return per page. Default is determined by the API.`,
      },
    ],
  },
  {
    name: 'sharepoint_list_site_members',
    description: `List all permission entries (members) for a SharePoint site. Returns users and groups with their assigned roles. Supports OData pagination and expansion of related identity resources.`,
    params: [
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site whose members (permissions) to retrieve. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: '$expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of related resources to expand. Example: 'grantedToIdentities' to include the full identity objects for each permission entry.`,
      },
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of permission entries to return per page. Default is determined by the API.`,
      },
    ],
  },
  {
    name: 'sharepoint_list_sites',
    description: `List SharePoint sites accessible to the signed-in user. Use the search parameter to find sites by name or keyword. Defaults to returning all sites (search=*). Supports OData query options for pagination and field selection.`,
    params: [
      {
        name: '$select',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to return for each site. Example: 'id,displayName,webUrl,description'.`,
      },
      {
        name: '$top',
        type: 'integer',
        required: false,
        description: `Maximum number of sites to return per page (1-999). Default is determined by the API.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search keyword to filter sites by name or description. Use '*' to return all accessible sites. Example: 'Marketing' or 'project'.`,
      },
    ],
  },
  {
    name: 'sharepoint_recycle_item',
    description: `Move a file or folder in a SharePoint document library to the site recycle bin. This is a soft-delete — the item can be restored from the recycle bin. Permanent deletion requires a separate operation on the recycle bin itself.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique drive item ID of the file or folder to move to the recycle bin. Obtain item IDs from list drive items or search drive items operations.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the item to recycle. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
    ],
  },
  {
    name: 'sharepoint_remove_group_member',
    description: `Remove a user from an Azure AD group (including Microsoft 365 and SharePoint site groups) by providing the group ID and user object ID. This permanently removes the membership.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The Azure AD object ID of the group to remove the member from. Example: '7d8a5b3c-1234-5678-abcd-ef0123456789'.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The Azure AD object ID of the user to remove from the group. Example: 'aaaabbbb-1234-5678-abcd-ef0123456789'.`,
      },
    ],
  },
  {
    name: 'sharepoint_restore_recycled_item',
    description: `Restore a previously recycled (soft-deleted) item in a SharePoint document library. Optionally specify a new parent folder and/or new name for the restored item. If neither is provided, the item is restored to its original location.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique drive item ID of the recycled item to restore. Obtain item IDs from list drive items or search recycled items operations.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the recycled item. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: 'new_name',
        type: 'string',
        required: false,
        description: `Optional new filename to give the restored item. If omitted, the item retains its original name.`,
      },
      {
        name: 'new_parent_id',
        type: 'string',
        required: false,
        description: `Optional drive item ID of the parent folder to restore the item into. If omitted, the item is restored to its original parent location.`,
      },
    ],
  },
  {
    name: 'sharepoint_search',
    description: `Search across SharePoint sites, lists, drive items, and list items using the Microsoft Search API. Supports full-text keyword search and KQL (Keyword Query Language). Returns up to 25 results by default.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query string to find matching SharePoint content. Supports keyword search and KQL (Keyword Query Language). Example: 'project plan' or 'site:https://contoso.sharepoint.com/sites/Marketing'.`,
      },
      {
        name: 'entity_types',
        type: 'array',
        required: false,
        description: `Array of entity types to search across. Valid values: driveItem, listItem, site, list, drive, externalItem. Default is ['driveItem', 'listItem'].`,
      },
      {
        name: 'from',
        type: 'integer',
        required: false,
        description: `Zero-based index of the first result to return, used for pagination. Default is 0 (start from the first result).`,
      },
      {
        name: 'size',
        type: 'integer',
        required: false,
        description: `Number of results to return per page. Default is 25, maximum is 200.`,
      },
    ],
  },
  {
    name: 'sharepoint_subscribe_webhook',
    description: `Create a webhook subscription to receive change notifications for a SharePoint list or site resource. When changes matching the specified change type occur, Graph will POST a notification to your notification URL. Note: the notification URL must be HTTPS and must be pre-approved/allowlisted in the backend. Subscriptions expire within 3 days and must be renewed before expiry.`,
    params: [
      {
        name: 'expiration_date_time',
        type: 'string',
        required: true,
        description: `The ISO 8601 datetime when the subscription expires. Maximum is 3 days from now for SharePoint resources. Example: '2026-06-20T12:00:00Z'.`,
      },
      {
        name: 'notification_url',
        type: 'string',
        required: true,
        description: `The HTTPS URL that will receive notifications when changes occur. Must be publicly accessible and pre-approved by the backend. Example: 'https://webhook.example.com/notifications'.`,
      },
      {
        name: 'resource',
        type: 'string',
        required: true,
        description: `The Graph API resource path to monitor for changes. For SharePoint lists use: 'sites/{site_id}/lists/{list_id}'. For an entire site drive: 'sites/{site_id}/drive/root'. Example: 'sites/contoso.sharepoint.com,abc123,def456/lists/list-guid-here'.`,
      },
      {
        name: 'change_type',
        type: 'string',
        required: false,
        description: `The type of change to subscribe to. Valid values: 'created', 'updated', 'deleted', 'all'. Default is 'updated'.`,
      },
      {
        name: 'client_state',
        type: 'string',
        required: false,
        description: `Optional secret string included in the notification payload so you can verify it came from Microsoft Graph. Max 128 characters. Example: 'my-secret-key-12345'.`,
      },
    ],
  },
  {
    name: 'sharepoint_unfollow_document',
    description: `Stop following a SharePoint document or OneDrive file. The document will be removed from the signed-in user's followed documents list. Provide the drive item ID of the document to unfollow.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The ID of the drive item (document) to unfollow. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.`,
      },
    ],
  },
  {
    name: 'sharepoint_update_list',
    description: `Update the display name or description of an existing SharePoint list. Provide the site ID, list ID, and at least one of display_name or description to update.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID or name of the SharePoint list to update. Can be the list GUID or the list's display name.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site containing the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the SharePoint list. Example: 'Updated task list for Q3 project.'`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `New display name for the SharePoint list. Example: 'Q3 Project Tasks'.`,
      },
    ],
  },
  {
    name: 'sharepoint_update_list_field',
    description: `Update the metadata of an existing SharePoint list column (field). Supports updating the display name, description, hidden visibility, and read-only status. Only provided fields are modified.`,
    params: [
      {
        name: 'column_id',
        type: 'string',
        required: true,
        description: `ID of the column to update. Use the column GUID returned by the list fields endpoint.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint list that contains the column. Use the list GUID or display name.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the column. Appears as a tooltip or hint in the SharePoint list UI.`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `New display name for the column as shown in the SharePoint list UI.`,
      },
      {
        name: 'hidden',
        type: 'boolean',
        required: false,
        description: `Whether the column should be hidden from the default list view. Set to true to hide or false to show.`,
      },
      {
        name: 'read_only',
        type: 'boolean',
        required: false,
        description: `Whether the column should be read-only. Set to true to prevent users from editing the column value.`,
      },
    ],
  },
  {
    name: 'sharepoint_update_list_item',
    description: `Update the field values of an existing SharePoint list item. PATCH the /fields subpath with a flat object of column name-value pairs. Only the fields provided are updated; omitted fields remain unchanged.`,
    params: [
      {
        name: 'fields',
        type: 'object',
        required: true,
        description: `Object containing the field values to update. Keys are internal column names. Only provided fields are changed. Example: {"Title": "Updated Title", "Status": "Done"}.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `ID of the list item to update. This is the numeric or string identifier of the item within the list.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint list that contains the item. Use the list GUID or display name.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
    ],
  },
  {
    name: 'sharepoint_update_site',
    description: `Update the display name or description of an existing SharePoint site. Provide the site ID and at least one of display_name or description to update.`,
    params: [
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site to update. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the SharePoint site. Example: 'Official site for the Marketing department.'`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `New display name for the SharePoint site. Example: 'Marketing Hub 2024'.`,
      },
    ],
  },
  {
    name: 'sharepoint_upload_file',
    description: `Create an upload session for uploading a file to a SharePoint document library. Returns an upload URL that the caller uses to upload the file content in subsequent PUT requests. This session-based approach supports files of any size. Required: site_id, parent_id (use 'root' for the library root folder), and filename.`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `Name of the file to upload including its extension. Example: 'report-Q4.xlsx'. This will be the filename in SharePoint.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `Drive item ID of the parent folder in the SharePoint document library where the file will be uploaded. Use 'root' to upload to the library root folder, or a folder item ID from a list drive items operation.`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: true,
        description: `ID of the SharePoint site that contains the document library. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.`,
      },
      {
        name: 'conflict_behavior',
        type: 'string',
        required: false,
        description: `Behavior when a file with the same name already exists at the destination. 'fail' returns an error, 'replace' overwrites the existing file, 'rename' creates a new file with an incremented name.`,
      },
    ],
  },
]
