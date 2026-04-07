import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'outreach_accounts_create',
    description: `Create a new account (company) in Outreach.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the account`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Website domain of the account`,
      },
      { name: 'industry', type: 'string', required: false, description: `Industry of the account` },
      {
        name: 'linkedin_url',
        type: 'string',
        required: false,
        description: `LinkedIn company page URL`,
      },
      {
        name: 'locality',
        type: 'string',
        required: false,
        description: `Location/city of the account`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the account (company)`,
      },
      {
        name: 'number_of_employees',
        type: 'integer',
        required: false,
        description: `Number of employees at the account`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user (owner) to assign this account to`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of tags to apply to the account`,
      },
      {
        name: 'website_url',
        type: 'string',
        required: false,
        description: `Website URL of the account`,
      },
    ],
  },
  {
    name: 'outreach_accounts_delete',
    description: `Permanently delete an account from Outreach by ID. This action cannot be undone.`,
    params: [
      {
        name: 'account_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the account to delete`,
      },
    ],
  },
  {
    name: 'outreach_accounts_get',
    description: `Retrieve a single account by ID from Outreach.`,
    params: [
      {
        name: 'account_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the account to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_accounts_list',
    description: `List all accounts in Outreach with optional filtering, sorting, and pagination.`,
    params: [
      {
        name: 'filter_domain',
        type: 'string',
        required: false,
        description: `Filter accounts by domain`,
      },
      {
        name: 'filter_name',
        type: 'string',
        required: false,
        description: `Filter accounts by name`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination (number of records to skip)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with '-' for descending order (e.g., '-createdAt')`,
      },
    ],
  },
  {
    name: 'outreach_accounts_update',
    description: `Update an existing account in Outreach. Only provided fields will be changed.`,
    params: [
      {
        name: 'account_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the account to update`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the account`,
      },
      { name: 'domain', type: 'string', required: false, description: `Updated website domain` },
      {
        name: 'industry',
        type: 'string',
        required: false,
        description: `Updated industry of the account`,
      },
      { name: 'name', type: 'string', required: false, description: `Updated name of the account` },
      {
        name: 'number_of_employees',
        type: 'integer',
        required: false,
        description: `Updated number of employees`,
      },
      { name: 'owner_id', type: 'integer', required: false, description: `Updated owner user ID` },
      { name: 'tags', type: 'array', required: false, description: `Updated array of tags` },
      { name: 'website_url', type: 'string', required: false, description: `Updated website URL` },
    ],
  },
  {
    name: 'outreach_calls_create',
    description: `Log a call record in Outreach. Used to track inbound or outbound call activity against a prospect.`,
    params: [
      {
        name: 'answered_at',
        type: 'string',
        required: false,
        description: `ISO 8601 datetime when the call was answered`,
      },
      {
        name: 'call_disposition_id',
        type: 'integer',
        required: false,
        description: `ID of the call disposition (outcome category)`,
      },
      {
        name: 'call_purpose_id',
        type: 'integer',
        required: false,
        description: `ID of the call purpose`,
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Direction of the call. Options: inbound, outbound`,
      },
      {
        name: 'duration',
        type: 'integer',
        required: false,
        description: `Duration of the call in seconds`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Note or summary about the call`,
      },
      {
        name: 'outcome',
        type: 'string',
        required: false,
        description: `Outcome of the call (e.g., connected, no_answer, left_voicemail)`,
      },
      {
        name: 'prospect_id',
        type: 'integer',
        required: false,
        description: `ID of the prospect associated with this call`,
      },
    ],
  },
  {
    name: 'outreach_calls_get',
    description: `Retrieve a single call record by ID from Outreach, including direction, outcome, note, recording URL, and related prospect.`,
    params: [
      {
        name: 'call_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the call to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_calls_list',
    description: `List call records in Outreach with optional filtering by prospect, direction, or outcome.`,
    params: [
      {
        name: 'filter_direction',
        type: 'string',
        required: false,
        description: `Filter calls by direction. Options: inbound, outbound`,
      },
      {
        name: 'filter_prospect_id',
        type: 'integer',
        required: false,
        description: `Filter calls by prospect ID`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with '-' for descending order`,
      },
    ],
  },
  {
    name: 'outreach_mailboxes_get',
    description: `Retrieve a single mailbox by ID from Outreach, including its email address, sender name, and sync status.`,
    params: [
      {
        name: 'mailbox_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the mailbox to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_mailboxes_list',
    description: `List all mailboxes (sender email addresses) configured in Outreach. Mailboxes are required when enrolling prospects in sequences.`,
    params: [
      {
        name: 'filter_email',
        type: 'string',
        required: false,
        description: `Filter mailboxes by email address`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
    ],
  },
  {
    name: 'outreach_mailings_get',
    description: `Retrieve a single mailing by ID from Outreach, including its body, subject, state, and related prospect details.`,
    params: [
      {
        name: 'mailing_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the mailing to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_mailings_list',
    description: `List mailings (emails sent or scheduled) in Outreach with optional filtering and pagination.`,
    params: [
      {
        name: 'filter_prospect_id',
        type: 'integer',
        required: false,
        description: `Filter mailings by prospect ID`,
      },
      {
        name: 'filter_state',
        type: 'string',
        required: false,
        description: `Filter by mailing state. Options: bounced, delivered, delivering, drafted, failed, opened, placeholder, queued, replied, scheduled`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with '-' for descending order`,
      },
    ],
  },
  {
    name: 'outreach_opportunities_create',
    description: `Create a new opportunity in Outreach to track sales deals.`,
    params: [
      {
        name: 'account_id',
        type: 'integer',
        required: false,
        description: `ID of the account associated with this opportunity`,
      },
      {
        name: 'amount',
        type: 'number',
        required: false,
        description: `Monetary value of the opportunity`,
      },
      {
        name: 'close_date',
        type: 'string',
        required: true,
        description: `Expected close date for the opportunity in full ISO 8601 datetime format (YYYY-MM-DDTHH:MM:SS.000Z)`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name or title of the opportunity`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user (owner) responsible for this opportunity`,
      },
      {
        name: 'probability',
        type: 'integer',
        required: false,
        description: `Probability of closing (0-100)`,
      },
      {
        name: 'prospect_id',
        type: 'integer',
        required: false,
        description: `ID of the prospect (primary contact) associated with this opportunity`,
      },
      {
        name: 'stage_id',
        type: 'integer',
        required: false,
        description: `ID of the opportunity stage`,
      },
    ],
  },
  {
    name: 'outreach_opportunities_delete',
    description: `Permanently delete an opportunity from Outreach by ID. This action cannot be undone.`,
    params: [
      {
        name: 'opportunity_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the opportunity to delete`,
      },
    ],
  },
  {
    name: 'outreach_opportunities_get',
    description: `Retrieve a single opportunity by ID from Outreach, including its name, amount, close date, and stage.`,
    params: [
      {
        name: 'opportunity_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the opportunity to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_opportunities_list',
    description: `List opportunities in Outreach with optional filtering by name, prospect, or account.`,
    params: [
      {
        name: 'filter_name',
        type: 'string',
        required: false,
        description: `Filter opportunities by name`,
      },
      {
        name: 'filter_prospect_id',
        type: 'integer',
        required: false,
        description: `Filter by prospect ID`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with '-' for descending order`,
      },
    ],
  },
  {
    name: 'outreach_opportunities_update',
    description: `Update an existing opportunity in Outreach. Only provided fields will be changed.`,
    params: [
      {
        name: 'amount',
        type: 'number',
        required: false,
        description: `Updated monetary value of the opportunity`,
      },
      {
        name: 'close_date',
        type: 'string',
        required: false,
        description: `Updated expected close date (ISO 8601 format)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name of the opportunity`,
      },
      {
        name: 'opportunity_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the opportunity to update`,
      },
      { name: 'owner_id', type: 'integer', required: false, description: `Updated owner user ID` },
      {
        name: 'probability',
        type: 'integer',
        required: false,
        description: `Updated probability of closing (0-100)`,
      },
      {
        name: 'stage_id',
        type: 'integer',
        required: false,
        description: `Updated opportunity stage ID`,
      },
    ],
  },
  {
    name: 'outreach_prospects_create',
    description: `Create a new prospect in Outreach. Provide at minimum a first name, last name, or email address.`,
    params: [
      {
        name: 'account_id',
        type: 'integer',
        required: false,
        description: `ID of the account to associate with this prospect`,
      },
      {
        name: 'address_city',
        type: 'string',
        required: false,
        description: `City of the prospect's address`,
      },
      {
        name: 'address_country',
        type: 'string',
        required: false,
        description: `Country of the prospect's address`,
      },
      {
        name: 'address_state',
        type: 'string',
        required: false,
        description: `State of the prospect's address`,
      },
      {
        name: 'company',
        type: 'string',
        required: false,
        description: `Company name of the prospect`,
      },
      {
        name: 'emails',
        type: 'array',
        required: false,
        description: `Array of email addresses for the prospect`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `First name of the prospect`,
      },
      {
        name: 'github_url',
        type: 'string',
        required: false,
        description: `GitHub profile URL of the prospect`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `Last name of the prospect`,
      },
      {
        name: 'linkedin_url',
        type: 'string',
        required: false,
        description: `LinkedIn profile URL of the prospect`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user (owner) to assign this prospect to`,
      },
      {
        name: 'phones',
        type: 'array',
        required: false,
        description: `Array of phone numbers for the prospect`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of tags to apply to the prospect`,
      },
      { name: 'title', type: 'string', required: false, description: `Job title of the prospect` },
      {
        name: 'website_url',
        type: 'string',
        required: false,
        description: `Personal or company website URL of the prospect`,
      },
    ],
  },
  {
    name: 'outreach_prospects_delete',
    description: `Permanently delete a prospect from Outreach by ID. This action cannot be undone.`,
    params: [
      {
        name: 'prospect_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the prospect to delete`,
      },
    ],
  },
  {
    name: 'outreach_prospects_get',
    description: `Retrieve a single prospect by ID from Outreach.`,
    params: [
      {
        name: 'prospect_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the prospect to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_prospects_list',
    description: `List all prospects in Outreach with optional filtering, sorting, and pagination.`,
    params: [
      {
        name: 'filter_company',
        type: 'string',
        required: false,
        description: `Filter prospects by company name`,
      },
      {
        name: 'filter_email',
        type: 'string',
        required: false,
        description: `Filter prospects by email address`,
      },
      {
        name: 'filter_first_name',
        type: 'string',
        required: false,
        description: `Filter prospects by first name`,
      },
      {
        name: 'filter_last_name',
        type: 'string',
        required: false,
        description: `Filter prospects by last name`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination (number of records to skip)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with '-' for descending order (e.g., '-createdAt')`,
      },
    ],
  },
  {
    name: 'outreach_prospects_update',
    description: `Update an existing prospect in Outreach. Only provided fields will be changed.`,
    params: [
      {
        name: 'account_id',
        type: 'integer',
        required: false,
        description: `ID of the account to associate with this prospect`,
      },
      {
        name: 'address_city',
        type: 'string',
        required: false,
        description: `City of the prospect's address`,
      },
      {
        name: 'address_country',
        type: 'string',
        required: false,
        description: `Country of the prospect's address`,
      },
      {
        name: 'address_state',
        type: 'string',
        required: false,
        description: `State of the prospect's address`,
      },
      {
        name: 'company',
        type: 'string',
        required: false,
        description: `Company name of the prospect`,
      },
      {
        name: 'emails',
        type: 'array',
        required: false,
        description: `Array of email addresses for the prospect`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `First name of the prospect`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `Last name of the prospect`,
      },
      {
        name: 'linkedin_url',
        type: 'string',
        required: false,
        description: `LinkedIn profile URL of the prospect`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user (owner) to assign this prospect to`,
      },
      {
        name: 'phones',
        type: 'array',
        required: false,
        description: `Array of phone numbers for the prospect`,
      },
      {
        name: 'prospect_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the prospect to update`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of tags to apply to the prospect`,
      },
      { name: 'title', type: 'string', required: false, description: `Job title of the prospect` },
    ],
  },
  {
    name: 'outreach_sequence_states_create',
    description: `Enroll a prospect in a sequence by creating a sequence state. Requires a prospect ID, sequence ID, and mailbox ID.`,
    params: [
      {
        name: 'mailbox_id',
        type: 'integer',
        required: true,
        description: `ID of the mailbox to use for sending sequence emails`,
      },
      {
        name: 'prospect_id',
        type: 'integer',
        required: true,
        description: `ID of the prospect to enroll in the sequence`,
      },
      {
        name: 'sequence_id',
        type: 'integer',
        required: true,
        description: `ID of the sequence to enroll the prospect in`,
      },
    ],
  },
  {
    name: 'outreach_sequence_states_delete',
    description: `Remove a prospect from a sequence by deleting the sequence state record. This action cannot be undone.`,
    params: [
      {
        name: 'sequence_state_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the sequence state to delete`,
      },
    ],
  },
  {
    name: 'outreach_sequence_states_get',
    description: `Retrieve a single sequence state (enrollment record) by ID from Outreach.`,
    params: [
      {
        name: 'sequence_state_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the sequence state to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_sequence_states_list',
    description: `List sequence states (enrollment records) in Outreach, showing which prospects are enrolled in which sequences.`,
    params: [
      {
        name: 'filter_prospect_id',
        type: 'integer',
        required: false,
        description: `Filter by prospect ID`,
      },
      {
        name: 'filter_sequence_id',
        type: 'integer',
        required: false,
        description: `Filter by sequence ID`,
      },
      {
        name: 'filter_state',
        type: 'string',
        required: false,
        description: `Filter by state. Options: active, pending, finished, paused, disabled, failed, bounced, opted_out`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
    ],
  },
  {
    name: 'outreach_sequence_steps_get',
    description: `Retrieve a single sequence step by ID from Outreach, including its step order, action type, and associated sequence.`,
    params: [
      {
        name: 'sequence_step_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the sequence step to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_sequence_steps_list',
    description: `List all sequence steps in Outreach. Sequence steps define the individual actions (emails, calls, tasks) within a sequence.`,
    params: [
      {
        name: 'filter_sequence_id',
        type: 'integer',
        required: false,
        description: `Filter sequence steps by sequence ID`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
    ],
  },
  {
    name: 'outreach_sequences_create',
    description: `Create a new sequence in Outreach for automated sales engagement.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the sequence`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the sequence` },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user (owner) to assign this sequence to`,
      },
      {
        name: 'sequence_type',
        type: 'string',
        required: false,
        description: `Type of the sequence. Options: 'date' or 'interval'`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of tags to apply to the sequence`,
      },
    ],
  },
  {
    name: 'outreach_sequences_delete',
    description: `Permanently delete a sequence from Outreach by ID. This action cannot be undone and will remove all associated sequence steps.`,
    params: [
      {
        name: 'sequence_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the sequence to delete`,
      },
    ],
  },
  {
    name: 'outreach_sequences_get',
    description: `Retrieve a single sequence by ID from Outreach.`,
    params: [
      {
        name: 'sequence_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the sequence to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_sequences_list',
    description: `List all sequences in Outreach with optional filtering and pagination.`,
    params: [
      {
        name: 'filter_enabled',
        type: 'boolean',
        required: false,
        description: `Filter by enabled status (true or false)`,
      },
      {
        name: 'filter_name',
        type: 'string',
        required: false,
        description: `Filter sequences by name`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination (number of records to skip)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with '-' for descending order`,
      },
    ],
  },
  {
    name: 'outreach_sequences_update',
    description: `Update an existing sequence in Outreach. Use this to rename a sequence, change its description, or enable/disable it.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the sequence`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the sequence should be active/enabled`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name of the sequence`,
      },
      {
        name: 'sequence_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the sequence to update`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Updated array of tags for the sequence`,
      },
    ],
  },
  {
    name: 'outreach_stages_get',
    description: `Retrieve a single opportunity stage by ID from Outreach, including its name, color, and order.`,
    params: [
      {
        name: 'stage_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the opportunity stage to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_stages_list',
    description: `List all opportunity stages (pipeline stages) configured in Outreach.`,
    params: [
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
    ],
  },
  {
    name: 'outreach_tags_list',
    description: `List all tags configured in Outreach that can be applied to prospects, accounts, and sequences.`,
    params: [
      { name: 'filter_name', type: 'string', required: false, description: `Filter tags by name` },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
    ],
  },
  {
    name: 'outreach_tasks_complete',
    description: `Mark an existing task as complete in Outreach. Only works for action_item and in_person tasks — call and email tasks cannot be completed this way. Use this instead of outreach_tasks_update to complete a task.`,
    params: [
      {
        name: 'completion_note',
        type: 'string',
        required: false,
        description: `Optional note to record when marking the task complete`,
      },
      {
        name: 'task_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the task to mark as complete`,
      },
    ],
  },
  {
    name: 'outreach_tasks_create',
    description: `Create a new task in Outreach. Tasks can represent calls, emails, in-person meetings, or general action items. Both owner_id and prospect_id are required by the Outreach API.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Type of action for the task. Options: action_item, call, email, in_person`,
      },
      {
        name: 'due_at',
        type: 'string',
        required: false,
        description: `Due date/time for the task (ISO 8601 format)`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Note or description for the task`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: true,
        description: `ID of the user assigned to this task`,
      },
      {
        name: 'prospect_id',
        type: 'integer',
        required: true,
        description: `ID of the prospect associated with this task (subject). Required — must provide either prospect_id or account_id.`,
      },
    ],
  },
  {
    name: 'outreach_tasks_delete',
    description: `Permanently delete a task from Outreach by ID. This action cannot be undone.`,
    params: [
      {
        name: 'task_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the task to delete`,
      },
    ],
  },
  {
    name: 'outreach_tasks_get',
    description: `Retrieve a single task by ID from Outreach, including its action type, due date, note, and associated prospect.`,
    params: [
      {
        name: 'task_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the task to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_tasks_list',
    description: `List tasks in Outreach with optional filtering by state, action type, prospect, or due date.`,
    params: [
      {
        name: 'filter_prospect_id',
        type: 'integer',
        required: false,
        description: `Filter tasks by prospect ID`,
      },
      {
        name: 'filter_state',
        type: 'string',
        required: false,
        description: `Filter tasks by state. Options: incomplete, complete`,
      },
      {
        name: 'filter_task_type',
        type: 'string',
        required: false,
        description: `Filter tasks by task type. Options: action_item, call, email, in_person`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with '-' for descending order`,
      },
    ],
  },
  {
    name: 'outreach_tasks_update',
    description: `Update an existing task in Outreach. Supports changing action, note, and due date. To mark a task complete, use the outreach_tasks_complete tool instead.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Updated action type. Options: action_item, call, email, in_person`,
      },
      {
        name: 'due_at',
        type: 'string',
        required: false,
        description: `Updated due date/time for the task (ISO 8601 format)`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Updated note or description for the task`,
      },
      {
        name: 'task_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the task to update`,
      },
    ],
  },
  {
    name: 'outreach_templates_create',
    description: `Create a new email template in Outreach. Templates can be used in sequences and for manual email sends.`,
    params: [
      {
        name: 'body_html',
        type: 'string',
        required: false,
        description: `HTML body content of the template`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the template` },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user who owns this template`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Email subject line of the template`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of tags to apply to the template`,
      },
    ],
  },
  {
    name: 'outreach_templates_delete',
    description: `Permanently delete an email template from Outreach by ID. This action cannot be undone.`,
    params: [
      {
        name: 'template_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the template to delete`,
      },
    ],
  },
  {
    name: 'outreach_templates_get',
    description: `Retrieve a single email template by ID from Outreach, including its subject, body, and usage statistics.`,
    params: [
      {
        name: 'template_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the template to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_templates_list',
    description: `List email templates in Outreach with optional filtering by name.`,
    params: [
      {
        name: 'filter_name',
        type: 'string',
        required: false,
        description: `Filter templates by name`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with '-' for descending order`,
      },
    ],
  },
  {
    name: 'outreach_templates_update',
    description: `Update an existing email template in Outreach. Only provided fields will be changed.`,
    params: [
      {
        name: 'body_html',
        type: 'string',
        required: false,
        description: `Updated HTML body content`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name of the template`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Updated email subject line`,
      },
      { name: 'tags', type: 'array', required: false, description: `Updated array of tags` },
      {
        name: 'template_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the template to update`,
      },
    ],
  },
  {
    name: 'outreach_users_get',
    description: `Retrieve a single Outreach user by ID, including their name, email, and role information.`,
    params: [
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the user to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_users_list',
    description: `List all users in the Outreach organization with optional filtering and pagination.`,
    params: [
      {
        name: 'filter_email',
        type: 'string',
        required: false,
        description: `Filter users by email address`,
      },
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with '-' for descending order`,
      },
    ],
  },
  {
    name: 'outreach_webhooks_create',
    description: `Create a new webhook in Outreach to receive event notifications at a specified URL. Outreach will POST event payloads to the provided URL when subscribed events occur.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `The event action to subscribe to (e.g., created, updated, deleted)`,
      },
      {
        name: 'resource_type',
        type: 'string',
        required: false,
        description: `The resource type to subscribe to events for (e.g., prospect, account, sequenceState)`,
      },
      {
        name: 'secret',
        type: 'string',
        required: false,
        description: `A secret string used to sign webhook payloads for verification`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The HTTPS URL to receive webhook event payloads`,
      },
    ],
  },
  {
    name: 'outreach_webhooks_delete',
    description: `Permanently delete a webhook from Outreach by ID. Outreach will stop sending event notifications to the associated URL.`,
    params: [
      {
        name: 'webhook_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the webhook to delete`,
      },
    ],
  },
  {
    name: 'outreach_webhooks_get',
    description: `Retrieve a single webhook configuration by ID from Outreach.`,
    params: [
      {
        name: 'webhook_id',
        type: 'integer',
        required: true,
        description: `The unique identifier of the webhook to retrieve`,
      },
    ],
  },
  {
    name: 'outreach_webhooks_list',
    description: `List all webhooks configured in Outreach for receiving event notifications.`,
    params: [
      {
        name: 'page_offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 1000)`,
      },
    ],
  },
]
