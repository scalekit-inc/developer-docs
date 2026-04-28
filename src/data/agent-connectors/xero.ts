import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'xero_accounts_list',
    description: 'Retrieve the full chart of accounts for a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description:
          'Return records modified after this UTC datetime (ISO 8601). e.g. 2024-01-01T00:00:00',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Name ASC',
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Type=="BANK"',
      },
    ],
  },
  {
    name: 'xero_account_get',
    description: 'Retrieve a single account by its AccountID.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: 'AccountID GUID. Get it from xero_accounts_list.',
      },
    ],
  },
  {
    name: 'xero_account_create',
    description: 'Create a new account in the Xero chart of accounts.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'Code',
        type: 'string',
        required: true,
        description: 'Unique account code. e.g. 200',
      },
      {
        name: 'Name',
        type: 'string',
        required: true,
        description: 'Account name. e.g. My Savings Account',
      },
      { name: 'Type', type: 'string', required: true, description: 'Account type. e.g. BANK' },
      {
        name: 'BankAccountNumber',
        type: 'string',
        required: false,
        description: 'Bank account number. e.g. 01-0123-0123456-00',
      },
      {
        name: 'CurrencyCode',
        type: 'string',
        required: false,
        description: 'Currency code. e.g. NZD',
      },
      { name: 'Description', type: 'string', required: false, description: 'Account description.' },
      {
        name: 'EnablePaymentsToAccount',
        type: 'boolean',
        required: false,
        description: 'Allow payments to this account.',
      },
      { name: 'TaxType', type: 'string', required: false, description: 'Tax type. e.g. NONE' },
    ],
  },
  {
    name: 'xero_account_update',
    description: 'Update an existing account in the Xero chart of accounts.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: 'AccountID GUID. Get it from xero_accounts_list.',
      },
      { name: 'Code', type: 'string', required: false, description: 'Account code.' },
      { name: 'Description', type: 'string', required: false, description: 'Account description.' },
      {
        name: 'EnablePaymentsToAccount',
        type: 'boolean',
        required: false,
        description: 'Allow payments to this account.',
      },
      { name: 'Name', type: 'string', required: false, description: 'Account name.' },
      { name: 'TaxType', type: 'string', required: false, description: 'Tax type.' },
    ],
  },
  {
    name: 'xero_account_delete',
    description:
      'Archive (soft-delete) an account from the Xero chart of accounts by setting its status to ARCHIVED.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: 'AccountID GUID. Get it from xero_accounts_list.',
      },
    ],
  },
  {
    name: 'xero_contacts_list',
    description: 'Retrieve contacts (customers and suppliers) from a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: 'Return records modified after this UTC datetime (ISO 8601).',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Name ASC',
      },
      { name: 'page', type: 'number', required: false, description: 'Page number. e.g. 1' },
      {
        name: 'pageSize',
        type: 'number',
        required: false,
        description: 'Records per page. e.g. 100',
      },
      {
        name: 'searchTerm',
        type: 'string',
        required: false,
        description: 'Search term. e.g. Acme',
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. IsSupplier==true',
      },
    ],
  },
  {
    name: 'xero_contact_get',
    description: 'Retrieve a single contact by its ContactID.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: 'ContactID GUID. Get it from xero_contacts_list.',
      },
    ],
  },
  {
    name: 'xero_contact_create',
    description: 'Create a new contact (customer or supplier) in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      { name: 'Name', type: 'string', required: true, description: 'Contact name. e.g. Acme Corp' },
      {
        name: 'AccountNumber',
        type: 'string',
        required: false,
        description: 'Account number. e.g. CUST-001',
      },
      {
        name: 'Addresses',
        type: 'array',
        required: false,
        description: 'Array of address objects.',
      },
      {
        name: 'DefaultCurrency',
        type: 'string',
        required: false,
        description: 'Default currency code. e.g. NZD',
      },
      {
        name: 'EmailAddress',
        type: 'string',
        required: false,
        description: 'Email address. e.g. john@acme.com',
      },
      { name: 'FirstName', type: 'string', required: false, description: 'First name. e.g. John' },
      { name: 'IsCustomer', type: 'boolean', required: false, description: 'Mark as a customer.' },
      { name: 'IsSupplier', type: 'boolean', required: false, description: 'Mark as a supplier.' },
      { name: 'LastName', type: 'string', required: false, description: 'Last name. e.g. Smith' },
      { name: 'Phones', type: 'array', required: false, description: 'Array of phone objects.' },
    ],
  },
  {
    name: 'xero_contact_update',
    description: 'Update an existing contact in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: 'ContactID GUID. Get it from xero_contacts_list.',
      },
      {
        name: 'DefaultCurrency',
        type: 'string',
        required: false,
        description: 'Default currency code.',
      },
      { name: 'EmailAddress', type: 'string', required: false, description: 'Email address.' },
      { name: 'FirstName', type: 'string', required: false, description: 'First name.' },
      { name: 'IsCustomer', type: 'boolean', required: false, description: 'Mark as a customer.' },
      { name: 'IsSupplier', type: 'boolean', required: false, description: 'Mark as a supplier.' },
      { name: 'LastName', type: 'string', required: false, description: 'Last name.' },
      { name: 'Name', type: 'string', required: false, description: 'Contact name.' },
    ],
  },
  {
    name: 'xero_contact_groups_list',
    description: 'Retrieve all contact groups in a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Name ASC',
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Status=="ACTIVE"',
      },
    ],
  },
  {
    name: 'xero_contact_group_get',
    description: 'Retrieve a single contact group by its ContactGroupID.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'contact_group_id',
        type: 'string',
        required: true,
        description: 'ContactGroupID GUID. Get it from xero_contact_groups_list.',
      },
    ],
  },
  {
    name: 'xero_contact_group_create',
    description: 'Create a new contact group in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'Name',
        type: 'string',
        required: true,
        description: 'Group name. e.g. VIP Customers',
      },
    ],
  },
  {
    name: 'xero_contact_group_update',
    description: 'Update a contact group name in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'contact_group_id',
        type: 'string',
        required: true,
        description: 'ContactGroupID GUID. Get it from xero_contact_groups_list.',
      },
      { name: 'Name', type: 'string', required: true, description: 'New group name.' },
    ],
  },
  {
    name: 'xero_contact_group_delete',
    description: 'Delete (soft-delete) a contact group in Xero by setting its status to DELETED.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'contact_group_id',
        type: 'string',
        required: true,
        description: 'ContactGroupID GUID. Get it from xero_contact_groups_list.',
      },
    ],
  },
  {
    name: 'xero_invoices_list',
    description: 'Retrieve sales invoices and bills from a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'ContactIDs',
        type: 'string',
        required: false,
        description: 'Comma-separated ContactID GUIDs to filter by.',
      },
      {
        name: 'Statuses',
        type: 'string',
        required: false,
        description: 'Comma-separated statuses. e.g. AUTHORISED,SUBMITTED',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: 'Return records modified after this UTC datetime (ISO 8601).',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. DueDate ASC',
      },
      { name: 'page', type: 'number', required: false, description: 'Page number. e.g. 1' },
      {
        name: 'pageSize',
        type: 'number',
        required: false,
        description: 'Records per page. e.g. 100',
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Status=="AUTHORISED"',
      },
    ],
  },
  {
    name: 'xero_invoice_get',
    description: 'Retrieve a single invoice or bill by its InvoiceID.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'invoice_id',
        type: 'string',
        required: true,
        description: 'InvoiceID GUID. Get it from xero_invoices_list.',
      },
    ],
  },
  {
    name: 'xero_invoice_create',
    description: 'Create a new invoice (ACCREC) or bill (ACCPAY) in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'Contact',
        type: 'string',
        required: true,
        description: 'Contact object as JSON string with ContactID.',
      },
      {
        name: 'LineItems',
        type: 'array',
        required: true,
        description: 'Array of line item objects.',
      },
      {
        name: 'Type',
        type: 'string',
        required: true,
        description: 'ACCREC (invoice) or ACCPAY (bill).',
      },
      {
        name: 'CurrencyCode',
        type: 'string',
        required: false,
        description: 'Currency code. e.g. NZD',
      },
      {
        name: 'DueDate',
        type: 'string',
        required: false,
        description: 'Due date (YYYY-MM-DD). Required when authorising.',
      },
      {
        name: 'InvoiceNumber',
        type: 'string',
        required: false,
        description: 'Invoice number. e.g. INV-001',
      },
      { name: 'Reference', type: 'string', required: false, description: 'Reference. e.g. PO-123' },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. AUTHORISED' },
    ],
  },
  {
    name: 'xero_invoice_update',
    description:
      'Update an existing invoice or bill in Xero. DueDate is required when setting Status to AUTHORISED.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'invoice_id',
        type: 'string',
        required: true,
        description: 'InvoiceID GUID. Get it from xero_invoices_list.',
      },
      {
        name: 'DueDate',
        type: 'string',
        required: false,
        description: 'Due date (YYYY-MM-DD). Required when setting Status to AUTHORISED.',
      },
      {
        name: 'LineItems',
        type: 'array',
        required: false,
        description: 'Array of line item objects.',
      },
      { name: 'Reference', type: 'string', required: false, description: 'Reference.' },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. AUTHORISED' },
    ],
  },
  {
    name: 'xero_invoice_delete',
    description:
      'Void (soft-delete) an invoice or bill in Xero by setting its status to VOIDED. Only works on AUTHORISED or SUBMITTED invoices.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'invoice_id',
        type: 'string',
        required: true,
        description: 'InvoiceID GUID. Get it from xero_invoices_list.',
      },
    ],
  },
  {
    name: 'xero_credit_notes_list',
    description: 'Retrieve credit notes from a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: 'Return records modified after this UTC datetime (ISO 8601).',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Date DESC',
      },
      { name: 'page', type: 'number', required: false, description: 'Page number. e.g. 1' },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Status=="AUTHORISED"',
      },
    ],
  },
  {
    name: 'xero_credit_note_get',
    description: 'Retrieve a single credit note by its CreditNoteID.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'credit_note_id',
        type: 'string',
        required: true,
        description: 'CreditNoteID GUID. Get it from xero_credit_notes_list.',
      },
    ],
  },
  {
    name: 'xero_credit_note_create',
    description: 'Create a new credit note in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'Contact',
        type: 'string',
        required: true,
        description: 'Contact object as JSON string with ContactID.',
      },
      {
        name: 'LineItems',
        type: 'array',
        required: true,
        description: 'Array of line item objects.',
      },
      {
        name: 'Type',
        type: 'string',
        required: true,
        description: 'ACCRECCREDIT or ACCPAYCREDIT.',
      },
      {
        name: 'CurrencyCode',
        type: 'string',
        required: false,
        description: 'Currency code. e.g. NZD',
      },
      {
        name: 'Date',
        type: 'string',
        required: false,
        description: 'Credit note date (YYYY-MM-DD).',
      },
      { name: 'Reference', type: 'string', required: false, description: 'Reference. e.g. CN-001' },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. AUTHORISED' },
    ],
  },
  {
    name: 'xero_credit_note_update',
    description: 'Update an existing credit note in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'credit_note_id',
        type: 'string',
        required: true,
        description: 'CreditNoteID GUID. Get it from xero_credit_notes_list.',
      },
      { name: 'Reference', type: 'string', required: false, description: 'Reference. e.g. CN-002' },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. AUTHORISED' },
    ],
  },
  {
    name: 'xero_payments_list',
    description: 'Retrieve payments applied to invoices, credit notes, or prepayments in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: 'Return records modified after this UTC datetime (ISO 8601).',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Date DESC',
      },
      { name: 'page', type: 'number', required: false, description: 'Page number. e.g. 1' },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Status=="AUTHORISED"',
      },
    ],
  },
  {
    name: 'xero_overpayments_list',
    description: 'Retrieve overpayments from a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: 'Return records modified after this UTC datetime (ISO 8601).',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Date DESC',
      },
      { name: 'page', type: 'number', required: false, description: 'Page number. e.g. 1' },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Status=="AUTHORISED"',
      },
    ],
  },
  {
    name: 'xero_prepayments_list',
    description: 'Retrieve prepayments from a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: 'Return records modified after this UTC datetime (ISO 8601).',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Date DESC',
      },
      { name: 'page', type: 'number', required: false, description: 'Page number. e.g. 1' },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Status=="AUTHORISED"',
      },
    ],
  },
  {
    name: 'xero_batch_payments_list',
    description: 'Retrieve batch payments from a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: 'Return records modified after this UTC datetime (ISO 8601).',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Date DESC',
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Status=="AUTHORISED"',
      },
    ],
  },
  {
    name: 'xero_bank_transactions_list',
    description: 'Retrieve spend or receive money bank transactions from Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: 'Return records modified after this UTC datetime (ISO 8601).',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Date DESC',
      },
      { name: 'page', type: 'number', required: false, description: 'Page number. e.g. 1' },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Type=="SPEND"',
      },
    ],
  },
  {
    name: 'xero_bank_transfers_list',
    description: 'Retrieve bank transfers between accounts in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: 'Return records modified after this UTC datetime (ISO 8601).',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Date DESC',
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Amount>100',
      },
    ],
  },
  {
    name: 'xero_items_list',
    description: 'Retrieve inventory items from a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: 'Return records modified after this UTC datetime (ISO 8601).',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Name ASC',
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. IsTrackedAsInventory==true',
      },
    ],
  },
  {
    name: 'xero_item_get',
    description: 'Retrieve a single item by its ItemID or Code.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: 'ItemID GUID or item Code. Get it from xero_items_list.',
      },
    ],
  },
  {
    name: 'xero_item_create',
    description: 'Create a new inventory item in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'Code',
        type: 'string',
        required: true,
        description: 'Unique item code. e.g. ITEM-001',
      },
      {
        name: 'Description',
        type: 'string',
        required: false,
        description: 'Item description. e.g. Blue widget',
      },
      {
        name: 'InventoryAssetAccountCode',
        type: 'string',
        required: false,
        description: 'Inventory asset account code. e.g. 630',
      },
      {
        name: 'IsTrackedAsInventory',
        type: 'boolean',
        required: false,
        description: 'Track as inventory.',
      },
      { name: 'Name', type: 'string', required: false, description: 'Item name. e.g. Widget A' },
      {
        name: 'PurchaseDescription',
        type: 'string',
        required: false,
        description: 'Purchase description.',
      },
      {
        name: 'PurchaseDetails',
        type: 'string',
        required: false,
        description: 'Purchase details JSON. e.g. {"UnitPrice":5.00,"AccountCode":"300"}',
      },
      {
        name: 'SalesDetails',
        type: 'string',
        required: false,
        description: 'Sales details JSON. e.g. {"UnitPrice":9.99,"AccountCode":"200"}',
      },
    ],
  },
  {
    name: 'xero_item_update',
    description: 'Update an existing inventory item in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: 'ItemID GUID. Get it from xero_items_list.',
      },
      { name: 'Code', type: 'string', required: true, description: 'Item code. e.g. ITEM-001' },
      { name: 'Description', type: 'string', required: false, description: 'Item description.' },
      { name: 'Name', type: 'string', required: false, description: 'Item name.' },
      {
        name: 'PurchaseDescription',
        type: 'string',
        required: false,
        description: 'Purchase description.',
      },
      {
        name: 'PurchaseDetails',
        type: 'string',
        required: false,
        description: 'Purchase details JSON.',
      },
      { name: 'SalesDetails', type: 'string', required: false, description: 'Sales details JSON.' },
    ],
  },
  {
    name: 'xero_item_delete',
    description: 'Delete an inventory item from Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: 'ItemID GUID. Get it from xero_items_list.',
      },
    ],
  },
  {
    name: 'xero_purchase_orders_list',
    description: 'Retrieve purchase orders from a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'DateFrom',
        type: 'string',
        required: false,
        description: 'Start date (YYYY-MM-DD).',
      },
      { name: 'DateTo', type: 'string', required: false, description: 'End date (YYYY-MM-DD).' },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: 'Status filter. e.g. AUTHORISED',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. PurchaseOrderNumber ASC',
      },
      { name: 'page', type: 'number', required: false, description: 'Page number. e.g. 1' },
    ],
  },
  {
    name: 'xero_purchase_order_get',
    description: 'Retrieve a single purchase order by its PurchaseOrderID.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'purchase_order_id',
        type: 'string',
        required: true,
        description: 'PurchaseOrderID GUID. Get it from xero_purchase_orders_list.',
      },
    ],
  },
  {
    name: 'xero_purchase_order_create',
    description: 'Create a new purchase order in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'Contact',
        type: 'string',
        required: true,
        description: 'Contact object as JSON string with ContactID.',
      },
      {
        name: 'LineItems',
        type: 'array',
        required: true,
        description: 'Array of line item objects.',
      },
      {
        name: 'CurrencyCode',
        type: 'string',
        required: false,
        description: 'Currency code. e.g. NZD',
      },
      { name: 'Date', type: 'string', required: false, description: 'Order date (YYYY-MM-DD).' },
      {
        name: 'DeliveryDate',
        type: 'string',
        required: false,
        description: 'Delivery date (YYYY-MM-DD).',
      },
      {
        name: 'PurchaseOrderNumber',
        type: 'string',
        required: false,
        description: 'PO number. e.g. PO-001',
      },
      {
        name: 'Reference',
        type: 'string',
        required: false,
        description: 'Reference. e.g. Ref-001',
      },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. DRAFT' },
    ],
  },
  {
    name: 'xero_purchase_order_update',
    description: 'Update an existing purchase order in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'purchase_order_id',
        type: 'string',
        required: true,
        description: 'PurchaseOrderID GUID. Get it from xero_purchase_orders_list.',
      },
      {
        name: 'DeliveryDate',
        type: 'string',
        required: false,
        description: 'Delivery date (YYYY-MM-DD).',
      },
      {
        name: 'LineItems',
        type: 'array',
        required: false,
        description: 'Array of line item objects.',
      },
      { name: 'Reference', type: 'string', required: false, description: 'Reference.' },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. AUTHORISED' },
    ],
  },
  {
    name: 'xero_quotes_list',
    description: 'Retrieve quotes from a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'ContactID',
        type: 'string',
        required: false,
        description: 'Filter by ContactID GUID.',
      },
      {
        name: 'DateFrom',
        type: 'string',
        required: false,
        description: 'Start date (YYYY-MM-DD).',
      },
      { name: 'DateTo', type: 'string', required: false, description: 'End date (YYYY-MM-DD).' },
      { name: 'Status', type: 'string', required: false, description: 'Status filter. e.g. SENT' },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Date DESC',
      },
      { name: 'page', type: 'number', required: false, description: 'Page number. e.g. 1' },
    ],
  },
  {
    name: 'xero_quote_get',
    description: 'Retrieve a single quote by its QuoteID.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'quote_id',
        type: 'string',
        required: true,
        description: 'QuoteID GUID. Get it from xero_quotes_list.',
      },
    ],
  },
  {
    name: 'xero_quote_create',
    description: 'Create a new quote in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'Contact',
        type: 'string',
        required: true,
        description: 'Contact object as JSON string with ContactID.',
      },
      { name: 'Date', type: 'string', required: true, description: 'Quote date (YYYY-MM-DD).' },
      {
        name: 'LineItems',
        type: 'array',
        required: true,
        description: 'Array of line item objects.',
      },
      {
        name: 'CurrencyCode',
        type: 'string',
        required: false,
        description: 'Currency code. e.g. NZD',
      },
      {
        name: 'ExpiryDate',
        type: 'string',
        required: false,
        description: 'Expiry date (YYYY-MM-DD).',
      },
      {
        name: 'QuoteNumber',
        type: 'string',
        required: false,
        description: 'Quote number. e.g. QU-001',
      },
      { name: 'Reference', type: 'string', required: false, description: 'Reference.' },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. DRAFT' },
      { name: 'Summary', type: 'string', required: false, description: 'Summary of services.' },
      {
        name: 'Title',
        type: 'string',
        required: false,
        description: 'Quote title. e.g. Service Proposal',
      },
    ],
  },
  {
    name: 'xero_quote_update',
    description: 'Update an existing quote in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'quote_id',
        type: 'string',
        required: true,
        description: 'QuoteID GUID. Get it from xero_quotes_list.',
      },
      {
        name: 'Contact',
        type: 'string',
        required: true,
        description: 'Contact object as JSON string with ContactID.',
      },
      { name: 'Date', type: 'string', required: true, description: 'Quote date (YYYY-MM-DD).' },
      {
        name: 'ExpiryDate',
        type: 'string',
        required: false,
        description: 'Expiry date (YYYY-MM-DD).',
      },
      {
        name: 'LineItems',
        type: 'array',
        required: false,
        description: 'Array of line item objects.',
      },
      { name: 'Reference', type: 'string', required: false, description: 'Reference.' },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. SENT' },
    ],
  },
  {
    name: 'xero_repeating_invoices_list',
    description: 'Retrieve repeating invoice templates from a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Type ASC',
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Status=="AUTHORISED"',
      },
    ],
  },
  {
    name: 'xero_manual_journals_list',
    description: 'Retrieve manual journals from a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: 'Return records modified after this UTC datetime (ISO 8601).',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Date DESC',
      },
      { name: 'page', type: 'number', required: false, description: 'Page number. e.g. 1' },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Status=="POSTED"',
      },
    ],
  },
  {
    name: 'xero_manual_journal_get',
    description: 'Retrieve a single manual journal by its ManualJournalID.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'manual_journal_id',
        type: 'string',
        required: true,
        description: 'ManualJournalID GUID. Get it from xero_manual_journals_list.',
      },
    ],
  },
  {
    name: 'xero_manual_journal_create',
    description: 'Create a new manual journal entry in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'JournalLines',
        type: 'array',
        required: true,
        description: 'Array of journal line objects.',
      },
      {
        name: 'Narration',
        type: 'string',
        required: true,
        description: 'Journal narration. e.g. Year-end adjustment',
      },
      { name: 'Date', type: 'string', required: false, description: 'Journal date (YYYY-MM-DD).' },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. DRAFT' },
    ],
  },
  {
    name: 'xero_manual_journal_update',
    description:
      'Update an existing manual journal in Xero. JournalLines are required when setting Status to POSTED.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'manual_journal_id',
        type: 'string',
        required: true,
        description: 'ManualJournalID GUID. Get it from xero_manual_journals_list.',
      },
      { name: 'Date', type: 'string', required: false, description: 'Journal date (YYYY-MM-DD).' },
      {
        name: 'JournalLines',
        type: 'array',
        required: false,
        description: 'Array of journal line objects. Required when setting Status to POSTED.',
      },
      { name: 'Narration', type: 'string', required: false, description: 'Journal narration.' },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. POSTED' },
    ],
  },
  {
    name: 'xero_employees_list',
    description: 'Retrieve employees from a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: 'Return records modified after this UTC datetime (ISO 8601).',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. LastName ASC',
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Status=="ACTIVE"',
      },
    ],
  },
  {
    name: 'xero_employee_get',
    description: 'Retrieve a single employee by their EmployeeID.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'employee_id',
        type: 'string',
        required: true,
        description: 'EmployeeID GUID. Get it from xero_employees_list.',
      },
    ],
  },
  {
    name: 'xero_employee_create',
    description: 'Create a new employee record in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      { name: 'FirstName', type: 'string', required: true, description: 'First name. e.g. Jane' },
      { name: 'LastName', type: 'string', required: true, description: 'Last name. e.g. Doe' },
      { name: 'ExternalLink', type: 'string', required: false, description: 'External link URL.' },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. ACTIVE' },
    ],
  },
  {
    name: 'xero_employee_update',
    description: 'Update an existing employee in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'employee_id',
        type: 'string',
        required: true,
        description: 'EmployeeID GUID. Get it from xero_employees_list.',
      },
      { name: 'FirstName', type: 'string', required: false, description: 'First name.' },
      { name: 'LastName', type: 'string', required: false, description: 'Last name.' },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. TERMINATED' },
    ],
  },
  {
    name: 'xero_currencies_list',
    description: 'Retrieve enabled currencies for a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Code ASC',
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Code=="USD"',
      },
    ],
  },
  {
    name: 'xero_tax_rates_list',
    description: 'Retrieve tax rates from a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'TaxType',
        type: 'string',
        required: false,
        description: 'Filter by tax type. e.g. OUTPUT2',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Name ASC',
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Status=="ACTIVE"',
      },
    ],
  },
  {
    name: 'xero_tax_rate_create',
    description: 'Create a new tax rate in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'Name',
        type: 'string',
        required: true,
        description: 'Tax rate name. e.g. GST on Expenses',
      },
      {
        name: 'TaxComponents',
        type: 'array',
        required: true,
        description: 'Array of tax component objects.',
      },
    ],
  },
  {
    name: 'xero_tax_rate_update',
    description: 'Update an existing tax rate in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'TaxComponents',
        type: 'array',
        required: true,
        description:
          'Array of tax component objects. e.g. [{"Name":"Tax","Rate":15,"IsCompound":false}]',
      },
      {
        name: 'TaxType',
        type: 'string',
        required: true,
        description: 'Tax type identifier. e.g. OUTPUT2',
      },
      {
        name: 'Name',
        type: 'string',
        required: false,
        description: 'Tax rate name. e.g. GST on Sales',
      },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. ACTIVE' },
    ],
  },
  {
    name: 'xero_tracking_categories_list',
    description: 'Retrieve tracking categories and their options from Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. Name ASC',
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. Status=="ACTIVE"',
      },
    ],
  },
  {
    name: 'xero_tracking_category_update',
    description: 'Update a tracking category name or status in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'tracking_category_id',
        type: 'string',
        required: true,
        description: 'TrackingCategoryID GUID. Get it from xero_tracking_categories_list.',
      },
      {
        name: 'Name',
        type: 'string',
        required: false,
        description: 'Category name. e.g. Department',
      },
      { name: 'Status', type: 'string', required: false, description: 'Status. e.g. ACTIVE' },
    ],
  },
  {
    name: 'xero_tracking_category_delete',
    description: 'Delete a tracking category from Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'tracking_category_id',
        type: 'string',
        required: true,
        description: 'TrackingCategoryID GUID. Get it from xero_tracking_categories_list.',
      },
    ],
  },
  {
    name: 'xero_tracking_option_create',
    description: 'Create a new option within a tracking category in Xero.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'tracking_category_id',
        type: 'string',
        required: true,
        description: 'TrackingCategoryID GUID. Get it from xero_tracking_categories_list.',
      },
      { name: 'Name', type: 'string', required: true, description: 'Option name. e.g. North' },
    ],
  },
  {
    name: 'xero_users_list',
    description: 'Retrieve users of a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: 'Return records modified after this UTC datetime (ISO 8601).',
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: 'Order results. e.g. LastName ASC',
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: 'Filter expression. e.g. IsSubscriber==true',
      },
    ],
  },
  {
    name: 'xero_user_get',
    description: 'Retrieve a single Xero organisation user by their UserID.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: 'UserID GUID. Get it from xero_users_list.',
      },
    ],
  },
  {
    name: 'xero_report_balance_sheet',
    description: 'Retrieve the Balance Sheet report for a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'date',
        type: 'string',
        required: false,
        description: 'Report date (YYYY-MM-DD). e.g. 2024-06-30',
      },
      {
        name: 'periods',
        type: 'number',
        required: false,
        description: 'Number of comparison periods. e.g. 3',
      },
      {
        name: 'standardLayout',
        type: 'boolean',
        required: false,
        description: 'Use standard layout.',
      },
      {
        name: 'timeframe',
        type: 'string',
        required: false,
        description: 'Comparison timeframe. e.g. MONTH',
      },
      {
        name: 'trackingCategoryID',
        type: 'string',
        required: false,
        description: 'Filter by tracking category GUID.',
      },
    ],
  },
  {
    name: 'xero_report_profit_and_loss',
    description: 'Retrieve the Profit and Loss report for a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'fromDate',
        type: 'string',
        required: false,
        description: 'Start date (YYYY-MM-DD). e.g. 2024-01-01',
      },
      {
        name: 'periods',
        type: 'number',
        required: false,
        description: 'Number of comparison periods. e.g. 3',
      },
      {
        name: 'standardLayout',
        type: 'boolean',
        required: false,
        description: 'Use standard layout.',
      },
      {
        name: 'timeframe',
        type: 'string',
        required: false,
        description: 'Comparison timeframe. e.g. MONTH',
      },
      {
        name: 'toDate',
        type: 'string',
        required: false,
        description: 'End date (YYYY-MM-DD). e.g. 2024-06-30',
      },
      {
        name: 'trackingCategoryID',
        type: 'string',
        required: false,
        description: 'Filter by tracking category GUID.',
      },
    ],
  },
  {
    name: 'xero_report_trial_balance',
    description: 'Retrieve the Trial Balance report for a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'date',
        type: 'string',
        required: false,
        description: 'Report date (YYYY-MM-DD). e.g. 2024-06-30',
      },
      {
        name: 'paymentsOnly',
        type: 'boolean',
        required: false,
        description: 'Include only payment transactions.',
      },
    ],
  },
  {
    name: 'xero_report_aged_payables',
    description: 'Retrieve the Aged Payables Outstanding report for a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'contactID',
        type: 'string',
        required: true,
        description: 'ContactID GUID to report on. Get it from xero_contacts_list.',
      },
      {
        name: 'date',
        type: 'string',
        required: false,
        description: 'Report date (YYYY-MM-DD). e.g. 2024-06-30',
      },
      {
        name: 'fromDate',
        type: 'string',
        required: false,
        description: 'Start date (YYYY-MM-DD).',
      },
      { name: 'toDate', type: 'string', required: false, description: 'End date (YYYY-MM-DD).' },
    ],
  },
  {
    name: 'xero_report_aged_receivables',
    description: 'Retrieve the Aged Receivables Outstanding report for a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'contactID',
        type: 'string',
        required: true,
        description: 'ContactID GUID to report on. Get it from xero_contacts_list.',
      },
      {
        name: 'date',
        type: 'string',
        required: false,
        description: 'Report date (YYYY-MM-DD). e.g. 2024-06-30',
      },
      {
        name: 'fromDate',
        type: 'string',
        required: false,
        description: 'Start date (YYYY-MM-DD).',
      },
      { name: 'toDate', type: 'string', required: false, description: 'End date (YYYY-MM-DD).' },
    ],
  },
  {
    name: 'xero_report_bank_summary',
    description: 'Retrieve the Bank Summary report for a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'fromDate',
        type: 'string',
        required: false,
        description: 'Start date (YYYY-MM-DD). e.g. 2024-01-01',
      },
      {
        name: 'toDate',
        type: 'string',
        required: false,
        description: 'End date (YYYY-MM-DD). e.g. 2024-06-30',
      },
    ],
  },
  {
    name: 'xero_report_executive_summary',
    description: 'Retrieve the Executive Summary report for a Xero organisation.',
    params: [
      {
        name: 'xero_tenant_id',
        type: 'string',
        required: false,
        description: 'Xero tenant (organisation) ID. Injected automatically by Scalekit — you do not need to supply this.',
      },
      {
        name: 'date',
        type: 'string',
        required: false,
        description: 'Report date (YYYY-MM-DD). e.g. 2024-06-01',
      },
    ],
  },
]
