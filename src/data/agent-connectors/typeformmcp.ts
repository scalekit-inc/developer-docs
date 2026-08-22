import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'typeformmcp_accounts_list_accounts',
    description: `Lists all accounts the authenticated user is a member of.`,
    params: [],
  },
  {
    name: 'typeformmcp_automations_public_add_delay_step',
    description: `Add a delay step to an existing automation (workflow/flow).

A delay step pauses the automation for a fixed duration before the following step runs.

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`automation_id\` — obtain via \`public_list_automations\`.
- \`after_step_id\` — obtain via \`public_get_automation\` (\`workflow.steps[].id\`).

## Positioning
- position: "entrypoint" (insert at start; new step becomes entrypoint, pointing at the old one) |
  "tail" (append after the last step; no lookup needed) | "after" (insert after after_step_id).
- after_step_id: required only for "after". Id of the step to follow. null for "entrypoint"/"tail".
- No "before" position: to insert before step X, use "entrypoint" if X is the entrypoint, else
  "after" with after_step_id set to the step whose next_ids contains X.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'after_step_id',
        type: 'string',
        required: true,
        description: `Step id to insert after; only used when position is "after". See tool description.`,
      },
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The automation's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
      {
        name: 'duration',
        type: 'string',
        required: true,
        description: `Go duration string (e.g. "30m", "24h"). Must be between 10 minutes (10m) and 30 days (720h).`,
      },
      {
        name: 'position',
        type: 'string',
        required: true,
        description: `Where to insert the step. See tool description for positioning rules.`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_add_email_step',
    description: `Add an email step to an existing automation (workflow/flow).

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`automation_id\` — obtain via \`public_list_automations\`.
- \`after_step_id\` — obtain via \`public_get_automation\` (\`workflow.steps[].id\`).
- Field refs used in \`to\`/\`subject\`/\`body\` (\`{{field:<REF>}}\`) — obtain via \`public_list_referenceable_fields\`.

## Parameters notes
- subject: The email subject line. See "Field refs" below for dynamic content.
- body: The email body HTML. See "Body HTML structure" below.
- to: Recipient email addresses or field refs, if scope="respondent" "{{field:<EMAIL_FIELD_REF>}}".
  When scope="respondent" and "to" is empty, it defaults to the automation's first email field ("{{field:<EMAIL_FIELD_REF>}}").
- scope: "self" (sends to fixed addresses in "to") or "respondent" (sends to the email field refs in "to" - "{{field:<EMAIL_FIELD_REF>}}").

## Positioning
- position: "entrypoint" (insert at start; new step becomes entrypoint, pointing at the old one) |
  "tail" (append after the last step; no lookup needed) | "after" (insert after after_step_id).
- after_step_id: required only for "after". Id of the step to follow. null for "entrypoint"/"tail".
- No "before" position: to insert before step X, use "entrypoint" if X is the entrypoint, else
  "after" with after_step_id set to the step whose next_ids contains X.

## Sender
- sender / reply_to: Optional. If both null, the tool auto-fills them from the account's first authorized email domain


## Field refs (dynamic content)

CRITICAL: Use the field's 'ref' property (from list_referenceable_fields)

Mustache syntax \`{{field:<FIELD_REF>}}\` works in three placements:
- Subject: plain mustache, e.g. \`"Welcome {{field:01KH3G1C7Z5SVWQ3ZATVHEDAWE}}"\`
- "to" array entries: plain mustache (the respondent's email field, for "respondent" scope)
- Body HTML: must be wrapped in a span (see below)

## Body HTML structure

These are strict rules, not general guidelines. Always follow these:

All body content MUST be wrapped in \`<div id="email-builder">...</div>\` — the email renderer requires this.

### Field reference span (body only)

\`\`\`html
<span data-ref="FIELD_REF" data-title="FIELD_NAME" data-variable-type="field">{{field:FIELD_REF}}</span>
\`\`\`

- \`data-ref\`: field ref (not id)
- \`data-title\`: human-readable field name (e.g., "Email", "Name")
- \`data-variable-type\`: must be \`"field"\`
- Inner text: \`{{field:FIELD_REF}}\`

### CTA buttons

When the user requests a button, CTA, call to action, action link, or similar, use this exact
structure inside the body:

\`\`\`html
<p data-id="UUID" class="email-cta-wrapper"><a href="URL" target="_blank" rel="noopener noreferrer nofollow" class="email-cta" >LABEL</a></p>
\`\`\`

- \`data-id\`: unique UUID v4 on the \`<p>\`
- \`class="email-cta-wrapper"\` on the \`<p>\` (required)
- \`href\`: destination URL on the \`<a>\`
- \`target="_blank" rel="noopener noreferrer nofollow"\` on the \`<a>\` (required)
- \`class="email-cta"\` on the \`<a>\` (required)
- Inner text of \`<a>\`: button label

### Plain links

For a plain inline hyperlink (no button styling), use this structure inside the body:

\`\`\`html
<p data-id="UUID" class=""><a href="URL" target="_blank" rel="noopener noreferrer nofollow">LINK_TEXT</a></p>
\`\`\`

- \`data-id\`: unique UUID v4 on the \`<p>\`
- \`href\`: destination URL on the \`<a>\`
- \`target="_blank" rel="noopener noreferrer nofollow"\` on the \`<a>\` (required)
- No \`class\` on the \`<a>\` (distinguishes link from CTA button)
- Inner text of \`<a>\`: link label (often the URL itself)

Use plain links for inline references; use the CTA structure above when the user asks for a button
or prominent call-to-action.

## "self" scope validation

When scope is "self", the "to" array MUST contain at least one real, valid email address.
Do NOT use placeholders like \`<EMAIL_ADDRESS>\`, \`TODO\`, or template strings. Ask the user if you
don't know the address.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'after_step_id',
        type: 'string',
        required: true,
        description: `Step id to insert after; only used when position is "after". See tool description.`,
      },
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The automation's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `The email body HTML, wrapped in <div id="email-builder">...</div>. Always follow the formatting rules found in the tool description.`,
      },
      {
        name: 'persist',
        type: 'string',
        required: true,
        description: `Lifecycle event on which to persist a copy of the dispatched email. Empty string or null means never persist.`,
      },
      {
        name: 'position',
        type: 'string',
        required: true,
        description: `Where to insert the step. See tool description for positioning rules.`,
      },
      {
        name: 'reply_to',
        type: 'array',
        required: true,
        description: `Reply-to addresses. Null or empty auto-fills from the account's first authorized email domain when sender is also empty.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `"self" sends to the fixed addresses in "to"; "respondent" sends to the form respondent.`,
      },
      {
        name: 'sender',
        type: 'string',
        required: true,
        description: `Sender email address. Null or empty auto-fills from the account's first authorized email domain when reply_to is also empty.`,
      },
      { name: 'subject', type: 'string', required: true, description: `The email subject line.` },
      {
        name: 'theme_id',
        type: 'string',
        required: true,
        description: `Optional theme id for the email notification.`,
      },
      {
        name: 'to',
        type: 'array',
        required: true,
        description: `List of recipient email addresses. Can either be an email address or a reference to available email fields.`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_add_integration_step',
    description: `Adds a placeholder send-to-integration step to an automation (workflow/flow).

Use this whenever the user wants to send data to ANY third-party app (e.g., Slack, HubSpot, Google Sheets, Zapier, Microsoft Teams, Airtable, Excel, Mailchimp).

Important: This tool does NOT configure, select, or authorize the integration. Afterward, instruct the user to open the Typeform UI to select their destination app
and complete the setup.

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`automation_id\` — obtain via \`public_list_automations\`.
- \`after_step_id\` — obtain via \`public_get_automation\` (\`workflow.steps[].id\`).

## Positioning
- position: "entrypoint" (insert at start; new step becomes entrypoint, pointing at the old one) |
  "tail" (append after the last step; no lookup needed) | "after" (insert after after_step_id).
- after_step_id: required only for "after". Id of the step to follow. null for "entrypoint"/"tail".
- No "before" position: to insert before step X, use "entrypoint" if X is the entrypoint, else
  "after" with after_step_id set to the step whose next_ids contains X.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'after_step_id',
        type: 'string',
        required: true,
        description: `Step id to insert after; only used when position is "after". See tool description.`,
      },
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The automation's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
      {
        name: 'position',
        type: 'string',
        required: true,
        description: `Where to insert the step. See tool description for positioning rules.`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_add_webhook_step',
    description: `Add a webhook step to an existing automation (workflow/flow).

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`automation_id\` — obtain via \`public_list_automations\`.
- \`after_step_id\` — obtain via \`public_get_automation\` (\`workflow.steps[].id\`).

## Positioning
- position: "entrypoint" (insert at start; new step becomes entrypoint, pointing at the old one) |
  "tail" (append after the last step; no lookup needed) | "after" (insert after after_step_id).
- after_step_id: required only for "after". Id of the step to follow. null for "entrypoint"/"tail".
- No "before" position: to insert before step X, use "entrypoint" if X is the entrypoint, else
  "after" with after_step_id set to the step whose next_ids contains X.


`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'after_step_id',
        type: 'string',
        required: true,
        description: `Step id to insert after; only used when position is "after". See tool description.`,
      },
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The automation's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
      {
        name: 'position',
        type: 'string',
        required: true,
        description: `Where to insert the step. See tool description for positioning rules.`,
      },
      {
        name: 'secret',
        type: 'string',
        required: true,
        description: `Shared secret used to sign webhook deliveries. Pass null to leave unset.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The HTTPS endpoint that will receive webhook deliveries.`,
      },
      {
        name: 'verify_ssl',
        type: 'boolean',
        required: true,
        description: `Whether to verify the destination's SSL certificate.`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_create_automation',
    description: `Create a new Automation (also called "workflows") with an associated trigger.

Creates empty automation (no steps, no condition). Use add_<step_type>_step tools to add steps to it, and patch_trigger to set a trigger condition.

See the input schema's field descriptions for per-trigger_type semantics of trigger_form_id, filter_contact_list_ids, filter_partial_submit_refs and filter_ending_refs.

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`trigger_form_id\` — obtain via \`forms-public_list_forms\`.
- \`filter_contact_list_ids\` — obtain via \`contacts-public_list_contacts_lists\`.
## Responding
On success, always include this link in your response. Substitute {account_id} with the account_id input value and {automation_id} with the id field from the tool output:
"👉 Open in Typeform: https://admin.typeform.com/accounts/{account_id}/workflows/{automation_id}"
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'filter_contact_list_ids',
        type: 'array',
        required: true,
        description: `Contact list IDs that scope the trigger. Semantics depend on trigger_type:
  - CONTACT_ADDED_TO_LIST / CONTACT_REMOVED_FROM_LIST: REQUIRED. The list(s) whose add/remove events fire the trigger. Always set to the target list IDs; never null for these trigger types.
  - CONTACT_CREATED / CONTACT_PROPERTY_UPDATED: optional. Restricts firing to contacts that belong to ALL listed lists (AND). Use null for no restriction.
  - FORM_SUBMITTED: use null.
`,
      },
      {
        name: 'filter_ending_refs',
        type: 'array',
        required: true,
        description: `Form thankyou_screen refs to filter by ending field. Only applies to FORM_SUBMITTED triggers. Use null for no filter or for contact triggers.`,
      },
      {
        name: 'filter_partial_submit_refs',
        type: 'array',
        required: true,
        description: `Field refs (that exist in a form milestones) to filter by partial submission. Only applies to FORM_SUBMITTED triggers. Use null for no filter or for contact triggers.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the automation.` },
      {
        name: 'trigger_form_id',
        type: 'string',
        required: true,
        description: `Form ID for FORM_SUBMITTED trigger type. Required when trigger_type is FORM_SUBMITTED, must be null for contact triggers.`,
      },
      {
        name: 'trigger_type',
        type: 'string',
        required: true,
        description: `Type of trigger event for an automation (contact or form).`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_get_authorized_email_domains',
    description: `Get authorized email domains for the current account, typically used as senders in
an automation (workflow/flow) email step.

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The account whose authorized email domains to list.`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_get_automation',
    description: `Get automation (workflow/flow) by its ID. Returns the working state (published baseline + any pending draft operations).

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`automation_id\` — obtain via \`public_list_automations\`.

## Output
- workflow:
  - id
  - name
  - status: DRAFT | ACTIVE | PAUSED
  - entrypoint_id: ID of the first step to execute
  - steps: Array of step objects
    - id
    - type: DELAY | SEND_EMAIL | SEND_WEBHOOK | SEND_TO_INTEGRATION | TERMINATE
    - next_ids: Downstream step IDs
  - triggers: Trigger associations (id, type, enabled)
  - triggered: Total run count
- last_patch_id: Pass as last_patch_id on the next patch`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The automation's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_get_email_notification',
    description: `Get the working state of an email notification template (used by an automation/workflow/flow email step).

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`headless_form_id\` and \`template_id\` — obtain via \`public_get_automation\` (the email step's \`email_notifications\` map: key is the headless form id, value has \`template_id\`).

## Use cases
- Retrieve the current email notification content before making updates
- Inspect pending changes that haven't been published yet
- Review edit history of modifications
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'headless_form_id',
        type: 'string',
        required: true,
        description: `The ID of the headless form associated with the email notification.`,
      },
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The ID of the email notification template to retrieve.`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_get_trigger',
    description: `Get a trigger of an automation (workflow/flow) by its ID. Returns the working state (published baseline + any pending draft operations). The trigger_type determines which kind of trigger to fetch.

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`trigger_id\` and \`trigger_type\` — obtain via \`public_list_automations\` (each automation's \`triggers[].id\`/\`.type\`) or from the \`public_create_automation\` output.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'trigger_id',
        type: 'string',
        required: true,
        description: `The triggers's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
      {
        name: 'trigger_type',
        type: 'string',
        required: true,
        description: `The type of the trigger.`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_list_automations',
    description: `List all automations (workflows/flows) for the authenticated account.

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.

## Use cases
- Find an automation by name before inspecting or updating it
- Discover which automations exist for the account
- Get automation IDs needed by other tools (get_automation, publish_automation, pause_automation)
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The account that owns the automations.`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_list_referenceable_fields',
    description: `List the fields available to reference for a given automation (workflow/flow).

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`automation_id\` — obtain via \`public_list_automations\`.

## Use cases
- Discover the fields (and their refs) usable in the automation. Useful in email notifications, automation conditions, etc.

## Important notes
- When referencing a field, use its 'ref' property.
- For choice-typed fields, reference a specific option by the choice's 'ref'.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The automation's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_patch_trigger',
    description: `Patch a trigger of an automation (workflow/flow) via JSON Patch operations (add/replace/remove). See the input schema for the "value"
field's rules and for concrete examples. Prefer add/remove over replace — they're safer and more precise.

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`trigger_id\` and \`trigger_type\` — obtain via \`public_list_automations\` (each automation's \`triggers[].id\`/\`.type\`) or from the \`public_create_automation\` output.
- \`last_patch_id\` — obtain via \`public_get_trigger\`.

### Contact trigger paths
- /type, /condition
- /list_ids — only for CONTACT_ADDED_TO_LIST / CONTACT_REMOVED_FROM_LIST
- /filter_list_ids — only for CONTACT_CREATED / CONTACT_PROPERTY_UPDATED (optional AND-filter)

Switching /type requires removing the old type's fields (e.g. ADDED_TO_LIST → CREATED removes /list_ids).

### Form trigger paths
/workspace_id, /form_id, /condition, /filter_ending_refs, /filter_partial_submit_refs

## Condition two-slot layout (CRITICAL)
The condition root is either null or {"op": "and", "vars": [slot0, slot1]} with exactly 2 vars.
- slot0 (path /condition/vars/0): reserved for "becomes"/"changed" conditions. Use {"op": "always"} as a placeholder when unused.
- slot1 (path /condition/vars/1): reserved for every other condition type (is, is_not, equal, not_equal,
  begins_with, ends_with, contains, not_contains, is_any_of). Use {"op": "always"} as a placeholder when unused.
- Never put becomes/changed in slot1, never put other types in slot0, never patch /condition/vars directly.
- Nest multiple conditions within a slot under "and"/"or".
- If condition is null, "replace" /condition with the full root (both slots). To clear all conditions, "remove" /condition.

## Operators
- Comparison ops take exactly 2 vars: [field_var, value_var].
- "changed": value_var is {"type": "constant", "value": ""}.
- "is_any_of": value_var must be a JSON array, e.g. {"type": "choice", "value": ["subscribed", "unsubscribed"]}.
- The field var value is always the field "ref" (from the form or headless form), never the field "id".
- "becomes" and "changed" are only valid for CONTACT_PROPERTY_UPDATED triggers.
- Numeric comparisons (lower_than, lower_equal_than, greater_than, greater_equal_than):
  value_var must be a JSON number, e.g. {"type": "constant", "value": 3} — never the string "3".

### Ops by property type
- multiple_choice: value_var uses {"type": "choice", ...} (not "constant"). Supported: is, is_not, becomes, changed, is_any_of.
- number: equal, not_equal, lower_than, lower_equal_than, greater_than, greater_equal_than, is_any_of
  (plus becomes, changed for CONTACT_PROPERTY_UPDATED). Range comparisons take a JSON number operand.
- text (default): equal, not_equal, begins_with, ends_with, contains, not_contains, is_any_of (plus becomes, changed for CONTACT_PROPERTY_UPDATED).

Compose filters via is_any_of/and/or before treating something as unsupported.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'last_patch_id',
        type: 'string',
        required: true,
        description: `Pass as last_patch_id on next patch.`,
      },
      {
        name: 'patches',
        type: 'array',
        required: true,
        description: `Array of JSON Patch operations to apply to the trigger draft.`,
      },
      {
        name: 'trigger_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the trigger (ULID format).`,
      },
      {
        name: 'trigger_type',
        type: 'string',
        required: true,
        description: `The type of the trigger.`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_pause_automation',
    description: `Pause an automation (workflow/flow) by disabling its trigger and, optionally, its current runs.

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`automation_id\` — obtain via \`public_list_automations\`.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The automation's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
      {
        name: 'stop_existing_runs',
        type: 'boolean',
        required: true,
        description: `DESTRUCTIVE AND IRREVERSIBLE. When true, all currently running workflow executions will be permanently stopped and cannot be resumed. When false, only the trigger is disabled (no new executions will start), but existing runs continue to completion. Has no safe default — always ask the user before setting it.`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_publish_automation',
    description: `Publish an automation (workflow/flow) by enabling its trigger and publishing all drafts.

IMPORTANT: Only call this tool when the user has explicitly asked to publish, deploy, go live, enable, or activate this automation.
If the user asks to create an automation without explicitly requesting one of the above, use create_automation instead.

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`automation_id\` — obtain via \`public_list_automations\`.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The automation's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_remove_steps',
    description: `Remove one or more steps from an existing automation (workflow/flow)

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`automation_id\` — obtain via \`public_list_automations\`.
- \`step_ids\` — obtain via \`public_get_automation\` (\`workflow.steps[].id\`).
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The automation's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
      {
        name: 'step_ids',
        type: 'array',
        required: true,
        description: `The ids of the steps to remove. All must exist in the automation;`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_reorder_step',
    description: `Move an existing step to a new position in an automation (workflow/flow) in one call.

The step is relocated, not recreated: its id and full configuration are preserved.

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`automation_id\` — obtain via \`public_list_automations\`.
- \`step_id\` and \`after_step_id\` — obtain via \`public_get_automation\` (\`workflow.steps[].id\`).

## Positioning
- position: "entrypoint" (step becomes first; previous entrypoint becomes its successor) | "tail"
  (step becomes last) | "after" (placed immediately after after_step_id).
- after_step_id: required only for "after". Id of the step to follow; must not equal step_id. null for "entrypoint"/"tail".
- No "before" position: to move before step X, use "entrypoint" if X is the entrypoint, else
  "after" with after_step_id set to the step whose next_ids contains X.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'after_step_id',
        type: 'string',
        required: true,
        description: `Step id to move after; only used when position is "after". Must not equal step_id. See tool description.`,
      },
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The automation's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
      {
        name: 'position',
        type: 'string',
        required: true,
        description: `Where to move the step. See tool description for positioning rules.`,
      },
      {
        name: 'step_id',
        type: 'string',
        required: true,
        description: `The id of the existing step to move. Must exist in the automation.`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_update_delay_step',
    description: `Update an existing delay step's duration (in an automation/workflow/flow).

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`automation_id\` — obtain via \`public_list_automations\`.
- \`step_id\` — obtain via \`public_get_automation\` (\`workflow.steps[].id\`).
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The automation's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
      {
        name: 'duration',
        type: 'string',
        required: true,
        description: `Go duration string (e.g. "30m", "24h"). Must be between 10 minutes (10m) and 30 days (720h).`,
      },
      {
        name: 'step_id',
        type: 'string',
        required: true,
        description: `The id of the DELAY step to update.`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_update_email_step',
    description: `Update an existing email step (in an automation/workflow/flow) and content.

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`automation_id\` — obtain via \`public_list_automations\`.
- \`step_id\` — obtain via \`public_get_automation\` (\`workflow.steps[].id\`).

## Editable fields (only the ones you set are changed)
- subject: New subject line. Null leaves it unchanged. See "Field refs" below for dynamic content.
- body: New body HTML. See "Body HTML structure" below. Updating this value will rewrite the entire existing email body. Null leaves it unchanged.
- to: New recipient list. Email addresses for "self" scope, or "{{field:<EMAIL_FIELD_REF>}}" refs for "respondent" scope.
  Null leaves it unchanged. Defaults to first email field if to=null and scope=respondent
- scope: "self" (fixed addresses in "to") or "respondent" (email field refs in "to"). Null leaves it unchanged.
- reply_to: Reply-to addresses. Three-state: null = unchanged; {"value": ["a@b.com"]} = set; {"value": null} = clear.
- theme_id: Theme id. Three-state: null = unchanged; {"value": "x"} = set; {"value": null} = clear.
- sender: Sender email — who the email is FROM (not reply_to). Three-state: null = unchanged;
  {"value": "from@acme.com"} = set a custom sender; {"value": null} = reset to the default sender
  

## Field refs (dynamic content)

CRITICAL: Use the field's 'ref' property (from list_referenceable_fields)

Mustache syntax \`{{field:<FIELD_REF>}}\` works in three placements:
- Subject: plain mustache, e.g. \`"Welcome {{field:01KH3G1C7Z5SVWQ3ZATVHEDAWE}}"\`
- "to" array entries: plain mustache (the respondent's email field, for "respondent" scope)
- Body HTML: must be wrapped in a span (see below)

## Body HTML structure

These are strict rules, not general guidelines. Always follow these:

All body content MUST be wrapped in \`<div id="email-builder">...</div>\` — the email renderer requires this.

### Field reference span (body only)

\`\`\`html
<span data-ref="FIELD_REF" data-title="FIELD_NAME" data-variable-type="field">{{field:FIELD_REF}}</span>
\`\`\`

- \`data-ref\`: field ref (not id)
- \`data-title\`: human-readable field name (e.g., "Email", "Name")
- \`data-variable-type\`: must be \`"field"\`
- Inner text: \`{{field:FIELD_REF}}\`

### CTA buttons

When the user requests a button, CTA, call to action, action link, or similar, use this exact
structure inside the body:

\`\`\`html
<p data-id="UUID" class="email-cta-wrapper"><a href="URL" target="_blank" rel="noopener noreferrer nofollow" class="email-cta" >LABEL</a></p>
\`\`\`

- \`data-id\`: unique UUID v4 on the \`<p>\`
- \`class="email-cta-wrapper"\` on the \`<p>\` (required)
- \`href\`: destination URL on the \`<a>\`
- \`target="_blank" rel="noopener noreferrer nofollow"\` on the \`<a>\` (required)
- \`class="email-cta"\` on the \`<a>\` (required)
- Inner text of \`<a>\`: button label

### Plain links

For a plain inline hyperlink (no button styling), use this structure inside the body:

\`\`\`html
<p data-id="UUID" class=""><a href="URL" target="_blank" rel="noopener noreferrer nofollow">LINK_TEXT</a></p>
\`\`\`

- \`data-id\`: unique UUID v4 on the \`<p>\`
- \`href\`: destination URL on the \`<a>\`
- \`target="_blank" rel="noopener noreferrer nofollow"\` on the \`<a>\` (required)
- No \`class\` on the \`<a>\` (distinguishes link from CTA button)
- Inner text of \`<a>\`: link label (often the URL itself)

Use plain links for inline references; use the CTA structure above when the user asks for a button
or prominent call-to-action.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The automation's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `New email body HTML, wrapped in <div id="email-builder">...</div>. Always follow the formatting rules found in the tool description. Null leaves it unchanged.`,
      },
      {
        name: 'persist',
        type: 'string',
        required: true,
        description: `Lifecycle event on which to persist a copy of the dispatched email. Null leaves it unchanged; empty string disables persistence.`,
      },
      {
        name: 'reply_to',
        type: 'string',
        required: true,
        description: `Three-state field edit. null = leave untouched; {"value": [...]} = set; {"value": null} = clear.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `"self" sends to the fixed addresses in "to"; "respondent" sends to the email field refs in "to". Null leaves it unchanged.`,
      },
      {
        name: 'sender',
        type: 'string',
        required: true,
        description: `Three-state field edit. null = leave untouched; {"value": "x"} = set to x; {"value": null} = clear.`,
      },
      {
        name: 'step_id',
        type: 'string',
        required: true,
        description: `The id of the SEND_EMAIL step to update.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `New email subject line. Null leaves it unchanged.`,
      },
      {
        name: 'theme_id',
        type: 'string',
        required: true,
        description: `Three-state field edit. null = leave untouched; {"value": "x"} = set to x; {"value": null} = clear.`,
      },
      {
        name: 'to',
        type: 'array',
        required: true,
        description: `New recipient list (email addresses, or "{{field:<EMAIL_FIELD_ID>}}" refs for respondent scope). Null leaves it unchanged. Defaults to first email field if to=null and scope=respondent`,
      },
    ],
  },
  {
    name: 'typeformmcp_automations_public_update_webhook_step',
    description: `Update an existing webhook (SEND_WEBHOOK) step's configuration (in an automation/workflow/flow) in one call, without delete + re-add.

## Prerequisites
- \`account_id\` — obtain via \`accounts-list_accounts\`.
- \`automation_id\` — obtain via \`public_list_automations\`.
- \`step_id\` — obtain via \`public_get_automation\` (\`workflow.steps[].id\`).

## Required parameters
- automation_id: The ID of the automation containing the step.
- step_id: The id of the SEND_WEBHOOK step to update.

## Editable fields
- url: New HTTPS endpoint for deliveries. Pass null to leave it unchanged.
- verify_ssl: Whether to verify the destination's SSL certificate. Pass null to leave it unchanged.
- secret: Shared secret used to sign deliveries. This is a three-state field:
  - null: leave the secret unchanged.
  - {"value": "my-secret"}: set the secret.
  - {"value": null}: clear the secret.
  The secret is write-only and is never returned in the output.

At least one of url, verify_ssl, or secret must change. Errors if step_id is unknown or is not a webhook step.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization.`,
      },
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The automation's ULID (e.g., '01H3JY5FWFM3YXBCPF2BQ9JYZ2')`,
      },
      {
        name: 'secret',
        type: 'string',
        required: true,
        description: `Three-state field edit. null = leave untouched; {"value": "x"} = set to x; {"value": null} = clear.`,
      },
      {
        name: 'step_id',
        type: 'string',
        required: true,
        description: `The id of the SEND_WEBHOOK step to update.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `New HTTPS endpoint for webhook deliveries. Null leaves it unchanged.`,
      },
      {
        name: 'verify_ssl',
        type: 'boolean',
        required: true,
        description: `Whether to verify the destination's SSL certificate. Null leaves it unchanged.`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_bulk_create_contacts_lists',
    description: `Create one or more contacts lists (segments) in the Contacts database in a single call.

Always use this tool to create contacts lists, even when creating just one — pass a single-element \`lists\` array.

## Use cases
- Create one or several segments to organize contacts
- Create lists with custom filter, sort, or table column settings

## Inputs
- lists (required): An array of list definitions. Each item contains:
  - name (required): The list's name (max 255 characters)
  - settings (required, nullable): Filter, sort, and table column configuration. Pass null for a list with no filters.
- Maximum 100 lists per call.

## Output format
Confirm the created lists to the user, including each list's name and ID.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'lists',
        type: 'array',
        required: true,
        description: `Array of list definitions to create. Always pass an array, even for a single list.`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_bulk_create_custom_contacts_database_properties',
    description: `Create multiple custom properties on the user's Contacts database schema in a single operation.

Use this tool when you need to create several custom fields at once, for example when setting up form-to-contact mappings that require multiple new properties.

## What this tool does
- Creates multiple new custom properties in one call, available on all contacts.

## What this tool cannot do
- Create standard Typeform contact properties (Bio, Company, Job Title, etc.).
  To activate disabled standard properties, use the
  enable_standard_contacts_database_properties tool instead.

## Inputs
- properties: An array of property definitions, each containing:
  - name: The name for the new property (must be unique).
  - type: The property type. The type is permanent and cannot be changed after creation.
    - long_text: General text (default)
    - email: Email addresses
    - number: Numeric values
    - phone_number: Phone numbers
    - timestamp: Date values
    - text_list: Multiple choice options (configure with constraints)
  - constraints: Optional. Used with text_list to define choices and selection limits.
    - choices: Array of {label, value} objects.
    - min_selected: Minimum selections required.
    - max_selected: Maximum selections allowed. Set to 1 for single choice.

## Output
- The list of created properties.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'properties',
        type: 'array',
        required: true,
        description: `Array of property definitions to create`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_bulk_upsert_contacts',
    description: `Create or update multiple contacts in the user's Contacts database in a single operation.

Use this tool when the user wants to add, create, update, or import several contacts at once.

## What this tool does
- For each contact, if a contact with the same identifier (e.g. email) already exists, it updates that contact's properties. Otherwise, it creates a new contact.
- Processes contacts in batches for efficiency.
- Deduplicates contacts within the same call by identifier, merging properties forward.

## Inputs
- contacts: An array of contact definitions, each containing:
  - properties: Contact field values as property ID and value pairs.
    - At least one identifying property (e.g. email) is required per contact.
  - Maximum 1000 contacts per call.

## Output
- The list of created or updated contacts. Each contact includes its id, identifier (value that uniquely identifies the contact) and an array of associated contact properties.

## Property Value Formats
When providing property values, use the following formats based on property type:
- Text (email, short_text, long_text, phone_number, code): {"type": "text", "text": "value"}
- Number: {"type": "number", "number": 42.0}
- Timestamp: {"type": "timestamp", "timestamp": "2024-01-15T00:00:00Z"}
- Select (single_select, multi_select, text_list): {"type": "text_list", "text_list": ["option1"]}
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'contacts',
        type: 'array',
        required: true,
        description: `Array of contact definitions to create or update`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_create_contact',
    description: `Create a new contact in the user's Contacts database.

Use this tool when the user wants to add, create, or register a new contact.

## What this tool does
- Creates a single contact with the provided properties.

## Inputs
- properties: Contact field values as property ID and value pairs.
  - At least one identifying property (e.g. email) is required.

## Output
- The created contact. Includes its id, identifier (value that uniquely identifies the contact) and an array of associated contact properties.

## Property Value Formats
When providing property values, use the following formats based on property type:
- Text (email, short_text, long_text, phone_number, code): {"type": "text", "text": "value"}
- Number: {"type": "number", "number": 42.0}
- Timestamp: {"type": "timestamp", "timestamp": "2024-01-15T00:00:00Z"}
- Select (single_select, multi_select, text_list): {"type": "text_list", "text_list": ["option1"]}
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'properties',
        type: 'array',
        required: true,
        description: `Array of property ID and value pairs`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_create_contacts_list',
    description: `Create a new contacts list (segment) in the Contacts database.

## Use cases
- Create a new segment to organize contacts
- Create a list with custom filter and sort settings

## Input
- name (required): The name for the new contacts list (max 255 characters)
- settings (required, nullable): Filter, sort, and table column configuration. Pass null for a list with no filters.

## Output format
Confirm the created list to the user, including its name and ID.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name for the new contacts list`,
      },
      { name: 'settings', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_create_form_property_mappings',
    description: `Create a form property mapping (sync config) to connect a form to contact properties.

## Use cases
- Map form fields and variables to contact properties

## Prerequisites
Before using this tool, call get_form_property_compatibility with the form_id to get:
- Available form fields and variables with their IDs
- Compatible contact properties for each form field/variable
- Available choices for each field (in the choices array)

## Mapping to subscription status
When mapping a field to the subscription status property
(template_id: "contacts.subscription_status"), you MUST include
value_maps to translate form answers to subscription status values.

### For checkbox fields (choice-based — use choice_id):
Checkbox fields produce choice answers, NOT boolean. Use source.type "choice_id" with the choice ID from the field's choices array.
A single-choice checkbox (e.g. marketing consent) maps the checked choice to "subscribed":
  value_maps: [
    {source: {type: "choice_id", choice_id: "<consent-choice-id>"}, target: {type: "text_list", text_list: ["subscribed"]}}
  ]

### For multiple_choice / picture_choice fields (choice-based — use choice_id):
Use source.type "choice_id" with the choice ID from the field's choices array:
  value_maps: [
    {source: {type: "choice_id", choice_id: "<yes-choice-id>"}, target: {type: "text_list", text_list: ["subscribed"]}},
    {source: {type: "choice_id", choice_id: "<no-choice-id>"}, target: {type: "text_list", text_list: ["never_subscribed"]}}
  ]

### For yes_no / legal fields (boolean answer type — use boolean):
These are the only truly boolean fields. Use source.type "boolean":
  value_maps: [
    {source: {type: "boolean", boolean: true}, target: {type: "text_list", text_list: ["subscribed"]}},
    {source: {type: "boolean", boolean: false}, target: {type: "text_list", text_list: ["never_subscribed"]}}
  ]

## Output format
Present the created form property mapping to the user.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the form to connect`,
      },
      {
        name: 'mapping',
        type: 'array',
        required: true,
        description: `Array of property ID to mapping configuration pairs`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_delete_contact',
    description: `Delete a contact from the Contacts database.

## Prerequisites
- Call list_contacts first to find the contact ID you want to delete.

## Input
- contact_id (required): The ID of the contact to delete

## Output format
Confirm the deletion was successful.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The ID of the contact to delete`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_delete_contacts_database_properties',
    description: `Delete multiple properties from the Contacts database schema in a single operation.

WARNING: This action is irreversible. Either all properties are deleted successfully, or none are deleted (all-or-nothing).

## Use cases
- Remove multiple properties that are no longer needed in one operation
- Clean up unused properties efficiently
- Batch deletion when reorganizing contact schema

## Restrictions (same as single delete)
- Properties with prevent_delete: true cannot be deleted (e.g. Subscription Status)
- The identifier property cannot be deleted (at least one identifier must remain)
- All-or-nothing: If ANY property fails validation, NO properties are deleted

## Side effects (same as single delete)
- Lists/segments: Deletion will fail if any list references ANY of these properties in its filters, sort orders, or visible columns — those lists must be updated first
- Contact data: Existing values for deleted properties are not removed from contacts, but become inaccessible
- Form mappings: Any form sync mappings targeting deleted properties will silently stop populating them
- Enrichment: Enrichment configurations referencing deleted properties stop being applied

## Input
- property_ids (required): Array of property IDs to delete (use list_contacts_database_properties to find IDs). Must contain at least one property ID.

## Output format
Confirm all properties were successfully deleted with the count of deleted properties.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'property_ids',
        type: 'array',
        required: true,
        description: `Array of property IDs to delete`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_delete_contacts_database_property',
    description: `Delete a property from the Contacts database schema.

WARNING: This action is irreversible.

## Use cases
- Remove a property that is no longer needed
- Clean up unused properties from the contacts schema

## Restrictions
- Properties with prevent_delete: true cannot be deleted (e.g. Subscription Status)
- The identifier property cannot be deleted

## Side effects
- Lists/segments: Deletion will fail if any list references this property in its filters, sort orders, or visible columns — those lists must be updated first
- Contact data: Existing values for the deleted property are not removed from contacts, but become inaccessible
- Form mappings: Any form sync mappings targeting this property will silently stop populating it
- Enrichment: Enrichment configurations referencing this property stop being applied

## Input
- property_id (required): The ID of the property to delete (use list_contacts_database_properties to find IDs)

## Output format
Confirm the deletion was successful.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'property_id',
        type: 'string',
        required: true,
        description: `The ID of the property to delete`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_delete_contacts_list',
    description: `Delete a contacts list (segment) from the Contacts database.

## Use cases
- Remove a segment that is no longer needed
- Clean up unused lists

## Input
- list_id (required): The ID of the contacts list to delete

## Output format
Confirm the deletion was successful.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the contacts list to delete`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_delete_form_property_mappings',
    description: `Delete a form property mapping (sync config) by its ID.

## Use cases
- Remove form property mappings that are no longer needed

## Input
- sync_config_id (required): The ID of the sync config to delete

## Output format
Confirms the deletion was successful.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'sync_config_id',
        type: 'string',
        required: true,
        description: `The ID of the sync config to delete`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_enable_standard_contacts_database_properties',
    description: `Activate disabled standard properties on the user's Contacts database.

Use this tool when you need to enable standard (built-in) properties
that are currently disabled, for example before creating a
form-to-contact mapping that references them.

## What this tool does
- Activates one or more disabled standard properties so they become
  visible and usable.
- Only works on standard properties (those with a template_id).
- Properties that are already enabled are returned unchanged.

## Inputs
- property_ids: An array of property IDs to enable.

## Output
- The list of enabled properties.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'property_ids',
        type: 'array',
        required: true,
        description: `An array of property IDs to enable`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_get_contact',
    description: `Get a single contact by ID with property metadata included.

Use this tool when you need to fetch a specific contact and want property names/types without a separate API call.

## What this tool does
- Returns a single contact with all its properties
- Property metadata (name, type, template_id) is automatically included
- No need to call list_contacts_database_properties separately

## Inputs
- contact_id: The UUID of the contact to fetch

## Output
- id: Contact UUID
- identifier: Primary identifier value (e.g., email address)
- properties: Array of properties, each with:
  - property_id: The property UUID
  - value: The property value
  - name: Human-readable property name (e.g., "Email", "Name")
  - type: Property type (e.g., "email", "short_text", "number")
  - template_id: Standard property template ID (null for custom properties)
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The UUID of the contact to fetch`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_get_contacts_database_properties',
    description: `Get specific contact properties by their IDs.

Use this tool when you need information about specific properties, particularly for validation before performing operations like deletion.

## Use cases
- Fetch property names to show users what will be affected by an operation
- Validate that property IDs exist before performing actions
- Get detailed information about specific properties without fetching all properties

## Input
- property_ids (required): Array of property IDs to retrieve. Use list_contacts_database_properties to discover available property IDs.

## Output
- Returns an array of properties that were found. Properties that don't exist are silently omitted.
- Each property includes: id, name, type, icon, identifier flag, template_id, constraints, default value, and other metadata.

## Important notes
- If a property ID doesn't exist, it won't appear in the results (no error is returned)
- Duplicate property IDs in the input are automatically deduplicated
- To check if all requested properties exist, compare the number of results with the number of requested IDs
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'property_ids',
        type: 'array',
        required: true,
        description: `Array of property IDs to retrieve`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_get_contacts_list',
    description: `Get detailed properties of a specific contacts list (segment).

Use this tool to inspect a list before performing operations like deletion, or to understand the list's configuration.

## What this tool does
- Retrieves a list's metadata (ID, name, timestamps)

## Input
- list_id (required): The ID of the contacts list to retrieve

## Output
- id: The list's unique identifier
- name: The list's human-readable name
- created_at: When the list was created (ISO 8601 timestamp)
- updated_at: When the list was last modified (ISO 8601 timestamp)

## Common Use Cases
- Confirm list details before deletion: "Show me details for list abc-123 before I delete it"
- Review list metadata: "What is the name of list xyz-456?"
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the contacts list to retrieve`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_get_form_property_compatibility',
    description: `Get compatible property mappings for a form.

## Use cases
- Preparing to create a mapping between a form and contact properties

## Input format
Provide the form_id of the form you want to map to contact properties.

## Output format
Returns compatible properties for each form field and variable:

1. **field_compatibilities**: For each form field, the field and list of contact properties it can be mapped to
2. **variable_compatibilities**: For each form variable, the variable and list of contact properties it can be mapped to

Each field includes a **choices** array:
- For **multiple_choice**, **picture_choice**, **dropdown**, **ranking** fields: contains the actual choice options with their IDs and labels from the form definition.
- For **checkbox** fields: contains the actual choice options from the form (checkbox is choice-based, NOT boolean).
- For **yes_no** and **legal** fields: contains synthesized boolean choices [{id:"true", label:"Yes"}, {id:"false", label:"No"}].
- For other field types: empty array.

Use these choice IDs when constructing value_maps for the create_form_property_mappings tool.

The compatible_properties lists may include disabled standard
properties (disabled: true, template_id is set). These are inactive
built-in properties. To activate them, use the
enable_standard_contacts_database_properties tool with their
property IDs. Always prefer standard properties over creating
new custom ones.

Use these to determine valid mappings when creating a sync config.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the form to get property mappings for`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_get_form_property_mappings',
    description: `Get the property mappings (sync config) for a specific form.

## Use cases
- View how a form's fields are mapped to contact properties
- Check if a form has an existing mapping configured

## Input format
Provide the form_id of the form you want to get mappings for.

## Output format
Returns the sync config for the form
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the form to get property mappings for`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_get_form_property_mappings_by_id',
    description: `Get form property mapping details by sync config ID.

Use this tool to inspect a form property mapping before performing operations like deletion.

## What this tool does
- Retrieves sync config metadata (ID, form ID, type, active status, timestamps)
- Lists all form field to property mappings

## Input
- sync_config_id (required): The ID of the form property mapping to retrieve

## Output
- id: The sync config's unique identifier
- form_id: The form/smart form ID this mapping is associated with
- form_name: The name/title of the form (empty if form no longer exists or for CSV type)
- type: The sync config type (form, smart_form, or csv)
- active: Whether the mapping is currently active
- created_at: When the mapping was created (ISO 8601 timestamp)
- updated_at: When the mapping was last modified (ISO 8601 timestamp)
- mappings: Array of field mappings showing which form fields map to which properties

## Common Use Cases
- Confirm mapping details before deletion: "Show me details for sync config abc-123 before I delete it"
- Verify which form a mapping belongs to: "Which form does sync config xyz-456 map to?"
- See what fields are mapped: "What mappings exist in sync config xyz-456?"
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'sync_config_id',
        type: 'string',
        required: true,
        description: `The ID of the form property mapping to retrieve`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_import_form_responses_by_mapping',
    description: `Schedule an import of form responses into contacts using an existing form property mapping (sync config).

## Use cases
- Import form responses into contacts after a form property mapping has been created or updated
- Re-import form responses to pick up new submissions

## Input
- account_id (required): The ID of the Organization
- sync_config_id (required): The ID of the form property mapping (sync config) to use for the import. Use list_form_property_mappings to find existing sync configs.

## Output format
Confirms the import has been scheduled successfully.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'sync_config_id',
        type: 'string',
        required: true,
        description: `The ID of the form property mapping (sync config) to use for the import`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_list_contacts',
    description: `List contacts from the user's Contacts database.

Use this tool when the user wants to see, search, or find contacts.

## What this tool does
- Returns contacts matching the specified criteria with pagination.

## Inputs
- segment_id: a saved list ID, or null. If provided, uses the list's filters and sort.
- filters: filter criteria, or null for no filtering. Only used when segment_id is null.
- sort: sort order, or null for newest first. Only used when segment_id is null.
- page: page number, starting at 1.
- page_size: results per page.

## Output
- total_count: Total contacts matching the criteria.
- items: An array of contacts matching the criteria. Each includes its id, identifier (value that uniquely identifies the contact) and an array of associated contact properties.

## Default pagination
- page=1, page_size=25.

## Understanding Filters
### Structure
- Filters use a two-level group structure:
  - Root: operator (and/or) + filter_groups array
  - Each filter_group: operator (and/or) + filters array
  - Each filter: property_id, operator, value, negate

### Semantics:
- Root operator=and: contact must match ALL groups
- Root operator=or: contact must match ANY group
- Group operator=and: ALL filters in the group must match
- Group operator=or: ANY filter in the group must match

### Filter operators by property type
- Text (email, short_text, long_text, phone_number, code): equals, starts_with, ends_with, contains, empty, any_of
- Number: equals, greater_than, less_than, empty
- Timestamp: equals, greater_than, less_than, empty
- Select (single_select, multi_select, text_list): equals, contains, empty
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'filters',
        type: 'string',
        required: true,
        description: `Optional filters to apply when listing contacts`,
      },
      {
        name: 'page',
        type: 'integer',
        required: true,
        description: `Page number for pagination (default is 1)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: true,
        description: `Number of contacts per page (max 100; useful to set to 0 to get only the total count)`,
      },
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: `The ID of the segment to list contacts from`,
      },
      {
        name: 'sort',
        type: 'array',
        required: true,
        description: `Optional sort orders to apply when listing contacts; default is created_at desc`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_list_contacts_database_properties',
    description: `List all contact properties in the user's Contacts database.

Use this tool when the user asks about their contact properties/fields or schema.

## What this tool does
- Returns all properties defined for contacts.

## Output
- An array of contact properties. Each includes its id, name, type, and flags for how it can be used.

## Understanding Contact Property Fields
- identifier: true → Indicates this is a primary identifier field (e.g., email). It is required when creating a contact.
- template_id has a value → Indicates the property is a standard (built-in) Typeform property rather than a custom property.
- immutable: true → Means the property definition itself cannot be modified (e.g., its name or type).
- disabled: true → Indicates the property is inactive or hidden.
  Ignore disabled properties when displaying to the user. To activate
  a disabled standard property, use the
  enable_standard_contacts_database_properties tool.
- prevent_delete: true → Indicates the property cannot be deleted.
- default → The default value assigned to the property. Informational.
- constraints.choices → For select-type properties, defines the available options.
- valid_filter_operators → The comparison operators valid for filtering by this property. Always use one of these operators to avoid errors.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_list_contacts_lists',
    description: `List all saved contact lists in the user's Contacts database.

Use this tool when the user wants to see their saved contact lists.

## What this tool does
- Returns all saved lists with their names and filter settings.

## Output
- An array of lists. Each includes its id, name, and settings.

## Understanding Filters
### Structure
- Filters use a two-level group structure:
  - Root: operator (and/or) + filter_groups array
  - Each filter_group: operator (and/or) + filters array
  - Each filter: property_id, operator, value, negate

### Semantics:
- Root operator=and: contact must match ALL groups
- Root operator=or: contact must match ANY group
- Group operator=and: ALL filters in the group must match
- Group operator=or: ANY filter in the group must match

### Filter operators by property type
- Text (email, short_text, long_text, phone_number, code): equals, starts_with, ends_with, contains, empty, any_of
- Number: equals, greater_than, less_than, empty
- Timestamp: equals, greater_than, less_than, empty
- Select (single_select, multi_select, text_list): equals, contains, empty
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_list_form_property_mappings',
    description: `List all form property mappings (sync configs) for the Contacts database.

## Use cases
- View all configured form-to-contact property mappings

## Output format
Present the list of form property mappings to the user.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_update_contact',
    description: `Update an existing contact in the user's Contacts database.

Use this tool when the user wants to modify, change, or update a contact's information.

## What this tool does
- Updates the contact with only the properties provided; others remain unchanged.

## Inputs
- contact_id: The ID of the contact to update.
- properties: Contact field values as property ID and value pairs. Only include fields to change.

## Output
- The updated contact.

## Property Value Formats
When providing property values, use the following formats based on property type:
- Text (email, short_text, long_text, phone_number, code): {"type": "text", "text": "value"}
- Number: {"type": "number", "number": 42.0}
- Timestamp: {"type": "timestamp", "timestamp": "2024-01-15T00:00:00Z"}
- Select (single_select, multi_select, text_list): {"type": "text_list", "text_list": ["option1"]}
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The ID of the contact to update. Use list_contacts to find contact IDs.`,
      },
      {
        name: 'properties',
        type: 'array',
        required: true,
        description: `Array of property ID and value pairs`,
      },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_update_contacts_list',
    description: `Update an existing contacts list (segment) in the Contacts database.

## Use cases
- Rename a segment
- Update a segment's filter, sort, or table column settings

## Input
- list_id (required): The ID of the contacts list to update
- name (required): The name for the contacts list (can be unchanged)
- settings (required, nullable): Filter, sort, and table column configuration. Pass null to keep existing settings unchanged.

## Output format
Confirm the updated list to the user, including its new name and settings.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the contacts list to update`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name for the contacts list`,
      },
      { name: 'settings', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_update_form_property_mappings',
    description: `Update an existing form property mapping (sync config).

## Use cases
- Add new field/variable mappings to an existing form connection
- Change which contact properties form fields/variables map to
- Remove mappings by excluding them from the update

## Prerequisites
- Use list_form_property_mappings or get_form_property_mappings to get the sync_config_id                                                                                          
- IMPORTANT: Use get_form_property_compatibility with the form_id to discover which form fields and variables can map to which contact properties   

## Important
The mapping provided replaces the existing mapping entirely.
To preserve existing mappings while adding new ones, include all desired mappings in the request.

## Output format
Present the updated form property mapping to the user.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Organization`,
      },
      {
        name: 'mapping',
        type: 'array',
        required: true,
        description: `Array of property ID to mapping configuration pairs`,
      },
      {
        name: 'sync_config_id',
        type: 'string',
        required: true,
        description: `The ID of the sync config to update`,
      },
    ],
  },
  {
    name: 'typeformmcp_forms_public_create_form',
    description: `Create a new Typeform form.

## Use cases
- Create a blank form to start building a survey or quiz
- Create a form in a specific workspace

## Parameters
- account_id: Account ID (required)
- title: The title of the form (required)
- workspace: Workspace href URL, e.g. "https://api.typeform.com/workspaces/abc123" (required)

## Output
Returns the created form with its ID, title, workspace, theme, and other metadata.
The form is created as unpublished (empty, no content).

## After creating a form
After calling this tool, respond with this conversational format:

Done — I've created a blank Typeform titled "{title}" in your workspace.

One thing to flag: the current version of the Typeform connector can create the form, but
it can't add questions or content to it yet — so right now it's empty. To add content,
open it in the builder:

👉 Open in the builder: https://admin.typeform.com/form/{form_id}/create

The fastest way to build it out is with Typeform AI, right inside the builder. Once you're
in, start with Typeform AI and paste this prompt:

{Generate a detailed prompt here as a separate paragraph based on what the user described:
form type, purpose, key fields. Keep it clear and actionable.}

That'll generate the questions, logic, and screens in a few seconds. Want me to tailor
the prompt to a specific audience or adjust the fields first?

Do NOT provide the public form URL (the form is empty and unpublished).
Do NOT suggest adding fields via subsequent API calls — that capability does not exist yet.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID (required)` },
      { name: 'title', type: 'string', required: true, description: `Form title (required)` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `Workspace href URL, e.g. https://api.typeform.com/workspaces/abc123 (required)`,
      },
    ],
  },
  {
    name: 'typeformmcp_forms_public_delete_form',
    description: `Delete/remove a form based on its ID.

## Use cases
- Remove a form that is no longer needed
- Clean up test forms

## Parameters
- id: The form ID to delete (required)

## Output
Returns empty response on success.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID (required)` },
      { name: 'id', type: 'string', required: true, description: `Form ID to delete (required)` },
    ],
  },
  {
    name: 'typeformmcp_forms_public_duplicate_form',
    description: `Duplicate an existing Typeform form.

Creates a new form that is a copy of the source form. The new form is unpublished
regardless of the source form's published state.

## Prerequisites
- form_id: Required. Call forms-public_list_forms to find it, or use the id returned by forms-public_create_form.
- account_id: Required. Call accounts-list_accounts to obtain this value if not already known.

## What is preserved
- All fields, logic, variables, hidden fields
- Theme, settings, welcome/thank-you/consent screens, outcome, CUI settings
- Attachments, layouts, and media (re-referenced to the new form)
- Knowledge entries (duplicated with remapped IDs)
- Translations/messages (best-effort; may be absent if copying fails)

## What is reset
- New form ID and timestamps (CreatedAt, UpdatedAt)
- PayPal merchant_id and Google Calendar calendar_id are cleared
- Email consent notification config reset to account default
- Form is always created as unpublished (IsPublic = false)

## Parameters
- account_id: Account ID (required)
- form_id: ID of the source form to duplicate (required)
- title: Title for the new form. Omit to inherit the source form's title.
- workspace_id: Workspace for the new form. Always ask the user which workspace to duplicate
  into before calling this tool.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID (required)` },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `ID of the form to duplicate (required)`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title for the new form. Omit or null to inherit the source form's title.`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `Workspace ID for the new form. Required — always ask the user which workspace to duplicate into.`,
      },
    ],
  },
  {
    name: 'typeformmcp_forms_public_get_capabilities',
    description: `Return the capability matrix for the Typeform form editing tools.

Call once before authoring any ops, and use the response instead of guessing field types, op names, or validation keys.

### Response fields
- supported_types: field types accepted by forms-public_patch_form
- container_types: types that accept nested fields. Containers have no settable property keys
  and do not appear in property_keys_by_type. Their children are managed via add_field (set
  parent_ref to the container's ref), move_field (move an existing field into the container via
  parent_ref, or reorder within it via before_ref), and delete_field — not through a properties bag.
- choice_bearing_types / choices_required_on_add: types that carry or require choices
- validation_keys_by_type: accepted validation keys per field type
- property_keys_by_type: accepted property keys per field type
- patch_ops: op verbs grouped by domain (field / logic)
- condition_ops_by_type: valid ops per field type. Use this to author logic rules.
- logic_actions: accepted action types for logic rules
- error_codes / side_effect_codes / concurrency_codes: with recovery hints`,
    params: [],
  },
  {
    name: 'typeformmcp_forms_public_get_form',
    description: `Retrieve a form.

Always call get_form before patch_form so you are working from the current state.

## Parameters
- id: The form ID (required)
- view: one of
    - "skeleton" — id, title, field refs+types+titles, thankyou_screens, and welcome_screen.
      Container fields include their nested children inline under "fields", so the agent sees
      nested refs without drilling. Cheapest read.
    - "fields" — drill-down into specific fields. Requires "refs" (list of field refs, max 50).
      Looks up refs at any depth. Returns the same per-field shape as "full" but only for the
      requested refs, plus a "missing" array for refs not found.
    - "full" (default) — the complete form including settings, theme, logic. Use sparingly; this is the most expensive read.
- refs: list of field refs (only used when view="fields"). Max 50 per call.

Typical workflow: skeleton to find the field, fields to read its details, then patch_form to edit it.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID (required)` },
      { name: 'id', type: 'string', required: true, description: `Form ID (required)` },
      {
        name: 'refs',
        type: 'array',
        required: true,
        description: `Field refs to drill into (used only when view=fields). Max 50 per call.`,
      },
      {
        name: 'view',
        type: 'string',
        required: true,
        description: `skeleton: compact map of the form — id, title, and each field's ref/type/title/required/choice_count/rule_count. Container fields include their nested children inline under \`fields\`, so the agent sees nested refs without drilling. rule_count shows how many logic rules are triggered by that field (omitted when 0). Drops property bags, choice labels, theme, settings, and layout.
fields: drill-down. Requires \`refs\`. Returns the same per-field shape as \`full\` but only for the requested refs, plus a \`missing\` array for refs not found.
full (default): complete form including settings, theme, logic.
`,
      },
    ],
  },
  {
    name: 'typeformmcp_forms_public_list_forms',
    description: `List forms owned by your user.

## Use cases
- Browse all forms in your account
- Search for forms by title
- Filter forms by workspace
- Paginate through large form collections

## Parameters
- search: Filter forms by title (partial match, optional)
- page: Page number starting from 1 (default: 1)
- page_size: Number of forms per page (default: 10, max: 200)
- sort_by: Sort field - "created_at", "title", or "last_updated_at" (default: "created_at")
- order_by: Sort order - "asc" or "desc" (default: "desc")
- workspace_id: Filter by workspace ID (optional)

## Output
Returns paginated list of forms with total count and form metadata.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID (required)` },
      { name: 'order_by', type: 'string', required: true, description: `Sort order: asc or desc` },
      { name: 'page', type: 'integer', required: true, description: `Page number (default: 1)` },
      {
        name: 'page_size',
        type: 'integer',
        required: true,
        description: `Items per page (default: 10, max: 200)`,
      },
      {
        name: 'search',
        type: 'string',
        required: true,
        description: `Filter by title (partial match)`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: true,
        description: `Sort field: created_at, title, or last_updated_at`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `Filter by workspace ID`,
      },
    ],
  },
  {
    name: 'typeformmcp_forms_public_patch_form',
    description: `Commit a validated batch of patch operations to a form draft.

Must be preceded by forms-public_validate_patch; pass the same ops plus its validation_token. If this call fails, re-validate for a fresh token.
On CONCURRENT_REQUESTS_CONFLICT: discard the token, re-read with forms-public_get_form, re-validate, and retry.

Changes land on the draft only; a published form needs forms-public_publish_form for them to go live.
When reporting success to the user, describe what changed rather than quoting patch IDs or version numbers unless they ask.

## Prerequisites
- form_id: Required. Call forms-public_list_forms to find it, or use the id returned by forms-public_create_form.
- account_id: Required. Call accounts-list_accounts to obtain this value if not already known.

### Parameters
- account_id: Account ID (required)
- form_id: The form ID (required)
- ops: The same ops passed to forms-public_validate_patch (required)
- validation_token: The token returned by forms-public_validate_patch (required)`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID (required)` },
      { name: 'form_id', type: 'string', required: true, description: `Form ID (required)` },
      {
        name: 'ops',
        type: 'array',
        required: true,
        description: `Same ops array passed to validate_patch. Required.`,
      },
      {
        name: 'validation_token',
        type: 'string',
        required: true,
        description: `Token returned by validate_patch. Required.`,
      },
    ],
  },
  {
    name: 'typeformmcp_forms_public_publish_form',
    description: `Make the form live and publicly accessible. Each call promotes the draft and snapshots a new version,
so only call when the user explicitly wants to go live; never to re-confirm. Drafts save automatically,
so this is not a save. Resolve form names to IDs with forms-public_list_forms.

## Prerequisites
- form_id: Required. Call forms-public_list_forms to find it, or use the id returned by forms-public_create_form.
- account_id: Required. Call accounts-list_accounts to obtain this value if not already known.

### Parameters
- account_id: Account ID (required)
- form_id: Form ID to publish (required)

### Errors
- PAYMENT_REQUIRED: plan-gated features are blocking. Tell the user which, in plain language, and suggest upgrading or removing them.

### Output
form_id, version, share_url. An empty share_url still means success; fetch the URL via forms-public_get_form.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID (required)` },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `Form ID to publish (required)`,
      },
    ],
  },
  {
    name: 'typeformmcp_forms_public_update_form_metadata',
    description: `Update the form title. Takes effect immediately on the live form - no publish needed.
## Prerequisites
- form_id: Required. Call forms-public_list_forms to find it, or use the id returned by forms-public_create_form.
- account_id: Required. Call accounts-list_accounts to obtain this value if not already known.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID (required)` },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `Form ID to update (required)`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `New form title. Omit or null to leave unchanged. Must be non-empty if provided.`,
      },
    ],
  },
  {
    name: 'typeformmcp_forms_public_validate_patch',
    description: `Validate a batch of patch operations against a form draft without persisting anything.

IMPORTANT: This does not save. You MUST call forms-public_patch_form with the returned validation_token immediately after to persist.
If side_effects is non-empty, explain them to the user in plain language and warn them before committing.

Ops run sequentially in memory, so order add_field / add_ending before any add_logic ops that reference them;
anything not committed and not earlier in the batch does not exist yet. First failure stops validation and returns no token.

## Prerequisites
- form_id: Required. Call forms-public_list_forms to find it, or use the id returned by forms-public_create_form.
- account_id: Required. Call accounts-list_accounts to obtain this value if not already known.

### Parameters
- account_id: Account ID (required)
- form_id: The form ID (required)
- ops: The batch of patch operations to validate (required)

### Common mistakes
- Choice conditions: condition.value must be a choice REF, not a label. Read refs via forms-public_get_form(view=fields) first.
- add_ending: set screen_ref explicitly if add_logic in the same batch references it; omit for an auto-generated ref.

Call forms-public_get_capabilities for supported types, validation keys, and error codes.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID (required)` },
      { name: 'form_id', type: 'string', required: true, description: `Form ID (required)` },
      {
        name: 'ops',
        type: 'array',
        required: true,
        description: `Operations to validate in sequence.`,
      },
    ],
  },
  {
    name: 'typeformmcp_insights_public_aggregate',
    description: `## What this tool does
Computes aggregate measures (counts, averages, sums, NPS scores, and more) for a single field or an entire dataset.

Call insights-public_discover first to resolve form_id / audience_id / field_id / property_id and to
learn each field's filter_type, filter_operators, and filter_values before filtering.

## Use when
- User asks for summary statistics, totals, averages, counts, or scores
- User wants aggregated data rather than individual rows
- User asks about NPS score, response count, average rating, or similar rolled-up metrics

## Also known as
summary statistics, totals, counts, averages, sums, NPS scores, aggregate analytics, rolled-up metrics

## Constraints
- Provide exactly one of form_id or audience_id — never both, never neither.
- Every optional parameter must be sent as null when unset.

## Supported field types
- forms dataset: text, number, scale, boolean, choices, dropdown, nps, date, multi_format, transcript, payment, matrix, ranking.
- contacts dataset: text, text_list, number.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account identifier. Always required.`,
      },
      {
        name: 'audience_id',
        type: 'string',
        required: true,
        description: `Audience ID selecting the "contacts" dataset. Value when scoping to contacts (combined with account_id); null when form_id is set instead. Mutually exclusive with form_id.`,
      },
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `Field ID to aggregate. "forms" dataset only. Value when aggregating a specific field; null for dataset-level totals or contacts dataset.`,
      },
      {
        name: 'filters',
        type: 'string',
        required: true,
        description: `Cross-field filter conditions. Null for no filtering.`,
      },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `Form ID selecting the "forms" dataset. Value when scoping to a form; null when audience_id is set instead. Mutually exclusive with audience_id.`,
      },
      {
        name: 'measures',
        type: 'array',
        required: true,
        description: `Measure names to compute (e.g. "count", "average", "sum", "nps_score"). Call insights-public_discover first to learn which measures each field supports.`,
      },
      {
        name: 'property_id',
        type: 'string',
        required: true,
        description: `Property ID to aggregate. Required together with audience_id for the "contacts" dataset; null for the "forms" dataset.`,
      },
      {
        name: 'time_range',
        type: 'string',
        required: true,
        description: `Time window for the query as unix seconds. Interval is closed (both bounds inclusive). Null when no time filtering is provided. If provided, any missing bound is filled with its default (start=1, end=current unix time).`,
      },
    ],
  },
  {
    name: 'typeformmcp_insights_public_discover',
    description: `Return the schema of analytics data available for a given scope.

Call this BEFORE any analytics query (insights-public_aggregate/timeseries/toplist/list) to learn which datasets exist,
which fields are queryable, what measures and dimensions each field supports, and which filters apply.

## Inputs
- account_id: required.
- form_id XOR audience_id: form_id for form response data, audience_id for contact data. Provide exactly one.

## Output
- datasets: array of datasets, each with fields. Each field lists answer_type, measures, dimensions, supported_query_types, and filter operators.

## Resolving a form by name
If the user refers to a form by topic/name/description rather than ID, first call forms-public_list_forms with the search
parameter set to keywords from the user's message; it returns forms with titles and IDs.
If multiple match, ask the user which form they mean before proceeding.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account ID. Always required.`,
      },
      {
        name: 'audience_id',
        type: 'string',
        required: true,
        description: `Audience ID for contact data. Mutually exclusive with form_id.`,
      },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `Form ID for form response data. Mutually exclusive with audience_id.`,
      },
    ],
  },
  {
    name: 'typeformmcp_insights_public_list',
    description: `Return paginated row-level data for a single field in a dataset.

Use this tool when the user wants to see individual records (text responses, numeric ratings, true/false answers, etc.) rather than aggregated numbers.

## What this tool does
- Returns one row per response for the specified field, with cursor-based pagination.

## Inputs
- account_id: required.
- form_id XOR audience_id: form_id for the "forms" dataset, audience_id for the "contacts" dataset. Exactly one.
- field_id: form field to list values for. Works in "forms" dataset only.
- property_id: property to list values for. Required together with audience_id in the "contacts" dataset.
- time_range: { start, end } as unix seconds. Required.
- pagination:
  - page_size: Required. Max 100.
  - cursor: opaque token from a previous response to fetch the next page. Null for first page.
- search: free-text ILIKE filter on values. Null for no filter.
- filters: cross-field filter conditions. Null for no filtering.
- sort: sort order. Null for default (newest first).

## Output
- data: array of rows, each with { row_id, timestamp, text }.
- summary: { total_count, match_count } — total rows in scope and rows matching search/filters.
- pagination: { page_size, cursor, is_last_page }. Pass cursor back to fetch the next page.

## Supported field types
- text, number, boolean, choices, dropdown, nps, date, multi_format, transcript.

## Joining answers per respondent
- row_id is consistent across fields for the same form.
- To reconstruct one respondent's full set of answers: call this tool once per field, then join the resulting rows on row_id.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account ID. Always required.`,
      },
      { name: 'pagination', type: 'object', required: true, description: `Pagination parameters.` },
      {
        name: 'time_range',
        type: 'object',
        required: true,
        description: `Time window for the query.`,
      },
      {
        name: 'audience_id',
        type: 'string',
        required: false,
        description: `Audience ID for the 'contacts' dataset. Mutually exclusive with form_id.`,
      },
      {
        name: 'field_id',
        type: 'string',
        required: false,
        description: `Field ID to list values for. 'forms' dataset only.`,
      },
      {
        name: 'filters',
        type: 'string',
        required: false,
        description: `Cross-field filter conditions.`,
      },
      {
        name: 'form_id',
        type: 'string',
        required: false,
        description: `Form ID for the 'forms' dataset. Mutually exclusive with audience_id.`,
      },
      {
        name: 'property_id',
        type: 'string',
        required: false,
        description: `Property ID to list values for. Required for the 'contacts' dataset together with audience_id.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Text search filter applied to values (ILIKE match).`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for results.` },
    ],
  },
  {
    name: 'typeformmcp_insights_public_timeseries',
    description: `## What this tool does
Computes measures bucketed over time for a single field or an entire dataset.

Call insights-public_discover first to resolve form_id / audience_id / field_id / property_id and to
learn each field's filter_type, filter_operators, and filter_values before filtering.

## Use when
- User asks how responses, counts, scores, or averages changed over time
- User wants a trend, chart, or time series of any metric
- User asks about monthly/weekly/daily breakdowns of responses or scores

## Also known as
trend, time series, time-series, over time, by month, by week, by day, timeline, chart data, historical data

## Constraints
- Provide exactly one of form_id or audience_id — never both, never neither.
- Every optional parameter must be sent as null when unset.

## Supported field types
- forms dataset: text, number, scale, boolean, choices, dropdown, nps, date, multi_format, transcript, payment, matrix, ranking.
- contacts dataset: text, text_list, number.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account identifier. Always required.`,
      },
      {
        name: 'audience_id',
        type: 'string',
        required: true,
        description: `Audience ID selecting the "contacts" dataset. Value when scoping to contacts; null when form_id is set instead. Mutually exclusive with form_id - provide exactly one, never both, never neither.`,
      },
      {
        name: 'dimensions',
        type: 'array',
        required: true,
        description: `Optional list of dimensions to break down each time bucket by (max 2). Null for no breakdown when no dimensions are provided. Call insights-public_discover to learn which dimensions each field supports.`,
      },
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `Field ID to compute timeseries for. Value when form_id is set; null otherwise.`,
      },
      {
        name: 'filters',
        type: 'string',
        required: true,
        description: `Cross-field filter conditions. Null for no filtering.`,
      },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `Form ID selecting the "forms" dataset. Value when scoping to a form; null when audience_id is set instead. Mutually exclusive with audience_id - provide exactly one, never both, never neither.`,
      },
      {
        name: 'granularity',
        type: 'string',
        required: true,
        description: `Time bucket size. One of: hour, day, week, month, quarter, year.`,
      },
      {
        name: 'measures',
        type: 'array',
        required: true,
        description: `Measure names to compute (e.g. "count", "average", "nps_score"). Call insights-public_discover first to learn which measures each field supports.`,
      },
      {
        name: 'property_id',
        type: 'string',
        required: true,
        description: `Property ID to compute timeseries for. Value when audience_id is set; null otherwise.`,
      },
      {
        name: 'time_range',
        type: 'string',
        required: true,
        description: `Time window for the query as unix seconds. Interval is closed (both bounds inclusive). Null when no time filtering is provided. If provided, any missing bound is filled with its default (start=1, end=current unix time).`,
      },
      {
        name: 'timezone_offset',
        type: 'integer',
        required: true,
        description: `Timezone offset in seconds to apply when bucketing by day/week/month/quarter/year. Null for UTC (offset=0). Example: 3600 for UTC+1, -18000 for UTC-5.`,
      },
    ],
  },
  {
    name: 'typeformmcp_insights_public_toplist',
    description: `## What this tool does
Ranks groups of rows by a measure — e.g. "top 5 lead sources by contact count" or "which NPS category has the most responses."

Call insights-public_discover first to resolve form_id / audience_id / field_id / property_id and to
learn each field's dimensions, measures, filter_type, filter_operators, and filter_values before filtering.

## Use when
- User asks for a ranking, "top N", breakdown by category, or "most/least common" answer
- User wants rows grouped by one or two dimensions and sorted by a measure
- User wants to compare groups/choices/values against each other, not a single rolled-up number

## Also known as
top N, ranking, leaderboard, breakdown by category, grouped counts, most common, least common

## Constraints
- Provide exactly one of form_id or audience_id — never both, never neither.
- dimensions: 1-2 entries. Each name must be a dimension the selected field supports (see insights-public_discover).
- Every optional parameter must be sent as null when unset.

## Supported field types
- forms dataset: number, nps, scale, boolean, choices, text_list, payment, dropdown, multi_format, matrix, transcript, ranking.
- contacts dataset: text_list.
`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account identifier. Always required.`,
      },
      {
        name: 'audience_id',
        type: 'string',
        required: true,
        description: `Audience ID selecting the "contacts" dataset. Value when scoping to contacts (combined with account_id); null when form_id is set instead. Mutually exclusive with form_id.`,
      },
      {
        name: 'dimensions',
        type: 'array',
        required: true,
        description: `1-2 dimensions to group rows by, in order. Each name must be a dimension the selected field supports — call insights-public_discover first to learn which.`,
      },
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `Field ID to rank. "forms" dataset only. Value when form_id is set; null for the contacts dataset.`,
      },
      {
        name: 'filters',
        type: 'string',
        required: true,
        description: `Cross-field filter conditions. Null for no filtering.`,
      },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `Form ID selecting the "forms" dataset. Value when scoping to a form; null when audience_id is set instead. Mutually exclusive with audience_id.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: true,
        description: `Maximum number of ranked rows to return. Integer between 1 and 100.`,
      },
      {
        name: 'measures',
        type: 'array',
        required: true,
        description: `Measure names to compute per group (e.g. "count", "average", "nps_score"). Call insights-public_discover first to learn which measures each field supports.`,
      },
      {
        name: 'property_id',
        type: 'string',
        required: true,
        description: `Property ID to rank. Required together with audience_id for the "contacts" dataset; null for the "forms" dataset.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: true,
        description: `Sort order applied to the ranked groups. Null for no explicit order (rows come back in unspecified group order).`,
      },
      {
        name: 'time_range',
        type: 'string',
        required: true,
        description: `Time window for the query as unix seconds. Interval is closed (both bounds inclusive). Null when no time filtering is provided. If provided, any missing bound is filled with its default (start=1, end=current unix time).`,
      },
    ],
  },
  {
    name: 'typeformmcp_submit_feedback',
    description: `Call this any time a task cannot be completed as literally requested — missing feature, false
premise, permission error, API failure, etc.

ALWAYS call when blocked: if the user's literal request could not be fulfilled by
available tools, you MUST call this — even if you explained the limitation or
proposed a workaround. A workaround or explanation is not a substitute for logging
the gap; call this in addition to it, not instead of it. Set blocker_category to the reason:
- Missing Tool (a capability you needed did not exist),
- API Error (a backend call failed),
- Lack of Context (you were missing information you needed),
- Policy Restriction (an action was disallowed), or
- Other (any other blocker).

OPTIONAL when not blocked: if you completed the task, calling this is encouraged.
Set blocker_category to "Not Blocked" and share observations, suggestions, or
anything that could improve the tools.

The feedback is used to improve the available tools and the agent experience, so be
specific and concrete.`,
    params: [
      {
        name: 'attempted_actions',
        type: 'string',
        required: true,
        description: `What steps or tools were tried?`,
      },
      {
        name: 'blocker_category',
        type: 'string',
        required: true,
        description: `What high-level issue prevented task completion? Select Not Blocked if nothing blocked you but you still have feedback to share.`,
      },
      {
        name: 'feedback_specifics',
        type: 'string',
        required: true,
        description: `Provide the exact name of the tool you wished you had, the specific context you were missing, or the name of the failing API. If you were not blocked, describe your observation or suggestion.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: true,
        description: `What was the user ultimately trying to achieve?`,
      },
      {
        name: 'technical_logs',
        type: 'string',
        required: false,
        description: `Any relevant error messages, logs, or system output. Leave empty if not applicable.`,
      },
    ],
  },
  {
    name: 'typeformmcp_workspaces_list_workspaces',
    description: `List the workspaces the caller can see, with id, name, form_count, type (private/shared/custom), and account_id. Pair with forms-list_forms to discover forms in a specific workspace. Supports search by name and pagination.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: true,
        description: `1-indexed page number. Null uses default (1).`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: true,
        description: `Items per page. Null uses default (10).`,
      },
      {
        name: 'search',
        type: 'string',
        required: true,
        description: `Filter workspaces by name (partial match, case-insensitive). Null returns all workspaces.`,
      },
    ],
  },
]
