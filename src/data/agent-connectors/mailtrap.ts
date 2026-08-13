import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mailtrap_batch_send_bulk_email',
    description: `Send up to 500 marketing/bulk emails in a single API call via the Bulk Sending stream, each with its own recipients and content, optionally sharing base properties. Returns HTTP 200 even if individual messages fail -- check the per-message results for status.`,
    params: [
      {
        name: 'requests_json',
        type: 'string',
        required: true,
        description: `JSON array of individual email configurations (max 500), each with the same fields as a single send (from, to, subject, text/html, etc.).`,
      },
      {
        name: 'base_json',
        type: 'string',
        required: false,
        description: `JSON object of base properties shared by all emails in the batch (from, subject, text, html, category, template_uuid, etc.), used as defaults when not overridden per-request.`,
      },
    ],
  },
  {
    name: 'mailtrap_batch_send_email',
    description: `Send up to 500 transactional emails in a single API call, each with its own recipients and content, optionally sharing base properties. Returns HTTP 200 even if individual messages fail -- check the per-message results for status.`,
    params: [
      {
        name: 'requests_json',
        type: 'string',
        required: true,
        description: `JSON array of individual email configurations (max 500), each with the same fields as a single send (from, to, subject, text/html, etc.).`,
      },
      {
        name: 'base_json',
        type: 'string',
        required: false,
        description: `JSON object of base properties shared by all emails in the batch (from, subject, text, html, category, template_uuid, etc.), used as defaults when not overridden per-request.`,
      },
    ],
  },
  {
    name: 'mailtrap_clean_sandbox',
    description: `Delete all captured messages from a sandbox inbox, clearing it for fresh test runs.`,
    params: [
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `ID of the sandbox inbox to clean.`,
      },
    ],
  },
  {
    name: 'mailtrap_create_api_token',
    description: `Create a new API token with a specified name and optional resource permissions.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name for the new API token.` },
      {
        name: 'permissions_json',
        type: 'string',
        required: true,
        description: `JSON array string of permission objects. The Mailtrap API requires at least one permission.`,
      },
    ],
  },
  {
    name: 'mailtrap_create_contact',
    description: `Create a new marketing contact with email address, custom fields, and contact list assignments.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address of the contact. Must be a valid email address.`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `First name of the contact.`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `Last name of the contact.`,
      },
      {
        name: 'list_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list IDs to add this contact to upon creation, e.g. '123,456'.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Subscription status of the contact. Valid values: subscribed, unsubscribed.`,
      },
    ],
  },
  {
    name: 'mailtrap_create_contact_field',
    description: `Create a custom contact field with a name and data type (text, integer, float, boolean, or date).`,
    params: [
      {
        name: 'data_type',
        type: 'string',
        required: true,
        description: `The data type of the contact field.`,
      },
      {
        name: 'merge_tag',
        type: 'string',
        required: true,
        description: `Lowercase short identifier with underscores used as a merge tag in email templates (e.g. company_size).`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name for the custom contact field.`,
      },
    ],
  },
  {
    name: 'mailtrap_create_contact_list',
    description: `Create a new contact list for segmenting marketing email recipients.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name for the new contact list, e.g. 'Monthly Newsletter Subscribers'.`,
      },
    ],
  },
  {
    name: 'mailtrap_create_domain',
    description: `Create a new sending domain and receive DNS configuration records for DKIM and SPF setup.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name to add as a sending domain.`,
      },
    ],
  },
  {
    name: 'mailtrap_create_email_campaign',
    description: `Create a new email marketing campaign as a draft. Requires an existing verified sending domain (domain_id), a From local part, and a template subject. Scheduling and starting are separate actions.`,
    params: [
      {
        name: 'domain_id',
        type: 'integer',
        required: true,
        description: `ID of the verified sending domain used for the campaign.`,
      },
      {
        name: 'from_local_part',
        type: 'string',
        required: true,
        description: `Local part (before the @) of the From address.`,
      },
      { name: 'name', type: 'string', required: true, description: `Campaign name.` },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `Email subject line. Supports merge tags, e.g. 'Hi {{first_name}}'.`,
      },
      {
        name: 'body_html',
        type: 'string',
        required: false,
        description: `HTML body of the email (the design). Optional for a draft; required before the campaign can be scheduled or started. Include an unsubscribe link via an anchor whose href contains the __unsubscribe_url__ placeholder.`,
      },
      {
        name: 'body_text',
        type: 'string',
        required: false,
        description: `Optional plain-text alternative of the email body.`,
      },
      {
        name: 'contact_list_ids',
        type: 'string',
        required: false,
        description: `Comma-separated IDs of contact lists to send to.`,
      },
      {
        name: 'contact_segment_ids',
        type: 'string',
        required: false,
        description: `Comma-separated IDs of contact segments to send to.`,
      },
      {
        name: 'delivery_mode',
        type: 'string',
        required: false,
        description: `How the campaign is delivered. 'rapid' sends as fast as possible; 'gradual' throttles sending to emails_per_hour.`,
      },
      {
        name: 'emails_per_hour',
        type: 'integer',
        required: false,
        description: `Delivery throttle. Applies only when delivery_mode is 'gradual'.`,
      },
      {
        name: 'from_display_name',
        type: 'string',
        required: false,
        description: `Display name shown in the From header.`,
      },
      {
        name: 'reply_to_display_name',
        type: 'string',
        required: false,
        description: `Display name for the Reply-To address.`,
      },
      {
        name: 'reply_to_domain',
        type: 'string',
        required: false,
        description: `Domain of the Reply-To address.`,
      },
      {
        name: 'reply_to_local_part',
        type: 'string',
        required: false,
        description: `Local part (before the @) of the Reply-To address.`,
      },
    ],
  },
  {
    name: 'mailtrap_create_inbox',
    description: `Create a new inbound email inbox inside a folder. A standard inbox gets a unique generated receiving address; attaching a verified custom sending domain (with inbound enabled) instead creates a catch-all inbox that receives mail for any address on that domain.`,
    params: [
      {
        name: 'folder_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the inbound folder to create the inbox in.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name for the new inbox.` },
      {
        name: 'domain_id',
        type: 'integer',
        required: false,
        description: `Attach the inbox to a verified custom sending domain (with inbound enabled), creating a catch-all inbox for any address on that domain. Omit to create a standard Mailtrap-hosted inbox. Requires the custom domains feature.`,
      },
    ],
  },
  {
    name: 'mailtrap_create_project',
    description: `Create a new sandbox project to organize testing inboxes by team or application.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the new sandbox project.`,
      },
    ],
  },
  {
    name: 'mailtrap_create_sandbox',
    description: `Create a new sandbox inbox within a specific project for capturing test emails.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name for the new sandbox inbox.`,
      },
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `ID of the project in which to create the sandbox inbox.`,
      },
    ],
  },
  {
    name: 'mailtrap_create_sub_account',
    description: `Create a new sub-account under a Mailtrap organization.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the new sub-account.` },
      {
        name: 'organization_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the organization to create the sub-account under.`,
      },
    ],
  },
  {
    name: 'mailtrap_create_suppression',
    description: `Add an email address to the suppression list to prevent future email deliveries.`,
    params: [
      {
        name: 'domain_id',
        type: 'integer',
        required: true,
        description: `Numeric ID of the verified sending domain this suppression applies to.`,
      },
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address to add to the suppression list.`,
      },
      {
        name: 'sending_stream',
        type: 'string',
        required: true,
        description: `Sending stream to suppress the email address on.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Suppression type indicating the reason for suppression.`,
      },
    ],
  },
  {
    name: 'mailtrap_create_template',
    description: `Create a new reusable email template with name, subject, and HTML/text body content.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: true,
        description: `Category to organize the template.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the email template.` },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `Subject line for the email template.`,
      },
      {
        name: 'html_body',
        type: 'string',
        required: false,
        description: `HTML body content of the email template.`,
      },
      {
        name: 'text_body',
        type: 'string',
        required: false,
        description: `Plain text body content of the email template.`,
      },
    ],
  },
  {
    name: 'mailtrap_create_webhook',
    description: `Create a webhook subscription that receives real-time HTTP notifications for account events (email sending, campaigns, audit log, or inbound receiving). The response includes a signing_secret returned only once — store it securely to verify payload signatures.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL that will receive webhook payloads.`,
      },
      {
        name: 'webhook_type',
        type: 'string',
        required: true,
        description: `The type of webhook. Determines which events the webhook can subscribe to.`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the webhook is active. Defaults to true.`,
      },
      {
        name: 'domain_id',
        type: 'integer',
        required: false,
        description: `Scopes the webhook to a specific sending domain ID, or all domains if omitted. Applicable only for email_sending and campaigns webhooks.`,
      },
      {
        name: 'event_types',
        type: 'string',
        required: false,
        description: `Comma-separated list of event types to subscribe to. Required for email_sending and campaigns webhook types. Valid values: delivery, soft_bounce, bounce, suspension, unsubscribe, open, spam_complaint, click, reject.`,
      },
      {
        name: 'inbound_inbox_id',
        type: 'integer',
        required: false,
        description: `ID of the inbound inbox the webhook is linked to. Optional for inbound_receiving webhooks — omit to apply to all inboxes in the account. Not applicable to any other webhook type.`,
      },
      {
        name: 'payload_format',
        type: 'string',
        required: false,
        description: `Format of the webhook payload. Valid values: json, jsonlines.`,
      },
      {
        name: 'sending_stream',
        type: 'string',
        required: false,
        description: `Sending stream the webhook subscribes to. Required for the email_sending webhook type. Valid values: transactional, bulk.`,
      },
    ],
  },
  {
    name: 'mailtrap_delete_api_token',
    description: `Permanently delete an API token by ID. This action cannot be undone.`,
    params: [
      {
        name: 'token_id',
        type: 'integer',
        required: true,
        description: `ID of the API token to permanently delete.`,
      },
    ],
  },
  {
    name: 'mailtrap_delete_contact',
    description: `Permanently remove a contact by UUID or email address from the Mailtrap account. This action cannot be undone.`,
    params: [
      {
        name: 'contact_identifier',
        type: 'string',
        required: true,
        description: `UUID or email address of the contact to permanently delete. Example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' or 'alice@example.com'.`,
      },
    ],
  },
  {
    name: 'mailtrap_delete_contact_list',
    description: `Delete a contact list by ID. This does not delete the contacts within the list.`,
    params: [
      {
        name: 'list_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the contact list to delete.`,
      },
    ],
  },
  {
    name: 'mailtrap_delete_domain',
    description: `Delete a sending domain from the Mailtrap account. This action is permanent and cannot be undone.`,
    params: [
      {
        name: 'domain_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the domain to delete.`,
      },
    ],
  },
  {
    name: 'mailtrap_delete_email_campaign',
    description: `Soft-delete an email campaign by ID. The campaign must not be in a sending state. This action cannot be undone.`,
    params: [
      {
        name: 'email_campaign_id',
        type: 'integer',
        required: true,
        description: `Unique identifier of the email campaign to permanently delete.`,
      },
    ],
  },
  {
    name: 'mailtrap_delete_project',
    description: `Permanently delete a sandbox project and all of its sandbox inboxes. This action cannot be undone.`,
    params: [
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the project to delete.`,
      },
    ],
  },
  {
    name: 'mailtrap_delete_sandbox',
    description: `Permanently delete a sandbox inbox and all of its captured test messages. This action cannot be undone.`,
    params: [
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox to delete.`,
      },
    ],
  },
  {
    name: 'mailtrap_delete_sandbox_message',
    description: `Permanently delete a single captured message from a sandbox inbox. This action cannot be undone.`,
    params: [
      {
        name: 'message_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox message to delete.`,
      },
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox containing the message.`,
      },
    ],
  },
  {
    name: 'mailtrap_delete_suppression',
    description: `Remove an email address from the suppression list to re-enable email deliveries.`,
    params: [
      {
        name: 'suppression_id',
        type: 'integer',
        required: true,
        description: `ID of the suppression record to remove.`,
      },
    ],
  },
  {
    name: 'mailtrap_delete_template',
    description: `Permanently delete an email template by ID.`,
    params: [
      {
        name: 'email_template_id',
        type: 'integer',
        required: true,
        description: `ID of the email template to delete.`,
      },
    ],
  },
  {
    name: 'mailtrap_delete_webhook',
    description: `Permanently delete a webhook by ID. This action cannot be undone.`,
    params: [
      {
        name: 'webhook_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the webhook to permanently delete.`,
      },
    ],
  },
  {
    name: 'mailtrap_export_contacts',
    description: `Start an asynchronous export of the account's contacts to a downloadable file, optionally filtered by contact list membership or subscription status. Use the returned export ID with Get Contact Export to poll for the download URL.`,
    params: [
      {
        name: 'filters',
        type: 'string',
        required: false,
        description: `JSON array of filter objects to scope the export. Supported filters: {"name":"list_id","operator":"equal","value":[1,2]} and {"name":"subscription_status","operator":"equal","value":"subscribed"}. Omit to export all contacts.`,
      },
    ],
  },
  {
    name: 'mailtrap_forward_sandbox_message',
    description: `Forward a captured sandbox test email to a real recipient email address for live testing.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `The real recipient email address to forward the sandbox message to.`,
      },
      {
        name: 'message_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox message to forward.`,
      },
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox containing the message.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_accounts',
    description: `List all Mailtrap accounts the API token has access to.`,
    params: [],
  },
  {
    name: 'mailtrap_get_api_token',
    description: `Retrieve a single API token by ID, including its name and resource permissions. Does not return the token's secret value.`,
    params: [
      {
        name: 'token_id',
        type: 'integer',
        required: true,
        description: `ID of the API token to retrieve.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_billing_usage',
    description: `Get current billing cycle usage for Sandbox, Email API, and Email Marketing quotas.`,
    params: [],
  },
  {
    name: 'mailtrap_get_contact',
    description: `Retrieve a contact by UUID or email address, including their subscription status and custom fields.`,
    params: [
      {
        name: 'contact_identifier',
        type: 'string',
        required: true,
        description: `UUID or email address of the contact to retrieve. Example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' or 'alice@example.com'.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_contact_export',
    description: `Check the status of a contact export job by its ID. Returns a download URL once the export has finished.`,
    params: [
      {
        name: 'export_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the contact export job to check.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_contact_import',
    description: `Check the status and results of an asynchronous contact import job by its ID.`,
    params: [
      {
        name: 'import_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the contact import job to check.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_contact_list',
    description: `Get details of a specific contact list by ID, including its name and contact count.`,
    params: [
      {
        name: 'list_id',
        type: 'integer',
        required: true,
        description: `Numeric ID of the contact list to retrieve. Example: 42.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_domain',
    description: `Get details for a specific sending domain including DNS records, DKIM keys, and verification status.`,
    params: [
      {
        name: 'domain_id',
        type: 'integer',
        required: true,
        description: `ID of the sending domain to retrieve.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_email_campaign',
    description: `Retrieve a single email campaign by ID, including its state, audience, and template attributes.`,
    params: [
      {
        name: 'email_campaign_id',
        type: 'integer',
        required: true,
        description: `Unique identifier of the email campaign.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_email_campaign_stats',
    description: `Get aggregated performance metrics for a campaign: counts and rates for deliveries, opens, clicks, bounces, spam complaints, and unsubscriptions. Returns all-zero counts if the campaign has never been started. Optionally narrow the aggregation window with start_date/end_date.`,
    params: [
      {
        name: 'email_campaign_id',
        type: 'integer',
        required: true,
        description: `Unique identifier of the email campaign.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End of the aggregation window, as a date (YYYY-MM-DD).`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start of the aggregation window, as a date (YYYY-MM-DD).`,
      },
    ],
  },
  {
    name: 'mailtrap_get_email_log',
    description: `Retrieve detailed information for a specific sent message by its ID, including delivery events and timestamps.`,
    params: [
      {
        name: 'sending_message_id',
        type: 'string',
        required: true,
        description: `The unique ID of the sent message to retrieve. Obtained from the List Email Logs response.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_inbound_message',
    description: `Retrieve full details of a single inbound email message, including decoded HTML/text bodies, headers, attachments with download URLs, and a link to the raw .eml file.`,
    params: [
      {
        name: 'inbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the inbound inbox containing the message.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the inbound message to retrieve.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_inbox',
    description: `Retrieve a single inbound email inbox by ID, including its receiving address and attached domain.`,
    params: [
      {
        name: 'folder_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the inbound folder that contains the inbox.`,
      },
      {
        name: 'inbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the inbox to retrieve.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_message_attachment',
    description: `Get metadata for a single attachment captured on a sandbox test message, including filename, content type, and size.`,
    params: [
      {
        name: 'attachment_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the attachment to retrieve.`,
      },
      {
        name: 'message_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox message that owns the attachment.`,
      },
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox containing the message.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_message_body_html',
    description: `Get the rendered HTML body content of a captured sandbox test message.`,
    params: [
      {
        name: 'message_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox message whose HTML body will be retrieved.`,
      },
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox containing the message.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_message_body_text',
    description: `Get the plain-text body content of a captured sandbox test message.`,
    params: [
      {
        name: 'message_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox message whose text body will be retrieved.`,
      },
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox containing the message.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_message_spam_report',
    description: `Get spam analysis score and detailed spam rule report for a captured sandbox email.`,
    params: [
      {
        name: 'message_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox message to analyze for spam.`,
      },
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox containing the message.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_project',
    description: `Get details of a single sandbox project by ID, including its sandbox inboxes.`,
    params: [
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the project to retrieve.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_sandbox',
    description: `Get details of a single sandbox inbox by ID, including its email address and credentials info.`,
    params: [
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox to retrieve.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_sandbox_message',
    description: `Show full details of a specific captured test email including headers, HTML body, and text body.`,
    params: [
      {
        name: 'message_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox message to retrieve.`,
      },
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox containing the message.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_sending_stats',
    description: `Get overall email sending statistics including sent, delivered, opened, clicked, bounced, and spam counts.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `ISO date string for the end of the stats period.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `ISO date string for the start of the stats period.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_stats_by_category',
    description: `Get email sending statistics grouped by email category tag.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `The end date for the statistics range in ISO 8601 date format (YYYY-MM-DD).`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `The start date for the statistics range in ISO 8601 date format (YYYY-MM-DD).`,
      },
      {
        name: 'domain_id',
        type: 'integer',
        required: false,
        description: `Filter statistics to a specific sending domain by its numeric ID.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_stats_by_date',
    description: `Get email sending statistics grouped by date for trend analysis over a time period.`,
    params: [
      {
        name: 'domain_id',
        type: 'integer',
        required: false,
        description: `Filter statistics to a specific sending domain by its numeric ID.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `The end date for the statistics range in ISO 8601 date format (YYYY-MM-DD).`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `The start date for the statistics range in ISO 8601 date format (YYYY-MM-DD).`,
      },
    ],
  },
  {
    name: 'mailtrap_get_stats_by_domain',
    description: `Get email sending statistics grouped by sending domain for the specified date range.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `The end date for the statistics range in ISO 8601 date format (YYYY-MM-DD).`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `The start date for the statistics range in ISO 8601 date format (YYYY-MM-DD).`,
      },
    ],
  },
  {
    name: 'mailtrap_get_stats_by_esp',
    description: `Get email sending statistics grouped by recipient email service provider (Gmail, Outlook, etc.).`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `The end date for the statistics range in ISO 8601 date format (YYYY-MM-DD).`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `The start date for the statistics range in ISO 8601 date format (YYYY-MM-DD).`,
      },
      {
        name: 'domain_id',
        type: 'integer',
        required: false,
        description: `Filter statistics to a specific sending domain by its numeric ID.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_template',
    description: `Get a single email template by ID including its name, subject, and HTML/text body content.`,
    params: [
      {
        name: 'email_template_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the email template to retrieve.`,
      },
    ],
  },
  {
    name: 'mailtrap_get_webhook',
    description: `Retrieve a single webhook by its ID, including its URL, type, active state, and subscribed event types.`,
    params: [
      {
        name: 'webhook_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the webhook to retrieve.`,
      },
    ],
  },
  {
    name: 'mailtrap_import_contacts',
    description: `Bulk import up to 50,000 contacts in a single request, with support for custom fields and list assignment. Contacts with matching email addresses are updated automatically. The import runs asynchronously — use the returned import ID with Get Contact Import to check status and results.`,
    params: [
      {
        name: 'contacts',
        type: 'string',
        required: true,
        description: `JSON array of contact objects to import (up to 50,000). Each needs email, and may include fields (custom field key-value map), list_ids_included, and list_ids_excluded.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_account_accesses',
    description: `List all user and invite account accesses with optional resource type filtering.`,
    params: [
      {
        name: 'resource_id',
        type: 'integer',
        required: false,
        description: `Filter accesses by the numeric ID of the target resource.`,
      },
      {
        name: 'resource_type',
        type: 'string',
        required: false,
        description: `Filter accesses by the type of resource they apply to.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_api_tokens',
    description: `List all API tokens visible to the current API token.`,
    params: [],
  },
  {
    name: 'mailtrap_list_contact_fields',
    description: `List all custom contact fields defined for the account (maximum 40 fields).`,
    params: [],
  },
  {
    name: 'mailtrap_list_contact_lists',
    description: `List all contact lists in the Mailtrap account, with optional search filtering and pagination.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of contact lists to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination. Starts at 1.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter contact lists by name. Case-insensitive substring match.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_domains',
    description: `List all sending domains with their verification, DKIM, SPF, and compliance status.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of domain records to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_email_campaigns',
    description: `Returns a paginated list of the account's email marketing campaigns, newest first. Supports searching by name.`,
    params: [
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of campaigns per page. Defaults to 50, maximum 100.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search string to filter campaigns by name.`,
      },
      {
        name: 'token',
        type: 'integer',
        required: false,
        description: `Page number to retrieve (page-token pagination). Defaults to 1.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_email_logs',
    description: `List email logs with filtering by status, date range, domain, and search. Returns sent message records with delivery status.`,
    params: [
      {
        name: 'domain_id',
        type: 'integer',
        required: false,
        description: `Filter logs by sending domain ID.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Filter logs sent on or before this date.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of log records to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter email logs by subject, recipient, or message ID.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Filter logs sent on or after this date.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter logs by delivery status.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_inbound_messages',
    description: `List real inbound email messages received by an inbox, newest first, within the account's retention window. Supports cursor-based pagination via last_id.`,
    params: [
      {
        name: 'inbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the inbound inbox to list messages from.`,
      },
      {
        name: 'last_id',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Pass the previous response's last_id value to fetch the next page.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_inboxes',
    description: `List all inbound email inboxes in a folder. Inbound inboxes receive real email at a generated or custom-domain address, distinct from the Email Testing sandboxes used for capturing outgoing test messages.`,
    params: [
      {
        name: 'folder_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the inbound folder that contains the inboxes.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_message_attachments',
    description: `List the attachments captured on a sandbox test message, including filename, content type, and size.`,
    params: [
      {
        name: 'message_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox message whose attachments will be listed.`,
      },
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox containing the message.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_projects',
    description: `List all sandbox projects in the account. Projects are containers for organizing sandbox inboxes.`,
    params: [],
  },
  {
    name: 'mailtrap_list_sandbox_messages',
    description: `Get captured test emails in a sandbox inbox with optional filtering by subject or sender.`,
    params: [
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox to list messages from.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of messages to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginating through sandbox messages.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search string to filter messages by subject or sender.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_sandboxes',
    description: `List all testing sandbox inboxes available for capturing test emails in development.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of sandboxes to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_sub_accounts',
    description: `List all sub accounts belonging to a specified organization.`,
    params: [
      {
        name: 'organization_id',
        type: 'integer',
        required: true,
        description: `ID of the organization whose sub accounts should be listed.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_suppressions',
    description: `List suppressed email addresses including bounces, unsubscribes, and spam complaints.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Filter suppressions by email address.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of suppression records to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_templates',
    description: `List all email templates in the Mailtrap account.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of templates to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results.`,
      },
    ],
  },
  {
    name: 'mailtrap_list_webhooks',
    description: `List all webhooks configured for the account, including their URL, type, active state, and subscribed event types.`,
    params: [],
  },
  {
    name: 'mailtrap_manage_permissions',
    description: `Bulk create, update, or delete resource permissions for a user or API token account access.`,
    params: [
      {
        name: 'account_access_id',
        type: 'integer',
        required: true,
        description: `ID of the account access record whose permissions will be updated.`,
      },
      {
        name: 'permissions_json',
        type: 'string',
        required: true,
        description: `JSON string representing the full permissions payload to apply. Structure as required by the Mailtrap bulk permissions API.`,
      },
    ],
  },
  {
    name: 'mailtrap_reply_inbound_message',
    description: `Send a reply to a received inbound email message. Must include text and/or html. Recipients default to the original sender's reply-to/from address when to_json is omitted. The from address is rejected for standard Mailtrap-hosted inboxes and required only for custom-domain inboxes.`,
    params: [
      {
        name: 'inbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the inbound inbox containing the message.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the inbound message to reply to.`,
      },
      {
        name: 'attachments_json',
        type: 'string',
        required: false,
        description: `JSON array of attachment objects, e.g. '[{"filename":"invoice.pdf","content":"<base64>","type":"application/pdf"}]'. content must be base64-encoded.`,
      },
      {
        name: 'bcc_json',
        type: 'string',
        required: false,
        description: `JSON array of BCC recipient objects, same format as to_json.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Email API category label for the sent reply, used for grouping in delivery statistics.`,
      },
      {
        name: 'cc_json',
        type: 'string',
        required: false,
        description: `JSON array of CC recipient objects, same format as to_json.`,
      },
      {
        name: 'custom_variables_json',
        type: 'string',
        required: false,
        description: `JSON object of custom key-value metadata to attach to the reply, e.g. '{"ticket_id":"12345"}'.`,
      },
      {
        name: 'from_email',
        type: 'string',
        required: false,
        description: `Sender email address. Rejected for standard Mailtrap-hosted inboxes; required for custom-domain inboxes, where it must belong to the inbox's domain.`,
      },
      {
        name: 'from_name',
        type: 'string',
        required: false,
        description: `Sender display name. Only used together with from_email.`,
      },
      {
        name: 'headers_json',
        type: 'string',
        required: false,
        description: `JSON object of additional email headers to send, e.g. '{"X-Priority":"1"}'.`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `HTML reply body. At least one of text or html is required.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Plain-text reply body. At least one of text or html is required.`,
      },
      {
        name: 'to_json',
        type: 'string',
        required: false,
        description: `JSON array of recipient objects, e.g. '[{"email":"jane@example.com","name":"Jane"}]'. Defaults to the original sender's reply-to/from address if omitted.`,
      },
    ],
  },
  {
    name: 'mailtrap_reset_api_token',
    description: `Expire an API token and generate a new token with the same permissions in its place. The old token keeps working for a short grace period. The response includes the new secret value once — store it securely. Only tokens that have not already been reset can be reset.`,
    params: [
      {
        name: 'token_id',
        type: 'integer',
        required: true,
        description: `ID of the API token to reset.`,
      },
    ],
  },
  {
    name: 'mailtrap_sandbox_batch_send_email',
    description: `Send up to 500 test emails into a Mailtrap sandbox inbox in a single API call, each with its own recipients and content, optionally sharing base properties. Returns HTTP 200 even if individual messages fail -- check the per-message results for status.`,
    params: [
      {
        name: 'requests_json',
        type: 'string',
        required: true,
        description: `JSON array of individual email configurations (max 500), each with the same fields as a single send (from, to, subject, text/html, etc.).`,
      },
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox to deliver the test emails into.`,
      },
      {
        name: 'base_json',
        type: 'string',
        required: false,
        description: `JSON object of base properties shared by all emails in the batch (from, subject, text, html, template_uuid, etc.), used as defaults when not overridden per-request.`,
      },
    ],
  },
  {
    name: 'mailtrap_sandbox_send_email',
    description: `Send a test email directly into a Mailtrap sandbox inbox via the Sandbox Sending API, for testing your email content without delivering to a real recipient. Provide text and/or html content, or a template_uuid.`,
    params: [
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `Sender email address for the test email.`,
      },
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox to deliver the test email into.`,
      },
      {
        name: 'to_json',
        type: 'string',
        required: true,
        description: `JSON array of recipient objects, e.g. '[{"email":"user@example.com","name":"Test User"}]'.`,
      },
      {
        name: 'attachments_json',
        type: 'string',
        required: false,
        description: `JSON array of attachment objects. content must be base64-encoded.`,
      },
      { name: 'from_name', type: 'string', required: false, description: `Sender display name.` },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `HTML email body. At least one of text or html is required unless template_uuid is set.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Email subject line. Required unless sending from a template that provides its own subject.`,
      },
      {
        name: 'template_uuid',
        type: 'string',
        required: false,
        description: `UUID of a saved Mailtrap template to send from, instead of subject/text/html.`,
      },
      {
        name: 'template_variables_json',
        type: 'string',
        required: false,
        description: `JSON object of variable values to substitute into the template.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Plain-text email body. At least one of text or html is required unless template_uuid is set.`,
      },
    ],
  },
  {
    name: 'mailtrap_send_bulk_email',
    description: `Send a marketing or newsletter email via the Mailtrap Bulk Sending stream, optimized for high-volume, non-transactional sends. Provide text and/or html content, or a template_uuid to send from a saved template.`,
    params: [
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `Sender email address. Must be on a verified sending domain.`,
      },
      {
        name: 'to_json',
        type: 'string',
        required: true,
        description: `JSON array of recipient objects, e.g. '[{"email":"jane@example.com","name":"Jane"}]'.`,
      },
      {
        name: 'attachments_json',
        type: 'string',
        required: false,
        description: `JSON array of attachment objects, e.g. '[{"filename":"flyer.pdf","content":"<base64>","type":"application/pdf"}]'. content must be base64-encoded.`,
      },
      {
        name: 'bcc_json',
        type: 'string',
        required: false,
        description: `JSON array of BCC recipient objects, same format as to_json.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Category label for grouping this email in Mailtrap statistics.`,
      },
      {
        name: 'cc_json',
        type: 'string',
        required: false,
        description: `JSON array of CC recipient objects, same format as to_json.`,
      },
      {
        name: 'custom_variables_json',
        type: 'string',
        required: false,
        description: `JSON object of custom key-value metadata to attach to the email, e.g. '{"campaign_id":"42"}'.`,
      },
      { name: 'from_name', type: 'string', required: false, description: `Sender display name.` },
      {
        name: 'headers_json',
        type: 'string',
        required: false,
        description: `JSON object of additional email headers to send, e.g. '{"List-Unsubscribe":"<mailto:unsub@example.com>"}'.`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `HTML email body. At least one of text or html is required unless template_uuid is set.`,
      },
      {
        name: 'reply_to_email',
        type: 'string',
        required: false,
        description: `Reply-to email address.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Email subject line. Required unless sending from a template that provides its own subject.`,
      },
      {
        name: 'template_uuid',
        type: 'string',
        required: false,
        description: `UUID of a saved Mailtrap template to send from, instead of subject/text/html.`,
      },
      {
        name: 'template_variables_json',
        type: 'string',
        required: false,
        description: `JSON object of variable values to substitute into the template, e.g. '{"first_name":"Jane"}'.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Plain-text email body. At least one of text or html is required unless template_uuid is set.`,
      },
    ],
  },
  {
    name: 'mailtrap_send_domain_setup_instructions',
    description: `Email DNS setup instructions for a domain to a specified recipient address.`,
    params: [
      {
        name: 'domain_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the domain whose setup instructions will be sent.`,
      },
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `The recipient email address to send the DNS setup instructions to.`,
      },
    ],
  },
  {
    name: 'mailtrap_send_email',
    description: `Send a single transactional email via the Mailtrap Sending API (order confirmations, password resets, notifications). Provide text and/or html content, or a template_uuid to send from a saved template.`,
    params: [
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `Sender email address. Must be on a verified sending domain.`,
      },
      {
        name: 'to_json',
        type: 'string',
        required: true,
        description: `JSON array of recipient objects, e.g. '[{"email":"jane@example.com","name":"Jane"}]'.`,
      },
      {
        name: 'attachments_json',
        type: 'string',
        required: false,
        description: `JSON array of attachment objects, e.g. '[{"filename":"invoice.pdf","content":"<base64>","type":"application/pdf"}]'. content must be base64-encoded.`,
      },
      {
        name: 'bcc_json',
        type: 'string',
        required: false,
        description: `JSON array of BCC recipient objects, same format as to_json.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Category label for grouping this email in Mailtrap statistics.`,
      },
      {
        name: 'cc_json',
        type: 'string',
        required: false,
        description: `JSON array of CC recipient objects, same format as to_json.`,
      },
      {
        name: 'custom_variables_json',
        type: 'string',
        required: false,
        description: `JSON object of custom key-value metadata to attach to the email, e.g. '{"user_id":"42"}'.`,
      },
      { name: 'from_name', type: 'string', required: false, description: `Sender display name.` },
      {
        name: 'headers_json',
        type: 'string',
        required: false,
        description: `JSON object of additional email headers to send, e.g. '{"X-Priority":"1"}'.`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `HTML email body. At least one of text or html is required unless template_uuid is set.`,
      },
      {
        name: 'reply_to_email',
        type: 'string',
        required: false,
        description: `Reply-to email address.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Email subject line. Required unless sending from a template that provides its own subject.`,
      },
      {
        name: 'template_uuid',
        type: 'string',
        required: false,
        description: `UUID of a saved Mailtrap template to send from, instead of subject/text/html.`,
      },
      {
        name: 'template_variables_json',
        type: 'string',
        required: false,
        description: `JSON object of variable values to substitute into the template, e.g. '{"order_id":"1234"}'.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Plain-text email body. At least one of text or html is required unless template_uuid is set.`,
      },
    ],
  },
  {
    name: 'mailtrap_start_email_campaign',
    description: `Start sending a draft campaign immediately. Runs full sending validation (template design, audience, verified domain, billing limits); on failure the campaign stays a draft and the request fails. The campaign must be in the draft state.`,
    params: [
      {
        name: 'email_campaign_id',
        type: 'integer',
        required: true,
        description: `Unique identifier of the draft email campaign to start sending.`,
      },
    ],
  },
  {
    name: 'mailtrap_track_contact_event',
    description: `Submit a custom interaction event for a contact to track engagement and trigger automations.`,
    params: [
      {
        name: 'contact_identifier',
        type: 'string',
        required: true,
        description: `UUID or email address of the contact for whom the event is being tracked.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the custom event to record, e.g. 'purchase', 'page_view', 'trial_started'.`,
      },
      {
        name: 'occurred_at',
        type: 'string',
        required: false,
        description: `ISO 8601 datetime when the event occurred. Defaults to now if omitted.`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `Optional value associated with the event, e.g. a purchase amount or product ID.`,
      },
    ],
  },
  {
    name: 'mailtrap_update_contact',
    description: `Update a contact's custom fields, subscription status, or contact list memberships by UUID or email address.`,
    params: [
      {
        name: 'contact_identifier',
        type: 'string',
        required: true,
        description: `UUID or email address of the contact to update. Example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' or 'alice@example.com'.`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `New first name for the contact.`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `New last name for the contact.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New subscription status. Valid values: subscribed, unsubscribed.`,
      },
    ],
  },
  {
    name: 'mailtrap_update_contact_list',
    description: `Update the name of an existing contact list by its ID.`,
    params: [
      {
        name: 'list_id',
        type: 'integer',
        required: true,
        description: `Numeric ID of the contact list to update. Example: 42.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `New name for the contact list.`,
      },
    ],
  },
  {
    name: 'mailtrap_update_domain',
    description: `Update domain settings such as open tracking, click tracking, and unsubscribe tracking configuration.`,
    params: [
      {
        name: 'domain_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the domain to update.`,
      },
      {
        name: 'click_tracking',
        type: 'boolean',
        required: false,
        description: `Enable or disable click tracking for links in emails sent from this domain.`,
      },
      {
        name: 'open_tracking',
        type: 'boolean',
        required: false,
        description: `Enable or disable open tracking for emails sent from this domain.`,
      },
      {
        name: 'unsubscribe_tracking',
        type: 'boolean',
        required: false,
        description: `Enable or disable unsubscribe tracking for emails sent from this domain.`,
      },
    ],
  },
  {
    name: 'mailtrap_update_email_campaign',
    description: `Update an existing draft email campaign. Only the provided attributes are changed; the template (subject/design) is always edited in place. Only draft campaigns can be updated — editing a scheduled or sending campaign fails.`,
    params: [
      {
        name: 'email_campaign_id',
        type: 'integer',
        required: true,
        description: `Unique identifier of the draft email campaign to update.`,
      },
      {
        name: 'body_html',
        type: 'string',
        required: false,
        description: `HTML body of the email (the design). Required before the campaign can be scheduled or started.`,
      },
      {
        name: 'body_text',
        type: 'string',
        required: false,
        description: `Plain-text alternative of the email body.`,
      },
      {
        name: 'contact_list_ids',
        type: 'string',
        required: false,
        description: `Comma-separated IDs of contact lists to send to. Replaces the campaign's full set of included lists.`,
      },
      {
        name: 'contact_segment_ids',
        type: 'string',
        required: false,
        description: `Comma-separated IDs of contact segments to send to. Replaces the campaign's full set of included segments.`,
      },
      {
        name: 'delivery_mode',
        type: 'string',
        required: false,
        description: `How the campaign is delivered. 'rapid' sends as fast as possible; 'gradual' throttles sending to emails_per_hour.`,
      },
      {
        name: 'domain_id',
        type: 'integer',
        required: false,
        description: `ID of the verified sending domain used for the campaign.`,
      },
      {
        name: 'emails_per_hour',
        type: 'integer',
        required: false,
        description: `Delivery throttle. Applies only when delivery_mode is 'gradual'.`,
      },
      {
        name: 'from_display_name',
        type: 'string',
        required: false,
        description: `Display name shown in the From header.`,
      },
      {
        name: 'from_local_part',
        type: 'string',
        required: false,
        description: `Local part (before the @) of the From address.`,
      },
      { name: 'name', type: 'string', required: false, description: `New campaign name.` },
      {
        name: 'reply_to_display_name',
        type: 'string',
        required: false,
        description: `Display name for the Reply-To address.`,
      },
      {
        name: 'reply_to_domain',
        type: 'string',
        required: false,
        description: `Domain of the Reply-To address.`,
      },
      {
        name: 'reply_to_local_part',
        type: 'string',
        required: false,
        description: `Local part (before the @) of the Reply-To address.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Email subject line. Supports merge tags, e.g. 'Hi {{first_name}}'.`,
      },
    ],
  },
  {
    name: 'mailtrap_update_project',
    description: `Rename an existing sandbox project.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `New name for the project.` },
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the project to update.`,
      },
    ],
  },
  {
    name: 'mailtrap_update_sandbox',
    description: `Rename a sandbox inbox or change its email username.`,
    params: [
      {
        name: 'sandbox_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the sandbox inbox to update.`,
      },
      {
        name: 'email_username',
        type: 'string',
        required: false,
        description: `New local-part username for the sandbox inbox's email address.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New display name for the sandbox inbox.`,
      },
    ],
  },
  {
    name: 'mailtrap_update_template',
    description: `Update an existing email template's name, subject, or body content.`,
    params: [
      {
        name: 'email_template_id',
        type: 'integer',
        required: true,
        description: `ID of the email template to update.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `New category for the template.`,
      },
      {
        name: 'html_body',
        type: 'string',
        required: false,
        description: `New HTML body content for the email template.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the email template.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `New subject line for the email template.`,
      },
      {
        name: 'text_body',
        type: 'string',
        required: false,
        description: `New plain text body content for the email template.`,
      },
    ],
  },
  {
    name: 'mailtrap_update_webhook',
    description: `Update an existing webhook's URL, active state, payload format, event types, or inbound inbox scope. Only the fields provided are changed.`,
    params: [
      {
        name: 'webhook_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the webhook to update.`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the webhook is active.`,
      },
      {
        name: 'event_types',
        type: 'string',
        required: false,
        description: `Comma-separated list of event types to subscribe to. Applicable only for email_sending and campaigns webhooks. Valid values: delivery, soft_bounce, bounce, suspension, unsubscribe, open, spam_complaint, click, reject.`,
      },
      {
        name: 'inbound_inbox_id',
        type: 'integer',
        required: false,
        description: `ID of the inbound inbox the webhook is linked to. Applicable only for inbound_receiving webhooks.`,
      },
      {
        name: 'payload_format',
        type: 'string',
        required: false,
        description: `Format of the webhook payload. Valid values: json, jsonlines.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `New URL that will receive webhook payloads.`,
      },
    ],
  },
]
