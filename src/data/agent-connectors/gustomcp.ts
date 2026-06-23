import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'gustomcp_get_company',
    description: `Retrieve the company profile including legal name, entity type, EIN, and status.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_get_compensation',
    description: `Retrieve a single pay rate record by UUID, including rate, frequency, and FLSA status.`,
    params: [
      {
        name: 'compensation_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the record`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_get_contractor',
    description: `Retrieve full profile for a contractor by UUID, including name, email, and payment method.`,
    params: [
      {
        name: 'contractor_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the contractor`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_get_contractor_payment',
    description: `Retrieve details for a single contractor payment by UUID, including amount and payment method.`,
    params: [
      {
        name: 'contractor_payment_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the contractor payment`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_get_contractor_payment_group',
    description: `Retrieve all individual contractor payments within a batched payment group by UUID.`,
    params: [
      {
        name: 'contractor_payment_group_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the contractor payment group`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_get_department',
    description: `Retrieve details for a single department by UUID, including name and assigned employees.`,
    params: [
      {
        name: 'department_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the department`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_get_employee',
    description: `Retrieve full profile for an employee by UUID, including name, hire date, job, and location.`,
    params: [
      {
        name: 'employee_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the employee to retrieve`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated fields to include: all_compensations, all_home_addresses, company_name, current_home_address, custom_fields, portal_invitations`,
      },
    ],
  },
  {
    name: 'gustomcp_get_employee_earnings_summary',
    description: `Return per-employee earning breakdowns aggregated across all payrolls in a date range.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End of date range (YYYY-MM-DD). Defaults to today.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start of date range (YYYY-MM-DD). Defaults to Jan 1 of current year.`,
      },
    ],
  },
  {
    name: 'gustomcp_get_employee_home_address',
    description: `Retrieve a single home address record by UUID, including street, city, state, and ZIP.`,
    params: [
      {
        name: 'home_address_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the address`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_get_employee_rehire',
    description: `Retrieve rehire details for an employee, including new start date and updated employment terms.`,
    params: [
      {
        name: 'employee_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the employee`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_get_employee_work_address',
    description: `Retrieve a single work location assignment by UUID, including address and effective dates.`,
    params: [
      {
        name: 'work_address_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the work location`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_get_job',
    description: `Retrieve details for a job position by UUID, including title, department, and current pay rate.`,
    params: [
      {
        name: 'job_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the job`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Use all_compensations to include all effective dated compensations instead of only the current compensation`,
      },
    ],
  },
  {
    name: 'gustomcp_get_location',
    description: `Retrieve details for a company location by UUID, including address and filing information.`,
    params: [
      {
        name: 'location_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the location`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_get_pay_schedule',
    description: `Retrieve a pay schedule by UUID, including frequency and next scheduled pay dates.`,
    params: [
      {
        name: 'pay_schedule_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the pay schedule`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_get_payroll',
    description: `Retrieve complete details for a payroll run by UUID, including earnings, taxes, and net pay.`,
    params: [
      {
        name: 'payroll_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the payroll`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'employee_compensations_page',
        type: 'integer',
        required: false,
        description: `Page number for paginating employee compensations within the payroll. Defaults to 1.`,
      },
      {
        name: 'employee_compensations_per',
        type: 'integer',
        required: false,
        description: `Number of employee compensations per page. Defaults to 100 (max).`,
      },
    ],
  },
  {
    name: 'gustomcp_get_time_sheet',
    description: `Retrieve time entries for a timesheet by UUID, including daily hours, overtime, and notes.`,
    params: [
      {
        name: 'time_sheet_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the timesheet`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_get_token_info',
    description: `Return information about the current API token, including granted scopes and accessible resources.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_list_contractor_payment_groups',
    description: `List batched contractor payment runs, showing payment group UUIDs and check dates.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Optional end of date range (YYYY-MM-DD)`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      { name: 'per', type: 'integer', required: false, description: `Number of items per page` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Optional start of date range (YYYY-MM-DD)`,
      },
    ],
  },
  {
    name: 'gustomcp_list_contractor_payments',
    description: `List payments made to contractors within a date range. Requires start_date and end_date.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End of date range (YYYY-MM-DD) for contractor payments`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start of date range (YYYY-MM-DD) for contractor payments`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'contractor_uuid',
        type: 'string',
        required: false,
        description: `Filter payments by contractor UUID`,
      },
      {
        name: 'group_by_date',
        type: 'boolean',
        required: false,
        description: `When true, groups results by check date`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      { name: 'per', type: 'integer', required: false, description: `Number of items per page` },
    ],
  },
  {
    name: 'gustomcp_list_contractors',
    description: `List all independent contractors for the company with pagination and search support.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated fields to include: company_name, portal_invitations`,
      },
      {
        name: 'onboarded',
        type: 'boolean',
        required: false,
        description: `Filter by contractors who have completed onboarding`,
      },
      {
        name: 'onboarded_active',
        type: 'boolean',
        required: false,
        description: `Filter by contractors who are onboarded and currently active`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      { name: 'per', type: 'integer', required: false, description: `Number of items per page` },
      {
        name: 'search_term',
        type: 'string',
        required: false,
        description: `A string to search for in names`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort field and optional direction, e.g. name:asc. Supported fields: created_at, name, onboarding_status, type`,
      },
      {
        name: 'terminated',
        type: 'boolean',
        required: false,
        description: `Filter by contractors who are no longer active`,
      },
      {
        name: 'terminated_today',
        type: 'boolean',
        required: false,
        description: `Filter by contractors whose last day was today`,
      },
    ],
  },
  {
    name: 'gustomcp_list_custom_fields_schema',
    description: `Retrieve definitions of all custom fields configured for the company, including types and options.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default 1)`,
      },
      {
        name: 'per',
        type: 'integer',
        required: false,
        description: `Number of items per page (default 25, max 500)`,
      },
    ],
  },
  {
    name: 'gustomcp_list_departments',
    description: `List all departments in the company, including names, UUIDs, and assigned employees.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_list_earning_types',
    description: `List all earning type categories for the company, such as regular pay, overtime, and bonuses.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_list_employee_custom_fields',
    description: `Retrieve all custom field values set for a specific employee.`,
    params: [
      {
        name: 'employee_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the employee`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      { name: 'per', type: 'integer', required: false, description: `Number of items per page` },
    ],
  },
  {
    name: 'gustomcp_list_employee_employment_history',
    description: `Retrieve the work history timeline for an employee, including all roles and status changes.`,
    params: [
      {
        name: 'employee_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the employee`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_list_employee_home_addresses',
    description: `List all home addresses on file for an employee, including current and historical entries.`,
    params: [
      {
        name: 'employee_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the employee`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_list_employee_jobs',
    description: `List all job positions held by an employee, including title, location, and rate information.`,
    params: [
      {
        name: 'employee_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the employee`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Use all_compensations to include all effective dated compensations for each job`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      { name: 'per', type: 'integer', required: false, description: `Number of items per page` },
    ],
  },
  {
    name: 'gustomcp_list_employee_terminations',
    description: `Retrieve separation records for an employee, including departure dates and final pay details.`,
    params: [
      {
        name: 'employee_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the employee`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_list_employee_work_addresses',
    description: `List all work locations assigned to an employee, with effective dates.`,
    params: [
      {
        name: 'employee_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the employee`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_list_employees',
    description: `List all employees for the company with pagination and filtering by status, onboarding, or name.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated fields to include: all_compensations, all_home_addresses, company_name, current_home_address, custom_fields, portal_invitations`,
      },
      {
        name: 'location_uuid',
        type: 'string',
        required: false,
        description: `Filter by employees assigned to a specific location UUID`,
      },
      {
        name: 'onboarded',
        type: 'boolean',
        required: false,
        description: `Filter by employees who have completed onboarding`,
      },
      {
        name: 'onboarded_active',
        type: 'boolean',
        required: false,
        description: `Filter by employees who are onboarded and currently active`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      {
        name: 'payroll_uuid',
        type: 'string',
        required: false,
        description: `Filter by employees included in a specific payroll UUID`,
      },
      { name: 'per', type: 'integer', required: false, description: `Number of items per page` },
      {
        name: 'search_term',
        type: 'string',
        required: false,
        description: `A string to search for in names`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort field and optional direction, e.g. name:asc. Supported fields: created_at, name, onboarding_status`,
      },
      {
        name: 'terminated',
        type: 'boolean',
        required: false,
        description: `Filter by employees who are no longer active with the company`,
      },
      {
        name: 'terminated_today',
        type: 'boolean',
        required: false,
        description: `Filter by employees whose last day was today`,
      },
      {
        name: 'uuids',
        type: 'string',
        required: false,
        description: `Comma-separated subset of employee UUIDs to fetch`,
      },
    ],
  },
  {
    name: 'gustomcp_list_job_compensations',
    description: `List the pay rate history for a job position, showing all rate changes over time.`,
    params: [
      {
        name: 'job_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the job`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Use all_compensations to include all effective dated compensations instead of only the current compensation`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      { name: 'per', type: 'integer', required: false, description: `Number of items per page` },
    ],
  },
  {
    name: 'gustomcp_list_locations',
    description: `List all physical office and work locations registered for the company.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      { name: 'per', type: 'integer', required: false, description: `Number of items per page` },
    ],
  },
  {
    name: 'gustomcp_list_pay_periods',
    description: `List all pay periods for the company, showing start and end dates and linked payroll runs.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Filter pay periods ending on or before this date (YYYY-MM-DD). Defaults to today. Cannot be more than 3 months in the future.`,
      },
      {
        name: 'payroll_types',
        type: 'string',
        required: false,
        description: `Comma-separated payroll types to include: regular, transition`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Filter pay periods starting on or after this date (YYYY-MM-DD). Defaults to 6 months ago. Must be within 1 year of end_date.`,
      },
    ],
  },
  {
    name: 'gustomcp_list_pay_schedule_assignments',
    description: `Show which employees are assigned to which pay schedules.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_list_pay_schedules',
    description: `List all pay schedules for the company, showing frequency and schedule UUID.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      { name: 'per', type: 'integer', required: false, description: `Number of items per page` },
    ],
  },
  {
    name: 'gustomcp_list_payroll_blockers',
    description: `Identify issues preventing a payroll from being processed, such as missing setup or documents.`,
    params: [
      {
        name: 'payroll_uuid',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) for the payroll to check blockers for`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
  {
    name: 'gustomcp_list_payrolls',
    description: `List all payroll runs for the company with optional filtering by type, date, and status.`,
    params: [
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'date_filter_by',
        type: 'string',
        required: false,
        description: `Specifies which date field to use when filtering with start_date and end_date. Only applies to regular processed payrolls. Defaults to pay period if not provided. Valid value is check_date.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Filters where the pay period ends on or before this date (YYYY-MM-DD). Cannot be more than 3 months in the future and must be within 1 year of start_date.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated: taxes, totals, payroll_status_meta, risk_blockers, reversals`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `The page that is requested. When unspecified, will load all objects unless endpoint forces pagination.`,
      },
      {
        name: 'payroll_types',
        type: 'string',
        required: false,
        description: `Comma-separated: regular,off_cycle,external`,
      },
      {
        name: 'per',
        type: 'integer',
        required: false,
        description: `Number of objects per page. For majority of endpoints will default to 25.`,
      },
      {
        name: 'processing_statuses',
        type: 'string',
        required: false,
        description: `Comma-separated: processed,unprocessed`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort field: pay_period or check_date`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort payrolls in ascending (asc) or descending (desc) chronological order. Defaults to asc.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Filters where the pay period starts on or after this date (YYYY-MM-DD). Must be within 1 year of end_date.`,
      },
    ],
  },
  {
    name: 'gustomcp_list_time_records',
    description: `List time records for the company over a pay period. Requires pay_period with start and end dates.`,
    params: [
      {
        name: 'pay_period',
        type: 'object',
        required: true,
        description: `Date range to query. Pass as an object with start_date and end_date in YYYY-MM-DD format.`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
    ],
  },
]
