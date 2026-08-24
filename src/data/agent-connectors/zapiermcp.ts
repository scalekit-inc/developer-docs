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
    name: 'zapiermcp_inspect_zapier_actions',
    description: `Inspects all enabled apps and their actions with everything needed to build an execute call: the exact \`app\`, \`action\`, and \`tool_name\` identifiers plus parameter schema. Call this before any execute_zapier_read_action or execute_zapier_write_action call. Use \`tool_name\` for exact action details. For a parameter flagged \`is_dynamic_enum: true\`, call this tool again with \`tool_name\`, \`enum_property\`, and any parent values in \`params\` to resolve values. For actions with \`dynamic_properties_depends_on\`, settle those parameters first, then call this tool again with \`tool_name\` and \`params\` to get \`dynamic_properties_schema\`.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Filter by action key. Omit to list all actions.`,
      },
      {
        name: 'connection_id',
        type: 'string',
        required: false,
        description: `Optional. The connected account to run this action against. Apps can have multiple connected accounts; by default the action runs against the app's default connection. Set it only when the user's request implies or names a specific account, or asks to switch accounts. Look up the id with list_zapier_connections.`,
      },
      {
        name: 'enum_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous dynamic enum response. Use with \`enum_property\`.`,
      },
      {
        name: 'enum_property',
        type: 'string',
        required: false,
        description: `The dynamic enum property to resolve or search. Required to get \`dynamic_enum_values\`; omit when you only need the action's parameter schema.`,
      },
      {
        name: 'enum_search',
        type: 'string',
        required: false,
        description: `Optional search text for \`enum_property\` when its dynamic enum has many values.`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Partial argument values for the action. Pass parent values here to resolve dynamic enum values and the \`dynamic_properties\` schema inline before executing.`,
      },
      {
        name: 'selected_api',
        type: 'string',
        required: false,
        description: `Filter by selectedApi (e.g., 'GoogleMailV2CLIAPI'). Use the \`selected_api\` from a previous list call or from discover_zapier_actions. Omit to list all apps.`,
      },
      {
        name: 'tool_name',
        type: 'string',
        required: false,
        description: `Filter by the \`tool_name\` returned for an action. Preferred when resolving an exact action schema because it is collision-safe.`,
      },
    ],
  },
  {
    name: 'zapiermcp_list_enabled_zapier_actions',
    description: `[STALE - upstream tool \`list_enabled_zapier_actions\` no longer appears in the live Zapier MCP tools/list; it has been superseded by \`inspect_zapier_actions\` (added separately) which returns a richer action/parameter schema. Kept for backward compatibility, not for new integrations.] List all apps and actions currently enabled on this Zapier MCP server. Pass an app name to see its available action keys. Use action keys with execute_zapier_read_action and execute_zapier_write_action.`,
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
    name: 'zapiermcp_list_zapier_connections',
    description: `List the Zapier connections (authenticated accounts) available for an app. Use the \`selected_api\` from discover_zapier_actions or inspect_zapier_actions. Returns each connection's \`connection_id\`, which you can pass to execute_zapier_read_action / execute_zapier_write_action to run with that specific account. By default only the user's own connections are returned; pass \`include_shared: true\` to also return connections shared with them. Paginated via \`cursor\`.`,
    params: [
      {
        name: 'selected_api',
        type: 'string',
        required: true,
        description: `The selectedApi ID of the app to list connections for (e.g. 'SlackCLIAPI'). Use the \`selected_api\` from discover_zapier_actions or inspect_zapier_actions.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's \`next_cursor\`. Omit to fetch the first page.`,
      },
      {
        name: 'include_shared',
        type: 'boolean',
        required: false,
        description: `Include connections shared with the user by others. By default only the user's own connections are returned. Only show the user their shared connections if they explicitly ask for it.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of connections to return per page (1-100). Defaults to 20.`,
      },
    ],
  },
  {
    name: 'zapiermcp_list_zapier_skills',
    description: `List all saved Zapier Skills with their names and descriptions.`,
    params: [],
  },
  {
    name: 'zapiermcp_manage_zapier_connections',
    description: `Manage an app's Zapier connections. Returns a URL the user can open to connect a new account, and optionally sets the app's default connection. An app requires a default connection before any of its actions can run. \`selected_api\` must come verbatim from discover_zapier_actions or inspect_zapier_actions - never guess or construct it (e.g. Gmail is \`GoogleMailV2CLIAPI\`, not \`GmailCLIAPI\`). To set the default account every action for this app should use, pass \`default_connection_id\` (look it up with list_zapier_connections).`,
    params: [
      {
        name: 'selected_api',
        type: 'string',
        required: true,
        description: `The exact selectedApi ID of the app (e.g. 'SlackCLIAPI'). Must come verbatim from discover_zapier_actions (or inspect_zapier_actions) - do not guess or construct it (e.g. Gmail is 'GoogleMailV2CLIAPI', not 'GmailCLIAPI').`,
      },
      {
        name: 'app_display_name',
        type: 'string',
        required: false,
        description: `Optional human-readable app name (from discover_zapier_actions) used to make the response easier to read.`,
      },
      {
        name: 'default_connection_id',
        type: 'string',
        required: false,
        description: `Optional. Set this connection as the app's default so every action for the app runs against it without passing \`connection_id\` each time. Look up the id with list_zapier_connections. Omit to only get a URL for connecting a new account.`,
      },
    ],
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
  {
    name: 'zapiermcp_write_code_action',
    description: `Create or update a custom code action for an app. Use this when inspect_zapier_actions does not have the action you need and the app's service API should support it. The code is generated from your requirements and executes in a secure sandbox with authenticated API access. Never include API keys, tokens, passwords, or other credentials in the requirements - code actions authenticate automatically through Zapier's connected accounts. If a code action with the same name already exists, it will be regenerated with the new requirements. After creation, the action is immediately available as a tool.`,
    params: [
      {
        name: 'code_action_name',
        type: 'string',
        required: true,
        description: `A short, descriptive name for the code action (e.g. 'list_channel_users', 'close_stale_issues'). Used as the tool name suffix.`,
      },
      {
        name: 'requirements',
        type: 'string',
        required: true,
        description: `Natural language description of what the code action should do. Never include API keys, tokens, or credentials - authentication is handled automatically via connected accounts. Be specific about the API endpoint, data format, and any filtering/pagination needs.`,
      },
      {
        name: 'selected_api',
        type: 'string',
        required: true,
        description: `The app's API identifier from discover_zapier_actions (e.g. 'GoogleMailV2CLIAPI', 'JiraSoftwareCloudCLIAPI').`,
      },
    ],
  },
]
