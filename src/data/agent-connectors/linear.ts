import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'linear_graphql_query',
    description: `Execute a custom GraphQL query or mutation against the Linear API. Allows running any valid GraphQL operation with variables support for advanced use cases.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The GraphQL query or mutation to execute`,
      },
      {
        name: 'variables',
        type: 'object',
        required: false,
        description: `Variables to pass to the GraphQL query`,
      },
    ],
  },
  {
    name: 'linear_issue_create',
    description: `Create a new issue in Linear using the issueCreate mutation. Requires a team ID and title at minimum.`,
    params: [
      {
        name: 'assigneeId',
        type: 'string',
        required: false,
        description: `ID of the user to assign the issue to`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the issue`,
      },
      {
        name: 'estimate',
        type: 'string',
        required: false,
        description: `Story point estimate for the issue`,
      },
      {
        name: 'labelIds',
        type: 'array',
        required: false,
        description: `Array of label IDs to apply to the issue`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Priority level of the issue (1-4, where 1 is urgent)`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `ID of the project to associate the issue with`,
      },
      {
        name: 'stateId',
        type: 'string',
        required: false,
        description: `ID of the workflow state to set`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `ID of the team to create the issue in`,
      },
      { name: 'title', type: 'string', required: true, description: `Title of the issue` },
    ],
  },
  {
    name: 'linear_issue_update',
    description: `Update an existing issue in Linear. You can update title, description, priority, state, and assignee.`,
    params: [
      {
        name: 'assigneeId',
        type: 'string',
        required: false,
        description: `ID of the user to assign the issue to`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the issue`,
      },
      { name: 'issueId', type: 'string', required: true, description: `ID of the issue to update` },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Priority level of the issue (1-4, where 1 is urgent)`,
      },
      {
        name: 'stateId',
        type: 'string',
        required: false,
        description: `ID of the workflow state to set`,
      },
      { name: 'title', type: 'string', required: false, description: `New title for the issue` },
    ],
  },
  {
    name: 'linear_issues_list',
    description: `List issues in Linear using the issues query with simple filtering and pagination support.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for pagination (returns issues after this cursor)`,
      },
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `Filter by assignee email (e.g., 'user@example.com')`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for pagination (returns issues before this cursor)`,
      },
      {
        name: 'first',
        type: 'integer',
        required: false,
        description: `Number of issues to return (pagination)`,
      },
      {
        name: 'labels',
        type: 'array',
        required: false,
        description: `Filter by label names (array of strings)`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Filter by priority level (1=Urgent, 2=High, 3=Medium, 4=Low)`,
      },
      {
        name: 'project',
        type: 'string',
        required: false,
        description: `Filter by project name (e.g., 'Q4 Goals')`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filter by state name (e.g., 'In Progress', 'Done')`,
      },
    ],
  },
]
