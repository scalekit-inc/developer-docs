import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'clickup_chat_channels_list',
    description: `List Chat channels in a ClickUp Workspace, including regular channels, direct messages, and group direct messages.`,
    params: [
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `The Workspace ID to list Chat channels for`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response`,
      },
      {
        name: 'description_format',
        type: 'string',
        required: false,
        description: `Format to render each channel's description in`,
      },
      {
        name: 'include_closed',
        type: 'boolean',
        required: false,
        description: `If true, includes closed direct messages and group direct messages. Defaults to false.`,
      },
      {
        name: 'is_follower',
        type: 'boolean',
        required: false,
        description: `If true, only return channels the authenticated user follows. Defaults to false.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of channels to return per page (1-100). Defaults to 50.`,
      },
      {
        name: 'with_message_since',
        type: 'integer',
        required: false,
        description: `Only return channels with messages since this Unix timestamp (milliseconds)`,
      },
    ],
  },
  {
    name: 'clickup_chat_message_create',
    description: `Send a top-level message into a ClickUp Chat channel. Note: the real ClickUp v3 endpoint for this requires both a workspace_id and channel_id in the path (unlike some early docs listings) — use clickup_chat_channels_list to find a channel_id first.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the Chat channel to post the message into`,
      },
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The message content (max 40,000 characters)`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `The Workspace ID the channel belongs to`,
      },
      {
        name: 'content_format',
        type: 'string',
        required: false,
        description: `Format of the content field`,
      },
      {
        name: 'followers',
        type: 'array',
        required: false,
        description: `Array of user IDs to add as followers of this message (max 10)`,
      },
      {
        name: 'post_title',
        type: 'string',
        required: false,
        description: `Title for the message when type is "post"`,
      },
      { name: 'type', type: 'string', required: false, description: `Type of message to create` },
    ],
  },
  {
    name: 'clickup_checklist_delete',
    description: `Permanently delete a checklist and all of its checklist items from a ClickUp task.`,
    params: [
      {
        name: 'checklist_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist to delete`,
      },
    ],
  },
  {
    name: 'clickup_checklist_item_create',
    description: `Add a new item to an existing ClickUp task checklist.`,
    params: [
      { name: 'checklist_id', type: 'string', required: true, description: `Checklist ID (UUID)` },
      { name: 'name', type: 'string', required: true, description: `Item label` },
      {
        name: 'assignee',
        type: 'integer',
        required: false,
        description: `User ID to assign to this item`,
      },
    ],
  },
  {
    name: 'clickup_checklist_item_delete',
    description: `Permanently delete a single line item from a ClickUp checklist.`,
    params: [
      {
        name: 'checklist_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist that contains the item`,
      },
      {
        name: 'checklist_item_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist item to delete`,
      },
    ],
  },
  {
    name: 'clickup_checklist_item_update',
    description: `Rename, reassign, resolve, or nest a ClickUp checklist item.`,
    params: [
      {
        name: 'checklist_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist that contains the item`,
      },
      {
        name: 'checklist_item_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist item to update`,
      },
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `User ID to assign this checklist item to. Pass null to unassign.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New text for the checklist item`,
      },
      {
        name: 'parent',
        type: 'string',
        required: false,
        description: `The checklist_item_id of another item to nest this item under. Pass null to un-nest.`,
      },
      {
        name: 'resolved',
        type: 'boolean',
        required: false,
        description: `Whether the checklist item is marked as resolved (checked off)`,
      },
    ],
  },
  {
    name: 'clickup_checklist_update',
    description: `Rename a ClickUp checklist or change its position among the other checklists on a task.`,
    params: [
      {
        name: 'checklist_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist to update`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the checklist` },
      {
        name: 'position',
        type: 'integer',
        required: false,
        description: `Display order of this checklist among the other checklists on the task. Use 0 to place it at the top.`,
      },
    ],
  },
  {
    name: 'clickup_comment_create',
    description: `Add a new comment to a ClickUp task. Supports assigning the comment to a user and sending notifications.`,
    params: [
      {
        name: 'comment_text',
        type: 'string',
        required: true,
        description: `The content of the comment`,
      },
      {
        name: 'notify_all',
        type: 'boolean',
        required: true,
        description: `When true, notifies the comment creator in addition to other watchers`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task to comment on`,
      },
      {
        name: 'assignee',
        type: 'integer',
        required: false,
        description: `User ID to assign this comment to`,
      },
    ],
  },
  {
    name: 'clickup_comment_create_list',
    description: `Add a new comment to a ClickUp list. Supports assigning the comment to a user and sending notifications.`,
    params: [
      {
        name: 'assignee',
        type: 'integer',
        required: true,
        description: `User ID to assign this comment to`,
      },
      {
        name: 'comment_text',
        type: 'string',
        required: true,
        description: `The content of the comment`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the list to comment on`,
      },
      {
        name: 'notify_all',
        type: 'boolean',
        required: true,
        description: `When true, also notifies the comment creator`,
      },
    ],
  },
  {
    name: 'clickup_comment_delete',
    description: `Permanently delete a ClickUp comment by comment ID. This action cannot be undone.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the comment to delete`,
      },
    ],
  },
  {
    name: 'clickup_comment_get_list',
    description: `Retrieve comments on a ClickUp list. Returns up to 25 most recent comments by default. Use start and start_id for pagination.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the list`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `Unix timestamp in milliseconds of a reference comment for pagination`,
      },
      {
        name: 'start_id',
        type: 'string',
        required: false,
        description: `ID of a reference comment for pagination`,
      },
    ],
  },
  {
    name: 'clickup_comment_get_task',
    description: `Retrieve comments on a ClickUp task. Returns up to 25 most recent comments. Use start and start_id for pagination.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `Unix timestamp in milliseconds of a reference comment for pagination`,
      },
      {
        name: 'start_id',
        type: 'string',
        required: false,
        description: `ID of a reference comment for pagination`,
      },
    ],
  },
  {
    name: 'clickup_comment_thread_create',
    description: `Post a threaded reply to an existing ClickUp comment.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the parent comment to reply to`,
      },
      {
        name: 'comment_text',
        type: 'string',
        required: true,
        description: `The plain text content of the reply`,
      },
      {
        name: 'assignee',
        type: 'integer',
        required: false,
        description: `User ID to assign the reply to`,
      },
      {
        name: 'group_assignee',
        type: 'string',
        required: false,
        description: `Group (user group) ID to assign the reply to`,
      },
      {
        name: 'notify_all',
        type: 'boolean',
        required: false,
        description: `When true, notifies all comment participants`,
      },
    ],
  },
  {
    name: 'clickup_comment_thread_list',
    description: `Retrieve the threaded replies on a ClickUp comment. The parent comment itself is not included in the response.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the parent comment to fetch replies for`,
      },
    ],
  },
  {
    name: 'clickup_comment_update',
    description: `Update an existing ClickUp comment. Supports changing comment text, assignee, and resolved status.`,
    params: [
      {
        name: 'assignee',
        type: 'integer',
        required: true,
        description: `User ID to assign this comment to`,
      },
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the comment to update`,
      },
      {
        name: 'comment_text',
        type: 'string',
        required: true,
        description: `New text content for the comment`,
      },
      {
        name: 'resolved',
        type: 'boolean',
        required: true,
        description: `Whether the comment is marked as resolved`,
      },
      {
        name: 'group_assignee',
        type: 'string',
        required: false,
        description: `User group ID to assign this comment to`,
      },
    ],
  },
  {
    name: 'clickup_custom_field_list',
    description: `View the Custom Fields (and their configuration options) available on a ClickUp list.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the list to fetch available Custom Fields for`,
      },
      {
        name: 'include_applied_objects',
        type: 'boolean',
        required: false,
        description: `When true, includes applied_objects for task-type-scoped Custom Fields`,
      },
    ],
  },
  {
    name: 'clickup_custom_field_value_remove',
    description: `Clear the value of a Custom Field on a ClickUp task.`,
    params: [
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The UUID of the Custom Field to clear`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task to clear the field value on`,
      },
      {
        name: 'custom_task_ids',
        type: 'boolean',
        required: false,
        description: `When true, task_id is treated as a custom task ID instead of a ClickUp task ID. Requires team_id.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `The Workspace ID. Required when custom_task_ids is true.`,
      },
    ],
  },
  {
    name: 'clickup_custom_field_value_set',
    description: `Set the value of a Custom Field on a ClickUp task. The shape of the value depends on the field's type (text, number, dropdown, date, people, money, etc).`,
    params: [
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The UUID of the Custom Field to set`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task to set the field value on`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `JSON-encoded value to set, matching the field's type. Text/URL/email/phone: a JSON string, e.g. "In Progress". Number/Money: a JSON number, e.g. 42. Dropdown/Label: a JSON string option UUID or array of UUIDs. Date: a Unix millisecond timestamp number. People/Task relationship: a JSON object like {"add":[183],"rem":[]}. Manual Progress: {"current":20}.`,
      },
      {
        name: 'custom_task_ids',
        type: 'boolean',
        required: false,
        description: `When true, task_id is treated as a custom task ID instead of a ClickUp task ID. Requires team_id.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `The Workspace ID. Required when custom_task_ids is true.`,
      },
    ],
  },
  {
    name: 'clickup_custom_task_types_list',
    description: `List the custom task types (e.g. Bug, Sprint) configured for a ClickUp Workspace, so their IDs can be used to set a task's type correctly.`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `The workspace (team) ID to list custom task types for`,
      },
    ],
  },
  {
    name: 'clickup_doc_create',
    description: `Create a new ClickUp Doc in a Workspace, optionally nested under a Space, Folder, List, or the Workspace root.`,
    params: [
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `The ID of the Workspace to create the Doc in`,
      },
      {
        name: 'create_page',
        type: 'boolean',
        required: false,
        description: `When true, also creates a first blank page in the new Doc`,
      },
      { name: 'name', type: 'string', required: false, description: `The name of the new Doc` },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `The ID of the Space, Folder, List, or Workspace that will contain this Doc`,
      },
      {
        name: 'parent_type',
        type: 'string',
        required: false,
        description: `The type of container parent_id refers to`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Visibility of the new Doc`,
      },
    ],
  },
  {
    name: 'clickup_doc_get',
    description: `Fetch metadata for a single ClickUp Doc by ID.`,
    params: [
      { name: 'doc_id', type: 'string', required: true, description: `The ID of the Doc to fetch` },
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `The ID of the Workspace the Doc belongs to`,
      },
    ],
  },
  {
    name: 'clickup_doc_page_create',
    description: `Create a new page inside a ClickUp Doc, optionally nested under a parent page.`,
    params: [
      {
        name: 'doc_id',
        type: 'string',
        required: true,
        description: `The ID of the Doc to add the page to`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `The ID of the Workspace the Doc belongs to`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The content of the new page`,
      },
      {
        name: 'content_format',
        type: 'string',
        required: false,
        description: `The format the content field is written in. Default is text/md.`,
      },
      { name: 'name', type: 'string', required: false, description: `The name of the new page` },
      {
        name: 'parent_page_id',
        type: 'string',
        required: false,
        description: `The ID of the parent page to nest this new page under`,
      },
      {
        name: 'sub_title',
        type: 'string',
        required: false,
        description: `Subtitle of the new page`,
      },
    ],
  },
  {
    name: 'clickup_doc_page_get',
    description: `Fetch the content of a single page in a ClickUp Doc.`,
    params: [
      {
        name: 'doc_id',
        type: 'string',
        required: true,
        description: `The ID of the Doc the page belongs to`,
      },
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The ID of the page to fetch`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `The ID of the Workspace the Doc belongs to`,
      },
      {
        name: 'content_format',
        type: 'string',
        required: false,
        description: `Format to return the page content in. Default is text/md.`,
      },
    ],
  },
  {
    name: 'clickup_doc_page_listing',
    description: `Retrieve the page tree (IDs, titles, and nesting) for a ClickUp Doc, without full page content.`,
    params: [
      {
        name: 'doc_id',
        type: 'string',
        required: true,
        description: `The ID of the Doc to list pages for`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `The ID of the Workspace the Doc belongs to`,
      },
      {
        name: 'max_page_depth',
        type: 'integer',
        required: false,
        description: `The maximum nesting depth of pages/subpages to return. Use -1 for no limit. Default is -1.`,
      },
    ],
  },
  {
    name: 'clickup_doc_page_update',
    description: `Update the title or content of a page in a ClickUp Doc. Content can replace, append to, or prepend to the existing page content.`,
    params: [
      {
        name: 'doc_id',
        type: 'string',
        required: true,
        description: `The ID of the Doc the page belongs to`,
      },
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The ID of the page to update`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `The ID of the Workspace the Doc belongs to`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `New content for the page, applied according to content_edit_mode`,
      },
      {
        name: 'content_edit_mode',
        type: 'string',
        required: false,
        description: `How the content field is applied to the existing page content. Default is replace.`,
      },
      {
        name: 'content_format',
        type: 'string',
        required: false,
        description: `The format the content field is written in. Default is text/md.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the page` },
      {
        name: 'sub_title',
        type: 'string',
        required: false,
        description: `New subtitle for the page`,
      },
    ],
  },
  {
    name: 'clickup_doc_search',
    description: `Search for ClickUp Docs in a Workspace, with optional filters for creator, parent location, and archived/deleted state.`,
    params: [
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `The ID of the Workspace to search Docs in`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `When true, include archived Docs in the results. Default is false.`,
      },
      {
        name: 'creator',
        type: 'integer',
        required: false,
        description: `Filter results to Docs created by this user ID`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's next_cursor`,
      },
      {
        name: 'deleted',
        type: 'boolean',
        required: false,
        description: `When true, include deleted Docs in the results. Default is false.`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Filter results to a specific Doc ID`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results per page (10-100). Default is 50.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `Filter results to Docs whose parent matches this ID`,
      },
      {
        name: 'parent_type',
        type: 'string',
        required: false,
        description: `The type of container parent_id refers to`,
      },
    ],
  },
  {
    name: 'clickup_folder_create',
    description: `Create a new folder within a ClickUp space to organize lists and tasks.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name for the new folder` },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The ID of the space to create the folder in`,
      },
    ],
  },
  {
    name: 'clickup_folder_delete',
    description: `Permanently delete a ClickUp folder. This action cannot be undone.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the folder to delete`,
      },
    ],
  },
  {
    name: 'clickup_folder_get',
    description: `Retrieve details of a specific ClickUp folder by folder ID, including the lists it contains.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the folder`,
      },
    ],
  },
  {
    name: 'clickup_folder_get_all',
    description: `Retrieve all folders within a ClickUp space. Optionally filter to include archived folders.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the space`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Include archived folders in results`,
      },
    ],
  },
  {
    name: 'clickup_folder_update',
    description: `Rename an existing ClickUp folder.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the folder to update`,
      },
      { name: 'name', type: 'string', required: true, description: `New name for the folder` },
    ],
  },
  {
    name: 'clickup_folder_views_list',
    description: `Retrieve all views defined at the folder level in ClickUp (task and page views such as board, calendar, doc, etc).`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the folder to list views for`,
      },
    ],
  },
  {
    name: 'clickup_goal_create',
    description: `Create a new goal in a ClickUp workspace. Goals help track high-level objectives with due dates and owner assignments.`,
    params: [
      {
        name: 'color',
        type: 'string',
        required: true,
        description: `Color for the goal (hex code)`,
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Description of the goal`,
      },
      {
        name: 'due_date',
        type: 'integer',
        required: true,
        description: `Due date as Unix timestamp in milliseconds`,
      },
      {
        name: 'multiple_owners',
        type: 'boolean',
        required: true,
        description: `Allow multiple owners for this goal`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the goal` },
      { name: 'team_id', type: 'string', required: true, description: `The workspace (team) ID` },
    ],
  },
  {
    name: 'clickup_goal_delete',
    description: `Remove a Goal from a ClickUp Workspace.`,
    params: [{ name: 'goal_id', type: 'string', required: true, description: `Goal ID (UUID)` }],
  },
  {
    name: 'clickup_goal_get',
    description: `Retrieve the details of a ClickUp Goal including its targets.`,
    params: [{ name: 'goal_id', type: 'string', required: true, description: `Goal ID (UUID)` }],
  },
  {
    name: 'clickup_goal_get_all',
    description: `Retrieve all goals in a ClickUp workspace. Optionally filter to include or exclude completed goals.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The workspace (team) ID` },
      {
        name: 'include_completed',
        type: 'boolean',
        required: false,
        description: `Include completed goals in results (defaults to true)`,
      },
    ],
  },
  {
    name: 'clickup_goal_key_result_create',
    description: `Add a Target (Key Result) to a ClickUp Goal, tracking progress as a number, currency, boolean, percentage, or automatically from linked tasks/lists.`,
    params: [
      {
        name: 'goal_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the goal to add the key result to`,
      },
      {
        name: 'list_ids',
        type: 'array',
        required: true,
        description: `List IDs to link with this key result`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the key result` },
      {
        name: 'owners',
        type: 'array',
        required: true,
        description: `Array of user IDs who own this key result`,
      },
      {
        name: 'steps_end',
        type: 'integer',
        required: true,
        description: `Target (ending) value for progress tracking`,
      },
      {
        name: 'steps_start',
        type: 'integer',
        required: true,
        description: `Starting value for progress tracking`,
      },
      {
        name: 'task_ids',
        type: 'array',
        required: true,
        description: `Task IDs to link with this key result`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `How progress is tracked for this key result`,
      },
      {
        name: 'unit',
        type: 'string',
        required: true,
        description: `Unit of measurement for the tracked value`,
      },
    ],
  },
  {
    name: 'clickup_goal_key_result_delete',
    description: `Permanently delete a Target (Key Result) from a ClickUp Goal.`,
    params: [
      {
        name: 'key_result_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the key result to delete`,
      },
    ],
  },
  {
    name: 'clickup_goal_key_result_update',
    description: `Update the current progress value and an optional note on a ClickUp Goal's key result.`,
    params: [
      {
        name: 'key_result_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the key result to update`,
      },
      {
        name: 'note',
        type: 'string',
        required: true,
        description: `A note describing this progress update`,
      },
      {
        name: 'steps_current',
        type: 'integer',
        required: true,
        description: `The current progress value`,
      },
    ],
  },
  {
    name: 'clickup_goal_update',
    description: `Update an existing ClickUp goal. Supports renaming, changing due date, description, color, and managing owners.`,
    params: [
      {
        name: 'color',
        type: 'string',
        required: true,
        description: `Updated color for the goal (hex code)`,
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Updated description of the goal`,
      },
      {
        name: 'due_date',
        type: 'integer',
        required: true,
        description: `Updated due date as Unix timestamp in milliseconds`,
      },
      {
        name: 'goal_id',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) of the goal to update`,
      },
      { name: 'name', type: 'string', required: true, description: `New name for the goal` },
    ],
  },
  {
    name: 'clickup_guest_invite',
    description: `Invite a guest to a ClickUp Workspace by email, with fine-grained permission flags. This endpoint is only available on ClickUp's Enterprise plan.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address of the guest to invite`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `The workspace (team) ID to invite the guest to`,
      },
      {
        name: 'can_create_views',
        type: 'boolean',
        required: false,
        description: `Whether the guest can create new views`,
      },
      {
        name: 'can_edit_tags',
        type: 'boolean',
        required: false,
        description: `Whether the guest can create and edit tags`,
      },
      {
        name: 'can_see_points_estimated',
        type: 'boolean',
        required: false,
        description: `Whether the guest can see Scrum point estimates on tasks`,
      },
      {
        name: 'can_see_time_estimated',
        type: 'boolean',
        required: false,
        description: `Whether the guest can see time estimates on tasks`,
      },
      {
        name: 'can_see_time_spent',
        type: 'boolean',
        required: false,
        description: `Whether the guest can see time tracked on tasks`,
      },
      {
        name: 'custom_role_id',
        type: 'integer',
        required: false,
        description: `ID of a custom role to assign to the guest`,
      },
    ],
  },
  {
    name: 'clickup_list_create',
    description: `Create a new list within a ClickUp folder. Supports setting name, description, due date, priority, and assignee.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the folder to create the list in`,
      },
      { name: 'name', type: 'string', required: true, description: `The name for the new list` },
      {
        name: 'assignee',
        type: 'integer',
        required: false,
        description: `User ID to assign to the list`,
      },
      { name: 'content', type: 'string', required: false, description: `Description of the list` },
      {
        name: 'due_date',
        type: 'integer',
        required: false,
        description: `Due date for the list as Unix timestamp in milliseconds`,
      },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Priority level: 1 (urgent), 2 (high), 3 (normal), 4 (low)`,
      },
    ],
  },
  {
    name: 'clickup_list_create_folderless',
    description: `Create a new list directly within a ClickUp space (not inside a folder). Useful for top-level organization.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name for the new list` },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The ID of the space to create the list in`,
      },
      { name: 'content', type: 'string', required: false, description: `Description of the list` },
      {
        name: 'due_date',
        type: 'integer',
        required: false,
        description: `Due date as Unix timestamp in milliseconds`,
      },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Priority level: 1 (urgent), 2 (high), 3 (normal), 4 (low)`,
      },
    ],
  },
  {
    name: 'clickup_list_create_folderless_from_template',
    description: `Create a new folderless ClickUp list directly inside a space using an existing list template. The list ID is returned immediately, but the list's contents may still be populating asynchronously for large templates.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the new list` },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The ID of the space to create the list in`,
      },
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The ID of the list template to apply`,
      },
      {
        name: 'return_immediately',
        type: 'boolean',
        required: false,
        description: `When true (default), the response returns the future list ID right away without waiting for the template to finish applying`,
      },
    ],
  },
  {
    name: 'clickup_list_create_from_template',
    description: `Create a new ClickUp list inside a folder using an existing list template. The list ID is returned immediately, but the list's contents may still be populating asynchronously for large templates.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the folder to create the list in`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the new list` },
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The ID of the list template to apply`,
      },
    ],
  },
  {
    name: 'clickup_list_delete',
    description: `Permanently delete a ClickUp list and all its contents. This action cannot be undone.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the list to delete`,
      },
    ],
  },
  {
    name: 'clickup_list_get',
    description: `Retrieve details of a specific ClickUp list by list ID.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the list`,
      },
    ],
  },
  {
    name: 'clickup_list_get_all',
    description: `Retrieve all lists within a ClickUp folder. Optionally filter to include or exclude archived lists.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the folder`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Include archived lists in results`,
      },
    ],
  },
  {
    name: 'clickup_list_get_folderless',
    description: `Retrieve all lists in a ClickUp space that are not inside a folder. These are top-level lists within the space.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the space`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Include archived lists in results`,
      },
    ],
  },
  {
    name: 'clickup_list_members_list',
    description: `Retrieve Workspace members who have explicit access to a specific ClickUp List.`,
    params: [{ name: 'list_id', type: 'integer', required: true, description: `List ID` }],
  },
  {
    name: 'clickup_list_update',
    description: `Update an existing ClickUp list. Supports renaming, updating description, due date, priority, assignee, and status color.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the list to update`,
      },
      { name: 'name', type: 'string', required: true, description: `New name for the list` },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Updated description for the list`,
      },
      {
        name: 'due_date',
        type: 'integer',
        required: false,
        description: `Updated due date as Unix timestamp in milliseconds`,
      },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Priority level: 1 (urgent), 2 (high), 3 (normal), 4 (low)`,
      },
      {
        name: 'unset_status',
        type: 'boolean',
        required: false,
        description: `Set to true to remove the list color`,
      },
    ],
  },
  {
    name: 'clickup_list_view_create',
    description: `Create a new view (list, board, calendar, table, gantt, etc) scoped to a ClickUp list.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the list to create the view in`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the new view` },
      { name: 'type', type: 'string', required: true, description: `The view type` },
    ],
  },
  {
    name: 'clickup_list_views_list',
    description: `Retrieve all views in a ClickUp List.`,
    params: [{ name: 'list_id', type: 'integer', required: true, description: `List ID` }],
  },
  {
    name: 'clickup_space_create',
    description: `Create a new space within a ClickUp workspace. Spaces are the top-level organizational units that contain folders and lists.`,
    params: [
      {
        name: 'multiple_assignees',
        type: 'boolean',
        required: true,
        description: `Allow multiple assignees on tasks in this space`,
      },
      { name: 'name', type: 'string', required: true, description: `The name for the new space` },
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `The workspace (team) ID to create the space in`,
      },
    ],
  },
  {
    name: 'clickup_space_delete',
    description: `Permanently delete a ClickUp space from your workspace. This action cannot be undone.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the space to delete`,
      },
    ],
  },
  {
    name: 'clickup_space_get',
    description: `Retrieve details of a specific ClickUp space by space ID.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the space`,
      },
    ],
  },
  {
    name: 'clickup_space_get_all',
    description: `Retrieve all spaces available in a ClickUp workspace (team). Optionally include archived spaces.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The workspace (team) ID` },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Include archived spaces in results`,
      },
    ],
  },
  {
    name: 'clickup_space_tag_create',
    description: `Create a new tag in a ClickUp Space.`,
    params: [
      { name: 'space_id', type: 'string', required: true, description: `Space ID` },
      { name: 'tag_name', type: 'string', required: true, description: `Tag name` },
      { name: 'tag_bg', type: 'string', required: false, description: `Background color (hex)` },
      { name: 'tag_fg', type: 'string', required: false, description: `Foreground color (hex)` },
    ],
  },
  {
    name: 'clickup_space_tag_delete',
    description: `Remove a tag from a ClickUp Space.`,
    params: [
      { name: 'space_id', type: 'string', required: true, description: `Space ID` },
      { name: 'tag_name', type: 'string', required: true, description: `Tag name to delete` },
      { name: 'tag_bg', type: 'string', required: false, description: `Background color (hex)` },
      { name: 'tag_fg', type: 'string', required: false, description: `Foreground color (hex)` },
    ],
  },
  {
    name: 'clickup_space_tag_update',
    description: `Rename a ClickUp Space tag or change its foreground/background colors.`,
    params: [
      { name: 'new_name', type: 'string', required: true, description: `The new name for the tag` },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The ID of the space that owns the tag`,
      },
      { name: 'tag_bg', type: 'string', required: true, description: `New background color (hex)` },
      { name: 'tag_fg', type: 'string', required: true, description: `New foreground color (hex)` },
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `The current name of the tag to update`,
      },
    ],
  },
  {
    name: 'clickup_space_tags_list',
    description: `Retrieve all task tags available in a ClickUp Space.`,
    params: [{ name: 'space_id', type: 'string', required: true, description: `Space ID` }],
  },
  {
    name: 'clickup_space_update',
    description: `Update an existing ClickUp space. Supports renaming, changing color, privacy settings, and enabling multiple assignees.`,
    params: [
      {
        name: 'color',
        type: 'string',
        required: true,
        description: `Color for the space (hex code)`,
      },
      {
        name: 'multiple_assignees',
        type: 'boolean',
        required: true,
        description: `Allow multiple assignees on tasks`,
      },
      { name: 'name', type: 'string', required: true, description: `New name for the space` },
      {
        name: 'private',
        type: 'boolean',
        required: true,
        description: `Whether this space is private`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the space to update`,
      },
    ],
  },
  {
    name: 'clickup_space_views_list',
    description: `Retrieve all views in a ClickUp Space.`,
    params: [{ name: 'space_id', type: 'integer', required: true, description: `Space ID` }],
  },
  {
    name: 'clickup_task_checklist_create',
    description: `Add a new checklist to a ClickUp task.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Checklist name` },
      { name: 'task_id', type: 'string', required: true, description: `Task ID` },
      {
        name: 'custom_task_ids',
        type: 'boolean',
        required: false,
        description: `Use custom task IDs`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Workspace ID (required if custom_task_ids=true)`,
      },
    ],
  },
  {
    name: 'clickup_task_create',
    description: `Create a new task in a ClickUp list. Supports setting name, description, assignees, status, priority, due date, start date, and more.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the list to create the task in`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name or title of the task`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Plain text description of the task`,
      },
      {
        name: 'due_date',
        type: 'integer',
        required: false,
        description: `Due date as Unix timestamp in milliseconds`,
      },
      {
        name: 'notify_all',
        type: 'boolean',
        required: false,
        description: `When true, notifies task creator and all assignees/watchers`,
      },
      {
        name: 'parent',
        type: 'string',
        required: false,
        description: `ID of a parent task to create this as a subtask`,
      },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Priority level: 1 (urgent), 2 (high), 3 (normal), 4 (low)`,
      },
      {
        name: 'start_date',
        type: 'integer',
        required: false,
        description: `Start date as Unix timestamp in milliseconds`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `The status of the task (must match a status in the list)`,
      },
    ],
  },
  {
    name: 'clickup_task_create_from_template',
    description: `Create a new ClickUp task using an existing task template. The template must be added to your workspace before use.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the list where the task will be created`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name for the new task being created from the template`,
      },
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The ID of the task template to use`,
      },
    ],
  },
  {
    name: 'clickup_task_delete',
    description: `Permanently delete a ClickUp task by task ID. This action cannot be undone.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task to delete`,
      },
    ],
  },
  {
    name: 'clickup_task_dependency_add',
    description: `Create a waiting-on/blocking dependency between two ClickUp tasks. Provide exactly one of depends_on or dependency_of.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The task that is waiting on or blocking another task`,
      },
      {
        name: 'custom_task_ids',
        type: 'boolean',
        required: false,
        description: `When true, task IDs are treated as custom task IDs. Requires team_id.`,
      },
      {
        name: 'dependency_of',
        type: 'string',
        required: false,
        description: `The ID of the task that is waiting for task_id to complete. Use this or depends_on, not both.`,
      },
      {
        name: 'depends_on',
        type: 'string',
        required: false,
        description: `The ID of the task that must be completed before task_id. Use this or dependency_of, not both.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `The Workspace ID. Required when custom_task_ids is true.`,
      },
    ],
  },
  {
    name: 'clickup_task_dependency_delete',
    description: `Remove a waiting-on/blocking dependency between two ClickUp tasks.`,
    params: [
      {
        name: 'dependency_of',
        type: 'string',
        required: true,
        description: `The task ID that depends on task_id`,
      },
      {
        name: 'depends_on',
        type: 'string',
        required: true,
        description: `The task ID that task_id depends on`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The task the dependency is set on`,
      },
      {
        name: 'custom_task_ids',
        type: 'boolean',
        required: false,
        description: `When true, task IDs are treated as custom task IDs. Requires team_id.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `The Workspace ID. Required when custom_task_ids is true.`,
      },
    ],
  },
  {
    name: 'clickup_task_get',
    description: `Retrieve details of a specific ClickUp task by task ID. Returns task properties, assignees, status, dates, and custom fields.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task`,
      },
      {
        name: 'include_markdown_description',
        type: 'boolean',
        required: false,
        description: `Return task description in Markdown format`,
      },
      {
        name: 'include_subtasks',
        type: 'boolean',
        required: false,
        description: `Include subtasks in the response`,
      },
    ],
  },
  {
    name: 'clickup_task_link_add',
    description: `Link two ClickUp tasks together (a non-dependency relationship shown on both tasks).`,
    params: [
      { name: 'links_to', type: 'string', required: true, description: `The task to link to` },
      { name: 'task_id', type: 'string', required: true, description: `The task to link from` },
      {
        name: 'custom_task_ids',
        type: 'boolean',
        required: false,
        description: `When true, task IDs are treated as custom task IDs. Requires team_id.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `The Workspace ID. Required when custom_task_ids is true.`,
      },
    ],
  },
  {
    name: 'clickup_task_link_delete',
    description: `Remove a link between two ClickUp tasks.`,
    params: [
      { name: 'links_to', type: 'string', required: true, description: `The task to unlink from` },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The source task of the link`,
      },
      {
        name: 'custom_task_ids',
        type: 'boolean',
        required: false,
        description: `When true, task IDs are treated as custom task IDs. Requires team_id.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `The Workspace ID. Required when custom_task_ids is true.`,
      },
    ],
  },
  {
    name: 'clickup_task_list',
    description: `Retrieve tasks from a specific ClickUp list. Supports filtering by status, assignee, tags, and date ranges. Returns up to 100 tasks per page.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the list to retrieve tasks from`,
      },
      { name: 'archived', type: 'boolean', required: false, description: `Return archived tasks` },
      {
        name: 'include_closed',
        type: 'boolean',
        required: false,
        description: `Include closed tasks in the results`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to sort tasks by: id, created, updated, or due_date`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 0)`,
      },
      {
        name: 'reverse',
        type: 'boolean',
        required: false,
        description: `Display results in reverse order`,
      },
      {
        name: 'subtasks',
        type: 'boolean',
        required: false,
        description: `Include subtasks in the results`,
      },
    ],
  },
  {
    name: 'clickup_task_members_list',
    description: `Retrieve Workspace members who have access to a specific ClickUp task.`,
    params: [{ name: 'task_id', type: 'string', required: true, description: `Task ID` }],
  },
  {
    name: 'clickup_task_search',
    description: `Search and filter tasks across an entire ClickUp workspace (team). Supports filtering by spaces, lists, folders, statuses, assignees, tags, and date ranges.`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `The workspace (team) ID to search tasks within`,
      },
      {
        name: 'due_date_gt',
        type: 'integer',
        required: false,
        description: `Filter tasks with due date greater than this Unix timestamp in milliseconds`,
      },
      {
        name: 'due_date_lt',
        type: 'integer',
        required: false,
        description: `Filter tasks with due date less than this Unix timestamp in milliseconds`,
      },
      {
        name: 'include_closed',
        type: 'boolean',
        required: false,
        description: `Include closed tasks in the results`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort field: id, created, updated, or due_date`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 0)`,
      },
      {
        name: 'reverse',
        type: 'boolean',
        required: false,
        description: `Display results in reverse order`,
      },
      {
        name: 'subtasks',
        type: 'boolean',
        required: false,
        description: `Include subtasks in the results`,
      },
    ],
  },
  {
    name: 'clickup_task_tag_add',
    description: `Attach an existing Space tag to a ClickUp task.`,
    params: [
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `The name of the tag to add. The tag must already exist in the task's space.`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task to tag`,
      },
      {
        name: 'custom_task_ids',
        type: 'boolean',
        required: false,
        description: `When true, task_id is treated as a custom task ID instead of a ClickUp task ID. Requires team_id.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `The Workspace ID. Required when custom_task_ids is true.`,
      },
    ],
  },
  {
    name: 'clickup_task_tag_remove',
    description: `Detach a tag from a ClickUp task. The tag definition itself is not deleted.`,
    params: [
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `The name of the tag to remove`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task to untag`,
      },
      {
        name: 'custom_task_ids',
        type: 'boolean',
        required: false,
        description: `When true, task_id is treated as a custom task ID instead of a ClickUp task ID. Requires team_id.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `The Workspace ID. Required when custom_task_ids is true.`,
      },
    ],
  },
  {
    name: 'clickup_task_templates_list',
    description: `List the task templates available in a ClickUp Workspace, so their template IDs can be used with task/list creation-from-template tools.`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `The workspace (team) ID to list task templates for`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
    ],
  },
  {
    name: 'clickup_task_update',
    description: `Update an existing ClickUp task. Supports updating name, description, status, priority, due date, start date, and other fields.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task to update`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Set to true to archive the task`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated task description. Use a space character to clear the description.`,
      },
      {
        name: 'due_date',
        type: 'integer',
        required: false,
        description: `Due date as Unix timestamp in milliseconds`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the task` },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Priority level: 1 (urgent), 2 (high), 3 (normal), 4 (low)`,
      },
      {
        name: 'start_date',
        type: 'integer',
        required: false,
        description: `Start date as Unix timestamp in milliseconds`,
      },
      { name: 'status', type: 'string', required: false, description: `New status for the task` },
      {
        name: 'time_estimate',
        type: 'integer',
        required: false,
        description: `Time estimate in milliseconds`,
      },
    ],
  },
  {
    name: 'clickup_time_entries_list',
    description: `Retrieve time entries within a date range for a ClickUp Workspace.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `Workspace ID` },
      { name: 'assignee', type: 'integer', required: false, description: `Filter by user ID` },
      { name: 'end_date', type: 'integer', required: false, description: `End date (Unix ms)` },
      { name: 'folder_id', type: 'integer', required: false, description: `Filter by folder ID` },
      {
        name: 'is_billable',
        type: 'boolean',
        required: false,
        description: `Filter by billable status`,
      },
      { name: 'list_id', type: 'integer', required: false, description: `Filter by list ID` },
      { name: 'space_id', type: 'integer', required: false, description: `Filter by space ID` },
      { name: 'start_date', type: 'integer', required: false, description: `Start date (Unix ms)` },
      { name: 'task_id', type: 'string', required: false, description: `Filter by task ID` },
    ],
  },
  {
    name: 'clickup_time_entry_create',
    description: `Log a time entry for a task in a ClickUp Workspace.`,
    params: [
      {
        name: 'duration',
        type: 'integer',
        required: true,
        description: `Duration in milliseconds`,
      },
      { name: 'start', type: 'integer', required: true, description: `Start timestamp (Unix ms)` },
      { name: 'team_id', type: 'string', required: true, description: `Workspace ID` },
      {
        name: 'assignee',
        type: 'integer',
        required: false,
        description: `User ID to assign entry to`,
      },
      { name: 'billable', type: 'boolean', required: false, description: `Mark as billable` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Time entry description`,
      },
      { name: 'tid', type: 'string', required: false, description: `Task ID to associate with` },
    ],
  },
  {
    name: 'clickup_time_entry_delete',
    description: `Permanently delete a tracked time entry from a ClickUp Workspace.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `Workspace ID` },
      {
        name: 'timer_id',
        type: 'string',
        required: true,
        description: `The ID of the time entry to delete`,
      },
    ],
  },
  {
    name: 'clickup_time_entry_get',
    description: `Fetch a single time entry from a ClickUp Workspace by ID.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `Workspace ID` },
      {
        name: 'timer_id',
        type: 'string',
        required: true,
        description: `The ID of the time entry to fetch`,
      },
      {
        name: 'include_approval_details',
        type: 'boolean',
        required: false,
        description: `Include approval details for this time entry`,
      },
      {
        name: 'include_approval_history',
        type: 'boolean',
        required: false,
        description: `Include the approval history for this time entry`,
      },
      {
        name: 'include_location_names',
        type: 'boolean',
        required: false,
        description: `Include List, Folder, and Space names in the response`,
      },
      {
        name: 'include_task_tags',
        type: 'boolean',
        required: false,
        description: `Include the associated task's tags in the response`,
      },
    ],
  },
  {
    name: 'clickup_time_entry_running_get',
    description: `Get the currently running time entry (live timer) for a user in a ClickUp Workspace, if any.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `Workspace ID` },
      {
        name: 'assignee',
        type: 'integer',
        required: false,
        description: `User ID to check for a running timer. Defaults to the authenticated user.`,
      },
    ],
  },
  {
    name: 'clickup_time_entry_start',
    description: `Start a live timer for the authenticated user in a ClickUp Workspace, optionally associated with a task.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `Workspace ID` },
      {
        name: 'billable',
        type: 'boolean',
        required: false,
        description: `Mark the time entry as billable`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description for the running time entry`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Tags to apply to the running time entry`,
      },
      {
        name: 'tid',
        type: 'string',
        required: false,
        description: `Task ID to associate the timer with`,
      },
    ],
  },
  {
    name: 'clickup_time_entry_stop',
    description: `Stop the currently running time entry (live timer) for the authenticated user in a ClickUp Workspace.`,
    params: [{ name: 'team_id', type: 'string', required: true, description: `Workspace ID` }],
  },
  {
    name: 'clickup_time_entry_update',
    description: `Update an existing ClickUp time entry's description, duration, task association, billable flag, or tags.`,
    params: [
      {
        name: 'tags',
        type: 'array',
        required: true,
        description: `Tags to set on this time entry`,
      },
      { name: 'team_id', type: 'string', required: true, description: `Workspace ID` },
      {
        name: 'timer_id',
        type: 'string',
        required: true,
        description: `The ID of the time entry to update`,
      },
      {
        name: 'billable',
        type: 'boolean',
        required: false,
        description: `Mark the time entry as billable`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the time entry`,
      },
      {
        name: 'duration',
        type: 'integer',
        required: false,
        description: `New duration in milliseconds`,
      },
      {
        name: 'end',
        type: 'integer',
        required: false,
        description: `New end timestamp (Unix ms). Requires start to also be set.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `New start timestamp (Unix ms). Requires end to also be set.`,
      },
      {
        name: 'tag_action',
        type: 'string',
        required: false,
        description: `How the tags field is applied relative to the entry's existing tags`,
      },
      {
        name: 'tid',
        type: 'string',
        required: false,
        description: `Task ID to associate the time entry with`,
      },
    ],
  },
  {
    name: 'clickup_user_get',
    description: `Retrieve the details of the authenticated ClickUp user account.`,
    params: [],
  },
  {
    name: 'clickup_view_delete',
    description: `Permanently delete a ClickUp view.`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the view to delete`,
      },
    ],
  },
  {
    name: 'clickup_view_get',
    description: `Fetch the configuration of a single ClickUp view (list, board, calendar, table, gantt, etc).`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the view to fetch`,
      },
    ],
  },
  {
    name: 'clickup_view_tasks_list',
    description: `Retrieve all tasks in a specific ClickUp view.`,
    params: [
      { name: 'view_id', type: 'string', required: true, description: `View ID` },
      { name: 'page', type: 'integer', required: false, description: `Page number (starts at 0)` },
    ],
  },
  {
    name: 'clickup_view_update',
    description: `Rename or retype a ClickUp view, and optionally overwrite its advanced configuration (grouping, sorting, filters, columns, team_sidebar, settings) with a raw config object.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the view` },
      { name: 'type', type: 'string', required: true, description: `The view type` },
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the view to update`,
      },
      {
        name: 'config',
        type: 'object',
        required: false,
        description: `Advanced view configuration to send as-is: grouping, divide, sorting, filters, columns, team_sidebar, settings. Merged into the request body alongside name and type.`,
      },
    ],
  },
  {
    name: 'clickup_webhook_create',
    description: `Create a new webhook in a ClickUp workspace to monitor specific events. Use '*' for the events field to subscribe to all events.`,
    params: [
      {
        name: 'endpoint',
        type: 'string',
        required: true,
        description: `The URL that will receive webhook payloads`,
      },
      {
        name: 'events',
        type: 'array',
        required: true,
        description: `List of events to subscribe to, or ["*"] for all events`,
      },
      { name: 'team_id', type: 'string', required: true, description: `The workspace (team) ID` },
      {
        name: 'list_id',
        type: 'integer',
        required: false,
        description: `Filter webhook to a specific list ID`,
      },
      {
        name: 'space_id',
        type: 'integer',
        required: false,
        description: `Filter webhook to a specific space ID`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: false,
        description: `Filter webhook to a specific task ID`,
      },
    ],
  },
  {
    name: 'clickup_webhook_delete',
    description: `Delete a ClickUp webhook, stopping it from monitoring events. This action cannot be undone.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) of the webhook to delete`,
      },
    ],
  },
  {
    name: 'clickup_webhook_get_all',
    description: `Retrieve all webhooks created via the API for a ClickUp workspace. Only returns webhooks created by the authenticated user.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The workspace (team) ID` },
    ],
  },
  {
    name: 'clickup_webhook_update',
    description: `Update an existing ClickUp webhook. Change the endpoint URL, subscribed events, or webhook status.`,
    params: [
      {
        name: 'endpoint',
        type: 'string',
        required: true,
        description: `New destination URL for the webhook`,
      },
      {
        name: 'events',
        type: 'array',
        required: true,
        description: `List of events to subscribe to, or ["*"] for all events`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `Status of the webhook (active or inactive)`,
      },
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) of the webhook to update`,
      },
    ],
  },
  {
    name: 'clickup_workspace_members_list',
    description: `Retrieve all members in a ClickUp Workspace. Returns all workspaces the authenticated user can access, each with its embedded members array; filter the result for the workspace matching team_id.`,
    params: [{ name: 'team_id', type: 'string', required: true, description: `Workspace ID` }],
  },
  {
    name: 'clickup_workspace_seats_get',
    description: `Retrieve seat utilization data for a ClickUp Workspace, showing member and guest seat counts.`,
    params: [{ name: 'team_id', type: 'string', required: true, description: `Workspace ID` }],
  },
  {
    name: 'clickup_workspaces_list',
    description: `Retrieve all ClickUp Workspaces available to the authenticated user.`,
    params: [],
  },
]
