import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  // ─── Account ──────────────────────────────────────────────────────────────────
  {
    name: 'mailchimp_ping',
    description: 'Health check — returns a simple "Everything\'s Chimpy!" response if your API key is valid.',
    params: [],
  },
  {
    name: 'mailchimp_account_info',
    description: 'Retrieve details about the authenticated Mailchimp account, including plan, contact info, and industry.',
    params: [],
  },

  // ─── Audiences (Lists) ────────────────────────────────────────────────────────
  {
    name: 'mailchimp_lists_list',
    description: 'List all Mailchimp audiences (lists) in the account with pagination and filtering options.',
    params: [
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Number of audiences to return (default 10, max 1000).',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Pagination offset.',
      },
      {
        name: 'sort_field',
        type: 'string',
        required: false,
        description: 'Sort audiences by field: `date_created` or `campaign_last_sent`.',
      },
      {
        name: 'sort_dir',
        type: 'string',
        required: false,
        description: 'Sort direction: `ASC` or `DESC`.',
      },
      {
        name: 'before_date_created',
        type: 'string',
        required: false,
        description: 'Filter audiences created before this ISO 8601 datetime.',
      },
    ],
  },
  {
    name: 'mailchimp_list_get',
    description: 'Retrieve details about a specific Mailchimp audience by its list ID.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience. Get it from `mailchimp_lists_list`.',
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: 'Comma-separated list of fields to include in the response.',
      },
    ],
  },
  {
    name: 'mailchimp_list_create',
    description: 'Create a new Mailchimp audience. Requires a contact address and campaign defaults. Note: free plans allow only one audience.',
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'The name of the audience.',
      },
      {
        name: 'permission_reminder',
        type: 'string',
        required: true,
        description: 'A reminder for subscribers about why they were added (e.g. "You subscribed to our newsletter.").',
      },
      {
        name: 'from_name',
        type: 'string',
        required: true,
        description: 'Default sender display name for campaigns.',
      },
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: 'Default sender email address (must be verified).',
      },
      {
        name: 'email_type_option',
        type: 'boolean',
        required: true,
        description: 'Set to `true` to let subscribers choose HTML or plain text email format.',
      },
      {
        name: 'contact_company',
        type: 'string',
        required: true,
        description: 'Company name for the audience contact address.',
      },
      {
        name: 'contact_address',
        type: 'string',
        required: true,
        description: 'Street address for the audience contact address.',
      },
      {
        name: 'contact_city',
        type: 'string',
        required: true,
        description: 'City for the audience contact address.',
      },
      {
        name: 'contact_state',
        type: 'string',
        required: true,
        description: 'State or province for the audience contact address.',
      },
      {
        name: 'contact_zip',
        type: 'string',
        required: true,
        description: 'ZIP or postal code for the audience contact address.',
      },
      {
        name: 'contact_country',
        type: 'string',
        required: true,
        description: 'Two-letter ISO country code for the audience contact address (e.g. `US`).',
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: 'Default campaign subject line.',
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: 'Default language for the audience (ISO 639-1 code, e.g. `en`).',
      },
    ],
  },
  {
    name: 'mailchimp_list_update',
    description: 'Update settings for a Mailchimp audience such as name, permission reminder, or sender details.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience. Get it from `mailchimp_lists_list`.',
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: 'Updated audience name.',
      },
      {
        name: 'permission_reminder',
        type: 'string',
        required: false,
        description: 'Updated permission reminder text.',
      },
      {
        name: 'from_name',
        type: 'string',
        required: false,
        description: 'Updated default sender display name.',
      },
      {
        name: 'from_email',
        type: 'string',
        required: false,
        description: 'Updated default sender email address.',
      },
    ],
  },
  {
    name: 'mailchimp_list_delete',
    description: 'Permanently delete a Mailchimp audience and all its member data. This action is irreversible.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience to delete.',
      },
    ],
  },

  // ─── Members ──────────────────────────────────────────────────────────────────
  {
    name: 'mailchimp_list_members_list',
    description: 'List all members of a Mailchimp audience with filtering by status, segment, and pagination.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience. Get it from `mailchimp_lists_list`.',
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: 'Filter by subscription status: `subscribed`, `unsubscribed`, `cleaned`, `pending`, or `transactional`.',
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Number of members to return (default 10, max 1000).',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Pagination offset.',
      },
      {
        name: 'email_address',
        type: 'string',
        required: false,
        description: 'Filter to a specific email address.',
      },
      {
        name: 'since_last_changed',
        type: 'string',
        required: false,
        description: 'Filter members changed after this ISO 8601 datetime.',
      },
      {
        name: 'segment_id',
        type: 'string',
        required: false,
        description: 'Filter members in a specific segment.',
      },
    ],
  },
  {
    name: 'mailchimp_list_member_get',
    description: 'Retrieve information about a specific audience member by their MD5-hashed email address.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience.',
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: 'The MD5 hash of the member\'s email address (lowercase). Get it from `mailchimp_list_members_list`.',
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: 'Comma-separated list of fields to include.',
      },
    ],
  },
  {
    name: 'mailchimp_list_member_add',
    description: 'Add a new member to a Mailchimp audience.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience.',
      },
      {
        name: 'email_address',
        type: 'string',
        required: true,
        description: 'The member\'s email address.',
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: 'Subscription status: `subscribed`, `unsubscribed`, `cleaned`, or `pending`.',
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: 'Member\'s first name.',
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: 'Member\'s last name.',
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: 'JSON array of tags to apply (e.g. `["vip","beta"]`).',
      },
    ],
  },
  {
    name: 'mailchimp_list_member_update',
    description: 'Update an existing audience member\'s details such as email, status, or name.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience.',
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: 'MD5 hash of the member\'s email address (lowercase).',
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: 'Updated subscription status: `subscribed`, `unsubscribed`, `cleaned`, or `pending`.',
      },
      {
        name: 'email_address',
        type: 'string',
        required: false,
        description: 'Updated email address.',
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: 'Updated first name.',
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: 'Updated last name.',
      },
    ],
  },
  {
    name: 'mailchimp_list_member_upsert',
    description: 'Add or update a member in an audience. Creates the member if they don\'t exist; updates them if they do.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience.',
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: 'MD5 hash of the member\'s email address (lowercase).',
      },
      {
        name: 'email_address',
        type: 'string',
        required: true,
        description: 'The member\'s email address.',
      },
      {
        name: 'status_if_new',
        type: 'string',
        required: true,
        description: 'Status to set if this is a new subscriber: `subscribed`, `unsubscribed`, `cleaned`, or `pending`.',
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: 'Updated subscription status for existing members.',
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: 'First name.',
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: 'Last name.',
      },
    ],
  },
  {
    name: 'mailchimp_list_member_archive',
    description: 'Archive a member from a Mailchimp audience (sets status to unsubscribed without permanently deleting).',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience.',
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: 'MD5 hash of the member\'s email address (lowercase).',
      },
    ],
  },
  {
    name: 'mailchimp_list_member_delete_permanent',
    description: 'Permanently delete a member from a Mailchimp audience. This cannot be undone.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience.',
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: 'MD5 hash of the member\'s email address (lowercase).',
      },
    ],
  },
  {
    name: 'mailchimp_list_member_tags_get',
    description: 'Retrieve all tags applied to a specific audience member.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience.',
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: 'MD5 hash of the member\'s email address (lowercase).',
      },
    ],
  },
  {
    name: 'mailchimp_list_member_tags_update',
    description: 'Add or remove tags on a specific audience member.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience.',
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: 'MD5 hash of the member\'s email address (lowercase).',
      },
      {
        name: 'tags',
        type: 'string',
        required: true,
        description: 'JSON array of tag objects, each with `name` and `status` (`active` or `inactive`). Example: `[{"name":"vip","status":"active"}]`.',
      },
    ],
  },

  // ─── Segments ─────────────────────────────────────────────────────────────────
  {
    name: 'mailchimp_segments_list',
    description: 'List all segments in a Mailchimp audience.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience. Get it from `mailchimp_lists_list`.',
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: 'Filter by segment type: `saved`, `static`, or `fuzzy`.',
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Number of segments to return.',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Pagination offset.',
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: 'Comma-separated list of fields to include.',
      },
    ],
  },
  {
    name: 'mailchimp_segment_get',
    description: 'Retrieve details about a specific audience segment.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience.',
      },
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the segment. Get it from `mailchimp_segments_list`.',
      },
    ],
  },
  {
    name: 'mailchimp_segment_create',
    description: 'Create a new segment in a Mailchimp audience. Provide either `options` for a saved/conditional segment or `static_segment` for a static list of emails.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience.',
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Name for the segment.',
      },
      {
        name: 'static_segment',
        type: 'string',
        required: false,
        description: 'JSON array of email addresses for a static segment (e.g. `["a@example.com","b@example.com"]`).',
      },
      {
        name: 'options',
        type: 'object',
        required: false,
        description: 'Conditions object for a saved/conditional segment.',
      },
    ],
  },
  {
    name: 'mailchimp_segment_update',
    description: 'Update an existing audience segment\'s name or member conditions.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience.',
      },
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the segment.',
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: 'Updated segment name.',
      },
      {
        name: 'static_segment',
        type: 'string',
        required: false,
        description: 'Updated JSON array of email addresses for a static segment.',
      },
    ],
  },
  {
    name: 'mailchimp_segment_delete',
    description: 'Delete a segment from a Mailchimp audience.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience.',
      },
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the segment to delete.',
      },
    ],
  },
  {
    name: 'mailchimp_segment_members_list',
    description: 'List all members of a specific audience segment.',
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the audience.',
      },
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the segment.',
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Number of members to return.',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Pagination offset.',
      },
    ],
  },

  // ─── Campaigns ────────────────────────────────────────────────────────────────
  {
    name: 'mailchimp_campaigns_list',
    description: 'List all campaigns in the Mailchimp account with filtering by type, status, and date.',
    params: [
      {
        name: 'type',
        type: 'string',
        required: false,
        description: 'Filter by campaign type: `regular`, `plaintext`, `absplit`, `rss`, or `variate`.',
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: 'Filter by status: `save`, `paused`, `schedule`, `sending`, or `sent`.',
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Number of campaigns to return.',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Pagination offset.',
      },
      {
        name: 'list_id',
        type: 'string',
        required: false,
        description: 'Filter campaigns by audience ID.',
      },
      {
        name: 'before_send_time',
        type: 'string',
        required: false,
        description: 'Filter campaigns scheduled before this ISO 8601 datetime.',
      },
      {
        name: 'since_send_time',
        type: 'string',
        required: false,
        description: 'Filter campaigns scheduled after this ISO 8601 datetime.',
      },
      {
        name: 'sort_field',
        type: 'string',
        required: false,
        description: 'Sort by field: `create_time` or `send_time`.',
      },
    ],
  },
  {
    name: 'mailchimp_campaign_get',
    description: 'Retrieve details about a specific campaign by its ID.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the campaign. Get it from `mailchimp_campaigns_list`.',
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: 'Comma-separated list of fields to include.',
      },
    ],
  },
  {
    name: 'mailchimp_campaign_create',
    description: 'Create a new Mailchimp campaign. Use `mailchimp_campaign_content_set` to add HTML content before sending.',
    params: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: 'Campaign type: `regular`, `plaintext`, `absplit`, `rss`, or `variate`.',
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: 'The audience ID to send this campaign to.',
      },
      {
        name: 'subject_line',
        type: 'string',
        required: false,
        description: 'Subject line for the campaign.',
      },
      {
        name: 'preview_text',
        type: 'string',
        required: false,
        description: 'Preview text shown in inbox previews.',
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: 'Internal campaign title (not shown to subscribers).',
      },
      {
        name: 'from_name',
        type: 'string',
        required: false,
        description: 'Sender display name.',
      },
      {
        name: 'reply_to',
        type: 'string',
        required: false,
        description: 'Reply-to email address.',
      },
      {
        name: 'segment_id',
        type: 'string',
        required: false,
        description: 'Send only to members of this segment ID.',
      },
    ],
  },
  {
    name: 'mailchimp_campaign_update',
    description: 'Update settings for an existing campaign such as subject line, sender name, or audience.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the campaign.',
      },
      {
        name: 'subject_line',
        type: 'string',
        required: false,
        description: 'Updated subject line.',
      },
      {
        name: 'preview_text',
        type: 'string',
        required: false,
        description: 'Updated preview text.',
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: 'Updated campaign title.',
      },
      {
        name: 'from_name',
        type: 'string',
        required: false,
        description: 'Updated sender display name.',
      },
      {
        name: 'reply_to',
        type: 'string',
        required: false,
        description: 'Updated reply-to email address.',
      },
      {
        name: 'list_id',
        type: 'string',
        required: false,
        description: 'Updated audience ID.',
      },
    ],
  },
  {
    name: 'mailchimp_campaign_delete',
    description: 'Delete a campaign. Only campaigns with status `save` or `paused` can be deleted.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the campaign to delete.',
      },
    ],
  },
  {
    name: 'mailchimp_campaign_content_get',
    description: 'Retrieve the HTML and plain-text content of a campaign.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the campaign.',
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: 'Comma-separated list of fields to include.',
      },
    ],
  },
  {
    name: 'mailchimp_campaign_content_set',
    description: 'Set the HTML content for a campaign. Call this before sending.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the campaign.',
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: 'Raw HTML for the campaign body.',
      },
      {
        name: 'plain_text',
        type: 'string',
        required: false,
        description: 'Plain text version of the campaign.',
      },
      {
        name: 'template_id',
        type: 'string',
        required: false,
        description: 'ID of a saved template to use as the campaign content.',
      },
    ],
  },
  {
    name: 'mailchimp_campaign_send',
    description: 'Send a campaign immediately. The campaign must have a subject line, content, and a valid recipient list.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the campaign to send.',
      },
    ],
  },
  {
    name: 'mailchimp_campaign_schedule',
    description: 'Schedule a campaign to send at a specific time. Requires a paid Mailchimp plan.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the campaign.',
      },
      {
        name: 'schedule_time',
        type: 'string',
        required: true,
        description: 'The UTC datetime to send the campaign in ISO 8601 format (e.g. `2024-12-01T10:00:00Z`).',
      },
    ],
  },
  {
    name: 'mailchimp_campaign_unschedule',
    description: 'Cancel a scheduled campaign and return it to draft status.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the scheduled campaign.',
      },
    ],
  },
  {
    name: 'mailchimp_campaign_test',
    description: 'Send a test email for a campaign to one or more addresses.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the campaign.',
      },
      {
        name: 'test_emails',
        type: 'string',
        required: true,
        description: 'JSON-encoded array of email addresses to send the test to (e.g. `["you@example.com"]`).',
      },
      {
        name: 'send_type',
        type: 'string',
        required: false,
        description: 'Email format to send: `html` (default) or `plaintext`.',
      },
    ],
  },

  // ─── Templates ────────────────────────────────────────────────────────────────
  {
    name: 'mailchimp_templates_list',
    description: 'List all email templates in the Mailchimp account.',
    params: [
      {
        name: 'type',
        type: 'string',
        required: false,
        description: 'Filter by template type: `user`, `gallery`, or `base`.',
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: 'Filter by template category.',
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Number of templates to return.',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Pagination offset.',
      },
      {
        name: 'sort_field',
        type: 'string',
        required: false,
        description: 'Sort by `date_created` or `name`.',
      },
      {
        name: 'sort_dir',
        type: 'string',
        required: false,
        description: 'Sort direction: `ASC` or `DESC`.',
      },
    ],
  },
  {
    name: 'mailchimp_template_get',
    description: 'Retrieve details about a specific email template by its ID.',
    params: [
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the template. Get it from `mailchimp_templates_list`.',
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: 'Comma-separated list of fields to include.',
      },
    ],
  },
  {
    name: 'mailchimp_template_create',
    description: 'Create a new custom HTML email template.',
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Name for the template.',
      },
      {
        name: 'html',
        type: 'string',
        required: true,
        description: 'HTML content of the template.',
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: 'ID of the folder to place the template in.',
      },
    ],
  },
  {
    name: 'mailchimp_template_update',
    description: 'Update an existing email template\'s name or HTML content.',
    params: [
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the template.',
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: 'Updated template name.',
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: 'Updated HTML content.',
      },
    ],
  },
  {
    name: 'mailchimp_template_delete',
    description: 'Delete a custom email template.',
    params: [
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the template to delete.',
      },
    ],
  },

  // ─── Reports ──────────────────────────────────────────────────────────────────
  {
    name: 'mailchimp_reports_list',
    description: 'List campaign reports for the account with filtering by type and date.',
    params: [
      {
        name: 'type',
        type: 'string',
        required: false,
        description: 'Filter by campaign type: `regular`, `plaintext`, `absplit`, `rss`, or `variate`.',
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Number of reports to return.',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Pagination offset.',
      },
      {
        name: 'since_send_time',
        type: 'string',
        required: false,
        description: 'Filter reports for campaigns sent after this ISO 8601 datetime.',
      },
    ],
  },
  {
    name: 'mailchimp_report_get',
    description: 'Retrieve the summary report for a specific sent campaign.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the campaign. Get it from `mailchimp_campaigns_list`.',
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: 'Comma-separated list of fields to include.',
      },
    ],
  },
  {
    name: 'mailchimp_report_click_details',
    description: 'Retrieve click activity details for a sent campaign, showing which links were clicked.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the campaign.',
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Number of results to return.',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Pagination offset.',
      },
    ],
  },
  {
    name: 'mailchimp_report_open_details',
    description: 'Retrieve open activity details for a sent campaign, showing who opened the email.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the campaign.',
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Number of results to return.',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Pagination offset.',
      },
    ],
  },
  {
    name: 'mailchimp_report_email_activity',
    description: 'Retrieve per-subscriber email activity (opens, clicks, bounces) for a sent campaign.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the campaign.',
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Number of results to return.',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Pagination offset.',
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: 'Filter activity since this ISO 8601 datetime.',
      },
    ],
  },
  {
    name: 'mailchimp_report_unsubscribes',
    description: 'Retrieve the list of members who unsubscribed from a sent campaign.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the campaign.',
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Number of results to return.',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Pagination offset.',
      },
    ],
  },

  // ─── Automations ──────────────────────────────────────────────────────────────
  {
    name: 'mailchimp_automations_list',
    description: 'List all classic automation workflows in the Mailchimp account.',
    params: [
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Number of automations to return.',
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Pagination offset.',
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: 'Filter by status: `save`, `paused`, or `sending`.',
      },
      {
        name: 'before_create_time',
        type: 'string',
        required: false,
        description: 'Filter automations created before this ISO 8601 datetime.',
      },
    ],
  },
  {
    name: 'mailchimp_automation_get',
    description: 'Retrieve details about a specific classic automation workflow.',
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the automation workflow. Get it from `mailchimp_automations_list`.',
      },
    ],
  },
  {
    name: 'mailchimp_automation_start',
    description: 'Start all emails in a paused or saved automation workflow.',
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the automation workflow.',
      },
    ],
  },
  {
    name: 'mailchimp_automation_pause',
    description: 'Pause all emails in an active automation workflow.',
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the automation workflow.',
      },
    ],
  },

  // ─── Batch ────────────────────────────────────────────────────────────────────
  {
    name: 'mailchimp_batch_status_get',
    description: 'Check the status of a batch operation by its batch ID.',
    params: [
      {
        name: 'batch_id',
        type: 'string',
        required: true,
        description: 'The unique ID of the batch operation.',
      },
    ],
  },
]
