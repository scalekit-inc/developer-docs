import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'xero_account_create',
    description: `Create a new account in the Xero chart of accounts.`,
    params: [
      {
        name: 'Code',
        type: 'string',
        required: true,
        description: `Customer defined alpha numeric account code.`,
      },
      { name: 'Name', type: 'string', required: true, description: `Name of the account.` },
      {
        name: 'Type',
        type: 'string',
        required: true,
        description: `Account type (e.g. BANK, CURRENT, EQUITY, EXPENSE, FIXED, LIABILITY, OTHERINCOME, OVERHEADS, PREPAYMENT, REVENUE, SALES, TERMLIAB, PAYGLIABILITY).`,
      },
      {
        name: 'BankAccountNumber',
        type: 'string',
        required: false,
        description: `For bank accounts, the bank account number.`,
      },
      {
        name: 'CurrencyCode',
        type: 'string',
        required: false,
        description: `For bank accounts, the currency of the account.`,
      },
      {
        name: 'Description',
        type: 'string',
        required: false,
        description: `Description of the account.`,
      },
      {
        name: 'EnablePaymentsToAccount',
        type: 'boolean',
        required: false,
        description: `If true, payments can be made to this account.`,
      },
      {
        name: 'TaxType',
        type: 'string',
        required: false,
        description: `Default tax type for the account.`,
      },
    ],
  },
  {
    name: 'xero_account_delete',
    description: `Archive (soft-delete) an account from the Xero chart of accounts by setting its status to ARCHIVED.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Xero account GUID to archive.`,
      },
    ],
  },
  {
    name: 'xero_account_get',
    description: `Retrieve a single account by its AccountID.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Xero account GUID.` },
    ],
  },
  {
    name: 'xero_account_update',
    description: `Update an existing account in the Xero chart of accounts.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Xero account GUID.` },
      { name: 'Code', type: 'string', required: false, description: `Updated account code.` },
      { name: 'Description', type: 'string', required: false, description: `Updated description.` },
      {
        name: 'EnablePaymentsToAccount',
        type: 'boolean',
        required: false,
        description: `Enable/disable payments to account.`,
      },
      {
        name: 'Name',
        type: 'string',
        required: false,
        description: `Updated name of the account.`,
      },
      { name: 'TaxType', type: 'string', required: false, description: `Updated tax type.` },
    ],
  },
  {
    name: 'xero_accounts_list',
    description: `Retrieve the full chart of accounts for a Xero organisation.`,
    params: [
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Return records modified after this UTC datetime (ISO 8601).`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `Order results (e.g. Name ASC).`,
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: `Filter expression (e.g. Type=="BANK").`,
      },
    ],
  },
  {
    name: 'xero_bank_transactions_list',
    description: `Retrieve spend or receive money bank transactions from Xero.`,
    params: [
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Modified after UTC datetime.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'page', type: 'number', required: false, description: `Page number.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_bank_transfers_list',
    description: `Retrieve bank transfers between accounts in Xero.`,
    params: [
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Modified after UTC datetime.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_batch_payments_list',
    description: `Retrieve batch payments from a Xero organisation.`,
    params: [
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Modified after UTC datetime.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_contact_create',
    description: `Create a new contact (customer or supplier) in Xero.`,
    params: [
      {
        name: 'Name',
        type: 'string',
        required: true,
        description: `Full name of the contact / company.`,
      },
      {
        name: 'AccountNumber',
        type: 'string',
        required: false,
        description: `Unique account number for this contact.`,
      },
      {
        name: 'Addresses',
        type: 'array',
        required: false,
        description: `Array of address objects.`,
      },
      {
        name: 'DefaultCurrency',
        type: 'string',
        required: false,
        description: `Default currency for this contact.`,
      },
      {
        name: 'EmailAddress',
        type: 'string',
        required: false,
        description: `Email address of the contact.`,
      },
      {
        name: 'FirstName',
        type: 'string',
        required: false,
        description: `First name of primary contact person.`,
      },
      {
        name: 'IsCustomer',
        type: 'boolean',
        required: false,
        description: `True if contact is a customer.`,
      },
      {
        name: 'IsSupplier',
        type: 'boolean',
        required: false,
        description: `True if contact is a supplier.`,
      },
      {
        name: 'LastName',
        type: 'string',
        required: false,
        description: `Last name of primary contact person.`,
      },
      {
        name: 'Phones',
        type: 'array',
        required: false,
        description: `Array of phone objects e.g. [{"PhoneType":"DEFAULT","PhoneNumber":"021-123456"}].`,
      },
    ],
  },
  {
    name: 'xero_contact_get',
    description: `Retrieve a single contact by its ContactID.`,
    params: [
      { name: 'contact_id', type: 'string', required: true, description: `Xero contact GUID.` },
    ],
  },
  {
    name: 'xero_contact_group_create',
    description: `Create a new contact group in Xero.`,
    params: [
      { name: 'Name', type: 'string', required: true, description: `Name of the contact group.` },
    ],
  },
  {
    name: 'xero_contact_group_delete',
    description: `Delete (soft-delete) a contact group in Xero by setting its status to DELETED.`,
    params: [
      {
        name: 'contact_group_id',
        type: 'string',
        required: true,
        description: `Xero contact group GUID to delete.`,
      },
    ],
  },
  {
    name: 'xero_contact_group_get',
    description: `Retrieve a single contact group by its ContactGroupID.`,
    params: [
      {
        name: 'contact_group_id',
        type: 'string',
        required: true,
        description: `Xero contact group GUID.`,
      },
    ],
  },
  {
    name: 'xero_contact_group_update',
    description: `Update a contact group name in Xero.`,
    params: [
      {
        name: 'contact_group_id',
        type: 'string',
        required: true,
        description: `Xero contact group GUID.`,
      },
      {
        name: 'Name',
        type: 'string',
        required: true,
        description: `New name for the contact group.`,
      },
    ],
  },
  {
    name: 'xero_contact_groups_list',
    description: `Retrieve all contact groups in a Xero organisation.`,
    params: [
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_contact_update',
    description: `Update an existing contact in Xero.`,
    params: [
      { name: 'contact_id', type: 'string', required: true, description: `Xero contact GUID.` },
      {
        name: 'DefaultCurrency',
        type: 'string',
        required: false,
        description: `Updated default currency.`,
      },
      {
        name: 'EmailAddress',
        type: 'string',
        required: false,
        description: `Updated email address.`,
      },
      { name: 'FirstName', type: 'string', required: false, description: `Updated first name.` },
      {
        name: 'IsCustomer',
        type: 'boolean',
        required: false,
        description: `Update customer flag.`,
      },
      {
        name: 'IsSupplier',
        type: 'boolean',
        required: false,
        description: `Update supplier flag.`,
      },
      { name: 'LastName', type: 'string', required: false, description: `Updated last name.` },
      { name: 'Name', type: 'string', required: false, description: `Updated name.` },
    ],
  },
  {
    name: 'xero_contacts_list',
    description: `Retrieve contacts (customers and suppliers) from a Xero organisation.`,
    params: [
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Return contacts modified after this UTC datetime.`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `Sort order (e.g. Name ASC).`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number for pagination.` },
      {
        name: 'pageSize',
        type: 'number',
        required: false,
        description: `Number of records per page (max 1000).`,
      },
      {
        name: 'searchTerm',
        type: 'string',
        required: false,
        description: `Search term to filter contacts by name or email.`,
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: `Filter expression (e.g. IsSupplier==true).`,
      },
    ],
  },
  {
    name: 'xero_credit_note_create',
    description: `Create a new credit note in Xero.`,
    params: [
      {
        name: 'Contact',
        type: 'string',
        required: true,
        description: `Contact object e.g. {"ContactID":"guid"}.`,
      },
      {
        name: 'LineItems',
        type: 'array',
        required: true,
        description: `Array of line item objects.`,
      },
      {
        name: 'Type',
        type: 'string',
        required: true,
        description: `Credit note type: ACCRECCREDIT (sales credit) or ACCPAYCREDIT (purchase credit).`,
      },
      { name: 'CurrencyCode', type: 'string', required: false, description: `Currency code.` },
      {
        name: 'Date',
        type: 'string',
        required: false,
        description: `Date of credit note (YYYY-MM-DD).`,
      },
      { name: 'Reference', type: 'string', required: false, description: `Reference number.` },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `Status: DRAFT or AUTHORISED.`,
      },
    ],
  },
  {
    name: 'xero_credit_note_get',
    description: `Retrieve a single credit note by its CreditNoteID.`,
    params: [
      {
        name: 'credit_note_id',
        type: 'string',
        required: true,
        description: `Xero credit note GUID.`,
      },
    ],
  },
  {
    name: 'xero_credit_note_update',
    description: `Update an existing credit note in Xero.`,
    params: [
      {
        name: 'credit_note_id',
        type: 'string',
        required: true,
        description: `Xero credit note GUID.`,
      },
      { name: 'Reference', type: 'string', required: false, description: `Updated reference.` },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `New status (DRAFT, AUTHORISED, VOIDED).`,
      },
    ],
  },
  {
    name: 'xero_credit_notes_list',
    description: `Retrieve credit notes from a Xero organisation.`,
    params: [
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Modified after UTC datetime.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'page', type: 'number', required: false, description: `Page number.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_currencies_list',
    description: `Retrieve enabled currencies for a Xero organisation.`,
    params: [
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_employee_create',
    description: `Create a new employee record in Xero.`,
    params: [
      {
        name: 'FirstName',
        type: 'string',
        required: true,
        description: `First name of the employee.`,
      },
      {
        name: 'LastName',
        type: 'string',
        required: true,
        description: `Last name of the employee.`,
      },
      {
        name: 'ExternalLink',
        type: 'string',
        required: false,
        description: `Link to employee in external system e.g. {"Url":"https://...","Description":"Employee record"}.`,
      },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `Employee status (ACTIVE or TERMINATED).`,
      },
    ],
  },
  {
    name: 'xero_employee_get',
    description: `Retrieve a single employee by their EmployeeID.`,
    params: [
      { name: 'employee_id', type: 'string', required: true, description: `Xero employee GUID.` },
    ],
  },
  {
    name: 'xero_employee_update',
    description: `Update an existing employee in Xero.`,
    params: [
      { name: 'employee_id', type: 'string', required: true, description: `Xero employee GUID.` },
      { name: 'FirstName', type: 'string', required: false, description: `Updated first name.` },
      { name: 'LastName', type: 'string', required: false, description: `Updated last name.` },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `Updated status (ACTIVE or TERMINATED).`,
      },
    ],
  },
  {
    name: 'xero_employees_list',
    description: `Retrieve employees from a Xero organisation.`,
    params: [
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Modified after UTC datetime.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_invoice_create',
    description: `Create a new invoice (ACCREC) or bill (ACCPAY) in Xero.`,
    params: [
      {
        name: 'Contact',
        type: 'string',
        required: true,
        description: `Contact object with ContactID e.g. {"ContactID":"guid"}.`,
      },
      {
        name: 'LineItems',
        type: 'array',
        required: true,
        description: `Array of line items. Each needs Description, Quantity, UnitAmount, AccountCode.`,
      },
      {
        name: 'Type',
        type: 'string',
        required: true,
        description: `Invoice type: ACCREC (sales invoice) or ACCPAY (bill/purchase invoice).`,
      },
      {
        name: 'CurrencyCode',
        type: 'string',
        required: false,
        description: `Currency (defaults to org default).`,
      },
      {
        name: 'DueDate',
        type: 'string',
        required: false,
        description: `Due date in YYYY-MM-DD format.`,
      },
      {
        name: 'InvoiceNumber',
        type: 'string',
        required: false,
        description: `Custom invoice reference number.`,
      },
      {
        name: 'Reference',
        type: 'string',
        required: false,
        description: `Additional reference number.`,
      },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `Invoice status (DRAFT or AUTHORISED).`,
      },
    ],
  },
  {
    name: 'xero_invoice_delete',
    description: `Void (soft-delete) an invoice or bill in Xero by setting its status to VOIDED.`,
    params: [
      {
        name: 'invoice_id',
        type: 'string',
        required: true,
        description: `Xero invoice GUID to void.`,
      },
    ],
  },
  {
    name: 'xero_invoice_get',
    description: `Retrieve a single invoice or bill by its InvoiceID.`,
    params: [
      { name: 'invoice_id', type: 'string', required: true, description: `Xero invoice GUID.` },
    ],
  },
  {
    name: 'xero_invoice_update',
    description: `Update an existing invoice or bill in Xero. Note: DueDate is required when setting Status to AUTHORISED.`,
    params: [
      { name: 'invoice_id', type: 'string', required: true, description: `Xero invoice GUID.` },
      {
        name: 'DueDate',
        type: 'string',
        required: false,
        description: `Updated due date (YYYY-MM-DD). Required when Status is AUTHORISED.`,
      },
      {
        name: 'LineItems',
        type: 'array',
        required: false,
        description: `Updated line items array.`,
      },
      { name: 'Reference', type: 'string', required: false, description: `Updated reference.` },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `New status (DRAFT, SUBMITTED, AUTHORISED, DELETED, VOIDED).`,
      },
    ],
  },
  {
    name: 'xero_invoices_list',
    description: `Retrieve sales invoices and bills from a Xero organisation.`,
    params: [
      {
        name: 'ContactIDs',
        type: 'string',
        required: false,
        description: `Comma-separated ContactIDs to filter invoices.`,
      },
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Return invoices modified after this UTC datetime.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'page', type: 'number', required: false, description: `Page number.` },
      {
        name: 'pageSize',
        type: 'number',
        required: false,
        description: `Records per page (max 1000).`,
      },
      {
        name: 'Statuses',
        type: 'string',
        required: false,
        description: `Comma-separated statuses to filter (e.g. DRAFT,AUTHORISED).`,
      },
      {
        name: 'where',
        type: 'string',
        required: false,
        description: `Filter expression (e.g. Type=="ACCREC" && Status=="AUTHORISED").`,
      },
    ],
  },
  {
    name: 'xero_item_create',
    description: `Create a new inventory item in Xero.`,
    params: [
      { name: 'Code', type: 'string', required: true, description: `Unique item code.` },
      {
        name: 'Description',
        type: 'string',
        required: false,
        description: `Description for sales invoices.`,
      },
      {
        name: 'InventoryAssetAccountCode',
        type: 'string',
        required: false,
        description: `Account code for inventory asset (required if tracked).`,
      },
      {
        name: 'IsTrackedAsInventory',
        type: 'boolean',
        required: false,
        description: `Track this item as inventory.`,
      },
      { name: 'Name', type: 'string', required: false, description: `Name of the item.` },
      {
        name: 'PurchaseDescription',
        type: 'string',
        required: false,
        description: `Description for purchase orders.`,
      },
      {
        name: 'PurchaseDetails',
        type: 'string',
        required: false,
        description: `Purchase pricing JSON e.g. {"UnitPrice":5.00,"AccountCode":"300","TaxType":"INPUT2"}.`,
      },
      {
        name: 'SalesDetails',
        type: 'string',
        required: false,
        description: `Sales pricing JSON e.g. {"UnitPrice":9.99,"AccountCode":"200","TaxType":"OUTPUT2"}.`,
      },
    ],
  },
  {
    name: 'xero_item_delete',
    description: `Delete an inventory item from Xero.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `Xero item GUID to delete.` },
    ],
  },
  {
    name: 'xero_item_get',
    description: `Retrieve a single item by its ItemID or Code.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Xero item GUID or item Code.`,
      },
    ],
  },
  {
    name: 'xero_item_update',
    description: `Update an existing inventory item in Xero.`,
    params: [
      {
        name: 'Code',
        type: 'string',
        required: true,
        description: `Item code (required by Xero for item updates).`,
      },
      { name: 'item_id', type: 'string', required: true, description: `Xero item GUID.` },
      {
        name: 'Description',
        type: 'string',
        required: false,
        description: `Updated sales description.`,
      },
      { name: 'Name', type: 'string', required: false, description: `Updated item name.` },
      {
        name: 'PurchaseDescription',
        type: 'string',
        required: false,
        description: `Updated purchase description.`,
      },
      {
        name: 'PurchaseDetails',
        type: 'string',
        required: false,
        description: `Updated purchase details JSON.`,
      },
      {
        name: 'SalesDetails',
        type: 'string',
        required: false,
        description: `Updated sales details JSON.`,
      },
    ],
  },
  {
    name: 'xero_items_list',
    description: `Retrieve inventory items from a Xero organisation.`,
    params: [
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Modified after UTC datetime.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_manual_journal_create',
    description: `Create a new manual journal entry in Xero.`,
    params: [
      {
        name: 'JournalLines',
        type: 'array',
        required: true,
        description: `Array of journal line objects with LineAmount, AccountCode, Description.`,
      },
      {
        name: 'Narration',
        type: 'string',
        required: true,
        description: `Description of the manual journal.`,
      },
      { name: 'Date', type: 'string', required: false, description: `Journal date (YYYY-MM-DD).` },
      { name: 'Status', type: 'string', required: false, description: `Status: DRAFT or POSTED.` },
    ],
  },
  {
    name: 'xero_manual_journal_get',
    description: `Retrieve a single manual journal by its ManualJournalID.`,
    params: [
      {
        name: 'manual_journal_id',
        type: 'string',
        required: true,
        description: `Xero manual journal GUID.`,
      },
    ],
  },
  {
    name: 'xero_manual_journal_update',
    description: `Update an existing manual journal in Xero. Note: JournalLines are required when setting Status to POSTED.`,
    params: [
      {
        name: 'manual_journal_id',
        type: 'string',
        required: true,
        description: `Xero manual journal GUID.`,
      },
      { name: 'Date', type: 'string', required: false, description: `Updated date (YYYY-MM-DD).` },
      {
        name: 'JournalLines',
        type: 'array',
        required: false,
        description: `Array of journal lines (required when changing Status to POSTED).`,
      },
      { name: 'Narration', type: 'string', required: false, description: `Updated narration.` },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `Updated status (DRAFT or POSTED).`,
      },
    ],
  },
  {
    name: 'xero_manual_journals_list',
    description: `Retrieve manual journals from a Xero organisation.`,
    params: [
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Modified after UTC datetime.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'page', type: 'number', required: false, description: `Page number.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_overpayments_list',
    description: `Retrieve overpayments from a Xero organisation.`,
    params: [
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Modified after UTC datetime.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'page', type: 'number', required: false, description: `Page number.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_payments_list',
    description: `Retrieve payments applied to invoices, credit notes, or prepayments in Xero.`,
    params: [
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Modified after UTC datetime.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'page', type: 'number', required: false, description: `Page number.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_prepayments_list',
    description: `Retrieve prepayments from a Xero organisation.`,
    params: [
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Modified after UTC datetime.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'page', type: 'number', required: false, description: `Page number.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_purchase_order_create',
    description: `Create a new purchase order in Xero.`,
    params: [
      {
        name: 'Contact',
        type: 'string',
        required: true,
        description: `Supplier contact object e.g. {"ContactID":"guid"}.`,
      },
      {
        name: 'LineItems',
        type: 'array',
        required: true,
        description: `Array of line item objects.`,
      },
      { name: 'CurrencyCode', type: 'string', required: false, description: `Currency code.` },
      { name: 'Date', type: 'string', required: false, description: `PO date (YYYY-MM-DD).` },
      {
        name: 'DeliveryDate',
        type: 'string',
        required: false,
        description: `Expected delivery date (YYYY-MM-DD).`,
      },
      {
        name: 'PurchaseOrderNumber',
        type: 'string',
        required: false,
        description: `Custom PO number.`,
      },
      { name: 'Reference', type: 'string', required: false, description: `Reference.` },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `Status: DRAFT or SUBMITTED.`,
      },
    ],
  },
  {
    name: 'xero_purchase_order_get',
    description: `Retrieve a single purchase order by its PurchaseOrderID.`,
    params: [
      {
        name: 'purchase_order_id',
        type: 'string',
        required: true,
        description: `Xero purchase order GUID.`,
      },
    ],
  },
  {
    name: 'xero_purchase_order_update',
    description: `Update an existing purchase order in Xero.`,
    params: [
      {
        name: 'purchase_order_id',
        type: 'string',
        required: true,
        description: `Xero purchase order GUID.`,
      },
      {
        name: 'DeliveryDate',
        type: 'string',
        required: false,
        description: `Updated delivery date (YYYY-MM-DD).`,
      },
      { name: 'LineItems', type: 'array', required: false, description: `Updated line items.` },
      { name: 'Reference', type: 'string', required: false, description: `Updated reference.` },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `New status (DRAFT, SUBMITTED, AUTHORISED, BILLED, DELETED).`,
      },
    ],
  },
  {
    name: 'xero_purchase_orders_list',
    description: `Retrieve purchase orders from a Xero organisation.`,
    params: [
      {
        name: 'DateFrom',
        type: 'string',
        required: false,
        description: `Filter POs issued from this date (YYYY-MM-DD).`,
      },
      {
        name: 'DateTo',
        type: 'string',
        required: false,
        description: `Filter POs issued to this date (YYYY-MM-DD).`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'page', type: 'number', required: false, description: `Page number.` },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `Filter by status (DRAFT, SUBMITTED, AUTHORISED, BILLED, DELETED).`,
      },
    ],
  },
  {
    name: 'xero_quote_create',
    description: `Create a new quote in Xero.`,
    params: [
      {
        name: 'Contact',
        type: 'string',
        required: true,
        description: `Contact object e.g. {"ContactID":"guid"}.`,
      },
      { name: 'Date', type: 'string', required: true, description: `Quote date (YYYY-MM-DD).` },
      {
        name: 'LineItems',
        type: 'array',
        required: true,
        description: `Array of line item objects.`,
      },
      { name: 'CurrencyCode', type: 'string', required: false, description: `Currency code.` },
      {
        name: 'ExpiryDate',
        type: 'string',
        required: false,
        description: `Quote expiry date (YYYY-MM-DD).`,
      },
      { name: 'QuoteNumber', type: 'string', required: false, description: `Custom quote number.` },
      { name: 'Reference', type: 'string', required: false, description: `Reference.` },
      { name: 'Status', type: 'string', required: false, description: `Status: DRAFT or SENT.` },
      { name: 'Summary', type: 'string', required: false, description: `Quote summary.` },
      { name: 'Title', type: 'string', required: false, description: `Quote title.` },
    ],
  },
  {
    name: 'xero_quote_get',
    description: `Retrieve a single quote by its QuoteID.`,
    params: [{ name: 'quote_id', type: 'string', required: true, description: `Xero quote GUID.` }],
  },
  {
    name: 'xero_quote_update',
    description: `Update an existing quote in Xero.`,
    params: [
      {
        name: 'Contact',
        type: 'string',
        required: true,
        description: `Contact object e.g. {"ContactID":"guid"} (required by Xero for quote updates).`,
      },
      {
        name: 'Date',
        type: 'string',
        required: true,
        description: `Quote date YYYY-MM-DD (required by Xero for quote updates).`,
      },
      { name: 'quote_id', type: 'string', required: true, description: `Xero quote GUID.` },
      {
        name: 'ExpiryDate',
        type: 'string',
        required: false,
        description: `Updated expiry date (YYYY-MM-DD).`,
      },
      { name: 'LineItems', type: 'array', required: false, description: `Updated line items.` },
      { name: 'Reference', type: 'string', required: false, description: `Updated reference.` },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `New status (DRAFT, SENT, DECLINED, ACCEPTED, INVOICED, DELETED).`,
      },
    ],
  },
  {
    name: 'xero_quotes_list',
    description: `Retrieve quotes from a Xero organisation.`,
    params: [
      {
        name: 'ContactID',
        type: 'string',
        required: false,
        description: `Filter by contact GUID.`,
      },
      {
        name: 'DateFrom',
        type: 'string',
        required: false,
        description: `Quote date from (YYYY-MM-DD).`,
      },
      {
        name: 'DateTo',
        type: 'string',
        required: false,
        description: `Quote date to (YYYY-MM-DD).`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'page', type: 'number', required: false, description: `Page number.` },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `Filter by status (DRAFT, SENT, DECLINED, ACCEPTED, INVOICED, DELETED).`,
      },
    ],
  },
  {
    name: 'xero_repeating_invoices_list',
    description: `Retrieve repeating invoice templates from a Xero organisation.`,
    params: [
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_report_aged_payables',
    description: `Retrieve the Aged Payables Outstanding report for a Xero organisation.`,
    params: [
      {
        name: 'contactID',
        type: 'string',
        required: true,
        description: `Contact GUID (required by Xero for AgedPayablesByContact report).`,
      },
      { name: 'date', type: 'string', required: false, description: `Report date (YYYY-MM-DD).` },
      {
        name: 'fromDate',
        type: 'string',
        required: false,
        description: `Start date for transactions.`,
      },
      {
        name: 'toDate',
        type: 'string',
        required: false,
        description: `End date for transactions.`,
      },
    ],
  },
  {
    name: 'xero_report_aged_receivables',
    description: `Retrieve the Aged Receivables Outstanding report for a Xero organisation.`,
    params: [
      {
        name: 'contactID',
        type: 'string',
        required: true,
        description: `Contact GUID (required by Xero for AgedReceivablesByContact report).`,
      },
      { name: 'date', type: 'string', required: false, description: `Report date (YYYY-MM-DD).` },
      {
        name: 'fromDate',
        type: 'string',
        required: false,
        description: `Start date for transactions.`,
      },
      {
        name: 'toDate',
        type: 'string',
        required: false,
        description: `End date for transactions.`,
      },
    ],
  },
  {
    name: 'xero_report_balance_sheet',
    description: `Retrieve the Balance Sheet report for a Xero organisation.`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: false,
        description: `Report date (YYYY-MM-DD). Defaults to today.`,
      },
      {
        name: 'periods',
        type: 'number',
        required: false,
        description: `Number of periods to compare.`,
      },
      {
        name: 'standardLayout',
        type: 'boolean',
        required: false,
        description: `Use standard layout.`,
      },
      {
        name: 'timeframe',
        type: 'string',
        required: false,
        description: `Timeframe for comparison: MONTH, QUARTER, or YEAR.`,
      },
      {
        name: 'trackingCategoryID',
        type: 'string',
        required: false,
        description: `Tracking category ID to segment by.`,
      },
    ],
  },
  {
    name: 'xero_report_bank_summary',
    description: `Retrieve the Bank Summary report for a Xero organisation.`,
    params: [
      {
        name: 'fromDate',
        type: 'string',
        required: false,
        description: `Start date (YYYY-MM-DD).`,
      },
      { name: 'toDate', type: 'string', required: false, description: `End date (YYYY-MM-DD).` },
    ],
  },
  {
    name: 'xero_report_executive_summary',
    description: `Retrieve the Executive Summary report for a Xero organisation.`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: false,
        description: `Report month (YYYY-MM-DD, first day of month).`,
      },
    ],
  },
  {
    name: 'xero_report_profit_and_loss',
    description: `Retrieve the Profit and Loss report for a Xero organisation.`,
    params: [
      {
        name: 'fromDate',
        type: 'string',
        required: false,
        description: `Report start date (YYYY-MM-DD).`,
      },
      {
        name: 'periods',
        type: 'number',
        required: false,
        description: `Number of periods to compare.`,
      },
      {
        name: 'standardLayout',
        type: 'boolean',
        required: false,
        description: `Use standard layout.`,
      },
      {
        name: 'timeframe',
        type: 'string',
        required: false,
        description: `Timeframe: MONTH, QUARTER, or YEAR.`,
      },
      {
        name: 'toDate',
        type: 'string',
        required: false,
        description: `Report end date (YYYY-MM-DD).`,
      },
      {
        name: 'trackingCategoryID',
        type: 'string',
        required: false,
        description: `Tracking category ID to segment by.`,
      },
    ],
  },
  {
    name: 'xero_report_trial_balance',
    description: `Retrieve the Trial Balance report for a Xero organisation.`,
    params: [
      { name: 'date', type: 'string', required: false, description: `Report date (YYYY-MM-DD).` },
      {
        name: 'paymentsOnly',
        type: 'boolean',
        required: false,
        description: `If true, include only cash-basis transactions.`,
      },
    ],
  },
  {
    name: 'xero_tax_rate_create',
    description: `Create a new tax rate in Xero.`,
    params: [
      { name: 'Name', type: 'string', required: true, description: `Name of the tax rate.` },
      {
        name: 'TaxComponents',
        type: 'array',
        required: true,
        description: `Array of tax components e.g. [{"Name":"GST","Rate":15,"IsCompound":false}].`,
      },
    ],
  },
  {
    name: 'xero_tax_rate_update',
    description: `Update an existing tax rate in Xero.`,
    params: [
      {
        name: 'TaxComponents',
        type: 'array',
        required: true,
        description: `Array of tax component objects e.g. [{"Name":"Tax","Rate":15,"IsCompound":false}]. Required by Xero when updating a tax rate.`,
      },
      {
        name: 'TaxType',
        type: 'string',
        required: true,
        description: `Tax type identifier to update.`,
      },
      { name: 'Name', type: 'string', required: false, description: `Updated name.` },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `Updated status (ACTIVE or DELETED).`,
      },
    ],
  },
  {
    name: 'xero_tax_rates_list',
    description: `Retrieve tax rates from a Xero organisation.`,
    params: [
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      {
        name: 'TaxType',
        type: 'string',
        required: false,
        description: `Filter by specific tax type.`,
      },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_tracking_categories_list',
    description: `Retrieve tracking categories and their options from Xero.`,
    params: [
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
  {
    name: 'xero_tracking_category_delete',
    description: `Delete a tracking category from Xero.`,
    params: [
      {
        name: 'tracking_category_id',
        type: 'string',
        required: true,
        description: `Xero tracking category GUID to delete.`,
      },
    ],
  },
  {
    name: 'xero_tracking_category_update',
    description: `Update a tracking category name or status in Xero.`,
    params: [
      {
        name: 'tracking_category_id',
        type: 'string',
        required: true,
        description: `Xero tracking category GUID.`,
      },
      { name: 'Name', type: 'string', required: false, description: `Updated name.` },
      {
        name: 'Status',
        type: 'string',
        required: false,
        description: `Updated status (ACTIVE or ARCHIVED).`,
      },
    ],
  },
  {
    name: 'xero_tracking_option_create',
    description: `Create a new option within a tracking category in Xero.`,
    params: [
      { name: 'Name', type: 'string', required: true, description: `Name of the tracking option.` },
      {
        name: 'tracking_category_id',
        type: 'string',
        required: true,
        description: `Xero tracking category GUID.`,
      },
    ],
  },
  {
    name: 'xero_user_get',
    description: `Retrieve a single Xero organisation user by their UserID.`,
    params: [{ name: 'user_id', type: 'string', required: true, description: `Xero user GUID.` }],
  },
  {
    name: 'xero_users_list',
    description: `Retrieve users of a Xero organisation.`,
    params: [
      {
        name: 'modified_after',
        type: 'string',
        required: false,
        description: `Modified after UTC datetime.`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort order.` },
      { name: 'where', type: 'string', required: false, description: `Filter expression.` },
    ],
  },
]
