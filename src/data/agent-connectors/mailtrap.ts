import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
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
]
