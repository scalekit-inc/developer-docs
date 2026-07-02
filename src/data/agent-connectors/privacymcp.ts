import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'privacymcp_close_card',
    description: `Permanently close a virtual card, blocking all future transactions. This action is irreversible.`,
    params: [
      { name: 'card_token', type: 'string', required: true, description: `Token of the card` },
    ],
  },
  {
    name: 'privacymcp_create_card',
    description: `Create a new virtual card on your Privacy.com account with optional spend limits and memo.`,
    params: [
      { name: 'type', type: 'string', required: true, description: `Card type: SINGLE_USE (closes after first use), MERCHANT_LOCKED (locks to first merchant)` },
      { name: 'memo', type: 'string', required: false, description: `Friendly name for the card` },
      { name: 'spend_limit', type: 'number', required: false, description: `Spend limit in dollars (e.g. 25.00)` },
      { name: 'spend_limit_duration', type: 'string', required: false, description: `How the spend limit resets: per TRANSACTION, MONTHLY, ANNUALLY, or FOREVER (lifetime)` },
      { name: 'state', type: 'string', required: false, description: `Initial card state (default: OPEN)` },
    ],
  },
  {
    name: 'privacymcp_get_card',
    description: `Retrieve details for a specific virtual card by its token, including type, state, and spend limits.`,
    params: [
      { name: 'card_token', type: 'string', required: true, description: `Token of the card to retrieve` },
    ],
  },
  {
    name: 'privacymcp_get_pan',
    description: `Retrieve the full card number (PAN), CVV2, and expiration date for a virtual card. Returns sensitive data.`,
    params: [
      { name: 'card_token', type: 'string', required: true, description: `Token of the card to retrieve` },
    ],
  },
  {
    name: 'privacymcp_list_cards',
    description: `List all virtual cards on your Privacy.com account with optional pagination.`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination (1-indexed)` },
      { name: 'page_size', type: 'integer', required: false, description: `Number of cards per page (1-100, default 20)` },
    ],
  },
  {
    name: 'privacymcp_list_transactions',
    description: `List transactions on your Privacy.com account, with optional filters for card, date range, and result.`,
    params: [
      { name: 'account_token', type: 'string', required: false, description: `Filter transactions by account token` },
      { name: 'begin', type: 'string', required: false, description: `Start date (inclusive) in YYYY-MM-DD format` },
      { name: 'card_token', type: 'string', required: false, description: `Filter transactions by card token` },
      { name: 'end', type: 'string', required: false, description: `End date (exclusive) in YYYY-MM-DD format` },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination (1-indexed)` },
      { name: 'page_size', type: 'integer', required: false, description: `Number of transactions per page (1-1000, default 20)` },
      { name: 'result', type: 'string', required: false, description: `Filter by transaction result` },
    ],
  },
  {
    name: 'privacymcp_pause_card',
    description: `Pause a virtual card to temporarily block all transactions until it is unpaused.`,
    params: [
      { name: 'card_token', type: 'string', required: true, description: `Token of the card` },
    ],
  },
  {
    name: 'privacymcp_unpause_card',
    description: `Re-enable transactions on a previously paused virtual card.`,
    params: [
      { name: 'card_token', type: 'string', required: true, description: `Token of the card` },
    ],
  },
  {
    name: 'privacymcp_update_card_memo',
    description: `Update the memo (friendly name) on a virtual card.`,
    params: [
      { name: 'card_token', type: 'string', required: true, description: `Token of the card to update` },
      { name: 'memo', type: 'string', required: true, description: `New friendly name for the card` },
    ],
  },
  {
    name: 'privacymcp_update_card_spend_limit',
    description: `Update the spend limit and optional reset duration for a virtual card.`,
    params: [
      { name: 'card_token', type: 'string', required: true, description: `Token of the card to update` },
      { name: 'spend_limit', type: 'number', required: true, description: `New spend limit in dollars (e.g. 25.00)` },
      { name: 'spend_limit_duration', type: 'string', required: false, description: `How the spend limit resets: per TRANSACTION, MONTHLY, ANNUALLY, or FOREVER (lifetime). If omitted, keeps the current duration.` },
    ],
  },
]
