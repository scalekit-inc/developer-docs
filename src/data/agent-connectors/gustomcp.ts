import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'gustomcp_accept_reasonable_salary',
    description: `Accept the most recently calculated reasonable-salary estimate (from calculate_reasonable_salary) for a Solo S-corp owner, recording it as their W-2 salary for IRS-defensibility. Call only after the user has reviewed and explicitly confirmed the estimate.`,
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
    name: 'gustomcp_calculate_reasonable_salary',
    description: `Calculate an IRS-defensible reasonable salary for an S-corp owner from BLS wage data, given the company's zip_code and one or more occupations (codes from search_business_info with type occupation). Overwrites the single in-progress estimate for the company/owner; call accept_reasonable_salary to persist it after user confirmation.`,
    params: [
      {
        name: 'occupations',
        type: 'array',
        required: true,
        description: `The occupation(s) making up the owner's role. At least one entry is required; for a split role pass several, with time_percentage values summing to 1.0`,
      },
      {
        name: 'zip_code',
        type: 'string',
        required: true,
        description: `The company's 5-digit ZIP code, used to find the BLS wage area`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'annual_net_revenue',
        type: 'integer',
        required: false,
        description: `The company's annual net revenue in whole USD; when provided, caps the salary at this amount`,
      },
      {
        name: 'work_schedule',
        type: 'object',
        required: false,
        description: `The owner's work schedule. Defaults to full-time`,
      },
    ],
  },
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
    name: 'gustomcp_get_company_onboarding_package',
    description: `Get the company's available onboarding plans, add-ons, and benefits, plus Gusto's recommended package and the company's current selection. The first call made once the profile is ready also computes and stores the recommendation, a one-time side effect.`,
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
    name: 'gustomcp_get_company_onboarding_status',
    description: `Get the company's onboarding status for its current experience, including outstanding questions, whether each is required, and their answer schemas. Drives step-by-step onboarding: save answers with save_company_onboarding_answer and re-check status after each save since a save can reroute the remaining questions.`,
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
    name: 'gustomcp_get_onboarding_answer',
    description: `Get the current answer for a single onboarding question by question_key (as surfaced by get_company_onboarding_status), including any unset fields as null.`,
    params: [
      {
        name: 'question_key',
        type: 'string',
        required: true,
        description: `The onboarding question to read (e.g. "ein", "who_to_pay"), as surfaced by get_company_onboarding_status`,
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
    description: `List time records for the company over a date range. Requires start_date and end_date.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End date of the pay period (YYYY-MM-DD). Filters both native shifts and third-party timesheets.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start date of the pay period (YYYY-MM-DD). Filters both native shifts and third-party timesheets.`,
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
    name: 'gustomcp_manage_account',
    description: `Get the Gusto account's status or resend the password setup email, via the action parameter.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The account action to perform`,
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
    name: 'gustomcp_record_time',
    description: `Record time for an employee or contractor (identified by company_member_uuid, from list_time_records), either adding a new shift or updating an existing one via on_existing. shift_started_at, shift_ended_at, and timezone are always required, but may be sent as null on an update to leave that field unchanged; updates additionally require shift_id.`,
    params: [
      {
        name: 'company_member_uuid',
        type: 'string',
        required: true,
        description: `The company member UUID for the worker whose time is being recorded, from list_time_records' companyMemberUuid field`,
      },
      { name: 'company_uuid', type: 'string', required: true, description: `The company's UUID` },
      {
        name: 'shift_ended_at',
        type: 'string',
        required: true,
        description: `ISO8601 timestamp with explicit UTC offset for the end of the shift, in the past. Must be later than shift_started_at. Null leaves the stored end alone on an update; refused on an add`,
      },
      {
        name: 'shift_started_at',
        type: 'string',
        required: true,
        description: `ISO8601 timestamp with explicit UTC offset for the start of the shift. Must be earlier than shift_ended_at. Null is only meaningful when on_existing is "update", where it leaves the stored start alone; refused on an add`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: true,
        description: `IANA timezone of the worker (e.g. America/Los_Angeles). Sets the tracker's timezone when one isn't already set. Null leaves the stored timezone alone on an update`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'hours_worked',
        type: 'number',
        required: false,
        description: `Only used for external/third-party time tracking; ignored for native. Overrides the hours derived from the shift window rather than validating against it`,
      },
      {
        name: 'job_uuid',
        type: 'string',
        required: false,
        description: `The job UUID the hours belong to, from list_employee_jobs. Required on a native update; omit entirely for a contractor`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Optional note to attach to the entry. Only used for native time tracking; dropped (with a warning) for third-party`,
      },
      {
        name: 'on_existing',
        type: 'string',
        required: false,
        description: `Whether to add a new entry alongside existing time, or update an existing one. Defaults to add when omitted. update also requires shift_id`,
      },
      {
        name: 'ot_policy_approved',
        type: 'boolean',
        required: false,
        description: `Only relevant for external/third-party time tracking with unclassified hours. Set true once the admin has explicitly approved the overtime policy suggestion returned by a prior refusal`,
      },
      {
        name: 'shift_id',
        type: 'string',
        required: false,
        description: `Required when on_existing is "update". For native time tracking it's a shift's id under shifts; for third-party it's the timesheet's own top-level id under timesheets`,
      },
    ],
  },
  {
    name: 'gustomcp_run_payroll',
    description: `Calculate and submit an existing unprocessed payroll by payroll_uuid. Cannot create new or off-cycle payrolls; use update_payroll first to adjust hours, amounts, or PTO before running.`,
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
    ],
  },
  {
    name: 'gustomcp_save_company_onboarding_answer',
    description: `Save the answer for one onboarding question_key. The value's shape depends on the question (see its value_schema from get_company_onboarding_status); a successful save returns the refreshed onboarding_status since a save can reroute the remaining questions.`,
    params: [
      {
        name: 'question_key',
        type: 'string',
        required: true,
        description: `The onboarding question to answer (e.g. "who_to_pay"), as surfaced by the onboarding status read`,
      },
      {
        name: 'value',
        type: 'object',
        required: true,
        description: `The answer object for the given question_key. Most questions take a flat object whose keys are the field names from the question's value_schema, e.g. { "pay_employees": true } for question_key "who_to_pay". Exception: "company_state_tax_setup" nests its state-qualified keys under a "fields" object.`,
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
    name: 'gustomcp_search_business_info',
    description: `Resolve free-text business info to canonical codes: type industry returns NAICS industry classifications, type occupation returns BLS occupation codes, matched against the user's query.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The user's free-text description of what to resolve, in their own words (e.g. "we run an apple orchard" for industry, or "software developer" for occupation)`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `What kind of business information to resolve. "industry" returns NAICS industry classifications; "occupation" returns BLS occupation codes`,
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
    name: 'gustomcp_submit_feedback',
    description: `Submit user feedback about the Gusto MCP experience, with an optional category and freeform context metadata (e.g. tool invoked, app version, OS).`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The user's feedback (required, max 5000 characters)`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Optional category for the feedback`,
      },
      {
        name: 'context',
        type: 'object',
        required: false,
        description: `Optional metadata (e.g. tool invoked, app version, OS) to help the reviewer`,
      },
    ],
  },
  {
    name: 'gustomcp_update_payroll',
    description: `Update inputs (hours, amounts, memos, PTO, exclusions, payment method) for employees on an unprocessed payroll before running it. Send an empty employee_compensations array only to materialize the roster of a pre-prepare payroll. withholding_pay_period, skip_regular_deductions, and fixed_withholding_rate apply to general off-cycle payrolls only.`,
    params: [
      {
        name: 'employee_compensations',
        type: 'array',
        required: true,
        description: `Array of per-employee updates. Only include employees you want to change; omitted employees are left as-is. Max 100. Send an EMPTY array to materialize the roster of a pre-prepare payroll`,
      },
      {
        name: 'payroll_uuid',
        type: 'string',
        required: true,
        description: `UUID of the unprocessed payroll to update`,
      },
      {
        name: '_context',
        type: 'string',
        required: false,
        description: `The original user question or request that prompted this tool call`,
      },
      {
        name: 'fixed_withholding_rate',
        type: 'boolean',
        required: false,
        description: `General off-cycle only. Withholds federal at IRS supplemental rate (22%) and state at state supplemental rate`,
      },
      {
        name: 'skip_regular_deductions',
        type: 'boolean',
        required: false,
        description: `General off-cycle only. Blocks regular deductions and contributions for this payroll`,
      },
      {
        name: 'withholding_pay_period',
        type: 'string',
        required: false,
        description: `General off-cycle only (Correction/Bonus/Adhoc). Not accepted by termination or transition payrolls`,
      },
    ],
  },
]
