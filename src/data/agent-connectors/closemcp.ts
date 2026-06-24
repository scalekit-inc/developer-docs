import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'closemcp_activity_search',
    description: `Search for activities. Results are returned ordered by date descending.

Examples:
- To list activities on a lead, use the lead_ids filter.
- To list conversations, filter for calls and meetings.`,
    params: [
      {
        name: 'activity_at',
        type: 'string',
        required: false,
        description: `Filter activities by the date/time the activity occurred.`,
      },
      {
        name: 'activity_types',
        type: 'string',
        required: false,
        description: `Filter by activity types. Valid values include activity.call, activity.email, activity.note, activity.meeting, activity.sms, activity.custom_activity, and others.`,
      },
      {
        name: 'agent_config_ids',
        type: 'string',
        required: false,
        description: `Filter by voice agent config IDs. Matches Call, Email, and SMS activities that carry an agent_config_id; other activity types are filtered out implicitly because the field is not indexed for them.`,
      },
      {
        name: 'contact_ids',
        type: 'string',
        required: false,
        description: `Filter by contact IDs. Only activities associated with these contacts will be returned.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor. Provide only when more results are requested from a previous response.`,
      },
      {
        name: 'lead_ids',
        type: 'string',
        required: false,
        description: `Filter by lead IDs. Only activities on these leads will be returned.`,
      },
      {
        name: 'lead_smart_view_ids',
        type: 'string',
        required: false,
        description: `Filter by lead smart view IDs. Only activities on leads matching these smart views will be returned.`,
      },
      {
        name: 'user_ids',
        type: 'string',
        required: false,
        description: `Filter by user IDs. Only activities created by these users will be returned.`,
      },
    ],
  },
  {
    name: 'closemcp_aggregation',
    description: `Perform an aggregation to answer questions like:

- How many emails were sent this week?
- Calls by user this week (Who made the most?)

You MUST first fetch the list of available leads of fields using the
\`get_fields\` tool.`,
    params: [
      {
        name: 'include_types',
        type: 'array',
        required: true,
        description: `Object types to include in aggregation. Valid values: lead, contact, opportunity, task, email, call, note, meeting, sms, whatsapp, custom_activity, custom_object, sequence_subscription, lead_status_change, opportunity_status_change.`,
      },
      {
        name: 'aggregations',
        type: 'string',
        required: false,
        description: `Aggregation specifications to compute. Each item must specify an aggregation_type (e.g. count, sum, average, min, max, median, cardinality, percent_empty, etc.) and most require a field name.`,
      },
      {
        name: 'display_mode',
        type: 'string',
        required: false,
        description: `How to display the aggregation results. Determined automatically by default.`,
      },
      {
        name: 'group_by',
        type: 'string',
        required: false,
        description: `Reference or enum fields to group by (maximum 2). Use field names returned by the get_fields tool.`,
      },
      {
        name: 'interval',
        type: 'string',
        required: false,
        description: `Interval to aggregate by when using date fields. Determined automatically by default.`,
      },
      {
        name: 'time_buckets',
        type: 'string',
        required: false,
        description: `Time buckets configuration for grouping results by time period.`,
      },
    ],
  },
  {
    name: 'closemcp_apply_voice_agent_update',
    description: `Apply a previously proposed voice agent update.

This tool persists the server-stored proposal identified by proposal_id.
It does not rerun the feedback processor, and it fails if the proposal has
expired or the voice agent changed after the proposal was created.`,
    params: [
      {
        name: 'proposal_id',
        type: 'string',
        required: true,
        description: `Proposal ID returned by propose_voice_agent_update.`,
      },
    ],
  },
  {
    name: 'closemcp_close_product_knowledge_search',
    description: `Search Close product documentation and knowledge base for relevant information.

Use this tool when users ask about:
- How to use specific Close features
- Close API documentation and integration
- Workflow automation and best practices
- Product capabilities and limitations
- Setup and configuration guidance

Example queries:
- "How do I set up automated lead assignment?"
- "What are Close's API rate limits?"
- "How to create custom fields in Close?"
- "Best practices for email templates in Close"`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language query to search Close product documentation and knowledge. For example: 'How do I set up automated lead assignment?' or 'What are Close API rate limits?'`,
      },
    ],
  },
  {
    name: 'closemcp_create_address',
    description: `Add a new address to an existing lead (company).`,
    params: [
      {
        name: 'address_1',
        type: 'string',
        required: true,
        description: `Address line 1 (street address)`,
      },
      { name: 'city', type: 'string', required: true, description: `City` },
      {
        name: 'country',
        type: 'string',
        required: true,
        description: `Country code in ISO 3166-1 alpha-2 format (e.g. US, GB, DE)`,
      },
      {
        name: 'label',
        type: 'string',
        required: true,
        description: `Label for the address. One of: business, mailing, other.`,
      },
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead to add the address to`,
      },
      { name: 'state', type: 'string', required: true, description: `State or province` },
      { name: 'zipcode', type: 'string', required: true, description: `ZIP or postal code` },
      {
        name: 'address_2',
        type: 'string',
        required: false,
        description: `Address line 2 (suite, unit, etc.)`,
      },
    ],
  },
  {
    name: 'closemcp_create_call_task',
    description: `Schedule a call task on a lead, assigned to either a user or a
voice agent (Chloe).

A call task represents a scheduled outbound call that will be made
to the specified contact at the given time. The task can be assigned
to a specific user or dispatched to a voice agent.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `ID of the contact to call. Must belong to the specified lead.`,
      },
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead this call task belongs to`,
      },
      {
        name: 'agent_config_id',
        type: 'string',
        required: false,
        description: `ID of the voice agent (Chloe) to dispatch the call task to. Mutually exclusive with assigned_to.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `ID of the user to assign the call task to. Mutually exclusive with agent_config_id.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date or datetime for the call task. Can be a date (YYYY-MM-DD) or datetime (ISO 8601). If not provided, the task will be due immediately.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `The call task description/instructions.`,
      },
    ],
  },
  {
    name: 'closemcp_create_comment',
    description: `Add a comment to a commentable object (note, call, opportunity, task,
custom object, etc.).

If the object already has a comment thread, the new comment is appended
to it. Otherwise a new thread is started for the object. Use this tool
for both starting a conversation and replying to an existing one — the
object_id alone determines which.

Comments support @-mentions of users and groups. The body is HTML.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `Body of the comment as Close rich text (HTML). Must be a valid Close rich-text document: wrap the whole content in a single <body> tag and put each line/paragraph in a block-level tag. Supported tags include <p>, <h1>-<h6>, <ul>/<ol> with <li>, <blockquote>, <hr>, <a href=...>, <br>, and inline formatting <strong>/<b>, <em>/<i>, <u>, <s>, <code>, <span>. Emoji and unicode are accepted. Escape literal '&' as '&amp;' and literal '<' as '&lt;' in text content.
To @-mention a user, call the \`org_users\` tool to look up the target user and embed their \`mention_html\` value verbatim in the body. To @-mention a group, call the \`find_groups\` tool to look up the target group and embed their \`mention_html\` value verbatim in the body. Example: <body><p>Nice work <span data-type="mention" data-id="user_abc123" data-label="Jane Doe" class="mention">@Jane Doe</span> on closing this!</p></body>`,
      },
      {
        name: 'object_id',
        type: 'string',
        required: true,
        description: `ID of the commentable object: an activity ID (acti_..., e.g. a note, call, email, SMS, meeting, or custom activity), an opportunity ID (oppo_...), a task notification ID (task_...), or a custom object ID (custobj_...). One comment thread exists per object; this tool adds to it or creates it if none exists yet.`,
      },
    ],
  },
  {
    name: 'closemcp_create_contact',
    description: `Create a new contact for a lead.

A contact represents a person associated with a lead (company).`,
    params: [
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead this contact belongs to`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `Custom field values to set on this object. Only the custom fields included are modified; omitted fields are left unchanged.`,
      },
      {
        name: 'emails',
        type: 'string',
        required: false,
        description: `List of email addresses for the contact. Each entry needs a type (office, mobile, home, direct, fax, url, other) and an email address.`,
      },
      { name: 'name', type: 'string', required: false, description: `Full name of the contact` },
      {
        name: 'phones',
        type: 'string',
        required: false,
        description: `List of phone numbers for the contact. Each entry needs a type (office, mobile, home, direct, fax, url, other) and a phone number in international format (e.g. +16505551234).`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Job title of the contact (e.g. CEO, VP of Sales)`,
      },
      {
        name: 'urls',
        type: 'string',
        required: false,
        description: `List of URLs for the contact (e.g. LinkedIn, personal website). Each entry needs a type and a URL.`,
      },
    ],
  },
  {
    name: 'closemcp_create_custom_activity_instance',
    description: `Create a new custom activity instance on a lead.

A custom activity instance is an activity of a custom activity type,
holding the custom field values defined by that type. Use the
find_custom_activities tool to look up the available custom activity
types.

If in an interactive session, ask the user for the relevant field values
(including custom fields) before creating, even if they are not required.`,
    params: [
      {
        name: 'custom_activity_type_id',
        type: 'string',
        required: true,
        description: `ID of the custom activity type. Use the find_custom_activities tool to look up the available custom activity types.`,
      },
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead this custom activity belongs to`,
      },
      {
        name: 'activity_at',
        type: 'string',
        required: false,
        description: `When the custom activity occurred`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `ID of the contact to associate with the custom activity`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `Custom field values to set on this object. Only the custom fields included are modified; omitted fields are left unchanged.`,
      },
      {
        name: 'date_created',
        type: 'string',
        required: false,
        description: `When the custom activity was created. Defaults to now; set this to backfill an activity at a past time.`,
      },
      {
        name: 'pinned',
        type: 'boolean',
        required: false,
        description: `Whether to pin the custom activity to the top of the lead's timeline`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Status of the custom activity. Published activities validate required custom fields; draft activities do not.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `ID of the user to attribute the custom activity to (defaults to the caller)`,
      },
    ],
  },
  {
    name: 'closemcp_create_email_template',
    description: `Create a new email template.

Handling of attachments and unsubscribe links via this tool is currently unsupported.

Email template body should be HTML formatted.

Use template tags as placeholders, for example:
{{ organization.name }} to refer to the sender's organization name.
{{ user.first_name }} {{ user.last_name }} {{ user.email }} {{ user.phone }} to refer to the user sending the email.
{{ lead.display_name }} to refer to the lead name (recipient's name/company).
{{ contact.first_name }} {{ contact.last_name }} to refer to the recipient.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `HTML body of the email template. Supports template tags like {{ organization.name }}, {{ user.first_name }}, {{ lead.display_name }}, {{ contact.first_name }}`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the email template` },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `Subject line of the email template`,
      },
      { name: 'bcc', type: 'string', required: false, description: `List of BCC email addresses` },
      { name: 'cc', type: 'string', required: false, description: `List of CC email addresses` },
      {
        name: 'is_shared',
        type: 'boolean',
        required: false,
        description: `Share this template with the organization (required for use in workflows)`,
      },
    ],
  },
  {
    name: 'closemcp_create_lead',
    description: `Create a new lead (company).

After creating a lead, you should usually add an address or contact
(including phone or email) to the lead.`,
    params: [
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `Custom field values to set on this object. Only the custom fields included are modified; omitted fields are left unchanged.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the lead`,
      },
      { name: 'name', type: 'string', required: false, description: `Name of the lead` },
      {
        name: 'status_id',
        type: 'string',
        required: false,
        description: `ID of the lead status. Use find_lead_statuses to get available status IDs.`,
      },
      { name: 'url', type: 'string', required: false, description: `URL of the lead's website` },
    ],
  },
  {
    name: 'closemcp_create_lead_status',
    description: `Create a new lead status.`,
    params: [
      { name: 'label', type: 'string', required: true, description: `Label for the lead status` },
    ],
  },
  {
    name: 'closemcp_create_note',
    description: `Create a new note on a lead.

A note is a text-based activity attached to a lead. At least one
of note (plaintext) or note_html (rich text) must be provided.`,
    params: [
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead this note belongs to`,
      },
      {
        name: 'activity_at',
        type: 'string',
        required: false,
        description: `When the note activity occurred (ISO 8601 date-time)`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `ID of the contact to associate with the note`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Plaintext note content. At least one of note or note_html must be provided.`,
      },
      {
        name: 'note_html',
        type: 'string',
        required: false,
        description: `Rich-text (HTML) note content. At least one of note or note_html must be provided.`,
      },
      {
        name: 'pinned',
        type: 'string',
        required: false,
        description: `Whether to pin the note to the top of the lead`,
      },
      { name: 'title', type: 'string', required: false, description: `Title of the note` },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `ID of the user to attribute the note to (defaults to caller)`,
      },
    ],
  },
  {
    name: 'closemcp_create_opportunity',
    description: `Create a new opportunity.

Requires a lead ID and status ID. Other fields are optional. The value should be specified in cents (e.g., $100.00 = 10000).`,
    params: [
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead this opportunity belongs to`,
      },
      {
        name: 'status_id',
        type: 'string',
        required: true,
        description: `ID of the opportunity status. Use find_pipelines_and_opportunity_statuses to list valid IDs.`,
      },
      {
        name: 'close_at',
        type: 'string',
        required: false,
        description: `Expected close date in ISO 8601 format`,
      },
      {
        name: 'confidence',
        type: 'string',
        required: false,
        description: `Confidence percentage (0-100) that the opportunity will close`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `ID of the primary contact for this opportunity`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `Custom field values to set on this object. Only the custom fields included are modified; omitted fields are left unchanged.`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Plaintext note to attach to the opportunity`,
      },
      {
        name: 'note_html',
        type: 'string',
        required: false,
        description: `Rich-text HTML version of the note, wrapped in \`<body>...</body>\`. When set, \`note\` is automatically derived from it.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `ID of the user assigned to this opportunity. Defaults to the current user.`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `Monetary value of the opportunity in cents (e.g., $100.00 = 10000)`,
      },
      {
        name: 'value_period',
        type: 'string',
        required: false,
        description: `Recurrence period for the value: 'one_time', 'monthly', or 'annual'`,
      },
    ],
  },
  {
    name: 'closemcp_create_opportunity_status_tool',
    description: `Create a new opportunity status.`,
    params: [
      {
        name: 'label',
        type: 'string',
        required: true,
        description: `Label for the opportunity status`,
      },
      {
        name: 'pipeline_id',
        type: 'string',
        required: true,
        description: `ID of the pipeline to add the status to`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Type of the opportunity status. One of: 'won', 'lost', 'active'.`,
      },
    ],
  },
  {
    name: 'closemcp_create_pipeline',
    description: `Create a new opportunity pipeline.

Use the create_opportunity_status tool to add statuses to the pipeline.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the pipeline.` },
    ],
  },
  {
    name: 'closemcp_create_sms_template',
    description: `Create a new SMS template.

Handling of attachments via this tool is currently unsupported.

Use template tags as placeholders, for example:
{{ organization.name }} to refer to the sender's organization name.
{{ user.first_name }} {{ user.last_name }} {{ user.email }} {{ user.phone }} to refer to the user sending the message.
{{ lead.display_name }} to refer to the lead name (recipient's name/company).
{{ contact.first_name }} {{ contact.last_name }} to refer to the recipient.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the SMS template` },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `Text content of the SMS template. Supports template tags like {{ organization.name }}, {{ user.first_name }}, {{ lead.display_name }}, {{ contact.first_name }}`,
      },
      {
        name: 'is_shared',
        type: 'boolean',
        required: false,
        description: `Share this template with the organization (required for use in workflows)`,
      },
    ],
  },
  {
    name: 'closemcp_create_task',
    description: `Create a new task for a lead.

A task represents a to-do item that can be assigned to a user
and optionally associated with a contact.`,
    params: [
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead this task belongs to`,
      },
      { name: 'text', type: 'string', required: true, description: `The task description` },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `ID of the user to assign the task to. Defaults to the current user if not provided.`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `ID of the contact associated with this task. Must belong to the specified lead.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date or datetime for the task. Can be a date (YYYY-MM-DD) or datetime (ISO 8601). If not provided, the task will be due immediately.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Task priority: 'high' or 'medium'. Defaults to 'medium'. Only set to high if the user explicitly says it's a high priority task.`,
      },
      {
        name: 'send_notification',
        type: 'boolean',
        required: false,
        description: `Send an email notification to the assigned user. Assume notifications should be sent unless the user explicitly tells you not to.`,
      },
    ],
  },
  {
    name: 'closemcp_create_workflow',
    description: `Create a new workflow (a.k.a. sequence) with Draft status.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Workflow name. Must be unique within the organization.`,
      },
      {
        name: 'steps',
        type: 'array',
        required: true,
        description: `Steps in the workflow. Each step must have a step_type that exactly matches one of: 'email', 'call', 'task', 'sms', 'create-opportunity', 'update-opportunity', 'update-lead', 'lead-assignment'. Each step also requires a delay (ISO 8601 duration, e.g. 'PT0S' for immediate, 'P1D' for 1 day). At least one step is required.`,
      },
      {
        name: 'trigger',
        type: 'string',
        required: false,
        description: `The trigger that determines when and how the workflow fires. The trigger_type must exactly match one of the defined types. Use 'contact-manual' (the default) when the user does not specify a trigger. Supported trigger_type values: 'contact-manual', 'lead-manual', 'lead-event', 'contact-event', 'opportunity-event', 'call-event', 'custom-activity-event', 'meeting-event', 'form-submission-event'.`,
      },
    ],
  },
  {
    name: 'closemcp_delete_address',
    description: `Delete an address from an existing lead (company) if there is an exact match.`,
    params: [
      {
        name: 'address_1',
        type: 'string',
        required: true,
        description: `Address line 1 — must match exactly`,
      },
      { name: 'city', type: 'string', required: true, description: `City — must match exactly` },
      {
        name: 'country',
        type: 'string',
        required: true,
        description: `Country code (ISO 3166-1 alpha-2) — must match exactly`,
      },
      {
        name: 'label',
        type: 'string',
        required: true,
        description: `Label for the address (e.g. business, mailing, other)`,
      },
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead to delete the address from`,
      },
      {
        name: 'state',
        type: 'string',
        required: true,
        description: `State or province — must match exactly`,
      },
      {
        name: 'zipcode',
        type: 'string',
        required: true,
        description: `ZIP or postal code — must match exactly`,
      },
      {
        name: 'address_2',
        type: 'string',
        required: false,
        description: `Address line 2 — must match exactly if present`,
      },
    ],
  },
  {
    name: 'closemcp_delete_contact',
    description: `Permanently delete an existing contact.

This will remove the contact from its lead including its email addresses,
phone numbers, and URLs will be removed. Activities on the lead are not
affected.

This action cannot be undone.

ONLY call this if the user specifically instructed you to delete the contact.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the contact to delete` },
    ],
  },
  {
    name: 'closemcp_delete_custom_activity_instance',
    description: `Permanently delete an existing custom activity instance.

This action cannot be undone.

ONLY call this if the user specifically instructed you to delete the
custom activity instance.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the custom activity instance to delete`,
      },
    ],
  },
  {
    name: 'closemcp_delete_email_template',
    description: `Permanently delete an email template.

If the template is used in any workflows (sequences), it cannot be deleted.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the email template to delete`,
      },
    ],
  },
  {
    name: 'closemcp_delete_lead',
    description: `Permanently delete an existing lead (company) by ID including all of its addresses, contacts, opportunities, tasks, and activities.

ONLY call this if the user specifically instructed you to delete the lead, and you confirmed what the deletion will entail and that it cannot be reversed.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the lead to delete` },
    ],
  },
  {
    name: 'closemcp_delete_lead_smart_view',
    description: `Permanently delete a lead smart view (saved search).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the lead smart view to delete`,
      },
    ],
  },
  {
    name: 'closemcp_delete_lead_status',
    description: `Permanently delete a lead status.

Cannot delete if it's the last lead status in the organization or there are
leads currently using this status.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the lead status to delete`,
      },
    ],
  },
  {
    name: 'closemcp_delete_note',
    description: `Permanently delete an existing note.

This action cannot be undone.

ONLY call this if the user specifically instructed you to delete
the note.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the note to delete` },
    ],
  },
  {
    name: 'closemcp_delete_opportunity',
    description: `Permanently delete an opportunity.

This action cannot be undone. All data associated with the opportunity will be removed.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the opportunity to delete`,
      },
    ],
  },
  {
    name: 'closemcp_delete_opportunity_status_tool',
    description: `Permanently delete an opportunity status.

Cannot delete if it's the last opportunity status in the organization or there are opportunities currently using this status.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the opportunity status to delete`,
      },
    ],
  },
  {
    name: 'closemcp_delete_pipeline',
    description: `Permanently delete an opportunity pipeline.

A pipeline can only be deleted if it has no statuses. The last pipeline cannot be deleted.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the pipeline to delete` },
    ],
  },
  {
    name: 'closemcp_delete_sms_template',
    description: `Permanently delete an SMS template.

If the template is used in any workflows (sequences), it cannot be deleted.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the SMS template to delete`,
      },
    ],
  },
  {
    name: 'closemcp_delete_task',
    description: `Permanently delete an existing task by ID.

This action cannot be undone.

ONLY call this if the user specifically instructed you to delete the task.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the task to delete` },
    ],
  },
  {
    name: 'closemcp_enrich_field',
    description: `Use AI to determine and set the value of a field on a lead or contact.

The field is enriched using available data on the object and external
sources, and the enriched value is written back to the object. By default
the value is only written if the field is currently empty; set
overwrite_existing_value to True to replace an existing value.

Returns the enriched value along with the model's reasoning and confidence.`,
    params: [
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The ID of the field to enrich. This may be a built-in field name or a custom field ID.`,
      },
      {
        name: 'object_id',
        type: 'string',
        required: true,
        description: `The ID of the lead or contact to enrich (e.g. 'lead_xxx' or 'cont_xxx').`,
      },
      {
        name: 'object_type',
        type: 'string',
        required: true,
        description: `The type of object whose field should be enriched.`,
      },
      {
        name: 'overwrite_existing_value',
        type: 'boolean',
        required: false,
        description: `Whether to overwrite an existing value. When False, the field is only written if it is currently empty.`,
      },
    ],
  },
  {
    name: 'closemcp_fetch_comment',
    description: `Fetch a single comment by ID.

Returns the comment's rich-text (HTML) body, the thread and lead it
belongs to, its @-mentions, and the resolved author and last-editor
names.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the comment to fetch.` },
    ],
  },
  {
    name: 'closemcp_fetch_contact',
    description: `Fetch an existing contact by ID.

Returns the contact's details including name, title, email addresses, phone numbers, and URLs.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the contact to fetch` },
    ],
  },
  {
    name: 'closemcp_fetch_custom_activity_instance',
    description: `Fetch an existing custom activity instance by ID.

A custom activity instance is an activity of a custom activity type,
holding the custom field values defined by that type. Returns the
full instance, including its custom field values and the resolved
lead, contact, and user names.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the custom activity instance to fetch`,
      },
    ],
  },
  {
    name: 'closemcp_fetch_custom_object_type',
    description: `Fetch a custom object type by ID.

A custom object type defines the shape of a category of custom objects,
including the custom fields its instances hold. Returns the type with
its custom fields.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the custom object type to fetch.`,
      },
    ],
  },
  {
    name: 'closemcp_fetch_email_template',
    description: `Fetch an email template by ID.

Returns the complete email template with all its details.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the email template to fetch`,
      },
    ],
  },
  {
    name: 'closemcp_fetch_lead',
    description: `Fetch an existing lead (company) by ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the lead to fetch` },
    ],
  },
  {
    name: 'closemcp_fetch_lead_smart_view',
    description: `Fetch a lead smart view (saved search) by ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the lead smart view to fetch`,
      },
    ],
  },
  {
    name: 'closemcp_fetch_lead_status',
    description: `Fetch a lead status by ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the lead status to fetch` },
    ],
  },
  {
    name: 'closemcp_fetch_note',
    description: `Fetch an existing note by ID.

Returns the full note details including title, text, and metadata.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the note to fetch` },
    ],
  },
  {
    name: 'closemcp_fetch_opportunity',
    description: `Fetch a specific opportunity by ID.

Returns the complete opportunity with all its details.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the opportunity to fetch` },
    ],
  },
  {
    name: 'closemcp_fetch_opportunity_status',
    description: `Fetch an opportunity status by ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the opportunity status to fetch`,
      },
    ],
  },
  {
    name: 'closemcp_fetch_pipeline_and_opportunity_statuses',
    description: `Fetch an opportunity pipeline, including its opportunity statuses, by ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the pipeline to fetch.` },
    ],
  },
  {
    name: 'closemcp_fetch_sms_template',
    description: `Fetch an SMS template by ID.

Returns the complete SMS template with all its details.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the SMS template to fetch`,
      },
    ],
  },
  {
    name: 'closemcp_fetch_task',
    description: `Fetch an existing task by ID.

Returns the task's details including the associated lead, contact,
assignee, due date, priority, and completion status.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the task to fetch` },
    ],
  },
  {
    name: 'closemcp_find_call_outcomes',
    description: `List all outcomes applicable to calls available in the organization.`,
    params: [],
  },
  {
    name: 'closemcp_find_contact_custom_fields',
    description: `List all contact custom fields defined for the organization.

Includes both contact-specific fields and shared fields associated
with contacts. Returns each field's ID, name, description, type,
allowed choices (for choice fields), whether multiple values are
accepted, and whether it is a shared field. Useful for deciding which
custom field to read or write when working with contacts.`,
    params: [],
  },
  {
    name: 'closemcp_find_custom_activities',
    description: `List all active (non-archived) Custom Activity Types in the organization,
along with the custom fields defined on each type.

Call this before creating a workflow with a "custom-activity-event" trigger
so you can look up the correct Custom Activity Type ID.`,
    params: [],
  },
  {
    name: 'closemcp_find_custom_activity_instances',
    description: `Find a lead's custom activity instances based on various filters.

A custom activity instance is an activity of a custom activity type,
holding the custom field values defined by that type. Always scoped
to a single lead; optionally filter by attributed user, one or more
custom activity types, or activity date. Results are sorted by most
recent activity first and are cursor-paginated.`,
    params: [
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `The lead whose custom activity instances to find`,
      },
      {
        name: 'activity_at',
        type: 'string',
        required: false,
        description: `Filter custom activity instances by their activity date range`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for retrieving the next page`,
      },
      {
        name: 'custom_activity_type_ids',
        type: 'string',
        required: false,
        description: `Filter by the custom activity types the instances belong to. Provide one or more type IDs to match instances of any of them.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Filter custom activity instances by the user they are attributed to (their owner)`,
      },
    ],
  },
  {
    name: 'closemcp_find_custom_object_types',
    description: `List all custom object types in the organization, along with the
custom fields defined on each type.`,
    params: [],
  },
  {
    name: 'closemcp_find_email_templates',
    description: `List or find email templates`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor, give only when more results are requested.`,
      },
      {
        name: 'name_search',
        type: 'string',
        required: false,
        description: `Template name case-insensitive contains search`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Use all to return all except archived.`,
      },
    ],
  },
  {
    name: 'closemcp_find_forms',
    description: `List all web forms in the organization.

Call this before creating a workflow with a "form-submission-event" trigger
so you can look up the correct Form ID.`,
    params: [],
  },
  {
    name: 'closemcp_find_groups',
    description: `List all groups in the organization.`,
    params: [],
  },
  {
    name: 'closemcp_find_lead_custom_fields',
    description: `List all lead custom fields defined for the organization.

Returns each field's ID, name, description, type, allowed choices
(for choice fields), whether multiple values are accepted, and whether
it is a shared field. Useful for deciding which custom field to read
or write when working with leads.`,
    params: [],
  },
  {
    name: 'closemcp_find_lead_smart_views',
    description: `List lead smart views (saved searches).`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor, give only when more results are requested.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter to show only pinned smart views (those shown in the sidebar), or all available smart views. When the user asks about smart views you should filter for pinned smart views unless the user is requesting to see all views or searches by name.`,
      },
      {
        name: 'name_search',
        type: 'string',
        required: false,
        description: `Smart view name case-insensitive contains search. When using name search you should filter by all smart views.`,
      },
    ],
  },
  {
    name: 'closemcp_find_lead_statuses',
    description: `List or find lead statuses for the organization`,
    params: [],
  },
  {
    name: 'closemcp_find_meeting_outcomes',
    description: `List all outcomes applicable to meetings available in the organization.`,
    params: [],
  },
  {
    name: 'closemcp_find_notes',
    description: `Find notes based on various filters.`,
    params: [
      {
        name: 'activity_at',
        type: 'string',
        required: false,
        description: `Filter notes by activity date range`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `Filter notes by associated contact ID`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for retrieving the next page`,
      },
      {
        name: 'date_created',
        type: 'string',
        required: false,
        description: `Filter notes by creation date range`,
      },
      { name: 'lead_id', type: 'string', required: false, description: `Filter notes by lead ID` },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Filter notes by the user who created them`,
      },
    ],
  },
  {
    name: 'closemcp_find_opportunities',
    description: `Find opportunities by status (active/won/lost), owner, lead, or close-date range, optionally only those needing attention, sorted by soonest close, largest value, or highest confidence. Returns each opportunity with resolved lead, contact, owner, and status names; cursor-paginated.`,
    params: [
      {
        name: 'close_at',
        type: 'string',
        required: false,
        description: `Filter opportunities by expected close date range`,
      },
      {
        name: 'created_at',
        type: 'string',
        required: false,
        description: `Filter by opportunity creation date range`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor, give only when more results are requested.`,
      },
      {
        name: 'lead_id',
        type: 'string',
        required: false,
        description: `Filter by the ID of the lead the opportunities belong to`,
      },
      {
        name: 'lead_view_id',
        type: 'string',
        required: false,
        description: `Filter by a lead smart view ID`,
      },
      {
        name: 'needs_attention',
        type: 'string',
        required: false,
        description: `Filter by opportunities that may be stalled and need attention. To see why an opportunity is stalled, direct the user to the opportunities pipeline page.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort order: 'closing_soonest', 'largest_value', or 'largest_confidence'`,
      },
      {
        name: 'status_ids',
        type: 'string',
        required: false,
        description: `Filter by specific opportunity status IDs`,
      },
      {
        name: 'status_type',
        type: 'string',
        required: false,
        description: `Filter by status type: 'won', 'lost', or 'active'`,
      },
      {
        name: 'updated_at',
        type: 'string',
        required: false,
        description: `Filter by opportunity last updated date range`,
      },
      {
        name: 'user_ids',
        type: 'string',
        required: false,
        description: `Filter by owner user IDs`,
      },
    ],
  },
  {
    name: 'closemcp_find_opportunity_custom_fields',
    description: `List all opportunity custom fields defined for the organization.

Includes both opportunity-specific fields and shared fields associated
with opportunities. Returns each field's ID, name, description, type,
allowed choices (for choice fields), whether multiple values are
accepted, and whether it is a shared field. Useful for deciding which
custom field to read or write when working with opportunities.`,
    params: [],
  },
  {
    name: 'closemcp_find_pipelines_and_opportunity_statuses',
    description: `List all opportunity pipelines and their opportunity statuses in the organization.`,
    params: [],
  },
  {
    name: 'closemcp_find_scheduling_links',
    description: `List available scheduling links for the user and org.

User-owned personal links come with a URL. Shared links come with a special
template tag. Each can be inserted into generated templates.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor. Give only when more results are desired.`,
      },
      {
        name: 'name_search',
        type: 'string',
        required: false,
        description: `Scheduling Link name. Case-insensitive substring search.`,
      },
    ],
  },
  {
    name: 'closemcp_find_sms_templates',
    description: `List or find SMS templates`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor, give only when more results are requested.`,
      },
      {
        name: 'name_search',
        type: 'string',
        required: false,
        description: `Template name case-insensitive contains search`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Use all to return all except archived.`,
      },
    ],
  },
  {
    name: 'closemcp_find_tasks',
    description: `Find tasks based on various filters.
You can filter by lead, assignee, completion state, and due/created/
updated dates.`,
    params: [
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `Filter by the ID of the user the task is assigned to`,
      },
      {
        name: 'created_at',
        type: 'string',
        required: false,
        description: `Filter by task creation date range`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor, give only when more results are requested.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Filter by task due date range`,
      },
      {
        name: 'is_complete',
        type: 'string',
        required: false,
        description: `Filter by completion status. If not provided, both complete and incomplete tasks are returned.`,
      },
      { name: 'lead_id', type: 'string', required: false, description: `Filter by lead ID` },
      {
        name: 'updated_at',
        type: 'string',
        required: false,
        description: `Filter by task last updated date range`,
      },
    ],
  },
  {
    name: 'closemcp_find_voice_agents',
    description: `List all voice agents configured for the organization. Voice agents are
AI callers that place outbound calls to leads' contacts on the user's
behalf.

Returns each voice agent's ID and name. Use this to find the right
voice agent ID when scheduling a call or assigning a call step in a
workflow.

Users may refer to voice agents as "voice agents", "Chloe", or by their
configured name. When more than one agent exists, pick the most
appropriate one based on the name.`,
    params: [],
  },
  {
    name: 'closemcp_find_workflows',
    description: `List or find workflows`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor. Provide only when more results are requested from a previous response.`,
      },
      {
        name: 'name_search',
        type: 'string',
        required: false,
        description: `Workflow name case-insensitive contains search. Returns workflows whose name contains this string.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter workflows by status. Use 'all' to return all workflows regardless of status.`,
      },
    ],
  },
  {
    name: 'closemcp_get_fields',
    description: `Use this field ONLY to get a list of fields for the aggregation tool.`,
    params: [],
  },
  {
    name: 'closemcp_get_voice_agent_overview_report',
    description: `Cross-agent rollup for the Voice Agents list page.

Returns one row per active agent — agents with completed calls
in \`date_range\` or queued upcoming calls. Cumulative funnel
counts (\`answered\`, \`engaged\`, \`objective_met\`) plus \`total_calls\`.
\`upcoming_calls\` is the agent's queued (not yet completed) calls and
is not bound by \`date_range\` — open tasks are open regardless of
when scheduled (so an agent with only upcoming calls still appears).
Use this to compare agents;
for one agent's outcomes, sentiment, or time saved use
\`get_voice_agent_performance_report\`. For an inventory of all
configured voice agents regardless of activity, use
\`find_agent_configs\`.

The Voice Agents list (Agents tab) shows all-time stats, so leave
\`date_range\` at its default (\`all_time\`) unless the user asks for a
specific window. (The Upcoming and Recent tabs are call lists, not
this rollup — search Calls for those.)

Rows are sorted server-side per the \`sort\` field (default
\`most_calls\`); pass a different mode rather than re-sorting in
your reply. Set \`reverse=True\` to invert (e.g. \`sort=most_calls,
reverse=True\` for least active first) — necessary to surface the
bottom of the ordering, since \`rows\` are capped before they reach
you. \`truncated\` and \`total_agent_count\` flag in-scope active
agents; \`dormant_agent_count\` reports in-scope agents with
neither completed calls in the date range nor queued
upcoming calls (not included in \`rows\`).`,
    params: [
      {
        name: 'agent_config_ids',
        type: 'string',
        required: false,
        description: `Optional list of voice agent IDs to filter the report to. If omitted, all active agents are included.`,
      },
      {
        name: 'date_range',
        type: 'string',
        required: false,
        description: `Time window for the report. Defaults to all_time.`,
      },
      {
        name: 'reverse',
        type: 'boolean',
        required: false,
        description: `Whether to reverse the sort order. Set to true to invert (e.g. least active first when sort=most_calls).`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order for the rows. Defaults to most_calls.`,
      },
    ],
  },
  {
    name: 'closemcp_get_voice_agent_performance_report',
    description: `Performance metrics for one voice agent.

Returns the numbers shown on the Performance tab of a Voice Agent
detail page. Passing multiple \`agent_config_ids\` pools metrics
into a single aggregate (not a per-agent breakdown — for that,
use \`get_voice_agent_overview_report\`). For per-call drill-down,
search Calls filtered by \`agent_config_id\`.

When the user is on a Voice Agent page, pull \`date_range\` from
\`page_context.date_range\` so the numbers match the UI.

Percentages: \`*_pct\` is over \`total_calls\`;
\`engaged_over_answered_pct\` and \`objective_met_over_answered_pct\`
are over \`answered\` (tier-to-tier conversion). For any other
denominator, compute from \`*_count\`.

\`funnel_previous_period_deltas\` is null when the date range has
no defined previous period (e.g. \`all_time\`).`,
    params: [
      {
        name: 'agent_config_ids',
        type: 'array',
        required: true,
        description: `IDs of the voice agents to get performance metrics for. Use \`find_voice_agents\` to discover available agent IDs.`,
      },
      {
        name: 'date_range',
        type: 'string',
        required: false,
        description: `Time window for the report. Defaults to all_time.`,
      },
    ],
  },
  {
    name: 'closemcp_get_voice_agents',
    description: `Return detailed configuration for one or more voice agents.

Includes each agent's objective, user instructions, and which skills are
enabled. Use this as the follow-up to \`find_voice_agents\` once one or
more agent IDs have been selected.`,
    params: [
      {
        name: 'agent_config_ids',
        type: 'array',
        required: true,
        description: `IDs of the voice agents (AgentConfig) to fetch details for. Up to 30 IDs per call. Use \`find_voice_agents\` to discover available agent IDs.`,
      },
    ],
  },
  {
    name: 'closemcp_lead_search',
    description: `Perform a simple lead search and return the initial set of results.

Use this to retrieve all leads, most recent leads, search leads by
keyword, or filter by lead status and smart view. For more complex
searches use the \`search\` tool instead.

Leads will be returned by last updated first.`,
    params: [
      {
        name: 'full_text',
        type: 'string',
        required: false,
        description: `Full text search across lead data`,
      },
      {
        name: 'lead_status_id',
        type: 'string',
        required: false,
        description: `Filter by lead status ID`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Search lead name or contact name`,
      },
      {
        name: 'smart_view_id',
        type: 'string',
        required: false,
        description: `Filter by smart view ID (saved search)`,
      },
    ],
  },
  {
    name: 'closemcp_org_info',
    description: `Get information about the Close organization including organization ID, name, and other org-level details.`,
    params: [],
  },
  {
    name: 'closemcp_org_users',
    description: `Return active users (memberships) which are part of the current org.`,
    params: [],
  },
  {
    name: 'closemcp_paginate_search',
    description: `Paginate a search to retrieve more results.

Provide exactly one of:
- \`search_id\`: a \`share_*\` id from a previous search or shared entry, or
- \`smart_view_id\`: a \`save_*\` Smart View (saved search) id the user is
  viewing.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous search response`,
      },
      {
        name: 'search_id',
        type: 'string',
        required: false,
        description: `Shared-entry/search id (share_*) to paginate. Provide exactly one of search_id or smart_view_id.`,
      },
      {
        name: 'smart_view_id',
        type: 'string',
        required: false,
        description: `Smart View (saved search) id (save_*) to paginate. Provide exactly one of search_id or smart_view_id.`,
      },
    ],
  },
  {
    name: 'closemcp_propose_voice_agent_update',
    description: `Propose a voice agent configuration update from natural-language feedback.

This tool does not apply changes to the voice agent. It returns a short
behavioral summary and proposal ID when the requested edit is clear. If the
feedback is ambiguous, it returns clarification questions instead of making
a proposal. Use apply_voice_agent_update with the proposal ID only after
the user approves the proposal.`,
    params: [
      {
        name: 'agent_config_id',
        type: 'string',
        required: true,
        description: `ID of the voice agent to update.`,
      },
      {
        name: 'feedback',
        type: 'string',
        required: true,
        description: `Natural-language feedback describing how the voice agent should change.`,
      },
      {
        name: 'proposal_id',
        type: 'string',
        required: false,
        description: `Existing proposal ID to refine. Omit when creating a new proposal.`,
      },
    ],
  },
  {
    name: 'closemcp_schedule_voice_agent_call',
    description: `Schedule a voice agent to call a lead's contact.

Creates a call task assigned to the voice agent. The voice agent will
place the call automatically at the scheduled time, or as soon as the
queue picks it up when no time is given.

Use \`find_voice_agents\` first to discover which voice agents are
available in this organization.`,
    params: [
      {
        name: 'agent_config_id',
        type: 'string',
        required: true,
        description: `ID of the voice agent (AgentConfig) that should make the call. Use \`find_voice_agents\` to discover available agents.`,
      },
      { name: 'lead_id', type: 'string', required: true, description: `ID of the lead to call.` },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `Optional contact to call. If omitted, the first contact on the lead that has a phone number will be selected.`,
      },
      {
        name: 'scheduled_at',
        type: 'string',
        required: false,
        description: `When the call should be made. ISO 8601 datetime, timezone-aware. If omitted, the call is scheduled to run as soon as the voice agent queue picks it up (ASAP).`,
      },
    ],
  },
  {
    name: 'closemcp_search',
    description: `Perform a natural language search for leads or contacts.

If a more specific search tool (like lead_search or activity_search)
satisfies the request, use that tool instead.

You can reference related objects like activities (such as calls, emails,
meetings, notes, custom activities, etc.), opportunities, tasks as long as
they are part of a lead query.

Example queries:

- leads not contacted in the past week
- leads assigned to me with uncompleted tasks
- leads with an active opportunity over $500
- contacts with CTO title

Each returned result will contain a title label, preview text, object ID,
and URL.

The initial set of results, total count of all results, and a URL to open
the results in Close is returned. To retrieve more results, use the
returned cursor and call the paginate_search tool using the cursor and
search ID returned in this response.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language search query. For example: 'leads not contacted in the past week', 'leads with an active opportunity over $500', or 'contacts with CTO title'.`,
      },
    ],
  },
  {
    name: 'closemcp_update_contact',
    description: `Update an existing contact.

You can update a contact's name, title, email addresses, phone numbers, and URLs.
Only fields that are provided will be updated.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the contact to update` },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `Custom field values to set on this object. Only the custom fields included are modified; omitted fields are left unchanged.`,
      },
      {
        name: 'emails',
        type: 'string',
        required: false,
        description: `When providing this field, you must provide the full updated list of email addresses for the contact.`,
      },
      { name: 'name', type: 'string', required: false, description: `Name of the contact` },
      {
        name: 'phones',
        type: 'string',
        required: false,
        description: `When providing this field, you must provide the full updated list of phone numbers for the contact.`,
      },
      { name: 'title', type: 'string', required: false, description: `Job title of the contact` },
      {
        name: 'urls',
        type: 'string',
        required: false,
        description: `When providing this field, you must provide the full updated list of URLs for the contact.`,
      },
    ],
  },
  {
    name: 'closemcp_update_custom_activity_instance',
    description: `Update an existing custom activity instance.

A custom activity instance is an activity of a custom activity type,
holding the custom field values defined by that type.

Only fields that are provided will be updated. For custom fields, only
the custom fields included are modified; pass null to clear one. Pass
'clear' for contact_id to detach the contact.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the custom activity instance to update`,
      },
      {
        name: 'activity_at',
        type: 'string',
        required: false,
        description: `When the custom activity occurred`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `ID of the contact to associate with the custom activity; must belong to the same lead. Pass 'clear' to remove the existing contact.`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `Custom field values to set on this object. Only the custom fields included are modified; omitted fields are left unchanged.`,
      },
      {
        name: 'pinned',
        type: 'string',
        required: false,
        description: `Whether to pin the custom activity to the top of the lead's timeline`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status of the custom activity. Publishing a draft validates required custom fields; leave unset to keep the current status.`,
      },
    ],
  },
  {
    name: 'closemcp_update_email_template',
    description: `Update an existing email template.

Only fields that are provided and not None will be updated.

Handling of attachments and unsubscribe links via this tool is currently unsupported.

Email template body should be HTML formatted.

Use template tags as placeholders, for example:
{{ organization.name }} to refer to the sender's organization name.
{{ user.first_name }} {{ user.last_name }} {{ user.email }} {{ user.phone }} to refer to the user sending the email.
{{ lead.display_name }} to refer to the lead name (recipient's name/company).
{{ contact.first_name }} {{ contact.last_name }} to refer to the recipient.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the email template to update`,
      },
      { name: 'bcc', type: 'string', required: false, description: `List of BCC email addresses` },
      {
        name: 'body',
        type: 'string',
        required: false,
        description: `HTML body of the email template. Supports template tags like {{ organization.name }}, {{ user.first_name }}, {{ lead.display_name }}, {{ contact.first_name }}`,
      },
      { name: 'cc', type: 'string', required: false, description: `List of CC email addresses` },
      {
        name: 'is_archived',
        type: 'string',
        required: false,
        description: `Whether to archive this template`,
      },
      {
        name: 'is_shared',
        type: 'string',
        required: false,
        description: `Whether to share this template with the organization (required for use in workflows)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the email template`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `New subject line for the email template`,
      },
    ],
  },
  {
    name: 'closemcp_update_lead',
    description: `Update an existing lead (company).

Only fields that are provided and not None will be updated.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the lead to update` },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `Custom field values to set on this object. Only the custom fields included are modified; omitted fields are left unchanged.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the lead`,
      },
      { name: 'name', type: 'string', required: false, description: `Name of the lead` },
      {
        name: 'status_id',
        type: 'string',
        required: false,
        description: `ID of the lead status. Use find_lead_statuses to look up valid status IDs.`,
      },
      { name: 'url', type: 'string', required: false, description: `URL of the lead's website` },
    ],
  },
  {
    name: 'closemcp_update_lead_smart_view',
    description: `Update a lead smart view (saved search).

Only fields that are provided and not None will be updated.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the lead smart view to update`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the smart view`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the smart view` },
    ],
  },
  {
    name: 'closemcp_update_lead_status',
    description: `Update the label of an existing lead status.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the lead status to update`,
      },
      {
        name: 'label',
        type: 'string',
        required: true,
        description: `New label for the lead status`,
      },
    ],
  },
  {
    name: 'closemcp_update_note',
    description: `Update an existing note.

Only fields that are provided will be updated. Note content is
provided as rich text (HTML) via note_html; the plaintext note is
automatically derived.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the note to update` },
      {
        name: 'activity_at',
        type: 'string',
        required: false,
        description: `When the note activity occurred (ISO 8601 date-time)`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `ID of the contact to associate with the note. Pass 'clear' to remove the existing contact.`,
      },
      {
        name: 'note_html',
        type: 'string',
        required: false,
        description: `Updated note content as Close rich text (HTML). Must be a valid Close rich-text document: wrap the whole content in a single <body> tag and put each line/paragraph in a block-level tag. Supported tags include <p>, <h1>-<h6>, <ul>/<ol> with <li>, <blockquote>, <hr>, <a href=...>, <br>, and inline formatting <strong>/<b>, <em>/<i>, <u>, <s>, <code>, <span>. Escape literal ampersands as '&amp;'. Example: <body><p>Spoke with <strong>Jane</strong> about pricing.</p><ul><li>Wants a demo</li><li>Budget approved</li></ul></body>`,
      },
      {
        name: 'pinned',
        type: 'string',
        required: false,
        description: `Whether to pin the note to the top of the lead`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title of the note. Pass an empty string to remove the existing title.`,
      },
    ],
  },
  {
    name: 'closemcp_update_opportunity',
    description: `Update an existing opportunity.

Only fields that are provided will be updated. The value should be specified in cents (e.g., $100.00 = 10000). Pass 'clear' for value or close_at to remove those values.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the opportunity to update`,
      },
      {
        name: 'close_at',
        type: 'string',
        required: false,
        description: `Expected close date in ISO 8601 format. Pass 'clear' to remove an existing date.`,
      },
      {
        name: 'confidence',
        type: 'string',
        required: false,
        description: `Confidence percentage (0-100) that the opportunity will close`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `ID of the primary contact for this opportunity`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `Custom field values to set on this object. Only the custom fields included are modified; omitted fields are left unchanged.`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Plaintext version of the note`,
      },
      {
        name: 'note_html',
        type: 'string',
        required: false,
        description: `Rich-text HTML version of the note, wrapped in \`<body>...</body>\`. When set, \`note\` is automatically derived from it.`,
      },
      {
        name: 'status_id',
        type: 'string',
        required: false,
        description: `ID of the opportunity status. Use find_pipelines_and_opportunity_statuses to list valid IDs.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `ID of the user assigned to this opportunity`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `Monetary value of the opportunity in cents. Pass 'clear' to remove an existing value.`,
      },
      {
        name: 'value_period',
        type: 'string',
        required: false,
        description: `Recurrence period for the value: 'one_time', 'monthly', or 'annual'`,
      },
    ],
  },
  {
    name: 'closemcp_update_opportunity_status_tool',
    description: `Update the label of an existing opportunity status.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the opportunity status to update`,
      },
      {
        name: 'label',
        type: 'string',
        required: true,
        description: `New label for the opportunity status`,
      },
    ],
  },
  {
    name: 'closemcp_update_pipeline',
    description: `Update an existing opportunity pipeline.

Only fields that are provided will be updated.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the pipeline to update` },
      { name: 'name', type: 'string', required: false, description: `New name for the pipeline` },
    ],
  },
  {
    name: 'closemcp_update_sms_template',
    description: `Update an existing SMS template.

Only fields that are provided will be updated. Fields that are not provided will remain unchanged.

Handling of attachments via this tool is currently unsupported.

Use template tags as placeholders, for example:
{{ organization.name }} to refer to the sender's organization name.
{{ user.first_name }} {{ user.last_name }} {{ user.email }} {{ user.phone }} to refer to the user sending the message.
{{ lead.display_name }} to refer to the lead name (recipient's name/company).
{{ contact.first_name }} {{ contact.last_name }} to refer to the recipient.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the SMS template to update`,
      },
      {
        name: 'is_archived',
        type: 'string',
        required: false,
        description: `Whether to archive this template`,
      },
      {
        name: 'is_shared',
        type: 'string',
        required: false,
        description: `Whether to share this template with the organization (required for use in workflows)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the SMS template`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `New text content for the SMS template. Supports template tags like {{ organization.name }}, {{ user.first_name }}, {{ lead.display_name }}, {{ contact.first_name }}`,
      },
    ],
  },
  {
    name: 'closemcp_update_task',
    description: `Update an existing task.

Only fields that are provided will be updated. Pass 'clear' for
contact_id or due_date to clear those values.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the task to update` },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `ID of the user to assign the task to. Tasks must always have an assignee, so this cannot be cleared.`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `ID of the contact associated with this task. Must belong to the task's lead. Pass 'clear' to remove the existing contact.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date or datetime for the task. Can be a date (YYYY-MM-DD) or datetime (ISO 8601). Pass 'clear' to make the task dateless (due immediately).`,
      },
      {
        name: 'is_complete',
        type: 'string',
        required: false,
        description: `Mark the task as complete (true) or reopen it (false).`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Task priority: 'high' or 'medium'. Only set to 'high' if the user explicitly says it's a high priority task.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Updated task description. Cannot be blank.`,
      },
    ],
  },
]
