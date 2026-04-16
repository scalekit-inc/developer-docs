import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'close_activities_list',
    description: `List all activity types for a lead in Close (calls, emails, notes, SMS, etc.).`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_order_by',
        type: 'string',
        required: false,
        description: `Sort field. Default: date_created.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
      {
        name: '_type',
        type: 'string',
        required: false,
        description: `Activity type: Note, Call, Email, Sms, etc.`,
      },
      { name: 'contact_id', type: 'string', required: false, description: `Filter by contact ID.` },
      { name: 'lead_id', type: 'string', required: false, description: `Filter by lead ID.` },
      { name: 'user_id', type: 'string', required: false, description: `Filter by user ID.` },
    ],
  },
  {
    name: 'close_call_create',
    description: `Log an external call activity on a lead in Close.`,
    params: [
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead for this call.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `Call outcome: completed, no_answer, wrong_number, left_voicemail, etc.`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `ID of the contact called.`,
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Call direction: inbound or outbound.`,
      },
      {
        name: 'duration',
        type: 'integer',
        required: false,
        description: `Call duration in seconds.`,
      },
      { name: 'note', type: 'string', required: false, description: `Notes about the call.` },
      { name: 'phone', type: 'string', required: false, description: `Phone number called.` },
      {
        name: 'recording_url',
        type: 'string',
        required: false,
        description: `HTTPS URL of the call recording.`,
      },
    ],
  },
  {
    name: 'close_call_delete',
    description: `Delete a call activity from Close.`,
    params: [
      { name: 'call_id', type: 'string', required: true, description: `ID of the call to delete.` },
    ],
  },
  {
    name: 'close_call_get',
    description: `Retrieve a single call activity by ID.`,
    params: [
      { name: 'call_id', type: 'string', required: true, description: `ID of the call activity.` },
    ],
  },
  {
    name: 'close_call_update',
    description: `Update a call activity's note, status, or duration.`,
    params: [
      { name: 'call_id', type: 'string', required: true, description: `ID of the call to update.` },
      {
        name: 'duration',
        type: 'integer',
        required: false,
        description: `Updated call duration in seconds.`,
      },
      { name: 'note', type: 'string', required: false, description: `Updated call notes.` },
      { name: 'status', type: 'string', required: false, description: `Updated call status.` },
    ],
  },
  {
    name: 'close_calls_list',
    description: `List call activities in Close, optionally filtered by lead, contact, or user.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
      { name: 'contact_id', type: 'string', required: false, description: `Filter by contact ID.` },
      { name: 'lead_id', type: 'string', required: false, description: `Filter by lead ID.` },
      { name: 'user_id', type: 'string', required: false, description: `Filter by user ID.` },
    ],
  },
  {
    name: 'close_comment_create',
    description: `Post a comment on a Close object (lead, opportunity, etc.).`,
    params: [
      { name: 'body', type: 'string', required: true, description: `Comment text body.` },
      {
        name: 'object_id',
        type: 'string',
        required: true,
        description: `ID of the object to comment on.`,
      },
    ],
  },
  {
    name: 'close_comment_delete',
    description: `Delete a comment from Close.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `ID of the comment to delete.`,
      },
    ],
  },
  {
    name: 'close_comment_get',
    description: `Retrieve a single comment by ID.`,
    params: [
      { name: 'comment_id', type: 'string', required: true, description: `ID of the comment.` },
    ],
  },
  {
    name: 'close_comment_update',
    description: `Update the text of an existing comment.`,
    params: [
      { name: 'comment', type: 'string', required: true, description: `Updated comment text.` },
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `ID of the comment to update.`,
      },
    ],
  },
  {
    name: 'close_comments_list',
    description: `List comments on an object. Provide either object_id or thread_id to filter results.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
      {
        name: 'object_id',
        type: 'string',
        required: false,
        description: `ID of the object to fetch comments for.`,
      },
      {
        name: 'thread_id',
        type: 'string',
        required: false,
        description: `ID of the comment thread.`,
      },
    ],
  },
  {
    name: 'close_contact_create',
    description: `Create a new contact in Close and associate it with a lead.`,
    params: [
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead to associate this contact with.`,
      },
      {
        name: 'emails',
        type: 'string',
        required: false,
        description: `JSON array of email objects, e.g. [{"email": "jane@acme.com", "type": "office"}].`,
      },
      { name: 'name', type: 'string', required: false, description: `Full name of the contact.` },
      {
        name: 'phones',
        type: 'string',
        required: false,
        description: `JSON array of phone objects, e.g. [{"phone": "+1234567890", "type": "office"}].`,
      },
      { name: 'title', type: 'string', required: false, description: `Job title of the contact.` },
    ],
  },
  {
    name: 'close_contact_delete',
    description: `Delete a contact from Close.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `ID of the contact to delete.`,
      },
    ],
  },
  {
    name: 'close_contact_get',
    description: `Retrieve a single contact by ID from Close.`,
    params: [
      { name: 'contact_id', type: 'string', required: true, description: `ID of the contact.` },
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'close_contact_update',
    description: `Update a contact's name, title, phone numbers, or email addresses.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `ID of the contact to update.`,
      },
      {
        name: 'emails',
        type: 'string',
        required: false,
        description: `JSON array of email objects.`,
      },
      { name: 'name', type: 'string', required: false, description: `New full name.` },
      {
        name: 'phones',
        type: 'string',
        required: false,
        description: `JSON array of phone objects.`,
      },
      { name: 'title', type: 'string', required: false, description: `New job title.` },
    ],
  },
  {
    name: 'close_contacts_list',
    description: `List contacts in Close, optionally filtered by lead.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
      {
        name: 'lead_id',
        type: 'string',
        required: false,
        description: `Filter contacts by lead ID.`,
      },
    ],
  },
  {
    name: 'close_custom_field_contact_create',
    description: `Create a new custom field for contacts in Close.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the custom field.` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Field type: text, number, date, url, choices, etc.`,
      },
    ],
  },
  {
    name: 'close_custom_field_contact_delete',
    description: `Delete a contact custom field from Close.`,
    params: [
      {
        name: 'custom_field_id',
        type: 'string',
        required: true,
        description: `ID of the custom field to delete.`,
      },
    ],
  },
  {
    name: 'close_custom_field_contact_get',
    description: `Retrieve a single contact custom field by ID.`,
    params: [
      {
        name: 'custom_field_id',
        type: 'string',
        required: true,
        description: `ID of the custom field.`,
      },
    ],
  },
  {
    name: 'close_custom_field_contact_update',
    description: `Update a contact custom field's name or choices.`,
    params: [
      {
        name: 'custom_field_id',
        type: 'string',
        required: true,
        description: `ID of the custom field to update.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the custom field.`,
      },
    ],
  },
  {
    name: 'close_custom_field_lead_create',
    description: `Create a new custom field for leads in Close.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the custom field.` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Field type: text, number, date, url, choices, etc.`,
      },
    ],
  },
  {
    name: 'close_custom_field_lead_delete',
    description: `Delete a lead custom field from Close.`,
    params: [
      {
        name: 'custom_field_id',
        type: 'string',
        required: true,
        description: `ID of the custom field to delete.`,
      },
    ],
  },
  {
    name: 'close_custom_field_lead_get',
    description: `Retrieve a single lead custom field by ID.`,
    params: [
      {
        name: 'custom_field_id',
        type: 'string',
        required: true,
        description: `ID of the custom field.`,
      },
    ],
  },
  {
    name: 'close_custom_field_lead_update',
    description: `Update a lead custom field's name or choices.`,
    params: [
      {
        name: 'custom_field_id',
        type: 'string',
        required: true,
        description: `ID of the custom field to update.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the custom field.`,
      },
    ],
  },
  {
    name: 'close_custom_field_opportunity_create',
    description: `Create a new custom field for opportunitys in Close.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the custom field.` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Field type: text, number, date, url, choices, etc.`,
      },
    ],
  },
  {
    name: 'close_custom_field_opportunity_delete',
    description: `Delete a opportunity custom field from Close.`,
    params: [
      {
        name: 'custom_field_id',
        type: 'string',
        required: true,
        description: `ID of the custom field to delete.`,
      },
    ],
  },
  {
    name: 'close_custom_field_opportunity_get',
    description: `Retrieve a single opportunity custom field by ID.`,
    params: [
      {
        name: 'custom_field_id',
        type: 'string',
        required: true,
        description: `ID of the custom field.`,
      },
    ],
  },
  {
    name: 'close_custom_field_opportunity_update',
    description: `Update a opportunity custom field's name or choices.`,
    params: [
      {
        name: 'custom_field_id',
        type: 'string',
        required: true,
        description: `ID of the custom field to update.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the custom field.`,
      },
    ],
  },
  {
    name: 'close_custom_fields_contact_list',
    description: `List all custom fields defined for contacts in Close.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
    ],
  },
  {
    name: 'close_custom_fields_lead_list',
    description: `List all custom fields defined for leads in Close.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
    ],
  },
  {
    name: 'close_custom_fields_opportunity_list',
    description: `List all custom fields defined for opportunitys in Close.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
    ],
  },
  {
    name: 'close_email_create',
    description: `Log or send an email activity on a lead in Close.`,
    params: [
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead for this email.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `Email status: inbox, draft, scheduled, outbox, sent.`,
      },
      { name: 'body_html', type: 'string', required: false, description: `HTML email body.` },
      { name: 'body_text', type: 'string', required: false, description: `Plain text email body.` },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `ID of the contact this email is for.`,
      },
      { name: 'sender', type: 'string', required: false, description: `Sender email address.` },
      { name: 'subject', type: 'string', required: false, description: `Email subject line.` },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `JSON array of recipient emails, e.g. [{"email": "jane@acme.com"}].`,
      },
    ],
  },
  {
    name: 'close_email_delete',
    description: `Delete an email activity from Close.`,
    params: [
      {
        name: 'email_id',
        type: 'string',
        required: true,
        description: `ID of the email to delete.`,
      },
    ],
  },
  {
    name: 'close_email_get',
    description: `Retrieve a single email activity by ID.`,
    params: [
      {
        name: 'email_id',
        type: 'string',
        required: true,
        description: `ID of the email activity.`,
      },
    ],
  },
  {
    name: 'close_email_update',
    description: `Update an email activity's status, subject, or body.`,
    params: [
      {
        name: 'email_id',
        type: 'string',
        required: true,
        description: `ID of the email to update.`,
      },
      { name: 'body_html', type: 'string', required: false, description: `New HTML body.` },
      { name: 'body_text', type: 'string', required: false, description: `New plain text body.` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New email status: draft, scheduled, outbox, sent.`,
      },
      { name: 'subject', type: 'string', required: false, description: `New subject line.` },
    ],
  },
  {
    name: 'close_emails_list',
    description: `List email activities in Close, optionally filtered by lead or user.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
      { name: 'contact_id', type: 'string', required: false, description: `Filter by contact ID.` },
      { name: 'lead_id', type: 'string', required: false, description: `Filter by lead ID.` },
      { name: 'user_id', type: 'string', required: false, description: `Filter by user ID.` },
    ],
  },
  {
    name: 'close_lead_create',
    description: `Create a new lead in Close with name, contacts, addresses, and custom fields.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the lead / company.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description or notes about the lead.`,
      },
      { name: 'status_id', type: 'string', required: false, description: `Lead status ID.` },
      { name: 'url', type: 'string', required: false, description: `Website URL of the lead.` },
    ],
  },
  {
    name: 'close_lead_delete',
    description: `Permanently delete a lead and all its associated data from Close.`,
    params: [
      { name: 'lead_id', type: 'string', required: true, description: `ID of the lead to delete.` },
    ],
  },
  {
    name: 'close_lead_get',
    description: `Retrieve a single lead by ID from Close.`,
    params: [
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead to retrieve.`,
      },
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'close_lead_merge',
    description: `Merge two leads into one. The source lead is merged into the destination lead.`,
    params: [
      {
        name: 'destination',
        type: 'string',
        required: true,
        description: `ID of the lead to merge into (will be kept).`,
      },
      {
        name: 'source',
        type: 'string',
        required: true,
        description: `ID of the lead to merge from (will be deleted).`,
      },
    ],
  },
  {
    name: 'close_lead_update',
    description: `Update an existing lead's name, status, description, or custom fields.`,
    params: [
      { name: 'lead_id', type: 'string', required: true, description: `ID of the lead to update.` },
      { name: 'description', type: 'string', required: false, description: `Updated description.` },
      { name: 'name', type: 'string', required: false, description: `New name for the lead.` },
      { name: 'status_id', type: 'string', required: false, description: `New lead status ID.` },
      { name: 'url', type: 'string', required: false, description: `New website URL.` },
    ],
  },
  {
    name: 'close_leads_list',
    description: `List and search leads in Close. Supports full-text search and sorting.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_order_by',
        type: 'string',
        required: false,
        description: `Field to sort by. Prefix with - for descending.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Full-text search query to filter leads.`,
      },
    ],
  },
  {
    name: 'close_me_get',
    description: `Retrieve information about the authenticated Close user.`,
    params: [],
  },
  {
    name: 'close_note_create',
    description: `Create a note activity on a lead in Close.`,
    params: [
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead to attach this note to.`,
      },
      { name: 'note', type: 'string', required: true, description: `Note body text (plain text).` },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `ID of the contact this note relates to.`,
      },
    ],
  },
  {
    name: 'close_note_delete',
    description: `Delete a note activity from Close.`,
    params: [
      { name: 'note_id', type: 'string', required: true, description: `ID of the note to delete.` },
    ],
  },
  {
    name: 'close_note_get',
    description: `Retrieve a single note activity by ID.`,
    params: [
      { name: 'note_id', type: 'string', required: true, description: `ID of the note activity.` },
    ],
  },
  {
    name: 'close_note_update',
    description: `Update the body text of a note activity.`,
    params: [
      { name: 'note', type: 'string', required: true, description: `Updated note body text.` },
      { name: 'note_id', type: 'string', required: true, description: `ID of the note to update.` },
    ],
  },
  {
    name: 'close_notes_list',
    description: `List note activities in Close, optionally filtered by lead or user.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
      { name: 'contact_id', type: 'string', required: false, description: `Filter by contact ID.` },
      { name: 'lead_id', type: 'string', required: false, description: `Filter by lead ID.` },
      { name: 'user_id', type: 'string', required: false, description: `Filter by user ID.` },
    ],
  },
  {
    name: 'close_opportunities_list',
    description: `List opportunities in Close, with optional filters by lead, user, or status.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_order_by',
        type: 'string',
        required: false,
        description: `Field to sort by. Prefix with - for descending.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
      { name: 'lead_id', type: 'string', required: false, description: `Filter by lead ID.` },
      {
        name: 'status_id',
        type: 'string',
        required: false,
        description: `Filter by opportunity status ID.`,
      },
      {
        name: 'status_type',
        type: 'string',
        required: false,
        description: `Filter by status type: active, won, or lost.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Filter by assigned user ID.`,
      },
    ],
  },
  {
    name: 'close_opportunity_create',
    description: `Create a new opportunity (deal) in Close and associate it with a lead.`,
    params: [
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead for this opportunity.`,
      },
      {
        name: 'status_id',
        type: 'string',
        required: true,
        description: `ID of the opportunity status.`,
      },
      {
        name: 'confidence',
        type: 'integer',
        required: false,
        description: `Win probability percentage (0-100).`,
      },
      {
        name: 'date_won',
        type: 'string',
        required: false,
        description: `Date won (YYYY-MM-DD), set when status is won.`,
      },
      {
        name: 'expected_date',
        type: 'string',
        required: false,
        description: `Expected close date (YYYY-MM-DD).`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Note about this opportunity.`,
      },
      {
        name: 'value',
        type: 'integer',
        required: false,
        description: `Monetary value of the opportunity in cents.`,
      },
      {
        name: 'value_currency',
        type: 'string',
        required: false,
        description: `Currency code, e.g. USD.`,
      },
      {
        name: 'value_period',
        type: 'string',
        required: false,
        description: `Billing period: one_time, monthly, or annual.`,
      },
    ],
  },
  {
    name: 'close_opportunity_delete',
    description: `Delete an opportunity from Close.`,
    params: [
      {
        name: 'opportunity_id',
        type: 'string',
        required: true,
        description: `ID of the opportunity to delete.`,
      },
    ],
  },
  {
    name: 'close_opportunity_get',
    description: `Retrieve a single opportunity by ID from Close.`,
    params: [
      {
        name: 'opportunity_id',
        type: 'string',
        required: true,
        description: `ID of the opportunity.`,
      },
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'close_opportunity_update',
    description: `Update an opportunity's status, value, note, or confidence.`,
    params: [
      {
        name: 'opportunity_id',
        type: 'string',
        required: true,
        description: `ID of the opportunity to update.`,
      },
      {
        name: 'confidence',
        type: 'integer',
        required: false,
        description: `Win probability (0-100).`,
      },
      { name: 'date_won', type: 'string', required: false, description: `Date won (YYYY-MM-DD).` },
      {
        name: 'expected_date',
        type: 'string',
        required: false,
        description: `Expected close date (YYYY-MM-DD).`,
      },
      { name: 'note', type: 'string', required: false, description: `Updated note.` },
      { name: 'status_id', type: 'string', required: false, description: `New status ID.` },
      {
        name: 'value',
        type: 'integer',
        required: false,
        description: `Updated monetary value in cents.`,
      },
      {
        name: 'value_currency',
        type: 'string',
        required: false,
        description: `Currency code, e.g. USD.`,
      },
      {
        name: 'value_period',
        type: 'string',
        required: false,
        description: `Billing period: one_time, monthly, or annual.`,
      },
    ],
  },
  {
    name: 'close_pipeline_create',
    description: `Create a new opportunity pipeline in Close.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the pipeline.` },
    ],
  },
  {
    name: 'close_pipeline_delete',
    description: `Delete a pipeline from Close.`,
    params: [
      {
        name: 'pipeline_id',
        type: 'string',
        required: true,
        description: `ID of the pipeline to delete.`,
      },
    ],
  },
  {
    name: 'close_pipeline_get',
    description: `Retrieve a single pipeline by ID.`,
    params: [
      { name: 'pipeline_id', type: 'string', required: true, description: `ID of the pipeline.` },
    ],
  },
  {
    name: 'close_pipeline_update',
    description: `Update an existing pipeline's name or statuses.`,
    params: [
      {
        name: 'pipeline_id',
        type: 'string',
        required: true,
        description: `ID of the pipeline to update.`,
      },
      { name: 'name', type: 'string', required: false, description: `New pipeline name.` },
    ],
  },
  {
    name: 'close_pipelines_list',
    description: `List all opportunity pipelines in the Close organization.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
    ],
  },
  {
    name: 'close_sequence_get',
    description: `Retrieve a single sequence by ID.`,
    params: [
      { name: 'sequence_id', type: 'string', required: true, description: `ID of the sequence.` },
    ],
  },
  {
    name: 'close_sequence_subscription_create',
    description: `Enroll a contact in a Close sequence.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `ID of the contact to enroll.`,
      },
      {
        name: 'sequence_id',
        type: 'string',
        required: true,
        description: `ID of the sequence to enroll in.`,
      },
      {
        name: 'sender_account_id',
        type: 'string',
        required: false,
        description: `ID of the sender email account.`,
      },
    ],
  },
  {
    name: 'close_sequence_subscription_get',
    description: `Retrieve a single sequence subscription by ID.`,
    params: [
      {
        name: 'subscription_id',
        type: 'string',
        required: true,
        description: `ID of the subscription.`,
      },
    ],
  },
  {
    name: 'close_sequence_subscription_update',
    description: `Pause or resume a contact's sequence subscription.`,
    params: [
      {
        name: 'subscription_id',
        type: 'string',
        required: true,
        description: `ID of the subscription to update.`,
      },
      {
        name: 'pause',
        type: 'boolean',
        required: false,
        description: `Set to true to pause the subscription, false to resume.`,
      },
    ],
  },
  {
    name: 'close_sequence_subscriptions_list',
    description: `List sequence subscriptions. Provide one of lead_id, contact_id, or sequence_id to filter results.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
      { name: 'contact_id', type: 'string', required: false, description: `Filter by contact ID.` },
      { name: 'lead_id', type: 'string', required: false, description: `Filter by lead ID.` },
      {
        name: 'sequence_id',
        type: 'string',
        required: false,
        description: `Filter by sequence ID.`,
      },
    ],
  },
  {
    name: 'close_sequences_list',
    description: `List email/activity sequences in Close.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
    ],
  },
  {
    name: 'close_sms_create',
    description: `Log or send an SMS activity on a lead in Close.`,
    params: [
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead for this SMS.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `SMS status: inbox, draft, scheduled, outbox, sent.`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `ID of the contact for this SMS.`,
      },
      {
        name: 'local_phone',
        type: 'string',
        required: false,
        description: `Your local phone number to send from.`,
      },
      {
        name: 'remote_phone',
        type: 'string',
        required: false,
        description: `Recipient phone number.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Body text of the SMS message.`,
      },
    ],
  },
  {
    name: 'close_sms_delete',
    description: `Delete an SMS activity from Close.`,
    params: [
      { name: 'sms_id', type: 'string', required: true, description: `ID of the SMS to delete.` },
    ],
  },
  {
    name: 'close_sms_get',
    description: `Retrieve a single SMS activity by ID.`,
    params: [
      { name: 'sms_id', type: 'string', required: true, description: `ID of the SMS activity.` },
    ],
  },
  {
    name: 'close_sms_list',
    description: `List SMS activities in Close, optionally filtered by lead or user.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
      { name: 'contact_id', type: 'string', required: false, description: `Filter by contact ID.` },
      { name: 'lead_id', type: 'string', required: false, description: `Filter by lead ID.` },
      { name: 'user_id', type: 'string', required: false, description: `Filter by user ID.` },
    ],
  },
  {
    name: 'close_sms_update',
    description: `Update an SMS activity's text or status.`,
    params: [
      { name: 'sms_id', type: 'string', required: true, description: `ID of the SMS to update.` },
      { name: 'status', type: 'string', required: false, description: `New SMS status.` },
      { name: 'text', type: 'string', required: false, description: `Updated message text.` },
    ],
  },
  {
    name: 'close_task_create',
    description: `Create a new task in Close and assign it to a lead and user.`,
    params: [
      {
        name: 'lead_id',
        type: 'string',
        required: true,
        description: `ID of the lead to associate this task with.`,
      },
      {
        name: '_type',
        type: 'string',
        required: false,
        description: `Task type, default is lead.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `User ID to assign the task to.`,
      },
      {
        name: 'date',
        type: 'string',
        required: false,
        description: `Task due date (YYYY-MM-DD or ISO 8601).`,
      },
      {
        name: 'is_complete',
        type: 'boolean',
        required: false,
        description: `Whether the task is already complete.`,
      },
      { name: 'text', type: 'string', required: false, description: `Task description / title.` },
    ],
  },
  {
    name: 'close_task_delete',
    description: `Delete a task from Close.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `ID of the task to delete.` },
    ],
  },
  {
    name: 'close_task_get',
    description: `Retrieve a single task by ID from Close.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `ID of the task.` },
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'close_task_update',
    description: `Update a task's text, assigned user, due date, or completion status.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `ID of the task to update.` },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `New assigned user ID.`,
      },
      { name: 'date', type: 'string', required: false, description: `New due date (YYYY-MM-DD).` },
      {
        name: 'is_complete',
        type: 'boolean',
        required: false,
        description: `Mark task as complete or incomplete.`,
      },
      { name: 'text', type: 'string', required: false, description: `New task description.` },
    ],
  },
  {
    name: 'close_tasks_list',
    description: `List tasks in Close. Filter by lead, assigned user, type, or completion status.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_order_by',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
      {
        name: '_type',
        type: 'string',
        required: false,
        description: `Task type: lead, incoming_email, email, automated_email, outgoing_call.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `Filter by assigned user ID.`,
      },
      {
        name: 'is_complete',
        type: 'boolean',
        required: false,
        description: `Filter by completion: true or false.`,
      },
      { name: 'lead_id', type: 'string', required: false, description: `Filter by lead ID.` },
      {
        name: 'view',
        type: 'string',
        required: false,
        description: `Predefined view: inbox, future, or archive.`,
      },
    ],
  },
  {
    name: 'close_user_get',
    description: `Retrieve a single user by ID from Close.`,
    params: [
      { name: 'user_id', type: 'string', required: true, description: `ID of the user.` },
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'close_users_list',
    description: `List all users in the Close organization.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
    ],
  },
  {
    name: 'close_webhook_create',
    description: `Create a new webhook subscription to receive Close event notifications.`,
    params: [
      {
        name: 'events',
        type: 'string',
        required: true,
        description: `JSON array of event objects to subscribe to, e.g. [{"object_type":"lead","action":"created"}].`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `HTTPS endpoint URL to receive webhook events.`,
      },
      {
        name: 'verify_ssl',
        type: 'boolean',
        required: false,
        description: `Whether to verify SSL certificates.`,
      },
    ],
  },
  {
    name: 'close_webhook_delete',
    description: `Delete a webhook subscription from Close.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `ID of the webhook to delete.`,
      },
    ],
  },
  {
    name: 'close_webhook_get',
    description: `Retrieve a single webhook subscription by ID.`,
    params: [
      { name: 'webhook_id', type: 'string', required: true, description: `ID of the webhook.` },
    ],
  },
  {
    name: 'close_webhook_update',
    description: `Update a webhook subscription's URL or event subscriptions.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `ID of the webhook to update.`,
      },
      {
        name: 'events',
        type: 'string',
        required: false,
        description: `New JSON array of event objects.`,
      },
      { name: 'url', type: 'string', required: false, description: `New HTTPS endpoint URL.` },
      {
        name: 'verify_ssl',
        type: 'boolean',
        required: false,
        description: `Whether to verify SSL certificates.`,
      },
    ],
  },
  {
    name: 'close_webhooks_list',
    description: `List all webhook subscriptions in Close.`,
    params: [
      {
        name: '_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
      {
        name: '_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: '_skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip (offset).`,
      },
    ],
  },
]
