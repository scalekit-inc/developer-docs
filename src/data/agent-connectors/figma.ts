import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'figma_activity_logs_list',
    description: `Returns activity log events for an organization (Enterprise only). Includes events for file edits, permissions changes, and user actions.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor from previous response for pagination.`,
      },
      {
        name: 'end_time',
        type: 'integer',
        required: false,
        description: `Unix timestamp (seconds) to stop fetching events at.`,
      },
      {
        name: 'event_type',
        type: 'string',
        required: false,
        description: `Filter by a specific event type, e.g. 'file.update'.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of events to return (1-1000, default 100).`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `Sort order: asc or desc by timestamp. Default is desc.`,
      },
      {
        name: 'start_time',
        type: 'integer',
        required: false,
        description: `Unix timestamp (seconds) to start fetching events from.`,
      },
    ],
  },
  {
    name: 'figma_comment_reaction_create',
    description: `Adds an emoji reaction to a comment in a Figma file.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The ID of the comment to react to.`,
      },
      {
        name: 'emoji',
        type: 'string',
        required: true,
        description: `The emoji to react with (e.g. ':thumbsup:').`,
      },
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
    ],
  },
  {
    name: 'figma_comment_reaction_delete',
    description: `Removes the authenticated user's emoji reaction from a comment in a Figma file.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The ID of the comment to remove reaction from.`,
      },
      {
        name: 'emoji',
        type: 'string',
        required: true,
        description: `The emoji reaction to remove (e.g. ':thumbsup:').`,
      },
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
    ],
  },
  {
    name: 'figma_comment_reactions_list',
    description: `Returns a list of emoji reactions on a specific comment in a Figma file.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The ID of the comment to get reactions for.`,
      },
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for next page of results.`,
      },
    ],
  },
  {
    name: 'figma_component_get',
    description: `Returns metadata for a published component by its key, including name, description, thumbnail, and containing file information.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The unique key of the component.`,
      },
    ],
  },
  {
    name: 'figma_component_set_get',
    description: `Returns metadata for a published component set (a group of related component variants) by its key.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The unique key of the component set.`,
      },
    ],
  },
  {
    name: 'figma_dev_resource_create',
    description: `Creates a dev resource (external link) attached to a node in a Figma file, such as a link to Storybook, Jira, or documentation.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The key of the Figma file containing the target node.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name for the dev resource link.`,
      },
      {
        name: 'node_id',
        type: 'string',
        required: true,
        description: `The ID of the node to attach the dev resource to.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL of the external resource.`,
      },
    ],
  },
  {
    name: 'figma_dev_resource_delete',
    description: `Permanently deletes a dev resource from a node in a Figma file.`,
    params: [
      {
        name: 'dev_resource_id',
        type: 'string',
        required: true,
        description: `The ID of the dev resource to delete.`,
      },
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The key of the Figma file containing the dev resource.`,
      },
    ],
  },
  {
    name: 'figma_dev_resource_update',
    description: `Updates an existing dev resource attached to a node in a Figma file.`,
    params: [
      {
        name: 'dev_resource_id',
        type: 'string',
        required: true,
        description: `The ID of the dev resource to update.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New display name for the dev resource.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `New URL for the dev resource.`,
      },
    ],
  },
  {
    name: 'figma_dev_resources_list',
    description: `Returns dev resources (links to external tools like Storybook, Jira, etc.) attached to nodes in a Figma file.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The key of the Figma file to get dev resources for.`,
      },
      {
        name: 'node_ids',
        type: 'string',
        required: false,
        description: `Comma-separated node IDs to filter by. Omit to return all dev resources in the file.`,
      },
    ],
  },
  {
    name: 'figma_file_comment_create',
    description: `Posts a new comment on a Figma file. Can be placed at a specific canvas position or anchored to a specific node.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The text content of the comment.`,
      },
      {
        name: 'client_meta',
        type: 'string',
        required: false,
        description: `JSON string specifying position or node anchor for the comment, e.g. {"node_id":"1:2","node_offset":{"x":0,"y":0}}.`,
      },
    ],
  },
  {
    name: 'figma_file_comment_delete',
    description: `Deletes a specific comment from a Figma file. Only the comment author or file owner can delete a comment.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The ID of the comment to delete.`,
      },
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
    ],
  },
  {
    name: 'figma_file_comments_list',
    description: `Returns all comments left on a Figma file, including their text, author, position, and resolved status.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
      {
        name: 'as_md',
        type: 'boolean',
        required: false,
        description: `If true, returns comment text as Markdown.`,
      },
    ],
  },
  {
    name: 'figma_file_component_sets_list',
    description: `Returns all published component sets in a Figma file.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
    ],
  },
  {
    name: 'figma_file_components_list',
    description: `Returns a list of all published components in a Figma file, including their keys, names, descriptions, and thumbnails.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
    ],
  },
  {
    name: 'figma_file_get',
    description: `Returns a Figma file's full document tree including all nodes, components, styles, and metadata.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file (found in the file URL).`,
      },
      {
        name: 'depth',
        type: 'integer',
        required: false,
        description: `Depth of the document tree to return (1-4). Lower depth returns faster.`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `A specific version ID to get. Omit to get the current version.`,
      },
    ],
  },
  {
    name: 'figma_file_image_fills_get',
    description: `Returns download URLs for all image fills used in a Figma file. Image fills are images that have been applied as fills to nodes.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
    ],
  },
  {
    name: 'figma_file_images_render',
    description: `Renders nodes from a Figma file as images (PNG, JPG, SVG, or PDF) and returns URLs to download them.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of node IDs to render.`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Image format: jpg, png, svg, or pdf. Default is png.`,
      },
      {
        name: 'scale',
        type: 'number',
        required: false,
        description: `Image scale factor (0.01 to 4). Default is 1.`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `A specific version ID to render from.`,
      },
    ],
  },
  {
    name: 'figma_file_nodes_get',
    description: `Returns specific nodes from a Figma file by their node IDs, along with their children and associated styles and components.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of node IDs to retrieve.`,
      },
      {
        name: 'depth',
        type: 'integer',
        required: false,
        description: `Depth of the document tree to return for each node.`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `A specific version ID to fetch nodes from.`,
      },
    ],
  },
  {
    name: 'figma_file_styles_list',
    description: `Returns all published styles in a Figma file, including color, text, effect, and grid styles.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
    ],
  },
  {
    name: 'figma_file_variables_local_get',
    description: `Returns all local variables and variable collections defined in a Figma file. Requires the variables:read scope.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
    ],
  },
  {
    name: 'figma_file_variables_published_get',
    description: `Returns all published variables and variable collections from a Figma file's library. Requires the variables:read scope.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
    ],
  },
  {
    name: 'figma_file_variables_update',
    description: `Creates, updates, or deletes variables and variable collections in a Figma file. Accepts a JSON payload describing the changes. Requires the variables:write scope.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
      {
        name: 'payload',
        type: 'string',
        required: true,
        description: `JSON string with variableCollections, variables, and variableModeValues arrays describing changes to apply.`,
      },
    ],
  },
  {
    name: 'figma_file_versions_list',
    description: `Returns the version history of a Figma file, including version IDs, labels, descriptions, and creation timestamps.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The unique key of the Figma file.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Return versions created after this version ID (for pagination).`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Return versions created before this version ID (for pagination).`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of versions to return per page.`,
      },
    ],
  },
  {
    name: 'figma_library_analytics_component_actions_get',
    description: `Returns analytics data on component insertion, detachment, and usage actions from a library file. Enterprise only.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The key of the library Figma file.`,
      },
      {
        name: 'group_by',
        type: 'string',
        required: true,
        description: `Dimension to group results by: component or team.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date for analytics in YYYY-MM-DD format.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date for analytics in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'figma_library_analytics_component_usages_get',
    description: `Returns a snapshot of how many times each component from a library is used across the organization. Enterprise only.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The key of the library Figma file.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response.`,
      },
    ],
  },
  {
    name: 'figma_library_analytics_style_actions_get',
    description: `Returns analytics data on style insertion and detachment actions from a library file. Enterprise only.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The key of the library Figma file.`,
      },
      {
        name: 'group_by',
        type: 'string',
        required: true,
        description: `Dimension to group results by: style or team.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date for analytics in YYYY-MM-DD format.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date for analytics in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'figma_library_analytics_style_usages_get',
    description: `Returns a snapshot of how many times each style from a library is used across the organization. Enterprise only.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The key of the library Figma file.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response.`,
      },
    ],
  },
  {
    name: 'figma_library_analytics_variable_actions_get',
    description: `Returns analytics data on variable actions from a library file. Enterprise only.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The key of the library Figma file.`,
      },
      {
        name: 'group_by',
        type: 'string',
        required: true,
        description: `Dimension to group results by: variable or team.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date for analytics in YYYY-MM-DD format.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date for analytics in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'figma_library_analytics_variable_usages_get',
    description: `Returns a snapshot of how many times each variable from a library is used across the organization. Enterprise only.`,
    params: [
      {
        name: 'file_key',
        type: 'string',
        required: true,
        description: `The key of the library Figma file.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response.`,
      },
    ],
  },
  {
    name: 'figma_me_get',
    description: `Returns the authenticated user's information including name, email, and profile image URL.`,
    params: [],
  },
  {
    name: 'figma_payments_get',
    description: `Returns payment and plan information for a Figma user or resource, including subscription status and plan type.`,
    params: [
      {
        name: 'resource_id',
        type: 'string',
        required: false,
        description: `The ID of the plugin or widget resource.`,
      },
      {
        name: 'resource_type',
        type: 'string',
        required: false,
        description: `The type of resource: plugin or widget.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `The ID of the user to get payment info for.`,
      },
    ],
  },
  {
    name: 'figma_project_files_list',
    description: `Returns all files in a Figma project, including file keys, names, thumbnails, and last modified timestamps.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The ID of the Figma project.`,
      },
      {
        name: 'branch_data',
        type: 'boolean',
        required: false,
        description: `If true, includes branch metadata for each file.`,
      },
    ],
  },
  {
    name: 'figma_style_get',
    description: `Returns metadata for a published style by its key, including name, description, style type, and containing file information.`,
    params: [
      { name: 'key', type: 'string', required: true, description: `The unique key of the style.` },
    ],
  },
  {
    name: 'figma_team_component_sets_list',
    description: `Returns all published component sets in a Figma team library, with pagination support.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The ID of the Figma team.` },
      {
        name: 'after',
        type: 'integer',
        required: false,
        description: `Cursor for the next page of results.`,
      },
      {
        name: 'before',
        type: 'integer',
        required: false,
        description: `Cursor for the previous page of results.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of component sets to return per page.`,
      },
    ],
  },
  {
    name: 'figma_team_components_list',
    description: `Returns all published components in a Figma team library, with pagination support.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The ID of the Figma team.` },
      {
        name: 'after',
        type: 'integer',
        required: false,
        description: `Cursor for the next page of results.`,
      },
      {
        name: 'before',
        type: 'integer',
        required: false,
        description: `Cursor for the previous page of results.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of components to return per page.`,
      },
    ],
  },
  {
    name: 'figma_team_get',
    description: `Returns metadata about a Figma team, including its name and member count.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The ID of the Figma team.` },
    ],
  },
  {
    name: 'figma_team_projects_list',
    description: `Returns all projects within a Figma team that the authenticated user has access to.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The ID of the Figma team.` },
    ],
  },
  {
    name: 'figma_team_styles_list',
    description: `Returns all published styles in a Figma team library, with pagination support.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The ID of the Figma team.` },
      {
        name: 'after',
        type: 'integer',
        required: false,
        description: `Cursor for the next page of results.`,
      },
      {
        name: 'before',
        type: 'integer',
        required: false,
        description: `Cursor for the previous page of results.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of styles to return per page.`,
      },
    ],
  },
  {
    name: 'figma_team_webhooks_list',
    description: `Returns all webhooks registered for a Figma team.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The ID of the Figma team.` },
    ],
  },
  {
    name: 'figma_webhook_create',
    description: `Creates a new webhook that sends events to the specified endpoint URL when Figma events occur in a team.`,
    params: [
      {
        name: 'endpoint',
        type: 'string',
        required: true,
        description: `The HTTPS URL to send webhook payloads to.`,
      },
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The event type to subscribe to: FILE_UPDATE, FILE_DELETE, FILE_VERSION_UPDATE, FILE_COMMENT, LIBRARY_PUBLISH.`,
      },
      {
        name: 'passcode',
        type: 'string',
        required: true,
        description: `A passcode included in the webhook payload for verification.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `The ID of the team to subscribe to events for.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the webhook.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Webhook status: ACTIVE or PAUSED.`,
      },
    ],
  },
  {
    name: 'figma_webhook_delete',
    description: `Permanently deletes a Figma webhook. This stops all future event deliveries for this webhook.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to delete.`,
      },
    ],
  },
  {
    name: 'figma_webhook_get',
    description: `Returns details of a specific Figma webhook by its ID, including event type, endpoint, and status.`,
    params: [
      { name: 'webhook_id', type: 'string', required: true, description: `The ID of the webhook.` },
    ],
  },
  {
    name: 'figma_webhook_requests_list',
    description: `Returns the delivery history for a webhook, including request payloads, response codes, and timestamps.`,
    params: [
      { name: 'webhook_id', type: 'string', required: true, description: `The ID of the webhook.` },
    ],
  },
  {
    name: 'figma_webhook_update',
    description: `Updates an existing Figma webhook's endpoint, passcode, status, or description.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description for the webhook.`,
      },
      {
        name: 'endpoint',
        type: 'string',
        required: false,
        description: `New HTTPS URL to send webhook payloads to.`,
      },
      {
        name: 'passcode',
        type: 'string',
        required: false,
        description: `New passcode for webhook verification.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Webhook status: ACTIVE or PAUSED.`,
      },
    ],
  },
]
