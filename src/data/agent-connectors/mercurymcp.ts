import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mercurymcp_getaccount',
    description: `Retrieve details of a specific Mercury account by its ID.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `Mercury account ID. Get it from Get Accounts.`,
      },
    ],
  },
  {
    name: 'mercurymcp_getaccountcards',
    description: `Retrieve all debit and credit cards associated with a specific account.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `Mercury account ID. Get it from Get Accounts.`,
      },
    ],
  },
  {
    name: 'mercurymcp_getaccounts',
    description: `Retrieve a paginated list of all Mercury accounts for the organization.`,
    params: [
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Cursor to fetch the page before this position.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Cursor from the previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'mercurymcp_getaccountstatements',
    description: `Retrieve a paginated list of monthly statements for a specific account.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `Mercury account ID. Get it from Get Accounts.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `Filter by end date (YYYY-MM-DD).`,
      },
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Cursor to fetch the page before this position.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Filter by start date (YYYY-MM-DD).`,
      },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Cursor from the previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'mercurymcp_getattachment',
    description: `Retrieve attachment details including the download URL.`,
    params: [
      {
        name: 'attachmentId',
        type: 'string',
        required: true,
        description: `Mercury attachment ID.`,
      },
    ],
  },
  {
    name: 'mercurymcp_getcurrentdate',
    description: `Get the current date and time.`,
    params: [],
  },
  {
    name: 'mercurymcp_getcustomer',
    description: `Retrieve details of a specific customer by their ID.`,
    params: [
      {
        name: 'customerId',
        type: 'string',
        required: true,
        description: `Mercury customer ID. Get it from List Customers.`,
      },
    ],
  },
  {
    name: 'mercurymcp_getinvoice',
    description: `Retrieve details of an invoice by its ID.`,
    params: [
      {
        name: 'invoiceId',
        type: 'string',
        required: true,
        description: `Mercury invoice ID. Get it from List Invoices.`,
      },
    ],
  },
  {
    name: 'mercurymcp_getorganization',
    description: `Retrieve organization details including EIN, legal business name, and DBAs.`,
    params: [],
  },
  {
    name: 'mercurymcp_getrecipient',
    description: `Retrieve details of a specific payment recipient by their ID.`,
    params: [
      {
        name: 'recipientId',
        type: 'string',
        required: true,
        description: `Mercury recipient ID. Get it from Get Recipients.`,
      },
    ],
  },
  {
    name: 'mercurymcp_getrecipients',
    description: `Retrieve a paginated list of all payment recipients.`,
    params: [
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Cursor to fetch the page before this position.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Cursor from the previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'mercurymcp_getsaferequest',
    description: `Retrieve a specific SAFE (Simple Agreement for Future Equity) request by its ID.`,
    params: [
      {
        name: 'safeRequestId',
        type: 'string',
        required: true,
        description: `Mercury SAFE request ID. Get it from Get SAFE Requests.`,
      },
    ],
  },
  {
    name: 'mercurymcp_getsaferequests',
    description: `Retrieve all SAFE requests for the organization.`,
    params: [],
  },
  {
    name: 'mercurymcp_gettransaction',
    description: `Retrieve a transaction by account ID and transaction ID.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `Mercury account ID. Get it from Get Accounts.`,
      },
      {
        name: 'transactionId',
        type: 'string',
        required: true,
        description: `Mercury transaction ID. Get it from List Transactions.`,
      },
    ],
  },
  {
    name: 'mercurymcp_gettransactionbyid',
    description: `Retrieve a single transaction by its ID including attachments and check images.`,
    params: [
      {
        name: 'transactionId',
        type: 'string',
        required: true,
        description: `Mercury transaction ID. Get it from List Transactions.`,
      },
    ],
  },
  {
    name: 'mercurymcp_gettreasury',
    description: `Retrieve a paginated list of all treasury accounts for the organization.`,
    params: [
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Cursor to fetch the page before this position.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Cursor from the previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'mercurymcp_gettreasurystatements',
    description: `Retrieve a paginated list of statements for a specific treasury account.`,
    params: [
      {
        name: 'treasuryId',
        type: 'string',
        required: true,
        description: `Mercury treasury account ID. Get it from Get Treasury.`,
      },
      {
        name: 'documentType',
        type: 'string',
        required: false,
        description: `Filter statements by document type.`,
      },
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Cursor to fetch the page before this position.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Cursor from the previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'mercurymcp_gettreasurytransactions',
    description: `Retrieve paginated transactions for a specific treasury account.`,
    params: [
      {
        name: 'treasuryId',
        type: 'string',
        required: true,
        description: `Mercury treasury account ID. Get it from Get Treasury.`,
      },
      {
        name: 'cursor',
        type: 'number',
        required: false,
        description: `Numeric pagination cursor from the previous response.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order: asc or desc.` },
    ],
  },
  {
    name: 'mercurymcp_getuser',
    description: `Retrieve details of a specific user by their ID.`,
    params: [
      {
        name: 'userId',
        type: 'string',
        required: true,
        description: `Mercury user ID. Get it from Get Users.`,
      },
    ],
  },
  {
    name: 'mercurymcp_getusers',
    description: `Retrieve a paginated list of all users in the organization.`,
    params: [
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Cursor to fetch the page before this position.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Cursor from the previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'mercurymcp_getwebhook',
    description: `Retrieve details of a specific webhook endpoint by its ID.`,
    params: [
      {
        name: 'webhookEndpointId',
        type: 'string',
        required: true,
        description: `Mercury webhook endpoint ID. Get it from Get Webhooks.`,
      },
    ],
  },
  {
    name: 'mercurymcp_getwebhooks',
    description: `Retrieve a paginated list of all webhook endpoints with optional status filtering.`,
    params: [
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Cursor to fetch the page before this position.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Cursor from the previous response to fetch the next page.`,
      },
      { name: 'status', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'mercurymcp_listcategories',
    description: `Retrieve a paginated list of all custom expense categories for the organization.`,
    params: [
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Cursor to fetch the page before this position.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Cursor from the previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'mercurymcp_listcredit',
    description: `Retrieve a list of all credit accounts for the organization.`,
    params: [],
  },
  {
    name: 'mercurymcp_listcustomers',
    description: `Retrieve a paginated list of all customers.`,
    params: [
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Cursor to fetch the page before this position.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Cursor from the previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'mercurymcp_listinvoiceattachments',
    description: `Retrieve all attachments for a specific invoice.`,
    params: [
      {
        name: 'invoiceId',
        type: 'string',
        required: true,
        description: `Mercury invoice ID. Get it from List Invoices.`,
      },
    ],
  },
  {
    name: 'mercurymcp_listinvoices',
    description: `Retrieve a paginated list of all invoices.`,
    params: [
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Cursor to fetch the page before this position.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Cursor from the previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'mercurymcp_listrecipientsattachments',
    description: `Retrieve a paginated list of all recipient tax form attachments across the organization.`,
    params: [
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Cursor to fetch the page before this position.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Cursor from the previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'mercurymcp_listsendmoneyapprovalrequests',
    description: `Retrieve a paginated list of send money approval requests with optional filtering.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Mercury account ID. Get it from Get Accounts.`,
      },
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Cursor to fetch the page before this position.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Cursor from the previous response to fetch the next page.`,
      },
      { name: 'status', type: 'string', required: false, description: `Filter by status.` },
    ],
  },
  {
    name: 'mercurymcp_listtransactions',
    description: `Retrieve a paginated list of transactions across all accounts with advanced filtering.`,
    params: [
      { name: 'accountId', type: 'array', required: false, description: `No description.` },
      { name: 'cardId', type: 'array', required: false, description: `No description.` },
      {
        name: 'categoryId',
        type: 'string',
        required: false,
        description: `Filter by custom expense category ID.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `Filter by end date (YYYY-MM-DD).`,
      },
      {
        name: 'end_before',
        type: 'string',
        required: false,
        description: `Cursor to fetch the page before this position.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      {
        name: 'mercuryCategory',
        type: 'string',
        required: false,
        description: `Filter by Mercury built-in transaction category.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'postedEnd',
        type: 'string',
        required: false,
        description: `Filter transactions posted on or before this date (YYYY-MM-DD).`,
      },
      {
        name: 'postedStart',
        type: 'string',
        required: false,
        description: `Filter transactions posted on or after this date (YYYY-MM-DD).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter transactions by description or counterparty.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Filter by start date (YYYY-MM-DD).`,
      },
      {
        name: 'start_after',
        type: 'string',
        required: false,
        description: `Cursor from the previous response to fetch the next page.`,
      },
      {
        name: 'start_at',
        type: 'string',
        required: false,
        description: `Filter by start datetime (ISO 8601).`,
      },
      { name: 'status', type: 'array', required: false, description: `No description.` },
    ],
  },
]
