import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'cloudinarymcp_asset_rename',
    description: `Updates an existing asset's identifier (public ID) and optionally other metadata in your Cloudinary account`,
    params: [
      {
        name: 'RequestBody',
        type: 'object',
        required: true,
        description: `The rename request parameters.`,
      },
      {
        name: 'resource_type',
        type: 'string',
        required: true,
        description: `The type of resource (image, video, or raw).`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_asset_update',
    description: `Updates an existing asset's metadata, tags, and other attributes using its asset ID

Updates one or more attributes of a specified resource (asset) by its asset ID. This enables you to update details of an asset by its unique and immutable identifier, regardless of public ID, display name, asset folder, resource type or delivery type. Note that you can also update attributes of an existing asset using the explicit API endpoint.`,
    params: [
      {
        name: 'asset_id',
        type: 'string',
        required: true,
        description: `The asset ID of the resource. Must be a 32-character hexadecimal string.`,
      },
      {
        name: 'ResourceUpdateRequest',
        type: 'object',
        required: true,
        description: `The asset attributes to update.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_create_asset_relations',
    description: `Add related assets by asset ID

Relates an asset to other assets by their asset IDs, an immutable identifier, regardless of public ID, display name, asset folder, resource type or delivery type. This is a bidirectional process, meaning that the asset will also be added as a related_asset to all the other assets specified. The relation is also a one to many relationship, where the asset is related to all the assets specified, but those assets aren't also related to each other.`,
    params: [
      {
        name: 'asset_id',
        type: 'string',
        required: true,
        description: `The asset ID of the resource. Must be a 32-character hexadecimal string.`,
      },
      {
        name: 'relate_assets_by_asset_id_request',
        type: 'object',
        required: true,
        description: `The asset IDs to relate.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_create_folder',
    description: `Creates a new empty folder in your Cloudinary media library

Creates a new folder at the specified path`,
    params: [
      {
        name: 'folder',
        type: 'string',
        required: true,
        description: `The full path of the folder, including any nested folders. Must not be empty, and must not contain double slashes or leading/trailing slashes.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_delete_asset',
    description: `Delete asset by asset ID

Deletes an asset using its immutable asset ID.`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: true,
        description: `The asset to delete and related options.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_delete_asset_relations',
    description: `Delete asset relations by asset ID

Unrelates the asset from other assets, specified by their asset IDs, an immutable identifier, regardless of public ID, display name, asset folder, resource type or delivery type. This is a bidirectional process, meaning that the asset will also be removed as a related_asset from all the other assets specified.`,
    params: [
      {
        name: 'asset_id',
        type: 'string',
        required: true,
        description: `The asset ID of the resource. Must be a 32-character hexadecimal string.`,
      },
      {
        name: 'unrelate_assets_by_asset_id_request',
        type: 'object',
        required: true,
        description: `The asset IDs to unrelate.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_delete_derived_assets',
    description: `Delete derived resources

Deletes derived resources by derived resource ID`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: true,
        description: `The derived resource IDs to delete.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_delete_folder',
    description: `Deletes an existing folder from your media library

Deletes a folder and all assets within it.`,
    params: [
      {
        name: 'folder',
        type: 'string',
        required: true,
        description: `The full path of the folder, including any nested folders. Must not be empty, and must not contain double slashes or leading/trailing slashes.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_download_asset_backup',
    description: `Download a backup copy of an asset`,
    params: [
      {
        name: 'asset_id',
        type: 'string',
        required: true,
        description: `The asset ID of the resource. Must be a 32-character hexadecimal string.`,
      },
      {
        name: 'version_id',
        type: 'string',
        required: true,
        description: `The version ID of the backup to download. Must be a 32-character hexadecimal string.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_generate_archive',
    description: `Creates an archive (ZIP or TGZ file) that contains a set of assets from your product environment.

Creates a downloadable ZIP or other archive format containing the specified resources.`,
    params: [
      {
        name: 'RequestBody',
        type: 'object',
        required: true,
        description: `The archive generation parameters.`,
      },
      {
        name: 'resource_type',
        type: 'string',
        required: true,
        description: `The type of resource for archive generation (image, video, or raw).`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_get_asset_details',
    description: `Get resource by asset ID

Returns the details of a single resource specified by its asset ID.`,
    params: [
      {
        name: 'asset_id',
        type: 'string',
        required: true,
        description: `The asset ID of the resource. Must be a 32-character hexadecimal string.`,
      },
      {
        name: 'accessibility_analysis',
        type: 'boolean',
        required: false,
        description: `Whether to return accessibility analysis scores for the image. Default: false.`,
      },
      {
        name: 'colors',
        type: 'boolean',
        required: false,
        description: `Whether to include color information (predominant colors and histogram of 32 leading colors). Default: false.`,
      },
      {
        name: 'coordinates',
        type: 'boolean',
        required: false,
        description: `Whether to include previously specified custom cropping coordinates and faces coordinates. Default: false.`,
      },
      {
        name: 'derived_next_cursor',
        type: 'string',
        required: false,
        description: `The cursor for the next page of derived assets when there are more derived images than max_results.`,
      },
      {
        name: 'faces',
        type: 'boolean',
        required: false,
        description: `Whether to include a list of coordinates of detected faces. Default: false.`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of derived assets to return. Default: 10.`,
      },
      {
        name: 'media_metadata',
        type: 'boolean',
        required: false,
        description: `Whether to include IPTC, XMP, and detailed Exif metadata in the response. Default: false.`,
      },
      {
        name: 'pages',
        type: 'boolean',
        required: false,
        description: `Whether to report the number of pages in multi-page documents (e.g., PDF). Default: false.`,
      },
      {
        name: 'phash',
        type: 'boolean',
        required: false,
        description: `Whether to include the perceptual hash (pHash) of the uploaded photo for image similarity detection. Default: false.`,
      },
      {
        name: 'quality_analysis',
        type: 'boolean',
        required: false,
        description: `Whether to return quality analysis scores for the image. Default: false.`,
      },
      {
        name: 'versions',
        type: 'boolean',
        required: false,
        description: `Whether to include details of all the backed up versions of the asset. Default: false.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_get_tx_reference',
    description: `Get Cloudinary transformation rules documentation from official docs

MANDATORY before creating, modifying, or discussing Cloudinary transformations. Required when user asks for image/video effects, resizing, cropping, filters, etc. Not needed for simple asset management (upload, list, delete, etc.). Call only once per session - documentation doesn't change, reuse the knowledge.

This tool returns the complete, authoritative Cloudinary transformation reference that contains all valid parameters, syntax rules, and best practices.`,
    params: [],
  },
  {
    name: 'cloudinarymcp_get_usage_details',
    description: `Retrieves comprehensive usage metrics and account statistics

A report on the status of product environment usage, including storage, credits, bandwidth, requests, number of resources, and add-on usage. No date parameter needed to get current usage statistics.`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: false,
        description: `The date for which to retrieve usage details (YYYY-MM-DD). If not specified, returns the current usage.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_list_files',
    description: `Get raw assets

Retrieves a list of raw assets. Results can be filtered by various criteria like tags, prefix, or specific public IDs.`,
    params: [
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `The sort direction for the results. Default is "desc".`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Additional fields to include in the response. The fields public_id and asset_id are always included.`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (1-500).`,
      },
      {
        name: 'next_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination.`,
      },
      {
        name: 'prefix',
        type: 'string',
        required: false,
        description: `A public_id prefix. When specified, all assets with that prefix are returned.`,
      },
      {
        name: 'public_ids',
        type: 'array',
        required: false,
        description: `An array of public IDs to return.`,
      },
      {
        name: 'start_at',
        type: 'string',
        required: false,
        description: `An ISO-8601 formatted timestamp. When specified, returns resources created since that timestamp. Supported only if neither \`prefix\` nor \`public_ids\` were passed.`,
      },
      {
        name: 'tags',
        type: 'boolean',
        required: false,
        description: `Whether to include the list of tag names assigned to each asset. Default is false.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `The delivery type to filter by. When omitted, returns assets of all delivery types.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_list_images',
    description: `Get image assets

Retrieves a list of image assets. Results can be filtered by various criteria like tags, prefix, or specific public IDs.`,
    params: [
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `The sort direction for the results. Default is "desc".`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Additional fields to include in the response. The fields public_id and asset_id are always included.`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (1-500).`,
      },
      {
        name: 'next_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination.`,
      },
      {
        name: 'prefix',
        type: 'string',
        required: false,
        description: `A public_id prefix. When specified, all assets with that prefix are returned.`,
      },
      {
        name: 'public_ids',
        type: 'array',
        required: false,
        description: `An array of public IDs to return.`,
      },
      {
        name: 'start_at',
        type: 'string',
        required: false,
        description: `An ISO-8601 formatted timestamp. When specified, returns resources created since that timestamp. Supported only if neither \`prefix\` nor \`public_ids\` were passed.`,
      },
      {
        name: 'tags',
        type: 'boolean',
        required: false,
        description: `Whether to include the list of tag names assigned to each asset. Default is false.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `The delivery type to filter by. When omitted, returns assets of all delivery types.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_list_tags',
    description: `Retrieves a list of tags currently applied to assets in your Cloudinary account

Retrieves a comprehensive list of all tags that exist in your product environment for assets of the specified type.

[Cloudinary Admin API documentation](https://cloudinary.com/documentation/admin_api)`,
    params: [
      {
        name: 'resource_type',
        type: 'string',
        required: true,
        description: `The type of resource (image, video, or raw).`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (1-500).`,
      },
      {
        name: 'next_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination.`,
      },
      {
        name: 'prefix',
        type: 'string',
        required: false,
        description: `Limit the returned tags to those that start with the specified prefix.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_list_videos',
    description: `Get video assets

Retrieves a list of video assets. Results can be filtered by various criteria like tags, prefix, or specific public IDs.`,
    params: [
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `The sort direction for the results. Default is "desc".`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Additional fields to include in the response. The fields public_id and asset_id are always included.`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (1-500).`,
      },
      {
        name: 'next_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination.`,
      },
      {
        name: 'prefix',
        type: 'string',
        required: false,
        description: `A public_id prefix. When specified, all assets with that prefix are returned.`,
      },
      {
        name: 'public_ids',
        type: 'array',
        required: false,
        description: `An array of public IDs to return.`,
      },
      {
        name: 'start_at',
        type: 'string',
        required: false,
        description: `An ISO-8601 formatted timestamp. When specified, returns resources created since that timestamp. Supported only if neither \`prefix\` nor \`public_ids\` were passed.`,
      },
      {
        name: 'tags',
        type: 'boolean',
        required: false,
        description: `Whether to include the list of tag names assigned to each asset. Default is false.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `The delivery type to filter by. When omitted, returns assets of all delivery types.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_move_folder',
    description: `Renames or moves an entire folder (along with all assets it contains) to a new location

Renames or moves an entire folder (along with all assets it contains) to a new location within your Cloudinary media library.`,
    params: [
      {
        name: 'folder',
        type: 'string',
        required: true,
        description: `The full path of the folder, including any nested folders. Must not be empty, and must not contain double slashes or leading/trailing slashes.`,
      },
      {
        name: 'move_folder_request',
        type: 'object',
        required: true,
        description: `The new folder path.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_search_assets',
    description: `Provides a powerful query interface to filter and retrieve assets and their details

Returns a list of resources matching the specified search criteria.

Uses a Lucene-like query language to filter assets by descriptive attributes (\`public_id\`, \`asset_id\`, \`filename\`, \`display_name\`, \`folder\` / \`asset_folder\`, \`tags\`, \`context.<key>\`), file details (\`resource_type\`, \`type\`, \`format\`, \`bytes\`, \`width\`, \`height\`, \`duration\`, \`pages\`, \`aspect_ratio\`, \`transparent\`, \`grayscale\`), lifecycle dates (\`uploaded_at\`, \`created_at\`, \`taken_at\`, \`updated_at\`, \`last_updated.<kind>\`), moderation and lifecycle state (\`status\`, \`moderation_status\`, \`moderation_kind\`), embedded data (\`image_metadata.*\`), structured metadata (\`metadata.<external_id>\`), and analysis fields (\`face_count\`, \`colors\`, \`quality_score\`, \`illustration_score\`, \`accessibility_analysis.*\`). Supports sorting, aggregate counts, and complex boolean expressions. See the \`expression\` parameter for the full field reference.`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: true,
        description: `The search query parameters.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_search_folders',
    description: `Searches for folders whose attributes match a given expression

Lists the folders that match the specified search expression. Limited to 2000 results. If no parameters are passed, returns the 50 most recently created folders in descending order of creation time.`,
    params: [
      {
        name: 'expression',
        type: 'string',
        required: false,
        description: `The (Lucene-like) string expression specifying the search query. If not passed, returns all folders (up to max_results).`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of folders to return (max 500, default 50).`,
      },
      {
        name: 'next_cursor',
        type: 'string',
        required: false,
        description: `The cursor for pagination. Use the next_cursor value from a previous response to get the next page of results.`,
      },
      {
        name: 'sort_by',
        type: 'array',
        required: false,
        description: `Sort order for the results. Each item maps a field name to a direction.`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_transform_asset',
    description: `Generate derived transformations for existing assets using Cloudinary's explicit API with eager transformations

⚠️ CRITICAL PREREQUISITES:
1. MUST call get-tx-reference tool first
2. MUST validate transformation syntax against official docs
3. MUST use only documented parameters from the reference
4. MUST follow proper URL component structure (slashes between components, commas within)

📋 VALIDATION CHECKLIST:
- ✅ Called get-tx-reference tool
- ✅ Verified all parameters exist in official docs
- ✅ Used correct syntax (e.g., f_auto/q_auto not f_auto,q_auto)
- ✅ Applied proper component chaining rules
- ✅ Included crop mode when using width/height

This tool creates actual derived assets on Cloudinary using the explicit API.`,
    params: [
      {
        name: 'publicId',
        type: 'string',
        required: true,
        description: `The public ID of the existing asset to transform`,
      },
      {
        name: 'transformations',
        type: 'string',
        required: true,
        description: `VALIDATED transformation string using ONLY parameters from get-tx-reference docs. Examples: 'c_fill,w_300,h_200' or 'e_sepia/a_90'. MUST follow component rules: commas within components, slashes between components.`,
      },
      {
        name: 'invalidate',
        type: 'boolean',
        required: false,
        description: `Whether to invalidate cached versions`,
      },
      {
        name: 'resourceType',
        type: 'string',
        required: false,
        description: `The resource type of the asset`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_upload_asset',
    description: `Uploads media assets (images, videos, raw files) to your Cloudinary product environment

Uploads media assets (images, videos, raw files) to your Cloudinary product environment. The file is securely stored
in the cloud with backup and revision history. Cloudinary automatically analyzes and saves important data about each
asset, such as format, size, resolution, and prominent colors, which is indexed to enable searching on those attributes.

Supports uploading from:
- Local file paths (SDKs/MCP server only). For MCP server path MUST start with file://
- Remote HTTP/HTTPS URLs
- Base64 Data URIs (max ~60 MB)
- Private storage buckets (S3 or Google Storage)
- FTP addresses

The uploaded asset is immediately available for transformation and delivery upon successful upload.

Transform media files using transformation syntax in delivery URLs, which creates derived files accessible immediately without re-uploading the original.`,
    params: [
      {
        name: 'upload_request',
        type: 'object',
        required: true,
        description: `The file to upload and associated parameters.`,
      },
      {
        name: 'resource_type',
        type: 'string',
        required: false,
        description: `The type of resource (image, video, raw, or auto).`,
      },
    ],
  },
  {
    name: 'cloudinarymcp_visual_search_assets',
    description: `Finds images in your asset library based on visual similarity or content

Returns a list of resources that are visually similar to a specified image. You can provide the source image for comparison in one of three ways:
- Provide a URL of an image
- Specify the asset ID of an existing image
- Provide a textual description`,
    params: [
      {
        name: 'request',
        type: 'string',
        required: true,
        description: `The visual search parameters.`,
      },
    ],
  },
]
