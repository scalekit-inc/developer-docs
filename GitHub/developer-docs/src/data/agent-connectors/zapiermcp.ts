import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'zapiermcp_auto_provision_mcp',
    description: `Automatically set up this MCP server based on the user's existing connected accounts in Zapier.`,
    params: [],
  },
  {
    name: 'zapiermcp_create_zapier_skill',
    description: `Save a workflow as a reusable Zapier Skill. A skill is a named, versioned markdown document that defines how to accomplish a task using Zapier actions.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `One-sentence description of what this skill does`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Short, unique name for this skill (e.g. 'create jira ticket', 'daily standup'). Names are case-insensitive.`,
      },
      {
        name: 'skillDefinition',
        type: 'string',
        required: true,
        description: `Full markdown content of the skill. IMPORTANT: Before creating, ask the user about their specific configuration — project keys, channel names, default assignees, recurring parameters — so those get baked in as fixed values. Reference each MCP tool the skill uses with a \`\`\`mcp-tool\\n<tool_name>\\n\`\`\` code fence. Include step-by-step instructions and any fixed parameter values.`,
      },
    ],
  },
  {
    name: 'zapiermcp_delete_zapier_skill',
    description: `Permanently delete a Zapier Skill by name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The exact name of the skill to delete`,
      },
    ],
  },
  {
    name: 'zapiermcp_disable_zapier_action',
    description: `Remove an app's actions from this MCP server. Use list_enabled_zapier_actions to see which apps are currently enabled.`,
    params: [
      {
        name: 'app',
        type: 'string',
        required: true,
        description: `App name to remove (e.g., 'gmail', 'jira', 'slack'). Accepts short names or full IDs. Use list_enabled_zapier_actions to see enabled apps.`,
      },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Specific action key to remove. If omitted, all actions for the app are removed.`,
      },
    ],
  },
  {
    name: 'zapiermcp_discover_zapier_actions',
    description: `Search 8,000+ Zapier apps to find actions you can enable. Returns app IDs and action keys to use with enable_zapier_action.`,
    params: [
      {
        name: 'app',
        type: 'string',
        required: false,
        description: `Search for apps by name. Omit to see popular apps. Search 8,000+ available apps.`,
      },
    ],
  },
  {
    name: 'zapiermcp_enable_zapier_action',
    description: `Enable an app's actions on this MCP server. Use discover_zapier_actions to find the app name first.`,
    params: [
      {
        name: 'app',
        type: 'string',
        required: true,
        description: `App name or identifier (e.g., 'gmail', 'jira', 'slack'). Accepts short names or full IDs from discover_zapier_actions.`,
      },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Specific action key to enable. If omitted or '*', all actions for the app are enabled.`,
      },
    ],
  },
  {
    name: 'zapiermcp_execute_zapier_read_action',
    description: `Execute a search or read action to retrieve data from a connected app. Call list_enabled_zapier_actions first to get the app name and action key.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action key to execute. Use list_enabled_zapier_actions to get exact keys.`,
      },
      {
        name: 'app',
        type: 'string',
        required: true,
        description: `App identifier. Use list_enabled_zapier_actions to see available apps.`,
      },
      {
        name: 'instructions',
        type: 'string',
        required: true,
        description: `Natural language instructions for the action`,
      },
      {
        name: 'output',
        type: 'string',
        required: true,
        description: `Natural language description of what data you want from the results. Example: 'just the title and created date' or 'only items with status active'. A filter will be automatically generated to extract this data.`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Optional direct parameter values to pass to the action`,
      },
    ],
  },
  {
    name: 'zapiermcp_execute_zapier_write_action',
    description: `Execute a write or create action in a connected app. Call list_enabled_zapier_actions first to get the app name and action key.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action key to execute. Use list_enabled_zapier_actions to get exact keys.`,
      },
      {
        name: 'app',
        type: 'string',
        required: true,
        description: `App identifier. Use list_enabled_zapier_actions to see available apps.`,
      },
      {
        name: 'instructions',
        type: 'string',
        required: true,
        description: `Natural language instructions for the action`,
      },
      {
        name: 'output',
        type: 'string',
        required: true,
        description: `Natural language description of what data you want from the results. Example: 'just the title and created date' or 'only items with status active'. A filter will be automatically generated to extract this data.`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Optional direct parameter values to pass to the action`,
      },
    ],
  },
  {
    name: 'zapiermcp_get_configuration_url',
    description: `Get the URL where users can configure this MCP server — adding, editing, or removing actions and connecting accounts.`,
    params: [],
  },
  {
    name: 'zapiermcp_get_zapier_skill',
    description: `Fetch the full markdown content of a Zapier Skill by name. Call this before executing a skill.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The exact name of the skill to retrieve`,
      },
    ],
  },
  {
    name: 'zapiermcp_list_enabled_zapier_actions',
    description: `List all apps and actions currently enabled on this Zapier MCP server. Pass an app name to see its available action keys. Use action keys with execute_zapier_read_action and execute_zapier_write_action.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Filter by action key. Omit to list all actions.`,
      },
      {
        name: 'app',
        type: 'string',
        required: false,
        description: `Filter by app name (e.g., 'gmail', 'jira', 'slack'). Omit to list all apps.`,
      },
    ],
  },
  {
    name: 'zapiermcp_list_zapier_skills',
    description: `List all saved Zapier Skills with their names and descriptions.`,
    params: [],
  },
  {
    name: 'zapiermcp_send_feedback',
    description: `Send feedback about your Zapier MCP experience to the Zapier team.`,
    params: [
      {
        name: 'feedback',
        type: 'string',
        required: true,
        description: `Feedback message to send to the Zapier MCP team`,
      },
      {
        name: 'feedback_positive',
        type: 'boolean',
        required: true,
        description: `Whether this is positive feedback (true) or negative (false)`,
      },
    ],
  },
  {
    name: 'zapiermcp_update_zapier_skill',
    description: `Update an existing Zapier Skill's description or content by name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The exact name of the skill to update`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated one-sentence description (optional)`,
      },
      {
        name: 'skillDefinition',
        type: 'string',
        required: false,
        description: `Updated full markdown content (optional)`,
      },
    ],
  },
]
