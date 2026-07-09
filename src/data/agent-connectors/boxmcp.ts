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
    description: `Extracts data from a Box file using a freeform AI prompt. Returns unstructured extracted information based on the prompt.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to extract data from.`,
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
    description: `Extracts structured data from a Box file using AI based on specified field definitions. Returns structured key-value pairs.`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: true,
        description: `Field definitions specifying what structured data to extract.`,
      },
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to extract structured data from.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_extract_structured_from_fields_enhanced',
    description: `Enhanced version of AI structured extraction from fields. Extracts structured data from a Box file using AI with additional processing options.`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: true,
        description: `Field definitions specifying what structured data to extract.`,
      },
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to extract structured data from.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_extract_structured_from_metadata_template',
    description: `Extracts structured data from a Box file using AI based on an existing metadata template schema.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to extract data from.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `The key of the metadata template to use for structured extraction.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `The scope of the metadata template.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_extract_structured_from_metadata_template_enhanced',
    description: `Enhanced version of AI structured extraction using a metadata template. Extracts data from a Box file using AI with additional processing options.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to extract data from.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `The key of the metadata template to use for structured extraction.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `The scope of the metadata template.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_qa_hub',
    description: `Asks a question about the content of a Box Hub using Box AI. Returns an AI-generated answer based on the hub's content.`,
    params: [
      {
        name: 'hub_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Box Hub to query with AI.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `The question or prompt to ask Box AI about the hub's content.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_qa_multi_file',
    description: `Asks a question across multiple Box files using Box AI. Returns an AI-generated answer synthesized from all provided files.`,
    params: [
      {
        name: 'file_ids',
        type: 'array',
        required: true,
        description: `The IDs of the Box files to ask a question about.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `The question to ask Box AI about the files.`,
      },
    ],
  },
  {
    name: 'boxmcp_ai_qa_single_file',
    description: `Asks a question about a single Box file using Box AI. Returns an AI-generated answer based on the file's content.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to ask a question about.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `The question to ask Box AI about the file.`,
      },
    ],
  },
  {
    name: 'boxmcp_copy_file',
    description: `Creates a copy of a Box file in the specified destination folder.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to copy.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `The ID of the destination folder for the copied file.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name for the copied file. Defaults to the original name if not provided.`,
      },
    ],
  },
  {
    name: 'boxmcp_copy_folder',
    description: `Creates a copy of a Box folder and all its contents in the specified destination folder.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the Box folder to copy.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `The ID of the destination folder where the copy will be placed.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name for the copied folder. Defaults to the original name if not provided.`,
      },
    ],
  },
  {
    name: 'boxmcp_copy_hub',
    description: `Creates a copy of a Box Hub with all its items.`,
    params: [
      {
        name: 'hub_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Box Hub to copy.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The name for the copied hub. Defaults to the original hub's name if not provided.`,
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
    description: `Creates a new folder in Box under the specified parent folder.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the new folder.` },
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `The ID of the parent folder. Use '0' for the root folder.`,
      },
    ],
  },
  {
    name: 'boxmcp_create_hub',
    description: `Creates a new Box Hub. Hubs are curated content collections for organizing and sharing resources.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the new hub.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional description for the new hub.`,
      },
    ],
  },
  {
    name: 'boxmcp_create_metadata_template',
    description: `Creates a new metadata template in the Box enterprise. Defines custom fields for tagging and organizing files.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `The human-readable name of the metadata template.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `An array of field definitions for the metadata template.`,
      },
      {
        name: 'hidden',
        type: 'boolean',
        required: false,
        description: `Whether the metadata template is hidden from users in the Box UI.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `The scope of the metadata template. Defaults to 'enterprise'.`,
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
    description: `Retrieves a preview of a Box file, returning preview page information and total page count.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Box file to preview.`,
      },
      {
        name: 'version_id',
        type: 'string',
        required: false,
        description: `The ID of a specific file version to preview. If omitted, the current version is used.`,
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
    description: `Retrieves the content of a specific page in a Box file preview (for multi-page documents like PDFs).`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Box file.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: true,
        description: `The 1-based page number to retrieve from the file preview.`,
      },
      {
        name: 'version_id',
        type: 'string',
        required: false,
        description: `The ID of a specific file version to preview. If omitted, the current version is used.`,
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
    description: `Lists all collaborations (shared access) on a Box file or folder, showing who has access and their permission level.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file or folder to list collaborations for.`,
      },
      {
        name: 'item_type',
        type: 'string',
        required: true,
        description: `The type of the item: 'file' or 'folder'.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `List of fields to include in each collaboration in the response.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of collaborations to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `The offset at which to begin the response.`,
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
    description: `Moves a Box file to a different folder.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to move.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `The ID of the destination folder to move the file into.`,
      },
    ],
  },
  {
    name: 'boxmcp_move_folder',
    description: `Moves a Box folder and all its contents to a different parent folder.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the Box folder to move.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `The ID of the destination parent folder.`,
      },
    ],
  },
  {
    name: 'boxmcp_search_files_keyword',
    description: `Searches for files using keywords with support for metadata filters, file extension filtering, and field selection. Maps to Box's searchForContent API.`,
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
        name: 'updated_at_range',
        type: 'string',
        required: false,
        description: `Filter files by last updated date range (ISO 8601 range string).`,
      },
    ],
  },
  {
    name: 'boxmcp_search_files_metadata',
    description: `Searches for files in Box based on metadata template values. Filter files by specific metadata field values.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `The metadata template to search against in 'scope.templateKey' format.`,
      },
      {
        name: 'ancestor_folder_id',
        type: 'string',
        required: false,
        description: `Limit search results to items in a specific folder.`,
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
        description: `Maximum number of results to return (max 200).`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `A SQL-like query to filter metadata fields.`,
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
    description: `Searches for folders by name within Box using keyword matching. Can be scoped to search within a particular parent folder. Returns basic folder information including ID, type, and name.`,
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
        description: `Filter folders by creation date range (ISO 8601 range string).`,
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
        description: `Filter folders by last updated date range (ISO 8601 range string).`,
      },
    ],
  },
  {
    name: 'boxmcp_set_file_metadata',
    description: `Sets or updates metadata on a Box file using a specified metadata template. Creates or replaces the metadata instance.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to set metadata on.`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: true,
        description: `Key-value pairs of metadata fields matching the template's field definitions.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope of the metadata template. Either 'global' or 'enterprise'.`,
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
    description: `Sets or updates metadata on a Box folder using a specified metadata template. Creates or replaces the metadata instance.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the Box folder to set metadata on.`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: true,
        description: `Key-value pairs of metadata fields matching the template's field definitions.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope of the metadata template. Either 'global' or 'enterprise'.`,
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
    description: `Updates properties of a Box file such as name, description, or tags.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The ID of the Box file to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The new description for the file.`,
      },
      { name: 'name', type: 'string', required: false, description: `The new name for the file.` },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `A list of tags to set on the file.`,
      },
    ],
  },
  {
    name: 'boxmcp_update_folder_properties',
    description: `Updates properties of a Box folder such as name or description.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the Box folder to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The new description for the folder.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name for the folder.`,
      },
    ],
  },
  {
    name: 'boxmcp_update_hub',
    description: `Updates the properties of an existing Box Hub, such as its name or description.`,
    params: [
      {
        name: 'hub_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Box Hub to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The new description for the hub. Leave empty to keep the existing description.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name for the hub. Leave empty to keep the existing name.`,
      },
    ],
  },
  {
    name: 'boxmcp_update_metadata_template',
    description: `Updates an existing metadata template in Box, such as adding, modifying, or reordering fields.`,
    params: [
      {
        name: 'operations',
        type: 'array',
        required: true,
        description: `A list of operations to perform on the metadata template, such as adding, editing, or reordering fields.`,
      },
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `The unique key of the metadata template to update.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `The scope of the metadata template. Use 'global' for Box-defined templates or 'enterprise' for custom templates.`,
      },
    ],
  },
  {
    name: 'boxmcp_upload_file',
    description: `Uploads a new file to a Box folder. Provide the file content as text and specify the target folder and file name.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `The file content as text.` },
      {
        name: 'file_name',
        type: 'string',
        required: true,
        description: `The name to give the uploaded file.`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the Box folder to upload the file into.`,
      },
    ],
  },
  {
    name: 'boxmcp_upload_file_version',
    description: `Uploads a new version of an existing Box file. Replaces the current version with new content.`,
    params: [
      {
        name: 'content',
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
      {
        name: 'file_name',
        type: 'string',
        required: false,
        description: `Optional new name for the file version.`,
      },
    ],
  },
  {
    name: 'boxmcp_who_am_i',
    description: `Returns detailed information about the currently authenticated Box user, including user profile data, identification, contact information, role details, and account settings. No input parameters required.`,
    params: [],
  },
]
