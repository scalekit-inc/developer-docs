import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'boxmcp_add_items_to_hub',
    description: `Adds files or folders to an existing Box Hub.`,
    params: [
      {
        name: 'hub_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Box Hub to add items to.`,
      },
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `A list of items (files or folders) to add to the hub. Each item must include an 'id' and a 'type'.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_extract_freeform',
    description: `Extracts data from one or more Box files using a freeform AI prompt. Supports analyzing multiple files simultaneously for comparative extraction. Returns unstructured extracted information based on the prompt.`,
    params: [
      {
        name: 'file_ids',
        type: 'array',
        required: true,
        description: `The IDs of the Box files to extract data from.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `A freeform prompt describing what data to extract.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_extract_structured_from_fields',
    description: `Extracts structured data from one or more Box files using AI based on specified field definitions. Supports multi-file extraction for comparative analysis. Returns structured key-value pairs.`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: true,
        description: `Field definitions specifying what structured data to extract.`,
      },
      {
        name: 'file_ids',
        type: 'array',
        required: true,
        description: `The IDs of the Box files to extract structured data from.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_extract_structured_from_fields_enhanced',
    description: `Enhanced version of AI structured extraction from fields, using Box AI's Enhanced Extract Agent for improved extraction quality. Extracts structured data from one or more Box files based on specified field definitions. More expensive than the standard tool - use only when the user explicitly requests enhanced extraction.`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: true,
        description: `Field definitions specifying what structured data to extract.`,
      },
      {
        name: 'file_ids',
        type: 'array',
        required: true,
        description: `The IDs of the Box files to extract structured data from.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_extract_structured_from_metadata_template',
    description: `Extracts structured data from one or more Box files using AI based on an existing metadata template schema. Both the template key and the template's scope are required to identify the template.`,
    params: [
      {
        name: 'file_ids',
        type: 'array',
        required: true,
        description: `The IDs of the Box files to extract data from.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope of the metadata template.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `The key of the metadata template to use for structured extraction.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_extract_structured_from_metadata_template_enhanced',
    description: `Enhanced version of AI structured extraction using a metadata template, using Box AI's Enhanced Extract Agent for improved extraction quality. Extracts data from one or more Box files based on an existing metadata template. Both the template key and the template's scope are required. More expensive than the standard tool - use only when the user explicitly requests enhanced extraction.`,
    params: [
      {
        name: 'file_ids',
        type: 'array',
        required: true,
        description: `The IDs of the Box files to extract data from.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope of the metadata template.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `The key of the metadata template to use for structured extraction.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_qa_hub',
    description: `Asks a question about the content of a Box Hub using Box AI. Returns an AI-generated answer based on the hub's content, including citations to the source content when available.`,
    params: [
      {
        name: 'hub_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Box Hub to query with AI.`,
      },
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `The question to ask Box AI about the hub's content.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_qa_multi_file',
    description: `Asks a question across multiple Box files using Box AI. Returns an AI-generated answer synthesized from all provided files, including citations to the source content when available.`,
    params: [
      {
        name: 'file_ids',
        type: 'array',
        required: true,
        description: `The IDs of the Box files to ask a question about.`,
      },
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `The question to ask Box AI about the files.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_qa_single_file',
    description: `Asks a question about a single Box file using Box AI. Returns an AI-generated answer based on the file's content, including citations to the source content when available.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to ask a question about.`,
      },
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `The question to ask Box AI about the file.`,
      },
    ],
  },
  {
    name: 'boxmcp_copy_file',
    description: `Creates a copy of a Box file in a destination folder. The source file is not modified. If no destination folder is provided, the copy is placed in the user's root folder. Optionally provide a new name for the copy; otherwise the original file name is used.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to copy.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name for the copied file. Defaults to the original name if not provided.`,
      },
      {
        name: 'parent_folder_id',
        type: 'string',
        required: false,
        description: `The ID of the destination folder for the copied file. Defaults to "0" (the user's root folder).`,
      },
    ],
  },
  {
    name: 'boxmcp_copy_folder',
    description: `Creates a copy of a Box folder and all its contents in a destination folder. The source folder is not modified. The root folder (folder_id "0") cannot be copied. If no destination folder is provided, the copy is placed in the user's root folder. Optionally provide a new name for the copy; otherwise the original folder name is used.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the Box folder to copy.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name for the copied folder. Defaults to the original name if not provided.`,
      },
      {
        name: 'parent_folder_id',
        type: 'string',
        required: false,
        description: `The ID of the destination folder where the copy will be placed. Defaults to "0" (the user's root folder).`,
      },
    ],
  },
  {
    name: 'boxmcp_copy_hub',
    description: `Creates a copy of an existing Box Hub via the Hubs v3 API. The source hub is not modified. The copy includes the source hub's shareable items and, unless overridden, its description. Only items the requesting user has permission to share into the new hub are copied; items visible only through the hub itself (without share permission) are not copied.`,
    params: [
      {
        name: 'hub_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the source Box Hub to copy.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the new hub. When omitted, the source hub's description is copied to the new hub.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Optional title for the new hub. Up to 50 characters.`,
      },
    ],
  },
  {
    name: 'boxmcp_create_file_comment',
    description: `Adds a comment to a Box file.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to comment on.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The text content of the comment.`,
      },
    ],
  },
  {
    name: 'boxmcp_create_folder',
    description: `Creates a new folder in Box. If no parent folder is provided, the folder is created in the user's root directory.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the new folder (max 255 characters; no slashes, leading/trailing spaces, or dots). Must be unique within the parent folder.`,
      },
      {
        name: 'parent_folder_id',
        type: 'string',
        required: false,
        description: `The ID of the parent folder where the new folder will be created. Defaults to "0" (root directory).`,
      },
    ],
  },
  {
    name: 'boxmcp_create_hub',
    description: `Creates a new Box Hub for organizing and sharing content around a specific topic, project, or team. Accepts a required title (up to 50 characters) and an optional description (up to 1000 characters) providing context about the hub's purpose and contents.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `The title of the new hub.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the new hub providing context about its purpose and contents.`,
      },
    ],
  },
  {
    name: 'boxmcp_create_metadata_template',
    description: `Creates a new enterprise metadata template in Box. scope must be "enterprise"; each field requires type, key, and display_name. Optionally set template_key, hidden, copy_instance_on_item_copy, and enum/multiSelect/taxonomy field options (with an optional color_id 0-7 for enum options).`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `The human-readable name of the metadata template.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope of the metadata template. Must be "enterprise" — apps cannot create global templates.`,
      },
      {
        name: 'copy_instance_on_item_copy',
        type: 'boolean',
        required: false,
        description: `Whether to copy metadata instances of this template when the file/folder they're attached to is copied.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Ordered field definitions for the template (string, float, date, enum, multiSelect, or taxonomy).`,
      },
      {
        name: 'hidden',
        type: 'boolean',
        required: false,
        description: `Whether the metadata template is hidden from users in the Box UI.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: false,
        description: `The unique machine-readable key for the metadata template. Auto-generated from display_name if not provided.`,
      },
    ],
  },
  {
    name: 'boxmcp_get_file_content',
    description: `Retrieves the text content of a Box file by its ID. Useful for reading documents, notes, and other text-based files.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to retrieve content from.`,
      },
    ],
  },
  {
    name: 'boxmcp_get_file_details',
    description: `Retrieves detailed metadata about a specific Box file including name, size, timestamps, owner, and other properties.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to retrieve details for.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `List of additional fields to include in the response.`,
      },
    ],
  },
  {
    name: 'boxmcp_get_file_preview',
    description: `Displays an interactive preview widget for a Box file. Supports common document, image, and spreadsheet formats (e.g. pdf, doc, docx, ppt, pptx, xls, xlsx, png, jpg, csv, and more). PDFs use a direct download; other types use a generated representation. Not usable when the preview payload would exceed 3MB. For file metadata instead of a visual preview, use get_file_details. To read the content of a specific page after previewing, use get_preview_page.`,
    params: [
      {
        name: 'fileId',
        type: 'string',
        required: true,
        description: `The ID of the Box file to preview.`,
      },
    ],
  },
  {
    name: 'boxmcp_get_folder_details',
    description: `Retrieves detailed metadata about a specific Box folder including name, size, timestamps, owner, and other properties.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the Box folder to retrieve details for.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `List of additional fields to include in the response.`,
      },
    ],
  },
  {
    name: 'boxmcp_get_hub_details',
    description: `Retrieves detailed information about a specific Box Hub including its name, description, and settings.`,
    params: [
      {
        name: 'hub_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Box Hub to retrieve details for.`,
      },
    ],
  },
  {
    name: 'boxmcp_get_hub_items',
    description: `Retrieves the items (files and folders) contained in a specific Box Hub.`,
    params: [
      {
        name: 'hub_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Box Hub whose items to retrieve.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page.`,
      },
      {
        name: 'marker',
        type: 'string',
        required: false,
        description: `A pagination cursor returned from a previous call to continue listing from a specific position.`,
      },
    ],
  },
  {
    name: 'boxmcp_get_metadata_template_schema',
    description: `Retrieves the schema definition for a specific metadata template in Box, including all field definitions, types, and options.`,
    params: [
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope of the metadata template.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `The unique key identifying the metadata template.`,
      },
    ],
  },
  {
    name: 'boxmcp_get_preview_page',
    description: `Returns a specific page of a Box file previewed with get_file_preview as an image, so its content (figures, text, charts, etc.) can be analyzed. Use the fileId and page number from the active file preview context.`,
    params: [
      {
        name: 'fileId',
        type: 'string',
        required: true,
        description: `The ID of the Box file whose preview page you want to retrieve.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: true,
        description: `The 1-based page number to return as a PNG image.`,
      },
    ],
  },
  {
    name: 'boxmcp_list_file_comments',
    description: `Retrieves all comments associated with a specific Box file.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to list comments for.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `List of fields to include in each comment in the response.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of comments to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `The offset of the comment at which to begin the response.`,
      },
    ],
  },
  {
    name: 'boxmcp_list_folder_content_by_folder_id',
    description: `Lists files, folders, and web links contained in a folder. Returns a paginated list. Use folder_id "0" for the root folder.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the folder to list contents of. Use "0" for the root folder.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response for each item.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `The offset of the item at which to begin the response.`,
      },
    ],
  },
  {
    name: 'boxmcp_list_hubs',
    description: `Lists all Box Hubs accessible to the authenticated user. Box Hubs are curated collections of content.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of hubs to return per page. Defaults to 100, maximum is 1000.`,
      },
      {
        name: 'marker',
        type: 'string',
        required: false,
        description: `A pagination cursor returned from a previous call to continue listing from a specific position.`,
      },
    ],
  },
  {
    name: 'boxmcp_list_item_collaborations',
    description: `Lists all collaborations (shared access) for up to 10 Box files and/or folders in a single request. Returns detailed collaboration information (user details, roles, status, timestamps) for each item, with partial-failure handling: collaborations for successful items are still returned even if some items in the batch fail to load.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `Array of items (files and/or folders) to list collaborations for.`,
      },
    ],
  },
  {
    name: 'boxmcp_list_metadata_templates',
    description: `Lists all metadata templates available in the Box enterprise or global scope.`,
    params: [
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope of metadata templates to list: 'global' or 'enterprise'.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of metadata templates to return.`,
      },
      {
        name: 'marker',
        type: 'string',
        required: false,
        description: `A pagination marker for fetching the next page of results.`,
      },
    ],
  },
  {
    name: 'boxmcp_list_tasks',
    description: `Lists tasks assigned to the authenticated user or associated with a specific file in Box.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to list tasks for.`,
      },
    ],
  },
  {
    name: 'boxmcp_move_file',
    description: `Moves a Box file to a different folder. The file stays the same item (same ID); only its parent folder changes. A destination parent_folder_id is required. Optionally rename the file while moving by providing a new name.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to move.`,
      },
      {
        name: 'parent_folder_id',
        type: 'string',
        required: true,
        description: `The ID of the folder that will become the file's new parent. Use "0" for the user's root folder.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name for the file. Defaults to the original name if not provided.`,
      },
    ],
  },
  {
    name: 'boxmcp_move_folder',
    description: `Moves a Box folder to a different parent folder. The folder keeps the same ID; only its parent changes. This is not for restoring items from trash. A destination parent_folder_id is required. Optionally rename the folder while moving by providing a new name.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the Box folder to move.`,
      },
      {
        name: 'parent_folder_id',
        type: 'string',
        required: true,
        description: `The ID of the folder that will become this folder's new parent. Use "0" for the user's root folder.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name for the folder. Defaults to the original name if not provided.`,
      },
    ],
  },
  {
    name: 'boxmcp_search_files_keyword',
    description: `Searches for files using keywords with support for metadata filters (mdfilters), file extension filtering, date range filters (including deleted/trashed items), and field selection. Maps to Box's searchForContent API.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The keyword or phrase to search for in file names and content.`,
      },
      {
        name: 'ancestor_folder_id',
        type: 'string',
        required: false,
        description: `ID of a parent folder to scope the search within.`,
      },
      {
        name: 'created_at_range',
        type: 'string',
        required: false,
        description: `Filter files by creation date range (ISO 8601 range string).`,
      },
      {
        name: 'deleted_at_range',
        type: 'string',
        required: false,
        description: `Filter trashed files by deletion date range (ISO 8601 range string).`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response for each file.`,
      },
      {
        name: 'file_extensions',
        type: 'array',
        required: false,
        description: `List of file extensions to filter results by.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of files to return.`,
      },
      {
        name: 'mdfilters',
        type: 'array',
        required: false,
        description: `Metadata template filters to further narrow the search. Each entry specifies a template's scope and templateKey, plus field-level filter conditions (exact value, a list of values, or a {"gt": ..., "lt": ...} range).`,
      },
      {
        name: 'updated_at_range',
        type: 'string',
        required: false,
        description: `Filter files by last updated date range (ISO 8601 range string).`,
      },
    ],
  },
  {
    name: 'boxmcp_search_files_metadata',
    description: `Searches for files using SQL-like metadata queries. Requires 'from' (e.g. enterprise_123456.templateKey from list_metadata_templates) and 'query' (a SQL-like filter using field keys from get_metadata_template_schema). ancestor_folder_id defaults to "0" (root) if omitted. Use list_metadata_templates and get_metadata_template_schema first to discover templates and field keys.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `The metadata template to search against in 'scope.templateKey' format.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `A SQL-like query to filter metadata fields.`,
      },
      {
        name: 'ancestor_folder_id',
        type: 'string',
        required: false,
        description: `Limit search results to items in a specific folder. Defaults to "0" (root) if omitted.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Metadata fields to return in the results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (max 100).`,
      },
      {
        name: 'query_params',
        type: 'object',
        required: false,
        description: `Parameters for the query placeholders.`,
      },
    ],
  },
  {
    name: 'boxmcp_search_folders_by_name',
    description: `Searches for folders by name within Box using keyword matching. Can be scoped to search within a particular parent folder. Returns basic folder information including ID, type, and name. Supports optional comma-separated RFC3339 date range filters for folder creation, last update, and deletion timestamps (e.g. "2024-01-01T00:00:00Z,2024-12-31T23:59:59Z"; omit either side of the comma to leave that end of the range open).`,
    params: [
      {
        name: 'folder_name',
        type: 'string',
        required: true,
        description: `The name or keyword to search for in folder names.`,
      },
      {
        name: 'ancestor_folder_id',
        type: 'string',
        required: false,
        description: `ID of a parent folder to scope the search within.`,
      },
      {
        name: 'created_at_range',
        type: 'string',
        required: false,
        description: `Filter folders by creation date range (comma-separated RFC3339 timestamps).`,
      },
      {
        name: 'deleted_at_range',
        type: 'string',
        required: false,
        description: `Filter folders by deletion date range (comma-separated RFC3339 timestamps).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of folders to return.`,
      },
      {
        name: 'updated_at_range',
        type: 'string',
        required: false,
        description: `Filter folders by last updated date range (comma-separated RFC3339 timestamps).`,
      },
    ],
  },
  {
    name: 'boxmcp_set_file_metadata',
    description: `Creates or updates a metadata template instance on a Box file (applies the template the first time, or updates it if already applied). Use list_metadata_templates and get_metadata_template_schema first to determine the correct scope, template_key, and field keys for metadata_fields.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to attach or update metadata on.`,
      },
      {
        name: 'metadata_fields',
        type: 'object',
        required: true,
        description: `Field keys and values for this template. Use get_metadata_template_schema for valid field keys.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope of the metadata template. Either 'enterprise' or 'global'.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `The key of the metadata template to use.`,
      },
    ],
  },
  {
    name: 'boxmcp_set_folder_metadata',
    description: `Creates or updates a metadata template instance on a Box folder (applies the template the first time, or updates it if already applied). Does not apply to the root folder (ID "0"). Use list_metadata_templates and get_metadata_template_schema first to determine the correct scope, template_key, and field keys for metadata_fields.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the Box folder to attach or update metadata on. Root folder "0" is not supported.`,
      },
      {
        name: 'metadata_fields',
        type: 'object',
        required: true,
        description: `Field keys and values for this template. Use get_metadata_template_schema for valid field keys.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope of the metadata template. Either 'enterprise' or 'global'.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `The key of the metadata template to use.`,
      },
    ],
  },
  {
    name: 'boxmcp_update_file_properties',
    description: `Updates file metadata: name, description, tags, and collections. When renaming, always preserve the original file extension unless explicitly instructed to change it.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the file to update.`,
      },
      {
        name: 'collections',
        type: 'array',
        required: false,
        description: `Array of collection objects with IDs to add the file to.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the file.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the file (including extension).`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of tags to apply to the file.`,
      },
    ],
  },
  {
    name: 'boxmcp_update_folder_properties',
    description: `Updates folder metadata: name, description, tags, and collections.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the folder to update.`,
      },
      {
        name: 'collections',
        type: 'array',
        required: false,
        description: `Array of collection objects with IDs to add the folder to.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the folder.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the folder (max 255 chars, no / \\ . .. or leading/trailing spaces).`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of tags to apply to the folder.`,
      },
    ],
  },
  {
    name: 'boxmcp_update_hub',
    description: `Updates the title or description of a specific Box Hub. You can update one or more properties by providing the hub ID and the fields you want to change; only the fields you specify are updated, others remain unchanged.`,
    params: [
      {
        name: 'hub_id',
        type: 'string',
        required: true,
        description: `The unique numeric identifier of the hub to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the hub. Leave empty to keep the existing description.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the hub. Leave empty to keep the existing title.`,
      },
    ],
  },
  {
    name: 'boxmcp_update_metadata_template',
    description: `Updates a metadata template schema (add, edit, remove, or reorder fields, enum options, or multiSelect options; or rename the template). Use scope and template_key from list_metadata_templates or get_metadata_template_schema. Each operation needs an 'op'; use camelCase in data per the Box API. For Shield classifications (template_key "securityClassification-6VMVochwUWo"), set the color via data.staticConfig.classification.colorID (0=Yellow, 1=Orange, 2=Red, 3=Purple, 4=LightBlue, 5=DarkBlue, 6=Green, 7=Grey).`,
    params: [
      {
        name: 'operations',
        type: 'array',
        required: true,
        description: `A list of operations to perform on the metadata template, such as adding, editing, or reordering fields, enum options, or multiSelect options.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope of the metadata template. Either 'enterprise' or 'global'.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `The unique key of the metadata template to update.`,
      },
    ],
  },
  {
    name: 'boxmcp_upload_file',
    description: `Uploads a new text file to Box. Provide the file name (including its extension) and the text content to upload; a parent folder ID can optionally be provided to place the file, defaulting to the root folder ("0") if omitted. Fails if a file with the same name already exists in the target folder. Supports text-based file types only (txt, md, boxnote, html, svg, xml, csv, json, js, ts, py, sh) — use get_upload_url to upload binary files.`,
    params: [
      {
        name: 'file_content',
        type: 'string',
        required: true,
        description: `The file content as text.`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: true,
        description: `The name to give the uploaded file, including its extension.`,
      },
      {
        name: 'parent_folder_id',
        type: 'string',
        required: false,
        description: `The ID of the destination Box folder to upload the file into. Defaults to "0" (the user's root folder).`,
      },
    ],
  },
  {
    name: 'boxmcp_upload_file_version',
    description: `Uploads a new version of an existing Box file by replacing its content with the provided text. The file ID must correspond to an existing file, otherwise an error is returned. Supports text content only — use get_upload_url to upload binary files.`,
    params: [
      {
        name: 'file_content',
        type: 'string',
        required: true,
        description: `The new file content as text.`,
      },
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the existing Box file to upload a new version for.`,
      },
    ],
  },
  {
    name: 'boxmcp_who_am_i',
    description: `Returns detailed information about the currently authenticated Box user, including user profile data, identification, contact information, role details, and account settings. No input parameters required.`,
    params: [],
  },
]
