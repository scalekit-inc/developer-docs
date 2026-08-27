import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googletasks_clear_completed_tasks',
    description: `Clear all completed tasks from a task list in a connected Google Tasks account. The affected tasks are marked hidden and no longer returned by default when listing tasks. Use clear_completed_tasks to tidy up a list after finishing items. Use list_tasks with show_completed and show_hidden set to true to review cleared tasks first.`,
    params: [
      {
        name: 'tasklist_id',
        type: 'string',
        required: true,
        description: `Identifier of the task list to clear completed tasks from`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googletasks_create_task',
    description: `Create a new task in a task list of a connected Google Tasks account, optionally as a subtask of another task or positioned after a sibling. Returns the created task with its assigned id and position. Use create_task to add a to-do item. Use move_task afterward to reposition or nest it.`,
    params: [
      {
        name: 'tasklist_id',
        type: 'string',
        required: true,
        description: `Identifier of the task list to create the task in`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the task. Maximum length allowed: 1024 characters`,
      },
      {
        name: 'due',
        type: 'string',
        required: false,
        description: `Scheduled date for the task (RFC 3339 timestamp). Only the date portion is recorded; time is discarded`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Notes describing the task. Maximum length allowed: 8192 characters`,
      },
      {
        name: 'parent_task_id',
        type: 'string',
        required: false,
        description: `Parent task identifier. If set, the new task is created as a subtask under this task. Omit to create it at the top level`,
      },
      {
        name: 'previous_task_id',
        type: 'string',
        required: false,
        description: `Identifier of the sibling task that should immediately precede the new task. Omit to create it at the first position among its siblings`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      { name: 'status', type: 'string', required: false, description: `Status of the task` },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googletasks_create_tasklist',
    description: `Create a new task list for the authenticated user in a connected Google Tasks account. Returns the created list's id, title, etag, and last-updated time. Use create_tasklist to start a new list before adding tasks to it with create_task.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the new task list. Maximum length allowed: 1024 characters.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googletasks_delete_task',
    description: `Delete a task from a task list in a connected Google Tasks account. If the task is assigned, both the assigned task and the original task (in Docs, Chat Spaces) are deleted. This cannot be undone. Use delete_task to permanently remove a task. Use clear_completed_tasks instead to hide all completed tasks in a list at once.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `Identifier of the task to delete`,
      },
      {
        name: 'tasklist_id',
        type: 'string',
        required: true,
        description: `Identifier of the task list the task belongs to`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googletasks_delete_tasklist',
    description: `Delete a task list and all tasks it contains from a connected Google Tasks account. This cannot be undone. Use delete_tasklist to permanently remove a list. Use delete_task instead to remove a single task without deleting the whole list.`,
    params: [
      {
        name: 'tasklist_id',
        type: 'string',
        required: true,
        description: `Identifier of the task list to delete`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googletasks_get_task',
    description: `Get a single task by ID from a task list in a connected Google Tasks account. Returns the task's full details including title, notes, status, due date, completion date, and position. Use get_task to look up one task. Use list_tasks to browse all tasks in a list.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `Identifier of the task to retrieve`,
      },
      {
        name: 'tasklist_id',
        type: 'string',
        required: true,
        description: `Identifier of the task list the task belongs to`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googletasks_get_tasklist',
    description: `Get the details of a single task list by ID from a connected Google Tasks account. Returns the list's id, title, etag, and last-updated time. Use get_tasklist to look up one list. Use list_tasklists to browse all lists and find the ID.`,
    params: [
      {
        name: 'tasklist_id',
        type: 'string',
        required: true,
        description: `Identifier of the task list to retrieve`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googletasks_list_tasklists',
    description: `List all of the authenticated user's task lists in a connected Google Tasks account. Returns each list's id, title, and last-updated time, with pagination via a page token. Use list_tasklists to browse or find a task list ID before working with its tasks. Use get_tasklist to fetch a single list's details.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of task lists to return on one page (max 1000)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token identifying the result page to return, from a previous response's next_page_token`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googletasks_list_tasks',
    description: `List tasks in a task list from a connected Google Tasks account, with filters for completion, due date, and visibility of hidden/deleted items. Returns an array of tasks (id, title, status, notes, due date, position) with pagination via a page token. Use list_tasks to browse a list's tasks. Use get_task to fetch a single task by ID.`,
    params: [
      {
        name: 'tasklist_id',
        type: 'string',
        required: true,
        description: `Identifier of the task list to list tasks from`,
      },
      {
        name: 'completed_max',
        type: 'string',
        required: false,
        description: `Upper bound (RFC 3339 timestamp) for a task's completion date, to filter tasks completed before this time`,
      },
      {
        name: 'completed_min',
        type: 'string',
        required: false,
        description: `Lower bound (RFC 3339 timestamp) for a task's completion date, to filter tasks completed after this time`,
      },
      {
        name: 'due_max',
        type: 'string',
        required: false,
        description: `Upper bound (RFC 3339 timestamp) for a task's due date, to filter by due date`,
      },
      {
        name: 'due_min',
        type: 'string',
        required: false,
        description: `Lower bound (RFC 3339 timestamp) for a task's due date, to filter by due date`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of tasks to return on one page (max 100)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token identifying the result page to return, from a previous response's next_page_token`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'show_assigned',
        type: 'boolean',
        required: false,
        description: `Whether tasks assigned to the current user (from Docs, Chat Spaces) are returned in the result`,
      },
      {
        name: 'show_completed',
        type: 'boolean',
        required: false,
        description: `Whether completed tasks are returned in the result. show_hidden must also be true to show tasks completed in first-party clients such as the web UI`,
      },
      {
        name: 'show_deleted',
        type: 'boolean',
        required: false,
        description: `Whether deleted tasks are returned in the result`,
      },
      {
        name: 'show_hidden',
        type: 'boolean',
        required: false,
        description: `Whether hidden tasks are returned in the result`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
      {
        name: 'updated_min',
        type: 'string',
        required: false,
        description: `Lower bound (RFC 3339 timestamp) for a task's last modification time, to filter by last modification time`,
      },
    ],
  },
  {
    name: 'googletasks_move_task',
    description: `Move a task to another position in a connected Google Tasks account: reorder it among siblings, nest it under a new parent, move it to the top level, or move it to a different task list. Returns the moved task with its updated position and parent. Use move_task to reorganize tasks. Use update_task instead to change task content like title or notes.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `Identifier of the task to move`,
      },
      {
        name: 'tasklist_id',
        type: 'string',
        required: true,
        description: `Identifier of the task list the task currently belongs to`,
      },
      {
        name: 'destination_tasklist_id',
        type: 'string',
        required: false,
        description: `Destination task list identifier. If set, the task is moved from tasklist_id to this list. Otherwise the task is moved within its current list. Recurrent tasks cannot currently be moved between lists`,
      },
      {
        name: 'parent_task_id',
        type: 'string',
        required: false,
        description: `New parent task identifier. If the task is moved to the top level, omit this parameter. The parent task must exist in the task list and cannot be hidden`,
      },
      {
        name: 'previous_task_id',
        type: 'string',
        required: false,
        description: `New previous sibling task identifier. If the task is moved to the first position among its siblings, omit this parameter. The sibling must exist in the task list and cannot be hidden`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googletasks_update_task',
    description: `Update fields of an existing task in a connected Google Tasks account, such as title, notes, status, or due date. Only fields you provide are changed. Returns the updated task, including its title, notes, status, due date, and completion date. Use update_task to edit task content or mark it complete. Use move_task instead to change its position or parent.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `Identifier of the task to update`,
      },
      {
        name: 'tasklist_id',
        type: 'string',
        required: true,
        description: `Identifier of the task list the task belongs to`,
      },
      {
        name: 'completed',
        type: 'string',
        required: false,
        description: `Completion date of the task (RFC 3339 timestamp). Normally set automatically when status is changed to completed; set explicitly to backdate completion`,
      },
      {
        name: 'due',
        type: 'string',
        required: false,
        description: `Scheduled date for the task (RFC 3339 timestamp). Only the date portion is recorded; time is discarded`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Notes describing the task. Maximum length allowed: 8192 characters`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      { name: 'status', type: 'string', required: false, description: `Status of the task` },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the task. Maximum length allowed: 1024 characters`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googletasks_update_tasklist',
    description: `Update the title of an existing task list in a connected Google Tasks account. Only fields you provide are changed. Returns the updated list's id, title, etag, and last-updated time. Use update_tasklist to rename a list. Use delete_tasklist to remove one entirely.`,
    params: [
      {
        name: 'tasklist_id',
        type: 'string',
        required: true,
        description: `Identifier of the task list to update`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the task list. Maximum length allowed: 1024 characters.`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
]
