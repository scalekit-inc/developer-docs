import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'linear_attachment_create',
    description: `Create an external link attachment on a Linear issue.`,
    params: [
      { name: 'issueId', type: 'string', required: true, description: `ID of the issue to attach the link to` },
      { name: 'title', type: 'string', required: true, description: `Attachment title` },
      { name: 'url', type: 'string', required: true, description: `URL of the attachment` },
      { name: 'subtitle', type: 'string', required: false, description: `Subtitle or description for the attachment` },
    ],
  },
  {
    name: 'linear_attachment_delete',
    description: `Delete an attachment from a Linear issue.`,
    params: [
      { name: 'attachmentId', type: 'string', required: true, description: `ID of the attachment to delete` },
    ],
  },
  {
    name: 'linear_attachment_update',
    description: `Update the title or subtitle of an existing attachment on a Linear issue.`,
    params: [
      { name: 'attachmentId', type: 'string', required: true, description: `ID of the attachment to update` },
      { name: 'title', type: 'string', required: true, description: `New title for the attachment` },
      { name: 'subtitle', type: 'string', required: false, description: `New subtitle or description` },
    ],
  },
  {
    name: 'linear_comment_create',
    description: `Create a comment on a Linear issue.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `Comment text` },
      { name: 'issueId', type: 'string', required: true, description: `ID of the issue to comment on` },
    ],
  },
  {
    name: 'linear_comment_delete',
    description: `Permanently delete a comment from a Linear issue.`,
    params: [
      { name: 'commentId', type: 'string', required: true, description: `ID of the comment to delete` },
    ],
  },
  {
    name: 'linear_comment_get',
    description: `Retrieve a single comment by its ID.`,
    params: [
      { name: 'commentId', type: 'string', required: true, description: `ID of the comment to retrieve` },
    ],
  },
  {
    name: 'linear_comment_update',
    description: `Update the text body of an existing Linear comment.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `Updated comment text` },
      { name: 'commentId', type: 'string', required: true, description: `ID of the comment to update` },
    ],
  },
  {
    name: 'linear_comments_list',
    description: `List all comments on a specific Linear issue with pagination support.`,
    params: [
      { name: 'issueId', type: 'string', required: true, description: `ID of the issue to list comments for` },
      { name: 'after', type: 'string', required: false, description: `Pagination cursor for fetching the next page` },
      { name: 'first', type: 'integer', required: false, description: `Number of comments to return` },
    ],
  },
  {
    name: 'linear_cycle_create',
    description: `Create a new cycle (sprint) for a Linear team. Requires a team ID, start date, and end date.`,
    params: [
      { name: 'endsAt', type: 'string', required: true, description: `Cycle end date-time in ISO 8601 format` },
      { name: 'startsAt', type: 'string', required: true, description: `Cycle start date-time in ISO 8601 format` },
      { name: 'teamId', type: 'string', required: true, description: `ID of the team to create the cycle in` },
      { name: 'description', type: 'string', required: false, description: `Optional description of the cycle` },
      { name: 'name', type: 'string', required: false, description: `Optional custom name for the cycle` },
    ],
  },
  {
    name: 'linear_cycle_get',
    description: `Get a specific Linear cycle by ID, including its issues.`,
    params: [
      { name: 'cycleId', type: 'string', required: true, description: `ID of the cycle to retrieve` },
    ],
  },
  {
    name: 'linear_cycle_issues_list',
    description: `List all issues in a specific Linear cycle with pagination support.`,
    params: [
      { name: 'cycleId', type: 'string', required: true, description: `ID of the cycle to list issues for` },
      { name: 'after', type: 'string', required: false, description: `Pagination cursor for fetching the next page` },
      { name: 'first', type: 'integer', required: false, description: `Number of issues to return` },
    ],
  },
  {
    name: 'linear_cycle_update',
    description: `Update an existing cycle (sprint) in Linear.`,
    params: [
      { name: 'cycleId', type: 'string', required: true, description: `ID of the cycle to update` },
      { name: 'description', type: 'string', required: false, description: `New description for the cycle` },
      { name: 'endsAt', type: 'string', required: false, description: `New end date-time in ISO 8601 format` },
      { name: 'name', type: 'string', required: false, description: `New name for the cycle` },
      { name: 'startsAt', type: 'string', required: false, description: `New start date-time in ISO 8601 format` },
    ],
  },
  {
    name: 'linear_cycles_list',
    description: `List cycles (sprints) for a Linear team with pagination support.`,
    params: [
      { name: 'teamId', type: 'string', required: true, description: `Team ID to list cycles for` },
      { name: 'after', type: 'string', required: false, description: `Pagination cursor for fetching the next page` },
      { name: 'first', type: 'integer', required: false, description: `Number of cycles to return` },
    ],
  },
  {
    name: 'linear_graphql_query',
    description: `Execute a custom GraphQL query or mutation against the Linear API. Allows running any valid GraphQL operation with variables support for advanced use cases.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `The GraphQL query or mutation to execute` },
      { name: 'variables', type: 'object', required: false, description: `Variables to pass to the GraphQL query` },
    ],
  },
  {
    name: 'linear_issue_archive',
    description: `Archive a Linear issue by ID using the issueArchive mutation.`,
    params: [
      { name: 'issueId', type: 'string', required: true, description: `ID of the issue to archive` },
    ],
  },
  {
    name: 'linear_issue_create',
    description: `Create a new issue in Linear using the issueCreate mutation. Requires a team ID and title at minimum.`,
    params: [
      { name: 'teamId', type: 'string', required: true, description: `ID of the team to create the issue in` },
      { name: 'title', type: 'string', required: true, description: `Title of the issue` },
      { name: 'assigneeId', type: 'string', required: false, description: `ID of the user to assign the issue to` },
      { name: 'description', type: 'string', required: false, description: `Description of the issue` },
      { name: 'estimate', type: 'string', required: false, description: `Story point estimate for the issue` },
      { name: 'labelIds', type: 'array', required: false, description: `Array of label IDs to apply to the issue` },
      { name: 'priority', type: 'string', required: false, description: `Priority level of the issue (1-4, where 1 is urgent)` },
      { name: 'projectId', type: 'string', required: false, description: `ID of the project to associate the issue with` },
      { name: 'stateId', type: 'string', required: false, description: `ID of the workflow state to set` },
    ],
  },
  {
    name: 'linear_issue_delete',
    description: `Permanently delete a Linear issue by ID using the issueDelete mutation.`,
    params: [
      { name: 'issueId', type: 'string', required: true, description: `ID of the issue to delete` },
    ],
  },
  {
    name: 'linear_issue_get',
    description: `Get a single Linear issue by ID, including its state, assignee, team, labels, and project details.`,
    params: [
      { name: 'issueId', type: 'string', required: true, description: `ID of the issue to retrieve` },
    ],
  },
  {
    name: 'linear_issue_relation_create',
    description: `Create a relation between two issues. Valid types: blocks, duplicate, related, similar.`,
    params: [
      { name: 'issueId', type: 'string', required: true, description: `ID of the issue` },
      { name: 'relatedIssueId', type: 'string', required: true, description: `ID of the related issue` },
      { name: 'type', type: 'string', required: true, description: `Relation type: blocks, duplicate, related, or similar` },
    ],
  },
  {
    name: 'linear_issue_relation_delete',
    description: `Delete an issue relation by its ID.`,
    params: [
      { name: 'relationId', type: 'string', required: true, description: `ID of the issue relation to delete` },
    ],
  },
  {
    name: 'linear_issue_relations_list',
    description: `List all relations for a specific issue (blocks, duplicates, related, similar).`,
    params: [
      { name: 'issueId', type: 'string', required: true, description: `ID of the issue to get relations for` },
    ],
  },
  {
    name: 'linear_issue_search',
    description: `Full-text search for issues across the workspace by query string.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Text to search for across issue titles and descriptions` },
      { name: 'first', type: 'integer', required: false, description: `Number of results to return (max 250)` },
      { name: 'teamId', type: 'string', required: false, description: `Restrict search to a specific team ID` },
    ],
  },
  {
    name: 'linear_issue_unarchive',
    description: `Restore an archived issue back to active status.`,
    params: [
      { name: 'issueId', type: 'string', required: true, description: `ID of the archived issue to restore` },
    ],
  },
  {
    name: 'linear_issue_update',
    description: `Update an existing issue in Linear. You can update title, description, priority, state, and assignee.`,
    params: [
      { name: 'issueId', type: 'string', required: true, description: `ID of the issue to update` },
      { name: 'assigneeId', type: 'string', required: false, description: `ID of the user to assign the issue to` },
      { name: 'description', type: 'string', required: false, description: `New description for the issue` },
      { name: 'priority', type: 'string', required: false, description: `Priority level of the issue (1-4, where 1 is urgent)` },
      { name: 'stateId', type: 'string', required: false, description: `ID of the workflow state to set` },
      { name: 'title', type: 'string', required: false, description: `New title for the issue` },
    ],
  },
  {
    name: 'linear_issues_list',
    description: `List issues in Linear using the issues query with simple filtering and pagination support.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Cursor for pagination (returns issues after this cursor)` },
      { name: 'assignee', type: 'string', required: false, description: `Filter by assignee email (e.g., 'user@example.com')` },
      { name: 'before', type: 'string', required: false, description: `Cursor for pagination (returns issues before this cursor)` },
      { name: 'first', type: 'integer', required: false, description: `Number of issues to return (pagination)` },
      { name: 'labels', type: 'array', required: false, description: `Filter by label names (array of strings)` },
      { name: 'priority', type: 'string', required: false, description: `Filter by priority level (1=Urgent, 2=High, 3=Medium, 4=Low)` },
      { name: 'project', type: 'string', required: false, description: `Filter by project name (e.g., 'Q4 Goals')` },
      { name: 'state', type: 'string', required: false, description: `Filter by state name (e.g., 'In Progress', 'Done')` },
    ],
  },
  {
    name: 'linear_label_create',
    description: `Create a new issue label in a Linear team.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Label name` },
      { name: 'teamId', type: 'string', required: true, description: `Team ID to create the label in` },
      { name: 'color', type: 'string', required: false, description: `Label color as hex code` },
      { name: 'description', type: 'string', required: false, description: `Label description` },
    ],
  },
  {
    name: 'linear_labels_list',
    description: `List issue labels in the Linear workspace, optionally filtered by team.`,
    params: [
      { name: 'first', type: 'integer', required: false, description: `Number of labels to return` },
      { name: 'teamId', type: 'string', required: false, description: `Filter labels by team ID` },
    ],
  },
  {
    name: 'linear_project_create',
    description: `Create a new project in Linear with optional description, state, and date fields.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the project` },
      { name: 'teamIds', type: 'array', required: true, description: `Array of team IDs to associate with the project` },
      { name: 'description', type: 'string', required: false, description: `Description of the project` },
      { name: 'startDate', type: 'string', required: false, description: `Start date in YYYY-MM-DD format` },
      { name: 'state', type: 'string', required: false, description: `Project state: planned, started, paused, completed, cancelled` },
      { name: 'targetDate', type: 'string', required: false, description: `Target date in YYYY-MM-DD format` },
    ],
  },
  {
    name: 'linear_project_get',
    description: `Get a single Linear project by ID, including teams, members, and associated issues.`,
    params: [
      { name: 'projectId', type: 'string', required: true, description: `ID of the project to retrieve` },
    ],
  },
  {
    name: 'linear_project_milestone_create',
    description: `Create a new milestone for a project.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the milestone` },
      { name: 'projectId', type: 'string', required: true, description: `ID of the project to add the milestone to` },
      { name: 'description', type: 'string', required: false, description: `Description of the milestone` },
      { name: 'targetDate', type: 'string', required: false, description: `Target completion date (YYYY-MM-DD)` },
    ],
  },
  {
    name: 'linear_project_milestone_delete',
    description: `Delete a project milestone by its ID.`,
    params: [
      { name: 'milestoneId', type: 'string', required: true, description: `ID of the milestone to delete` },
    ],
  },
  {
    name: 'linear_project_milestone_update',
    description: `Update an existing project milestone.`,
    params: [
      { name: 'milestoneId', type: 'string', required: true, description: `ID of the milestone to update` },
      { name: 'description', type: 'string', required: false, description: `New description` },
      { name: 'name', type: 'string', required: false, description: `New name for the milestone` },
      { name: 'targetDate', type: 'string', required: false, description: `New target date (YYYY-MM-DD)` },
    ],
  },
  {
    name: 'linear_project_milestones_list',
    description: `List milestones for a specific project.`,
    params: [
      { name: 'projectId', type: 'string', required: true, description: `ID of the project to list milestones for` },
      { name: 'first', type: 'integer', required: false, description: `Number of milestones to return` },
    ],
  },
  {
    name: 'linear_project_update',
    description: `Update an existing Linear project's name, description, state, or dates.`,
    params: [
      { name: 'projectId', type: 'string', required: true, description: `ID of the project to update` },
      { name: 'description', type: 'string', required: false, description: `Updated description of the project` },
      { name: 'name', type: 'string', required: false, description: `Updated name of the project` },
      { name: 'startDate', type: 'string', required: false, description: `Updated start date in YYYY-MM-DD format` },
      { name: 'state', type: 'string', required: false, description: `Updated project state: planned, started, paused, completed, cancelled` },
      { name: 'targetDate', type: 'string', required: false, description: `Updated target date in YYYY-MM-DD format` },
    ],
  },
  {
    name: 'linear_projects_list',
    description: `List all projects in the Linear workspace with pagination support.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination cursor for fetching the next page` },
      { name: 'first', type: 'integer', required: false, description: `Number of projects to return` },
    ],
  },
  {
    name: 'linear_roadmaps_list',
    description: `List all roadmaps in the Linear workspace with pagination support.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination cursor for fetching the next page` },
      { name: 'first', type: 'integer', required: false, description: `Number of roadmaps to return` },
    ],
  },
  {
    name: 'linear_team_create',
    description: `Create a new team in the Linear workspace.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the team` },
      { name: 'color', type: 'string', required: false, description: `Team color as hex code` },
      { name: 'description', type: 'string', required: false, description: `Description of the team` },
      { name: 'key', type: 'string', required: false, description: `Short identifier key for the team (e.g. PLAT)` },
      { name: 'private', type: 'boolean', required: false, description: `Whether the team is private` },
    ],
  },
  {
    name: 'linear_team_get',
    description: `Get a single Linear team by ID, including its members and workflow states.`,
    params: [
      { name: 'teamId', type: 'string', required: true, description: `ID of the team to retrieve` },
    ],
  },
  {
    name: 'linear_team_update',
    description: `Update an existing team's name, description, or settings.`,
    params: [
      { name: 'teamId', type: 'string', required: true, description: `ID of the team to update` },
      { name: 'color', type: 'string', required: false, description: `New team color as hex code` },
      { name: 'description', type: 'string', required: false, description: `New description for the team` },
      { name: 'name', type: 'string', required: false, description: `New name for the team` },
    ],
  },
  {
    name: 'linear_teams_list',
    description: `List all teams in the Linear workspace with their members and pagination support.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination cursor for fetching the next page` },
      { name: 'first', type: 'integer', required: false, description: `Number of teams to return` },
    ],
  },
  {
    name: 'linear_test_list',
    description: `List issues in Linear using the issues query with simple filtering and pagination support.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Cursor for pagination (returns issues after this cursor)` },
      { name: 'assignee', type: 'string', required: false, description: `Filter by assignee email (e.g., 'user@example.com')` },
      { name: 'before', type: 'string', required: false, description: `Cursor for pagination (returns issues before this cursor)` },
      { name: 'first', type: 'integer', required: false, description: `Number of issues to return (pagination)` },
      { name: 'labels', type: 'array', required: false, description: `Filter by label names (array of strings)` },
      { name: 'priority', type: 'string', required: false, description: `Filter by priority level (1=Urgent, 2=High, 3=Medium, 4=Low)` },
      { name: 'project', type: 'string', required: false, description: `Filter by project name (e.g., 'Q4 Goals')` },
      { name: 'state', type: 'string', required: false, description: `Filter by state name (e.g., 'In Progress', 'Done')` },
    ],
  },
  {
    name: 'linear_user_get',
    description: `Retrieve a single Linear user by their ID.`,
    params: [
      { name: 'userId', type: 'string', required: true, description: `ID of the user to retrieve` },
    ],
  },
  {
    name: 'linear_users_list',
    description: `List all users in the Linear workspace with pagination support.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination cursor for fetching the next page` },
      { name: 'first', type: 'integer', required: false, description: `Number of users to return` },
    ],
  },
  {
    name: 'linear_viewer_get',
    description: `Get the currently authenticated Linear user (viewer), including their teams.`,
    params: [
    ],
  },
  {
    name: 'linear_webhook_create',
    description: `Create a new webhook for Linear events. Specify the URL and the resource types to subscribe to.`,
    params: [
      { name: 'resourceTypes', type: 'array', required: true, description: `List of resource types to subscribe to (e.g. Issue, Comment, Project)` },
      { name: 'url', type: 'string', required: true, description: `The URL to receive webhook payloads` },
      { name: 'enabled', type: 'boolean', required: false, description: `Whether the webhook is active (default: true)` },
      { name: 'label', type: 'string', required: false, description: `Human-readable label for the webhook` },
      { name: 'secret', type: 'string', required: false, description: `Secret token to sign the webhook payload` },
      { name: 'teamId', type: 'string', required: false, description: `Restrict webhook to a specific team ID` },
    ],
  },
  {
    name: 'linear_webhook_delete',
    description: `Delete a webhook by its ID.`,
    params: [
      { name: 'webhookId', type: 'string', required: true, description: `ID of the webhook to delete` },
    ],
  },
  {
    name: 'linear_webhook_get',
    description: `Retrieve a single webhook by its ID.`,
    params: [
      { name: 'webhookId', type: 'string', required: true, description: `ID of the webhook` },
    ],
  },
  {
    name: 'linear_webhook_update',
    description: `Update an existing webhook's URL, resource types, label, or enabled status.`,
    params: [
      { name: 'webhookId', type: 'string', required: true, description: `ID of the webhook to update` },
      { name: 'enabled', type: 'boolean', required: false, description: `Enable or disable the webhook` },
      { name: 'label', type: 'string', required: false, description: `New label for the webhook` },
      { name: 'resourceTypes', type: 'array', required: false, description: `Updated list of resource types to subscribe to` },
      { name: 'secret', type: 'string', required: false, description: `New secret token for signing payloads` },
      { name: 'url', type: 'string', required: false, description: `New URL to receive webhook payloads` },
    ],
  },
  {
    name: 'linear_webhooks_list',
    description: `List all webhooks configured for the current workspace.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination cursor` },
      { name: 'first', type: 'integer', required: false, description: `Number of webhooks to return` },
    ],
  },
  {
    name: 'linear_workflow_state_create',
    description: `Create a new workflow state for a Linear team. Valid types: backlog, unstarted, started, completed, canceled.`,
    params: [
      { name: 'color', type: 'string', required: true, description: `Color of the state as a hex code` },
      { name: 'name', type: 'string', required: true, description: `Name of the workflow state` },
      { name: 'teamId', type: 'string', required: true, description: `ID of the team to create the state in` },
      { name: 'type', type: 'string', required: true, description: `State type: backlog, unstarted, started, completed, or canceled` },
      { name: 'description', type: 'string', required: false, description: `Optional description of the state` },
      { name: 'position', type: 'number', required: false, description: `Position of the state in the workflow` },
    ],
  },
  {
    name: 'linear_workflow_state_get',
    description: `Retrieve a single workflow state by its ID.`,
    params: [
      { name: 'stateId', type: 'string', required: true, description: `ID of the workflow state` },
    ],
  },
  {
    name: 'linear_workflow_state_update',
    description: `Update an existing workflow state in Linear.`,
    params: [
      { name: 'stateId', type: 'string', required: true, description: `ID of the workflow state to update` },
      { name: 'color', type: 'string', required: false, description: `New color as hex code` },
      { name: 'description', type: 'string', required: false, description: `New description for the state` },
      { name: 'name', type: 'string', required: false, description: `New name for the state` },
    ],
  },
  {
    name: 'linear_workflow_states_list',
    description: `List workflow states in the Linear workspace, optionally filtered by team.`,
    params: [
      { name: 'first', type: 'integer', required: false, description: `Number of workflow states to return` },
      { name: 'teamId', type: 'string', required: false, description: `Filter by team ID` },
    ],
  },
]
