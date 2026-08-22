import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'clarifymcp_add_comment',
    description: `Add a Markdown comment to a supported Clarify entity (deal, person, company, etc.).`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique ID of the record (e.g. per_01ABCDE for a person, cmp_01ABCDE for a company).`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The comment text in Markdown format. Supports **bold**, *italic*, and bullet lists.`,
      },
    ],
  },
  {
    name: 'clarifymcp_create_campaign',
    description: `Create a new email campaign (sequence) in draft mode, with subject/body/timing steps.`,
    params: [
      { name: 'campaign_name', type: 'string', required: true, description: `Campaign name.` },
      {
        name: 'email_steps',
        type: 'array',
        required: true,
        description: `Email steps with subject, body, and delay_after_days, in send order.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Campaign description.`,
      },
      {
        name: 'from_email',
        type: 'string',
        required: false,
        description: `Email address of the connected account to send this campaign from. Defaults to the primary account when omitted.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: false,
        description: `Target list ID. Get from get_lists. Optional for drafts.`,
      },
    ],
  },
  {
    name: 'clarifymcp_create_email_draft',
    description: `Create an email draft in the user's connected Gmail or Outlook account for them to review and send themselves. Nothing is sent.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `Email body content as plain text (converted to rich text; supports bullet/numbered lists, bold section labels, blank-line paragraph breaks, and markdown links).`,
      },
      { name: 'subject', type: 'string', required: true, description: `Email subject line.` },
      { name: 'to', type: 'array', required: true, description: `Email addresses to send to.` },
      { name: 'bcc', type: 'array', required: false, description: `Email addresses to BCC.` },
      { name: 'cc', type: 'array', required: false, description: `Email addresses to CC.` },
      {
        name: 'confirmedNewRecipients',
        type: 'array',
        required: false,
        description: `Recipient addresses that match no CRM person record but that the user supplied or confirmed verbatim.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Address to draft from. Only set this when the user explicitly asks to draft from a specific alias; otherwise omit to use the connected account's primary address.`,
      },
      {
        name: 'replacesDraftId',
        type: 'string',
        required: false,
        description: `Nylas draft ID of a previous draft in this conversation that this call is revising. When set, the existing draft is updated in place instead of creating a duplicate.`,
      },
      {
        name: 'replyToMessageId',
        type: 'string',
        required: false,
        description: `Short Nylas message_id of the inbound email being replied to. Set this when drafting a reply on an existing thread. Do not pass a Clarify record _id or a Nylas draft id here.`,
      },
    ],
  },
  {
    name: 'clarifymcp_create_or_update_agent',
    description: `Create or update an autonomous agent: its triggers, instructions, model tier, allowed tools, and MCP connectors.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: false,
        description: `The ID of an existing agent to update. Omit to create a new agent.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Short description of the agent (up to 300 characters). Required when creating a new agent.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the agent is enabled. Only applicable when updating an existing agent. New agents are created enabled.`,
      },
      {
        name: 'instructions',
        type: 'string',
        required: false,
        description: `The instructions that define how the agent behaves. Markdown up to 30,000 characters. Required when creating a new agent.`,
      },
      {
        name: 'mcp_servers',
        type: 'object',
        required: false,
        description: `MCP connector configuration keyed by server ID. Each server maps tool names to permissions. This is a full replacement; omit to keep existing servers unchanged.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `Model tier the agent runs on. "fast" is cheaper and faster for simple, deterministic work. "smart" (default) is for multi-step reasoning and judgment.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Agent name (1-64 characters). Required when creating a new agent.`,
      },
      {
        name: 'throttle',
        type: 'string',
        required: false,
        description: `Caps how many times this agent may run per hour. Throttles are hourly only. Omit to leave unchanged; pass null to reset to the default of 100 runs/hour.`,
      },
      {
        name: 'tools',
        type: 'object',
        required: false,
        description: `Map of tool name to permission. Only listed tools are available to the agent. This is a full replacement; omit to keep existing tools unchanged.`,
      },
      {
        name: 'triggers',
        type: 'array',
        required: false,
        description: `Triggers that activate the agent. Each trigger specifies an event the agent responds to. An agent can have multiple triggers.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Controls agent run visibility. "public" lets anyone in the workspace see the agent's runs. "private" restricts runs to the creator only. Defaults to "private".`,
      },
    ],
  },
  {
    name: 'clarifymcp_create_or_update_calendar_event',
    description: `Create a new calendar event, or update an existing one by event_id.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Event description. Maximum 8000 characters.`,
      },
      {
        name: 'event_id',
        type: 'string',
        required: false,
        description: `Existing Nylas event ID (from get_calendar_events) to update. Omit to create a new event.`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Event location, maximum 255 characters. Omit to leave unchanged on update; passing an empty string clears the field.`,
      },
      {
        name: 'notify_participants',
        type: 'boolean',
        required: false,
        description: `Whether to send invite/update emails. Defaults to true on create, false on update.`,
      },
      {
        name: 'participants',
        type: 'array',
        required: false,
        description: `Email addresses to invite or update.`,
      },
      {
        name: 'participants_mode',
        type: 'string',
        required: false,
        description: `How to apply participants on update. 'add' (default) merges the listed emails into the existing attendee list. 'replace' substitutes the entire attendee list.`,
      },
      {
        name: 'recurrence',
        type: 'array',
        required: false,
        description: `Optional RRULE strings (RFC 5545) to make the event recurring. Update and delete operations apply to the whole series.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Required when creating; optional when updating. Maximum 1024 characters.`,
      },
      {
        name: 'when',
        type: 'string',
        required: false,
        description: `Required when creating. When updating, provide only if rescheduling.`,
      },
    ],
  },
  {
    name: 'clarifymcp_create_or_update_campaign',
    description: `Create a new email campaign or update an existing one by its ID.`,
    params: [
      {
        name: 'campaign_name',
        type: 'string',
        required: true,
        description: `Name of the campaign. Required when creating a new campaign.`,
      },
      {
        name: 'email_steps',
        type: 'array',
        required: true,
        description: `Array of email step definitions for the campaign sequence.`,
      },
      {
        name: 'campaign_id',
        type: 'string',
        required: false,
        description: `ID of an existing campaign to update. Omit to create a new campaign.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Campaign status — draft (default) or active.`,
      },
    ],
  },
  {
    name: 'clarifymcp_create_or_update_custom_object',
    description: `Create a new custom object type or update an existing one in the Clarify workspace.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `AI context description for this object type — helps the AI understand when to use it.`,
      },
      {
        name: 'entity',
        type: 'string',
        required: false,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Display name for the custom object type. Will be normalized to a slug for the entity identifier.`,
      },
      {
        name: 'plural',
        type: 'string',
        required: false,
        description: `Plural label for the custom object type (e.g. Partnerships for a singular Partnership).`,
      },
    ],
  },
  {
    name: 'clarifymcp_create_or_update_fields',
    description: `Create new custom fields or update existing fields on any Clarify entity (person, company, deal, or custom object).`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
      {
        name: 'fields',
        type: 'array',
        required: true,
        description: `Array of field definitions to create or update on the entity.`,
      },
    ],
  },
  {
    name: 'clarifymcp_create_or_update_list',
    description: `Create or update a dynamic list — a saved view whose membership is defined by a SQL query.`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `AI context description for this object type — helps the AI understand when to use it.`,
      },
      {
        name: 'emoji',
        type: 'string',
        required: false,
        description: `A single emoji to display alongside the list name.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: false,
        description: `The ID of an existing list (saved view). Use get_lists to find available list IDs.`,
      },
      {
        name: 'sql',
        type: 'string',
        required: false,
        description: `SQL query to execute. For query_data use PostgreSQL syntax; for query_analytics use ClickHouse SQL.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The display name of the list.`,
      },
    ],
  },
  {
    name: 'clarifymcp_create_or_update_records',
    description: `Create new records or update existing ones in Clarify. Supports bulk operations of up to 25 records per call.`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
      {
        name: 'records',
        type: 'array',
        required: true,
        description: `Array of records to create or update. Each item contains an attributes object with field values.`,
      },
    ],
  },
  {
    name: 'clarifymcp_delete_agent',
    description: `Permanently delete an agent by its ID. Only the creator of an agent can delete it.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `The ID of the agent to delete.`,
      },
    ],
  },
  {
    name: 'clarifymcp_delete_calendar_event',
    description: `Cancel a calendar event the user owns or has edit access to.`,
    params: [
      {
        name: 'event_id',
        type: 'string',
        required: true,
        description: `The Nylas event ID (from get_calendar_events) to cancel.`,
      },
      {
        name: 'notify_participants',
        type: 'boolean',
        required: false,
        description: `Send cancellation notices to attendees. Default: true.`,
      },
    ],
  },
  {
    name: 'clarifymcp_delete_campaign',
    description: `Permanently delete an email campaign by its ID.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign. Use get_campaigns to list available campaigns and their IDs.`,
      },
    ],
  },
  {
    name: 'clarifymcp_delete_custom_object',
    description: `Permanently delete a custom object type from the Clarify workspace by its entity identifier.`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
    ],
  },
  {
    name: 'clarifymcp_delete_fields',
    description: `Permanently delete one or more custom fields from a Clarify entity by their field slugs.`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
      {
        name: 'fieldNames',
        type: 'array',
        required: true,
        description: `Array of field slugs (snake_case) to delete from the entity.`,
      },
    ],
  },
  {
    name: 'clarifymcp_delete_list',
    description: `Permanently delete a saved list (dynamic view) by its ID.`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of an existing list (saved view). Use get_lists to find available list IDs.`,
      },
    ],
  },
  {
    name: 'clarifymcp_delete_records',
    description: `Permanently delete one or more records by their IDs. Supports bulk deletion of up to 25 records per call.`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
      {
        name: 'record_ids',
        type: 'array',
        required: true,
        description: `Array of record IDs to delete. All must belong to the same entity type.`,
      },
    ],
  },
  {
    name: 'clarifymcp_find_leads',
    description: `Search Clarify's built-in prospect database of 28M+ companies and 175M+ people to find new leads.`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
      {
        name: 'search_label',
        type: 'string',
        required: true,
        description: `A descriptive label for this lead search (e.g. SF SaaS Companies 50+ employees).`,
      },
      {
        name: 'sql',
        type: 'string',
        required: true,
        description: `SQL query to execute. For query_data use PostgreSQL syntax; for query_analytics use ClickHouse SQL.`,
      },
      {
        name: 'search_identifiers',
        type: 'string',
        required: false,
        description: `Optional: provide a prior searchId and versionId to operate on an existing search.`,
      },
    ],
  },
  {
    name: 'clarifymcp_get_agent_runs',
    description: `List an agent's past runs, or fetch one run with its full message transcript.`,
    params: [
      {
        name: 'agent_id',
        type: 'string',
        required: true,
        description: `The ID of the agent whose runs to list or fetch.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of runs to return when listing.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Offset for pagination when listing.`,
      },
      {
        name: 'run_id',
        type: 'string',
        required: false,
        description: `Optional ID of a specific run to fetch in full, including transcript. Omit to list recent runs.`,
      },
    ],
  },
  {
    name: 'clarifymcp_get_agents',
    description: `List agents visible to the current user, or fetch a single agent by ID.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: false,
        description: `The ID of a specific agent to fetch. Omit to list all visible agents.`,
      },
    ],
  },
  {
    name: 'clarifymcp_get_calendar_events',
    description: `List the current user's calendar events in a time range.`,
    params: [
      {
        name: 'end',
        type: 'string',
        required: true,
        description: `ISO 8601 end of the time range (exclusive).`,
      },
      {
        name: 'start',
        type: 'string',
        required: true,
        description: `ISO 8601 start of the time range (inclusive).`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Maximum events to return.` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Optional substring match against event title or description.`,
      },
    ],
  },
  {
    name: 'clarifymcp_get_campaign_recipients',
    description: `List the people enrolled in a campaign along with their per-recipient engagement (opens, clicks, replies).`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign to list recipients for. Get it from get_campaigns.`,
      },
      {
        name: 'event',
        type: 'array',
        required: false,
        description: `Return only recipients who did at least one of these event types.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of recipients to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Use with limit for pagination.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Case-insensitive substring match against recipient name or email address.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Return only recipients in this delivery state.`,
      },
    ],
  },
  {
    name: 'clarifymcp_get_campaigns',
    description: `List email campaigns in the workspace, or fetch a single campaign by ID with full details.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: false,
        description: `The ID of the campaign. Use get_campaigns to list available campaigns and their IDs.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of records to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of records to skip for pagination (use with limit).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Case-insensitive substring search to filter results by name or title.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by campaign status — draft (unpublished) or active (live campaigns).`,
      },
    ],
  },
  {
    name: 'clarifymcp_get_current_user',
    description: `Retrieve information about the currently authenticated Clarify user, including timezone and workspace details.`,
    params: [
      {
        name: 'mcp_client_timezone',
        type: 'string',
        required: false,
        description: `Your IANA timezone string (e.g. America/New_York). Helps Clarify show times in your local timezone.`,
      },
    ],
  },
  {
    name: 'clarifymcp_get_lists',
    description: `List saved views (dynamic lists) for an entity type, or fetch a single list by ID.`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of records to return per page.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: false,
        description: `The ID of an existing list (saved view). Use get_lists to find available list IDs.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of records to skip for pagination (use with limit).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Case-insensitive substring search to filter results by name or title.`,
      },
    ],
  },
  {
    name: 'clarifymcp_get_records',
    description: `Retrieve full details for one or more Clarify records by their IDs.`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `Array of record IDs to retrieve. Use query_data to find IDs first.`,
      },
    ],
  },
  {
    name: 'clarifymcp_get_schema',
    description: `Retrieve the schema for Clarify entities, including field definitions and relationship metadata.`,
    params: [
      {
        name: 'entities',
        type: 'array',
        required: false,
        description: `List of entity types to get schema for. Omit to return the schema for all entities.`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Schema format — use read for querying data or write for creating/updating records.`,
      },
    ],
  },
  {
    name: 'clarifymcp_import_leads',
    description: `Import leads from a find_leads search result into your Clarify workspace.`,
    params: [
      {
        name: 'searchEmoji',
        type: 'string',
        required: true,
        description: `A single emoji representing the theme of the search.`,
      },
      {
        name: 'searchId',
        type: 'string',
        required: true,
        description: `The ID of the lead search returned by find_leads.`,
      },
      {
        name: 'searchTitle',
        type: 'string',
        required: true,
        description: `A descriptive title for the search based on its filters.`,
      },
      {
        name: 'sourceEntity',
        type: 'string',
        required: true,
        description: `The lead entity type to import from — tam_company or tam_person.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of leads to import. Omit to import all leads in the search.`,
      },
      {
        name: 'extraFields',
        type: 'array',
        required: false,
        description: `Additional TAM field names to import beyond the default fields.`,
      },
      {
        name: 'versionId',
        type: 'string',
        required: false,
        description: `The version ID of the search. Use the versionId from a prior find_leads result when available.`,
      },
    ],
  },
  {
    name: 'clarifymcp_import_meeting_transcript',
    description: `Import a meeting transcript from an external source (Granola, Notion, or Circleback) and attach it to a Clarify meeting.`,
    params: [
      {
        name: 'meeting_id',
        type: 'string',
        required: true,
        description: `The Clarify meeting ID to attach the transcript to.`,
      },
      {
        name: 'source',
        type: 'string',
        required: true,
        description: `The transcript source provider.`,
      },
      {
        name: 'source_id',
        type: 'string',
        required: true,
        description: `The ID of the transcript in the source system. For Granola: meeting UUID. For Notion: page URL or UUID. For Circleback: numeric meeting ID, not the URL slug.`,
      },
    ],
  },
  {
    name: 'clarifymcp_manage_access',
    description: `Grant, update, revoke, or read access grants on a list, meeting, or message, or reassign its owner.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The access operation to perform: grant, update, revoke, read, or reassign.`,
      },
      {
        name: 'target',
        type: 'string',
        required: true,
        description: `The object (or set of objects) to manage access for. Use mode:"direct" for a single list, meeting, or message by id, or mode:"related" to bulk-manage every message on an anchor record.`,
      },
      {
        name: 'accessLevel',
        type: 'string',
        required: false,
        description: `The access level to grant or update to. Required for grant and update.`,
      },
      {
        name: 'all',
        type: 'boolean',
        required: false,
        description: `Revoke only: when true, revoke every grant on the object. Mutually exclusive with grantees.`,
      },
      {
        name: 'grantees',
        type: 'array',
        required: false,
        description: `The grantees to act on. Required for grant and update. For revoke, provide either grantees or all=true.`,
      },
      {
        name: 'newOwnerId',
        type: 'string',
        required: false,
        description: `Reassign only: the user record id to make the new owner of the object.`,
      },
      {
        name: 'objectIds',
        type: 'array',
        required: false,
        description: `Reassign only: to reassign several objects of the same entity to newOwnerId at once, list the other object ids here (up to 50). target.objectId is always included.`,
      },
    ],
  },
  {
    name: 'clarifymcp_merge_records',
    description: `Merge two or more duplicate records into a single primary record, combining all data.`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
      {
        name: 'primaryRecordId',
        type: 'string',
        required: true,
        description: `The ID of the record to keep after the merge — all data is merged into this record.`,
      },
      {
        name: 'sourceRecordIds',
        type: 'array',
        required: true,
        description: `IDs of records to merge into the primary record. These records are deleted after merging.`,
      },
    ],
  },
  {
    name: 'clarifymcp_query_analytics',
    description: `Execute a read-only ClickHouse SQL query against the Clarify analytics event log.`,
    params: [
      {
        name: 'sql',
        type: 'string',
        required: true,
        description: `SQL query to execute. For query_data use PostgreSQL syntax; for query_analytics use ClickHouse SQL.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of records to return per page.`,
      },
    ],
  },
  {
    name: 'clarifymcp_query_data',
    description: `Execute a read-only PostgreSQL query against Clarify CRM data (contacts, companies, deals, etc.).`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).`,
      },
      {
        name: 'sql',
        type: 'string',
        required: true,
        description: `SQL query to execute. For query_data use PostgreSQL syntax; for query_analytics use ClickHouse SQL.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of records to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of records to skip for pagination (use with limit).`,
      },
    ],
  },
  {
    name: 'clarifymcp_read_context',
    description: `Read Clarify product documentation and best-practice guides for fields, calendar, campaigns, and artifacts.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `The name of the context documentation to read.`,
      },
    ],
  },
  {
    name: 'clarifymcp_respond_to_calendar_event',
    description: `RSVP (accept, decline, or tentatively accept) to a calendar event invite.`,
    params: [
      {
        name: 'event_id',
        type: 'string',
        required: true,
        description: `The Nylas event ID (from get_calendar_events) to respond to.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `RSVP status: yes (accept), no (decline), or maybe (tentative).`,
      },
    ],
  },
  {
    name: 'clarifymcp_send_email',
    description: `Send an email immediately through the user's connected email account.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `Email body as plain text (converted to rich text; supports bullet/numbered lists, bold section labels, blank-line paragraph breaks, and markdown links).`,
      },
      { name: 'subject', type: 'string', required: true, description: `Email subject line.` },
      { name: 'to', type: 'array', required: true, description: `Email addresses to send to.` },
      { name: 'bcc', type: 'array', required: false, description: `Email addresses to BCC.` },
      { name: 'cc', type: 'array', required: false, description: `Email addresses to CC.` },
      {
        name: 'confirmedNewRecipients',
        type: 'array',
        required: false,
        description: `Recipient addresses that match no CRM person record but that the user supplied or confirmed verbatim.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Address to send from. Only set this when the user explicitly asks to send from a specific alias; otherwise omit to use the connected account's primary address.`,
      },
      {
        name: 'replyToMessageId',
        type: 'string',
        required: false,
        description: `Short Nylas message_id of the inbound email being replied to. Set this when sending a reply on an existing thread. Do not pass a Clarify record _id or a Nylas draft id here.`,
      },
    ],
  },
  {
    name: 'clarifymcp_submit_feedback',
    description: `Submit a feature request or bug report about Clarify MCP tools.`,
    params: [
      {
        name: 'feedback',
        type: 'string',
        required: true,
        description: `The feature request or feedback message describing what is missing or broken.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Category for your feedback. Accepted values: missing_tool, bug, improvement, other.`,
      },
    ],
  },
  {
    name: 'clarifymcp_update_campaign',
    description: `Update an existing email campaign: rename it, change its target list, sender, email steps, or send time windows.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `Campaign ID to update. Get from get_campaigns tool.`,
      },
      {
        name: 'email_steps',
        type: 'array',
        required: false,
        description: `Email step operations (insert, remove, update). Each step must specify an operation.`,
      },
      {
        name: 'from_name',
        type: 'string',
        required: false,
        description: `Update sender display name for all emails in the campaign.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: false,
        description: `Target list ID. Get from get_lists tool.`,
      },
      { name: 'new_name', type: 'string', required: false, description: `New campaign name.` },
      {
        name: 'send_windows',
        type: 'string',
        required: false,
        description: `Send time windows for the campaign. Pass null to disable windows or a { windows: { <day>: { start, end } | null } } object to configure them. Days are lowercase (sunday-saturday); start/end are "HH:mm" 24-hour strings. Omit to leave existing windows unchanged.`,
      },
    ],
  },
]
