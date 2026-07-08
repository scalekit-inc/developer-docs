import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'airbytemcp_check_credential_flow_status',
    description: `Check the status of a credential flow started by start_credential_flow. When complete, creates the connector and returns the connector_id. If status is 'pending', the user hasn't finished yet.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `The session ID from start_credential_flow.`,
      },
      {
        name: 'workspace_name',
        type: 'string',
        required: false,
        description: `Optional fallback workspace name.`,
      },
    ],
  },
  {
    name: 'airbytemcp_check_enrollment_status',
    description: `Check and trigger account enrollment. Call this before other tools when working with a new user or when you get authentication/authorization errors. If is_enrolled is false, check provisioning_state and retry only while null or IN_PROGRESS.`,
    params: [],
  },
  {
    name: 'airbytemcp_current_datetime',
    description: `Get the current date and time in ISO 8601 format (UTC). Call this FIRST before any time-based query to resolve relative dates like 'today', 'yesterday', 'this week', etc.`,
    params: [],
  },
  {
    name: 'airbytemcp_delete_connector',
    description: `Permanently delete a connector instance. This cannot be undone. Only use this after the user has explicitly confirmed deletion and identified the connector by name or connector_id.`,
    params: [
      {
        name: 'connector_id',
        type: 'string',
        required: true,
        description: `The connector instance ID to delete (from list_created_connectors).`,
      },
    ],
  },
  {
    name: 'airbytemcp_execute',
    description: `Query, search, or write data in connected business systems (CRMs, support tools, databases, project trackers). Executes one or more operations concurrently. Maximum 10 items per call. PRECONDITION: Call inspect_connector then read_skill_docs before the first execute call for a connector.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `A list of execution items, each targeting a connector entity + action.`,
      },
    ],
  },
  {
    name: 'airbytemcp_get_connector_template',
    description: `Get detailed info about a connector type including configuration fields, auth requirements, and available auth methods. Call this before start_credential_flow to understand what authentication the connector supports.`,
    params: [
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The ID of the connector template (from list_available_connectors).`,
      },
    ],
  },
  {
    name: 'airbytemcp_get_current_organization',
    description: `Report which organization is currently active. Call this when the user asks which organization they are in. When no organization has been explicitly selected, the backend uses your default organization (is_explicit_selection is false).`,
    params: [],
  },
  {
    name: 'airbytemcp_get_current_workspace',
    description: `Report which workspace is currently active. Call this when the user asks which workspace they are in, or before creating connectors. When no workspace has been selected, the active workspace is 'default'.`,
    params: [],
  },
  {
    name: 'airbytemcp_inspect_connector',
    description: `Inspect a connected data source for metadata, status/readiness, source definition identity, warnings, and docs_skill_id. This is mandatory before read_skill_docs. Does not return usage instructions for execute — use read_skill_docs with the returned docs_skill_id.`,
    params: [
      {
        name: 'connector_id',
        type: 'string',
        required: true,
        description: `The connector instance ID (from list_created_connectors).`,
      },
    ],
  },
  {
    name: 'airbytemcp_list_available_connectors',
    description: `List connector types (templates) available to create — NOT existing connectors. Returns names and IDs. To see connectors already set up, use list_created_connectors instead.`,
    params: [],
  },
  {
    name: 'airbytemcp_list_created_connectors',
    description: `List the user's connected data sources (e.g. Salesforce, HubSpot, Zendesk, Jira, databases). Returns connector IDs needed for inspect_connector, read_skill_docs, and execute. Call this before querying to see what systems are available.`,
    params: [
      {
        name: 'workspace_name',
        type: 'string',
        required: false,
        description: `Optional workspace name to list connectors for.`,
      },
    ],
  },
  {
    name: 'airbytemcp_list_organizations',
    description: `List the organizations you belong to. Each is flagged with is_current. Call this when the user mentions multiple organizations or wants to switch. If the list is empty and is_instance_admin is true, ask the user for the specific organization id.`,
    params: [],
  },
  {
    name: 'airbytemcp_list_skills',
    description: `List available skill documentation entries for connected data sources. Use this to discover docs skill IDs when you cannot call inspect_connector directly.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of skills to return.`,
      },
      {
        name: 'workspace_name',
        type: 'string',
        required: false,
        description: `Optional workspace name.`,
      },
    ],
  },
  {
    name: 'airbytemcp_list_workspaces',
    description: `List all workspaces in your organization. Each is flagged with is_current and is_default. Call this when the user mentions multiple workspaces or wants to switch.`,
    params: [],
  },
  {
    name: 'airbytemcp_read_skill_docs',
    description: `Read usage documentation for a skill. For connector skills, pass the docs_skill_id returned by inspect_connector. Omit section to return metadata and available sections. Pass an exact section ID to read entity/action/params/examples for execute.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The docs skill ID (from inspect_connector).`,
      },
      {
        name: 'section',
        type: 'string',
        required: false,
        description: `Specific section ID to read.`,
      },
      {
        name: 'workspace_name',
        type: 'string',
        required: false,
        description: `Optional workspace name.`,
      },
    ],
  },
  {
    name: 'airbytemcp_search_skills',
    description: `Search available skill documentation entries by a basic keyword. This is exact substring search only. It matches connector instance names and connector-source IDs. Use it when you need a docs skill ID.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Keyword to search for in skill names.`,
      },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results.`,
      },
      {
        name: 'workspace_name',
        type: 'string',
        required: false,
        description: `Optional workspace name.`,
      },
    ],
  },
  {
    name: 'airbytemcp_start_credential_flow',
    description: `Start a browser-based credential flow to connect a data source. Returns a URL the user must visit to enter credentials securely. This is the ONLY way to provide credentials — NEVER ask for or accept API keys, tokens, passwords, or secrets directly in chat.`,
    params: [
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The connector template ID (from list_available_connectors).`,
      },
      {
        name: 'workspace_name',
        type: 'string',
        required: false,
        description: `Optional workspace name. Defaults to current workspace.`,
      },
    ],
  },
  {
    name: 'airbytemcp_use_organization',
    description: `Switch the active organization for the session. After calling this, every tool operates on the chosen organization until you switch again. Switching organizations resets the active workspace to that organization's default workspace.`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `The organization to switch to (from list_organizations).`,
      },
    ],
  },
  {
    name: 'airbytemcp_use_workspace',
    description: `Switch the active workspace for the session. After calling this, all workspace-scoped tools operate on the chosen workspace until you switch again. Always tell the user which workspace is now active.`,
    params: [
      {
        name: 'workspace_name',
        type: 'string',
        required: true,
        description: `The workspace to switch to (from list_workspaces).`,
      },
    ],
  },
]
