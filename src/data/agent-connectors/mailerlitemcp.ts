import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mailerlitemcp_add_subscriber',
    description: `Add a new subscriber to your MailerLite account, optionally assigning them to groups and setting custom fields.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `The email address of the subscriber`,
      },
      {
        name: 'fields',
        type: 'object',
        required: false,
        description: `Custom fields for the subscriber`,
      },
      {
        name: 'groups',
        type: 'array',
        required: false,
        description: `Group IDs to add the subscriber to`,
      },
      { name: 'name', type: 'string', required: false, description: `The name of the subscriber` },
      {
        name: 'resubscribe',
        type: 'boolean',
        required: false,
        description: `Whether to resubscribe a previously unsubscribed subscriber`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Subscriber status (default: active)`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_assign_subscriber_to_group',
    description: `Add an existing subscriber to a MailerLite group by subscriber ID and group ID.`,
    params: [
      { name: 'group_id', type: 'string', required: true, description: `The ID of the group` },
      {
        name: 'subscriber_id',
        type: 'string',
        required: true,
        description: `The ID or email of the subscriber`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_batch_requests',
    description: `Execute up to 50 MailerLite API requests in a single batch call. Webhooks are not supported.`,
    params: [
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `Array of API requests to execute (max 50)`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_build_custom_automation',
    description: `Validate an automation plan before creating it. Checks trigger type, steps, and optionally discovers matching resources.`,
    params: [
      {
        name: 'steps',
        type: 'array',
        required: true,
        description: `Planned automation steps in order`,
      },
      {
        name: 'trigger_type',
        type: 'string',
        required: true,
        description: `The trigger type for the automation`,
      },
      {
        name: 'resource_name',
        type: 'string',
        required: false,
        description: `Optional resource name to search for (partial match)`,
      },
      {
        name: 'resource_type',
        type: 'string',
        required: false,
        description: `Resource type to look up. Defaults based on trigger: group for subscriber_joins_group, form for form_completed, shop for abandoned_cart, segment for subscriber_joins_segment`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_cancel_campaign',
    description: `Cancel a scheduled or delivering campaign by its campaign ID.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign to cancel`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_create_automation',
    description: `Create a new automation workflow with a trigger type, trigger config, and ordered steps (email or delay).`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name for the automation` },
      {
        name: 'steps',
        type: 'array',
        required: true,
        description: `Steps in order (email or delay)`,
      },
      {
        name: 'trigger_config',
        type: 'object',
        required: true,
        description: `Trigger configuration (group_ids for subscriber_joins_group, segment_id for subscriber_joins_segment, form_id for form_completed, shop_id for abandoned_cart)`,
      },
      { name: 'trigger_type', type: 'string', required: true, description: `Trigger type` },
    ],
  },
  {
    name: 'mailerlitemcp_create_campaign',
    description: `Create a new email campaign. The sender email must be a verified sender on your MailerLite account.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `The sender email address (must be verified on the MailerLite account)`,
      },
      { name: 'from_name', type: 'string', required: true, description: `The sender name` },
      { name: 'name', type: 'string', required: true, description: `The name of the campaign` },
      { name: 'subject', type: 'string', required: true, description: `The email subject line` },
      { name: 'type', type: 'string', required: true, description: `The type of campaign` },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The HTML content of the email (optional - can be designed in dashboard)`,
      },
      { name: 'groups', type: 'array', required: false, description: `Group IDs to send to` },
      { name: 'reply_to', type: 'string', required: false, description: `Reply-to email address` },
    ],
  },
  {
    name: 'mailerlitemcp_create_field',
    description: `Create a new custom subscriber field for storing additional subscriber data.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the field` },
      { name: 'type', type: 'string', required: true, description: `The type of the field` },
    ],
  },
  {
    name: 'mailerlitemcp_create_form',
    description: `Create a new signup form (popup, embedded, or promotion) linked to one or more groups.`,
    params: [
      {
        name: 'groups',
        type: 'array',
        required: true,
        description: `Group IDs to assign new subscribers to (required, at least one)`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the form` },
      { name: 'type', type: 'string', required: true, description: `The type of form to create` },
    ],
  },
  {
    name: 'mailerlitemcp_create_group',
    description: `Create a new subscriber group to organize your mailing list.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the group` },
    ],
  },
  {
    name: 'mailerlitemcp_create_segment',
    description: `Create a new dynamic segment based on subscriber filter conditions.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the segment` },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter rules object. Format: {"rules": [[{"operator": "text_field_contains", "args": ["field_id", "value"]}]]}. Inner arrays are AND groups, outer array is OR between groups. Omit to create a segment without filters (can be configured in dashboard).`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_create_webhook',
    description: `Create a webhook to receive real-time event notifications from MailerLite.`,
    params: [
      {
        name: 'events',
        type: 'array',
        required: true,
        description: `Webhook events to subscribe to`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL to send webhook payloads to`,
      },
      {
        name: 'batchable',
        type: 'boolean',
        required: false,
        description: `Required as true for campaign.open, campaign.click, and subscriber.deleted events`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the webhook is enabled`,
      },
      { name: 'name', type: 'string', required: false, description: `A name for the webhook` },
    ],
  },
  {
    name: 'mailerlitemcp_delete_automation',
    description: `Permanently delete an automation workflow by its automation ID.`,
    params: [
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The ID of the automation to delete`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_delete_campaign',
    description: `Permanently delete a campaign by its campaign ID.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign to delete`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_delete_field',
    description: `Delete a custom subscriber field by its field ID.`,
    params: [
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The ID of the field to delete`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_delete_form',
    description: `Delete a signup form by its form ID.`,
    params: [
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the form to delete`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_delete_group',
    description: `Delete a subscriber group by its group ID.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The ID of the group to delete`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_delete_segment',
    description: `Delete a dynamic segment by its segment ID.`,
    params: [
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: `The ID of the segment to delete`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_delete_subscriber',
    description: `Permanently delete a subscriber by their subscriber ID.`,
    params: [
      {
        name: 'subscriber_id',
        type: 'string',
        required: true,
        description: `The ID or email of the subscriber to delete`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_delete_webhook',
    description: `Delete a webhook by its webhook ID.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to delete`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_discover_automation_templates',
    description: `Search and discover available automation templates by type and user intent.`,
    params: [
      { name: 'type', type: 'string', required: true, description: `Template type to retrieve` },
      {
        name: 'user_intent',
        type: 'string',
        required: false,
        description: `The user's specific automation goal (e.g., welcome series, abandoned cart)`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_dry_run_automation',
    description: `Preview an automation flow by sending a test run to a specified email address.`,
    params: [
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `ID of automation to test`,
      },
      {
        name: 'test_email',
        type: 'string',
        required: true,
        description: `Email address for virtual test subscriber`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_fetch',
    description: `Fetch a MailerLite resource by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Identifier returned from the search tool (e.g., "campaign:123", "group:456")`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_generate_email_content',
    description: `Generate email body content from a subject line and optional plain text.`,
    params: [
      {
        name: 'plain_text',
        type: 'string',
        required: true,
        description: `The plain text email body to validate`,
      },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `The email subject line to validate`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_get_auth_status',
    description: `Check the current authentication status and account details for the connected MailerLite account.`,
    params: [],
  },
  {
    name: 'mailerlitemcp_get_automation_activity',
    description: `Retrieve activity logs for an automation, filtered by date, status, or subscriber search.`,
    params: [
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The ID of the automation`,
      },
      { name: 'status', type: 'string', required: true, description: `Filter by activity status` },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Filter from date (Y-m-d). For completed/canceled/failed statuses`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Filter to date (Y-m-d). For completed/canceled/failed statuses`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results per page (default 10)`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      {
        name: 'scheduled_from',
        type: 'string',
        required: false,
        description: `Filter scheduled from date (Y-m-d). For active status`,
      },
      {
        name: 'scheduled_to',
        type: 'string',
        required: false,
        description: `Filter scheduled to date (Y-m-d). For active status`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search by subscriber email`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_get_campaign',
    description: `Retrieve details for a specific campaign by its campaign ID.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_get_campaign_link_recipients',
    description: `List subscribers who clicked a specific link in a campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign`,
      },
      { name: 'link_id', type: 'string', required: true, description: `The ID of the link` },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Number of results per page (10, 25, 50, or 100)`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort direction` },
      { name: 'order_by', type: 'string', required: false, description: `Sort field` },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search by subscriber email`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_get_campaign_links',
    description: `List all tracked links for a campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_get_campaign_subscribers',
    description: `List subscribers for a campaign, filtered by activity type (opened, clicked, bounced, etc.).`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results (allowed values: 10, 25, 50, 100)`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search by subscriber email`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort field` },
      { name: 'type', type: 'string', required: false, description: `Filter by activity type` },
    ],
  },
  {
    name: 'mailerlitemcp_get_dashboard_link',
    description: `Get a direct link to a MailerLite dashboard resource (automation or other context).`,
    params: [
      { name: 'automation_id', type: 'string', required: true, description: `Automation ID` },
      {
        name: 'context',
        type: 'string',
        required: false,
        description: `What the user needs to edit (e.g., "design email", "edit automation")`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_get_form',
    description: `Retrieve details for a specific signup form by its form ID.`,
    params: [
      { name: 'form_id', type: 'string', required: true, description: `The ID of the form` },
    ],
  },
  {
    name: 'mailerlitemcp_get_form_subscribers',
    description: `List subscribers who signed up through a specific form.`,
    params: [
      { name: 'form_id', type: 'string', required: true, description: `The ID of the form` },
      { name: 'filter', type: 'string', required: false, description: `Filter subscribers` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of subscribers to return (1-100)`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
    ],
  },
  {
    name: 'mailerlitemcp_get_group_subscribers',
    description: `List subscribers in a specific group, with optional cursor-based pagination.`,
    params: [
      { name: 'group_id', type: 'string', required: true, description: `The ID of the group` },
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of subscribers to return (1-100)`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_get_segment',
    description: `Retrieve details for a specific segment by its segment ID.`,
    params: [
      { name: 'segment_id', type: 'string', required: true, description: `The ID of the segment` },
    ],
  },
  {
    name: 'mailerlitemcp_get_segment_subscribers',
    description: `List subscribers matching a segment, with cursor pagination and status filtering.`,
    params: [
      { name: 'segment_id', type: 'string', required: true, description: `The ID of the segment` },
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of subscribers to return (1-100)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by subscriber status`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_get_subscriber',
    description: `Retrieve a subscriber's full profile by their subscriber ID.`,
    params: [
      {
        name: 'subscriber_id',
        type: 'string',
        required: true,
        description: `The ID or email of the subscriber`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_get_subscriber_activity',
    description: `Retrieve recent activity events for a subscriber (opens, clicks, etc.).`,
    params: [
      {
        name: 'subscriber_id',
        type: 'string',
        required: true,
        description: `The ID or email of the subscriber`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_get_subscriber_count',
    description: `Get the total count of subscribers in your MailerLite account.`,
    params: [],
  },
  {
    name: 'mailerlitemcp_get_webhook',
    description: `Retrieve details for a specific webhook by its webhook ID.`,
    params: [
      { name: 'webhook_id', type: 'string', required: true, description: `The ID of the webhook` },
    ],
  },
  {
    name: 'mailerlitemcp_import_subscribers_to_group',
    description: `Bulk-import multiple subscribers into a group in one request.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The ID of the group to import to`,
      },
      {
        name: 'subscribers',
        type: 'array',
        required: true,
        description: `Array of subscribers to import`,
      },
      {
        name: 'autoresponders',
        type: 'boolean',
        required: false,
        description: `Whether to trigger autoresponders`,
      },
      {
        name: 'resubscribe',
        type: 'boolean',
        required: false,
        description: `Whether to resubscribe previously unsubscribed subscribers`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_install_template',
    description: `Install a MailerLite email template into your account by template ID.`,
    params: [
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `ID of template to install`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_list_automations',
    description: `List all automations in the account, with optional filtering to enabled automations only.`,
    params: [
      {
        name: 'enabled_only',
        type: 'boolean',
        required: false,
        description: `Only show enabled automations`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of automations to return`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_list_campaigns',
    description: `List campaigns in the account, with filtering by status and type.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of campaigns to return (allowed values: 1, 10, 25, 50, 100)`,
      },
      { name: 'status', type: 'string', required: false, description: `Filter by campaign status` },
      { name: 'type', type: 'string', required: false, description: `Filter by campaign type` },
    ],
  },
  {
    name: 'mailerlitemcp_list_email_templates',
    description: `List available email templates with optional search and pagination.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of templates to return (default: 10)`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search filter for template names`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_list_fields',
    description: `List all custom subscriber fields with optional filtering and sorting.`,
    params: [
      { name: 'keyword', type: 'string', required: false, description: `Filter by keyword` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of fields to return`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'sort', type: 'string', required: false, description: `Sort field` },
      { name: 'type', type: 'string', required: false, description: `Filter by field type` },
    ],
  },
  {
    name: 'mailerlitemcp_list_form_templates',
    description: `List available form templates, filtered by form type.`,
    params: [
      { name: 'type', type: 'string', required: true, description: `Form template type` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of templates to return (default: 25)`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_list_forms',
    description: `List all signup forms with optional filtering by name, type, and sorting.`,
    params: [
      { name: 'type', type: 'string', required: true, description: `The type of forms to list` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of forms to return (1-100)`,
      },
      { name: 'name', type: 'string', required: false, description: `Filter by form name` },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      { name: 'sort', type: 'string', required: false, description: `Sort field` },
    ],
  },
  {
    name: 'mailerlitemcp_list_resources',
    description: `List MailerLite resources (groups, forms, segments, or shops) with optional name filtering.`,
    params: [
      {
        name: 'resource_type',
        type: 'string',
        required: true,
        description: `Type of resource to list (singular: group, form, shop, or segment)`,
      },
      {
        name: 'name_filter',
        type: 'string',
        required: false,
        description: `Optional filter by name (partial match)`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_list_segments',
    description: `List all dynamic segments with pagination.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of segments to return (1-100)`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
    ],
  },
  {
    name: 'mailerlitemcp_list_subscribers',
    description: `List subscribers with cursor-based pagination, status filtering, and limit control.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of subscribers to return (1-100, default 25)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by subscriber status`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_list_webhooks',
    description: `List all configured webhooks in the account.`,
    params: [],
  },
  {
    name: 'mailerlitemcp_schedule_campaign',
    description: `Schedule a campaign for immediate or future delivery. Use delivery 'instant' to send now.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign to schedule`,
      },
      {
        name: 'delivery',
        type: 'string',
        required: true,
        description: `Delivery type: "instant" sends now, "scheduled" sends at a specific time, "timezone_based" sends per subscriber timezone, "smart_sending" uses AI-optimized send times`,
      },
      {
        name: 'schedule',
        type: 'object',
        required: false,
        description: `Schedule details — required when delivery is "scheduled" or "timezone_based"`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_search',
    description: `Search across MailerLite subscribers and groups by query string.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Text to search for across MailerLite resources`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (default 10)`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_select_resource',
    description: `Select a specific MailerLite resource by ID and type for use in an automation workflow.`,
    params: [
      {
        name: 'resource_id',
        type: 'string',
        required: true,
        description: `The ID of the selected resource`,
      },
      {
        name: 'resource_name',
        type: 'string',
        required: true,
        description: `The name of the selected resource`,
      },
      {
        name: 'resource_type',
        type: 'string',
        required: true,
        description: `The type of the selected resource`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_send_test_automation',
    description: `Send a test run of an automation to a specified email address.`,
    params: [
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `ID of automation to test`,
      },
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Your email address to receive the test emails`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_start_automation_conversation',
    description: `Start a guided conversation to help build an automation from a natural language request.`,
    params: [
      {
        name: 'user_request',
        type: 'string',
        required: true,
        description: `What the user asked for`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_suggest_subject_lines',
    description: `Generate and return improved subject line suggestions based on provided input.`,
    params: [
      {
        name: 'subject_lines',
        type: 'array',
        required: true,
        description: `Array of subject line candidates to validate`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_unassign_subscriber_from_group',
    description: `Remove a subscriber from a group by subscriber ID and group ID.`,
    params: [
      { name: 'group_id', type: 'string', required: true, description: `The ID of the group` },
      {
        name: 'subscriber_id',
        type: 'string',
        required: true,
        description: `The ID or email of the subscriber`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_update_automation_delay',
    description: `Update the delay duration and unit for a specific step in an automation.`,
    params: [
      { name: 'automation_id', type: 'string', required: true, description: `Automation ID` },
      {
        name: 'step_index',
        type: 'number',
        required: true,
        description: `Delay step index (0-based, only counts delay steps)`,
      },
      { name: 'unit', type: 'string', required: true, description: `Delay duration unit` },
      {
        name: 'value',
        type: 'number',
        required: true,
        description: `Delay duration value (must be positive)`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_update_automation_email',
    description: `Update the subject and plain text content for an email step in an automation.`,
    params: [
      { name: 'automation_id', type: 'string', required: true, description: `Automation ID` },
      {
        name: 'step_index',
        type: 'number',
        required: true,
        description: `Email step index (0-based, only counts email steps)`,
      },
      { name: 'subject', type: 'string', required: true, description: `Email subject line` },
      {
        name: 'plain_text',
        type: 'string',
        required: false,
        description: `Plain text email content`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_update_campaign',
    description: `Update the name, subject, sender, or content of an existing campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign to update`,
      },
      { name: 'content', type: 'string', required: false, description: `New HTML content` },
      { name: 'from', type: 'string', required: false, description: `New sender email` },
      { name: 'from_name', type: 'string', required: false, description: `New sender name` },
      { name: 'name', type: 'string', required: false, description: `New campaign name` },
      { name: 'subject', type: 'string', required: false, description: `New email subject` },
    ],
  },
  {
    name: 'mailerlitemcp_update_field',
    description: `Rename a custom subscriber field.`,
    params: [
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The ID of the field to update`,
      },
      { name: 'name', type: 'string', required: true, description: `The new name for the field` },
    ],
  },
  {
    name: 'mailerlitemcp_update_form',
    description: `Update the name of an existing signup form.`,
    params: [
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the form to update`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the form` },
    ],
  },
  {
    name: 'mailerlitemcp_update_group',
    description: `Rename an existing subscriber group.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The ID of the group to update`,
      },
      { name: 'name', type: 'string', required: true, description: `The new name for the group` },
    ],
  },
  {
    name: 'mailerlitemcp_update_segment',
    description: `Update the name of an existing segment.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `New name for the segment` },
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: `The ID of the segment to update`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_update_subscriber',
    description: `Update an existing subscriber's name, status, or custom fields.`,
    params: [
      {
        name: 'subscriber_id',
        type: 'string',
        required: true,
        description: `The ID or email of the subscriber`,
      },
      { name: 'fields', type: 'object', required: false, description: `Custom fields to update` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name for the subscriber`,
      },
    ],
  },
  {
    name: 'mailerlitemcp_update_webhook',
    description: `Update the configuration of an existing webhook.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to update`,
      },
      {
        name: 'batchable',
        type: 'boolean',
        required: false,
        description: `Required as true for campaign.open, campaign.click, and subscriber.deleted events`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the webhook is enabled`,
      },
      {
        name: 'events',
        type: 'array',
        required: false,
        description: `Webhook events to subscribe to`,
      },
      { name: 'name', type: 'string', required: false, description: `A name for the webhook` },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `The URL to send webhook payloads to`,
      },
    ],
  },
]
