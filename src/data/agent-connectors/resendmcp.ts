import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'resendmcp_add_contact_to_segment',
    description: `Add a contact to a segment in Resend (by contact ID or email).`,
    params: [
      {
        name: 'segmentId',
        type: 'string',
        required: true,
        description: `Segment ID to add the contact to`,
      },
      { name: 'contactId', type: 'string', required: false, description: `Contact ID` },
      { name: 'email', type: 'string', required: false, description: `Contact email address` },
    ],
  },
  {
    name: 'resendmcp_add_suppression',
    description: `Add an email address to the suppression list in Resend. Suppressed addresses never receive emails from the account, even when included as recipients. Hard bounces and spam complaints are added to the suppression list automatically; use this tool to manually suppress an address when needed, e.g. to honor a do-not-contact request. To suppress many addresses at once, use batch-add-suppressions instead.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `Email address to suppress` },
    ],
  },
  {
    name: 'resendmcp_batch_add_suppressions',
    description: `Add multiple email addresses to the suppression list in Resend in a single call. Suppressed addresses never receive emails from the account. Hard bounces and spam complaints are added to the suppression list automatically; use this tool to manually suppress addresses when needed, e.g. to honor do-not-contact requests. For a single address, use add-suppression instead.`,
    params: [
      { name: 'emails', type: 'array', required: true, description: `Email addresses to suppress` },
    ],
  },
  {
    name: 'resendmcp_batch_remove_suppressions',
    description: `Remove multiple entries from the suppression list in Resend in a single call, by email addresses or by suppression IDs (provide exactly one of the two). The addresses will start receiving emails again. Before using this tool, you MUST double-check with the user that they want to remove these suppressions. Reference the EMAIL ADDRESSES (or IDs) when double-checking, and warn the user that addresses suppressed due to a bounce or complaint may hurt deliverability if emailed again. You may only use this tool if the user explicitly confirms they want to remove the suppressions after you double-check.`,
    params: [
      {
        name: 'emails',
        type: 'array',
        required: false,
        description: `Email addresses to remove from the suppression list. Cannot be used with "ids".`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Suppression IDs to remove from the suppression list. Cannot be used with "emails".`,
      },
    ],
  },
  {
    name: 'resendmcp_cancel_broadcast',
    description: `**Purpose:** Cancel a queued or scheduled broadcast by ID or Resend dashboard URL, without removing it. Cancelling a queued broadcast stops it mid-send (emails already sent are not affected). Cancelling a scheduled broadcast reverts it to draft.

**NOT for:** Removing a broadcast entirely (use remove-broadcast). Draft and sent broadcasts cannot be cancelled - sent broadcasts are immutable, and drafts have nothing to cancel.

**When to use:** User wants to "stop", "cancel", or "pause" a broadcast that is currently sending or scheduled to send.`,
    params: [
      {
        name: 'broadcastId',
        type: 'string',
        required: true,
        description: `Broadcast ID or Resend dashboard URL (e.g. https://resend.com/broadcasts/<id>)`,
      },
    ],
  },
  {
    name: 'resendmcp_cancel_email',
    description: `Cancel a scheduled email that has not yet been sent. Only works for emails that were scheduled using the scheduledAt parameter.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the scheduled email to cancel`,
      },
    ],
  },
  {
    name: 'resendmcp_compose_broadcast',
    description: `**Purpose:** Set the TipTap JSON content of a broadcast, enabling it to be edited visually in the Resend dashboard editor. Automatically connects and disconnects from the editor. Can also update metadata (subject, preview text, name) in the same call.

**This is the recommended way to set email content.** Content set via compose-broadcast can be visually edited by the user in the dashboard. Use this for newsletters and any broadcast where the user may want to refine the content.

**Workflow:** get-tiptap-json-content (with include_schema: true) -> compose-broadcast

**When to use:**
- After create-broadcast, to set the email body
- When the user wants to write, edit, or style email content
- When the user wants to collaborate on the email in the dashboard editor

**Important:** Always call get-tiptap-json-content first to retrieve the existing TipTap JSON, then build your changes on top of it. Skipping this will overwrite all existing content.

**Note:** Switching between compose (TipTap) and update (raw HTML) modes is lossy - some content or formatting may be lost. If the broadcast already has HTML content, ask the user before switching to compose mode.`,
    params: [
      {
        name: 'broadcastId',
        type: 'string',
        required: true,
        description: `Broadcast ID or Resend dashboard URL (e.g. https://resend.com/broadcasts/<id>)`,
      },
      {
        name: 'content',
        type: 'object',
        required: false,
        description: `TipTap JSON content. Call get-tiptap-json-content (with include_schema: true) first to get the existing content and the schema reference.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Update the broadcast name (internal label).`,
      },
      {
        name: 'previewText',
        type: 'string',
        required: false,
        description: `Update the preview text (shown in inbox before opening the email).`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Update the email subject line.`,
      },
    ],
  },
  {
    name: 'resendmcp_compose_template',
    description: `**Purpose:** Set the TipTap JSON content of a template, enabling it to be edited visually in the Resend dashboard editor. Automatically connects and disconnects from the editor. Can also update metadata (subject, name) in the same call.

**This is the recommended way to set email content.** Content set via compose-template can be visually edited by the user in the dashboard.

**Workflow:** get-tiptap-json-content (with include_schema: true) → compose-template

**When to use:**
- After create-template, to set the email body
- When the user wants to write, edit, or style email content
- When the user wants to collaborate on the email in the dashboard editor

**Important:** Always call get-tiptap-json-content first to retrieve the existing TipTap JSON, then build your changes on top of it. Skipping this will overwrite all existing content.

**Note:** Switching between compose (TipTap) and update (raw HTML) modes is lossy — some content or formatting may be lost. If the template already has HTML content, ask the user before switching to compose mode.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The template ID, alias, or Resend dashboard URL (e.g. https://resend.com/templates/<id>)`,
      },
      {
        name: 'content',
        type: 'object',
        required: false,
        description: `TipTap JSON content. Call get-tiptap-json-content (with include_schema: true) first to get the existing content and the schema reference.`,
      },
      { name: 'name', type: 'string', required: false, description: `Update the template name.` },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Update the default email subject.`,
      },
    ],
  },
  {
    name: 'resendmcp_connect_to_editor',
    description: `**Purpose:** Show agent presence in the Resend dashboard editor. Users will see an agent avatar while connected.

**When to use:**
- To signal to dashboard users that an AI agent is working on the content outside of compose workflows
- **Not needed before compose-broadcast or compose-template** — get-tiptap-json-content connects automatically, and compose tools disconnect when done.

**Returns:** Connection token and room ID.

**Note:** This establishes a live, stateful editor session for the agent — call disconnect-from-editor when done to remove the agent's presence from the dashboard.`,
    params: [
      {
        name: 'resource_id',
        type: 'string',
        required: true,
        description: `ID of the resource or Resend dashboard URL (e.g. https://resend.com/broadcasts/<id> or https://resend.com/templates/<id>)`,
      },
      {
        name: 'resource_type',
        type: 'string',
        required: true,
        description: `Type of resource to connect to`,
      },
      {
        name: 'agent_name',
        type: 'string',
        required: false,
        description: `Display name for the agent avatar`,
      },
    ],
  },
  {
    name: 'resendmcp_create_api_key',
    description: `Create a new API key in Resend. The token is only shown once upon creation, so you MUST display it to the user.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `API key name` },
      {
        name: 'domainId',
        type: 'string',
        required: false,
        description: `Restrict API key to send emails from a specific domain. Only applicable when permission is "sending_access".`,
      },
      {
        name: 'permission',
        type: 'string',
        required: false,
        description: `Access level. "full_access" grants complete resource management. "sending_access" restricts to email delivery only.`,
      },
    ],
  },
  {
    name: 'resendmcp_create_automation',
    description: `**Purpose:** Create an automation workflow that triggers on events and executes a sequence of steps.

**When to use:**
- User wants to set up automated email sequences (welcome series, drip campaigns, re-engagement)
- User wants to automate actions based on events (update contacts, add to segments)

**Workflow:** manage-events (create event, if needed) → list-templates (to get template IDs) → get-template (to check if template has "from" and "subject" — if not, use list-domains to pick a verified domain for the step config) → create-automation → send-event (to test)

**Returns:** Automation ID and dashboard link.

The workflow is a JSON object with one key: "steps" — an array of step objects.

Each step has: key (unique string), type, config, and either "next" (string|null) or "branches" (for branching steps).
Use keys like: "trigger", "send_email_1", "delay_1", "condition_1", "wait_event_1".

## Step types

### trigger — starts the automation when an event fires (required, exactly one)
config: { "eventName": "<event_name>" }
Uses "next".

### send_email — send an email using a published template
config: { "template": { "id": "<template_id>", "variables": { "<key>": "<value>" } }, "from": "Name <sender@example.com>", "subject": "Email subject", "replyTo": "<address>" }
**"from" and "subject" are resolved from the step config first, then fall back to the template.** If neither provides a "from", the email will silently fail to send. If neither provides a "subject", the run will error. Best practice: always set "from" and "subject" on the step config so the automation is self-contained. Use list-domains to find verified domains for "from". "replyTo" and "variables" are optional. Variables can use { "var": "event.<field>" } or { "var": "contact.<field>" } for dynamic values.
Uses "next".

### delay — pause the workflow
config: { "duration": "<human-readable>" }
Examples: "30 minutes", "1 hour", "2 days", "1 week". Max 30 days.
Uses "next".

### condition — conditional split based on contact or event data
config: A condition rule object:
  Single rule: { "type": "rule", "field": "event.<field>" or "contact.<field>", "operator": "<op>", "value": <value> }
  Compound: { "type": "and"|"or", "rules": [<rule>, ...] }
Operators: eq, neq, gt, gte, lt, lte, contains, starts_with, ends_with, exists, is_empty.
exists/is_empty do not require a value.
Uses "branches": { "condition_met": "<step_key>", "condition_not_met": "<step_key_or_null>" }

### wait_for_event — pause until a specific event arrives or timeout
config: { "eventName": "<event_name>", "timeout": "<human-readable>", "filterRule": <optional condition rule> }
For email lifecycle events use "resend:email.<opened|clicked|bounced|delivered|complained|failed|suppressed>".
Uses "branches": { "event_received": "<step_key>", "timeout": "<step_key_or_null>" }

### contact_update — update contact fields
config: { "firstName": "<value>", "lastName": "<value>", "unsubscribed": true|false, "properties": { "<key>": "<value>" } }
All fields optional. Values can use { "var": "event.<field>" } for dynamic data.
Uses "next".

### contact_delete — remove the contact from the audience
config: {}
Uses "next".

### add_to_segment — add contact to a segment
config: { "segmentId": "<segment_id>" }
Uses "next".

## Rules
1. Every step must be reachable from the trigger via next/branches.
2. Terminal steps have "next": null (or null branch values).
3. The workflow must be tree-shaped — no merging branches back together.

## Example: Linear drip campaign

{
  "steps": [
    { "key": "trigger", "type": "trigger", "config": { "eventName": "user.created" }, "next": "send_email_1" },
    { "key": "send_email_1", "type": "send_email", "config": { "template": { "id": "tmpl_123" }, "from": "Welcome <hello@example.com>", "subject": "Welcome!" }, "next": "delay_1" },
    { "key": "delay_1", "type": "delay", "config": { "duration": "3 days" }, "next": "send_email_2" },
    { "key": "send_email_2", "type": "send_email", "config": { "template": { "id": "tmpl_456" }, "from": "Welcome <hello@example.com>", "subject": "Getting started" }, "next": null }
  ]
}

## Example: Re-engagement with wait_for_event

{
  "steps": [
    { "key": "trigger", "type": "trigger", "config": { "eventName": "user.created" }, "next": "send_email_1" },
    { "key": "send_email_1", "type": "send_email", "config": { "template": { "id": "tmpl_789" }, "from": "Team <team@example.com>", "subject": "Welcome" }, "next": "wait_event_1" },
    { "key": "wait_event_1", "type": "wait_for_event", "config": { "eventName": "resend:email.opened", "timeout": "3 days" }, "branches": { "event_received": null, "timeout": "send_email_2" } },
    { "key": "send_email_2", "type": "send_email", "config": { "template": { "id": "tmpl_abc" }, "from": "Team <team@example.com>", "subject": "Did you miss this?" }, "next": null }
  ]
}

## Example: Condition branch

{
  "steps": [
    { "key": "trigger", "type": "trigger", "config": { "eventName": "trial.ended" }, "next": "condition_1" },
    { "key": "condition_1", "type": "condition", "config": { "type": "rule", "field": "event.converted", "operator": "eq", "value": true }, "branches": { "condition_met": "send_email_1", "condition_not_met": "send_email_2" } },
    { "key": "send_email_1", "type": "send_email", "config": { "template": { "id": "tmpl_thanks" }, "from": "Team <team@example.com>", "subject": "Thanks for upgrading!" }, "next": null },
    { "key": "send_email_2", "type": "send_email", "config": { "template": { "id": "tmpl_win_back" }, "from": "Team <team@example.com>", "subject": "We'd love to have you back" }, "next": null }
  ]
}`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name for the automation (e.g., "Welcome Series")`,
      },
      {
        name: 'workflow',
        type: 'object',
        required: true,
        description: `The workflow definition. See the tool description for the full schema and examples.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Initial status. Default: disabled. Use "enabled" to activate immediately.`,
      },
    ],
  },
  {
    name: 'resendmcp_create_broadcast',
    description: `**Purpose:** Create a broadcast campaign (one email sent to an entire segment). Defines subject, body, and segment; does NOT send yet. Use send-broadcast to send it.

**NOT for:** Sending a one-off email to specific people (use send-email). Not for adding contacts (use create-contact).

**Returns:** Broadcast ID. Use this ID with send-broadcast to send, or get-broadcast/update-broadcast to manage.

**When to use:**
- User wants to "email my list", "send a newsletter", "broadcast to my segment", "email all contacts in X"
- Newsletter, announcement, or bulk message to one segment
- Supports personalization: {{{FIRST_NAME}}}, {{{LAST_NAME}}}, {{{EMAIL}}}, {{{RESEND_UNSUBSCRIBE_URL}}}

**"All contacts" note:** Broadcasts require a segment. There is no "all contacts" option in the API. If the user wants to send to all contacts, check list-segments for an existing segment that covers everyone. If none exists, suggest creating one with create-segment.

**Workflow:** list-segments (if needed) -> create-broadcast -> get-tiptap-json-content (with include_schema: true) -> compose-broadcast -> send-broadcast.

**Content options after creating:**
- **compose-broadcast** (recommended): Sets TipTap content that the user can visually edit in the Resend dashboard. Use this when the user wants to collaborate on or refine the email in the editor.
- **update-broadcast with html/text**: Sets static HTML/text content. Use this only when the user explicitly wants to set raw HTML. Switching between compose and html/text modes is lossy - some content or formatting may be lost. Ask the user before switching.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `From email address (e.g. "onboarding@resend.com" or "Resend <onboarding@resend.com>")`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name for the broadcast. If the user does not provide a name, go ahead and create a descriptive name for them, based on the email subject/content and the context of your conversation.`,
      },
      { name: 'segmentId', type: 'string', required: true, description: `Segment ID to send to` },
      { name: 'subject', type: 'string', required: true, description: `Email subject` },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `Plain text version of the email content. The following placeholders may be used to personalize the email content: {{{FIRST_NAME|fallback}}}, {{{LAST_NAME|fallback}}}, {{{EMAIL}}}, {{{RESEND_UNSUBSCRIBE_URL}}}`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `HTML version of the email content. Placeholders: {{{FIRST_NAME|fallback}}}, {{{LAST_NAME|fallback}}}, {{{EMAIL}}}, {{{RESEND_UNSUBSCRIBE_URL}}}.

Email HTML requirements - follow all of these without exception:

STRUCTURE
- Always include <!DOCTYPE html>, <html>, <head>, <body>
- Layout must be table-based: <table>, <tr>, <td> - never use <div> for layout
- Outer wrapper table at width="100%", inner content table at max 600px wide
- Every table must have cellpadding="0" cellspacing="0" border="0"

CSS
- All styles must be inline (style="...") - no <style> tag, no external stylesheets
- No flexbox, no grid, no CSS variables, no CSS shorthand (use padding-top not padding)
- font-family must always include web-safe fallbacks (Arial, Helvetica, Georgia, sans-serif)
- Always set font-size, line-height, and color explicitly on every text element

IMAGES
- Always set width, height, border="0", display:block on every <img>
- Use absolute URLs only - no relative paths
- Always include alt text

LINKS & BUTTONS
- Never use <button> - use <a> styled as a button inside a <td>
- No <video>, <form>, or <input> elements
- No JavaScript of any kind

OUTLOOK COMPATIBILITY
- Use bgcolor attribute on <td> alongside CSS background-color
- No CSS background-image (poor Outlook support)
- Add <!--[if mso]> conditionals where needed for Outlook rendering

META (in <head>)
- <meta charset="UTF-8">
- <meta name="viewport" content="width=device-width, initial-scale=1.0">
- <meta http-equiv="X-UA-Compatible" content="IE=edge">`,
      },
      {
        name: 'previewText',
        type: 'string',
        required: false,
        description: `Preview text for the email`,
      },
      {
        name: 'replyTo',
        type: 'array',
        required: false,
        description: `Reply-to email address(es)`,
      },
    ],
  },
  {
    name: 'resendmcp_create_contact',
    description: `Create a new contact in Resend. Optionally assign to segments and configure topic subscriptions.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `Contact email address` },
      { name: 'firstName', type: 'string', required: false, description: `Contact first name` },
      { name: 'lastName', type: 'string', required: false, description: `Contact last name` },
      {
        name: 'properties',
        type: 'object',
        required: false,
        description: `Custom property key-value pairs for the contact (e.g. { "company_name": "Acme" })`,
      },
      {
        name: 'segmentIds',
        type: 'array',
        required: false,
        description: `Array of segment IDs to assign this contact to`,
      },
      {
        name: 'topics',
        type: 'array',
        required: false,
        description: `Array of topic subscription configurations`,
      },
      {
        name: 'unsubscribed',
        type: 'boolean',
        required: false,
        description: `Whether the contact is unsubscribed from all broadcasts`,
      },
    ],
  },
  {
    name: 'resendmcp_create_contact_import',
    description: `Bulk-import contacts from a CSV file into Resend. The import is processed asynchronously: this returns an import ID immediately, then use get-contact-import to poll its status and counts. Provide the CSV as raw text via \`content\`. Max file size 100MB.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Raw CSV text to upload (e.g. "email,first_name\\na@b.com,Ada").`,
      },
      {
        name: 'columnMap',
        type: 'object',
        required: false,
        description: `Maps contact fields to CSV header names. When omitted, headers are matched case-sensitively to "email", "first_name", and "last_name".`,
      },
      {
        name: 'filename',
        type: 'string',
        required: false,
        description: `Name for the uploaded file. Defaults to "contacts.csv".`,
      },
      {
        name: 'onConflict',
        type: 'string',
        required: false,
        description: `How to handle contacts that already exist: "upsert" updates them, "skip" leaves them unchanged. Defaults to "upsert".`,
      },
      {
        name: 'segmentIds',
        type: 'array',
        required: false,
        description: `Array of segment IDs to assign the imported contacts to.`,
      },
      {
        name: 'topics',
        type: 'array',
        required: false,
        description: `Topic subscription configurations applied to the imported contacts.`,
      },
    ],
  },
  {
    name: 'resendmcp_create_contact_property',
    description: `Create a new contact property in Resend. A contact property is a custom attribute (e.g. "company_name", "plan_tier") that can be attached to contacts.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The property key. Max 50 characters, only alphanumeric characters and underscores allowed.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The property type: "string" or "number".`,
      },
      {
        name: 'fallbackValue',
        type: 'string',
        required: false,
        description: `Default value when the property is not set for a contact. Must match the specified type.`,
      },
    ],
  },
  {
    name: 'resendmcp_create_domain',
    description: `Create a new domain in Resend. Returns DNS records that must be configured with your DNS provider for verification. You MUST display the DNS records to the user so they can set them up.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name (e.g., example.com)`,
      },
      {
        name: 'capabilities',
        type: 'object',
        required: false,
        description: `Domain capabilities configuration.`,
      },
      {
        name: 'clickTracking',
        type: 'boolean',
        required: false,
        description: `Enable click tracking in HTML emails.`,
      },
      {
        name: 'customReturnPath',
        type: 'string',
        required: false,
        description: `Subdomain for the Return-Path address. Defaults to "send".`,
      },
      {
        name: 'openTracking',
        type: 'boolean',
        required: false,
        description: `Enable email open rate tracking.`,
      },
      {
        name: 'region',
        type: 'string',
        required: false,
        description: `Deployment region. Defaults to "us-east-1".`,
      },
      {
        name: 'tls',
        type: 'string',
        required: false,
        description: `TLS mode. "opportunistic" attempts secure connection with fallback. "enforced" requires TLS or fails. Defaults to "opportunistic".`,
      },
      {
        name: 'trackingSubdomain',
        type: 'string',
        required: false,
        description: `Custom subdomain for tracking links (e.g., "track" for track.example.com). When set, click and open tracking URLs will use this subdomain instead of the default.`,
      },
    ],
  },
  {
    name: 'resendmcp_create_domain_claim',
    description: `Start a claim for a domain another Resend account has already verified. The domain is recreated under your account with brand-new DKIM keys, so the previous account's DNS records cannot be reused. Returns a TXT record that MUST be added to your DNS to prove ownership. You MUST display the TXT record to the user. After they add it, use verify-domain-claim, then poll get-domain-claim until status is "completed".`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name to claim (e.g., example.com)`,
      },
      {
        name: 'clickTracking',
        type: 'boolean',
        required: false,
        description: `Enable click tracking in HTML emails.`,
      },
      {
        name: 'customReturnPath',
        type: 'string',
        required: false,
        description: `Subdomain for the Return-Path address. Defaults to "send".`,
      },
      {
        name: 'openTracking',
        type: 'boolean',
        required: false,
        description: `Enable email open rate tracking.`,
      },
      {
        name: 'region',
        type: 'string',
        required: false,
        description: `Deployment region. Defaults to "us-east-1".`,
      },
      {
        name: 'trackingSubdomain',
        type: 'string',
        required: false,
        description: `Custom subdomain for tracking links (e.g., "track" for track.example.com).`,
      },
    ],
  },
  {
    name: 'resendmcp_create_segment',
    description: `Create a new segment in Resend. A segment is a group of contacts that can be used to target specific broadcasts.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name for the new segment` },
    ],
  },
  {
    name: 'resendmcp_create_template',
    description: `Create a new email template in Resend. Templates are created in draft status. Use publish-template to make them available for sending. Variables use triple-brace syntax in HTML: {{{VAR_NAME}}}.

**Workflow:** create-template → get-tiptap-json-content (with include_schema: true) → compose-template → publish-template.

**Content options after creating:**
- **compose-template** (recommended): Sets TipTap content that the user can visually edit in the Resend dashboard. Use this when the user wants to collaborate on or refine the template in the editor.
- **update-template with html/text**: Sets static HTML/text content. Use this only when the user explicitly wants to set raw HTML. Switching between compose and html/text modes is lossy — some content or formatting may be lost. Ask the user before switching.`,
    params: [
      {
        name: 'html',
        type: 'string',
        required: true,
        description: `The HTML content of the template. Use triple-brace syntax for variables: {{{VARIABLE_NAME}}}.

Email HTML requirements — follow all of these without exception:

STRUCTURE
- Always include <!DOCTYPE html>, <html>, <head>, <body>
- Layout must be table-based: <table>, <tr>, <td> — never use <div> for layout
- Outer wrapper table at width="100%", inner content table at max 600px wide
- Every table must have cellpadding="0" cellspacing="0" border="0"

CSS
- All styles must be inline (style="...") — no <style> tag, no external stylesheets
- No flexbox, no grid, no CSS variables, no CSS shorthand (use padding-top not padding)
- font-family must always include web-safe fallbacks (Arial, Helvetica, Georgia, sans-serif)
- Always set font-size, line-height, and color explicitly on every text element

IMAGES
- Always set width, height, border="0", display:block on every <img>
- Use absolute URLs only — no relative paths
- Always include alt text

LINKS & BUTTONS
- Never use <button> — use <a> styled as a button inside a <td>
- No <video>, <form>, or <input> elements
- No JavaScript of any kind

OUTLOOK COMPATIBILITY
- Use bgcolor attribute on <td> alongside CSS background-color
- No CSS background-image (poor Outlook support)
- Add <!--[if mso]> conditionals where needed for Outlook rendering

META (in <head>)
- <meta charset="UTF-8">
- <meta name="viewport" content="width=device-width, initial-scale=1.0">
- <meta http-equiv="X-UA-Compatible" content="IE=edge">`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the template.` },
      {
        name: 'alias',
        type: 'string',
        required: false,
        description: `An alias for the template. Can be used instead of the ID to reference the template.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Sender email address (e.g., "Your Name <sender@example.com>"). Can be overridden when sending.`,
      },
      {
        name: 'replyTo',
        type: 'string',
        required: false,
        description: `Default Reply-to email address(es). Can be overridden when sending.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Default email subject. Can be overridden when sending.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Plain text version of the message. If not provided, HTML will be used to generate it.`,
      },
      {
        name: 'variables',
        type: 'array',
        required: false,
        description: `Array of template variables (up to 50 per template).`,
      },
    ],
  },
  {
    name: 'resendmcp_create_topic',
    description: `Create a new topic in Resend. Topics allow contacts to manage their subscription preferences for different types of emails.`,
    params: [
      {
        name: 'defaultSubscription',
        type: 'string',
        required: true,
        description: `Default subscription preference for new contacts. Cannot be modified after creation.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Topic name (max 50 characters)`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Topic description (max 200 characters)`,
      },
    ],
  },
  {
    name: 'resendmcp_create_webhook',
    description: `Create a new webhook in Resend. A webhook allows you to receive notifications at a specified URL when certain events occur (e.g. email.sent, email.delivered, email.bounced).`,
    params: [
      {
        name: 'endpoint',
        type: 'string',
        required: true,
        description: `The URL where webhook events will be sent`,
      },
      {
        name: 'events',
        type: 'array',
        required: true,
        description: `Array of event types to subscribe to`,
      },
    ],
  },
  {
    name: 'resendmcp_disconnect_from_editor',
    description: `Remove agent presence from the Resend dashboard editor. Call this when done editing.`,
    params: [],
  },
  {
    name: 'resendmcp_duplicate_automation',
    description: `Duplicate an existing automation by ID or Resend dashboard URL. Creates a copy with its own ID, including the steps and connections of the original. Use this when the user wants a new automation based on one they already have, instead of rebuilding the workflow from scratch. Use update-automation on the new ID to rename it or change its workflow.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Automation ID or Resend dashboard URL (e.g. https://resend.com/automations/<id>) of the automation to duplicate`,
      },
    ],
  },
  {
    name: 'resendmcp_duplicate_template',
    description: `Duplicate an existing email template in Resend. Creates a new draft copy of the template with a new ID. Accepts a template ID, alias, or Resend dashboard URL.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID, alias, or Resend dashboard URL (e.g. https://resend.com/templates/<id>) of the template to duplicate.`,
      },
    ],
  },
  {
    name: 'resendmcp_get_automation',
    description: `**Purpose:** Get details of a specific automation (with its workflow) or list all automations.

**Modes:**
- With \`id\`: Returns full automation details including the workflow definition.
- Without \`id\`: Lists all automations with optional status filter and pagination.

**When to use:**
- User asks "show me my automations" or "what automations do I have?"
- User wants to inspect a specific automation's workflow
- Before update-automation, to see the current workflow`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination (for list mode).`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination (for list mode).`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Automation ID or Resend dashboard URL (e.g. https://resend.com/automations/<id>). If omitted, lists all automations.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of automations to retrieve (for list mode).`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by status (for list mode only).`,
      },
    ],
  },
  {
    name: 'resendmcp_get_automation_runs',
    description: `**Purpose:** List runs for an automation, or get details of a specific run.

**Modes:**
- With \`runId\`: Returns detailed run info with step-by-step execution status, outputs, and errors.
- Without \`runId\`: Lists runs for the automation with optional status filter.

**When to use:**
- User wants to see if an automation is working
- User wants to debug a failed automation run
- User asks "why did this automation fail?" or "show me recent runs"

**Run statuses:** running, completed, failed, cancelled
**Step statuses:** pending, running, completed, failed, skipped, waiting`,
    params: [
      {
        name: 'automationId',
        type: 'string',
        required: true,
        description: `The automation ID or Resend dashboard URL (e.g. https://resend.com/automations/<id>)`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination (for list mode).`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination (for list mode).`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of runs to retrieve (for list mode).`,
      },
      {
        name: 'runId',
        type: 'string',
        required: false,
        description: `Specific run ID to get details for. If omitted, lists all runs.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter runs by status (for list mode only).`,
      },
    ],
  },
  {
    name: 'resendmcp_get_broadcast',
    description: `Retrieve full details of a specific broadcast by ID or Resend dashboard URL (e.g. https://resend.com/broadcasts/<id>), including HTML and plain text content.`,
    params: [
      {
        name: 'broadcastId',
        type: 'string',
        required: true,
        description: `Broadcast ID or Resend dashboard URL (e.g. https://resend.com/broadcasts/<id>)`,
      },
    ],
  },
  {
    name: 'resendmcp_get_contact',
    description: `Get a contact by ID or email from Resend.`,
    params: [
      { name: 'email', type: 'string', required: false, description: `Contact email address` },
      { name: 'id', type: 'string', required: false, description: `Contact ID` },
    ],
  },
  {
    name: 'resendmcp_get_contact_import',
    description: `Get the status and counts of a contact import by ID. Use after create-contact-import to track progress (queued, in_progress, completed, failed).`,
    params: [{ name: 'id', type: 'string', required: true, description: `Contact import ID` }],
  },
  {
    name: 'resendmcp_get_contact_property',
    description: `Get a contact property by ID from Resend.`,
    params: [
      {
        name: 'contactPropertyId',
        type: 'string',
        required: true,
        description: `Contact property ID`,
      },
    ],
  },
  {
    name: 'resendmcp_get_domain',
    description: `Get a domain by ID from Resend. Returns full domain details including DNS records needed for verification.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Domain ID` }],
  },
  {
    name: 'resendmcp_get_domain_claim',
    description: `Retrieve the latest claim for a domain by its placeholder Domain ID (the domain_id from create-domain-claim). Returns claim status and the TXT record needed to prove ownership. Poll until status is "completed".`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The placeholder Domain ID created by the claim`,
      },
    ],
  },
  {
    name: 'resendmcp_get_email',
    description: `Retrieve full details of a specific sent transactional email by ID, including message_id, HTML and plain text content.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The email ID to retrieve` },
    ],
  },
  {
    name: 'resendmcp_get_log',
    description: `**Purpose:** Get detailed information about a specific API request log, including the full request and response bodies.

**Returns:** Log details: id, created_at, endpoint, method, response_status, user_agent, request_body, response_body.

**When to use:**
- User wants to inspect a specific API request
- Debugging a particular API call
- User says "show me that log", "what was in that request?"`,
    params: [
      { name: 'logId', type: 'string', required: true, description: `The Log ID to retrieve` },
    ],
  },
  {
    name: 'resendmcp_get_received_email',
    description: `Retrieve full details of a specific received email by ID, including HTML and plain text content, headers, and raw email download URL.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The received email ID to retrieve`,
      },
    ],
  },
  {
    name: 'resendmcp_get_received_email_attachment',
    description: `Retrieve details of a specific attachment from a received email, including a time-limited download URL.`,
    params: [
      { name: 'emailId', type: 'string', required: true, description: `The received email ID` },
      { name: 'id', type: 'string', required: true, description: `The attachment ID` },
    ],
  },
  {
    name: 'resendmcp_get_segment',
    description: `Get a segment by ID from Resend.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Segment ID` }],
  },
  {
    name: 'resendmcp_get_sent_email_attachment',
    description: `Retrieve details of a specific attachment from a sent email, including a time-limited download URL.`,
    params: [
      { name: 'emailId', type: 'string', required: true, description: `The sent email ID` },
      { name: 'id', type: 'string', required: true, description: `The attachment ID` },
    ],
  },
  {
    name: 'resendmcp_get_suppression',
    description: `Get a suppression list entry by ID or email address from Resend. Use this to check whether a specific address is suppressed and why (origin: bounce, complaint, or manual).`,
    params: [
      {
        name: 'idOrEmail',
        type: 'string',
        required: true,
        description: `Suppression ID or email address`,
      },
    ],
  },
  {
    name: 'resendmcp_get_template',
    description: `Get an email template by ID, alias, or Resend dashboard URL (e.g. https://resend.com/templates/<id>) from Resend. Returns full template details including HTML content, variables, and publish status.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The template ID, alias, or Resend dashboard URL (e.g. https://resend.com/templates/<id>)`,
      },
    ],
  },
  {
    name: 'resendmcp_get_tiptap_json_content',
    description: `**Purpose:** Retrieve the existing TipTap JSON content of a broadcast or template, optionally bundled with the TipTap schema reference. Also connects the agent to the editor so the avatar is visible while content is being generated.

**When to use:**
- **Always call this before compose-broadcast or compose-template** to fetch the current document state — even if you expect it to be empty, the resource may have content set via the dashboard
- When the user asks to edit, tweak, or modify existing email content
- To inspect the current TipTap structure of a resource

**Returns:** The TipTap JSON content object for the resource, and optionally the TipTap schema. Use the content as the base for modifications, then pass the updated JSON to compose-broadcast or compose-template.

**Note:** This tool automatically connects the agent to the editor. The subsequent compose-broadcast or compose-template call will disconnect when done.

**Tip:** Set include_schema to true to get both the existing content and the schema in one call.`,
    params: [
      {
        name: 'resource_id',
        type: 'string',
        required: true,
        description: `The broadcast ID (UUID), template identifier (UUID or alias), or Resend dashboard URL (e.g. https://resend.com/broadcasts/<id> or https://resend.com/templates/<id>)`,
      },
      {
        name: 'resource_type',
        type: 'string',
        required: true,
        description: `Type of resource to fetch content for`,
      },
      {
        name: 'include_schema',
        type: 'boolean',
        required: false,
        description: `Returns the TipTap schema reference alongside the content. Required for producing valid TipTap JSON. Set to false only if you already have the schema.`,
      },
    ],
  },
  {
    name: 'resendmcp_get_topic',
    description: `Get a topic by ID from Resend.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Topic ID` }],
  },
  {
    name: 'resendmcp_get_webhook',
    description: `Get a webhook by ID from Resend.`,
    params: [{ name: 'webhookId', type: 'string', required: true, description: `Webhook ID` }],
  },
  {
    name: 'resendmcp_list_api_keys',
    description: `List all API keys from Resend. Returns API key names, IDs, and creation dates. Don't bother telling the user the IDs or creation dates unless they ask for them.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `API key ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `API key ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of API keys to retrieve. Max: 100, Min: 1`,
      },
    ],
  },
  {
    name: 'resendmcp_list_broadcasts',
    description: `**Purpose:** List all broadcast campaigns (newsletters/bulk emails to audiences) with ID, name, audience, status, timestamps.

**NOT for:** Listing transactional emails (use list-emails). Not for listing segments or contacts (use list-segments, list-contacts).

**Returns:** For each broadcast: id, name, segment_id, status, created_at, scheduled_at, sent_at.

**When to use:** User asks "show my broadcasts", "what newsletters did I send?", "list campaigns". Use get-broadcast for full details of one.`,
    params: [],
  },
  {
    name: 'resendmcp_list_contact_imports',
    description: `List contact imports from Resend. Optionally filter by status. Use to discover import IDs or review past imports.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Contact import ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Contact import ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of contact imports to retrieve. Default: 10, Max: 100, Min: 1`,
      },
      { name: 'status', type: 'string', required: false, description: `Filter imports by status.` },
    ],
  },
  {
    name: 'resendmcp_list_contact_properties',
    description: `List all contact properties from Resend. This tool is useful for getting property IDs and seeing which custom attributes are configured. If you need a contact property ID, you MUST use this tool to get all available properties and then ask the user to select the one they want. Don't bother telling the user the IDs or creation dates unless they ask for them.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Contact property ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Contact property ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of contact properties to retrieve. Default: 20, Max: 100, Min: 1`,
      },
    ],
  },
  {
    name: 'resendmcp_list_contact_segments',
    description: `List all segments a contact belongs to in Resend (by contact ID or email). Don't bother telling the user the IDs or creation dates unless they ask for them.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Segment ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Segment ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      { name: 'contactId', type: 'string', required: false, description: `Contact ID` },
      { name: 'email', type: 'string', required: false, description: `Contact email address` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of segments to retrieve. Max: 100, Min: 1. If omitted, all segments are returned.`,
      },
    ],
  },
  {
    name: 'resendmcp_list_contact_topics',
    description: `List all topic subscriptions for a contact in Resend (by contact ID or email). Don't bother telling the user the IDs unless they ask for them.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Topic ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Topic ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      { name: 'email', type: 'string', required: false, description: `Contact email address` },
      { name: 'id', type: 'string', required: false, description: `Contact ID` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of topics to retrieve. Default: 20, Max: 100, Min: 1`,
      },
    ],
  },
  {
    name: 'resendmcp_list_contacts',
    description: `**Purpose:** List contacts from Resend. Optionally filter by segment. Use to discover contact IDs or emails.

**NOT for:** Listing segments (use list-segments). Not for listing sent emails (use list-emails) or broadcasts (use list-broadcasts).

**Returns:** For each contact: id, email, first_name, last_name, unsubscribed, created_at.

**When to use:** User asks "who's in this list?", "show contacts", "who did I add?" Don't bother telling the user the IDs, unsubscribe statuses, or creation dates unless they ask for them.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Contact ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Contact ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of contacts to retrieve. Default: 20, Max: 100, Min: 1`,
      },
      {
        name: 'segmentId',
        type: 'string',
        required: false,
        description: `Segment ID to filter by. If provided, only contacts in this segment will be returned.`,
      },
    ],
  },
  {
    name: 'resendmcp_list_domains',
    description: `List all domains from Resend. Returns domain names, statuses, regions, and capabilities. Don't bother telling the user the IDs unless they ask for them.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Domain ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Domain ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of domains to retrieve. Default: 20, Max: 100, Min: 1`,
      },
    ],
  },
  {
    name: 'resendmcp_list_emails',
    description: `**Purpose:** List recently sent emails (transactional emails sent via send-email) with metadata: recipient, subject, status, timestamps.

**NOT for:** Listing broadcast campaigns (use list-broadcasts). Not for composing or sending.

**Returns:** Paginated list with to, subject, status, created_at, message_id, and ID per email.

**When to use:**
- User asks "what emails were sent?", "show recent emails", "did my email go out?"
- Checking delivery status of sent messages
- Finding an email ID to fetch full content (then use get-email)

**Workflow:** list-emails → get-email( id ) when user needs full body or details.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Email ID after which to retrieve more emails (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Email ID before which to retrieve more emails (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of emails to retrieve. Default: 20, Max: 100, Min: 1`,
      },
    ],
  },
  {
    name: 'resendmcp_list_logs',
    description: `**Purpose:** List API request logs for the account. Use to review recent API activity, debug issues, or audit API usage.

**Returns:** For each log: id, created_at, endpoint, method, response_status, user_agent. Use pagination (limit, after/before) for large lists.

**When to use:**
- User wants to see recent API activity
- Debugging API issues or checking request history
- User says "show my logs", "what API calls were made?", "check recent requests"`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Log ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Log ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of logs to retrieve. Default: 20, Max: 100, Min: 1`,
      },
    ],
  },
  {
    name: 'resendmcp_list_oauth_grants',
    description: `List OAuth grants for the team — the apps authorized to act on the team's behalf. Returns every grant, active and revoked; a grant with a non-null revoked_at is no longer active. Each grant includes the client (app) name, scopes, and creation date. Don't bother telling the user the IDs unless they ask for them.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `OAuth grant ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `OAuth grant ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of OAuth grants to retrieve. Max: 100, Min: 1`,
      },
    ],
  },
  {
    name: 'resendmcp_list_received_email_attachments',
    description: `List all attachments from a specific received (inbox) email. Returns attachment metadata including filename, size, content type, and a time-limited download URL. Use for emails listed by list-received-emails.`,
    params: [
      { name: 'emailId', type: 'string', required: true, description: `The received email ID` },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Attachment ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Attachment ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of attachments to retrieve. Default: 20, Max: 100, Min: 1`,
      },
    ],
  },
  {
    name: 'resendmcp_list_received_emails',
    description: `**Purpose:** List emails received (inbox) by your Resend receiving address. Use for "show my inbox", "what emails did I get?", "list incoming mail".

**NOT for:** Listing emails you sent (use list-emails). Not for listing broadcasts (use list-broadcasts).

**Returns:** Paginated metadata: from, to, subject, message_id, received time. Use get-received-email with an ID for full content.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Email ID after which to retrieve more emails (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Email ID before which to retrieve more emails (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of emails to retrieve. Default: 20, Max: 100, Min: 1`,
      },
    ],
  },
  {
    name: 'resendmcp_list_segments',
    description: `**Purpose:** List all segments in the account. Use to get segment IDs required by create-contact, create-broadcast, list-contacts.

**NOT for:** Listing contacts inside a segment (use list-contacts with segmentId). Not for listing broadcasts (use list-broadcasts).

**Returns:** For each segment: name, id, created_at. Use pagination (limit, after/before) for large lists.

**When to use:** User says "show my segments", "what lists do I have?", or before create-contact/create-broadcast when segmentId is unknown.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Segment ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Segment ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of segments to retrieve. Default: 20, Max: 100, Min: 1`,
      },
    ],
  },
  {
    name: 'resendmcp_list_sent_email_attachments',
    description: `List all attachments from a specific sent email (from send-email or list-emails). Returns attachment metadata including filename, size, content type, and a time-limited download URL.`,
    params: [
      { name: 'emailId', type: 'string', required: true, description: `The sent email ID` },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Attachment ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Attachment ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of attachments to retrieve. Default: 20, Max: 100, Min: 1`,
      },
    ],
  },
  {
    name: 'resendmcp_list_suppressions',
    description: `**Purpose:** List email addresses on the suppression list. Suppressed addresses never receive emails from the account. Optionally filter by origin: "bounce" (added automatically after a hard bounce), "complaint" (added automatically after a spam complaint), or "manual" (added via the API or dashboard).

**NOT for:** Checking a single address (use get-suppression). Not for listing contacts (use list-contacts).

**Returns:** For each suppression: email, id, origin, source_id (when present), created_at. Use pagination (limit, after/before) for large lists.

**When to use:** User says "show my suppression list", "who is suppressed?", or "why isn't this person receiving emails?" combined with a broad look at suppressed addresses.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Suppression ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Suppression ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of suppressions to retrieve. Default: 20, Max: 100, Min: 1`,
      },
      {
        name: 'origin',
        type: 'string',
        required: false,
        description: `Only return suppressions with this origin: "bounce", "complaint", or "manual".`,
      },
    ],
  },
  {
    name: 'resendmcp_list_templates',
    description: `List all email templates from Resend. Returns template names, statuses, and aliases. Don't bother telling the user the IDs unless they ask for them.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Template ID after which to retrieve more (for forward pagination). Cannot be used with "before".`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Template ID before which to retrieve more (for backward pagination). Cannot be used with "after".`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of templates to retrieve. Default: 20, Max: 100, Min: 1`,
      },
    ],
  },
  {
    name: 'resendmcp_list_topics',
    description: `List all topics from Resend. This tool is useful for getting topic IDs to use with other tools like send-email.`,
    params: [],
  },
  {
    name: 'resendmcp_list_webhooks',
    description: `List all webhooks from Resend. Use to get webhook IDs and see which endpoints and events are configured. Not for listing emails, segments, or broadcasts.`,
    params: [],
  },
  {
    name: 'resendmcp_manage_events',
    description: `**Purpose:** Create, list, get, update, or remove event definitions in Resend.

Events define named triggers that your application sends to start automations. Each event can have an optional schema that validates payload data.

**Actions:**
- \`create\`: Define a new event with a name and optional schema.
- \`list\`: List all event definitions (paginated).
- \`get\`: Get event details by ID or name.
- \`update\`: Update an event's schema.
- \`remove\`: Delete an event. You MUST confirm with the user before removing.

**Workflow:** manage-events (create) → create-automation → send-event

**Schema types:** string, number, boolean, date`,
    params: [
      { name: 'action', type: 'string', required: true, description: `The operation to perform.` },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination (for list).`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination (for list).`,
      },
      {
        name: 'identifier',
        type: 'string',
        required: false,
        description: `Event ID or name (for get, update, remove).`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of events to retrieve (for list). Default: 20.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Event name (for create). Use dot notation like "user.created". Cannot start with "resend:".`,
      },
      {
        name: 'schema',
        type: 'string',
        required: false,
        description: `Event payload schema (for create, update). Maps field names to types. Pass null to remove the schema.`,
      },
    ],
  },
  {
    name: 'resendmcp_publish_template',
    description: `Publish an email template in Resend. Templates must be published before they can be used for sending emails. Re-publishing a previously published template makes the latest changes live. Accepts a template ID, alias, or Resend dashboard URL.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The template ID, alias, or Resend dashboard URL (e.g. https://resend.com/templates/<id>)`,
      },
    ],
  },
  {
    name: 'resendmcp_remove_api_key',
    description: `Remove an API key by ID from Resend. Before using this tool, you MUST double-check with the user that they want to remove this API key. Reference the NAME of the API key when double-checking, and warn the user that removing an API key is irreversible and any services using it will lose access. You may only use this tool if the user explicitly confirms they want to remove the API key after you double-check.`,
    params: [{ name: 'id', type: 'string', required: true, description: `API key ID` }],
  },
  {
    name: 'resendmcp_remove_automation',
    description: `Remove an automation by ID or Resend dashboard URL. Before using this tool, you MUST double-check with the user that they want to remove this automation. Reference the NAME of the automation when confirming, and warn the user that removal is irreversible and will stop all future runs. You may only use this tool if the user explicitly confirms.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Automation ID or Resend dashboard URL (e.g. https://resend.com/automations/<id>)`,
      },
    ],
  },
  {
    name: 'resendmcp_remove_broadcast',
    description: `Remove a broadcast by ID or Resend dashboard URL. Before using this tool, you MUST double-check with the user that they want to remove this broadcast. Reference the NAME of the broadcast when double-checking, and warn the user that removing a broadcast is irreversible. You may only use this tool if the user explicitly confirms they want to remove the broadcast after you double-check.`,
    params: [
      {
        name: 'broadcastId',
        type: 'string',
        required: true,
        description: `Broadcast ID or Resend dashboard URL (e.g. https://resend.com/broadcasts/<id>)`,
      },
    ],
  },
  {
    name: 'resendmcp_remove_contact',
    description: `Remove a contact from Resend (by ID or email). Before using this tool, you MUST double-check with the user that they want to remove this contact. Reference the contact's name (if present) and email address when double-checking, and warn the user that removing a contact is irreversible. You may only use this tool if the user explicitly confirms they want to remove the contact after you double-check.`,
    params: [
      { name: 'email', type: 'string', required: false, description: `Contact email address` },
      { name: 'id', type: 'string', required: false, description: `Contact ID` },
    ],
  },
  {
    name: 'resendmcp_remove_contact_from_segment',
    description: `Remove a contact from a segment in Resend (by contact ID or email). Before using this tool, you MUST double-check with the user that they want to remove the contact from the segment.`,
    params: [
      {
        name: 'segmentId',
        type: 'string',
        required: true,
        description: `Segment ID to remove the contact from`,
      },
      { name: 'contactId', type: 'string', required: false, description: `Contact ID` },
      { name: 'email', type: 'string', required: false, description: `Contact email address` },
    ],
  },
  {
    name: 'resendmcp_remove_contact_property',
    description: `Remove a contact property by ID from Resend. Before using this tool, you MUST double-check with the user that they want to remove this contact property. Reference the KEY of the property when double-checking, and warn the user that removing a contact property is irreversible and will remove the property from all contacts. You may only use this tool if the user explicitly confirms they want to remove the contact property after you double-check.`,
    params: [
      {
        name: 'contactPropertyId',
        type: 'string',
        required: true,
        description: `Contact property ID`,
      },
    ],
  },
  {
    name: 'resendmcp_remove_domain',
    description: `Remove a domain by ID from Resend. Before using this tool, you MUST double-check with the user that they want to remove this domain. Reference the NAME of the domain when double-checking, and warn the user that removing a domain is irreversible and will stop all email sending/receiving for that domain. You may only use this tool if the user explicitly confirms they want to remove the domain after you double-check.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Domain ID` }],
  },
  {
    name: 'resendmcp_remove_segment',
    description: `Remove a segment by ID from Resend. Before using this tool, you MUST double-check with the user that they want to remove this segment. Reference the NAME of the segment when double-checking, and warn the user that removing a segment is irreversible. You may only use this tool if the user explicitly confirms they want to remove the segment after you double-check.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Segment ID` }],
  },
  {
    name: 'resendmcp_remove_suppression',
    description: `Remove an entry by ID or email address from the suppression list in Resend, allowing the address to receive emails again. Before using this tool, you MUST double-check with the user that they want to remove this suppression. Reference the EMAIL ADDRESS when double-checking, and warn the user that the address will start receiving emails again — if it was suppressed due to a bounce or complaint, sending to it may hurt deliverability. You may only use this tool if the user explicitly confirms they want to remove the suppression after you double-check.`,
    params: [
      {
        name: 'idOrEmail',
        type: 'string',
        required: true,
        description: `Suppression ID or email address`,
      },
    ],
  },
  {
    name: 'resendmcp_remove_template',
    description: `Remove an email template by ID, alias, or Resend dashboard URL from Resend. Before using this tool, you MUST double-check with the user that they want to remove this template. Reference the NAME of the template when double-checking, and warn the user that removing a template is irreversible. You may only use this tool if the user explicitly confirms they want to remove the template after you double-check.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The template ID, alias, or Resend dashboard URL (e.g. https://resend.com/templates/<id>)`,
      },
    ],
  },
  {
    name: 'resendmcp_remove_topic',
    description: `Remove a topic by ID from Resend. Before using this tool, you MUST double-check with the user that they want to remove this topic. Reference the NAME of the topic when double-checking, and warn the user that removing a topic is irreversible. You may only use this tool if the user explicitly confirms they want to remove the topic after you double-check.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Topic ID` }],
  },
  {
    name: 'resendmcp_remove_webhook',
    description: `Remove a webhook by ID from Resend. Before using this tool, you MUST double-check with the user that they want to remove this webhook. Reference the ENDPOINT of the webhook when double-checking, and warn the user that removing a webhook is irreversible. You may only use this tool if the user explicitly confirms they want to remove the webhook after you double-check.`,
    params: [{ name: 'webhookId', type: 'string', required: true, description: `Webhook ID` }],
  },
  {
    name: 'resendmcp_revoke_oauth_grant',
    description: `Revoke an OAuth grant by ID. Before using this tool, you MUST double-check with the user that they want to revoke this grant. Reference the NAME of the app (client) when double-checking, and warn the user that revocation is immediate and irreversible — every access and refresh token issued under the grant stops working, and the app would need to be re-authorized to regain access. You may only use this tool if the user explicitly confirms they want to revoke the grant after you double-check.`,
    params: [{ name: 'id', type: 'string', required: true, description: `OAuth grant ID` }],
  },
  {
    name: 'resendmcp_send_batch_emails',
    description: `**Purpose:** Send up to 100 transactional emails in one API call. Each item has the same fields as send-email (to, subject, text, from, etc.).

**NOT for:** Sending one email (use send-email) or the same content to a segment (use create-broadcast + send-broadcast).

**When to use:** User wants to send many individual emails in bulk (e.g. 50 password resets, 100 receipts). Not for one-to-many broadcasts.`,
    params: [
      {
        name: 'emails',
        type: 'array',
        required: true,
        description: `Array of email objects to send (1-100 emails)`,
      },
      {
        name: 'idempotencyKey',
        type: 'string',
        required: false,
        description: `Optional unique key for the whole batch that prevents duplicate batch sends on retries (sent as the Idempotency-Key header). Use the same key when retrying the same batch; use a new key for a different batch. Max 256 characters.`,
      },
    ],
  },
  {
    name: 'resendmcp_send_broadcast',
    description: `**Purpose:** Send (or schedule) an existing broadcast by ID. The broadcast must have been created with create-broadcast first.

**NOT for:** Sending a new one-off email (use send-email). Not for creating the broadcast content (use create-broadcast).

**Returns:** Send confirmation and broadcast ID.

**When to use:**
- User has created a broadcast and says "send it", "go ahead and send", "schedule this for tomorrow"
- After create-broadcast; call send-broadcast with the returned ID to deliver to the audience
- Optional scheduledAt: natural language or ISO 8601 for scheduled send

**Workflow:** create-broadcast -> send-broadcast. Use list-broadcasts to find existing draft/sent broadcasts.`,
    params: [
      {
        name: 'broadcastId',
        type: 'string',
        required: true,
        description: `Broadcast ID or Resend dashboard URL (e.g. https://resend.com/broadcasts/<id>)`,
      },
      {
        name: 'scheduledAt',
        type: 'string',
        required: false,
        description: `When to send the broadcast. Value may be in ISO 8601 format (e.g., 2024-08-05T11:52:01.858Z) or in natural language (e.g., "tomorrow at 10am", "in 2 hours", "next day at 9am PST", "Friday at 3pm ET"). If not provided, the broadcast will be sent immediately.`,
      },
    ],
  },
  {
    name: 'resendmcp_send_email',
    description: `**Purpose:** Send a single transactional email to one or more recipients immediately (or schedule it). Use for one-off messages, notifications, and direct replies.

**NOT for:** Sending the same email to a whole list/audience (use create-broadcast + send-broadcast). Not for managing contacts or audiences.

**Returns:** Send confirmation and email ID.

**When to use:**
- User wants to "send an email" to specific people (names or addresses)
- One-off messages: password reset, order confirmation, receipt, alert
- User says "email this to X", "notify them", "send a message to..."
- Scheduling a single email for later

**Workflow:** Get recipient(s) and content from user → send-email. Use list-emails or get-email to check delivery status afterward.

**Key trigger phrases:** "Send an email", "Email this to", "Notify", "Send a message", "Reply to them", "Schedule an email"`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `Sender email address (e.g. "onboarding@resend.com" or "Acme <onboarding@resend.com>"). You MUST ask the user for this parameter. Under no circumstance provide it yourself`,
      },
      { name: 'subject', type: 'string', required: true, description: `Email subject line` },
      { name: 'text', type: 'string', required: true, description: `Plain text email content` },
      {
        name: 'to',
        type: 'array',
        required: true,
        description: `Array of recipient email addresses (1-50 recipients)`,
      },
      {
        name: 'attachments',
        type: 'array',
        required: false,
        description: `Array of file attachments. Each needs filename plus one of: url or content. Max 40MB total.`,
      },
      {
        name: 'bcc',
        type: 'array',
        required: false,
        description: `Optional array of BCC email addresses. You MUST ask the user for this parameter. Under no circumstance provide it yourself`,
      },
      {
        name: 'cc',
        type: 'array',
        required: false,
        description: `Optional array of CC email addresses. You MUST ask the user for this parameter. Under no circumstance provide it yourself`,
      },
      {
        name: 'headers',
        type: 'object',
        required: false,
        description: `Optional custom email headers as key/value pairs (e.g. {"List-Unsubscribe": "<https://example.com/unsubscribe>", "X-Entity-Ref-ID": "unique-id"}). Use for one-click unsubscribe, preventing Gmail threading, or other MIME headers Resend accepts.`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `HTML email content. When provided, the plain text argument MUST be provided as well.`,
      },
      {
        name: 'idempotencyKey',
        type: 'string',
        required: false,
        description: `Optional unique key that prevents duplicate sends on retries (sent as the Idempotency-Key header). Use the same key when retrying the same logical email; use a new key for a different email. Max 256 characters.`,
      },
      {
        name: 'replyTo',
        type: 'array',
        required: false,
        description: `Optional email addresses for the email readers to reply to (e.g. "support@example.com" or "Support Team <support@example.com>"). You MUST ask the user for this parameter. Under no circumstance provide it yourself`,
      },
      {
        name: 'scheduledAt',
        type: 'string',
        required: false,
        description: `Optional parameter to schedule the email. This uses natural language. Examples would be 'tomorrow at 10am' or 'in 2 hours' or 'next day at 9am PST' or 'Friday at 3pm ET'.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of custom tags for tracking/analytics. Each tag has a name and value.`,
      },
      {
        name: 'topicId',
        type: 'string',
        required: false,
        description: `Topic ID for subscription-based sending. When set, the email respects contact subscription preferences for this topic.`,
      },
    ],
  },
  {
    name: 'resendmcp_send_event',
    description: `**Purpose:** Fire an event to trigger automations for a specific contact.

**When to use:**
- User wants to trigger an automation workflow for a contact
- Testing an automation by sending a test event

**Workflow:** create-event (if needed) → create-automation (if needed) → send-event

**Important:**
- The event name must match the trigger event name in an automation for it to fire.
- Identify the contact by either contactId OR email, not both.
- The payload is optional and can contain any key-value data that the automation steps can reference via event.* variables.`,
    params: [
      {
        name: 'event',
        type: 'string',
        required: true,
        description: `The event name (e.g., "user.created", "payment.failed")`,
      },
      {
        name: 'contactId',
        type: 'string',
        required: false,
        description: `The contact ID to associate with the event. Use either contactId or email, not both.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `The contact email to associate with the event. Use either contactId or email, not both.`,
      },
      {
        name: 'payload',
        type: 'object',
        required: false,
        description: `Optional key-value data passed to the automation. Accessible in steps via event.* variables.`,
      },
    ],
  },
  {
    name: 'resendmcp_update_api_key',
    description: `Rename an existing API key in Resend. Only the name can be changed — permission and domain restrictions are fixed at creation and cannot be updated.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `API key ID` },
      { name: 'name', type: 'string', required: true, description: `New API key name` },
    ],
  },
  {
    name: 'resendmcp_update_automation',
    description: `**Purpose:** Update an automation's name, status, or workflow.

**When to use:**
- User wants to rename an automation
- User wants to enable or disable an automation (use status: "disabled" to stop it)
- User wants to modify the workflow steps

**Important:**
- To disable/stop an automation, set status to "disabled". Existing runs will continue to completion.
- When updating the workflow, provide the complete new workflow — it replaces the existing one.
- Use get-automation first to see the current workflow before making changes.

The workflow is a JSON object with one key: "steps" — an array of step objects.

Each step has: key (unique string), type, config, and either "next" (string|null) or "branches" (for branching steps).
Use keys like: "trigger", "send_email_1", "delay_1", "condition_1", "wait_event_1".

## Step types

### trigger — starts the automation when an event fires (required, exactly one)
config: { "eventName": "<event_name>" }
Uses "next".

### send_email — send an email using a published template
config: { "template": { "id": "<template_id>", "variables": { "<key>": "<value>" } }, "from": "Name <sender@example.com>", "subject": "Email subject", "replyTo": "<address>" }
**"from" and "subject" are resolved from the step config first, then fall back to the template.** If neither provides a "from", the email will silently fail to send. If neither provides a "subject", the run will error. Best practice: always set "from" and "subject" on the step config so the automation is self-contained. Use list-domains to find verified domains for "from". "replyTo" and "variables" are optional. Variables can use { "var": "event.<field>" } or { "var": "contact.<field>" } for dynamic values.
Uses "next".

### delay — pause the workflow
config: { "duration": "<human-readable>" }
Examples: "30 minutes", "1 hour", "2 days", "1 week". Max 30 days.
Uses "next".

### condition — conditional split based on contact or event data
config: A condition rule object:
  Single rule: { "type": "rule", "field": "event.<field>" or "contact.<field>", "operator": "<op>", "value": <value> }
  Compound: { "type": "and"|"or", "rules": [<rule>, ...] }
Operators: eq, neq, gt, gte, lt, lte, contains, starts_with, ends_with, exists, is_empty.
exists/is_empty do not require a value.
Uses "branches": { "condition_met": "<step_key>", "condition_not_met": "<step_key_or_null>" }

### wait_for_event — pause until a specific event arrives or timeout
config: { "eventName": "<event_name>", "timeout": "<human-readable>", "filterRule": <optional condition rule> }
For email lifecycle events use "resend:email.<opened|clicked|bounced|delivered|complained|failed|suppressed>".
Uses "branches": { "event_received": "<step_key>", "timeout": "<step_key_or_null>" }

### contact_update — update contact fields
config: { "firstName": "<value>", "lastName": "<value>", "unsubscribed": true|false, "properties": { "<key>": "<value>" } }
All fields optional. Values can use { "var": "event.<field>" } for dynamic data.
Uses "next".

### contact_delete — remove the contact from the audience
config: {}
Uses "next".

### add_to_segment — add contact to a segment
config: { "segmentId": "<segment_id>" }
Uses "next".

## Rules
1. Every step must be reachable from the trigger via next/branches.
2. Terminal steps have "next": null (or null branch values).
3. The workflow must be tree-shaped — no merging branches back together.

## Example: Linear drip campaign

{
  "steps": [
    { "key": "trigger", "type": "trigger", "config": { "eventName": "user.created" }, "next": "send_email_1" },
    { "key": "send_email_1", "type": "send_email", "config": { "template": { "id": "tmpl_123" }, "from": "Welcome <hello@example.com>", "subject": "Welcome!" }, "next": "delay_1" },
    { "key": "delay_1", "type": "delay", "config": { "duration": "3 days" }, "next": "send_email_2" },
    { "key": "send_email_2", "type": "send_email", "config": { "template": { "id": "tmpl_456" }, "from": "Welcome <hello@example.com>", "subject": "Getting started" }, "next": null }
  ]
}

## Example: Re-engagement with wait_for_event

{
  "steps": [
    { "key": "trigger", "type": "trigger", "config": { "eventName": "user.created" }, "next": "send_email_1" },
    { "key": "send_email_1", "type": "send_email", "config": { "template": { "id": "tmpl_789" }, "from": "Team <team@example.com>", "subject": "Welcome" }, "next": "wait_event_1" },
    { "key": "wait_event_1", "type": "wait_for_event", "config": { "eventName": "resend:email.opened", "timeout": "3 days" }, "branches": { "event_received": null, "timeout": "send_email_2" } },
    { "key": "send_email_2", "type": "send_email", "config": { "template": { "id": "tmpl_abc" }, "from": "Team <team@example.com>", "subject": "Did you miss this?" }, "next": null }
  ]
}

## Example: Condition branch

{
  "steps": [
    { "key": "trigger", "type": "trigger", "config": { "eventName": "trial.ended" }, "next": "condition_1" },
    { "key": "condition_1", "type": "condition", "config": { "type": "rule", "field": "event.converted", "operator": "eq", "value": true }, "branches": { "condition_met": "send_email_1", "condition_not_met": "send_email_2" } },
    { "key": "send_email_1", "type": "send_email", "config": { "template": { "id": "tmpl_thanks" }, "from": "Team <team@example.com>", "subject": "Thanks for upgrading!" }, "next": null },
    { "key": "send_email_2", "type": "send_email", "config": { "template": { "id": "tmpl_win_back" }, "from": "Team <team@example.com>", "subject": "We'd love to have you back" }, "next": null }
  ]
}`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Automation ID or Resend dashboard URL (e.g. https://resend.com/automations/<id>)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the automation.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status. Use "disabled" to stop the automation (prevents new runs).`,
      },
      {
        name: 'workflow',
        type: 'object',
        required: false,
        description: `New workflow definition. Replaces the existing workflow entirely.`,
      },
    ],
  },
  {
    name: 'resendmcp_update_broadcast',
    description: `Update broadcast metadata by ID or Resend dashboard URL (name, subject, from, html, text, segment, preview text, reply-to). To edit TipTap content, use compose-broadcast instead.

**Important:** The API requires \`from\` and \`segmentId\` to be set on the broadcast. If the broadcast was created from the dashboard, these may be empty. Always call get-broadcast first to check, and include \`from\` and \`segmentId\` in your update if they are not already set. Use list-domains to find verified domains for the from address, and list-segments to find segment IDs.

**Note on html/text fields:** Setting html or text via this tool replaces any content previously set via compose-broadcast. This switch is lossy — some content or formatting may be lost. Prefer compose-broadcast for content changes. If the broadcast was composed with TipTap content, ask the user before overwriting it with raw HTML.`,
    params: [
      {
        name: 'broadcastId',
        type: 'string',
        required: true,
        description: `Broadcast ID or Resend dashboard URL (e.g. https://resend.com/broadcasts/<id>)`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `From email address (e.g. "onboarding@resend.com" or "Resend <onboarding@resend.com>")`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `HTML content of the email.

Email HTML requirements — follow all of these without exception:

STRUCTURE
- Always include <!DOCTYPE html>, <html>, <head>, <body>
- Layout must be table-based: <table>, <tr>, <td> — never use <div> for layout
- Outer wrapper table at width="100%", inner content table at max 600px wide
- Every table must have cellpadding="0" cellspacing="0" border="0"

CSS
- All styles must be inline (style="...") — no <style> tag, no external stylesheets
- No flexbox, no grid, no CSS variables, no CSS shorthand (use padding-top not padding)
- font-family must always include web-safe fallbacks (Arial, Helvetica, Georgia, sans-serif)
- Always set font-size, line-height, and color explicitly on every text element

IMAGES
- Always set width, height, border="0", display:block on every <img>
- Use absolute URLs only — no relative paths
- Always include alt text

LINKS & BUTTONS
- Never use <button> — use <a> styled as a button inside a <td>
- No <video>, <form>, or <input> elements
- No JavaScript of any kind

OUTLOOK COMPATIBILITY
- Use bgcolor attribute on <td> alongside CSS background-color
- No CSS background-image (poor Outlook support)
- Add <!--[if mso]> conditionals where needed for Outlook rendering

META (in <head>)
- <meta charset="UTF-8">
- <meta name="viewport" content="width=device-width, initial-scale=1.0">
- <meta http-equiv="X-UA-Compatible" content="IE=edge">`,
      },
      { name: 'name', type: 'string', required: false, description: `Name for the broadcast` },
      {
        name: 'previewText',
        type: 'string',
        required: false,
        description: `Preview text for the email`,
      },
      {
        name: 'replyTo',
        type: 'array',
        required: false,
        description: `Reply-to email address(es)`,
      },
      { name: 'segmentId', type: 'string', required: false, description: `Segment ID to send to` },
      { name: 'subject', type: 'string', required: false, description: `Email subject` },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Plain text content of the email`,
      },
    ],
  },
  {
    name: 'resendmcp_update_contact',
    description: `Update a contact in Resend (by ID or email).`,
    params: [
      { name: 'email', type: 'string', required: false, description: `Contact email address` },
      {
        name: 'firstName',
        type: 'string',
        required: false,
        description: `Contact first name. Pass \`null\` to remove the contact's first name.`,
      },
      { name: 'id', type: 'string', required: false, description: `Contact ID` },
      {
        name: 'lastName',
        type: 'string',
        required: false,
        description: `Contact last name. Pass \`null\` to remove the contact's last name.`,
      },
      {
        name: 'properties',
        type: 'object',
        required: false,
        description: `Custom property key-value pairs to update (e.g. { "company_name": "Acme" })`,
      },
      {
        name: 'unsubscribed',
        type: 'boolean',
        required: false,
        description: `Whether the contact is unsubscribed from all broadcasts`,
      },
    ],
  },
  {
    name: 'resendmcp_update_contact_property',
    description: `Update an existing contact property in Resend. Only the fallback value can be changed — the key and type cannot be modified after creation.`,
    params: [
      {
        name: 'contactPropertyId',
        type: 'string',
        required: true,
        description: `Contact property ID`,
      },
      {
        name: 'fallbackValue',
        type: 'string',
        required: true,
        description: `New default value for the property. Pass null to remove the fallback value. Must match the property type.`,
      },
    ],
  },
  {
    name: 'resendmcp_update_contact_topics',
    description: `Update topic subscriptions for a contact in Resend (by contact ID or email).`,
    params: [
      {
        name: 'topics',
        type: 'array',
        required: true,
        description: `Array of topic subscription configurations to update`,
      },
      { name: 'email', type: 'string', required: false, description: `Contact email address` },
      { name: 'id', type: 'string', required: false, description: `Contact ID` },
    ],
  },
  {
    name: 'resendmcp_update_domain',
    description: `Update an existing domain in Resend. Allows changing tracking settings, TLS mode, and capabilities.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Domain ID` },
      {
        name: 'capabilities',
        type: 'object',
        required: false,
        description: `Domain capabilities. At least one capability must remain enabled.`,
      },
      {
        name: 'clickTracking',
        type: 'boolean',
        required: false,
        description: `Track clicks within the body of each HTML email.`,
      },
      {
        name: 'openTracking',
        type: 'boolean',
        required: false,
        description: `Track the open rate of each email.`,
      },
      {
        name: 'tls',
        type: 'string',
        required: false,
        description: `TLS mode. "opportunistic" attempts secure connection with fallback. "enforced" requires TLS or fails.`,
      },
      {
        name: 'trackingSubdomain',
        type: 'string',
        required: false,
        description: `Custom subdomain for tracking links (e.g., "track" for track.example.com). When set, click and open tracking URLs will use this subdomain instead of the default.`,
      },
    ],
  },
  {
    name: 'resendmcp_update_email',
    description: `Reschedule a scheduled email by updating its scheduled send time. Only works for emails that were scheduled and have not yet been sent.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the scheduled email to update`,
      },
      {
        name: 'scheduledAt',
        type: 'string',
        required: true,
        description: `The new scheduled time in ISO 8601 format (e.g., "2024-08-05T11:52:01.858Z").`,
      },
    ],
  },
  {
    name: 'resendmcp_update_template',
    description: `Update template metadata by ID, alias, or Resend dashboard URL (name, subject, from, html, variables, etc.). After updating a published template, use publish-template again to make the changes live. To edit TipTap content, use compose-template instead.

**Note on html/text fields:** Setting html or text via this tool replaces any content previously set via compose-template. This switch is lossy — some content or formatting may be lost. Prefer compose-template for content changes. If the template was composed with TipTap content, ask the user before overwriting it with raw HTML.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The template ID, alias, or Resend dashboard URL (e.g. https://resend.com/templates/<id>)`,
      },
      {
        name: 'alias',
        type: 'string',
        required: false,
        description: `New alias for the template.`,
      },
      { name: 'from', type: 'string', required: false, description: `New sender email address.` },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `New HTML content for the template.

Email HTML requirements — follow all of these without exception:

STRUCTURE
- Always include <!DOCTYPE html>, <html>, <head>, <body>
- Layout must be table-based: <table>, <tr>, <td> — never use <div> for layout
- Outer wrapper table at width="100%", inner content table at max 600px wide
- Every table must have cellpadding="0" cellspacing="0" border="0"

CSS
- All styles must be inline (style="...") — no <style> tag, no external stylesheets
- No flexbox, no grid, no CSS variables, no CSS shorthand (use padding-top not padding)
- font-family must always include web-safe fallbacks (Arial, Helvetica, Georgia, sans-serif)
- Always set font-size, line-height, and color explicitly on every text element

IMAGES
- Always set width, height, border="0", display:block on every <img>
- Use absolute URLs only — no relative paths
- Always include alt text

LINKS & BUTTONS
- Never use <button> — use <a> styled as a button inside a <td>
- No <video>, <form>, or <input> elements
- No JavaScript of any kind

OUTLOOK COMPATIBILITY
- Use bgcolor attribute on <td> alongside CSS background-color
- No CSS background-image (poor Outlook support)
- Add <!--[if mso]> conditionals where needed for Outlook rendering

META (in <head>)
- <meta charset="UTF-8">
- <meta name="viewport" content="width=device-width, initial-scale=1.0">
- <meta http-equiv="X-UA-Compatible" content="IE=edge">`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the template.` },
      {
        name: 'replyTo',
        type: 'string',
        required: false,
        description: `New Reply-to email address(es).`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `New default email subject.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `New plain text version of the message.`,
      },
      {
        name: 'variables',
        type: 'array',
        required: false,
        description: `New array of template variables (replaces existing variables).`,
      },
    ],
  },
  {
    name: 'resendmcp_update_topic',
    description: `Update an existing topic in Resend. Note: defaultSubscription cannot be modified after creation.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Topic ID` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New topic description (max 200 characters)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New topic name (max 50 characters)`,
      },
    ],
  },
  {
    name: 'resendmcp_update_webhook',
    description: `Update an existing webhook in Resend. You can change the endpoint URL, subscribed events, or enable/disable the webhook.`,
    params: [
      { name: 'webhookId', type: 'string', required: true, description: `Webhook ID` },
      {
        name: 'endpoint',
        type: 'string',
        required: false,
        description: `New URL where webhook events will be sent`,
      },
      {
        name: 'events',
        type: 'array',
        required: false,
        description: `New array of event types to subscribe to`,
      },
      { name: 'status', type: 'string', required: false, description: `Webhook status` },
    ],
  },
  {
    name: 'resendmcp_verify_domain',
    description: `Trigger domain verification in Resend. This starts an asynchronous verification process that checks if the DNS records are correctly configured. The domain status will temporarily show as "pending" during verification.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Domain ID` }],
  },
  {
    name: 'resendmcp_verify_domain_claim',
    description: `Trigger asynchronous DNS verification and ownership transfer for a domain claim, using the placeholder Domain ID. The claim stays "pending" while verification runs; poll get-domain-claim for status. Once "completed", the transferred domain has NEW DKIM records — fetch them with get-domain, add them to DNS, then run verify-domain.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The placeholder Domain ID created by the claim`,
      },
    ],
  },
]
