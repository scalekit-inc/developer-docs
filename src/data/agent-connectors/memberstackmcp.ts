import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'memberstackmcp_createapp',
    description: `Create a new Memberstack app (project) with isolated members, plans, data tables, and gated content. Only use when the user explicitly requests a new app. After creation the session context automatically switches to the new app.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name for the new app. Maximum 24 characters.`,
      },
      {
        name: 'stack',
        type: 'string',
        required: true,
        description: `Platform/stack for the app. Accepted values: WEBFLOW, VANILLA, WORDPRESS.`,
      },
      {
        name: 'templateId',
        type: 'string',
        required: false,
        description: `Webflow template ID to scaffold the app from. Only applicable for WEBFLOW stack.`,
      },
      {
        name: 'wordpressPageBuilder',
        type: 'string',
        required: false,
        description: `WordPress page builder plugin. Accepted values: GUTENBERG, ELEMENTOR, DIVI, BEAVER_BUILDER, BRICKS, CORNERSTONE, OTHER.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_currentapp',
    description: `Get the currently active Memberstack app, including its environment mode (SANDBOX or LIVE), user role, and domain configuration.`,
    params: [],
  },
  {
    name: 'memberstackmcp_currentuser',
    description: `Get the authenticated dashboard user's profile and the list of Memberstack apps they can manage.`,
    params: [],
  },
  {
    name: 'memberstackmcp_explore_tools',
    description: `Browse available Memberstack tools by category or search term. Returns tool names with brief descriptions. Use get_tool_schema to load the full schema for a specific tool before calling it.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Filter tools by category. Accepted values: core, members, plans, dataTables, gatedContent, teams, customFields, stripe. Omit to see all.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter tools by name or description.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_get_tool_schema',
    description: `Load the full input schema and usage instructions for a specific Memberstack tool by name.`,
    params: [
      {
        name: 'toolName',
        type: 'string',
        required: true,
        description: `Exact tool name returned by explore_tools, e.g. getMember.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_getmemberstackenvironment',
    description: `Get the current environment (LIVE or SANDBOX) used for member-related operations.`,
    params: [],
  },
  {
    name: 'memberstackmcp_listapps',
    description: `List all Memberstack apps accessible to the dashboard user, including roles and creation dates.`,
    params: [],
  },
  {
    name: 'memberstackmcp_switchapp',
    description: `Set the active app context so all subsequent operations target the specified app.`,
    params: [
      {
        name: 'appId',
        type: 'string',
        required: true,
        description: `Unique identifier of the app to switch to. Retrieve app IDs using listApps.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_switchmemberstackenvironment',
    description: `Switch the environment (LIVE or SANDBOX) used for member operations. Only affects member-related tools.`,
    params: [
      {
        name: 'environment',
        type: 'string',
        required: true,
        description: `Environment for member operations. Accepted values: LIVE (production), SANDBOX (test data).`,
      },
    ],
  },
]
