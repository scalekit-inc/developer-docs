import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'gongmcp_ask_account',
    description: `Answer natural-language questions about a specific CRM account by analyzing Gong activities (calls and messages) within a defined time range. Returns synthesized insights — not raw data.`,
    params: [
      {
        name: 'crmAccount',
        type: 'string',
        required: true,
        description: `The CRM account name (e.g. 'Cisco Systems Inc') or direct CRM ID. Name lookup uses exact matching.`,
      },
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `Natural-language question about the account. Ask for concepts, themes, risks, blockers, stakeholders, goals, or next steps rather than raw data.`,
      },
      {
        name: 'fromDateTime',
        type: 'string',
        required: false,
        description: `Optional. Inclusive start of the activity window in ISO 8601 format with timezone. Provide both fromDateTime and toDateTime together, or omit both to default to the last 30 days.`,
      },
      {
        name: 'toDateTime',
        type: 'string',
        required: false,
        description: `Optional. Inclusive end of the activity window in ISO 8601 format with timezone. Must be later than fromDateTime.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: false,
        description: `Required when the account has multiple workspaces. Accepts a numeric workspace ID or a workspace name (case-insensitive).`,
      },
    ],
  },
  {
    name: 'gongmcp_ask_deal',
    description: `Answer natural-language questions about a specific CRM deal or opportunity by analyzing Gong activities (calls and messages) within a defined time range. Returns synthesized insights — not raw data.`,
    params: [
      {
        name: 'crmDeal',
        type: 'string',
        required: true,
        description: `The CRM deal/opportunity name (e.g. 'Acme Corp - Enterprise Q4') or direct CRM ID (e.g. '006EXAMPLE00001'). Name lookup uses exact matching.`,
      },
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `Natural-language question about the deal. Ask about themes, risks, objections, competitive mentions, stakeholder concerns, negotiation progress, or next steps.`,
      },
      {
        name: 'fromDateTime',
        type: 'string',
        required: false,
        description: `Optional. Inclusive start of the activity window in ISO 8601 format with timezone (e.g. 2025-08-01T00:00:00Z). Provide both fromDateTime and toDateTime together, or omit both to default to the last 30 days.`,
      },
      {
        name: 'toDateTime',
        type: 'string',
        required: false,
        description: `Optional. Inclusive end of the activity window in ISO 8601 format with timezone. Must be later than fromDateTime.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: false,
        description: `Required when the account has multiple workspaces. Accepts a numeric workspace ID (e.g. '1234567890') or a workspace name (case-insensitive, e.g. 'Sales').`,
      },
    ],
  },
  {
    name: 'gongmcp_generate_brief',
    description: `Create a comprehensive structured brief about a CRM entity (account, deal, or contact) by analyzing Gong activities within a specified time period. Returns multi-category insights for reviews and handovers.`,
    params: [
      {
        name: 'briefName',
        type: 'string',
        required: true,
        description: `Must exactly match the name of a published brief configured in the Gong workspace (e.g. 'Business Goals', 'Pain Points', 'Key Players'). If the name does not match, the response lists available briefs.`,
      },
      {
        name: 'crmEntity',
        type: 'string',
        required: true,
        description: `The CRM entity name or ID. For ACCOUNT and DEAL, provide the name as it appears in CRM or its CRM ID. For CONTACT, provide the direct CRM contact ID.`,
      },
      {
        name: 'entityType',
        type: 'string',
        required: true,
        description: `The type of CRM entity: ACCOUNT for companies, DEAL for opportunities, CONTACT for contacts/leads.`,
      },
      {
        name: 'fromDateTime',
        type: 'string',
        required: false,
        description: `Required when periodType is CUSTOM_RANGE. Inclusive start of the activity window in ISO 8601 format with timezone.`,
      },
      {
        name: 'periodType',
        type: 'string',
        required: false,
        description: `Time period to analyze. Defaults to LAST_90DAYS. Use CUSTOM_RANGE with fromDateTime/toDateTime for a custom window.`,
      },
      {
        name: 'toDateTime',
        type: 'string',
        required: false,
        description: `Required when periodType is CUSTOM_RANGE. Inclusive end of the activity window in ISO 8601 format with timezone.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: false,
        description: `Required when the account has multiple workspaces. Accepts a numeric workspace ID or a workspace name (case-insensitive).`,
      },
    ],
  },
]
