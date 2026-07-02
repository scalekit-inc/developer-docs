import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'sybilmcp_ask_sybill',
    description: `Ask Sybill AI about your sales calls, deals, accounts, or contacts.`,
    params: [
      { name: 'message', type: 'string', required: true, description: `Your question about sales calls, deals, accounts, or contacts.` },
    ],
  },
  {
    name: 'sybilmcp_get_account',
    description: `Get full details of a single CRM account including contacts, owner, and synced CRM fields.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Unique ID of the account. Get it from List Accounts.` },
    ],
  },
  {
    name: 'sybilmcp_get_conversation',
    description: `Get full details of a single conversation including summary, transcript, and recording URLs.`,
    params: [
      { name: 'conversation_id', type: 'string', required: true, description: `Unique ID of the conversation. Get it from List Conversations.` },
    ],
  },
  {
    name: 'sybilmcp_get_deal',
    description: `Get full details of a single CRM deal including summary, contacts, owner, pipeline, and stage.`,
    params: [
      { name: 'deal_id', type: 'string', required: true, description: `Unique ID of the deal. Get it from List Deals.` },
    ],
  },
  {
    name: 'sybilmcp_list_accounts',
    description: `List CRM accounts with optional filters for name, website, owner, and date ranges.`,
    params: [
      { name: 'created_after', type: 'string', required: false, description: `Return records created after this ISO 8601 datetime.` },
      { name: 'created_before', type: 'string', required: false, description: `Return records created before this ISO 8601 datetime.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'last_activity_after', type: 'string', required: false, description: `Return records with last activity after this ISO 8601 datetime.` },
      { name: 'last_activity_before', type: 'string', required: false, description: `Return records with last activity before this ISO 8601 datetime.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of items to return per page.` },
      { name: 'name', type: 'string', required: false, description: `Filter by account or deal name (partial match supported).` },
      { name: 'owner', type: 'string', required: false, description: `Filter by owner email address.` },
      { name: 'website', type: 'string', required: false, description: `Filter by account website domain.` },
    ],
  },
  {
    name: 'sybilmcp_list_conversations',
    description: `List sales conversations with optional filters for date range, meeting type, and attendees.`,
    params: [
      { name: 'attendees', type: 'string', required: false, description: `Filter conversations by attendee email address.` },
      { name: 'crm_name', type: 'string', required: false, description: `Filter by CRM name (e.g. Salesforce, HubSpot).` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of items to return per page.` },
      { name: 'meeting_type', type: 'string', required: false, description: `Filter conversations by meeting category (e.g. prospect_demo, customer_onboarding, one_on_one).` },
      { name: 'source_id', type: 'string', required: false, description: `Filter by source/integration ID.` },
      { name: 'started_after', type: 'string', required: false, description: `Return conversations that started after this ISO 8601 datetime.` },
      { name: 'started_before', type: 'string', required: false, description: `Return conversations that started before this ISO 8601 datetime.` },
      { name: 'title', type: 'string', required: false, description: `Filter conversations by title (partial match supported).` },
    ],
  },
  {
    name: 'sybilmcp_list_deals',
    description: `List CRM deals with optional filters for name, stage, amount, owner, and close date.`,
    params: [
      { name: 'amount_max', type: 'string', required: false, description: `Return deals with amount less than or equal to this value.` },
      { name: 'amount_min', type: 'string', required: false, description: `Return deals with amount greater than or equal to this value.` },
      { name: 'close_date_after', type: 'string', required: false, description: `Return deals with close date after this date (YYYY-MM-DD).` },
      { name: 'close_date_before', type: 'string', required: false, description: `Return deals with close date before this date (YYYY-MM-DD).` },
      { name: 'closed', type: 'string', required: false, description: `Filter by closed status: true for closed deals, false for open.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'last_activity_after', type: 'string', required: false, description: `Return records with last activity after this ISO 8601 datetime.` },
      { name: 'last_activity_before', type: 'string', required: false, description: `Return records with last activity before this ISO 8601 datetime.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of items to return per page.` },
      { name: 'name', type: 'string', required: false, description: `Filter by account or deal name (partial match supported).` },
      { name: 'owner', type: 'string', required: false, description: `Filter by owner email address.` },
      { name: 'stage', type: 'string', required: false, description: `Filter deals by pipeline stage name.` },
    ],
  },
]
