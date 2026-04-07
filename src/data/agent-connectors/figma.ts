import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'figma_me_get',
    description:
      "Returns the authenticated user's profile information including name, email, handle, and profile image URL. No parameters required.",
    params: [],
  },
  {
    name: 'figma_file_get',
    description:
      "Returns a Figma file's full document tree including all nodes, components, styles, and metadata.",
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file (found in the file URL)',
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: 'A specific version ID to retrieve; omit for the latest version',
      },
      {
        name: 'ids',
        type: 'string',
        required: false,
        description: 'Comma-separated list of node IDs to limit the response to specific nodes',
      },
      {
        name: 'depth',
        type: 'integer',
        required: false,
        description: 'Maximum depth of the document tree to return',
      },
      {
        name: 'geometry',
        type: 'string',
        required: false,
        description: 'Set to `paths` to export vector path data for nodes',
      },
      {
        name: 'plugin_data',
        type: 'string',
        required: false,
        description: 'Comma-separated list of plugin IDs to include plugin-specific data',
      },
      {
        name: 'branch_data',
        type: 'boolean',
        required: false,
        description: 'Whether to include branch metadata in the response',
      },
    ],
  },
  {
    name: 'figma_file_nodes_get',
    description:
      'Returns specific nodes from a Figma file by their node IDs, along with their children and associated styles and components.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: 'Comma-separated list of node IDs to fetch',
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: 'A specific version ID to retrieve',
      },
      {
        name: 'depth',
        type: 'integer',
        required: false,
        description: 'Maximum depth of the subtree to return',
      },
      {
        name: 'geometry',
        type: 'string',
        required: false,
        description: 'Set to `paths` to export vector path data',
      },
      {
        name: 'plugin_data',
        type: 'string',
        required: false,
        description: 'Comma-separated list of plugin IDs for plugin-specific data',
      },
    ],
  },
  {
    name: 'figma_file_images_render',
    description:
      'Renders nodes from a Figma file as images (PNG, JPG, SVG, or PDF) and returns download URLs.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: 'Comma-separated list of node IDs to render',
      },
      {
        name: 'scale',
        type: 'number',
        required: false,
        description: 'Image scale factor between 0.01 and 4 (default: 1)',
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: 'Output format: `png`, `jpg`, `svg`, or `pdf` (default: `png`)',
      },
      {
        name: 'svg_include_id',
        type: 'boolean',
        required: false,
        description: 'Whether to include node IDs as attributes in SVG output',
      },
      {
        name: 'svg_simplify_stroke',
        type: 'boolean',
        required: false,
        description: 'Whether to simplify inside/outside strokes in SVG output',
      },
      {
        name: 'use_absolute_bounds',
        type: 'boolean',
        required: false,
        description: "Whether to use the node's absolute bounding box for cropping",
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: 'A specific version ID to render',
      },
    ],
  },
  {
    name: 'figma_file_image_fills_get',
    description:
      'Returns download URLs for all image fills used in a Figma file. Image fills are images applied as fills to nodes.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
    ],
  },
  {
    name: 'figma_file_versions_list',
    description:
      'Returns the version history of a Figma file, including version IDs, labels, descriptions, and creation timestamps.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Number of versions to return per page',
      },
      {
        name: 'before',
        type: 'integer',
        required: false,
        description: 'Cursor for backward pagination; returns versions before this version ID',
      },
      {
        name: 'after',
        type: 'integer',
        required: false,
        description: 'Cursor for forward pagination; returns versions after this version ID',
      },
    ],
  },
  {
    name: 'figma_file_comments_list',
    description:
      'Returns all comments on a Figma file, including their text, author, position, and resolved status.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'as_md',
        type: 'boolean',
        required: false,
        description: 'Whether to return comment text formatted as Markdown',
      },
    ],
  },
  {
    name: 'figma_file_comment_create',
    description:
      'Posts a new comment on a Figma file. Can be placed at a specific canvas position or anchored to a specific node.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: 'The text content of the comment',
      },
      {
        name: 'client_meta',
        type: 'object',
        required: false,
        description: 'Coordinates or node anchor for placing the comment on the canvas',
      },
      {
        name: 'comment_id',
        type: 'string',
        required: false,
        description: 'ID of the parent comment to reply to an existing thread',
      },
    ],
  },
  {
    name: 'figma_file_comment_delete',
    description:
      'Deletes a specific comment from a Figma file. Only the comment author or file owner can delete a comment.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: 'The ID of the comment to delete',
      },
    ],
  },
  {
    name: 'figma_comment_reactions_list',
    description: 'Returns a list of emoji reactions on a specific comment in a Figma file.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: 'The ID of the comment to list reactions for',
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: 'Pagination cursor for fetching the next page of results',
      },
    ],
  },
  {
    name: 'figma_comment_reaction_create',
    description: 'Adds an emoji reaction to a comment in a Figma file.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: 'The ID of the comment to react to',
      },
      {
        name: 'emoji',
        type: 'string',
        required: true,
        description: 'The emoji to add as a reaction (e.g., `:heart:`, `:+1:`)',
      },
    ],
  },
  {
    name: 'figma_comment_reaction_delete',
    description: "Removes the authenticated user's emoji reaction from a comment in a Figma file.",
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: 'The ID of the comment to remove the reaction from',
      },
      {
        name: 'emoji',
        type: 'string',
        required: true,
        description: 'The emoji reaction to remove (e.g., `:heart:`, `:+1:`)',
      },
    ],
  },
  {
    name: 'figma_file_components_list',
    description:
      'Returns a list of all published components in a Figma file, including their keys, names, descriptions, and thumbnails.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
    ],
  },
  {
    name: 'figma_component_get',
    description:
      'Returns metadata for a published component by its key, including name, description, thumbnail, and containing file information.',
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: 'The key of the published component (from `figma_file_components_list`)',
      },
    ],
  },
  {
    name: 'figma_file_component_sets_list',
    description: 'Returns all published component sets in a Figma file.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
    ],
  },
  {
    name: 'figma_component_set_get',
    description:
      'Returns metadata for a published component set (a group of related component variants) by its key.',
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: 'The key of the published component set',
      },
    ],
  },
  {
    name: 'figma_team_components_list',
    description:
      'Returns all published components in a Figma team library, with pagination support.',
    params: [
      { name: 'team_id', type: 'string', required: true, description: 'The ID of the Figma team' },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Number of components to return per page',
      },
      {
        name: 'after',
        type: 'integer',
        required: false,
        description: 'Cursor for forward pagination',
      },
      {
        name: 'before',
        type: 'integer',
        required: false,
        description: 'Cursor for backward pagination',
      },
    ],
  },
  {
    name: 'figma_team_component_sets_list',
    description:
      'Returns all published component sets in a Figma team library, with pagination support.',
    params: [
      { name: 'team_id', type: 'string', required: true, description: 'The ID of the Figma team' },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Number of component sets to return per page',
      },
      {
        name: 'after',
        type: 'integer',
        required: false,
        description: 'Cursor for forward pagination',
      },
      {
        name: 'before',
        type: 'integer',
        required: false,
        description: 'Cursor for backward pagination',
      },
    ],
  },
  {
    name: 'figma_file_styles_list',
    description:
      'Returns all published styles in a Figma file, including color, text, effect, and grid styles.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
    ],
  },
  {
    name: 'figma_style_get',
    description:
      'Returns metadata for a published style by its key, including name, description, style type, and containing file information.',
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: 'The key of the published style',
      },
    ],
  },
  {
    name: 'figma_team_styles_list',
    description: 'Returns all published styles in a Figma team library, with pagination support.',
    params: [
      { name: 'team_id', type: 'string', required: true, description: 'The ID of the Figma team' },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Number of styles to return per page',
      },
      {
        name: 'after',
        type: 'integer',
        required: false,
        description: 'Cursor for forward pagination',
      },
      {
        name: 'before',
        type: 'integer',
        required: false,
        description: 'Cursor for backward pagination',
      },
    ],
  },
  {
    name: 'figma_file_variables_local_get',
    description:
      'Returns all local variables and variable collections defined in a Figma file. Requires the `file_variables:read` scope.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
    ],
  },
  {
    name: 'figma_file_variables_published_get',
    description:
      "Returns all published variables and variable collections from a Figma file's library. Requires the `file_variables:read` scope.",
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
    ],
  },
  {
    name: 'figma_file_variables_update',
    description:
      'Creates, updates, or deletes variables and variable collections in a Figma file. Accepts a JSON payload describing the changes. Requires the `file_variables:write` scope.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'variableCollections',
        type: 'array',
        required: false,
        description: 'Variable collection changes: create, update, or delete collections',
      },
      {
        name: 'variableModes',
        type: 'array',
        required: false,
        description: 'Variable mode changes: create, update, or delete modes within collections',
      },
      {
        name: 'variables',
        type: 'array',
        required: false,
        description: 'Variable changes: create, update, or delete individual variables',
      },
    ],
  },
  {
    name: 'figma_team_get',
    description: 'Returns metadata about a Figma team, including its name and member count.',
    params: [
      { name: 'team_id', type: 'string', required: true, description: 'The ID of the Figma team' },
    ],
  },
  {
    name: 'figma_team_projects_list',
    description:
      'Returns all projects within a Figma team that the authenticated user has access to.',
    params: [
      { name: 'team_id', type: 'string', required: true, description: 'The ID of the Figma team' },
    ],
  },
  {
    name: 'figma_project_files_list',
    description:
      'Returns all files in a Figma project, including file keys, names, thumbnails, and last modified timestamps.',
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: 'The ID of the Figma project',
      },
      {
        name: 'branch_data',
        type: 'boolean',
        required: false,
        description: 'Whether to include branch metadata for each file',
      },
    ],
  },
  {
    name: 'figma_dev_resources_list',
    description:
      'Returns dev resources (links to external tools like Storybook, Jira, etc.) attached to nodes in a Figma file.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'node_id',
        type: 'string',
        required: false,
        description: 'Filter results to dev resources attached to a specific node ID',
      },
    ],
  },
  {
    name: 'figma_dev_resource_create',
    description:
      'Creates a dev resource (external link) attached to a node in a Figma file, such as a link to Storybook, Jira, or documentation.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'node_id',
        type: 'string',
        required: true,
        description: 'The ID of the node to attach the dev resource to',
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Display name for the dev resource link',
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: 'The URL of the external resource',
      },
    ],
  },
  {
    name: 'figma_dev_resource_update',
    description: 'Updates an existing dev resource attached to a node in a Figma file.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'dev_resource_id',
        type: 'string',
        required: true,
        description: 'The ID of the dev resource to update',
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: 'Updated display name for the dev resource',
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: 'Updated URL for the dev resource',
      },
    ],
  },
  {
    name: 'figma_dev_resource_delete',
    description: 'Permanently deletes a dev resource from a node in a Figma file.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the Figma file',
      },
      {
        name: 'dev_resource_id',
        type: 'string',
        required: true,
        description: 'The ID of the dev resource to delete',
      },
    ],
  },
  {
    name: 'figma_webhook_create',
    description:
      'Creates a new webhook that sends events to the specified endpoint URL when Figma events occur in a team. Requires the `webhooks:write` scope.',
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: 'The ID of the Figma team to register the webhook for',
      },
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description:
          'The event type that triggers the webhook (e.g., `FILE_UPDATE`, `FILE_VERSION_UPDATE`, `FILE_DELETE`, `LIBRARY_PUBLISH`, `FILE_COMMENT`)',
      },
      {
        name: 'endpoint',
        type: 'string',
        required: true,
        description: 'The HTTPS URL that receives webhook POST requests',
      },
      {
        name: 'passcode',
        type: 'string',
        required: true,
        description: 'A secret string included in each webhook payload for request verification',
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: 'Webhook status: `ACTIVE` or `PAUSED` (default: `ACTIVE`)',
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: "A human-readable description of the webhook's purpose",
      },
    ],
  },
  {
    name: 'figma_webhook_get',
    description:
      'Returns details of a specific Figma webhook by its ID, including event type, endpoint, and status.',
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: 'The ID of the webhook to retrieve',
      },
    ],
  },
  {
    name: 'figma_webhook_update',
    description: "Updates an existing Figma webhook's endpoint, passcode, status, or description.",
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: 'The ID of the webhook to update',
      },
      {
        name: 'endpoint',
        type: 'string',
        required: false,
        description: 'Updated HTTPS URL to receive webhook events',
      },
      {
        name: 'passcode',
        type: 'string',
        required: false,
        description: 'Updated secret for verifying webhook payloads',
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: 'Updated status: `ACTIVE` or `PAUSED`',
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: 'Updated description for the webhook',
      },
    ],
  },
  {
    name: 'figma_webhook_delete',
    description:
      'Permanently deletes a Figma webhook. This stops all future event deliveries for this webhook.',
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: 'The ID of the webhook to delete',
      },
    ],
  },
  {
    name: 'figma_team_webhooks_list',
    description: 'Returns all webhooks registered for a Figma team.',
    params: [
      { name: 'team_id', type: 'string', required: true, description: 'The ID of the Figma team' },
    ],
  },
  {
    name: 'figma_webhook_requests_list',
    description:
      'Returns the delivery history for a webhook, including request payloads, response codes, and timestamps.',
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: 'The ID of the webhook to fetch request history for',
      },
    ],
  },
  {
    name: 'figma_payments_get',
    description:
      'Returns payment and plan information for a Figma user or resource, including subscription status and plan type.',
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: 'The ID of the user to check payment status for',
      },
      {
        name: 'community_file_id',
        type: 'string',
        required: false,
        description: 'The ID of a community file to check resource payment status',
      },
      {
        name: 'plugin_id',
        type: 'string',
        required: false,
        description: 'The ID of a plugin to check payment status for',
      },
    ],
  },
  {
    name: 'figma_activity_logs_list',
    description:
      'Returns activity log events for an organization. Includes events for file edits, permissions changes, and user actions. Enterprise only: requires organization admin permissions.',
    params: [
      {
        name: 'org_id',
        type: 'string',
        required: true,
        description: 'The ID of the Figma organization',
      },
      {
        name: 'events',
        type: 'string',
        required: false,
        description: 'Comma-separated list of event types to filter by',
      },
      {
        name: 'start_time',
        type: 'integer',
        required: false,
        description: 'Unix timestamp (seconds) for the start of the time range',
      },
      {
        name: 'end_time',
        type: 'integer',
        required: false,
        description: 'Unix timestamp (seconds) for the end of the time range',
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: 'Number of events to return per page',
      },
      {
        name: 'next_page',
        type: 'string',
        required: false,
        description: 'Pagination cursor returned by the previous response',
      },
    ],
  },
  {
    name: 'figma_library_analytics_component_actions_get',
    description:
      'Returns analytics data on component insertion, detachment, and usage actions from a library file. Enterprise only: requires the `library_analytics:read` scope.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the library file',
      },
      {
        name: 'group_by',
        type: 'string',
        required: true,
        description: 'Dimension to group results by: `component` or `team`',
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: 'Start date for the analytics range (ISO 8601 format, e.g., `2024-01-01`)',
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: 'End date for the analytics range (ISO 8601 format)',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Sort order for results: `asc` or `desc`',
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: 'Pagination cursor for the next page of results',
      },
    ],
  },
  {
    name: 'figma_library_analytics_component_usages_get',
    description:
      'Returns a snapshot of how many times each component from a library is used across the organization. Enterprise only: requires the `library_analytics:read` scope.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the library file',
      },
      {
        name: 'group_by',
        type: 'string',
        required: true,
        description: 'Dimension to group results by: `component` or `team`',
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: 'Pagination cursor for the next page of results',
      },
    ],
  },
  {
    name: 'figma_library_analytics_style_actions_get',
    description:
      'Returns analytics data on style insertion and detachment actions from a library file. Enterprise only: requires the `library_analytics:read` scope.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the library file',
      },
      {
        name: 'group_by',
        type: 'string',
        required: true,
        description: 'Dimension to group results by: `style` or `team`',
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: 'Start date for the analytics range (ISO 8601 format)',
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: 'End date for the analytics range (ISO 8601 format)',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Sort order for results: `asc` or `desc`',
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: 'Pagination cursor for the next page of results',
      },
    ],
  },
  {
    name: 'figma_library_analytics_style_usages_get',
    description:
      'Returns a snapshot of how many times each style from a library is used across the organization. Enterprise only: requires the `library_analytics:read` scope.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the library file',
      },
      {
        name: 'group_by',
        type: 'string',
        required: true,
        description: 'Dimension to group results by: `style` or `team`',
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: 'Pagination cursor for the next page of results',
      },
    ],
  },
  {
    name: 'figma_library_analytics_variable_actions_get',
    description:
      'Returns analytics data on variable actions from a library file. Enterprise only: requires the `library_analytics:read` scope.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the library file',
      },
      {
        name: 'group_by',
        type: 'string',
        required: true,
        description: 'Dimension to group results by: `variable` or `team`',
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: 'Start date for the analytics range (ISO 8601 format)',
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: 'End date for the analytics range (ISO 8601 format)',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Sort order for results: `asc` or `desc`',
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: 'Pagination cursor for the next page of results',
      },
    ],
  },
  {
    name: 'figma_library_analytics_variable_usages_get',
    description:
      'Returns a snapshot of how many times each variable from a library is used across the organization. Enterprise only: requires the `library_analytics:read` scope.',
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: 'The unique key identifying the library file',
      },
      {
        name: 'group_by',
        type: 'string',
        required: true,
        description: 'Dimension to group results by: `variable` or `team`',
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: 'Pagination cursor for the next page of results',
      },
    ],
  },
]
