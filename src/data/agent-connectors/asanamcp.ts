import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'asanamcp_add_comment',
    description: `Post a comment (discussion entry) to a specific Asana task. Supports plain text or HTML formatting.`,
    params: [
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to post a comment on. Find the GID in the Asana task URL. Example: '1234567890123456'`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `HTML-formatted content of the comment. Use for rich text formatting with bold, links, etc. Example: '<body>This looks <strong>good</strong>!</body>'`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Plain text content of the comment. Use this for simple text comments without formatting. Example: 'This looks good, approved!'`,
      },
    ],
  },
  {
    name: 'asanamcp_create_project',
    description: `Create a new Asana project with optional sections and tasks pre-populated.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the project to create. This is the primary label shown in Asana's project list. Example: 'Q4 Product Launch'`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the project, explaining its purpose or scope. Example: 'Track all Q4 product launch tasks.'`,
      },
      {
        name: 'sections',
        type: 'array',
        required: false,
        description: `Names of sections to pre-create in the project. Sections help organize tasks into groups. Example: ["Planning", "In Progress", "Done"]`,
      },
      {
        name: 'team',
        type: 'string',
        required: false,
        description: `GID of the team to associate the project with. Team projects are visible to all team members. Example: '1234567890123456'`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `GID of the workspace where the project should be created. Required if no team is specified. Example: '1234567890123456'`,
      },
    ],
  },
  {
    name: 'asanamcp_create_project_preview',
    description: `Present a structured project plan for confirmation before creating the project in Asana.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the project to preview. This is the primary label shown in Asana's project list. Example: 'Q4 Product Launch'`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the project, explaining its purpose or scope. Example: 'Track all Q4 product launch tasks.'`,
      },
      {
        name: 'sections',
        type: 'array',
        required: false,
        description: `Names of sections to pre-create in the project. Sections help organize tasks into groups. Example: ["Planning", "In Progress", "Done"]`,
      },
      {
        name: 'team',
        type: 'string',
        required: false,
        description: `GID of the team to associate the project with. Team projects are visible to all team members. Example: '1234567890123456'`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `GID of the workspace where the project should be created. Required if no team is specified. Example: '1234567890123456'`,
      },
    ],
  },
  {
    name: 'asanamcp_create_project_status_update',
    description: `Post a status update to an Asana project or portfolio, including a title, status color, and body text.`,
    params: [
      {
        name: 'project_or_portfolio_gid',
        type: 'string',
        required: true,
        description: `GID of the project or portfolio to post the status update to. Find the GID in the Asana project or portfolio URL. Example: '1234567890123456'`,
      },
      {
        name: 'status_type',
        type: 'string',
        required: true,
        description: `Status color indicator representing the health of the project. Valid values: 'on_track', 'at_risk', 'off_track', 'on_hold', 'complete'. Example: 'on_track'`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the status update. Appears as the headline of the status entry. Example: 'On track for Q4 launch'`,
      },
      {
        name: 'body',
        type: 'string',
        required: false,
        description: `Detailed body text of the status update. Provides additional context, highlights, and notes. Example: 'All milestones are on track. Team velocity is good.'`,
      },
    ],
  },
  {
    name: 'asanamcp_create_task_preview',
    description: `Draft an Asana task for review before creation. Shows a preview to the user without immediately creating the task.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name (title) of the task to preview. This is the primary identifier that will be shown in Asana's task list. Example: 'Review Q4 report'`,
      },
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `GID or 'me' of the user to assign the task to. Use 'me' to assign to the authenticated user. Example: 'me' or '1234567890123456'`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Task description in plain text or HTML. Provides additional context for the preview. Example: 'Please review the Q4 financial report.'`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Proposed due date in ISO 8601 format (YYYY-MM-DD). Example: '2024-12-31'`,
      },
      {
        name: 'project',
        type: 'string',
        required: false,
        description: `GID of the project to add the task to. Example: '1234567890123456'`,
      },
      {
        name: 'section',
        type: 'string',
        required: false,
        description: `GID of the section within the project to place the task in. Requires project to also be specified. Example: '1234567890123456'`,
      },
    ],
  },
  {
    name: 'asanamcp_create_tasks',
    description: `Create one or more Asana tasks immediately, without a confirmation step. Supports creating up to 50 tasks in a single call.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name (title) of the task to create. This is the primary identifier shown in the Asana task list. Example: 'Review Q4 report'`,
      },
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `GID or 'me' of the user to assign the task to. Use 'me' to assign to the authenticated user. Example: 'me' or '1234567890123456'`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Task description in plain text or HTML. Provides additional context and details for the task. Example: 'Please review the Q4 financial report.'`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date for the task in ISO 8601 format (YYYY-MM-DD). Example: '2024-12-31'`,
      },
      {
        name: 'project',
        type: 'string',
        required: false,
        description: `GID of the project to add the task to. Find the project GID in the Asana project URL. Example: '1234567890123456'`,
      },
      {
        name: 'section',
        type: 'string',
        required: false,
        description: `GID of the section within the project to place the task in. Requires project to also be specified. Example: '1234567890123456'`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `GID of the workspace where the task should be created. Required if no project is specified. Example: '1234567890123456'`,
      },
    ],
  },
  {
    name: 'asanamcp_delete_task',
    description: `Permanently delete an Asana task and all of its dependent subtasks. This action cannot be undone.`,
    params: [
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to permanently delete. All subtasks will also be deleted. This action cannot be undone. Example: '1234567890123456'`,
      },
    ],
  },
  {
    name: 'asanamcp_get_agent',
    description: `Retrieve full details of a specific Asana AI Teammate agent record by its GID.`,
    params: [
      {
        name: 'agent_gid',
        type: 'string',
        required: true,
        description: `The GID of the AI Teammate agent to retrieve.`,
      },
    ],
  },
  {
    name: 'asanamcp_get_attachments',
    description: `Retrieve file attachments with download and view URLs for a task, project, or brief.`,
    params: [
      {
        name: 'parent_gid',
        type: 'string',
        required: true,
        description: `GID of the task, project, or project brief to get attachments for.`,
      },
      {
        name: 'parent_type',
        type: 'string',
        required: false,
        description: `Type of the parent resource. Valid values: task, project, project_brief.`,
      },
    ],
  },
  {
    name: 'asanamcp_get_items_for_portfolio',
    description: `Return all projects and other items contained within a specific Asana portfolio.`,
    params: [
      {
        name: 'portfolio_gid',
        type: 'string',
        required: true,
        description: `The GID of the portfolio to retrieve items for.`,
      },
    ],
  },
  {
    name: 'asanamcp_get_me',
    description: `Return profile details for the currently authenticated Asana user, including name, email, and workspace memberships.`,
    params: [],
  },
  {
    name: 'asanamcp_get_my_tasks',
    description: `Retrieve tasks assigned to the currently authenticated Asana user.`,
    params: [
      {
        name: 'completion_status',
        type: 'string',
        required: false,
        description: `Filter tasks by completion status. Valid values: 'incomplete' (default), 'completed', 'all'. Example: 'incomplete'`,
      },
    ],
  },
  {
    name: 'asanamcp_get_portfolio',
    description: `Retrieve details of a specific Asana portfolio including its associated projects and status.`,
    params: [
      {
        name: 'portfolio_gid',
        type: 'string',
        required: true,
        description: `The GID (global identifier) of the Asana portfolio to retrieve. Example: '1234567890123456'`,
      },
    ],
  },
  {
    name: 'asanamcp_get_portfolios',
    description: `List all portfolios owned by the currently authenticated Asana user.`,
    params: [
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `The GID of the workspace to filter portfolios by. If omitted, returns portfolios across all workspaces. Example: '1234567890123456'`,
      },
    ],
  },
  {
    name: 'asanamcp_get_project',
    description: `Fetch details of a specific Asana project including its sections and member information.`,
    params: [
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `The GID (global identifier) of the Asana project to retrieve. Example: '1234567890123456'`,
      },
    ],
  },
  {
    name: 'asanamcp_get_projects',
    description: `List workspace projects, optionally filtered by team. Returns project names, GIDs, and status.`,
    params: [
      {
        name: 'include_archived',
        type: 'boolean',
        required: false,
        description: `Whether to include archived projects in the results. Defaults to false if omitted.`,
      },
      {
        name: 'team',
        type: 'string',
        required: false,
        description: `Filter projects by team GID. Only projects belonging to the specified team will be returned. Example: '1234567890123456'`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `The GID of the workspace to list projects from. Example: '1234567890123456'`,
      },
    ],
  },
  {
    name: 'asanamcp_get_status_overview',
    description: `Returns an aggregated status report for one or more Asana projects or portfolios, including health indicators and progress updates.`,
    params: [
      {
        name: 'project_or_portfolio',
        type: 'string',
        required: false,
        description: `Name or GID of the project or portfolio to get status for.`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `Workspace GID to look up the project or portfolio in.`,
      },
    ],
  },
  {
    name: 'asanamcp_get_task',
    description: `Retrieve comprehensive details of a specific Asana task by its GID, including assignments, dates, custom fields, and comments.`,
    params: [
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `The GID (global identifier) of the Asana task to retrieve. Example: '1234567890123456'`,
      },
    ],
  },
  {
    name: 'asanamcp_get_tasks',
    description: `Returns a filtered list of tasks by context. At least one filter parameter (project, section, tag, user_task_list, or assignee) is required.`,
    params: [
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `Filter tasks by assignee. Provide an assignee GID or the string 'me' for the current user. Example: 'me' or '1234567890123456'`,
      },
      {
        name: 'completed',
        type: 'boolean',
        required: false,
        description: `Filter tasks by completion status. Set to true to return only completed tasks, false for incomplete tasks. If omitted, returns all tasks.`,
      },
      {
        name: 'project',
        type: 'string',
        required: false,
        description: `Filter tasks by project GID. Example: '1234567890123456'`,
      },
      {
        name: 'section',
        type: 'string',
        required: false,
        description: `Filter tasks by section GID. Returns tasks in the specified section. Example: '1234567890123456'`,
      },
      {
        name: 'tag',
        type: 'string',
        required: false,
        description: `Filter tasks by tag GID. Returns tasks associated with the specified tag. Example: '1234567890123456'`,
      },
      {
        name: 'user_task_list',
        type: 'string',
        required: false,
        description: `Filter tasks by user task list (My Tasks) GID. Example: '1234567890123456'`,
      },
    ],
  },
  {
    name: 'asanamcp_get_teams',
    description: `List teams in the workspace, optionally filtered to teams the specified user is a member of.`,
    params: [
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `User GID or 'me' to filter teams by the user's membership.`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `Workspace GID to list teams from.`,
      },
    ],
  },
  {
    name: 'asanamcp_get_user',
    description: `Retrieve details of an Asana user by their GID, email address, or 'me' for the current user.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Email address of the user to look up.`,
      },
      {
        name: 'user_gid',
        type: 'string',
        required: false,
        description: `User GID or 'me' to retrieve the authenticated user's details.`,
      },
    ],
  },
  {
    name: 'asanamcp_get_users',
    description: `List users in the workspace, optionally filtered to members of a specific team.`,
    params: [
      {
        name: 'team',
        type: 'string',
        required: false,
        description: `Team GID to filter users by team membership.`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `Workspace GID to list users from.`,
      },
    ],
  },
  {
    name: 'asanamcp_get_workspace_agents',
    description: `Return a list of all AI Teammate agents configured in the Asana workspace.`,
    params: [],
  },
  {
    name: 'asanamcp_search_objects',
    description: `Universal search across Asana resource types including tasks, projects, portfolios, goals, teams, users, tags, and custom fields.`,
    params: [
      {
        name: 'resource_type',
        type: 'string',
        required: true,
        description: `Type of Asana resource to search. Valid values: task, project, portfolio, goal, team, user, tag, custom_field. Example: 'task'`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query text to match against resource names and descriptions. Example: 'Q4 planning'`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `The GID of the workspace to scope the search within. If omitted, searches across all accessible workspaces. Example: '1234567890123456'`,
      },
    ],
  },
  {
    name: 'asanamcp_search_tasks',
    description: `Advanced task searching with full-text and attribute-based filtering. Requires a Premium Asana account.`,
    params: [
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `Filter tasks by assignee GID or 'me' for the current user. Example: 'me'`,
      },
      {
        name: 'completed',
        type: 'boolean',
        required: false,
        description: `Filter by completion status. Set to true to return only completed tasks, false for incomplete tasks.`,
      },
      {
        name: 'due_on',
        type: 'string',
        required: false,
        description: `Filter tasks with an exact due date (ISO 8601 format). Example: '2024-12-31'`,
      },
      {
        name: 'due_on_after',
        type: 'string',
        required: false,
        description: `Filter tasks due after this date (ISO 8601 format, inclusive). Example: '2024-01-01'`,
      },
      {
        name: 'due_on_before',
        type: 'string',
        required: false,
        description: `Filter tasks due before this date (ISO 8601 format, exclusive). Example: '2024-12-31'`,
      },
      {
        name: 'project',
        type: 'string',
        required: false,
        description: `Filter tasks by project GID. Example: '1234567890123456'`,
      },
      {
        name: 'section',
        type: 'string',
        required: false,
        description: `Filter tasks by section GID. Example: '1234567890123456'`,
      },
      {
        name: 'tag',
        type: 'string',
        required: false,
        description: `Filter tasks by tag GID. Example: '1234567890123456'`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Full-text search query to match against task names and descriptions. Example: 'website redesign'`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `The GID of the workspace to search within. Example: '1234567890123456'`,
      },
    ],
  },
  {
    name: 'asanamcp_search_tasks_preview',
    description: `Display interactive search results for Asana tasks matching the given filters, before committing to any action.`,
    params: [
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `Filter tasks by assignee GID or 'me' for the authenticated user. Example: 'me' or '1234567890123456'`,
      },
      {
        name: 'due_date_range_end',
        type: 'string',
        required: false,
        description: `End of the due date range filter in ISO 8601 format (YYYY-MM-DD). Returns tasks with due dates on or before this date. Example: '2024-12-31'`,
      },
      {
        name: 'due_date_range_start',
        type: 'string',
        required: false,
        description: `Start of the due date range filter in ISO 8601 format (YYYY-MM-DD). Returns tasks with due dates on or after this date. Example: '2024-01-01'`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter tasks by completion status. Valid values: 'incomplete', 'completed', 'all'. Example: 'incomplete'`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Full-text search query for tasks. Matches against task name, description, and other text fields. Example: 'Q4 launch'`,
      },
    ],
  },
  {
    name: 'asanamcp_update_tasks',
    description: `Modify one or more Asana tasks in a single operation. Supports updating up to 50 tasks at once.`,
    params: [
      {
        name: 'task_gids',
        type: 'array',
        required: true,
        description: `List of GIDs of the tasks to update. Up to 50 task GIDs may be provided in a single call. Example: ["1234567890123456", "9876543210987654"]`,
      },
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `New assignee GID or 'me' to reassign the task(s). Use 'me' to assign to the authenticated user. Example: 'me' or '1234567890123456'`,
      },
      {
        name: 'completed',
        type: 'boolean',
        required: false,
        description: `Set to true to mark the task(s) as completed, or false to reopen them. Example: true`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the task(s). Replaces the existing description. Supports plain text or HTML. Example: 'Updated task description.'`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `New due date in ISO 8601 format (YYYY-MM-DD). Replaces the existing due date. Example: '2024-12-31'`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name (title) for the task(s). Replaces the existing task name. Example: 'Updated task name'`,
      },
    ],
  },
]
