import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'revealedaimcp_get_account',
    description: `Retrieve the full account snapshot including company signals, people, summaries, and metadata. Use Get Account Brief for lightweight overviews when scanning many accounts.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UUID from list_accounts. Obtain by calling List Accounts first.`,
      },
    ],
  },
  {
    name: 'revealedaimcp_get_account_brief',
    description: `Retrieve a compact account overview from the latest snapshot including change summary, signal counts, and top signals by impact.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UUID from list_accounts. Obtain by calling List Accounts first.`,
      },
    ],
  },
  {
    name: 'revealedaimcp_get_company_signal',
    description: `Retrieve all snapshot rows for a specific company signal by its data element slug. Use List Tracked Signals to discover available signal slugs.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UUID from list_accounts. Obtain by calling List Accounts first.`,
      },
      {
        name: 'signal_slug',
        type: 'string',
        required: true,
        description: `Data element slug for the company signal. Obtain from List Tracked Signals.`,
      },
    ],
  },
  {
    name: 'revealedaimcp_get_person',
    description: `Retrieve the full person record from the latest snapshot. Provide exactly one of persona (slug), name (full name), or person_id.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UUID from list_accounts. Obtain by calling List Accounts first.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Person's full name as shown in List People. Merges all persona rows for that person. Mutually exclusive with persona.`,
      },
      {
        name: 'person_id',
        type: 'string',
        required: false,
        description: `Deprecated alias for persona slug. Use persona or name instead.`,
      },
      {
        name: 'persona',
        type: 'string',
        required: false,
        description: `Persona slug (e.g. chief-nursing-officer). Obtain from List Personas or List People.`,
      },
    ],
  },
  {
    name: 'revealedaimcp_list_accounts',
    description: `List accounts in the workspace with lifecycle status and last reviewed date. Call this first to obtain account IDs required by all other account-scoped tools.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Case-insensitive substring to filter account names.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Lifecycle status filter. Accepted values: active, paused, all.`,
      },
    ],
  },
  {
    name: 'revealedaimcp_list_people',
    description: `List people at an account from the latest snapshot, deduplicated by name. Optionally filter by persona slug substring or change type.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UUID from list_accounts. Obtain by calling List Accounts first.`,
      },
      {
        name: 'change_type',
        type: 'string',
        required: false,
        description: `Filter people by their latest change type. Accepted values: new, departed, role_change, any.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return.`,
      },
      {
        name: 'persona',
        type: 'string',
        required: false,
        description: `Persona slug (e.g. chief-nursing-officer). Obtain from List Personas or List People.`,
      },
    ],
  },
  {
    name: 'revealedaimcp_list_personas',
    description: `List buyer persona slugs present in an account snapshot with counts and human-readable names. Use slugs with Get Person.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UUID from list_accounts. Obtain by calling List Accounts first.`,
      },
    ],
  },
  {
    name: 'revealedaimcp_list_tracked_signals',
    description: `List persona slugs, people signal slugs, and company signal slugs configured for this workspace. Use these slugs with Get Person and Get Company Signal.`,
    params: [],
  },
  {
    name: 'revealedaimcp_mcp_status',
    description: `Check MCP connectivity and return workspace name, OAuth client ID, and granted token scopes. Call after connecting to verify the session.`,
    params: [],
  },
  {
    name: 'revealedaimcp_plan_usage',
    description: `Retrieve billing plan limits and current account usage counts for the workspace. Requires admin:read scope.`,
    params: [],
  },
  {
    name: 'revealedaimcp_recent_changes',
    description: `Retrieve what changed since the last finalized snapshot: change summary, person changes, and signal events. Use for meeting prep and what-is-new questions.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UUID from list_accounts. Obtain by calling List Accounts first.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Reserved for future time filtering. Currently unused.`,
      },
    ],
  },
  {
    name: 'revealedaimcp_recommended_actions',
    description: `Retrieve outreach-oriented actions derived from person changes and signal events, including target, rationale, and a draft message.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UUID from list_accounts. Obtain by calling List Accounts first.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return.`,
      },
      {
        name: 'person_id',
        type: 'string',
        required: false,
        description: `Deprecated alias for persona slug. Use persona or name instead.`,
      },
      {
        name: 'persona',
        type: 'string',
        required: false,
        description: `Persona slug (e.g. chief-nursing-officer). Obtain from List Personas or List People.`,
      },
    ],
  },
  {
    name: 'revealedaimcp_top_actions',
    description: `Retrieve ranked recommended actions across all active accounts in the workspace. Use when the user asks for next steps without specifying an account.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return.`,
      },
    ],
  },
]
