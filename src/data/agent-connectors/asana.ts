import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'asana_attachment_delete',
    description: `Delete an attachment permanently.`,
    params: [
      {
        name: 'attachment_gid',
        type: 'string',
        required: true,
        description: `GID of the attachment to delete`,
      },
    ],
  },
  {
    name: 'asana_attachment_get',
    description: `Get details of a specific attachment by its GID.`,
    params: [
      {
        name: 'attachment_gid',
        type: 'string',
        required: true,
        description: `GID of the attachment to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_me_get',
    description: `Get the profile of the authenticated user.`,
    params: [
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_project_create',
    description: `Create a new project in a workspace.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the project` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `GID of the workspace to create the project in`,
      },
      { name: 'color', type: 'string', required: false, description: `Color of the project` },
      {
        name: 'default_view',
        type: 'string',
        required: false,
        description: `Default view for the project`,
      },
      {
        name: 'due_on',
        type: 'string',
        required: false,
        description: `Due date for the project (YYYY-MM-DD)`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Free-form text description for the project`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'privacy_setting',
        type: 'string',
        required: false,
        description: `Privacy setting for the project`,
      },
      {
        name: 'start_on',
        type: 'string',
        required: false,
        description: `Start date for the project (YYYY-MM-DD)`,
      },
      {
        name: 'team',
        type: 'string',
        required: false,
        description: `GID of the team to share the project with`,
      },
    ],
  },
  {
    name: 'asana_project_delete',
    description: `Delete a project permanently.`,
    params: [
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to delete`,
      },
    ],
  },
  {
    name: 'asana_project_duplicate',
    description: `Create a duplicate of an existing project.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name for the duplicated project`,
      },
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to duplicate`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'team',
        type: 'string',
        required: false,
        description: `GID of the team for the duplicated project`,
      },
    ],
  },
  {
    name: 'asana_project_get',
    description: `Get details of a specific project by its GID.`,
    params: [
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_project_tasks_list',
    description: `List all tasks in a specific project.`,
    params: [
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to list tasks from`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_project_update',
    description: `Update an existing project's properties.`,
    params: [
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to update`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Whether the project is archived`,
      },
      { name: 'color', type: 'string', required: false, description: `Color of the project` },
      {
        name: 'default_view',
        type: 'string',
        required: false,
        description: `Default view for the project`,
      },
      {
        name: 'due_on',
        type: 'string',
        required: false,
        description: `Due date for the project (YYYY-MM-DD)`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the project` },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Free-form text description for the project`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'privacy_setting',
        type: 'string',
        required: false,
        description: `Privacy setting for the project`,
      },
      {
        name: 'start_on',
        type: 'string',
        required: false,
        description: `Start date for the project (YYYY-MM-DD)`,
      },
    ],
  },
  {
    name: 'asana_projects_list',
    description: `List projects in a workspace or team.`,
    params: [
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'team',
        type: 'string',
        required: false,
        description: `GID of a team to filter projects by`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: false,
        description: `GID of the workspace to list projects from`,
      },
    ],
  },
  {
    name: 'asana_section_add_task',
    description: `Move a task into a specific section within a project.`,
    params: [
      {
        name: 'section_gid',
        type: 'string',
        required: true,
        description: `GID of the section to add the task to`,
      },
      {
        name: 'task',
        type: 'string',
        required: true,
        description: `GID of the task to move into this section`,
      },
      {
        name: 'insert_after',
        type: 'string',
        required: false,
        description: `Insert the task after this task GID within the section`,
      },
      {
        name: 'insert_before',
        type: 'string',
        required: false,
        description: `Insert the task before this task GID within the section`,
      },
    ],
  },
  {
    name: 'asana_section_create',
    description: `Create a new section in a project.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the section` },
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to create a section in`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_section_delete',
    description: `Delete a section from a project.`,
    params: [
      {
        name: 'section_gid',
        type: 'string',
        required: true,
        description: `GID of the section to delete`,
      },
    ],
  },
  {
    name: 'asana_section_get',
    description: `Get details of a specific section by its GID.`,
    params: [
      {
        name: 'section_gid',
        type: 'string',
        required: true,
        description: `GID of the section to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_section_update',
    description: `Update the name of a section.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `New name for the section` },
      {
        name: 'section_gid',
        type: 'string',
        required: true,
        description: `GID of the section to update`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_sections_list',
    description: `List all sections in a project.`,
    params: [
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to list sections from`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_story_create',
    description: `Add a comment or story to a task.`,
    params: [
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to add the comment to`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `Text of the comment to add to the task`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_story_get',
    description: `Get details of a specific story by its GID.`,
    params: [
      {
        name: 'story_gid',
        type: 'string',
        required: true,
        description: `GID of the story to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_subtask_create',
    description: `Create a subtask under an existing task.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the subtask` },
      { name: 'task_gid', type: 'string', required: true, description: `GID of the parent task` },
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `GID of the user to assign, or 'me'`,
      },
      {
        name: 'due_on',
        type: 'string',
        required: false,
        description: `Due date for the subtask (YYYY-MM-DD)`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Free-form description for the subtask`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_tag_create',
    description: `Create a new tag in a workspace.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the tag` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `GID of the workspace to create the tag in`,
      },
      { name: 'color', type: 'string', required: false, description: `Color for the tag` },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_tag_delete',
    description: `Delete a tag permanently.`,
    params: [
      { name: 'tag_gid', type: 'string', required: true, description: `GID of the tag to delete` },
    ],
  },
  {
    name: 'asana_tag_get',
    description: `Get details of a specific tag by its GID.`,
    params: [
      {
        name: 'tag_gid',
        type: 'string',
        required: true,
        description: `GID of the tag to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_tag_update',
    description: `Update a tag's name or color.`,
    params: [
      { name: 'tag_gid', type: 'string', required: true, description: `GID of the tag to update` },
      { name: 'color', type: 'string', required: false, description: `New color for the tag` },
      { name: 'name', type: 'string', required: false, description: `New name for the tag` },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_tags_list',
    description: `List tags in a workspace.`,
    params: [
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: false,
        description: `GID of the workspace to list tags from`,
      },
    ],
  },
  {
    name: 'asana_task_add_followers',
    description: `Add followers to a task.`,
    params: [
      {
        name: 'followers',
        type: 'string',
        required: true,
        description: `Comma-separated GIDs of users to add as followers`,
      },
      { name: 'task_gid', type: 'string', required: true, description: `GID of the task` },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_task_add_project',
    description: `Add a task to a project.`,
    params: [
      {
        name: 'project',
        type: 'string',
        required: true,
        description: `GID of the project to add the task to`,
      },
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to add to a project`,
      },
      {
        name: 'insert_after',
        type: 'string',
        required: false,
        description: `Insert the task after this task in the project`,
      },
      {
        name: 'insert_before',
        type: 'string',
        required: false,
        description: `Insert the task before this task in the project`,
      },
      {
        name: 'section',
        type: 'string',
        required: false,
        description: `GID of a section in the project to place the task`,
      },
    ],
  },
  {
    name: 'asana_task_add_tag',
    description: `Add a tag to a task.`,
    params: [
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `GID of the tag to add to the task`,
      },
      { name: 'task_gid', type: 'string', required: true, description: `GID of the task` },
    ],
  },
  {
    name: 'asana_task_create',
    description: `Create a new task in Asana.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the task` },
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `GID of the user to assign, or 'me'`,
      },
      {
        name: 'due_on',
        type: 'string',
        required: false,
        description: `Due date for the task (YYYY-MM-DD)`,
      },
      {
        name: 'followers',
        type: 'string',
        required: false,
        description: `Comma-separated GIDs of users to follow the task`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Free-form text description of the task`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'projects',
        type: 'string',
        required: false,
        description: `Comma-separated GIDs of projects to add the task to`,
      },
      {
        name: 'start_on',
        type: 'string',
        required: false,
        description: `Start date for the task (YYYY-MM-DD)`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: false,
        description: `GID of the workspace to create the task in (required if no project)`,
      },
    ],
  },
  {
    name: 'asana_task_delete',
    description: `Delete a task permanently.`,
    params: [
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to delete`,
      },
    ],
  },
  {
    name: 'asana_task_duplicate',
    description: `Create a duplicate of an existing task.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name for the duplicated task` },
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to duplicate`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to copy (assignee, attachments, dates, dependencies, notes, projects, subtasks, tags)`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_task_get',
    description: `Get details of a specific task by its GID.`,
    params: [
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_task_remove_followers',
    description: `Remove followers from a task.`,
    params: [
      {
        name: 'followers',
        type: 'string',
        required: true,
        description: `Comma-separated GIDs of users to remove as followers`,
      },
      { name: 'task_gid', type: 'string', required: true, description: `GID of the task` },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_task_remove_project',
    description: `Remove a task from a project.`,
    params: [
      {
        name: 'project',
        type: 'string',
        required: true,
        description: `GID of the project to remove the task from`,
      },
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to remove from a project`,
      },
    ],
  },
  {
    name: 'asana_task_remove_tag',
    description: `Remove a tag from a task.`,
    params: [
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `GID of the tag to remove from the task`,
      },
      { name: 'task_gid', type: 'string', required: true, description: `GID of the task` },
    ],
  },
  {
    name: 'asana_task_set_parent',
    description: `Set or change the parent task of a task.`,
    params: [
      {
        name: 'parent',
        type: 'string | null',
        required: true,
        description: `GID of the new parent task. Use null to make it a top-level task.`,
      },
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to set parent for`,
      },
      {
        name: 'insert_after',
        type: 'string',
        required: false,
        description: `A subtask GID to insert this task after in the parent`,
      },
      {
        name: 'insert_before',
        type: 'string',
        required: false,
        description: `A subtask GID to insert this task before in the parent`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_task_stories_list',
    description: `List stories (comments and activity) on a task.`,
    params: [
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to list stories from`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_task_subtasks_list',
    description: `List all subtasks of a task.`,
    params: [
      { name: 'task_gid', type: 'string', required: true, description: `GID of the parent task` },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_task_update',
    description: `Update an existing task's properties.`,
    params: [
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to update`,
      },
      {
        name: 'assignee',
        type: 'string | null',
        required: false,
        description: `GID of the user to assign, or 'me', or null to unassign`,
      },
      {
        name: 'completed',
        type: 'boolean',
        required: false,
        description: `Mark the task as complete or incomplete`,
      },
      {
        name: 'due_on',
        type: 'string',
        required: false,
        description: `Due date for the task (YYYY-MM-DD)`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the task` },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Updated description for the task`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'start_on',
        type: 'string',
        required: false,
        description: `Start date for the task (YYYY-MM-DD)`,
      },
    ],
  },
  {
    name: 'asana_tasks_list',
    description: `List tasks filtered by project, section, assignee, or workspace.`,
    params: [
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `GID or 'me' to filter tasks by assignee`,
      },
      {
        name: 'completed_since',
        type: 'string',
        required: false,
        description: `Only return tasks completed after this date-time (ISO 8601)`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'project',
        type: 'string',
        required: false,
        description: `GID of a project to filter tasks by`,
      },
      {
        name: 'section',
        type: 'string',
        required: false,
        description: `GID of a section to filter tasks by`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: false,
        description: `GID of the workspace (required if assignee is set without project)`,
      },
    ],
  },
  {
    name: 'asana_team_add_user',
    description: `Add a user to a team.`,
    params: [
      { name: 'team_gid', type: 'string', required: true, description: `GID of the team` },
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `GID of the user to add to the team`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_team_get',
    description: `Get details of a specific team by its GID.`,
    params: [
      {
        name: 'team_gid',
        type: 'string',
        required: true,
        description: `GID of the team to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_team_remove_user',
    description: `Remove a user from a team.`,
    params: [
      { name: 'team_gid', type: 'string', required: true, description: `GID of the team` },
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `GID of the user to remove from the team`,
      },
    ],
  },
  {
    name: 'asana_user_get',
    description: `Get the profile of a specific user by GID.`,
    params: [
      {
        name: 'user_gid',
        type: 'string',
        required: true,
        description: `GID of the user. Use 'me' for the authenticated user.`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_users_list',
    description: `List users in a workspace.`,
    params: [
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to list users from`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_webhooks_list',
    description: `List all webhooks for a workspace.`,
    params: [
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `GID of the workspace to list webhooks for`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'resource',
        type: 'string',
        required: false,
        description: `GID of a resource to filter webhooks by`,
      },
    ],
  },
  {
    name: 'asana_workspace_get',
    description: `Get details of a specific workspace by its GID.`,
    params: [
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_workspace_teams_list',
    description: `List all teams in a workspace.`,
    params: [
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_workspaces_list',
    description: `List all workspaces the authenticated user has access to.`,
    params: [
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
]
