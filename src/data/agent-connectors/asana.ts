import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'asana_allocation_create',
    description: `Create a resource allocation for a user on a project. Optionally specify start/end dates and effort percentage.`,
    params: [
      {
        name: 'assignee_gid',
        type: 'string',
        required: true,
        description: `GID of the user to allocate to the project`,
      },
      {
        name: 'parent_gid',
        type: 'string',
        required: true,
        description: `GID of the project this allocation is for`,
      },
      {
        name: 'effort_percent',
        type: 'number',
        required: false,
        description: `Effort percentage for the allocation, from 0 to 100`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date of the allocation in YYYY-MM-DD format`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date of the allocation in YYYY-MM-DD format`,
      },
    ],
  },
  {
    name: 'asana_allocation_delete',
    description: `Permanently delete a resource allocation by its GID. This action cannot be undone.`,
    params: [
      {
        name: 'allocation_gid',
        type: 'string',
        required: true,
        description: `GID of the allocation to delete`,
      },
    ],
  },
  {
    name: 'asana_allocation_get',
    description: `Get a single resource allocation record by its GID.`,
    params: [
      {
        name: 'allocation_gid',
        type: 'string',
        required: true,
        description: `GID of the allocation to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_allocation_update',
    description: `Update an existing resource allocation. You can update start date, end date, and/or effort percentage. Only provided fields are updated.`,
    params: [
      {
        name: 'allocation_gid',
        type: 'string',
        required: true,
        description: `GID of the allocation to update`,
      },
      {
        name: 'effort_percent',
        type: 'number',
        required: false,
        description: `New effort percentage for the allocation, from 0 to 100`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `New end date for the allocation in YYYY-MM-DD format`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `New start date for the allocation in YYYY-MM-DD format`,
      },
    ],
  },
  {
    name: 'asana_allocations_list',
    description: `List resource allocations. At least one of assignee_gid or parent_gid is required by the Asana API.`,
    params: [
      {
        name: 'assignee_gid',
        type: 'string',
        required: false,
        description: `GID of the user to filter allocations by assignee`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
      {
        name: 'parent_gid',
        type: 'string',
        required: false,
        description: `GID of the parent project or portfolio to filter allocations by`,
      },
    ],
  },
  {
    name: 'asana_attachment_create',
    description: `Upload a file attachment to a task by URL (external/url attachment type).`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name (filename) for the attachment`,
      },
      {
        name: 'parent_gid',
        type: 'string',
        required: true,
        description: `GID of the task to attach the file to`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The publicly accessible URL of the file to attach`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the attachment`,
      },
    ],
  },
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
    name: 'asana_attachments_list',
    description: `List all attachments for a task or project.`,
    params: [
      {
        name: 'parent_gid',
        type: 'string',
        required: true,
        description: `GID of the task or project to list attachments for`,
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
    name: 'asana_custom_field_create',
    description: `Create a custom field in a workspace.`,
    params: [
      {
        name: 'field_type',
        type: 'string',
        required: true,
        description: `Type of the custom field. One of: text, number, enum, multi_enum, date, people`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the custom field` },
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace in which to create the custom field`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the custom field`,
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
    name: 'asana_custom_field_delete',
    description: `Permanently delete a custom field. This action cannot be undone.`,
    params: [
      {
        name: 'custom_field_gid',
        type: 'string',
        required: true,
        description: `GID of the custom field to delete`,
      },
    ],
  },
  {
    name: 'asana_custom_field_enum_option_create',
    description: `Add an enum option to a custom field of type enum or multi_enum.`,
    params: [
      {
        name: 'custom_field_gid',
        type: 'string',
        required: true,
        description: `GID of the custom field to add an enum option to`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the enum option` },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Color of the enum option (e.g. red, orange, yellow, green, teal, blue, indigo, purple, pink)`,
      },
    ],
  },
  {
    name: 'asana_custom_field_get',
    description: `Get a custom field definition by its GID.`,
    params: [
      {
        name: 'custom_field_gid',
        type: 'string',
        required: true,
        description: `GID of the custom field to retrieve`,
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
    name: 'asana_custom_field_update',
    description: `Update an existing custom field. Provide name and/or description to update.`,
    params: [
      {
        name: 'custom_field_gid',
        type: 'string',
        required: true,
        description: `GID of the custom field to update`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the custom field`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the custom field`,
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
    name: 'asana_enum_option_update',
    description: `Update an enum option on a custom field. Can change the name, color, and enabled status.`,
    params: [
      {
        name: 'enum_option_gid',
        type: 'string',
        required: true,
        description: `GID of the enum option to update`,
      },
      { name: 'name', type: 'string', required: true, description: `New name for the enum option` },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `New color for the enum option (e.g. red, orange, yellow, green, teal, blue, indigo, purple, pink)`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the enum option is enabled. Disabled options are hidden from the UI.`,
      },
    ],
  },
  {
    name: 'asana_goal_add_followers',
    description: `Add one or more followers to a goal.`,
    params: [
      {
        name: 'followers',
        type: 'string',
        required: true,
        description: `Comma-separated list of user GIDs to add as followers`,
      },
      {
        name: 'goal_gid',
        type: 'string',
        required: true,
        description: `GID of the goal to add followers to`,
      },
    ],
  },
  {
    name: 'asana_goal_add_supporting_relationship',
    description: `Add a supporting relationship to a goal, linking a sub-goal, project, or task as a supporting resource.`,
    params: [
      {
        name: 'goal_gid',
        type: 'string',
        required: true,
        description: `GID of the goal to add a supporting relationship to`,
      },
      {
        name: 'supporting_resource_gid',
        type: 'string',
        required: true,
        description: `GID of the goal, project, or task to link as a supporting resource`,
      },
      {
        name: 'contribution_weight',
        type: 'number',
        required: false,
        description: `Weight of the supporting resource's contribution to the goal (0–1)`,
      },
    ],
  },
  {
    name: 'asana_goal_create',
    description: `Create a new goal in a workspace.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the goal` },
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace in which to create the goal`,
      },
      {
        name: 'due_on',
        type: 'string',
        required: false,
        description: `Due date for the goal in ISO 8601 date format (YYYY-MM-DD)`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Free-form notes / description for the goal`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'owner',
        type: 'string',
        required: false,
        description: `GID of the user who owns this goal, or "me" for the current user`,
      },
    ],
  },
  {
    name: 'asana_goal_delete',
    description: `Permanently delete a goal. This action cannot be undone.`,
    params: [
      {
        name: 'goal_gid',
        type: 'string',
        required: true,
        description: `GID of the goal to delete`,
      },
    ],
  },
  {
    name: 'asana_goal_get',
    description: `Get details of a specific goal including its metric and current value.`,
    params: [
      {
        name: 'goal_gid',
        type: 'string',
        required: true,
        description: `GID of the goal to retrieve`,
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
    name: 'asana_goal_parent_goals_list',
    description: `List all parent goals for a given goal.`,
    params: [
      {
        name: 'goal_gid',
        type: 'string',
        required: true,
        description: `GID of the goal whose parent goals to list`,
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
    name: 'asana_goal_relationship_get',
    description: `Get a goal relationship by its GID.`,
    params: [
      {
        name: 'goal_relationship_gid',
        type: 'string',
        required: true,
        description: `GID of the goal relationship to retrieve`,
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
    name: 'asana_goal_relationships_list',
    description: `List goal relationships, optionally filtered by a supported goal.`,
    params: [
      {
        name: 'supported_goal_gid',
        type: 'string',
        required: true,
        description: `GID of the goal whose relationships to list`,
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
    name: 'asana_goal_remove_followers',
    description: `Remove one or more followers from a goal.`,
    params: [
      {
        name: 'followers',
        type: 'string',
        required: true,
        description: `Comma-separated list of user GIDs to remove as followers`,
      },
      {
        name: 'goal_gid',
        type: 'string',
        required: true,
        description: `GID of the goal to remove followers from`,
      },
    ],
  },
  {
    name: 'asana_goal_remove_supporting_relationship',
    description: `Remove a supporting relationship from a goal, unlinking a sub-goal, project, or task.`,
    params: [
      {
        name: 'goal_gid',
        type: 'string',
        required: true,
        description: `GID of the goal to remove the supporting relationship from`,
      },
      {
        name: 'supporting_resource_gid',
        type: 'string',
        required: true,
        description: `GID of the supporting resource to unlink from the goal`,
      },
    ],
  },
  {
    name: 'asana_goal_set_metric',
    description: `Set or update the metric for a goal (e.g. percentage, number, currency).`,
    params: [
      {
        name: 'goal_gid',
        type: 'string',
        required: true,
        description: `GID of the goal on which to set the metric`,
      },
      {
        name: 'metric_type',
        type: 'string',
        required: true,
        description: `Type of metric for this goal`,
      },
      {
        name: 'target_value',
        type: 'number',
        required: false,
        description: `Target numeric value for the goal metric`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Unit label for the metric (e.g. USD, users, leads)`,
      },
    ],
  },
  {
    name: 'asana_goal_set_metric_value',
    description: `Update the current value of a goal metric to track progress.`,
    params: [
      {
        name: 'current_value',
        type: 'number',
        required: true,
        description: `The new current numeric value for the goal metric`,
      },
      {
        name: 'goal_gid',
        type: 'string',
        required: true,
        description: `GID of the goal whose metric current value should be updated`,
      },
    ],
  },
  {
    name: 'asana_goal_stories_list',
    description: `List stories (activity feed entries) for a goal.`,
    params: [
      {
        name: 'goal_gid',
        type: 'string',
        required: true,
        description: `GID of the goal whose stories to list`,
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
    name: 'asana_goal_story_create',
    description: `Add a comment or story to a goal's activity feed.`,
    params: [
      {
        name: 'goal_gid',
        type: 'string',
        required: true,
        description: `GID of the goal to add a story to`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `Text content of the story / comment to add`,
      },
    ],
  },
  {
    name: 'asana_goal_update',
    description: `Update an existing goal's name, notes, due date, or status.`,
    params: [
      {
        name: 'goal_gid',
        type: 'string',
        required: true,
        description: `GID of the goal to update`,
      },
      {
        name: 'due_on',
        type: 'string',
        required: false,
        description: `Updated due date in ISO 8601 date format (YYYY-MM-DD)`,
      },
      { name: 'name', type: 'string', required: false, description: `Updated name for the goal` },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Updated free-form notes / description for the goal`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Updated status of the goal`,
      },
    ],
  },
  {
    name: 'asana_goals_list',
    description: `Get goals for a workspace, optionally filtered by team or time period.`,
    params: [
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to list goals from`,
      },
      {
        name: 'is_workspace_level',
        type: 'boolean',
        required: false,
        description: `If true, filter to only workspace-level goals (not team goals)`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'team_gid',
        type: 'string',
        required: false,
        description: `GID of the team to filter goals by`,
      },
    ],
  },
  {
    name: 'asana_job_get',
    description: `Get the status of an async job (e.g. from project or task duplication). Poll until status is "succeeded" or "failed".`,
    params: [
      {
        name: 'job_gid',
        type: 'string',
        required: true,
        description: `GID of the async job to retrieve`,
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
    name: 'asana_membership_create',
    description: `Add a user as a member of a project or goal. Optionally specify a role for the membership.`,
    params: [
      {
        name: 'member_gid',
        type: 'string',
        required: true,
        description: `GID of the user to add as a member`,
      },
      {
        name: 'parent_gid',
        type: 'string',
        required: true,
        description: `GID of the project or goal to add the member to`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Role to assign to the new member (e.g. editor, commenter, viewer)`,
      },
    ],
  },
  {
    name: 'asana_membership_delete',
    description: `Remove a member from a project or goal by deleting the membership record. This action cannot be undone.`,
    params: [
      {
        name: 'membership_gid',
        type: 'string',
        required: true,
        description: `GID of the membership to delete`,
      },
    ],
  },
  {
    name: 'asana_membership_get',
    description: `Get the details of a single membership record by its GID.`,
    params: [
      {
        name: 'membership_gid',
        type: 'string',
        required: true,
        description: `GID of the membership record to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_membership_update',
    description: `Update the role of an existing membership record.`,
    params: [
      {
        name: 'membership_gid',
        type: 'string',
        required: true,
        description: `GID of the membership record to update`,
      },
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `New role to assign to the member (e.g. editor, commenter, viewer)`,
      },
    ],
  },
  {
    name: 'asana_memberships_list',
    description: `List memberships for a project or goal, optionally filtered by a specific member.`,
    params: [
      {
        name: 'parent_gid',
        type: 'string',
        required: true,
        description: `GID of the project or goal to list memberships for`,
      },
      {
        name: 'member_gid',
        type: 'string',
        required: false,
        description: `GID of a member (user) to filter memberships by`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_my_tasks_list',
    description: `Get tasks from the authenticated user's personal My Tasks list in a workspace.`,
    params: [
      {
        name: 'user_task_list_gid',
        type: 'string',
        required: true,
        description: `GID of the user task list (My Tasks list) to retrieve tasks from`,
      },
      {
        name: 'completed_since',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; only return tasks completed after this time`,
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
    name: 'asana_portfolio_add_item',
    description: `Add a project to a portfolio.`,
    params: [
      {
        name: 'item_gid',
        type: 'string',
        required: true,
        description: `GID of the project to add to the portfolio`,
      },
      {
        name: 'portfolio_gid',
        type: 'string',
        required: true,
        description: `GID of the portfolio to add an item to`,
      },
    ],
  },
  {
    name: 'asana_portfolio_add_members',
    description: `Add one or more members to a portfolio by their user GIDs.`,
    params: [
      {
        name: 'members',
        type: 'string',
        required: true,
        description: `Comma-separated list of user GIDs to add as members`,
      },
      {
        name: 'portfolio_gid',
        type: 'string',
        required: true,
        description: `GID of the portfolio to add members to`,
      },
    ],
  },
  {
    name: 'asana_portfolio_create',
    description: `Create a new portfolio in a workspace.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the portfolio` },
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to create the portfolio in`,
      },
      { name: 'color', type: 'string', required: false, description: `Color of the portfolio` },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_portfolio_custom_field_settings_list',
    description: `List all custom field settings for a portfolio, including which custom fields are attached and their display configuration.`,
    params: [
      {
        name: 'portfolio_gid',
        type: 'string',
        required: true,
        description: `GID of the portfolio to list custom field settings for`,
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
    name: 'asana_portfolio_delete',
    description: `Permanently delete a portfolio by its GID. This action cannot be undone.`,
    params: [
      {
        name: 'portfolio_gid',
        type: 'string',
        required: true,
        description: `GID of the portfolio to delete`,
      },
    ],
  },
  {
    name: 'asana_portfolio_get',
    description: `Get details of a specific portfolio by its GID.`,
    params: [
      {
        name: 'portfolio_gid',
        type: 'string',
        required: true,
        description: `GID of the portfolio to retrieve`,
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
    name: 'asana_portfolio_items_list',
    description: `Get all items (projects or portfolios) contained in a portfolio.`,
    params: [
      {
        name: 'portfolio_gid',
        type: 'string',
        required: true,
        description: `GID of the portfolio whose items to list`,
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
    name: 'asana_portfolio_membership_get',
    description: `Get a single portfolio membership record by its GID.`,
    params: [
      {
        name: 'portfolio_membership_gid',
        type: 'string',
        required: true,
        description: `GID of the portfolio membership to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_portfolio_memberships_list',
    description: `List all members of a portfolio, optionally filtered by a specific user.`,
    params: [
      {
        name: 'portfolio_gid',
        type: 'string',
        required: true,
        description: `GID of the portfolio whose memberships to list`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'user_gid',
        type: 'string',
        required: false,
        description: `GID of a user to filter memberships by`,
      },
    ],
  },
  {
    name: 'asana_portfolio_remove_item',
    description: `Remove a project from a portfolio.`,
    params: [
      {
        name: 'item_gid',
        type: 'string',
        required: true,
        description: `GID of the project to remove from the portfolio`,
      },
      {
        name: 'portfolio_gid',
        type: 'string',
        required: true,
        description: `GID of the portfolio to remove an item from`,
      },
    ],
  },
  {
    name: 'asana_portfolio_remove_members',
    description: `Remove one or more members from a portfolio by their user GIDs.`,
    params: [
      {
        name: 'members',
        type: 'string',
        required: true,
        description: `Comma-separated list of user GIDs to remove from the portfolio`,
      },
      {
        name: 'portfolio_gid',
        type: 'string',
        required: true,
        description: `GID of the portfolio to remove members from`,
      },
    ],
  },
  {
    name: 'asana_portfolio_update',
    description: `Update a portfolio's name or color.`,
    params: [
      {
        name: 'portfolio_gid',
        type: 'string',
        required: true,
        description: `GID of the portfolio to update`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `New color for the portfolio`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the portfolio` },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_portfolios_list',
    description: `Get all portfolios accessible to the authenticated user in a workspace.`,
    params: [
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to filter portfolios by`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'owner',
        type: 'string',
        required: false,
        description: `GID of a user or 'me' to filter portfolios by owner`,
      },
    ],
  },
  {
    name: 'asana_project_add_custom_field',
    description: `Add a custom field to a project. Optionally mark the field as important (displayed prominently in the project view).`,
    params: [
      {
        name: 'custom_field_gid',
        type: 'string',
        required: true,
        description: `GID of the custom field to add to the project`,
      },
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to add the custom field to`,
      },
      {
        name: 'is_important',
        type: 'boolean',
        required: false,
        description: `Whether the custom field is important and should be displayed prominently in the project view`,
      },
    ],
  },
  {
    name: 'asana_project_add_followers',
    description: `Add followers to a project by their GIDs.`,
    params: [
      {
        name: 'followers',
        type: 'string',
        required: true,
        description: `Comma-separated list of user GIDs to add as followers`,
      },
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to add followers to`,
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
    name: 'asana_project_add_members',
    description: `Add members to a project by their GIDs.`,
    params: [
      {
        name: 'members',
        type: 'string',
        required: true,
        description: `Comma-separated list of user GIDs or 'me' to add as members`,
      },
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to add members to`,
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
    name: 'asana_project_brief_create',
    description: `Create a project brief for a project. A project brief is a rich text overview that describes the project's goals and context. Provide the project GID and a title; optionally include plain text or HTML content for the brief body.`,
    params: [
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `Globally unique identifier for the project to create the brief for. e.g. 1234567890`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the project brief. e.g. 'Q3 Launch Plan'`,
      },
      {
        name: 'html_text',
        type: 'string',
        required: false,
        description: `HTML-formatted content for the project brief body. Cannot be used together with text. e.g. '<body><p>This project aims to...</p></body>'`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Plain text content for the project brief body. Cannot be used together with html_text. e.g. 'This project aims to...'`,
      },
    ],
  },
  {
    name: 'asana_project_brief_get',
    description: `Get the project brief (rich text overview) for a project by its project brief GID. Returns the title, HTML text, and related project details.`,
    params: [
      {
        name: 'project_brief_gid',
        type: 'string',
        required: true,
        description: `Globally unique identifier for the project brief to retrieve. e.g. 1234567890`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response. e.g. title,html_text,project,project.name`,
      },
    ],
  },
  {
    name: 'asana_project_brief_update',
    description: `Update an existing project brief. You can update the title, plain text body, or HTML body. Provide only the fields you want to change; omitted fields are left unchanged.`,
    params: [
      {
        name: 'project_brief_gid',
        type: 'string',
        required: true,
        description: `Globally unique identifier for the project brief to update. e.g. 1234567890`,
      },
      {
        name: 'html_text',
        type: 'string',
        required: false,
        description: `Updated HTML content for the project brief body. Cannot be used together with text. e.g. '<body><p>Updated description</p></body>'`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Updated plain text content for the project brief body. Cannot be used together with html_text.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the project brief. e.g. 'Updated Q3 Launch Plan'`,
      },
    ],
  },
  {
    name: 'asana_project_create',
    description: `Create a new project in a workspace.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the project` },
      {
        name: 'workspace_gid',
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
    name: 'asana_project_custom_field_settings_list',
    description: `List all custom field settings for a project, including which custom fields are attached and their display configuration.`,
    params: [
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to list custom field settings for`,
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
    name: 'asana_project_membership_get',
    description: `Get a specific project membership record by its GID. Returns user identity and access level details for that membership.`,
    params: [
      {
        name: 'project_membership_gid',
        type: 'string',
        required: true,
        description: `Globally unique identifier for the project membership record to retrieve. e.g. 1234567890`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response. e.g. user,user.name,access_level,project`,
      },
    ],
  },
  {
    name: 'asana_project_memberships_list',
    description: `List all members of a project. Returns membership records including user and access level details for each member of the specified project.`,
    params: [
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `Globally unique identifier for the project whose members to list. e.g. 1234567890`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response. e.g. user,user.name,access_level`,
      },
      {
        name: 'user_gid',
        type: 'string',
        required: false,
        description: `Filter results to the membership record for a specific user GID. e.g. 987654321`,
      },
    ],
  },
  {
    name: 'asana_project_remove_followers',
    description: `Remove followers from a project by their GIDs.`,
    params: [
      {
        name: 'followers',
        type: 'string',
        required: true,
        description: `Comma-separated list of user GIDs to remove as followers`,
      },
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to remove followers from`,
      },
    ],
  },
  {
    name: 'asana_project_remove_members',
    description: `Remove members from a project by their GIDs.`,
    params: [
      {
        name: 'members',
        type: 'string',
        required: true,
        description: `Comma-separated list of user GIDs to remove as members`,
      },
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to remove members from`,
      },
    ],
  },
  {
    name: 'asana_project_status_create',
    description: `Create a new status update for a project with a color-coded health indicator.`,
    params: [
      {
        name: 'color',
        type: 'string',
        required: true,
        description: `Color-coded health indicator for the status update`,
      },
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to post the status update to`,
      },
      { name: 'text', type: 'string', required: true, description: `The status update text body` },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Optional title for the status update`,
      },
    ],
  },
  {
    name: 'asana_project_status_get',
    description: `Get a specific project status update by its GID.`,
    params: [
      {
        name: 'project_status_gid',
        type: 'string',
        required: true,
        description: `GID of the project status update to retrieve`,
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
    name: 'asana_project_statuses_list',
    description: `Get all status updates posted to a project.`,
    params: [
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to retrieve status updates for`,
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
    name: 'asana_project_task_counts_get',
    description: `Get task completion counts for a project, including totals for completed and incomplete tasks.`,
    params: [
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to retrieve task counts for`,
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
    name: 'asana_project_template_get',
    description: `Get the details of a single project template by its GID.`,
    params: [
      {
        name: 'project_template_gid',
        type: 'string',
        required: true,
        description: `GID of the project template to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_project_template_instantiate',
    description: `Create a new project from a project template. Returns a Job GID — poll asana_job_get until status is complete.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the new project to create from the template`,
      },
      {
        name: 'project_template_gid',
        type: 'string',
        required: true,
        description: `GID of the project template to instantiate`,
      },
      {
        name: 'team_gid',
        type: 'string',
        required: true,
        description: `GID of the team the new project should belong to`,
      },
      {
        name: 'is_strict',
        type: 'boolean',
        required: false,
        description: `If true, the endpoint will fail if any unresolvable variables are found in the template`,
      },
    ],
  },
  {
    name: 'asana_project_templates_list',
    description: `List project templates available in a workspace or team.`,
    params: [
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
      {
        name: 'team_gid',
        type: 'string',
        required: false,
        description: `GID of a team to filter project templates by`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `GID of the workspace to list project templates from`,
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
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `GID of the workspace to list projects from`,
      },
    ],
  },
  {
    name: 'asana_projects_search',
    description: `Search for projects in a workspace by name or other criteria.`,
    params: [
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to search projects in`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Filter by archived status; true for archived, false for active, null for both`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter projects by name (partial match supported)`,
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
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to add to the section`,
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
    name: 'asana_section_tasks_list',
    description: `List all tasks in a specific section in Asana.`,
    params: [
      {
        name: 'section_gid',
        type: 'string',
        required: true,
        description: `GID of the section whose tasks to list`,
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
    name: 'asana_status_update_create',
    description: `Create a status update for a project, portfolio, or goal. This is the preferred endpoint over project_status_create as it supports the newer Asana status updates API.`,
    params: [
      {
        name: 'parent_gid',
        type: 'string',
        required: true,
        description: `GID of the parent resource (project, portfolio, or goal) to create a status update for`,
      },
      {
        name: 'status_type',
        type: 'string',
        required: true,
        description: `The type of status for this update`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `The body text of the status update`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The title of the status update`,
      },
    ],
  },
  {
    name: 'asana_status_update_delete',
    description: `Permanently delete a status update.`,
    params: [
      {
        name: 'status_update_gid',
        type: 'string',
        required: true,
        description: `The GID of the status update to delete`,
      },
    ],
  },
  {
    name: 'asana_status_update_get',
    description: `Get a status update by its GID.`,
    params: [
      {
        name: 'status_update_gid',
        type: 'string',
        required: true,
        description: `The GID of the status update to retrieve`,
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
    name: 'asana_status_updates_list',
    description: `List status updates for a parent resource such as a project, portfolio, or goal.`,
    params: [
      {
        name: 'parent_gid',
        type: 'string',
        required: true,
        description: `GID of the parent resource (project, portfolio, or goal) to list status updates for`,
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
    name: 'asana_story_delete',
    description: `Delete a story (comment) in Asana. This action is irreversible.`,
    params: [
      {
        name: 'story_gid',
        type: 'string',
        required: true,
        description: `GID of the story to delete`,
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
    name: 'asana_story_update',
    description: `Update a story (comment) in Asana. Can edit the text of comments.`,
    params: [
      {
        name: 'story_gid',
        type: 'string',
        required: true,
        description: `GID of the story to update`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `Updated text content of the comment`,
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
        name: 'workspace_gid',
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
    name: 'asana_tag_tasks_list',
    description: `List all tasks that have a specific tag in Asana.`,
    params: [
      {
        name: 'tag_gid',
        type: 'string',
        required: true,
        description: `GID of the tag whose tasks to list`,
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
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `GID of the workspace to list tags from`,
      },
    ],
  },
  {
    name: 'asana_task_add_dependencies',
    description: `Add dependencies to a task. Dependencies are tasks that must be completed before this task can start.`,
    params: [
      {
        name: 'dependencies',
        type: 'string',
        required: true,
        description: `Comma-separated GIDs of tasks this task depends on`,
      },
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to add dependencies to`,
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
    name: 'asana_task_add_dependents',
    description: `Add dependent tasks to a task in Asana. Dependents are tasks that depend on this task being completed first.`,
    params: [
      {
        name: 'dependents',
        type: 'string',
        required: true,
        description: `Comma-separated list of task GIDs that depend on this task`,
      },
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to add dependents to`,
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
        name: 'workspace_gid',
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
    name: 'asana_task_dependencies_list',
    description: `Get the list of tasks that a given task depends on.`,
    params: [
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to retrieve dependencies for`,
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
    name: 'asana_task_dependents_list',
    description: `Get the list of tasks that depend on a given task (tasks blocked by this task).`,
    params: [
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to retrieve dependents for`,
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
    name: 'asana_task_get_by_custom_id',
    description: `Look up a task by its custom external ID within a given workspace.`,
    params: [
      {
        name: 'custom_id',
        type: 'string',
        required: true,
        description: `The custom external ID of the task to look up`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to search within`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_task_remove_dependencies',
    description: `Remove dependencies from a task.`,
    params: [
      {
        name: 'dependencies',
        type: 'string',
        required: true,
        description: `Comma-separated GIDs of dependency tasks to remove`,
      },
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to remove dependencies from`,
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
    name: 'asana_task_remove_dependents',
    description: `Remove one or more dependent tasks from a task. Dependents are tasks that depend on this task (i.e., this task blocks them). Provide a comma-separated list of dependent task GIDs to unlink.`,
    params: [
      {
        name: 'dependents',
        type: 'string',
        required: true,
        description: `Comma-separated list of task GIDs to remove as dependents of this task. e.g. '111111,222222,333333'`,
      },
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `Globally unique identifier for the task from which to remove dependents. e.g. 1234567890`,
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
    name: 'asana_task_search',
    description: `Search for tasks in a workspace using text and filter criteria.`,
    params: [
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to search tasks in`,
      },
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `Filter tasks by assignee GID or 'me'`,
      },
      {
        name: 'completed',
        type: 'boolean',
        required: false,
        description: `Filter by task completion status. True returns only completed tasks, false returns only incomplete tasks.`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Text to search for in task names and descriptions`,
      },
    ],
  },
  {
    name: 'asana_task_set_parent',
    description: `Set or change the parent task of a task.`,
    params: [
      {
        name: 'parent',
        type: 'string',
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
    name: 'asana_task_template_get',
    description: `Get the details of a single task template by its GID.`,
    params: [
      {
        name: 'task_template_gid',
        type: 'string',
        required: true,
        description: `GID of the task template to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_task_template_instantiate',
    description: `Create a new task from a task template. Optionally assign the new task to one or more projects.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the new task to create from the template`,
      },
      {
        name: 'task_template_gid',
        type: 'string',
        required: true,
        description: `GID of the task template to instantiate`,
      },
      {
        name: 'projects',
        type: 'string',
        required: false,
        description: `Comma-separated list of project GIDs to add the new task to`,
      },
    ],
  },
  {
    name: 'asana_task_templates_list',
    description: `List task templates for a project.`,
    params: [
      {
        name: 'project_gid',
        type: 'string',
        required: true,
        description: `GID of the project to filter task templates by`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_task_time_tracking_entries_list',
    description: `List all time tracking entries logged on a specific task.`,
    params: [
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task whose time tracking entries to list`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_task_time_tracking_entry_create',
    description: `Log a new time tracking entry on a task.`,
    params: [
      {
        name: 'duration_minutes',
        type: 'integer',
        required: true,
        description: `Duration of the time entry in minutes`,
      },
      {
        name: 'entered_on',
        type: 'string',
        required: true,
        description: `Date the time was entered, in ISO 8601 format (YYYY-MM-DD)`,
      },
      {
        name: 'task_gid',
        type: 'string',
        required: true,
        description: `GID of the task to log time on`,
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
        type: 'string',
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
    description: `List tasks filtered by project, section, assignee, or workspace. At least one of project, section, assignee, or workspace_gid is required by the Asana API.`,
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
        name: 'workspace_gid',
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
    name: 'asana_team_create',
    description: `Create a new team in an organization.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the new team` },
      {
        name: 'organization_gid',
        type: 'string',
        required: true,
        description: `GID of the organization in which to create the team`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the team`,
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
    name: 'asana_team_membership_get',
    description: `Get a single team membership record by its GID.`,
    params: [
      {
        name: 'team_membership_gid',
        type: 'string',
        required: true,
        description: `GID of the team membership to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_team_memberships_list',
    description: `List team memberships, optionally filtered by team, user, or workspace.`,
    params: [
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
      {
        name: 'team_gid',
        type: 'string',
        required: false,
        description: `GID of the team to filter memberships by`,
      },
      {
        name: 'user_gid',
        type: 'string',
        required: false,
        description: `GID of the user to filter memberships by`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `GID of the workspace to filter memberships by`,
      },
    ],
  },
  {
    name: 'asana_team_projects_list',
    description: `List all projects for a given team.`,
    params: [
      {
        name: 'team_gid',
        type: 'string',
        required: true,
        description: `GID of the team whose projects to list`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Filter by archived status; true for archived, false for active, null for both`,
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
    name: 'asana_team_team_memberships_list',
    description: `List all memberships for a specific team.`,
    params: [
      {
        name: 'team_gid',
        type: 'string',
        required: true,
        description: `GID of the team whose memberships to list`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_team_update',
    description: `Update a team's name or description.`,
    params: [
      {
        name: 'team_gid',
        type: 'string',
        required: true,
        description: `GID of the team to update`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the team`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the team` },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
    ],
  },
  {
    name: 'asana_time_tracking_categories_list',
    description: `List all time tracking categories available in a given workspace.`,
    params: [
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace whose time tracking categories to list`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_time_tracking_category_get',
    description: `Get a single time tracking category by its GID.`,
    params: [
      {
        name: 'time_tracking_category_gid',
        type: 'string',
        required: true,
        description: `GID of the time tracking category to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_time_tracking_entries_list',
    description: `List time tracking entries across a workspace, optionally filtered by user.`,
    params: [
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
      {
        name: 'user_gid',
        type: 'string',
        required: false,
        description: `GID of the user to filter time tracking entries by`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `GID of the workspace to list time tracking entries from`,
      },
    ],
  },
  {
    name: 'asana_time_tracking_entry_delete',
    description: `Permanently delete a time tracking entry.`,
    params: [
      {
        name: 'time_tracking_entry_gid',
        type: 'string',
        required: true,
        description: `GID of the time tracking entry to delete`,
      },
    ],
  },
  {
    name: 'asana_time_tracking_entry_get',
    description: `Get a single time tracking entry by its GID.`,
    params: [
      {
        name: 'time_tracking_entry_gid',
        type: 'string',
        required: true,
        description: `GID of the time tracking entry to retrieve`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
    ],
  },
  {
    name: 'asana_time_tracking_entry_update',
    description: `Update an existing time tracking entry's duration or date.`,
    params: [
      {
        name: 'time_tracking_entry_gid',
        type: 'string',
        required: true,
        description: `GID of the time tracking entry to update`,
      },
      {
        name: 'duration_minutes',
        type: 'integer',
        required: false,
        description: `Updated duration of the time entry in minutes`,
      },
      {
        name: 'entered_on',
        type: 'string',
        required: false,
        description: `Updated date the time was entered, in ISO 8601 format (YYYY-MM-DD)`,
      },
    ],
  },
  {
    name: 'asana_typeahead_search',
    description: `Search for objects in a workspace by name prefix. Returns users, projects, tags, tasks, and portfolios matching the query. Useful for autocomplete and ID lookup.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Name prefix to search for` },
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to search within`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (1-20)`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'resource_type',
        type: 'string',
        required: false,
        description: `Type of resource to filter results by`,
      },
    ],
  },
  {
    name: 'asana_user_favorites_list',
    description: `List a user's favorited objects in a workspace in Asana. Optionally filter by resource type.`,
    params: [
      {
        name: 'resource_type',
        type: 'string',
        required: true,
        description: `Filter favorites by resource type`,
      },
      {
        name: 'user_gid',
        type: 'string',
        required: true,
        description: `GID of the user whose favorites to list`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to scope the favorites`,
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
    name: 'asana_user_task_list_for_user_get',
    description: `Get the personal task list for a user in a workspace in Asana.`,
    params: [
      {
        name: 'user_gid',
        type: 'string',
        required: true,
        description: `GID of the user whose task list to retrieve`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to scope the request`,
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
    name: 'asana_user_task_list_get',
    description: `Get a user task list by its GID in Asana.`,
    params: [
      {
        name: 'user_task_list_gid',
        type: 'string',
        required: true,
        description: `GID of the user task list to retrieve`,
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
    name: 'asana_user_team_memberships_list',
    description: `List all team memberships for a specific user.`,
    params: [
      {
        name: 'user_gid',
        type: 'string',
        required: true,
        description: `GID of the user whose team memberships to list`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: false,
        description: `GID of the workspace to filter memberships by`,
      },
    ],
  },
  {
    name: 'asana_user_teams_list',
    description: `List all teams a user belongs to.`,
    params: [
      {
        name: 'user_gid',
        type: 'string',
        required: true,
        description: `GID of the user whose teams to list, or 'me' for the current user`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in response`,
      },
      {
        name: 'organization_gid',
        type: 'string',
        required: false,
        description: `GID of the organization to filter teams by`,
      },
    ],
  },
  {
    name: 'asana_user_workspace_memberships_list',
    description: `List all workspace memberships for a specific user. Returns membership records showing which workspaces the user belongs to and their role in each.`,
    params: [
      {
        name: 'user_gid',
        type: 'string',
        required: true,
        description: `Globally unique identifier for the user whose workspace memberships to list. e.g. 987654321`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response. e.g. workspace,workspace.name,is_active`,
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
    name: 'asana_webhook_create',
    description: `Create a webhook to receive event notifications for a resource.`,
    params: [
      {
        name: 'resource_gid',
        type: 'string',
        required: true,
        description: `GID of the resource to watch for events`,
      },
      {
        name: 'target_url',
        type: 'string',
        required: true,
        description: `HTTPS URL that will receive event notifications`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Array of filter objects to narrow which events trigger the webhook`,
      },
    ],
  },
  {
    name: 'asana_webhook_delete',
    description: `Permanently delete a webhook. The webhook will no longer receive event notifications.`,
    params: [
      {
        name: 'webhook_gid',
        type: 'string',
        required: true,
        description: `The GID of the webhook to delete`,
      },
    ],
  },
  {
    name: 'asana_webhook_get',
    description: `Get a webhook by its GID.`,
    params: [
      {
        name: 'webhook_gid',
        type: 'string',
        required: true,
        description: `The GID of the webhook to retrieve`,
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
    name: 'asana_webhook_update',
    description: `Update the filters on an existing webhook.`,
    params: [
      {
        name: 'webhook_gid',
        type: 'string',
        required: true,
        description: `The GID of the webhook to update`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Array of filter objects to replace the webhook's existing filters`,
      },
    ],
  },
  {
    name: 'asana_webhooks_list',
    description: `List all webhooks for a workspace.`,
    params: [
      {
        name: 'workspace_gid',
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
    name: 'asana_workspace_add_user',
    description: `Add a user to a workspace or organization in Asana.`,
    params: [
      {
        name: 'user_gid',
        type: 'string',
        required: true,
        description: `GID or email of the user to add to the workspace`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to add the user to`,
      },
    ],
  },
  {
    name: 'asana_workspace_custom_fields_list',
    description: `List all custom fields in a workspace.`,
    params: [
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to list custom fields for`,
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
    name: 'asana_workspace_membership_get',
    description: `Get a specific workspace membership record by its GID. Returns user identity and workspace-level role details for that membership.`,
    params: [
      {
        name: 'workspace_membership_gid',
        type: 'string',
        required: true,
        description: `Globally unique identifier for the workspace membership record to retrieve. e.g. 1234567890`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response. e.g. user,user.name,workspace,is_active`,
      },
    ],
  },
  {
    name: 'asana_workspace_memberships_list',
    description: `List all members of a workspace. Returns membership records for all users in the specified workspace including their roles and status.`,
    params: [
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `Globally unique identifier for the workspace whose members to list. e.g. 1234567890`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response. e.g. user,user.name,is_active`,
      },
    ],
  },
  {
    name: 'asana_workspace_remove_user',
    description: `Remove a user from a workspace or organization in Asana.`,
    params: [
      {
        name: 'user_gid',
        type: 'string',
        required: true,
        description: `GID of the user to remove from the workspace`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `GID of the workspace to remove the user from`,
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
    name: 'asana_workspace_user_get',
    description: `Get a user's workspace-level membership details. Returns the user's profile and role information within the specified workspace.`,
    params: [
      {
        name: 'user_gid',
        type: 'string',
        required: true,
        description: `Globally unique identifier for the user to look up in the workspace. e.g. 987654321`,
      },
      {
        name: 'workspace_gid',
        type: 'string',
        required: true,
        description: `Globally unique identifier for the workspace. e.g. 1234567890`,
      },
      {
        name: 'opt_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of optional fields to include in the response. e.g. name,email,workspaces`,
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
