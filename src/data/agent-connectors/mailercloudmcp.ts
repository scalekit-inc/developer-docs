import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mailercloudmcp_analyze_campaign',
    description: `Deep-dive analysis of a single campaign's performance. Returns a letter grade, weighted performance scores vs industry benchmarks, deliverability health assessment, contextual insights, and prioritized actionable recommendations to improve future sends.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique ID of the campaign.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'cost_per_email',
        type: 'number',
        required: false,
        description: `Optional cost per email sent, used to calculate ROI in reports.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_analyze_latest_campaigns',
    description: `Analyze recent completed campaigns as a batch (default 5, up to 20 via count param). Provides individual grades, overall performance vs industry benchmarks, trends over time, what's working vs needs attention, performance by list, optional cost/ROI context, and a strategic action plan.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'cost_per_email',
        type: 'number',
        required: false,
        description: `Optional cost per email sent, used to calculate ROI in reports.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of recent campaigns to analyze (default: 5).`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_audit_campaign_draft',
    description: `Pre-send quality audit for a campaign draft. Checks subject line length and spam triggers, sender configuration, list selection, content presence, preheader text, and provides a pass/fail checklist with specific fix-it recommendations before you hit send. Use this before scheduling any campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique ID of the campaign.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_batch_create_contacts',
    description: `Create multiple contacts at once in bulk.`,
    params: [
      {
        name: 'contacts',
        type: 'string',
        required: true,
        description: `Array of contact objects,required`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique ID of the contact list.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_campaign_health_dashboard',
    description: `Quick portfolio-level health check across recent campaigns. Returns an at-a-glance dashboard with overall grade, metric status vs benchmarks, what's working vs needs attention, performance trends, and top priority action. Use this for a fast 10-second overview; use analyze_latest_campaigns for deep analysis.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'cost_per_email',
        type: 'number',
        required: false,
        description: `Optional cost per email sent, used to calculate ROI in reports.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_compare_campaigns',
    description: `Side-by-side comparison of two or more campaigns. Shows performance metrics, scores, grades, identifies the winner for each metric, and provides recommendations based on what worked best.`,
    params: [
      {
        name: 'campaign_ids',
        type: 'string',
        required: true,
        description: `Array of campaign IDs to compare.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'cost_per_email',
        type: 'number',
        required: false,
        description: `Optional cost per email sent, used to calculate ROI in reports.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_create_campaign',
    description: `Create a new email campaign in MailerCloud. Requires name, subject, and at least one list ID. If sender is not provided, it will be auto-resolved from your verified senders (if only one exists) or you will be prompted to choose. Reply-to defaults to sender email (best practice) — only provide reply_email or reply_id if you need a different reply-to address.`,
    params: [
      {
        name: 'list_ids',
        type: 'string',
        required: true,
        description: `List IDs to send to,required`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name for the campaign.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `Subject line for the email.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'email_preheader',
        type: 'string',
        required: false,
        description: `Short preview text shown after the subject line in email clients (max 150 characters).`,
      },
      {
        name: 'exclude_list_ids',
        type: 'string',
        required: false,
        description: `List IDs to exclude from send`,
      },
      {
        name: 'exclude_segments',
        type: 'string',
        required: false,
        description: `Segment IDs to exclude from send`,
      },
      {
        name: 'exclude_tag_ids',
        type: 'string',
        required: false,
        description: `Tag IDs to exclude from send`,
      },
      {
        name: 'frequency_cap',
        type: 'string',
        required: false,
        description: `Limit how often a contact receives campaigns (e.g. daily, weekly).`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `HTML content for the email body.`,
      },
      {
        name: 'is_publish',
        type: 'string',
        required: false,
        description: `Set to 'true' to publish immediately; 'false' saves as a draft.`,
      },
      {
        name: 'plain_text',
        type: 'string',
        required: false,
        description: `Plain text fallback content for email clients that do not support HTML.`,
      },
      {
        name: 'reply_email',
        type: 'string',
        required: false,
        description: `Reply-to email address. Defaults to sender email if omitted.`,
      },
      {
        name: 'reply_id',
        type: 'string',
        required: false,
        description: `ID of a pre-configured reply-to email address (alternative to reply_email).`,
      },
      {
        name: 'scheduled_at',
        type: 'string',
        required: false,
        description: `Datetime to send the campaign, in YYYY-MM-DD HH:MM:SS format.`,
      },
      { name: 'segments', type: 'string', required: false, description: `Segment IDs` },
      {
        name: 'sender_email',
        type: 'string',
        required: false,
        description: `Email address of the sender. Auto-resolved if your account has only one verified sender.`,
      },
      {
        name: 'sender_id',
        type: 'string',
        required: false,
        description: `Array of pre-configured sender IDs. Alternative to sender_name/sender_email.`,
      },
      {
        name: 'sender_name',
        type: 'string',
        required: false,
        description: `Display name for the sender. Auto-resolved if your account has only one verified sender.`,
      },
      {
        name: 'tag_ids',
        type: 'string',
        required: false,
        description: `Tag IDs to apply to campaign`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_create_contact',
    description: `Create a new contact in a MailerCloud list. Email and list_id are required.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `Contact's email address.` },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique ID of the contact list.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      { name: 'city', type: 'string', required: false, description: `Contact's city.` },
      {
        name: 'company_name',
        type: 'string',
        required: false,
        description: `Contact's company or organization name.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Contact's country code (e.g. US, GB).`,
      },
      {
        name: 'custom_fields',
        type: 'object',
        required: false,
        description: `Custom field values`,
      },
      {
        name: 'department',
        type: 'string',
        required: false,
        description: `Contact's department within their organization.`,
      },
      { name: 'first_name', type: 'string', required: false, description: `Contact's first name.` },
      { name: 'job_title', type: 'string', required: false, description: `Contact's job title.` },
      { name: 'last_name', type: 'string', required: false, description: `Contact's last name.` },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Contact's phone number in E.164 format.`,
      },
      { name: 'state', type: 'string', required: false, description: `Contact's state or region.` },
      { name: 'tags', type: 'string', required: false, description: `Tags to assign` },
    ],
  },
  {
    name: 'mailercloudmcp_create_list',
    description: `Create a new contact list in MailerCloud.`,
    params: [
      {
        name: 'list_type',
        type: 'integer',
        required: true,
        description: `Type of list: 1 for regular, 2 for single opt-in, 3 for double opt-in.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name for the campaign.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_create_tag',
    description: `Create a new tag for organizing contacts.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name for the campaign.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_create_template',
    description: `Create a new HTML email template.`,
    params: [
      {
        name: 'html',
        type: 'string',
        required: true,
        description: `HTML content for the email body.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name for the campaign.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'category_id',
        type: 'string',
        required: false,
        description: `ID of the template category to assign this template to.`,
      },
      {
        name: 'plain_text',
        type: 'string',
        required: false,
        description: `Plain text fallback content for email clients that do not support HTML.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_create_webhook',
    description: `Create a new webhook to receive event notifications.`,
    params: [
      {
        name: 'events',
        type: 'string',
        required: true,
        description: `Events to subscribe to,required`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name for the campaign.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `HTTPS URL to receive webhook event payloads.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_delete_contact',
    description: `Delete a contact by ID.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The unique ID of the contact.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_delete_list',
    description: `Delete a contact list by ID.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique ID of the contact list.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_delete_webhook',
    description: `Delete a webhook.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique ID of the webhook.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_engagement_funnel',
    description: `Visualize the engagement funnel for a sent campaign: total sent → delivered → opened → clicked. Shows conversion rates at each stage, identifies the biggest drop-off point, and provides targeted recommendations to fix the weakest stage of the funnel.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique ID of the campaign.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_get_account_overview',
    description: `Get account plan details including limits, usage, and subscription information.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_get_automation',
    description: `Get details of a specific automation workflow, optionally filtered by node type.`,
    params: [
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The unique ID of the automation workflow.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'node_type',
        type: 'string',
        required: false,
        description: `Filter automation steps by node type (e.g. email, sms).`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_get_best_practices',
    description: `Generate a comprehensive email marketing best practices report based on your actual campaign performance data. Shows your performance vs industry benchmarks, identifies top-performing patterns (subject lines, send times, audience size), highlights improvement areas with specific numbers, and provides prioritized actionable recommendations tailored to your data.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_get_campaign',
    description: `Get full details of a specific MailerCloud campaign by ID, including performance metrics.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique ID of the campaign.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_get_campaign_domain_report',
    description: `Get domain-level performance statistics for a sent campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique ID of the campaign.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results (starts at 1).`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_get_contact',
    description: `Get detailed information about a specific contact by ID.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The unique ID of the contact.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_get_inbox_tracking',
    description: `Get inbox placement tracking data for a date range, optionally filtered by campaign or domain. Helps monitor deliverability across email providers.`,
    params: [
      {
        name: 'date_from',
        type: 'string',
        required: true,
        description: `Start date for inbox tracking data in YYYY-MM-DD format.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: true,
        description: `End date for inbox tracking data in YYYY-MM-DD format.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'campaign_id',
        type: 'string',
        required: false,
        description: `The unique ID of the campaign.`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Filter inbox tracking data by specific email domain (e.g. gmail.com).`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_get_list_details',
    description: `Get details of a specific contact list including subscriber counts.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique ID of the contact list.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_get_template',
    description: `Get a template's details and HTML content by ID.`,
    params: [
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The unique ID of the template.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_get_webhook',
    description: `Get details of a specific webhook.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique ID of the webhook.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_list_campaigns',
    description: `List MailerCloud campaigns with pagination. Returns campaign names, IDs, subjects, statuses, and performance metrics.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results (starts at 1).`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_list_contact_lists',
    description: `List all MailerCloud contact lists with pagination.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results (starts at 1).`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_list_contacts',
    description: `List contacts in a specific MailerCloud contact list with pagination.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique ID of the contact list.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results (starts at 1).`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_list_custom_fields',
    description: `List all custom contact properties/fields defined in your account.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results (starts at 1).`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_list_reply_emails',
    description: `List all reply-to email addresses configured in your MailerCloud account. Use the returned IDs when creating campaigns with the reply_id parameter.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results (starts at 1).`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_list_segments',
    description: `List all audience segments with optional search and sorting.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results (starts at 1).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search query to filter segments by name or keyword.`,
      },
      {
        name: 'sort_field',
        type: 'string',
        required: false,
        description: `Field to sort results by (e.g. created_at, name).`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction: asc for ascending, desc for descending.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_list_senders',
    description: `List all verified senders in your MailerCloud account. Use the returned sender IDs when creating campaigns with the sender_id parameter.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results (starts at 1).`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_list_tags',
    description: `List all tags in your MailerCloud account.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results (starts at 1).`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_list_template_categories',
    description: `List all email template categories in MailerCloud.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_list_webforms',
    description: `List all webforms in your MailerCloud account.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results (starts at 1).`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_list_webhooks',
    description: `List all webhooks configured in MailerCloud.`,
    params: [
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results (starts at 1).`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_schedule_campaign',
    description: `Schedule a campaign for sending. Omit scheduled_at to send immediately.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique ID of the campaign.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'scheduled_at',
        type: 'string',
        required: false,
        description: `Datetime to send the campaign, in YYYY-MM-DD HH:MM:SS format.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_send_test_email',
    description: `Send a test email for a campaign to specified recipients before the actual send.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique ID of the campaign.`,
      },
      {
        name: 'recipients',
        type: 'string',
        required: true,
        description: `Test email recipients,required`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_send_transactional_email',
    description: `Send a transactional email via MailerCloud Email API. Supports HTML, AMP HTML, attachments, CC/BCC. Use version 1.0 for HTML only, 2.0 for AMP content.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `Sender email address for the transactional email.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `Subject line for the email.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `To recipients (array of name and email),required`,
      },
      {
        name: 'amp_html',
        type: 'string',
        required: false,
        description: `AMP HTML content. Use API version 2.0 when sending AMP content.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'attachments',
        type: 'string',
        required: false,
        description: `Attachments (array of name and url)`,
      },
      { name: 'bcc', type: 'string', required: false, description: `BCC recipients` },
      { name: 'cc', type: 'string', required: false, description: `CC recipients` },
      {
        name: 'from_name',
        type: 'string',
        required: false,
        description: `Sender display name for the transactional email.`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `HTML content for the email body.`,
      },
      { name: 'reply_to', type: 'string', required: false, description: `Reply-to addresses` },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Plain text fallback for the transactional email.`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `API version: 1.0 for HTML-only emails, 2.0 for AMP content.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_toggle_webhook',
    description: `Enable or disable a webhook.`,
    params: [
      {
        name: 'active',
        type: 'boolean',
        required: true,
        description: `Set to true to enable the webhook, false to disable it.`,
      },
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique ID of the webhook.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_update_campaign',
    description: `Update a draft campaign. Only draft campaigns can be updated.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique ID of the campaign.`,
      },
      { name: 'fields', type: 'object', required: true, description: `Fields to update,required` },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_update_contact',
    description: `Update fields on an existing contact.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The unique ID of the contact.`,
      },
      { name: 'fields', type: 'object', required: true, description: `Fields to update,required` },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_update_list',
    description: `Update the name of an existing contact list.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique ID of the contact list.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name for the campaign.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_update_template',
    description: `Update an existing email template.`,
    params: [
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The unique ID of the template.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `HTML content for the email body.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Display name for the campaign.`,
      },
      {
        name: 'plain_text',
        type: 'string',
        required: false,
        description: `Plain text fallback content for email clients that do not support HTML.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_update_webhook',
    description: `Update an existing webhook's configuration.`,
    params: [
      { name: 'fields', type: 'object', required: true, description: `Fields to update,required` },
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique ID of the webhook.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
    ],
  },
  {
    name: 'mailercloudmcp_upsert_contact',
    description: `Create a contact if it doesn't exist, or update it if it does.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `Contact's email address.` },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique ID of the contact list.`,
      },
      {
        name: 'api_key',
        type: 'string',
        required: false,
        description: `Your MailerCloud API key for authentication.`,
      },
      { name: 'first_name', type: 'string', required: false, description: `Contact's first name.` },
      { name: 'last_name', type: 'string', required: false, description: `Contact's last name.` },
    ],
  },
]
