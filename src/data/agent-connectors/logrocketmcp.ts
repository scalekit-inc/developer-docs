import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'logrocketmcp_list_organizations',
    description: `List all LogRocket organizations the authenticated user has access to. Use this first to discover available organizations before querying projects or sessions.`,
    params: [],
  },
  {
    name: 'logrocketmcp_list_projects',
    description: `List all projects within a LogRocket organization. Use this to identify accessible projects before querying sessions, metrics, or issues.`,
    params: [
      {
        name: 'organizationSlug',
        type: 'string',
        required: true,
        description: `The slug of the LogRocket organization. Use the list_organizations tool to find available organization slugs.`,
      },
    ],
  },
  {
    name: 'logrocketmcp_use_logrocket',
    description: `Process a natural language query against LogRocket data — sessions, metrics, and issues. Use this to investigate user-reported bugs, understand behavior patterns, analyze performance metrics, and detect regressions by correlating code changes with LogRocket data.`,
    params: [
      {
        name: 'organizationSlug',
        type: 'string',
        required: true,
        description: `The slug of the LogRocket organization to query. Use the list_organizations tool to find available slugs.`,
      },
      {
        name: 'projectSlug',
        type: 'string',
        required: true,
        description: `The slug of the LogRocket project to query. Use the list_projects tool to find available slugs.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language query describing what to investigate. Examples: 'show me sessions where users encountered a checkout error', 'how many users hit the payment failure last week', 'find sessions with rage clicks on the signup button'.`,
      },
    ],
  },
]
