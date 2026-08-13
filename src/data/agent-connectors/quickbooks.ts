import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'quickbooks_account_create',
    description: `Create a new account in QuickBooks Online.`,
    params: [
      {
        name: 'AccountType',
        type: 'string',
        required: true,
        description: `Account type (e.g. Bank, Expense, Income, Liability).`,
      },
      { name: 'Name', type: 'string', required: true, description: `Name of the account.` },
      { name: 'AccountSubType', type: 'string', required: false, description: `Account sub-type.` },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the account is active.`,
      },
      {
        name: 'CurrencyRef',
        type: 'string',
        required: false,
        description: `Currency reference as JSON, e.g. {"value":"USD"}.`,
      },
      {
        name: 'Description',
        type: 'string',
        required: false,
        description: `Description of the account.`,
      },
    ],
  },
  {
    name: 'quickbooks_account_get',
    description: `Retrieve a single QuickBooks Online account by its ID.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the account to retrieve.`,
      },
    ],
  },
  {
    name: 'quickbooks_account_update',
    description: `Update an existing account in QuickBooks Online. Requires SyncToken from account_get.`,
    params: [
      { name: 'AccountType', type: 'string', required: true, description: `Account type.` },
      {
        name: 'Id',
        type: 'string',
        required: true,
        description: `The ID of the account to update.`,
      },
      { name: 'Name', type: 'string', required: true, description: `Name of the account.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from the account_get response (optimistic locking).`,
      },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the account is active.`,
      },
      { name: 'Description', type: 'string', required: false, description: `Description.` },
    ],
  },
  {
    name: 'quickbooks_accounts_list',
    description: `List accounts from QuickBooks Online. Use where_clause to filter (e.g. "AccountType = 'Bank'").`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause to filter accounts, e.g. "AccountType = 'Bank'"`,
      },
    ],
  },
  {
    name: 'quickbooks_bill_create',
    description: `Create a new bill in QuickBooks Online.`,
    params: [
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      {
        name: 'VendorRef',
        type: 'string',
        required: true,
        description: `Vendor reference as JSON, e.g. {"value":"123"}.`,
      },
      { name: 'DocNumber', type: 'string', required: false, description: `Bill number.` },
      { name: 'DueDate', type: 'string', required: false, description: `Due date YYYY-MM-DD.` },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_bill_delete',
    description: `Delete a bill in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Bill ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from bill_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_bill_get',
    description: `Retrieve a single QuickBooks Online bill by ID.`,
    params: [
      { name: 'bill_id', type: 'string', required: true, description: `The ID of the bill.` },
    ],
  },
  {
    name: 'quickbooks_bill_payment_create',
    description: `Create a new bill payment in QuickBooks Online.`,
    params: [
      {
        name: 'Line',
        type: 'string',
        required: true,
        description: `Linked transactions as JSON array with LinkedTxn.`,
      },
      {
        name: 'PayType',
        type: 'string',
        required: true,
        description: `Payment type: Check or CreditCard.`,
      },
      {
        name: 'TotalAmt',
        type: 'string',
        required: true,
        description: `Total amount as number string, e.g. "200.00".`,
      },
      {
        name: 'VendorRef',
        type: 'string',
        required: true,
        description: `Vendor reference as JSON, e.g. {"value":"123"}.`,
      },
      {
        name: 'CheckPayment',
        type: 'string',
        required: false,
        description: `Check payment details as JSON, required when PayType is Check. e.g. {"BankAccountRef":{"value":"35"}}.`,
      },
      {
        name: 'CreditCardPayment',
        type: 'string',
        required: false,
        description: `Credit card payment details as JSON, required when PayType is CreditCard. e.g. {"CCAccountRef":{"value":"41"}}.`,
      },
      { name: 'DocNumber', type: 'string', required: false, description: `Document/check number.` },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_bill_payment_delete',
    description: `Delete a bill payment in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Bill Payment ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from bill_payment_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_bill_payment_get',
    description: `Retrieve a single QuickBooks Online bill payment by ID.`,
    params: [
      {
        name: 'bill_payment_id',
        type: 'string',
        required: true,
        description: `The ID of the bill payment.`,
      },
    ],
  },
  {
    name: 'quickbooks_bill_payments_list',
    description: `List bill payments from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause.`,
      },
    ],
  },
  {
    name: 'quickbooks_bill_update',
    description: `Update an existing bill in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Bill ID.` },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from bill_get.`,
      },
      {
        name: 'VendorRef',
        type: 'string',
        required: true,
        description: `Vendor reference as JSON.`,
      },
      { name: 'DueDate', type: 'string', required: false, description: `Due date YYYY-MM-DD.` },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_bills_list',
    description: `List bills from QuickBooks Online with optional filtering and pagination.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause.`,
      },
    ],
  },
  {
    name: 'quickbooks_class_create',
    description: `Create a new class in QuickBooks Online.`,
    params: [
      { name: 'Name', type: 'string', required: true, description: `Name of the class.` },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the class is active.`,
      },
      {
        name: 'ParentRef',
        type: 'string',
        required: false,
        description: `Parent class reference as JSON.`,
      },
    ],
  },
  {
    name: 'quickbooks_class_get',
    description: `Retrieve a single QuickBooks Online class by ID.`,
    params: [
      { name: 'class_id', type: 'string', required: true, description: `The ID of the class.` },
    ],
  },
  {
    name: 'quickbooks_class_update',
    description: `Update an existing class in QuickBooks Online. Requires SyncToken from class_get.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `The ID of the class to update.` },
      { name: 'Name', type: 'string', required: true, description: `Name of the class.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from the class_get response (optimistic locking).`,
      },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the class is active.`,
      },
      {
        name: 'ParentRef',
        type: 'string',
        required: false,
        description: `Parent class reference as JSON.`,
      },
    ],
  },
  {
    name: 'quickbooks_classes_list',
    description: `List classes from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
    ],
  },
  {
    name: 'quickbooks_company_info_get',
    description: `Retrieve company information for the connected QuickBooks Online account.`,
    params: [],
  },
  {
    name: 'quickbooks_credit_memo_create',
    description: `Create a new credit memo in QuickBooks Online.`,
    params: [
      {
        name: 'CustomerRef',
        type: 'string',
        required: true,
        description: `Customer reference as JSON.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      { name: 'DocNumber', type: 'string', required: false, description: `Credit memo number.` },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_credit_memo_delete',
    description: `Delete a credit memo in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Credit Memo ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from credit_memo_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_credit_memo_get',
    description: `Retrieve a single QuickBooks Online credit memo by ID.`,
    params: [
      {
        name: 'credit_memo_id',
        type: 'string',
        required: true,
        description: `The ID of the credit memo.`,
      },
    ],
  },
  {
    name: 'quickbooks_credit_memo_update',
    description: `Update an existing credit memo in QuickBooks Online. Requires SyncToken from credit_memo_get.`,
    params: [
      {
        name: 'CustomerRef',
        type: 'string',
        required: true,
        description: `Customer reference as JSON.`,
      },
      {
        name: 'Id',
        type: 'string',
        required: true,
        description: `The ID of the credit memo to update.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from the credit_memo_get response (optimistic locking).`,
      },
      { name: 'DocNumber', type: 'string', required: false, description: `Credit memo number.` },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_credit_memos_list',
    description: `List credit memos from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause.`,
      },
    ],
  },
  {
    name: 'quickbooks_customer_create',
    description: `Create a new customer in QuickBooks Online.`,
    params: [
      {
        name: 'DisplayName',
        type: 'string',
        required: true,
        description: `Display name for the customer.`,
      },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the customer is active.`,
      },
      {
        name: 'BillAddr',
        type: 'string',
        required: false,
        description: `Billing address as JSON object.`,
      },
      { name: 'CompanyName', type: 'string', required: false, description: `Company name.` },
      { name: 'FamilyName', type: 'string', required: false, description: `Last name.` },
      { name: 'GivenName', type: 'string', required: false, description: `First name.` },
      {
        name: 'PrimaryEmailAddr',
        type: 'string',
        required: false,
        description: `Email as JSON, e.g. {"Address":"john@example.com"}.`,
      },
      {
        name: 'PrimaryPhone',
        type: 'string',
        required: false,
        description: `Phone as JSON, e.g. {"FreeFormNumber":"555-1234"}.`,
      },
    ],
  },
  {
    name: 'quickbooks_customer_delete',
    description: `Mark a customer as inactive in QuickBooks Online (customers cannot be permanently deleted).`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Customer ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from customer_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_customer_get',
    description: `Retrieve a single QuickBooks Online customer by ID.`,
    params: [
      {
        name: 'customer_id',
        type: 'string',
        required: true,
        description: `The ID of the customer.`,
      },
    ],
  },
  {
    name: 'quickbooks_customer_update',
    description: `Update an existing customer in QuickBooks Online. Requires SyncToken from customer_get.`,
    params: [
      { name: 'DisplayName', type: 'string', required: true, description: `Display name.` },
      { name: 'Id', type: 'string', required: true, description: `Customer ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from customer_get.`,
      },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the customer is active.`,
      },
      { name: 'CompanyName', type: 'string', required: false, description: `Company name.` },
      { name: 'FamilyName', type: 'string', required: false, description: `Last name.` },
      { name: 'GivenName', type: 'string', required: false, description: `First name.` },
      { name: 'PrimaryEmailAddr', type: 'string', required: false, description: `Email as JSON.` },
    ],
  },
  {
    name: 'quickbooks_customers_list',
    description: `List customers from QuickBooks Online with optional filtering and pagination.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause, e.g. "Active = true"`,
      },
    ],
  },
  {
    name: 'quickbooks_department_create',
    description: `Create a new department in QuickBooks Online.`,
    params: [
      { name: 'Name', type: 'string', required: true, description: `Name of the department.` },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the department is active.`,
      },
      {
        name: 'ParentRef',
        type: 'string',
        required: false,
        description: `Parent department reference as JSON.`,
      },
    ],
  },
  {
    name: 'quickbooks_department_get',
    description: `Retrieve a single QuickBooks Online department by ID.`,
    params: [
      {
        name: 'department_id',
        type: 'string',
        required: true,
        description: `The ID of the department.`,
      },
    ],
  },
  {
    name: 'quickbooks_department_update',
    description: `Update an existing department in QuickBooks Online. Requires SyncToken from department_get.`,
    params: [
      {
        name: 'Id',
        type: 'string',
        required: true,
        description: `The ID of the department to update.`,
      },
      { name: 'Name', type: 'string', required: true, description: `Name of the department.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from the department_get response (optimistic locking).`,
      },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the department is active.`,
      },
      {
        name: 'ParentRef',
        type: 'string',
        required: false,
        description: `Parent department reference as JSON.`,
      },
    ],
  },
  {
    name: 'quickbooks_departments_list',
    description: `List departments from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
    ],
  },
  {
    name: 'quickbooks_deposit_create',
    description: `Create a new deposit in QuickBooks Online.`,
    params: [
      {
        name: 'DepositToAccountRef',
        type: 'string',
        required: true,
        description: `Account to deposit into as JSON.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Deposit lines as JSON array.` },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
      {
        name: 'TxnDate',
        type: 'string',
        required: false,
        description: `Transaction date YYYY-MM-DD.`,
      },
    ],
  },
  {
    name: 'quickbooks_deposit_delete',
    description: `Delete a deposit in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Deposit ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from deposit_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_deposit_get',
    description: `Retrieve a single QuickBooks Online deposit by ID.`,
    params: [
      { name: 'deposit_id', type: 'string', required: true, description: `The ID of the deposit.` },
    ],
  },
  {
    name: 'quickbooks_deposit_update',
    description: `Update an existing deposit in QuickBooks Online. Requires SyncToken from deposit_get.`,
    params: [
      {
        name: 'DepositToAccountRef',
        type: 'string',
        required: true,
        description: `Account to deposit into as JSON.`,
      },
      {
        name: 'Id',
        type: 'string',
        required: true,
        description: `The ID of the deposit to update.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Deposit lines as JSON array.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from the deposit_get response (optimistic locking).`,
      },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
      {
        name: 'TxnDate',
        type: 'string',
        required: false,
        description: `Transaction date YYYY-MM-DD.`,
      },
    ],
  },
  {
    name: 'quickbooks_deposits_list',
    description: `List deposits from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
    ],
  },
  {
    name: 'quickbooks_employee_create',
    description: `Create a new employee in QuickBooks Online.`,
    params: [
      { name: 'FamilyName', type: 'string', required: true, description: `Employee last name.` },
      { name: 'GivenName', type: 'string', required: true, description: `Employee first name.` },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the employee is active.`,
      },
      { name: 'DisplayName', type: 'string', required: false, description: `Display name.` },
      { name: 'PrimaryEmailAddr', type: 'string', required: false, description: `Email as JSON.` },
      { name: 'PrimaryPhone', type: 'string', required: false, description: `Phone as JSON.` },
    ],
  },
  {
    name: 'quickbooks_employee_get',
    description: `Retrieve a single QuickBooks Online employee by ID.`,
    params: [
      {
        name: 'employee_id',
        type: 'string',
        required: true,
        description: `The ID of the employee.`,
      },
    ],
  },
  {
    name: 'quickbooks_employee_update',
    description: `Update an existing employee in QuickBooks Online. Requires SyncToken from employee_get.`,
    params: [
      { name: 'FamilyName', type: 'string', required: true, description: `Employee last name.` },
      { name: 'GivenName', type: 'string', required: true, description: `Employee first name.` },
      {
        name: 'Id',
        type: 'string',
        required: true,
        description: `The ID of the employee to update.`,
      },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from the employee_get response (optimistic locking).`,
      },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the employee is active.`,
      },
      { name: 'DisplayName', type: 'string', required: false, description: `Display name.` },
      { name: 'PrimaryEmailAddr', type: 'string', required: false, description: `Email as JSON.` },
      { name: 'PrimaryPhone', type: 'string', required: false, description: `Phone as JSON.` },
    ],
  },
  {
    name: 'quickbooks_employees_list',
    description: `List employees from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause.`,
      },
    ],
  },
  {
    name: 'quickbooks_estimate_create',
    description: `Create a new estimate (quote) in QuickBooks Online.`,
    params: [
      {
        name: 'CustomerRef',
        type: 'string',
        required: true,
        description: `Customer reference as JSON.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      { name: 'DocNumber', type: 'string', required: false, description: `Estimate number.` },
      {
        name: 'ExpirationDate',
        type: 'string',
        required: false,
        description: `Expiration date YYYY-MM-DD.`,
      },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_estimate_delete',
    description: `Delete an estimate in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Estimate ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from estimate_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_estimate_get',
    description: `Retrieve a single QuickBooks Online estimate by ID.`,
    params: [
      {
        name: 'estimate_id',
        type: 'string',
        required: true,
        description: `The ID of the estimate.`,
      },
    ],
  },
  {
    name: 'quickbooks_estimate_send',
    description: `Send an estimate by email in QuickBooks Online.`,
    params: [
      {
        name: 'estimate_id',
        type: 'string',
        required: true,
        description: `The ID of the estimate to send.`,
      },
      {
        name: 'send_to',
        type: 'string',
        required: true,
        description: `Email address to send the estimate to.`,
      },
    ],
  },
  {
    name: 'quickbooks_estimate_update',
    description: `Update an existing estimate (quote) in QuickBooks Online. Requires SyncToken from estimate_get.`,
    params: [
      {
        name: 'CustomerRef',
        type: 'string',
        required: true,
        description: `Customer reference as JSON.`,
      },
      {
        name: 'Id',
        type: 'string',
        required: true,
        description: `The ID of the estimate to update.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from the estimate_get response (optimistic locking).`,
      },
      { name: 'DocNumber', type: 'string', required: false, description: `Estimate number.` },
      {
        name: 'ExpirationDate',
        type: 'string',
        required: false,
        description: `Expiration date YYYY-MM-DD.`,
      },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_estimates_list',
    description: `List estimates from QuickBooks Online with optional filtering and pagination.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause.`,
      },
    ],
  },
  {
    name: 'quickbooks_invoice_create',
    description: `Create a new invoice in QuickBooks Online.`,
    params: [
      {
        name: 'CustomerRef',
        type: 'string',
        required: true,
        description: `Customer reference as JSON, e.g. {"value":"123"}.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      {
        name: 'BillEmail',
        type: 'string',
        required: false,
        description: `Billing email as JSON, e.g. {"Address":"customer@example.com"}.`,
      },
      { name: 'DocNumber', type: 'string', required: false, description: `Invoice number.` },
      {
        name: 'DueDate',
        type: 'string',
        required: false,
        description: `Due date in YYYY-MM-DD format.`,
      },
      {
        name: 'EmailStatus',
        type: 'string',
        required: false,
        description: `Email status: EmailSent or NotSet.`,
      },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_invoice_delete',
    description: `Delete an invoice in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Invoice ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from invoice_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_invoice_get',
    description: `Retrieve a single QuickBooks Online invoice by ID.`,
    params: [
      { name: 'invoice_id', type: 'string', required: true, description: `The ID of the invoice.` },
    ],
  },
  {
    name: 'quickbooks_invoice_send',
    description: `Send an invoice by email in QuickBooks Online.`,
    params: [
      {
        name: 'invoice_id',
        type: 'string',
        required: true,
        description: `The ID of the invoice to send.`,
      },
      {
        name: 'send_to',
        type: 'string',
        required: true,
        description: `Email address to send the invoice to.`,
      },
    ],
  },
  {
    name: 'quickbooks_invoice_update',
    description: `Update an existing invoice in QuickBooks Online.`,
    params: [
      {
        name: 'CustomerRef',
        type: 'string',
        required: true,
        description: `Customer reference as JSON.`,
      },
      { name: 'Id', type: 'string', required: true, description: `Invoice ID.` },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from invoice_get.`,
      },
      { name: 'DocNumber', type: 'string', required: false, description: `Invoice number.` },
      { name: 'DueDate', type: 'string', required: false, description: `Due date YYYY-MM-DD.` },
      { name: 'EmailStatus', type: 'string', required: false, description: `Email status.` },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_invoice_void',
    description: `Void an invoice in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Invoice ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from invoice_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_invoices_list',
    description: `List invoices from QuickBooks Online with optional filtering and pagination.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause, e.g. "TxnDate > '2024-01-01'"`,
      },
    ],
  },
  {
    name: 'quickbooks_item_create',
    description: `Create a new item (product or service) in QuickBooks Online.`,
    params: [
      { name: 'Name', type: 'string', required: true, description: `Name of the item.` },
      {
        name: 'Type',
        type: 'string',
        required: true,
        description: `Item type: Service, NonInventory, or Inventory.`,
      },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the item is active.`,
      },
      {
        name: 'Description',
        type: 'string',
        required: false,
        description: `Description of the item.`,
      },
      {
        name: 'IncomeAccountRef',
        type: 'string',
        required: false,
        description: `Income account reference as JSON, e.g. {"value":"1","name":"Services"}.`,
      },
      {
        name: 'UnitPrice',
        type: 'string',
        required: false,
        description: `Unit price as a number string, e.g. "150.00".`,
      },
    ],
  },
  {
    name: 'quickbooks_item_delete',
    description: `Mark an item as inactive in QuickBooks Online (items cannot be permanently deleted).`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Item ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from item_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_item_get',
    description: `Retrieve a single QuickBooks Online item by ID.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The ID of the item.` },
    ],
  },
  {
    name: 'quickbooks_item_update',
    description: `Update an existing item in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Item ID.` },
      { name: 'Name', type: 'string', required: true, description: `Name of the item.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from item_get.`,
      },
      { name: 'Type', type: 'string', required: true, description: `Item type.` },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the item is active.`,
      },
      { name: 'Description', type: 'string', required: false, description: `Description.` },
      {
        name: 'UnitPrice',
        type: 'string',
        required: false,
        description: `Unit price as number string.`,
      },
    ],
  },
  {
    name: 'quickbooks_items_list',
    description: `List items (products and services) from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause, e.g. "Type = 'Service'"`,
      },
    ],
  },
  {
    name: 'quickbooks_journal_entries_list',
    description: `List journal entries from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause.`,
      },
    ],
  },
  {
    name: 'quickbooks_journal_entry_create',
    description: `Create a new journal entry in QuickBooks Online.`,
    params: [
      {
        name: 'Line',
        type: 'string',
        required: true,
        description: `Journal entry lines as JSON array with debit/credit amounts.`,
      },
      { name: 'DocNumber', type: 'string', required: false, description: `Journal entry number.` },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
      {
        name: 'TxnDate',
        type: 'string',
        required: false,
        description: `Transaction date YYYY-MM-DD.`,
      },
    ],
  },
  {
    name: 'quickbooks_journal_entry_delete',
    description: `Delete a journal entry in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Journal Entry ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from journal_entry_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_journal_entry_get',
    description: `Retrieve a single QuickBooks Online journal entry by ID.`,
    params: [
      {
        name: 'journal_entry_id',
        type: 'string',
        required: true,
        description: `The ID of the journal entry.`,
      },
    ],
  },
  {
    name: 'quickbooks_journal_entry_update',
    description: `Update an existing journal entry in QuickBooks Online. Requires SyncToken from journal_entry_get.`,
    params: [
      {
        name: 'Id',
        type: 'string',
        required: true,
        description: `The ID of the journal entry to update.`,
      },
      {
        name: 'Line',
        type: 'string',
        required: true,
        description: `Journal entry lines as JSON array with debit/credit amounts.`,
      },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from the journal_entry_get response (optimistic locking).`,
      },
      { name: 'DocNumber', type: 'string', required: false, description: `Journal entry number.` },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
      {
        name: 'TxnDate',
        type: 'string',
        required: false,
        description: `Transaction date YYYY-MM-DD.`,
      },
    ],
  },
  {
    name: 'quickbooks_payment_create',
    description: `Create a new customer payment in QuickBooks Online.`,
    params: [
      {
        name: 'CustomerRef',
        type: 'string',
        required: true,
        description: `Customer reference as JSON, e.g. {"value":"123"}.`,
      },
      {
        name: 'TotalAmt',
        type: 'string',
        required: true,
        description: `Total payment amount as number string, e.g. "500.00".`,
      },
      {
        name: 'Line',
        type: 'string',
        required: false,
        description: `Linked transactions as JSON array.`,
      },
      {
        name: 'PaymentRefNum',
        type: 'string',
        required: false,
        description: `Payment reference number (check number, etc.).`,
      },
    ],
  },
  {
    name: 'quickbooks_payment_delete',
    description: `Delete a payment in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Payment ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from payment_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_payment_get',
    description: `Retrieve a single QuickBooks Online payment by ID.`,
    params: [
      { name: 'payment_id', type: 'string', required: true, description: `The ID of the payment.` },
    ],
  },
  {
    name: 'quickbooks_payment_methods_list',
    description: `List payment methods (e.g. Cash, Check, Credit Card) configured in QuickBooks Online, via the SQL-like query endpoint (entity=PaymentMethod). Used to tag Payment and SalesReceipt transactions with how the customer paid.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause, e.g. "Active = true"`,
      },
    ],
  },
  {
    name: 'quickbooks_payment_update',
    description: `Update an existing payment in QuickBooks Online.`,
    params: [
      {
        name: 'CustomerRef',
        type: 'string',
        required: true,
        description: `Customer reference as JSON.`,
      },
      { name: 'Id', type: 'string', required: true, description: `Payment ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from payment_get.`,
      },
      {
        name: 'TotalAmt',
        type: 'string',
        required: true,
        description: `Total payment amount as number string.`,
      },
      {
        name: 'PaymentRefNum',
        type: 'string',
        required: false,
        description: `Payment reference number.`,
      },
    ],
  },
  {
    name: 'quickbooks_payments_list',
    description: `List payments from QuickBooks Online with optional filtering and pagination.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause.`,
      },
    ],
  },
  {
    name: 'quickbooks_purchase_create',
    description: `Create a new purchase (expense paid by cash, check, or credit card) in QuickBooks Online.`,
    params: [
      {
        name: 'AccountRef',
        type: 'string',
        required: true,
        description: `Bank or credit card account the purchase was paid from, as JSON.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      {
        name: 'PaymentType',
        type: 'string',
        required: true,
        description: `Payment method: Cash, Check, or CreditCard.`,
      },
      {
        name: 'EntityRef',
        type: 'string',
        required: false,
        description: `Payee reference (vendor or employee) as JSON.`,
      },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
      {
        name: 'TxnDate',
        type: 'string',
        required: false,
        description: `Transaction date YYYY-MM-DD.`,
      },
    ],
  },
  {
    name: 'quickbooks_purchase_delete',
    description: `Delete a purchase in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Purchase ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from purchase_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_purchase_get',
    description: `Retrieve a single QuickBooks Online purchase by ID.`,
    params: [
      {
        name: 'purchase_id',
        type: 'string',
        required: true,
        description: `The ID of the purchase.`,
      },
    ],
  },
  {
    name: 'quickbooks_purchase_order_create',
    description: `Create a new purchase order in QuickBooks Online.`,
    params: [
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      {
        name: 'VendorRef',
        type: 'string',
        required: true,
        description: `Vendor reference as JSON.`,
      },
      { name: 'DocNumber', type: 'string', required: false, description: `Purchase order number.` },
      { name: 'DueDate', type: 'string', required: false, description: `Due date YYYY-MM-DD.` },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_purchase_order_delete',
    description: `Delete a purchase order in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Purchase Order ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from purchase_order_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_purchase_order_get',
    description: `Retrieve a single QuickBooks Online purchase order by ID.`,
    params: [
      {
        name: 'purchase_order_id',
        type: 'string',
        required: true,
        description: `The ID of the purchase order.`,
      },
    ],
  },
  {
    name: 'quickbooks_purchase_order_update',
    description: `Update an existing purchase order in QuickBooks Online. Requires SyncToken from purchase_order_get.`,
    params: [
      {
        name: 'Id',
        type: 'string',
        required: true,
        description: `The ID of the purchase order to update.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from the purchase_order_get response (optimistic locking).`,
      },
      {
        name: 'VendorRef',
        type: 'string',
        required: true,
        description: `Vendor reference as JSON.`,
      },
      { name: 'DocNumber', type: 'string', required: false, description: `Purchase order number.` },
      { name: 'DueDate', type: 'string', required: false, description: `Due date YYYY-MM-DD.` },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_purchase_orders_list',
    description: `List purchase orders from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause.`,
      },
    ],
  },
  {
    name: 'quickbooks_purchase_update',
    description: `Update an existing purchase in QuickBooks Online. Requires SyncToken from purchase_get.`,
    params: [
      {
        name: 'AccountRef',
        type: 'string',
        required: true,
        description: `Bank or credit card account the purchase was paid from, as JSON.`,
      },
      {
        name: 'Id',
        type: 'string',
        required: true,
        description: `The ID of the purchase to update.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      {
        name: 'PaymentType',
        type: 'string',
        required: true,
        description: `Payment method: Cash, Check, or CreditCard.`,
      },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from the purchase_get response (optimistic locking).`,
      },
      {
        name: 'EntityRef',
        type: 'string',
        required: false,
        description: `Payee reference (vendor or employee) as JSON.`,
      },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
      {
        name: 'TxnDate',
        type: 'string',
        required: false,
        description: `Transaction date YYYY-MM-DD.`,
      },
    ],
  },
  {
    name: 'quickbooks_purchases_list',
    description: `List purchases from QuickBooks Online with optional filtering and pagination.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause, e.g. "TxnDate > '2024-01-01'"`,
      },
    ],
  },
  {
    name: 'quickbooks_refund_receipt_create',
    description: `Create a new refund receipt in QuickBooks Online.`,
    params: [
      {
        name: 'CustomerRef',
        type: 'string',
        required: true,
        description: `Customer reference as JSON.`,
      },
      {
        name: 'DepositToAccountRef',
        type: 'string',
        required: true,
        description: `Account to deposit the refund into as JSON, e.g. {"value":"35"} for Checking.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      { name: 'DocNumber', type: 'string', required: false, description: `Refund receipt number.` },
      {
        name: 'PaymentRefNum',
        type: 'string',
        required: false,
        description: `Payment reference number.`,
      },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_refund_receipt_delete',
    description: `Delete a refund receipt in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Refund receipt ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from refund_receipt_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_refund_receipt_get',
    description: `Retrieve a single QuickBooks Online refund receipt by ID.`,
    params: [
      {
        name: 'refund_receipt_id',
        type: 'string',
        required: true,
        description: `The ID of the refund receipt.`,
      },
    ],
  },
  {
    name: 'quickbooks_refund_receipt_update',
    description: `Update an existing refund receipt in QuickBooks Online. Requires SyncToken from refund_receipt_get.`,
    params: [
      {
        name: 'CustomerRef',
        type: 'string',
        required: true,
        description: `Customer reference as JSON.`,
      },
      {
        name: 'DepositToAccountRef',
        type: 'string',
        required: true,
        description: `Account to deposit the refund into as JSON, e.g. {"value":"35"} for Checking.`,
      },
      {
        name: 'Id',
        type: 'string',
        required: true,
        description: `The ID of the refund receipt to update.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from the refund_receipt_get response (optimistic locking).`,
      },
      { name: 'DocNumber', type: 'string', required: false, description: `Refund receipt number.` },
      {
        name: 'PaymentRefNum',
        type: 'string',
        required: false,
        description: `Payment reference number.`,
      },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_refund_receipts_list',
    description: `List refund receipts from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
    ],
  },
  {
    name: 'quickbooks_report_aged_payables',
    description: `Retrieve an Aged Payable Detail report from QuickBooks Online.`,
    params: [
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date filter in YYYY-MM-DD format.`,
      },
      {
        name: 'report_date',
        type: 'string',
        required: false,
        description: `Report date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'quickbooks_report_aged_receivables',
    description: `Retrieve an Aged Receivable Detail report from QuickBooks Online.`,
    params: [
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date filter in YYYY-MM-DD format.`,
      },
      {
        name: 'report_date',
        type: 'string',
        required: false,
        description: `Report date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'quickbooks_report_balance_sheet',
    description: `Retrieve a Balance Sheet report from QuickBooks Online.`,
    params: [
      {
        name: 'accounting_method',
        type: 'string',
        required: false,
        description: `Accounting method: Accrual or Cash.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Report end date in YYYY-MM-DD format.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Report start date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'quickbooks_report_cash_flow',
    description: `Retrieve a Cash Flow report from QuickBooks Online.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Report end date in YYYY-MM-DD format.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Report start date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'quickbooks_report_customer_balance',
    description: `Retrieve a Customer Balance report from QuickBooks Online.`,
    params: [
      {
        name: 'accounting_method',
        type: 'string',
        required: false,
        description: `Accounting method: Accrual or Cash.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Report end date in YYYY-MM-DD format.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Report start date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'quickbooks_report_general_ledger',
    description: `Retrieve a General Ledger report from QuickBooks Online.`,
    params: [
      {
        name: 'accounting_method',
        type: 'string',
        required: false,
        description: `Accounting method: Accrual or Cash.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Report end date in YYYY-MM-DD format.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Report start date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'quickbooks_report_profit_and_loss',
    description: `Retrieve a Profit and Loss report from QuickBooks Online.`,
    params: [
      {
        name: 'accounting_method',
        type: 'string',
        required: false,
        description: `Accounting method: Accrual or Cash.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Report end date in YYYY-MM-DD format.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Report start date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'quickbooks_report_transaction_list',
    description: `Retrieve a Transaction List report from QuickBooks Online.`,
    params: [
      {
        name: 'accounting_method',
        type: 'string',
        required: false,
        description: `Accounting method: Accrual or Cash.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Report end date in YYYY-MM-DD format.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Report start date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'quickbooks_report_trial_balance',
    description: `Retrieve a Trial Balance report from QuickBooks Online.`,
    params: [
      {
        name: 'accounting_method',
        type: 'string',
        required: false,
        description: `Accounting method: Accrual or Cash.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Report end date in YYYY-MM-DD format.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Report start date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'quickbooks_report_vendor_balance',
    description: `Retrieve a Vendor Balance report from QuickBooks Online.`,
    params: [
      {
        name: 'accounting_method',
        type: 'string',
        required: false,
        description: `Accounting method: Accrual or Cash.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Report end date in YYYY-MM-DD format.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Report start date in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'quickbooks_sales_receipt_create',
    description: `Create a new sales receipt in QuickBooks Online.`,
    params: [
      {
        name: 'CustomerRef',
        type: 'string',
        required: true,
        description: `Customer reference as JSON.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      { name: 'DocNumber', type: 'string', required: false, description: `Receipt number.` },
      {
        name: 'PaymentRefNum',
        type: 'string',
        required: false,
        description: `Payment reference number.`,
      },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_sales_receipt_delete',
    description: `Delete a sales receipt in QuickBooks Online.`,
    params: [
      { name: 'Id', type: 'string', required: true, description: `Sales Receipt ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from sales_receipt_get.`,
      },
    ],
  },
  {
    name: 'quickbooks_sales_receipt_get',
    description: `Retrieve a single QuickBooks Online sales receipt by ID.`,
    params: [
      {
        name: 'sales_receipt_id',
        type: 'string',
        required: true,
        description: `The ID of the sales receipt.`,
      },
    ],
  },
  {
    name: 'quickbooks_sales_receipt_update',
    description: `Update an existing sales receipt in QuickBooks Online. Requires SyncToken from sales_receipt_get.`,
    params: [
      {
        name: 'CustomerRef',
        type: 'string',
        required: true,
        description: `Customer reference as JSON.`,
      },
      {
        name: 'Id',
        type: 'string',
        required: true,
        description: `The ID of the sales receipt to update.`,
      },
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from the sales_receipt_get response (optimistic locking).`,
      },
      { name: 'DocNumber', type: 'string', required: false, description: `Receipt number.` },
      {
        name: 'PaymentRefNum',
        type: 'string',
        required: false,
        description: `Payment reference number.`,
      },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_sales_receipts_list',
    description: `List sales receipts from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause.`,
      },
    ],
  },
  {
    name: 'quickbooks_tax_code_get',
    description: `Retrieve a single QuickBooks Online tax code by ID.`,
    params: [
      {
        name: 'tax_code_id',
        type: 'string',
        required: true,
        description: `The ID of the tax code.`,
      },
    ],
  },
  {
    name: 'quickbooks_tax_codes_list',
    description: `List tax codes from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
    ],
  },
  {
    name: 'quickbooks_tax_rate_get',
    description: `Retrieve a single tax rate by ID from QuickBooks Online.`,
    params: [
      {
        name: 'tax_rate_id',
        type: 'string',
        required: true,
        description: `The ID of the tax rate.`,
      },
    ],
  },
  {
    name: 'quickbooks_tax_rates_list',
    description: `List tax rates from QuickBooks Online with optional filtering and pagination.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause, e.g. "Active = true"`,
      },
    ],
  },
  {
    name: 'quickbooks_time_activities_list',
    description: `List time activities from QuickBooks Online via the SQL-like query endpoint (entity=TimeActivity), matching the existing list-tool pattern used for other entities.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause, e.g. "TxnDate > '2024-01-01'"`,
      },
    ],
  },
  {
    name: 'quickbooks_time_activity_create',
    description: `Create a new time activity (billable or non-billable time entry) for an employee or vendor in QuickBooks Online. Set NameOf to 'Employee' and provide EmployeeRef, or set NameOf to 'Vendor' and provide VendorRef. Record duration with either Hours/Minutes or StartTime/EndTime, but not both.`,
    params: [
      {
        name: 'NameOf',
        type: 'string',
        required: true,
        description: `Whether this time activity is for an Employee or a Vendor. Determines whether EmployeeRef or VendorRef is required.`,
      },
      {
        name: 'TxnDate',
        type: 'string',
        required: true,
        description: `The date of the time activity, in YYYY-MM-DD format.`,
      },
      {
        name: 'BillableStatus',
        type: 'string',
        required: false,
        description: `Billing status of this time activity: Billable, NotBillable, or HasBeenBilled.`,
      },
      {
        name: 'ClassRef',
        type: 'string',
        required: false,
        description: `Class reference as JSON, e.g. {"value":"123"}.`,
      },
      {
        name: 'CustomerRef',
        type: 'string',
        required: false,
        description: `Customer reference as JSON, e.g. {"value":"123"}. Set this to make the time billable to a customer.`,
      },
      {
        name: 'DepartmentRef',
        type: 'string',
        required: false,
        description: `Department (location) reference as JSON, e.g. {"value":"123"}.`,
      },
      {
        name: 'Description',
        type: 'string',
        required: false,
        description: `Free-text description of the work performed.`,
      },
      {
        name: 'EmployeeRef',
        type: 'string',
        required: false,
        description: `Employee reference as JSON, e.g. {"value":"123"}. Required when NameOf is 'Employee'.`,
      },
      {
        name: 'EndTime',
        type: 'string',
        required: false,
        description: `Time work ended, e.g. 2024-06-15T17:00:00-07:00. Use together with StartTime instead of Hours/Minutes.`,
      },
      {
        name: 'HourlyRate',
        type: 'number',
        required: false,
        description: `Hourly rate to bill or pay for this time activity.`,
      },
      {
        name: 'Hours',
        type: 'integer',
        required: false,
        description: `Whole hours worked (0-23). Use together with Minutes instead of StartTime/EndTime.`,
      },
      {
        name: 'ItemRef',
        type: 'string',
        required: false,
        description: `Service item reference as JSON, e.g. {"value":"123"}. Used when the time is billable.`,
      },
      {
        name: 'Minutes',
        type: 'integer',
        required: false,
        description: `Minutes worked (0-59), in addition to Hours.`,
      },
      {
        name: 'PayrollItemRef',
        type: 'string',
        required: false,
        description: `Payroll item reference as JSON, e.g. {"value":"123"}. US payroll only.`,
      },
      {
        name: 'StartTime',
        type: 'string',
        required: false,
        description: `Time work started, e.g. 2024-06-15T09:00:00-07:00. Use together with EndTime instead of Hours/Minutes.`,
      },
      {
        name: 'VendorRef',
        type: 'string',
        required: false,
        description: `Vendor reference as JSON, e.g. {"value":"123"}. Required when NameOf is 'Vendor'.`,
      },
    ],
  },
  {
    name: 'quickbooks_time_activity_get',
    description: `Retrieve a single QuickBooks Online time activity by ID.`,
    params: [
      {
        name: 'time_activity_id',
        type: 'string',
        required: true,
        description: `The ID of the time activity.`,
      },
    ],
  },
  {
    name: 'quickbooks_transfer_create',
    description: `Create a new fund transfer between accounts in QuickBooks Online.`,
    params: [
      {
        name: 'Amount',
        type: 'string',
        required: true,
        description: `Transfer amount as number string.`,
      },
      {
        name: 'FromAccountRef',
        type: 'string',
        required: true,
        description: `Source account reference as JSON.`,
      },
      {
        name: 'ToAccountRef',
        type: 'string',
        required: true,
        description: `Destination account reference as JSON.`,
      },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
      {
        name: 'TxnDate',
        type: 'string',
        required: false,
        description: `Transaction date YYYY-MM-DD.`,
      },
    ],
  },
  {
    name: 'quickbooks_transfer_get',
    description: `Retrieve a single QuickBooks Online transfer by ID.`,
    params: [
      {
        name: 'transfer_id',
        type: 'string',
        required: true,
        description: `The ID of the transfer.`,
      },
    ],
  },
  {
    name: 'quickbooks_transfers_list',
    description: `List transfers from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
    ],
  },
  {
    name: 'quickbooks_vendor_create',
    description: `Create a new vendor in QuickBooks Online.`,
    params: [
      {
        name: 'DisplayName',
        type: 'string',
        required: true,
        description: `Display name for the vendor.`,
      },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the vendor is active.`,
      },
      { name: 'CompanyName', type: 'string', required: false, description: `Company name.` },
      { name: 'FamilyName', type: 'string', required: false, description: `Last name.` },
      { name: 'GivenName', type: 'string', required: false, description: `First name.` },
      { name: 'PrimaryEmailAddr', type: 'string', required: false, description: `Email as JSON.` },
      { name: 'PrimaryPhone', type: 'string', required: false, description: `Phone as JSON.` },
    ],
  },
  {
    name: 'quickbooks_vendor_credit_create',
    description: `Create a new vendor credit in QuickBooks Online.`,
    params: [
      { name: 'Line', type: 'string', required: true, description: `Line items as JSON array.` },
      {
        name: 'VendorRef',
        type: 'string',
        required: true,
        description: `Vendor reference as JSON.`,
      },
      { name: 'DocNumber', type: 'string', required: false, description: `Vendor credit number.` },
      { name: 'PrivateNote', type: 'string', required: false, description: `Internal memo.` },
    ],
  },
  {
    name: 'quickbooks_vendor_credit_get',
    description: `Retrieve a single QuickBooks Online vendor credit by ID.`,
    params: [
      {
        name: 'vendor_credit_id',
        type: 'string',
        required: true,
        description: `The ID of the vendor credit.`,
      },
    ],
  },
  {
    name: 'quickbooks_vendor_credits_list',
    description: `List vendor credits from QuickBooks Online.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
    ],
  },
  {
    name: 'quickbooks_vendor_get',
    description: `Retrieve a single QuickBooks Online vendor by ID.`,
    params: [
      { name: 'vendor_id', type: 'string', required: true, description: `The ID of the vendor.` },
    ],
  },
  {
    name: 'quickbooks_vendor_update',
    description: `Update an existing vendor in QuickBooks Online.`,
    params: [
      { name: 'DisplayName', type: 'string', required: true, description: `Display name.` },
      { name: 'Id', type: 'string', required: true, description: `Vendor ID.` },
      {
        name: 'SyncToken',
        type: 'string',
        required: true,
        description: `SyncToken from vendor_get.`,
      },
      {
        name: 'Active',
        type: 'boolean',
        required: false,
        description: `Whether the vendor is active.`,
      },
      { name: 'CompanyName', type: 'string', required: false, description: `Company name.` },
      { name: 'PrimaryEmailAddr', type: 'string', required: false, description: `Email as JSON.` },
    ],
  },
  {
    name: 'quickbooks_vendors_list',
    description: `List vendors from QuickBooks Online with optional filtering and pagination.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: true,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'start_position',
        type: 'integer',
        required: true,
        description: `Starting position for pagination (1-based).`,
      },
      {
        name: 'where_clause',
        type: 'string',
        required: false,
        description: `Optional WHERE clause.`,
      },
    ],
  },
]
