import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'prohostaimcp_add_cleaning_checklist_item',
    description: `Add a new item to a cleaning checklist.`,
    params: [
      {
        name: 'checklist_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist to add an item to.`,
      },
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning job the checklist belongs to.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the new checklist item.`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `The sort order for this item within the checklist.`,
      },
      {
        name: 'photo_required',
        type: 'boolean',
        required: false,
        description: `Whether the cleaner must submit a photo to mark this item complete.`,
      },
      {
        name: 'reference_photo_url',
        type: 'string',
        required: false,
        description: `A reference photo URL showing what this item should look like when done correctly.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_add_cleaning_comment',
    description: `Add a comment on a cleaning.`,
    params: [
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning job to comment on.`,
      },
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The text content of the comment.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_add_place_tag',
    description: `Attach a listing tag to a place (idempotent).`,
    params: [
      {
        name: 'listing_tag_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing tag to attach to the place.`,
      },
      {
        name: 'place_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the place to tag.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_add_pricing_override',
    description: `Upsert a single date-specific price override on PriceLabs. \`\`date\`\` is an ISO date; \`\`price\`\` and \`\`min_stay\`\` are optional (at least one should be supplied). \`\`reason\`\` is short free-form context — the reason recorded in PriceLabs is built deterministically as '<price> — requested by host via ProhostAI (<reason>)' so the PL UI always shows the applied price and attribution. Returns a structured \`\`pricelabs_not_authoritative\`\` error (mirroring the REST 409) when PriceLabs is not the authoritative price writer for this listing — map the listing to PriceLabs first (it becomes authoritative once linked).`,
    params: [
      {
        name: 'date',
        type: 'string',
        required: true,
        description: `The ISO date (YYYY-MM-DD) to set a price override for.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to add a price override for.`,
      },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `The currency code for the override price.`,
      },
      {
        name: 'min_stay',
        type: 'string',
        required: false,
        description: `The minimum stay (in nights) required for this date. Optional if price is supplied.`,
      },
      {
        name: 'price',
        type: 'string',
        required: false,
        description: `The nightly price to set for this date. Optional if min_stay is supplied.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Short free-form context for the override, recorded in PriceLabs for attribution.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_approve_approval_request',
    description: `Approve a pending approval request that an external agent filed, on behalf of the account owner/admin you are authenticated as. Only requests with \`source: external\` can be decided here — the agent then performs its own action and the decision reaches it on the \`agent.approval_resolved\` webhook. Requests filed by in-app AI employees or by autopilot (a drafted guest reply) are refused with \`not_externally_decidable\`: approving one sends a message or spends money in-app, so it must be decided in the ProhostAI app where the card is rendered. Requires the \`approvals:decide\` scope, which an AI-employee credential can never hold — an agent may not approve its own asks. Read the request with \`get_approval_request\` first; approving is not reversible.`,
    params: [
      {
        name: 'approval_id',
        type: 'string',
        required: true,
        description: `The id of the approval request to approve.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_ask_ai_question',
    description: `Ask ProhostAI's Ask AI assistant a question about this account (properties, reservations, guests, operations) and get its answer. Pass \`session_id\` from a previous call to continue the same conversation with context; omit it to start a new chat session. Turns are credit-metered against the account's AI subscription/credits and can take a while on tool-heavy questions. Requires the \`ai_chat:write\` scope.`,
    params: [
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `The question to ask the Ask AI assistant.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `Session id from a previous call to continue that conversation. Omit to start a new chat session.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_assign_cleaning',
    description: `Assign or unassign the primary cleaner on a cleaning. Pass \`\`cleaner_id=null\`\` (omit the argument) to unassign.`,
    params: [
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning to assign a cleaner to.`,
      },
      {
        name: 'cleaner_id',
        type: 'string',
        required: false,
        description: `The unique identifier of the cleaner to assign as primary. Omit or pass null to unassign.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_assign_conversation',
    description: `Set who owns one or more conversations. Full-array replace: the ids you pass BECOME the assignee list, so pass the complete set (an empty list unassigns everyone). Assignees must be members of the conversation's own account — AI employees included, since assigning a thread to an AI employee is how you hand it work. Re-sending the same array is a no-op that notifies nobody. Account-wide: listing-scoped API keys are rejected. A conversation that does not exist on the account, or whose account has not enabled assignment, is reported under \`failed\` / \`skipped\` rather than failing the whole call.`,
    params: [
      {
        name: 'assignee_user_ids',
        type: 'array',
        required: true,
        description: `The complete list of user IDs (or AI employee IDs) that should own the conversation. This replaces the existing assignee list entirely; pass an empty list to unassign everyone.`,
      },
      {
        name: 'conversation_ids',
        type: 'array',
        required: true,
        description: `The conversations to set the assignee list on.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_block_dates',
    description: `Block (mark unavailable) a list of dates on a listing's calendar. Sugar over \`update_calendar_days\` with \`available=false\` — dispatched asynchronously via the listing's OTA.`,
    params: [
      {
        name: 'dates',
        type: 'array',
        required: true,
        description: `The dates to block on the listing's calendar.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to block dates on.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_bulk_assign_listing_tags',
    description: `Assign every tag in \`tag_ids\` to every listing in \`listing_ids\`.`,
    params: [
      {
        name: 'listing_ids',
        type: 'array',
        required: true,
        description: `The listings to assign the tags to.`,
      },
      {
        name: 'tag_ids',
        type: 'array',
        required: true,
        description: `The tags to assign to the listings.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_bulk_create_tasks',
    description: `Create many tasks in ONE call, each optionally with its own subtasks. Use this for punch lists — a property walkthrough, an inspection report, a meeting's action items — instead of calling create_task in a loop. Up to 100 tasks per call. Apply shared values (listing_id, priority, category, assignee_ids, due_date) by repeating them on each entry. Entries are independent: a bad entry is reported in \`failed\` with its index and the rest are still created, so retry only the failed indices — re-sending a created entry makes a duplicate task.`,
    params: [
      {
        name: 'tasks',
        type: 'array',
        required: true,
        description: `Array of task objects to create in one call, up to 100. Each object accepts the same fields as create_task (title required; description, priority, category, listing_id, assignee_ids, due_date, source optional).`,
      },
    ],
  },
  {
    name: 'prohostaimcp_bulk_delete_expenses',
    description: `Delete multiple expenses by ID. Max 100 IDs; missing/foreign IDs appear in \`failed\`.`,
    params: [
      {
        name: 'expense_ids',
        type: 'array',
        required: true,
        description: `The expenses to delete (max 100).`,
      },
    ],
  },
  {
    name: 'prohostaimcp_bulk_remove_listing_tags',
    description: `Remove every tag in \`tag_ids\` from every listing in \`listing_ids\`.`,
    params: [
      {
        name: 'listing_ids',
        type: 'array',
        required: true,
        description: `The listings to remove the tags from.`,
      },
      {
        name: 'tag_ids',
        type: 'array',
        required: true,
        description: `The tags to remove from each listing.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_bulk_update_conversations',
    description: `Apply the same patch (e.g. \`\`{"ai_muted": true}\`\`) to many conversations. Account-wide — listing-scoped API keys are rejected. Works on conversations in your account and on connected-teams merged threads in your inbox scope — ProhostAI-Support threads you participate in included — but for a merged (cross-account) thread only PER-USER fields land — thread-level flags (is_done, is_spam, is_starred, autopilot_disabled, and needs_response) are reported under \`\`skipped\`\` with reason \`\`cross_account_thread_level_flag_not_supported\`\` so a partner team's inbox state is never mutated. \`\`ai_muted\`\` is the exception and DOES land on a merged thread, matching the web app and the pause_ai / resume_ai tools, which have always written it there; on another account's ProhostAI-Support thread it is skipped with reason \`\`cross_account_support_thread_flag_not_supported\`\`, because that bridge is two-sided and muting the AI would change the other side's thread. A merged ProhostAI-Support thread otherwise follows the same rule: mark-read and needs_follow_up land (both per-user), while is_done is skipped — the web tracks done-ness per user on an internal thread (plus a support-side group-done), which this bulk path does not implement, so writing the shared thread flag here would mark the customer's thread done. Use the web support inbox to resolve a support thread. \`\`needs_response\`\` goes through the shared guarded mutation: internal team-chat conversations (which track needs_response per user) and conversations with a newer needs_response update are reported under \`\`skipped\`\` instead of patched. \`\`needs_follow_up\`\` is likewise guarded, but internal team chats are patched rather than skipped — the flag lands on the acting user's per-user row (their Follow Up tab); only a conversation carrying a newer follow-up update is reported under \`\`skipped\`\`.`,
    params: [
      {
        name: 'conversation_ids',
        type: 'array',
        required: true,
        description: `List of conversation IDs to apply the patch to.`,
      },
      {
        name: 'patch',
        type: 'object',
        required: true,
        description: `Fields to patch on each conversation, e.g. {"ai_muted": true}. Supported keys include ai_muted, is_done, is_spam, is_starred, autopilot_disabled, needs_response, and needs_follow_up — see the tool description for per-field behavior on merged and cross-account threads.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_bulk_update_expenses',
    description: `Update a common set of fields across multiple expenses in one call. \`updates\` is the same shape as \`update_expense\` (minus \`expense_id\`). Expenses not owned by the account appear in \`failed\`. Max 100 IDs.`,
    params: [
      {
        name: 'expense_ids',
        type: 'array',
        required: true,
        description: `The expenses to update (max 100).`,
      },
      {
        name: 'updates',
        type: 'object',
        required: true,
        description: `Fields to apply to every expense, using the same shape as update_expense minus expense_id.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_cancel_scheduled_message',
    description: `Cancel a scheduled message that has not yet been sent. Returns an error if the message is already sent / failed / cancelled. Idempotent on MCP request id.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The conversation the scheduled message belongs to.`,
      },
      {
        name: 'scheduled_message_id',
        type: 'string',
        required: true,
        description: `The scheduled message to cancel.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_check_missing_custom_fields',
    description: `For a set of field keys, return which listings (under a tag or an explicit ID list) don't have a value for them in the merged hierarchy. Useful for validating tag-scoped guidebook references before saving.`,
    params: [
      {
        name: 'field_keys',
        type: 'array',
        required: true,
        description: `The custom-field keys to check for missing values.`,
      },
      {
        name: 'listing_ids',
        type: 'string',
        required: false,
        description: `Restrict the check to this explicit list of listing IDs.`,
      },
      {
        name: 'tag_id',
        type: 'string',
        required: false,
        description: `Restrict the check to listings assigned to this tag.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_classify_bank_transaction',
    description: `AI-suggest the best expense category for a Plaid bank transaction. Combines fuzzy text matching over the account's expense categories with an LLM pick. Read-only — suggests a category id + a ranked candidate shortlist; makes no changes and needs no confirmation. Use the suggested category_id with create_expense_from_transaction.`,
    params: [
      {
        name: 'transaction_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Plaid bank transaction to classify.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_classify_ramp_transaction',
    description: `AI-suggest the best expense category for a Ramp corporate-card transaction. Combines fuzzy text matching over the account's expense categories with an LLM pick. Read-only — suggests a category id + a ranked candidate shortlist; makes no changes and needs no confirmation. Use the suggested category_id with create_expense_from_ramp_transaction.`,
    params: [
      {
        name: 'transaction_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Ramp corporate-card transaction to classify.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_community_create_post',
    description: `Post into a community lounge as the acting user's pseudonymous community profile. The body is rendered as plain text — newlines are preserved, markdown is NOT rendered — and is limited to 5000 characters. Joins the lounge first by default (idempotent; set join_first=false to post without joining). The user's credentials must satisfy the lounge's eligibility rule. Rate-limited to 5 posts per minute. Requires the \`community:write\` scope.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `Plain-text post body. Newlines are preserved, markdown is not rendered. Limited to 5000 characters.`,
      },
      {
        name: 'lounge_slug',
        type: 'string',
        required: true,
        description: `Slug of the community lounge to post into. Use community_list_lounges to find valid slugs.`,
      },
      {
        name: 'join_first',
        type: 'boolean',
        required: false,
        description: `Whether to join the lounge first if not already a member. Idempotent; set to false to post without joining.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_community_list_lounges',
    description: `List every community lounge with the acting user's standing in each: slug, name, kind, emoji, member count, whether the user has joined, and whether their credentials make them eligible. Also returns the user's pseudonymous community handle — every join and post is attributed to that handle, never their real name. Call this before community_create_post to pick a valid lounge slug. Requires the \`community:read\` scope.`,
    params: [],
  },
  {
    name: 'prohostaimcp_configure_ai_employee',
    description: `Update an existing AI employee. Only the provided fields are written.`,
    params: [
      {
        name: 'agent_id',
        type: 'string',
        required: true,
        description: `The id of the AI employee to configure.`,
      },
      {
        name: 'avatar_emoji',
        type: 'string',
        required: false,
        description: `An emoji to use as the employee's avatar. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'confidence_threshold',
        type: 'string',
        required: false,
        description: `Minimum confidence score (0-100) required before the employee acts autonomously. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'goals',
        type: 'string',
        required: false,
        description: `New list of goals for the AI employee, replacing the existing list. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'heartbeat_enabled',
        type: 'string',
        required: false,
        description: `Whether proactive heartbeat runs are enabled for this employee. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'heartbeat_interval_seconds',
        type: 'string',
        required: false,
        description: `How often, in seconds, the employee runs proactive heartbeat checks. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the AI employee. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'proactiveness',
        type: 'string',
        required: false,
        description: `How proactively the employee should act. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'reports_to_agent_id',
        type: 'string',
        required: false,
        description: `The id of the AI employee this employee reports to. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'responsibilities',
        type: 'string',
        required: false,
        description: `New list of responsibilities for the AI employee, replacing the existing list. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'system_prompt',
        type: 'string',
        required: false,
        description: `New system prompt for the AI employee. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New job title for the AI employee. Omit or leave null to leave unchanged.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_ai_employee',
    description: `Create a brand-new custom AI employee (not from a template). It is created inactive.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The AI employee's name.` },
      {
        name: 'system_prompt',
        type: 'string',
        required: true,
        description: `The system prompt defining the AI employee's role and behavior.`,
      },
      {
        name: 'goals',
        type: 'string',
        required: false,
        description: `A list of goals for the AI employee. Omit or leave null for none.`,
      },
      {
        name: 'responsibilities',
        type: 'string',
        required: false,
        description: `A list of responsibilities for the AI employee. Omit or leave null for none.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The AI employee's job title. Omit or leave null for no title.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_ai_employee_trigger',
    description: `Wire an event trigger to an AI employee.`,
    params: [
      {
        name: 'agent_id',
        type: 'string',
        required: true,
        description: `The id of the AI employee to wire the trigger to.`,
      },
      {
        name: 'trigger_type',
        type: 'string',
        required: true,
        description: `The type of event that fires this trigger.`,
      },
      {
        name: 'cooldown_seconds',
        type: 'integer',
        required: false,
        description: `Minimum number of seconds between successive firings of this trigger.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `What the trigger is for. This text is injected into the prompt of every run the trigger fires, so on a 'schedule' trigger it is the routine's instructions. Omit or leave null for none.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the trigger is active immediately after creation.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `A display name for the trigger. Omit or leave null for none.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_approval_request',
    description: `File an approval request for a proposed action that needs human sign-off — use this BEFORE performing anything risky or irreversible (sending payments, cancelling reservations, bulk changes, external side effects). The request appears on the customer's home page and as an interactive card in their team chat; a team member approves or rejects it there. The decision arrives on your webhook subscription as \`agent.approval_requested\` → \`agent.approval_resolved\` events, or poll \`get_approval_request\`. Requires a paired agent identity (an agent-pairing API key) and the \`approvals:write\` scope. \`proposed_action\` is a JSON object describing exactly what you intend to do if approved; keep it complete enough for a human to judge.`,
    params: [
      {
        name: 'proposed_action',
        type: 'object',
        required: true,
        description: `A JSON object describing exactly what you intend to do if approved; keep it complete enough for a human to judge.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `A short human-readable title for the approval request.`,
      },
      {
        name: 'action_kind',
        type: 'string',
        required: false,
        description: `The category of action being proposed.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Additional context or justification for the proposed action. Omit or leave null for none.`,
      },
      {
        name: 'risk_level',
        type: 'string',
        required: false,
        description: `The risk level of the proposed action.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_cleaning',
    description: `Schedule a new cleaning job for a listing. Datetimes are ISO-8601.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to schedule the cleaning for.`,
      },
      {
        name: 'scheduled_ends_at',
        type: 'string',
        required: true,
        description: `The ISO-8601 datetime the cleaning is scheduled to end.`,
      },
      {
        name: 'scheduled_starts_at',
        type: 'string',
        required: true,
        description: `The ISO-8601 datetime the cleaning is scheduled to start.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `A short title for the cleaning job.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Free-form notes about the cleaning job.`,
      },
      { name: 'type', type: 'string', required: false, description: `The type of cleaning job.` },
    ],
  },
  {
    name: 'prohostaimcp_create_cleaning_checklist',
    description: `Create a new checklist on a cleaning.`,
    params: [
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning job to add a checklist to.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the new checklist.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional description for the checklist.`,
      },
      {
        name: 'items',
        type: 'string',
        required: false,
        description: `Optional initial list of item objects to create on the checklist.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_contact',
    description: `Create a new contact record on the account.`,
    params: [
      {
        name: 'first_name',
        type: 'string',
        required: true,
        description: `The contact's first name.`,
      },
      { name: 'company', type: 'string', required: false, description: `The contact's company.` },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `The contact's email address.`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `The contact's last name.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Free-text notes about the contact.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `The contact's phone number.`,
      },
      { name: 'role', type: 'string', required: false, description: `The contact's role.` },
    ],
  },
  {
    name: 'prohostaimcp_create_expense_category',
    description: `Create a new custom expense category for the account.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the new expense category.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_expense_from_ramp_transaction',
    description: `Create an expense from a Ramp corporate-card transaction and reconcile the transaction onto it. CONFIRMATION-GATED: call with confirm=false (default) first to get a preview of the proposed expense; only call with confirm=true after the host approves. On confirm it creates the Expense (name, amount, date, category, listing) and sets the transaction's expense_id. The created expense carries the category + listing the accounting-push tool needs.`,
    params: [
      {
        name: 'transaction_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Ramp corporate-card transaction to create an expense from.`,
      },
      {
        name: 'category_id',
        type: 'string',
        required: false,
        description: `The expense category ID to assign to the created expense.`,
      },
      {
        name: 'confirm',
        type: 'boolean',
        required: false,
        description: `Set to true to actually create the expense; when false (default), returns a preview of the proposed expense without creating it.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `The listing ID to associate with the created expense.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name/description for the created expense.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_expense_from_transaction',
    description: `Create an expense from a Plaid bank transaction and reconcile the transaction onto it. CONFIRMATION-GATED: call with confirm=false (default) first to get a preview of the proposed expense; only call with confirm=true after the host approves. On confirm it creates the Expense (name, amount, date, category, listing) and sets the transaction's expense_id. The created expense carries the category + listing the accounting-push tool needs.`,
    params: [
      {
        name: 'transaction_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Plaid bank transaction to create the expense from.`,
      },
      {
        name: 'category_id',
        type: 'string',
        required: false,
        description: `The expense category id to assign. Defaults to null; use classify_bank_transaction to get a suggested category_id.`,
      },
      {
        name: 'confirm',
        type: 'boolean',
        required: false,
        description: `Set to true to actually create the expense. Defaults to false, which returns a preview only.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `The listing id to associate with the created expense. Defaults to null.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The name to give the created expense. Defaults to null.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_guest',
    description: `Create a new guest record on the account.`,
    params: [
      {
        name: 'first_name',
        type: 'string',
        required: true,
        description: `The guest's first name.`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `The guest's street address.`,
      },
      { name: 'city', type: 'string', required: false, description: `The guest's city.` },
      { name: 'country', type: 'string', required: false, description: `The guest's country.` },
      { name: 'email', type: 'string', required: false, description: `The guest's email address.` },
      { name: 'last_name', type: 'string', required: false, description: `The guest's last name.` },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Free-text notes about the guest.`,
      },
      { name: 'phone', type: 'string', required: false, description: `The guest's phone number.` },
      {
        name: 'photo_url',
        type: 'string',
        required: false,
        description: `URL of the guest's photo.`,
      },
      {
        name: 'postal_code',
        type: 'string',
        required: false,
        description: `The guest's postal code.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `Tags to associate with the guest.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_guidebook',
    description: `Create a new guidebook attached to a listing. Does NOT seed default sections.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to attach the guidebook to.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the guidebook.` },
      {
        name: 'default_language',
        type: 'string',
        required: false,
        description: `The default language locale for the guidebook.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional description of the guidebook.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_guidebook_section',
    description: `Create a guidebook-scoped section.`,
    params: [
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook to add the section to.`,
      },
      { name: 'section_type', type: 'string', required: true, description: `The type of section.` },
      { name: 'title', type: 'string', required: true, description: `The title of the section.` },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The body content of the section.`,
      },
      {
        name: 'icon',
        type: 'string',
        required: false,
        description: `An icon identifier for the section. Omit or leave null for no icon.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `The unique identifier of a parent section, to nest this section under it. Omit or leave null for a top-level section.`,
      },
      {
        name: 'position',
        type: 'string',
        required: false,
        description: `The sort position of the section among its siblings. Omit or leave null to append at the end.`,
      },
      {
        name: 'unlock_before_checkin',
        type: 'string',
        required: false,
        description: `Number of hours before check-in that this section unlocks for the guest. Omit or leave null to have no lock.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_listing',
    description: `Create a new manual property listing. Thin wrapper over the REST POST /v1/listings endpoint. Supports manual listings only — OTA-backed listings must be created via OTA connection sync.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `The title of the listing.` },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `The street address of the listing.`,
      },
      {
        name: 'city',
        type: 'string',
        required: false,
        description: `The city the listing is located in.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `The country the listing is located in.`,
      },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `The currency code used for the listing's pricing.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the listing.`,
      },
      {
        name: 'internal_title',
        type: 'string',
        required: false,
        description: `An internal-only title for the listing, not shown to guests.`,
      },
      {
        name: 'lat',
        type: 'string',
        required: false,
        description: `The latitude coordinate of the listing.`,
      },
      {
        name: 'lng',
        type: 'string',
        required: false,
        description: `The longitude coordinate of the listing.`,
      },
      {
        name: 'max_guests',
        type: 'string',
        required: false,
        description: `The maximum number of guests the listing accommodates.`,
      },
      {
        name: 'num_bathrooms',
        type: 'string',
        required: false,
        description: `The number of bathrooms.`,
      },
      {
        name: 'num_bedrooms',
        type: 'string',
        required: false,
        description: `The number of bedrooms.`,
      },
      { name: 'num_beds', type: 'string', required: false, description: `The number of beds.` },
      {
        name: 'postal_code',
        type: 'string',
        required: false,
        description: `The postal/ZIP code of the listing.`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `The IANA timezone for the listing.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_listing_tag',
    description: `Create a new listing tag on the account.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the new tag.` },
      {
        name: 'tag_type',
        type: 'string',
        required: true,
        description: `The type of tag to create.`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Optional color for the tag.`,
      },
      {
        name: 'custom_fields',
        type: 'string',
        required: false,
        description: `Optional custom field key/value pairs to store on the tag.`,
      },
      {
        name: 'icon',
        type: 'string',
        required: false,
        description: `Optional icon identifier for the tag.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_memory',
    description: `Create a new memory in the property knowledge base. \`scope\` is one of \`listing\` (requires \`listing_id\`), \`all_listings\`, or \`listing_group\` (requires \`listing_tag_id\`). Keys bound to an AI employee always create INTERNAL memories — \`is_internal\` is forced true so the memory can inform a guest-facing reply but is never quoted to a guest verbatim.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The memory's text content.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `One of listing (requires listing_id), all_listings, or listing_group (requires listing_tag_id).`,
      },
      {
        name: 'is_internal',
        type: 'boolean',
        required: false,
        description: `Whether this memory is internal-only (never quoted to a guest verbatim). Forced true for keys bound to an AI employee.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `Required when scope is listing; the ID of the listing this memory applies to.`,
      },
      {
        name: 'listing_tag_id',
        type: 'string',
        required: false,
        description: `Required when scope is listing_group; the ID of the listing tag/group this memory applies to.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_message_template',
    description: `Create a message template. \`\`type\`\` is one of \`\`booking_confirmed\`\`, \`\`check_in\`\`, \`\`checkout\`\`, \`\`recurring_weekly\`\`. \`\`time_offset_minutes\`\` is signed: NEGATIVE fires BEFORE the event (e.g. -60 = one hour before check-in), positive after, 0 at the event. For \`\`check_in\`\` / \`\`checkout\`\` templates, a reservation booked AFTER the computed send time is silently skipped unless \`\`send_if_past_due=True\`\`. Set \`\`apply_to_existing_reservations=True\`\` to also schedule messages for already-existing reservations with future events (otherwise the template only applies to reservations booked from now on).`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `Message body to send. Use placeholders such as {guest_first_name} — see list_conversation_message_variables for the full list of valid placeholders.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Internal title for the message template (not shown to guests).`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Template trigger type. One of booking_confirmed, check_in, checkout, or recurring_weekly.`,
      },
      {
        name: 'apply_to_existing_reservations',
        type: 'boolean',
        required: false,
        description: `If true, also schedule messages for already-existing reservations with future events. If false, the template only applies to reservations booked from now on.`,
      },
      {
        name: 'day_of_week',
        type: 'string',
        required: false,
        description: `For recurring_weekly templates, the day of week to send on.`,
      },
      {
        name: 'is_enabled',
        type: 'boolean',
        required: false,
        description: `Whether the template is active and will schedule messages.`,
      },
      {
        name: 'listing_ids',
        type: 'string',
        required: false,
        description: `Listing IDs this template applies to. Omit or leave null to apply to all listings.`,
      },
      {
        name: 'max_nights',
        type: 'string',
        required: false,
        description: `Only apply this template to reservations with at most this many nights.`,
      },
      {
        name: 'min_nights',
        type: 'string',
        required: false,
        description: `Only apply this template to reservations with at least this many nights.`,
      },
      {
        name: 'past_due_delay_minutes',
        type: 'integer',
        required: false,
        description: `Minutes to delay a past-due send when send_if_past_due is true.`,
      },
      {
        name: 'send_if_past_due',
        type: 'boolean',
        required: false,
        description: `For check_in / checkout templates, if true the message still sends even when the reservation was booked after the computed send time (otherwise it is silently skipped).`,
      },
      {
        name: 'time_of_day',
        type: 'string',
        required: false,
        description: `For recurring_weekly templates, the time of day to send at (24-hour HH:MM).`,
      },
      {
        name: 'time_offset_minutes',
        type: 'string',
        required: false,
        description: `Minutes relative to the check-in/checkout event when the message should send. Negative fires before the event (e.g. -60 = one hour before), positive fires after, 0 fires at the event.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_owner',
    description: `Create a new property owner on the account. Optionally pass \`\`listing_ids\`\` to assign existing listings to the new owner in the same call.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address of the property owner.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full name of the property owner.`,
      },
      {
        name: 'address_line1',
        type: 'string',
        required: false,
        description: `First line of the owner's mailing address.`,
      },
      {
        name: 'address_line2',
        type: 'string',
        required: false,
        description: `Second line of the owner's mailing address (apartment, suite, etc.).`,
      },
      {
        name: 'city',
        type: 'string',
        required: false,
        description: `City of the owner's mailing address.`,
      },
      {
        name: 'commission_rate',
        type: 'string',
        required: false,
        description: `Commission rate charged to this owner.`,
      },
      {
        name: 'commission_type',
        type: 'string',
        required: false,
        description: `How the commission is calculated (e.g. percentage or flat_fee).`,
      },
      {
        name: 'company_name',
        type: 'string',
        required: false,
        description: `Company name associated with the property owner, if applicable.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Country of the owner's mailing address.`,
      },
      {
        name: 'listing_ids',
        type: 'string',
        required: false,
        description: `Existing listing IDs to assign to the new owner.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Free-form internal notes about the owner.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Phone number of the property owner.`,
      },
      {
        name: 'postal_code',
        type: 'string',
        required: false,
        description: `Postal or ZIP code of the owner's mailing address.`,
      },
      {
        name: 'state_province',
        type: 'string',
        required: false,
        description: `State or province of the owner's mailing address.`,
      },
      {
        name: 'tax_id',
        type: 'string',
        required: false,
        description: `Tax identification number (e.g. SSN or EIN) for the owner.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_owner_statement',
    description: `Create a new owner statement covering \`\`[from_date, to_date]\`\`.`,
    params: [
      {
        name: 'from_date',
        type: 'string',
        required: true,
        description: `Start date of the statement period (ISO 8601).`,
      },
      {
        name: 'owner_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the owner this statement is for.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the owner statement.`,
      },
      {
        name: 'to_date',
        type: 'string',
        required: true,
        description: `End date of the statement period (ISO 8601).`,
      },
      {
        name: 'invoice_number',
        type: 'string',
        required: false,
        description: `Invoice number to associate with the statement.`,
      },
      {
        name: 'logo',
        type: 'string',
        required: false,
        description: `URL or reference to a logo image to display on the statement.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Free-form notes to include on the statement.`,
      },
      {
        name: 'property_manager_address',
        type: 'string',
        required: false,
        description: `Property manager's mailing address to display on the statement.`,
      },
      {
        name: 'property_manager_email',
        type: 'string',
        required: false,
        description: `Property manager's email to display on the statement.`,
      },
      {
        name: 'property_manager_name',
        type: 'string',
        required: false,
        description: `Property manager's name to display on the statement.`,
      },
      {
        name: 'property_manager_phone',
        type: 'string',
        required: false,
        description: `Property manager's phone number to display on the statement.`,
      },
      {
        name: 'property_manager_tax_number',
        type: 'string',
        required: false,
        description: `Property manager's tax identification number to display on the statement.`,
      },
      {
        name: 'property_owner_address',
        type: 'string',
        required: false,
        description: `Property owner's mailing address to display on the statement.`,
      },
      {
        name: 'property_owner_email',
        type: 'string',
        required: false,
        description: `Property owner's email to display on the statement.`,
      },
      {
        name: 'property_owner_name',
        type: 'string',
        required: false,
        description: `Property owner's name to display on the statement.`,
      },
      {
        name: 'property_owner_phone',
        type: 'string',
        required: false,
        description: `Property owner's phone number to display on the statement.`,
      },
      {
        name: 'property_owner_tax_number',
        type: 'string',
        required: false,
        description: `Property owner's tax identification number to display on the statement.`,
      },
      {
        name: 'rental_activity_display_type',
        type: 'string',
        required: false,
        description: `How rental activity line items are displayed on the statement.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Status of the statement (e.g. draft, sent, paid).`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_place',
    description: `Create a new place on the account.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the place.` },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `The street address of the place.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A free-text description of the place.`,
      },
      {
        name: 'google_place_id',
        type: 'string',
        required: false,
        description: `The associated Google Place ID, if this place was created from a Google Places lookup.`,
      },
      {
        name: 'latitude',
        type: 'string',
        required: false,
        description: `The latitude coordinate of the place.`,
      },
      {
        name: 'listing_tag_ids',
        type: 'string',
        required: false,
        description: `List of listing tag IDs to attach to the place upon creation.`,
      },
      {
        name: 'longitude',
        type: 'string',
        required: false,
        description: `The longitude coordinate of the place.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `The place's contact phone number.`,
      },
      {
        name: 'photo_url',
        type: 'string',
        required: false,
        description: `URL of a photo representing the place.`,
      },
      {
        name: 'website_url',
        type: 'string',
        required: false,
        description: `The place's website URL.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_saved_reply',
    description: `Create a saved reply (canned message).`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `Message body inserted when this saved reply is used.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the saved reply, shown in the saved-reply picker.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Category to group this saved reply under.`,
      },
      {
        name: 'shortcut',
        type: 'string',
        required: false,
        description: `Text shortcut that expands to this saved reply.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_suggestion',
    description: `Create an AI message-suggestion draft on a guest conversation. Nothing is sent — the host reviews the draft in the ProhostAI inbox (the AI-suggestion modal) and can send, edit, or dismiss it. Not supported on internal team-chat conversations. The draft anchors on the conversation's latest message. If a draft already exists there, the call is rejected (with the existing draft under \`existing\`) unless \`replace_existing=true\` is passed; use \`list_suggestions\` to review existing drafts first. A scheduled/paused autopilot reply is always rejected regardless of \`replace_existing\`.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the conversation to create the AI suggestion draft on.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The suggestion text to save as an AI draft on the conversation.`,
      },
      {
        name: 'replace_existing',
        type: 'boolean',
        required: false,
        description: `Whether to replace an existing draft suggestion on this conversation if one already exists.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_tag_section',
    description: `Create a tag-scoped section. Account-wide mutation.`,
    params: [
      {
        name: 'listing_tag_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing tag to attach the section to.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the section.` },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The body content of the section.`,
      },
      {
        name: 'icon',
        type: 'string',
        required: false,
        description: `An icon identifier for the section. Omit or leave null for no icon.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `The unique identifier of a parent section, to nest this section under it. Omit or leave null for a top-level section.`,
      },
      {
        name: 'position',
        type: 'string',
        required: false,
        description: `The sort position of the section among its siblings. Omit or leave null to append at the end.`,
      },
      {
        name: 'section_type',
        type: 'string',
        required: false,
        description: `The type of section.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_task',
    description: `Create a new task.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `The title of the task.` },
      {
        name: 'assignee_ids',
        type: 'string',
        required: false,
        description: `User IDs to assign this task to.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Category to classify the task under.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Detailed description of the task.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `ISO 8601 due date for the task.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `The listing this task relates to.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Priority level for the task.`,
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: `Where this task originated from. One of review, message, or manual.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_task_checklist',
    description: `Create a checklist on a task.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task to add the checklist to.`,
      },
      { name: 'title', type: 'string', required: true, description: `Title of the checklist.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description of the checklist.`,
      },
      {
        name: 'items',
        type: 'string',
        required: false,
        description: `Initial checklist items to create along with the checklist.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_task_checklist_from_template',
    description: `Instantiate a task checklist from a template.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task to add the checklist to.`,
      },
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist template to instantiate.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_upgrade_option',
    description: `Create a paid upgrade option attached to a guidebook.`,
    params: [
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook to attach this upgrade option to.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the upgrade option.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the upgrade option.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the upgrade option is enabled and visible to guests.`,
      },
      {
        name: 'price',
        type: 'number',
        required: false,
        description: `The price of the upgrade option.`,
      },
      {
        name: 'upgrade_type',
        type: 'string',
        required: false,
        description: `The type/scope of the upgrade option.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_webhook_subscription',
    description: `Create a webhook subscription. The signing secret is returned ONCE in the response — store it securely. URL must be HTTPS. See the REST /v1/webhooks/events endpoint for the list of supported event types.`,
    params: [
      {
        name: 'events',
        type: 'array',
        required: true,
        description: `The list of event types to subscribe to. See the REST /v1/webhooks/events endpoint for supported event types.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The HTTPS endpoint that will receive webhook event payloads.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional description to help identify this webhook subscription.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_create_workflow',
    description: `Propose a NEW automation workflow. A workflow runs a fixed sequence of steps whenever its trigger fires. Because it keeps running on every future trigger, creation ALWAYS requires human approval: this validates the definition and files an approval card, returning status='pending_approval' with the approval id. The workflow is created only when a human approves the card — it is never created inline. Each step is {order, instruction, tool_name?, skill_key?, delay_seconds?}.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the new workflow.`,
      },
      {
        name: 'steps',
        type: 'array',
        required: true,
        description: `The ordered list of steps the workflow runs when triggered.`,
      },
      {
        name: 'trigger_type',
        type: 'string',
        required: true,
        description: `The type of trigger that starts this workflow.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional description of what the workflow does.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the workflow should be enabled immediately after approval.`,
      },
      {
        name: 'listing_ids',
        type: 'string',
        required: false,
        description: `Listing IDs to scope this workflow to.`,
      },
      {
        name: 'trigger_config',
        type: 'string',
        required: false,
        description: `Configuration object for the trigger, depending on trigger_type.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_add_comment',
    description: `Add a comment/note to a CRM object (opportunity, contact, company, or meeting).`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `The text content of the comment or note.`,
      },
      {
        name: 'object_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the CRM object to attach the comment to.`,
      },
      {
        name: 'object_type',
        type: 'string',
        required: true,
        description: `The type of CRM object to attach the comment to (e.g. opportunity, contact, company, or meeting).`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_archive_opportunity',
    description: `Archive (soft-delete) a CRM opportunity.`,
    params: [
      {
        name: 'opportunity_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the CRM opportunity to archive.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_create_company',
    description: `Create a CRM company (an organization).`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the company to create.`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `The company's website domain, if known.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_create_contact',
    description: `Create a CRM contact (a person).`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the contact.` },
      {
        name: 'company_id',
        type: 'string',
        required: false,
        description: `The company to associate with this contact.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `The email address of the contact.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `The phone number of the contact.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The job title of the contact.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_create_field_definition',
    description: `Define a new CRM custom field (e.g. a 'number' field on opportunities). Define the field once, then set per-object values with crm_set_custom_field.`,
    params: [
      {
        name: 'field_type',
        type: 'string',
        required: true,
        description: `The data type of the field (e.g. text, number, boolean, date, or select).`,
      },
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The unique key used to reference this custom field programmatically.`,
      },
      {
        name: 'label',
        type: 'string',
        required: true,
        description: `The human-readable label shown for this field in the CRM UI.`,
      },
      {
        name: 'object_type',
        type: 'string',
        required: true,
        description: `The type of CRM object this field applies to (e.g. opportunity, contact, or company).`,
      },
      {
        name: 'default_value',
        type: 'string',
        required: false,
        description: `The default value to use for this field when none is set.`,
      },
      {
        name: 'options',
        type: 'string',
        required: false,
        description: `The list of selectable values for a 'select' type field. Not needed for other field types.`,
      },
      {
        name: 'pipeline_id',
        type: 'string',
        required: false,
        description: `Restrict this field definition to a specific pipeline, if applicable.`,
      },
      {
        name: 'required',
        type: 'boolean',
        required: false,
        description: `Whether this custom field must be filled in when creating or editing the CRM object.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_create_followup',
    description: `Create a follow-up task tied to a CRM opportunity.`,
    params: [
      {
        name: 'opportunity_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the opportunity this follow-up task is tied to.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the follow-up task.`,
      },
      {
        name: 'assignee_id',
        type: 'string',
        required: false,
        description: `The unique identifier of the user to assign this follow-up task to. Defaults to the current user if omitted.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Additional details or notes about the follow-up task.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `The due date for the follow-up task, in ISO 8601 format.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_create_opportunity',
    description: `Create a CRM opportunity (a deal card) on a pipeline.`,
    params: [
      {
        name: 'pipeline_id',
        type: 'string',
        required: true,
        description: `The pipeline to create the opportunity on.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the opportunity.`,
      },
      {
        name: 'company_id',
        type: 'string',
        required: false,
        description: `The company to associate with this opportunity.`,
      },
      {
        name: 'primary_contact_id',
        type: 'string',
        required: false,
        description: `The primary contact to associate with this opportunity.`,
      },
      {
        name: 'stage_id',
        type: 'string',
        required: false,
        description: `The pipeline stage to place the opportunity in. Defaults to the pipeline's first stage.`,
      },
      {
        name: 'value_amount',
        type: 'string',
        required: false,
        description: `The monetary value of the opportunity.`,
      },
      {
        name: 'value_currency',
        type: 'string',
        required: false,
        description: `The currency of the opportunity's value.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_get_opportunity',
    description: `Fetch a single CRM opportunity by id.`,
    params: [
      {
        name: 'opportunity_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the CRM opportunity to fetch.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_list_companies',
    description: `List or search CRM companies (organizations) for the account.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of companies to return.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search text to match against company names.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_list_contacts',
    description: `List or search CRM contacts (people) for the account.`,
    params: [
      {
        name: 'company_id',
        type: 'string',
        required: false,
        description: `Filter results to contacts belonging to this company.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of contacts to return.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search text to match against contact names, emails, or phone numbers.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_list_field_definitions',
    description: `List the account's CRM custom-field definitions, optionally filtered by object type. Use this to check whether a field already exists before creating it.`,
    params: [
      {
        name: 'object_type',
        type: 'string',
        required: false,
        description: `Filter field definitions to only this CRM object type. Omit to list definitions for all object types.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_list_opportunities',
    description: `List or search CRM opportunities (deal cards) for the account.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of opportunities to return.`,
      },
      {
        name: 'pipeline_id',
        type: 'string',
        required: false,
        description: `Filter results to opportunities in this pipeline.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search text to match against opportunity titles.`,
      },
      {
        name: 'stage_id',
        type: 'string',
        required: false,
        description: `Filter results to opportunities in this pipeline stage.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter results by opportunity status.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_list_pipelines',
    description: `List the account's CRM pipelines with their ordered stages.`,
    params: [],
  },
  {
    name: 'prohostaimcp_crm_log_meeting',
    description: `Log (or book) a CRM meeting / call against a deal, contact, or company.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the meeting or call being logged.`,
      },
      {
        name: 'company_id',
        type: 'string',
        required: false,
        description: `The unique identifier of the company to associate with this meeting, if any.`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `The unique identifier of the contact to associate with this meeting, if any.`,
      },
      {
        name: 'opportunity_id',
        type: 'string',
        required: false,
        description: `The unique identifier of the opportunity to associate with this meeting, if any.`,
      },
      {
        name: 'outcome',
        type: 'string',
        required: false,
        description: `The outcome or result of the meeting or call.`,
      },
      {
        name: 'summary',
        type: 'string',
        required: false,
        description: `A summary of what was discussed during the meeting.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_move_opportunity',
    description: `Move a CRM opportunity to a different stage (auto-closes on won/lost stages).`,
    params: [
      {
        name: 'opportunity_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the CRM opportunity to move.`,
      },
      {
        name: 'stage_id',
        type: 'string',
        required: true,
        description: `The pipeline stage to move the opportunity to.`,
      },
      {
        name: 'position',
        type: 'integer',
        required: false,
        description: `The position of the opportunity within the destination stage.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_set_custom_field',
    description: `Set a custom field by key on a CRM object.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The key of the custom field to set. Use crm_list_field_definitions to check existing keys.`,
      },
      {
        name: 'object_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the CRM object to set the custom field on.`,
      },
      {
        name: 'object_type',
        type: 'string',
        required: true,
        description: `The type of CRM object the custom field belongs to (e.g. opportunity, contact, or company).`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `The value to set for the custom field. The accepted type depends on the field's definition (e.g. text, number, boolean, or list).`,
      },
    ],
  },
  {
    name: 'prohostaimcp_crm_update_opportunity',
    description: `Update fields on an existing CRM opportunity.`,
    params: [
      {
        name: 'opportunity_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the CRM opportunity to update.`,
      },
      {
        name: 'company_id',
        type: 'string',
        required: false,
        description: `New company to associate with this opportunity.`,
      },
      {
        name: 'lost_reason',
        type: 'string',
        required: false,
        description: `Reason the opportunity was lost, if applicable.`,
      },
      {
        name: 'primary_contact_id',
        type: 'string',
        required: false,
        description: `New primary contact to associate with this opportunity.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the opportunity.`,
      },
      {
        name: 'value_amount',
        type: 'string',
        required: false,
        description: `New monetary value of the opportunity.`,
      },
      {
        name: 'value_currency',
        type: 'string',
        required: false,
        description: `New currency for the opportunity's value.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_ai_employee',
    description: `Permanently delete a custom AI employee. The default agent cannot be deleted.`,
    params: [
      {
        name: 'agent_id',
        type: 'string',
        required: true,
        description: `The id of the AI employee to permanently delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_ai_employee_trigger',
    description: `Remove an AI employee's event trigger.`,
    params: [
      {
        name: 'trigger_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the trigger to remove.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_cleaning_attachment',
    description: `Delete an attachment on a cleaning.`,
    params: [
      {
        name: 'attachment_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the attachment to delete.`,
      },
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning the attachment belongs to.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_cleaning_checklist',
    description: `Delete a checklist on a cleaning.`,
    params: [
      {
        name: 'checklist_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist to delete.`,
      },
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning job the checklist belongs to.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_cleaning_checklist_item',
    description: `Delete a cleaning checklist item.`,
    params: [
      {
        name: 'checklist_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist the item belongs to.`,
      },
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning job the checklist item belongs to.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist item to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_cleaning_comment',
    description: `Delete a cleaning comment (author only).`,
    params: [
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning job the comment belongs to.`,
      },
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the comment to delete. Only the original author can delete it.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_contact',
    description: `Delete a contact. Cascades to listing associations. Returns \`{"id": ..., "success": true}\` on success. Returns \`{"error": ..., "code": "contact_has_records"}\` when the contact is referenced by records that must be kept, such as orders.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the contact to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_contact_custom_fields',
    description: `Remove the named keys from \`custom_fields\` on every contact in \`contact_ids\`.`,
    params: [
      {
        name: 'contact_ids',
        type: 'array',
        required: true,
        description: `The contact IDs to update.`,
      },
      {
        name: 'field_keys',
        type: 'array',
        required: true,
        description: `The custom_fields keys to remove.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_expense_category',
    description: `Delete a custom expense category. System categories cannot be deleted.`,
    params: [
      {
        name: 'category_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the category to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_guest_custom_fields',
    description: `Remove the named keys from \`custom_fields\` on every guest in \`guest_ids\`.`,
    params: [
      {
        name: 'field_keys',
        type: 'array',
        required: true,
        description: `The custom_fields keys to remove.`,
      },
      { name: 'guest_ids', type: 'array', required: true, description: `The guest IDs to update.` },
    ],
  },
  {
    name: 'prohostaimcp_delete_guidebook_section',
    description: `Delete a guidebook-scoped section.`,
    params: [
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook the section belongs to.`,
      },
      {
        name: 'section_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the section to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_listing_custom_fields',
    description: `Batch-delete custom-field keys from listings, a tag, or the account.`,
    params: [
      {
        name: 'field_keys',
        type: 'array',
        required: true,
        description: `The custom field keys to delete.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The layer to delete custom-field keys from: account, tag, or listing.`,
      },
      {
        name: 'dry_run',
        type: 'boolean',
        required: false,
        description: `If true, preview the fields that would be deleted without deleting them.`,
      },
      {
        name: 'targets',
        type: 'string',
        required: false,
        description: `The targets to delete the fields from. Supports listing_ids, tag_ids (for scope=tag), or target_tag_id / target_tag_name / all_listings (for scope=listing).`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_listing_tag',
    description: `Delete a listing tag and all of its assignments.`,
    params: [
      {
        name: 'tag_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the tag to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_memory',
    description: `Move a memory to the trash by ID. Soft-deleted memories stop appearing in lists and AI recall but can be restored from the app's trash. Not available to keys bound to an AI employee.`,
    params: [
      {
        name: 'memory_id',
        type: 'string',
        required: true,
        description: `ID of the memory to move to the trash.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_message_template',
    description: `Soft-delete a message template by ID. Any scheduled messages still pending from this template are cancelled asynchronously.`,
    params: [
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the message template to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_owner_statement',
    description: `Delete an owner statement. Returns \`\`{"id": ..., "success": true}\`\` on success.`,
    params: [
      {
        name: 'statement_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the owner statement to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_pin',
    description: `Delete a pin.`,
    params: [
      {
        name: 'pin_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the pin to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_place',
    description: `Delete a place; cascades to pins and tag associations.`,
    params: [
      {
        name: 'place_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the place to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_pricing_override',
    description: `Delete one or more date-specific price overrides from PriceLabs. \`\`dates\`\` is a list of ISO dates (YYYY-MM-DD).`,
    params: [
      {
        name: 'dates',
        type: 'array',
        required: true,
        description: `The ISO dates (YYYY-MM-DD) whose price overrides should be deleted.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to delete price overrides from.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_reservation_custom_fields',
    description: `Remove the named keys from \`custom_fields\` on every reservation in \`reservation_ids\`.`,
    params: [
      {
        name: 'field_keys',
        type: 'array',
        required: true,
        description: `The custom field keys to remove.`,
      },
      {
        name: 'reservation_ids',
        type: 'array',
        required: true,
        description: `The reservation IDs to update.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_saved_reply',
    description: `Soft-delete a saved reply by ID.`,
    params: [
      {
        name: 'saved_reply_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the saved reply to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_tag_section',
    description: `Move a tag-scoped section (and its sub-sections) to the trash. It disappears from every guidebook the tag renders into, and the account owner can restore it from the ProhostAI app — report it as recoverable, not permanent.`,
    params: [
      {
        name: 'section_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the tag-scoped section to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_task_checklist',
    description: `Delete a checklist on a task.`,
    params: [
      {
        name: 'checklist_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist to delete.`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task the checklist belongs to.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_upgrade_option',
    description: `Delete an upgrade option.`,
    params: [
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook that owns this upgrade option.`,
      },
      {
        name: 'upgrade_option_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the upgrade option to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_delete_workflow',
    description: `Delete an automation workflow. This is a soft-delete: the workflow is marked deleted and disabled so it immediately stops matching any future trigger, then external runs are cancelled in the background. Safe to call more than once — deleting an already-deleted workflow succeeds without error.`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the workflow to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_docs_append_section',
    description: `Append a new heading-titled section to a doc.`,
    params: [
      {
        name: 'body_md',
        type: 'string',
        required: true,
        description: `The Markdown content of the new section body.`,
      },
      {
        name: 'heading',
        type: 'string',
        required: true,
        description: `The heading title for the new section.`,
      },
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique identifier of the Drive document to append the new section to.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_docs_read',
    description: `Read a Drive document by path or id.`,
    params: [
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique identifier of the Drive document to read.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_docs_read_section',
    description: `Read a single section of a doc by heading text.`,
    params: [
      {
        name: 'heading',
        type: 'string',
        required: true,
        description: `The heading text of the section to read.`,
      },
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique identifier of the Drive document to read from.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_docs_write',
    description: `Replace a Drive document body.`,
    params: [
      {
        name: 'body_md',
        type: 'string',
        required: true,
        description: `The new document body, in Markdown, that will replace the existing content.`,
      },
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique identifier of the Drive document to write to.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_docs_write_section',
    description: `Replace a section's body. \`heading\` accepts either heading text (case-insensitive, trimmed) or a stable block ULID returned from \`docs_read_section\` / the docs API — the ULID path survives heading renames, while the text path only works against the current heading.`,
    params: [
      {
        name: 'body_md',
        type: 'string',
        required: true,
        description: `The new Markdown content that will replace the section's current body.`,
      },
      {
        name: 'heading',
        type: 'string',
        required: true,
        description: `Heading text (case-insensitive, trimmed) or a stable block ULID returned from docs_read_section. The ULID form survives heading renames; the text form only matches the current heading.`,
      },
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique identifier of the Drive document containing the section to replace.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_draft_reply',
    description: `Generate a non-persisting AI reply draft for a conversation. Uses the same draft-assist pipeline as the in-app Inbox suggestion UI, but does NOT write any message — returns only the suggested text. Use this to preview what the host could send; call send_message to actually deliver.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the conversation to draft a reply for.`,
      },
      {
        name: 'instruction',
        type: 'string',
        required: false,
        description: `Optional instruction steering how the reply should be drafted.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_drive_create',
    description: `Create a Drive item (folder/doc/sheet). \`parent_path\` is the parent folder path (use '' for root). \`kind\` is one of folder, doc, sheet.`,
    params: [
      {
        name: 'kind',
        type: 'string',
        required: true,
        description: `The kind of Drive item to create. One of: folder, doc, sheet.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the new Drive item.`,
      },
      {
        name: 'parent_path',
        type: 'string',
        required: false,
        description: `The parent folder path. Use '' for the root folder.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_drive_delete',
    description: `Soft-delete a Drive item by path or id.`,
    params: [
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique identifier of the Drive item to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_drive_get',
    description: `Fetch a single Drive item by path or id.`,
    params: [
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique identifier of the Drive item to fetch.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_drive_list',
    description: `List children of a Drive folder by path. Omit path for the root.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `The Drive folder path to list children for. Omit for the root folder.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_drive_move',
    description: `Move a Drive item to a new parent (by path).`,
    params: [
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique identifier of the Drive item to move.`,
      },
      {
        name: 'new_parent_path',
        type: 'string',
        required: false,
        description: `The new parent folder path. Use '' to move the item to the root folder.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_drive_search',
    description: `Search Drive items by name (case-insensitive substring).`,
    params: [
      {
        name: 'q',
        type: 'string',
        required: true,
        description: `The search text to match against Drive item names (case-insensitive substring).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_edit_cleaning_comment',
    description: `Edit a previously-posted cleaning comment (author only).`,
    params: [
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning job the comment belongs to.`,
      },
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the comment to edit. Only the original author can edit it.`,
      },
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The new text content for the comment.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_edit_message',
    description: `Edit the body of a previously-sent message. Only supported on internal team chat conversations — OTA/SMS/WhatsApp/Gmail edits are blocked.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The conversation the message belongs to.`,
      },
      { name: 'message', type: 'string', required: true, description: `New message body.` },
      { name: 'message_id', type: 'string', required: true, description: `The message to edit.` },
    ],
  },
  {
    name: 'prohostaimcp_get_ai_chat_messages',
    description: `Read the message history of one of this credential's Ask AI chat sessions, oldest first. Requires the \`ai_chat:read\` scope.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `The id of the chat session to read.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_ai_employee_replies',
    description: `Poll your 1:1 DM with an AI employee for messages, oldest first. Pass \`since\` (ISO 8601 — use the \`sent_at\` of the last message you've seen) to fetch only newer messages; the employee's replies have \`from_agent: true\`. Returns \`conversation_id: null\` when no DM exists yet. Requires the \`agents:converse\` scope.`,
    params: [
      {
        name: 'agent',
        type: 'string',
        required: true,
        description: `The AI employee's id or handle whose DM thread to poll.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of messages to return.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; only messages sent after this time are returned. Pass the sent_at of the last message you've already seen. Omit or leave null to fetch from the start of the conversation.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_approval_request',
    description: `Get one approval request by id, including its current status (pending / approved / rejected / expired), who responded, and any rejection reason. Poll this after \`create_approval_request\` if you are not subscribed to the \`agent.approval_resolved\` webhook event.`,
    params: [
      {
        name: 'approval_id',
        type: 'string',
        required: true,
        description: `The id of the approval request to retrieve.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_autopilot_schedule',
    description: `Read the account's autopilot schedule windows — the per-weekday time ranges during which autopilot may auto-send. Returns whether scheduling is enabled, the schedule timezone, and each window's day, enabled flag, start/end (HH:MM), and whether it spans past midnight. Scheduling only takes effect when schedule_enabled is true.`,
    params: [],
  },
  {
    name: 'prohostaimcp_get_autopilot_settings',
    description: `Read the account's autopilot (automated-messaging) configuration: the master switch, message delay, confidence + sentiment thresholds, schedule flags, and the per-category and per-channel auto-send rules.`,
    params: [],
  },
  {
    name: 'prohostaimcp_get_availability',
    description: `Get calendar availability for a listing over a date range.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `The end of the date range to check, inclusive.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to check.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `The start of the date range to check, inclusive.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_bank_accounts',
    description: `List bank/credit-card accounts connected via Plaid for the current account. Returns balances, mask, type/subtype, institution, and Plaid Item status (e.g. login_required). Read-only — never returns Plaid access tokens or other credential material.`,
    params: [],
  },
  {
    name: 'prohostaimcp_get_contact_custom_fields',
    description: `Return the resolved custom-field values for a contact, with provenance. Merge order: account → contact. Contact-level values win on conflict.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the contact.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_conversation_messages',
    description: `Get messages for a conversation. Returns newest first. Openable scope matches search_conversations: the caller's own account plus — when this credential resolves to a user and is not listing-scoped — the connected-team host threads the user participates in (a merged thread surfaced by search is openable here). A thread outside that scope returns {"error": "Conversation not found"} (the same not-found as a nonexistent id — never an existence oracle). For a merged ProhostAI-Support thread the support-privacy stack is applied: internal notes are side-filtered (a customer-side caller never receives a support-side note, and vice versa), and a support-employee's message renders as the single branded 'ProhostAI Support' identity (no employee name/email) for a customer-side caller; a support-team caller sees real identities.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The conversation to fetch messages for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of messages to return.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_dashboard_summary',
    description: `Get a composite dashboard summary: today's check-ins/outs, pending tasks, and inbox counts. needs_response_count and follow_up_count are the HONEST inbox-tab badges — they mirror the web get_conversation_counts formula: not-done, not currently snoozed, non-internal base slice PLUS the caller's per-user internal (team-chat) slice (needs_response / needs_follow_up on their ConversationUserMetadata). needs_response_count = the 'Respond' badge; follow_up_count = the 'Follow Up' badge (needs_follow_up OR is_starred, with the internal arm counting per-user needs_follow_up only). Connected-teams merged visibility: when this credential resolves to a user (OAuth resource owner or the key's created_by) and is not listing-scoped, the internal slice folds in the user's team-chat threads from connected host accounts, minus agent-operational purposes. ProhostAI-Support threads ARE counted here (member hosts contribute only support; other hosts contribute support alongside their team-chat), so the badge matches search_conversations, which surfaces those threads with the support-privacy stack applied. An API-key credential with no resolved user skips the per-user internal slice (there is no single requesting user to attribute a per-user flag to), and a listing-scoped key also skips it (merged threads are listing-less). unread_conversations is a LEGACY field — COUNT(needs_response=true AND is_done=false) with NO snooze filter, NO channel filter, and NO connected-teams fan-out, so it over-counts; prefer needs_response_count. Known parity nuance (shared with the web badge): the INTERNAL (team-chat) slice of needs_response_count / follow_up_count does not apply a snooze filter, so a currently-snoozed team-chat thread still counts here even though search_conversations(..., snoozed=False) excludes it. The non-internal base slice does exclude snoozed threads.`,
    params: [],
  },
  {
    name: 'prohostaimcp_get_earnings_summary',
    description: `Get an earnings summary for a date range. Only CONFIRMED reservations are counted — cancelled, pending, and inquiry stays are excluded, matching the app's Earnings page and the REST /v1/earnings/summary endpoint. Attribution is by stay containment (the whole stay must fall inside the range), NOT by channel payout date, so this does not reconcile line-for-line to a channel host-earnings report that pays out on check-in. \`fees\` breaks the total down: accommodation_fare, cleaning_fee, service_fee (guest-side channel fee), pet_fee, other_fees, taxes, discounts, refunds, host_fees (the channel's host commission) and host_payout (what you net). A null amount means no line item of that category exists on any reservation in range — never a fabricated zero. Pass \`group_by_listing=true\` to get the same figures per listing as well as in aggregate.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `The end of the date range (inclusive) to summarize earnings for.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `The start of the date range (inclusive) to summarize earnings for.`,
      },
      {
        name: 'group_by_listing',
        type: 'boolean',
        required: false,
        description: `Whether to also break the totals down per listing, in addition to the aggregate figures.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `Restrict the summary to a single listing. Omit to summarize across all listings.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_guest_custom_fields',
    description: `Return the resolved custom-field values for a guest, with provenance. Merge order: account -> guest. Guest-level values win on conflict.`,
    params: [
      {
        name: 'guest_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guest to fetch resolved custom fields for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_guidebook',
    description: `Get guidebook content for a listing.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing whose guidebook to retrieve.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_listing',
    description: `Get a single listing by id, including title, address, capacity, and timezone.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to retrieve.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_listing_channel_urls',
    description: `Return deterministic OTA URLs for a listing. Currently resolves the Airbnb URL when sourced directly from Airbnb; OTA-managed channels (Hostaway/Hospitable) require the internal management API.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to resolve channel URLs for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_listing_custom_fields',
    description: `Resolve the merged custom-field dict for a listing using the \`\`account → tag → source → listing\`\` precedence. Set \`\`with_provenance=true\`\` to include where each value originated.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to resolve custom fields for.`,
      },
      {
        name: 'with_provenance',
        type: 'boolean',
        required: false,
        description: `Include where each resolved value originated (account, tag, source, or listing).`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_listing_customizations',
    description: `Return a listing's PriceLabs pricing customizations — standing lead-time / rule-based settings, NOT per-date prices. Surfaces the \`\`last_minute_prices\`\` block (adjusts prices as check-in approaches) and the \`\`far_out_premium\`\` block (raises far-out dates). Read this first when pricing depends on how far ahead a booking is made, or when diagnosing flat/clamped calendar prices — a last-minute discount is silently clamped at the listing's min price (see get_listing_pricing).`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to fetch PriceLabs pricing customizations for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_listing_group',
    description: `Get the parent/child relationships for a listing group.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the parent listing whose group to retrieve.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_listing_pricing',
    description: `Return the current min/base/max for a listing on PriceLabs. Returns nulls when the listing has no PriceLabs counterpart yet.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to fetch min/base/max pricing for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_notification_settings',
    description: `Get the acting user's complete notification preferences for the selected account: every scope array, the full category x channel delivery matrix, the AI-employee email cadence, the reminder / needs-attention sub-toggles, the per-guest-channel message matrix, and the read-only escalation reachability cap. The response carries a \`help\` block listing the legal values for every field. Call this before update_notification_settings on any partial change, so you can describe what is changing from what. Requires the \`notifications:read\` scope.`,
    params: [],
  },
  {
    name: 'prohostaimcp_get_owner',
    description: `Get full details for a single owner by ID.`,
    params: [
      {
        name: 'owner_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the owner to retrieve.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_owner_statement',
    description: `Get a single owner statement by ID.`,
    params: [
      {
        name: 'statement_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the owner statement to retrieve.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_owner_statement_expenses',
    description: `Return expense totals for the statement window, broken down per listing.`,
    params: [
      {
        name: 'statement_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the owner statement to retrieve expense totals for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_owner_statement_rental_activity',
    description: `Return rental-activity totals for the statement window: per-reservation and per-listing breakdowns plus aggregate totals.`,
    params: [
      {
        name: 'statement_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the owner statement to retrieve rental-activity totals for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_place',
    description: `Get a single place by ID.`,
    params: [
      {
        name: 'place_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the place to retrieve.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_plaid_connection_status',
    description: `Get the Plaid bank connection(s) (Items) for the current account: institution, status (active / login_required / pending_expiration / pending_disconnect / error / disconnected), last-sync time, and the Plaid error code driving an unhealthy status. Read-only — never returns Plaid access tokens or other credential material.`,
    params: [],
  },
  {
    name: 'prohostaimcp_get_pricelabs_listings_mapping',
    description: `Return the PriceLabs ↔ ProhostAI listing mapping. Each row carries an \`\`eligibility\`\` of \`\`auto_matched\`\` (PMS id match), \`\`needs_attention\`\` (fuzzy name match — host should confirm), or \`\`ineligible_no_pms\`\` (no source_listing_id; can't bind). The PL-only listings (PriceLabs has, ProhostAI doesn't) are returned in \`\`pl_only\`\`. Cached per-account for 60s on the REST side.`,
    params: [],
  },
  {
    name: 'prohostaimcp_get_pricing_neighborhood',
    description: `Return PriceLabs neighborhood pricing data for a listing. PriceLabs's payload is large and not strictly typed — the raw object is returned under \`\`data\`\`.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to fetch neighborhood pricing data for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_pricing_rate_plans',
    description: `Return rate plans configured on PriceLabs for the listing.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to fetch PriceLabs rate plans for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_pricing_recommendations',
    description: `Return PriceLabs recommended prices for a listing. \`\`date_from\`\` and \`\`date_to\`\` are optional ISO dates; omit them to fetch a default forward-looking window from PriceLabs.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to fetch PriceLabs price recommendations for.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `The start of the date window to fetch recommendations for. Omit to use PriceLabs's default forward-looking window.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `The end of the date window to fetch recommendations for. Omit to use PriceLabs's default forward-looking window.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_property_knowledge',
    description: `Get all memories (property knowledge) for a listing, grouped by scope.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to get property knowledge for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_ramp_cards',
    description: `List corporate cards connected via Ramp for the current account. Returns display name, last four, cardholder, and card state. Read-only — never returns Ramp tokens or other credential material.`,
    params: [],
  },
  {
    name: 'prohostaimcp_get_ramp_connection_status',
    description: `Get the Ramp connection(s) for the current account: connected business, status (active / error / disconnected), last-sync time, and — when unhealthy — how long the connection has been in error. Read-only — never returns Ramp tokens or other credential material.`,
    params: [],
  },
  {
    name: 'prohostaimcp_get_reservation',
    description: `Get full details for a single reservation by ID.`,
    params: [
      {
        name: 'reservation_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the reservation to retrieve.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_reservation_custom_fields',
    description: `Return the resolved custom-field values for a reservation, with provenance. Merge order: account → listing tags by specificity → reservation source → reservation. Reservation-level values win on conflict.`,
    params: [
      {
        name: 'reservation_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the reservation to look up.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_get_workflow',
    description: `Get one workflow's full definition (steps + trigger config) plus a summary of its most recent executions.`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the workflow to retrieve.`,
      },
      {
        name: 'recent_executions',
        type: 'integer',
        required: false,
        description: `Number of most recent executions to include in the summary.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_google_places_autocomplete',
    description: `Server-side proxy to Google Places Autocomplete (v1).`,
    params: [
      {
        name: 'q',
        type: 'string',
        required: true,
        description: `The search text to autocomplete (e.g. a partial address or place name).`,
      },
      {
        name: 'near_listing_id',
        type: 'string',
        required: false,
        description: `Optional listing ID to bias autocomplete results toward this place's location.`,
      },
      {
        name: 'session_token',
        type: 'string',
        required: false,
        description: `Optional session token to group this autocomplete request with a subsequent Google Places Details call for billing purposes.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_google_places_details',
    description: `Server-side proxy to Google Places Details (v1). Result is NOT persisted.`,
    params: [
      {
        name: 'google_place_id',
        type: 'string',
        required: true,
        description: `The Google Place ID to fetch details for (returned by google_places_autocomplete).`,
      },
      {
        name: 'session_token',
        type: 'string',
        required: false,
        description: `Optional session token matching the one used in the preceding google_places_autocomplete call, for billing purposes.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_hire_ai_employee',
    description: `Hire (activate) one of the pre-built template AI employees — a launch-lineup template (pre-seeded inert on the account) or a catalog-only template (created and activated on first hire).`,
    params: [
      {
        name: 'template_key',
        type: 'string',
        required: true,
        description: `The key of the template AI employee to hire.`,
      },
      {
        name: 'heartbeat_interval_seconds',
        type: 'string',
        required: false,
        description: `How often, in seconds, the hired employee should run proactive heartbeat checks. Omit or leave null to use the default.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_leave_internal_note',
    description: `Leave a team-only internal note on a conversation. Notes appear in the conversation timeline with an 'Internal note' badge and are NEVER delivered to the guest — this works on any channel (guest OTA/email threads included), unlike send_message. Works on conversations in your account and on connected-teams merged threads in your inbox scope (the note is posted to the connected team's account so its members see it). On a ProhostAI-Support thread a note is SIDE-PRIVATE — it reaches only one side of the support bridge — so a note on another account's support thread is written only for a first-party support credential (posted as the ProhostAI Support voice, support-side); any other credential gets support_note_side_not_supported rather than a note on the wrong side. Supports <@user_id> mentions. severity: 'act' always pushes, 'inform' is an FYI, 'log' (default) notifies nobody.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the conversation to leave the internal note on.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The internal note text to post to the conversation timeline.`,
      },
      {
        name: 'severity',
        type: 'string',
        required: false,
        description: `The urgency of the note: 'act' always pushes a notification, 'inform' is an FYI, 'log' (default) notifies nobody.`,
      },
      {
        name: 'source_name',
        type: 'string',
        required: false,
        description: `Optional label identifying the source or system posting the note, shown alongside the note in the timeline.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_link_ramp_transaction_to_expense',
    description: `Link a Ramp corporate-card transaction to an existing expense for reconciliation. Both the transaction and expense must belong to the caller's account. Idempotent: re-linking the same pair returns the same status.`,
    params: [
      {
        name: 'expense_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the expense to link the transaction to.`,
      },
      {
        name: 'transaction_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Ramp corporate-card transaction to link.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_link_transaction_to_expense',
    description: `Link a bank transaction to an existing expense for reconciliation. Both the transaction and expense must belong to the caller's account. Idempotent: re-linking the same pair returns the same status.`,
    params: [
      {
        name: 'expense_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the expense to link the transaction to.`,
      },
      {
        name: 'transaction_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Plaid bank transaction to link.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_ai_chat_sessions',
    description: `List this credential's Ask AI chat sessions, newest first. Use a returned session id with \`ask_ai_question\` to continue a conversation or \`get_ai_chat_messages\` to read its history. Requires the \`ai_chat:read\` scope.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of chat sessions to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of chat sessions to skip, for pagination.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_ai_employee_triggers',
    description: `List the event triggers wired to an AI employee.`,
    params: [
      {
        name: 'agent_id',
        type: 'string',
        required: true,
        description: `The AI employee's id whose triggers to list.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_ai_employees',
    description: `List the AI employees on the account, with each one's activation state.`,
    params: [],
  },
  {
    name: 'prohostaimcp_list_approval_requests',
    description: `List approval requests on this account, newest first. Filter by \`status\` (pending / approved / rejected / expired) and/or \`source\` (\`external\` = filed by external agents like you, \`ai_agent\` = in-app AI employees, \`autopilot\` = escalated guest-reply drafts). Defaults to the 20 most recent across all statuses.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of approval requests to return.`,
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: `Filter by source: external (filed by external agents like you), ai_agent (in-app AI employees), or autopilot (escalated guest-reply drafts). Omit for all sources.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by status: pending, approved, rejected, or expired. Omit for all statuses.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_cleaning_attachments',
    description: `List uploaded attachments on a cleaning.`,
    params: [
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning to list attachments for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_cleaning_checklists',
    description: `List all checklists on a cleaning, with their items.`,
    params: [
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning job whose checklists you want to list.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_conversation_message_variables',
    description: `List valid placeholders for conversation scheduled messages and message templates. Use placeholders with single curly braces, for example {guest_first_name}. Pass \`\`listing_id\`\` to also receive per-device smart-door-code tokens (\`\`{smart_door_code:<slug>}\`\`) for that listing's assigned smart locks.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `Restrict the returned placeholder list to a specific listing, to also include that listing's per-device smart-door-code placeholders (e.g. {smart_door_code:<slug>}). Omit to list only the generic account-wide placeholders.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_expense_categories',
    description: `List expense categories for the account. System categories are created lazily on first read.`,
    params: [],
  },
  {
    name: 'prohostaimcp_list_guidebook_pins',
    description: `List pins for a guidebook plus tag-scoped pins inherited via the guidebook's listing tags.`,
    params: [
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook to list pins for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_guidebook_sections',
    description: `List the guidebook-scoped sections of a guidebook.`,
    params: [
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook whose sections to list.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_listing_photos',
    description: `List the photos attached to a listing, ordered by the \`\`order\`\` field.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing whose photos should be listed.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_listing_tags',
    description: `List all listing tags on the account, optionally filtered by tag_type. Each tag carries \`listing_count\` (how many listings it is assigned to) and \`system_key\` (non-null for backend-managed tags such as 'All Listings', which cannot be renamed, deleted, or unassigned).`,
    params: [
      {
        name: 'tag_type',
        type: 'string',
        required: false,
        description: `Optional tag type to filter the returned tags by.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_listings',
    description: `List all listings (properties) for the account.`,
    params: [],
  },
  {
    name: 'prohostaimcp_list_message_templates',
    description: `List all message templates on the account.`,
    params: [],
  },
  {
    name: 'prohostaimcp_list_owner_statements',
    description: `List owner statements for the account, optionally filtered by status, owner, or title search.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of statements to return.`,
      },
      {
        name: 'owner_id',
        type: 'string',
        required: false,
        description: `Filter statements by owner ID.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search statements by title text.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter statements by status (e.g. draft, sent, paid).`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_place_tags',
    description: `List the listing tags attached to a place.`,
    params: [
      {
        name: 'place_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the place whose tag associations to list.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_places',
    description: `List the account's places with optional filters (tag, category, text search).`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Filter results to places in this category.`,
      },
      {
        name: 'has_google_id',
        type: 'string',
        required: false,
        description: `Filter to places that do (true) or do not (false) have an associated Google Place ID.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of places to return.`,
      },
      {
        name: 'listing_tag_id',
        type: 'string',
        required: false,
        description: `Filter results to places tagged with this listing tag ID.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of places to skip before starting to return results, for pagination.`,
      },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Free-text search query to filter places by name or other text fields.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_pricing_overrides',
    description: `List date-specific price overrides currently set on PriceLabs for the listing.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to list price overrides for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_saved_replies',
    description: `List all saved replies on the account.`,
    params: [],
  },
  {
    name: 'prohostaimcp_list_scheduled_messages',
    description: `List scheduled messages on a conversation, optionally filtered by status.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The conversation to list scheduled messages for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of scheduled messages to return.`,
      },
      { name: 'status', type: 'string', required: false, description: `Optional status filter.` },
    ],
  },
  {
    name: 'prohostaimcp_list_skills',
    description: `List the account's skill library (host playbooks): named, reusable procedure packs the AI follows for specific situations (e.g. early check-in requests). Returns routing metadata per skill — key, name, when-to-use description, category, enabled state, and whether it is a built-in or customized — WITHOUT bodies. Use load_skill to read one skill's full instructions.`,
    params: [],
  },
  {
    name: 'prohostaimcp_list_suggestions',
    description: `List AI suggestions / drafts for a conversation, newest first.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the conversation to list AI suggestions for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of suggestions to return.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_task_checklists',
    description: `List all checklists on a task.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task whose checklists to list.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_upgrade_options',
    description: `List the upgrade options attached to a guidebook.`,
    params: [
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook whose upgrade options should be listed.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_list_webhook_subscriptions',
    description: `List active webhook subscriptions for the account.`,
    params: [],
  },
  {
    name: 'prohostaimcp_list_workflows',
    description: `List automation workflows on the account. Optionally filter by status ('active' or 'paused'). Returns each workflow's trigger, schedule, and run stats.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of workflows to return.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter workflows by status. One of 'active' or 'paused'.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_load_skill',
    description: `Load one skill (host playbook) by key and return its full body — the host's standing instructions for that situation. Follow the returned guidance when handling matching work; it cannot grant new permissions or bypass approvals. Get keys from list_skills.`,
    params: [
      { name: 'key', type: 'string', required: true, description: `The skill key to load.` },
    ],
  },
  {
    name: 'prohostaimcp_mark_conversation_read',
    description: `Mark a conversation's messages as read for the API user. If \`\`message_ids\`\` is omitted, all unread messages NOT sent by the user are marked. Works on conversations in your account and on connected-teams merged threads in your inbox scope — ProhostAI-Support threads you participate in included (read state is per-user, so this only affects your own unread badge).`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The conversation to mark as read.`,
      },
      {
        name: 'message_ids',
        type: 'string',
        required: false,
        description: `Specific message IDs to mark as read.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_message_ai_employee',
    description: `Send a message to one of the account's AI employees in your 1:1 DM thread and dispatch them to work on it. \`agent\` is the employee's id or handle (list them with the AI-employee tools). The reply is ASYNCHRONOUS — the employee posts it back into the same DM, typically within seconds to a few minutes; poll \`get_ai_employee_replies\` (pass the returned \`sent_at\` as \`since\`) or subscribe to the \`message.team_chat\` webhook event. \`run_id\` is null when a dispatch guard (credit budget, billing gate, agent-chain depth, in-flight dedup) suppressed the run — the message still lands in the thread. Requires the \`agents:converse\` scope.`,
    params: [
      {
        name: 'agent',
        type: 'string',
        required: true,
        description: `The AI employee's id or handle to message.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The message text to send to the AI employee in your 1:1 DM thread.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_move_pin_scope',
    description: `Move a pin between guidebook scope and tag scope. Exactly one target must be set.`,
    params: [
      {
        name: 'pin_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the pin to move.`,
      },
      {
        name: 'target_guidebook_id',
        type: 'string',
        required: false,
        description: `The guidebook to move the pin into (guidebook-scoped). Exactly one of target_guidebook_id or target_listing_tag_id must be set.`,
      },
      {
        name: 'target_listing_tag_id',
        type: 'string',
        required: false,
        description: `The listing tag to move the pin into (tag-scoped). Exactly one of target_guidebook_id or target_listing_tag_id must be set.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_move_section_scope',
    description: `Move a section between guidebook-scoped and tag-scoped storage. XOR target.`,
    params: [
      {
        name: 'section_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the section to move.`,
      },
      {
        name: 'target_guidebook_id',
        type: 'string',
        required: false,
        description: `The guidebook to move the section into. Provide exactly one of target_guidebook_id or target_listing_tag_id.`,
      },
      {
        name: 'target_listing_tag_id',
        type: 'string',
        required: false,
        description: `The listing tag to move the section into. Provide exactly one of target_guidebook_id or target_listing_tag_id.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_pause_ai',
    description: `Pause AI replies on a conversation (mutes the AI for non-@mentions).`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the conversation to pause AI replies on.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_pin_place_to_guidebook',
    description: `Pin a place to a guidebook (guidebook-scoped pin).`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: true,
        description: `The category to file this pin under (e.g. restaurants, activities).`,
      },
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook to pin the place to.`,
      },
      {
        name: 'place_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the place to pin.`,
      },
      {
        name: 'host_note_override',
        type: 'string',
        required: false,
        description: `Optional host note that overrides the place's default note for this pin.`,
      },
      {
        name: 'position',
        type: 'string',
        required: false,
        description: `Optional sort position for the pin within its category. Leave unset to append at the end.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_pin_place_to_tag',
    description: `Pin a place to a listing tag (tag-scoped pin). Account-wide mutation.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: true,
        description: `The category to file this pin under (e.g. restaurants, activities).`,
      },
      {
        name: 'listing_tag_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing tag to pin the place to.`,
      },
      {
        name: 'place_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the place to pin.`,
      },
      {
        name: 'host_note_override',
        type: 'string',
        required: false,
        description: `Optional host note that overrides the place's default note for this pin.`,
      },
      {
        name: 'position',
        type: 'string',
        required: false,
        description: `Optional sort position for the pin within its category. Leave unset to append at the end.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_publish_review_reply',
    description: `Publish a previously-generated AI-authored review reply (an 'auto-review') to the upstream OTA. \`review_id\` is the auto-review's UUID — not a guest review ID. The auto-review must be in \`scheduled\` state; a review without a pre-generated auto-review row cannot be published here.`,
    params: [
      {
        name: 'review_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the auto-review (AI-generated draft reply) to publish. This is the auto-review's UUID, not a guest review ID.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_publish_suggestion',
    description: `Send the suggestion text (or its edited override) as a host message on the conversation. Subject to the same channel/tier paywall as \`send_message\`.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the conversation the suggestion belongs to.`,
      },
      {
        name: 'suggestion_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the AI suggestion draft to publish as a message.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_reject_approval_request',
    description: `Reject a pending approval request that an external agent filed, on behalf of the account owner/admin you are authenticated as. \`rejection_reason\` is required and is delivered to the filing agent on the \`agent.approval_resolved\` webhook — say what would need to change. Same eligibility rules as \`approve_approval_request\`: \`source: external\` only, and the \`approvals:decide\` scope, which an AI-employee credential can never hold.`,
    params: [
      {
        name: 'approval_id',
        type: 'string',
        required: true,
        description: `The id of the approval request to reject.`,
      },
      {
        name: 'rejection_reason',
        type: 'string',
        required: true,
        description: `The reason for rejecting this request; delivered to the filing agent on the agent.approval_resolved webhook.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_remove_place_tag',
    description: `Detach a listing tag from a place.`,
    params: [
      {
        name: 'listing_tag_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing tag to detach from the place.`,
      },
      {
        name: 'place_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the place to detach the tag from.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_reorder_guidebook_pins',
    description: `Bulk-update positions of guidebook-scoped pins. \`pins\` is a list of {id, position}.`,
    params: [
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook whose pins will be reordered.`,
      },
      {
        name: 'pins',
        type: 'array',
        required: true,
        description: `List of {id, position} objects specifying the new position for each pin.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_reorder_guidebook_sections',
    description: `Bulk-reorder guidebook-scoped sections. \`sections\` is a list of {id, position, parent_id}.`,
    params: [
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook whose sections to reorder.`,
      },
      {
        name: 'sections',
        type: 'array',
        required: true,
        description: `A list of {id, position, parent_id} objects specifying the new order and nesting of sections.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_reorder_tag_pins',
    description: `Bulk-update positions of tag-scoped pins. \`pins\` is a list of {id, position}.`,
    params: [
      {
        name: 'listing_tag_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing tag whose pins will be reordered.`,
      },
      {
        name: 'pins',
        type: 'array',
        required: true,
        description: `List of {id, position} objects specifying the new position for each pin.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_reorder_tag_sections',
    description: `Bulk-reorder tag-scoped sections.`,
    params: [
      {
        name: 'listing_tag_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing tag whose sections should be reordered.`,
      },
      {
        name: 'sections',
        type: 'array',
        required: true,
        description: `The full list of sections in their new order, each as an object (e.g. containing id and position).`,
      },
    ],
  },
  {
    name: 'prohostaimcp_reorder_task_checklists',
    description: `Reorder checklists on a task.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `Array of objects specifying the new order of checklists, e.g. {checklist_id, order} pairs.`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task whose checklists to reorder.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_report_cleaning_issue',
    description: `Report a new issue on a cleaning.`,
    params: [
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning to report an issue on.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the issue.` },
    ],
  },
  {
    name: 'prohostaimcp_resolve_cleaning_issue',
    description: `Delete (resolve) a cleaning issue.`,
    params: [
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning the issue belongs to.`,
      },
      {
        name: 'issue_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the issue to resolve.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_resume_ai',
    description: `Resume AI replies on a conversation that was previously paused.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the conversation to resume AI replies on.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_revise_suggestion',
    description: `Stage a host instruction on an AI suggestion so the next agent run can pick it up.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the conversation the suggestion belongs to.`,
      },
      {
        name: 'instruction',
        type: 'string',
        required: true,
        description: `The instruction to stage on the AI suggestion for the next agent run to apply.`,
      },
      {
        name: 'suggestion_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the AI suggestion to stage a revision instruction on.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_run_workflow',
    description: `Manually trigger a workflow run now. The workflow must be enabled and have steps. Pass reservation_id for reservation-scoped workflows.`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the workflow to run now.`,
      },
      {
        name: 'reservation_id',
        type: 'string',
        required: false,
        description: `The reservation to scope this run to, for reservation-scoped workflows.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_schedule_message',
    description: `Schedule a host message to be sent at a future time. Arguments: \`\`conversation_id\`\`, \`\`reservation_id\`\`, \`\`listing_id\`\`, \`\`message\`\`, \`\`scheduled_at\`\` (ISO 8601, must be in the future), and optional \`\`channel\`\`. The scheduled message is tagged \`\`source=mcp\`\` so downstream analytics and the send pipeline can distinguish MCP-origin sends. Channel rules — internal: all tiers; OTA: Pro only; the host's own SMS/WhatsApp/Gmail conversations CAN be scheduled on, with the same credential the live send requires (an OAuth credential whose user has inbox write, or an API key granted the conversations:write_guest_external scope). Pass \`\`channel\`\` (one of whatsapp, sms, email, ota) to pin the delivery channel — on an OTA thread these select that OTA's sub-channels, and on the host's own threads they select ProhostAI's own senders. The send falls back to the conversation's default routing if the channel cannot carry the message at send time. Omit it for default routing. Only conversations in your own account are supported — a connected-teams merged thread returns cross_account_not_supported (switch into that team's workspace to schedule). Idempotent on MCP request id — a retried call returns the cached response.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The conversation to schedule the message in.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The listing the scheduled message relates to.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The message body to send at the scheduled time.`,
      },
      {
        name: 'reservation_id',
        type: 'string',
        required: true,
        description: `The reservation the scheduled message relates to.`,
      },
      {
        name: 'scheduled_at',
        type: 'string',
        required: true,
        description: `ISO 8601 timestamp when the message should be sent (must be in the future).`,
      },
      {
        name: 'channel',
        type: 'string',
        required: false,
        description: `Optional delivery channel to pin the send to.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_search_bank_transactions',
    description: `Search bank/credit-card transactions from Plaid-connected accounts. Filter by date range, amount range, merchant substring, Plaid account, pending state, personal-finance category, or reconciliation state. Returns up to 200 rows, newest first. Read-only.`,
    params: [
      {
        name: 'amount_max',
        type: 'string',
        required: false,
        description: `Only include transactions with an amount less than or equal to this value.`,
      },
      {
        name: 'amount_min',
        type: 'string',
        required: false,
        description: `Only include transactions with an amount greater than or equal to this value.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Only include transactions on or after this date (ISO-8601).`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Only include transactions on or before this date (ISO-8601).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of transactions to return (up to 200).`,
      },
      {
        name: 'merchant',
        type: 'string',
        required: false,
        description: `Filter by a substring match against the merchant name.`,
      },
      {
        name: 'pending',
        type: 'string',
        required: false,
        description: `Filter to pending or posted transactions only.`,
      },
      {
        name: 'pfc_primary',
        type: 'string',
        required: false,
        description: `Filter by Plaid personal-finance-category primary label.`,
      },
      {
        name: 'plaid_account_id',
        type: 'string',
        required: false,
        description: `Filter to transactions from a specific Plaid-connected bank account.`,
      },
      {
        name: 'reconciled',
        type: 'string',
        required: false,
        description: `Filter to reconciled or unreconciled transactions only.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_search_cleanings',
    description: `Search cleanings. Filter by listing, reservation, status, or scheduled-date range (ISO dates). Pass reservation_id to find the turnover cleaning for a specific stay (e.g. to attribute a review to the assigned cleaner). Each result lists all cleaners in \`assignees\`; the singular \`assignee_id\`/\`assignee_name\` are set only when there is exactly one. \`cost\` is the cleaning's own cost figure. \`payment_summary\` carries the cleaner-payment lifecycle the app's Payments Log shows — \`total_amount\`, \`overall_status\`, and a per-payee list with \`amount\`, \`net_amount\`, \`status\` and \`paid_at\` — so cleaner spend can be reconciled without a manual export. It is null when the cleaning has no payment record.`,
    params: [
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Only include cleanings scheduled on or after this date.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Only include cleanings scheduled on or before this date.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of cleanings to return.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `Filter cleanings to only this listing.`,
      },
      {
        name: 'reservation_id',
        type: 'string',
        required: false,
        description: `Filter cleanings to the turnover cleaning for this reservation.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter cleanings by their current status.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_search_contacts',
    description: `Search contacts by name, email, company, or role. Returns compact contact summaries.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of contacts to return.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Free-text search across name, email, company, or role.`,
      },
      { name: 'role', type: 'string', required: false, description: `Filter contacts by role.` },
    ],
  },
  {
    name: 'prohostaimcp_search_conversations',
    description: `Search conversations with optional inbox-status filters. Each filter is an INDEPENDENT, composable predicate — none of them implies any of the others. Base filters: query (name/guest/message text), listing_id, channel (single) or channels (list, OR logic — takes precedence over channel when both are given; the 'Calls' tab is channels=['voice','sms']). Status filters (each optional, omit to leave unfiltered): needs_response, needs_follow_up, is_starred, is_done (bool equality on the thread flag); follow_up (True = needs_follow_up OR is_starred; False = neither); snoozed (True = currently snoozed, i.e. snoozed_until in the future; False = not currently snoozed); business_purpose (equality, e.g. 'support_messaging_thread' for the Airbnb Support tab). When no status filter is passed the result set is unchanged from the base search (done and snoozed threads are still returned). To reproduce a web inbox tab exactly, COMBINE filters: the 'Follow Up' tab is follow_up=True + is_done=False + snoozed=False (the 'Respond' tab is needs_response=True + is_done=False + snoozed=False); passing follow_up=True alone still returns done or currently snoozed starred/follow-up threads. This mirrors the honest get_dashboard_summary counts, which apply is_done=False + not-snoozed + non-internal internally. Internal team-chat threads track needs_response / needs_follow_up / is_done per-user on ConversationUserMetadata, leaving the thread-level flags false for them. needs_response, needs_follow_up, and follow_up are all channel-aware: they resolve internal threads against THIS credential's own per-user flag (the same rows the app inbox and bulk_update_conversations write), so needs_response=true now matches internal threads flagged for this user just as it matches guest / OTA / account-wide threads on the thread-level column. The needs_response and needs_follow_up fields on a returned internal thread report that per-user value. (is_done is not yet channel-aware here — it still matches only the thread-level flag, which stays false for internal threads.) Pagination: results are capped at 50 per call (sorted by updated_at descending). To enumerate beyond the cap, pass cursor='' (empty string) to start cursor pagination — the response becomes an envelope {items, limit, has_more, next_cursor}; pass the returned next_cursor back to fetch the next page (next_cursor is null on the last page). Cursors are opaque; treat them as such. Threads that receive new activity mid-pagination jump to the top of the sort and may be missed by later pages — re-run from cursor='' for a fresh snapshot. include_total=true adds a 'total' count of ALL threads matching the filters (and switches a cursor-less response to the same envelope shape). Without cursor or include_total the response stays a bare JSON list (backwards compatible). Connected-teams merged visibility: when this credential resolves to a user (OAuth resource owner or the key's created_by) and is not listing-scoped, results fold in the user's participant threads from connected host accounts, minus agent-operational purposes (agent DMs, agent approvals, autopilot clarifications). ProhostAI-Support threads in connected hosts ARE merged, with the support-privacy stack applied: for a customer-side caller each support-employee identity is collapsed to the single branded 'ProhostAI Support' identity (no employee name/email in the participants array), and a support thread's opposite-side internal notes are never searchable. A caller who is themselves on the support team sees real identities (staff keep each other's). A user-less API key (or a listing-scoped key) keeps single-account scope with no fan-out. Every returned item carries account_id (the source/home account of the thread) and account_name so a merged page can be attributed per account. The business_purpose filter is plain equality for every value EXCEPT 'prohost_support', which uses DERIVED membership (stamped business_purpose='prohost_support' OR a seam-routed support conversation that carries a NULL business_purpose column) so canonical seam-routed support threads are matched just as the web ProhostAI-Support tab matches them. Caveat on merged internal threads: like the caller's own internal threads, is_done on a merged team-chat thread is per-user (on ConversationUserMetadata) and the thread-level is_done column stays false, so an is_done filter and the serialized is_done still reflect the thread-level column only — a thread done for this user alone reads as is_done=false here (the honest get_dashboard_summary count excludes it). Merged threads (including support threads) are openable via get_conversation_messages, which applies the same per-side note filtering and identity masking.`,
    params: [
      {
        name: 'business_purpose',
        type: 'string',
        required: false,
        description: `Filter by exact business purpose.`,
      },
      {
        name: 'channel',
        type: 'string',
        required: false,
        description: `Filter by a single channel.`,
      },
      {
        name: 'channels',
        type: 'string',
        required: false,
        description: `Filter by multiple channels using OR logic; takes precedence over channel when both are given.`,
      },
      { name: 'cursor', type: 'string', required: false, description: `Opaque pagination cursor.` },
      {
        name: 'follow_up',
        type: 'string',
        required: false,
        description: `Combined follow-up filter: needs_follow_up OR is_starred.`,
      },
      {
        name: 'include_total',
        type: 'boolean',
        required: false,
        description: `Include a total count of all matching threads.`,
      },
      {
        name: 'is_done',
        type: 'string',
        required: false,
        description: `Filter on the thread's done flag.`,
      },
      {
        name: 'is_starred',
        type: 'string',
        required: false,
        description: `Filter to starred threads.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of conversations to return per page.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `Filter to conversations for a specific listing.`,
      },
      {
        name: 'needs_follow_up',
        type: 'string',
        required: false,
        description: `Filter to threads flagged as needing follow-up.`,
      },
      {
        name: 'needs_response',
        type: 'string',
        required: false,
        description: `Filter to threads that need a response.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Free-text search matched against conversation/guest name and message text.`,
      },
      {
        name: 'snoozed',
        type: 'string',
        required: false,
        description: `Filter by current snooze state.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_search_expenses',
    description: `Search expenses. Filter by listing, category, or date range.`,
    params: [
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Only include expenses on or after this date (ISO-8601).`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Only include expenses on or before this date (ISO-8601).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of expenses to return.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `Filter to expenses for a specific listing.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_search_guests',
    description: `Search and filter guests by name, email, or listing. Returns compact guest summaries.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of guests to return.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `Filter guests to those associated with this listing.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Free-text search across guest name and email.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_search_memories',
    description: `Search the property knowledge base. Returns up to \`limit\` memories matching the optional natural-language \`query\` and \`scope\` / \`listing_id\` filters.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of memories to return.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `Optional listing ID filter; restricts results to memories scoped to this listing.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Optional natural-language search query to match against memory content.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Optional scope filter, e.g. listing, all_listings, or listing_group.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_search_owners',
    description: `Search owners/investors. Returns owner details, commission info, and assigned listing_ids.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of owners to return.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter owners by name, email, or company.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_search_ramp_transactions',
    description: `Search corporate-card transactions from Ramp-connected accounts. Filter by date range, amount range, merchant substring, Ramp card, cardholder name, clearing state, or reconciliation state. Returns up to 200 rows, newest first. Read-only.`,
    params: [
      {
        name: 'amount_max',
        type: 'string',
        required: false,
        description: `Only include transactions with an amount less than or equal to this value. Defaults to null (no upper bound).`,
      },
      {
        name: 'amount_min',
        type: 'string',
        required: false,
        description: `Only include transactions with an amount greater than or equal to this value. Defaults to null (no lower bound).`,
      },
      {
        name: 'card_id',
        type: 'string',
        required: false,
        description: `Only include transactions on this Ramp card. Defaults to null (no filter).`,
      },
      {
        name: 'cardholder',
        type: 'string',
        required: false,
        description: `Only include transactions by this cardholder name. Defaults to null (no filter).`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Only include transactions on or after this date. Defaults to null (no lower bound).`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Only include transactions on or before this date. Defaults to null (no upper bound).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of transactions to return, up to 200.`,
      },
      {
        name: 'merchant',
        type: 'string',
        required: false,
        description: `Substring to match against the merchant name. Defaults to null (no filter).`,
      },
      {
        name: 'reconciled',
        type: 'string',
        required: false,
        description: `Only include transactions with this reconciliation state. Defaults to null (no filter).`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Only include transactions in this clearing state. Defaults to null (no filter).`,
      },
    ],
  },
  {
    name: 'prohostaimcp_search_reservations',
    description: `Search and filter reservations. Returns compact reservation summaries.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Only include reservations on or before this date.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of reservation summaries to return.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `Restrict results to reservations for this listing.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Free-text search across reservation fields such as guest name, email, or confirmation code.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Only include reservations on or after this date.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter reservations by their current status.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_search_reviews',
    description: `Search guest reviews. Filter by listing or star rating.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of reviews to return.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `Filter reviews to only this listing.`,
      },
      {
        name: 'min_stars',
        type: 'string',
        required: false,
        description: `Only return reviews with at least this star rating.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_search_tasks',
    description: `Search tasks. Filter by status, priority, or listing.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Filter tasks by category.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of tasks to return.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `Filter tasks to a specific listing.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Filter tasks by priority level.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter tasks by their current status.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_send_message',
    description: `Send a message in a conversation through the real delivery pipeline. Works on conversations in your account and on connected-teams merged threads in your inbox scope — internal team chat AND guest channels — whenever you are a participant of the thread via an active team connection. On a merged thread the gates evaluate against the account that OWNS the thread, not yours: the OTA Pro gate reads the host's tier (a non-Pro host returns that host's upgrade_required), the message persists in the host's account attributed to you, and an approval routes to the host's team. The host's own SMS/WhatsApp/Gmail senders stay reachable only with the conversations:write_guest_external scope when the thread is not yours. A ProhostAI-Support thread you participate in is sendable as the internal support bridge, and your reply carries the branded 'ProhostAI Support' identity for the customer side, never your name; a support thread replying on a guest channel returns cross_account_not_supported. Tier gates — internal channel: all tiers; OTA channel: Pro only. The host's own SMS/WhatsApp/Gmail channels are sendable (no tier gate) when you authenticate with OAuth as a user holding inbox write access, or with an API key granted the conversations:write_guest_external scope; otherwise they return channel_not_api_sendable. Returns the persisted message id plus the final send status ('sent' if delivery completed synchronously, 'pending' if queued). On the internal team-chat channel this also wakes the AI employees the message addressed, exactly as an in-app send does: a 1:1 thread with an employee always wakes that employee, and <@user_id> mentions wake each mentioned employee in any internal thread. \`\`run_id\`\` is the dispatched run (\`\`run_ids\`\` lists them all when a mention fan-out woke several), and is null when nobody was addressed or a dispatch guard (credit budget, billing gate, agent-chain depth, in-flight dedup) suppressed the run — the message is still delivered either way. The employee's reply arrives asynchronously in the same thread; poll get_conversation_messages for it. An un-mentioned employee in a GROUP thread is not woken from this surface. \`\`dispatch_error\`\` appears only if the enqueue itself failed, in which case send a fresh message rather than retrying this one.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The conversation to send the message in.`,
      },
      { name: 'message', type: 'string', required: true, description: `The message body to send.` },
    ],
  },
  {
    name: 'prohostaimcp_set_contact_custom_fields',
    description: `Merge \`fields\` into \`custom_fields\` on every contact in \`contact_ids\`.`,
    params: [
      {
        name: 'contact_ids',
        type: 'array',
        required: true,
        description: `The contact IDs to update.`,
      },
      {
        name: 'fields',
        type: 'object',
        required: true,
        description: `Key/value custom fields to merge into each contact's custom_fields.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_set_guest_custom_fields',
    description: `Merge \`fields\` into \`custom_fields\` on every guest in \`guest_ids\`.`,
    params: [
      {
        name: 'fields',
        type: 'object',
        required: true,
        description: `Key/value custom fields to merge into each guest's custom_fields.`,
      },
      { name: 'guest_ids', type: 'array', required: true, description: `The guest IDs to update.` },
    ],
  },
  {
    name: 'prohostaimcp_set_listing_custom_fields',
    description: `Batch-set custom fields on listings, a tag, or the account. \`\`scope\`\` selects the layer; \`\`mode='merge'\`\` keeps existing keys, \`\`mode='replace'\`\` overwrites the dict. \`\`targets\`\` supports \`\`listing_ids\`\`, \`\`tag_ids\`\` (for scope=tag), or \`\`target_tag_id\`\` / \`\`target_tag_name\`\` / \`\`all_listings\`\` (for scope=listing).`,
    params: [
      {
        name: 'fields',
        type: 'object',
        required: true,
        description: `The custom field key/value pairs to set.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The layer to set custom fields on: account, tag, or listing.`,
      },
      {
        name: 'dry_run',
        type: 'boolean',
        required: false,
        description: `If true, preview the change without applying it.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Whether to merge new fields with existing ones or replace the dict entirely.`,
      },
      {
        name: 'targets',
        type: 'string',
        required: false,
        description: `The targets to apply the fields to. Supports listing_ids, tag_ids (for scope=tag), or target_tag_id / target_tag_name / all_listings (for scope=listing).`,
      },
    ],
  },
  {
    name: 'prohostaimcp_set_listing_group_children',
    description: `Replace the child-listings list for a parent listing (a 'listing group'). Cycles, self-references, and listings already in another group are rejected.`,
    params: [
      {
        name: 'child_listing_ids',
        type: 'array',
        required: true,
        description: `The full list of child listing IDs to assign to this group.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the parent listing.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_set_listing_host_role',
    description: `Set the host role (owner / cohost) for a Hospitable-connected listing. Use \`apply_to_all=true\` to fan out to every sibling listing on the same connection.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to set the host role on.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the user to assign as owner or cohost.`,
      },
      {
        name: 'apply_to_all',
        type: 'boolean',
        required: false,
        description: `If true, apply the host role change to every sibling listing on the same connection.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_set_mystay_section_order',
    description: `Set the order of sections shown on the My Stay tab of the guidebook.`,
    params: [
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook whose My Stay tab order should be set.`,
      },
      {
        name: 'section_ids',
        type: 'array',
        required: true,
        description: `The full ordered list of section IDs to display on the My Stay tab.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_set_reservation_custom_fields',
    description: `Merge \`fields\` into \`custom_fields\` on every reservation in \`reservation_ids\`. Existing keys are overwritten; keys absent from \`fields\` are preserved.`,
    params: [
      {
        name: 'fields',
        type: 'object',
        required: true,
        description: `The key/value pairs to merge into each reservation's custom_fields. Existing keys are overwritten; keys not present here are preserved.`,
      },
      {
        name: 'reservation_ids',
        type: 'array',
        required: true,
        description: `The reservation IDs to update.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_sheets_delete_row',
    description: `Delete a row from a sheet by row id.`,
    params: [
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique ID of the sheet containing the row.`,
      },
      {
        name: 'row_id',
        type: 'string',
        required: true,
        description: `The unique ID of the row to delete.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_sheets_get',
    description: `Fetch sheet metadata (row_count, schema) by path or id.`,
    params: [
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique ID of the sheet to fetch metadata for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_sheets_insert_rows',
    description: `Bulk-insert rows into a sheet.`,
    params: [
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique ID of the sheet to insert rows into.`,
      },
      {
        name: 'rows',
        type: 'array',
        required: true,
        description: `Array of row objects to insert, each a {column_id: value} map.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_sheets_list',
    description: `List sheets in the account.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of sheets to return.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_sheets_query',
    description: `Filter rows via a simple {column_id: value} equality DSL (like read_rows without sort).`,
    params: [
      {
        name: 'filter',
        type: 'object',
        required: true,
        description: `Equality filter as a {column_id: value} map. Only rows matching all key/value pairs are returned.`,
      },
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique ID of the sheet to query.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_sheets_read_rows',
    description: `Read rows from a sheet. \`filter\` is a {column_id: value} equality map; \`sort\` is a column_id prefixed with '-' for descending.`,
    params: [
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique ID of the sheet to read rows from.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Equality filter as a {column_id: value} map. Only rows matching all key/value pairs are returned.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Column ID to sort by. Prefix with '-' for descending order.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_sheets_schema',
    description: `Fetch a sheet's column schema by path or id.`,
    params: [
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique ID of the sheet to fetch the column schema for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_sheets_update_row',
    description: `Partial-patch a row in a sheet by row id.`,
    params: [
      {
        name: 'patch',
        type: 'object',
        required: true,
        description: `A {column_id: value} map of fields to update on the row. Unspecified columns are left unchanged.`,
      },
      {
        name: 'path_or_id',
        type: 'string',
        required: true,
        description: `The path or unique ID of the sheet containing the row.`,
      },
      {
        name: 'row_id',
        type: 'string',
        required: true,
        description: `The unique ID of the row to update.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_submit_feedback',
    description: `Submit a bug report, feature request, or question to the ProhostAI team. Valid types: bug_report, feature_request, question.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `A detailed description of the bug, feature request, or question.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `A short summary title for the feedback.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of feedback being submitted. One of: bug_report, feature_request, question.`,
      },
      {
        name: 'attachments',
        type: 'string',
        required: false,
        description: `Optional list of attachments (e.g. screenshots or log excerpts) to include with the feedback.`,
      },
      {
        name: 'steps_to_reproduce',
        type: 'string',
        required: false,
        description: `Step-by-step instructions to reproduce the issue, if reporting a bug.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_toggle_reaction',
    description: `Add or remove the API user's reaction with this emoji on a message. Reactions are per-emoji: the same emoji again removes it, a different emoji is added alongside.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The conversation the message belongs to.`,
      },
      { name: 'emoji', type: 'string', required: true, description: `The emoji to toggle.` },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The message to react to.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_toggle_workflow',
    description: `Enable (resume) or disable (pause) a workflow.`,
    params: [
      {
        name: 'enabled',
        type: 'boolean',
        required: true,
        description: `Set to true to enable (resume) the workflow, or false to disable (pause) it.`,
      },
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the workflow to enable or disable.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_translate_task_checklist',
    description: `Translate a task checklist to a target language.`,
    params: [
      {
        name: 'checklist_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist within the task to translate.`,
      },
      {
        name: 'target_language',
        type: 'string',
        required: true,
        description: `The target language to translate the checklist into.`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task whose checklist should be translated.`,
      },
      {
        name: 'force',
        type: 'boolean',
        required: false,
        description: `Whether to force re-translation even if a translation to the target language already exists.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_unblock_dates',
    description: `Unblock (mark available) a list of dates on a listing's calendar. Sugar over \`update_calendar_days\` with \`available=true\` — dispatched asynchronously via the listing's OTA.`,
    params: [
      {
        name: 'dates',
        type: 'array',
        required: true,
        description: `The dates to unblock on the listing's calendar.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to unblock dates on.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_ai_employee_trigger',
    description: `Update an AI employee's event trigger. Only the provided fields are written. 'description' is what the trigger is for — it is injected into the prompt of every run the trigger fires, so on a 'schedule' trigger it is the routine's instructions.`,
    params: [
      {
        name: 'trigger_id',
        type: 'string',
        required: true,
        description: `The id of the trigger to update.`,
      },
      {
        name: 'cooldown_seconds',
        type: 'string',
        required: false,
        description: `New minimum number of seconds between successive firings of this trigger. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description of what the trigger is for. This text is injected into the prompt of every run the trigger fires, so on a 'schedule' trigger it is the routine's instructions. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'enabled',
        type: 'string',
        required: false,
        description: `Whether the trigger is active. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New display name for the trigger. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'trigger_type',
        type: 'string',
        required: false,
        description: `New type of event that fires this trigger. Omit or leave null to leave unchanged.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_autopilot_schedule',
    description: `Replace the account's autopilot schedule windows. This is a FULL replace — send the complete set of windows you want (read them first with get_autopilot_schedule). Each window is {day_of_week (monday..sunday), start_at (HH:MM), end_at (HH:MM), enabled?}. A window whose start_at is after its end_at wraps past midnight. Optionally also set schedule_enabled and schedule_timezone. Windows must be non-empty; to turn scheduling off, set schedule_enabled=false (via this tool or update_autopilot_settings) instead of clearing windows.`,
    params: [
      {
        name: 'windows',
        type: 'array',
        required: true,
        description: `Complete list of schedule windows to set (this is a full replace). Each item is {day_of_week (monday..sunday), start_at (HH:MM), end_at (HH:MM), enabled?}. Must be non-empty.`,
      },
      {
        name: 'schedule_enabled',
        type: 'string',
        required: false,
        description: `Whether to also enable/disable enforcement of the schedule windows.`,
      },
      {
        name: 'schedule_timezone',
        type: 'string',
        required: false,
        description: `Optionally also set the IANA timezone used to interpret the schedule windows.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_autopilot_settings',
    description: `Partially update the account's autopilot configuration. Only the fields you pass change (read-modify-write). Thresholds are clamped to allowed values (confidence: 80/90/95/99; sentiment: 0/30/40/50). unsure_behavior controls what Autopilot does when it is unsure and drafts an informational deferral: 'reply_and_follow_up' (auto-send, default) or 'hold_for_host' (hold the reply and escalate to the host); an unknown value is rejected. category_rules is a list of {category, enabled?, custom_instructions?}; channel_rules a list of {channel, enabled}; booking_channel_rules a list of {channel_id, enabled}. Unknown categories or channels are rejected.`,
    params: [
      {
        name: 'booking_channel_rules',
        type: 'string',
        required: false,
        description: `List of per booking-channel rule overrides, each {channel_id, enabled}.`,
      },
      {
        name: 'category_rules',
        type: 'string',
        required: false,
        description: `List of per-category rule overrides, each {category, enabled?, custom_instructions?}. Unknown categories are rejected.`,
      },
      {
        name: 'channel_rules',
        type: 'string',
        required: false,
        description: `List of per-channel rule overrides, each {channel, enabled}. Unknown channels are rejected.`,
      },
      {
        name: 'clear_personalize_for_user_id',
        type: 'boolean',
        required: false,
        description: `If true, clears any personalize_for_user_id currently set instead of applying a new one.`,
      },
      {
        name: 'confidence_threshold',
        type: 'string',
        required: false,
        description: `Minimum confidence score required before Autopilot auto-sends a reply. Clamped to 80, 90, 95, or 99.`,
      },
      {
        name: 'default_for_new_listings',
        type: 'string',
        required: false,
        description: `Whether Autopilot is enabled by default on newly added listings.`,
      },
      {
        name: 'enabled',
        type: 'string',
        required: false,
        description: `Whether Autopilot is turned on for the account. Omit to leave unchanged.`,
      },
      {
        name: 'escalation_ack_enabled',
        type: 'string',
        required: false,
        description: `Whether Autopilot sends the guest an acknowledgement message when escalating to the host.`,
      },
      {
        name: 'message_delay_seconds',
        type: 'string',
        required: false,
        description: `Delay, in seconds, before Autopilot sends an auto-generated reply. Omit to leave unchanged.`,
      },
      {
        name: 'personalize_for_user_id',
        type: 'string',
        required: false,
        description: `ID of the team member whose tone/style Autopilot should personalize replies after.`,
      },
      {
        name: 'schedule_enabled',
        type: 'string',
        required: false,
        description: `Whether the autopilot schedule windows (see get_autopilot_schedule) are enforced.`,
      },
      {
        name: 'schedule_timezone',
        type: 'string',
        required: false,
        description: `IANA timezone used to interpret the autopilot schedule windows.`,
      },
      {
        name: 'sentiment_escalation_threshold',
        type: 'string',
        required: false,
        description: `Sentiment score below which Autopilot escalates the conversation to the host. Clamped to 0, 30, 40, or 50.`,
      },
      {
        name: 'unsure_behavior',
        type: 'string',
        required: false,
        description: `What Autopilot does when it is unsure and drafts an informational deferral: 'reply_and_follow_up' (auto-send, default) or 'hold_for_host' (hold the reply and escalate to the host). An unknown value is rejected.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_calendar_days',
    description: `Update price, availability, and/or minimum-stay for a listing's calendar. Dispatched asynchronously via the listing's OTA. Either pass \`updates\` (list of per-date dicts) or \`dates\` + the shared values to apply. Up to 1095 dates per call.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to update.`,
      },
      {
        name: 'available',
        type: 'string',
        required: false,
        description: `Whether each date in dates should be marked available.`,
      },
      {
        name: 'dates',
        type: 'string',
        required: false,
        description: `The dates to apply the shared price/available/min_stay values to. Omit if passing per-date updates instead.`,
      },
      {
        name: 'min_stay',
        type: 'string',
        required: false,
        description: `The minimum stay (in nights) to apply to each date in dates.`,
      },
      {
        name: 'price',
        type: 'string',
        required: false,
        description: `The nightly price to apply to each date in dates.`,
      },
      {
        name: 'updates',
        type: 'string',
        required: false,
        description: `A list of per-date update objects, each specifying a date and the values to set for it. Use instead of dates + shared values when different dates need different settings.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_cleaning_checklist',
    description: `Update a checklist on a cleaning.`,
    params: [
      {
        name: 'checklist_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist to update.`,
      },
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning job the checklist belongs to.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the checklist.`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `New sort order for the checklist relative to other checklists on the cleaning.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the checklist.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_cleaning_checklist_item',
    description: `Update fields on a cleaning checklist item (title, completion, photo, etc.).`,
    params: [
      {
        name: 'checklist_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist the item belongs to.`,
      },
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning job the checklist item belongs to.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist item to update.`,
      },
      {
        name: 'completed',
        type: 'string',
        required: false,
        description: `Whether the item is marked complete.`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `New sort order for the item within the checklist.`,
      },
      {
        name: 'photo_url',
        type: 'string',
        required: false,
        description: `URL of the photo submitted by the cleaner as proof of completion.`,
      },
      {
        name: 'reference_photo_url',
        type: 'string',
        required: false,
        description: `New reference photo URL showing what this item should look like when done correctly.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the checklist item.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_cleaning_issue',
    description: `Update the title of a cleaning issue.`,
    params: [
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning the issue belongs to.`,
      },
      {
        name: 'issue_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the issue to update.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The new title for the issue.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_cleaning_status',
    description: `Transition a cleaning to a new status. Valid values: not_started, in_progress, paused, ready_for_inspection, completed.`,
    params: [
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning to update.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `The new status to transition the cleaning to.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_contact',
    description: `Update an existing contact. Only provided fields are written.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the contact to update.`,
      },
      { name: 'company', type: 'string', required: false, description: `The contact's company.` },
      {
        name: 'custom_fields',
        type: 'string',
        required: false,
        description: `Custom field key/value pairs to merge onto the contact.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `The contact's email address.`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `The contact's first name.`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `The contact's last name.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Free-text notes about the contact.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `The contact's phone number.`,
      },
      { name: 'role', type: 'string', required: false, description: `The contact's role.` },
    ],
  },
  {
    name: 'prohostaimcp_update_expense',
    description: `Update fields on an existing expense. Only provided fields are modified. Pass \`amount\` as a number (treated as decimal), \`date\` as ISO-8601 (YYYY-MM-DD).`,
    params: [
      {
        name: 'expense_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the expense to update.`,
      },
      {
        name: 'amount',
        type: 'string',
        required: false,
        description: `New amount for the expense, treated as a decimal.`,
      },
      {
        name: 'category_id',
        type: 'string',
        required: false,
        description: `New expense category to assign.`,
      },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `New ISO 4217 currency code for the expense.`,
      },
      {
        name: 'date',
        type: 'string',
        required: false,
        description: `New date for the expense, in ISO-8601 format (YYYY-MM-DD).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New free-text description for the expense.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `New listing to associate the expense with.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name/title for the expense.`,
      },
      {
        name: 'payment_status',
        type: 'string',
        required: false,
        description: `New payment status for the expense.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_expense_category',
    description: `Rename an expense category.`,
    params: [
      {
        name: 'category_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the category to rename.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The new name for the category.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_guest',
    description: `Update an existing guest. Only provided fields are written.`,
    params: [
      {
        name: 'guest_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guest to update.`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `The guest's street address.`,
      },
      { name: 'city', type: 'string', required: false, description: `The guest's city.` },
      { name: 'country', type: 'string', required: false, description: `The guest's country.` },
      {
        name: 'custom_fields',
        type: 'string',
        required: false,
        description: `Guest-level custom field values to set.`,
      },
      { name: 'email', type: 'string', required: false, description: `The guest's email address.` },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `The guest's first name.`,
      },
      { name: 'last_name', type: 'string', required: false, description: `The guest's last name.` },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Free-text notes about the guest.`,
      },
      { name: 'phone', type: 'string', required: false, description: `The guest's phone number.` },
      {
        name: 'photo_url',
        type: 'string',
        required: false,
        description: `URL of the guest's photo.`,
      },
      {
        name: 'postal_code',
        type: 'string',
        required: false,
        description: `The guest's postal code.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `Tags to associate with the guest.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_guidebook',
    description: `Patch fields on a guidebook (title, description, theme, branding).`,
    params: [
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook to update.`,
      },
      {
        name: 'corner_radius',
        type: 'string',
        required: false,
        description: `New corner radius style for UI elements. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'custom_brand_text',
        type: 'string',
        required: false,
        description: `New brand text shown in the guidebook footer. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'custom_font',
        type: 'string',
        required: false,
        description: `New font family for the guidebook. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'custom_logo_dark_url',
        type: 'string',
        required: false,
        description: `New logo image URL for dark backgrounds. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'custom_logo_url',
        type: 'string',
        required: false,
        description: `New logo image URL for light backgrounds. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'custom_primary_color',
        type: 'string',
        required: false,
        description: `New primary brand color, as a hex code. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'custom_secondary_color',
        type: 'string',
        required: false,
        description: `New secondary brand color, as a hex code. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the guidebook. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'hide_branding',
        type: 'string',
        required: false,
        description: `Whether to hide ProhostAI branding on the guidebook. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: false,
        description: `New listing to attach the guidebook to. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'theme',
        type: 'string',
        required: false,
        description: `New visual theme for the guidebook. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the guidebook. Omit or leave null to leave unchanged.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_guidebook_section',
    description: `Patch fields on a guidebook-scoped section.`,
    params: [
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook the section belongs to.`,
      },
      {
        name: 'section_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the section to update.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `New body content for the section. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'icon',
        type: 'string',
        required: false,
        description: `New icon identifier for the section. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `New parent section identifier to nest this section under. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'section_type',
        type: 'string',
        required: false,
        description: `New section type. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the section. Omit or leave null to leave unchanged.`,
      },
      {
        name: 'unlock_before_checkin',
        type: 'string',
        required: false,
        description: `New number of hours before check-in that this section unlocks for the guest. Omit or leave null to leave unchanged.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_last_minute_pricing',
    description: `Configure PriceLabs last-minute (lead-time based) pricing for a listing — the \`\`last_minute_prices\`\` customization, a standing rule that adjusts nightly prices as check-in approaches. \`\`factor_type\`\` is one of linear / linear_gradual (percent, -75..+500, negative = discount), fixed (flat nightly price, PriceLabs requires >= 20% of base), or the presets recommended / conservative / aggressive / none (auto-fill value + window). \`\`days_from_checkin\`\` (1-90) is where the rule starts. \`\`enabled=false\`\` turns the rule off preserving its stored configuration. The rule adjusts FROM the listing's base price and is clamped AT its min price (see update_listing_pricing). Untouched customization blocks (far_out_premium, seasonality, …) are preserved via read-modify-write. Returns a structured \`\`pricelabs_not_authoritative\`\` error (mirroring the REST 409) when PriceLabs is not the authoritative price writer for this listing.`,
    params: [
      {
        name: 'enabled',
        type: 'boolean',
        required: true,
        description: `Whether the last-minute pricing rule is turned on.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to configure last-minute pricing for.`,
      },
      {
        name: 'days_from_checkin',
        type: 'string',
        required: false,
        description: `How many days before check-in the last-minute pricing rule starts adjusting price.`,
      },
      {
        name: 'factor_type',
        type: 'string',
        required: false,
        description: `The type of last-minute pricing adjustment to apply.`,
      },
      {
        name: 'factor_value',
        type: 'string',
        required: false,
        description: `The magnitude of the adjustment, interpreted according to factor_type.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_listing',
    description: `Update fields on a listing — title, description, address, capacity, wifi, custom_fields, etc. Only supplied fields are changed. OTA-managed fields (host roles, connection role, import status) are not exposed.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to update.`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `The street address of the listing.`,
      },
      {
        name: 'amenities',
        type: 'string',
        required: false,
        description: `A dict of amenities for the listing.`,
      },
      {
        name: 'amenities_list',
        type: 'string',
        required: false,
        description: `A list of amenity names for the listing.`,
      },
      {
        name: 'apt',
        type: 'string',
        required: false,
        description: `The apartment or unit number for the listing.`,
      },
      {
        name: 'building_name',
        type: 'string',
        required: false,
        description: `The building name for the listing, if applicable.`,
      },
      {
        name: 'check_in_time_end',
        type: 'string',
        required: false,
        description: `The latest check-in time for the listing.`,
      },
      {
        name: 'check_in_time_start',
        type: 'string',
        required: false,
        description: `The earliest check-in time for the listing.`,
      },
      {
        name: 'check_out_time',
        type: 'string',
        required: false,
        description: `The check-out time for the listing.`,
      },
      {
        name: 'city',
        type: 'string',
        required: false,
        description: `The city the listing is located in.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `The country the listing is located in.`,
      },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `The currency code used for the listing's pricing.`,
      },
      {
        name: 'custom_fields',
        type: 'string',
        required: false,
        description: `A dict of custom field key/value pairs for the listing.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the listing.`,
      },
      {
        name: 'internal_title',
        type: 'string',
        required: false,
        description: `An internal-only title for the listing, not shown to guests.`,
      },
      {
        name: 'lat',
        type: 'string',
        required: false,
        description: `The latitude coordinate of the listing.`,
      },
      {
        name: 'lng',
        type: 'string',
        required: false,
        description: `The longitude coordinate of the listing.`,
      },
      {
        name: 'max_guests',
        type: 'string',
        required: false,
        description: `The maximum number of guests the listing accommodates.`,
      },
      {
        name: 'num_bathrooms',
        type: 'string',
        required: false,
        description: `The number of bathrooms.`,
      },
      {
        name: 'num_bedrooms',
        type: 'string',
        required: false,
        description: `The number of bedrooms.`,
      },
      { name: 'num_beds', type: 'string', required: false, description: `The number of beds.` },
      {
        name: 'postal_code',
        type: 'string',
        required: false,
        description: `The postal/ZIP code of the listing.`,
      },
      {
        name: 'private_notes',
        type: 'string',
        required: false,
        description: `Internal private notes about the listing, not shown to guests.`,
      },
      {
        name: 'rules',
        type: 'string',
        required: false,
        description: `The house rules for the listing.`,
      },
      {
        name: 'thumbnail_url',
        type: 'string',
        required: false,
        description: `The URL of the listing's thumbnail image.`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `The IANA timezone for the listing.`,
      },
      { name: 'title', type: 'string', required: false, description: `The title of the listing.` },
      {
        name: 'wifi_network',
        type: 'string',
        required: false,
        description: `The WiFi network name for the listing.`,
      },
      {
        name: 'wifi_password',
        type: 'string',
        required: false,
        description: `The WiFi password for the listing.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_listing_photos',
    description: `Replace the photo set for a listing. Existing photos are deleted first; pass an empty list to clear all photos. On a connected listing this takes photo ownership from the channel. Up to 100 photos per call.`,
    params: [
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing whose photos should be replaced.`,
      },
      {
        name: 'photos',
        type: 'array',
        required: true,
        description: `The new list of photo objects to set on the listing, replacing all existing photos. Pass an empty list to clear all photos. Up to 100 photos per call.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_listing_pricing',
    description: `Push min/base/max to PriceLabs for the listing. Returns a structured \`\`pricelabs_not_authoritative\`\` error (mirroring the REST 409) when PriceLabs is not the authoritative price writer for this listing — map the listing to PriceLabs first (it becomes authoritative once linked).`,
    params: [
      {
        name: 'base',
        type: 'number',
        required: true,
        description: `The base nightly price PriceLabs uses as its starting point for dynamic pricing.`,
      },
      {
        name: 'listing_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the listing to update pricing for.`,
      },
      {
        name: 'max',
        type: 'number',
        required: true,
        description: `The maximum nightly price PriceLabs will not price above.`,
      },
      {
        name: 'min',
        type: 'number',
        required: true,
        description: `The minimum nightly price PriceLabs will not price below.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_listing_tag',
    description: `Update one or more fields on an existing listing tag.`,
    params: [
      {
        name: 'tag_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the tag to update.`,
      },
      { name: 'color', type: 'string', required: false, description: `New color for the tag.` },
      {
        name: 'custom_fields',
        type: 'string',
        required: false,
        description: `New custom field key/value pairs for the tag.`,
      },
      { name: 'icon', type: 'string', required: false, description: `New icon for the tag.` },
      { name: 'name', type: 'string', required: false, description: `New name for the tag.` },
    ],
  },
  {
    name: 'prohostaimcp_update_memory',
    description: `Update an existing memory. \`content\`, \`scope\`, and \`is_internal\` are all optional; at least one must be provided. Restricted internal-only writers cannot update existing memories; they may only create new internal memories.`,
    params: [
      {
        name: 'memory_id',
        type: 'string',
        required: true,
        description: `ID of the memory to update.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `New text content for the memory. Optional; at least one of content, scope, is_internal must be provided.`,
      },
      {
        name: 'is_internal',
        type: 'string',
        required: false,
        description: `Whether the memory should be internal-only. Optional; at least one of content, scope, is_internal must be provided.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `New scope for the memory. Optional; at least one of content, scope, is_internal must be provided.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_message_template',
    description: `Update a message template by ID. \`\`time_offset_minutes\`\` is signed: NEGATIVE fires BEFORE the event, positive after, 0 at the event. For \`\`check_in\`\` / \`\`checkout\`\` templates a reservation booked after the computed send time is silently skipped unless \`\`send_if_past_due=True\`\`. Changing any scheduling field (offset, min/max nights, type, listings, day/time, past-due, or message) reconciles EXISTING scheduled messages to match — cancelling rows that no longer qualify and rescheduling on an offset change — without creating new ones. Set \`\`apply_to_existing_reservations=True\`\` to ALSO create messages for existing reservations that don't yet have one.`,
    params: [
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the message template to update.`,
      },
      {
        name: 'apply_to_existing_reservations',
        type: 'boolean',
        required: false,
        description: `If true, also create messages for existing reservations that don't yet have one.`,
      },
      {
        name: 'day_of_week',
        type: 'string',
        required: false,
        description: `For recurring_weekly templates, the day of week to send on.`,
      },
      {
        name: 'is_enabled',
        type: 'string',
        required: false,
        description: `Whether the template is active and will schedule messages.`,
      },
      {
        name: 'listing_ids',
        type: 'string',
        required: false,
        description: `New set of listing IDs this template applies to.`,
      },
      {
        name: 'max_nights',
        type: 'string',
        required: false,
        description: `Only apply this template to reservations with at most this many nights.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `New message body. Use placeholders such as {guest_first_name} — see list_conversation_message_variables for the full list of valid placeholders.`,
      },
      {
        name: 'min_nights',
        type: 'string',
        required: false,
        description: `Only apply this template to reservations with at least this many nights.`,
      },
      {
        name: 'past_due_delay_minutes',
        type: 'string',
        required: false,
        description: `Minutes to delay a past-due send when send_if_past_due is true.`,
      },
      {
        name: 'send_if_past_due',
        type: 'string',
        required: false,
        description: `For check_in / checkout templates, if true the message still sends even when the reservation was booked after the computed send time.`,
      },
      {
        name: 'time_of_day',
        type: 'string',
        required: false,
        description: `For recurring_weekly templates, the time of day to send at (24-hour HH:MM).`,
      },
      {
        name: 'time_offset_minutes',
        type: 'string',
        required: false,
        description: `Minutes relative to the check-in/checkout event when the message should send. Negative fires before the event, positive fires after, 0 fires at the event.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New internal title for the message template.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `New template trigger type. One of booking_confirmed, check_in, checkout, or recurring_weekly.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_notification_settings',
    description: `Update the acting user's notification preferences. Only the fields you pass are written: a scope array REPLACES that category's subscriptions wholesale (pass [] to silence the category), while channel_preferences and message_channel_preferences merge per key, so categories and channels you omit keep their stored values. Read the current settings first — get_notification_settings returns the legal values for every field. Only push and email delivery can be changed here; sms and slack are entitlement-gated, and escalation_reachability is read-only, both refused by name rather than silently dropped. Requires the \`notifications:write\` scope; a listing-scoped API key cannot call it.`,
    params: [
      {
        name: 'ai_employee_cadence',
        type: 'string',
        required: false,
        description: `How often AI employee digest notifications are sent.`,
      },
      {
        name: 'ai_employee_preferences',
        type: 'string',
        required: false,
        description: `Notification event scopes to subscribe to for AI employee notifications. Replaces the entire category wholesale; pass [] to silence it.`,
      },
      {
        name: 'autopilot_nudge_preferences',
        type: 'string',
        required: false,
        description: `Notification event scopes to subscribe to for autopilot nudge notifications. Replaces the entire category wholesale; pass [] to silence it.`,
      },
      {
        name: 'channel_preferences',
        type: 'string',
        required: false,
        description: `Per-category delivery-channel toggles, keyed by category then channel name. Merged per key, so categories and channels you omit keep their stored values.`,
      },
      {
        name: 'cleaning_guest_checkout_enabled',
        type: 'string',
        required: false,
        description: `Whether guest-checkout cleaning notifications are enabled.`,
      },
      {
        name: 'cleaning_needs_attention_enabled',
        type: 'string',
        required: false,
        description: `Whether "cleaning needs attention" notifications are enabled.`,
      },
      {
        name: 'cleaning_preferences',
        type: 'string',
        required: false,
        description: `Notification event scopes to subscribe to for cleaning notifications. Replaces the entire category wholesale; pass [] to silence it.`,
      },
      {
        name: 'cleaning_reminders_enabled',
        type: 'string',
        required: false,
        description: `Whether cleaning reminder notifications are enabled.`,
      },
      {
        name: 'message_channel_preferences',
        type: 'string',
        required: false,
        description: `Per-channel toggles for message notifications, keyed by channel name. Merged per key, so channels you omit keep their stored values.`,
      },
      {
        name: 'message_preferences',
        type: 'string',
        required: false,
        description: `Notification event scopes to subscribe to for guest message notifications. Replaces the entire category wholesale; pass [] to silence it.`,
      },
      {
        name: 'reservation_preferences',
        type: 'string',
        required: false,
        description: `Notification event scopes to subscribe to for reservation notifications. Replaces the entire category wholesale; pass [] to silence it.`,
      },
      {
        name: 'task_needs_attention_enabled',
        type: 'string',
        required: false,
        description: `Whether "task needs attention" notifications are enabled.`,
      },
      {
        name: 'task_preferences',
        type: 'string',
        required: false,
        description: `Notification event scopes to subscribe to for task notifications. Replaces the entire category wholesale; pass [] to silence it.`,
      },
      {
        name: 'task_reminders_enabled',
        type: 'string',
        required: false,
        description: `Whether task reminder notifications are enabled.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_owner',
    description: `Update an existing owner. Only provided fields are written. Passing \`\`listing_ids\`\` REASSIGNS the owner's listings — the owner ends up owning exactly the listings supplied (unlinking any others); pass \`\`[]\`\` to unlink all. Unlike the REST \`\`PATCH /owners\`\` endpoint, this MCP tool supports listing reassignment.`,
    params: [
      {
        name: 'owner_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the owner to update.`,
      },
      {
        name: 'address_line1',
        type: 'string',
        required: false,
        description: `Updated first line of the owner's mailing address.`,
      },
      {
        name: 'address_line2',
        type: 'string',
        required: false,
        description: `Updated second line of the owner's mailing address.`,
      },
      {
        name: 'city',
        type: 'string',
        required: false,
        description: `Updated city of the owner's mailing address.`,
      },
      {
        name: 'commission_rate',
        type: 'string',
        required: false,
        description: `Updated commission rate charged to this owner.`,
      },
      {
        name: 'commission_type',
        type: 'string',
        required: false,
        description: `Updated commission calculation type (e.g. percentage or flat_fee).`,
      },
      {
        name: 'company_name',
        type: 'string',
        required: false,
        description: `Updated company name associated with the property owner.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Updated country of the owner's mailing address.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Updated email address of the property owner.`,
      },
      {
        name: 'listing_ids',
        type: 'string',
        required: false,
        description: `Listing IDs to reassign to this owner. This REPLACES the owner's current listings — the owner ends up owning exactly the listings supplied (unlinking any others). Pass an empty array to unlink all listings.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated full name of the property owner.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Updated free-form internal notes about the owner.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Updated phone number of the property owner.`,
      },
      {
        name: 'postal_code',
        type: 'string',
        required: false,
        description: `Updated postal or ZIP code of the owner's mailing address.`,
      },
      {
        name: 'state_province',
        type: 'string',
        required: false,
        description: `Updated state or province of the owner's mailing address.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Updated status of the owner (e.g. active or inactive).`,
      },
      {
        name: 'tax_id',
        type: 'string',
        required: false,
        description: `Updated tax identification number (e.g. SSN or EIN) for the owner.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_owner_statement',
    description: `Update an existing owner statement. Only provided fields are written.`,
    params: [
      {
        name: 'statement_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the owner statement to update.`,
      },
      {
        name: 'from_date',
        type: 'string',
        required: false,
        description: `Updated start date of the statement period (ISO 8601).`,
      },
      {
        name: 'invoice_number',
        type: 'string',
        required: false,
        description: `Updated invoice number to associate with the statement.`,
      },
      {
        name: 'logo',
        type: 'string',
        required: false,
        description: `Updated URL or reference to a logo image to display on the statement.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Updated free-form notes to include on the statement.`,
      },
      {
        name: 'owner_id',
        type: 'string',
        required: false,
        description: `Updated owner ID this statement is associated with.`,
      },
      {
        name: 'property_manager_address',
        type: 'string',
        required: false,
        description: `Updated property manager's mailing address to display on the statement.`,
      },
      {
        name: 'property_manager_email',
        type: 'string',
        required: false,
        description: `Updated property manager's email to display on the statement.`,
      },
      {
        name: 'property_manager_name',
        type: 'string',
        required: false,
        description: `Updated property manager's name to display on the statement.`,
      },
      {
        name: 'property_manager_phone',
        type: 'string',
        required: false,
        description: `Updated property manager's phone number to display on the statement.`,
      },
      {
        name: 'property_manager_tax_number',
        type: 'string',
        required: false,
        description: `Updated property manager's tax identification number to display on the statement.`,
      },
      {
        name: 'property_owner_address',
        type: 'string',
        required: false,
        description: `Updated property owner's mailing address to display on the statement.`,
      },
      {
        name: 'property_owner_email',
        type: 'string',
        required: false,
        description: `Updated property owner's email to display on the statement.`,
      },
      {
        name: 'property_owner_name',
        type: 'string',
        required: false,
        description: `Updated property owner's name to display on the statement.`,
      },
      {
        name: 'property_owner_phone',
        type: 'string',
        required: false,
        description: `Updated property owner's phone number to display on the statement.`,
      },
      {
        name: 'property_owner_tax_number',
        type: 'string',
        required: false,
        description: `Updated property owner's tax identification number to display on the statement.`,
      },
      {
        name: 'rental_activity_display_type',
        type: 'string',
        required: false,
        description: `Updated display type for rental activity line items on the statement.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Updated status of the statement (e.g. draft, sent, paid).`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Updated title of the owner statement.`,
      },
      {
        name: 'to_date',
        type: 'string',
        required: false,
        description: `Updated end date of the statement period (ISO 8601).`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_pin',
    description: `Update a pin's category, position, or host note override.`,
    params: [
      {
        name: 'pin_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the pin to update.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `New category to file this pin under. Leave unset to keep the current category.`,
      },
      {
        name: 'host_note_override',
        type: 'string',
        required: false,
        description: `New host note override for this pin. Leave unset to keep the current value.`,
      },
      {
        name: 'position',
        type: 'string',
        required: false,
        description: `New sort position for the pin within its category. Leave unset to keep the current position.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_place',
    description: `Patch fields on an existing place. Only fields with a non-null value are applied — the MCP/JSON-RPC binding cannot distinguish an explicit \`null\` from an omitted argument, so this tool cannot clear nullable fields. To clear a field, use \`PUT /v1/places/{id}\` with an explicit \`null\` in the JSON body.`,
    params: [
      {
        name: 'place_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the place to update.`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `New street address for the place. Omit to leave unchanged.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New free-text description for the place. Omit to leave unchanged.`,
      },
      {
        name: 'latitude',
        type: 'string',
        required: false,
        description: `New latitude coordinate for the place. Omit to leave unchanged.`,
      },
      {
        name: 'listing_tag_ids',
        type: 'string',
        required: false,
        description: `New list of listing tag IDs to associate with the place. Omit to leave unchanged.`,
      },
      {
        name: 'longitude',
        type: 'string',
        required: false,
        description: `New longitude coordinate for the place. Omit to leave unchanged.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the place. Omit to leave unchanged.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `New contact phone number for the place. Omit to leave unchanged.`,
      },
      {
        name: 'photo_url',
        type: 'string',
        required: false,
        description: `New photo URL for the place. Omit to leave unchanged.`,
      },
      {
        name: 'website_url',
        type: 'string',
        required: false,
        description: `New website URL for the place. Omit to leave unchanged.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_reservation',
    description: `Update a public-safe subset of fields on a reservation: \`custom_fields\` (full replace) and guest contact details. Status, cancel, and Airbnb actions are deferred.`,
    params: [
      {
        name: 'reservation_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the reservation to update.`,
      },
      {
        name: 'custom_fields',
        type: 'string',
        required: false,
        description: `Full replacement for the reservation's custom fields. Provide the complete set of key/value pairs; this replaces existing custom fields rather than merging.`,
      },
      {
        name: 'guest_address',
        type: 'string',
        required: false,
        description: `The guest's street address.`,
      },
      { name: 'guest_city', type: 'string', required: false, description: `The guest's city.` },
      {
        name: 'guest_country',
        type: 'string',
        required: false,
        description: `The guest's country.`,
      },
      {
        name: 'guest_email',
        type: 'string',
        required: false,
        description: `The guest's email address.`,
      },
      {
        name: 'guest_first_name',
        type: 'string',
        required: false,
        description: `The guest's first name.`,
      },
      {
        name: 'guest_last_name',
        type: 'string',
        required: false,
        description: `The guest's last name.`,
      },
      {
        name: 'guest_phone',
        type: 'string',
        required: false,
        description: `The guest's phone number.`,
      },
      {
        name: 'guest_postal_code',
        type: 'string',
        required: false,
        description: `The guest's postal or ZIP code.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_saved_reply',
    description: `Update fields on a saved reply.`,
    params: [
      {
        name: 'saved_reply_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the saved reply to update.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `New category to group this saved reply under.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `New message body for the saved reply.`,
      },
      {
        name: 'shortcut',
        type: 'string',
        required: false,
        description: `New text shortcut that expands to this saved reply.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Position of this saved reply in the picker list (lower sorts first).`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the saved reply.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_scheduled_message',
    description: `Edit the body and/or send time of a scheduled message that hasn't been sent. Only \`\`scheduled\`\`/\`\`paused\`\` rows from source=\`\`api\`\` or source=\`\`mcp\`\` are editable.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `The conversation the scheduled message belongs to.`,
      },
      {
        name: 'scheduled_message_id',
        type: 'string',
        required: true,
        description: `The scheduled message to edit.`,
      },
      { name: 'message', type: 'string', required: false, description: `New message body.` },
      {
        name: 'scheduled_at',
        type: 'string',
        required: false,
        description: `New ISO 8601 send time.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_tag_section',
    description: `Patch fields on a tag-scoped section.`,
    params: [
      {
        name: 'section_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the tag-scoped section to update.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `New markdown content for the section. Omit to leave the existing content unchanged.`,
      },
      {
        name: 'icon',
        type: 'string',
        required: false,
        description: `New icon identifier for the section. Omit to leave unchanged.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of a new parent section to nest this section under. Omit to leave unchanged.`,
      },
      {
        name: 'section_type',
        type: 'string',
        required: false,
        description: `New section type. Omit to leave the existing type unchanged.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the section. Omit to leave the existing title unchanged.`,
      },
      {
        name: 'unlock_before_checkin',
        type: 'string',
        required: false,
        description: `How many hours before check-in this section becomes visible to guests. Omit to leave unchanged.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_task',
    description: `Update a task's status, priority, description, or other fields. Changing status runs the task work-session timer: 'in_progress' starts it (and snapshots the assignee's rate), any other status stops it, and 'completed' also finalizes the billable duration. Re-sending the status a task already has does not restart the timer.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task to update.`,
      },
      {
        name: 'assignee_ids',
        type: 'string',
        required: false,
        description: `New complete list of user IDs to assign this task to.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `New category for the task.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the task.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `New ISO 8601 due date for the task.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `New priority level for the task.`,
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: `New source for the task. One of review, message, or manual.`,
      },
      { name: 'status', type: 'string', required: false, description: `New status for the task.` },
      { name: 'title', type: 'string', required: false, description: `New title for the task.` },
    ],
  },
  {
    name: 'prohostaimcp_update_task_checklist',
    description: `Update fields on a task checklist.`,
    params: [
      {
        name: 'checklist_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the checklist to update.`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task the checklist belongs to.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the checklist.`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `New position for the checklist among the task's checklists.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the checklist.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_upgrade_option',
    description: `Patch fields on an existing upgrade option.`,
    params: [
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook that owns this upgrade option.`,
      },
      {
        name: 'upgrade_option_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the upgrade option to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the upgrade option. Omit to leave unchanged.`,
      },
      {
        name: 'enabled',
        type: 'string',
        required: false,
        description: `Whether the upgrade option should be enabled/visible to guests. Omit to leave unchanged.`,
      },
      {
        name: 'price',
        type: 'string',
        required: false,
        description: `New price for the upgrade option. Omit to leave unchanged.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the upgrade option. Omit to leave unchanged.`,
      },
      {
        name: 'upgrade_type',
        type: 'string',
        required: false,
        description: `New type/scope for the upgrade option. Omit to leave unchanged.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_update_workflow',
    description: `Update an existing automation workflow in place. Only the fields you pass change (partial update). Pass steps to REPLACE the workflow's entire step list (each step is {order, instruction, tool_name?, skill_key?, delay_seconds?}); omit it to leave the steps untouched. listing_ids replaces the workflow's listing scope. Editing an existing workflow does not require approval (unlike create_workflow).`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the workflow to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the workflow.`,
      },
      {
        name: 'enabled',
        type: 'string',
        required: false,
        description: `Enable or disable the workflow.`,
      },
      {
        name: 'listing_ids',
        type: 'string',
        required: false,
        description: `Replacement list of listing IDs to scope the workflow to.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the workflow.` },
      {
        name: 'steps',
        type: 'string',
        required: false,
        description: `Replacement list for the workflow's entire step list.`,
      },
      {
        name: 'trigger_config',
        type: 'string',
        required: false,
        description: `New configuration object for the trigger.`,
      },
      {
        name: 'trigger_type',
        type: 'string',
        required: false,
        description: `New trigger type for the workflow.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_upload_cleaning_attachment',
    description: `Register one or more attachment URLs on a cleaning. Clients upload to S3 first via the in-app presigned URLs, then pass the resulting URLs here.`,
    params: [
      {
        name: 'attachment_urls',
        type: 'array',
        required: true,
        description: `The already-uploaded attachment URLs to register on the cleaning.`,
      },
      {
        name: 'cleaning_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the cleaning to attach files to.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_upload_contact_photo',
    description: `Generate a presigned S3 PUT URL for a contact's photo. The client should upload the bytes to the returned \`presigned_url\`. Allowed content types: \`image/jpeg\`, \`image/png\`.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the contact to upload a photo for.`,
      },
      {
        name: 'content_type',
        type: 'string',
        required: true,
        description: `The MIME content type of the photo being uploaded. Allowed values: image/jpeg, image/png.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_upload_guidebook_image',
    description: `Return a presigned PUT URL for uploading a guidebook image to S3. After PUT, embed the public S3 URL (presigned URL minus query string) in a section's markdown content.`,
    params: [
      {
        name: 'content_type',
        type: 'string',
        required: true,
        description: `The MIME content type of the image being uploaded.`,
      },
      {
        name: 'guidebook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the guidebook to upload an image for.`,
      },
    ],
  },
  {
    name: 'prohostaimcp_upload_place_photo',
    description: `Return a presigned PUT URL for uploading a place photo to S3. After PUT, call update_place with photo_url=<public S3 URL>.`,
    params: [
      {
        name: 'content_type',
        type: 'string',
        required: true,
        description: `The MIME type of the photo file to upload (e.g. image/jpeg).`,
      },
      {
        name: 'place_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the place to upload a photo for.`,
      },
    ],
  },
]
