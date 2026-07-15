import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
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
    name: 'clickup_user_get',
    description: `Retrieve the details of the authenticated ClickUp user account.`,
    params: [],
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
