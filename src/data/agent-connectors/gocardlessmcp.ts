import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'gocardlessmcp_get_customer',
    description: `Retrieve a single customer by ID, with PII fields partially masked.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Customer ID (e.g. CU000123)` },
    ],
  },
  {
    name: 'gocardlessmcp_get_environment',
    description: `Return the current GoCardless environment (sandbox or live) and setup instructions.`,
    params: [
    ],
  },
  {
    name: 'gocardlessmcp_get_mandate',
    description: `Retrieve a single mandate (Direct Debit authorisation) by its mandate ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Mandate ID (e.g. MD000123)` },
    ],
  },
  {
    name: 'gocardlessmcp_get_payment',
    description: `Retrieve a single payment by its payment ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Payment ID (e.g. PM000123)` },
    ],
  },
  {
    name: 'gocardlessmcp_get_payout',
    description: `Retrieve a single payout (bank settlement) by its payout ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Payout ID (e.g. PO000123)` },
    ],
  },
  {
    name: 'gocardlessmcp_get_refund',
    description: `Retrieve a single refund by its refund ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Refund ID (e.g. RF000123)` },
    ],
  },
  {
    name: 'gocardlessmcp_get_subscription',
    description: `Retrieve a single subscription (recurring payment schedule) by its subscription ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Subscription ID (e.g. SB000123)` },
    ],
  },
  {
    name: 'gocardlessmcp_integrate_with_gocardless',
    description: `Return an overview of GoCardless integration options for collecting one-off and recurring payments.`,
    params: [
    ],
  },
  {
    name: 'gocardlessmcp_list_customers',
    description: `List customers, optionally filtered by creation date range.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Cursor for next page` },
      { name: 'created_at_gte', type: 'string', required: false, description: `Filter: created at or after this ISO 8601 datetime` },
      { name: 'created_at_lte', type: 'string', required: false, description: `Filter: created at or before this ISO 8601 datetime` },
      { name: 'limit', type: 'number', required: false, description: `Number of results per page (default 50, max 500)` },
      { name: 'sort_direction', type: 'string', required: false, description: `Sort direction: asc or desc` },
    ],
  },
  {
    name: 'gocardlessmcp_list_events',
    description: `List audit log events for state changes across all resources, optionally filtered by resource type, action, or date range.`,
    params: [
      { name: 'action', type: 'string', required: false, description: `Filter by action (e.g. created, confirmed, failed, paid_out, cancelled)` },
      { name: 'after', type: 'string', required: false, description: `Cursor for next page` },
      { name: 'created_at_gte', type: 'string', required: false, description: `Filter: created at or after this ISO 8601 datetime` },
      { name: 'created_at_lte', type: 'string', required: false, description: `Filter: created at or before this ISO 8601 datetime` },
      { name: 'limit', type: 'number', required: false, description: `Number of results per page (default 50, max 500)` },
      { name: 'mandate', type: 'string', required: false, description: `Filter by mandate ID` },
      { name: 'payment', type: 'string', required: false, description: `Filter by payment ID` },
      { name: 'payout', type: 'string', required: false, description: `Filter by payout ID` },
      { name: 'refund', type: 'string', required: false, description: `Filter by refund ID` },
      { name: 'resource_type', type: 'string', required: false, description: `Filter by resource type: payments, mandates, payouts, refunds, subscriptions, instalment_schedules` },
      { name: 'subscription', type: 'string', required: false, description: `Filter by subscription ID` },
    ],
  },
  {
    name: 'gocardlessmcp_list_mandates',
    description: `List mandates (Direct Debit authorisations), optionally filtered by status, customer, or scheme.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Cursor for next page` },
      { name: 'customer', type: 'string', required: false, description: `Filter by customer ID` },
      { name: 'limit', type: 'number', required: false, description: `Number of results per page (default 50, max 500)` },
      { name: 'scheme', type: 'string', required: false, description: `Filter by scheme: bacs, sepa_core, ach, autogiro, becs, becs_nz, betalingsservice, faster_payments, pad, pay_to` },
      { name: 'status', type: 'string', required: false, description: `Filter by status: pending_customer_approval, pending_submission, submitted, active, suspended_by_payer, failed, cancelled, expired, consumed, blocked` },
    ],
  },
  {
    name: 'gocardlessmcp_list_payments',
    description: `List payments, optionally filtered by status, customer, mandate, subscription, currency, or date range.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Cursor for next page (from previous response's next_cursor)` },
      { name: 'created_at_gte', type: 'string', required: false, description: `Filter: created at or after this ISO 8601 datetime` },
      { name: 'created_at_lte', type: 'string', required: false, description: `Filter: created at or before this ISO 8601 datetime` },
      { name: 'currency', type: 'string', required: false, description: `Filter by currency code (e.g. GBP, EUR, USD)` },
      { name: 'customer', type: 'string', required: false, description: `Filter by customer ID (e.g. CU000123)` },
      { name: 'limit', type: 'number', required: false, description: `Number of results per page (default 50, max 500)` },
      { name: 'mandate', type: 'string', required: false, description: `Filter by mandate ID (e.g. MD000123)` },
      { name: 'sort_direction', type: 'string', required: false, description: `Sort direction: asc or desc` },
      { name: 'status', type: 'string', required: false, description: `Filter by status: pending_submission, submitted, confirmed, paid_out, cancelled, customer_approval_denied, failed, charged_back` },
      { name: 'subscription', type: 'string', required: false, description: `Filter by subscription ID (e.g. SB000123)` },
    ],
  },
  {
    name: 'gocardlessmcp_list_payouts',
    description: `List payouts (bank settlements), optionally filtered by status, currency, or date range.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Cursor for next page` },
      { name: 'created_at_gte', type: 'string', required: false, description: `Filter: created at or after this ISO 8601 datetime` },
      { name: 'created_at_lte', type: 'string', required: false, description: `Filter: created at or before this ISO 8601 datetime` },
      { name: 'currency', type: 'string', required: false, description: `Filter by currency code (e.g. GBP, EUR, USD)` },
      { name: 'limit', type: 'number', required: false, description: `Number of results per page (default 50, max 500)` },
      { name: 'status', type: 'string', required: false, description: `Filter by status: pending, paid, bounced` },
    ],
  },
  {
    name: 'gocardlessmcp_list_refunds',
    description: `List refunds, optionally filtered by payment, mandate, or date range.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Cursor for next page` },
      { name: 'created_at_gte', type: 'string', required: false, description: `Filter: created at or after this ISO 8601 datetime` },
      { name: 'created_at_lte', type: 'string', required: false, description: `Filter: created at or before this ISO 8601 datetime` },
      { name: 'limit', type: 'number', required: false, description: `Number of results per page (default 50, max 500)` },
      { name: 'mandate', type: 'string', required: false, description: `Filter by mandate ID` },
      { name: 'payment', type: 'string', required: false, description: `Filter by payment ID` },
    ],
  },
  {
    name: 'gocardlessmcp_list_subscriptions',
    description: `List subscriptions (recurring payment schedules), optionally filtered by status, customer, or mandate.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Cursor for next page` },
      { name: 'customer', type: 'string', required: false, description: `Filter by customer ID` },
      { name: 'limit', type: 'number', required: false, description: `Number of results per page (default 50, max 500)` },
      { name: 'mandate', type: 'string', required: false, description: `Filter by mandate ID` },
      { name: 'status', type: 'string', required: false, description: `Filter by status: pending_customer_approval, active, cancelled, finished, paused` },
    ],
  },
  {
    name: 'gocardlessmcp_read_gocardless_resource',
    description: `Read the contents of a GoCardless resource by URI to fetch API endpoint details or documentation.`,
    params: [
      { name: 'uri', type: 'string', required: true, description: `The gocardless:// resource URI to read` },
    ],
  },
  {
    name: 'gocardlessmcp_submit_feedback',
    description: `Submit a helpfulness rating (1–5) for the current MCP session, with an optional comment.`,
    params: [
      { name: 'rating', type: 'number', required: true, description: `How helpful was this session? 1 = not helpful at all, 5 = extremely helpful` },
      { name: 'comment', type: 'string', required: false, description: `Optional additional feedback` },
    ],
  },
]
