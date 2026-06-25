import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mailchimpmcp_mailchimp_add_member_note',
    description: `Appends a CRM-style note to a specific member's record.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list`,
      },
      { name: 'note', type: 'string', required: true, description: `The note content to add` },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the lowercase version of the member's email address`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_add_or_update_member',
    description: `Adds a new subscriber to an audience or updates an existing one (upsert operation).`,
    params: [
      {
        name: 'email_address',
        type: 'string',
        required: true,
        description: `The email address of the subscriber.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `Subscriber status: subscribed, unsubscribed, cleaned, pending.`,
      },
      {
        name: 'merge_fields',
        type: 'object',
        required: false,
        description: `Custom merge field values (e.g. FNAME, LNAME).`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Tags to assign to the subscriber.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_archive_member',
    description: `Archives (soft-deletes) a contact from an audience without permanently removing them.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list.`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the lowercase version of the member's email address.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_create_audience',
    description: `Creates a new audience (list) in the Mailchimp account with specified settings.`,
    params: [
      {
        name: 'campaign_defaults',
        type: 'object',
        required: true,
        description: `Default values for campaigns sent to this list.`,
      },
      {
        name: 'contact',
        type: 'object',
        required: true,
        description: `Contact information for the list owner.`,
      },
      {
        name: 'email_type_option',
        type: 'boolean',
        required: true,
        description: `Whether the list supports multiple formats for emails.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the new audience.`,
      },
      {
        name: 'permission_reminder',
        type: 'string',
        required: true,
        description: `Reminder of how the user signed up for the list.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_create_campaign',
    description: `Creates a new campaign draft with specified type, audience, subject line, and sender details.`,
    params: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Campaign type: regular, plaintext, absplit, rss, variate.`,
      },
      {
        name: 'recipients',
        type: 'object',
        required: false,
        description: `List settings including list_id and segment conditions.`,
      },
      {
        name: 'settings',
        type: 'object',
        required: false,
        description: `Campaign settings including subject_line, from_name, reply_to.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_create_merge_field',
    description: `Adds a new custom merge field to an audience for collecting additional subscriber data.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the merge field` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Field type: text, number, address, phone, date, url, imageurl, radio, dropdown, birthday, zip`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_create_segment',
    description: `Builds a static or dynamic segment within an audience based on conditions.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the segment.` },
      {
        name: 'options',
        type: 'object',
        required: false,
        description: `Segment conditions (match, conditions array).`,
      },
      {
        name: 'static_segment',
        type: 'array',
        required: false,
        description: `Email addresses for a static segment.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_create_template',
    description: `Creates a new email template with custom HTML content.`,
    params: [
      {
        name: 'html',
        type: 'string',
        required: true,
        description: `HTML content of the template.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the template.` },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_delete_audience',
    description: `Permanently deletes an audience and all associated member data.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list to delete.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_delete_campaign',
    description: `Removes an unsent campaign from the account permanently.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign to delete.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_delete_member_permanent',
    description: `Permanently and irreversibly removes a contact from an audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the lowercase version of the member's email address`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_delete_segment',
    description: `Permanently removes a segment from an audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list.`,
      },
      {
        name: 'segment_id',
        type: 'integer',
        required: true,
        description: `The unique identifier for the segment to delete.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_delete_template',
    description: `Permanently removes a template from the account.`,
    params: [
      {
        name: 'template_id',
        type: 'integer',
        required: true,
        description: `The unique identifier for the template to delete.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_account',
    description: `Retrieves account details including plan information, total subscriber count, and account metadata.`,
    params: [],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_audience',
    description: `Retrieves detailed information about a specific Mailchimp audience including settings and statistics.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_automation',
    description: `Retrieves details of a specific Classic Automation workflow.`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the automation workflow.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_campaign',
    description: `Returns full configuration details for a specific campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_campaign_content',
    description: `Retrieves the HTML and plain-text content of a campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_campaign_report',
    description: `Returns engagement metrics for a sent campaign including opens, clicks, and bounces.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_campaign_sent_to',
    description: `Returns the complete list of recipients a campaign was sent to with delivery status.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_click_details',
    description: `Returns per-link click engagement metrics for a campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_domain_performance',
    description: `Returns email campaign performance broken down by recipient email domain (e.g. gmail.com, yahoo.com).`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_email_activity',
    description: `Reports per-recipient delivery status and engagement for a campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_member',
    description: `Retrieves full profile information for a specific member in an audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list.`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the lowercase version of the member's email address.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_member_activity',
    description: `Retrieves a member's activity history including opens, clicks, and bounce events.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the lowercase version of the member's email address`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_member_notes',
    description: `Retrieves CRM-style notes attached to a specific member.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the lowercase version of the member's email address`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_member_tags',
    description: `Returns the tags assigned to a specific subscriber.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list.`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the lowercase version of the member's email address.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_open_details',
    description: `Returns details about who opened a campaign and when, including open frequency and timing.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_template',
    description: `Fetches the details of a specific email template.`,
    params: [
      {
        name: 'template_id',
        type: 'integer',
        required: true,
        description: `The unique identifier for the template.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_get_top_links',
    description: `Ranks campaign links by click performance to identify highest-engagement content.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_list_audiences',
    description: `Returns a list of all audiences (lists) in the Mailchimp account with member counts and statistics.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records to return (max 1000).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_list_automation_emails',
    description: `Returns the emails within a Classic Automation workflow.`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the automation workflow.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_list_automations',
    description: `Returns all Classic Automation workflows in the account.`,
    params: [],
  },
  {
    name: 'mailchimpmcp_mailchimp_list_campaign_abuse_reports',
    description: `Returns a list of spam complaints received for a campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_list_campaigns',
    description: `Returns a list of campaigns in the Mailchimp account with optional status and audience filtering.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records to return`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: false,
        description: `Filter campaigns by audience`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by campaign status: save, paused, schedule, sending, sent`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_list_interest_categories',
    description: `Returns interest category groupings for an audience used in subscriber preference management.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_list_interests',
    description: `Returns interests within a specific interest category for an audience.`,
    params: [
      {
        name: 'interest_category_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the interest category`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_list_members',
    description: `Returns a list of members in a specified audience with optional status filtering.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Member status filter: subscribed, unsubscribed, cleaned, pending, transactional.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_list_merge_fields',
    description: `Returns all custom merge fields (custom contact data fields) for an audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_list_segments',
    description: `Returns all saved segments in an audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_list_tags',
    description: `Returns all tags available in a specific audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_list_templates',
    description: `Returns available email templates in the account.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_pause_automation',
    description: `Pauses a Classic Automation workflow, halting email delivery until restarted.`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the automation workflow.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_ping',
    description: `Validates API key connectivity and checks that the Mailchimp account is reachable.`,
    params: [],
  },
  {
    name: 'mailchimpmcp_mailchimp_schedule_campaign',
    description: `Queues a campaign for future delivery at a specified date and time.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
      {
        name: 'schedule_time',
        type: 'string',
        required: true,
        description: `UTC datetime for scheduled delivery (ISO 8601 format).`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_search_members',
    description: `Searches across audiences for members matching a query by email address or name.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query string (email or name)`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: false,
        description: `Optional: restrict search to a specific audience`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_send_campaign',
    description: `Dispatches a campaign immediately to all recipients. This action is irreversible.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign to send.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_send_test_email',
    description: `Sends a preview test email to specified recipients before live distribution.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
      {
        name: 'send_type',
        type: 'string',
        required: true,
        description: `Test type: html or plaintext.`,
      },
      {
        name: 'test_emails',
        type: 'array',
        required: true,
        description: `Email addresses to send the test to.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_start_automation',
    description: `Activates a Classic Automation workflow so it begins processing.`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the automation workflow.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_unschedule_campaign',
    description: `Cancels a previously scheduled campaign, returning it to draft status.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the scheduled campaign.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_update_audience',
    description: `Updates an existing audience's settings such as name and campaign defaults.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the audience.` },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_update_campaign',
    description: `Modifies an existing campaign's settings including subject line, sender info, and audience targeting.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
      {
        name: 'recipients',
        type: 'object',
        required: false,
        description: `Audience targeting settings.`,
      },
      {
        name: 'settings',
        type: 'object',
        required: false,
        description: `Campaign settings to update (subject_line, from_name, reply_to, etc.).`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_update_campaign_content',
    description: `Sets or modifies the HTML and plain-text content of a campaign draft.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the campaign.`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `The HTML content for the campaign.`,
      },
      {
        name: 'plain_text',
        type: 'string',
        required: false,
        description: `The plain-text content for the campaign.`,
      },
      {
        name: 'template',
        type: 'object',
        required: false,
        description: `Template ID and section content to use for the campaign.`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_update_member_tags',
    description: `Adds or removes tags for a specific subscriber in an audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list.`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the lowercase version of the member's email address.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: true,
        description: `Tags to add (active) or remove (inactive).`,
      },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_update_segment',
    description: `Modifies an existing audience segment's name or conditions.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the audience/list.`,
      },
      {
        name: 'segment_id',
        type: 'integer',
        required: true,
        description: `The unique identifier for the segment.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the segment.` },
    ],
  },
  {
    name: 'mailchimpmcp_mailchimp_update_template',
    description: `Modifies an existing template's name or HTML content.`,
    params: [
      {
        name: 'template_id',
        type: 'integer',
        required: true,
        description: `The unique identifier for the template.`,
      },
      { name: 'html', type: 'string', required: false, description: `Updated HTML content.` },
      { name: 'name', type: 'string', required: false, description: `New name for the template.` },
    ],
  },
]
