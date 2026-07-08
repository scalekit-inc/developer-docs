import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'rizemcp_add_note',
    description: `Add a note about what you're working on. Notes give Rize context to improve time tracking accuracy.

This is the primary way to tell Rize what you worked on. Every call creates a timeline note. If you also provide \`blocks\` with durations, time entries are created too.

**Context only (no entries created):**
- "Working on the NVIDIA project today"
- "Just finished the pitch deck for Acme"
- "Switching to internal tooling"

**Context + time entries (blocks with durations):**
- "2hrs on NVIDIA pitch deck" → blocks: [{project: "NVIDIA", description: "Pitch deck work", durationMin: 120}]
- "30min call with Acme about onboarding" → blocks: [{client: "Acme", description: "Onboarding call", durationMin: 30}]

When blocks are provided: defaults to preview mode — shows matched entries for confirmation. Call again with save=true to commit.

The tool fetches the user's clients, projects, tasks, existing time entries, app activity, and existing notes for the target date. It detects overlaps between blocks and existing entries.`,
    params: [
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `What did you work on? Natural language.`,
      },
      {
        name: 'billable',
        type: 'boolean',
        required: false,
        description: `Override billable status for created entries.`,
      },
      {
        name: 'blocks',
        type: 'array',
        required: false,
        description: `Pre-parsed time blocks. When provided with durations > 0, time entries will be created in addition to the note. Tag each block with any combination of client, project, and/or task.`,
      },
      {
        name: 'date',
        type: 'string',
        required: false,
        description: `Reference date YYYY-MM-DD. Defaults to today.`,
      },
      {
        name: 'save',
        type: 'boolean',
        required: false,
        description: `Set true to save time entries after previewing. Only relevant when blocks are provided.`,
      },
    ],
  },
  {
    name: 'rizemcp_approve_tag_suggestion',
    description: `Approve an AI-generated tag suggestion (client, project, or task) on a time entry. This assigns the suggested entity to the time entry. Use list_my_time_entries to see tag suggestions with confidence scores on pending entries.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The tag suggestion ID to approve`,
      },
    ],
  },
  {
    name: 'rizemcp_approve_time_entries',
    description: `Approve pending AI-generated time entry suggestions, making them active entries. Optionally assign client/project/task during approval in a single operation.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `Array of time entry IDs to approve`,
      },
      {
        name: 'client_id',
        type: 'string',
        required: false,
        description: `Assign this client to all approved entries`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Assign this project to all approved entries`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: false,
        description: `Assign this task to all approved entries`,
      },
    ],
  },
  {
    name: 'rizemcp_create_client',
    description: `Create a new client (customer/account). Clients are top-level entities that projects and time entries can be assigned to.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Client name` },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Color hex code (e.g. #FF5733)`,
      },
      {
        name: 'hourly_rate',
        type: 'number',
        required: false,
        description: `Default hourly rate for billing`,
      },
      {
        name: 'team_name',
        type: 'string',
        required: false,
        description: `Team name to associate with (defaults to user's default team)`,
      },
    ],
  },
  {
    name: 'rizemcp_create_contract',
    description: `Create a new contract for profitability tracking. Contracts define billing arrangements (hourly, retainer, fixed fee) with clients. Automatically creates the first contract period. Use get_current_user to get org_id. Pass client_name or org_client_id to link a client.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Contract name` },
      { name: 'org_id', type: 'string', required: true, description: `Organization (billing) ID` },
      { name: 'billing_model', type: 'string', required: false, description: `Billing model` },
      { name: 'billing_period', type: 'string', required: false, description: `Billing period` },
      {
        name: 'client_name',
        type: 'string',
        required: false,
        description: `Client name to look up (alternative to org_client_id)`,
      },
      { name: 'contract_type', type: 'string', required: false, description: `Contract type` },
      { name: 'currency', type: 'string', required: false, description: `Currency code` },
      { name: 'hourly_rate', type: 'number', required: false, description: `Hourly rate` },
      {
        name: 'hours_included',
        type: 'number',
        required: false,
        description: `Hours included in retainer`,
      },
      { name: 'notes', type: 'string', required: false, description: `Contract notes` },
      {
        name: 'org_client_id',
        type: 'string',
        required: false,
        description: `Organization client ID to link`,
      },
      {
        name: 'overage_hourly_rate',
        type: 'number',
        required: false,
        description: `Overage hourly rate`,
      },
      {
        name: 'period_end_date',
        type: 'string',
        required: false,
        description: `First period end date (ISO 8601, defaults to end of current month)`,
      },
      {
        name: 'period_start_date',
        type: 'string',
        required: false,
        description: `First period start date (ISO 8601, defaults to start of current month)`,
      },
      {
        name: 'retainer_amount_cents',
        type: 'number',
        required: false,
        description: `Retainer amount in cents`,
      },
    ],
  },
  {
    name: 'rizemcp_create_expense',
    description: `Add an expense to a contract period. Expenses can be pass-through, delivery, or overhead. Categories: ad_spend, vendor, freelancer, software, other. Get the contract_period_id from get_contract. Metrics recompute automatically after adding.`,
    params: [
      { name: 'amount_cents', type: 'number', required: true, description: `Amount in cents` },
      { name: 'category', type: 'string', required: true, description: `Expense category` },
      {
        name: 'contract_period_id',
        type: 'string',
        required: true,
        description: `Contract period ID to add the expense to`,
      },
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `Expense date (ISO 8601, must fall within the contract period)`,
      },
      {
        name: 'expense_type',
        type: 'string',
        required: true,
        description: `Type: pass_through (billed to client), delivery (cost of delivery), overhead`,
      },
      { name: 'org_id', type: 'string', required: true, description: `Organization (billing) ID` },
      { name: 'currency', type: 'string', required: false, description: `Currency code` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the expense`,
      },
      { name: 'vendor_name', type: 'string', required: false, description: `Vendor name` },
    ],
  },
  {
    name: 'rizemcp_create_label',
    description: `Create a new label for categorizing time entries. Requires team admin role. Labels have a name, description, and AI prompt used for automatic classification.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Human-readable description of what this label represents`,
      },
      { name: 'name', type: 'string', required: true, description: `Label name` },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `AI prompt used for automatic time entry classification`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Color hex code (e.g. #FF5733)`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID to associate with`,
      },
      {
        name: 'team_name',
        type: 'string',
        required: false,
        description: `Team name to associate with (defaults to user's default team)`,
      },
    ],
  },
  {
    name: 'rizemcp_create_project',
    description: `Create a new project, optionally under a client. Projects organize time entries and can be assigned to time entries directly.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Project name` },
      {
        name: 'client_id',
        type: 'string',
        required: false,
        description: `Client ID to associate with`,
      },
      {
        name: 'client_name',
        type: 'string',
        required: false,
        description: `Client name to associate with (creates client if it doesn't exist)`,
      },
      { name: 'color', type: 'string', required: false, description: `Color hex code` },
      {
        name: 'team_name',
        type: 'string',
        required: false,
        description: `Team name to associate with (defaults to user's default team)`,
      },
    ],
  },
  {
    name: 'rizemcp_create_revenue_entry',
    description: `Add a revenue entry to a contract period. Categories: setup_fee, consulting, upsell, adjustment, other. Get the contract_period_id from get_contract.`,
    params: [
      { name: 'amount_cents', type: 'number', required: true, description: `Amount in cents` },
      { name: 'category', type: 'string', required: true, description: `Revenue category` },
      {
        name: 'contract_period_id',
        type: 'string',
        required: true,
        description: `Contract period ID to add revenue to`,
      },
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `Revenue date (ISO 8601, must fall within the contract period)`,
      },
      { name: 'org_id', type: 'string', required: true, description: `Organization (billing) ID` },
      { name: 'currency', type: 'string', required: false, description: `Currency code` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the revenue entry`,
      },
    ],
  },
  {
    name: 'rizemcp_create_task',
    description: `Create a new task, optionally under a project. Tasks are the most granular unit of work and can be assigned to team members.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Task name` },
      {
        name: 'assignee_email',
        type: 'string',
        required: false,
        description: `Email of team member to assign (defaults to authenticated user)`,
      },
      { name: 'color', type: 'string', required: false, description: `Color hex code` },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Project ID to associate with`,
      },
      {
        name: 'project_name',
        type: 'string',
        required: false,
        description: `Project name to associate with (creates project if it doesn't exist)`,
      },
      {
        name: 'team_name',
        type: 'string',
        required: false,
        description: `Team name to associate with (defaults to user's default team)`,
      },
    ],
  },
  {
    name: 'rizemcp_create_time_entry',
    description: `Create a new time entry with optional client, project, and task assignment. Supports idempotency keys to prevent duplicate entries on retry. Times must be in ISO 8601 format — convert user-local times to their timezone (provided as _user_timezone in responses) before sending.`,
    params: [
      {
        name: 'end_time',
        type: 'string',
        required: true,
        description: `End time in ISO 8601 format`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: true,
        description: `Start time in ISO 8601 format (e.g. 2024-01-15T09:00:00Z)`,
      },
      {
        name: 'billable',
        type: 'boolean',
        required: false,
        description: `Whether this entry is billable`,
      },
      { name: 'client_id', type: 'string', required: false, description: `Client ID to assign` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of work performed`,
      },
      {
        name: 'idempotency_key',
        type: 'string',
        required: false,
        description: `Unique key to prevent duplicate entries on retry. Recommended for all creates.`,
      },
      { name: 'project_id', type: 'string', required: false, description: `Project ID to assign` },
      { name: 'task_id', type: 'string', required: false, description: `Task ID to assign` },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID (defaults to user's default workspace)`,
      },
      { name: 'title', type: 'string', required: false, description: `Title for the time entry` },
    ],
  },
  {
    name: 'rizemcp_delete_label',
    description: `Delete a label by ID. Requires team admin role. The label is soft-deleted and will no longer appear in label lists.`,
    params: [{ name: 'id', type: 'string', required: true, description: `The label ID to delete` }],
  },
  {
    name: 'rizemcp_delete_time_entry',
    description: `Delete a time entry by ID. Works on entries of any status (active, pending, failed, etc.).`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The time entry ID to delete` },
    ],
  },
  {
    name: 'rizemcp_dictate',
    description: `DEPRECATED: Use add_note instead. This tool now delegates to add_note.

Start or log a time entry from natural language. Tags to client, project, and task when available.
Also saves a timeline note so Rize can use the context to improve future AI suggestions.

IMPORTANT: Always provide the \`blocks\` parameter. Parse the user's text yourself before calling this tool.`,
    params: [
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `Natural language time description`,
      },
      {
        name: 'billable',
        type: 'boolean',
        required: false,
        description: `Override billable status.`,
      },
      {
        name: 'blocks',
        type: 'array',
        required: false,
        description: `Pre-parsed blocks. Tag each block with any combination of client, project, and/or task.`,
      },
      {
        name: 'date',
        type: 'string',
        required: false,
        description: `Reference date YYYY-MM-DD. Defaults to today.`,
      },
      {
        name: 'save',
        type: 'boolean',
        required: false,
        description: `Set true to save after previewing. Defaults to false (preview).`,
      },
    ],
  },
  {
    name: 'rizemcp_generate_time_entries',
    description: `Generate AI time entries for a time range. Analyzes the user's actual activity — apps, websites, meetings — and uses clustering to create multiple entries based on natural activity groups. By default, skips time slots where previous entries were rejected. Rate limited: 15 per minute.`,
    params: [
      {
        name: 'end_time',
        type: 'string',
        required: true,
        description: `End time in ISO 8601 format (e.g. 2024-01-15T23:59:59-04:00)`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: true,
        description: `Start time in ISO 8601 format (e.g. 2024-01-15T00:00:00-04:00)`,
      },
      {
        name: 'retry_rejected',
        type: 'boolean',
        required: false,
        description: `If true, also generates entries in time slots where previous entries were rejected`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID (defaults to user's default workspace)`,
      },
    ],
  },
  {
    name: 'rizemcp_get_ai_effectiveness_stats',
    description: `Get AI effectiveness metrics for time entry creation and tagging. Shows acceptance rates and improvement trends.`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `Start date in YYYY-MM-DD format`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End date in YYYY-MM-DD format`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Filter by team ID (defaults to user's default workspace)`,
      },
    ],
  },
  {
    name: 'rizemcp_get_contract',
    description: `Get a single contract with all its periods and profitability details.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Contract ID` },
      { name: 'org_id', type: 'string', required: true, description: `Organization (billing) ID` },
    ],
  },
  {
    name: 'rizemcp_get_contract_profitability',
    description: `Get profitability metrics for a specific contract in a date range. Returns revenue, costs, margin, hours, budget burn, and period dates. Use list_contracts to find contract IDs. All monetary values are in cents.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End date (ISO 8601, e.g. 2025-01-31)`,
      },
      { name: 'id', type: 'string', required: true, description: `Contract ID` },
      { name: 'org_id', type: 'string', required: true, description: `Organization (billing) ID` },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start date (ISO 8601, e.g. 2025-01-01)`,
      },
    ],
  },
  {
    name: 'rizemcp_get_current_user',
    description: `Get the authenticated user's profile including name, email, timezone, and organization info (id, name, logo, role). Call this first to get your org_id for profitability and contract tools.`,
    params: [],
  },
  {
    name: 'rizemcp_get_help',
    description: `Get documentation on how to use Rize MCP tools. Pass a topic to get specific help, or omit for an overview. Topics: time_tracking, profitability, team_management, clients_projects.`,
    params: [
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `Help topic (default: overview)`,
      },
    ],
  },
  {
    name: 'rizemcp_get_login_url',
    description: `Returns the Rize login URL so the user can authenticate in their browser.`,
    params: [],
  },
  {
    name: 'rizemcp_get_my_time_allocation',
    description: `Get the current user's own time allocation summary grouped by client, project, or task. For team-wide allocation (admin only), use get_team_time_allocation instead. Returns total hours, billable hours, and breakdown by grouping.`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `Start date in YYYY-MM-DD format`,
      },
      { name: 'client_ids', type: 'array', required: false, description: `Filter by client IDs` },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format (defaults to date)`,
      },
      {
        name: 'group_by',
        type: 'string',
        required: false,
        description: `How to group results (default: client)`,
      },
      { name: 'label_ids', type: 'array', required: false, description: `Filter by label IDs` },
      { name: 'project_ids', type: 'array', required: false, description: `Filter by project IDs` },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `Array of time entry statuses to include, for example ["active"]. Do not pass a single string.`,
      },
      { name: 'task_ids', type: 'array', required: false, description: `Filter by task IDs` },
      { name: 'team_id', type: 'string', required: false, description: `Filter by team ID` },
    ],
  },
  {
    name: 'rizemcp_get_my_time_tracking_signals',
    description: `Get your recent time tracking signals — the individual AI actions and user feedback events that drive time entry generation.`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `Start date in YYYY-MM-DD format`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format (defaults to date for single-day query)`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Max signals to return (default: 100, max: 500)`,
      },
    ],
  },
  {
    name: 'rizemcp_get_org_profitability',
    description: `Get aggregated profitability metrics across all non-archived contracts for an organization in a date range. Returns revenue, costs, margin, and hours. For per-contract detail use get_contract_profitability. All monetary values are in cents.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End date (ISO 8601, e.g. 2025-01-31)`,
      },
      { name: 'org_id', type: 'string', required: true, description: `Organization (billing) ID` },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start date (ISO 8601, e.g. 2025-01-01)`,
      },
    ],
  },
  {
    name: 'rizemcp_get_profitability_trend',
    description: `Get monthly revenue, cost, and expense totals for a date range. Returns one data point per month across all non-archived contracts. Useful for spotting trends and comparing periods. All monetary values are in cents.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End date (ISO 8601, e.g. 2025-06-30)`,
      },
      { name: 'org_id', type: 'string', required: true, description: `Organization (billing) ID` },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start date (ISO 8601, e.g. 2025-01-01)`,
      },
    ],
  },
  {
    name: 'rizemcp_get_report_run',
    description: `Get a single report run by ID, including the parent report metadata and all AI analysis content.`,
    params: [{ name: 'id', type: 'string', required: true, description: `The report run ID` }],
  },
  {
    name: 'rizemcp_get_team_time_allocation',
    description: `Get time allocation summary across all team members (team admin only). Returns total hours, billable hours, and breakdown by grouping. Use creator_emails to filter to specific people. Non-admins will only see their own allocation.`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `Start date in YYYY-MM-DD format`,
      },
      { name: 'client_ids', type: 'array', required: false, description: `Filter by client IDs` },
      {
        name: 'creator_emails',
        type: 'array',
        required: false,
        description: `Filter to specific team members by email (e.g. ['macgill@rize.io'])`,
      },
      {
        name: 'creator_ids',
        type: 'array',
        required: false,
        description: `Filter to specific team members by identity ID (alternative to creator_emails)`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format (defaults to date)`,
      },
      {
        name: 'group_by',
        type: 'string',
        required: false,
        description: `How to group results (default: client)`,
      },
      { name: 'label_ids', type: 'array', required: false, description: `Filter by label IDs` },
      { name: 'project_ids', type: 'array', required: false, description: `Filter by project IDs` },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `Array of time entry statuses to include, for example ["active"]. Do not pass a single string.`,
      },
      { name: 'task_ids', type: 'array', required: false, description: `Filter by task IDs` },
      { name: 'team_id', type: 'string', required: false, description: `Filter by team ID` },
    ],
  },
  {
    name: 'rizemcp_get_time_entry',
    description: `Get a single time entry by ID with all details including client, project, task, billing info, and AI confidence data.`,
    params: [{ name: 'id', type: 'string', required: true, description: `The time entry ID` }],
  },
  {
    name: 'rizemcp_invite_team_member',
    description: `Invite a new member to a team by email. Sends an invitation email. Requires team admin permissions. Naturally idempotent — re-inviting an existing member returns the existing record.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address of the person to invite`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `Team ID to invite the member to`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name of the person being invited`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Role to assign (default: member)`,
      },
    ],
  },
  {
    name: 'rizemcp_list_clients',
    description: `List clients (customers/accounts) with their hourly rates and team associations. Use client IDs when creating or updating time entries.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor` },
      { name: 'limit', type: 'number', required: false, description: `Max clients to return` },
      { name: 'query', type: 'string', required: false, description: `Search clients by name` },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `Array of client statuses to include, for example ["active"]. Do not pass a single string.`,
      },
    ],
  },
  {
    name: 'rizemcp_list_contracts',
    description: `List contracts for an organization. Contracts track billing arrangements with clients including hourly rates, retainers, and profitability metrics. Archived contracts are excluded by default — pass status to filter. Use contract IDs with get_contract_profitability.`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization (billing) ID` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor` },
      { name: 'limit', type: 'number', required: false, description: `Max contracts to return` },
      { name: 'query', type: 'string', required: false, description: `Search contracts by name` },
      { name: 'status', type: 'string', required: false, description: `Filter by contract status` },
    ],
  },
  {
    name: 'rizemcp_list_labels',
    description: `List labels available for tagging time entries. Use label IDs when updating time entries.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor` },
      { name: 'limit', type: 'number', required: false, description: `Max labels to return` },
      { name: 'query', type: 'string', required: false, description: `Search labels by name` },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `Array of label statuses to include, for example ["active"]. Do not pass a single string.`,
      },
    ],
  },
  {
    name: 'rizemcp_list_my_apps_used',
    description: `List the authenticated user's own apps and websites used in a date range, sorted by time spent. Returns app name, URL, time spent, and category.`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `Start date in YYYY-MM-DD format`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format (defaults to date)`,
      },
    ],
  },
  {
    name: 'rizemcp_list_my_events',
    description: `List raw tracking events (app switches, website visits) for the authenticated user in a date range. Max 7-day range. Returns app name, URL, URL host, title, source, and timestamps. Use list_my_apps_used for aggregated summaries instead.`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `Start date in YYYY-MM-DD format`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format (defaults to date for single-day query)`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Max events per page (default: 200, max: 200)`,
      },
    ],
  },
  {
    name: 'rizemcp_list_my_time_entries',
    description: `List the current user's own time entries for a date range. For team-wide entries (admin only), use list_team_time_entries instead. Returns all statuses by default (active, pending, generating, failed). Sorted by start time with client/project/task details and formatted durations.`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `Start date in YYYY-MM-DD format`,
      },
      { name: 'client_ids', type: 'array', required: false, description: `Filter by client IDs` },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format (defaults to date for single-day query)`,
      },
      { name: 'label_ids', type: 'array', required: false, description: `Filter by label IDs` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Max entries to return (default: 100, max: 500)`,
      },
      { name: 'project_ids', type: 'array', required: false, description: `Filter by project IDs` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search time entries by title or description`,
      },
      {
        name: 'sources',
        type: 'array',
        required: false,
        description: `Filter by entry source, for example ["ai", "click_up", "user", "timer", "meeting"]. Useful for finding duplicates or verifying sync.`,
      },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `Array of time entry statuses to include, for example ["active", "pending"]. Do not pass a single string.`,
      },
      { name: 'task_ids', type: 'array', required: false, description: `Filter by task IDs` },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Filter by team ID (defaults to user's default workspace)`,
      },
    ],
  },
  {
    name: 'rizemcp_list_projects',
    description: `List projects with their client associations and team info. Use project IDs when creating or updating time entries.`,
    params: [
      { name: 'client_id', type: 'string', required: false, description: `Filter by client ID` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor` },
      { name: 'limit', type: 'number', required: false, description: `Max projects to return` },
      { name: 'query', type: 'string', required: false, description: `Search projects by name` },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `Array of project statuses to include, for example ["in_progress", "completed"]. Do not pass a single string.`,
      },
    ],
  },
  {
    name: 'rizemcp_list_report_runs',
    description: `List report runs for the current user's reports. Returns runs ordered by most recent first.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Max report runs to return (default: 20, max: 100)`,
      },
    ],
  },
  {
    name: 'rizemcp_list_tasks',
    description: `List tasks with their project and assignee associations. Use task IDs when creating or updating time entries.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor` },
      { name: 'limit', type: 'number', required: false, description: `Max tasks to return` },
      {
        name: 'project_ids',
        type: 'array',
        required: false,
        description: `Filter tasks by project IDs`,
      },
      { name: 'query', type: 'string', required: false, description: `Search tasks by name` },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `Array of task statuses to include, for example ["in_progress", "completed"]. Do not pass a single string.`,
      },
    ],
  },
  {
    name: 'rizemcp_list_team_members',
    description: `List team members with their roles, hourly rates, and cost rates. Requires team admin permissions to see rates. Cost rates affect profitability calculations (delivery_labor_cost_cents).`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `Team ID to list members for`,
      },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor` },
      { name: 'limit', type: 'number', required: false, description: `Max members to return` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search members by name or email`,
      },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `Array of team member statuses to include, for example ["active"]. Do not pass a single string.`,
      },
    ],
  },
  {
    name: 'rizemcp_list_team_time_entries',
    description: `List time entries across all team members (team admin only). Returns entries for the entire team by default. Use creator_emails to filter to specific people. Non-admins will only see their own entries. Sorted by start time.`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `Start date in YYYY-MM-DD format`,
      },
      { name: 'client_ids', type: 'array', required: false, description: `Filter by client IDs` },
      {
        name: 'creator_emails',
        type: 'array',
        required: false,
        description: `Filter to specific team members by email (e.g. ['macgill@rize.io'])`,
      },
      {
        name: 'creator_ids',
        type: 'array',
        required: false,
        description: `Filter to specific team members by identity ID (alternative to creator_emails)`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format (defaults to date for single-day query)`,
      },
      { name: 'label_ids', type: 'array', required: false, description: `Filter by label IDs` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Max entries to return (default: 100, max: 500)`,
      },
      { name: 'project_ids', type: 'array', required: false, description: `Filter by project IDs` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search time entries by title or description`,
      },
      {
        name: 'sources',
        type: 'array',
        required: false,
        description: `Filter by entry source, for example ["ai", "click_up", "user", "timer", "meeting"]. Useful for finding duplicates or verifying sync.`,
      },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `Array of time entry statuses to include, for example ["active", "pending"]. Do not pass a single string.`,
      },
      { name: 'task_ids', type: 'array', required: false, description: `Filter by task IDs` },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Filter by team ID (defaults to user's default workspace)`,
      },
    ],
  },
  {
    name: 'rizemcp_regenerate_time_entry',
    description: `Regenerate AI content for a pending or failed time entry. Useful when generation failed or you want a better title/description. Optionally provide custom instructions to guide the AI. Rate limited: max 3 regenerations per entry, 15 per minute.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The time entry ID to regenerate`,
      },
      {
        name: 'instructions',
        type: 'string',
        required: false,
        description: `Custom instructions to guide the AI regeneration (e.g. 'focus on the meeting with Client X')`,
      },
    ],
  },
  {
    name: 'rizemcp_reject_time_entries',
    description: `Reject pending AI-generated time entry suggestions. Rejected entries are kept but hidden from active views.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `Array of time entry IDs to reject`,
      },
    ],
  },
  {
    name: 'rizemcp_sign_up',
    description: `Create a new Rize account via magic link. Sends a sign-in link to the user's email. After clicking the link, the user should download the Rize desktop app to start tracking time automatically.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `User's email address` },
      { name: 'name', type: 'string', required: false, description: `User's full name` },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `IANA timezone (e.g. America/New_York). Defaults to UTC.`,
      },
    ],
  },
  {
    name: 'rizemcp_update_client',
    description: `Update an existing client's name, hourly rate, color, or status.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The client ID to update` },
      { name: 'color', type: 'string', required: false, description: `New color hex code` },
      { name: 'hourly_rate', type: 'number', required: false, description: `New hourly rate` },
      { name: 'name', type: 'string', required: false, description: `New name` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status (e.g. active, archived)`,
      },
    ],
  },
  {
    name: 'rizemcp_update_contract',
    description: `Update a contract's billing details. Changes to rate fields are synced to the current period.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Contract ID to update` },
      { name: 'org_id', type: 'string', required: true, description: `Organization (billing) ID` },
      { name: 'billing_model', type: 'string', required: false, description: `Billing model` },
      { name: 'billing_period', type: 'string', required: false, description: `Billing period` },
      { name: 'contract_type', type: 'string', required: false, description: `Contract type` },
      { name: 'currency', type: 'string', required: false, description: `Currency code` },
      { name: 'hourly_rate', type: 'number', required: false, description: `Hourly rate` },
      {
        name: 'hours_included',
        type: 'number',
        required: false,
        description: `Hours included in retainer`,
      },
      { name: 'name', type: 'string', required: false, description: `Contract name` },
      { name: 'notes', type: 'string', required: false, description: `Contract notes` },
      {
        name: 'org_client_id',
        type: 'string',
        required: false,
        description: `Organization client ID to link`,
      },
      {
        name: 'overage_hourly_rate',
        type: 'number',
        required: false,
        description: `Overage hourly rate`,
      },
      {
        name: 'retainer_amount_cents',
        type: 'number',
        required: false,
        description: `Retainer amount in cents`,
      },
      { name: 'status', type: 'string', required: false, description: `Contract status` },
    ],
  },
  {
    name: 'rizemcp_update_label',
    description: `Update an existing label's name, description, prompt, color, or status. Requires team admin role.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The label ID to update` },
      { name: 'color', type: 'string', required: false, description: `New color hex code` },
      { name: 'description', type: 'string', required: false, description: `New description` },
      { name: 'name', type: 'string', required: false, description: `New name` },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: `New AI classification prompt`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status (active or archived)`,
      },
    ],
  },
  {
    name: 'rizemcp_update_project',
    description: `Update an existing project's name, client, color, or status.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The project ID to update` },
      {
        name: 'client_id',
        type: 'string',
        required: false,
        description: `Client ID to associate with`,
      },
      {
        name: 'client_name',
        type: 'string',
        required: false,
        description: `Client name to associate with (creates if doesn't exist)`,
      },
      { name: 'color', type: 'string', required: false, description: `New color hex code` },
      { name: 'name', type: 'string', required: false, description: `New name` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status (e.g. in_progress, completed, archived)`,
      },
    ],
  },
  {
    name: 'rizemcp_update_task',
    description: `Update an existing task's name, project, assignee, color, or status.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The task ID to update` },
      {
        name: 'assignee_email',
        type: 'string',
        required: false,
        description: `Email of team member to assign`,
      },
      { name: 'color', type: 'string', required: false, description: `New color hex code` },
      { name: 'name', type: 'string', required: false, description: `New name` },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Project ID to associate with`,
      },
      {
        name: 'project_name',
        type: 'string',
        required: false,
        description: `Project name to associate with (creates if doesn't exist)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status (e.g. in_progress, completed)`,
      },
    ],
  },
  {
    name: 'rizemcp_update_team_member',
    description: `Update a team member's role, title, hourly rate, cost rate, or billable default. Requires team admin permissions. Use list_team_members to find team_member_id values.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `Team ID` },
      {
        name: 'team_member_id',
        type: 'string',
        required: true,
        description: `Team member ID to update`,
      },
      {
        name: 'billable_by_default',
        type: 'boolean',
        required: false,
        description: `Whether time is billable by default`,
      },
      {
        name: 'cost_rate',
        type: 'number',
        required: false,
        description: `Internal cost rate per hour`,
      },
      { name: 'hourly_rate', type: 'number', required: false, description: `Hourly billing rate` },
      { name: 'role', type: 'string', required: false, description: `Role to assign` },
      { name: 'title', type: 'string', required: false, description: `Job title` },
    ],
  },
  {
    name: 'rizemcp_update_time_entry',
    description: `Update an existing time entry. Supports changing times, title, description, billing, label, and entity reassignment (client, project, task). Changing team_id clears entity assignments.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The time entry ID to update` },
      { name: 'billable', type: 'boolean', required: false, description: `Set billable status` },
      {
        name: 'client_id',
        type: 'string',
        required: false,
        description: `Reassign to this client`,
      },
      { name: 'description', type: 'string', required: false, description: `New description` },
      {
        name: 'end_time',
        type: 'string',
        required: false,
        description: `New end time in ISO 8601 format`,
      },
      {
        name: 'label_id',
        type: 'string',
        required: false,
        description: `Assign this label to the time entry`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Reassign to this project`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `New start time in ISO 8601 format`,
      },
      { name: 'task_id', type: 'string', required: false, description: `Reassign to this task` },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Move to this team (clears entity assignments)`,
      },
      { name: 'title', type: 'string', required: false, description: `New title` },
    ],
  },
]
