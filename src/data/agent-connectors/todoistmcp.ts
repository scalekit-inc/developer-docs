import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'todoistmcp_add-comments',
    description: `Add multiple comments to tasks or projects. Each comment must specify either taskId or projectId.`,
    params: [
      { name: 'comments', type: 'array', required: true, description: `The array of comments to add.` },
    ],
  },
  {
    name: 'todoistmcp_add-filters',
    description: `Add one or more new personal filters. Filters are saved custom views using query syntax to organize tasks.`,
    params: [
      { name: 'filters', type: 'array', required: true, description: `The array of filters to add.` },
    ],
  },
  {
    name: 'todoistmcp_add-goals',
    description: `Create one or more goals. Omit workspaceId for personal goals.`,
    params: [
      { name: 'goals', type: 'array', required: true, description: `The array of goals to create (max 25).` },
    ],
  },
  {
    name: 'todoistmcp_add-labels',
    description: `Add one or more new personal labels.`,
    params: [
      { name: 'labels', type: 'array', required: true, description: `Labels to apply to this item. Pass as a JSON array via the SDK, not as a string.` },
    ],
  },
  {
    name: 'todoistmcp_add-projects',
    description: `Add one or more new projects.`,
    params: [
      { name: 'projects', type: 'array', required: true, description: `The array of projects to add.` },
    ],
  },
  {
    name: 'todoistmcp_add-reminders',
    description: `Add reminders to tasks. Supports three types: "relative" (minutes before due), "absolute" (specific date/time), or "location" (geofence-triggered). Each reminder must specify a taskId.`,
    params: [
      { name: 'reminders', type: 'array', required: true, description: `Reminders array. Each must specify a type: relative, absolute, or location.` },
    ],
  },
  {
    name: 'todoistmcp_add-sections',
    description: `Add one or more new sections to projects.`,
    params: [
      { name: 'sections', type: 'array', required: true, description: `The array of sections to add.` },
    ],
  },
  {
    name: 'todoistmcp_add-tasks',
    description: `Add one or more tasks to a project, section, or parent. Supports assignment to project collaborators.`,
    params: [
      { name: 'tasks', type: 'array', required: true, description: `The array of tasks to add (max 25).` },
    ],
  },
  {
    name: 'todoistmcp_analyze-project-health',
    description: `Trigger a new health analysis for a project. Use this when the health data is stale or you want a fresh assessment. The analysis may take time to complete — use get-project-health afterward to see updated results.`,
    params: [
      { name: 'projectId', type: 'string', required: true, description: `The ID of the project. Get it from find-projects.` },
    ],
  },
  {
    name: 'todoistmcp_complete-goals',
    description: `Complete or uncomplete one or more goals by their IDs.`,
    params: [
      { name: 'action', type: 'string', required: true, description: `Whether to complete or uncomplete the goals.` },
      { name: 'ids', type: 'array', required: true, description: `IDs of the goals to act on (max 25).` },
    ],
  },
  {
    name: 'todoistmcp_complete-tasks',
    description: `Complete one or more tasks by their IDs.`,
    params: [
      { name: 'ids', type: 'array', required: true, description: `IDs of the goals to act on (max 25).` },
    ],
  },
  {
    name: 'todoistmcp_delete-object',
    description: `Delete a project, section, task, comment, label, filter, goal, reminder, or location_reminder by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The unique identifier of the resource.` },
      { name: 'type', type: 'string', required: true, description: `Entity type to reorder. Accepted values: project, section.` },
    ],
  },
  {
    name: 'todoistmcp_fetch',
    description: `Fetch the full contents of a task or project by its ID. The ID should be in the format "task:{id}" or "project:{id}".`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the task or project to fetch, prefixed with its type. Format: "task:{id}" or "project:{id}".` },
    ],
  },
  {
    name: 'todoistmcp_fetch-object',
    description: `Fetch a single task, project, comment, section, or goal by its ID. Use this when you have a specific object ID and want to retrieve its full details.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The unique identifier of the resource.` },
      { name: 'type', type: 'string', required: true, description: `Entity type to reorder. Accepted values: project, section.` },
    ],
  },
  {
    name: 'todoistmcp_find-activity',
    description: `Retrieve recent activity logs to monitor and audit changes in Todoist. Shows events from all users by default (use initiatorId to filter by specific user). Track task completions, updates, deletions, project changes, and more with flexible filtering. Note: Date-based filtering is not supported by the Todoist API.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'eventType', type: 'string', required: false, description: `Filter by event type.` },
      { name: 'initiatorId', type: 'string', required: false, description: `Filter by the user ID who initiated the event.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of items to return per page.` },
      { name: 'objectId', type: 'string', required: false, description: `Filter by specific object ID (task, project, or comment).` },
      { name: 'objectType', type: 'string', required: false, description: `Type of object to filter by.` },
      { name: 'projectId', type: 'string', required: false, description: `The ID of the project. Get it from find-projects.` },
      { name: 'taskId', type: 'string', required: false, description: `The ID of the task. Get it from find-tasks.` },
    ],
  },
  {
    name: 'todoistmcp_find-comments',
    description: `Find comments by task, project, or get a specific comment by ID. Exactly one of taskId, projectId, or commentId must be provided.`,
    params: [
      { name: 'commentId', type: 'string', required: false, description: `The ID of the comment. Get it from find-comments.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of items to return per page.` },
      { name: 'projectId', type: 'string', required: false, description: `The ID of the project. Get it from find-projects.` },
      { name: 'taskId', type: 'string', required: false, description: `The ID of the task. Get it from find-tasks.` },
    ],
  },
  {
    name: 'todoistmcp_find-completed-tasks',
    description: `Get completed tasks. since/until are optional and default to a 7-day window when omitted. Includes all collaborators by default. Person-specific queries (summaries, plans, reports) require responsibleUser.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'getBy', type: 'string', required: false, description: `Date field to filter by: "completion" (when completed) or "due" (due date).` },
      { name: 'labels', type: 'array', required: false, description: `Labels to apply to this item. Pass as a JSON array via the SDK, not as a string.` },
      { name: 'labelsOperator', type: 'string', required: false, description: `How to match multiple labels: "or" returns tasks with any label, "and" requires all labels.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of items to return per page.` },
      { name: 'parentId', type: 'string', required: false, description: `The ID of the parent task or project.` },
      { name: 'projectId', type: 'string', required: false, description: `The ID of the project. Get it from find-projects.` },
      { name: 'responsibleUser', type: 'string', required: false, description: `Email or user ID of the responsible user.` },
      { name: 'sectionId', type: 'string', required: false, description: `The ID of the section. Get it from find-sections.` },
      { name: 'since', type: 'string', required: false, description: `Start date for filtering (YYYY-MM-DD). Defaults to 6 days before the end date.` },
      { name: 'until', type: 'string', required: false, description: `End date for filtering (YYYY-MM-DD). Defaults to 6 days after the start date.` },
      { name: 'workspaceId', type: 'string', required: false, description: `The ID of the workspace. Get it from list-workspaces.` },
    ],
  },
  {
    name: 'todoistmcp_find-filters',
    description: `List all personal filters or search for filters by name. Filters are saved custom views that use query syntax to organize tasks (e.g. "today & p1", "#Work & overdue").`,
    params: [
      { name: 'search', type: 'string', required: false, description: `Filter by name (partial, case-insensitive match). Returns all if omitted.` },
    ],
  },
  {
    name: 'todoistmcp_find-goals',
    description: `Search for goals by name or list all accessible goals. Results are paginated — use the returned \`nextCursor\` to fetch subsequent pages.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of items to return per page.` },
      { name: 'ownerType', type: 'string', required: false, description: `Filter by ownership type. Omit for all accessible goals.` },
      { name: 'searchText', type: 'string', required: false, description: `Text to search for across names and content.` },
    ],
  },
  {
    name: 'todoistmcp_find-labels',
    description: `List personal labels and shared labels. Personal labels have full metadata (id, name, color, order, isFavorite) and support pagination and name search (partial, case insensitive). Shared labels are labels used on tasks shared with you — they are returned as names only (no IDs or metadata). When searching, all matching personal labels are fetched across all pages and returned as a single result set (limit and cursor are ignored). When not searching, personal labels are returned with pagination.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of items to return per page.` },
      { name: 'searchText', type: 'string', required: false, description: `Text to search for across names and content.` },
    ],
  },
  {
    name: 'todoistmcp_find-project-collaborators',
    description: `Find Todoist users (collaborators, teammates) by name or email to look up their user ID. Use this whenever the user asks to find, look up, or identify a person — e.g. "find Carrie's user ID", "who is Ernesto", "look up a user". When projectId is omitted, searches across the collaborators of every shared project the authenticated user has access to, plus the authenticated user themselves — an empty result means the person is not a collaborator on any project you share with them, not necessarily that they do not exist in Todoist. When projectId is provided, searches only that project. Partial, case-insensitive match on name and email.`,
    params: [
      { name: 'projectId', type: 'string', required: false, description: `The ID of the project. Get it from find-projects.` },
      { name: 'searchTerm', type: 'string', required: false, description: `Filter by name or email (partial, case-insensitive). Returns all users if omitted.` },
    ],
  },
  {
    name: 'todoistmcp_find-projects',
    description: `List all projects or search for projects by name. When searching, all matching projects are returned (pagination is ignored). When not searching, projects are returned with pagination.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of items to return per page.` },
      { name: 'searchText', type: 'string', required: false, description: `Text to search for across names and content.` },
    ],
  },
  {
    name: 'todoistmcp_find-reminders',
    description: `Find reminders by task ID (returns all reminder types), or get a specific reminder by its ID. Use reminderId for time-based reminders and locationReminderId for location reminders.`,
    params: [
      { name: 'locationReminderId', type: 'string', required: false, description: `Get a specific location reminder by its ID.` },
      { name: 'reminderId', type: 'string', required: false, description: `Get a specific time-based reminder (relative or absolute) by its ID.` },
      { name: 'taskId', type: 'string', required: false, description: `The ID of the task. Get it from find-tasks.` },
    ],
  },
  {
    name: 'todoistmcp_find-sections',
    description: `Search for sections by name or other criteria in a project. When searching, uses server-side search to avoid fetching all sections.`,
    params: [
      { name: 'projectId', type: 'string', required: true, description: `The ID of the project. Get it from find-projects.` },
      { name: 'searchText', type: 'string', required: false, description: `Text to search for across names and content.` },
    ],
  },
  {
    name: 'todoistmcp_find-tasks',
    description: `Find tasks by text search, project/section/parent container, responsible user, labels, a raw Todoist filter string, or a saved filter by ID or name (filterIdOrName). At least one filter must be provided.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'filter', type: 'string', required: false, description: `A Todoist filter string (e.g. "today | overdue") to scope the task query.` },
      { name: 'filterIdOrName', type: 'string', required: false, description: `ID or name of a saved Todoist filter whose query will be applied. Cannot be combined with the filter parameter.` },
      { name: 'labels', type: 'array', required: false, description: `Labels to apply to this item. Pass as a JSON array via the SDK, not as a string.` },
      { name: 'labelsOperator', type: 'string', required: false, description: `How to match multiple labels: "or" returns tasks with any label, "and" requires all labels.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of items to return per page.` },
      { name: 'parentId', type: 'string', required: false, description: `The ID of the parent task or project.` },
      { name: 'projectId', type: 'string', required: false, description: `The ID of the project. Get it from find-projects.` },
      { name: 'responsibleUser', type: 'string', required: false, description: `Email or user ID of the responsible user.` },
      { name: 'responsibleUserFiltering', type: 'string', required: false, description: `Filter tasks when no responsibleUser is given. Accepted values: assigned, unassignedOrMe, all.` },
      { name: 'searchText', type: 'string', required: false, description: `Text to search for across names and content.` },
      { name: 'sectionId', type: 'string', required: false, description: `The ID of the section. Get it from find-sections.` },
    ],
  },
  {
    name: 'todoistmcp_find-tasks-by-date',
    description: `Get tasks by date range. startDate='today' includes overdue items. Default responsibleUserFiltering='unassignedOrMe' excludes others' tasks. Person-specific queries (summaries, plans, reports) require responsibleUser.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'daysCount', type: 'integer', required: false, description: `Number of days to fetch starting from the start date. Defaults to 1.` },
      { name: 'labels', type: 'array', required: false, description: `Labels to apply to this item. Pass as a JSON array via the SDK, not as a string.` },
      { name: 'labelsOperator', type: 'string', required: false, description: `How to match multiple labels: "or" returns tasks with any label, "and" requires all labels.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of items to return per page.` },
      { name: 'overdueOption', type: 'string', required: false, description: `How to handle overdue tasks. Accepted values: overdue-only, include-overdue, exclude-overdue.` },
      { name: 'responsibleUser', type: 'string', required: false, description: `Email or user ID of the responsible user.` },
      { name: 'responsibleUserFiltering', type: 'string', required: false, description: `Filter tasks when no responsibleUser is given. Accepted values: assigned, unassignedOrMe, all.` },
      { name: 'startDate', type: 'string', required: false, description: `The start date to get the tasks for. Format: YYYY-MM-DD or 'today'.` },
    ],
  },
  {
    name: 'todoistmcp_get-overview',
    description: `Get a Markdown overview. If no projectId is provided, shows all projects with hierarchy and sections (useful for navigation). If projectId is provided, shows detailed overview of that specific project including all tasks grouped by sections.`,
    params: [
      { name: 'projectId', type: 'string', required: false, description: `The ID of the project. Get it from find-projects.` },
    ],
  },
  {
    name: 'todoistmcp_get-productivity-stats',
    description: `Get comprehensive productivity statistics including daily/weekly completion breakdowns, goal streaks (current, last, max), karma score and trends, and historical karma data. Useful for productivity analysis and tracking goal progress.`,
    params: [
    ],
  },
  {
    name: 'todoistmcp_get-project-activity-stats',
    description: `Get daily and optional weekly task completion counts for a project over a configurable time window (1-12 weeks). Useful for identifying completion trends and patterns.`,
    params: [
      { name: 'projectId', type: 'string', required: true, description: `The ID of the project. Get it from find-projects.` },
      { name: 'includeWeeklyCounts', type: 'boolean', required: false, description: `Include weekly rollup counts alongside daily counts.` },
      { name: 'weeks', type: 'integer', required: false, description: `Number of weeks of activity data to retrieve (1-12, default 2).` },
    ],
  },
  {
    name: 'todoistmcp_get-project-health',
    description: `Get a comprehensive health assessment for a project including completion progress, health status (EXCELLENT, ON_TRACK, AT_RISK, CRITICAL), and optional detailed context with project metrics and task-level recommendations. Use includeContext=true for full detail including task data.`,
    params: [
      { name: 'projectId', type: 'string', required: true, description: `The ID of the project. Get it from find-projects.` },
      { name: 'includeContext', type: 'boolean', required: false, description: `Include detailed health metrics and per-task data. May produce large output for big projects.` },
    ],
  },
  {
    name: 'todoistmcp_get-workspace-insights',
    description: `Get aggregated health and progress insights across all projects in a workspace. Accepts workspace name or ID, with optional project ID filtering. Useful for a cross-project health overview.`,
    params: [
      { name: 'workspaceIdOrName', type: 'string', required: true, description: `Workspace ID or name (exact or unique partial match, case-insensitive).` },
      { name: 'projectIds', type: 'array', required: false, description: `Limit insights to specific project IDs.` },
    ],
  },
  {
    name: 'todoistmcp_link-goal-tasks',
    description: `Link or unlink tasks to/from a goal.`,
    params: [
      { name: 'action', type: 'string', required: true, description: `Whether to link or unlink the tasks.` },
      { name: 'goalId', type: 'string', required: true, description: `The ID of the goal. Get it from find-goals.` },
      { name: 'taskIds', type: 'array', required: true, description: `The IDs of the tasks to link or unlink (max 50).` },
    ],
  },
  {
    name: 'todoistmcp_list-workspaces',
    description: `Get all workspaces for the authenticated user. Returns workspace details including ID, name, plan type (STARTER/BUSINESS), user role (ADMIN/MEMBER/GUEST), link sharing settings, guest permissions, creation date, and creator ID.`,
    params: [
    ],
  },
  {
    name: 'todoistmcp_manage-assignments',
    description: `Bulk assignment operations for multiple tasks. Supports assign, unassign, and reassign operations with atomic rollback on failures.`,
    params: [
      { name: 'operation', type: 'string', required: true, description: `The assignment operation to perform.` },
      { name: 'taskIds', type: 'array', required: true, description: `The IDs of the tasks to operate on (max 50).` },
      { name: 'dryRun', type: 'boolean', required: false, description: `If true, validates operations without executing them.` },
      { name: 'fromAssigneeUser', type: 'string', required: false, description: `For reassign: the current assignee to reassign from. Accepts user ID, name, or email.` },
      { name: 'responsibleUser', type: 'string', required: false, description: `Email or user ID of the responsible user.` },
    ],
  },
  {
    name: 'todoistmcp_project-management',
    description: `Archive or unarchive a project by its ID.`,
    params: [
      { name: 'action', type: 'string', required: true, description: `The action to perform on the project.` },
      { name: 'projectId', type: 'string', required: true, description: `The ID of the project. Get it from find-projects.` },
    ],
  },
  {
    name: 'todoistmcp_project-move',
    description: `Move a project between personal and workspace contexts.`,
    params: [
      { name: 'action', type: 'string', required: true, description: `The action to perform on the project.` },
      { name: 'projectId', type: 'string', required: true, description: `The ID of the project. Get it from find-projects.` },
      { name: 'folderId', type: 'string', required: false, description: `Optional target folder ID within the workspace.` },
      { name: 'visibility', type: 'string', required: false, description: `Optional access visibility for the project in the workspace (restricted, team, or public).` },
      { name: 'workspaceId', type: 'string', required: false, description: `The ID of the workspace. Get it from list-workspaces.` },
    ],
  },
  {
    name: 'todoistmcp_reorder-objects',
    description: `Reorder sibling projects or sections, and optionally move projects to a new parent. For projects: set order to reorder siblings, and/or set parentId to move under a new parent (use "root" for top level). For sections: set order to reorder within a project.`,
    params: [
      { name: 'items', type: 'array', required: true, description: `Items to reorder, each with an id and at least one of: order or parentId.` },
      { name: 'type', type: 'string', required: true, description: `Entity type to reorder. Accepted values: project, section.` },
    ],
  },
  {
    name: 'todoistmcp_reschedule-tasks',
    description: `Reschedule tasks to new dates while preserving recurring schedules. Unlike update-tasks (which replaces the entire due string and can wipe recurrence), this tool changes only the date, keeping recurrence patterns intact. Use this when moving recurring tasks to a different date without altering their repeat pattern.`,
    params: [
      { name: 'tasks', type: 'array', required: true, description: `The tasks to reschedule with their new dates.` },
    ],
  },
  {
    name: 'todoistmcp_search',
    description: `Search across tasks and projects in Todoist. Returns a list of relevant results with IDs, titles, and URLs.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `The search query string to find tasks and projects.` },
    ],
  },
  {
    name: 'todoistmcp_uncomplete-tasks',
    description: `Uncomplete (reopen) one or more completed tasks by their IDs.`,
    params: [
      { name: 'ids', type: 'array', required: true, description: `IDs of the goals to act on (max 25).` },
    ],
  },
  {
    name: 'todoistmcp_update-comments',
    description: `Update multiple existing comments with new content.`,
    params: [
      { name: 'comments', type: 'array', required: true, description: `The comments to update.` },
    ],
  },
  {
    name: 'todoistmcp_update-filters',
    description: `Update one or more existing personal filters with new values.`,
    params: [
      { name: 'filters', type: 'array', required: true, description: `The filters to update.` },
    ],
  },
  {
    name: 'todoistmcp_update-goals',
    description: `Update one or more goals by their IDs.`,
    params: [
      { name: 'goals', type: 'array', required: true, description: `The array of goals to update (max 25).` },
    ],
  },
  {
    name: 'todoistmcp_update-labels',
    description: `Update one or more existing labels. Personal labels (identified by ID) can have their name, color, order, and favorite flag updated. Shared labels (identified by name) can only be renamed.`,
    params: [
      { name: 'labels', type: 'array', required: true, description: `Labels to update. Use labelType="personal" with an ID, or labelType="shared" with name+newName.` },
    ],
  },
  {
    name: 'todoistmcp_update-projects',
    description: `Update multiple existing projects with new values.`,
    params: [
      { name: 'projects', type: 'array', required: true, description: `The projects to update.` },
    ],
  },
  {
    name: 'todoistmcp_update-reminders',
    description: `Update existing reminders. Each reminder must specify its type ("relative", "absolute", or "location") and ID. Only include fields that need to change.`,
    params: [
      { name: 'reminders', type: 'array', required: true, description: `Reminders array. Each must specify a type: relative, absolute, or location.` },
    ],
  },
  {
    name: 'todoistmcp_update-sections',
    description: `Update multiple existing sections with new values.`,
    params: [
      { name: 'sections', type: 'array', required: true, description: `The sections to update.` },
    ],
  },
  {
    name: 'todoistmcp_update-tasks',
    description: `Update existing tasks including content, dates, priorities, and assignments.`,
    params: [
      { name: 'tasks', type: 'array', required: true, description: `The tasks to update.` },
    ],
  },
  {
    name: 'todoistmcp_user-info',
    description: `Get comprehensive user information including user ID, full name, email, timezone with current local time, week start day preferences, current week dates, daily/weekly goal progress, and user plan (Free/Pro/Business).`,
    params: [
    ],
  },
  {
    name: 'todoistmcp_view-attachment',
    description: `View a file attachment from a Todoist comment. Pass the fileUrl from a comment's fileAttachment field. Supports images (returned inline), text files (returned as text), and binary files like PDFs (returned as embedded resources).`,
    params: [
      { name: 'fileUrl', type: 'string', required: true, description: `URL of the attachment to view. Get this from the fileUrl field in a comment's fileAttachment.` },
    ],
  },
]
