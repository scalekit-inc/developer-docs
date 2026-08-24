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
    name: 'rizemcp_create_keyword',
    description: `Create a new keyword (auto-tagging rule). Keywords auto-tag time entries when the keyword text matches in window titles, URLs, or app names. Each keyword maps to a client, project, or task.`,
    params: [
      {
        name: 'keyword',
        type: 'string',
        required: true,
        description: `The keyword to match (e.g. 'acme', 'acme.com', 'jira.atlassian.net')`,
      },
      {
        name: 'tag_id',
        type: 'string',
        required: true,
        description: `The ID of the client, project, or task to tag to`,
      },
      {
        name: 'tag_type',
        type: 'string',
        required: true,
        description: `The entity type to tag to: client, project, or task`,
      },
      {
        name: 'field',
        type: 'string',
        required: false,
        description: `Which field to match against: any (default), app_name, url, window_title, or calendar_event`,
      },
      {
        name: 'match_type',
        type: 'string',
        required: false,
        description: `How to match: contains (default), starts_with, ends_with, or equals`,
      },
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
        name: 'due_date',
        type: 'string',
        required: false,
        description: `ISO 8601 due date for the task (e.g. 2026-08-12)`,
      },
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
        name: 'reminder_at',
        type: 'string',
        required: false,
        description: `ISO 8601 datetime for a one-time reminder (e.g. 2026-08-12T16:30:00-04:00). Use the user's timezone.`,
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
    name: 'rizemcp_delete_keyword',
    description: `Delete (archive) a keyword. The keyword will no longer be used for auto-tagging. Use list_keywords to find the keyword ID first.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The keyword ID to delete` },
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
        name: 'end_time',
        type: 'string',
        required: true,
        description: `End of date range (ISO 8601 datetime, e.g. 2025-06-01T00:00:00Z)`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: true,
        description: `Start of date range (ISO 8601 datetime, e.g. 2025-01-01T00:00:00Z)`,
      },
      {
        name: 'creator_emails',
        type: 'array',
        required: false,
        description: `Filter by creator emails (resolved to identity IDs)`,
      },
      {
        name: 'creator_ids',
        type: 'array',
        required: false,
        description: `Filter by specific identity IDs`,
      },
      {
        name: 'exclude_identity_ids',
        type: 'array',
        required: false,
        description: `Identity IDs to exclude from results (e.g. admin accounts)`,
      },
      {
        name: 'include_member_breakdown',
        type: 'boolean',
        required: false,
        description: `Include per-member stats breakdown`,
      },
      {
        name: 'include_weekly_trend',
        type: 'boolean',
        required: false,
        description: `Include week-over-week trend data`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID to filter by. Defaults to the user's default workspace.`,
      },
      {
        name: 'week_count',
        type: 'number',
        required: false,
        description: `Number of weeks for trend data (max 52)`,
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
    name: 'rizemcp_get_member_agent_settings',
    description: `Get another workspace member's agent settings: their personal guidance, tagging instructions, and activity summary instructions. Admins only (org admins, plus admins of an active team the member belongs to) — returns not-found otherwise. Find identity ids via list_workspace_members. For your OWN settings use get_tagging_settings.`,
    params: [
      {
        name: 'identity_id',
        type: 'string',
        required: true,
        description: `The member's identity id (from list_workspace_members)`,
      },
      {
        name: 'org_id',
        type: 'string',
        required: false,
        description: `The workspace the member belongs to. Defaults to the caller's active workspace.`,
      },
    ],
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
        name: 'end_time',
        type: 'string',
        required: false,
        description: `End of date range (ISO 8601 datetime). Defaults to now.`,
      },
      {
        name: 'event_types',
        type: 'array',
        required: false,
        description: `Filter by event types. Available: time_entry_accepted, time_entry_rejected, time_entry_deleted, time_entry_auto_approved, time_entry_regenerated, time_entry_split, time_entry_merged, time_entry_created_manually, title_changed, description_changed, tag_suggestion_accepted, tag_suggestion_rejected, tag_suggestion_auto_approved, manual_tag_change, batch_tag_applied, time_entry_created, tag_suggestion_created, tag_rule_created, tag_rule_removed`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of signals to return (max 50)`,
      },
      { name: 'offset', type: 'number', required: false, description: `Offset for pagination` },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Start of date range (ISO 8601 datetime). Defaults to 30 days ago.`,
      },
      {
        name: 'time_entry_id',
        type: 'string',
        required: false,
        description: `Filter signals for a specific time entry`,
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
    name: 'rizemcp_get_product_docs',
    description: `Get documentation about the Rize product itself: what Rize can do, which integrations are supported, and where to find help articles. Use this to answer questions about Rize features, integrations, platforms, or setup — never guess. Pass a \`query\` to search all documentation pages and get the matching ones back with their URLs — prefer this over the static topics when the question is about a specific feature. Use topic "support" whenever the docs don't cover the question, the user hit a bug, or they want to request a feature — it returns where to reach a human instead of guessing. Topics: overview, integrations, docs_index, support.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search the full documentation index by keyword. Takes precedence over topic.`,
      },
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `Documentation topic (default: overview)`,
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
    name: 'rizemcp_get_routine_run',
    description: `Get a single routine run by ID, including the parent routine metadata and all briefs the run produced with their markdown bodies.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Routine run ID` }],
  },
  {
    name: 'rizemcp_get_skill',
    description: `Get one reusable prompt skill by ID. Use this when the user references a skill chip or a rize://skill/:id link.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Skill ID from a rize://skill/:id reference or list_skills result`,
      },
    ],
  },
  {
    name: 'rizemcp_get_tagging_settings',
    description: `Get the current user's auto-tagging settings: generation mode, entry duration preferences, auto-approve threshold, which tag dimensions are automated, the custom instructions for tagging and activity summaries, and the agent guidance layered onto their runs (personal, plus their default team/workspace guidance). Read-only — use update_tagging_settings to change your own settings. Admins: manage other members via get/update_member_agent_settings, teams via update_team_agent_context, and the workspace via update_workspace_agent_context.`,
    params: [],
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
        name: 'billable_by_default',
        type: 'boolean',
        required: false,
        description: `Whether the member's time is billable by default (default: true)`,
      },
      {
        name: 'manager_id',
        type: 'string',
        required: false,
        description: `Team member ID of this member's manager (must be an admin or manager on the same team)`,
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
      {
        name: 'include_keywords',
        type: 'boolean',
        required: false,
        description: `Include keywords (auto-tagging rules) for each client. Off by default for performance.`,
      },
      { name: 'limit', type: 'number', required: false, description: `Max clients to return` },
      {
        name: 'queries',
        type: 'array',
        required: false,
        description: `Search clients by multiple names. Cannot be combined with query; cursor is ignored and next_cursor is null.`,
      },
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
    name: 'rizemcp_list_keywords',
    description: `List active keywords (auto-tagging rules) for the current user. Keywords map text patterns to clients, projects, or tasks — when a keyword appears in a window title, URL, or app name, the time entry is auto-tagged to the parent entity. Must specify tag_type to scope the query.`,
    params: [
      {
        name: 'tag_type',
        type: 'string',
        required: true,
        description: `Required: filter by entity type — client, project, or task`,
      },
      {
        name: 'tag_id',
        type: 'string',
        required: false,
        description: `Filter by specific client/project/task ID`,
      },
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
    name: 'rizemcp_list_my_calendar_events',
    description: `List calendar events (meetings, appointments) for a single day from the user's connected calendars. Returns title, start/end times, attendees, location, and video conference link per event. For raw tracked activity (app switches, website visits) use list_my_events instead.`,
    params: [
      { name: 'date', type: 'string', required: true, description: `Date in YYYY-MM-DD format` },
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
    name: 'rizemcp_list_my_keyword_matches',
    description: `List deterministic keyword-rule matches over the user's tracked time in a date range. Each match is a time window where a keyword rule fired, naming the client/project/task/label it points at. Use these as ground truth when tagging or creating time entries — a keyword match covering an entry's time range is strong evidence for that tag.`,
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
        description: `End date in YYYY-MM-DD format (defaults to date for single-day query)`,
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
      {
        name: 'include_activity',
        type: 'boolean',
        required: false,
        description: `Include expanded activity evidence per entry: top apps/websites, top window titles, and overlapping keyword-rule matches. Slower — only set when tagging or inspecting entries.`,
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
      {
        name: 'include_keywords',
        type: 'boolean',
        required: false,
        description: `Include keywords (auto-tagging rules) for each project. Off by default for performance.`,
      },
      { name: 'limit', type: 'number', required: false, description: `Max projects to return` },
      {
        name: 'queries',
        type: 'array',
        required: false,
        description: `Search projects by multiple names. Cannot be combined with query; cursor is ignored and next_cursor is null.`,
      },
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
      {
        name: 'report_id',
        type: 'string',
        required: false,
        description: `Filter runs to a specific report ID`,
      },
      { name: 'status', type: 'string', required: false, description: `Filter by run status` },
    ],
  },
  {
    name: 'rizemcp_list_routine_runs',
    description: `List routine runs for the current user. Returns runs ordered by most recent first, with nested routine metadata and the briefs each run produced. Filter by routine ID or status (pending, running, ready, failed).`,
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
        description: `Max runs to return (default: 25, max: 100)`,
      },
      {
        name: 'routine_id',
        type: 'string',
        required: false,
        description: `Filter runs to a specific routine ID`,
      },
      { name: 'status', type: 'string', required: false, description: `Filter by run status` },
    ],
  },
  {
    name: 'rizemcp_list_skills',
    description: `List the reusable prompt skills visible to the authenticated user.`,
    params: [],
  },
  {
    name: 'rizemcp_list_tasks',
    description: `List tasks with their project and assignee associations. Use task IDs when creating or updating time entries.`,
    params: [
      {
        name: 'assigned_to_me',
        type: 'boolean',
        required: false,
        description: `Only return tasks assigned to the current user`,
      },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor` },
      {
        name: 'include_keywords',
        type: 'boolean',
        required: false,
        description: `Include keywords (auto-tagging rules) for each task. Off by default for performance.`,
      },
      { name: 'limit', type: 'number', required: false, description: `Max tasks to return` },
      {
        name: 'project_ids',
        type: 'array',
        required: false,
        description: `Filter tasks by project IDs`,
      },
      {
        name: 'queries',
        type: 'array',
        required: false,
        description: `Search tasks by multiple names. Cannot be combined with query; cursor is ignored and next_cursor is null.`,
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
    name: 'rizemcp_list_teams',
    description: `List the teams the authenticated user can access — org admins see every team in their orgs. The user's default team is returned first. Use this to obtain a team_id for other tools (time entries, allocations, team members). Each team includes agent_context (the standing guidance applied to its members' agent runs) when the caller can edit it — team admins and org admins; null otherwise.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor` },
      { name: 'limit', type: 'number', required: false, description: `Max teams to return` },
    ],
  },
  {
    name: 'rizemcp_list_workspace_members',
    description: `List the workspace (organization) roster with per-team assignments. Visibility depends on your role: workspace admins see everyone, team admins and viewers see their teams, managers see their direct reports, plain members see an empty roster. Rates are only returned for workspace admins and finance grantees. Get workspace_id from get_current_user (org.id).`,
    params: [
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `Workspace (organization/billing) ID`,
      },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor` },
      { name: 'limit', type: 'number', required: false, description: `Max members to return` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search members by name or email`,
      },
    ],
  },
  {
    name: 'rizemcp_query_org_context',
    description: `Search an organization's uploaded context documents (contracts, invoices, PDFs, etc.) using semantic retrieval. Returns the most relevant text chunks with source file names and relevance scores. Use this when the user asks about org-specific documents or context they have uploaded.`,
    params: [
      {
        name: 'orgId',
        type: 'string',
        required: true,
        description: `ID of the organization/workspace to search`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language search query`,
      },
      {
        name: 'topK',
        type: 'integer',
        required: false,
        description: `Maximum number of chunks to return (default: 5)`,
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
    name: 'rizemcp_remove_team_member',
    description: `Remove a member from a team. The membership is archived, not deleted — historical time entries are kept and re-inviting the person restores it. Requires team admin or org admin permissions. Use list_team_members to find team_member_id values.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `Team ID` },
      {
        name: 'team_member_id',
        type: 'string',
        required: true,
        description: `Team member ID to remove`,
      },
    ],
  },
  {
    name: 'rizemcp_search_my_meetings',
    description: `Search the current user's calendar events and meeting transcripts over a date range. Use this for what was scheduled, who attended, what was discussed, or finding the recording behind a meeting.`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `Start date in YYYY-MM-DD format`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Words or phrase to find in calendar details or transcript content`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date in YYYY-MM-DD format; defaults to date`,
      },
      { name: 'limit', type: 'number', required: false, description: `Maximum transcript matches` },
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
      {
        name: 'keywords',
        type: 'array',
        required: false,
        description: `Keywords for auto-tagging. When the AI sees these strings in window titles, URLs, or app names, it matches the time entry to this client. Use specific terms like client names, domains, or project codes.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name` },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: `AI context prompt for tagging. Describes the client so the AI can better match time entries. Example: 'Acme Corp — SaaS company. Google Ads campaigns, Shopify store management, Klaviyo email flows.'`,
      },
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
    name: 'rizemcp_update_keyword',
    description: `Update an existing keyword's text, match type, or field. Use list_keywords to find the keyword ID first.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The keyword ID to update` },
      { name: 'field', type: 'string', required: false, description: `New field to match against` },
      { name: 'keyword', type: 'string', required: false, description: `New keyword text` },
      { name: 'match_type', type: 'string', required: false, description: `New match type` },
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
    name: 'rizemcp_update_member_agent_settings',
    description: `Update another workspace member's agent settings: their personal guidance, tagging instructions, and/or activity summary instructions. Admins only (org admins, plus admins of an active team the member belongs to). Omitted fields are left unchanged; pass an empty string to clear one. Read current values first with get_member_agent_settings. For your OWN settings use update_tagging_settings.`,
    params: [
      {
        name: 'identity_id',
        type: 'string',
        required: true,
        description: `The member's identity id (from list_workspace_members)`,
      },
      {
        name: 'agent_context',
        type: 'string',
        required: false,
        description: `The member's personal agent guidance. Empty string clears it.`,
      },
      {
        name: 'custom_instructions_for_activity_summary',
        type: 'string',
        required: false,
        description: `The member's activity summary instructions. Empty string clears it.`,
      },
      {
        name: 'custom_instructions_for_tagging',
        type: 'string',
        required: false,
        description: `The member's personal tagging instructions. Empty string clears it.`,
      },
      {
        name: 'org_id',
        type: 'string',
        required: false,
        description: `The workspace the member belongs to. Defaults to the caller's active workspace.`,
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
      {
        name: 'keywords',
        type: 'array',
        required: false,
        description: `Keywords for auto-tagging. When the AI sees these strings in window titles, URLs, or app names, it matches the time entry to this project. Use specific terms like repo names, Jira codes, or unique identifiers.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name` },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: `AI context prompt for tagging. Describes the project so the AI can better match time entries. Example: 'Website Redesign — Next.js migration. Work in Figma, VS Code with repo acme/website-v2, Vercel deploys.'`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status (e.g. in_progress, completed, archived)`,
      },
    ],
  },
  {
    name: 'rizemcp_update_tagging_settings',
    description: `Update your AI tagging settings: tracking mode, minimum entry duration, auto-approve threshold, and custom instructions for how the AI should tag your time entries and generate activity summaries. Which tag dimensions are automated is user-managed and not changeable here. Use get_tagging_settings to read current values first.`,
    params: [
      {
        name: 'agent_context',
        type: 'string',
        required: false,
        description: `Personal guidance injected into every agent run (chat, reports, routines, tagging). May embed skills as markdown links like [Name](rize://skill/ID); they are expanded at run time. Team/org guidance is admin-managed and read-only here.`,
      },
      {
        name: 'auto_approve_threshold',
        type: 'number',
        required: false,
        description: `Confidence threshold (0-100) for auto-approving AI tag suggestions. Default 95 (very strict). Recommend 70-85 for most users.`,
      },
      {
        name: 'custom_instructions_for_activity_summary',
        type: 'string',
        required: false,
        description: `Custom instructions for how the AI should generate activity summaries (time entry titles/descriptions). Example: 'Use task names from ClickUp. Keep titles under 60 chars. Include client name prefix.'`,
      },
      {
        name: 'custom_instructions_for_tagging',
        type: 'string',
        required: false,
        description: `Custom instructions for how the AI should tag your time entries to clients/projects/tasks. Describe your workflow, main clients, and how to identify which client from window titles. Example: 'I manage Google Ads for 3 clients. Match by ad account name in browser title.'`,
      },
      {
        name: 'minimum_time_entry_minutes',
        type: 'number',
        required: false,
        description: `Minimum duration in minutes for a time entry (default 8, recommend 2-5 for detailed tracking)`,
      },
      {
        name: 'tracking_generation_mode',
        type: 'string',
        required: false,
        description: `How time entries are matched to tags. 'tag_rules_and_clustering' (recommended) combines keyword matching with AI. 'clustering' uses AI only. 'tag_rules_only' uses keywords only.`,
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
      {
        name: 'keywords',
        type: 'array',
        required: false,
        description: `Keywords for auto-tagging. When the AI sees these strings in window titles, URLs, or app names, it matches the time entry to this task. Use specific terms like ticket IDs, branch names, or unique identifiers.`,
      },
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
    name: 'rizemcp_update_team_agent_context',
    description: `Set a team's standing agent guidance — injected into every team member's agent runs (chat, reports, routines, tagging). Team admins and org admins only. Read current values via list_teams. May embed skills as markdown links like [Name](rize://skill/ID); only team- or workspace-visible skills are accepted. Pass an empty string to clear.`,
    params: [
      {
        name: 'agent_context',
        type: 'string',
        required: true,
        description: `The new team guidance. Empty string clears it.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `The team to update (from list_teams)`,
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
      {
        name: 'manager_id',
        type: 'string',
        required: false,
        description: `Team member ID of this member's manager (must be an admin or manager on the same team). Pass null to clear`,
      },
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
  {
    name: 'rizemcp_update_workspace_agent_context',
    description: `Set the workspace's standing agent guidance — injected into every member's agent runs (chat, reports, routines, tagging). Workspace admins only. Read the current value via get_tagging_settings (org_agent_context). May embed skills as markdown links like [Name](rize://skill/ID); only workspace-visible skills are accepted. Pass an empty string to clear.`,
    params: [
      {
        name: 'agent_context',
        type: 'string',
        required: true,
        description: `The new workspace guidance. Empty string clears it.`,
      },
      {
        name: 'org_id',
        type: 'string',
        required: false,
        description: `The workspace to update. Defaults to the caller's active workspace (see get_current_user).`,
      },
    ],
  },
]
