import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'ticktickmcp_add_comment',
    description: `Add a plain-text comment (max 1024 characters) to a task.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `Unique ID of the project. Get it from list_projects.` },
      { name: 'task_id', type: 'string', required: true, description: `Unique ID of the task. Get it from search_task or get_task_in_project.` },
      { name: 'title', type: 'string', required: true, description: `Text content of the comment (plain text, max 1024 characters).` },
    ],
  },
  {
    name: 'ticktickmcp_batch_add_tasks',
    description: `Create multiple tasks in one request. Each task must include a title and projectId.`,
    params: [
      { name: 'tasks', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'ticktickmcp_batch_update_tasks',
    description: `Update multiple existing tasks in one request. Each task must include its taskId.`,
    params: [
      { name: 'tasks', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'ticktickmcp_complete_task',
    description: `Mark a task as completed by projectId and taskId.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `Unique ID of the project. Get it from list_projects.` },
      { name: 'task_id', type: 'string', required: true, description: `Unique ID of the task. Get it from search_task or get_task_in_project.` },
    ],
  },
  {
    name: 'ticktickmcp_complete_tasks_in_project',
    description: `Mark up to 20 tasks as completed in a project.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `Unique ID of the project. Get it from list_projects.` },
      { name: 'task_ids', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'ticktickmcp_create_column',
    description: `Create a new Kanban column in a project.`,
    params: [
      { name: 'column', type: 'string', required: true, description: `No description.` },
      { name: 'project_id', type: 'string', required: true, description: `Unique ID of the project. Get it from list_projects.` },
    ],
  },
  {
    name: 'ticktickmcp_create_focus',
    description: `Create a focus session record. Type 0 = Pomodoro, type 1 = timer.`,
    params: [
      { name: 'end_time', type: 'string', required: true, description: `End time of the focus session in ISO 8601 format, e.g. 2026-06-01T10:00:00+0000.` },
      { name: 'start_time', type: 'string', required: true, description: `Start time of the focus session in ISO 8601 format, e.g. 2026-06-01T09:00:00+0000.` },
      { name: 'type', type: 'integer', required: true, description: `Focus session type: 0 for Pomodoro, 1 for timer.` },
      { name: 'habit_id', type: 'string', required: false, description: `Unique ID of the habit. Get it from list_habits.` },
      { name: 'note', type: 'string', required: false, description: `Optional text note to attach to the focus session.` },
      { name: 'task_id', type: 'string', required: false, description: `Unique ID of the task. Get it from search_task or get_task_in_project.` },
    ],
  },
  {
    name: 'ticktickmcp_create_habit',
    description: `Create a new habit to track in TickTick.`,
    params: [
      { name: 'habit', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'ticktickmcp_create_project',
    description: `Create a new project (list) in TickTick.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Display name for the project.` },
      { name: 'color', type: 'string', required: false, description: `Hex color code for the project, e.g. #FF6B6B.` },
      { name: 'group_id', type: 'string', required: false, description: `ID of the project group to place this project in.` },
      { name: 'kind', type: 'string', required: false, description: `Project kind. Accepted values: TASK, NOTE.` },
      { name: 'sort_order', type: 'integer', required: false, description: `Integer sort order for positioning the project in the list.` },
      { name: 'view_mode', type: 'string', required: false, description: `Default view mode. Accepted values: list, kanban, timeline.` },
    ],
  },
  {
    name: 'ticktickmcp_create_project_group',
    description: `Create a new project group for organizing projects.`,
    params: [
      { name: 'project_group', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'ticktickmcp_create_tag',
    description: `Create a new tag for labeling tasks.`,
    params: [
      { name: 'tag', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'ticktickmcp_create_task',
    description: `Create a new task in a TickTick project.`,
    params: [
      { name: 'task', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'ticktickmcp_delete_comment',
    description: `Delete a comment from a task by comment ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Unique ID of the resource.` },
      { name: 'project_id', type: 'string', required: true, description: `Unique ID of the project. Get it from list_projects.` },
      { name: 'task_id', type: 'string', required: true, description: `Unique ID of the task. Get it from search_task or get_task_in_project.` },
    ],
  },
  {
    name: 'ticktickmcp_delete_focus',
    description: `Delete a focus session record by focusId and type.`,
    params: [
      { name: 'focus_id', type: 'string', required: true, description: `Unique ID of the focus session.` },
      { name: 'type', type: 'integer', required: true, description: `Focus session type: 0 for Pomodoro, 1 for timer.` },
    ],
  },
  {
    name: 'ticktickmcp_delete_project_group',
    description: `Delete a project group permanently by its ID.`,
    params: [
      { name: 'project_group_id', type: 'string', required: true, description: `Unique ID of the project group. Get it from list_project_groups.` },
    ],
  },
  {
    name: 'ticktickmcp_delete_task',
    description: `Permanently delete a task by projectId and taskId.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `Unique ID of the project. Get it from list_projects.` },
      { name: 'task_id', type: 'string', required: true, description: `Unique ID of the task. Get it from search_task or get_task_in_project.` },
    ],
  },
  {
    name: 'ticktickmcp_fetch',
    description: `Fetch the full contents of a task by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Unique ID of the resource.` },
    ],
  },
  {
    name: 'ticktickmcp_filter_tasks',
    description: `Filter tasks by date range, project IDs, priority, tags, kind, or status.`,
    params: [
      { name: 'filter', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'ticktickmcp_get_comment',
    description: `Get all comments for a task by projectId and taskId.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `Unique ID of the project. Get it from list_projects.` },
      { name: 'task_id', type: 'string', required: true, description: `Unique ID of the task. Get it from search_task or get_task_in_project.` },
    ],
  },
  {
    name: 'ticktickmcp_get_focus',
    description: `Get a single focus session record by focusId and type.`,
    params: [
      { name: 'focus_id', type: 'string', required: true, description: `Unique ID of the focus session.` },
      { name: 'type', type: 'integer', required: true, description: `Focus session type: 0 for Pomodoro, 1 for timer.` },
    ],
  },
  {
    name: 'ticktickmcp_get_focuses_by_time',
    description: `Get focus sessions within a time range (max one month) filtered by type.`,
    params: [
      { name: 'from_time', type: 'string', required: true, description: `Start of the time range in ISO 8601 format.` },
      { name: 'to_time', type: 'string', required: true, description: `End of the time range in ISO 8601 format. Range must not exceed one month.` },
      { name: 'type', type: 'integer', required: true, description: `Focus session type: 0 for Pomodoro, 1 for timer.` },
    ],
  },
  {
    name: 'ticktickmcp_get_habit',
    description: `Get details of a habit by habitId.`,
    params: [
      { name: 'habit_id', type: 'string', required: true, description: `Unique ID of the habit. Get it from list_habits.` },
    ],
  },
  {
    name: 'ticktickmcp_get_habit_checkins',
    description: `Get habit check-ins for one or more habits within a date range.`,
    params: [
      { name: 'from_stamp', type: 'integer', required: true, description: `Start date as an integer date stamp, e.g. 20260101 for January 1 2026.` },
      { name: 'habit_ids', type: 'array', required: true, description: `No description.` },
      { name: 'to_stamp', type: 'integer', required: true, description: `End date as an integer date stamp, e.g. 20260630 for June 30 2026.` },
    ],
  },
  {
    name: 'ticktickmcp_get_project_by_id',
    description: `Get project details by projectId.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `Unique ID of the project. Get it from list_projects.` },
    ],
  },
  {
    name: 'ticktickmcp_get_project_with_undone_tasks',
    description: `Get a project and all its undone tasks by projectId.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `Unique ID of the project. Get it from list_projects.` },
    ],
  },
  {
    name: 'ticktickmcp_get_task_by_id',
    description: `Get full task details by taskId.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `Unique ID of the task. Get it from search_task or get_task_in_project.` },
    ],
  },
  {
    name: 'ticktickmcp_get_task_in_project',
    description: `Get a specific task by projectId and taskId.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `Unique ID of the project. Get it from list_projects.` },
      { name: 'task_id', type: 'string', required: true, description: `Unique ID of the task. Get it from search_task or get_task_in_project.` },
    ],
  },
  {
    name: 'ticktickmcp_get_user_preference',
    description: `Get user preferences including timezone and display settings.`,
    params: [
    ],
  },
  {
    name: 'ticktickmcp_list_columns',
    description: `List all Kanban columns in a project.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `Unique ID of the project. Get it from list_projects.` },
    ],
  },
  {
    name: 'ticktickmcp_list_completed_tasks_by_date',
    description: `List completed tasks filtered by project IDs and date range.`,
    params: [
      { name: 'search', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'ticktickmcp_list_countdowns',
    description: `List all countdown tasks for the current user.`,
    params: [
    ],
  },
  {
    name: 'ticktickmcp_list_habit_sections',
    description: `List all habit sections for the current user.`,
    params: [
    ],
  },
  {
    name: 'ticktickmcp_list_habits',
    description: `List all habits for the current user.`,
    params: [
    ],
  },
  {
    name: 'ticktickmcp_list_project_groups',
    description: `List all project groups for the current user.`,
    params: [
    ],
  },
  {
    name: 'ticktickmcp_list_projects',
    description: `List all projects for the current user.`,
    params: [
    ],
  },
  {
    name: 'ticktickmcp_list_tags',
    description: `List all tags for the current user.`,
    params: [
    ],
  },
  {
    name: 'ticktickmcp_list_undone_tasks_by_date',
    description: `List undone tasks within a date range (max 14 days between start and end).`,
    params: [
      { name: 'search', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'ticktickmcp_list_undone_tasks_by_time_query',
    description: `List undone tasks using a predefined time query: today, last24hour, last7day, tomorrow, or nextWeek.`,
    params: [
      { name: 'query_command', type: 'string', required: false, description: `Predefined time query. Accepted values: today, last24hour, last7day, tomorrow, nextWeek.` },
    ],
  },
  {
    name: 'ticktickmcp_move_task',
    description: `Move tasks to different projects.`,
    params: [
      { name: 'moves', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'ticktickmcp_search',
    description: `Search TickTick and return matching results with IDs, titles, and URLs.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search keyword to filter tasks by name or content.` },
    ],
  },
  {
    name: 'ticktickmcp_search_task',
    description: `Search tasks by keyword and return matching taskId, title, and URL.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search keyword to filter tasks by name or content.` },
    ],
  },
  {
    name: 'ticktickmcp_update_column',
    description: `Update an existing Kanban column by columnId.`,
    params: [
      { name: 'column', type: 'string', required: true, description: `No description.` },
      { name: 'column_id', type: 'string', required: true, description: `Unique ID of the column. Get it from list_columns.` },
      { name: 'project_id', type: 'string', required: true, description: `Unique ID of the project. Get it from list_projects.` },
    ],
  },
  {
    name: 'ticktickmcp_update_habit',
    description: `Update an existing habit by habitId.`,
    params: [
      { name: 'habit', type: 'string', required: true, description: `No description.` },
      { name: 'habit_id', type: 'string', required: true, description: `Unique ID of the habit. Get it from list_habits.` },
    ],
  },
  {
    name: 'ticktickmcp_update_project',
    description: `Update an existing project's name, color, group, or display settings.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `Unique ID of the project. Get it from list_projects.` },
      { name: 'closed', type: 'string', required: false, description: `Whether the project is archived.` },
      { name: 'color', type: 'string', required: false, description: `Hex color code for the project, e.g. #FF6B6B.` },
      { name: 'group_id', type: 'string', required: false, description: `ID of the project group to place this project in.` },
      { name: 'kind', type: 'string', required: false, description: `Project kind. Accepted values: TASK, NOTE.` },
      { name: 'name', type: 'string', required: false, description: `Display name for the project.` },
      { name: 'sort_order', type: 'string', required: false, description: `Integer sort order for positioning the project in the list.` },
      { name: 'view_mode', type: 'string', required: false, description: `Default view mode. Accepted values: list, kanban, timeline.` },
    ],
  },
  {
    name: 'ticktickmcp_update_project_group',
    description: `Update an existing project group by projectGroupId.`,
    params: [
      { name: 'project_group', type: 'string', required: true, description: `No description.` },
      { name: 'project_group_id', type: 'string', required: true, description: `Unique ID of the project group. Get it from list_project_groups.` },
    ],
  },
  {
    name: 'ticktickmcp_update_task',
    description: `Update an existing task's fields. To remove a parent-child relationship, set parentId to empty string.`,
    params: [
      { name: 'task', type: 'string', required: true, description: `No description.` },
      { name: 'task_id', type: 'string', required: true, description: `Unique ID of the task. Get it from search_task or get_task_in_project.` },
    ],
  },
  {
    name: 'ticktickmcp_upsert_habit_checkins',
    description: `Create or update check-in records for a habit by habitId.`,
    params: [
      { name: 'checkin_data', type: 'string', required: true, description: `No description.` },
      { name: 'habit_id', type: 'string', required: true, description: `Unique ID of the habit. Get it from list_habits.` },
    ],
  },
]
