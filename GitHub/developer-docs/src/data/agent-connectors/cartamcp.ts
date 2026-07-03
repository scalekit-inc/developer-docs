import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
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
    params: [],
  },
]
