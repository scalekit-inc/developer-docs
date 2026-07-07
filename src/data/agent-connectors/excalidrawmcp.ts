import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'excalidrawmcp_create_collection',
    description: `Create a new collection in the workspace to organize scenes.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the new collection.` },
    ],
  },
  {
    name: 'excalidrawmcp_create_collection_scene',
    description: `Create a new scene within a specific collection.`,
    params: [
      {
        name: 'collectionId',
        type: 'string',
        required: true,
        description: `The unique identifier of the collection in which to create the scene.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the new scene.` },
      {
        name: 'pinned',
        type: 'boolean',
        required: true,
        description: `Whether to pin the scene to the top of the scene list.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_create_email_invite',
    description: `Create a workspace invite for a specific email address.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address to invite to the workspace.`,
      },
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `Role to assign to the invited user.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_create_invite_link',
    description: `Create a reusable workspace invite link with optional usage and domain restrictions.`,
    params: [
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `Role to assign to users who accept the invite link.`,
      },
      {
        name: 'maxUses',
        type: 'string',
        required: false,
        description: `Maximum number of times the link can be used. Use 'unlimited' for no limit.`,
      },
      {
        name: 'restrictedDomains',
        type: 'array',
        required: false,
        description: `List of email domains allowed to use this invite link.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_create_scene',
    description: `Create a new scene in the workspace within a specified collection.`,
    params: [
      {
        name: 'collectionId',
        type: 'string',
        required: true,
        description: `ID of the collection to place the new scene in.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name for the new scene.` },
      {
        name: 'pinned',
        type: 'boolean',
        required: true,
        description: `Whether to pin the scene to the top of the scene list.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_delete_collection',
    description: `Soft-delete a collection by moving it to trash. Scenes within the collection are not deleted.`,
    params: [
      {
        name: 'collectionId',
        type: 'string',
        required: true,
        description: `The unique identifier of the collection to delete.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_delete_invite',
    description: `Cancel and delete a pending workspace invitation.`,
    params: [
      {
        name: 'inviteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the workspace invitation to cancel and delete.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_edit_scene_content',
    description: `Add, update, and delete scene elements using valid Excalidraw element format. Before first use, call read_excalidraw_format. Do not include ids in add. Use tempId for same-request references. Bind arrows explicitly with startBinding/endBinding.`,
    params: [
      { name: 'sceneId', type: 'string', required: true, description: `ID of the scene to edit.` },
      {
        name: 'add',
        type: 'string',
        required: false,
        description: `JSON array string of new Excalidraw element skeletons to add. Do not include 'id'. Use tempId for same-request references.`,
      },
      {
        name: 'delete',
        type: 'array',
        required: false,
        description: `Array of element IDs to remove from the scene.`,
      },
      {
        name: 'update',
        type: 'string',
        required: false,
        description: `JSON array string of element patches; each patch must include 'id' and the properties to change.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_get_collection',
    description: `Retrieve detailed information about a specific collection by its ID.`,
    params: [
      {
        name: 'collectionId',
        type: 'string',
        required: true,
        description: `The unique identifier of the collection to retrieve.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_get_invite',
    description: `Retrieve details for a specific workspace invitation by its ID.`,
    params: [
      {
        name: 'inviteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the workspace invitation to retrieve.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_get_scene',
    description: `Retrieve metadata for a specific scene by its ID.`,
    params: [
      {
        name: 'sceneId',
        type: 'string',
        required: true,
        description: `The unique identifier of the scene to retrieve.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_get_scene_content',
    description: `Retrieve the complete content of a scene including all drawing elements and files. Use search_scene_content first if you only need to locate specific elements.`,
    params: [
      {
        name: 'sceneId',
        type: 'string',
        required: true,
        description: `The unique identifier of the scene whose full content to retrieve.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_get_workspace',
    description: `Retrieve workspace configuration and metadata for the current workspace.`,
    params: [],
  },
  {
    name: 'excalidrawmcp_get_workspace_user',
    description: `Retrieve details for a specific workspace member by their user ID.`,
    params: [
      {
        name: 'userId',
        type: 'string',
        required: true,
        description: `The unique identifier of the workspace user to retrieve.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_list_collection_scenes',
    description: `Retrieve a paginated list of all scenes that belong to a specific collection.`,
    params: [
      {
        name: 'collectionId',
        type: 'string',
        required: true,
        description: `The unique identifier of the collection whose scenes to list.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of scenes to return per page (1-100).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of items to skip before starting to collect results.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_list_collections',
    description: `Retrieve a paginated list of all collections in the workspace.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of collections to return per page (1-100).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of items to skip before starting to collect results.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_list_invites',
    description: `Retrieve a paginated list of pending workspace invitations.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of invitations to return per page (1-100).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of items to skip before starting to collect results.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_list_logs',
    description: `Retrieve a paginated list of workspace activity and audit logs with filtering by user, action, operation, and date range.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Filter logs by a specific action type.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Sequence number for cursor-based pagination.`,
      },
      {
        name: 'dateFrom',
        type: 'string',
        required: false,
        description: `ISO 8601 date filter start (inclusive).`,
      },
      {
        name: 'dateTo',
        type: 'string',
        required: false,
        description: `ISO 8601 date filter end (inclusive).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of log entries to return per page (1-100).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of items to skip before starting to collect results.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `Filter logs by operation type (create, read, update, or delete).`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Page number for offset-based pagination.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `Filter logs by a specific user ID.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_list_scenes',
    description: `Retrieve a paginated list of all scenes in the workspace with their metadata.`,
    params: [
      {
        name: 'collectionId',
        type: 'string',
        required: false,
        description: `Filter scenes by a specific collection ID.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of scenes to return per page (1-100).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of items to skip before starting to collect results.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_list_workspace_users',
    description: `Retrieve a paginated list of all members in the current workspace.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of workspace users to return per page (1-100).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of items to skip before starting to collect results.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_read_excalidraw_format',
    description: `Returns the Excalidraw element format reference with agent-facing rules for constructing valid diagram payloads. Call this before edit_scene_content if unfamiliar with the format.`,
    params: [],
  },
  {
    name: 'excalidrawmcp_remove_workspace_user',
    description: `Remove a user from the workspace. This does not delete their Excalidraw+ account.`,
    params: [
      {
        name: 'userId',
        type: 'string',
        required: true,
        description: `The unique identifier of the workspace user to remove.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_search_scene_content',
    description: `Search a scene's shapes and text without loading the full scene content. Returns matching Excalidraw element nodes filtered by type, frame, and text query.`,
    params: [
      {
        name: 'sceneId',
        type: 'string',
        required: true,
        description: `ID of the scene to search within.`,
      },
      {
        name: 'frameId',
        type: 'string',
        required: false,
        description: `Limit search to elements inside this frame.`,
      },
      {
        name: 'includeDeleted',
        type: 'boolean',
        required: false,
        description: `Whether to include soft-deleted elements in results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of matching elements to return (1-100, default 25).`,
      },
      {
        name: 'matchMode',
        type: 'string',
        required: false,
        description: `How the query string is matched against element text.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Text query to match against shape labels and text content.`,
      },
      { name: 'types', type: 'array', required: false, description: `Element types to filter by.` },
    ],
  },
  {
    name: 'excalidrawmcp_take_screenshot',
    description: `Render a scene, or a specific frame, as a PNG image so you can visually inspect the current Excalidraw content. Use this after editing scene content to verify layout and visual correctness.`,
    params: [
      {
        name: 'sceneId',
        type: 'string',
        required: true,
        description: `ID of the scene to render.`,
      },
      {
        name: 'frameId',
        type: 'string',
        required: false,
        description: `Optional frame ID to render. If omitted, the full scene is rendered.`,
      },
      {
        name: 'maxWidth',
        type: 'integer',
        required: false,
        description: `Maximum output PNG width in pixels. Screenshots are capped at 1920x1080.`,
      },
      {
        name: 'padding',
        type: 'integer',
        required: false,
        description: `Padding around the rendered scene or frame in scene pixels. Default: 20.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_update_collection',
    description: `Update the name of an existing collection.`,
    params: [
      {
        name: 'collectionId',
        type: 'string',
        required: true,
        description: `The unique identifier of the collection to update.`,
      },
      { name: 'name', type: 'string', required: true, description: `New name for the collection.` },
    ],
  },
  {
    name: 'excalidrawmcp_update_invite',
    description: `Modify the settings of an existing workspace invitation such as the email, role, or max uses.`,
    params: [
      {
        name: 'inviteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the workspace invitation to update.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Updated email address for the invitation.`,
      },
      {
        name: 'maxUses',
        type: 'integer',
        required: false,
        description: `Maximum number of times this invite link can be used.`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `The workspace role to assign to the invitee upon acceptance.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_update_scene',
    description: `Update metadata fields of an existing scene such as its name, pinned status, or collection.`,
    params: [
      {
        name: 'sceneId',
        type: 'string',
        required: true,
        description: `The unique identifier of the scene to update.`,
      },
      {
        name: 'collectionId',
        type: 'string',
        required: false,
        description: `New collection ID to move the scene to.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the scene.` },
      {
        name: 'pinned',
        type: 'boolean',
        required: false,
        description: `Whether the scene should be pinned to the top of the scene list.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_update_workspace',
    description: `Modify workspace-level settings such as name and picture.`,
    params: [
      { name: 'name', type: 'string', required: false, description: `New name for the workspace.` },
      {
        name: 'picture',
        type: 'string',
        required: false,
        description: `URI for the workspace picture, or null to remove the current picture.`,
      },
    ],
  },
  {
    name: 'excalidrawmcp_update_workspace_user',
    description: `Modify workspace-level properties for a specific user such as their name, picture, or role.`,
    params: [
      {
        name: 'userId',
        type: 'string',
        required: true,
        description: `The unique identifier of the workspace user to update.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated display name for the user.`,
      },
      {
        name: 'picture',
        type: 'string',
        required: false,
        description: `URI for the user's picture, or null to remove the current picture.`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `The workspace role to assign to the user.`,
      },
    ],
  },
]
