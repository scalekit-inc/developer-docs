import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'cartamcp_call_tool',
    description: `Call a Carta MCP tool by name with the given arguments.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the tool to call, as returned by Search Tools (use __ instead of : as a separator).`,
      },
      {
        name: 'arguments',
        type: 'string',
        required: false,
        description: `Arguments to pass to the tool (dict or JSON string).`,
      },
    ],
  },
  {
    name: 'cartamcp_cap_table_chart',
    description: `Show a visual cap table summary with ownership breakdown by share class.`,
    params: [
      {
        name: 'corporation_id',
        type: 'string',
        required: true,
        description: `Carta corporation ID of the company.`,
      },
      {
        name: 'as_of_date',
        type: 'string',
        required: false,
        description: `Date to use for the cap table snapshot in YYYY-MM-DD format.`,
      },
      {
        name: 'company_name',
        type: 'string',
        required: false,
        description: `Name of the company to look up.`,
      },
    ],
  },
  {
    name: 'cartamcp_discover',
    description: `List available Carta commands or views across all domains.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Carta domain to filter commands by (e.g. equity, fund).`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Scope to filter commands by: read, write, or view.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter results by name or description.`,
      },
    ],
  },
  {
    name: 'cartamcp_fetch',
    description: `Execute a named read command against Carta.`,
    params: [
      {
        name: 'command',
        type: 'string',
        required: true,
        description: `Fully qualified Carta command name in domain:verb:noun format. Use Discover to see available commands.`,
      },
      {
        name: 'params',
        type: 'string',
        required: false,
        description: `Parameters dict (e.g. {"corporation_id": 123}).
    Pass "raw": true to skip formatting and get the full API
    response. Not honored on every command — check the
    command's \`help\` for whether \`raw\` is supported.`,
      },
    ],
  },
  {
    name: 'cartamcp_get_current_user',
    description: `Get the currently authenticated Carta user profile.`,
    params: [],
  },
  {
    name: 'cartamcp_list_accounts',
    description: `List all companies and organizations the current user has access to.`,
    params: [
      {
        name: 'detail',
        type: 'string',
        required: false,
        description: `"summary" (default) returns up to the first 10 accounts, plus a total count when there are more. Pass "full" to force the complete list.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter results by name or description.`,
      },
    ],
  },
  {
    name: 'cartamcp_list_contexts',
    description: `List the firms you have access to in Carta Fund Admin.`,
    params: [
      {
        name: 'firm_id',
        type: 'string',
        required: false,
        description: `Carta firm ID to switch context to.`,
      },
      {
        name: 'firm_name',
        type: 'string',
        required: false,
        description: `Name of the firm to filter by.`,
      },
      {
        name: 'firm_uuid',
        type: 'string',
        required: false,
        description: `UUID of the firm to filter by.`,
      },
    ],
  },
  {
    name: 'cartamcp_list_resources',
    description: `List all available Carta MCP resources and resource templates.`,
    params: [],
  },
  {
    name: 'cartamcp_mutate',
    description: `Execute a write command (POST, PATCH, PUT, DELETE) against Carta.`,
    params: [
      {
        name: 'command',
        type: 'string',
        required: true,
        description: `Fully qualified Carta command name in domain:verb:noun format. Use Discover to see available commands.`,
      },
      {
        name: 'params',
        type: 'string',
        required: false,
        description: `Parameters dict (e.g. {"ownerId": 123, "ownerKind": "FIRM", ...}).`,
      },
    ],
  },
  {
    name: 'cartamcp_read_resource',
    description: `Read a Carta MCP resource by its URI.`,
    params: [
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `URI of the resource to read. For templated resources, fill in the template parameters.`,
      },
    ],
  },
  {
    name: 'cartamcp_request_permissions',
    description: `Generate an authorization link to grant Carta MCP access to your account.`,
    params: [],
  },
  {
    name: 'cartamcp_search_tools',
    description: `Search for Carta MCP tools using a natural language query.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language query describing the tool you're looking for.`,
      },
    ],
  },
  {
    name: 'cartamcp_set_context',
    description: `Switch the active firm so subsequent queries use that firm data.`,
    params: [
      {
        name: 'firm_id',
        type: 'string',
        required: true,
        description: `Carta firm ID to switch context to.`,
      },
    ],
  },
  {
    name: 'cartamcp_skill_checkpoint',
    description: `Record a named execution milestone for a running skill (explicit invocation only).`,
    params: [
      {
        name: 'checkpoint_label',
        type: 'string',
        required: true,
        description: `Milestone label, e.g. "skill_started" or "skill_finished" for the first/last checkpoint, or a custom snake_case label.`,
      },
      {
        name: 'skill_name',
        type: 'string',
        required: true,
        description: `Full skill identifier being checkpointed.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Optional free-text context, e.g. an error summary or a counted quantity.`,
      },
    ],
  },
  {
    name: 'cartamcp_track_ui_event',
    description: `Record a UI event (click, view, or other interaction) from a Carta MCP interface so it shows up in analytics.`,
    params: [
      {
        name: 'contexts',
        type: 'array',
        required: true,
        description: `List of small dicts giving extra context for the event. Must include one entry describing which interface sent the event, shaped as {"schema": "iglu:com.carta/mcp_interface/jsonschema/1-0-0", "data": {"interfaceType": ..., "interfaceId": ...}}, where interfaceType is one of "mcp_app", "micro_app", or "artifact".`,
      },
      {
        name: 'event',
        type: 'string',
        required: true,
        description: `The event to record, as a small dict shaped like {"schema": ..., "data": ...}. Passed through exactly as given.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Optional fallback identity for the event. The server automatically attaches the verified, logged-in user's identity when it can determine one, and that always wins over this value.`,
      },
    ],
  },
  {
    name: 'cartamcp_view_remote',
    description: `Render an interactive Carta view backed by a Module Federation remote.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the view to render. Use Discover with scope=view to see available views.`,
      },
      {
        name: 'params',
        type: 'string',
        required: false,
        description: `Parameters dict (e.g. {"corporation_id": 123}).`,
      },
    ],
  },
  {
    name: 'cartamcp_view_static',
    description: `Render an interactive Carta view backed by server-bundled HTML.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the view to render. Use Discover with scope=view to see available views.`,
      },
      {
        name: 'params',
        type: 'string',
        required: false,
        description: `Parameters dict passed to the view as \`\`window.mcpViewArgs\`\`.`,
      },
    ],
  },
  {
    name: 'cartamcp_welcome',
    description: `Get a welcome message and orientation guide from Carta MCP.`,
    params: [
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Optional role to filter quick-start suggestions by (e.g. CFO, fund accountant, deal team, IR, compliance officer, general partner, fundraising lead). Leave empty to show all.`,
      },
    ],
  },
]
