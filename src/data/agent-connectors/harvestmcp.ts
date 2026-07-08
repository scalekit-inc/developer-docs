import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'harvestmcp_add_task_to_project',
    description: `Add an existing task to a project. project_id and task_id are required.`,
    params: [
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `Project id to add the task to.`,
      },
      { name: 'task_id', type: 'integer', required: true, description: `Task id to add.` },
      {
        name: 'billable',
        type: 'boolean',
        required: false,
        description: `Whether the task is billable on this project. Defaults to the task's billable_by_default.`,
      },
      {
        name: 'hourly_rate',
        type: 'number',
        required: false,
        description: `Hourly rate for this task on this project.`,
      },
    ],
  },
  {
    name: 'harvestmcp_assign_user_to_project',
    description: `Assign a user to a project. project_id and user_id are required.`,
    params: [
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `Project id to assign the user to.`,
      },
      { name: 'user_id', type: 'integer', required: true, description: `User id to assign.` },
      {
        name: 'budget',
        type: 'number',
        required: false,
        description: `Optional user-level budget in hours.`,
      },
      {
        name: 'hourly_rate',
        type: 'number',
        required: false,
        description: `Hourly rate for this user on this project.`,
      },
      {
        name: 'is_project_manager',
        type: 'boolean',
        required: false,
        description: `Whether to grant project manager role for this project.`,
      },
    ],
  },
  {
    name: 'harvestmcp_create_client',
    description: `Create a new client. name is required.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Client name.` },
      { name: 'address', type: 'string', required: false, description: `Client mailing address.` },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `ISO 4217 currency code (e.g. USD).`,
      },
    ],
  },
  {
    name: 'harvestmcp_create_expense',
    description: `Log a new expense. project_id, expense_category_id, spent_date, and total_cost are required.`,
    params: [
      {
        name: 'expense_category_id',
        type: 'integer',
        required: true,
        description: `Expense category id.`,
      },
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `Project id to log the expense against.`,
      },
      {
        name: 'spent_date',
        type: 'string',
        required: true,
        description: `Date the expense was incurred (YYYY-MM-DD).`,
      },
      {
        name: 'total_cost',
        type: 'number',
        required: true,
        description: `Total cost of the expense.`,
      },
      {
        name: 'billable',
        type: 'boolean',
        required: false,
        description: `Whether the expense is billable to the client. Defaults to true.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Optional description of the expense.`,
      },
    ],
  },
  {
    name: 'harvestmcp_create_invoice',
    description: `Create a free-form draft invoice for a client. client_id is required; supply line_items for the invoice content. Invoice number is assigned automatically; invoice is created as draft.`,
    params: [
      {
        name: 'client_id',
        type: 'integer',
        required: true,
        description: `Client id the invoice is for.`,
      },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `ISO 4217 currency code (e.g. USD, EUR).`,
      },
      { name: 'due_date', type: 'string', required: false, description: `Due date (YYYY-MM-DD).` },
      {
        name: 'issue_date',
        type: 'string',
        required: false,
        description: `Issue date (YYYY-MM-DD). Defaults to today.`,
      },
      {
        name: 'line_items',
        type: 'array',
        required: false,
        description: `Invoice line items. Each item: {kind, description, quantity, unit_price}.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Optional notes shown on the invoice.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Optional invoice subject line.`,
      },
    ],
  },
  {
    name: 'harvestmcp_create_invoice_from_tracked_time',
    description: `Create a draft invoice for a client by importing uninvoiced billable tracked time and/or expenses. client_id and project_ids are required, plus at least one of \`time\` or \`expenses\`.`,
    params: [
      {
        name: 'client_id',
        type: 'integer',
        required: true,
        description: `Client id the invoice is for.`,
      },
      {
        name: 'project_ids',
        type: 'array',
        required: true,
        description: `Billable project ids to import activity from.`,
      },
      { name: 'currency', type: 'string', required: false, description: `ISO 4217 currency code.` },
      { name: 'due_date', type: 'string', required: false, description: `Due date (YYYY-MM-DD).` },
      {
        name: 'expenses',
        type: 'object',
        required: false,
        description: `Import expenses. Properties: summary_type (required, enum: project/people/category/detailed), from (YYYY-MM-DD), to (YYYY-MM-DD).`,
      },
      {
        name: 'issue_date',
        type: 'string',
        required: false,
        description: `Issue date (YYYY-MM-DD).`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Optional invoice subject.`,
      },
      {
        name: 'time',
        type: 'object',
        required: false,
        description: `Import tracked time. Properties: summary_type (required, enum: detailed/project/task/people), from (YYYY-MM-DD), to (YYYY-MM-DD).`,
      },
    ],
  },
  {
    name: 'harvestmcp_create_project',
    description: `Create a new project. client_id and name are required.`,
    params: [
      {
        name: 'client_id',
        type: 'integer',
        required: true,
        description: `Client id the project belongs to.`,
      },
      { name: 'name', type: 'string', required: true, description: `Project name.` },
      {
        name: 'budget',
        type: 'number',
        required: false,
        description: `Optional budget amount in hours or currency.`,
      },
      {
        name: 'budget_by',
        type: 'string',
        required: false,
        description: `How the budget is tracked.`,
      },
      {
        name: 'code',
        type: 'string',
        required: false,
        description: `Optional project code or short identifier.`,
      },
      {
        name: 'ends_on',
        type: 'string',
        required: false,
        description: `Project end date (YYYY-MM-DD).`,
      },
      {
        name: 'hourly_rate',
        type: 'number',
        required: false,
        description: `Default hourly rate for the project.`,
      },
      {
        name: 'is_billable',
        type: 'boolean',
        required: false,
        description: `Whether the project is billable. Defaults to true.`,
      },
      { name: 'notes', type: 'string', required: false, description: `Optional project notes.` },
      {
        name: 'starts_on',
        type: 'string',
        required: false,
        description: `Project start date (YYYY-MM-DD).`,
      },
    ],
  },
  {
    name: 'harvestmcp_create_task',
    description: `Create a new task in the account. name is required.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Task name.` },
      {
        name: 'billable_by_default',
        type: 'boolean',
        required: false,
        description: `Whether the task is billable when added to a project. Defaults to true.`,
      },
      {
        name: 'default_hourly_rate',
        type: 'number',
        required: false,
        description: `Default hourly rate for this task.`,
      },
      {
        name: 'is_active',
        type: 'boolean',
        required: false,
        description: `Whether the task is active. Defaults to true.`,
      },
      {
        name: 'is_default',
        type: 'boolean',
        required: false,
        description: `If true, this task is automatically added to new projects.`,
      },
    ],
  },
  {
    name: 'harvestmcp_delete_time_entry',
    description: `Permanently delete a time entry. id is required. This cannot be undone.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Time entry id to delete.` },
    ],
  },
  {
    name: 'harvestmcp_get_account_settings',
    description: `Return account-level settings: company name, plan, timezone, week start day, hour rounding configuration, and other preferences.`,
    params: [],
  },
  {
    name: 'harvestmcp_get_expense',
    description: `Return a single expense by id, including category, project, and receipt info.`,
    params: [{ name: 'id', type: 'integer', required: true, description: `Expense id.` }],
  },
  {
    name: 'harvestmcp_get_invoice',
    description: `Return a single invoice with its header and full line_items. Use list_invoices first to find the id.`,
    params: [{ name: 'id', type: 'integer', required: true, description: `Invoice id.` }],
  },
  {
    name: 'harvestmcp_get_project_budget',
    description: `Return the budget status for a project: total budget, hours/amount spent, and remaining. project_id is required.`,
    params: [
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `Project id to get budget for.`,
      },
    ],
  },
  {
    name: 'harvestmcp_get_running_timer',
    description: `Return the currently running timer for the authenticated user, or null if no timer is running.`,
    params: [],
  },
  {
    name: 'harvestmcp_get_time_report',
    description: `Aggregate time entries over a date range, grouped by project, client, or user. Returns billable/non-billable hours, invoiced/uninvoiced hours per group. from and to are required.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `Inclusive start date (YYYY-MM-DD, e.g. 2026-06-01).`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `Inclusive end date (YYYY-MM-DD, e.g. 2026-06-30).`,
      },
      {
        name: 'group_by',
        type: 'string',
        required: false,
        description: `Grouping dimension. Defaults to project.`,
      },
      {
        name: 'include_zero_hour_users',
        type: 'boolean',
        required: false,
        description: `Only with group_by=user. When true, also returns zero-hour rows for visible team members who logged nothing.`,
      },
    ],
  },
  {
    name: 'harvestmcp_list_clients',
    description: `List clients in the user's Harvest account, ordered by name. Returns up to 100 clients per page; \`total_count\` is how many clients match the filter in full, so when \`truncated\` is true you can tell how many are missing — refine \`search\` or \`is_active\` to narrow the result.`,
    params: [
      {
        name: 'is_active',
        type: 'boolean',
        required: false,
        description: `Filter to active (true) or archived (false) clients. Omit for all.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Case-insensitive prefix match on client name.`,
      },
    ],
  },
  {
    name: 'harvestmcp_list_expense_categories',
    description: `List expense categories in the account, ordered by name. Used to look up expense_category_id before creating an expense.`,
    params: [],
  },
  {
    name: 'harvestmcp_list_expenses',
    description: `List expenses, most recent first. Filter by project_id, client_id, date range, or billable status.`,
    params: [
      {
        name: 'client_id',
        type: 'integer',
        required: false,
        description: `Filter to expenses for this client.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Inclusive start date (YYYY-MM-DD).`,
      },
      {
        name: 'is_billable',
        type: 'boolean',
        required: false,
        description: `Filter by billable status.`,
      },
      {
        name: 'project_id',
        type: 'integer',
        required: false,
        description: `Filter to expenses for this project.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `Inclusive end date (YYYY-MM-DD).`,
      },
    ],
  },
  {
    name: 'harvestmcp_list_invoices',
    description: `List invoices, most recent first. Filter by status (draft/open/sent/paid/late), client_id, issue-date range, due_date, or search term. Paginate via cursor.`,
    params: [
      {
        name: 'client_id',
        type: 'integer',
        required: false,
        description: `Filter to invoices for this client id.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination token from prior response's next_cursor.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Filter to invoices due on this exact date (YYYY-MM-DD).`,
      },
      {
        name: 'issued_from',
        type: 'string',
        required: false,
        description: `Earliest issue date, inclusive (YYYY-MM-DD).`,
      },
      {
        name: 'issued_to',
        type: 'string',
        required: false,
        description: `Latest issue date, inclusive (YYYY-MM-DD).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Page size, 1–500. Default 100.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Case-insensitive match on invoice number, subject, or PO number.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter to a single invoice status.`,
      },
    ],
  },
  {
    name: 'harvestmcp_list_project_assignments',
    description: `List users assigned to a project, with their roles and billing rates. project_id is required.`,
    params: [
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `Project id to list assignments for.`,
      },
    ],
  },
  {
    name: 'harvestmcp_list_projects',
    description: `List projects in the user's Harvest account, ordered by client name then project name. Returns up to 100 projects per page; refine \`search\`, \`client_ids\`, or \`is_active\` to narrow the result.`,
    params: [
      {
        name: 'client_ids',
        type: 'array',
        required: false,
        description: `Filter to projects belonging to any of these client ids.`,
      },
      {
        name: 'is_active',
        type: 'boolean',
        required: false,
        description: `Filter to active (true) or archived (false) projects. Omit for all.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Case-insensitive substring match on project name or code.`,
      },
    ],
  },
  {
    name: 'harvestmcp_list_tasks',
    description: `List tasks in the user's Harvest account, ordered by name. Returns up to 100 tasks per page; refine \`search\` or \`is_active\` to narrow the result.`,
    params: [
      {
        name: 'is_active',
        type: 'boolean',
        required: false,
        description: `Filter to active (true) or deactivated (false) tasks. Omit for active tasks only — pass false explicitly to see deactivated ones.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Case-insensitive prefix match on task name.`,
      },
    ],
  },
  {
    name: 'harvestmcp_list_time_entries',
    description: `List time entries, most recent first. Defaults to the last 30 days when \`from\`/\`to\` are omitted. \`hours\` is the raw tracked duration. \`billable\` = can be billed; \`is_invoiced\` = has been invoiced. Paginate via \`cursor\`/\`next_cursor\`.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination token from prior response's next_cursor. Omit on first request.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Inclusive start date (YYYY-MM-DD, e.g. 2026-06-01).`,
      },
      {
        name: 'is_invoiced',
        type: 'boolean',
        required: false,
        description: `Filter by invoiced status. true=invoiced only, false=uninvoiced only. Omit for both.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Page size, 1–500. Default 100.`,
      },
      {
        name: 'project_id',
        type: 'integer',
        required: false,
        description: `Positive integer id of a project to filter to. Omit to include all projects.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `Inclusive end date (YYYY-MM-DD, e.g. 2026-06-01).`,
      },
      {
        name: 'user_id',
        type: 'integer',
        required: false,
        description: `Positive integer id of a user to filter to. Omit to default to yourself.`,
      },
    ],
  },
  {
    name: 'harvestmcp_list_users',
    description: `List team members in the user's Harvest account, ordered by id. Returns up to 100 users per page; refine \`search\` or \`is_active\` to narrow the result. Field availability follows the caller's role.`,
    params: [
      {
        name: 'is_active',
        type: 'boolean',
        required: false,
        description: `Filter to active (true) or deactivated (false) users. Omit for all.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Case-insensitive prefix match on user name or email.`,
      },
    ],
  },
  {
    name: 'harvestmcp_log_time',
    description: `Log a duration-based time entry (not a timer). project_id, task_id, and hours are required.`,
    params: [
      {
        name: 'hours',
        type: 'number',
        required: true,
        description: `Duration in hours (e.g. 1.5 for 1h30m).`,
      },
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `Project id to track time against.`,
      },
      {
        name: 'task_id',
        type: 'integer',
        required: true,
        description: `Task id within the project.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Optional notes describing the work.`,
      },
    ],
  },
  {
    name: 'harvestmcp_remove_task_from_project',
    description: `Remove a task from a project. project_id and task_id are required.`,
    params: [
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `Project id to remove the task from.`,
      },
      { name: 'task_id', type: 'integer', required: true, description: `Task id to remove.` },
    ],
  },
  {
    name: 'harvestmcp_start_timer',
    description: `Start a running timer for the authenticated user on a project+task. project_id and task_id are required. At most one timer can run at a time; starting a new one stops the previous.`,
    params: [
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `Project id to track time against.`,
      },
      {
        name: 'task_id',
        type: 'integer',
        required: true,
        description: `Task id within the project.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Optional notes for the time entry.`,
      },
      {
        name: 'spent_date',
        type: 'string',
        required: false,
        description: `Date the time is being logged for (YYYY-MM-DD). Defaults to today.`,
      },
    ],
  },
  {
    name: 'harvestmcp_stop_timer',
    description: `Stop the currently running timer for the authenticated user. Returns the stopped time entry. No-ops if no timer is running.`,
    params: [],
  },
  {
    name: 'harvestmcp_submit_feedback',
    description: `Submit feedback or a support message to Harvest. message is required.`,
    params: [
      { name: 'message', type: 'string', required: true, description: `Feedback message text.` },
    ],
  },
  {
    name: 'harvestmcp_submit_timesheet',
    description: `Submit a timesheet period for approval. week_of is required (YYYY-MM-DD of any day in the target week).`,
    params: [
      {
        name: 'week_of',
        type: 'string',
        required: true,
        description: `Any date (YYYY-MM-DD) within the week to submit for approval.`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Optional note to the approver.`,
      },
    ],
  },
  {
    name: 'harvestmcp_unassign_user_from_project',
    description: `Remove a user from a project. project_id and user_id are required.`,
    params: [
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `Project id to remove the user from.`,
      },
      { name: 'user_id', type: 'integer', required: true, description: `User id to remove.` },
    ],
  },
  {
    name: 'harvestmcp_update_client',
    description: `Update an existing client. id is required. Only provided fields are changed.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Client id to update.` },
      { name: 'address', type: 'string', required: false, description: `New mailing address.` },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `New ISO 4217 currency code.`,
      },
      {
        name: 'is_active',
        type: 'boolean',
        required: false,
        description: `Set to false to archive the client.`,
      },
      { name: 'name', type: 'string', required: false, description: `New client name.` },
    ],
  },
  {
    name: 'harvestmcp_update_expense',
    description: `Update an existing expense. id is required. Only provided fields are changed.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Expense id to update.` },
      {
        name: 'billable',
        type: 'boolean',
        required: false,
        description: `Whether the expense is billable.`,
      },
      {
        name: 'expense_category_id',
        type: 'integer',
        required: false,
        description: `New expense category id.`,
      },
      { name: 'notes', type: 'string', required: false, description: `New notes.` },
      { name: 'project_id', type: 'integer', required: false, description: `New project id.` },
      {
        name: 'spent_date',
        type: 'string',
        required: false,
        description: `New date (YYYY-MM-DD).`,
      },
      { name: 'total_cost', type: 'number', required: false, description: `New total cost.` },
    ],
  },
  {
    name: 'harvestmcp_update_project',
    description: `Update an existing project. id is required. Only provided fields are changed.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Project id to update.` },
      { name: 'budget', type: 'number', required: false, description: `New budget amount.` },
      { name: 'code', type: 'string', required: false, description: `New project code.` },
      {
        name: 'ends_on',
        type: 'string',
        required: false,
        description: `New end date (YYYY-MM-DD).`,
      },
      {
        name: 'is_active',
        type: 'boolean',
        required: false,
        description: `Set to false to archive the project.`,
      },
      {
        name: 'is_billable',
        type: 'boolean',
        required: false,
        description: `Whether the project is billable.`,
      },
      { name: 'name', type: 'string', required: false, description: `New project name.` },
      { name: 'notes', type: 'string', required: false, description: `New project notes.` },
    ],
  },
  {
    name: 'harvestmcp_update_task',
    description: `Update an existing task. id is required. Only provided fields are changed.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Task id to update.` },
      {
        name: 'billable_by_default',
        type: 'boolean',
        required: false,
        description: `Whether the task is billable by default.`,
      },
      {
        name: 'default_hourly_rate',
        type: 'number',
        required: false,
        description: `New default hourly rate.`,
      },
      {
        name: 'is_active',
        type: 'boolean',
        required: false,
        description: `Set to false to deactivate the task.`,
      },
      { name: 'name', type: 'string', required: false, description: `New task name.` },
    ],
  },
  {
    name: 'harvestmcp_update_time_entry',
    description: `Update an existing time entry. id is required. Only provided fields are changed.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Time entry id to update.` },
      { name: 'hours', type: 'number', required: false, description: `New duration in hours.` },
      { name: 'notes', type: 'string', required: false, description: `New notes.` },
      { name: 'project_id', type: 'integer', required: false, description: `New project id.` },
      {
        name: 'spent_date',
        type: 'string',
        required: false,
        description: `New date (YYYY-MM-DD).`,
      },
      { name: 'task_id', type: 'integer', required: false, description: `New task id.` },
    ],
  },
]
